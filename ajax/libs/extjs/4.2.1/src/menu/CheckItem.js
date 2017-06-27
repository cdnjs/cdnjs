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
 * A menu item that contains a togglable checkbox by default, but that can also be a part of a radio group.
 *
 *     @example
 *     Ext.create('Ext.menu.Menu', {
 *         width: 100,
 *         height: 110,
 *         floating: false,  // usually you want this set to True (default)
 *         renderTo: Ext.getBody(),  // usually rendered by it's containing component
 *         items: [{
 *             xtype: 'menucheckitem',
 *             text: 'select all'
 *         },{
 *             xtype: 'menucheckitem',
 *             text: 'select specific'
 *         },{
 *             iconCls: 'add16',
 *             text: 'icon item'
 *         },{
 *             text: 'regular item'
 *         }]
 *     });
 */
Ext.define('Ext.menu.CheckItem', {
    extend: 'Ext.menu.Item',
    alias: 'widget.menucheckitem',
    
    /**
     * @cfg {Boolean} [checked=false]
     * True to render the menuitem initially checked.
     */
    
    /**
     * @cfg {Function} checkHandler
     * Alternative for the {@link #checkchange} event.  Gets called with the same parameters.
     */

    /**
     * @cfg {Object} scope
     * Scope for the {@link #checkHandler} callback.
     */
    
    /**
     * @cfg {String} group
     * Name of a radio group that the item belongs.
     *
     * Specifying this option will turn check item into a radio item.
     *
     * Note that the group name must be globally unique.
     */

    /**
     * @cfg {String} checkedCls
     * The CSS class used by {@link #cls} to show the checked state.
     * Defaults to `Ext.baseCSSPrefix + 'menu-item-checked'`.
     */
    checkedCls: Ext.baseCSSPrefix + 'menu-item-checked',
    /**
     * @cfg {String} uncheckedCls
     * The CSS class used by {@link #cls} to show the unchecked state.
     * Defaults to `Ext.baseCSSPrefix + 'menu-item-unchecked'`.
     */
    uncheckedCls: Ext.baseCSSPrefix + 'menu-item-unchecked',
    /**
     * @cfg {String} groupCls
     * The CSS class applied to this item's icon image to denote being a part of a radio group.
     * Defaults to `Ext.baseCSSClass + 'menu-group-icon'`.
     * Any specified {@link #iconCls} overrides this.
     */
    groupCls: Ext.baseCSSPrefix + 'menu-group-icon',

    /**
     * @cfg {Boolean} [hideOnClick=false]
     * Whether to not to hide the owning menu when this item is clicked.
     * Defaults to `false` for checkbox items, and to `true` for radio group items.
     */
    hideOnClick: false,
    
    /**
     * @cfg {Boolean} [checkChangeDisabled=false]
     * True to prevent the checked item from being toggled. Any submenu will still be accessible.
     */
    checkChangeDisabled: false,

    childEls: [
        'itemEl', 'iconEl', 'textEl', 'checkEl'
    ],
    
    showCheckbox: true,

    renderTpl: [
        '<tpl if="plain">',
            '{text}',
        '<tpl else>',
            '{%var showCheckbox = values.showCheckbox,',
            '      rightCheckbox = showCheckbox && values.hasIcon && (values.iconAlign !== "left"), textCls = rightCheckbox ? "' + Ext.baseCSSPrefix + 'right-check-item-text" : "";%}',
            '<a id="{id}-itemEl" class="' + Ext.baseCSSPrefix + 'menu-item-link{childElCls}" href="{href}" <tpl if="hrefTarget">target="{hrefTarget}"</tpl> hidefocus="true" unselectable="on"',
                '<tpl if="tabIndex">',
                    ' tabIndex="{tabIndex}"',
                '</tpl>',
            '>',
                '{%if (values.hasIcon && (values.iconAlign !== "left")) {%}',
                    '<div role="img" id="{id}-iconEl" class="' + Ext.baseCSSPrefix + 'menu-item-icon {iconCls}',
                        '{childElCls} {glyphCls}" style="<tpl if="icon">background-image:url({icon});</tpl>',
                        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
                        '<tpl if="glyph">&#{glyph};</tpl>',
                    '</div>',
                '{%} else if (showCheckbox){%}',
                    '<img id="{id}-checkEl" src="{blank}" class="' + Ext.baseCSSPrefix + 'menu-item-icon{childElCls}" />',
                '{%}%}',
                '<span id="{id}-textEl" class="' + Ext.baseCSSPrefix + 'menu-item-text {[textCls]}{childElCls}" <tpl if="arrowCls">style="margin-right: 17px;"</tpl> >{text}</span>',

                // CheckItem with an icon puts the icon on the right unless iconAlign=='left'
                '{%if (rightCheckbox) {%}',
                    '<img id="{id}-checkEl" src="{blank}" class="' + Ext.baseCSSPrefix + 'menu-item-icon-right{childElCls}" />',
                '{%} else if (values.arrowCls) {%}',
                    '<img id="{id}-arrowEl" src="{blank}" class="{arrowCls}{childElCls}"/>',
                '{%}%}',
            '</a>',
        '</tpl>'
    ],

    initComponent: function() {
        var me = this;
        
        // coerce to bool straight away
        me.checked = !!me.checked;
        me.addEvents(
            /**
             * @event beforecheckchange
             * Fires before a change event. Return false to cancel.
             * @param {Ext.menu.CheckItem} this
             * @param {Boolean} checked
             */
            'beforecheckchange',

            /**
             * @event checkchange
             * Fires after a change event.
             * @param {Ext.menu.CheckItem} this
             * @param {Boolean} checked
             */
            'checkchange'
        );

        me.callParent(arguments);

        Ext.menu.Manager.registerCheckable(me);

        if (me.group) {
            me.showCheckbox = false
            if (!(me.iconCls || me.icon || me.glyph)) {
                me.iconCls = me.groupCls;
            }
            if (me.initialConfig.hideOnClick !== false) {
                me.hideOnClick = true;
            }
        }
    },
    
    beforeRender: function() {
        this.callParent();
        this.renderData.showCheckbox = this.showCheckbox;
    },
    
    afterRender: function() {
        var me = this;
        me.callParent();
        me.checked = !me.checked;
        me.setChecked(!me.checked, true);
        if (me.checkChangeDisabled) {
            me.disableCheckChange();
        }
    },
    
    /**
     * Disables just the checkbox functionality of this menu Item. If this menu item has a submenu, that submenu
     * will still be accessible
     */
    disableCheckChange: function() {
        var me = this,
            checkEl = me.checkEl;

        if (checkEl) {
            checkEl.addCls(me.disabledCls);
        }
        // In some cases the checkbox will disappear until repainted
        // Happens in everything except IE9 strict, see: EXTJSIV-6412
        if (!(Ext.isIE10p || (Ext.isIE9 && Ext.isStrict)) && me.rendered) {
            me.el.repaint();
        }
        me.checkChangeDisabled = true;
    },

    /**
     * Reenables the checkbox functionality of this menu item after having been disabled by {@link #disableCheckChange}
     */
    enableCheckChange: function() {
        var me = this,
            checkEl = me.checkEl;
            
        if (checkEl) {
            checkEl.removeCls(me.disabledCls);
        }
        me.checkChangeDisabled = false;
    },

    onClick: function(e) {
        var me = this;
        if(!me.disabled && !me.checkChangeDisabled && !(me.checked && me.group)) {
            me.setChecked(!me.checked);
        }
        this.callParent([e]);
    },

    onDestroy: function() {
        Ext.menu.Manager.unregisterCheckable(this);
        this.callParent(arguments);
    },

    /**
     * Sets the checked state of the item
     * @param {Boolean} checked True to check, false to uncheck
     * @param {Boolean} [suppressEvents=false] True to prevent firing the checkchange events.
     */
    setChecked: function(checked, suppressEvents) {
        var me = this;
        if (me.checked !== checked && (suppressEvents || me.fireEvent('beforecheckchange', me, checked) !== false)) {
            if (me.el) {
                me.el[checked  ? 'addCls' : 'removeCls'](me.checkedCls)[!checked ? 'addCls' : 'removeCls'](me.uncheckedCls);
            }
            me.checked = checked;
            Ext.menu.Manager.onCheckChange(me, checked);
            if (!suppressEvents) {
                Ext.callback(me.checkHandler, me.scope, [me, checked]);
                me.fireEvent('checkchange', me, checked);
            }
        }
    }
});
