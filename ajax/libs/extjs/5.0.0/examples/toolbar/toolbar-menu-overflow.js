Ext.require(['*']);

function doTest () {
    var buttons = [{
        xtype: 'tbtext',
        text : 'Text'
    },  {
        xtype: 'tbseparator'
    }];

    for (var i = 0; i++ < 20; ) {
        buttons.push({
            text: 'Button ' + i,
            id: 'button' + i,
            handler: function(b) {
                Ext.Msg.alert('Click', 'You clicked ' + b.text);
            }
        })
    }

    Ext.create('Ext.toolbar.Toolbar', {
        renderTo: Ext.getBody(),
        width : 600,
        layout: {
            overflowHandler: 'Menu'
        },
        items: buttons
    });
}

Ext.onReady(doTest);
