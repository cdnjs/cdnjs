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
 * A small abstract class that contains the shared behaviour for any summary
 * calculations to be used in the grid.
 */
Ext.define('Ext.grid.feature.AbstractSummary', {

    extend: 'Ext.grid.feature.Feature',

    alias: 'feature.abstractsummary',

    summaryRowCls: Ext.baseCSSPrefix + 'grid-row-summary',
    summaryTableCls: Ext.plainTableCls + ' ' + Ext.baseCSSPrefix + 'grid-table',
    summaryRowSelector: '.' + Ext.baseCSSPrefix + 'grid-row-summary',

    // High priority rowTpl interceptor which sees summary rows early, and renders them correctly and then aborts the row rendering chain.
    // This will only see action when summary rows are being updated and Table.onUpdate->Table.bufferRender renders the individual updated sumary row.
    summaryRowTpl: {
        before: function(values, out) {
            // If a summary record comes through the rendering pipeline, render it simply, and return false from the
            // before method which aborts the tpl chain
            if (values.record.isSummary) {
                this.summaryFeature.outputSummaryRecord(values.record, values, out);
                return false;
            }
        },
        priority: 1000
    },

   /**
    * @cfg {Boolean}
    * True to show the summary row.
    */
    showSummaryRow: true,

    // Listen for store updates. Eg, from an Editor.
    init: function() {
        var me = this;
        me.view.summaryFeature = me;
        me.rowTpl = me.view.self.prototype.rowTpl;

        // Add a high priority interceptor which renders summary records simply
        // This will only see action ona bufferedRender situation where summary records are updated.
        me.view.addRowTpl(me.summaryRowTpl).summaryFeature = me;
    },

    /**
     * Toggle whether or not to show the summary row.
     * @param {Boolean} visible True to show the summary row
     */
    toggleSummaryRow: function(visible) {
        this.showSummaryRow = !!visible;
    },

    outputSummaryRecord: function(summaryRecord, contextValues, out) {
        var view = contextValues.view,
            savedRowValues = view.rowValues,
            columns = contextValues.columns || view.headerCt.getVisibleGridColumns(),
            colCount = columns.length, i, column,
            // Set up a row rendering values object so that we can call the rowTpl directly to inject
            // the markup of a grid row into the output stream.
            values = {
                view: view,
                record: summaryRecord,
                rowStyle: '',
                rowClasses: [ this.summaryRowCls ],
                itemClasses: [],
                recordIndex: -1,
                rowId: view.getRowId(summaryRecord),
                columns: columns
            };

        // Because we are using the regular row rendering pathway, temporarily swap out the renderer for the summaryRenderer
        for (i = 0; i < colCount; i++) {
            column = columns[i];
            column.savedRenderer = column.renderer;
            if (column.summaryRenderer) {
                column.renderer = column.summaryRenderer;
            } else if (!column.summaryType) {
                column.renderer = Ext.emptyFn;
            }

            // Summary records may contain values based upon the column's ID if the column is not mapped from a field
            if (!column.dataIndex) {
                column.dataIndex = column.id;
            }
        }

        // Use the base template to render a summary row
        view.rowValues = values;
        view.self.prototype.rowTpl.applyOut(values, out);
        view.rowValues = savedRowValues;

        // Restore regular column renderers
        for (i = 0; i < colCount; i++) {
            column = columns[i];
            column.renderer = column.savedRenderer;
            column.savedRenderer = null;
        }
    },

    /**
     * Get the summary data for a field.
     * @private
     * @param {Ext.data.Store} store The store to get the data from
     * @param {String/Function} type The type of aggregation. If a function is specified it will
     * be passed to the stores aggregate function.
     * @param {String} field The field to aggregate on
     * @param {Boolean} group True to aggregate in grouped mode 
     * @return {Number/String/Object} See the return type for the store functions.
     * if the group parameter is `true` An object is returned with a property named for each group who's
     * value is the summary value.
     */
    getSummary: function(store, type, field, group){
        var records = group.records;

        if (type) {
            if (Ext.isFunction(type)) {
                return store.getAggregate(type, null, records, [field]);
            }

            switch (type) {
                case 'count':
                    return records.length;
                case 'min':
                    return store.getMin(records, field);
                case 'max':
                    return store.getMax(records, field);
                case 'sum':
                    return store.getSum(records, field);
                case 'average':
                    return store.getAverage(records, field);
                default:
                    return '';

            }
        }
    },

    /**
     * Used by the Grouping Feature when {@link #showSummaryRow} is `true`.
     * 
     * Generates group summary data for the whole store.
     * @private
     * @return {Object} An object hash keyed by group name containing summary records.
     */
    generateSummaryData: function(){
        var me = this,
            store = me.view.store,
            groups = store.groups.items,
            reader = store.proxy.reader,
            len = groups.length,
            groupField = me.getGroupField(),
            data = {},
            lockingPartner = me.lockingPartner,
            i, group, record,
            root, summaryRows, hasRemote,
            convertedSummaryRow, remoteData;

        /**
         * @cfg {String} [remoteRoot=undefined]
         * The name of the property which contains the Array of summary objects.
         * It allows to use server-side calculated summaries.
         */
        if (me.remoteRoot && reader.rawData) {
            hasRemote = true;
            remoteData = {};
            // reset reader root and rebuild extractors to extract summaries data
            root = reader.root;
            reader.root = me.remoteRoot;
            reader.buildExtractors(true);
            summaryRows = reader.getRoot(reader.rawData)||[];
            len = summaryRows.length;

            // Ensure the Reader has a data conversion function to convert a raw data row into a Record data hash
            if (!reader.convertRecordData) {
                reader.buildExtractors();
            }

            for (i = 0; i < len; ++i) {
                convertedSummaryRow = {};

                // Convert a raw data row into a Record's hash object using the Reader
                reader.convertRecordData(convertedSummaryRow, summaryRows[i]);
                remoteData[convertedSummaryRow[groupField]] = convertedSummaryRow;
            }

            // restore initial reader configuration
            reader.root = root;
            reader.buildExtractors(true);
        }

        for (i = 0; i < len; ++i) {
            group = groups[i];
            // Something has changed or it doesn't exist, populate it
            if (hasRemote || group.isDirty() || !group.hasAggregate()) {
                if (hasRemote) {
                    record = me.populateRemoteRecord(group, remoteData);
                } else {
                    record = me.populateRecord(group);
                }
                // Clear the dirty state of the group if this is the only Summary, or this is the right hand (normal grid's) summary
                if (!lockingPartner || (me.view.ownerCt === me.view.ownerCt.ownerLockable.normalGrid)) {
                    group.commit();
                }
            } else {
                record = group.getAggregateRecord();
            }
            data[group.key] = record;
        }

        return data;
    },

    populateRemoteRecord: function(group, data) {
        var record = group.getAggregateRecord(true),
            groupData = data[group.key],
            field;

        record.beginEdit();
        for (field in groupData) {
            if (groupData.hasOwnProperty(field)) {
                if (field !== record.idProperty) {
                    record.set(field, groupData[field]);
                }
            }
        }
        record.endEdit(true);
        record.commit(true);

        return record;
    },

    populateRecord: function(group){
        var me = this,
            view = me.grid.ownerLockable ? me.grid.ownerLockable.view : me.view,
            store = me.view.store,
            record = group.getAggregateRecord(),
            // Use the full column set, regardless of locking
            columns = view.headerCt.getGridColumns(),
            len = columns.length,
            i, column, fieldName;

        record.beginEdit();
        for (i = 0; i < len; ++i) {
            column = columns[i];
            // Use the column id if there's no mapping, could be a calculated field
            fieldName = column.dataIndex || column.id;
            record.set(fieldName, me.getSummary(store, column.summaryType, fieldName, group));
        }
        record.endEdit(true);
        record.commit();

        return record;
    }
});
