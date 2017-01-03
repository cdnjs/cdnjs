Ext.define('KitchenSink.view.layout.CardTabs', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.layout.container.Card'
    ],
    xtype: 'layout-cardtabs',
    //<example>
    exampleTitle: 'Card Layout (Tabs)',
    //</example>

    style: 'background-color:#dfe8f6; ',
    width: 500,
    height: 400,

    defaults: {
        bodyPadding: 15
    },

    items:[
        {
            title: 'Tab 1',
            html:   'Note that the Ext.tab.Panel (TabPanel) component uses an internal CardLayout -- it is not ' +
                    'something you have to explicitly configure.  However, it is still a perfect ' +
                    'example of how this layout style can be used in a complex component.'
        },
        {
            title: 'Tab 2',
            html: 'This is tab 2 content.'
        },
        {
            title: 'Tab 3',
            html: 'This is tab 3 content.'
        }
    ]

});