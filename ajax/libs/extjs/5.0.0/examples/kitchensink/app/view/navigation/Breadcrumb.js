Ext.define('KitchenSink.view.navigation.Breadcrumb', {
    extend: 'Ext.toolbar.Toolbar',
    id: 'navigation-breadcrumb',
    xtype: 'navigation-breadcrumb',

    config: {
        selection: null
    },

    initComponent: function() {
        this.items = [{
            xtype: 'tool',
            type: 'down',
            tooltip: 'Switch to Tree View',
            listeners: {
                click: 'showTreeNav'
            }
        }, {
            xtype: 'breadcrumb',
            reference: 'toolbar',
            selection: this.getSelection(),
            flex: 1,
            store: Ext.StoreMgr.get('navigation')
        }];

        this.callParent();

        this._breadcrumbBar = this.items.getAt(1);
    },

    updateSelection: function(node) {
        if (this.rendered) {
            this._breadcrumbBar.setSelection(node);
        }
    }
});
