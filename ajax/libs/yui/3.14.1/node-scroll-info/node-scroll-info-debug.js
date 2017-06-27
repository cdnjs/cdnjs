YUI.add('node-scroll-info', function (Y, NAME) {

/*jshint onevar:false */

/**
Provides the ScrollInfo Node plugin, which exposes convenient events and methods
related to scrolling.

@module node-scroll-info
@since 3.7.0
**/

/**
Provides convenient events and methods related to scrolling. This could be used,
for example, to implement infinite scrolling, or to lazy-load content based on
the current scroll position.

### Example

    var body = Y.one('body');

    body.plug(Y.Plugin.ScrollInfo);

    body.scrollInfo.on('scrollToBottom', function (e) {
        // Load more content when the user scrolls to the bottom of the page.
    });

@class Plugin.ScrollInfo
@extends Plugin.Base
@since 3.7.0
**/

var doc = Y.config.doc,
    win = Y.config.win;

/**
Fired when the user scrolls within the host node.

This event (like all scroll events exposed by ScrollInfo) is throttled and fired
only after the number of milliseconds specified by the `scrollDelay` attribute
have passed in order to prevent thrashing.

This event passes along the event facade for the standard DOM `scroll` event and
mixes in the following additional properties.

@event scroll
@param {Boolean} atBottom Whether the current scroll position is at the bottom
    of the scrollable region.
@param {Boolean} atLeft Whether the current scroll position is at the extreme
    left of the scrollable region.
@param {Boolean} atRight Whether the current scroll position is at the extreme
    right of the scrollable region.
@param {Boolean} atTop Whether the current scroll position is at the top of the
    scrollable region.
@param {Boolean} isScrollDown `true` if the user scrolled down.
@param {Boolean} isScrollLeft `true` if the user scrolled left.
@param {Boolean} isScrollRight `true` if the user scrolled right.
@param {Boolean} isScrollUp `true` if the user scrolled up.
@param {Number} scrollBottom Y value of the bottom-most onscreen pixel of the
    scrollable region.
@param {Number} scrollHeight Total height in pixels of the scrollable region,
    including offscreen pixels.
@param {Number} scrollLeft X value of the left-most onscreen pixel of the
    scrollable region.
@param {Number} scrollRight X value of the right-most onscreen pixel of the
    scrollable region.
@param {Number} scrollTop Y value of the top-most onscreen pixel of the
    scrollable region.
@param {Number} scrollWidth Total width in pixels of the scrollable region,
    including offscreen pixels.
@see scrollDelay
@see scrollMargin
**/
var EVT_SCROLL = 'scroll',

    /**
    Fired when the user scrolls down within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollDown
    @see scroll
    **/
    EVT_SCROLL_DOWN = 'scrollDown',

    /**
    Fired when the user scrolls left within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollLeft
    @see scroll
    **/
    EVT_SCROLL_LEFT = 'scrollLeft',

    /**
    Fired when the user scrolls right within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollRight
    @see scroll
    **/
    EVT_SCROLL_RIGHT = 'scrollRight',

    /**
    Fired when the user scrolls up within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollUp
    @see scroll
    **/
    EVT_SCROLL_UP = 'scrollUp',

    /**
    Fired when the user scrolls to the bottom of the scrollable region within
    the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToBottom
    @see scroll
    **/
    EVT_SCROLL_TO_BOTTOM = 'scrollToBottom',

    /**
    Fired when the user scrolls to the extreme left of the scrollable region
    within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToLeft
    @see scroll
    **/
    EVT_SCROLL_TO_LEFT = 'scrollToLeft',

    /**
    Fired when the user scrolls to the extreme right of the scrollable region
    within the host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToRight
    @see scroll
    **/
    EVT_SCROLL_TO_RIGHT = 'scrollToRight',

    /**
    Fired when the user scrolls to the top of the scrollable region within the
    host node.

    This event provides the same event facade as the `scroll` event. See that
    event for details.

    @event scrollToTop
    @see scroll
    **/
    EVT_SCROLL_TO_TOP = 'scrollToTop';

Y.Plugin.ScrollInfo = Y.Base.create('scrollInfoPlugin', Y.Plugin.Base, [], {
    // -- Protected Properties -------------------------------------------------

    /**
    Height of the visible region of the host node in pixels. If the host node is
    the body, this will be the same as `_winHeight`.

    @property {Number} _height
    @protected
    **/

    /**
    Whether or not the host node is the `<body>` element.

    @property {Boolean} _hostIsBody
    @protected
    **/

    /**
    Width of the visible region of the host node in pixels. If the host node is
    the body, this will be the same as `_winWidth`.

    @property {Number} _width
    @protected
    **/

    /**
    Height of the viewport in pixels.

    @property {Number} _winHeight
    @protected
    **/

    /**
    Width of the viewport in pixels.

    @property {Number} _winWidth
    @protected
    **/

    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        // Cache for quicker lookups in the critical path.
        this._host                  = config.host;
        this._hostIsBody            = this._host.get('nodeName').toLowerCase() === 'body';
        this._scrollDelay           = this.get('scrollDelay');
        this._scrollMargin          = this.get('scrollMargin');
        this._scrollNode            = this._getScrollNode();

        this.refreshDimensions();

        this._lastScroll = this.getScrollInfo();

        this._bind();
    },

    destructor: function () {
        new Y.EventHandle(this._events).detach();
        this._events = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Returns a NodeList containing all offscreen nodes inside the host node that
    match the given CSS selector. An offscreen node is any node that is entirely
    outside the visible (onscreen) region of the host node based on the current
    scroll location.

    @method getOffscreenNodes
    @param {String} [selector] CSS selector. If omitted, all offscreen nodes
        will be returned.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {NodeList} Offscreen nodes matching _selector_.
    @see scrollMargin
    **/
    getOffscreenNodes: function (selector, margin) {
        if (typeof margin === 'undefined') {
            margin = this._scrollMargin;
        }

        var elements = Y.Selector.query(selector || '*', this._host._node);

        return new Y.NodeList(Y.Array.filter(elements, function (el) {
            return !this._isElementOnscreen(el, margin);
        }, this));
    },

    /**
    Returns a NodeList containing all onscreen nodes inside the host node that
    match the given CSS selector. An onscreen node is any node that is fully or
    partially within the visible (onscreen) region of the host node based on the
    current scroll location.

    @method getOnscreenNodes
    @param {String} [selector] CSS selector. If omitted, all onscreen nodes will
        be returned.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {NodeList} Onscreen nodes matching _selector_.
    @see scrollMargin
    **/
    getOnscreenNodes: function (selector, margin) {
        if (typeof margin === 'undefined') {
            margin = this._scrollMargin;
        }

        var elements = Y.Selector.query(selector || '*', this._host._node);

        return new Y.NodeList(Y.Array.filter(elements, function (el) {
            return this._isElementOnscreen(el, margin);
        }, this));
    },

    /**
    Returns an object hash containing information about the current scroll
    position of the host node. This is the same information that's mixed into
    the event facade of the `scroll` event and other scroll-related events.

    @method getScrollInfo
    @return {Object} Object hash containing information about the current scroll
        position. See the `scroll` event for details on what properties this
        object contains.
    @see scroll
    **/
    getScrollInfo: function () {
        var domNode    = this._scrollNode,
            lastScroll = this._lastScroll,
            margin     = this._scrollMargin,

            scrollLeft   = domNode.scrollLeft,
            scrollHeight = domNode.scrollHeight,
            scrollTop    = domNode.scrollTop,
            scrollWidth  = domNode.scrollWidth,

            scrollBottom = scrollTop + this._height,
            scrollRight  = scrollLeft + this._width;

        return {
            atBottom: scrollBottom > (scrollHeight - margin),
            atLeft  : scrollLeft < margin,
            atRight : scrollRight > (scrollWidth - margin),
            atTop   : scrollTop < margin,

            isScrollDown : lastScroll && scrollTop > lastScroll.scrollTop,
            isScrollLeft : lastScroll && scrollLeft < lastScroll.scrollLeft,
            isScrollRight: lastScroll && scrollLeft > lastScroll.scrollLeft,
            isScrollUp   : lastScroll && scrollTop < lastScroll.scrollTop,

            scrollBottom: scrollBottom,
            scrollHeight: scrollHeight,
            scrollLeft  : scrollLeft,
            scrollRight : scrollRight,
            scrollTop   : scrollTop,
            scrollWidth : scrollWidth
        };
    },

    /**
    Returns `true` if _node_ is at least partially onscreen within the host
    node, `false` otherwise.

    @method isNodeOnscreen
    @param {HTMLElement|Node|String} node Node or selector to check.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {Boolean} `true` if _node_ is at least partially onscreen within the
        host node, `false` otherwise.
    @since 3.11.0
    **/
    isNodeOnscreen: function (node, margin) {
        node = Y.one(node);
        return !!(node && this._isElementOnscreen(node._node, margin));
    },

    /**
    Refreshes cached position, height, and width dimensions for the host node.
    If the host node is the body, then the viewport height and width will be
    used.

    This info is cached to improve performance during scroll events, since it's
    expensive to touch the DOM for these values. Dimensions are automatically
    refreshed whenever the browser is resized, but if you change the dimensions
    or position of the host node in JS, you may need to call
    `refreshDimensions()` manually to cache the new dimensions.

    @method refreshDimensions
    **/
    refreshDimensions: function () {
        var docEl = doc.documentElement;

        // On iOS devices and on Chrome for Android,
        // documentElement.clientHeight/Width aren't reliable, but
        // window.innerHeight/Width are. The dom-screen module's viewport size
        // methods don't account for this, which is why we do it here.
        if (Y.UA.ios || (Y.UA.android && Y.UA.chrome)) {
            this._winHeight = win.innerHeight;
            this._winWidth  = win.innerWidth;
        } else {
            this._winHeight = docEl.clientHeight;
            this._winWidth  = docEl.clientWidth;
        }

        if (this._hostIsBody) {
            this._height = this._winHeight;
            this._width  = this._winWidth;
        } else {
            this._height = this._scrollNode.clientHeight;
            this._width  = this._scrollNode.clientWidth;
        }

        this._refreshHostBoundingRect();
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Binds event handlers.

    @method _bind
    @protected
    **/
    _bind: function () {
        var winNode = Y.one('win');

        this._events = [
            this.after({
                scrollDelayChange : this._afterScrollDelayChange,
                scrollMarginChange: this._afterScrollMarginChange
            }),

            winNode.on('windowresize', this._afterResize, this)
        ];

        // If the host node is the body, listen for the scroll event on the
        // window, since <body> doesn't have a scroll event.
        if (this._hostIsBody) {
            this._events.push(winNode.after('scroll', this._afterHostScroll, this));
        } else {
            // The host node is not the body, but we still need to listen for
            // window scroll events so we can determine whether nodes are
            // onscreen.
            this._events.push(
                winNode.after('scroll', this._afterWindowScroll, this),
                this._host.after('scroll', this._afterHostScroll, this)
            );
        }
    },

    /**
    Returns the DOM node that should be used to lookup scroll coordinates. In
    some browsers, the `<body>` element doesn't return scroll coordinates, and
    the documentElement must be used instead; this method takes care of
    determining which node should be used.

    @method _getScrollNode
    @return {HTMLElement} DOM node.
    @protected
    **/
    _getScrollNode: function () {
        // WebKit returns scroll coordinates on the body element, but other
        // browsers don't, so we have to use the documentElement.
        return this._hostIsBody && !Y.UA.webkit ? doc.documentElement :
                Y.Node.getDOMNode(this._host);
    },

    /**
    Underlying element-based implementation for `isNodeOnscreen()`.

    @method _isElementOnscreen
    @param {HTMLElement} el HTML element.
    @param {Number} [margin] Additional margin in pixels beyond the actual
        onscreen region that should be considered "onscreen" for the purposes of
        this query. Defaults to the value of the `scrollMargin` attribute.
    @return {Boolean} `true` if _el_ is at least partially onscreen within the
        host node, `false` otherwise.
    @protected
    @since 3.11.0
    **/
    _isElementOnscreen: function (el, margin) {
        var hostRect = this._hostRect,
            rect     = el.getBoundingClientRect();

        if (typeof margin === 'undefined') {
            margin = this._scrollMargin;
        }

        // Determine whether any part of _el_ is within the visible region of
        // the host element or the specified margin around the visible region of
        // the host element.
        return !(rect.top > hostRect.bottom + margin
                    || rect.bottom < hostRect.top - margin
                    || rect.right < hostRect.left - margin
                    || rect.left > hostRect.right + margin);
    },

    /**
    Caches the bounding rect of the host node.

    If the host node is the body, the bounding rect will be faked to represent
    the dimensions of the viewport, since the actual body dimensions may extend
    beyond the viewport and we only care about the visible region.

    @method _refreshHostBoundingRect
    @protected
    **/
    _refreshHostBoundingRect: function () {
        var winHeight = this._winHeight,
            winWidth  = this._winWidth,

            hostRect;

        if (this._hostIsBody) {
            hostRect = {
                bottom: winHeight,
                height: winHeight,
                left  : 0,
                right : winWidth,
                top   : 0,
                width : winWidth
            };

            this._isHostOnscreen = true;
        } else {
            hostRect = this._scrollNode.getBoundingClientRect();
        }

        this._hostRect = hostRect;
    },

    /**
    Mixes detailed scroll information into the given DOM `scroll` event facade
    and fires appropriate local events.

    @method _triggerScroll
    @param {EventFacade} e Event facade from the DOM `scroll` event.
    @protected
    **/
    _triggerScroll: function (e) {
        var info       = this.getScrollInfo(),
            facade     = Y.merge(e, info),
            lastScroll = this._lastScroll;

        this._lastScroll = info;

        this.fire(EVT_SCROLL, facade);

        if (info.isScrollLeft) {
            this.fire(EVT_SCROLL_LEFT, facade);
        } else if (info.isScrollRight) {
            this.fire(EVT_SCROLL_RIGHT, facade);
        }

        if (info.isScrollUp) {
            this.fire(EVT_SCROLL_UP, facade);
        } else if (info.isScrollDown) {
            this.fire(EVT_SCROLL_DOWN, facade);
        }

        if (info.atBottom && (!lastScroll.atBottom ||
                info.scrollHeight > lastScroll.scrollHeight)) {

            this.fire(EVT_SCROLL_TO_BOTTOM, facade);
        }

        if (info.atLeft && !lastScroll.atLeft) {
            this.fire(EVT_SCROLL_TO_LEFT, facade);
        }

        if (info.atRight && (!lastScroll.atRight ||
                info.scrollWidth > lastScroll.scrollWidth)) {

            this.fire(EVT_SCROLL_TO_RIGHT, facade);
        }

        if (info.atTop && !lastScroll.atTop) {
            this.fire(EVT_SCROLL_TO_TOP, facade);
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Handles DOM `scroll` events on the host node.

    @method _afterHostScroll
    @param {EventFacade} e
    @protected
    **/
    _afterHostScroll: function (e) {
        var self = this;

        clearTimeout(this._scrollTimeout);

        this._scrollTimeout = setTimeout(function () {
            self._triggerScroll(e);
        }, this._scrollDelay);
    },

    /**
    Handles browser resize events.

    @method _afterResize
    @protected
    **/
    _afterResize: function () {
        this.refreshDimensions();
    },

    /**
    Caches the `scrollDelay` value after that attribute changes to allow
    quicker lookups in critical path code.

    @method _afterScrollDelayChange
    @param {EventFacade} e
    @protected
    **/
    _afterScrollDelayChange: function (e) {
        this._scrollDelay = e.newVal;
    },

    /**
    Caches the `scrollMargin` value after that attribute changes to allow
    quicker lookups in critical path code.

    @method _afterScrollMarginChange
    @param {EventFacade} e
    @protected
    **/
    _afterScrollMarginChange: function (e) {
        this._scrollMargin = e.newVal;
    },

    /**
    Handles DOM `scroll` events on the window.

    @method _afterWindowScroll
    @param {EventFacade} e
    @protected
    **/
    _afterWindowScroll: function () {
        this._refreshHostBoundingRect();
    }
}, {
    NS: 'scrollInfo',

    ATTRS: {
        /**
        Number of milliseconds to wait after a native `scroll` event before
        firing local scroll events. If another native scroll event occurs during
        this time, previous events will be ignored. This ensures that we don't
        fire thousands of events when the user is scrolling quickly.

        @attribute scrollDelay
        @type Number
        @default 50
        **/
        scrollDelay: {
            value: 50
        },

        /**
        Additional margin in pixels beyond the onscreen region of the host node
        that should be considered "onscreen".

        For example, if set to 50, then a `scrollToBottom` event would be fired
        when the user scrolls to within 50 pixels of the bottom of the
        scrollable region, even if they don't actually scroll completely to the
        very bottom pixel.

        This margin also applies to the `getOffscreenNodes()` and
        `getOnscreenNodes()` methods by default.

        @attribute scrollMargin
        @type Number
        @default 50
        **/
        scrollMargin: {
            value: 50
        }
    }
});


}, '@VERSION@', {"requires": ["array-extras", "base-build", "event-resize", "node-pluginhost", "plugin", "selector"]});
