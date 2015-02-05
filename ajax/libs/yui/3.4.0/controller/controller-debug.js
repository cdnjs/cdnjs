YUI.add('controller', function(Y) {

/**
The app framework provides simple MVC-like building blocks (models, model lists,
views, and controllers) for writing single-page JavaScript applications.

@main app
@module app
@since 3.4.0
**/

/**
Provides URL-based routing using HTML5 `pushState()` or the location hash.

@submodule controller
@since 3.4.0
**/

/**
Provides URL-based routing using HTML5 `pushState()` or the location hash.

This makes it easy to wire up route handlers for different application states
while providing full back/forward navigation support and bookmarkable, shareable
URLs.

@class Controller
@constructor
@extends Base
@since 3.4.0
**/

var HistoryHash = Y.HistoryHash,
    Lang        = Y.Lang,
    QS          = Y.QueryString,
    YArray      = Y.Array,

    // Android versions lower than 3.0 are buggy and don't update
    // window.location after a pushState() call, so we fall back to hash-based
    // history for them.
    //
    // See http://code.google.com/p/android/issues/detail?id=17471
    html5    = Y.HistoryBase.html5 && (!Y.UA.android || Y.UA.android >= 3),
    win      = Y.config.win,
    location = win.location,

    // We have to queue up pushState calls to avoid race conditions, since the
    // popstate event doesn't actually provide any info on what URL it's
    // associated with.
    saveQueue = [],

    /**
    Fired when the controller is ready to begin dispatching to route handlers.

    You shouldn't need to wait for this event unless you plan to implement some
    kind of custom dispatching logic. It's used internally in order to avoid
    dispatching to an initial route if a browser history change occurs first.

    @event ready
    @param {Boolean} dispatched `true` if routes have already been dispatched
      (most likely due to a history change).
    @fireOnce
    **/
    EVT_READY = 'ready';

function Controller() {
    Controller.superclass.constructor.apply(this, arguments);
}

Y.Controller = Y.extend(Controller, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    Whether or not this browser is capable of using HTML5 history.

    This property is for informational purposes only. It's not configurable, and
    changing it will have no effect.

    @property html5
    @type Boolean
    **/
    html5: html5,

    /**
    Absolute root path from which all routes should be evaluated.

    For example, if your controller is running on a page at
    `http://example.com/myapp/` and you add a route with the path `/`, your
    route will never execute, because the path will always be preceded by
    `/myapp`. Setting `root` to `/myapp` would cause all routes to be evaluated
    relative to that root URL, so the `/` route would then execute when the
    user browses to `http://example.com/myapp/`.

    This property may be overridden in a subclass, set after instantiation, or
    passed as a config attribute when instantiating a `Y.Controller`-based
    class.

    @property root
    @type String
    @default `''`
    **/
    root: '',

    /**
    Array of route objects specifying routes to be created at instantiation
    time.

    Each item in the array must be an object with the following properties:

      * `path`: String or regex representing the path to match. See the docs for
        the `route()` method for more details.
      * `callback`: Function or a string representing the name of a function on
        this controller instance that should be called when the route is
        triggered. See the docs for the `route()` method for more details.

    This property may be overridden in a subclass or passed as a config
    attribute when instantiating a `Y.Controller`-based class, but setting it
    after instantiation will have no effect (use the `route()` method instead).

    If routes are passed at instantiation time, they will override any routes
    set on the prototype.

    @property routes
    @type Object[]
    @default `[]`
    **/
    routes: [],

    // -- Protected Properties -------------------------------------------------

    /**
    Whether or not `_dispatch()` has been called since this controller was
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
      2. Parameter name.

    @property _regexPathParam
    @type RegExp
    @protected
    **/
    _regexPathParam: /([:*])([\w-]+)/g,

    /**
    Regex that matches and captures the query portion of a URL, minus the
    preceding `?` character, and discarding the hash portion of the URL if any.

    @property _regexUrlQuery
    @type RegExp
    @protected
    **/
    _regexUrlQuery: /\?([^#]*).*$/,

    /**
    Regex that matches everything before the path portion of an HTTP or HTTPS
    URL. This will be used to strip this part of the URL from a string when we
    only want the path.

    @property _regexUrlStrip
    @type RegExp
    @protected
    **/
    _regexUrlStrip: /^https?:\/\/[^\/]*/i,

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        var self = this;

        // Set config properties.
        config || (config = {});

        config.routes && (self.routes = config.routes);
        Lang.isValue(config.root) && (self.root = config.root);

        // Create routes.
        self._routes = [];

        YArray.each(self.routes, function (route) {
            self.route(route.path, route.callback);
        });

        // Set up a history instance or hashchange listener.
        if (html5) {
            self._history = new Y.HistoryHTML5({force: true});
            self._history.after('change', self._afterHistoryChange, self);
        } else {
            Y.on('hashchange', self._afterHistoryChange, win, self);
        }

        // Fire a 'ready' event once we're ready to route. We wait first for all
        // subclass initializers to finish, then for window.onload, and then an
        // additional 20ms to allow the browser to fire a useless initial
        // `popstate` event if it wants to (and Chrome always wants to).
        self.publish(EVT_READY, {
            defaultFn  : self._defReadyFn,
            fireOnce   : true,
            preventable: false
        });

        self.once('initializedChange', function () {
            Y.once('load', function () {
                setTimeout(function () {
                    self.fire(EVT_READY, {dispatched: !!self._dispatched});
                }, 20);
            });
        });
    },

    destructor: function () {
        if (html5) {
            this._history.detachAll();
        } else {
            Y.detach('hashchange', this._afterHistoryChange, win);
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
        this.once(EVT_READY, function () {
            this._ready = true;

            if (html5 && this.upgrade()) {
                return;
            } else {
                this._dispatch(this._getPath());
            }
        });

        return this;
    },

    /**
    Gets the current route path, relative to the `root` (if any).

    @method getPath
    @return {String} Current route path.
    **/
    getPath: function () {
        return this._getPath();
    },

    /**
    Returns `true` if this controller has at least one route that matches the
    specified URL path, `false` otherwise.

    @method hasRoute
    @param {String} path URL path to match.
    @return {Boolean} `true` if there's at least one matching route, `false`
      otherwise.
    **/
    hasRoute: function (path) {
        return !!this.match(path).length;
    },

    /**
    Returns an array of route objects that match the specified URL path.

    This method is called internally to determine which routes match the current
    path whenever the URL changes. You may override it if you want to customize
    the route matching logic, although this usually shouldn't be necessary.

    Each returned route object has the following properties:

      * `callback`: A function or a string representing the name of a function
        this controller that should be executed when the route is triggered.
      * `keys`: An array of strings representing the named parameters defined in
        the route's path specification, if any.
      * `path`: The route's path specification, which may be either a string or
        a regex.
      * `regex`: A regular expression version of the route's path specification.
        This regex is used to determine whether the route matches a given path.

    @example
        controller.route('/foo', function () {});
        controller.match('/foo');
        // => [{callback: ..., keys: [], path: '/foo', regex: ...}]

    @method match
    @param {String} path URL path to match.
    @return {Object[]} Array of route objects that match the specified path.
    **/
    match: function (path) {
        return YArray.filter(this._routes, function (route) {
            return path.search(route.regex) > -1;
        });
    },

    /**
    Removes the `root` URL from the from of _path_ (if it's there) and returns
    the result. The returned path will always have a leading `/`.

    @method removeRoot
    @param {String} path URL path.
    @return {String} Rootless path.
    **/
    removeRoot: function (path) {
        var root = this.root;

        // Strip out the non-path part of the URL, if any (e.g.
        // "http://foo.com"), so that we're left with just the path.
        path = path.replace(this._regexUrlStrip, '');

        if (root && path.indexOf(root) === 0) {
            path = path.substring(root.length);
        }

        return path.charAt(0) === '/' ? path : '/' + path;
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

        controller.replace('/path/');
        // New URL: http://example.com/path/

        controller.replace('/path?foo=bar');
        // New URL: http://example.com/path?foo=bar

        controller.replace('/');
        // New URL: http://example.com/

    @method replace
    @param {String} [url] URL to set. Should be a relative URL. If this
      controller's `root` property is set, this URL must be relative to the
      root URL. If no URL is specified, the page's current URL will be used.
    @chainable
    @see save()
    **/
    replace: function (url) {
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

    If multiple route handlers match a given URL, they will be executed in the
    order they were added. The first route that was added will be the first to
    be executed.

    @example
        controller.route('/photos/:tag/:page', function (req, next) {
          Y.log('Current tag: ' + req.params.tag);
          Y.log('Current page number: ' + req.params.page);
        });

    @method route
    @param {String|RegExp} path Path to match. May be a string or a regular
      expression.
    @param {Function|String} callback Callback function to call whenever this
        route is triggered. If specified as a string, the named function will be
        called on this controller instance.
      @param {Object} callback.req Request object containing information about
          the request. It contains the following properties.
        @param {Array|Object} callback.req.params Captured parameters matched by
          the route path specification. If a string path was used and contained
          named parameters, then this will be a key/value hash mapping parameter
          names to their matched values. If a regex path was used, this will be
          an array of subpattern matches starting at index 0 for the full match,
          then 1 for the first subpattern match, and so on.
        @param {String} callback.req.path The current URL path.
        @param {Object} callback.req.query Query hash representing the URL query
          string, if any. Parameter names are keys, and are mapped to parameter
          values.
      @param {Function} callback.next Callback to pass control to the next
        matching route. If you don't call this function, then no further route
        handlers will be executed, even if there are more that match. If you do
        call this function, then the next matching route handler (if any) will
        be called, and will receive the same `req` object that was passed to
        this route (so you can use the request object to pass data along to
        subsequent routes).
    @chainable
    **/
    route: function (path, callback) {
        var keys = [];

        this._routes.push({
            callback: callback,
            keys    : keys,
            path    : path,
            regex   : this._getRegex(path, keys)
        });

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

        controller.save('/path/');
        // New URL: http://example.com/path/

        controller.save('/path?foo=bar');
        // New URL: http://example.com/path?foo=bar

        controller.save('/');
        // New URL: http://example.com/

    @method save
    @param {String} [url] URL to set. Should be a relative URL. If this
      controller's `root` property is set, this URL must be relative to the
      root URL. If no URL is specified, the page's current URL will be used.
    @chainable
    @see replace()
    **/
    save: function (url) {
        return this._queue(url);
    },

    /**
    Upgrades a hash-based URL to an HTML5 URL if necessary. In non-HTML5
    browsers, this method is a noop.

    @method upgrade
    @return {Boolean} `true` if the URL was upgraded, `false` otherwise.
    **/
    upgrade: html5 ? function () {
        var hash = this._getHashPath();

        if (hash && hash.charAt(0) === '/') {
            // This is an HTML5 browser and we have a hash-based path in the
            // URL, so we need to upgrade the URL to a non-hash URL. This
            // will trigger a `history:change` event, which will in turn
            // trigger a dispatch.
            this.once(EVT_READY, function () {
                this.replace(hash);
            });

            return true;
        }

        return false;
    } : function () { return false; },

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
        var self = this,
            fn;

        // If window.onload hasn't yet fired, wait until it has before
        // dequeueing. This will ensure that we don't call pushState() before an
        // initial popstate event has fired.
        if (!YUI.Env.windowLoaded) {
            Y.once('load', function () {
                self._dequeue();
            });

            return this;
        }

        fn = saveQueue.shift();
        return fn ? fn() : this;
    },

    /**
    Dispatches to the first route handler that matches the specified _path_.

    If called before the `ready` event has fired, the dispatch will be aborted.
    This ensures normalized behavior between Chrome (which fires a `popstate`
    event on every pageview) and other browsers (which do not).

    @method _dispatch
    @param {String} path URL path.
    @chainable
    @protected
    **/
    _dispatch: function (path) {
        var self   = this,
            routes = self.match(path),
            req;

        self._dispatching = self._dispatched = true;

        if (!routes || !routes.length) {
            return self;
        }

        req = self._getRequest(path);

        req.next = function (err) {
            var callback, matches, route;

            if (err) {
                Y.error(err);
            } else if ((route = routes.shift())) {
                matches  = route.regex.exec(path);
                callback = typeof route.callback === 'string' ?
                        self[route.callback] : route.callback;

                // Use named keys for parameter names if the route path contains
                // named keys. Otherwise, use numerical match indices.
                if (matches.length === route.keys.length + 1) {
                    req.params = YArray.hash(route.keys, matches.slice(1));
                } else {
                    req.params = matches.concat();
                }

                callback.call(self, req, req.next);
            }
        };

        req.next();

        self._dispatching = false;
        return self._dequeue();
    },

    /**
    Gets the current path from the location hash, or an empty string if the
    hash is empty.

    @method _getHashPath
    @return {String} Current hash path, or an empty string if the hash is empty.
    @protected
    **/
    _getHashPath: function () {
        return HistoryHash.getHash().replace(this._regexUrlQuery, '');
    },

    /**
    Gets the current route path.

    @method _getPath
    @return {String} Current route path.
    @protected
    **/
    _getPath: html5 ? function () {
        return this.removeRoot(location.pathname);
    } : function () {
        return this._getHashPath() || this.removeRoot(location.pathname);
    },

    /**
    Gets the current route query string.

    @method _getQuery
    @return {String} Current route query string.
    @protected
    **/
    _getQuery: html5 ? function () {
        return location.search.substring(1);
    } : function () {
        var hash    = HistoryHash.getHash(),
            matches = hash.match(this._regexUrlQuery);

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
        if (path instanceof RegExp) {
            return path;
        }

        path = path.replace(this._regexPathParam, function (match, operator, key) {
            keys.push(key);
            return operator === '*' ? '(.*?)' : '([^/]*)';
        });

        return new RegExp('^' + path + '$');
    },

    /**
    Gets a request object that can be passed to a route handler.

    @method _getRequest
    @param {String} path Current path being dispatched.
    @return {Object} Request object.
    @protected
    **/
    _getRequest: function (path) {
        return {
            path : path,
            query: this._parseQuery(this._getQuery())
        };
    },

    /**
    Joins the `root` URL to the specified _url_, normalizing leading/trailing
    `/` characters.

    @example
        controller.root = '/foo'
        controller._joinURL('bar');  // => '/foo/bar'
        controller._joinURL('/bar'); // => '/foo/bar'

        controller.root = '/foo/'
        controller._joinURL('bar');  // => '/foo/bar'
        controller._joinURL('/bar'); // => '/foo/bar'

    @method _joinURL
    @param {String} url URL to append to the `root` URL.
    @return {String} Joined URL.
    @protected
    **/
    _joinURL: function (url) {
        var root = this.root;

        if (url.charAt(0) === '/') {
            url = url.substring(1);
        }

        return root && root.charAt(root.length - 1) === '/' ?
                root + url :
                root + '/' + url;
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
        var decode = this._decode,
            params = query.split('&'),
            i      = 0,
            len    = params.length,
            result = {},
            param;

        for (; i < len; ++i) {
            param = params[i].split('=');

            if (param[0]) {
                result[decode(param[0])] = decode(param[1] || '');
            }
        }

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
        var args = arguments,
            self = this;

        saveQueue.push(function () {
            if (html5) {
                // Wrapped in a timeout to ensure that _save() calls are always
                // processed asynchronously. This ensures consistency between
                // HTML5- and hash-based history.
                setTimeout(function () {
                    self._save.apply(self, args);
                }, 1);
            } else {
                self._dispatching = true; // otherwise we'll dequeue too quickly
                self._save.apply(self, args);
            }

            return self;
        });

        return !this._dispatching ? this._dequeue() : this;
    },

    /**
    Saves a history entry using either `pushState()` or the location hash.

    @method _save
    @param {String} [url] URL for the history entry.
    @param {Boolean} [replace=false] If `true`, the current history entry will
      be replaced instead of a new one being added.
    @chainable
    @protected
    **/
    _save: html5 ? function (url, replace) {
        // Force _ready to true to ensure that the history change is handled
        // even if _save is called before the `ready` event fires.
        this._ready = true;

        this._history[replace ? 'replace' : 'add'](null, {
            url: typeof url === 'string' ? this._joinURL(url) : url
        });

        return this;
    } : function (url, replace) {
        this._ready = true;

        if (typeof url === 'string' && url.charAt(0) !== '/') {
            url = '/' + url;
        }

        HistoryHash[replace ? 'replaceHash' : 'setHash'](url);
        return this;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles `history:change` and `hashchange` events.

    @method _afterHistoryChange
    @param {EventFacade} e
    @protected
    **/
    _afterHistoryChange: function (e) {
        var self = this;

        if (self._ready) {
            self._dispatch(self._getPath());
        }
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default handler for the `ready` event.

    @method _defReadyFn
    @param {EventFacade} e
    @protected
    **/
    _defReadyFn: function (e) {
        this._ready = true;
    }
}, {
    NAME: 'controller'
});


}, '@VERSION@' ,{optional:['querystring-parse'], requires:['array-extras', 'base-build', 'history']});
