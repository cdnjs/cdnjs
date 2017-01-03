Ext.define('FeedViewer.FeedGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.feedgrid',

    /**
     * @event rowdblclick
     * Fires when a row is double clicked
     * @param {FeedViewer.FeedGrid} this
     * @param {Ext.data.Model} model
     */

    /**
     * @event select
     * Fires when a grid row is selected
     * @param {FeedViewer.FeedGrid} this
     * @param {Ext.data.Model} model
     */

    initComponent: function(){
        Ext.apply(this, {
            cls: 'feed-grid',
            store: Ext.create('Ext.data.Store', {
                model: 'FeedItem',
                sortInfo: {
                    property: 'pubDate',
                    direction: 'DESC'
                },
                proxy: {
                    type: 'ajax',
                    url: 'feed-proxy.php',
                    reader: {
                        type: 'xml',
                        record: 'item'
                    },
                    listeners: {
                        exception: this.onProxyException,
                        scope: this
                    }
                },
                listeners: {
                    load: this.onLoad,
                    scope: this
                }
            }),

            viewConfig: {
                itemId: 'view',
                plugins: [{
                    pluginId: 'preview',
                    ptype: 'preview',
                    bodyField: 'description',
                    expanded: true
                }],
                listeners: {
                    scope: this,
                    itemdblclick: this.onRowDblClick
                }
            },
            columns: [{
                text: 'Title',
                dataIndex: 'title',
                flex: 1,
                renderer: this.formatTitle
            }, {
                text: 'Author',
                dataIndex: 'author',
                hidden: true,
                width: 200

            }, {
                text: 'Date',
                dataIndex: 'pubDate',
                renderer: this.formatDate,
                width: 200
            }]
        });
        this.callParent(arguments);
        this.on('selectionchange', this.onSelect, this);
    },

        /**
     * Reacts to a double click
     * @private
     * @param {Object} view The view
     * @param {Object} index The row index
     */
    onRowDblClick: function(view, record, item, index, e) {
        this.fireEvent('rowdblclick', this, this.store.getAt(index));
    },


    /**
     * React to a grid item being selected
     * @private
     * @param {Ext.model.Selection} model The selection model
     * @param {Array} selections An array of selections
     */
    onSelect: function(model, selections){
        var selected = selections[0];
        if (selected) {
            this.fireEvent('select', this, selected);
        }
    },

    /**
     * Listens for the store loading
     * @private
     */
    onLoad: function(store, records, success) {
        if (this.getStore().getCount()) {
            this.getSelectionModel().select(0);
        }
    },

    /**
     * Listen for proxy eerrors.
     */
    onProxyException: function(proxy, response, operation) {
        Ext.Msg.alert("Error with data from server", operation.error);
        this.view.el.update('');
        
        // Update the detail view with a dummy empty record
        this.fireEvent('select', this, {data:{}});
    },

    /**
     * Instructs the grid to load a new feed
     * @param {String} url The url to load
     */
    loadFeed: function(url){
        var store = this.store;
        
        store.getProxy().setExtraParam('feed', url);
        store.load();
    },

    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record){
        return Ext.String.format('<div class="topic"><b>{0}</b><span class="author">{1}</span></div>', value, record.get('author') || "Unknown");
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date){
        if (!date) {
            return '';
        }

        var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    }
});
