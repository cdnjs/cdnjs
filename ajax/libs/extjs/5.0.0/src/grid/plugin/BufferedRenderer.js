/**
 * @private
 * Implements buffered rendering of a grid, allowing users to scroll
 * through thousands of records without the performance penalties of
 * renderering all the records into the DOM at once.
 *
 * The number of rows rendered outside the visible area can be controlled by configuring the plugin.
 *
 * Users should not instantiate this class. It is instantiated automatically
 * and applied to all grids.
 *
 * ## Implementation notes
 *
 * This class monitors scrolling of the {@link Ext.view.Table
 * TableView} within a {@link Ext.grid.Panel GridPanel} to render a small section of
 * the dataset.
 *
 */
Ext.define('Ext.grid.plugin.BufferedRenderer', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.bufferedrenderer',

    /**
     * @property {Boolean} isBufferedRenderer
     * `true` in this class to identify an object as an instantiated BufferedRenderer, or subclass thereof.
     */
    isBufferedRenderer: true,

    lockableScope: 'both',

    /**
     * @cfg {Number}
     * The zone which causes new rows to be appended to the view. As soon as the edge
     * of the rendered grid is this number of rows from the edge of the viewport, the view is moved.
     */
    numFromEdge: 2,

    /**
     * @cfg {Number}
     * The number of extra rows to render on the trailing side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    trailingBufferZone: 10,

    /**
     * @cfg {Number}
     * The number of extra rows to render on the leading side of scrolling
     * **outside the {@link #numFromEdge}** buffer as scrolling proceeds.
     */
    leadingBufferZone: 20,

    /**
     * @cfg {Boolean} [synchronousRender=true]
     * By default, on detection of a scroll event which brings the end of the rendered table within
     * `{@link #numFromEdge}` rows of the grid viewport, if the required rows are available in the Store,
     * the BufferedRenderer will render rows from the Store *immediately* before returning from the event handler.
     * This setting helps avoid the impression of whitespace appearing during scrolling.
     *
     * Set this to `false` to defer the render until the scroll event handler exits. This allows for faster
     * scrolling, but also allows whitespace to be more easily scrolled into view.
     *
     */
    synchronousRender: true,

    /**
     * @cfg {Number}
     * This is the time in milliseconds to buffer load requests when the store is a {@link Ext.data.BufferedStore buffered store}
     * and a page required for rendering is not present in the store's cache and needs loading.
     */
    scrollToLoadBuffer: 200,

    // private. Initial value of 100.
    viewSize: 100,
    // private. Start at default value
    rowHeight: 21,
    /**
     * @property {Number} position
     * Current pixel scroll position of the associated {@link Ext.view.Table View}.
     */
    position: 0,
    lastScrollDirection: 1,
    bodyTop: 0,
    scrollHeight: 0,

    // Initialize this as a plugin
    init: function(grid) {
        var me = this,
            view = grid.view,
            viewListeners = {
                scroll: me.onViewScroll,
                resize: me.onViewResize,
                refresh: me.onViewRefresh,
                columnschanged: me.checkVariableRowHeight,
                scope: me,
                destroyable: true
            };

        // If we are going to be handling a NodeStore then it's driven by node addition and removal, *not* refreshing.
        // The view overrides required above change the view's onAdd and onRemove behaviour to call onDataRefresh when necessary.
        if (grid.isTree || grid.ownerLockable && grid.ownerLockable.isTree) {
            view.blockRefresh = false;
            view.loadMask = true;
        }
        if (view.positionBody) {
            viewListeners.refresh = me.onViewRefresh;
        }
        me.grid = grid;
        me.view = view;
        me.isRTL = view.getInherited().rtl;
        view.bufferedRenderer = me;
        view.preserveScrollOnRefresh = true;
        view.animate = false;

        me.bindStore(view.dataSource);

        // Use a configured rowHeight in the view
        if (view.hasOwnProperty('rowHeight')) {
            me.rowHeight = view.rowHeight;
        }

        me.position = 0;

        me.gridListeners = grid.on('reconfigure', me.onReconfigure, me);
        me.viewListeners = view.on(viewListeners);
    },

    // Keep the variableRowHeight and any Lockable's syncRowHeight property correct WRT variable row heights being possible.
    checkVariableRowHeight: function() {
        var me = this,
            grid = me.grid;

        me.variableRowHeight = me.view.hasVariableRowHeight();
        if (grid.ownerLockable) {
            grid.ownerLockable.syncRowHeight = me.variableRowHeight;
        }
    },

    bindStore: function (store) {
        var me = this,
            view = me.view,
            dataSource = view.dataSource,
            hasFeatureStore = dataSource && dataSource.isFeatureStore;

        // Don't bind the new store if it's not the same type of store as what the plugin was initialized with.
        // For example, the plugin is initialized with a GroupStore if it has a grouping feature. Then,
        // grid.reconfigure() is called, passing in a new data store here. This would be a problem, so if the
        // store to bind isn't the same type as the currently bound store, then don't allow it.
        //
        // Note that the feature should have a reconfigure listener that will bind and process the new store so
        // skipping this doesn't mean that the new store isn't processed, it just happens elsewhere.
        if (hasFeatureStore === store.isFeatureStore) {
            if (me.store) {
                me.unbindStore();
            }
            me.storeListeners = store.on({
                scope: me,
                groupchange: me.onStoreGroupChange,
                clear: me.onStoreClear,
                destroyable: true
            });
            me.store = store;
        }

        // If the view has acquired a size, calculate a new view size and scroll range when the store changes.
        if (me.view.componentLayout.layoutCount) {
            me.onViewResize(me.view, 0, me.view.getHeight());
        }
    },

    onReconfigure: function(grid, store){
        if (store && store !== this.store) {
            this.bindStore(store);
        }
    },

    unbindStore: function() {
        this.storeListeners.destroy();
        this.store = null;
    },

    onStoreClear: function() {
        var me = this,
            view = me.view;

        // Do not do anything if view is not rendered, or if the reason for cache clearing is store destruction
        if (view.rendered && !me.store.isDestroyed) {

            if (me.scrollTop !== 0) {
                // Zero position tracker so that next scroll event will not trigger any action
                me.bodyTop = me.scrollTop = me.position = me.scrollHeight = 0;
                me.view.setScrollY(0);
            }

            me.lastScrollDirection = me.scrollOffset = null;

            // MUST delete, not null out because the calculation checks hasOwnProperty.
            // Unless we have a configured rowHeight
            if (!view.hasOwnProperty('rowHeight')) {
                delete me.rowHeight;
            }
        }
    },

    // If the store is not grouped, we can switch to fixed row height mode
    onStoreGroupChange: function(store) {
        var me = this;

        delete me.rowHeight;
        me.stretchView(me.view, me.getScrollHeight());
    },

    onViewRefresh: function() {
        var me = this,
            view = me.view,
            oldScrollHeight = me.scrollHeight,
            scrollHeight;

        // Recheck the variability of row height in the view.
        me.checkVariableRowHeight();

        // The first refresh on the leading edge of the initial layout will mean that the
        // View has not had the sizes of flexed columns calculated and flushed yet.
        // So measurement of DOM height for calculation of an approximation of the variableRowHeight would be premature.
        if (me.variableRowHeight && !view.componentLayoutCounter) {
            view.on({
                boxready: me.onViewRefresh,
                scope: me,
                single: true
            });
            return;
        }

        // View has rows, delete the rowHeight property to trigger a recalculation when scrollRange is calculated
        if (!view.hasOwnProperty('rowHeight') && view.all.getCount()) {
            // We need to calculate the table size based upon the new viewport size and current row height
            // It tests hasOwnProperty so must delete the property to make it recalculate.
            delete me.rowHeight;
        }

        // Calculates scroll range. Also calculates rowHeight if we do not have an own rowHeight property.
        // That will be the case if the view contains some rows.
        scrollHeight = me.getScrollHeight();

        if (scrollHeight != oldScrollHeight) {
            me.stretchView(view, scrollHeight);
        }

        // If we are instigating the refresh, we must only update the stretcher.
        if (me.refreshing) {
            return;
        }

        if (me.scrollTop !== view.getScrollY()) {
            // The view may have refreshed and scrolled to the top, for example
            // on a sort. If so, it's as if we scrolled to the top, so we'll simulate
            // it here.
            me.onViewScroll();
        } else {
            if (!me.hasOwnProperty('bodyTop')) {
                me.bodyTop = view.all.startIndex * me.rowHeight;
                view.setScrollY(me.bodyTop);
            }
            me.setBodyTop(me.bodyTop);

            // With new data, the height may have changed, so recalculate the rowHeight and viewSize.
            // Do it AFTER the current refresh cycle so as not to corrupt the DOM the refresh is expecting to be processing.
            if (view.all.getCount()) {
                Ext.on({
                    idle: function() {
                        if (!view.isDestroyed) {
                            me.onViewResize(view, null, view.getHeight());
                        }
                    },
                    single: true
                });
            }
        }
    },

    onViewResize: function(view, width, height, oldWidth, oldHeight) {
        var me = this,
            newViewSize;

        // So we can set correct top position to position the data rows regardless of any top border
        me.tableTopBorderWidth = view.body.getBorderWidth('t');

        // Only process first layout (the boxready event) or height resizes.
        if (!oldHeight || height !== oldHeight) {

            // Recalculate the view size in rows now that the grid view has changed height
            newViewSize = Math.ceil(height / me.rowHeight) + me.trailingBufferZone + me.leadingBufferZone;
            me.viewSize = me.setViewSize(newViewSize);
            me.viewClientHeight = view.el.dom.clientHeight;
        }
    },

    stretchView: function(view, scrollRange) {
        var me = this,
            recordCount = (me.store.isBufferedStore ? me.store.getTotalCount() : me.store.getCount()),
            el = view.getTargetEl(),
            stretcherSpec;

        // Ensure that both the scroll range AND the positioned view body are in the viewable area.
        if (me.scrollTop > scrollRange) {
            me.position = me.scrollTop = scrollRange - view.body.dom.offsetHeight;
            me.view.setScrollY(me.scrollTop);
        }
        if (me.bodyTop > scrollRange) {
            view.body.translate(null, me.bodyTop = me.position);
        }

        // Touch scrolling: tell the scroller what the scroll size is
        if (view.scrollManager) {
            view.scrollManager.scroller.setSize({
                x: view.headerCt.getTableWidth(),
                y: scrollRange
            });
            view.scrollManager.refresh();
        }

        // If this system shows scrollbars, create a stretcher element
        if (!view.scrollManager || Ext.supports.touchScroll === 1) {
            if (!me.stretcher) {
                el = view.getTargetEl();

                // If the view has already been refreshed by the time we get here (eg, the grid, has undergone a reconfigure operation - which performs a refresh),
                // keep it informed of fixed nodes which it must leave alone on refresh.
                if (view.refreshCounter) {
                    view.fixedNodes++;
                }
                stretcherSpec = {
                    style: {
                        width: '1px',
                        height: '1px',
                        'marginTop': (scrollRange - 1) + 'px',
                        position: 'absolute'
                    }
                };
                stretcherSpec.style[me.isRTL ? 'right' : 'left'] = 0;
                me.stretcher = el.createChild(stretcherSpec, el.dom.firstChild);

            }

            // If the view size has been set on this instance, and the rendered view size does not exceed it, hide the stretcher
            if (me.hasOwnProperty('viewSize') && recordCount <= me.viewSize) {
                me.stretcher.dom.style.display = 'none';
            } else {
                me.stretcher.dom.style.marginTop = (scrollRange - 1) + 'px';
                me.stretcher.dom.style.display = '';
            }
        }
    },

    setViewSize: function(viewSize) {
        if (viewSize !== this.viewSize) {

            // Must be set for getFirstVisibleRowIndex to work
            this.scrollTop = this.view.getScrollY();

            var me = this,
                store = me.store,
                view = me.view,
                rows = view.all,
                elCount = rows.getCount(),
                start, end,
                lockingPartner = me.view.lockingPartner && me.view.lockingPartner.bufferedRenderer;

            me.viewSize = viewSize;
            if (store.isBufferedStore) {
                store.setViewSize(viewSize);
            }

            // If a store loads before we have calculated a viewSize, it loads me.defaultViewSize records.
            // This may be larger or smaller than the final viewSize so the store needs adjusting when the view size is calculated.
            if (elCount) {
                start = view.all.startIndex;
                    end = Math.min(start + viewSize - 1, (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1);

                // Only do expensive refresh if range is not already correct
                if (!(start === rows.startIndex && end === rows.endIndex)) {
                    // While rerendering our range, the locking partner must not sync
                    if (lockingPartner) {
                        lockingPartner.disable();
                    }
                    view.clearViewEl(true);
                    me.renderRange(start, end);
                    if (lockingPartner) {
                        lockingPartner.enable();
                    }
                }
            }
        }
        return viewSize;
    },

    // @private
    // TableView's getViewRange delegates the operation to this method if buffered rendering is present.
    getViewRange: function() {
        var me = this,
            rows = me.view.all,
            store = me.store,
            startIndex = 0;

        // If there already is a view range, then the startIndex from that
        if (rows.getCount()) {
            startIndex = rows.startIndex;
        }
        // Otherwise use start index of current page.
        // https://sencha.jira.com/browse/EXTJSIV-10724
        // Buffered store may be primed with loadPage(n) call rather than autoLoad which starts at index 0.
        else if (store.isBufferedStore) {
            if (!store.currentPage) {
                store.currentPage = 1;
            }
            startIndex = rows.startIndex = (store.currentPage - 1) * (store.pageSize || 1);

            // The RowNumberer uses the current page to offset the record index, so when buffered, it must always be on page 1
            store.currentPage = 1;
        }

        if (store.data.getCount()) {
            return store.getRange(startIndex, startIndex + me.viewSize - 1);
        } else {
            return [];
        }
    },

    /**
     * @private
     * Handles the Store replace event, producing a correct buffered view after the replace operation.
     */
    onReplace: function(store, startIndex, oldRecords, newRecords) {
        var me = this,
            view = me.view,
            rows = view.all,
            renderedSize = rows.getCount(),
            storeSize = store.getCount(),
            // Cache top row. If we add rows above it, we'll need to know the height added.
            oldTop = rows.first(true);

        // Only need to change display if the view is currently empty, or
        // change zone was NOT after the end of rendered view or
        // it's an add and the rendered view is not full size yet.
        if (!renderedSize || startIndex <= rows.endIndex || (renderedSize < me.viewSize && newRecords.length > oldRecords.length) || storeSize < renderedSize) {
            me.refreshView();
            renderedSize = rows.getCount();

            // If it was a removal, we may need to adjust the view
            if (newRecords.length < oldRecords.length) {
                storeSize = store.isBufferedStore ? store.getTotalCount() : storeSize;

                // If we had to render less than viewSize because the dataset shrinkage pulled the last record to be the
                // last rendered row, "repair" the viewSize by adding records at the top.
                if (rows.endIndex === storeSize - 1 && renderedSize < me.viewSize && renderedSize < storeSize) {
                    rows.scroll(store.getRange(Math.max(0, storeSize - me.viewSize), rows.startIndex - 1), -1, 0);
                    if (storeSize > me.viewSize) {
                        me.setBodyTop(me.bodyTop - oldTop.offsetTop);
                    }
                }

                // Total is so small, there's no need for a stretcher any more and view is fixed at the top.
                if (storeSize <= me.viewSize) {
                    if (me.stretcher) {
                        me.setBodyTop(0);
                        me.stretcher.dom.style.display = 'none';
                    }
                }

                // The view was stranded out of the end of the scroll range, position it back
                else if (me.bodyTop + view.body.dom.offsetHeight - 1 > me.scrollHeight) {
                    me.setBodyTop(me.scrollHeight - (view.body.dom.offsetHeight - 1));
                }
            }
        }
        // Even if we do not refresh, the scroll range has to be kept up to date by the refresh handler.
        else {
            me.refreshing = true;
            me.onViewRefresh();
            me.refreshing = true;
        }
    },

    /**
     * Scrolls to and optionlly selects the specified row index **in the total dataset**.
     *
     * @param {Number} recordIdx The zero-based position in the dataset to scroll to.
     * @param {Boolean} doSelect Pass as `true` to select the specified row.
     * @param {Function} callback A function to call when the row has been scrolled to.
     * @param {Number} callback.recordIdx The resulting record index (may have changed if the passed index was outside the valid range).
     * @param {Ext.data.Model} callback.record The resulting record from the store.
     * @param {Object} scope The scope (`this` reference) in which to execute the callback. Defaults to this BufferedRenderer.
     *
     */
    scrollTo: function(recordIdx, doSelect, callback, scope) {
        var me = this,
            view = me.view,
            viewDom = view.el.dom,
            store = me.store,
            total = store.isBufferedStore ? store.getTotalCount() : store.getCount(),
            startIdx, endIdx,
            targetRec,
            targetRow,
            tableTop,
            groupingFeature,
            group,
            record;

        // If we have a grouping summary feature rendering the view in groups,
        // first, ensure that the record's group is expanded,
        // then work out which record in the groupStore the record is at.
        if ((groupingFeature = view.dataSource.groupingFeature) && (groupingFeature.collapsible !== false)) {

            // Sanitize the requested record
            recordIdx = Math.min(Math.max(recordIdx, 0), view.store.getCount() - 1);
            record = view.store.getAt(recordIdx);
            group = groupingFeature.getGroup(record);

            if (group.isCollapsed) {
                groupingFeature.expand(group.getGroupKey());
                total = store.isBufferedStore ? store.getTotalCount() : store.getCount();
            }

            // Get the index in the GroupStore
            recordIdx = groupingFeature.indexOf(record);

        } else {

            // Sanitize the requested record
            recordIdx = Math.min(Math.max(recordIdx, 0), total - 1);
        }

        // Calculate view start index
        startIdx = Math.max(Math.min(recordIdx - (Math.floor((me.leadingBufferZone + me.trailingBufferZone) / 2)), total - me.viewSize + 1), 0);
        tableTop = Math.max(startIdx * me.rowHeight - me.tableTopBorderWidth, 0);
        endIdx = Math.min(startIdx + me.viewSize - 1, total - 1);

        store.getRange(startIdx, endIdx, {
            callback: function(range, start, end) {

                me.renderRange(start, end, true);

                targetRec = store.data.getRange(recordIdx, recordIdx + 1)[0];
                targetRow = view.getNode(targetRec);
                
                // tableTop property must track the translated position of the body
                view.body.translate(null, me.bodyTop = tableTop);
                me.position = me.scrollTop = tableTop = Math.min(Math.max(0, tableTop - view.body.getOffsetsTo(targetRow)[1]), viewDom.scrollHeight - viewDom.clientHeight);
                view.setScrollY(tableTop);

                // https://sencha.jira.com/browse/EXTJSIV-7166 IE 6, 7 and 8 won't scroll all the way down first time
                if (Ext.isIE) {
                    view.setScrollY(tableTop);
                }
                if (doSelect) {
                    view.selModel.select(targetRec);
                }
                if (callback) {
                    callback.call(scope||me, recordIdx, targetRec);
                }
            }
        });
    },

    onViewScroll: function() {
        var me = this,
            store = me.store,
            totalCount = (store.isBufferedStore ? store.getTotalCount() : store.getCount()),
            vscrollDistance,
            scrollDirection,
            scrollTop = me.scrollTop = me.view.getScrollY(),
            scrollHandled = false,
            lockingPartner = me.view.lockingPartner && me.view.lockingPartner.bufferedRenderer;

        // Only check for nearing the edge if we are enabled, and if there is overflow beyond our view bounds.
        // If there is no paging to be done (Store's dataset is all in memory) we will be disabled.
        if (!(me.disabled || totalCount < me.viewSize)) {

            vscrollDistance = scrollTop - me.position;
            scrollDirection = vscrollDistance > 0 ? 1 : -1;

            // Moved at leat 20 pixels, or changed direction, so test whether the numFromEdge is triggered
            if (Math.abs(vscrollDistance) >= 20 || (scrollDirection !== me.lastScrollDirection)) {
                me.lastScrollDirection = scrollDirection;
                scrollHandled = me.handleViewScroll(me.lastScrollDirection);
            }
        }

        // Keep other side synced immediately if there was no rendering work to do.
        if (!scrollHandled) {
            if (lockingPartner && lockingPartner.scrollTop !== scrollTop) {
                // Set the lockingPartner's position so that it sees no work to do on receipt of the subsequent scroll event
                lockingPartner.view.setScrollY(lockingPartner.position = scrollTop);
            }
        }
    },

    handleViewScroll: function(direction) {
        var me              = this,
            rows            = me.view.all,
            store           = me.store,
            viewSize        = me.viewSize,
            lastItemIndex   = (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1,
            requestStart,
            requestEnd;

        // We're scrolling up
        if (direction == -1) {

            // If table starts at record zero, we have nothing to do
            if (rows.startIndex) {
                if (me.topOfViewCloseToEdge()) {
                    requestStart = Math.max(0, me.getLastVisibleRowIndex() + me.trailingBufferZone - viewSize);
                }
            }
        }
        // We're scrolling down
        else {

            // If table ends at last record, we have nothing to do
            if (rows.endIndex < lastItemIndex) {
                if (me.bottomOfViewCloseToEdge()) {
                    requestStart = Math.max(0, me.getFirstVisibleRowIndex() - me.trailingBufferZone);
                }
            }
        }

        // We scrolled close to the edge and the Store needs reloading
        if (requestStart != null) {
            requestEnd = Math.min(requestStart + viewSize - 1, lastItemIndex);

            // viewSize was calculated too small due to small sample row count with some skewed
            // item height in there such as a tall group header item. Extend the view size in this case.
            if (me.variableRowHeight && requestEnd === rows.endIndex && requestEnd < lastItemIndex) {
                requestEnd++;

                // Do NOT call setViewSize - that rerenders the view at the new size,
                // and we are just about to scroll it to correct it.
                me.viewSize = viewSize++;
                if (store.isBufferedStore) {
                    store.setViewSize(me.viewSize);
                }
            }

            // If calculated view range has moved, then render it and return the fact that the scroll was handled.
            if (requestStart !== rows.startIndex || requestEnd !== rows.endIndex) {
                me.renderRange(requestStart, requestEnd);
                return true;
            }
        }
    },

    bottomOfViewCloseToEdge: function() {
        var me = this;

        if (me.variableRowHeight) {
            return me.bodyTop + me.view.body.dom.offsetHeight < me.scrollTop + me.view.lastBox.height + (me.numFromEdge * me.rowHeight);
        } else {
            return (me.view.all.endIndex - me.getLastVisibleRowIndex()) < me.numFromEdge;
        }
    },

    topOfViewCloseToEdge: function() {
        var me = this;

        if (me.variableRowHeight) {
            // The body top position is within the numFromEdge zone
            return me.bodyTop > me.scrollTop - (me.numFromEdge * me.rowHeight);
        } else {
            return (me.getFirstVisibleRowIndex() - me.view.all.startIndex) < me.numFromEdge;
        }
    },

    /**
     * @private
     * Refreshes the current rendered range if possible.
     * Optinally refreshes starting at the specified index.
     */
    refreshView: function(startIndex) {
        var me = this,
            rows = me.view.all,
            store = me.store,
            maxIndex = (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1,
            endIndex;

        // New start index should be current start index unless that's now too close to the end of the store
        // to yield a full view, in which case work back from the end of the store. If working back from the end, the leading buffer zone
        // cannot be rendered, so subtract it from the view size.
        // Ensure we don't go negative.
        startIndex = Math.max(0, Math.min(startIndex == null ? rows.startIndex : startIndex, maxIndex - (me.viewSize - me.leadingBufferZone) + 1));

        // New end index works forward from the new start index enduring we don't walk off the end    
        endIndex = Math.min(rows.startIndex + me.viewSize - 1, maxIndex);

        store.getRange(startIndex, endIndex, {
            callback: me.doRefreshView,
            scope: me
        });
    },

    doRefreshView: function(range, startIndex, endIndex, options) {
        var me = this,
            view = me.view,
            rows = view.all,
            prevRowCount = rows.getCount(),
            newNodes;

        if (view.refreshCounter) {
            // So that listeners to the itemremove events know that its because of a refresh.
            // And so that this class's refresh listener knows to ignore it.
            view.refreshing = me.refreshing = true;

            view.clearViewEl(true);
            if (range.length) {
                newNodes = view.doAdd(range, startIndex);
                view.refreshSize(rows.getCount() !== prevRowCount);
                view.fireEvent('refresh', view, range);
            }
            view.selModel.onLastFocusChanged(null, view.selModel.lastFocused, true);
            view.refreshNeeded = view.refreshing = me.refreshing = false;
        } else {
            view.refresh();
        }
    },

    renderRange: function(start, end, forceSynchronous) {
        var me = this,
            rows = me.view.all,
            store = me.store;

        // Skip if we are being asked to render exactly the rows that we already have.
        // This can happen if the viewSize has to be recalculated (due to either a data refresh or a view resize event)
        // but the calculated size ends up the same.
        if (!(start === rows.startIndex && end === rows.endIndex)) {

            // If range is avaliable synchronously, process it now.
            if (store.rangeCached(start, end)) {
                me.cancelLoad();

                if (me.synchronousRender || forceSynchronous) {
                    me.onRangeFetched(null, start, end);
                } else {
                    if (!me.renderTask) {
                        me.renderTask = new Ext.util.DelayedTask(me.onRangeFetched, me, null, false);
                    }
                    // Render the new range very soon after this scroll event handler exits.
                    // If scrolling very quickly, a few more scroll events may fire before
                    // the render takes place. Each one will just *update* the arguments with which
                    // the pending invocation is called.
                    me.renderTask.delay(1, null, null, [null, start, end]);
                }
            }

            // Required range is not in the prefetch buffer. Ask the store to prefetch it.
            else {
                me.attemptLoad(start, end);
            }
        }
    },

    onRangeFetched: function(range, start, end, options, fromLockingPartner) {
        var me = this,
            view = me.view,
            oldStart,
            rows = view.all,
            removeCount,
            increment = 0,
            calculatedTop,
            newTop,
            lockingPartner = me.view.lockingPartner && me.view.lockingPartner.bufferedRenderer,
            newRows,
            topAdditionSize,
            i,
            variableRowHeight = me.variableRowHeight;

        // View may have been destroyed since the DelayedTask was kicked off.
        if (view.isDestroyed) {
            return;
        }

        // If called as a callback from the Store, the range will be passed, if called from renderRange, it won't
        if (range) {
            // Re-cache the scrollTop if there has been an asynchronous call to the server.
            me.scrollTop = me.view.getScrollY();
        } else {
            range = me.store.getRange(start, end);

            // Store may have been cleared since the DelayedTask was kicked off.
            if (!range) {
                return;
            }
        }

        // To position rows, remove table's top border
        if (variableRowHeight) {
            calculatedTop = me.scrollTop - me.rowHeight * (me.scrollTop < me.position ? me.leadingBufferZone : me.trailingBufferZone);
        } else {
            calculatedTop = start * me.rowHeight - me.tableTopBorderWidth;
        }

        // The new range encompasses the current range. Refresh and keep the scroll position stable
        if (start < rows.startIndex && end > rows.endIndex) {

            // How many rows will be added at top. So that we can reposition the table to maintain scroll position
            topAdditionSize = rows.startIndex - start;

            // MUST use View method so that itemremove events are fired so widgets can be recycled.
            view.clearViewEl(true);
            newRows = view.doAdd(range, start);
            view.fireEvent('itemadd', range, start, newRows);
            for (i = 0; i < topAdditionSize; i++) {
                increment -= newRows[i].offsetHeight;
            }

            // We've just added a bunch of rows to the top of our range, so move upwards to keep the row appearance stable
            me.setBodyTop(me.bodyTop + increment);
            return;
        }

        // No overlapping nodes, we'll need to render the whole range
        // teleported flag is set in getFirstVisibleRowIndex/getLastVisibleRowIndex if
        // the table body has moved outside the viewport bounds
        if (me.teleported || start > rows.endIndex || end < rows.startIndex) {

            // MUST use View method so that itemremove events are fired so widgets can be recycled.
            view.clearViewEl(true);
            newTop = calculatedTop;
            me.teleported = false;
        }

        if (!rows.getCount()) {
            newRows = view.doAdd(range, start);
            view.fireEvent('itemadd', range, start, newRows);
        }
        // Moved down the dataset (content moved up): remove rows from top, add to end
        else if (end > rows.endIndex) {
            removeCount = Math.max(start - rows.startIndex, 0);

            // We only have to bump the table down by the height of removed rows if rows are not a standard size
            if (variableRowHeight) {
                increment = rows.item(rows.startIndex + removeCount, true).offsetTop;
            }
            rows.scroll(Ext.Array.slice(range, rows.endIndex + 1 - start), 1, removeCount, start, end);

            // We only have to bump the table down by the height of removed rows if rows are not a standard size
            if (variableRowHeight) {
                // Bump the table downwards by the height scraped off the top
                newTop = me.bodyTop + increment;
            } else {
                newTop = calculatedTop;
            }
        }
        // Moved up the dataset: remove rows from end, add to top
        else {
            removeCount = Math.max(rows.endIndex - end, 0);
            oldStart = rows.startIndex;
            rows.scroll(Ext.Array.slice(range, 0, rows.startIndex - start), -1, removeCount, start, end);

            // We only have to bump the table up by the height of top-added rows if rows are not a standard size
            if (variableRowHeight) {
                // Bump the table upwards by the height added to the top
                newTop = me.bodyTop - rows.item(oldStart, true).offsetTop;

                // We've arrived at row zero...
                if (!rows.startIndex) {
                    // But the calculated top position is out. It must be zero at this point
                    // We adjust the scroll position to keep visual position of table the same.
                    if (newTop) {
                        view.setScrollY(me.position = (me.scrollTop -= newTop));
                        newTop = 0;
                    }
                }
                
                // Not at zero yet, but the position has moved into negative range
                else if (newTop < 0) {
                    increment = rows.startIndex * me.rowHeight;
                    view.setScrollY(me.position = (me.scrollTop += increment));
                    newTop = me.bodyTop + increment;
                }
            } else {
                newTop = calculatedTop;
            }
        }
        // The position property is the scrollTop value *at which the table was last correct*
        // MUST be set at table render/adjustment time
        me.position = me.scrollTop;

        // Position the table element. top will be undefined if fixed row height, so table position will
        // be calculated.
        newTop = Math.max(Math.floor(newTop), 0);
        if (view.positionBody) {
            me.setBodyTop(newTop);
        }

        // Sync the other side to exactly the same range from the dataset.
        // Then ensure that we are still at exactly the same scroll position.
        if (lockingPartner && !lockingPartner.disabled && !fromLockingPartner) {
            lockingPartner.onRangeFetched(null, start, end, options, true);
            if (lockingPartner.bodyTop !== newTop) {
                lockingPartner.setBodyTop(newTop);
            }
            if (lockingPartner.scrollTop !== me.scrollTop) {
                lockingPartner.view.setScrollY(lockingPartner.scrollTop = lockingPartner.position = me.scrollTop);
            }
        }
    },

    setBodyTop: function(bodyTop) {
        var me = this,
            view = me.view,
            store = me.store,
            body = view.body;

        body.translate((me.isRTL && Ext.supports.xOriginBug && view.scrollFlags.y) ? Ext.getScrollbarSize().width : null, me.bodyTop = bodyTop);

        // If this is the last page, correct the scroll range to be just enough to fit.
        if (me.variableRowHeight) {

            // We are displaying the last row, so ensure the scroll range finishes exactly at the bottom of the view body
            if (view.all.endIndex === (store.isBufferedStore ? store.getTotalCount() : store.getCount()) - 1) {
                me.stretchView(view, me.bodyTop + body.dom.offsetHeight - 1);
            }

            // Scroll range not enough - add what we think will be enough to accommodate the final rows. Will be chopped when we get to the end. See above.
            else if (me.bodyTop + body.dom.offsetHeight - 1 > me.scrollHeight) {
                me.stretchView(view, me.scrollHeight += ((store.isBufferedStore ? store.getTotalCount() : store.getCount()) - view.all.endIndex) * me.rowHeight);
            }
        }
    },

    getFirstVisibleRowIndex: function(startRow, endRow, viewportTop, viewportBottom) {
        var me = this,
            view = me.view,
            rows = view.all,
            elements = rows.elements,
            clientHeight = me.viewClientHeight,
            target,
            targetTop,
            bodyTop = me.bodyTop;

        // If variableRowHeight, we have to search for the first row who's bottom edge is within the viewport
        if (rows.getCount() && me.variableRowHeight) {
            if (!arguments.length) {
                startRow = rows.startIndex;
                endRow = rows.endIndex;
                viewportTop = me.scrollTop;
                viewportBottom = viewportTop + clientHeight;

                // Teleported so that body is outside viewport: Use rowHeight calculation
                if (bodyTop > viewportBottom || bodyTop + view.body.dom.offsetHeight < viewportTop) {
                    me.teleported = true;
                    return Math.floor(me.scrollTop / me.rowHeight);
                }

                // In first, non-recursive call, begin targetting the most likely first row
                target = startRow + Math.min(me.numFromEdge + ((me.lastScrollDirection === -1) ? me.leadingBufferZone : me.trailingBufferZone), Math.floor((endRow - startRow) / 2));
            } else {
                target = startRow + Math.floor((endRow - startRow) / 2);
            }
            targetTop = bodyTop + elements[target].offsetTop;

            // If target is entirely above the viewport, chop downwards
            if (targetTop + elements[target].offsetHeight < viewportTop) {
                return me.getFirstVisibleRowIndex(target + 1, endRow, viewportTop, viewportBottom);
            }

            // Target is first
            if (targetTop <= viewportTop) {
                return target;
            }
            // Not narrowed down to 1 yet; chop upwards
            else if (target !== startRow) {
                return me.getFirstVisibleRowIndex(startRow, target - 1, viewportTop, viewportBottom);
            }
        }
        return Math.floor(me.scrollTop / me.rowHeight);
    },

    getLastVisibleRowIndex: function(startRow, endRow, viewportTop, viewportBottom) {
        var me = this,
            view = me.view,
            rows = view.all,
            elements = rows.elements,
            clientHeight = me.viewClientHeight,
            target,
            targetTop, targetBottom,
            bodyTop = me.bodyTop;

        // If variableRowHeight, we have to search for the first row who's bottom edge is below the bottom of the viewport
        if (rows.getCount() && me.variableRowHeight) {
            if (!arguments.length) {
                startRow = rows.startIndex;
                endRow = rows.endIndex;
                viewportTop = me.scrollTop;
                viewportBottom = viewportTop + clientHeight;

                // Teleported so that body is outside viewport: Use rowHeight calculation
                if (bodyTop > viewportBottom || bodyTop + view.body.dom.offsetHeight < viewportTop) {
                    me.teleported = true;
                    return Math.floor(me.scrollTop / me.rowHeight) + Math.ceil(clientHeight / me.rowHeight);
                }

                // In first, non-recursive call, begin targetting the most likely last row
                target = endRow - Math.min(me.numFromEdge + ((me.lastScrollDirection === 1) ? me.leadingBufferZone : me.trailingBufferZone), Math.floor((endRow - startRow) / 2));
            } else {
                target = startRow + Math.floor((endRow - startRow) / 2);
            }
            targetTop = bodyTop + elements[target].offsetTop;

            // If target is entirely below the viewport, chop upwards
            if (targetTop > viewportBottom) {
                return me.getLastVisibleRowIndex(startRow, target - 1, viewportTop, viewportBottom);
            }
            targetBottom = targetTop + elements[target].offsetHeight;

            // Target is last
            if (targetBottom >= viewportBottom) {
                return target;
            }
            // Not narrowed down to 1 yet; chop downwards
            else if (target !== endRow) {
                return me.getLastVisibleRowIndex(target + 1, endRow, viewportTop, viewportBottom);
            }
        }
        return me.getFirstVisibleRowIndex() + Math.ceil(clientHeight / me.rowHeight);
    },

    getScrollHeight: function(calculatedOnly) {
        var me = this,
            view   = me.view,
            rows   = view.all,
            store  = me.store,
            recCount = store.isBufferedStore ? store.getTotalCount() : store.getCount(),
            rowCount,
            scrollHeight;

        if (!recCount) {
            return 0;
        }
        if (!me.hasOwnProperty('rowHeight')) {
            if (rowCount = rows.getCount()) {
                me.rowHeight = me.variableRowHeight ? Math.floor(view.body.dom.clientHeight / rowCount) : rows.first(true).offsetHeight;
            }
        }
        scrollHeight = Math.floor(recCount * me.rowHeight);

        // Allow to be overridden by the reality of where the view is.
        if (!calculatedOnly) {
            // If this is the last page, correct the scroll range to be just enough to fit.
            if (scrollHeight && (rows.endIndex === recCount - 1)) {
                scrollHeight = Math.max(scrollHeight, me.bodyTop + view.body.dom.offsetHeight - 1);
            }
        }

        return me.scrollHeight = scrollHeight;

    },

    attemptLoad: function(start, end) {
        var me = this;
        if (me.scrollToLoadBuffer) {
            if (!me.loadTask) {
                me.loadTask = new Ext.util.DelayedTask(me.doAttemptLoad, me, []);
            }
            me.loadTask.delay(me.scrollToLoadBuffer, me.doAttemptLoad, me, [start, end]);
        } else {
            me.store.getRange(start, end, {
                callback: me.onRangeFetched,
                scope: me,
                fireEvent: false
            });
        }
    },

    cancelLoad: function() {
        if (this.loadTask) {
            this.loadTask.cancel();
        }
    },

    doAttemptLoad:  function(start, end) {
        this.store.getRange(start, end, {
            callback: this.onRangeFetched,
            scope: this,
            fireEvent: false
        });
    },

    destroy: function() {
        var me = this,
            view = me.view;

        if (view && view.el) {
            view.un('scroll', me.onViewScroll, me);
        }

        // Remove listeners from old grid, view and store
        Ext.destroy(me.viewListeners, me.storeListeners, me.gridListeners);
    }
}, function(cls) {
    // Minimal leading and trailing zones are best on mobile.
    // Use 2 to ensure visible range is covered
    if (Ext.supports.Touch) {
        cls.prototype.leadingBufferZone = cls.prototype.trailingBufferZone = 2;
        cls.prototype.numFromEdge = 1;
    }
});
