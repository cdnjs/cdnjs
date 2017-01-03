/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Fade', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.fade',

    config: {
        reverse: null,
        
        inAnimation: {
            type: 'fade',
            easing: 'ease-out'
        },
        outAnimation: {
            type: 'fade',
            easing: 'ease-out',
            out: true
        }
    }
});
