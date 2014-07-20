Ext.define('FV.view.feed.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.feedlist',

    requires: ['Ext.toolbar.Toolbar'],

    title: 'Feeds',
    collapsible: true,
    animCollapse: true,
    margin: '5 0 5 5',
    layout: 'fit',

    initComponent: function() {
        var theme = Ext.themeName,
            cls = '';
        
        if(theme.lastIndexOf('neptune') >= 0 || theme === 'crisp'){
            cls = 'neptune';
        }
        
        Ext.apply(this, {
            items: [{
                xtype: 'dataview',
                trackOver: true,
                store: this.store,
                cls: 'feed-list',
                itemSelector: '.feed-list-item',
                overItemCls: 'feed-list-item-hover',
                tpl: '<tpl for="."><div class="feed-list-item ' + cls + '">{name}</div></tpl>',
                listeners: {
                    selectionchange: this.onSelectionChange,
                    scope: this
                }
            }],

            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'feed-add',
                    text: 'Add',
                    action: 'add'
                }, {
                    iconCls: 'feed-remove',
                    text: 'Remove',
                    disabled: true,
                    action: 'remove'
                }]
            }]
        });

        this.callParent(arguments);
    },

    onSelectionChange: function(selmodel, selection) {
        var selected = selection[0],
            button = this.down('button[action=remove]');
        if (selected) {
            button.enable();
        }
        else {
            button.disable();
        }
    }
});
