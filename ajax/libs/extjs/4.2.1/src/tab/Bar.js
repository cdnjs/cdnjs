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
 * @author Ed Spencer
 * TabBar is used internally by a {@link Ext.tab.Panel TabPanel} and typically should not need to be created manually.
 * The tab bar automatically removes the default title provided by {@link Ext.panel.Header}
 */
Ext.define('Ext.tab.Bar', {
    extend: 'Ext.panel.Header',
    alias: 'widget.tabbar',
    baseCls: Ext.baseCSSPrefix + 'tab-bar',

    requires: [
        'Ext.tab.Tab',
        'Ext.util.Point'
    ],

    /**
     * @property {Boolean} isTabBar
     * `true` in this class to identify an object as an instantiated Tab Bar, or subclass thereof.
     */
    isTabBar: true,
    
    /**
     * @cfg {String} title @hide
     */
    
    /**
     * @cfg {String} iconCls @hide
     */

    // @private
    defaultType: 'tab',

    /**
     * @cfg {Boolean} plain
     * True to not show the full background on the tabbar
     */
    plain: false,

    childEls: [
        'body', 'strip'
    ],

    // @private
    renderTpl: [
        '<div id="{id}-body" class="{baseCls}-body {bodyCls} {bodyTargetCls}{childElCls}<tpl if="ui"> {baseCls}-body-{ui}<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl></tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '{%this.renderContainer(out,values)%}',
        '</div>',
        '<div id="{id}-strip" class="{baseCls}-strip {baseCls}-strip-{dock}{childElCls}',
            '<tpl if="ui"> {baseCls}-strip-{ui}',
                '<tpl for="uiCls"> {parent.baseCls}-strip-{parent.ui}-{.}</tpl>',
            '</tpl>">',
        '</div>'
    ],

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

    // @private
    initComponent: function() {
        var me = this;

        if (me.plain) {
            me.addCls(me.baseCls + '-plain');
        }

        me.addClsWithUI(me.orientation);

        me.addEvents(
            /**
             * @event change
             * Fired when the currently-active tab has changed
             * @param {Ext.tab.Bar} tabBar The TabBar
             * @param {Ext.tab.Tab} tab The new Tab
             * @param {Ext.Component} card The card that was just shown in the TabPanel
             */
            'change'
        );

        // Element onClick listener added by Header base class
        me.callParent(arguments);
        Ext.merge(me.layout, me.initialConfig.layout);

        // TabBar must override the Header's align setting.
        me.layout.align = (me.orientation == 'vertical') ? 'left' : 'top';
        me.layout.overflowHandler = new Ext.layout.container.boxOverflow.Scroller(me.layout);

        me.remove(me.titleCmp);
        delete me.titleCmp;

        Ext.apply(me.renderData, {
            bodyCls: me.bodyCls,
            dock: me.dock
        });
    },

    onRender: function() {
        var me = this;

        me.callParent();

        if (me.orientation === 'vertical' && (Ext.isIE8 || Ext.isIE9) && Ext.isStrict) {
            me.el.on({
                mousemove: me.onMouseMove, 
                scope: me
            });
        }
    },

    afterRender: function() {
        var layout = this.layout;

        this.callParent();
        if (Ext.isIE9 && Ext.isStrict && this.orientation === 'vertical') {
            // EXTJSIV-8765: focusing a vertically-oriented tab in IE9 strict can cause
            // the innerCt to scroll if the tabs have bordering.  
            layout.innerCt.on('scroll', function() {
                layout.innerCt.dom.scrollLeft = 0;
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
            tab;

        // When tabs are rotated vertically we don't have a reliable way to position
        // them using CSS in modern browsers.  This is because of the way transform-orign
        // works - it requires the width to be known, and the width is not known in css.
        // Consequently we have to make an adjustment to the tab's position in these browsers.
        // This is similar to what we do in Ext.panel.Header#adjustTitlePosition
        if (!Ext.isIE9m) {
            if (this.dock === 'right') {
                // rotated 90 degrees around using the top left corner as the axis.
                // tabs need to be shifted to the right by their width
                while (i--) {
                    tab = items[i];
                    if (tab.isVisible()) {
                        tab.el.setStyle('left', tab.lastBox.width + 'px');
                    }
                }
            } else if (this.dock === 'left') {
                // rotated 270 degrees around using the top left corner as the axis.
                // tabs need to be shifted down by their height
                while (i--) {
                    tab = items[i];
                    if (tab.isVisible()) {
                        tab.el.setStyle('left', -tab.lastBox.height + 'px');
                    }
                }
            }
        }
    },

    getLayout: function() {
        var me = this;
        me.layout.type = (me.orientation === 'horizontal') ? 'hbox' : 'vbox';
        return me.callParent(arguments);
    },

    // @private
    onAdd: function(tab) {
        tab.position = this.dock;
        this.callParent(arguments);
    },
    
    onRemove: function(tab) {
        var me = this;
        
        if (tab === me.previousTab) {
            me.previousTab = null;
        }
        me.callParent(arguments);    
    },

    afterComponentLayout : function(width) {
        var me = this,
            needsScroll = me.needsScroll;
        
        me.callParent(arguments);
            
        if (needsScroll) {
            me.layout.overflowHandler.scrollToItem(me.activeTab);
        }    
        delete me.needsScroll;
    },

    // @private
    onClick: function(e, target) {
        var me = this,
            tabPanel = me.tabPanel,
            tabEl, tab, isCloseClick, tabInfo;

        if (e.getTarget('.' + Ext.baseCSSPrefix + 'box-scroller')) {
            return;
        }

        if (me.orientation === 'vertical' && (Ext.isIE8 || Ext.isIE9) && Ext.isStrict) {
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
                tab.focus();
            }
        }
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
            lastBox = tabs[i].lastBox;
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
                tab = tabs[i];
                closeEl = tab.closeEl;
                if (closeEl) {
                    closeXY = closeEl.getXY();
                    closeWidth = closeEl.getWidth();
                    closeHeight = closeEl.getHeight();
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

                    if (direction === 'right') {
                        closeX = tabX + tabWidth - ((closeXY[1] - tabY) + closeEl.getHeight()); 
                        closeY = tabY + (closeXY[0] - tabX); 
                    } else {
                        closeX = tabX + (closeXY[1] - tabY);
                        closeY = tabY + tabX + tabHeight - closeXY[0] - closeEl.getWidth();
                    }
                        
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
    }
});
