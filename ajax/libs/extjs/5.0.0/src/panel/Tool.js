/**
 * This class is used to display small visual icons in the header of a panel. There are a set of
 * 25 icons that can be specified by using the {@link #type} config. The {@link #callback} config
 * can be used to provide a function that will respond to any click events. In general, this class
 * will not be instantiated directly, rather it will be created by specifying the {@link Ext.panel.Panel#tools}
 * configuration on the Panel itself.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         width: 200,
 *         height: 200,
 *         renderTo: document.body,
 *         title: 'A Panel',
 *         tools: [{
 *             type: 'help',
 *             callback: function() {
 *                 // show help here
 *             }
 *         }, {
 *             itemId: 'refresh',
 *             type: 'refresh',
 *             hidden: true,
 *             callback: function() {
 *                 // do refresh
 *             }
 *         }, {
 *             type: 'search',
 *             callback: function (panel) {
 *                 // do search
 *                 panel.down('#refresh').show();
 *             }
 *         }]
 *     });
 *
 * The `callback` config was added in Ext JS 4.2.1 as an alternative to {@link #handler}
 * to provide a more convenient list of arguments. In Ext JS 4.2.1 it is also possible to
 * pass a method name instead of a direct function:
 * 
 *      tools: [{
 *          type: 'help',
 *          callback: 'onHelp',
 *          scope: this
 *      },
 *      ...
 * 
 * The `callback` (or `handler`) name is looked up on the `scope` which will also be the
 * `this` reference when the method is called.
 */
Ext.define('Ext.panel.Tool', {
    extend: 'Ext.Component',
    uses: ['Ext.tip.QuickTipManager'],
    xtype: 'tool',

    /**
     * @property {Boolean} isTool
     * `true` in this class to identify an object as an instantiated Tool, or subclass thereof.
     */
    isTool: true,

    baseCls: Ext.baseCSSPrefix + 'tool',
    disabledCls: Ext.baseCSSPrefix + 'tool-disabled',
    
    /**
     * @cfg
     * @private
     */
    toolPressedCls: Ext.baseCSSPrefix + 'tool-pressed',
    /**
     * @cfg
     * @private
     */
    toolOverCls: Ext.baseCSSPrefix + 'tool-over',

    ariaRole: 'button',

    childEls: [
        'toolEl'
    ],

    renderTpl: [
        '<img id="{id}-toolEl" data-ref="toolEl" src="{blank}" class="{baseCls}-img {baseCls}-{type}' +
            '{childElCls}" role="presentation"/>'
    ],

    /**
     * @cfg {Ext.Component} toolOwner
     * The owner to report to the `callback` method. Default is `null` for the `ownerCt`.
     * This is automatically set to the owning `Ext.panel.Panel` when a tool is created as
     * a member of a panel's `tools`.
     * @since 4.2
     */
    toolOwner: null,

    /**
     * @cfg {Function} callback A function to execute when the tool is clicked.
     * @cfg {Ext.Component} callback.owner The logical owner of the tool. In a typical
     * `Ext.panel.Panel`, this is set to the owning panel. This value comes from the
     * `toolOwner` config.
     * @cfg {Ext.panel.Tool} callback.tool The tool that is calling.
     * @cfg {Ext.event.Event} callback.event The click event.
     * @since 4.2
     */

    /**
     * @cfg {Function} handler
     * A function to execute when the tool is clicked. Arguments passed are:
     *
     * - **event** : Ext.event.Event - The click event.
     * - **toolEl** : Ext.Element - The tool Element.
     * - **owner** : Ext.panel.Header - The host panel header.
     * - **tool** : Ext.panel.Tool - The tool object
     *
     * @deprecated 4.2 Use `callback` instead.
     */

    /**
     * @cfg {Object} scope
     * The scope to execute the {@link #callback} or {@link #handler} function. Defaults
     * to the tool.
     */

    /**
     * @cfg {String} type
     * The type of tool to render. The following types are available:
     *
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-close"></span> close
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-minimize"></span> minimize
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-maximize"></span> maximize
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-restore"></span> restore
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-toggle"></span> toggle
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-gear"></span> gear
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-prev"></span> prev
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-next"></span> next
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-pin"></span> pin
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-unpin"></span> unpin
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-right"></span> right
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-left"></span> left
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-down"></span> down
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-up"></span> up
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-refresh"></span> refresh
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-plus"></span> plus
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-minus"></span> minus
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-search"></span> search
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-save"></span> save
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-help"></span> help
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-print"></span> print
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-expand"></span> expand
     * - <span class="x-tool"><img src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-collapse"></span> collapse
     */

    /**
     * @cfg {String/Object} tooltip
     * The tooltip for the tool - can be a string to be used as innerHTML (html tags are accepted) or QuickTips config
     * object
     */

     /**
     * @cfg {String} tooltipType
     * The type of tooltip to use. Either 'qtip' (default) for QuickTips or 'title' for title attribute.
     */
    tooltipType: 'qtip',

    /**
     * @cfg {Boolean} stopEvent
     * Specify as false to allow click event to propagate.
     */
    stopEvent: true,

    cacheHeight: true,
    cacheWidth: true,

    //<debug>
    _toolTypes: {
        close:1,
        collapse:1,
        down:1,
        expand:1,
        gear:1,
        help:1,
        left:1,
        maximize:1,
        minimize:1,
        minus:1,
        //move:1,
        next:1,
        pin:1,
        plus:1,
        prev:1,
        print:1,
        refresh:1,
        //resize:1,
        restore:1,
        right:1,
        save:1,
        search:1,
        toggle:1,
        unpin:1,
        up:1
    },
    //</debug>

    initComponent: function() {
        var me = this;

        //<debug>
        if (me.id && me._toolTypes[me.id]) {
            Ext.Error.raise('When specifying a tool you should use the type option, the id can conflict now that tool is a Component');
        }
        //</debug>

        me.type = me.type || me.id;

        Ext.applyIf(me.renderData, {
            baseCls: me.baseCls,
            blank: Ext.BLANK_IMAGE_URL,
            type: me.type
        });

        // alias qtip, should use tooltip since it's what we have in the docs
        me.tooltip = me.tooltip || me.qtip;
        me.callParent();
    },

    // inherit docs
    afterRender: function() {
        var me = this,
            tip;

        me.callParent(arguments);

        me.el.on({
            click: me.onClick,
            mousedown: me.onMouseDown,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            scope: me
        });

        tip = me.tooltip;
        if (tip) {
            me.setTooltip(tip);
        }
    },

    tipAttrs: {
        qtip: 'data-qtip'
    },

    setTooltip: function (tooltip, type) {
        var me = this,
            oldTip = me.tooltip,
            oldType = me.tooltipType,
            id = me.id,
            el = me.el,
            attr;

        if (oldTip && Ext.quickTipsActive && Ext.isObject(oldTip)) {
            Ext.tip.QuickTipManager.unregister(id);
        }

        me.tooltip = tooltip;
        if (type) {
            me.tooltipType = type;
        }

        if (tooltip) {
            if (Ext.quickTipsActive && Ext.isObject(tooltip)) {
                Ext.tip.QuickTipManager.register(Ext.apply({
                    target: id
                }, tooltip));
            } else if (el) {
                if (type && oldType && type !== oldType) {
                    attr = me.tipAttrs[oldType] || 'title';
                    el.dom.removeAttribute(attr);
                }

                attr = me.tipAttrs[type || oldType] || 'title';
                el.dom.setAttribute(attr, tooltip);
            }
        }
    },

    /**
     * Sets the type of the tool. Allows the icon to be changed.
     * @param {String} type The new type. See the {@link #type} config.
     * @return {Ext.panel.Tool} this
     */
    setType: function(type) {
        var me = this,
            oldType = me.type;

        me.type = type;
        if (me.rendered) {
            if (oldType) {
                me.toolEl.removeCls(me.baseCls + '-' + oldType);
            }
            me.toolEl.addCls(me.baseCls + '-' + type);
        } else {
            me.renderData.type = type;
        }
        return me;
    },

    // inherit docs
    onDestroy: function(){
        var me = this,
            keyMap = me.keyMap;

        me.setTooltip(null);

        // ARIA overrides may create a keyMap on a Tool
        if (keyMap) {
            keyMap.destroy();
            me.keyMap = null;
        }

        delete me.toolOwner;

        me.callParent();
    },

    privates: {
        getFocusEl: function () {
            return this.el;
        },

        /**
         * Called when the tool element is clicked
         * @private
         * @param {Ext.event.Event} e
         * @param {HTMLElement} target The target element
         */
        onClick: function(e, target) {
            var me = this;

            if (me.disabled) {
                return false;
            }

            //remove the pressed + over class
            me.el.removeCls(me.toolPressedCls + ' ' + me.toolOverCls);

            if (me.stopEvent !== false) {
                e.stopEvent();
            }

            if (me.handler) {
                Ext.callback(me.handler, me.scope, [e, target, me.ownerCt, me], 0, me);
            } else if (me.callback) {
                Ext.callback(me.callback, me.scope, [me.toolOwner || me.ownerCt, me, e], 0, me);
            }

            /**
             * @event click
             * Fires when the tool is clicked
             * @param {Ext.panel.Tool} this
             * @param {Ext.event.Event} e The event object
             * @param {Ext.Component} owner The logical owner of the tool. In a typical
             * `Ext.panel.Panel`, this is set to the owning panel. This value comes from the
             * `toolOwner` config. ** Added in v5.0 **
             */
            me.fireEvent('click', me, e, me.toolOwner || me.ownerCt);

            return true;
        },

        /**
         * Called when the user presses their mouse button down on a tool
         * Adds the press class ({@link #toolPressedCls})
         * @private
         */
        onMouseDown: function() {
            if (this.disabled) {
                return false;
            }

            this.el.addCls(this.toolPressedCls);
        },

        /**
         * Called when the user rolls over a tool
         * Adds the over class ({@link #toolOverCls})
         * @private
         */
        onMouseOver: function() {
            if (this.disabled) {
                return false;
            }
            this.el.addCls(this.toolOverCls);
        },

        /**
         * Called when the user rolls out from a tool.
         * Removes the over class ({@link #toolOverCls})
         * @private
         */
        onMouseOut: function() {
            this.el.removeCls(this.toolOverCls);
        }
    }
});
