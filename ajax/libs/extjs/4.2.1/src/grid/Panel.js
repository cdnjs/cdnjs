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
 * @author Aaron Conran
 * @docauthor Ed Spencer
 *
 * Grids are an excellent way of showing large amounts of tabular data on the client side. Essentially a supercharged
 * `<table>`, GridPanel makes it easy to fetch, sort and filter large amounts of data.
 *
 * Grids are composed of two main pieces - a {@link Ext.data.Store Store} full of data and a set of columns to render.
 *
 * ## Basic GridPanel
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId:'simpsonsStore',
 *         fields:['name', 'email', 'phone'],
 *         data:{'items':[
 *             { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
 *             { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
 *             { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
 *             { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'items'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Simpsons',
 *         store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name' },
 *             { text: 'Email', dataIndex: 'email', flex: 1 },
 *             { text: 'Phone', dataIndex: 'phone' }
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 *
 * The code above produces a simple grid with three columns. We specified a Store which will load JSON data inline.
 * In most apps we would be placing the grid inside another container and wouldn't need to use the
 * {@link #height}, {@link #width} and {@link #renderTo} configurations but they are included here to make it easy to get
 * up and running.
 *
 * The grid we created above will contain a header bar with a title ('Simpsons'), a row of column headers directly underneath
 * and finally the grid rows under the headers.
 *
 * ## Configuring columns
 *
 * By default, each column is sortable and will toggle between ASC and DESC sorting when you click on its header. Each
 * column header is also reorderable by default, and each gains a drop-down menu with options to hide and show columns.
 * It's easy to configure each column - here we use the same example as above and just modify the columns config:
 *
 *     columns: [
 *         {
 *             text: 'Name',
 *             dataIndex: 'name',
 *             sortable: false,
 *             hideable: false,
 *             flex: 1
 *         },
 *         {
 *             text: 'Email',
 *             dataIndex: 'email',
 *             hidden: true
 *         },
 *         {
 *             text: 'Phone',
 *             dataIndex: 'phone',
 *             width: 100
 *         }
 *     ]
 *
 * We turned off sorting and hiding on the 'Name' column so clicking its header now has no effect. We also made the Email
 * column hidden by default (it can be shown again by using the menu on any other column). We also set the Phone column to
 * a fixed with of 100px and flexed the Name column, which means it takes up all remaining width after the other columns
 * have been accounted for. See the {@link Ext.grid.column.Column column docs} for more details.
 *
 * ## Renderers
 *
 * As well as customizing columns, it's easy to alter the rendering of individual cells using renderers. A renderer is
 * tied to a particular column and is passed the value that would be rendered into each cell in that column. For example,
 * we could define a renderer function for the email column to turn each email address into a mailto link:
 *
 *     columns: [
 *         {
 *             text: 'Email',
 *             dataIndex: 'email',
 *             renderer: function(value) {
 *                 return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
 *             }
 *         }
 *     ]
 *
 * See the {@link Ext.grid.column.Column column docs} for more information on renderers.
 *
 * ## Selection Models
 *
 * Sometimes all you want is to render data onto the screen for viewing, but usually it's necessary to interact with or
 * update that data. Grids use a concept called a Selection Model, which is simply a mechanism for selecting some part of
 * the data in the grid. The two main types of Selection Model are RowSelectionModel, where entire rows are selected, and
 * CellSelectionModel, where individual cells are selected.
 *
 * Grids use a Row Selection Model by default, but this is easy to customise like so:
 *
 *     Ext.create('Ext.grid.Panel', {
 *         selType: 'cellmodel',
 *         store: ...
 *     });
 *
 * Specifying the `cellmodel` changes a couple of things. Firstly, clicking on a cell now
 * selects just that cell (using a {@link Ext.selection.RowModel rowmodel} will select the entire row), and secondly the
 * keyboard navigation will walk from cell to cell instead of row to row. Cell-based selection models are usually used in
 * conjunction with editing.
 *
 * ## Sorting & Filtering
 *
 * Every grid is attached to a {@link Ext.data.Store Store}, which provides multi-sort and filtering capabilities. It's
 * easy to set up a grid to be sorted from the start:
 *
 *     var myGrid = Ext.create('Ext.grid.Panel', {
 *         store: {
 *             fields: ['name', 'email', 'phone'],
 *             sorters: ['name', 'phone']
 *         },
 *         columns: [
 *             { text: 'Name',  dataIndex: 'name' },
 *             { text: 'Email', dataIndex: 'email' }
 *         ]
 *     });
 *
 * Sorting at run time is easily accomplished by simply clicking each column header. If you need to perform sorting on
 * more than one field at run time it's easy to do so by adding new sorters to the store:
 *
 *     myGrid.store.sort([
 *         { property: 'name',  direction: 'ASC' },
 *         { property: 'email', direction: 'DESC' }
 *     ]);
 *
 * See {@link Ext.data.Store} for examples of filtering.
 *
 * ## State saving
 * 
 * When configured {@link #stateful}, grids save their column state (order and width) encapsulated within the default
 * Panel state of changed width and height and collapsed/expanded state.
 *
 * Each {@link #columns column} of the grid may be configured with a {@link Ext.grid.column.Column#stateId stateId} which
 * identifies that column locally within the grid.
 *
 * ## Plugins and Features
 *
 * Grid supports addition of extra functionality through features and plugins:
 *
 * - {@link Ext.grid.plugin.CellEditing CellEditing} - editing grid contents one cell at a time.
 *
 * - {@link Ext.grid.plugin.RowEditing RowEditing} - editing grid contents an entire row at a time.
 *
 * - {@link Ext.grid.plugin.DragDrop DragDrop} - drag-drop reordering of grid rows.
 *
 * - {@link Ext.toolbar.Paging Paging toolbar} - paging through large sets of data.
 *
 * - {@link Ext.grid.plugin.BufferedRenderer Infinite scrolling} - another way to handle large sets of data.
 *
 * - {@link Ext.grid.RowNumberer RowNumberer} - automatically numbered rows.
 *
 * - {@link Ext.grid.feature.Grouping Grouping} - grouping together rows having the same value in a particular field.
 *
 * - {@link Ext.grid.feature.Summary Summary} - a summary row at the bottom of a grid.
 *
 * - {@link Ext.grid.feature.GroupingSummary GroupingSummary} - a summary row at the bottom of each group.
 */
Ext.define('Ext.grid.Panel', {
    extend: 'Ext.panel.Table',
    requires: ['Ext.grid.View'],
    alias: ['widget.gridpanel', 'widget.grid'],
    alternateClassName: ['Ext.list.ListView', 'Ext.ListView', 'Ext.grid.GridPanel'],
    viewType: 'gridview',

    lockable: false,

    /**
     * @cfg {Boolean} rowLines False to remove row line styling
     */
    rowLines: true

    // Columns config is required in Grid
    /**
     * @cfg {Ext.grid.column.Column[]/Object} columns (required)
     * @inheritdoc
     */

    /**
     * @event beforereconfigure
     * Fires before a reconfigure to enable modification of incoming Store and columns.
     * @param {Ext.grid.Panel} this
     * @param {Ext.data.Store} store The store that was passed to the {@link #method-reconfigure} method
     * @param {Object[]} columns The column configs that were passed to the {@link #method-reconfigure} method
     * @param {Ext.data.Store} oldStore The store that will be replaced
     * @param {Ext.grid.column.Column[]} The column headers that will be replaced.
     */

    /**
     * @event reconfigure
     * Fires after a reconfigure.
     * @param {Ext.grid.Panel} this
     * @param {Ext.data.Store} store The store that was passed to the {@link #method-reconfigure} method
     * @param {Object[]} columns The column configs that were passed to the {@link #method-reconfigure} method
     * @param {Ext.data.Store} oldStore The store that was replaced
     * @param {Ext.grid.column.Column[]} The column headers that were replaced.
     */

    /**
     * @method reconfigure
     * Reconfigures the grid with a new store/columns. Either the store or the columns can be omitted if you don't wish
     * to change them.
     * @param {Ext.data.Store} store (Optional) The new store.
     * @param {Object[]} columns (Optional) An array of column configs
     */
});