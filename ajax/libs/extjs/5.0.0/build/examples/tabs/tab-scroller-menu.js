Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');

Ext.require([
    'Ext.tip.QuickTipManager',
    'Ext.window.Window',
    'Ext.tab.Panel',
    'Ext.ux.TabScrollerMenu'
]);

Ext.onReady(function() {
    // enable the tabTip config below
    Ext.tip.QuickTipManager.init();

    var win = Ext.widget('window', {
        constrain: true,
        height: 400,
        width: 600,
        layout: 'fit',
        title: 'Exercising scrollable tabs with a TabScroller menu',
        border: false,
        items: {
            xtype: 'tabpanel',
            activeTab: 0,
            itemId: 'tabPanel',
            plugins: [{
                ptype: 'tabscrollermenu',
                maxText  : 15,
                pageSize : 5
            }],
            items: [{
                title: 'First tab',
                html: 'Creating more tabs...'
            }]
        }
    });

    win.show();

    // Add a bunch of tabs dynamically
    var tabLimit = 12,
        tabPanel = win.getComponent('tabPanel');

    Ext.defer(function (num) {
        var i,
            title,
            tabs = [];
        for (i = 1; i <= tabLimit; i++) {
            title = 'Tab # ' + i;
            tabs.push({
                title: title,
                html: 'Hi, I am tab ' + i,
                tabTip: title,
                closable: true
            });
        }
        tabPanel.add(tabs);
        tabPanel.getComponent(0).body.update('Done!');
    }, 100);
});