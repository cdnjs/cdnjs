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
 * A feature is a type of plugin that is specific to the {@link Ext.grid.Panel}. It provides several
 * hooks that allows the developer to inject additional functionality at certain points throughout the 
 * grid creation cycle. This class provides the base template methods that are available to the developer,
 * it should be extended.
 * 
 * There are several built in features that extend this class, for example:
 *
 *  - {@link Ext.grid.feature.Grouping} - Shows grid rows in groups as specified by the {@link Ext.data.Store}
 *  - {@link Ext.grid.feature.RowBody} - Adds a body section for each grid row that can contain markup.
 *  - {@link Ext.grid.feature.Summary} - Adds a summary row at the bottom of the grid with aggregate totals for a column.
 * 
 * ## Using Features
 * A feature is added to the grid by specifying it an array of features in the configuration:
 * 
 *     var groupingFeature = Ext.create('Ext.grid.feature.Grouping');
 *     Ext.create('Ext.grid.Panel', {
 *         // other options
 *         features: [groupingFeature]
 *     });
 *
 * ## Writing Features
 *
 * A Feature may add new DOM structure within the structure of a grid.
 *
 * A grid is essentially a `<table>` element. A {@link Ext.view.Table TableView} instance uses three {@link Ext.XTemplate XTemplates}
 * to render the grid, `tableTpl`, `rowTpl`, `cellTpl`.
 *
 * * A {@link Ext.view.Table TableView} uses its `tableTpl` to emit the `<table>` and `<tbody>` HTML tags into its output stream. It also emits a `<thead>` which contains a
 * sizing row. To ender the rows, it invokes {@link Ext.view.Table#renderRows} passing the `rows` member of its data object.
 *
 * The `tableTpl`'s data object Looks like this:
 *     {
 *         view: owningTableView,
 *         rows: recordsToRender,
 *         viewStartIndex: indexOfFirstRecordInStore,
 *         tableStyle: styleString
 *     }
 *
 * * A {@link Ext.view.Table TableView} uses its `rowTpl` to emit a `<tr>` HTML tag to its output stream. To render cells,
 * it invokes {@link Ext.view.Table#renderCell} passing the `rows` member of its data object.
 *
 * The `rowTpl`'s data object looks like this:
 *
 *     {
 *         view:        owningTableView,
 *         record:      recordToRender,
 *         recordIndex: indexOfRecordInStore,
 *         columns:     arrayOfColumnDefinitions,
 *         itemClasses: arrayOfClassNames, // For outermost row in case of wrapping
 *         rowClasses:  arrayOfClassNames,  // For internal data bearing row in case of wrapping
 *         rowStyle:    styleString
 *     }
 *
 * * A {@link Ext.view.Table TableView} uses its `cellTpl` to emit a `<td>` HTML tag to its output stream.
 *
 * The `cellTpl's` data object looks like this:
 *
 *     {
 *         record: recordToRender
 *         column: columnToRender;
 *         recordIndex: indexOfRecordInStore,
 *         columnIndex: columnIndex,
 *         align: columnAlign,
 *         tdCls: classForCell
 *     }
 *
 * A Feature may inject its own tableTpl or rowTpl or cellTpl into the {@link Ext.view.Table TableView}'s rendering by
 * calling {@link Ext.view.Table#addTableTpl} or {@link Ext.view.Table#addRowTpl} or {@link Ext.view.Table#addCellTpl}.
 *
 * The passed XTemplate is added *upstream* of the default template for the table element in a link list of XTemplates which contribute
 * to the element's HTML. It may emit appropriate HTML strings into the output stream *around* a call to
 *
 *     this.nextTpl.apply(values, out, parent);
 *
 * This passes the current value context, output stream and the parent value context to the next XTemplate in the list.
 *
 * @abstract
 */
Ext.define('Ext.grid.feature.Feature', {
    extend: 'Ext.util.Observable',
    alias: 'feature.feature',
    
    wrapsItem: false,

    /*
     * @property {Boolean} isFeature
     * `true` in this class to identify an object as an instantiated Feature, or subclass thereof.
     */
    isFeature: true,

    /**
     * True when feature is disabled.
     */
    disabled: false,

    /**
     * @property {Boolean}
     * Most features will expose additional events, some may not and will
     * need to change this to false.
     */
    hasFeatureEvent: true,

    /**
     * @property {String}
     * Prefix to use when firing events on the view.
     * For example a prefix of group would expose "groupclick", "groupcontextmenu", "groupdblclick".
     */
    eventPrefix: null,

    /**
     * @property {String}
     * Selector used to determine when to fire the event with the eventPrefix.
     */
    eventSelector: null,

    /**
     * @property {Ext.view.Table}
     * Reference to the TableView.
     */
    view: null,

    /**
     * @property {Ext.grid.Panel}
     * Reference to the grid panel
     */
    grid: null,
    
    constructor: function(config) {
        this.initialConfig = config;
        this.callParent(arguments);
    },

    clone: function() {
        return new this.self(this.initialConfig);
    },

    init: Ext.emptyFn,
    
    destroy: function(){
        this.clearListeners();
    },

    /**
     * Abstract method to be overriden when a feature should add additional
     * arguments to its event signature. By default the event will fire:
     *
     * - view - The underlying Ext.view.Table
     * - featureTarget - The matched element by the defined {@link #eventSelector}
     *
     * The method must also return the eventName as the first index of the array
     * to be passed to fireEvent.
     * @template
     */
    getFireEventArgs: function(eventName, view, featureTarget, e) {
        return [eventName, view, featureTarget, e];
    },
    
    vetoEvent: Ext.emptyFn,

    /**
     * Enables the feature.
     */
    enable: function() {
        this.disabled = false;
    },

    /**
     * Disables the feature.
     */
    disable: function() {
        this.disabled = true;
    }

});