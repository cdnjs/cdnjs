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
_yuitest_coverage["build/scrollview-base/scrollview-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/scrollview-base/scrollview-base.js",
    code: []
};
_yuitest_coverage["build/scrollview-base/scrollview-base.js"].code=["YUI.add('scrollview-base', function (Y, NAME) {","","/**"," * The scrollview-base module provides a basic ScrollView Widget, without scrollbar indicators"," *"," * @module scrollview"," * @submodule scrollview-base"," */","var getClassName = Y.ClassNameManager.getClassName,","    DOCUMENT = Y.config.doc,","    WINDOW = Y.config.win,","    IE = Y.UA.ie,","    NATIVE_TRANSITIONS = Y.Transition.useNative,","    SCROLLVIEW = 'scrollview',","    CLASS_NAMES = {","        vertical: getClassName(SCROLLVIEW, 'vert'),","        horizontal: getClassName(SCROLLVIEW, 'horiz')","    },","    EV_SCROLL_END = 'scrollEnd',","    FLICK = 'flick',","    DRAG = 'drag',","    MOUSEWHEEL = 'mousewheel',","    UI = 'ui',","    TOP = 'top',","    RIGHT = 'right',","    BOTTOM = 'bottom',","    LEFT = 'left',","    PX = 'px',","    AXIS = 'axis',","    SCROLL_Y = 'scrollY',","    SCROLL_X = 'scrollX',","    BOUNCE = 'bounce',","    DISABLED = 'disabled',","    DECELERATION = 'deceleration',","    DIM_X = 'x',","    DIM_Y = 'y',","    BOUNDING_BOX = 'boundingBox',","    CONTENT_BOX = 'contentBox',","    GESTURE_MOVE = 'gesturemove',","    START = 'start',","    END = 'end',","    EMPTY = '',","    ZERO = '0s',","","    _constrain = function (val, min, max) {","        return Math.min(Math.max(val, min), max);","    };","","/**"," * ScrollView provides a scrollable widget, supporting flick gestures,"," * across both touch and mouse based devices."," *"," * @class ScrollView"," * @param config {Object} Object literal with initial attribute values"," * @extends Widget"," * @constructor"," */","function ScrollView() {","    ScrollView.superclass.constructor.apply(this, arguments);","}","","Y.ScrollView = Y.extend(ScrollView, Y.Widget, {","","    // *** Y.ScrollView prototype","","    /**","     * Designated initializer","     *","     * @method initializer","     * @param {config} Configuration object for the plugin","     */","    initializer: function (config) {","        var sv = this,","            axis = 'auto'; // Default axis to 'auto' and let the calculation happen in syncUI","","        // Cache these values, since they aren't going to change.","        sv._bb = sv.get(BOUNDING_BOX);","        sv._cb = sv.get(CONTENT_BOX);","","        // Determine the axis settings if a value was passed in. TODO: Cleanup","        if (config.axis) {","            config.axis = config.axis.toLowerCase();","            switch (config.axis) {","                case \"x\":","                    axis = {","                        x: true,","                        y: false","                    };","                    break;","                ","                case \"y\":","                    axis = {","                        x: false,","                        y: true","                    };","                    break;","","                // Unsupported ATM.  For future development purposes.","                case \"xy\":","                case \"yx\":","                    if (config._multiaxis) {","                        axis = {","                            x: true,","                            y: true","                        };","                    }","                    break;","            }","        }","","        /**","         * Contains an object that specifies if the widget can scroll on a X and/or Y axis","         *","         * @property axis","         * @type Object","         * @public","         */","        sv.axis = axis;","    },","","    /**","     * bindUI implementation","     *","     * Hooks up events for the widget","     * @method bindUI","     */","    bindUI: function () {","        var sv = this;","","        sv._bindFlick(sv.get(FLICK));","        sv._bindDrag(sv.get(DRAG));","        sv._bindMousewheel(sv.get(MOUSEWHEEL));","        ","        sv._bindAttrs();","","        // IE SELECT HACK. See if we can do this non-natively and in the gesture for a future release.","        if (IE) {","            sv._fixIESelect(sv._bb, sv._cb);","        }","    },","","    /**","     * ","     *","     * @method _bindAttrs","     * @private","     */","    _bindAttrs: function () {","        var sv = this,","            scrollChangeHandler = sv._afterScrollChange,","            dimChangeHandler = sv._afterDimChange;","","        sv.after({","            'scrollEnd': sv._afterScrollEnd,","            'disabledChange': sv._afterDisabledChange,","            'flickChange': sv._afterFlickChange,","            'dragChange': sv._afterDragChange,","            'scrollYChange': scrollChangeHandler,","            'scrollXChange': scrollChangeHandler,","            'heightChange': dimChangeHandler,","            'widthChange': dimChangeHandler","        });","","        // TODO: This should be throttled.","        Y.one(WINDOW).after('resize', dimChangeHandler, sv);","    },","","    /**","     * Bind (or unbind) gesture move listeners required for drag support","     *","     * @method _bindDrag","     * @param drag {boolean} If true, the method binds listener to enable drag (gesturemovestart). If false, the method unbinds gesturemove listeners for drag support.","     * @private","     */","    _bindDrag: function (drag) {","        var sv = this,","            bb = sv._bb;","","        // Unbind any previous 'drag' listeners","        bb.detach(DRAG + '|*');","","        if (drag) {","            bb.on(DRAG + '|' + GESTURE_MOVE + START, Y.bind(sv._onGestureMoveStart, sv));","        }","    },","","    /**","     * Bind (or unbind) flick listeners.","     *","     * @method _bindFlick","     * @param flick {Object|boolean} If truthy, the method binds listeners for flick support. If false, the method unbinds flick listeners.","     * @private","     */","    _bindFlick: function (flick) {","        var sv = this,","            bb = sv._bb;","","        // Unbind any previous 'flick' listeners","        bb.detach(FLICK + '|*');","","        if (flick) {","            bb.on(FLICK + '|' + FLICK, Y.bind(sv._flick, sv), flick);","        }","    },","","    /**","     * Bind (or unbind) mousewheel listeners.","     *","     * @method _bindMousewheel","     * @param mousewheel {Object|boolean} If truthy, the method binds listeners for mousewheel support. If false, the method unbinds mousewheel listeners.","     * @private","     */","    _bindMousewheel: function (mousewheel) {","        var sv = this,","            bb = sv._bb;","","        // Unbind any previous 'mousewheel' listeners","        bb.detach(MOUSEWHEEL + '|*');","","        // Only enable for vertical scrollviews","        if (mousewheel) {","            // Bound to document, because that's where mousewheel events fire off of.","            Y.one(DOCUMENT).on(MOUSEWHEEL, Y.bind(sv._mousewheel, sv));","        }","    },","","    /**","     * syncUI implementation.","     *","     * Update the scroll position, based on the current value of scrollX/scrollY.","     *","     * @method syncUI","     */","    syncUI: function () {","        var sv = this,","            axis = sv.axis,","            scrollDims = sv._getScrollDims(),","            width = scrollDims.offsetWidth,","            height = scrollDims.offsetHeight,","            scrollWidth = scrollDims.scrollWidth,","            scrollHeight = scrollDims.scrollHeight;","","        // If the axis should be auto-calculated, do it.","        if (axis === \"auto\") {","            axis = {","                x: (scrollWidth > width),","                y: (scrollHeight > height)","            };","            sv.axis = axis;","        }","","        // get text direction on or inherited by scrollview node","        sv.rtl = (sv._cb.getComputedStyle('direction') === 'rtl');","","        // Cache the disabled value","        sv._cDisabled = sv.get(DISABLED);","","        // Run this to set initial values","        sv._uiDimensionsChange();","","        // If we're out-of-bounds, snap back.","        if (sv._isOOB()) {","            sv._snapBack();","        }","    },","","    /**","     * Utility method to obtain widget dimensions","     * ","     * @method _getScrollDims","     * @returns {Object} The offsetWidth, offsetHeight, scrollWidth and scrollHeight as an array: [offsetWidth, offsetHeight, scrollWidth, scrollHeight]","     * @private","     */","    _getScrollDims: function () {","        var sv = this,","            cb = sv._cb,","            bb = sv._bb,","            TRANS = ScrollView._TRANSITION,","            dims;","","        // TODO: Is this OK? Just in case it's called 'during' a transition.","        if (NATIVE_TRANSITIONS) {","            cb.setStyle(TRANS.DURATION, ZERO);","            cb.setStyle(TRANS.PROPERTY, EMPTY);","        }","","        dims = {","            'offsetWidth': bb.get('offsetWidth'),","            'offsetHeight': bb.get('offsetHeight'),","            'scrollWidth': bb.get('scrollWidth'),","            'scrollHeight': bb.get('scrollHeight')","        };","","        return dims;","    },","","    /**","     * This method gets invoked whenever the height or width attributes change,","     * allowing us to determine which scrolling axes need to be enabled.","     *","     * @method _uiDimensionsChange","     * @protected","     */","    _uiDimensionsChange: function () {","        var sv = this,","            bb = sv._bb,","            scrollDims = sv._getScrollDims(),","            width = scrollDims.offsetWidth,","            height = scrollDims.offsetHeight,","            scrollWidth = scrollDims.scrollWidth,","            scrollHeight = scrollDims.scrollHeight,","            rtl = sv.rtl,","            axis = sv.axis;","        ","        sv._minScrollX = (rtl) ? -(scrollWidth - width) : 0;","        sv._maxScrollX = (rtl) ? 0 : (scrollWidth - width);","        sv._minScrollY = 0;","        sv._maxScrollY = scrollHeight - height;","        sv._scrollWidth = scrollWidth;","        sv._scrollHeight = scrollHeight;","","        if (axis.x) {","            bb.addClass(CLASS_NAMES.horizontal);","        }","","        if (axis.y) {","            bb.addClass(CLASS_NAMES.vertical);","        }","","        /**","         * Internal state, defines the maximum amount that the scrollview can be scrolled along the Y axis","         *","         * @property _maxScrollY","         * @type number","         * @protected","         */","","        /**","         * Internal state, defines the minimum amount that the scrollview can be scrolled along the Y axis","         *","         * @property _minScrollY","         * @type number","         * @protected","         */","","        /**","         * Internal state, cached scrollHeight, for performance","         *","         * @property _scrollHeight","         * @type number","         * @protected","         */","","        /**","         * Internal state, defines the maximum amount that the scrollview can be scrolled along the X axis","         *","         * @property _maxScrollX","         * @type number","         * @protected","         */","","        /**","         * Internal state, defines the minimum amount that the scrollview can be scrolled along the X axis","         *","         * @property _minScrollX","         * @type number","         * @protected","         */","","        /**","         * Internal state, cached scrollWidth, for performance","         *","         * @property _scrollWidth","         * @type number","         * @protected","         */","    },","","    /**","     * Scroll the element to a given xy coordinate","     *","     * @method scrollTo","     * @param x {Number} The x-position to scroll to. (null for no movement)","     * @param y {Number} The y-position to scroll to. (null for no movement)","     * @param {Number} [duration] ms of the scroll animation. (default is 0)","     * @param {String} [easing] An easing equation if duration is set. (defaults to ScrollView.EASING)","     * @param {String} [node] The node to move.","     */","    scrollTo: function (x, y, duration, easing, node) {","        // Check to see if widget is disabled","        if (this._cDisabled) {","            return;","        }","","        var sv = this,","            cb = sv._cb,","            TRANS = ScrollView._TRANSITION,","            callback = Y.bind(sv._onTransEnd, sv), // @Todo : cache this","            newX = 0,","            newY = 0,","            transition = {},","            transform;","","        // default the optional arguments","        duration = duration || 0;","        easing = easing || ScrollView.EASING;","        node = node || cb;","","        if (x !== null) {","            sv.set(SCROLL_X, x, {src:UI});","            newX = -(x);","        }","","        if (y !== null) {","            sv.set(SCROLL_Y, y, {src:UI});","            newY = -(y);","        }","","        transform = sv._transform(newX, newY);","","        if (NATIVE_TRANSITIONS) {","            // ANDROID WORKAROUND - try and stop existing transition, before kicking off new one.","            node.setStyle(TRANS.DURATION, ZERO).setStyle(TRANS.PROPERTY, EMPTY);","        }","","        // Move","        if (duration === 0) {","            if (NATIVE_TRANSITIONS) {","                node.setStyle('transform', transform);","            }","            else {","                // TODO: If both set, batch them in the same update","                // Update: Nope, setStyles() just loops through each property and applies it.","                if (x !== null) {","                    node.setStyle(LEFT, newX + PX);","                }","                if (y !== null) {","                    node.setStyle(TOP, newY + PX);","                }","            }","        }","","        // Animate","        else {","            transition.easing = easing;","            transition.duration = duration / 1000;","","            if (NATIVE_TRANSITIONS) {","                transition.transform = transform;","            }","            else {","                transition.left = newX + PX;","                transition.top = newY + PX;","            }","","            node.transition(transition, callback);","        }","    },","","    /**","     * Utility method, to create the translate transform string with the","     * x, y translation amounts provided.","     *","     * @method _transform","     * @param {Number} x Number of pixels to translate along the x axis","     * @param {Number} y Number of pixels to translate along the y axis","     * @private","     */","    _transform: function (x, y) {","        // TODO: Would we be better off using a Matrix for this?","        var prop = 'translate(' + x + 'px, ' + y + 'px)';","","        if (this._forceHWTransforms) {","            prop += ' translateZ(0)';","        }","","        return prop;","    },","","    /**","     * Content box transition callback","     *","     * @method _onTransEnd","     * @param {Event.Facade} e The event facade","     * @private","     */","    _onTransEnd: function (e) {","        var sv = this;","","        /**","         * Notification event fired at the end of a scroll transition","         *","         * @event scrollEnd","         * @param e {EventFacade} The default event facade.","         */","        sv.fire(EV_SCROLL_END);","    },","","    /**","     * Flag driving whether or not we should try and force H/W acceleration when transforming. Currently enabled by default for Webkit.","     * Used by the _transform method.","     *","     * @property _forceHWTransforms","     * @type boolean","     * @protected","     */","    _forceHWTransforms: Y.UA.webkit ? true : false,","","    /**","     * <p>Used to control whether or not ScrollView's internal","     * gesturemovestart, gesturemove and gesturemoveend","     * event listeners should preventDefault. The value is an","     * object, with \"start\", \"move\" and \"end\" properties used to","     * specify which events should preventDefault and which shouldn't:</p>","     *","     * <pre>","     * {","     *    start: false,","     *    move: true,","     *    end: false","     * }","     * </pre>","     *","     * <p>The default values are set up in order to prevent panning,","     * on touch devices, while allowing click listeners on elements inside","     * the ScrollView to be notified as expected.</p>","     *","     * @property _prevent","     * @type Object","     * @protected","     */","    _prevent: {","        start: false,","        move: true,","        end: false","    },","","    /**","     * gesturemovestart event handler","     *","     * @method _onGestureMoveStart","     * @param e {Event.Facade} The gesturemovestart event facade","     * @private","     */","    _onGestureMoveStart: function (e) {","        if (!this._cDisabled) {","            var sv = this,","                bb = sv._bb,","                currentX = sv.get(SCROLL_X),","                currentY = sv.get(SCROLL_Y);","","            // TODO: Review if neccesary (#2530129)","            e.stopPropagation();","","            if (sv._prevent.start) {","                e.preventDefault();","            }","","            // if a flick animation is in progress, cancel it","            if (sv._flickAnim) {","                sv._flickAnim.cancel();","            }","","            // Stores data for this gesture cycle.  Cleaned up later","            sv._gesture = {","","                // Will hold the axis value","                axis: null,","","                // The current attribute values","                startX: currentX,","                startY: currentY,","","                // The X/Y coordinates where the event began","                startClientX: e.clientX,","                startClientY: e.clientY,","","                // The X/Y coordinates where the event will end","                endClientX: null,","                endClientY: null,","","                // The current delta of the event","                deltaX: null,","                deltaY: null,","","                // Will be populated for flicks","                flick: null,","","                // Create some listeners for the rest of the gesture cycle","                onGestureMove: bb.on(DRAG + '|' + GESTURE_MOVE, Y.bind(sv._onGestureMove, sv)),","                onGestureMoveEnd: bb.on(DRAG + '|' + GESTURE_MOVE + END, Y.bind(sv._onGestureMoveEnd, sv))","            };","        }","    },","","    /**","     * gesturemove event handler","     *","     * @method _onGestureMove","     * @param e {Event.Facade} The gesturemove event facade","     * @private","     */","    _onGestureMove: function (e) {","        var sv = this,","            gesture = sv._gesture,","            svAxis = sv.axis,","            svAxisX = svAxis.x,","            svAxisY = svAxis.y,","            startX = gesture.startX,","            startY = gesture.startY,","            startClientX = gesture.startClientX,","            startClientY = gesture.startClientY,","            clientX = e.clientX,","            clientY = e.clientY;","","        if (sv._prevent.move) {","            e.preventDefault();","        }","","        gesture.deltaX = startClientX - clientX;","        gesture.deltaY = startClientY - clientY;","","        if (gesture.axis === null) {","            gesture.axis = (Math.abs(gesture.deltaX) > Math.abs(gesture.deltaY)) ? DIM_X : DIM_Y;","        }","","        if (gesture.axis === DIM_X && svAxisX) {","            sv.set(SCROLL_X, startX + gesture.deltaX);","        }","","        if (gesture.axis === DIM_Y && svAxisY) {","            sv.set(SCROLL_Y, startY + gesture.deltaY);","        }","    },","","    /**","     * gesturemoveend event handler","     *","     * @method _onGestureMoveEnd","     * @param e {Event.Facade} The gesturemoveend event facade","     * @private","     */","    _onGestureMoveEnd: function (e) {","        var sv = this,","            gesture = sv._gesture,","            flick = gesture.flick,","            clientX = e.clientX,","            clientY = e.clientY,","            isOOB;","","        if (sv._prevent.end) {","            e.preventDefault();","        }","","        gesture.endClientX = clientX;","        gesture.endClientY = clientY;","","        // Only if this gesture wasn't a flick, and there was movement","        if (!flick && gesture.deltaX !== null && gesture.deltaY !== null) {","            if (sv._isOOB()) {","                sv._snapBack();","            }","            else {","                // Don't fire scrollEnd on the gesture axis is the same as paginator's","                // Not totally confident this is ideal to access a plugin's properties from a host, @TODO revisit","                if (sv.pages && !sv.pages.axis[gesture.axis]) {","                    sv._onTransEnd();","                }","            }","        }","    },","","    /**","     * Execute a flick at the end of a scroll action","     *","     * @method _flick","     * @param e {Event.Facade} The Flick event facade","     * @private","     */","    _flick: function (e) {","        var sv = this,","            gesture = sv._gesture,","            svAxis = sv.axis,","            svAxisX = svAxis.x,","            svAxisY = svAxis.y,","            flick = e.flick,","            flickAxis;","","        if (!sv._cDisabled) {","            flickAxis = flick.axis;","","            // We can't scroll on this axis, so prevent unneccesary firing of _flickFrame","            if ((flickAxis === DIM_X && svAxisX) || (flickAxis === DIM_Y && svAxisY)) {","                gesture.flick = flick;","                sv._cDecel = sv.get(DECELERATION);","                sv._cBounce = sv.get(BOUNCE);","                sv._flickFrame(flick.velocity);","            }","        }","    },","","    /**","     * Execute a single frame in the flick animation","     *","     * @method _flickFrame","     * @param velocity {Number} The velocity of this animated frame","     * @protected","     */","    _flickFrame: function (velocity) {","","        var sv = this,","            gesture = sv._gesture,","            flickAxis = gesture.flick.axis,","            currentX = sv.get(SCROLL_X),","            currentY = sv.get(SCROLL_Y),","            minX = sv._minScrollX,","            maxX = sv._maxScrollX,","            minY = sv._minScrollY,","            maxY = sv._maxScrollY,","            deceleration = sv._cDecel,","            bounce = sv._cBounce,","            svAxis = sv.axis,","            svAxisX = svAxis.x,","            svAxisY = svAxis.y,","            step = ScrollView.FRAME_STEP,","            newX = currentX - (velocity * step),","            newY = currentY - (velocity * step);","","        velocity *= deceleration;","","        // If we are out of bounds","        if (sv._isOOB()) {","            // We're past an edge, now bounce back","            sv._snapBack();","        }","        ","        // If the velocity gets slow enough, just stop","        else if (Math.abs(velocity).toFixed(4) <= 0.015) {","            sv._onTransEnd();","        }","","        // Otherwise, animate to the next frame","        else {","            if (flickAxis === DIM_X && svAxisX) {","                if (newX < minX || newX > maxX) {","                    velocity *= bounce;","                }","                sv.set(SCROLL_X, newX);","            }","            else if (flickAxis === DIM_Y && svAxisY) {","                if (newY < minY || newY > maxY) {","                    velocity *= bounce;","                }","                sv.set(SCROLL_Y, newY);","            }","","            // TODO: maybe use requestAnimationFrame instead","            sv._flickAnim = Y.later(step, sv, '_flickFrame', [velocity]);","        }","    },","","    /**","     * Handle mousewheel events on the widget","     *","     * @method _mousewheel","     * @param e {Event.Facade} The mousewheel event facade","     * @private","     */","    _mousewheel: function (e) {","        var sv = this,","            scrollY = sv.get(SCROLL_Y),","            bb = sv._bb,","            scrollOffset = 10, // 10px","            isForward = (e.wheelDelta > 0),","            scrollToY = scrollY - ((isForward ? 1 : -1) * scrollOffset);","","        scrollToY = _constrain(scrollToY, sv._minScrollY, sv._maxScrollY);","","        if (bb.contains(e.target)) {","            // Jump to the new offset","            sv.set(SCROLL_Y, scrollToY);","","            // if we have scrollbars plugin, update & set the flash timer on the scrollbar","            // TODO: This probably shouldn't be in this module","            if (sv.scrollbars) {","                // TODO: The scrollbars should handle this themselves","                sv.scrollbars._update();","                sv.scrollbars.flash();","                // or just this","                // sv.scrollbars._hostDimensionsChange();","            }","","            // Fire the 'scrollEnd' event","            sv._onTransEnd();","","            // prevent browser default behavior on mouse scroll","            e.preventDefault();","        }","    },","","    /**","     * Checks to see the current scrollX/scrollY position is out of bounds","     *","     * @method _isOOB","     * @returns {boolen} Whether the current X/Y position is out of bounds (true) or not (false)","     * @private","     */","    _isOOB: function () {","        var sv = this,","            svAxis = sv.axis,","            svAxisX = svAxis.x,","            svAxisY = svAxis.y,","            currentX = sv.get(SCROLL_X),","            currentY = sv.get(SCROLL_Y),","            minX = sv._minScrollX,","            minY = sv._minScrollY,","            maxX = sv._maxScrollX,","            maxY = sv._maxScrollY;","","        return (svAxisX && (currentX < minX || currentX > maxX)) || (svAxisY && (currentY < minY || currentY > maxY));","    },","","    /**","     * Bounces back","     * @TODO: Should be more generalized and support both X and Y detection","     *","     * @method _snapBack","     * @private","     */","    _snapBack: function () {","        var sv = this,","            currentX = sv.get(SCROLL_X),","            currentY = sv.get(SCROLL_Y),","            minX = sv._minScrollX,","            minY = sv._minScrollY,","            maxX = sv._maxScrollX,","            maxY = sv._maxScrollY,","            newY = _constrain(currentY, minY, maxY),","            newX = _constrain(currentX, minX, maxX),","            duration = ScrollView.SNAP_DURATION;","","        if (newX !== currentX) {","            sv.set(SCROLL_X, newX, {duration:duration});","        }","        else if (newY !== currentY) {","            sv.set(SCROLL_Y, newY, {duration:duration});","        }","        else {","            // It shouldn't ever get here, but in case it does, fire scrollEnd","            sv._onTransEnd();","        }","    },","","    /**","     * After listener for changes to the scrollX or scrollY attribute","     *","     * @method _afterScrollChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterScrollChange: function (e) {","        var sv = this,","            duration = e.duration,","            easing = e.easing,","            val = e.newVal,","            scrollToArgs = [];","","        if (e.src !== ScrollView.UI_SRC) {","","            // Generate the array of args to pass to scrollTo()","            if (e.attrName === SCROLL_X) {","                scrollToArgs.push(val);","                scrollToArgs.push(sv.get(SCROLL_Y));","            }","            else {","                scrollToArgs.push(sv.get(SCROLL_X));","                scrollToArgs.push(val);","            }","","            scrollToArgs.push(duration);","            scrollToArgs.push(easing);","","            sv.scrollTo.apply(sv, scrollToArgs);","        }","    },","","    /**","     * After listener for changes to the flick attribute","     *","     * @method _afterFlickChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterFlickChange: function (e) {","        this._bindFlick(e.newVal);","    },","","    /**","     * After listener for changes to the disabled attribute","     *","     * @method _afterDisabledChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterDisabledChange: function (e) {","        // Cache for performance - we check during move","        this._cDisabled = e.newVal;","    },","","    /**","     * After listener for changes to the drag attribute","     *","     * @method _afterDragChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterDragChange: function (e) {","        this._bindDrag(e.newVal);","    },","","    /**","     * After listener for changes to the drag attribute","     *","     * @method _afterDragChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterMousewheelChange: function (e) {","        this._bindMousewheel(e.newVal);","    },","","    /**","     * After listener for the height or width attribute","     *","     * @method _afterDimChange","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterDimChange: function () {","        this._uiDimensionsChange();","    },","","    /**","     * After listener for scrollEnd, for cleanup","     *","     * @method _afterScrollEnd","     * @param e {Event.Facade} The event facade","     * @protected","     */","    _afterScrollEnd: function (e) {","        var sv = this,","            gesture = sv._gesture;","","        if (gesture && gesture.onGestureMove && gesture.onGestureMove.detach) {","            gesture.onGestureMove.detach();","        }","","        if (gesture && gesture.onGestureMoveEnd && gesture.onGestureMoveEnd.detach) {","            gesture.onGestureMoveEnd.detach();","        }","","        if (sv._flickAnim) {","            sv._flickAnim.cancel(); // Might as well?","        }","        ","        delete sv._flickAnim;","","        // Ideally this should be removed, but doing so causing some JS errors with fast swiping ","        // because _gesture is being deleted after the previous one has been overwritten","        // delete sv._gesture; // TODO: Move to sv.prevGesture?","    }","    ","    // End prototype properties","","}, {","","    // Static properties","","    /**","     * The identity of the widget.","     *","     * @property NAME","     * @type String","     * @default 'scrollview'","     * @readOnly","     * @protected","     * @static","     */","    NAME: 'scrollview',","","    /**","     * Static property used to define the default attribute configuration of","     * the Widget.","     *","     * @property ATTRS","     * @type {Object}","     * @protected","     * @static","     */","    ATTRS: {","","        /**","         * The scroll position in the y-axis","         *","         * @attribute scrollY","         * @type Number","         * @default 0","         */","        scrollY: {","            value: 0","        },","","        /**","         * The scroll position in the x-axis","         *","         * @attribute scrollX","         * @type Number","         * @default 0","         */","        scrollX: {","            value: 0","        },","","        /**","         * Drag coefficent for inertial scrolling. The closer to 1 this","         * value is, the less friction during scrolling.","         *","         * @attribute deceleration","         * @default 0.93","         */","        deceleration: {","            value: 0.93","        },","","        /**","         * Drag coefficient for intertial scrolling at the upper","         * and lower boundaries of the scrollview. Set to 0 to","         * disable \"rubber-banding\".","         *","         * @attribute bounce","         * @type Number","         * @default 0.1","         */","        bounce: {","            value: 0.1","        },","","        /**","         * The minimum distance and/or velocity which define a flick. Can be set to false,","         * to disable flick support (note: drag support is enabled/disabled separately)","         *","         * @attribute flick","         * @type Object","         * @default Object with properties minDistance = 10, minVelocity = 0.3.","         */","        flick: {","            value: {","                minDistance: 10,","                minVelocity: 0.3","            }","        },","","        /**","         * Enable/Disable dragging the ScrollView content (note: flick support is enabled/disabled separately)","         * @attribute drag","         * @type boolean","         * @default true","         */","        drag: {","            value: true","        },","","        /**","         * Enable/Disable scrolling the ScrollView content via mousewheel","         * @attribute mousewheel","         * @type boolean","         * @default true","         */","        mousewheel: {","            value: true","        }","    },","","    /**","     * List of class names used in the scrollview's DOM","     *","     * @property CLASS_NAMES","     * @type Object","     * @static","     */","    CLASS_NAMES: CLASS_NAMES,","","    /**","     * Flag used to source property changes initiated from the DOM","     *","     * @property UI_SRC","     * @type String","     * @static","     * @default 'ui'","     */","    UI_SRC: UI,","","    /**","     * The default bounce distance in pixels","     *","     * @property BOUNCE_RANGE","     * @type Number","     * @static","     * @default 150","     */","    BOUNCE_RANGE: 150,","","    /**","     * The interval used when animating the flick","     *","     * @property FRAME_STEP","     * @type Number","     * @static","     * @default 16","     */","    FRAME_STEP: 16,","","    /**","     * The default easing used when animating the flick","     *","     * @property EASING","     * @type String","     * @static","     * @default 'cubic-bezier(0, 0.1, 0, 1.0)'","     */","    EASING: 'cubic-bezier(0, 0.1, 0, 1.0)',","","    /**","     * The default easing to use when animating the bounce snap back.","     *","     * @property SNAP_EASING","     * @type String","     * @static","     * @default 'ease-out'","     */","    SNAP_EASING: 'ease-out',","","    /**","     * The default duration to use when animating the bounce snap back.","     *","     * @property SNAP_DURATION","     * @type Number","     * @static","     * @default 400","     */","    SNAP_DURATION: 400,","","    /**","     * Object map of style property names used to set transition properties.","     * Defaults to the vendor prefix established by the Transition module.","     * The configured property names are `_TRANSITION.DURATION` (e.g. \"WebkitTransitionDuration\") and","     * `_TRANSITION.PROPERTY (e.g. \"WebkitTransitionProperty\").","     *","     * @property _TRANSITION","     * @private","     */","    _TRANSITION: {","        DURATION: Y.Transition._VENDOR_PREFIX + 'TransitionDuration',","        PROPERTY: Y.Transition._VENDOR_PREFIX + 'TransitionProperty'","    }","","    // End static properties","","});","","}, '@VERSION@', {\"requires\": [\"widget\", \"event-gestures\", \"event-mousewheel\", \"transition\"], \"skinnable\": true});"];
_yuitest_coverage["build/scrollview-base/scrollview-base.js"].lines = {"1":0,"9":0,"46":0,"58":0,"59":0,"62":0,"73":0,"77":0,"78":0,"81":0,"82":0,"83":0,"85":0,"89":0,"92":0,"96":0,"101":0,"102":0,"107":0,"118":0,"128":0,"130":0,"131":0,"132":0,"134":0,"137":0,"138":0,"149":0,"153":0,"165":0,"176":0,"180":0,"182":0,"183":0,"195":0,"199":0,"201":0,"202":0,"214":0,"218":0,"221":0,"223":0,"235":0,"244":0,"245":0,"249":0,"253":0,"256":0,"259":0,"262":0,"263":0,"275":0,"282":0,"283":0,"284":0,"287":0,"294":0,"305":0,"315":0,"316":0,"317":0,"318":0,"319":0,"320":0,"322":0,"323":0,"326":0,"327":0,"391":0,"392":0,"395":0,"405":0,"406":0,"407":0,"409":0,"410":0,"411":0,"414":0,"415":0,"416":0,"419":0,"421":0,"423":0,"427":0,"428":0,"429":0,"434":0,"435":0,"437":0,"438":0,"445":0,"446":0,"448":0,"449":0,"452":0,"453":0,"456":0,"471":0,"473":0,"474":0,"477":0,"488":0,"496":0,"546":0,"547":0,"553":0,"555":0,"556":0,"560":0,"561":0,"565":0,"604":0,"616":0,"617":0,"620":0,"621":0,"623":0,"624":0,"627":0,"628":0,"631":0,"632":0,"644":0,"651":0,"652":0,"655":0,"656":0,"659":0,"660":0,"661":0,"666":0,"667":0,"681":0,"689":0,"690":0,"693":0,"694":0,"695":0,"696":0,"697":0,"711":0,"729":0,"732":0,"734":0,"738":0,"739":0,"744":0,"745":0,"746":0,"748":0,"750":0,"751":0,"752":0,"754":0,"758":0,"770":0,"777":0,"779":0,"781":0,"785":0,"787":0,"788":0,"794":0,"797":0,"809":0,"820":0,"831":0,"842":0,"843":0,"845":0,"846":0,"850":0,"862":0,"868":0,"871":0,"872":0,"873":0,"876":0,"877":0,"880":0,"881":0,"883":0,"895":0,"907":0,"918":0,"929":0,"940":0,"951":0,"954":0,"955":0,"958":0,"959":0,"962":0,"963":0,"966":0};
_yuitest_coverage["build/scrollview-base/scrollview-base.js"].functions = {"_constrain:45":0,"ScrollView:58":0,"initializer:72":0,"bindUI:127":0,"_bindAttrs:148":0,"_bindDrag:175":0,"_bindFlick:194":0,"_bindMousewheel:213":0,"syncUI:234":0,"_getScrollDims:274":0,"_uiDimensionsChange:304":0,"scrollTo:389":0,"_transform:469":0,"_onTransEnd:487":0,"_onGestureMoveStart:545":0,"_onGestureMove:603":0,"_onGestureMoveEnd:643":0,"_flick:680":0,"_flickFrame:709":0,"_mousewheel:769":0,"_isOOB:808":0,"_snapBack:830":0,"_afterScrollChange:861":0,"_afterFlickChange:894":0,"_afterDisabledChange:905":0,"_afterDragChange:917":0,"_afterMousewheelChange:928":0,"_afterDimChange:939":0,"_afterScrollEnd:950":0,"(anonymous 1):1":0};
_yuitest_coverage["build/scrollview-base/scrollview-base.js"].coveredLines = 195;
_yuitest_coverage["build/scrollview-base/scrollview-base.js"].coveredFunctions = 30;
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 1);
YUI.add('scrollview-base', function (Y, NAME) {

/**
 * The scrollview-base module provides a basic ScrollView Widget, without scrollbar indicators
 *
 * @module scrollview
 * @submodule scrollview-base
 */
_yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 9);
var getClassName = Y.ClassNameManager.getClassName,
    DOCUMENT = Y.config.doc,
    WINDOW = Y.config.win,
    IE = Y.UA.ie,
    NATIVE_TRANSITIONS = Y.Transition.useNative,
    SCROLLVIEW = 'scrollview',
    CLASS_NAMES = {
        vertical: getClassName(SCROLLVIEW, 'vert'),
        horizontal: getClassName(SCROLLVIEW, 'horiz')
    },
    EV_SCROLL_END = 'scrollEnd',
    FLICK = 'flick',
    DRAG = 'drag',
    MOUSEWHEEL = 'mousewheel',
    UI = 'ui',
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
    PX = 'px',
    AXIS = 'axis',
    SCROLL_Y = 'scrollY',
    SCROLL_X = 'scrollX',
    BOUNCE = 'bounce',
    DISABLED = 'disabled',
    DECELERATION = 'deceleration',
    DIM_X = 'x',
    DIM_Y = 'y',
    BOUNDING_BOX = 'boundingBox',
    CONTENT_BOX = 'contentBox',
    GESTURE_MOVE = 'gesturemove',
    START = 'start',
    END = 'end',
    EMPTY = '',
    ZERO = '0s',

    _constrain = function (val, min, max) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_constrain", 45);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 46);
return Math.min(Math.max(val, min), max);
    };

/**
 * ScrollView provides a scrollable widget, supporting flick gestures,
 * across both touch and mouse based devices.
 *
 * @class ScrollView
 * @param config {Object} Object literal with initial attribute values
 * @extends Widget
 * @constructor
 */
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 58);
function ScrollView() {
    _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "ScrollView", 58);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 59);
ScrollView.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/scrollview-base/scrollview-base.js", 62);
Y.ScrollView = Y.extend(ScrollView, Y.Widget, {

    // *** Y.ScrollView prototype

    /**
     * Designated initializer
     *
     * @method initializer
     * @param {config} Configuration object for the plugin
     */
    initializer: function (config) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "initializer", 72);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 73);
var sv = this,
            axis = 'auto'; // Default axis to 'auto' and let the calculation happen in syncUI

        // Cache these values, since they aren't going to change.
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 77);
sv._bb = sv.get(BOUNDING_BOX);
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 78);
sv._cb = sv.get(CONTENT_BOX);

        // Determine the axis settings if a value was passed in. TODO: Cleanup
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 81);
if (config.axis) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 82);
config.axis = config.axis.toLowerCase();
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 83);
switch (config.axis) {
                case "x":
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 85);
axis = {
                        x: true,
                        y: false
                    };
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 89);
break;
                
                case "y":
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 92);
axis = {
                        x: false,
                        y: true
                    };
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 96);
break;

                // Unsupported ATM.  For future development purposes.
                case "xy":
                case "yx":
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 101);
if (config._multiaxis) {
                        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 102);
axis = {
                            x: true,
                            y: true
                        };
                    }
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 107);
break;
            }
        }

        /**
         * Contains an object that specifies if the widget can scroll on a X and/or Y axis
         *
         * @property axis
         * @type Object
         * @public
         */
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 118);
sv.axis = axis;
    },

    /**
     * bindUI implementation
     *
     * Hooks up events for the widget
     * @method bindUI
     */
    bindUI: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "bindUI", 127);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 128);
var sv = this;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 130);
sv._bindFlick(sv.get(FLICK));
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 131);
sv._bindDrag(sv.get(DRAG));
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 132);
sv._bindMousewheel(sv.get(MOUSEWHEEL));
        
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 134);
sv._bindAttrs();

        // IE SELECT HACK. See if we can do this non-natively and in the gesture for a future release.
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 137);
if (IE) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 138);
sv._fixIESelect(sv._bb, sv._cb);
        }
    },

    /**
     * 
     *
     * @method _bindAttrs
     * @private
     */
    _bindAttrs: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_bindAttrs", 148);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 149);
var sv = this,
            scrollChangeHandler = sv._afterScrollChange,
            dimChangeHandler = sv._afterDimChange;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 153);
sv.after({
            'scrollEnd': sv._afterScrollEnd,
            'disabledChange': sv._afterDisabledChange,
            'flickChange': sv._afterFlickChange,
            'dragChange': sv._afterDragChange,
            'scrollYChange': scrollChangeHandler,
            'scrollXChange': scrollChangeHandler,
            'heightChange': dimChangeHandler,
            'widthChange': dimChangeHandler
        });

        // TODO: This should be throttled.
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 165);
Y.one(WINDOW).after('resize', dimChangeHandler, sv);
    },

    /**
     * Bind (or unbind) gesture move listeners required for drag support
     *
     * @method _bindDrag
     * @param drag {boolean} If true, the method binds listener to enable drag (gesturemovestart). If false, the method unbinds gesturemove listeners for drag support.
     * @private
     */
    _bindDrag: function (drag) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_bindDrag", 175);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 176);
var sv = this,
            bb = sv._bb;

        // Unbind any previous 'drag' listeners
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 180);
bb.detach(DRAG + '|*');

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 182);
if (drag) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 183);
bb.on(DRAG + '|' + GESTURE_MOVE + START, Y.bind(sv._onGestureMoveStart, sv));
        }
    },

    /**
     * Bind (or unbind) flick listeners.
     *
     * @method _bindFlick
     * @param flick {Object|boolean} If truthy, the method binds listeners for flick support. If false, the method unbinds flick listeners.
     * @private
     */
    _bindFlick: function (flick) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_bindFlick", 194);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 195);
var sv = this,
            bb = sv._bb;

        // Unbind any previous 'flick' listeners
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 199);
bb.detach(FLICK + '|*');

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 201);
if (flick) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 202);
bb.on(FLICK + '|' + FLICK, Y.bind(sv._flick, sv), flick);
        }
    },

    /**
     * Bind (or unbind) mousewheel listeners.
     *
     * @method _bindMousewheel
     * @param mousewheel {Object|boolean} If truthy, the method binds listeners for mousewheel support. If false, the method unbinds mousewheel listeners.
     * @private
     */
    _bindMousewheel: function (mousewheel) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_bindMousewheel", 213);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 214);
var sv = this,
            bb = sv._bb;

        // Unbind any previous 'mousewheel' listeners
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 218);
bb.detach(MOUSEWHEEL + '|*');

        // Only enable for vertical scrollviews
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 221);
if (mousewheel) {
            // Bound to document, because that's where mousewheel events fire off of.
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 223);
Y.one(DOCUMENT).on(MOUSEWHEEL, Y.bind(sv._mousewheel, sv));
        }
    },

    /**
     * syncUI implementation.
     *
     * Update the scroll position, based on the current value of scrollX/scrollY.
     *
     * @method syncUI
     */
    syncUI: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "syncUI", 234);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 235);
var sv = this,
            axis = sv.axis,
            scrollDims = sv._getScrollDims(),
            width = scrollDims.offsetWidth,
            height = scrollDims.offsetHeight,
            scrollWidth = scrollDims.scrollWidth,
            scrollHeight = scrollDims.scrollHeight;

        // If the axis should be auto-calculated, do it.
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 244);
if (axis === "auto") {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 245);
axis = {
                x: (scrollWidth > width),
                y: (scrollHeight > height)
            };
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 249);
sv.axis = axis;
        }

        // get text direction on or inherited by scrollview node
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 253);
sv.rtl = (sv._cb.getComputedStyle('direction') === 'rtl');

        // Cache the disabled value
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 256);
sv._cDisabled = sv.get(DISABLED);

        // Run this to set initial values
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 259);
sv._uiDimensionsChange();

        // If we're out-of-bounds, snap back.
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 262);
if (sv._isOOB()) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 263);
sv._snapBack();
        }
    },

    /**
     * Utility method to obtain widget dimensions
     * 
     * @method _getScrollDims
     * @returns {Object} The offsetWidth, offsetHeight, scrollWidth and scrollHeight as an array: [offsetWidth, offsetHeight, scrollWidth, scrollHeight]
     * @private
     */
    _getScrollDims: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_getScrollDims", 274);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 275);
var sv = this,
            cb = sv._cb,
            bb = sv._bb,
            TRANS = ScrollView._TRANSITION,
            dims;

        // TODO: Is this OK? Just in case it's called 'during' a transition.
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 282);
if (NATIVE_TRANSITIONS) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 283);
cb.setStyle(TRANS.DURATION, ZERO);
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 284);
cb.setStyle(TRANS.PROPERTY, EMPTY);
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 287);
dims = {
            'offsetWidth': bb.get('offsetWidth'),
            'offsetHeight': bb.get('offsetHeight'),
            'scrollWidth': bb.get('scrollWidth'),
            'scrollHeight': bb.get('scrollHeight')
        };

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 294);
return dims;
    },

    /**
     * This method gets invoked whenever the height or width attributes change,
     * allowing us to determine which scrolling axes need to be enabled.
     *
     * @method _uiDimensionsChange
     * @protected
     */
    _uiDimensionsChange: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_uiDimensionsChange", 304);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 305);
var sv = this,
            bb = sv._bb,
            scrollDims = sv._getScrollDims(),
            width = scrollDims.offsetWidth,
            height = scrollDims.offsetHeight,
            scrollWidth = scrollDims.scrollWidth,
            scrollHeight = scrollDims.scrollHeight,
            rtl = sv.rtl,
            axis = sv.axis;
        
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 315);
sv._minScrollX = (rtl) ? -(scrollWidth - width) : 0;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 316);
sv._maxScrollX = (rtl) ? 0 : (scrollWidth - width);
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 317);
sv._minScrollY = 0;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 318);
sv._maxScrollY = scrollHeight - height;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 319);
sv._scrollWidth = scrollWidth;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 320);
sv._scrollHeight = scrollHeight;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 322);
if (axis.x) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 323);
bb.addClass(CLASS_NAMES.horizontal);
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 326);
if (axis.y) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 327);
bb.addClass(CLASS_NAMES.vertical);
        }

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
     * Scroll the element to a given xy coordinate
     *
     * @method scrollTo
     * @param x {Number} The x-position to scroll to. (null for no movement)
     * @param y {Number} The y-position to scroll to. (null for no movement)
     * @param {Number} [duration] ms of the scroll animation. (default is 0)
     * @param {String} [easing] An easing equation if duration is set. (defaults to ScrollView.EASING)
     * @param {String} [node] The node to move.
     */
    scrollTo: function (x, y, duration, easing, node) {
        // Check to see if widget is disabled
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "scrollTo", 389);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 391);
if (this._cDisabled) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 392);
return;
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 395);
var sv = this,
            cb = sv._cb,
            TRANS = ScrollView._TRANSITION,
            callback = Y.bind(sv._onTransEnd, sv), // @Todo : cache this
            newX = 0,
            newY = 0,
            transition = {},
            transform;

        // default the optional arguments
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 405);
duration = duration || 0;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 406);
easing = easing || ScrollView.EASING;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 407);
node = node || cb;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 409);
if (x !== null) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 410);
sv.set(SCROLL_X, x, {src:UI});
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 411);
newX = -(x);
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 414);
if (y !== null) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 415);
sv.set(SCROLL_Y, y, {src:UI});
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 416);
newY = -(y);
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 419);
transform = sv._transform(newX, newY);

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 421);
if (NATIVE_TRANSITIONS) {
            // ANDROID WORKAROUND - try and stop existing transition, before kicking off new one.
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 423);
node.setStyle(TRANS.DURATION, ZERO).setStyle(TRANS.PROPERTY, EMPTY);
        }

        // Move
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 427);
if (duration === 0) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 428);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 429);
node.setStyle('transform', transform);
            }
            else {
                // TODO: If both set, batch them in the same update
                // Update: Nope, setStyles() just loops through each property and applies it.
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 434);
if (x !== null) {
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 435);
node.setStyle(LEFT, newX + PX);
                }
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 437);
if (y !== null) {
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 438);
node.setStyle(TOP, newY + PX);
                }
            }
        }

        // Animate
        else {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 445);
transition.easing = easing;
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 446);
transition.duration = duration / 1000;

            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 448);
if (NATIVE_TRANSITIONS) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 449);
transition.transform = transform;
            }
            else {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 452);
transition.left = newX + PX;
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 453);
transition.top = newY + PX;
            }

            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 456);
node.transition(transition, callback);
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
    _transform: function (x, y) {
        // TODO: Would we be better off using a Matrix for this?
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_transform", 469);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 471);
var prop = 'translate(' + x + 'px, ' + y + 'px)';

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 473);
if (this._forceHWTransforms) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 474);
prop += ' translateZ(0)';
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 477);
return prop;
    },

    /**
     * Content box transition callback
     *
     * @method _onTransEnd
     * @param {Event.Facade} e The event facade
     * @private
     */
    _onTransEnd: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_onTransEnd", 487);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 488);
var sv = this;

        /**
         * Notification event fired at the end of a scroll transition
         *
         * @event scrollEnd
         * @param e {EventFacade} The default event facade.
         */
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 496);
sv.fire(EV_SCROLL_END);
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
     *    start: false,
     *    move: true,
     *    end: false
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
    _prevent: {
        start: false,
        move: true,
        end: false
    },

    /**
     * gesturemovestart event handler
     *
     * @method _onGestureMoveStart
     * @param e {Event.Facade} The gesturemovestart event facade
     * @private
     */
    _onGestureMoveStart: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_onGestureMoveStart", 545);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 546);
if (!this._cDisabled) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 547);
var sv = this,
                bb = sv._bb,
                currentX = sv.get(SCROLL_X),
                currentY = sv.get(SCROLL_Y);

            // TODO: Review if neccesary (#2530129)
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 553);
e.stopPropagation();

            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 555);
if (sv._prevent.start) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 556);
e.preventDefault();
            }

            // if a flick animation is in progress, cancel it
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 560);
if (sv._flickAnim) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 561);
sv._flickAnim.cancel();
            }

            // Stores data for this gesture cycle.  Cleaned up later
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 565);
sv._gesture = {

                // Will hold the axis value
                axis: null,

                // The current attribute values
                startX: currentX,
                startY: currentY,

                // The X/Y coordinates where the event began
                startClientX: e.clientX,
                startClientY: e.clientY,

                // The X/Y coordinates where the event will end
                endClientX: null,
                endClientY: null,

                // The current delta of the event
                deltaX: null,
                deltaY: null,

                // Will be populated for flicks
                flick: null,

                // Create some listeners for the rest of the gesture cycle
                onGestureMove: bb.on(DRAG + '|' + GESTURE_MOVE, Y.bind(sv._onGestureMove, sv)),
                onGestureMoveEnd: bb.on(DRAG + '|' + GESTURE_MOVE + END, Y.bind(sv._onGestureMoveEnd, sv))
            };
        }
    },

    /**
     * gesturemove event handler
     *
     * @method _onGestureMove
     * @param e {Event.Facade} The gesturemove event facade
     * @private
     */
    _onGestureMove: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_onGestureMove", 603);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 604);
var sv = this,
            gesture = sv._gesture,
            svAxis = sv.axis,
            svAxisX = svAxis.x,
            svAxisY = svAxis.y,
            startX = gesture.startX,
            startY = gesture.startY,
            startClientX = gesture.startClientX,
            startClientY = gesture.startClientY,
            clientX = e.clientX,
            clientY = e.clientY;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 616);
if (sv._prevent.move) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 617);
e.preventDefault();
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 620);
gesture.deltaX = startClientX - clientX;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 621);
gesture.deltaY = startClientY - clientY;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 623);
if (gesture.axis === null) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 624);
gesture.axis = (Math.abs(gesture.deltaX) > Math.abs(gesture.deltaY)) ? DIM_X : DIM_Y;
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 627);
if (gesture.axis === DIM_X && svAxisX) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 628);
sv.set(SCROLL_X, startX + gesture.deltaX);
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 631);
if (gesture.axis === DIM_Y && svAxisY) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 632);
sv.set(SCROLL_Y, startY + gesture.deltaY);
        }
    },

    /**
     * gesturemoveend event handler
     *
     * @method _onGestureMoveEnd
     * @param e {Event.Facade} The gesturemoveend event facade
     * @private
     */
    _onGestureMoveEnd: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_onGestureMoveEnd", 643);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 644);
var sv = this,
            gesture = sv._gesture,
            flick = gesture.flick,
            clientX = e.clientX,
            clientY = e.clientY,
            isOOB;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 651);
if (sv._prevent.end) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 652);
e.preventDefault();
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 655);
gesture.endClientX = clientX;
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 656);
gesture.endClientY = clientY;

        // Only if this gesture wasn't a flick, and there was movement
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 659);
if (!flick && gesture.deltaX !== null && gesture.deltaY !== null) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 660);
if (sv._isOOB()) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 661);
sv._snapBack();
            }
            else {
                // Don't fire scrollEnd on the gesture axis is the same as paginator's
                // Not totally confident this is ideal to access a plugin's properties from a host, @TODO revisit
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 666);
if (sv.pages && !sv.pages.axis[gesture.axis]) {
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 667);
sv._onTransEnd();
                }
            }
        }
    },

    /**
     * Execute a flick at the end of a scroll action
     *
     * @method _flick
     * @param e {Event.Facade} The Flick event facade
     * @private
     */
    _flick: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_flick", 680);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 681);
var sv = this,
            gesture = sv._gesture,
            svAxis = sv.axis,
            svAxisX = svAxis.x,
            svAxisY = svAxis.y,
            flick = e.flick,
            flickAxis;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 689);
if (!sv._cDisabled) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 690);
flickAxis = flick.axis;

            // We can't scroll on this axis, so prevent unneccesary firing of _flickFrame
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 693);
if ((flickAxis === DIM_X && svAxisX) || (flickAxis === DIM_Y && svAxisY)) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 694);
gesture.flick = flick;
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 695);
sv._cDecel = sv.get(DECELERATION);
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 696);
sv._cBounce = sv.get(BOUNCE);
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 697);
sv._flickFrame(flick.velocity);
            }
        }
    },

    /**
     * Execute a single frame in the flick animation
     *
     * @method _flickFrame
     * @param velocity {Number} The velocity of this animated frame
     * @protected
     */
    _flickFrame: function (velocity) {

        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_flickFrame", 709);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 711);
var sv = this,
            gesture = sv._gesture,
            flickAxis = gesture.flick.axis,
            currentX = sv.get(SCROLL_X),
            currentY = sv.get(SCROLL_Y),
            minX = sv._minScrollX,
            maxX = sv._maxScrollX,
            minY = sv._minScrollY,
            maxY = sv._maxScrollY,
            deceleration = sv._cDecel,
            bounce = sv._cBounce,
            svAxis = sv.axis,
            svAxisX = svAxis.x,
            svAxisY = svAxis.y,
            step = ScrollView.FRAME_STEP,
            newX = currentX - (velocity * step),
            newY = currentY - (velocity * step);

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 729);
velocity *= deceleration;

        // If we are out of bounds
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 732);
if (sv._isOOB()) {
            // We're past an edge, now bounce back
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 734);
sv._snapBack();
        }
        
        // If the velocity gets slow enough, just stop
        else {_yuitest_coverline("build/scrollview-base/scrollview-base.js", 738);
if (Math.abs(velocity).toFixed(4) <= 0.015) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 739);
sv._onTransEnd();
        }

        // Otherwise, animate to the next frame
        else {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 744);
if (flickAxis === DIM_X && svAxisX) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 745);
if (newX < minX || newX > maxX) {
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 746);
velocity *= bounce;
                }
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 748);
sv.set(SCROLL_X, newX);
            }
            else {_yuitest_coverline("build/scrollview-base/scrollview-base.js", 750);
if (flickAxis === DIM_Y && svAxisY) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 751);
if (newY < minY || newY > maxY) {
                    _yuitest_coverline("build/scrollview-base/scrollview-base.js", 752);
velocity *= bounce;
                }
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 754);
sv.set(SCROLL_Y, newY);
            }}

            // TODO: maybe use requestAnimationFrame instead
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 758);
sv._flickAnim = Y.later(step, sv, '_flickFrame', [velocity]);
        }}
    },

    /**
     * Handle mousewheel events on the widget
     *
     * @method _mousewheel
     * @param e {Event.Facade} The mousewheel event facade
     * @private
     */
    _mousewheel: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_mousewheel", 769);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 770);
var sv = this,
            scrollY = sv.get(SCROLL_Y),
            bb = sv._bb,
            scrollOffset = 10, // 10px
            isForward = (e.wheelDelta > 0),
            scrollToY = scrollY - ((isForward ? 1 : -1) * scrollOffset);

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 777);
scrollToY = _constrain(scrollToY, sv._minScrollY, sv._maxScrollY);

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 779);
if (bb.contains(e.target)) {
            // Jump to the new offset
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 781);
sv.set(SCROLL_Y, scrollToY);

            // if we have scrollbars plugin, update & set the flash timer on the scrollbar
            // TODO: This probably shouldn't be in this module
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 785);
if (sv.scrollbars) {
                // TODO: The scrollbars should handle this themselves
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 787);
sv.scrollbars._update();
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 788);
sv.scrollbars.flash();
                // or just this
                // sv.scrollbars._hostDimensionsChange();
            }

            // Fire the 'scrollEnd' event
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 794);
sv._onTransEnd();

            // prevent browser default behavior on mouse scroll
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 797);
e.preventDefault();
        }
    },

    /**
     * Checks to see the current scrollX/scrollY position is out of bounds
     *
     * @method _isOOB
     * @returns {boolen} Whether the current X/Y position is out of bounds (true) or not (false)
     * @private
     */
    _isOOB: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_isOOB", 808);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 809);
var sv = this,
            svAxis = sv.axis,
            svAxisX = svAxis.x,
            svAxisY = svAxis.y,
            currentX = sv.get(SCROLL_X),
            currentY = sv.get(SCROLL_Y),
            minX = sv._minScrollX,
            minY = sv._minScrollY,
            maxX = sv._maxScrollX,
            maxY = sv._maxScrollY;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 820);
return (svAxisX && (currentX < minX || currentX > maxX)) || (svAxisY && (currentY < minY || currentY > maxY));
    },

    /**
     * Bounces back
     * @TODO: Should be more generalized and support both X and Y detection
     *
     * @method _snapBack
     * @private
     */
    _snapBack: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_snapBack", 830);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 831);
var sv = this,
            currentX = sv.get(SCROLL_X),
            currentY = sv.get(SCROLL_Y),
            minX = sv._minScrollX,
            minY = sv._minScrollY,
            maxX = sv._maxScrollX,
            maxY = sv._maxScrollY,
            newY = _constrain(currentY, minY, maxY),
            newX = _constrain(currentX, minX, maxX),
            duration = ScrollView.SNAP_DURATION;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 842);
if (newX !== currentX) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 843);
sv.set(SCROLL_X, newX, {duration:duration});
        }
        else {_yuitest_coverline("build/scrollview-base/scrollview-base.js", 845);
if (newY !== currentY) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 846);
sv.set(SCROLL_Y, newY, {duration:duration});
        }
        else {
            // It shouldn't ever get here, but in case it does, fire scrollEnd
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 850);
sv._onTransEnd();
        }}
    },

    /**
     * After listener for changes to the scrollX or scrollY attribute
     *
     * @method _afterScrollChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterScrollChange: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterScrollChange", 861);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 862);
var sv = this,
            duration = e.duration,
            easing = e.easing,
            val = e.newVal,
            scrollToArgs = [];

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 868);
if (e.src !== ScrollView.UI_SRC) {

            // Generate the array of args to pass to scrollTo()
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 871);
if (e.attrName === SCROLL_X) {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 872);
scrollToArgs.push(val);
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 873);
scrollToArgs.push(sv.get(SCROLL_Y));
            }
            else {
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 876);
scrollToArgs.push(sv.get(SCROLL_X));
                _yuitest_coverline("build/scrollview-base/scrollview-base.js", 877);
scrollToArgs.push(val);
            }

            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 880);
scrollToArgs.push(duration);
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 881);
scrollToArgs.push(easing);

            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 883);
sv.scrollTo.apply(sv, scrollToArgs);
        }
    },

    /**
     * After listener for changes to the flick attribute
     *
     * @method _afterFlickChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterFlickChange: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterFlickChange", 894);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 895);
this._bindFlick(e.newVal);
    },

    /**
     * After listener for changes to the disabled attribute
     *
     * @method _afterDisabledChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterDisabledChange: function (e) {
        // Cache for performance - we check during move
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterDisabledChange", 905);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 907);
this._cDisabled = e.newVal;
    },

    /**
     * After listener for changes to the drag attribute
     *
     * @method _afterDragChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterDragChange: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterDragChange", 917);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 918);
this._bindDrag(e.newVal);
    },

    /**
     * After listener for changes to the drag attribute
     *
     * @method _afterDragChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterMousewheelChange: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterMousewheelChange", 928);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 929);
this._bindMousewheel(e.newVal);
    },

    /**
     * After listener for the height or width attribute
     *
     * @method _afterDimChange
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterDimChange: function () {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterDimChange", 939);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 940);
this._uiDimensionsChange();
    },

    /**
     * After listener for scrollEnd, for cleanup
     *
     * @method _afterScrollEnd
     * @param e {Event.Facade} The event facade
     * @protected
     */
    _afterScrollEnd: function (e) {
        _yuitest_coverfunc("build/scrollview-base/scrollview-base.js", "_afterScrollEnd", 950);
_yuitest_coverline("build/scrollview-base/scrollview-base.js", 951);
var sv = this,
            gesture = sv._gesture;

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 954);
if (gesture && gesture.onGestureMove && gesture.onGestureMove.detach) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 955);
gesture.onGestureMove.detach();
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 958);
if (gesture && gesture.onGestureMoveEnd && gesture.onGestureMoveEnd.detach) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 959);
gesture.onGestureMoveEnd.detach();
        }

        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 962);
if (sv._flickAnim) {
            _yuitest_coverline("build/scrollview-base/scrollview-base.js", 963);
sv._flickAnim.cancel(); // Might as well?
        }
        
        _yuitest_coverline("build/scrollview-base/scrollview-base.js", 966);
delete sv._flickAnim;

        // Ideally this should be removed, but doing so causing some JS errors with fast swiping 
        // because _gesture is being deleted after the previous one has been overwritten
        // delete sv._gesture; // TODO: Move to sv.prevGesture?
    }
    
    // End prototype properties

}, {

    // Static properties

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
            value: 0
        },

        /**
         * The scroll position in the x-axis
         *
         * @attribute scrollX
         * @type Number
         * @default 0
         */
        scrollX: {
            value: 0
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
        },

        /**
         * Enable/Disable scrolling the ScrollView content via mousewheel
         * @attribute mousewheel
         * @type boolean
         * @default true
         */
        mousewheel: {
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
     * @default 'ui'
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
    BOUNCE_RANGE: 150,

    /**
     * The interval used when animating the flick
     *
     * @property FRAME_STEP
     * @type Number
     * @static
     * @default 16
     */
    FRAME_STEP: 16,

    /**
     * The default easing used when animating the flick
     *
     * @property EASING
     * @type String
     * @static
     * @default 'cubic-bezier(0, 0.1, 0, 1.0)'
     */
    EASING: 'cubic-bezier(0, 0.1, 0, 1.0)',

    /**
     * The default easing to use when animating the bounce snap back.
     *
     * @property SNAP_EASING
     * @type String
     * @static
     * @default 'ease-out'
     */
    SNAP_EASING: 'ease-out',

    /**
     * The default duration to use when animating the bounce snap back.
     *
     * @property SNAP_DURATION
     * @type Number
     * @static
     * @default 400
     */
    SNAP_DURATION: 400,

    /**
     * Object map of style property names used to set transition properties.
     * Defaults to the vendor prefix established by the Transition module.
     * The configured property names are `_TRANSITION.DURATION` (e.g. "WebkitTransitionDuration") and
     * `_TRANSITION.PROPERTY (e.g. "WebkitTransitionProperty").
     *
     * @property _TRANSITION
     * @private
     */
    _TRANSITION: {
        DURATION: Y.Transition._VENDOR_PREFIX + 'TransitionDuration',
        PROPERTY: Y.Transition._VENDOR_PREFIX + 'TransitionProperty'
    }

    // End static properties

});

}, '@VERSION@', {"requires": ["widget", "event-gestures", "event-mousewheel", "transition"], "skinnable": true});
