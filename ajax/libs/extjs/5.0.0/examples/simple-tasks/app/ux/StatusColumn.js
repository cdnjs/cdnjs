/**
 * @class SimpleTasks.ux.StatusColumn
 * @extends Ext.grid.column.Column
 * <p>A Header subclass which renders a checkbox in each column cell which toggles the truthiness of the associated data field on click.</p>
 * <p><b>Note. As of Ext JS 3.3 this no longer has to be configured as a plugin of the GridPanel.</b></p>
 * <p>Example usage:</p>
 * <pre><code>
// create the grid
var grid = Ext.create('Ext.grid.Panel', {
    ...
    columns: [{
           text: 'Foo',
           ...
        },{
           xtype: 'statuscolumn',
           text: 'Indoor?',
           dataIndex: 'indoor',
           width: 55
        }
    ]
    ...
});
 * </code></pre>
 * In addition to toggling a Boolean value within the record data, this
 * class adds or removes a css class <tt>'x-grid-checked'</tt> on the td
 * based on whether or not it is checked to alter the background image used
 * for a column.
 */
Ext.define('SimpleTasks.ux.StatusColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'statuscolumn',

    tdCls: Ext.baseCSSPrefix + 'grid-cell-statuscolumn',
    
    /**
     * @event checkchange
     * Fires when the checked state of a row changes
     * @param {SimpleTasks.ux.StatusColumn} this
     * @param {Number} rowIndex The row index
     * @param {Boolean} checked True if the box is checked
     */

    /**
     * @private
     * Process and refire events routed from the GridView's processEvent method.
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
        var me = this,
            cssPrefix = Ext.baseCSSPrefix,
            target = Ext.get(e.getTarget()),
            dataIndex, record, checked;

        if (target.hasCls(cssPrefix + 'grid-statusheader-inner')) {
            if(type === 'mousedown' && e.button === 0) {
                record = view.panel.store.getAt(recordIndex);
                dataIndex = me.dataIndex;
                checked = !record.get(dataIndex);
                record.set(dataIndex, checked);
                me.fireEvent('checkchange', me, recordIndex, checked);
                // cancel selection.
                return false;
            } else if(type === 'mouseover') {
                target.parent().addCls(cssPrefix + 'grid-statusheader-over');
            } else if(type === 'mouseout') {
                target.parent().removeCls(cssPrefix + 'grid-statusheader-over');
            }
        } else {
            return me.callParent(arguments);
        }
    },

    // Note: class names are not placed on the prototype bc renderer scope
    // is not in the header.
    renderer : function(value){
        var cssPrefix = Ext.baseCSSPrefix,
            cls = [cssPrefix + 'grid-statusheader'];

        if (value) {
            cls.push(cssPrefix + 'grid-statusheader-checked');
        }
        return '<div class="' + cls.join(' ') + '"><div class="' + cssPrefix + 'grid-statusheader-inner' + '">&#160;</div></div>';
    }
});
