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
 * @private
 *
 * Lockable is a private mixin which injects lockable behavior into any
 * TablePanel subclass such as GridPanel or TreePanel. TablePanel will
 * automatically inject the Ext.grid.locking.Lockable mixin in when one of the
 * these conditions are met:
 *
 *  - The TablePanel has the lockable configuration set to true
 *  - One of the columns in the TablePanel has locked set to true/false
 *
 * Each TablePanel subclass must register an alias. It should have an array
 * of configurations to copy to the 2 separate tablepanel's that will be generated
 * to note what configurations should be copied. These are named normalCfgCopy and
 * lockedCfgCopy respectively.
 *
 * Columns which are locked must specify a fixed width. They do NOT support a
 * flex width.
 *
 * Configurations which are specified in this class will be available on any grid or
 * tree which is using the lockable functionality.
 */
Ext.define('Ext.grid.locking.Lockable', {
    alternateClassName: 'Ext.grid.Lockable',

    requires: [
        'Ext.grid.locking.View',
        'Ext.grid.header.Container',
        'Ext.grid.locking.HeaderContainer',
        'Ext.view.Table'
    ],

    /**
     * @cfg {Boolean} syncRowHeight Synchronize rowHeight between the normal and
     * locked grid view. This is turned on by default. If your grid is guaranteed
     * to have rows of all the same height, you should set this to false to
     * optimize performance.
     */
    syncRowHeight: true,

    /**
     * @cfg {String} subGridXType The xtype of the subgrid to specify. If this is
     * not specified lockable will determine the subgrid xtype to create by the
     * following rule. Use the superclasses xtype if the superclass is NOT
     * tablepanel, otherwise use the xtype itself.
     */

    /**
     * @cfg {Object} lockedViewConfig A view configuration to be applied to the
     * locked side of the grid. Any conflicting configurations between lockedViewConfig
     * and viewConfig will be overwritten by the lockedViewConfig.
     */

    /**
     * @cfg {Object} normalViewConfig A view configuration to be applied to the
     * normal/unlocked side of the grid. Any conflicting configurations between normalViewConfig
     * and viewConfig will be overwritten by the normalViewConfig.
     */

    headerCounter: 0,

    /**
     * @cfg {Number} scrollDelta
     * Number of pixels to scroll when scrolling the locked section with mousewheel.
     */
    scrollDelta: 40,
    
    /**
     * @cfg {Object} lockedGridConfig
     * Any special configuration options for the locked part of the grid
     */
    
    /**
     * @cfg {Object} normalGridConfig
     * Any special configuration options for the normal part of the grid
     */
    
    lockedGridCls: Ext.baseCSSPrefix + 'grid-inner-locked',

    // i8n text
    //<locale>
    unlockText: 'Unlock',
    //</locale>
    //<locale>
    lockText: 'Lock',
    //</locale>

    // Required for the Lockable Mixin. These are the configurations which will be copied to the
    // normal and locked sub tablepanels
    bothCfgCopy: [
        'invalidateScrollerOnRefresh',
        'hideHeaders',
        'enableColumnHide',
        'enableColumnMove',
        'enableColumnResize',
        'sortableColumns',
        'columnLines',
        'rowLines'
    ],
    normalCfgCopy: [ 
        'verticalScroller', 
        'verticalScrollDock', 
        'verticalScrollerType', 
        'scroll'
    ],
    lockedCfgCopy: [],

    determineXTypeToCreate: function(lockedSide) {
        var me = this,
            typeToCreate,
            xtypes, xtypesLn, xtype, superxtype;

        if (me.subGridXType) {
            typeToCreate = me.subGridXType;
        } else {
            // Treeness only moves down into the locked side.
            // The normal side is always just a grid
            if (!lockedSide) {
                return 'gridpanel';
            }
            xtypes     = this.getXTypes().split('/');
            xtypesLn   = xtypes.length;
            xtype      = xtypes[xtypesLn - 1];
            superxtype = xtypes[xtypesLn - 2];

            if (superxtype !== 'tablepanel') {
                typeToCreate = superxtype;
            } else {
                typeToCreate = xtype;
            }
        }

        return typeToCreate;
    },

    // injectLockable will be invoked before initComponent's parent class implementation
    // is called, so throughout this method this. are configurations
    injectLockable: function() {
        // ensure lockable is set to true in the TablePanel
        this.lockable = true;
        // Instruct the TablePanel it already has a view and not to create one.
        // We are going to aggregate 2 copies of whatever TablePanel we are using
        this.hasView = true;

        var me = this,
            scrollbarHeight = Ext.getScrollbarSize().height,
            store = me.store = Ext.StoreManager.lookup(me.store),

            // share the selection model
            selModel = me.getSelectionModel(),

            // Hash of {lockedFeatures:[],normalFeatures:[]}
            allFeatures,

            // Hash of {topPlugins:[],lockedPlugins:[],normalPlugins:[]}
            allPlugins,

            lockedGrid,
            normalGrid,
            i,
            columns,
            lockedHeaderCt,
            normalHeaderCt,
            lockedView,
            normalView,
            listeners,
            bufferedRenderer = me.findPlugin('bufferedrenderer');

        allFeatures = me.constructLockableFeatures();

        // This is just a "shell" Panel which acts as a Container for the two grids and must not use the features
        if (me.features) {
            me.features = null;
        }

        // Distribute plugins to whichever Component needs them
        allPlugins = me.constructLockablePlugins();
        me.plugins = allPlugins.topPlugins;

        lockedGrid = Ext.apply({
            id: me.id + '-locked',
            isLocked: true,
            ownerLockable: me,
            xtype: me.determineXTypeToCreate(true),
            store: store,
            scrollerOwner: false,
            // Lockable does NOT support animations for Tree
            // Because the right side is just a grid, and the grid view doen't animate bulk insertions/removals
            animate: false,
            // If the OS does not show a space-taking scrollbar, the locked view can be overflow-y:auto
            scroll: scrollbarHeight ? false : 'vertical',
            selModel: selModel,
            border: false,
            cls: me.lockedGridCls,
            isLayoutRoot: function() {
                return false;
            },
            features: allFeatures.lockedFeatures,
            plugins: allPlugins.lockedPlugins
        }, me.lockedGridConfig);

        normalGrid = Ext.apply({
            id: me.id + '-normal',
            isLocked: false,
            ownerLockable: me,
            xtype: me.determineXTypeToCreate(),
            store: store,
            scrollerOwner: false,
            selModel: selModel,
            border: false,
            isLayoutRoot: function() {
                return false;
            },
            features: allFeatures.normalFeatures,
            plugins: allPlugins.normalPlugins
        }, me.normalGridConfig);

        me.addCls(Ext.baseCSSPrefix + 'grid-locked');

        // Copy appropriate configurations to the respective aggregated tablepanel instances.
        // Pass 4th param true to NOT exclude those settings on our prototype.
        // Delete them from the master tablepanel.
        Ext.copyTo(normalGrid, me, me.bothCfgCopy, true);
        Ext.copyTo(lockedGrid, me, me.bothCfgCopy, true);
        Ext.copyTo(normalGrid, me, me.normalCfgCopy, true);
        Ext.copyTo(lockedGrid, me, me.lockedCfgCopy, true);
        for (i = 0; i < me.normalCfgCopy.length; i++) {
            delete me[me.normalCfgCopy[i]];
        }
        for (i = 0; i < me.lockedCfgCopy.length; i++) {
            delete me[me.lockedCfgCopy[i]];
        }

        me.addEvents(
            /**
             * @event processcolumns
             * Fires when the configured (or **reconfigured**) column set is split into two depending on the {@link Ext.grid.column.Column#locked locked} flag.
             * @param {Ext.grid.column.Column[]} lockedColumns The locked columns.
             * @param {Ext.grid.column.Column[]} normalColumns The normal columns.
             */
            'processcolumns',

            /**
             * @event lockcolumn
             * Fires when a column is locked.
             * @param {Ext.grid.Panel} this The gridpanel.
             * @param {Ext.grid.column.Column} column The column being locked.
             */
            'lockcolumn',

            /**
             * @event unlockcolumn
             * Fires when a column is unlocked.
             * @param {Ext.grid.Panel} this The gridpanel.
             * @param {Ext.grid.column.Column} column The column being unlocked.
             */
            'unlockcolumn'
        );

        me.addStateEvents(['lockcolumn', 'unlockcolumn']);

        columns = me.processColumns(me.columns);

        // Locked grid has a right border. Locked grid must shrinkwrap columns with no horiontal scroll, so
        // we must increment by the border width: 1px. TODO: Use shrinkWrapDock on the locked grid when it works.
        lockedGrid.width = columns.lockedWidth + Ext.num(selModel.headerWidth, 0) + (columns.locked.items.length ? 1 : 0);
        lockedGrid.columns = columns.locked;
        normalGrid.columns = columns.normal;

        // normal grid should flex the rest of the width
        normalGrid.flex = 1;
        lockedGrid.viewConfig = me.lockedViewConfig || {};
        lockedGrid.viewConfig.loadingUseMsg = false;
        lockedGrid.viewConfig.loadMask = false;

        // Padding below locked grid body only if there are scrollbars on this system
        // This takes the place of any spacer element.
        // Important: The height has to be postprocessed after render to override
        // the inline border styles injected by automatic component border settings.
        if (scrollbarHeight) {
            lockedGrid.viewConfig.style = 'border-bottom:' + scrollbarHeight +
                'px solid #f6f6f6;' + (lockedGrid.viewConfig.style || '');
        }

        normalGrid.viewConfig = me.normalViewConfig || {};
        normalGrid.viewConfig.loadMask = false;

        //<debug>
        if (me.viewConfig && me.viewConfig.id) {
            Ext.log.warn('id specified on Lockable viewConfig, it will be shared between both views: "' + me.viewConfig.id + '"');
        }
        //</debug>

        Ext.applyIf(lockedGrid.viewConfig, me.viewConfig);
        Ext.applyIf(normalGrid.viewConfig, me.viewConfig);

        me.lockedGrid = Ext.ComponentManager.create(lockedGrid);

        if (me.isTree) {
            // Tree must not animate because the partner grid is unable to animate
            me.lockedGrid.getView().animate = false;

            // When this is a locked tree, the normal side is just a gridpanel, so needs the flat NodeStore
            normalGrid.store = me.lockedGrid.view.store;

            // To stay in sync with the tree side; trees don't use deferInitialRefresh by default. Overrideable by user config.
            normalGrid.deferRowRender = false;

            // Match configs between sides
            normalGrid.viewConfig.stripeRows = me.lockedGrid.view.stripeRows;
            normalGrid.rowLines = me.lockedGrid.rowLines;
        }

        // Set up a bidirectional relationship between the two sides of the locked view
        lockedView = me.lockedGrid.getView();
        normalGrid.viewConfig.lockingPartner = lockedView;
        me.normalGrid = Ext.ComponentManager.create(normalGrid);
        lockedView.lockingPartner = normalView = me.normalGrid.getView();

        me.view = new Ext.grid.locking.View({
            loadingText: normalView.loadingText,
            loadingCls: normalView.loadingCls,
            loadingUseMsg: normalView.loadingUseMsg,
            loadMask: me.loadMask !== false,
            locked: me.lockedGrid,
            normal: me.normalGrid,
            panel: me
        });

        // Set up listeners for the locked view. If its SelModel ever scrolls it, the normal view must sync
        listeners = bufferedRenderer ? {} : {
            scroll: {
                fn: me.onLockedViewScroll,
                element: 'el',
                scope: me
            }
        };

        // If there are system scrollbars, we have to monitor the mousewheel and fake a scroll
        // Also we need to postprocess the border width because of inline border setting styles.
        // The locked grid needs a bottom border to match with any scrollbar present in the normal grid .
        // Keep locked section's bottom border width synched
        if (scrollbarHeight) {
            me.lockedGrid.on({
                afterlayout: me.afterLockedViewLayout,
                scope: me
            });

            // Ensure the overflow flags have been calculated from the various overflow configs
            lockedView.getOverflowStyle();

            // If the locked view is configured to scoll vertically, force the columns to fit initially.
            if (lockedView.scrollFlags.y) {
                me.lockedGrid.headerCt.forceFit = true;
            }
            // If the locked view is not configured to scoll vertically, we must listen for mousewheel events to scroll it.
            else {
                listeners.mousewheel = {
                    fn: me.onLockedViewMouseWheel,
                    element: 'el',
                    scope: me
                };
            }
        }
        lockedView.on(listeners);

        // Set up listeners for the normal view
        listeners = bufferedRenderer ? {} : {
            scroll: {
                fn: me.onNormalViewScroll,
                element: 'el',
                scope: me
            },
            scope: me
        };
        normalView.on(listeners);

        lockedHeaderCt = me.lockedGrid.headerCt;
        normalHeaderCt = me.normalGrid.headerCt;

        // The top grid, and the LockingView both need to have a headerCt which is usable.
        // It is part of their private API that framework code uses when dealing with a grid or grid view
        me.headerCt = me.view.headerCt = new Ext.grid.locking.HeaderContainer(me);

        lockedHeaderCt.lockedCt = true;
        lockedHeaderCt.lockableInjected = true;
        normalHeaderCt.lockableInjected = true;

        lockedHeaderCt.on({
            // buffer to wait until multiple adds have fired
            add: {
                buffer: 1,
                scope: me,
                fn: me.onLockedHeaderAdd
            },
            columnshow: me.onLockedHeaderShow,
            columnhide: me.onLockedHeaderHide,
            sortchange: me.onLockedHeaderSortChange,
            columnresize: me.onLockedHeaderResize,
            scope: me
        });

        normalHeaderCt.on({
            sortchange: me.onNormalHeaderSortChange,
            scope: me
        });

        me.modifyHeaderCt();
        me.items = [me.lockedGrid, me.normalGrid];

        me.relayHeaderCtEvents(lockedHeaderCt);
        me.relayHeaderCtEvents(normalHeaderCt);

        // The top level Lockable container does not get bound to the store, so we need to programatically add the relayer so that
        // The filterchange state event is fired.
        me.storeRelayers = me.relayEvents(store, [
            /**
             * @event filterchange
             * @inheritdoc Ext.data.Store#filterchange
             */
            'filterchange'
        ]);

        me.layout = {
            type: 'hbox',
            align: 'stretch'
        };
    },

    getLockingViewConfig: function(){
        return {
            xclass: 'Ext.grid.locking.View',
            locked: this.lockedGrid,
            normal: this.normalGrid,
            panel: this
        };
    },

    processColumns: function(columns) {
        // split apart normal and locked 
        var i,
            len,
            column,
            cp = this.dummyHdrCtr || (this.self.prototype.dummyHdrCtr = new Ext.grid.header.Container()),
            lockedHeaders = [],
            normalHeaders = [],
            lockedHeaderCt = {
                itemId: 'lockedHeaderCt',
                stretchMaxPartner: '^^>>#normalHeaderCt',
                items: lockedHeaders
            },
            normalHeaderCt = {
                itemId: 'normalHeaderCt',
                stretchMaxPartner: '^^>>#lockedHeaderCt',
                items: normalHeaders
            },
            result = {
                lockedWidth: 0,
                locked: lockedHeaderCt,
                normal: normalHeaderCt
            };

        // In case they specified a config object with items...
        if (Ext.isObject(columns)) {
            Ext.applyIf(lockedHeaderCt, columns);
            Ext.applyIf(normalHeaderCt, columns);
            Ext.apply(cp, columns);
            columns = columns.items;
        }

        for (i = 0, len = columns.length; i < len; ++i) {
            column = columns[i];

            // Use the HeaderContainer object to correctly configure and create the column.
            // MUST instantiate now because the locked or autoLock config which we read here might be in the prototype.
            // MUST use a Container instance so that defaults from an object columns config get applied.
            if (!column.isComponent) {
                column = cp.lookupComponent(cp.applyDefaults(column));
            }

            // mark the column as processed so that the locked attribute does not
            // trigger the locked subgrid to try to become a split lockable grid itself.
            column.processed = true;
            if (column.locked || column.autoLock) {
                if (!column.hidden) {
                    result.lockedWidth += this.getColumnWidth(column) || cp.defaultWidth;
                }
                lockedHeaders.push(column);
            } else {
                normalHeaders.push(column);
            }
            if (!column.headerId) {
                column.headerId = (column.initialConfig || column).id || ('h' + (++this.headerCounter));
            }
        }
        this.fireEvent('processcolumns', this, lockedHeaders, normalHeaders);
        return result;
    },

    // Used when calculating total locked column width in processColumns
    // Use shrinkwrapping of child columns if no top level width.
    getColumnWidth: function(column) {
        var result = column.width || 0,
            subcols, len, i;

        // <debug>
        if (column.flex) {
            Ext.Error.raise("Columns which are locked do NOT support a flex width. You must set a width on the " + column.text + "column.");
        }
        // </debug>
        if (!result && column.isGroupHeader) {
            subcols = column.items.items;
            len = subcols.length;
            for (i = 0; i < len; i++) {
                result += this.getColumnWidth(subcols[i]);
            }
        }
        return result;
    },

    // Due to automatic component border setting using inline style, to create the scrollbar-replacing
    // bottom border, we have to postprocess the locked view *after* render.
    // If there are visible normal columns, we do need the fat bottom border.
    afterLockedViewLayout: function() {
        var me = this,
            lockedView = me.lockedGrid.getView(),
            lockedViewEl = lockedView.el.dom,
            spacerHeight = (me.normalGrid.headerCt.tooNarrow ? Ext.getScrollbarSize().height : 0);

        // If locked view is configured to scroll horizontally, and it overflows horizontally, then we do not need the spacer
        if (lockedView.scrollFlags.x && lockedViewEl.scrollWidth > lockedViewEl.clientWidth) {
            spacerHeight = 0;
        }

        lockedView.el.dom.style.borderBottomWidth = spacerHeight + 'px';

        // Legacy IE browsers which cannot be forced to use the sensible border box model.
        // We have to account in the element's style height for flip-flopping border width
        if (!Ext.isBorderBox) {
            lockedView.el.setHeight(lockedView.lastBox.height);
        }
    },

    /**
     * @private
     * Listen for mousewheel events on the locked section which does not scroll.
     * Scroll it in response, and the other section will automatically sync.
     */
    onLockedViewMouseWheel: function(e) {
        var me = this,
            scrollDelta = -me.scrollDelta,
            deltaY = scrollDelta * e.getWheelDeltas().y,
            vertScrollerEl = me.lockedGrid.getView().el.dom,
            verticalCanScrollDown, verticalCanScrollUp;

        if (!me.ignoreMousewheel) {
            if (vertScrollerEl) {
                verticalCanScrollDown = vertScrollerEl.scrollTop !== vertScrollerEl.scrollHeight - vertScrollerEl.clientHeight;
                verticalCanScrollUp   = vertScrollerEl.scrollTop !== 0;
            }

            if ((deltaY < 0 && verticalCanScrollUp) || (deltaY > 0 && verticalCanScrollDown)) {
                e.stopEvent();

                // Inhibit processing of any scroll events we *may* cause here.
                // Some OSs do not fire a scroll event when we set the scrollTop of an overflow:hidden element,
                // so we invoke the scroll handler programatically below.
                vertScrollerEl.scrollTop += deltaY;
                me.normalGrid.getView().el.dom.scrollTop = vertScrollerEl.scrollTop;

                // Invoke the scroll event handler programatically to sync everything.
                me.onNormalViewScroll();
            }
        }
    },

    onLockedViewScroll: function() {
        var me = this,
            lockedView = me.lockedGrid.getView(),
            normalView = me.normalGrid.getView(),
            normalDom = normalView.el.dom,
            lockedDom = lockedView.el.dom,
            normalTable,
            lockedTable;

        // See onNormalViewScroll
        if (normalDom.scrollTop !== lockedDom.scrollTop) {
            normalDom.scrollTop = lockedDom.scrollTop;
    
            // For buffered views, the absolute position is important as well as scrollTop
            if (me.store.buffered) {
                lockedTable = lockedView.el.child('table', true);
                normalTable = normalView.el.child('table', true);
                normalTable.style.position = 'absolute';
                normalTable.style.top = lockedTable.style.top;
            }
        }
    },
    
    onNormalViewScroll: function() {
        var me = this,
            lockedView = me.lockedGrid.getView(),
            normalView = me.normalGrid.getView(),
            normalDom = normalView.el.dom,
            lockedDom = lockedView.el.dom,
            normalTable,
            lockedTable;

        // When we set the position, it will cause a scroll event on the other view, so we need to
        // check the top here. We can't just set a flag, like:
        // if (!me.scrolling) {
        //     me.scrolling = true;
        //     other.scrollTop = this.scrollTop;
        //     me.scrolling = false; 
        // }
        // The browser waits until the "thread" finishes before setting the
        // top, so by the time we set scrolling = false it hasn't hit the other
        // scroll event yet
        if (normalDom.scrollTop !== lockedDom.scrollTop) {
            lockedDom.scrollTop = normalDom.scrollTop;
    
            // For buffered views, the absolute position is important as well as scrollTop
            if (me.store.buffered) {
                lockedTable = lockedView.el.child('table', true);
                normalTable = normalView.el.child('table', true);
                lockedTable.style.position = 'absolute';
                lockedTable.style.top = normalTable.style.top;
            }
        }
    },

    /**
     * Synchronizes the row heights between the locked and non locked portion of the grid for each
     * row. If one row is smaller than the other, the height will be increased to match the larger one.
     */
    syncRowHeights: function() {
        var me = this,
            i,
            lockedView = me.lockedGrid.getView(),
            normalView = me.normalGrid.getView(),
            lockedRowEls = lockedView.all.slice(),
            normalRowEls = normalView.all.slice(),
            ln = lockedRowEls.length,
            scrollTop;

        // Ensure there are an equal number of locked and normal rows before synchronization
        if (normalRowEls.length === ln) {

            // Loop thru all rows and ask the TableView class to sync the sides.
            for (i = 0; i < ln; i++) {
                normalView.syncRowHeights(lockedRowEls[i], normalRowEls[i]);
            }

            // Synchronize the scrollTop positions of the two views
            scrollTop = normalView.el.dom.scrollTop;
            normalView.el.dom.scrollTop = scrollTop;
            lockedView.el.dom.scrollTop = scrollTop;
        }
    },

    // inject Lock and Unlock text
    // Hide/show Lock/Unlock options
    modifyHeaderCt: function() {
        var me = this;
        me.lockedGrid.headerCt.getMenuItems = me.getMenuItems(me.lockedGrid.headerCt.getMenuItems, true);
        me.normalGrid.headerCt.getMenuItems = me.getMenuItems(me.normalGrid.headerCt.getMenuItems, false);
        me.lockedGrid.headerCt.showMenuBy = Ext.Function.createInterceptor(me.lockedGrid.headerCt.showMenuBy, me.showMenuBy);
        me.normalGrid.headerCt.showMenuBy = Ext.Function.createInterceptor(me.normalGrid.headerCt.showMenuBy, me.showMenuBy);
    },

    onUnlockMenuClick: function() {
        this.unlock();
    },

    onLockMenuClick: function() {
        this.lock();
    },

    showMenuBy: function(t, header) {
        var menu = this.getMenu(),
            unlockItem  = menu.down('#unlockItem'),
            lockItem = menu.down('#lockItem'),
            sep = unlockItem.prev();

        if (header.lockable === false) {
            sep.hide();
            unlockItem.hide();
            lockItem.hide();
        } else {
            sep.show();
            unlockItem.show();
            lockItem.show();
            if (!unlockItem.initialConfig.disabled) {
                unlockItem.setDisabled(header.lockable === false);
            }
            if (!lockItem.initialConfig.disabled) {
                lockItem.setDisabled(!header.isLockable());
            }
        }
    },

    getMenuItems: function(getMenuItems, locked) {
        var me            = this,
            unlockText    = me.unlockText,
            lockText      = me.lockText,
            unlockCls     = Ext.baseCSSPrefix + 'hmenu-unlock',
            lockCls       = Ext.baseCSSPrefix + 'hmenu-lock',
            unlockHandler = Ext.Function.bind(me.onUnlockMenuClick, me),
            lockHandler   = Ext.Function.bind(me.onLockMenuClick, me);

        // runs in the scope of headerCt
        return function() {

            // We cannot use the method from HeaderContainer's prototype here
            // because other plugins or features may already have injected an implementation
            var o = getMenuItems.call(this);
            o.push('-', {
                itemId: 'unlockItem',
                cls: unlockCls,
                text: unlockText,
                handler: unlockHandler,
                disabled: !locked
            });
            o.push({
                itemId: 'lockItem',
                cls: lockCls,
                text: lockText,
                handler: lockHandler,
                disabled: locked
            });
            return o;
        };
    },

    /**
     * @private
     * Updates the overall view after columns have been resized, or moved from
     * the locked to unlocked side or vice-versa.
     * 
     * If all columns are removed from either side, that side must be hidden, and the
     * sole remaining column owning grid then becomes *the* grid. It must flex to occupy the
     * whole of the locking view. And it must also allow scrolling.
     * 
     * If columns are shared between the two sides, the *locked* grid shrinkwraps the
     * width of the visible locked columns while the normal grid flexes in what space remains.
     *
     * @return {Boolean} `true` if there are visible locked columns which need refreshing.
     *
     */
    syncLockedWidth: function() {
        var me = this,
            locked = me.lockedGrid,
            lockedView = locked.view,
            lockedViewEl = lockedView.el.dom,
            normal = me.normalGrid,
            lockedColCount = locked.headerCt.getVisibleGridColumns().length,
            normalColCount = normal.headerCt.getVisibleGridColumns().length;

        Ext.suspendLayouts();

        // If there are still visible normal columns, then the normal grid will flex
        // while we effectively shrinkwrap the width of the locked columns
        if (normalColCount) {
            normal.show();
            if (lockedColCount) {

                // The locked grid shrinkwraps the total column width while the normal grid flexes in what remains
                // UNLESS it has been set to forceFit
                if (!locked.headerCt.forceFit) {
                    delete locked.flex;
                    // Don't pass the purge flag here
                    locked.setWidth(locked.headerCt.getFullWidth());
                }
                locked.addCls(me.lockedGridCls);
                locked.show();
            } else {
                // No visible locked columns: hide the locked grid
                // We also need to trigger a refresh to clear out any
                // old dom nodes
                locked.getView().refresh();
                locked.hide();
            }

            // Fix it so that the locked view scrolls the way it was initially configured to do.
            lockedView.el.setStyle(lockedView.getOverflowStyle());

            // Ignore mousewheel events if the view is configured to scroll vertically
            me.ignoreMousewheel = lockedView.scrollFlags.y;
        }

        // There are no normal grid columns. The "locked" grid has to be *the*
        // grid, and cannot have a shrinkwrapped width, but must flex the entire width.
        else {
            normal.hide();
            
            // When the normal grid is hidden, we no longer need the bottom border "scrollbar replacement"
            lockedViewEl.style.borderBottomWidth = '0';

            // The locked now becomes *the* grid and has to flex to occupy the full view width
            locked.flex = 1;
            delete locked.width;
            locked.removeCls(me.lockedGridCls);
            locked.show();

            // Fix it so that the "locked" has the same scroll settings as the normal view.
            // Because it is the only grid view visible now.
            lockedView.el.setStyle(normal.view.getOverflowStyle());
            me.ignoreMousewheel = true;
        }
        Ext.resumeLayouts(true);
        return [lockedColCount, normalColCount];
    },

    onLockedHeaderAdd: function() {
        // Columns can be added to the locked grid whwen reconfiguring or during a lock
        // operation when syncLockedWidth will be called anyway, so allow adding to be ignored
        if (!this.ignoreAddLockedColumn) {
            this.syncLockedWidth();
        }
    },

    onLockedHeaderResize: function() {
        this.syncLockedWidth();
    },

    onLockedHeaderHide: function() {
        this.syncLockedWidth();
    },

    onLockedHeaderShow: function() {
        this.syncLockedWidth();
    },

    onLockedHeaderSortChange: function(headerCt, header, sortState) {
        if (sortState) {
            // no real header, and silence the event so we dont get into an
            // infinite loop
            this.normalGrid.headerCt.clearOtherSortStates(null, true);
        }
    },

    onNormalHeaderSortChange: function(headerCt, header, sortState) {
        if (sortState) {
            // no real header, and silence the event so we dont get into an
            // infinite loop
            this.lockedGrid.headerCt.clearOtherSortStates(null, true);
        }
    },

    // going from unlocked section to locked
    /**
     * Locks the activeHeader as determined by which menu is open OR a header
     * as specified.
     * @param {Ext.grid.column.Column} [header] Header to unlock from the locked section.
     * Defaults to the header which has the menu open currently.
     * @param {Number} [toIdx] The index to move the unlocked header to.
     * Defaults to appending as the last item.
     * @private
     */
    lock: function(activeHd, toIdx) {
        var me         = this,
            normalGrid = me.normalGrid,
            lockedGrid = me.lockedGrid,
            normalHCt  = normalGrid.headerCt,
            lockedHCt  = lockedGrid.headerCt,
            refreshFlags,
            ownerCt;

        activeHd = activeHd || normalHCt.getMenu().activeHeader;
        ownerCt = activeHd.ownerCt;

        // isLockable will test for making the locked side too wide
        if (!activeHd.isLockable()) {
            return;
        }

        // if column was previously flexed, get/set current width
        // and remove the flex
        if (activeHd.flex) {
            activeHd.width = activeHd.getWidth();
            activeHd.flex = null;
        }

        Ext.suspendLayouts();
        ownerCt.remove(activeHd, false);
        activeHd.locked = true;

        // Flag to the locked column add listener to do nothing
        me.ignoreAddLockedColumn = true;
        if (Ext.isDefined(toIdx)) {
            lockedHCt.insert(toIdx, activeHd);
        } else {
            lockedHCt.add(activeHd);
        }
        me.ignoreAddLockedColumn = false;

        refreshFlags = me.syncLockedWidth();
        if (refreshFlags[0]) {
            lockedGrid.getView().refresh();
        }
        if (refreshFlags[1]) {
            normalGrid.getView().refresh();
        }
        Ext.resumeLayouts(true);

        me.fireEvent('lockcolumn', me, activeHd);
    },

    // going from locked section to unlocked
    /**
     * Unlocks the activeHeader as determined by which menu is open OR a header
     * as specified.
     * @param {Ext.grid.column.Column} [header] Header to unlock from the locked section.
     * Defaults to the header which has the menu open currently.
     * @param {Number} [toIdx=0] The index to move the unlocked header to.
     * @private
     */
    unlock: function(activeHd, toIdx) {
        var me         = this,
            normalGrid = me.normalGrid,
            lockedGrid = me.lockedGrid,
            normalHCt  = normalGrid.headerCt,
            lockedHCt  = lockedGrid.headerCt,
            refreshFlags;

        // Unlocking; user expectation is that the unlocked column is inserted at the beginning.
        if (!Ext.isDefined(toIdx)) {
            toIdx = 0;
        }
        activeHd = activeHd || lockedHCt.getMenu().activeHeader;

        Ext.suspendLayouts();
        activeHd.ownerCt.remove(activeHd, false);
        activeHd.locked = false;
        normalHCt.insert(toIdx, activeHd);

        // syncLockedWidth returns visible column counts for both grids.
        // only refresh what needs refreshing
        refreshFlags = me.syncLockedWidth();

        if (refreshFlags[0]) {
            lockedGrid.getView().refresh();
        }
        if (refreshFlags[1]) {
            normalGrid.getView().refresh();
        }
        Ext.resumeLayouts(true);

        me.fireEvent('unlockcolumn', me, activeHd);
    },

    // we want to totally override the reconfigure behaviour here, since we're creating 2 sub-grids
    reconfigureLockable: function(store, columns) {
        var me = this,
            oldStore = me.store,
            lockedGrid = me.lockedGrid,
            normalGrid = me.normalGrid;

        Ext.suspendLayouts();
        if (columns) {
            lockedGrid.headerCt.removeAll();
            normalGrid.headerCt.removeAll();

            columns = me.processColumns(columns);

            // Flag to the locked column add listener to do nothing
            me.ignoreAddLockedColumn = true;
            lockedGrid.headerCt.add(columns.locked.items);
            me.ignoreAddLockedColumn = false;
            normalGrid.headerCt.add(columns.normal.items);

            // Ensure locked grid is set up correctly with correct width and bottom border,
            // and that both grids' visibility and scrollability status is correct
            me.syncLockedWidth();
        }

        if (store && store !== oldStore) {
            store = Ext.data.StoreManager.lookup(store);
            me.store = store;
            lockedGrid.bindStore(store);
            normalGrid.bindStore(store);
        } else {
            lockedGrid.getView().refresh();
            normalGrid.getView().refresh();
        }
        Ext.resumeLayouts(true);
    },

    constructLockableFeatures: function() {
        var features = this.features,
            feature,
            featureClone,
            lockedFeatures,
            normalFeatures,
            i = 0, len;
        
        if (features) {
            lockedFeatures = [];
            normalFeatures = [];
            len = features.length;
            for (; i < len; i++) {
                feature = features[i];
                if (!feature.isFeature) {
                    feature = Ext.create('feature.' + feature.ftype, feature);
                }
                switch (feature.lockableScope) {
                    case 'locked':
                        lockedFeatures.push(feature);
                        break;
                    case 'normal':
                        normalFeatures.push(feature);
                        break;
                    default:
                        feature.lockableScope = 'both';
                        lockedFeatures.push(feature);
                        normalFeatures.push(featureClone = feature.clone());

                        // When cloned to either side, each gets a "lockingPartner" reference to the other
                        featureClone.lockingPartner = feature;
                        feature.lockingPartner = featureClone;
                }
            }
        }
        return {
            normalFeatures: normalFeatures,
            lockedFeatures: lockedFeatures
        };
    },

    constructLockablePlugins: function() {
        var plugins = this.plugins,
            plugin,
            normalPlugin,
            lockedPlugin,
            topPlugins,
            lockedPlugins,
            normalPlugins,
            i = 0, len;

        if (plugins) {
            topPlugins = [];
            lockedPlugins = [];
            normalPlugins = [];
            len = plugins.length;
            for (; i < len; i++) {
                // Plugin will already have been instantiated by the AbstractComponent constructor
                plugin = plugins[i];

                switch (plugin.lockableScope) {
                    case 'both':
                        lockedPlugins.push(lockedPlugin = plugin.clonePlugin());
                        normalPlugins.push(normalPlugin = plugin.clonePlugin());

                        // When cloned to both sides, each gets a "lockingPartner" reference to the other
                        lockedPlugin.lockingPartner = normalPlugin;
                        normalPlugin.lockingPartner = lockedPlugin;
                        
                        // If the plugin has to be propagated down to both, a new plugin config object must be given to that side
                        // and this plugin must be destroyed.
                        Ext.destroy(plugin);
                        break;
                    case 'locked':
                        lockedPlugins.push(plugin);
                        break;
                    case 'normal':
                        normalPlugins.push(plugin);
                        break;
                    default:
                        topPlugins.push(plugin);
                }
            }
        }
        return {
            topPlugins:    topPlugins,
            normalPlugins: normalPlugins,
            lockedPlugins: lockedPlugins
        };
    },
    
    destroyLockable: function(){
        // The locking view isn't a "real" view, so we need to destroy it manually
        Ext.destroy(this.view);
    }
}, function() {
    this.borrow(Ext.AbstractComponent, ['constructPlugin']);
});
