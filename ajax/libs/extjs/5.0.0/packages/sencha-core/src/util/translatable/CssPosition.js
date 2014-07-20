/**
 * @class Ext.util.translatable.CssPosition
 * @private
 */

Ext.define('Ext.util.translatable.CssPosition', {
    extend: 'Ext.util.translatable.Dom',

    doTranslate: function(x, y) {
        var domStyle = this.getElement().dom.style;

        if (typeof x == 'number') {
            domStyle.left = x + 'px';
        }

        if (typeof y == 'number') {
            domStyle.top = y + 'px';
        }
    },

    destroy: function() {
        var domStyle = this.getElement().dom.style;

        domStyle.left = null;
        domStyle.top = null;

        this.callParent(arguments);
    }
});
