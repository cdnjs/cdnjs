/**
 * @private
 */
Ext.define('Ext.fx.easing.EaseOut', {
    extend: 'Ext.fx.easing.Linear',

    alias: 'easing.ease-out',

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
            thetaC = 1 - theta,
            thetaEnd = 1 - Math.pow(thetaC, this.getExponent()),
            currentValue = startValue + (thetaEnd * distance);

        if (deltaTime >= duration) {
            this.isEnded = true;
            return endValue;
        }

        return currentValue;
    }
});
