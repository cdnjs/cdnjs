Ext.define('Ext.aria.view.Table', {
    override: 'Ext.view.Table',
    
    requires: [
        'Ext.aria.view.View'
    ],

    ariaGetRenderAttributes: function() {
        var me = this,
            plugins = me.plugins,
            readOnly = true,
            attrs, i, len;
        
        attrs = me.callParent();
        
        if (plugins) {
            for (i = 0, len = plugins.length; i < len; i++) {
                // Both CellEditor and RowEditor have 'editing' property
                if ('editing' in plugins[i]) {
                    readOnly = false;
                    break;
                }
            }
        }
        
        attrs['aria-readonly'] = readOnly;
        
        return attrs;
    },
    
    // Table Views are rendered from templates that are rarely overridden,
    // so we can render ARIA attributes in the templates instead of applying
    // them after the fact.
    ariaItemAdd: Ext.emptyFn,
    ariaItemRemove: Ext.emptyFn,
    ariaInitViewItems: Ext.emptyFn,
    
    ariaFindNode: function(selModel, record, row, column) {
        var me = this,
            node;
        
        if (selModel.isCellModel) {
            // When column is hidden, its index will be -1
            if (column > -1) {
                node = me.getCellByPosition({ row: row, column: column });
            }
            else {
                node = me.getCellByPosition({ row: row, column: 0 });
            }
        }
        else {
            node = Ext.fly(me.getNode(record));
        }
        
        return node;
    },

    ariaSelect: function(selModel, record, row, column) {
        var me = this,
            node;
        
        node = me.ariaFindNode(selModel, record, row, column);

        if (node) {
            node.set({ 'aria-selected': true });
            me.ariaUpdate({ 'aria-activedescendant': node.id });
        }
    },

    ariaDeselect: function(selModel, record, row, column) {
        var me = this,
            node;
        
        node = me.ariaFindNode(selModel, record, row, column);

        if (node) {
            node.set({ 'aria-selected': undefined });
            me.ariaUpdate({ 'aria-activedescendant': undefined });
        }
    },

    ariaStepIn: function() {
        var me = this,
            selModel = me.selModel,
            last, pos, cell;
        
        last = selModel.getLastSelected();

        if (last) {
            if (selModel.isCellModel) {
                pos  = selModel.getCurrentPosition();
                cell = me.getCellByPosition(cell);
                
                me.ariaAddFocus(cell);
            }
            else {
                me.ariaAddFocus(me.getNode(last));
            }
        }
        else if (me.getNodes().length > 0) {
            selModel.selectByPosition({ row: 0, column: 0 });
        }
        else {
            // Try to focus on the header if the view is empty
            selModel.onKeyUp();
        }
    },

    ariaStepOut: function() {
        var me = this,
            selModel = me.selModel,
            last, cell;
        
        last = selModel.getLastFocused();

        if (last) {
            if (selModel.isCellModel) {
                cell = me.getCellByPosition(selModel.lastSelection);
                
                me.ariaRemoveFocus(cell);
            }
            else {
                me.ariaRemoveFocus(me.getNode(last));
            }
        }
    },

    ariaFocusChanged: function(selModel, oldFocus, newFocus) {
        var me = this,
            node;

        if (me.selModel.isCellModel) {
            if (oldFocus) {
                node = me.getCellByPosition(selModel.lastSelection);
                me.ariaRemoveFocus(node);
            }
            
            if (newFocus) {
                node = me.getCellByPosition(selModel.nextSelection);
                me.ariaAddFocus(node);
            }
        }
        else {
            me.callParent(arguments);
        }
    },

    // Override because we want to add a fake/invisible header to the gridview so that
    // screen readers announce the number of rows and the column header name properly.
    // We have to do this because the real header of the grid is docked into the grid panel
//     renderColumnSizer: function(out) {
//         var me = this,
//             columns = me.getGridColumns(),
//             len = columns.length, i,
//             column;
// 
//         me.callParent(arguments);
//         
//         out.push('<thead role="presentation"><tr role="row" class="' + Ext.baseCSSPrefix + 'grid-header-row">');
//         
//         for (i = 0; i < len; i++) {
//             column = columns[i];
//             out.push('<th role="columnheader" aria-label="', column.text, '"></th>');
//         }
//         
//         out.push('</tr></thead>');
//     },
    
    renderRow: function(record, rowIdx, out) {
        var me = this,
            rowValues = me.rowValues;
        
        rowValues.ariaRowAttr = 'role="row"';
        
        return me.callParent(arguments);
    },
    
    renderCell: function(column, record, recordIndex, rowIndex, columnIndex, out) {
        var me = this,
            cellValues = me.cellValues;
        
        cellValues.ariaCellAttr = 'role="gridcell"';
        cellValues.ariaCellInnerAttr = '';
        
        return me.callParent(arguments);
    },
    
    collectData: function(records, startIndex) {
        var me = this,
            data;
        
        data = me.callParent(arguments);
        
        Ext.applyIf(data, {
            ariaTableAttr: 'role="presentation"',
            ariaTbodyAttr: 'role="rowgroup"'
        });
        
        return data;
    },
    
    // Override because we changed focus() and focusRow() to not actually focus a row
    // The call to focusRow() in this function causes a focus to happen whenever the table is refreshed
    getFocusEl: function() {
        return this.el;
    },

    // Ensure that the main element has focus
    focus: function() {
        var me = this;
        
        me.callParent();
        me.el.focus();
        
        // If, before wer were blurred, we had transferred focus into the grid header, jump back in there upon focus
        if (me.headerFocused) {
            me.up('tablepanel').headerCt.focus();
        }
    },

    // Override because we don't want to remove focus from the gridview to row
    // i.e. we don't want row.focus()
    // To make the row scroll to view, use me.focusNode
    focusRow: function(rowIdx) {
        var me = this,
            row = me.getNode(rowIdx, true),
            record;

        if (row && me.el) {
            record = me.getRecord(row);
            rowIdx = me.indexInStore(row);

            // Focusing the row scrolls it into view
            me.selModel.setLastFocused(record);
            Ext.fly(row).scrollIntoView(me.el, false);
            me.focusedRow = row;
            me.fireEvent('rowfocus', record, row, rowIdx);
        }
    }
});
