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
 * A custom HeaderContainer for the {@link Ext.grid.property.Grid}.
 * Generally it should not need to be used directly.
 */
Ext.define('Ext.grid.property.HeaderContainer', {

    extend: 'Ext.grid.header.Container',

    alternateClassName: 'Ext.grid.PropertyColumnModel',
    
    nameWidth: 115,

    // @private strings used for locale support
    //<locale>
    nameText : 'Name',
    //</locale>
    //<locale>
    valueText : 'Value',
    //</locale>
    //<locale>
    dateFormat : 'm/j/Y',
    //</locale>
    //<locale>
    trueText: 'true',
    //</locale>
    //<locale>
    falseText: 'false',
    //</locale>

    // @private
    nameColumnCls: Ext.baseCSSPrefix + 'grid-property-name',
    nameColumnInnerCls: Ext.baseCSSPrefix + 'grid-cell-inner-property-name',

    /**
     * Creates new HeaderContainer.
     * @param {Ext.grid.property.Grid} grid The grid this store will be bound to
     * @param {Object} source The source data config object
     */
    constructor : function(grid, store) {
        var me = this;
        
        me.grid = grid;
        me.store = store;
        me.callParent([{
            isRootHeader: true,
            enableColumnResize: Ext.isDefined(grid.enableColumnResize) ? grid.enableColumnResize : me.enableColumnResize,
            enableColumnMove: Ext.isDefined(grid.enableColumnMove) ? grid.enableColumnMove : me.enableColumnMove,
            items: [{
                header: me.nameText,
                width: grid.nameColumnWidth || me.nameWidth,
                sortable: grid.sortableColumns,
                dataIndex: grid.nameField,
                renderer: Ext.Function.bind(me.renderProp, me),
                itemId: grid.nameField,
                menuDisabled :true,
                tdCls: me.nameColumnCls,
                innerCls: me.nameColumnInnerCls
            }, {
                header: me.valueText,
                renderer: Ext.Function.bind(me.renderCell, me),
                getEditor: Ext.Function.bind(me.getCellEditor, me),
                sortable: grid.sortableColumns,
                flex: 1,
                fixed: true,
                dataIndex: grid.valueField,
                itemId: grid.valueField,
                menuDisabled: true
            }]
        }]);
    },
    
    getCellEditor: function(record){
        return this.grid.getCellEditor(record, this);
    },

    // @private
    // Render a property name cell
    renderProp : function(v) {
        return this.getPropertyName(v);
    },

    // @private
    // Render a property value cell
    renderCell : function(val, meta, rec) {
        var me = this,
            grid = me.grid,
            renderer = grid.getConfig(rec.get(grid.nameField), 'renderer'),
            result = val;

        if (renderer) {
            return renderer.apply(me, arguments);
        }
        if (Ext.isDate(val)) {
            result = me.renderDate(val);
        } else if (Ext.isBoolean(val)) {
            result = me.renderBool(val);
        }
        return Ext.util.Format.htmlEncode(result);
    },

    // @private
    renderDate : Ext.util.Format.date,

    // @private
    renderBool : function(bVal) {
        return this[bVal ? 'trueText' : 'falseText'];
    },

    // @private
    // Renders custom property names instead of raw names if defined in the Grid
    getPropertyName : function(name) {
        return this.grid.getConfig(name, 'displayName', name);
    }
});
