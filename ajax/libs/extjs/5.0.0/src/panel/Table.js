/**
 * This class is the base class for both {@link Ext.tree.Panel TreePanel} and
 * {@link Ext.grid.Panel GridPanel}.
 *
 * TablePanel aggregates:
 *
 *  - a Selection Model
 *  - a View
 *  - a Store
 *  - Ext.grid.header.Container
 */
Ext.define('Ext.panel.Table', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.tablepanel',
    
    requires: [
        'Ext.layout.container.Fit'
    ],

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

    defaultBindProperty: 'store',

    layout: 'fit',

    /**
     * @cfg [autoLoad=false]
     * Use `true` to load the store as soon as this component is fully constructed. It is
     * best to initiate the store load this way to allow this component and potentially
     * its plugins (such as `{@link Ext.grid.filters.Filters}` to be ready to load.
     */
    autoLoad: false,

    /**
     * @cfg {Boolean} [variableRowHeight=false]
     * @deprecated 5.0.0 Use {@link Ext.grid.column.Column#variableRowHeight} instead.
     * Configure as `true` if the row heights are not all the same height as the first row.
     */
    variableRowHeight: false,

    /**
     * @cfg {Number}
     * This configures the zone which causes new rows to be appended to the view. As soon as the edge
     * of the rendered grid is this number of rows from the edge of the viewport, the view is moved.
     */
    numFromEdge: 2,

    /**
     * @cfg {Number}
     * TableViews are buffer rendered in 5.x which means that only the visible subset of data rows
     * are rendered into the DOM. These are removed and added as scrolling demands.
     *
     * This configures the number of extra rows to render on the trailing side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    trailingBufferZone: 10,

    /**
     * @cfg {Number}
     * TableViews are buffer rendered in 5.x which means that only the visible subset of data rows
     * are rendered into the DOM. These are removed and added as scrolling demands.
     *
     * This configures the number of extra rows to render on the leading side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    leadingBufferZone: 20,

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
     * @cfg {String} [selType]
     * An xtype of selection model to use. This is used to create selection model if just
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
     * @cfg {Boolean} [reserveScrollbar=false]
     * Set this to true to **always** leave a scrollbar sized space at the end of the grid content when
     * fitting content into the width of the grid.
     *
     * If the grid's record count fluctuates enough to hide and show the scrollbar regularly, this setting
     * avoids the multiple layouts associated with switching from scrollbar present to scrollbar not present.
     */

    /**
     * @cfg {Ext.grid.column.Column[]/Object} columns (required)
     * An array of {@link Ext.grid.column.Column column} definition objects which define all columns that appear in this
     * grid. Each column definition provides the header text for the column, and a definition of where the data for that
     * column comes from.
     *
     * This can also be a configuration object for a {@link Ext.grid.header.Container HeaderContainer} which may override
     * certain default configurations if necessary. For example, the special layout may be overridden to use a simpler
     * layout, or one can set default values shared by all columns:
     * 
     *     columns: {
     *         items: [
     *             {
     *                 text: "Column A",
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
     * @cfg {Boolean} [deferRowRender=false]
     * Configure as `true` to enable deferred row rendering.
     *
     * This allows the View to execute a refresh quickly, with the update of the row structure deferred so
     * that layouts with GridPanels appear, and lay out more quickly.
     */
    deferRowRender: false,
     
    /**
     * @cfg {Boolean} [sortableColumns=true]
     * False to disable column sorting via clicking the header and via the Sorting menu items.
     */
    sortableColumns: true,

    /**
     * @cfg {Boolean} [multiColumnSort=false]
     * Configure as `true` to have columns remember their sorted state after other columns have been clicked upon to sort.
     *
     * As subsequent columns are clicked upon, they become the new primary sort key.
     *
     * The maximum number of sorters allowed in a Store is configurable via its underlying data collection. See {@link Ext.util.Collection#multiSortLimit}
     */
    multiColumnSort: false,

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
     * @cfg {Boolean} [bufferedRenderer]
     * `false` to disable buffered rendering. See {@link #Ext.grid.plugin.BufferedRenderer}.
     */
    bufferedRenderer: true,

    /**
     * @property {Boolean} optimizedColumnMove
     * If you are writing a grid plugin or a {Ext.grid.feature.Feature Feature} which creates a column-based structure which
     * needs a view refresh when columns are moved, then set this property in the grid.
     *
     * An example is the built in {@link Ext.grid.feature.AbstractSummary Summary} Feature. This creates summary rows, and the
     * summary columns must be in the same order as the data columns. This plugin sets the `optimizedColumnMove` to `false.
     */

    /**
     * @property {Ext.view.Table} ownerGrid
     * A reference to the top-level owning grid component. This is `null` if this grid is
     * not part of a locked grid arrangement.
     * @readonly
     * @private
     * @since 5.0.0
     */
    ownerGrid: null,

    colLinesCls: Ext.baseCSSPrefix + 'grid-with-col-lines',
    rowLinesCls: Ext.baseCSSPrefix + 'grid-with-row-lines',
    noRowLinesCls: Ext.baseCSSPrefix + 'grid-no-row-lines',
    hiddenHeaderCtCls: Ext.baseCSSPrefix + 'grid-header-ct-hidden',
    hiddenHeaderCls: Ext.baseCSSPrefix + 'grid-header-hidden',
    resizeMarkerCls: Ext.baseCSSPrefix + 'grid-resize-marker',
    emptyCls: Ext.baseCSSPrefix + 'grid-empty',

    /**
     * @event viewready
     * Fires when the grid view is available (use this for selecting a default row).
     * @param {Ext.panel.Table} this
     */

    constructor: function () {
        var store;

        this.callParent(arguments);

        store = this.store;

        // Any further changes become stateful.
        store.trackStateChanges = true;

        if (this.autoLoad) {
            store.unblockLoad();
            store.load();
        }
    },

    initComponent: function() {
        //<debug>
        if (this.verticalScroller) {
            Ext.Error.raise("The verticalScroller config is not supported.");
        }
        if (!this.viewType) {
            Ext.Error.raise("You must specify a viewType config.");
        }
        if (this.headers) {
            Ext.Error.raise("The headers config is not supported. Please specify columns instead.");
        }
        //</debug>

        var me = this,
            headerCtCfg = me.columns || me.colModel || [],
            view,
            i, len,
            bufferedRenderer,
            // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
            store       = me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store'),
            columns;

        me.enableLocking = me.enableLocking || me.hasLockedColumns(headerCtCfg);

        // Block store loads during construction or initialization of plugins!
        if (me.autoLoad) {
            me.store.blockLoad();
        }

        // Construct the plugins now rather than in the constructor of AbstractComponent because the component may have a subclass
        // that has overridden initComponent and defined plugins in it. For plugins like RowExpander that rely upon a grid feature,
        // this is a problem because the view needs to know about all its features before it's constructed. Constructing the plugins
        // now ensures that plugins defined in the instance config or in initComponent are all constructed before the view.
        // See EXTJSIV-11927.
        //
        // Note that any components that do not inherit from this class will still have their plugins constructed in
        // AbstractComponent:initComponent.
        if (me.plugins) {
            me.plugins = me.constructPlugins();
        }

        // Add the row/column line classes to the body element so that the settings are not inherited by docked grids (https://sencha.jira.com/browse/EXTJSIV-9263).
        if (me.columnLines) {
            me.addBodyCls(me.colLinesCls);
        }

        me.addBodyCls(me.rowLines ? me.rowLinesCls : me.noRowLinesCls);
        me.addBodyCls(me.extraBodyCls);


        // If any of the Column objects contain a locked property, and are not processed, this is a lockable TablePanel, a
        // special view will be injected by the Ext.grid.locking.Lockable mixin, so no processing of .
        if (me.enableLocking) {
            me.self.mixin('lockable', Ext.grid.locking.Lockable);
            me.injectLockable();
        }
        // Not lockable - create the HeaderContainer
        else {
            // It's a fully instantiated HeaderContainer
            if (headerCtCfg.isRootHeader) {
                me.headerCt = headerCtCfg;

                me.headerCt.forceFit = !!me.forceFit;

                // If it's an instance then the column managers were already created and bound to the headerCt.
                me.columnManager = headerCtCfg.columnManager;
                me.visibleColumnManager = headerCtCfg.visibleColumnManager;
            }
            // It's an array of Column definitions, or a config object of a HeaderContainer
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
                    columnLines: me.columnLines,
                    sealed: me.sealedColumns
                });

                if (Ext.isDefined(me.enableColumnHide)) {
                    headerCtCfg.enableColumnHide = me.enableColumnHide;
                }
                me.headerCt = new Ext.grid.header.Container(headerCtCfg);
            }
        }

        // Maintain backward compatibiliy by providing the initial leaf column set as a property.
        me.columns = columns = me.headerCt.getGridColumns();

        me.scrollTask = new Ext.util.DelayedTask(me.syncHorizontalScroll, me);

        me.cls = (me.cls || '') + (' ' + me.extraBaseCls);

        // autoScroll is not a valid configuration
        delete me.autoScroll;

        bufferedRenderer = me.plugins && Ext.Array.findBy(me.plugins, function(p) {
            return p.isBufferedRenderer;
        });

        // If we find one in the plugins, just use that.
        if (bufferedRenderer) {
            me.bufferedRenderer = bufferedRenderer;
        }

        // If this TablePanel is lockable (Either configured lockable, or any of the defined columns has a 'locked' property)
        // then a special lockable view containing 2 side-by-side grids will have been injected so we do not need to set up any UI.
        if (!me.hasView) {

            // If the Store is paging blocks of the dataset in, then it can only be sorted remotely.
            if (store.isBufferedStore && !store.remoteSort) {
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
                    scroll: me.onHorizontalScroll,
                    scope: me,
                    onFrame: !!Ext.global.requestAnimationFrame
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
             * @event rowclick
             * @inheritdoc Ext.view.Table#rowclick
             */
            'rowclick',
            /**
             * @event rowdblclick
             * @inheritdoc Ext.view.Table#rowdblclick
             */
            'rowdblclick',
            /**
             * @event rowcontextmenu
             * @inheritdoc Ext.view.Table#rowcontextmenu
             */
            'rowcontextmenu',
            /**
             * @event rowmousedown
             * @inheritdoc Ext.view.Table#rowmousedown
             */
            'rowmousedown',
            /**
             * @event rowmouseup
             * @inheritdoc Ext.view.Table#rowmouseup
             */
            'rowmouseup',
            /**
             * @event rowkeydown
             * @inheritdoc Ext.view.Table#rowkeydown
             */
            'rowkeydown',
            /**
             * @event beforeitemkeydown
             * @inheritdoc Ext.view.Table#beforeitemkeydown
             */
            'beforeitemkeydown',
            /**
             * @event itemkeydown
             * @inheritdoc Ext.view.Table#itemkeydown
             */
            'itemkeydown',
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
             * @event beforecontainerkeydown
             * @inheritdoc Ext.view.View#beforecontainerkeydown
             */
            'beforecontainerkeydown',
            /**
             * @event containermouseup
             * @inheritdoc Ext.view.View#containermouseup
             */
            'containermouseup',
            /**
             * @event containermousedown
             * @inheritdoc Ext.view.View#containermousedown
             */
            'containermousedown',
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
             * @event containerkeydown
             * @inheritdoc Ext.view.View#containerkeydown
             */
            'containerkeydown',
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
        me.addStateEvents(['columnresize', 'columnmove', 'columnhide', 'columnshow', 'sortchange', 'filterchange', 'groupchange']);
    },

    // Private. Determine if there are any columns with a locked configuration option
    hasLockedColumns: function(columns) {
        var i,
            len,
            column;

        // Fully instantiated HeaderContainer
        if (columns.isRootHeader) {
            columns = columns.items.items;
        }
        // Config object with items
        else if (Ext.isObject(columns)) {
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

    applyState: function (state) {
        var me = this,
            sorter = state.sort,
            storeState = state.storeState,
            store = me.store,
            columns = state.columns;

        delete state.columns;

        // Ensure superclass has applied *its* state.
        // Component saves dimensions (and anchor/flex) plus collapsed state.
        me.callParent(arguments);

        if (columns) {
            me.headerCt.applyColumnsState(columns);
        }

        // Old stored sort state. Deprecated and will die out.
        if (sorter) {
            if (store.remoteSort) {
                // Pass false to prevent a sort from occurring.
                store.sort({
                    property: sorter.property,
                    direction: sorter.direction,
                    root: sorter.root
                }, null, false);
            } else {
                store.sort(sorter.property, sorter.direction);
            }
        }
        // New storeState which encapsulates groupers, sorters and filters.
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
            sm,
            viewConfig;

        if (!me.view) {
            sm = me.getSelectionModel();

            viewConfig = Ext.apply({
                // TableView injects the view reference into this grid so that we have a reference as early as possible
                // and Features need a reference to the grid.
                // For these reasons, we configure a reference to this grid into the View
                grid: me,
                ownerGrid: me.ownerGrid || me,
                deferInitialRefresh: me.deferRowRender,
                variableRowHeight: me.variableRowHeight,
                preserveScrollOnRefresh: true,
                trackOver: me.trackMouseOver !== false,
                throttledUpdate: me.throttledUpdate === true,
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
            }, me.viewConfig);

            // Reconcile conflicting scroll requests in the grid's scroll configuration and viewConfig's scroll configuration.
            // If the grid has scroll:'vertical', and the viewConfig has scroll"horizontal', the outcome must be scroll: 'both'
            if (me.scroll && me.viewConfig.scroll && me.scroll !== me.viewConfig.scroll) {
                viewConfig.scroll = 'both';
            }

            Ext.widget(viewConfig);

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

            // Plugins and features may need to access the view as soon as it is created.
            if (me.hasListeners.viewcreated) {
                me.fireEvent('viewcreated', me, me.view);
            }
        }
        return me.view;
    },
    
    getColumnManager: function(){
        return this.columnManager;
    },
    
    getVisibleColumnManager: function(){
        return this.visibleColumnManager;
    },
    
    getTopLevelColumnManager: function(){
        var ownerLock = this.ownerLockable;
        return ownerLock ? ownerLock.getColumnManager() : this.getColumnManager();    
    },
    
    getTopLevelVisibleColumnManager: function(){
        var ownerLock = this.ownerLockable;
        return ownerLock ? ownerLock.getVisibleColumnManager() : this.getVisibleColumnManager();    
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
     * @param {HTMLElement} cell Cell HTMLElement the event took place within
     * @param {Number} recordIndex Index of the associated Store Model (-1 if none)
     * @param {Number} cellIndex Cell index within the row
     * @param {Ext.event.Event} e Original event
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            header;

        if (cellIndex !== -1) {
            header = me.getColumnManager().getHeaderAtIndex(cellIndex);
            return header.processEvent.apply(header, arguments);
        }
    },

    scrollByDeltaY: function(yDelta, animate) {
        this.getView().scrollBy(0, yDelta, animate);
    },

    scrollByDeltaX: function(xDelta, animate) {
        this.getView().scrollBy(xDelta, 0, animate);
    },

    afterCollapse: function() {
        this.saveScrollPos();
        this.callParent(arguments);
    },

    afterExpand: function() {
        this.callParent(arguments);
        this.restoreScrollPos();
    },

    saveScrollPos: Ext.emptyFn,

    restoreScrollPos: Ext.emptyFn,

    onHeaderResize: function() {
        // Touch scroll manager needs to know about the new width
        if (this.view.scrollManager) {
            this.view.scrollManager.refresh();
        }
    },

    // Update the view when a header moves
    onHeaderMove: function(headerCt, header, colsToMove, fromIdx, toIdx) {
        var me = this;

        // If there are Features or Plugins which create DOM which must match column order, they set the optimizedColumnMove flag to false.
        // In this case we must refresh the view on column move.
        if (me.optimizedColumnMove === false) {
            me.view.refreshView();
        }

        // Simplest case for default DOM structure is just to swap the columns round in the view.
        else {
            me.view.moveColumn(fromIdx, toIdx, colsToMove);
        }
        me.delayScroll();
    },

    // Section onHeaderHide is invoked after view.
    onHeaderHide: function(headerCt, header) {
        if (this.view.refreshCounter) {
            this.view.refreshView();
        }
    },

    onHeaderShow: function(headerCt, header) {
        if (this.view.refreshCounter) {
            this.view.refreshView();
        }
    },

    // To be triggered on add/remove/move for a leaf header
    onHeadersChanged: function(headerCt, header) {
        var me = this;
        if (me.rendered && !me.reconfiguring) {
            me.view.refreshView();
            me.delayScroll();
        }
    },

    delayScroll: function(){
        var target = this.view;
        if (target) {
            // Do not cause a layout by reading scrollX now.
            // It must be read from the target when the task finally executes.
            this.scrollTask.delay(10, null, null, [target]);
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
        var me = this,
            x = me.scrollXPos;

        if (x) {
            // We need to restore the body scroll position here
            me.syncHorizontalScroll(me, true);
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
            role: 'presentation',
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
            role: 'presentation',
            cls: me.resizeMarkerCls
        }, true));
    },

    /**
     * Returns the grid's selection. See `{@link Ext.selection.Model#getSelection}`.
     * @inheritdoc Ext.selection.Model#getSelection
     */
    getSelection: function () {
        return this.getSelectionModel().getSelection();
    },

    /**
     * Sets the grid's selection. See `{@link Ext.selection.Model#select}`.
     * @inheritdoc Ext.selection.Model#select
     */
    setSelection: function (selection) {
        var selModel = this.getSelectionModel();
        selModel.select(selection);
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

    onHorizontalScroll: function(view) {
        this.syncHorizontalScroll(view);
    },

    syncHorizontalScroll: function(target, setBody) {
        var me = this,
            x = me.view.getScrollX(),
            scrollTarget;

        setBody = setBody === true;
        // Only set the horizontal scroll if we've changed position,
        // so that we don't set this on vertical scrolls
        if (me.rendered && (setBody || x !== me.scrollXPos)) {
            // Only set the body position if we're reacting to a refresh, otherwise
            // we just need to set the header.
            if (setBody) {   
                scrollTarget = me.getScrollTarget();
                scrollTarget.setScrollX(x);
            }
            me.headerCt.setScrollX(x);
            me.scrollXPos = x;
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
            bufferedRenderer = me.bufferedRenderer;

        // Bind to store immediately because subsequent processing looks for grid's store property
        me.store = store;

        // If we're in a reconfigure (we already have a BufferedRenderer which is bound to our old store),
        // rebind the BufferedRenderer
        if (bufferedRenderer) {
            if (bufferedRenderer.isBufferedRenderer) {
                if (bufferedRenderer.store) {
                    bufferedRenderer.bindStore(store);
                }
            } else if (me.bufferedRenderer) {
                // Create a BufferedRenderer as a plugin if we have not already configured with one.
                bufferedRenderer = {
                    xclass: 'Ext.grid.plugin.BufferedRenderer'
                };
                Ext.copyTo(bufferedRenderer, me, 'variableRowHeight,numFromEdge,trailingBufferZone,leadingBufferZone,scrollToLoadBuffer');
                me.bufferedRenderer = me.addPlugin(bufferedRenderer);
            }
        }

        if (view.store !== store) {
            // If coming from a reconfigure, we need to set the actual store property on the view. Setting the
            // store will then also set the dataSource.
            // 
            // Note that if it's a grid feature then this is sorted out in view.bindStore(), and it's own
            // implementation of .bindStore() will be called.
            view.bindStore(store, false);
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
            'filterchange',
            /**
             * @event groupchange
             * @inheritdoc Ext.data.Store#groupchange
             */
            'groupchange'
        ]);
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

    setColumns: function(columns) {
        // If being reconfigured from zero columns to zero columns, skip operation.
        // This can happen if columns are being set from a binding and the initial value
        // of the bound data in the ViewModel is []
        if (columns.length || this.getColumnManager().getColumns().length) {
            this.reconfigure(undefined, columns);
        }
    },

    setStore: function (store) {
        this.reconfigure(store);
    },

    // documented on GridPanel
    reconfigure: function(store, columns) {
        var me = this,
            oldStore = me.store,
            headerCt = me.headerCt,
            oldColumns = headerCt ? headerCt.items.getRange() : me.columns;

        // Allow optional store argument to be fully omitted, and the columns argument to be solo
        if (arguments.length === 1 && Ext.isArray(store)) {
            columns = store;
            store = null;
        }

        // Make copy in case the beforereconfigure listener mutates it.
        if (columns) {
            columns = Ext.Array.slice(columns);
        }

        me.reconfiguring = true;
        me.fireEvent('beforereconfigure', me, store, columns, oldStore, oldColumns);
        if (me.lockable) {
            me.reconfigureLockable(store, columns);
        } else {
            Ext.suspendLayouts();
            if (columns) {
                // new columns, delete scroll pos
                delete me.scrollXPos;
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

                me.bindStore(store);
            } else {
                me.getView().refreshView();
            }
            headerCt.setSortState();
            Ext.resumeLayouts(true);
        }
        me.fireEvent('reconfigure', me, store, columns, oldStore, oldColumns);
        delete me.reconfiguring;
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
        var me = this;
        if (me.lockable) {
            me.destroyLockable();
        }
        me.callParent();
        me.columns = me.storeRelayers = me.columnManager = me.visibleColumnManager = null;
    },
    
    destroy: function() {
        // Clear out references here because other things (plugins/features) may need to know about them during destruction
        var me = this;
        me.callParent();
        if (me.isDestroyed) {
            me.view = me.selModel = me.headerCt = null;
        }
    }
});
