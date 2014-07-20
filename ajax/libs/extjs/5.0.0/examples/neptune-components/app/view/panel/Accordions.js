Ext.define('Neptune.view.panel.Accordions', {
    extend: 'Ext.container.Container',
    xtype: 'accordions',
    id: 'accordions',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' }
    },
    defaults: {
        height: 400,
        width: 200
    },
    items: [
        { xtype: 'accordionPanel' },
        { xtype: 'framedAccordionPanel' }
    ]
});