Ext.define('Ext.rtl.scroll.Scroller', {
    override: 'Ext.scroll.Scroller',

    convertX: function(x) {
        // rtl gets set by the Ext.scroll.Manager constructor override based on the
        // owner component's inheritedState
        if (x && this.rtl) {
            x = -x;
        }
        return x;
    },

    convertEasingConfig: function(config) {
        var minMomentumValue = config.minMomentumValue,
            maxMomentumValue = config.maxMomentumValue;

        if (this.rtl) {
            config.minMomentumValue = maxMomentumValue;
            config.maxMomentumValue = -minMomentumValue;
        }
    }
});
