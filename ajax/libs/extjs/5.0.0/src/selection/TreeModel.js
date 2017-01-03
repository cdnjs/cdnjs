/**
 * Adds custom behavior for left/right keyboard navigation for use with a tree.
 * Depends on the view having an expand and collapse method which accepts a
 * record. This selection model is created by default for {@link Ext.tree.Panel}.
 */
Ext.define('Ext.selection.TreeModel', {
    extend: 'Ext.selection.RowModel',
    alias: 'selection.treemodel',

    /**
     * @cfg {Boolean} pruneRemoved @hide
     */

    constructor: function(config) {
        this.callParent(arguments);

        // If pruneRemoved is required, we must listen to the *TreeStore* to know when nodes
        // are added and removed
        if (this.pruneRemoved) {
            this.pruneRemoved = false;
            this.pruneRemovedNodes = true;
        }
    },

    // binds the store to the selModel.
    bindStore: function(store, initial) {
        var me = this;
        me.callParent(arguments);

        // TreePanel should have injected a reference to the TreeStore so that we can
        // listen for node removal.
        if (me.pruneRemovedNodes) {
            me.view.mon(me.treeStore, {
                remove: me.onNodeRemove,
                scope: me
            });
        }
    },

    onNodeRemove: function(parent, node, isMove) {
        // deselection of deleted records done in base Model class
        if (!isMove) {
            this.deselectDeletedRecords([node]);
        }
    },

    onKeyRight: function(e, t) {
        this.navExpand(e, t);
    },
    
    navExpand: function(e, t) {
        var me      = this,
            focused = me.getLastFocused(),
            view    = me.view;

        if (focused) {
            // tree node is already expanded, go down instead
            // this handles both the case where we navigate to firstChild and if
            // there are no children to the nextSibling
            if (focused.isExpanded()) {
                me.onKeyDown(e, t);
            // if its not a leaf node, expand it
            } else if (focused.isExpandable()) {
                // If we are the normal side of a locking pair, only the tree view can do expanding
                if (!view.isTreeView) {
                    view = view.lockingPartner;
                }

                view.expand(focused);
                if (focused) {
                    me.onLastFocusChanged(null, focused);
                }
            }
        }
    },

    onKeyLeft: function(e, t) {
        this.navCollapse(e, t);
    },
    
    navCollapse: function(e, t) {
        var me = this,
            focused = me.getLastFocused(),
            view    = me.view,
            parentNode;

        if (focused) {
            parentNode = focused.parentNode;
            // if focused node is already expanded, collapse it
            if (focused.isExpanded()) {
                // If we are the normal side of a locking pair, only the tree view can do collapsing
                if (!view.isTreeView) {
                    view = view.lockingPartner;
                }

                view.collapse(focused);
                me.onLastFocusChanged(null, focused);
            // has a parentNode and its not root
            // TODO: this needs to cover the case where the root isVisible
            } else if (parentNode && !parentNode.isRoot()) {
                // Select a range of records when doing multiple selection.
                if (e.shiftKey) {
                    me.selectRange(parentNode, focused, e.ctrlKey, 'up');
                    me.setLastFocused(parentNode);
                // just move focus, not selection
                } else if (e.ctrlKey) {
                    me.setLastFocused(parentNode);
                // select it
                } else {
                    me.select(parentNode);
                }
            }
            this.onLastFocusChanged(null, focused);
        }
    },

    onKeySpace: function(e, t) {
        if (e.record.data.checked != null) {
            this.toggleCheck(e);
        } else {
            this.callParent(arguments);
        }
    },

    onKeyEnter: function(e, t) {
        if (e.record.data.checked != null) {
            this.toggleCheck(e);
        } else {
            this.callParent(arguments);
        }
    },

    toggleCheck: function(e) {
        var view = this.view,
            selected = this.getLastSelected();

        e.stopEvent();
        if (selected) {
            // If we are the normal side of a locking pair, only the tree view can do on heckChange
            if (!view.isTreeView) {
                view = view.lockingPartner;
            }

            view.onCheckChange(selected);
        }
    }
});
