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
 * A menu object. This is the container to which you may add {@link Ext.menu.Item menu items}.
 *
 * Menus may contain either {@link Ext.menu.Item menu items}, or general {@link Ext.Component Components}.
 * Menus may also contain {@link Ext.panel.AbstractPanel#dockedItems docked items} because it extends {@link Ext.panel.Panel}.
 *
 * By default, non {@link Ext.menu.Item menu items} are indented so that they line up with the text of menu items. clearing
 * the icon column. To make a contained general {@link Ext.Component Component} left aligned configure the child
 * Component with `indent: false.
 *
 * By default, Menus are absolutely positioned, floating Components. By configuring a Menu with `{@link #floating}: false`,
 * a Menu may be used as a child of a {@link Ext.container.Container Container}.
 *
 *     @example
 *     Ext.create('Ext.menu.Menu', {
 *         width: 100,
 *         margin: '0 0 10 0',
 *         floating: false,  // usually you want this set to True (default)
 *         renderTo: Ext.getBody(),  // usually rendered by it's containing component
 *         items: [{
 *             text: 'regular item 1'
 *         },{
 *             text: 'regular item 2'
 *         },{
 *             text: 'regular item 3'
 *         }]
 *     });
 *
 *     Ext.create('Ext.menu.Menu', {
 *         width: 100,
 *         plain: true,
 *         floating: false,  // usually you want this set to True (default)
 *         renderTo: Ext.getBody(),  // usually rendered by it's containing component
 *         items: [{
 *             text: 'plain item 1'
 *         },{
 *             text: 'plain item 2'
 *         },{
 *             text: 'plain item 3'
 *         }]
 *     });
 */
Ext.define('Ext.menu.Menu', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menu',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.layout.container.VBox',
        'Ext.menu.CheckItem',
        'Ext.menu.Item',
        'Ext.menu.KeyNav',
        'Ext.menu.Manager',
        'Ext.menu.Separator'
    ],

    /**
     * @property {Ext.menu.Menu} parentMenu
     * The parent Menu of this Menu.
     */
    
    /**
     * @cfg {Boolean} [enableKeyNav=true]
     * True to enable keyboard navigation for controlling the menu.
     * This option should generally be disabled when form fields are
     * being used inside the menu.
     */
    enableKeyNav: true,

    /**
     * @cfg {Boolean} [allowOtherMenus=false]
     * True to allow multiple menus to be displayed at the same time.
     */
    allowOtherMenus: false,

    /**
     * @cfg {String} ariaRole
     * @private
     */
    ariaRole: 'menu',

    /**
     * @cfg {Boolean} autoRender
     * Floating is true, so autoRender always happens.
     * @private
     */

    /**
     * @cfg {Boolean} [floating=true]
     * A Menu configured as `floating: true` (the default) will be rendered as an absolutely positioned,
     * {@link Ext.Component#floating floating} {@link Ext.Component Component}. If configured as `floating: false`, the Menu may be
     * used as a child item of another {@link Ext.container.Container Container}.
     */
    floating: true,

    /**
     * @cfg {Boolean} constrain
     * Menus are constrained to the document body by default.
     * @private
     */
    constrain: true,

    /**
     * @cfg {Boolean} [hidden=undefined]
     * True to initially render the Menu as hidden, requiring to be shown manually.
     *
     * Defaults to `true` when `floating: true`, and defaults to `false` when `floating: false`.
     */
    hidden: true,

    hideMode: 'visibility',

    /**
     * @cfg {Boolean} [ignoreParentClicks=false]
     * True to ignore clicks on any item in this menu that is a parent item (displays a submenu)
     * so that the submenu is not dismissed when clicking the parent item.
     */
    ignoreParentClicks: false,

    /**
     * @property {Boolean} isMenu
     * `true` in this class to identify an object as an instantiated Menu, or subclass thereof.
     */
    isMenu: true,

    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * @private
     */

    /**
     * @cfg {Boolean} [showSeparator=true]
     * True to show the icon separator.
     */
    showSeparator : true,

    /**
     * @cfg {Number} [minWidth=120]
     * The minimum width of the Menu. The default minWidth only applies when the {@link #floating} config is true.
     */
    minWidth: undefined,

    defaultMinWidth: 120,

    /**
     * @cfg {Boolean} [plain=false]
     * True to remove the incised line down the left side of the menu and to not indent general Component items.
     * 
     * {@link Ext.menu.Item MenuItem}s will *always* have space at their start for an icon. With the `plain` setting,
     * non {@link Ext.menu.Item MenuItem} child components will not be indented to line up.
     * 
     * Basically, `plain:true` makes a Menu behave more like a regular {@link Ext.layout.container.HBox HBox layout}
     * {@link Ext.panel.Panel Panel} which just has the same background as a Menu.
     * 
     * See also the {@link #showSeparator} config.
     */

    initComponent: function() {
        var me = this,
            prefix = Ext.baseCSSPrefix,
            cls = [prefix + 'menu'],
            bodyCls = me.bodyCls ? [me.bodyCls] : [],
            isFloating = me.floating !== false;

        me.addEvents(
            /**
             * @event click
             * Fires when this menu is clicked
             * @param {Ext.menu.Menu} menu The menu which has been clicked
             * @param {Ext.Component} item The menu item that was clicked. `undefined` if not applicable.
             * @param {Ext.EventObject} e The underlying {@link Ext.EventObject}.
             */
            'click',

            /**
             * @event mouseenter
             * Fires when the mouse enters this menu
             * @param {Ext.menu.Menu} menu The menu
             * @param {Ext.EventObject} e The underlying {@link Ext.EventObject}
             */
            'mouseenter',

            /**
             * @event mouseleave
             * Fires when the mouse leaves this menu
             * @param {Ext.menu.Menu} menu The menu
             * @param {Ext.EventObject} e The underlying {@link Ext.EventObject}
             */
            'mouseleave',

            /**
             * @event mouseover
             * Fires when the mouse is hovering over this menu
             * @param {Ext.menu.Menu} menu The menu
             * @param {Ext.Component} item The menu item that the mouse is over. `undefined` if not applicable.
             * @param {Ext.EventObject} e The underlying {@link Ext.EventObject}
             */
            'mouseover'
        );

        Ext.menu.Manager.register(me);

        // Menu classes
        if (me.plain) {
            cls.push(prefix + 'menu-plain');
        }
        me.cls = cls.join(' ');

        // Menu body classes
        bodyCls.push(prefix + 'menu-body', Ext.dom.Element.unselectableCls);
        me.bodyCls = bodyCls.join(' ');

        // Internal vbox layout, with scrolling overflow
        // Placed in initComponent (rather than prototype) in order to support dynamic layout/scroller
        // options if we wish to allow for such configurations on the Menu.
        // e.g., scrolling speed, vbox align stretch, etc.
        if (!me.layout) {
            me.layout = {
                type: 'vbox',
                align: 'stretchmax',
                overflowHandler: 'Scroller'
            };
        }

        if (isFloating)  {
            // only apply the minWidth when we're floating & one hasn't already been set
            if (me.minWidth === undefined) {
                me.minWidth = me.defaultMinWidth;
            }
        } else {
            // hidden defaults to false if floating is configured as false
            me.hidden = !!me.initialConfig.hidden;
            me.constrain = false;
        }

        me.callParent(arguments);
    },

    // Private implementation for Menus. They are a special case.
    // They are always global floaters, never contained.
    registerWithOwnerCt: function() {
        if (this.floating) {
            this.ownerCt = null;
            Ext.WindowManager.register(this);
        }
    },

    // Menus do not have owning containers on which they depend for visibility. They stand outside
    // any container hierarchy.
    initHierarchyEvents: Ext.emptyFn,

    // Menus are never contained, and must not ascertain their visibility from the ancestor hierarchy
    isVisible: function() {
        return this.callParent();
    },

    // As menus are never contained, a Menu's visibility only ever depends upon its own hidden state.
    // Ignore hiddenness from the ancestor hierarchy, override it with local hidden state.
    getHierarchyState: function() {
        var result = this.callParent();
        result.hidden = this.hidden;
        return result;
    },

    beforeRender: function() {
        this.callParent(arguments);

        // Menus are usually floating: true, which means they shrink wrap their items.
        // However, when they are contained, and not auto sized, we must stretch the items.
        if (!this.getSizeModel().width.shrinkWrap) {
            this.layout.align = 'stretch';
        }
    },

    onBoxReady: function() {
        var me = this;

        me.callParent(arguments);

        // TODO: Move this to a subTemplate When we support them in the future
        if (me.showSeparator) {
            me.iconSepEl = me.layout.getElementTarget().insertFirst({
                cls: Ext.baseCSSPrefix + 'menu-icon-separator',
                html: '&#160;'
            });
        }

        me.mon(me.el, {
            click: me.onClick,
            mouseover: me.onMouseOver,
            scope: me
        });
        me.mouseMonitor = me.el.monitorMouseLeave(100, me.onMouseLeave, me);

        // A Menu is a Panel. The KeyNav can use the Panel's KeyMap
        if (me.enableKeyNav) {
            me.keyNav = new Ext.menu.KeyNav({
                target: me,
                keyMap: me.getKeyMap()
            });
        }
    },

    getRefOwner: function() {
        // If a submenu, this will have a parentMenu property
        // If a menu of a Button, it will have an ownerButton property
        // Else use the default method.
        return this.parentMenu || this.ownerButton || this.callParent(arguments);
    },

    /**
     * Returns whether a menu item can be activated or not.
     * @return {Boolean}
     */
    canActivateItem: function(item) {
        return item && !item.isDisabled() && item.isVisible() && (item.canActivate || item.getXTypes().indexOf('menuitem') < 0);
    },

    /**
     * Deactivates the current active item on the menu, if one exists.
     */
    deactivateActiveItem: function(andBlurFocusedItem) {
        var me = this,
            activeItem = me.activeItem,
            focusedItem = me.focusedItem;

        if (activeItem) {
            activeItem.deactivate();
            if (!activeItem.activated) {
                delete me.activeItem;
            }
        }

        // Blur the focused item if we are being asked to do that too
        // Only needed if we are being hidden - mouseout does not blur.
        if (focusedItem && andBlurFocusedItem) {
            focusedItem.blur();
            delete me.focusedItem;
        }
    },

    // @inheritdoc
    getFocusEl: function() {
        return this.focusedItem || this.el;
    },

    // @inheritdoc
    hide: function() {
        this.deactivateActiveItem(true);
        this.callParent(arguments);
    },

    // @private
    getItemFromEvent: function(e) {
        return this.getChildByElement(e.getTarget());
    },

    lookupComponent: function(cmp) {
        var me = this;

        if (typeof cmp == 'string') {
            cmp = me.lookupItemFromString(cmp);
        } else if (Ext.isObject(cmp)) {
            cmp = me.lookupItemFromObject(cmp);
        }

        // Apply our minWidth to all of our child components so it's accounted
        // for in our VBox layout
        cmp.minWidth = cmp.minWidth || me.minWidth;

        return cmp;
    },

    // @private
    lookupItemFromObject: function(cmp) {
        var me = this,
            prefix = Ext.baseCSSPrefix,
            cls;

        if (!cmp.isComponent) {
            if (!cmp.xtype) {
                cmp = Ext.create('Ext.menu.' + (Ext.isBoolean(cmp.checked) ? 'Check': '') + 'Item', cmp);
            } else {
                cmp = Ext.ComponentManager.create(cmp, cmp.xtype);
            }
        }

        if (cmp.isMenuItem) {
            cmp.parentMenu = me;
        }

        if (!cmp.isMenuItem && !cmp.dock) {
            cls = [prefix + 'menu-item-cmp'];

            // The "plain" setting means that the menu does not look so much like a menu. It's more like a grey Panel.
            // So it has no vertical separator.
            // Plain menus also will not indent non MenuItem components; there is nothing to indent them to the right of.
            if (!me.plain && (cmp.indent !== false || cmp.iconCls === 'no-icon')) {
                cls.push(prefix + 'menu-item-indent');
            }

            if (cmp.rendered) {
                cmp.el.addCls(cls);
            } else {
                cmp.cls = (cmp.cls || '') + ' ' + cls.join(' ');
            }
        }
        return cmp;
    },

    // @private
    lookupItemFromString: function(cmp) {
        return (cmp == 'separator' || cmp == '-') ?
            new Ext.menu.Separator()
            : new Ext.menu.Item({
                canActivate: false,
                hideOnClick: false,
                plain: true,
                text: cmp
            });
    },

    onClick: function(e) {
        var me = this,
            item;

        if (me.disabled) {
            e.stopEvent();
            return;
        }

        item = (e.type === 'click') ? me.getItemFromEvent(e) : me.activeItem;
        if (item && item.isMenuItem) {
            if (!item.menu || !me.ignoreParentClicks) {
                item.onClick(e);
            } else {
                e.stopEvent();
            }
        }
        // Click event may be fired without an item, so we need a second check
        if (!item || item.disabled) {
            item = undefined;
        }
        me.fireEvent('click', me, item, e);
    },

    onDestroy: function() {
        var me = this;

        Ext.menu.Manager.unregister(me);
        me.parentMenu = me.ownerButton = null;
        if (me.rendered) {
            me.el.un(me.mouseMonitor);
            Ext.destroy(me.keyNav);
            me.keyNav = null;
        }
        me.callParent(arguments);
    },

    onMouseLeave: function(e) {
        var me = this;

        me.deactivateActiveItem();

        if (me.disabled) {
            return;
        }

        me.fireEvent('mouseleave', me, e);
    },

    onMouseOver: function(e) {
        var me = this,
            fromEl = e.getRelatedTarget(),
            mouseEnter = !me.el.contains(fromEl),
            item = me.getItemFromEvent(e),
            parentMenu = me.parentMenu,
            parentItem = me.parentItem;

        if (mouseEnter && parentMenu) {
            parentMenu.setActiveItem(parentItem);
            parentItem.cancelDeferHide();
            parentMenu.mouseMonitor.mouseenter();
        }

        if (me.disabled) {
            return;
        }

        // Do not activate the item if the mouseover was within the item, and it's already active
        if (item && !item.activated) {
            me.setActiveItem(item);
            if (item.activated && item.expandMenu) {
                item.expandMenu();
            }
        }
        if (mouseEnter) {
            me.fireEvent('mouseenter', me, e);
        }
        me.fireEvent('mouseover', me, item, e);
    },

    setActiveItem: function(item) {
        var me = this;

        if (item && (item != me.activeItem)) {
            me.deactivateActiveItem();
            if (me.canActivateItem(item)) {
                if (item.activate) {
                    item.activate();
                    if (item.activated) {
                        me.activeItem = item;
                        me.focusedItem = item;
                        me.focus();
                    }
                } else {
                    item.focus();
                    me.focusedItem = item;
                }
            }
            item.el.scrollIntoView(me.layout.getRenderTarget());
        }
    },

    showBy: function(cmp, pos, off) {
        var me = this;

        me.callParent(arguments);
        if (!me.hidden) {
            // show may have been vetoed
            me.setVerticalPosition();
        }
        return me;
    },

    beforeShow: function() {
        var me = this,
            viewHeight;

        // Constrain the height to the containing element's viewable area
        if (me.floating) {
            me.savedMaxHeight = me.maxHeight;
            viewHeight = me.container.getViewSize().height;
            me.maxHeight = Math.min(me.maxHeight || viewHeight, viewHeight);
        }

        me.callParent(arguments);
    },

    afterShow: function() {
        var me = this;

        me.callParent(arguments);

        // Restore configured maxHeight
        if (me.floating) {
            me.maxHeight = me.savedMaxHeight;
        }
    },

    // @private
    // adjust the vertical position of the menu if the height of the
    // menu is equal (or greater than) the viewport size
    setVerticalPosition: function() {
        var me = this,
            max,
            y = me.getY(),
            returnY = y,
            height = me.getHeight(),
            viewportHeight = Ext.Element.getViewportHeight().height,
            parentEl = me.el.parent(),
            viewHeight = parentEl.getViewSize().height,
            normalY = y - parentEl.getScroll().top; // factor in scrollTop of parent

        parentEl = null;

        if (me.floating) {
            max = me.maxHeight ? me.maxHeight : viewHeight - normalY;
            if (height > viewHeight) {
                returnY = y - normalY;
            } else if (max < height) {
                returnY = y - (height - max);
            } else if((y + height) > viewportHeight){ // keep the document from scrolling
                returnY = viewportHeight - height;
            }
        }
        me.setY(returnY);
    }
});