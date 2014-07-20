/**
 * @private
 */
Ext.define('Ext.fx.easing.EaseIn', {
    extend: 'Ext.fx.easing.Linear',

    alias: 'easing.ease-in',

    config: {
        exponent: 4,
        duration: 1500
    },

    getValue: function() {
        var deltaTime = Ext.Date.now() - this.getStartTime(),
            duration = this.getDuration(),
            startValue = this.getStartValue(),
            endValue = this.getEndValue(),
            distance = this.distance,
            theta = deltaTime / duration,
            thetaEnd = Math.pow(theta, this.getExponent()),
            currentValue = startValue + (thetaEnd * distance);

        if (deltaTime >= duration) {
            this.isEnded = true;
            return endValue;
        }

        return currentValue;
    }
});
