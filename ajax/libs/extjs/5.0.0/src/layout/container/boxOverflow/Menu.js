/**
 * @private
 */
Ext.define('Ext.layout.container.boxOverflow.Menu', {

    /* Begin Definitions */

    extend: 'Ext.layout.container.boxOverflow.None',
    requires: ['Ext.toolbar.Separator', 'Ext.button.Button'],
    alternateClassName: 'Ext.layout.boxOverflow.Menu',
    alias: [
        'box.overflow.menu',
        'box.overflow.Menu' // capitalized for 4.x compat
    ],

    /* End Definitions */

    /**
     * @property {String} noItemsMenuText
     * HTML fragment to render into the toolbar overflow menu if there are no items to display
     */
    noItemsMenuText : '<div class="' + Ext.baseCSSPrefix + 'toolbar-no-items" role="menuitem">(None)</div>',

    menuCls: Ext.baseCSSPrefix + 'box-menu',

    constructor: function(config) {
        var me = this;

        me.callParent(arguments);

        /**
         * @property {Array} menuItems
         * Array of all items that are currently hidden and should go into the dropdown menu
         */
        me.menuItems = [];
    },

    beginLayout: function (ownerContext) {
        this.callParent(arguments);

        // Before layout, we need to re-show all items which we may have hidden due to a
        // previous overflow...
        this.clearOverflow(ownerContext);
    },

    beginLayoutCycle: function (ownerContext, firstCycle) {
        this.callParent(arguments);

        if (!firstCycle) {
            // if we are being re-run, we need to clear any overflow from the last run and
            // recache the childItems collection
            this.clearOverflow(ownerContext);

            this.layout.cacheChildItems(ownerContext);
        }
    },

    onRemove: function(comp){
        Ext.Array.remove(this.menuItems, comp);
    },

    // We don't define a prefix in menu overflow.
    getSuffixConfig: function() {
        var me = this,
            layout = me.layout,
            owner = layout.owner,
            oid = owner.id;

        /**
         * @private
         * @property {Ext.menu.Menu} menu
         * The expand menu - holds items for every item that cannot be shown
         * because the container is currently not large enough.
         */
        me.menu = new Ext.menu.Menu({
            listeners: {
                scope: me,
                beforeshow: me.beforeMenuShow
            }
        });

        /**
         * @private
         * @property {Ext.button.Button} menuTrigger
         * The expand button which triggers the overflow menu to be shown
         */
        me.menuTrigger = new Ext.button.Button({
            id: oid + '-menu-trigger',
            cls: me.menuCls + '-after ' + Ext.baseCSSPrefix + 'toolbar-item',
            plain: owner.usePlainButtons,
            ownerCt: owner, // To enable the Menu to ascertain a valid zIndexManager owner in the same tree
            ownerLayout: layout,
            iconCls: Ext.baseCSSPrefix + me.getOwnerType(owner) + '-more-icon',
            ui: owner.defaultButtonUI || 'default',
            menu: me.menu,
            // Menu will be empty when we're showing it because we populate items after
            showEmptyMenu: true,
            getSplitCls: function() { return '';}
        });

        return me.menuTrigger.getRenderTree();
    },
    
    getOverflowCls: function(direction) {
        return this.menuCls + '-body-' + direction;
    },

    handleOverflow: function(ownerContext) {
        var me = this,
            layout = me.layout;

        me.showTrigger(ownerContext);

        // Center the menuTrigger button only if we are not vertical.
        if (layout.direction !== 'vertical') {
            me.menuTrigger.setLocalY(
                (ownerContext.state.boxPlan.maxSize - me.menuTrigger[layout.names.getHeight]()) / 2
            );
        }

        return {
            reservedSpace: me.triggerTotalWidth
        };
    },

    /**
     * Finishes the render operation of the trigger Button.
     * @private
     */
    captureChildElements: function() {
        var me = this,
            menuTrigger = me.menuTrigger,
            names = me.layout.names;

        // The rendering flag is set when getRenderTree is called which we do when returning markup string for the owning layout's "suffix"
        if (menuTrigger.rendering) {
            menuTrigger.finishRender();
            me.triggerTotalWidth = menuTrigger[names.getWidth]() + menuTrigger.el.getMargin(names.parallelMargins);
        }
    },

    /**
     * @private
     * Called by the layout, when it determines that there is no overflow.
     * Also called as an interceptor to the layout's onLayout method to reshow
     * previously hidden overflowing items.
     */
    clearOverflow: function(ownerContext) {
        var me = this,
            items = me.menuItems,
            item,
            i = 0,
            length = items.length,
            owner = me.layout.owner,
            asLayoutRoot = owner._asLayoutRoot;

        owner.suspendLayouts();
        me.captureChildElements();
        me.hideTrigger();
        owner.resumeLayouts();

        for (; i < length; i++) {
            item = items[i];

            // What we are doing here is preventing the layout bubble from invalidating our
            // owner component. We need just the button to be added to the layout run.
            item.suspendLayouts();
            item.show();
            item.resumeLayouts(asLayoutRoot);
        }

        items.length = 0;
    },

    /**
     * @private
     * Shows the overflow trigger when enableOverflow is set to true and the items
     * in the layout are too wide to fit in the space available
     */
    showTrigger: function(ownerContext) {
        var me = this,
            layout = me.layout,
            owner = layout.owner,
            names = layout.names,
            startProp = names.x,
            sizeProp = names.width,
            plan = ownerContext.state.boxPlan,
            available = plan.targetSize[sizeProp],
            childItems = ownerContext.childItems,
            len = childItems.length,
            menuTrigger = me.menuTrigger,
            childContext,
            comp, i, props;

        // We don't want the menuTrigger.show to cause owner's layout to be invalidated, so
        // we force just the button to be invalidated and added to the current run.
        menuTrigger.suspendLayouts();
        menuTrigger.show();
        menuTrigger.resumeLayouts(me._asLayoutRoot);

        available -= me.triggerTotalWidth;

        owner.suspendLayouts();

        // Hide all items which are off the end, and store them to allow them to be restored
        // before each layout operation.
        me.menuItems.length = 0;
        for (i = 0; i < len; i++) {
            childContext = childItems[i];
            props = childContext.props;
            if (props[startProp] + props[sizeProp] > available) {
                comp = childContext.target;
                me.menuItems.push(comp);
                comp.hide();
            }
        }

        owner.resumeLayouts();
    },

    /**
     * @private
     */
    hideTrigger: function() {
        var menuTrigger = this.menuTrigger;
        if (menuTrigger) {
            menuTrigger.hide();
        }
    },

    /**
     * @private
     * Called before the overflow menu is shown. This constructs the menu's items, caching them for as long as it can.
     */
    beforeMenuShow: function(menu) {
        var me = this,
            items = me.menuItems,
            i = 0,
            len   = items.length,
            item,
            prev,
            needsSep = function(group, prev){
                return group.isXType('buttongroup') && !(prev instanceof Ext.toolbar.Separator);
            };

        menu.suspendLayouts();
        me.clearMenu();
        menu.removeAll();

        for (; i < len; i++) {
            item = items[i];

            // Do not show a separator as a first item
            if (!i && (item instanceof Ext.toolbar.Separator)) {
                continue;
            }
            if (prev && (needsSep(item, prev) || needsSep(prev, item))) {
                menu.add('-');
            }

            me.addComponentToMenu(menu, item);
            prev = item;
        }

        // put something so the menu isn't empty if no compatible items found
        if (menu.items.length < 1) {
            menu.add(me.noItemsMenuText);
        }
        menu.resumeLayouts();
    },
    
    /**
     * @private
     * Returns a menu config for a given component. This config is used to create a menu item
     * to be added to the expander menu
     * @param {Ext.Component} component The component to create the config for
     * @param {Boolean} hideOnClick Passed through to the menu item
     */
    createMenuConfig: function (component, hideOnClick) {
        var config = Ext.apply({}, component.initialConfig),
            group  = component.toggleGroup;

        Ext.copyTo(config, component, [
            'iconCls', 'icon', 'itemId', 'disabled', 'handler', 'scope', 'menu', 'tabIndex'
        ]);

        Ext.applyIf(config, {
            text: component.overflowText || component.text,
            hideOnClick: hideOnClick,
            destroyMenu: false,
            listeners: {}
        });

        // Clone must have same value, and must sync original's value on change
        if (component.isFormField) {
            config.value = component.getValue();

            // Sync the original component's value when the clone changes value.
            // This intentionally overwrites any developer-configured change listener on the clone.
            // That's because we monitor the clone's change event, and sync the
            // original field by calling setValue, so the original field's change
            // event will still fire.
            config.listeners.change = function(c, newVal, oldVal) {                            
                component.setValue(newVal);
            };
        }

        // ToggleButtons become CheckItems
        else if (group || component.enableToggle) {
            Ext.apply(config, {
                hideOnClick: false,
                group: group,
                checked: component.pressed,
                handler: function (item, e) {
                    component.onClick(e);
                }
            });
        }

        // Buttons may have their text or icon changed - this must be propagated to the clone in the overflow menu
        if (component.isButton && !component.changeListenersAdded) {
            component.on({
                textchange: this.onButtonAttrChange,
                iconchange: this.onButtonAttrChange,
                toggle: this.onButtonToggle
            });
            component.changeListenersAdded = true;
        }

        // Typically margins are used to separate items in a toolbar
        // but don't really make a lot of sense in a menu, so we strip
        // them out here.
        delete config.margin;
        delete config.ownerCt;
        delete config.xtype;
        delete config.id;
        delete config.itemId;
        return config;
    },

    onButtonAttrChange: function(btn) {
        var clone = btn.overflowClone;
        clone.suspendLayouts();
        clone.setText(btn.text);
        clone.setIcon(btn.icon);
        clone.setIconCls(btn.iconCls);
        clone.resumeLayouts(true);
    },

    onButtonToggle: function(btn, state) {
        // Keep the clone in sync with the original if necessary
        if (btn.overflowClone.checked !== state) {
            btn.overflowClone.setChecked(state);
        }
    },

    /**
     * @private
     * Adds the given Toolbar item to the given menu. Buttons inside a buttongroup are added individually.
     * @param {Ext.menu.Menu} menu The menu to add to
     * @param {Ext.Component} component The component to add
     * TODO: Implement overrides in Ext.layout.container.boxOverflow which create overrides
     * for SplitButton, Button, ButtonGroup, and TextField. And a generic one for Component
     * which create clones suitable for use in an overflow menu.
     */
    addComponentToMenu : function(menu, component) {
        var me = this,
        i, items, iLen;

        // No equivalent to fill, skip it
        if (component instanceof Ext.toolbar.Fill) {
            return;
        }
        // Separator maps to MenuSeparator
        else if (component instanceof Ext.toolbar.Separator) {
            menu.add('-');
        }
        // Other types...
        else if (component.isComponent) {
            if (component.isXType('splitbutton')) {
                component.overflowClone = menu.add(me.createMenuConfig(component, true));

            } else if (component.isXType('button')) {
                component.overflowClone = menu.add(me.createMenuConfig(component, !component.menu));

            } else if (component.isXType('buttongroup')) {
                items = component.items.items;
                iLen  = items.length;

                for (i = 0; i < iLen; i++) {
                    me.addComponentToMenu(menu, items[i]);
                }
            } else {
                component.overflowClone = menu.add(Ext.create(Ext.getClassName(component), me.createMenuConfig(component)));
            }
        }
    },

    /**
     * @private
     * Deletes the sub-menu of each item in the expander menu. Submenus are created for items such as
     * splitbuttons and buttongroups, where the Toolbar item cannot be represented by a single menu item
     */
    clearMenu : function() {
        var menu = this.menu,
            items, i, iLen, item;
        
        if (menu && menu.items) {
            items = menu.items.items;
            iLen  = items.length;
            
            for (i = 0; i < iLen; i++) {
                item = items[i];
                if (item.setMenu) {
                    item.setMenu(null);
                }
            }
        }
    },

    /**
     * @private
     */
    destroy: function() {
        var trigger = this.menuTrigger;
            
        if (trigger && !this.layout.owner.items.contains(trigger)) {
            // Ensure we delete the ownerCt if it's not in the items
            // so we don't get spurious container remove warnings.
            delete trigger.ownerCt;
        }
        Ext.destroy(this.menu, trigger);
    }
});
