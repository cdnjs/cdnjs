/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Slide', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.slide',

    config: {
        inAnimation: {
            type: 'slide',
            easing: 'ease-out'
        },
        outAnimation: {
            type: 'slide',
            easing: 'ease-out',
            out: true
        }
    },

    updateReverse: function(reverse) {
        this.getInAnimation().setReverse(reverse);
        this.getOutAnimation().setReverse(reverse);
    }
});
