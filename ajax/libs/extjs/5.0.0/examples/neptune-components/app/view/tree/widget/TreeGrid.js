Ext.define('Neptune.view.tree.widget.TreeGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'treeGrid',
    store: 'FileSystem',
    title: 'Tree Grid',
    useArrows: true,
    rowLines: true,
    columns: [
        { xtype: 'treecolumn', text: 'File Name', dataIndex: 'text', flex: 1 },
        { xtype: 'datecolumn', text: 'Date Modified', dataIndex: 'modified' },
        { xtype: 'numbercolumn', text: 'File Size', dataIndex: 'size' },
        { text: 'Permissions', dataIndex: 'permissions' }
    ]
});