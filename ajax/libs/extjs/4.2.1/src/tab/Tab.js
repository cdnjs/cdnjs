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
 * 
 * Represents a single Tab in a {@link Ext.tab.Panel TabPanel}. A Tab is simply a slightly customized {@link Ext.button.Button Button}, 
 * styled to look like a tab. Tabs are optionally closable, and can also be disabled. 99% of the time you will not
 * need to create Tabs manually as the framework does so automatically when you use a {@link Ext.tab.Panel TabPanel}
 */
Ext.define('Ext.tab.Tab', {
    extend: 'Ext.button.Button',
    alias: 'widget.tab',

    requires: [
        'Ext.util.KeyNav'
    ],

    /**
     * @property {Boolean} isTab
     * `true` in this class to identify an object as an instantiated Tab, or subclass thereof.
     */
    isTab: true,

    baseCls: Ext.baseCSSPrefix + 'tab',
    closeElOverCls: Ext.baseCSSPrefix + 'tab-close-btn-over',

    /**
     * @cfg {String} activeCls
     * The CSS class to be applied to a Tab when it is active.
     * Providing your own CSS for this class enables you to customize the active state.
     */
    activeCls: 'active',

    /**
     * @cfg {String} [disabledCls='x-tab-disabled']
     * The CSS class to be applied to a Tab when it is disabled.
     */

    /**
     * @cfg {String} closableCls
     * The CSS class which is added to the tab when it is closable
     */
    closableCls: 'closable',

    /**
     * @cfg {Boolean} closable
     * True to make the Tab start closable (the close icon will be visible).
     */
    closable: true,

    //<locale>
    /**
     * @cfg {String} closeText
     * The accessible text label for the close button link; only used when {@link #cfg-closable} = true.
     */
    closeText: 'Close Tab',
    //</locale>

    /**
     * @property {Boolean} active
     * Indicates that this tab is currently active. This is NOT a public configuration.
     * @readonly
     */
    active: false,

    /**
     * @property {Boolean} closable
     * True if the tab is currently closable
     */

    childEls: [
        'closeEl'
    ],

    scale: false,

    position: 'top',

    initComponent: function() {
        var me = this;

        me.addEvents(
            /**
             * @event activate
             * Fired when the tab is activated.
             * @param {Ext.tab.Tab} this
             */
            'activate',

            /**
             * @event deactivate
             * Fired when the tab is deactivated.
             * @param {Ext.tab.Tab} this
             */
            'deactivate',

            /**
             * @event beforeclose
             * Fires if the user clicks on the Tab's close button, but before the {@link #close} event is fired. Return
             * false from any listener to stop the close event being fired
             * @param {Ext.tab.Tab} tab The Tab object
             */
            'beforeclose',

            /**
             * @event close
             * Fires to indicate that the tab is to be closed, usually because the user has clicked the close button.
             * @param {Ext.tab.Tab} tab The Tab object
             */
            'close'
        );

        me.callParent(arguments);

        if (me.card) {
            me.setCard(me.card);
        }

        me.overCls = ['over', me.position + '-over'];
    },

    getTemplateArgs: function() {
        var me = this,
            result = me.callParent();

        result.closable = me.closable;
        result.closeText = me.closeText;

        return result;
    },
    
    getFramingInfoCls: function(){
        return this.baseCls + '-' + this.ui + '-' + this.position;
    },

    beforeRender: function() {
        var me = this,
            tabBar = me.up('tabbar'),
            tabPanel = me.up('tabpanel');
        
        me.callParent();
        
        me.addClsWithUI(me.position);

        if (me.active) {
            me.addClsWithUI([me.activeCls, me.position + '-' + me.activeCls]);
        }

        // Set all the state classNames, as they need to include the UI
        // me.disabledCls = me.getClsWithUIs('disabled');

        me.syncClosableUI();

        // Propagate minTabWidth and maxTabWidth settings from the owning TabBar then TabPanel
        if (!me.minWidth) {
            me.minWidth = (tabBar) ? tabBar.minTabWidth : me.minWidth;
            if (!me.minWidth && tabPanel) {
                me.minWidth = tabPanel.minTabWidth;
            }
            if (me.minWidth && me.iconCls) {
                me.minWidth += 25;
            }
        }
        if (!me.maxWidth) {
            me.maxWidth = (tabBar) ? tabBar.maxTabWidth : me.maxWidth;
            if (!me.maxWidth && tabPanel) {
                me.maxWidth = tabPanel.maxTabWidth;
            }
        }
    },

    onRender: function() {
        var me = this;

        me.setElOrientation();

        me.callParent(arguments);

        if (me.closable) {
            me.closeEl.addClsOnOver(me.closeElOverCls);
        }

        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: me.onEnterKey,
            del: me.onDeleteKey,
            scope: me
        });
    },

    setElOrientation: function() {
        var position = this.position;

        if (position === 'left' || position === 'right') {
            this.el.setVertical(position === 'right' ? 90 : 270);
        }
    },

    // inherit docs
    enable : function(silent) {
        var me = this;

        me.callParent(arguments);

        me.removeClsWithUI(me.position + '-disabled');

        return me;
    },

    // inherit docs
    disable : function(silent) {
        var me = this;

        me.callParent(arguments);

        me.addClsWithUI(me.position + '-disabled');

        return me;
    },

    onDestroy: function() {
        var me = this;

        Ext.destroy(me.keyNav);
        delete me.keyNav;

        me.callParent(arguments);
    },

    /**
     * Sets the tab as either closable or not.
     * @param {Boolean} closable Pass false to make the tab not closable. Otherwise the tab will be made closable (eg a
     * close button will appear on the tab)
     */
    setClosable: function(closable) {
        var me = this;

        // Closable must be true if no args
        closable = (!arguments.length || !!closable);

        if (me.closable != closable) {
            me.closable = closable;

            // set property on the user-facing item ('card'):
            if (me.card) {
                me.card.closable = closable;
            }

            me.syncClosableUI();

            if (me.rendered) {
                me.syncClosableElements();

                // Tab will change width to accommodate close icon
                me.updateLayout();
            }
        }
    },

    /**
     * This method ensures that the closeBtn element exists or not based on 'closable'.
     * @private
     */
    syncClosableElements: function () {
        var me = this,
            closeEl = me.closeEl;

        if (me.closable) {
            if (!closeEl) {
                closeEl = me.closeEl = me.btnWrap.insertSibling({
                    tag: 'a',
                    cls: me.baseCls + '-close-btn',
                    href: '#',
                    title: me.closeText
                }, 'after');
            }
            closeEl.addClsOnOver(me.closeElOverCls);
        } else if (closeEl) {
            closeEl.remove();
            delete me.closeEl;
        }
    },

    /**
     * This method ensures that the UI classes are added or removed based on 'closable'.
     * @private
     */
    syncClosableUI: function () {
        var me = this,
            classes = [me.closableCls, me.closableCls + '-' + me.position];

        if (me.closable) {
            me.addClsWithUI(classes);
        } else {
            me.removeClsWithUI(classes);
        }
    },

    /**
     * Sets this tab's attached card. Usually this is handled automatically by the {@link Ext.tab.Panel} that this Tab
     * belongs to and would not need to be done by the developer
     * @param {Ext.Component} card The card to set
     */
    setCard: function(card) {
        var me = this;

        me.card = card;
        me.setText(me.title || card.title);
        me.setIconCls(me.iconCls || card.iconCls);
        me.setIcon(me.icon || card.icon);
        me.setGlyph(me.glyph || card.glyph);
    },

    /**
     * @private
     * Listener attached to click events on the Tab's close button
     */
    onCloseClick: function() {
        var me = this;

        if (me.fireEvent('beforeclose', me) !== false) {
            if (me.tabBar) {
                if (me.tabBar.closeTab(me) === false) {
                    // beforeclose on the panel vetoed the event, stop here
                    return;
                }
            } else {
                // if there's no tabbar, fire the close event
                me.fireClose();
            }
        }
    },

    /**
     * Fires the close event on the tab.
     * @private
     */
    fireClose: function(){
        this.fireEvent('close', this);
    },

    /**
     * @private
     */
    onEnterKey: function(e) {
        var me = this;

        if (me.tabBar) {
            me.tabBar.onClick(e, me.el);
        }
    },

   /**
     * @private
     */
    onDeleteKey: function(e) {
        if (this.closable) {
            this.onCloseClick();
        }
    },

    // @private
    activate : function(supressEvent) {
        var me = this;

        me.active = true;
        me.addClsWithUI([me.activeCls, me.position + '-' + me.activeCls]);

        if (supressEvent !== true) {
            me.fireEvent('activate', me);
        }
    },

    // @private
    deactivate : function(supressEvent) {
        var me = this;

        me.active = false;
        me.removeClsWithUI([me.activeCls, me.position + '-' + me.activeCls]);

        if (supressEvent !== true) {
            me.fireEvent('deactivate', me);
        }
    }
});
