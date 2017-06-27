/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
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
    text: "&#160",

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

    constructor : function(config){
        var me = this;

        // Copy the prototype's default width setting into an instance property to provide
        // a default width which will not be overridden by AbstractContainer.applyDefaults use of Ext.applyIf
        me.width = me.width;

        me.callParent(arguments);
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
    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        var rowspan = this.rowspan,
            page = store.currentPage,
            result = record.index;
            
        if (rowspan) {
            metaData.tdAttr = 'rowspan="' + rowspan + '"';
        }

        if (result == null) {
            result = rowIdx;
            if (page > 1) {
                result += (page - 1) * store.pageSize; 
            }
        }
        return result + 1;
    }
});
