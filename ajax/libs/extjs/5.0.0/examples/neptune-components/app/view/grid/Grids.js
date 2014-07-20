Ext.define('Neptune.view.grid.Grids', {
    extend: 'Ext.container.Container',
    xtype: 'grids',
    id: 'grids',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' },
        tableAttrs: {
            style: 'width:100%'
        }
    },
    defaults: {
        height: 300
    },
    items: [
        {
            xtype: 'basicGrid',
            title: "Grid with Cell Editing and D'n'D reordering",
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('company') : ' on empty view';
                        Ext.Msg.alert("Drag from right to left", 'Dropped ' + data.records[0].get('company') + dropOn);
                    }
                }
            }
        },
        {
            xtype: 'basicGrid',
            plugins: {
                ptype: 'rowediting'
            },
            rowLines: false,
            title: 'Grid with Row Editing, and no Row Lines'
        },
        {
            xtype: 'basicGrid',
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            plugins: null,
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Company',
                dock: 'bottom',
                displayInfo: true
            }],
            title: 'Grid with Checkbox Selection Model and Paging Toolbar'
        },
        {
            xtype: 'groupHeaderGrid'
        },
        {
            xtype: 'groupGrid'
        },
        {
            xtype: 'lockGroupSummary'
        },
        {
            xtype: 'basicGrid',
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
            title: 'Grid with RowExpander'
        }
    ]
});