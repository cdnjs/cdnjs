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
_yuitest_coverage["build/router/router.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/router/router.js",
    code: []
};
_yuitest_coverage["build/router/router.js"].code=["YUI.add('router', function (Y, NAME) {","","/**","Provides URL-based routing using HTML5 `pushState()` or the location hash.","","@module app","@submodule router","@since 3.4.0","**/","","var HistoryHash = Y.HistoryHash,","    QS          = Y.QueryString,","    YArray      = Y.Array,","","    win = Y.config.win,","","    // Holds all the active router instances. This supports the static","    // `dispatch()` method which causes all routers to dispatch.","    instances = [],","","    // We have to queue up pushState calls to avoid race conditions, since the","    // popstate event doesn't actually provide any info on what URL it's","    // associated with.","    saveQueue = [],","","    /**","    Fired when the router is ready to begin dispatching to route handlers.","","    You shouldn't need to wait for this event unless you plan to implement some","    kind of custom dispatching logic. It's used internally in order to avoid","    dispatching to an initial route if a browser history change occurs first.","","    @event ready","    @param {Boolean} dispatched `true` if routes have already been dispatched","      (most likely due to a history change).","    @fireOnce","    **/","    EVT_READY = 'ready';","","/**","Provides URL-based routing using HTML5 `pushState()` or the location hash.","","This makes it easy to wire up route handlers for different application states","while providing full back/forward navigation support and bookmarkable, shareable","URLs.","","@class Router","@param {Object} [config] Config properties.","    @param {Boolean} [config.html5] Overrides the default capability detection","        and forces this router to use (`true`) or not use (`false`) HTML5","        history.","    @param {String} [config.root=''] Root path from which all routes should be","        evaluated.","    @param {Array} [config.routes=[]] Array of route definition objects.","@constructor","@extends Base","@since 3.4.0","**/","function Router() {","    Router.superclass.constructor.apply(this, arguments);","}","","Y.Router = Y.extend(Router, Y.Base, {","    // -- Protected Properties -------------------------------------------------","","    /**","    Whether or not `_dispatch()` has been called since this router was","    instantiated.","","    @property _dispatched","    @type Boolean","    @default undefined","    @protected","    **/","","    /**","    Whether or not we're currently in the process of dispatching to routes.","","    @property _dispatching","    @type Boolean","    @default undefined","    @protected","    **/","","    /**","    History event handle for the `history:change` or `hashchange` event","    subscription.","","    @property _historyEvents","    @type EventHandle","    @protected","    **/","","    /**","    Cached copy of the `html5` attribute for internal use.","","    @property _html5","    @type Boolean","    @protected","    **/","","    /**","    Whether or not the `ready` event has fired yet.","","    @property _ready","    @type Boolean","    @default undefined","    @protected","    **/","","    /**","    Regex used to match parameter placeholders in route paths.","","    Subpattern captures:","","      1. Parameter prefix character. Either a `:` for subpath parameters that","         should only match a single level of a path, or `*` for splat parameters","         that should match any number of path levels.","","      2. Parameter name, if specified, otherwise it is a wildcard match.","","    @property _regexPathParam","    @type RegExp","    @protected","    **/","    _regexPathParam: /([:*])([\\w\\-]+)?/g,","","    /**","    Regex that matches and captures the query portion of a URL, minus the","    preceding `?` character, and discarding the hash portion of the URL if any.","","    @property _regexUrlQuery","    @type RegExp","    @protected","    **/","    _regexUrlQuery: /\\?([^#]*).*$/,","","    /**","    Regex that matches everything before the path portion of a URL (the origin).","    This will be used to strip this part of the URL from a string when we","    only want the path.","","    @property _regexUrlOrigin","    @type RegExp","    @protected","    **/","    _regexUrlOrigin: /^(?:[^\\/#?:]+:\\/\\/|\\/\\/)[^\\/]*/,","","    // -- Lifecycle Methods ----------------------------------------------------","    initializer: function (config) {","        var self = this;","","        self._html5  = self.get('html5');","        self._routes = [];","        self._url    = self._getURL();","","        // Necessary because setters don't run on init.","        self._setRoutes(config && config.routes ? config.routes :","                self.get('routes'));","","        // Set up a history instance or hashchange listener.","        if (self._html5) {","            self._history       = new Y.HistoryHTML5({force: true});","            self._historyEvents =","                    Y.after('history:change', self._afterHistoryChange, self);","        } else {","            self._historyEvents =","                    Y.on('hashchange', self._afterHistoryChange, win, self);","        }","","        // Fire a `ready` event once we're ready to route. We wait first for all","        // subclass initializers to finish, then for window.onload, and then an","        // additional 20ms to allow the browser to fire a useless initial","        // `popstate` event if it wants to (and Chrome always wants to).","        self.publish(EVT_READY, {","            defaultFn  : self._defReadyFn,","            fireOnce   : true,","            preventable: false","        });","","        self.once('initializedChange', function () {","            Y.once('load', function () {","                setTimeout(function () {","                    self.fire(EVT_READY, {dispatched: !!self._dispatched});","                }, 20);","            });","        });","","        // Store this router in the collection of all active router instances.","        instances.push(this);","    },","","    destructor: function () {","        var instanceIndex = YArray.indexOf(instances, this);","","        // Remove this router from the collection of active router instances.","        if (instanceIndex > -1) {","            instances.splice(instanceIndex, 1);","        }","","        if (this._historyEvents) {","            this._historyEvents.detach();","        }","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    Dispatches to the first route handler that matches the current URL, if any.","","    If `dispatch()` is called before the `ready` event has fired, it will","    automatically wait for the `ready` event before dispatching. Otherwise it","    will dispatch immediately.","","    @method dispatch","    @chainable","    **/","    dispatch: function () {","        this.once(EVT_READY, function () {","            this._ready = true;","","            if (this._html5 && this.upgrade()) {","                return;","            } else {","                this._dispatch(this._getPath(), this._getURL());","            }","        });","","        return this;","    },","","    /**","    Gets the current route path, relative to the `root` (if any).","","    @method getPath","    @return {String} Current route path.","    **/","    getPath: function () {","        return this._getPath();","    },","","    /**","    Returns `true` if this router has at least one route that matches the","    specified URL, `false` otherwise.","","    This method enforces the same-origin security constraint on the specified","    `url`; any URL which is not from the same origin as the current URL will","    always return `false`.","","    @method hasRoute","    @param {String} url URL to match.","    @return {Boolean} `true` if there's at least one matching route, `false`","      otherwise.","    **/","    hasRoute: function (url) {","        var path;","","        if (!this._hasSameOrigin(url)) {","            return false;","        }","","        if (!this._html5) {","            url = this._upgradeURL(url);","        }","","        path = this.removeQuery(this.removeRoot(url));","","        return !!this.match(path).length;","    },","","    /**","    Returns an array of route objects that match the specified URL path.","","    This method is called internally to determine which routes match the current","    path whenever the URL changes. You may override it if you want to customize","    the route matching logic, although this usually shouldn't be necessary.","","    Each returned route object has the following properties:","","      * `callback`: A function or a string representing the name of a function","        this router that should be executed when the route is triggered.","","      * `keys`: An array of strings representing the named parameters defined in","        the route's path specification, if any.","","      * `path`: The route's path specification, which may be either a string or","        a regex.","","      * `regex`: A regular expression version of the route's path specification.","        This regex is used to determine whether the route matches a given path.","","    @example","        router.route('/foo', function () {});","        router.match('/foo');","        // => [{callback: ..., keys: [], path: '/foo', regex: ...}]","","    @method match","    @param {String} path URL path to match.","    @return {Object[]} Array of route objects that match the specified path.","    **/","    match: function (path) {","        return YArray.filter(this._routes, function (route) {","            return path.search(route.regex) > -1;","        });","    },","","    /**","    Removes the `root` URL from the front of _url_ (if it's there) and returns","    the result. The returned path will always have a leading `/`.","","    @method removeRoot","    @param {String} url URL.","    @return {String} Rootless path.","    **/","    removeRoot: function (url) {","        var root = this.get('root');","","        // Strip out the non-path part of the URL, if any (e.g.","        // \"http://foo.com\"), so that we're left with just the path.","        url = url.replace(this._regexUrlOrigin, '');","","        if (root && url.indexOf(root) === 0) {","            url = url.substring(root.length);","        }","","        return url.charAt(0) === '/' ? url : '/' + url;","    },","","    /**","    Removes a query string from the end of the _url_ (if one exists) and returns","    the result.","","    @method removeQuery","    @param {String} url URL.","    @return {String} Queryless path.","    **/","    removeQuery: function (url) {","        return url.replace(/\\?.*$/, '');","    },","","    /**","    Replaces the current browser history entry with a new one, and dispatches to","    the first matching route handler, if any.","","    Behind the scenes, this method uses HTML5 `pushState()` in browsers that","    support it (or the location hash in older browsers and IE) to change the","    URL.","","    The specified URL must share the same origin (i.e., protocol, host, and","    port) as the current page, or an error will occur.","","    @example","        // Starting URL: http://example.com/","","        router.replace('/path/');","        // New URL: http://example.com/path/","","        router.replace('/path?foo=bar');","        // New URL: http://example.com/path?foo=bar","","        router.replace('/');","        // New URL: http://example.com/","","    @method replace","    @param {String} [url] URL to set. This URL needs to be of the same origin as","      the current URL. This can be a URL relative to the router's `root`","      attribute. If no URL is specified, the page's current URL will be used.","    @chainable","    @see save()","    **/","    replace: function (url) {","        return this._queue(url, true);","    },","","    /**","    Adds a route handler for the specified URL _path_.","","    The _path_ parameter may be either a string or a regular expression. If it's","    a string, it may contain named parameters: `:param` will match any single","    part of a URL path (not including `/` characters), and `*param` will match","    any number of parts of a URL path (including `/` characters). These named","    parameters will be made available as keys on the `req.params` object that's","    passed to route handlers.","","    If the _path_ parameter is a regex, all pattern matches will be made","    available as numbered keys on `req.params`, starting with `0` for the full","    match, then `1` for the first subpattern match, and so on.","","    Here's a set of sample routes along with URL paths that they match:","","      * Route: `/photos/:tag/:page`","        * URL: `/photos/kittens/1`, params: `{tag: 'kittens', page: '1'}`","        * URL: `/photos/puppies/2`, params: `{tag: 'puppies', page: '2'}`","","      * Route: `/file/*path`","        * URL: `/file/foo/bar/baz.txt`, params: `{path: 'foo/bar/baz.txt'}`","        * URL: `/file/foo`, params: `{path: 'foo'}`","","    **Middleware**: Routes also support an arbitrary number of callback","    functions. This allows you to easily reuse parts of your route-handling code","    with different route. This method is liberal in how it processes the","    specified `callbacks`, you can specify them as separate arguments, or as","    arrays, or both.","","    If multiple route match a given URL, they will be executed in the order they","    were added. The first route that was added will be the first to be executed.","","    **Passing Control**: Invoking the `next()` function within a route callback","    will pass control to the next callback function (if any) or route handler","    (if any). If a value is passed to `next()`, it's assumed to be an error,","    therefore stopping the dispatch chain, unless that value is: `\"route\"`,","    which is special case and dispatching will skip to the next route handler.","    This allows middleware to skip any remaining middleware for a particular","    route.","","    @example","        router.route('/photos/:tag/:page', function (req, res, next) {","        });","","        // Using middleware.","","        router.findUser = function (req, res, next) {","            req.user = this.get('users').findById(req.params.user);","            next();","        };","","        router.route('/users/:user', 'findUser', function (req, res, next) {","            // The `findUser` middleware puts the `user` object on the `req`.","        });","","    @method route","    @param {String|RegExp} path Path to match. May be a string or a regular","      expression.","    @param {Array|Function|String} callbacks* Callback functions to call","        whenever this route is triggered. These can be specified as separate","        arguments, or in arrays, or both. If a callback is specified as a","        string, the named function will be called on this router instance.","","      @param {Object} callbacks.req Request object containing information about","          the request. It contains the following properties.","","        @param {Array|Object} callbacks.req.params Captured parameters matched by","          the route path specification. If a string path was used and contained","          named parameters, then this will be a key/value hash mapping parameter","          names to their matched values. If a regex path was used, this will be","          an array of subpattern matches starting at index 0 for the full match,","          then 1 for the first subpattern match, and so on.","        @param {String} callbacks.req.path The current URL path.","        @param {Number} callbacks.req.pendingCallbacks Number of remaining","          callbacks the route handler has after this one in the dispatch chain.","        @param {Number} callbacks.req.pendingRoutes Number of matching routes","          after this one in the dispatch chain.","        @param {Object} callbacks.req.query Query hash representing the URL","          query string, if any. Parameter names are keys, and are mapped to","          parameter values.","        @param {String} callbacks.req.url The full URL.","        @param {String} callbacks.req.src What initiated the dispatch. In an","          HTML5 browser, when the back/forward buttons are used, this property","          will have a value of \"popstate\".","","      @param {Object} callbacks.res Response object containing methods and","          information that relate to responding to a request. It contains the","          following properties.","        @param {Object} callbacks.res.req Reference to the request object.","","      @param {Function} callbacks.next Function to pass control to the next","          callback or the next matching route if no more callbacks (middleware)","          exist for the current route handler. If you don't call this function,","          then no further callbacks or route handlers will be executed, even if","          there are more that match. If you do call this function, then the next","          callback (if any) or matching route handler (if any) will be called.","          All of these functions will receive the same `req` and `res` objects","          that were passed to this route (so you can use these objects to pass","          data along to subsequent callbacks and routes).","        @param {String} [callbacks.next.err] Optional error which will stop the","          dispatch chaining for this `req`, unless the value is `\"route\"`, which","          is special cased to jump skip past any callbacks for the current route","          and pass control the next route handler.","    @chainable","    **/","    route: function (path, callbacks) {","        callbacks = YArray.flatten(YArray(arguments, 1, true));","","        var keys = [];","","        this._routes.push({","            callbacks: callbacks,","            keys     : keys,","            path     : path,","            regex    : this._getRegex(path, keys),","","            // For back-compat.","            callback: callbacks[0]","        });","","        return this;","    },","","    /**","    Saves a new browser history entry and dispatches to the first matching route","    handler, if any.","","    Behind the scenes, this method uses HTML5 `pushState()` in browsers that","    support it (or the location hash in older browsers and IE) to change the","    URL and create a history entry.","","    The specified URL must share the same origin (i.e., protocol, host, and","    port) as the current page, or an error will occur.","","    @example","        // Starting URL: http://example.com/","","        router.save('/path/');","        // New URL: http://example.com/path/","","        router.save('/path?foo=bar');","        // New URL: http://example.com/path?foo=bar","","        router.save('/');","        // New URL: http://example.com/","","    @method save","    @param {String} [url] URL to set. This URL needs to be of the same origin as","      the current URL. This can be a URL relative to the router's `root`","      attribute. If no URL is specified, the page's current URL will be used.","    @chainable","    @see replace()","    **/","    save: function (url) {","        return this._queue(url);","    },","","    /**","    Upgrades a hash-based URL to an HTML5 URL if necessary. In non-HTML5","    browsers, this method is a noop.","","    @method upgrade","    @return {Boolean} `true` if the URL was upgraded, `false` otherwise.","    **/","    upgrade: function () {","        if (!this._html5) {","            return false;","        }","","        // Get the resolve hash path.","        var hashPath = this._getHashPath();","","        if (hashPath) {","            // This is an HTML5 browser and we have a hash-based path in the","            // URL, so we need to upgrade the URL to a non-hash URL. This","            // will trigger a `history:change` event, which will in turn","            // trigger a dispatch.","            this.once(EVT_READY, function () {","                this.replace(hashPath);","            });","","            return true;","        }","","        return false;","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","    Wrapper around `decodeURIComponent` that also converts `+` chars into","    spaces.","","    @method _decode","    @param {String} string String to decode.","    @return {String} Decoded string.","    @protected","    **/","    _decode: function (string) {","        return decodeURIComponent(string.replace(/\\+/g, ' '));","    },","","    /**","    Shifts the topmost `_save()` call off the queue and executes it. Does","    nothing if the queue is empty.","","    @method _dequeue","    @chainable","    @see _queue","    @protected","    **/","    _dequeue: function () {","        var self = this,","            fn;","","        // If window.onload hasn't yet fired, wait until it has before","        // dequeueing. This will ensure that we don't call pushState() before an","        // initial popstate event has fired.","        if (!YUI.Env.windowLoaded) {","            Y.once('load', function () {","                self._dequeue();","            });","","            return this;","        }","","        fn = saveQueue.shift();","        return fn ? fn() : this;","    },","","    /**","    Dispatches to the first route handler that matches the specified _path_.","","    If called before the `ready` event has fired, the dispatch will be aborted.","    This ensures normalized behavior between Chrome (which fires a `popstate`","    event on every pageview) and other browsers (which do not).","","    @method _dispatch","    @param {String} path URL path.","    @param {String} url Full URL.","    @param {String} src What initiated the dispatch.","    @chainable","    @protected","    **/","    _dispatch: function (path, url, src) {","        var self      = this,","            decode    = self._decode,","            routes    = self.match(path),","            callbacks = [],","            matches, req, res;","","        self._dispatching = self._dispatched = true;","","        if (!routes || !routes.length) {","            self._dispatching = false;","            return self;","        }","","        req = self._getRequest(path, url, src);","        res = self._getResponse(req);","","        req.next = function (err) {","            var callback, name, route;","","            if (err) {","                // Special case \"route\" to skip to the next route handler","                // avoiding any additional callbacks for the current route.","                if (err === 'route') {","                    callbacks = [];","                    req.next();","                } else {","                    Y.error(err);","                }","","            } else if ((callback = callbacks.shift())) {","                if (typeof callback === 'string') {","                    name     = callback;","                    callback = self[name];","","                    if (!callback) {","                        Y.error('Router: Callback not found: ' + name, null, 'router');","                    }","                }","","                // Allow access to the number of remaining callbacks for the","                // route.","                req.pendingCallbacks = callbacks.length;","","                callback.call(self, req, res, req.next);","","            } else if ((route = routes.shift())) {","                // Make a copy of this route's `callbacks` so the original array","                // is preserved.","                callbacks = route.callbacks.concat();","","                // Decode each of the path matches so that the any URL-encoded","                // path segments are decoded in the `req.params` object.","                matches = YArray.map(route.regex.exec(path) || [], decode);","","                // Use named keys for parameter names if the route path contains","                // named keys. Otherwise, use numerical match indices.","                if (matches.length === route.keys.length + 1) {","                    req.params = YArray.hash(route.keys, matches.slice(1));","                } else {","                    req.params = matches.concat();","                }","","                // Allow access to the number of remaining routes for this","                // request.","                req.pendingRoutes = routes.length;","","                // Execute this route's `callbacks`.","                req.next();","            }","        };","","        req.next();","","        self._dispatching = false;","        return self._dequeue();","    },","","    /**","    Returns the resolved path from the hash fragment, or an empty string if the","    hash is not path-like.","","    @method _getHashPath","    @param {String} [hash] Hash fragment to resolve into a path. By default this","        will be the hash from the current URL.","    @return {String} Current hash path, or an empty string if the hash is empty.","    @protected","    **/","    _getHashPath: function (hash) {","        hash || (hash = HistoryHash.getHash());","","        // Make sure the `hash` is path-like.","        if (hash && hash.charAt(0) === '/') {","            return this._joinURL(hash);","        }","","        return '';","    },","","    /**","    Gets the location origin (i.e., protocol, host, and port) as a URL.","","    @example","        http://example.com","","    @method _getOrigin","    @return {String} Location origin (i.e., protocol, host, and port).","    @protected","    **/","    _getOrigin: function () {","        var location = Y.getLocation();","        return location.origin || (location.protocol + '//' + location.host);","    },","","    /**","    Gets the current route path, relative to the `root` (if any).","","    @method _getPath","    @return {String} Current route path.","    @protected","    **/","    _getPath: function () {","        var path = (!this._html5 && this._getHashPath()) ||","                Y.getLocation().pathname;","","        return this.removeQuery(this.removeRoot(path));","    },","","    /**","    Returns the current path root after popping off the last path segment,","    making it useful for resolving other URL paths against.","","    The path root will always begin and end with a '/'.","","    @method _getPathRoot","    @return {String} The URL's path root.","    @protected","    @since 3.5.0","    **/","    _getPathRoot: function () {","        var slash = '/',","            path  = Y.getLocation().pathname,","            segments;","","        if (path.charAt(path.length - 1) === slash) {","            return path;","        }","","        segments = path.split(slash);","        segments.pop();","","        return segments.join(slash) + slash;","    },","","    /**","    Gets the current route query string.","","    @method _getQuery","    @return {String} Current route query string.","    @protected","    **/","    _getQuery: function () {","        var location = Y.getLocation(),","            hash, matches;","","        if (this._html5) {","            return location.search.substring(1);","        }","","        hash    = HistoryHash.getHash();","        matches = hash.match(this._regexUrlQuery);","","        return hash && matches ? matches[1] : location.search.substring(1);","    },","","    /**","    Creates a regular expression from the given route specification. If _path_","    is already a regex, it will be returned unmodified.","","    @method _getRegex","    @param {String|RegExp} path Route path specification.","    @param {Array} keys Array reference to which route parameter names will be","      added.","    @return {RegExp} Route regex.","    @protected","    **/","    _getRegex: function (path, keys) {","        if (path instanceof RegExp) {","            return path;","        }","","        // Special case for catchall paths.","        if (path === '*') {","            return (/.*/);","        }","","        path = path.replace(this._regexPathParam, function (match, operator, key) {","            // Only `*` operators are supported for key-less matches to allowing","            // in-path wildcards like: '/foo/*'.","            if (!key) {","                return operator === '*' ? '.*' : match;","            }","","            keys.push(key);","            return operator === '*' ? '(.*?)' : '([^/#?]*)';","        });","","        return new RegExp('^' + path + '$');","    },","","    /**","    Gets a request object that can be passed to a route handler.","","    @method _getRequest","    @param {String} path Current path being dispatched.","    @param {String} url Current full URL being dispatched.","    @param {String} src What initiated the dispatch.","    @return {Object} Request object.","    @protected","    **/","    _getRequest: function (path, url, src) {","        return {","            path : path,","            query: this._parseQuery(this._getQuery()),","            url  : url,","            src  : src","        };","    },","","    /**","    Gets a response object that can be passed to a route handler.","","    @method _getResponse","    @param {Object} req Request object.","    @return {Object} Response Object.","    @protected","    **/","    _getResponse: function (req) {","        // For backwards compatibility, the response object is a function that","        // calls `next()` on the request object and returns the result.","        var res = function () {","            return req.next.apply(this, arguments);","        };","","        res.req = req;","        return res;","    },","","    /**","    Getter for the `routes` attribute.","","    @method _getRoutes","    @return {Object[]} Array of route objects.","    @protected","    **/","    _getRoutes: function () {","        return this._routes.concat();","    },","","    /**","    Gets the current full URL.","","    @method _getURL","    @return {String} URL.","    @protected","    **/","    _getURL: function () {","        var url = Y.getLocation().toString();","","        if (!this._html5) {","            url = this._upgradeURL(url);","        }","","        return url;","    },","","    /**","    Returns `true` when the specified `url` is from the same origin as the","    current URL; i.e., the protocol, host, and port of the URLs are the same.","","    All host or path relative URLs are of the same origin. A scheme-relative URL","    is first prefixed with the current scheme before being evaluated.","","    @method _hasSameOrigin","    @param {String} url URL to compare origin with the current URL.","    @return {Boolean} Whether the URL has the same origin of the current URL.","    @protected","    **/","    _hasSameOrigin: function (url) {","        var origin = ((url && url.match(this._regexUrlOrigin)) || [])[0];","","        // Prepend current scheme to scheme-relative URLs.","        if (origin && origin.indexOf('//') === 0) {","            origin = Y.getLocation().protocol + origin;","        }","","        return !origin || origin === this._getOrigin();","    },","","    /**","    Joins the `root` URL to the specified _url_, normalizing leading/trailing","    `/` characters.","","    @example","        router.set('root', '/foo');","        router._joinURL('bar');  // => '/foo/bar'","        router._joinURL('/bar'); // => '/foo/bar'","","        router.set('root', '/foo/');","        router._joinURL('bar');  // => '/foo/bar'","        router._joinURL('/bar'); // => '/foo/bar'","","    @method _joinURL","    @param {String} url URL to append to the `root` URL.","    @return {String} Joined URL.","    @protected","    **/","    _joinURL: function (url) {","        var root = this.get('root');","","        // Causes `url` to _always_ begin with a \"/\".","        url = this.removeRoot(url);","","        if (url.charAt(0) === '/') {","            url = url.substring(1);","        }","","        return root && root.charAt(root.length - 1) === '/' ?","                root + url :","                root + '/' + url;","    },","","    /**","    Returns a normalized path, ridding it of any '..' segments and properly","    handling leading and trailing slashes.","","    @method _normalizePath","    @param {String} path URL path to normalize.","    @return {String} Normalized path.","    @protected","    @since 3.5.0","    **/","    _normalizePath: function (path) {","        var dots  = '..',","            slash = '/',","            i, len, normalized, segments, segment, stack;","","        if (!path || path === slash) {","            return slash;","        }","","        segments = path.split(slash);","        stack    = [];","","        for (i = 0, len = segments.length; i < len; ++i) {","            segment = segments[i];","","            if (segment === dots) {","                stack.pop();","            } else if (segment) {","                stack.push(segment);","            }","        }","","        normalized = slash + stack.join(slash);","","        // Append trailing slash if necessary.","        if (normalized !== slash && path.charAt(path.length - 1) === slash) {","            normalized += slash;","        }","","        return normalized;","    },","","    /**","    Parses a URL query string into a key/value hash. If `Y.QueryString.parse` is","    available, this method will be an alias to that.","","    @method _parseQuery","    @param {String} query Query string to parse.","    @return {Object} Hash of key/value pairs for query parameters.","    @protected","    **/","    _parseQuery: QS && QS.parse ? QS.parse : function (query) {","        var decode = this._decode,","            params = query.split('&'),","            i      = 0,","            len    = params.length,","            result = {},","            param;","","        for (; i < len; ++i) {","            param = params[i].split('=');","","            if (param[0]) {","                result[decode(param[0])] = decode(param[1] || '');","            }","        }","","        return result;","    },","","    /**","    Queues up a `_save()` call to run after all previously-queued calls have","    finished.","","    This is necessary because if we make multiple `_save()` calls before the","    first call gets dispatched, then both calls will dispatch to the last call's","    URL.","","    All arguments passed to `_queue()` will be passed on to `_save()` when the","    queued function is executed.","","    @method _queue","    @chainable","    @see _dequeue","    @protected","    **/","    _queue: function () {","        var args = arguments,","            self = this;","","        saveQueue.push(function () {","            if (self._html5) {","                if (Y.UA.ios && Y.UA.ios < 5) {","                    // iOS <5 has buggy HTML5 history support, and needs to be","                    // synchronous.","                    self._save.apply(self, args);","                } else {","                    // Wrapped in a timeout to ensure that _save() calls are","                    // always processed asynchronously. This ensures consistency","                    // between HTML5- and hash-based history.","                    setTimeout(function () {","                        self._save.apply(self, args);","                    }, 1);","                }","            } else {","                self._dispatching = true; // otherwise we'll dequeue too quickly","                self._save.apply(self, args);","            }","","            return self;","        });","","        return !this._dispatching ? this._dequeue() : this;","    },","","    /**","    Returns the normalized result of resolving the `path` against the current","    path. Falsy values for `path` will return just the current path.","","    @method _resolvePath","    @param {String} path URL path to resolve.","    @return {String} Resolved path.","    @protected","    @since 3.5.0","    **/","    _resolvePath: function (path) {","        if (!path) {","            return Y.getLocation().pathname;","        }","","        if (path.charAt(0) !== '/') {","            path = this._getPathRoot() + path;","        }","","        return this._normalizePath(path);","    },","","    /**","    Resolves the specified URL against the current URL.","","    This method resolves URLs like a browser does and will always return an","    absolute URL. When the specified URL is already absolute, it is assumed to","    be fully resolved and is simply returned as is. Scheme-relative URLs are","    prefixed with the current protocol. Relative URLs are giving the current","    URL's origin and are resolved and normalized against the current path root.","","    @method _resolveURL","    @param {String} url URL to resolve.","    @return {String} Resolved URL.","    @protected","    @since 3.5.0","    **/","    _resolveURL: function (url) {","        var parts    = url && url.match(this._regexURL),","            origin, path, query, hash, resolved;","","        if (!parts) {","            return Y.getLocation().toString();","        }","","        origin = parts[1];","        path   = parts[2];","        query  = parts[3];","        hash   = parts[4];","","        // Absolute and scheme-relative URLs are assumed to be fully-resolved.","        if (origin) {","            // Prepend the current scheme for scheme-relative URLs.","            if (origin.indexOf('//') === 0) {","                origin = Y.getLocation().protocol + origin;","            }","","            return origin + (path || '/') + (query || '') + (hash || '');","        }","","        // Will default to the current origin and current path.","        resolved = this._getOrigin() + this._resolvePath(path);","","        // A path or query for the specified URL trumps the current URL's.","        if (path || query) {","            return resolved + (query || '') + (hash || '');","        }","","        query = this._getQuery();","","        return resolved + (query ? ('?' + query) : '') + (hash || '');","    },","","    /**","    Saves a history entry using either `pushState()` or the location hash.","","    This method enforces the same-origin security constraint; attempting to save","    a `url` that is not from the same origin as the current URL will result in","    an error.","","    @method _save","    @param {String} [url] URL for the history entry.","    @param {Boolean} [replace=false] If `true`, the current history entry will","      be replaced instead of a new one being added.","    @chainable","    @protected","    **/","    _save: function (url, replace) {","        var urlIsString = typeof url === 'string',","            currentPath, root;","","        // Perform same-origin check on the specified URL.","        if (urlIsString && !this._hasSameOrigin(url)) {","            Y.error('Security error: The new URL must be of the same origin as the current URL.');","            return this;","        }","","        // Joins the `url` with the `root`.","        if (urlIsString) {","            url = this._joinURL(url);","        }","","        // Force _ready to true to ensure that the history change is handled","        // even if _save is called before the `ready` event fires.","        this._ready = true;","","        if (this._html5) {","            this._history[replace ? 'replace' : 'add'](null, {url: url});","        } else {","            currentPath = Y.getLocation().pathname;","            root        = this.get('root');","","            // Determine if the `root` already exists in the current location's","            // `pathname`, and if it does then we can exclude it from the","            // hash-based path. No need to duplicate the info in the URL.","            if (root === currentPath || root === this._getPathRoot()) {","                url = this.removeRoot(url);","            }","","            // The `hashchange` event only fires when the new hash is actually","            // different. This makes sure we'll always dequeue and dispatch","            // _all_ router instances, mimicking the HTML5 behavior.","            if (url === HistoryHash.getHash()) {","                Y.Router.dispatch();","            } else {","                HistoryHash[replace ? 'replaceHash' : 'setHash'](url);","            }","        }","","        return this;","    },","","    /**","    Setter for the `routes` attribute.","","    @method _setRoutes","    @param {Object[]} routes Array of route objects.","    @return {Object[]} Array of route objects.","    @protected","    **/","    _setRoutes: function (routes) {","        this._routes = [];","","        YArray.each(routes, function (route) {","            // Makes sure to check `callback` for back-compat.","            var callbacks = route.callbacks || route.callback;","","            this.route(route.path, callbacks);","        }, this);","","        return this._routes.concat();","    },","","    /**","    Upgrades a hash-based URL to a full-path URL, if necessary.","","    The specified `url` will be upgraded if its of the same origin as the","    current URL and has a path-like hash. URLs that don't need upgrading will be","    returned as-is.","","    @example","        app._upgradeURL('http://example.com/#/foo/'); // => 'http://example.com/foo/';","","    @method _upgradeURL","    @param {String} url The URL to upgrade from hash-based to full-path.","    @return {String} The upgraded URL, or the specified URL untouched.","    @protected","    @since 3.5.0","    **/","    _upgradeURL: function (url) {","        // We should not try to upgrade paths for external URLs.","        if (!this._hasSameOrigin(url)) {","            return url;","        }","","        var hash       = (url.match(/#(.*)$/) || [])[1] || '',","            hashPrefix = Y.HistoryHash.hashPrefix,","            hashPath;","","        // Strip any hash prefix, like hash-bangs.","        if (hashPrefix && hash.indexOf(hashPrefix) === 0) {","            hash = hash.replace(hashPrefix, '');","        }","","        // If the hash looks like a URL path, assume it is, and upgrade it!","        if (hash) {","            hashPath = this._getHashPath(hash);","","            if (hashPath) {","                return this._resolveURL(hashPath);","            }","        }","","        return url;","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","    Handles `history:change` and `hashchange` events.","","    @method _afterHistoryChange","    @param {EventFacade} e","    @protected","    **/","    _afterHistoryChange: function (e) {","        var self       = this,","            src        = e.src,","            prevURL    = self._url,","            currentURL = self._getURL();","","        self._url = currentURL;","","        // Handles the awkwardness that is the `popstate` event. HTML5 browsers","        // fire `popstate` right before they fire `hashchange`, and Chrome fires","        // `popstate` on page load. If this router is not ready or the previous","        // and current URLs only differ by their hash, then we want to ignore","        // this `popstate` event.","        if (src === 'popstate' &&","                (!self._ready || prevURL.replace(/#.*$/, '') === currentURL.replace(/#.*$/, ''))) {","","            return;","        }","","        self._dispatch(self._getPath(), currentURL, src);","    },","","    // -- Default Event Handlers -----------------------------------------------","","    /**","    Default handler for the `ready` event.","","    @method _defReadyFn","    @param {EventFacade} e","    @protected","    **/","    _defReadyFn: function (e) {","        this._ready = true;","    }","}, {","    // -- Static Properties ----------------------------------------------------","    NAME: 'router',","","    ATTRS: {","        /**","        Whether or not this browser is capable of using HTML5 history.","","        Setting this to `false` will force the use of hash-based history even on","        HTML5 browsers, but please don't do this unless you understand the","        consequences.","","        @attribute html5","        @type Boolean","        @initOnly","        **/","        html5: {","            // Android versions lower than 3.0 are buggy and don't update","            // window.location after a pushState() call, so we fall back to","            // hash-based history for them.","            //","            // See http://code.google.com/p/android/issues/detail?id=17471","            valueFn: function () { return Y.Router.html5; },","            writeOnce: 'initOnly'","        },","","        /**","        Absolute root path from which all routes should be evaluated.","","        For example, if your router is running on a page at","        `http://example.com/myapp/` and you add a route with the path `/`, your","        route will never execute, because the path will always be preceded by","        `/myapp`. Setting `root` to `/myapp` would cause all routes to be","        evaluated relative to that root URL, so the `/` route would then execute","        when the user browses to `http://example.com/myapp/`.","","        @attribute root","        @type String","        @default `''`","        **/","        root: {","            value: ''","        },","","        /**","        Array of route objects.","","        Each item in the array must be an object with the following properties:","","          * `path`: String or regex representing the path to match. See the docs","            for the `route()` method for more details.","","          * `callbacks`: Function or a string representing the name of a","            function on this router instance that should be called when the","            route is triggered. An array of functions and/or strings may also be","            provided. See the docs for the `route()` method for more details.","","        This attribute is intended to be used to set routes at init time, or to","        completely reset all routes after init. To add routes after init without","        resetting all existing routes, use the `route()` method.","","        @attribute routes","        @type Object[]","        @default `[]`","        @see route","        **/","        routes: {","            value : [],","            getter: '_getRoutes',","            setter: '_setRoutes'","        }","    },","","    // Used as the default value for the `html5` attribute, and for testing.","    html5: Y.HistoryBase.html5 && (!Y.UA.android || Y.UA.android >= 3),","","    // To make this testable.","    _instances: instances,","","    /**","    Dispatches to the first route handler that matches the specified `path` for","    all active router instances.","","    This provides a mechanism to cause all active router instances to dispatch","    to their route handlers without needing to change the URL or fire the","    `history:change` or `hashchange` event.","","    @method dispatch","    @static","    @since 3.6.0","    **/","    dispatch: function () {","        var i, len, router;","","        for (i = 0, len = instances.length; i < len; i += 1) {","            router = instances[i];","","            if (router) {","                router._dispatch(router._getPath(), router._getURL());","            }","        }","    }","});","","/**","The `Controller` class was deprecated in YUI 3.5.0 and is now an alias for the","`Router` class. Use that class instead. This alias will be removed in a future","version of YUI.","","@class Controller","@constructor","@extends Base","@deprecated Use `Router` instead.","@see Router","**/","Y.Controller = Y.Router;","","","}, '@VERSION@', {\"optional\": [\"querystring-parse\"], \"requires\": [\"array-extras\", \"base-build\", \"history\"]});"];
_yuitest_coverage["build/router/router.js"].lines = {"1":0,"11":0,"59":0,"60":0,"63":0,"151":0,"153":0,"154":0,"155":0,"158":0,"162":0,"163":0,"164":0,"167":0,"175":0,"181":0,"182":0,"183":0,"184":0,"190":0,"194":0,"197":0,"198":0,"201":0,"202":0,"219":0,"220":0,"222":0,"223":0,"225":0,"229":0,"239":0,"256":0,"258":0,"259":0,"262":0,"263":0,"266":0,"268":0,"302":0,"303":0,"316":0,"320":0,"322":0,"323":0,"326":0,"338":0,"372":0,"482":0,"484":0,"486":0,"496":0,"530":0,"541":0,"542":0,"546":0,"548":0,"553":0,"554":0,"557":0,"560":0,"575":0,"588":0,"594":0,"595":0,"596":0,"599":0,"602":0,"603":0,"621":0,"627":0,"629":0,"630":0,"631":0,"634":0,"635":0,"637":0,"638":0,"640":0,"643":0,"644":0,"645":0,"647":0,"650":0,"651":0,"652":0,"653":0,"655":0,"656":0,"662":0,"664":0,"666":0,"669":0,"673":0,"677":0,"678":0,"680":0,"685":0,"688":0,"692":0,"694":0,"695":0,"709":0,"712":0,"713":0,"716":0,"730":0,"731":0,"742":0,"745":0,"760":0,"764":0,"765":0,"768":0,"769":0,"771":0,"782":0,"785":0,"786":0,"789":0,"790":0,"792":0,"807":0,"808":0,"812":0,"813":0,"816":0,"819":0,"820":0,"823":0,"824":0,"827":0,"841":0,"860":0,"861":0,"864":0,"865":0,"876":0,"887":0,"889":0,"890":0,"893":0,"909":0,"912":0,"913":0,"916":0,"938":0,"941":0,"943":0,"944":0,"947":0,"963":0,"967":0,"968":0,"971":0,"972":0,"974":0,"975":0,"977":0,"978":0,"979":0,"980":0,"984":0,"987":0,"988":0,"991":0,"1004":0,"1011":0,"1012":0,"1014":0,"1015":0,"1019":0,"1039":0,"1042":0,"1043":0,"1044":0,"1047":0,"1052":0,"1053":0,"1057":0,"1058":0,"1061":0,"1064":0,"1078":0,"1079":0,"1082":0,"1083":0,"1086":0,"1105":0,"1108":0,"1109":0,"1112":0,"1113":0,"1114":0,"1115":0,"1118":0,"1120":0,"1121":0,"1124":0,"1128":0,"1131":0,"1132":0,"1135":0,"1137":0,"1155":0,"1159":0,"1160":0,"1161":0,"1165":0,"1166":0,"1171":0,"1173":0,"1174":0,"1176":0,"1177":0,"1182":0,"1183":0,"1189":0,"1190":0,"1192":0,"1196":0,"1208":0,"1210":0,"1212":0,"1214":0,"1217":0,"1238":0,"1239":0,"1242":0,"1247":0,"1248":0,"1252":0,"1253":0,"1255":0,"1256":0,"1260":0,"1273":0,"1278":0,"1285":0,"1288":0,"1291":0,"1304":0,"1328":0,"1398":0,"1400":0,"1401":0,"1403":0,"1404":0,"1421":0};
_yuitest_coverage["build/router/router.js"].functions = {"Router:59":0,"(anonymous 4):183":0,"(anonymous 3):182":0,"(anonymous 2):181":0,"initializer:150":0,"destructor:193":0,"(anonymous 5):219":0,"dispatch:218":0,"getPath:238":0,"hasRoute:255":0,"(anonymous 6):302":0,"match:301":0,"removeRoot:315":0,"removeQuery:337":0,"replace:371":0,"route:481":0,"save:529":0,"(anonymous 7):553":0,"upgrade:540":0,"_decode:574":0,"(anonymous 8):595":0,"_dequeue:587":0,"next:637":0,"_dispatch:620":0,"_getHashPath:708":0,"_getOrigin:729":0,"_getPath:741":0,"_getPathRoot:759":0,"_getQuery:781":0,"(anonymous 9):816":0,"_getRegex:806":0,"_getRequest:840":0,"res:860":0,"_getResponse:857":0,"_getRoutes:875":0,"_getURL:886":0,"_hasSameOrigin:908":0,"_joinURL:937":0,"_normalizePath:962":0,"parse:1003":0,"(anonymous 11):1052":0,"(anonymous 10):1042":0,"_queue:1038":0,"_resolvePath:1077":0,"_resolveURL:1104":0,"_save:1154":0,"(anonymous 12):1210":0,"_setRoutes:1207":0,"_upgradeURL:1236":0,"_afterHistoryChange:1272":0,"_defReadyFn:1303":0,"valueFn:1328":0,"dispatch:1397":0,"(anonymous 1):1":0};
_yuitest_coverage["build/router/router.js"].coveredLines = 249;
_yuitest_coverage["build/router/router.js"].coveredFunctions = 54;
_yuitest_coverline("build/router/router.js", 1);
YUI.add('router', function (Y, NAME) {

/**
Provides URL-based routing using HTML5 `pushState()` or the location hash.

@module app
@submodule router
@since 3.4.0
**/

_yuitest_coverfunc("build/router/router.js", "(anonymous 1)", 1);
_yuitest_coverline("build/router/router.js", 11);
var HistoryHash = Y.HistoryHash,
    QS          = Y.QueryString,
    YArray      = Y.Array,

    win = Y.config.win,

    // Holds all the active router instances. This supports the static
    // `dispatch()` method which causes all routers to dispatch.
    instances = [],

    // We have to queue up pushState calls to avoid race conditions, since the
    // popstate event doesn't actually provide any info on what URL it's
    // associated with.
    saveQueue = [],

    /**
    Fired when the router is ready to begin dispatching to route handlers.

    You shouldn't need to wait for this event unless you plan to implement some
    kind of custom dispatching logic. It's used internally in order to avoid
    dispatching to an initial route if a browser history change occurs first.

    @event ready
    @param {Boolean} dispatched `true` if routes have already been dispatched
      (most likely due to a history change).
    @fireOnce
    **/
    EVT_READY = 'ready';

/**
Provides URL-based routing using HTML5 `pushState()` or the location hash.

This makes it easy to wire up route handlers for different application states
while providing full back/forward navigation support and bookmarkable, shareable
URLs.

@class Router
@param {Object} [config] Config properties.
    @param {Boolean} [config.html5] Overrides the default capability detection
        and forces this router to use (`true`) or not use (`false`) HTML5
        history.
    @param {String} [config.root=''] Root path from which all routes should be
        evaluated.
    @param {Array} [config.routes=[]] Array of route definition objects.
@constructor
@extends Base
@since 3.4.0
**/
_yuitest_coverline("build/router/router.js", 59);
function Router() {
    _yuitest_coverfunc("build/router/router.js", "Router", 59);
_yuitest_coverline("build/router/router.js", 60);
Router.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/router/router.js", 63);
Y.Router = Y.extend(Router, Y.Base, {
    // -- Protected Properties -------------------------------------------------

    /**
    Whether or not `_dispatch()` has been called since this router was
    instantiated.

    @property _dispatched
    @type Boolean
    @default undefined
    @protected
    **/

    /**
    Whether or not we're currently in the process of dispatching to routes.

    @property _dispatching
    @type Boolean
    @default undefined
    @protected
    **/

    /**
    History event handle for the `history:change` or `hashchange` event
    subscription.

    @property _historyEvents
    @type EventHandle
    @protected
    **/

    /**
    Cached copy of the `html5` attribute for internal use.

    @property _html5
    @type Boolean
    @protected
    **/

    /**
    Whether or not the `ready` event has fired yet.

    @property _ready
    @type Boolean
    @default undefined
    @protected
    **/

    /**
    Regex used to match parameter placeholders in route paths.

    Subpattern captures:

      1. Parameter prefix character. Either a `:` for subpath parameters that
         should only match a single level of a path, or `*` for splat parameters
         that should match any number of path levels.

      2. Parameter name, if specified, otherwise it is a wildcard match.

    @property _regexPathParam
    @type RegExp
    @protected
    **/
    _regexPathParam: /([:*])([\w\-]+)?/g,

    /**
    Regex that matches and captures the query portion of a URL, minus the
    preceding `?` character, and discarding the hash portion of the URL if any.

    @property _regexUrlQuery
    @type RegExp
    @protected
    **/
    _regexUrlQuery: /\?([^#]*).*$/,

    /**
    Regex that matches everything before the path portion of a URL (the origin).
    This will be used to strip this part of the URL from a string when we
    only want the path.

    @property _regexUrlOrigin
    @type RegExp
    @protected
    **/
    _regexUrlOrigin: /^(?:[^\/#?:]+:\/\/|\/\/)[^\/]*/,

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        _yuitest_coverfunc("build/router/router.js", "initializer", 150);
_yuitest_coverline("build/router/router.js", 151);
var self = this;

        _yuitest_coverline("build/router/router.js", 153);
self._html5  = self.get('html5');
        _yuitest_coverline("build/router/router.js", 154);
self._routes = [];
        _yuitest_coverline("build/router/router.js", 155);
self._url    = self._getURL();

        // Necessary because setters don't run on init.
        _yuitest_coverline("build/router/router.js", 158);
self._setRoutes(config && config.routes ? config.routes :
                self.get('routes'));

        // Set up a history instance or hashchange listener.
        _yuitest_coverline("build/router/router.js", 162);
if (self._html5) {
            _yuitest_coverline("build/router/router.js", 163);
self._history       = new Y.HistoryHTML5({force: true});
            _yuitest_coverline("build/router/router.js", 164);
self._historyEvents =
                    Y.after('history:change', self._afterHistoryChange, self);
        } else {
            _yuitest_coverline("build/router/router.js", 167);
self._historyEvents =
                    Y.on('hashchange', self._afterHistoryChange, win, self);
        }

        // Fire a `ready` event once we're ready to route. We wait first for all
        // subclass initializers to finish, then for window.onload, and then an
        // additional 20ms to allow the browser to fire a useless initial
        // `popstate` event if it wants to (and Chrome always wants to).
        _yuitest_coverline("build/router/router.js", 175);
self.publish(EVT_READY, {
            defaultFn  : self._defReadyFn,
            fireOnce   : true,
            preventable: false
        });

        _yuitest_coverline("build/router/router.js", 181);
self.once('initializedChange', function () {
            _yuitest_coverfunc("build/router/router.js", "(anonymous 2)", 181);
_yuitest_coverline("build/router/router.js", 182);
Y.once('load', function () {
                _yuitest_coverfunc("build/router/router.js", "(anonymous 3)", 182);
_yuitest_coverline("build/router/router.js", 183);
setTimeout(function () {
                    _yuitest_coverfunc("build/router/router.js", "(anonymous 4)", 183);
_yuitest_coverline("build/router/router.js", 184);
self.fire(EVT_READY, {dispatched: !!self._dispatched});
                }, 20);
            });
        });

        // Store this router in the collection of all active router instances.
        _yuitest_coverline("build/router/router.js", 190);
instances.push(this);
    },

    destructor: function () {
        _yuitest_coverfunc("build/router/router.js", "destructor", 193);
_yuitest_coverline("build/router/router.js", 194);
var instanceIndex = YArray.indexOf(instances, this);

        // Remove this router from the collection of active router instances.
        _yuitest_coverline("build/router/router.js", 197);
if (instanceIndex > -1) {
            _yuitest_coverline("build/router/router.js", 198);
instances.splice(instanceIndex, 1);
        }

        _yuitest_coverline("build/router/router.js", 201);
if (this._historyEvents) {
            _yuitest_coverline("build/router/router.js", 202);
this._historyEvents.detach();
        }
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Dispatches to the first route handler that matches the current URL, if any.

    If `dispatch()` is called before the `ready` event has fired, it will
    automatically wait for the `ready` event before dispatching. Otherwise it
    will dispatch immediately.

    @method dispatch
    @chainable
    **/
    dispatch: function () {
        _yuitest_coverfunc("build/router/router.js", "dispatch", 218);
_yuitest_coverline("build/router/router.js", 219);
this.once(EVT_READY, function () {
            _yuitest_coverfunc("build/router/router.js", "(anonymous 5)", 219);
_yuitest_coverline("build/router/router.js", 220);
this._ready = true;

            _yuitest_coverline("build/router/router.js", 222);
if (this._html5 && this.upgrade()) {
                _yuitest_coverline("build/router/router.js", 223);
return;
            } else {
                _yuitest_coverline("build/router/router.js", 225);
this._dispatch(this._getPath(), this._getURL());
            }
        });

        _yuitest_coverline("build/router/router.js", 229);
return this;
    },

    /**
    Gets the current route path, relative to the `root` (if any).

    @method getPath
    @return {String} Current route path.
    **/
    getPath: function () {
        _yuitest_coverfunc("build/router/router.js", "getPath", 238);
_yuitest_coverline("build/router/router.js", 239);
return this._getPath();
    },

    /**
    Returns `true` if this router has at least one route that matches the
    specified URL, `false` otherwise.

    This method enforces the same-origin security constraint on the specified
    `url`; any URL which is not from the same origin as the current URL will
    always return `false`.

    @method hasRoute
    @param {String} url URL to match.
    @return {Boolean} `true` if there's at least one matching route, `false`
      otherwise.
    **/
    hasRoute: function (url) {
        _yuitest_coverfunc("build/router/router.js", "hasRoute", 255);
_yuitest_coverline("build/router/router.js", 256);
var path;

        _yuitest_coverline("build/router/router.js", 258);
if (!this._hasSameOrigin(url)) {
            _yuitest_coverline("build/router/router.js", 259);
return false;
        }

        _yuitest_coverline("build/router/router.js", 262);
if (!this._html5) {
            _yuitest_coverline("build/router/router.js", 263);
url = this._upgradeURL(url);
        }

        _yuitest_coverline("build/router/router.js", 266);
path = this.removeQuery(this.removeRoot(url));

        _yuitest_coverline("build/router/router.js", 268);
return !!this.match(path).length;
    },

    /**
    Returns an array of route objects that match the specified URL path.

    This method is called internally to determine which routes match the current
    path whenever the URL changes. You may override it if you want to customize
    the route matching logic, although this usually shouldn't be necessary.

    Each returned route object has the following properties:

      * `callback`: A function or a string representing the name of a function
        this router that should be executed when the route is triggered.

      * `keys`: An array of strings representing the named parameters defined in
        the route's path specification, if any.

      * `path`: The route's path specification, which may be either a string or
        a regex.

      * `regex`: A regular expression version of the route's path specification.
        This regex is used to determine whether the route matches a given path.

    @example
        router.route('/foo', function () {});
        router.match('/foo');
        // => [{callback: ..., keys: [], path: '/foo', regex: ...}]

    @method match
    @param {String} path URL path to match.
    @return {Object[]} Array of route objects that match the specified path.
    **/
    match: function (path) {
        _yuitest_coverfunc("build/router/router.js", "match", 301);
_yuitest_coverline("build/router/router.js", 302);
return YArray.filter(this._routes, function (route) {
            _yuitest_coverfunc("build/router/router.js", "(anonymous 6)", 302);
_yuitest_coverline("build/router/router.js", 303);
return path.search(route.regex) > -1;
        });
    },

    /**
    Removes the `root` URL from the front of _url_ (if it's there) and returns
    the result. The returned path will always have a leading `/`.

    @method removeRoot
    @param {String} url URL.
    @return {String} Rootless path.
    **/
    removeRoot: function (url) {
        _yuitest_coverfunc("build/router/router.js", "removeRoot", 315);
_yuitest_coverline("build/router/router.js", 316);
var root = this.get('root');

        // Strip out the non-path part of the URL, if any (e.g.
        // "http://foo.com"), so that we're left with just the path.
        _yuitest_coverline("build/router/router.js", 320);
url = url.replace(this._regexUrlOrigin, '');

        _yuitest_coverline("build/router/router.js", 322);
if (root && url.indexOf(root) === 0) {
            _yuitest_coverline("build/router/router.js", 323);
url = url.substring(root.length);
        }

        _yuitest_coverline("build/router/router.js", 326);
return url.charAt(0) === '/' ? url : '/' + url;
    },

    /**
    Removes a query string from the end of the _url_ (if one exists) and returns
    the result.

    @method removeQuery
    @param {String} url URL.
    @return {String} Queryless path.
    **/
    removeQuery: function (url) {
        _yuitest_coverfunc("build/router/router.js", "removeQuery", 337);
_yuitest_coverline("build/router/router.js", 338);
return url.replace(/\?.*$/, '');
    },

    /**
    Replaces the current browser history entry with a new one, and dispatches to
    the first matching route handler, if any.

    Behind the scenes, this method uses HTML5 `pushState()` in browsers that
    support it (or the location hash in older browsers and IE) to change the
    URL.

    The specified URL must share the same origin (i.e., protocol, host, and
    port) as the current page, or an error will occur.

    @example
        // Starting URL: http://example.com/

        router.replace('/path/');
        // New URL: http://example.com/path/

        router.replace('/path?foo=bar');
        // New URL: http://example.com/path?foo=bar

        router.replace('/');
        // New URL: http://example.com/

    @method replace
    @param {String} [url] URL to set. This URL needs to be of the same origin as
      the current URL. This can be a URL relative to the router's `root`
      attribute. If no URL is specified, the page's current URL will be used.
    @chainable
    @see save()
    **/
    replace: function (url) {
        _yuitest_coverfunc("build/router/router.js", "replace", 371);
_yuitest_coverline("build/router/router.js", 372);
return this._queue(url, true);
    },

    /**
    Adds a route handler for the specified URL _path_.

    The _path_ parameter may be either a string or a regular expression. If it's
    a string, it may contain named parameters: `:param` will match any single
    part of a URL path (not including `/` characters), and `*param` will match
    any number of parts of a URL path (including `/` characters). These named
    parameters will be made available as keys on the `req.params` object that's
    passed to route handlers.

    If the _path_ parameter is a regex, all pattern matches will be made
    available as numbered keys on `req.params`, starting with `0` for the full
    match, then `1` for the first subpattern match, and so on.

    Here's a set of sample routes along with URL paths that they match:

      * Route: `/photos/:tag/:page`
        * URL: `/photos/kittens/1`, params: `{tag: 'kittens', page: '1'}`
        * URL: `/photos/puppies/2`, params: `{tag: 'puppies', page: '2'}`

      * Route: `/file/*path`
        * URL: `/file/foo/bar/baz.txt`, params: `{path: 'foo/bar/baz.txt'}`
        * URL: `/file/foo`, params: `{path: 'foo'}`

    **Middleware**: Routes also support an arbitrary number of callback
    functions. This allows you to easily reuse parts of your route-handling code
    with different route. This method is liberal in how it processes the
    specified `callbacks`, you can specify them as separate arguments, or as
    arrays, or both.

    If multiple route match a given URL, they will be executed in the order they
    were added. The first route that was added will be the first to be executed.

    **Passing Control**: Invoking the `next()` function within a route callback
    will pass control to the next callback function (if any) or route handler
    (if any). If a value is passed to `next()`, it's assumed to be an error,
    therefore stopping the dispatch chain, unless that value is: `"route"`,
    which is special case and dispatching will skip to the next route handler.
    This allows middleware to skip any remaining middleware for a particular
    route.

    @example
        router.route('/photos/:tag/:page', function (req, res, next) {
        });

        // Using middleware.

        router.findUser = function (req, res, next) {
            req.user = this.get('users').findById(req.params.user);
            next();
        };

        router.route('/users/:user', 'findUser', function (req, res, next) {
            // The `findUser` middleware puts the `user` object on the `req`.
        });

    @method route
    @param {String|RegExp} path Path to match. May be a string or a regular
      expression.
    @param {Array|Function|String} callbacks* Callback functions to call
        whenever this route is triggered. These can be specified as separate
        arguments, or in arrays, or both. If a callback is specified as a
        string, the named function will be called on this router instance.

      @param {Object} callbacks.req Request object containing information about
          the request. It contains the following properties.

        @param {Array|Object} callbacks.req.params Captured parameters matched by
          the route path specification. If a string path was used and contained
          named parameters, then this will be a key/value hash mapping parameter
          names to their matched values. If a regex path was used, this will be
          an array of subpattern matches starting at index 0 for the full match,
          then 1 for the first subpattern match, and so on.
        @param {String} callbacks.req.path The current URL path.
        @param {Number} callbacks.req.pendingCallbacks Number of remaining
          callbacks the route handler has after this one in the dispatch chain.
        @param {Number} callbacks.req.pendingRoutes Number of matching routes
          after this one in the dispatch chain.
        @param {Object} callbacks.req.query Query hash representing the URL
          query string, if any. Parameter names are keys, and are mapped to
          parameter values.
        @param {String} callbacks.req.url The full URL.
        @param {String} callbacks.req.src What initiated the dispatch. In an
          HTML5 browser, when the back/forward buttons are used, this property
          will have a value of "popstate".

      @param {Object} callbacks.res Response object containing methods and
          information that relate to responding to a request. It contains the
          following properties.
        @param {Object} callbacks.res.req Reference to the request object.

      @param {Function} callbacks.next Function to pass control to the next
          callback or the next matching route if no more callbacks (middleware)
          exist for the current route handler. If you don't call this function,
          then no further callbacks or route handlers will be executed, even if
          there are more that match. If you do call this function, then the next
          callback (if any) or matching route handler (if any) will be called.
          All of these functions will receive the same `req` and `res` objects
          that were passed to this route (so you can use these objects to pass
          data along to subsequent callbacks and routes).
        @param {String} [callbacks.next.err] Optional error which will stop the
          dispatch chaining for this `req`, unless the value is `"route"`, which
          is special cased to jump skip past any callbacks for the current route
          and pass control the next route handler.
    @chainable
    **/
    route: function (path, callbacks) {
        _yuitest_coverfunc("build/router/router.js", "route", 481);
_yuitest_coverline("build/router/router.js", 482);
callbacks = YArray.flatten(YArray(arguments, 1, true));

        _yuitest_coverline("build/router/router.js", 484);
var keys = [];

        _yuitest_coverline("build/router/router.js", 486);
this._routes.push({
            callbacks: callbacks,
            keys     : keys,
            path     : path,
            regex    : this._getRegex(path, keys),

            // For back-compat.
            callback: callbacks[0]
        });

        _yuitest_coverline("build/router/router.js", 496);
return this;
    },

    /**
    Saves a new browser history entry and dispatches to the first matching route
    handler, if any.

    Behind the scenes, this method uses HTML5 `pushState()` in browsers that
    support it (or the location hash in older browsers and IE) to change the
    URL and create a history entry.

    The specified URL must share the same origin (i.e., protocol, host, and
    port) as the current page, or an error will occur.

    @example
        // Starting URL: http://example.com/

        router.save('/path/');
        // New URL: http://example.com/path/

        router.save('/path?foo=bar');
        // New URL: http://example.com/path?foo=bar

        router.save('/');
        // New URL: http://example.com/

    @method save
    @param {String} [url] URL to set. This URL needs to be of the same origin as
      the current URL. This can be a URL relative to the router's `root`
      attribute. If no URL is specified, the page's current URL will be used.
    @chainable
    @see replace()
    **/
    save: function (url) {
        _yuitest_coverfunc("build/router/router.js", "save", 529);
_yuitest_coverline("build/router/router.js", 530);
return this._queue(url);
    },

    /**
    Upgrades a hash-based URL to an HTML5 URL if necessary. In non-HTML5
    browsers, this method is a noop.

    @method upgrade
    @return {Boolean} `true` if the URL was upgraded, `false` otherwise.
    **/
    upgrade: function () {
        _yuitest_coverfunc("build/router/router.js", "upgrade", 540);
_yuitest_coverline("build/router/router.js", 541);
if (!this._html5) {
            _yuitest_coverline("build/router/router.js", 542);
return false;
        }

        // Get the resolve hash path.
        _yuitest_coverline("build/router/router.js", 546);
var hashPath = this._getHashPath();

        _yuitest_coverline("build/router/router.js", 548);
if (hashPath) {
            // This is an HTML5 browser and we have a hash-based path in the
            // URL, so we need to upgrade the URL to a non-hash URL. This
            // will trigger a `history:change` event, which will in turn
            // trigger a dispatch.
            _yuitest_coverline("build/router/router.js", 553);
this.once(EVT_READY, function () {
                _yuitest_coverfunc("build/router/router.js", "(anonymous 7)", 553);
_yuitest_coverline("build/router/router.js", 554);
this.replace(hashPath);
            });

            _yuitest_coverline("build/router/router.js", 557);
return true;
        }

        _yuitest_coverline("build/router/router.js", 560);
return false;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Wrapper around `decodeURIComponent` that also converts `+` chars into
    spaces.

    @method _decode
    @param {String} string String to decode.
    @return {String} Decoded string.
    @protected
    **/
    _decode: function (string) {
        _yuitest_coverfunc("build/router/router.js", "_decode", 574);
_yuitest_coverline("build/router/router.js", 575);
return decodeURIComponent(string.replace(/\+/g, ' '));
    },

    /**
    Shifts the topmost `_save()` call off the queue and executes it. Does
    nothing if the queue is empty.

    @method _dequeue
    @chainable
    @see _queue
    @protected
    **/
    _dequeue: function () {
        _yuitest_coverfunc("build/router/router.js", "_dequeue", 587);
_yuitest_coverline("build/router/router.js", 588);
var self = this,
            fn;

        // If window.onload hasn't yet fired, wait until it has before
        // dequeueing. This will ensure that we don't call pushState() before an
        // initial popstate event has fired.
        _yuitest_coverline("build/router/router.js", 594);
if (!YUI.Env.windowLoaded) {
            _yuitest_coverline("build/router/router.js", 595);
Y.once('load', function () {
                _yuitest_coverfunc("build/router/router.js", "(anonymous 8)", 595);
_yuitest_coverline("build/router/router.js", 596);
self._dequeue();
            });

            _yuitest_coverline("build/router/router.js", 599);
return this;
        }

        _yuitest_coverline("build/router/router.js", 602);
fn = saveQueue.shift();
        _yuitest_coverline("build/router/router.js", 603);
return fn ? fn() : this;
    },

    /**
    Dispatches to the first route handler that matches the specified _path_.

    If called before the `ready` event has fired, the dispatch will be aborted.
    This ensures normalized behavior between Chrome (which fires a `popstate`
    event on every pageview) and other browsers (which do not).

    @method _dispatch
    @param {String} path URL path.
    @param {String} url Full URL.
    @param {String} src What initiated the dispatch.
    @chainable
    @protected
    **/
    _dispatch: function (path, url, src) {
        _yuitest_coverfunc("build/router/router.js", "_dispatch", 620);
_yuitest_coverline("build/router/router.js", 621);
var self      = this,
            decode    = self._decode,
            routes    = self.match(path),
            callbacks = [],
            matches, req, res;

        _yuitest_coverline("build/router/router.js", 627);
self._dispatching = self._dispatched = true;

        _yuitest_coverline("build/router/router.js", 629);
if (!routes || !routes.length) {
            _yuitest_coverline("build/router/router.js", 630);
self._dispatching = false;
            _yuitest_coverline("build/router/router.js", 631);
return self;
        }

        _yuitest_coverline("build/router/router.js", 634);
req = self._getRequest(path, url, src);
        _yuitest_coverline("build/router/router.js", 635);
res = self._getResponse(req);

        _yuitest_coverline("build/router/router.js", 637);
req.next = function (err) {
            _yuitest_coverfunc("build/router/router.js", "next", 637);
_yuitest_coverline("build/router/router.js", 638);
var callback, name, route;

            _yuitest_coverline("build/router/router.js", 640);
if (err) {
                // Special case "route" to skip to the next route handler
                // avoiding any additional callbacks for the current route.
                _yuitest_coverline("build/router/router.js", 643);
if (err === 'route') {
                    _yuitest_coverline("build/router/router.js", 644);
callbacks = [];
                    _yuitest_coverline("build/router/router.js", 645);
req.next();
                } else {
                    _yuitest_coverline("build/router/router.js", 647);
Y.error(err);
                }

            } else {_yuitest_coverline("build/router/router.js", 650);
if ((callback = callbacks.shift())) {
                _yuitest_coverline("build/router/router.js", 651);
if (typeof callback === 'string') {
                    _yuitest_coverline("build/router/router.js", 652);
name     = callback;
                    _yuitest_coverline("build/router/router.js", 653);
callback = self[name];

                    _yuitest_coverline("build/router/router.js", 655);
if (!callback) {
                        _yuitest_coverline("build/router/router.js", 656);
Y.error('Router: Callback not found: ' + name, null, 'router');
                    }
                }

                // Allow access to the number of remaining callbacks for the
                // route.
                _yuitest_coverline("build/router/router.js", 662);
req.pendingCallbacks = callbacks.length;

                _yuitest_coverline("build/router/router.js", 664);
callback.call(self, req, res, req.next);

            } else {_yuitest_coverline("build/router/router.js", 666);
if ((route = routes.shift())) {
                // Make a copy of this route's `callbacks` so the original array
                // is preserved.
                _yuitest_coverline("build/router/router.js", 669);
callbacks = route.callbacks.concat();

                // Decode each of the path matches so that the any URL-encoded
                // path segments are decoded in the `req.params` object.
                _yuitest_coverline("build/router/router.js", 673);
matches = YArray.map(route.regex.exec(path) || [], decode);

                // Use named keys for parameter names if the route path contains
                // named keys. Otherwise, use numerical match indices.
                _yuitest_coverline("build/router/router.js", 677);
if (matches.length === route.keys.length + 1) {
                    _yuitest_coverline("build/router/router.js", 678);
req.params = YArray.hash(route.keys, matches.slice(1));
                } else {
                    _yuitest_coverline("build/router/router.js", 680);
req.params = matches.concat();
                }

                // Allow access to the number of remaining routes for this
                // request.
                _yuitest_coverline("build/router/router.js", 685);
req.pendingRoutes = routes.length;

                // Execute this route's `callbacks`.
                _yuitest_coverline("build/router/router.js", 688);
req.next();
            }}}
        };

        _yuitest_coverline("build/router/router.js", 692);
req.next();

        _yuitest_coverline("build/router/router.js", 694);
self._dispatching = false;
        _yuitest_coverline("build/router/router.js", 695);
return self._dequeue();
    },

    /**
    Returns the resolved path from the hash fragment, or an empty string if the
    hash is not path-like.

    @method _getHashPath
    @param {String} [hash] Hash fragment to resolve into a path. By default this
        will be the hash from the current URL.
    @return {String} Current hash path, or an empty string if the hash is empty.
    @protected
    **/
    _getHashPath: function (hash) {
        _yuitest_coverfunc("build/router/router.js", "_getHashPath", 708);
_yuitest_coverline("build/router/router.js", 709);
hash || (hash = HistoryHash.getHash());

        // Make sure the `hash` is path-like.
        _yuitest_coverline("build/router/router.js", 712);
if (hash && hash.charAt(0) === '/') {
            _yuitest_coverline("build/router/router.js", 713);
return this._joinURL(hash);
        }

        _yuitest_coverline("build/router/router.js", 716);
return '';
    },

    /**
    Gets the location origin (i.e., protocol, host, and port) as a URL.

    @example
        http://example.com

    @method _getOrigin
    @return {String} Location origin (i.e., protocol, host, and port).
    @protected
    **/
    _getOrigin: function () {
        _yuitest_coverfunc("build/router/router.js", "_getOrigin", 729);
_yuitest_coverline("build/router/router.js", 730);
var location = Y.getLocation();
        _yuitest_coverline("build/router/router.js", 731);
return location.origin || (location.protocol + '//' + location.host);
    },

    /**
    Gets the current route path, relative to the `root` (if any).

    @method _getPath
    @return {String} Current route path.
    @protected
    **/
    _getPath: function () {
        _yuitest_coverfunc("build/router/router.js", "_getPath", 741);
_yuitest_coverline("build/router/router.js", 742);
var path = (!this._html5 && this._getHashPath()) ||
                Y.getLocation().pathname;

        _yuitest_coverline("build/router/router.js", 745);
return this.removeQuery(this.removeRoot(path));
    },

    /**
    Returns the current path root after popping off the last path segment,
    making it useful for resolving other URL paths against.

    The path root will always begin and end with a '/'.

    @method _getPathRoot
    @return {String} The URL's path root.
    @protected
    @since 3.5.0
    **/
    _getPathRoot: function () {
        _yuitest_coverfunc("build/router/router.js", "_getPathRoot", 759);
_yuitest_coverline("build/router/router.js", 760);
var slash = '/',
            path  = Y.getLocation().pathname,
            segments;

        _yuitest_coverline("build/router/router.js", 764);
if (path.charAt(path.length - 1) === slash) {
            _yuitest_coverline("build/router/router.js", 765);
return path;
        }

        _yuitest_coverline("build/router/router.js", 768);
segments = path.split(slash);
        _yuitest_coverline("build/router/router.js", 769);
segments.pop();

        _yuitest_coverline("build/router/router.js", 771);
return segments.join(slash) + slash;
    },

    /**
    Gets the current route query string.

    @method _getQuery
    @return {String} Current route query string.
    @protected
    **/
    _getQuery: function () {
        _yuitest_coverfunc("build/router/router.js", "_getQuery", 781);
_yuitest_coverline("build/router/router.js", 782);
var location = Y.getLocation(),
            hash, matches;

        _yuitest_coverline("build/router/router.js", 785);
if (this._html5) {
            _yuitest_coverline("build/router/router.js", 786);
return location.search.substring(1);
        }

        _yuitest_coverline("build/router/router.js", 789);
hash    = HistoryHash.getHash();
        _yuitest_coverline("build/router/router.js", 790);
matches = hash.match(this._regexUrlQuery);

        _yuitest_coverline("build/router/router.js", 792);
return hash && matches ? matches[1] : location.search.substring(1);
    },

    /**
    Creates a regular expression from the given route specification. If _path_
    is already a regex, it will be returned unmodified.

    @method _getRegex
    @param {String|RegExp} path Route path specification.
    @param {Array} keys Array reference to which route parameter names will be
      added.
    @return {RegExp} Route regex.
    @protected
    **/
    _getRegex: function (path, keys) {
        _yuitest_coverfunc("build/router/router.js", "_getRegex", 806);
_yuitest_coverline("build/router/router.js", 807);
if (path instanceof RegExp) {
            _yuitest_coverline("build/router/router.js", 808);
return path;
        }

        // Special case for catchall paths.
        _yuitest_coverline("build/router/router.js", 812);
if (path === '*') {
            _yuitest_coverline("build/router/router.js", 813);
return (/.*/);
        }

        _yuitest_coverline("build/router/router.js", 816);
path = path.replace(this._regexPathParam, function (match, operator, key) {
            // Only `*` operators are supported for key-less matches to allowing
            // in-path wildcards like: '/foo/*'.
            _yuitest_coverfunc("build/router/router.js", "(anonymous 9)", 816);
_yuitest_coverline("build/router/router.js", 819);
if (!key) {
                _yuitest_coverline("build/router/router.js", 820);
return operator === '*' ? '.*' : match;
            }

            _yuitest_coverline("build/router/router.js", 823);
keys.push(key);
            _yuitest_coverline("build/router/router.js", 824);
return operator === '*' ? '(.*?)' : '([^/#?]*)';
        });

        _yuitest_coverline("build/router/router.js", 827);
return new RegExp('^' + path + '$');
    },

    /**
    Gets a request object that can be passed to a route handler.

    @method _getRequest
    @param {String} path Current path being dispatched.
    @param {String} url Current full URL being dispatched.
    @param {String} src What initiated the dispatch.
    @return {Object} Request object.
    @protected
    **/
    _getRequest: function (path, url, src) {
        _yuitest_coverfunc("build/router/router.js", "_getRequest", 840);
_yuitest_coverline("build/router/router.js", 841);
return {
            path : path,
            query: this._parseQuery(this._getQuery()),
            url  : url,
            src  : src
        };
    },

    /**
    Gets a response object that can be passed to a route handler.

    @method _getResponse
    @param {Object} req Request object.
    @return {Object} Response Object.
    @protected
    **/
    _getResponse: function (req) {
        // For backwards compatibility, the response object is a function that
        // calls `next()` on the request object and returns the result.
        _yuitest_coverfunc("build/router/router.js", "_getResponse", 857);
_yuitest_coverline("build/router/router.js", 860);
var res = function () {
            _yuitest_coverfunc("build/router/router.js", "res", 860);
_yuitest_coverline("build/router/router.js", 861);
return req.next.apply(this, arguments);
        };

        _yuitest_coverline("build/router/router.js", 864);
res.req = req;
        _yuitest_coverline("build/router/router.js", 865);
return res;
    },

    /**
    Getter for the `routes` attribute.

    @method _getRoutes
    @return {Object[]} Array of route objects.
    @protected
    **/
    _getRoutes: function () {
        _yuitest_coverfunc("build/router/router.js", "_getRoutes", 875);
_yuitest_coverline("build/router/router.js", 876);
return this._routes.concat();
    },

    /**
    Gets the current full URL.

    @method _getURL
    @return {String} URL.
    @protected
    **/
    _getURL: function () {
        _yuitest_coverfunc("build/router/router.js", "_getURL", 886);
_yuitest_coverline("build/router/router.js", 887);
var url = Y.getLocation().toString();

        _yuitest_coverline("build/router/router.js", 889);
if (!this._html5) {
            _yuitest_coverline("build/router/router.js", 890);
url = this._upgradeURL(url);
        }

        _yuitest_coverline("build/router/router.js", 893);
return url;
    },

    /**
    Returns `true` when the specified `url` is from the same origin as the
    current URL; i.e., the protocol, host, and port of the URLs are the same.

    All host or path relative URLs are of the same origin. A scheme-relative URL
    is first prefixed with the current scheme before being evaluated.

    @method _hasSameOrigin
    @param {String} url URL to compare origin with the current URL.
    @return {Boolean} Whether the URL has the same origin of the current URL.
    @protected
    **/
    _hasSameOrigin: function (url) {
        _yuitest_coverfunc("build/router/router.js", "_hasSameOrigin", 908);
_yuitest_coverline("build/router/router.js", 909);
var origin = ((url && url.match(this._regexUrlOrigin)) || [])[0];

        // Prepend current scheme to scheme-relative URLs.
        _yuitest_coverline("build/router/router.js", 912);
if (origin && origin.indexOf('//') === 0) {
            _yuitest_coverline("build/router/router.js", 913);
origin = Y.getLocation().protocol + origin;
        }

        _yuitest_coverline("build/router/router.js", 916);
return !origin || origin === this._getOrigin();
    },

    /**
    Joins the `root` URL to the specified _url_, normalizing leading/trailing
    `/` characters.

    @example
        router.set('root', '/foo');
        router._joinURL('bar');  // => '/foo/bar'
        router._joinURL('/bar'); // => '/foo/bar'

        router.set('root', '/foo/');
        router._joinURL('bar');  // => '/foo/bar'
        router._joinURL('/bar'); // => '/foo/bar'

    @method _joinURL
    @param {String} url URL to append to the `root` URL.
    @return {String} Joined URL.
    @protected
    **/
    _joinURL: function (url) {
        _yuitest_coverfunc("build/router/router.js", "_joinURL", 937);
_yuitest_coverline("build/router/router.js", 938);
var root = this.get('root');

        // Causes `url` to _always_ begin with a "/".
        _yuitest_coverline("build/router/router.js", 941);
url = this.removeRoot(url);

        _yuitest_coverline("build/router/router.js", 943);
if (url.charAt(0) === '/') {
            _yuitest_coverline("build/router/router.js", 944);
url = url.substring(1);
        }

        _yuitest_coverline("build/router/router.js", 947);
return root && root.charAt(root.length - 1) === '/' ?
                root + url :
                root + '/' + url;
    },

    /**
    Returns a normalized path, ridding it of any '..' segments and properly
    handling leading and trailing slashes.

    @method _normalizePath
    @param {String} path URL path to normalize.
    @return {String} Normalized path.
    @protected
    @since 3.5.0
    **/
    _normalizePath: function (path) {
        _yuitest_coverfunc("build/router/router.js", "_normalizePath", 962);
_yuitest_coverline("build/router/router.js", 963);
var dots  = '..',
            slash = '/',
            i, len, normalized, segments, segment, stack;

        _yuitest_coverline("build/router/router.js", 967);
if (!path || path === slash) {
            _yuitest_coverline("build/router/router.js", 968);
return slash;
        }

        _yuitest_coverline("build/router/router.js", 971);
segments = path.split(slash);
        _yuitest_coverline("build/router/router.js", 972);
stack    = [];

        _yuitest_coverline("build/router/router.js", 974);
for (i = 0, len = segments.length; i < len; ++i) {
            _yuitest_coverline("build/router/router.js", 975);
segment = segments[i];

            _yuitest_coverline("build/router/router.js", 977);
if (segment === dots) {
                _yuitest_coverline("build/router/router.js", 978);
stack.pop();
            } else {_yuitest_coverline("build/router/router.js", 979);
if (segment) {
                _yuitest_coverline("build/router/router.js", 980);
stack.push(segment);
            }}
        }

        _yuitest_coverline("build/router/router.js", 984);
normalized = slash + stack.join(slash);

        // Append trailing slash if necessary.
        _yuitest_coverline("build/router/router.js", 987);
if (normalized !== slash && path.charAt(path.length - 1) === slash) {
            _yuitest_coverline("build/router/router.js", 988);
normalized += slash;
        }

        _yuitest_coverline("build/router/router.js", 991);
return normalized;
    },

    /**
    Parses a URL query string into a key/value hash. If `Y.QueryString.parse` is
    available, this method will be an alias to that.

    @method _parseQuery
    @param {String} query Query string to parse.
    @return {Object} Hash of key/value pairs for query parameters.
    @protected
    **/
    _parseQuery: QS && QS.parse ? QS.parse : function (query) {
        _yuitest_coverfunc("build/router/router.js", "parse", 1003);
_yuitest_coverline("build/router/router.js", 1004);
var decode = this._decode,
            params = query.split('&'),
            i      = 0,
            len    = params.length,
            result = {},
            param;

        _yuitest_coverline("build/router/router.js", 1011);
for (; i < len; ++i) {
            _yuitest_coverline("build/router/router.js", 1012);
param = params[i].split('=');

            _yuitest_coverline("build/router/router.js", 1014);
if (param[0]) {
                _yuitest_coverline("build/router/router.js", 1015);
result[decode(param[0])] = decode(param[1] || '');
            }
        }

        _yuitest_coverline("build/router/router.js", 1019);
return result;
    },

    /**
    Queues up a `_save()` call to run after all previously-queued calls have
    finished.

    This is necessary because if we make multiple `_save()` calls before the
    first call gets dispatched, then both calls will dispatch to the last call's
    URL.

    All arguments passed to `_queue()` will be passed on to `_save()` when the
    queued function is executed.

    @method _queue
    @chainable
    @see _dequeue
    @protected
    **/
    _queue: function () {
        _yuitest_coverfunc("build/router/router.js", "_queue", 1038);
_yuitest_coverline("build/router/router.js", 1039);
var args = arguments,
            self = this;

        _yuitest_coverline("build/router/router.js", 1042);
saveQueue.push(function () {
            _yuitest_coverfunc("build/router/router.js", "(anonymous 10)", 1042);
_yuitest_coverline("build/router/router.js", 1043);
if (self._html5) {
                _yuitest_coverline("build/router/router.js", 1044);
if (Y.UA.ios && Y.UA.ios < 5) {
                    // iOS <5 has buggy HTML5 history support, and needs to be
                    // synchronous.
                    _yuitest_coverline("build/router/router.js", 1047);
self._save.apply(self, args);
                } else {
                    // Wrapped in a timeout to ensure that _save() calls are
                    // always processed asynchronously. This ensures consistency
                    // between HTML5- and hash-based history.
                    _yuitest_coverline("build/router/router.js", 1052);
setTimeout(function () {
                        _yuitest_coverfunc("build/router/router.js", "(anonymous 11)", 1052);
_yuitest_coverline("build/router/router.js", 1053);
self._save.apply(self, args);
                    }, 1);
                }
            } else {
                _yuitest_coverline("build/router/router.js", 1057);
self._dispatching = true; // otherwise we'll dequeue too quickly
                _yuitest_coverline("build/router/router.js", 1058);
self._save.apply(self, args);
            }

            _yuitest_coverline("build/router/router.js", 1061);
return self;
        });

        _yuitest_coverline("build/router/router.js", 1064);
return !this._dispatching ? this._dequeue() : this;
    },

    /**
    Returns the normalized result of resolving the `path` against the current
    path. Falsy values for `path` will return just the current path.

    @method _resolvePath
    @param {String} path URL path to resolve.
    @return {String} Resolved path.
    @protected
    @since 3.5.0
    **/
    _resolvePath: function (path) {
        _yuitest_coverfunc("build/router/router.js", "_resolvePath", 1077);
_yuitest_coverline("build/router/router.js", 1078);
if (!path) {
            _yuitest_coverline("build/router/router.js", 1079);
return Y.getLocation().pathname;
        }

        _yuitest_coverline("build/router/router.js", 1082);
if (path.charAt(0) !== '/') {
            _yuitest_coverline("build/router/router.js", 1083);
path = this._getPathRoot() + path;
        }

        _yuitest_coverline("build/router/router.js", 1086);
return this._normalizePath(path);
    },

    /**
    Resolves the specified URL against the current URL.

    This method resolves URLs like a browser does and will always return an
    absolute URL. When the specified URL is already absolute, it is assumed to
    be fully resolved and is simply returned as is. Scheme-relative URLs are
    prefixed with the current protocol. Relative URLs are giving the current
    URL's origin and are resolved and normalized against the current path root.

    @method _resolveURL
    @param {String} url URL to resolve.
    @return {String} Resolved URL.
    @protected
    @since 3.5.0
    **/
    _resolveURL: function (url) {
        _yuitest_coverfunc("build/router/router.js", "_resolveURL", 1104);
_yuitest_coverline("build/router/router.js", 1105);
var parts    = url && url.match(this._regexURL),
            origin, path, query, hash, resolved;

        _yuitest_coverline("build/router/router.js", 1108);
if (!parts) {
            _yuitest_coverline("build/router/router.js", 1109);
return Y.getLocation().toString();
        }

        _yuitest_coverline("build/router/router.js", 1112);
origin = parts[1];
        _yuitest_coverline("build/router/router.js", 1113);
path   = parts[2];
        _yuitest_coverline("build/router/router.js", 1114);
query  = parts[3];
        _yuitest_coverline("build/router/router.js", 1115);
hash   = parts[4];

        // Absolute and scheme-relative URLs are assumed to be fully-resolved.
        _yuitest_coverline("build/router/router.js", 1118);
if (origin) {
            // Prepend the current scheme for scheme-relative URLs.
            _yuitest_coverline("build/router/router.js", 1120);
if (origin.indexOf('//') === 0) {
                _yuitest_coverline("build/router/router.js", 1121);
origin = Y.getLocation().protocol + origin;
            }

            _yuitest_coverline("build/router/router.js", 1124);
return origin + (path || '/') + (query || '') + (hash || '');
        }

        // Will default to the current origin and current path.
        _yuitest_coverline("build/router/router.js", 1128);
resolved = this._getOrigin() + this._resolvePath(path);

        // A path or query for the specified URL trumps the current URL's.
        _yuitest_coverline("build/router/router.js", 1131);
if (path || query) {
            _yuitest_coverline("build/router/router.js", 1132);
return resolved + (query || '') + (hash || '');
        }

        _yuitest_coverline("build/router/router.js", 1135);
query = this._getQuery();

        _yuitest_coverline("build/router/router.js", 1137);
return resolved + (query ? ('?' + query) : '') + (hash || '');
    },

    /**
    Saves a history entry using either `pushState()` or the location hash.

    This method enforces the same-origin security constraint; attempting to save
    a `url` that is not from the same origin as the current URL will result in
    an error.

    @method _save
    @param {String} [url] URL for the history entry.
    @param {Boolean} [replace=false] If `true`, the current history entry will
      be replaced instead of a new one being added.
    @chainable
    @protected
    **/
    _save: function (url, replace) {
        _yuitest_coverfunc("build/router/router.js", "_save", 1154);
_yuitest_coverline("build/router/router.js", 1155);
var urlIsString = typeof url === 'string',
            currentPath, root;

        // Perform same-origin check on the specified URL.
        _yuitest_coverline("build/router/router.js", 1159);
if (urlIsString && !this._hasSameOrigin(url)) {
            _yuitest_coverline("build/router/router.js", 1160);
Y.error('Security error: The new URL must be of the same origin as the current URL.');
            _yuitest_coverline("build/router/router.js", 1161);
return this;
        }

        // Joins the `url` with the `root`.
        _yuitest_coverline("build/router/router.js", 1165);
if (urlIsString) {
            _yuitest_coverline("build/router/router.js", 1166);
url = this._joinURL(url);
        }

        // Force _ready to true to ensure that the history change is handled
        // even if _save is called before the `ready` event fires.
        _yuitest_coverline("build/router/router.js", 1171);
this._ready = true;

        _yuitest_coverline("build/router/router.js", 1173);
if (this._html5) {
            _yuitest_coverline("build/router/router.js", 1174);
this._history[replace ? 'replace' : 'add'](null, {url: url});
        } else {
            _yuitest_coverline("build/router/router.js", 1176);
currentPath = Y.getLocation().pathname;
            _yuitest_coverline("build/router/router.js", 1177);
root        = this.get('root');

            // Determine if the `root` already exists in the current location's
            // `pathname`, and if it does then we can exclude it from the
            // hash-based path. No need to duplicate the info in the URL.
            _yuitest_coverline("build/router/router.js", 1182);
if (root === currentPath || root === this._getPathRoot()) {
                _yuitest_coverline("build/router/router.js", 1183);
url = this.removeRoot(url);
            }

            // The `hashchange` event only fires when the new hash is actually
            // different. This makes sure we'll always dequeue and dispatch
            // _all_ router instances, mimicking the HTML5 behavior.
            _yuitest_coverline("build/router/router.js", 1189);
if (url === HistoryHash.getHash()) {
                _yuitest_coverline("build/router/router.js", 1190);
Y.Router.dispatch();
            } else {
                _yuitest_coverline("build/router/router.js", 1192);
HistoryHash[replace ? 'replaceHash' : 'setHash'](url);
            }
        }

        _yuitest_coverline("build/router/router.js", 1196);
return this;
    },

    /**
    Setter for the `routes` attribute.

    @method _setRoutes
    @param {Object[]} routes Array of route objects.
    @return {Object[]} Array of route objects.
    @protected
    **/
    _setRoutes: function (routes) {
        _yuitest_coverfunc("build/router/router.js", "_setRoutes", 1207);
_yuitest_coverline("build/router/router.js", 1208);
this._routes = [];

        _yuitest_coverline("build/router/router.js", 1210);
YArray.each(routes, function (route) {
            // Makes sure to check `callback` for back-compat.
            _yuitest_coverfunc("build/router/router.js", "(anonymous 12)", 1210);
_yuitest_coverline("build/router/router.js", 1212);
var callbacks = route.callbacks || route.callback;

            _yuitest_coverline("build/router/router.js", 1214);
this.route(route.path, callbacks);
        }, this);

        _yuitest_coverline("build/router/router.js", 1217);
return this._routes.concat();
    },

    /**
    Upgrades a hash-based URL to a full-path URL, if necessary.

    The specified `url` will be upgraded if its of the same origin as the
    current URL and has a path-like hash. URLs that don't need upgrading will be
    returned as-is.

    @example
        app._upgradeURL('http://example.com/#/foo/'); // => 'http://example.com/foo/';

    @method _upgradeURL
    @param {String} url The URL to upgrade from hash-based to full-path.
    @return {String} The upgraded URL, or the specified URL untouched.
    @protected
    @since 3.5.0
    **/
    _upgradeURL: function (url) {
        // We should not try to upgrade paths for external URLs.
        _yuitest_coverfunc("build/router/router.js", "_upgradeURL", 1236);
_yuitest_coverline("build/router/router.js", 1238);
if (!this._hasSameOrigin(url)) {
            _yuitest_coverline("build/router/router.js", 1239);
return url;
        }

        _yuitest_coverline("build/router/router.js", 1242);
var hash       = (url.match(/#(.*)$/) || [])[1] || '',
            hashPrefix = Y.HistoryHash.hashPrefix,
            hashPath;

        // Strip any hash prefix, like hash-bangs.
        _yuitest_coverline("build/router/router.js", 1247);
if (hashPrefix && hash.indexOf(hashPrefix) === 0) {
            _yuitest_coverline("build/router/router.js", 1248);
hash = hash.replace(hashPrefix, '');
        }

        // If the hash looks like a URL path, assume it is, and upgrade it!
        _yuitest_coverline("build/router/router.js", 1252);
if (hash) {
            _yuitest_coverline("build/router/router.js", 1253);
hashPath = this._getHashPath(hash);

            _yuitest_coverline("build/router/router.js", 1255);
if (hashPath) {
                _yuitest_coverline("build/router/router.js", 1256);
return this._resolveURL(hashPath);
            }
        }

        _yuitest_coverline("build/router/router.js", 1260);
return url;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles `history:change` and `hashchange` events.

    @method _afterHistoryChange
    @param {EventFacade} e
    @protected
    **/
    _afterHistoryChange: function (e) {
        _yuitest_coverfunc("build/router/router.js", "_afterHistoryChange", 1272);
_yuitest_coverline("build/router/router.js", 1273);
var self       = this,
            src        = e.src,
            prevURL    = self._url,
            currentURL = self._getURL();

        _yuitest_coverline("build/router/router.js", 1278);
self._url = currentURL;

        // Handles the awkwardness that is the `popstate` event. HTML5 browsers
        // fire `popstate` right before they fire `hashchange`, and Chrome fires
        // `popstate` on page load. If this router is not ready or the previous
        // and current URLs only differ by their hash, then we want to ignore
        // this `popstate` event.
        _yuitest_coverline("build/router/router.js", 1285);
if (src === 'popstate' &&
                (!self._ready || prevURL.replace(/#.*$/, '') === currentURL.replace(/#.*$/, ''))) {

            _yuitest_coverline("build/router/router.js", 1288);
return;
        }

        _yuitest_coverline("build/router/router.js", 1291);
self._dispatch(self._getPath(), currentURL, src);
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default handler for the `ready` event.

    @method _defReadyFn
    @param {EventFacade} e
    @protected
    **/
    _defReadyFn: function (e) {
        _yuitest_coverfunc("build/router/router.js", "_defReadyFn", 1303);
_yuitest_coverline("build/router/router.js", 1304);
this._ready = true;
    }
}, {
    // -- Static Properties ----------------------------------------------------
    NAME: 'router',

    ATTRS: {
        /**
        Whether or not this browser is capable of using HTML5 history.

        Setting this to `false` will force the use of hash-based history even on
        HTML5 browsers, but please don't do this unless you understand the
        consequences.

        @attribute html5
        @type Boolean
        @initOnly
        **/
        html5: {
            // Android versions lower than 3.0 are buggy and don't update
            // window.location after a pushState() call, so we fall back to
            // hash-based history for them.
            //
            // See http://code.google.com/p/android/issues/detail?id=17471
            valueFn: function () { _yuitest_coverfunc("build/router/router.js", "valueFn", 1328);
_yuitest_coverline("build/router/router.js", 1328);
return Y.Router.html5; },
            writeOnce: 'initOnly'
        },

        /**
        Absolute root path from which all routes should be evaluated.

        For example, if your router is running on a page at
        `http://example.com/myapp/` and you add a route with the path `/`, your
        route will never execute, because the path will always be preceded by
        `/myapp`. Setting `root` to `/myapp` would cause all routes to be
        evaluated relative to that root URL, so the `/` route would then execute
        when the user browses to `http://example.com/myapp/`.

        @attribute root
        @type String
        @default `''`
        **/
        root: {
            value: ''
        },

        /**
        Array of route objects.

        Each item in the array must be an object with the following properties:

          * `path`: String or regex representing the path to match. See the docs
            for the `route()` method for more details.

          * `callbacks`: Function or a string representing the name of a
            function on this router instance that should be called when the
            route is triggered. An array of functions and/or strings may also be
            provided. See the docs for the `route()` method for more details.

        This attribute is intended to be used to set routes at init time, or to
        completely reset all routes after init. To add routes after init without
        resetting all existing routes, use the `route()` method.

        @attribute routes
        @type Object[]
        @default `[]`
        @see route
        **/
        routes: {
            value : [],
            getter: '_getRoutes',
            setter: '_setRoutes'
        }
    },

    // Used as the default value for the `html5` attribute, and for testing.
    html5: Y.HistoryBase.html5 && (!Y.UA.android || Y.UA.android >= 3),

    // To make this testable.
    _instances: instances,

    /**
    Dispatches to the first route handler that matches the specified `path` for
    all active router instances.

    This provides a mechanism to cause all active router instances to dispatch
    to their route handlers without needing to change the URL or fire the
    `history:change` or `hashchange` event.

    @method dispatch
    @static
    @since 3.6.0
    **/
    dispatch: function () {
        _yuitest_coverfunc("build/router/router.js", "dispatch", 1397);
_yuitest_coverline("build/router/router.js", 1398);
var i, len, router;

        _yuitest_coverline("build/router/router.js", 1400);
for (i = 0, len = instances.length; i < len; i += 1) {
            _yuitest_coverline("build/router/router.js", 1401);
router = instances[i];

            _yuitest_coverline("build/router/router.js", 1403);
if (router) {
                _yuitest_coverline("build/router/router.js", 1404);
router._dispatch(router._getPath(), router._getURL());
            }
        }
    }
});

/**
The `Controller` class was deprecated in YUI 3.5.0 and is now an alias for the
`Router` class. Use that class instead. This alias will be removed in a future
version of YUI.

@class Controller
@constructor
@extends Base
@deprecated Use `Router` instead.
@see Router
**/
_yuitest_coverline("build/router/router.js", 1421);
Y.Controller = Y.Router;


}, '@VERSION@', {"optional": ["querystring-parse"], "requires": ["array-extras", "base-build", "history"]});
