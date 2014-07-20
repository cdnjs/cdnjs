/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Cube', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.cube',

    config: {
        reverse: null,
        inAnimation: {
            type: 'cube'
        },
        outAnimation: {
            type: 'cube',
            out: true
        }
    }
});
