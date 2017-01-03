/**
 * A specialized {@link Ext.util.KeyNav} implementation for navigating a {@link Ext.view.BoundList} using
 * the keyboard. The up, down, pageup, pagedown, home, and end keys move the active highlight
 * through the list. The enter key invokes the selection model's select action using the highlighted item.
 */
Ext.define('Ext.view.BoundListKeyNav', {
    extend: 'Ext.util.KeyNav',
    requires: 'Ext.view.BoundList',

    /**
     * @cfg {Ext.view.BoundList} boundList (required)
     * The {@link Ext.view.BoundList} instance for which key navigation will be managed.
     */

    constructor: function(el, config) {
        var me = this;
        me.boundList = config.boundList;
        me.callParent([el, Ext.apply({}, config, me.defaultHandlers)]);
    },

    defaultHandlers: {
        up: function() {
            var me = this,
                boundList = me.boundList,
                allItems = boundList.all,
                oldItem = boundList.highlightedItem,
                oldItemIdx = oldItem ? boundList.indexOf(oldItem) : -1,
                newItemIdx = oldItemIdx > 0 ? oldItemIdx - 1 : allItems.getCount() - 1; //wraps around
            me.highlightAt(newItemIdx);
        },

        down: function() {
            var me = this,
                boundList = me.boundList,
                allItems = boundList.all,
                oldItem = boundList.highlightedItem,
                oldItemIdx = oldItem ? boundList.indexOf(oldItem) : -1,
                newItemIdx = oldItemIdx < allItems.getCount() - 1 ? oldItemIdx + 1 : 0; //wraps around
            me.highlightAt(newItemIdx);
        },

        pageup: function() {
            //TODO
        },

        pagedown: function() {
            //TODO
        },

        home: function() {
            this.highlightAt(0);
        },

        end: function() {
            var me = this;
            me.highlightAt(me.boundList.all.getCount() - 1);
        },

        enter: function(e) {
            this.selectHighlighted(e);
        }
    },

    /**
     * Highlights the item at the given index.
     * @param {Number} index
     */
    highlightAt: function(index) {
        var boundList = this.boundList,
            item = boundList.all.item(index);
        if (item) {
            item = item.dom;
            boundList.highlightItem(item);
            boundList.getTargetEl().scrollChildIntoView(item, false);
        }
    },

    /**
     * Triggers selection of the currently highlighted item according to the behavior of
     * the configured SelectionModel.
     */
    selectHighlighted: function(e) {
        var boundList = this.boundList,
            selModel = boundList.getSelectionModel(),
            highlighted, highlightedRec;

        highlighted = boundList.highlightedItem;
        if (highlighted) {
            highlightedRec = boundList.getRecord(highlighted);    

            // Select if not already selected.
            // If already selected, selecting with no CTRL flag will deselect the record.
            if (e.getKey() === e.ENTER || !selModel.isSelected(highlightedRec)) {
                selModel.selectWithEvent(highlightedRec, e);
            }
        }
    }

});