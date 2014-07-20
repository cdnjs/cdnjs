/**
 * This class manages a drag-drop Dashboard similar to the legacy Ext JS Portal example.
 * The user-directed layout of the Dashboard is preserved the Ext JS `stateful` mechanism
 * to preserve potentially dynamic user sizing and collapsed states as well as order of
 * items in their columns.
 */
Ext.define('Ext.dashboard.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboard',

    requires: [
        'Ext.layout.container.SplitColumn',

        'Ext.dashboard.DropZone',
        'Ext.dashboard.Column',
        'Ext.dashboard.Part'
    ],

    isDashboard: true,

    cls: Ext.baseCSSPrefix + 'dashboard',

    bodyCls: Ext.baseCSSPrefix + 'dashboard-body',

    firstColumnCls: Ext.baseCSSPrefix + 'dashboard-column-first',

    lastColumnCls: Ext.baseCSSPrefix + 'dashboard-column-last',

    defaultType: 'dashboard-column',

    autoScroll: true,

    layout: null,

    stateful: true,

    idSeed: 1,

    /**
     * @cfg {Object} maxColumns
     * The maximum number of visible columns.
     */
    maxColumns: 4,

    config: {
        /**
         * @cfg {Object} parts
         * An object keyed by `id` for the parts that can be created for this `Dashboard`.
         */
        parts: null
    },

    /**
     * @event validatedrop
     */

    /**
     * @event beforedragover
     */

    /**
     * @event dragover
     */

    /**
     * @event beforedrop
     */

    /**
     * @event drop
     */

    initComponent: function () {
        var me = this;

        if (!me.layout) {
            me.layout = {
                type: 'split-column',
                firstColumnCls: me.firstColumnCls,
                lastColumnCls: me.lastColumnCls
            };
        }

        me.callParent();
    },

    applyParts: function (parts, collection) {
        if (!collection) {
            collection = new Ext.util.Collection({
                decoder: Ext.Factory.part
            });
        }

        var id, part;

        for (id in parts) {
            part = parts[id];
            if (Ext.isString(part)) {
                part = {
                    type: part
                };
            }

            part.id = id;
            part.dashboard = this;
            collection.add(part);
        }

        return collection;
    },

    /** @private */
    getPart: function (type) {
        var parts = this.getParts();

        return parts.getByKey(type);
    },

    addNew: function (type) {
        var me = this,
            part = me.getPart(type);

        part.displayForm(null, null, function (config) {
            config.type = type;
            me.addView(config);
        });
    },

    addView: function (instance, columnIndex, beforeAfter) {
        var me = this,
            items = me.items,
            count = items.getCount(),
            index = columnIndex || 0,
            view = instance.id ? instance : me.createView(instance),
            columnWidths = me.columnWidths,
            column;

        if (index >= count) {
            index = count - 1;
            beforeAfter = 1; // after
        }

        if (!beforeAfter) {
            column = items.getAt(index);
            return column.add(view);
        }

        if (beforeAfter > 0) {
            // after...
            ++index;
        }

        column = me.createColumn();
        if (columnWidths) {
            column.columnWidth = columnWidths[index];
        }
        if (!column.items) {
            column.items = [];
        }

        column.items.push(view);
        column = me.add(index, column);
        items = column.items;

        return items.getAt(items.getCount() - 1);
    },

    createColumn: function (config) {
        return Ext.apply({
            items : [],
            bubbleEvents : ['add','remove','move', 'resize'],
            listeners: {
                remove: this.onRemoveItem,
                scope: this
            }
        }, config);
    },

    createView: function (config) {
        var me = this,
            type = config.type,
            part = me.getPart(type),
            view = part.createView(config);

        if (!view.id) {
            view.id = me.id + '_' + type + (me.idSeed++);
        }

        return view;
    },

    initEvents : function(){
        this.callParent();
        this.dd = new Ext.dashboard.DropZone(this, this.dropConfig);
    },

    beforeDestroy : function() {
        if (this.dd) {
            this.dd.unreg();
        }
        this.callParent();
    },

    //-------------------------------------------------
    // State and Item Persistence

    applyState: function (state) {
        delete state.items;

        this.callParent([state]);

        var columnWidths = state.columnWidths,
            items = this.items.items,
            length = items.length,
            i, n;

        // Splitters have not been inserted so the length is sans-splitter
        if (columnWidths) {
            n = columnWidths.length;

            for (i = 0; i < length; ++i) {
                items[i].columnWidth = (i < n) ? columnWidths[i] : (1 / length);
            }
        }
    },

    getState : function() {
        var me = this,
            columnWidths = [],
            items = me.items.items,
            state = me.callParent() || {},
            length = items.length,
            i, item;

        for (i = 0; i < length; ++i) {
            if (!(item = items[i]).isSplitter) {
                columnWidths.push(item.columnWidth);
            }
        }

        state.columnWidths = columnWidths;
        state.idSeed = me.idSeed;
        state.items = me.serializeItems();

        return state;
    },

    initItems: function () {
        var me = this,
            defaultContent = me.defaultContent,
            state;

        if (me.stateful) {
            state = Ext.state.Manager.get(me.getStateId());
            defaultContent = (state && state.items) || defaultContent;
        }

        if (!me.items && defaultContent) {
            me.items = me.deserializeItems(defaultContent);
        }

        me.callParent();
    },

    deserializeItems: function (serialized) {
        var me = this,
            length = serialized.length,
            columns = [],
            columnWidths = me.columnWidths,
            maxColumns = me.maxColumns,
            column, columnIndex, i, item, partConfig;

        for (i = 0; i < length; ++i) {
            partConfig = serialized[i];
            columnIndex = Math.min(partConfig.columnIndex || 0, maxColumns - 1);
            delete partConfig.columnIndex;

            if (!(column = columns[columnIndex])) {
                columns[columnIndex] = column = me.createColumn();

                if (columnWidths) {
                    column.columnWidth = columnWidths[columnIndex];
                }
            }

            item = me.createView(partConfig);
            column.items.push(item);
        }

        for (i = 0, length = columns.length; i < length; ++i) {
            column = columns[i];

            if (!column.columnWidth) {
                column.columnWidth = 1 / length;
            }
        }

        return columns;
    },

    serializeItem: function (item) {
        return Ext.apply({
            type: item.part.id,
            id: item.id,
            columnIndex: item.columnIndex
        }, item._partConfig);
    },

    serializeItems: function () {
        var me = this,
            items = me.items.items,
            length = items.length,
            ret = [],
            columnIndex = 0,
            child, childItems, i, item, j, k;

        for (i = 0; i < length; ++i) {
            item = items[i];

            if (!item.isSplitter) {
                childItems = item.items.items;

                for (j = 0, k = childItems.length; j < k; ++j) {
                    child = childItems[j];
                    child.columnIndex = columnIndex;
                    ret.push(me.serializeItem(child));
                }

                ++columnIndex;
            }
        }

        return ret;
    },

    onRemoveItem: function (column, item) {
        // Removing items from a Dashboard is a persistent action, so we must remove the
        // state data for it or leak it.
        if (!item.isMoving) {
            Ext.state.Manager.clear(item.getStateId());
        }
    }
});
