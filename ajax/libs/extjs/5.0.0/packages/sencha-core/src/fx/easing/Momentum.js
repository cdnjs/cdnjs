/**
 * @private
 */
Ext.define('Ext.fx.easing.Momentum', {

    extend: 'Ext.fx.easing.Abstract',

    config: {
        acceleration: 30,
        friction: 0,
        startVelocity: 0
    },

    alpha: 0,

    updateFriction: function(friction) {
        var theta = Math.log(1 - (friction / 10));

        this.theta = theta;

        this.alpha = theta / this.getAcceleration();
    },

    updateStartVelocity: function(velocity) {
        this.velocity = velocity * this.getAcceleration();
    },

    updateAcceleration: function(acceleration) {
        this.velocity = this.getStartVelocity() * acceleration;

        this.alpha = this.theta / acceleration;
    },

    getValue: function() {
        return this.getStartValue() - this.velocity * (1 - this.getFrictionFactor()) / this.theta;
    },

    getFrictionFactor: function() {
        var deltaTime = Ext.Date.now() - this.getStartTime();

        return Math.exp(deltaTime * this.alpha);
    },

    getVelocity: function() {
        return this.getFrictionFactor() * this.velocity;
    }
});
