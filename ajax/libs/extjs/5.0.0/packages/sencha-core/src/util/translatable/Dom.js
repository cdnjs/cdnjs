/**
 * @private
 */
Ext.define('Ext.util.translatable.Dom', {
    extend: 'Ext.util.translatable.Abstract',

    config: {
        element: null
    },

    applyElement: function(element) {
        if (!element) {
            return;
        }

        return Ext.get(element);
    },

    updateElement: function() {
        this.refresh();
    }
});
