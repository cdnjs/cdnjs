/**
 * This is an example of using the ExtJS grid to show very large datasets
 * without overloading the DOM. It also uses locking columns, and incorporates the
 * GroupSummary feature. Filtering is enabled on certain columns using the FilterFeature.
 *
 * As an illustration of the ability of grid columns to act as containers, the Title
 * column has a filter text field built in which filters as you type.
 *
 * The grid is editable using the RowEditing plugin.
 *
 * The `multiColumnSort` config is used to allow multiple columns to have sorters.
 */
Ext.define('KitchenSink.view.grid.BigData', {
    extend: 'Ext.grid.Panel',
    requires: 'Ext.grid.filters.Filters',
    xtype: 'big-data-grid',
    store: 'BigData',
    columnLines: true,
    height: 400,
    width: 910,
    title: 'Editable Big Data Grid',
    multiColumnSort: true,

    //<example>
    exampleTitle: 'Editable Big Data Grid',
    otherContent: [{
        type: 'Controller',
        path: 'app/view/grid/BigDataController.js'
    },{
        type: 'Store',
        path: 'app/store/GeoData.js'
    },{
        type: 'Model',
        path: 'app/model/tree/Country.js'
    },{
        type: 'Model',
        path: 'app/model/tree/City.js'
    },{
        type: 'Data',
        path: 'app/data/GeoData.js'
    }],
    exampleDescription: [
        '<p>This example uses locking columns, and incorporates the GroupSummary feature.</p>' +
        '<p>Filtering is enabled on certain columns using the FilterFeature UX.</p>' +
        '<p>As an illustration of the ability of grid columns to act as containers, the ' +
        'Title column has a filter text field built in which filters as you type.</p>' +
        '<p>The grid is editable using the RowEditing plugin.</p>',
        '<p>The <code>multiColumnSort</code> config is used to allow multiple columns to have sorters.</p>'
    ].join(''),
    //</example>
    controller: 'bigdata',

    features: [{
        ftype : 'groupingsummary',
        groupHeaderTpl : '{name}',
        hideGroupedHeader : false,
        enableGroupingMenu : false
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],

    selType: 'checkboxmodel',

    columns:[{
        xtype: 'rownumberer',
        width: 40,
        sortable: false,
        locked: true
    }, {
        text: 'Id',
        sortable: true,
        dataIndex: 'employeeNo',
        groupable: false,
        width: 80,
        locked: true,
        editRenderer: 'bold'
    }, {
        text: 'Name (Filter)',
        sortable: true,
        dataIndex: 'name',
        groupable: false,
        width: 140,
        layout: 'hbox',
        locked: true,
        renderer: 'concatNames',
        editor: {
            xtype: 'textfield'
        },
        items    : {
            xtype: 'textfield',
            reference: 'nameFilterField',  // So that the Controller can access it easily
            flex : 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onNameFilterKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Rating',
        width: 100,
        sortable: true,
        dataIndex: 'rating',
        groupable: false,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'sparklineline'
        }
    }, {
        text: 'Date of birth',
        dataIndex: 'dob',
        xtype: 'datecolumn',
        groupable: false,
        width: 115,
        filter: {

        },
        editor: {
            xtype: 'datefield'
        }
    }, {
        text: 'Join date',
        dataIndex: 'joinDate',
        xtype: 'datecolumn',
        groupable: false,
        width: 120,
        filter: {

        },
        editor: {
            xtype: 'datefield'
        }
    }, {
        text: 'Notice<br>period',
        dataIndex: 'noticePeriod',
        groupable: false,
        width: 115,
        filter: {
            type: 'list'
        },
        editor: {
            xtype: 'combobox',
            initComponent: function() {
                this.store = this.column.up('tablepanel').store.collect(this.column.dataIndex, false, true);
                Ext.form.field.ComboBox.prototype.initComponent.apply(this, arguments);
            }
        }
    }, {
        text: 'Email address',
        dataIndex: 'email',
        width: 200,
        groupable: false,
        renderer: function(v) {
            return '<a href="mailto:' + v + '">' + v + '</a>';
        },
        editor: {
            xtype: 'textfield'
        },
        filter: {

        }
    }, {
        text: 'Department',
        dataIndex: 'department',
        hidden: true,
        hideable: false,
        filter: {
            type: 'list'
        }
    }, {
        text: 'Absences',
        columns: [{
            text: 'Illness',
            dataIndex: 'sickDays',
            width: 100,
            groupable: false,
            summaryType: 'sum',
            summaryFormatter: 'number("0")',
            filter: {

            },
            editor: {
                xtype: 'numberfield',
                decimalPrecision: 0
            }
        }, {
            text: 'Holidays',
            dataIndex: 'holidayDays',
            // Size column to title text
            width: null,
            groupable: false,
            summaryType: 'sum',
            summaryFormatter: 'number("0")',
            filter: {

            },
            editor: {
                xtype: 'numberfield',
                decimalPrecision: 0
            }
        }, {
            text: 'Holday Allowance',
            dataIndex: 'holidayAllowance',
            // Size column to title text
            width: null,
            groupable: false,
            filter: {

            },
            editor: {
                xtype: 'numberfield',
                decimalPrecision: 0
            }
        }]
    }, {
        text: 'Salary',
        width: 155,
        sortable: true,
        dataIndex: 'salary',
        align: 'right',
        formatter: 'usMoney',
        groupable: false,
        summaryType: 'average',
        summaryFormatter: 'usMoney',
        filter: {

        },
        editor: {
            xtype: 'numberfield',
            decimalPrecision: 2
        }
    }],

    viewConfig: {
        stripeRows: true
    },

    plugins: [{
        ptype: 'gridfilters'
    }, {
        ptype: 'rowexpander',

        // dblclick invokes the row editor
        expandOnDblClick: false,
        rowBodyTpl: '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0"><b>{name}<br></b>{dob:date}'
    }]
});
