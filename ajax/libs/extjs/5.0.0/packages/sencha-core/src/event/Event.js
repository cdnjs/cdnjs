/**
 * Just as {@link Ext.dom.Element} wraps around a native DOM node, {@link Ext.event.Event} wraps the browser's native
 * event-object normalizing cross-browser differences such as mechanisms to stop event-propagation along with a method
 * to prevent default actions from taking place.
 *
 * Here is a simple example of how you use it:
 *
 *     @example preview
 *     Ext.Viewport.add({
 *         layout: 'fit',
 *         items: [
 *             {
 *                 docked: 'top',
 *                 xtype: 'toolbar',
 *                 title: 'Ext.event.Event example!'
 *             },
 *             {
 *                 id: 'logger',
 *                 styleHtmlContent: true,
 *                 html: 'Tap somewhere!',
 *                 padding: 5
 *             }
 *         ]
 *     });
 *
 *     Ext.Viewport.element.on({
 *         tap: function(e, node) {
 *             var string = '';
 *
 *             string += 'You tapped at: <strong>{ x: ' + e.pageX + ', y: ' + e.pageY + ' }</strong> <i>(e.pageX & e.pageY)</i>';
 *             string += '<hr />';
 *             string += 'The HTMLElement you tapped has the className of: <strong>' + e.target.className + '</strong> <i>(e.target)</i>';
 *             string += '<hr />';
 *             string += 'The HTMLElement which has the listener has a className of: <strong>' + e.currentTarget.className + '</strong> <i>(e.currentTarget)</i>';
 *
 *             Ext.getCmp('logger').setHtml(string);
 *         }
 *     });
 *
 * ## Recognizers
 *
 * Sencha Touch includes a bunch of default event recognizers to know when a user taps, swipes, etc.
 *
 * For a full list of default recognizers, and more information, please view the {@link Ext.event.gesture.Recognizer} documentation.
 * 
 * This class also provides a set of constants for use with key events.  These are useful
 * for determining if a specific key was pressed, and are available both on instances,
 * and as static properties of the class.  The following two statements are equivalent:
 * 
 *     if (e.getKey() === Ext.event.Event.TAB) {
 *         // tab key was pressed
 *     }
 * 
 *     if (e.getKey() === e.TAB) {
 *         // tab key was pressed
 *     }
 */
Ext.define('Ext.event.Event', {
    alternateClassName: 'Ext.EventObjectImpl',

    requires: [
        'Ext.util.Point'
    ],

    /**
     * @property {Number} distance
     * The distance of the event.
     *
     * **This is only available when the event type is `swipe` and `pinch`.**
     */

    /**
     * @property {HTMLElement} target
     * The element that fired this event.  For the element whose handlers are currently
     * being processed, i.e. the element that the event handler was attached to, use
     * `currentTarget`
     */

    /**
     * @property {HTMLElement} currentTarget
     * Refers to the element the event handler was attached to, vs the `target`, which is
     * the actual element that fired the event.  For example, if the event bubbles, the
     * `target` element may be a descendant of the `currentTarget`, as the event may
     * have been triggered on the `target` and then bubbled up to the `currentTarget`
     * where it was handled.
     */

    /**
     * @property {HTMLElement} delegatedTarget
     * Same as `currentTarget`
     * @deprecated 5.0.0 use {@link #currentTarget} instead.
     */

    /**
     * @property {Number} pageX The browsers x coordinate of the event.
     * Note: this only works in browsers that support pageX on the native browser event
     * object (pageX is not natively supported in IE9 and earlier).  In Ext JS, for a
     * cross browser normalized x-coordinate use {@link #getX}
     */

    /**
     * @property {Number} pageY The browsers y coordinate of the event.
     * Note: this only works in browsers that support pageY on the native browser event
     * object (pageY is not natively supported in IE9 and earlier).  In Ext JS, for a
     * cross browser normalized y-coordinate use {@link #getY}
     */

    /**
     * @property {Boolean} ctrlKey
     * True if the control key was down during the event.
     * In Mac this will also be true when meta key was down.
     */
    /**
     * @property {Boolean} altKey
     * True if the alt key was down during the event.
     */
    /**
     * @property {Boolean} shiftKey
     * True if the shift key was down during the event.
     */

    /**
     * @property {Event} browserEvent
     * The raw browser event which this object wraps.
     */

    isStopped: false,

    isEvent: true,

    statics: {
        resolveTextNode: function(node) {
            return (node && node.nodeType === 3) ? node.parentNode : node;
        },

        // private
        pointerEvents: {
            pointerdown: 1,
            pointermove: 1,
            pointerup: 1,
            pointercancel: 1,
            pointerover: 1,
            pointerout: 1,
            pointerenter: 1,
            pointerleave: 1,
            MSPointerDown: 1,
            MSPointerMove: 1,
            MSPointerUp: 1,
            MSPointerOver: 1,
            MSPointerOut: 1,
            MSPointerCancel: 1,
            MSPointerEnter: 1,
            MSPointerLeave: 1
        },

        // private
        mouseEvents: {
            mousedown: 1,
            mousemove: 1,
            mouseup: 1,
            mouseover: 1,
            mouseout: 1,
            mouseenter: 1,
            mouseleave: 1
        },

        // private
        touchEvents: {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,
            touchcancel: 1
        },

        // msPointerTypes in IE10 are numbers, in the w3c spec they are strings.
        // this map allows us to normalize the pointerType for an event
        // http://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType
        // http://msdn.microsoft.com/en-us/library/ie/hh772359(v=vs.85).aspx
        pointerTypes: {
            2: 'touch',
            3: 'pen',
            4: 'mouse',
            touch: 'touch',
            pen: 'pen',
            mouse: 'mouse'
        }
    },

    constructor: function(event) {
        var me = this,
            self = me.self,
            resolveTextNode = me.self.resolveTextNode,
            changedTouches = event.changedTouches,
            // The target object from which to obtain the coordinates (pageX, pageY). For
            // mouse and pointer events this is simply the event object itself, but touch
            // events have their coordinates on the "Touch" object(s) instead.
            coordinateOwner = changedTouches ? changedTouches[0] : event,
            type = event.type,
            pointerType, relatedTarget;

        me.pageX = coordinateOwner.pageX;
        me.pageY = coordinateOwner.pageY;

        me.target = me.delegatedTarget = resolveTextNode(event.target);
        relatedTarget = event.relatedTarget;
        if (relatedTarget) {
            me.relatedTarget = resolveTextNode(relatedTarget);
        }

        me.browserEvent = me.event = event;
        me.type = type;
        // set button to 0 if undefined so that touchstart, touchend, and tap will quack
        // like left mouse button mousedown mouseup, and click
        me.button = event.button || 0;
        me.shiftKey = event.shiftKey;
        // mac metaKey behaves like ctrlKey
        me.ctrlKey = event.ctrlKey || event.metaKey || false;
        me.altKey = event.altKey;
        me.charCode = event.charCode;
        me.keyCode = event.keyCode;

        if (self.mouseEvents[type]) {
            pointerType = 'mouse';
        } else if (self.pointerEvents[type]) {
            pointerType = self.pointerTypes[event.pointerType];
        } else if (self.touchEvents[type]) {
            pointerType = 'touch';
        }

        if (pointerType) {
            me.pointerType = pointerType;
        }

        me.timeStamp = me.time = +(event.timeStamp || new Date());
    },

    /**
     * Creates a new Event object that is prototype-chained to this event.  Useful for
     * creating identical events so that certain properties can be changed without
     * affecting the original event.  For example, translated events have their "type"
     * corrected in this manner.
     * @param {Object} props properties to set on the chained event
     * @private
     */
    chain: function(props) {
        var e = Ext.Object.chain(this);
        e.parentEvent = this; // needed for stopPropagation
        return Ext.apply(e, props);
    },

    /**
     * Correctly scales a given wheel delta.
     * @param {Number} delta The delta value.
     * @private
     */
    correctWheelDelta: function (delta) {
        var scale = this.WHEEL_SCALE,
            ret = Math.round(delta / scale);

        if (!ret && delta) {
            ret = (delta < 0) ? -1 : 1; // don't allow non-zero deltas to go to zero!
        }

        return ret;
    },

    /**
     * Gets the character code for the event.
     * @return {Number}
     */
    getCharCode: function(){
        return this.charCode || this.keyCode;
    },

    /**
     * Returns a normalized keyCode for the event.
     * @return {Number} The key code
     */
    getKey: function(){
        return this.keyCode || this.charCode;
    },

    /**
     * Returns a point object that consists of the object coordinates.
     * @return {Ext.util.Point} point
     */
    getPoint: function(){
        var xy = this.getXY();
        return new Ext.util.Point(xy[0], xy[1]);
    },

    /**
     * Gets the related target.
     * @param {String} [selector] A simple selector to filter the target or look for an
     * ancestor of the target. See {@link Ext.dom.Query} for information about simple
     * selectors.
     * @param {Number/HTMLElement} [maxDepth] The max depth to search as a number or
     * element (defaults to 10 || document.body).
     * @param {Boolean} [returnEl] `true` to return a Ext.Element object instead of DOM
     * node.
     * @return {HTMLElement}
     */
    getRelatedTarget: function(selector, maxDepth, returnEl){
        var relatedTarget = this.relatedTarget,
            target = null;

        if (relatedTarget) {
            if (selector) {
                target = Ext.fly(relatedTarget).findParent(selector, maxDepth, returnEl);
            } else {
                target = returnEl ? Ext.get(relatedTarget) : relatedTarget;
            }
        }
        return target;
    },

    /**
     * Gets the target for the event.
     * @param {String} selector (optional) A simple selector to filter the target or look
     * for an ancestor of the target
     * @param {Number/Mixed} [maxDepth=10||document.body] (optional) The max depth to
     * search as a number or element (defaults to 10 || document.body)
     * @param {Boolean} returnEl (optional) `true` to return a Ext.Element object instead
     * of DOM node.
     * @return {HTMLElement}
     */
    getTarget: function(selector, maxDepth, returnEl) {
        return selector ? Ext.fly(this.target).findParent(selector, maxDepth, returnEl) :
            (returnEl ? Ext.get(this.target) : this.target);
    },

    /**
     * Returns the time of the event.
     * @return {Date}
     */
    getTime: function() {
        return this.time;
    },

    /**
     * Normalizes mouse wheel y-delta across browsers. To get x-delta information, use
     * {@link #getWheelDeltas} instead.
     * @return {Number} The mouse wheel y-delta
     */
    getWheelDelta: function(){
        var deltas = this.getWheelDeltas();

        return deltas.y;
    },

    /**
     * Returns the mouse wheel deltas for this event.
     * @return {Object} An object with "x" and "y" properties holding the mouse wheel deltas.
     */
    getWheelDeltas: function () {
        var me = this,
            event = me.browserEvent,
            dx = 0, dy = 0; // the deltas

        if (Ext.isDefined(event.wheelDeltaX)) { // WebKit has both dimensions
            dx = event.wheelDeltaX;
            dy = event.wheelDeltaY;
        } else if (event.wheelDelta) { // old WebKit and IE
            dy = event.wheelDelta;
        } else if (event.detail) { // Gecko
            dy = -event.detail; // gecko is backwards

            // Gecko sometimes returns really big values if the user changes settings to
            // scroll a whole page per scroll
            if (dy > 100) {
                dy = 3;
            } else if (dy < -100) {
                dy = -3;
            }

            // Firefox 3.1 adds an axis field to the event to indicate direction of
            // scroll.  See https://developer.mozilla.org/en/Gecko-Specific_DOM_Events
            if (Ext.isDefined(event.axis) && event.axis === event.HORIZONTAL_AXIS) {
                dx = dy;
                dy = 0;
            }
        }

        return {
            x: me.correctWheelDelta(dx),
            y: me.correctWheelDelta(dy)
        };
    },

    /**
     * Gets the x coordinate of the event.
     * @return {Number}
     */
    getX: function() {
        return this.getXY()[0];
    },

    /**
     * Gets the X and Y coordinates of the event.
     * @return {Number[]} The xy values like [x, y]
     */
    getXY: function() {
        if (!this.xy) {
            this.xy = [this.pageX, this.pageY];
        }

        return this.xy;
    },

    /**
     * Gets the y coordinate of the event.
     * @return {Number}
     */
    getY: function() {
        return this.getXY()[1];
    },

   /**
    * Returns true if the control, meta, shift or alt key was pressed during this event.
    * @return {Boolean}
    */
    hasModifier: function() {
        var me = this;
        return !!(me.ctrlKey || me.altKey || me.shiftKey || me.metaKey);
    },

    /**
     * Checks if the key pressed was a "navigation" key. A navigation key is defined by
     * these keys:
     *
     *  - Page Up
     *  - Page Down
     *  - End
     *  - Home
     *  - Left
     *  - Up
     *  - Right
     *  - Down
     *  - Return
     *  - Tab
     *  - Esc
     *
     * @return {Boolean} `true` if the press is a navigation keypress
     */
    isNavKeyPress: function(){
        var me = this,
            k = me.keyCode;

       return (k >= 33 && k <= 40) ||  // Page Up/Down, End, Home, Left, Up, Right, Down
       k === me.RETURN ||
       k === me.TAB ||
       k === me.ESC;
    },

    /**
     * Checks if the key pressed was a "special" key. A special key is defined as one of
     * these keys:
     *
     *  - Page Up
     *  - Page Down
     *  - End
     *  - Home
     *  - Left arrow
     *  - Up arrow
     *  - Right arrow
     *  - Down arrow
     *  - Return
     *  - Tab
     *  - Esc
     *  - Backspace
     *  - Delete
     *  - Shift
     *  - Ctrl
     *  - Alt
     *  - Pause
     *  - Caps Lock
     *  - Print Screen
     *  - Insert
     *
     * @return {Boolean} `true` if the press is a special keypress
     */
    isSpecialKey: function(){
        var k = this.keyCode;
        return (this.type === 'keypress' && this.ctrlKey) ||
        this.isNavKeyPress() ||
        (k === this.BACKSPACE) || // Backspace
        (k >= 16 && k <= 20) ||   // Shift, Ctrl, Alt, Pause, Caps Lock
        (k >= 44 && k <= 46);     // Print Screen, Insert, Delete
    },

    makeUnpreventable: function() {
        this.browserEvent.preventDefault = Ext.emptyFn;
    },

    /**
     * Prevents the browsers default handling of the event.
     * @chainable
     */
    preventDefault: function() {
        this.browserEvent.preventDefault();
        return this;
    },

    setCurrentTarget: function(target) {
        this.currentTarget = this.delegatedTarget = target;
    },

    /**
     * Stop the event (`{@link #preventDefault}` and `{@link #stopPropagation}`).
     * @chainable
     */
    stopEvent: function() {
        return this.preventDefault().stopPropagation();
    },

    /**
     * Cancels bubbling of the event.
     * @chainable
     */
    stopPropagation: function() {
        var me = this,
            browserEvent = me.browserEvent,
            parentEvent = me.parentEvent;

        // Set isStopped for delegated event listeners.  Dom publisher will check this
        // property during its emulated propagation phase (see doPublish)
        me.isStopped = true;

        // if the event was created by prototype-chaining a new object to an existing event
        // instance, we need to make sure the parent event is stopped.  This feature most
        // likely comes into play when dealing with event translation.  For example on touch
        // browsers addListener('mousedown') actually attaches a 'touchstart' listener behind
        // the scenes.  When the 'touchstart' event is dispatched, the event system will
        // create a "chained" copy of the event object before correcting its type back to
        // 'mousedown' and calling the handler.  When propagating the event we look at the
        // original event, not the chained one to determine if propagation should continue,
        // so the isStopped property must be set on the parentEvent or stopPropagation
        // will not work.
        if (parentEvent) {
            parentEvent.isStopped = true;
        }

        //<feature legacyBrowser>
        if (!browserEvent.stopPropagation) {
            // IE < 10 does not have stopPropagation()
            browserEvent.cancelBubble = true;
            return me;
        }
        //</feature>

        // For non-delegated event listeners (those that are directly attached to the
        // DOM element) we need to call the browserEvent's stopPropagation() method.
        browserEvent.stopPropagation();

        return me;
    },

    /**
     * Returns true if the target of this event is a child of `el`.  Unless the allowEl
     * parameter is set, it will return false if if the target is `el`.
     * Example usage:
     * 
     *     // Handle click on any child of an element
     *     Ext.getBody().on('click', function(e){
     *         if(e.within('some-el')){
     *             alert('Clicked on a child of some-el!');
     *         }
     *     });
     * 
     *     // Handle click directly on an element, ignoring clicks on child nodes
     *     Ext.getBody().on('click', function(e,t){
     *         if((t.id == 'some-el') && !e.within(t, true)){
     *             alert('Clicked directly on some-el!');
     *         }
     *     });
     * 
     * @param {String/HTMLElement/Ext.dom.Element} el The id, DOM element or Ext.Element to check
     * @param {Boolean} [related] `true` to test if the related target is within el instead
     * of the target
     * @param {Boolean} [allowEl] `true` to also check if the passed element is the target
     * or related target
     * @return {Boolean}
     */
    within: function(el, related, allowEl){
        if(el){
            var t = related ? this.getRelatedTarget() : this.getTarget(),
                result;

            if (t) {
                result = Ext.fly(el).contains(t);
                if (!result && allowEl) {
                    result = (t === Ext.getDom(el));
                }
                return result;
            }
        }
        return false;
    },

    deprecated: {
        '4.0': {
            methods: {

                /**
                 * Gets the x coordinate of the event.
                 * @return {Number}
                 * @deprecated 4.0 use {@link #getX} instead
                 */
                getPageX: 'getX',
                
                /**
                 * Gets the y coordinate of the event.
                 * @return {Number}
                 * @deprecated 4.0 use {@link #getY} instead
                 */
                getPageY: 'getY'
            }
        }
    }
}, function(Event) {
    var constants = {
        /** Key constant @type Number */
        BACKSPACE: 8,
        /** Key constant @type Number */
        TAB: 9,
        /** Key constant @type Number */
        NUM_CENTER: 12,
        /** Key constant @type Number */
        ENTER: 13,
        /** Key constant @type Number */
        RETURN: 13,
        /** Key constant @type Number */
        SHIFT: 16,
        /** Key constant @type Number */
        CTRL: 17,
        /** Key constant @type Number */
        ALT: 18,
        /** Key constant @type Number */
        PAUSE: 19,
        /** Key constant @type Number */
        CAPS_LOCK: 20,
        /** Key constant @type Number */
        ESC: 27,
        /** Key constant @type Number */
        SPACE: 32,
        /** Key constant @type Number */
        PAGE_UP: 33,
        /** Key constant @type Number */
        PAGE_DOWN: 34,
        /** Key constant @type Number */
        END: 35,
        /** Key constant @type Number */
        HOME: 36,
        /** Key constant @type Number */
        LEFT: 37,
        /** Key constant @type Number */
        UP: 38,
        /** Key constant @type Number */
        RIGHT: 39,
        /** Key constant @type Number */
        DOWN: 40,
        /** Key constant @type Number */
        PRINT_SCREEN: 44,
        /** Key constant @type Number */
        INSERT: 45,
        /** Key constant @type Number */
        DELETE: 46,
        /** Key constant @type Number */
        ZERO: 48,
        /** Key constant @type Number */
        ONE: 49,
        /** Key constant @type Number */
        TWO: 50,
        /** Key constant @type Number */
        THREE: 51,
        /** Key constant @type Number */
        FOUR: 52,
        /** Key constant @type Number */
        FIVE: 53,
        /** Key constant @type Number */
        SIX: 54,
        /** Key constant @type Number */
        SEVEN: 55,
        /** Key constant @type Number */
        EIGHT: 56,
        /** Key constant @type Number */
        NINE: 57,
        /** Key constant @type Number */
        A: 65,
        /** Key constant @type Number */
        B: 66,
        /** Key constant @type Number */
        C: 67,
        /** Key constant @type Number */
        D: 68,
        /** Key constant @type Number */
        E: 69,
        /** Key constant @type Number */
        F: 70,
        /** Key constant @type Number */
        G: 71,
        /** Key constant @type Number */
        H: 72,
        /** Key constant @type Number */
        I: 73,
        /** Key constant @type Number */
        J: 74,
        /** Key constant @type Number */
        K: 75,
        /** Key constant @type Number */
        L: 76,
        /** Key constant @type Number */
        M: 77,
        /** Key constant @type Number */
        N: 78,
        /** Key constant @type Number */
        O: 79,
        /** Key constant @type Number */
        P: 80,
        /** Key constant @type Number */
        Q: 81,
        /** Key constant @type Number */
        R: 82,
        /** Key constant @type Number */
        S: 83,
        /** Key constant @type Number */
        T: 84,
        /** Key constant @type Number */
        U: 85,
        /** Key constant @type Number */
        V: 86,
        /** Key constant @type Number */
        W: 87,
        /** Key constant @type Number */
        X: 88,
        /** Key constant @type Number */
        Y: 89,
        /** Key constant @type Number */
        Z: 90,
        /** Key constant @type Number */
        CONTEXT_MENU: 93,
        /** Key constant @type Number */
        NUM_ZERO: 96,
        /** Key constant @type Number */
        NUM_ONE: 97,
        /** Key constant @type Number */
        NUM_TWO: 98,
        /** Key constant @type Number */
        NUM_THREE: 99,
        /** Key constant @type Number */
        NUM_FOUR: 100,
        /** Key constant @type Number */
        NUM_FIVE: 101,
        /** Key constant @type Number */
        NUM_SIX: 102,
        /** Key constant @type Number */
        NUM_SEVEN: 103,
        /** Key constant @type Number */
        NUM_EIGHT: 104,
        /** Key constant @type Number */
        NUM_NINE: 105,
        /** Key constant @type Number */
        NUM_MULTIPLY: 106,
        /** Key constant @type Number */
        NUM_PLUS: 107,
        /** Key constant @type Number */
        NUM_MINUS: 109,
        /** Key constant @type Number */
        NUM_PERIOD: 110,
        /** Key constant @type Number */
        NUM_DIVISION: 111,
        /** Key constant @type Number */
        F1: 112,
        /** Key constant @type Number */
        F2: 113,
        /** Key constant @type Number */
        F3: 114,
        /** Key constant @type Number */
        F4: 115,
        /** Key constant @type Number */
        F5: 116,
        /** Key constant @type Number */
        F6: 117,
        /** Key constant @type Number */
        F7: 118,
        /** Key constant @type Number */
        F8: 119,
        /** Key constant @type Number */
        F9: 120,
        /** Key constant @type Number */
        F10: 121,
        /** Key constant @type Number */
        F11: 122,
        /** Key constant @type Number */
        F12: 123,

        /**
         * The mouse wheel delta scaling factor. This value depends on browser version and OS and
         * attempts to produce a similar scrolling experience across all platforms and browsers.
         *
         * To change this value:
         *
         *      Ext.event.Event.prototype.WHEEL_SCALE = 72;
         *
         * @type Number
         * @property
         */
        WHEEL_SCALE: (function () {
            var scale;

            if (Ext.isGecko) {
                // Firefox uses 3 on all platforms
                scale = 3;
            } else if (Ext.isMac) {
                // Continuous scrolling devices have momentum and produce much more scroll than
                // discrete devices on the same OS and browser. To make things exciting, Safari
                // (and not Chrome) changed from small values to 120 (like IE).

                if (Ext.isSafari && Ext.webKitVersion >= 532.0) {
                    // Safari changed the scrolling factor to match IE (for details see
                    // https://bugs.webkit.org/show_bug.cgi?id=24368). The WebKit version where this
                    // change was introduced was 532.0
                    //      Detailed discussion:
                    //      https://bugs.webkit.org/show_bug.cgi?id=29601
                    //      http://trac.webkit.org/browser/trunk/WebKit/chromium/src/mac/WebInputEventFactory.mm#L1063
                    scale = 120;
                } else {
                    // MS optical wheel mouse produces multiples of 12 which is close enough
                    // to help tame the speed of the continuous mice...
                    scale = 12;
                }

                // Momentum scrolling produces very fast scrolling, so increase the scale factor
                // to help produce similar results cross platform. This could be even larger and
                // it would help those mice, but other mice would become almost unusable as a
                // result (since we cannot tell which device type is in use).
                scale *= 3;
            } else {
                // IE, Opera and other Windows browsers use 120.
                scale = 120;
            }

            return scale;
        }())
    };

    Ext.apply(Event, constants);
    Ext.apply(Event.prototype, constants);
});
