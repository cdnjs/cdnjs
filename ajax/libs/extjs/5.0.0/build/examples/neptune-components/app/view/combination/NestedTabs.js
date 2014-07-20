Ext.define('Neptune.view.combination.NestedTabs', {
    extend: 'Ext.container.Container',
    xtype: 'nestedTabs',
    id: 'nestedTabs',

    items: [{
        xtype: 'tabpanel',
        height: 300,
        width: 600,
        activeTab: 0,
        defaults: {
            padding: 10
        },
        
        items: [{
            xtype: 'tabpanel',
            title: 'Tab 1',
            id: 'tab1',
            activeTab: 0,
            padding: 5,
            border: true,
            plain: true,
            
            defaults: {
                padding: 10
            },

            items: [{
                title: 'Sub-tab 1',
                id: 'subtab1',
                html: 'Sub-tab 1 content'
            },{
                title: 'Sub-tab 2',
                id: 'subtab2',
                html: 'Sub-tab 2 content'
            },{
                title: 'Sub-tab 3',
                id: 'subtab3',
                html: 'Sub-tab 3 content'
            }]
        },{
            title: 'Tab 2',
            id: 'tab2',
            html: 'Tab 2 content'
        },{
            title: 'Tab 3',
            id: 'tab3',
            html: 'Tab 3 content'
        },{
            title: 'Tab 4',
            id: 'tab4',
            html: 'Tab 4 content'
        },{
            title: 'Tab 5',
            id: 'tab5',
            html: 'Tab 5 content'
        }]
    }]
});