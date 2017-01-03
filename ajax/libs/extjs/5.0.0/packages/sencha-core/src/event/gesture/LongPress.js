/**
 * A event recognizer which knows when you tap and hold for more than 1 second.
 */
Ext.define('Ext.event.gesture.LongPress', {
    extend: 'Ext.event.gesture.SingleTouch',

    inheritableStatics: {
        DURATION_NOT_ENOUGH: 'Duration Not Enough'
    },

    config: {
        moveDistance: 8,
        minDuration: 1000
    },

    handledEvents: ['longpress'],

    /**
     * @member Ext.dom.Element
     * @event longpress
     * Fires when you touch and hold still for more than 1 second.
     * @param {Ext.event.Event} event The {@link Ext.event.Event} event encapsulating the DOM event.
     * @param {HTMLElement} node The target of the event.
     * @param {Object} options The options object passed to Ext.mixin.Observable.addListener.
     */

    /**
     * @member Ext.dom.Element
     * @event taphold
     * @inheritdoc Ext.dom.Element#longpress
     */

    fireLongPress: function(e) {
        this.fire('longpress', e, {
            touch: e.changedTouches[0],
            duration: this.getMinDuration()
        });

        this.isLongPress = true;
    },

    onTouchStart: function(e) {
        if (this.callParent(arguments) === false) {
            return false;
        }
        this.startPoint = e.changedTouches[0].point;

        this.isLongPress = false;

        this.setLongPressTimer(e);
    },

    setLongPressTimer: function(e) {
        var me = this;

        me.timer = setTimeout(function() {
            me.fireLongPress(e);
        }, me.getMinDuration());
    },

    onTouchMove: function(e) {
        var point = e.changedTouches[0].point;
        if (Math.abs(point.getDistanceTo(this.startPoint)) >= this.getMoveDistance()) {
            return this.fail(this.self.TOUCH_MOVED);
        }
    },

    onTouchEnd: function() {
        if (!this.isLongPress) {
            return this.fail(this.self.DURATION_NOT_ENOUGH);
        }
    },

    fail: function() {
        clearTimeout(this.timer);

        return this.callParent(arguments);
    }

}, function() {
    this.override({
        handledEvents: ['longpress', 'taphold'],

        fire: function(eventName) {
            if (eventName === 'longpress') {
                var args = Array.prototype.slice.call(arguments);
                args[0] = 'taphold';

                this.fire.apply(this, args);
            }

            return this.callOverridden(arguments);
        }
    });
});
