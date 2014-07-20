Ext.define('Aria.view.DatePicker', {
    extend:'Ext.container.Container',
    alias:'widget.mysimpledatepicker',
    title:'Date Picker',

    layout:{
        type:'vbox',
        defaultMargins:{
            top:6,
            bottom:6,
            left:6,
            right:6
        }
    },

    initComponent: function() {
        var me = this;

        me.items = [{
            xtype:'form',
            items:[{
                xtype:'datepicker',
                margin:12,
                width:400,
                handler: function(picker, date) {
                }
            }]
        }];

        me.callParent(arguments);
    }
});