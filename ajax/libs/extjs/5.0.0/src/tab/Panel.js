/**
 * A basic tab container. TabPanels can be used exactly like a standard {@link Ext.panel.Panel} for
 * layout purposes, but also have special support for containing child Components
 * (`{@link Ext.container.Container#cfg-items items}`) that are managed using a
 * {@link Ext.layout.container.Card CardLayout layout manager}, and displayed as separate tabs.
 *
 * **Note:** By default, a tab's close tool _destroys_ the child tab Component and all its descendants.
 * This makes the child tab Component, and all its descendants **unusable**.  To enable re-use of a tab,
 * configure the TabPanel with `{@link #autoDestroy autoDestroy: false}`.
 *
 * ## TabPanel's layout
 *
 * TabPanels use a Dock layout to position the {@link Ext.tab.Bar TabBar} at the top of the widget.
 * Panels added to the TabPanel will have their header hidden by default because the Tab will
 * automatically take the Panel's configured title and icon.
 *
 * TabPanels use their {@link Ext.panel.Header header} or {@link Ext.panel.Panel#fbar footer}
 * element (depending on the {@link #tabPosition} configuration) to accommodate the tab selector buttons.
 * This means that a TabPanel will not display any configured title, and will not display any configured
 * header {@link Ext.panel.Panel#tools tools}.
 *
 * To display a header, embed the TabPanel in a {@link Ext.panel.Panel Panel} which uses
 * `{@link Ext.container.Container#layout layout: 'fit'}`.
 *
 * ## Controlling tabs
 *
 * Configuration options for the {@link Ext.tab.Tab} that represents the component can be passed in
 * by specifying the tabConfig option:
 *
 *     @example
 *     Ext.tip.QuickTipManager.init();
 *     Ext.create('Ext.tab.Panel', {
 *         width: 400,
 *         height: 400,
 *         renderTo: document.body,
 *         items: [{
 *             title: 'Foo'
 *         }, {
 *             title: 'Bar',
 *             tabConfig: {
 *                 title: 'Custom Title',
 *                 tooltip: 'A button tooltip'
 *             }
 *         }]
 *     });
 * 
 * ## Vetoing Changes
 * 
 * User interaction when changing the tabs can be vetoed by listening to the {@link #beforetabchange} event.
 * By returning `false`, the tab change will not occur.
 * 
 *     @example
 *     Ext.create('Ext.tab.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         listeners: {
 *             beforetabchange: function(tabs, newTab, oldTab) {
 *                 return newTab.title != 'P2';
 *             }
 *         },
 *         items: [{
 *             title: 'P1'
 *         }, {
 *             title: 'P2'
 *         }, {
 *             title: 'P3'
 *         }]
 *     }); 
 *
 * # Examples
 *
 * Here is a basic TabPanel rendered to the body. This also shows the useful configuration {@link #activeTab},
 * which allows you to set the active tab on render. If you do not set an {@link #activeTab}, no tabs will be
 * active by default.
 *
 *     @example
 *     Ext.create('Ext.tab.Panel', {
 *         width: 300,
 *         height: 200,
 *         activeTab: 0,
 *         items: [
 *             {
 *                 title: 'Tab 1',
 *                 bodyPadding: 10,
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 * It is easy to control the visibility of items in the tab bar. Specify hidden: true to have the
 * tab button hidden initially. Items can be subsequently hidden and show by accessing the
 * tab property on the child item.
 *
 *     @example
 *     var tabs = Ext.create('Ext.tab.Panel', {
 *         width: 400,
 *         height: 400,
 *         renderTo: document.body,
 *         items: [{
 *             title: 'Home',
 *             html: 'Home',
 *             itemId: 'home'
 *         }, {
 *             title: 'Users',
 *             html: 'Users',
 *             itemId: 'users',
 *             hidden: true
 *         }, {
 *             title: 'Tickets',
 *             html: 'Tickets',
 *             itemId: 'tickets'
 *         }]
 *     });
 *
 *     setTimeout(function(){
 *         tabs.child('#home').tab.hide();
 *         var users = tabs.child('#users');
 *         users.tab.show();
 *         tabs.setActiveTab(users);
 *     }, 1000);
 *
 * You can remove the background of the TabBar by setting the {@link #plain} property to `true`.
 *
 *     @example
 *     Ext.create('Ext.tab.Panel', {
 *         width: 300,
 *         height: 200,
 *         activeTab: 0,
 *         plain: true,
 *         items: [
 *             {
 *                 title: 'Tab 1',
 *                 bodyPadding: 10,
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 * Another useful configuration of TabPanel is {@link #tabPosition}. This allows you to change the
 * position where the tabs are displayed. The available options for this are `'top'` (default) and
 * `'bottom'`.
 *
 *     @example
 *     Ext.create('Ext.tab.Panel', {
 *         width: 300,
 *         height: 200,
 *         activeTab: 0,
 *         bodyPadding: 10,
 *         tabPosition: 'bottom',
 *         items: [
 *             {
 *                 title: 'Tab 1',
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 * The {@link #setActiveTab} is a very useful method in TabPanel which will allow you to change the
 * current active tab. You can either give it an index or an instance of a tab. For example:
 *
 *     @example
 *     var tabs = Ext.create('Ext.tab.Panel', {
 *         items: [
 *             {
 *                 id   : 'my-tab',
 *                 title: 'Tab 1',
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 *     var tab = Ext.getCmp('my-tab');
 *
 *     Ext.create('Ext.button.Button', {
 *         renderTo: Ext.getBody(),
 *         text    : 'Select the first tab',
 *         scope   : this,
 *         handler : function() {
 *             tabs.setActiveTab(tab);
 *         }
 *     });
 *
 *     Ext.create('Ext.button.Button', {
 *         text    : 'Select the second tab',
 *         scope   : this,
 *         handler : function() {
 *             tabs.setActiveTab(1);
 *         },
 *         renderTo : Ext.getBody()
 *     });
 *
 * The {@link #getActiveTab} is a another useful method in TabPanel which will return the current active tab.
 *
 *     @example
 *     var tabs = Ext.create('Ext.tab.Panel', {
 *         items: [
 *             {
 *                 title: 'Tab 1',
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 *     Ext.create('Ext.button.Button', {
 *         text    : 'Get active tab',
 *         scope   : this,
 *         handler : function() {
 *             var tab = tabs.getActiveTab();
 *             alert('Current tab: ' + tab.title);
 *         },
 *         renderTo : Ext.getBody()
 *     });
 *
 * Adding a new tab is very simple with a TabPanel. You simple call the {@link #method-add} method with an config
 * object for a panel.
 *
 *     @example
 *     var tabs = Ext.create('Ext.tab.Panel', {
 *         items: [
 *             {
 *                 title: 'Tab 1',
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 *     Ext.create('Ext.button.Button', {
 *         text    : 'New tab',
 *         scope   : this,
 *         handler : function() {
 *             var tab = tabs.add({
 *                 // we use the tabs.items property to get the length of current items/tabs
 *                 title: 'Tab ' + (tabs.items.length + 1),
 *                 html : 'Another one'
 *             });
 *
 *             tabs.setActiveTab(tab);
 *         },
 *         renderTo : Ext.getBody()
 *     });
 *
 * Additionally, removing a tab is very also simple with a TabPanel. You simple call the {@link #method-remove} method
 * with an config object for a panel.
 *
 *     @example
 *     var tabs = Ext.create('Ext.tab.Panel', {
 *         items: [
 *             {
 *                 title: 'Tab 1',
 *                 html : 'A simple tab'
 *             },
 *             {
 *                 id   : 'remove-this-tab',
 *                 title: 'Tab 2',
 *                 html : 'Another one'
 *             }
 *         ],
 *         renderTo : Ext.getBody()
 *     });
 *
 *     Ext.create('Ext.button.Button', {
 *         text    : 'Remove tab',
 *         scope   : this,
 *         handler : function() {
 *             var tab = Ext.getCmp('remove-this-tab');
 *             tabs.remove(tab);
 *         },
 *         renderTo : Ext.getBody()
 *     });
 */
Ext.define('Ext.tab.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tabpanel',
    alternateClassName: ['Ext.TabPanel'],

    requires: ['Ext.layout.container.Card', 'Ext.tab.Bar'],

    config: {
        /**
         * @cfg {Object} tabBar
         * Optional configuration object for the internal {@link Ext.tab.Bar}.
         * If present, this is passed straight through to the TabBar's constructor
         */
        tabBar: undefined,

        /**
         * @cfg {"top"/"bottom"/"left"/"right"} tabPosition
         * The position where the tab strip should be rendered. Can be `top`, `bottom`,
         * `left` or `right`
         */
        tabPosition : 'top',

        /**
         * @cfg {'default'/0/1/2} tabRotation
         * The rotation of the tabs.  Can be one of the following values:
         *
         * - `'default'` use the default rotation, depending on {@link #tabPosition} (see below)
         * - `0` - no rotation
         * - `1` - rotate 90deg clockwise
         * - `2` - rotate 90deg counter-clockwise
         *
         * The default behavior of this config depends on the {@link #tabPosition}:
         *
         * - `'top'` or `'bottom'` - `0`
         * - `'right'` - `1`
         * - `'left'` - `2`
         */
        tabRotation: 'default',

        /**
         * @cfg {Boolean} tabStretchMax
         * `true` to stretch all tabs to the height of the tallest tab when the tabBar
         * is docked horizontally, or the width of the widest tab when the tabBar is
         * docked vertically.
         */
        tabStretchMax: true
    },

    /**
     * @cfg {Number} tabBarHeaderPosition
     * If specified, the {@link #tabBar} will be rendered as an item of the TabPanel's
     * Header and the specified `tabBarHeaderPosition` will be used as the Panel header's
     * {@link #itemPosition}.  If not specified, the {@link #tabBar} will be rendered
     * as a docked item at {@link #tabPosition}
     */

    /**
     * @cfg {String/Number} activeItem
     * Doesn't apply for {@link Ext.tab.Panel TabPanel}, use {@link #activeTab} instead.
     */

    /**
     * @cfg {String/Number/Ext.Component} activeTab
     * The tab to activate initially. Either an ID, index or the tab component itself.
     */


    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * Optional configuration object for the internal {@link Ext.layout.container.Card card layout}.
     * If present, this is passed straight through to the layout's constructor
     */

    /**
     * @cfg {Boolean} removePanelHeader
     * True to instruct each Panel added to the TabContainer to not render its header element.
     * This is to ensure that the title of the panel does not appear twice.
     */
    removePanelHeader: true,

    /**
     * @cfg {Boolean} plain
     * True to not show the full background on the TabBar.
     */
    plain: false,

    /**
     * @cfg {String} [itemCls='x-tabpanel-child']
     * The class added to each child item of this TabPanel.
     */
    itemCls: Ext.baseCSSPrefix + 'tabpanel-child',

    /**
     * @cfg {Number} minTabWidth
     * The minimum width for a tab in the {@link #cfg-tabBar}.
     */
    minTabWidth: undefined,

    /**
     * @cfg {Number} maxTabWidth The maximum width for each tab.
     */
    maxTabWidth: undefined,

    /**
     * @cfg {Boolean} deferredRender
     *
     * True by default to defer the rendering of child {@link Ext.container.Container#cfg-items items} to the browsers DOM
     * until a tab is activated. False will render all contained {@link Ext.container.Container#cfg-items items} as soon as
     * the {@link Ext.layout.container.Card layout} is rendered. If there is a significant amount of content or a lot of
     * heavy controls being rendered into panels that are not displayed by default, setting this to true might improve
     * performance.
     *
     * The deferredRender property is internally passed to the layout manager for TabPanels ({@link
     * Ext.layout.container.Card}) as its {@link Ext.layout.container.Card#deferredRender} configuration value.
     *
     * **Note**: leaving deferredRender as true means that the content within an unactivated tab will not be available
     */
    deferredRender : true,

    _defaultTabRotation: {
        top: 0,
        right: 1,
        bottom: 0,
        left: 2
    },

    /**
     * @event beforetabchange
     * Fires before a tab change (activated by {@link #setActiveTab}). Return false in any listener to cancel
     * the tabchange
     * @param {Ext.tab.Panel} tabPanel The TabPanel
     * @param {Ext.Component} newCard The card that is about to be activated
     * @param {Ext.Component} oldCard The card that is currently active
     */

    /**
     * @event tabchange
     * Fires when a new tab has been activated (activated by {@link #setActiveTab}).
     * @param {Ext.tab.Panel} tabPanel The TabPanel
     * @param {Ext.Component} newCard The newly activated item
     * @param {Ext.Component} oldCard The previously active item
     */

    //inherit docs
    initComponent: function() {
        var me = this,
            activeTab = me.activeTab || (me.activeTab = 0),
            tabPosition = me.getTabPosition(),
            tabRotation = me.getTabRotation(),
            dockedItems = me.dockedItems,
            header = me.header,
            tabBarHeaderPosition = me.tabBarHeaderPosition,
            tabBar = me.getTabBar(),
            headerItems;

        // Configure the layout with our deferredRender, and with our activeTeb
        me.layout = new Ext.layout.container.Card(Ext.apply({
            owner: me,
            deferredRender: me.deferredRender,
            itemCls: me.itemCls,
            activeItem: activeTab
        }, me.layout));

        if (tabBarHeaderPosition != null) {
            if (!header) {
                header = me.header = {};
            }

            headerItems = header.items = (header.items ? header.items.slice() : []);
            header.itemPosition = tabBarHeaderPosition;
            headerItems.push(tabBar);
            header.hasTabBar = true;
        } else {
            dockedItems = [].concat(me.dockedItems || []);
            dockedItems.push(tabBar);
            me.dockedItems = dockedItems;
        }

        me.callParent(arguments);

        // We have to convert the numeric index/string ID config into its component reference
        activeTab = me.activeTab = me.getComponent(activeTab);

        // Ensure that the active child's tab is rendered in the active UI state
        if (activeTab) {
            tabBar.setActiveTab(activeTab.tab, true);
        }
    },

    onRender: function() {
        var items = this.items.items,
            len = items.length,
            i;

        this.callParent(arguments);

        // We want to force any view model for the panel to be created.
        // This is because we capture various parts about the panel itself (title, icon, etc)
        // So we need to be able to use that to populate the tabs.
        // In the future, this could be optimized to be a bit smarter to prevent creation when
        // not required.
        for (i = 0; i < len; ++i) {
            items[i].getBind();
        }
    },

    /**
     * Makes the given card active. Makes it the visible card in the TabPanel's CardLayout and highlights the Tab.
     * @param {String/Number/Ext.Component} card The card to make active. Either an ID, index or the component itself.
     * @return {Ext.Component} The resulting active child Component. The call may have been vetoed, or otherwise
     * modified by an event listener.
     */
    setActiveTab: function(card) {
        var me = this,
            previous;

        card = me.getComponent(card);
        if (card) {
            previous = me.getActiveTab();

            if (previous === card || me.fireEvent('beforetabchange', me, card, previous) === false) {
                return false;
            }

            // We may be passed a config object, so add it.
            // Without doing a layout!
            if (!card.isComponent) {
                Ext.suspendLayouts();
                card = me.add(card);
                Ext.resumeLayouts();
            }

            // MUST set the activeTab first so that the machinery which listens for show doesn't
            // think that the show is "driving" the activation and attempt to recurse into here.
            me.activeTab = card;

            // Attempt to switch to the requested card. Suspend layouts because if that was successful
            // we have to also update the active tab in the tab bar which is another layout operation
            // and we must coalesce them.
            Ext.suspendLayouts();
            me.layout.setActiveItem(card);

            // Read the result of the card layout. Events dear boy, events!
            card = me.activeTab = me.layout.getActiveItem();

            // Card switch was not vetoed by an event listener
            if (card && card !== previous) {

                // Update the active tab in the tab bar and resume layouts.
                me.tabBar.setActiveTab(card.tab);
                Ext.resumeLayouts(true);

                // previous will be undefined or this.activeTab at instantiation
                if (previous !== card) {
                    me.fireEvent('tabchange', me, card, previous);
                }
            }
            // Card switch was vetoed by an event listener. Resume layouts (Nothing should have changed on a veto).
            else {
                Ext.resumeLayouts(true);
            }
            return card;
        }
    },

    setActiveItem: function(item) {
        return this.setActiveTab(item);
    },

    /**
     * Returns the item that is currently active inside this TabPanel.
     * @return {Ext.Component} The currently active item.
     */
    getActiveTab: function() {
        var me = this,
            // Ensure the calculated result references a Component
            result = me.getComponent(me.activeTab);

        // Sanitize the result in case the active tab is no longer there.
        if (result && me.items.indexOf(result) != -1) {
            me.activeTab = result;
        } else {
            me.activeTab = null;
        }

        return me.activeTab;
    },

    applyTabBar: function(tabBar) {
        var me = this,
            // if we are rendering the tabbar into the panel header, use same alignment
            // as header position, and ignore tabPosition.
            dock = (me.tabBarHeaderPosition != null) ? me.getHeaderPosition() : me.getTabPosition();

        return new Ext.tab.Bar(Ext.apply({
            ui: me.ui,
            dock: dock,
            tabRotation: me.getTabRotation(),
            vertical: (dock == 'left' || dock == 'right'),
            plain: me.plain,
            tabStretchMax: me.getTabStretchMax(),
            tabPanel: me
        }, tabBar));
    },

    updateHeaderPosition: function(headerPosition, oldHeaderPosition) {
        var tabBar = this.getTabBar();

        if (tabBar && (this.tabBarHeaderPosition != null)) {
            tabBar.setDock(headerPosition);
        }

        this.callParent([headerPosition, oldHeaderPosition]);
    },

    updateTabPosition: function(tabPosition) {
        var tabBar = this.getTabBar();

        if (tabBar && (this.tabBarHeaderPosition == null)) {
            tabBar.setDock(tabPosition);
        }
    },

    updateTabRotation: function(tabRotation) {
        var tabBar = this.getTabBar();

        if (tabBar) {
            tabBar.setTabRotation(tabRotation);
        }
    },

    /**
     * @protected
     * Makes sure we have a Tab for each item added to the TabPanel
     */
    onAdd: function(item, index) {
        var me = this,
            cfg = Ext.apply({}, item.tabConfig),
            tabBar = me.getTabBar(),
            defaultConfig = {
                xtype: 'tab',
                ui: tabBar.ui,
                card: item,
                disabled: item.disabled,
                closable: item.closable,
                hidden: item.hidden && !item.hiddenByLayout, // only hide if it wasn't hidden by the layout itself
                tooltip: item.tooltip,
                tabBar: tabBar,
                tabPosition: tabBar.dock,
                rotation: tabBar.getTabRotation()
            };

        if (item.closeText !== undefined) {
            defaultConfig.closeText = item.closeText;
        }

        cfg = Ext.applyIf(cfg, defaultConfig);

        // Create the correspondiong tab in the tab bar
        item.tab = me.tabBar.insert(index, cfg);

        item.on({
            scope : me,
            enable: me.onItemEnable,
            disable: me.onItemDisable,
            beforeshow: me.onItemBeforeShow,
            iconchange: me.onItemIconChange,
            iconclschange: me.onItemIconClsChange,
            titlechange: me.onItemTitleChange
        });

        if (item.isPanel) {
            if (me.removePanelHeader) {
                if (item.rendered) {
                    if (item.header) {
                        item.header.hide();
                    }
                } else {
                    item.header = false;
                }
            }
            if (item.isPanel && me.border) {
                item.setBorder(false);
            }
        }

        // Force the view model to be created, see onRender
        if (me.rendered) {
            item.getBind();
        }
    },

    /**
     * @private
     * Enable corresponding tab when item is enabled.
     */
    onItemEnable: function(item){
        item.tab.enable();
    },

    /**
     * @private
     * Disable corresponding tab when item is enabled.
     */
    onItemDisable: function(item){
        item.tab.disable();
    },

    /**
     * @private
     * Sets activeTab before item is shown.
     */
    onItemBeforeShow: function(item) {
        if (item !== this.activeTab) {
            this.setActiveTab(item);
            return false;
        }
    },

    /**
     * @private
     * Update the tab icon when panel icon has been set or changed.
     */
    onItemIconChange: function(item, newIcon) {
        item.tab.setIcon(newIcon);
    },
    
    /**
     * @private
     * Update the tab iconCls when panel iconCls has been set or changed.
     */
    onItemIconClsChange: function(item, newIconCls) {
        item.tab.setIconCls(newIconCls);
    },

    /**
     * @private
     * Update the tab title when panel title has been set or changed.
     */
    onItemTitleChange: function(item, newTitle) {
        item.tab.setText(newTitle);
    },

    /**
     * @private
     * Makes sure we remove the corresponding Tab when an item is removed
     */
    onRemove: function(item, destroying) {
        var me = this;

        item.un({
            scope : me,
            enable: me.onItemEnable,
            disable: me.onItemDisable,
            beforeshow: me.onItemBeforeShow
        });
        if (!me.destroying && item.tab.ownerCt === me.tabBar) {
            me.tabBar.remove(item.tab);
        }
    },

    privates: {
        /**
         * @private
         * Unlink the removed child item from its (@link Ext.tab.Tab Tab}.
         *
         * If we're removing the currently active tab, activate the nearest one. The item is removed when we call super,
         * so we can do preprocessing before then to find the card's index
         */
        doRemove: function (item, autoDestroy) {
            var me = this,
                toActivate;

            // Destroying, or removing the last item, nothing to activate
            if (me.removingAll || me.destroying || me.items.getCount() == 1) {
                me.activeTab = null;
            }

            // Ask the TabBar which tab to activate next.
            // Set the active child panel using the index of that tab
            else if ((toActivate = me.tabBar.items.indexOf(me.tabBar.findNextActivatable(item.tab))) !== -1) {
                me.setActiveTab(toActivate);
            }
            this.callParent(arguments);

            // Remove the two references
            delete item.tab.card;
            delete item.tab;
        }
    }
});
