/**
 * @private
 *
 * CSS Transform implementation
 */
Ext.define('Ext.util.translatable.CssTransform', {
    extend: 'Ext.util.translatable.Dom',

    doTranslate: function(x, y) {
        var element = this.getElement();
        if (!this.isDestroyed && !element.isDestroyed) {
            element.translate(x, y);
        }
    },

    destroy: function() {
        var element = this.getElement();

        if (element && !element.isDestroyed) {
            element.dom.style.webkitTransform = null;
        }

        this.callSuper();
    }
});
