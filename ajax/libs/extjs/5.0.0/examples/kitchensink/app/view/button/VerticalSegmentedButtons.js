/**
 * Aligning segmented buttons vertically is a simple as setting the `vertical` config to `true`.
 */
Ext.define('KitchenSink.view.button.VerticalSegmentedButtons', {
    extend: 'Ext.Container',
    xtype: 'vertical-segmented-buttons',
    //<example>
    themes: {
        classic: {
            width: 420,
            icon: 'resources/images/icons/add16.gif'
        },
        neptune: {
            width: 475,
            glyph: 72
        },
        'neptune-touch': {
            width: 585
        }
    },
    //</example>

    initComponent: function() {
        Ext.apply(this, {
            layout: 'column',
            width: this.themeInfo.width,
            defaults: {
                xtype: 'fieldcontainer',
                labelAlign: 'top',
                margin: '0 20 0 0'
            },
            items: [{
                fieldLabel: 'Toggle Group',
                items: [{
                    xtype: 'segmentedbutton',
                    vertical: true,
                    items: [{
                        text: 'Option One'
                    }, {
                        text: 'Option Two',
                        pressed: true
                    }, {
                        text: 'Option Three'
                    }]
                }]
            }, {
                fieldLabel: 'Multiple Toggle',
                items: [{
                    xtype: 'segmentedbutton',
                    vertical: true,
                    allowMultiple: true,
                    pressedButtons: [0, 2],
                    items: [{
                        text: 'Option One'
                    }, {
                        text: 'Option Two'
                    }, {
                        text: 'Option Three'
                    }]
                }]
            }, {
                fieldLabel: 'No Toggle',
                items: [{
                    xtype: 'segmentedbutton',
                    vertical: true,
                    allowToggle: false,
                    items: [{
                        text: 'Option One'
                    }, {
                        text: 'Option Two'
                    }, {
                        text: 'Option Three'
                    }]
                }]
            }, {
                fieldLabel: 'Icons and Arrows',
                items: [{
                    xtype: 'segmentedbutton',
                    vertical: true,
                    allowToggle: false,
                    items: [{
                        icon: this.themeInfo.icon,
                        glyph: this.themeInfo.glyph,
                        text: 'Button'
                    }, {
                        text: 'Menu Button',
                        menu: [
                            { text: 'Menu Item 1' },
                            { text: 'Menu Item 2' },
                            { text: 'Menu Item 3' }
                        ]
                    }, {
                        xtype: 'splitbutton',
                        text: 'Split Button',
                        menu: [
                            { text: 'Menu Item 1' },
                            { text: 'Menu Item 2' },
                            { text: 'Menu Item 3' }
                        ]
                    }]
                }]
            }]
        });
        this.callParent();
    }
});
