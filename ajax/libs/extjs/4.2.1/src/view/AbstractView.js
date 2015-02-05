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
        'Ext.DomQuery',
        'Ext.selection.DataViewModel'
    ],
    mixins: {
        bindable: 'Ext.util.Bindable'
    },

    inheritableStatics: {
        getRecord: function(node) {
            return this.getBoundView(node).getRecord(node);
        },

        getBoundView: function(node) {
            return Ext.getCmp(node.boundView);
        }
    },

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
     * @cfg {Boolean} deferInitialRefresh
     * <p>Defaults to <code>true</code> to defer the initial refresh of the view.</p>
     * <p>This allows the View to execute its render and initial layout more quickly because the process will not be encumbered
     * by the expensive update of the view structure.</p>
     * <p><b>Important: </b>Be aware that this will mean that the View's item elements will not be available immediately upon render, so
     * <i>selection</i> may not take place at render time. To access a View's item elements as soon as possible, use the {@link #viewready} event.
     * Or set <code>deferInitialrefresh</code> to false, but this will be at the cost of slower rendering.</p>
     */
    deferInitialRefresh: true,

    /**
     * @cfg {String} itemSelector (required)
     * <b>This is a required setting</b>. A simple CSS selector (e.g. <tt>div.some-class</tt> or
     * <tt>span:first-child</tt>) that will be used to determine what nodes this DataView will be
     * working with. The itemSelector is used to map DOM nodes to records. As such, there should
     * only be one root level element that matches the selector for each record.
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

    //private
    last: false,

    triggerEvent: 'itemclick',
    triggerCtEvent: 'containerclick',

    addCmpEvents: function() {

    },

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

            itemTpl = Ext.String.format('<tpl for="."><div class="{0}">{1}</div></tpl>', me.itemCls, itemTpl);
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

        me.addEvents(
            /**
             * @event beforerefresh
             * Fires before the view is refreshed
             * @param {Ext.view.View} this The DataView object
             */
            'beforerefresh',
            /**
             * @event refresh
             * Fires when the view is refreshed
             * @param {Ext.view.View} this The DataView object
             */
            'refresh',
            /**
             * @event viewready
             * Fires when the View's item elements representing Store items has been rendered. If the {@link #deferInitialRefresh} flag
             * was set (and it is <code>true</code> by default), this will be <b>after</b> initial render, and no items will be available
             * for selection until this event fires.
             * @param {Ext.view.View} this
             */
            'viewready',
            /**
             * @event itemupdate
             * Fires when the node associated with an individual record is updated
             * @param {Ext.data.Model} record The model instance
             * @param {Number} index The index of the record/node
             * @param {HTMLElement} node The node that has just been updated
             */
            'itemupdate',
            /**
             * @event itemadd
             * Fires when the nodes associated with an recordset have been added to the underlying store
             * @param {Ext.data.Model[]} records The model instance
             * @param {Number} index The index at which the set of record/nodes starts
             * @param {HTMLElement[]} node The node that has just been updated
             */
            'itemadd',
            /**
             * @event itemremove
             * Fires when the node associated with an individual record is removed
             * @param {Ext.data.Model} record The model instance
             * @param {Number} index The index of the record/node
             */
            'itemremove'
        );

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
                msgCls: me.loadingCls,
                useMsg: me.loadingUseMsg,
                // The store gets bound in initComponent, so while
                // rendering let's push on the store
                store: maskStore
            };

        me.callParent(arguments);

        if (mask && !maskStore.proxy.isSynchronous) {
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
    },
    
    finishRender: function() {
        var me = this;
        me.callParent(arguments);
        // Kick off the refresh before layouts are resumed after the render 
        // completes, but after afterrender is fired on the view
        if (!me.up('[collapsed],[hidden]')) {
            me.doFirstRefresh(me.dataSource);
        }
    },

    onBoxReady: function() {
        var me = this;

        me.callParent(arguments);

        // If the refresh was not kicked off on render due to a collapsed or hidden ancestor,
        // kick it off as soon as we get layed out
        if (!me.firstRefreshDone) {
            me.doFirstRefresh(me.dataSource);
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
            targetEl,
            targetParent,
            oldDisplay,
            nextSibling,
            dom,
            records;

        if (!me.rendered || me.isDestroyed) {
            return;
        }

        if (!me.hasListeners.beforerefresh || me.fireEvent('beforerefresh', me) !== false) {
            targetEl = me.getTargetEl();
            records = me.getViewRange();
            dom = targetEl.dom;

            // Updating is much quicker if done when the targetEl is detached from the document, and not displayed.
            // But this resets the scroll position, so when preserving scroll position, this cannot be done.
            if (!me.preserveScrollOnRefresh) {
                targetParent = dom.parentNode;
                oldDisplay = dom.style.display;
                dom.style.display = 'none';
                nextSibling = dom.nextSibling;
                targetParent.removeChild(dom);
            }

            if (me.refreshCounter) {
                me.clearViewEl();
            } else {
                me.fixedNodes = targetEl.dom.childNodes.length;
                me.refreshCounter = 1;
            }

            // Always attempt to create the required markup after the fixedNodes.
            // Usually, for an empty record set, this would be blank, but when the Template
            // Creates markup outside of the record loop, this must still be honoured even if there are no
            // records.
            me.tpl.append(targetEl, me.collectData(records, me.all.startIndex));

            // The emptyText is now appended to the View's element
            // after any fixedNodes.
            if (records.length < 1) {
                // Process empty text unless the store is being cleared.
                if (!this.store.loading && (!me.deferEmptyText || me.hasFirstRefresh)) {
                    Ext.core.DomHelper.insertHtml('beforeEnd', targetEl.dom, me.emptyText);
                }
                me.all.clear();
            } else {
                me.collectNodes(targetEl.dom);
                me.updateIndexes(0);
            }

            // Don't need to do this on the first refresh
            if (me.hasFirstRefresh) {
                // Some subclasses do not need to do this. TableView does not need to do this.
                if (me.refreshSelmodelOnRefresh !== false) {
                    me.selModel.refresh();
                } else {
                    // However, even if that is not needed, pruning if pruneRemoved is true (the default) still needs doing.
                    me.selModel.pruneIf();
                }
            }

            me.hasFirstRefresh = true;

            if (!me.preserveScrollOnRefresh) {
                targetParent.insertBefore(dom, nextSibling);
                dom.style.display = oldDisplay;
            }

            // Ensure layout system knows about new content size
            this.refreshSize();

            me.fireEvent('refresh', me);

            // Upon first refresh, fire the viewready event.
            // Reconfiguring the grid "renews" this event.
            if (!me.viewReady) {
                // Fire an event when deferred content becomes available.
                // This supports grid Panel's deferRowRender capability
                me.viewReady = true;
                me.fireEvent('viewready', me);
            }
        }
    },

    // Private
    // Called by refresh to collect the view item nodes.
    collectNodes: function(targetEl) {
        this.all.fill(Ext.query(this.getItemSelector(), Ext.getDom(targetEl)), this.all.startIndex);
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
    refreshSize: function() {
        var sizeModel = this.getSizeModel();
        if (sizeModel.height.shrinkWrap || sizeModel.width.shrinkWrap) {
            this.updateLayout();
        }
    },

    clearViewEl: function(){
        // The purpose of this is to allow boilerplate HTML nodes to remain in place inside a View
        // while the transient, templated data can be discarded and recreated.
        // The first time through this code, we take a count of the number of existing child nodes.
        // Subsequent refreshes then do not clear the entire element, but remove all nodes
        // *after* the fixedNodes count.
        // In particular, this is used in infinite grid scrolling: A very tall "stretcher" element is
        // inserted into the View's element to create a scrollbar of the correct proportion.

        var me = this,
            el = me.getTargetEl();

        if (me.fixedNodes) {
            while (el.dom.childNodes[me.fixedNodes]) {
                el.dom.removeChild(el.dom.childNodes[me.fixedNodes]);
            }
        } else {
            el.update('');
        }
        me.refreshCounter++;
    },

    // Private template method to be overridden in subclasses.
    onViewScroll: Ext.emptyFn,
    
    onIdChanged: Ext.emptyFn,

    /**
     * Saves the scrollState in a private variable. Must be used in conjunction with restoreScrollState.
     * @private
     */
    saveScrollState: function() {
        if (this.rendered) {
            var dom = this.el.dom,
                state = this.scrollState;

            state.left = dom.scrollLeft;
            state.top = dom.scrollTop;
        }
    },

    /**
     * Restores the scrollState.
     * Must be used in conjunction with saveScrollState
     * @private
     */
    restoreScrollState: function() {
        if (this.rendered) {
            var dom = this.el.dom, 
                state = this.scrollState;

            dom.scrollLeft = state.left;
            dom.scrollTop = state.top;
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
    bufferRender : function(records, index) {
        var me = this,
            div = me.renderBuffer || (me.renderBuffer = document.createElement('div'));

        me.tpl.overwrite(div, me.collectData(records, index));
        return  Ext.DomQuery.select(me.getItemSelector(), div);
    },
    
    getNodeContainer: function() {
        return this.getTargetEl();
    },

    // private
    onUpdate : function(ds, record){
        var me = this,
            index,
            node;

        if (me.viewReady) {
            index = me.dataSource.indexOf(record);
            if (index > -1) {
                node = me.bufferRender([record], index)[0];
                // ensure the node actually exists in the DOM
                if (me.getNode(record)) {
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
                me.refreshSize();
            }

            if (me.hasListeners.itemadd) {
                me.fireEvent('itemadd', records, index, nodes);
            }
        }

    },

    doAdd: function(records, index) {
        var me = this,
            nodes = me.bufferRender(records, index, true),
            all = me.all,
            count = all.getCount(),
            i, l;

        if (count === 0) {
            for (i = 0, l = nodes.length; i < l; i++) {
                this.getNodeContainer().appendChild(nodes[i]);
            }
        } else if (index < count) {
            if (index === 0) {
                all.item(index).insertSibling(nodes, 'before', true);
            } else {
                all.item(index - 1).insertSibling(nodes, 'after', true);
            }
        } else {
            all.last().insertSibling(nodes, 'after', true);
        }

        all.insert(index, nodes);
        return nodes;
    },

    // private
    onRemove : function(ds, records, indexes) {
        var me = this,
            fireItemRemove = me.hasListeners.itemremove,
            i,
            record,
            index;

        if (me.all.getCount()) {
            if (me.dataSource.getCount() === 0) {
                // Refresh so emptyText can be applied if necessary
                if (fireItemRemove) {
                    for (i = indexes.length - 1; i >= 0; --i) {
                        me.fireEvent('itemremove', records[i], indexes[i]);
                    }
                }
                me.refresh();
            } else {
                // Just remove the elements which corresponds to the removed records
                // The tpl's full HTML will still be in place.
                for (i = indexes.length - 1; i >= 0; --i) {
                    record = records[i];
                    index = indexes[i];
                    me.doRemove(record, index);
                    if (fireItemRemove) {
                        me.fireEvent('itemremove', record, index);
                    }
                }
                me.updateIndexes(indexes[0]);
            }

            // Ensure layout system knows about new content height
            this.refreshSize();
        }
    },

    // private
    doRemove: function(record, index) {
        this.all.removeElement(index, true);
    },

    /**
     * Refreshes an individual node's data from the store.
     * @param {Number} index The item's data index in the store
     * @since 2.3.0
     */
    refreshNode : function(index) {
        this.onUpdate(this.dataSource, this.dataSource.getAt(index));
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
    bindStore : function(store, initial, propName) {
        var me = this;
        me.mixins.bindable.bindStore.apply(me, arguments);

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
    doFirstRefresh: function(store) {
        var me = this;

        // Flag to prevent a second "first" refresh from onBoxReady
        me.firstRefreshDone = true;

        // 4.1.0: If we have a store, and the Store is *NOT* already loading (a refresh is on the way), then
        // on first layout, refresh regardless of record count.
        // Template may contain boilerplate HTML outside of record iteration loop.
        // Also, emptyText is appended by the refresh method.
        // We call refresh on a defer if this is the initial call, and we are configured to defer the initial refresh.
        if (store && !store.loading) {
            if (me.deferInitialRefresh) {
                me.applyFirstRefresh();
            } else {
                me.refresh();
            }
        }
    },
    
    applyFirstRefresh: function(){
        var me = this;
        if (me.isDestroyed) {
            return;
        }
        
        // In the case of an animated collapse/expand, the layout will
        // be marked as though it's complete, yet the element itself may
        // still be animating, which means we could trigger a layout while
        // everything is not in the correct place. As such, wait until the
        // animation has finished before kicking off the refresh. The problem
        // occurs because both the refresh and the animation are running on
        // a timer which makes it impossible to control the order of when
        // the refresh is fired.
        if (me.up('[isCollapsingOrExpanding]')) {
            Ext.Function.defer(me.applyFirstRefresh, 100, me);
        } else {
            Ext.Function.defer(function () {
                if (!me.isDestroyed) {
                    me.refresh();
                }
            }, 1);
        }
    },

    onUnbindStore: function(store) {
        this.setMaskBind(null);
    },

    onBindStore: function(store, initial, propName) {
        this.setMaskBind(store);
        if (!initial && propName === 'store') {
            this.bindStore(store, false, 'dataSource');
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
            idchanged: me.onIdChanged,
            refresh: me.onDataRefresh,
            add: me.onAdd,
            bulkremove: me.onRemove,
            update: me.onUpdate,
            clear: me.refresh
        };
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
            // If we have an ancestor in a non-boxready state (collapsed or in-transition, or hidden), and we are still waiting
            // for the first refresh, then block the refresh because that first visible, expanded layout will trigger the refresh
            blockedByAncestor = !me.firstRefreshDone && (!me.rendered || me.up('[collapsed],[isCollapsingOrExpanding],[hidden]'));

        // If are blocking *an initial refresh* because of an ancestor in a non-boxready state,
        // then cancel any defer on the initial refresh that is going to happen on boxReady - that will be a data-driven refresh, NOT
        // a render-time, delayable refresh. This is particularly important if the boxready occurs because of the "preflight" layout
        // of an animated expand. If refresh is delayed it occur during the expand animation and cause errors.
        if (blockedByAncestor) {
            me.deferInitialRefresh = false;
        } else if (me.blockRefresh !== true) {
            me.firstRefreshDone = true;
            me.refresh();
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
     * Returns the template node by the Ext.EventObject or null if it is not found.
     * @param {Ext.EventObject} e
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
     * @param {Ext.Element/HTMLElement} node The node to evaluate
     *
     * @return {Ext.data.Model} record The {@link Ext.data.Model} object
     * @since 2.3.0
     */
    getRecord: function(node){
        return this.dataSource.data.getByKey(Ext.getDom(node).viewRecordId);
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

        if (Ext.isString(nodeInfo)) {
            return document.getElementById(nodeInfo);
        }
        if (Ext.isNumber(nodeInfo)) {
            return this.all.elements[nodeInfo];
        }
        if (nodeInfo.isModel) {
            return this.getNodeByRecord(nodeInfo);
        }
        return nodeInfo; // already an HTMLElement
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

        if (end === undefined) {
            end = all.getCount();
        } else {
            end++;
        }
        return all.slice(start||0, end);
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
        me.callParent();
        me.bindStore(null);
        me.selModel.destroy();
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
