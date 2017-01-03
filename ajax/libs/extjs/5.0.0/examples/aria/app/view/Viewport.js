Ext.define('Aria.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.tab.Panel',
        'Ext.form.Panel'
    ],

    title: 'Ext JS Accessibility Demo',
    layout: 'border',

    initComponent: function() {
        var me = this,
            num = 1;

        me.items = [{
            xtype: 'container',
            region: 'north',
            padding: '6 12',
            height: 40,
            ariaLabelledBy: '.regionHeader',
            layout: {
                align: 'stretch',
                type: 'hbox'
            },
            
            items: [{
                xtype: 'component',
                cls: 'regionHeader',
                html: 'Ext JS Accessibility Demo'
            }, {
                xtype: 'component',
                flex: 3
            }, {
                xtype: 'checkbox',
                boxLabel: 'Aria Support',
                checked: true
            }]
        }, {
            xtype: 'mysimpleform',
            region: 'west',
            split: true,
            title: 'Personal data form'
        }, {
            xtype: 'tabpanel',
            title: 'Center tab panel',
            region: 'center',
            header: false,
            split: true,
            layout: 'fit',
            bodyStyle: 'background:white',
            defaults: {
                padding: 12,
                bodyStyle: 'background:white'
            },
            
            items: [{
                xtype: 'mysimplebuttons'
            }, {
                xtype: 'mysimplepanel'
            }, {
                xtype: 'mysimplelist'
            },  {
                xtype: 'mysimplegrid'
            }, {
                xtype: 'container',
                title: 'Window',
                items: [{
                    xtype: 'button',
                    text: 'Open Window',
                    handler: function() {
                        var win = this.up('container').add(Ext.widget('mysimplewindow', {
                            title:'ARIA Window ' + num++
                        }));
                        
                        win.showBy(this, 'tr', [num*20, num*20]);
                    }
                }]
            }, {
                xtype: 'mysimpleitemselector'
//             }, {
//                 xtype: 'mysimpledatepicker'
            }, {
                xtype: 'mysimpletoolbar'
            }, {
                xtype: 'mysimplewizard'
            }, {
                xtype: 'container',
                title: 'Image',
                closable: true,
                
                items: [{
                    xtype: 'mysimpleimage'
                }]
            }]
        }];

        me.callParent(arguments);
    }
});
