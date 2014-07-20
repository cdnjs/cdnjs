/**
 * Panel headers can be docked to any side of the panel.  This example demonstrates how
 * to dynamically change the position of a panel header by binding the headerPosition
 * config to the value of a segmented button.
 */
Ext.define('KitchenSink.view.panel.HeaderPosition', {
    extend: 'Ext.panel.Panel',
    xtype: 'panel-header-position',

    //<example>
    exampleTitle: 'Panel Header Positioning',
    themes: {
        classic: {
            icon: 'resources/images/icons/fam/user.gif',
            panelMargin: '10 5 10 10',
            framedPanelMargin: '10 10 10 5'
        },
        neptune: {
            glyph: 117,
            bodyStyle: 'background: transparent',
            panelMargin: '10 5 0 0',
            framedPanelMargin: '10 0 0 5'
        }
    },
    //</example>

    width: 600,
    layout: 'column',
    viewModel: true,

    defaults: {
        bodyPadding: 10,
        height: 300,
        autoScroll: true
    },

    initComponent: function() {

        this.bodyStyle = this.themeInfo.bodyStyle;

        this.tbar = [
            {
                xtype: 'label',
                text: 'Header Position:'
            },
            {
                xtype: 'segmentedbutton',
                reference: 'positionBtn',
                value: 'top',
                defaultUI: 'default',
                items: [{
                    text: 'Top',
                    value: 'top'
                }, {
                    text: 'Right',
                    value: 'right'
                }, {
                    text: 'Bottom',
                    value: 'bottom'
                }, {
                    text: 'Left',
                    value: 'left'
                }]
            }
        ];

        this.items = [{
            columnWidth: 0.5,
            margin: this.themeInfo.panelMargin,
            title: 'Panel',
            icon: this.themeInfo.icon,
            glyph: this.themeInfo.glyph,
            html: KitchenSink.DummyText.longText,
            bind: {
                headerPosition: '{positionBtn.value}'
            }
        }, {
            columnWidth: 0.5,
            margin: this.themeInfo.framedPanelMargin,
            frame: true,
            title: 'Framed Panel',
            icon: this.themeInfo.icon,
            glyph: this.themeInfo.glyph,
            html: KitchenSink.DummyText.longText,
            bind: {
                headerPosition: '{positionBtn.value}'
            }
        }];

        this.callParent();
    }
});