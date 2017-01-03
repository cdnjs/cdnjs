/**
 * This example demonstrates how to create framed panels. Framing is a theme-specific
 * concept that adds rounded corners and sometimes a background-color, depending on what
 * is specified in the theme css.
 */
Ext.define('KitchenSink.view.panel.FramedPanels', {
    extend: 'Ext.Container',
    xtype: 'framed-panels',
    width: 660,

    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 10px; vertical-align: top;' }
    },

    defaults: {
        xtype: 'panel',
        width: 200,
        height: 280,
        bodyPadding: 10,
        frame: true
    },
    //<example>
    themes: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    initComponent: function () {
        this.items = [
            {
                html: KitchenSink.DummyText.mediumText
            },
            {
                title: 'Title',
                html: KitchenSink.DummyText.mediumText
            },
            {
                title: 'Collapsible',
                collapsible: true,
                html: KitchenSink.DummyText.mediumText
            },
            {
                title: 'Tools',
                collapsed: true,
                collapsible: true,
                width: 640,
                html: KitchenSink.DummyText.mediumText,
                tools: [
                    { type:'pin' },
                    { type:'refresh' },
                    { type:'search' },
                    { type:'save' }
                ],
                colspan: 3
            }
        ];

        this.callParent();
    }
});
