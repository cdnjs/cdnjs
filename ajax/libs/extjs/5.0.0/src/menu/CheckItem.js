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
    
    ariaRole: 'menuitemcheckbox',

    childEls: [
        'checkEl'
    ],
    
    showCheckbox: true,

    isMenuCheckItem: true,

    checkboxCls: Ext.baseCSSPrefix + 'menu-item-checkbox',

    /**
     * @event beforecheckchange
     * Fires before a change event. Return false to cancel.
     * @param {Ext.menu.CheckItem} this
     * @param {Boolean} checked
     */

    /**
     * @event checkchange
     * Fires after a change event.
     * @param {Ext.menu.CheckItem} this
     * @param {Boolean} checked
     */

    initComponent: function() {
        var me = this;
        
        // coerce to bool straight away
        me.checked = !!me.checked;

        me.callParent(arguments);

        Ext.menu.Manager.registerCheckable(me);

        if (me.group) {
            if (me.initialConfig.hideOnClick !== false) {
                me.hideOnClick = true;
            }
        }
    },
    
    beforeRender: function() {
        var me = this;

        me.callParent();
        Ext.apply(me.renderData, {
            checkboxCls: me.checkboxCls,
            showCheckbox: me.showCheckbox
        });
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
        // In some cases the checkbox will disappear until repainted, see: EXTJSIV-6412
        if (Ext.isIE8 && me.rendered) {
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
        var me = this,
            checkedCls = me.checkedCls,
            uncheckedCls = me.uncheckedCls,
            el = me.el;
            
        if (me.checked !== checked && (suppressEvents || me.fireEvent('beforecheckchange', me, checked) !== false)) {
            if (el) {
                if (checked) {
                    el.addCls(checkedCls);
                    el.removeCls(uncheckedCls);
                } else {
                    el.addCls(uncheckedCls);
                    el.removeCls(checkedCls);
                }
            }
            me.checked = checked;
            Ext.menu.Manager.onCheckChange(me, checked);
            if (!suppressEvents) {
                Ext.callback(me.checkHandler, me.scope || me, [me, checked]);
                me.fireEvent('checkchange', me, checked);
            }
        }
    }
});
