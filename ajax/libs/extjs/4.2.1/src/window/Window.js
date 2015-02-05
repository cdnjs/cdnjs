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
 * A specialized panel intended for use as an application window. Windows are floated, {@link #resizable}, and
 * {@link #cfg-draggable} by default. Windows can be {@link #maximizable maximized} to fill the viewport, restored to
 * their prior size, and can be {@link #method-minimize}d.
 *
 * Windows can also be linked to a {@link Ext.ZIndexManager} or managed by the {@link Ext.WindowManager} to provide
 * grouping, activation, to front, to back and other application-specific behavior.
 *
 * By default, Windows will be rendered to document.body. To {@link #constrain} a Window to another element specify
 * {@link Ext.Component#renderTo renderTo}.
 *
 * **As with all {@link Ext.container.Container Container}s, it is important to consider how you want the Window to size
 * and arrange any child Components. Choose an appropriate {@link #layout} configuration which lays out child Components
 * in the required manner.**
 *
 *     @example
 *     Ext.create('Ext.window.Window', {
 *         title: 'Hello',
 *         height: 200,
 *         width: 400,
 *         layout: 'fit',
 *         items: {  // Let's put an empty grid in just to illustrate fit layout
 *             xtype: 'grid',
 *             border: false,
 *             columns: [{header: 'World'}],                 // One header just for show. There's no data,
 *             store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
 *         }
 *     }).show();
 */
Ext.define('Ext.window.Window', {
    extend: 'Ext.panel.Panel',

    alternateClassName: 'Ext.Window',

    requires: ['Ext.util.ComponentDragger', 'Ext.util.Region', 'Ext.EventManager'],

    alias: 'widget.window',

    /**
     * @cfg {Number} x
     * The X position of the left edge of the window on initial showing. Defaults to centering the Window within the
     * width of the Window's container {@link Ext.Element Element} (The Element that the Window is rendered to).
     */

    /**
     * @cfg {Number} y
     * The Y position of the top edge of the window on initial showing. Defaults to centering the Window within the
     * height of the Window's container {@link Ext.Element Element} (The Element that the Window is rendered to).
     */

    /**
     * @cfg {Boolean} [modal=false]
     * True to make the window modal and mask everything behind it when displayed, false to display it without
     * restricting access to other UI elements.
     */

    /**
     * @cfg {String/Ext.Element} [animateTarget=null]
     * Id or element from which the window should animate while opening.
     */

    /**
     * @cfg {Boolean/Function} ghost
     * Set to false to disable the ghost panel during dragging the window.
     * Do note that you should not set this to true, by default it is a function.
     */

    /**
     * @cfg {String/Number/Ext.Component} defaultFocus
     * Specifies a Component to receive focus when this Window is focused.
     *
     * This may be one of:
     *
     *   - The index of a footer Button.
     *   - The id or {@link Ext.AbstractComponent#itemId} of a descendant Component.
     *   - A Component.
     */

    /**
     * @cfg {Function} onEsc
     * Allows override of the built-in processing for the escape key. Default action is to close the Window (performing
     * whatever action is specified in {@link #closeAction}. To prevent the Window closing when the escape key is
     * pressed, specify this as {@link Ext#emptyFn Ext.emptyFn}.
     */

    /**
     * @cfg {Boolean} [collapsed=false]
     * True to render the window collapsed, false to render it expanded. Note that if {@link #expandOnShow}
     * is true (the default) it will override the `collapsed` config and the window will always be
     * expanded when shown.
     */

    /**
     * @cfg {Boolean} [maximized=false]
     * True to initially display the window in a maximized state.
     */
    
    /**
     * @cfg {Boolean} [hideShadowOnDeactivate=false]
     * True to hide this Window's shadow when another floating item in the same z-index stack is activated.
     */

    /**
    * @cfg {String} [baseCls='x-window']
    * The base CSS class to apply to this panel's element.
    */
    baseCls: Ext.baseCSSPrefix + 'window',

    /**
     * @cfg {Boolean/Object} resizable
     * Specify as `true` to allow user resizing at each edge and corner of the window, false to disable resizing.
     *
     * This may also be specified as a config object to Ext.resizer.Resizer
     */
    resizable: true,

    /**
     * @cfg {Boolean} draggable
     * True to allow the window to be dragged by the header bar, false to disable dragging. Note that
     * by default the window will be centered in the viewport, so if dragging is disabled the window may need to be
     * positioned programmatically after render (e.g., `myWindow.setPosition(100, 100);`).
     */
    draggable: true,

    /**
     * @override
     * @cfg {Boolean} constrain
     * True to constrain the window within its containing element, false to allow it to fall outside of its containing
     * element. By default the window will be rendered to `document.body`. To render and constrain the window within
     * another element specify {@link #renderTo}. Optionally the header only can be constrained
     * using {@link #constrainHeader}.
     */
    constrain: false,

    /**
     * @override
     * @cfg {Boolean} constrainHeader
     * True to constrain the window header within its containing element (allowing the window body to fall outside of
     * its containing element) or false to allow the header to fall outside its containing element.
     * Optionally the entire window can be constrained using {@link #constrain}.
     */
    constrainHeader: false,

    /**
     * @cfg simpleDrag @hide
     */

    /**
     * @cfg {Boolean} plain
     * True to render the window body with a transparent background so that it will blend into the framing elements,
     * false to add a lighter background color to visually highlight the body element and separate it more distinctly
     * from the surrounding frame.
     */
    plain: false,

    /**
     * @cfg {Boolean} minimizable
     * True to display the 'minimize' tool button and allow the user to minimize the window, false to hide the button
     * and disallow minimizing the window. Note that this button provides no implementation -- the
     * behavior of minimizing a window is implementation-specific, so the minimize event must be handled and a custom
     * minimize behavior implemented for this option to be useful.
     */
    minimizable: false,

    /**
     * @cfg {Boolean} maximizable
     * True to display the 'maximize' tool button and allow the user to maximize the window, false to hide the button
     * and disallow maximizing the window. Note that when a window is maximized, the tool button
     * will automatically change to a 'restore' button with the appropriate behavior already built-in that will restore
     * the window to its previous size.
     */
    maximizable: false,

    // inherit docs
    minHeight: 50,

    // inherit docs
    minWidth: 50,

    /**
     * @cfg {Boolean} expandOnShow
     * True to always expand the window when it is displayed, false to keep it in its current state (which may be
     * {@link #collapsed}) when displayed.
     */
    expandOnShow: true,

    // inherited docs, same default
    collapsible: false,

    /**
     * @cfg {Boolean} closable
     * True to display the 'close' tool button and allow the user to close the window, false to hide the button and
     * disallow closing the window.
     *
     * By default, when close is requested by either clicking the close button in the header or pressing ESC when the
     * Window has focus, the {@link #method-close} method will be called. This will _{@link Ext.Component#method-destroy destroy}_ the
     * Window and its content meaning that it may not be reused.
     *
     * To make closing a Window _hide_ the Window so that it may be reused, set {@link #closeAction} to 'hide'.
     */
    closable: true,

    /**
     * @cfg {Boolean} hidden
     * Render this Window hidden. If `true`, the {@link #method-hide} method will be called internally.
     */
    hidden: true,

    /**
     * @cfg {Boolean}
     * @inheritdoc
     * Windows render to the body on first show.
     */
    autoRender: true,

    /**
     * @cfg {String}
     * @inheritdoc
     * Windows hide using offsets in order to preserve the scroll positions of their descendants.
     */
    hideMode: 'offsets',

    /**
     * @property {Boolean}
     * A Window is always floating.
     * @private
     * @readonly
     */
    floating: true,

    itemCls: Ext.baseCSSPrefix + 'window-item',
    
    initialAlphaNum: /^[a-z0-9]/,

    overlapHeader: true,

    ignoreHeaderBorderManagement: true,

    // Flag to Renderable to always look up the framing styles for this Component
    alwaysFramed: true,
    
    // Buffer this so we don't recreate the same object
    isRootCfg: {
        isRoot: true    
    },

    /**
     * @property {Boolean} isWindow
     * `true` in this class to identify an object as an instantiated Window, or subclass thereof.
     */
    isWindow: true,

    // @private
    initComponent: function() {
        var me = this;
        // Explicitly set frame to false, since alwaysFramed is
        // true, we only want to lookup framing in a specific instance
        me.frame = false;
        me.callParent();
        me.addEvents(
            /**
             * @event activate
             * Fires after the window has been visually activated via {@link #setActive}.
             * @param {Ext.window.Window} this
             */

            /**
             * @event deactivate
             * Fires after the window has been visually deactivated via {@link #setActive}.
             * @param {Ext.window.Window} this
             */

            /**
             * @event resize
             * Fires after the window has been resized.
             * @param {Ext.window.Window} this
             * @param {Number} width The window's new width
             * @param {Number} height The window's new height
             */
            'resize',

            /**
             * @event maximize
             * Fires after the window has been maximized.
             * @param {Ext.window.Window} this
             */
            'maximize',

            /**
             * @event minimize
             * Fires after the window has been minimized.
             * @param {Ext.window.Window} this
             */
            'minimize',

            /**
             * @event restore
             * Fires after the window has been restored to its original size after being maximized.
             * @param {Ext.window.Window} this
             */
            'restore'
        );

        if (me.plain) {
            me.addClsWithUI('plain');
        }

        if (me.modal) {
            me.ariaRole = 'dialog';
        }

        me.addStateEvents(['maximize', 'restore', 'resize', 'dragend']);
    },

    getElConfig: function () {
        var me = this,
            elConfig;

        elConfig = me.callParent();
        elConfig.tabIndex = -1;
        return elConfig;
    },

    // State Management
    
    // @private
    getState: function() {
        var me = this,
            state = me.callParent() || {},
            maximized = !!me.maximized,
            ghostBox = me.ghostBox,
            pos;

        
        state.maximized = maximized;
        if (maximized) {
            pos = me.restorePos;
        } else if (ghostBox) {
            // If we're animating a show, it will be from offscreen, so
            // grab the position from the final box
            pos = [ghostBox.x, ghostBox.y];
        } else {
            pos = me.getPosition();
        }
        Ext.apply(state, {
            size: maximized ? me.restoreSize : me.getSize(),
            pos: pos
        });
        return state;
    },

    applyState: function(state){
        var me = this;

        if (state) {
            me.maximized = state.maximized;
            if (me.maximized) {
                me.hasSavedRestore = true;
                me.restoreSize = state.size;
                me.restorePos = state.pos;
            } else {
                Ext.apply(me, {
                    width: state.size.width,
                    height: state.size.height,
                    x: state.pos[0],
                    y: state.pos[1]
                });
            }
        }
    },

    // @private
    onRender: function(ct, position) {
        var me = this;
        me.callParent(arguments);
        me.focusEl = me.el;

        // Double clicking a header will toggleMaximize
        if (me.maximizable) {
            me.header.on({
                scope: me,
                dblclick: me.toggleMaximize
            });
        }
    },

    // @private
    afterRender: function() {
        var me = this,
            header = me.header,
            keyMap;

        me.callParent();

        // Initialize
        if (me.maximized) {
            me.maximized = false;
            me.maximize();
            if (header) {
                header.removeCls(header.indicateDragCls)
            }
        }

        if (me.closable) {
            keyMap = me.getKeyMap();
            keyMap.on(27, me.onEsc, me);
        } else {
            keyMap = me.keyMap;
        }
        if (keyMap && me.hidden) {
            keyMap.disable();
        }
    },

    // Override. Windows are always simple draggable, they do not use Ext.Panel.DDs
    // The dd property in a Window is always a ComponentDragger
    initDraggable: function() {
        /**
         * @property {Ext.util.ComponentDragger} dd
         * If this Window is configured {@link #cfg-draggable}, this property will contain an instance of
         * {@link Ext.util.ComponentDragger} (A subclass of {@link Ext.dd.DragTracker DragTracker}) which handles dragging
         * the Window's DOM Element, and constraining according to the {@link #constrain} and {@link #constrainHeader} .
         *
         * This has implementations of `onBeforeStart`, `onDrag` and `onEnd` which perform the dragging action. If
         * extra logic is needed at these points, use {@link Ext.Function#createInterceptor createInterceptor} or
         * {@link Ext.Function#createSequence createSequence} to augment the existing implementations.
         */
        this.initSimpleDraggable();
    },

    initResizable: function(){
        this.callParent(arguments);
        if (this.maximized) {
            this.resizer.disable();
        }
    },

    // @private
    onEsc: function(k, e) {
        // Only process ESC if the FocusManager is not doing it
        if (!Ext.FocusManager || !Ext.FocusManager.enabled || Ext.FocusManager.focusedCmp === this) {
            e.stopEvent();
            this.close();
        }
    },

    // @private
    beforeDestroy: function() {
        var me = this;
        if (me.rendered) {
            delete this.animateTarget;
            me.hide();
            Ext.destroy(
                me.keyMap
            );
        }
        me.callParent();
    },

    /**
     * @private
     * Contribute class-specific tools to the header.
     * Called by Panel's initTools.
     */
    addTools: function() {
        var me = this;

        // Call Panel's initTools
        me.callParent();

        if (me.minimizable) {
            me.addTool({
                type: 'minimize',
                handler: Ext.Function.bind(me.minimize, me, [])
            });
        }
        if (me.maximizable) {
            me.addTool({
                type: 'maximize',
                handler: Ext.Function.bind(me.maximize, me, [])
            });
            me.addTool({
                type: 'restore',
                handler: Ext.Function.bind(me.restore, me, []),
                hidden: true
            });
        }
    },

    /**
     * @private
     * Returns the focus holder element associated with this Window. By default, this is the Window's element.
     * @returns {Ext.Element/Ext.Component} the focus holding element or Component.
     */
    getFocusEl: function() {
        return this.getDefaultFocus();
    },

    /**
     * Gets the configured default focus item.  If a {@link #defaultFocus} is set, it will
     * receive focus when the Window's <code>focus</code> method is called, otherwise the
     * Window itself will receive focus.
     */
    getDefaultFocus: function() {
        var me = this,
            result,
            defaultComp = me.defaultButton || me.defaultFocus,
            selector;

        if (defaultComp !== undefined) {
            // Number is index of Button
            if (Ext.isNumber(defaultComp)) {
                result = me.query('button')[defaultComp];
            }
            // String is ID or CQ selector
            else if (Ext.isString(defaultComp)) {
                selector = defaultComp;
                
                // Try id/itemId match if selector begins with alphanumeric
                if (selector.match(me.initialAlphaNum)) {
                    result = me.down('#' + selector);
                }
                // If not found, use as selector
                if (!result) {
                    result = me.down(selector);
                }
            }
            // Otherwise, if it's got a focus method, use it
            else if (defaultComp.focus) {
                result = defaultComp;
            }
        }
        return result || me.el;
    },

    /**
     * @private
     * Called when a Component's focusEl receives focus.
     * If there is a valid default focus Component to jump to, focus that,
     * otherwise continue as usual, focus this Component.
     */
    onFocus: function() {
        var me = this,
            focusDescendant;

        // If the FocusManager is enabled, then we must noy jumpt to focus the default focus. We must focus the Window
        if ((Ext.FocusManager && Ext.FocusManager.enabled) || ((focusDescendant = me.getDefaultFocus()) === me)) {
            me.callParent(arguments);
        } else {
            focusDescendant.focus();
        }
    },

    onShow: function() {
        var me = this;

        me.callParent(arguments);
        if (me.expandOnShow) {
            me.expand(false);
        }
        me.syncMonitorWindowResize();

        if (me.keyMap) {
            me.keyMap.enable();
        }
   },

    // @private
    doClose: function() {
        var me = this;

        // Being called as callback after going through the hide call below
        if (me.hidden) {
            me.fireEvent('close', me);
            if (me.closeAction == 'destroy') {
                this.destroy();
            }
        } else {
            // close after hiding
            me.hide(me.animateTarget, me.doClose, me);
        }
    },

    // @private
    afterHide: function() {
        var me = this;

        // No longer subscribe to resizing now that we're hidden
        me.syncMonitorWindowResize();

        // Turn off keyboard handling once window is hidden
        if (me.keyMap) {
            me.keyMap.disable();
        }

        // Perform superclass's afterHide tasks.
        me.callParent(arguments);
    },

    // @private
    onWindowResize: function() {
        var me = this,
            sizeModel;

        if (me.maximized) {
            me.fitContainer();
        } else {
            sizeModel = me.getSizeModel();
            if (sizeModel.width.natural || sizeModel.height.natural) {
                me.updateLayout();
            }
            me.doConstrain();
        }

    },

    /**
     * Placeholder method for minimizing the window. By default, this method simply fires the {@link #event-minimize} event
     * since the behavior of minimizing a window is application-specific. To implement custom minimize behavior, either
     * the minimize event can be handled or this method can be overridden.
     * @return {Ext.window.Window} this
     */
    minimize: function() {
        this.fireEvent('minimize', this);
        return this;
    },
    
    resumeHeaderLayout: function(changed) {
        this.header.resumeLayouts(changed ? this.isRootCfg : null);    
    },

    afterCollapse: function() {
        var me = this,
            header = me.header,
            tools = me.tools;

        if (header && me.maximizable) {
            header.suspendLayouts();
            tools.maximize.hide();
            tools.restore.hide();
            this.resumeHeaderLayout(true);
        }
        if (me.resizer) {
            me.resizer.disable();
        }
        me.callParent(arguments);
    },

    afterExpand: function() {
        var me = this,
            header = me.header,
            tools = me.tools,
            changed;

        
        if (header) {
            header.suspendLayouts();
            if (me.maximized) {
                tools.restore.show();
                changed = true;
            } else if (me.maximizable) {
                tools.maximize.show();
                changed = true;
            }
            this.resumeHeaderLayout(changed);
        }
        if (me.resizer) {
            me.resizer.enable();
        }
        me.callParent(arguments);
    },

    /**
     * Fits the window within its current container and automatically replaces the {@link #maximizable 'maximize' tool
     * button} with the 'restore' tool button. Also see {@link #toggleMaximize}.
     * @param {Boolean} animate `true` to animate this Window to full size.
     * @return {Ext.window.Window} this
     */
    maximize: function(animate) {
        var me = this,
            header = me.header,
            tools = me.tools,
            changed;

        if (!me.maximized) {
            me.expand(false);
            if (!me.hasSavedRestore) {
                me.restoreSize = me.getSize();
                me.restorePos = me.getPosition(true);
            }

            // Manipulate visibility of header tools if there is a header
            if (header) {
                header.suspendLayouts();
                if (tools.maximize) {
                    tools.maximize.hide();
                    changed = true;
                }
                if (tools.restore) {
                    tools.restore.show();
                    changed = true;
                }
                if (me.collapseTool) {
                    me.collapseTool.hide();
                    changed = true;
                }
                me.resumeHeaderLayout(changed);
            }

            me.maximized = true;
            me.el.disableShadow();

            if (me.dd) {
                me.dd.disable();
                if (header) {
                   header.removeCls(header.indicateDragCls)
                }
            }
            if (me.resizer) {
                me.resizer.disable();
            }
            
            me.el.addCls(Ext.baseCSSPrefix + 'window-maximized');
            me.container.addCls(Ext.baseCSSPrefix + 'window-maximized-ct');

            me.syncMonitorWindowResize();
            me.fitContainer(animate = (animate || !!me.animateTarget) ? {
                callback: function() {
                    me.fireEvent('maximize', me);
                }
            } : null);
            if (!animate) {
                me.fireEvent('maximize', me);
            }
        }
        return me;
    },

    /**
     * Restores a {@link #maximizable maximized} window back to its original size and position prior to being maximized
     * and also replaces the 'restore' tool button with the 'maximize' tool button. Also see {@link #toggleMaximize}.
     * @return {Ext.window.Window} this
     */
    restore: function(animate) {
        var me = this,
            tools = me.tools,
            header = me.header,
            newBox = me.restoreSize,
            changed;

        if (me.maximized) {
            me.hasSavedRestore = null;
            me.removeCls(Ext.baseCSSPrefix + 'window-maximized');

            // Manipulate visibility of header tools if there is a header
            if (header) {
                header.suspendLayouts();
                if (tools.restore) {
                    tools.restore.hide();
                    changed = true;
                }
                if (tools.maximize) {
                    tools.maximize.show();
                    changed = true;
                }
                if (me.collapseTool) {
                    me.collapseTool.show();
                    changed = true;
                }
                me.resumeHeaderLayout(changed);
            }

            me.maximized = false;

            // Restore the position/sizing
            newBox.x = me.restorePos[0];
            newBox.y = me.restorePos[1];
            me.setBox(newBox, animate = (animate || !!me.animateTarget) ? {
                callback: function() {
                    me.el.enableShadow(true);
                    me.fireEvent('restore', me);
                }
            } : null);

            // Unset old position/sizing
            me.restorePos = me.restoreSize = null;

            // Allow users to drag and drop again
            if (me.dd) {
                me.dd.enable();
                if (header) {
                    header.addCls(header.indicateDragCls)
                }
            }
            
            if (me.resizer) {
                me.resizer.enable();
            }

            me.container.removeCls(Ext.baseCSSPrefix + 'window-maximized-ct');

            me.syncMonitorWindowResize();

            if (!animate) {
                me.el.enableShadow(true);
                me.fireEvent('restore', me);
            }
        }
        return me;
    },

    /**
     * Synchronizes the presence of our listener for window resize events. This method
     * should be called whenever this status might change.
     * @private
     */
    syncMonitorWindowResize: function () {
        var me = this,
            currentlyMonitoring = me._monitoringResize,
            // all the states where we should be listening to window resize:
            yes = me.monitorResize || me.constrain || me.constrainHeader || me.maximized,
            // all the states where we veto this:
            veto = me.hidden || me.destroying || me.isDestroyed;

        if (yes && !veto) {
            // we should be listening...
            if (!currentlyMonitoring) {
                // but we aren't, so set it up.
                // Delay so that we jump over any Viewport resize activity
                Ext.EventManager.onWindowResize(me.onWindowResize, me, {delay: 1});
                me._monitoringResize = true;
            }
        } else if (currentlyMonitoring) {
            // we should not be listening, but we are, so tear it down
            Ext.EventManager.removeResizeListener(me.onWindowResize, me);
            me._monitoringResize = false;
        }
    },

    /**
     * A shortcut method for toggling between {@link #method-maximize} and {@link #method-restore} based on the current maximized
     * state of the window.
     * @return {Ext.window.Window} this
     */
    toggleMaximize: function() {
        return this[this.maximized ? 'restore': 'maximize']();
    }

});
