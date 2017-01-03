Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    // create some portlet tools using built in Ext tool ids
    var tools = [{
        type: 'gear',
        handler: function () {
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
        }
    }, {
        type: 'close',
        handler: function (e, target, panel) {
            panel.ownerCt.remove(panel, true);
        }
    }];

    Ext.create('Ext.Viewport', {
        layout: 'fit',
        items: [{
            xtype: 'grouptabpanel',
            activeGroup: 0,
            items: [{
                mainItem: 1,
                items: [{
                    title: 'Tickets',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Tickets tabtip',
                    //border: false,
                    xtype: 'stocks',
                    margin: '10',
                    height: null
                }, {
                    xtype: 'portalpanel',
                    title: 'Dashboard',
                    tabTip: 'Dashboard tabtip',
                    border: false,
                    items: [{
                        flex: 1,
                        items: [{
                            title: 'Portlet 1',
                            html: '<div class="portlet-content">' + Ext.example.bogusMarkup + '</div>'
                        }, {

                            title: 'Stock Portlet',
                            items: {
                                xtype: 'markets'
                            }
                        }, {
                            title: 'Portlet 2',
                            html: '<div class="portlet-content">' + Ext.example.bogusMarkup + '</div>'
                        }]
                    }]
                }, {
                    title: 'Subscriptions',
                    iconCls: 'x-icon-subscriptions',
                    tabTip: 'Subscriptions tabtip',
                    style: 'padding: 10px;',
                    border: false,
                    layout: 'fit',
                    items: [{
                        xtype: 'tabpanel',
                        activeTab: 0,
                        items: [{
                            title: 'Nested Tabs',
                            html: Ext.example.shortBogusMarkup
                        }]
                    }]
                }, {
                    title: 'Users',
                    iconCls: 'x-icon-users',
                    tabTip: 'Users tabtip',
                    style: 'padding: 10px;',
                    html: Ext.example.shortBogusMarkup
                }]
            }, {
                expanded: true,
                items: [{
                    title: 'Configuration',
                    iconCls: 'x-icon-configuration',
                    tabTip: 'Configuration tabtip',
                    style: 'padding: 10px;',
                    html: Ext.example.shortBogusMarkup
                }, {
                    title: 'Email Templates',
                    iconCls: 'x-icon-templates',
                    tabTip: 'Templates tabtip',
                    style: 'padding: 10px;',
                    border: false,
                    items: {
                        xtype: 'form',
                        // since we are not using the default 'panel' xtype, we must specify it
                        id: 'form-panel',
                        labelWidth: 75,
                        title: 'Form Layout',
                        bodyStyle: 'padding:15px',
                        labelPad: 20,
                        defaults: {
                            width: 230,
                            labelSeparator: '',
                            msgTarget: 'side'
                        },
                        defaultType: 'textfield',
                        items: [{
                            fieldLabel: 'First Name',
                            name: 'first',
                            allowBlank: false
                        }, {
                            fieldLabel: 'Last Name',
                            name: 'last'
                        }, {
                            fieldLabel: 'Company',
                            name: 'company'
                        }, {
                            fieldLabel: 'Email',
                            name: 'email',
                            vtype: 'email'
                        }],
                        buttons: [{
                            text: 'Save'
                        }, {
                            text: 'Cancel'
                        }]
                    }
                }]
            }, {
                expanded: false,
                items: {
                    title: 'Single item in third',
                    bodyPadding: 10,
                    html: '<h1>The third tab group only has a single entry.<br>This is to test the tab being tagged with both "first" and "last" classes to ensure rounded corners are applied top and bottom</h1>',
                    border: false
                }
            }]
        }]
    });
});