/**
 * A simple event recognizer which knows when you double tap.
 */
Ext.define('Ext.event.gesture.DoubleTap', {

    extend: 'Ext.event.gesture.SingleTouch',

    inheritableStatics: {
        DIFFERENT_TARGET: 'Different Target'
    },

    config: {
        /**
         * @cfg {Number}
         * The maximum distance a touch can move without canceling recognition
         */
        moveDistance: 8,
        /**
         * @cfg {Number}
         * The minimum distance the second tap can occur from the first tap and still
         * be considered a doubletap
         */
        tapDistance: 24,
        maxDuration: 300
    },

    handledEvents: ['singletap', 'doubletap'],

    /**
     * @member Ext.dom.Element
     * @event singletap
     * Fires when there is a single tap.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    /**
     * @member Ext.dom.Element
     * @event doubletap
     * Fires when there is a double tap.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    singleTapTimer: null,

    startTime: 0,

    lastTapTime: 0,

    onTouchStart: function(e) {
        var me = this,
            lastStartPoint;

        if (me.callParent(arguments) === false) {
            return false;
        }
        // the start point of the last touch that occurred.
        lastStartPoint = me.lastStartPoint = e.changedTouches[0].point;

        // the start point of the "first" touch in this gesture
        me.startPoint = me.startPoint || lastStartPoint;

        me.startTime = e.time;

        clearTimeout(me.singleTapTimer);
    },

    onTouchMove: function(e) {
        var me = this,
            point = e.changedTouches[0].point;

        if (Math.abs(point.getDistanceTo(me.lastStartPoint)) >= me.getMoveDistance()) {
            me.startPoint = null;
            return me.fail(me.self.TOUCH_MOVED);
        }
    },

    onTouchEnd: function(e) {
        var me = this,
            maxDuration = me.getMaxDuration(),
            time = e.time,
            target = e.target,
            lastTapTime = me.lastTapTime,
            lastTarget = me.lastTarget,
            point = e.changedTouches[0].point,
            duration;

        me.lastTapTime = time;
        me.lastTarget = target;

        if (lastTapTime) {
            duration = time - lastTapTime;

            if (duration <= maxDuration &&
                    Math.abs(point.getDistanceTo(me.startPoint)) <= me.getTapDistance()) {
                if (target !== lastTarget) {
                    return me.fail(me.self.DIFFERENT_TARGET);
                }

                me.lastTarget = null;
                me.lastTapTime = 0;

                me.fire('doubletap', e, {
                    touch: e.changedTouches[0],
                    duration: duration
                });

                me.startPoint = null;

                return;
            }
        }

        if (time - me.startTime > maxDuration) {
            me.fireSingleTap(e);
        }
        else {
            me.setSingleTapTimer(e);
        }
    },

    setSingleTapTimer: function(e) {
        var me = this;

        me.singleTapTimer = setTimeout(function() {
            me.fireSingleTap(e);
        }, me.getMaxDuration());
    },

    fireSingleTap: function(e, touch) {
        this.fire('singletap', e, {
            touch: touch
        });

        this.startPoint = null;
    }
});
