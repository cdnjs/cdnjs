/**
 * This examples shows how heterogeneous models can be read into a TreeStore offering the
 * ability to have different entity types at different levels of a tree.
 *
 * The Model classes at each level of the tree are different types. So you can use associated
 * but different data types in your trees. The key to this is the `typeProperty` config on
 * the Proxy's Reader.
 *
 * The toolbar is aware of the type of the selected node and knows what kind of new entity
 * to add.
 */
Ext.define('KitchenSink.view.tree.HeterogeneousTree', {
    extend: 'Ext.tree.Panel',

    xtype: 'heterogeneous-tree',

    //<example>
    exampleTitle: 'Heterogeneous Geographical Tree',
    otherContent: [{
        type: 'Store',
        path: 'app/store/GeoData.js'
    },{
        type: 'Model',
        path: 'app/model/tree/Territory.js'
    },{
        type: 'Model',
        path: 'app/model/tree/Country.js'
    },{
        type: 'Model',
        path: 'app/model/tree/City.js'
    },{
        type: 'Data',
        path: 'app/data/GeoData.js'
    }],
    //</example>
    store: 'GeoData',
    rootVisible: false,
    animate: false,
    frame: true,
    title: 'Heterogeneous Geographical Tree',
    width: 650,
    height: 400,
    reserveScrollbar: true,
    columns: [{
        xtype: 'treecolumn',
        text: 'Name',
        dataIndex: 'name',
        flex: 1,
        sortable: true
    }, {
        text: 'Type',
        renderer: function(v, cellValues, record) {
            return record.entityName;
        }
    }, {
        xtype: 'actioncolumn',
        iconCls: 'area-info-icon',
        width: 25,
        getTip: function(value, meta, rec, rowIdx, colIdx, store, view) {
            // Go up from the view to the owning TreePanel
            var panel = view.up('');
            return panel.getActionTip.apply(panel, arguments);
        },
        handler: function(view) {
            // Go up from the view to the owning TreePanel
            var panel = view.up('');
            panel.onDrillAction.apply(panel, arguments);
        }
    }],

    selModel: {
        allowDeselect: true,
        listeners: {
            selectionchange: function(selModel, selection) {
                // Go up from the view to the owning TreePanel
                var panel = selModel.view.up('');
                panel.onSelectionChange.apply(panel, arguments);
            }
        },
        onKeyEnter: function() {
            // Go up from the view to the owning TreePanel
            var panel = this.view.up('');
            panel.down('#new-name').focus();
        }
    },

    bbar: [{
        xtype: 'textfield',
        itemId: 'new-name',
        enableKeyEvents: true,
        listeners: {
            keydown: function(inputField, e) {
                // Go up from the view to the owning TreePanel
                var panel = inputField.up('treepanel');
                if (e.keyCode === Ext.EventObject.ENTER) {
                    panel.addClick();
                } else if (e.keyCode === Ext.EventObject.TAB && e.shiftKey) {
                    e.stopEvent();
                    panel.view.focusRow(panel.selModel.getSelection()[0] || 0);
                }
            }
        }
    }, {
        itemId: 'add-button',
        text: 'Add Territory',
        handler: function(button) {
            // Go up from the view to the owning TreePanel
            var panel = button.up('treepanel');
            panel.addClick();
        }
    }],

    addClick: function() {
        var target = this.selModel.getSelection()[0] || this.getRootNode(),
            inputField = this.down('#new-name'),
            node,
            value = inputField && inputField.getValue();

        if (value) {
            node = {
                name: value
            };

            if (target.isRoot() ) {
                //Nothing selected -- adding new Territory
                node.children = [];
                node.mtype = 'Territory';
            } else if (target instanceof KitchenSink.model.tree.Territory) {
                // Programatically added - must not try to load over Ajax
                node.children = [];
                node.mtype = 'Country';
            } else if (target instanceof KitchenSink.model.tree.Country) {
            // Adding to the Country level - that is our leaf level
                node.leaf = true;
                node.mtype = 'City';
            }
            
            node = target.appendChild(node);

            // User might want to see what they've just added!
            if (!target.isExpanded()) {
                target.expand(false, function() {
                });
            }
            this.selModel.select(node);
            inputField.reset();
        }
    },

    onSelectionChange: function(selModel, selection) {
        var button = this.down('#add-button'),
            selectedNode;

        if (selection.length) {
            selectedNode = selection[0];
            if (selectedNode instanceof KitchenSink.model.tree.Territory) {
                this.addClass = KitchenSink.model.tree.Country;
                button.setText('Add Country');
                button.enable();
            } else if (selectedNode instanceof KitchenSink.model.tree.Country) {
                this.addClass = KitchenSink.model.tree.City;
                button.setText('Add City');
                button.enable();
            } else {
                button.disable();
            }
        } else {
            this.addClass = KitchenSink.model.tree.Territory;
            button.setText('Add Territory');
            button.enable();
        }
    },

    getActionTip: function(value, meta, rec, rowIdx, colIdx, store, view) {
        var dataType;
        switch (Ext.ClassManager.getName(rec)) {
            case "KitchenSink.model.tree.Territory":
                dataType = 'territory';
                break;
            case "KitchenSink.model.tree.Country":
                dataType = 'country';
                break;
            case "KitchenSink.model.tree.City":
                dataType = 'city';
        }
        return 'Click for info on ' + dataType;
    },

    onDrillAction: function(view, rowIndex, colIndex, row, event, rec) {
        var dataType;
        switch (Ext.ClassManager.getName(rec)) {
            case "KitchenSink.model.tree.Territory":
                dataType = 'territory';
                break;
            case "KitchenSink.model.tree.Country":
                dataType = 'country';
                break;
            case "KitchenSink.model.tree.City":
                dataType = 'city';
        }
        Ext.Msg.alert('Action', 'Drill into ' + dataType + ' details');
    }
});
