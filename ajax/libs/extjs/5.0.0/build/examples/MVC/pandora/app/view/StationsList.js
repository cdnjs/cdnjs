Ext.define('Pandora.view.StationsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.stationslist',
    
    store: 'Stations',
    title: 'Stations',
    hideHeaders: true,
    
    initComponent: function() {
        this.columns = [{
            dataIndex: 'name',
            flex: 1
        }];
        
        this.dockedItems = [{
            dock: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Settings',
                action: 'settings'
            }, {
                xtype: 'buttongroup',
                items: [{
                    text: 'By Date',
                    action: 'filter-date'
                }, {
                    text: 'ABC',
                    action: 'filter-name'
                }]
            }]
        }];
        
        this.callParent();
    }
});