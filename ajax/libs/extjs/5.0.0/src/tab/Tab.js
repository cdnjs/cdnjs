/**
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
    closeElPressedCls: Ext.baseCSSPrefix + 'tab-close-btn-pressed',

    config: {
        /**
         * @cfg {'default'/0/1/2} rotation
         * The rotation of the tab.  Can be one of the following values:
         *
         * - `null` - use the default rotation, depending on the dock position of the tabbar
         * - `0` - no rotation
         * - `1` - rotate 90deg clockwise
         * - `2` - rotate 90deg counter-clockwise
         *
         * The default behavior of this config depends on the dock position of the tabbar:
         *
         * - `'top'` or `'bottom'` - `0`
         * - `'right'` - `1`
         * - `'left'` - `2`
         */
        rotation: 'default',

        /**
         * @cfg {'top'/'right'/'bottom'/'left'} tabPosition
         * The tab's position.  Users should not typically need to set this, as it is
         * configured automatically by the tab bar
         */
        tabPosition: 'top'
    },

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

    /**
     * @event activate
     * Fired when the tab is activated.
     * @param {Ext.tab.Tab} this
     */

    /**
     * @event deactivate
     * Fired when the tab is deactivated.
     * @param {Ext.tab.Tab} this
     */

    /**
     * @event beforeclose
     * Fires if the user clicks on the Tab's close button, but before the {@link #close} event is fired. Return
     * false from any listener to stop the close event being fired
     * @param {Ext.tab.Tab} tab The Tab object
     */

    /**
     * @event close
     * Fires to indicate that the tab is to be closed, usually because the user has clicked the close button.
     * @param {Ext.tab.Tab} tab The Tab object
     */

    ariaRole: 'tab',

    _btnWrapCls: Ext.baseCSSPrefix + 'tab-wrap',
    _btnCls: Ext.baseCSSPrefix + 'tab-button',
    _baseIconCls: Ext.baseCSSPrefix + 'tab-icon-el',
    _glyphCls: Ext.baseCSSPrefix + 'tab-glyph',
    _innerCls: Ext.baseCSSPrefix + 'tab-inner',
    _textCls: Ext.baseCSSPrefix + 'tab-text',
    _noTextCls: Ext.baseCSSPrefix + 'tab-no-text',
    _hasIconCls: Ext.baseCSSPrefix + 'tab-icon',

    _activeCls: Ext.baseCSSPrefix + 'tab-active',
    _closableCls: Ext.baseCSSPrefix + 'tab-closable',
    overCls: Ext.baseCSSPrefix + 'tab-over',
    _pressedCls: Ext.baseCSSPrefix + 'tab-pressed',
    _disabledCls: Ext.baseCSSPrefix + 'tab-disabled',

    _rotateClasses: {
        1: Ext.baseCSSPrefix + 'tab-rotate-right',
        2: Ext.baseCSSPrefix + 'tab-rotate-left'
    },

    // a mapping of the "ui" positions.  When "rotation" is anything other than 0, a ui
    // position other than the docked side must be used.
    _positions: {
        top: {
            'default': 'top',
            0: 'top',
            1: 'left',
            2: 'right'
        },
        right: {
            'default': 'top',
            0: 'right',
            1: 'top',
            2: 'bottom'
        },
        bottom: {
            'default': 'bottom',
            0: 'bottom',
            1: 'right',
            2: 'left'
        },
        left: {
            'default': 'top',
            0: 'left',
            1: 'bottom',
            2: 'top'
        }
    },

    _defaultRotations: {
        top: 0,
        right: 1,
        bottom: 0,
        left: 2
    },

    initComponent: function() {
        var me = this;

        if (me.card) {
            me.setCard(me.card);
        }

        me.callParent(arguments);
    },

    getActualRotation: function() {
        var rotation = this.getRotation();

        return (rotation !== 'default') ? rotation :
            this._defaultRotations[this.getTabPosition()];
    },

    updateRotation: function() {
        this.syncRotationAndPosition();
    },

    updateTabPosition: function() {
        this.syncRotationAndPosition();
    },

    syncRotationAndPosition: function() {
        var me = this,
            positions = me._positions,
            rotateClasses = me._rotateClasses,
            position = me.getTabPosition(),
            rotation = me.getActualRotation(),
            oldRotateCls = me._rotateCls,
            rotateCls = me._rotateCls = rotateClasses[rotation],
            oldPositionCls = me._positionCls,
            positionCls = me._positionCls = me._positions[position][rotation];

        if (oldRotateCls !== rotateCls) {
            if (oldRotateCls) {
                me.removeCls(oldRotateCls)
            }
            if (rotateCls) {
                me.addCls(rotateCls);
            }
        }
        if (oldPositionCls !== positionCls) {
            if (oldPositionCls) {
                me.removeClsWithUI(oldPositionCls);
            }
            if (positionCls) {
                me.addClsWithUI(positionCls);
            }
            if (me.rendered) {
                me.updateFrame();
            }
        }

        if (me.rendered) {
            me.setElOrientation();
        }
    },

    onAdded: function (container, pos, instanced) {
        this.callParent([container, pos, instanced]);
        this.syncRotationAndPosition();
    },

    getTemplateArgs: function() {
        var me = this,
            result = me.callParent();

        result.closable = me.closable;
        result.closeText = me.closeText;

        return result;
    },

    beforeRender: function() {
        var me = this,
            tabBar = me.up('tabbar'),
            tabPanel = me.up('tabpanel');

        me.callParent();

        if (me.active) {
            me.addCls(me._activeCls);
        }

        me.syncClosableCls();

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
            me.closeEl.addClsOnClick(me.closeElPressedCls);
        }
        
        me.initKeyNav();
    },
    
    initKeyNav: function() {
        var me = this;

        me.keyNav = new Ext.util.KeyNav(me.el, {
            enter: me.onEnterKey,
            del: me.onDeleteKey,
            scope: me
        });
    },

    setElOrientation: function() {
        var me = this,
            rotation = me.getActualRotation(),
            el = me.el;

        if (rotation) {
            el.setVertical(rotation === 1 ? 90 : 270);
        } else {
            el.setHorizontal();
        }
    },

    // inherit docs
    enable: function(silent) {
        var me = this;

        me.callParent(arguments);

        me.removeCls(me._disabledCls);

        return me;
    },

    // inherit docs
    disable: function(silent) {
        var me = this;

        me.callParent(arguments);

        me.addCls(me._disabledCls);

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

            me.syncClosableCls();

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
                    role: 'presentation',
                    cls: me.baseCls + '-close-btn',
                    href: '#',
                    title: me.closeText
                }, 'after');
            }
            closeEl.addClsOnOver(me.closeElOverCls);
            closeEl.addClsOnClick(me.closeElPressedCls);
        } else if (closeEl) {
            closeEl.destroy();
            delete me.closeEl;
        }
    },

    /**
     * This method ensures that the closable cls are added or removed based on 'closable'.
     * @private
     */
    syncClosableCls: function () {
        var me = this,
            closableCls = me._closableCls;

        if (me.closable) {
            me.addCls(closableCls);
        } else {
            me.removeCls(closableCls);
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
        if (card.iconAlign) {
            me.setIconAlign(card.iconAlign);
        }
        if (card.textAlign) {
            me.setTextAlign(card.textAlign);
        }
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
    afterClick: function(isCloseClick) {
        if (!isCloseClick) {
            this.focus();
        }
    },

    // @private
    activate: function(supressEvent) {
        var me = this;

        me.active = true;
        me.addCls(me._activeCls);

        if (supressEvent !== true) {
            me.fireEvent('activate', me);
        }
    },

    // @private
    deactivate: function(supressEvent) {
        var me = this;

        me.active = false;
        me.removeCls(me._activeCls);

        if (supressEvent !== true) {
            me.fireEvent('deactivate', me);
        }
    },

    privates: {
        getFramingInfoCls: function(){
            return this.baseCls + '-' + this.ui + '-' + this._positionCls;
        },

        wrapPrimaryEl: function(dom) {
            // Tabs don't need the hacks in Ext.dom.ButtonElement
            this.el = new Ext.dom.Element(dom);
        }
    }
});
