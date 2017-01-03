Ext.define('Aria.view.ItemSelector', {
    extend:'Ext.container.Container',
    alias:'widget.mysimpleitemselector',
    title:'Item Selector',
    requires: [
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector'
    ],

    initComponent:function () {
        var me = this;
        var ds = Ext.create('Ext.data.ArrayStore', {
            fields:['value', 'text'],
            data:[
                [123, 'One Hundred Twenty Three'],
                ['1', 'One'],
                ['2', 'Two'],
                ['3', 'Three'],
                ['4', 'Four'],
                ['5', 'Five'],
                ['6', 'Six'],
                ['7', 'Seven'],
                ['8', 'Eight'],
                ['9', 'Nine']
            ]
        });

        me.items = [
            {
                xtype:'itemselector',
                name:'itemselector',
                id:'itemselector-field',
                anchor:'100%',
                cls: 'aria-itemselector',
                fieldLabel:'ItemSelector',
                imagePath:'../ux/images/',
                store:ds,
                displayField:'text',
                valueField:'value',
                value:['3', '4', '6'],
                allowBlank:false,
                msgTarget:'side',
                fromTitle:'Available',
                toTitle:'Selected',
                width: 600,
                height: 250
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {
                    minWidth: 75
                },
                items: ['->', {
                    text: 'Clear',
                    handler: function(){
                        var field = Ext.getCmp(fieldId);
                        if (!field.disabled) {
                            field.clearValue();
                        }
                    }
                }, {
                    text: 'Reset',
                    handler: function() {
                        Ext.getCmp(fieldId).up('form').getForm().reset();
                    }
                }, {
                    text: 'Save',
                    handler: function(){
                        var form = Ext.getCmp(fieldId).up('form').getForm();
                        form.getValues(true);
                        if (form.isValid()){
                            Aria.app.msg('Submitted Values', 'The following will be sent to the server: <br />'+
                                form.getValues(true));
                        }
                    }
                }]
            }];

        me.callParent(arguments);
    }
});