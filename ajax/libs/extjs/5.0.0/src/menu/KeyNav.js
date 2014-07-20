/**
 * @private
 */
Ext.define('Ext.menu.KeyNav', {
    extend: 'Ext.util.KeyNav',
    
    constructor: function(config) {
        var me = this;

        me.menu = config.target;
        me.callParent([Ext.apply({
            down: me.down,
            enter: me.enter,
            esc: me.escape,
            left: me.left,
            right: me.right,
            space: me.enter,
            tab: me.tab,
            up: me.up
        }, config)]);
    },

    down: function(e) {
        var me = this,
            fi = me.menu.focusedItem;

        if (fi && e.getKey() == e.DOWN && me.isWhitelisted(fi)) {
            return true;
        }
        me.focusNextItem(1);
    },

    enter: function(e) {
        var menu = this.menu,
            focused = menu.focusedItem;
 
        if (menu.activeItem) {
            menu.onClick(e);
        } else if (focused && focused.isFormField) {
            // prevent stopEvent being called
            return true;
        }
    },

    escape: function(e) {
        Ext.menu.Manager.hideAll();
    },

    focusNextItem: function(step) {
        var menu = this.menu,
            items = menu.items,
            focusedItem = menu.focusedItem,
            startIdx = focusedItem ? items.indexOf(focusedItem) : -1,
            idx = startIdx + step,
            len = items.length,
            count = 0,
            item;

        // Limit the count, since we might not be able to find something to focus
        while (count < len && idx !== startIdx) {
            if (idx < 0) {
                idx = len - 1;
            } else if (idx >= len) {
                idx = 0;
            }

            item = items.getAt(idx);
            if (menu.canActivateItem(item)) {
                menu.setActiveItem(item);
                break;
            }
            idx += step;
            ++count;
        }
    },

    isWhitelisted: function(item) {
        var mgr = Ext['FocusManager'];
        
        return mgr && mgr.isWhitelisted(item);
    },

    left: function(e) {
        var menu = this.menu,
            fi = menu.focusedItem;

        if (fi && this.isWhitelisted(fi)) {
            return true;
        }

        if (menu.parentMenu) {
            menu.hide();
            menu.parentMenu.focus();
        }
    },

    right: function(e) {
        var menu = this.menu,
            fi = menu.focusedItem,
            ai = menu.activeItem,
            am;

        if (fi && this.isWhitelisted(fi)) {
            return true;
        }

        if (ai) {
            am = menu.activeItem.menu;
            if (am) {
                ai.expandMenu(0);
                am.setActiveItem(am.child(':focusable'));
            }
        }
    },

    tab: function(e) {
        var me = this;

        if (e.shiftKey) {
            me.up(e);
        } else {
            me.down(e);
        }
    },

    up: function(e) {
        var me = this,
            fi = me.menu.focusedItem;

        if (fi && e.getKey() == e.UP && me.isWhitelisted(fi)) {
            return true;
        }
        me.focusNextItem(-1);
    }
});
