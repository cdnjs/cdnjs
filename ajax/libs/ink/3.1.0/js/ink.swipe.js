/**
 * Swipe gestures
 * @module Ink.UI.Swipe_1
 * @version 1
 */
Ink.createModule('Ink.UI.Swipe', '1', ['Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.UI.Common_1'], function(InkEvent, InkElement, Common) {
    'use strict';

    /**
     * Subscribe swipe gestures.
     *
     * Supports filtering swipes be any combination of the criteria supported in the options.
     *
     * -----
     *
     * Arguments received by the callbacks
     * -----------------------------------
     *
     * The `onStart`, `onMove`, and `onEnd` options receive as argument an object containing:
     *
     *   - `event`: the DOMEvent object
     *   - `element`: the target element
     *   - `Instance`: the `Ink.UI.Swipe_1` instance
     *   - `position`: `Array` with `[x, y]` coordinates of current position
     *   - `dt`: Time passed between now and the first event (onMove only)
     *   - `gesture`: an Array containing [x,y] coordinates of every touchmove event received (only if options.storeGesture is enabled) (onEnd only)
     *   - `time`: an Array containing all the `dt` values for every touchmove event (onEnd only)
     *   - `overallMovement`: X and Y distance traveled by the touch movement (`[x, y]`) (onEnd only)
     *   - `overallTime`: total time passed (onEnd only)
     *
     * @class Ink.UI.Swipe
     * @constructor
     * @param {String|DOMElement}   el                      Element or Selector
     * @param {Object}              options                 Options Object
     * @param {Function}            [options.onEnd]         Callback function for the `touchend` event. Gets all the gesture information, and is filtered by min/max Dist and Duration options (see below)
     * @param {Function}            [options.onStart]       Callback function for `touchstart` event.
     * @param {Function}            [options.onMove]        Callback function for every `touchmove` event. Gets current gesture information.
     * @param {Number}              [options.minDist]       Minimum allowed distance, in pixels.
     * @param {Number}              [options.maxDist]       Maximum allowed distance, in pixels.
     * @param {Number}              [options.minDuration]   Minimum allowed duration, in seconds.
     * @param {Number}              [options.maxDuration]   Maximum allowed duration, in seconds.
     * @param {String}              [options.axis]          If either 'x' or 'y' is passed, only swipes where the dominant axis is the given one trigger the callback
     * @param {String}              [options.storeGesture]  If to store gesture information and provide it to the callback. Defaults to true.
     * @param {String}              [options.stopEvents]    Flag to stop (default and propagation) of the received events. Defaults to true.
     *
     *
     * @sample Ink_UI_Swipe_1.html
     */
    function Swipe() {
        if (typeof arguments[1] === 'function') {
            arguments[1] = { onEnd: arguments[1] };
        }

        Common.BaseUIComponent.apply(this, arguments);
    }

    Swipe._name = 'Swipe_1';

    Swipe._optionDefinition = {
        onEnd:          ['Function', undefined],
        onStart:        ['Function', undefined],
        onMove:         ['Function', undefined],
        minDist:        ['Number',   undefined],      // in pixels
        maxDist:        ['Number',   undefined],
        minDuration:    ['Number',   undefined],      // in seconds
        maxDuration:    ['Number',   undefined],
        axis:           ['String',   undefined],       // x | y
        storeGesture:   ['Boolean',  false],
        stopEvents:     ['Boolean',  true]
    };

    Swipe.prototype = {
        _supported: ('ontouchstart' in document.documentElement),

        _init: function() {
            this._handlers = {
                down: Ink.bindEvent(this._onDown, this),
                move: Ink.bindEvent(this._onMove, this),
                up:   Ink.bindEvent(this._onUp, this)
            };

            var db = document.body;
            InkEvent.observe(db, 'touchstart', this._handlers.down);
            if (this._options.storeGesture || this._options.onMove) {
                InkEvent.observe(db, 'touchmove', this._handlers.move);
            }
            InkEvent.observe(db, 'touchend', this._handlers.up);
            this._isOn = false;
        },

        _isMeOrParent: function(el, parentEl) {
            if (!el) {return;}
            do {
                if (el === parentEl) { return true; }
                el = el.parentNode;
            } while (el);
            return false;
        },

        _pushGesture: function (coords, dt) {
            if (this._options.storeGesture) {
                this._gesture.push(coords);
                this._time.push(dt);
            }
        },

        _onDown: function(event) {
            if (event.changedTouches.length !== 1) { return; }
            if (!this._isMeOrParent(event.target, this._element)) { return; }

            if( this._options.stopEvents === true ){
                InkEvent.stop(event);
            }
            event = event.changedTouches[0];
            this._isOn = true;
            this._target = event.target;

            this._t0 = +new Date();
            this._p0 = [event.pageX, event.pageY];

            if (this._options.storeGesture) {
                this._gesture = [];
                this._time    = [];
            }

            this._pushGesture(this._p0, 0);

            if (this._options.onStart) {
                this._options.onStart({
                    event: event,
                    element: this._element,
                    instance: this,
                    position: this._p0,
                    dt: 0
                });
            }
        },

        _onMove: function(event) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }
            if( this._options.stopEvents === true ) {
                InkEvent.stop(event);
            }

            event = event.changedTouches[0];
            var t1 = +new Date();
            var dt = (t1 - this._t0);

            var gesture = [event.pageX, event.pageY];

            this._pushGesture(gesture, dt);

            if (this._options.onMove) {
                this._options.onMove({
                    event: event,
                    element: this._element,
                    instance: this,
                    position: gesture,
                    dt: dt
                });
            }
        },

        _onUp: function(event) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }

            if( this._options.stopEvents === true ){
                InkEvent.stop(event);
            }
            event = event.changedTouches[0];   // TODO SHOULD CHECK IT IS THE SAME TOUCH
            this._isOn = false;

            var t1 = +new Date();
            var p1 = [event.pageX, event.pageY];
            var dt = (t1 - this._t0);
            var dr = [
                p1[0] - this._p0[0],
                p1[1] - this._p0[1]
            ];
            var dist = Math.sqrt(dr[0]*dr[0] + dr[1]*dr[1]);
            var axis = Math.abs(dr[0]) > Math.abs(dr[1]) ? 'x' : 'y';

            var o = this._options;
            if (o.minDist     && dist <   o.minDist) {     return; }
            if (o.maxDist     && dist >   o.maxDist) {     return; }
            if (o.minDuration && dt   <   o.minDuration) { return; }
            if (o.maxDuration && dt   >   o.maxDuration) { return; }
            if (o.axis        && axis !== o.axis)    {     return; }

            if (this._options.onEnd) {
                this._options.onEnd({
                    event: event,
                    element: this._element,
                    instance: this,
                    gesture: this._gesture,
                    time: this._time,
                    axis: axis,
                    overallMovement: dr,
                    overallTime: dt
                });
            }
        }
    };

    Common.createUIComponent(Swipe);

    return Swipe;
});
