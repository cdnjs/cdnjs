/**
 * The grid View class provides extra {@link Ext.grid.Panel} specific functionality to the
 * {@link Ext.view.Table}. In general, this class is not instanced directly, instead a viewConfig
 * option is passed to the grid:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         viewConfig: {
 *             stripeRows: false
 *         }
 *     });
 *
 * ## Drag Drop
 *
 * Drag and drop functionality can be achieved in the grid by attaching a {@link Ext.grid.plugin.DragDrop} plugin
 * when creating the view.
 *
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         viewConfig: {
 *             plugins: {
 *                 ddGroup: 'people-group',
 *                 ptype: 'gridviewdragdrop',
 *                 enableDrop: false
 *             }
 *         }
 *     });
 */
Ext.define('Ext.grid.View', {
    extend: 'Ext.view.Table',
    alias: 'widget.gridview',

    autoScroll: true
});
