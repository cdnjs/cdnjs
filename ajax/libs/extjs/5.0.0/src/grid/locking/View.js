/**
 * This class is used internally to provide a single interface when using
 * a locking grid. Internally, the locking grid creates two separate grids,
 * so this class is used to map calls appropriately.
 * @private
 */
Ext.define('Ext.grid.locking.View', {
    alternateClassName: 'Ext.grid.LockingView',
    requires: [
        'Ext.view.AbstractView'
    ],

    mixins: [
        'Ext.util.Observable',
        'Ext.util.StoreHolder'
    ],

    /**
     * @property {Boolean} isLockingView
     * `true` in this class to identify an object as an instantiated LockingView, or subclass thereof.
     */
    isLockingView: true,

    loadMask: true,

    eventRelayRe: /^(beforeitem|beforecontainer|item|container|cell|refresh)/,

    constructor: function(config){
        var me = this,
            lockedView,
            normalView;

        me.panel = config.panel;

        // Disable store binding for the two child views.
        // The store is bound to the *this* locking View.
        // This avoids the store being bound to two views (with duplicated layouts on each store mutation)
        // and also avoids the store being bound to the selection model twice.
        config.locked.viewConfig.bindStore = config.normal.viewConfig.bindStore = Ext.emptyFn;

        // Override the point at which first refresh is kicked off.
        // The initial refresh of both sides must take place within a layout suspension
        // to coalescse the resulting layouts into one.
        config.locked.viewConfig.beforeLayout = config.normal.viewConfig.beforeLayout = me.beforeLayout;

        me.lockedGrid = me.panel.lockedGrid = Ext.ComponentManager.create(config.locked);
        me.lockedView = lockedView = me.lockedGrid.getView();

        if (me.lockedGrid.isTree) {
            // Tree must not animate because the partner grid is unable to animate
            me.lockedView.animate = false;

            // When this is a locked tree, the normal side is just a gridpanel, so needs the flat NodeStore
            config.normal.store = lockedView.store;

            // Match configs between sides
            config.normal.viewConfig.stripeRows = me.lockedView.stripeRows;
            config.normal.rowLines = me.lockedGrid.rowLines;
        }

        // Set up a bidirectional relationship between the two sides of the locked view.
        // Inject lockingGrid and normalGrid into owning panel.
        // This is because during constraction, it must be possible for descendant components
        // to navigate up to the owning lockable panel and then down into either side.
        me.normalGrid = me.panel.normalGrid = Ext.ComponentManager.create(config.normal);
        lockedView.lockingPartner = normalView = me.normalView = me.normalGrid.getView();
        normalView.lockingPartner = lockedView;

        me.loadMask = (config.loadMask !== undefined) ? config.loadMask : me.loadMask;

        me.mixins.observable.constructor.call(me);

        // relay both view's events
        me.relayEvents(lockedView, Ext.view.Table.events);
        me.relayEvents(normalView, Ext.view.Table.events);

        normalView.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });

        lockedView.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });
        
        me.panel.on({
            render: me.onPanelRender,
            scope: me
        });

        me.loadingText = normalView.loadingText;
        me.loadingCls = normalView.loadingCls;
        me.loadingUseMsg = normalView.loadingUseMsg;

        // Bind to the data source. Cache it by the property name "dataSource".
        // The store property is public and must reference the provided store.
        // We relay each call into both normal and locked views bracketed by a layout suspension.
        me.bindStore(normalView.dataSource, true, 'dataSource');
    },

    // Called in the context of a child view when the first child view begins its layout run
    beforeLayout: function() {
        // Access the Lockable object
        var me = this.ownerCt.ownerLockable.view,
            lockedView = me.lockedGrid.view,
            normalView = me.normalGrid.view;

        if (!me.relayingOperation) {

            // Perform the first refresh just before the first layout
            // Locked grid may be hidden if it began with no columns, so do not refresh it,
            if (me.lockedGrid.isVisible()) {
                if (lockedView.refreshNeeded) {
                    lockedView.doFirstRefresh(lockedView.dataSource);
                }
            }
            if (normalView.refreshNeeded) {
                normalView.doFirstRefresh(normalView.dataSource);
            }
        }
    },

    onPanelRender: function() {
        var me = this,
            mask = me.loadMask,
            cfg = {
                target: me.panel,
                msg: me.loadingText,
                msgCls: me.loadingCls,
                useMsg: me.loadingUseMsg,
                store: me.panel.store
            };

        // Because this is used as a View, it should have an el. Use the owning Lockable's body.
        // It also has to fire a render event so that Editing plugins can attach listeners
        me.el = me.panel.body;
        me.fireEvent('render', me);

        if (mask) {
            // either a config object 
            if (Ext.isObject(mask)) {
                cfg = Ext.apply(cfg, mask);
            }
            // Attach the LoadMask to a *Component* so that it can be sensitive to resizing during long loads.
            // If this DataView is floating, then mask this DataView.
            // Otherwise, mask its owning Container (or this, if there *is* no owning Container).
            // LoadMask captures the element upon render.
            me.loadMask = new Ext.LoadMask(cfg);
        }
    },

    getRefOwner: function() {
        return this.panel;
    },

    getGridColumns: function() {
        var cols = this.lockedGrid.headerCt.getVisibleGridColumns();
        return cols.concat(this.normalGrid.headerCt.getVisibleGridColumns());
    },

    getEl: function(column){
        return this.getViewForColumn(column).getEl();
    },

    getViewForColumn: function(column) {
        var view = this.lockedView,
            inLocked;

        view.headerCt.cascade(function(col){
            if (col === column) {
                inLocked = true;
                return false;
            }
        });

        return inLocked ? view : this.normalView;
    },

    onItemMouseEnter: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView,
            item;

        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            item = other.getNode(record);
            other.highlightItem(item);
        }
    },

    onItemMouseLeave: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView;

        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            other.clearHighlight();
        }
    },

    relayFn: function(name, args){
        args = args || [];

        var view = this.lockedView;

        // Flag that we are already manipulating the view pair, so resulting excursions
        // back into this class can avoid breaking the sequence.
        this.relayingOperation = true;
        view[name].apply(view, args);
        view = this.normalView;
        view[name].apply(view, args);
        this.relayingOperation = false;
    },

    getSelectionModel: function(){
        return this.panel.getSelectionModel();
    },

    getStore: function(){
        return this.panel.store;
    },

    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this view
     * @since 3.4.0
     */
    bindStore : function(store, initial, propName) {
        var me = this;
        me.mixins.storeholder.bindStore.apply(me, arguments);

        // Bind the store to our selection model unless it's the initial bind.
        // Initial bind takes place afterRender
        if (!initial && propName !== 'dataSource') {
            me.getSelectionModel().bindStore(store);
        }

        // If we have already achieved our first layout, refresh immediately.
        // If we have bound to the Store before the first layout, then onBoxReady will
        // call doFirstRefresh
        if (me.normalView.componentLayoutCounter) {
            Ext.suspendLayouts();
            me.normalView.doFirstRefresh(store);
            me.lockedView.doFirstRefresh(store);
            Ext.resumeLayouts(true);
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
            clear: me.refresh
        };
    },

    onDataRefresh: function(eventName, fn, scope){
        this.relayFn('onDataRefresh', arguments);
    },

    onReplace: function(eventName, fn, scope){
        this.relayFn('onReplace', arguments);
    },

    onAdd: function(eventName, fn, scope){
        this.relayFn('onAdd', arguments);
    },

    onRemove: function(eventName, fn, scope){
        this.relayFn('onRemove', arguments);
    },

    onUpdate: function(eventName, fn, scope){
        this.relayFn('onUpdate', arguments);
    },

    refresh: function(eventName, fn, scope){
        this.relayFn('refresh', arguments);
    },

    getNode: function(nodeInfo) {
        // default to the normal view
        return this.normalView.getNode(nodeInfo);
    },

    getRow: function(nodeInfo) {
        // default to the normal view
        return this.normalView.getRow(nodeInfo);
    },

    getCell: function(record, column) {
        var view = this.getViewForColumn(column),
            row = view.getRow(record);
            
        return Ext.fly(row).down(column.getCellSelector());
    },

    indexOf: function(record) {
        var result = this.lockedView.indexOf(record);
        if (!result) {
            result = this.normalView.indexOf(record);
        }
        return result;
    },

    focus: function() {
        var p = this.getSelectionModel().getCurrentPosition(),
            v = p ? p.view : this.normalView;

        v.focus();
    },
    
    focusRow: function(row) {
        this.normalView.focusRow(row);
    },

    focusCell: function(position) {
        position.view.focusCell(position);
    },

    isVisible: function(deep) {
        return this.panel.isVisible(deep);
    },
    
    getCellByPosition: function(pos, returnDom) {
        var col = pos.column,
            lockedSize = this.lockedGrid.getColumnManager().getColumns().length;
            
        // Normalize view
        if (col >= lockedSize) {
            // Make a copy so we don't mutate the passed object
            pos = Ext.apply({}, pos);
            pos.column -= lockedSize;
            return this.normalView.getCellByPosition(pos, returnDom);
        } else {
            return this.lockedView.getCellByPosition(pos, returnDom);
        }
    },

    getRecord: function(node) {
        var result = this.lockedView.getRecord(node);
        if (!result) {
            result = this.normalView.getRecord(node);
        }
        return result;
    },
    
    scrollBy: function(){
        var normal = this.normalView;
        normal.scrollBy.apply(normal, arguments);
    },

    addElListener: function(eventName, fn, scope){
        this.relayFn('addElListener', arguments);
    },

    refreshNode: function(){
        this.relayFn('refreshNode', arguments);
    },

    addRowCls: function(){
        this.relayFn('addRowCls', arguments);
    },

    removeRowCls: function(){
        this.relayFn('removeRowCls', arguments);
    },
    
    destroy: function(){
        var me = this,
            mask = me.loadMask;
            
        // Needed to inhibit deferred refreshes from firing and attempting to update a destroyed view
        this.isDestroyed = true;

        // Typically the mask unbinding is handled by the view, but
        // we aren't a normal view, so clear it out here
        me.clearListeners();
        if (mask && mask.bindStore) {
            mask.bindStore(null);
        }
    }

}, function() {
    this.borrow(Ext.Component, ['up']);
    this.borrow(Ext.view.AbstractView, ['doFirstRefresh', 'applyFirstRefresh']);
});
