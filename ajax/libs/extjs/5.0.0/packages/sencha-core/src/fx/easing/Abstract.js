/**
 * @private
 */
Ext.define('Ext.fx.easing.Abstract', {

    config: {
        startTime: 0,
        startValue: 0
    },

    isEasing: true,

    isEnded: false,

    constructor: function(config) {
        this.initConfig(config);

        return this;
    },

    applyStartTime: function(startTime) {
        if (!startTime) {
            startTime = Ext.Date.now();
        }

        return startTime;
    },

    updateStartTime: function(startTime) {
        this.reset();
    },

    reset: function() {
        this.isEnded = false;
    },

    getValue: Ext.emptyFn
});
