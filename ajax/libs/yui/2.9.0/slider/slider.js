/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
/**
 * The Slider component is a UI control that enables the user to adjust 
 * values in a finite range along one or two axes. Typically, the Slider 
 * control is used in a web application as a rich, visual replacement 
 * for an input box that takes a number as input. The Slider control can 
 * also easily accommodate a second dimension, providing x,y output for 
 * a selection point chosen from a rectangular region.
 *
 * @module    slider
 * @title     Slider Widget
 * @namespace YAHOO.widget
 * @requires  yahoo,dom,dragdrop,event
 * @optional  animation
 */
 (function () {

var getXY = YAHOO.util.Dom.getXY,
    Event = YAHOO.util.Event,
    _AS   = Array.prototype.slice;

/**
 * A DragDrop implementation that can be used as a background for a
 * slider.  It takes a reference to the thumb instance 
 * so it can delegate some of the events to it.  The goal is to make the 
 * thumb jump to the location on the background when the background is 
 * clicked.  
 *
 * @class Slider
 * @extends YAHOO.util.DragDrop
 * @uses YAHOO.util.EventProvider
 * @constructor
 * @param {String}      id     The id of the element linked to this instance
 * @param {String}      sGroup The group of related DragDrop items
 * @param {SliderThumb} oThumb The thumb for this slider
 * @param {String}      sType  The type of slider (horiz, vert, region)
 */
function Slider(sElementId, sGroup, oThumb, sType) {

    Slider.ANIM_AVAIL = (!YAHOO.lang.isUndefined(YAHOO.util.Anim));

    if (sElementId) {
        this.init(sElementId, sGroup, true);
        this.initSlider(sType);
        this.initThumb(oThumb);
    }
}

YAHOO.lang.augmentObject(Slider,{
    /**
     * Factory method for creating a horizontal slider
     * @method YAHOO.widget.Slider.getHorizSlider
     * @static
     * @param {String} sBGElId the id of the slider's background element
     * @param {String} sHandleElId the id of the thumb element
     * @param {int} iLeft the number of pixels the element can move left
     * @param {int} iRight the number of pixels the element can move right
     * @param {int} iTickSize optional parameter for specifying that the element 
     * should move a certain number pixels at a time.
     * @return {Slider} a horizontal slider control
     */
    getHorizSlider : 
        function (sBGElId, sHandleElId, iLeft, iRight, iTickSize) {
            return new Slider(sBGElId, sBGElId, 
                new YAHOO.widget.SliderThumb(sHandleElId, sBGElId, 
                                   iLeft, iRight, 0, 0, iTickSize), "horiz");
    },

    /**
     * Factory method for creating a vertical slider
     * @method YAHOO.widget.Slider.getVertSlider
     * @static
     * @param {String} sBGElId the id of the slider's background element
     * @param {String} sHandleElId the id of the thumb element
     * @param {int} iUp the number of pixels the element can move up
     * @param {int} iDown the number of pixels the element can move down
     * @param {int} iTickSize optional parameter for specifying that the element 
     * should move a certain number pixels at a time.
     * @return {Slider} a vertical slider control
     */
    getVertSlider :
        function (sBGElId, sHandleElId, iUp, iDown, iTickSize) {
            return new Slider(sBGElId, sBGElId, 
                new YAHOO.widget.SliderThumb(sHandleElId, sBGElId, 0, 0, 
                                   iUp, iDown, iTickSize), "vert");
    },

    /**
     * Factory method for creating a slider region like the one in the color
     * picker example
     * @method YAHOO.widget.Slider.getSliderRegion
     * @static
     * @param {String} sBGElId the id of the slider's background element
     * @param {String} sHandleElId the id of the thumb element
     * @param {int} iLeft the number of pixels the element can move left
     * @param {int} iRight the number of pixels the element can move right
     * @param {int} iUp the number of pixels the element can move up
     * @param {int} iDown the number of pixels the element can move down
     * @param {int} iTickSize optional parameter for specifying that the element 
     * should move a certain number pixels at a time.
     * @return {Slider} a slider region control
     */
    getSliderRegion : 
        function (sBGElId, sHandleElId, iLeft, iRight, iUp, iDown, iTickSize) {
            return new Slider(sBGElId, sBGElId, 
                new YAHOO.widget.SliderThumb(sHandleElId, sBGElId, iLeft, iRight, 
                                   iUp, iDown, iTickSize), "region");
    },

    /**
     * Constant for valueChangeSource, indicating that the user clicked or
     * dragged the slider to change the value.
     * @property Slider.SOURCE_UI_EVENT
     * @final
     * @static
     * @default 1
     */
    SOURCE_UI_EVENT : 1,

    /**
     * Constant for valueChangeSource, indicating that the value was altered
     * by a programmatic call to setValue/setRegionValue.
     * @property Slider.SOURCE_SET_VALUE
     * @final
     * @static
     * @default 2
     */
    SOURCE_SET_VALUE : 2,

    /**
     * Constant for valueChangeSource, indicating that the value was altered
     * by hitting any of the supported keyboard characters.
     * @property Slider.SOURCE_KEY_EVENT
     * @final
     * @static
     * @default 2
     */
    SOURCE_KEY_EVENT : 3,

    /**
     * By default, animation is available if the animation utility is detected.
     * @property Slider.ANIM_AVAIL
     * @static
     * @type boolean
     */
    ANIM_AVAIL : false
},true);

YAHOO.extend(Slider, YAHOO.util.DragDrop, {

    /**
     * Tracks the state of the mouse button to aid in when events are fired.
     *
     * @property _mouseDown
     * @type boolean
     * @default false
     * @private
     */
    _mouseDown : false,

    /**
     * Override the default setting of dragOnly to true.
     * @property dragOnly
     * @type boolean
     * @default true
     */
    dragOnly : true,

    /**
     * Initializes the slider.  Executed in the constructor
     * @method initSlider
     * @param {string} sType the type of slider (horiz, vert, region)
     */
    initSlider: function(sType) {

        /**
         * The type of the slider (horiz, vert, region)
         * @property type
         * @type string
         */
        this.type = sType;

        //this.removeInvalidHandleType("A");


        /**
         * Event the fires when the value of the control changes.  If 
         * the control is animated the event will fire every point
         * along the way.
         * @event change
         * @param {int} newOffset|x the new offset for normal sliders, or the new
         *                          x offset for region sliders
         * @param {int} y the number of pixels the thumb has moved on the y axis
         *                (region sliders only)
         */
        this.createEvent("change", this);

        /**
         * Event that fires at the beginning of a slider thumb move.
         * @event slideStart
         */
        this.createEvent("slideStart", this);

        /**
         * Event that fires at the end of a slider thumb move
         * @event slideEnd
         */
        this.createEvent("slideEnd", this);

        /**
         * Overrides the isTarget property in YAHOO.util.DragDrop
         * @property isTarget
         * @private
         */
        this.isTarget = false;
    
        /**
         * Flag that determines if the thumb will animate when moved
         * @property animate
         * @type boolean
         */
        this.animate = Slider.ANIM_AVAIL;

        /**
         * Set to false to disable a background click thumb move
         * @property backgroundEnabled
         * @type boolean
         */
        this.backgroundEnabled = true;

        /**
         * Adjustment factor for tick animation, the more ticks, the
         * faster the animation (by default)
         * @property tickPause
         * @type int
         */
        this.tickPause = 40;

        /**
         * Enables the arrow, home and end keys, defaults to true.
         * @property enableKeys
         * @type boolean
         */
        this.enableKeys = true;

        /**
         * Specifies the number of pixels the arrow keys will move the slider.
         * Default is 20.
         * @property keyIncrement
         * @type int
         */
        this.keyIncrement = 20;

        /**
         * moveComplete is set to true when the slider has moved to its final
         * destination.  For animated slider, this value can be checked in 
         * the onChange handler to make it possible to execute logic only
         * when the move is complete rather than at all points along the way.
         * Deprecated because this flag is only useful when the background is
         * clicked and the slider is animated.  If the user drags the thumb,
         * the flag is updated when the drag is over ... the final onDrag event
         * fires before the mouseup the ends the drag, so the implementer will
         * never see it.
         *
         * @property moveComplete
         * @type Boolean
         * @deprecated use the slideEnd event instead
         */
        this.moveComplete = true;

        /**
         * If animation is configured, specifies the length of the animation
         * in seconds.
         * @property animationDuration
         * @type int
         * @default 0.2
         */
        this.animationDuration = 0.2;

        /**
         * Constant for valueChangeSource, indicating that the user clicked or
         * dragged the slider to change the value.
         * @property SOURCE_UI_EVENT
         * @final
         * @default 1
         * @deprecated use static Slider.SOURCE_UI_EVENT
         */
        this.SOURCE_UI_EVENT = 1;

        /**
         * Constant for valueChangeSource, indicating that the value was altered
         * by a programmatic call to setValue/setRegionValue.
         * @property SOURCE_SET_VALUE
         * @final
         * @default 2
         * @deprecated use static Slider.SOURCE_SET_VALUE
         */
        this.SOURCE_SET_VALUE = 2;

        /**
         * When the slider value changes, this property is set to identify where
         * the update came from.  This will be either 1, meaning the slider was
         * clicked or dragged, or 2, meaning that it was set via a setValue() call.
         * This can be used within event handlers to apply some of the logic only
         * when dealing with one source or another.
         * @property valueChangeSource
         * @type int
         * @since 2.3.0
         */
        this.valueChangeSource = 0;

        /**
         * Indicates whether or not events will be supressed for the current
         * slide operation
         * @property _silent
         * @type boolean
         * @private
         */
        this._silent = false;

        /**
         * Saved offset used to protect against NaN problems when slider is
         * set to display:none
         * @property lastOffset
         * @type [int, int]
         */
        this.lastOffset = [0,0];
    },

    /**
     * Initializes the slider's thumb. Executed in the constructor.
     * @method initThumb
     * @param {YAHOO.widget.SliderThumb} t the slider thumb
     */
    initThumb: function(t) {

        var self = this;

        /**
         * A YAHOO.widget.SliderThumb instance that we will use to 
         * reposition the thumb when the background is clicked
         * @property thumb
         * @type YAHOO.widget.SliderThumb
         */
        this.thumb = t;

        t.cacheBetweenDrags = true;

        if (t._isHoriz && t.xTicks && t.xTicks.length) {
            this.tickPause = Math.round(360 / t.xTicks.length);
        } else if (t.yTicks && t.yTicks.length) {
            this.tickPause = Math.round(360 / t.yTicks.length);
        }


        // delegate thumb methods
        t.onAvailable = function() { 
                return self.setStartSliderState(); 
            };
        t.onMouseDown = function () { 
                self._mouseDown = true;
                return self.focus(); 
            };
        t.startDrag = function() { 
                self._slideStart(); 
            };
        t.onDrag = function() { 
                self.fireEvents(true); 
            };
        t.onMouseUp = function() { 
                self.thumbMouseUp(); 
            };

    },

    /**
     * Executed when the slider element is available
     * @method onAvailable
     */
    onAvailable: function() {
        this._bindKeyEvents();
    },
 
    /**
     * Sets up the listeners for keydown and key press events.
     *
     * @method _bindKeyEvents
     * @protected
     */
    _bindKeyEvents : function () {
        Event.on(this.id, "keydown",  this.handleKeyDown,  this, true);
        Event.on(this.id, "keypress", this.handleKeyPress, this, true);
    },

    /**
     * Executed when a keypress event happens with the control focused.
     * Prevents the default behavior for navigation keys.  The actual
     * logic for moving the slider thumb in response to a key event
     * happens in handleKeyDown.
     * @param {Event} e the keypress event
     */
    handleKeyPress: function(e) {
        if (this.enableKeys) {
            var kc = Event.getCharCode(e);

            switch (kc) {
                case 0x25: // left
                case 0x26: // up
                case 0x27: // right
                case 0x28: // down
                case 0x24: // home
                case 0x23: // end
                    Event.preventDefault(e);
                    break;
                default:
            }
        }
    },

    /**
     * Executed when a keydown event happens with the control focused.
     * Updates the slider value and display when the keypress is an
     * arrow key, home, or end as long as enableKeys is set to true.
     * @param {Event} e the keydown event
     */
    handleKeyDown: function(e) {
        if (this.enableKeys) {
            var kc = Event.getCharCode(e),
                t  = this.thumb,
                h  = this.getXValue(),
                v  = this.getYValue(),
                changeValue = true;

            switch (kc) {

                // left
                case 0x25: h -= this.keyIncrement; break;

                // up
                case 0x26: v -= this.keyIncrement; break;

                // right
                case 0x27: h += this.keyIncrement; break;

                // down
                case 0x28: v += this.keyIncrement; break;

                // home
                case 0x24: h = t.leftConstraint;    
                           v = t.topConstraint;    
                           break;

                // end
                case 0x23: h = t.rightConstraint; 
                           v = t.bottomConstraint;    
                           break;

                default:   changeValue = false;
            }

            if (changeValue) {
                if (t._isRegion) {
                    this._setRegionValue(Slider.SOURCE_KEY_EVENT, h, v, true);
                } else {
                    this._setValue(Slider.SOURCE_KEY_EVENT,
                        (t._isHoriz ? h : v), true);
                }
                Event.stopEvent(e);
            }

        }
    },

    /**
     * Initialization that sets up the value offsets once the elements are ready
     * @method setStartSliderState
     */
    setStartSliderState: function() {


        this.setThumbCenterPoint();

        /**
         * The basline position of the background element, used
         * to determine if the background has moved since the last
         * operation.
         * @property baselinePos
         * @type [int, int]
         */
        this.baselinePos = getXY(this.getEl());

        this.thumb.startOffset = this.thumb.getOffsetFromParent(this.baselinePos);

        if (this.thumb._isRegion) {
            if (this.deferredSetRegionValue) {
                this._setRegionValue.apply(this, this.deferredSetRegionValue);
                this.deferredSetRegionValue = null;
            } else {
                this.setRegionValue(0, 0, true, true, true);
            }
        } else {
            if (this.deferredSetValue) {
                this._setValue.apply(this, this.deferredSetValue);
                this.deferredSetValue = null;
            } else {
                this.setValue(0, true, true, true);
            }
        }
    },

    /**
     * When the thumb is available, we cache the centerpoint of the element so
     * we can position the element correctly when the background is clicked
     * @method setThumbCenterPoint
     */
    setThumbCenterPoint: function() {

        var el = this.thumb.getEl();

        if (el) {
            /**
             * The center of the slider element is stored so we can 
             * place it in the correct position when the background is clicked.
             * @property thumbCenterPoint
             * @type {"x": int, "y": int}
             */
            this.thumbCenterPoint = { 
                    x: parseInt(el.offsetWidth/2, 10), 
                    y: parseInt(el.offsetHeight/2, 10) 
            };
        }

    },

    /**
     * Locks the slider, overrides YAHOO.util.DragDrop
     * @method lock
     */
    lock: function() {
        this.thumb.lock();
        this.locked = true;
    },

    /**
     * Unlocks the slider, overrides YAHOO.util.DragDrop
     * @method unlock
     */
    unlock: function() {
        this.thumb.unlock();
        this.locked = false;
    },

    /**
     * Handles mouseup event on the thumb
     * @method thumbMouseUp
     * @private
     */
    thumbMouseUp: function() {
        this._mouseDown = false;
        if (!this.isLocked()) {
            this.endMove();
        }

    },

    onMouseUp: function() {
        this._mouseDown = false;
        if (this.backgroundEnabled && !this.isLocked()) {
            this.endMove();
        }
    },

    /**
     * Returns a reference to this slider's thumb
     * @method getThumb
     * @return {SliderThumb} this slider's thumb
     */
    getThumb: function() {
        return this.thumb;
    },

    /**
     * Try to focus the element when clicked so we can add
     * accessibility features
     * @method focus
     * @private
     */
    focus: function() {
        this.valueChangeSource = Slider.SOURCE_UI_EVENT;

        // Focus the background element if possible
        var el = this.getEl();

        if (el.focus) {
            try {
                el.focus();
            } catch(e) {
                // Prevent permission denied unhandled exception in FF that can
                // happen when setting focus while another element is handling
                // the blur.  @TODO this is still writing to the error log 
                // (unhandled error) in FF1.5 with strict error checking on.
            }
        }

        this.verifyOffset();

        return !this.isLocked();
    },

    /**
     * Event that fires when the value of the slider has changed
     * @method onChange
     * @param {int} firstOffset the number of pixels the thumb has moved
     * from its start position. Normal horizontal and vertical sliders will only
     * have the firstOffset.  Regions will have both, the first is the horizontal
     * offset, the second the vertical.
     * @param {int} secondOffset the y offset for region sliders
     * @deprecated use instance.subscribe("change") instead
     */
    onChange: function (firstOffset, secondOffset) { 
        /* override me */ 
    },

    /**
     * Event that fires when the at the beginning of the slider thumb move
     * @method onSlideStart
     * @deprecated use instance.subscribe("slideStart") instead
     */
    onSlideStart: function () { 
        /* override me */ 
    },

    /**
     * Event that fires at the end of a slider thumb move
     * @method onSliderEnd
     * @deprecated use instance.subscribe("slideEnd") instead
     */
    onSlideEnd: function () { 
        /* override me */ 
    },

    /**
     * Returns the slider's thumb offset from the start position
     * @method getValue
     * @return {int} the current value
     */
    getValue: function () { 
        return this.thumb.getValue();
    },

    /**
     * Returns the slider's thumb X offset from the start position
     * @method getXValue
     * @return {int} the current horizontal offset
     */
    getXValue: function () { 
        return this.thumb.getXValue();
    },

    /**
     * Returns the slider's thumb Y offset from the start position
     * @method getYValue
     * @return {int} the current vertical offset
     */
    getYValue: function () { 
        return this.thumb.getYValue();
    },

    /**
     * Provides a way to set the value of the slider in code.
     *
     * @method setValue
     * @param {int} newOffset the number of pixels the thumb should be
     * positioned away from the initial start point 
     * @param {boolean} skipAnim set to true to disable the animation
     * for this move action (but not others).
     * @param {boolean} force ignore the locked setting and set value anyway
     * @param {boolean} silent when true, do not fire events
     * @return {boolean} true if the move was performed, false if it failed
     */
    setValue: function() {
        var args = _AS.call(arguments);
        args.unshift(Slider.SOURCE_SET_VALUE);
        return this._setValue.apply(this,args);
    },

    /**
     * Worker function to execute the value set operation.  Accepts type of
     * set operation in addition to the usual setValue params.
     *
     * @method _setValue
     * @param source {int} what triggered the set (e.g. Slider.SOURCE_SET_VALUE)
     * @param {int} newOffset the number of pixels the thumb should be
     * positioned away from the initial start point 
     * @param {boolean} skipAnim set to true to disable the animation
     * for this move action (but not others).
     * @param {boolean} force ignore the locked setting and set value anyway
     * @param {boolean} silent when true, do not fire events
     * @return {boolean} true if the move was performed, false if it failed
     * @protected
     */
    _setValue: function(source, newOffset, skipAnim, force, silent) {
        var t = this.thumb, newX, newY;

        if (!t.available) {
            this.deferredSetValue = arguments;
            return false;
        }

        if (this.isLocked() && !force) {
            return false;
        }

        if ( isNaN(newOffset) ) {
            return false;
        }

        if (t._isRegion) {
            return false;
        }


        this._silent = silent;
        this.valueChangeSource = source || Slider.SOURCE_SET_VALUE;

        t.lastOffset = [newOffset, newOffset];
        this.verifyOffset();

        this._slideStart();

        if (t._isHoriz) {
            newX = t.initPageX + newOffset + this.thumbCenterPoint.x;
            this.moveThumb(newX, t.initPageY, skipAnim);
        } else {
            newY = t.initPageY + newOffset + this.thumbCenterPoint.y;
            this.moveThumb(t.initPageX, newY, skipAnim);
        }

        return true;
    },

    /**
     * Provides a way to set the value of the region slider in code.
     * @method setRegionValue
     * @param {int} newOffset the number of pixels the thumb should be
     * positioned away from the initial start point (x axis for region)
     * @param {int} newOffset2 the number of pixels the thumb should be
     * positioned away from the initial start point (y axis for region)
     * @param {boolean} skipAnim set to true to disable the animation
     * for this move action (but not others).
     * @param {boolean} force ignore the locked setting and set value anyway
     * @param {boolean} silent when true, do not fire events
     * @return {boolean} true if the move was performed, false if it failed
     */
    setRegionValue : function () {
        var args = _AS.call(arguments);
        args.unshift(Slider.SOURCE_SET_VALUE);
        return this._setRegionValue.apply(this,args);
    },

    /**
     * Worker function to execute the value set operation.  Accepts type of
     * set operation in addition to the usual setValue params.
     *
     * @method _setRegionValue
     * @param source {int} what triggered the set (e.g. Slider.SOURCE_SET_VALUE)
     * @param {int} newOffset the number of pixels the thumb should be
     * positioned away from the initial start point (x axis for region)
     * @param {int} newOffset2 the number of pixels the thumb should be
     * positioned away from the initial start point (y axis for region)
     * @param {boolean} skipAnim set to true to disable the animation
     * for this move action (but not others).
     * @param {boolean} force ignore the locked setting and set value anyway
     * @param {boolean} silent when true, do not fire events
     * @return {boolean} true if the move was performed, false if it failed
     * @protected
     */
    _setRegionValue: function(source, newOffset, newOffset2, skipAnim, force, silent) {
        var t = this.thumb, newX, newY;

        if (!t.available) {
            this.deferredSetRegionValue = arguments;
            return false;
        }

        if (this.isLocked() && !force) {
            return false;
        }

        if ( isNaN(newOffset) ) {
            return false;
        }

        if (!t._isRegion) {
            return false;
        }

        this._silent = silent;

        this.valueChangeSource = source || Slider.SOURCE_SET_VALUE;

        t.lastOffset = [newOffset, newOffset2];
        this.verifyOffset();

        this._slideStart();

        newX = t.initPageX + newOffset + this.thumbCenterPoint.x;
        newY = t.initPageY + newOffset2 + this.thumbCenterPoint.y;
        this.moveThumb(newX, newY, skipAnim);

        return true;
    },

    /**
     * Checks the background position element position.  If it has moved from the
     * baseline position, the constraints for the thumb are reset
     * @method verifyOffset
     * @return {boolean} True if the offset is the same as the baseline.
     */
    verifyOffset: function() {

        var xy = getXY(this.getEl()),
            t  = this.thumb;

        if (!this.thumbCenterPoint || !this.thumbCenterPoint.x) {
            this.setThumbCenterPoint();
        }

        if (xy) {


            if (xy[0] != this.baselinePos[0] || xy[1] != this.baselinePos[1]) {

                // Reset background
                this.setInitPosition();
                this.baselinePos = xy;

                // Reset thumb
                t.initPageX = this.initPageX + t.startOffset[0];
                t.initPageY = this.initPageY + t.startOffset[1];
                t.deltaSetXY = null;
                this.resetThumbConstraints();

                return false;
            }
        }

        return true;
    },

    /**
     * Move the associated slider moved to a timeout to try to get around the 
     * mousedown stealing moz does when I move the slider element between the 
     * cursor and the background during the mouseup event
     * @method moveThumb
     * @param {int} x the X coordinate of the click
     * @param {int} y the Y coordinate of the click
     * @param {boolean} skipAnim don't animate if the move happend onDrag
     * @param {boolean} midMove set to true if this is not terminating
     * the slider movement
     * @private
     */
    moveThumb: function(x, y, skipAnim, midMove) {

        var t = this.thumb,
            self = this,
            p,_p,anim;

        if (!t.available) {
            return;
        }


        t.setDelta(this.thumbCenterPoint.x, this.thumbCenterPoint.y);

        _p = t.getTargetCoord(x, y);
        p = [Math.round(_p.x), Math.round(_p.y)];

        if (this.animate && t._graduated && !skipAnim) {
            this.lock();

            // cache the current thumb pos
            this.curCoord = getXY(this.thumb.getEl());
            this.curCoord = [Math.round(this.curCoord[0]), Math.round(this.curCoord[1])];

            setTimeout( function() { self.moveOneTick(p); }, this.tickPause );

        } else if (this.animate && Slider.ANIM_AVAIL && !skipAnim) {

            this.lock();

            anim = new YAHOO.util.Motion( 
                    t.id, { points: { to: p } }, 
                    this.animationDuration, 
                    YAHOO.util.Easing.easeOut );

            anim.onComplete.subscribe( function() { 
                    self.unlock();
                    if (!self._mouseDown) {
                        self.endMove(); 
                    }
                });
            anim.animate();

        } else {
            t.setDragElPos(x, y);
            if (!midMove && !this._mouseDown) {
                this.endMove();
            }
        }
    },

    _slideStart: function() {
        if (!this._sliding) {
            if (!this._silent) {
                this.onSlideStart();
                this.fireEvent("slideStart");
            }
            this._sliding = true;
            this.moveComplete = false; // for backward compatibility. Deprecated
        }
    },

    _slideEnd: function() {
        if (this._sliding) {
            // Reset state before firing slideEnd
            var silent = this._silent;
            this._sliding = false;
            this.moveComplete = true; // for backward compatibility. Deprecated
            this._silent = false;
            if (!silent) {
                this.onSlideEnd();
                this.fireEvent("slideEnd");
            }
        }
    },

    /**
     * Move the slider one tick mark towards its final coordinate.  Used
     * for the animation when tick marks are defined
     * @method moveOneTick
     * @param {int[]} the destination coordinate
     * @private
     */
    moveOneTick: function(finalCoord) {

        var t = this.thumb,
            self = this,
            nextCoord = null,
            tmpX, tmpY;

        if (t._isRegion) {
            nextCoord = this._getNextX(this.curCoord, finalCoord);
            tmpX = (nextCoord !== null) ? nextCoord[0] : this.curCoord[0];
            nextCoord = this._getNextY(this.curCoord, finalCoord);
            tmpY = (nextCoord !== null) ? nextCoord[1] : this.curCoord[1];

            nextCoord = tmpX !== this.curCoord[0] || tmpY !== this.curCoord[1] ?
                [ tmpX, tmpY ] : null;
        } else if (t._isHoriz) {
            nextCoord = this._getNextX(this.curCoord, finalCoord);
        } else {
            nextCoord = this._getNextY(this.curCoord, finalCoord);
        }


        if (nextCoord) {

            // cache the position
            this.curCoord = nextCoord;

            // move to the next coord
            this.thumb.alignElWithMouse(t.getEl(), nextCoord[0] + this.thumbCenterPoint.x, nextCoord[1] + this.thumbCenterPoint.y);
            
            // check if we are in the final position, if not make a recursive call
            if (!(nextCoord[0] == finalCoord[0] && nextCoord[1] == finalCoord[1])) {
                setTimeout(function() { self.moveOneTick(finalCoord); }, 
                        this.tickPause);
            } else {
                this.unlock();
                if (!this._mouseDown) {
                    this.endMove();
                }
            }
        } else {
            this.unlock();
            if (!this._mouseDown) {
                this.endMove();
            }
        }
    },

    /**
     * Returns the next X tick value based on the current coord and the target coord.
     * @method _getNextX
     * @private
     */
    _getNextX: function(curCoord, finalCoord) {
        var t = this.thumb,
            thresh,
            tmp = [],
            nextCoord = null;

        if (curCoord[0] > finalCoord[0]) {
            thresh = t.tickSize - this.thumbCenterPoint.x;
            tmp = t.getTargetCoord( curCoord[0] - thresh, curCoord[1] );
            nextCoord = [tmp.x, tmp.y];
        } else if (curCoord[0] < finalCoord[0]) {
            thresh = t.tickSize + this.thumbCenterPoint.x;
            tmp = t.getTargetCoord( curCoord[0] + thresh, curCoord[1] );
            nextCoord = [tmp.x, tmp.y];
        } else {
            // equal, do nothing
        }

        return nextCoord;
    },

    /**
     * Returns the next Y tick value based on the current coord and the target coord.
     * @method _getNextY
     * @private
     */
    _getNextY: function(curCoord, finalCoord) {
        var t = this.thumb,
            thresh,
            tmp = [],
            nextCoord = null;

        if (curCoord[1] > finalCoord[1]) {
            thresh = t.tickSize - this.thumbCenterPoint.y;
            tmp = t.getTargetCoord( curCoord[0], curCoord[1] - thresh );
            nextCoord = [tmp.x, tmp.y];
        } else if (curCoord[1] < finalCoord[1]) {
            thresh = t.tickSize + this.thumbCenterPoint.y;
            tmp = t.getTargetCoord( curCoord[0], curCoord[1] + thresh );
            nextCoord = [tmp.x, tmp.y];
        } else {
            // equal, do nothing
        }

        return nextCoord;
    },

    /**
     * Resets the constraints before moving the thumb.
     * @method b4MouseDown
     * @private
     */
    b4MouseDown: function(e) {
        if (!this.backgroundEnabled) {
            return false;
        }

        this.thumb.autoOffset();
        this.baselinePos = [];
    },

    /**
     * Handles the mousedown event for the slider background
     * @method onMouseDown
     * @private
     */
    onMouseDown: function(e) {
        if (!this.backgroundEnabled || this.isLocked()) {
            return false;
        }

        this._mouseDown = true;

        var x = Event.getPageX(e),
            y = Event.getPageY(e);


        this.focus();
        this._slideStart();
        this.moveThumb(x, y);
    },

    /**
     * Handles the onDrag event for the slider background
     * @method onDrag
     * @private
     */
    onDrag: function(e) {
        if (this.backgroundEnabled && !this.isLocked()) {
            var x = Event.getPageX(e),
                y = Event.getPageY(e);
            this.moveThumb(x, y, true, true);
            this.fireEvents();
        }
    },

    /**
     * Fired when the slider movement ends
     * @method endMove
     * @private
     */
    endMove: function () {
        this.unlock();
        this.fireEvents();
        this._slideEnd();
    },

    /**
     * Resets the X and Y contraints for the thumb.  Used in lieu of the thumb
     * instance's inherited resetConstraints because some logic was not
     * applicable.
     * @method resetThumbConstraints
     * @protected
     */
    resetThumbConstraints: function () {
        var t = this.thumb;

        t.setXConstraint(t.leftConstraint, t.rightConstraint, t.xTickSize);
        t.setYConstraint(t.topConstraint, t.bottomConstraint, t.xTickSize);
    },

    /**
     * Fires the change event if the value has been changed.  Ignored if we are in
     * the middle of an animation as the event will fire when the animation is
     * complete
     * @method fireEvents
     * @param {boolean} thumbEvent set to true if this event is fired from an event
     *                  that occurred on the thumb.  If it is, the state of the
     *                  thumb dd object should be correct.  Otherwise, the event
     *                  originated on the background, so the thumb state needs to
     *                  be refreshed before proceeding.
     * @private
     */
    fireEvents: function (thumbEvent) {

        var t = this.thumb, newX, newY, newVal;

        if (!thumbEvent) {
            t.cachePosition();
        }

        if (! this.isLocked()) {
            if (t._isRegion) {
                newX = t.getXValue();
                newY = t.getYValue();

                if (newX != this.previousX || newY != this.previousY) {
                    if (!this._silent) {
                        this.onChange(newX, newY);
                        this.fireEvent("change", { x: newX, y: newY });
                    }
                }

                this.previousX = newX;
                this.previousY = newY;

            } else {
                newVal = t.getValue();
                if (newVal != this.previousVal) {
                    if (!this._silent) {
                        this.onChange( newVal );
                        this.fireEvent("change", newVal);
                    }
                }
                this.previousVal = newVal;
            }

        }
    },

    /**
     * Slider toString
     * @method toString
     * @return {string} string representation of the instance
     */
    toString: function () { 
        return ("Slider (" + this.type +") " + this.id);
    }

});

YAHOO.lang.augmentProto(Slider, YAHOO.util.EventProvider);

YAHOO.widget.Slider = Slider;
})();
/**
 * A drag and drop implementation to be used as the thumb of a slider.
 * @class SliderThumb
 * @extends YAHOO.util.DD
 * @constructor
 * @param {String} id the id of the slider html element
 * @param {String} sGroup the group of related DragDrop items
 * @param {int} iLeft the number of pixels the element can move left
 * @param {int} iRight the number of pixels the element can move right
 * @param {int} iUp the number of pixels the element can move up
 * @param {int} iDown the number of pixels the element can move down
 * @param {int} iTickSize optional parameter for specifying that the element 
 * should move a certain number pixels at a time.
 */
YAHOO.widget.SliderThumb = function(id, sGroup, iLeft, iRight, iUp, iDown, iTickSize) {

    if (id) {
        YAHOO.widget.SliderThumb.superclass.constructor.call(this, id, sGroup);

        /**
         * The id of the thumbs parent HTML element (the slider background 
         * element).
         * @property parentElId
         * @type string
         */
        this.parentElId = sGroup;
    }



    /**
     * Overrides the isTarget property in YAHOO.util.DragDrop
     * @property isTarget
     * @private
     */
    this.isTarget = false;

    /**
     * The tick size for this slider
     * @property tickSize
     * @type int
     * @private
     */
    this.tickSize = iTickSize;

    /**
     * Informs the drag and drop util that the offsets should remain when
     * resetting the constraints.  This preserves the slider value when
     * the constraints are reset
     * @property maintainOffset
     * @type boolean
     * @private
     */
    this.maintainOffset = true;

    this.initSlider(iLeft, iRight, iUp, iDown, iTickSize);

    /**
     * Turns off the autoscroll feature in drag and drop
     * @property scroll
     * @private
     */
    this.scroll = false;

}; 

YAHOO.extend(YAHOO.widget.SliderThumb, YAHOO.util.DD, {

    /**
     * The (X and Y) difference between the thumb location and its parent 
     * (the slider background) when the control is instantiated.
     * @property startOffset
     * @type [int, int]
     */
    startOffset: null,

    /**
     * Override the default setting of dragOnly to true.
     * @property dragOnly
     * @type boolean
     * @default true
     */
    dragOnly : true,

    /**
     * Flag used to figure out if this is a horizontal or vertical slider
     * @property _isHoriz
     * @type boolean
     * @private
     */
    _isHoriz: false,

    /**
     * Cache the last value so we can check for change
     * @property _prevVal
     * @type int
     * @private
     */
    _prevVal: 0,

    /**
     * The slider is _graduated if there is a tick interval defined
     * @property _graduated
     * @type boolean
     * @private
     */
    _graduated: false,


    /**
     * Returns the difference between the location of the thumb and its parent.
     * @method getOffsetFromParent
     * @param {[int, int]} parentPos Optionally accepts the position of the parent
     * @type [int, int]
     */
    getOffsetFromParent0: function(parentPos) {
        var myPos = YAHOO.util.Dom.getXY(this.getEl()),
            ppos  = parentPos || YAHOO.util.Dom.getXY(this.parentElId);

        return [ (myPos[0] - ppos[0]), (myPos[1] - ppos[1]) ];
    },

    getOffsetFromParent: function(parentPos) {

        var el = this.getEl(), newOffset,
            myPos,ppos,l,t,deltaX,deltaY,newLeft,newTop;

        if (!this.deltaOffset) {

            myPos = YAHOO.util.Dom.getXY(el);
            ppos  = parentPos || YAHOO.util.Dom.getXY(this.parentElId);

            newOffset = [ (myPos[0] - ppos[0]), (myPos[1] - ppos[1]) ];

            l = parseInt( YAHOO.util.Dom.getStyle(el, "left"), 10 );
            t = parseInt( YAHOO.util.Dom.getStyle(el, "top" ), 10 );

            deltaX = l - newOffset[0];
            deltaY = t - newOffset[1];

            if (isNaN(deltaX) || isNaN(deltaY)) {
            } else {
                this.deltaOffset = [deltaX, deltaY];
            }

        } else {
            newLeft = parseInt( YAHOO.util.Dom.getStyle(el, "left"), 10 );
            newTop  = parseInt( YAHOO.util.Dom.getStyle(el, "top" ), 10 );

            newOffset  = [newLeft + this.deltaOffset[0], newTop + this.deltaOffset[1]];
        }

        return newOffset;
    },

    /**
     * Set up the slider, must be called in the constructor of all subclasses
     * @method initSlider
     * @param {int} iLeft the number of pixels the element can move left
     * @param {int} iRight the number of pixels the element can move right
     * @param {int} iUp the number of pixels the element can move up
     * @param {int} iDown the number of pixels the element can move down
     * @param {int} iTickSize the width of the tick interval.
     */
    initSlider: function (iLeft, iRight, iUp, iDown, iTickSize) {
        this.initLeft = iLeft;
        this.initRight = iRight;
        this.initUp = iUp;
        this.initDown = iDown;

        this.setXConstraint(iLeft, iRight, iTickSize);
        this.setYConstraint(iUp, iDown, iTickSize);

        if (iTickSize && iTickSize > 1) {
            this._graduated = true;
        }

        this._isHoriz  = (iLeft || iRight); 
        this._isVert   = (iUp   || iDown);
        this._isRegion = (this._isHoriz && this._isVert); 

    },

    /**
     * Clear's the slider's ticks
     * @method clearTicks
     */
    clearTicks: function () {
        YAHOO.widget.SliderThumb.superclass.clearTicks.call(this);
        this.tickSize = 0;
        this._graduated = false;
    },


    /**
     * Gets the current offset from the element's start position in
     * pixels.
     * @method getValue
     * @return {int} the number of pixels (positive or negative) the
     * slider has moved from the start position.
     */
    getValue: function () {
        return (this._isHoriz) ? this.getXValue() : this.getYValue();
    },

    /**
     * Gets the current X offset from the element's start position in
     * pixels.
     * @method getXValue
     * @return {int} the number of pixels (positive or negative) the
     * slider has moved horizontally from the start position.
     */
    getXValue: function () {
        if (!this.available) { 
            return 0; 
        }
        var newOffset = this.getOffsetFromParent();
        if (YAHOO.lang.isNumber(newOffset[0])) {
            this.lastOffset = newOffset;
            return (newOffset[0] - this.startOffset[0]);
        } else {
            return (this.lastOffset[0] - this.startOffset[0]);
        }
    },

    /**
     * Gets the current Y offset from the element's start position in
     * pixels.
     * @method getYValue
     * @return {int} the number of pixels (positive or negative) the
     * slider has moved vertically from the start position.
     */
    getYValue: function () {
        if (!this.available) { 
            return 0; 
        }
        var newOffset = this.getOffsetFromParent();
        if (YAHOO.lang.isNumber(newOffset[1])) {
            this.lastOffset = newOffset;
            return (newOffset[1] - this.startOffset[1]);
        } else {
            return (this.lastOffset[1] - this.startOffset[1]);
        }
    },

    /**
     * Thumb toString
     * @method toString
     * @return {string} string representation of the instance
     */
    toString: function () { 
        return "SliderThumb " + this.id;
    },

    /**
     * The onchange event for the handle/thumb is delegated to the YAHOO.widget.Slider
     * instance it belongs to.
     * @method onChange
     * @private
     */
    onChange: function (x, y) { 
    }

});
/**
 * A slider with two thumbs, one that represents the min value and 
 * the other the max.  Actually a composition of two sliders, both with
 * the same background.  The constraints for each slider are adjusted
 * dynamically so that the min value of the max slider is equal or greater
 * to the current value of the min slider, and the max value of the min
 * slider is the current value of the max slider.
 * Constructor assumes both thumbs are positioned absolutely at the 0 mark on
 * the background.
 *
 * @namespace YAHOO.widget
 * @class DualSlider
 * @uses YAHOO.util.EventProvider
 * @constructor
 * @param {Slider} minSlider The Slider instance used for the min value thumb
 * @param {Slider} maxSlider The Slider instance used for the max value thumb
 * @param {int}    range The number of pixels the thumbs may move within
 * @param {Array}  initVals (optional) [min,max] Initial thumb placement
 */
(function () {

var Event = YAHOO.util.Event,
    YW = YAHOO.widget;

function DualSlider(minSlider, maxSlider, range, initVals) {

    var self  = this,
        ready = { min : false, max : false },
        minThumbOnMouseDown, maxThumbOnMouseDown;

    /**
     * A slider instance that keeps track of the lower value of the range.
     * <strong>read only</strong>
     * @property minSlider
     * @type Slider
     */
    this.minSlider = minSlider;

    /**
     * A slider instance that keeps track of the upper value of the range.
     * <strong>read only</strong>
     * @property maxSlider
     * @type Slider
     */
    this.maxSlider = maxSlider;

    /**
     * The currently active slider (min or max). <strong>read only</strong>
     * @property activeSlider
     * @type Slider
     */
    this.activeSlider = minSlider;

    /**
     * Is the DualSlider oriented horizontally or vertically?
     * <strong>read only</strong>
     * @property isHoriz
     * @type boolean
     */
    this.isHoriz = minSlider.thumb._isHoriz;

    //FIXME: this is horrible
    minThumbOnMouseDown = this.minSlider.thumb.onMouseDown;
    maxThumbOnMouseDown = this.maxSlider.thumb.onMouseDown;
    this.minSlider.thumb.onMouseDown = function() {
        self.activeSlider = self.minSlider;
        minThumbOnMouseDown.apply(this,arguments);
    };
    this.maxSlider.thumb.onMouseDown = function () {
        self.activeSlider = self.maxSlider;
        maxThumbOnMouseDown.apply(this,arguments);
    };

    this.minSlider.thumb.onAvailable = function () {
        minSlider.setStartSliderState();
        ready.min = true;
        if (ready.max) {
            self.fireEvent('ready',self);
        }
    };
    this.maxSlider.thumb.onAvailable = function () {
        maxSlider.setStartSliderState();
        ready.max = true;
        if (ready.min) {
            self.fireEvent('ready',self);
        }
    };

    // dispatch mousedowns to the active slider
    minSlider.onMouseDown =
    maxSlider.onMouseDown = function(e) {
        return this.backgroundEnabled && self._handleMouseDown(e);
    };

    // Fix the drag behavior so that only the active slider
    // follows the drag
    minSlider.onDrag =
    maxSlider.onDrag = function(e) {
        self._handleDrag(e);
    };

    // Likely only the minSlider's onMouseUp will be executed, but both are
    // overridden just to be safe
    minSlider.onMouseUp =
    maxSlider.onMouseUp = function (e) {
        self._handleMouseUp(e);
    };

    // Replace the _bindKeyEvents for the minSlider and remove that for the
    // maxSlider since they share the same bg element.
    minSlider._bindKeyEvents = function () {
        self._bindKeyEvents(this);
    };
    maxSlider._bindKeyEvents = function () {};

    // The core events for each slider are handled so we can expose a single
    // event for when the event happens on either slider
    minSlider.subscribe("change", this._handleMinChange, minSlider, this);
    minSlider.subscribe("slideStart", this._handleSlideStart, minSlider, this);
    minSlider.subscribe("slideEnd", this._handleSlideEnd, minSlider, this);

    maxSlider.subscribe("change", this._handleMaxChange, maxSlider, this);
    maxSlider.subscribe("slideStart", this._handleSlideStart, maxSlider, this);
    maxSlider.subscribe("slideEnd", this._handleSlideEnd, maxSlider, this);

    /**
     * Event that fires when the slider is finished setting up
     * @event ready
     * @param {DualSlider} dualslider the DualSlider instance
     */
    this.createEvent("ready", this);

    /**
     * Event that fires when either the min or max value changes
     * @event change
     * @param {DualSlider} dualslider the DualSlider instance
     */
    this.createEvent("change", this);

    /**
     * Event that fires when one of the thumbs begins to move
     * @event slideStart
     * @param {Slider} activeSlider the moving slider
     */
    this.createEvent("slideStart", this);

    /**
     * Event that fires when one of the thumbs finishes moving
     * @event slideEnd
     * @param {Slider} activeSlider the moving slider
     */
    this.createEvent("slideEnd", this);

    // Validate initial values
    initVals = YAHOO.lang.isArray(initVals) ? initVals : [0,range];
    initVals[0] = Math.min(Math.max(parseInt(initVals[0],10)|0,0),range);
    initVals[1] = Math.max(Math.min(parseInt(initVals[1],10)|0,range),0);
    // Swap initVals if min > max
    if (initVals[0] > initVals[1]) {
        initVals.splice(0,2,initVals[1],initVals[0]);
    }
    this.minVal = initVals[0];
    this.maxVal = initVals[1];

    // Set values so initial assignment when the slider thumbs are ready will
    // use these values
    this.minSlider.setValue(this.minVal,true,true,true);
    this.maxSlider.setValue(this.maxVal,true,true,true);

}

DualSlider.prototype = {

    /**
     * The current value of the min thumb. <strong>read only</strong>.
     * @property minVal
     * @type int
     */
    minVal : -1,

    /**
     * The current value of the max thumb. <strong>read only</strong>.
     * @property maxVal
     * @type int
     */
    maxVal : -1,

    /**
     * Pixel distance to maintain between thumbs.
     * @property minRange
     * @type int
     * @default 0
     */
    minRange : 0,

    /**
     * Executed when one of the sliders fires the slideStart event
     * @method _handleSlideStart
     * @private
     */
    _handleSlideStart: function(data, slider) {
        this.fireEvent("slideStart", slider);
    },

    /**
     * Executed when one of the sliders fires the slideEnd event
     * @method _handleSlideEnd
     * @private
     */
    _handleSlideEnd: function(data, slider) {
        this.fireEvent("slideEnd", slider);
    },

    /**
     * Overrides the onDrag method for both sliders
     * @method _handleDrag
     * @private
     */
    _handleDrag: function(e) {
        YW.Slider.prototype.onDrag.call(this.activeSlider, e);
    },

    /**
     * Executed when the min slider fires the change event
     * @method _handleMinChange
     * @private
     */
    _handleMinChange: function() {
        this.activeSlider = this.minSlider;
        this.updateValue();
    },

    /**
     * Executed when the max slider fires the change event
     * @method _handleMaxChange
     * @private
     */
    _handleMaxChange: function() {
        this.activeSlider = this.maxSlider;
        this.updateValue();
    },

    /**
     * Set up the listeners for the keydown and keypress events.
     *
     * @method _bindKeyEvents
     * @protected
     */
    _bindKeyEvents : function (slider) {
        Event.on(slider.id,'keydown', this._handleKeyDown, this,true);
        Event.on(slider.id,'keypress',this._handleKeyPress,this,true);
    },

    /**
     * Delegate event handling to the active Slider.  See Slider.handleKeyDown.
     *
     * @method _handleKeyDown
     * @param e {Event} the mousedown DOM event
     * @protected
     */
    _handleKeyDown : function (e) {
        this.activeSlider.handleKeyDown.apply(this.activeSlider,arguments);
    },

    /**
     * Delegate event handling to the active Slider.  See Slider.handleKeyPress.
     *
     * @method _handleKeyPress
     * @param e {Event} the mousedown DOM event
     * @protected
     */
    _handleKeyPress : function (e) {
        this.activeSlider.handleKeyPress.apply(this.activeSlider,arguments);
    },

    /**
     * Sets the min and max thumbs to new values.
     * @method setValues
     * @param min {int} Pixel offset to assign to the min thumb
     * @param max {int} Pixel offset to assign to the max thumb
     * @param skipAnim {boolean} (optional) Set to true to skip thumb animation.
     * Default false
     * @param force {boolean} (optional) ignore the locked setting and set
     * value anyway. Default false
     * @param silent {boolean} (optional) Set to true to skip firing change
     * events.  Default false
     */
    setValues : function (min, max, skipAnim, force, silent) {
        var mins = this.minSlider,
            maxs = this.maxSlider,
            mint = mins.thumb,
            maxt = maxs.thumb,
            self = this,
            done = { min : false, max : false };

        // Clear constraints to prevent animated thumbs from prematurely
        // stopping when hitting a constraint that's moving with the other
        // thumb.
        if (mint._isHoriz) {
            mint.setXConstraint(mint.leftConstraint,maxt.rightConstraint,mint.tickSize);
            maxt.setXConstraint(mint.leftConstraint,maxt.rightConstraint,maxt.tickSize);
        } else {
            mint.setYConstraint(mint.topConstraint,maxt.bottomConstraint,mint.tickSize);
            maxt.setYConstraint(mint.topConstraint,maxt.bottomConstraint,maxt.tickSize);
        }

        // Set up one-time slideEnd callbacks to call updateValue when both
        // thumbs have been set
        this._oneTimeCallback(mins,'slideEnd',function () {
            done.min = true;
            if (done.max) {
                self.updateValue(silent);
                // Clean the slider's slideEnd events on a timeout since this
                // will be executed from inside the event's fire
                setTimeout(function () {
                    self._cleanEvent(mins,'slideEnd');
                    self._cleanEvent(maxs,'slideEnd');
                },0);
            }
        });

        this._oneTimeCallback(maxs,'slideEnd',function () {
            done.max = true;
            if (done.min) {
                self.updateValue(silent);
                // Clean both sliders' slideEnd events on a timeout since this
                // will be executed from inside one of the event's fire
                setTimeout(function () {
                    self._cleanEvent(mins,'slideEnd');
                    self._cleanEvent(maxs,'slideEnd');
                },0);
            }
        });

        // Must emit Slider slideEnd event to propagate to updateValue
        mins.setValue(min,skipAnim,force,false);
        maxs.setValue(max,skipAnim,force,false);
    },

    /**
     * Set the min thumb position to a new value.
     * @method setMinValue
     * @param min {int} Pixel offset for min thumb
     * @param skipAnim {boolean} (optional) Set to true to skip thumb animation.
     * Default false
     * @param force {boolean} (optional) ignore the locked setting and set
     * value anyway. Default false
     * @param silent {boolean} (optional) Set to true to skip firing change
     * events.  Default false
     */
    setMinValue : function (min, skipAnim, force, silent) {
        var mins = this.minSlider,
            self = this;

        this.activeSlider = mins;

        // Use a one-time event callback to delay the updateValue call
        // until after the slide operation is done
        self = this;
        this._oneTimeCallback(mins,'slideEnd',function () {
            self.updateValue(silent);
            // Clean the slideEnd event on a timeout since this
            // will be executed from inside the event's fire
            setTimeout(function () { self._cleanEvent(mins,'slideEnd'); }, 0);
        });

        mins.setValue(min, skipAnim, force);
    },

    /**
     * Set the max thumb position to a new value.
     * @method setMaxValue
     * @param max {int} Pixel offset for max thumb
     * @param skipAnim {boolean} (optional) Set to true to skip thumb animation.
     * Default false
     * @param force {boolean} (optional) ignore the locked setting and set
     * value anyway. Default false
     * @param silent {boolean} (optional) Set to true to skip firing change
     * events.  Default false
     */
    setMaxValue : function (max, skipAnim, force, silent) {
        var maxs = this.maxSlider,
            self = this;

        this.activeSlider = maxs;

        // Use a one-time event callback to delay the updateValue call
        // until after the slide operation is done
        this._oneTimeCallback(maxs,'slideEnd',function () {
            self.updateValue(silent);
            // Clean the slideEnd event on a timeout since this
            // will be executed from inside the event's fire
            setTimeout(function () { self._cleanEvent(maxs,'slideEnd'); }, 0);
        });

        maxs.setValue(max, skipAnim, force);
    },

    /**
     * Executed when one of the sliders is moved
     * @method updateValue
     * @param silent {boolean} (optional) Set to true to skip firing change
     * events.  Default false
     * @private
     */
    updateValue: function(silent) {
        var min     = this.minSlider.getValue(),
            max     = this.maxSlider.getValue(),
            changed = false,
            mint,maxt,dim,minConstraint,maxConstraint,thumbInnerWidth;

        if (min != this.minVal || max != this.maxVal) {
            changed = true;

            mint = this.minSlider.thumb;
            maxt = this.maxSlider.thumb;
            dim  = this.isHoriz ? 'x' : 'y';

            thumbInnerWidth = this.minSlider.thumbCenterPoint[dim] +
                              this.maxSlider.thumbCenterPoint[dim];

            // Establish barriers within the respective other thumb's edge, less
            // the minRange.  Limit to the Slider's range in the case of
            // negative minRanges.
            minConstraint = Math.max(max-thumbInnerWidth-this.minRange,0);
            maxConstraint = Math.min(-min-thumbInnerWidth-this.minRange,0);

            if (this.isHoriz) {
                minConstraint = Math.min(minConstraint,maxt.rightConstraint);

                mint.setXConstraint(mint.leftConstraint,minConstraint, mint.tickSize);

                maxt.setXConstraint(maxConstraint,maxt.rightConstraint, maxt.tickSize);
            } else {
                minConstraint = Math.min(minConstraint,maxt.bottomConstraint);
                mint.setYConstraint(mint.leftConstraint,minConstraint, mint.tickSize);

                maxt.setYConstraint(maxConstraint,maxt.bottomConstraint, maxt.tickSize);
            }
        }

        this.minVal = min;
        this.maxVal = max;

        if (changed && !silent) {
            this.fireEvent("change", this);
        }
    },

    /**
     * A background click will move the slider thumb nearest to the click.
     * Override if you need different behavior.
     * @method selectActiveSlider
     * @param e {Event} the mousedown event
     * @private
     */
    selectActiveSlider: function(e) {
        var min = this.minSlider,
            max = this.maxSlider,
            minLocked = min.isLocked() || !min.backgroundEnabled,
            maxLocked = max.isLocked() || !min.backgroundEnabled,
            Ev  = YAHOO.util.Event,
            d;

        if (minLocked || maxLocked) {
            this.activeSlider = minLocked ? max : min;
        } else {
            if (this.isHoriz) {
                d = Ev.getPageX(e)-min.thumb.initPageX-min.thumbCenterPoint.x;
            } else {
                d = Ev.getPageY(e)-min.thumb.initPageY-min.thumbCenterPoint.y;
            }
                    
            this.activeSlider = d*2 > max.getValue()+min.getValue() ? max : min;
        }
    },

    /**
     * Delegates the onMouseDown to the appropriate Slider
     *
     * @method _handleMouseDown
     * @param e {Event} mouseup event
     * @protected
     */
    _handleMouseDown: function(e) {
        if (!e._handled && !this.minSlider._sliding && !this.maxSlider._sliding) {
            e._handled = true;
            this.selectActiveSlider(e);
            return YW.Slider.prototype.onMouseDown.call(this.activeSlider, e);
        } else {
            return false;
        }
    },

    /**
     * Delegates the onMouseUp to the active Slider
     *
     * @method _handleMouseUp
     * @param e {Event} mouseup event
     * @protected
     */
    _handleMouseUp : function (e) {
        YW.Slider.prototype.onMouseUp.apply(
            this.activeSlider, arguments);
    },

    /**
     * Schedule an event callback that will execute once, then unsubscribe
     * itself.
     * @method _oneTimeCallback
     * @param o {EventProvider} Object to attach the event to
     * @param evt {string} Name of the event
     * @param fn {Function} function to execute once
     * @private
     */
    _oneTimeCallback : function (o,evt,fn) {
        var sub = function () {
            // Unsubscribe myself
            o.unsubscribe(evt, sub);
            // Pass the event handler arguments to the one time callback
            fn.apply({},arguments);
        };
        o.subscribe(evt,sub);
    },

    /**
     * Clean up the slideEnd event subscribers array, since each one-time
     * callback will be replaced in the event's subscribers property with
     * null.  This will cause memory bloat and loss of performance.
     * @method _cleanEvent
     * @param o {EventProvider} object housing the CustomEvent
     * @param evt {string} name of the CustomEvent
     * @private
     */
    _cleanEvent : function (o,evt) {
        var ce,i,len,j,subs,newSubs;

        if (o.__yui_events && o.events[evt]) {
            for (i = o.__yui_events.length; i >= 0; --i) {
                if (o.__yui_events[i].type === evt) {
                    ce = o.__yui_events[i];
                    break;
                }
            }
            if (ce) {
                subs    = ce.subscribers;
                newSubs = [];
                j = 0;
                for (i = 0, len = subs.length; i < len; ++i) {
                    if (subs[i]) {
                        newSubs[j++] = subs[i];
                    }
                }
                ce.subscribers = newSubs;
            }
        }
    }

};

YAHOO.lang.augmentProto(DualSlider, YAHOO.util.EventProvider);


/**
 * Factory method for creating a horizontal dual-thumb slider
 * @for YAHOO.widget.Slider
 * @method YAHOO.widget.Slider.getHorizDualSlider
 * @static
 * @param {String} bg the id of the slider's background element
 * @param {String} minthumb the id of the min thumb
 * @param {String} maxthumb the id of the thumb thumb
 * @param {int} range the number of pixels the thumbs can move within
 * @param {int} iTickSize (optional) the element should move this many pixels
 * at a time
 * @param {Array}  initVals (optional) [min,max] Initial thumb placement
 * @return {DualSlider} a horizontal dual-thumb slider control
 */
YW.Slider.getHorizDualSlider = 
    function (bg, minthumb, maxthumb, range, iTickSize, initVals) {
        var mint = new YW.SliderThumb(minthumb, bg, 0, range, 0, 0, iTickSize),
            maxt = new YW.SliderThumb(maxthumb, bg, 0, range, 0, 0, iTickSize);

        return new DualSlider(
                    new YW.Slider(bg, bg, mint, "horiz"),
                    new YW.Slider(bg, bg, maxt, "horiz"),
                    range, initVals);
};

/**
 * Factory method for creating a vertical dual-thumb slider.
 * @for YAHOO.widget.Slider
 * @method YAHOO.widget.Slider.getVertDualSlider
 * @static
 * @param {String} bg the id of the slider's background element
 * @param {String} minthumb the id of the min thumb
 * @param {String} maxthumb the id of the thumb thumb
 * @param {int} range the number of pixels the thumbs can move within
 * @param {int} iTickSize (optional) the element should move this many pixels
 * at a time
 * @param {Array}  initVals (optional) [min,max] Initial thumb placement
 * @return {DualSlider} a vertical dual-thumb slider control
 */
YW.Slider.getVertDualSlider = 
    function (bg, minthumb, maxthumb, range, iTickSize, initVals) {
        var mint = new YW.SliderThumb(minthumb, bg, 0, 0, 0, range, iTickSize),
            maxt = new YW.SliderThumb(maxthumb, bg, 0, 0, 0, range, iTickSize);

        return new YW.DualSlider(
                    new YW.Slider(bg, bg, mint, "vert"),
                    new YW.Slider(bg, bg, maxt, "vert"),
                    range, initVals);
};

YAHOO.widget.DualSlider = DualSlider;

})();
YAHOO.register("slider", YAHOO.widget.Slider, {version: "2.9.0", build: "2800"});
