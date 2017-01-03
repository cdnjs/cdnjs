Ext.define('Neptune.view.tree.Trees', {
    extend: 'Ext.container.Container',
    xtype: 'trees',
    id: 'trees',

    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 7px; vertical-align: top;' },
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },
    defaults: {
        height: 300
    },
    items: [
        { xtype: 'basicTree' },
        { xtype: 'basicTree', lines: false, title: 'Tree with no lines' },
        { xtype: 'treeGrid' },
        {
            xtype: 'treeGrid',
            title: 'Locking treegrid',
            initComponent: function() {
                delete this.columns[0].flex;
                this.columns[0].width = 270;
                this.columns[0].locked = true;
                Neptune.view.tree.widget.TreeGrid.prototype.initComponent.apply(this, arguments);
            }
        }
    ]
});