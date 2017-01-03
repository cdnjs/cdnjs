/**
 * @private
 */
Ext.define('Ext.fx.animation.Fade', {
    extend: 'Ext.fx.animation.Abstract',

    alternateClassName: 'Ext.fx.animation.FadeIn',

    alias: ['animation.fade', 'animation.fadeIn'],

    config: {
        /**
         * @cfg {Boolean} out True if you want to make this animation fade out, instead of fade in.
         * @accessor
         */

        out: false,

        before: {
            display: null,
            opacity: 0
        },

        after: {
            opacity: null
        },
        reverse: null
    },

    updateOut: function(newOut) {
        var to   = this.getTo(),
            from = this.getFrom();

        if (newOut) {
            from.set('opacity', 1);
            to.set('opacity',   0);
        } else {
            from.set('opacity', 0);
            to.set('opacity',   1);
        }
    }
});
