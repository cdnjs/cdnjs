/**
 * A simple event recogniser which knows when you tap.
 */
Ext.define('Ext.event.gesture.Tap', {
    extend: 'Ext.event.gesture.SingleTouch',

    handledEvents: ['tap', 'tapcancel'],

    config: {
        /**
         * @cfg {Number} moveDistance
         * The maximimum distance in pixels a touchstart event can travel and still be considered a tap event.
         */

        moveDistance: 8
    },

    onTouchStart: function(e) {
        if (this.callParent([e]) === false) {
            return false;
        }

        this.startPoint = e.changedTouches[0].point;
    },

    onTouchMove: function(e) {
        var touch = e.changedTouches[0],
            point = touch.point;

        if (Math.abs(point.getDistanceTo(this.startPoint)) >= this.getMoveDistance()) {
            this.fire('tapcancel', e, {
                touch: touch
            });
            return this.fail(this.self.TOUCH_MOVED);
        }
    },

    onTouchEnd: function(e) {
        this.fire('tap', e, {
            touch: e.changedTouches[0]
        });
    },

    onTouchCancel: function(e) {
        this.fire('tapcancel', e, {
            touch: e.changedTouches[0]
        });
        return false;
    }
});