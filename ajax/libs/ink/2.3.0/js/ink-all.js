;(function(window, document) {

    'use strict';

    /**
     * @module Ink_1
     */

    /**
     * global object
     *
     * @class Ink
     */


    // skip redefinition of Ink core
    if ('Ink' in window) { return; }


    // internal data

    /*
     * NOTE:
     * invoke Ink.setPath('Ink', '/Ink/'); before requiring local modules
     */
    var paths = {};
    var modules = {};
    var modulesLoadOrder = [];
    var modulesRequested = {};
    var pendingRMs = [];
    var modulesWaitingForDeps = {};

    var apply = Function.prototype.apply;

    // auxiliary fns
    var isEmptyObject = function(o) {
        /*jshint unused:false */
        if (typeof o !== 'object') { return false; }
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    };

    window.Ink = {

        _checkPendingRequireModules: function() {
            var I, F, o, dep, mod, cb, pRMs = [];
            for (I = 0, F = pendingRMs.length; I < F; ++I) {
                o = pendingRMs[I];

                if (!o) { continue; }

                for (dep in o.left) {
                    if (o.left.hasOwnProperty(dep)) {
                        mod = modules[dep];
                        if (mod) {
                            o.args[o.left[dep] ] = mod;
                            delete o.left[dep];
                            --o.remaining;
                        }
                    }
                }

                if (o.remaining > 0) {
                    pRMs.push(o);
                }
                else {
                    cb = o.cb;
                    if (!cb) { continue; }
                    delete o.cb; // to make sure I won't call this more than once!
                    cb.apply(false, o.args);
                }
            }

            pendingRMs = pRMs;

            if (pendingRMs.length > 0) {
                setTimeout( function() { Ink._checkPendingRequireModules(); }, 0 );
            }
        },

        /**
         * Get the path of a certain module by looking up the paths given in setPath (and ultimately the default Ink path)
         *
         * @method getPath
         * @param modName   Name of the module you want the path of.
         * @param noLib     Exclude the 'lib.js' filename
         */
        getPath: function(key, noLib) {
            var split = key.split(/[._]/g);
            var curKey;
            var i;
            var root;
            var path;
            // Look for Ink.Dom.Element.1, Ink.Dom.Element, Ink.Dom, Ink in this order.
            for (i = split.length; i >= 0; i -= 1) {
                curKey = split.slice(0, i + 1).join('.');  // See comment in setPath
                if (paths[curKey]) {
                    root = curKey;
                    break;
                }
            }
            path = paths[root || 'Ink'];
            if (!/\/$/.test(path)) {
                path += '/';
            }
            if (i < split.length) {
                path += split.slice(i + 1).join('/') + '/';
            }
            if (!noLib) {
                path += 'lib.js';
            }
            return path;
        },
        
        /**
         * Sets the URL path for a namespace. Use this to customize where
         * requireModules (and createModule) will load dependencies from.
         *
         * @method setPath
         *
         * @param key
         * @param rootURI
         *
         * @example
         *      Ink.setPath('Ink', 'http://my-cdn/Ink/');
         *      Ink.setPath('Lol', 'http://my-cdn/Lol/');
         *
         *      // Loads from http://my-cdn/Ink/Dom/Whatever/lib.js
         *      Ink.requireModules(['Ink.Dom.Whatever'], function () { ... });
         *      // Loads from http://my-cdn/Lol/Whatever/lib.js
         *      Ink.requireModules(['Lol.Whatever'], function () { ... });
         */
        setPath: function(key, rootURI) {
            // Replacing version separator with dot because the difference
            // between a submodule and a version doesn't matter here.
            // It would also overcomplicate the implementation of getPath
            paths[key.replace(/_/, '.')] = rootURI;
        },

        /**
         * Loads a script by creating a `<script>` tag in the `<head>` of the document.
         *
         * Reports errors by listening to 'error' and 'readystatechange' events.
         *
         * @method loadScript
         * @param {String}   uri  can be an http URI or an Ink module name, which gets resolved.
         * @param {String}  [contentType='text/javascript'] the `type` attribute of the new script tag.
         */
        loadScript: function(uri, contentType) {
            /*jshint evil:true */

            if (uri.indexOf('/') === -1) {
                uri = this.getPath(uri);
            }

            var scriptEl = document.createElement('script');
            scriptEl.setAttribute('type', contentType || 'text/javascript');
            scriptEl.setAttribute('src', uri);

            scriptEl.onerror = scriptEl.onreadystatechange = function (err) {
                err = err || window.event;
                if (err.type === 'readystatechange' && scriptEl.readyState !== 'loaded') {
                    // if not readyState == 'loaded' it's not an error.
                    return;
                }
                Ink.error(['Failed to load script ', uri, '. (', err || 'unspecified error', ')'].join(''));
            };
            // CHECK ON ALL BROWSERS
            /*if (document.readyState !== 'complete' && !document.body) {
                document.write( scriptEl.outerHTML );
            }
            else {*/
                var aHead = document.getElementsByTagName('head');
                if(aHead.length > 0) {
                    aHead[0].appendChild(scriptEl);
                }
            //}
        },

        _loadLater: function (dep) {
            setTimeout(function () {
                if (modules[dep] || modulesRequested[dep] ||
                        modulesWaitingForDeps[dep]) {
                    return;
                }
                modulesRequested[dep] = true;
                Ink.loadScript(dep);
            }, 0);
        },

        /**
         * defines a namespace.
         *
         * @method namespace
         * @param  {String}   ns
         * @param  {Boolean}  [returnParentAndKey]
         * @return {Array|Object} if returnParentAndKey, returns [parent, lastPart], otherwise return the namespace directly
         */
        namespace: function(ns, returnParentAndKey) {
            if (!ns || !ns.length) { return null; }

            var levels = ns.split('.');
            var nsobj = window;
            var parent;

            for (var i = 0, f = levels.length; i < f; ++i) {
                nsobj[ levels[i] ] = nsobj[ levels[i] ] || {};
                parent = nsobj;
                nsobj = nsobj[ levels[i] ];
            }

            if (returnParentAndKey) {
                return [
                    parent,
                    levels[i-1]
                ];
            }

            return nsobj;
        },

        /**
         * synchronous. assumes module is loaded already!
         *
         * @method getModule
         * @param  {String}  mod
         * @param  {Number}  [version]
         * @return {Object|Function} module object / function
         */
        getModule: function(mod, version) {
            var key = version ? [mod, '_', version].join('') : mod;
            return modules[key];
        },

        /**
         * must be the wrapper around each Ink lib module for require resolution
         *
         * @method createModule
         * @param  {String}    mod      module name. parts are split with dots
         * @param  {Number}    version
         * @param  {Array}     deps     array of module names which are dependencies for the module being created
         * @param  {Function}  modFn    its arguments are the resolved dependecies, once all of them are fetched. the body of this function should return the module.
         */
        createModule: function(mod, ver, deps, modFn) { // define
            if (typeof mod !== 'string') {
                throw new Error('module name must be a string!');
            }

            // validate version correctness
            if (!(typeof ver === 'number' || (typeof ver === 'string' && ver.length > 0))) {
                throw new Error('version number missing!');
            }

            var modAll = [mod, '_', ver].join('');

            modulesWaitingForDeps[modAll] = true;

            var cb = function() {
                //console.log(['createModule(', mod, ', ', ver, ', [', deps.join(', '), '], ', !!modFn, ')'].join(''));

                // make sure module in not loaded twice
                if (modules[modAll]) {
                    //console.warn(['Ink.createModule ', modAll, ': module has been defined already.'].join(''));
                    return;
                }


                // delete related pending tasks
                delete modulesRequested[modAll];
                delete modulesRequested[mod];


                // run module's supplied factory
                var args = Array.prototype.slice.call(arguments);
                var moduleContent = modFn.apply(window, args);
                modulesLoadOrder.push(modAll);
                // console.log('** loaded module ' + modAll + '**');


                // set version
                if (typeof moduleContent === 'object') { // Dom.Css Dom.Event
                    moduleContent._version = ver;
                }
                else if (typeof moduleContent === 'function') {
                    moduleContent.prototype._version = ver; // if constructor
                    moduleContent._version = ver;           // if regular function
                }


                // add to global namespace...
                var isInkModule = mod.indexOf('Ink.') === 0;
                var t;
                if (isInkModule) {
                    t = Ink.namespace(mod, true); // for mod 'Ink.Dom.Css', t[0] gets 'Ink.Dom' object and t[1] 'Css'
                }


                // versioned
                modules[ modAll ] = moduleContent; // in modules
                delete modulesWaitingForDeps[ modAll ];

                if (isInkModule) {
                    t[0][ t[1] + '_' + ver ] = moduleContent; // in namespace
                }


                // unversioned
                modules[ mod ] = moduleContent; // in modules

                if (isInkModule) {
                    if (isEmptyObject( t[0][ t[1] ] )) {
                        t[0][ t[1] ] = moduleContent; // in namespace
                    }
                    // else {
                        // console.warn(['Ink.createModule ', modAll, ': module has been defined already with a different version!'].join(''));
                    // }
                }


                if (this) { // there may be pending requires expecting this module, check...
                    Ink._checkPendingRequireModules();
                }
            };

            this.requireModules(deps, cb);
        },

        /**
         * use this to get depencies, even if they're not loaded yet
         *
         * @method requireModules
         * @param  {Array}     deps  array of module names which are dependencies for the require function body
         * @param  {Function}  cbFn  its arguments are the resolved dependecies, once all of them are fetched
         */
        requireModules: function(deps, cbFn) { // require
            //console.log(['requireModules([', deps.join(', '), '], ', !!cbFn, ')'].join(''));
            var i, f, o, dep, mod;
            f = deps.length;
            o = {
                args: new Array(f),
                left: {},
                remaining: f,
                cb: cbFn
            };

            if (!(typeof deps === 'object' && deps.length !== undefined)) {
                throw new Error('Dependency list should be an array!');
            }
            if (typeof cbFn !== 'function') {
                throw new Error('Callback should be a function!');
            }

            for (i = 0; i < f; ++i) {
                if (Ink._moduleRenames[deps[i]]) {
                    Ink.warn(deps[i] + ' was renamed to ' + Ink._moduleRenames[deps[i]]);
                    dep = Ink._moduleRenames[deps[i]];
                } else {
                    dep = deps[i];
                }
                mod = modules[dep];
                if (mod) {
                    o.args[i] = mod;
                    --o.remaining;
                    continue;
                }
                else if (!modulesRequested[dep]) {
                    Ink._loadLater(dep);
                }
                o.left[dep] = i;
            }

            if (o.remaining > 0) {
                pendingRMs.push(o);
            }
            else {
                cbFn.apply(true, o.args);
            }
        },

        _moduleRenames: {
            'Ink.UI.Aux_1': 'Ink.UI.Common_1'
        },

        /**
         * list or module names, ordered by loaded time
         *
         * @method getModulesLoadOrder
         * @return {Array} returns the order in which modules were resolved and correctly loaded
         */
        getModulesLoadOrder: function() {
            return modulesLoadOrder.slice();
        },

        /**
         * returns the markup you should have to bundle your JS resources yourself
         *
         * @return {String} scripts markup
         */
        getModuleScripts: function() {
            var mlo = this.getModulesLoadOrder();
            mlo.unshift('Ink_1');
            mlo = mlo.map(function(m) {
                return ['<scr', 'ipt type="text/javascript" src="', Ink.getModuleURL(m), '"></scr', 'ipt>'].join('');
            });

            return mlo.join('\n');
        },
        
        /**
         * Creates an Ink.Ext module
         *
         * Does exactly the same as createModule but creates the module in the Ink.Ext namespace
         *
         * @method createExt
         * @param {String} moduleName   Extension name
         * @param {String} version  Extension version
         * @param {Array}  dependencies Extension dependencies
         * @param {Function} modFn  Function returning the extension
         */
        createExt: function (moduleName, version, dependencies, modFn) {
            return Ink.createModule('Ink.Ext.' + moduleName, version, dependencies, modFn);
        },

        /**
         * Function.prototype.bind alternative.
         * Additional arguments will be sent to the original function as prefix arguments.
         * Set "context" to `false` to preserve the original context of the function and just bind the arguments.
         *
         * @method bind
         * @param {Function}  fn
         * @param {Object}    context
         * @return {Function}
         */
        bind: function(fn, context) {
            var args = Array.prototype.slice.call(arguments, 2);
            return function() {
                var innerArgs = Array.prototype.slice.call(arguments);
                var finalArgs = args.concat(innerArgs);
                return fn.apply(context === false ? this : context, finalArgs);
            };
        },

        /**
         * Function.prototype.bind alternative for binding class methods
         *
         * @method bindMethod
         * @param {Object}  object
         * @param {String}  methodName
         * @return {Function}
         *  
         * @example
         *  // Build a function which calls Ink.Dom.Element.remove on an element.
         *  var removeMyElem = Ink.bindMethod(Ink.Dom.Element, 'remove', someElement);
         *
         *  removeMyElem();  // no arguments, nor Ink.Dom.Element, needed
         * @example
         *  // (comparison with using Ink.bind to the same effect).
         *  // The following two calls are equivalent
         *
         *  Ink.bind(this.remove, this, myElem);
         *  Ink.bindMethod(this, 'remove', myElem);
         */
        bindMethod: function (object, methodName) {
            return Ink.bind.apply(Ink,
                [object[methodName], object].concat([].slice.call(arguments, 2)));
        },

        /**
         * Function.prototype.bind alternative for event handlers.
         * Same as bind but keeps first argument of the call the original event.
         * Additional arguments will be sent to the original function as prefix arguments.
         * Set "context" to `false` to preserve the original context of the function and just bind the arguments.
         *
         * @method bindEvent
         * @param {Function}  fn
         * @param {Object}    context
         * @return {Function}
         */
        bindEvent: function(fn, context) {
            var args = Array.prototype.slice.call(arguments, 2);
            return function(event) {
                var finalArgs = args.slice();
                finalArgs.unshift(event || window.event);
                return fn.apply(context === false ? this : context, finalArgs);
            };
        },

        /**
         * alias to document.getElementById
         *
         * @method i
         * @param {String} id
         */
        i: function(id) {
            if(!id) {
                throw new Error('Ink.i => id or element must be passed');
            }
            if(typeof(id) === 'string') {
                return document.getElementById(id);
            }
            return id;
        },

        /**
         * alias to sizzle or querySelector
         *
         * @method s
         * @param {String}     rule
         * @param {DOMElement} [from]
         * @return {DOMElement}
         */
        s: function(rule, from)
        {
            if(typeof(Ink.Dom) === 'undefined' || typeof(Ink.Dom.Selector) === 'undefined') {
                throw new Error('This method requires Ink.Dom.Selector');
            }
            return Ink.Dom.Selector.select(rule, (from || document))[0] || null;
        },

        /**
         * alias to sizzle or querySelectorAll
         *
         * @method ss
         * @param {String}     rule
         * @param {DOMElement} [from]
         * @return {Array} array of DOMElements
         */
        ss: function(rule, from)
        {
            if(typeof(Ink.Dom) === 'undefined' || typeof(Ink.Dom.Selector) === 'undefined') {
                throw new Error('This method requires Ink.Dom.Selector');
            }
            return Ink.Dom.Selector.select(rule, (from || document));
        },

        /**
         * Enriches the destination object with values from source object whenever the key is missing in destination.
         *
         * More than one object can be passed as source, in which case the rightmost objects have precedence.
         *
         * @method extendObj
         * @param {Object} destination
         * @param {Object...} sources
         * @return destination object, enriched with defaults from the sources
         */
        extendObj: function(destination, source) {
            if (arguments.length > 2) {
                source = Ink.extendObj.apply(this, [].slice.call(arguments, 1));
            }
            if (source) {
                for (var property in source) {
                    if(Object.prototype.hasOwnProperty.call(source, property)) {
                        destination[property] = source[property];
                    }
                }
            }
            return destination;
        },

        /**
         * Calls console.log if available.
         *
         * @method log
         * @param args...
         **/
        log: function () {
            // IE does not have console.log.apply in IE10 emulated mode
            var console = window.console;
            if (console && console.log) {
                apply.call(console.log, console, arguments);
            }
        },

        /**
         * Calls console.warn if available.
         *
         * @method warn
         * @param args...
         **/
        warn: function () {
            // IE does not have console.log.apply in IE10 emulated mode
            var console = window.console;
            if (console && console.warn) {
                apply.call(console.warn, console, arguments);
            }
        },

        /**
         * Calls console.error if available.
         *
         * @method error
         * @param args...
         **/
        error: function () {
            // IE does not have console.log.apply in IE10 emulated mode
            var console = window.console;
            if (console && console.error) {
                apply.call(console.error, console, arguments);
            }
        }
    };

    Ink.setPath('Ink',
        ('INK_PATH' in window) ? window.INK_PATH : window.location.protocol + '//js.ink.sapo.pt/Ink/');



    // TODO for debug - to detect pending stuff
    /*
    var failCount = {};   // fail count per module name
    var maxFails = 3;     // times
    var checkDelta = 0.5; //seconds

    var tmpTmr = setInterval(function() {
        var mk = Object.keys(modulesRequested);
        var l = mk.length;

        if (l > 0) {
            // console.log('** waiting for modules: ' + mk.join(', ') + ' **');

            for (var i = 0, f = mk.length, k, v; i < f; ++i) {
                k = mk[i];
                v = failCount[k];
                failCount[k] = (v === undefined) ? 1 : ++v;

                if (v >= maxFails) {
                    console.error('** Loading of module ' + k + ' failed! **');
                    delete modulesRequested[k];
                }
            }
        }
        else {
            // console.log('** Module loads complete. **');
            clearInterval(tmpTmr);
        }
    }, checkDelta*1000);
    */
}(window, document));

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Net.Ajax', '1', [], function() {

    'use strict';

    /**
     * @module Ink.Net.Ajax_1
     */

    /**
     * Creates a new cross browser XMLHttpRequest object
     *
     * @class Ink.Net.Ajax
     * @constructor
     *
     * @param {String}  url      request url
     * @param {Object}  options  request options
     * @param {Boolean}        [options.asynchronous]    if the request should be asynchronous. true by default.
     * @param {Boolean}        [options.cors]            set this to true if you're doing a cross-origin request
     * @param {String}         [options.method]          HTTP request method. POST by default.
     * @param {Object|String}  [options.parameters]      Request parameters which should be sent with the request
     * @param {Number}         [options.timeout]         Request timeout
     * @param {Number}         [options.delay]           Artificial delay. If request is completed in time lower than this, then wait a bit before calling the callbacks
     * @param {String}         [options.postBody]        POST request body. If not specified, it's filled with the contents from parameters
     * @param {String}         [options.contentType]     Content-type header to be sent. Defaults to 'application/x-www-form-urlencoded'
     * @param {Object}         [options.requestHeaders]  key-value pairs for additional request headers
     * @param {Function}       [options.onComplete]      Callback executed after the request is completed, no matter what happens during the request.
     * @param {Function}       [options.onSuccess]       Callback executed if the request is successful (requests with 2xx status codes)
     * @param {Function}       [options.onFailure]       Callback executed if the request fails (requests with status codes different from 2xx)
     * @param {Function}       [options.onException]     Callback executed if an exception  occurs. Receives the exception as a parameter.
     * @param {Function}       [options.onCreate]        Callback executed after object initialization but before the request is made
     * @param {Function}       [options.onInit]          Callback executed before any initialization
     * @param {Function}       [options.onTimeout]       Callback executed if the request times out
     * @param {Boolean|String} [options.evalJS]          If the request Content-type header is application/json, evaluates the response and populates responseJSON. Use 'force' if you want to force the response evaluation, no matter what Content-type it's using. Defaults to true.
     * @param {Boolean}        [options.sanitizeJSON]    Sanitize the content of responseText before evaluation
     * @param {String}         [options.xhrProxy]        URI for proxy service hosted on the same server as the web app, that can fetch documents from other domains.
     *                                             The service must pipe all input and output untouched (some input sanitization is allowed, like clearing cookies).
     *                                             e.g., requesting http://example.org/doc can become /proxy/http%3A%2F%2Fexample.org%2Fdoc The proxy service will
     *                                             be used for cross-domain requests, if set, else a network error is returned as exception.
     *
     * @example
     *     new Ajax('test.json', {
     *         method: 'get',
     *         onSuccess: function (ajx, responseJSON) {
     *             // Do stuff with responseJSON or ajx.responseText
     *             console.log(responseJSON.something.length);
     *         },
     *         onFailure: function (ajx, errorResponse) {
     *             // Deal with it
     *             alert(ajx.status);  // The HTTP response code
     *         }
     *     });
     */
    var Ajax = function(url, options){

        // start of AjaxMock patch - uncomment to enable it
        /*var AM = SAPO.Communication.AjaxMock;
        if (AM && !options.inMock) {
            if (AM.autoRecordThisUrl && AM.autoRecordThisUrl(url)) {
                return new AM.Record(url, options);
            }
            if (AM.mockThisUrl && AM.mockThisUrl(url)) {
                return new AM.Play(url, options, true);
            }
        }*/
        // end of AjaxMock patch

        this.init(url, options);
    };

    /**
    * Options for all requests. These can then be
    * overriden for individual ones.
    */
    Ajax.globalOptions = {
        parameters: {},
        requestHeaders: {}
    };


    // IE10 does not need XDomainRequest
    var xMLHttpRequestWithCredentials = 'XMLHttpRequest' in window && 'withCredentials' in (new XMLHttpRequest());



    Ajax.prototype = {

        init: function(url, userOptions) {
            if (!url) {
                throw new Error("WRONG_ARGUMENTS_ERR");
            }
            var options = Ink.extendObj({
                asynchronous: true,
                method: 'POST',
                parameters: null,
                timeout: 0,
                delay: 0,
                postBody: '',
                contentType:  'application/x-www-form-urlencoded',
                requestHeaders: null,
                onComplete: null,
                onSuccess: null,
                onFailure: null,
                onException: null,
                onHeaders: null,
                onCreate: null,
                onInit: null,
                onTimeout: null,
                sanitizeJSON: false,
                evalJS: true,
                xhrProxy: '',
                cors: false,
                debug: false,
                useCredentials: false,
                signRequest: false
            }, Ajax.globalOptions);

            if (userOptions && typeof userOptions === 'object') {
                options = Ink.extendObj(options, userOptions);


                if (typeof userOptions.parameters === 'object') {
                    options.parameters = Ink.extendObj(Ink.extendObj({}, Ajax.globalOptions.parameters), userOptions.parameters);
                } else if (userOptions.parameters !== null) {
                    var globalParameters = this.paramsObjToStr(Ajax.globalOptions.parameters);
                    if (globalParameters) {
                        options.parameters = userOptions.parameters + '&' + globalParameters;
                    }
                }

                options.requestHeaders = Ink.extendObj({}, Ajax.globalOptions.requestHeaders);
                options.requestHeaders = Ink.extendObj(options.requestHeaders, userOptions.requestHeaders);
            }

            this.options = options;

            this.safeCall('onInit');

            this.url = url;

            var urlLocation = this._locationFromURL(url);
            this.isHTTP = this._locationIsHTTP(urlLocation);
            this.isCrossDomain = this._locationIsCrossDomain(urlLocation, location);

            this.requestHasBody = options.method.search(/^get|head$/i) < 0;

            if(this.options.cors) {
                this.isCrossDomain = false;
            }

            this.transport = this.getTransport();

            this.request();
        },

        /**
         * Returns a location object from an URL
         *
         * @method _locationFromUrl
         * @param url
         * @private
         **/
        _locationFromURL: function (url) {
            var urlLocation =  document.createElementNS ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'a') :
                document.createElement('a');
            urlLocation.href = url;
            return urlLocation;
        },

        /**
         * Checks whether a location is HTTP or HTTPS
         *
         * @method locationIsHttp
         * @param urlLocation
         * @private
         */
        _locationIsHTTP: function (urlLocation) {
            return urlLocation.protocol.match(/^https?:/i) ? true : false;
        },

        /**
         * Checks whether a location is cross-domain from another
         *
         * @method _locationIsCrossDomain
         * @param urlLocation {Location}
         * @param otherLocation {Location}
         */
        _locationIsCrossDomain: function (urlLocation, location) {
            location = location || window.location;
            if (!Ajax.prototype._locationIsHTTP(urlLocation) || location.protocol === 'widget:' || typeof window.widget === 'object') {
                return false;
            } else {
                return location.protocol           !== urlLocation.protocol ||
                       location.host.split(':')[0] !== urlLocation.host.split(':')[0];
            }
        },

        /**
         * Creates the appropriate XMLHttpRequest object
         *
         * @method getTransport
         * @return {Object} XMLHttpRequest object
         */
        getTransport: function()
        {
            /*global XDomainRequest:false, ActiveXObject:false */
            if (!xMLHttpRequestWithCredentials && this.options.cors && 'XDomainRequest' in window) {
                this.usingXDomainReq = true;
                return new XDomainRequest();
            }
            else if (typeof XMLHttpRequest !== 'undefined') {
                return new XMLHttpRequest();
            }
            else if (typeof ActiveXObject !== 'undefined') {
                try {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            } else {
                return null;
            }
        },

        /**
         * Set the necessary headers for an ajax request
         *
         * @method setHeaders
         * @param {String} url - url for the request
         */
        setHeaders: function()
        {
            if (this.transport) {
                try {
                    var headers = {
                        "Accept": "text/javascript,text/xml,application/xml,application/xhtml+xml,text/html,application/json;q=0.9,text/plain;q=0.8,video/x-mng,image/png,image/jpeg,image/gif;q=0.2,*/*;q=0.1",
                        "Accept-Language": navigator.language,
                        "X-Requested-With": "XMLHttpRequest",
                        "X-Ink-Version": "2"
                    };
                    if (this.options.cors) {
                        if (!this.options.signRequest) {
                            delete headers['X-Requested-With'];
                        }
                        delete headers['X-Ink-Version'];
                    }

                    if (this.options.requestHeaders && typeof this.options.requestHeaders === 'object') {
                        for(var headerReqName in this.options.requestHeaders) {
                            if (this.options.requestHeaders.hasOwnProperty(headerReqName)) {
                                headers[headerReqName] = this.options.requestHeaders[headerReqName];
                            }
                        }
                    }

                    if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005) {
                        headers.Connection = 'close';
                    }

                    for (var headerName in headers) {
                        if(headers.hasOwnProperty(headerName)) {
                            this.transport.setRequestHeader(headerName, headers[headerName]);
                        }
                    }
                } catch(e) {}
            }
        },

        /**
         * Converts an object with parameters to a querystring
         *
         * @method paramsObjToStr
         * @param {Object|String}  optParams  parameters object
         * @return {String} querystring
         */
        paramsObjToStr: function(optParams) {
            var k, m, p, a, params = [];
            if (typeof optParams === 'object') {
                for (p in optParams){
                    if (optParams.hasOwnProperty(p)) {
                        a = optParams[p];
                        if (Object.prototype.toString.call(a) === '[object Array]' && !isNaN(a.length)) {
                            for (k = 0, m = a.length; k < m; k++) {
                                params = params.concat([
                                    encodeURIComponent(p), '[]',   '=',
                                    encodeURIComponent(a[k]), '&'
                                ]);
                            }
                        }
                        else {
                            params = params.concat([
                                encodeURIComponent(p), '=',
                                encodeURIComponent(a), '&'
                            ]);
                        }
                    }
                }
                if (params.length > 0) {
                    params.pop();
                }
            }
            else
            {
                return optParams;
            }
            return params.join('');
        },

        /**
         * set the url parameters for a GET request
         *
         * @method setParams
         */
        setParams: function()
        {
            var params = null, optParams = this.options.parameters;

            if(typeof optParams === "object"){
                params = this.paramsObjToStr(optParams);
            } else {
                params = '' + optParams;
            }

            if(params){
                if(this.url.indexOf('?') > -1) {
                    this.url = this.url.split('#')[0] + '&' + params;
                } else {
                    this.url = this.url.split('#')[0] + '?' + params;
                }
            }
        },

        /**
         * Retrieves HTTP header from response
         *
         * @method getHeader
         * @param {String}  name  header name
         * @return {String} header content
         */
        getHeader: function(name)
        {
            if (this.usingXDomainReq && name === 'Content-Type') {
                return this.transport.contentType;
            }
            try{
                return this.transport.getResponseHeader(name);
            } catch(e) {
                return null;
            }
        },

        /**
         * Returns all http headers from the response
         *
         * @method getAllHeaders
         * @return {String} the headers, each separated by a newline
         */
        getAllHeaders: function()
        {
            try {
                return this.transport.getAllResponseHeaders();
            } catch(e) {
                return null;
            }
        },

        /**
         * Setup the response object
         *
         * @method getResponse
         * @return {Object} the response object
         */
        getResponse: function(){
            // setup our own stuff
            var t = this.transport,
                r = {
                    headerJSON: null,
                    responseJSON: null,
                    getHeader: this.getHeader,
                    getAllHeaders: this.getAllHeaders,
                    request: this,
                    transport: t,
                    timeTaken: new Date() - this.startTime,
                    requestedUrl: this.url
                };

            // setup things expected from the native object
            r.readyState = t.readyState;
            try { r.responseText = t.responseText; } catch(e) {}
            try { r.responseXML  = t.responseXML;  } catch(e) {}
            try { r.status       = t.status;       } catch(e) { r.status     = 0;  }
            try { r.statusText   = t.statusText;   } catch(e) { r.statusText = ''; }

            return r;
        },

        /**
         * Aborts the request if still running. No callbacks are called
         *
         * @method abort
         */
        abort: function(){
            if (this.transport) {
                clearTimeout(this.delayTimeout);
                clearTimeout(this.stoTimeout);
                try { this.transport.abort(); } catch(ex) {}
                this.finish();
            }
        },

        /**
         * Executes the state changing phase of an ajax request
         *
         * @method runStateChange
         */
        runStateChange: function()
        {
            var rs = this.transport.readyState;
            if (rs === 3) {
                if (this.isHTTP) {
                    this.safeCall('onHeaders');
                }
            } else if (rs === 4 || this.usingXDomainReq) {

                if (this.options.asynchronous && this.options.delay && (this.startTime + this.options.delay > new Date().getTime())) {
                    this.delayTimeout = setTimeout(Ink.bind(this.runStateChange, this), this.options.delay + this.startTime - new Date().getTime());
                    return;
                }

                var responseJSON,
                    responseContent = this.transport.responseText,
                    response = this.getResponse(),
                    curStatus = this.transport.status;

                if (this.isHTTP && !this.options.asynchronous) {
                    this.safeCall('onHeaders');
                }

                clearTimeout(this.stoTimeout);

                if (curStatus === 0) {
                    // Status 0 indicates network error for http requests.
                    // For http less requests, 0 is always returned.
                    if (this.isHTTP) {
                        this.safeCall('onException', this.makeError(18, 'NETWORK_ERR'));
                    } else {
                        curStatus = responseContent ? 200 : 404;
                    }
                }
                else if (curStatus === 304) {
                    curStatus = 200;
                }
                var isSuccess = this.usingXDomainReq || 200 <= curStatus && curStatus < 300;

                var headerContentType = this.getHeader('Content-Type') || '';
                if (this.options.evalJS &&
                    (headerContentType.indexOf("application/json") >= 0 || this.options.evalJS === 'force')){
                        try {
                            responseJSON = this.evalJSON(responseContent, this.sanitizeJSON);
                            if(responseJSON){
                                responseContent = response.responseJSON = responseJSON;
                            }
                        } catch(e){
                            if (isSuccess) {
                                // If the request failed, then this is perhaps an error page
                                // so don't notify error.
                                this.safeCall('onException', e);
                            }
                        }
                }

                if (this.usingXDomainReq && headerContentType.indexOf('xml') !== -1 && 'DOMParser' in window) {
                    // http://msdn.microsoft.com/en-us/library/ie/ff975278(v=vs.85).aspx
                    var mimeType;
                    switch (headerContentType) {
                        case 'application/xml':
                        case 'application/xhtml+xml':
                        case 'image/svg+xml':
                            mimeType = headerContentType;
                            break;
                        default:
                            mimeType = 'text/xml';
                    }
                    var xmlDoc = (new DOMParser()).parseFromString( this.transport.responseText, mimeType);
                    this.transport.responseXML = xmlDoc;
                    response.responseXML  = xmlDoc;
                }

                if (this.transport.responseXML !== null && response.responseJSON === null && this.transport.responseXML.xml !== ""){
                    responseContent = this.transport.responseXML;
                }

                if (curStatus || this.usingXDomainReq) {
                    if (isSuccess) {
                        this.safeCall('onSuccess', response, responseContent);
                    } else {
                        this.safeCall('onFailure', response, responseContent);
                    }
                    this.safeCall('on'+curStatus, response, responseContent);
                }
                this.finish(response, responseContent);
            }
        },

        /**
         * Last step after XHR is complete. Call onComplete and cleanup object
         *
         * @method finish
         * @param {} response
         * @param {} responseContent
         */
        finish: function(response, responseContent){
            if (response) {
                this.safeCall('onComplete', response, responseContent);
            }
            clearTimeout(this.stoTimeout);

            if (this.transport) {
                // IE6 sometimes barfs on this one
                try{ this.transport.onreadystatechange = null; } catch(e){}

                if (typeof this.transport.destroy === 'function') {
                    // Stuff for Samsung.
                    this.transport.destroy();
                }

                // Let XHR be collected.
                this.transport = null;
            }
        },

        /**
         * Safely calls a callback function.
         * Verifies that the callback is well defined and traps errors
         *
         * @method safeCall
         * @param {Function}  listener
         */
        safeCall: function(listener, first/*, second*/) {
            function rethrow(exception){
                setTimeout(function() {
                    // Rethrow exception so it'll land in
                    // the error console, firebug, whatever.
                    if (exception.message) {
                        exception.message += '\n'+(exception.stacktrace || exception.stack || '');
                    }
                    throw exception;
                }, 1);
            }
            if (typeof this.options[listener] === 'function') {
                //SAPO.safeCall(this, this.options[listener], first, second);
                //return object[listener].apply(object, [].slice.call(arguments, 2));
                try {
                    this.options[listener].apply(this, [].slice.call(arguments, 1));
                } catch(ex) {
                    rethrow(ex);
                }
            } else if (first && window.Error && (first instanceof Error)) {
                rethrow(first);
            }
        },

        /**
         * Sets new request header for the subsequent http request
         *
         * @method setRequestHeader
         * @param {String} name
         * @param {String} value
         */
        setRequestHeader: function(name, value){
            if (!this.options.requestHeaders) {
                this.options.requestHeaders = {};
            }
            this.options.requestHeaders[name] = value;
        },

        /**
         * Execute the request
         *
         * @method request
         */
        request: function()
        {
            if(this.transport) {
                var params = null;
                if(this.requestHasBody) {
                    if(this.options.postBody !== null && this.options.postBody !== '') {
                        params = this.options.postBody;
                        this.setParams();
                    } else if (this.options.parameters !== null && this.options.parameters !== ''){
                        params = this.options.parameters;
                    }

                    if (typeof params === "object" && !params.nodeType) {
                        params = this.paramsObjToStr(params);
                    } else if (typeof params !== "object" && params !== null){
                        params = '' + params;
                    }

                    if(this.options.contentType) {
                        this.setRequestHeader('Content-Type', this.options.contentType);
                    }
                } else {
                    this.setParams();
                }

                var url = this.url;
                var method = this.options.method;
                var crossDomain = this.isCrossDomain;

                if (crossDomain && this.options.xhrProxy) {
                    this.setRequestHeader('X-Url', url);
                    url = this.options.xhrProxy + encodeURIComponent(url);
                    crossDomain = false;
                }

                try {
                    this.transport.open(method, url, this.options.asynchronous);
                } catch(e) {
                    this.safeCall('onException', e);
                    return this.finish(this.getResponse(), null);
                }

                this.setHeaders();

                this.safeCall('onCreate');

                if(this.options.timeout && !isNaN(this.options.timeout)) {
                    this.stoTimeout = setTimeout(Ink.bind(function() {
                        if(this.options.onTimeout) {
                            this.safeCall('onTimeout');
                            this.abort();
                        }
                    }, this), (this.options.timeout * 1000));
                }

                if(this.options.useCredentials && !this.usingXDomainReq) {
                    this.transport.withCredentials = true;
                }

                if(this.options.asynchronous && !this.usingXDomainReq) {
                    this.transport.onreadystatechange = Ink.bind(this.runStateChange, this);
                }
                else if (this.usingXDomainReq) {
                    this.transport.onload = Ink.bind(this.runStateChange, this);
                }

                try {
                    if (crossDomain) {
                        // Need explicit handling because Mozila aborts
                        // the script and Chrome fails silently.per the spec
                        throw this.makeError(18, 'NETWORK_ERR');
                    } else {
                        this.startTime = new Date().getTime();
                        this.transport.send(params);
                    }
                } catch(e) {
                    this.safeCall('onException', e);
                    return this.finish(this.getResponse(), null);
                }

                if(!this.options.asynchronous) {
                    this.runStateChange();
                }
            }
        },

        /**
         * Returns new exception object that can be thrown
         *
         * @method makeError
         * @param code
         * @param message
         * @returns {Object}
         */
        makeError: function(code, message){
            if (typeof Error !== 'function') {
                return {code: code, message: message};
            }
            var e = new Error(message);
            e.code = code;
            return e;
        },

        /**
         * Checks if a given string is valid JSON
         *
         * @method isJSON
         * @param {String} str  String to be evaluated
         * @return {Boolean} True if the string is valid JSON
         */
        isJSON: function(str)
        {
            if (typeof str !== "string" || !str){ return false; }
            str = str.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
            return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
        },

        /**
         * Evaluates a given string as JSON
         *
         * @method evalJSON
         * @param {String}  str       String to be evaluated
         * @param {Boolean} sanitize  whether to sanitize the content or not
         * @return {Object} Json content as an object
         */
        evalJSON: function(strJSON, sanitize)
        {
            if (strJSON && (!sanitize || this.isJSON(strJSON))) {
                try {
                    if (typeof JSON  !== "undefined" && typeof JSON.parse !== 'undefined'){
                        return JSON.parse(strJSON);
                    }
                    /*jshint evil:true */
                    return eval('(' + strJSON + ')');
                } catch(e) {
                    throw new Error('ERROR: Bad JSON string...');
                }
            }
            return null;
        }
    };

    /**
     * Loads content from a given url through a XMLHttpRequest.
     *
     * Shortcut function for simple AJAX use cases.
     *
     * Works with JSON, XML and plain text.
     *
     * @method load
     * @param {String}   url       request url
     * @param {Function} callback  callback to be executed if the request is successful
     * @return {Object} XMLHttpRequest object
     *
     * @example
     *      Ajax.load('some/text/file', function (responseText) {
     *          doSomething(responseText);
     *      });
     *      Ajax.load('some/xml/file', function (responseXML) {
     *          doSomething(responseXML);
     *      });
     *      Ajax.load('some/json/file', function (responseJSON) {
     *          doSomething(responseJSON);
     *      });
     *
     */
    Ajax.load = function(url, callback){
        return new Ajax(url, {
            method: 'GET',
            onSuccess: function(response){
                callback(response.responseJSON || response.responseText, response);
            }
        });
    };

    /**
     * Loads content from a given url through a XMLHttpRequest.
     * Shortcut function for simple AJAX use cases.
     *
     * @method ping
     * @param {String}   url       request url
     * @param {Function} callback  callback to be executed if the request is successful
     * @return {Object} XMLHttpRequest object
     */
    Ajax.ping = function(url, callback){
        return new Ajax(url, {
            method: 'HEAD',
            onSuccess: function(response){
                if (typeof callback === 'function'){
                    callback(response);
                }
            }
        });
    };


    return Ajax;
});

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Net.JsonP', '1', [], function() {

    'use strict';

    /**
     * @module Ink.Net.JsonP_1
     */

    /**
     * This class takes care of the nitty-gritty details of doing jsonp requests: Storing
     * a callback in a globally accessible manner, waiting for the timeout or completion
     * of the request, and passing extra GET parameters to the server, is not so complicated
     * but it's boring and repetitive to code and tricky to get right.
     *
     * @class Ink.Net.JsonP
     * @constructor
     * @param {String} uri
     * @param {Object} options
     * @param {Function}  options.onSuccess         success callback
     * @param {Function}  [options.onFailure]       failure callback
     * @param {Object}    [options.failureObj]      object to be passed as argument to failure callback
     * @param {Number}    [options.timeout]         timeout for request fail, in seconds. defaults to 10
     * @param {Object}    [options.params]          object with the parameters and respective values to unfold
     * @param {String}    [options.callbackParam]   parameter to use as callback. defaults to 'jsoncallback'
     * @param {String}    [options.internalCallback] *Advanced*: name of the callback function stored in the Ink.Net.JsonP object.
     *
     * @example
     *      Ink.requireModules(['Ink.Net.JsonP_1'], function (JsonP) {
     *          var jsonp = new JsonP('http://path.to.jsonp/endpoint', {
     *              // When the JSONP response arrives, this callback is called:
     *              onSuccess: function (gameData) {
     *                  game.startGame(gameData);
     *              },
     *              // after options.timeout seconds, this callback gets called:
     *              onFailure: function () {
     *                  game.error('Could not load game data!');
     *              },
     *              timeout: 5
     *          });
     *      });
     */
    var JsonP = function(uri, options) {
        this.init(uri, options);
    };

    JsonP.prototype = {

        init: function(uri, options) {
            this.options = Ink.extendObj( {
                onSuccess:         undefined,
                onFailure:          undefined,
                failureObj:         {},
                timeout:            10,
                params:             {},
                callbackParam:      'jsoncallback',
                internalCallback:   '_cb',
                randVar:            false
            }, options || {});

            if(this.options.randVar !== false) {
                this.randVar = this.options.randVar;
            } else {
                this.randVar = parseInt(Math.random() * 100000, 10);
            }

            this.options.internalCallback += this.randVar;

            this.uri = uri;

            // prevent SAPO legacy onComplete - make it onSuccess
            if(typeof(this.options.onComplete) === 'function') {
                this.options.onSuccess = this.options.onComplete;
            }

            if (typeof this.uri !== 'string') {
                throw 'Please define an URI';
            }

            if (typeof this.options.onSuccess !== 'function') {
                throw 'please define a callback function on option onSuccess!';
            }

            Ink.Net.JsonP[this.options.internalCallback] = Ink.bind(function() {
                window.clearTimeout(this.timeout);
                delete window.Ink.Net.JsonP[this.options.internalCallback];
                this._removeScriptTag();
                this.options.onSuccess(arguments[0]);
            }, this);

            this._addScriptTag();
        },

        _addParamsToGet: function(uri, params) {
            var hasQuestionMark = uri.indexOf('?') !== -1;
            var sep, pKey, pValue, parts = [uri];

            for (pKey in params) {
                if (params.hasOwnProperty(pKey)) {
                    if (!hasQuestionMark) { sep = '?';  hasQuestionMark = true; }
                    else {                  sep = '&';                          }
                    pValue = params[pKey];
                    if (typeof pValue !== 'number' && !pValue) {    pValue = '';    }
                    parts = parts.concat([sep, pKey, '=', encodeURIComponent(pValue)]);
                }
            }

            return parts.join('');
        },

        _getScriptContainer: function() {
            var headEls = document.getElementsByTagName('head');
            if (headEls.length === 0) {
                var scriptEls = document.getElementsByTagName('script');
                return scriptEls[0];
            }
            return headEls[0];
        },

        _addScriptTag: function() {
            // enrich options will callback and random seed
            this.options.params[this.options.callbackParam] = 'Ink.Net.JsonP.' + this.options.internalCallback;
            this.options.params.rnd_seed = this.randVar;
            this.uri = this._addParamsToGet(this.uri, this.options.params);
            // create script tag
            var scriptEl = document.createElement('script');
            scriptEl.type = 'text/javascript';
            scriptEl.src = this.uri;
            var scriptCtn = this._getScriptContainer();
            scriptCtn.appendChild(scriptEl);
            this.timeout = setTimeout(Ink.bind(this._requestFailed, this), (this.options.timeout * 1000));
        },

        _requestFailed : function () {
            delete Ink.Net.JsonP[this.options.internalCallback];
            this._removeScriptTag();
            if(typeof this.options.onFailure === 'function'){
                this.options.onFailure(this.options.failureObj);
            }
        },

        _removeScriptTag: function() {
            var scriptEl;
            var scriptEls = document.getElementsByTagName('script');
            var scriptUri;
            for (var i = 0, f = scriptEls.length; i < f; ++i) {
                scriptEl = scriptEls[i];
                scriptUri = scriptEl.getAttribute('src') || scriptEl.src;
                if (scriptUri !== null && scriptUri === this.uri) {
                    scriptEl.parentNode.removeChild(scriptEl);
                    return;
                }
            }
        }

    };

    return JsonP;

});

/**
 * @module Ink.Dom.Browser_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Dom.Browser', '1', [], function() {
    'use strict';    

    /**
     * @class Ink.Dom.Browser
     * @version 1
     * @static
     * @example
     *     <input type="text" id="dPicker" />
     *     <script>
     *         Ink.requireModules(['Ink.Dom.Browser_1'],function( InkBrowser ){
     *             if( InkBrowser.CHROME ){
     *                 console.log( 'This is a CHROME browser.' );
     *             }
     *         });
     *     </script>
     */
    var Browser = {
        /**
         * True if the browser is Internet Explorer
         *
         * @property IE
         * @type {Boolean}
         * @public
         * @static
         */
        IE: false,

        /**
         * True if the browser is Gecko based
         *
         * @property GECKO
         * @type {Boolean}
         * @public
         * @static
         */
        GECKO: false,

        /**
         * True if the browser is Opera
         *
         * @property OPERA
         * @type {Boolean}
         * @public
         * @static
         */
        OPERA: false,

        /**
         * True if the browser is Safari
         *
         * @property SAFARI
         * @type {Boolean}
         * @public
         * @static
         */
        SAFARI: false,

        /**
         * True if the browser is Konqueror
         *
         * @property KONQUEROR
         * @type {Boolean}
         * @public
         * @static
         */
        KONQUEROR: false,

        /**
         * True if browser is Chrome
         *
         * @property CHROME
         * @type {Boolean}
         * @public
         * @static
         */
        CHROME: false,

        /**
         * The specific browser model. False if it is unavailable.
         *
         * @property model
         * @type {Boolean|String}
         * @public
         * @static
         */
        model: false,

        /**
         * The browser version. False if it is unavailable.
         *
         * @property version
         * @type {Boolean|String}
         * @public
         * @static
         */
        version: false,

        /**
         * The user agent string. False if it is unavailable.
         *
         * @property userAgent
         * @type {Boolean|String}
         * @public
         * @static
         */
        userAgent: false,

        /**
         * Initialization function for the Browser object.
         *
         * Is called automatically when this module is loaded, and calls setDimensions, setBrowser and setReferrer.
         *
         * @method init
         * @public
         */
        init: function() {
            this.detectBrowser();
            this.setDimensions();
            this.setReferrer();
        },

        /**
         * Retrieves and stores window dimensions in this object. Called automatically when this module is loaded.
         *
         * @method setDimensions
         * @public
         */
        setDimensions: function() {
            //this.windowWidth=window.innerWidth !== null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body !== null ? document.body.clientWidth : null;
            //this.windowHeight=window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
            var myWidth = 0, myHeight = 0;
            if ( typeof window.innerWidth=== 'number' ) {
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            this.windowWidth = myWidth;
            this.windowHeight = myHeight;
        },

        /**
         * Stores the referrer. Called automatically when this module is loaded.
         *
         * @method setReferrer
         * @public
         */
        setReferrer: function() {
            if (document.referrer && document.referrer.length) {
                this.referrer = window.escape(document.referrer);
            } else {
                this.referrer = false;
            }
        },

        /**
         * Detects the browser and stores the found properties. Called automatically when this module is loaded.
         *
         * @method detectBrowser
         * @public
         */
        detectBrowser: function() {
            this._sniffUserAgent(navigator.userAgent);
        },

        _sniffUserAgent: function (sAgent) {
            this.userAgent = sAgent;

            sAgent = sAgent.toLowerCase();

            if (/applewebkit\//.test(sAgent)) {
                this.cssPrefix = '-webkit-';
                this.domPrefix = 'Webkit';
                if(/(chrome|crios)\//.test(sAgent)) {
                    // Chrome
                    this.CHROME = true;
                    this.model = 'chrome';
                    this.version = sAgent.replace(/(.*)chrome\/([^\s]+)(.*)/, "$2");
                } else {
                    // Safari
                    this.SAFARI = true;
                    this.model = 'safari';
                    var rVersion = /version\/([^) ]+)/;
                    if (rVersion.test(sAgent)) {
                        this.version = sAgent.match(rVersion)[1];
                    } else {
                        this.version = sAgent.replace(/(.*)applewebkit\/([^\s]+)(.*)/, "$2");
                    }
                }
            } else if (/opera/.test(sAgent)) {
                // Opera
                this.OPERA = true;
                this.model = 'opera';
                this.version = sAgent.replace(/(.*)opera.([^\s$]+)(.*)/, "$2");
                this.cssPrefix = '-o-';
                this.domPrefix = 'O';
            } else if (/konqueror/.test(sAgent)) {
                // Konqueroh
                this.KONQUEROR = true;
                this.model = 'konqueror';
                this.version = sAgent.replace(/(.*)konqueror\/([^;]+);(.*)/, "$2");
                this.cssPrefix = '-khtml-';
                this.domPrefix = 'Khtml';
            } else if (/(msie|trident)/i.test(sAgent)) {
                // MSIE
                this.IE = true;
                this.model = 'ie';
                if (/rv:((?:\d|\.)+)/.test(sAgent)) {  // IE 11
                    this.version = sAgent.match(/rv:((?:\d|\.)+)/)[1];
                } else {
                    this.version = sAgent.replace(/(.*)\smsie\s([^;]+);(.*)/, "$2");
                }
                this.cssPrefix = '-ms-';
                this.domPrefix = 'ms';
            } else if (/gecko/.test(sAgent)) {
                // GECKO
                // Supports only:
                // Camino, Chimera, Epiphany, Minefield (firefox 3), Firefox, Firebird, Phoenix, Galeon,
                // Iceweasel, K-Meleon, SeaMonkey, Netscape, Songbird, Sylera,
                this.cssPrefix = '-moz-';
                this.domPrefix = 'Moz';

                this.GECKO = true;

                var re = /(camino|chimera|epiphany|minefield|firefox|firebird|phoenix|galeon|iceweasel|k\-meleon|seamonkey|netscape|songbird|sylera)/;
                if(re.test(sAgent)) {
                    this.model = sAgent.match(re)[1];
                    this.version = sAgent.replace(new RegExp("(.*)"+this.model+"\/([^;\\s$]+)(.*)"), "$2");
                } else {
                    // probably is mozilla
                    this.model = 'mozilla';
                    var reVersion = /(.*)rv:([^)]+)(.*)/;
                    if(reVersion.test(sAgent)) {
                        this.version = sAgent.replace(reVersion, "$2");
                    }
                }
            }
        },

        /**
         * Debug function which displays browser (and Ink.Dom.Browser) information as an alert message.
         *
         * @method debug
         * @public
         *
         * @example
         *  
         *  The following code
         *
         *      Ink.requireModules(['Ink.Dom.Browser_1'], function (Browser) {
         *          Browser.debug();
         *      });
         *
         *  Alerts (On Firefox 22):
         *
         *      known browsers: (ie, gecko, opera, safari, konqueror) 
         *      false,true,false,false,false
         *      model -> firefox
         *      version -> 22.0
         *      
         *      original UA -> Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0
         */
        debug: function() {
            /*global alert:false */
            var str = "known browsers: (ie, gecko, opera, safari, konqueror) \n";
                str += [this.IE, this.GECKO, this.OPERA, this.SAFARI, this.KONQUEROR] +"\n";
                str += "model -> "+this.model+"\n";
                str += "version -> "+this.version+"\n";
                str += "\n";
                str += "original UA -> "+this.userAgent;

            alert(str);
        }
    };

    Browser.init();

    return Browser;
});

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule( 'Ink.Dom.Css', 1, [], function() {

    'use strict';

    /**
     * @module Ink.Dom.Css_1
     */

     // getComputedStyle feature detection.
     var getCs = ("defaultView" in document) && ("getComputedStyle" in document.defaultView) ? document.defaultView.getComputedStyle : window.getComputedStyle;

    /**
     * @class Ink.Dom.Css
     * @static
     */

    var Css = {
        /**
         * adds or removes a class to the given element according to addRemState
         *
         * @method addRemoveClassName
         * @param {DOMElement|string}   elm          DOM element or element id
         * @param {string}              className    class name to add or remove.
         * @param {boolean}             addRemState  Whether to add or remove. `true` to add, `false` to remove.
         *
         * @example
         *      Ink.requireModules(['Ink.Dom.Css_1'], function (Css) {
         *          Css.addRemoveClassName(myElm, 'classss', true);  // Adds the `classss` class.
         *          Css.addRemoveClassName(myElm, 'classss', false);  // Removes the `classss` class.
         *      });
         */
        addRemoveClassName: function(elm, className, addRemState) {
            if (addRemState) {
                return this.addClassName(elm, className);
            }
            this.removeClassName(elm, className);
        },

        /**
         * add a class to a given element
         *
         * @method addClassName
         * @param {DOMElement|String}  elm        DOM element or element id
         * @param {String}             className
         */
        addClassName: function(elm, className) {
            elm = Ink.i(elm);
            if (!elm || !className) { return null; }
            className = ('' + className).split(/[, ]+/);
            var i = 0;
            var len = className.length;

            for (; i < len; i++) {
                if (typeof elm.classList !== "undefined") {
                    elm.classList.add(className[i]);
                } else if (!Css.hasClassName(elm, className[i])) {
                    elm.className += (elm.className ? ' ' : '') + className[i];
                }
            }
        },

        /**
         * removes a class from a given element
         *
         * @method removeClassName
         * @param {DOMElement|String} elm        DOM element or element id
         * @param {String}            className
         */
        removeClassName: function(elm, className) {
            elm = Ink.i(elm);
            if (!elm || !className) { return null; }
            
            className = ('' + className).split(/[, ]+/);
            var i = 0;
            var len = className.length;

            if (typeof elm.classList !== "undefined"){
                for (; i < len; i++) {
                    elm.classList.remove(className[i]);
                }
            } else {
                var elmClassName = elm.className || '';
                var re;
                for (; i < len; i++) {
                    re = new RegExp("(^|\\s+)" + className[i] + "(\\s+|$)");
                    elmClassName = elmClassName.replace(re, ' ');
                }
                elm.className = (elmClassName
                    .replace(/^\s+/, '')
                    .replace(/\s+$/, ''));
            }
        },

        /**
         * Alias to addRemoveClassName. Utility function, saves many if/elses.
         *
         * @method setClassName
         * @param {DOMElement|String}  elm        DOM element or element id
         * @param {String}             className
         * @param {Boolean}            add        true to add, false to remove
         */
        setClassName: function(elm, className, add) {
            this.addRemoveClassName(elm, className, add || false);
        },

        /**
         * @method hasClassName
         * @param {DOMElement|String}  elm        DOM element or element id
         * @param {String|Array}       classNames classNames to test
         * @param {Boolean}            [all=false] if true, return whether all classes in classNames are there. Otherwise, return true if any is present.
         * @return {Boolean} true if a given class is applied to a given element
         */
        hasClassName: function(elm, className, all) {
            elm = Ink.i(elm);
            if (!elm || !className) { return false; }

            className = ('' + className).split(/[, ]+/);
            var i = 0;
            var len = className.length;
            var has;
            var re;

            for ( ; i < len; i++) {
                if (typeof elm.classList !== "undefined"){
                    has = elm.classList.contains(className[i]);
                } else {
                    var elmClassName = elm.className;
                    if (elmClassName === className[i]) {
                        has = true;
                    } else {
                        re = new RegExp("(^|\\s)" + className[i] + "(\\s|$)");
                        has = re.test(elmClassName);
                    }
                }
                if (has && !all) { return true; }  // return if looking for any class
                if (!has && all) { return false; }  // return if looking for all classes
            }

            if (all) {
                // if we got here, all classes were found so far
                return true;
            } else {
                // if we got here with all == false, no class was found
                return false;
            }
        },

        /**
         * Add and removes the class from the element with a timeout, so it blinks
         *
         * @method blinkClass
         * @param {DOMElement|String}  elm        DOM element or element id
         * @param {String}             className  class name
         * @param {Boolean}            timeout    timeout in ms between adding and removing, default 100 ms
         * @param {Boolean}            negate     is true, class is removed then added
         */
        blinkClass: function(element, className, timeout, negate){
            element = Ink.i(element);
            Css.addRemoveClassName(element, className, !negate);
            setTimeout(function() {
                Css.addRemoveClassName(element, className, negate);
            }, Number(timeout) || 100);
        },

        /**
         * Add or remove a class name from a given element
         *
         * @method toggleClassName
         * @param {DOMElement|String}  elm        DOM element or element id
         * @param {String}             className  class name
         * @param {Boolean}            forceAdd   forces the addition of the class if it doesn't exists
         */
        toggleClassName: function(elm, className, forceAdd) {
            if (elm && className){
                if (typeof elm.classList !== "undefined" && !/[, ]/.test(className)){
                    elm = Ink.i(elm);
                    if (elm !== null){
                        elm.classList.toggle(className);
                    }
                    return true;
                }
            }

            if (typeof forceAdd !== 'undefined') {
                if (forceAdd === true) {
                    Css.addClassName(elm, className);
                }
                else if (forceAdd === false) {
                    Css.removeClassName(elm, className);
                }
            } else {
                if (Css.hasClassName(elm, className)) {
                    Css.removeClassName(elm, className);
                } else {
                    Css.addClassName(elm, className);
                }
            }
        },

        /**
         * sets the opacity of given client a given element
         *
         * @method setOpacity
         * @param {DOMElement|String}  elm    DOM element or element id
         * @param {Number}             value  allows 0 to 1(default mode decimal) or percentage (warning using 0 or 1 will reset to default mode)
         */
        setOpacity: function(elm, value) {
            elm = Ink.i(elm);
            if (elm !== null){
                var val = 1;

                if (!isNaN(Number(value))){
                    if      (value <= 0) {   val = 0;           }
                    else if (value <= 1) {   val = value;       }
                    else if (value <= 100) { val = value / 100; }
                    else {                   val = 1;           }
                }

                if (typeof elm.style.opacity !== 'undefined') {
                    elm.style.opacity = val;
                }
                else {
                    elm.style.filter = "alpha(opacity:"+(val*100|0)+")";
                }
            }
        },

        /**
         * Converts a css property name to a string in camelcase to be used with CSSStyleDeclaration.
         * @method _camelCase
         * @private
         * @param {String} str  String to convert
         * @return {String} Converted string
         */
        _camelCase: function(str) {
            return str ? str.replace(/-(\w)/g, function (_, $1) {
                return $1.toUpperCase();
            }) : str;
        },


        /**
         * Gets the value for an element's style attribute
         *
         * @method getStyle
         * @param {DOMElement|String}  elm    DOM element or element id
         * @param {String}             style  Which css attribute to fetch
         * @return Style value
         */
         getStyle: function(elm, style) {
             elm = Ink.i(elm);
             if (elm !== null) {
                 style = style === 'float' ? 'cssFloat': this._camelCase(style);

                 var value = elm.style[style];

                 if (getCs && (!value || value === 'auto')) {
                     var css = getCs(elm, null);
                     value = css ? css[style] : null;
                 }
                 else if (!value && elm.currentStyle) {
                      value = elm.currentStyle[style];
                      if (value === 'auto' && (style === 'width' || style === 'height')) {
                        value = elm["offset" + style.charAt(0).toUpperCase() + style.slice(1)] + "px";
                      }
                 }

                 if (style === 'opacity') {
                     return value ? parseFloat(value, 10) : 1.0;
                 }
                 else if (style === 'borderTopWidth'   || style === 'borderBottomWidth' ||
                          style === 'borderRightWidth' || style === 'borderLeftWidth'       ) {
                      if      (value === 'thin') {      return '1px';   }
                      else if (value === 'medium') {    return '3px';   }
                      else if (value === 'thick') {     return '5px';   }
                 }

                 return value === 'auto' ? null : value;
             }
         },


        /**
         * Adds CSS rules to an element's style attribute.
         *
         * @method setStyle
         * @param {DOMElement|String}  elm    DOM element or element id
         * @param {String}             style  Which css attribute to set
         *
         * @example
         *     <a href="#" class="change-color">Change his color</a>
         *     <p class="him">"He" is me</p>
         *     <script type="text/javascript">
         *         Ink.requireModules(['Ink.Dom.Css_1', 'Ink.Dom.Event_1', 'Ink.Dom.Selector_1'], function (Css, InkEvent, Selector) {
         *             var btn = Selector.select('.change-color')[0];
         *             var other = Selector.select('.him')[0];
         *             InkEvent.observe(btn, 'click', function () {
         *                 Css.setStyle(other, 'background-color: black');
         *                 Css.setStyle(other, 'color: white');
         *             });
         *         });
         *     </script>
         *
         */
        setStyle: function(elm, style) {
            elm = Ink.i(elm);
            if (elm === null) { return; }
            if (typeof style === 'string') {
                elm.style.cssText += '; '+style;

                if (style.indexOf('opacity') !== -1) {
                    this.setOpacity(elm, style.match(/opacity:\s*(\d?\.?\d*)/)[1]);
                }
            }
            else {
                for (var prop in style) {
                    if (style.hasOwnProperty(prop)){
                        if (prop === 'opacity') {
                            this.setOpacity(elm, style[prop]);
                        }
                        else if (prop === 'float' || prop === 'cssFloat') {
                            if (typeof elm.style.styleFloat === 'undefined') {
                                elm.style.cssFloat = style[prop];
                            }
                            else {
                                elm.style.styleFloat = style[prop];
                            }
                        } else {
                            elm.style[prop] = style[prop];
                        }
                    }
                }
            }
        },


        /**
         * Makes an element visible
         *
         * @method show
         * @param {DOMElement|String}  elm                   DOM element or element id
         * @param {String}             forceDisplayProperty  Css display property to apply on show
         */
        show: function(elm, forceDisplayProperty) {
            elm = Ink.i(elm);
            if (elm !== null) {
                elm.style.display = (forceDisplayProperty) ? forceDisplayProperty : '';
            }
        },

        /**
         * Hides an element
         *
         * @method hide
         * @param {DOMElement|String}  elm  DOM element or element id
         */
        hide: function(elm) {
            elm = Ink.i(elm);
            if (elm !== null) {
                elm.style.display = 'none';
            }
        },

        /**
         * shows or hides according to param show
         *
         * @method showHide
         * @param {DOMElement|String}  elm          DOM element or element id
         * @param {boolean}            [show=false] Whether to show or hide `elm`.
         */
        showHide: function(elm, show) {
            elm = Ink.i(elm);
            if (elm) {
                elm.style.display = show ? '' : 'none';
            }
        },

        /**
         * Shows or hides an element depending on current state
         * @method toggle
         * @param {DOMElement|String}  elm        DOM element or element id
         * @param {Boolean}            forceShow  Forces showing if element is hidden
         */
        toggle: function(elm, forceShow) {
            elm = Ink.i(elm);
            if (elm !== null) {
                if (typeof forceShow !== 'undefined') {
                    if (forceShow === true) {
                        this.show(elm);
                    } else {
                        this.hide(elm);
                    }
                } else {
                    if (this.getStyle(elm,'display').toLowerCase() === 'none') {
                        this.show(elm);
                    }
                    else {
                        this.hide(elm);
                    }
                }
            }
        },

        _getRefTag: function(head){
            if (head.firstElementChild) {
                return head.firstElementChild;
            }

            for (var child = head.firstChild; child; child = child.nextSibling){
                if (child.nodeType === 1){
                    return child;
                }
            }
            return null;
        },

        /**
         * Adds css style tags to the head section of a page
         *
         * @method appendStyleTag
         * @param {String}  selector  The css selector for the rule
         * @param {String}  style     The content of the style rule
         * @param {Object}  options   Options for the tag
         *    @param {String}  [options.type]   file type
         *    @param {Boolean} [options.force]  if true, style tag will be appended to end of head
         */
        appendStyleTag: function(selector, style, options){
            options = Ink.extendObj({
                type: 'text/css',
                force: false
            }, options || {});

            var styles = document.getElementsByTagName("style"),
                oldStyle = false, setStyle = true, i, l;

            for (i=0, l=styles.length; i<l; i++) {
                oldStyle = styles[i].innerHTML;
                if (oldStyle.indexOf(selector) >= 0) {
                    setStyle = false;
                }
            }

            if (setStyle) {
                var defStyle = document.createElement("style"),
                    head = document.getElementsByTagName("head")[0],
                    refTag = false, styleStr = '';

                defStyle.type  = options.type;

                styleStr += selector +" {";
                styleStr += style;
                styleStr += "} ";

                if (typeof defStyle.styleSheet !== "undefined") {
                    defStyle.styleSheet.cssText = styleStr;
                } else {
                    defStyle.appendChild(document.createTextNode(styleStr));
                }

                if (options.force){
                    head.appendChild(defStyle);
                } else {
                    refTag = this._getRefTag(head);
                    if (refTag){
                        head.insertBefore(defStyle, refTag);
                    }
                }
            }
        },

        /**
         * Adds a link tag for a stylesheet to the head section of a page
         *
         * @method appendStylesheet
         * @param {String}  path     File path
         * @param {Object}  options  Options for the tag
         *    @param {String}   [options.media='screen']    media type
         *    @param {String}   [options.type='text/css']   file type
         *    @param {Boolean}  [options.force=false]       if true, tag will be appended to end of head
         */
        appendStylesheet: function(path, options){
            options = Ink.extendObj({
                media: 'screen',
                type: 'text/css',
                force: false
            }, options || {});

            var refTag,
                style = document.createElement("link"),
                head = document.getElementsByTagName("head")[0];

            style.media = options.media;
            style.type = options.type;
            style.href = path;
            style.rel = "Stylesheet";

            if (options.force){
                head.appendChild(style);
            }
            else {
                refTag = this._getRefTag(head);
                if (refTag){
                    head.insertBefore(style, refTag);
                }
            }
        },

        /**
         * Loads CSS via LINK element inclusion in HEAD (skips append if already there)
         *
         * Works similarly to appendStylesheet but:
         *   a) supports all browsers;
         *   b) supports optional callback which gets invoked once the CSS has been applied
         *
         * @method appendStylesheetCb
         * @param {String}            cssURI      URI of the CSS to load, if empty ignores and just calls back directly
         * @param {Function(cssURI)}  [callback]  optional callback which will be called once the CSS is loaded
         */
        _loadingCSSFiles: {},
        _loadedCSSFiles:  {},
        appendStylesheetCb: function(url, callback) {
            if (!url) {
                return callback(url);
            }

            if (this._loadedCSSFiles[url]) {
                return callback(url);
            }

            var cbs = this._loadingCSSFiles[url];
            if (cbs) {
                return cbs.push(callback);
            }

            this._loadingCSSFiles[url] = [callback];

            var linkEl = document.createElement('link');
            linkEl.type = 'text/css';
            linkEl.rel  = 'stylesheet';
            linkEl.href = url;

            var headEl = document.getElementsByTagName('head')[0];
            headEl.appendChild(linkEl);

            var imgEl = document.createElement('img');
            /*
            var _self = this;
            (function(_url) {
                imgEl.onerror = function() {
                    //var url = this;
                    var url = _url;
                    _self._loadedCSSFiles[url] = true;
                    var callbacks = _self._loadingCSSFiles[url];
                    for (var i = 0, f = callbacks.length; i < f; ++i) {
                        callbacks[i](url);
                    }
                    delete _self._loadingCSSFiles[url];
                };
            })(url);
            */
            imgEl.onerror = Ink.bindEvent(function(event, _url) {
                //var url = this;
                var url = _url;
                this._loadedCSSFiles[url] = true;
                var callbacks = this._loadingCSSFiles[url];
                for (var i = 0, f = callbacks.length; i < f; ++i) {
                    callbacks[i](url);
                }
                delete this._loadingCSSFiles[url];
            }, this, url);
            imgEl.src = url;
        },

        /**
         * Converts decimal to hexadecimal values, for use with colors
         *
         * @method decToHex
         * @param {String} dec Either a single decimal value,
         * an rgb(r, g, b) string or an Object with r, g and b properties
         * @return Hexadecimal value
         */
        decToHex: function(dec) {
            var normalizeTo2 = function(val) {
                if (val.length === 1) {
                    val = '0' + val;
                }
                val = val.toUpperCase();
                return val;
            };

            if (typeof dec === 'object') {
                var rDec = normalizeTo2(parseInt(dec.r, 10).toString(16));
                var gDec = normalizeTo2(parseInt(dec.g, 10).toString(16));
                var bDec = normalizeTo2(parseInt(dec.b, 10).toString(16));
                return rDec+gDec+bDec;
            }
            else {
                dec += '';
                var rgb = dec.match(/\((\d+),\s?(\d+),\s?(\d+)\)/);
                if (rgb !== null) {
                    return  normalizeTo2(parseInt(rgb[1], 10).toString(16)) +
                            normalizeTo2(parseInt(rgb[2], 10).toString(16)) +
                            normalizeTo2(parseInt(rgb[3], 10).toString(16));
                }
                else {
                    return normalizeTo2(parseInt(dec, 10).toString(16));
                }
            }
        },

        /**
         * Converts hexadecimal values to decimal, for use with colors
         *
         * @method hexToDec
         * @param {String}  hex  hexadecimal value with 6, 3, 2 or 1 characters
         * @return {Number} Object with properties r, g, b if length of number is >= 3 or decimal value instead.
         */
        hexToDec: function(hex){
            if (hex.indexOf('#') === 0) {
                hex = hex.substr(1);
            }
            if (hex.length === 6) { // will return object RGB
                return {
                    r: parseInt(hex.substr(0,2), 16),
                    g: parseInt(hex.substr(2,2), 16),
                    b: parseInt(hex.substr(4,2), 16)
                };
            }
            else if (hex.length === 3) { // will return object RGB
                return {
                    r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
                    g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
                    b: parseInt(hex.charAt(2) + hex.charAt(2), 16)
                };
            }
            else if (hex.length <= 2) { // will return int
                return parseInt(hex, 16);
            }
        },

        /**
         * use this to obtain the value of a CSS property (searched from loaded CSS documents)
         *
         * @method getPropertyFromStylesheet
         * @param {String}  selector  a CSS rule. must be an exact match
         * @param {String}  property  a CSS property
         * @return {String} value of the found property, or null if it wasn't matched
         */
        getPropertyFromStylesheet: function(selector, property) {
            var rule = this.getRuleFromStylesheet(selector);
            if (rule) {
                return rule.style[property];
            }
            return null;
        },

        getPropertyFromStylesheet2: function(selector, property) {
            var rules = this.getRulesFromStylesheet(selector);
            /*
            rules.forEach(function(rule) {
                var x = rule.style[property];
                if (x !== null && x !== undefined) {
                    return x;
                }
            });
            */
            var x;
            for(var i=0, t=rules.length; i < t; i++) {
                x = rules[i].style[property];
                if (x !== null && x !== undefined) {
                    return x;
                }
            }
            return null;
        },

        getRuleFromStylesheet: function(selector) {
            var sheet, rules, ri, rf, rule;
            var s = document.styleSheets;
            if (!s) {
                return null;
            }

            for (var si = 0, sf = document.styleSheets.length; si < sf; ++si) {
                sheet = document.styleSheets[si];
                rules = sheet.rules ? sheet.rules : sheet.cssRules;
                if (!rules) { return null; }

                for (ri = 0, rf = rules.length; ri < rf; ++ri) {
                    rule = rules[ri];
                    if (!rule.selectorText) { continue; }
                    if (rule.selectorText === selector) {
                        return rule;
                    }
                }
            }

            return null;
        },

        getRulesFromStylesheet: function(selector) {
            var res = [];
            var sheet, rules, ri, rf, rule;
            var s = document.styleSheets;
            if (!s) { return res; }

            for (var si = 0, sf = document.styleSheets.length; si < sf; ++si) {
                sheet = document.styleSheets[si];
                rules = sheet.rules ? sheet.rules : sheet.cssRules;
                if (!rules) {
                    return null;
                }

                for (ri = 0, rf = rules.length; ri < rf; ++ri) {
                    rule = rules[ri];
                    if (!rule.selectorText) { continue; }
                    if (rule.selectorText === selector) {
                        res.push(rule);
                    }
                }
            }

            return res;
        },

        getPropertiesFromRule: function(selector) {
            var rule = this.getRuleFromStylesheet(selector);
            var props = {};
            var prop, i, f;

            /*if (typeof rule.style.length === 'snumber') {
                for (i = 0, f = rule.style.length; i < f; ++i) {
                    prop = this._camelCase( rule.style[i]   );
                    props[prop] = rule.style[prop];
                }
            }
            else {  // HANDLES IE 8, FIREFOX RULE JOINING... */
                rule = rule.style.cssText;
                var parts = rule.split(';');
                var steps, val, pre, pos;
                for (i = 0, f = parts.length; i < f; ++i) {
                    if (parts[i].charAt(0) === ' ') {
                        parts[i] = parts[i].substring(1);
                    }
                    steps = parts[i].split(':');
                    prop = this._camelCase( steps[0].toLowerCase()  );
                    val = steps[1];
                    if (val) {
                        val = val.substring(1);

                        if (prop === 'padding' || prop === 'margin' || prop === 'borderWidth') {

                            if (prop === 'borderWidth') {   pre = 'border'; pos = 'Width';  }
                            else {                          pre = prop;     pos = '';       }

                            if (val.indexOf(' ') !== -1) {
                                val = val.split(' ');
                                props[pre + 'Top'   + pos]  = val[0];
                                props[pre + 'Bottom'+ pos]  = val[0];
                                props[pre + 'Left'  + pos]  = val[1];
                                props[pre + 'Right' + pos]  = val[1];
                            }
                            else {
                                props[pre + 'Top'   + pos]  = val;
                                props[pre + 'Bottom'+ pos]  = val;
                                props[pre + 'Left'  + pos]  = val;
                                props[pre + 'Right' + pos]  = val;
                            }
                        }
                        else if (prop === 'borderRadius') {
                            if (val.indexOf(' ') !== -1) {
                                val = val.split(' ');
                                props.borderTopLeftRadius       = val[0];
                                props.borderBottomRightRadius   = val[0];
                                props.borderTopRightRadius      = val[1];
                                props.borderBottomLeftRadius    = val[1];
                            }
                            else {
                                props.borderTopLeftRadius       = val;
                                props.borderTopRightRadius      = val;
                                props.borderBottomLeftRadius    = val;
                                props.borderBottomRightRadius   = val;
                            }
                        }
                        else {
                            props[prop] = val;
                        }
                    }
                }
            //}
            //console.log(props);

            return props;
        },

        /**
         * Changes the font size of the elements which match the given CSS rule
         * For this function to work, the CSS file must be in the same domain than the host page, otherwise JS can't access it.
         *
         * @method changeFontSize
         * @param {String}  selector  CSS selector rule
         * @param {Number}  delta     number of pixels to change on font-size
         * @param {String}  [op]      supported operations are '+' and '*'. defaults to '+'
         * @param {Number}  [minVal]  if result gets smaller than minVal, change does not occurr
         * @param {Number}  [maxVal]  if result gets bigger  than maxVal, change does not occurr
         */
        changeFontSize: function(selector, delta, op, minVal, maxVal) {
            var that = this;
            Ink.requireModules(['Ink.Dom.Selector_1'], function(Selector) {
                var e;
                if      (typeof selector !== 'string') { e = '1st argument must be a CSS selector rule.'; }
                else if (typeof delta    !== 'number') { e = '2nd argument must be a number.'; }
                else if (op !== undefined && op !== '+' && op !== '*') { e = '3rd argument must be one of "+", "*".'; }
                else if (minVal !== undefined && (typeof minVal !== 'number' || minVal <= 0)) { e = '4th argument must be a positive number.'; }
                else if (maxVal !== undefined && (typeof maxVal !== 'number' || maxVal < maxVal)) { e = '5th argument must be a positive number greater than minValue.'; }
                if (e) { throw new TypeError(e); }

                var val, el, els = Selector.select(selector);
                if (minVal === undefined) { minVal = 1; }
                op = (op === '*') ? function(a,b){return a*b;} : function(a,b){return a+b;};
                for (var i = 0, f = els.length; i < f; ++i) {
                    el = els[i];
                    val = parseFloat( that.getStyle(el, 'fontSize'));
                    val = op(val, delta);
                    if (val < minVal) { continue; }
                    if (typeof maxVal === 'number' && val > maxVal) { continue; }
                    el.style.fontSize = val + 'px';
                }
            });
        }

    };

    return Css;

});

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Dom.Element', 1, [], function() {

    'use strict';

    var createContextualFragmentSupport = (
        typeof document.createRange === 'function' &&
        typeof window.Range.prototype.createContextualFragment === 'function');

    var deleteThisTbodyToken = 'Ink.Dom.Element tbody: ' + Math.random();
    var browserCreatesTbodies = (function () {
        var div = document.createElement('div');
        div.innerHTML = '<table>';
        return div.getElementsByTagName('tbody').length !== 0;
    }());

    function rect(elem){
        var dimensions = {};
        try {
            dimensions = elem.getBoundingClientRect();
        } catch(e){
            dimensions = { top: elem.offsetTop, left: elem.offsetLeft };
        }
        return dimensions;
    }

    /**
     * @module Ink.Dom.Element_1
     */

    /**
     * @class Ink.Dom.Element
     */

    var InkElement = {

        /**
         * Shortcut for `document.getElementById`
         *
         * @method get
         * @param {String|DOMElement} elm   Either an ID of an element, or an element.
         * @return {DOMElement|null} The DOM element with the given id or null when it was not found
         */
        get: function(elm) {
            if(typeof elm !== 'undefined') {
                if(typeof elm === 'string') {
                    return document.getElementById(elm);
                }
                return elm;
            }
            return null;
        },

        /**
         * Creates a DOM element
         *
         * @method create
         * @param {String} tag        tag name
         * @param {Object} properties  object with properties to be set on the element. You can also call other functions in Ink.Dom.Element like this
         *
         * @example
         *
         *      var myPanel = InkElement.create('div', {
         *          appendHTML: '<span></span>',
         *          className: 'classes to add',
         *          insertAfter: anotherPane
         *      };
         *
         *      myPanel.innerHTML;  // -> '<div class="classes to add"><span></span></div>
         *      myPanel.parentNode;  // -> anotherPane
         */
        create: function(tag, properties) {
            var el = document.createElement(tag);
            //Ink.extendObj(el, properties);
            for(var property in properties) {
                if(properties.hasOwnProperty(property)) {
                    if (property in InkElement) {
                        InkElement[property](el, properties[property]);
                    } else {
                        if(property === 'className' || property === 'class') {
                            el.className = properties.className || properties['class'];
                        } else {
                            el.setAttribute(property, properties[property]);
                        }
                    }
                }
            }
            return el;
        },

        /**
         * Removes a DOM Element from the DOM
         *
         * @method remove
         * @param {DOMElement} elm  The element to remove
         */
        remove: function(el) {
            var parEl;
            if (el && (parEl = el.parentNode)) {
                parEl.removeChild(el);
            }
        },

        /**
         * Scrolls the window to an element
         *
         * @method scrollTo
         * @param {DOMElement|String} elm  Element where to scroll
         */
        scrollTo: function(elm) {
            elm = InkElement.get(elm);
            if(elm) {
                if (elm.scrollIntoView) {
                    return elm.scrollIntoView();
                }

                var elmOffset = {},
                    elmTop = 0, elmLeft = 0;

                do {
                    elmTop += elm.offsetTop || 0;
                    elmLeft += elm.offsetLeft || 0;

                    elm = elm.offsetParent;
                } while(elm);

                elmOffset = {x: elmLeft, y: elmTop};

                window.scrollTo(elmOffset.x, elmOffset.y);
            }
        },

        /**
         * Gets the top cumulative offset for an element
         *
         * Requires Ink.Dom.Browser
         *
         * @method offsetTop
         * @param {DOMElement|String} elm  target element
         * @return {Number} Offset from the target element to the top of the document
         */
        offsetTop: function(elm) {
            return InkElement.offset(elm)[1];
        },

        /**
         * Gets the left cumulative offset for an element
         *
         * Requires Ink.Dom.Browser
         *
         * @method offsetLeft
         * @param {DOMElement|String} elm  target element
         * @return {Number} Offset from the target element to the left of the document
         */
        offsetLeft: function(elm) {
            return InkElement.offset(elm)[0];
        },

        /**
        * Gets the element offset relative to its closest positioned ancestor
        *
        * @method positionedOffset
        * @param {DOMElement|String} elm  target element
        * @return {Array} Array with the element offsetleft and offsettop relative to the closest positioned ancestor
        */
        positionedOffset: function(element) {
            var valueTop = 0, valueLeft = 0;
            element = InkElement.get(element);
            do {
                valueTop  += element.offsetTop  || 0;
                valueLeft += element.offsetLeft || 0;
                element = element.offsetParent;
                if (element) {
                    if (element.tagName.toLowerCase() === 'body') { break;  }

                    var value = element.style.position;
                    if (!value && element.currentStyle) {
                        value = element.currentStyle.position;
                    }
                    if ((!value || value === 'auto') && typeof getComputedStyle !== 'undefined') {
                        var css = getComputedStyle(element, null);
                        value = css ? css.position : null;
                    }
                    if (value === 'relative' || value === 'absolute') { break;  }
                }
            } while (element);
            return [valueLeft, valueTop];
        },

        /**
         * Gets the cumulative offset for an element
         *
         * Returns the top left position of the element on the page
         *
         * Requires Ink.Dom.Browser
         *
         * @method offset
         * @param {DOMElement|String}   elm     Target element
         * @return {[Number, Number]}   Array with pixel distance from the target element to the top left corner of the document
         */
        offset: function(el) {
            /*jshint boss:true */
            el = Ink.i(el);
            var res = [0, 0];
            var doc = el.ownerDocument,
                docElem = doc.documentElement,
                box = rect(el),
                body = doc.body,
                clientTop  = docElem.clientTop  || body.clientTop  || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop  = doc.pageYOffset || docElem.scrollTop  || body.scrollTop,
                scrollLeft = doc.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                top  = box.top  + scrollTop  - clientTop,
                left = box.left + scrollLeft - clientLeft;
            res = [left, top];
            return res;
        },

        /**
         * Gets the scroll of the element
         *
         * @method scroll
         * @param {DOMElement|String} [elm] target element or document.body
         * @returns {Array} offset values for x and y scroll
         */
        scroll: function(elm) {
            elm = elm ? Ink.i(elm) : document.body;
            return [
                ( ( !window.pageXOffset ) ? elm.scrollLeft : window.pageXOffset ),
                ( ( !window.pageYOffset ) ? elm.scrollTop : window.pageYOffset )
            ];
        },

        _getPropPx: function(cs, prop) {
            var n, c;
            var val = cs.getPropertyValue ? cs.getPropertyValue(prop) : cs[prop];
            if (!val) { n = 0; }
            else {
                c = val.indexOf('px');
                if (c === -1) { n = 0; }
                else {
                    n = parseFloat(val, 10);
                }
            }

            //console.log([prop, ' "', val, '" ', n].join(''));

            return n;
        },

        /**
         * Alias for offset()
         *
         * @method offset2
         * @deprecated Kept for historic reasons. Use offset() instead.
         */
        offset2: function(el) {
            return InkElement.offset(el);
        },

        /**
         * Verifies the existence of an attribute
         *
         * @method hasAttribute
         * @param {Object} elm   target element
         * @param {String} attr  attribute name
         * @return {Boolean} Boolean based on existance of attribute
         */
        hasAttribute: function(elm, attr){
            return elm.hasAttribute ? elm.hasAttribute(attr) : !!elm.getAttribute(attr);
        },
        /**
         * Inserts a element immediately after a target element
         *
         * @method insertAfter
         * @param {DOMElement}         newElm     element to be inserted
         * @param {DOMElement|String}  targetElm  key element
         */
        insertAfter: function(newElm, targetElm) {
            /*jshint boss:true */
            if (targetElm = InkElement.get(targetElm)) {
                if (targetElm.nextSibling !== null) {
                    targetElm.parentNode.insertBefore(newElm, targetElm.nextSibling);
                } else {
                    targetElm.parentNode.appendChild(newElm);
                }
            }
        },

        /**
         * Inserts an element before a target element
         *
         * @method insertBefore
         * @param {DOMElement}         newElm     element to be inserted
         * @param {DOMElement|String}  targetElm  key element
         */
        insertBefore: function (newElm, targetElm) {
            /*jshint boss:true */
            if ( (targetElm = InkElement.get(targetElm)) ) {
                targetElm.parentNode.insertBefore(newElm, targetElm);
            }
        },

        /**
         * Inserts a element at the top of the childNodes of a target element
         *
         * @method insertTop
         * @param {DOMElement}         newElm     element to be inserted
         * @param {DOMElement|String}  targetElm  key element
         */
        insertTop: function(newElm,targetElm) {
            /*jshint boss:true */
            if (targetElm = InkElement.get(targetElm)) {
                if (targetElm.firstChild) {
                    targetElm.insertBefore(newElm, targetElm.firstChild);
                } else {
                    targetElm.appendChild(newElm);
                }
            }
        },

        /**
         * Inserts an element after all the child nodes of another element
         *
         * @method insertBottom
         * @param {DOMElement}         newElm     element to be inserted
         * @param {DOMElement|String}  targetElm  key element
         */
        insertBottom: function(newElm,targetElm) {
            /*jshint boss:true */
            targetElm.appendChild(newElm);
        },

        /**
         * Retrieves textContent from node
         *
         * @method innerText
         * @param {DOMNode} node from which to retreive text from. Can be any node type.
         * @return {String} the text
         */
        textContent: function(node){
            node = Ink.i(node);
            var text, k, cs, m;

            switch(node && node.nodeType) {
            case 9: /*DOCUMENT_NODE*/
                // IE quirks mode does not have documentElement
                return InkElement.textContent(node.documentElement || node.body && node.body.parentNode || node.body);

            case 1: /*ELEMENT_NODE*/
                text = node.innerText;
                if (typeof text !== 'undefined') {
                    return text;
                }
                /* falls through */
            case 11: /*DOCUMENT_FRAGMENT_NODE*/
                text = node.textContent;
                if (typeof text !== 'undefined') {
                    return text;
                }

                if (node.firstChild === node.lastChild) {
                    // Common case: 0 or 1 children
                    return InkElement.textContent(node.firstChild);
                }

                text = [];
                cs = node.childNodes;
                for (k = 0, m = cs.length; k < m; ++k) {
                    text.push( InkElement.textContent( cs[k] ) );
                }
                return text.join('');

            case 3: /*TEXT_NODE*/
            case 4: /*CDATA_SECTION_NODE*/
                return node.nodeValue;
            }
            return '';
        },

        /**
         * Removes all nodes children and adds the text
         *
         * @method setTextContent
         * @param {DOMNode} node    node to add the text to. Can be any node type.
         * @param {String}  text    text to be appended to the node.
         */
        setTextContent: function(node, text){
            node = Ink.i(node);
            switch(node && node.nodeType)
            {
            case 1: /*ELEMENT_NODE*/
                if ('innerText' in node) {
                    node.innerText = text;
                    break;
                }
                /* falls through */
            case 11: /*DOCUMENT_FRAGMENT_NODE*/
                if ('textContent' in node) {
                    node.textContent = text;
                    break;
                }
                /* falls through */
            case 9: /*DOCUMENT_NODE*/
                while(node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                if (text !== '') {
                    var doc = node.ownerDocument || node;
                    node.appendChild(doc.createTextNode(text));
                }
                break;

            case 3: /*TEXT_NODE*/
            case 4: /*CDATA_SECTION_NODE*/
                node.nodeValue = text;
                break;
            }
        },

        /**
         * Tells if element is a clickable link
         *
         * @method isLink
         * @param {DOMNode} node    node to check if it's link
         * @return {Boolean}
         */
        isLink: function(element){
            var b = element && element.nodeType === 1 && ((/^a|area$/i).test(element.tagName) ||
                element.hasAttributeNS && element.hasAttributeNS('http://www.w3.org/1999/xlink','href'));
            return !!b;
        },

        /**
         * Tells if ancestor is ancestor of node
         *
         * @method isAncestorOf
         * @param {DOMNode} ancestor  ancestor node
         * @param {DOMNode} node      descendant node
         * @return {Boolean}
         */
        isAncestorOf: function(ancestor, node){
            /*jshint boss:true */
            if (!node || !ancestor) {
                return false;
            }
            if (node.compareDocumentPosition) {
                return (ancestor.compareDocumentPosition(node) & 0x10) !== 0;/*Node.DOCUMENT_POSITION_CONTAINED_BY*/
            }
            while (node = node.parentNode){
                if (node === ancestor){
                    return true;
                }
            }
            return false;
        },

        /**
         * Tells if descendant is descendant of node
         *
         * @method descendantOf
         * @param {DOMNode} node        the ancestor
         * @param {DOMNode} descendant  the descendant
         * @return {Boolean} true if 'descendant' is descendant of 'node'
         */
        descendantOf: function(node, descendant){
            return node !== descendant && InkElement.isAncestorOf(node, descendant);
        },

        /**
         * Get first child in document order of node type 1
         * @method firstElementChild
         * @param {DOMNode} elm parent node
         * @return {DOMNode} the element child
         */
        firstElementChild: function(elm){
            if(!elm) {
                return null;
            }
            if ('firstElementChild' in elm) {
                return elm.firstElementChild;
            }
            var child = elm.firstChild;
            while(child && child.nodeType !== 1) {
                child = child.nextSibling;
            }
            return child;
        },

        /**
         * Get last child in document order of node type 1
         * @method lastElementChild
         * @param {DOMNode} elm parent node
         * @return {DOMNode} the element child
         */
        lastElementChild: function(elm){
            if(!elm) {
                return null;
            }
            if ('lastElementChild' in elm) {
                return elm.lastElementChild;
            }
            var child = elm.lastChild;
            while(child && child.nodeType !== 1) {
                child = child.previousSibling;
            }
            return child;
        },

        /**
         * Get the first element sibling after the node
         *
         * @method nextElementSibling
         * @param {DOMNode} node  current node
         * @return {DOMNode|Null} the first element sibling after node or null if none is found
         */
        nextElementSibling: function(node){
            var sibling = null;

            if(!node){ return sibling; }

            if("nextElementSibling" in node){
                return node.nextElementSibling;
            } else {
                sibling = node.nextSibling;

                // 1 === Node.ELEMENT_NODE
                while(sibling && sibling.nodeType !== 1){
                    sibling = sibling.nextSibling;
                }

                return sibling;
            }
        },

        /**
         * Get the first element sibling before the node
         *
         * @method previousElementSibling
         * @param {DOMNode}        node  current node
         * @return {DOMNode|Null} the first element sibling before node or null if none is found
         */
        previousElementSibling: function(node){
            var sibling = null;

            if(!node){ return sibling; }

            if("previousElementSibling" in node){
                return node.previousElementSibling;
            } else {
                sibling = node.previousSibling;

                // 1 === Node.ELEMENT_NODE
                while(sibling && sibling.nodeType !== 1){
                    sibling = sibling.previousSibling;
                }

                return sibling;
            }
        },

        /**
         * Returns the width of the given element, in pixels
         *
         * @method elementWidth
         * @param {DOMElement|string} element target DOM element or target ID
         * @return {Number} the element's width
         */
        elementWidth: function(element) {
            if(typeof element === "string") {
                element = document.getElementById(element);
            }
            return element.offsetWidth;
        },

        /**
         * Returns the height of the given element, in pixels
         *
         * @method elementHeight
         * @param {DOMElement|string} element target DOM element or target ID
         * @return {Number} the element's height
         */
        elementHeight: function(element) {
            if(typeof element === "string") {
                element = document.getElementById(element);
            }
            return element.offsetHeight;
        },

        /**
         * Returns the element's left position in pixels
         *
         * @method elementLeft
         * @param {DOMElement|string} element target DOM element or target ID
         * @return {Number} element's left position
         */
        elementLeft: function(element) {
            if(typeof element === "string") {
                element = document.getElementById(element);
            }
            return element.offsetLeft;
        },

        /**
         * Returns the element's top position in pixels
         *
         * @method elementTop
         * @param {DOMElement|string} element target DOM element or target ID
         * @return {Number} element's top position
         */
        elementTop: function(element) {
            if(typeof element === "string") {
                element = document.getElementById(element);
            }
            return element.offsetTop;
        },

        /**
         * Returns the dimensions of the given element, in pixels
         *
         * @method elementDimensions
         * @param {element} element target element
         * @return {Array} array with element's width and height
         */
        elementDimensions: function(element) {
            element = Ink.i(element);
            return [element.offsetWidth, element.offsetHeight];
        },

        /**
         * Returns the outer (width + margin + padding included) dimensions of an element, in pixels.
         *
         * Requires Ink.Dom.Css
         *
         * @method outerDimensions
         * @param {DOMElement} element Target element
         * @return {Array} Array with element width and height.
         */
        outerDimensions: function (element) {
            var bbox = rect(element);

            var Css = Ink.getModule('Ink.Dom.Css_1');
            var getStyle = Ink.bindMethod(Css, 'getStyle', element);

            return [
                bbox.right - bbox.left + parseFloat(getStyle('marginLeft') || 0) + parseFloat(getStyle('marginRight') || 0),  // w
                bbox.bottom - bbox.top + parseFloat(getStyle('marginTop') || 0) + parseFloat(getStyle('marginBottom') || 0)  // h
            ];
        },

        /**
         * Check whether an element is inside the viewport
         *
         * @method inViewport
         * @param {DOMElement} element Element to check
         * @param {Boolean} [partial=false] Return `true` even if it is only partially visible.
         * @return {Boolean}
         */
        inViewport: function (element, partial) {
            var dims = rect(Ink.i(element));
            if (partial) {
                return  dims.bottom > 0                        && // from the top
                        dims.left < InkElement.viewportWidth()    && // from the right
                        dims.top < InkElement.viewportHeight()    && // from the bottom
                        dims.right  > 0;                          // from the left
            } else {
                return  dims.top > 0                           && // from the top
                        dims.right < InkElement.viewportWidth()   && // from the right
                        dims.bottom < InkElement.viewportHeight() && // from the bottom
                        dims.left  > 0;                           // from the left
            }
        },

        /**
         * Check whether an element is hidden 
         * Taken from Mootools Element extras ( https://gist.github.com/cheeaun/73342 )
         * Does not take into account visibility:hidden
         * @method isHidden
         * @param {DOMElement} element Element to check
         * @return {Boolean}
         */

        isHidden: function (element) {
            var w = element.offsetWidth, 
                h = element.offsetHeight,
                force = (element.tagName.toLowerCase() === 'tr');

            var Css = Ink.getModule('Ink.Dom.Css_1');

            return (w===0 && h===0 && !force) ? true :
                (w!==0 && h!==0 && !force) ? false :
                Css.getStyle(element, 'display').toLowerCase() === 'none';
         },

        /**
         * Check whether an element is visible 
         *
         * @method isVisible
         * @param {DOMElement} element Element to check
         * @return {Boolean}
         */

        isVisible: function (element) {
            return !this.isHidden(element);
        },

        /**
         * Applies the cloneFrom's dimensions to cloneTo
         *
         * @method clonePosition
         * @param {DOMElement} cloneTo    element to be position cloned
         * @param {DOMElement} cloneFrom  element to get the cloned position
         * @return {DOMElement} the element with positionClone
         */
        clonePosition: function(cloneTo, cloneFrom){
            var pos = InkElement.offset(cloneFrom);
            cloneTo.style.left = pos[0]+'px';
            cloneTo.style.top = pos[1]+'px';

            return cloneTo;
        },

        /**
         * Slices off a piece of text at the end of the element and adds the ellipsis
         * so all text fits in the element.
         *
         * @method ellipsizeText
         * @param {DOMElement} element     which text is to add the ellipsis
         * @param {String}     [ellipsis='\u2026']  String to append to the chopped text
         */
        ellipsizeText: function(element, ellipsis){
            /*jshint boss:true */
            if (element = Ink.i(element)){
                while (element && element.scrollHeight > (element.offsetHeight + 8)) {
                    element.textContent = element.textContent.replace(/(\s+\S+)\s*$/, ellipsis || '\u2026');
                }
            }
        },

        /**
         * Searches up the DOM tree for an element fulfilling the boolTest function (returning trueish)
         *
         * @method findUpwardsHaving
         * @param {HtmlElement} element
         * @param {Function}    boolTest
         * @return {HtmlElement|false} the matched element or false if did not match
         */
        findUpwardsHaving: function(element, boolTest) {
            while (element && element.nodeType === 1) {
                if (boolTest(element)) {
                    return element;
                }
                element = element.parentNode;
            }
            return false;
        },

        /**
         * Śearches up the DOM tree for an element of specified class name
         *
         * @method findUpwardsByClass
         * @param {HtmlElement} element
         * @param {String}      className
         * @returns {HtmlElement|false} the matched element or false if did not match
         */
        findUpwardsByClass: function(element, className) {
            var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
            var tst = function(el) {
                var cls = el.className;
                return cls && re.test(cls);
            };
            return InkElement.findUpwardsHaving(element, tst);
        },

        /**
         * Śearches up the DOM tree for an element of specified tag
         *
         * @method findUpwardsByTag
         * @param {HtmlElement} element
         * @param {String}      tag
         * @returns {HtmlElement|false} the matched element or false if did not match
         */
        findUpwardsByTag: function(element, tag) {
            tag = tag.toUpperCase();
            var tst = function(el) {
                return el.nodeName && el.nodeName.toUpperCase() === tag;
            };
            return InkElement.findUpwardsHaving(element, tst);
        },

        /**
         * Śearches up the DOM tree for an element of specified id
         *
         * @method findUpwardsById
         * @param {HtmlElement} element
         * @param {String}      id
         * @returns {HtmlElement|false} the matched element or false if did not match
         */
        findUpwardsById: function(element, id) {
            var tst = function(el) {
                return el.id === id;
            };
            return InkElement.findUpwardsHaving(element, tst);
        },

        /**
         * Śearches up the DOM tree for an element matching the given selector
         *
         * @method findUpwardsBySelector
         * @param {HtmlElement} element
         * @param {String}      sel
         * @returns {HtmlElement|false} the matched element or false if did not match
         */
        findUpwardsBySelector: function(element, sel) {
            var Selector = Ink.getModule('Ink.Dom.Selector');
            if (!Selector) {
                throw new Error('This method requires Ink.Dom.Selector');
            }
            var tst = function(el) {
                return Selector.matchesSelector(el, sel);
            };
            return InkElement.findUpwardsHaving(element, tst);
        },

        /**
         * Returns trimmed text content of descendants
         *
         * @method getChildrenText
         * @param {DOMElement}  el          element being seeked
         * @param {Boolean}     [removeIt]  whether to remove the found text nodes or not
         * @return {String} text found
         */
        getChildrenText: function(el, removeIt) {
            var node,
                j,
                part,
                nodes = el.childNodes,
                jLen = nodes.length,
                text = '';

            if (!el) {
                return text;
            }

            for (j = 0; j < jLen; ++j) {
                node = nodes[j];
                if (!node) {    continue;   }
                if (node.nodeType === 3) {  // TEXT NODE
                    part = InkElement._trimString( String(node.data) );
                    if (part.length > 0) {
                        text += part;
                        if (removeIt) { el.removeChild(node);   }
                    }
                    else {  el.removeChild(node);   }
                }
            }

            return text;
        },

        /**
         * String trim implementation
         * Used by getChildrenText
         *
         * function _trimString
         * param {String} text
         * return {String} trimmed text
         */
        _trimString: function(text) {
            return (String.prototype.trim) ? text.trim() : text.replace(/^\s*/, '').replace(/\s*$/, '');
        },

        /**
         * Returns the values of a select element
         *
         * @method getSelectValues
         * @param {DomElement|String} select element
         * @return {Array} selected values
         */
        getSelectValues: function (select) {
            var selectEl = Ink.i(select);
            var values = [];
            for (var i = 0; i < selectEl.options.length; ++i) {
                values.push( selectEl.options[i].value );
            }
            return values;
        },


        /* used by fills */
        _normalizeData: function(data) {
            var d, data2 = [];
            for (var i = 0, f = data.length; i < f; ++i) {
                d = data[i];

                if (!(d instanceof Array)) {    // if not array, wraps primitive twice:     val -> [val, val]
                    d = [d, d];
                }
                else if (d.length === 1) {      // if 1 element array:                      [val] -> [val, val]
                    d.push(d[0]);
                }
                data2.push(d);
            }
            return data2;
        },


        /**
         * Fills select element with choices
         *
         * @method fillSelect
         * @param {DomElement|String}  container       select element which will get filled
         * @param {Array}              data            data which will populate the component
         * @param {Boolean}            [skipEmpty]     true to skip empty option
         * @param {String|Number}      [defaultValue]  primitive value to select at beginning
         */
        fillSelect: function(container, data, skipEmpty, defaultValue) {
            var containerEl = Ink.i(container);
            if (!containerEl) {   return; }

            containerEl.innerHTML = '';
            var d, optionEl;

            if (!skipEmpty) {
                // add initial empty option
                optionEl = document.createElement('option');
                optionEl.setAttribute('value', '');
                containerEl.appendChild(optionEl);
            }

            data = InkElement._normalizeData(data);

            for (var i = 0, f = data.length; i < f; ++i) {
                d = data[i];

                optionEl = document.createElement('option');
                optionEl.setAttribute('value', d[0]);
                if (d.length > 2) {
                    optionEl.setAttribute('extra', d[2]);
                }
                optionEl.appendChild( document.createTextNode(d[1]) );

                if (d[0] === defaultValue) {
                    optionEl.setAttribute('selected', 'selected');
                }

                containerEl.appendChild(optionEl);
            }
        },


        /**
         * Select element on steroids - allows the creation of new values
         *
         * @method fillSelect2
         * @param {DomElement|String} ctn select element which will get filled
         * @param {Object} opts
         * @param {Array}                      [opts.data]               data which will populate the component
         * @param {Boolean}                    [opts.skipEmpty]          if true empty option is not created (defaults to false)
         * @param {String}                     [opts.emptyLabel]         label to display on empty option
         * @param {String}                     [opts.createLabel]        label to display on create option
         * @param {String}                     [opts.optionsGroupLabel]  text to display on group surrounding value options
         * @param {String}                     [opts.defaultValue]       option to select initially
         * @param {Function(selEl, addOptFn)}  [opts.onCreate]           callback that gets called once user selects the create option
         */
        fillSelect2: function(ctn, opts) {
            ctn = Ink.i(ctn);
            ctn.innerHTML = '';

            var defs = {
                skipEmpty:              false,
                skipCreate:             false,
                emptyLabel:             'none',
                createLabel:            'create',
                optionsGroupLabel:      'groups',
                emptyOptionsGroupLabel: 'none exist',
                defaultValue:           ''
            };
            if (!opts) {      throw 'param opts is a requirement!';   }
            if (!opts.data) { throw 'opts.data is a requirement!';    }
            opts = Ink.extendObj(defs, opts);

            var optionEl, d;

            var optGroupValuesEl = document.createElement('optgroup');
            optGroupValuesEl.setAttribute('label', opts.optionsGroupLabel);

            opts.data = InkElement._normalizeData(opts.data);

            if (!opts.skipCreate) {
                opts.data.unshift(['$create$', opts.createLabel]);
            }

            if (!opts.skipEmpty) {
                opts.data.unshift(['', opts.emptyLabel]);
            }

            for (var i = 0, f = opts.data.length; i < f; ++i) {
                d = opts.data[i];

                optionEl = document.createElement('option');
                optionEl.setAttribute('value', d[0]);
                optionEl.appendChild( document.createTextNode(d[1]) );

                if (d[0] === opts.defaultValue) {   optionEl.setAttribute('selected', 'selected');  }

                if (d[0] === '' || d[0] === '$create$') {
                    ctn.appendChild(optionEl);
                }
                else {
                    optGroupValuesEl.appendChild(optionEl);
                }
            }

            var lastValIsNotOption = function(data) {
                var lastVal = data[data.length-1][0];
                return (lastVal === '' || lastVal === '$create$');
            };

            if (lastValIsNotOption(opts.data)) {
                optionEl = document.createElement('option');
                optionEl.setAttribute('value', '$dummy$');
                optionEl.setAttribute('disabled', 'disabled');
                optionEl.appendChild(   document.createTextNode(opts.emptyOptionsGroupLabel)    );
                optGroupValuesEl.appendChild(optionEl);
            }

            ctn.appendChild(optGroupValuesEl);

            var addOption = function(v, l) {
                var optionEl = ctn.options[ctn.options.length - 1];
                if (optionEl.getAttribute('disabled')) {
                    optionEl.parentNode.removeChild(optionEl);
                }

                // create it
                optionEl = document.createElement('option');
                optionEl.setAttribute('value', v);
                optionEl.appendChild(   document.createTextNode(l)  );
                optGroupValuesEl.appendChild(optionEl);

                // select it
                ctn.options[ctn.options.length - 1].setAttribute('selected', true);
            };

            if (!opts.skipCreate) {
                ctn.onchange = function() {
                    if ((ctn.value === '$create$') && (typeof opts.onCreate === 'function')) {  opts.onCreate(ctn, addOption);  }
                };
            }
        },


        /**
         * Creates set of radio buttons, returns wrapper
         *
         * @method fillRadios
         * @param {DomElement|String}  insertAfterEl   element which will precede the input elements
         * @param {String}             name            name to give to the form field ([] is added if not as suffix already)
         * @param {Array}              data            data which will populate the component
         * @param {Boolean}            [skipEmpty]     true to skip empty option
         * @param {String|Number}      [defaultValue]  primitive value to select at beginning
         * @param {String}             [splitEl]       name of element to add after each input element (example: 'br')
         * @return {DOMElement} wrapper element around radio buttons
         */
        fillRadios: function(insertAfterEl, name, data, skipEmpty, defaultValue, splitEl) {
            var afterEl = Ink.i(insertAfterEl);
            afterEl = afterEl.nextSibling;
            while (afterEl && afterEl.nodeType !== 1) {
                afterEl = afterEl.nextSibling;
            }
            var containerEl = document.createElement('span');
            if (afterEl) {
                afterEl.parentNode.insertBefore(containerEl, afterEl);
            } else {
                Ink.i(insertAfterEl).appendChild(containerEl);
            }

            data = InkElement._normalizeData(data);

            if (name.substring(name.length - 1) !== ']') {
                name += '[]';
            }

            var d, inputEl;

            if (!skipEmpty) {
                // add initial empty option
                inputEl = document.createElement('input');
                inputEl.setAttribute('type', 'radio');
                inputEl.setAttribute('name', name);
                inputEl.setAttribute('value', '');
                containerEl.appendChild(inputEl);
                if (splitEl) {  containerEl.appendChild( document.createElement(splitEl) ); }
            }

            for (var i = 0; i < data.length; ++i) {
                d = data[i];

                inputEl = document.createElement('input');
                inputEl.setAttribute('type', 'radio');
                inputEl.setAttribute('name', name);
                inputEl.setAttribute('value', d[0]);
                containerEl.appendChild(inputEl);
                containerEl.appendChild( document.createTextNode(d[1]) );
                if (splitEl) {  containerEl.appendChild( document.createElement(splitEl) ); }

                if (d[0] === defaultValue) {
                    inputEl.checked = true;
                }
            }

            return containerEl;
        },


        /**
         * Creates set of checkbox buttons, returns wrapper
         *
         * @method fillChecks
         * @param {DomElement|String}  insertAfterEl   element which will precede the input elements
         * @param {String}             name            name to give to the form field ([] is added if not as suffix already)
         * @param {Array}              data            data which will populate the component
         * @param {Boolean}            [skipEmpty]     true to skip empty option
         * @param {String|Number}      [defaultValue]  primitive value to select at beginning
         * @param {String}             [splitEl]       name of element to add after each input element (example: 'br')
         * @return {DOMElement} wrapper element around checkboxes
         */
        fillChecks: function(insertAfterEl, name, data, defaultValue, splitEl) {
            var afterEl = Ink.i(insertAfterEl);
            afterEl = afterEl.nextSibling;
            while (afterEl && afterEl.nodeType !== 1) {
                afterEl = afterEl.nextSibling;
            }
            var containerEl = document.createElement('span');
            if (afterEl) {
                afterEl.parentNode.insertBefore(containerEl, afterEl);
            } else {
                Ink.i(insertAfterEl).appendChild(containerEl);
            }

            data = InkElement._normalizeData(data);

            if (name.substring(name.length - 1) !== ']') {
                name += '[]';
            }

            var d, inputEl;

            for (var i = 0; i < data.length; ++i) {
                d = data[i];

                inputEl = document.createElement('input');
                inputEl.setAttribute('type', 'checkbox');
                inputEl.setAttribute('name', name);
                inputEl.setAttribute('value', d[0]);
                containerEl.appendChild(inputEl);
                containerEl.appendChild( document.createTextNode(d[1]) );
                if (splitEl) {  containerEl.appendChild( document.createElement(splitEl) ); }

                if (d[0] === defaultValue) {
                    inputEl.checked = true;
                }
            }

            return containerEl;
        },


        /**
         * Returns index of element from parent, -1 if not child of parent...
         *
         * @method parentIndexOf
         * @param {DOMElement}  parentEl  Element to parse
         * @param {DOMElement}  childEl   Child Element to look for
         * @return {Number}
         */
        parentIndexOf: function(parentEl, childEl) {
            var node, idx = 0;
            for (var i = 0, f = parentEl.childNodes.length; i < f; ++i) {
                node = parentEl.childNodes[i];
                if (node.nodeType === 1) {  // ELEMENT
                    if (node === childEl) { return idx; }
                    ++idx;
                }
            }
            return -1;
        },


        /**
         * Returns an array of elements - the next siblings
         *
         * @method nextSiblings
         * @param {String|DomElement} elm element
         * @return {Array} Array of next sibling elements
         */
        nextSiblings: function(elm) {
            if(typeof(elm) === "string") {
                elm = document.getElementById(elm);
            }
            if(typeof(elm) === 'object' && elm !== null && elm.nodeType && elm.nodeType === 1) {
                var elements = [],
                    siblings = elm.parentNode.children,
                    index    = InkElement.parentIndexOf(elm.parentNode, elm);

                for(var i = ++index, len = siblings.length; i<len; i++) {
                    elements.push(siblings[i]);
                }

                return elements;
            }
            return [];
        },


        /**
         * Returns an array of elements - the previous siblings
         *
         * @method previousSiblings
         * @param {String|DomElement} elm element
         * @return {Array} Array of previous sibling elements
         */
        previousSiblings: function(elm) {
            if(typeof(elm) === "string") {
                elm = document.getElementById(elm);
            }
            if(typeof(elm) === 'object' && elm !== null && elm.nodeType && elm.nodeType === 1) {
                var elements    = [],
                    siblings    = elm.parentNode.children,
                    index       = InkElement.parentIndexOf(elm.parentNode, elm);

                for(var i = 0, len = index; i<len; i++) {
                    elements.push(siblings[i]);
                }

                return elements;
            }
            return [];
        },


        /**
         * Returns an array of elements - its siblings
         *
         * @method siblings
         * @param {String|DomElement} elm element
         * @return {Array} Array of sibling elements
         */
        siblings: function(elm) {
            if(typeof(elm) === "string") {
                elm = document.getElementById(elm);
            }
            if(typeof(elm) === 'object' && elm !== null && elm.nodeType && elm.nodeType === 1) {
                var elements   = [],
                    siblings   = elm.parentNode.children;

                for(var i = 0, len = siblings.length; i<len; i++) {
                    if(elm !== siblings[i]) {
                        elements.push(siblings[i]);
                    }
                }

                return elements;
            }
            return [];
        },

        /**
         * fallback to elem.childElementCount
         *
         * @method childElementCount
         * @param {String|DomElement} elm element
         * @return {Number} number of child elements
         */
        childElementCount: function(elm) {
            elm = Ink.i(elm);
            if ('childElementCount' in elm) {
                return elm.childElementCount;
            }
            if (!elm) { return 0; }
            return InkElement.siblings(elm).length + 1;
        },

        _wrapElements: {
            TABLE: function (div, html) {
                /* If we don't create a tbody, IE7 does that for us. Adding a tbody with a random string and then filtering for that random string is the only way to avoid double insertion of tbodies. */
                if (browserCreatesTbodies) {
                    div.innerHTML = "<table>" + html + "<tbody><tr><td>" + deleteThisTbodyToken + "</tr></td></tbody></table>";
                } else {
                    div.innerHTML = "<table>" + html + "</table>";
                }
                return div.firstChild;
            },
            TBODY: function (div, html) {
                div.innerHTML = '<table><tbody>' + html + '</tbody></table>';
                return div.firstChild.getElementsByTagName('tbody')[0];
            },
            THEAD: function (div, html) {
                div.innerHTML = '<table><thead>' + html + '</thead><tbody></tbody></table>';
                return div.firstChild.getElementsByTagName('thead')[0];
            },
            TFOOT: function (div, html) {
                div.innerHTML = '<table><tfoot>' + html + '</tfoot><tbody></tbody></table>';
                return div.firstChild.getElementsByTagName('tfoot')[0];
            },
            TR: function (div, html) {
                div.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
                return div.firstChild.firstChild.firstChild;
            }
        },

        /**
         * Gets a wrapper DIV with a certain HTML content for being inserted in `elm`.
         * Necessary for appendHTML,prependHTML functions, because they need a container element to copy the children from.
         *
         * Works around IE table quirks
         * @method _getWrapper
         * @private
         * @param elm
         * @param html
         */
        _getWrapper: function (elm, html) {
            var nodeName = elm.nodeName && elm.nodeName.toUpperCase();
            var wrapper = document.createElement('div');
            var wrapFunc = InkElement._wrapElements[nodeName];

            if ( !wrapFunc ) {
                wrapper.innerHTML = html;
                return wrapper;
            }
            // special cases
            wrapper = wrapFunc(wrapper, html);
            // worst case: tbody auto-creation even when our HTML has a tbody.
            if (browserCreatesTbodies && nodeName === 'TABLE') {
                // terrible case. Deal with tbody creation too.
                var tds = wrapper.getElementsByTagName('td');
                for (var i = 0, len = tds.length; i < len; i++) {
                    if (tds[i].innerHTML === deleteThisTbodyToken) {
                        var tbody = tds[i].parentNode.parentNode;
                        tbody.parentNode.removeChild(tbody);
                    }
                }
            }
            return wrapper;
        },

        /**
         * parses and appends an html string to a container, not destroying its contents
         *
         * @method appendHTML
         * @param {String|DomElement} elm   element
         * @param {String}            html  markup string
         */
        appendHTML: function(elm, html){
            var wrapper = InkElement._getWrapper(elm, html);
            while (wrapper.firstChild) {
                elm.appendChild(wrapper.firstChild);
            }
        },

        /**
         * parses and prepends an html string to a container, not destroying its contents
         *
         * @method prependHTML
         * @param {String|DomElement} elm   element
         * @param {String}            html  markup string
         */
        prependHTML: function(elm, html){
            var wrapper = InkElement._getWrapper(elm, html);
            while (wrapper.lastChild) {
                elm.insertBefore(wrapper.lastChild, elm.firstChild);
            }
        },

        /**
         * sets the Inner HTML of an element to the given HTML string
         *
         * @method setHTML
         * @param {String|DomElement} elm   element
         * @param {String}            html  markup string
         */
        setHTML: function (elm, html) {
            try {
                elm.innerHTML = html;
            } catch (e) {
                // Tables in IE7
                while (elm.firstChild) {
                    elm.removeChild(elm.firstChild);
                }
                InkElement.appendHTML(elm, html);
            }
        },

        /**
         * Wraps an element inside a container.
         *
         * The container may or may not be in the document yet.
         *
         * @method wrap
         * @param {String|DomElement}   target Element to be wrapped
         * @param {String|DomElement}   container Element to wrap the target
         * @return Container element
         *
         * @example
         * before:
         *
         *     <div id="target"></div>
         *
         * call this function to wrap #target with a wrapper div.
         *
         *     InkElement.wrap('target', InkElement.create('div', {id: 'container'});
         * 
         * after: 
         *
         *     <div id="container"><div id="target"></div></div>
         */
        wrap: function (target, container) {
            target = Ink.i(target);
            container = Ink.i(container);
            
            var nextNode = target.nextSibling;
            var parent = target.parentNode;

            container.appendChild(target);

            if (nextNode !== null) {
                parent.insertBefore(container, nextNode);
            } else {
                parent.appendChild(container);
            }

            return container;
        },

        /**
         * Pulls an element out of its wrapper.
         *
         * @method unwrap
         * @param elem The element you're trying to unwrap. This should be a child of the wrapper.
         * @param {String} [wrapperSelector] Use this if you want to find your wrapper (if `elem` is inside several layers of wrappers).
         *
         * @example
         *
         * When you have this:
         *
         *      <div id="wrapper">
         *          <div id="unwrapMe"></div>
         *      </div>
         *
         * If you do this:
         *
         *      InkElement.unwrap('unwrapMe');
         *
         * You get this:
         *
         *      <div id="unwrapMe"></div>
         *      <div id="wrapper"></div>
         *      
         **/
        unwrap: function (elem, wrapperSelector) {
            elem = Ink.i(elem);
            var wrapper;
            if (wrapperSelector) {
                wrapper = InkElement.findUpwardsBySelector(elem, wrapperSelector);
            } else {
                wrapper = elem.parentNode;
            }
            if (!wrapper || !wrapper.parentNode) { return; }

            InkElement.insertBefore(elem, wrapper);
        },

        /**
         * Replaces an element with another.
         *
         * @method replace
         * @param element The element to be replaced.
         * @param replacement The new element.
         *
         * @example
         *       var newelement1 = InkElement.create('div');
         *       // ...
         *       replace(Ink.i('element1'), newelement1);
         */
        replace: function (element, replacement) {
            InkElement.insertBefore(replacement, element);
            InkElement.remove(element);
        },

        /**
         * Removes direct children on type text.
         * Useful to remove nasty layout gaps generated by whitespace on the markup.
         *
         * @method removeTextNodeChildren
         * @param  {DOMElement} el
         */
        removeTextNodeChildren: function(el) {
            var prevEl, toRemove, parent = el;
            el = el.firstChild;
            while (el) {
                toRemove = (el.nodeType === 3);
                prevEl = el;
                el = el.nextSibling;
                if (toRemove) {
                    parent.removeChild(prevEl);
                }
            }
        },

        /**
         * Pass an HTML string and receive a documentFragment with the corresponding elements
         * @method htmlToFragment
         * @param  {String} html  html string
         * @return {DocumentFragment} DocumentFragment containing all of the elements from the html string
         */
        htmlToFragment: (createContextualFragmentSupport ?
            function(html){
                var range;

                if(typeof html !== 'string'){ return document.createDocumentFragment(); }

                range = document.createRange();

                // set the context to document.body (firefox does this already, webkit doesn't)
                range.selectNode(document.body);

                return range.createContextualFragment(html);
            } : function (html) {
                var fragment = document.createDocumentFragment(),
                    tempElement,
                    current;

                if(typeof html !== 'string'){ return fragment; }

                tempElement = document.createElement('div');
                tempElement.innerHTML = html;

                // append child removes elements from the original parent
                while( (current = tempElement.firstChild) ){ // intentional assignment
                    fragment.appendChild(current);
                }

                return fragment;
            }),

        _camelCase: function(str)
        {
            return str ? str.replace(/-(\w)/g, function (_, $1){
                return $1.toUpperCase();
            }) : str;
        },

        /**
         * Gets all of the data attributes from an element
         *
         * @method data
         * @param {String|DomElement} selector Element or CSS selector
         * @return {Object} Object with the data-* properties. If no data-attributes are present, an empty object is returned.
        */
        data: function(selector) {
            var el;
            if (typeof selector !== 'object' && typeof selector !== 'string') {
                throw '[Ink.Dom.Element.data] :: Invalid selector defined';
            }

            if (typeof selector === 'object') {
                el = selector;
            }
            else {
                var InkDomSelector = Ink.getModule('Ink.Dom.Selector', 1);
                if (!InkDomSelector) {
                    throw "[Ink.Dom.Element.data] :: this method requires Ink.Dom.Selector - v1";
                }
                el = InkDomSelector.select(selector);
                if (el.length <= 0) {
                    throw "[Ink.Dom.Element.data] :: Can't find any element with the specified selector";
                }
                el = el[0];
            }

            var dataset = {};
            var attrs = el.attributes || [];

            var curAttr, curAttrName, curAttrValue;
            if (attrs) {
                for (var i = 0, total = attrs.length; i < total; ++i) {
                    curAttr = attrs[i];
                    curAttrName = curAttr.name;
                    curAttrValue = curAttr.value;
                    if (curAttrName && curAttrName.indexOf('data-') === 0) {
                        dataset[InkElement._camelCase(curAttrName.replace('data-', ''))] = curAttrValue;
                    }
                }
            }

            return dataset;
        },

        /**
         * @method moveCursorTo
         * @param  {Input|Textarea}  el
         * @param  {Number}          t
         */
        moveCursorTo: function(el, t) {
            if (el.setSelectionRange) {
                el.setSelectionRange(t, t);
                //el.focus();
            }
            else {
                var range = el.createTextRange();
                range.collapse(true);
                range.moveEnd(  'character', t);
                range.moveStart('character', t);
                range.select();
            }
        },

        /**
         * @method pageWidth
         * @return {Number} page width
         */
        pageWidth: function() {
            var xScroll;

            if (window.innerWidth && window.scrollMaxX) {
                xScroll = window.innerWidth + window.scrollMaxX;
            } else if (document.body.scrollWidth > document.body.offsetWidth){
                xScroll = document.body.scrollWidth;
            } else {
                xScroll = document.body.offsetWidth;
            }

            var windowWidth;

            if (window.self.innerWidth) {
                if(document.documentElement.clientWidth){
                    windowWidth = document.documentElement.clientWidth;
                } else {
                    windowWidth = window.self.innerWidth;
                }
            } else if (document.documentElement && document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else if (document.body) {
                windowWidth = document.body.clientWidth;
            }

            if(xScroll < windowWidth){
                return xScroll;
            } else {
                return windowWidth;
            }
        },

        /**
         * @method pageHeight
         * @return {Number} page height
         */
        pageHeight: function() {
            var yScroll;

            if (window.innerHeight && window.scrollMaxY) {
                yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight){
                yScroll = document.body.scrollHeight;
            } else {
                yScroll = document.body.offsetHeight;
            }

            var windowHeight;

            if (window.self.innerHeight) {
                windowHeight = window.self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) {
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body) {
                windowHeight = document.body.clientHeight;
            }

            if(yScroll < windowHeight){
                return windowHeight;
            } else {
                return yScroll;
            }
        },

       /**
         * @method viewportWidth
         * @return {Number} viewport width in pixels
         */
        viewportWidth: function() {
            if(typeof window.innerWidth !== "undefined") {
                return window.innerWidth;
            }
            if (document.documentElement && typeof document.documentElement.offsetWidth !== "undefined") {
                return document.documentElement.offsetWidth;
            }
        },

        /**
         * @method viewportHeight
         * @return {Number} viewport height
         */
        viewportHeight: function() {
            if (typeof window.innerHeight !== "undefined") {
                return window.innerHeight;
            }
            if (document.documentElement && typeof document.documentElement.offsetHeight !== "undefined") {
                return document.documentElement.offsetHeight;
            }
        },

        /**
         * @method scrollWidth
         * @return {Number} scroll width
         */
        scrollWidth: function() {
            if (typeof window.self.pageXOffset !== 'undefined') {
                return window.self.pageXOffset;
            }
            if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.scrollLeft !== 'undefined') {
                return document.documentElement.scrollLeft;
            }
            return document.body.scrollLeft;
        },

        /**
         * @method scrollHeight
         * @return {Number} scroll height
         */
        scrollHeight: function() {
            if (typeof window.self.pageYOffset !== 'undefined') {
                return window.self.pageYOffset;
            }
            if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.scrollTop !== 'undefined') {
                return document.documentElement.scrollTop;
            }
            return document.body.scrollTop;
        }
    };

    return InkElement;

});

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Dom.Event', 1, [], function() {
    /* jshint
           asi:true,
           strict:false,
           laxcomma:true,
           eqeqeq:false,
           laxbreak:true,
           boss:true,
           curly:false,
           expr:true
           */

    /*!
      * Bean - copyright (c) Jacob Thornton 2011-2012
      * https://github.com/fat/bean
      * MIT license
      */
    var bean = (function (name, context, definition) {
      return definition()
    })('bean', this, function (name, context) {
      name    = name    || 'bean'
      context = context || this

      var win            = window
        , old            = context[name]
        , namespaceRegex = /[^\.]*(?=\..*)\.|.*/
        , nameRegex      = /\..*/
        , addEvent       = 'addEventListener'
        , removeEvent    = 'removeEventListener'
        , doc            = document || {}
        , root           = doc.documentElement || {}
        , W3C_MODEL      = root[addEvent]
        , eventSupport   = W3C_MODEL ? addEvent : 'attachEvent'
        , ONE            = {} // singleton for quick matching making add() do one()

        , slice          = Array.prototype.slice
        , str2arr        = function (s, d) { return s.split(d || ' ') }
        , isString       = function (o) { return typeof o == 'string' }
        , isFunction     = function (o) { return typeof o == 'function' }

          // events that we consider to be 'native', anything not in this list will
          // be treated as a custom event
        , standardNativeEvents =
            'click dblclick mouseup mousedown contextmenu '                  + // mouse buttons
            'mousewheel mousemultiwheel DOMMouseScroll '                     + // mouse wheel
            'mouseover mouseout mousemove selectstart selectend '            + // mouse movement
            'keydown keypress keyup '                                        + // keyboard
            'orientationchange '                                             + // mobile
            'focus blur change reset select submit '                         + // form elements
            'load unload beforeunload resize move DOMContentLoaded '         + // window
            'readystatechange message '                                      + // window
            'error abort scroll '                                              // misc
          // element.fireEvent('onXYZ'... is not forgiving if we try to fire an event
          // that doesn't actually exist, so make sure we only do these on newer browsers
        , w3cNativeEvents =
            'show '                                                          + // mouse buttons
            'input invalid '                                                 + // form elements
            'touchstart touchmove touchend touchcancel '                     + // touch
            'gesturestart gesturechange gestureend '                         + // gesture
            'textinput'                                                      + // TextEvent
            'readystatechange pageshow pagehide popstate '                   + // window
            'hashchange offline online '                                     + // window
            'afterprint beforeprint '                                        + // printing
            'dragstart dragenter dragover dragleave drag drop dragend '      + // dnd
            'loadstart progress suspend emptied stalled loadmetadata '       + // media
            'loadeddata canplay canplaythrough playing waiting seeking '     + // media
            'seeked ended durationchange timeupdate play pause ratechange '  + // media
            'volumechange cuechange '                                        + // media
            'checking noupdate downloading cached updateready obsolete '       // appcache

          // convert to a hash for quick lookups
        , nativeEvents = (function (hash, events, i) {
            for (i = 0; i < events.length; i++) events[i] && (hash[events[i]] = 1)
            return hash
          }({}, str2arr(standardNativeEvents + (W3C_MODEL ? w3cNativeEvents : ''))))

          // custom events are events that we *fake*, they are not provided natively but
          // we can use native events to generate them
        , customEvents = (function () {
            var isAncestor = 'compareDocumentPosition' in root
                  ? function (element, container) {
                      return container.compareDocumentPosition && (container.compareDocumentPosition(element) & 16) === 16
                    }
                  : 'contains' in root
                    ? function (element, container) {
                        container = container.nodeType === 9 || container === window ? root : container
                        return container !== element && container.contains(element)
                      }
                    : function (element, container) {
                        while (element = element.parentNode) if (element === container) return 1
                        return 0
                      }
              , check = function (event) {
                  var related = event.relatedTarget
                  return !related
                    ? related == null
                    : (related !== this && related.prefix !== 'xul' && !/document/.test(this.toString())
                        && !isAncestor(related, this))
                }

            return {
                mouseenter: { base: 'mouseover', condition: check }
              , mouseleave: { base: 'mouseout', condition: check }
              , mousewheel: { base: /Firefox/.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel' }
            }
          }())

          // we provide a consistent Event object across browsers by taking the actual DOM
          // event object and generating a new one from its properties.
        , Event = (function () {
                // a whitelist of properties (for different event types) tells us what to check for and copy
            var commonProps  = str2arr('altKey attrChange attrName bubbles cancelable ctrlKey currentTarget ' +
                  'detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey '  +
                  'srcElement target timeStamp type view which propertyName')
              , mouseProps   = commonProps.concat(str2arr('button buttons clientX clientY dataTransfer '      +
                  'fromElement offsetX offsetY pageX pageY screenX screenY toElement'))
              , mouseWheelProps = mouseProps.concat(str2arr('wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ ' +
                  'axis')) // 'axis' is FF specific
              , keyProps     = commonProps.concat(str2arr('char charCode key keyCode keyIdentifier '          +
                  'keyLocation location'))
              , textProps    = commonProps.concat(str2arr('data'))
              , touchProps   = commonProps.concat(str2arr('touches targetTouches changedTouches scale rotation'))
              , messageProps = commonProps.concat(str2arr('data origin source'))
              , stateProps   = commonProps.concat(str2arr('state'))
              , overOutRegex = /over|out/
                // some event types need special handling and some need special properties, do that all here
              , typeFixers   = [
                    { // key events
                        reg: /key/i
                      , fix: function (event, newEvent) {
                          newEvent.keyCode = event.keyCode || event.which
                          return keyProps
                        }
                    }
                  , { // mouse events
                        reg: /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i
                      , fix: function (event, newEvent, type) {
                          newEvent.rightClick = event.which === 3 || event.button === 2
                          newEvent.pos = { x: 0, y: 0 }
                          if (event.pageX || event.pageY) {
                            newEvent.clientX = event.pageX
                            newEvent.clientY = event.pageY
                          } else if (event.clientX || event.clientY) {
                            newEvent.clientX = event.clientX + doc.body.scrollLeft + root.scrollLeft
                            newEvent.clientY = event.clientY + doc.body.scrollTop + root.scrollTop
                          }
                          if (overOutRegex.test(type)) {
                            newEvent.relatedTarget = event.relatedTarget
                              || event[(type == 'mouseover' ? 'from' : 'to') + 'Element']
                          }
                          return mouseProps
                        }
                    }
                  , { // mouse wheel events
                        reg: /mouse.*(wheel|scroll)/i
                      , fix: function () { return mouseWheelProps }
                    }
                  , { // TextEvent
                        reg: /^text/i
                      , fix: function () { return textProps }
                    }
                  , { // touch and gesture events
                        reg: /^touch|^gesture/i
                      , fix: function () { return touchProps }
                    }
                  , { // message events
                        reg: /^message$/i
                      , fix: function () { return messageProps }
                    }
                  , { // popstate events
                        reg: /^popstate$/i
                      , fix: function () { return stateProps }
                    }
                  , { // everything else
                        reg: /.*/
                      , fix: function () { return commonProps }
                    }
                ]
              , typeFixerMap = {} // used to map event types to fixer functions (above), a basic cache mechanism

              , Event = function (event, element, isNative) {
                  if (!arguments.length) return
                  event = event || ((element.ownerDocument || element.document || element).parentWindow || win).event
                  this.originalEvent = event
                  this.isNative       = isNative
                  this.isBean         = true

                  if (!event) return

                  var type   = event.type
                    , target = event.target || event.srcElement
                    , i, l, p, props, fixer

                  this.target = target && target.nodeType === 3 ? target.parentNode : target

                  if (isNative) { // we only need basic augmentation on custom events, the rest expensive & pointless
                    fixer = typeFixerMap[type]
                    if (!fixer) { // haven't encountered this event type before, map a fixer function for it
                      for (i = 0, l = typeFixers.length; i < l; i++) {
                        if (typeFixers[i].reg.test(type)) { // guaranteed to match at least one, last is .*
                          typeFixerMap[type] = fixer = typeFixers[i].fix
                          break
                        }
                      }
                    }

                    props = fixer(event, this, type)
                    for (i = props.length; i--;) {
                      if (!((p = props[i]) in this) && p in event) this[p] = event[p]
                    }
                  }
                }

            // preventDefault() and stopPropagation() are a consistent interface to those functions
            // on the DOM, stop() is an alias for both of them together
            Event.prototype.preventDefault = function () {
              if (this.originalEvent.preventDefault) this.originalEvent.preventDefault()
              else this.originalEvent.returnValue = false
            }
            Event.prototype.stopPropagation = function () {
              if (this.originalEvent.stopPropagation) this.originalEvent.stopPropagation()
              else this.originalEvent.cancelBubble = true
            }
            Event.prototype.stop = function () {
              this.preventDefault()
              this.stopPropagation()
              this.stopped = true
            }
            // stopImmediatePropagation() has to be handled internally because we manage the event list for
            // each element
            // note that originalElement may be a Bean#Event object in some situations
            Event.prototype.stopImmediatePropagation = function () {
              if (this.originalEvent.stopImmediatePropagation) this.originalEvent.stopImmediatePropagation()
              this.isImmediatePropagationStopped = function () { return true }
            }
            Event.prototype.isImmediatePropagationStopped = function () {
              return this.originalEvent.isImmediatePropagationStopped && this.originalEvent.isImmediatePropagationStopped()
            }
            Event.prototype.clone = function (currentTarget) {
              //TODO: this is ripe for optimisation, new events are *expensive*
              // improving this will speed up delegated events
              var ne = new Event(this, this.element, this.isNative)
              ne.currentTarget = currentTarget
              return ne
            }

            return Event
          }())

          // if we're in old IE we can't do onpropertychange on doc or win so we use doc.documentElement for both
        , targetElement = function (element, isNative) {
            return !W3C_MODEL && !isNative && (element === doc || element === win) ? root : element
          }

          /**
            * Bean maintains an internal registry for event listeners. We don't touch elements, objects
            * or functions to identify them, instead we store everything in the registry.
            * Each event listener has a RegEntry object, we have one 'registry' for the whole instance.
            */
        , RegEntry = (function () {
            // each handler is wrapped so we can handle delegation and custom events
            var wrappedHandler = function (element, fn, condition, args) {
                var call = function (event, eargs) {
                      return fn.apply(element, args ? slice.call(eargs, event ? 0 : 1).concat(args) : eargs)
                    }
                  , findTarget = function (event, eventElement) {
                      return fn.__beanDel ? fn.__beanDel.ft(event.target, element) : eventElement
                    }
                  , handler = condition
                      ? function (event) {
                          var target = findTarget(event, this) // deleated event
                          if (condition.apply(target, arguments)) {
                            if (event) event.currentTarget = target
                            return call(event, arguments)
                          }
                        }
                      : function (event) {
                          if (fn.__beanDel) event = event.clone(findTarget(event)) // delegated event, fix the fix
                          return call(event, arguments)
                        }
                handler.__beanDel = fn.__beanDel
                return handler
              }

            , RegEntry = function (element, type, handler, original, namespaces, args, root) {
                var customType     = customEvents[type]
                  , isNative

                if (type == 'unload') {
                  // self clean-up
                  handler = once(removeListener, element, type, handler, original)
                }

                if (customType) {
                  if (customType.condition) {
                    handler = wrappedHandler(element, handler, customType.condition, args)
                  }
                  type = customType.base || type
                }

                this.isNative      = isNative = nativeEvents[type] && !!element[eventSupport]
                this.customType    = !W3C_MODEL && !isNative && type
                this.element       = element
                this.type          = type
                this.original      = original
                this.namespaces    = namespaces
                this.eventType     = W3C_MODEL || isNative ? type : 'propertychange'
                this.target        = targetElement(element, isNative)
                this[eventSupport] = !!this.target[eventSupport]
                this.root          = root
                this.handler       = wrappedHandler(element, handler, null, args)
              }

            // given a list of namespaces, is our entry in any of them?
            RegEntry.prototype.inNamespaces = function (checkNamespaces) {
              var i, j, c = 0
              if (!checkNamespaces) return true
              if (!this.namespaces) return false
              for (i = checkNamespaces.length; i--;) {
                for (j = this.namespaces.length; j--;) {
                  if (checkNamespaces[i] == this.namespaces[j]) c++
                }
              }
              return checkNamespaces.length === c
            }

            // match by element, original fn (opt), handler fn (opt)
            RegEntry.prototype.matches = function (checkElement, checkOriginal, checkHandler) {
              return this.element === checkElement &&
                (!checkOriginal || this.original === checkOriginal) &&
                (!checkHandler || this.handler === checkHandler)
            }

            return RegEntry
          }())

        , registry = (function () {
            // our map stores arrays by event type, just because it's better than storing
            // everything in a single array.
            // uses '$' as a prefix for the keys for safety and 'r' as a special prefix for
            // rootListeners so we can look them up fast
            var map = {}

              // generic functional search of our registry for matching listeners,
              // `fn` returns false to break out of the loop
              , forAll = function (element, type, original, handler, root, fn) {
                  var pfx = root ? 'r' : '$'
                  if (!type || type == '*') {
                    // search the whole registry
                    for (var t in map) {
                      if (t.charAt(0) == pfx) {
                        forAll(element, t.substr(1), original, handler, root, fn)
                      }
                    }
                  } else {
                    var i = 0, l, list = map[pfx + type], all = element == '*'
                    if (!list) return
                    for (l = list.length; i < l; i++) {
                      if ((all || list[i].matches(element, original, handler)) && !fn(list[i], list, i, type)) return
                    }
                  }
                }

              , has = function (element, type, original, root) {
                  // we're not using forAll here simply because it's a bit slower and this
                  // needs to be fast
                  var i, list = map[(root ? 'r' : '$') + type]
                  if (list) {
                    for (i = list.length; i--;) {
                      if (!list[i].root && list[i].matches(element, original, null)) return true
                    }
                  }
                  return false
                }

              , get = function (element, type, original, root) {
                  var entries = []
                  forAll(element, type, original, null, root, function (entry) {
                    return entries.push(entry)
                  })
                  return entries
                }

              , put = function (entry) {
                  var has = !entry.root && !this.has(entry.element, entry.type, null, false)
                    , key = (entry.root ? 'r' : '$') + entry.type
                  ;(map[key] || (map[key] = [])).push(entry)
                  return has
                }

              , del = function (entry) {
                  forAll(entry.element, entry.type, null, entry.handler, entry.root, function (entry, list, i) {
                    list.splice(i, 1)
                    entry.removed = true
                    if (list.length === 0) delete map[(entry.root ? 'r' : '$') + entry.type]
                    return false
                  })
                }

                // dump all entries, used for onunload
              , entries = function () {
                  var t, entries = []
                  for (t in map) {
                    if (t.charAt(0) == '$') entries = entries.concat(map[t])
                  }
                  return entries
                }

            return { has: has, get: get, put: put, del: del, entries: entries }
          }())

          // we need a selector engine for delegated events, use querySelectorAll if it exists
          // but for older browsers we need Qwery, Sizzle or similar
        , selectorEngine
        , setSelectorEngine = function (e) {
            if (!arguments.length) {
              selectorEngine = doc.querySelectorAll
                ? function (s, r) {
                    return r.querySelectorAll(s)
                  }
                : function () {
                    throw new Error('Bean: No selector engine installed') // eeek
                  }
            } else {
              selectorEngine = e
            }
          }

          // we attach this listener to each DOM event that we need to listen to, only once
          // per event type per DOM element
        , rootListener = function (event, type) {
            if (!W3C_MODEL && type && event && event.propertyName != '_on' + type) return

            var listeners = registry.get(this, type || event.type, null, false)
              , l = listeners.length
              , i = 0

            event = new Event(event, this, true)
            if (type) event.type = type

            // iterate through all handlers registered for this type, calling them unless they have
            // been removed by a previous handler or stopImmediatePropagation() has been called
            for (; i < l && !event.isImmediatePropagationStopped(); i++) {
              if (!listeners[i].removed) listeners[i].handler.call(this, event)
            }
          }

          // add and remove listeners to DOM elements
        , listener = W3C_MODEL
            ? function (element, type, add) {
                // new browsers
                element[add ? addEvent : removeEvent](type, rootListener, false)
              }
            : function (element, type, add, custom) {
                // IE8 and below, use attachEvent/detachEvent and we have to piggy-back propertychange events
                // to simulate event bubbling etc.
                var entry
                if (add) {
                  registry.put(entry = new RegEntry(
                      element
                    , custom || type
                    , function (event) { // handler
                        rootListener.call(element, event, custom)
                      }
                    , rootListener
                    , null
                    , null
                    , true // is root
                  ))
                  if (custom && element['_on' + custom] == null) element['_on' + custom] = 0
                  entry.target.attachEvent('on' + entry.eventType, entry.handler)
                } else {
                  entry = registry.get(element, custom || type, rootListener, true)[0]
                  if (entry) {
                    entry.target.detachEvent('on' + entry.eventType, entry.handler)
                    registry.del(entry)
                  }
                }
              }

        , once = function (rm, element, type, fn, originalFn) {
            // wrap the handler in a handler that does a remove as well
            return function () {
              fn.apply(this, arguments)
              rm(element, type, originalFn)
            }
          }

        , removeListener = function (element, orgType, handler, namespaces) {
            var type     = orgType && orgType.replace(nameRegex, '')
              , handlers = registry.get(element, type, null, false)
              , removed  = {}
              , i, l

            for (i = 0, l = handlers.length; i < l; i++) {
              if ((!handler || handlers[i].original === handler) && handlers[i].inNamespaces(namespaces)) {
                // TODO: this is problematic, we have a registry.get() and registry.del() that
                // both do registry searches so we waste cycles doing this. Needs to be rolled into
                // a single registry.forAll(fn) that removes while finding, but the catch is that
                // we'll be splicing the arrays that we're iterating over. Needs extra tests to
                // make sure we don't screw it up. @rvagg
                registry.del(handlers[i])
                if (!removed[handlers[i].eventType] && handlers[i][eventSupport])
                  removed[handlers[i].eventType] = { t: handlers[i].eventType, c: handlers[i].type }
              }
            }
            // check each type/element for removed listeners and remove the rootListener where it's no longer needed
            for (i in removed) {
              if (!registry.has(element, removed[i].t, null, false)) {
                // last listener of this type, remove the rootListener
                listener(element, removed[i].t, false, removed[i].c)
              }
            }
          }

          // set up a delegate helper using the given selector, wrap the handler function
        , delegate = function (selector, fn) {
            //TODO: findTarget (therefore $) is called twice, once for match and once for
            // setting e.currentTarget, fix this so it's only needed once
            var findTarget = function (target, root) {
                  var i, array = isString(selector) ? selectorEngine(selector, root) : selector
                  for (; target && target !== root; target = target.parentNode) {
                    for (i = array.length; i--;) {
                      if (array[i] === target) return target
                    }
                  }
                }
              , handler = function (e) {
                  var match = findTarget(e.target, this)
                  if (match) fn.apply(match, arguments)
                }

            // __beanDel isn't pleasant but it's a private function, not exposed outside of Bean
            handler.__beanDel = {
                ft       : findTarget // attach it here for customEvents to use too
              , selector : selector
            }
            return handler
          }

        , fireListener = W3C_MODEL ? function (isNative, type, element) {
            // modern browsers, do a proper dispatchEvent()
            var evt = doc.createEvent(isNative ? 'HTMLEvents' : 'UIEvents')
            evt[isNative ? 'initEvent' : 'initUIEvent'](type, true, true, win, 1)
            element.dispatchEvent(evt)
          } : function (isNative, type, element) {
            // old browser use onpropertychange, just increment a custom property to trigger the event
            element = targetElement(element, isNative)
            isNative ? element.fireEvent('on' + type, doc.createEventObject()) : element['_on' + type]++
          }

          /**
            * Public API: off(), on(), add(), (remove()), one(), fire(), clone()
            */

          /**
            * off(element[, eventType(s)[, handler ]])
            */
        , off = function (element, typeSpec, fn) {
            var isTypeStr = isString(typeSpec)
              , k, type, namespaces, i

            if (isTypeStr && typeSpec.indexOf(' ') > 0) {
              // off(el, 't1 t2 t3', fn) or off(el, 't1 t2 t3')
              typeSpec = str2arr(typeSpec)
              for (i = typeSpec.length; i--;)
                off(element, typeSpec[i], fn)
              return element
            }

            type = isTypeStr && typeSpec.replace(nameRegex, '')
            if (type && customEvents[type]) type = customEvents[type].base

            if (!typeSpec || isTypeStr) {
              // off(el) or off(el, t1.ns) or off(el, .ns) or off(el, .ns1.ns2.ns3)
              if (namespaces = isTypeStr && typeSpec.replace(namespaceRegex, '')) namespaces = str2arr(namespaces, '.')
              removeListener(element, type, fn, namespaces)
            } else if (isFunction(typeSpec)) {
              // off(el, fn)
              removeListener(element, null, typeSpec)
            } else {
              // off(el, { t1: fn1, t2, fn2 })
              for (k in typeSpec) {
                if (typeSpec.hasOwnProperty(k)) off(element, k, typeSpec[k])
              }
            }

            return element
          }

          /**
            * on(element, eventType(s)[, selector], handler[, args ])
            */
        , on = function(element, events, selector, fn) {
            var originalFn, type, types, i, args, entry, first

            //TODO: the undefined check means you can't pass an 'args' argument, fix this perhaps?
            if (selector === undefined && typeof events == 'object') {
              //TODO: this can't handle delegated events
              for (type in events) {
                if (events.hasOwnProperty(type)) {
                  on.call(this, element, type, events[type])
                }
              }
              return
            }

            if (!isFunction(selector)) {
              // delegated event
              originalFn = fn
              args       = slice.call(arguments, 4)
              fn         = delegate(selector, originalFn, selectorEngine)
            } else {
              args       = slice.call(arguments, 3)
              fn         = originalFn = selector
            }

            types = str2arr(events)

            // special case for one(), wrap in a self-removing handler
            if (this === ONE) {
              fn = once(off, element, events, fn, originalFn)
            }

            for (i = types.length; i--;) {
              // add new handler to the registry and check if it's the first for this element/type
              first = registry.put(entry = new RegEntry(
                  element
                , types[i].replace(nameRegex, '') // event type
                , fn
                , originalFn
                , str2arr(types[i].replace(namespaceRegex, ''), '.') // namespaces
                , args
                , false // not root
              ))
              if (entry[eventSupport] && first) {
                // first event of this type on this element, add root listener
                listener(element, entry.eventType, true, entry.customType)
              }
            }

            return element
          }

          /**
            * add(element[, selector], eventType(s), handler[, args ])
            *
            * Deprecated: kept (for now) for backward-compatibility
            */
        , add = function (element, events, fn, delfn) {
            return on.apply(
                null
              , !isString(fn)
                  ? slice.call(arguments)
                  : [ element, fn, events, delfn ].concat(arguments.length > 3 ? slice.call(arguments, 5) : [])
            )
          }

          /**
            * one(element, eventType(s)[, selector], handler[, args ])
            */
        , one = function () {
            return on.apply(ONE, arguments)
          }

          /**
            * fire(element, eventType(s)[, args ])
            *
            * The optional 'args' argument must be an array, if no 'args' argument is provided
            * then we can use the browser's DOM event system, otherwise we trigger handlers manually
            */
        , fire = function (element, type, args) {
            var types = str2arr(type)
              , i, j, l, names, handlers

            for (i = types.length; i--;) {
              type = types[i].replace(nameRegex, '')
              if (names = types[i].replace(namespaceRegex, '')) names = str2arr(names, '.')
              if (!names && !args && element[eventSupport]) {
                fireListener(nativeEvents[type], type, element)
              } else {
                // non-native event, either because of a namespace, arguments or a non DOM element
                // iterate over all listeners and manually 'fire'
                handlers = registry.get(element, type, null, false)
                args = [false].concat(args)
                for (j = 0, l = handlers.length; j < l; j++) {
                  if (handlers[j].inNamespaces(names)) {
                    handlers[j].handler.apply(element, args)
                  }
                }
              }
            }
            return element
          }

          /**
            * clone(dstElement, srcElement[, eventType ])
            *
            * TODO: perhaps for consistency we should allow the same flexibility in type specifiers?
            */
        , clone = function (element, from, type) {
            var handlers = registry.get(from, type, null, false)
              , l = handlers.length
              , i = 0
              , args, beanDel

            for (; i < l; i++) {
              if (handlers[i].original) {
                args = [ element, handlers[i].type ]
                if (beanDel = handlers[i].handler.__beanDel) args.push(beanDel.selector)
                args.push(handlers[i].original)
                on.apply(null, args)
              }
            }
            return element
          }

        , bean = {
              'on'                : on
            , 'add'               : add
            , 'one'               : one
            , 'off'               : off
            , 'remove'            : off
            , 'clone'             : clone
            , 'fire'              : fire
            , 'Event'             : Event
            , 'setSelectorEngine' : setSelectorEngine
            , 'noConflict'        : function () {
                context[name] = old
                return this
              }
          }

      // for IE, clean up on unload to avoid leaks
      if (win.attachEvent) {
        var cleanup = function () {
          var i, entries = registry.entries()
          for (i in entries) {
            if (entries[i].type && entries[i].type !== 'unload') off(entries[i].element, entries[i].type)
          }
          win.detachEvent('onunload', cleanup)
          win.CollectGarbage && win.CollectGarbage()
        }
        win.attachEvent('onunload', cleanup)
      }

      // initialize selector engine to internal default (qSA or throw Error)
      setSelectorEngine(Ink.ss)

      return bean
    });

    /**
     * Keep this declaration here and off Bean as it extends the Event
     * object and some properties are readonly in strict mode
     */
    'use strict';

    /**
     * Instantiate browser native events array
     */

    /**
     * @module Ink.Dom.Event_1
     */

    /**
     * @class Ink.Dom.Event
     */

    var InkEvent = {

    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45,
    
    /**
     * Returns a function which calls `func`, waiting at least `wait`
     * milliseconds between calls. This is useful for events such as `scroll`
     * or `resize`, which can be triggered too many times per second, slowing
     * down the browser with needless function calls.
     *
     * *note:* This does not delay the first function call to the function.
     *
     * @method throttle
     * @param {Function} func   Function to call. Arguments and context are both passed.
     * @param {Number} [wait=0] Milliseconds to wait between calls.
     *
     * @example
     *  
     * Suppose you are observing the `scroll` event, but your application is lagging because `scroll` is triggered too many times.
     *
     *     // BEFORE
     *     InkEvent.observe(window, 'scroll', function () {
     *         ...
     *     }); // When scrolling on mobile devices or on firefox's smooth scroll
     *         // this is expensive because onscroll is called many times
     *
     *     // AFTER
     *     InkEvent.observe(window, 'scroll', InkEvent.throttle(function () {
     *         ...
     *     }, 100)); // The event handler is called only every 100ms. Problem solved.
     *
     * @example
     *     var handler = InkEvent.throttle(function () {
     *         ...
     *     }, 100);
     *
     *     InkEvent.observe(window, 'scroll', handler);
     *     InkEvent.observe(window, 'resize', handler);
     *
     *     // on resize, both the "scroll" and the "resize" events are triggered
     *     // a LOT of times. This prevents both of them being called a lot of
     *     // times when the window is being resized by a user.
     *
     **/
    throttle: function (func, wait) {
        wait = wait || 0;
        var lastCall = 0;  // Warning: This breaks on Jan 1st 1970 0:00
        var timeout;
        var throttled = function () {
            var now = +new Date();
            var timeDiff = now - lastCall;
            if (timeDiff >= wait) {
                lastCall = now;
                return func.apply(this, [].slice.call(arguments));
            } else {
                var that = this;
                var args = [].slice.call(arguments);
                if (!timeout) {
                    timeout = setTimeout(function () {
                        timeout = null;
                        return throttled.apply(that, args);
                    }, wait - timeDiff);
                }
            }
        };
        return throttled;
    },

    /**
     * Returns the target of the event object
     *
     * @method element
     * @param {Object} ev  event object
     * @return {Node} The target
     */
    element: function(ev) {
        var node = ev.delegationTarget ||
            ev.target ||
            // IE stuff
            (ev.type === 'mouseout'   && ev.fromElement) ||
            (ev.type === 'mouseleave' && ev.fromElement) ||
            (ev.type === 'mouseover'  && ev.toElement) ||
            (ev.type === 'mouseenter' && ev.toElement) ||
            ev.srcElement ||
            null;
        return node && (node.nodeType === 3 || node.nodeType === 4) ? node.parentNode : node;
    },

    /**
     * Returns the related target of the event object
     *
     * @method relatedTarget
     * @param {Object} ev event object
     * @return {Node} The related target
     */
    relatedTarget: function(ev){
        var node = ev.relatedTarget ||
            // IE stuff
            (ev.type === 'mouseout'   && ev.toElement) ||
            (ev.type === 'mouseleave' && ev.toElement) ||
            (ev.type === 'mouseover'  && ev.fromElement) ||
            (ev.type === 'mouseenter' && ev.fromElement) ||
            null;
        return node && (node.nodeType === 3 || node.nodeType === 4) ? node.parentNode : node;
    },

    /**
     * Navigate up the DOM tree, looking for a tag with the name `elmTagName`.
     *
     * If such tag is not found, `document` is returned.
     *
     * @method findElement
     * @param {Object}  ev              event object
     * @param {String}  elmTagName      tag name to find
     * @param {Boolean} [force=false]   If this is true, never return `document`, and returns `false` instead.
     * @return {DOMElement} the first element which matches given tag name or the document element if the wanted tag is not found
     */
    findElement: function(ev, elmTagName, force)
    {
        var node = this.element(ev);
        while(true) {
            if(node.nodeName.toLowerCase() === elmTagName.toLowerCase()) {
                return node;
            } else {
                node = node.parentNode;
                if(!node) {
                    if(force) {
                        return false;
                    }
                    return document;
                }
                if(!node.parentNode){
                    if(force){ return false; }
                    return document;
                }
            }
        }
    },

    /**
     * Attaches an event to element
     *
     * @method observe
     * @param {DOMElement|String}  element      Element id or element
     * @param {String}             eventName    Event name
     * @param {Function}           callBack     Receives event object as a
     * parameter. If you're manually firing custom events, check the
     * eventName property of the event object to make sure you're handling
     * the right event.
     * @param {Boolean}            [useCapture] Set to true to change event listening from bubbling to capture.
     * @return {Function} The event handler used. Hang on to this if you want to `stopObserving` later.
     */
    observe: function(element, eventName, callBack, useCapture) {
        element = Ink.i(element);
        if(element) {
            if(element.addEventListener) {
                element.addEventListener(eventName, callBack, !!useCapture);
            } else {
                element.attachEvent('on' + eventName, (callBack = Ink.bind(callBack, element)));
            }
            return callBack;
        }
    },

    /**
     * Like observe, but listen to the event only once.
     *
     * @method observeOnce
     * @param {DOMElement|String}  element      Element id or element
     * @param {String}             eventName    Event name
     * @param {Function}           callBack     Receives event object as a
     * parameter. If you're manually firing custom events, check the
     * eventName property of the event object to make sure you're handling
     * the right event.
     * @param {Boolean}            [useCapture] Set to true to change event listening from bubbling to capture.
     * @return {Function} The event handler used. Hang on to this if you want to `stopObserving` later.
     */
    observeOnce: function (element, eventName, callBack, useCapture) {
        var onceBack = function () {
            InkEvent.stopObserving(element, eventName, onceBack);
            return callBack();
        };
        return InkEvent.observe(element, eventName, onceBack, useCapture);
    },

    /**
     * Attaches an event to a selector or array of elements.
     *
     * Requires Ink.Dom.Selector
     *
     * @method observeMulti
     * @param {Array|String} elements
     * @param ... See the `observe` function.
     * @return {Function} The used callback.
     */
    observeMulti: function (elements, eventName, callBack, useCapture) {
        if (typeof elements === 'string') {
            elements = Ink.ss(elements);
        } else if ( /* is an element */ elements && elements.nodeType === 1) {
            elements = [elements];
        }
        if (!elements[0]) { return false; }

        for (var i = 0, len = elements.length; i < len; i++) {
            this.observe(elements[i], eventName, callBack, useCapture);
        }
        return callBack;
    },

    /**
     * Observe an event on the given element and every children which matches the selector string (if provided).
     *
     * Requires Ink.Dom.Selector if you need to use a selector.
     *
     * @method observeDelegated
     * @param {DOMElement|String} element   Element to observe.
     * @param {String}            eventName Event name to observe.
     * @param {String}            selector  Child element selector. When null, finds any element.
     * @param {Function}          callback  Callback to be called when the event is fired
     * @return {Function} The used callback, for ceasing to listen to the event later.
     **/
    observeDelegated: function (element, eventName, selector, callback) {
        return InkEvent.observe(element, eventName, function (event) {
            var fromElement = InkEvent.element(event);
            if (!fromElement || fromElement === element) { return; }

            var cursor = fromElement;

            // Go up the document tree until we hit the element itself.
            while (cursor !== element && cursor !== document && cursor) {
                if (Ink.Dom.Selector_1.matchesSelector(cursor, selector)) {
                    event.delegationTarget = cursor;
                    return callback(event);
                }
                cursor = cursor.parentNode;
            }
        });
    },

    /**
     * Remove an event attached to an element
     *
     * @method stopObserving
     * @param {DOMElement|String}  element       element id or element
     * @param {String}             eventName     event name
     * @param {Function}           callBack      callback function
     * @param {Boolean}            [useCapture]  set to true if the event was being observed with useCapture set to true as well.
     */
    stopObserving: function(element, eventName, callBack, useCapture) {
        element = Ink.i(element);

        if(element) {
            if(element.removeEventListener) {
                element.removeEventListener(eventName, callBack, !!useCapture);
            } else {
                element.detachEvent('on' + eventName, callBack);
            }
        }
    },

    /**
     * Stops event propagation and bubbling
     *
     * @method stop
     * @param {Object} event  event handle
     */
    stop: function(event)
    {
        if(event.cancelBubble !== null) {
            event.cancelBubble = true;
        }
        if(event.stopPropagation) {
            event.stopPropagation();
        }
        if(event.preventDefault) {
            event.preventDefault();
        }
        if(window.attachEvent) {
            event.returnValue = false;
        }
        if(event.cancel !== null) {
            event.cancel = true;
        }
    },

    /**
     * Stops event propagation
     *
     * @method stopPropagation
     * @param {Object} event  event handle
     */
    stopPropagation: function(event) {
        if(event.cancelBubble !== null) {
            event.cancelBubble = true;
        }
        if(event.stopPropagation) {
            event.stopPropagation();
        }
    },

    /**
     * Stops event default behaviour
     *
     * @method stopDefault
     * @param {Object} event  event handle
     */
    stopDefault: function(event)
    {
        if(event.preventDefault) {
            event.preventDefault();
        }
        if(window.attachEvent) {
            event.returnValue = false;
        }
        if(event.cancel !== null) {
            event.cancel = true;
        }
    },

    /**
     * @method pointer
     * @param {Object} ev event object
     * @return {Object} an object with the mouse X and Y position
     */
    pointer: function(ev)
    {
        return {
            x: this.pointerX(ev),
            y: this.pointerY(ev)
        };
    },

    /**
     * @method pointerX
     * @param {Object} ev event object
     * @return {Number} mouse X position
     */
    pointerX: function(ev)
    {
        return (ev.touches && ev.touches[0] && ev.touches[0].pageX) ||
            (ev.pageX) ||
            (ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    },

    /**
     * @method pointerY
     * @param {Object} ev event object
     * @return {Number} mouse Y position
     */
    pointerY: function(ev)
    {
        return (ev.touches && ev.touches[0] && ev.touches[0].pageY) ||
            (ev.pageY) ||
            (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    },

    /**
     * @method isLeftClick
     * @param {Object} ev  event object
     * @return {Boolean} True if the event is a left mouse click
     */
    isLeftClick: function(ev) {
        if (window.addEventListener) {
            if(ev.button === 0){
                return true;
            } else if(ev.type === 'touchend' && ev.button === null){
                // [todo] do the above check for pointerEvents too
                return true;
            }
        }
        else {
            if(ev.button === 1){ return true; }
        }
        return false;
    },

    /**
     * @method isRightClick
     * @param {Object} ev  event object
     * @return {Boolean} True if there is a right click on the event
     */
    isRightClick: function(ev) {
        return (ev.button === 2);
    },

    /**
     * @method isMiddleClick
     * @param {Object} ev  event object
     * @return {Boolean} True if there is a middle click on the event
     */
    isMiddleClick: function(ev) {
        if (window.addEventListener) {
            return (ev.button === 1);
        }
        else {
            return (ev.button === 4);
        }
        return false;
    },

    /**
     * Work in Progress.
     * Used in SAPO.Component.MaskedInput
     *
     * @method getCharFromKeyboardEvent
     * @param {KeyboardEvent}     event           keyboard event
     * @param {optional Boolean}  [changeCasing]  if true uppercases, if false lowercases, otherwise keeps casing
     * @return {String} character representation of pressed key combination
     */
    getCharFromKeyboardEvent: function(event, changeCasing) {
        var k = event.keyCode;
        var c = String.fromCharCode(k);

        var shiftOn = event.shiftKey;
        if (k >= 65 && k <= 90) {   // A-Z
            if (typeof changeCasing === 'boolean') {
                shiftOn = changeCasing;
            }
            return (shiftOn) ? c : c.toLowerCase();
        }
        else if (k >= 96 && k <= 105) { // numpad digits
            return String.fromCharCode( 48 + (k-96) );
        }
        switch (k) {
            case 109:   case 189:   return '-';
            case 107:   case 187:   return '+';
        }
        return c;
    },

    debug: function(){}
};

/**
 * bean.on() lets you attach event listeners to both elements and objects.
 * http://github.com/fat/bean#on
 *
 * @method on
 * @param {DOMElement|Object} element An HTML DOM element or any JavaScript Object
 * @param {String}            eventType An Event (or multiple events, space separated) to listen to
 * @param {String}            [selector] A CSS DOM Element selector string to bind the listener to child elements matching the selector
 * @param {Function}          [handler] The callback function
 * @param {Object}            [args...] Additional arguments to pass to the callback function when triggered
 * 
 * @return {DOMElement|Object} Returns the original DOM Element or Javascript Object
 */

/**
 * bean.one() is an alias for bean.on() except that the handler will only be executed once and then removed for the event type(s).
 * http://github.com/fat/bean#one
 *
 * @method one
 * @param {DOMElement|Object} element An HTML DOM element or any JavaScript Object
 * @param {String}            eventType An Event (or multiple events, space separated) to listen to
 * @param {String}            [selector] A CSS DOM Element selector string to bind the listener to child elements matching the selector
 * @param {Function}          [handler] The callback function
 * @param                     [args...] Additional arguments to pass to the callback function when triggered
 * 
 * @return {DOMElement|Object} Returns the original DOM Element or Javascript Object
 */

/**
 * bean.off() is how you get rid of handlers once you no longer want them active. It's also a good idea to call off on elements before you remove them from your DOM; this gives Bean a chance to clean up some things and prevents memory leaks.
 * http://github.com/fat/bean#off
 *
 * @method off
 * @param {DOMElement|Object} element An HTML DOM element or any JavaScript Object
 * @param {String}            eventType An Event (or multiple events, space separated) to remove
 * @param {Function}          [handler] The specific callback function to remove
 * 
 * @return {DOMElement|Object} Returns the original DOM Element or Javascript Object
 */

/**
 * bean.clone() is a method for cloning events from one DOM element or object to another.
 * http://github.com/fat/bean#clone
 *
 * @method clone
 * @param {DOMElement|Object} destElement An HTML DOM element or any JavaScript Object to copy events to
 * @param {String}            srcElement An HTML DOM element or any JavaScript Object to copy events from
 * @param {String}            [eventType] An Event (or multiple events, space separated) to clone
 * 
 * @return {DOMElement|Object} Returns the original DOM Element or Javascript Object
 */

/**
 * bean.fire() gives you the ability to trigger events.
 * http://github.com/fat/bean#fire
 *
 * @method fire
 * @param {DOMElement|Object} destElement An HTML DOM element or any JavaScript Object fire the event on
 * @param {String}            eventType An Event (or multiple events, space separated) to fire
 * @param                     [args...] Additional arguments to pass to the callback function when triggered
 *
 * @return {DOMElement|Object} Returns the original DOM Element or Javascript Object
 */

return Ink.extendObj(InkEvent, bean);

});

/**
 * @module Ink.Dom.FormSerialize
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Dom.FormSerialize', 1, [], function () {
    'use strict';
    /**
     * Supports serialization of form data to/from javascript Objects.
     *
     * Valid applications are ad hoc AJAX/syndicated submission of forms, restoring form values from server side state, etc.
     *
     * @class Ink.Dom.FormSerialize
     *
     */
    var FormSerialize = {

        /**
         * Serializes a form into an object, turning field names into keys, and field values into values.
         *
         * note: Multi-select and checkboxes with multiple values will yield arrays
         *
         * @method serialize
         * @return {Object} map of fieldName -> String|String[]|Boolean
         * @param {DomElement|String}   form    form element from which the extraction is to occur
         *
         * @example
         *     <form id="frm">
         *         <input type="text" name="field1">
         *         <button type="submit">Submit</button>
         *     </form>
         *     <script type="text/javascript">
         *         Ink.requireModules(['Ink.Dom.FormSerialize_1', 'Ink.Dom.Event_1'], function (FormSerialize, InkEvent) {
         *             InkEvent.observe('frm', 'submit', function (event) {
         *                 var formData = FormSerialize.serialize('frm'); // -> {field1:"123"}
         *                 InkEvent.stop(event);
         *             });
         *         });
         *     </script>
         */
        serialize: function(form) {
            form = Ink.i(form);
            var map = this._getFieldNameInputsMap(form);

            var map2 = {};
            for (var k in map) if (map.hasOwnProperty(k)) {
                if(k !== null) {
                    var tmpK = k.replace(/\[\]$/, '');
                    map2[tmpK] = this._getValuesOfField( map[k] );
                } else {
                    map2[k] = this._getValuesOfField( map[k] );
                }
            }

            delete map2['null'];    // this can occur. if so, delete it...
            return map2;
        },




        /**
         * Sets form elements's values with values given from object
         *
         * One cannot restore the values of an input with `type="file"` (browser prohibits it)
         *
         * @method fillIn 
         * @param {DomElement|String}   form    form element which is to be populated
         * @param {Object}              map2    map of fieldName -> String|String[]|Boolean
         * @example
         *     <form id="frm">
         *         <input type="text" name="field1">
         *         <button type="submit">Submit</button>
         *     </form>
         *     <script type="text/javascript">
         *         Ink.requireModules(['Ink.Dom.FormSerialize_1'], function (FormSerialize) {
         *             var values = {field1: 'CTHULHU'};
         *             FormSerialize.fillIn('frm', values);
         *             // At this point the form is pre-filled with the values above.
         *         });
         *     </script>
         */
        fillIn: function(form, map2) {
            form = Ink.i(form);
            var map = this._getFieldNameInputsMap(form);
            delete map['null']; // this can occur. if so, delete it...

            for (var k in map2) if (map2.hasOwnProperty(k)) {
                this._setValuesOfField( map[k], map2[k] );
            }
        },



        _getFieldNameInputsMap: function(formEl) {
            var name, nodeName, el, map = {};
            for (var i = 0, f = formEl.elements.length; i < f; ++i) {
                el = formEl.elements[i];
                name = el.getAttribute('name');
                nodeName = el.nodeName.toLowerCase();
                if (nodeName === 'fieldset') {
                    continue;
                } else if (map[name] === undefined) {
                    map[name] = [el];
                } else {
                    map[name].push(el);
                }
            }
            return map;
        },



        _getValuesOfField: function(fieldInputs) {
            var nodeName = fieldInputs[0].nodeName.toLowerCase();
            var type = fieldInputs[0].getAttribute('type');
            var value = fieldInputs[0].value;
            var i, f, j, o, el, m, res = [];

            switch(nodeName) {
                case 'select':
                    for (i = 0, f = fieldInputs.length; i < f; ++i) {
                        res[i] = [];
                        m = fieldInputs[i].getAttribute('multiple');
                        for (j = 0, o = fieldInputs[i].options.length; j < o; ++j) {
                            el = fieldInputs[i].options[j];
                            if (el.selected) {
                                if (m) {
                                    res[i].push(el.value);
                                } else {
                                    res[i] = el.value;
                                    break;
                                }
                            }
                        }
                    }
                    return ((fieldInputs.length > 0 && /\[[^\]]*\]$/.test(fieldInputs[0].getAttribute('name'))) ? res : res[0]);

                case 'textarea':
                case 'input':
                    if (type === 'checkbox' || type === 'radio') {
                        for (i = 0, f = fieldInputs.length; i < f; ++i) {
                            el = fieldInputs[i];
                            if (el.checked) {
                                res.push(    el.value    );
                            }
                        }
                        if (type === 'checkbox') {
                            return (fieldInputs.length > 1) ? res : !!(res.length);
                        }
                        return (fieldInputs.length > 1) ? res[0] : !!(res.length);    // on radios only 1 option is selected at most
                    }
                    else {
                        //if (fieldInputs.length > 1) {    throw 'Got multiple input elements with same name!';    }
                        if(fieldInputs.length > 0 && /\[[^\]]*\]$/.test(fieldInputs[0].getAttribute('name'))) {
                            var tmpValues = [];
                            for(i=0, f = fieldInputs.length; i < f; ++i) {
                                tmpValues.push(fieldInputs[i].value);
                            }
                            return tmpValues;
                        } else {
                            return value;
                        }
                    }
                    break;    // to keep JSHint happy...  (reply to this comment by gamboa: - ROTFL)

                default:
                    //throw 'Unsupported element: "' + nodeName + '"!';
                    return undefined;
            }
        },



        _valInArray: function(val, arr) {
            for (var i = 0, f = arr.length; i < f; ++i) {
                if (arr[i] === val) {    return true;    }
            }
            return false;
        },



        _setValuesOfField: function(fieldInputs, fieldValues) {
            if (!fieldInputs) {    return;    }
            var nodeName = fieldInputs[0].nodeName.toLowerCase();
            var type = fieldInputs[0].getAttribute('type');
            var i, f, el;

            switch(nodeName) {
                case 'select':
                    if (fieldInputs.length > 1) {    throw 'Got multiple select elements with same name!';    }
                    for (i = 0, f = fieldInputs[0].options.length; i < f; ++i) {
                        el = fieldInputs[0].options[i];
                        el.selected = (fieldValues instanceof Array) ? this._valInArray(el.value, fieldValues) : el.value === fieldValues;
                    }
                    break;
                case 'textarea':
                case 'input':
                    if (type === 'checkbox' || type === 'radio') {
                        for (i = 0, f = fieldInputs.length; i < f; ++i) {
                            el = fieldInputs[i];
                            //el.checked = (fieldValues instanceof Array) ? this._valInArray(el.value, fieldValues) : el.value === fieldValues;
                            el.checked = (fieldValues instanceof Array) ? this._valInArray(el.value, fieldValues) : (fieldInputs.length > 1 ? el.value === fieldValues : !!fieldValues);
                        }
                    }
                    else {
                        if (fieldInputs.length > 1) {    throw 'Got multiple input elements with same name!';    }
                        if (type !== 'file') {
                            fieldInputs[0].value = fieldValues;
                        }
                    }
                    break;

                default:
                    throw 'Unsupported element: "' + nodeName + '"!';
            }
        }
    };

    return FormSerialize;
});

/**
 * @module Ink.Dom.Loaded_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Dom.Loaded', 1, [], function() {

    'use strict';

    /**
     * The Loaded class provides a method that allows developers to queue functions to run when
     * the page is loaded (document is ready).
     *
     * @class Ink.Dom.Loaded
     * @version 1
     * @static
     */
    var Loaded = {

        /**
         * Callbacks and their contexts. Array of 2-arrays.
         *
         * []
         *
         * @attribute _contexts Array
         * @private
         * 
         */
        _contexts: [], // Callbacks' queue

        /**
         * Adds a new function that will be invoked once the document is ready
         *
         * @method run
         * @param {Object}   [win=window]   Window object to attach/add the event
         * @param {Function} fn             Callback function to be run after the page is loaded
         * @public
         * @example
         *     Ink.requireModules(['Ink.Dom.Loaded_1'], function(Loaded){
         *         Loaded.run(function(){
         *             console.log('This will run when the page/document is ready/loaded');
         *         });
         *     });
         */
        run: function(win, fn) {
            if (!fn) {
                fn  = win;
                win = window;
            }

            var context;

            for (var i = 0, len = this._contexts.length; i < len; i++) {
                if (this._contexts[i][0] === win) {
                    context = this._contexts[i][1];
                    break;
                }
            }
            if (!context) {
                context = {
                    cbQueue: [],
                    win: win,
                    doc: win.document,
                    root: win.document.documentElement,
                    done: false,
                    top: true
                };
                context.handlers = {
                    checkState: Ink.bindEvent(this._checkState, this, context),
                    poll: Ink.bind(this._poll, this, context)
                };
                this._contexts.push(
                    [win, context]  // Javascript Objects cannot map different windows to
                                    // different values.
                );
            }

            var   ael = context.doc.addEventListener;
            context.add = ael ? 'addEventListener' : 'attachEvent';
            context.rem = ael ? 'removeEventListener' : 'detachEvent';
            context.pre = ael ? '' : 'on';
            context.det = ael ? 'DOMContentLoaded' : 'onreadystatechange';
            context.wet = context.pre + 'load';

            var csf = context.handlers.checkState;
            var alreadyLoaded = (
                context.doc.readyState === 'complete' &&
                context.win.location.toString() !== 'about:blank');  // https://code.google.com/p/chromium/issues/detail?id=32357

            if (alreadyLoaded){
                setTimeout(Ink.bind(function () {
                    fn.call(context.win, 'lazy');
                }, this), 0);
            } else {
                context.cbQueue.push(fn);

                context.doc[context.add]( context.det , csf );
                context.win[context.add]( context.wet , csf );

                var frameElement = 1;
                try{
                    frameElement = context.win.frameElement;
                } catch(e) {}
                if ( !ael && context.root && context.root.doScroll ) { // IE HACK
                    try {
                        context.top = !frameElement;
                    } catch(e) { }
                    if (context.top) {
                        this._poll(context);
                    }
                }
            }
        },

        /**
         * Function that will be running the callbacks after the page is loaded
         *
         * @method _checkState
         * @param {Event} event Triggered event
         * @private
         */
        _checkState: function(event, context) {
            if ( !event || (event.type === 'readystatechange' && context.doc.readyState !== 'complete')) {
                return;
            }
            var where = (event.type === 'load') ? context.win : context.doc;
            where[context.rem](context.pre+event.type, context.handlers.checkState, false);
            this._ready(context);
        },

        /**
         * Polls the load progress of the page to see if it has already loaded or not
         *
         * @method _poll
         * @private
         */

        /**
         *
         * function _poll
         */
        _poll: function(context) {
            try {
                context.root.doScroll('left');
            } catch(e) {
                return setTimeout(context.handlers.poll, 50);
            }
            this._ready(context);
        },

        /**
         * Function that runs the callbacks from the queue when the document is ready.
         *
         * @method _ready
         * @private
         */
        _ready: function(context) {
            if (!context.done) {
                context.done = true;
                for (var i = 0; i < context.cbQueue.length; ++i) {
                    context.cbQueue[i].call(context.win);
                }
                context.cbQueue = [];
            }
        }
    };

    return Loaded;

});

/**
 * @module Ink.Dom.Selector_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Dom.Selector', 1, [], function() {
    /*jshint forin:false, eqnull:true, noempty:false, expr:true, boss:true, maxdepth:false*/
	'use strict';

    /**
     * @class Ink.Dom.Selector
     * @static
     * @version 1
     */


/*!
 * Sizzle CSS Selector Engine
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	recompare,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function() { return 0; },

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

/*
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/*
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/*
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/*
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/*
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/*
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementsByName privileges form controls or returns elements by ID
	// If so, assume (for broader support) that getElementById returns elements by name
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		// Support: Windows 8 Native Apps
		// Assigning innerHTML with "name" attributes throws uncatchable exceptions
		// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx
		div.appendChild( document.createElement("a") ).setAttribute( "name", expando );
		div.appendChild( document.createElement("i") ).setAttribute( "name", expando );
		docElem.appendChild( div );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// Support: Webkit<537.32
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		return div1.compareDocumentPosition &&
			// Should return 1, but Webkit returns 4 (following)
			(div1.compareDocumentPosition( document.createElement("div") ) & 1);
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getByName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );

				return m ?
					m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
						[m] :
						undefined :
					[];
			}
		};
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Name
	Expr.find["NAME"] = support.getByName && function( tag, context ) {
		if ( typeof context.getElementsByName !== strundefined ) {
			return context.getElementsByName( name );
		}
	};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(recompare && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	// rbuggyQSA always contains :focus, so no need for an existence check
	if ( support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && !rbuggyQSA.test(expr) ) {
		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	var val;

	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( documentIsHTML ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( !documentIsHTML || support.attributes ) {
		return elem.getAttribute( name );
	}
	return ( (val = elem.getAttributeNode( name )) || elem.getAttribute( name ) ) && elem[ name ] === true ?
		name :
		val && val.specified ? val.value : null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	// Compensate for sort limitations
	recompare = !support.sortDetached;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/*
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns Returns -1 if a precedes b, 1 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && ( ~b.sourceIndex || MAX_NEGATIVE ) - ( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/*
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[4] ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}

			nodeName = nodeName.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector( tokens.slice( 0, i - 1 ) ).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

// Check sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Initialize with the default document
setDocument();

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
support.detectDuplicates = hasDuplicate;

// EXPOSE
/*if ( typeof define === "function" && define.amd ) {
	define(function() { return Sizzle; });
} else {
	window.Sizzle = Sizzle;
}*/
// EXPOSE

/**
 * Alias for the Sizzle selector engine
 *
 * @method select
 * @param {String} selector CSS selector to search for elements
 * @param {DOMElement} [context] By default the search is done in the document element. However, you can specify an element as search context
 * @param {Array} [results] By default this is considered an empty array. But if you want to merge it with other searches you did, pass their result array through here.
 * @param {Object} [seed]
 * @return {Array} Array of resulting DOM Elements
 */

/**
 * Returns elements which match with the second argument to the function.
 *
 * @method matches
 * @param {String} selector CSS selector to search for elements
 * @param {Array} matches Elements to be 'matched' with
 * @return {Array} Elements that matched
 */

/**
 * Returns true iif element matches given selector
 *
 * @method matchesSelector
 * @param {DOMElement} element to test
 * @param {String}     selector CSS selector to test the element with
 * @return {Boolean} true iif element matches the CSS selector
 */

return {
    select:          Sizzle,
    matches:         Sizzle.matches,
    matchesSelector: Sizzle.matchesSelector
};


}); //( window );

/**
 * @module Ink.Util.Array_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Array', '1', [], function() {

    'use strict';

    var arrayProto = Array.prototype;

    /**
     * Utility functions to use with Arrays
     *
     * @class Ink.Util.Array
     * @version 1
     * @static
     */
    var InkArray = {

        /**
         * Checks if value exists in array
         *
         * @method inArray
         * @param {Mixed} value
         * @param {Array} arr
         * @return {Boolean}    True if value exists in the array
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3' ];
         *         if( InkArray.inArray( 'value2', testArray ) === true ){
         *             console.log( "Yep it's in the array." );
         *         } else {
         *             console.log( "No it's NOT in the array." );
         *         }
         *     });
         */
        inArray: function(value, arr) {
            if (typeof arr === 'object') {
                for (var i = 0, f = arr.length; i < f; ++i) {
                    if (arr[i] === value) {
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * Sorts an array of object by an object property
         *
         * @method sortMulti
         * @param {Array} arr array of objects to sort
         * @param {String} key property to sort by
         * @return {Array|Boolean} False if it's not an array, returns a sorted array if it's an array.
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [
         *             { 'myKey': 'value1' },
         *             { 'myKey': 'value2' },
         *             { 'myKey': 'value3' }
         *         ];
         *
         *         InkArray.sortMulti( testArray, 'myKey' );
         *     });
         */
        sortMulti: function(arr, key) {
            if (typeof arr === 'undefined' || arr.constructor !== Array) { return false; }
            if (typeof key !== 'string') { return arr.sort(); }
            if (arr.length > 0) {
                if (typeof(arr[0][key]) === 'undefined') { return false; }
                arr.sort(function(a, b){
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }
            return arr;
        },

        /**
         * Returns the associated key of an array value
         *
         * @method keyValue
         * @param {String} value Value to search for
         * @param {Array} arr Array where the search will run
         * @param {Boolean} [first] Flag that determines if the search stops at first occurrence. It also returns an index number instead of an array of indexes.
         * @return {Boolean|Number|Array} False if not exists | number if exists and 3rd input param is true | array if exists and 3rd input param is not set or it is !== true
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value2' ];
         *         console.log( InkArray.keyValue( 'value2', testArray, true ) ); // Result: 1
         *         console.log( InkArray.keyValue( 'value2', testArray ) ); // Result: [1, 3]
         *     });
         */
        keyValue: function(value, arr, first) {
            if (typeof value !== 'undefined' && typeof arr === 'object' && this.inArray(value, arr)) {
                var aKeys = [];
                for (var i = 0, f = arr.length; i < f; ++i) {
                    if (arr[i] === value) {
                        if (typeof first !== 'undefined' && first === true) {
                            return i;
                        } else {
                            aKeys.push(i);
                        }
                    }
                }
                return aKeys;
            }
            return false;
        },

        /**
         * Returns the array shuffled, false if the param is not an array
         *
         * @method shuffle
         * @param {Array} arr Array to shuffle
         * @return {Boolean|Number|Array} False if not an array | Array shuffled
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value2' ];
         *         console.log( InkArray.shuffle( testArray ) ); // Result example: [ 'value3', 'value2', 'value2', 'value1' ]
         *     });
         */
        shuffle: function(arr) {
            if (typeof(arr) !== 'undefined' && arr.constructor !== Array) { return false; }
            var total   = arr.length,
                tmp1    = false,
                rnd     = false;

            while (total--) {
                rnd        = Math.floor(Math.random() * (total + 1));
                tmp1       = arr[total];
                arr[total] = arr[rnd];
                arr[rnd]   = tmp1;
            }
            return arr;
        },

        /**
         * Runs a function through each of the elements of an array
         *
         * @method forEach
         * @param {Array} arr Array to be cycled/iterated
         * @param {Function} cb The function receives as arguments the value, index and array.
         * @return {Array} Array iterated.
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value2' ];
         *         InkArray.forEach( testArray, function( value, index, arr ){
         *             console.log( 'The value is: ' + value + ' | The index is: ' + index );
         *         });
         *     });
         */
        forEach: function(array, callback, context) {
            if (arrayProto.forEach) {
                return arrayProto.forEach.call(array, callback, context);
            }
            for (var i = 0, len = array.length >>> 0; i < len; i++) {
                callback.call(context, array[i], i, array);
            }
        },

        /**
         * Alias for backwards compatibility. See forEach
         *
         * @method forEach
         */
        each: function () {
            InkArray.forEach.apply(InkArray, [].slice.call(arguments));
        },

        /**
         * Run a `map` function for each item in the array. The function will receive each item as argument and its return value will change the corresponding array item.
         * @method map
         * @param {Array} array     The array to map over
         * @param {Function} map    The map function. Will take `(item, index, array)` and `this` will be the `context` argument.
         * @param {Object} [context]    Object to be `this` in the map function.
         *
         * @example
         *      InkArray.map([1, 2, 3, 4], function (item) {
         *          return item + 1;
         *      }); // -> [2, 3, 4, 5]
         */
        map: function (array, callback, context) {
            if (arrayProto.map) {
                return arrayProto.map.call(array, callback, context);
            }
            var mapped = new Array(len);
            for (var i = 0, len = array.length >>> 0; i < len; i++) {
                mapped[i] = callback.call(context, array[i], i, array);
            }
            return mapped;
        },

        /**
         * Run a test function through all the input array. Items which pass the test function (for which the test function returned `true`) are kept in the array. Other items are removed.
         * @param {Array} array
         * @param {Function} test       A test function taking `(item, index, array)`
         * @param {Object} [context]    Object to be `this` in the test function.
         * @return filtered array
         *
         * @example
         *      InkArray.filter([1, 2, 3, 4, 5], function (val) {
         *          return val > 2;
         *      })  // -> [3, 4, 5]
         */
        filter: function (array, test, context) {
            if (arrayProto.filter) {
                return arrayProto.filter.call(array, test, context);
            }
            var filtered = [],
                val = null;
            for (var i = 0, len = array.length; i < len; i++) {
                val = array[i]; // it might be mutated
                if (test.call(context, val, i, array)) {
                    filtered.push(val);
                }
            }
            return filtered;
        },

        /**
         * Runs a callback function, which should return true or false.
         * If one of the 'runs' returns true, it will return. Otherwise if none returns true, it will return false.
         * See more at: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some (MDN)
         *
         * @method some
         * @param {Array} arr The array you walk to iterate through
         * @param {Function} cb The callback that will be called on the array's elements. It receives the value, the index and the array as arguments.
         * @param {Object} Context object of the callback function
         * @return {Boolean} True if the callback returns true at any point, false otherwise
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray1 = [ 10, 20, 50, 100, 30 ];
         *         var testArray2 = [ 1, 2, 3, 4, 5 ];
         *
         *         function myTestFunction( value, index, arr ){
         *             if( value > 90 ){
         *                 return true;
         *             }
         *             return false;
         *         }
         *         console.log( InkArray.some( testArray1, myTestFunction, null ) ); // Result: true
         *         console.log( InkArray.some( testArray2, myTestFunction, null ) ); // Result: false
         *     });
         */
        some: function(arr, cb, context){

            if (arr === null){
                throw new TypeError('First argument is invalid.');
            }

            var t = Object(arr);
            var len = t.length >>> 0;
            if (typeof cb !== "function"){ throw new TypeError('Second argument must be a function.'); }

            for (var i = 0; i < len; i++) {
                if (i in t && cb.call(context, t[i], i, t)){ return true; }
            }

            return false;
        },

        /**
         * Returns an array containing every item that is shared between the two given arrays
         *
         * @method intersect
         * @param {Array} arr Array1 to be intersected with Array2
         * @param {Array} arr Array2 to be intersected with Array1
         * @return {Array} Empty array if one of the arrays is false (or do not intersect) | Array with the intersected values
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray1 = [ 'value1', 'value2', 'value3' ];
         *         var testArray2 = [ 'value2', 'value3', 'value4', 'value5', 'value6' ];
         *         console.log( InkArray.intersect( testArray1,testArray2 ) ); // Result: [ 'value2', 'value3' ]
         *     });
         */
        intersect: function(arr1, arr2) {
            if (!arr1 || !arr2 || arr1 instanceof Array === false || arr2 instanceof Array === false) {
                return [];
            }

            var shared = [];
            for (var i = 0, I = arr1.length; i<I; ++i) {
                for (var j = 0, J = arr2.length; j < J; ++j) {
                    if (arr1[i] === arr2[j]) {
                        shared.push(arr1[i]);
                    }
                }
            }

            return shared;
        },

        /**
         * Convert lists type to type array
         *
         * @method convert
         * @param {Array} arr Array to be converted
         * @return {Array} Array resulting of the conversion
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2' ];
         *         testArray.myMethod = function(){
         *             console.log('stuff');
         *         }
         *
         *         console.log( InkArray.convert( testArray ) ); // Result: [ 'value1', 'value2' ]
         *     });
         */
        convert: function(arr) {
            return arrayProto.slice.call(arr || [], 0);
        },

        /**
         * Insert value into the array on specified idx
         *
         * @method insert
         * @param {Array} arr Array where the value will be inserted
         * @param {Number} idx Index of the array where the value should be inserted
         * @param {Mixed} value Value to be inserted
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2' ];
         *         console.log( InkArray.insert( testArray, 1, 'value3' ) ); // Result: [ 'value1', 'value3', 'value2' ]
         *     });
         */
        insert: function(arr, idx, value) {
            arr.splice(idx, 0, value);
        },

        /**
         * Remove a range of values from the array
         *
         * @method remove
         * @param {Array} arr Array where the value will be inserted
         * @param {Number} from Index of the array where the removal will start removing.
         * @param {Number} rLen Number of items to be removed from the index onwards.
         * @return {Array} An array with the remaining values
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Array_1'], function( InkArray ){
         *         var testArray = [ 'value1', 'value2', 'value3', 'value4', 'value5' ];
         *         console.log( InkArray.remove( testArray, 1, 3 ) ); // Result: [ 'value1', 'value4', 'value5' ]
         *     });
         */
        remove: function(arr, from, rLen){
            var output = [];

            for(var i = 0, iLen = arr.length; i < iLen; i++){
                if(i >= from && i < from + rLen){
                    continue;
                }

                output.push(arr[i]);
            }

            return output;
        }
    };

    return InkArray;

});



/**
 * @module Ink.Util.BinPack_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.BinPack', '1', [], function() {

    'use strict';

    /*jshint boss:true */

    // https://github.com/jakesgordon/bin-packing/

    /*
        Copyright (c) 2011, 2012, 2013 Jake Gordon and contributors

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
    */



    var Packer = function(w, h) {
        this.init(w, h);
    };

    Packer.prototype = {

        init: function(w, h) {
            this.root = { x: 0, y: 0, w: w, h: h };
        },

        fit: function(blocks) {
            var n, node, block;
            for (n = 0; n < blocks.length; ++n) {
                block = blocks[n];
                if (node = this.findNode(this.root, block.w, block.h)) {
                    block.fit = this.splitNode(node, block.w, block.h);
                }
            }
        },

        findNode: function(root, w, h) {
            if (root.used) {
                return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
            }
            else if ((w <= root.w) && (h <= root.h)) {
                return root;
            }
            else {
                return null;
            }
        },

        splitNode: function(node, w, h) {
            node.used = true;
            node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
            node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
            return node;
        }

    };



    var GrowingPacker = function() {};

    GrowingPacker.prototype = {

        fit: function(blocks) {
            var n, node, block, len = blocks.length;
            var w = len > 0 ? blocks[0].w : 0;
            var h = len > 0 ? blocks[0].h : 0;
            this.root = { x: 0, y: 0, w: w, h: h };
            for (n = 0; n < len ; n++) {
                block = blocks[n];
                if (node = this.findNode(this.root, block.w, block.h)) {
                    block.fit = this.splitNode(node, block.w, block.h);
                }
                else {
                    block.fit = this.growNode(block.w, block.h);
                }
            }
        },

        findNode: function(root, w, h) {
            if (root.used) {
                return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
            }
            else if ((w <= root.w) && (h <= root.h)) {
                return root;
            }
            else {
                return null;
            }
        },

        splitNode: function(node, w, h) {
            node.used = true;
            node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
            node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
            return node;
        },

        growNode: function(w, h) {
            var canGrowDown  = (w <= this.root.w);
            var canGrowRight = (h <= this.root.h);

            var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
            var shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

            if (shouldGrowRight) {
                return this.growRight(w, h);
            }
            else if (shouldGrowDown) {
                return this.growDown(w, h);
            }
            else if (canGrowRight) {
                return this.growRight(w, h);
            }
            else if (canGrowDown) {
                return this.growDown(w, h);
            }
            else {
                return null; // need to ensure sensible root starting size to avoid this happening
            }
        },

        growRight: function(w, h) {
            this.root = {
                used: true,
                x: 0,
                y: 0,
                w: this.root.w + w,
                h: this.root.h,
                down: this.root,
                right: { x: this.root.w, y: 0, w: w, h: this.root.h }
            };
            var node;
            if (node = this.findNode(this.root, w, h)) {
                return this.splitNode(node, w, h);
            }
            else {
                return null;
            }
        },

        growDown: function(w, h) {
            this.root = {
                used: true,
                x: 0,
                y: 0,
                w: this.root.w,
                h: this.root.h + h,
                down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
                right: this.root
            };
            var node;
            if (node = this.findNode(this.root, w, h)) {
                return this.splitNode(node, w, h);
            }
            else {
                return null;
            }
        }

    };



    var sorts = {
        random:  function() { return Math.random() - 0.5; },
        w:       function(a, b) { return b.w - a.w; },
        h:       function(a, b) { return b.h - a.h; },
        a:       function(a, b) { return b.area - a.area; },
        max:     function(a, b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h); },
        min:     function(a, b) { return Math.min(b.w, b.h) - Math.min(a.w, a.h); },
        height:  function(a, b) { return sorts.msort(a, b, ['h', 'w']);               },
        width:   function(a, b) { return sorts.msort(a, b, ['w', 'h']);               },
        area:    function(a, b) { return sorts.msort(a, b, ['a', 'h', 'w']);          },
        maxside: function(a, b) { return sorts.msort(a, b, ['max', 'min', 'h', 'w']); },
        msort:   function(a, b, criteria) { /* sort by multiple criteria */
            var diff, n;
            for (n = 0; n < criteria.length; ++n) {
                diff = sorts[ criteria[n] ](a, b);
                if (diff !== 0) {
                    return diff;
                }
            }
            return 0;
        }
    };



    // end of Jake's code



    // aux, used to display blocks in unfitted property
    var toString = function() {
      return [this.w, ' x ', this.h].join('');
    };



    /**
     * Binary Packing algorithm implementation
     *
     * Based on the work of Jake Gordon
     *
     * see https://github.com/jakesgordon/bin-packing/
     *
     * @class Ink.Util.BinPack
     * @version 1
     * @static
     */
    var BinPack = {

        /**
        * @method binPack
        * @param {Object}      o              options
        * @param {Object[]}    o.blocks       array of items with w and h integer attributes.
        * @param {Number[2]}  [o.dimensions]  if passed, container has fixed dimensions
        * @param {String}     [o.sorter]      sorter function. one of: random, height, width, area, maxside
        * @return {Object}
        *     * {Number[2]} dimensions - resulted container size,
        *     * {Number}    filled     - filled ratio,
        *     * {Object[]}  fitted,
        *     * {Object[]}  unfitted,
        *     * {Object[]}  blocks
        * @static
        */
        binPack: function(o) {
            var i, f, bl;



            // calculate area if not there already
            for (i = 0, f = o.blocks.length; i < f; ++i) {
                bl = o.blocks[i];
                if (! ('area' in bl) ) {
                    bl.area = bl.w * bl.h;
                }
            }



            // apply algorithm
            var packer = o.dimensions ? new Packer(o.dimensions[0], o.dimensions[1]) : new GrowingPacker();

            if (!o.sorter) { o.sorter = 'maxside'; }

            o.blocks.sort( sorts[ o.sorter ] );

            packer.fit(o.blocks);

            var dims2 = [packer.root.w, packer.root.h];



            // layout is done here, generating report data...
            var fitted   = [];
            var unfitted = [];

            for (i = 0, f = o.blocks.length; i < f; ++i) {
                bl = o.blocks[i];
                if (bl.fit) {
                    fitted.push(bl);
                }
                else {
                    bl.toString = toString; // TO AID SERIALIZATION
                    unfitted.push(bl);
                }
            }

            var area = dims2[0] * dims2[1];
            var fit = 0;
            for (i = 0, f = fitted.length; i < f; ++i) {
                bl = fitted[i];
                fit += bl.area;
            }

            return {
                dimensions: dims2,
                filled:     fit / area,
                blocks:     o.blocks,
                fitted:     fitted,
                unfitted:   unfitted
            };
        }
    };



    return BinPack;

});

/**
 * @module Ink.Util.Cookie_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Cookie', '1', [], function() {

    'use strict';

    /**
     * Utilities for Cookie handling
     *
     * @class Ink.Util.Cookie
     * @version 1
     * @static
     */
    var Cookie = {

        /**
         * Gets an object with current page cookies
         *
         * @method get
         * @param {String} name
         * @return {String|Object} If the name is specified, it returns the value related to that property. Otherwise it returns the full cookie object
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Cookie_1'], function( InkCookie ){
         *         var myCookieValue = InkCookie.get('someVarThere');
         *         console.log( myCookieValue ); // This will output the value of the cookie 'someVarThere', from the cookie object.
         *     });
         */
        get: function(name)
        {
            var cookie = document.cookie || false;

            var _Cookie = {};
            if(cookie) {
                cookie = cookie.replace(new RegExp("; ", "g"), ';');
                var aCookie = cookie.split(';');
                var aItem = [];
                if(aCookie.length > 0) {
                    for(var i=0; i < aCookie.length; i++) {
                        aItem = aCookie[i].split('=');
                        if(aItem.length === 2) {
                            _Cookie[aItem[0]] = decodeURIComponent(aItem[1]);
                        }
                        aItem = [];
                    }
                }
            }
            if(name) {
                if(typeof(_Cookie[name]) !== 'undefined') {
                    return _Cookie[name];
                } else {
                    return null;
                }
            }
            return _Cookie;
        },

        /**
         * Sets a cookie
         *
         * @method set
         * @param {String} name Cookie name
         * @param {String} value Cookie value
         * @param {Number} [expires] Number to add to current Date in seconds
         * @param {String} [path] Path to sets cookie (default '/')
         * @param {String} [domain] Domain to sets cookie (default current hostname)
         * @param {Boolean} [secure] True if wants secure, default 'false'
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Cookie_1'], function( InkCookie ){
         *         var expireDate = new Date( 2014,00,01, 0,0,0);
         *         InkCookie.set( 'someVarThere', 'anyValueHere', expireDate.getTime() );
         *     });
         */
        set: function(name, value, expires, path, domain, secure)
        {
            var sName;
            if(!name || value===false || typeof(name) === 'undefined' || typeof(value) === 'undefined') {
                return false;
            } else {
                sName = name+'='+encodeURIComponent(value);
            }
            var sExpires = false;
            var sPath = false;
            var sDomain = false;
            var sSecure = false;

            if(expires && typeof(expires) !== 'undefined' && !isNaN(expires)) {
                var oDate = new Date();
                var sDate = (parseInt(Number(oDate.valueOf()), 10) + (Number(parseInt(expires, 10)) * 1000));

                var nDate = new Date(sDate);
                var expiresString = nDate.toGMTString();

                var re = new RegExp("([^\\s]+)(\\s\\d\\d)\\s(\\w\\w\\w)\\s(.*)");
                expiresString = expiresString.replace(re, "$1$2-$3-$4");

                sExpires = 'expires='+expiresString;
            } else {
                if(typeof(expires) !== 'undefined' && !isNaN(expires) && Number(parseInt(expires, 10))===0) {
                    sExpires = '';
                } else {
                    sExpires = 'expires=Thu, 01-Jan-2037 00:00:01 GMT';
                }
            }

            if(path && typeof(path) !== 'undefined') {
                sPath = 'path='+path;
            } else {
                sPath = 'path=/';
            }

            if(domain && typeof(domain) !== 'undefined') {
                sDomain = 'domain='+domain;
            } else {
                var portClean = new RegExp(":(.*)");
                sDomain = 'domain='+window.location.host;
                sDomain = sDomain.replace(portClean,"");
            }

            if(secure && typeof(secure) !== 'undefined') {
                sSecure = secure;
            } else {
                sSecure = false;
            }

            document.cookie = sName+'; '+sExpires+'; '+sPath+'; '+sDomain+'; '+sSecure;
        },

        /**
         * Delete a cookie
         *
         * @method remove
         * @param {String} cookieName Cookie name
         * @param {String} [path] Path of the cookie (default '/')
         * @param {String} [domain] Domain of the cookie (default current hostname)
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Cookie_1'], function( InkCookie ){
         *         InkCookie.remove( 'someVarThere' );
         *     });
         */
        remove: function(cookieName, path, domain)
        {
            //var expiresDate = 'Thu, 01-Jan-1970 00:00:01 GMT';
            var sPath = false;
            var sDomain = false;
            var expiresDate = -999999999;

            if(path && typeof(path) !== 'undefined') {
                sPath = path;
            } else {
                sPath = '/';
            }

            if(domain && typeof(domain) !== 'undefined') {
                sDomain = domain;
            } else {
                sDomain = window.location.host;
            }

            this.set(cookieName, 'deleted', expiresDate, sPath, sDomain);
        }
    };

    return Cookie;

});

/**
 * @module Ink.Util.Date_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Date', '1', [], function() {

    'use strict';

    /**
     * Class to provide the same features that php date does
     *
     * @class Ink.Util.Date
     * @version 1
     * @static
     */
    var InkDate = {

        /**
         * Function that returns the string representation of the month [PT only]
         *
         * @method _months
         * @param {Number} index Month javascript (0 to 11)
         * @return {String} The month's name
         * @private
         * @static
         * @example
         *     console.log( InkDate._months(0) ); // Result: Janeiro
         */
        _months: function(index){
            var _m = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            return _m[index];
        },

        /**
         * Function that returns the month [PT only] ( 0 to 11 )
         *
         * @method _iMonth
         * @param {String} month Month javascript (0 to 11)
         * @return {Number} The month's number
         * @private
         * @static
         * @example
         *     console.log( InkDate._iMonth('maio') ); // Result: 4
         */
        _iMonth : function( month )
        {
            if ( Number( month ) ) { return +month - 1; }
            return {
                'janeiro'   : 0  ,
                'jan'       : 0  ,
                'fevereiro' : 1  ,
                'fev'       : 1  ,
                'março'     : 2  ,
                'mar'       : 2  ,
                'abril'     : 3  ,
                'abr'       : 3  ,
                'maio'      : 4  ,
                'mai'       : 4  ,
                'junho'     : 5  ,
                'jun'       : 5  ,
                'julho'     : 6  ,
                'jul'       : 6  ,
                'agosto'    : 7  ,
                'ago'       : 7  ,
                'setembro'  : 8  ,
                'set'       : 8  ,
                'outubro'   : 9  ,
                'out'       : 9  ,
                'novembro'  : 10 ,
                'nov'       : 10 ,
                'dezembro'  : 11 ,
                'dez'       : 11
            }[ month.toLowerCase( ) ];
        } ,

        /**
         * Function that returns the representation the day of the week [PT Only]
         *
         * @method _wDays
         * @param {Number} index Week's day index
         * @return {String} The week's day name
         * @private
         * @static
         * @example
         *     console.log( InkDate._wDays(0) ); // Result: Domingo
         */
        _wDays: function(index){
            var _d = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
            return _d[index];
        },

        /**
         * Function that returns day of the week in javascript 1 to 7
         *
         * @method _iWeek
         * @param {String} week Week's day name
         * @return {Number} The week's day index
         * @private
         * @static
         * @example
         *     console.log( InkDate._iWeek('quarta') ); // Result: 3
         */
        _iWeek: function( week )
        {
            if ( Number( week ) ) { return +week || 7; }
            return {
                'segunda' : 1  ,
                'seg'     : 1  ,
                'terça'   : 2  ,
                'ter'     : 2  ,
                'quarta'  : 3  ,
                'qua'     : 3  ,
                'quinta'  : 4  ,
                'qui'     : 4  ,
                'sexta'   : 5  ,
                'sex'     : 5  ,
                'sábado'  : 6  ,
                'sáb'     : 6  ,
                'domingo' : 7  ,
                'dom'     : 7
            }[ week.toLowerCase( ) ];
        },

        /**
         * Function that returns the number of days of a given month (m) on a given year (y)
         *
         * @method _daysInMonth
         * @param {Number} _m Month
         * @param {Number} _y Year
         * @return {Number} Number of days of a give month on a given year
         * @private
         * @static
         * @example
         *     console.log( InkDate._daysInMonth(2,2013) ); // Result: 28
         */
        _daysInMonth: function(_m,_y){
            var nDays;

            if(_m===1 || _m===3 || _m===5 || _m===7 || _m===8 || _m===10 || _m===12)
            {
                nDays= 31;
            }
            else if ( _m===4 || _m===6 || _m===9 || _m===11)
            {
                nDays = 30;
            }
            else
            {
                if((_y%400===0) || (_y%4===0 && _y%100!==0))
                {
                    nDays = 29;
                }
                else
                {
                    nDays = 28;
                }
            }
            return nDays;
        },

        /**
         * Function that works exactly as php date() function
         * Works like PHP 5.2.2 <a href="http://php.net/manual/en/function.date.php" target="_blank">PHP Date function</a>
         *
         * @method get
         * @param {String}        format - as the string in which the date it will be formatted - mandatory
         * @param {Date} [_date] - the date to format. If undefined it will do it on now() date. Can receive unix timestamp or a date object
         * @return {String} Formatted date
         * @public
         * @static
         * @example
         *     <script>
         *         Ink.requireModules( ['Ink.Util.Date_1'], function( InkDate ){
         *             console.log( InkDate.get('Y-m-d') ); // Result (at the time of writing): 2013-05-07
         *         });
         *     </script>
         */
        get: function(format, _date){
            /*jshint maxcomplexity:65 */
            if(typeof(format) === 'undefined' || format === ''){
                format = "Y-m-d";
            }


            var iFormat = format.split("");
            var result = new Array(iFormat.length);
            var escapeChar = "\\";
            var jsDate;

        if (typeof(_date) === 'undefined'){
            jsDate = new Date();
        } else if (typeof(_date)==='number'){
            jsDate = new Date(_date*1000);
        } else {
            jsDate = new Date(_date);
        }

        var jsFirstDay, jsThisDay, jsHour;
        /* This switch is presented in the same order as in php date function (PHP 5.2.2) */
        for (var i = 0; i < iFormat.length; i++) {
           switch(iFormat[i]) {
                case escapeChar:
                    result[i] = iFormat[i+1];
                    i++;
                    break;


                /* DAY */
                case "d":   /* Day of the month, 2 digits with leading zeros; ex: 01 to 31  */
                    var jsDay = jsDate.getDate();
                    result[i] = (String(jsDay).length > 1) ? jsDay : "0" + jsDay;
                    break;

                case "D":   /* A textual representation of a day, three letters; Seg to Dom */
                    result[i] = this._wDays(jsDate.getDay()).substring(0, 3);
                    break;

                case "j":  /* Day of the month without leading zeros; ex: 1 to 31  */
                    result[i] = jsDate.getDate();
                    break;

                case "l":   /* A full textual representation of the day of the week; Domingo to Sabado  */
                    result[i] = this._wDays(jsDate.getDay());
                    break;

                case "N":  /* ISO-8601 numeric representation of the day of the week; 1 (Segunda) to 7 (Domingo)  */
                    result[i] = jsDate.getDay() || 7;
                    break;

                case "S":  /* English ordinal suffix for the day of the month, 2 characters; st, nd, rd or th. Works well with j */
                    var temp     = jsDate.getDate();
                    var suffixes = ["st", "nd", "rd"];
                    var suffix   = "";

                    if (temp >= 11 && temp <= 13) {
                        result[i] = "th";
                    } else {
                        result[i]  = (suffix = suffixes[String(temp).substr(-1) - 1]) ? (suffix) : ("th");
                    }
                    break;

                case "w":    /* Numeric representation of the day of the week; 0 (for Sunday) through 6 (for Saturday) */
                    result[i] = jsDate.getDay();
                    break;

                case "z":    /* The day of the year (starting from 0); 0 to 365 */
                    jsFirstDay = Date.UTC(jsDate.getFullYear(), 0, 0);
                    jsThisDay = Date.UTC(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate());
                    result[i] = Math.floor((jsThisDay - jsFirstDay) / (1000 * 60 * 60 * 24));
                    break;

                /* WEEK */
                case "W":    /* ISO-8601 week number of year, weeks starting on Monday; ex: 42 (the 42nd week in the year)  */
                    var jsYearStart = new Date( jsDate.getFullYear( ) , 0 , 1 );
                    jsFirstDay = jsYearStart.getDay() || 7;

                    var days = Math.floor( ( jsDate - jsYearStart ) / ( 24 * 60 * 60 * 1000 ) + 1 );

                    result[ i ] = Math.ceil( ( days - ( 8 - jsFirstDay ) ) / 7 ) + 1;
                    break;


                /* MONTH */
                case "F":   /* A full textual representation of a month, such as Janeiro or Marco; Janeiro a Dezembro */
                    result[i] = this._months(jsDate.getMonth());
                    break;

                case "m":   /* Numeric representation of a month, with leading zeros; 01 to 12  */
                    var jsMonth = String(jsDate.getMonth() + 1);
                    result[i] = (jsMonth.length > 1) ? jsMonth : "0" + jsMonth;
                    break;

                case "M":   /* A short textual representation of a month, three letters; Jan a Dez */
                    result[i] = this._months(jsDate.getMonth()).substring(0,3);
                    break;

                case "n":   /* Numeric representation of a month, without leading zeros; 1 a 12  */
                    result[i] = jsDate.getMonth() + 1;
                    break;

                case "t":   /* Number of days in the given month; ex: 28 */
                    result[i] = this._daysInMonth(jsDate.getMonth()+1,jsDate.getYear());
                    break;

                /* YEAR */
                case "L":   /* Whether it's a leap year; 1 if it is a leap year, 0 otherwise.  */
                    var jsYear = jsDate.getFullYear();
                    result[i] = (jsYear % 4) ? false : ( (jsYear % 100) ?  true : ( (jsYear % 400) ? false : true  ) );
                    break;

                case "o":  /* ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.  */
                    throw '"o" not implemented!';

                case "Y":  /* A full numeric representation of a year, 4 digits; 1999  */
                    result[i] = jsDate.getFullYear();
                    break;

                case "y":  /* A two digit representation of a year; 99  */
                    result[i] = String(jsDate.getFullYear()).substring(2);
                    break;

                /* TIME */
                case "a":   /* Lowercase Ante meridiem and Post meridiem; am or pm */
                    result[i] = (jsDate.getHours() < 12) ? "am" : "pm";
                    break;

                case "A":   /* Uppercase Ante meridiem and Post meridiem; AM or PM  */
                    result[i] = (jsDate.getHours < 12) ? "AM" : "PM";
                    break;

                case "B":  /* Swatch Internet time; 000 through 999  */
                    throw '"B" not implemented!';

                case "g":   /* 12-hour format of an hour without leading zeros;  1 to 12 */
                    jsHour = jsDate.getHours();
                    result[i] = (jsHour <= 12) ? jsHour : (jsHour - 12);
                    break;

                case "G":   /* 24-hour format of an hour without leading zeros; 1 to 23 */
                    result[i] = String(jsDate.getHours());
                    break;

                case "h":   /* 12-hour format of an hour with leading zeros; 01 to 12 */
                    jsHour = String(jsDate.getHours());
                    jsHour = (jsHour <= 12) ? jsHour : (jsHour - 12);
                    result[i] = (jsHour.length > 1) ? jsHour : "0" + jsHour;
                    break;

                case "H":   /* 24-hour format of an hour with leading zeros; 01 to 24 */
                    jsHour = String(jsDate.getHours());
                    result[i] = (jsHour.length > 1) ? jsHour : "0" + jsHour;
                    break;

                case "i":   /* Minutes with leading zeros; 00 to 59 */
                    var jsMinute  = String(jsDate.getMinutes());
                    result[i] = (jsMinute.length > 1) ? jsMinute : "0" + jsMinute;
                    break;

                case "s":   /* Seconds with leading zeros; 00 to 59; */
                    var jsSecond  = String(jsDate.getSeconds());
                    result[i]  = (jsSecond.length > 1) ? jsSecond : "0" + jsSecond;
                    break;

                case "u":  /* Microseconds */
                    throw '"u" not implemented!';


                /* TIMEZONE */

                case "e": /* Timezone identifier  */
                    throw '"e" not implemented!';

                case "I":   /*  "1" if Daylight Savings Time, "0" otherwise. Works only on the northern hemisphere */
                    jsFirstDay = new Date(jsDate.getFullYear(), 0, 1);
                    result[i] = (jsDate.getTimezoneOffset() !== jsFirstDay.getTimezoneOffset()) ? (1) : (0);
                    break;

                case "O":  /* Difference to Greenwich time (GMT) in hours */
                    var jsMinZone = jsDate.getTimezoneOffset();
                    var jsMinutes = jsMinZone % 60;
                    jsHour = String(((jsMinZone - jsMinutes) / 60) * -1);

                    if (jsHour.charAt(0) !== "-") {
                        jsHour = "+" + jsHour;
                    }

                    jsHour = (jsHour.length === 3) ? (jsHour) : (jsHour.replace(/([+\-])(\d)/, "$1" + 0 + "$2"));
                    result[i]  = jsHour + jsMinutes + "0";
                    break;

                case "P": /* Difference to Greenwich time (GMT) with colon between hours and minutes */
                    throw '"P" not implemented!';

                case "T": /* Timezone abbreviation */
                    throw '"T" not implemented!';

                case "Z": /* Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. */
                    result[i] = jsDate.getTimezoneOffset() * 60;
                    break;


                /* FULL DATE/TIME  */

                case "c": /* ISO 8601 date */
                    throw '"c" not implemented!';

                case "r": /* RFC 2822 formatted date  */
                    var jsDayName = this._wDays(jsDate.getDay()).substr(0, 3);
                    var jsMonthName = this._months(jsDate.getMonth()).substr(0, 3);
                    result[i] = jsDayName + ", " + jsDate.getDate() + " " + jsMonthName + this.get(" Y H:i:s O",jsDate);
                    break;

                case "U":  /* Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)  */
                    result[i] = Math.floor(jsDate.getTime() / 1000);
                    break;

                default:
                    result[i] = iFormat[i];
            }
        }

        return result.join('');

        },

        /**
         * Functions that works like php date() function but return a date based on the formatted string
         * Works like PHP 5.2.2 <a href="http://php.net/manual/en/function.date.php" target="_blank">PHP Date function</a>
         *
         * @method set
         * @param {String} [format] As the string in which the date it will be formatted. By default is 'Y-m-d'
         * @param {String} str_date The date formatted - Mandatory.
         * @return {Date} Date object based on the formatted date
         * @public
         * @static
         */
        set : function( format , str_date ) {
            if ( typeof str_date === 'undefined' ) { return ; }
            if ( typeof format === 'undefined' || format === '' ) { format = "Y-m-d"; }

            var iFormat = format.split("");
            var result = new Array( iFormat.length );
            var escapeChar = "\\";
            var mList;

            var objIndex = {
                year  : undefined ,
                month : undefined ,
                day   : undefined ,
                dayY  : undefined ,
                dayW  : undefined ,
                week  : undefined ,
                hour  : undefined ,
                hourD : undefined ,
                min   : undefined ,
                sec   : undefined ,
                msec  : undefined ,
                ampm  : undefined ,
                diffM : undefined ,
                diffH : undefined ,
                date  : undefined
            };

            var matches = 0;

            /* This switch is presented in the same order as in php date function (PHP 5.2.2) */
            for ( var i = 0; i < iFormat.length; i++) {
                switch( iFormat[ i ] ) {
                    case escapeChar:
                        result[i]      = iFormat[ i + 1 ];
                        i++;
                        break;

                    /* DAY */
                    case "d":   /* Day of the month, 2 digits with leading zeros; ex: 01 to 31  */
                        result[ i ]    = '(\\d{2})';
                        objIndex.day   = { original : i , match : matches++ };
                        break;

                    case "j":  /* Day of the month without leading zeros; ex: 1 to 31  */
                        result[ i ]    = '(\\d{1,2})';
                        objIndex.day   = { original : i , match : matches++ };
                        break;

                    case "D":   /* A textual representation of a day, three letters; Seg to Dom */
                        result[ i ]    = '([\\wá]{3})';
                        objIndex.dayW  = { original : i , match : matches++ };
                        break;

                    case "l":   /* A full textual representation of the day of the week; Domingo to Sabado  */
                        result[i]      = '([\\wá]{5,7})';
                        objIndex.dayW  = { original : i , match : matches++ };
                        break;

                    case "N":  /* ISO-8601 numeric representation of the day of the week; 1 (Segunda) to 7 (Domingo)  */
                        result[ i ]    = '(\\d)';
                        objIndex.dayW  = { original : i , match : matches++ };
                        break;

                    case "w":    /* Numeric representation of the day of the week; 0 (for Sunday) through 6 (for Saturday) */
                        result[ i ]    = '(\\d)';
                        objIndex.dayW  = { original : i , match : matches++ };
                        break;

                    case "S":  /* English ordinal suffix for the day of the month, 2 characters; st, nd, rd or th. Works well with j */
                        result[ i ]    = '\\w{2}';
                        break;

                    case "z":    /* The day of the year (starting from 0); 0 to 365 */
                        result[ i ]    = '(\\d{1,3})';
                        objIndex.dayY  = { original : i , match : matches++ };
                        break;

                    /* WEEK */
                    case "W":    /* ISO-8601 week number of year, weeks starting on Monday; ex: 42 (the 42nd week in the year)  */
                        result[ i ]    = '(\\d{1,2})';
                        objIndex.week  = { original : i , match : matches++ };
                        break;

                    /* MONTH */
                    case "F":   /* A full textual representation of a month, such as Janeiro or Marco; Janeiro a Dezembro */
                        result[ i ]    = '([\\wç]{4,9})';
                        objIndex.month = { original : i , match : matches++ };
                        break;

                    case "M":   /* A short textual representation of a month, three letters; Jan a Dez */
                        result[ i ]    = '(\\w{3})';
                        objIndex.month = { original : i , match : matches++ };
                        break;

                    case "m":   /* Numeric representation of a month, with leading zeros; 01 to 12  */
                        result[ i ]    = '(\\d{2})';
                        objIndex.month = { original : i , match : matches++ };
                        break;

                    case "n":   /* Numeric representation of a month, without leading zeros; 1 a 12  */
                        result[ i ]    = '(\\d{1,2})';
                        objIndex.month = { original : i , match : matches++ };
                        break;

                    case "t":   /* Number of days in the given month; ex: 28 */
                        result[ i ]    = '\\d{2}';
                        break;

                    /* YEAR */
                    case "L":   /* Whether it's a leap year; 1 if it is a leap year, 0 otherwise.  */
                        result[ i ]    = '\\w{4,5}';
                        break;

                    case "o":  /* ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.  */
                        throw '"o" not implemented!';

                    case "Y":  /* A full numeric representation of a year, 4 digits; 1999  */
                        result[ i ]    = '(\\d{4})';
                        objIndex.year  = { original : i , match : matches++ };
                        break;

                    case "y":  /* A two digit representation of a year; 99  */
                        result[ i ]    = '(\\d{2})';
                        if ( typeof objIndex.year === 'undefined' || iFormat[ objIndex.year.original ] !== 'Y' ) {
                            objIndex.year = { original : i , match : matches++ };
                        }
                        break;

                    /* TIME */
                    case "a":   /* Lowercase Ante meridiem and Post meridiem; am or pm */
                        result[ i ]    = '(am|pm)';
                        objIndex.ampm  = { original : i , match : matches++ };
                        break;

                    case "A":   /* Uppercase Ante meridiem and Post meridiem; AM or PM  */
                        result[ i ]    = '(AM|PM)';
                        objIndex.ampm  = { original : i , match : matches++ };
                        break;

                    case "B":  /* Swatch Internet time; 000 through 999  */
                        throw '"B" not implemented!';

                    case "g":   /* 12-hour format of an hour without leading zeros;  1 to 12 */
                        result[ i ]    = '(\\d{1,2})';
                        objIndex.hourD = { original : i , match : matches++ };
                        break;

                    case "G":   /* 24-hour format of an hour without leading zeros; 1 to 23 */
                        result[ i ]    = '(\\d{1,2})';
                        objIndex.hour  = { original : i , match : matches++ };
                        break;

                    case "h":   /* 12-hour format of an hour with leading zeros; 01 to 12 */
                        result[ i ]    = '(\\d{2})';
                        objIndex.hourD = { original : i , match : matches++ };
                        break;

                    case "H":   /* 24-hour format of an hour with leading zeros; 01 to 24 */
                        result[ i ]    = '(\\d{2})';
                        objIndex.hour  = { original : i , match : matches++ };
                        break;

                    case "i":   /* Minutes with leading zeros; 00 to 59 */
                        result[ i ]    = '(\\d{2})';
                        objIndex.min   = { original : i , match : matches++ };
                        break;

                    case "s":   /* Seconds with leading zeros; 00 to 59; */
                        result[ i ]    = '(\\d{2})';
                        objIndex.sec   = { original : i , match : matches++ };
                        break;

                    case "u":  /* Microseconds */
                        throw '"u" not implemented!';

                    /* TIMEZONE */
                    case "e": /* Timezone identifier  */
                        throw '"e" not implemented!';

                    case "I":   /*  "1" if Daylight Savings Time, "0" otherwise. Works only on the northern hemisphere */
                        result[i]      = '\\d';
                        break;

                    case "O":  /* Difference to Greenwich time (GMT) in hours */
                        result[ i ]    = '([-+]\\d{4})';
                        objIndex.diffH = { original : i , match : matches++ };
                        break;

                    case "P": /* Difference to Greenwich time (GMT) with colon between hours and minutes */
                        throw '"P" not implemented!';

                    case "T": /* Timezone abbreviation */
                        throw '"T" not implemented!';

                    case "Z": /* Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. */
                        result[ i ]    = '(\\-?\\d{1,5})';
                        objIndex.diffM = { original : i , match : matches++ };
                        break;

                    /* FULL DATE/TIME  */
                    case "c": /* ISO 8601 date */
                        throw '"c" not implemented!';

                    case "r": /* RFC 2822 formatted date  */
                        result[ i ]    = '([\\wá]{3}, \\d{1,2} \\w{3} \\d{4} \\d{2}:\\d{2}:\\d{2} [+\\-]\\d{4})';
                        objIndex.date  = { original : i , match : matches++ };
                        break;

                    case "U":  /* Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)  */
                        result[ i ]    = '(\\d{1,13})';
                        objIndex.date  = { original : i , match : matches++ };
                        break;

                    default:
                        result[ i ]    = iFormat[ i ];
                }
            }

            var pattr = new RegExp( result.join('') );

            try {
                mList = str_date.match( pattr );
                if ( !mList ) { return; }
            }
            catch ( e ) { return ; }

            var _haveDatetime = typeof objIndex.date  !== 'undefined';

            var _haveYear     = typeof objIndex.year  !== 'undefined';

            var _haveYDay     = typeof objIndex.dayY  !== 'undefined';

            var _haveDay      = typeof objIndex.day   !== 'undefined';
            var _haveMonth    = typeof objIndex.month !== 'undefined';
            var _haveMonthDay =  _haveMonth && _haveDay;
            var _haveOnlyDay  = !_haveMonth && _haveDay;

            var _haveWDay     = typeof objIndex.dayW  !== 'undefined';
            var _haveWeek     = typeof objIndex.week  !== 'undefined';
            var _haveWeekWDay =  _haveWeek && _haveWDay;
            var _haveOnlyWDay = !_haveWeek && _haveWDay;

            var _validDate    = _haveYDay || _haveMonthDay || !_haveYear && _haveOnlyDay || _haveWeekWDay || !_haveYear && _haveOnlyWDay;
            var _noDate       = !_haveYear && !_haveYDay && !_haveDay && !_haveMonth && !_haveWDay && !_haveWeek;

            var _haveHour12   = typeof objIndex.hourD !== 'undefined' && typeof objIndex.ampm !== 'undefined';
            var _haveHour24   = typeof objIndex.hour  !== 'undefined';
            var _haveHour     = _haveHour12 || _haveHour24;

            var _haveMin      = typeof objIndex.min   !== 'undefined';
            var _haveSec      = typeof objIndex.sec   !== 'undefined';
            var _haveMSec     = typeof objIndex.msec  !== 'undefined';

            var _haveMoreM    = !_noDate || _haveHour;
            var _haveMoreS    = _haveMoreM || _haveMin;

            var _haveDiffM    = typeof objIndex.diffM !== 'undefined';
            var _haveDiffH    = typeof objIndex.diffH !== 'undefined';
            //var _haveGMT      = _haveDiffM || _haveDiffH;
            var hour;
            var min;

            if ( _haveDatetime ) {
                if ( iFormat[ objIndex.date.original ] === 'U' ) {
                    return new Date( +mList[ objIndex.date.match + 1 ] * 1000 );
                }

                var dList = mList[ objIndex.date.match + 1 ].match( /\w{3}, (\d{1,2}) (\w{3}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) ([+\-]\d{4})/ );
                hour  = +dList[ 4 ] + ( +dList[ 7 ].slice( 0 , 3 ) );
                min   = +dList[ 5 ] + ( dList[ 7 ].slice( 0 , 1 ) + dList[ 7 ].slice( 3 ) ) / 100 * 60;

                return new Date( dList[ 3 ] , this._iMonth( dList[ 2 ] ) , dList[ 1 ] , hour  , min , dList[ 6 ] );
            }

            var _d = new Date( );
            var year;
            var month;
            var day;
            var sec;
            var msec;
            var gmt;

            if ( !_validDate && !_noDate ) { return ; }

            if ( _validDate ) {
                if ( _haveYear ) {
                    var _y = _d.getFullYear( ) - 50 + '';
                    year   = mList[ objIndex.year.match + 1 ];
                    if ( iFormat[ objIndex.year.original ] === 'y' ) {
                        year = +_y.slice( 0 , 2 ) + ( year >= ( _y ).slice( 2 ) ? 0 : 1 ) + year;
                    }
                } else {
                    year = _d.getFullYear();
                }

                if ( _haveYDay ) {
                    month = 0;
                    day   = mList[ objIndex.dayY.match + 1 ];
                } else if ( _haveDay ) {
                    if ( _haveMonth ) {
                        month = this._iMonth( mList[ objIndex.month.match + 1 ] );
                    } else {
                        month = _d.getMonth( );
                    }

                    day = mList[ objIndex.day.match + 1 ];
                } else {
                    month = 0;

                    var week;
                    if ( _haveWeek ) {
                        week = mList[ objIndex.week.match + 1 ];
                    } else {
                        week = this.get( 'W' , _d );
                    }

                    day = ( week - 2 ) * 7 + ( 8 - ( ( new Date( year , 0 , 1 ) ).getDay( ) || 7 ) ) + this._iWeek( mList[ objIndex.week.match + 1 ] );
                }

                if ( month === 0 && day > 31 ) {
                    var aux = new Date( year , month , day );
                    month   = aux.getMonth( );
                    day     = aux.getDate( );
                }
            }
            else {
                year  = _d.getFullYear( );
                month = _d.getMonth( );
                day   = _d.getDate( );
            }

            if      ( _haveHour12 ) { hour = +mList[ objIndex.hourD.match + 1 ] + ( mList[ objIndex.ampm.match + 1 ] === 'pm' ? 12 : 0 ); }
            else if ( _haveHour24 ) { hour = mList[ objIndex.hour.match + 1 ]; }
            else if ( _noDate     ) { hour = _d.getHours( ); }
            else                    { hour = '00'; }

            if      (  _haveMin   ) { min  = mList[ objIndex.min.match + 1 ]; }
            else if ( !_haveMoreM ) { min  = _d.getMinutes( ); }
            else                    { min  = '00'; }

            if      (  _haveSec   ) { sec  = mList[ objIndex.sec.match + 1 ]; }
            else if ( !_haveMoreS ) { sec  = _d.getSeconds( ); }
            else                    { sec  = '00'; }

            if      ( _haveMSec )   { msec = mList[ objIndex.msec.match + 1 ]; }
            else                    { msec = '000'; }

            if      ( _haveDiffH )  { gmt  = mList[ objIndex.diffH.match + 1 ]; }
            else if ( _haveDiffM )  { gmt  = String( -1 * mList[ objIndex.diffM.match + 1 ] / 60 * 100 ).replace( /^(\d)/ , '+$1' ).replace( /(^[\-+])(\d{3}$)/ , '$10$2' ); }
            else                    { gmt  = '+0000'; }

            return new Date( year, month, day, hour, min, sec );
        }
    };


    return InkDate;

});

/**
 * @module Ink.Util.Dumper_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Dumper', '1', [], function() {

    'use strict';

    /**
     * Dump/Profiling Utilities
     *
     * @class Ink.Util.Dumper
     * @version 1
     * @static
     */
    var Dumper = {

        /**
         * Hex code for the 'tab'
         * 
         * @property _tab
         * @type {String}
         * @private
         * @readOnly
         * @static
         *
         */
        _tab: '\xA0\xA0\xA0\xA0',

        /**
         * Function that returns the argument passed formatted
         *
         * @method _formatParam
         * @param {Mixed} param
         * @return {String} The argument passed formatted
         * @private
         * @static
         */
        _formatParam: function(param)
        {
            var formated = '';

            switch(typeof(param)) {
                case 'string':
                    formated = '(string) '+param;
                    break;
                case 'number':
                    formated = '(number) '+param;
                    break;
                case 'boolean':
                    formated = '(boolean) '+param;
                    break;
                case 'object':
                    if(param !== null) {
                        if(param.constructor === Array) {
                            formated = 'Array \n{\n' + this._outputFormat(param, 0) + '\n}';
                        } else {
                            formated = 'Object \n{\n' + this._outputFormat(param, 0) + '\n}';
                        }
                    } else {
                        formated = 'null';
                    }
                    break;
                default:
                    formated = false;
            }

            return formated;
        },

        /**
         * Function that returns the tabs concatenated
         *
         * @method _getTabs
         * @param {Number} numberOfTabs Number of Tabs
         * @return {String} Tabs concatenated
         * @private
         * @static
         */
        _getTabs: function(numberOfTabs)
        {
            var tabs = '';
            for(var _i = 0; _i < numberOfTabs; _i++) {
                tabs += this._tab;
            }
            return tabs;
        },

        /**
         * Function that formats the parameter to display
         *
         * @method _outputFormat
         * @param {Any} param
         * @param {Number} dim
         * @return {String} The parameter passed formatted to displat
         * @private
         * @static
         */
        _outputFormat: function(param, dim)
        {
            var formated = '';
            //var _strVal = false;
            var _typeof = false;
            for(var key in param) {
                if(param[key] !== null) {
                    if(typeof(param[key]) === 'object' && (param[key].constructor === Array || param[key].constructor === Object)) {
                        if(param[key].constructor === Array) {
                            _typeof = 'Array';
                        } else if(param[key].constructor === Object) {
                            _typeof = 'Object';
                        }
                        formated += this._tab + this._getTabs(dim) + '[' + key + '] => <b>'+_typeof+'</b>\n';
                        formated += this._tab + this._getTabs(dim) + '{\n';
                        formated += this._outputFormat(param[key], dim + 1) + this._tab + this._getTabs(dim) + '}\n';
                    } else if(param[key].constructor === Function) {
                        continue;
                    } else {
                        formated = formated + this._tab + this._getTabs(dim) + '[' + key + '] => ' + param[key] + '\n';
                    }
                } else {
                    formated = formated + this._tab + this._getTabs(dim) + '[' + key + '] => null \n';
                }
            }
            return formated;
        },

        /**
         * Print variable structure. Can be passed an output target
         *
         * @method printDump
         * @param {Object|String|Boolean} param
         * @param {optional String|Object} target (can be an element ID or an element)
         * @public
         * @static
         */
        printDump: function(param, target)
        {
            /*jshint evil:true */
            if(!target || typeof(target) === 'undefined') {
                document.write('<pre>'+this._formatParam(param)+'</pre>');
            } else {
                if(typeof(target) === 'string') {
                    document.getElementById(target).innerHTML = '<pre>' + this._formatParam(param) + '</pre>';
                } else if(typeof(target) === 'object') {
                    target.innerHTML = '<pre>'+this._formatParam(param)+'</pre>';
                } else {
                    throw "TARGET must be an element or an element ID";
                }
            }
        },

        /**
         * Function that returns the variable's structure
         *
         * @method returnDump
         * @param {Object|String|Boolean} param
         * @return {String} The variable structure
         * @public
         * @static
         */
        returnDump: function(param)
        {
            return this._formatParam(param);
        },

        /**
         * Function that alerts the variable structure
         *
         * @method alertDump
         * @param {Object|String|Boolean} param
         * @public
         * @static
         */
        alertDump: function(param)
        {
            window.alert(this._formatParam(param).replace(/(<b>)(Array|Object)(<\/b>)/g, "$2"));
        },

        /**
         * Print to new window the variable structure
         *
         * @method windowDump
         * @param {Object|String|Boolean} param
         * @public
         * @static
         */
        windowDump: function(param)
        {
            var dumperwindow = 'dumperwindow_'+(Math.random() * 10000);
            var win = window.open('',
                dumperwindow,
                'width=400,height=300,left=50,top=50,status,menubar,scrollbars,resizable'
            );
            win.document.open();
            win.document.write('<pre>'+this._formatParam(param)+'</pre>');
            win.document.close();
            win.focus();
        }

    };

    return Dumper;

});

/**
 * @module Ink.Util.I18n_1
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Util.I18n', '1', [], function () {
    'use strict';

    var pattrText = /\{(?:(\{.*?})|(?:%s:)?(\d+)|(?:%s)?|([\w-]+))}/g;

    var funcOrVal = function( ret , args ) {
        if ( typeof ret === 'function' ) {
            return ret.apply(this, args);
        } else if (typeof ret !== undefined) {
            return ret;
        } else {
            return '';
        }
    };

    /**
     * Creates a new internationalization helper object
     *
     * @class Ink.Util.I18n
     * @constructor
     *
     * @param {Object} dict object mapping language codes (in the form of `pt_PT`, `pt_BR`, `fr`, `en_US`, etc.) to their Object dictionaries.
     *     @param {Object} dict.(dictionaries...) 
     * @param {String} [lang='pt_PT'] language code of the target language
     *
     * @example
     *      var dictionaries = {    // This could come from a JSONP request from your server
     *          'pt_PT': {
     *              'hello': 'olá',
     *              'me': 'eu',
     *              'i have a {} for you': 'tenho um {} para ti' // Old syntax using `{%s}` tokens still available
     *          },
     *          'pt_BR': {
     *              'hello': 'oi',
     *              'me': 'eu',
     *              'i have a {} for you': 'tenho um {} para você'
     *          }
     *      };
     *      Ink.requireModules(['Ink.Util.I18n_1'], function (I18n) {
     *          var i18n = new I18n(dictionaries, 'pt_PT');
     *          i18n.text('hello');  // returns 'olá'
     *          i18n.text('i have a {} for you', 'IRON SWORD'); // returns 'tenho um IRON SWORD' para ti
     *          
     *          i18n.lang('pt_BR');  // Changes language. pt_BR dictionary is loaded
     *          i18n.text('hello');  // returns 'oi'
     *
     *          i18n.lang('en_US');  // Missing language.
     *          i18n.text('hello');  // returns 'hello'. If testMode is on, returns '[hello]'
     *      });
     *      
     *  @example
     *      // The old {%s} syntax from libsapo's i18n is still supported
     *      i18n.text('hello, {%s}!', 'someone'); // -> 'olá, someone!'
     */
    var I18n = function( dict , lang , testMode ) {
        if ( !( this instanceof I18n ) ) { return new I18n( dict , lang , testMode ); }

        this.reset( )
            .lang( lang )
            .testMode( testMode )
            .append( dict || { } , lang );
    };

    I18n.prototype = {
        reset: function( ) {
            this._dicts    = [ ];
            this._dict     = { };
            this._testMode = false;
            this._lang     = this._gLang;

            return this;
        },
        /**
         * Adds translation strings for this helper to use.
         *
         * @method append
         * @param {Object} dict object containing language objects identified by their language code
         * @example
         *     var i18n = new I18n({}, 'pt_PT');
         *     i18n.append({'pt_PT': {
         *         'sfraggles': 'braggles'
         *     }});
         *     i18n.text('sfraggles') // -> 'braggles'
         */
        append: function( dict ) {
            this._dicts.push( dict );

            this._dict = Ink.extendObj(this._dict , dict[ this._lang ] );

            return this;
        },
        /**
         * Get the language code
         *
         * @returns {String} the language code for this instance
         * @method {String} lang
         */
        /**
         * Set the language. If there are more dictionaries available in cache, they will be loaded.
         *
         * @method  lang
         * @param   lang    {String} Language code to set this instance to.
         */
        lang: function( lang ) {
            if ( !arguments.length ) { return this._lang; }

            if ( lang && this._lang !== lang ) {
                this._lang = lang;

                this._dict = { };

                for ( var i = 0, l = this._dicts.length; i < l; i++ ) {
                    this._dict = Ink.extendObj( this._dict , this._dicts[ i ][ lang ] || { } );
                }
            }

            return this;
        },
        /**
         * Get the testMode
         *
         * @returns {Boolean} the testMode for this instance
         * @method {Boolean} testMode
         */
        /**
         * Sets or unsets test mode. In test mode, unknown strings are wrapped
         * in `[ ... ]`. This is useful for debugging your application and
         * making sure all your translation keys are in place.
         *
         * @method testMode
         * @param {Boolean} bool boolean value to set the test mode to.
         */
        testMode: function( bool ) {
            if ( !arguments.length ) { return !!this._testMode; }

            if ( bool !== undefined  ) { this._testMode = !!bool; }

            return this;
        },

        /**
         * Return an arbitrary key from the current language dictionary
         *
         * @method getKey
         * @param {String} key
         * @return {Any} The object which happened to be in the current language dictionary on the given key.
         *
         * @example
         *      _.getKey('astring'); // -> 'a translated string'
         *      _.getKey('anobject'); // -> {'a': 'translated object'}
         *      _.getKey('afunction'); // -> function () { return 'this is a localized function' }
         */
        getKey: function( key ) {
            var ret;
            var gLang = this._gLang;
            var lang  = this._lang;
    
            if ( key in this._dict ) {
                ret = this._dict[ key ];
            } else {
                I18n.lang( lang );
    
                ret = this._gDict[ key ];
    
                I18n.lang( gLang );
            }
    
            return ret;
        },

        /**
         * Given a translation key, return a translated string, with replaced parameters.
         * When a translated string is not available, the original string is returned unchanged.
         *
         * @method {String} text
         * @param {String} str key to look for in i18n dictionary (which is returned verbatim if unknown)
         * @param {Object} [namedParms] named replacements. Replaces {named} with values in this object.
         * @param {String} [arg1] replacement #1 (replaces first {} and all {1})
         * @param {String} [arg2] replacement #2 (replaces second {} and all {2})
         * @param {String} [argn...] replacement #n (replaces nth {} and all {n})
         *
         * @example
         *      _('Gosto muito de {} e o céu é {}.', 'carros', 'azul');
         *      // returns 'Gosto muito de carros e o céu é azul.'
         *
         * @example
         *      _('O {1} é {2} como {2} é a cor do {3}.', 'carro', 'azul', 'FCP');
         *      // returns 'O carro é azul como azul é o FCP.'
         *
         *  @example
         *      _('O {person1} dava-se com a {person2}', {person1: 'coisinho', person2: 'coisinha'});
         *      // -> 'O coisinho dava-se com a coisinha'
         *
         *  @example
         *      // This is a bit more complex
         *      var i18n = make().lang('pt_PT').append({
         *          pt_PT: {
         *              array: [1, 2],
         *              object: {'a': '-a-', 'b': '-b-'},
         *              func: function (a, b) {return '[[' + a + ',' + b + ']]';}
         *          }
         *      });
         *      i18n.text('array', 0); // -> '1'
         *      i18n.text('object', 'a'); // -> '-a-'
         *      i18n.text('func', 'a', 'b'); // -> '[[a,b]]'
         */
        text: function( str /*, replacements...*/ ) {
            if ( typeof str !== 'string' ) { return; } // Backwards-compat

            var pars = Array.prototype.slice.call( arguments , 1 );
            var idx = 0;
            var isObj = typeof pars[ 0 ] === 'object';

            var original = this.getKey( str );
            if ( original === undefined ) { original = this._testMode ? '[' + str + ']' : str; }
            if ( typeof original === 'number' ) { original += ''; }

            if (typeof original === 'string') {
                original = original.replace( pattrText , function( m , $1 , $2 , $3 ) {
                    var ret =
                        $1 ? $1 :
                        $2 ? pars[ $2 - ( isObj ? 0 : 1 ) ] :
                        $3 ? pars[ 0 ][ $3 ] || '' :
                             pars[ (idx++) + ( isObj ? 1 : 0 ) ];
                    return funcOrVal( ret , [idx].concat(pars) );
                });
                return original;
            }
             
            return (
                typeof original === 'function' ? original.apply( this , pars ) :
                original instanceof Array      ? funcOrVal( original[ pars[ 0 ] ] , pars ) :
                typeof original === 'object'   ? funcOrVal( original[ pars[ 0 ] ] , pars ) :
                                                 '');
        },

        /**
         * Given a singular string, a plural string, and a number, translates
         * either the singular or plural string.
         *
         * @method ntext
         * @return {String}
         *
         * @param {String} strSin   word to use when count is 1
         * @param {String} strPlur  word to use otherwise
         * @param {Number} count    number which defines which word to use
         * @param [...]             extra arguments, to be passed to `text()`
         *
         * @example
         *     i18n.ntext('platypus', 'platypuses', 1); // returns 'ornitorrinco'
         *     i18n.ntext('platypus', 'platypuses', 2); // returns 'ornitorrincos'
         * 
         * @example
         *     // The "count" argument is passed to text()
         *     i18n.ntext('{} platypus', '{} platypuses', 1); // returns '1 ornitorrinco'
         *     i18n.ntext('{} platypus', '{} platypuses', 2); // returns '2 ornitorrincos'
         */
        ntext: function( strSin , strPlur , count ) {
            var pars = Array.prototype.slice.apply( arguments );
            var original;

            if ( pars.length === 2 && typeof strPlur === 'number' ) {
                original = this.getKey( strSin );
                if ( !( original instanceof Array ) ) { return ''; }

                pars.splice( 0 , 1 );
                original = original[ strPlur === 1 ? 0 : 1 ];
            } else {
                pars.splice( 0 , 2 );
                original = count === 1 ? strSin : strPlur;
            }

            return this.text.apply( this , [ original ].concat( pars ) );
        },

        /**
         * Returns the ordinal suffix of `num` (For example, 1 > 'st', 2 > 'nd', 5 > 'th', ...).
         *
         * This works by using transforms (in the form of Objects or Functions) passed into the
         * function or found in the special key `_ordinals` in the active language dictionary.
         *
         * @method ordinal
         *
         * @param {Number}          num             Input number
         * 
         * @param {Object|Function} [options={}]
         *
         *    Maps for translating. Each of these options' fallback is found in the current
         *    language's dictionary. The lookup order is the following:
         *   
         *        1. `exceptions`
         *        2. `byLastDigit`
         *        3. `default`
         *   
         *    Each of these may be either an `Object` or a `Function`. If it's a function, it
         *    is called (with `number` and `digit` for any function except for byLastDigit,
         *    which is called with the `lastDigit` of the number in question), and if the
         *    function returns a string, that is used. If it's an object, the property is
         *    looked up using `[...]`. If what is found is a string, it is used.
         *
         * @param {Object|Function} [options.byLastDigit={}]
         *    If the language requires the last digit to be considered, mappings of last digits
         *    to ordinal suffixes can be created here.
         *
         * @param {Object|Function} [options.exceptions={}]
         *    Map unique, special cases to their ordinal suffixes.
         *
         * @returns {String}        Ordinal suffix for `num`.
         *
         * @example
         *     var i18n = new I18n({
         *         pt_PT: {  // 1º, 2º, 3º, 4º, ...
         *             _ordinal: {  // The _ordinals key each translation dictionary is special.
         *                 'default': "º" // Usually the suffix is "º" in portuguese...
         *             }
         *         },
         *         fr: {  // 1er, 2e, 3e, 4e, ...
         *             _ordinal: {  // The _ordinals key is special.
         *                 'default': "e", // Usually the suffix is "e" in french...
         *                 exceptions: {
         *                     1: "er"   // ... Except for the number one.
         *                 }
         *             }
         *         },
         *         en_US: {  // 1st, 2nd, 3rd, 4th, ..., 11th, 12th, ... 21st, 22nd...
         *             _ordinal: {
         *                 'default': "th",// Usually the digit is "th" in english...
         *                 byLastDigit: {
         *                     1: "st",  // When the last digit is 1, use "th"...
         *                     2: "nd",  // When the last digit is 2, use "nd"...
         *                     3: "rd"   // When the last digit is 3, use "rd"...
         *                 },
         *                 exceptions: { // But these numbers are special
         *                     0: "",
         *                     11: "th",
         *                     12: "th",
         *                     13: "th"
         *                 }
         *             }
         *         }
         *     }, 'pt_PT');
         *
         *     i18n.ordinal(1);    // returns 'º'
         *     i18n.ordinal(2);    // returns 'º'
         *     i18n.ordinal(11);   // returns 'º'
         * 
         *     i18n.lang('fr');
         *     i18n.ordinal(1);    // returns 'er'
         *     i18n.ordinal(2);    // returns 'e'
         *     i18n.ordinal(11);   // returns 'e'
         *
         *     i18n.lang('en_US');
         *     i18n.ordinal(1);    // returns 'st'
         *     i18n.ordinal(2);    // returns 'nd'
         *     i18n.ordinal(12);   // returns 'th'
         *     i18n.ordinal(22);   // returns 'nd'
         *     i18n.ordinal(3);    // returns 'rd'
         *     i18n.ordinal(4);    // returns 'th'
         *     i18n.ordinal(5);    // returns 'th'
         *
         **/
        ordinal: function( num ) {
            if ( num === undefined ) { return ''; }

            var lastDig = +num.toString( ).slice( -1 );

            var ordDict  = this.getKey( '_ordinals' );
            if ( ordDict === undefined ) { return ''; }

            if ( typeof ordDict === 'string' ) { return ordDict; }

            var ret;

            if ( typeof ordDict === 'function' ) {
                ret = ordDict( num , lastDig );

                if ( typeof ret === 'string' ) { return ret; }
            }

            if ( 'exceptions' in ordDict ) {
                ret = typeof ordDict.exceptions === 'function' ? ordDict.exceptions( num , lastDig ) :
                      num in ordDict.exceptions                ? funcOrVal( ordDict.exceptions[ num ] , [num , lastDig] ) :
                                                                 undefined;

                if ( typeof ret === 'string' ) { return ret; }
            }

            if ( 'byLastDigit' in ordDict ) {
                ret = typeof ordDict.byLastDigit === 'function' ? ordDict.byLastDigit( lastDig , num ) :
                      lastDig in ordDict.byLastDigit            ? funcOrVal( ordDict.byLastDigit[ lastDig ] , [lastDig , num] ) :
                                                                  undefined;

                if ( typeof ret === 'string' ) { return ret; }
            }

            if ( 'default' in ordDict ) {
                ret = funcOrVal( ordDict['default'] , [ num , lastDig ] );

                if ( typeof ret === 'string' ) { return ret; }
            }

            return '';
        },

        /**
         * Returns an alias to `text()`, for convenience. The resulting function is
         * traditionally assigned to "_".
         *
         * @method alias
         * @returns {Function} an alias to `text()`. You can also access the rest of the translation API through this alias.
         *
         * @example
         *     var i18n = new I18n({
         *         'pt_PT': {
         *             'hi': 'olá',
         *             '{} day': '{} dia',
         *             '{} days': '{} dias',
         *             '_ordinals': {
         *                 'default': 'º'
         *             }
         *         }
         *     }, 'pt_PT');
         *     var _ = i18n.alias();
         *     _('hi');  // -> 'olá'
         *     _('{} days', 3);  // -> '3 dias'
         *     _.ntext('{} day', '{} days', 2);  // -> '2 dias'
         *     _.ntext('{} day', '{} days', 1);  // -> '1 dia'
         *     _.ordinal(3);  // -> 'º'
         */
        alias: function( ) {
            var ret      = Ink.bind( I18n.prototype.text     , this );
            ret.ntext    = Ink.bind( I18n.prototype.ntext    , this );
            ret.append   = Ink.bind( I18n.prototype.append   , this );
            ret.ordinal  = Ink.bind( I18n.prototype.ordinal  , this );
            ret.testMode = Ink.bind( I18n.prototype.testMode , this );

            return ret;
        }
    };

    /**
     * @static
     * @method I18n.reset
     *
     * Reset I18n global state (global dictionaries, and default language for instances)
     **/
    I18n.reset = function( ) {
        I18n.prototype._gDicts = [ ];
        I18n.prototype._gDict  = { };
        I18n.prototype._gLang  = 'pt_PT';
    };
    I18n.reset( );

    /**
     * @static
     * @method I18n.append
     *
     * @param dict {Object}     Dictionary to be added
     * @param lang {String}     Language to be added to
     *
     * Add a dictionary to be used in all I18n instances for the corresponding language
     */
    I18n.append = function( dict , lang ) {
        if ( lang ) {
            if ( !( lang in dict ) ) {
                var obj = { };

                obj[ lang ] = dict;

                dict = obj;
            }

            if ( lang !== I18n.prototype._gLang ) { I18n.lang( lang ); }
        }

        I18n.prototype._gDicts.push( dict );

        Ink.extendObj( I18n.prototype._gDict , dict[ I18n.prototype._gLang ] );
    };

    /**
     * @static
     * @method I18n.lang
     * 
     * @param lang {String} String in the format `"pt_PT"`, `"fr"`, etc.
     *
     * Set global default language of I18n instances to `lang`
     */
    /**
     * @static
     * @method I18n.lang
     *
     * Get the current default language of I18n instances.
     *
     * @return {String} language code
     */
    I18n.lang = function( lang ) {
        if ( !arguments.length ) { return I18n.prototype._gLang; }

        if ( lang && I18n.prototype._gLang !== lang ) {
            I18n.prototype._gLang = lang;

            I18n.prototype._gDict = { };

            for ( var i = 0, l = I18n.prototype._gDicts.length; i < l; i++ ) {
                Ink.extendObj( I18n.prototype._gDict , I18n.prototype._gDicts[ i ][ lang ] || { } );
            }
        }
    };
    
    return I18n;
});

/**
 * @module Ink.Util.Json_1
 *
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Util.Json', '1', [], function() {
    'use strict';

    var function_call = Function.prototype.call;
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function twoDigits(n) {
        var r = '' + n;
        if (r.length === 1) {
            return '0' + r;
        } else {
            return r;
        }
    }

    var dateToISOString = Date.prototype.toISOString ?
        Ink.bind(function_call, Date.prototype.toISOString) :
        function(date) {
            // Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
            return date.getUTCFullYear() +
                '-' + twoDigits( date.getUTCMonth() + 1 ) +
                '-' + twoDigits( date.getUTCDate() ) +
                'T' + twoDigits( date.getUTCHours() ) +
                ':' + twoDigits( date.getUTCMinutes() ) +
                ':' + twoDigits( date.getUTCSeconds() ) +
                '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 ) +
                'Z';
        };

    /**
     * Use this class to convert JSON strings to JavaScript objects
     * `(Json.parse)` and also to do the opposite operation `(Json.stringify)`.
     * Internally, the standard JSON implementation is used if available
     * Otherwise, the functions mimic the standard implementation.
     *
     * Here's how to produce JSON from an existing object:
     * 
     *      Ink.requireModules(['Ink.Util.Json_1'], function (Json) {
     *          var obj = {
     *              key1: 'value1',
     *              key2: 'value2',
     *              keyArray: ['arrayValue1', 'arrayValue2', 'arrayValue3']
     *          };
     *          Json.stringify(obj);  // The above object as a JSON string
     *      });
     *
     * And here is how to parse JSON:
     *
     *      Ink.requireModules(['Ink.Util.Json_1'], function (Json) {
     *          var source = '{"key": "value", "array": [true, null, false]}';
     *          Json.parse(source);  // The above JSON string as an object
     *      });
     * @class Ink.Util.Json
     * @static
     * 
     */
    var InkJson = {
        _nativeJSON: window.JSON || null,

        _convertToUnicode: false,

        // Escape characters so as to embed them in JSON strings
        _escape: function (theString) {
            var _m = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"',  '\\': '\\\\' };

            if (/["\\\x00-\x1f]/.test(theString)) {
                theString = theString.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                    var c = _m[b];
                    if (c) {
                        return c;
                    }
                    c = b.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                });
            }

            return theString;
        },

        // A character conversion map
        _toUnicode: function (theString)
        {
            if(!this._convertToUnicode) {
                return this._escape(theString);
            } else {
                var unicodeString = '';
                var inInt = false;
                var theUnicode = false;
                var i = 0;
                var total = theString.length;
                while(i < total) {
                    inInt = theString.charCodeAt(i);
                    if( (inInt >= 32 && inInt <= 126) ||
                            //(inInt >= 48 && inInt <= 57) ||
                            //(inInt >= 65 && inInt <= 90) ||
                            //(inInt >= 97 && inInt <= 122) ||
                            inInt === 8 ||
                            inInt === 9 ||
                            inInt === 10 ||
                            inInt === 12 ||
                            inInt === 13 ||
                            inInt === 32 ||
                            inInt === 34 ||
                            inInt === 47 ||
                            inInt === 58 ||
                            inInt === 92) {

                        if(inInt === 34 || inInt === 92 || inInt === 47) {
                            theUnicode = '\\'+theString.charAt(i);
                        } else if(inInt === 8) {
                            theUnicode = '\\b';
                        } else if(inInt === 9) {
                            theUnicode = '\\t';
                        } else if(inInt === 10) {
                            theUnicode = '\\n';
                        } else if(inInt === 12) {
                            theUnicode = '\\f';
                        } else if(inInt === 13) {
                            theUnicode = '\\r';
                        } else {
                            theUnicode = theString.charAt(i);
                        }
                    } else {
                        if(this._convertToUnicode) {
                            theUnicode = theString.charCodeAt(i).toString(16)+''.toUpperCase();
                            while (theUnicode.length < 4) {
                                theUnicode = '0' + theUnicode;
                            }
                            theUnicode = '\\u' + theUnicode;
                        } else {
                            theUnicode = theString.charAt(i);
                        }
                    }
                    unicodeString += theUnicode;

                    i++;
                }

                return unicodeString;
            }

        },

        _stringifyValue: function(param) {
            if (typeof param === 'string') {
                return '"' + this._toUnicode(param) + '"';
            } else if (typeof param === 'number' && (isNaN(param) || !isFinite(param))) {  // Unusable numbers go null
                return 'null';
            } else if (typeof param === 'undefined' || param === null) {  // And so does undefined
                return 'null';
            } else if (typeof param.toJSON === 'function') {
                var t = param.toJSON();
                if (typeof t === 'string') {
                    return '"' + this._escape(t) + '"';
                } else {
                    return this._escape(t.toString());
                }
            } else if (typeof param === 'number' || typeof param === 'boolean') {  // These ones' toString methods return valid JSON.
                return '' + param;
            } else if (typeof param === 'function') {
                return 'null';  // match JSON.stringify
            } else if (param.constructor === Date) {
                return '"' + this._escape(dateToISOString(param)) + '"';
            } else if (param.constructor === Array) {
                var arrayString = '';
                for (var i = 0, len = param.length; i < len; i++) {
                    if (i > 0) {
                        arrayString += ',';
                    }
                    arrayString += this._stringifyValue(param[i]);
                }
                return '[' + arrayString + ']';
            } else {  // Object
                var objectString = '';
                for (var k in param)  {
                    if ({}.hasOwnProperty.call(param, k)) {
                        if (objectString !== '') {
                            objectString += ',';
                        }
                        objectString += '"' + this._escape(k) + '": ' + this._stringifyValue(param[k]);
                    }
                }
                return '{' + objectString + '}';
            }
        },

        /**
         * serializes a JSON object into a string.
         *
         * @method stringify
         * @param {Object}      input               Data to be serialized into JSON
         * @param {Boolean}     convertToUnicode    When `true`, converts string contents to unicode \uXXXX
         * @return {String}     serialized string
         *
         * @example
         *      Json.stringify({a:1.23}); // -> string: '{"a": 1.23}'
         */
        stringify: function(input, convertToUnicode) {
            this._convertToUnicode = !!convertToUnicode;
            if(!this._convertToUnicode && this._nativeJSON) {
                return this._nativeJSON.stringify(input);
            }
            return this._stringifyValue(input);  // And recurse.
        },
        
        /**
         * @method parse
         * @param text      {String}    Input string
         * @param reviver   {Function}  Function receiving `(key, value)`, and `this`=(containing object), used to walk objects.
         * 
         * @example
         * Simple example:
         *
         *      Json.parse('{"a": "3","numbers":false}',
         *          function (key, value) {
         *              if (!this.numbers && key === 'a') {
         *                  return "NO NUMBERS";
         *              } else {
         *                  return value;
         *              }
         *          }); // -> object: {a: 'NO NUMBERS', numbers: false}
         */
        /* From https://github.com/douglascrockford/JSON-js/blob/master/json.js */
        parse: function (text, reviver) {
            /*jshint evil:true*/

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') :
                    j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        }
    };

    return InkJson;
});

/**
 * @module Ink.Util.String_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.String', '1', [], function() {

    'use strict';

    /**
     * String Manipulation Utilities
     *
     * @class Ink.Util.String
     * @version 1
     * @static
     */
    var InkUtilString = {

        /**
         * List of special chars
         * 
         * @property _chars
         * @type {Array}
         * @private
         * @readOnly
         * @static
         */
        _chars: ['&','à','á','â','ã','ä','å','æ','ç','è','é',
                'ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô',
                'õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ','À',
                'Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë',
                'Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö',
                'Ø','Ù','Ú','Û','Ü','Ý','Þ','€','\"','ß','<',
                '>','¢','£','¤','¥','¦','§','¨','©','ª','«',
                '¬','\xad','®','¯','°','±','²','³','´','µ','¶',
                '·','¸','¹','º','»','¼','½','¾'],

        /**
         * List of the special characters' html entities
         * 
         * @property _entities
         * @type {Array}
         * @private
         * @readOnly
         * @static
         */
        _entities: ['amp','agrave','aacute','acirc','atilde','auml','aring',
                    'aelig','ccedil','egrave','eacute','ecirc','euml','igrave',
                    'iacute','icirc','iuml','eth','ntilde','ograve','oacute',
                    'ocirc','otilde','ouml','oslash','ugrave','uacute','ucirc',
                    'uuml','yacute','thorn','yuml','Agrave','Aacute','Acirc',
                    'Atilde','Auml','Aring','AElig','Ccedil','Egrave','Eacute',
                    'Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde',
                    'Ograve','Oacute','Ocirc','Otilde','Ouml','Oslash','Ugrave',
                    'Uacute','Ucirc','Uuml','Yacute','THORN','euro','quot','szlig',
                    'lt','gt','cent','pound','curren','yen','brvbar','sect','uml',
                    'copy','ordf','laquo','not','shy','reg','macr','deg','plusmn',
                    'sup2','sup3','acute','micro','para','middot','cedil','sup1',
                    'ordm','raquo','frac14','frac12','frac34'],

        /**
         * List of accented chars
         * 
         * @property _accentedChars
         * @type {Array}
         * @private
         * @readOnly
         * @static
         */
        _accentedChars:['à','á','â','ã','ä','å',
                        'è','é','ê','ë',
                        'ì','í','î','ï',
                        'ò','ó','ô','õ','ö',
                        'ù','ú','û','ü',
                        'ç','ñ',
                        'À','Á','Â','Ã','Ä','Å',
                        'È','É','Ê','Ë',
                        'Ì','Í','Î','Ï',
                        'Ò','Ó','Ô','Õ','Ö',
                        'Ù','Ú','Û','Ü',
                        'Ç','Ñ'],

        /**
         * List of the accented chars (above), but without the accents
         * 
         * @property _accentedRemovedChars
         * @type {Array}
         * @private
         * @readOnly
         * @static
         */
        _accentedRemovedChars:['a','a','a','a','a','a',
                               'e','e','e','e',
                               'i','i','i','i',
                               'o','o','o','o','o',
                               'u','u','u','u',
                               'c','n',
                               'A','A','A','A','A','A',
                               'E','E','E','E',
                               'I','I','I','I',
                               'O','O','O','O','O',
                               'U','U','U','U',
                               'C','N'],
        /**
         * Object that contains the basic HTML unsafe chars, as keys, and their HTML entities as values
         * 
         * @property _htmlUnsafeChars
         * @type {Object}
         * @private
         * @readOnly
         * @static
         */
        _htmlUnsafeChars:{'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'},

        /**
         * Convert first letter of a word to upper case <br />
         * If param as more than one word, it converts first letter of all words that have more than 2 letters
         *
         * @method ucFirst
         * @param {String} string
         * @param {Boolean} [firstWordOnly=false] capitalize only first word.
         * @return {String} string camel cased
         * @public
         * @static
         *
         * @example
         *      InkString.ucFirst('hello world'); // -> 'Hello World'
         *      InkString.ucFirst('hello world', true); // -> 'Hello world'
         */
        ucFirst: function(string, firstWordOnly) {
            var replacer = firstWordOnly ? /(^|\s)(\w)(\S{2,})/ : /(^|\s)(\w)(\S{2,})/g;
            return string ? String(string).replace(replacer, function(_, $1, $2, $3){
                return $1 + $2.toUpperCase() + $3.toLowerCase();
            }) : string;
        },

        /**
         * Remove spaces and new line from biggin and ends of string
         *
         * @method trim
         * @param {String} string
         * @return {String} string trimmed
         * @public
         * @static
         */
        trim: function(string)
        {
            if (typeof string === 'string') {
                return string.replace(/^\s+|\s+$|\n+$/g, '');
            }
            return string;
        },

        /**
         * Removes HTML tags of string
         *
         * @method stripTags
         * @param {String} string
         * @param {String} allowed
         * @return {String} String stripped from HTML tags, leaving only the allowed ones (if any)
         * @public
         * @static
         * @example
         *     <script>
         *          var myvar='isto e um texto <b>bold</b> com imagem <img src=""> e br <br /> um <p>paragrafo</p>';
         *          SAPO.Utility.String.stripTags(myvar, 'b,u');
         *     </script>
         */
        stripTags: function(string, allowed)
        {
            if (allowed && typeof allowed === 'string') {
                var aAllowed = InkUtilString.trim(allowed).split(',');
                var aNewAllowed = [];
                var cleanedTag = false;
                for(var i=0; i < aAllowed.length; i++) {
                    if(InkUtilString.trim(aAllowed[i]) !== '') {
                        cleanedTag = InkUtilString.trim(aAllowed[i].replace(/(<|\>)/g, '').replace(/\s/, ''));
                        aNewAllowed.push('(<'+cleanedTag+'\\s[^>]+>|<(\\s|\\/)?(\\s|\\/)?'+cleanedTag+'>)');
                    }
                }
                var strAllowed = aNewAllowed.join('|');
                var reAllowed = new RegExp(strAllowed, "i");

                var aFoundTags = string.match(new RegExp("<[^>]*>", "g"));

                for(var j=0; j < aFoundTags.length; j++) {
                    if(!aFoundTags[j].match(reAllowed)) {
                        string = string.replace((new RegExp(aFoundTags[j], "gm")), '');
                    }
                }
                return string;
            } else {
                return string.replace(/<[^\>]+\>/g, '');
            }
        },

        /**
         * Convert listed characters to HTML entities
         *
         * @method htmlEntitiesEncode
         * @param {String} string
         * @return {String} string encoded
         * @public
         * @static
         */
        htmlEntitiesEncode: function(string)
        {
            if (string && string.replace) {
                var re = false;
                for (var i = 0; i < InkUtilString._chars.length; i++) {
                    re = new RegExp(InkUtilString._chars[i], "gm");
                    string = string.replace(re, '&' + InkUtilString._entities[i] + ';');
                }
            }
            return string;
        },

        /**
         * Convert listed HTML entities to character
         *
         * @method htmlEntitiesDecode
         * @param {String} string
         * @return {String} string decoded
         * @public
         * @static
         */
        htmlEntitiesDecode: function(string)
        {
            if (string && string.replace) {
                var re = false;
                for (var i = 0; i < InkUtilString._entities.length; i++) {
                    re = new RegExp("&"+InkUtilString._entities[i]+";", "gm");
                    string = string.replace(re, InkUtilString._chars[i]);
                }
                string = string.replace(/&#[^;]+;?/g, function($0){
                    if ($0.charAt(2) === 'x') {
                        return String.fromCharCode(parseInt($0.substring(3), 16));
                    }
                    else {
                        return String.fromCharCode(parseInt($0.substring(2), 10));
                    }
                });
            }
            return string;
        },

        /**
         * Encode a string to UTF8
         *
         * @method utf8Encode
         * @param {String} string
         * @return {String} string utf8 encoded
         * @public
         * @static
         */
        utf8Encode: function(string) {
            /*jshint bitwise:false*/
            string = string.replace(/\r\n/g,"\n");
            var utfstring = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utfstring += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utfstring += String.fromCharCode((c >> 6) | 192);
                    utfstring += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utfstring += String.fromCharCode((c >> 12) | 224);
                    utfstring += String.fromCharCode(((c >> 6) & 63) | 128);
                    utfstring += String.fromCharCode((c & 63) | 128);
                }

            }
            return utfstring;
        },

        /**
         * Make a string shorter without cutting words
         *
         * @method shortString
         * @param {String} str
         * @param {Number} n - number of chars of the short string
         * @return {String} string shortened
         * @public
         * @static
         */
        shortString: function(str,n) {
          var words = str.split(' ');
          var resultstr = '';
          for(var i = 0; i < words.length; i++ ){
            if((resultstr + words[i] + ' ').length>=n){
              resultstr += '&hellip;';
              break;
              }
            resultstr += words[i] + ' ';
            }
          return resultstr;
        },

        /**
         * Truncates a string, breaking words and adding ... at the end
         *
         * @method truncateString
         * @param {String} str
         * @param {Number} length - length limit for the string. String will be
         *        at most this big, ellipsis included.
         * @return {String} string truncated
         * @public
         * @static
         */
        truncateString: function(str, length) {
            if(str.length - 1 > length) {
                return str.substr(0, length - 1) + "\u2026";
            } else {
                return str;
            }
        },

        /**
         * Decode a string from UTF8
         *
         * @method utf8Decode
         * @param {String} string
         * @return {String} string utf8 decoded
         * @public
         * @static
         */
        utf8Decode: function(utfstring) {
            /*jshint bitwise:false*/
            var string = "";
            var i = 0, c = 0, c2 = 0, c3 = 0;

            while ( i < utfstring.length ) {

                c = utfstring.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utfstring.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utfstring.charCodeAt(i+1);
                    c3 = utfstring.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }
            return string;
        },

        /**
         * Convert all accented chars to char without accent.
         *
         * @method removeAccentedChars
         * @param {String} string
         * @return {String} string without accented chars
         * @public
         * @static
         */
        removeAccentedChars: function(string)
        {
            var newString = string;
            var re = false;
            for (var i = 0; i < InkUtilString._accentedChars.length; i++) {
                re = new RegExp(InkUtilString._accentedChars[i], "gm");
                newString = newString.replace(re, '' + InkUtilString._accentedRemovedChars[i] + '');
            }
            return newString;
        },

        /**
         * Count the number of occurrences of a specific needle in a haystack
         *
         * @method substrCount
         * @param {String} haystack
         * @param {String} needle
         * @return {Number} Number of occurrences
         * @public
         * @static
         */
        substrCount: function(haystack,needle)
        {
            return haystack ? haystack.split(needle).length - 1 : 0;
        },

        /**
         * Eval a JSON string to a JS object
         *
         * @method evalJSON
         * @param {String} strJSON
         * @param {Boolean} sanitize
         * @return {Object} JS Object
         * @public
         * @static
         */
        evalJSON: function(strJSON, sanitize) {
            /* jshint evil:true */
            if( (typeof sanitize === 'undefined' || sanitize === null) || InkUtilString.isJSON(strJSON)) {
                try {
                    if(typeof(JSON) !== "undefined" && typeof(JSON.parse) !== 'undefined'){
                        return JSON.parse(strJSON);
                    }
                    return eval('('+strJSON+')');
                } catch(e) {
                    throw new Error('ERROR: Bad JSON string...');
                }
            }
        },

        /**
         * Checks if a string is a valid JSON object (string encoded)
         *
         * @method isJSON
         * @param {String} str
         * @return {Boolean}
         * @public
         * @static
         */
        isJSON: function(str)
        {
            str = str.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
            return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
        },

        /**
         * Escapes unsafe html chars to their entities
         *
         * @method htmlEscapeUnsafe
         * @param {String} str String to escape
         * @return {String} Escaped string
         * @public
         * @static
         */
        htmlEscapeUnsafe: function(str){
            var chars = InkUtilString._htmlUnsafeChars;
            return str !== null ? String(str).replace(/[<>&'"]/g,function(c){return chars[c];}) : str;
        },

        /**
         * Normalizes whitespace in string.
         * String is trimmed and sequences of many
         * Whitespaces are collapsed.
         *
         * @method normalizeWhitespace
         * @param {String} str String to normalize
         * @return {String} string normalized
         * @public
         * @static
         */
        normalizeWhitespace: function(str){
            return str !== null ? InkUtilString.trim(String(str).replace(/\s+/g,' ')) : str;
        },

        /**
         * Converts string to unicode
         *
         * @method toUnicode
         * @param {String} str
         * @return {String} string unicoded
         * @public
         * @static
         */
        toUnicode: function(str) {
            if (typeof str === 'string') {
                var unicodeString = '';
                var inInt = false;
                var theUnicode = false;
                var total = str.length;
                var i=0;

                while(i < total)
                {
                    inInt = str.charCodeAt(i);
                    if( (inInt >= 32 && inInt <= 126) ||
                            inInt === 8 ||
                            inInt === 9 ||
                            inInt === 10 ||
                            inInt === 12 ||
                            inInt === 13 ||
                            inInt === 32 ||
                            inInt === 34 ||
                            inInt === 47 ||
                            inInt === 58 ||
                            inInt === 92) {

                        /*
                        if(inInt == 34 || inInt == 92 || inInt == 47) {
                            theUnicode = '\\'+str.charAt(i);
                        } else {
                        }
                        */
                        if(inInt === 8) {
                            theUnicode = '\\b';
                        } else if(inInt === 9) {
                            theUnicode = '\\t';
                        } else if(inInt === 10) {
                            theUnicode = '\\n';
                        } else if(inInt === 12) {
                            theUnicode = '\\f';
                        } else if(inInt === 13) {
                            theUnicode = '\\r';
                        } else {
                            theUnicode = str.charAt(i);
                        }
                    } else {
                        theUnicode = str.charCodeAt(i).toString(16)+''.toUpperCase();
                        while (theUnicode.length < 4) {
                            theUnicode = '0' + theUnicode;
                        }
                        theUnicode = '\\u' + theUnicode;
                    }
                    unicodeString += theUnicode;

                    i++;
                }
                return unicodeString;
            }
        },

        /**
         * Escapes a unicode character. returns \xXX if hex smaller than 0x100, otherwise \uXXXX
         *
         * @method escape
         * @param {String} c Char
         * @return {String} escaped char
         * @public
         * @static
         */

        /**
         * @param {String} c char
         */
        escape: function(c) {
            var hex = (c).charCodeAt(0).toString(16).split('');
            if (hex.length < 3) {
                while (hex.length < 2) { hex.unshift('0'); }
                hex.unshift('x');
            }
            else {
                while (hex.length < 4) { hex.unshift('0'); }
                hex.unshift('u');
            }

            hex.unshift('\\');
            return hex.join('');
        },

        /**
         * Unescapes a unicode character escape sequence
         *
         * @method unescape
         * @param {String} es Escape sequence
         * @return {String} String des-unicoded
         * @public
         * @static
         */
        unescape: function(es) {
            var idx = es.lastIndexOf('0');
            idx = idx === -1 ? 2 : Math.min(idx, 2);
            //console.log(idx);
            var hexNum = es.substring(idx);
            //console.log(hexNum);
            var num = parseInt(hexNum, 16);
            return String.fromCharCode(num);
        },

        /**
         * Escapes a string to unicode characters
         *
         * @method escapeText
         * @param {String} txt
         * @param {Array} [whiteList]
         * @return {String} Escaped to Unicoded string
         * @public
         * @static
         */
        escapeText: function(txt, whiteList) {
            if (whiteList === undefined) {
                whiteList = ['[', ']', '\'', ','];
            }
            var txt2 = [];
            var c, C;
            for (var i = 0, f = txt.length; i < f; ++i) {
                c = txt[i];
                C = c.charCodeAt(0);
                if (C < 32 || C > 126 && whiteList.indexOf(c) === -1) {
                    c = InkUtilString.escape(c);
                }
                txt2.push(c);
            }
            return txt2.join('');
        },

        /**
         * Regex to check escaped strings
         *
         * @property escapedCharRegex
         * @type {Regex}
         * @public
         * @readOnly
         * @static
         */
        escapedCharRegex: /(\\x[0-9a-fA-F]{2})|(\\u[0-9a-fA-F]{4})/g,

        /**
         * Unescapes a string
         *
         * @method unescapeText
         * @param {String} txt
         * @return {String} Unescaped string
         * @public
         * @static
         */
        unescapeText: function(txt) {
            /*jshint boss:true */
            var m;
            while (m = InkUtilString.escapedCharRegex.exec(txt)) {
                m = m[0];
                txt = txt.replace(m, InkUtilString.unescape(m));
                InkUtilString.escapedCharRegex.lastIndex = 0;
            }
            return txt;
        },

        /**
         * Compares two strings
         *
         * @method strcmp
         * @param {String} str1
         * @param {String} str2
         * @return {Number}
         * @public
         * @static
         */
        strcmp: function(str1, str2) {
            return ((str1 === str2) ? 0 : ((str1 > str2) ? 1 : -1));
        },

        /**
         * Splits long string into string of, at most, maxLen (that is, all but last have length maxLen,
         * last can measure maxLen or less)
         *
         * @method packetize
         * @param {String} string string to divide
         * @param {Number} maxLen packet size
         * @return {Array} string divided
         * @public
         * @static
         */
        packetize: function(str, maxLen) {
            var len = str.length;
            var parts = new Array( Math.ceil(len / maxLen) );
            var chars = str.split('');
            var sz, i = 0;
            while (len) {
                sz = Math.min(maxLen, len);
                parts[i++] = chars.splice(0, sz).join('');
                len -= sz;
            }
            return parts;
        }
    };

    return InkUtilString;

});

/**
 * @module Ink.Util.Url_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Url', '1', [], function() {

    'use strict';

    /**
     * Utility functions to use with URLs
     *
     * @class Ink.Util.Url
     * @version 1
     * @static
     */
    var Url = {

        /**
         * Auxiliary string for encoding
         *
         * @property _keyStr
         * @type {String}
         * @readOnly
         * @private
         */
        _keyStr : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',


        /**
         * Get current URL of page
         *
         * @method getUrl
         * @return {String}    Current URL
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Url_1'], function( InkUrl ){
         *         console.log( InkUrl.getUrl() ); // Will return it's window URL
         *     });
         */
        getUrl: function()
        {
            return window.location.href;
        },

        /**
         * Generates an uri with query string based on the parameters object given
         *
         * @method genQueryString
         * @param {String} uri
         * @param {Object} params
         * @return {String} URI with query string set
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Url_1'], function( InkUrl ){
         *         var queryString = InkUrl.genQueryString( 'http://www.sapo.pt/', {
         *             'param1': 'valueParam1',
         *             'param2': 'valueParam2'
         *         });
         *
         *         console.log( queryString ); // Result: http://www.sapo.pt/?param1=valueParam1&param2=valueParam2
         *     });
         */
        genQueryString: function(uri, params) {
            var hasQuestionMark = uri.indexOf('?') !== -1;
            var sep, pKey, pValue, parts = [uri];

            for (pKey in params) {
                if (params.hasOwnProperty(pKey)) {
                    if (!hasQuestionMark) {
                        sep = '?';
                        hasQuestionMark = true;
                    } else {
                        sep = '&';
                    }
                    pValue = params[pKey];
                    if (typeof pValue !== 'number' && !pValue) {
                        pValue = '';
                    }
                    parts = parts.concat([sep, encodeURIComponent(pKey), '=', encodeURIComponent(pValue)]);
                }
            }

            return parts.join('');
        },

        /**
         * Get query string of current or passed URL
         *
         * @method getQueryString
         * @param {String} [str] URL String. When not specified it uses the current URL.
         * @return {Object} Key-Value object with the pairs variable: value
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Url_1'], function( InkUrl ){
         *         var queryStringParams = InkUrl.getQueryString( 'http://www.sapo.pt/?var1=valueVar1&var2=valueVar2' );
         *         console.log( queryStringParams );
         *         // Result:
         *         // {
         *         //    var1: 'valueVar1',
         *         //    var2: 'valueVar2'
         *         // }
         *     });
         */
        getQueryString: function(str)
        {
            var url;
            if(str && typeof(str) !== 'undefined') {
                url = str;
            } else {
                url = this.getUrl();
            }
            var aParams = {};
            if(url.match(/\?(.+)/i)) {
                var queryStr = url.replace(/^(.*)\?([^\#]+)(\#(.*))?/g, "$2");
                if(queryStr.length > 0) {
                    var aQueryStr = queryStr.split(/[;&]/);
                    for(var i=0; i < aQueryStr.length; i++) {
                        var pairVar = aQueryStr[i].split('=');
                        aParams[decodeURIComponent(pairVar[0])] = (typeof(pairVar[1]) !== 'undefined' && pairVar[1]) ? decodeURIComponent(pairVar[1]) : false;
                    }
                }
            }
            return aParams;
        },

        /**
         * Get URL hash
         *
         * @method getAnchor
         * @param {String} [str] URL String. If not set, it will get the current URL.
         * @return {String|Boolean} Hash in the URL. If there's no hash, returns false.
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Url_1'], function( InkUrl ){
         *         var anchor = InkUrl.getAnchor( 'http://www.sapo.pt/page.php#TEST' );
         *         console.log( anchor ); // Result: TEST
         *     });
         */
        getAnchor: function(str)
        {
            var url;
            if(str && typeof(str) !== 'undefined') {
                url = str;
            } else {
                url = this.getUrl();
            }
            var anchor = false;
            if(url.match(/#(.+)/)) {
                anchor = url.replace(/([^#]+)#(.*)/, "$2");
            }
            return anchor;
        },

        /**
         * Get anchor string of current or passed URL
         *
         * @method getAnchorString
         * @param {String} [string] If not provided it uses the current URL.
         * @return {Object} Returns a key-value object of the 'variables' available in the hashtag of the URL
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Url_1'], function( InkUrl ){
         *         var hashParams = InkUrl.getAnchorString( 'http://www.sapo.pt/#var1=valueVar1&var2=valueVar2' );
         *         console.log( hashParams );
         *         // Result:
         *         // {
         *         //    var1: 'valueVar1',
         *         //    var2: 'valueVar2'
         *         // }
         *     });
         */
        getAnchorString: function(string)
        {
            var url;
            if(string && typeof(string) !== 'undefined') {
                url = string;
            } else {
                url = this.getUrl();
            }
            var aParams = {};
            if(url.match(/#(.+)/i)) {
                var anchorStr = url.replace(/^([^#]+)#(.*)?/g, "$2");
                if(anchorStr.length > 0) {
                    var aAnchorStr = anchorStr.split(/[;&]/);
                    for(var i=0; i < aAnchorStr.length; i++) {
                        var pairVar = aAnchorStr[i].split('=');
                        aParams[decodeURIComponent(pairVar[0])] = (typeof(pairVar[1]) !== 'undefined' && pairVar[1]) ? decodeURIComponent(pairVar[1]) : false;
                    }
                }
            }
            return aParams;
        },


        /**
         * Parse passed URL
         *
         * @method parseUrl
         * @param {String} url URL to be parsed
         * @return {Object} Parsed URL as a key-value object.
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Url_1'], function( InkUrl ){
         *         var parsedURL = InkUrl.parseUrl( 'http://www.sapo.pt/index.html?var1=value1#anchor' )
         *         console.log( parsedURL );
         *         // Result:
         *         // {
         *         //   'scheme'    => 'http',
         *         //   'host'      => 'www.sapo.pt',
         *         //   'path'      => '/index.html',
         *         //   'query'     => 'var1=value1',
         *         //   'fragment'  => 'anchor'
         *         // }
         *     });
         *
         */
        parseUrl: function(url) {
            var aURL = {};
            if(url && typeof url === 'string') {
                if(url.match(/^([^:]+):\/\//i)) {
                    var re = /^([^:]+):\/\/([^\/]*)\/?([^\?#]*)\??([^#]*)#?(.*)/i;
                    if(url.match(re)) {
                        aURL.scheme   = url.replace(re, "$1");
                        aURL.host     = url.replace(re, "$2");
                        aURL.path     = '/'+url.replace(re, "$3");
                        aURL.query    = url.replace(re, "$4") || false;
                        aURL.fragment = url.replace(re, "$5") || false;
                    }
                } else {
                    var re1 = new RegExp("^([^\\?]+)\\?([^#]+)#(.*)", "i");
                    var re2 = new RegExp("^([^\\?]+)\\?([^#]+)#?", "i");
                    var re3 = new RegExp("^([^\\?]+)\\??", "i");
                    if(url.match(re1)) {
                        aURL.scheme   = false;
                        aURL.host     = false;
                        aURL.path     = url.replace(re1, "$1");
                        aURL.query    = url.replace(re1, "$2");
                        aURL.fragment = url.replace(re1, "$3");
                    } else if(url.match(re2)) {
                        aURL.scheme = false;
                        aURL.host   = false;
                        aURL.path   = url.replace(re2, "$1");
                        aURL.query  = url.replace(re2, "$2");
                        aURL.fragment = false;
                    } else if(url.match(re3)) {
                        aURL.scheme   = false;
                        aURL.host     = false;
                        aURL.path     = url.replace(re3, "$1");
                        aURL.query    = false;
                        aURL.fragment = false;
                    }
                }
                if(aURL.host) {
                    var regPort = /^(.*?)\\:(\\d+)$/i;
                    // check for port
                    if(aURL.host.match(regPort)) {
                        var tmpHost1 = aURL.host;
                        aURL.host = tmpHost1.replace(regPort, "$1");
                        aURL.port = tmpHost1.replace(regPort, "$2");
                    } else {
                        aURL.port = false;
                    }
                    // check for user and pass
                    if(aURL.host.match(/@/i)) {
                        var tmpHost2 = aURL.host;
                        aURL.host = tmpHost2.split('@')[1];
                        var tmpUserPass = tmpHost2.split('@')[0];
                        if(tmpUserPass.match(/\:/)) {
                            aURL.user = tmpUserPass.split(':')[0];
                            aURL.pass = tmpUserPass.split(':')[1];
                        } else {
                            aURL.user = tmpUserPass;
                            aURL.pass = false;
                        }
                    }
                }
            }
            return aURL;
        },

        /**
         * Take a URL object from Ink.Util.Url.parseUrl or a window.location
         * object and returns a URL string.
         *
         * @method format
         * @param urlObj window.location, a.href, or parseUrl object to format
         * @return {String} Full URL.
         */
        format: function (urlObj) {
            var protocol = '';
            var host = '';
            var path = '';
            var frag = '';
            var query = '';

            if (typeof urlObj.protocol === 'string') {
                protocol = urlObj.protocol + '//';  // here it comes with the colon
            } else if (typeof urlObj.scheme === 'string')  {
                protocol = urlObj.scheme + '://';
            }

            host = urlObj.host || urlObj.hostname || '';
            path = urlObj.path || '';

            if (typeof urlObj.query === 'string') {
                query = urlObj.query;
            } else if (typeof urlObj.search === 'string') {
                query = urlObj.search.replace(/^\?/, '');
            }
            if (typeof urlObj.fragment === 'string') {
                frag =  urlObj.fragment;
            } else if (typeof urlObj.hash === 'string') {
                frag = urlObj.hash.replace(/#$/, '');
            }

            return [
                protocol,
                host,
                path,
                query && '?' + query,
                frag && '#' + frag
            ].join('');
        },

        /**
         * Get last loaded script element
         *
         * @method currentScriptElement
         * @param {String} [match] String to match against the script src attribute
         * @return {DOMElement|Boolean} Returns the <script> DOM Element or false if unable to find it.
         * @public
         * @static
         */
        currentScriptElement: function(match)
        {
            var aScripts = document.getElementsByTagName('script');
            if(typeof(match) === 'undefined') {
                if(aScripts.length > 0) {
                    return aScripts[(aScripts.length - 1)];
                } else {
                    return false;
                }
            } else {
                var curScript = false;
                var re = new RegExp(""+match+"", "i");
                for(var i=0, total = aScripts.length; i < total; i++) {
                    curScript = aScripts[i];
                    if(re.test(curScript.src)) {
                        return curScript;
                    }
                }
                return false;
            }
        },

        
        /*
        base64Encode: function(string)
        {
            /**
         * --function {String} ?
         * --Convert a string to BASE 64
         * @param {String} string - string to convert
         * @return base64 encoded string
         *
         * 
            if(!SAPO.Utility.String || typeof(SAPO.Utility.String) === 'undefined') {
                throw "SAPO.Utility.Url.base64Encode depends of SAPO.Utility.String, which has not been referred.";
            }

            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            var input = SAPO.Utility.String.utf8Encode(string);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        base64Decode: function(string)
        {
         * --function {String} ?
         * Decode a BASE 64 encoded string
         * --param {String} string base64 encoded string
         * --return string decoded
            if(!SAPO.Utility.String || typeof(SAPO.Utility.String) === 'undefined') {
                throw "SAPO.Utility.Url.base64Decode depends of SAPO.Utility.String, which has not been referred.";
            }

            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            var input = string.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = SAPO.Utility.String.utf8Decode(output);
            return output;
        },
        */


        /**
         * Debug function ?
         *
         * @method _debug
         * @private
         * @static
         */
        _debug: function() {}

    };

    return Url;

});

/**
 * @module Ink.Util.Validator_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Validator', '1', [], function() {

    'use strict';

    /**
     * Set of functions to provide validation
     *
     * @class Ink.Util.Validator
     * @version 1
     * @static
     */
    var Validator = {

        /**
         * List of country codes avaible for isPhone function
         *
         * @property _countryCodes
         * @type {Array}
         * @private
         * @static
         * @readOnly
         */
        _countryCodes : [
                        'AO',
                        'CV',
                        'MZ',
                        'PT'
                    ],

        /**
         * International number for portugal
         *
         * @property _internacionalPT
         * @type {Number}
         * @private
         * @static
         * @readOnly
         *
         */
        _internacionalPT: 351,

        /**
         * List of all portuguese number prefixes
         *
         * @property _indicativosPT
         * @type {Object}
         * @private
         * @static
         * @readOnly
         *
         */
        _indicativosPT: {
                        21: 'lisboa',
                        22: 'porto',
                        231: 'mealhada',
                        232: 'viseu',
                        233: 'figueira da foz',
                        234: 'aveiro',
                        235: 'arganil',
                        236: 'pombal',
                        238: 'seia',
                        239: 'coimbra',
                        241: 'abrantes',
                        242: 'ponte de sôr',
                        243: 'santarém',
                        244: 'leiria',
                        245: 'portalegre',
                        249: 'torres novas',
                        251: 'valença',
                        252: 'vila nova de famalicão',
                        253: 'braga',
                        254: 'peso da régua',
                        255: 'penafiel',
                        256: 'são joão da madeira',
                        258: 'viana do castelo',
                        259: 'vila real',
                        261: 'torres vedras',
                        262: 'caldas da raínha',
                        263: 'vila franca de xira',
                        265: 'setúbal',
                        266: 'évora',
                        268: 'estremoz',
                        269: 'santiago do cacém',
                        271: 'guarda',
                        272: 'castelo branco',
                        273: 'bragança',
                        274: 'proença-a-nova',
                        275: 'covilhã',
                        276: 'chaves',
                        277: 'idanha-a-nova',
                        278: 'mirandela',
                        279: 'moncorvo',
                        281: 'tavira',
                        282: 'portimão',
                        283: 'odemira',
                        284: 'beja',
                        285: 'moura',
                        286: 'castro verde',
                        289: 'faro',
                        291: 'funchal, porto santo',
                        292: 'corvo, faial, flores, horta, pico',
                        295: 'angra do heroísmo, graciosa, são jorge, terceira',
                        296: 'ponta delgada, são miguel, santa maria',

                        91 : 'rede móvel 91 (Vodafone / Yorn)',
                        93 : 'rede móvel 93 (Optimus)',
                        96 : 'rede móvel 96 (TMN)',
                        92 : 'rede móvel 92 (TODOS)',
                        //925 : 'rede móvel 925 (TMN 925)',
                        //926 : 'rede móvel 926 (TMN 926)',
                        //927 : 'rede móvel 927 (TMN 927)',
                        //922 : 'rede móvel 922 (Phone-ix)',

                        707: 'número único',
                        760: 'número único',
                        800: 'número grátis',
                        808: 'chamada local',
                        30:  'voip'
                          },
        /**
         * International number for Cabo Verde
         *
         * @property _internacionalCV
         * @type {Number}
         * @private
         * @static
         * @readOnly
         */
        _internacionalCV: 238,

        /**
         * List of all Cabo Verde number prefixes
         *
         * @property _indicativosCV
         * @type {Object}
         * @private
         * @static
         * @readOnly
         */
        _indicativosCV: {
                        2: 'fixo',
                        91: 'móvel 91',
                        95: 'móvel 95',
                        97: 'móvel 97',
                        98: 'móvel 98',
                        99: 'móvel 99'
                    },
        /**
         * International number for angola
         *
         * @property _internacionalAO
         * @type {Number}
         * @private
         * @static
         * @readOnly
         */
        _internacionalAO: 244,

        /**
         * List of all Angola number prefixes
         *
         * @property _indicativosAO
         * @type {Object}
         * @private
         * @static
         * @readOnly
         */
        _indicativosAO: {
                        2: 'fixo',
                        91: 'móvel 91',
                        92: 'móvel 92'
                    },
        /**
         * International number for mozambique
         *
         * @property _internacionalMZ
         * @type {Number}
         * @private
         * @static
         * @readOnly
         */
        _internacionalMZ: 258,

        /**
         * List of all Mozambique number prefixes
         *
         * @property _indicativosMZ
         * @type {Object}
         * @private
         * @static
         * @readOnly
         */
        _indicativosMZ: {
                        2: 'fixo',
                        82: 'móvel 82',
                        84: 'móvel 84'
                    },

        /**
         * International number for Timor
         *
         * @property _internacionalTL
         * @type {Number}
         * @private
         * @static
         * @readOnly
         */
        _internacionalTL: 670,

        /**
         * List of all Timor number prefixes
         *
         * @property _indicativosTL
         * @type {Object}
         * @private
         * @static
         * @readOnly
         */
        _indicativosTL: {
                        3: 'fixo',
                        7: 'móvel 7'
                    },

        /**
         * Regular expression groups for several groups of characters
         *
         * http://en.wikipedia.org/wiki/C0_Controls_and_Basic_Latin
         * http://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane
         * http://en.wikipedia.org/wiki/ISO_8859-1
         *
         * @property _characterGroups
         * @type {Object}
         * @private
         * @static
         * @readOnly
         */
        _characterGroups: {
            numbers: ['0-9'],
            asciiAlpha: ['a-zA-Z'],
            latin1Alpha: ['a-zA-Z', '\u00C0-\u00FF'],
            unicodeAlpha: ['a-zA-Z', '\u00C0-\u00FF', '\u0100-\u1FFF', '\u2C00-\uD7FF'],
            /* whitespace characters */
            space: [' '],
            dash: ['-'],
            underscore: ['_'],
            nicknamePunctuation: ['_.-'],

            singleLineWhitespace: ['\t '],
            newline: ['\n'],
            whitespace: ['\t\n\u000B\f\r\u00A0 '],

            asciiPunctuation: ['\u0021-\u002F', '\u003A-\u0040', '\u005B-\u0060', '\u007B-\u007E'],
            latin1Punctuation: ['\u0021-\u002F', '\u003A-\u0040', '\u005B-\u0060', '\u007B-\u007E', '\u00A1-\u00BF', '\u00D7', '\u00F7'],
            unicodePunctuation: ['\u0021-\u002F', '\u003A-\u0040', '\u005B-\u0060', '\u007B-\u007E', '\u00A1-\u00BF', '\u00D7', '\u00F7', '\u2000-\u206F', '\u2E00-\u2E7F', '\u3000-\u303F']
        },

        /**
         * Create a regular expression for several character groups.
         *
         * @method createRegExp
         *
         * @param Groups... {Object}
         *  Groups to build regular expressions for. Possible keys are:
         *
         * - **numbers**: 0-9
         * - **asciiAlpha**: a-z, A-Z
         * - **latin1Alpha**: asciiAlpha, plus printable characters in latin-1
         * - **unicodeAlpha**: unicode alphanumeric characters.
         * - **space**: ' ', the space character.
         * - **dash**: dash character.
         * - **underscore**: underscore character.
         * - **nicknamePunctuation**: dash, dot, underscore
         * - **singleLineWhitespace**: space and tab (whitespace which only spans one line).
         * - **newline**: newline character ('\n')
         * - **whitespace**: whitespace characters in the ASCII character set.
         * - **asciiPunctuation**: punctuation characters in the ASCII character set.
         * - **latin1Punctuation**: punctuation characters in latin-1.
         * - **unicodePunctuation**: punctuation characters in unicode.
         *
         */
        createRegExp: function (groups) {
            var re = '^[';
            for (var key in groups) if (groups.hasOwnProperty(key)) {
                if (!(key in Validator._characterGroups)) {
                    throw new Error('group ' + key + ' is not a valid character group');
                } else if (groups[key]) {
                    re += Validator._characterGroups[key].join('');
                }
            }
            return new RegExp(re + ']*?$');
        },

        /**
         * Checks if a field has the required groups. Takes an options object for further configuration.
         *
         * @method checkCharacterGroups
         * @param {String}  s               The validation string
         * @param {Object}  [groups={}]     What groups are included.
         *  @param [options.*]              See createRegexp
         */
        checkCharacterGroups: function (s, groups) {
            return Validator.createRegExp(groups).test(s);
        },

        /**
         * Checks whether a field contains unicode printable characters. Takes an
         * options object for further configuration
         *
         * @method unicode
         * @param {String}  s               The validation string
         * @param {Object}  [options={}]    Optional configuration object
         *  @param [options.*]              See createRegexp
         */
        unicode: function (s, options) {
            return Validator.checkCharacterGroups(s, Ink.extendObj({
                unicodeAlpha: true}, options));
        },

        /**
         * Checks that a field only contains only latin-1 alphanumeric
         * characters. Takes options for allowing singleline whitespace,
         * cross-line whitespace and punctuation.
         *
         * @method latin1
         *
         * @param {String}  s               The validation string
         * @param {Object}  [options={}]    Optional configuration object
         *  @param [options.*]              See createRegexp
         */
        latin1: function (s, options) {
            return Validator.checkCharacterGroups(s, Ink.extendObj({
                latin1Alpha: true}, options));
        },

        /**
         * Checks that a field only contains only ASCII alphanumeric
         * characters. Takes options for allowing singleline whitespace,
         * cross-line whitespace and punctuation.
         *
         * @method ascii
         *
         * @param {String}  s               The validation string
         * @param {Object}  [options={}]    Optional configuration object
         *  @param [options.*]              See createRegexp
         */
        ascii: function (s, options) {
            return Validator.checkCharacterGroups(s, Ink.extendObj({
                asciiAlpha: true}, options));
        },

        /**
         * Checks that the number is a valid number
         *
         * @method number
         * @param {String} numb         The number
         * @param {Object} [options]    Further options
         *  @param  [options.decimalSep='.']    Allow decimal separator.
         *  @param  [options.thousandSep=","]   Strip this character from the number.
         *  @param  [options.negative=false]    Allow negative numbers.
         *  @param  [options.decimalPlaces=null]   Maximum number of decimal places. Use `0` for an integer number.
         *  @param  [options.max=null]          Maximum number
         *  @param  [options.min=null]          Minimum number
         *  @param  [options.returnNumber=false] When this option is true, return the number itself when the value is valid.
         */
        number: function (numb, inOptions) {
            numb = numb + '';
            var options = Ink.extendObj({
                decimalSep: '.',
                thousandSep: '',
                negative: true,
                decimalPlaces: null,
                maxDigits: null,
                max: null,
                min: null,
                returnNumber: false
            }, inOptions || {});
            // smart recursion thing sets up aliases for options.
            if (options.thousandSep) {
                numb = numb.replace(new RegExp('\\' + options.thousandSep, 'g'), '');
                options.thousandSep = '';
                return Validator.number(numb, options);
            }
            if (options.negative === false) {
                options.min = 0;
                options.negative = true;
                return Validator.number(numb, options);
            }
            if (options.decimalSep !== '.') {
                numb = numb.replace(new RegExp('\\' + options.decimalSep, 'g'), '.');
            }

            if (!/^(-)?(\d+)?(\.\d+)?$/.test(numb) || numb === '') {
                return false;  // forbidden character found
            }
            
            var split;
            if (options.decimalSep && numb.indexOf(options.decimalSep) !== -1) {
                split = numb.split(options.decimalSep);
                if (options.decimalPlaces !== null &&
                        split[1].length > options.decimalPlaces) {
                    return false;
                }
            } else {
                split = ['' + numb, ''];
            }
            
            if (options.maxDigits!== null) {
                if (split[0].replace(/-/g, '').length > options.maxDigits) {
                    return split;
                }
            }
            
            // Now look at the actual float
            var ret = parseFloat(numb);
            
            if (options.maxExcl !== null && ret >= options.maxExcl ||
                    options.minExcl !== null && ret <= options.minExcl) {
                return false;
            }
            if (options.max !== null && ret > options.max ||
                    options.min !== null && ret < options.min) {
                return false;
            }
            
            if (options.returnNumber) {
                return ret;
            } else {
                return true;
            }
        },

        /**
         * Checks if a year is Leap "Bissexto"
         *
         * @method _isLeapYear
         * @param {Number} year Year to be checked
         * @return {Boolean} True if it is a leap year.
         * @private
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator._isLeapYear( 2004 ) ); // Result: true
         *         console.log( InkValidator._isLeapYear( 2006 ) ); // Result: false
         *     });
         */
        _isLeapYear: function(year){

            var yearRegExp = /^\d{4}$/;

            if(yearRegExp.test(year)){
                return ((year%4) ? false: ((year%100) ? true : ((year%400)? false : true)) );
            }

            return false;
        },

        /**
         * Object with the date formats available for validation
         *
         * @property _dateParsers
         * @type {Object}
         * @private
         * @static
         * @readOnly
         */
        _dateParsers: {
            'yyyy-mm-dd': {day:5, month:3, year:1, sep: '-', parser: /^(\d{4})(\-)(\d{1,2})(\-)(\d{1,2})$/},
            'yyyy/mm/dd': {day:5, month:3, year:1, sep: '/', parser: /^(\d{4})(\/)(\d{1,2})(\/)(\d{1,2})$/},
            'yy-mm-dd': {day:5, month:3, year:1, sep: '-', parser: /^(\d{2})(\-)(\d{1,2})(\-)(\d{1,2})$/},
            'yy/mm/dd': {day:5, month:3, year:1, sep: '/', parser: /^(\d{2})(\/)(\d{1,2})(\/)(\d{1,2})$/},
            'dd-mm-yyyy': {day:1, month:3, year:5, sep: '-', parser: /^(\d{1,2})(\-)(\d{1,2})(\-)(\d{4})$/},
            'dd/mm/yyyy': {day:1, month:3, year:5, sep: '/', parser: /^(\d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/},
            'dd-mm-yy': {day:1, month:3, year:5, sep: '-', parser: /^(\d{1,2})(\-)(\d{1,2})(\-)(\d{2})$/},
            'dd/mm/yy': {day:1, month:3, year:5, sep: '/', parser: /^(\d{1,2})(\/)(\d{1,2})(\/)(\d{2})$/}
        },

        /**
         * Calculates the number of days in a given month of a given year
         *
         * @method _daysInMonth
         * @param {Number} _m - month (1 to 12)
         * @param {Number} _y - year
         * @return {Number} Returns the number of days in a given month of a given year
         * @private
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator._daysInMonth( 2, 2004 ) ); // Result: 29
         *         console.log( InkValidator._daysInMonth( 2, 2006 ) ); // Result: 28
         *     });
         */
        _daysInMonth: function(_m,_y){
            var nDays=0;

            _m = parseInt(_m, 10);
            _y = parseInt(_y, 10);

            if(_m===1 || _m===3 || _m===5 || _m===7 || _m===8 || _m===10 || _m===12) {
                nDays= 31;
            } else if ( _m===4 || _m===6 || _m===9 || _m===11) {
                nDays = 30;
            } else if (_m===2) {
                if((_y%400===0) || (_y%4===0 && _y%100!==0)) {
                    nDays = 29;
                } else {
                    nDays = 28;
                }
            }

            return nDays;
        },



        /**
         * Checks if a date is valid
         *
         * @method _isValidDate
         * @param {Number} year
         * @param {Number} month
         * @param {Number} day
         * @return {Boolean} True if it's a valid date
         * @private
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator._isValidDate( 2004, 2, 29 ) ); // Result: true
         *         console.log( InkValidator._isValidDate( 2006, 2, 29 ) ); // Result: false
         *     });
         */
        _isValidDate: function(year, month, day){

            var yearRegExp = /^\d{4}$/;
            var validOneOrTwo = /^\d{1,2}$/;
            if(yearRegExp.test(year) && validOneOrTwo.test(month) && validOneOrTwo.test(day)){
                if(month>=1 && month<=12 && day>=1 && this._daysInMonth(month,year)>=day){
                    return true;
                }
            }

            return false;
        },

        /**
         * Checks if a email is valid
         *
         * @method mail
         * @param {String} email
         * @return {Boolean} True if it's a valid e-mail
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.email( 'agfsdfgfdsgdsf' ) ); // Result: false
         *         console.log( InkValidator.email( 'inkdev\u0040sapo.pt' ) ); // Result: true (where \u0040 is at sign)
         *     });
         */
        email: function(email)
        {
            var emailValido = new RegExp("^[_a-z0-9-]+((\\.|\\+)[_a-z0-9-]+)*@([\\w]*-?[\\w]*\\.)+[a-z]{2,4}$", "i");
            if(!emailValido.test(email)) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * Deprecated. Alias for email(). Use it instead.
         *
         * @method mail
         * @public
         * @static
         */
        mail: function (mail) { return Validator.email(mail); },

        /**
         * Checks if a url is valid
         *
         * @method url
         * @param {String} url URL to be checked
         * @param {Boolean} [full] If true, validates a full URL (one that should start with 'http')
         * @return {Boolean} True if the given URL is valid
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.url( 'www.sapo.pt' ) );                // Result: true
         *         console.log( InkValidator.url( 'http://www.sapo.pt', true ) );   // Result: true
         *         console.log( InkValidator.url( 'meh' ) );                        // Result: false
         *     });
         */
        url: function(url, full)
        {
            if(typeof full === "undefined" || full === false) {
                var reHTTP = new RegExp("(^(http\\:\\/\\/|https\\:\\/\\/)(.+))", "i");
                if(reHTTP.test(url) === false) {
                    url = 'http://'+url;
                }
            }

            var reUrl = new RegExp("^(http:\\/\\/|https:\\/\\/)([\\w]*(-?[\\w]*)*\\.)+[a-z]{2,4}", "i");
            if(reUrl.test(url) === false) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * Checks if a phone is valid in Portugal
         *
         * @method isPTPhone
         * @param {Number} phone Phone number to be checked
         * @return {Boolean} True if it's a valid Portuguese Phone
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isPTPhone( '213919264' ) );        // Result: true
         *         console.log( InkValidator.isPTPhone( '00351213919264' ) );   // Result: true
         *         console.log( InkValidator.isPTPhone( '+351213919264' ) );    // Result: true
         *         console.log( InkValidator.isPTPhone( '1' ) );                // Result: false
         *     });
         */
        isPTPhone: function(phone)
        {

            phone = phone.toString();
            var aInd = [];
            for(var i in this._indicativosPT) {
                if(typeof(this._indicativosPT[i]) === 'string') {
                    aInd.push(i);
                }
            }
            var strInd = aInd.join('|');

            var re351 = /^(00351|\+351)/;
            if(re351.test(phone)) {
                phone = phone.replace(re351, "");
            }

            var reSpecialChars = /(\s|\-|\.)+/g;
            phone = phone.replace(reSpecialChars, '');
            //var reInt = new RegExp("\\d", "i");
            var reInt = /[\d]{9}/i;
            if(phone.length === 9 && reInt.test(phone)) {
                var reValid = new RegExp("^("+strInd+")");
                if(reValid.test(phone)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Alias function for isPTPhone
         *
         * @method isPortuguesePhone
         * @param {Number} phone Phone number to be checked
         * @return {Boolean} True if it's a valid Portuguese Phone
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isPortuguesePhone( '213919264' ) );        // Result: true
         *         console.log( InkValidator.isPortuguesePhone( '00351213919264' ) );   // Result: true
         *         console.log( InkValidator.isPortuguesePhone( '+351213919264' ) );    // Result: true
         *         console.log( InkValidator.isPortuguesePhone( '1' ) );                // Result: false
         *     });
         */
        isPortuguesePhone: function(phone)
        {
            return this.isPTPhone(phone);
        },

        /**
         * Checks if a phone is valid in Cabo Verde
         *
         * @method isCVPhone
         * @param {Number} phone Phone number to be checked
         * @return {Boolean} True if it's a valid Cape Verdean Phone
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isCVPhone( '2610303' ) );        // Result: true
         *         console.log( InkValidator.isCVPhone( '002382610303' ) );   // Result: true
         *         console.log( InkValidator.isCVPhone( '+2382610303' ) );    // Result: true
         *         console.log( InkValidator.isCVPhone( '1' ) );              // Result: false
         *     });
         */
        isCVPhone: function(phone)
        {
            phone = phone.toString();
            var aInd = [];
            for(var i in this._indicativosCV) {
                if(typeof(this._indicativosCV[i]) === 'string') {
                    aInd.push(i);
                }
            }
            var strInd = aInd.join('|');

            var re238 = /^(00238|\+238)/;
            if(re238.test(phone)) {
                phone = phone.replace(re238, "");
            }

            var reSpecialChars = /(\s|\-|\.)+/g;
            phone = phone.replace(reSpecialChars, '');
            //var reInt = new RegExp("\\d", "i");
            var reInt = /[\d]{7}/i;
            if(phone.length === 7 && reInt.test(phone)) {
                var reValid = new RegExp("^("+strInd+")");
                if(reValid.test(phone)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Checks if a phone is valid in Angola
         *
         * @method isAOPhone
         * @param {Number} phone Phone number to be checked
         * @return {Boolean} True if it's a valid Angolan Phone
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isAOPhone( '244222396385' ) );     // Result: true
         *         console.log( InkValidator.isAOPhone( '00244222396385' ) );   // Result: true
         *         console.log( InkValidator.isAOPhone( '+244222396385' ) );    // Result: true
         *         console.log( InkValidator.isAOPhone( '1' ) );                // Result: false
         *     });
         */
        isAOPhone: function(phone)
        {

            phone = phone.toString();
            var aInd = [];
            for(var i in this._indicativosAO) {
                if(typeof(this._indicativosAO[i]) === 'string') {
                    aInd.push(i);
                }
            }
            var strInd = aInd.join('|');

            var re244 = /^(00244|\+244)/;
            if(re244.test(phone)) {
                phone = phone.replace(re244, "");
            }

            var reSpecialChars = /(\s|\-|\.)+/g;
            phone = phone.replace(reSpecialChars, '');
            //var reInt = new RegExp("\\d", "i");
            var reInt = /[\d]{9}/i;
            if(phone.length === 9 && reInt.test(phone)) {
                var reValid = new RegExp("^("+strInd+")");
                if(reValid.test(phone)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Checks if a phone is valid in Mozambique
         *
         * @method isMZPhone
         * @param {Number} phone Phone number to be checked
         * @return {Boolean} True if it's a valid Mozambican Phone
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isMZPhone( '21426861' ) );        // Result: true
         *         console.log( InkValidator.isMZPhone( '0025821426861' ) );   // Result: true
         *         console.log( InkValidator.isMZPhone( '+25821426861' ) );    // Result: true
         *         console.log( InkValidator.isMZPhone( '1' ) );              // Result: false
         *     });
         */
        isMZPhone: function(phone)
        {

            phone = phone.toString();
            var aInd = [];
            for(var i in this._indicativosMZ) {
                if(typeof(this._indicativosMZ[i]) === 'string') {
                    aInd.push(i);
                }
            }
            var strInd = aInd.join('|');
            var re258 = /^(00258|\+258)/;
            if(re258.test(phone)) {
                phone = phone.replace(re258, "");
            }

            var reSpecialChars = /(\s|\-|\.)+/g;
            phone = phone.replace(reSpecialChars, '');
            //var reInt = new RegExp("\\d", "i");
            var reInt = /[\d]{8,9}/i;
            if((phone.length === 9 || phone.length === 8) && reInt.test(phone)) {
                var reValid = new RegExp("^("+strInd+")");
                if(reValid.test(phone)) {
                   if(phone.indexOf('2') === 0 && phone.length === 8) {
                       return true;
                   } else if(phone.indexOf('8') === 0 && phone.length === 9) {
                       return true;
                   }
                }
            }

            return false;
        },

        /**
         * Checks if a phone is valid in Timor
         *
         * @method isTLPhone
         * @param {Number} phone Phone number to be checked
         * @return {Boolean} True if it's a valid phone from Timor-Leste
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isTLPhone( '6703331234' ) );     // Result: true
         *         console.log( InkValidator.isTLPhone( '006703331234' ) );   // Result: true
         *         console.log( InkValidator.isTLPhone( '+6703331234' ) );    // Result: true
         *         console.log( InkValidator.isTLPhone( '1' ) );              // Result: false
         *     });
         */
        isTLPhone: function(phone)
        {

            phone = phone.toString();
            var aInd = [];
            for(var i in this._indicativosTL) {
                if(typeof(this._indicativosTL[i]) === 'string') {
                    aInd.push(i);
                }
            }
            var strInd = aInd.join('|');
            var re670 = /^(00670|\+670)/;
            if(re670.test(phone)) {
                phone = phone.replace(re670, "");
            }


            var reSpecialChars = /(\s|\-|\.)+/g;
            phone = phone.replace(reSpecialChars, '');
            //var reInt = new RegExp("\\d", "i");
            var reInt = /[\d]{7}/i;
            if(phone.length === 7 && reInt.test(phone)) {
                var reValid = new RegExp("^("+strInd+")");
                if(reValid.test(phone)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Validates the function in all country codes available or in the ones set in the second param
         *
         * @method isPhone
         * @param {String} phone number
         * @param {optional String|Array}  country or array of countries to validate
         * @return {Boolean} True if it's a valid phone in any country available
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isPhone( '6703331234' ) );        // Result: true
         *     });
         */
        isPhone: function(){
            var index;

            if(arguments.length===0){
                return false;
            }

            var phone = arguments[0];

            if(arguments.length>1){
                if(arguments[1].constructor === Array){
                    var func;
                    for(index=0; index<arguments[1].length; index++ ){
                        if(typeof(func=this['is' + arguments[1][index].toUpperCase() + 'Phone'])==='function'){
                            if(func(phone)){
                                return true;
                            }
                        } else {
                            throw "Invalid Country Code!";
                        }
                    }
                } else if(typeof(this['is' + arguments[1].toUpperCase() + 'Phone'])==='function'){
                    return this['is' + arguments[1].toUpperCase() + 'Phone'](phone);
                } else {
                    throw "Invalid Country Code!";
                }
            } else {
                for(index=0; index<this._countryCodes.length; index++){
                    if(this['is' + this._countryCodes[index] + 'Phone'](phone)){
                        return true;
                    }
                }
            }
            return false;
        },

        /**
         * Validates if a zip code is valid in Portugal
         *
         * @method codPostal
         * @param {Number|String} cp1
         * @param {optional Number|String} cp2
         * @param {optional Boolean} returnBothResults
         * @return {Boolean} True if it's a valid zip code
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.codPostal( '1069', '300' ) );        // Result: true
         *         console.log( InkValidator.codPostal( '1069', '300', true ) );  // Result: [true, true]
         *     });
         *
         */
        codPostal: function(cp1,cp2,returnBothResults){


            var cPostalSep = /^(\s*\-\s*|\s+)$/;
            var trim = /^\s+|\s+$/g;
            var cPostal4 = /^[1-9]\d{3}$/;
            var cPostal3 = /^\d{3}$/;
            var parserCPostal = /^(.{4})(.*)(.{3})$/;


            returnBothResults = !!returnBothResults;

            cp1 = cp1.replace(trim,'');
            if(typeof(cp2)!=='undefined'){
                cp2 = cp2.replace(trim,'');
                if(cPostal4.test(cp1) && cPostal3.test(cp2)){
                    if( returnBothResults === true ){
                        return [true, true];
                    } else {
                        return true;
                    }
                }
            } else {
                if(cPostal4.test(cp1) ){
                    if( returnBothResults === true ){
                        return [true,false];
                    } else {
                        return true;
                    }
                }

                var cPostal = cp1.match(parserCPostal);

                if(cPostal!==null && cPostal4.test(cPostal[1]) && cPostalSep.test(cPostal[2]) && cPostal3.test(cPostal[3])){
                    if( returnBothResults === true ){
                        return [true,false];
                    } else {
                        return true;
                    }
                }
            }

            if( returnBothResults === true ){
                return [false,false];
            } else {
                return false;
            }
        },

        /**
         * Checks is a date is valid in a given format
         *
         * @method isDate
         * @param {String} format - defined in _dateParsers
         * @param {String} dateStr - date string
         * @return {Boolean} True if it's a valid date and in the specified format
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isDate( 'yyyy-mm-dd', '2012-05-21' ) );        // Result: true
         *     });
         */
        isDate: function(format, dateStr){



            if(typeof(this._dateParsers[format])==='undefined'){
                return false;
            }
            var yearIndex = this._dateParsers[format].year;
            var monthIndex = this._dateParsers[format].month;
            var dayIndex = this._dateParsers[format].day;
            var dateParser = this._dateParsers[format].parser;
            var separator = this._dateParsers[format].sep;

            /* Trim Deactivated
            * var trim = /^\w+|\w+$/g;
            * dateStr = dateStr.replace(trim,"");
            */
            var data = dateStr.match(dateParser);
            if(data!==null){
                /* Trim Deactivated
                * for(i=1;i<=data.length;i++){
                *   data[i] = data[i].replace(trim,"");
                *}
                */
                if(data[2]===data[4] && data[2]===separator){

                    var _y = ((data[yearIndex].length===2) ? "20" + data[yearIndex].toString() : data[yearIndex] );

                    if(this._isValidDate(_y,data[monthIndex].toString(),data[dayIndex].toString())){
                        return true;
                    }
                }
            }


            return false;
        },

        /**
         * Checks if a string is a valid color
         *
         * @method isColor
         * @param {String} str Color string to be checked
         * @return {Boolean} True if it's a valid color string
         * @public
         * @static
         * @example
         *     Ink.requireModules(['Ink.Util.Validator_1'], function( InkValidator ){
         *         console.log( InkValidator.isColor( '#FF00FF' ) );        // Result: true
         *         console.log( InkValidator.isColor( 'amdafasfs' ) );      // Result: false
         *     });
         */
        isColor: function(str){
            var match, valid = false,
                keyword = /^[a-zA-Z]+$/,
                hexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
                rgb = /^rgb\(\s*([0-9]{1,3})(%)?\s*,\s*([0-9]{1,3})(%)?\s*,\s*([0-9]{1,3})(%)?\s*\)$/,
                rgba = /^rgba\(\s*([0-9]{1,3})(%)?\s*,\s*([0-9]{1,3})(%)?\s*,\s*([0-9]{1,3})(%)?\s*,\s*(1(\.0)?|0(\.[0-9])?)\s*\)$/,
                hsl = /^hsl\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(%)?\s*,\s*([0-9]{1,3})(%)?\s*\)$/,
                hsla = /^hsla\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(%)?\s*,\s*([0-9]{1,3})(%)?\s*,\s*(1(\.0)?|0(\.[0-9])?)\s*\)$/;

            // rgb(123, 123, 132) 0 to 255
            // rgb(123%, 123%, 123%) 0 to 100
            // rgba( 4 vals) last val: 0 to 1.0
            // hsl(0 to 360, %, %)
            // hsla( ..., 0 to 1.0)

            if(
                keyword.test(str) ||
                hexa.test(str)
            ){
                return true;
            }

            var i;

            // rgb range check
            if((match = rgb.exec(str)) !== null || (match = rgba.exec(str)) !== null){
                i = match.length;

                while(i--){
                    // check percentage values
                    if((i===2 || i===4 || i===6) && typeof match[i] !== "undefined" && match[i] !== ""){
                        if(typeof match[i-1] !== "undefined" && match[i-1] >= 0 && match[i-1] <= 100){
                            valid = true;
                        } else {
                            return false;
                        }
                    }
                    // check 0 to 255 values
                    if(i===1 || i===3 || i===5 && (typeof match[i+1] === "undefined" || match[i+1] === "")){
                        if(typeof match[i] !== "undefined" && match[i] >= 0 && match[i] <= 255){
                            valid = true;
                        } else {
                            return false;
                        }
                    }
                }
            }

            // hsl range check
            if((match = hsl.exec(str)) !== null || (match = hsla.exec(str)) !== null){
                i = match.length;
                while(i--){
                    // check percentage values
                    if(i===3 || i===5){
                        if(typeof match[i-1] !== "undefined" && typeof match[i] !== "undefined" && match[i] !== "" &&
                        match[i-1] >= 0 && match[i-1] <= 100){
                            valid = true;
                        } else {
                            return false;
                        }
                    }
                    // check 0 to 360 value
                    if(i===1){
                        if(typeof match[i] !== "undefined" && match[i] >= 0 && match[i] <= 360){
                            valid = true;
                        } else {
                            return false;
                        }
                    }
                }
            }

            return valid;
        },

        /**
         * Checks if the value is a valid IP. Supports ipv4 and ipv6
         *
         * @method validationFunctions.ip
         * @param  {String} value   Value to be checked
         * @param  {String} ipType Type of IP to be validated. The values are: ipv4, ipv6. By default is ipv4.
         * @return {Boolean}         True if the value is a valid IP address. False if not.
         */
        isIP: function( value, ipType ){
            if( typeof value !== 'string' ){
                return false;
            }

            ipType = (ipType || 'ipv4').toLowerCase();

            switch( ipType ){
                case 'ipv4':
                    return (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).test(value);
                case 'ipv6':
                    return (/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/).test(value);
                default:
                    return false;
            }
        },

        /**
         * Credit Card specifications, to be used in the credit card verification.
         *
         * @property _creditCardSpecs
         * @type {Object}
         * @private
         */
        _creditCardSpecs: {
            'default': {
                'length': '13,14,15,16,17,18,19',
                'prefix': /^.+/,
                'luhn': true
            },

            'american express': {
                'length': '15',
                'prefix': /^3[47]/,
                'luhn'  : true
            },

            'diners club': {
                'length': '14,16',
                'prefix': /^36|55|30[0-5]/,
                'luhn'  : true
            },

            'discover': {
                'length': '16',
                'prefix': /^6(?:5|011)/,
                'luhn'  : true
            },

            'jcb': {
                'length': '15,16',
                'prefix': /^3|1800|2131/,
                'luhn'  : true
            },

            'maestro': {
                'length': '16,18',
                'prefix': /^50(?:20|38)|6(?:304|759)/,
                'luhn'  : true
            },

            'mastercard': {
                'length': '16',
                'prefix': /^5[1-5]/,
                'luhn'  : true
            },

            'visa': {
                'length': '13,16',
                'prefix': /^4/,
                'luhn'  : true
            }
        },

        /**
         * Luhn function, to be used when validating credit cards
         *
         */
        _luhn: function (num){

            num = parseInt(num,10);

            if ( (typeof num !== 'number') && (num % 1 !== 0) ){
                // Luhn can only be used on nums!
                return false;
            }

            num = num+'';
            // Check num length
            var length = num.length;

            // Checksum of the card num
            var
                i, checksum = 0
            ;

            for (i = length - 1; i >= 0; i -= 2)
            {
                // Add up every 2nd digit, starting from the right
                checksum += parseInt(num.substr(i, 1),10);
            }

            for (i = length - 2; i >= 0; i -= 2)
            {
                // Add up every 2nd digit doubled, starting from the right
                var dbl = parseInt(num.substr(i, 1) * 2,10);

                // Subtract 9 from the dbl where value is greater than 10
                checksum += (dbl >= 10) ? (dbl - 9) : dbl;
            }

            // If the checksum is a multiple of 10, the number is valid
            return (checksum % 10 === 0);
        },

        /**
         * Validates if a number is of a specific credit card
         *
         * @param  {String}  num            Number to be validates
         * @param  {String|Array}  creditCardType Credit card type. See _creditCardSpecs for the list of supported values.
         * @return {Boolean}
         */
        isCreditCard: function(num, creditCardType){

            if ( /\d+/.test(num) === false ){
                return false;
            }

            if ( typeof creditCardType === 'undefined' ){
                creditCardType = 'default';
            }
            else if ( creditCardType instanceof Array ){
                var i, ccLength = creditCardType.length;
                for ( i=0; i < ccLength; i++ ){
                    // Test each type for validity
                    if (this.isCreditCard(num, creditCardType[i]) ){
                        return true;
                    }
                }

                return false;
            }

            // Check card type
            creditCardType = creditCardType.toLowerCase();

            if ( typeof this._creditCardSpecs[creditCardType] === 'undefined' ){
                return false;
            }

            // Check card number length
            var length = num.length+'';

            // Validate the card length by the card type
            if ( this._creditCardSpecs[creditCardType]['length'].split(",").indexOf(length) === -1 ){
                return false;
            }

            // Check card number prefix
            if ( !this._creditCardSpecs[creditCardType]['prefix'].test(num) ){
                return false;
            }

            // No Luhn check required
            if (this._creditCardSpecs[creditCardType]['luhn'] === false){
                return true;
            }

            return this._luhn(num);
        }
    };

    return Validator;

});
/**
 * @module Ink.UI.Animate_1
 * @author inkdev AT sapo.pt
 * @version 1
 */

Ink.createModule('Ink.UI.Animate', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1'], function (Common, InkEvent, Css) {
    'use strict';

    var animationPrefix = (function (el) {
        return ('animationName' in el.style) ? 'animation' :
               ('oAnimationName' in el.style) ? 'oAnimation' :
               ('msAnimationName' in el.style) ? 'msAnimation' :
               ('webkitAnimationName' in el.style) ? 'webkitAnimation' : null;
    }(document.createElement('div')));

    var animationEndEventName = {
        animation: 'animationend',
        oAnimation: 'oanimationend',
        msAnimation: 'MSAnimationEnd',
        webkitAnimation: 'webkitAnimationEnd'
    }[animationPrefix];

    /**
     * @class Ink.UI.Animate_1
     * @constructor
     *
     * @param element {DOMElement} animated element
     * @param options {Object} options object
     * @param options.animation {String} animation name
     * @param [options.duration=medium] {String|Number} duration name (fast|medium|slow) or duration in ms
     * @param [options.removeClass=true] {Boolean} Whether to remove the `animation` class when finished animating
     * @param [options.onEnd=null] {Function} callback for animation end
     *
     * @example
     *
     *     <button id="animate-me" class="ink-button">Animate me!</button>
     *     <span class="ink-label info ink-animate"
     *         id="animated"
     *         data-trigger="#animate-me"
     *         data-animation="fadeOut"
     *         data-removeClass="false">Hi!</span>    
     *
     *     <script type="text/javascript">
     *         // Note: this step is not necessary if you are using autoload.js
     *         Ink.requireModules(['Ink.UI.Animate_1'], function (Animate) {
     *             new Animate('#animated');
     *         });
     *     </script>
     *
     **/
    function Animate(elOrSelector, options) {
        this._element = Common.elOrSelector(elOrSelector);
        this._options = Common.options({
            trigger: ['Element', null],
            duration: ['String', 'slow'],  // Actually a string with a duration name, or a number of ms
            animation: ['String'],
            removeClass: ['Boolean', true],
            onEnd: ['Function', function () {}]
        }, options || {}, this._element);

        if (!isNaN(parseInt(this._options.duration, 10))) {
            this._options.duration = parseInt(this._options.duration, 10);
        }

        if (this._options.trigger) {
            InkEvent.observe(this._options.trigger, 'click', Ink.bind(function () {
                this.animate();
            }, this));  // later
        } else {
            this.animate();
        }
    }

    Animate.prototype.animate = function () {
        Animate.animate(this._element, this._options.animation, this._options);
    };

    Ink.extendObj(Animate, {
        /**
         * Prefix for CSS animation-related properties in this browser.
         *
         * @property _animationPrefix
         * @private
         **/
        _animationPrefix: animationPrefix,

        /**
         * Whether CSS3 animation is supported in this browser.
         *
         * @property {Boolean} animationSupported
         **/
        animationSupported: !!animationPrefix,

        /**
         * The correct event for the animationend event in this browser, with the correct prefix
         *
         * @property {String} animationEndEventName
         **/
        animationEndEventName: animationEndEventName,

        /**
         * Animate a div using one of the animate.css classes
         *
         * **Note: This is a utility method inside the `Animate` class, which you can access through `Animate.animate()`. Do not mix these up.**
         *
         * @example
         *
         *      Animate.animate(myDiv, 'shake', {
         *          onEnd: function () {
         *              alert('Finished shaking!');
         *          }
         *      });
         *
         * @static
         * @method animate
         * @param element {DOMElement} animated element
         * @param animation {String} animation name
         * @param [options] {Object}
         *     @param [options.onEnd=null] {Function} callback for animation end
         *     @param [options.removeClass=false] {Boolean} whether to remove the Css class when finished
         *     @param [options.duration=medium] {String|Number} duration name (fast|medium|slow) or duration in ms
         **/
        animate: function (element, animation, options) {
            element = Common.elOrSelector(element);

            if (typeof options === 'number' || typeof options === 'string') {
                options = { duration: options };
            }

            if (typeof arguments[3] === 'function') {
                options.onEnd = arguments[3];
            }

            if (typeof options.duration !== 'number' && typeof options.duration !== 'string') {
                options.duration = 400;
            }

            if (!Animate.animationSupported) {
                if (options.onEnd) {
                    setTimeout(function () {
                        options.onEnd(null);
                    }, 0);
                }
                return;
            }

            if (typeof options.duration === 'number') {
                element.style[animationPrefix + 'Duration'] = options.duration + 'ms';
            } else if (typeof options.duration === 'string') {
                Css.addClassName(element, options.duration);
            }

            Css.addClassName(element, ['animated', animation]);

            function onAnimationEnd(event) {
                if (event.target !== element) { return; }
                if (event.animationName !== animation) { return; }
                if (options.onEnd) { options.onEnd(event); }
                if (options.removeClass) {
                    Css.removeClassName(element, animation);
                }
                if (typeof options.duration === 'string') {
                    Css.removeClassName(element, options.duration);
                }
                element.removeEventListener(animationEndEventName, onAnimationEnd, false);
            }

            element.addEventListener(animationEndEventName, onAnimationEnd, false);
        }
    });

    return Animate;
});


/**
 * @module Ink.UI.Carousel_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Carousel', '1',
    ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1', 'Ink.Dom.Element_1', 'Ink.UI.Pagination_1', 'Ink.Dom.Browser_1', 'Ink.Dom.Selector_1'],
    function(Common, InkEvent, Css, InkElement, Pagination, Browser/*, Selector*/) {
    'use strict';

    /*
     * TODO:
     *  keyboardSupport
     */

    function limitRange(n, min, max) {
        return Math.min(max, Math.max(min, n));
    }

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (cb) {return setTimeout(cb, 1000 / 30); };

    /**
     * @class Ink.UI.Carousel_1
     * @constructor
     *
     * @param {String|DOMElement} selector
     * @param {Object} [options]
     *  @param {Integer} [autoAdvance=0] The number of milliseconds to wait between auto-advancing pages. Set to 0 to disable auto-advance.
     *  @param {String} [options.axis='x'] Can be `'x'` or `'y'`, for a horizontal or vertical carousel
     *  @param {Boolean} [options.center=false] Center the carousel.
     *  @param {Number} [options.initialPage=0] When initialized, set the page to this.
     *  @TODO @param {Boolean} [options.keyboardSupport=false] Enable keyboard support
     *  @param {Boolean} [options.swipe=true] Enable swipe support where available
     *  @param {String|DOMElement|Ink.UI.Pagination_1} [options.pagination] Either an `<ul>` element to add pagination markup to, or an `Ink.UI.Pagination` instance to use.
     *  @param {Function} [options.onChange] Callback for when the page is changed.
     */
    var Carousel = function(selector, options) {
        this._handlers = {
            paginationChange: Ink.bindMethod(this, '_onPaginationChange'),
            windowResize:     InkEvent.throttle(Ink.bindMethod(this, 'refit'), 200)
        };

        InkEvent.observe(window, 'resize', this._handlers.windowResize);

        var element = this._element = Common.elOrSelector(selector, '1st argument');

        var opts = this._options = Common.options({
            autoAdvance:    ['Integer', 0],
            axis:           ['String', 'x'],
            initialPage:    ['Integer', 0],
            hideLast:       ['Boolean', false],
            center:         ['Boolean', false],
            keyboardSupport:['Boolean', false],
            pagination:     ['String', null],
            onChange:       ['Function', null],
            swipe:          ['Boolean', true]
            // TODO exponential swipe
            // TODO specify break point for next page when moving finger
        }, options || {}, element, this);

        this._isY = (opts.axis === 'y');

        var ulEl = Ink.s('ul.stage', element);
        this._ulEl = ulEl;

        InkElement.removeTextNodeChildren(ulEl);

        this.refit(); // recalculate this._numPages

        if (this._isY) {
            // Override white-space: no-wrap which is only necessary to make sure horizontal stuff stays horizontal, but breaks stuff intended to be vertical.
            this._ulEl.style.whiteSpace = 'normal';
        }

        if (opts.swipe) {
            InkEvent.observe(element, 'touchstart', Ink.bindMethod(this, '_onTouchStart'));
            InkEvent.observe(element, 'touchmove', Ink.bindMethod(this, '_onTouchMove'));
            InkEvent.observe(element, 'touchend', Ink.bindMethod(this, '_onTouchEnd'));
        }

        this._setUpPagination();
        this._setUpAutoAdvance();
        this._setUpHider();
    };

    Carousel.prototype = {
        /**
         * Measure the carousel once again, adjusting the involved elements'
         * sizes. Called automatically when the window resizes, in order to
         * cater for changes from responsive media queries, for instance.
         *
         * @method refit
         * @public
         */
        refit: function() {
            var _isY = this._isY;

            var size = function (elm, perpendicular) {
                if (!perpendicular) {
                    return InkElement.outerDimensions(elm)[_isY ? 1 : 0];
                } else {
                    return InkElement.outerDimensions(elm)[_isY ? 0 : 1];
                }
            };

            this._liEls = Ink.ss('li.slide', this._ulEl);
            var numSlides = this._liEls.length;

            var contRect = this._ulEl.getBoundingClientRect();
            this._ctnLength = _isY ? contRect.bottom - contRect.top : contRect.right - contRect.left;
            this._elLength = size(this._liEls[0]);
            this._slidesPerPage = Math.floor( this._ctnLength / this._elLength  ) || 1;

            var numPages = Math.ceil( numSlides / this._slidesPerPage );
            var numPagesChanged = this._numPages !== numPages;
            this._numPages = numPages;
            this._deltaLength = this._slidesPerPage * this._elLength;
            
            this._center();
            this._updateHider();
            this._IE7();

            if (this._pagination && numPagesChanged) {
                this._pagination.setSize(this._numPages);
            }
            this.setPage(limitRange(this.getPage(), 1, this._numPages));
        },

        _setUpPagination: function () {
            if (this._options.pagination) {
                if (Common.isDOMElement(this._options.pagination) ||
                        typeof this._options.pagination === 'string') {
                    // if dom element or css selector string...
                    this._pagination = new Pagination(this._options.pagination, {
                        size:     this._numPages,
                        onChange: this._handlers.paginationChange
                    });
                } else {
                    // assumes instantiated pagination
                    this._pagination = this._options.pagination;
                    this._pagination._options.onChange = this._handlers.paginationChange;
                    this._pagination.setSize(this._numPages);
                }
                this._pagination.setCurrent(this._options.initialPage || 0);
            } else {
                this._currentPage = this._options.initialPage || 0;
            }
        },

        _setUpAutoAdvance: function () {
            if (!this._options.autoAdvance) { return; }
            var self = this;

            setTimeout(function autoAdvance() {
                self.nextPage(true /* wrap */);
                setTimeout(autoAdvance, self._options.autoAdvance);
            }, this._options.autoAdvance);
        },

        _setUpHider: function () {
            if (this._options.hideLast) {
                var hiderEl = InkElement.create('div', {
                    className: 'hider',
                    insertBottom: this._element
                });
                hiderEl.style.position = 'absolute';
                hiderEl.style[ this._isY ? 'left' : 'top' ] = '0';  // fix to top..
                hiderEl.style[ this._isY ? 'right' : 'bottom' ] = '0';  // and bottom...
                hiderEl.style[ this._isY ? 'bottom' : 'right' ] = '0';  // and move to the end.
                this._hiderEl = hiderEl;
            }
        },

        _center: function() {
            if (!this._options.center) { return; }
            var gap = Math.floor( (this._ctnLength - (this._elLength * this._slidesPerPage) ) / 2 );

            var pad;
            if (this._isY) {
                pad = [gap, 'px 0'];
            } else {
                pad = ['0 ', gap, 'px'];
            }

            this._ulEl.style.padding = pad.join('');
        },

        _updateHider: function() {
            if (!this._hiderEl) { return; }
            if ((!this._pagination) || this._pagination.getCurrent() === 0) {
                var gap = Math.floor( this._ctnLength - (this._elLength * this._slidesPerPage) );
                if (this._options.center) {
                    gap /= 2;
                }
                this._hiderEl.style[ this._isY ? 'height' : 'width' ] = gap + 'px';
            } else {
                this._hiderEl.style[ this._isY ? 'height' : 'width' ] = '0px';
            }
        },
        
        /**
         * Refit stuff for IE7 because it won't support inline-block.
         *
         * @method _IE7
         * @private
         */
        _IE7: function () {
            if (Browser.IE && '' + Browser.version.split('.')[0] === '7') {
                // var numPages = this._numPages;
                var slides = Ink.ss('li.slide', this._ulEl);
                var stl = function (prop, val) {slides[i].style[prop] = val; };
                for (var i = 0, len = slides.length; i < len; i++) {
                    stl('position', 'absolute');
                    stl(this._isY ? 'top' : 'left', (i * this._elLength) + 'px');
                }
            }
        },

        _onTouchStart: function (event) {
            if (event.touches.length > 1) { return; }

            this._swipeData = {
                x: InkEvent.pointerX(event),
                y: InkEvent.pointerY(event),
                lastUlPos: null
            };

            var ulRect = this._ulEl.getBoundingClientRect();

            this._swipeData.inUlX =  this._swipeData.x - ulRect.left;
            this._swipeData.inUlY =  this._swipeData.y - ulRect.top;

            setTransitionProperty(this._ulEl, 'none');

            this._touchMoveIsFirstTouchMove = true;

            // event.preventDefault();
            event.stopPropagation();
        },

        _onTouchMove: function (event) {
            if (event.touches.length > 1) { return; /* multitouch event, not my problem. */ }

            var pointerX = InkEvent.pointerX(event);
            var pointerY = InkEvent.pointerY(event);

            var deltaY = Math.abs(pointerY - this._swipeData.y);
            var deltaX = Math.abs(pointerX - this._swipeData.x);

            if (this._touchMoveIsFirstTouchMove) {
                this._touchMoveIsFirstTouchMove = undefined;
                this._scrolling = this._isY ?
                    deltaX > deltaY :
                    deltaY > deltaX ;

                if (!this._scrolling) {
                    this._onAnimationFrame();
                }
            }

            if (!this._scrolling && this._swipeData) {
                event.preventDefault();

                this._swipeData.pointerPos = this._isY ? pointerY : pointerX;
            }

            event.stopPropagation();
        },

        _onAnimationFrame: function () {
            var swipeData = this._swipeData;

            if (!swipeData || this._scrolling || this._touchMoveIsFirstTouchMove) { return; }

            var elRect = this._element.getBoundingClientRect();

            var newPos;

            if (!this._isY) {
                newPos = swipeData.pointerPos - swipeData.inUlX - elRect.left;
            } else {
                newPos = swipeData.pointerPos - swipeData.inUlY - elRect.top;
            }

            this._ulEl.style[this._isY ? 'top' : 'left'] = newPos + 'px';

            swipeData.lastUlPos = newPos;

            requestAnimationFrame(Ink.bindMethod(this, '_onAnimationFrame'));
        },

        _onTouchEnd: function (event) {
            if (this._swipeData && this._swipeData.pointerPos && !this._scrolling && !this._touchMoveIsFirstTouchMove) {
                var snapToNext = 0.1;  // swipe 10% of the way to change page
                var progress = - this._swipeData.lastUlPos;

                var curPage = this._pagination.getCurrent();
                var estimatedPage = progress / this._elLength / this._slidesPerPage;

                if (Math.round(estimatedPage) === curPage) {
                    var diff = estimatedPage - curPage;
                    if (Math.abs(diff) > snapToNext) {
                        diff = diff > 0 ? 1 : -1;
                        curPage += diff;
                    }
                } else {
                    curPage = Math.round(estimatedPage);
                }

                this.setPage(curPage);

                event.stopPropagation();
                // event.preventDefault();
            }

            setTransitionProperty(this._ulEl, null /* transition: left, top */);
            this._swipeData = null;
            this._touchMoveIsFirstTouchMove = undefined;
            this._scrolling = undefined;
        },

        _onPaginationChange: function(pgn) {
            this._setPage(pgn.getCurrent());
        },

        /**
         * Get the currently displayed page.
         * @method getPage
         **/
        getPage: function () {
            if (this._pagination) {
                return this._pagination.getCurrent();
            } else {
                return this._currentPage;
            }
        },

        /**
         * Set the current page to `page`
         * @method setPage
         * @param page
         * @param [wrap=false] Wrap over the first and last pages. (For example, going to the 5th page when there are only 4 pages goes to the 1st page)
         **/
        setPage: function (page, wrap) {
            if (wrap) {
                // Pages outside the range [0..this._numPages] are wrapped.
                page = page % this._numPages;
                if (page < 0) { page = this._numPages - page; }
            }
            page = limitRange(page, 0, this._numPages - 1);

            if (this._pagination) {
                this._pagination.setCurrent(page);
            } else {
                this._setPage(page);
            }
        },

        _setPage: function (page) {
            this._ulEl.style[ this._isY ? 'top' : 'left'] =
                ['-', page * this._deltaLength, 'px'].join('');

            if (this._options.onChange) {
                this._options.onChange.call(this, page);
            }

            this._currentPage = page;

            this._updateHider();
        },

        /**
         * Change to the next page
         * @method nextPage
         * @param {Boolean} [wrap=false] If true, going to the page after the last page takes you to the first page.
         **/
        nextPage: function (wrap) {
            this.setPage(this.getPage() + 1, wrap);
        },

        /**
         * Change to the previous page
         * @method previousPage
         * @param {Boolean} [wrap=false] If true, going to the page after the last page takes you to the first page.
         **/
        previousPage: function (wrap) { this.setPage(this.getPage() - 1, wrap); }
    };

    function setTransitionProperty(el, newTransition) {
        el.style.transitionProperty =
        el.style.oTransitionProperty =
        el.style.msTransitionProperty =
        el.style.mozTransitionProperty =
        el.style.webkitTransitionProperty = newTransition;
    }

    return Carousel;

});

/**
 * @module Ink.UI.Close_1
 * @author inkdev AT sapo.pt
 */
Ink.createModule('Ink.UI.Close', '1', ['Ink.Dom.Event_1','Ink.Dom.Element_1'], function(InkEvent, InkElement) {
    'use strict';

    /**
     * Subscribes clicks on the document.body. If and only if you clicked on an element
     * having class "ink-close" or "ink-dismiss", will go up the DOM hierarchy looking for an element with any
     * of the following classes: "ink-alert", "ink-alert-block".
     * If it is found, it is removed from the DOM.
     * 
     * One should call close once per page (full page refresh).
     * 
     * @class Ink.UI.Close
     * @constructor
     * @example
     *     <script>
     *         Ink.requireModules(['Ink.UI.Close_1'],function( Close ){
     *             new Close();
     *         });
     *     </script>
     */
    var Close = function() {
        InkEvent.observe(document.body, 'click', function(ev) {
            var el = InkEvent.element(ev);

            el = InkElement.findUpwardsByClass(el, 'ink-close') ||
                 InkElement.findUpwardsByClass(el, 'ink-dismiss');

            if (!el) {
                return;  // ink-close or ink-dismiss class not found
            }

            var toRemove = el;
            toRemove = InkElement.findUpwardsByClass(el, 'ink-alert') ||
                       InkElement.findUpwardsByClass(el, 'ink-alert-block');

            if (toRemove) {
                InkEvent.stop(ev);
                InkElement.remove(toRemove);
            }
        });
    };

    return Close;

});

/**
 * @module Ink.UI.Common_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Common', '1', ['Ink.Dom.Element_1', 'Ink.Net.Ajax_1','Ink.Dom.Css_1','Ink.Dom.Selector_1','Ink.Util.Url_1'], function(InkElement, Ajax,Css,Selector,Url) {

    'use strict';

    var instances = {};
    var lastIdNum = 0;
    var nothing = {} /* a marker, for reference comparison. */;

    var keys = Object.keys || function (obj) {
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    };

    /**
     * The Common class provides auxiliar methods to ease some of the most common/repetitive UI tasks.
     *
     * @class Ink.UI.Common
     * @version 1
     * @static
     */
    var Common = {

        /**
         * Supported Ink Layouts
         *
         * @property Layouts
         * @type Object
         * @readOnly
         */
        Layouts: {
            SMALL:  'small',
            MEDIUM: 'medium',
            LARGE:  'large'
        },

        /**
         * Method to check if an item is a valid DOM Element.
         *
         * @method isDOMElement
         * @static
         * @param {Mixed} o     The object to be checked.
         * @return {Boolean}    True if it's a valid DOM Element.
         * @example
         *     var el = Ink.s('#element');
         *     if( Ink.UI.Common.isDOMElement( el ) === true ){
         *         // It is a DOM Element.
         *     } else {
         *         // It is NOT a DOM Element.
         *     }
         */
        isDOMElement: function(o) {
            return o && typeof o === 'object' && 'nodeType' in o && o.nodeType === 1;
        },

        /**
         * Method to check if an item is a valid integer.
         *
         * @method isInteger
         * @static
         * @param {Mixed} n     The value to be checked.
         * @return {Boolean}    True if 'n' is a valid integer.
         * @example
         *     var value = 1;
         *     if( Ink.UI.Common.isInteger( value ) === true ){
         *         // It is an integer.
         *     } else {
         *         // It is NOT an integer.
         *     }
         */
        isInteger: function(n) {
            return (typeof n === 'number' && n % 1 === 0);
        },

        /**
         * Method to get a DOM Element. The first parameter should be either a DOM Element or a valid CSS Selector.
         * If not, then it will throw an exception. Otherwise, it returns a DOM Element.
         *
         * @method elOrSelector
         * @static
         * @param  {DOMElement|String} elOrSelector DOM Element or CSS Selector
         * @param  {String}            fieldName    This field is used in the thrown Exception to identify the parameter.
         * @return {DOMElement} Returns the DOMElement passed or the first result of the CSS Selector. Otherwise it throws an exception.
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        elOrSelector: function(elOrSelector, fieldName) {
            if (!this.isDOMElement(elOrSelector)) {
                var t = Selector.select(elOrSelector);
                if (t.length === 0) { throw new TypeError(fieldName + ' must either be a DOM Element or a selector expression!\nThe script element must also be after the DOM Element itself.'); }
                return t[0];
            }
            return elOrSelector;
        },

        /**
         * Does the same as `elOrSelector` but returns an array of elements.
         *
         * see elOrSelector
         *
         * @method elsOrSelector
         *
         * @static
         *
         * @param ... (See elOrSelector's params)
         * @param {Boolean} required If true, accept an empty array as output.
         * @return {Array} The selected DOM Elements.
         * @example
         *     var elements = Ink.UI.Common.elsOrSelector('input.my-inputs', 'My Input');
         */
        elsOrSelector: function(elsOrSelector, fieldName, required) {
            var ret;
            if (typeof elsOrSelector === 'string') {
                ret = Selector.select(elsOrSelector);
            } else if (Common.isDOMElement(elsOrSelector)) {
                ret = [elsOrSelector];
            } else if (elsOrSelector && typeof elsOrSelector === 'object' && typeof elsOrSelector.length === 'number') {
                ret = elsOrSelector;
            }

            if (ret && ret.length) {
                return ret;
            } else {
                if (required || arguments.length === 2) {
                    throw new TypeError(fieldName + ' must either be a DOM Element, an Array of elements, or a selector expression!\nThe script element must also be after the DOM Element itself.');
                } else {
                    return [];
                }
            }
        },

        /**
         * Get options from an "options" object and the Element's data attributes.
         *
         * The element's data attributes take precedence.
         * 
         * Values from the element's data-atrributes are coerced into the required type.
         *
         * Mainly for Ink UI.* modules
         *
         * @method options
         *
         * @param {Object}     [fieldId=''] Tag used in thrown exceptions: "<fieldId>: ..."
         * @param {Object}      defaults    Object with arrays of option defaults
         * @param {Object}      overrides   Object containing options given from user through JavaScript
         * @param {DOMElement} [element]    Element with data-attributes
         *
         * @example
         *
         *      this._options = Ink.UI.Common.options('MyComponent', {
         *          'anobject': ['Object', null],  // Defaults to null
         *          'target': ['Element', null],
         *          'stuff': ['Number', 0.1],
         *          'stuff2': ['Integer', 0],
         *          'doKickFlip': ['Boolean', false],
         *          'targets': ['Elements'], // Required option since no default was given
         *          'onClick': ['Function', null]
         *      }, options || {}, elm)
         *
         * @example
         *
         * ### Note about booleans
         *
         * Here is how options are read from the markup
         * data-attributes, for several values`data-a-boolean`.
         *
         * Options considered true:
         *
         *   - `data-a-boolean="true"`
         *   - (Every other value which is not on the list below.)
         * 
         * Options considered false:
         *
         *   - `data-a-boolean="false"`
         *   - `data-a-boolean=""`
         *   - `data-a-boolean`
         *
         * Options which go to default:
         *
         *   - (no attribute). When `data-a-boolean` is ommitted, the
         *   option is not considered true nor false, and as such
         *   defaults to what is in the `defaults` argument.
         *
         **/
        options: function (fieldId, defaults, overrides, element) {
            if (typeof fieldId !== 'string') {
                element = overrides;
                overrides = defaults;
                defaults = fieldId;
                fieldId = '';
            }
            overrides = overrides || {};
            var out = {};
            var dataAttrs = element ? InkElement.data(element) : {};
            var fromDataAttrs;
            var type;
            var lType;
            var defaultVal;

			var invalidStr = function (str) {
                if (fieldId) { str = fieldId + ': "' + ('' + str).replace(/"/, '\\"') + '"'; }
				return str;
			};

			var quote = function (str) {
				return '"' + ('' + str).replace(/"/, '\\"') + '"';
			};

            var invalidThrow = function (str) {
                throw new Error(invalidStr(str));
            };

            var invalid = function (str) {
                Ink.error(invalidStr(str) + '. Ignoring option.');
            };

            function optionValue(key) {
                type = defaults[key][0];
                lType = type.toLowerCase();
                defaultVal = defaults[key].length === 2 ? defaults[key][1] : nothing;

                if (!type) {
                    invalidThrow('Ink.UI.Common.options: Always specify a type!');
                }
                if (!(lType in Common._coerce_funcs)) {
                    invalidThrow('Ink.UI.Common.options: ' + defaults[key][0] + ' is not a valid type. Use one of ' + keys(Common._coerce_funcs).join(', '));

                }
                if (!defaults[key].length || defaults[key].length > 2) {
                    invalidThrow('the "defaults" argument must be an object mapping option names to [typestring, optional] arrays.');
                }

                if (key in dataAttrs) {
                    fromDataAttrs = Common._coerce_from_string(lType, dataAttrs[key], key, fieldId);
                    // (above can return `nothing`)
                } else {
                    fromDataAttrs = nothing;
                }

                if (fromDataAttrs !== nothing) {
                    if (!Common._options_validate(fromDataAttrs, lType)) {
                        invalid('(' + key + ' option) Invalid ' + lType + ' ' + quote(fromDataAttrs));
                        return defaultVal;
                    } else {
                        return fromDataAttrs;
                    }
                } else if (key in overrides) {
                    return overrides[key];
                } else if (defaultVal !== nothing) {
                    return defaultVal;
                } else {
                    invalidThrow('Option ' + key + ' is required!');
                }
            }

            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {
					out[key] = optionValue(key);
                }
            }

            return out;
        },

        _coerce_from_string: function (type, val, paramName, fieldId) {
            if (type in Common._coerce_funcs) {
                return Common._coerce_funcs[type](val, paramName, fieldId);
            } else {
                return val;
            }
        },

        _options_validate: function (val, type) {
            if (type in Common._options_validate_types) {
                return Common._options_validate_types[type].call(Common, val);
            } else {
                // 'object' options cannot be passed through data-attributes.
                // Json you say? Not any good to embed in HTML.
                return false;
            }
        },

        _coerce_funcs: (function () {
            var ret = {
                element: function (val) {
                    return Common.elOrSelector(val, '');
                },
                elements: function (val) {
                    return Common.elsOrSelector(val, '', false /*not required, so don't throw an exception now*/);
                },
                object: function (val) { return val; },
                number: function (val) { return parseFloat(val); },
                'boolean': function (val) {
                    return !(val === 'false' || val === '' || val === null);
                },
                string: function (val) { return val; },
                'function': function (val, paramName, fieldId) {
					Ink.error(fieldId + ': You cannot specify the option "' + paramName + '" through data-attributes because it\'s a function');
					return nothing;
                }
            };
            ret['float'] = ret.integer = ret.number;
            return ret;
        }()),

        _options_validate_types: (function () {
            var types = {
                string: function (val) {
                    return typeof val === 'string';
                },
                number: function (val) {
                    return typeof val === 'number' && !isNaN(val) && isFinite(val);
                },
                integer: function (val) {
                    return val === Math.round(val);
                },
                element: function (val) {
                    return Common.isDOMElement(val);
                },
                elements: function (val) {
                    return val && typeof val === 'object' && typeof val.length === 'number' && val.length;
                },
                'boolean': function (val) {
                    return typeof val === 'boolean';
                }
            };
            types['float'] = types.number;
            return types;
        }()),

        /**
         * Method to make a deep copy (clone) of an object.
         * Note: The object cannot have loops.
         *
         * @method clone
         * @static
         * @param  {Object} o The object to be cloned/copied.
         * @return {Object} Returns the result of the clone/copy.
         * @example
         *     var originalObj = {
         *         key1: 'value1',
         *         key2: 'value2',
         *         key3: 'value3'
         *     };
         *     var cloneObj = Ink.UI.Common.clone( originalObj );
         */
        clone: function(o) {
            try {
                return JSON.parse( JSON.stringify(o) );
            } catch (ex) {
                throw new Error('Given object cannot have loops!');
            }
        },


        /**
         * Method to return the 'nth' position that an element occupies relatively to its parent.
         *
         * @method childIndex
         * @static
         * @param  {DOMElement} childEl Valid DOM Element.
         * @return {Number} Numerical position of an element relatively to its parent.
         * @example
         *     <!-- Imagine the following HTML: -->
         *     <ul>
         *       <li>One</li>
         *       <li>Two</li>
         *       <li id="test">Three</li>
         *       <li>Four</li>
         *     </ul>
         *
         *     <script>
         *         var testLi = Ink.s('#test');
         *         Ink.UI.Common.childIndex( testLi ); // Returned value: 3
         *     </script>
         */
        childIndex: function(childEl) {
            if( Common.isDOMElement(childEl) ){
                var els = Selector.select('> *', childEl.parentNode);
                for (var i = 0, f = els.length; i < f; ++i) {
                    if (els[i] === childEl) {
                        return i;
                    }
                }
            }
            throw 'not found!';
        },


        /**
         * This method provides a more convenient way to do an async AJAX request and expect a JSON response.
         * It offers a callback option, as third paramenter, for a better async handling.
         *
         * @method ajaxJSON
         * @static
         * @async
         * @param  {String} endpoint    Valid URL to be used as target by the request.
         * @param  {Object} params      This field is used in the thrown Exception to identify the parameter.
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        ajaxJSON: function(endpoint, params, cb) {
            new Ajax(
                endpoint,
                {
                    evalJS:         'force',
                    method:         'POST',
                    parameters:     params,

                    onSuccess:  function( r) {
                        try {
                            r = r.responseJSON;
                            if (r.status !== 'ok') {
                                throw 'server error: ' + r.message;
                            }
                            cb(null, r);
                        } catch (ex) {
                            cb(ex);
                        }
                    },

                    onFailure: function() {
                        cb('communication failure');
                    }
                }
            );
        },


        /**
         * Method to get the current Ink layout applied.
         *
         * @method currentLayout
         * @static
         * @return {String}         'small', 'medium' or 'large'
         * @example
         *      var inkLayout = Ink.UI.Common.currentLayout();
         *      if (inkLayout === 'small') {
         *          // ...
         *      }
         */
        currentLayout: function() {
            var i, f, k, v, el, detectorEl = Selector.select('#ink-layout-detector')[0];
            if (!detectorEl) {
                detectorEl = document.createElement('div');
                detectorEl.id = 'ink-layout-detector';
                for (k in this.Layouts) {
                    if (this.Layouts.hasOwnProperty(k)) {
                        v = this.Layouts[k];
                        el = document.createElement('div');
                        el.className = 'show-' + v + ' hide-all';
                        el.setAttribute('data-ink-layout', v);
                        detectorEl.appendChild(el);
                    }
                }
                document.body.appendChild(detectorEl);
            }

            var result = '';
            var resultCount = 0;
            for (i = 0, f = detectorEl.childNodes.length; i < f; ++i) {
                el = detectorEl.childNodes[i];
                if (Css.getStyle(el, 'display') === 'block') {
                    result = el.getAttribute('data-ink-layout');
                    resultCount += 1;
                }
            }

            if (resultCount === 1) {
                return result;
            } else {
                return 'large';
            }
        },


        /**
         * Method to set the location's hash (window.location.hash).
         *
         * @method hashSet
         * @static
         * @param  {Object} o   Object with the info to be placed in the location's hash.
         * @example
         *     // It will set the location's hash like: <url>#key1=value1&key2=value2&key3=value3
         *     Ink.UI.Common.hashSet({
         *         key1: 'value1',
         *         key2: 'value2',
         *         key3: 'value3'
         *     });
         */
        hashSet: function(o) {
            if (typeof o !== 'object') { throw new TypeError('o should be an object!'); }
            var hashParams = Url.getAnchorString();
            hashParams = Ink.extendObj(hashParams, o);
            window.location.hash = Url.genQueryString('', hashParams).substring(1);
        },

        /**
         * Method to remove children nodes from a given object.
         * This method was initially created to help solve a problem in Internet Explorer(s) that occurred when trying
         * to set the innerHTML of some specific elements like 'table'.
         *
         * @method cleanChildren
         * @static
         * @param  {DOMElement} parentEl Valid DOM Element
         * @example
         *     <!-- Imagine the following HTML: -->
         *     <ul id="myUl">
         *       <li>One</li>
         *       <li>Two</li>
         *       <li>Three</li>
         *       <li>Four</li>
         *     </ul>
         *
         *     <script>
         *     Ink.UI.Common.cleanChildren( Ink.s( '#myUl' ) );
         *     </script>
         *
         *     <!-- After running it, the HTML changes to: -->
         *     <ul id="myUl"></ul>
         */
        cleanChildren: function(parentEl) {
            if( !Common.isDOMElement(parentEl) ){
                throw 'Please provide a valid DOMElement';
            }
            var prevEl, el = parentEl.lastChild;
            while (el) {
                prevEl = el.previousSibling;
                parentEl.removeChild(el);
                el = prevEl;
            }
        },

        /**
         * This method stores the id and/or the classes of a given element in a given object.
         *
         * @method storeIdAndClasses
         * @static
         * @param  {DOMElement} fromEl    Valid DOM Element to get the id and classes from.
         * @param  {Object}     inObj     Object where the id and classes will be saved.
         * @example
         *     <div id="myDiv" class="aClass"></div>
         *
         *     <script>
         *         var storageObj = {};
         *         Ink.UI.Common.storeIdAndClasses( Ink.s('#myDiv'), storageObj );
         *         // storageObj changes to:
         *         {
         *           _id: 'myDiv',
         *           _classes: 'aClass'
         *         }
         *     </script>
         */
        storeIdAndClasses: function(fromEl, inObj) {
            if( !Common.isDOMElement(fromEl) ){
                throw 'Please provide a valid DOMElement as first parameter';
            }

            var id = fromEl.id;
            if (id) {
                inObj._id = id;
            }

            var classes = fromEl.className;
            if (classes) {
                inObj._classes = classes;
            }
        },

        /**
         * This method sets the id and className properties of a given DOM Element based on a given similar object
         * resultant of the previous function 'storeIdAndClasses'.
         *
         * @method restoreIdAndClasses
         * @static
         * @param  {DOMElement} toEl    Valid DOM Element to set the id and classes on.
         * @param  {Object}     inObj   Object where the id and classes to be set are.
         * @example
         *     <div></div>
         *
         *     <script>
         *         var storageObj = {
         *           _id: 'myDiv',
         *           _classes: 'aClass'
         *         };
         *
         *         Ink.UI.Common.storeIdAndClasses( Ink.s('div'), storageObj );
         *     </script>
         *
         *     <!-- After the code runs the div element changes to: -->
         *     <div id="myDiv" class="aClass"></div>
         */
        restoreIdAndClasses: function(toEl, inObj) {

            if( !Common.isDOMElement(toEl) ){
                throw 'Please provide a valid DOMElement as first parameter';
            }

            if (inObj._id && toEl.id !== inObj._id) {
                toEl.id = inObj._id;
            }

            if (inObj._classes && toEl.className.indexOf(inObj._classes) === -1) {
                if (toEl.className) { toEl.className += ' ' + inObj._classes; }
                else {                toEl.className  =       inObj._classes; }
            }

            if (inObj._instanceId && !toEl.getAttribute('data-instance')) {
                toEl.setAttribute('data-instance', inObj._instanceId);
            }
        },

        /**
         * This method saves a component's instance reference for later retrieval.
         *
         * @method registerInstance
         * @static
         * @param  {Object}     inst                Object that holds the instance.
         * @param  {DOMElement} el                  DOM Element to associate with the object.
         * @param  {Object}     [optionalPrefix]    Defaults to 'instance'
         */
        registerInstance: function(inst, el, optionalPrefix) {
            if (inst._instanceId) { return; }

            if (typeof inst !== 'object') { throw new TypeError('1st argument must be a JavaScript object!'); }

            if (inst._options && inst._options.skipRegister) { return; }

            if (!this.isDOMElement(el)) { throw new TypeError('2nd argument must be a DOM element!'); }
            if (optionalPrefix !== undefined && typeof optionalPrefix !== 'string') { throw new TypeError('3rd argument must be a string!'); }
            var id = (optionalPrefix || 'instance') + (++lastIdNum);
            instances[id] = inst;
            inst._instanceId = id;
            var dataInst = el.getAttribute('data-instance');
            dataInst = (dataInst !== null) ? [dataInst, id].join(' ') : id;
            el.setAttribute('data-instance', dataInst);
        },

        /**
         * This method deletes/destroy an instance with a given id.
         *
         * @method unregisterInstance
         * @static
         * @param  {String}     id       Id of the instance to be destroyed.
         */
        unregisterInstance: function(id) {
            delete instances[id];
        },

        /**
         * This method retrieves the registered instance(s) of a given element or instance id.
         *
         * @method getInstance
         * @static
         * @param  {String|DOMElement}      instanceIdOrElement      Instance's id or DOM Element from which we want the instances.
         * @return  {Object|Object[]}       Returns an instance or a collection of instances.
         */
        getInstance: function(instanceIdOrElement) {
            var ids;
            if (this.isDOMElement(instanceIdOrElement)) {
                ids = instanceIdOrElement.getAttribute('data-instance');
                if (ids === null) { throw new Error('argument is not a DOM instance element!'); }
            }
            else {
                ids = instanceIdOrElement;
            }

            ids = ids.split(' ');
            var inst, id, i, l = ids.length;

            var res = [];
            for (i = 0; i < l; ++i) {
                id = ids[i];
                if (!id) { throw new Error('Element is not a JS instance!'); }
                inst = instances[id];
                if (!inst) { throw new Error('Instance "' + id + '" not found!'); }
                res.push(inst);
            }

            return (l === 1) ? res[0] : res;
        },

        /**
         * This method retrieves the registered instance(s) of an element based on the given selector.
         *
         * @method getInstanceFromSelector
         * @static
         * @param  {String}             selector    CSS selector to define the element from which it'll get the instance(s).
         * @return  {Object|Object[]}               Returns an instance or a collection of instances.
         */
        getInstanceFromSelector: function(selector) {
            var el = Selector.select(selector)[0];
            if (!el) { throw new Error('Element not found!'); }
            return this.getInstance(el);
        },

        /**
         * This method retrieves the registered instances' ids of all instances.
         *
         * @method getInstanceIds
         * @static
         * @return  {String[]}     Id or collection of ids of all existing instances.
         */
        getInstanceIds: function() {
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( id );
                }
            }
            return res;
        },

        /**
         * This method retrieves all existing instances.
         *
         * @method getInstances
         * @static
         * @return  {Object[]}     Collection of existing instances.
         */
        getInstances: function() {
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( instances[id] );
                }
            }
            return res;
        },

        /**
         * This method is not to supposed to be invoked by the Common component.
         * Components should copy this method as its destroy method.
         *
         * @method destroyComponent
         * @static
         */
        destroyComponent: function() {
            Common.unregisterInstance(this._instanceId);
            this._element.parentNode.removeChild(this._element);
        }

    };

    return Common;

});

/**
 * @module Ink.UI.DatePicker_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.DatePicker', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.Date_1', 'Ink.Dom.Browser_1'], function(Common, Event, Css, InkElement, Selector, InkArray, InkDate ) {
    'use strict';

    // Repeat a string. Long version of (new Array(n)).join(str);
    function strRepeat(n, str) {
        var ret = '';
        for (var i = 0; i < n; i++) {
            ret += str;
        }
        return ret;
    }

    // Clamp a number into a min/max limit
    function clamp(n, min, max) {
        if (n > max) { n = max; }
        if (n < min) { n = min; }

        return n;
    }

    function dateishFromYMDString(YMD) {
        var split = YMD.split('-');
        return dateishFromYMD(+split[0], +split[1] - 1, +split[2]);
    }

    function dateishFromYMD(year, month, day) {
        return {_year: year, _month: month, _day: day};
    }

    function dateishFromDate(date) {
        return {_year: date.getFullYear(), _month: date.getMonth(), _day: date.getDate()};
    }

    /**
     * @class Ink.UI.DatePicker
     * @constructor
     * @version 1
     *
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *      @param {Boolean}   [options.autoOpen=false]  set to `true` to automatically open the datepicker.
     *      @param {String}    [options.cleanText]       text to display on clean button. defaults to 'Limpar'
     *      @param {String}    [options.closeText]       text to display on close button. defaults to 'Fechar'
     *      @param {String}    [options.cssClass]        CSS class to be applied to the datepicker
     *      @param {String}    [options.dateRange]       enforce limits to year, month and day for the Date, ex: '1990-08-25:2020-11'
     *      @param {Boolean}   [options.displayInSelect] whether to display the component in a select. defaults to false.
     *      @param {String|DOMElement} [options.dayField]   (if using options.displayInSelect) `<select>` field with days.
     *      @param {String|DOMElement} [options.monthField] (if using options.displayInSelect)  `<select>` field with months.
     *      @param {String|DOMElement} [options.yearField]  (if using options.displayInSelect)  `<select>` field with years.
     *      @param {String}    [options.format]          Date format string
     *      @param {String}    [options.instance]        unique id for the datepicker
     *      @param {Object}    [options.month]           Hash of month names. Defaults to portuguese month names. January is 1.
     *      @param {String}    [options.nextLinkText]    text to display on the previous button. defaults to '«'
     *      @param {String}    [options.ofText=' of ']   text to display between month and year. defaults to ' de '
     *      @param {Boolean}   [options.onFocus=true]    if the datepicker should open when the target element is focused
     *      @param {Function}  [options.onMonthSelected] callback function to execute when the month is selected
     *      @param {Function}  [options.onSetDate]       callback to execute when set date
     *      @param {Function}  [options.onYearSelected]  callback function to execute when the year is selected
     *      @param {String}    [options.position]        position the datepicker. Accept right or bottom, default is right
     *      @param {String}    [options.prevLinkText]    text to display on the previous button. defaults to '«'
     *      @param {Boolean}   [options.showClean]       whether to display the clean button or not. defaults to true.
     *      @param {Boolean}   [options.showClose]       whether to display the close button or not. defaults to true.
     *      @param {Boolean}   [options.shy=true]        whether the datepicker starts automatically.
     *      @param {String}    [options.startDate]       Date to define init month. Must be in yyyy-mm-dd format
     *      @param {Number}    [options.startWeekDay]    day to use as first column on the calendar view. Defaults to Monday (1)
     *      @param {Function}  [options.validYearFn]    callback function to execute when 'rendering' the month (in the month view)
     *      @param {Function}  [options.validMonthFn]    callback function to execute when 'rendering' the month (in the month view)
     *      @param {Function}  [options.validDayFn]      callback function to execute when 'rendering' the day (in the month view)
     *      @param {Function}  [options.nextValidDateFn] Find the next valid date, given the current Date. Necessary when the calendar has a lot of "holes", and not many dates are valid and they are separated by many months or years so it doesn't make sense to have the user click the "next" button too many times and not see any valid date.
     *      @param {Function}  [options.prevValidDateFn] See nextValidDateFn. Find the previous valid date.
     *      @param {Object}    [options.wDay]            Hash of weekdays. Defaults to portuguese month names. Sunday is 0.
     *      @param {String}    [options.yearRange]       enforce limits to year for the Date, ex: '1990:2020' (deprecated)
     *
     * @example
     *     <input type="text" id="dPicker" />
     *     <script>
     *         Ink.requireModules(['Ink.Dom.Selector_1','Ink.UI.DatePicker_1'],function( Selector, DatePicker ){
     *             var datePickerElement = Ink.s('#dPicker');
     *             var datePickerObj = new DatePicker( datePickerElement );
     *         });
     *     </script>
     */
    var DatePicker = function(selector, options) {
        this._element = selector &&
            Common.elOrSelector(selector, '[Ink.UI.DatePicker_1]: selector argument');

        this._options = Common.options('Ink.UI.DatePicker_1', {
            autoOpen:        ['Boolean', false],
            cleanText:       ['String', 'Clear'],
            closeText:       ['String', 'Close'],
            containerElement:['Element', null],
            cssClass:        ['String', 'ink-calendar bottom'],
            dateRange:       ['String', null],
            
            // use this in a <select>
            displayInSelect: ['Boolean', false],
            dayField:        ['Element', null],
            monthField:      ['Element', null],
            yearField:       ['Element', null],

            format:          ['String', 'yyyy-mm-dd'],
            instance:        ['String', 'scdp_' + Math.round(99999 * Math.random())],
            nextLinkText:    ['String', '»'],
            ofText:          ['String', ' of '],
            onFocus:         ['Boolean', true],
            onMonthSelected: ['Function', null],
            onSetDate:       ['Function', null],
            onYearSelected:  ['Function', null],
            position:        ['String', 'right'],
            prevLinkText:    ['String', '«'],
            showClean:       ['Boolean', true],
            showClose:       ['Boolean', true],
            shy:             ['Boolean', true],
            startDate:       ['String', null], // format yyyy-mm-dd,
            startWeekDay:    ['Number', 1],

            // Validation
            validDayFn:      ['Function', null],
            validMonthFn:    ['Function', null],
            validYearFn:     ['Function', null],
            nextValidDateFn: ['Function', null],
            prevValidDateFn: ['Function', null],
            yearRange:       ['String', null],

            // Text
            month: ['Object', {
                 1:'January',
                 2:'February',
                 3:'March',
                 4:'April',
                 5:'May',
                 6:'June',
                 7:'July',
                 8:'August',
                 9:'September',
                10:'October',
                11:'November',
                12:'December'
            }],
            wDay: ['Object', {
                0:'Sunday',
                1:'Monday',
                2:'Tuesday',
                3:'Wednesday',
                4:'Thursday',
                5:'Friday',
                6:'Saturday'
            }]
        }, options || {}, this._element);

        this._options.format = this._dateParsers[ this._options.format ] || this._options.format;

        this._hoverPicker = false;

        this._picker = this._options.pickerField &&
            Common.elOrSelector(this._options.pickerField, 'pickerField');

        this._setMinMax( this._options.dateRange || this._options.yearRange );

        if(this._options.startDate) {
            this.setDate( this._options.startDate );
        } else if (this._element && this._element.value) {
            this.setDate( this._element.value );
        } else {
            var today = new Date();
            this._day   = today.getDate( );
            this._month = today.getMonth( );
            this._year  = today.getFullYear( );
        }

        if(this._options.displayInSelect &&
                !(this._options.dayField && this._options.monthField && this._options.yearField)){
            throw new Error(
                'Ink.UI.DatePicker: displayInSelect option enabled.'+
                'Please specify dayField, monthField and yearField selectors.');
        }

        this._init();
    };

    DatePicker.prototype = {
        version: '0.1',

        /**
         * Initialization function. Called by the constructor and
         * receives the same parameters.
         *
         * @method _init
         * @private
         */
        _init: function(){
            Ink.extendObj(this._options,this._lang || {});

            this._render();
            this._listenToContainerObjectEvents();

            Common.registerInstance(this, this._containerObject, 'datePicker');
        },

        /**
         * Renders the DatePicker's markup
         *
         * @method _render
         * @private
         */
        _render: function() {
            this._containerObject = document.createElement('div');

            this._containerObject.id = this._options.instance;

            this._containerObject.className = this._options.cssClass + ' ink-datepicker-calendar hide-all';

            this._renderSuperTopBar();

            var calendarTop = document.createElement("div");
            calendarTop.className = 'ink-calendar-top';

            this._monthDescContainer = document.createElement("div");
            this._monthDescContainer.className = 'ink-calendar-month_desc';

            this._monthPrev = document.createElement('div');
            this._monthPrev.className = 'ink-calendar-prev';
            this._monthPrev.innerHTML ='<a href="#prev" class="change_month_prev">' + this._options.prevLinkText + '</a>';

            this._monthNext = document.createElement('div');
            this._monthNext.className = 'ink-calendar-next';
            this._monthNext.innerHTML ='<a href="#next" class="change_month_next">' + this._options.nextLinkText + '</a>';

            calendarTop.appendChild(this._monthPrev);
            calendarTop.appendChild(this._monthDescContainer);
            calendarTop.appendChild(this._monthNext);

            this._monthContainer = document.createElement("div");
            this._monthContainer.className = 'ink-calendar-month';

            this._containerObject.appendChild(calendarTop);
            this._containerObject.appendChild(this._monthContainer);

            this._monthSelector = this._renderMonthSelector();
            this._containerObject.appendChild(this._monthSelector);

            this._yearSelector = document.createElement('ul');
            this._yearSelector.className = 'ink-calendar-year-selector';

            this._containerObject.appendChild(this._yearSelector);

            if(!this._options.onFocus || this._options.displayInSelect){
                if(!this._options.pickerField){
                    this._picker = document.createElement('a');
                    this._picker.href = '#open_cal';
                    this._picker.innerHTML = 'open';
                    this._element.parentNode.appendChild(this._picker);
                    this._picker.className = 'ink-datepicker-picker-field';
                } else {
                    this._picker = Common.elOrSelector(this._options.pickerField, 'pickerField');
                }
            }

            this._appendDatePickerToDom();

            this._renderMonth();

            this._monthChanger = document.createElement('a');
            this._monthChanger.href = '#monthchanger';
            this._monthChanger.className = 'ink-calendar-link-month';
            this._monthChanger.innerHTML = this._options.month[this._month + 1];

            this._ofText = document.createElement('span');
            this._ofText.innerHTML = this._options.ofText;

            this._yearChanger = document.createElement('a');
            this._yearChanger.href = '#yearchanger';
            this._yearChanger.className = 'ink-calendar-link-year';
            this._yearChanger.innerHTML = this._year;
            this._monthDescContainer.innerHTML = '';
            this._monthDescContainer.appendChild(this._monthChanger);
            this._monthDescContainer.appendChild(this._ofText);
            this._monthDescContainer.appendChild(this._yearChanger);

            if (!this._options.inline) {
                this._addOpenCloseEvents();
            } else {
                this.show();
            }
            this._addDateChangeHandlersToInputs();
        },

        _addDateChangeHandlersToInputs: function () {
            var fields = this._element;
            if (this._options.displayInSelect) {
                fields = [
                    this._options.dayField,
                    this._options.monthField,
                    this._options.yearField];
            }
            Event.observeMulti(fields ,'change', Ink.bindEvent(function(){
                this._updateDate( );
                this._showDefaultView( );
                this.setDate( );
                if ( !this._inline && !this._hoverPicker ) {
                    this._hide(true);
                }
            },this));
        },

        /**
         * Shows the calendar
         *
         * @method show
         **/
        show: function () {
            this._updateDate();
            this._renderMonth();
            Css.removeClassName(this._containerObject, 'hide-all');
        },

        _addOpenCloseEvents: function () {
            var opener = this._picker || this._element;

            Event.observe(opener, 'click', Ink.bindEvent(function(e){
                Event.stop(e);
                this.show();
            },this));

            if (this._options.autoOpen) {
                this.show();
            }

            if(!this._options.displayInSelect){
                Event.observe(opener, 'blur', Ink.bindEvent(function() {
                    if ( !this._hoverPicker ) {
                        this._hide(true);
                    }
                },this));
            }

            if (this._options.shy) {
                // Close the picker when clicking elsewhere.
                Event.observe(document,'click',Ink.bindEvent(function(e){
                    var target = Event.element(e);

                    // "elsewhere" is outside any of these elements:
                    var cannotBe = [
                        this._options.dayField,
                        this._options.monthField,
                        this._options.yearField,
                        this._picker,
                        this._element
                    ];

                    for (var i = 0, len = cannotBe.length; i < len; i++) {
                        if (cannotBe[i] && InkElement.descendantOf(cannotBe[i], target)) {
                            return;
                        }
                    }

                    this._hide(true);
                },this));
            }
        },

        /**
         * Create the markup of the view with months.
         *
         * @method _renderMonthSelector
         * @private
         */
        _renderMonthSelector: function () {
            var selector = document.createElement('ul');
            selector.className = 'ink-calendar-month-selector';

            var ulSelector = document.createElement('ul');
            for(var mon=1; mon<=12; mon++){
                ulSelector.appendChild(this._renderMonthButton(mon));

                if (mon % 4 === 0) {
                    selector.appendChild(ulSelector);
                    ulSelector = document.createElement('ul');
                }
            }
            return selector;
        },

        /**
         * Render a single month button.
         */
        _renderMonthButton: function (mon) {
            var liMonth = document.createElement('li');
            var aMonth = document.createElement('a');
            aMonth.setAttribute('data-cal-month', mon);
            aMonth.innerHTML = this._options.month[mon].substring(0,3);
            liMonth.appendChild(aMonth);
            return liMonth;
        },

        _appendDatePickerToDom: function () {
            if(this._options.containerElement) {
                var appendTarget =
                    Ink.i(this._options.containerElement) ||  // [2.3.0] maybe id; small backwards compatibility thing
                    Common.elOrSelector(this._options.containerElement);
                appendTarget.appendChild(this._containerObject);
            }

            if (InkElement.findUpwardsBySelector(this._element, '.ink-form .control-group .control') === this._element.parentNode) {
                // [3.0.0] Check if the <input> must be a direct child of .control, and if not, remove this block.
                this._wrapper = this._element.parentNode;
                this._wrapperIsControl = true;
            } else {
                this._wrapper = InkElement.create('div', { className: 'ink-datepicker-wrapper' });
                InkElement.wrap(this._element, this._wrapper);
            }
            InkElement.insertAfter(this._containerObject, this._element);
        },

        /**
         * Render the topmost bar with the "close" and "clear" buttons.
         */
        _renderSuperTopBar: function () {
            if((!this._options.showClose) || (!this._options.showClean)){ return; }

            this._superTopBar = document.createElement("div");
            this._superTopBar.className = 'ink-calendar-top-options';
            if(this._options.showClean){
                this._superTopBar.appendChild(InkElement.create('a', {
                    className: 'clean',
                    setHTML: this._options.cleanText
                }));
            }
            if(this._options.showClose){
                this._superTopBar.appendChild(InkElement.create('a', {
                    className: 'close',
                    setHTML: this._options.closeText
                }));
            }
            this._containerObject.appendChild(this._superTopBar);
        },

        _listenToContainerObjectEvents: function () {
            Event.observe(this._containerObject,'mouseover',Ink.bindEvent(function(e){
                Event.stop( e );
                this._hoverPicker = true;
            },this));

            Event.observe(this._containerObject,'mouseout',Ink.bindEvent(function(e){
                Event.stop( e );
                this._hoverPicker = false;
            },this));

            Event.observe(this._containerObject,'click',Ink.bindEvent(this._onClick, this));
        },

        _onClick: function(e){
            var elem = Event.element(e);

            if (Css.hasClassName(elem, 'ink-calendar-off')) {
                Event.stopDefault(e);
                return null;
            }

            Event.stop(e);

            // Relative changers
            this._onRelativeChangerClick(elem);

            // Absolute changers
            this._onAbsoluteChangerClick(elem);

            // Mode changers
            if (Css.hasClassName(elem, 'ink-calendar-link-month')) {
                this._showMonthSelector();
            } else if (Css.hasClassName(elem, 'ink-calendar-link-year')) {
                this._showYearSelector();
            } else if(Css.hasClassName(elem, 'clean')){
                this._clean();
            } else if(Css.hasClassName(elem, 'close')){
                this._hide(false);
            }

            this._updateDescription();
        },

        /**
         * Handle click events on a changer (« ») for next/prev year/month
         * @method _onChangerClick
         * @private
         **/
        _onRelativeChangerClick: function (elem) {
            var changeYear = {
                change_year_next: 1,
                change_year_prev: -1
            };
            var changeMonth = {
                change_month_next: 1,
                change_month_prev: -1
            };

            if( elem.className in changeMonth ) {
                this._updateCal(changeMonth[elem.className]);
            } else if( elem.className in changeYear ) {
                this._showYearSelector(changeYear[elem.className]);
            }
        },

        /**
         * Handle click events on an atom-changer (day button, month button, year button)
         *
         * @method _onAbsoluteChangerClick
         * @private
         */
        _onAbsoluteChangerClick: function (elem) {
            var elemData = InkElement.data(elem);

            if( Number(elemData.calDay) ){
                this.setDate( [this._year, this._month + 1, elemData.calDay].join('-') );
                this._hide();
            } else if( Number(elemData.calMonth) ) {
                this._month = Number(elemData.calMonth) - 1;
                this._showDefaultView();
                this._updateCal();
            } else if( Number(elemData.calYear) ){
                this._changeYear(Number(elemData.calYear));
            }
        },

        _changeYear: function (year) {
            year = +year;
            if(year){
                this._year = year;
                if( typeof this._options.onYearSelected === 'function' ){
                    this._options.onYearSelected(this, {
                        'year': this._year
                    });
                }
                this._showMonthSelector();
            }
        },

        _clean: function () {
            if(this._options.displayInSelect){
                this._options.yearField.selectedIndex = 0;
                this._options.monthField.selectedIndex = 0;
                this._options.dayField.selectedIndex = 0;
            } else {
                this._element.value = '';
            }
        },

        /**
         * Hides the DatePicker. If the component is shy (options.shy), behaves differently.
         *
         * @method _hide
         * @param [blur=true] Set to false to indicate this is not just a blur and force hiding even if the component is shy.
         */
        _hide: function(blur) {
            blur = blur === undefined ? true : blur;
            if (blur === false || (blur && this._options.shy)) {
                Css.addClassName(this._containerObject, 'hide-all');
            }
        },

        /**
         * Sets the range of dates allowed to be selected in the Date Picker
         *
         * @method _setMinMax
         * @param {String} dateRange Two dates separated by a ':'. Example: 2013-01-01:2013-12-12
         * @private
         */
        _setMinMax: function( dateRange ) {
            var self = this;

            var noMinLimit = {
                _year: -Number.MAX_VALUE,
                _month: 0,
                _day: 1
            };

            var noMaxLimit = {
                _year: Number.MAX_VALUE,
                _month: 11,
                _day: 31
            };

            function noLimits() {
                self._min = noMinLimit;
                self._max = noMaxLimit;
            }

            if (!dateRange) { return noLimits(); }

            var dates = dateRange.split( ':' );
            var rDate = /^(\d{4})((\-)(\d{1,2})((\-)(\d{1,2}))?)?$/;

            InkArray.each([
                        {name: '_min', date: dates[0], noLim: noMinLimit},
                        {name: '_max', date: dates[1], noLim: noMaxLimit}
                    ], Ink.bind(function (data) {

                var lim = data.noLim;

                if ( data.date.toUpperCase() === 'NOW' ) {
                    var now = new Date();
                    lim = dateishFromDate(now);
                } else if (data.date.toUpperCase() === 'EVER') {
                    lim = data.noLim;
                } else if ( rDate.test( data.date ) ) {
                    lim = dateishFromYMDString(data.date);

                    lim._month = clamp(lim._month, 0, 11);
                    lim._day = clamp(lim._day, 1, this._daysInMonth( lim._year, lim._month ));
                }

                this[data.name] = lim;
            }, this));

            // Should be equal, or min should be smaller
            var valid = this._dateCmp(this._max, this._min) !== -1;

            if (!valid) {
                noLimits();
            }
        },

        /**
         * Checks if a date is between the valid range.
         * Starts by checking if the date passed is valid. If not, will fallback to the 'today' date.
         * Then checks if the all params are inside of the date range specified. If not, it will fallback to the nearest valid date (either Min or Max).
         *
         * @method _fitDateToRange
         * @param  {Number} year  Year with 4 digits (yyyy)
         * @param  {Number} month Month
         * @param  {Number} day   Day
         * @return {Array}       Array with the final processed date.
         * @private
         */
        _fitDateToRange: function( date ) {
            if ( !this._isValidDate( date ) ) {
                date = dateishFromDate(new Date());
            }

            if (this._dateCmp(date, this._min) === -1) {
                return Ink.extendObj({}, this._min);
            } else if (this._dateCmp(date, this._max) === 1) {
                return Ink.extendObj({}, this._max);
            }

            return Ink.extendObj({}, date);  // date is okay already, just copy it.
        },

        /**
         * Checks whether a date is within the valid date range
         * @method _dateWithinRange
         * @param year
         * @param month
         * @param day
         * @return {Boolean}
         * @private
         */
        _dateWithinRange: function (date) {
            if (!arguments.length) {
                date = this;
            }

            return  (!this._dateAboveMax(date) &&
                    (!this._dateBelowMin(date)));
        },

        _dateAboveMax: function (date) {
            return this._dateCmp(date, this._max) === 1;
        },

        _dateBelowMin: function (date) {
            return this._dateCmp(date, this._min) === -1;
        },

        _dateCmp: function (self, oth) {
            return this._dateCmpUntil(self, oth, '_day');
        },

        /**
         * _dateCmp with varied precision. You can compare down to the day field, or, just to the month.
         * // the following two dates are considered equal because we asked
         * // _dateCmpUntil to just check up to the years.
         *
         * _dateCmpUntil({_year: 2000, _month: 10}, {_year: 2000, _month: 11}, '_year') === 0
         */
        _dateCmpUntil: function (self, oth, depth) {
            var props = ['_year', '_month', '_day'];
            var i = -1;

            do {
                i++;
                if      (self[props[i]] > oth[props[i]]) { return 1; }
                else if (self[props[i]] < oth[props[i]]) { return -1; }
            } while (props[i] !== depth &&
                    self[props[i + 1]] !== undefined && oth[props[i + 1]] !== undefined);

            return 0;
        },

        /**
         * Sets the markup in the default view mode (showing the days).
         * Also disables the previous and next buttons in case they don't meet the range requirements.
         *
         * @method _showDefaultView
         * @private
         */
        _showDefaultView: function(){
            this._yearSelector.style.display = 'none';
            this._monthSelector.style.display = 'none';
            this._monthPrev.childNodes[0].className = 'change_month_prev';
            this._monthNext.childNodes[0].className = 'change_month_next';

            if ( !this._getPrevMonth() ) {
                this._monthPrev.childNodes[0].className = 'action_inactive';
            }

            if ( !this._getNextMonth() ) {
                this._monthNext.childNodes[0].className = 'action_inactive';
            }

            this._monthContainer.style.display = 'block';
        },

        /**
         * Updates the date shown on the datepicker
         *
         * @method _updateDate
         * @private
         */
        _updateDate: function(){
            var dataParsed;
            if(!this._options.displayInSelect && this._element.value){
                dataParsed = this._parseDate(this._element.value);
            } else if (this._options.displayInSelect) {
                dataParsed = {
                    _year: this._options.yearField[this._options.yearField.selectedIndex].value,
                    _month: this._options.monthField[this._options.monthField.selectedIndex].value - 1,
                    _day: this._options.dayField[this._options.dayField.selectedIndex].value
                };
            }

            if (dataParsed) {
                dataParsed = this._fitDateToRange(dataParsed);
                this._year = dataParsed._year;
                this._month = dataParsed._month;
                this._day = dataParsed._day;
            }
            this.setDate();
            this._updateDescription();
            this._renderMonth();
        },

        /**
         * Updates the date description shown at the top of the datepicker
         *
         * EG "12 de November"
         *
         * @method  _updateDescription
         * @private
         */
        _updateDescription: function(){
            this._monthChanger.innerHTML = this._options.month[ this._month + 1 ];
            this._ofText.innerHTML = this._options.ofText;
            this._yearChanger.innerHTML = this._year;
        },

        /**
         * Renders the year selector view of the datepicker
         *
         * @method _showYearSelector
         * @private
         */
        _showYearSelector: function(inc){
            this._incrementViewingYear(inc);

            var firstYear = this._year - (this._year % 10);
            var thisYear = firstYear - 1;
            var str = "<li><ul>";

            if (thisYear > this._min._year) {
                str += '<li><a href="#year_prev" class="change_year_prev">' + this._options.prevLinkText + '</a></li>';
            } else {
                str += '<li>&nbsp;</li>';
            }

            for (var i=1; i < 11; i++){
                if (i % 4 === 0){
                    str+='</ul><ul>';
                }

                thisYear = firstYear + i - 1;

                str += this._getYearButtonHtml(thisYear);
            }

            if( thisYear < this._max._year){
                str += '<li><a href="#year_next" class="change_year_next">' + this._options.nextLinkText + '</a></li>';
            } else {
                str += '<li>&nbsp;</li>';
            }

            str += "</ul></li>";

            this._yearSelector.innerHTML = str;
            this._monthPrev.childNodes[0].className = 'action_inactive';
            this._monthNext.childNodes[0].className = 'action_inactive';
            this._monthSelector.style.display = 'none';
            this._monthContainer.style.display = 'none';
            this._yearSelector.style.display = 'block';
        },

        /**
         * For the year selector.
         *
         * Update this._year, to find the next decade or use nextValidDateFn to find it.
         */
        _incrementViewingYear: function (inc) {
            if (!inc) { return; }

            var year = +this._year + inc*10;
            year = year - year % 10;
            if ( year > this._max._year || year + 9 < this._min._year){
                return;
            }
            this._year = +this._year + inc*10;
        },

        _getYearButtonHtml: function (thisYear) {
            if ( this._acceptableYear({_year: thisYear}) ){
                var className = (thisYear === this._year) ? ' class="ink-calendar-on"' : '';
                return '<li><a href="#" data-cal-year="' + thisYear + '"' + className + '>' + thisYear +'</a></li>';
            } else {
                return '<li><a href="#" class="ink-calendar-off">' + thisYear +'</a></li>';

            }
        },

        /**
         * Show the month selector (happens when you click a year, or the "month" link.
         * @method _showMonthSelector
         * @private
         */
        _showMonthSelector: function () {
            this._yearSelector.style.display = 'none';
            this._monthContainer.style.display = 'none';
            this._monthPrev.childNodes[0].className = 'action_inactive';
            this._monthNext.childNodes[0].className = 'action_inactive';
            this._addMonthClassNames();
            this._monthSelector.style.display = 'block';
        },

        /**
         * This function returns the given date in the dateish format
         *
         * @method _parseDate
         * @param {String} dateStr A date on a string.
         * @private
         */
        _parseDate: function(dateStr){
            var date = InkDate.set( this._options.format , dateStr );
            if (date) {
                return dateishFromDate(date);
            }
            return null;
        },

        /**
         * Checks if a date is valid
         *
         * @method _isValidDate
         * @param {Dateish} date
         * @private
         * @return {Boolean} True if the date is valid, false otherwise
         */
        _isValidDate: function(date){
            var yearRegExp = /^\d{4}$/;
            var validOneOrTwo = /^\d{1,2}$/;
            return (
                yearRegExp.test(date._year)     &&
                validOneOrTwo.test(date._month) &&
                validOneOrTwo.test(date._day)   &&
                +date._month + 1 >= 1  &&
                +date._month + 1 <= 12 &&
                +date._day       >= 1  &&
                +date._day       <= this._daysInMonth(date._year, date._month + 1)
            );
        },

        /**
         * Checks if a given date is an valid format.
         *
         * @method _isDate
         * @param {String} format A date format.
         * @param {String} dateStr A date on a string.
         * @private
         * @return {Boolean} True if the given date is valid according to the given format
         */
        _isDate: function(format, dateStr){
            try {
                if (typeof format === 'undefined'){
                    return false;
                }
                var date = InkDate.set( format , dateStr );
                if( date && this._isValidDate( dateishFromDate(date) )) {
                    return true;
                }
            } catch (ex) {}

            return false;
        },

        _acceptableDay: function (date) {
            return this._acceptableDateComponent(date, 'validDayFn');
        },

        _acceptableMonth: function (date) {
            return this._acceptableDateComponent(date, 'validMonthFn');
        },

        _acceptableYear: function (date) {
            return this._acceptableDateComponent(date, 'validYearFn');
        },

        /** DRY base for the above 2 functions */
        _acceptableDateComponent: function (date, userCb) {
            if (this._options[userCb]) {
                return this._callUserCallbackBool(this._options[userCb], date);
            } else {
                return this._dateWithinRange(date);
            }
        },

        /**
         * This method returns the date written with the format specified on the options
         *
         * @method _writeDateInFormat
         * @private
         * @return {String} Returns the current date of the object in the specified format
         */
        _writeDateInFormat:function(){
            return InkDate.get( this._options.format , this.getDate());
        },

        /**
         * This method allows the user to set the DatePicker's date on run-time.
         *
         * @method setDate
         * @param {String} dateString A date string in yyyy-mm-dd format.
         * @public
         */
        setDate: function( dateString ) {
            if ( /\d{4}-\d{1,2}-\d{1,2}/.test( dateString ) ) {
                var auxDate = dateString.split( '-' );
                this._year  = +auxDate[ 0 ];
                this._month = +auxDate[ 1 ] - 1;
                this._day   = +auxDate[ 2 ];
            }

            this._setDate( );
        },

        /**
         * Get the current date as a JavaScript date.
         *
         * @method getDate
         */
        getDate: function () {
            if (!this._day) {
                throw 'Ink.UI.DatePicker: Still picking a date. Cannot getDate now!';
            }
            return new Date(this._year, this._month, this._day);
        },

        /**
         * Sets the chosen date on the target input field
         *
         * @method _setDate
         * @param {DOMElement} objClicked Clicked object inside the DatePicker's calendar.
         * @private
         */
        _setDate : function( objClicked ) {
            if (objClicked) {
                var data = InkElement.data(objClicked);
                this._day = (+data.calDay) || this._day;
            }

            var dt = this._fitDateToRange(this);

            this._year = dt._year;
            this._month = dt._month;
            this._day = dt._day;

            if(!this._options.displayInSelect){
                this._element.value = this._writeDateInFormat();
            } else {
                this._options.dayField.value   = this._day;
                this._options.monthField.value = this._month + 1;
                this._options.yearField.value  = this._year;
            }

            if(this._options.onSetDate) {
                this._options.onSetDate( this , { date : this.getDate() } );
            }
        },

        /**
         * Makes the necessary work to update the calendar
         * when choosing a different month
         *
         * @method _updateCal
         * @param {Number} inc Indicates previous or next month
         * @private
         */
        _updateCal: function(inc){
            if( typeof this._options.onMonthSelected === 'function' ){
                this._options.onMonthSelected(this, {
                    'year': this._year,
                    'month' : this._month
                });
            }
            if (inc && this._updateMonth(inc) === null) {
                return;
            }
            this._renderMonth();
        },

        /**
         * Function that returns the number of days on a given month on a given year
         *
         * @method _daysInMonth
         * @param {Number} _y - year
         * @param {Number} _m - month
         * @private
         * @return {Number} The number of days on a given month on a given year
         */
        _daysInMonth: function(_y,_m){
            var exceptions = {
                2: ((_y % 400 === 0) || (_y % 4 === 0 && _y % 100 !== 0)) ? 29 : 28,
                4: 30,
                6: 30,
                9: 30,
                11: 30
            };

            return exceptions[_m] || 31;
        },


        /**
         * Updates the calendar when a different month is chosen
         *
         * @method _updateMonth
         * @param {Number} incValue - indicates previous or next month
         * @private
         */
        _updateMonth: function(incValue){
            var date;
            if (incValue > 0) {
                date = this._getNextMonth();
            } else if (incValue < 0) {
                date = this._getPrevMonth();
            }
            if (!date) { return null; }
            this._year = date._year;
            this._month = date._month;
            this._day = date._day;
        },

        /**
         * Get the next month we can show.
         */
        _getNextMonth: function (date) {
            return this._tryLeap( date, 'Month', 'next', function (d) {
                    d._month += 1;
                    if (d._month > 11) {
                        d._month = 0;
                        d._year += 1;
                    }
                    return d;
                });
        },

        /**
         * Get the previous month we can show.
         */
        _getPrevMonth: function (date) {
            return this._tryLeap( date, 'Month', 'prev', function (d) {
                    d._month -= 1;
                    if (d._month < 0) {
                        d._month = 11;
                        d._year -= 1;
                    }
                    return d;
                });
        },

        /**
         * Get the next year we can show.
         */
        _getPrevYear: function (date) {
            return this._tryLeap( date, 'Year', 'prev', function (d) {
                    d._year -= 1;
                    return d;
                });
        },

        /**
         * Get the next year we can show.
         */
        _getNextYear: function (date) {
            return this._tryLeap( date, 'Year', 'next', function (d) {
                    d._year += 1;
                    return d;
                });
        },

        /**
         * DRY base for a function which tries to get the next or previous valid year or month.
         *
         * It checks if we can go forward by using _dateCmp with atomic
         * precision (this means, {_year} for leaping years, and
         * {_year, month} for leaping months), then it tries to get the
         * result from the user-supplied callback (nextDateFn or prevDateFn),
         * and when this is not present, advance the date forward using the
         * `advancer` callback.
         */
        _tryLeap: function (date, atomName, directionName, advancer) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };

            var maxOrMin = directionName === 'prev' ? '_min' : '_max';
            var boundary = this[maxOrMin];

            // Check if we're by the boundary of min/max year/month
            if (this._dateCmpUntil(date, boundary, atomName) === 0) {
                return null;  // We're already at the boundary. Bail.
            }

            var leapUserCb = this._options[directionName + 'ValidDateFn'];
            if (leapUserCb) {
                return this._callUserCallbackDate(leapUserCb, date);
            } else {
                date = advancer(date);
            }

            date = this._fitDateToRange(date);

            return this['_acceptable' + atomName](date) ? date : null;
        },

        _getNextDecade: function (date) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };
            var decade = this._getCurrentDecade(date);
            if (decade + 10 > this._max._year) { return null; }
            return decade + 10;
        },

        _getPrevDecade: function (date) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };
            var decade = this._getCurrentDecade(date);
            if (decade - 10 < this._min._year) { return null; }
            return decade - 10;
        },

        /** Returns the decade given a date or year*/
        _getCurrentDecade: function (year) {
            year = year ? (year._year || year) : this._year;
            return Math.floor(year / 10) * 10;  // Round to first place
        },

        _callUserCallbackBase: function (cb, date) {
            return cb.call(this, date._year, date._month + 1, date._day);
        },

        _callUserCallbackBool: function (cb, date) {
            return !!this._callUserCallbackBase(cb, date);
        },

        _callUserCallbackDate: function (cb, date) {
            var ret = this._callUserCallbackBase(cb, date);
            return ret ? dateishFromDate(ret) : null;
        },

        /**
         * Key-value object that (for a given key) points to the correct parsing format for the DatePicker
         * @property _dateParsers
         * @type {Object}
         * @readOnly
         */
        _dateParsers: {
            'yyyy-mm-dd' : 'Y-m-d' ,
            'yyyy/mm/dd' : 'Y/m/d' ,
            'yy-mm-dd'   : 'y-m-d' ,
            'yy/mm/dd'   : 'y/m/d' ,
            'dd-mm-yyyy' : 'd-m-Y' ,
            'dd/mm/yyyy' : 'd/m/Y' ,
            'dd-mm-yy'   : 'd-m-y' ,
            'dd/mm/yy'   : 'd/m/y' ,
            'mm/dd/yyyy' : 'm/d/Y' ,
            'mm-dd-yyyy' : 'm-d-Y'
        },

        /**
         * Renders the current month
         *
         * @method _renderMonth
         * @private
         */
        _renderMonth: function(){
            var month = this._month;
            var year = this._year;
            
            // Week day of the first day in the month
            var wDayFirst = (new Date( year , month , 1 )).getDay();

            var startWeekDay = this._options.startWeekDay || 0;

            this._showDefaultView();

            if(startWeekDay > wDayFirst) {
                wDayFirst = 7 + startWeekDay - wDayFirst;
            } else {
                wDayFirst += startWeekDay;
            }

            var html = '';

            html += this._getMonthCalendarHeaderHtml(startWeekDay);

            var counter = 0;
            html+='<ul>';

            var emptyHtml = '<li class="ink-calendar-empty">&nbsp;</li>';

            // Add padding if the first day of the month is not monday.
            if(wDayFirst !== 0) {
                var empties = wDayFirst - startWeekDay - 1;
                counter += empties;
                html += strRepeat(empties, emptyHtml);
            }

            html += this._getDayButtonsHtml(counter, year, month);

            html += '</ul>';

            this._monthContainer.innerHTML = html;
        },

        _getDayButtonsHtml: function (counter, year, month) {
            var daysInMonth = this._daysInMonth(year, month);
            var ret = '';
            for (var day = 1; day <= daysInMonth; day++) {
                if (counter === 7){ // new week
                    counter=0;
                    ret += '<ul>';
                }

                ret += this._getDayButtonHtml(year, month, day);

                counter++;
                if(counter === 7){
                    ret += '</ul>';
                }
            }
            return ret;
        },

        /**
         * Get the HTML markup for a single day in month view, given year, month, day.
         *
         * @method _getDayButtonHtml
         * @private
         */
        _getDayButtonHtml: function (year, month, day) {
            var attrs = ' ';
            var date = dateishFromYMD(year, month, day);
            if (!this._acceptableDay(date)) {
                attrs += 'class="ink-calendar-off"';
            } else {
                attrs += 'data-cal-day="' + day + '"';
            }

            if (this._day && this._dateCmp(date, this) === 0) {
                attrs += 'class="ink-calendar-on" data-cal-day="' + day + '"';
            }

            return '<li><a href="#" ' + attrs + '>' + day + '</a></li>';   
        },

        /** Write the top bar of the calendar (M T W T F S S) */
        _getMonthCalendarHeaderHtml: function (startWeekDay) {
            var ret = '<ul class="ink-calendar-header">';
            var wDay;
            for(var i=0; i<7; i++){
                wDay = (startWeekDay + i) % 7;
                ret += '<li>' +
                    this._options.wDay[wDay].substring(0,1) +
                    '</li>';
            }
            return ret + '</ul>';
        },

        /**
         * This method adds class names to month buttons, to visually distinguish.
         *
         * @method _addMonthClassNames
         * @param {DOMElement} parent DOMElement where all the months are.
         * @private
         */
        _addMonthClassNames: function(parent){
            InkArray.forEach(
                (parent || this._monthSelector).getElementsByTagName('a'),
                Ink.bindMethod(this, '_addMonthButtonClassNames'));
        },

        /**
         * Add the ink-calendar-on className if the given button is the current month,
         * otherwise add the ink-calendar-off className if the given button refers to
         * an unacceptable month (given dateRange and validMonthFn)
         */
        _addMonthButtonClassNames: function (btn) {
            var data = InkElement.data(btn);
            if (!data.calMonth) { throw 'not a calendar month button!'; }

            var month = +data.calMonth - 1;

            if ( month === this._month ) {
                Css.addClassName( btn, 'ink-calendar-on' );  // This month
                Css.removeClassName( btn, 'ink-calendar-off' );
            } else {
                Css.removeClassName( btn, 'ink-calendar-on' );  // Not this month

                var toDisable = !this._acceptableMonth({_year: this._year, _month: month});
                Css.addRemoveClassName( btn, 'ink-calendar-off', toDisable);
            }
        },

        /**
         * Prototype's method to allow the 'i18n files' to change all objects' language at once.
         * @param  {Object} options Object with the texts' configuration.
         *     @param {String} closeText Text of the close anchor
         *     @param {String} cleanText Text of the clean text anchor
         *     @param {String} prevLinkText "Previous" link's text
         *     @param {String} nextLinkText "Next" link's text
         *     @param {String} ofText The text "of", present in 'May of 2013'
         *     @param {Object} month An object with keys from 1 to 12 that have the full months' names
         *     @param {Object} wDay An object with keys from 0 to 6 that have the full weekdays' names
         * @public
         */
        lang: function( options ){
            this._lang = options;
        },

        /**
         * This calls the rendering of the selected month. (Deprecated: use show() instead)
         *
         * @method showMonth
         * @public
         */
        showMonth: function(){
            this._renderMonth();
        },

        /**
         * Returns true if the calendar sceen is in 'select day' mode
         * 
         * @return {Boolean} True if the calendar sceen is in 'select day' mode
         * @public
         */
        isMonthRendered: function(){
            var header = Selector.select('.ink-calendar-header', this._containerObject)[0];

            return ((Css.getStyle(header.parentNode,'display') !== 'none') &&
                    (Css.getStyle(header.parentNode.parentNode,'display') !== 'none') );
        },

        /**
         * Destroys this datepicker, removing it from the page.
         *
         * @public
         **/
        destroy: function () {
            InkElement.unwrap(this._element);
            InkElement.remove(this._wrapper);
            InkElement.remove(this._containerObject);
            Common.unregisterInstance.call(this);
        }
    };

    return DatePicker;
});

/*
 * @module Ink.UI.Draggable_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule("Ink.UI.Draggable","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.Dom.Browser_1", "Ink.Dom.Selector_1", "Ink.UI.Common_1"],function( InkElement, InkEvent, Css, Browser, Selector, Common) {
    'use strict';

    var x = 0,
        y = 1;  // For accessing coords in [x, y] arrays
    
    // Get a value between two boundaries
    function between (val, min, max) {
        val = Math.min(val, max);
        val = Math.max(val, min);
        return val;
    }

    /**
     * @class Ink.UI.Draggable
     * @version 1
     * @constructor
     * @param {String|DOMElement} target    Target element.
     * @param {Object} [options] Optional object for configuring the component
     *     @param {String}            [options.constraint]      Movement constraint. None by default. Can be `vertical`, `horizontal`, or `both`.
     *     @param {String|DomElement} [options.constraintElm]   Constrain dragging to be within this element. None by default.
     *     @param {Number}            [options.top,left,right,bottom]   Limits for constraining draggable movement.
     *     @param {String|DOMElement} [options.handle]          if specified, this element will be used as a handle for dragging.
     *     @param {Boolean}           [options.revert]          if true, reverts the draggable to the original position when dragging stops
     *     @param {String}            [options.cursor]          cursor type (CSS `cursor` value) used when the mouse is over the draggable object
     *     @param {Number}            [options.zIndex]          zindex applied to the draggable element while dragged
     *     @param {Number}            [options.fps]             if defined, on drag will run every n frames per second only
     *     @param {DomElement}        [options.droppableProxy]  if set, a shallow copy of the droppableProxy will be put on document.body with transparent bg
     *     @param {String}            [options.mouseAnchor]     defaults to mouse cursor. can be 'left|center|right top|center|bottom'
     *     @param {String}            [options.dragClass='drag'] class to add when the draggable is being dragged.
     *     @param {Function}          [options.onStart]        callback called when dragging starts
     *     @param {Function}          [options.onEnd]          callback called when dragging stops
     *     @param {Function}          [options.onDrag]         callback called while dragging, prior to position updates
     *     @param {Function}          [options.onChange]       callback called while dragging, after position updates
     * @example
     *     Ink.requireModules( ['Ink.UI.Draggable_1'], function( Draggable ){
     *         new Draggable( '#myElementId' );
     *     });
     */
    var Draggable = function(element, options) {
        this.init(element, options);
    };

    Draggable.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @param {String|DOMElement} element ID of the element or DOM Element.
         * @param {Object} [options] Options object for configuration of the module.
         * @private
         */
        init: function(element, options) {
            var o = Ink.extendObj( {
                constraint:         false,
                constraintElm:      false,
                top:                false,
                right:              false,
                bottom:             false,
                left:               false,
                handle:             options.handler /* old option name */ || false,
                revert:             false,
                cursor:             'move',
                zindex:             options.zindex /* old option name */ || 9999,
                dragClass:          'drag',
                onStart:            false,
                onEnd:              false,
                onDrag:             false,
                onChange:           false,
                droppableProxy:     false,
                mouseAnchor:        undefined,
                skipChildren:       true,
                fps:                100,
                debug:              false
            }, options || {}, InkElement.data(element));

            this.options = o;
            this.element = Common.elOrSelector(element);
            this.constraintElm = o.constraintElm && Common.elOrSelector(o.constraintElm);

            this.handle             = false;
            this.elmStartPosition   = false;
            this.active             = false;
            this.dragged            = false;
            this.prevCoords         = false;
            this.placeholder        = false;

            this.position           = false;
            this.zindex             = false;
            this.firstDrag          = true;

            if (o.fps) {
                this.deltaMs = 1000 / o.fps;
                this.lastRunAt = 0;
            }

            this.handlers = {};
            this.handlers.start         = Ink.bindEvent(this._onStart,this);
            this.handlers.dragFacade    = Ink.bindEvent(this._onDragFacade,this);
            this.handlers.drag          = Ink.bindEvent(this._onDrag,this);
            this.handlers.end           = Ink.bindEvent(this._onEnd,this);
            this.handlers.selectStart   = function(event) {    InkEvent.stop(event);    return false;    };

            // set handle
            this.handle = (this.options.handle) ?
                Common.elOrSelector(this.options.handle) : this.element;
            this.handle.style.cursor = o.cursor;

            InkEvent.observe(this.handle, 'touchstart', this.handlers.start);
            InkEvent.observe(this.handle, 'mousedown', this.handlers.start);

            if (Browser.IE) {
                InkEvent.observe(this.element, 'selectstart', this.handlers.selectStart);
            }
        },

        /**
         * Removes the ability of the element of being dragged
         * 
         * @method destroy
         * @public
         */
        destroy: function() {
            InkEvent.stopObserving(this.handle, 'touchstart', this.handlers.start);
            InkEvent.stopObserving(this.handle, 'mousedown', this.handlers.start);

            if (Browser.IE) {
                InkEvent.stopObserving(this.element, 'selectstart', this.handlers.selectStart);
            }
        },

        /**
         * Gets coordinates for a given event (with added page scroll)
         * 
         * @method _getCoords
         * @param {Object} e window.event object.
         * @return {Array} Array where the first position is the x coordinate, the second is the y coordinate
         * @private
         */
        _getCoords: function(e) {
            var ps = [InkElement.scrollWidth(), InkElement.scrollHeight()];
            return {
                x: (e.touches ? e.touches[0].clientX : e.clientX) + ps[x],
                y: (e.touches ? e.touches[0].clientY : e.clientY) + ps[y]
            };
        },

        /**
         * Clones src element's relevant properties to dst
         * 
         * @method _cloneStyle
         * @param {DOMElement} src Element from where we're getting the styles
         * @param {DOMElement} dst Element where we're placing the styles.
         * @private
         */
        _cloneStyle: function(src, dst) {
            dst.className = src.className;
            dst.style.borderWidth   = '0';
            dst.style.padding       = '0';
            dst.style.position      = 'absolute';
            dst.style.width         = InkElement.elementWidth(src)        + 'px';
            dst.style.height        = InkElement.elementHeight(src)    + 'px';
            dst.style.left          = InkElement.elementLeft(src)        + 'px';
            dst.style.top           = InkElement.elementTop(src)        + 'px';
            dst.style.cssFloat      = Css.getStyle(src, 'float');
            dst.style.display       = Css.getStyle(src, 'display');
        },

        /**
         * onStart event handler
         * 
         * @method _onStart
         * @param {Object} e window.event object
         * @return {Boolean|void} In some cases return false. Otherwise is void
         * @private
         */
        _onStart: function(e) {
            if (!this.active && InkEvent.isLeftClick(e) || typeof e.button === 'undefined') {

                var tgtEl = InkEvent.element(e);
                if (this.options.skipChildren && tgtEl !== this.handle) {    return;    }

                InkEvent.stop(e);

                Css.addClassName(this.element, this.options.dragClass);

                this.elmStartPosition = [
                    InkElement.elementLeft(this.element),
                    InkElement.elementTop( this.element)
                ];

                var pos = [
                    parseInt(Css.getStyle(this.element, 'left'), 10),
                    parseInt(Css.getStyle(this.element, 'top'),  10)
                ];

                var dims = InkElement.elementDimensions(this.element);

                this.originalPosition = [ pos[x] ? pos[x]: null, pos[y] ? pos[y] : null ];
                this.delta = this._getCoords(e); // mouse coords at beginning of drag

                this.active = true;
                this.position = Css.getStyle(this.element, 'position');
                this.zindex = Css.getStyle(this.element, 'zIndex');

                var div = document.createElement('div');
                div.style.position      = this.position;
                div.style.width         = dims[x] + 'px';
                div.style.height        = dims[y] + 'px';
                div.style.marginTop     = Css.getStyle(this.element, 'margin-top');
                div.style.marginBottom  = Css.getStyle(this.element, 'margin-bottom');
                div.style.marginLeft    = Css.getStyle(this.element, 'margin-left');
                div.style.marginRight   = Css.getStyle(this.element, 'margin-right');
                div.style.borderWidth   = '0';
                div.style.padding       = '0';
                div.style.cssFloat      = Css.getStyle(this.element, 'float');
                div.style.display       = Css.getStyle(this.element, 'display');
                div.style.visibility    = 'hidden';

                this.delta2 = [ this.delta.x - this.elmStartPosition[x], this.delta.y - this.elmStartPosition[y] ]; // diff between top-left corner of obj and mouse
                if (this.options.mouseAnchor) {
                    var parts = this.options.mouseAnchor.split(' ');
                    var ad = [dims[x], dims[y]];    // starts with 'right bottom'
                    if (parts[0] === 'left') {    ad[x] = 0;    } else if(parts[0] === 'center') {    ad[x] = parseInt(ad[x]/2, 10);    }
                    if (parts[1] === 'top') {     ad[y] = 0;    } else if(parts[1] === 'center') {    ad[y] = parseInt(ad[y]/2, 10);    }
                    this.applyDelta = [this.delta2[x] - ad[x], this.delta2[y] - ad[y]];
                }

                var dragHandlerName = this.options.fps ? 'dragFacade' : 'drag';

                this.placeholder = div;

                if (this.options.onStart) {        this.options.onStart(this.element, e);        }

                if (this.options.droppableProxy) {    // create new transparent div to optimize DOM traversal during drag
                    this.proxy = document.createElement('div');
                    dims = [
                        window.innerWidth     || document.documentElement.clientWidth   || document.body.clientWidth,
                        window.innerHeight    || document.documentElement.clientHeight  || document.body.clientHeight
                    ];
                    var fs = this.proxy.style;
                    fs.width            = dims[x] + 'px';
                    fs.height           = dims[y] + 'px';
                    fs.position         = 'fixed';
                    fs.left             = '0';
                    fs.top              = '0';
                    fs.zIndex           = this.options.zindex + 1;
                    fs.backgroundColor  = '#FF0000';
                    Css.setOpacity(this.proxy, 0);

                    var firstEl = document.body.firstChild;
                    while (firstEl && firstEl.nodeType !== 1) {    firstEl = firstEl.nextSibling;    }
                    document.body.insertBefore(this.proxy, firstEl);

                    
                    InkEvent.observe(this.proxy, 'mousemove', this.handlers[dragHandlerName]);
                    InkEvent.observe(this.proxy, 'touchmove', this.handlers[dragHandlerName]);
                }
                else {
                    InkEvent.observe(document, 'mousemove', this.handlers[dragHandlerName]);
                }

                this.element.style.position = 'absolute';
                this.element.style.zIndex = this.options.zindex;
                this.element.parentNode.insertBefore(this.placeholder, this.element);

                this._onDrag(e);

                InkEvent.observe(document, 'mouseup',      this.handlers.end);
                InkEvent.observe(document, 'touchend',     this.handlers.end);

                return false;
            }
        },

        /**
         * Function that gets the timestamp of the current run from time to time. (FPS)
         * 
         * @method _onDragFacade
         * @param {Object} window.event object.
         * @private
         */
        _onDragFacade: function(e) {
            var now = +new Date();
            if (!this.lastRunAt || now > this.lastRunAt + this.deltaMs) {
                this.lastRunAt = now;
                this._onDrag(e);
            }
        },

        /**
         * Function that handles the dragging movement
         * 
         * @method _onDrag
         * @param {Object} window.event object.
         * @private
         */
        _onDrag: function(e) {
            if (this.active) {
                InkEvent.stop(e);
                this.dragged = true;
                var mouseCoords = this._getCoords(e),
                    mPosX       = mouseCoords.x,
                    mPosY       = mouseCoords.y,
                    o           = this.options,
                    newX        = false,
                    newY        = false;

                if (this.prevCoords && mPosX !== this.prevCoords.x || mPosY !== this.prevCoords.y) {
                    if (o.onDrag) {        o.onDrag(this.element, e);        }
                    this.prevCoords = mouseCoords;

                    newX = this.elmStartPosition[x] + mPosX - this.delta.x;
                    newY = this.elmStartPosition[y] + mPosY - this.delta.y;

                    var draggableSize = InkElement.elementDimensions(this.element);

                    if (this.constraintElm) {
                        var offset = InkElement.offset(this.constraintElm);
                        var size = InkElement.elementDimensions(this.constraintElm);
                        var constTop = offset[y] + (o.top || 0),
                            constBottom = offset[y] + size[y] - (o.bottom || 0),
                            constLeft = offset[x] + (o.left || 0),
                            constRight = offset[x] + size[x] - (o.right || 0);

                        newY = between(newY, constTop, constBottom - draggableSize[y]);
                        newX = between(newX, constLeft, constRight - draggableSize[x]);
                    } else if (o.constraint) {
                        var right = o.right === false ? InkElement.pageWidth() - draggableSize[x] : o.right,
                            left = o.left === false ? 0 : o.left,
                            top = o.top === false ? 0 : o.top,
                            bottom = o.bottom === false ? InkElement.pageHeight() - draggableSize[y] : o.bottom;
                        if (o.constraint === 'horizontal' || o.constraint === 'both') {
                            newX = between(newX, left, right);
                        }
                        if (o.constraint === 'vertical' || o.constraint === 'both') {
                            newY = between(newY, top, bottom);
                        }
                    }

                    var Droppable = Ink.getModule('Ink.UI.Droppable_1');
                    if (this.firstDrag) {
                        if (Droppable) {    Droppable.updateAll();    }
                        /*this.element.style.position = 'absolute';
                        this.element.style.zIndex = this.options.zindex;
                        this.element.parentNode.insertBefore(this.placeholder, this.element);*/
                        this.firstDrag = false;
                    }

                    if (newX) {        this.element.style.left = newX + 'px';        }
                    if (newY) {        this.element.style.top  = newY + 'px';        }

                    if (Droppable) {
                        // apply applyDelta defined on drag init
                        var mouseCoords2 = this.options.mouseAnchor ?
                            {x: mPosX - this.applyDelta[x], y: mPosY - this.applyDelta[y]} :
                            mouseCoords;
                        Droppable.action(mouseCoords2, 'drag', e, this.element);
                    }
                    if (o.onChange) {    o.onChange(this);    }
                }
            }
        },

        /**
         * Function that handles the end of the dragging process
         * 
         * @method _onEnd
         * @param {Object} window.event object.
         * @private
         */
        _onEnd: function(e) {
            InkEvent.stopObserving(document, 'mousemove', this.handlers.drag);
            InkEvent.stopObserving(document, 'touchmove', this.handlers.drag);

            if (this.options.fps) {
                this._onDrag(e);
            }

            Css.removeClassName(this.element, this.options.dragClass);

            if (this.active && this.dragged) {

                if (this.options.droppableProxy) {    // remove transparent div...
                    document.body.removeChild(this.proxy);
                }

                if (this.pt) {    // remove debugging element...
                    InkElement.remove(this.pt);
                    this.pt = undefined;
                }

                /*if (this.options.revert) {
                    this.placeholder.parentNode.removeChild(this.placeholder);
                }*/

                if(this.placeholder) {
                    InkElement.remove(this.placeholder);
                }

                if (this.options.revert) {
                    this.element.style.position = this.position;
                    if (this.zindex !== null) {
                        this.element.style.zIndex = this.zindex;
                    }
                    else {
                        this.element.style.zIndex = 'auto';
                    } // restore default zindex of it had none

                    this.element.style.left = (this.originalPosition[x]) ? this.originalPosition[x] + 'px' : '';
                    this.element.style.top  = (this.originalPosition[y]) ? this.originalPosition[y] + 'px' : '';
                }

                if (this.options.onEnd) {
                    this.options.onEnd(this.element, e);
                }
                
                var Droppable = Ink.getModule('Ink.UI.Droppable_1');
                if (Droppable) {
                    Droppable.action(this._getCoords(e), 'drop', e, this.element);
                }

                this.position   = false;
                this.zindex     = false;
                this.firstDrag  = true;
            }

            this.active         = false;
            this.dragged        = false;
        }
    };

    return Draggable;

});

/**
 * @module Ink.UI.Dropdown_1
 *
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Dropdown', '1', ['Ink.UI.Common_1', 'Ink.UI.Toggle_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(Common, Toggle, InkEvent, InkElement) {
    'use strict';

    function Dropdown(trigger, options) {
        this._init(trigger, options);
    }

    Dropdown.prototype = {
        /**
         * Use this UI module to achieve a dropdown menu.
         *
         * @class Ink.UI.Dropdown
         *
         * @constructor
         * @param {DOMElement|String}   trigger
         * @param {Object}              options
         * @param {DOMElement|String}   options.target Target of the dropdown action.
         */
        _init: function(trigger, options) {
            this._element = Common.elOrSelector(trigger);
            this._options = Common.options('Ink.UI.Dropdown_1', {
                'target':           ['Element'],
                'hoverOpen':        ['Number', null],
                'dismissOnInsideClick': ['Boolean', false],
                'dismissOnOutsideClick': ['Boolean', true],
                'dismissAfter':     ['Number', null],
                'onInsideClick':    ['Function', null],
                'onOutsideClick':   ['Function', null],
                'onOpen':           ['Function', null],
                'onDismiss':        ['Function', null]
            }, options || {}, this._element);

            this._toggle = new Toggle(this._element, {
                target: this._options.target,
                closeOnInsideClick: null,
                closeOnClick: false,
                onChangeState: Ink.bind(function (newState) {
                    return this._openOrDismiss(newState, true, true);
                }, this)
            });

            // Event where we set this._dismissTimeout and clear this._openTimeout
            InkEvent.observeMulti([this._options.target, this._element],
                'mouseout', Ink.bindMethod(this, '_onMouseOut'));

            // Events to keep clearing this._dismissTimeout and set this._openTimeout
            InkEvent.observeMulti([this._options.target, this._element],
                'mouseover', Ink.bindMethod(this, '_onMouseOver'));

            // to call dismissOnInsideClick and onInsideClick
            InkEvent.observe(this._options.target, 'click', Ink.bindMethod(this, '_onInsideClick'));
            // to call dismissOnOutsideClick and onOutsideClick
            InkEvent.observe(document, 'click', Ink.bindMethod(this, '_onOutsideClick'));
        },

        /**
         * Called when the mouse is over the toggler, or the dropdown.
         *
         * Deals with "hoverOpen" by setting the dropdown to open later. Also cancels "dismissAfter".
         * @method _onMouseOver
         * @private
         **/
        _onMouseOver: function () {
            if (typeof this._options.hoverOpen === 'number' && this._toggle.getState() === false) {
                clearTimeout(this._openTimeout);
                this._openTimeout = setTimeout(
                    Ink.bindMethod(this, 'open', true),
                    this._options.hoverOpen * 1000);
            }
            if (typeof this._options.dismissAfter === 'number') {
                clearTimeout(this._dismissTimeout);
            }
        },

        /**
         * Called when the mouse leaves either the toggler, or the dropdown.
         *
         * Deals with "dismissAfter" by setting the dropdown to be dismissed later. Also cancels "hoverOpen".
         * @method _onMouseOut
         * @private
         **/
        _onMouseOut: function () {
            if (typeof this._options.dismissAfter === 'number' && this._toggle.getState() === true) {
                clearTimeout(this._dismissTimeout);
                this._dismissTimeout = setTimeout(
                    Ink.bindMethod(this, 'dismiss', true),
                    this._options.dismissAfter * 1000);
            }
            if (typeof this._options.hoverOpen === 'number') {
                clearTimeout(this._openTimeout);
            }
        },

        /**
         * Handle clicks on the dropdown.
         * @method _onInsideClick
         * @private
         */
        _onInsideClick: function (event) {
            var ret = this._handlerCall('onInsideClick', InkEvent.element(event));
            if (ret === false) { return false; }
            if (this._options.dismissOnInsideClick) {
                this.dismiss(true);
            }
            InkEvent.stop(event);
        },

        /**
         * Handle clicks outside the dropdown.
         * @method _onInsideClick
         * @private
         */
        _onOutsideClick: function (event) {
            var target = InkEvent.element(event);
            var foundElem = InkElement.findUpwardsHaving(target, Ink.bind(function (needle) {
                return needle === this._element;
            }, this));
            var foundTarget = InkElement.findUpwardsHaving(target, Ink.bind(function (needle) {
                return needle === this._options.target;
            }, this));

            if (!foundElem && !foundTarget) {
                var ret = this._handlerCall('onOutsideClick', target);
                if (ret === false) { return false; }
                if (this._options.dismissOnOutsideClick) {
                    this.dismiss(true);
                }
                InkEvent.stop(event);
            }
        },

        /**
         * Dismiss the dropdown.
         *
         * @method dismiss
         * @param [callHandler=false] call onDismiss handler
         */
        dismiss: function (callHandler, doNotInformToggle) {
            this._openOrDismiss(false, callHandler, doNotInformToggle);
        },

        /**
         * Open the dropdown
         *
         * @method open
         * @param [callHandler=false] call onOpen handler
         */
        open: function (callHandler, _doNotInformToggle) {
            this._openOrDismiss(true, callHandler, _doNotInformToggle);
        },

        /**
         * DRY'ing up open() and dismiss()
         *
         * @method _openOrDismiss
         * @param [newState=false]
         * @param [callHandler=false]
         * @private
         */
        _openOrDismiss: function (newState, callHandler, _doNotInformToggle) {
            if (this._toggle && this._toggle.getState() === newState) { return; }
            if (callHandler) {
                if (this._handlerCall(newState ? 'onOpen' : 'onDismiss') === false) {
                    return false;  // canceled by event handler
                }
            }
            if (!_doNotInformToggle) {
                this._toggle.setState(newState);
            }
            clearTimeout(this._dismissTimeout);
            clearTimeout(this._openTimeout);
        },

        /**
         * call a method given by the user through the options
         *
         * @method _handlerCall
         * @params handler {String} The handler name in this._options
         * @params ... Arguments to pass to function
         */
        _handlerCall: function (handler/*, ... */) {
            if (this._options[handler]) {
                return this._options[handler].call(this, [].slice.call(arguments, 1));
            }
        }
    };

    return Dropdown;
});


/**
 * @module Ink.UI.Droppable_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule("Ink.UI.Droppable","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.UI.Common_1", "Ink.Util.Array_1", "Ink.Dom.Selector_1"], function( InkElement, InkEvent, Css, Common, InkArray, Selector) {
    'use strict';

    // Higher order functions
    var hAddClassName = function (element) {
        return function (className) {return Css.addClassName(element, className);};
    };
    var hRemoveClassName = function (element) {
        return function (className) {return Css.removeClassName(element, className);};
    };

    /**
     * @class Ink.UI.Droppable
     * @version 1
     * @static
     */
    var Droppable = {
        /**
         * Flag that determines if it's in debug mode or not
         *
         * @property debug
         * @type {Boolean}
         * @private
         */
        debug: false,

        /**
         * Array with the data of each element (`{element: ..., data: ..., options: ...}`)
         * 
         * @property _droppables
         * @type {Array}
         * @private
         */
        _droppables: [],

        /**
         * Array of data for each draggable. (`{element: ..., data: ...}`)
         *
         * @property _draggables
         * @type {Array}
         * @private
         */
        _draggables: [],

        /**
         * Makes an element droppable and adds it to the stack of droppable elements.
         * Can consider it a constructor of droppable elements, but where no Droppable object is returned.
         * 
         * In the following arguments, any events/callbacks you may pass, can be either functions or strings. If the 'move' or 'copy' strings are passed, the draggable gets moved into this droppable. If 'revert' is passed, an acceptable droppable is moved back to the element it came from.

         *
         * @method add
         * @param {String|DOMElement}       element     Target element
         * @param {Object}                  [options]   options object
         *     @param {String}      [options.hoverClass] Classname(s) applied when an acceptable draggable element is hovering the element
         *     @param {String}      [options.accept]    Selector for choosing draggables which can be dropped in this droppable.
         *     @param {Function}    [options.onHover]   callback called when an acceptable draggable element is hovering the droppable. Gets the draggable and the droppable element as parameters.
         *     @param {Function|String} [options.onDrop] callback called when an acceptable draggable element is dropped. Gets the draggable, the droppable and the event as parameters.
         *     @param {Function|String} [options.onDropOut] callback called when a droppable is dropped outside this droppable. Gets the draggable, the droppable and the event as parameters. (see above for string options).
         * @public
         *
         * @example
         *
         *       <style type="text/css">
         *           .hover {
         *               border: 1px solid red;
         *           }
         *           .left, .right {
         *               float: left; width: 50%;
         *               outline: 1px solid gray;
         *               min-height: 2em;
         *           }
         *       </style>
         *        <ul class="left">
         *            <li>Draggable 1</li>
         *            <li>Draggable 2</li>
         *            <li>Draggable 3</li>
         *        </ul>
         *        <ul class="right">
         *        </ul>
         *        <script type="text/javascript">
         *            Ink.requireModules(['Ink.UI.Draggable_1', 'Ink.UI.Droppable_1'], function (Draggable, Droppable) {
         *                new Draggable('.left li:eq(0)', {});
         *                new Draggable('.left li:eq(1)', {});
         *                new Draggable('.left li:eq(2)', {});
         *                Droppable.add('.left', {onDrop: 'move', onDropOut: 'revert'});
         *                Droppable.add('.right', {onDrop: 'move', onDropOut: 'revert'});
         *            })
         *        </script>
         *
         */
        add: function(element, options) {
            element = Common.elOrSelector(element, 'Droppable.add target element');

            var opt = Ink.extendObj( {
                hoverClass:     options.hoverclass /* old name */ || false,
                accept:         false,
                onHover:        false,
                onDrop:         false,
                onDropOut:      false
            }, options || {}, InkElement.data(element));
            
            if (typeof opt.hoverClass === 'string') {
                opt.hoverClass = opt.hoverClass.split(/\s+/);
            }
            
            function cleanStyle(draggable) {
                draggable.style.position = 'inherit';
            }
            var that = this;
            var namedEventHandlers = {
                move: function (draggable, droppable/*, event*/) {
                    cleanStyle(draggable);
                    droppable.appendChild(draggable);
                },
                copy: function (draggable, droppable/*, event*/) {
                    cleanStyle(draggable);
                    droppable.appendChild(draggable.cloneNode);
                },
                revert: function (draggable/*, droppable, event*/) {
                    that._findDraggable(draggable).originalParent.appendChild(draggable);
                    cleanStyle(draggable);
                }
            };
            var name;

            if (typeof opt.onHover === 'string') {
                name = opt.onHover;
                opt.onHover = namedEventHandlers[name];
                if (opt.onHover === undefined) {
                    throw new Error('Unknown hover event handler: ' + name);
                }
            }
            if (typeof opt.onDrop === 'string') {
                name = opt.onDrop;
                opt.onDrop = namedEventHandlers[name];
                if (opt.onDrop === undefined) {
                    throw new Error('Unknown drop event handler: ' + name);
                }
            }
            if (typeof opt.onDropOut === 'string') {
                name = opt.onDropOut;
                opt.onDropOut = namedEventHandlers[name];
                if (opt.onDropOut === undefined) {
                    throw new Error('Unknown dropOut event handler: ' + name);
                }
            }

            var elementData = {
                element: element,
                data: {},
                options: opt
            };
            this._droppables.push(elementData);
            this._update(elementData);
        },
        
        /**
         * find droppable data about `element`. this data is added in `.add`
         *
         * @method _findData
         * @param {DOMElement} element  Needle
         * @return {object}             Droppable data of the element
         * @private
         */
        _findData: function (element) {
            var elms = this._droppables;
            for (var i = 0, len = elms.length; i < len; i++) {
                if (elms[i].element === element) {
                    return elms[i];
                }
            }
        },
        /**
         * Find draggable data about `element`
         *
         * @method _findDraggable
         * @param {DOMElement} element  Needle
         * @return {Object}             Draggable data queried
         * @private
         */
        _findDraggable: function (element) {
            var elms = this._draggables;
            for (var i = 0, len = elms.length; i < len; i++) {
                if (elms[i].element === element) {
                    return elms[i];
                }
            }
        },

        /**
         * Invoke every time a drag starts
         * 
         * @method updateAll
         * @private
         */
        updateAll: function() {
            InkArray.each(this._droppables, Droppable._update);
        },

        /**
         * Updates location and size of droppable element
         * 
         * @method update * @param {String|DOMElement} element - target element
         * @private
         */
        update: function(element) {
            this._update(this._findData(element));
        },

        _update: function(elementData) {
            var data = elementData.data;
            var element = elementData.element;
            data.left   = InkElement.offsetLeft(element);
            data.top    = InkElement.offsetTop( element);
            data.right  = data.left + InkElement.elementWidth( element);
            data.bottom = data.top  + InkElement.elementHeight(element);
        },

        /**
         * Removes an element from the droppable stack and removes the droppable behavior
         * 
         * @method remove
         * @param {String|DOMElement} elOrSelector  Droppable element to disable.
         * @return {Boolean} Whether the object was found and deleted
         * @public
         */
        remove: function(el) {
            el = Common.elOrSelector(el);
            var len = this._droppables.length;
            for (var i = 0; i < len; i++) {
                if (this._droppables[i].element === el) {
                    this._droppables.splice(i, 1);
                    break;
                }
            }
            return len !== this._droppables.length;
        },

        /**
         * Method called by a draggable to execute an action on a droppable
         * 
         * @method action
         * @param {Object} coords    coordinates where the action happened
         * @param {String} type      type of action. drag or drop.
         * @param {Object} ev        Event object
         * @param {Object} draggable draggable element
         * @private
         */
        action: function(coords, type, ev, draggable) {
            // check all droppable elements
            InkArray.each(this._droppables, Ink.bind(function(elementData) {
                var data = elementData.data;
                var opt = elementData.options;
                var element = elementData.element;

                if (opt.accept && !Selector.matches(opt.accept, [draggable]).length) {
                    return;
                }

                if (type === 'drag' && !this._findDraggable(draggable)) {
                    this._draggables.push({
                        element: draggable,
                        originalParent: draggable.parentNode
                    });
                }

                // check if our draggable is over our droppable
                if (coords.x >= data.left && coords.x <= data.right &&
                        coords.y >= data.top && coords.y <= data.bottom) {
                    // INSIDE
                    if (type === 'drag') {
                        if (opt.hoverClass) {
                            InkArray.each(opt.hoverClass,
                                hAddClassName(element));
                        }
                        if (opt.onHover) {
                            opt.onHover(draggable, element);
                        }
                    } else if (type === 'drop') {
                        if (opt.hoverClass) {
                            InkArray.each(opt.hoverClass,
                                hRemoveClassName(element));
                        }
                        if (opt.onDrop) {
                            opt.onDrop(draggable, element, ev);
                        }
                    }
                } else {
                    // OUTSIDE

                    if (type === 'drag' && opt.hoverClass) {
                        InkArray.each(opt.hoverClass, hRemoveClassName(element));
                    } else if (type === 'drop') {
                        if(opt.onDropOut){
                            opt.onDropOut(draggable, element, ev);
                        }
                    }
                }
            }, this));
        }
    };

    return Droppable;
});

/**
 * @module Ink.UI.FormValidator_1
 * @author inkdev AT sapo.pt
 * @version 1
 **/
Ink.createModule('Ink.UI.FormValidator', '1', ['Ink.Dom.Element_1', 'Ink.Dom.Css_1','Ink.Util.Validator_1','Ink.Dom.Selector_1'], function( InkElement, Css, InkValidator , Selector) {
    'use strict';

    function elementsWithSameName(elm) {
        if (!elm.name) { return []; }
        if (!elm.form) {
            return Selector.select('name="' + elm.name + '"');
        }
        var ret = elm.form[elm.name];
        if(typeof(ret.length) === 'undefined') {
            ret = [ret];
        }
        return ret;
    }
    /**
     * @class Ink.UI.FormValidator
     * @version 1
     */
    var FormValidator = {

        /**
         * Specifies the version of the component
         *
         * @property version
         * @type {String}
         * @readOnly
         * @public
         */
        version: '1',

        /**
         * Available flags to use in the validation process.
         * The keys are the 'rules', and their values are objects with the key 'msg', determining
         * what is the error message.
         *
         * @property _flagMap
         * @type {Object}
         * @readOnly
         * @private
         */
        _flagMap: {
            //'ink-fv-required': {msg: 'Campo obrigat&oacute;rio'},
            'ink-fv-required': {msg: 'Required field'},
            //'ink-fv-email': {msg: 'E-mail inv&aacute;lido'},
            'ink-fv-email': {msg: 'Invalid e-mail address'},
            //'ink-fv-url': {msg: 'URL inv&aacute;lido'},
            'ink-fv-url': {msg: 'Invalid URL'},
            //'ink-fv-number': {msg: 'N&uacute;mero inv&aacute;lido'},
            'ink-fv-number': {msg: 'Invalid number'},
            //'ink-fv-phone_pt': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_pt': {msg: 'Invalid phone number'},
            //'ink-fv-phone_cv': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_cv': {msg: 'Invalid phone number'},
            //'ink-fv-phone_mz': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_mz': {msg: 'Invalid phone number'},
            //'ink-fv-phone_ao': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_ao': {msg: 'Invalid phone number'},
            //'ink-fv-date': {msg: 'Data inv&aacute;lida'},
            'ink-fv-date': {msg: 'Invalid date'},
            //'ink-fv-confirm': {msg: 'Confirma&ccedil;&atilde;o inv&aacute;lida'},
            'ink-fv-confirm': {msg: 'Confirmation does not match'},
            'ink-fv-custom': {msg: ''}
        },

        /**
         * This property holds all form elements for later validation
         *
         * @property elements
         * @type {Object}
         * @public
         */
        elements: {},

        /**
         * This property holds the objects needed to cross-check for the 'confirm' rule
         *
         * @property confirmElms
         * @type {Object}
         * @public
         */
        confirmElms: {},

        /**
         * This property holds the previous elements in the confirmElms property, but with a
         * true/false specifying if it has the class ink-fv-confirm.
         *
         * @property hasConfirm
         * @type {Object}
         */
        hasConfirm: {},

        /**
         * Defined class name to use in error messages label
         *
         * @property _errorClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorClassName: 'tip error',

        /**
         * @property _errorValidationClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorValidationClassName: 'validaton',

        /**
         * @property _errorTypeWarningClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorTypeWarningClassName: 'warning',

        /**
         * @property _errorTypeErrorClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorTypeErrorClassName: 'error',

        /**
         * Check if a form is valid or not
         * 
         * @method validate
         * @param {DOMElement|String} elm DOM form element or form id
         * @param {Object} options Options for
         *      @param {Function} [options.onSuccess] function to run when form is valid
         *      @param {Function} [options.onError] function to run when form is not valid
         *      @param {Array} [options.customFlag] custom flags to use to validate form fields
         * @public
         * @return {Boolean} Whether the form is deemed valid or not.
         *
         * @example
         *
         * ## What markup do I need?
         *
         * Besides the markup structure you can see in
         * <a href="http://ink.sapo.pt/forms#building"></a>, you need to add
         * the `ink-fv-*` classes to your inputs, which correspond to validation
         * rules in this component. Available classes are:
         *
         * - `ink-fv-required` : Required field
         * - `ink-fv-email`    : Valid e-mail
         * - `ink-fv-url`      : Valid URL address
         * - `ink-fv-number`   : Valid number
         * - `ink-fv-phone_pt`, `ink-fv-phone_cv`, `ink-fv-phone_mz`, `ink-fv-phone_ao` : Valid telephone number in Portugal, Cape Verde, Mozambique or Angola.
         * - `ink-fv-date`     : Valid date
         * - `ink-fv-confirm`  : Make the user type the same thing twice. Common rule for confirming passwords.
         * - `ink-fv-custom`   : Custom rule (see below example "Custom rule")
         * 
         *           E-mail field: <input class="ink-fv-required ink-fv-email"><br>
         *           Phone number field: <input class="ink-fv-number ink-fv-required"><br>
         *           Website field (optional): <input class="ink-fv-url">
         * 
         * ## Simple usage
         *
         * So you have a form and would like to validate it? This example shows
         * how to validate a form and stop it from being submitted when invalid.
         * To use this, add the several ink-fv-* classes to your input elements.
         *
         * The validate() function will also add "invalid" classes to each of
         * your elements so the user gets a color feedback and an error message
         * below each element (control-group, really).
         *
         *         var myForm = Ink.i('my-form');
         *         InkEvent.observe(myForm, 'submit', function (ev) {
         *             var formIsValid = FormValidator.validate(myForm);
         *             if (!formIsValid) {
         *                 InkEvent.stop(ev);  // Cancel submission of form.
         *             }
         *         });
         *
         * @example
         *
         * ## Custom rule.
         *
         * The following code validates using a custom rule named `minthree`,
         * which fails if the input string has less than three characters.
         * To do this, you must add the `ink-fv-custom` and `minthree` classes
         * to the input elements you want to validate, and pass the `customFlag`
         * option to this function, like so:
         *
         *         var isValid = FormValidator.validate(myForm, {
         *             customFlag: [
         *                 {
         *                     flag: 'minthree',  // The name of this rule (add this class to your <input>s
         *                     msg: 'Please input at least three characters',  // Error message when rule fails
         *                     callback: function (el) {
         *                         return el.value.length >= 3  // Return true when okay, false when not
         *                     }
         *                 }
         *             ]
         *         });
         */
        validate: function(elm, options) {
            this._free();

            options = Ink.extendObj({
                onSuccess: false,
                onError: false,
                customFlag: false,
                confirmGroup: []
            }, options || {});

            if(typeof(elm) === 'string') {
                elm = document.getElementById(elm);
            }
            if(elm === null){
                return false;
            }
            this.element = elm;

            if(typeof(this.element.id) === 'undefined' || this.element.id === null || this.element.id === '') {
                // generate a random ID
                // TODO ugly and potentially problematic, and you know Murphy's law.
                this.element.id = 'ink-fv_randomid_'+(Math.round(Math.random() * 99999));
            }

            this.custom = options.customFlag;

            this.confirmGroup = options.confirmGroup;

            var fail = this._validateElements();

            if(fail.length > 0) {
                if(options.onError) {
                    options.onError(fail);
                } else {
                    this._showError(elm, fail);
                }
                return false;
            } else {
                if(!options.onError) {
                    this._clearError(elm);
                }
                this._clearCache();
                if(options.onSuccess) {
                    options.onSuccess();
                }
                return true;
            }

        },

        /**
         * Reset previously generated validation errors
         * 
         * @method reset
         * @public
         */
        reset: function()
        {
            this._clearError();
            this._clearCache();
        },

        /**
         * Cleans the object
         * 
         * @method _free
         * @private
         */
        _free: function()
        {
            this.element = null;
            //this.elements = [];
            this.custom = false;
            this.confirmGroup = false;
        },

        /**
         * Cleans the properties responsible for caching
         * 
         * @method _clearCache
         * @private
         */
        _clearCache: function()
        {
            this.element = null;
            this.elements = [];
            this.custom = false;
            this.confirmGroup = false;
        },

        /**
         * Gets the form elements and stores them in the caching properties
         * 
         * @method _getElements
         * @private
         */
        _getElements: function()
        {
            //this.elements = [];
            // if(typeof(this.elements[this.element.id]) !== 'undefined') {
            //     return;
            // }

            var elements = this.elements[this.element.id] = [];
            this.confirmElms[this.element.id] = [];
            //console.log(this.element);
            //console.log(this.element.elements);
            var formElms = Selector.select(':input', this.element);
            var curElm = false;
            for(var i=0, totalElm = formElms.length; i < totalElm; i++) {
                curElm = formElms[i];
                var type = (curElm.getAttribute('type') + '').toLowerCase();

                if (type === 'radio' || type === 'checkbox') {
                    if(elements.length === 0 ||
                            (
                             curElm.getAttribute('type') !== elements[elements.length - 1].getAttribute('type') &&
                            curElm.getAttribute('name') !== elements[elements.length - 1].getAttribute('name')
                            )) {
                        for(var flag in this._flagMap) {
                            if(Css.hasClassName(curElm, flag)) {
                                elements.push(curElm);
                                break;
                            }
                        }
                    }
                } else {
                    for(var flag2 in this._flagMap) {
                        if(Css.hasClassName(curElm, flag2) && flag2 !== 'ink-fv-confirm') {
                            /*if(flag2 == 'ink-fv-confirm') {
                                this.confirmElms[this.element.id].push(curElm);
                                this.hasConfirm[this.element.id] = true;
                            }*/
                            elements.push(curElm);
                            break;
                        }
                    }

                    if(Css.hasClassName(curElm, 'ink-fv-confirm')) {
                        this.confirmElms[this.element.id].push(curElm);
                        this.hasConfirm[this.element.id] = true;
                    }

                }
            }
        },

        /**
         * Runs the validation for each element
         * 
         * @method _validateElements
         * @private
         */
        _validateElements: function() {
            var oGroups;
            this._getElements();
            if(this.hasConfirm[this.element.id] === true) {
                oGroups = this._makeConfirmGroups();
            }

            var errors = [];

            var curElm = false;
            var customErrors = false;
            var inArray;
            for(var i=0, totalElm = this.elements[this.element.id].length; i < totalElm; i++) {
                inArray = false;
                curElm = this.elements[this.element.id][i];

                if(!curElm.disabled) {
                    for(var flag in this._flagMap) {
                        if(Css.hasClassName(curElm, flag)) {
                            if(flag !== 'ink-fv-custom' && flag !== 'ink-fv-confirm') {
                                if(!this._isValid(curElm, flag)) {
                                    if(!inArray) {
                                        errors.push({elm: curElm, errors:[flag]});
                                        inArray = true;
                                    } else {
                                        errors[(errors.length - 1)].errors.push(flag);
                                    }
                                }
                            } else if(flag !== 'ink-fv-confirm'){
                                customErrors = this._isCustomValid(curElm);
                                if(customErrors.length > 0) {
                                    errors.push({elm: curElm, errors:[flag], custom: customErrors});
                                }
                            } else if(flag === 'ink-fv-confirm'){
                                continue;
                            }
                        }
                    }
                }
            }
            errors = this._validateConfirmGroups(oGroups, errors);
            //console.log(InkDumper.returnDump(errors));
            return errors;
        },

        /**
         * Runs the 'confirm' validation for each group of elements
         * 
         * @method _validateConfirmGroups
         * @param {Array} oGroups Array/Object that contains the group of confirm objects
         * @param {Array} errors Array that will store the errors
         * @private
         * @return {Array} Array of errors that was passed as 2nd parameter (either changed, or not, depending if errors were found).
         */
        _validateConfirmGroups: function(oGroups, errors) {
            //console.log(oGroups);
            var curGroup = false;
            for(var i in oGroups) if (oGroups.hasOwnProperty(i)) {
                curGroup = oGroups[i];
                if(curGroup.length === 2) {
                    if(curGroup[0].value !== curGroup[1].value) {
                        errors.push({elm:curGroup[1], errors:['ink-fv-confirm']});
                    }
                }
            }
            return errors;
        },

        /**
         * Creates the groups of 'confirm' objects
         * 
         * @method _makeConfirmGroups
         * @private
         * @return {Array|Boolean} Returns the array of confirm elements or false on error.
         */
        _makeConfirmGroups: function()
        {
            var oGroups;
            if(this.confirmGroup && this.confirmGroup.length > 0) {
                oGroups = {};
                var curElm = false;
                var curGroup = false;
                //this.confirmElms[this.element.id];
                for(var i=0, total=this.confirmElms[this.element.id].length; i < total; i++) {
                    curElm = this.confirmElms[this.element.id][i];
                    for(var j=0, totalG=this.confirmGroup.length; j < totalG; j++) {
                        curGroup =  this.confirmGroup[j];
                        if(Css.hasClassName(curElm, curGroup)) {
                            if(typeof(oGroups[curGroup]) === 'undefined') {
                                oGroups[curGroup] = [curElm];
                            } else {
                                oGroups[curGroup].push(curElm);
                            }
                        }
                    }
                }
                return oGroups;
            } else {
                if(this.confirmElms[this.element.id].length === 2) {
                    oGroups = {
                        "ink-fv-confirm": [
                            this.confirmElms[this.element.id][0],
                            this.confirmElms[this.element.id][1]
                        ]
                    };
                }
                return oGroups;
            }
            return false;
        },

        /**
         * Validates an element with a custom validation
         * 
         * @method _isCustomValid
         * @param {DOMElemenmt} elm Element to be validated
         * @private
         * @return {Array} Array of errors. If no errors are found, results in an empty array.
         */
        _isCustomValid: function(elm)
        {
            var customErrors = [];
            var curFlag = false;
            for(var i=0, tCustom = this.custom.length; i < tCustom; i++) {
                curFlag = this.custom[i];
                if(Css.hasClassName(elm, curFlag.flag)) {
                    if(!curFlag.callback(elm, curFlag.msg)) {
                        customErrors.push({flag: curFlag.flag, msg: curFlag.msg});
                    }
                }
            }
            return customErrors;
        },

        /**
         * Runs the normal validation functions for a specific element
         * 
         * @method _isValid
         * @param {DOMElement} elm DOMElement that will be validated
         * @param {String} fieldType Rule to be validated. This must be one of the keys present in the _flagMap property.
         * @private
         * @return {Boolean} The result of the validation.
         */
        _isValid: function(elm, fieldType) {
            var nodeName = elm.nodeName.toLowerCase();
            var inputType = (elm.getAttribute('type') || '').toLowerCase();
            var value = this._trim(elm.value);

            // When we're analyzing emails, telephones, etc, and the field is
            // empty, we check if it is required. If not required, it's valid.
            if (fieldType !== 'ink-fv-required' &&
                    inputType !== 'checkbox' && inputType !== 'radio' &&
                    value === '') {
                return !Css.hasClassName(elm, 'ink-fv-required');
            }

            switch(fieldType) {
                case 'ink-fv-required':
                    if(nodeName === 'select') {
                        if(elm.selectedIndex > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    if(inputType !== 'checkbox' && inputType !== 'radio' &&
                            value !== '') {
                        return true;  // A input type=text,email,etc.
                    } else if(inputType === 'checkbox' || inputType === 'radio') {
                        var aFormRadios = elementsWithSameName(elm);
                        var isChecked = false;
                        // check if any input of the radio is checked
                        for(var i=0, totalRadio = aFormRadios.length; i < totalRadio; i++) {
                            if(aFormRadios[i].checked === true) {
                                isChecked = true;
                                break;
                            }
                        }
                        return isChecked;
                    }
                    return false;

                case 'ink-fv-email':
                    return InkValidator.mail(elm.value);

                case 'ink-fv-url':
                    return InkValidator.url(elm.value);

                case 'ink-fv-number':
                    return !isNaN(Number(elm.value)) && isFinite(Number(elm.value));

                case 'ink-fv-phone_pt':
                    return InkValidator.isPTPhone(elm.value);

                case 'ink-fv-phone_cv':
                    return InkValidator.isCVPhone(elm.value);

                case 'ink-fv-phone_ao':
                    return InkValidator.isAOPhone(elm.value);

                case 'ink-fv-phone_mz':
                    return InkValidator.isMZPhone(elm.value);

                case 'ink-fv-date':
                    var Element = Ink.getModule('Ink.Dom.Element',1);
                    var dataset = Element.data( elm );
                    var validFormat = 'yyyy-mm-dd';

                    if( Css.hasClassName(elm, 'ink-datepicker') && ('format' in dataset) ){
                        validFormat = dataset.format;
                    } else if( ('validFormat' in dataset) ){
                        validFormat = dataset.validFormat;
                    }

                    if( !(validFormat in InkValidator._dateParsers ) ){
                        var validValues = [];
                        for( var val in InkValidator._dateParsers ){
                            if (InkValidator._dateParsers.hasOwnProperty(val)) {
                                validValues.push(val);
                            }
                        }
                        throw new Error(
                            'The attribute data-valid-format must be one of ' +
                            'the following values: ' + validValues.join(', '));
                    }
                    
                    return InkValidator.isDate( validFormat, elm.value );
                case 'ink-fv-custom':
                    break;
            }

            return false;
        },

        /**
         * Makes the necessary changes to the markup to show the errors of a given element
         * 
         * @method _showError
         * @param {DOMElement} formElm The form element to be changed to show the errors
         * @param {Array} aFail An array with the errors found.
         * @private
         */
        _showError: function(formElm, aFail) {
            this._clearError(formElm);

            //ink-warning-field

            //console.log(aFail);
            var curElm = false;
            for(var i=0, tFail = aFail.length; i < tFail; i++) {
                curElm = aFail[i].elm;
                if (curElm) {
                    this._showAnErrorOnElement(curElm, aFail[i]);
                }
            }
        },

        _showAnErrorOnElement: function (curElm, error) {
            /* jshint noempty:false */

            var controlGroupElm = InkElement.findUpwardsByClass(
                    curElm, 'control-group');
            var controlElm = InkElement.findUpwardsByClass(
                    curElm, 'control');

            var errorClasses = [
                this._errorClassName,
                this._errorTypeClassName].join(' ');

            var errorMsg = InkElement.create('p', {
                className: errorClasses
            });

            if(error.errors[0] !== 'ink-fv-custom') {
                errorMsg.innerHTML = this._flagMap[error.errors[0]].msg;
            } else {
                errorMsg.innerHTML = error.custom[0].msg;
            }

            var target = (controlElm || controlGroupElm);
            if (target) {
                target.appendChild(errorMsg);
            } else {
                InkElement.insertAfter(errorMsg, curElm);
            }

            if (controlElm) {
                if(error.errors[0] === 'ink-fv-required') {
                    Css.addClassName(controlGroupElm, 'validation error');
                } else {
                    Css.addClassName(controlGroupElm, 'validation warning');
                }
            }
        },

        /**
         * Clears the error of a given element. Normally executed before any validation, for all elements, as a reset.
         * 
         * @method _clearErrors
         * @param {DOMElement} formElm Form element to be cleared.
         * @private
         */
        _clearError: function(formElm) {
            //return;
            var aErrorLabel = formElm.getElementsByTagName('p');

            var curElm;
            var control;

            for(var i = (aErrorLabel.length - 1); i >= 0; i--) {
                curElm = aErrorLabel[i];
                if(Css.hasClassName(curElm, this._errorClassName)) {
                    control = InkElement.findUpwardsBySelector(curElm, '.control-group');
                    if (control) {
                        Css.removeClassName(control, ['validation', 'error', 'warning']);
                    }

                    if(Css.hasClassName(curElm, this._errorClassName, true /*both*/)) {
                        InkElement.remove(curElm);
                    }
                }
            }

            var aErrorLabel2 = formElm.getElementsByTagName('ul');
            for(i = (aErrorLabel2.length - 1); i >= 0; i--) {
                curElm = aErrorLabel2[i];
                if(Css.hasClassName(curElm, 'control-group')) {
                    Css.removeClassName(curElm, 'validation error');
                }
            }
        },

        /**
         * Removes unnecessary spaces to the left or right of a string
         * 
         * @method _trim
         * @param {String} stri String to be trimmed
         * @private
         * @return {String|undefined} String trimmed.
         */
        _trim: function(str)
        {
            if(typeof(str) === 'string')
            {
                return str.replace(/^\s+|\s+$|\n+$/g, '');
            }
        }
    };

    return FormValidator;

});
/**
 * @module Ink.UI.FormValidator_2
 * @author inkdev AT sapo.pt
 * @version 2
 */
Ink.createModule('Ink.UI.FormValidator', '2', [ 'Ink.UI.Common_1','Ink.Dom.Element_1','Ink.Dom.Event_1','Ink.Dom.Selector_1','Ink.Dom.Css_1','Ink.Util.Array_1','Ink.Util.I18n_1','Ink.Util.Validator_1'], function( Common, Element, Event, Selector, Css, InkArray, I18n, InkValidator ) {
    'use strict';

    /**
     * Validation Functions to be used
     * Some functions are a port from PHP, others are the 'best' solutions available
     *
     * @type {Object}
     * @private
     * @static
     */
    var validationFunctions = {

        /**
         * Checks if the value is actually defined and is not empty
         *
         * @method validationFunctions.required
         * @param  {String} value Value to be checked
         * @return {Boolean}       True case is defined, false if it's empty or not defined.
         */
        'required': function( value ){
            return ( (typeof value !== 'undefined') && ( !(/^\s*$/).test(value) ) );
        },

        /**
         * Checks if the value has a minimum length
         *
         * @method validationFunctions.min_length
         * @param  {String} value   Value to be checked
         * @param  {String|Number} minSize Number of characters that the value at least must have.
         * @return {Boolean}         True if the length of value is equal or bigger than the minimum chars defined. False if not.
         */
        'min_length': function( value, minSize ){
            return ( (typeof value === 'string') && ( value.length >= parseInt(minSize,10) ) );
        },

        /**
         * Checks if the value has a maximum length
         *
         * @method validationFunctions.max_length
         * @param  {String} value   Value to be checked
         * @param  {String|Number} maxSize Number of characters that the value at maximum can have.
         * @return {Boolean}         True if the length of value is equal or smaller than the maximum chars defined. False if not.
         */
        'max_length': function( value, maxSize ){
            return ( (typeof value === 'string') && ( value.length <= parseInt(maxSize,10) ) );
        },

        /**
         * Checks if the value has an exact length
         *
         * @method validationFunctions.exact_length
         * @param  {String} value   Value to be checked
         * @param  {String|Number} exactSize Number of characters that the value must have.
         * @return {Boolean}         True if the length of value is equal to the size defined. False if not.
         */
        'exact_length': function( value, exactSize ){
            return ( (typeof value === 'string') && ( value.length === parseInt(exactSize,10) ) );
        },

        /**
         * Checks if the value has a valid e-mail address
         *
         * @method validationFunctions.email
         * @param  {String} value   Value to be checked
         * @return {Boolean}         True if the value is a valid e-mail address. False if not.
         */
        'email': function( value ){
            return ( ( typeof value === 'string' ) && InkValidator.mail( value ) );
        },

        /**
         * Checks if the value has a valid URL
         *
         * @method validationFunctions.url
         * @param  {String} value   Value to be checked
         * @param  {Boolean} fullCheck Flag that specifies if the value must be validated as a full url (with the protocol) or not.
         * @return {Boolean}         True if the URL is considered valid. False if not.
         */
        'url': function( value, fullCheck ){
            fullCheck = fullCheck || false;
            return ( (typeof value === 'string') && InkValidator.url( value, fullCheck ) );
        },

        /**
         * Checks if the value is a valid IP. Supports ipv4 and ipv6
         *
         * @method validationFunctions.ip
         * @param  {String} value   Value to be checked
         * @param  {String} ipType Type of IP to be validated. The values are: ipv4, ipv6. By default is ipv4.
         * @return {Boolean}         True if the value is a valid IP address. False if not.
         */
        'ip': function( value, ipType ){
            if( typeof value !== 'string' ){
                return false;
            }

            return InkValidator.isIP(value, ipType);
        },

        /**
         * Checks if the value is a valid phone number. Supports several countries, based in the Ink.Util.Validator class.
         *
         * @method validationFunctions.phone
         * @param  {String} value   Value to be checked
         * @param  {String} phoneType Country's initials to specify the type of phone number to be validated. Ex: 'AO'.
         * @return {Boolean}         True if it's a valid phone number. False if not.
         */
        'phone': function( value, phoneType ){
            if( typeof value !== 'string' ){
                return false;
            }

            var countryCode = phoneType ? phoneType.toUpperCase() : '';

            return InkValidator['is' + countryCode + 'Phone'](value);
        },

        /**
         * Checks if it's a valid credit card.
         *
         * @method validationFunctions.credit_card
         * @param  {String} value   Value to be checked
         * @param  {String} cardType Type of credit card to be validated. The card types available are in the Ink.Util.Validator class.
         * @return {Boolean}         True if the value is a valid credit card number. False if not.
         */
        'credit_card': function( value, cardType ){
            if( typeof value !== 'string' ){
                return false;
            }

            return InkValidator.isCreditCard( value, cardType || 'default' );
        },

        /**
         * Checks if the value is a valid date.
         *
         * @method validationFunctions.date
         * @param  {String} value   Value to be checked
         * @param  {String} format Specific format of the date.
         * @return {Boolean}         True if the value is a valid date. False if not.
         */
        'date': function( value, format ){
            return ( (typeof value === 'string' ) && InkValidator.isDate(format, value) );
        },

        /**
         * Checks if the value only contains alphabetical values.
         *
         * @method validationFunctions.alpha
         * @param  {String} value           Value to be checked
         * @param  {Boolean} supportSpaces  Allow whitespace
         * @return {Boolean}                True if the value is alphabetical-only. False if not.
         */
        'alpha': function( value, supportSpaces ){
            return InkValidator.ascii(value, {singleLineWhitespace: supportSpaces});
        },

        /*
         * Check that the value contains only printable unicode text characters
         * from the Basic Multilingual plane (BMP)
         * Optionally allow punctuation and whitespace
         *
         * @method validationFunctions.text
         * @param {String} value    Value to be checked
         * @return {Boolean}        Whether the value only contains printable text characters
         **/
        'text': function (value, whitespace, punctuation) {
            return InkValidator.unicode(value, {
                singleLineWhitespace: whitespace,
                unicodePunctuation: punctuation});
        },

        /*
         * Check that the value contains only printable text characters 
         * available in the latin-1 encoding.
         *
         * Optionally allow punctuation and whitespace
         *
         * @method validationFunctions.text
         * @param {String} value    Value to be checked
         * @return {Boolean}        Whether the value only contains printable text characters
         **/
        'latin': function (value, punctuation, whitespace) {
            if ( typeof value !== 'string') { return false; }
            return InkValidator.latin1(value, {latin1Punctuation: punctuation, singleLineWhitespace: whitespace});
        },

        /**
         * Checks if the value only contains alphabetical and numerical characters.
         *
         * @method validationFunctions.alpha_numeric
         * @param  {String} value   Value to be checked
         * @return {Boolean}         True if the value is a valid alphanumerical. False if not.
         */
        'alpha_numeric': function( value ){
            return InkValidator.ascii(value, {numbers: true});
        },

        /**
         * Checks if the value only contains alphabetical, dash or underscore characteres.
         *
         * @method validationFunctions.alpha_dashes
         * @param  {String} value   Value to be checked
         * @return {Boolean}         True if the value is a valid. False if not.
         */
        'alpha_dash': function( value ){
            return InkValidator.ascii(value, {dash: true, underscore: true});
        },

        /**
         * Checks if the value is a digit (an integer of length = 1).
         *
         * @method validationFunctions.digit
         * @param  {String} value   Value to be checked
         * @return {Boolean}         True if the value is a valid digit. False if not.
         */
        'digit': function( value ){
            return ((typeof value === 'string') && /^[0-9]{1}$/.test(value));
        },

        /**
         * Checks if the value is a valid integer.
         *
         * @method validationFunctions.integer
         * @param  {String} value   Value to be checked
         * @param  {String} positive Flag that specifies if the integer is must be positive (unsigned).
         * @return {Boolean}         True if the value is a valid integer. False if not.
         */
        'integer': function( value, positive ){
            return InkValidator.number(value, {
                negative: !positive,
                decimalPlaces: 0
            });
        },

        /**
         * Checks if the value is a valid decimal number.
         *
         * @method validationFunctions.decimal
         * @param  {String} value   Value to be checked
         * @param  {String} decimalSeparator Character that splits the integer part from the decimal one. By default is '.'.
         * @param  {String} [decimalPlaces] Maximum number of digits that the decimal part must have.
         * @param  {String} [leftDigits] Maximum number of digits that the integer part must have, when provided.
         * @return {Boolean}         True if the value is a valid decimal number. False if not.
         */
        'decimal': function( value, decimalSeparator, decimalPlaces, leftDigits ){
            return InkValidator.number(value, {
                decimalSep: decimalSeparator || '.',
                decimalPlaces: +decimalPlaces || null,
                maxDigits: +leftDigits
            });
        },

        /**
         * Checks if it is a numeric value.
         *
         * @method validationFunctions.numeric
         * @param  {String} value   Value to be checked
         * @param  {String} decimalSeparator Verifies if it's a valid decimal. Otherwise checks if it's a valid integer.
         * @param  {String} [decimalPlaces] (when the number is decimal) Maximum number of digits that the decimal part must have.
         * @param  {String} [leftDigits] (when the number is decimal) Maximum number of digits that the integer part must have, when provided.
         * @return {Boolean}         True if the value is numeric. False if not.
         */
        'numeric': function( value, decimalSeparator, decimalPlaces, leftDigits ){
            decimalSeparator = decimalSeparator || '.';
            if( value.indexOf(decimalSeparator) !== -1  ){
                return validationFunctions.decimal( value, decimalSeparator, decimalPlaces, leftDigits );
            } else {
                return validationFunctions.integer( value );
            }
        },

        /**
         * Checks if the value is in a specific range of values. The parameters after the first one are used for specifying the range, and are similar in function to python's range() function.
         *
         * @method validationFunctions.range
         * @param  {String} value   Value to be checked
         * @param  {String} minValue Left limit of the range.
         * @param  {String} maxValue Right limit of the range.
         * @param  {String} [multipleOf] In case you want numbers that are only multiples of another number.
         * @return {Boolean}         True if the value is within the range. False if not.
         */
        'range': function( value, minValue, maxValue, multipleOf ){
            value = +value;
            minValue = +minValue;
            maxValue = +maxValue;

            if (isNaN(value) || isNaN(minValue) || isNaN(maxValue)) {
                return false;
            }

            if( value < minValue || value > maxValue ){
                return false;
            }

            if (multipleOf) {
                return (value - minValue) % multipleOf === 0;
            } else {
                return true;
            }
        },

        /**
         * Checks if the value is a valid color.
         *
         * @method validationFunctions.color
         * @param  {String} value   Value to be checked
         * @return {Boolean}         True if the value is a valid color. False if not.
         */
        'color': function( value ){
            return InkValidator.isColor(value);
        },

        /**
         * Checks if the value matches the value of a different field.
         *
         * @method validationFunctions.matches
         * @param  {String} value   Value to be checked
         * @param  {String} fieldToCompare Name or ID of the field to compare.
         * @return {Boolean}         True if the values match. False if not.
         */
        'matches': function( value, fieldToCompare ){
            return ( value === this.getFormElements()[fieldToCompare][0].getValue() );
        }

    };

    /**
     * Error messages for the validation functions above
     * @type {Object}
     * @private
     * @static
     */
    var validationMessages = new I18n({
        en_US: {
            'formvalidator.required' : 'The {field} filling is mandatory',
            'formvalidator.min_length': 'The {field} must have a minimum size of {param1} characters',
            'formvalidator.max_length': 'The {field} must have a maximum size of {param1} characters',
            'formvalidator.exact_length': 'The {field} must have an exact size of {param1} characters',
            'formvalidator.email': 'The {field} must have a valid e-mail address',
            'formvalidator.url': 'The {field} must have a valid URL',
            'formvalidator.ip': 'The {field} does not contain a valid {param1} IP address',
            'formvalidator.phone': 'The {field} does not contain a valid {param1} phone number',
            'formvalidator.credit_card': 'The {field} does not contain a valid {param1} credit card',
            'formvalidator.date': 'The {field} should contain a date in the {param1} format',
            'formvalidator.alpha': 'The {field} should only contain letters',
            'formvalidator.text': 'The {field} should only contain alphabetic characters',
            'formvalidator.latin': 'The {field} should only contain alphabetic characters',
            'formvalidator.alpha_numeric': 'The {field} should only contain letters or numbers',
            'formvalidator.alpha_dashes': 'The {field} should only contain letters or dashes',
            'formvalidator.digit': 'The {field} should only contain a digit',
            'formvalidator.integer': 'The {field} should only contain an integer',
            'formvalidator.decimal': 'The {field} should contain a valid decimal number',
            'formvalidator.numeric': 'The {field} should contain a number',
            'formvalidator.range': 'The {field} should contain a number between {param1} and {param2}',
            'formvalidator.color': 'The {field} should contain a valid color',
            'formvalidator.matches': 'The {field} should match the field {param1}',
            'formvalidator.validation_function_not_found': 'The rule {rule} has not been defined'
        },
        pt_PT: {
            'formvalidator.required' : 'Preencher {field} é obrigatório',
            'formvalidator.min_length': '{field} deve ter no mínimo {param1} caracteres',
            'formvalidator.max_length': '{field} tem um tamanho máximo de {param1} caracteres',
            'formvalidator.exact_length': '{field} devia ter exactamente {param1} caracteres',
            'formvalidator.email': '{field} deve ser um e-mail válido',
            'formvalidator.url': 'O {field} deve ser um URL válido',
            'formvalidator.ip': '{field} não tem um endereço IP {param1} válido',
            'formvalidator.phone': '{field} deve ser preenchido com um número de telefone {param1} válido.',
            'formvalidator.credit_card': '{field} não tem um cartão de crédito {param1} válido',
            'formvalidator.date': '{field} deve conter uma data no formato {param1}',
            'formvalidator.alpha': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.text': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.latin': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.alpha_numeric': '{field} deve conter apenas letras e números',
            'formvalidator.alpha_dashes': '{field} deve conter apenas letras e traços',
            'formvalidator.digit': '{field} destina-se a ser preenchido com apenas um dígito',
            'formvalidator.integer': '{field} deve conter um número inteiro',
            'formvalidator.decimal': '{field} deve conter um número válido',
            'formvalidator.numeric': '{field} deve conter um número válido',
            'formvalidator.range': '{field} deve conter um número entre {param1} e {param2}',
            'formvalidator.color': '{field} deve conter uma cor válida',
            'formvalidator.matches': '{field} deve corresponder ao campo {param1}',
            'formvalidator.validation_function_not_found': '[A regra {rule} não foi definida]'
        }
    }, 'en_US');

    /**
     * Constructor of a FormElement.
     * This type of object has particular methods to parse rules and validate them in a specific DOM Element.
     *
     * @param  {DOMElement} element DOM Element
     * @param  {Object} options Object with configuration options
     * @return {FormElement} FormElement object
     */
    var FormElement = function( element, options ){
        this._element = Common.elOrSelector( element, 'Invalid FormElement' );
        this._errors = {};
        this._rules = {};
        this._value = null;

        this._options = Ink.extendObj( {
            label: this._getLabel()
        }, Element.data(this._element) );

        this._options = Ink.extendObj( this._options, options || {} );

    };

    /**
     * FormElement's prototype
     */
    FormElement.prototype = {

        /**
         * Function to get the label that identifies the field.
         * If it can't find one, it will use the name or the id
         * (depending on what is defined)
         *
         * @method _getLabel
         * @return {String} Label to be used in the error messages
         * @private
         */
        _getLabel: function(){

            var controlGroup = Element.findUpwardsByClass(this._element,'control-group');
            var label = Ink.s('label',controlGroup);
            if( label ){
                label = Element.textContent(label);
            } else {
                label = this._element.name || this._element.id || '';
            }

            return label;
        },

        /**
         * Function to parse a rules' string.
         * Ex: required|number|max_length[30]
         *
         * @method _parseRules
         * @param  {String} rules String with the rules
         * @private
         */
        _parseRules: function( rules ){
            this._rules = {};
            rules = rules.split("|");
            var i, rulesLength = rules.length, rule, params, paramStartPos ;
            if( rulesLength > 0 ){
                for( i = 0; i < rulesLength; i++ ){
                    rule = rules[i];
                    if( !rule ){
                        continue;
                    }

                    if( ( paramStartPos = rule.indexOf('[') ) !== -1 ){
                        params = rule.substr( paramStartPos+1 );
                        params = params.split(']');
                        params = params[0];
                        params = params.split(',');
                        for (var p = 0, len = params.length; p < len; p++) {
                            params[p] =
                                params[p] === 'true' ? true :
                                params[p] === 'false' ? false :
                                params[p];
                        }
                        params.splice(0,0,this.getValue());

                        rule = rule.substr(0,paramStartPos);

                        this._rules[rule] = params;
                    } else {
                        this._rules[rule] = [this.getValue()];
                    }
                }
            }
        },

        /**
         * Function to add an error to the FormElement's 'errors' object.
         * It basically receives the rule where the error occurred, the parameters passed to it (if any)
         * and the error message.
         * Then it replaces some tokens in the message for a more 'custom' reading
         *
         * @method _addError
         * @param  {String|null} rule    Rule that failed, or null if no rule was found.
         * @private
         * @static
         */
        _addError: function(rule){
            var params = this._rules[rule] || [];

            var paramObj = {
                field: this._options.label,
                value: this.getValue()
            };

            for( var i = 1; i < params.length; i++ ){
                paramObj['param' + i] = params[i];
            }

            var i18nKey = 'formvalidator.' + rule;

            this._errors[rule] = validationMessages.text(i18nKey, paramObj);

            if (this._errors[rule] === i18nKey) {
                this._errors[rule] = 'Validation message not found';
            }
        },

        /**
         * Function to retrieve the element's value
         *
         * @method getValue
         * @return {mixed} The DOM Element's value
         * @public
         */
        getValue: function(){

            switch(this._element.nodeName.toLowerCase()){
                case 'select':
                    return Ink.s('option:selected',this._element).value;
                case 'textarea':
                    return this._element.innerHTML;
                case 'input':
                    if( "type" in this._element ){
                        if( (this._element.type === 'radio') && (this._element.type === 'checkbox') ){
                            if( this._element.checked ){
                                return this._element.value;
                            }
                        } else if( this._element.type !== 'file' ){
                            return this._element.value;
                        }
                    } else {
                        return this._element.value;
                    }
                    return;
                default:
                    return this._element.innerHTML;
            }
        },

        /**
         * Function that returns the constructed errors object.
         *
         * @method getErrors
         * @return {Object} Errors' object
         * @public
         */
        getErrors: function(){
            return this._errors;
        },

        /**
         * Function that returns the DOM element related to it.
         *
         * @method getElement
         * @return {Object} DOM Element
         * @public
         */
        getElement: function(){
            return this._element;
        },

        /**
         * Get other elements in the same form.
         *
         * @method getFormElements
         * @return {Object} A mapping of keys to other elements in this form.
         * @public
         */
        getFormElements: function () {
            return this._options.form._formElements;
        },

        /**
         * Function used to validate the element based on the rules defined.
         * It parses the rules defined in the _options.rules property.
         *
         * @method validate
         * @return {Boolean} True if every rule was valid. False if one fails.
         * @public
         */
        validate: function(){
            this._errors = {};

            if( "rules" in this._options || 1){
                this._parseRules( this._options.rules );
            }
            
            if( ("required" in this._rules) || (this.getValue() !== '') ){
                for(var rule in this._rules) {
                    if (this._rules.hasOwnProperty(rule)) {
                        if( (typeof validationFunctions[rule] === 'function') ){
                            if( validationFunctions[rule].apply(this, this._rules[rule] ) === false ){

                                this._addError( rule );
                                return false;

                            }

                        } else {

                            this._addError( null );
                            return false;
                        }
                    }
                }
            }

            return true;

        }
    };



    /**
     * @class Ink.UI.FormValidator_2
     * @version 2
     * @constructor
     * @param {String|DOMElement} selector Either a CSS Selector string, or the form's DOMElement
     * @param {String}   [options.eventTrigger='submit'] What event do we listen for.
     * @param {Boolean}  [options.neverSubmit=false]     Always cancel the event? Use this to avoid submitting the form.
     * @param {Selector} [options.searchFor='input, select, textarea, .control-group'] Look in these inputs for validation data-attributes.
     * @param {Function} [options.beforeValidation]      Callback to be executed before validating the form
     * @param {Function} [options.onError]               Validation error callback
     * @param {Function} [options.onSuccess]             Validation success callback
     *
     * @example
     *     Ink.requireModules( ['Ink.UI.FormValidator_2'], function( FormValidator ){
     *         var myValidator = new FormValidator( '#my-form' );
     *     });
     */
    var FormValidator = function( selector, options ){

        /**
         * DOMElement of the <form> being validated
         *
         * @property _rootElement
         * @type {DOMElement}
         */
        this._rootElement = Common.elOrSelector( selector );

        /**
         * Object that will gather the form elements by name
         *
         * @property _formElements
         * @type {Object}
         */
        this._formElements = {};

        /**
         * Error message DOMElements
         * 
         * @property _errorMessages
         */
        this._errorMessages = [];

        /**
         * Array of elements marked with validation errors
         *
         * @property _markedErrorElements
         */
        this._markedErrorElements = [];

        /**
         * Configuration options. Fetches the data attributes first, then the ones passed when executing the constructor.
         * By doing that, the latter will be the one with highest priority.
         *
         * @property _options
         * @type {Object}
         */
        this._options = Ink.extendObj({
            eventTrigger: 'submit',
            neverSubmit: 'false',
            searchFor: 'input, select, textarea, .control-group',
            beforeValidation: undefined,
            onError: undefined,
            onSuccess: undefined
        },Element.data(this._rootElement));

        this._options = Ink.extendObj( this._options, options || {} );

        // Sets an event listener for a specific event in the form, if defined.
        // By default is the 'submit' event.
        if( typeof this._options.eventTrigger === 'string' ){
            Event.observe( this._rootElement,this._options.eventTrigger, Ink.bindEvent(this.validate,this) );
        }

        this._init();
    };

    /**
     * Method used to set validation functions (either custom or ovewrite the existent ones)
     *
     * @method setRule
     * @param {String}   name         Name of the function. E.g. 'required'
     * @param {String}   errorMessage Error message to be displayed in case of returning false. E.g. 'Oops, you passed {param1} as parameter1, lorem ipsum dolor...'
     * @param {Function} cb           Function to be executed when calling this rule
     * @public
     * @static
     */
    FormValidator.setRule = function( name, errorMessage, cb ){
        validationFunctions[ name ] = cb;
        if (validationMessages.getKey('formvalidator.' + name) !== errorMessage) {
            var langObj = {}; langObj['formvalidator.' + name] = errorMessage;
            var dictObj = {}; dictObj[validationMessages.lang()] = langObj;
            validationMessages.append(dictObj);
        }
    };

    /**
     * Get the i18n object in charge of the error messages
     *
     * @method getI18n
     * @return {Ink.Util.I18n} The i18n object the FormValidator is using.
     */
    FormValidator.getI18n = function () {
        return validationMessages;
    };

     /**
     * Sets the I18n object for validation error messages
     *
     * @method setI18n
     * @param {Ink.Util.I18n} i18n  The I18n object.
     */
    FormValidator.setI18n = function (i18n) {
        validationMessages = i18n;
    };

   /**
     * Add to the I18n dictionary. See `Ink.Util.I18n.append()` documentation.
     *
     * @method AppendI18n
     */
    FormValidator.appendI18n = function () {
        validationMessages.append.apply(validationMessages, [].slice.call(arguments));
    };

    /**
     * Sets the language of the error messages. pt_PT and en_US are available, but you can add new languages by using append()
     *
     * See the `Ink.Util.I18n.lang()` setter
     *
     * @method setLanguage
     * @param language  The language to set i18n to.
     */
    FormValidator.setLanguage = function (language) {
        validationMessages.lang(language);
    };

    /**
     * Method used to get the existing defined validation functions
     *
     * @method getRules
     * @return {Object} Object with the rules defined
     * @public
     * @static
     */
    FormValidator.getRules = function(){
        return validationFunctions;
    };

    FormValidator.prototype = {
        _init: function(){

        },

        /**
         * Function that searches for the elements of the form, based in the
         * this._options.searchFor configuration.
         *
         * @method getElements
         * @return {Object} An object with the elements in the form, indexed by name/id
         * @public
         */
        getElements: function(){
            this._formElements = {};
            var formElements = Selector.select( this._options.searchFor, this._rootElement );
            if( formElements.length ){
                var i, element;
                for( i=0; i<formElements.length; i+=1 ){
                    element = formElements[i];

                    var dataAttrs = Element.data( element );

                    if( !("rules" in dataAttrs) ){
                        continue;
                    }

                    var options = {
                        form: this
                    };

                    var key;
                    if( ("name" in element) && element.name ){
                        key = element.name;
                    } else if( ("id" in element) && element.id ){
                        key = element.id;
                    } else {
                        key = 'element_' + Math.floor(Math.random()*100);
                        element.id = key;
                    }

                    if( !(key in this._formElements) ){
                        this._formElements[key] = [ new FormElement( element, options ) ];
                    } else {
                        this._formElements[key].push( new FormElement( element, options ) );
                    }
                }
            }

            return this._formElements;
        },

        /**
         * Runs the validate function of each FormElement in the this._formElements
         * object.
         * Also, based on the this._options.beforeValidation, this._options.onError
         * and this._options.onSuccess, this callbacks are executed when defined.
         *
         * @method validate
         * @param  {Event} event window.event object
         * @return {Boolean}
         * @public
         */
        validate: function( event ) {

            if(this._options.neverSubmit+'' === 'true' && event) {
                Event.stopDefault(event);
            }

            if( typeof this._options.beforeValidation === 'function' ){
                this._options.beforeValidation();
            }

            InkArray.each( this._markedErrorElements, function (errorElement) {
                Css.removeClassName(errorElement,  ['validation', 'error']);
            });
            InkArray.each( this._errorMessages, Element.remove);

            this.getElements();
            var errorElements = [];

            for( var key in this._formElements ){
                if( this._formElements.hasOwnProperty(key) ){
                    for( var counter = 0; counter < this._formElements[key].length; counter+=1 ){
                        if( !this._formElements[key][counter].validate() ) {
                            errorElements.push(this._formElements[key][counter]);
                        }
                    }
                }
            }
            
            if( errorElements.length === 0 ){
                if( typeof this._options.onSuccess === 'function' ){
                    this._options.onSuccess();
                }

                // [3.0.0] remove this, it's a little backwards compat quirk
                if(event && this._options.cancelEventOnSuccess.toString() === 'true') {
                    Event.stopDefault(event);
                    return false;
                }

                return true;
            } else {

                if(event) {
                    Event.stopDefault(event);
                }

                if( typeof this._options.onError === 'function' ){
                    this._options.onError( errorElements );
                }
                this._errorMessages = [];
                this._markedErrorElements = [];

                InkArray.each( errorElements, Ink.bind(function( formElement ){
                    var controlGroupElement;
                    var controlElement;
                    if( Css.hasClassName(formElement.getElement(),'control-group') ){
                        controlGroupElement = formElement.getElement();
                        controlElement = Ink.s('.control',formElement.getElement());
                    } else {
                        controlGroupElement = Element.findUpwardsByClass(formElement.getElement(),'control-group');
                        controlElement = Element.findUpwardsByClass(formElement.getElement(),'control');
                    }

                    if(controlGroupElement) {
                        Css.addClassName( controlGroupElement, ['validation', 'error'] );
                        this._markedErrorElements.push(controlGroupElement);
                    }

                    var paragraph = document.createElement('p');
                    Css.addClassName(paragraph,'tip');
                    if (controlElement || controlGroupElement) {
                        (controlElement || controlGroupElement).appendChild(paragraph);
                    } else {
                        Element.insertAfter(paragraph, formElement.getElement());
                    }

                    var errors = formElement.getErrors();
                    var errorArr = [];
                    for (var k in errors) {
                        if (errors.hasOwnProperty(k)) {
                            errorArr.push(errors[k]);
                        }
                    }
                    paragraph.innerHTML = errorArr.join('<br/>');
                    this._errorMessages.push(paragraph);
                }, this));
                return false;
            }
        }
    };

    /**
     * Returns the FormValidator's Object
     */
    return FormValidator;

});

/**
 * @module Ink.UI.ImageQuery_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.ImageQuery', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Util.Array_1'], function(Common, Event, Element, InkArray ) {
    'use strict';

    /**
     * @class Ink.UI.ImageQuery
     * @constructor
     * @version 1
     *
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *      @param {String|Function}    [options.src]             String or Callback function (that returns a string) with the path to be used to get the images.
     *      @param {String|Function}    [options.retina]          String or Callback function (that returns a string) with the path to be used to get RETINA specific images.
     *      @param {Array}              [options.queries]         Array of queries
     *          @param {String}              [options.queries.label]         Label of the query. Ex. 'small'
     *          @param {Number}              [options.queries.width]         Min-width to use this query
     *      @param {Function}           [options.onLoad]          Date format string
     *
     * @example
     *      <div class="imageQueryExample large-100 medium-100 small-100 content-center clearfix vspace">
     *          <img src="/assets/imgs/imagequery/small/image.jpg" />
     *      </div>
     *      <script type="text/javascript">
     *      Ink.requireModules( ['Ink.Dom.Selector_1', 'Ink.UI.ImageQuery_1'], function( Selector, ImageQuery ){
     *          var imageQueryElement = Ink.s('.imageQueryExample img');
     *          var imageQueryObj = new ImageQuery('.imageQueryExample img',{
     *              src: '/assets/imgs/imagequery/{:label}/{:file}',
     *              queries: [
     *                  {
     *                      label: 'small',
     *                      width: 480
     *                  },
     *                  {
     *                      label: 'medium',
     *                      width: 640
     *                  },
     *                  {
     *                      label: 'large',
     *                      width: 1024
     *                  }   
     *              ]
     *          });
     *      } );
     *      </script>
     */
    var ImageQuery = function(selector, options){

        /**
         * Get elements, create more ImageQueries if selector finds more than one
         *
         * [improvement] This is a useful pattern. More UI modules could use it.
         */
        this._element = Common.elsOrSelector(selector, 'Ink.UI.ImageQuery', /*required=*/true);

        // In case we have several elements
        for (var i = 1 /* start from second element*/; i < this._element.length; i++) {
            new ImageQuery(this._element[i], options);
        }

        this._element = this._element[0];

        /**
         * Default options, overriden by data-attributes if any.
         * The parameters are:
         * @param {array} queries Array of objects that determine the label/name and its min-width to be applied.
         * @param {boolean} allowFirstLoad Boolean flag to allow the loading of the first element.
         */
        this._options = Ink.extendObj({
            queries:[],
            onLoad: null
        }, options || {}, Element.data(this._element));

        /**
         * Determining the original basename (with the querystring) of the file.
         */
        var pos;
        if( (pos=this._element.src.lastIndexOf('?')) !== -1 ){
            var search = this._element.src.substr(pos);
            this._filename = this._element.src.replace(search,'').split('/').pop()+search;
        } else {
            this._filename = this._element.src.split('/').pop();
        }

        this._init();
    };

    ImageQuery.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            // Sort queries by width, in descendant order.
            this._options.queries = InkArray.sortMulti(this._options.queries, 'width').reverse();

            if( typeof this._options.onLoad === 'function' ){
                Event.observe(this._element, 'onload', Ink.bindEvent(this._onLoad, this));
            }

            Event.observe(window, 'resize', Ink.bindEvent(this._onResize, this));

            // Imediate call to apply the right images based on the current viewport
            this._onResize();
        },

        /**
         * Handles the resize event (as specified in the _init function)
         *
         * @method _onResize
         * @private
         */
        _onResize: Event.throttle(function(){
            if( !this._options.queries.length ){
                return;
            }

            var current = this._findCurrentQuery();

            /**
             * Choosing the right src. The rule is:
             *
             *   "If there is specifically defined in the query object, use that. Otherwise uses the global src."
             *
             * The above rule applies to a retina src.
             */
            var src = current.src || this._options.src;
            if ( window.devicePixelRatio > 1 && ('retina' in this._options ) ) {
                src = current.retina || this._options.retina;
            }

            /**
             * Injects the file variable for usage in the 'templating system' below
             */
            current.file = this._filename;

            /**
             * Since we allow the src to be a callback, let's run it and get the results.
             * For the inside, we're passing the element (img) being processed and the object of the selected
             * query.
             */
            if( typeof src === 'function' ){
                src = src.apply(this,[this._element,current]);
                if( typeof src !== 'string' ){
                    throw '[ImageQuery] :: "src" callback does not return a string';
                }
            }

            /**
             * Replace the values of the existing properties on the query object (except src and retina) in the
             * defined src and/or retina.
             */
            src = src.replace(/{:(.*?)}/g, function(_, prop) {
                return current[prop];
            });

            this._element.src = src;

            // Removes the injected file property
            delete current.file;
        }, 500),

        /**
         * Queries are in a descendant order. We want to find the query with the highest width that fits
         * the viewport, therefore the first one.
         */
        _findCurrentQuery: function () {
            /**
             * Gets viewport width
             */
            var viewportWidth = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;

            var queries = this._options.queries;
            var last = queries.length - 1;

            for( var query=0; query < last; query+=1 ){
                if (queries[query].width <= viewportWidth){
                    return queries[query];
                }
            }

            return queries[last];
        },

        /**
         * Handles the element loading (img onload) event
         *
         * @method _onLoad
         * @private
         */
        _onLoad: function(){

            /**
             * Since we allow a callback for this let's run it.
             */
            this._options.onLoad.call(this);
        }

    };

    return ImageQuery;

});

/**
 * @module Ink.UI.Modal_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Modal', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, InkElement, Selector, InkArray ) {
    'use strict';

    var opacitySupported = (function (div) {
        div.style.opacity = 'invalid';
        return div.style.opacity !== 'invalid';
    }(InkElement.create('div', {style: 'opacity: 1'})));

    /**
     * @class Ink.UI.Modal
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *      @param {String}    [options.width]             Default/Initial width. Ex: '600px'
     *      @param {String}    [options.height]            Default/Initial height. Ex: '400px'
     *      @param {String}    [options.shadeClass]        Custom class to be added to the div.ink-shade
     *      @param {String}    [options.modalClass]        Custom class to be added to the div.ink-modal
     *      @param {String}    [options.trigger]           CSS Selector to target elements that will trigger the Modal.
     *      @param {String}    [options.triggerEvent]      Trigger's event to be listened. 'click' is the default value. Ex: 'mouseover', 'touchstart'...
     *      @param {Boolean}   [options.autoDisplay=true]  Display the Modal automatically when constructed.
     *      @param {String}    [options.markup]            Markup to be placed in the Modal when created
     *      @param {Function}  [options.onShow]            Callback function to run when the Modal is opened.
     *      @param {Function}  [options.onDismiss]         Callback function to run when the Modal is closed. Return `false` to cancel dismissing the Modal.
     *      @param {Boolean}   [options.closeOnClick=false] Determines if the Modal should close when clicked outside of it.
     *      @param {Boolean}   [options.closeOnEscape=true] Determines if the Modal should close when "Esc" key is pressed.
     *      @param {Boolean}   [options.responsive]        Determines if the Modal should behave responsively (adapt to smaller viewports).
     *      @param {Boolean}   [options.disableScroll]     Determines if the Modal should 'disable' the page's scroll (not the Modal's body).
     *
     * @example
     *      <div class="ink-shade fade">
     *          <div id="test" class="ink-modal fade" data-trigger="#bModal" data-width="800px" data-height="400px">
     *              <div class="modal-header">
     *                  <button class="modal-close ink-dismiss"></button>
     *                  <h5>Modal windows can have headers</h5>
     *              </div>
     *              <div class="modal-body" id="modalContent">
     *                  <h3>Please confirm your previous choice</h3>
     *                  <p>"No," said Peleg, "and he hasn't been baptized right either, or it would have washed some of that devil's blue off his face."</p>
     *                  <p>
     *                      <img src="http://placehold.it/800x400" style="width: 100%;" alt="">
     *                  </p>
     *                  <p>"Do tell, now," cried Bildad, "is this Philistine a regular member of Deacon Deuteronomy's meeting? I never saw him going there, and I pass it every Lord's day."</p>
     *                  <p>"I don't know anything about Deacon Deuteronomy or his meeting," said I; "all I know is, that Queequeg here is a born member of the First Congregational Church. He is a deacon himself, Queequeg is."</p>
     *              </div>
     *              <div class="modal-footer">
     *                  <div class="push-right">
     *                      <button class="ink-button info">Confirm</button>
     *                      <button class="ink-button caution ink-dismiss">Cancel</button>
     *                  </div>
     *              </div>
     *          </div>
     *      </div>
     *      <a href="#" id="bModal">Open modal</a>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Modal_1'], function( Selector, Modal ){
     *              var modalElement = Ink.s('#test');
     *              var modalObj = new Modal( modalElement );
     *          });
     *      </script>
     */

    function upName(dimension) {
        // omg IE
        var firstCharacter = dimension.match(/^./)[0];
        return firstCharacter.toUpperCase() + dimension.replace(/^./, '');
    }
    function maxName(dimension) {
        return 'max' + upName(dimension);
    }

    var openModals = [];

    var Modal = function(selector, options) {
        if (!selector) {
            this._element = null;
        } else {
            this._element = Common.elOrSelector(selector, 'Ink.UI.Modal markup');
        }

        this._options = {
            /**
             * Width, height and markup really optional, as they can be obtained by the element
             */
            width:        undefined,
            height:       undefined,

            /**
             * To add extra classes
             */
            shadeClass: undefined,
            modalClass: undefined,

            /**
             * Optional trigger properties
             */
            trigger:      undefined,
            triggerEvent: 'click',
            autoDisplay:  true,

            /**
             * Remaining options
             */
            markup:       undefined,
            onShow:       undefined,
            onDismiss:    undefined,
            closeOnClick: false,
            closeOnEscape: true,
            responsive:    true,
            disableScroll: true
        };


        this._handlers = {
            click:   Ink.bindEvent(this._onShadeClick, this),
            keyDown: Ink.bindEvent(this._onKeyDown, this),
            resize:  Ink.bindEvent(this._onResize, this)
        };

        this._wasDismissed = false;

        /**
         * Modal Markup
         */
        if( this._element ){
            this._markupMode = Css.hasClassName(this._element,'ink-modal'); // Check if the full modal comes from the markup
        } else {
            this._markupMode = false;
        }

        if( !this._markupMode ){
            this._modalShadow      = document.createElement('div');
            this._modalShadowStyle = this._modalShadow.style;

            this._modalDiv         = document.createElement('div');
            this._modalDivStyle    = this._modalDiv.style;

            if( !!this._element ){
                this._options.markup = this._element.innerHTML;
            }

            /**
             * Not in full markup mode, let's set the classes and css configurations
             */
            Css.addClassName( this._modalShadow,'ink-shade' );
            Css.addClassName( this._modalDiv,'ink-modal ink-space' );

            /**
             * Applying the main css styles
             */
            // this._modalDivStyle.position = 'absolute';
            this._modalShadow.appendChild( this._modalDiv);
            document.body.appendChild( this._modalShadow );
        } else {
            this._modalDiv         = this._element;
            this._modalDivStyle    = this._modalDiv.style;
            this._modalShadow      = this._modalDiv.parentNode;
            this._modalShadowStyle = this._modalShadow.style;

            this._contentContainer = Selector.select(".modal-body", this._modalDiv)[0];
            if( !this._contentContainer){
                throw new Error('Ink.UI.Modal: Missing div with class "modal-body"');
            }

            this._options.markup = this._contentContainer.innerHTML;

            /**
             * First, will handle the least important: The dataset
             */
            this._options = Ink.extendObj(this._options,InkElement.data(this._element));

        }

        /**
         * Now, the most important, the initialization options
         */
        this._options = Ink.extendObj(this._options,options || {});

        if( !this._markupMode ){
            this.setContentMarkup(this._options.markup);
        }

        if( typeof this._options.shadeClass === 'string' ){
            Css.addClassName(this._modalShadow, this._options.shadeClass);
        }

        if( typeof this._options.modalClass === 'string' ){
            Css.addClassName(this._modalDiv, this._options.modalClass);
        }

        if( ("trigger" in this._options) && ( typeof this._options.trigger !== 'undefined' ) ){
            var triggerElement;
            if( typeof this._options.trigger === 'string' ){
                triggerElement = Selector.select( this._options.trigger );
                Event.observeMulti(triggerElement, this._options.triggerEvent, Ink.bindEvent(this.open, this));
            }
        } else if ( this._options.autoDisplay.toString() === "true" ) {
            this.open();
        }
    };

    Modal.prototype = {

        /**
         * Responsible for repositioning the modal
         * 
         * @method _reposition
         * @private
         */
        _reposition: function(){
            this._modalDivStyle.marginTop = (-InkElement.elementHeight(this._modalDiv)/2) + 'px';
            this._modalDivStyle.marginLeft = (-InkElement.elementWidth(this._modalDiv)/2) + 'px';
        },

        /**
         * Responsible for resizing the modal
         * 
         * @method _onResize
         * @param {Boolean|Event} runNow Its executed in the begining to resize/reposition accordingly to the viewport. But usually it's an event object.
         * @private
         */
        _onResize: function( runNow ){
            if( typeof runNow === 'boolean' ){
                this._timeoutResizeFunction.call(this);
            } else if( !this._resizeTimeout && (runNow && typeof runNow === 'object') ){
                this._resizeTimeout = setTimeout(Ink.bind(this._timeoutResizeFunction, this),250);
            }
        },

        /**
         * Timeout Resize Function
         * 
         * @method _timeoutResizeFunction
         * @private
         */
        _timeoutResizeFunction: function(){
            /**
             * Getting the current viewport size
             */
            var isPercentage = {
                width: ('' + this._options.width).indexOf('%') !== -1,
                height: ('' + this._options.height).indexOf('%') !== -1
            };
            var currentViewport = {
                height: InkElement.viewportHeight(),
                width: InkElement.viewportWidth()
            };

            InkArray.forEach(['height', 'width'], Ink.bind(function (dimension) {
                // Not used for percentage measurements
                if (isPercentage[dimension]) { return; }

                if (currentViewport[dimension] > this.originalStatus[dimension]) {
                    this._modalDivStyle[dimension] = this._modalDivStyle[maxName(dimension)];
                } else {
                    this._modalDivStyle[dimension] = Math.round(currentViewport[dimension] * 0.9) + 'px';
                }
            }, this));

            this._resizeContainer();
            this._reposition();
            this._resizeTimeout = undefined;
        },

        /**
         * Handle clicks on the shade element.
         * 
         * @method _onShadeClick
         * @param {Event} ev
         * @private
         */
        _onShadeClick: function(ev) {
            var tgtEl = Event.element(ev);

            if (Css.hasClassName(tgtEl, 'ink-close') || Css.hasClassName(tgtEl, 'ink-dismiss') || 
                InkElement.findUpwardsBySelector(tgtEl, '.ink-close,.ink-dismiss') ||
                (
                    this._options.closeOnClick &&
                    (!InkElement.descendantOf(this._shadeElement, tgtEl) || (tgtEl === this._shadeElement))
                )
            ) {
                var alertsInTheModal = Selector.select('.ink-alert', this._shadeElement),
                    alertsLength = alertsInTheModal.length;
                for( var i = 0; i < alertsLength; i++ ){
                    if( InkElement.descendantOf(alertsInTheModal[i], tgtEl) ){
                        return;
                    }
                }

                this.dismiss();

                // Only stop the event if this dismisses this modal
                if (this._wasDismissed) {
                    Event.stop(ev);
                }
            }
        },

        /**
         * Responsible for handling the escape key pressing.
         *
         * @method _onKeyDown
         * @param  {Event} ev
         * @private
         */
        _onKeyDown: function(ev) {
            if (ev.keyCode !== 27 || this._wasDismissed) { return; }
            if (this._options.closeOnEscape.toString() === 'true' &&
                    openModals[openModals.length - 1] === this) {
                this.dismiss();
                if (this._wasDismissed) {
                    Event.stop(ev);
                }
            }
        },

        /**
         * Responsible for setting the size of the modal (and position) based on the viewport.
         * 
         * @method _resizeContainer
         * @private
         */
        _resizeContainer: function() {
            // [3.0.0] drop this because everyone should have the new CSS now, which has this rule already with .ink-modal-is-open.
            this._contentElement.style.overflow = this._contentElement.style.overflowX = this._contentElement.style.overflowY = 'hidden';
            var containerHeight = InkElement.elementHeight(this._modalDiv);

            this._modalHeader = Selector.select('.modal-header',this._modalDiv)[0];
            if( this._modalHeader ){
                containerHeight -= InkElement.elementHeight(this._modalHeader);
            }

            this._modalFooter = Selector.select('.modal-footer',this._modalDiv)[0];
            if( this._modalFooter ){
                containerHeight -= InkElement.elementHeight(this._modalFooter);
            }

            this._contentContainer.style.height = containerHeight + 'px';
            if( containerHeight !== InkElement.elementHeight(this._contentContainer) ){
                this._contentContainer.style.height = ~~(containerHeight - (InkElement.elementHeight(this._contentContainer) - containerHeight)) + 'px';
            }

            if( this._markupMode ){ return; }

            this._contentContainer.style.overflow = this._contentContainer.style.overflowX = 'hidden';
            this._contentContainer.style.overflowY = 'auto';
            this._contentElement.style.overflow = this._contentElement.style.overflowX = this._contentElement.style.overflowY = 'visible';
        },

        /**
         * Responsible for 'disabling' the page scroll
         * 
         * @method _disableScroll
         * @private
         */
        _disableScroll: function() {
            var htmlEl = document.documentElement;
            this._oldHtmlOverflows = [ htmlEl.style.overflowX,
                htmlEl.style.overflowY ];
            htmlEl.style.overflowX = htmlEl.style.overflowY = 'hidden';
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Display this Modal. Useful if you have initialized the modal
         * @method open 
         * @param {Event} [event] (internal) In case its fired by the internal trigger.
         */
        open: function(event) {

            if( event ){ Event.stop(event); }

            var elem = (document.compatMode === "CSS1Compat") ?  document.documentElement : document.body;

            this._resizeTimeout    = null;

            Css.addClassName( this._modalShadow,'ink-shade' );
            this._modalShadowStyle.display = this._modalDivStyle.display = 'block';
            setTimeout(Ink.bind(function() {
                Css.addClassName( this._modalShadow, 'visible' );
                Css.addClassName( this._modalDiv, 'visible' );
            }, this), 100);

            /**
             * Fallback to the old one
             */
            this._contentElement = this._modalDiv;
            this._shadeElement   = this._modalShadow;

            if( !this._markupMode ){
                /**
                 * Setting the content of the modal
                 */
                this.setContentMarkup( this._options.markup );
            }

            /**
             * If any size has been user-defined, let's set them as max-width and max-height
             */

            var isPercentage = {
                width: ('' + this._options.width).indexOf('%') !== -1,
                height: ('' + this._options.height).indexOf('%') !== -1
            };

            InkArray.forEach(['width', 'height'], Ink.bind(function (dimension) {
                if (this._options[dimension] !== undefined) {
                    this._modalDivStyle[dimension] = this._options[dimension];
                    if (!isPercentage[dimension]) {
                        this._modalDivStyle[maxName(dimension)] =
                            InkElement['element' + upName(dimension)](this._modalDiv) + 'px';
                    }
                } else {
                    this._modalDivStyle[maxName(dimension)] = InkElement['element' + upName(dimension)](this._modalDiv) + 'px';
                }

                if (isPercentage[dimension] && parseInt(elem['client' + maxName(dimension)], 10) <= parseInt(this._modalDivStyle[dimension], 10) ) {
                    this._modalDivStyle[dimension] = Math.round(parseInt(elem['client' + maxName(dimension)], 10) * 0.9) + 'px';
                }
            }, this));

            this.originalStatus = {
                viewportHeight:     InkElement.elementHeight(elem),
                viewportWidth:      InkElement.elementWidth(elem),
                height:             InkElement.elementHeight(this._modalDiv),
                width:              InkElement.elementWidth(this._modalDiv)
            };

            /**
             * Let's 'resize' it:
             */
            if( this._options.responsive.toString() === 'true' ) {
                this._onResize(true);
                Event.observe( window,'resize',this._handlers.resize );
            } else {
                this._resizeContainer();
                this._reposition();
            }

            if (this._options.onShow) {
                this._options.onShow(this);
            }

            if(this._options.disableScroll.toString() === 'true') {
                this._disableScroll();
            }

            // subscribe events
            Event.observe(this._shadeElement, 'click', this._handlers.click);
            if (this._options.closeOnEscape.toString() === 'true') {
                Event.observe(document, 'keydown', this._handlers.keyDown);
            }

            Common.registerInstance(this, this._shadeElement, 'modal');

            this._wasDismissed = false;
            openModals.push(this);

            Css.addClassName(document.documentElement, 'ink-modal-is-open');
        },

        /**
         * Dismisses the modal
         * 
         * @method dismiss
         * @public
         */
        dismiss: function() {
            if (this._wasDismissed) { /* Already dismissed. WTF IE. */ return; }

            if (this._options.onDismiss) {
                var ret = this._options.onDismiss(this);
                if (ret === false) { return; }
            }

            this._wasDismissed = true;

            if( this._options.responsive ){
                Event.stopObserving(window, 'resize', this._handlers.resize);
            }

            // this._modalShadow.parentNode.removeChild(this._modalShadow);

            if( !this._markupMode ){
                this._modalShadow.parentNode.removeChild(this._modalShadow);
                this.destroy();
            } else {
                Css.removeClassName( this._modalDiv, 'visible' );
                Css.removeClassName( this._modalShadow, 'visible' );

                this._waitForFade(this._modalShadow, Ink.bind(function () {
                    this._modalShadowStyle.display = 'none';
                }, this));
            }

            openModals = InkArray.remove(openModals, InkArray.keyValue(this, openModals), 1);

            if (openModals.length === 0) {  // Document level stuff now there are no modals in play.
                var htmlEl = document.documentElement;

                // Reenable scroll
                if(this._options.disableScroll) {
                    htmlEl.style.overflowX = this._oldHtmlOverflows[0];
                    htmlEl.style.overflowY = this._oldHtmlOverflows[1];
                }

                // Remove the class from the HTML element.
                Css.removeClassName(htmlEl, 'ink-modal-is-open');
            }
        },

        /**
         * Utility function to listen to the onTransmissionEnd event, or wait using setTimeouts
         *
         * Specific to this._element
         */
        _waitForFade: function (elem, callback) {
            if (!opacitySupported) { return callback(); }

            var transitionEndEventNames = [
                'transitionEnd', 'oTransitionEnd', 'webkitTransitionEnd'];
            var classicName;
            var evName;
            for (var i = 0, len = transitionEndEventNames.length; i < len; i++) {
                evName = transitionEndEventNames[i];
                classicName = 'on' + evName.toLowerCase();
                if (classicName in elem) {
                    Event.observeOnce(elem, evName, callback);
                    return;
                }
            }
            var fadeChecker = function () {
                if( +Css.getStyle(elem, 'opacity') > 0 ){
                    setTimeout(fadeChecker, 250);
                } else {
                    callback();
                }
            };
            setTimeout(fadeChecker, 500);
        },

        /**
         * Removes the modal from the DOM
         * 
         * @method destroy
         * @public
         */
        destroy: function() {
            Common.unregisterInstance(this._instanceId);
        },

        /**
         * Returns the content DOM element
         * 
         * @method getContentElement
         * @return {DOMElement} Modal main cointainer.
         * @public
         */
        getContentElement: function() {
            return this._contentContainer;
        },

        /**
         * Replaces the content markup
         * 
         * @method setContentMarkup
         * @param {String} contentMarkup
         * @public
         */
        setContentMarkup: function(contentMarkup) {
            if( !this._markupMode ){
                this._modalDiv.innerHTML = [contentMarkup].join('');
                this._contentContainer = Selector.select(".modal-body",this._modalDiv);
                if( !this._contentContainer.length ){
                    // throw 'Missing div with class "modal-body"';
                    var tempHeader = Selector.select(".modal-header",this._modalDiv);
                    var tempFooter = Selector.select(".modal-footer",this._modalDiv);

                    InkArray.each(tempHeader, InkElement.remove);
                    InkArray.each(tempFooter, InkElement.remove);

                    var body = document.createElement('div');
                    Css.addClassName(body,'modal-body');
                    body.innerHTML = this._modalDiv.innerHTML;
                    this._modalDiv.innerHTML = '';

                    var toAdd = tempHeader.concat([body]).concat(tempFooter);
                    InkArray.each(toAdd, Ink.bindMethod(this._modalDiv, 'appendChild'));

                    // InkArray.each(tempHeader,Ink.bind(function( element ){ this._modalDiv.appendChild(element); },this));
                    // this._modalDiv.appendChild(body);
                    // InkArray.each(tempFooter,Ink.bind(function( element ){ this._modalDiv.appendChild(element); },this));

                    this._contentContainer = Selector.select(".modal-body",this._modalDiv);
                }
                this._contentContainer = this._contentContainer[0];
            } else {
                this._contentContainer.innerHTML = contentMarkup;
            }
            this._contentElement = this._modalDiv;
            this._resizeContainer();
        }

    };

    return Modal;

});

/**
 * @module Ink.UI.Pagination_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Pagination', '1',
    ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'],
    function(Common, Event, Css, Element, Selector ) {
    'use strict';

    /**
     * Function to create the pagination anchors
     *
     * @method genAel
     * @param  {String} inner HTML to be placed inside the anchor.
     * @return {DOMElement}  Anchor created
     */
    var genAEl = function(inner, index) {
        var aEl = document.createElement('a');
        aEl.setAttribute('href', '#');
        if (index !== undefined) {
            aEl.setAttribute('data-index', index);
        }
        aEl.innerHTML = inner;
        return aEl;
    };

    /**
     * @class Ink.UI.Pagination
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} options Options
     * @param {Number}   [options.size]              number of pages.
     * @param {Number}   [options.totalItemCount]    Total numeber of items to display
     * @param {Number}   [options.itemsPerPage]      number of items per page.
     * @param {Number}   [options.maxSize]           If passed, only shows at most maxSize items. displays also first|prev page and next page|last buttons
     * @param {Number}   [options.start]             start page. defaults to 1
     * @param {String}   [options.firstLabel]        label to display on first page button
     * @param {String}   [options.lastLabel]         label to display on last page button
     * @param {String}   [options.previousLabel]     label to display on previous button
     * @param {String}   [options.nextLabel]         label to display on next button
     * @param {String}   [options.previousPageLabel] label to display on previous page button
     * @param {String}   [options.nextPageLabel]     label to display on next page button
     * @param {Function} [options.onChange]          optional callback. Called with `(thisPaginator, newPageNumber)`.
     * @param {String}   [options.hashParameter]     parameter to use on setHash. by default uses 'page'
     * @param {String}   [options.parentTag]         HTML Tag used as the parent node.
     * @param {String}   [options.childTag]          HTML Tag used as the child nodes.
     * @param {String}   [options.wrapperClass]      CSS Class used in the wrapper element
     * @param {String}   [options.paginationClass]   CSS Class used in the pagination element
     * @param {String}   [options.activeClass]       CSS Class used to mark page as active
     * @param {String}   [options.disabledClass]     CSS Class used to mark page as disabled
     * @param {String}   [options.hideClass]         CSS Class used to hide elements
     * @param {String}   [options.previousClass]     CSS Class used in the previous element
     * @param {String}   [options.previousPageClass] CSS Class used in the previous page element
     * @param {String}   [options.nextClass]         CSS Class used in the next element
     * @param {String}   [options.nextPageClass]     CSS Class used in the next page element
     * @param {Function} [options.numberFormatter]   optional function which takes and 0-indexed number and returns the string which appears on a numbered button
     */
    var Pagination = function(selector, options) {

        this._element = Common.elOrSelector(selector, 'Ink.UI.Pagination element');

        this._options = Common.options('Ink.UI.Pagination_1', {
            size:              ['Integer', null],
            totalItemCount:    ['Integer', null],
            itemsPerPage:      ['Integer', null],
            maxSize:           ['Integer', null],
            start:             ['Integer', 1],
            firstLabel:        ['String', 'First'],
            lastLabel:         ['String', 'Last'],
            previousLabel:     ['String', 'Previous'],
            nextLabel:         ['String', 'Next'],
            previousPageLabel: ['String', null],
            nextPageLabel:     ['String', null],
            onChange:          ['Function', undefined],
            hashParameter:     ['String', 'page'],
            parentTag:         ['String', 'ul'],
            childTag:          ['String', 'li'],
            wrapperClass:      ['String', 'ink-navigation'],
            paginationClass:   ['String', 'pagination'],
            activeClass:       ['String', 'active'],
            disabledClass:     ['String', 'disabled'],
            hideClass:         ['String', 'hide-all'],
            previousClass:     ['String', 'previous'],
            previousPageClass: ['String', 'previousPage'],
            nextClass:         ['String', 'next'],
            nextPageClass:     ['String', 'nextPage'],

            numberFormatter: ['Function', function(i) { return i + 1; }]
        }, options || {}, this._element);

        if (!this._options.previousPageLabel) {
            this._options.previousPageLabel = this._options.previousLabel + ' ' + this._options.maxSize;
        }

        if (!this._options.nextPageLabel) {
            this._options.nextPageLabel = this._options.nextLabel + ' ' + this._options.maxSize;
        }

        this._handlers = {
            click: Ink.bindEvent(this._onClick,this)
        };

        if (Common.isInteger(this._options.totalItemCount) && Common.isInteger(this._options.itemsPerPage)) {
            this._size = Math.ceil(this._options.totalItemCount / this._options.itemsPerPage);
        } else if (Common.isInteger(this._options.size)) {
            this._size = this._options.size;
        } else {
            throw new TypeError('Ink.UI.Pagination: Please supply a size option or totalItemCount and itemsPerPage options.');
        }

        if (!Common.isInteger(this._options.start) && this._options.start > 0 && this._options.start <= this._size) {
            throw new TypeError('start option is a required integer between 1 and size!');
        }

        if (this._options.maxSize && !Common.isInteger(this._options.maxSize) && this._options.maxSize > 0) {
            throw new TypeError('maxSize option is a positive integer!');
        }

        else if (this._size < 0) {
            throw new RangeError('size option must be equal or more than 0!');
        }

        this.setOnChange(this._options.onChange);

        this._current = this._options.start - 1;
        this._itemLiEls = [];

        this._init();
    };

    Pagination.prototype = {

        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
            // generate and apply DOM
            this._generateMarkup(this._element);

            this._updateItems();

            // subscribe events
            this._observe();

            Common.registerInstance(this, this._element, 'pagination');
        },

        /**
         * Responsible for setting listener in the 'click' event of the Pagination element.
         *
         * @method _observe
         * @private
         */
        _observe: function() {
            Event.observeDelegated(this._element, 'click', '.' + this._options.paginationClass + ' > ' + this._options.childTag, this._handlers.click);
        },

        /**
         * Updates the markup everytime there's a change in the Pagination object.
         *
         * @method _updateItems
         * @private
         */
        _updateItems: function() {
            var liEls = this._itemLiEls;

            var isSimpleToggle = this._size === liEls.length;

            var i, f, liEl;

            if (isSimpleToggle) {
                // just toggle active class
                for (i = 0, f = this._size; i < f; ++i) {
                    Css.setClassName(liEls[i], this._options.activeClass, i === this._current);
                }
            }
            else {
                // remove old items
                for (i = liEls.length - 1; i >= 0; --i) {
                    this._ulEl.removeChild(liEls[i]);
                }

                // add new items
                liEls = [];
                for (i = 0, f = this._size; i < f; ++i) {
                    liEl = document.createElement(this._options.childTag);
                    liEl.appendChild( genAEl( this._options.numberFormatter(i), i) );
                    Css.setClassName(liEl, this._options.activeClass, i === this._current);
                    this._ulEl.insertBefore(liEl, this._nextEl);
                    liEls.push(liEl);
                }
                this._itemLiEls = liEls;
            }

            if (this._options.maxSize) {
                // toggle visible items
                var page = Math.floor( this._current / this._options.maxSize );
                var pi = this._options.maxSize * page;
                var pf = pi + this._options.maxSize - 1;

                for (i = 0, f = this._size; i < f; ++i) {
                    liEl = liEls[i];
                    Css.setClassName(liEl, this._options.hideClass, i < pi || i > pf);
                }

                this._pageStart = pi;
                this._pageEnd = pf;
                this._page = page;

                Css.setClassName(this._prevPageEl, this._options.disabledClass, !this.hasPreviousPage());
                Css.setClassName(this._nextPageEl, this._options.disabledClass, !this.hasNextPage());

                Css.setClassName(this._firstEl, this._options.disabledClass, this.isFirst());
                Css.setClassName(this._lastEl, this._options.disabledClass, this.isLast());
            }

            // update prev and next
            Css.setClassName(this._prevEl, this._options.disabledClass, !this.hasPrevious());
            Css.setClassName(this._nextEl, this._options.disabledClass, !this.hasNext());
        },

        /**
         * Returns the top element for the gallery DOM representation
         *
         * @method _generateMarkup
         * @param {DOMElement} el
         * @private
         */
        _generateMarkup: function(el) {
            Css.addClassName(el, 'ink-navigation');

            var ulEl,liEl,
                hasUlAlready = false;
            if( ( ulEl = Selector.select('.' + this._options.paginationClass,el)).length < 1 ){
                ulEl = document.createElement(this._options.parentTag);
                Css.addClassName(ulEl, this._options.paginationClass);
            } else {
                hasUlAlready = true;
                ulEl = ulEl[0];
            }

            if (this._options.maxSize) {
                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.firstLabel) );
                this._firstEl = liEl;
                Css.addClassName(liEl, this._options.firstClass);
                ulEl.appendChild(liEl);

                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.previousPageLabel) );
                this._prevPageEl = liEl;
                Css.addClassName(liEl, this._options.previousPageClass);
                ulEl.appendChild(liEl);
            }

            liEl = document.createElement(this._options.childTag);
            liEl.appendChild( genAEl(this._options.previousLabel) );
            this._prevEl = liEl;
            Css.addClassName(liEl, this._options.previousClass);
            ulEl.appendChild(liEl);

            liEl = document.createElement(this._options.childTag);
            liEl.appendChild( genAEl(this._options.nextLabel) );
            this._nextEl = liEl;
            Css.addClassName(liEl, this._options.nextClass);
            ulEl.appendChild(liEl);

            if (this._options.maxSize) {
                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.nextPageLabel) );
                this._nextPageEl = liEl;
                Css.addClassName(liEl, this._options.nextPageClass);
                ulEl.appendChild(liEl);

                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.lastLabel) );
                this._lastEl = liEl;
                Css.addClassName(liEl, this._options.lastClass);
                ulEl.appendChild(liEl);
            }

            if( !hasUlAlready ){
                el.appendChild(ulEl);
            }

            this._ulEl = ulEl;
        },

        /**
         * Click handler
         *
         * @method _onClick
         * @param {Event} ev
         * @private
         */
        _onClick: function(ev) {
            Event.stop(ev);

            var liEl = Event.element(ev);
            if ( Css.hasClassName(liEl, this._options.activeClass) ||
                 Css.hasClassName(liEl, this._options.disabledClass) ) { return; }

            var isPrev = Css.hasClassName(liEl, this._options.previousClass);
            var isNext = Css.hasClassName(liEl, this._options.nextClass);
            var isPrevPage = Css.hasClassName(liEl, this._options.previousPageClass);
            var isNextPage = Css.hasClassName(liEl, this._options.nextPageClass);
            var isFirst = Css.hasClassName(liEl, this._options.firstClass);
            var isLast = Css.hasClassName(liEl, this._options.lastClass);

            if (isFirst) {
                this.setCurrent(0);
            }
            else if (isLast) {
                this.setCurrent(this._size - 1);
            }
            else if (isPrevPage || isNextPage) {
                this.setCurrent( (isPrevPage ? -1 : 1) * this._options.maxSize, true);
            }
            else if (isPrev || isNext) {
                this.setCurrent(isPrev ? -1 : 1, true);
            }
            else {
                var aElem = Ink.s('[data-index]', liEl);
                var nr = parseInt( aElem.getAttribute('data-index'), 10);
                this.setCurrent(nr);
            }
        },


        /**
         * Allows you to subscribe to the onChange event
         *
         * @method setOnChange
         * @param cb {Function} Callback called with `(thisPaginator, newPageNumber)`.
         */
        setOnChange: function (onChange) {
            if (onChange !== undefined && typeof onChange !== 'function') {
                throw new TypeError('onChange option must be a function!');
            }
            this._onChange = onChange;
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Sets the number of pages
         *
         * @method setSize
         * @param {Number} sz number of pages
         * @public
         */
        setSize: function(sz) {
            if (!Common.isInteger(sz)) {
                throw new TypeError('1st argument must be an integer number!');
            }

            this._size = sz;
            this._updateItems();
            this._current = 0;
        },

        /**
         * Calculate the number of pages, then call setSize().
         *
         * @param setSizeInItems
         * @param {Number} totalItems
         * @param {Number} itemsPerPage
         */
        setSizeInItems: function (totalItems, itemsPerPage) {
            var pageNumber = Math.ceil(totalItems / itemsPerPage);
            this.setSize(pageNumber);
        },

        /**
         * Sets the current page
         *
         * @method setCurrent
         * @param {Number} nr sets the current page to given number
         * @param {Boolean} isRelative trueish to set relative change instead of absolute (default)
         * @public
         */
        setCurrent: function(nr, isRelative) {
            if (!Common.isInteger(nr)) {
                throw new TypeError('1st argument must be an integer number!');
            }

            if (isRelative) {
                nr += this._current;
            }

            if (nr > this._size - 1) {
                nr = this._size - 1;
            }

            if (nr < 0) {
                nr = 0;
            }

            this._current = nr;
            this._updateItems();

            if (this._onChange) {
                this._onChange(this, nr);
            }

            /*if (this._options.setHash) {
                var o = {};
                o[this._options.hashParameter] = nr;
                Common.setHash(o);
            }*/  // undocumented option, removing
        },

        /**
         * Returns the number of pages
         *
         * @method getSize
         * @return {Number} Number of pages
         * @public
         */
        getSize: function() {
            return this._size;
        },

        /**
         * Returns current page
         *
         * @method getCurrent
         * @return {Number} Current page
         * @public
         */
        getCurrent: function() {
            return this._current;
        },

        /**
         * Returns true iif at first page
         *
         * @method isFirst
         * @return {Boolean} True if at first page
         * @public
         */
        isFirst: function() {
            return this._current === 0;
        },

        /**
         * Returns true iif at last page
         *
         * @method isLast
         * @return {Boolean} True if at last page
         * @public
         */
        isLast: function() {
            return this._current === this._size - 1;
        },

        /**
         * Returns true iif has prior pages
         *
         * @method hasPrevious
         * @return {Boolean} True if has prior pages
         * @public
         */
        hasPrevious: function() {
            return this._current > 0;
        },

        /**
         * Returns true iif has pages ahead
         *
         * @method hasNext
         * @return {Boolean} True if has pages ahead
         * @public
         */
        hasNext: function() {
            return this._current < this._size - 1;
        },

        /**
         * Returns true iif has prior set of page(s)
         *
         * @method hasPreviousPage
         * @return {Boolean} Returns true iif has prior set of page(s)
         * @public
         */
        hasPreviousPage: function() {
            return this._options.maxSize && this._current > this._options.maxSize - 1;
        },

        /**
         * Returns true iif has set of page(s) ahead
         *
         * @method hasNextPage
         * @return {Boolean} Returns true iif has set of page(s) ahead
         * @public
         */
        hasNextPage: function() {
            return this._options.maxSize && this._size - this._current >= this._options.maxSize + 1;
        },

        /**
         * Unregisters the component and removes its markup from the DOM
         *
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    return Pagination;

});

/**
 * @module Ink.UI.ProgressBar_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.ProgressBar', '1', ['Ink.Dom.Selector_1','Ink.Dom.Element_1'], function( Selector, Element ) {
    'use strict';

    /**
     * Associated to a .ink-progress-bar element, it provides the necessary
     * method - setValue() - for the user to change the element's value.
     * 
     * @class Ink.UI.ProgressBar
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Number}     [options.startValue]          Percentage of the bar that is filled. Range between 0 and 100. Default: 0
     *     @param {Function}   [options.onStart]             Callback that is called when a change of value is started
     *     @param {Function}   [options.onEnd]               Callback that is called when a change of value ends
     *
     * @example
     *      <div class="ink-progress-bar grey" data-start-value="70%">
     *          <span class="caption">I am a grey progress bar</span>
     *          <div class="bar grey"></div>
     *      </div>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.ProgressBar_1'], function( Selector, ProgressBar ){
     *              var progressBarElement = Ink.s('.ink-progress-bar');
     *              var progressBarObj = new ProgressBar( progressBarElement );
     *          });
     *      </script>
     */
    var ProgressBar = function( selector, options ){

        if( typeof selector !== 'object' ){
            if( typeof selector !== 'string' ){
                throw '[Ink.UI.ProgressBar] :: Invalid selector';
            } else {
                this._element = Selector.select(selector);
                if( this._element.length < 1 ){
                    throw "[Ink.UI.ProgressBar] :: Selector didn't find any elements";
                }
                this._element = this._element[0];
            }
        } else {
            this._element = selector;
        }


        this._options = Ink.extendObj({
            'startValue': 0,
            'onStart': function(){},
            'onEnd': function(){}
        },Element.data(this._element));

        this._options = Ink.extendObj( this._options, options || {});
        this._value = this._options.startValue;

        this._init();
    };

    ProgressBar.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._elementBar = Selector.select('.bar',this._element);
            if( this._elementBar.length < 1 ){
                throw '[Ink.UI.ProgressBar] :: Bar element not found';
            }
            this._elementBar = this._elementBar[0];

            this._options.onStart = Ink.bind(this._options.onStart,this);
            this._options.onEnd = Ink.bind(this._options.onEnd,this);
            this.setValue( this._options.startValue );
        },

        /**
         * Sets the value of the Progressbar
         * 
         * @method setValue
         * @param {Number} newValue Numeric value, between 0 and 100, that represents the percentage of the bar.
         * @public
         */
        setValue: function( newValue ){
            this._options.onStart( this._value);

            newValue = parseInt(newValue,10);
            if( isNaN(newValue) || (newValue < 0) ){
                newValue = 0;
            } else if( newValue>100 ){
                newValue = 100;
            }
            this._value = newValue;
            this._elementBar.style.width =  this._value + '%';

            this._options.onEnd( this._value );
        }
    };

    return ProgressBar;

});

/**
 * @module Ink.UI.SmoothScroller_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.SmoothScroller', '1', ['Ink.Dom.Event_1','Ink.Dom.Selector_1','Ink.Dom.Loaded_1'], function(Event, Selector, Loaded) {
    'use strict';

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        function (cb) { return setTimeout(cb, 10); };

    var cancelAnimationFrame =
        window.cancelAnimationFrame ||
        function (id) { clearTimeout(id); };

    /**
     * @class Ink.UI.SmoothScroller
     * @version 1
     * @static
     *
     * @example
     *
     *      <a href="#part1" class="ink-smooth-scroll">go to Part 1</a>
     *
     *      [lots and lots of content...]
     *
     *      <h1 id="part1">Part 1</h1>
     *
     *      <script>
     *          // ...Although you don't need to do this if you have autoload.js
     *          Ink.requireModules(['Ink.UI.SmoothScroller_1'], function (SmoothScroller) {
     *              SmoothScroller.init('.ink-smooth-scroll');
     *          })
     *      </script>
     */
    var SmoothScroller = {

        /**
         * Sets the speed of the scrolling
         *
         * @property speed
         * @type {Number}
         * @readOnly
         * @static
         */
        speed: 10,

        /**
         * Returns the Y position of an element, relative to the document
         *
         * @method getTop
         * @param  {DOMElement} d DOMElement to get the Y position from
         * @return {Number}   Y position of div 'd'
         * @public
         * @static
         */
        getTop: function(d) {
            return Math.round(
                SmoothScroller.scrollTop() + d.getBoundingClientRect().top);
        },


        /**
         * Returns the current scroll position
         *
         * @method scrollTop
         * @return {Number}  Current scroll position
         * @public
         * @static
         */
        scrollTop: function() {
            var body = document.body,
                d = document.documentElement;
            if (body && body.scrollTop){
                return body.scrollTop;
            }
            if (d && d.scrollTop){
                return d.scrollTop;
            }
            if (window.pageYOffset){
                return window.pageYOffset;
            }
            return 0;
        },

        /**
         * Attaches an event for an element
         *
         * @method add
         * @param  {DOMElement} el DOMElement to make the listening of the event
         * @param  {String} event Event name to be listened
         * @param  {DOMElement} fn Callback function to run when the event is triggered.
         * @public
         * @static
         */
        add: function(el, event, fn) {
            Event.observe(el,event,fn);
        },


        /**
         * Kill an event of an element
         *
         * @method end
         * @param  {String} e Event to be killed/stopped
         * @public
         * @static
         */
        // kill an event of an element
        end: function(e) {
            Event.stopDefault(e);
        },


        /**
         * Moves the scrollbar to the target element. This is the function
         * which animates the scroll position bit by bit. It calls itself in
         * the end through requestAnimationFrame
         *
         * @method scroll
         * @param  {Number} d Y coordinate value to stop
         * @public
         * @static
         */
        scroll: function(d) {
            var a = SmoothScroller.scrollTop();
            if (d > a) {
                a += Math.ceil((d - a) / SmoothScroller.speed);
            } else {
                a = a + (d - a) / SmoothScroller.speed;
            }

            window.scrollTo(0, a);

            cancelAnimationFrame(SmoothScroller.interval);

            if (!((a) === d || SmoothScroller.offsetTop === a)) {
                SmoothScroller.interval = requestAnimationFrame(
                    Ink.bindMethod(SmoothScroller, 'scroll', d), document.body);
            } else {
                SmoothScroller.onDone();
            }
            SmoothScroller.offsetTop = a;
        },


        /**
         * Has smooth scrolling applied to relevant elements upon page load.
         *
         * @method init
         * @param [selector='a.scrollableLink,a.ink-smooth-scroll'] Selector string for finding links with smooth scrolling enabled.
         * @public
         * @static
         */
        init: function(selector) {
            Loaded.run(Ink.bindMethod(SmoothScroller, 'render', selector));
        },

        /**
         * This method extracts all the anchors and validates them as # and attaches the events
         *
         * @method render
         * @public
         * @static
         */
        render: function(selector) {
            var a = Selector.select(selector || 'a.scrollableLink,a.ink-smooth-scroll');

            for (var i = 0; i < a.length; i++) {
                var _elm = a[i];
                if (_elm.href && _elm.href.indexOf('#') !== -1 && ((_elm.pathname === location.pathname) || ('/' + _elm.pathname === location.pathname))) {
                    Event.observe(_elm,'click', Ink.bindEvent(SmoothScroller.onClick, this, _elm));
                }
            }
        },


        /**
         * Click handler
         *
         * @method onClick
         * @public
         * @static
         */
        onClick: function(event, _elm) {
            SmoothScroller.end(event);
            if(_elm !== null && _elm.getAttribute('href') !== null) {
                var hashIndex = _elm.href.indexOf('#');
                if (hashIndex === -1) {
                    return;
                }
                var hash = _elm.href.substr((hashIndex + 1));
                var activeLiSelector = 'ul > li.active > ' + selector;

                var selector = 'a[name="' + hash + '"],#' + hash;
                var elm = Selector.select(selector)[0];
                var activeLi = Selector.select(activeLiSelector)[0];
                activeLi = activeLi && activeLi.parentNode;

                if (typeof(elm) !== 'undefined') {
                    if (_elm.parentNode.className.indexOf('active') === -1) {
                        if (activeLi) {
                            activeLi.className = activeLi.className.replace(/(^|\s+)active($|\s+)/g, '');
                        }
                        _elm.parentNode.className += " active";
                    }
                    SmoothScroller.hash = hash;
                    SmoothScroller.scroll(SmoothScroller.getTop(elm));
                }
            }
        },

        /**
         * Called when the scroll movement is done. Updates browser address.
         */
        onDone: function () {
            window.location.hash = SmoothScroller.hash;
        }
    };

    return SmoothScroller;

});

/**
 * @module Ink.UI.SortableList_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.SortableList', '1', ['Ink.UI.Common_1','Ink.Dom.Css_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function( Common, Css, Events, Element, Selector ) {
    'use strict';
    var hasTouch = (('ontouchstart' in window) ||       // html5 browsers
                    (navigator.maxTouchPoints > 0) ||   // future IE
                    (navigator.msMaxTouchPoints > 0));

    /**
     * Adds sortable behaviour to any list!
     * 
     * @class Ink.UI.SortableList
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {String} [options.placeholderClass='placeholder'] CSS class to be added to the "ghost" element being dragged around
     * @param {String} [options.draggedClass='hide-all'] CSS class added to the original element.
     * @param {String} [options.draggingClass='dragging'] CSS class added to the html element when the user is dragging.
     * @param {String} [options.dragSelector='li'] CSS selector for the drag enabled nodes.
     * @param {String} [options.handleSelector=null] CSS selector for the drag handle. If present, you can only drag nodes by this selector.
     * @param {String} [options.moveSelector=null] CSS selector to validate a node move. If present, you can only move nodes into this selector.
     * @param {Boolean} [options.swap=false] Flag to swap moving element with target element instead of changing its order.
     * @param {Boolean} [options.cancelMouseOut=false] Flag to cancel moving if mouse leaves the container element.

     * @example
     *      <ul class="unstyled ink-sortable-list" id="slist" data-handle-selector=".ink-label">
     *          <li><span class="ink-label info">drag here</span>primeiro</li>
     *          <li><span class="ink-label info">drag here</span>segundo</li>
     *          <li><span class="ink-label info">drag here</span>terceiro</li>
     *      </ul>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.SortableList_1'], function( Selector, SortableList ){
     *              var sortableListElement = Ink.s('.ink-sortable-list');
     *              var sortableListObj = new SortableList( sortableListElement );
     *          });
     *      <\/script>
     */
    var SortableList = function(selector, options) {

        this._element = Common.elOrSelector(selector, 'Ink.UI.SortableList');

        this._options = Common.options('Sortable', {
            'placeholderClass': ['String', 'placeholder'],
            'draggedClass': ['String', 'hide-all'],
            'draggingClass': ['String', 'dragging'],
            'dragSelector': ['String', 'li'],
            'dragObject': ['String', null], // Deprecated. Use handleSelector instead.
            'handleSelector': ['String', null],
            'moveSelector': ['String', false],
            'swap': ['Boolean', false],
            'cancelMouseOut': ['Boolean', false]
        }, options || {}, this._element);

        if (this._options.dragObject != null) {
            // [3.0.0] Remove this deprecation notice and stop providing backwards compatibility
            Ink.warn('Ink.UI.SortableList: options.dragObject is now deprecated. ' +
                    'Please use options.handleSelector instead.');
            this._options.handleSelector =
                this._options.handleSelector || this._options.dragObject;
        }

        this._handlers = {
            down: Ink.bind(this._onDown, this),
            move: Ink.bind(this._onMove, this),
            up:   Ink.bind(this._onUp, this)
        };

        this._isMoving = false;

        this._init();
    };

    SortableList.prototype = {

        /**
         * Init function called by the constructor.
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._down = hasTouch ? 'touchstart mousedown' : 'mousedown';
            this._move = hasTouch ? 'touchmove mousemove' : 'mousemove';
            this._up   = hasTouch ? 'touchend mouseup' : 'mouseup';

            this._observe();
            Common.registerInstance(this, this._element, 'sortableList');
        },

        /**
         * Sets the event handlers.
         * 
         * @method _observe
         * @private
         */
        _observe: function() {
            Events.on(this._element, this._down, this._options.dragSelector, this._handlers.down);
            Events.on(this._element, this._move, this._options.dragSelector, this._handlers.move);
            if(this._options.cancelMouseOut) {
                Events.on(this._element, 'mouseleave', Ink.bind(this.stopMoving, this));
            }
            Events.on(document.documentElement, this._up, this._handlers.up);
        },

        /**
         * Mousedown or touchstart handler
         * 
         * @method _onDown
         * @param {Event} ev
         * @private
         */
        _onDown: function(ev) {
            if (this._isMoving || this._placeholder) { return; }
            if(this._options.handleSelector && !Selector.matchesSelector(ev.target, this._options.handleSelector)) { return; }
            var tgtEl = ev.currentTarget;
            this._isMoving = tgtEl;
            this._placeholder = tgtEl.cloneNode(true);
            this._movePlaceholder(tgtEl);
            this._addMovingClasses();
            return false;
        },

        /**
         * Mousemove or touchmove handler
         * 
         * @method _onMove
         * @param {Event} ev
         * @private
         */
        _onMove: function(ev) {
            this.validateMove(ev.currentTarget);
            return false;
        },

        /**
         * Mouseup or touchend handler
         * 
         * @method _onUp
         * @param {Event} ev
         * @private
         */
        _onUp: function(ev) {
            if (!this._isMoving || !this._placeholder) { return; }
            if (ev.currentTarget === this._isMoving) { return; }
            if (ev.currentTarget === this._placeholder) { return; }
            Element.insertBefore(this._isMoving, this._placeholder);
            this.stopMoving();
            return false;
        },

        /**
         * Adds the CSS classes to interactive elements
         * 
         * @method _addMovingClasses
         * @private
         */
        _addMovingClasses: function(){
            Css.addClassName(this._placeholder, this._options.placeholderClass);
            Css.addClassName(this._isMoving, this._options.draggedClass);
            Css.addClassName(document.documentElement, this._options.draggingClass);
        },

        /**
         * Removes the CSS classes from interactive elements
         * 
         * @method _removeMovingClasses
         * @private
         */
        _removeMovingClasses: function(){
            if(this._isMoving) { Css.removeClassName(this._isMoving, this._options.draggedClass); }
            if(this._placeholder) { Css.removeClassName(this._placeholder, this._options.placeholderClass); }
            Css.removeClassName(document.documentElement, this._options.draggingClass);
        },

        /**
         * Moves the placeholder element relative to the target element
         * 
         * @method _movePlaceholder
         * @param {Element} target_position
         * @private
         */
        _movePlaceholder: function(target){
            var placeholder = this._placeholder,
                target_position,
                placeholder_position,
                from_top,
                from_left;
            if(!placeholder) {
                Element.insertAfter(placeholder, target);
            } else if(this._options.swap){
                Element.insertAfter(placeholder, target);
                Element.insertBefore(target, this._isMoving);
                Element.insertBefore(this._isMoving, placeholder);
            } else {
                target_position = Element.offset(target);
                placeholder_position = Element.offset(this._placeholder);
                from_top = target_position[1] > placeholder_position[1];
                from_left = target_position[0] > placeholder_position[0];
                if( ( from_top && from_left ) || ( !from_top && !from_left ) ) {
                    Element.insertBefore(placeholder, target);
                } else {
                    Element.insertAfter(placeholder, target);
                }
                Element.insertBefore(this._isMoving, placeholder);
            }
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Unregisters the component and removes its markup from the DOM
         * 
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent,

        /**
         * Visually stops moving. Removes the placeholder as well as the styling classes.
         * 
         * @method _movePlaceholder
         * @public
         */
        stopMoving: function(){
            this._removeMovingClasses();
            Element.remove(this._placeholder);
            this._placeholder = false;
            this._isMoving = false;
        },

        /**
         * Validation method for the move handler
         * 
         * @method _movePlaceholder
         * @param {Element} elem
         * @public
         */
        validateMove: function(elem){
            if (!this._isMoving || !this._placeholder) { return; }
            if (elem === this._placeholder) {  return; }
            if (elem === this._isMoving) { return; }
            if(!this._options.moveSelector || Selector.matchesSelector(elem, this._options.moveSelector)){
                this._movePlaceholder(elem);
            } else {
                this.stopMoving();  
            }
        }

    };

    return SortableList;
});

/**
 * @module Ink.UI.Spy_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Spy', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function(Common, Event, Css, Element, Selector ) {
    'use strict';

    // Maps a spy target (EG a menu with links inside) to spied instances.
    var spyTargets = [
        // [target, [spied, spied, spied...]], ...
    ];

    function targetIndex(target) {
        for (var i = 0, len = spyTargets.length; i < len; i++) {
            if (spyTargets[i][0] === target) {
                return i;
            }
        }
        return null;
    }

    function addSpied(spied, target) {
        var index = targetIndex(target);

        if (index === null) {
            spyTargets.push([target, [spied]]);
        } else {
            spyTargets[index][1].push(spied);
        }
    }

    var observingOnScroll = false;
    function observeOnScroll() {
        if (!observingOnScroll) {
            observingOnScroll = true;
            Event.observe(document, 'scroll', Event.throttle(onScroll, 300));
        }
    }

    function onScroll() {
        for (var i = 0, len = spyTargets.length; i < len; i++) {
            onScrollForTarget(spyTargets[i][0], spyTargets[i][1]);
        }
    }

    function onScrollForTarget(target, spied) {
        var activeEl = findActiveElement(spied);

        // This selector finds li's to deactivate
        var toDeactivate = Selector.select('li.active', target);
        for (var i = 0, total = toDeactivate.length; i < total; i++) {
            Css.removeClassName(toDeactivate[i], 'active');
        }

        if (activeEl === null) {
            return;
        }

        // The link which should be activated has a "href" ending with "#" + name or id of the element
        var menuLinkSelector = 'a[href$="#' + (activeEl.name || activeEl.id) + '"]';

        var toActivate = Selector.select(menuLinkSelector, target);
        for (i = 0, total = toActivate.length; i < total; i++) {
            Css.addClassName(Element.findUpwardsByTag(toActivate[i], 'li'), 'active');
        }
    }

    function findActiveElement(spied) {
        /* 
         * Find the element above the top of the screen, but closest to it.
         *          _____ 
         *         |_____| element 1  (active element)
         *
         *                              ---
         *          _____                 |
         *         |     |  element 2     |    viewport visible area         
         *         |     |                |
         *         |_____|                |
         *                              ---
         */

        // Remember that getBoundingClientRect returns coordinates
        // relative to the top left corner of the screen.
        //
        // So checking if it's < 0 is used to tell if
        // the element is above the top of the screen.
        var closest = -Infinity;
        var closestIndex;
        var bBox;
        for( var i = 0, total = spied.length; i < total; i++ ){
            bBox = spied[i].getBoundingClientRect();
            if (bBox.top <= 0 && bBox.top > closest) {
                closest = bBox.top;
                closestIndex = i;
            }
        }
        if (closestIndex === undefined) {
            return null;
        } else {
            return spied[closestIndex];
        }
    }

    /**
     * Spy is a component that 'spies' an element (or a group of elements) and when they leave the viewport (through the top),
     * highlight an option - related to that element being spied - that resides in a menu, initially identified as target.
     * 
     * @class Ink.UI.Spy
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {DOMElement|String}     options.target          Target menu on where the spy will highlight the right option.
     *     TODO @xparam {String}                [options.activeClass='active'] Class which marks the "li" as active.
     * @example
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Spy_1'], function( Selector, Spy ){
     *              var menuElement = Ink.s('#menu');
     *              var specialAnchorToSpy = Ink.s('#specialAnchor');
     *              var spyObj = new Spy( specialAnchorToSpy, {
     *                  target: menuElement
     *              });
     *          });
     *      </script>
     */
    var Spy = function( selector, options ){

        this._rootElement = Common.elOrSelector(selector,'1st argument');

        /**
         * Setting default options and - if needed - overriding it with the data attributes
         */
        this._options = Ink.extendObj({
            target: undefined,
            activeClass: 'active'
        }, Element.data( this._rootElement ) );

        /**
         * In case options have been defined when creating the instance, they've precedence
         */
        this._options = Ink.extendObj(this._options,options || {});

        this._options.target = Common.elOrSelector( this._options.target, 'Target' );

        this._init();
    };

    Spy.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            addSpied(this._rootElement, this._options.target);
            observeOnScroll();
            onScroll();
        }
    };

    return Spy;

});

/**
 * @module Ink.UI.Stacker_1
 **/
Ink.createModule('Ink.UI.Stacker', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(InkUICommon, InkEvent, InkElement) {
    'use strict';

function Stacker(selector, options) {
    this._init(selector, options);
}

Stacker.prototype = {
    /**
     * This module combines several stacks of items together, in smaller screen sizes.
     *
     * The purpose is to have several stacks of items which may have different heights and as such cannot be used because of `float: left` quirks.
     *
     * For example, when you have three different columns of information:
     *
     *     [col. A: 1] [col. B: 1] [col. C: 1]
     *     [col. B: 2] [col. C: 2] [col. C: 2]
     *
     * and the screen resizes and you need a layout of 2 columns, Stacker reorders the stacks so that you get:
     *
     *     [col. A: 1] [col. B: 1]
     *     [col. C: 1] [col. A: 2]
     *     [col. B: 2] [col. C: 2]
     * 
     * Note: If you just want to use a different amount of columns for your items in several viewports, but these items are guaranteed to have a fixed height, don't use this module. Use the `small-*`, `medium-*` and `large-*` classes instead.
     *
     * @class Ink.UI.Stacker_1
     *
     * @constructor
     * @param [container] {DOMElement|String} Element which contains the stacks (identified by the options.column selector)
     * @param [options]
     * @param [options.column='.stacker-column'] {String}   Select the columns inside the `container`
     * @param [options.item='.stacker-item']     {String}   Select items in your stack
     *
     * @param [options.customBreakPoints]        {Object}   options for each breakpoint name. Use this if you have more breakpoints than Ink by default (`large`, `medium`, `small`)
     * @param [options.customBreakpoints.(breakpoint)] {Object} 
     * @param options.customBreakpoints.(breakpoint).max    Maximum screen size as seen in your media query
     * @param options.customBreakpoints.(breakpoint).min    Minimum screen size as seen in your media query
     * @param options.customBreakpoints.(breakpoint).cols   Column count for this size.
     *
     * @param [options.largeMax]                 {Number}   Upper bound of `large` breakpoint
     * @param [options.largeMin=961]             {Number}   Lower bound of `large` breakpoint
     * @param [options.mediumMax=960]            {Number}   Upper bound of `medium` breakpoint
     * @param [options.mediumMin=651]            {Number}   Lower bound of `medium` breakpoint
     * @param [options.smallMax=650]             {Number}   Upper bound of `small` breakpoint
     * @param [options.smallMin]                 {Number}   Lower bound of `small` breakpoint
     *
     * @param [options.largeCols=3]              {Integer}  Number of columns in the `large` viewport
     * @param [options.mediumCols=2]             {Integer}  Number of columns in the `medium` viewport
     * @param [options.smallCols=1]              {Integer}  Number of columns in the `small` viewport
     *
     * @param [options.isOrdered=true]           {Boolean}  When `false`, do not reorder stacks when combining them.
     * @param [options.onRunCallback]            {Function} Called when instantiated
     * @param [options.onResizeCallback]         {Function} Called when resized because the window resized.
     * @param [options.onAPIReloadCallback]      {Function} Called when you ask to reload stack items from the DOM.
     *
     * @example
     *
     * Html:
     *
     *     <div id="stacker-container">  <!-- Stacker element -->
     *         <div class="large-33 medium-50 small-100 stacker-column"> <!-- Column element ('.stacker-column' is the default selector) -->
     *             <div id="a" class="stacker-item">a</div> <!-- Item ('.stacker-item' is the default selector) -->
     *             <div id="d" class="stacker-item">d</div>
     *             <div id="g" class="stacker-item">g</div>
     *         </div>
     *         <div class="large-33 medium-50 small-100 hide-small stacker-column">
     *             <div id="b" class="stacker-item">b</div>
     *             <div id="e" class="stacker-item">e</div>
     *             <div id="h" class="stacker-item">h</div>
     *         </div>
     *         <div class="large-33 medium-50 small-100 hide-medium hide-small stacker-column">
     *             <div id="c" class="stacker-item">c</div>
     *             <div id="f" class="stacker-item">f</div>
     *             <div id="i" class="stacker-item">i</div>
     *         </div>
     *     </div>
     *
     * Javascript:
     *
     *     Ink.requireModules(['Ink.UI.Stacker_1'], function (Stacker) {
     *         var stacker = new Stacker('#stacker-container');
     *         // Keep the "stacker" variable around if you want to call addItem and reloadItems
     *     });
     **/
    _init: function(selector, options) {
        /* globals console */
        this._rootElm = InkUICommon.elsOrSelector(selector, 'Ink.UI.Stacker root element')[0] || null;
        if(this._rootElm === null) {
            if(typeof console !== 'undefined') {
                console.warn('Ink.UI.Stacker: No root element');
            }
        }

        this._options = InkUICommon.options({
            column: ['String', '.stacker-column'],
            item: ['String', '.stacker-item'],

            // [3.0.0] review this when we have info about our breakpoints from the CSS
            customBreakPoints: ['Object', null], // Must be: {xlarge: {max: 9999, min: 1281, cols: 5}, large:{max:1280, min:1001, cols:4} medium:{max:1000, min:801,cols:3}, ...etc..}
            largeMax: ['Number', Number.MAX_VALUE],
            largeMin: ['Number', 961],
            mediumMax: ['Number', 960],
            mediumMin: ['Number', 651],
            smallMax: ['Number', 650],
            smallMin: ['Number', 0],

            largeCols: ['Integer', 3],
            mediumCols: ['Integer', 2],
            smallCols: ['Integer', 1],

            isOrdered: ['Boolean', true],
            onRunCallback: ['Function', null],
            onResizeCallback: ['Function', null],
            onAPIReloadCallback: ['Function', null]
        }, options || {}, this._rootElm);  

        this._aList = []; 

        this._curLayout = 'large';

        // [todo] is this needed?
        this._runFirstTime = false;

        this._getPageItemsToList();

        if(this._canApplyLayoutChange() || !this._runFirstTime) {
            this._runFirstTime = true;
            this._applyLayoutChange();
            if(typeof(this._options.onRunCallback) === 'function') {
                this._options.onRunCallback(this._curLayout);
            }
        }
        this._addEvents();
    },

    /**
     * Add an item to the end of your stacks. Call `reloadItems()` when you are done adding items.
     * @method addItem
     * @param {DOMElement} item
     **/
    addItem: function(item) {
        this._aList.push(item);
    },

    /**
     * Update the layout of your items.
     *
     * Call this when:
     *
     *  - The width has changed, but not because of the window resizing.
     *  - You used addItem to add some items
     *
     * @method reloadItems
     **/
    reloadItems: function() {
        this._applyLayoutChange();
        if(typeof(this._options.onAPIReloadCallback) === 'function') {
            this._options.onAPIReloadCallback(this._curLayout);
        }
    },

    _addEvents: function() {
        InkEvent.observe(window, 'resize', Ink.bindEvent(this._onResize, this));
    },

    _onResize: function() {
        if(this._canApplyLayoutChange()) {
            this._removeDomItems();
            this._applyLayoutChange();
            if(typeof(this._options.onResizeCallback) === 'function') {
                this._options.onResizeCallback(this._curLayout);
            }
        }
    },

    _setCurLayout: function() {
        var viewportWidth = InkElement.viewportWidth();
        if(this._options.customBreakpoints && typeof(this._options.customBreakPoints) === 'object') {
            for(var prop in this._options.customBreakPoints) {
                if(this._options.customBreakPoints.hasOwnProperty(prop)) {
                    if(viewportWidth >= Number(this._options.customBreakPoints[prop].min) && viewportWidth <= Number(this._options.customBreakPoints[prop].max) && this._curLayout !== prop) {
                        this._curLayout = prop;
                        return;
                    } 
                }
            }
        } else {
            if(viewportWidth <= Number(this._options.largeMax) && viewportWidth >= Number(this._options.largeMin) && this._curLayout !== 'large') {
                this._curLayout = 'large';
            } else if(viewportWidth >= Number(this._options.mediumMin) && viewportWidth <= Number(this._options.mediumMax) && this._curLayout !== 'medium') {
                this._curLayout = 'medium';
            } else if(viewportWidth >= Number(this._options.smallMin) && viewportWidth <= Number(this._options.smallMax) && this._curLayout !== 'small') {
                this._curLayout = 'small';
            }
        }
    },

    _getColumnsToShow: function() {
        if(this._options.customBreakPoints && typeof(this._options.customBreakPoints) === 'object') {
            return Number(this._options.customBreakPoints[this._curLayout].cols);
        } else {
            return Number(this._options[this._curLayout+'Cols']);
        }
    },

    _canApplyLayoutChange: function() {
        var curLayout = this._curLayout;
        this._setCurLayout();
        if(curLayout !== this._curLayout) {
            return true;
        }
        return false;
    },

    _getPageItemsToList: function() {
        this._aColumn = Ink.ss(this._options.column, this._rootElm);
        var totalCols = this._aColumn.length;
        var index = 0;
        if(totalCols > 0) {
            for(var i=0; i < this._aColumn.length; i++) {
                var aItems = Ink.ss(this._options.item, this._aColumn[i]);
                for(var j=0; j < aItems.length; j++) {
                    if(this._options.isOrdered) {
                        index = i + (j * totalCols);
                    }
                    this._aList[index] = aItems[j];
                    if(!this._options.isOrdered) {
                        index++;
                    }
                    //aItems[j].style.height = (100 + (Math.random() * 100))+'px';
                    aItems[j].parentNode.removeChild(aItems[j]);
                }
            }
            if(this._aList.length > 0 && this._options.isOrdered) {
                var aNewList = [];
                for(var ii=0; ii < this._aList.length; ii++) {
                    if(typeof(this._aList[ii]) !== 'undefined') {
                        aNewList.push(this._aList[ii]);
                    }
                }
                this._aList = aNewList;
            }
        }
    }, 

    _removeDomItems: function() {
        var totalCols = this._aColumn.length;
        if(totalCols > 0) {
            for(var i=0; i < totalCols; i++) {
                var aItems = Ink.ss(this._options.item, this._aColumn[i]);
                for(var j=aItems.length - 1; j >= 0; j--) {
                    aItems[j].parentNode.removeChild(aItems[j]);
                }
            }
        }
    },

    _applyLayoutChange: function() {
        var totalCols = this._getColumnsToShow();
        var totalItems = this._aList.length;
        var index = 0;
        var countCol = 0;
        if(totalCols > 0) {
            while(countCol < totalCols) {
                this._aColumn[countCol].appendChild(this._aList[index]);
                index++;
                countCol++;
                if(index === totalItems) {
                    return;
                }
                if(countCol === totalCols) {
                    countCol = 0;
                }
            }
        }
    }
};

return Stacker;

});

/**
 * @module Ink.UI.Sticky_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Sticky', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Dom.Css_1'], function(Common, Event, Element, Css) {
    'use strict';

    /**
     * The Sticky component takes an element and transforms it's behavior in order to, when the user scrolls he sets its position
     * to fixed and maintain it until the user scrolls back to the same place.
     *
     * @class Ink.UI.Sticky
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Number}     [options.offsetBottom=0]    Number of pixels of distance from the bottomElement.
     *     @param {Number}     [options.offsetTop=0]       Number of pixels of distance from the topElement.
     *     @param {Boolean}    [options.inlineDimensions=true] Whether to set "style.height" and "style.width" in the stuck element. Turn this off when your `stickyClass` has its own height and width and you don't want this to be dealt with through javascript.
     *     @param {Boolean}    [options.inlinePosition=true] Whether to set "style.left" in the stuck element. Turn this off when your `stickyClass` has its own "left" position and you don't want this to be dealt with through javascript.
     *     @param {String}     [options.wrapperClass="ink-sticky-wrapper"] Css class for the wrapper element.
     *     @param {String}     [options.stickyClass="ink-sticky-stuck"] Css class for sticking the sticky to the screen. Add your own "stuck" class to define your own sticky behaviour.
     *     @param {String}     [options.topElement]        CSS Selector that specifies a top element with which the component could collide.
     *     @param {String}     [options.bottomElement]     CSS Selector that specifies a bottom element with which the component could collide.
     *     @param {Array|String} [options.activateInLayouts='medium,large'] Layouts in which the sticky behaviour is present. Pass an array or comma-separated string.
     * @example
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Sticky_1'], function( Selector, Sticky ) {
     *              var menuElement = Ink.s('#menu');
     *              var stickyObj = new Sticky( menuElement );
     *          });
     *      </script>
     */
    var Sticky = function( selector, options ){
        this._rootElement = Common.elOrSelector(selector, 'Ink.UI.Sticky_1');

        this._options = Common.options({
            offsetBottom: ['Integer', 0],
            offsetTop: ['Integer', 0],
            topElement: ['Element', null],
            wrapperClass: ['String', 'ink-sticky-wrapper'],
            stickyClass: ['String', 'ink-sticky-stuck'],
            inlineDimensions: ['Boolean', true],
            inlinePosition: ['Boolean', true],
            bottomElement: ['Element', null],
            activateInLayouts: ['String', 'medium,large']
        }, options || {}, this._rootElement );

        // Because String#indexOf is compatible with lt IE8 but not Array#indexOf
        this._options.activateInLayouts = this._options.activateInLayouts.toString();

        this._dims = null;  // force a recalculation of the dimensions later

        this._options.offsetTop = parseInt(this._options.offsetTop, 10) || 0;
        this._options.offsetBottom = parseInt(this._options.offsetBottom, 10) || 0;

        if (this._options.topElement) {
            this._options.topElement = Common.elOrSelector(this._options.topElement, 'Top Element');
        }
        if (this._options.bottomElement) {
            this._options.bottomElement = Common.elOrSelector(this._options.bottomElement, 'Sticky bottom Element');
        }

        this._wrapper = Element.create('div', { className: this._options.wrapperClass });
        Element.wrap(this._rootElement, this._wrapper);

        this._init();
    };

    Sticky.prototype = {

        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
            var scrollTarget = document.addEventListener ? document : window;
            this._onScroll = Ink.bind(Event.throttle(this._onScroll, 33), this);  // Because this is called directly.
            Event.observe( scrollTarget, 'scroll', this._onScroll );
            Event.observe( window, 'resize', Ink.bindEvent(Event.throttle(this._onResize, 100), this) );
            this._onScroll();
        },

        /**
         * Returns whether the sticky is disabled in the current view
         *
         * @method isDisabledInLayout
         * @private
         */
        _isDisabledInLayout: function () {
            var currentLayout = Common.currentLayout();
            if (!currentLayout) { return false; }
            return this._options.activateInLayouts.indexOf(currentLayout) === -1;
        },

        /**
         * Scroll handler.
         *
         * @method _onScroll
         * @private
         */
        _onScroll: function(){
            var dims = this._getDims();
            var scrollHeight = Element.scrollHeight();

            var unstick = this._isDisabledInLayout() ||
                scrollHeight <= dims.top - this._options.offsetTop ||
                (this._options.topElement && this._options.topElement.getBoundingClientRect().bottom + this._options.offsetTop > 0);

            if( unstick ) {
                // We're on top, no sticking. position:static is the "normal" position.
                this._unstick();
                return;
            }

            // If we stick it now, what will be its boundingClientRect.bottom ?
            var bottomOfSticky = this._options.offsetTop + dims.height + Element.scrollHeight();
            var maxBottomOfSticky = document.body.scrollHeight;

            if (this._options.bottomElement) {
                maxBottomOfSticky =
                    this._options.bottomElement.getBoundingClientRect().top +
                    Element.scrollHeight();
            }

            maxBottomOfSticky -= this._options.offsetBottom;

            if ( bottomOfSticky < maxBottomOfSticky ) {
                // Stick to screen!
                this._stickTo('screen');
            } else {
                // Stick to bottom
                this._stickTo('bottom');
            }
        },

        /**
         * Have the sticky stick nowhere, to the screen, or to the bottom.
         *
         * @method _stickTo
         * @private
         */
        _stickTo: function (where) {
            var style = this._rootElement.style;
            var dims = this._getDims();

            Css.addClassName(this._rootElement, this._options.stickyClass);
            this._wrapper.style.height = dims.height + 'px';

            this._inlineDimensions(dims.height + 'px', dims.width + 'px');

            if (this._options.inlinePosition === false) {
                return;
            }

            style.left = dims.left + 'px';

            if (where === 'screen') {
                style.bottom = null;
                style.top = this._options.offsetTop + 'px';
            } else if (where === 'bottom') {
                // Distance between bottom of sticky and bottom of document
                var bottom = this._getBottomOffset();

                // Distance between bottom of viewport and bottom of document
                var bottomOfViewport = Element.scrollHeight() + Element.viewportHeight();
                var toBottomOfDocument = Element.pageHeight() - bottomOfViewport;

                style.bottom = bottom - toBottomOfDocument + 'px';
                style.top = 'auto';
            }
        },

        /**
         * "unstick" the sticky from the screen or bottom of the document
         * @method _unstick
         * @private
         */
        _unstick: function () {
            Css.removeClassName(this._rootElement, this._options.stickyClass);
            // deinline dimensions of our root element
            this._inlineDimensions(null, null);

            // deinline the position of our root element
            if (this._options.inlinePosition) {
                this._rootElement.style.left = null;
                this._rootElement.style.top = null;
                this._rootElement.style.bottom = null;
            }

            // deinline dimensions of wrapper
            this._wrapper.style.height = null;
            this._wrapper.style.width = null;

            // Break the "getDims" cache
            this._dims = null;
        },

        /**
         * Resize handler
         *
         * @method _onResize
         * @private
         */
        _onResize: function(){
            this._dims = null;  // Blow the cache so _getDims recalculates
            this._onScroll();
        },

        /**
         * Recalculate the "dims" cache, or get it.
         *
         * The "dims" cache is to be set to null when the element is liable to have changed dimensions
         *
         * (eg: on resize)
         *
         **/
        _getDims: function () {
            if (this._dims !== null) { return this._dims; }

            var style = this._rootElement.style;

            // We unstick the sticky so we can measure.
            var oldPosition = style.position;
            var oldWidth = style.width;

            style.position = 'static'; // [todo] this should be a class toggle
            style.width = null;

            var dimensionsInStatic = Element.outerDimensions(this._rootElement);
            var rect = this._wrapper.getBoundingClientRect();
            this._dims = {
                height: dimensionsInStatic[1],
                width: dimensionsInStatic[0],
                left: rect.left + Element.scrollWidth(),
                top: rect.top + Element.scrollHeight()
            };

            style.position = oldPosition;
            style.width = oldWidth;

            return this._dims;
        },

        /**
         * Set style.height and style.width, but not if options.inlineDimensions === false
         *
         * @method _inlineDimensions
         * @private
         */
        _inlineDimensions: function (height, width) {
            if (this._options.inlineDimensions) {
                this._rootElement.style.height = height;
                this._rootElement.style.width = width;
            }
        },

        /**
         * Get the distance between the bottom of the element and the bottom of the page
         *
         * @method _getBottomOffset
         * @private
         */
        _getBottomOffset: function () {
            var bottom = this._options.offsetBottom;
            if (this._options.bottomElement) {
                bottom += Element.pageHeight() -
                    Element.offsetTop(this._options.bottomElement);
            }
            return bottom;
        }
    };

    return Sticky;

});

/**
 * @module Ink.UI.Swipe
 * @author ink AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Swipe', '1', ['Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.UI.Common_1'], function(InkEvent, InkElement, Common) {
    'use strict';

    /**
     * Subscribe swipe gestures!
     *
     * Supports filtering swipes be any combination of the criteria supported in the options.
     *
     * @class Ink.UI.Swipe
     * @constructor
     * @param {String|DOMElement} el
     * @param {Object}   options
     *     @param {Function} [options.onEnd]       callback function for the `touchend` event. Gets all the gesture information, and is filtered by min/max Dist and Duration options (see below)
     *     @param {Function} [options.onStart]     callback function for `touchstart` event
     *     @param {Function} [options.onMove]      callback function for every `touchmove` event. Gets current gesture information.
     *     @param {Number}   [options.minDist]     minimum allowed distance, in pixels
     *     @param {Number}   [options.maxDist]     maximum allowed distance, in pixels
     *     @param {Number}   [options.minDuration] minimum allowed duration, in seconds
     *     @param {Number}   [options.maxDuration] maximum allowed duration, in seconds
     *     @param {String}   [options.axis]        if either 'x' or 'y' is passed, only swipes where the dominant axis is the given one trigger the callback
     *     @param {String}   [options.storeGesture=false] store gesture information and provide to the callback
     *     @param {String}   [options.stopEvents=true] stop (default and propagation) of the received events
     * 
     * -----
     *
     * Arguments received by the callbacks
     * -----------------------------------
     *
     * `onStart`, `onMove`, and `onEnd` receive as argument an object containing:
     *
     *   - `event`: the DOMEvent object
     *   - `element`: the target element
     *   - `Instance`: the `Ink.UI.Swipe_1` instance
     *   - `position`: `Array` with `[x, y]` coordinates of current position
     *   - `dt`: Time passed between now and the first event (onMove only)
     *   - `gesture`: an Array containing [x,y] coordinates of every touchmove event received (storeGesture only) (onEnd only)
     *   - `time`: an Array containing all the `dt` values for every touchmove event (onEnd only)
     *   - `overallMovement`: X and Y distance traveled by the touch movement (`[x, y]`) (onEnd only)
     *   - `overallTime`: total time passed (onEnd only)
     *
     */
    function Swipe(el, options) {
        el = Common.elOrSelector(el, 'Swipe target');

        this._options = Ink.extendObj({
            onEnd:          undefined,
            onStart:        undefined,
            onMove:         undefined,
            minDist:        undefined,      // in pixels
            maxDist:        undefined,
            minDuration:    undefined,      // in seconds
            maxDuration:    undefined,
            axis:           undefined,       // x | y
            storeGesture:   false,
            stopEvents:     true
        }, InkElement.data(el), options || {});

        if (typeof options === 'function') {
            this._options.onEnd = options;
        }

        this._handlers = {
            down: Ink.bindEvent(this._onDown, this),
            move: Ink.bindEvent(this._onMove, this),
            up:   Ink.bindEvent(this._onUp, this)
        };

        this._element = el;

        this._init();
    }

    Swipe.prototype = {

        version: '0.1',

        _supported: ('ontouchstart' in document.documentElement),

        _init: function() {
            var db = document.body;
            InkEvent.observe(db, 'touchstart', this._handlers.down);
            if (this._options.storeGesture || this._options.onMove) {
                InkEvent.observe(db, 'touchmove', this._handlers.move);
            }
            InkEvent.observe(db, 'touchend', this._handlers.up);
            this._isOn = false;
        },

        _isMeOrParent: function(el, parentEl) {
            if (!el) {return;}
            do {
                if (el === parentEl) { return true; }
                el = el.parentNode;
            } while (el);
            return false;
        },

        _pushGesture: function (coords, dt) {
            if (this._options.storeGesture) {
                this._gesture.push(coords);
                this._time.push(dt);
            }
        },

        _onDown: function(event) {
            if (event.changedTouches.length !== 1) { return; }
            if (!this._isMeOrParent(event.target, this._element)) { return; }

            if( this._options.stopEvents === true ){
                InkEvent.stop(event);
            }
            event = event.changedTouches[0];
            this._isOn = true;
            this._target = event.target;

            this._t0 = +new Date();
            this._p0 = [event.pageX, event.pageY];

            if (this._options.storeGesture) {
                this._gesture = [];
                this._time    = [];
            }

            this._pushGesture(this._p0, 0);

            if (this._options.onStart) {
                this._options.onStart({
                    event: event,
                    element: this._element,
                    instance: this,
                    position: this._p0,
                    dt: 0
                });
            }
        },

        _onMove: function(event) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }
            if( this._options.stopEvents === true ) {
                InkEvent.stop(event);
            }

            event = event.changedTouches[0];
            var t1 = +new Date();
            var dt = (t1 - this._t0);

            var gesture = [event.pageX, event.pageY];

            this._pushGesture(gesture, dt);

            if (this._options.onMove) {
                this._options.onMove({
                    event: event,
                    element: this._element,
                    instance: this,
                    position: gesture,
                    dt: dt
                });
            }
        },

        _onUp: function(event) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }

            if( this._options.stopEvents === true ){
                InkEvent.stop(event);
            }
            event = event.changedTouches[0];   // TODO SHOULD CHECK IT IS THE SAME TOUCH
            this._isOn = false;

            var t1 = +new Date();
            var p1 = [event.pageX, event.pageY];
            var dt = (t1 - this._t0);
            var dr = [
                p1[0] - this._p0[0],
                p1[1] - this._p0[1]
            ];
            var dist = Math.sqrt(dr[0]*dr[0] + dr[1]*dr[1]);
            var axis = Math.abs(dr[0]) > Math.abs(dr[1]) ? 'x' : 'y';

            var o = this._options;
            if (o.minDist     && dist <   o.minDist) {     return; }
            if (o.maxDist     && dist >   o.maxDist) {     return; }
            if (o.minDuration && dt   <   o.minDuration) { return; }
            if (o.maxDuration && dt   >   o.maxDuration) { return; }
            if (o.axis        && axis !== o.axis)    {     return; }

            if (this._options.onEnd) {
                this._options.onEnd({
                    event: event,
                    element: this._element,
                    instance: this,
                    gesture: this._gesture,
                    time: this._time,
                    axis: axis,
                    overallMovement: dr,
                    overallTime: dt
                });
            }
        }
    };

    return Swipe;
});

/**
 * @module Ink.UI.Table_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Table', '1', ['Ink.Util.Url_1','Ink.UI.Pagination_1','Ink.Net.Ajax_1','Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.String_1', 'Ink.Util.Json_1'], function(InkUrl,Pagination, Ajax, Common, Event, Css, Element, Selector, InkArray, InkString, Json) {
    'use strict';

    var rNumber = /\d/g;
    // Turn into a number, if we can. For sorting data which could be numeric or not.
    function maybeTurnIntoNumber(value) {
        if( !isNaN(value) && rNumber.test(value) ){
            return parseInt(value, 10);
        } else if( !isNaN(value) ){
            return parseFloat(value);
        }
        return value;
    }
    function cmp (a, b) {
        if( a === b ){
            return 0;
        }
        return ( ( a > b ) ? 1 : -1 );
    }
    // cmp function for comparing data which might be a number.
    function numberishEnabledCmp (a, b) {
        var aValue = maybeTurnIntoNumber(Element.textContent(a));
        var bValue = maybeTurnIntoNumber(Element.textContent(b));

        return cmp(aValue, bValue);
    }
    // Object.keys polyfill
    function keys(obj) {
        if (typeof Object.keys !== 'undefined') {
            return Object.keys(obj);
        }
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    }

    // Most processJSON* functions can just default to this.
    function sameSame(obj) { return obj; }
    /**
     * The Table component transforms the native/DOM table element into a
     * sortable, paginated component.
     * 
     * @class Ink.UI.Table
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Number}    [options.pageSize]
     *      Number of rows per page. Omit to avoid paginating.
     *
     *     @param {String}    [options.endpoint]
     *      Endpoint to get the records via AJAX. Omit if you don't want to do AJAX
     *
     *     @param {Function}  [options.createEndpointUrl]
     *      Callback to customise what URL the AJAX endpoint is at. Receives three
     *      arguments: base (the "endpoint" option), sort (`{ order: 'asc' or 'desc', field: fieldname }`)
     *      and page ({ page: page number, size: items per page })
     *
     *     @param {Function}  [options.getDataFromEndPoint]
     *      Callback to allow the user to retrieve the data himself given an URL.
     *      Must accept two arguments: `url` and `callback`. This `callback` will
     *      take as a single argument a JavaScript object.
     *
     *     @param {Function}  [options.processJSONRows]
     *      Retrieve an array of rows from the data which came from AJAX.
     *
     *     @param {Function}  [options.processJSONHeaders]
     *      Get an object with all the headers' names as keys, and a { label, sortable }
     *      object as value.
     *      Example: `{col1: {label: "Column 1"}, col2: {label: "Column 2", sortable: true}`.
     *      Takes a single argument, the JSON response.
     *
     *     @param {Function}  [options.processJSONRow]
     *      Process a row object before it gets on the table.
     *
     *     @param {Function}  [options.processJSONField]
     *      Process the field data before putting it on the table.
     *      You can return HTML, a DOM element, or a string here.
     *      Arguments you receive: `(column, fieldData, rowIndex)`.
     *
     *          @param {Function}  [options.processJSONField.(field_name)]
     *           The same as processJSONField, but for a particular field.
     *
     *     @param {Function}  [options.processJSONTotalRows]
     *      A callback where you have a chance to say how many rows
     *      are in the dataset (not only on this page) you have on the
     *      collection. You get as an argument the JSON response.
     *
     *     @param {Function}  [options.getSortKey=null]
     *      A function taking a `{ columnIndex, columnName, data, element }`
     *      object and returning a value which serves as a sort key for the
     *      sorting operation. For example, if you want to sort by a
     *      `data-sort-key` atribute, set `getSortKey` to:
     *
     *          function (cell) {
     *              return cell.element.getAttribute('data-sort-key');
     *          }
     *
     *          @param {Function} [options.getSortKey.(field_name)]
     *           Same as `options.getSortKey`, but for a particular field.
     *
     *     @param {Object}    [options.tdClassNames]
     *      An object mapping each field to what classes it gets.
     *      Example: `{ name: "large-10", isBoss: "hide-small" }`
     *
     *     @param {String|DomElement|Ink.UI.Pagination} [options.pagination]
     *      Pagination instance or element.
     *
     *     @param {Object}    [options.paginationOptions]
     *      Override the options with which we instantiate the Ink.UI.Pagination.
     *
     *     @param {Boolean}   [options.allowResetSorting]
     *      Allow sort order to be set to "none" in addition to "ascending" and "descending"
     *
     *     @param {String|Array} [options.visibleFields]
     *      Set of fields which get shown on the table
     * @example
     *      <table class="ink-table alternating" data-page-size="6">
     *          <thead>
     *              <tr>
     *                  <th data-sortable="true" width="75%">Pepper</th>
     *                  <th data-sortable="true" width="25%">Scoville Rating</th>
     *              </tr>
     *          </thead>
     *          <tbody>
     *              <tr>
     *                  <td>Trinidad Moruga Scorpion</td>
     *                  <td>1500000</td>
     *              </tr>
     *              <tr>
     *                  <td>Bhut Jolokia</td>
     *                  <td>1000000</td>
     *              </tr>
     *              <tr>
     *                  <td>Naga Viper</td>
     *                  <td>1463700</td>
     *              </tr>
     *              <tr>
     *                  <td>Red Savina Habanero</td>
     *                  <td>580000</td>
     *              </tr>
     *              <tr>
     *                  <td>Habanero</td>
     *                  <td>350000</td>
     *              </tr>
     *              <tr>
     *                  <td>Scotch Bonnet</td>
     *                  <td>180000</td>
     *              </tr>
     *              <tr>
     *                  <td>Malagueta</td>
     *                  <td>50000</td>
     *              </tr>
     *              <tr>
     *                  <td>Tabasco</td>
     *                  <td>35000</td>
     *              </tr>
     *              <tr>
     *                  <td>Serrano Chili</td>
     *                  <td>27000</td>
     *              </tr>
     *              <tr>
     *                  <td>Jalapeño</td>
     *                  <td>8000</td>
     *              </tr>
     *              <tr>
     *                  <td>Poblano</td>
     *                  <td>1500</td>
     *              </tr>
     *              <tr>
     *                  <td>Peperoncino</td>
     *                  <td>500</td>
     *              </tr>
     *          </tbody>
     *      </table>
     *      <nav class="ink-navigation"><ul class="pagination"></ul></nav>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Table_1'], function( Selector, Table ){
     *              var tableElement = Ink.s('.ink-table');
     *              var tableObj = new Table( tableElement );
     *          });
     *      </script>
     */
    var Table = function( selector, options ){

        /**
         * Get the root element
         */
        this._rootElement = Common.elOrSelector(selector, 'Ink.UI.Table :');

        if( this._rootElement.nodeName.toLowerCase() !== 'table' ){
            throw new Error('[Ink.UI.Table] :: The element is not a table');
        }

        this._options = Common.options({
            pageSize: ['Integer', null],
            endpoint: ['String', null],
            createEndpointUrl: ['Function', null /* default func uses above option */],
            getDataFromEndPoint: ['Function', null /* by default use plain ajax for JSON */],
            processJSONRows: ['Function', sameSame],
            processJSONRow: ['Function', sameSame],
            processJSONField: ['Function', sameSame],
            processJSONHeaders: ['Function', function (dt) { return dt.fields; }],
            processJSONTotalRows: ['Function', function (dt) { return dt.length || dt.totalRows; }],
            getSortKey: ['Function', null],
            pagination: ['Element', null],
            allowResetSorting: ['Boolean', false],
            visibleFields: ['String', null],
            tdClassNames: ['Object', {}],
            paginationOptions: ['Object', null]
        }, options || {}, this._rootElement);

        /**
         * Checking if it's in markup mode or endpoint mode
         */
        this._markupMode = !this._options.endpoint;

        if( this._options.visibleFields ){
            this._options.visibleFields = this._options.visibleFields.toString().split(/[, ]+/g);
        }

        this._thead = this._rootElement.tHead || this._rootElement.createTHead();
        this._headers = Selector.select('th', this._thead);

        /**
         * Initializing variables
         */
        this._handlers = {
            thClick: null
        };
        this._originalFields = [
            // field headers from the DOM
        ];
        this._sortableFields = {
            // Identifies which columns are sorted and how.
            // columnIndex: 'none'|'asc'|'desc'
        };
        this._originalData = this._data = [];
        this._pagination = null;
        this._totalRows = 0;

        this._handlers.thClick = Event.observeDelegated(this._rootElement, 'click',
                'thead th[data-sortable="true"]',
                Ink.bindMethod(this, '_onThClick'));

        this._init();
    };

    Table.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            /**
             * If not is in markup mode, we have to do the initial request
             * to get the first data and the headers
             */
             if( !this._markupMode ) {
                 /* Endpoint mode */
                this._getData(  );
             } else /* Markup mode */ {
                this._resetSortOrder();
                this._addHeadersClasses();

                /**
                 * Getting the table's data
                 */
                this._data = Selector.select('tbody tr', this._rootElement);
                this._originalData = this._data.slice(0);

                this._totalRows = this._data.length;

                /**
                 * Set pagination if options tell us to
                 */
                this._setPagination();
             }
        },

        /**
         * Add the classes in this._options.tdClassNames to our table headers.
         * @method _addHeadersClasses
         * @private
         */
        _addHeadersClasses: function () {
            var headerLabel;
            var classNames;
            for (var i = 0, len = this._headers.length; i < len; i++) {
                headerLabel = Element.textContent(this._headers[i]);
                classNames = this._options.tdClassNames[headerLabel];
                // TODO do not find header labels this way. But how?
                if (classNames) {
                    Css.addClassName(this._headers[i], classNames);
                }
            }
        },

        /**
         * Click handler. This will mainly handle the sorting (when you click in the headers)
         * 
         * @method _onThClick
         * @param {Event} event Event obj
         * @private
         */
        _onThClick: function( event ){
            var tgtEl = Event.element(event),
                paginated = this._options.pageSize !== undefined;

            Event.stop(event);

            var index = InkArray.keyValue(tgtEl, this._headers, true);
            var sortable = index !== false && this._sortableFields[index] !== undefined;

            if( !sortable ){
                return;
            }

            if( !this._markupMode && paginated ){
                this._invertSortOrder(index, false);
            } else {
                if ( (this._sortableFields[index] === 'desc') && this._options.allowResetSorting ) {
                    this._setSortOrderOfColumn(index, null);
                    this._data = this._originalData.slice(0);
                } else {
                    this._invertSortOrder(index, true);
                }

                var tbody = Selector.select('tbody',this._rootElement)[0];
                Common.cleanChildren(tbody);
                InkArray.each(this._data, Ink.bindMethod(tbody, 'appendChild'));

                if (this._pagination) {
                    this._pagination.setCurrent(0);
                    this._paginate(1);
                }
            }
        },

        _invertSortOrder: function (index, sortAndReverse) {
            var isAscending = this._sortableFields[index] === 'asc';

            for (var i = 0, len = this._headers.length; i < len; i++) {
                this._setSortOrderOfColumn(i, null);
            }

            if (sortAndReverse) {
                this._sort(index);
                if (isAscending) {
                    this._data.reverse();
                }
            }

            this._setSortOrderOfColumn(index, !isAscending);
        },

        _setSortOrderOfColumn: function(index, up) {
            var header = this._headers[index];
            var caretHtml = '';
            var order = 'none';

            if (up === true) {
                caretHtml = '<i class="icon-caret-up"></i>';
                order = 'asc';
            } else if (up === false) {
                caretHtml = '<i class="icon-caret-down"></i>';
                order = 'desc';
            }

            this._sortableFields[index] = order;
            header.innerHTML = Element.textContent(header) + caretHtml;
        },

        /**
         * Applies and/or changes the CSS classes in order to show the right columns
         * 
         * @method _paginate
         * @param {Number} page Current page
         * @private
         */
        _paginate: function( page ){
            if (!this._pagination) { return; }

            var pageSize = this._options.pageSize;

            // Hide everything except the items between these indices
            var firstIndex = (page - 1) * pageSize;
            var lastIndex = firstIndex + pageSize;

            InkArray.each(this._data, function(item, index){
                if (index >= firstIndex && index < lastIndex) {
                    Css.removeClassName(item,'hide-all');
                } else {
                    Css.addClassName(item,'hide-all');
                }
            });

        },

        /* register fields into this._originalFields, whether they come from JSON or a table.
         * @method _registerFieldNames
         * @private
         * @param [names] The field names in an array
         **/
        _registerFieldNames: function (names) {
            this._originalFields = [];

            InkArray.forEach(names, Ink.bind(function (field) {
                if( !this._fieldIsVisible(field) ){
                    return;  // The user deems this not to be necessary to see.
                }
                this._originalFields.push(field);
            }, this));
        },

        _fieldIsVisible: function (field) {
            return !this._options.visibleFields ||
                (this._options.visibleFields.indexOf(field) !== -1);
        },

        /**
         * Sorts by a specific column.
         * 
         * @method _sort
         * @param {Number} index Column number (starting at 0)
         * @private
         */
        _sort: function( index ){
            // TODO this is THE worst way to declare field names. Incompatible with i18n and a lot of other things.
            var fieldName = Element.textContent(this._headers[index]);
            var keyFunction = this._options.getSortKey;

            if (keyFunction) {
                keyFunction =
                    typeof keyFunction[fieldName] === 'function' ?
                        keyFunction[fieldName] :
                    typeof keyFunction === 'function' ?
                        keyFunction :
                        null;
            }

            var self = this;

            this._data.sort(function (trA, trB) {
                var elementA = Ink.ss('td', trA)[index];
                var elementB = Ink.ss('td', trB)[index];
                if (keyFunction) {
                    return cmp(userKey(elementA), userKey(elementB));
                } else {
                    return numberishEnabledCmp(elementA, elementB, index);
                }
            });

            function userKey(element) {
                return keyFunction.call(self, {
                    columnIndex: index,
                    columnName: fieldName,
                    data: Element.textContent(element),
                    element: element
                });
            }
        },

        /**
         * Assembles the headers markup
         *
         * @method _createHeadersFromJson
         * @param  {Object} headers Key-value object that contains the fields as keys, their configuration (label and sorting ability) as value
         * @private
         */
        _createHeadersFromJson: function( headers ){
            this._registerFieldNames(keys(headers));

            if (this._thead.children.length) { return; }

            var tr = this._thead.insertRow(0);
            var th;

            for (var i = 0, len = headers.length; i < len; i++) {
                if (this._fieldIsVisible(headers[i])) {
                    th = Element.create('th');
                    th = this._createSingleHeaderFromJson(headers[i], th);
                    tr.appendChild(th);
                    this._headers.push(th);
                }
            }
        },

        _createSingleHeaderFromJson: function (header, th) {
            if (header.sortable) {
                th.setAttribute('data-sortable','true');
            }

            if (header.label){
                Element.setTextContent(th, header.label);
            }

            return th;
        },

        /**
         * Reset the sort order as marked on the table headers to "none"
         *
         * @method _resetSortOrder
         * @private
         */
        _resetSortOrder: function(){
            /**
             * Setting the sortable columns and its event listeners
             */
            for (var i = 0, len = this._headers.length; i < len; i++) {
                var dataset = Element.data( this._headers[i] );
                if (dataset.sortable && dataset.sortable.toString() === 'true') {
                    this._sortableFields[i] = 'none';
                }
            }
        },

        /**
         * This method gets the rows from AJAX and places them as <tr> and <td>
         *
         * @method _createRowsFromJSON
         * @param  {Object} rows Array of objects with the data to be showed
         * @private
         */
        _createRowsFromJSON: function( rows ){
            var tbody = Selector.select('tbody',this._rootElement)[0];

            if( !tbody ){
                tbody = document.createElement('tbody');
                this._rootElement.appendChild( tbody );
            } else {
                Element.setHTML(tbody, '');
            }

            this._data = [];
            var row;

            for (var trIndex in rows) {
                if (rows.hasOwnProperty(trIndex)) {
                    row = this._options.processJSONRow(rows[trIndex]);
                    this._createSingleRowFromJson(tbody, row, trIndex);
                }
            }

            this._originalData = this._data.slice(0);
        },

        _createSingleRowFromJson: function (tbody, row, rowIndex) {
            var tr = document.createElement('tr');
            tbody.appendChild( tr );
            for( var field in row ){
                if (row.hasOwnProperty(field)) {
                    this._createFieldFromJson(tr, row[field], field, rowIndex);
                }
            }
            this._data.push(tr);
        },

        _createFieldFromJson: function (tr, fieldData, fieldName, rowIndex) {
            if (!this._fieldIsVisible(fieldName)) { return; }

            var processor =
                this._options.processJSONField[fieldName] ||  // per-field callback
                this._options.processJSONField;  // generic callback

            var result;
            if (typeof processor === 'function') {
                result = processor(fieldData, fieldName, rowIndex);
            } else {
                result = fieldData;
            }
            var elm = this._elOrFieldData(result);

            var className = this._options.tdClassNames[fieldName];
            if (className) {
                Css.addClassName(elm, className);
            }

            tr.appendChild(elm);
        },

        _elOrFieldData: function (processed) {
            if (Common.isDOMElement(processed)) {
                return processed;
            }

            var isString = typeof processed === 'string';
            var isNumber = typeof processed === 'number';
            var elm = Element.create('td');

            if (isString && /^\s*?</.test(processed)) {
                Element.setHTML(elm, processed);
            } else if (isString || isNumber) {
                Element.setTextContent(elm, processed);
            } else {
                throw new Error('Ink.UI.Table Unknown result from processJSONField: ' + processed);
            }

            return elm;
        },

        /**
         * Sets the endpoint. Useful for changing the endpoint in runtime.
         *
         * @method _setEndpoint
         * @param {String} endpoint New endpoint
         */
        setEndpoint: function( endpoint, currentPage ){
            if( !this._markupMode ){
                this._options.endpoint = endpoint;
                if (this._pagination) {
                    this._pagination.setCurrent((!!currentPage) ? parseInt(currentPage,10) : 0 );
                }
            }
        },

        /**
         * Sets the instance's pagination, if necessary.
         *
         * Precondition: this._totalRows needs to be known.
         *
         * @method _setPagination
         * @private
         */
        _setPagination: function(){
            /* If user doesn't say they want pagination, bail. */
            if( this._options.pageSize == null ){ return; }

            /**
             * Fetch pagination from options. Can be a selector string, an element or a Pagination instance.
             */
            var paginationEl = this._options.pagination;

            if ( paginationEl instanceof Pagination ) {
                this._pagination = paginationEl;
                return;
            }

            if (!paginationEl) {
                paginationEl = Element.create('nav', {
                    className: 'ink-navigation',
                    insertAfter: this._rootElement
                });
                Element.create('ul', {
                    className: 'pagination',
                    insertBottom: paginationEl
                });
            }

            var paginationOptions = Ink.extendObj({
                totalItemCount: this._totalRows,
                itemsPerPage: this._options.pageSize,
                onChange: Ink.bind(function (_, pageNo) {
                    this._paginate(pageNo + 1);
                }, this)
            }, this._options.paginationOptions || {});

            this._pagination = new Pagination(paginationEl, paginationOptions);

            this._paginate(1);
        },

        /**
         * Method to choose which is the best way to get the data based on the endpoint:
         *     - AJAX
         *     - JSONP
         *
         * @method _getData
         * @private
         */
        _getData: function( ){
            var sortOrder = this._getSortOrder() || null;
            var page = null;

            if (this._pagination) {
                page = {
                    size: this._options.pageSize,
                    page: this._pagination.getCurrent() + 1
                };
            }

            this._getDataViaAjax( this._getUrl( sortOrder, page) );
        },

        /**
         * Return an object describing sort order { field: [field name] ,
         * order: ["asc" or "desc"] }, or null if there is no sorting
         * going on.
         * @method _getSortOrder
         * @private
         */
        _getSortOrder: function () {
            var index;
            for (index in this._sortableFields) if (this._sortableFields.hasOwnProperty(index)) {
                if( this._sortableFields[index] !== 'none' ){
                    break;
                }
            }
            if (!index) {
                return null; // no sorting going on
            }
            return {
                field: this._originalFields[index],
                order: this._sortableFields[index]
            };
        },

        _getUrl: function (sort, page) {
            var urlCreator = this._options.createEndpointUrl ||
                function (endpoint, sort, page
                        /* TODO implement filters too */) {
                    endpoint = InkUrl.parseUrl(endpoint);
                    endpoint.query = endpoint.query || {};

                    if (sort) {
                        endpoint.query.sortOrder = sort.order;
                        endpoint.query.sortField = sort.field;
                    }

                    if (page) {
                        endpoint.query['rows_per_page'] = page.size;
                        endpoint.query['page'] = page.page;
                    }

                    return InkUrl.format(endpoint);
                };

            var ret = urlCreator(this._options.endpoint, sort, page);

            if (typeof ret !== 'string') {
                throw new TypeError('Ink.UI.Table_1: ' +
                    'createEndpointUrl did not return a string!');
            }

            return ret;
        },

        /**
         * Gets the data via AJAX and calls this._onAjaxSuccess with the response.
         * 
         * Will call options.getDataFromEndpoint( Uri, callback ) if available.
         *
         * @param  endpointUri Endpoint to get data from, after processing.
         */
        _getDataViaAjax: function( endpointUri ){
            var success = Ink.bind(function( JSONData ){
                this._onAjaxSuccess( JSONData );
            }, this);

            if (!this._options.getDataFromEndpoint) {
                new Ajax( endpointUri, {
                    method: 'GET',
                    contentType: 'application/json',
                    sanitizeJSON: true,
                    onSuccess: Ink.bind(function( response ){
                        if( response.status === 200 ){
                            success(Json.parse(response.responseText));
                        }
                    }, this)
                });
            } else {
                this._options.getDataFromEndpoint( endpointUri, success );
            }
        },

        _onAjaxSuccess: function (jsonResponse) {
            var paginated = this._options.pageSize != null;
            var rows = this._options.processJSONRows(jsonResponse);
            this._headers = Selector.select('th', this._thead);

            // If headers not in DOM, get from JSON
            if( this._headers.length === 0 ) {
                var headers = this._options.processJSONHeaders(
                    jsonResponse);
                if (!headers || !headers.length || !headers[0]) {
                    throw new Error('Ink.UI.Table: processJSONHeaders option must return an array of objects!');
                }
                this._createHeadersFromJson( headers );
                this._resetSortOrder();
                this._addHeadersClasses();
            }

            this._createRowsFromJSON( rows );

            this._totalRows = this._rowLength = rows.length;

            if( paginated ){
                this._totalRows = this._options.processJSONTotalRows(jsonResponse);
                this._setPagination( );
            }
        }
    };

    return Table;

});

/**
 * @module Ink.UI.Tabs_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Tabs', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * Tabs component
     * 
     * @class Ink.UI.Tabs
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Boolean}      [options.preventUrlChange]        Flag that determines if follows the link on click or stops the event
     *     @param {String}       [options.active]                  ID of the tab to activate on creation
     *     @param {Array}        [options.disabled]                IDs of the tabs that will be disabled on creation
     *     @param {Function}     [options.onBeforeChange]          Callback to be executed before changing tabs
     *     @param {Function}     [options.onChange]                Callback to be executed after changing tabs
     *     @param {Boolean}      [options.triggerEventsOnLoad]     Trigger the above events when the page is loaded.
     * @example
     *      <div class="ink-tabs top"> <!-- replace 'top' with 'bottom', 'left' or 'right' to place navigation -->
     *          
     *          <!-- put navigation first if using top, left or right positioning -->
     *          <ul class="tabs-nav">
     *              <li><a href="#home">Home</a></li>
     *              <li><a href="#news">News</a></li>
     *              <li><a href="#description">Description</a></li>
     *              <li><a href="#stuff">Stuff</a></li>
     *              <li><a href="#more_stuff">More stuff</a></li>
     *          </ul>
     *          
     *          <!-- Put your content second if using top, left or right navigation -->
     *          <div id="home" class="tabs-content"><p>Content</p></div>
     *          <div id="news" class="tabs-content"><p>Content</p></div>
     *          <div id="description" class="tabs-content"><p>Content</p></div>
     *          <div id="stuff" class="tabs-content"><p>Content</p></div>
     *          <div id="more_stuff" class="tabs-content"><p>Content</p></div>
     *          <!-- If you're using bottom navigation, switch the nav block with the content blocks -->
     *       
     *      </div>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Tabs_1'], function( Selector, Tabs ){
     *              var tabsElement = Ink.s('.ink-tabs');
     *              var tabsObj = new Tabs( tabsElement );
     *          });
     *      </script>
     */
    var Tabs = function(selector, options) {
        this._element = Common.elOrSelector(selector, 'Ink.UI.Tabs tab container');

        this._options = Ink.extendObj({
            preventUrlChange: false,
            active: undefined,
            disabled: [],
            onBeforeChange: undefined,
            onChange: undefined,
            triggerEventsOnLoad: true
        }, options || {}, Element.data(this._element));

        this._handlers = {
            tabClicked: Ink.bindEvent(this._onTabClicked,this),
            disabledTabClicked: Ink.bindEvent(this._onDisabledTabClicked,this),
            resize: Ink.bindEvent(Event.throttle(this._onResize, 100),this)
        };

        this._init();
    };

    Tabs.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._menu = Selector.select('.tabs-nav', this._element)[0];
            this._menuTabs = this._menu.children;
            this._contentTabs = Selector.select('.tabs-content', this._element);

            //initialization of the tabs, hides all content before setting the active tab
            this._initializeDom();

            // subscribe events
            this._observe();

            //sets the first active tab
            this._setFirstActive();

            this._handlers.resize();

            Common.registerInstance(this, this._element, 'tabs');
        },

        /**
         * Initialization of the tabs, hides all content before setting the active tab
         * 
         * @method _initializeDom
         * @private
         */
        _initializeDom: function(){
            for(var i = 0; i < this._contentTabs.length; i++){
                Css.addClassName(this._contentTabs[i], 'hide-all');
            }
        },

        /**
         * Subscribe events
         * 
         * @method _observe
         * @private
         */
        _observe: function() {
            InkArray.each(this._menuTabs,Ink.bind(function(elem){
                var link = Selector.select('a', elem)[0];
                if(InkArray.inArray(link.getAttribute('href'), this._options.disabled)){
                    this.disable(link);
                } else {
                    this.enable(link);
                }
            },this));

            Event.observe(window, 'resize', this._handlers.resize);
        },

        /**
         * Run at instantiation, to determine which is the first active tab
         * fallsback from window.location.href to options.active to the first not disabled tab
         * 
         * @method _setFirstActive
         * @private
         */
        _setFirstActive: function() {
            var hash = window.location.hash;

            var activeMenuLink = this._findLinkByHref(hash) ||
                                 (this._options.active && this._findLinkByHref(this._options.active)) ||
                                 Selector.select('a', this._menu)[0];

            this._changeTab(activeMenuLink, this._options.triggerEventsOnLoad);
        },

        /**
         * Changes to the desired tab
         * 
         * @method _changeTab
         * @param {DOMElement} link             anchor linking to the content container
         * @param {boolean}    runCallbacks     defines if the callbacks should be run or not
         * @private
         */
        _changeTab: function(link, runCallbacks){
            if(runCallbacks && typeof this._options.onBeforeChange !== 'undefined'){
                this._options.onBeforeChange(this);
            }

            var selector = link.getAttribute('href');
            if (this._activeMenuTab) {
                Css.removeClassName(this._activeMenuTab, 'active');
                Css.removeClassName(this._activeContentTab, 'active');
                Css.addClassName(this._activeContentTab, 'hide-all');
            }

            this._activeMenuLink = link;
            this._activeMenuTab = this._activeMenuLink.parentNode;
            this._activeContentTab = Selector.select(selector.substr(selector.indexOf('#')), this._element)[0];

            if (!this._activeContentTab) {
                this._activeMenuLink = this._activeMenuTab = this._activeContentTab = null;
                return;
            }

            Css.addClassName(this._activeMenuTab, 'active');
            Css.addClassName(this._activeContentTab, 'active');
            Css.removeClassName(this._activeContentTab, 'hide-all');

            if(runCallbacks && typeof(this._options.onChange) !== 'undefined'){
                this._options.onChange(this);
            }
        },

        /**
         * Tab clicked handler
         * 
         * @method _onTabClicked
         * @param {Event} ev
         * @private
         */
        _onTabClicked: function(ev) {
            Event.stop(ev);

            var target = Event.findElement(ev, 'A');
            if(!target || target.nodeName.toLowerCase() !== 'a') {
                return;
            }

            var href = target.getAttribute('href').substr(target.getAttribute('href').indexOf('#'));

            if (!href || Ink.i(href.replace(/^#/, '')) === null) {
                return;
            }

            if (this._options.preventUrlChange.toString() !== 'true') {
                window.location.hash = href;
            }

            if (target === this._activeMenuLink) {
                return;
            }
            this.changeTab(target);
        },

        /**
         * Disabled tab clicked handler
         * 
         * @method _onDisabledTabClicked
         * @param {Event} ev
         * @private
         */
        _onDisabledTabClicked: function(ev) {
            Event.stop(ev);
        },

        /**
         * Resize handler
         * 
         * @method _onResize
         * @private
         */
        _onResize: function(){
            var currentLayout = Common.currentLayout();
            if(currentLayout === this._lastLayout){
                return;
            }

            if(currentLayout === Common.Layouts.SMALL || currentLayout === Common.Layouts.MEDIUM){
                Css.removeClassName(this._menu, 'menu');
                Css.removeClassName(this._menu, 'horizontal');
                // Css.addClassName(this._menu, 'pills');
            } else {
                Css.addClassName(this._menu, 'menu');
                Css.addClassName(this._menu, 'horizontal');
                // Css.removeClassName(this._menu, 'pills');
            }
            this._lastLayout = currentLayout;
        },

        /*****************
         * Aux Functions *
         *****************/

        /**
         * Allows the hash to be passed with or without the cardinal sign
         * 
         * @method _hashify
         * @param {String} hash     the string to be hashified
         * @return {String} Resulting hash
         * @private
         */
        _hashify: function(hash){
            if(!hash){
                return "";
            }
            return hash.indexOf('#') === 0? hash : '#' + hash;
        },

        /**
         * Returns the anchor with the desired href
         * 
         * @method _findLinkBuHref
         * @param {String} href     the href to be found on the returned link
         * @return {String|undefined} [description]
         * @private
         */
        _findLinkByHref: function(href){
            href = this._hashify(href);

            // Find a link which has a href ending with...
            return Selector.select('a[href$="' + href + '"]', this._menu)[0];
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Changes to the desired tag
         * 
         * @method changeTab
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
         * @public
         */
        changeTab: function(selector) {
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element || Css.hasClassName(element, 'ink-disabled')){
                return;
            }
            this._changeTab(element, true);
        },

        /**
         * Disables the desired tag
         * 
         * @method disable
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
         * @public
         */
        disable: function(selector){
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element){
                return;
            }
            Event.stopObserving(element, 'click', this._handlers.tabClicked);
            Event.observe(element, 'click', this._handlers.disabledTabClicked);
            Css.addClassName(element, 'ink-disabled');
        },

         /**
         * Enables the desired tag
         * 
         * @method enable
         * @param {String|DOMElement} selector      the id of the desired tab or the link that links to it
         * @public
         */
        enable: function(selector){
            var element = (selector.nodeType === 1)? selector : this._findLinkByHref(this._hashify(selector));
            if(!element){
                return;
            }
            Event.stopObserving(element, 'click', this._handlers.disabledTabClicked);
            Event.observe(element, 'click', this._handlers.tabClicked);
            Css.removeClassName(element, 'ink-disabled');
        },

        /***********
         * Getters *
         ***********/

        /**
         * Returns the active tab id
         * 
         * @method activeTab
         * @return {String} ID of the active tab.
         * @public
         */
        activeTab: function(){
            return this._activeContentTab.getAttribute('id');
        },

        /**
         * Returns the current active Menu LI
         * 
         * @method activeMenuTab
         * @return {DOMElement} Active menu LI.
         * @public
         */
        activeMenuTab: function(){
            return this._activeMenuTab;
        },

        /**
         * Returns the current active Menu anchorChanges to the desired tag
         * 
         * @method activeMenuLink
         * @return {DOMElement} Active menu link
         * @public
         */
        activeMenuLink: function(){
            return this._activeMenuLink;
        },

        /**
         * Returns the current active Content Tab
         * 
         * @method activeContentTab
         * @return {DOMElement} Active Content Tab
         * @public
         */
        activeContentTab: function(){
            return this._activeContentTab;
        },

        /**
         * Unregisters the component and removes its markup from the DOM
         * 
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    return Tabs;

});

/*
 * @module Ink.UI.TagField_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule("Ink.UI.TagField","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.Dom.Browser_1", "Ink.UI.Droppable_1", "Ink.Util.Array_1", "Ink.Dom.Selector_1", "Ink.UI.Common_1"],function( InkElement, InkEvent, Css, Browser, Droppable, InkArray, Selector, Common) {
    'use strict';

    var enterKey = 13;
    var backspaceKey = 8;
    var isTruthy = function (val) {return !!val;};

    /**
     * Use this class to have a field where a user can input several tags into a single text field. A good example is allowing the user to describe a blog post or a picture through tags, for later searching.
     *
     * The markup is as follows:
     *
     *           <input class="ink-tagfield" type="text" value="initial,value">
     *
     * By applying this UI class to the above input, you get a tag field with the tags "initial" and "value". The class preserves the original input element. It remains hidden and is updated with new tag information dynamically, so regular HTML form logic still applies.
     *
     * Below "input" refers to the current value of the input tag (updated as the user enters text, of course), and "output" refers to the value which this class writes back to said input tag.
     *
     * @class Ink.UI.TagField
     * @version 1
     * @constructor
     * @param {String|InputElement} element Selector or DOM Input Element.
     * @param {Object} [options]
     * @param {String|Array} [options.tags] initial tags in the input
     * @param {Boolean} [options.allowRepeated=true] allow user to input several tags
     * @param {RegExp} [options.separator=/[,;(space)]+/g] Split the input by this RegExp. The default splits by spaces, commas and semicolons
     * @param {String} [options.outSeparator=','] Use this string to separate each tag from the next in the output.
     * @param {Boolean} [options.autoSplit=true]
     * @param {Integer} [options.maxTags=-1] Maximum amount of tags the user can write.
     * @example
     */
    function TagField(element, options) {
        this.init(element, options);
    }

    TagField.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        init: function(element, options) {
            element = this._element = Common.elOrSelector(element, 'Ink.UI.TagField');
            var o = this._options = Common.options('Ink.UI.TagField', {
                tags: ['String', []],
                tagQuery: ['Object', null],
                tagQueryAsync: ['Object', null],
                allowRepeated: ['Boolean', false],
                maxTags: ['Integer', -1],
                outSeparator: ['String', ','],
                separator: ['String', /[,; ]+/g],
                autoSplit: ['Boolean', true]
            }, options || {}, this._element);

            if (typeof o.separator === 'string') {
                o.separator = new RegExp(o.separator, 'g');
            }

            if (typeof o.tags === 'string') {
                // coerce to array using the separator
                o.tags = this._readInput(o.tags);
            }

            Css.addClassName(this._element, 'hide-all');

            this._viewElm = InkElement.create('div', {
                className: 'ink-tagfield',
                insertAfter: this._element
            });

            this._input = InkElement.create('input', {
                type: 'text',
                className: 'new-tag-input',
                insertBottom: this._viewElm
            });

            var tags = [].concat(o.tags, this._tagsFromMarkup(this._element));

            this._tags = [];

            InkArray.each(tags, Ink.bindMethod(this, '_addTag'));

            InkEvent.observe(this._input, 'keyup', Ink.bindEvent(this._onKeyUp, this));
            InkEvent.observe(this._input, 'change', Ink.bindEvent(this._onKeyUp, this));
            InkEvent.observe(this._input, 'keydown', Ink.bindEvent(this._onKeyDown, this));
            InkEvent.observe(this._input, 'blur', Ink.bindEvent(this._onBlur, this));
            InkEvent.observe(this._viewElm, 'click', Ink.bindEvent(this._refocus, this));
        },

        destroy: function () {
            InkElement.remove(this._viewElm);
            Css.removeClassName(this._element, 'hide-all');
        },

        _tagsFromMarkup: function (element) {
            var tagname = element.tagName.toLowerCase();
            if (tagname === 'input') {
                return this._readInput(element.value);
            } else if (tagname === 'select') {
                return InkArray.map(element.getElementsByTagName('option'), function (option) {
                    return InkElement.textContent(option);
                });
            } else {
                throw new Error('Cannot read tags from a ' + tagname + ' tag. Unknown tag');
            }
        },

        _tagsToMarkup: function (tags, element) {
            var tagname = element.tagName.toLowerCase();
            if (tagname === 'input') {
                if (this._options.separator) {
                    element.value = tags.join(this._options.outSeparator);
                }
            } else if (tagname === 'select') {
                element.innerHTML = '';
                InkArray.each(tags, function (tag) {
                    var opt = InkElement.create('option', {selected: 'selected'});
                    InkElement.setTextContent(opt, tag);
                    element.appendChild(opt);
                });
            } else {
                throw new Error('TagField: Cannot read tags from a ' + tagname + ' tag. Unknown tag');
            }
        },

        _addTag: function (tag) {
            if (this._options.maxTags !== -1 &&
                    this._tags.length >= this._options.maxTags) {
                return;
            }
            if ((!this._options.allowRepeated &&
                    InkArray.inArray(tag, this._tags, tag)) || !tag) {
                return false;
            }
            var elm = InkElement.create('span', {
                className: 'ink-tag',
                setTextContent: tag + ' '
            });

            var remove = InkElement.create('span', {
                className: 'remove icon icon-remove icon-times',  // fontawesome 3 changed icon-remove's name to icon-times
                insertBottom: elm
            });
            InkEvent.observe(remove, 'click', Ink.bindEvent(this._removeTag, this, null));

            var spc = document.createTextNode(' ');

            this._tags.push(tag);
            this._viewElm.insertBefore(elm, this._input);
            this._viewElm.insertBefore(spc, this._input);
            this._tagsToMarkup(this._tags, this._element);
        },

        _readInput: function (text) {
            if (this._options.separator) {
                return InkArray.filter(text.split(this._options.separator), isTruthy);
            } else {
                return [text];
            }
        },

        _onKeyUp: function () {  // TODO control input box size
            if (!this._options.autoSplit) {
                return;
            }
            var split = this._input.value.split(this._options.separator);
            if (split.length <= 1) {
                return;
            }
            var last = split[split.length - 1];
            split = split.splice(0, split.length - 1);
            split = InkArray.filter(split, isTruthy);
            
            InkArray.each(split, Ink.bind(this._addTag, this));
            this._input.value = last;
        },

        _onKeyDown: function (event) {
            if (event.which === enterKey) {
                return this._onEnterKeyDown(event);
            } else if (event.which === backspaceKey) {
                return this._onBackspaceKeyDown();
            } else if (this._removeConfirm) {
                // user pressed another key, cancel removal from a backspace key
                this._unsetRemovingVisual(this._tags.length - 1);
            }
        },

        /**
         * When the user presses backspace twice on the empty input, we delete the last tag on the field.
         * @method onBackspaceKeyDown
         * @private
         */
        _onBackspaceKeyDown: function () {
            if (this._input.value) { return; }

            if (this._removeConfirm) {
                this._unsetRemovingVisual(this._tags.length - 1);
                this._removeTag(this._tags.length - 1);
                this._removeConfirm = null;
            } else {
                this._setRemovingVisual(this._tags.length - 1);
            }
        },

        _onEnterKeyDown: function (event) {
            var tag = this._input.value;
            if (tag) {
                this._addTag(tag);
                this._input.value = '';
            }
            InkEvent.stopDefault(event);
        },

        _onBlur: function () {
            this._addTag(this._input.value);
            this._input.value = '';
        },

        /* For when the user presses backspace.
         * Set the style of the tag so that it seems like it's going to be removed
         * if they press backspace again. */
        _setRemovingVisual: function (tagIndex) {
            var elm = this._viewElm.children[tagIndex];
            Css.addClassName(elm, 'tag-deleting');

            this._removeRemovingVisualTimeout = setTimeout(Ink.bindMethod(this, '_unsetRemovingVisual', tagIndex), 4000);
            InkEvent.observe(this._input, 'blur', Ink.bindMethod(this, '_unsetRemovingVisual', tagIndex));
            this._removeConfirm = true;
        },
        _unsetRemovingVisual: function (tagIndex) {
            var elm = this._viewElm.children[tagIndex];
            if (elm) {
                Css.removeClassName(elm, 'tag-deleting');
                clearTimeout(this._removeRemovingVisualTimeout);
            }
            this._removeConfirm = null;
        },

        _removeTag: function (event) {
            var index;
            if (typeof event === 'object') {  // click event on close button
                var elm = InkEvent.element(event).parentNode;
                index = InkElement.parentIndexOf(this._viewElm, elm);
            } else if (typeof event === 'number') {  // manual removal
                index = event;
            }
            this._tags = InkArray.remove(this._tags, index, 1);
            InkElement.remove(this._viewElm.children[index]);
            this._tagsToMarkup(this._tags, this._element);
        },

        _refocus: function (event) {
            this._input.focus();
            InkEvent.stop(event);
            return false;
        }
    };
    return TagField;
});

/**
 * @module Ink.UI.Toggle_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Toggle', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, InkEvent, Css, InkElement, Selector, InkArray ) {
    'use strict';

    /**
     * Toggle component
     * 
     * @class Ink.UI.Toggle
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {String}       options.target                    CSS Selector that specifies the elements that this component will toggle
     *     @param {String}       [options.classNameOn='show-all']  className when toggle is On
     *     @param {String}       [options.classNameOff='hide-all'] className when toggle is Off.
     *     @param {String}       [options.triggerEvent='click']    Event that will trigger the toggling.
     *     @param {Boolean}      [options.closeOnClick=true]       When this is on, if the user clicks outside of the toggled content, the target is toggled off.
     *     @param {Selector}     [options.closeOnInsideClick='a[href]'] Toggle off when an element matching this selector is clicked. Set to null to deactivate the check. Default: 'a[href]' (finds links)
     *     @param {Boolean}      [options.initialState=null]       Whether to start toggled off, on, or as found in the markup. (false: off, true: on, null: markup)
     *     @param {Function}     [options.onChangeState=null]      Callback to be called when the toggle state changes. Return `false` to cancel the event.
     *
     * @example
     *      <div class="ink-dropdown">
     *          <button class="ink-button toggle" data-target="#dropdown">Dropdown <span class="icon-caret-down"></span></button>
     *          <ul id="dropdown" class="dropdown-menu">
     *              <li class="heading">Heading</li>
     *              <li class="separator-above"><a href="#">Option</a></li>
     *              <li><a href="#">Option</a></li>
     *              <li class="separator-above disabled"><a href="#">Disabled option</a></li>
     *              <li class="submenu">
     *                  <a href="#" class="toggle" data-target="#submenu1">A longer option name</a>
     *                  <ul id="submenu1" class="dropdown-menu">
     *                      <li class="submenu">
     *                          <a href="#" class="toggle" data-target="#ultrasubmenu">Sub option</a>
     *                          <ul id="ultrasubmenu" class="dropdown-menu">
     *                              <li><a href="#">Sub option</a></li>
     *                              <li><a href="#" data-target="ultrasubmenu">Sub option</a></li>
     *                              <li><a href="#">Sub option</a></li>
     *                          </ul>
     *                      </li>
     *                      <li><a href="#">Sub option</a></li>
     *                      <li><a href="#">Sub option</a></li>
     *                  </ul>
     *              </li>
     *              <li><a href="#">Option</a></li>
     *          </ul>
     *      </div>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Toggle_1'], function( Selector, Toggle ){
     *              var toggleElement = Ink.s('.toggle');
     *              var toggleObj = new Toggle( toggleElement );
     *          });
     *      </script>
     */
    var Toggle = function( selector, options ){
        this._rootElement = Common.elOrSelector(selector, '[Ink.UI.Toggle root element]:');

        this._options = Ink.extendObj({
            target : undefined,
            triggerEvent: 'click',
            closeOnClick: true,
            isAccordion: false,
            initialState: null,
            classNameOn: 'show-all',
            classNameOff: 'hide-all',
            togglesDisplay: null,
            closeOnInsideClick: 'a[href]',  // closes the toggle when a target is clicked and it is a link
            onChangeState: null
        }, options || {}, InkElement.data(this._rootElement));

        this._targets = Common.elsOrSelector(this._options.target, 'Ink.UI.Toggle target option');

        // Boolean option handling
        this._options.closeOnClick = this._options.closeOnClick.toString() === 'true';
        // Actually a throolean
        if (this._options.initialState !== null){
            this._options.initialState = this._options.initialState.toString() === 'true';
        } else {
            this._options.initialState = Css.getStyle(this._targets[0], 'display') !== 'none';
        }

        if (this._options.classNameOn !== 'show-all' || this._options.classNameOff !== 'hide-all') {
            for (var i = 0, len = this._targets.length; i < len; i++) {
                Css.removeClassName(this._targets[i], 'show-all');
                Css.removeClassName(this._targets[i], 'hide-all');
            }
        }

        this._init();
    };

    Toggle.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._accordion = ( Css.hasClassName(this._rootElement.parentNode,'accordion') || Css.hasClassName(this._targets[0].parentNode,'accordion') );

            this._firstTime = true;

            this._bindEvents();

            if (this._options.initialState !== null) {
                this.setState(this._options.initialState, true);
            } else {
                // Add initial classes matching the current "display" of the object.
                var state = Css.getStyle(this._targets[0], 'display') !== 'none';
                this.setState(state, true);
            }
            // Aditionally, remove any inline "display" style.
            for (var i = 0, len = this._targets.length; i < len; i++) {
                if (this._targets[i].style.display) {
                    this._targets[i].style.display = '';  // becomes default
                }
            }
        },

        /**
         * @method _bindEvents
         * @private
         */
        _bindEvents: function () {
            if ( this._options.triggerEvent ) {
                InkEvent.observe(
                    this._rootElement,
                    this._options.triggerEvent,
                    Ink.bind(this._onTriggerEvent, this));
            }
            if( this._options.closeOnClick ){
                InkEvent.observe( document, 'click', Ink.bind(this._onOutsideClick, this));
            }
            if( this._options.closeOnInsideClick ) {
                var sel = this._options.closeOnInsideClick;
                if (sel.toString() === 'true') {
                    sel = '*';
                }
                InkEvent.observeMulti(this._targets, 'click', Ink.bind(function (e) {
                    if ( InkElement.findUpwardsBySelector(InkEvent.element(e), sel) ) {
                        this.setState(false, true);
                    }
                }, this));
            }
        },

        /**
         * Event handler. It's responsible for handling the `triggerEvent` as defined in the options.
         *
         * This will trigger the toggle.
         * 
         * @method _onTriggerEvent
         * @param {Event} event
         * @private
         */
        _onTriggerEvent: function( event ){
            // When the togglee is a child of the toggler, we get the togglee's events here. We have to check that this event is for us.
            var target = InkEvent.element(event);

            var isAncestorOfClickedElement = InkArray.some(this._targets, function (thisOne) {
                return thisOne === target || InkElement.isAncestorOf(thisOne, target);
            });

            if (isAncestorOfClickedElement) {
                return;
            }

            if (this._accordion) {
                this._updateAccordion();
            }

            var has = this.getState();
            this.setState(!has, true);
            if (!has && this._firstTime) {
                this._firstTime = false;
            }

            InkEvent.stopDefault(event);
        },

        /**
         * Be compatible with accordions
         *
         * @method _updateAccordion
         **/
        _updateAccordion: function () {
            var elms, accordionElement;
            if( Css.hasClassName(this._targets[0].parentNode,'accordion') ){
                accordionElement = this._targets[0].parentNode;
            } else {
                accordionElement = this._targets[0].parentNode.parentNode;
            }
            elms = Selector.select('.toggle, .ink-toggle',accordionElement);
            for(var i=0; i<elms.length; i+=1 ){
                var dataset = InkElement.data( elms[i] ),
                    targetElm = Selector.select( dataset.target,accordionElement );

                if( (targetElm.length > 0) && (targetElm[0] !== this._targets[0]) ){
                    targetElm[0].style.display = 'none';
                }
            }
        },

        /**
         * Click handler. Will handle clicks outside the toggle component.
         * 
         * @method _onOutsideClick
         * @param {Event} event
         * @private
         */
        _onOutsideClick: function( event ){
            var tgtEl = InkEvent.element(event),
                shades;

            var ancestorOfTargets = InkArray.some(this._targets, function (target) {
                return InkElement.isAncestorOf(target, tgtEl) || target === tgtEl;
            });

            if( (this._rootElement === tgtEl) || InkElement.isAncestorOf(this._rootElement, tgtEl) || ancestorOfTargets /*|| this._firstTime (I forgot what this last check was for) */) {
                return;
            } else if( (shades = Ink.ss('.ink-shade')).length ) {
                var shadesLength = shades.length;

                for( var i = 0; i < shadesLength; i++ ){
                    if( InkElement.isAncestorOf(shades[i],tgtEl) && InkElement.isAncestorOf(shades[i],this._rootElement) ){
                        return;
                    }
                }
            }

            this.setState(false, true);  // dismiss
        },

        /**
         * Sets the state of the toggle. (on/off)
         *
         * @param on {Boolean} New state (on/off)
         * 
         * @method setState
         */
        setState: function (on, callHandler) {
            if (on === this.getState()) { return; }
            if (callHandler && typeof this._options.onChangeState === 'function') {
                var ret = this._options.onChangeState(on);
                if (ret === false) { return false; } //  Canceled by the event handler
            }
            for (var i = 0, len = this._targets.length; i < len; i++) {
                Css.addRemoveClassName(this._targets[i], this._options.classNameOn, on);
                Css.addRemoveClassName(this._targets[i], this._options.classNameOff, !on);
            }
            Css.addRemoveClassName(this._rootElement, 'active', on);
        },

        /**
         * Gets the state of the toggle. (on/off)
         *
         * @method getState
         *
         * @return {Boolean} whether the toggle is toggled on.
         */
        getState: function () {
            return Css.hasClassName(this._rootElement, 'active');
        }
    };

    return Toggle;
});


/**
 * @module Ink.UI.Tooltip_1
 * @author inkdev AT sapo.pt
 */
Ink.createModule('Ink.UI.Tooltip', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Selector_1', 'Ink.Util.Array_1', 'Ink.Dom.Css_1', 'Ink.Dom.Browser_1'], function (Common, InkEvent, InkElement, Selector, InkArray, Css) {
    'use strict';

    /**
     * @class Ink.UI.Tooltip
     * @constructor
     *
     * @param {DOMElement|String} target Target element or selector of elements, to display the tooltips on.
     * @param {Object} [options]
     *     @param [options.text='']             Text content for the tooltip.
     *     @param [options.html='']             HTML for the tooltip. Same as above, but won't escape HTML.
     *     @param [options.where='up']          Positioning for the tooltip. Options:
     *          @param options.where.up/down/left/right     Place above, below, to the left of, or to the right of, the target. Show an arrow.
     *          @param options.where.mousemove  Place the tooltip to the bottom and to the right of the mouse when it hovers the element, and follow the mouse as it moves.
     *          @param options.where.mousefix   Place the tooltip to the bottom and to the right of the mouse when it hovers the element, keep the tooltip there motionless.
     *     
     *     @param [options.color='']            Color of the tooltip. Options are red, orange, blue, green and black. Default is white.
     *     @param [options.fade=0.3]            Fade time; Duration of the fade in/out effect.
     *     @param [options.forever=0]           Set to 1/true to prevent the tooltip from being erased when the mouse hovers away from the target
     *     @param [options.timeout=0]           Time for the tooltip to live. Useful together with [options.forever].
     *     @param [options.delay]               Time the tooltip waits until it is displayed. Useful to avoid getting the attention of the user unnecessarily
     *     @param [options.template=null]       Element or selector containing HTML to be cloned into the tooltips. Can be a hidden element, because CSS `display` is set to `block`.
     *     @param [options.templatefield=null]  Selector within the template element to choose where the text is inserted into the tooltip. Useful when a wrapper DIV is required.
     *
     *     @param [options.left,top=10]         (Nitty-gritty) Spacing from the target to the tooltip, when `where` is `mousemove` or `mousefix`
     *     @param [options.spacing=8]           (Nitty-gritty) Spacing between the tooltip and the target element, when `where` is `up`, `down`, `left`, or `right`
     * 
     * @example
     *     <ul class="buttons">
     *         <li class="button" data-tip-text="Create a new document">New</li>
     *         <li class="button" data-tip-text="Exit the program">Quit</li>
     *         <li class="button" data-tip-text="Save the document you are working on">Save</li>
     *     </ul>
     *     
     *     [...]
     *
     *     <script>
     *         Ink.requireModules(['Ink.UI.Tooltip_1'], function (Tooltip) {
     *             new Tooltip('.button', {where: 'mousefix'});
     *         });
     *     </script>
     */
    function Tooltip(element, options) {
        this._init(element, options || {});
    }

    function EachTooltip(root, elm) {
        this._init(root, elm);
    }

    var transitionDurationName,
        transitionPropertyName,
        transitionTimingFunctionName;
    (function () {  // Feature detection
        var test = document.createElement('DIV');
        var names = ['transition', 'oTransition', 'msTransition', 'mozTransition',
            'webkitTransition'];
        for (var i = 0; i < names.length; i++) {
            if (typeof test.style[names[i] + 'Duration'] !== 'undefined') {
                transitionDurationName = names[i] + 'Duration';
                transitionPropertyName = names[i] + 'Property';
                transitionTimingFunctionName = names[i] + 'TimingFunction';
                break;
            }
        }
    }());

    // Body or documentElement
    var bodies = document.getElementsByTagName('body');
    var body = bodies.length ? bodies[0] : document.documentElement;

    Tooltip.prototype = {
        _init: function(element, options) {
            var elements;

            this.options = Ink.extendObj({
                    where: 'up',
                    zIndex: 10000,
                    left: 10,
                    top: 10,
                    spacing: 8,
                    forever: 0,
                    color: '',
                    timeout: 0,
                    delay: 0,
                    template: null,
                    templatefield: null,
                    fade: 0.3,
                    text: ''
                }, options || {});

            if (typeof element === 'string') {
                elements = Selector.select(element);
            } else if (typeof element === 'object') {
                elements = [element];
            } else {
                throw 'Element expected';
            }

            this.tooltips = [];

            for (var i = 0, len = elements.length; i < len; i++) {
                this.tooltips[i] = new EachTooltip(this, elements[i]);
            }
        },
        /**
         * Destroys the tooltips created by this instance
         *
         * @method destroy
         */
        destroy: function () {
            InkArray.each(this.tooltips, function (tooltip) {
                tooltip._destroy();
            });
            this.tooltips = null;
            this.options = null;
        }
    };

    EachTooltip.prototype = {
        _oppositeDirections: {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        },
        _init: function(root, elm) {
            InkEvent.observe(elm, 'mouseover', Ink.bindEvent(this._onMouseOver, this));
            InkEvent.observe(elm, 'mouseout', Ink.bindEvent(this._onMouseOut, this));
            InkEvent.observe(elm, 'mousemove', Ink.bindEvent(this._onMouseMove, this));

            this.root = root;
            this.element = elm;
            this._delayTimeout = null;
            this.tooltip = null;
        },
        _makeTooltip: function (mousePosition) {
            if (!this._getOpt('text') &&
                    !this._getOpt('html') &&
                    !InkElement.hasAttribute(this.element, 'title')) {
                return false;
            }

            var tooltip = this._createTooltipElement();

            if (this.tooltip) {
                this._removeTooltip();
            }

            this.tooltip = tooltip;

            this._fadeInTooltipElement(tooltip);
            this._placeTooltipElement(tooltip, mousePosition);

            InkEvent.observe(tooltip, 'mouseover', Ink.bindEvent(this._onTooltipMouseOver, this));

            var timeout = this._getFloatOpt('timeout');
            if (timeout) {
                setTimeout(Ink.bind(function () {
                    if (this.tooltip === tooltip) {
                        this._removeTooltip();
                    }
                }, this), timeout * 1000);
            }
        },
        _createTooltipElement: function () {
            var template = this._getOpt('template'),  // User template instead of our HTML
                templatefield = this._getOpt('templatefield'),
                
                tooltip,  // The element we float
                field;  // Element where we write our message. Child or same as the above

            if (template) {  // The user told us of a template to use. We copy it.
                var temp = document.createElement('DIV');
                temp.innerHTML = Common.elOrSelector(template, 'options.template').outerHTML;
                tooltip = temp.firstChild;
                
                if (templatefield) {
                    field = Selector.select(templatefield, tooltip);
                    if (field) {
                        field = field[0];
                    } else {
                        throw 'options.templatefield must be a valid selector within options.template';
                    }
                } else {
                    field = tooltip;  // Assume same element if user did not specify a field
                }
            } else {  // We create the default structure
                tooltip = document.createElement('DIV');
                Css.addClassName(tooltip, 'ink-tooltip');
                Css.addClassName(tooltip, this._getOpt('color'));

                field = document.createElement('DIV');
                Css.addClassName(field, 'content');

                tooltip.appendChild(field);
            }
            
            if (this._getOpt('html')) {
                field.innerHTML = this._getOpt('html');
            } else if (this._getOpt('text')) {
                InkElement.setTextContent(field, this._getOpt('text'));
            } else {
                InkElement.setTextContent(field, this.element.getAttribute('title'));
            }
            tooltip.style.display = 'block';
            tooltip.style.position = 'absolute';
            tooltip.style.zIndex = this._getIntOpt('zIndex');

            return tooltip;
        },
        _fadeInTooltipElement: function (tooltip) {
            var fadeTime = this._getFloatOpt('fade');
            if (transitionDurationName && fadeTime) {
                tooltip.style.opacity = '0';
                tooltip.style[transitionDurationName] = fadeTime + 's';
                tooltip.style[transitionPropertyName] = 'opacity';
                tooltip.style[transitionTimingFunctionName] = 'ease-in-out';
                setTimeout(function () {
                    tooltip.style.opacity = '1';
                }, 0); // Wait a tick
            }
        },
        _placeTooltipElement: function (tooltip, mousePosition) {
            var where = this._getOpt('where');

            if (where === 'mousemove' || where === 'mousefix') {
                var mPos = mousePosition;
                this._setPos(mPos[0], mPos[1]);
                body.appendChild(tooltip);
            } else if (where.match(/(up|down|left|right)/)) {
                body.appendChild(tooltip);
                var targetElementPos = InkElement.offset(this.element);
                var tleft = targetElementPos[0],
                    ttop = targetElementPos[1];

                var centerh = (InkElement.elementWidth(this.element) / 2) - (InkElement.elementWidth(tooltip) / 2),
                    centerv = (InkElement.elementHeight(this.element) / 2) - (InkElement.elementHeight(tooltip) / 2);
                var spacing = this._getIntOpt('spacing');

                var tooltipDims = InkElement.elementDimensions(tooltip);
                var elementDims = InkElement.elementDimensions(this.element);

                var maxX = InkElement.scrollWidth() + InkElement.viewportWidth();
                var maxY = InkElement.scrollHeight() + InkElement.viewportHeight();
                
                where = this._getWhereValueInsideViewport(where, {
                    left: tleft - tooltipDims[0],
                    right: tleft + tooltipDims[0],
                    top: ttop + tooltipDims[1],
                    bottom: ttop + tooltipDims[1]
                }, {
                    right: maxX,
                    bottom: maxY
                });
                
                if (where === 'up') {
                    ttop -= tooltipDims[1];
                    ttop -= spacing;
                    tleft += centerh;
                } else if (where === 'down') {
                    ttop += elementDims[1];
                    ttop += spacing;
                    tleft += centerh;
                } else if (where === 'left') {
                    tleft -= tooltipDims[0];
                    tleft -= spacing;
                    ttop += centerv;
                } else if (where === 'right') {
                    tleft += elementDims[0];
                    tleft += spacing;
                    ttop += centerv;
                }
                
                var arrow = null;
                if (where.match(/(up|down|left|right)/)) {
                    arrow = document.createElement('SPAN');
                    Css.addClassName(arrow, 'arrow');
                    Css.addClassName(arrow, this._oppositeDirections[where]);
                    tooltip.appendChild(arrow);
                }

                var tooltipLeft = tleft;
                var tooltipTop = ttop;

                var toBottom = (tooltipTop + tooltipDims[1]) - maxY;
                var toRight = (tooltipLeft + tooltipDims[0]) - maxX;
                var toLeft = 0 - tooltipLeft;
                var toTop = 0 - tooltipTop;

                if (toBottom > 0) {
                    if (arrow) { arrow.style.top = (tooltipDims[1] / 2) + toBottom + 'px'; }
                    tooltipTop -= toBottom;
                } else if (toTop > 0) {
                    if (arrow) { arrow.style.top = (tooltipDims[1] / 2) - toTop + 'px'; }
                    tooltipTop += toTop;
                } else if (toRight > 0) {
                    if (arrow) { arrow.style.left = (tooltipDims[0] / 2) + toRight + 'px'; }
                    tooltipLeft -= toRight;
                } else if (toLeft > 0) {
                    if (arrow) { arrow.style.left = (tooltipDims[0] / 2) - toLeft + 'px'; }
                    tooltipLeft += toLeft;
                }

                tooltip.style.left = tooltipLeft + 'px';
                tooltip.style.top = tooltipTop + 'px';
            }
        },

        /**
         * Get a value for "where" (left/right/up/down) which doesn't put the
         * tooltip off the screen
         *
         * @method _getWhereValueInsideViewport
         * @param where {String} "where" value which was given by the user and we might change
         * @param bbox {BoundingBox} A bounding box like what you get from getBoundingClientRect ({top, bottom, left, right}) with pixel positions from the top left corner of the viewport.
         * @param viewport {BoundingBox} Bounding box for the viewport. "top" and "left" are omitted because these coordinates are relative to the top-left corner of the viewport so they are zero.
         *
         * @note: we can't use getBoundingClientRect in this case because it returns {0,0,0,0} on our uncreated tooltip.
         */
        _getWhereValueInsideViewport: function (where, bbox, viewport) {
            if (where === 'left' && bbox.left < 0) {
                return 'right';
            } else if (where === 'right' && bbox.right > viewport.right) {
                return 'left';
            } else if (where === 'up' && bbox.top < 0) {
                return 'down';
            } else if (where === 'down' && bbox.bottom > viewport.bottom) {
                return 'up';
            }

            return where;
        },
        _removeTooltip: function() {
            var tooltip = this.tooltip;
            if (!tooltip) {return;}

            var remove = Ink.bind(InkElement.remove, {}, tooltip);

            if (this._getOpt('where') !== 'mousemove' && transitionDurationName) {
                tooltip.style.opacity = 0;
                // remove() will operate on correct tooltip, although this.tooltip === null then
                setTimeout(remove, this._getFloatOpt('fade') * 1000);
            } else {
                remove();
            }
            this.tooltip = null;
        },
        _getOpt: function (option) {
            var dataAttrVal = InkElement.data(this.element)[InkElement._camelCase('tip-' + option)];
            if (dataAttrVal /* either null or "" may signify the absense of this attribute*/) {
                return dataAttrVal;
            }
            var instanceOption = this.root.options[option];
            if (typeof instanceOption !== 'undefined') {
                return instanceOption;
            }
        },
        _getIntOpt: function (option) {
            return parseInt(this._getOpt(option), 10);
        },
        _getFloatOpt: function (option) {
            return parseFloat(this._getOpt(option), 10);
        },
        _destroy: function () {
            if (this.tooltip) {
                InkElement.remove(this.tooltip);
            }
            this.root = null;  // Cyclic reference = memory leaks
            this.element = null;
            this.tooltip = null;
        },
        _onMouseOver: function(e) {
            // on IE < 10 you can't access the mouse event not even a tick after it fired
            var mousePosition = this._getMousePosition(e);
            var delay = this._getFloatOpt('delay');
            if (delay) {
                this._delayTimeout = setTimeout(Ink.bind(function () {
                    if (!this.tooltip) {
                        this._makeTooltip(mousePosition);
                    }
                    this._delayTimeout = null;
                }, this), delay * 1000);
            } else {
                this._makeTooltip(mousePosition);
            }
        },
        _onMouseMove: function(e) {
            if (this._getOpt('where') === 'mousemove' && this.tooltip) {
                var mPos = this._getMousePosition(e);
                this._setPos(mPos[0], mPos[1]);
            }
        },
        _onMouseOut: function () {
            if (!this._getIntOpt('forever')) {
                this._removeTooltip();
            }
            if (this._delayTimeout) {
                clearTimeout(this._delayTimeout);
                this._delayTimeout = null;
            }
        },
        _onTooltipMouseOver: function () {
            if (this.tooltip) {  // If tooltip is already being removed, this has no effect
                this._removeTooltip();
            }
        },
        _setPos: function(left, top) {
            left += this._getIntOpt('left');
            top += this._getIntOpt('top');
            var pageDims = this._getPageXY();
            if (this.tooltip) {
                var elmDims = [InkElement.elementWidth(this.tooltip), InkElement.elementHeight(this.tooltip)];
                var scrollDim = this._getScroll();

                if((elmDims[0] + left - scrollDim[0]) >= (pageDims[0] - 20)) {
                    left = (left - elmDims[0] - this._getIntOpt('left') - 10);
                }
                if((elmDims[1] + top - scrollDim[1]) >= (pageDims[1] - 20)) {
                    top = (top - elmDims[1] - this._getIntOpt('top') - 10);
                }

                this.tooltip.style.left = left + 'px';
                this.tooltip.style.top = top + 'px';
            }
        },
        _getPageXY: function() {
            var cWidth = 0;
            var cHeight = 0;
            if( typeof( window.innerWidth ) === 'number' ) {
                cWidth = window.innerWidth;
                cHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                cWidth = document.documentElement.clientWidth;
                cHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                cWidth = document.body.clientWidth;
                cHeight = document.body.clientHeight;
            }
            return [parseInt(cWidth, 10), parseInt(cHeight, 10)];
        },
        _getScroll: function() {
            var dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollLeft || dd.scrollTop)) {
                return [dd.scrollLeft, dd.scrollTop];
            } else if (db) {
                return [db.scrollLeft, db.scrollTop];
            } else {
                return [0, 0];
            }
        },
        _getMousePosition: function(e) {
            return [parseInt(InkEvent.pointerX(e), 10), parseInt(InkEvent.pointerY(e), 10)];
        }
    };

    return Tooltip;
});

/**
 * @module Ink.UI.TreeView_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.TreeView', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * Shows elements in a tree-like hierarchical structure.
     * 
     * @class Ink.UI.TreeView
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {String} [options.node='li'] Selector to define which elements are seen as nodes.
     * @param {String} [options.children='ul'] Selector to define which elements are represented as children.
     * @param {String} [options.parentClass='parent'] Classes to be added to the parent node.
     * @param {String} [options.openClass='icon icon-minus-circle'] Classes to be added to the icon when a parent is open.
     * @param {String} [options.closedClass='icon icon-plus-circle'] Classes to be added to the icon when a parent is closed.
     * @param {String} [options.hideClass='hide-all'] Class to toggle visibility of the children.
     * @param {String} [options.iconTag='i'] The name of icon tag. The component tries to find a tag with that name as a direct child of the node. If it doesn't find it, it creates it.
     * @param {Boolean} [options.stopDefault=true] Stops the default behavior of the click handler.
     * @example
     *      <ul class="ink-tree-view">
     *        <li data-open="true"><a href="#">root</a>
     *          <ul>
     *            <li><a href="#">child 1</a></li>
     *            <li><a href="#">child 2</a>
     *              <ul>
     *                <li><a href="#">grandchild 2a</a></li>
     *                <li><a href="#">grandchild 2b</a>
     *                  <ul>
     *                    <li><a href="#">grandgrandchild 1bA</a></li>
     *                    <li><a href="#">grandgrandchild 1bB</a></li>
     *                  </ul>
     *                </li>
     *              </ul>
     *            </li>
     *            <li><a href="#">child 3</a></li>
     *          </ul>
     *        </li>
     *      </ul>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.TreeView_1'], function( Selector, TreeView ){
     *              var treeViewElement = Ink.s('.ink-tree-view');
     *              var treeViewObj = new TreeView( treeViewElement );
     *          });
     *      </script>
     */
    var TreeView = function(selector, options){
        this._element = Common.elOrSelector(selector, '[Ink.UI.TreeView_1]');

        this._options = Common.options('Treeview', {
            'node':   ['String', 'li'],
            // [3.0.1] Deprecate this terrible, terrible name
            'child':  ['String','ul'],
            'children':  ['String','ul'],
            'parentClass': ['String','parent'],
            // [3.0.0] use these classes because you'll have font-awesome 4
            // 'openClass': ['String','fa fa-minus-circle'],
            // 'closedClass': ['String','fa fa-plus-circle'],
            'openNodeClass': ['String', 'open'],
            'openClass': ['String','icon-minus-sign'],
            'closedClass': ['String','icon-plus-sign'],
            'hideClass': ['String','hide-all'],
            'iconTag': ['String', 'i'],
            'stopDefault' : ['Boolean', true]
        }, options || {}, this._element);

        if (this._options.child) {
            Ink.warn('Ink.UI.TreeView: options.child is being renamed to options.children.');
            this._options.children = this._options.child;
        }

        this._init();
    };

    TreeView.prototype = {

        /**
         * Init function called by the constructor. Sets the necessary event handlers.
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._handlers = {
                click: Ink.bindEvent(this._onClick,this)
            };

            Event.on(this._element, 'click', this._options.node, this._handlers.click);

            InkArray.each(Ink.ss(this._options.node, this._element), Ink.bind(function(item){
                if( this.isParent(item) ) {
                    Css.addClassName(item, this._options.parentClass);

                    var isOpen = this.isOpen(item);
                    if( !this._getIcon(item) ){
                        Element.create(this._options.iconTag, { insertTop: item });
                    }

                    this._setNodeOpen(item, isOpen);
                }
            },this));
        },

        _getIcon: function (node) {
            return Ink.s('> ' + this._options.iconTag, node);
        },

        isOpen: function (node) {
            if (!this._getChild(node)) {
                throw new Error('not a node!');
            }

            return Element.data(node).open === 'true' ||
                Css.hasClassName(node, this._options.openNodeClass);
        },

        isParent: function (node) {
            return Css.hasClassName(node, this._options.parentClass) ||
                this._getChild(node) != null;
        },

        _setNodeOpen: function (node, beOpen) {
            var child = this._getChild(node);
            if (child) {
                Css.setClassName(child, this._options.hideClass, !beOpen);
                var icon = this._getIcon(node);

                node.setAttribute('data-open', beOpen);

                Css.setClassName(icon, this._options.openClass, beOpen);
                Css.setClassName(icon, this._options.closedClass, !beOpen);
                Css.setClassName(node, this._options.openNodeClass, beOpen);
            } else {
                Ink.error('Ink.UI.TreeView: node', node, 'is not a node!');
            }
        },

        open: function (node) {
            this._setNodeOpen(node, true);
        },

        close: function (node) {
            this._setNodeOpen(node, false);
        },

        toggle: function (node) {
            if (this.isOpen(node)) {
                this.close(node);
            } else {
                this.open(node);
            }
        },

        _getChild: function (node) {
            return Selector.select(this._options.child, node)[0] || null;
        },

        /**
         * Handles the click event (as specified in the _init function).
         * 
         * @method _onClick
         * @param {Event} event
         * @private
         */
        _onClick: function(ev){
            /**
             * Summary:
             * If the clicked element is a "node" as defined in the options, will check if it has any "child".
             * If so, will toggle its state and stop the event's default behavior if the stopDefault option is true.
             **/

            if (!this.isParent(ev.currentTarget) ||
                    Selector.matchesSelector(ev.target, this._options.node) ||
                    Selector.matchesSelector(ev.target, this._options.child)) {
                return;
            }

            if (this._options.stopDefault){
                ev.preventDefault();
            }

            this.toggle(ev.currentTarget);
        }
    };

    return TreeView;
});

Ink.createModule('Ink.UI.Upload', '1', [
    'Ink.Dom.Event_1',
    'Ink.Dom.Element_1',
    'Ink.Dom.Browser_1',
    'Ink.UI.Common_1'
], function(Event, Element, Browser, Common) {
    'use strict';

    var DirectoryReader = function(options) {
        this.init(options);
    };

    DirectoryReader.prototype = {
        init: function(options) {
            this.options = Ink.extendObj({
                entry:      undefined,
                maxDepth:   10
            }, options || {});

            try {
                this._read();
            } catch(e) {
                Ink.error(e);
            }
        },


        _read: function() {
            if(!this.options.entry) {
                throw("The entry specify you must");
            }

            try {
                this._readDirectories();
            } catch(e) {
                Ink.error(e);
            }
        },


        _readDirectories: function() {
            var entries         = [],
                running         = false,
                maxDepth        = 0;

            /* TODO return as tree because much better well */
            var _readEntries = Ink.bind(function(currentEntry) {
                var dir     = currentEntry.createReader();
                    running = true;

                dir.readEntries(Ink.bind(function(res) {
                    if(res.length > 0) {
                        for(var i = 0, len = res.length; i<len; i++) {
                            entries.push(res[i]);
                            if(!res[i].isDirectory) {
                                continue;
                            }
                            maxDepth = this.clearArray(res[i].fullPath.split('/'));
                            maxDepth.shift();
                            maxDepth = maxDepth.length;
                            if(maxDepth <= this.options.maxDepth) {
                                _readEntries(res[i]);
                            }
                        }
                        if(this._stopActivityTimeout) {
                            clearTimeout(this._stopActivityTimeout);
                        }
                        this._stopActivityTimeout = setTimeout(function() {
                            running = false;
                        }, 250);
                    }
                    if(!res.length) {
                        running = false;
                    }
                }, this), Ink.bind(function(err) {
                    this.options.readError(err, currentEntry);
                }, this));
            }, this);

            _readEntries(this.options.entry);

            var activity;
            var checkActivity = function() {
                if(running) {
                    return false;
                }
                clearInterval(activity);
                if(this.options.readComplete && typeof this.options.readComplete === 'function') {
                    this.options.readComplete(entries);
                }
                return true;
            };

            activity = setInterval(Ink.bind(checkActivity, this), 250);
        },


        clearArray: function(arr) {
            for(var i = arr.length - 1; i>=0; i--) {
                if(typeof(arr[i]) === 'undefined' || arr[i] === null || arr[i] === '') {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }
    };

    var Queue = {
        lists:  [],
        items:  [],


        /**
         * @function {Public} ? Create new queue list
         * @param {String} list name
         * @param {Function} function to iterate on items
         * @return {Object} list id
        */
        create: function(name) {
            var id;
                name = String(name);
            this.lists.push({name: name});
            id = this.lists.length - 1;
            return id;
        },


        getItems: function(parentId) {
            if(!parentId) {
                return this.items;
            }
            var items = [];
            for(var i = 0, len = this.items.length; i<len; i++) {
                if(this.items[i].parentId === parentId) {
                    items.push(this.items[i]);
                }
            }

            return items;
        },


        /**
         * @function {Public} ? Delete list
         * @param {String} List name
         * @return {Object} removed list
        */
        purge: function(id, keepList) {
            if(typeof(id) !== 'number' || isNaN(Number(id))) {
                return false;
            }
            try {
                for(var i = this.items.length; i>=0; i--) {
                    if(this.items[i] && id === this.items[i].parentId) {
                        this.remove(this.items[i].parentId, this.items[i].pid);
                    }
                }
                if(!keepList) {
                    this.lists.splice(id, 1);
                }
                return true;
            } catch(e) {
                Ink.error('Purge: invalid id');
                return false;
            }
        },


        /**
         * @function {Public} ? add an item to a list
         * @param {String} name
         * @param {Object} item
         * @return {Number} pid
        */
        add: function(parentId, item, priority) {
            if(!this.lists[parentId]) {
                return false;
            }
            if(typeof(item) !== 'object') {
                item = String(item);
            }

            var pid = parseInt(Math.round(Math.random() * 100000) + "" + Math.round(Math.random() * 100000), 10);
            priority    = priority || 0;

            this.items.push({parentId: parentId, item: item, priority: priority || 0, pid: pid});
            return pid;
        },


        /**
         * @function {Public} ? view list
         * @param {Number} list id
         * @param {Number} process id
         * @return {Object} item
        */
        view: function(parentId, pid) {
            var id = this._searchByPid(parentId, pid);
            if(id === false) {
                return false;
            }
            return this.items[id];
        },


        /**
         * @function {Public} ? remove an item
         * @param {Object} item
         * @return {Object|Boolean} removed item or false if not found
        */
        remove: function(parentId, pid) {
            try {
                var id = this._searchByPid(parentId, pid);
                if(id === false) {
                    return false;
                }
                this.items.splice(id, 1);
                return true;
            } catch(e) {
                Ink.error('Remove: invalid id');
                return false;
            }
        },

        _searchByPid: function(parentId, pid) {
            if(!parentId && typeof(parentId) === 'boolean' || !pid) {
                return false;
            }

            parentId    = parseInt(parentId, 10);
            pid         = parseInt(pid, 10);

            if(isNaN(parentId) || isNaN(pid)) {
                return false;
            }

            for(var i = 0, len = this.items.length; i<len; i++) {
                if(this.items[i].parentId === parentId && this.items[i].pid === pid) {
                    return i;
                }
            }
            return false;
        }
    };

    var UI = function(Upload) {
        this.Upload = Upload;
        this.init();
    };

    UI.prototype = {
        init: function() {
            this._fileButton = this.Upload.options.fileButton;
            this._dropzone = this.Upload.options.dropzone;
            this._setDropEvent();
            this._setFileButton();
        },


        _setDropEvent: function() {
            var dropzones = this._dropzone;
            for(var i = 0, len = dropzones.length; i<len; i++) {
                dropzones[i].ondrop        = Ink.bindEvent(this.Upload._dropEventHandler, this.Upload);
                dropzones[i].ondragleave   = Ink.bindEvent(this._onDragLeave, this);
                dropzones[i].ondragend     = Ink.bindEvent(this._onDragEndEventHandler, this);
                dropzones[i].ondragenter   = Ink.bindEvent(this._onDragEnterHandler, this);
                dropzones[i].ondragover    = Ink.bindEvent(this._onDragOverHandler, this);
            }
        },


        _onDragEnterHandler: function(ev) {
            if(ev && ev.stopPropagation) {
                ev.stopPropagation();
            }
            if(ev && ev.preventDefault) {
                ev.preventDefault();
            }
            if(ev) {
                ev.returnValue = false;
            }

            this.Upload.publish('DragEnter', ev);
            return false;
        },


        _onDragOverHandler: function(ev) {
            if(!ev) {
                return false;
            }
            ev.preventDefault();
            ev.stopPropagation();
            ev.returnValue = false;
            return true;
        },


        _onDragLeave: function(ev) {
            return this.Upload.publish('DragLeave', ev);
        },


        _onDragEndEventHandler: function(ev) {
            return this.Upload.publish('DragEnd', ev);
        },


        _setFileButton: function() {
            var btns = this._fileButton;
            Event.observeMulti(btns, 'change', Ink.bindEvent(this._fileChangeHandler, this));
        },


        _fileChangeHandler: function(ev) {
            var btn = Event.element(ev);
            var files = btn.files;
            var form = Element.findUpwardsByTag(btn, 'form');

            if(!files || !window.FormData || !('withCredentials' in new XMLHttpRequest())) {
                form.parentNode.submit();
                return false;
            }
            this.Upload._addFilesToQueue(files);
            btn.value = "";
        }
    };






    var Upload = function(options) {
        this.Queue = Queue;
        this.init(options);
        this._events = {};
    };

    Upload.prototype = {
        //_events: {},

        init: function(options) {
            if (typeof options === 'string') {
                options = Element.data(Common.elOrSelector(options, '1st argument'));
            }
            this.options = Ink.extendObj({
                extraData:          {},
                fileFormName:       'Ink_Filelist',
                dropzone:           undefined,
                fileButton:         undefined,
                endpoint:           '',
                endpointChunk:      '',
                endpointChunkCommit:'',
                maxFilesize:        300 << 20, //300mb
                chunkSize:          4194304,  // 4MB
                minSizeToUseChunks: 20971520, // 20mb
                INVALID_FILE_NAME:  undefined,
                foldersEnabled:     true,
                useChunks:          true,
                directoryMaxDepth:  10
            }, options || {});

            this._queueId           = Queue.create('Ink_UPLOAD');
            this._queueRunning      = false;
            this._folders           = {};


            if(this.options.dropzone) {
                Common.elOrSelector(this.options.dropzone, 'Upload - dropzone');
            }

            if(this.options.fileButton) {
                Common.elOrSelector(this.options.fileButton, 'Upload - fileButton');
            }

            if(!this.options.dropzone && ! this.options.fileButton) {
                throw new TypeError('A file button or dropzone, specify you must, my young padawan');
            }

            this.options.dropzone = Ink.ss(this.options.dropzone);
            this.options.fileButton= Ink.ss(this.options.fileButton);

            new UI(this);
        },


        _supportChunks: function(size) {
            return this.options.useChunks &&
                    'Blob' in window &&
                    (new Blob()).slice &&
                    size > this.options.minSizeToUseChunks;
        },


        _dropEventHandler: function(ev) {
            if(ev && ev.stopPropagation) {
                ev.stopPropagation();
            }
            if(ev && ev.preventDefault) {
                ev.preventDefault();
            }
            if(ev) {
                ev.returnValue = false;
            }

            this.publish('DropComplete', ev.dataTransfer);

            var data = ev.dataTransfer;

            if(!data || !data.files || !data.files.length) {
                return false;
            }

            this._files = data.files;
            this._files = Array.prototype.slice.call(this._files || [], 0);

            // check if webkitGetAsEntry exists on first item
            if(data.items && data.items[0] && data.items[0].webkitGetAsEntry) {
                if(!this.options.foldersEnabled) {
                    return setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
                }
                var entry, folders = [];
                for(var i = ev.dataTransfer.items.length-1; i>=0; i--) {
                    entry = ev.dataTransfer.items[i].webkitGetAsEntry();
                    if(entry && entry.isDirectory) {
                        folders.push(entry);
                        this._files[i].isDirectory = true;
                        this._files.splice(i, 1);
                    }
                }
                // starting callback hell
                this._addFolderToQueue(folders, Ink.bind(function() {
                    setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
                }, this));
            } else {
                setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
            }

            return true;
        },


        _addFolderToQueue: function(folders, cb) {
            var files = [], invalidFolders = {};

            if(!folders || !folders.length) {
                cb();
                return files;
            }

            var getFiles = function(entries) {
                var files = [];
                for(var i = 0, len = entries.length; i<len; i++) {
                    if(entries[i].isFile) {
                        files.push(entries[i]);
                    }
                }
                return files;
            };

            var convertToFile = function(cb, index) {
                var fullPath;
                index = index || 0;
                if(!this._files[index]) {
                    cb();
                    return files;
                }
                if(this._files[index].constructor.name.toLowerCase() !== 'fileentry') {
                    return convertToFile.apply(this, [cb, ++index]);
                }
                this._files[index].file(Ink.bind(function(res) {
                    fullPath = this._files[index].fullPath; // bug
                    this._files[index]              = res;
                    this._files[index].hasParent    = true;

                    // if browser don't have it natively, set it
                    if(!this._files[index].fullPath) {
                        this._files[index].fullPath = fullPath;
                    }
                    convertToFile.apply(this, [cb, ++index]);
                }, this), Ink.bind(function() {
                    this._files.splice(index, 1);
                    convertToFile.apply(this, [cb, index]);
                }, this));
            };

            var getSubDirs = Ink.bind(function(index) {
                if(!folders[index]) {
                    this._files = this._files.concat(files);
                    convertToFile.call(this, cb);
                    return false;
                }

                new DirectoryReader({
                    entry:      folders[index],
                    maxDepth:   this.options.directoryMaxDepth,
                    readComplete: Ink.bind(function(entries) {
                        files = files.concat(getFiles(entries));
                        // adding root dirs
                        if(!folders[index] || folders[index].fullPath in this._folders) {
                            return;
                        }

                        this._folders[folders[index].fullPath] = {
                            items:      entries,
                            files:      files,
                            length:     entries.length,
                            created:    false,
                            root:       true
                        };

                        // adding sub dirs
                        for(var i = 0, len = entries.length; i<len; i++) {
                            if(entries[i].isFile) {
                                continue;
                            }
                            if(entries[i].fullPath in invalidFolders) {
                                delete invalidFolders[entries[i].fullPath];
                                continue;
                            }
                            this._folders[entries[i].fullPath] = {
                                created:    false,
                                root:       false
                            };
                        }
                        getSubDirs(++index);
                    }, this),
                    readError: Ink.bind(function(err, dir) {
                        invalidFolders[dir.fullPath] = {};
                        invalidFolders[dir.fullPath].error = err;
                    }, this)
                });
            }, this);

            getSubDirs(0);
            return files;
        },


        _addFilesToQueue: function(files) {
            var file, fileID, o;
            for(var i = 0, len = files.length; i<len; i++) {
                file = files[i];

                if(!file.isDirectory) {
                    // dirty hack to allow 0B files avoiding folders on GECKO
                    if(file === null || (!file.type && file.size % 4096 === 0 && (!Browser.CHROME || !this.options.foldersEnabled))) {
                        this.publish('InvalidFile', file, 'size');
                        continue;
                    }
                }

                if(file.size > this.options.maxFilesize) {
                    this.publish('MaxSizeFailure', file, this.options.maxFilesize);
                    continue;
                }

                fileID = parseInt(Math.round(Math.random() * 100000) + "" + Math.round(Math.random() * 100000), 10);
                o = { id: i, data: file, fileID: fileID, directory: file.isDirectory };
                Queue.add(this._queueId, o);

                this.publish('FileAddedToQueue', o);
            }
            this._processQueue(true);
            this._files = [];
        },


        _processQueue: function(internalUpload) {
            if(this._queueRunning) {
                return false;
            }

            this.running = 0;
            var max = 1, i = 0, items,
                queueLen = Queue.items.length;
            this._queueRunning = true;

            this.interval = setInterval(Ink.bind(function() {
                if(Queue.items.length === i && this.running === 0) {
                    Queue.purge(this._queueId, true);
                    this._queueRunning = false;
                    clearInterval(this.interval);
                    this.publish('QueueEnd', this._queueId, queueLen);
                }

                items = Queue.getItems(this._queueId);

                if(this.running < max && items[i]) {
                    if(!items[i].canceled) {
                        _doRequest.call(this, items[i].pid, items[i].item.data, items[i].item.fileID, items[i].item.directory, internalUpload);
                        this.running++;
                        i++;
                    } else {
                        var j = i;
                        while(items[j] && items[j].canceled) {
                            i++;
                            j++;
                        }
                    }
                    return true;
                }
                return false;
            }, this), 100);


            var _doRequest = function(pid, data, fileID, directory, internalUpload) {
                var o = {
                    file:   data,
                    fileID: fileID,
                    cb: Ink.bind(function() {
                        this.running--;
                    }, this)
                };
                if(internalUpload) {
                    if(directory) {
                        // do magic
                        o.cb();
                    } else {
                        this._upload(o);
                    }
                }
            };

            return true;
        },


        _upload: function(o) {
            var file = o.file,
                xhr = new XMLHttpRequest(),
                fileID = o.fileID;

            this.publish('BeforeUpload', file, this.options.extraData, fileID, xhr, this._supportChunks(file.size));

            var forceAbort = function(showError) {
                if(o.cb && typeof(o.cb === 'function')) {
                    o.cb();
                }

                this.publish('OnProgress', {
                    length: file.size,
                    lengthComputable: true,
                    loaded: file.size,
                    total: file.size
                }, file, fileID);
                this.publish('EndUpload', file, fileID, (showError ? { error: true } : true));
                this.publish('InvalidFile', file, 'name');
                xhr.abort();
            };

            if(this.options.INVALID_FILE_NAME && this.options.INVALID_FILE_NAME instanceof RegExp) {
                if(this.options.INVALID_FILE_NAME.test(o.file.name)) {
                    forceAbort.call(this);
                    return;
                }
            }

            // If file was renamed, abort it
            // FU OPERA: Opera always return lastModified date as null
            if(!file.lastModifiedDate && !Ink.Dom.Browser.OPERA) {
                forceAbort.call(this, true);
                return;
            }

            xhr.upload.onprogress = Ink.bind(this.publish, this, 'OnProgress', file, fileID);

            var endpoint, method;
            if(this._supportChunks(file.size)) {
                if(file.size <= file.chunk_offset) {
                    endpoint = this.options.endpointChunkCommit;
                    method = 'POST';
                } else {
                    endpoint = this.options.endpointChunk;
                    if(file.chunk_upload_id) {
                        endpoint += '?upload_id=' + file.chunk_upload_id;
                    }
                    if(file.chunk_offset) {
                        endpoint += '&offset=' + file.chunk_offset;
                    }
                    method = 'PUT';
                }
            } else {
                endpoint = this.options.endpoint;
                method = 'POST';
            }

            xhr.open(method, endpoint, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
            if(this._supportChunks(file.size)) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }

            var fd = new FormData(),
                blob;

            if("Blob" in window && typeof Blob === 'function') {
                blob = new Blob([file], { type: file.type });
                if(this._supportChunks(file.size)) {
                    file.chunk_offset = file.chunk_offset || 0;
                    blob = blob.slice(file.chunk_offset, file.chunk_offset + this.options.chunkSize);
                } else {
                    fd.append(this.options.fileFormName, blob, file.name);
                }
            } else {
                fd.append(this.options.fileFormName, file);
            }

            if(!this._supportChunks(file.size)) {
                for(var k in this.options.extraData) {
                    if(this.options.extraData.hasOwnProperty(k)) {
                        fd.append(k, this.options.extraData[k]);
                    }
                }
            } else {
                fd.append('upload_id', file.chunk_upload_id);
                fd.append('path', file.upload_path);
            }

            if(!file.hasParent) {
                if(!this._supportChunks(file.size)) {
                    xhr.send(fd);
                } else {
                    if(file.size <= file.chunk_offset) {
                        xhr.send('upload_id=' + file.chunk_upload_id + '&path=' + file.upload_path + '/' + file.name);
                    } else {
                        xhr.send(blob);
                    }
                }
            } else {
                this.publish('cbCreateFolder', file.parentID, file.fullPath, this.options.extraData, this._folders, file.rootPath, Ink.bind(function() {
                    if(!this._supportChunks(file.size)) {
                        xhr.send(fd);
                    } else {
                        if(file.size <= file.chunk_offset) {
                            xhr.send('upload_id=' + file.chunk_upload_id + '&path=' + file.upload_path + '/' + file.name);
                        } else {
                            xhr.send(blob);
                        }
                    }
                }, this));
            }


            xhr.onload = Ink.bindEvent(function() {
                /* jshint boss:true */
                if(this._supportChunks(file.size) && file.size > file.chunk_offset) {
                    if(xhr.response) {
                        var response = JSON.parse(xhr.response);

                        // check expected offset
                        var invalidOffset = file.chunk_offset && response.offset !== (file.chunk_offset + this.options.chunkSize) && file.size !== response.offset;
                        if(invalidOffset) {
                            if(o.cb) {
                                o.cb();
                            }
                            this.publish('ErrorUpload', file, fileID);
                        } else {
                            file.chunk_upload_id = response.upload_id;
                            file.chunk_offset = response.offset;
                            file.chunk_expires = response.expires;
                            this._upload(o);
                        }
                    } else {
                        if(o.cb) {
                            o.cb();
                        }
                        this.publish('ErrorUpload', file, fileID);
                    }
                    return (xhr = null);
                }

                if(o.cb) {
                    o.cb();
                }

                if(xhr.responseText && xhr['status'] < 400) {
                    this.publish('EndUpload', file, fileID, xhr.responseText);
                } else {
                    this.publish('ErrorUpload', file, fileID);
                }
                return (xhr = null);
            }, this);


            xhr.onerror = Ink.bindEvent(function() {
                if(o.cb) {
                    o.cb();
                }
                this.publish('ErrorUpload', file, fileID);
            }, this);

            xhr.onabort = Ink.bindEvent(function() {
                if(o.cb) {
                    o.cb();
                }
                this.publish('AbortUpload', file, fileID, {
                    abortAll: Ink.bind(this.abortAll, this),
                    abortOne: Ink.bind(this.abortOne, this)
                });
            }, this);
        },


        abortAll: function() {
            if(!this._queueRunning) {
                return false;
            }
            clearInterval(this.interval);
            this._queueRunning = false;
            Queue.purge(this._queueId, true);
            return true;
        },

        abortOne: function(id, cb) {
            var items = Queue.getItems(0),
                o;
            for(var i = 0, len = items.length; i<len; i++) {
                if(items[i].item.fileID === id) {
                    o = {
                        id:         items[i].item.fileID,
                        name:       items[i].item.data.name,
                        size:       items[i].item.data.size,
                        hasParent:  items[i].item.data.hasParent
                    };
                    Queue.remove(0, items[i].pid);
                    if(cb) {
                        cb(o);
                    }
                    return true;
                }
            }
            return false;
        },


        subscribe: function(eventName, fn) {
            if(!this._events[eventName]) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(fn);
            return this._events[eventName];
        },


        publish: function(eventName) {
            var events = this._events[eventName],
                args = Array.prototype.slice.call(arguments || [], 0);

            if(!events) {
                return;
            }

            for(var i = 0, len = events.length; i<len; i++) {
                try {
                    events[i].apply(this, args.splice(1, args.length));
                } catch(err) {
                    Ink.error(eventName + ": " + err);
                }
            }
        }
    };

    return Upload;
});
