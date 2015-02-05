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
    DRAG = "drag",
    
    MOUSEWHEEL_ENABLED = true,

    UI = 'ui',
    
    LEFT = "left",
    TOP = "top",
    
    PX = "px",

    SCROLL_Y = "scrollY",
    SCROLL_X = "scrollX",
    BOUNCE = "bounce",
    DISABLED = "disabled",

    DIM_X = "x",
    DIM_Y = "y",

    BOUNDING_BOX = "boundingBox",
    CONTENT_BOX = "contentBox",

    EMPTY = "",
    ZERO = "0s",

    IE = Y.UA.ie,
    
    Transition = Y.Transition,

    NATIVE_TRANSITIONS = Transition.useNative,

    _constrain = function (val, min, max) { 
        return Math.min(Math.max(val, min), max);
    };

/**
 * ScrollView provides a scrollable widget, supporting flick gestures, across both touch and mouse based devices. 
 *
 * @class ScrollView
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
        /**
         * Notification event fired at the end of a scroll transition
         * 
         * @event scrollEnd
         * @param e {EventFacade} The default event facade.
         */

        /**
         * Notification event fired at the end of a flick gesture (the flick animation may still be in progress)
         * 
         * @event flick
         * @param e {EventFacade} The default event facade.
         */
        var sv = this;
        
        // Cache - they're write once, and not going to change
        sv._cb = sv.get(CONTENT_BOX);
        sv._bb = sv.get(BOUNDING_BOX);
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
     * @method _onTransEnd
     * @param {Event.Facade} e The event facade
     * @private
     */
    _onTransEnd: function(e) {
        this.fire(EV_SCROLL_END);
    },

    /**
     * bindUI implementation
     *
     * Hooks up events for the widget
     * @method bindUI
     */
    bindUI: function() {
        var sv = this;

        sv._bindDrag(sv.get(DRAG));
        sv._bindFlick(sv.get(FLICK));
        // Note: You can find _bindMousewheel() inside syncUI(), becuase it depends on UI details

        sv._bindAttrs();

        // IE SELECT HACK. See if we can do this non-natively and in the gesture for a future release.
        if (IE) {
            sv._fixIESelect(sv._bb, sv._cb);
        }
    },

    /**
     * @method _bindAttrs
     * @private 
     */
    _bindAttrs : function() {

        var sv = this,
            scrollChangeHandler = sv._afterScrollChange,
            dimChangeHandler = sv._afterDimChange;

        this.after({
            'disabledChange': sv._afterDisabledChange,
            'flickChange'   : sv._afterFlickChange,
            'dragChange'    : sv._afterDragChange,
            'scrollYChange' : scrollChangeHandler,
            'scrollXChange' : scrollChangeHandler,
            'heightChange'  : dimChangeHandler,
            'widthChange'   : dimChangeHandler
        });

        // Helps avoid potential CSS race where in the styles from
        // scrollview-list-skin.css are applied after syncUI() fires.
        // Without a _uiDimensionChange() call, the scrollview only 
        // scrolls partially due to the fact that styles added in the CSS
        // altered the height/width of the bounding box.
        // TODO: Remove?
        if (!IE) {
            this.after('renderedChange', function(e) {
                //this._uiDimensionsChange();
            });
        }
    },

    /**
     * Bind (or unbind) gesture move listeners required for drag support
     * 
     * @method _bindDrag
     * @param drag {boolean} If true, the method binds listener to enable drag (gesturemovestart). If false, the method unbinds gesturemove listeners for drag support.
     * @private 
     */
    _bindDrag : function(drag) {
        var bb = this._bb;

        if (drag) {
            bb.on('drag|gesturemovestart', Y.bind(this._onGestureMoveStart, this));
        } else {
            bb.detach('drag|*');
        }
    },

    /**
     * Bind (or unbind) flick listeners.
     * 
     * @method _bindFlick
     * @param flick {Object|boolean} If truthy, the method binds listeners for flick support. If false, the method unbinds flick listeners.  
     * @private
     */
    _bindFlick : function(flick) {
        var cb = this._cb;

        if (flick) {
            cb.on("flick|flick", Y.bind(this._flick, this), flick);
        } else {
            cb.detach('flick|*');
        }
    },
    
    /**
     * Bind (or unbind) mousewheel listeners.
     * 
     * @method _bindMousewheel
     * @param mousewheel {Object|boolean} If truthy, the method binds listeners for mousewheel support. If false, the method unbinds mousewheel listeners.  
     * @private
     */
    _bindMousewheel : function(mousewheel) {
        var cb = this._cb;
        
        // Only enable for vertical scrollviews
        if (this._scrollsVertical) {
            if (mousewheel) {
                cb.on("mousewheel", Y.bind(this._mousewheel, this), mousewheel);
            } else {
                cb.detach('mousewheel|*');
            }
        }
    },

    /**
     * syncUI implementation.
     *
     * Update the scroll position, based on the current value of scrollX/scrollY.
     *
     * @method syncUI
     */
    syncUI: function() {
        this._cDisabled = this.get(DISABLED);
        this._uiDimensionsChange();
        this._bindMousewheel(MOUSEWHEEL_ENABLED);
        this.scrollTo(this.get(SCROLL_X), this.get(SCROLL_Y));
    },

    /**
     * Scroll the element to a given xy coordinate
     *
     * @method scrollTo
     * @param x {Number} The x-position to scroll to
     * @param y {Number} The y-position to scroll to
     * @param duration {Number} Duration, in ms, of the scroll animation (default is 0)
     * @param easing {String} An easing equation if duration is set
     */
    scrollTo: function(x, y, duration, easing) {
        
        // TODO: Figure out a better way to detect mousewheel events
        if (easing === undefined) {
            if ( y < this._minScrollY) {
                y = this._minScrollY;
            }
            else if ( y > this._maxScrollY) {
                y = this._maxScrollY;
            }
        }
        
        if (!this._cDisabled) {
            var cb = this._cb,
                xSet = (x !== null),
                ySet = (y !== null),
                xMove = (xSet) ? x * -1 : 0,
                yMove = (ySet) ? y * -1 : 0,
                transition,
                TRANS = ScrollView._TRANSITION,
                callback = this._transEndCB;
    
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
                cb.setStyle(TRANS.DURATION, ZERO).setStyle(TRANS.PROPERTY, EMPTY);
            }
    
            if (duration !== 0) {
    
                transition = {
                    easing : easing,
                    duration : duration/1000
                };
    
                if (NATIVE_TRANSITIONS) {
                    transition.transform = this._transform(xMove, yMove);
                } else {
                    if (xSet) { transition.left = xMove + PX; }
                    if (ySet) { transition.top = yMove + PX; }
                }
    
    
                if (!callback) {
                    callback = this._transEndCB = Y.bind(this._onTransEnd, this);
                }
    
                cb.transition(transition, callback);
    
            } else {
                if (NATIVE_TRANSITIONS) {
                    cb.setStyle('transform', this._transform(xMove, yMove));
                } else {
                    if (xSet) { cb.setStyle(LEFT, xMove + PX); }
                    if (ySet) { cb.setStyle(TOP, yMove + PX); }
                }
            }
        }
    },

    /**
     * Utility method, to create the translate transform string with the
     * x, y translation amounts provided.
     *
     * @method _transform
     * @param {Number} x Number of pixels to translate along the x axis
     * @param {Number} y Number of pixels to translate along the y axis
     * @private
     */
    _transform : function(x, y) {
        // TODO: Would we be better off using a Matrix for this?
        return (this._forceHWTransforms) ? 'translate('+ x +'px,'+ y +'px) translateZ(0px)' : 'translate('+ x +'px,'+ y +'px)';
    },

    /**
     * Utility method, to move the given element to the given xy position
     *
     * @method _moveTo
     * @param node {Node} The node to move
     * @param x {Number} The x-position to move to
     * @param y {Number} The y-position to move to
     * @private
     */
    _moveTo : function(node, x, y) {
        if (NATIVE_TRANSITIONS) {
            node.setStyle('transform', this._transform(x, y));
        } else {
            node.setStyle(LEFT, x + PX);
            node.setStyle(TOP, y + PX);
        }
    },

    /**
     * Flag driving whether or not we should try and force H/W acceleration when transforming. Currently enabled by default for Webkit.
     * Used by the _transform method.
     *
     * @property _forceHWTransforms
     * @type boolean
     * @protected
     */
    _forceHWTransforms: Y.UA.webkit ? true : false,

    /**
     * <p>Used to control whether or not ScrollView's internal
     * gesturemovestart, gesturemove and gesturemoveend
     * event listeners should preventDefault. The value is an
     * object, with "start", "move" and "end" properties used to 
     * specify which events should preventDefault and which shouldn't:</p>
     *
     * <pre>
     * {
     *    start : false,
     *    move : true,
     *    end : false
     * }
     * </pre>
     *
     * <p>The default values are set up in order to prevent panning,
     * on touch devices, while allowing click listeners on elements inside 
     * the ScrollView to be notified as expected.</p> 
     *
     * @property _prevent
     * @type Object
     * @protected
     */
    _prevent : {
        start : false,
        move : true,
        end : false
    },

    /**
     * gesturemovestart event handler
     *
     * @method _onGestureMoveStart
     * @param e {Event.Facade} The gesturemovestart event facade
     * @private
     */
    _onGestureMoveStart: function(e) {
        
        var sv = this,
            bb = sv._bb;

        if (!sv._cDisabled) {

            if (sv._prevent.start) {
                e.preventDefault();
            }
    
            sv._killTimer();
    
            sv._hm = bb.on('drag|gesturemove', Y.bind(sv._onGestureMove, sv));
            sv._hme = bb.on('drag|gesturemoveend', Y.bind(sv._onGestureMoveEnd, sv));
    
            sv._startY = e.clientY + sv.get(SCROLL_Y);
            sv._startX = e.clientX + sv.get(SCROLL_X);
            sv._startClientY = sv._endClientY = e.clientY;
            sv._startClientX = sv._endClientX = e.clientX;
    
            /**
             * Internal state, defines whether or not the scrollview is currently being dragged
             * 
             * @property _isDragging
             * @type boolean
             * @protected
             */
            sv._isDragging = false;
    
            /**
             * Internal state, defines whether or not the scrollview is currently animating a flick
             * 
             * @property _flicking
             * @type boolean
             * @protected
             */
            sv._flicking = false;
    
            /**
             * Internal state, defines whether or not the scrollview needs to snap to a boundary edge
             * 
             * @property _snapToEdge
             * @type boolean
             * @protected
             */
            sv._snapToEdge = false;
        }
    },    
    
    /**
     * gesturemove event handler
     *
     * @method _onGestureMove
     * @param e {Event.Facade} The gesturemove event facade
     * @private
     */
    _onGestureMove: function(e) {

        var sv = this;

        if (sv._prevent.move) {
            e.preventDefault();
        }

        sv._isDragging = true;
        sv._endClientY = e.clientY;
        sv._endClientX = e.clientX;

        if (sv._scrollsVertical) {
            sv.set(SCROLL_Y, -(e.clientY - sv._startY));
        }

        if(sv._scrollsHorizontal) {
            sv.set(SCROLL_X, -(e.clientX - sv._startX));
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

        if (this._prevent.end) {
            e.preventDefault();
        }

        var sv = this, // kweight
            minY = sv._minScrollY,
            maxY = sv._maxScrollY,
            minX = sv._minScrollX,
            maxX = sv._maxScrollX,
            vert = sv._scrollsVertical,
            horiz = sv._scrollsHorizontal,
            startPoint =  vert ? sv._startClientY : sv._startClientX,
            endPoint = vert ? sv._endClientY : sv._endClientX,
            distance = startPoint - endPoint,
            absDistance = Math.abs(distance),
            bb = sv._bb,
            x, y, xOrig, yOrig;

        sv._hm.detach();
        sv._hme.detach();

        /**
         * Internal state, defines whether or not the scrollview has been scrolled half it's width/height
         * 
         * @property _scrolledHalfway
         * @type boolean
         * @protected
         */
        sv._scrolledHalfway = sv._snapToEdge = sv._isDragging = false;

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
        sv.lastScrolledAmt = distance;

        // Check for halfway
        if((horiz && absDistance > bb.get('offsetWidth')/2) || (vert && absDistance > bb.get('offsetHeight')/2)) {
            sv._scrolledHalfway = true;

            /**
             * Internal state, defines whether or not the scrollview has been scrolled in the forward (distance > 0), or backward (distance < 0) direction
             * 
             * @property _scrolledForward
             * @type boolean
             * @protected
             */
            sv._scrolledForward = distance > 0;
        }

        // Check for min/max
        if (vert) {
            yOrig = sv.get(SCROLL_Y);
            y = _constrain(yOrig, minY, maxY);
        }

        if (horiz) {
            xOrig = sv.get(SCROLL_X);
            x = _constrain(xOrig, minX, maxX);
        }

        if (x !== xOrig || y !== yOrig) {
            this._snapToEdge = true;
            if (vert) {
                sv.set(SCROLL_Y, y);
            }
            if (horiz) {
                sv.set(SCROLL_X, x);
            }
        }


        if(sv._snapToEdge) {
            return;
        }

        sv.fire(EV_SCROLL_END, {
            onGestureMoveEnd: true
        });

        return;
    },

    /**
     * After listener for changes to the scrollX or scrollY attribute
     *
     * @method _afterScrollChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterScrollChange : function(e) {
        var duration = e.duration,
            easing = e.easing,
            val = e.newVal;
        if(e.src !== UI) {
            if (e.attrName == SCROLL_X) {
                this._uiScrollTo(val, null, duration, easing);
            } else {
                this._uiScrollTo(null, val, duration, easing);
            }
        }
    },

    /**
     * After listener for changes to the flick attribute
     *
     * @method _afterFlickChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterFlickChange : function(e) {
        this._bindFlick(e.newVal);
    },
    
    /**
     * After listener for changes to the disabled attribute
     *
     * @method _afterDisabledChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterDisabledChange : function(e) {
        // Cache for performance - we check during move
        this._cDisabled = e.newVal;
    },

    /**
     * After listener for changes to the drag attribute
     *
     * @method _afterDragChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterDragChange : function(e) {
        this._bindDrag(e.newVal);
    },

    /**
     * Used to move the ScrollView content
     *
     * @method _uiScrollTo
     * @param x {Number}
     * @param y {Number}
     * @param duration {Number}
     * @param easing {String}
     * @protected
     * 
     */
    _uiScrollTo : function(x, y, duration, easing) {
        // TODO: This doesn't seem right. This is not UI logic. 
        duration = duration || this._snapToEdge ? 400 : 0;
        easing = easing || this._snapToEdge ? ScrollView.SNAP_EASING : null;

        this.scrollTo(x, y, duration, easing);
    },

    /**
     * After listener for the height or width attribute
     *
     * @method _afterDimChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterDimChange: function() {
        this._uiDimensionsChange();
    },

    /**
    * Utility method to obtain scrollWidth, scrollHeight,
    * accounting for the impact of translate on scrollWidth, scrollHeight
    * @method _getScrollDims
    * @returns {Array} The offsetWidth, offsetHeight, scrollWidth and scrollHeight as an array: [offsetWidth, offsetHeight, scrollWidth, scrollHeight]
    * @private
    */
    _getScrollDims: function() {
        var dims,

            // Ideally using CSSMatrix - don't think we have it normalized yet though.
            // origX = (new WebKitCSSMatrix(cb.getComputedStyle("transform"))).e;
            // origY = (new WebKitCSSMatrix(cb.getComputedStyle("transform"))).f;

            origX = this.get(SCROLL_X),
            origY = this.get(SCROLL_Y),

            cb = this.get(CONTENT_BOX),
            bb = this.get(BOUNDING_BOX),

            HWTransform,

            TRANS = ScrollView._TRANSITION;

        // TODO: Is this OK? Just in case it's called 'during' a transition.
        if (NATIVE_TRANSITIONS) {
            cb.setStyle(TRANS.DURATION, ZERO);
            cb.setStyle(TRANS.PROPERTY, EMPTY);
        }

        HWTransform = this._forceHWTransforms;
        this._forceHWTransforms = false;  // the z translation was causing issues with picking up accurate scrollWidths in Chrome/Mac.

        this._moveTo(cb, 0, 0);
        dims = [bb.get("offsetWidth"), bb.get("offsetHeight"), bb.get('scrollWidth'), bb.get('scrollHeight')];
        this._moveTo(cb, -1*origX, -1*origY);

        this._forceHWTransforms = HWTransform;

        return dims;
    },

    /**
     * This method gets invoked whenever the height or width attributes change,
     * allowing us to determine which scrolling axes need to be enabled.
     *
     * @method _uiDimensionsChange
     * @protected
     */
    _uiDimensionsChange: function() {
        var sv = this,
            bb = sv._bb,
            CLASS_NAMES = ScrollView.CLASS_NAMES,

            scrollDims = this._getScrollDims(),

            width = scrollDims[0],
            height = scrollDims[1],
            scrollWidth = scrollDims[2],
            scrollHeight = scrollDims[3];

        if (height && scrollHeight > height) {
            sv._scrollsVertical = true;
            sv._maxScrollY = scrollHeight - height;
            sv._minScrollY = 0;
            sv._scrollHeight = scrollHeight;
            sv._height = height;
            bb.addClass(CLASS_NAMES.vertical);
        } else {
            sv._scrollsVertical = false;
            delete sv._maxScrollY;
            delete sv._minScrollY;
            delete sv._scrollHeight;
            delete sv._height;
            bb.removeClass(CLASS_NAMES.vertical);
        }

        if (width && scrollWidth > width) {
            sv._scrollsHorizontal = true;
            sv._maxScrollX = scrollWidth - width;
            sv._minScrollX = 0;
            sv._scrollWidth = scrollWidth;
            sv._width = width;            
            bb.addClass(CLASS_NAMES.horizontal);
        } else {
            sv._scrollsHorizontal = false;
            delete sv._maxScrollX;
            delete sv._minScrollX;
            delete sv._scrollWidth;
            delete sv._width;
            bb.removeClass(CLASS_NAMES.horizontal);
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
        
        var flick = e.flick,
            sv = this;
        
        if (!sv._cDisabled) {
    
            /**
             * Internal state, currently calculated velocity from the flick 
             * 
             * @property _currentVelocity
             * @type number
             * @protected
             */
            sv._currentVelocity = flick.velocity;
            sv._flicking = true;
    
            sv._cDecel = sv.get('deceleration');
            sv._cBounce = sv.get('bounce');
    
            sv._pastYEdge = false;
            sv._pastXEdge = false;
    
            sv._flickFrame();
    
            sv.fire(EV_SCROLL_FLICK);
        }
    },

    _mousewheel: function(e) {
        var scrollY = this.get('scrollY'),
            contentBox = this._cb,
            scrollOffset = 10, // 10px
            scrollToY = scrollY - (e.wheelDelta * scrollOffset);

        this.scrollTo(0, scrollToY);
        
        // if we have scrollbars plugin, update & set the flash timer on the scrollbar
        if (this.scrollbars) {
            // TODO: The scrollbars should handle this themselves
            this.scrollbars._update();
            this.scrollbars.flash();
            // or just this
            // this.scrollbars._hostDimensionsChange();
        }

        // prevent browser default behavior on mouse scroll
        e.preventDefault();
    },

    /**
     * Execute a single frame in the flick animation
     *
     * @method _flickFrame
     * @protected
     */
    _flickFrame: function() {
        var sv = this,
            newY,
            maxY,
            minY,
            newX,
            maxX,
            minX,
            scrollsVertical  = sv._scrollsVertical,
            scrollsHorizontal = sv._scrollsHorizontal,
            deceleration = sv._cDecel,
            bounce = sv._cBounce,
            vel = sv._currentVelocity,
            step = ScrollView.FRAME_STEP;

        if (scrollsVertical) {
            maxY = sv._maxScrollY;
            minY = sv._minScrollY;
            newY = sv.get(SCROLL_Y) - (vel * step);
        }

        if (scrollsHorizontal) {
            maxX = sv._maxScrollX;
            minX = sv._minScrollX;
            newX = sv.get(SCROLL_X) - (vel * step);
        }
        
        vel = sv._currentVelocity = (vel * deceleration);

        if(Math.abs(vel).toFixed(4) <= 0.015) {
            sv._flicking = false;
            sv._killTimer(!(sv._pastYEdge || sv._pastXEdge));

            if(scrollsVertical) {
                if(newY < minY) {
                    sv._snapToEdge = true;
                    sv.set(SCROLL_Y, minY);
                } else if(newY > maxY) {
                    sv._snapToEdge = true;
                    sv.set(SCROLL_Y, maxY);
                }
            }

            if(scrollsHorizontal) {
                if(newX < minX) {
                    sv._snapToEdge = true;
                    sv.set(SCROLL_X, minX);
                } else if(newX > maxX) {
                    sv._snapToEdge = true;
                    sv.set(SCROLL_X, maxX);
                }
            }

            return;
        }

        if (scrollsVertical) {
            if (newY < minY || newY > maxY) {
                sv._pastYEdge = true;
                sv._currentVelocity *= bounce;
            }

            sv.set(SCROLL_Y, newY);
        }

        if (scrollsHorizontal) {
            if (newX < minX || newX > maxX) {
                sv._pastXEdge = true;
                sv._currentVelocity *= bounce;
            }

            sv.set(SCROLL_X, newX);
        }

        if (!sv._flickTimer) {
            sv._flickTimer = Y.later(step, sv, '_flickFrame', null, true);
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
        var sv = this;
        if(sv._flickTimer) {
            sv._flickTimer.cancel();
            sv._flickTimer = null;
        }

        if(fireEvent) {
            sv.fire(EV_SCROLL_END);
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
        if (this._cDisabled) {
            val = Y.Attribute.INVALID_VALUE;
        } else {
    
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
    * @property NAME
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
    * @property ATTRS
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
         * The minimum distance and/or velocity which define a flick. Can be set to false,
         * to disable flick support (note: drag support is enabled/disabled separately)
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
        },

        /**
         * Enable/Disable dragging the ScrollView content (note: flick support is enabled/disabled separately)
         * @attribute drag
         * @type boolean
         * @default true
         */
        drag: {
            value: true
        }
    },

    /**
     * List of class names used in the scrollview's DOM
     *
     * @property CLASS_NAMES
     * @type Object
     * @static
     */
    CLASS_NAMES: CLASS_NAMES,

    /**
     * Flag used to source property changes initiated from the DOM
     *
     * @property UI_SRC
     * @type String
     * @static
     * @default "ui"
     */
    UI_SRC: UI,

    /**
     * The default bounce distance in pixels
     *
     * @property BOUNCE_RANGE
     * @type Number
     * @static
     * @default 150
     */
    BOUNCE_RANGE : 150,

    /**
     * The interval used when animating the flick
     *
     * @property FRAME_STEP
     * @type Number
     * @static
     * @default 30
     */
    FRAME_STEP : 30,

    /**
     * The default easing used when animating the flick
     *
     * @property EASING
     * @type String
     * @static
     * @default 'cubic-bezier(0, 0.1, 0, 1.0)'
     */
    EASING : 'cubic-bezier(0, 0.1, 0, 1.0)',

    /**
     * The default easing to use when animating the bounce snap back.
     *
     * @property SNAP_EASING
     * @type String
     * @static
     * @default 'ease-out'
     */
    SNAP_EASING : 'ease-out',

    /**
     * Object map of style property names used to set transition properties.
     * Defaults to the vendor prefix established by the Transition module.  
     * The configured property names are `_TRANSITION.DURATION` (e.g. "WebkitTransitionDuration") and
     * `_TRANSITION.PROPERTY (e.g. "WebkitTransitionProperty").
     *
     * @property _TRANSITION
     * @private
     */
    _TRANSITION : {
        DURATION : Transition._VENDOR_PREFIX + "TransitionDuration",
        PROPERTY : Transition._VENDOR_PREFIX + "TransitionProperty"
    }
});


}, '@VERSION@' ,{requires:['widget', 'event-gestures', 'event-mousewheel', 'transition'], skinnable:true});
