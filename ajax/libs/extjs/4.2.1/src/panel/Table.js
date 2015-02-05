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
 * @author Nicolas Ferrero
 *
 * TablePanel is the basis of both {@link Ext.tree.Panel TreePanel} and {@link Ext.grid.Panel GridPanel}.
 *
 * TablePanel aggregates:
 *
 *  - a Selection Model
 *  - a View
 *  - a Store
 *  - Scrollers
 *  - Ext.grid.header.Container
 * 
 * @mixins Ext.grid.locking.Lockable
 */
Ext.define('Ext.panel.Table', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.tablepanel',

    uses: [
        'Ext.selection.RowModel',
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.grid.header.Container',
        'Ext.grid.locking.Lockable'
    ],

    extraBaseCls: Ext.baseCSSPrefix + 'grid',
    extraBodyCls: Ext.baseCSSPrefix + 'grid-body',

    layout: 'fit',
    /**
     * @property {Boolean} hasView
     * True to indicate that a view has been injected into the panel.
     */
    hasView: false,

    // each panel should dictate what viewType and selType to use
    /**
     * @cfg {String} viewType
     * An xtype of view to use. This is automatically set to 'gridview' by {@link Ext.grid.Panel Grid}
     * and to 'treeview' by {@link Ext.tree.Panel Tree}.
     * @protected
     */
    viewType: null,

    /**
     * @cfg {Object} viewConfig
     * A config object that will be applied to the grid's UI view. Any of the config options available for
     * {@link Ext.view.Table} can be specified here. This option is ignored if {@link #view} is specified.
     */

    /**
     * @cfg {Ext.view.Table} view
     * The {@link Ext.view.Table} used by the grid. Use {@link #viewConfig} to just supply some config options to
     * view (instead of creating an entire View instance).
     */

    /**
     * @cfg {String} selType
     * An xtype of selection model to use. Defaults to 'rowmodel'. This is used to create selection model if just
     * a config object or nothing at all given in {@link #selModel} config.
     */
    selType: 'rowmodel',

    /**
     * @cfg {Ext.selection.Model/Object} selModel
     * A {@link Ext.selection.Model selection model} instance or config object.  In latter case the {@link #selType}
     * config option determines to which type of selection model this config is applied.
     */

    /**
     * @cfg {Boolean} [multiSelect=false]
     * True to enable 'MULTI' selection mode on selection model.
     * @deprecated 4.1.1 Use {@link Ext.selection.Model#mode} 'MULTI' instead.
     */

    /**
     * @cfg {Boolean} [simpleSelect=false]
     * True to enable 'SIMPLE' selection mode on selection model.
     * @deprecated 4.1.1 Use {@link Ext.selection.Model#mode} 'SIMPLE' instead.
     */

    /**
     * @cfg {Ext.data.Store} store (required)
     * The {@link Ext.data.Store Store} the grid should use as its data source.
     */

    /**
     * @cfg {String/Boolean} scroll
     * Scrollers configuration. Valid values are 'both', 'horizontal' or 'vertical'.
     * True implies 'both'. False implies 'none'.
     */
    scroll: true,

    /**
     * @cfg {Ext.grid.column.Column[]/Object} columns
     * An array of {@link Ext.grid.column.Column column} definition objects which define all columns that appear in this
     * grid. Each column definition provides the header text for the column, and a definition of where the data for that
     * column comes from.
     *
     * This can also be a configuration object for a {Ext.grid.header.Container HeaderContainer} which may override
     * certain default configurations if necessary. For example, the special layout may be overridden to use a simpler
     * layout, or one can set default values shared by all columns:
     * 
     *     columns: {
     *         items: [
     *             {
     *                 text: "Column A"
     *                 dataIndex: "field_A"
     *             },{
     *                 text: "Column B",
     *                 dataIndex: "field_B"
     *             }, 
     *             ...
     *         ],
     *         defaults: {
     *             flex: 1
     *         }
     *     }
     */

    /**
     * @cfg {Boolean} forceFit
     * True to force the columns to fit into the available width. Headers are first sized according to configuration,
     * whether that be a specific width, or flex. Then they are all proportionally changed in width so that the entire
     * content width is used. For more accurate control, it is more optimal to specify a flex setting on the columns
     * that are to be stretched & explicit widths on columns that are not.
     */

    /**
     * @cfg {Ext.grid.feature.Feature[]/Object[]/Ext.enums.Feature[]} features
     * An array of grid Features to be added to this grid. Can also be just a single feature instead of array.
     *
     * Features config behaves much like {@link #plugins}.
     * A feature can be added by either directly referencing the instance:
     *
     *     features: [Ext.create('Ext.grid.feature.GroupingSummary', {groupHeaderTpl: 'Subject: {name}'})],
     *
     * By using config object with ftype:
     *
     *     features: [{ftype: 'groupingsummary', groupHeaderTpl: 'Subject: {name}'}],
     *
     * Or with just a ftype:
     *
     *     features: ['grouping', 'groupingsummary'],
     *
     * See {@link Ext.enums.Feature} for list of all ftypes.
     */

    /**
     * @cfg {Boolean} [hideHeaders=false]
     * True to hide column headers.
     */

    /**
     * @cfg {Boolean} deferRowRender
     * Defaults to true to enable deferred row rendering.
     *
     * This allows the View to execute a refresh quickly, with the expensive update of the row structure deferred so
     * that layouts with GridPanels appear, and lay out more quickly.
     */

    /**
     * @cfg {Object} verticalScroller
     * A config object to be used when configuring the {@link Ext.grid.plugin.BufferedRenderer scroll monitor} to control
     * refreshing of data in an "infinite grid".
     * 
     * Configurations of this object allow fine tuning of data caching which can improve performance and usability
     * of the infinite grid.
     */

    deferRowRender: true,
     
    /**
     * @cfg {Boolean} sortableColumns
     * False to disable column sorting via clicking the header and via the Sorting menu items.
     */
    sortableColumns: true,

    /**
     * @cfg {Boolean} [enableLocking=false]
     * Configure as `true` to enable locking support for this grid. Alternatively, locking will also be automatically
     * enabled if any of the columns in the {@link #columns columns} configuration contain a {@link Ext.grid.column.Column#locked locked} config option.
     * 
     * A locking grid is processed in a special way. The configuration options are cloned and *two* grids are created to be the locked (left) side
     * and the normal (right) side. This Panel becomes merely a {@link Ext.container.Container container} which arranges both in an {@link Ext.layout.container.HBox HBox} layout.
     * 
     * {@link #plugins Plugins} may be targeted at either locked, or unlocked grid, or, both, in which case the plugin is cloned and used on both sides.
     * 
     * Plugins may also be targeted at the containing locking Panel.
     * 
     * This is configured by specifying a `lockableScope` property in your plugin which may have the following values:
     * 
     *  * `"both"` (the default) - The plugin is added to both grids
     *  * `"top"` - The plugin is added to the containing Panel
     *  * `"locked"` - The plugin is added to the locked (left) grid
     *  * `"normal"` - The plugin is added to the normal (right) grid
     *
     * If `both` is specified, then each copy of the plugin gains a property `lockingPartner` which references its sibling on the other side so that they
     * can synchronize operations is necessary.
     * 
     * {@link #features Features} may also be configured with `lockableScope` and may target the locked grid, the normal grid or both grids. Features
     * also get a `lockingPartner` reference injected.
     */
    enableLocking: false,

    // private property used to determine where to go down to find views
    // this is here to support locking.
    scrollerOwner: true,

    /**
     * @cfg {Boolean} [enableColumnMove=true]
     * False to disable column dragging within this grid.
     */
    enableColumnMove: true,
    
    /**
     * @cfg {Boolean} [sealedColumns=false]
     * True to constrain column dragging so that a column cannot be dragged in or out of it's
     * current group. Only relevant while {@link #enableColumnMove} is enabled.
     */
    sealedColumns: false,

    /**
     * @cfg {Boolean} [enableColumnResize=true]
     * False to disable column resizing within this grid.
     */
    enableColumnResize: true,

    /**
     * @cfg {Boolean} [enableColumnHide=true]
     * False to disable column hiding within this grid.
     */

    /**
     * @cfg {Boolean} columnLines Adds column line styling
     */

    /**
     * @cfg {Boolean} [rowLines=true] Adds row line styling
     */
    rowLines: true,

    /**
     * @cfg {Boolean} [disableSelection=false]
     * True to disable selection model.
     */

    /**
     * @cfg {String} emptyText Default text (html tags are accepted) to display in the Panel body when the Store
     * is empty. When specified, and the Store is empty, the text will be rendered inside a DIV with the CSS class "x-grid-empty".
     */
    
    /**
     * @cfg {Boolean} [allowDeselect=false]
     * True to allow deselecting a record. This config is forwarded to {@link Ext.selection.Model#allowDeselect}.
     */

    /**
     * @property {Boolean} optimizedColumnMove
     * If you are writing a grid plugin or a {Ext.grid.feature.Feature Feature} which creates a column-based structure which
     * needs a view refresh when columns are moved, then set this property in the grid.
     *
     * An example is the built in {@link Ext.grid.feature.AbstractSummary Summary} Feature. This creates summary rows, and the
     * summary columns must be in the same order as the data columns. This plugin sets the `optimizedColumnMove` to `false.
     */
    
    colLinesCls: Ext.baseCSSPrefix + 'grid-with-col-lines',
    rowLinesCls: Ext.baseCSSPrefix + 'grid-with-row-lines',
    noRowLinesCls: Ext.baseCSSPrefix + 'grid-no-row-lines',
    hiddenHeaderCtCls: Ext.baseCSSPrefix + 'grid-header-ct-hidden',
    hiddenHeaderCls: Ext.baseCSSPrefix + 'grid-header-hidden',
    resizeMarkerCls: Ext.baseCSSPrefix + 'grid-resize-marker',
    emptyCls: Ext.baseCSSPrefix + 'grid-empty',

    initComponent: function() {
        //<debug>
        if (!this.viewType) {
            Ext.Error.raise("You must specify a viewType config.");
        }
        if (this.headers) {
            Ext.Error.raise("The headers config is not supported. Please specify columns instead.");
        }
        //</debug>

        var me          = this,
            headerCtCfg = me.columns || me.colModel,
            view,
            i, len,
            // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
            store       = me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store'),
            columns;

        if (me.columnLines) {
            me.addCls(me.colLinesCls);
        }

        me.addCls(me.rowLines ? me.rowLinesCls : me.noRowLinesCls);

        //<debug>
        if (!headerCtCfg) {
            Ext.Error.raise("A column configuration must be specified");
        }
        //</debug>

        // The columns/colModel config may be either a fully instantiated HeaderContainer, or an array of Column definitions, or a config object of a HeaderContainer
        // Either way, we extract a columns property referencing an array of Column definitions.
        if (headerCtCfg instanceof Ext.grid.header.Container) {
            headerCtCfg.isRootHeader = true;
            me.headerCt = headerCtCfg;
        } else {

            // If any of the Column objects contain a locked property, and are not processed, this is a lockable TablePanel, a
            // special view will be injected by the Ext.grid.locking.Lockable mixin, so no processing of .
            if (me.enableLocking || me.hasLockedColumns(headerCtCfg)) {
                me.self.mixin('lockable', Ext.grid.locking.Lockable);
                me.injectLockable();
            }
            // Not lockable - create the HeaderContainer
            else {
                if (Ext.isArray(headerCtCfg)) {
                    headerCtCfg = {
                        items: headerCtCfg
                    };
                }
                Ext.apply(headerCtCfg, {
                    grid: me,
                    forceFit: me.forceFit,
                    sortable: me.sortableColumns,
                    enableColumnMove: me.enableColumnMove,
                    enableColumnResize: me.enableColumnResize,
                    sealed: me.sealedColumns,
                    isRootHeader: true
                });

                if (Ext.isDefined(me.enableColumnHide)) {
                    headerCtCfg.enableColumnHide = me.enableColumnHide;
                }

                // Create our HeaderCOntainer from the generated configuration
                if (!me.headerCt) {
                    me.headerCt = new Ext.grid.header.Container(headerCtCfg);
                }
            }
        }

        // Maintain backward compatibiliy by providing the initial column set as a property.
        me.columns = me.headerCt.getGridColumns();

        me.scrollTask = new Ext.util.DelayedTask(me.syncHorizontalScroll, me);

        me.addEvents(
            // documented on GridPanel
            'reconfigure',
            /**
             * @event viewready
             * Fires when the grid view is available (use this for selecting a default row).
             * @param {Ext.panel.Table} this
             */
            'viewready'
        );

        me.bodyCls = me.bodyCls || '';
        me.bodyCls += (' ' + me.extraBodyCls);
        
        me.cls = me.cls || '';
        me.cls += (' ' + me.extraBaseCls);

        // autoScroll is not a valid configuration
        delete me.autoScroll;

        // If this TablePanel is lockable (Either configured lockable, or any of the defined columns has a 'locked' property)
        // then a special lockable view containing 2 side-by-side grids will have been injected so we do not need to set up any UI.
        if (!me.hasView) {

            // Extract the array of leaf Column objects
            columns = me.headerCt.getGridColumns();

            // If the Store is paging blocks of the dataset in, then it can only be sorted remotely.
            if (store.buffered && !store.remoteSort) {
                for (i = 0, len = columns.length; i < len; i++) {
                    columns[i].sortable = false;
                }
            }

            if (me.hideHeaders) {
                me.headerCt.height = 0;
                // don't se the hidden property, we still need these to layout
                me.headerCt.hiddenHeaders = true;
                me.headerCt.addCls(me.hiddenHeaderCtCls);
                me.addCls(me.hiddenHeaderCls);
                // IE Quirks Mode fix
                // If hidden configuration option was used, several layout calculations will be bypassed.
                if (Ext.isIEQuirks) {
                    me.headerCt.style = {
                        display: 'none'
                    };
                }
            }

            me.relayHeaderCtEvents(me.headerCt);
            me.features = me.features || [];
            if (!Ext.isArray(me.features)) {
                me.features = [me.features];
            }
            me.dockedItems = [].concat(me.dockedItems || []);
            me.dockedItems.unshift(me.headerCt);
            me.viewConfig = me.viewConfig || {};

            // AbstractDataView will look up a Store configured as an object
            // getView converts viewConfig into a View instance
            view = me.getView();

            me.items = [view];
            me.hasView = true;

            // Add a listener to synchronize the horizontal scroll position of the headers
            // with the table view's element... Unless we are not showing headers!
            if (!me.hideHeaders) {
                view.on({
                    scroll: {
                        fn: me.onHorizontalScroll,
                        element: 'el',
                        scope: me
                    }
                });
            }

            // Attach this Panel to the Store
            me.bindStore(store, true);

            me.mon(view, {
                viewready: me.onViewReady,
                refresh: me.onRestoreHorzScroll,
                scope: me
            });
        }

        // Relay events from the View whether it be a LockingView, or a regular GridView
        me.relayEvents(me.view, [
            /**
             * @event beforeitemmousedown
             * @inheritdoc Ext.view.View#beforeitemmousedown
             */
            'beforeitemmousedown',
            /**
             * @event beforeitemmouseup
             * @inheritdoc Ext.view.View#beforeitemmouseup
             */
            'beforeitemmouseup',
            /**
             * @event beforeitemmouseenter
             * @inheritdoc Ext.view.View#beforeitemmouseenter
             */
            'beforeitemmouseenter',
            /**
             * @event beforeitemmouseleave
             * @inheritdoc Ext.view.View#beforeitemmouseleave
             */
            'beforeitemmouseleave',
            /**
             * @event beforeitemclick
             * @inheritdoc Ext.view.View#beforeitemclick
             */
            'beforeitemclick',
            /**
             * @event beforeitemdblclick
             * @inheritdoc Ext.view.View#beforeitemdblclick
             */
            'beforeitemdblclick',
            /**
             * @event beforeitemcontextmenu
             * @inheritdoc Ext.view.View#beforeitemcontextmenu
             */
            'beforeitemcontextmenu',
            /**
             * @event itemmousedown
             * @inheritdoc Ext.view.View#itemmousedown
             */
            'itemmousedown',
            /**
             * @event itemmouseup
             * @inheritdoc Ext.view.View#itemmouseup
             */
            'itemmouseup',
            /**
             * @event itemmouseenter
             * @inheritdoc Ext.view.View#itemmouseenter
             */
            'itemmouseenter',
            /**
             * @event itemmouseleave
             * @inheritdoc Ext.view.View#itemmouseleave
             */
            'itemmouseleave',
            /**
             * @event itemclick
             * @inheritdoc Ext.view.View#itemclick
             */
            'itemclick',
            /**
             * @event itemdblclick
             * @inheritdoc Ext.view.View#itemdblclick
             */
            'itemdblclick',
            /**
             * @event itemcontextmenu
             * @inheritdoc Ext.view.View#itemcontextmenu
             */
            'itemcontextmenu',
            /**
             * @event beforecellclick
             * @inheritdoc Ext.view.Table#beforecellclick
             */
            'beforecellclick',
            /**
             * @event cellclick
             * @inheritdoc Ext.view.Table#cellclick
             */
            'cellclick',
            /**
             * @event beforecelldblclick
             * @inheritdoc Ext.view.Table#beforecelldblclick
             */
            'beforecelldblclick',
            /**
             * @event celldblclick
             * @inheritdoc Ext.view.Table#celldblclick
             */
            'celldblclick',
            /**
             * @event beforecellcontextmenu
             * @inheritdoc Ext.view.Table#beforecellcontextmenu
             */
            'beforecellcontextmenu',
            /**
             * @event cellcontextmenu
             * @inheritdoc Ext.view.Table#cellcontextmenu
             */
            'cellcontextmenu',
            /**
             * @event beforecellmousedown
             * @inheritdoc Ext.view.Table#beforecellmousedown
             */
            'beforecellmousedown',
            /**
             * @event cellmousedown
             * @inheritdoc Ext.view.Table#cellmousedown
             */
            'cellmousedown',
            /**
             * @event beforecellmouseup
             * @inheritdoc Ext.view.Table#beforecellmouseup
             */
            'beforecellmouseup',
            /**
             * @event cellmouseup
             * @inheritdoc Ext.view.Table#cellmouseup
             */
            'cellmouseup',
            /**
             * @event beforecellkeydown
             * @inheritdoc Ext.view.Table#beforecellkeydown
             */
            'beforecellkeydown',
            /**
             * @event cellkeydown
             * @inheritdoc Ext.view.Table#cellkeydown
             */
            'cellkeydown',
            /**
             * @event beforecontainermousedown
             * @inheritdoc Ext.view.View#beforecontainermousedown
             */
            'beforecontainermousedown',
            /**
             * @event beforecontainermouseup
             * @inheritdoc Ext.view.View#beforecontainermouseup
             */
            'beforecontainermouseup',
            /**
             * @event beforecontainermouseover
             * @inheritdoc Ext.view.View#beforecontainermouseover
             */
            'beforecontainermouseover',
            /**
             * @event beforecontainermouseout
             * @inheritdoc Ext.view.View#beforecontainermouseout
             */
            'beforecontainermouseout',
            /**
             * @event beforecontainerclick
             * @inheritdoc Ext.view.View#beforecontainerclick
             */
            'beforecontainerclick',
            /**
             * @event beforecontainerdblclick
             * @inheritdoc Ext.view.View#beforecontainerdblclick
             */
            'beforecontainerdblclick',
            /**
             * @event beforecontainercontextmenu
             * @inheritdoc Ext.view.View#beforecontainercontextmenu
             */
            'beforecontainercontextmenu',
            /**
             * @event containermouseup
             * @inheritdoc Ext.view.View#containermouseup
             */
            'containermouseup',
            /**
             * @event containermouseover
             * @inheritdoc Ext.view.View#containermouseover
             */
            'containermouseover',
            /**
             * @event containermouseout
             * @inheritdoc Ext.view.View#containermouseout
             */
            'containermouseout',
            /**
             * @event containerclick
             * @inheritdoc Ext.view.View#containerclick
             */
            'containerclick',
            /**
             * @event containerdblclick
             * @inheritdoc Ext.view.View#containerdblclick
             */
            'containerdblclick',
            /**
             * @event containercontextmenu
             * @inheritdoc Ext.view.View#containercontextmenu
             */
            'containercontextmenu',
            /**
             * @event selectionchange
             * @inheritdoc Ext.selection.Model#selectionchange
             */
            'selectionchange',
            /**
             * @event beforeselect
             * @inheritdoc Ext.selection.RowModel#beforeselect
             */
            'beforeselect',
            /**
             * @event select
             * @inheritdoc Ext.selection.RowModel#select
             */
            'select',
            /**
             * @event beforedeselect
             * @inheritdoc Ext.selection.RowModel#beforedeselect
             */
            'beforedeselect',
            /**
             * @event deselect
             * @inheritdoc Ext.selection.RowModel#deselect
             */
            'deselect'
        ]);

        me.callParent(arguments);
        me.addStateEvents(['columnresize', 'columnmove', 'columnhide', 'columnshow', 'sortchange', 'filterchange']);

        // If lockable, the headerCt is just a collection of Columns, not a Container
        if (!me.lockable && me.headerCt) {
            me.headerCt.on('afterlayout', me.onRestoreHorzScroll, me);
        }
    },

    // Private. Determine if there are any columns with a locked configuration option
    hasLockedColumns: function(columns) {
        var i,
            len,
            column;

        // In case they specified a config object with items...
        if (Ext.isObject(columns)) {
            columns = columns.items;
        }
        for (i = 0, len = columns.length; i < len; i++) {
            column = columns[i];
            if (!column.processed && column.locked) {
                return true;
            }
        }
    },

    relayHeaderCtEvents: function (headerCt) {
        this.relayEvents(headerCt, [
            /**
             * @event columnresize
             * @inheritdoc Ext.grid.header.Container#columnresize
             */
            'columnresize',
            /**
             * @event columnmove
             * @inheritdoc Ext.grid.header.Container#columnmove
             */
            'columnmove',
            /**
             * @event columnhide
             * @inheritdoc Ext.grid.header.Container#columnhide
             */
            'columnhide',
            /**
             * @event columnshow
             * @inheritdoc Ext.grid.header.Container#columnshow
             */
            'columnshow',
            /**
             * @event columnschanged
             * @inheritdoc Ext.grid.header.Container#columnschanged
             */
            'columnschanged',
            /**
             * @event sortchange
             * @inheritdoc Ext.grid.header.Container#sortchange
             */
            'sortchange',
            /**
             * @event headerclick
             * @inheritdoc Ext.grid.header.Container#headerclick
             */
            'headerclick',
            /**
             * @event headercontextmenu
             * @inheritdoc Ext.grid.header.Container#headercontextmenu
             */
            'headercontextmenu',
            /**
             * @event headertriggerclick
             * @inheritdoc Ext.grid.header.Container#headertriggerclick
             */
            'headertriggerclick'
        ]);
    },

    getState: function(){
        var me = this,
            state = me.callParent(),
            storeState = me.store.getState();

        state = me.addPropertyToState(state, 'columns', me.headerCt.getColumnsState());

        if (storeState) {
            state.storeState = storeState;
        }
        return state;
    },

    applyState: function(state) {
        var me = this,
            sorter = state.sort,
            storeState = state.storeState,
            store = me.store,
            columns = state.columns;

        delete state.columns;

        // Ensure superclass has applied *its* state.
        // AbstractComponent saves dimensions (and anchor/flex) plus collapsed state.
        me.callParent(arguments);

        if (columns) {
            me.headerCt.applyColumnsState(columns);
        }

        // Old stored sort state. Deprecated and will die out.
        if (sorter) {
            if (store.remoteSort) {
                // Pass false to prevent a sort from occurring
                store.sort({
                    property: sorter.property,
                    direction: sorter.direction,
                    root: sorter.root
                }, null, false);
            } else {
                store.sort(sorter.property, sorter.direction);
            }
        }
        // New storeState which encapsulates groupers, sorters and filters
        else if (storeState) {
            store.applyState(storeState);
        }
    },

    /**
     * Returns the store associated with this Panel.
     * @return {Ext.data.Store} The store
     */
    getStore: function(){
        return this.store;
    },

    /**
     * Gets the view for this panel.
     * @return {Ext.view.Table}
     */
    getView: function() {
        var me = this,
            sm;

        if (!me.view) {
            sm = me.getSelectionModel();

            // TableView injects the view reference into this grid so that we have a reference as early as possible
            Ext.widget(Ext.apply({

                // Features need a reference to the grid, so configure a reference into the View
                grid: me,
                deferInitialRefresh: me.deferRowRender !== false,
                trackOver: me.trackMouseOver !== false,
                scroll: me.scroll,
                xtype: me.viewType,
                store: me.store,
                headerCt: me.headerCt,
                columnLines: me.columnLines,
                rowLines: me.rowLines,
                selModel: sm,
                features: me.features,
                panel: me,
                emptyText: me.emptyText || ''
            }, me.viewConfig));

            // Normalize the application of the markup wrapping the emptyText config.
            // `emptyText` can now be defined on the grid as well as on its viewConfig, and this led to the emptyText not
            // having the wrapping markup when it was defined in the viewConfig. It should be backwards compatible.
            // Note that in the unlikely event that emptyText is defined on both the grid config and the viewConfig that the viewConfig wins.
            if (me.view.emptyText) {
                me.view.emptyText = '<div class="' + me.emptyCls + '">' + me.view.emptyText + '</div>';
            }

            // TableView's custom component layout, Ext.view.TableLayout requires a reference to the headerCt because it depends on the headerCt doing its work.
            me.view.getComponentLayout().headerCt = me.headerCt;

            me.mon(me.view, {
                uievent: me.processEvent,
                scope: me
            });
            sm.view = me.view;
            me.headerCt.view = me.view;
        }
        return me.view;
    },

    /**
     * @private
     * autoScroll is never valid for all classes which extend TablePanel.
     */
    setAutoScroll: Ext.emptyFn,

    /**
     * @private
     * Processes UI events from the view. Propagates them to whatever internal Components need to process them.
     * @param {String} type Event type, eg 'click'
     * @param {Ext.view.Table} view TableView Component
     * @param {HTMLElement} cell Cell HtmlElement the event took place within
     * @param {Number} recordIndex Index of the associated Store Model (-1 if none)
     * @param {Number} cellIndex Cell index within the row
     * @param {Ext.EventObject} e Original event
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            header;

        if (cellIndex !== -1) {
            header = me.columnManager.getColumns()[cellIndex];
            return header.processEvent.apply(header, arguments);
        }
    },

    /**
     * This method is obsolete in 4.1. The closest equivalent in
     * 4.1 is {@link #doLayout}, but it is also possible that no
     * layout is needed.
     * @deprecated 4.1
     */
    determineScrollbars: function () {
        //<debug>
        Ext.log.warn('Obsolete');
        //</debug>
    },

    /**
     * This method is obsolete in 4.1. The closest equivalent in 4.1 is
     * {@link Ext.AbstractComponent#updateLayout}, but it is also possible that no layout
     * is needed.
     * @deprecated 4.1
     */
    invalidateScroller: function () {
        //<debug>
        Ext.log.warn('Obsolete');
        //</debug>
    },

    scrollByDeltaY: function(yDelta, animate) {
        this.getView().scrollBy(0, yDelta, animate);
    },

    scrollByDeltaX: function(xDelta, animate) {
        this.getView().scrollBy(xDelta, 0, animate);
    },

    afterCollapse: function() {
        var me = this;
        me.saveScrollPos();
        me.saveScrollPos();
        me.callParent(arguments);
    },

    afterExpand: function() {
        var me = this;
        me.callParent(arguments);
        me.restoreScrollPos();
        me.restoreScrollPos();
    },

    saveScrollPos: Ext.emptyFn,

    restoreScrollPos: Ext.emptyFn,
    
    onHeaderResize: function(){
        this.delayScroll();
    },

    // Update the view when a header moves
    onHeaderMove: function(headerCt, header, colsToMove, fromIdx, toIdx) {
        var me = this;

        // If there are Features or Plugins which create DOM which must match column order, they set the optimizedColumnMove flag to false.
        // In this case we must refresh the view on column move.
        if (me.optimizedColumnMove === false) {
            me.view.refresh();
        }

        // Simplest case for default DOM structure is just to swap the columns round in the view.
        else {
            me.view.moveColumn(fromIdx, toIdx, colsToMove);
        }
        me.delayScroll();
    },

    // Section onHeaderHide is invoked after view.
    onHeaderHide: function(headerCt, header) {
        this.view.refresh();
        this.delayScroll();
    },

    onHeaderShow: function(headerCt, header) {
        this.view.refresh();
        this.delayScroll();
    },

    delayScroll: function(){
        var target = this.getScrollTarget().el;
        if (target) {
            this.scrollTask.delay(10, null, null, [target.dom.scrollLeft]);
        }
    },

    /**
     * @private
     * Fires the TablePanel's viewready event when the view declares that its internal DOM is ready
     */
    onViewReady: function() {
         this.fireEvent('viewready', this);   
    },

    /**
     * @private
     * Tracks when things happen to the view and preserves the horizontal scroll position.
     */
    onRestoreHorzScroll: function() {
        var left = this.scrollLeftPos;
        if (left) {
            // We need to restore the body scroll position here
            this.syncHorizontalScroll(left, true);
        }
    },

    getScrollerOwner: function() {
        var rootCmp = this;
        if (!this.scrollerOwner) {
            rootCmp = this.up('[scrollerOwner]');
        }
        return rootCmp;
    },

    /**
     * Gets left hand side marker for header resizing.
     * @private
     */
    getLhsMarker: function() {
        var me = this;
        return me.lhsMarker || (me.lhsMarker = Ext.DomHelper.append(me.el, {
            cls: me.resizeMarkerCls
        }, true));
    },

    /**
     * Gets right hand side marker for header resizing.
     * @private
     */
    getRhsMarker: function() {
        var me = this;

        return me.rhsMarker || (me.rhsMarker = Ext.DomHelper.append(me.el, {
            cls: me.resizeMarkerCls
        }, true));
    },

    /**
     * Returns the selection model being used and creates it via the configuration if it has not been created already.
     * @return {Ext.selection.Model} selModel
     */
    getSelectionModel: function(){
        var me = this,
            selModel = me.selModel,
            applyMode, mode, type;
        
        if (!selModel) {
            selModel = {};
            // no config, set our own mode
            applyMode = true;
        }

        if (!selModel.events) {
            // only config provided, set our mode if one doesn't exist on the config
            type = selModel.selType || me.selType;
            applyMode = !selModel.mode;
            selModel = me.selModel = Ext.create('selection.' + type, selModel);
        }

        if (me.simpleSelect) {
            mode = 'SIMPLE';
        } else if (me.multiSelect) {
            mode = 'MULTI';
        }

        Ext.applyIf(selModel, {
            allowDeselect: me.allowDeselect
        });
        
        if (mode && applyMode) {
            selModel.setSelectionMode(mode);
        }

        if (!selModel.hasRelaySetup) {
            me.relayEvents(selModel, [
                'selectionchange', 'beforeselect', 'beforedeselect', 'select', 'deselect'
            ]);
            selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (me.disableSelection) {
            selModel.locked = true;
        }
        return selModel;
    },
    
    getScrollTarget: function(){
        var owner = this.getScrollerOwner(),
            items = owner.query('tableview');
            
        return items[1] || items[0];
    },

    onHorizontalScroll: function(event, target) {
        this.syncHorizontalScroll(target.scrollLeft);
    },
    
    syncHorizontalScroll: function(left, setBody) {
        var me = this,
            scrollTarget;
            
        setBody = setBody === true;
        // Only set the horizontal scroll if we've changed position,
        // so that we don't set this on vertical scrolls
        if (me.rendered && (setBody || left !== me.scrollLeftPos)) {
            // Only set the body position if we're reacting to a refresh, otherwise
            // we just need to set the header.
            if (setBody) {   
                scrollTarget = me.getScrollTarget();
                scrollTarget.el.dom.scrollLeft = left;
            }
            me.headerCt.el.dom.scrollLeft = left;
            me.scrollLeftPos = left;
        }
    },

    // template method meant to be overriden
    onStoreLoad: Ext.emptyFn,

    getEditorParent: function() {
        return this.body;
    },

    bindStore: function(store, initial) {
        var me = this,
            view = me.getView(),
            bufferedStore = store && store.buffered,
            bufferedRenderer;

        // Bind to store immediately because subsequent processing looks for grid's store property
        me.store = store;

        // If the Store is buffered, create a BufferedRenderer to monitor the View's scroll progress
        // and scroll rows on/off when it detects we are nearing an edge.
        // MUST be done before store is bound to the view so that the BufferedRenderer may inject its getViewRange implementation
        // before the view tries to refresh.
        bufferedRenderer = me.findPlugin('bufferedrenderer');
        if (bufferedRenderer) {
            me.verticalScroller = bufferedRenderer;
            // If we're in a reconfigure rebind the BufferedRenderer
            if (bufferedRenderer.store) {
                bufferedRenderer.bindStore(store);
            }
        } else if (bufferedStore) {
            me.verticalScroller = bufferedRenderer = me.addPlugin(Ext.apply({
                ptype: 'bufferedrenderer'
            }, me.initialConfig.verticalScroller));
        }

        if (view.store !== store) {
            if (initial) {
                // The initially created View will already be bound to the configured Store
                view.bindStore(store, false, 'dataSource');
            } else {
                // Otherwise, we're coming from a reconfigure, so we need to set the actual
                // store property on the view. It will set the data source
                view.bindStore(store, false);
            }
        }

        me.mon(store, {
            load: me.onStoreLoad,
            scope: me
        });
        me.storeRelayers = me.relayEvents(store, [
            /**
             * @event filterchange
             * @inheritdoc Ext.data.Store#filterchange
             */
            'filterchange'
        ]);

        // If buffered rendering is being used, scroll position must be preserved across refreshes
        if (bufferedRenderer) {
            me.invalidateScrollerOnRefresh = false;
        }

        if (me.invalidateScrollerOnRefresh !== undefined) {
            view.preserveScrollOnRefresh = !me.invalidateScrollerOnRefresh;
        }
    },

    unbindStore: function() {
        var me = this,
            store = me.store;

        if (store) {
            me.store = null;
            me.mun(store, {
                load: me.onStoreLoad,
                scope: me
            });
            Ext.destroy(me.storeRelayers);
        }
    },

    // documented on GridPanel
    reconfigure: function(store, columns) {
        var me = this,
            view = me.getView(),
            originalDeferinitialRefresh,
            oldStore = me.store,
            headerCt = me.headerCt,
            oldColumns = headerCt ? headerCt.items.getRange() : me.columns;

        // Make copy in case the beforereconfigure listener mutates it.
        if (columns) {
            columns = Ext.Array.slice(columns);
        }

        me.fireEvent('beforereconfigure', me, store, columns, oldStore, oldColumns);
        if (me.lockable) {
            me.reconfigureLockable(store, columns);
        } else {
            Ext.suspendLayouts();
            if (columns) {
                // new columns, delete scroll pos
                delete me.scrollLeftPos;
                headerCt.removeAll();
                headerCt.add(columns);
            }
            // The following test compares the result of an assignment of the store var with the oldStore var
            // This saves a large amount of code.
            if (store && (store = Ext.StoreManager.lookup(store)) !== oldStore) {
                // Only unbind the store if a new one was passed
                if (me.store) {
                    me.unbindStore();
                }

                // On reconfigure, view refresh must be inline.
                originalDeferinitialRefresh = view.deferInitialRefresh;
                view.deferInitialRefresh = false;
                me.bindStore(store);
                view.deferInitialRefresh = originalDeferinitialRefresh;
            } else {
                me.getView().refresh();
            }
            headerCt.setSortState();
            Ext.resumeLayouts(true);
        }
        me.fireEvent('reconfigure', me, store, columns, oldStore, oldColumns);
    },
    
    beforeDestroy: function(){
        var task = this.scrollTask;
        if (task) {
            task.cancel();
            this.scrollTask = null;
        }
        this.callParent();
    },
    
    onDestroy: function(){
        if (this.lockable) {
            this.destroyLockable();
        }
        this.callParent();
        
    }
});
