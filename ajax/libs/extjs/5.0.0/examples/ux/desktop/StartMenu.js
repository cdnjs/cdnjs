/**
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 * @class Ext.ux.desktop.StartMenu
 */
Ext.define('Ext.ux.desktop.StartMenu', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.menu.Menu',
        'Ext.toolbar.Toolbar'
    ],

    ariaRole: 'menu',

    cls: 'x-menu ux-start-menu',

    defaultAlign: 'bl-tl',

    iconCls: 'user',

    floating: true,

    shadow: true,

    // We have to hardcode a width because the internal Menu cannot drive our width.
    // This is combined with changing the align property of the menu's layout from the
    // typical 'stretchmax' to 'stretch' which allows the the items to fill the menu
    // area.
    width: 300,

    initComponent: function() {
        var me = this, menu = me.menu;

        me.menu = new Ext.menu.Menu({
            cls: 'ux-start-menu-body',
            border: false,
            floating: false,
            items: menu
        });
        me.menu.layout.align = 'stretch';

        me.items = [me.menu];
        me.layout = 'fit';

        Ext.menu.Manager.register(me);
        me.callParent();
        // TODO - relay menu events

        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            cls: 'ux-start-menu-toolbar',
            vertical: true,
            width: 100,
            listeners: {
                add: function(tb, c) {
                    c.on({
                        click: function() {
                            me.hide();
                        }
                    });
                }
            }
        }, me.toolConfig));

        me.toolbar.layout.align = 'stretch';
        me.addDocked(me.toolbar);

        delete me.toolItems;
    },

    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },

    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
}); // StartMenu
