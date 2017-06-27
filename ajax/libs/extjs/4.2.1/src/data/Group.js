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
/** */
Ext.define('Ext.data.Group', {

    extend: 'Ext.util.Observable',

    key: undefined,

    dirty: true,

    constructor: function(){
        this.callParent(arguments);
        this.records = [];    
    },

    contains: function(record){
        return Ext.Array.indexOf(this.records, record) !== -1;
    },

    add: function(records) {
        Ext.Array.push(this.records, records);
        this.dirty = true;  
    },

    remove: function(records) {
        if (!Ext.isArray(records)) {
            records = [records];
        }

        var len = records.length,
            i;

        for (i = 0; i < len; ++i) {
            Ext.Array.remove(this.records, records[i]);
        }
        this.dirty = true;
    },

    isDirty: function(){
        return this.dirty;    
    },

    hasAggregate: function(){
        return !!this.aggregate;
    },

    setDirty: function(){
        this.dirty = true;
    },

    commit: function(){
        this.dirty = false;
    },

    isCollapsed: function(){
        return this.collapsed;    
    },

    getAggregateRecord: function(forceNew){
        var me = this,
            Model;

        if (forceNew === true || me.dirty || !me.aggregate) {
            Model = me.store.model;
            me.aggregate = new Model();
            me.aggregate.isSummary = true;
        }
        return me.aggregate;
    }

});
