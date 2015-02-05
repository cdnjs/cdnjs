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
 *                root: 'items'
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

    /**
     * @cfg {Object} renderer
     * @hide
     */
    
    /**
     * @cfg {Object} scope
     * @hide
     */

    defaultRenderer: function(value){
        if (value === undefined) {
            return this.undefinedText;
        }
        
        if (!value || value === 'false') {
            return this.falseText;
        }
        return this.trueText;
    }
});