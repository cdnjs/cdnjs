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
 * Internal utility class that provides default configuration for cell editing.
 * @private
 */
Ext.define('Ext.grid.CellEditor', {
    extend: 'Ext.Editor',
    constructor: function(config) {
        config = Ext.apply({}, config);
        
        if (config.field) {
            config.field.monitorTab = false;
        }
        this.callParent([config]);
    },
    
    /**
     * @private
     * Hides the grid cell inner element when a cell editor is shown.
     */
    onShow: function() {
        var me = this,
            innerCell = me.boundEl.first();

        if (innerCell) {
            if (me.isForTree) {
                innerCell = innerCell.child(me.treeNodeSelector);
            }
            innerCell.hide();
        }

        me.callParent(arguments);
    },

    /**
     * @private
     * Shows the grid cell inner element when a cell editor is hidden
     */
    onHide: function() {
        var me = this,
            innerCell = me.boundEl.first();

        if (innerCell) {
            if (me.isForTree) {
                innerCell = innerCell.child(me.treeNodeSelector);
            }
            innerCell.show();
        }
        
        me.callParent(arguments);
    },

    /**
     * @private
     * Fix checkbox blur when it is clicked.
     */
    afterRender: function() {
        var me = this,
            field = me.field;

        me.callParent(arguments);
        if (field.isCheckbox) {
            field.mon(field.inputEl, {
                mousedown: me.onCheckBoxMouseDown,
                click: me.onCheckBoxClick,
                scope: me
            });
        }
    },
    
    /**
     * @private
     * Because when checkbox is clicked it loses focus  completeEdit is bypassed.
     */
    onCheckBoxMouseDown: function() {
        this.completeEdit = Ext.emptyFn;
    },
    
    /**
     * @private
     * Restore checkbox focus and completeEdit method.
     */
    onCheckBoxClick: function() {
        delete this.completeEdit;
        this.field.focus(false, 10);
    },
    
    /**
     * @private
     * Realigns the Editor to the grid cell, or to the text node in the grid inner cell
     * if the inner cell contains multiple child nodes.
     */
    realign: function(autoSize) {
        var me = this,
            boundEl = me.boundEl,
            innerCell = boundEl.first(),
            width = boundEl.getWidth(),
            offsets = Ext.Array.clone(me.offsets),
            grid = me.grid,
            xOffset;

        if (me.isForTree) {
            // When editing a tree, adjust the width and offsets of the editor to line
            // up with the tree cell's text element
            xOffset = me.getTreeNodeOffset(innerCell);
            width -= Math.abs(xOffset);
            offsets[0] += xOffset;
        }

        if (grid.columnLines) {
            // Subtract the column border width so that the editor displays inside the
            // borders. The column border could be either on the left or the right depending
            // on whether the grid is RTL - using the sum of both borders works in both modes. 
            width -= boundEl.getBorderWidth('rl');
        }

        if (autoSize === true) {
            me.field.setWidth(width);
        }

        me.alignTo(innerCell, me.alignment, offsets);
    },

    // private
    getTreeNodeOffset: function(innerCell) {
        return innerCell.child(this.treeNodeSelector).getOffsetsTo(innerCell)[0];
    },
    
    onEditorTab: function(e){
        var field = this.field;
        if (field.onEditorTab) {
            field.onEditorTab(e);
        }
    },
    
    alignment: "l-l",
    hideEl : false,
    cls: Ext.baseCSSPrefix + 'small-editor ' +
        Ext.baseCSSPrefix + 'grid-editor ' + 
        Ext.baseCSSPrefix + 'grid-cell-editor',
    treeNodeSelector: '.' + Ext.baseCSSPrefix + 'tree-node-text',
    shim: false,
    shadow: false
});