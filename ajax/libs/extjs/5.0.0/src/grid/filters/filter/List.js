/**
 * List filters are able to be preloaded/backed by an Ext.data.Store to load
 * their options the first time they are shown.
 *
 * List filters are also able to create their own list of values from  all unique values of
 * the specified {@link #dataIndex} field in the store at first time of filter invocation.
 *
 * Example Usage:
 *
 *     var filters = Ext.create('Ext.grid.Panel', {
 *         ...
 *         columns: [{
 *             text: 'Size',
 *             dataIndex: 'size',
 *
 *             filter: {
 *                 type: 'list',
 *                 // options will be used as data to implicitly creates an ArrayStore
 *                 options: ['extra small', 'small', 'medium', 'large', 'extra large']
 *             }
 *         }],
 *         ...
 *     });
 */
Ext.define('Ext.grid.filters.filter.List', {
    extend: 'Ext.grid.filters.filter.SingleFilter',
    alias: 'grid.filter.list',

    type: 'list',

    operator: 'in',

    itemDefaults: {
        checked: false,
        hideOnClick: false
    },

    /**
     * @cfg {Array} [options]
     * `data` to be used to implicitly create a data store
     * to back this list when the data source is **local**. If the
     * data for the list is remote, use the {@link #store}
     * config instead.
     *
     * If neither store nor {@link #options} is specified, then the choices list is automatically
     * populated from all unique values of the specified {@link #dataIndex} field in the store at first
     * time of filter invocation.
     *
     * Each item within the provided array may be in one of the
     * following formats:
     *
     *   - **Array** :
     *
     *         options: [
     *             [11, 'extra small'],
     *             [18, 'small'],
     *             [22, 'medium'],
     *             [35, 'large'],
     *             [44, 'extra large']
     *         ]
     *
     *   - **Object** :
     *
     *         labelField: 'name', // override default of 'text'
     *         options: [
     *             {id: 11, name:'extra small'},
     *             {id: 18, name:'small'},
     *             {id: 22, name:'medium'},
     *             {id: 35, name:'large'},
     *             {id: 44, name:'extra large'}
     *         ]
     * 
     *   - **String** :
     *
     *         options: ['extra small', 'small', 'medium', 'large', 'extra large']
     *
     */

    /**
     * @cfg {String} idField
     * Defaults to 'id'.
     */
    idField: 'id',

    /**
     * @cfg {String} labelField
     * Defaults to 'text'.
     */
    labelField: 'text',

    /**
     * @cfg {String} paramPrefix
     * Defaults to 'Loading...'.
     */
    loadingText: 'Loading...',

    /**
     * @cfg {Boolean} loadOnShow
     * Defaults to true.
     */
    loadOnShow: true,

    /**
     * @cfg {Boolean} single
     * Specify true to group all items in this list into a single-select
     * radio button group. Defaults to false.
     */
    single: false,

    plain: true,

    /**
     * @cfg {Ext.data.Store} [store]
     * The {@link Ext.data.Store} this list should use as its data source
     * when the data source is **remote**. If the data for the list
     * is local, use the {@link #options} config instead.
     *
     * If neither store nor {@link #options} is specified, then the choices list is automatically
     * populated from all unique values of the specified {@link #dataIndex} field in the store at first
     * time of filter invocation.
     */

    destroy: function () {
        var me = this,
            store = me.optionsStore;
            
        if (store) {
            if (me.autoStore) {
                store.destroyStore();
            } else {
                store.un('unload', me.onLoad, me);
            }
        }

        me.callParent();
    },

    /**
     * @private
     * Creates the Menu for this filter.
     * @param {Object} config Filter configuration
     * @return {Ext.menu.Menu}
     */
    createMenu: function(config) {
        var me = this,
            gridStore = me.grid.store,
            optionsStore = me.optionsStore,
            options = me.options,
            menu, data;

        me.callParent(arguments);
        menu = me.menu;

        //me.selected = [];

        if (optionsStore) {
            data = optionsStore.getData();
            if (!data.length) {
                menu.add({
                    text: me.loadingText,
                    iconCls: 'loading-indicator'
                });
                optionsStore.on('load', me.createMenuStore, me, {single: true});
            } else {
                me.createMenuItems(optionsStore);
            }

        }
        // If there are supplied options, then we know the optionsStore is local.
        else if (options) {
            me.createMenuStore(options);
        }
        // A ListMenu which is completely unconfigured acquires its store from the unique values of its field in the store.
        else if (gridStore.getData().length) {
            me.createMenuStore();
        }
        // If there are no records in the grid store, then we know it's async and we need to listen for its 'load' event.
        else {
            gridStore.on('load', me.createMenuStore, menu, {single: true});
        }
    },

    /** @private */
    createMenuItems: function (store) {
        var me = this,
            menu = me.menu,
            data = store.getData(),
            len = data.length,
            listeners = {
                checkchange: me.setValue,
                scope: me
            },
            itemDefaults = me.getItemDefaults(),
            records, gid, itemValue, i;

        if (len) {
            records = data.items;
            menu.removeAll(true);
            gid = me.single ? Ext.id() : null;

            for (i = 0; i < len; i++) {
                data = records[i].data;
                itemValue = data[me.idField];

                menu.add(Ext.apply({
                    text: data[me.labelField],
                    group: gid,
                    //checked: Ext.Array.contains(me.selected, itemValue),
                    value: itemValue,
                    listeners: listeners
                }, itemDefaults));
            }

            me.loaded = true;
        }
    },

    createMenuStore: function (options) {
        var me = this,
            storeOptions = [],
            i, len, value, store;

        options = options || me.grid.store.collect(me.column.dataIndex, false, true) || [];

        for (i = 0, len = options.length; i < len; i++) {
            value = options[i];

            switch (Ext.typeOf(value)) {
                case 'array': 
                    storeOptions.push(value);
                    break;
                case 'object':
                    storeOptions.push([value[me.idField], value[me.labelField]]);
                    break;
                default:
                    if (value != null) {
                        storeOptions.push([value, value]);
                    }
            }
        }

        store = me.menu.store = new Ext.data.ArrayStore({
            fields: [me.idField, me.labelField],
            data: storeOptions
        });

        me.createMenuItems(store);

        me.loaded = true;
        me.autoStore = true;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     */
    setValue: function () {
        var me = this,
            items = me.menu.items,
            value = [],
            i, len, checkItem;

        for (i = 0, len = items.length; i < len; i++) {
            checkItem = items.getAt(i);

            if (checkItem.checked) {
                value.push(checkItem.value);
            }
        }

        //me.selected = value;

        me.filter.setValue(value);
        len = value.length;

        if (len && me.active) {
            me.updateStoreFilter(me.filter);
        } else {
            me.setActive(!!len);
        }
    },

    /**
     * Lists will initially show a 'loading' item while the data is retrieved from the store.
     * In some cases the loaded data will result in a list that goes off the screen to the
     * right (as placement calculations were done with the loading item). This adapter will
     * allow show to be called with no arguments to show with the previous arguments and
     * thus recalculate the width and potentially hang the menu from the left.
     */
    show: function () {
        if (this.loadOnShow && !this.loaded && !this.optionsStore.loading) {
            this.optionsStore.load();
        }

        this.callParent();
    },

    activateMenu: function () {
        var me = this,
            items = me.menu.items,
            value = me.filter.getValue(),
            i, len, checkItem;

        for (i = 0, len = items.length; i < len; i++) {
            checkItem = items.getAt(i);

            if (value.indexOf(checkItem.value) > -1) {
                checkItem.setChecked(true, /*suppressEvents*/ true);
            }
        }
    }
});
