/**
 * A special type of Grid {@link Ext.grid.column.Column} that provides automatic
 * row numbering.
 *
 * Usage:
 *
 *     columns: [
 *         {xtype: 'rownumberer'},
 *         {text: "Company", flex: 1, sortable: true, dataIndex: 'company'},
 *         {text: "Price", width: 120, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
 *         {text: "Change", width: 120, sortable: true, dataIndex: 'change'},
 *         {text: "% Change", width: 120, sortable: true, dataIndex: 'pctChange'},
 *         {text: "Last Updated", width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
 *     ]
 *
 */
Ext.define('Ext.grid.column.RowNumberer', {
    extend: 'Ext.grid.column.Column',
    alternateClassName: 'Ext.grid.RowNumberer',
    alias: 'widget.rownumberer',

    /**
     * @cfg {String} text
     * Any valid text or HTML fragment to display in the header cell for the row number column.
     */
    text: "&#160;",

    /**
     * @cfg {Number} width
     * The default width in pixels of the row number column.
     */
    width: 23,

    /**
     * @cfg {Boolean} sortable
     * @hide
     */
    sortable: false,

    /**
     * @cfg {Boolean} [draggable=false]
     * False to disable drag-drop reordering of this column.
     */
    draggable: false,

    // Flag to Lockable to move instances of this column to the locked side.
    autoLock: true,

    // May not be moved from its preferred locked side when grid is enableLocking:true
    lockable: false,

    align: 'right',

    producesHTML: false,

    constructor: function (config) {
        var me = this;

        // Copy the prototype's default width setting into an instance property to provide
        // a default width which will not be overridden by Container.applyDefaults use of Ext.applyIf
        me.width = me.width;

        me.callParent(arguments);

        // Override any setting from the HeaderContainer's defaults
        me.sortable = false;

        me.scope = me;
    },

    // private
    resizable: false,
    hideable: false,
    menuDisabled: true,
    dataIndex: '',
    cls: Ext.baseCSSPrefix + 'row-numberer',
    tdCls: Ext.baseCSSPrefix + 'grid-cell-row-numberer ' + Ext.baseCSSPrefix + 'grid-cell-special',
    innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-numberer',
    rowspan: undefined,

    // private
    defaultRenderer: function(value, metaData, record, rowIdx, colIdx, dataSource, view) {
        var rowspan = this.rowspan,
            page = dataSource.currentPage,
            result = view.store.indexOf(record);

        if (rowspan) {
            metaData.tdAttr = 'rowspan="' + rowspan + '"';
        }

        if (page > 1) {
            result += (page - 1) * dataSource.pageSize;
        }
        return result + 1;
    },

    updater: function(cell, value) {
        cell.firstChild.innerHTML = Ext.grid.column.RowNumberer.prototype.defaultRenderer.call(this, value);
    }
});
