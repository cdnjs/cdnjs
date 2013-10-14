
(function() {

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
    var paths = {
	    Ink: ( ('INK_PATH' in window) ? window.INK_PATH : window.location.protocol + '//js.ink.sapo.pt/Ink/' )
    };
    var modules = {};
    var modulesLoadOrder = [];
    var modulesRequested = {};
    var pendingRMs = [];



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

        _modNameToUri: function(modName) {
            if (modName.indexOf('/') !== -1) {
                return modName;
            }
            var parts = modName.replace(/_/g, '.').split('.');
            var root = parts.shift();
            var uriPrefix = paths[root];
            if (!uriPrefix) {
                uriPrefix = './' + root + '/';
                // console.warn('Not sure where to fetch ' + root + ' modules from! Attempting ' + uriPrefix + '...');
            }
            return [uriPrefix, parts.join('/'), '/lib.js'].join('');
        },

        getPath: function(key) {
            return paths[key || 'Ink'];
        },

        setPath: function(key, rootURI) {
            paths[key] = rootURI;
        },

        /**
         * loads a javascript script in the head.
         *
         * @method loadScript
         * @param  {String}   uri  can be an http URI or a module name
         */
        loadScript: function(uri) {
            /*jshint evil:true */

            var scriptEl = document.createElement('script');
            scriptEl.setAttribute('type', 'text/javascript');
            scriptEl.setAttribute('src', this._modNameToUri(uri));

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
            var cb = function() {
                //console.log(['createModule(', mod, ', ', ver, ', [', deps.join(', '), '], ', !!modFn, ')'].join(''));

                if (typeof mod !== 'string') {
                    throw new Error('module name must be a string!');
                }

                // validate version correctness
                if (typeof ver === 'number' || (typeof ver === 'string' && ver.length > 0)) {
                } else {
                    throw new Error('version number missing!');
                }

                var modAll = [mod, '_', ver].join('');


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

                if (isInkModule) {
                    t[0][ t[1] + '_' + ver ] = moduleContent; // in namespace
                }


                // unversioned
                modules[ mod ] = moduleContent; // in modules

                if (isInkModule) {
                    if (isEmptyObject( t[0][ t[1] ] )) {
                        t[0][ t[1] ] = moduleContent; // in namespace
                    }
                    else {
                        // console.warn(['Ink.createModule ', modAll, ': module has been defined already with a different version!'].join(''));
                    }
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
                dep = deps[i];
                mod = modules[dep];
                if (mod) {
                    o.args[i] = mod;
                    --o.remaining;
                    continue;
                }
                else if (modulesRequested[dep]) {
                }
                else {
                    modulesRequested[dep] = true;
                    Ink.loadScript(dep);
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
            // console.log(mlo);
            mlo = mlo.map(function(m) {
                var cutAt = m.indexOf('.');
                if (cutAt === -1) { cutAt = m.indexOf('_'); }
                var root = m.substring(0, cutAt);
                m = m.substring(cutAt + 1);
                var rootPath = Ink.getPath(root);
                return ['<script type="text/javascript" src="', rootPath, m.replace(/\./g, '/'), '/"></script>'].join('');
            });

            return mlo.join('\n');
        },

        /**
         * Function.prototype.bind alternative.
         * Additional arguments will be sent to the original function as prefix arguments.
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
                return fn.apply(context, finalArgs);
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
            return this.bind.apply(this,
                [object[methodName], object].concat([].slice.call(arguments, 2)));
        },

        /**
         * Function.prototype.bind alternative for event handlers.
         * Same as bind but keeps first argument of the call the original event.
         * Additional arguments will be sent to the original function as prefix arguments.
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
                return fn.apply(context, finalArgs);
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
        extendObj: function(destination, source)
        {
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
        }

    };



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

})();

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

            var urlLocation =  document.createElementNS ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'a') :
                document.createElement('a');
            urlLocation.href = url;

            this.url = url;
            this.isHTTP = urlLocation.protocol.match(/^https?:$/i) && true;
            this.requestHasBody = options.method.search(/^get|head$/i) < 0;

            if (!this.isHTTP || location.protocol === 'widget:' || typeof window.widget === 'object') {
                this.isCrossDomain = false;
            } else {
                this.isCrossDomain = location.protocol !== urlLocation.protocol || location.host !== urlLocation.host;
            }
            if(this.options.cors) {
                this.isCrossDomain = false;
            }

            this.transport = this.getTransport();

            this.request();
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
                        "X-Ink-Version": "1"
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
                        headers['Connection'] = 'close';
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
     * Shortcut function for simple AJAX use cases.
     *
     * @method load
     * @param {String}   url       request url
     * @param {Function} callback  callback to be executed if the request is successful
     * @return {Object} XMLHttpRequest object
     */
    Ajax.load = function(url, callback){
        return new Ajax(url, {
            method: 'GET',
            onSuccess: function(response){
                callback(response.responseText, response);
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
 * @author inkdev AT sapo.pt
 */

Ink.createModule( 'Ink.Dom.Css', 1, [], function() {

    'use strict';

    /**
     * @module Ink.Dom.Css_1
     */

    /**
     * @class Ink.Dom.Css
     * @static
     */

    var DomCss = {
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
            if (elm && className) {
                if (typeof elm.classList !== "undefined"){
                    elm.classList.add(className);
                }
                else if (!this.hasClassName(elm, className)) {
                    elm.className += (elm.className ? ' ' : '') + className;
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
            if (elm && className) {
                if (typeof elm.classList !== "undefined"){
                    elm.classList.remove(className);
                } else {
                    if (typeof elm.className === "undefined") {
                        return false;
                    }
                    var elmClassName = elm.className,
                        re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
                    elmClassName = elmClassName.replace(re, ' ');
                    elmClassName = elmClassName.replace(/^\s+/, '').replace(/\s+$/, '');

                    elm.className = elmClassName;
                }
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
         * @param {String}             className
         * @return {Boolean} true if a given class is applied to a given element
         */
        hasClassName: function(elm, className) {
            elm = Ink.i(elm);
            if (elm && className) {
                if (typeof elm.classList !== "undefined"){
                    return elm.classList.contains(className);
                }
                else {
                    if (typeof elm.className === "undefined") {
                        return false;
                    }
                    var elmClassName = elm.className;

                    if (typeof elmClassName.length === "undefined") {
                        return false;
                    }

                    if (elmClassName.length > 0) {
                        if (elmClassName === className) {
                            return true;
                        }
                        else {
                            var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
                            if (re.test(elmClassName)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
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
            this.addRemoveClassName(element, className, !negate);
            setTimeout(Ink.bind(function() {
                this.addRemoveClassName(element, className, negate);
            }, this), Number(timeout) || 100);
            /*
            var _self = this;
            setTimeout(function() {
                    console.log(_self);
                _self.addRemoveClassName(element, className, negate);
            }, Number(timeout) || 100);
            */
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
                if (typeof elm.classList !== "undefined"){
                    elm = Ink.i(elm);
                    if (elm !== null){
                        elm.classList.toggle(className);
                    }
                    return true;
                }
            }

            if (typeof forceAdd !== 'undefined') {
                if (forceAdd === true) {
                    this.addClassName(elm, className);
                }
                else if (forceAdd === false) {
                    this.removeClassName(elm, className);
                }
            } else {
                if (this.hasClassName(elm, className)) {
                    this.removeClassName(elm, className);
                }
                else {
                    this.addClassName(elm, className);
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
            return str ? str.replace(/-(\w)/g, function (_, $1){
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

                 if (window.getComputedStyle && (!value || value === 'auto')) {
                     var css = window.getComputedStyle(elm, null);

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
            if (elm !== null) {
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
                            else {
                                if (prop === 'float' || prop === 'cssFloat') {
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
                    if (elm.style.display === 'none') {
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

    return DomCss;

});

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Dom.Element', 1, [], function() {

    'use strict';

    /**
     * @module Ink.Dom.Element_1
     */

    /**
     * @class Ink.Dom.Element
     */

    var Element = {

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
         * @param {Object} properties  object with properties to be set on the element
         */
        create: function(tag, properties) {
            var el = document.createElement(tag);
            //Ink.extendObj(el, properties);
            for(var property in properties) {
                if(properties.hasOwnProperty(property)) {
                    if(property === 'className') {
                        property = 'class';
                    }
                    el.setAttribute(property, properties[property]);
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
            elm = this.get(elm);
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
            return this.offset(elm)[1];
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
            return this.offset(elm)[0];
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
            element = this.get(element);
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
            var bProp = ['border-left-width', 'border-top-width'];
            var res = [0, 0];
            var dRes, bRes, parent, cs;
            var getPropPx = this._getPropPx;

            var InkBrowser = Ink.getModule('Ink.Dom.Browser', 1);

            do {
                cs = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;
                dRes = [el.offsetLeft | 0, el.offsetTop | 0];

                bRes = [getPropPx(cs, bProp[0]), getPropPx(cs, bProp[1])];
                if( InkBrowser.OPERA ){
                    res[0] += dRes[0];
                    res[1] += dRes[1];
                } else {
                    res[0] += dRes[0] + bRes[0];
                    res[1] += dRes[1] + bRes[1];
                }
                parent = el.offsetParent;
            } while (el = parent);

            bRes = [getPropPx(cs, bProp[0]), getPropPx(cs, bProp[1])];

            if (InkBrowser.GECKO) {
                res[0] += bRes[0];
                res[1] += bRes[1];
            }
            else if( !InkBrowser.OPERA ) {
                res[0] -= bRes[0];
                res[1] -= bRes[1];
            }

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
                    n = parseInt(val, 10);
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
            return this.offset(el);
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
            if (targetElm = this.get(targetElm)) {
                targetElm.parentNode.insertBefore(newElm, targetElm.nextSibling);
            }
        },

        /**
         * Inserts a element at the top of the childNodes of a target element
         *
         * @method insertTop
         * @param {DOMElement}         newElm     element to be inserted
         * @param {DOMElement|String}  targetElm  key element
         */
        insertTop: function(newElm,targetElm) {  // TODO check first child exists
            /*jshint boss:true */
            if (targetElm = this.get(targetElm)) {
                targetElm.insertBefore(newElm, targetElm.firstChild);
            }
        },

        /**
         * Retreives textContent from node
         *
         * @method textContent
         * @param {DOMNode} node from which to retreive text from. Can be any node type.
         * @return {String} the text
         */
        textContent: function(node){
            node = Ink.i(node);
            var text, k, cs, m;

            switch(node && node.nodeType) {
            case 9: /*DOCUMENT_NODE*/
                // IE quirks mode does not have documentElement
                return this.textContent(node.documentElement || node.body && node.body.parentNode || node.body);

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
                    return this.textContent(node.firstChild);
                }

                text = [];
                cs = node.childNodes;
                for (k = 0, m = cs.length; k < m; ++k) {
                    text.push( this.textContent( cs[k] ) );
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
            return node !== descendant && this.isAncestorOf(node, descendant);
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
         * @method uterDimensions
         * @param {DOMElement} element Target element
         * @return {Array} Array with element width and height.
         */
        outerDimensions: function (element) {
            var bbox = Element.elementDimensions(element);

            var Css = Ink.getModule('Ink.Dom.Css_1');
            
            return [
                bbox[0] + parseFloat(Css.getStyle(element, 'marginLeft') || 0) + parseFloat(Css.getStyle(element, 'marginRight') || 0),  // w
                bbox[1] + parseFloat(Css.getStyle(element, 'marginTop') || 0) + parseFloat(Css.getStyle(element, 'marginBottom') || 0)  // h
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
            var rect = Ink.i(element).getBoundingClientRect();
            if (partial) {
                return  rect.bottom > 0                        && // from the top
                        rect.left < Element.viewportWidth()    && // from the right
                        rect.top < Element.viewportHeight()    && // from the bottom
                        rect.right  > 0;                          // from the left
            } else {
                return  rect.top > 0                           && // from the top
                        rect.right < Element.viewportWidth()   && // from the right
                        rect.bottom < Element.viewportHeight() && // from the bottom
                        rect.left  > 0;                           // from the left
            }
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
            var pos = this.offset(cloneFrom);
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
         * @param {String}     [ellipsis]  String to append to the chopped text
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
            return this.findUpwardsHaving(element, tst);
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
            return this.findUpwardsHaving(element, tst);
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
            return this.findUpwardsHaving(element, tst);
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
            if (typeof Ink.Dom === 'undefined' || typeof Ink.Dom.Selector === 'undefined') {
                throw new Error('This method requires Ink.Dom.Selector');
            }
            var tst = function(el) {
                return Ink.Dom.Selector.matchesSelector(el, sel);
            };
            return this.findUpwardsHaving(element, tst);
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
                    part = this._trimString( String(node.data) );
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

            data = this._normalizeData(data);

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

            opts.data = this._normalizeData(opts.data);

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

            data = this._normalizeData(data);

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

            data = this._normalizeData(data);

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
                    index    = this.parentIndexOf(elm.parentNode, elm);

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
                    index       = this.parentIndexOf(elm.parentNode, elm);

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
            return this.siblings(elm).length + 1;
        },

       /**
        * parses and appends an html string to a container, not destroying its contents
        *
        * @method appendHTML
        * @param {String|DomElement} elm   element
        * @param {String}            html  markup string
        */
        appendHTML: function(elm, html){
            var temp = document.createElement('div');
            temp.innerHTML = html;
            var tempChildren = temp.children;
            for (var i = 0; i < tempChildren.length; i++){
                elm.appendChild(tempChildren[i]);
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
            var temp = document.createElement('div');
            temp.innerHTML = html;
            var first = elm.firstChild;
            var tempChildren = temp.children;
            for (var i = tempChildren.length - 1; i >= 0; i--){
                elm.insertBefore(tempChildren[i], first);
                first = elm.firstChild;
            }
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
        htmlToFragment: function(html){
            /*jshint boss:true */
            /*global Range:false */
            if(typeof document.createRange === 'function' && typeof Range.prototype.createContextualFragment === 'function'){
                this.htmlToFragment = function(html){
                    var range;

                    if(typeof html !== 'string'){ return document.createDocumentFragment(); }

                    range = document.createRange();

                    // set the context to document.body (firefox does this already, webkit doesn't)
                    range.selectNode(document.body);

                    return range.createContextualFragment(html);
                };
            } else {
                this.htmlToFragment = function(html){
                    var fragment = document.createDocumentFragment(),
                        tempElement,
                        current;

                    if(typeof html !== 'string'){ return fragment; }

                    tempElement = document.createElement('div');
                    tempElement.innerHTML = html;

                    // append child removes elements from the original parent
                    while(current = tempElement.firstChild){ // intentional assignment
                        fragment.appendChild(current);
                    }

                    return fragment;
                };
            }

            return this.htmlToFragment.call(this, html);
        },

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
                    throw "[Ink.Dom.Element.data] :: This method requires Ink.Dom.Selector - v1";
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
                        dataset[this._camelCase(curAttrName.replace('data-', ''))] = curAttrValue;
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
         * @return {Number} viewport width
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

    return Element;

});

/**
 * @author inkdev AT sapo.pt
 */

Ink.createModule('Ink.Dom.Event', 1, [], function() {

    'use strict';

    /**
     * @module Ink.Dom.Event_1
     */

    /**
     * @class Ink.Dom.Event
     */

    var Event = {

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
     *  // BEFORE
     *  InkEvent.observe(window, 'scroll', function () {
     *      ...
     *  }); // When scrolling on mobile devices or on firefox's smooth scroll
     *      // this is expensive because onscroll is called many times
     *
     *  // AFTER
     *  InkEvent.observe(window, 'scroll', InkEvent.throttle(function () {
     *      ...
     *  }, 100)); // The event handler is called only every 100ms. Problem solved.
     *
     * @example
     *  var handler = InkEvent.throttle(function () {
     *      ...
     *  }, 100);
     *
     *  InkEvent.observe(window, 'scroll', handler);
     *  InkEvent.observe(window, 'resize', handler);
     *
     *  // on resize, both the "scroll" and the "resize" events are triggered
     *  // a LOT of times. This prevents both of them being called a lot of
     *  // times when the window is being resized by a user.
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
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    return throttled.apply(that, args);
                });
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
    element: function(ev)
    {
        var node = ev.target ||
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
     * Dispatches an event to element
     *
     * @method fire
     * @param {DOMElement|String}  element    element id or element
     * @param {String}             eventName  event name
     * @param {Object}             [memo]     metadata for the event
     */
    fire: function(element, eventName, memo)
    {
        element = Ink.i(element);
        var ev, nativeEvents;
        if(document.createEvent){
            nativeEvents = {
                "DOMActivate": true, "DOMFocusIn": true, "DOMFocusOut": true,
                "focus": true, "focusin": true, "focusout": true,
                "blur": true, "load": true, "unload": true, "abort": true,
                "error": true, "select": true, "change": true, "submit": true,
                "reset": true, "resize": true, "scroll": true,
                "click": true, "dblclick": true, "mousedown": true,
                "mouseenter": true, "mouseleave": true, "mousemove": true, "mouseover": true,
                "mouseout": true, "mouseup": true, "mousewheel": true, "wheel": true,
                "textInput": true, "keydown": true, "keypress": true, "keyup": true,
                "compositionstart": true, "compositionupdate": true, "compositionend": true,
                "DOMSubtreeModified": true, "DOMNodeInserted": true, "DOMNodeRemoved": true,
                "DOMNodeInsertedIntoDocument": true, "DOMNodeRemovedFromDocument": true,
                "DOMAttrModified": true, "DOMCharacterDataModified": true,
                "DOMAttributeNameChanged": true, "DOMElementNameChanged": true,
                "hashchange": true
            };
        } else {
            nativeEvents = {
                "onabort": true, "onactivate": true, "onafterprint": true, "onafterupdate": true,
                "onbeforeactivate": true, "onbeforecopy": true, "onbeforecut": true,
                "onbeforedeactivate": true, "onbeforeeditfocus": true, "onbeforepaste": true,
                "onbeforeprint": true, "onbeforeunload": true, "onbeforeupdate": true, "onblur": true,
                "onbounce": true, "oncellchange": true, "onchange": true, "onclick": true,
                "oncontextmenu": true, "oncontrolselect": true, "oncopy": true, "oncut": true,
                "ondataavailable": true, "ondatasetchanged": true, "ondatasetcomplete": true,
                "ondblclick": true, "ondeactivate": true, "ondrag": true, "ondragend": true,
                "ondragenter": true, "ondragleave": true, "ondragover": true, "ondragstart": true,
                "ondrop": true, "onerror": true, "onerrorupdate": true,
                "onfilterchange": true, "onfinish": true, "onfocus": true, "onfocusin": true,
                "onfocusout": true, "onhashchange": true, "onhelp": true, "onkeydown": true,
                "onkeypress": true, "onkeyup": true, "onlayoutcomplete": true,
                "onload": true, "onlosecapture": true, "onmessage": true, "onmousedown": true,
                "onmouseenter": true, "onmouseleave": true, "onmousemove": true, "onmouseout": true,
                "onmouseover": true, "onmouseup": true, "onmousewheel": true, "onmove": true,
                "onmoveend": true, "onmovestart": true, "onoffline": true, "ononline": true,
                "onpage": true, "onpaste": true, "onprogress": true, "onpropertychange": true,
                "onreadystatechange": true, "onreset": true, "onresize": true,
                "onresizeend": true, "onresizestart": true, "onrowenter": true, "onrowexit": true,
                "onrowsdelete": true, "onrowsinserted": true, "onscroll": true, "onselect": true,
                "onselectionchange": true, "onselectstart": true, "onstart": true,
                "onstop": true, "onstorage": true, "onstoragecommit": true, "onsubmit": true,
                "ontimeout": true, "onunload": true
            };
        }


        if(element !== null && element !== undefined){
            if (element === document && document.createEvent && !element.dispatchEvent) {
                element = document.documentElement;
            }

            if (document.createEvent) {
                ev = document.createEvent("HTMLEvents");
                if(typeof nativeEvents[eventName] === "undefined"){
                    ev.initEvent("dataavailable", true, true);
                } else {
                    ev.initEvent(eventName, true, true);
                }

            } else {
                ev = document.createEventObject();
                if(typeof nativeEvents["on"+eventName] === "undefined"){
                    ev.eventType = "ondataavailable";
                } else {
                    ev.eventType = "on"+eventName;
                }
            }

            ev.eventName = eventName;
            ev.memo = memo || { };

            try {
                if (document.createEvent) {
                    element.dispatchEvent(ev);
                } else if(element.fireEvent){
                    element.fireEvent(ev.eventType, ev);
                } else {
                    return;
                }
            } catch(ex) {}

            return ev;
        }
    },

    _callbackForCustomEvents: function (element, eventName, callBack) {
        var isHashChangeInIE = eventName === "hashchange" && element.attachEvent && !window.onhashchange;
        var isCustomEvent = eventName.indexOf(':') !== -1;
        if (isHashChangeInIE || isCustomEvent) {
            /**
             *
             * prevent that each custom event fire without any test
             * This prevents that if you have multiple custom events
             * on dataavailable to trigger the callback event if it
             * is a different custom event
             *
             */
            var argCallback = callBack;
            return Ink.bindEvent(function(ev, eventName, cb){

              //tests if it is our event and if not
              //check if it is IE and our dom:loaded was overrided (IE only supports one ondatavailable)
              //- fix /opera also supports attachEvent and was firing two events
              // if(ev.eventName === eventName || (Ink.Browser.IE && eventName === 'dom:loaded')){
              if(ev.eventName === eventName){
                //fix for FF since it loses the event in case of using a second binObjEvent
                if(window.addEventListener){
                  window.event = ev;
                }
                cb();
              }

            }, this, eventName, argCallback);
        } else {
            return null;
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
    observe: function(element, eventName, callBack, useCapture)
    {
        element = Ink.i(element);
        if(element !== null && element !== undefined) {
            /* rare corner case: some events need a different callback to be generated */
            var callbackForCustomEvents = this._callbackForCustomEvents(element, eventName, callBack);
            if (callbackForCustomEvents) {
                callBack = callbackForCustomEvents;
                eventName = 'dataavailable';
            }

            if(element.addEventListener) {
                element.addEventListener(eventName, callBack, !!useCapture);
            } else {
                element.attachEvent('on' + eventName, callBack);
            }
            return callBack;
        }
    },

    /**
     * Attaches an event to a selector or array of elements.
     *
     * Requires Ink.Dom.Selector or a browser with Element.querySelectorAll.
     *
     * Ink.Dom.Event.observe
     *
     * @method observeMulti
     * @param {Array|String} elements
     * @param ... See the `observe` function.
     * @return {Function} The used callback.
     */
    observeMulti: function (elements, eventName, callBack, useCapture) {
        if (typeof elements === 'string') {
            elements = Ink.ss(elements);
        } else if (elements instanceof Element) {
            elements = [elements];
        }
        if (!elements[0]) { return false; }

        var callbackForCustomEvents = this._callbackForCustomEvents(elements[0], eventName, callBack);
        if (callbackForCustomEvents) {
            callBack = callbackForCustomEvents;
            eventName = 'dataavailable';
        }

        for (var i = 0, len = elements.length; i < len; i++) {
            this.observe(elements[i], eventName, callBack, useCapture);
        }
        return callBack;
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
    stopObserving: function(element, eventName, callBack, useCapture)
    {
        element = Ink.i(element);

        if(element !== null && element !== undefined) {
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
            x: ev.pageX || (ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
            y: ev.pageY || (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
        };
    },

    /**
     * @method pointerX
     * @param {Object} ev event object
     * @return {Number} mouse X position
     */
    pointerX: function(ev)
    {
        return ev.pageX || (ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    },

    /**
     * @method pointerY
     * @param {Object} ev event object
     * @return {Number} mouse Y position
     */
    pointerY: function(ev)
    {
        return ev.pageY || (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
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
            }
            else if(ev.type.substring(0,5) === 'touch' && ev.button === null){
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

return Event;

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
    /*jshint forin:false, eqnull:true*/
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
        init: function()
        {
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
        setDimensions: function()
        {
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
        setReferrer: function()
        {
            this.referrer = document.referrer !== undefined? document.referrer.length > 0 ? window.escape(document.referrer) : false : false;
        },

        /**
         * Detects the browser and stores the found properties. Called automatically when this module is loaded.
         *
         * @method detectBrowser
         * @public
         */
        detectBrowser: function()
        {
            var sAgent = navigator.userAgent;

            this.userAgent = sAgent;

            sAgent = sAgent.toLowerCase();

            if((new RegExp("applewebkit\/")).test(sAgent)) {

                if((new RegExp("chrome\/")).test(sAgent)) {
                    // Chrome
                    this.CHROME = true;
                    this.model = 'chrome';
                    this.version = sAgent.replace(new RegExp("(.*)chrome\/([^\\s]+)(.*)"), "$2");
                    this.cssPrefix = '-webkit-';
                    this.domPrefix = 'Webkit';
                } else {
                    // Safari
                    this.SAFARI = true;
                    this.model = 'safari';
                    this.version = sAgent.replace(new RegExp("(.*)applewebkit\/([^\\s]+)(.*)"), "$2");
                    this.cssPrefix = '-webkit-';
                    this.domPrefix = 'Webkit';
                }
            } else if((new RegExp("opera")).test(sAgent)) {
                // Opera
                this.OPERA = true;
                this.model = 'opera';
                this.version = sAgent.replace(new RegExp("(.*)opera.([^\\s$]+)(.*)"), "$2");
                this.cssPrefix = '-o-';
                this.domPrefix = 'O';
            } else if((new RegExp("konqueror")).test(sAgent)) {
                // Konqueror
                this.KONQUEROR = true;
                this.model = 'konqueror';
                this.version = sAgent.replace(new RegExp("(.*)konqueror\/([^;]+);(.*)"), "$2");
                this.cssPrefix = '-khtml-';
                this.domPrefix = 'Khtml';
            } else if((new RegExp("msie\\ ")).test(sAgent)) {
                // MSIE
                this.IE = true;
                this.model = 'ie';
                this.version = sAgent.replace(new RegExp("(.*)\\smsie\\s([^;]+);(.*)"), "$2");
                this.cssPrefix = '-ms-';
                this.domPrefix = 'ms';
            } else if((new RegExp("gecko")).test(sAgent)) {
                // GECKO
                // Supports only:
                // Camino, Chimera, Epiphany, Minefield (firefox 3), Firefox, Firebird, Phoenix, Galeon,
                // Iceweasel, K-Meleon, SeaMonkey, Netscape, Songbird, Sylera,
                this.GECKO = true;
                var re = new RegExp("(camino|chimera|epiphany|minefield|firefox|firebird|phoenix|galeon|iceweasel|k\\-meleon|seamonkey|netscape|songbird|sylera)");
                if(re.test(sAgent)) {
                    this.model = sAgent.match(re)[1];
                    this.version = sAgent.replace(new RegExp("(.*)"+this.model+"\/([^;\\s$]+)(.*)"), "$2");
                    this.cssPrefix = '-moz-';
                    this.domPrefix = 'Moz';
                } else {
                    // probably is mozilla
                    this.model = 'mozilla';
                    var reVersion = new RegExp("(.*)rv:([^)]+)(.*)");
                    if(reVersion.test(sAgent)) {
                        this.version = sAgent.replace(reVersion, "$2");
                    }
                    this.cssPrefix = '-moz-';
                    this.domPrefix = 'Moz';
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
        debug: function()
        {
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
        parseUrl: function(url)
        {
            var aURL = {};
            if(url && typeof(url) !== 'undefined' && typeof(url) === 'string') {
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
                    var regPort = new RegExp("^(.*)\\:(\\d+)$","i");
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
 * @module Ink.Util.Swipe_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.Util.Swipe', '1', ['Ink.Dom.Event_1'], function(Event) {

    'use strict';

    /**
     * Subscribe swipe gestures!
     * Supports filtering swipes be any combination of the criteria supported in the options.
     *
     * @class Ink.Util.Swipe
     * @constructor
     * @version 1
     *
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options for the Swipe detection
     *     @param {Function}  [options.callback]        Function to be called when a swipe is detected. Default is undefined.
     *     @param {Number}    [options.forceAxis]       Specify in which axis the swipe will be detected (x or y). Default is both.
     *     @param {Number}    [options.maxDist]         maximum allowed distance, in pixels
     *     @param {Number}    [options.maxDuration]     maximum allowed duration, in seconds
     *     @param {Number}    [options.minDist]         minimum allowed distance, in pixels
     *     @param {Number}    [options.minDuration]     minimum allowed duration, in seconds
     *     @param {Boolean}   [options.stopEvents]      Flag that specifies if it should stop events. Default is true.
     *     @param {Boolean}   [options.storeGesture]    Stores the gesture to be used for other purposes.
     */
    var Swipe = function(el, options) {

        this._options = Ink.extendObj({
            callback:       undefined,
            forceAxis:      undefined,       // x | y
            maxDist:        undefined,
            maxDuration:    undefined,
            minDist:        undefined,      // in pixels
            minDuration:    undefined,      // in seconds
            stopEvents:     true,
            storeGesture:   false
        }, options || {});

        this._handlers = {
            down: Ink.bindEvent(this._onDown, this),
            move: Ink.bindEvent(this._onMove, this),
            up:   Ink.bindEvent(this._onUp, this)
        };

        this._element = Ink.i(el);

        this._init();

    };

    Swipe._supported = ('ontouchstart' in document.documentElement);

    Swipe.prototype = {

        /**
         * Initialization function. Called by the constructor.
         *
         * @method _init
         * @private
         */
        _init: function() {
            var db = document.body;
            Event.observe(db, 'touchstart', this._handlers.down);
            if (this._options.storeGesture) {
                Event.observe(db, 'touchmove', this._handlers.move);
            }
            Event.observe(db, 'touchend', this._handlers.up);
            this._isOn = false;
        },

        /**
         * Function to compare/get the parent of an element.
         *
         * @method _isMeOrParent
         * @param {DOMElement} el Element to be compared with its parent
         * @param {DOMElement} parentEl Element to be compared used as reference
         * @return {DOMElement|Boolean} ParentElement of el or false in case it can't.
         * @private
         */
        _isMeOrParent: function(el, parentEl) {
            if (!el) {
                return;
            }
            do {
                if (el === parentEl) {
                    return true;
                }
                el = el.parentNode;
            } while (el);
            return false;
        },

        /**
         * MouseDown/TouchStart event handler
         *
         * @method _onDown
         * @param {EventObject} ev window.event object
         * @private
         */

        _onDown: function(ev) {
            if (event.changedTouches.length !== 1) { return; }
            if (!this._isMeOrParent(ev.target, this._element)) { return; }


            if( this._options.stopEvents === true ){
                Event.stop(ev);
            }
            ev = ev.changedTouches[0];
            this._isOn = true;
            this._target = ev.target;

            this._t0 = new Date().valueOf();
            this._p0 = [ev.pageX, ev.pageY];

            if (this._options.storeGesture) {
                this._gesture = [this._p0];
                this._time    = [0];
            }

        },

        /**
         * MouseMove/TouchMove event handler
         *
         * @method _onMove
         * @param {EventObject} ev window.event object
         * @private
         */
        _onMove: function(ev) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }
            if( this._options.stopEvents === true ){
                Event.stop(ev);
            }
            ev = ev.changedTouches[0];
            var t1 = new Date().valueOf();
            var dt = (t1 - this._t0) * 0.001;
            this._gesture.push([ev.pageX, ev.pageY]);
            this._time.push(dt);
        },

        /**
         * MouseUp/TouchEnd event handler
         *
         * @method _onUp
         * @param {EventObject} ev window.event object
         * @private
         */
        _onUp: function(ev) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }

            if (this._options.stopEvents) {
                Event.stop(ev);
            }
            ev = ev.changedTouches[0];   // TODO SHOULD CHECK IT IS THE SAME TOUCH
            this._isOn = false;

            var t1 = new Date().valueOf();
            var p1 = [ev.pageX, ev.pageY];
            var dt = (t1 - this._t0) * 0.001;
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
            if (o.forceAxis   && axis !== o.forceAxis) {   return; }

            var O = {
                upEvent:   ev,
                elementId: this._element.id,
                duration:  dt,
                dr:        dr,
                dist:      dist,
                axis:      axis,
                target:    this._target
            };

            if (this._options.storeGesture) {
                O.gesture = this._gesture;
                O.time    = this._time;
            }

            this._options.callback(this, O);
        }

    };

    return Swipe;

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
                        cleanedTag = InkUtilString.trim(aAllowed[i].replace(/(\<|\>)/g, '').replace(/\s/, ''));
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
                return string.replace(/\<[^\>]+\>/g, '');
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
        utf8Encode: function(string)
        {
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
        utf8Decode: function(utfstring)
        {
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
            return str != null ? String(str).replace(/[<>&'"]/g,function(c){return chars[c];}) : str;
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
            return str != null ? InkUtilString.trim(String(str).replace(/\s+/g,' ')) : str;
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
        toUnicode: function(str)
        {
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
                            inInt == 8 ||
                            inInt == 9 ||
                            inInt == 10 ||
                            inInt == 12 ||
                            inInt == 13 ||
                            inInt == 32 ||
                            inInt == 34 ||
                            inInt == 47 ||
                            inInt == 58 ||
                            inInt == 92) {

                        /*
                        if(inInt == 34 || inInt == 92 || inInt == 47) {
                            theUnicode = '\\'+str.charAt(i);
                        } else {
                        }
                        */
                        if(inInt == 8) {
                            theUnicode = '\\b';
                        } else if(inInt == 9) {
                            theUnicode = '\\t';
                        } else if(inInt == 10) {
                            theUnicode = '\\n';
                        } else if(inInt == 12) {
                            theUnicode = '\\f';
                        } else if(inInt == 13) {
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

    var date_toISOString = Date.prototype.toISOString ?
        Ink.bind(function_call, Date.prototype.toISOString) :
        function(date) {
            // Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
            return date.getUTCFullYear()
                + '-' + twoDigits( date.getUTCMonth() + 1 )
                + '-' + twoDigits( date.getUTCDate() )
                + 'T' + twoDigits( date.getUTCHours() )
                + ':' + twoDigits( date.getUTCMinutes() )
                + ':' + twoDigits( date.getUTCSeconds() )
                + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
                + 'Z';
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
                throw ''
                return '"' + this._escape(date_toISOString(param)) + '"';
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

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        }
    };

    return InkJson;
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
                             pars[ (idx++) + ( isObj ? 1 : 0 ) ]
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
            /*jshint maxcomplexity:50 */
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
            var date;
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

            date = year + '-' + ( month + 1 ) + '-' + day + ' ';

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

            return new Date( date + hour + ':' + min + ':' + sec + '.' + msec + gmt );
        }
    };


    return InkDate;

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
            unicodePunctuation: ['\u0021-\u002F', '\u003A-\u0040', '\u005B-\u0060', '\u007B-\u007E', '\u00A1-\u00BF', '\u00D7', '\u00F7', '\u2000-\u206F', '\u2E00-\u2E7F', '\u3000-\u303F'],
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
         *  @param  [options.decimalPlaces=0]   Maximum number of decimal places. `0` means integer number.
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
                    return split
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
            else if ( typeof creditCardType === 'array' ){
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