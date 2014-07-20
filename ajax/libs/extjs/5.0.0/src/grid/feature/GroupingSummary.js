/**
 * This feature adds an aggregate summary row at the bottom of each group that is provided
 * by the {@link Ext.grid.feature.Grouping} feature. There are two aspects to the summary:
 *
 * ## Calculation
 *
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
 * the function is called with two parameters: an array of records, and an array of field values
 * to calculate the summary value.
 *
 * ## Rendering
 *
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
 *         fields: ['student', 'subject', {
 *             name: 'mark',
 *             type: 'int'
 *         }]
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         width: 200,
 *         height: 240,
 *         renderTo: document.body,
 *         features: [{
 *             groupHeaderTpl: 'Subject: {name}',
 *             ftype: 'groupingsummary'
 *         }],
 *         store: {
 *             model: 'TestResult',
 *             groupField: 'subject',
 *             data: [{
 *                 student: 'Student 1',
 *                 subject: 'Math',
 *                 mark: 84
 *             },{
 *                 student: 'Student 1',
 *                 subject: 'Science',
 *                 mark: 72
 *             },{
 *                 student: 'Student 2',
 *                 subject: 'Math',
 *                 mark: 96
 *             },{
 *                 student: 'Student 2',
 *                 subject: 'Science',
 *                 mark: 68
 *             }]
 *         },
 *         columns: [{
 *             dataIndex: 'student',
 *             text: 'Name',
 *             summaryType: 'count',
 *             summaryRenderer: function(value){
 *                 return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : '');
 *             }
 *         }, {
 *             dataIndex: 'mark',
 *             text: 'Mark',
 *             summaryType: 'average'
 *         }]
 *     });
 */
Ext.define('Ext.grid.feature.GroupingSummary', {

    extend: 'Ext.grid.feature.Grouping',

    alias: 'feature.groupingsummary',

    showSummaryRow: true,
    
    vetoEvent: function(record, row, rowIndex, e){
        var result = this.callParent(arguments);
        if (result !== false) {
            if (e.getTarget(this.summaryRowSelector)) {
                result = false;
            }
        }
        return result;
    }
});