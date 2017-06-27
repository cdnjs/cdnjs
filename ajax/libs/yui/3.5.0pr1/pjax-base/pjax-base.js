YUI.add('pjax-base', function(Y) {

/**
`Y.Router` extension that provides the core plumbing for enhanced navigation
implemented using the pjax technique (HTML5 `pushState` + Ajax).

@submodule pjax-base
@since 3.5.0
**/

var win      = Y.config.win,
    location = win.location,

    Lang = Y.Lang,

    // The CSS class name used to filter link clicks from only the links which
    // the pjax enhanced navigation should be used.
    CLASS_PJAX = Y.ClassNameManager.getClassName('pjax'),

    /**
    Fired when navigating to the specified URL is being enhanced by the router.

    When the `navigate()` method is called or a "pjax" link is clicked, this
    event will be fired if: the browser is HTML5-history enabled, and the router
    has a route-handler for the specified URL.

    This is a useful event to listen to for adding a visual loading indicator
    while the route handlers are busy handling the URL change.

    @event navigate
    @param {String} url The URL that the router will dispatch to its route
      handlers in order to fulfill the enhanced navigation "request".
    @param {Event} [originEvent] The event that caused the navigation, usually
      this would be a click event from a "pjax" anchor element.
    @param {Boolean} [replace] Whether or not the current history entry will be
      replaced, or a new entry will be created. Will default to `true` if the
      specified `url` is the same as the current URL.
    @param {Boolean} [force=false] Whether the enhanced navigation should occur
      even in browsers without HTML5 history.
    **/
    EVT_NAVIGATE = 'navigate';

/**
`Y.Router` extension that provides the core plumbing for enhanced navigation
implemented using the pjax technique (HTML5 `pushState` + Ajax).

This makes it easy to enhance the navigation between the URLs of an application
in HTML5 history capable browsers by delegating to the router to fulfill the
"request" and seamlessly falling-back to using standard full-page reloads in
older, less-capable browsers.

@class PjaxBase
@extensionfor Router
**/
function PjaxBase() {}

PjaxBase.prototype = {
    // -- Protected Properties -------------------------------------------------

    /**
    Holds the delegated pjax-link click handler.

    @property _pjaxEvents
    @type EventHandle
    @default undefined
    @protected
    **/

    /**
    Regex used to break-up a URL string around the URL's path.

    Subpattern captures:

      1. Origin, everything before the URL's path-part.
      2. The URL's path-part.
      3. Suffix, everything after the URL's path-part.

    @property _regexURL
    @type RegExp
    @protected
    **/
    _regexURL: /^((?:[^\/#?:]+:\/\/|\/\/)[^\/]*)?([^?#]*)(.*)$/,

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function () {
        this.publish(EVT_NAVIGATE, {defaultFn: this._defNavigateFn});

        // Pjax is all about progressively-enhancing the navigation between
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
    Navigates to the specified URL if there is a router-handler that matches. In
    browsers capable of using HTML5 history, the navigation will be enhanced by
    firing the `navigate` and having the router handle the "request". Non-HTML5
    browsers will navigate to the new URL via manipulation of `window.location`.

    When there is a route-handler for the specified URL and it is being
    navigated to, this method will return `true`, otherwise it will return
    `false`.

    **Note:** The specified URL _must_ be of the same origin as the current URL,
    otherwise an error will be logged and the navigation will not be performed.
    This is intended as both a security constraint and an purposely imposed
    limitation as it does not make sense to tell the router to navigate to some
    URL on a different scheme, host, or port.

    @method navigate
    @param {String} url The URL to navigate to. This must be of the same-origin
      as the current URL.
    @param {Object} [options] Additional options to configure the navigation,
      these are mixed into the `navigate` event facade.
        @param {Boolean} [options.replace] Whether or not the current history
          entry will be replaced, or a new entry will be created. Will default
          to `true` if the specified `url` is the same as the current URL.
        @param {Boolean} [options.force=false] Whether the enhanced navigation
          should occur even in browsers without HTML5 history.
    @return {Boolean} `true` if the URL was navigated to, `false` otherwise.
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
    Returns the current path root after popping-off the last path segment making
    it useful for resolving other URL paths against.

    The path root will always begin and end with a '/'.

    @method _getRoot
    @return {String} The URL's path root.
    @protected
    **/
    _getRoot: function () {
        var slash = '/',
            path  = location.pathname,
            segments;

        if (path.charAt(path.length - 1) === slash) {
            return path;
        }

        segments = path.split(slash);
        segments.pop();

        return segments.join(slash) + slash;
    },

    /**
    Navigates to the specified URL if there is a router-handler that matches. In
    browsers capable of using HTML5 history, the navigation will be enhanced by
    firing the `navigate` and having the router handle the "request". Non-HTML5
    browsers will navigate to the new URL via manipulation of `window.location`.

    When there is a route-handler for the specified URL and it is being
    navigated to, this method will return `true`, otherwise it will return
    `false`.

    The enhanced navigation flow can be forced causing all navigation to route
    through the router; but this is not advised as it can will produce less
    desirable hash-based URLs in non-HTML5 browsers.

    @method _navigate
    @param {String} url The fully-resolved URL that the router should dispatch
      to its route handlers to fulfill the enhanced navigation "request", or use
      to update `window.location` in non-HTML5 history capable browsers.
    @param {Object} [options] Additional options to configure the navigation,
      these are mixed into the `navigate` event facade.
        @param {Boolean} [options.replace] Whether or not the current history
          entry will be replaced, or a new entry will be created. Will default
          to `true` if the specified `url` is the same as the current URL.
        @param {Boolean} [options.force=false] Whether the enhanced navigation
          should occur even in browsers without HTML5 history.
    @protected
    **/
    _navigate: function (url, options) {
        // Navigation can only be enhanced if there is a route-handler.
        if (!this.hasRoute(url)) {
            return false;
        }

        options || (options = {});
        options.url = url;

        // When navigating to the same URL as the current URL, behave like a
        // browser and replace the history entry instead of creating a new one.
        Lang.isValue(options.replace) || (options.replace = url === this._getURL());

        // The `navigate` event will only fire and therefore enhance the
        // navigation to the new URL in HTML5 history enabled browsers or when
        // forced. Otherwise it will fallback to assigning or replacing the URL
        // on `window.location`.
        if (this.get('html5') || options.force) {
            this.fire(EVT_NAVIGATE, options);
        } else {
            if (options.replace) {
                location.replace(url);
            } else {
                win.location = url;
            }
        }

        return true;
    },

    /**
    Returns a normalized path, riding it of any '..' segments and properly
    handling leading and trailing '/'s.

    @method _normalizePath
    @param {String} path The URL path to normalize.
    @return {String} The normalized path.
    @protected
    **/
    _normalizePath: function (path) {
        var dots  = '..',
            slash = '/',
            i, len, normalized, segments, segment, stack;

        if (!path) {
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
    path.

    A host-relative `path` (one that begins with '/') is assumed to be resolved
    and is returned as is. Falsy values for `path` will return just the current
    path.

    @method _resolvePath
    @param {String} path The URL path to resolve.
    @return {String} The resolved path.
    @protected
    **/
    _resolvePath: function (path) {
        if (!path) {
            return this._getPath();
        }

        // Path is host-relative and assumed to be resolved and normalized,
        // meaning silly paths like: '/foo/../bar/' will be returned as-is.
        if (path.charAt(0) === '/') {
            return path;
        }

        return this._normalizePath(this._getRoot() + path);
    },

    /**
    Resolves the specified URL against the current URL.

    This method resolves URLs like a browser does and will always return an
    absolute URL. When the specified URL is already absolute, it is assumed to
    be fully resolved and is simply returned as is. Scheme-relative URLs are
    prefixed with the current protocol. Relative URLs are giving the current
    URL's origin and are resolved and normalized against the current path-root.

    @method _resolveURL
    @param {String} url The URL to resolve.
    @return {String} The resolved URL.
    @protected
    **/
    _resolveURL: function (url) {
        var parts = url && url.match(this._regexURL),
            origin, path, suffix;

        if (!parts) {
            return this._getURL();
        }

        origin = parts[1];
        path   = parts[2];
        suffix = parts[3];

        // Absolute and scheme-relative URLs are assumed to be fully-resolved.
        if (origin) {
            // Prepend the current scheme for scheme-relative URLs.
            if (origin.indexOf('//') === 0) {
                origin = location.protocol + origin;
            }

            return origin + (path || '/') + (suffix + '');
        }

        return this._getOrigin() + this._resolvePath(path) + (suffix || '');
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Default handler for the `navigate` event.

    Adds a new history entry or replaces the current entry for the specified URL
    and will scroll the page to the top if configured to do so.

    @method _defNavigateFn
    @param {EventFacade} e
    @protected
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
    Handler for the delegated link-click events which match the `linkSelector`.

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
    This selector is used so only the click events who's links match will have
    the enhanced navigation behavior applied.

    When a link being clicked on matches this selector, the browsers default of
    navigating to the URL by doing a full-page reload will be prevented;
    instead, navigating to the URL will be enhanced by have the router fulfill
    the "request" by updating the URL and content of the page.

    @attribute linkSelector
    @type String|Function
    @default `'a.pjax'`
    @initOnly
    **/
    linkSelector: {
        value    : 'a.' + CLASS_PJAX,
        writeOnce: 'initOnly'
    },

    /**
    Whether the page should be scrolled to the top after navigating to a URL.

    When the user clicks the browser's back button, the previous scroll-position
    will be maintained.

    @attribute scrollToTop
    @type Boolean
    @default `true`
    **/
    scrollToTop: {
        value: true
    }
};

Y.PjaxBase = PjaxBase;


}, '@VERSION@' ,{requires:['classnamemanager', 'node-event-delegate', 'router']});
