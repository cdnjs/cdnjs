YUI.add('pjax-base', function(Y) {

/**
`Y.Router` extension that provides the core plumbing for enhanced navigation
implemented using the pjax technique (HTML5 pushState + Ajax).

@module pjax
@submodule pjax-base
@since 3.5.0
**/

var win = Y.config.win,

    Lang = Y.Lang,

    // The CSS class name used to filter link clicks from only the links which
    // the pjax enhanced navigation should be used.
    CLASS_PJAX = Y.ClassNameManager.getClassName('pjax'),

    /**
    Fired when navigating to a URL via Pjax.

    When the `navigate()` method is called or a pjax link is clicked, this event
    will be fired if the browser supports HTML5 history _and_ the router has a
    route handler for the specified URL.

    This is a useful event to listen to for adding a visual loading indicator
    while the route handlers are busy handling the URL change.

    @event navigate
    @param {String} url The URL that the router will dispatch to its route
      handlers in order to fulfill the enhanced navigation "request".
    @param {Boolean} [force=false] Whether the enhanced navigation should occur
      even in browsers without HTML5 history.
    @param {String} [hash] The hash-fragment (including "#") of the `url`. This
      will be present when the `url` differs from the current URL only by its
      hash and `navigateOnHash` has ben set to `true`.
    @param {Event} [originEvent] The event that caused the navigation. Usually
      this would be a click event from a "pjax" anchor element.
    @param {Boolean} [replace] Whether or not the current history entry will be
      replaced, or a new entry will be created. Will default to `true` if the
      specified `url` is the same as the current URL.
    @since 3.5.0
    **/
    EVT_NAVIGATE = 'navigate';

/**
`Y.Router` extension that provides the core plumbing for enhanced navigation
implemented using the pjax technique (HTML5 `pushState` + Ajax).

This makes it easy to enhance the navigation between the URLs of an application
in HTML5 history capable browsers by delegating to the router to fulfill the
"request" and seamlessly falling-back to using standard full-page reloads in
older, less-capable browsers.

The `PjaxBase` class isn't useful on its own, but can be mixed into a
`Router`-based class to add Pjax functionality to that Router. For a pre-made
standalone Pjax router, see the `Pjax` class.

    var MyRouter = Y.Base.create('myRouter', Y.Router, [Y.PjaxBase], {
        // ...
    });

@class PjaxBase
@extensionfor Router
@since 3.5.0
**/
function PjaxBase() {}

PjaxBase.prototype = {
    // -- Protected Properties -------------------------------------------------

    /**
    Holds the delegated pjax-link click handler.

    @property _pjaxEvents
    @type EventHandle
    @protected
    @since 3.5.0
    **/

    /**
    Regex used to break up a URL string around the URL's path.

    Subpattern captures:

      1. Origin, everything before the URL's path-part.
      2. The URL's path-part.
      3. Suffix, everything after the URL's path-part.

    @property _regexURL
    @type RegExp
    @protected
    @since 3.5.0
    **/
    _regexURL: /^((?:[^\/#?:]+:\/\/|\/\/)[^\/]*)?([^?#]*)(\?[^#]*)?(#.*)?$/,

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function () {
        this.publish(EVT_NAVIGATE, {defaultFn: this._defNavigateFn});

        // Pjax is all about progressively enhancing the navigation between
        // "pages", so by default we only want to handle and route link clicks
        // in HTML5 `pushState`-compatible browsers.
        if (this.get('html5')) {
            this._pjaxBindUI();
        }
    },

    destructor: function () {
        this._pjaxEvents && this._pjaxEvents.detach();
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Navigates to the specified URL if there is a route handler that matches. In
    browsers capable of using HTML5 history, the navigation will be enhanced by
    firing the `navigate` event and having the router handle the "request".
    Non-HTML5 browsers will navigate to the new URL via manipulation of
    `window.location`.

    When there is a route handler for the specified URL and it is being
    navigated to, this method will return `true`, otherwise it will return
    `false`.

    **Note:** The specified URL _must_ be of the same origin as the current URL,
    otherwise an error will be logged and navigation will not occur. This is
    intended as both a security constraint and a purposely imposed limitation as
    it does not make sense to tell the router to navigate to a URL on a
    different scheme, host, or port.

    @method navigate
    @param {String} url The URL to navigate to. This must be of the same origin
      as the current URL.
    @param {Object} [options] Additional options to configure the navigation.
      These are mixed into the `navigate` event facade.
        @param {Boolean} [options.replace] Whether or not the current history
          entry will be replaced, or a new entry will be created. Will default
          to `true` if the specified `url` is the same as the current URL.
        @param {Boolean} [options.force=false] Whether the enhanced navigation
          should occur even in browsers without HTML5 history.
    @return {Boolean} `true` if the URL was navigated to, `false` otherwise.
    @since 3.5.0
    **/
    navigate: function (url, options) {
        // The `_navigate()` method expects fully-resolved URLs.
        url = this._resolveURL(url);

        if (this._navigate(url, options)) {
            return true;
        }

        if (!this._hasSameOrigin(url)) {
            Y.error('Security error: The new URL must be of the same origin as the current URL.');
        }

        return false;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Returns the current path root after popping off the last path segment,
    making it useful for resolving other URL paths against.

    The path root will always begin and end with a '/'.

    @method _getRoot
    @return {String} The URL's path root.
    @protected
    @since 3.5.0
    **/
    _getRoot: function () {
        var slash = '/',
            path  = Y.getLocation().pathname,
            segments;

        if (path.charAt(path.length - 1) === slash) {
            return path;
        }

        segments = path.split(slash);
        segments.pop();

        return segments.join(slash) + slash;
    },

    /**
    Underlying implementation for `navigate()`.

    @method _navigate
    @param {String} url The fully-resolved URL that the router should dispatch
      to its route handlers to fulfill the enhanced navigation "request", or use
      to update `window.location` in non-HTML5 history capable browsers.
    @param {Object} [options] Additional options to configure the navigation.
      These are mixed into the `navigate` event facade.
        @param {Boolean} [options.replace] Whether or not the current history
          entry will be replaced, or a new entry will be created. Will default
          to `true` if the specified `url` is the same as the current URL.
        @param {Boolean} [options.force=false] Whether the enhanced navigation
          should occur even in browsers without HTML5 history.
    @return {Boolean} `true` if the URL was navigated to, `false` otherwise.
    @protected
    @since 3.5.0
    **/
    _navigate: function (url, options) {
        // Navigation can only be enhanced if there is a route-handler.
        if (!this.hasRoute(url)) {
            return false;
        }

        options || (options = {});
        options.url = url;

        var currentURL = this._getURL(),
            hash, hashlessURL;

        // Captures the `url`'s hash and returns a URL without that hash.
        hashlessURL = url.replace(/(#.*)$/, function (u, h, i) {
            hash = h;
            return u.substring(i);
        });

        if (hash && hashlessURL === currentURL.replace(/#.*$/, '')) {
            // When the specified `url` and current URL only differ by the hash,
            // the browser should handle this in-page navigation normally.
            if (!this.get('navigateOnHash')) {
                return false;
            }

            options.hash = hash;
        }

        // When navigating to the same URL as the current URL, behave like a
        // browser and replace the history entry instead of creating a new one.
        'replace' in options || (options.replace = url === currentURL);

        // The `navigate` event will only fire and therefore enhance the
        // navigation to the new URL in HTML5 history enabled browsers or when
        // forced. Otherwise it will fallback to assigning or replacing the URL
        // on `window.location`.
        if (this.get('html5') || options.force) {
            this.fire(EVT_NAVIGATE, options);
        } else {
            if (options.replace) {
                win && win.location.replace(url);
            } else {
                win && (win.location = url);
            }
        }

        return true;
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
        var dots  = '..',
            slash = '/',
            i, len, normalized, segments, segment, stack;

        if (!path || path === slash) {
            return slash;
        }

        segments = path.split(slash);
        stack    = [];

        for (i = 0, len = segments.length; i < len; ++i) {
            segment = segments[i];

            if (segment === dots) {
                stack.pop();
            } else if (segment) {
                stack.push(segment);
            }
        }

        normalized = slash + stack.join(slash);

        // Append trailing slash if necessary.
        if (normalized !== slash && path.charAt(path.length - 1) === slash) {
            normalized += slash;
        }

        return normalized;
    },

    /**
    Binds the delegation of link-click events that match the `linkSelector` to
    the `_onLinkClick()` handler.

    By default this method will only be called if the browser is capable of
    using HTML5 history.

    @method _pjaxBindUI
    @protected
    @since 3.5.0
    **/
    _pjaxBindUI: function () {
        // Only bind link if we haven't already.
        if (!this._pjaxEvents) {
            this._pjaxEvents = Y.one('body').delegate('click',
                this._onLinkClick, this.get('linkSelector'), this);
        }
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
        if (!path) {
            return this._getPath();
        }

        // Path is host-relative and assumed to be resolved and normalized,
        // meaning silly paths like: '/foo/../bar/' will be returned as-is.
        if (path.charAt(0) === '/') {
            return this._normalizePath(path);
        }

        return this._normalizePath(this._getRoot() + path);
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
        var parts    = url && url.match(this._regexURL),
            origin, path, query, hash, resolved;

        if (!parts) {
            return this._getURL();
        }

        origin = parts[1];
        path   = parts[2];
        query  = parts[3];
        hash   = parts[4];

        // Absolute and scheme-relative URLs are assumed to be fully-resolved.
        if (origin) {
            // Prepend the current scheme for scheme-relative URLs.
            if (origin.indexOf('//') === 0) {
                origin = Y.getLocation().protocol + origin;
            }

            return origin + (path || '/') + (query || '') + (hash || '');
        }

        // Will default to the current origin and current path.
        resolved = this._getOrigin() + this._resolvePath(path);

        // A path or query for the specified URL trumps the current URL's.
        if (path || query) {
            return resolved + (query || '') + (hash || '');
        }

        query = this._getQuery();

        return resolved + (query ? ('?' + query) : '') + (hash || '');
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Default handler for the `navigate` event.

    Adds a new history entry or replaces the current entry for the specified URL
    and will scroll the page to the top if configured to do so.

    @method _defNavigateFn
    @param {EventFacade} e
    @protected
    @since 3.5.0
    **/
    _defNavigateFn: function (e) {
        this[e.replace ? 'replace' : 'save'](e.url);

        if (win && this.get('scrollToTop')) {
            // Scroll to the top of the page. The timeout ensures that the
            // scroll happens after navigation begins, so that the current
            // scroll position will be restored if the user clicks the back
            // button.
            setTimeout(function () {
                win.scroll(0, 0);
            }, 1);
        }
    },

    /**
    Handler for delegated link-click events which match the `linkSelector`.

    This will attempt to enhance the navigation to the link element's `href` by
    passing the URL to the `_navigate()` method. When the navigation is being
    enhanced, the default action is prevented.

    If the user clicks a link with the middle/right mouse buttons, or is holding
    down the Ctrl or Command keys, this method's behavior is not applied and
    allows the native behavior to occur. Similarly, if the router is not capable
    or handling the URL because no route-handlers match, the link click will
    behave natively.

    @method _onLinkClick
    @param {EventFacade} e
    @protected
    @since 3.5.0
    **/
    _onLinkClick: function (e) {
        var url;

        // Allow the native behavior on middle/right-click, or when Ctrl or
        // Command are pressed.
        if (e.button !== 1 || e.ctrlKey || e.metaKey) { return; }

        // All browsers fully resolve an anchor's `href` property.
        url = e.currentTarget.get('href');

        // Try and navigate to the URL via the router, and prevent the default
        // link-click action if we do.
        url && this._navigate(url, {originEvent: e}) && e.preventDefault();
    }
};

PjaxBase.ATTRS = {
    /**
    CSS selector string used to filter link click events so that only the links
    which match it will have the enhanced navigation behavior of Pjax applied.

    When a link is clicked and that link matches this selector, Pjax will
    attempt to dispatch to any route handlers matching the link's `href` URL. If
    HTML5 history is not supported or if no route handlers match, the link click
    will be handled by the browser just like any old link.

    @attribute linkSelector
    @type String|Function
    @default "a.pjax"
    @initOnly
    @since 3.5.0
    **/
    linkSelector: {
        value    : 'a.' + CLASS_PJAX,
        writeOnce: 'initOnly'
    },

    /**
    Whether navigating to a hash-fragment identifier on the current page should
    be enhanced and cause the `navigate` event to fire.

    By default Pjax allows the browser to perform its default action when a user
    is navigating within a page by clicking in-page links
    (e.g. `<a href="#top">Top of page</a>`) and does not attempt to interfere or
    enhance in-page navigation.

    @attribute navigateOnHash
    @type Boolean
    @default false
    @since 3.5.0
    **/
    navigateOnHash: {
        value: false
    },

    /**
    Whether the page should be scrolled to the top after navigating to a URL.

    When the user clicks the browser's back button, the previous scroll position
    will be maintained.

    @attribute scrollToTop
    @type Boolean
    @default true
    @since 3.5.0
    **/
    scrollToTop: {
        value: true
    }
};

Y.PjaxBase = PjaxBase;


}, '@VERSION@' ,{requires:['classnamemanager', 'node-event-delegate', 'router']});
