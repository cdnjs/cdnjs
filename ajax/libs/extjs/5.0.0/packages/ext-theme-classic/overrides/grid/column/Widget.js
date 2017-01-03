Ext.define('Ext.theme.classic.grid.column.Widget', {
    override: 'Ext.grid.column.Widget',

    config: {
        /**
         * @cfg defaultCellUI {Object}
         * A map of xtype to {@link Ext.Component#ui} names to use when using Components in this column.
         *
         * Currently {@link Ext.Button Button} and all subclasses of {@link Ext.form.field.Text TextField} default
         * to using `ui: "grid-cell"` when in a WidgetColumn.
         */
        defaultWidgetUI: {
            button: 'grid-cell',
            splitbutton: 'grid-cell',
            cyclebutton: 'grid-cell',
            textfield: 'grid-cell',
            pickerfield: 'grid-cell',
            combobox: 'grid-cell',
            combo: 'grid-cell',
            datefield: 'grid-cell',
            timefield: 'grid-cell',
            filefield: 'grid-cell',
            fileuploadfield: 'grid-cell'
        }
    }
});