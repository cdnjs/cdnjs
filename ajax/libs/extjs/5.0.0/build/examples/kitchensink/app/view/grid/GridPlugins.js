/**
 * This example demonstrates several grid plugins.
 */
Ext.define('KitchenSink.view.grid.GridPlugins', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'KitchenSink.model.grid.Financial'
    ],

    xtype: 'grid-plugins',
    
    bodyStyle: 'background-color:transparent',
    //<example>
    exampleTitle: 'Grid Plugins',
    otherContent: [{
        type: 'Model',
        path: 'app/model/grid/Financial.js'
    }],
    themes: {
        classic: {
            width: 700,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85
        },
        neptune: {
            width: 750,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115
        }
    },
    //</example>

    statics: {

        hasDescriptions : false,

        dummyData : [
            [0, '3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing'],
            [1, 'Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing'],
            [2, 'Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing'],
            [3, 'American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance'],
            [4, 'American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services'],
            [5, 'AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services'],
            [6, 'Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing'],
            [7, 'Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services'],
            [8, 'Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am', 'Finance'],
            [9, 'E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am', 'Manufacturing'],
            [10, 'Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am', 'Manufacturing'],
            [11, 'General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am', 'Manufacturing'],
            [12, 'General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am', 'Automotive'],
            [13, 'Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am', 'Computer'],
            [14, 'Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am', 'Manufacturing'],
            [15, 'Intel Corporation',19.88,0.31,1.58,'9/1 12:00am', 'Computer'],
            [16, 'International Business Machines',81.41,0.44,0.54,'9/1 12:00am', 'Computer'],
            [17, 'Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am', 'Medical'],
            [18, 'JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am', 'Finance'],
            [19, 'McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am', 'Food'],
            [20, 'Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am', 'Medical'],
            [21, 'Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am', 'Computer'],
            [22, 'Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am', 'Medical'],
            [23, 'The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am', 'Food'],
            [24, 'The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am', 'Retail'],
            [25, 'The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am', 'Manufacturing'],
            [26, 'United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am', 'Computer'],
            [27, 'Verizon Communications',35.57,0.39,1.11,'9/1 12:00am', 'Services'],
            [28, 'Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am', 'Retail'],
            [29, 'Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am', 'Services']
        ],

        getDummyData : function() {
            if ( !this.hasDescriptions ) {
                // add in some dummy descriptions
                for(var i = 0; i < this.dummyData.length; i++){
                    this.dummyData[i].push('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. ');
                }
                this.hasDescriptions = true;
            }
            return this.dummyData;
        },

        getLocalStore : function() {
            return Ext.create('Ext.data.ArrayStore', {
                model: 'KitchenSink.model.grid.Financial',
                data: this.getDummyData()
            });
        }

    },

    height: 1400,
    width: 700,

    initComponent: function() {
        var me = this;

        me.width = me.themeInfo.width;

        Ext.applyIf(me, {
            defaults: {
                margin: '0 0 10 0'
            },
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    store: me.statics().getLocalStore(),
                    columns: [
                        {text: "Company", flex: 1, dataIndex: 'company'},
                        {text: "Price", formatter: 'usMoney', dataIndex: 'price'},
                        {text: "Change", dataIndex: 'change'},
                        {text: "% Change", dataIndex: 'pctChange'},
                        {text: "Last Updated", width: 120, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
                    ],
                    columnLines: true,
                    enableLocking: true,
                    height: 300,
                    plugins: [{
                        ptype: 'rowexpander',
                        rowBodyTpl : new Ext.XTemplate(
                            '<p><b>Company:</b> {company}</p>',
                            '<p><b>Change:</b> {change:this.formatChange}</p><br>',
                            '<p><b>Summary:</b> {desc}</p>',
                        {
                            formatChange: function(v){
                                var color = v >= 0 ? 'green' : 'red';
                                return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                            }
                        })
                    }],
                    collapsible: true,
                    animCollapse: false,
                    title: 'Expander Rows in a Collapsible Grid with lockable columns',
                    iconCls: 'icon-grid',
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    store: me.statics().getLocalStore(),
                    selType: 'checkboxmodel',
                    columns: [
                        {text: "Company", width: 300, dataIndex: 'company'},
                        {text: "Price", formatter: 'usMoney', dataIndex: 'price'},
                        {text: "Change", dataIndex: 'change'},
                        {text: "% Change", dataIndex: 'pctChange'},
                        {text: "Last Updated", width: 120, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
                    ],
                    columnLines: true,
                    height: 300,
                    frame: true,
                    title: 'Framed with Checkbox Selection and Horizontal Scrolling',
                    iconCls: 'icon-grid',
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    store: me.statics().getLocalStore(),
                    columns: [
                        Ext.create('Ext.grid.RowNumberer'),
                        {text: "Company", flex: 1, sortable: true, dataIndex: 'company'},
                        {text: "Price", width: 120, sortable: true, formatter: 'usMoney', dataIndex: 'price'},
                        {text: "Change", width: 120, sortable: true, dataIndex: 'change'},
                        {text: "% Change", width: 120, sortable: true, dataIndex: 'pctChange'},
                        {text: "Last Updated", width: 120, sortable: true, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
                    ],
                    columnLines: true,
                    height:300,
                    title:'Grid with Numbered Rows',
                    iconCls:'icon-grid',
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'gridpanel',
                    itemId: 'grid4',
                    store: me.statics().getLocalStore(),
                    columns: [
                        {text: "Company", flex: 1, sortable: true, dataIndex: 'company'},
                        {text: "Price", width: 120, sortable: true, formatter: 'usMoney', dataIndex: 'price'},
                        {text: "Change", width: 120, sortable: true, dataIndex: 'change'},
                        {text: "% Change", width: 120, sortable: true, dataIndex: 'pctChange'},
                        {text: "Last Updated", width: 120, sortable: true, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
                    ],
                    columnLines: true,
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        listeners: {
                            selectionchange: function(sm, selections) {
                                var grid4 = Ext.ComponentQuery.query( 'grid-plugins gridpanel#grid4' )[ 0 ];
                                grid4.down('#removeButton').setDisabled(selections.length === 0);
                            }
                        }
                    }),

                    // inline buttons
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {
                            pack: 'center'
                        },
                        items: [{
                            minWidth: 80,
                            text: 'Save'
                        },{
                            minWidth: 80,
                            text: 'Cancel'
                        }]
                    }, {
                        xtype: 'toolbar',
                        items: [{
                            text:'Add Something',
                            tooltip:'Add a new row',
                            iconCls:'add'
                        }, '-', {
                            text:'Options',
                            tooltip:'Set options',
                            iconCls:'option'
                        },'-',{
                            itemId: 'removeButton',
                            text:'Remove Something',
                            tooltip:'Remove the selected item',
                            iconCls:'remove',
                            disabled: true
                        }]
                    }],

                    height: 300,
                    frame: true,
                    title: 'Support for standard Panel features such as framing, buttons and toolbars',
                    iconCls: 'icon-grid'
                }
            ]
        });

        me.callParent(arguments);
    }

});