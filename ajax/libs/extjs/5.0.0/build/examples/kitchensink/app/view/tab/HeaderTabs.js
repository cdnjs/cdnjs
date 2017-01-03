/**
 * This example demonstrates a Tab Panel with its Tab Bar rendered inside the panel header.
 * This configuration allows panel title and tabs to be displayed parallel to each other.
 */
Ext.define('KitchenSink.view.tab.HeaderTabs', {
    extend: 'Ext.container.Container',
    xtype: 'header-tabs',

    //<example>
    exampleTitle: 'Header Tabs',
    themes: {
        classic: {
            icon1: 'resources/images/icons/fam/cog.gif',
            icon2: 'resources/images/icons/fam/user.gif',
            icon3: 'resources/images/icons/fam/accept.gif',
            iconAdd: 'resources/images/icons/fam/add.gif',
            iconHeader: 'resources/images/icons/fam/application_view_list.png',
            buttonUI: 'default',
            width: 700
        },
        neptune: {
            glyph1: 42,
            glyph2: 70,
            glyph3: 86,
            glyphAdd: 43,
            glyphHeader: 77,
            buttonUI: 'default-toolbar',
            width: 800
        },
        'neptune-touch': {
            width: 900
        }
    },
    //</example>

    layout: {
        type: 'hbox',
        align: 'middle'
    },
    viewModel: true,

    initComponent: function() {
        Ext.apply(this, {
            width: this.themeInfo.width,
            items: [{
                xtype: 'fieldset',
                title: 'Options',
                layout: 'auto',
                margin: '0 20 0 0',
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Header Position',
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'positionBtn',
                        value: 'top',
                        items: [
                            { text: 'Top', value: 'top' },
                            { text: 'Right', value: 'right' },
                            { text: 'Bottom', value: 'bottom' },
                            { text: 'Left', value: 'left' }
                        ]
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tab Rotation',
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'tabRotationBtn',
                        value: 'default',
                        items: [
                            { text: 'Default', value: 'default' },
                            { text: 'None', value: 0 },
                            { text: '90deg', value: 1 },
                            { text: '270deg', value: 2 }
                        ]
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Title Rotation',
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'titleRotationBtn',
                        value: 'default',
                        items: [
                            { text: 'Default', value: 'default' },
                            { text: 'None', value: 0 },
                            { text: '90deg', value: 1 },
                            { text: '270deg', value: 2 }
                        ]
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Title Align',
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'titleAlignBtn',
                        value: 'left',
                        items: [
                            { text: 'Left', value: 'left' },
                            { text: 'Center', value: 'center' },
                            { text: 'Right', value: 'right' }
                        ]
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Icon Align',
                    items: [{
                        xtype: 'segmentedbutton',
                        reference: 'iconAlignBtn',
                        value: 'left',
                        items: [
                            { text: 'Top', value: 'top' },
                            { text: 'Right', value: 'right' },
                            { text: 'Bottom', value: 'bottom' },
                            { text: 'Left', value: 'left' }
                        ]
                    }]
                }]
            }, {
                xtype: 'tabpanel',
                title: 'Tab Panel',
                flex: 1,
                height: 500,
                icon: this.themeInfo.iconHeader,
                glyph: this.themeInfo.glyphHeader,
                tabBarHeaderPosition: 2,
                reference: 'tabpanel',
                plain: true,
                defaults: {
                    bodyPadding: 10,
                    autoScroll: true,
                    border: false
                },
                bind: {
                    headerPosition: '{positionBtn.value}',
                    tabRotation: '{tabRotationBtn.value}',
                    titleRotation: '{titleRotationBtn.value}',
                    titleAlign: '{titleAlignBtn.value}',
                    iconAlign: '{iconAlignBtn.value}'
                },
                items: [{
                    title: 'Tab 1',
                    icon: this.themeInfo.icon1,
                    glyph: this.themeInfo.glyph1,
                    html: KitchenSink.DummyText.longText
                }, {
                    title: 'Tab 2',
                    icon: this.themeInfo.icon2,
                    glyph: this.themeInfo.glyph2,
                    html: KitchenSink.DummyText.extraLongText
                }, {
                    title: 'Tab 3',
                    icon: this.themeInfo.icon3,
                    glyph: this.themeInfo.glyph3,
                    html: KitchenSink.DummyText.longText
                }]
            }]
        });

        this.callParent();
    }
});