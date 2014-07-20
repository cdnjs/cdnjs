Ext.define('Neptune.view.Content', {
    extend: 'Ext.panel.Panel',
    xtype: 'content',

    layout: {
        type: 'card',
        deferredRender: true
    },
    bodyPadding: '10 ' + (Ext.getScrollbarSize().width + 10) + ' 10 10',
    autoScroll: true,
    items: [
        { xtype: 'panels' },
        { xtype: 'framedPanels' },
        { xtype: 'accordions' },
        { xtype: 'toolbars' },
        { xtype: 'buttons' },
        { xtype: 'menuButtons' },
        { xtype: 'splitButtons' },
        { xtype: 'buttonGroups' },
        { xtype: 'formFields' },
        { xtype: 'forms' },
        { xtype: 'fieldsets' },
        { xtype: 'windows' },
        { xtype: 'tabs' },
        { xtype: 'bottomTabs' },
        { xtype: 'overflowTabs' },
        { xtype: 'trees' },
        { xtype: 'grids' },
        { xtype: 'panelTabToolbarGrid' },
        { xtype: 'toolbarsInPanels' },
        { xtype: 'toolbarsInTabs' },
        { xtype: 'borderLayout' },
        { xtype: 'borderLayoutWindow' },
        { xtype: 'formWithTabs' },
        { xtype: 'nestedTabs' }
    ]

});