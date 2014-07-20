/**
 * @private
 *
 * Manages and provides information about a TablePanel's *visible leaf* columns.
 */
Ext.define('Ext.grid.ColumnManager', {
    alternateClassName: ['Ext.grid.ColumnModel'],

    columns: null,

    constructor: function(visibleOnly, headerCt, secondHeaderCt) {
        //<debug>
        if (!headerCt.isRootHeader && !headerCt.isGroupHeader) {
            Ext.Error.raise('ColumnManager must be passed an instantiated HeaderContainer or group header');
        }
        //</debug>
        this.headerCt = headerCt;

        // We are managing columns for a lockable grid...
        if (secondHeaderCt) {
            //<debug>
            if (!headerCt.isRootHeader && !headerCt.isGroupHeader) {
                Ext.Error.raise('ColumnManager must be passed an instantiated HeaderContainer or group header');
            }
            //</debug>
            this.secondHeaderCt = secondHeaderCt;
        }
        this.visibleOnly = !!visibleOnly;
    },

    getColumns: function() {
        if (!this.columns) {
            this.cacheColumns();
        }
        return this.columns;
    },

    hasVariableRowHeight: function() {
        var me = this,
            columns = me.getColumns(),
            len = columns.length,
            i;

        if (me.variableRowHeight == null) {
            me.variableRowHeight = false;
            for (i = 0; !me.variableRowHeight && i < len; i++) {
                me.variableRowHeight = !!columns[i].variableRowHeight;
            }
        }

        return me.variableRowHeight;
    },

    /**
     * If called from a root header, returns the index of a leaf level header regardless of what the nesting
     * structure is.
     *
     * If called from a group header, returns the index of a leaf level header relative to the group header.
     *
     * If a group header is passed, the index of the first leaf level header within it is returned.
     *
     * @param {Ext.grid.column.Column} header The header to find the index of
     * @return {Number} The index of the specified column header
     */
    getHeaderIndex: function (header) {
        if (header.isGroupHeader) {
            // Get the first header for the particular group header. The .getHeaderColumns API
            // will sort out if it's to be just visible columns or all columns.
            header = this.getHeaderColumns(header)[0];
        }

        return Ext.Array.indexOf(this.getColumns(), header);
    },

    /**
     * If called from a root header, gets a leaf level header by index regardless of what the nesting
     * structure is.
     *
     * If called from a group header, returns the index of a leaf level header relative to the group header.
     *
     * @param {Number} index The column index for which to retrieve the column.
     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist.
     */
    getHeaderAtIndex: function(index) {
        var columns = this.getColumns(),
            col = columns[index];
            
        return col || null;
    },
    
    getPreviousSibling: function(header){
        var index = this.getHeaderIndex(header),
            col = null;
            
        if (index > 0) {
            col = this.getColumns()[index - 1];
        }
        return col;
    },
    
    getNextSibling: function(header) {
        var index = this.getHeaderIndex(header),
            col;
            
        if (index !== -1) {
            col = this.getColumns()[index + 1];
        }
        return col || null;
    },
    
    /**
     * Get the first column.
     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist
     */
    getFirst: function() {
        var columns = this.getColumns();
        return columns.length > 0 ? columns[0] : null;
    },
    
    /**
     * Get the last column.
     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist
     */
    getLast: function(){
        var columns = this.getColumns(),
            len = columns.length;
            
        return len > 0 ? columns[len - 1] : null;
    },
    
    /**
     * Get a leaf level header by data index regardless of what the nesting
     * structure is.
     * @param {String} dataIndex The data index
     * @return {Ext.grid.column.Column} The header. `null` if it doesn't exist.
     */
    getHeaderByDataIndex: function (dataIndex) {
        var columns = this.getColumns(),
            len = columns.length,
            i, header;
            
        for (i = 0; i < len; ++i) {
            header = columns[i];
            if (header.dataIndex === dataIndex) {
                return header;
            }
        }
        return null;
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
     *
     * If called from a group header, returns the visible index of a leaf level header relative to the group header with the
     * same stipulations as outlined above.
     *
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
        var columns = this.getHeaderColumns(this.headerCt),
            second = this.secondHeaderCt;
            
        if (second) {
            columns = columns.concat(this.getHeaderColumns(second));
        }
        this.columns = columns;
    },
    
    getHeaderColumns: function(header) {
        var result = this.visibleOnly ? header.getVisibleGridColumns() : header.getGridColumns();
        return Ext.Array.clone(result);
    },

    invalidate: function() {
        var root = this.rootColumns;
        this.columns = this.variableRowHeight = null;

        // If we are part of a lockable assembly, invalidate the root column manager
        if (root) {
            root.invalidate();
        }
    },
    
    destroy: function(){
        this.columns = this.rootColumns = null;
    }
}, function() {
    this.createAlias('indexOf', 'getHeaderIndex');
});
