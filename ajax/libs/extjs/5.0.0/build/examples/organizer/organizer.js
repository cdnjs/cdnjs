Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.org', '.');
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView');

Ext.require([
    'Ext.org.Image',
    'Ext.org.ImageView',
    'Ext.org.AlbumTree',
    'Ext.org.OrgPanel'
]);

Ext.require([
    'Ext.data.TreeStore',
    'Ext.data.proxy.Ajax',
    'Ext.tree.Column',
    'Ext.tree.View',
    'Ext.selection.TreeModel',
    'Ext.tree.plugin.TreeViewDragDrop'
]);

Ext.onReady(function() {
    Ext.create('Ext.org.OrgPanel', {
        renderTo: Ext.getBody(),
        height: 490,
        width : 700
    });
});