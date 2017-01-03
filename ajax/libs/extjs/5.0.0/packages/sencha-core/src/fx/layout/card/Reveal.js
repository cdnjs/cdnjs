/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Reveal', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.reveal',

    config: {
        inAnimation: {
            easing: 'ease-out',
            from: {
                opacity: 0.99
            },
            to: {
                opacity: 1
            }
        },
        outAnimation: {
            before: {
                'z-index': 100
            },
            after: {
                'z-index': 0
            },
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
