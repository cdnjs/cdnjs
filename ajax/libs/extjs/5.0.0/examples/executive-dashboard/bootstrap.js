// @tag core
// @define Ext.Boot
// @define Ext


// here, the extra check for window['Ext'] is needed for use with cmd-test
// code injection.  we need to make that this file will sync up with page global
// scope to avoid duplicate Ext.Boot state.  That check is after the initial Ext check
// to allow the sandboxing template to inject an appropriate Ext var and prevent the
// global detection.
var Ext = Ext || window['Ext'] || {};

//<editor-fold desc="Boot">
/*
 * @class Ext.Boot
 * @singleton
 */
Ext.Boot = Ext.Boot || (function (emptyFn) {

    var doc = document,
        _config = {
            /*
             * @cfg {Boolean} [disableCaching=true]
             * If `true` current timestamp is added to script URL's to prevent caching.
             * In debug builds, adding a "cache" or "disableCacheBuster" query parameter
             * to the page's URL will set this to `false`.
             */
            disableCaching:
                (/[?&](?:cache|disableCacheBuster)\b/i.test(location.search) ||
                    (location.href.substring(0,5) === 'file:') ||
                    /(^|[ ;])ext-cache=1/.test(doc.cookie)) ? false :
                    true,

            /*
             * @cfg {String} [disableCachingParam="_dc"]
             * The query parameter name for the cache buster's timestamp.
             */
            disableCachingParam: '_dc',

            /*
             * @cfg {Boolean} loadDelay
             * Millisecond delay between asynchronous script injection (prevents stack
             * overflow on some user agents) 'false' disables delay but potentially
             * increases stack load.
             */
            loadDelay: false,

            /*
             * @cfg {Boolean} preserveScripts
             * `false` to remove asynchronously loaded scripts, `true` to retain script
             * element for browser debugger compatibility and improved load performance.
             */
            preserveScripts: true,

            /*
             * @cfg {String} charset
             * Optional charset to specify encoding of dynamic content.
             */
            charset: undefined
        },

    // The request object currently being processed
        _currentRequest,

    // A queue of requests which arrived during the time that an "exclusive" load was being processed.
        _suspendedQueue = [],

    // Keyed by absolute URL this object holds "true" if that URL is already loaded
    // or an array of callbacks to call once it loads.
        _items = {
            /*
             'http://foo.com/bar/baz/Thing.js': {
             done: true,
             el: scriptEl || linkEl,
             preserve: true,
             requests: [ request1, ... ]
             }
             */
        },
        cssRe = /\.css(?:\?|$)/i,
        pathTailRe = /\/[^\/]*$/,
        resolverEl = doc.createElement('a'),
        isBrowser = typeof window !== 'undefined',
        _environment = {
            browser: isBrowser,
            node: !isBrowser && (typeof require === 'function'),
            phantom: (typeof phantom !== 'undefined' && phantom.fs)
        },
        _listeners = [],

    // track new entries as they are created, used to fire onBootReady listeners
        _entries = 0,

    // when loadSync is called, need to cause subsequent load requests to also be loadSync,
    // eg, when Ext.require(...) is called
        _syncMode = 0;

    var Boot = {
        loading: 0,

        loaded: 0,

        env: _environment,

        /*
         * Configuration
         * @private
         */
        config: _config,

        /*
         * @private
         * @property
         */
        scripts: _items,

        /*
         * contains the current script name being loaded
         * (loadSync or sequential load only)
         */
        currentFile: null,

        /*
         * This method returns a canonical URL for the given URL.
         *
         * For example, the following all produce the same canonical URL (which is the
         * last one):
         *
         *      http://foo.com/bar/baz/zoo/derp/../../goo/Thing.js?_dc=12345
         *      http://foo.com/bar/baz/zoo/derp/../../goo/Thing.js
         *      http://foo.com/bar/baz/zoo/derp/../jazz/../../goo/Thing.js
         *      http://foo.com/bar/baz/zoo/../goo/Thing.js
         *      http://foo.com/bar/baz/goo/Thing.js
         *
         * @private
         */
        canonicalUrl: function (url) {
            // @TODO - see if we need this fallback logic
            // http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
            resolverEl.href = url;

            var ret = resolverEl.href,
                dc = _config.disableCachingParam,
                pos = dc ? ret.indexOf(dc + '=') : -1,
                c, end;

            // If we have a _dc query parameter we need to remove it from the canonical
            // URL.
            if (pos > 0 && ((c = ret.charAt(pos - 1)) === '?' || c === '&')) {
                end = ret.indexOf('&', pos);
                end = (end < 0) ? '' : ret.substring(end);
                if (end && c === '?') {
                    ++pos; // keep the '?'
                    end = end.substring(1); // remove the '&'
                }
                ret = ret.substring(0, pos - 1) + end;
            }

            return ret;
        },

        init: function () {
            var scriptEls = doc.getElementsByTagName('script'),
                len = scriptEls.length,
                re = /\/ext(\-[a-z\-]+)?\.js$/,
                entry, script, src, state, baseUrl, key, n;

            // Since we are loading after other scripts, and we needed to gather them
            // anyway, we track them in _scripts so we don't have to ask for them all
            // repeatedly.
            for(n = 0; n < len; n++) {
                src = (script = scriptEls[n]).src;
                if (!src) {
                    continue;
                }
                state = script.readyState || null;

                // If we find a script file called "ext-*.js", then the base path is that file's base path.
                if (!baseUrl) {
                    if (re.test(src)) {
                        Boot.hasAsync = ("async" in script) || !('readyState' in script);
                        baseUrl = src;
                    }
                }

                if (!_items[key = Boot.canonicalUrl(src)]) {
                    _items[key] = entry = {
                        key: key,
                        url: src,
                        done: state === null ||  // non-IE
                            state === 'loaded' || state === 'complete', // IE only
                        el: script,
                        prop: 'src'
                    };

                    if (!entry.done) { // in IE we can add onreadystatechange
                        Boot.watch(entry);
                    }
                }
            }
            if (!baseUrl) {
                script = scriptEls[scriptEls.length - 1];
                baseUrl = script.src;
                Boot.hasAsync = ("async" in script) || !('readyState' in script);
            }
            Boot.baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
        },

        create: function (url, key) {
            var css = url && cssRe.test(url),
                el = doc.createElement(css ? 'link' : 'script'),
                prop;

            if (css) {
                el.rel = 'stylesheet';
                prop = 'href';
            } else {
                el.type = 'text/javascript';
                if (!url) {
                    return el;
                }
                prop = 'src';

                if(Boot.hasAsync) {
                    el.async = false;
                }
            }

            key = key || url;
            return _items[key] = {
                key: key,
                url: url,
                css: css,
                done: false,
                el: el,
                prop: prop,
                loaded: false,
                evaluated: false
            };
        },

        /*
         * Get the config value corresponding to the specified name. If no name is given, will return the config object
         * @param {String} name The config property name
         * @return {Object}
         */
        getConfig: function(name) {
            return name ? _config[name] : _config;
        },

        /*
         * Set the configuration.
         * @param {Object} config The config object to override the default values.
         * @return {Ext.Boot} this
         */
        setConfig: function (name, value) {
            if (typeof name === 'string') {
                _config[name] = value;
            } else {
                for (var s in name) {
                    Boot.setConfig(s, name[s]);
                }
            }

            return Boot;
        },

        getHead: function () {
            return Boot.docHead ||
                (Boot.docHead = doc.head ||
                    doc.getElementsByTagName('head')[0]);
        },

        inject: function (content, url, asset) {
            var head = Boot.getHead(),
                base, el, css = false, key = Boot.canonicalUrl(url),
                entry;

            if (cssRe.test(url)) {
                css = true;
                el = doc.createElement('style');
                el.type = 'text/css';
                el.textContent = content;

                if (asset) {
                    if ('id' in asset) {
                        el.id = asset.id;
                    }

                    if ('disabled' in asset) {
                        el.disabled = asset.disabled;
                    }
                }

                base = doc.createElement('base');
                base.href = key.replace(pathTailRe, '/');
                head.appendChild(base);
                head.appendChild(el);
                head.removeChild(base);
            } else {
                // Debugger friendly, file names are still shown even though they're 
                // eval'ed code. Breakpoints work on both Firebug and Chrome's Web
                // Inspector.
                if (url) {
                    content += "\n//# sourceURL=" + key;
                }
                Ext.globalEval(content);
            }

            entry = _items[key] || (_items[key] = {
                key: key,
                css: css,
                url: url,
                el: el
            });
            entry.done = true;
            return entry;
        },

        /*
         * This method loads the specified scripts or CSS files and calls either the
         * given `success` callback when all of the files have successfully loaded or the
         * `failure` callback should any fail to load.
         *
         *      Ext.Boot.load({
         *          url: 'http://foo.com/bar/Thing.js',
         *          
         *          success: function () {
         *          },
         *          
         *          failure: function () {
         *          },
         *          
         *          scope: this
         *      });
         *
         *      Ext.Boot.load({
         *          url: [
         *              'http://foo.com/bar/baz/Goo.js',
         *              'http://foo.com/bar/Thing.js'
         *          ],
         *          charset: 'utf-8',
         *          cache: false, // add "cache buster"
         *          
         *          success: function () {
         *          },
         *          
         *          failure: function () {
         *          },
         *          
         *          scope: this,
         *          prependBaseUrl: false
         *      });
         *
         * @param {Object} request The load request object. **IMPORTANT:** This object
         * should not be reused by the caller as it is used to track the given callbacks
         * until the script loads.
         *
         * @param {Boolean} [request.cache] An override for the cache busting specified by
         * for the script. Overrides the `disableCaching` value passed to `setConfig`.
         *
         * @param {String} [request.charset] The charset for the script. Overrides the
         * default `charset` passed to `setConfig`.
         *
         * @param {Boolean} [request.sync=false] Pass `true` to load scripts synchronously.
         *
         * @param {Function} request.success The function to execute once the script node
         * loads. For IE less than version 9, this function will only once the readyState
         * is `loaded` or `complete`.
         *
         * @param {Function} request.failure The function to execute if the script node
         * fails to load such as a 404 status is returned.
         *
         * @param {Object} [request.scope] The scope with which to call the `success` and
         * `failure` functions.
         *
         * @param {Object} [request.sequential] Load in strict order.
         *
         * @param {boolean} [request.prependBaseUrl] whether to prepend Ext.Boot.baseUrl
         * to the beginning of each url of the request
         *
         * @return {Ext.Boot} this
         */
        load: function (request) {
            if (request.sync || _syncMode) {
                return this.loadSync(request);
            }

            // Allow a raw array of paths to be passed.
            if (!request.url) {
                request = {
                    url: request
                };
            }

            // If there is a request in progress, we must
            // queue this new request to be fired  when the current request completes.
            if (_currentRequest) {
                _suspendedQueue.push(request);
            } else {
                Boot.expandLoadOrder(request);

                var url = request.url,
                    urls = url.charAt ? [ url ] : url,
                    length = urls.length,
                    i;

                // Start the counter here. This is reduced as we notify this fellow of script
                // loads.
                request.urls = urls;
                request.loaded = 0;
                request.loading = length;
                request.charset = request.charset || _config.charset;
                request.buster = (('cache' in request) ? !request.cache : _config.disableCaching) &&
                    (_config.disableCachingParam + '=' + (+new Date()));

                _currentRequest = request;
                request.sequential = false;

                for (i = 0; i < length; ++i) {
                    Boot.loadUrl(urls[i], request);
                }
            }

            return this;
        },

        loadUrl: function(url, request) {
            var entry,
                buster = request.buster,
                charset = request.charset,
                head = Boot.getHead(),
                el, key;

            if (request.prependBaseUrl) {
                url = Boot.baseUrl + url;
            }

            if (request.sequential) {
                Boot.currentFile = url;
            } else {
                Boot.currentFile = null;
            }

            key = Boot.canonicalUrl(url);
            if (!(entry = _items[key])) {
                // we're creating a new entry;
                _entries++;

                // Not already loaded or loading, so we need to create a new script
                // element and tracking entry.
                entry = Boot.create(url, key);
                el = entry.el;
                if (!entry.css && charset) {
                    el.charset = charset;
                }
                entry.requests = [request];

                Boot.watch(entry);

                if (buster) {
                    // Check for the presence of a querystring.
                    url += (url.indexOf('?') === -1 ? '?' : '&') + buster;
                }

                if(!Boot.hasAsync && !entry.css) {
                    entry.loaded = false;
                    entry.evaluated = false;

                    var onLoadWas,
                        newOnLoad = function() {
                            entry.loaded = true;
                            var rurls = request.urls,
                                rlen = rurls.length, r, e, k;
                            for(r = 0; r < rlen; r++) {
                                k = Boot.canonicalUrl(rurls[r]);
                                e = _items[k];
                                if(e) {
                                    if(!e.loaded) {
                                        return;
                                    } else if(!e.evaluated) {
                                        head.appendChild(e.el);
                                        e.evaluated = true;
                                        e.onLoadWas.apply(e.el, arguments);
                                    }
                                }
                            }
                        };
                    /*
                     * When available (IE9m), we need to use the onreadystatechange / readyState
                     * mechanism to monitor script load and cause script evaluation by appending 
                     * elements to the document.  Modern browsers use the onload mechanism.
                     */
                    if (!('readyState' in el)) {
                        onLoadWas = el.onload;
                        el.onload = newOnLoad;
                    } else {
                        // IE9m Compatability
                        onLoadWas = el.onreadystatechange;
                        el.onreadystatechange = function() {
                            if (this.readyState === 'loaded' || this.readyState === 'complete') {
                                newOnLoad.apply(this, arguments);
                            }
                        };
                    }

                    entry.onLoadWas = onLoadWas;
                    el[entry.prop] = url; // IE starts loading scripts here  
                } else {
                    el[entry.prop] = url; // IE starts loading scripts here  
                    head.appendChild(el); // others start loading here
                }
            }
            else if (entry.done) {
                Boot.notify(entry, request);
            }
            // If the script is already in the document, we must assume we are here
            // because whatever was in the script seemed to be not present... which
            // should mean that the script is loading at this time. Sadly, only IE
            // and its readyState property can tell us the truth of the matter. In
            // standards browsers we have no way to know.
            else if (entry.requests) {
                entry.requests.push(request);
            }
            else {
                entry.requests = [ request ];
            }
        },

        loadSequential: function(request) {
            if(!request.url) {
                request = {
                    url: request
                }
            }
            request.sequential = true;
            Boot.load(request);
        },

        loadSequentialBasePrefix: function(request) {
            if(!request.url) {
                request = {
                    url: request
                };
            }
            request.prependBaseUrl = true;
            Boot.loadSequential(request);
        },

        fetchSync: function(url) {
            var exception, xhr, status, content;

            exception = false;
            xhr = new XMLHttpRequest();

            try {
                xhr.open('GET', url, false);
                xhr.send(null);
            } catch (e) {
                exception = true;
            }

            status = (xhr.status === 1223) ? 204 :
                (xhr.status === 0 && ((self.location || {}).protocol === 'file:' ||
                    (self.location || {}).protocol === 'ionp:')) ? 200 : xhr.status;
            content = xhr.responseText;

            xhr = null; // Prevent potential IE memory leak

            return {
                content: content,
                exception: exception,
                status: status
            };


        },

        /*
         * Performs the load of scripts synchronously.
         * @param {type} request
         * @return {Ext.Boot} this
         * @private
         */
        loadSync: function (request) {
            _syncMode++;
            var request = Boot.expandLoadOrder(request.url ? request : {url: request}),
                url = request.url,
                urls = url.charAt ? [ url ] : url,
                length = urls.length,
                buster = _config.disableCaching &&
                    ('?' + _config.disableCachingParam + '=' + (+new Date())),
                content, entry, i, key, status, exception;

            // Start the counter here. This is reduced as we notify this fellow of script
            // loads.
            request.loading = length;
            request.urls = urls;
            request.loaded = 0;

            // create a pseudo entry value to keep the listeners from firing until
            // after the loop is complete
            _entries++;

            for (i = 0; i < length; ++i) {
                url = urls[i];
                if (request.prependBaseUrl) {
                    url = Boot.baseUrl + url;
                }
                Boot.currentFile = url;

                key = Boot.canonicalUrl(url);
                if (!(entry = _items[key])) {
                    // we're creating a new entry
                    _entries++;

                    _items[key] = entry = {
                        key: key,
                        url: url,
                        done: false,
                        requests: [request],
                        el: null
                    };
                } else {
                    // We already have a script tag for this URL... if it is still loading
                    // we need to boot it out and load synchronously.
                    if (entry.done) {
                        Boot.notify(entry, request);
                        continue;
                    }
                    if (entry.el) {
                        entry.preserve = false;
                        Boot.cleanup(entry);
                    }

                    if (entry.requests) {
                        entry.requests.push(request);
                    } else {
                        entry.requests = [request];
                    }
                }

                entry.sync = true;

                if (buster) {
                    url += buster;
                }

                ++Boot.loading;


                content = Boot.fetchSync(url);
                entry.done = true;

                exception = content.exception;
                status = content.status;
                content = content.content || '';

                if ((exception || status === 0) && !_environment.phantom) {
                    entry.error =
                            true;
                }
                else if ((status >= 200 && status < 300) || status === 304
                    || _environment.phantom
                    || (status === 0 && content.length > 0)
                    ) {
                    Boot.inject(content, url);
                }
                else {
                    entry.error =
                            true;
                }

                Boot.notifyAll(entry);
            }
            _syncMode--;

            // once the loop is complete, we can attempt to fire any pending listeners
            _entries--;
            Boot.fireListeners();
            Boot.currentFile = null;
            return this;
        },

        loadSyncBasePrefix: function(request) {
            if(!request.url) {
                request = {
                    url: request
                };
            }
            request.prependBaseUrl = true;
            Boot.loadSync(request);
        },

        notify: function (entry, request) {
            if (request.preserve) {
                // If one listener explicitly passes preserve:true we honor it.
                entry.preserve = true;
            }

            ++request.loaded;


            if (entry.error) {
                (request.errors || (request.errors = [])).push(entry);
            }

            if (! --request.loading) {
                // There is no current request, new load calls can go ahead.
                _currentRequest = null;

                var errors = request.errors,
                    fn = request[errors ? 'failure' : 'success'],
                    delay = ('delay' in request) ? request.delay :
                        (errors ? 1 : _config.chainDelay),
                    scope = request.scope || request;

                // If there were queued requests which arrived during the time this request was processing
                // Fire them off now.
                if (_suspendedQueue.length) {
                    Boot.load(_suspendedQueue.shift());
                }

                if (fn) {
                    if (delay === 0 || delay > 0) {
                        // Free the stack (and defer the next script)
                        setTimeout(function() {
                            fn.call(scope, request);
                        }, delay);
                    } else {
                        fn.call(scope, request);
                    }
                }

            } else if (!_syncMode && request.sequential && (request.loaded < request.urls.length)) {
                Boot.loadUrl(request.urls[request.loaded], request);
            }
        },

        notifyAll: function (entry) {
            var requests = entry.requests,
                length = requests && requests.length,
                i;

            entry.done = true;
            entry.requests = null;
            --Boot.loading;
            ++Boot.loaded;

            for (i = 0; i < length; ++i) {
                Boot.notify(entry, requests[i]);
            }

            if (!length) {
                entry.preserve = true;
            }

            Boot.cleanup(entry);
            _entries--;
            Boot.fireListeners();
        },

        watch: function (entry) {
            var el = entry.el,
                requests = entry.requests,
                listener = requests && requests[0],
                onLoadFn = function () {
                    if (!entry.done) {
                        Boot.notifyAll(entry);
                    }
                };

            el.onerror = function () {
                entry.error = true;
                Boot.notifyAll(entry);
            };

            entry.preserve = (listener && ('preserve' in listener))
                ? listener.preserve : _config.preserveScripts;

            /*
             * When available (IE9m), we need to use the onreadystatechange / readyState
             * mechanism to monitor script load and cause script evaluation by appending 
             * elements to the document.  Modern browsers use the onload mechanism.
             */
            if (!('readyState' in el)) {
                el.onload = onLoadFn;
            } else {
                // IE9m Compatability
                el.onreadystatechange = function() {
                    if (this.readyState === 'loaded' || this.readyState === 'complete') {
                        onLoadFn();
                    }
                };
            }

            ++Boot.loading;
        },

        /*
         * @private
         */
        cleanup: function (entry) {
            var el = entry.el,
                prop;

            if(!el) {
                return;
            }

            if (!entry.preserve) {
                entry.el = null;

                el.parentNode.removeChild(el); // Remove, since its useless now

                for (prop in el) {
                    try {
                        if (prop !== entry.prop) {
                            // If we set the src property to null IE
                            // will try and request a script at './null'
                            el[prop] = null;
                        }
                        delete el[prop];      // and prepare for GC
                    } catch (cleanEx) {
                        //ignore
                    }
                }
            }

            // Setting to null can cause exceptions if IE ever needs to call these
            // again (like onreadystatechange). This emptyFn has nothing locked in
            // closure scope so it is about as safe as null for memory leaks.
            el.onload = el.onerror = el.onreadystatechange = emptyFn;
        },

        fireListeners: function() {
            var listener;
            while(!_entries && (listener = _listeners.shift())) {
                listener();
            }
        },

        onBootReady: function(listener) {
            if (!_entries) {
                listener();
            } else {
                _listeners.push(listener);
            }
        },

        /*
         * @private
         * @param manifest
         * @returns {*}
         */
        createLoadOrderMap: function(loadOrder) {
            var len = loadOrder.length,
                loadOrderMap = {},
                i, element;

            for(i = 0; i < len; i++) {
                element = loadOrder[i];
                loadOrderMap[element.path] = element;
            }

            return loadOrderMap;
        },

        /*
         * @private
         * @param index
         * @param indexMap
         * @returns {{}}
         */
        getLoadIndexes: function(index, indexMap, loadOrder, includeUses, skipLoaded) {
            var item = loadOrder[index],
                len, i, reqs, key, entry, stop, added, idx, ridx;

            if(indexMap[index]) {
                // prevent cycles
                return indexMap;
            }

            indexMap[index] = true;

            stop = false;
            while(!stop) {
                added = false;

                // iterate the requirements for each index and 
                // accumulate in the index map
                for(idx in indexMap) {
                    if(indexMap.hasOwnProperty(idx)) {
                        item = loadOrder[idx];
                        if(!item) {
                            continue;
                        }
                        key = Boot.canonicalUrl(item.path);
                        entry = _items[key];
                        if(!skipLoaded || !entry || !entry.done) {
                            reqs = item.requires;
                            if(includeUses && item.uses) {
                                reqs = reqs.concat(item.uses);
                            }
                            for(len = reqs.length, i = 0; i < len; i++) {
                                ridx = reqs[i];
                                // if we find a requirement that wasn't 
                                // already in the index map, 
                                // set the added flag to indicate we need to 
                                // reprocess
                                if(!indexMap[ridx]) {
                                    indexMap[ridx] = true;
                                    added = true;
                                }
                            }
                        }
                    }
                }

                // if we made a pass through the index map and didn't add anything
                // then we can stop
                if(!added) {
                    stop = true;
                }
            }

            return indexMap;
        },

        getPathsFromIndexes: function(indexMap, loadOrder) {
            var indexes = [],
                paths = [],
                index, len, i;

            for(index in indexMap) {
                if(indexMap.hasOwnProperty(index) && indexMap[index]) {
                    indexes.push(index);
                }
            }

            indexes.sort(function(a, b){
                return a-b;
            });

            // convert indexes back into load paths
            for (len = indexes.length, i = 0; i < len; i++) {
                paths.push(loadOrder[indexes[i]].path);
            }

            return paths;
        },

        /*
         * @private
         * @param url
         * @returns {Array}
         */
        expandUrl: function(url, loadOrder, loadOrderMap, indexMap, includeUses, skipLoaded) {
            if(typeof url == 'string') {
                url = [url];
            }

            if(loadOrder) {
                loadOrderMap = loadOrderMap || Boot.createLoadOrderMap(loadOrder);
                indexMap = indexMap || {};
                var len = url.length,
                    unmapped = [],
                    i, item;

                for(i = 0; i < len; i++) {
                    item = loadOrderMap[url[i]];
                    if(item) {
                        Boot.getLoadIndexes(item.idx, indexMap, loadOrder, includeUses, skipLoaded);
                    } else {
                        unmapped.push(url[i]);
                    }
                }



                return Boot.getPathsFromIndexes(indexMap, loadOrder).concat(unmapped);
            }
            return url;
        },

        expandUrls: function(urls, loadOrder, loadOrderMap, includeUses) {
            if(typeof urls == "string") {
                urls = [urls];
            }

            var expanded = [],
                len = urls.length,
                i;

            for(i = 0; i < len; i++) {
                expanded = expanded.concat(
                    Boot.expandUrl(urls[i], loadOrder, loadOrderMap, {}, includeUses, true));
            }

            if(expanded.length == 0) {
                expanded = urls;
            }

            return expanded;
        },

        /*
         * @private
         */
        expandLoadOrder: function(request) {
            var urls = request.url,
                loadOrder = request.loadOrder,
                loadOrderMap = request.loadOrderMap,
                expanded;

            if(!request.expanded) {
                expanded = Boot.expandUrls(urls, loadOrder, loadOrderMap);
                request.expanded = true;
            } else {
                expanded = urls;
            }

            request.url = expanded;

            // if we added some urls to the request to honor the indicated
            // load order, the request needs to be sequential
            if(urls.length != expanded.length) {
                request.sequential = true;
            }

            return request;
        }
    };

    /*
     * Turns on or off the "cache buster" applied to dynamically loaded scripts. Normally
     * dynamically loaded scripts have an extra query parameter appended to avoid stale
     * cached scripts. This method can be used to disable this mechanism, and is primarily
     * useful for testing. This is done using a cookie.
     * @param {Boolean} disable True to disable the cache buster.
     * @param {String} [path="/"] An optional path to scope the cookie.
     */
    Ext.disableCacheBuster = function (disable, path) {
        var date = new Date();
        date.setTime(date.getTime() + (disable ? 10*365 : -1) * 24*60*60*1000);
        date = date.toGMTString();
        doc.cookie = 'ext-cache=1; expires=' + date + '; path='+(path || '/');
    };


    Boot.init();
    return Boot;

// NOTE: We run the eval at global scope to protect the body of the function and allow
// compressors to still process it.
}(function() {}));//(eval("/*@cc_on!@*/!1"));

/*
 * This method evaluates the given code free of any local variable. In some browsers this
 * will be at global scope, in others it will be in a function.
 * @parma {String} code The code to evaluate.
 * @private
 * @method
 */
Ext.globalEval = this.execScript
    ? function(code) {
    execScript(code);
}
    : function($$code) {
    // IMPORTANT: because we use eval we cannot place this in the above function or it
    // will break the compressor's ability to rename local variables...
    (function(){
        // This var should not be replaced by the compressor. We need to do this so
        // that Ext refers to the global Ext, if we're sandboxing it may
        // refer to the local instance inside the closure
        var Ext = this.Ext;
        eval($$code);
    }());
};

/*
 * Only IE8 & IE/Quirks lack Function.prototype.bind so we polyfill that here.
 */
if (!Function.prototype.bind) {
    (function () {
        var slice = Array.prototype.slice,
        // To reduce overhead on call of the bound fn we have two flavors based on
        // whether we have args to prepend or not:
            bind = function (me) {
                var args = slice.call(arguments, 1),
                    method = this;

                if (args.length) {
                    return function () {
                        var t = arguments;
                        // avoid the slice/concat if the caller does not supply args
                        return method.apply(me, t.length ? args.concat(slice.call(t)) : args);
                    };
                }
                // this is the majority use case - just fn.bind(this) and no args

                args = null;
                return function () {
                    return method.apply(me, arguments);
                };
            };
        Function.prototype.bind = bind;
        bind.$extjs = true; // to detect this polyfill if one want to improve it
    }());
}

//</editor-fold>

// here, the extra check for window['Ext'] is needed for use with cmd-test
// code injection.  we need to make that this file will sync up with page global
// scope to avoid duplicate Ext.Boot state.  That check is after the initial Ext check
// to allow the sandboxing template to inject an appropriate Ext var and prevent the
// global detection.
var Ext = Ext || window['Ext'] || {};


//<editor-fold desc="Microloader">
/**
 * @Class Ext.Microloader
 * @singleton
 */
Ext.Microloader = Ext.Microloader || (function () {
    var apply = function (dest, src, defaults) {
            if (defaults) {
                apply(dest, defaults);
            }

            if (dest && src && typeof src == 'object') {
                for (var key in src) {
                    dest[key] = src[key];
                }
            }
            return dest;
        },
        Boot = Ext.Boot,
        _listeners = [],
        _loaded = false,
        _tags = {},
        Microloader = {

            /**
             * the global map of tags used
             */
            platformTags: _tags,

            /**
             * The defult function that detects various platforms and sets tags
             * in the platform map accrodingly.  Examples are iOS, android, tablet, etc.
             * @param tags the set of tags to populate
             */
            detectPlatformTags: function () {
                var ua = navigator.userAgent,
                    isMobile = _tags.isMobile = /Mobile(\/|\s)/.test(ua),
                    isPhone, isDesktop, isTablet, touchSupported, isIE10, isBlackberry,
                    element = document.createElement('div'),
                    uaTagChecks = [
                        'iPhone',
                        'iPod',
                        'Android',
                        'Silk',
                        'Android 2',
                        'BlackBerry',
                        'BB',
                        'iPad',
                        'RIM Tablet OS',
                        'MSIE 10',
                        'Trident',
                        'Chrome',
                        'Tizen',
                        'Firefox',
                        'Safari',
                        'Windows Phone'
                    ],
                    isEventSupported = function(name, tag) {
                        if (tag === undefined) {
                            tag = window;
                        }

                        var eventName = 'on' + name.toLowerCase(),
                            isSupported = (eventName in element);

                        if (!isSupported) {
                            if (element.setAttribute && element.removeAttribute) {
                                element.setAttribute(eventName, '');
                                isSupported = typeof element[eventName] === 'function';

                                if (typeof element[eventName] !== 'undefined') {
                                    element[eventName] = undefined;
                                }

                                element.removeAttribute(eventName);
                            }
                        }

                        return isSupported;
                    },
                    uaTags = {},
                    len = uaTagChecks.length, check, c;

                for (c = 0; c < len; c++) {
                    check = uaTagChecks[c];
                    uaTags[check] = new RegExp(check).test(ua);
                }

                isPhone =
                    (uaTags.iPhone || uaTags.iPod) ||
                        (!uaTags.Silk && (uaTags.Android && (uaTags['Android 2'] || isMobile))) ||
                        ((uaTags.BlackBerry || uaTags.BB) && uaTags.isMobile) ||
                        (uaTags['Windows Phone']);

                isTablet =
                    (!_tags.isPhone) && (
                        uaTags.iPad ||
                            uaTags.Android ||
                            uaTags.Silk ||
                            uaTags['RIM Tablet OS'] ||
                            (uaTags['MSIE 10'] && /; Touch/.test(ua))
                        );

                touchSupported =
                    // if the browser has touch events we can be reasonably sure the device has
                    // a touch screen
                    isEventSupported('touchend') ||
                        // browsers that use pointer event have maxTouchPoints > 0 if the
                        // device supports touch input
                        // http://www.w3.org/TR/pointerevents/#widl-Navigator-maxTouchPoints
                        navigator.maxTouchPoints ||
                        // IE10 uses a vendor-prefixed maxTouchPoints property
                        navigator.msMaxTouchPoints;

                isDesktop = !isPhone && !isTablet;
                isIE10 = uaTags['MSIE 10'];
                isBlackberry = uaTags.Blackberry || uaTags.BB;

                apply(_tags, Microloader.loadPlatformsParam(), {
                    phone: isPhone,
                    tablet: isTablet,
                    desktop: isDesktop,
                    touch: touchSupported,
                    ios: (uaTags.iPad || uaTags.iPhone || uaTags.iPod),
                    android: uaTags.Android || uaTags.Silk,
                    blackberry: isBlackberry,
                    safari: uaTags.Safari && isBlackberry,
                    chrome: uaTags.Chrome,
                    ie10: isIE10,
                    windows: isIE10 || uaTags.Trident,
                    tizen: uaTags.Tizen,
                    firefox: uaTags.Firefox
                });

                if (Ext.beforeLoad) {
                    Ext.beforeLoad(_tags);
                }
            },

            /**
             * Extracts user supplied platform tags from the "platformTags" query parameter
             * of the form:
             *
             * ?platformTags=name:state,name:state,...
             *
             * (each tag defaults to true when state is unspecified)
             *
             * Example:
             * ?platformTags=isTablet,isPhone:false,isDesktop:0,iOS:1,Safari:true, ...
             *
             * @returns {Object} the platform tags supplied by the query string
             */
            loadPlatformsParam: function () {
                // Check if the ?platform parameter is set in the URL
                var paramsString = window.location.search.substr(1),
                    paramsArray = paramsString.split("&"),
                    params = {}, i,
                    platforms = {},
                    tmpArray, tmplen, platform, name, enabled;

                for (i = 0; i < paramsArray.length; i++) {
                    tmpArray = paramsArray[i].split("=");
                    params[tmpArray[0]] = tmpArray[1];
                }

                if (params.platformTags) {
                    tmpArray = params.platform.split(/\W/);
                    for (tmplen = tmpArray.length, i = 0; i < tmplen; i++) {
                        platform = tmpArray[i].split(":");
                        name = platform[0];
                        if (platform.length > 1) {
                            enabled = platform[1];
                            if (enabled === 'false' || enabled === '0') {
                                enabled = false;
                            } else {
                                enabled = true;
                            }
                        }
                        platforms[name] = enabled;
                    }
                }
                return platform;
            },

            initPlatformTags: function () {
                Microloader.detectPlatformTags();
            },

            getPlatformTags: function () {
                return Microloader.platformTags;
            },

            filterPlatform: function (platform) {
                platform = [].concat(platform);
                var tags = Microloader.getPlatformTags(),
                    len, p, tag;

                for (len = platform.length, p = 0; p < len; p++) {
                    tag = platform[p];
                    if (tags.hasOwnProperty(tag)) {
                        return !!tags[tag];
                    }
                }
                return false;
            },

            init: function () {
                Microloader.initPlatformTags();
                Ext.filterPlatform = Microloader.filterPlatform;
            },

            initManifest: function (manifest) {
                Microloader.init();
                var tmpManifest = manifest || Ext.manifest;

                if (typeof tmpManifest === "string") {
                    var url = Boot.baseUrl + tmpManifest + ".json",
                        content = Boot.fetchSync(url);
                    tmpManifest = JSON.parse(content.content);
                }

                Ext.manifest = tmpManifest;
                return tmpManifest;
            },

            /**
             *
             * @param manifestDef
             */
            load: function (manifestDef) {
                var manifest = Microloader.initManifest(manifestDef),
                    loadOrder = manifest.loadOrder,
                    loadOrderMap = (loadOrder) ? Boot.createLoadOrderMap(loadOrder) : null,
                    urls = [],
                    js = manifest.js || [],
                    css = manifest.css || [],
                    resources = js.concat(css),
                    resource, i, len, include,
                    loadedFn = function () {
                        _loaded = true;
                        Microloader.notify();
                    };

                for (len = resources.length, i = 0; i < len; i++) {
                    resource = resources[i];
                    include = true;
                    if (resource.platform && !Microloader.filterPlatform(resource.platform)) {
                        include = false;
                    }
                    if (include) {
                        urls.push(resource.path);
                    }
                }


                if (loadOrder) {
                    manifest.loadOrderMap = loadOrderMap;
                }

                Boot.load({
                    url: urls,
                    loadOrder: loadOrder,
                    loadOrderMap: loadOrderMap,
                    sequential: true,
                    success: loadedFn,
                    failure: loadedFn
                });
            },

            onMicroloaderReady: function (listener) {
                if (_loaded) {
                    listener();
                } else {
                    _listeners.push(listener);
                }
            },

            /**
             * @private
             */
            notify: function () {
                var listener;
                while((listener = _listeners.shift())) {
                    listener();
                }
            }
        };

    return Microloader;
}());

//</editor-fold>

/**
 * the current application manifest
 *
 *
 * {
 *  name: 'name',
 *  version: <checksum>,
 *  debug: {
 *      hooks: {
 *          "*": true
 *      }
 *  },
 *  localStorage: false,
 *  mode: production,
 *  js: [
 *      ...
 *      {
 *          path: '../boo/baz.js',
 *          version: <checksum>,
 *          update: full | delta | <falsy>,
 *          platform: ['phone', 'ios', 'android']
 *      },
 *      {
 *          path: 'http://some.domain.com/api.js',
 *          remote: true
 *      },
 *      ...
 *  ],
 *  css: [
 *      ...
 *      {
 *          path: '../boo/baz.css',
 *          version: <checksum>,
 *          update: full | delta | <falsy>,
 *          platform: ['phone', 'ios', 'android']
 *      },
 *      ...
 *  ],
 *  localStorage: false,
 *  paths: {...},
 *  loadOrder: [
 *      ...
 *      {
 *          path: '../foo/bar.js",
 *          idx: 158,
 *          requires; [1,2,3,...,145,157],
 *          uses: [182, 193]
 *      },
 *      ...
 *  ],
 *  classes: {
 *      ...
 *      'Ext.panel.Panel': {
 *          requires: [...],
 *          uses: [...],
 *          aliases: [...],
 *          alternates: [...],
 *          mixins: [...]
 *      },
 *      'Ext.rtl.util.Renderable': {
 *          requires: [...],
 *          uses: [...],
 *          aliases: [...],
 *          alternates: [...],
 *          mixins: [...]
 *          override: 'Ext.util.Renderable'
 *      },
 *      ...
 *  },
 *  packages: {
 *      ...
 *      "sencha-core": {
 *          version: '1.2.3.4',
 *          requires: []
 *      },
 *      "ext": {
 *          version: '5.0.0.0',
 *          requires: ["sencha-core"]
 *      }.
 *      ...
 *  }
 * }
 *
 *
 * @type {String/Object}
 */
Ext.manifest = Ext.manifest || "bootstrap";

Ext.Microloader.load();
