/**
 * This example illustrates how to use the grouping feature of the Grid.
 */
Ext.define('KitchenSink.view.grid.GroupedGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'grouped-grid',
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    collapsible: true,
    iconCls: 'icon-grid',
    frame: true,
    width: 600,
    height: 400,

    // Need a minHeight. Neptune resizable framed panels are overflow:visible so as to
    // enable resizing handles to be embedded in the border lines.
    minHeight: 200,
    title: 'Restaurants',
    resizable: true,

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'restaurantGrouping'
    }],
    //<example>
    otherContent: [{
        type: 'Store',
        path: 'app/store/Restaurants.js'
    },{
        type: 'Model',
        path: 'app/model/Restaurant.js'
    }],
    themes: {
        classic: {
        },
        neptune: {
        }
    },
    //</example>

    initComponent: function() {
        this.store = new KitchenSink.store.Restaurants();
        this.columns = [{
            text: 'Name',
            flex: 1,
            dataIndex: 'name'
        },{
            text: 'Cuisine',
            flex: 1,
            dataIndex: 'cuisine'
        }];

        this.callParent();

        var store = this.getStore(),
            toggleMenu = [];

        this.groupingFeature = this.view.getFeature('restaurantGrouping');

        // Create checkbox menu items to toggle associated group
        store.getGroups().each(function(group) {
            toggleMenu.push({
                xtype: 'menucheckitem',
                text: group.getGroupKey(),
                handler: this.toggleGroup,
                scope: this
            });
        }, this);

        this.addDocked([{
            xtype: 'toolbar',
            items: ['->', {
                text: 'Toggle groups...',
                destroyMenu: true,
                menu: toggleMenu
            }]
        }, {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: ['->', {
                text:'Clear Grouping',
                iconCls: 'icon-clear-group',
                scope: this,
                handler: this.onClearGroupingClick
            }]
        }]);

        this.mon(this.store, 'groupchange', this.onGroupChange, this);
        this.mon(this.view, {
            groupcollapse: this.onGroupCollapse,
            groupexpand: this.onGroupExpand,
            scope: this
        });
    },

    onClearGroupingClick: function(){
        this.groupingFeature.disable();
    },

    toggleGroup: function(item) {
        var groupName = item.text;
        if (item.checked) {
            this.groupingFeature.expand(groupName, true);
        } else {
            this.groupingFeature.collapse(groupName, true);
        }
    },

    onGroupChange: function(store, grouper) {
        var grouped = store.isGrouped(),
            groupBy = grouper ? grouper.getProperty() : '',
            toggleMenuItems, len, i = 0;

        // Clear grouping button only valid if the store is grouped
        this.down('[text=Clear Grouping]').setDisabled(!grouped);

        // Sync state of group toggle checkboxes
        if (grouped && groupBy === 'cuisine') {
            toggleMenuItems = this.down('button[text=Toggle groups...]').menu.items.items;
            for (len = toggleMenuItems.length; i < len; i++) {
                toggleMenuItems[i].setChecked(
                    this.groupingFeature.isExpanded(toggleMenuItems[i].text)
                );
            }
            this.down('[text=Toggle groups...]').enable();
        } else {
            this.down('[text=Toggle groups...]').disable();
        }
    },

    onGroupCollapse: function(v, n, groupName) {
        if (!this.down('[text=Toggle groups...]').disabled) {
            this.down('menucheckitem[text=' + groupName + ']').setChecked(false, true);
        }
    },

    onGroupExpand: function(v, n, groupName) {
        if (!this.down('[text=Toggle groups...]').disabled) {
            this.down('menucheckitem[text=' + groupName + ']').setChecked(true, true);
        }
    }
});
