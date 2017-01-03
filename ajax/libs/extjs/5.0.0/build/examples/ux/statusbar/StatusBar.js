/**
 * Basic status bar component that can be used as the bottom toolbar of any {@link Ext.Panel}.  In addition to
 * supporting the standard {@link Ext.toolbar.Toolbar} interface for adding buttons, menus and other items, the StatusBar
 * provides a greedy status element that can be aligned to either side and has convenient methods for setting the
 * status text and icon.  You can also indicate that something is processing using the {@link #showBusy} method.
 *
 *     Ext.create('Ext.Panel', {
 *         title: 'StatusBar',
 *         // etc.
 *         bbar: Ext.create('Ext.ux.StatusBar', {
 *             id: 'my-status',
 *      
 *             // defaults to use when the status is cleared:
 *             defaultText: 'Default status text',
 *             defaultIconCls: 'default-icon',
 *      
 *             // values to set initially:
 *             text: 'Ready',
 *             iconCls: 'ready-icon',
 *      
 *             // any standard Toolbar items:
 *             items: [{
 *                 text: 'A Button'
 *             }, '-', 'Plain Text']
 *         })
 *     });
 *
 *     // Update the status bar later in code:
 *     var sb = Ext.getCmp('my-status');
 *     sb.setStatus({
 *         text: 'OK',
 *         iconCls: 'ok-icon',
 *         clear: true // auto-clear after a set interval
 *     });
 *
 *     // Set the status bar to show that something is processing:
 *     sb.showBusy();
 *
 *     // processing....
 *
 *     sb.clearStatus(); // once completeed
 *
 */
Ext.define('Ext.ux.statusbar.StatusBar', {
    extend: 'Ext.toolbar.Toolbar',
    alternateClassName: 'Ext.ux.StatusBar',
    alias: 'widget.statusbar',
    requires: ['Ext.toolbar.TextItem'],
    /**
     * @cfg {String} statusAlign
     * The alignment of the status element within the overall StatusBar layout.  When the StatusBar is rendered,
     * it creates an internal div containing the status text and icon.  Any additional Toolbar items added in the
     * StatusBar's {@link #cfg-items} config, or added via {@link #method-add} or any of the supported add* methods, will be
     * rendered, in added order, to the opposite side.  The status element is greedy, so it will automatically
     * expand to take up all sapce left over by any other items.  Example usage:
     *
     *     // Create a left-aligned status bar containing a button,
     *     // separator and text item that will be right-aligned (default):
     *     Ext.create('Ext.Panel', {
     *         title: 'StatusBar',
     *         // etc.
     *         bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
     *             defaultText: 'Default status text',
     *             id: 'status-id',
     *             items: [{
     *                 text: 'A Button'
     *             }, '-', 'Plain Text']
     *         })
     *     });
     *
     *     // By adding the statusAlign config, this will create the
     *     // exact same toolbar, except the status and toolbar item
     *     // layout will be reversed from the previous example:
     *     Ext.create('Ext.Panel', {
     *         title: 'StatusBar',
     *         // etc.
     *         bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
     *             defaultText: 'Default status text',
     *             id: 'status-id',
     *             statusAlign: 'right',
     *             items: [{
     *                 text: 'A Button'
     *             }, '-', 'Plain Text']
     *         })
     *     });
     */
    /**
     * @cfg {String} [defaultText='']
     * The default {@link #text} value.  This will be used anytime the status bar is cleared with the
     * `useDefaults:true` option.
     */
    /**
     * @cfg {String} [defaultIconCls='']
     * The default {@link #iconCls} value (see the iconCls docs for additional details about customizing the icon).
     * This will be used anytime the status bar is cleared with the `useDefaults:true` option.
     */
    /**
     * @cfg {String} text
     * A string that will be <b>initially</b> set as the status message.  This string
     * will be set as innerHTML (html tags are accepted) for the toolbar item.
     * If not specified, the value set for {@link #defaultText} will be used.
     */
    /**
     * @cfg {String} [iconCls='']
     * A CSS class that will be **initially** set as the status bar icon and is
     * expected to provide a background image.
     *
     * Example usage:
     *
     *     // Example CSS rule:
     *     .x-statusbar .x-status-custom {
     *         padding-left: 25px;
     *         background: transparent url(images/custom-icon.gif) no-repeat 3px 2px;
     *     }
     *
     *     // Setting a default icon:
     *     var sb = Ext.create('Ext.ux.statusbar.StatusBar', {
     *         defaultIconCls: 'x-status-custom'
     *     });
     *
     *     // Changing the icon:
     *     sb.setStatus({
     *         text: 'New status',
     *         iconCls: 'x-status-custom'
     *     });
     */

    /**
     * @cfg {String} cls
     * The base class applied to the containing element for this component on render.
     */
    cls : 'x-statusbar',
    /**
     * @cfg {String} busyIconCls
     * The default {@link #iconCls} applied when calling {@link #showBusy}.
     * It can be overridden at any time by passing the `iconCls` argument into {@link #showBusy}.
     */
    busyIconCls : 'x-status-busy',
    /**
     * @cfg {String} busyText
     * The default {@link #text} applied when calling {@link #showBusy}.
     * It can be overridden at any time by passing the `text` argument into {@link #showBusy}.
     */
    busyText : 'Loading...',
    /**
     * @cfg {Number} autoClear
     * The number of milliseconds to wait after setting the status via
     * {@link #setStatus} before automatically clearing the status text and icon.
     * Note that this only applies when passing the `clear` argument to {@link #setStatus}
     * since that is the only way to defer clearing the status.  This can
     * be overridden by specifying a different `wait` value in {@link #setStatus}.
     * Calls to {@link #clearStatus} always clear the status bar immediately and ignore this value.
     */
    autoClear : 5000,

    /**
     * @cfg {String} emptyText
     * The text string to use if no text has been set. If there are no other items in
     * the toolbar using an empty string (`''`) for this value would end up in the toolbar
     * height collapsing since the empty string will not maintain the toolbar height.
     * Use `''` if the toolbar should collapse in height vertically when no text is
     * specified and there are no other items in the toolbar.
     */
    emptyText : '&#160;',

    // private
    activeThreadId : 0,

    // private
    initComponent : function(){
        var right = this.statusAlign === 'right';

        this.callParent(arguments);
        this.currIconCls = this.iconCls || this.defaultIconCls;
        this.statusEl = Ext.create('Ext.toolbar.TextItem', {
            cls: 'x-status-text ' + (this.currIconCls || ''),
            text: this.text || this.defaultText || ''
        });

        if (right) {
            this.cls += ' x-status-right';
            this.add('->');
            this.add(this.statusEl);
        } else {
            this.insert(0, this.statusEl);
            this.insert(1, '->');
        }
    },

    /**
     * Sets the status {@link #text} and/or {@link #iconCls}. Also supports automatically clearing the
     * status that was set after a specified interval.
     *
     * Example usage:
     *
     *     // Simple call to update the text
     *     statusBar.setStatus('New status');
     *
     *     // Set the status and icon, auto-clearing with default options:
     *     statusBar.setStatus({
     *         text: 'New status',
     *         iconCls: 'x-status-custom',
     *         clear: true
     *     });
     *
     *     // Auto-clear with custom options:
     *     statusBar.setStatus({
     *         text: 'New status',
     *         iconCls: 'x-status-custom',
     *         clear: {
     *             wait: 8000,
     *             anim: false,
     *             useDefaults: false
     *         }
     *     });
     *
     * @param {Object/String} config A config object specifying what status to set, or a string assumed
     * to be the status text (and all other options are defaulted as explained below). A config
     * object containing any or all of the following properties can be passed:
     *
     * @param {String} config.text The status text to display.  If not specified, any current
     * status text will remain unchanged.
     *
     * @param {String} config.iconCls The CSS class used to customize the status icon (see
     * {@link #iconCls} for details). If not specified, any current iconCls will remain unchanged.
     *
     * @param {Boolean/Number/Object} config.clear Allows you to set an internal callback that will
     * automatically clear the status text and iconCls after a specified amount of time has passed. If clear is not
     * specified, the new status will not be auto-cleared and will stay until updated again or cleared using
     * {@link #clearStatus}. If `true` is passed, the status will be cleared using {@link #autoClear},
     * {@link #defaultText} and {@link #defaultIconCls} via a fade out animation. If a numeric value is passed,
     * it will be used as the callback interval (in milliseconds), overriding the {@link #autoClear} value.
     * All other options will be defaulted as with the boolean option.  To customize any other options,
     * you can pass an object in the format:
     * 
     * @param {Number} config.clear.wait The number of milliseconds to wait before clearing
     * (defaults to {@link #autoClear}).
     * @param {Boolean} config.clear.anim False to clear the status immediately once the callback
     * executes (defaults to true which fades the status out).
     * @param {Boolean} config.clear.useDefaults False to completely clear the status text and iconCls
     * (defaults to true which uses {@link #defaultText} and {@link #defaultIconCls}).
     *
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    setStatus : function(o) {
        var me = this;

        o = o || {};
        Ext.suspendLayouts();
        if (Ext.isString(o)) {
            o = {text:o};
        }
        if (o.text !== undefined) {
            me.setText(o.text);
        }
        if (o.iconCls !== undefined) {
            me.setIcon(o.iconCls);
        }

        if (o.clear) {
            var c = o.clear,
                wait = me.autoClear,
                defaults = {useDefaults: true, anim: true};

            if (Ext.isObject(c)) {
                c = Ext.applyIf(c, defaults);
                if (c.wait) {
                    wait = c.wait;
                }
            } else if (Ext.isNumber(c)) {
                wait = c;
                c = defaults;
            } else if (Ext.isBoolean(c)) {
                c = defaults;
            }

            c.threadId = this.activeThreadId;
            Ext.defer(me.clearStatus, wait, me, [c]);
        }
        Ext.resumeLayouts(true);
        return me;
    },

    /**
     * Clears the status {@link #text} and {@link #iconCls}. Also supports clearing via an optional fade out animation.
     *
     * @param {Object} [config] A config object containing any or all of the following properties.  If this
     * object is not specified the status will be cleared using the defaults below:
     * @param {Boolean} config.anim True to clear the status by fading out the status element (defaults
     * to false which clears immediately).
     * @param {Boolean} config.useDefaults True to reset the text and icon using {@link #defaultText} and
     * {@link #defaultIconCls} (defaults to false which sets the text to '' and removes any existing icon class).
     *
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    clearStatus : function(o) {
        o = o || {};

        var me = this,
            statusEl = me.statusEl;

        if (o.threadId && o.threadId !== me.activeThreadId) {
            // this means the current call was made internally, but a newer
            // thread has set a message since this call was deferred.  Since
            // we don't want to overwrite a newer message just ignore.
            return me;
        }

        var text = o.useDefaults ? me.defaultText : me.emptyText,
            iconCls = o.useDefaults ? (me.defaultIconCls ? me.defaultIconCls : '') : '';

        if (o.anim) {
            // animate the statusEl Ext.Element
            statusEl.el.puff({
                remove: false,
                useDisplay: true,
                callback: function() {
                    statusEl.el.show();
                    me.setStatus({
                        text: text,
                        iconCls: iconCls
                    });
                }
            });
        } else {
             me.setStatus({
                 text: text,
                 iconCls: iconCls
             });
        }
        return me;
    },

    /**
     * Convenience method for setting the status text directly.  For more flexible options see {@link #setStatus}.
     * @param {String} text (optional) The text to set (defaults to '')
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    setText : function(text) {
        var me = this;
        me.activeThreadId++;
        me.text = text || '';
        if (me.rendered) {
            me.statusEl.setText(me.text);
        }
        return me;
    },

    /**
     * Returns the current status text.
     * @return {String} The status text
     */
    getText : function(){
        return this.text;
    },

    /**
     * Convenience method for setting the status icon directly.  For more flexible options see {@link #setStatus}.
     * See {@link #iconCls} for complete details about customizing the icon.
     * @param {String} iconCls (optional) The icon class to set (defaults to '', and any current icon class is removed)
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    setIcon : function(cls) {
        var me = this;

        me.activeThreadId++;
        cls = cls || '';

        if (me.rendered) {
            if (me.currIconCls) {
                me.statusEl.removeCls(me.currIconCls);
                me.currIconCls = null;
            }
            if (cls.length > 0) {
                me.statusEl.addCls(cls);
                me.currIconCls = cls;
            }
        } else {
            me.currIconCls = cls;
        }
        return me;
    },

    /**
     * Convenience method for setting the status text and icon to special values that are pre-configured to indicate
     * a "busy" state, usually for loading or processing activities.
     *
     * @param {Object/String} config (optional) A config object in the same format supported by {@link #setStatus}, or a
     * string to use as the status text (in which case all other options for setStatus will be defaulted).  Use the
     * `text` and/or `iconCls` properties on the config to override the default {@link #busyText}
     * and {@link #busyIconCls} settings. If the config argument is not specified, {@link #busyText} and
     * {@link #busyIconCls} will be used in conjunction with all of the default options for {@link #setStatus}.
     * @return {Ext.ux.statusbar.StatusBar} this
     */
    showBusy : function(o){
        if (Ext.isString(o)) {
            o = { text: o };
        }
        o = Ext.applyIf(o || {}, {
            text: this.busyText,
            iconCls: this.busyIconCls
        });
        return this.setStatus(o);
    }
});
