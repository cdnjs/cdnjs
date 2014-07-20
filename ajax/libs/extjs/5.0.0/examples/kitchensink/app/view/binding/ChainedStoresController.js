Ext.define('KitchenSink.view.binding.ChainedStoresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.chainedstores',

    onRemoveClick: function(btn) {
        var rec = btn.getWidgetRecord();
        this.getStore('everyone').remove(rec);
    },

    renderColor: function(v) {
        return Ext.String.format('<span style="color: {0};">{1}</span>', v.toLowerCase(), v);
    },

    onEditComplete: function(editor, context) {
        var rec = context.record,
            store = this.getStore('adults');

        if (store.contains(rec)) {
            this.lookupReference('adultsGrid').getView().focusRow(rec);
        }
    }
});
