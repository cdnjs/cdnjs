/**
 * This class is a grid {@link Ext.AbstractPlugin plugin} that adds a simple and flexible
 * presentation for {@link Ext.data.AbstractStore#filters store filters}.
 *
 * Filters can be modified by the end-user using the grid's column header menu. Through
 * this menu users can configure, enable, and disable filters for each column.
 *
 * # Example Usage
 *
 *     var grid = Ext.create('Ext.grid.Panel', {
 *          store: {
 *              url: 'path/to/data'
 *          },
 *
 *          plugins: 'gridfilters',
 *
 *          columns: [{
 *              dataIndex: 'id',
 *              text: 'Id',
 *
 *              filter: 'number'
 *          }, {
 *              dataIndex: 'name'
 *              text: 'Name',
 *
 *              filter: {
 *                  type: 'string',
 *                  value: 'Ben'
 *              }
 *          }, {
 *              ...
 *          }]
 *     });
 *
 *     // A filters property is added to the grid:
 *
 *     var plugin = grid.filters;
 *
 * # Features
 *
 * ## Filtering implementations
 *
 * Currently provided filter types are:
 *
 *   * `{@link Ext.grid.filters.filter.Boolean boolean}`
 *   * `{@link Ext.grid.filters.filter.Date date}`
 *   * `{@link Ext.grid.filters.filter.List list}`
 *   * `{@link Ext.grid.filters.filter.Number number}`
 *   * `{@link Ext.grid.filters.filter.String string}`
 *
 * ## Graphical Indicators
 *
 * Columns that are filtered have {@link #filterCls CSS class} applied to their column
 * headers. This style can be managed using that CSS class or by setting these Sass
 * variables in your theme or application:
 *
 *      $grid-filters-column-filtered-font-style: italic !default;
 *
 *      $grid-filters-column-filtered-font-weight: bold !default;
 *
 * ## Stateful
 *
 * Filter information will be persisted across page loads by specifying a `stateId`
 * in the Grid configuration. In actuality this state is saved by the `store`, but this
 * plugin ensures that saved filters are properly identified and reclaimed on subsequent
 * visits to the page.
 *
 * ## Grid Changes
 *
 * - A `filters` property is added to the Grid using this plugin.
 *
 * # Upgrading From Ext.ux.grid.FilterFeature
 *
 * The biggest change for developers converting from the user extension is most likely the
 * conversion to standard {@link Ext.data.AbstractStore#filters store filters}. In the
 * process, the "like" and "in" operators are now supported by `{@link Ext.util.Filter}`.
 * These filters and all other filters added to the store will be sent in the standard
 * way (using the "filters" parameter by default).
 *
 * Since this plugin now uses actual store filters, the `onBeforeLoad` listener and all
 * helper methods that were used to clean and build the params have been removed. The store
 * will send the filters managed by this plugin along in its normal request.
*/
Ext.define('Ext.grid.filters.Filters', {
    extend: 'Ext.plugin.Abstract',

    requires: [
        'Ext.grid.filters.filter.*'
    ],

    alias: 'plugin.gridfilters',

    pluginId: 'gridfilters',

    /**
     * @property {Object} defaultFilterTypes
     * This property maps {@link Ext.data.Model#cfg-field field type} to the appropriate
     * grid filter type.
     * @private
     */
    defaultFilterTypes: {
        'boolean': 'boolean',
        'int': 'number',
        date: 'date',
        number: 'number'
    },

    /**
     * @property {String} [filterCls="x-grid-filters-filtered-column"]
     * The CSS applied to column headers with active filters.
     */
    filterCls: Ext.baseCSSPrefix + 'grid-filters-filtered-column',

    /**
     * @cfg {String} [menuFilterText="Filters"]
     * The text for the filters menu.
     */
    menuFilterText: 'Filters',

    /**
     * @cfg {Boolean} showMenu
     * Defaults to true, including a filter submenu in the default header menu.
     */
    showMenu: true,

    /**
     * @cfg {String} stateId
     * Name of the value to be used to store state information.
     */
    stateId: undefined,

    init: function (grid) {
        var me = this,
            store, headerCt;

        //<debug>
        Ext.Assert.falsey(me.grid);
        //</debug>

        me.grid = grid;
        grid.filters = me;

        if (me.grid.normalGrid) {
            me.isLocked = true;
        }

        grid.clearFilters = me.clearFilters.bind(me);

        store = grid.store;
        headerCt = grid.headerCt;

        headerCt.on({
            scope: me,
            add: me.onAdd,
            menucreate: me.onMenuCreate
        });

        grid.on({
            scope: me,
            beforedestroy: me.destroy,
            beforereconfigure: me.onBeforeReconfigure,
            reconfigure: me.onReconfigure
        });

        me.bindStore(store);

        if (grid.stateful) {
            store.statefulFilters = true;
        }

        me.initColumns();
    },

    /**
     * Creates the Filter objects for the current configuration.
     * Reconfigure and on add handlers.
     * @private
     */
    initColumns: function () {
        // TODO: What to do about grouping columns?
        var i, len, columns, column, filter, filterCollection;

        columns = this.grid.columnManager.getColumns();

        // We start with filters defined on any columns.
        for (i = 0, len = columns.length; i < len; i++) {
            column = columns[i];
            filter = column.filter;

            if (filter && !filter.isGridFilter) {
                if (!filterCollection) {
                    filterCollection = this.grid.store.getFilters();
                    filterCollection.beginUpdate();
                }

                this.createColumnFilter(column);
            }
        }

        if (filterCollection) {
            filterCollection.endUpdate();
        }
    },

    createColumnFilter: function (column) {
        var me = this,
            columnFilter = column.filter,
            filter = {
                column: column,
                grid: me.grid,
                owner: me
            },
            field, model, type;

        if (Ext.isString(columnFilter)) {
            filter.type = columnFilter;
        } else {
            Ext.apply(filter, columnFilter);
        }

        if (!filter.type) {
            model = me.store.model;
            // If no filter type given, first try to get it from the data field.
            field = model && model.getField(column.dataIndex);
            type = field && field.type;

            filter.type = (type && me.defaultFilterTypes[type]) ||
                           column.defaultFilterType || 'string';
        }

        return column.filter = Ext.Factory.gridFilter(filter);
    },

    onAdd: function (headerCt, column, index) {
        var filter = column.filter;

        if (filter && !filter.isGridFilter) {
            this.createColumnFilter(column);
        }
    },

    /**
     * @private Handle creation of the grid's header menu.
     */
    onMenuCreate: function (headerCt, menu) {
        menu.on({
            beforeshow: this.onMenuBeforeShow,
            scope: this
        });
    },

    /**
     * @private Handle showing of the grid's header menu. Sets up the filter item and menu
     * appropriate for the target column.
     */
    onMenuBeforeShow: function (menu) {
        var me = this,
            menuItem, filter, ownerGrid, ownerGridId;

        if (me.showMenu) {
            // In the case of a locked grid, we need to cache the 'Filters' menuItem for each grid since
            // there's only one Filters instance. Both grids/menus can't share the same menuItem!
            if (!me.menuItems) {
                me.menuItems = {};
            }

            // Don't get the owner grid if in a locking grid since we need to get the unique menuItems key.
            ownerGrid = menu.up('grid');
            ownerGridId = ownerGrid.id;

            menuItem = me.menuItems[ownerGridId];

            if (!menuItem || menuItem.isDestroyed) {
                menuItem = me.createMenuItem(menu, ownerGridId);
            }

            me.activeFilterMenuItem = menuItem;

            filter = me.getMenuFilter(ownerGrid.headerCt);
            if (filter) {
                filter.showMenu(menuItem);
            }

            menuItem.setVisible(!!filter);
            me.sep.setVisible(!!filter);
        }
    },

    createMenuItem: function (menu, ownerGridId) {
        var me = this;

        me.sep = menu.add('-');

        return me.menuItems[ownerGridId] = menu.add({
            checked: false,
            itemId: 'filters',
            text: me.menuFilterText,
            listeners: {
                scope: me,
                checkchange: me.onCheckChange
            }
        });
    },

    /**
     * Handler called by the grid 'beforedestroy' event
     */
    destroy: function () {
        Ext.destroyMembers(this, 'menuItem', 'sep');
        this.callParent();
    },

    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     */
    bindStore: function (store) {
        var me = this;

        // Set up correct listeners
        if (store) {
            if (me.store) {
                me.store.destroyStore();
                me.store.getFilters().un('remove', me.onFilterRemove, me);
            }

            // `local` used to be a config, but it should be determined by the store.
            me.local = !store.remoteFilter;
            store.getFilters().on('remove', me.onFilterRemove, me);
        }

        me.store = store;
    },

    onFilterRemove: function (filterCollection, list) {
        // We need to know when a store filter has been removed by an operation of the gridfilters UI, i.e.,
        // store.clearFilter().  The settingValue flag lets us know whether or not this listener has been
        // reached by a filter operation (settingValue === true) or by something outside of the UI
        // (settingValue === undefined).
        var len = list.items.length,
            columnManager = this.grid.columnManager,
            i, item, filter;

        for (i = 0; i < len; i++) {
            item = list.items[i];

            filter = columnManager.getHeaderByDataIndex(item.getProperty()).filter;

            if (!filter.settingValue) {
                // This is only called on the filter if called from outside of the gridfilters UI.
                filter.onFilterRemove(item.getOperator());
            }
        }
    },

    /**
     * @private
     * Get the filter menu from the filters MixedCollection based on the clicked header.
     */
    getMenuFilter: function (headerCt) {
        return headerCt.getMenu().activeHeader.filter;
    },

    /** @private */
    onCheckChange: function (item, value) {
        // Locking grids must lookup the correct grid.
        var grid = this.isLocked ? item.up('grid') : this.grid,
            filter = this.getMenuFilter(grid.headerCt);

        filter.setActive(value);
    },

    getHeaders: function () {
        return this.grid.view.headerCt.columnManager.getColumns();
    },

    /**
     * Checks the plugin's grid for statefulness.
     * @return {Boolean}
     */
    isStateful: function () {
        return this.grid.stateful;
    },

    /**
     * Adds a filter to the collection and creates a store filter if has a `value` property.
     * @param {Object/Ext.grid.filter.Filter} filters A filter configuration or a filter object.
     * @return {Array} The existing or newly created filter instance.
     */
    addFilter: function (filters) {
        var me = this,
            grid = me.grid,
            store = me.store,
            suppressNextFilter = true,
            dataIndex, column, i, len, filter, columnFilter;

        if (!Ext.isArray(filters)) {
            filters = [filters];
        }

        for (i = 0, len = filters.length; i < len; i++) {
            filter = filters[i];
            dataIndex = filter.dataIndex;

            // Don't suppress active filters.
            if (filter.value) {
                suppressNextFilter = false;
            }

            // We only create filters that map to an existing column.
            if (column = grid.columnManager.getHeaderByDataIndex(dataIndex)) {
                columnFilter = column.filter;

                if (!columnFilter || (columnFilter && !columnFilter.isGridFilter)) {
                    column.filter = Ext.apply(columnFilter || {}, filter);
                } else {
                    // If the new filter is a column filter instance, destroy the old and rebind.
                    Ext.destroy(columnFilter);
                    column.filter = filter;
                }
            }
        }

        // Batch initialize all column filters.
        store.suppressNextFilter = suppressNextFilter;
        me.initColumns();
        store.suppressNextFilter = false;
    },

    /**
     * Adds filters to the collection.
     * @param {Array} filters An Array of filter configuration objects.
     * @return {Array} The added filter instances.
     */
    addFilters: function (filters) {
        if (filters) {
            this.addFilter(filters);
        }
    },

    /**
     * Returns a filter for the given dataIndex, if one exists.
     * @param {String} dataIndex The dataIndex of the desired filter object.
     * @return {Ext.grid.filter.Filter}
     */
    getFilter: function (dataIndex) {
        return this.filters.get(dataIndex);
    },

    /**
     * Turns all filters off. This does not clear the configuration information.
     * @param {Boolean} autoFilter If true, don't fire the deactivate event in
     * {@link Ext.grid.filters.filter.Filter#setActive setActive}.
     */
    clearFilters: function (autoFilter) {
        var grid = this.grid,
            columns = grid.columnManager.getColumns(),
            store = grid.store,
            oldAutoFilter = store.getAutoFilter(),
            column, filter, i, len, filterCollection;
            
        if (autoFilter !== undefined) {
            store.setAutoFilter(autoFilter);
        }

        // We start with filters defined on any columns.
        for (i = 0, len = columns.length; i < len; i++) {
            column = columns[i];
            filter = column.filter;

            if (filter && filter.isGridFilter) {
                if (!filterCollection) {
                    filterCollection = store.getFilters();
                    filterCollection.beginUpdate();
                }

                filter.setActive(false);
            }
        }

        if (filterCollection) {
            filterCollection.endUpdate();
        }

        if (autoFilter !== undefined) {
            store.setAutoFilter(oldAutoFilter);
        }
    },

    onBeforeReconfigure: function (grid, store, columns) {
        if (columns) {
            store.getFilters().beginUpdate();
        }

        this.reconfiguring = true;
    },

    onReconfigure: function (grid, store, columns, oldStore) {
        var me = this;

        if (oldStore !== store) {
            me.bindStore(store);
        }

        if (columns) {
            me.initColumns();
            store.getFilters().endUpdate();
        }

        me.reconfiguring = false;
    }
});
