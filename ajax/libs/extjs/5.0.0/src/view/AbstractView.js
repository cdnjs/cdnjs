/**
 * @class Ext.view.AbstractView
 * This is an abstract superclass and should not be used directly. Please see {@link Ext.view.View}.
 * @private
 */
Ext.define('Ext.view.AbstractView', {
    extend: 'Ext.Component',
    requires: [
        'Ext.LoadMask',
        'Ext.data.StoreManager',
        'Ext.CompositeElementLite',
        'Ext.selection.DataViewModel'
    ],
    mixins: [
        'Ext.util.StoreHolder'
    ],

    inheritableStatics: {
        getRecord: function(node) {
            return this.getBoundView(node).getRecord(node);
        },

        getBoundView: function(node) {
            return Ext.getCmp(node.boundView);
        }
    },
    
    defaultBindProperty: 'store',

    statics: {

        /**
         * @cfg {Number} [updateDelay=200] Global config for use when using {@link #throttledUpdate throttled view updating} if the data in the backing {@link Ext.data.Store store}
         * is being changed rapidly, for example receiving changes from the server through a WebSocket connection.
         *
         * To avoid too-frequent view updates overloading the browser with style recalculation, layout and paint requests, updates can be {@link #throttledUpdate throttled} to 
         * coalesced, and applied at the interval specified in milliseconds.
         */
        updateDelay: 200,

        // @private
        queueRecordChange: function(view, store, record, operation, modifiedFieldNames) {
            var me = this,
                changeQueue = me.changeQueue || (me.changeQueue = {}),
                recId = record.internalId,
                recChange,
                updated,
                len, i, fieldName, value,
                checkForReversion;

            recChange = changeQueue[recId] || (changeQueue[recId] = {
                operation: operation,
                record: record,
                data: {},
                views: []
            });

            // Hash of original values
            updated = recChange.data;

            // Make sure this view is among those updated when record changes are flushed
            Ext.Array.include(recChange.views, view);

            // Note the following condition tests the result of an assignment statement.
            // If we have been informed that specific fields have changed.
            if (modifiedFieldNames && (len = modifiedFieldNames.length)) {
                for (i = 0; i < len; i++) {
                    fieldName = modifiedFieldNames[i];
                    value = record.data[fieldName];

                    // More than one update is being performed...
                    if (updated.hasOwnProperty(fieldName)) {

                        // If the update is back to the original value, this may have reverted the record to original state
                        if (record.isEqual(updated[fieldName], value)) {
                            delete updated[fieldName];
                            checkForReversion = true;
                        }
                    }

                    // On first update, cache the original value
                    else {
                        updated[fieldName] = value;
                    }
                }

                // If the record has been returned to its original state, delete the queue entry.
                // checkForReversion flag saves the expensive (on legacy browsers) call to Ext.Object.getKeys
                if (checkForReversion && !Ext.Object.getKeys(updated).length) {
                    delete changeQueue[recId];
                }
            }

            // Unpsecified fields have changed. We have to collect the whole data object.
            else {
                Ext.apply(updated, record.data);
            }

            // Create a task which will call on to the onFlushTick every updateDelay milliseconds.
            if (!me.flushQueueTask) {
                me.flushQueueTask = Ext.util.TaskManager.newTask({
                    // Queue the actual render flush on the next animation frame if available.
                    run: Ext.global.requestAnimationFrame ? Ext.Function.createAnimationFrame(me.onFlushTick, me) : Ext.Function.bind(me.onFlushTick, me),
                    interval: Ext.view.AbstractView.updateDelay,
                    repeat: 1
                });
            }
            me.flushQueueTask.start();
        },

        // @private
        // On every flush (determined by updateDelay setting), ask the animation system to schedule a call to flushChangeQueue at the next animation frame.
        onFlushTick: function() {
            Ext.AnimationQueue.start(this.flushChangeQueue, this);
        },

        /**
        * @private
        * Flushes all queued field updates to the UI.
        *
        * Called in the context of the AbstractView class.
        *
        * The queue is shared across all Views so that there is only one global flush operation.
        */
        flushChangeQueue: function() {
            // Maintainer: Note that "me" references AbstractView class
            var me = this,
                dirtyViews,
                len,
                changeQueue,
                recChange,
                recId,
                i, view;

            // If there is scrolling going on anywhere, requeue the flush operation.
            if (Ext.isScrolling) {
                me.flushQueueTask.start();
                return;
            }

            changeQueue = me.changeQueue;

            // Empty the view's changeQueue
            this.changeQueue = {};

            for (recId in changeQueue) {
                recChange = changeQueue[recId];
                dirtyViews = recChange.views;
                len = dirtyViews.length;

                // Loop through all the views which have outstanding changes.
                for (i = 0; i < len; i++) {
                    view = dirtyViews[i];

                    // View may have been destroyed during the buffered phase.
                    if (!view.isDestroyed) {
                        view.handleUpdate(view.dataSource, recChange.record, recChange.operation, Ext.Object.getKeys(recChange.data));
                    }
                }
            }
            Ext.AnimationQueue.stop(me.flushChangeQueue, me);
        }
    },

    /**
     * @cfg {Boolean} [throttledUpdate=false]
     * Configure as `true` to have this view participate in the global throttled update queue which flushes store changes to the UI at a maximum rate
     * determined by the {@link #updateDelay} setting.
     */
    throttledUpdate: false,

    /**
     * @cfg {String/String[]/Ext.XTemplate} tpl (required)
     * The HTML fragment or an array of fragments that will make up the template used by this DataView.  This should
     * be specified in the same format expected by the constructor of {@link Ext.XTemplate}.
     * @since 2.3.0
     */
    /**
     * @cfg {Ext.data.Store} store (required)
     * The {@link Ext.data.Store} to bind this DataView to.
     * @since 2.3.0
     */

    /**
     * @cfg {Boolean} [deferInitialRefresh=false]
     * Configure as 'true` to defer the initial refresh of the view.
     *
     * This allows the View to execute its render and initial layout more quickly because the process will not be encumbered
     * by the update of the view structure.
     */
    deferInitialRefresh: false,

    /**
     * @cfg {String} itemSelector (required)
     * <b>This is a required setting</b>. A simple CSS selector (e.g. `div.some-class` or
     * `span:first-child`) that will be used to determine what nodes this DataView will be
     * working with. The itemSelector is used to map DOM nodes to records. As such, there should
     * only be one root level element that matches the selector for each record. The itemSelector
     * will be automatically configured if the {@link #itemTpl} config is used.
     * 
     *     new Ext.view.View({
     *         renderTo: Ext.getBody(),
     *         store: {
     *             fields: ['name'],
     *             data: [
     *                 {name: 'Item 1'},
     *                 {name: 'Item 2'}
     *             ]
     *         },
     *         tpl: [
     *             '<ul>',
     *             '<tpl for=".">',
     *                 '<li>{name}</li>',
     *             '</tpl>',
     *             '</ul>'
     *         ],
     *         // Match the li, since each one maps to a record
     *         itemSelector: 'li'
     *     });
     * 
     * @since 2.3.0
     */

    /**
     * @cfg {String} itemCls
     * Specifies the class to be assigned to each element in the view when used in conjunction with the
     * {@link #itemTpl} configuration.
     * @since 2.3.0
     */
    itemCls: Ext.baseCSSPrefix + 'dataview-item',

    /**
     * @cfg {String/String[]/Ext.XTemplate} itemTpl
     * The inner portion of the item template to be rendered. Follows an XTemplate
     * structure and will be placed inside of a tpl.
     */

    /**
     * @cfg {String} overItemCls
     * A CSS class to apply to each item in the view on mouseover.
     * Setting this will automatically set {@link #trackOver} to `true`.
     */

    //<locale>
    /**
     * @cfg {String} loadingText
     * A string to display during data load operations.  If specified, this text will be
     * displayed in a loading div and the view's contents will be cleared while loading, otherwise the view's
     * contents will continue to display normally until the new data is loaded and the contents are replaced.
     * @since 2.3.0
     */
    loadingText: 'Loading...',
    //</locale>

    /**
     * @cfg {Boolean/Object} loadMask
     * False to disable a load mask from displaying while the view is loading. This can also be a
     * {@link Ext.LoadMask} configuration object.
     */
    loadMask: true,

    /**
     * @cfg {String} loadingCls
     * The CSS class to apply to the loading message element. Defaults to Ext.LoadMask.prototype.msgCls "x-mask-loading".
     */

    /**
     * @cfg {Boolean} loadingUseMsg
     * Whether or not to use the loading message.
     * @private
     */
    loadingUseMsg: true,


    /**
     * @cfg {Number} loadingHeight
     * If specified, gives an explicit height for the data view when it is showing the {@link #loadingText},
     * if that is specified. This is useful to prevent the view's height from collapsing to zero when the
     * loading mask is applied and there are no other contents in the data view.
     */

    /**
     * @cfg {String} selectedItemCls
     * A CSS class to apply to each selected item in the view.
     */
    selectedItemCls: Ext.baseCSSPrefix + 'item-selected',

    //<locale>
    /**
     * @cfg {String} emptyText
     * The text to display in the view when there is no data to display.
     * Note that when using local data the emptyText will not be displayed unless you set
     * the {@link #deferEmptyText} option to false.
     * @since 2.3.0
     */
    emptyText: "",
    //</locale>

    /**
     * @cfg {Boolean} deferEmptyText
     * True to defer emptyText being applied until the store's first load.
     * @since 2.3.0
     */
    deferEmptyText: true,

    /**
     * @cfg {Boolean} trackOver
     * When `true` the {@link #overItemCls} will be applied to rows when hovered over.
     * This in return will also cause {@link Ext.view.View#highlightitem highlightitem} and
     * {@link Ext.view.View#unhighlightitem unhighlightitem} events to be fired.
     *
     * Enabled automatically when the {@link #overItemCls} config is set.
     *
     * @since 2.3.0
     */
    trackOver: false,

    /**
     * @cfg {Boolean} blockRefresh
     * Set this to true to ignore refresh events on the bound store. This is useful if
     * you wish to provide custom transition animations via a plugin
     * @since 3.4.0
     */
    blockRefresh: false,

    /**
     * @cfg {Boolean} disableSelection
     * True to disable selection within the DataView. This configuration will lock the selection model
     * that the DataView uses.
     */

    /**
     * @cfg {Boolean} preserveScrollOnRefresh
     * True to preserve scroll position across refresh operations.
     */
    preserveScrollOnRefresh: false,

    ariaRole: 'listbox',
    itemAriaRole: 'option',
    
    //private
    last: false,

    triggerEvent: 'itemclick',
    triggerCtEvent: 'containerclick',

    // Starts as true by default so that pn the leading edge of the first layout a refresh will be triggered.
    // A refresh opereration sets this flag to false.
    // When a refresh is requested using refreshView, the request may be deferred because of hidden or collapsed state.
    // This is done by setting the refreshNeeded flag to true, and the the next layout will trigger  refresh.
    refreshNeeded: true,

    addCmpEvents: Ext.emptyFn,

    /**
     * @event beforerefresh
     * Fires before the view is refreshed
     * @param {Ext.view.View} this The DataView object
     */

    /**
     * @event refresh
     * Fires when the view is refreshed
     * @param {Ext.view.View} this The DataView object
     */

    /**
     * @event viewready
     * Fires when the View's item elements representing Store items has been rendered. No items will be available
     * for selection until this event fires.
     * @param {Ext.view.View} this
     */

    /**
     * @event itemupdate
     * Fires when the node associated with an individual record is updated
     * @param {Ext.data.Model} record The model instance
     * @param {Number} index The index of the record
     * @param {HTMLElement} node The node that has just been updated
     */

    /**
     * @event itemadd
     * Fires when the nodes associated with an recordset have been added to the underlying store
     * @param {Ext.data.Model[]} records The model instance
     * @param {Number} index The index at which the set of records was inserted
     * @param {HTMLElement[]} node The node that has just been updated
     */

    /**
     * @event itemremove
     * Fires when the node associated with an individual record is removed
     * @param {Ext.data.Model} record The model instance
     * @param {Number} index The index from which the record was removed
     * @param {HTMLElement} item The view item removed
     * @param {Ext.view.View} view The view removing the item
     */

    // private
    initComponent : function(){
        var me = this,
            isDef = Ext.isDefined,
            itemTpl = me.itemTpl,
            memberFn = {};

        if (itemTpl) {
            if (Ext.isArray(itemTpl)) {
                // string array
                itemTpl = itemTpl.join('');
            } else if (Ext.isObject(itemTpl)) {
                // tpl instance
                memberFn = Ext.apply(memberFn, itemTpl.initialConfig);
                itemTpl = itemTpl.html;
            }

            if (!me.itemSelector) {
                me.itemSelector = '.' + me.itemCls;
            }

            itemTpl = Ext.String.format('<tpl for="."><div class="{0}" role="{2}">{1}</div></tpl>', me.itemCls, itemTpl, me.itemAriaRole);
            me.tpl = new Ext.XTemplate(itemTpl, memberFn);
        }

        //<debug>
        if (!isDef(me.tpl) || !isDef(me.itemSelector)) {
            Ext.Error.raise({
                sourceClass: 'Ext.view.View',
                tpl: me.tpl,
                itemSelector: me.itemSelector,
                msg: "DataView requires both tpl and itemSelector configurations to be defined."
            });
        }
        //</debug>

        me.callParent();
        me.tpl = me.getTpl('tpl');

        //<debug>
        // backwards compat alias for overClass/selectedClass
        // TODO: Consider support for overCls generation Ext.Component config
        if (isDef(me.overCls) || isDef(me.overClass)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.view.View: Using the deprecated overCls or overClass configuration. Use overItemCls instead.');
            }
            me.overItemCls = me.overCls || me.overClass;
            delete me.overCls;
            delete me.overClass;
        }

        if (isDef(me.selectedCls) || isDef(me.selectedClass)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.view.View: Using the deprecated selectedCls or selectedClass configuration. Use selectedItemCls instead.');
            }
            me.selectedItemCls = me.selectedCls || me.selectedClass;
            delete me.selectedCls;
            delete me.selectedClass;
        }
        //</debug>

        if (me.overItemCls) {
            me.trackOver = true;
        }

        me.addCmpEvents();

        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
        me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store');

        // Use the provided store as the data source unless a Feature or plugin has injected a special one
        if (!me.dataSource) {
            me.dataSource = me.store;
        }
        // Bind to the data  source. Cache it by the property name "dataSource".
        // The store property is public and must reference the provided store.
        me.bindStore(me.dataSource, true, 'dataSource');
        if (!me.all) {
            me.all = new Ext.CompositeElementLite();
        }

        // We track the scroll position
        me.scrollState = {
            top: 0,
            left: 0
        };
        me.on({
            scroll: me.onViewScroll,
            element: 'el',
            onFrame: !!Ext.global.requestAnimationFrame,
            scope: me
        });
    },

    onRender: function() {
        var me = this,
            mask = me.loadMask,
            maskStore = me.getMaskStore(),
            cfg = {
                target: me,
                msg: me.loadingText,
                useMsg: me.loadingUseMsg,
                // The store gets bound in initComponent, so while
                // rendering let's push on the store
                store: maskStore
            }, proxy;

        me.callParent(arguments);

        if (mask) {
            proxy = maskStore.getProxy();
            if (proxy && !proxy.isSynchronous) {
                // Do not overwrite default msgCls if we do not have a loadingCls
                if (me.loadingCls) {
                    cfg.msgCls = me.loadingCls;
                }
                // either a config object 
                if (Ext.isObject(mask)) {
                    cfg = Ext.apply(cfg, mask);
                }
                // Attach the LoadMask to a *Component* so that it can be sensitive to resizing during long loads.
                // If this DataView is floating, then mask this DataView.
                // Otherwise, mask its owning Container (or this, if there *is* no owning Container).
                // LoadMask captures the element upon render.
                me.loadMask = new Ext.LoadMask(cfg);
                me.loadMask.on({
                    scope: me,
                    beforeshow: me.onMaskBeforeShow,
                    hide: me.onMaskHide
                });
            }
        }
    },

    beforeLayout: function() {
        var me = this;

        me.callParent(arguments);

        // If a refresh is needed, just before the layout is the time to apply it.
        // If there is a deferred refresh timer running, allow that to do the refresh.
        if (me.refreshNeeded && !me.pendingRefresh) {
            // If we have refreshed before, just call a refresh now.
            if (me.refreshCounter) {
                me.refresh();
            }
            else {
                me.doFirstRefresh(me.dataSource);
            }
        }
    },

    getMaskStore: function(){
        return this.store;
    },

    onMaskBeforeShow: function(){
        var me = this,
            loadingHeight = me.loadingHeight;

        if (loadingHeight && loadingHeight > me.getHeight()) {
            me.hasLoadingHeight = true;
            me.oldMinHeight = me.minHeight;
            me.minHeight = loadingHeight;
            me.updateLayout();
        }
    },

    onMaskHide: function(){
        var me = this;

        if (!me.destroying && me.hasLoadingHeight) {
            me.minHeight = me.oldMinHeight;
            me.updateLayout();
            delete me.hasLoadingHeight;
        }
    },

    beforeRender: function() {
        this.callParent(arguments);
        this.getSelectionModel().beforeViewRender(this);
    },

    afterRender: function() {
        this.callParent(arguments);

        // Init the SelectionModel after any on('render') listeners have been added.
        // Drag plugins create a DragDrop instance in a render listener, and that needs
        // to see an itemmousedown event first.
        this.getSelectionModel().bindComponent(this);
    },

    getRefItems: function() {
        var mask = this.loadMask,
            result = [];

        if (mask && mask.isComponent) {
            result.push(mask);
        }
        return result;
    },

    /**
     * Gets the selection model for this view.
     * @return {Ext.selection.Model} The selection model
     */
    getSelectionModel: function(){
        var me = this,
            mode = 'SINGLE';

        if (me.simpleSelect) {
            mode = 'SIMPLE';
        } else if (me.multiSelect) {
            mode = 'MULTI';
        }

        // No selModel specified, or it's just a config; Instantiate
        if (!me.selModel || !me.selModel.events) {
            me.selModel = new Ext.selection.DataViewModel(Ext.apply({
                allowDeselect: me.allowDeselect,
                mode: mode
            }, me.selModel));
        }

        if (!me.selModel.hasRelaySetup) {
            me.relayEvents(me.selModel, [
                'selectionchange', 'beforeselect', 'beforedeselect', 'select', 'deselect', 'focuschange'
            ]);
            me.selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (me.disableSelection) {
            me.selModel.locked = true;
        }

        return me.selModel;
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     * @since 2.3.0
     */
    refresh: function() {
        var me = this,
            rows = me.all,
            prevRowCount = rows.getCount(),
            refreshCounter = me.refreshCounter,
            targetEl,
            overflowEl,
            dom,
            records,
            hasFirstRefresh,

            // If there are items in the view, and there isn't a scroll range stretcher (bufferedRenderer), then honour preserveScrollOnRefresh
            preserveScroll = refreshCounter && rows.getCount() && me.preserveScrollOnRefresh && !me.bufferedRenderer,
            scrollPos;

        if (!me.rendered || me.isDestroyed || me.preventRefresh) {
            return;
        }

        if (!me.hasListeners.beforerefresh || me.fireEvent('beforerefresh', me) !== false) {

            // So that listeners to itemremove events know that its because of a refresh
            me.refreshing = true;

            targetEl = me.getTargetEl();
            records = me.getViewRange();
            dom = targetEl.dom;

            if (preserveScroll) {
                overflowEl = me.getOverflowEl();
                scrollPos = overflowEl.getScroll();
            }

            if (refreshCounter) {
                hasFirstRefresh = true;
                me.clearViewEl();
                me.refreshCounter++;
            } else {
                me.refreshCounter = 1;
            }

            // Usually, for an empty record set, this would be blank, but when the Template
            // Creates markup outside of the record loop, this must still be honoured even if there are no
            // records.
            me.tpl.append(targetEl, me.collectData(records, rows.startIndex || 0));

            // The emptyText is now appended to the View's element
            // after nodes outside the tpl block.
            if (records.length < 1) {
                // Process empty text unless the store is being cleared.
                if (me.emptyText && !me.getStore().isLoading() && (!me.deferEmptyText || hasFirstRefresh)) {
                    me.emptyEl = Ext.core.DomHelper.insertHtml('beforeEnd', targetEl.dom, me.emptyText);
                }
                rows.clear();
            } else {
                me.collectNodes(targetEl.dom);
                me.updateIndexes(0);
            }

            // Don't need to do this on the first refresh
            if (hasFirstRefresh) {
                // Some subclasses do not need to do this. TableView does not need to do this.
                if (me.refreshSelmodelOnRefresh !== false) {
                    me.selModel.refresh();
                } else if (!me.preventPrune) {
                    // However, even if that is not needed, pruning if pruneRemoved is true (the default) still needs doing.
                    me.selModel.pruneIf();
                }
            }

            me.refreshNeeded = false;

            // Ensure layout system knows about new content size.
            // If number of rows have changed, force a layout.
            me.refreshSize(rows.getCount() !== prevRowCount);

            me.fireEvent('refresh', me, records);

            if (preserveScroll) {
                overflowEl.setScrollLeft(scrollPos.left);
                overflowEl.setScrollTop(scrollPos.top);
            }

            // Upon first refresh, fire the viewready event.
            // Reconfiguring the grid "renews" this event.
            if (!me.viewReady) {
                // Fire an event when deferred content becomes available.
                me.viewReady = true;
                me.fireEvent('viewready', me);
            }
            me.refreshing = false;
            me.refreshScroll();
        }
    },

    // Private
    // Called by refresh to collect the view item nodes.
    collectNodes: function(targetEl) {
        var all = this.all;
        all.fill(Ext.fly(targetEl).query(this.getItemSelector()), all.startIndex || 0);
    },

    getViewRange: function() {
        return this.dataSource.getRange();
    },

    /**
     * @private
     * Called by the framework when the view is refreshed, or when rows are added or deleted.
     *
     * These operations may cause the view's dimensions to change, and if the owning container
     * is shrinkwrapping this view, then the layout must be updated to accommodate these new dimensions.
     */
    refreshSize: function(forceLayout) {
        var me = this,
            sizeModel = me.getSizeModel(),
            scrollManager = me.scrollManager;

        if (sizeModel.height.shrinkWrap || sizeModel.width.shrinkWrap || forceLayout) {
            me.updateLayout();
        } else if (scrollManager) {
            scrollManager.refresh();
        }
    },

    onResize: function() {
        var me = this,
            scrollManager = me.scrollManager;

        if (scrollManager && !me._hasScrollListener) {
            scrollManager.on({
                scroll: me.onViewScroll,
                scope: me,
                onFrame: !!Ext.global.requestAnimationFrame
            });
            me._hasScrollListener = true;
        }
        this.callParent(arguments);
    },

    clearViewEl: function() {
        var me = this,
            nodeContainerIsEl = me.getNodeContainer() === me.getEl();

        me.clearEmptyEl();
        // If nodeContainer is the el, just clear the innerHTML. Otherwise, we need
        // to manually remove each node we know about.
        me.all.clear(!nodeContainerIsEl);
        if (nodeContainerIsEl) {
            me.el.dom.innerHTML = '';
        }
    },

    clearEmptyEl: function() {
        var emptyEl = this.emptyEl;

        // emptyEl is likely to be a TextNode if emptyText is not HTML code.
        // Use native DOM to remove it.
        if (emptyEl) {
            emptyEl.parentNode.removeChild(emptyEl);
        }
        this.emptyEl = null;
    },

    // This is called on animation frame
    onViewScroll: function() {
        this.fireEvent('scroll', this);
    },

    /**
     * Saves the scrollState in a private variable. Must be used in conjunction with restoreScrollState.
     * @private
     */
    saveScrollState: function() {
        var me = this,
            state = me.scrollState;

        if (me.rendered) {
            state.left = me.getScrollX();
            state.top = me.getScrollY();
        }
    },

    /**
     * Restores the scrollState.
     * Must be used in conjunction with saveScrollState
     * @private
     */
    restoreScrollState: function() {
        var me = this,
            state = me.scrollState;

        if (me.rendered) {
            me.setScrollX(state.left);
            me.setScrollY(state.top);
        }
    },

    /**
     * Function which can be overridden to provide custom formatting for each Record that is used by this
     * DataView's {@link #tpl template} to render each node.
     * @param {Object/Object[]} data The raw data object that was used to create the Record.
     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
     * @param {Ext.data.Model} record The Record being prepared for rendering.
     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
     * @since 2.3.0
     */
    prepareData: function(data, index, record) {
        var associatedData, attr, hasCopied;
        if (record) {
            associatedData = record.getAssociatedData();
            for (attr in associatedData) {
                if (associatedData.hasOwnProperty(attr)) {
                    // This would be better done in collectData, however
                    // we only need to copy the data object if we have any associations,
                    // so we optimize it by only copying if we must.
                    // We do this so we don't mutate the underlying record.data
                    if (!hasCopied) {
                        data = Ext.Object.chain(data);
                        hasCopied = true;
                    }
                    data[attr] = associatedData[attr];
                }
            }
        }
        return data;
    },

    /**
     * Function which can be overridden which returns the data object passed to this
     * DataView's {@link #cfg-tpl template} to render the whole DataView.
     *
     * This is usually an Array of data objects, each element of which is processed by an
     * {@link Ext.XTemplate XTemplate} which uses `'&lt;tpl for="."&gt;'` to iterate over its supplied
     * data object as an Array. However, <i>named</i> properties may be placed into the data object to
     * provide non-repeating data such as headings, totals etc.
     *
     * @param {Ext.data.Model[]} records An Array of {@link Ext.data.Model}s to be rendered into the DataView.
     * @param {Number} startIndex the index number of the Record being prepared for rendering.
     * @return {Object[]} An Array of data objects to be processed by a repeating XTemplate. May also
     * contain <i>named</i> properties.
     * @since 2.3.0
     */
    collectData: function(records, startIndex){
        var data = [],
            i = 0,
            len = records.length,
            record;

        for (; i < len; i++) {
            record = records[i];
            data[i] = this.prepareData(record.data, startIndex + i, record);
        }
        return data;
    },

    // private
    bufferRender: function(records, index) {
        var me = this,

            // Put offscreen rendering area in prototype. Only one ever needed.
            div = me.renderBuffer || (me.self.prototype.renderBuffer = document.createElement('div'));

        me.tpl.overwrite(div, me.collectData(records, index));
        return Ext.fly(div).query(me.getItemSelector());
    },

    // Element which contains rows
    nodeContainerSelector: null,

    getNodeContainer: function() {
        var target = this.getTargetEl(),
            selector = this.nodeContainerSelector;
        return selector ? target.down(selector, true) : target;
    },

    /**
     * Returns a CSS selector which selects the element which contains record nodes.
     */
    getNodeContainerSelector: function() {
        return this.nodeContainerSelector;
    },

    // private
    onUpdate: function(store, record, operation, modifiedFieldNames) {
        var me = this;

        // If we are throttling UI updates (See the updateDelay global config), ensure there's a change entry
        // queued for the record in the global queue.
        if (me.throttledUpdate) {
            me.statics().queueRecordChange(me, store, record, operation, modifiedFieldNames);
        } else {
            me.handleUpdate.apply(me, arguments);
        }
    },

    // private
    handleUpdate : function(store, record){
        var me = this,
            index,
            node;

        if (me.viewReady) {
            index = me.dataSource.indexOf(record);

            // If the record has been removed from the data source since the changes were made, do nothing
            if (index > -1) {
                // ensure the node actually exists in the DOM
                if (me.getNode(record)) {
                    node = me.bufferRender([record], index)[0];
                    me.all.replaceElement(index, node, true);
                    me.updateIndexes(index, index);
                    // Maintain selection after update
                    me.selModel.onUpdate(record);
                    if (me.hasListeners.itemupdate) {
                        me.fireEvent('itemupdate', record, index, node);
                    }
                    return node;
                }
            }
        }
    },

    // Private.
    // Respond to store replace event which is fired by GroupStore group expand/collapse operations.
    // This saves a layout because a remove and add operation are coalesced in this operation.
    onReplace: function(store, startIndex, oldRecords, newRecords) {
        var me = this,
            endIndex,
            rows = me.all,
            nodes, item,
            i, j;

        if (me.rendered) {

            // Insert the new rows before the remove block
            nodes = me.bufferRender(newRecords, startIndex, true);
            item = rows.item(startIndex);
            if (item) {
                rows.item(startIndex).insertSibling(nodes, 'before', true);
            } else {
                me.appendNodes(nodes); 
            }
            rows.insert(startIndex, nodes);

            startIndex += newRecords.length;
            endIndex = startIndex + oldRecords.length - 1;

            // Remove the items which correspond to old records
            rows.removeRange(startIndex, endIndex, true);

            // Some subclasses do not need to do this. TableView does not need to do this.
            if (me.refreshSelmodelOnRefresh !== false) {
                me.selModel.refresh();
            }

            // Update the row indices (TableView) doesn't do this.
            me.updateIndexes(startIndex);

            // Ensure layout system knows about new content size
            me.refreshSizePending = true;

            // Fire the itemremove event for each removed item
            if (me.hasListeners.itemremove) {
                for (i = oldRecords.length, j = endIndex; i >= 0; --i, --j) {
                    me.fireEvent('itemremove', oldRecords[i], j, me);
                }
            }

            if (me.hasListeners.itemadd) {
                me.fireEvent('itemadd', newRecords, startIndex, nodes);
            }
        }
    },

    // private
    onAdd : function(store, records, index) {
        var me = this,
            nodes;

        if (me.rendered) {
            // If we are adding into an empty view, we must refresh in order that the *full tpl* is applied
            // which might create boilerplate content *around* the record nodes.
            if (me.all.getCount() === 0) {
                me.refresh();
                nodes = me.all.slice();
            } else {
                nodes = me.doAdd(records, index);
                // Some subclasses do not need to do this. TableView does not need to do this.
                if (me.refreshSelmodelOnRefresh !== false) {
                    me.selModel.refresh();
                }
                me.updateIndexes(index);

                // Ensure layout system knows about new content size
                me.refreshSizePending = true;
            }

            if (me.hasListeners.itemadd) {
                me.fireEvent('itemadd', records, index, nodes);
            }
        }

    },
    
    appendNodes: function(nodes) {
        var fragment = document.createDocumentFragment(),
            len = nodes.length,
            i;

        for (i = 0; i < len; ++i) {
            fragment.appendChild(nodes[i]);
        }
        this.getNodeContainer().appendChild(fragment);
    },

    doAdd: function(records, index) {
        var me = this,
            nodes = me.bufferRender(records, index, true),
            all = me.all,
            count = all.getCount(),
            firstRowIndex = all.startIndex || 0,
            lastRowIndex = all.endIndex || count - 1;

        // If we are empty, or add index after last node, then simply append
        if (count === 0 || index > lastRowIndex) {
            me.appendNodes(nodes);
        }

        // Adding before the start index, prepend new nodes
        else if (index <= firstRowIndex) {
            all.item(firstRowIndex).insertSibling(nodes, 'before', true);
        }

        // Insert the new nodes into place inside the existing nodes
        else {
            all.item(index).insertSibling(nodes, 'before', true);
        }

        all.insert(index, nodes);
        return nodes;
    },

    // private
    onRemove : function(ds, records, index) {
        var me = this,
            rows = me.all,
            fireItemRemove = me.hasListeners.itemremove,
            currIdx, i, record, nodes, node;

        if (rows.getCount()) {
            if (me.dataSource.getCount() === 0) {
                // Refresh so emptyText can be applied if necessary
                if (fireItemRemove) {
                    me.fireEvent('itemremove', records, index, me.getNodes(index, index + records.length - 1));
                }
                me.preventPrune = true;
                me.refresh();
                me.preventPrune = false;
            } else {
                // Just remove the elements which corresponds to the removed records
                // The tpl's full HTML will still be in place.
                if (fireItemRemove) {
                    nodes = [];
                }
                for (i = records.length - 1; i >= 0; --i) {
                    record = records[i];
                    currIdx = index + i;
                    if (nodes) {
                        node = rows.item(currIdx);
                        nodes[i] = node ? node.dom : undefined;
                    }
                    
                    if (rows.item(currIdx)) {
                        me.doRemove(record, currIdx);
                    }
                }

                if (fireItemRemove) {
                    me.fireEvent('itemremove', records, index, nodes, me);
                }
                me.updateIndexes(index);
            }

            // Ensure layout system knows about new content size
            me.refreshSizePending = true;
        }
    },

    // private
    doRemove: function(record, index) {
        this.all.removeElement(index, true);
    },

    /**
     * Refreshes an individual node's data from the store.
     * @param {Ext.data.Model/Number} record The record or index of the record to update.
     * @since 2.3.0
     */
    refreshNode : function(record) {
        if (Ext.isNumber(record)) {
            record = this.store.getAt(record);
        }
        this.onUpdate(this.dataSource, record);
    },

    // private
    updateIndexes : function(startIndex, endIndex) {
        var nodes = this.all.elements,
            records = this.getViewRange(),
            i;

        startIndex = startIndex || 0;
        endIndex = endIndex || ((endIndex === 0) ? 0 : (nodes.length - 1));
        for (i = startIndex; i <= endIndex; i++) {
            nodes[i].viewIndex = i;
            nodes[i].viewRecordId = records[i].internalId;
            if (!nodes[i].boundView) {
                nodes[i].boundView = this.id;
            }
        }
    },

    /**
     * Returns the store associated with this DataView.
     * @return {Ext.data.Store} The store
     */
    getStore : function() {
        return this.store;
    },

    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     * @since 3.4.0
     */
    bindStore: function(store, initial, propName) {
        var me = this;
        me.mixins.storeholder.bindStore.apply(me, arguments);

        // Bind the store to our selection model unless it's the initial bind.
        // Initial bind takes place afterRender
        if (!initial) {
            me.getSelectionModel().bindStore(store);
        }

        // If we have already achieved our first layout, refresh immediately.
        // If we have bound to the Store before the first layout, then onBoxReady will
        // call doFirstRefresh
        if (me.componentLayoutCounter) {
            me.doFirstRefresh(store);
        }
    },

    /**
     * @private
     * Perform the first refresh of the View from a newly bound store.
     *
     * This is called when this View has been sized for the first time.
     */
    doFirstRefresh: function(store, noDefer) {
        var me = this;

        // If we are configured to defer, and *NOT* called from the defer call below
        if (me.deferInitialRefresh && !noDefer) {
            Ext.defer(me.doFirstRefresh, 1, me, [store, true]);
        }

        else {
            // 4.1.0: If we have a store, and the Store is *NOT* already loading (a refresh is on the way), then
            // on first layout, refresh regardless of record count.
            // Template may contain boilerplate HTML outside of record iteration loop.
            // Also, emptyText is appended by the refresh method.
            if (store && !store.loading) {
                me.refresh();
            }
        }
    },

    onUnbindStore: function(store) {
        this.setMaskBind(null);
    },

    onBindStore: function(store, initial, propName) {
        var me = this;

        me.setMaskBind(store);
        // After the oldStore (.store) has been unbound/bound,
        // do the same for the old data source (.dataSource).
        if (!initial && propName === 'store') {
            // Block any refresh, since this means we're binding the store, which will kick off
            // a refresh.
            me.preventRefresh = true;
            // Ensure we have the this.store reference set correctly.
            me.store = store;
            me.bindStore(store, false, 'dataSource');
            me.preventRefresh = false;
        }
    },

    setMaskBind: function(store) {
        var mask = this.loadMask;
        if (mask && mask.bindStore) {
            mask.bindStore(store);
        }
    },

    getStoreListeners: function() {
        var me = this;
        return {
            refresh: me.onDataRefresh,
            replace: me.onReplace,
            add: me.onAdd,
            remove: me.onRemove,
            update: me.onUpdate,
            clear: me.refresh,
            beginupdate: me.onBeginUpdate,
            endupdate: me.onEndUpdate
        };
    },
    
    onBeginUpdate: Ext.emptyFn,
    
    onEndUpdate: function() {
        if (this.refreshSizePending) {
            this.refreshSize(true);
            this.refreshSizePending = false;
        }
    },

    /**
     * @private
     * Calls this.refresh if this.blockRefresh is not true
     * @since 3.4.0
     */
    onDataRefresh: function() {
        this.refreshView();
    },

    refreshView: function() {
        var me = this,
            // If we have an ancestor in a non-boxready state (collapsed or in-transition, or hidden), then block the
            // refresh because the next layout will trigger the refresh
            blocked = me.blockRefresh || !me.rendered || me.up('[collapsed],[isCollapsingOrExpanding],[hidden]');

        // If we are blocked in any way due to either a setting, or hidden or collapsed, or animating ancestor, then
        // the next refresh attempt at the upcoming layout must not defer.
        if (blocked) {
            me.refreshNeeded = true;
        } else {
            if (me.bufferedRenderer && me.all.getCount()) {
                me.bufferedRenderer.refreshView();
            } else {
                me.refresh();
            }
        }
    },

    /**
     * Returns the template node the passed child belongs to, or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemByChild: function(node){
        return Ext.fly(node).findParent(this.getItemSelector(), this.getTargetEl());
    },

    /**
     * Returns the template node by the Ext.event.Event or null if it is not found.
     * @param {Ext.event.Event} e
     */
    findTargetByEvent: function(e) {
        return e.getTarget(this.getItemSelector(), this.getTargetEl());
    },


    /**
     * Gets the currently selected nodes.
     * @return {HTMLElement[]} An array of HTMLElements
     * @since 2.3.0
     */
    getSelectedNodes: function(){
        var nodes   = [],
            records = this.selModel.getSelection(),
            ln = records.length,
            i  = 0;

        for (; i < ln; i++) {
            nodes.push(this.getNode(records[i]));
        }

        return nodes;
    },

    /**
     * Gets an array of the records from an array of nodes
     * @param {HTMLElement[]} nodes The nodes to evaluate
     * @return {Ext.data.Model[]} records The {@link Ext.data.Model} objects
     * @since 2.3.0
     */
    getRecords: function(nodes) {
        var records = [],
            i = 0,
            len = nodes.length,
            data = this.dataSource.data;

        for (; i < len; i++) {
            records[records.length] = data.getByKey(nodes[i].viewRecordId);
        }

        return records;
    },

    /**
     * Gets a record from a node
     * @param {Ext.dom.Element/HTMLElement} node The node to evaluate
     *
     * @return {Ext.data.Model} record The {@link Ext.data.Model} object
     * @since 2.3.0
     */
    getRecord: function(node){
        return this.dataSource.getByInternalId(Ext.getDom(node).viewRecordId);
    },


    /**
     * Returns true if the passed node is selected, else false.
     * @param {HTMLElement/Number/Ext.data.Model} node The node, node index or record to check
     * @return {Boolean} True if selected, else false
     * @since 2.3.0
     */
    isSelected : function(node) {
        // TODO: El/Idx/Record
        var r = this.getRecord(node);
        return this.selModel.isSelected(r);
    },

    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to false to not fire a select event
     * @deprecated 4.0 Use {@link Ext.selection.Model#select} instead.
     * @since 2.3.0
     */
    select: function(records, keepExisting, suppressEvent) {
        this.selModel.select(records, keepExisting, suppressEvent);
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} suppressEvent Set to false to not fire a deselect event
     * @since 2.3.0
     */
    deselect: function(records, suppressEvent) {
        this.selModel.deselect(records, suppressEvent);
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo An HTMLElement template node, index of a template node,
     * the id of a template node or the record associated with the node.
     * @return {HTMLElement} The node or null if it wasn't found
     * @since 2.3.0
     */
    getNode : function(nodeInfo) {
        if ((!nodeInfo && nodeInfo !== 0) || !this.rendered) {
            return null;
        }

        // An event
        if (nodeInfo.target) {
            nodeInfo = nodeInfo.target;
        }
        // An id
        if (Ext.isString(nodeInfo)) {
            return document.getElementById(nodeInfo);
        }
        // Row index
        if (Ext.isNumber(nodeInfo)) {
            return this.all.elements[nodeInfo];
        }
        // Record
        if (nodeInfo.isModel) {
            return this.getNodeByRecord(nodeInfo);
        }
        return Ext.fly(nodeInfo).findParent(this.itemSelector, this.getTargetEl()); // already an HTMLElement
    },

    /**
     * @private
     */
    getNodeByRecord: function(record) {
        var ns = this.all.elements,
            ln = ns.length,
            i = 0;

        for (; i < ln; i++) {
            if (ns[i].viewRecordId === record.internalId) {
                return ns[i];
            }
        }

        return null;
    },

    /**
     * Gets a range nodes.
     * @param {Number} start (optional) The index of the first node in the range
     * @param {Number} end (optional) The index of the last node in the range
     * @return {HTMLElement[]} An array of nodes
     * @since 2.3.0
     */
    getNodes: function(start, end) {
        var all = this.all;

        if (end !== undefined) {
            end++;
        }
        return all.slice(start, end);
    },

    /**
     * Finds the index of the passed node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo An HTMLElement template node, index of a template node, the id of a template node
     * or a record associated with a node.
     * @return {Number} The index of the node or -1
     * @since 2.3.0
     */
    indexOf: function(node) {
        node = this.getNode(node);
        if (!node && node !== 0) {
            return -1;
        }
        if (Ext.isNumber(node.viewIndex)) {
            return node.viewIndex;
        }
        return this.all.indexOf(node);
    },

    onDestroy : function() {
        var me = this;

        me.all.clear();
        me.emptyEl = null;
        me.callParent();
        me.bindStore(null);
        Ext.destroy(me.selModel, me.scrollManager);
    },

    // invoked by the selection model to maintain visual UI cues
    onItemSelect: function(record) {
        var node = this.getNode(record);

        if (node) {
            Ext.fly(node).addCls(this.selectedItemCls);
        }
    },

    // invoked by the selection model to maintain visual UI cues
    onItemDeselect: function(record) {
        var node = this.getNode(record);

        if (node) {
            Ext.fly(node).removeCls(this.selectedItemCls);
        }
    },

    getItemSelector: function() {
        return this.itemSelector;
    },

    /**
     * Adds a CSS Class to a specific item.
     * @param {HTMLElement/String/Number/Ext.data.Model} itemInfo An HTMLElement, index or instance of a model
     * representing this item
     * @param {String} cls
     */
    addItemCls: function(itemInfo, cls) {
        var item = this.getNode(itemInfo);
        if (item) {
            Ext.fly(item).addCls(cls);
        }
    },

    /**
     * Removes a CSS Class from a specific item.
     * @param {HTMLElement/String/Number/Ext.data.Model} itemInfo An HTMLElement, index or instance of a model
     * representing this item
     * @param {String} cls
     */
    removeItemCls: function(itemInfo, cls) {
        var item = this.getNode(itemInfo);
        if (item) {
            Ext.fly(item).removeCls(cls);
        }
    },

    privates: {
        getOverflowEl: function() {
            // The desired behavior here is just to inherit from the superclass.  However,
            // the superclass method calls this.getTargetEl, which sends us into an infinte
            // loop because our getTargetEl may call getScrollerEl(), which calls getOverflowEl()
            return Ext.Component.prototype.getTargetEl.call(this);
        },

        getTargetEl: function() {
            return this.touchScroll ? this.getScrollerEl() : this.callParent();
        }
    }
}, function() {
    // all of this information is available directly
    // from the SelectionModel itself, the only added methods
    // to DataView regarding selection will perform some transformation/lookup
    // between HTMLElement/Nodes to records and vice versa.
    Ext.deprecate('extjs', '4.0', function() {
        Ext.view.AbstractView.override({
            /**
             * @cfg {Boolean} [multiSelect=false]
             * True to allow selection of more than one item at a time, false to allow selection of only a single item
             * at a time or no selection at all, depending on the value of {@link #singleSelect}.
             * @deprecated 4.0 Use {@link Ext.selection.Model#mode} 'MULTI' instead.
             * @since 2.3.0
             */
            /**
             * @cfg {Boolean} [singleSelect]
             * Allows selection of exactly one item at a time. As this is the default selection mode anyway, this config
             * is completely ignored.
             * @removed 4.0 Use {@link Ext.selection.Model#mode} 'SINGLE' instead.
             * @since 2.3.0
             */
            /**
             * @cfg {Boolean} [simpleSelect=false]
             * True to enable multiselection by clicking on multiple items without requiring the user to hold Shift or Ctrl,
             * false to force the user to hold Ctrl or Shift to select more than on item.
             * @deprecated 4.0 Use {@link Ext.selection.Model#mode} 'SIMPLE' instead.
             * @since 2.3.0
             */

            /**
             * Gets the number of selected nodes.
             * @return {Number} The node count
             * @deprecated 4.0 Use {@link Ext.selection.Model#getCount} instead.
             * @since 2.3.0
             */
            getSelectionCount : function(){
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: getSelectionCount will be removed, please interact with the Ext.selection.DataViewModel");
                }
                return this.selModel.getSelection().length;
            },

            /**
             * Gets an array of the selected records
             * @return {Ext.data.Model[]} An array of {@link Ext.data.Model} objects
             * @deprecated 4.0 Use {@link Ext.selection.Model#getSelection} instead.
             * @since 2.3.0
             */
            getSelectedRecords : function(){
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: getSelectedRecords will be removed, please interact with the Ext.selection.DataViewModel");
                }
                return this.selModel.getSelection();
            },

            // documented above
            // @ignore
            select: function(records, keepExisting, supressEvents) {
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()");
                }
                var sm = this.getSelectionModel();
                return sm.select.apply(sm, arguments);
            },

            /**
             * Deselects all selected records.
             * @deprecated 4.0 Use {@link Ext.selection.Model#deselectAll} instead.
             * @since 2.3.0
             */
            clearSelections: function() {
                if (Ext.global.console) {
                    Ext.global.console.warn("DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()");
                }
                var sm = this.getSelectionModel();
                return sm.deselectAll();
            }
        });
    });
});
