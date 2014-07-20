/**
 * A chained store is a store that is a "view" of an existing store. The data comes from the
 * {@link #source}, however this view of the store may be sorted & filtered independently without
 * having any impact on the {@link #source} store.
 */
Ext.define('Ext.data.ChainedStore', {
    extend: 'Ext.data.AbstractStore',
    alias: 'store.chained',
    
    config: {
        /**
         * @cfg {Ext.data.Store} source
         * The backing data source for this chained store.
         */
        source: null,

        /**
         * @inheritdoc
         */
        remoteFilter: false,

        /**
         * @inheritdoc
         */
        remoteSort: false
    },

    mixins: [
        'Ext.data.LocalStore'
    ],
    
    constructor: function() {
        this.callParent(arguments);
        this.getData().addObserver(this);
    },

    //<debug>
    updateRemoteFilter: function(value) {
        if (value) {
            Ext.Error.raise('Remote filtering cannot be used with chained stores.');
        }
    },

    updateRemoteSort: function(value) {
        if (value) {
            Ext.Error.raise('Remote sorting cannot be used with chained stores.');
        }
    },
    //</debug>

    add: function() {
        var source = this.getSource();
        return source.add.apply(source, arguments);
    },
    
    remove: function() {
        var source = this.getSource();
        return source.remove.apply(source, arguments);
    },
    
    getData: function() {
        var me = this,
            data = me.data;
        
        if (!data) {
            me.data = data = me.constructDataCollection();
        }
        return data;
    },

    applySource: function(source) {
        if (source) {
            source = Ext.data.StoreManager.lookup(source);
        }
        return source;
    },
    
    updateSource: function(source, oldSource) {
        var me = this,
            data;
        
        if (oldSource) {
            oldSource.removeObserver(me);
        }
        
        if (source) {
            data = me.getData();
            data.setSource(source.getData());
            if (!me.isInitializing) {
                me.fireEvent('refresh', me);
                me.fireEvent('datachanged', me);
            }
            source.addObserver(me);
        }
    },
    
    /**
     * Get the model used for this store.
     * @return {Ext.data.Model} The model
     */
    getModel: function() {
        return this.getSource().getModel();
    },

    getProxy: function() {
        return null;
    },
    
    onCollectionAdd: function(collection, info) {
        var me = this,
            records = info.items,
            lastChunk = !info.next;
        
        if (me.ignoreCollectionAdd) {
            return;
        }
        
        me.fireEvent('add', me, records, info.at);
        // If there is a next property, that means there is another range that needs
        // to be removed after this. Wait until everything is gone before firign datachanged
        // since it should be a bulk operation
        if (lastChunk) {
            me.fireEvent('datachanged', me);
        }
    },
    
    onCollectionItemChange: function(collection, info) {
        var record = info.item,
            modifiedFieldNames = info.modified;
        
        if (this.contains(record)) {
            this.fireEvent('update', this, record, 'edit', modifiedFieldNames);
        }
    },
    
    onCollectionRemove: function(collection, info) {
        var me = this,
            records = info.items,
            lastChunk = !info.next;
        
        if (me.ignoreCollectionRemove) {
            return;
        }
        
        me.fireEvent('remove', me, records, info.at, false);
        // If there is a next property, that means there is another range that needs
        // to be removed after this. Wait until everything is gone before firign datachanged
        // since it should be a bulk operation
        if (lastChunk) {
            me.fireEvent('datachanged', me);
        }
    },
    
    onSourceBeforeLoad: function() {
        this.ignoreCollectionAdd = true;
        this.callObservers('BeforeLoad');
    },
    
    onSourceAfterLoad: function() {
        var me = this;
        me.ignoreCollectionAdd = false;
        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
        this.callObservers('AfterLoad');
    },
    
    onSourceBeforeClear: function() {
        this.ignoreCollectionRemove = true;
        this.callObservers('BeforeClear');
    },
    
    onSourceAfterClear: function() {
        this.ignoreCollectionRemove = false;
        this.callObservers('AfterClear');
    },
    
    onSourceBeforeRemoveAll: function() {
        this.ignoreCollectionRemove = true;
        this.callObservers('BeforeRemoveAll');
    },
    
    onSourceAfterRemoveAll: function(source, silent) {
        var me = this;
        me.ignoreCollectionRemove = false;
        if (!silent) {
            me.fireEvent('clear', me);
            me.fireEvent('datachanged', me);
        }
        this.callObservers('AfterRemoveAll', [silent]);
    },

    onSourceFilter: function() {
        var me = this;
        me.fireEvent('refresh', me);
        me.fireEvent('datachanged', me);
    },
    
    // inherit docs
    hasPendingLoad: function() {
        return false;
    },
    
    // inherit docs
    isLoading: function() {
        return false;
    },
    
    // inherit docs
    onDestroy: function() {
        var me = this,
            data = me.data;

        me.observers = null;
        me.setSource(null);
        if (data) {
            data.destroy();
            me.data = null;
        }
    }

    // Provides docs from the mixin
    /**
     * @method each
     * @inheritdoc Ext.data.LocalStore#each
     */

    /**
     * @method collect
     * @inheritdoc Ext.data.LocalStore#collect
     */

    /**
     * @method getById
     * @inheritdoc Ext.data.LocalStore#getById
     */

    /**
     * @method getByInternalId
     * @inheritdoc Ext.data.LocalStore#getByInternalId
     */

    /**
     * @method indexOf
     * @inheritdoc Ext.data.LocalStore#indexOf
     */

    /**
     * @method indexOfId
     * @inheritdoc Ext.data.LocalStore#indexOfId
     */

    /**
     * @method queryBy
     * @inheritdoc Ext.data.LocalStore#queryBy
     */

    /**
     * @method query
     * @inheritdoc Ext.data.LocalStore#query
     */

    /**
     * @method first
     * @inheritdoc Ext.data.LocalStore#first
     */

    /**
     * @method last
     * @inheritdoc Ext.data.LocalStore#last
     */

    /**
     * @method sum
     * @inheritdoc Ext.data.LocalStore#sum
     */

    /**
     * @method count
     * @inheritdoc Ext.data.LocalStore#count
     */

    /**
     * @method min
     * @inheritdoc Ext.data.LocalStore#min
     */

    /**
     * @method max
     * @inheritdoc Ext.data.LocalStore#max
     */

    /**
     * @method average
     * @inheritdoc Ext.data.LocalStore#average
     */

    /**
     * @method aggregate
     * @inheritdoc Ext.data.LocalStore#aggregate
     */
});