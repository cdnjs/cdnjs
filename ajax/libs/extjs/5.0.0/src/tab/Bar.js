/**
 * TabBar is used internally by a {@link Ext.tab.Panel TabPanel} and typically should not
 * need to be created manually.
 */
Ext.define('Ext.tab.Bar', {
    extend: 'Ext.panel.Bar',
    xtype: 'tabbar',

    baseCls: Ext.baseCSSPrefix + 'tab-bar',

    requires: [
        'Ext.tab.Tab',
        'Ext.util.Point',
        'Ext.layout.component.Body'
    ],

    componentLayout: 'body',

    /**
     * @property {Boolean} isTabBar
     * `true` in this class to identify an object as an instantiated Tab Bar, or subclass thereof.
     */
    isTabBar: true,

    config: {
        /**
         * @cfg {'default'/0/1/2} tabRotation
         * The rotation of the tabs.  Can be one of the following values:
         *
         * - `null` - use the default rotation, depending on the dock position (see below)
         * - `0` - no rotation
         * - `1` - rotate 90deg clockwise
         * - `2` - rotate 90deg counter-clockwise
         *
         * The default behavior of this config depends on the dock position:
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
     * @cfg {String} title @hide
     */
    
    /**
     * @cfg {String} iconCls @hide
     *
     * There are no default icon classes that come with Ext JS.
     */

    // @private
    defaultType: 'tab',

    /**
     * @cfg {Boolean} plain
     * True to not show the full background on the tabbar
     */
    plain: false,
    
    ariaRole: 'tablist',

    childEls: [
        'body', 'strip'
    ],

    _stripCls: Ext.baseCSSPrefix + 'tab-bar-strip',
    _baseBodyCls: Ext.baseCSSPrefix + 'tab-bar-body',

    // @private
    renderTpl:
        '<div id="{id}-body" data-ref="body" role="presentation" class="{baseBodyCls} {baseBodyCls}-{ui} ' +
            '{bodyCls} {bodyTargetCls}{childElCls}"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>' +
            '{%this.renderContainer(out,values)%}' +
        '</div>' +
        '<div id="{id}-strip" data-ref="strip" role="presentation" class="{stripCls} {stripCls}-{ui}{childElCls}"></div>',

    /**
     * @cfg {Number} minTabWidth
     * The minimum width for a tab in this tab Bar. Defaults to the tab Panel's {@link Ext.tab.Panel#minTabWidth minTabWidth} value.
     * @deprecated This config is deprecated. It is much easier to use the {@link Ext.tab.Panel#minTabWidth minTabWidth} config on the TabPanel.
     */

    /**
     * @cfg {Number} maxTabWidth
     * The maximum width for a tab in this tab Bar. Defaults to the tab Panel's {@link Ext.tab.Panel#maxTabWidth maxTabWidth} value.
     * @deprecated This config is deprecated. It is much easier to use the {@link Ext.tab.Panel#maxTabWidth maxTabWidth} config on the TabPanel.
     */

    _reverseDockNames: {
        left: 'right',
        right: 'left'
    },

    _layoutAlign: {
        top: 'end',
        right: 'begin',
        bottom: 'begin',
        left: 'end'
    },

    /**
     * @event change
     * Fired when the currently-active tab has changed
     * @param {Ext.tab.Bar} tabBar The TabBar
     * @param {Ext.tab.Tab} tab The new Tab
     * @param {Ext.Component} card The card that was just shown in the TabPanel
     */

    // @private
    initComponent: function() {
        var me = this,
            initialLayout = me.initialConfig.layout,
            initialAlign = initialLayout && initialLayout.align,
            initialOverflowHandler = initialLayout && initialLayout.overflowHandler,
            layout;

        if (me.plain) {
            me.addCls(me.baseCls + '-plain');
        }

        me.callParent();

        me.setLayout({
            align: initialAlign || (me.getTabStretchMax() ? 'stretchmax' :
                    me._layoutAlign[me.dock]),
            overflowHandler: initialOverflowHandler || 'scroller'
        });

        me.on({
            click: me.onClick,
            element: 'el',
            scope: me
        });
    },

    initRenderData: function() {
        var me = this;

        return Ext.apply(this.callParent(), {
            bodyCls: me.bodyCls,
            baseBodyCls: me._baseBodyCls,
            bodyTargetCls: me.bodyTargetCls,
            stripCls: me._stripCls,
            dock: me.dock
        });
    },

    setDock: function(dock) {
        var me = this,
            items = me.items,
            ownerCt = me.ownerCt,
            i, ln;

        items = items && items.items;

        if (items) {
            for (i = 0, ln = items.length; i < ln; i++) {
                items[i].setTabPosition(dock);
            }
        }

        if (me.rendered) {
            // TODO: remove resetItemMargins once EXTJS-13359 is fixed
            me.resetItemMargins();
            if (ownerCt && ownerCt.isHeader) {
                ownerCt.resetItemMargins();
            }
            me.needsScroll = true;
        }
        me.callParent([dock]);
    },

    updateTabRotation: function(tabRotation) {
        var me = this,
            items = me.items,
            i, ln;

        items = items && items.items;

        if (items) {
            for (i = 0, ln = items.length; i < ln; i++) {
                items[i].setRotation(tabRotation);
            }
        }

        if (me.rendered) {
            // TODO: remove resetItemMargins once EXTJS-13359 is fixed
            me.resetItemMargins();

            me.needsScroll = true;
            me.updateLayout();
        }
    },

    onRender: function() {
        var me = this;

        me.callParent();

        if (Ext.isIE8 && me.vertical) {
            me.el.on({
                mousemove: me.onMouseMove, 
                scope: me
            });
        }
    },

    afterLayout: function() {
        this.adjustTabPositions();
        this.callParent(arguments);
    },

    adjustTabPositions: function() {
        var items = this.items.items,
            i = items.length,
            tab, lastBox, el, rotation;

        // When tabs are rotated vertically we don't have a reliable way to position
        // them using CSS in modern browsers.  This is because of the way transform-orign
        // works - it requires the width to be known, and the width is not known in css.
        // Consequently we have to make an adjustment to the tab's position in these browsers.
        // This is similar to what we do in Ext.panel.Header#adjustTitlePosition
        if (!Ext.isIE8) {
            while (i--) {
                tab = items[i];
                el = tab.el;
                lastBox = tab.lastBox;
                rotation = tab.getActualRotation();
                if (rotation === 1 && tab.isVisible()) {
                    // rotated 90 degrees using the top left corner as the axis.
                    // tabs need to be shifted to the right by their width
                    el.setStyle('left', (lastBox.x + lastBox.width) + 'px');
                } else if (rotation === 2 && tab.isVisible()) {
                    // rotated 270 degrees using the bottom right corner as the axis.
                    // tabs need to be shifted down by their height
                    el.setStyle('left', (lastBox.x - lastBox.height) + 'px');
                }
            }
        }
    },

    onAdded: function(container, pos, instanced) {
        if (container.isHeader) {
            this.addCls(container.baseCls + '-' + container.ui + '-tab-bar');
        }
        this.callParent([container, pos, instanced]);
    },

    onRemove: function(tab) {
        var me = this;

        if (tab === me.previousTab) {
            me.previousTab = null;
        }
        me.callParent(arguments);    
    },

    onRemoved: function(destroying) {
        var ownerCt = this.ownerCt;

        if (ownerCt.isHeader) {
            this.removeCls(ownerCt.baseCls + '-' + ownerCt.ui + '-tab-bar');
        }
        this.callParent([destroying]);
    },

    afterComponentLayout: function(width) {
        var me = this,
            needsScroll = me.needsScroll,
            overflowHandler = me.layout.overflowHandler;
        
        me.callParent(arguments);
            
        if (overflowHandler && needsScroll && me.tooNarrow && overflowHandler.scrollToItem) {
            overflowHandler.scrollToItem(me.activeTab);
        }
        delete me.needsScroll;
    },

    // private
    onMouseMove: function(e) {
        var me = this,
            overTab = me._overTab,
            tabInfo, tab;

        if (e.getTarget('.' + Ext.baseCSSPrefix + 'box-scroller')) {
            return;
        }

        tabInfo = me.getTabInfoFromPoint(e.getXY());
        tab = tabInfo.tab;

        if (tab !== overTab) {
            if (overTab && overTab.rendered) {
                overTab.onMouseLeave(e);
                me._overTab = null;
            }
            if (tab) {
                tab.onMouseEnter(e);
                me._overTab = tab;
                if (!tab.disabled) {
                    me.el.setStyle('cursor', 'pointer');
                }
            } else {
                me.el.setStyle('cursor', 'default');
            }
        }
    },

    onMouseLeave: function(e) {
        var overTab = this._overTab;

        if (overTab && overTab.rendered) {
            overTab.onMouseLeave(e);
        }
    },

    // @private
    // in IE8 and IE9 the clickable region of a rotated element is not its new rotated
    // position, but it's original unrotated position.  The result is that rotated tabs do
    // not capture click and mousenter/mosueleave events correctly.  This method accepts
    // an xy position and calculates if the coordinates are within a tab and if they
    // are within the tab's close icon (if any)
    getTabInfoFromPoint: function(xy) {
        var me = this,
            tabs = me.items.items,
            length = tabs.length,
            innerCt = me.layout.innerCt,
            innerCtXY = innerCt.getXY(),
            point = new Ext.util.Point(xy[0], xy[1]),
            i = 0,
            lastBox, tabRegion, closeEl, close, closeXY, closeX, closeY, closeWidth,
            closeHeight, tabX, tabY, tabWidth, tabHeight, closeRegion, isTabReversed,
            direction, tab;

        for (; i < length; i++) {
            tab = tabs[i];
            lastBox = tab.lastBox;
            if (!lastBox) {
                // avoid looping hidden or not layed out tabs
                continue;
            }
            tabX = innerCtXY[0] + lastBox.x;
            tabY = innerCtXY[1] - innerCt.dom.scrollTop + lastBox.y;
            tabWidth = lastBox.width;
            tabHeight = lastBox.height;
            tabRegion = new Ext.util.Region(
                tabY,
                tabX + tabWidth,
                tabY + tabHeight,
                tabX
            );
            if (tabRegion.contains(point)) {
                closeEl = tab.closeEl;
                if (closeEl) {
                    // Read the dom to determine if the contents of the tab are reversed
                    // (rotated 180 degrees).  If so, we can cache the result becuase
                    // it's safe to assume all tabs in the tabbar will be the same
                    if (me._isTabReversed === undefined) {
                        me._isTabReversed = isTabReversed =
                        // use currentStyle because getComputedStyle won't get the
                        // filter property in IE9
                        (tab.btnWrap.dom.currentStyle.filter.indexOf('rotation=2') !== -1);
                    }

                    direction = isTabReversed ? this._reverseDockNames[me.dock] : me.dock;

                    closeWidth = closeEl.getWidth();
                    closeHeight = closeEl.getHeight();
                    closeXY = me.getCloseXY(closeEl, tabX, tabY, tabWidth, tabHeight,
                        closeWidth, closeHeight, direction);
                    closeX = closeXY[0];
                    closeY = closeXY[1];

                    closeRegion = new Ext.util.Region(
                        closeY,
                        closeX + closeWidth,
                        closeY + closeHeight,
                        closeX
                    );

                    close = closeRegion.contains(point);
                }
                break;
            }
        }

        return {
            tab: tab,
            close: close
        };
    },

    // @private
    getCloseXY: function(closeEl, tabX, tabY, tabWidth, tabHeight, closeWidth, closeHeight, direction) {
        var closeXY = closeEl.getXY(),
            closeX, closeY;

        if (direction === 'right') {
            closeX = tabX + tabWidth - ((closeXY[1] - tabY) + closeHeight); 
            closeY = tabY + (closeXY[0] - tabX); 
        } else {
            closeX = tabX + (closeXY[1] - tabY);
            closeY = tabY + tabX + tabHeight - closeXY[0] - closeWidth;
        }

        return [closeX, closeY];
    },

    /**
     * @private
     * Closes the given tab by removing it from the TabBar and removing the corresponding card from the TabPanel
     * @param {Ext.tab.Tab} toClose The tab to close
     */
    closeTab: function(toClose) {
        var me = this,
            card = toClose.card,
            tabPanel = me.tabPanel,
            toActivate;

        if (card && card.fireEvent('beforeclose', card) === false) {
            return false;
        }
        
        // If we are closing the active tab, revert to the previously active tab (or the previous or next enabled sibling if
        // there *is* no previously active tab, or the previously active tab is the one that's being closed or the previously
        // active tab has since been disabled)
        toActivate = me.findNextActivatable(toClose);

        // We are going to remove the associated card, and then, if that was sucessful, remove the Tab,
        // And then potentially activate another Tab. We should not layout for each of these operations.
        Ext.suspendLayouts();

        if (tabPanel && card) {
            // Remove the ownerCt so the tab doesn't get destroyed if the remove is successful
            // We need this so we can have the tab fire it's own close event.
            delete toClose.ownerCt;
            
            // we must fire 'close' before removing the card from panel, otherwise
            // the event will no loger have any listener
            card.fireEvent('close', card);
            tabPanel.remove(card);
            
            // Remove succeeded
            if (!tabPanel.getComponent(card)) {
                /*
                 * Force the close event to fire. By the time this function returns,
                 * the tab is already destroyed and all listeners have been purged
                 * so the tab can't fire itself.
                 */
                toClose.fireClose();
                me.remove(toClose);
            } else {
                // Restore the ownerCt from above
                toClose.ownerCt = me;
                Ext.resumeLayouts(true);
                return false;
            }
        }

        // If we are closing the active tab, revert to the previously active tab (or the previous sibling or the nnext sibling)
        if (toActivate) {
            // Our owning TabPanel calls our setActiveTab method, so only call that if this Bar is being used
            // in some other context (unlikely)
            if (tabPanel) {
                tabPanel.setActiveTab(toActivate.card);
            } else {
                me.setActiveTab(toActivate);
            }
            toActivate.focus();
        }
        Ext.resumeLayouts(true);
    },

    // private - used by TabPanel too.
    // Works out the next tab to activate when one tab is closed.
    findNextActivatable: function(toClose) {
        var me = this;
        if (toClose.active && me.items.getCount() > 1) {
            return (me.previousTab && me.previousTab !== toClose && !me.previousTab.disabled) ? me.previousTab : (toClose.next('tab[disabled=false]') || toClose.prev('tab[disabled=false]'));
        }
    },

    /**
     * @private
     * Marks the given tab as active
     * @param {Ext.tab.Tab} tab The tab to mark active
     * @param {Boolean} initial True if we're setting the tab during setup
     */
    setActiveTab: function(tab, initial) {
        var me = this;

        if (!tab.disabled && tab !== me.activeTab) {
            if (me.activeTab) {
                if (me.activeTab.isDestroyed) {
                    me.previousTab = null;
                } else {
                    me.previousTab = me.activeTab;
                    me.activeTab.deactivate();
                }
            }
            tab.activate();

            me.activeTab = tab;
            me.needsScroll = true;
            
            // We don't fire the change event when setting the first tab.
            // Also no need to run a layout
            if (!initial) {
                me.fireEvent('change', me, tab, tab.card);
                // Ensure that after the currently in progress layout, the active tab is scrolled into view
                me.updateLayout();
            }
        }
    },

    privates: {
        applyTargetCls: function(targetCls) {
            this.bodyTargetCls = targetCls;
        },

        getTargetEl: function() {
            return this.body || this.frameBody || this.el;
        },

        onClick: function(e, target) {
            var me = this,
                tabPanel = me.tabPanel,
                tabEl, tab, isCloseClick, tabInfo;

            if (e.getTarget('.' + Ext.baseCSSPrefix + 'box-scroller')) {
                return;
            }

            if (Ext.isIE8 && me.vertical) {
                tabInfo = me.getTabInfoFromPoint(e.getXY());
                tab = tabInfo.tab;
                isCloseClick = tabInfo.close;
            } else {
                // The target might not be a valid tab el.
                tabEl = e.getTarget('.' + Ext.tab.Tab.prototype.baseCls);
                tab = tabEl && Ext.getCmp(tabEl.id);
                isCloseClick = tab && tab.closeEl && (target === tab.closeEl.dom);
            }

            if (isCloseClick) {
                e.preventDefault();
            }
            if (tab && tab.isDisabled && !tab.isDisabled()) {
                if (tab.closable && isCloseClick) {
                    tab.onCloseClick();
                } else {
                    if (tabPanel) {
                        // TabPanel will card setActiveTab of the TabBar
                        tabPanel.setActiveTab(tab.card);
                    } else {
                        me.setActiveTab(tab);
                    }
                }

                tab.afterClick(isCloseClick);
            }
        }
    }
});
