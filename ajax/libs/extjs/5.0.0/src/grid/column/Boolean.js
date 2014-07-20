/**
 * A Column definition class which renders boolean data fields.  See the {@link Ext.grid.column.Column#xtype xtype}
 * config option of {@link Ext.grid.column.Column} for more details.
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *        storeId:'sampleStore',
 *        fields:[
 *            {name: 'framework', type: 'string'},
 *            {name: 'rocks', type: 'boolean'}
 *        ],
 *        data:{'items':[
 *            { 'framework': "Ext JS 4",     'rocks': true  },
 *            { 'framework': "Sencha Touch", 'rocks': true  },
 *            { 'framework': "Ext GWT",      'rocks': true  },
 *            { 'framework': "Other Guys",   'rocks': false }
 *        ]},
 *        proxy: {
 *            type: 'memory',
 *            reader: {
 *                type: 'json',
 *                rootProperty: 'items'
 *            }
 *        }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Boolean Column Demo',
 *         store: Ext.data.StoreManager.lookup('sampleStore'),
 *         columns: [
 *             { text: 'Framework',  dataIndex: 'framework', flex: 1 },
 *             {
 *                 xtype: 'booleancolumn',
 *                 text: 'Rocks',
 *                 trueText: 'Yes',
 *                 falseText: 'No',
 *                 dataIndex: 'rocks'
 *             }
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.grid.column.Boolean', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.booleancolumn'],
    alternateClassName: 'Ext.grid.BooleanColumn',

    //<locale>
    /**
     * @cfg {String} trueText
     * The string returned by the renderer when the column value is not falsey.
     */
    trueText: 'true',
    //</locale>

    //<locale>
    /**
     * @cfg {String} falseText
     * The string returned by the renderer when the column value is falsey (but not undefined).
     */
    falseText: 'false',
    //</locale>

    /**
     * @cfg {String} undefinedText
     * The string returned by the renderer when the column value is undefined.
     */
    undefinedText: '&#160;',

    defaultFilterType: 'boolean',

    /**
     * @cfg {Object} renderer
     * @hide
     */

    /**
     * @cfg {Object} scope
     * @hide
     */

    producesHTML: false,

    defaultRenderer: function(value){
        if (value === undefined) {
            return this.undefinedText;
        }

        if (!value || value === 'false') {
            return this.falseText;
        }
        return this.trueText;
    },

    updater: function(cell, value) {
        cell.firstChild.firstChild.data = Ext.grid.column.Boolean.prototype.defaultRenderer.call(this, value);
    }
});
