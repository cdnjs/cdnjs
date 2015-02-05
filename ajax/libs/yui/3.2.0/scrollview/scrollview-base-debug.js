YUI.add('scrollview-base', function(Y) {

/**
 * The scrollview-base module provides a basic ScrollView Widget, without scrollbar indicators
 *
 * @module scrollview-base
 */

var getClassName = Y.ClassNameManager.getClassName,
    SCROLLVIEW = 'scrollview',
    CLASS_NAMES = {
        vertical: getClassName(SCROLLVIEW, 'vert'),
        horizontal: getClassName(SCROLLVIEW, 'horiz')
    },
    EV_SCROLL_END = 'scrollEnd',
    EV_SCROLL_FLICK = 'flick',

    FLICK = EV_SCROLL_FLICK,

    UI = 'ui',
    
    LEFT = "left",
    TOP = "top",
    
    PX = "px",

    SCROLL_Y = "scrollY",
    SCROLL_X = "scrollX",
    BOUNCE = "bounce",
    
    DIM_X = "x",
    DIM_Y = "y",

    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",
    
    EMPTY = "",
    ZERO = "0s",
    
    OWNER_DOC = "ownerDocument",
    MOUSE_UP = "mouseup",

    IE = Y.UA.ie,

    NATIVE_TRANSITIONS = Y.Transition.useNative;

Y.Node.DOM_EVENTS.DOMSubtreeModified = true;

/**
 * ScrollView provides a scrollable widget, supporting flick gestures, across both touch and mouse based devices. 
 *
 * @class ScrollView
 * @namespace 
 * @param config {Object} Object literal with initial attribute values
 * @extends Widget
 * @constructor
 */
function ScrollView() {
    ScrollView.superclass.constructor.apply(this, arguments);
}

Y.ScrollView = Y.extend(ScrollView, Y.Widget, {
    
    // Y.ScrollView prototype
    
    /**
     * Designated initializer
     *
     * @method initializer
     */
    initializer: function() {
        this._createEvents();

        // Cache - they're write once, and not going to change
        this._cb = this.get(CONTENT_BOX);
        this._bb = this.get(BOUNDING_BOX);
    },

    /** 
     * Publishes events which occur during the scroll lifecycle
     *
     * @method _createEvents
     * @private
     */    
    _createEvents: function() {
        /**
         * Notification event fired at the end of a scroll transition
         * 
         * @event scrollEnd
         * @param e {EventFacade} The default event facade.
         */
        this.publish(EV_SCROLL_END);

        /**
         * Notification event fired at the end of a flick gesture (the flick animation may still be in progress)
         * 
         * @event flick
         * @param e {EventFacade} The default event facade.
         */
        this.publish(EV_SCROLL_FLICK);
    },

    /** 
     * Override the contentBox sizing method, since the contentBox height
     * should not be that of the boundingBox.
     *
     * @method _uiSizeCB
     * @protected
     */
    _uiSizeCB: function() {},

    /**
     * Content box transition callback
     *
     * @method _transitionEnded
     * @param {Event.Facade} e The event facade
     * @private
     */
    _transitionEnded: function(e) {
        this.fire(EV_SCROLL_END);
    },

    /**
     * bindUI implementation
     *
     * Hooks up events for the widget
     * @method bindUI
     */
    bindUI: function() {

        var cb = this._cb,
            bb = this._bb,
            flick = this.get(FLICK); 

        bb.on('gesturemovestart', Y.bind(this._onGestureMoveStart, this));

        // IE SELECT HACK. See if we can do this non-natively and in the gesture for a future release.
        if (IE) {
            this._nativeBody = Y.Node.getDOMNode(Y.one("body", cb.get("ownerDocument")));
            this._cbDoc = cb.get(OWNER_DOC);

            cb.on("mousedown", function() {
                this._selectstart = this._nativeBody.onselectstart;
                this._nativeBody.onselectstart = this._iePreventSelect;
                this._cbDoc.once(MOUSE_UP, this._ieRestoreSelect, this);
            }, this);
        }

        // TODO: Fires way to often when using non-native transitions, due to property change
        if (NATIVE_TRANSITIONS) {
            cb.on('DOMSubtreeModified', Y.bind(this._uiDimensionsChange, this));
        }

        if (flick) {
            cb.on("flick", Y.bind(this._flick, this), flick);
        }

        this.after({
            'scrollYChange' : this._afterScrollYChange,
            'scrollXChange' : this._afterScrollXChange,
            'heightChange'  : this._afterHeightChange,
            'widthChange'   : this._afterWidthChange,
            'renderedChange': function() { Y.later(0, this, '_uiDimensionsChange'); } 
        });
    },
    
    /**
     * syncUI implementation
     *
     * Update the scroll position, based on the current value of scrollY
     * @method bindUI
     */
    syncUI: function() {
        this.scrollTo(this.get(SCROLL_X), this.get(SCROLL_Y));
    },

    /**
     * Scroll the element to a given y coordinate
     *
     * @method scrollTo
     * @param x {Number} The x-position to scroll to
     * @param y {Number} The y-position to scroll to
     * @param duration {Number} Duration, in ms, of the scroll animation (default is 0)
     * @param easing {String} An easing equation if duration is set
     */
    scrollTo: function(x, y, duration, easing) {

        var cb = this._cb,
            xSet = (x !== null),
            ySet = (y !== null),
            xMove = (xSet) ? x * -1 : 0,
            yMove = (ySet) ? y * -1 : 0,
            transition,
            callback = this._transEndCallback;

        duration = duration || 0;
        easing = easing || ScrollView.EASING;

        if (xSet) {
            this.set(SCROLL_X, x, { src: UI });
        }

        if (ySet) {
            this.set(SCROLL_Y, y, { src: UI });
        }

        if (NATIVE_TRANSITIONS) {
            // ANDROID WORKAROUND - try and stop existing transition, before kicking off new one.
            cb.setStyle(ScrollView._TRANSITION_DURATION, ZERO);
            cb.setStyle(ScrollView._TRANSITION_PROPERTY, EMPTY);

            // Causes bounce back from 0,0 instead of current translation for bottom/right edge animation
            // cb.setStyle("WebkitTransform", cb.getComputedStyle("WebkitTransform"));
        }

        if (duration !== 0) {

            transition = {
                easing : easing,
                duration : duration/1000
            };

            if (NATIVE_TRANSITIONS) {
                transition.transform = 'translate3D('+ xMove +'px,'+ yMove +'px, 0px)';
            } else {
                if (xSet) { transition.left = xMove + PX; }
                if (ySet) { transition.top = yMove + PX; }
            }

            Y.log("Transition: duration, easing:" + [transition.duration, transition.easing], "scrollview");

            if (!callback) {
                callback = this._transEndCallback = Y.bind(this._transitionEnded, this);
            }

            cb.transition(transition, callback);

        } else {
            if (NATIVE_TRANSITIONS) {
                cb.setStyle('transform', 'translate3D('+ xMove +'px,'+ yMove +'px, 0px)');
            } else {
                if (xSet) { cb.setStyle(LEFT, xMove + PX); }
                if (ySet) { cb.setStyle(TOP, yMove + PX); }
            }
        }
    },

    /**
     * Native onselectstart handle to prevent selection in IE
     *
     * @method _iePreventSelect
     * @private
     */
    _iePreventSelect : function() {
        return false;
    },

    /**
     * Restores native onselectstart handle, backed up to prevent selection in IE
     *
     * @method _ieRestoreSelect
     * @private
     */
    _ieRestoreSelect : function() {
        this._nativeBody.onselectstart = this._selectstart;
    },

    _preventStart : false,

    _preventMove : true,
    
    _preventEnd : true,

    /**
     * gesturemovestart event handler
     *
     * @method _onGestureMoveStart
     * @param e {Event.Facade} The gesturemovestart event facade
     * @private
     */
    _onGestureMoveStart: function(e) {

        var bb = this._bb;

        if (this._preventStart) {
            e.preventDefault();
        }

        this._killTimer();

        this._moveEvt = bb.on('gesturemove', Y.bind(this._onGestureMove, this));
        this._moveEndEvt = bb.on('gesturemoveend', Y.bind(this._onGestureMoveEnd, this));

        this._moveStartY = e.clientY + this.get(SCROLL_Y);
        this._moveStartX = e.clientX + this.get(SCROLL_X);

        this._moveStartTime = (new Date()).getTime();
        this._moveStartClientY = this._moveEndClientY = e.clientY;
        this._moveStartClientX = this._moveEndClientX = e.clientX;

        /**
         * Internal state, defines whether or not the scrollview is currently being dragged
         * 
         * @property _isDragging
         * @type boolean
         * @protected
         */
        this._isDragging = false;
        
        /**
         * Internal state, defines whether or not the scrollview is currently animating a flick
         * 
         * @property _flicking
         * @type boolean
         * @protected
         */
        this._flicking = false;
        
        /**
         * Internal state, defines whether or not the scrollview needs to snap to a boundary edge
         * 
         * @property _snapToEdge
         * @type boolean
         * @protected
         */
        this._snapToEdge = false;
    },    
    
    /**
     * gesturemove event handler
     *
     * @method _onGestureMove
     * @param e {Event.Facade} The gesturemove event facade
     * @private
     */
    _onGestureMove: function(e) {

        if (this._preventMove) {
            e.preventDefault();
        }

        this._isDragging = true;
        this._moveEndClientY = e.clientY;
        this._moveEndClientX = e.clientX;
        this._lastMoved = (new Date()).getTime();

        if(this._scrollsVertical) {
            this.set(SCROLL_Y, -(e.clientY - this._moveStartY));
        }

        if(this._scrollsHorizontal) {
            this.set(SCROLL_X, -(e.clientX - this._moveStartX));
        }
    },

    /**
     * gestureend event handler
     *
     * @method _onGestureMoveEnd
     * @param e {Event.Facade} The gesturemoveend event facade
     * @private
     */
    _onGestureMoveEnd: function(e) {

        if (this._preventEnd) {
            e.preventDefault();
        }

        var minY = this._minScrollY,
            maxY = this._maxScrollY,
            minX = this._minScrollX,
            maxX = this._maxScrollX,
            startPoint = this._scrollsVertical ? this._moveStartClientY : this._moveStartClientX,
            endPoint = this._scrollsVertical ? this._moveEndClientY : this._moveEndClientX,
            distance = startPoint - endPoint;

        this._moveEvt.detach();
        this._moveEndEvt.detach();
        
        /**
         * Internal state, defines whether or not the scrollview has been scrolled half it's width/height
         * 
         * @property _scrolledHalfway
         * @type boolean
         * @protected
         */
        this._scrolledHalfway = false;
        this._snapToEdge = false;
        this._isDragging = false;

        /**
         * Contains the distance (postive or negative) in pixels by which the scrollview was last scrolled. This is useful when
         * setting up click listeners on the scrollview content, which on mouse based devices are always fired, even after a
         * drag/flick. 
         * 
         * <p>Touch based devices don't currently fire a click event, if the finger has been moved (beyond a threshold) so this check isn't required,
         * if working in a purely touch based environment</p>
         * 
         * @property lastScrolledAmt
         * @type Number
         * @public
         */
        this.lastScrolledAmt = distance;

        if(this._scrollsHorizontal && Math.abs(distance) > (this.get('width')/2)) {
            this._scrolledHalfway = true;
            
            /**
             * Internal state, defines whether or not the scrollview has been scrolled in the forward (distance > 0), or backward (distance < 0) direction
             * 
             * @property _scrolledForward
             * @type boolean
             * @protected
             */
            this._scrolledForward = distance > 0;
        }

        if(this._scrollsVertical && Math.abs(distance) > (this.get('height')/2)) {
            this._scrolledHalfway = true;
            this._scrolledForward = distance > 0;
        }

        // Check for minY
        if(this._scrollsVertical && this.get(SCROLL_Y) < minY) {
            this._snapToEdge = true;
            this.set(SCROLL_Y, minY);
        }
        
        // Check for minX
        if(this._scrollsHorizontal && this.get(SCROLL_X) < minX) {
            this._snapToEdge = true;
            this.set(SCROLL_X, minX);
        }
        
        // Check for maxY
        if(this.get(SCROLL_Y) > maxY) {
            this._snapToEdge = true;
            this.set(SCROLL_Y, maxY);
        }
        
        // Check for maxX
        if(this.get(SCROLL_X) > maxX) {
            this._snapToEdge = true;
            this.set(SCROLL_X, maxX);
        }

        Y.log("half:" + this._scrolledHalfway + ", fwd:"  + this._scrolledForward, "scrollview");

        if(this._snapToEdge) {
            return;
        }

        this.fire(EV_SCROLL_END, {
            onGestureMoveEnd: true
        });

        return;
    },

    /**
     * After listener for changes to the scrollY attribute
     *
     * @method _afterScrollYChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterScrollYChange : function(e) {
        if(e.src !== UI) {
            this._uiScrollY(e.newVal, e.duration, e.easing);
        }
    },

    /**
     * Update the UI when the scrollY attribute changes
     *
     * @method _uiScrollY
     * @param val {Number} The scrollY value
     * @param duration {Number} The length (in ms) of the scroll animation
     * @param easing {String} An easing equation, if duration is defined
     * @protected
     */
    _uiScrollY : function(val, duration, easing) {
        duration = duration || this._snapToEdge ? 400 : 0;
        easing = easing || this._snapToEdge ? ScrollView.SNAP_EASING : null;

        this.scrollTo(null, val, duration, easing);
    },

    /**
     * After listener for changes to the scrollX attribute
     *
     * @method _afterScrollXChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterScrollXChange : function(e) {
        if(e.src !== UI) {
            this._uiScrollX(e.newVal, e.duration, e.easing);
        }
    },

    /**
     * Update the UI when the scrollX attribute changes
     *
     * @method _uiScrollX
     * @param val {Number} The scrollX value
     * @param duration {Number} The length (in ms) of the scroll animation
     * @param easing {String} An easing equation, if duration is defined
     * @protected
     */
    _uiScrollX : function(val, duration, easing) {
        duration = duration || this._snapToEdge ? 400 : 0;
        easing = easing || this._snapToEdge ? ScrollView.SNAP_EASING : null;

        this.scrollTo(val, null, duration, easing);
    },
    
    /**
     * After listener for the height attribute
     *
     * @method _afterHeightChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterHeightChange: function() {
        this._uiDimensionsChange();
    },
    
    /**
     * After listener for the width attribute
     *
     * @method _afterWidthChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterWidthChange: function() {
        this._uiDimensionsChange();
    },
    
    /**
     * This method gets invoked whenever the height or width attributes change,
     * allowing us to determine which scrolling axes need to be enabled.
     *
     * @method _uiDimensionsChange
     * @protected
     */
    _uiDimensionsChange: function() {
        var bb = this._bb,

            height = this.get('height'),
            width = this.get('width'),

            // Use bb instead of cb. cb doesn't gives us the right results
            // in FF (due to overflow:hidden)
            scrollHeight = bb.get('scrollHeight'),
            scrollWidth = bb.get('scrollWidth');

        if(height && scrollHeight > height) {            
            this._scrollsVertical = true;
            this._maxScrollY = scrollHeight - height;
            this._minScrollY = 0;
            this._scrollHeight = scrollHeight;
            bb.addClass(ScrollView.CLASS_NAMES.vertical);
        }

        if(width && scrollWidth > width) {
            this._scrollsHorizontal = true;
            this._maxScrollX = scrollWidth - width;
            this._minScrollX = 0;
            this._scrollWidth = scrollWidth;
            bb.addClass(ScrollView.CLASS_NAMES.horizontal);
        }
        
        /**
         * Internal state, defines whether or not the scrollview can scroll vertically 
         * 
         * @property _scrollsVertical
         * @type boolean
         * @protected
         */
        
        /**
         * Internal state, defines the maximum amount that the scrollview can be scrolled along the Y axis 
         * 
         * @property _maxScrollY
         * @type number
         * @protected
         */

        /**
         * Internal state, defines the minimum amount that the scrollview can be scrolled along the Y axis 
         * 
         * @property _minScrollY
         * @type number
         * @protected
         */

        /**
         * Internal state, cached scrollHeight, for performance 
         * 
         * @property _scrollHeight
         * @type number
         * @protected
         */

        /**
         * Internal state, defines whether or not the scrollview can scroll horizontally 
         * 
         * @property _scrollsHorizontal
         * @type boolean
         * @protected
         */
        
        /**
         * Internal state, defines the maximum amount that the scrollview can be scrolled along the X axis 
         * 
         * @property _maxScrollX
         * @type number
         * @protected
         */

        /**
         * Internal state, defines the minimum amount that the scrollview can be scrolled along the X axis 
         * 
         * @property _minScrollX
         * @type number
         * @protected
         */

        /**
         * Internal state, cached scrollWidth, for performance 
         * 
         * @property _scrollWidth
         * @type number
         * @protected
         */
    },

    /**
     * Execute a flick at the end of a scroll action
     *
     * @method _flick
     * @param distance {Number} The distance (in px) the user scrolled before the flick
     * @param time {Number} The number of ms the scroll event lasted before the flick
     * @protected
     */
    _flick: function(e) {
        var flick = e.flick;

        /**
         * Internal state, currently calculated velocity from the flick 
         * 
         * @property _currentVelocity
         * @type number
         * @protected
         */
        this._currentVelocity = flick.velocity;
        this._flicking = true;

        this._decelCached = this.get('deceleration');
        this._bounceCached = this.get('bounce');

        this._pastYEdge = false;
        this._pastXEdge = false;

        this._flickFrame();

        this.fire(EV_SCROLL_FLICK);
    },

    /**
     * Execute a single frame in the flick animation
     *
     * @method _flickFrame
     * @protected
     */
    _flickFrame: function() {
        var newY,
            maxY,
            minY,
            newX,
            maxX,
            minX,
            scrollsVertical  = this._scrollsVertical,
            scrollsHorizontal = this._scrollsHorizontal,
            deceleration = this._decelCached,
            bounce = this._bounceCached,
            step = ScrollView.FRAME_STEP;

        if(scrollsVertical) {
            maxY = this._maxScrollY;
            minY = this._minScrollY;
            newY = this.get(SCROLL_Y) - (this._currentVelocity * step);
        }

        if(scrollsHorizontal) {
            maxX = this._maxScrollX;
            minX = this._minScrollX;
            newX = this.get(SCROLL_X) - (this._currentVelocity * step);
        }
        
        this._currentVelocity = (this._currentVelocity * deceleration);

        if(Math.abs(this._currentVelocity).toFixed(4) <= 0.015) {
            this._flicking = false;
            this._killTimer(!(this._pastYEdge || this._pastXEdge));

            if(scrollsVertical) {
                if(newY < minY) {
                    this._snapToEdge = true;
                    this.set(SCROLL_Y, minY);
                } else if(newY > maxY) {
                    this._snapToEdge = true;
                    this.set(SCROLL_Y, maxY);
                }
            }
            
            if(scrollsHorizontal) {
                if(newX < minX) {
                    this._snapToEdge = true;
                    this.set(SCROLL_X, minX);
                } else if(newX > maxX) {
                    this._snapToEdge = true;
                    this.set(SCROLL_X, maxX);
                }
            }

            return;
        }

        if (scrollsVertical) {
            if (newY < minY || newY > maxY) {
                this._pastYEdge = true;
                this._currentVelocity *= bounce;
            }

            this.set(SCROLL_Y, newY);
        }

        if (scrollsHorizontal) {
            if (newX < minX || newX > maxX) {
                this._pastXEdge = true;
                this._currentVelocity *= bounce;
            }

            this.set(SCROLL_X, newX);
        }

        if (!this._flickTimer) {
            this._flickTimer = Y.later(step, this, '_flickFrame', null, true);
        }
    },

    /**
     * Stop the animation timer
     *
     * @method _killTimer
     * @param fireEvent {Boolean} If true, fire the scrollEnd event
     * @protected
     */
    _killTimer: function(fireEvent) {
        if(this._flickTimer) {
            this._flickTimer.cancel();
            this._flickTimer = null;
        }

        if(fireEvent) {
            this.fire(EV_SCROLL_END);
        }
    },

    /**
     * The scrollX, scrollY setter implementation
     * 
     * @method _setScroll
     * @private
     * @param {Number} val
     * @param {String} dim
     * 
     * @return {Number} The constrained value, if it exceeds min/max range
     */
    _setScroll : function(val, dim) {
        var bouncing = this._cachedBounce || this.get(BOUNCE),
            range = ScrollView.BOUNCE_RANGE,

            maxScroll = (dim == DIM_X) ? this._maxScrollX : this._maxScrollY,

            min = bouncing ? -range : 0,
            max = bouncing ? maxScroll + range : maxScroll;

        if(!bouncing || !this._isDragging) {
            if(val < min) {
                val = min;
            } else if(val > max) {
                val = max;
            }            
        }

        return val;
    },

    /**
     * Setter for the scrollX attribute
     *
     * @method _setScrollX
     * @param val {Number} The new scrollX value
     * @return {Number} The normalized value
     * @protected
     */    
    _setScrollX: function(val) {
        return this._setScroll(val, DIM_X);
    },

    /**
     * Setter for the scrollY ATTR
     *
     * @method _setScrollY
     * @param val {Number} The new scrollY value
     * @return {Number} The normalized value 
     * @protected
     */
    _setScrollY: function(val) {
        return this._setScroll(val, DIM_Y);
    }
    
}, {
   
   // Y.ScrollView static properties

   /**
    * The identity of the widget.
    *
    * @property ScrollView.NAME
    * @type String
    * @default 'scrollview'
    * @readOnly
    * @protected
    * @static
    */
   NAME: 'scrollview',

   /**
    * Static property used to define the default attribute configuration of
    * the Widget.
    *
    * @property ScrollView.ATTRS
    * @type {Object}
    * @protected
    * @static
    */
    ATTRS: {

        /**
         * The scroll position in the y-axis
         *
         * @attribute scrollY
         * @type Number
         * @default 0
         */
        scrollY: {
            value: 0,
            setter: '_setScrollY'
        },

        /**
         * The scroll position in the x-axis
         *
         * @attribute scrollX
         * @type Number
         * @default 0
         */
        scrollX: {
            value: 0,
            setter: '_setScrollX'
        },

        /**
         * Drag coefficent for inertial scrolling. The closer to 1 this
         * value is, the less friction during scrolling.
         *
         * @attribute deceleration
         * @default 0.93
         */
        deceleration: {
            value: 0.93
        },

        /**
         * Drag coefficient for intertial scrolling at the upper
         * and lower boundaries of the scrollview. Set to 0 to 
         * disable "rubber-banding".
         *
         * @attribute bounce
         * @type Number
         * @default 0.1
         */
        bounce: {
            value: 0.1
        },

        /**
         * The minimum distance and/or velocity which define a flick
         *
         * @attribute flick
         * @type Object
         * @default Object with properties minDistance = 10, minVelocity = 0.3.
         */
        flick: {
            value: {
                minDistance: 10,
                minVelocity: 0.3
            }
        }
    },

    /**
     * List of class names used in the scrollview's DOM
     *
     * @property ScrollView.CLASS_NAMES
     * @type Object
     * @static
     */
    CLASS_NAMES: CLASS_NAMES,

    /**
     * Flag used to source property changes initiated from the DOM
     *
     * @property ScrollView.UI_SRC
     * @type String
     * @static
     * @default "ui"
     */
    UI_SRC: UI,

    /**
     * The default bounce distance in pixels
     *
     * @property ScrollView.BOUNCE_RANGE
     * @type Number
     * @static
     * @default 150
     */
    BOUNCE_RANGE : 150,

    /**
     * The interval used when animating the flick
     *
     * @property ScrollView.FRAME_STEP
     * @type Number
     * @static
     * @default 30
     */
    FRAME_STEP : 30,

    /**
     * The default easing used when animating the flick
     *
     * @property ScrollView.EASING
     * @type String
     * @static
     * @default 'cubic-bezier(0, 0.1, 0, 1.0)'
     */
    EASING : 'cubic-bezier(0, 0.1, 0, 1.0)',

    /**
     * The default easing to use when animatiing the bounce snap back.
     *
     * @property ScrollView.SNAP_EASING
     * @type String
     * @static
     * @default 'ease-out'
     */
    SNAP_EASING : 'ease-out',

    /**
     * Style property name to use to set transition duration. Currently Webkit specific (WebkitTransitionDuration)
     * 
     * @property ScrollView._TRANSITION_DURATION
     * @private
     */
    _TRANSITION_DURATION : "WebkitTransitionDuration",

    /**
     * Style property name to use to set transition property. Currently, Webkit specific (WebkitTransitionProperty)
     *
     * @property ScrollView._TRANSITION_PROPERTY
     * @private
     */
    _TRANSITION_PROPERTY : "WebkitTransitionProperty"
});


}, '@VERSION@' ,{skinnable:true, requires:['widget', 'event-gestures', 'transition']});
