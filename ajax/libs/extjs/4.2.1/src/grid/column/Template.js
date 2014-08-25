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
 * A Column definition class which renders a value by processing a {@link Ext.data.Model Model}'s
 * {@link Ext.data.Model#persistenceProperty data} using a {@link #tpl configured}
 * {@link Ext.XTemplate XTemplate}.
 * 
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['firstname', 'lastname', 'seniority', 'department'],
 *         groupField: 'department',
 *         data:[
 *             { firstname: "Michael", lastname: "Scott",   seniority: 7, department: "Management" },
 *             { firstname: "Dwight",  lastname: "Schrute", seniority: 2, department: "Sales" },
 *             { firstname: "Jim",     lastname: "Halpert", seniority: 3, department: "Sales" },
 *             { firstname: "Kevin",   lastname: "Malone",  seniority: 4, department: "Accounting" },
 *             { firstname: "Angela",  lastname: "Martin",  seniority: 5, department: "Accounting" }
 *         ]
 *     });
 *     
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Column Template Demo',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             { text: 'Full Name',       xtype: 'templatecolumn', tpl: '{firstname} {lastname}', flex:1 },
 *             { text: 'Department (Yrs)', xtype: 'templatecolumn', tpl: '{department} ({seniority})' }
 *         ],
 *         height: 200,
 *         width: 300,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.grid.column.Template', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.templatecolumn'],
    requires: ['Ext.XTemplate'],
    alternateClassName: 'Ext.grid.TemplateColumn',

    /**
     * @cfg {String/Ext.XTemplate} tpl
     * An {@link Ext.XTemplate XTemplate}, or an XTemplate *definition string* to use to process a
     * {@link Ext.data.Model Model}'s {@link Ext.data.Model#persistenceProperty data} to produce a
     * column's rendered value.
     */
    
    /**
     * @cfg {Object} renderer
     * @hide
     */
    
    /**
     * @cfg {Object} scope
     * @hide
     */

    initComponent: function(){
        var me = this;
        me.tpl = (!Ext.isPrimitive(me.tpl) && me.tpl.compile) ? me.tpl : new Ext.XTemplate(me.tpl);
        // Set this here since the template may access any record values,
        // so we must always run the update for this column
        me.hasCustomRenderer = true;
        me.callParent(arguments);
    },
    
    defaultRenderer: function(value, meta, record) {
        var data = Ext.apply({}, record.data, record.getAssociatedData());
        return this.tpl.apply(data);
    }
});
