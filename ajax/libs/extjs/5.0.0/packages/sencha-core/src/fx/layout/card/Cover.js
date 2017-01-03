/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Cover', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.cover',

    config: {
        reverse: null,

        inAnimation: {
            before: {
                'z-index': 100
            },
            after: {
                'z-index': 0
            },
            type: 'slide',
            easing: 'ease-out'
        },
        outAnimation: {
            easing: 'ease-out',
            from: {
                opacity: 0.99
            },
            to: {
                opacity: 1
            },
            out: true
        }
    },

    updateReverse: function(reverse) {
        this.getInAnimation().setReverse(reverse);
        this.getOutAnimation().setReverse(reverse);
    }
});
