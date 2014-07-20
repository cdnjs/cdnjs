/**
 * @private
 */
Ext.define('Ext.fx.easing.Linear', {

    extend: 'Ext.fx.easing.Abstract',

    alias: 'easing.linear',

    config: {
        duration: 0,
        endValue: 0
    },

    updateStartValue: function(startValue) {
        this.distance = this.getEndValue() - startValue;
    },

    updateEndValue: function(endValue) {
        this.distance = endValue - this.getStartValue();
    },

    getValue: function() {
        var deltaTime = Ext.Date.now() - this.getStartTime(),
            duration = this.getDuration();

        if (deltaTime > duration) {
            this.isEnded = true;
            return this.getEndValue();
        }
        else {
            return this.getStartValue() + ((deltaTime / duration) * this.distance);
        }
    }
});
