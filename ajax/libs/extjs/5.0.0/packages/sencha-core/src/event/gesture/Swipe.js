/**
 * A gesture recognizer for swipe events
 */
Ext.define('Ext.event.gesture.Swipe', {
    extend: 'Ext.event.gesture.SingleTouch',

    handledEvents: ['swipestart', 'swipe', 'swipecancel'],

    /**
     * @member Ext.dom.Element
     * @event swipe
     * Fires when there is a swipe
     * When listening to this, ensure you know about the {@link Ext.event.Event#direction} property in the `event` object.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    /**
     * @property {Number} direction
     * The direction of the swipe. Available options are:
     *
     * - up
     * - down
     * - left
     * - right
     *
     * **This is only available when the event type is `swipe`**
     * @member Ext.event.Event
     */

    /**
     * @property {Number} duration
     * The duration of the swipe.
     *
     * **This is only available when the event type is `swipe`**
     * @member Ext.event.Event
     */

    inheritableStatics: {
        MAX_OFFSET_EXCEEDED: 'Max Offset Exceeded',
        MAX_DURATION_EXCEEDED: 'Max Duration Exceeded',
        DISTANCE_NOT_ENOUGH: 'Distance Not Enough'
    },

    config: {
        minDistance: 80,
        maxOffset: 35,
        maxDuration: 1000
    },

    onTouchStart: function(e) {
        if (this.callParent(arguments) === false) {
            return false;
        }

        var touch = e.changedTouches[0];

        this.startTime = e.time;

        this.isHorizontal = true;
        this.isVertical = true;

        this.startX = touch.pageX;
        this.startY = touch.pageY;
    },

    onTouchMove: function(e) {
        var touch = e.changedTouches[0],
            x = touch.pageX,
            y = touch.pageY,
            deltaX = x - this.startX,
            deltaY = y - this.startY,
            absDeltaX = Math.abs(x - this.startX),
            absDeltaY = Math.abs(y - this.startY),
            duration = e.time - this.startTime,
            minDistance = this.getMinDistance(),
            time = e.time,
            direction, distance;

        if (time - this.startTime > this.getMaxDuration()) {
            return this.fail(this.self.MAX_DURATION_EXCEEDED);
        }

        if (this.isHorizontal && absDeltaY > this.getMaxOffset()) {
            this.isHorizontal = false;
        }

        if (this.isVertical && absDeltaX > this.getMaxOffset()) {
            this.isVertical = false;
        }

        if (!this.isVertical || !this.isHorizontal) {
            if (this.isHorizontal && absDeltaX < minDistance) {
                direction = (deltaX < 0) ? 'left' : 'right';
                distance = absDeltaX;
            }
            else if (this.isVertical && absDeltaY < minDistance) {
                direction = (deltaY < 0) ? 'up' : 'down';
                distance = absDeltaY;
            }
        }

        if (direction && !this.started) {
            this.started = true;

            this.fire('swipestart', e, {
                touch: touch,
                direction: direction,
                distance: distance,
                duration: duration
            });
        }

        if (!this.isHorizontal && !this.isVertical) {
            return this.fail(this.self.MAX_OFFSET_EXCEEDED);
        }
    },

    onTouchEnd: function(e) {
        if (this.onTouchMove(e) === false) {
            return false;
        }

        var touch = e.changedTouches[0],
            x = touch.pageX,
            y = touch.pageY,
            deltaX = x - this.startX,
            deltaY = y - this.startY,
            absDeltaX = Math.abs(deltaX),
            absDeltaY = Math.abs(deltaY),
            minDistance = this.getMinDistance(),
            duration = e.time - this.startTime,
            direction, distance;

        if (this.isVertical && absDeltaY < minDistance) {
            this.isVertical = false;
        }

        if (this.isHorizontal && absDeltaX < minDistance) {
            this.isHorizontal = false;
        }

        if (this.isHorizontal) {
            direction = (deltaX < 0) ? 'left' : 'right';
            distance = absDeltaX;
        }
        else if (this.isVertical) {
            direction = (deltaY < 0) ? 'up' : 'down';
            distance = absDeltaY;
        }
        else {
            return this.fail(this.self.DISTANCE_NOT_ENOUGH);
        }

        this.started = false;

        this.fire('swipe', e, {
            touch: touch,
            direction: direction,
            distance: distance,
            duration: duration
        });
    },

    onTouchCancel: function(e) {
        this.fire('swipecancel', e);
        return false;
    }
});
