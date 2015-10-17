YUI.add('controller', function(Y) {

/**
The app framework provides simple MVC-like building blocks (models, model lists,
views, and controllers) for writing single-page JavaScript applications.

@main app
@module app
**/

/**
Provides URL-based routing using HTML5 `pushState()` or the location hash.

This makes it easy to wire up route handlers for different application states
while providing full back/forward navigation support and bookmarkable, shareable
URLs.

@submodule controller
@class Controller
@constructor
@uses Base
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
    Root path from which all routes should be evaluated.

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
        // subclass initializers to finish, and then an additional 20ms to allow
        // the browser to fire an initial `popstate` event if it wants to.
        self.publish(EVT_READY, {
            defaultFn  : self._defReadyFn,
            fireOnce   : true,
            preventable: false
        });

        self.once('initializedChange', function () {
            setTimeout(function () {
                self.fire(EVT_READY, {dispatched: !!self._dispatched});
            }, 20);
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
            var hash = this._getHashPath();

            this._ready = true;

            if (html5 && hash && hash.charAt(0) === '/') {
                // This is an HTML5 browser and we have a hash-based path in the
                // URL, so we need to upgrade the URL to a non-hash URL. This
                // will trigger a `history:change` event, which will in turn
                // trigger a dispatch.
                this._history.replace(null, {url: this._joinURL(hash)});
            } else {
                this._dispatch(this._getPath());
            }
        });

        return this;
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
        return this._save(url, true);
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
        return this._save(url);
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
        return decodeURIComponent(string.replace(/\+/g, ' '));
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

        self._dispatched = true;

        if (!routes || !routes.length) {
            return this;
        }

        req = self._getRequest(path);

        function next(err) {
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

                callback.call(self, req, next);
            }
        }

        next();
        return this;
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
        return this._removeRoot(location.pathname);
    } : function () {
        return this._getHashPath() || this._removeRoot(location.pathname);
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
    Removes the `root` URL from the from of _path_ (if it's there) and returns
    the result. The returned path will always have a leading `/`.

    @method _removeRoot
    @param {String} path URL path.
    @return {String} Rootless path.
    @protected
    **/
    _removeRoot: function (path) {
        var root = this.root;

        if (root && path.indexOf(root) === 0) {
            path = path.substring(root.length);
        }

        return path.charAt(0) === '/' ? path : '/' + path;
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
            // We need to yield control to the UI thread to allow the browser to
            // update window.location before we dispatch.
            setTimeout(function () {
                self._dispatch(self._getPath());
            }, 1);
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


}, '@VERSION@' ,{requires:['array-extras', 'base-build', 'history'], optional:['querystring-parse']});
YUI.add('model', function(Y) {

/**
Attribute-based data model with APIs for getting, setting, validating, and
syncing attribute values, as well as events for being notified of model changes.

In most cases, you'll want to create your own subclass of `Y.Model` and
customize it to meet your needs. In particular, the `sync()` and `validate()`
methods are meant to be overridden by custom implementations. You may also want
to override the `parse()` method to parse non-generic server responses.

@submodule model
@class Model
@constructor
@uses Base
**/

var GlobalEnv = YUI.namespace('Env.Model'),
    Lang      = Y.Lang,
    YArray    = Y.Array,
    YObject   = Y.Object,

    /**
    Fired when one or more attributes on this model are changed.

    @event change
    @param {Object} changed Hash of change information for each attribute that
        changed. Each item in the hash has the following properties:
      @param {mixed} changed.newVal New value of the attribute.
      @param {mixed} changed.prevVal Previous value of the attribute.
      @param {String|null} changed.src Source of the change event, if any.
    **/
    EVT_CHANGE = 'change',

    /**
    Fired when an error occurs, such as when the model doesn't validate or when
    a server response can't be parsed.

    @event error
    @param {mixed} error Error message, object, or exception generated by the
      error. Calling `toString()` on this should result in a meaningful error
      message.
    @param {String} src Source of the error. May be one of the following (or any
      custom error source defined by a Model subclass):

        * `parse`: An error parsing a JSON response.
        * `validate`: The model failed to validate.
    **/
    EVT_ERROR = 'error';

function Model() {
    Model.superclass.constructor.apply(this, arguments);
}

Y.Model = Y.extend(Model, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    Hash of attributes that have changed since the last time this model was
    saved.

    @property changed
    @type Object
    @default {}
    **/

    /**
    Name of the attribute to use as the unique id (or primary key) for this
    model.

    The default is `id`, but if your persistence layer uses a different name for
    the primary key (such as `_id` or `uid`), you can specify that here.

    The built-in `id` attribute will always be an alias for whatever attribute
    name you specify here, so getting and setting `id` will always behave the
    same as getting and setting your custom id attribute.

    @property idAttribute
    @type String
    @default `'id'`
    **/
    idAttribute: 'id',

    /**
    Hash of attributes that were changed in the last `change` event. Each item
    in this hash is an object with the following properties:

      * `newVal`: The new value of the attribute after it changed.
      * `prevVal`: The old value of the attribute before it changed.
      * `src`: The source of the change, or `null` if no source was specified.

    @property lastChange
    @type Object
    @default {}
    **/

    /**
    Array of `ModelList` instances that contain this model.

    When a model is in one or more lists, the model's events will bubble up to
    those lists. You can subscribe to a model event on a list to be notified
    when any model in the list fires that event.

    This property is updated automatically when this model is added to or
    removed from a `ModelList` instance. You shouldn't alter it manually. When
    working with models in a list, you should always add and remove models using
    the list's `add()` and `remove()` methods.

    @example Subscribing to model events on a list:

        // Assuming `list` is an existing Y.ModelList instance.
        list.on('*:change', function (e) {
            // This function will be called whenever any model in the list
            // fires a `change` event.
            //
            // `e.target` will refer to the model instance that fired the
            // event.
        });

    @property lists
    @type ModelList[]
    @default `[]`
    **/

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        this.changed    = {};
        this.lastChange = {};
        this.lists      = [];
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Destroys this model instance and removes it from its containing lists, if
    any.

    If `options['delete']` is `true`, then this method also delegates to the
    `sync()` method to delete the model from the persistence layer, which is an
    asynchronous action. Provide a _callback_ function to be notified of success
    or failure.

    @method destroy
    @param {Object} [options] Sync options. It's up to the custom sync
        implementation to determine what options it supports or requires, if
        any.
      @param {Boolean} [options.delete=false] If `true`, the model will be
        deleted via the sync layer in addition to the instance being destroyed.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        `null`.
    @chainable
    **/
    destroy: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        function finish(err) {
            if (!err) {
                YArray.each(self.lists, function (list) {
                    list.remove(self, options);
                });

                Model.superclass.destroy.call(self);
            }

            callback && callback.apply(null, arguments);
        }

        if (options && options['delete']) {
            this.sync('delete', options, finish);
        } else {
            finish();
        }

        return this;
    },

    /**
    Returns a clientId string that's unique among all models on the current page
    (even models in other YUI instances). Uniqueness across pageviews is
    unlikely.

    @method generateClientId
    @return {String} Unique clientId.
    **/
    generateClientId: function () {
        GlobalEnv.lastId || (GlobalEnv.lastId = 0);
        return this.constructor.NAME + '_' + (GlobalEnv.lastId += 1);
    },

    /**
    Returns the value of the specified attribute.

    If the attribute's value is an object, _name_ may use dot notation to
    specify the path to a specific property within the object, and the value of
    that property will be returned.

    @example
        // Set the 'foo' attribute to an object.
        myModel.set('foo', {
            bar: {
                baz: 'quux'
            }
        });

        // Get the value of 'foo'.
        myModel.get('foo');
        // => {bar: {baz: 'quux'}}

        // Get the value of 'foo.bar.baz'.
        myModel.get('foo.bar.baz');
        // => 'quux'

    @method get
    @param {String} name Attribute name or object property path.
    @return {mixed} Attribute value, or `undefined` if the attribute doesn't
      exist.
    **/

    // get() is defined by Y.Attribute.

    /**
    Returns an HTML-escaped version of the value of the specified string
    attribute. The value is escaped using `Y.Escape.html()`.

    @method getAsHTML
    @param {String} name Attribute name or object property path.
    @return {String} HTML-escaped attribute value.
    **/
    getAsHTML: function (name) {
        var value = this.get(name);
        return Y.Escape.html(Lang.isValue(value) ? String(value) : '');
    },

    /**
    Returns a URL-encoded version of the value of the specified string
    attribute. The value is encoded using the native `encodeURIComponent()`
    function.

    @method getAsURL
    @param {String} name Attribute name or object property path.
    @return {String} URL-encoded attribute value.
    **/
    getAsURL: function (name) {
        var value = this.get(name);
        return encodeURIComponent(Lang.isValue(value) ? String(value) : '');
    },

    /**
    Returns `true` if any attribute of this model has been changed since the
    model was last saved.

    New models (models for which `isNew()` returns `true`) are implicitly
    considered to be "modified" until the first time they're saved.

    @method isModified
    @return {Boolean} `true` if this model has changed since it was last saved,
      `false` otherwise.
    **/
    isModified: function () {
        return this.isNew() || !YObject.isEmpty(this.changed);
    },

    /**
    Returns `true` if this model is "new", meaning it hasn't been saved since it
    was created.

    Newness is determined by checking whether the model's `id` attribute has
    been set. An empty id is assumed to indicate a new model, whereas a
    non-empty id indicates a model that was either loaded or has been saved
    since it was created.

    @method isNew
    @return {Boolean} `true` if this model is new, `false` otherwise.
    **/
    isNew: function () {
        return !Lang.isValue(this.get('id'));
    },

    /**
    Loads this model from the server.

    This method delegates to the `sync()` method to perform the actual load
    operation, which is an asynchronous action. Specify a _callback_ function to
    be notified of success or failure.

    If the load operation succeeds and one or more of the loaded attributes
    differ from this model's current attributes, a `change` event will be fired.

    @method load
    @param {Object} [options] Options to be passed to `sync()` and to `set()`
      when setting the loaded attributes. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        `null`.
      @param {mixed} callback.response The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an attribute hash.
    @chainable
    **/
    load: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        this.sync('read', options, function (err, response) {
            if (!err) {
                self.setAttrs(self.parse(response), options);
                self.changed = {};
            }

            callback && callback.apply(null, arguments);
        });

        return this;
    },

    /**
    Called to parse the _response_ when the model is loaded from the server.
    This method receives a server _response_ and is expected to return an
    attribute hash.

    The default implementation assumes that _response_ is either an attribute
    hash or a JSON string that can be parsed into an attribute hash. If
    _response_ is a JSON string and either `Y.JSON` or the native `JSON` object
    are available, it will be parsed automatically. If a parse error occurs, an
    `error` event will be fired and the model will not be updated.

    You may override this method to implement custom parsing logic if necessary.

    @method parse
    @param {mixed} response Server response.
    @return {Object} Attribute hash.
    **/
    parse: function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response);
            } catch (ex) {
                this.fire(EVT_ERROR, {
                    error   : ex,
                    response: response,
                    src     : 'parse'
                });

                return null;
            }
        }

        return response;
    },

    /**
    Saves this model to the server.

    This method delegates to the `sync()` method to perform the actual save
    operation, which is an asynchronous action. Specify a _callback_ function to
    be notified of success or failure.

    If the save operation succeeds and one or more of the attributes returned in
    the server's response differ from this model's current attributes, a
    `change` event will be fired.

    @method save
    @param {Object} [options] Options to be passed to `sync()` and to `set()`
      when setting synced attributes. It's up to the custom sync implementation
      to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        `null`.
      @param {mixed} callback.response The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an attribute hash.
    @chainable
    **/
    save: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        this.sync(this.isNew() ? 'create' : 'update', options, function (err, response) {
            if (!err) {
                if (response) {
                    self.setAttrs(self.parse(response), options);
                }

                self.changed = {};
            }

            callback && callback.apply(null, arguments);
        });

        return this;
    },

    /**
    Sets the value of a single attribute. If model validation fails, the
    attribute will not be set and an `error` event will be fired.

    Use `setAttrs()` to set multiple attributes at once.

    @example
        model.set('foo', 'bar');

    @method set
    @param {String} name Attribute name or object property path.
    @param {any} value Value to set.
    @param {Object} [options] Data to be mixed into the event facade of the
        `change` event(s) for these attributes.
      @param {Boolean} [options.silent=false] If `true`, no `change` event will
          be fired.
    @chainable
    **/
    set: function (name, value, options) {
        var attributes = {};
        attributes[name] = value;

        return this.setAttrs(attributes, options);
    },

    /**
    Sets the values of multiple attributes at once. If model validation fails,
    the attributes will not be set and an `error` event will be fired.

    @example
        model.setAttrs({
            foo: 'bar',
            baz: 'quux'
        });

    @method setAttrs
    @param {Object} attributes Hash of attribute names and values to set.
    @param {Object} [options] Data to be mixed into the event facade of the
        `change` event(s) for these attributes.
      @param {Boolean} [options.silent=false] If `true`, no `change` event will
          be fired.
    @chainable
    **/
    setAttrs: function (attributes, options) {
        var idAttribute = this.idAttribute,
            changed, e, key, lastChange, transaction;

        if (!this._validate(attributes)) {
            return this;
        }

        options || (options = {});
        transaction = options._transaction = {};

        // When a custom id attribute is in use, always keep the default `id`
        // attribute in sync.
        if (idAttribute !== 'id') {
            // So we don't modify someone else's object.
            attributes = Y.merge(attributes);

            if (YObject.owns(attributes, idAttribute)) {
                attributes.id = attributes[idAttribute];
            } else if (YObject.owns(attributes, 'id')) {
                attributes[idAttribute] = attributes.id;
            }
        }

        for (key in attributes) {
            if (YObject.owns(attributes, key)) {
                this._setAttr(key, attributes[key], options);
            }
        }

        if (!YObject.isEmpty(transaction)) {
            changed    = this.changed;
            lastChange = this.lastChange = {};

            for (key in transaction) {
                if (YObject.owns(transaction, key)) {
                    e = transaction[key];

                    changed[key] = e.newVal;

                    lastChange[key] = {
                        newVal : e.newVal,
                        prevVal: e.prevVal,
                        src    : e.src || null
                    };
                }
            }

            if (!options.silent) {
                // Lazy publish for the change event.
                if (!this._changeEvent) {
                    this._changeEvent = this.publish(EVT_CHANGE, {
                        preventable: false
                    });
                }

                this.fire(EVT_CHANGE, {changed: lastChange});
            }
        }

        return this;
    },

    /**
    Override this method to provide a custom persistence implementation for this
    model. The default just calls the callback without actually doing anything.

    This method is called internally by `load()`, `save()`, and `destroy()`.

    @method sync
    @param {String} action Sync action to perform. May be one of the following:

      * `create`: Store a newly-created model for the first time.
      * `delete`: Delete an existing model.
      * 'read'  : Load an existing model.
      * `update`: Update an existing model.

    @param {Object} [options] Sync options. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {mixed} [callback.response] The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an attribute hash.
    **/
    sync: function (/* action, options, callback */) {
        var callback = YArray(arguments, 0, true).pop();

        if (typeof callback === 'function') {
            callback();
        }
    },

    /**
    Returns a copy of this model's attributes that can be passed to
    `Y.JSON.stringify()` or used for other nefarious purposes.

    The `clientId` attribute is not included in the returned object.

    If you've specified a custom attribute name in the `idAttribute` property,
    the default `id` attribute will not be included in the returned object.

    @method toJSON
    @return {Object} Copy of this model's attributes.
    **/
    toJSON: function () {
        var attrs = this.getAttrs();

        delete attrs.clientId;
        delete attrs.destroyed;
        delete attrs.initialized;

        if (this.idAttribute !== 'id') {
            delete attrs.id;
        }

        return attrs;
    },

    /**
    Reverts the last change to the model.

    If an _attrNames_ array is provided, then only the named attributes will be
    reverted (and only if they were modified in the previous change). If no
    _attrNames_ array is provided, then all changed attributes will be reverted
    to their previous values.

    Note that only one level of undo is available: from the current state to the
    previous state. If `undo()` is called when no previous state is available,
    it will simply do nothing.

    @method undo
    @param {Array} [attrNames] Array of specific attribute names to rever. If
      not specified, all attributes modified in the last change will be
      reverted.
    @param {Object} [options] Data to be mixed into the event facade of the
        change event(s) for these attributes.
      @param {Boolean} [options.silent=false] If `true`, no `change` event will
          be fired.
    @chainable
    **/
    undo: function (attrNames, options) {
        var lastChange  = this.lastChange,
            idAttribute = this.idAttribute,
            toUndo      = {},
            needUndo;

        attrNames || (attrNames = YObject.keys(lastChange));

        YArray.each(attrNames, function (name) {
            if (YObject.owns(lastChange, name)) {
                // Don't generate a double change for custom id attributes.
                name = name === idAttribute ? 'id' : name;

                needUndo     = true;
                toUndo[name] = lastChange[name].prevVal;
            }
        });

        return needUndo ? this.setAttrs(toUndo, options) : this;
    },

    /**
    Override this method to provide custom validation logic for this model.
    While attribute-specific validators can be used to validate individual
    attributes, this method gives you a hook to validate a hash of attributes
    when multiple attributes are changed at once. This method is called
    automatically before `set`, `setAttrs`, and `save` take action.

    A call to `validate` that doesn't return anything will be treated as a
    success. If the `validate` method returns a value, it will be treated as a
    failure, and the returned value (which may be a string or an object
    containing information about the failure) will be passed along to the
    `error` event.

    @method validate
    @param {Object} attributes Attribute hash containing changed attributes.
    @return {mixed} Any return value other than `undefined` or `null` will be
      treated as a validation failure.
    **/
    validate: function (/* attributes */) {},

    // -- Protected Methods ----------------------------------------------------

    /**
    Duckpunches the `addAttr` method provided by `Y.Attribute` to keep the
    `id` attribute’s value and a custom id attribute’s (if provided) value
    in sync when adding the attributes to the model instance object.

    Marked as protected to hide it from Model's public API docs, even though
    this is a public method in Attribute.

    @method addAttr
    @param {String} name The name of the attribute.
    @param {Object} config An object with attribute configuration property/value
      pairs, specifying the configuration for the attribute.
    @param {boolean} lazy (optional) Whether or not to add this attribute lazily
      (on the first call to get/set).
    @return {Object} A reference to the host object.
    @chainable
    @protected
    **/
    addAttr: function (name, config, lazy) {
        var idAttribute = this.idAttribute,
            idAttrCfg, id;

        if (idAttribute && name === idAttribute) {
            idAttrCfg = this._isLazyAttr('id') || this._getAttrCfg('id');
            id        = config.value === config.defaultValue ? null : config.value;

            if (!Lang.isValue(id)) {
                // Hunt for the id value.
                id = idAttrCfg.value === idAttrCfg.defaultValue ? null : idAttrCfg.value;

                if (!Lang.isValue(id)) {
                    // No id value provided on construction, check defaults.
                    id = Lang.isValue(config.defaultValue) ?
                        config.defaultValue :
                        idAttrCfg.defaultValue;
                }
            }

            config.value = id;

            // Make sure `id` is in sync.
            if (idAttrCfg.value !== id) {
                idAttrCfg.value = id;

                if (this._isLazyAttr('id')) {
                    this._state.add('id', 'lazy', idAttrCfg);
                } else {
                    this._state.add('id', 'value', id);
                }
            }
        }

        return Model.superclass.addAttr.apply(this, arguments);
    },

    /**
    Calls the public, overridable `validate()` method and fires an `error` event
    if validation fails.

    @method _validate
    @param {Object} attributes Attribute hash.
    @return {Boolean} `true` if validation succeeded, `false` otherwise.
    @protected
    **/
    _validate: function (attributes) {
        var error = this.validate(attributes);

        if (Lang.isValue(error)) {
            // Validation failed. Fire an error.
            this.fire(EVT_ERROR, {
                attributes: attributes,
                error     : error,
                src       : 'validate'
            });

            return false;
        }

        return true;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Duckpunches the `_defAttrChangeFn()` provided by `Y.Attribute` so we can
    have a single global notification when a change event occurs.

    @method _defAttrChangeFn
    @param {EventFacade} e
    @protected
    **/
    _defAttrChangeFn: function (e) {
        var attrName = e.attrName;

        if (!this._setAttrVal(attrName, e.subAttrName, e.prevVal, e.newVal)) {
            // Prevent "after" listeners from being invoked since nothing changed.
            e.stopImmediatePropagation();
        } else {
            e.newVal = this.get(attrName);

            if (e._transaction) {
                e._transaction[attrName] = e;
            }
        }
    }
}, {
    NAME: 'model',

    ATTRS: {
        /**
        A client-only identifier for this model.

        Like the `id` attribute, `clientId` may be used to retrieve model
        instances from lists. Unlike the `id` attribute, `clientId` is
        automatically generated, and is only intended to be used on the client
        during the current pageview.

        @attribute clientId
        @type String
        @readOnly
        **/
        clientId: {
            valueFn : 'generateClientId',
            readOnly: true
        },

        /**
        A unique identifier for this model. Among other things, this id may be
        used to retrieve model instances from lists, so it should be unique.

        If the id is empty, this model instance is assumed to represent a new
        item that hasn't yet been saved.

        If you would prefer to use a custom attribute as this model's id instead
        of using the `id` attribute (for example, maybe you'd rather use `_id`
        or `uid` as the primary id), you may set the `idAttribute` property to
        the name of your custom id attribute. The `id` attribute will then
        act as an alias for your custom attribute.

        @attribute id
        @type String|Number|null
        @default `null`
        **/
        id: {value: null}
    }
});


}, '@VERSION@' ,{requires:['base-build', 'escape', 'json-parse']});
YUI.add('model-list', function(Y) {

/**
Provides an API for managing an ordered list of Model instances.

In addition to providing convenient `add`, `create`, `refresh`, and `remove`
methods for managing the models in the list, ModelLists are also bubble targets
for events on the model instances they contain. This means, for example, that
you can add several models to a list, and then subscribe to the `*:change` event
on the list to be notified whenever any model in the list changes.

ModelLists also maintain sort order efficiently as models are added and removed,
based on a custom `comparator` function you may define (if no comparator is
defined, models are sorted in insertion order).

@submodule model-list
@class ModelList
@constructor
@uses ArrayList
@uses Base
**/

var Lang   = Y.Lang,
    YArray = Y.Array,

    /**
    Fired when a model is added to the list.

    Listen to the `on` phase of this event to be notified before a model is
    added to the list. Calling `e.preventDefault()` during the `on` phase will
    prevent the model from being added.

    Listen to the `after` phase of this event to be notified after a model has
    been added to the list.

    @event add
    @param {Model} model The model being added.
    @param {int} index The index at which the model will be added.
    @preventable _defAddFn
    **/
    EVT_ADD = 'add',

    /**
    Fired when the list is completely refreshed via the `refresh()` method or
    sorted via the `sort()` method.

    Listen to the `on` phase of this event to be notified before the list is
    refreshed. Calling `e.preventDefault()` during the `on` phase will prevent
    the list from being refreshed.

    Listen to the `after` phase of this event to be notified after the list has
    been refreshed.

    @event refresh
    @param {Model[]} models Array of the list's new models after the refresh.
    @param {String} src Source of the event. May be either `'refresh'` or
      `'sort'`.
    @preventable _defRefreshFn
    **/
    EVT_REFRESH = 'refresh',

    /**
    Fired when a model is removed from the list.

    Listen to the `on` phase of this event to be notified before a model is
    removed from the list. Calling `e.preventDefault()` during the `on` phase
    will prevent the model from being removed.

    Listen to the `after` phase of this event to be notified after a model has
    been removed from the list.

    @event remove
    @param {Model} model The model being removed.
    @param {int} index The index of the model being removed.
    @preventable _defRemoveFn
    **/
    EVT_REMOVE = 'remove';

function ModelList() {
    ModelList.superclass.constructor.apply(this, arguments);
}

Y.ModelList = Y.extend(ModelList, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    The `Model` class or subclass of the models in this list.

    This property is `null` by default, and is intended to be overridden in a
    subclass or specified as a config property at instantiation time. It will be
    used to create model instances automatically based on attribute hashes
    passed to the `add()`, `create()`, and `remove()` methods.

    @property model
    @type Model
    @default `null`
    **/
    model: null,

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        var model = this.model = config.model || this.model;

        this.publish(EVT_ADD,     {defaultFn: this._defAddFn});
        this.publish(EVT_REFRESH, {defaultFn: this._defRefreshFn});
        this.publish(EVT_REMOVE,  {defaultFn: this._defRemoveFn});

        if (model) {
            this.after('*:idChange', this._afterIdChange);
        } else {
        }

        this._clear();
    },

    destructor: function () {
        YArray.each(this._items, this._detachList, this);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Adds the specified model or array of models to this list.

    @example
        // Add a single model instance.
        list.add(new Model({foo: 'bar'}));

        // Add a single model, creating a new instance automatically.
        list.add({foo: 'bar'});

        // Add multiple models, creating new instances automatically.
        list.add([
            {foo: 'bar'},
            {baz: 'quux'}
        ]);

    @method add
    @param {Model|Model[]|Object|Object[]} models Models to add. May be existing
      model instances or hashes of model attributes, in which case new model
      instances will be created from the hashes.
    @param {Object} [options] Data to be mixed into the event facade of the
        `add` event(s) for the added models.
      @param {Boolean} [options.silent=false] If `true`, no `add` event(s) will
          be fired.
    @return {Model|Model[]} Added model or array of added models.
    **/
    add: function (models, options) {
        if (Lang.isArray(models)) {
            return YArray.map(models, function (model) {
                return this._add(model, options);
            }, this);
        } else {
            return this._add(models, options);
        }
    },

    /**
    Define this method to provide a function that takes a model as a parameter
    and returns a value by which that model should be sorted relative to other
    models in this list.

    By default, no comparator is defined, meaning that models will not be sorted
    (they'll be stored in the order they're added).

    @example
        var list = new Y.ModelList({model: Y.Model});

        list.comparator = function (model) {
            return model.get('id'); // Sort models by id.
        };

    @method comparator
    @param {Model} model Model being sorted.
    @return {Number|String} Value by which the model should be sorted relative
      to other models in this list.
    **/

    // comparator is not defined by default

    /**
    Creates or updates the specified model on the server, then adds it to this
    list if the server indicates success.

    @method create
    @param {Model|Object} model Model to create. May be an existing model
      instance or a hash of model attributes, in which case a new model instance
      will be created from the hash.
    @param {Object} [options] Options to be passed to the model's `sync()` and
        `set()` methods and mixed into the `add` event when the model is added
        to the list.
      @param {Boolean} [options.silent=false] If `true`, no `add` event(s) will
          be fired.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {mixed} callback.response The server's response.
    @return {Model} Created model.
    **/
    create: function (model, options, callback) {
        var self = this;

        // Allow callback as second arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        if (!(model instanceof Y.Model)) {
            model = new this.model(model);
        }

        return model.save(options, function (err) {
            if (!err) {
                self.add(model, options);
            }

            callback && callback.apply(null, arguments);
        });
    },

    /**
    Returns the model with the specified _clientId_, or `null` if not found.

    @method getByClientId
    @param {String} clientId Client id.
    @return {Model} Model, or `null` if not found.
    **/
    getByClientId: function (clientId) {
        return this._clientIdMap[clientId] || null;
    },

    /**
    Returns the model with the specified _id_, or `null` if not found.

    Note that models aren't expected to have an id until they're saved, so if
    you're working with unsaved models, it may be safer to call
    `getByClientId()`.

    @method getById
    @param {String} id Model id.
    @return {Model} Model, or `null` if not found.
    **/
    getById: function (id) {
        return this._idMap[id] || null;
    },

    /**
    Calls the named method on every model in the list. Any arguments provided
    after _name_ will be passed on to the invoked method.

    @method invoke
    @param {String} name Name of the method to call on each model.
    @param {any} *args Zero or more arguments to pass to the invoked method.
    @return {Array} Array of return values, indexed according to the index of
      the model on which the method was called.
    **/
    invoke: function (name /*, *args */) {
        var args = [this._items, name].concat(YArray(arguments, 1, true));
        return YArray.invoke.apply(YArray, args);
    },

    /**
    Returns the model at the specified _index_.

    @method item
    @param {int} index Index of the model to fetch.
    @return {Model} The model at the specified index, or `undefined` if there
      isn't a model there.
    **/

    // item() is inherited from ArrayList.

    /**
    Loads this list of models from the server.

    This method delegates to the `sync()` method to perform the actual load
    operation, which is an asynchronous action. Specify a _callback_ function to
    be notified of success or failure.

    If the load operation succeeds, a `refresh` event will be fired.

    @method load
    @param {Object} [options] Options to be passed to `sync()` and to
      `refresh()` when adding the loaded models. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {mixed} callback.response The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an array of model attribute hashes.
    @chainable
    **/
    load: function (options, callback) {
        var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        this.sync('read', options, function (err, response) {
            if (!err) {
                self.refresh(self.parse(response), options);
            }

            callback && callback.apply(null, arguments);
        });

        return this;
    },

    /**
    Executes the specified function on each model in this list and returns an
    array of the function's collected return values.

    @method map
    @param {Function} fn Function to execute on each model.
      @param {Model} fn.model Current model being iterated.
      @param {int} fn.index Index of the current model in the list.
      @param {Model[]} fn.models Array of models being iterated.
    @param {Object} [thisObj] `this` object to use when calling _fn_.
    @return {Array} Array of return values from _fn_.
    **/
    map: function (fn, thisObj) {
        return YArray.map(this._items, fn, thisObj);
    },

    /**
    Called to parse the _response_ when the list is loaded from the server.
    This method receives a server _response_ and is expected to return an array
    of model attribute hashes.

    The default implementation assumes that _response_ is either an array of
    attribute hashes or a JSON string that can be parsed into an array of
    attribute hashes. If _response_ is a JSON string and either `Y.JSON` or the
    native `JSON` object are available, it will be parsed automatically. If a
    parse error occurs, an `error` event will be fired and the model will not be
    updated.

    You may override this method to implement custom parsing logic if necessary.

    @method parse
    @param {mixed} response Server response.
    @return {Object[]} Array of model attribute hashes.
    **/
    parse: function (response) {
        if (typeof response === 'string') {
            try {
                return Y.JSON.parse(response) || [];
            } catch (ex) {
                Y.error('Failed to parse JSON response.');
                return null;
            }
        }

        return response || [];
    },

    /**
    Completely replaces all models in the list with those specified, and fires a
    single `refresh` event.

    Use `refresh` when you want to add or remove a large number of items at once
    without firing `add` or `remove` events for each one.

    @method refresh
    @param {Model[]|Object[]} models Models to add. May be existing model
      instances or hashes of model attributes, in which case new model instances
      will be created from the hashes.
    @param {Object} [options] Data to be mixed into the event facade of the
        `refresh` event.
      @param {Boolean} [options.silent=false] If `true`, no `refresh` event will
          be fired.
    @chainable
    **/
    refresh: function (models, options) {
        options || (options = {});

        var facade = Y.merge(options, {
                src   : 'refresh',
                models: YArray.map(models, function (model) {
                    return model instanceof Y.Model ? model :
                            new this.model(model);
                }, this)
            });

        options.silent ? this._defRefreshFn(facade) :
                this.fire(EVT_REFRESH, facade);

        return this;
    },

    /**
    Removes the specified model or array of models from this list.

    @method remove
    @param {Model|Model[]} models Models to remove.
    @param {Object} [options] Data to be mixed into the event facade of the
        `remove` event(s) for the removed models.
      @param {Boolean} [options.silent=false] If `true`, no `remove` event(s)
          will be fired.
    @return {Model|Model[]} Removed model or array of removed models.
    **/
    remove: function (models, options) {
        if (Lang.isArray(models)) {
            return YArray.map(models, function (model) {
                return this._remove(model, options);
            }, this);
        } else {
            return this._remove(models, options);
        }
    },

    /**
    Forcibly re-sorts the list.

    Usually it shouldn't be necessary to call this method since the list
    maintains its sort order when items are added and removed, but if you change
    the `comparator` function after items are already in the list, you'll need
    to re-sort.

    @method sort
    @param {Object} [options] Data to be mixed into the event facade of the
        `refresh` event.
      @param {Boolean} [options.silent=false] If `true`, no `refresh` event will
          be fired.
    @chainable
    **/
    sort: function (options) {
        var comparator = this.comparator,
            models     = this._items.concat(),
            facade;

        if (!comparator) {
            return this;
        }

        options || (options = {});

        models.sort(function (a, b) {
            var aValue = comparator(a),
                bValue = comparator(b);

            return aValue < bValue ? -1 : (aValue > bValue ? 1 : 0);
        });

        facade = Y.merge(options, {
            models: models,
            src   : 'sort'
        });

        options.silent ? this._defRefreshFn(facade) :
                this.fire(EVT_REFRESH, facade);

        return this;
    },

    /**
    Override this method to provide a custom persistence implementation for this
    list. The default method just calls the callback without actually doing
    anything.

    This method is called internally by `load()`.

    @method sync
    @param {String} action Sync action to perform. May be one of the following:

      * `create`: Store a list of newly-created models for the first time.
      * `delete`: Delete a list of existing models.
      * 'read'  : Load a list of existing models.
      * `update`: Update a list of existing models.

      Currently, model lists only make use of the `read` action, but other
      actions may be used in future versions.

    @param {Object} [options] Sync options. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {mixed} [callback.response] The server's response. This value will
        be passed to the `parse()` method, which is expected to parse it and
        return an array of model attribute hashes.
    **/
    sync: function (/* action, options, callback */) {
        var callback = YArray(arguments, 0, true).pop();

        if (typeof callback === 'function') {
            callback();
        }
    },

    /**
    Returns an array containing the models in this list.

    @method toArray
    @return {Array} Array containing the models in this list.
    **/
    toArray: function () {
        return this._items.concat();
    },

    /**
    Returns an array containing attribute hashes for each model in this list,
    suitable for being passed to `Y.JSON.stringify()`.

    Under the hood, this method calls `toJSON()` on each model in the list and
    pushes the results into an array.

    @method toJSON
    @return {Object[]} Array of model attribute hashes.
    @see Model.toJSON()
    **/
    toJSON: function () {
        return this.map(function (model) {
            return model.toJSON();
        });
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Adds the specified _model_ if it isn't already in this list.

    @method _add
    @param {Model|Object} model Model or object to add.
    @param {Object} [options] Data to be mixed into the event facade of the
        `add` event for the added model.
      @param {Boolean} [options.silent=false] If `true`, no `add` event will be
          fired.
    @return {Model} The added model.
    @protected
    **/
    _add: function (model, options) {
        var facade;

        options || (options = {});

        if (!(model instanceof Y.Model)) {
            model = new this.model(model);
        }

        if (this._clientIdMap[model.get('clientId')]) {
            Y.error('Model already in list.');
            return;
        }

        facade = Y.merge(options, {
            index: this._findIndex(model),
            model: model
        });

        options.silent ? this._defAddFn(facade) : this.fire(EVT_ADD, facade);

        return model;
    },

    /**
    Adds this list as a bubble target for the specified model's events.

    @method _attachList
    @param {Model} model Model to attach to this list.
    @protected
    **/
    _attachList: function (model) {
        // Attach this list and make it a bubble target for the model.
        model.lists.push(this);
        model.addTarget(this);
    },

    /**
    Clears all internal state and the internal list of models, returning this
    list to an empty state. Automatically detaches all models in the list.

    @method _clear
    @protected
    **/
    _clear: function () {
        YArray.each(this._items, this._detachList, this);

        this._clientIdMap = {};
        this._idMap       = {};
        this._items       = [];
    },

    /**
    Removes this list as a bubble target for the specified model's events.

    @method _detachList
    @param {Model} model Model to detach.
    @protected
    **/
    _detachList: function (model) {
        var index = YArray.indexOf(model.lists, this);

        if (index > -1) {
            model.lists.splice(index, 1);
            model.removeTarget(this);
        }
    },

    /**
    Returns the index at which the given _model_ should be inserted to maintain
    the sort order of the list.

    @method _findIndex
    @param {Model} model The model being inserted.
    @return {int} Index at which the model should be inserted.
    @protected
    **/
    _findIndex: function (model) {
        var comparator = this.comparator,
            items      = this._items,
            max        = items.length - 1,
            min        = 0,
            item, middle, needle;

        if (!comparator || !items.length) { return items.length; }

        needle = comparator(model);

        // Perform an iterative binary search to determine the correct position
        // based on the return value of the `comparator` function.
        while (min < max) {
            middle = (min + max) / 2;
            item   = items[middle];

            if (item && comparator(item) < needle) {
                min = middle + 1;
            } else {
                max = middle;
            }
        }

        return min;
    },

    /**
    Removes the specified _model_ if it's in this list.

    @method _remove
    @param {Model} model Model to remove.
    @param {Object} [options] Data to be mixed into the event facade of the
        `remove` event for the removed model.
      @param {Boolean} [options.silent=false] If `true`, no `remove` event will
          be fired.
    @return {Model} Removed model.
    @protected
    **/
    _remove: function (model, options) {
        var index = this.indexOf(model),
            facade;

        options || (options = {});

        if (index === -1) {
            Y.error('Model not in list.');
            return;
        }
    
        facade = Y.merge(options, {
            index: index,
            model: model
        });
    
        options.silent ? this._defRemoveFn(facade) :
                this.fire(EVT_REMOVE, facade);

        return model;
    },

    // -- Event Handlers -------------------------------------------------------

    /**
    Updates the model maps when a model's `id` attribute changes.

    @method _afterIdChange
    @param {EventFacade} e
    @protected
    **/
    _afterIdChange: function (e) {
        e.prevVal && delete this._idMap[e.prevVal];
        e.newVal && (this._idMap[e.newVal] = e.target);
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
    Default event handler for `add` events.

    @method _defAddFn
    @param {EventFacade} e
    @protected
    **/
    _defAddFn: function (e) {
        var model = e.model,
            id    = model.get('id');

        this._clientIdMap[model.get('clientId')] = model;

        if (id) {
            this._idMap[id] = model;
        }

        this._attachList(model);
        this._items.splice(e.index, 0, model);
    },

    /**
    Default event handler for `refresh` events.

    @method _defRefreshFn
    @param {EventFacade} e
    @protected
    **/
    _defRefreshFn: function (e) {
        // When fired from the `sort` method, we don't need to clear the list or
        // add any models, since the existing models are sorted in place.
        if (e.src === 'sort') {
            this._items = e.models.concat();
            return;
        }

        this._clear();

        if (e.models.length) {
            this.add(e.models, {silent: true});
        }
    },

    /**
    Default event handler for `remove` events.

    @method _defRemoveFn
    @param {EventFacade} e
    @protected
    **/
    _defRemoveFn: function (e) {
        var model = e.model,
            id    = model.get('id');

        this._detachList(model);
        delete this._clientIdMap[model.get('clientId')];

        if (id) {
            delete this._idMap[id];
        }

        this._items.splice(e.index, 1);
    }
}, {
    NAME: 'modelList'
});

Y.augment(ModelList, Y.ArrayList);

/**
Returns an array containing the values of the specified attribute from each
model in this list.

@method get
@param {String} name Attribute name or object property path.
@return {Array} Array of attribute values.
@see Model.get()
**/

/**
Returns an array containing the HTML-escaped versions of the values of the
specified string attributes from each model in this list. The values are escaped
using `Y.Escape.html()`.

@method getAsHTML
@param {String} name Attribute name or object property path.
@return {String[]} Array of HTML-escaped attribute values.
@see Model.getAsHTML()
**/

/**
Returns an array containing the URL-encoded versions of the values of the
specified string attributes from each model in this list. The values are encoded
using the native `encodeURIComponent()` function.

@method getAsURL
@param {String} name Attribute name or object property path.
@return {String[]} Array of URL-encoded attribute values.
@see Model.getAsURL()
**/

Y.ArrayList.addMethod(ModelList.prototype, [
    'get', 'getAsHTML', 'getAsURL'
]);


}, '@VERSION@' ,{requires:['array-extras', 'array-invoke', 'arraylist', 'base-build', 'json-parse', 'model']});
YUI.add('view', function(Y) {

/**
Represents a logical piece of an application's user interface, and provides a
lightweight, overridable API for rendering content and handling delegated DOM
events on a container element.

The View class imposes little structure and provides only minimal functionality
of its own: it's basically just an overridable API interface that helps you
implement custom views.

@submodule view
@class View
@constructor
@uses Base
**/

function View() {
    View.superclass.constructor.apply(this, arguments);
}

Y.View = Y.extend(View, Y.Base, {
    // -- Public Properties ----------------------------------------------------

    /**
    Container node into which this view's content will be rendered.

    The container node serves as the host for all DOM events attached by the
    view. Delegation is used to handle events on children of the container,
    allowing the container's contents to be re-rendered at any time without
    losing event subscriptions.

    The default container is a simple `<div>`, but you can override this in a
    subclass, or by passing in a custom `container` config value at
    instantiation time.

    When `container` is overridden by a subclass or passed as a config option at
    instantiation time, it may be provided as an HTML string, a DOM element, or
    a `Y.Node` instance. During initialization, this view's `create()` method
    will be called to convert the container into a `Y.Node` instance if it isn't
    one already.

    The container is not added to the page automatically. This allows you to
    have full control over how and when your view is actually rendered to the
    page.

    @property container
    @type HTMLElement|Node|String
    @default `"<div/>"`
    **/
    container: '<div/>',

    /**
    Hash of CSS selectors mapped to events to delegate to elements matching
    those selectors.

    CSS selectors are relative to the `container` element. Events are attached
    to the container, and delegation is used so that subscribers are only
    notified of events that occur on elements inside the container that match
    the specified selectors. This allows the container's contents to be
    re-rendered as needed without losing event subscriptions.

    Event handlers can be specified either as functions or as strings that map
    to function names on this view instance or its prototype.

    The `this` object in event handlers will refer to this view instance. If
    you'd prefer `this` to be something else, use `Y.bind()` to bind a custom
    `this` object.

    @example

        var view = new Y.View({
            events: {
                // Call `this.toggle()` whenever the element with the id
                // "toggle-button" is clicked.
                '#toggle-button': {click: 'toggle'},

                // Call `this.hoverOn()` when the mouse moves over any element
                // with the "hoverable" class, and `this.hoverOff()` when the
                // mouse moves out of any element with the "hoverable" class.
                '.hoverable': {
                    mouseover: 'hoverOn',
                    mouseout : 'hoverOff'
                }
            }
        });

    @property events
    @type Object
    @default `{}`
    **/
    events: {},

    /**
    `Y.Model` instance associated with this view instance.

    This is entirely optional. There's no requirement that views be associated
    with models, but if you do intend to associate your view with a model, then
    specifying that model instance at instantiation time will cause a reference
    to be stored here for convenience.

    @property model
    @type Model
    **/

    /**
    Template for this view.

    This is a convenience property that has no default behavior of its own. It's
    only provided as a convention to allow you to store whatever you consider to
    be a template, whether that's an HTML string, a `Y.Node` instance, a
    Mustache template, or anything else your little heart desires.

    How this template gets used is entirely up to you and your custom `render()`
    method.

    @property template
    @type any
    @default `''`
    **/
    template: '',

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        config || (config = {});

        this.container = this.create(config.container || this.container);

        // Use config properties if present; otherwise default to prototype
        // properties.
        config.model && (this.model = config.model);
        config.template && (this.template = config.template);

        // Merge events from the config into events in `this.events`, then
        // attach the events to the container node.
        this.events = config.events ?
                Y.merge(this.events, config.events) : this.events;

        this.attachEvents(this.events);
    },

    destructor: function () {
        // Remove the container from the DOM and purge all event listeners.
        this.container && this.container.remove(true);
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Attaches delegated event handlers to this view's `container` element. This
    method is called internally to subscribe to events configured in the
    `events` property or config attribute when the view is initialized.

    You may override this method to customize the event attaching logic.

    @method attachEvents
    @param {Object} events Hash of events to attach. See the docs for the
      `events` property for details on the format.
    **/
    attachEvents: function (events) {
        var container = this.container,
            owns      = Y.Object.owns,
            handler, handlers, name, selector;

        for (selector in events) {
            if (!owns(events, selector)) { continue; }

            handlers = events[selector];

            for (name in handlers) {
                if (!owns(handlers, name)) { continue; }

                handler = handlers[name];

                if (typeof handler === 'string') {
                    handler = this[handler];
                }

                container.delegate(name, handler, selector, this);
            }
        }
    },

    /**
    Creates and returns this view's `container` node from the specified HTML
    string, DOM element, or existing `Y.Node` instance. This method is called
    internally when the view is initialized.

    By default, the created node is _not_ added to the DOM automatically.

    You may override this method to customize how the container node is created
    (such as by rendering it from a template). Your method should return a
    `Y.Node` instance.

    @method create
    @param {HTMLElement|Node|String} container HTML string, DOM element, or
      `Y.Node` instance to use as the container node.
    @return {Node} Node instance of the created container node.
    **/
    create: function (container) {
        return typeof container === 'string' ?
                Y.Node.create(container) : Y.one(container);
    },

    /**
    Removes this view's `container` element from the DOM (if it's in the DOM),
    but doesn't destroy it or any event listeners attached to it.

    @method remove
    @chainable
    **/
    remove: function () {
        this.container && this.container.remove();
        return this;
    },

    /**
    Renders the view.

    This method is a noop by default. Override it in your subclass to provide a
    custom implementation that renders this view's content and appends it to the
    `container` element. Ideally your `render` method should also return `this`
    as the end to allow chaining, but that's up to you.

    Since there's no default renderer, you're free to render your view however
    you see fit, whether that means manipulating the DOM directly, dumping
    strings into `innerHTML`, or using a template language of some kind.

    For basic templating needs, `Y.Node.create()` and `Y.Lang.sub()` may
    suffice, but there are no restrictions on what tools or techniques you can
    use to render your view. All you need to do is append something to the
    `container` element at some point, and optionally append the `container`
    to the DOM if it's not there already.

    @method render
    @chainable
    **/
    render: function () {
        return this;
    }
}, {
    NAME: 'view'
});


}, '@VERSION@' ,{requires:['base-build', 'node-event-delegate']});


YUI.add('app', function(Y){}, '@VERSION@' ,{use:['controller', 'model', 'model-list', 'view']});

