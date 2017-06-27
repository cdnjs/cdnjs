/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * @private
 */
Ext.define('Ext.menu.KeyNav', {
    extend: 'Ext.util.KeyNav',

    requires: ['Ext.FocusManager'],
    
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

        if (fi && e.getKey() == Ext.EventObject.DOWN && me.isWhitelisted(fi)) {
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
        return Ext.FocusManager.isWhitelisted(item);
    },

    left: function(e) {
        var menu = this.menu,
            fi = menu.focusedItem;

        if (fi && this.isWhitelisted(fi)) {
            return true;
        }

        menu.hide();
        if (menu.parentMenu) {
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

        if (fi && e.getKey() == Ext.EventObject.UP && me.isWhitelisted(fi)) {
            return true;
        }
        me.focusNextItem(-1);
    }
});