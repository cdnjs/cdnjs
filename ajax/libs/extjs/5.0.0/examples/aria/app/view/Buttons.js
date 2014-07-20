Ext.define('Aria.view.Buttons', {
    extend:'Ext.container.Container',
    alias:'widget.mysimplebuttons',
    title:'Buttons',

    width:400,

    layout:{
        type:'hbox',
        defaultMargins:{
            top:6,
            bottom:6,
            left:6,
            right:6
        }
    },

    initComponent:function () {
        var me = this;

        Ext.applyIf(me, {
            items:[
                {
                    xtype:'button',
                    text:'Click Me',
                    handler:function () {
                        Aria.app.msg('Button Click', 'You clicked the "{0}" button.', this.displayText || this.text);

                    }
                },
                {
                    xtype:'button',
                    text:'Toggle Me',
                    enableToggle:true
                },
                {
                    xtype:'button',
                    text:'Menu Button',
                    menu:this.makeMenu(5)
                }
            ]
        });

        me.callParent(arguments);
    },

    makeMenu:function (numItems) {
        var items = [];
        for (var i = 0; i < numItems; i++) {
            items.push({
                text:'Item ' + (i + 1),
                handler:this.menuHandler
            });
        }
        return new Ext.menu.Menu({items:items});
    },

    menuHandler:function (item) {
        Aria.app.msg('Menu Click', 'You clicked the "{0}" menu.', item.text);

    }
});