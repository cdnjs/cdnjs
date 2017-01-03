Ext.define('KitchenSink.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'border',
    stateful: true,
    stateId: 'kitchensink-viewport',

    items: [{
        region: 'north',
        xtype: 'appHeader'
    }, {
        region: 'center',
        xtype: 'contentPanel',
        reference: 'contentPanel',
        dockedItems: [{
            xtype: 'navigation-breadcrumb',
            reference: 'breadcrumb>'
        }]
    }, {
        xtype: 'codePreview',
        region: 'east',
        id: 'east-region',
        itemId: 'codePreview',
        stateful: true,
        stateId: 'mainnav.east',
        split: true,
        collapsible: true,
        collapsed: true,
        width: 350,
        minWidth: 100
    }],

    applyState: function(state) {
        this.getController().applyState(state);

    },

    getState: function() {
        return this.getController().getState();
    }
});
