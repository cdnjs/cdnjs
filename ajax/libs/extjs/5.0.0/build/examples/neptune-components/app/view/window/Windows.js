Ext.define('Neptune.view.window.Windows', {
    extend: 'Ext.container.Container',
    xtype: 'windows',
    id: 'windows',

    layout: {
        type: 'table',
        columns: 4,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    items: [
        { xtype: 'basicWindow', x: 15, y: 60, width: 300, height: 200 },
        { xtype: 'windowWithButtons', x: 350, y: 60, width: 300, height: 200 },
        { xtype: 'button', text: 'Show a Message Box', handler: function() {
            Ext.Msg.show({
                 title:'Really?',
                 msg: 'Are you sure you want to do that?',
                 buttons: Ext.Msg.YESNOCANCEL,
                 icon: Ext.Msg.QUESTION
            });
        }}
    ],

    afterRender: function() {
        this.floatingItems.getAt(0).show();
        this.floatingItems.getAt(1).show();
        this.callParent(arguments);
    }
});