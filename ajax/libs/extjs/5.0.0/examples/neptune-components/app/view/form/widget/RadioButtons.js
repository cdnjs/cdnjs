Ext.define('Neptune.view.form.widget.RadioButtons', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'radioButtons',
    fieldLabel: 'Radio Buttons',
    defaultType: 'radiofield',
    items: [
        {
            boxLabel: 'Blue',
            name: 'color',
            checked: true
        }, {
            boxLabel: 'Grey',
            name: 'color'
        }, {
            boxLabel: 'Black',
            name: 'color'
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
