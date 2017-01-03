Ext.define('Neptune.view.form.widget.Checkboxes', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'checkboxes',
    fieldLabel: 'Checkbox Fields',
    defaultType: 'checkboxfield',
    items: [
        {
            boxLabel: 'Anchovies',
            boxLabelAlign: 'before',
            name: 'topping'
        }, {
            boxLabel: 'Artichoke Hearts',
            name: 'topping',
            checked: true
        }, {
            boxLabel: 'Bacon',
            name: 'topping'
        }
    ],

    constructor: function(cfg) {
        if (cfg.vertical === false) {
            this.layout = {
                type: 'hbox',
                defaultMargins: '0 3'
            };
        }
        this.callParent(arguments);
    }
});