/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Pop', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.pop',

    config: {
        duration: 500,

        inAnimation: {
            type: 'pop',
            easing: 'ease-out'
        },
        outAnimation: {
            type: 'pop',
            easing: 'ease-in',
            out: true
        }
    },

    updateDuration: function(duration) {
        var halfDuration = duration / 2,
            inAnimation = this.getInAnimation(),
            outAnimation = this.getOutAnimation();

        inAnimation.setDelay(halfDuration);
        inAnimation.setDuration(halfDuration);
        outAnimation.setDuration(halfDuration);
    }
});
