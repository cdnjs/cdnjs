/**
 * This component provides a grid holding selected items from a second store of potential
 * members. The `store` of this component represents the selected items. The "search store"
 * represents the potentially selected items.
 *
 * While this component is a grid and so you can configure `columns`, it is best to leave
 * that to this class in its `initComponent` method. That allows this class to create the
 * extra column that allows the user to remove rows. Instead use `{@link #fieldName}` and
 * `{@link #fieldTitle}` to configure the primary column's `dataIndex` and column `text`,
 * respectively.
 *
 * @since 5.0.0
 */
Ext.define('Ext.view.MultiSelector', {
    extend: 'Ext.grid.Panel',

    xtype: 'multiselector',

    config: {
        /**
         * @cfg {Object} search
         * This object configures the search popup component. By default this contains the
         * `xtype` for a `Ext.view.MultiSelectorSearch` component and specifies `autoLoad`
         * for its `store`.
         */
        search: {
            xtype: 'multiselector-search',
            width: 200,
            height: 200,
            store: {
                autoLoad: true
            }
        }
    },

    /**
     * @cfg {String} [fieldName="name"]
     * The name of the data field to display in the primary column of the grid.
     * @since 5.0.0
     */
    fieldName: 'name',

    /**
     * @cfg {String} [fieldTitle]
     * The text to display in the column header for the primary column of the grid.
     * @since 5.0.0
     */
    fieldTitle: null,

    /**
     * @cfg {String} removeRowText
     * The text to display in the "remove this row" column. By default this is a Unicode
     * "X" looking glyph.
     * @since 5.0.0
     */
    removeRowText: '&#10006',

    /**
     * @cfg {String} removeRowTip
     * The tooltip to display when the user hovers over the remove cell.
     * @since 5.0.0
     */
    removeRowTip: 'Remove this item',

    emptyText: 'Nothing selected',

    /**
     * @cfg {String} addToolText
     * The tooltip to display when the user hovers over the "+" tool in the panel header.
     * @since 5.0.0
     */
    addToolText: 'Search for items to add',

    initComponent: function () {
        var me = this,
            emptyText = me.emptyText,
            store = me.getStore(),
            search = me.getSearch(),
            fieldTitle = me.fieldTitle,
            searchStore, model;

        //<debug>
        if (!search) {
            Ext.Error.raise('The search configuration is required for the multi selector');
        }
        //</debug>

        searchStore = search.store;
        if (searchStore.isStore) {
            model = searchStore.getModel();
        } else {
            model = searchStore.model;
        }

        if (!store) {
            me.store = {
                model: model
            };
        }

        if (emptyText && !me.viewConfig) {
            me.viewConfig = {
                deferEmptyText: false,
                emptyText: emptyText
            };
        }

        if (!me.columns) {
            me.hideHeaders = !fieldTitle;
            me.columns = [
                { text: fieldTitle, dataIndex: me.fieldName, flex: 1 },
                me.makeRemoveRowColumn()
            ];
        }

        me.callParent();
    },

    addTools: function () {
        this.addTool({
            type: 'plus',
            tooltip: this.addToolText,
            callback: 'onShowSearch',
            scope: this
        });
    },

    convertSearchRecord: Ext.identityFn,

    convertSelectionRecord: Ext.identityFn,

    makeRemoveRowColumn: function () {
        var me = this;

        return {
            width: 22,
            menuDisabled: true,
            processEvent: me.processRowEvent.bind(me),
            renderer: me.renderRemoveRow,
            updater: Ext.emptyFn,
            scope: me
        };
    },

    processRowEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        if (e.type !== 'click') {
            return;
        }

        if (Ext.fly(e.getTarget()).hasCls(Ext.baseCSSPrefix + 'multiselector-remove')) {
            this.store.remove(record);
            if (this.searchPopup) {
                this.searchPopup.deselectRecords(record);
            }
        }
    },

    renderRemoveRow: function () {
        return '<span class="'+ Ext.baseCSSPrefix + 'multiselector-remove" ' +
               'data-qtip="'+ this.removeRowTip + '" role="button">' +
               this.removeRowText + '</span>';
    },

    beforeDestroy: function() {
        Ext.un({
            mousedown: 'onDismissSearch',
            scope: this
        });
        this.callParent();
    },

    privates: {
        onDismissSearch: function (e) {
            var searchPopup = this.searchPopup;

            if (searchPopup && !(searchPopup.owns(e.getTarget()) || this.owns(e.getTarget()))) {
                Ext.un({
                    mousedown: 'onDismissSearch',
                    scope: this
                });
                searchPopup.hide();
            }
        },

        onShowSearch: function (panel, tool) {
            var me = this,
                searchPopup = me.searchPopup,
                store = me.getStore();

            if (!searchPopup) {
                searchPopup = Ext.merge({
                    owner: me,
                    field: me.fieldName,
                    floating: true
                }, me.getSearch());
                me.searchPopup = searchPopup = me.add(searchPopup);

                // If we were configured with records prior to the UI requesting the popup,
                // ensure that the records are selected in the popup.
                if (store.getCount()) {
                    searchPopup.selectRecords(store.getRange());
                }
            }

            searchPopup.showBy(me, 'tl-tr?');
            Ext.on({
                mousedown: 'onDismissSearch',
                scope: me
            });
        }
    }
});
