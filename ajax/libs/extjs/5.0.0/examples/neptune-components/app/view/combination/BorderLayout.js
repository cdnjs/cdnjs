Ext.define('Neptune.view.combination.BorderLayout', function() {
    function closeRegion (e, target, header, tool) {
        var panel = header.ownerCt;
        newRegions.unshift(panel.initialConfig);
        header.up('borderLayout').remove(panel);
    }

    var newRegions = [{
            region: 'north',
            title: 'North 2',
            height: 100,
            collapsible: true,
            weight: -120
        }, {
            region: 'east',
            title: 'East 2',
            width: 100,
            collapsible: true,
            weight: -110
        }, {
            region: 'west',
            title: 'West 2',
            width: 100,
            collapsible: true,
            weight: -110
        }],
        pbar = Ext.widget({ xtype: 'progressbar' });

    pbar.wait({ text: 'Progress text...' });

    return {
        extend: 'Ext.panel.Panel',
        xtype: 'borderLayout',
        id: 'borderLayout',
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true
        },
        items: [{
            region: 'north',
            collapsible: true,
            title: 'North',
            split: true,
            height: 100,
            minHeight: 60,
            html: NeptuneAppData.dummyText
        },{
            region: 'west',
            collapsible: true,
            title: 'Starts at width 20%',
            split: true,
            width: '20%',
            minWidth: 100,
            minHeight: 140,
            layout: 'anchor',
            bodyPadding: 10,
            tbar: [
                { xtype: 'complexButtonGroup' }
            ],
            defaults: {
                anchor: '100%'
            },
            autoScroll: true,
            items: [
                { xtype: 'textField' },
                { xtype: 'dateField' },
                { xtype: 'numberField' },
                { xtype: 'checkboxes' },
                { xtype: 'radioButtons' },
                { xtype: 'htmlEditor' }
            ],
            bbar: { xtype: 'basicToolbar' }
        }, {
            region: 'center',
            html: 'center center',
            title: 'Center',
            minHeight: 80,
            layout: 'fit',
            items: [cw = Ext.create('Ext.Window', {
                xtype: 'window',
                closable: false,
                minimizable: true,
                title: 'Constrained Window',
                height: 200,
                width: 400,
                constrain: true,
                html: 'I am in a Container',
                itemId: 'center-window',
                minimize: function() {
                    this.floatParent.down('button#toggleCw').toggle();
                }
            }),
            {
                xtype: 'basicGrid',
                border: 0,
                title: null
            }],
            lbar: { xtype: 'basicToolbar' },
            bbar: [ 'Text followed by a spacer', ' ', {
                itemId: 'toggleCw',
                text: 'Constrained Window',
                enableToggle: true,
                toggleHandler: function() {
                    cw.setVisible(!cw.isVisible());
                }
            }, {
                text: 'Add Region',
                listeners: {
                    click: function (button) {
                        if (newRegions.length) {
                            var region = newRegions.pop();
                            region.tools = [ { type: 'close', handler: closeRegion }];
                            button.up('borderLayout').add(region);
                        } else {
                            Ext.Msg.show({
                                title: 'All added',
                                msg: 'Close one of the dynamic regions first',
                                //minWidth: Ext.Msg.minWidth,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    }
                }
            }, {
                text: 'Change Titles',
                listeners: {
                    click: function (button) {
                        var panels = button.up('borderLayout').query('panel');
                        Ext.each(panels, function (panel) {
                            panel.setTitle(panel.title + '!');
                        })
                    }
                }
            }]
        },{
            region: 'east',
            collapsible: true,
            floatable: true,
            split: true,
            width: 250,
            minWidth: 120,
            minHeight: 140,
            title: 'East',
            layout: 'fit',
            tbar: [
                { text: 'File' },
                { xtype: 'smallSplitButton', text: 'New', icon: true }
            ],
            lbar: [{
                    iconCls: 'btn-add',
                    tooltip: 'Button 1'
                },
                '-',
                {
                    iconCls: 'btn-add',
                    tooltip: {
                        text: 'Button 2',
                        anchor: 'left'
                    }
                },{
                    iconCls: 'btn-add'
                },{
                    iconCls: 'btn-add'
                },
                '-',
                {
                    iconCls: 'btn-add'
                }
            ],
            items: [
                {
                    xtype: 'basicTree',
                    title: null,
                    border: 0,
                    bodyStyle: 'border: 0;',
                    buttons: [
                        { text: 'Foo' },
                        { text: 'Bar' }
                    ]
                }
            ]
        },{
            region: 'south',
            height: 100,
            split: true,
            collapsible: true,
            title: 'Splitter above me',
            minHeight: 60,
            html: NeptuneAppData.dummyText,
            weight: -100
        },{
            region: 'south',
            collapsible: true,
            split: true,
            height: 200,
            minHeight: 120,
            title: 'South',
            layout: {
                type: 'border',
                padding: 5
            },
            items: [{
                title: 'South Central',
                region: 'center',
                minWidth: 80,
                bodyPadding: 10,
                layout: 'anchor',
                items: [
                    pbar,
                    {
                        xtype: 'slider',
                        hideLabel: true,
                        value: 50,
                        margin: '5 0 0 0',
                        anchor: '100%'
                    },
                    {
                        xtype: 'slider',
                        vertical: true,
                        value: 50,
                        height: 70,
                        margin: '5 0 0 0'
                    }
                ]
            }, {
                title: 'South Eastern',
                region: 'east',
                flex: 1,
                minWidth: 80,
                html: NeptuneAppData.dummyText,
                split: true,
                collapsible: true
            }, {
                title: 'South Western - not resizable',
                region: 'west',
                flex: 1,
                minWidth: 80,
                split: true,
                collapsible: true,
                splitterResize: false,
                collapseMode: 'mini',
                layout: 'fit',
                cls: 'south-west-panel',
                items: [
                    // hack - border: 0 shouldn't be needed
                    { xtype: 'basicTabPanel', border: 0, defaults: { bodyStyle: 'border: 0'} }
                ]
            }]
        }]
    };

});