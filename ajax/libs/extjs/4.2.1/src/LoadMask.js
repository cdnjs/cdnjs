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
 * A modal, floating Component which may be shown above a specified {@link Ext.Component Component} while loading data.
 * When shown, the configured owning Component will be covered with a modality mask, and the LoadMask's {@link #msg} will be
 * displayed centered, accompanied by a spinner image.
 *
 * If the {@link #store} config option is specified, the masking will be automatically shown and then hidden synchronized with
 * the Store's loading process.
 *
 * Because this is a floating Component, its z-index will be managed by the global {@link Ext.WindowManager ZIndexManager}
 * object, and upon show, it will place itsef at the top of the hierarchy.
 *
 * Example usage:
 *
 *     // Basic mask:
 *     var myMask = new Ext.LoadMask(myPanel, {msg:"Please wait..."});
 *     myMask.show();
 */
Ext.define('Ext.LoadMask', {

    extend: 'Ext.Component',

    alias: 'widget.loadmask',

    /* Begin Definitions */

    mixins: {
        floating: 'Ext.util.Floating',
        bindable: 'Ext.util.Bindable'
    },

    uses: ['Ext.data.StoreManager'],

    /* End Definitions */
    
    /**
     * @cfg {Ext.Component} target The Component you wish to mask. The the mask will be automatically sized
     * upon Component resize, and the message box will be kept centered.
     */

    /**
     * @cfg {Ext.data.Store} store
     * Optional Store to which the mask is bound. The mask is displayed when a load request is issued, and
     * hidden on either load success, or load fail.
     */

    //<locale>
    /**
     * @cfg {String} [msg="Loading..."]
     * The text to display in a centered loading message box.
     */
    msg : 'Loading...',
    //</locale>

    /**
     * @cfg {String} [msgCls="x-mask-loading"]
     * The CSS class to apply to the loading message element.
     */
    msgCls : Ext.baseCSSPrefix + 'mask-loading',

    /**
     * @cfg {String} [maskCls="x-mask"]
     * The CSS class to apply to the mask element
     */
    maskCls: Ext.baseCSSPrefix + 'mask',

    /**
     * @cfg {Boolean} [useMsg=true]
     * Whether or not to use a loading message class or simply mask the bound element.
     */
    useMsg: true,

    /**
     * @cfg {Boolean} [useTargetEl=false]
     * True to mask the {@link Ext.Component#getTargetEl targetEl} of the bound Component. By default,
     * the {@link Ext.Component#getEl el} will be masked.
     */
    useTargetEl: false,

    baseCls: Ext.baseCSSPrefix + 'mask-msg',

    childEls: [
        'msgEl',
        'msgTextEl'
    ],

    renderTpl: [
        '<div id="{id}-msgEl" class="{[values.$comp.msgCls]} ',
            Ext.baseCSSPrefix, 'mask-msg-inner{childElCls}">',
            '<div id="{id}-msgTextEl" class="', Ext.baseCSSPrefix ,'mask-msg-text',
                '{childElCls}"></div>',
        '</div>'
    ],

    // @private Obviously, it's floating.
    floating: {
        shadow: 'frame'
    },

    // @private Masks are not focusable
    focusOnToFront: false,

    // When we put the load mask to the front of it's owner, we generally don't want to also bring the owning
    // component to the front.
    bringParentToFront: false,

    /**
     * Creates new LoadMask.
     * @param {Object} [config] The config object.
     */
    constructor : function(config) {
        var me = this,
            comp;

        if (arguments.length === 2) {
            //<debug>
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.LoadMask: LoadMask now uses a standard 1 arg constructor: use the target config');
            }
            //</debug>
            comp = config;
            config = arguments[1];
        } else {
            comp = config.target;
        }

        // Element support to be deprecated
        if (!comp.isComponent) {
            //<debug>
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.LoadMask: LoadMask for elements has been deprecated, use Ext.dom.Element.mask & Ext.dom.Element.unmask');
            }
            //</debug>
            comp = Ext.get(comp);
            this.isElement = true;
        }

        me.ownerCt = comp;
        if (!this.isElement) {
            me.bindComponent(comp);
        }
        me.callParent([config]);

        if (me.store) {
            me.bindStore(me.store, true);
        }
    },

    bindComponent: function(comp) {
        var me = this,
            listeners = {
                scope: this,
                resize: me.sizeMask,
                added: me.onComponentAdded,
                removed: me.onComponentRemoved
            };
            
        if (comp.floating) {
            listeners.move = me.sizeMask;
            me.activeOwner = comp;
        } else if (comp.ownerCt) {
            me.onComponentAdded(comp.ownerCt);
        } else {
            // if the target comp is non-floating and under a floating comp don't bring the load mask to the front of the stack
            me.preventBringToFront = true;
        }

        me.mon(comp, listeners);
        
        // subscribe to the observer that manages the hierarchy
        me.mon(me.hierarchyEventSource, {
            show: me.onContainerShow,
            hide: me.onContainerHide,
            expand: me.onContainerExpand,
            collapse: me.onContainerCollapse,
            scope: me
        });
    },

    onComponentAdded: function(owner) {
        var me = this;
        delete me.activeOwner;
        me.floatParent = owner;
        if (!owner.floating) {
            owner = owner.up('[floating]');
        }
        if (owner) {
            me.activeOwner = owner;
            me.mon(owner, 'move', me.sizeMask, me);
        } else {
            me.preventBringToFront = true;
        }
        owner = me.floatParent.ownerCt;
        if (me.rendered && me.isVisible() && owner) {
            me.floatOwner = owner;
            me.mon(owner, 'afterlayout', me.sizeMask, me, {single: true});
        }
    },

    onComponentRemoved: function(owner) {
        var me = this,
            activeOwner = me.activeOwner,
            floatOwner = me.floatOwner;

        if (activeOwner) {
            me.mun(activeOwner, 'move', me.sizeMask, me);
        }
        if (floatOwner) {
            me.mun(floatOwner, 'afterlayout', me.sizeMask, me);
        }
        delete me.activeOwner;
        delete me.floatOwner;
    },

    afterRender: function() {
        this.callParent(arguments);
            this.container = this.floatParent.getContentTarget();
    },

    onContainerShow: function(container) {
        if (this.isActiveContainer(container)) {
            this.onComponentShow();
        }
    },

    onContainerHide: function(container) {
        if (this.isActiveContainer(container)) {
            this.onComponentHide();
        }
    },

    onContainerExpand: function(container) {
        if (this.isActiveContainer(container)) {
            this.onComponentShow();
        }
    },

    onContainerCollapse: function(container) {
        if (this.isActiveContainer(container)) {
            this.onComponentHide();
        }
    },

    isActiveContainer: function(container) {
        return this.isDescendantOf(container);
    },

    onComponentHide: function() {
        var me = this;

        if (me.rendered && me.isVisible()) {
            me.hide();
            me.showNext = true;
        }
    },

    onComponentShow: function() {
        if (this.showNext) {
            this.show();
        }
        delete this.showNext;
    },

    /**
     * @private
     * Called when this LoadMask's Component is resized. The toFront method rebases and resizes the modal mask.
     */
    sizeMask: function() {
        var me = this,
            target;

        if (me.rendered && me.isVisible()) {
            me.center();

            target = me.getMaskTarget();
            me.getMaskEl().show().setSize(target.getSize()).alignTo(target, 'tl-tl');

        }
    },

    /**
     * Changes the data store bound to this LoadMask.
     * @param {Ext.data.Store} store The store to bind to this LoadMask
     */
    bindStore : function(store, initial) {
        var me = this;
        me.mixins.bindable.bindStore.apply(me, arguments);
        store = me.store;
        if (store && store.isLoading()) {
            me.onBeforeLoad();
        }
    },

    getStoreListeners: function(store) {
        var load = this.onLoad,
            beforeLoad = this.onBeforeLoad,
            result = {
                // Fired when a range is requested for rendering that is not in the cache
                cachemiss: beforeLoad,

                // Fired when a range for rendering which was previously missing from the cache is loaded
                cachefilled: load
            };

        // Only need to mask on load if the proxy is asynchronous - ie: Ajax/JsonP
        if (!store.proxy.isSynchronous) {
            result.beforeLoad = beforeLoad;
            result.load = load;
        }
        return result;
    },

    onDisable : function() {
        this.callParent(arguments);
        if (this.loading) {
            this.onLoad();
        }
    },

    getOwner: function() {
        return this.ownerCt || this.floatParent;
    },

    getMaskTarget: function() {
        var owner = this.getOwner();
        return this.useTargetEl ? owner.getTargetEl() : owner.getEl();
    },

    // @private
    onBeforeLoad : function() {
        var me = this,
            owner = me.getOwner(),
            origin;

        if (!me.disabled) {
            me.loading = true;
            // If the owning Component has not been layed out, defer so that the ZIndexManager
            // gets to read its layed out size when sizing the modal mask
            if (owner.componentLayoutCounter) {
                me.maybeShow();
            } else {
                // The code below is a 'run-once' interceptor.
                origin = owner.afterComponentLayout;
                owner.afterComponentLayout = function() {
                    owner.afterComponentLayout = origin;
                    origin.apply(owner, arguments);
                    me.maybeShow();
                };
            }
        }
    },

    maybeShow: function() {
        var me = this,
            owner = me.getOwner();

        if (!owner.isVisible(true)) {
            me.showNext = true;
        }
        else if (me.loading && owner.rendered) {
            me.show();
        }
    },

    getMaskEl: function(){
        var me = this;
        return me.maskEl || (me.maskEl = me.el.insertSibling({
            cls: me.maskCls,
            style: {
                zIndex: me.el.getStyle('zIndex') - 2
            }
        }, 'before'));
    },

    onShow: function() {
        var me = this,
            msgEl = me.msgEl;

        me.callParent(arguments);
        me.loading = true;

        if (me.useMsg) {
            msgEl.show();
            me.msgTextEl.update(me.msg);
        } else {
            msgEl.parent().hide();
        }
    },

    hide: function() {
        // Element support to be deprecated
        if (this.isElement) {
            this.ownerCt.unmask();
            this.fireEvent('hide', this);
            return;
        }
        delete this.showNext;
        return this.callParent(arguments);
    },

    onHide: function() {
        this.callParent();
        this.getMaskEl().hide();
    },

    show: function() {
        // Element support to be deprecated
        if (this.isElement) {
            this.ownerCt.mask(this.useMsg ? this.msg : '', this.msgCls);
            this.fireEvent('show', this);
            return;
        }
        return this.callParent(arguments);
    },

    afterShow: function() {
        this.callParent(arguments);
        this.sizeMask();
    },

    setZIndex: function(index) {
        var me = this,
            owner = me.activeOwner;
            
        if (owner) {
            // it seems silly to add 1 to have it subtracted in the call below,
            // but this allows the x-mask el to have the correct z-index (same as the component)
            // so instead of directly changing the zIndexStack just get the z-index of the owner comp
            index = parseInt(owner.el.getStyle('zIndex'), 10) + 1;
        }

        me.getMaskEl().setStyle('zIndex', index - 1);
        return me.mixins.floating.setZIndex.apply(me, arguments);
    },

    // @private
    onLoad : function() {
        this.loading = false;
        this.hide();
    },

    onDestroy: function() {
        var me = this;

        if (me.isElement) {
            me.ownerCt.unmask();
        }

        Ext.destroy(me.maskEl);
        me.callParent();
    }
});
