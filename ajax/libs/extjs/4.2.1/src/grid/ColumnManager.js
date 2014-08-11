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
 * @private
 *
 * Manages and provides information about a TablePanel's *visible leaf* columns.
 */
Ext.define('Ext.grid.ColumnManager', {
    alternateClassName: ['Ext.grid.ColumnModel'],

    columns: null,

    constructor: function(headerCt, secondHeaderCt) {
        //<debug>
        if (!headerCt.isRootHeader) {
            Ext.Error.raise('ColumnManager must be passed an instantiated HeaderContainer');
        }
        //</debug>
        this.headerCt = headerCt;

        // We are managing columns for a lockable grid...
        if (secondHeaderCt) {
            //<debug>
            if (!headerCt.isRootHeader) {
                Ext.Error.raise('ColumnManager must be passed an instantiated HeaderContainer');
            }
            //</debug>
            this.secondHeaderCt = secondHeaderCt;
        }
    },

    getColumns: function() {
        if (!this.columns) {
            this.cacheColumns();
        }
        return this.columns;
    },

    /**
     * Returns the index of a leaf level header regardless of what the nesting
     * structure is.
     *
     * If a group header is passed, the index of the first leaf level heder within it is returned.
     *
     * @param {Ext.grid.column.Column} header The header to find the index of
     * @return {Number} The index of the specified column header
     */
    getHeaderIndex: function(header) {
        // If we are being asked the index of a group header, find the first leaf header node, and return the index of that
        if (header.isGroupHeader) {
            header = header.down(':not([isGroupHeader])');
        }
        return Ext.Array.indexOf(this.getColumns(), header);
    },

    /**
     * Get a leaf level header by index regardless of what the nesting
     * structure is.
     * @param {Number} index The column index for which to retrieve the column.
     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist.
     */
    getHeaderAtIndex: function(index) {
        var columns = this.getColumns();
        return columns.length ? columns[index] : null;
    },
    
    /**
     * Get a leaf level header by index regardless of what the nesting
     * structure is.
     * @param {String} id The id
     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist.
     */
    getHeaderById: function(id) {
        var columns = this.getColumns(),
            len = columns.length,
            i, header;
            
        for (i = 0; i < len; ++i) {
            header = columns[i];
            if (header.getItemId() === id) {
                return header;
            }
        }
        return null;
    },

    /**
     * When passed a column index, returns the closet *visible* column to that. If the column at the passed index is visible,
     * that is returned. If it is hidden, either the next visible, or the previous visible column is returned.
     * @param {Number} index Position at which to find the closest visible column.
     */
    getVisibleHeaderClosestToIndex: function(index) {
        var result = this.getHeaderAtIndex(index);
        if (result && result.hidden) {
            result = result.next(':not([hidden])') || result.prev(':not([hidden])');
        }
        return result;
    },

    cacheColumns: function() {
        this.columns = this.headerCt.getVisibleGridColumns();
        if (this.secondHeaderCt) {
            Ext.Array.push(this.columns, this.secondHeaderCt.getVisibleGridColumns());
        }
    },

    invalidate: function() {
        this.columns = null;

        // If we are part of a lockable assembly, invalidate the root column manager
        if (this.rootColumns) {
            this.rootColumns.invalidate();
        }
    }
}, function() {
    this.createAlias('indexOf', 'getHeaderIndex');
});