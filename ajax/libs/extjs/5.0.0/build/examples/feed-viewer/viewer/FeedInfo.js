/**
 * @class FeedViewer.FeedInfo
 * @extends Ext.tab.Panel
 *
 * A container class for showing a series of feed details
 * 
 * @constructor
 * Create a new Feed Info
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.FeedInfo', {
    
    extend: 'Ext.tab.Panel',
    alias: 'widget.feedinfo',
    
    maxTabWidth: 230,
    border: false,

    tabBar: {
        border: true
    },
    
    /**
     * Add a new feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    addFeed: function(title, url){
        var active = this.items.first();
        if (!active) {
            active = this.add({
                xtype: 'feeddetail',
                title: title,
                url: url,
                closable: false,
                listeners: {
                    scope: this,
                    opentab: this.onTabOpen,
                    openall: this.onOpenAll,
                    rowdblclick: this.onRowDblClick
                }
            });
        } else {
            active.loadFeed(url);
            active.tab.setText(title);
        }
        this.setActiveTab(active);
    },
    
    /**
     * Listens for a new tab request
     * @private
     * @param {FeedViewer.FeedPost} post The post
     * @param {Ext.data.Model} rec The model instance
     */
    onTabOpen: function(post, rec) {
        var items = [],
            item,
            title;
            
        if (Ext.isArray(rec)) {
            Ext.each(rec, function(rec) {
                title = rec.get('title');
                if (!this.getTabByTitle(title)) {
                    items.push({
                        inTab: true,
                        xtype: 'feedpost',
                        title: title,
                        closable: true,
                        data: rec.data,
                        active: rec
                    });
                }
            }, this);
            this.add(items);
        }
        else if (rec) {
            title = rec.get('title');
            item = this.getTabByTitle(title);
            if (!item) {
                item = this.add({
                    inTab: true,
                    xtype: 'feedpost',
                    title: title,
                    closable: true,
                    data: rec.data,
                    active: rec
                });
            }
            this.setActiveTab(item);
        }
    },

    /**
     * Find a tab by title
     * @param {String} title The title of the tab
     * @return {Ext.Component} The panel matching the title. null if not found.
     */
    getTabByTitle: function(title) {
        var index = this.items.findIndex('title', title);
        return (index < 0) ? null : this.items.getAt(index);
    },
    
    /**
     * Listens for a row dblclick
     * @private
     * @param {FeedViewer.Detail} info The detail
     * @param {Ext.data.Model} rec The model instance
     */
    onRowDblClick: function(info, rec){
        this.onTabOpen(null, rec);
    },
    
    /**
     * Listens for the open all click
     * @private
     * @param {FeedViewer.FeedDetail} detail
     */
    onOpenAll: function(detail) {
        this.onTabOpen(null, detail.getFeedData());
    }
});