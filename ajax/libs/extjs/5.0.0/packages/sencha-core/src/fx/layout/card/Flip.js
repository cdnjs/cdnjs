/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Flip', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.flip',

    config: {
        duration: 500,

        inAnimation: {
            type: 'flip',
            half: true,
            easing: 'ease-out',
            before: {
                'backface-visibility': 'hidden'
            },
            after: {
                'backface-visibility': null
            }
        },
        outAnimation: {
            type: 'flip',
            half: true,
            easing: 'ease-in',
            before: {
                'backface-visibility': 'hidden'
            },
            after: {
                'backface-visibility': null
            },
            out: true
        }
    },

    onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
        var parent = newItem.element.getParent();
        parent.addCls('x-layout-card-perspective');

        this.on('animationend', function() {
            parent.removeCls('x-layout-card-perspective');
        }, this, {single: true});

        this.callParent(arguments);
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
