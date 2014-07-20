/**
 * Provides a common registry of all menus on a page.
 * @singleton
 */
Ext.define('Ext.menu.Manager', {
    singleton: true,
    requires: [
        'Ext.util.MixedCollection',
        'Ext.util.KeyMap'
    ],
    alternateClassName: 'Ext.menu.MenuMgr',

    uses: ['Ext.menu.Menu'],
    
    menuSelector: '.' + Ext.baseCSSPrefix + 'menu',

    menus: {},
    groups: {},
    attached: false,
    lastShow: new Date(),

    init: function() {
        var me = this;
        
        me.active = new Ext.util.MixedCollection();
        Ext.getDoc().addKeyListener(27, function() {
            if (me.active.length > 0) {
                me.hideAll();
            }
        }, me);
    },

    /**
     * Hides all menus that are currently visible
     * @return {Boolean} success True if any active menus were hidden.
     */
    hideAll: function() {
        var active = this.active,
            menus, m, mLen;

        if (active && active.length > 0) {
            menus = Ext.Array.slice(active.items);
            mLen  = menus.length;

            for (m = 0; m < mLen; m++) {
                menus[m].hide();
            }

            return true;
        }
        return false;
    },

    onHide: function(m) {
        var me = this,
            active = me.active;
        active.remove(m);
        if (active.length < 1) {
            Ext.un('mousedown', me.onMouseDown, me);
            me.attached = false;
        }
    },

    onShow: function(m) {
        var me = this,
            active   = me.active,
            attached = me.attached;

        me.lastShow = new Date();
        active.add(m);
        if (!attached) {
            Ext.on('mousedown', me.onMouseDown, me, {
                // On IE we have issues with the menu stealing focus at certain points
                // during the head, so give it a short buffer
                buffer: Ext.isIE9m ? 10 : undefined
            });
            me.attached = true;
        }
        m.toFront();
    },

    onBeforeHide: function(m) {
        if (m.activeChild) {
            m.activeChild.hide();
        }
        if (m.autoHideTimer) {
            clearTimeout(m.autoHideTimer);
            delete m.autoHideTimer;
        }
    },

    onBeforeShow: function(m) {
        var active = this.active,
            parentMenu = m.parentMenu;
            
        active.remove(m);
        if (!parentMenu && !m.allowOtherMenus) {
            this.hideAll();
        }
        else if (parentMenu && parentMenu.activeChild && m != parentMenu.activeChild) {
            parentMenu.activeChild.hide();
        }
    },

    // @private
    onMouseDown: function(e) {
        var me = this,
            active = me.active,
            activeMenuCount = active.length,
            lastShow = me.lastShow,
            i;

        if (Ext.Date.getElapsed(lastShow) > 50 && activeMenuCount) {
            // Because we use a buffer in IE, the target may have been removed from the
            // DOM by the time we get here, so the selector will never find the menu. In this
            // case, it's safer to not hide than menus than to do so
            if (Ext.isIE9m && !Ext.getDoc().contains(e.target)) {
                return;
            }
            else {
                // If any active menus are an ancestor of the target element, we don't hide
                for (i = 0; i < activeMenuCount; i++) {
                    if (active.items[i].owns(e.target)) {
                        return;
                    }
                }
            }
            me.hideAll();
        }
    },

    // @private
    register: function(menu) {
        var me = this;

        if (!me.active) {
            me.init();
        }

        if (menu.floating) {
            me.menus[menu.id] = menu;
            menu.on({
                beforehide: me.onBeforeHide,
                hide: me.onHide,
                beforeshow: me.onBeforeShow,
                show: me.onShow,
                scope: me
            });
        }
    },

    /**
     * Returns a {@link Ext.menu.Menu} object
     * @param {String/Object} menu The string menu id, an existing menu object reference, or a Menu config that will
     * be used to generate and return a new Menu this.
     * @return {Ext.menu.Menu} The specified menu, or null if none are found
     */
    get: function(menu) {
        var menus = this.menus;
        
        if (typeof menu == 'string') { // menu id
            if (!menus) {  // not initialized, no menus to return
                return null;
            }
            return menus[menu];
        } else if (menu.isMenu) {  // menu instance
            return menu;
        } else if (Ext.isArray(menu)) { // array of menu items
            return new Ext.menu.Menu({items:menu});
        } else { // otherwise, must be a config
            return Ext.ComponentManager.create(menu, 'menu');
        }
    },

    // @private
    unregister: function(menu) {
        var me = this,
            menus = me.menus,
            active = me.active;

        delete menus[menu.id];
        active.remove(menu);
        menu.un({
            beforehide: me.onBeforeHide,
            hide: me.onHide,
            beforeshow: me.onBeforeShow,
            show: me.onShow,
            scope: me
        });
    },

    // @private
    registerCheckable: function(menuItem) {
        var groups  = this.groups,
            groupId = menuItem.group;

        if (groupId) {
            if (!groups[groupId]) {
                groups[groupId] = [];
            }

            groups[groupId].push(menuItem);
        }
    },

    // @private
    unregisterCheckable: function(menuItem) {
        var groups  = this.groups,
            groupId = menuItem.group;

        if (groupId) {
            Ext.Array.remove(groups[groupId], menuItem);
        }
    },

    onCheckChange: function(menuItem, state) {
        var groups  = this.groups,
            groupId = menuItem.group,
            i       = 0,
            group, ln, curr;

        if (groupId && state) {
            group = groups[groupId];
            ln = group.length;
            for (; i < ln; i++) {
                curr = group[i];
                if (curr != menuItem) {
                    curr.setChecked(false);
                }
            }
        }
    }
});