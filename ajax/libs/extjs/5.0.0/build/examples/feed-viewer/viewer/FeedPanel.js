/**
 * @class FeedViewer.FeedPanel
 * @extends Ext.panel.Panel
 *
 * Shows a list of available feeds. Also has the ability to add/remove and load feeds.
 *
 * @constructor
 * Create a new Feed Panel
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.FeedPanel', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.feedpanel',

    animCollapse: true,
    layout: 'fit',
    title: 'Feeds',

    /**
     * @event feedremove Fired when a feed is removed
     * @param {FeedPanel} this
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */

    /**
     * @event feedselect Fired when a feed is selected
     * @param {FeedPanel} this
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */

    initComponent: function(){
        Ext.apply(this, {
            items: this.createView(),
            dockedItems: this.createToolbar()
        });
        this.createMenu();
        this.callParent(arguments);
    },

    /**
     * Create the DataView to be used for the feed list.
     * @private
     * @return {Ext.view.View}
     */
    createView: function(){
        this.view = Ext.create('widget.dataview', {
            autoScroll: true,
            store: Ext.create('Ext.data.Store', {
                model: 'Feed',
                data: this.feeds
            }),
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    scope: this,
                    selectionchange: this.onSelectionChange
                }
            },
            listeners: {
                scope: this,
                contextmenu: this.onContextMenu,
                viewready: this.onViewReady
            },
            trackOver: true,
            cls: 'feed-list',
            itemSelector: '.feed-list-item',
            overItemCls: 'feed-list-item-hover',
            tpl: '<tpl for="."><div class="feed-list-item">{title}</div></tpl>'
        });
        return this.view;
    },

    onViewReady: function(){
        Ext.suspendLayouts();
        this.view.getSelectionModel().select(this.view.store.first());
        Ext.resumeLayouts(true);
    },

    /**
     * Creates the toolbar to be used for controlling feeds.
     * @private
     * @return {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        this.createActions();
        this.toolbar = Ext.create('widget.toolbar', {
            items: [this.addAction, this.removeAction]
        });
        return this.toolbar;
    },

    /**
     * Create actions to share between toolbar and menu
     * @private
     */
    createActions: function(){
        this.addAction = Ext.create('Ext.Action', {
            scope: this,
            handler: this.onAddFeedClick,
            text: 'Add',
            iconCls: 'feed-add'
        });

        this.removeAction = Ext.create('Ext.Action', {
            itemId: 'remove',
            scope: this,
            handler: this.onRemoveFeedClick,
            text: 'Remove',
            iconCls: 'feed-remove'
        });
    },

    /**
     * Create the context menu
     * @private
     */
    createMenu: function(){
        this.menu = Ext.create('widget.menu', {
            items: [{
                scope: this,
                handler: this.onLoadClick,
                text: 'Load feed',
                iconCls: 'feed-load'
            }, this.removeAction, '-', this.addAction],
            listeners: {
                hide: function(c){
                    c.activeFeed = null;
                }
            }
        });
    },

    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onSelectionChange: function(){
        var selected = this.getSelectedItem();
        this.toolbar.getComponent('remove').setDisabled(!selected);
        if (selected) {
            this.loadFeed(selected);
        }
    },

    /**
     * React to the load feed menu click.
     * @private
     */
    onLoadClick: function(){
        this.loadFeed(this.menu.activeFeed);
    },

    /**
     * Loads a feed.
     * @private
     * @param {Ext.data.Model} rec The feed
     */
    loadFeed: function(rec){
        if (rec) {
            this.fireEvent('feedselect', this, rec.get('title'), rec.get('url'));
        }
    },

    /**
     * Gets the currently selected record in the view.
     * @private
     * @return {Ext.data.Model} Returns the selected model. false if nothing is selected.
     */
    getSelectedItem: function(){
        return this.view.getSelectionModel().getSelection()[0] || false;
    },

    /**
     * Listens for the context menu event on the view
     * @private
     */
    onContextMenu: function(view, index, el, event){
        var menu = this.menu;

        event.stopEvent();
        menu.activeFeed = view.store.getAt(index);
        menu.showAt(event.getXY());
    },

    /**
     * React to a feed being removed
     * @private
     */
    onRemoveFeedClick: function() {
        var active = this.menu.activeFeed || this.getSelectedItem();


        if (active) {
            this.view.getSelectionModel().deselectAll();
            this.animateNode(this.view.getNode(active), 1, 0, {
                scope: this,
                afteranimate: function() {
                    this.view.store.remove(active);
                    
                }
            });
            this.fireEvent('feedremove', this, active.get('title'), active.get('url'));
        }
    },

    /**
     * React to a feed attempting to be added
     * @private
     */
    onAddFeedClick: function(){
        var win = this.addFeedWindow || (this.addFeedWindow = Ext.create('widget.feedwindow', {
            listeners: {
                scope: this,
                feedvalid: this.onFeedValid
            }
        }));
        win.form.getForm().reset();
        win.show();
    },

    /**
     * React to a validation on a feed passing
     * @private
     * @param {FeedViewer.FeedWindow} win
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    onFeedValid: function(win, title, url){
        var view = this.view,
            store = view.store,
            rec;

        rec = store.add({
            url: url,
            title: title
        })[0];
        this.animateNode(view.getNode(rec), 0, 1);
    },

    /**
     * Animate a node in the view when it is added/removed
     * @private
     * @param {Mixed} el The element to animate
     * @param {Number} start The start opacity
     * @param {Number} end The end opacity
     * @param {Object} listeners (optional) Any listeners
     */
    animateNode: function(el, start, end, listeners){
        Ext.create('Ext.fx.Anim', {
            target: Ext.get(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
         });
    },

    // Inherit docs
    onDestroy: function(){
        this.callParent(arguments);
        this.menu.destroy();
    }
});
