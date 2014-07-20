/**
 * @class FeedViewer.FeedPost
 * @extends Ext.panel.Panel
 *
 * Shows the detail of a feed post
 *
 * @constructor
 * Create a new Feed Post
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.FeedPost', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.feedpost',
    cls: 'preview',
    autoScroll: true,
    border: true,

    tpl: ['<div class="post-data">',
        '<span class="post-date">{pubDate:this.formatDate}</span>',
        '<h3 class="post-title">{title}</h3>',
        '<h4 class="post-author">by {author:this.defaultValue}</h4>',
    '</div>',
    '<div class="post-body">{content:this.getBody}</div>',
    {
        getBody: function(value, all){
            return Ext.util.Format.stripScripts(value);
        },

        defaultValue: function(v){
            return v ? v : 'Unknown';
        },

        formatDate: function(value){
            if (!value) {
                return '';
            }
            return Ext.Date.format(value, 'M j, Y, g:i a');
        }
    }],
    
    initComponent: function(){
        this.dockedItems = [this.createToolbar()];
        this.callParent(arguments);
    },

    /**
     * Set the active post
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this,
            gotoButton = me.down('button[text=Go to post]');

        me.active = rec;
        me.update(rec.data);
        gotoButton.setHref(rec.get('link'));
    },

    /**
     * Create the top toolbar
     * @private
     * @return {Ext.toolbar.Toolbar} toolbar
     */
    createToolbar: function(){
        var items = [],
            config = {};
        if (!this.inTab) {
            items.push({
                scope: this,
                handler: this.openTab,
                text: 'View in new tab',
                iconCls: 'tab-new'
            }, '-');
        }
        else {
            config.cls = 'x-docked-noborder-top';
        }
        items.push({
            href: this.inTab ? this.getData().link : '#',
            target: '_blank',
            text: 'Go to post',
            iconCls: 'post-go'
        });
        config.items = items;
        return Ext.create('widget.toolbar', config);
    },

    /**
     * Navigate to the active post in a new window
     * @private
     */
    goToPost: function(){
        window.open(this.active.get('link'));
    },

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(){
        this.fireEvent('opentab', this, this.active);
    }

});