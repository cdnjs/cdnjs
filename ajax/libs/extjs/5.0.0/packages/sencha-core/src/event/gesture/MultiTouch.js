/**
 * A base class for gesture recognizers that involve multiple simultaneous contact points
 * between the screen and the input-device, e.g. 'pinch' and 'rotate'
 * @abstract
 * @private
 */
Ext.define('Ext.event.gesture.MultiTouch', {
    extend: 'Ext.event.gesture.Recognizer',

    requiredTouchesCount: 2,

    isTracking: false,

    isStarted: false,

    onTouchStart: function(e) {
        var requiredTouchesCount = this.requiredTouchesCount,
            touches = e.touches,
            touchesCount = touches.length;

        if (touchesCount === requiredTouchesCount) {
            this.start(e);
        }
        else if (touchesCount > requiredTouchesCount) {
            this.end(e);
        }
    },

    onTouchEnd: function(e) {
        this.end(e);
    },

    onTouchCancel: function(e) {
        this.end(e, true);
        return false;
    },

    start: function() {
        if (!this.isTracking) {
            this.isTracking = true;
            this.isStarted = false;
        }
    },

    end: function(e, isCancel) {
        if (this.isTracking) {
            this.isTracking = false;

            if (this.isStarted) {
                this.isStarted = false;

                this[isCancel ? 'fireCancel' : 'fireEnd'](e);
            }
        }
    }
});
