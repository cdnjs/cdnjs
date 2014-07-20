/**
 * @private
 */
Ext.define('Ext.fx.animation.FadeOut', {
    extend: 'Ext.fx.animation.Fade',
    alias: 'animation.fadeOut',

    config: {
        // @hide
        out: true,

        before: {}
    }
});
