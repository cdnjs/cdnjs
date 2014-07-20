Ext.define('Ext.classic.toolbar.Toolbar', {
    override: 'Ext.toolbar.Toolbar',
    defaultFieldUI: 'toolbar'
});

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

Ext.define('Ext.theme.classic.grid.plugin.Editing', {
    override: 'Ext.grid.plugin.Editing',

    defaultFieldUI: 'grid-cell'
});

Ext.define('Ext.theme.classic.toolbar.Breadcrumb', {
    override: 'Ext.toolbar.Breadcrumb',
    config: {
        buttonUI: 'default-toolbar'
    }
});

