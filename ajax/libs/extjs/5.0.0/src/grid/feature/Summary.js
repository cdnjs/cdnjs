/**
 * This feature is used to place a summary row at the bottom of the grid. If using a grouping,
 * see {@link Ext.grid.feature.GroupingSummary}. There are 2 aspects to calculating the summaries,
 * calculation and rendering.
 *
 * ## Calculation
 * The summary value needs to be calculated for each column in the grid. This is controlled
 * by the summaryType option specified on the column. There are several built in summary types,
 * which can be specified as a string on the column configuration. These call underlying methods
 * on the store:
 *
 *  - {@link Ext.data.Store#count count}
 *  - {@link Ext.data.Store#sum sum}
 *  - {@link Ext.data.Store#min min}
 *  - {@link Ext.data.Store#max max}
 *  - {@link Ext.data.Store#average average}
 *
 * Alternatively, the summaryType can be a function definition. If this is the case,
 * the function is called with an array of records to calculate the summary value.
 *
 * ## Rendering
 * Similar to a column, the summary also supports a summaryRenderer function. This
 * summaryRenderer is called before displaying a value. The function is optional, if
 * not specified the default calculated value is shown. The summaryRenderer is called with:
 *
 *  - value {Object} - The calculated value.
 *  - summaryData {Object} - Contains all raw summary values for the row.
 *  - field {String} - The name of the field we are calculating
 *
 * ## Example Usage
 *
 *     @example
 *     Ext.define('TestResult', {
 *         extend: 'Ext.data.Model',
 *         fields: ['student', {
 *             name: 'mark',
 *             type: 'int'
 *         }]
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         width: 400,
 *         height: 200,
 *         title: 'Summary Test',
 *         style: 'padding: 20px',
 *         renderTo: document.body,
 *         features: [{
 *             ftype: 'summary'
 *         }],
 *         store: {
 *             model: 'TestResult',
 *             data: [{
 *                 student: 'Student 1',
 *                 mark: 84
 *             },{
 *                 student: 'Student 2',
 *                 mark: 72
 *             },{
 *                 student: 'Student 3',
 *                 mark: 96
 *             },{
 *                 student: 'Student 4',
 *                 mark: 68
 *             }]
 *         },
 *         columns: [{
 *             dataIndex: 'student',
 *             text: 'Name',
 *             summaryType: 'count',
 *             summaryRenderer: function(value, summaryData, dataIndex) {
 *                 return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : '');
 *             }
 *         }, {
 *             dataIndex: 'mark',
 *             text: 'Mark',
 *             summaryType: 'average'
 *         }]
 *     });
 */
Ext.define('Ext.grid.feature.Summary', {

    /* Begin Definitions */

    extend: 'Ext.grid.feature.AbstractSummary',

    alias: 'feature.summary',

    /**
     * @cfg {String} dock
     * Configure `'top'` or `'bottom'` top create a fixed summary row either above or below the scrollable table.
     *
     */
    dock: undefined,

    dockedSummaryCls: Ext.baseCSSPrefix + 'docked-summary',

    summaryItemCls: Ext.baseCSSPrefix + 'grid-item-summary',

    panelBodyCls: Ext.baseCSSPrefix + 'summary-',

    scrollPadProperty: 'padding-right',

    // turn off feature events.
    hasFeatureEvent: false,

    init: function(grid) {
        var me = this,
            view = me.view;

        me.callParent(arguments);

        if (me.dock) {
            grid.headerCt.on({
                add: me.onStoreUpdate,
                afterlayout: me.onStoreUpdate,
                scope: me
            });
            grid.on({
                beforerender: function() {
                    var tableCls = [me.summaryTableCls];
                    if (view.columnLines) {
                        tableCls[tableCls.length] = view.ownerCt.colLinesCls;
                    }
                    me.summaryBar = grid.addDocked({
                        childEls: ['innerCt', 'item'],
                        renderTpl: [
                            '<div id="{id}-innerCt" data-ref="innerCt" role="presentation">',
                                '<table id="{id}-item" data-ref="item" cellPadding="0" cellSpacing="0" class="' + tableCls.join(' ') + '">',
                                    '<tr class="' + me.summaryRowCls + '"></tr>',
                                '</table>',
                            '</div>'
                        ],
                        style: 'overflow:hidden',
                        itemId: 'summaryBar',
                        cls: [ me.dockedSummaryCls, me.dockedSummaryCls + '-' + me.dock ],
                        xtype: 'component',
                        dock: me.dock,
                        weight: 10000000
                    })[0];
                },
                afterrender: function() {
                    grid.body.addCls(me.panelBodyCls + me.dock);
                    view.on('scroll', me.onViewScroll, me);
                    me.onStoreUpdate();
                },
                single: true
            });

            // Stretch the innerCt of the summary bar upon headerCt layout
            grid.headerCt.afterComponentLayout = Ext.Function.createSequence(grid.headerCt.afterComponentLayout, function() {
                var width = this.getTableWidth(),
                    innerCt = me.summaryBar.innerCt;

                me.summaryBar.item.setWidth(width);

                // "this" is the HeaderContainer. Its tooNarrow flag is set by its layout if the columns overflow.
                // Must not measure+set in after layout phase, this is a write phase.
                if (this.tooNarrow) {
                    width += Ext.getScrollbarSize().width;
                }
                innerCt.setWidth(width);
            });
        } else {
            me.view.addFooterFn(me.renderSummaryRow);
        }

        grid.on({
            columnmove: me.onStoreUpdate,
            scope: me
        });

        // On change of data, we have to update the docked summary.
        view.mon(view.store, {
            update: me.onStoreUpdate,
            datachanged: me.onStoreUpdate,
            scope: me
        });
    },

    renderSummaryRow: function(values, out, parent) {
        var view = values.view,
            me = view.findFeature('summary');

        if (me.showSummaryRow) {
            out.push('<table class="' + Ext.baseCSSPrefix + 'table-plain ' + me.summaryItemCls + '">');
            me.outputSummaryRecord(me.createSummaryRecord(view), values, out, parent);
            out.push('</table>');
        }
    },

    toggleSummaryRow: function(visible) {
        var me = this,
            bar = me.summaryBar;

        me.callParent(arguments);
        if (bar) {
            bar.setVisible(me.showSummaryRow);
            me.onViewScroll();
        }
    },

    vetoEvent: function(record, row, rowIndex, e) {
        return !e.getTarget(this.summaryRowSelector);
    },

    onViewScroll: function() {
        this.summaryBar.setScrollX(this.view.getScrollX());
    },

    createSummaryRecord: function (view) {
        var columns = view.headerCt.getVisibleGridColumns(),
            summaryRecord = this.summaryRecord,
            colCount = columns.length, i, column,
            dataIndex, summaryValue, Model, modelData;
        
        if (!summaryRecord) {
            Model = view.store.getModel();
            modelData = {};
            modelData[Model.idProperty] = view.id + '-summary-record';
            summaryRecord = this.summaryRecord = new Model(modelData);
        }

        // Set the summary field values
        summaryRecord.beginEdit();
        for (i = 0; i < colCount; i++) {
            column = columns[i];

            // In summary records, if there's no dataIndex, then the value in regular rows must come from a renderer.
            // We set the data value in using the column ID.
            dataIndex = column.dataIndex || column.id;

            // We need to capture this value because it could get overwritten when setting on the model if there
            // is a convert() method on the model.
            summaryValue = this.getSummary(view.store, column.summaryType, dataIndex);
            summaryRecord.set(dataIndex, summaryValue);

            // Capture the columnId:value for the summaryRenderer in the summaryData object.
            this.setSummaryData(summaryRecord, column.id, summaryValue);
        }

        summaryRecord.endEdit(true);
        // It's not dirty
        summaryRecord.commit(true);
        summaryRecord.isSummary = true;

        return summaryRecord;
    },

    onStoreUpdate: function() {
        var me = this,
            view = me.view,
            record = me.createSummaryRecord(view),
            newRowDom = view.createRowElement(record, -1).firstChild.firstChild,
            oldRowDom, partner,
            p;

        if (!view.rendered) {
            return;
        }

        // Summary row is inside the docked summaryBar Component
        if (me.dock) {
            p = me.summaryBar.item.dom.firstChild;
            oldRowDom = p.firstChild;
        }
        // Summary row is a regular row in a THEAD inside the View.
        // Downlinked through the summary record's ID'
        else {
            oldRowDom = me.view.getRow(record);
            p = oldRowDom ? oldRowDom.parentNode : null;
        }

        if (p) {
            p.insertBefore(newRowDom, oldRowDom);
            p.removeChild(oldRowDom);
        }
        // If docked, the updated row will need sizing because it's outside the View
        if (me.dock) {
            me.onColumnHeaderLayout();
        }
    },

    // Synchronize column widths in the docked summary Component
    onColumnHeaderLayout: function() {
        var view = this.view,
            columns = view.headerCt.getVisibleGridColumns(),
            column,
            len = columns.length, i,
            summaryEl = this.summaryBar.el,
            el;

        for (i = 0; i < len; i++) {
            column = columns[i];
            el = summaryEl.down(view.getCellSelector(column));
            if (el) {
                el.setWidth(column.width || (column.lastBox ? column.lastBox.width : 100));
            }
        }
    }
});
