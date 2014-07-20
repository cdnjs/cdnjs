/**
 * This component provides a grid holding selected items from a second store of potential
 * members. The `store` of this component represents the selected items. The `searchStore`
 * represents the potentially selected items.
 *
 * The default view defined by this class is intended to be easily replaced by deriving a
 * new class and overriding the appropriate methods. For example, the following is a very
 * different view that uses a date range and a data view:
 *
 *      Ext.define('App.view.DateBoundSearch', {
 *          extend: 'Ext.view.MultiSelectorSearch',
 *
 *          makeDockedItems: function () {
 *              return {
 *                  xtype: 'toolbar',
 *                  items: [{
 *                      xtype: 'datefield',
 *                      emptyText: 'Start date...',
 *                      flex: 1
 *                  },{
 *                      xtype: 'datefield',
 *                      emptyText: 'End date...',
 *                      flex: 1
 *                  }]
 *              };
 *          },
 *
 *          makeItems: function () {
 *              return [{
 *                  xtype: 'dataview',
 *                  itemSelector: '.search-item',
 *                  selType: 'rowselection',
 *                  store: this.store,
 *                  autoScroll: true,
 *                  tpl:
 *                      '<tpl for=".">' +
 *                          '<div class="search-item">' +
 *                              '<img src="{icon}">' +
 *                              '<div>{name}</div>' +
 *                          '</div>' +
 *                      '</tpl>'
 *              }];
 *          },
 *
 *          getSearchStore: function () {
 *              return this.items.getAt(0).getStore();
 *          },
 *
 *          selectRecords: function (records) {
 *              var view = this.items.getAt(0);
 *              return view.getSelectionModel().select(records);
 *          }
 *      });
 *
 * **Important**: This class assumes there are two components with specific `reference`
 * names assigned to them. These are `"searchField"` and `"searchGrid"`. These components
 * are produced by the `makeDockedItems` and `makeItems` method, respectively. When
 * overriding these it is important to remember to place these `reference` values on the
 * appropriate components.
 */
Ext.define('Ext.view.MultiSelectorSearch', {
    extend: 'Ext.panel.Panel',

    xtype: 'multiselector-search',

    layout: 'fit',

    floating: true,
    resizable: true,
    minWidth: 200,
    minHeight: 200,
    border: true,

    defaultListenerScope: true,
    referenceHolder: true,

    /**
     * @cfg {String} searchText
     * This text is displayed as the "emptyText" of the search `textfield`.
     */
    searchText: 'Search...',

    initComponent: function () {
        var me = this,
            owner = me.owner,
            items = me.makeItems(),
            i, item, records, store;

        me.dockedItems = me.makeDockedItems();
        me.items = items;

        store = Ext.data.StoreManager.lookup(me.store);

        for (i = items.length; i--; ) {
            if ((item = items[i]).xtype === 'grid') {
                item.store = store;
                item.isSearchGrid = true;
                item.selModel = item.selModel || {
                    selType: 'checkboxmodel',
                    pruneRemoved: false,
                    mode: 'SIMPLE',
                    listeners: {
                        selectionchange: 'onSelectionChange'
                    }
                };

                Ext.merge(item, me.grid);

                if (!item.columns) {
                    item.hideHeaders = true;
                    item.columns = [{
                        flex: 1,
                        dataIndex: me.field
                    }];
                }

                break;
            }
        }

        me.callParent();

        records = me.getOwnerStore().getRange();
        if (!owner.convertSelectionRecord.$nullFn) {
            for (i = records.length; i--; ) {
                records[i] = owner.convertSelectionRecord(records[i]);
            }
        }

        if (store.isLoading() || (store.loadCount === 0 && !store.getCount())) {
            store.on('load', function() {
                if (!me.isDestroyed) {
                    me.selectRecords(records);
                }
            }, null, {single: true});
        } else {
            me.selectRecords(records);
        }
    },

    getOwnerStore: function() {
        return this.owner.getStore();
    },

    afterShow: function () {
        var searchField = this.lookupReference('searchField');

        this.callParent(arguments);

        if (searchField) {
            searchField.focus();
        }
    },

    /**
     * Returns the store that holds search results. By default this comes from the
     * "search grid". If this aspect of the view is changed sufficiently so that the
     * search grid cannot be found, this method should be overridden to return the proper
     * store.
     * @return {Ext.data.Store}
     */
    getSearchStore: function () {
        var searchGrid = this.lookupReference('searchGrid');
        return searchGrid.getStore();
    },

    makeDockedItems: function () {
        return [{
            xtype: 'textfield',
            reference: 'searchField',
            dock: 'top',
            hideFieldLabel: true,
            emptyText: this.searchText,
            triggers: {
                clear: {
                    cls: 'x-form-clear-trigger',
                    handler: 'onClearSearch',
                    hidden: true
                }
            },
            listeners: {
                change: 'onSearchChange',
                buffer: 300
            }
        }];
    },

    makeItems: function () {
        return [{
            xtype: 'grid',
            reference: 'searchGrid',
            trailingBufferZone: 2,
            leadingBufferZone: 2,
            viewConfig: {
                deferEmptyText: false,
                emptyText: 'No results.'
            }
        }];
    },

    selectRecords: function (records) {
        var searchGrid = this.lookupReference('searchGrid');
        return searchGrid.getSelectionModel().select(records);
    },

    deselectRecords: function(records) {
        var searchGrid = this.lookupReference('searchGrid');
        return searchGrid.getSelectionModel().deselect(records);
    },

    search: function (text) {
        var me = this,
            filter = me.searchFilter,
            filters = me.getSearchStore().getFilters();

        if (text) {
            filters.beginUpdate();

            if (filter) {
                filter.setValue(text);
            } else {
                me.searchFilter = filter = new Ext.util.Filter({
                    id: 'search',
                    property: me.field,
                    value: text
                });
            }

            filters.add(filter);

            filters.endUpdate();
        } else if (filter) {
            filters.remove(filter);
        }
    },

    privates: {
        onClearSearch: function () {
            var searchField = this.lookupReference('searchField');
            searchField.setValue(null);
            searchField.focus();
        },

        onSearchChange: function (searchField) {
            var value = searchField.getValue(),
                trigger = searchField.getTrigger('clear');

            trigger.setHidden(!value);
            this.search(value);
        },

        onSelectionChange: function (selModel, selection) {
            var owner = this.owner,
                store = owner.getStore(),
                data = store.data,
                remove = 0,
                map = {},
                add, i, id, record;

            for (i = selection.length; i--; ) {
                record = selection[i];
                id = record.id;
                map[id] = record;

                if (!data.containsKey(id)) {
                    (add || (add = [])).push(owner.convertSearchRecord(record));
                }
            }

            for (i = data.length; i--; ) {
                record = data.getAt(i);
                if (!map[record.id]) {
                    (remove || (remove = [])).push(record);
                }
            }

            if (add || remove) {
                data.splice(data.length, remove, add);
            }
        }
    }
});
