Ext.require(['Ext.data.*', 'Ext.grid.*']);

Ext.define('Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'email', 'first', 'last'],
    validations: [{
        type: 'length',
        field: 'email',
        min: 1
    }, {
        type: 'length',
        field: 'first',
        min: 1
    }, {
        type: 'length',
        field: 'last',
        min: 1
    }]
});

Ext.onReady(function(){

    var store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Person',
        proxy: {
            type: 'rest',
            url: 'app.php/users',
            reader: {
                type: 'json',
                rootProperty: 'data'
            },
            writer: {
                type: 'json'
            }
        },
        listeners: {
            write: function(store, operation){
                var record = operation.getRecords()[0],
                    name = Ext.String.capitalize(operation.action),
                    verb;
                    
                    
                if (name == 'Destroy') {
                    verb = 'Destroyed';
                } else {
                    verb = name + 'd';
                }
                Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                
            }
        }
    });
    
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        listeners: {
            cancelEdit: function(rowEditing, context) {
                // Canceling editing of a locally added, unsaved record: remove it
                if (context.record.phantom) {
                    store.remove(context.record);
                }
            }
        }
    });
    
    var grid = Ext.create('Ext.grid.Panel', {
        renderTo: document.body,
        plugins: [rowEditing],
        width: 500,
        height: 330,
        frame: true,
        title: 'Users',
        store: store,
        iconCls: 'icon-user',
        columns: [{
            text: 'ID',
            width: 50,
            sortable: true,
            dataIndex: 'id',
            renderer: function(v, meta, rec) {
                return rec.phantom ? '' : v;
            }
        }, {
            text: 'Email',
            flex: 1,
            sortable: true,
            dataIndex: 'email',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'First',
            width: 120,
            sortable: true,
            dataIndex: 'first',
            field: {
                xtype: 'textfield'
            }
        }, {
            text: 'Last',
            width: 120,
            sortable: true,
            dataIndex: 'last',
            field: {
                xtype: 'textfield'
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Add',
                iconCls: 'icon-add',
                handler: function(){
                    // empty record
                    store.insert(0, new Person());
                    rowEditing.startEdit(0, 0);
                }
            }, '-', {
                itemId: 'delete',
                text: 'Delete',
                iconCls: 'icon-delete',
                disabled: true,
                handler: function(){
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store.remove(selection);
                    }
                }
            }]
        }]
    });
    grid.getSelectionModel().on('selectionchange', function(selModel, selections){
        grid.down('#delete').setDisabled(selections.length === 0);
    });
});
