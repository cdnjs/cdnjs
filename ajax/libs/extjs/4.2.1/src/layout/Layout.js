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
 * This class is the base for all layout types: component and container.
 * @protected
 */
Ext.define('Ext.layout.Layout', {
    requires: [
        'Ext.XTemplate',
        'Ext.layout.SizeModel'
    ],

    uses: [ 'Ext.layout.Context' ],

    /**
     * @property {Boolean} isLayout
     * `true` in this class to identify an object as an instantiated Layout, or subclass thereof.
     * @readonly
     */
    isLayout: true,
    initialized: false,
    running: false,

    autoSizePolicy: {
        readsWidth: 1,
        readsHeight: 1,
        setsWidth: 0,
        setsHeight: 0
    },

    statics: {
        layoutsByType: {},

        create: function(layout, defaultType) {
            var ClassManager = Ext.ClassManager,
                layoutsByType = this.layoutsByType,
                alias, className, config, layoutClass, type, load;

            if (!layout || typeof layout === 'string') {
                type = layout || defaultType;
                config = {};                    
            } else if (layout.isLayout) {
                return layout;
            } else {
                config = layout;
                type = layout.type || defaultType;
            }

            if (!(layoutClass = layoutsByType[type])) {
                alias = 'layout.' + type;
                className = ClassManager.getNameByAlias(alias);

                // this is needed to support demand loading of the class
                if (!className) {
                    load = true;
                }
                
                layoutClass = ClassManager.get(className);
                if (load || !layoutClass) {
                    return ClassManager.instantiateByAlias(alias, config || {});
                }
                layoutsByType[type] = layoutClass;
            }

            return new layoutClass(config);
        }
    },

    constructor : function(config) {
        var me = this;

        me.id = Ext.id(null, me.type + '-');
        Ext.apply(me, config);
        me.layoutCount = 0;
    },

    /**
     * @property {Boolean} done Used only during a layout run, this value indicates that a
     * layout has finished its calculations. This flag is set to true prior to the call to
     * {@link #calculate} and should be set to false if this layout has more work to do.
     */

    /**
     * Called before any calculation cycles to prepare for layout.
     * 
     * This is a write phase and DOM reads should be strictly avoided when overridding
     * this method.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     * @method beginLayout
     */
    beginLayout: Ext.emptyFn,

    /**
     * Called before any calculation cycles to reset DOM values and prepare for calculation.
     * 
     * This is a write phase and DOM reads should be strictly avoided when overridding
     * this method.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     * @method beginLayoutCycle
     */
    beginLayoutCycle: function (ownerContext) {
        var me = this,
            context = me.context,
            changed;

        if (me.lastWidthModel != ownerContext.widthModel) {
            if (me.lastWidthModel) {
                changed = true;
            }
            me.lastWidthModel = ownerContext.widthModel;
        }

        if (me.lastHeightModel != ownerContext.heightModel) {
            if (me.lastWidthModel) {
                changed = true;
            }
            me.lastHeightModel = ownerContext.heightModel;
        }

        if (changed) {
            (context = ownerContext.context).clearTriggers(me, false);
            context.clearTriggers(me, true);
            me.triggerCount = 0;
        }
    },

    /**
     * Called to perform the calculations for this layout. This method will be called at
     * least once and may be called repeatedly if the {@link #done} property is cleared
     * before return to indicate that this layout is not yet done. The {@link #done} property
     * is always set to `true` before entering this method.
     * 
     * This is a read phase and DOM writes should be strictly avoided in derived classes.
     * Instead, DOM writes need to be written to {@link Ext.layout.ContextItem} objects to
     *  be flushed at the next opportunity.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     * @method calculate
     * @abstract
     */

    /**
     * This method (if implemented) is called at the end of the cycle in which this layout
     * completes (by not setting {@link #done} to `false` in {@link #calculate}). It is
     * possible for the layout to complete and yet become invalid before the end of the cycle,
     * in which case, this method will not be called. It is also possible for this method to
     * be called and then later the layout becomes invalidated. This will result in
     * {@link #calculate} being called again, followed by another call to this method.
     * 
     * This is a read phase and DOM writes should be strictly avoided in derived classes.
     * Instead, DOM writes need to be written to {@link Ext.layout.ContextItem} objects to
     * be flushed at the next opportunity.
     * 
     * This method need not be implemented by derived classes and, in fact, should only be
     * implemented when needed.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     * @method completeLayout
     */

    /**
     * This method (if implemented) is called after all layouts have completed. In most
     * ways this is similar to {@link #completeLayout}. This call can cause this (or any
     * layout) to be become invalid (see {@link Ext.layout.Context#invalidate}), but this
     * is best avoided. This method is intended to be where final reads are made and so it
     * is best to avoid invalidating layouts at this point whenever possible. Even so, this
     * method can be used to perform final checks that may require all other layouts to be
     * complete and then invalidate some results.
     * 
     * This is a read phase and DOM writes should be strictly avoided in derived classes.
     * Instead, DOM writes need to be written to {@link Ext.layout.ContextItem} objects to
     * be flushed at the next opportunity.
     * 
     * This method need not be implemented by derived classes and, in fact, should only be
     * implemented when needed.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     * @method finalizeLayout
     */

    /**
     * This method is called after all layouts are complete and their calculations flushed
     * to the DOM. No further layouts will be run and this method is only called once per
     * layout run. The base component layout caches `lastComponentSize`.
     * 
     * This is a write phase and DOM reads should be avoided if possible when overridding
     * this method.
     * 
     * This method need not be implemented by derived classes and, in fact, should only be
     * implemented when needed.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     */
    finishedLayout: function (ownerContext) {
        this.lastWidthModel = ownerContext.widthModel;
        this.lastHeightModel = ownerContext.heightModel;
        this.ownerContext = null;
    },
    
    /**
     * This method (if implemented) is called after all layouts are finished, and all have
     * a `lastComponentSize` cached. No further layouts will be run and this method is only
     * called once per layout run. It is the bookend to {@link #beginLayout}.
     * 
     * This is a write phase and DOM reads should be avoided if possible when overridding
     * this method. This is the catch-all tail method to a layout and so the rules are more
     * relaxed. Even so, for performance reasons, it is best to avoid reading the DOM. If
     * a read is necessary, consider implementing a {@link #finalizeLayout} method to do the
     * required reads.
     * 
     * This method need not be implemented by derived classes and, in fact, should only be
     * implemented when needed.
     * 
     * @param {Ext.layout.ContextItem} ownerContext The context item for the layout's owner
     * component.
     * @method notifyOwner
     */
    
    redoLayout: Ext.emptyFn,
    undoLayout: Ext.emptyFn,

    getAnimatePolicy: function() {
        return this.animatePolicy;
    },

    /**
     * Returns an object describing how this layout manages the size of the given component.
     * This method must be implemented by any layout that manages components.
     *
     * @param {Ext.Component} item
     * @return {Ext.layout.SizePolicy} An object describing the sizing done by the layout
     * for this item.
     * @protected
     */
    getItemSizePolicy: function (item) {
        return this.autoSizePolicy;
    },

    isItemBoxParent: function (itemContext) {
        return false;
    },

    isItemLayoutRoot: function (item) {
        var sizeModel = item.getSizeModel(),
            width = sizeModel.width,
            height = sizeModel.height;

        // If this component has never had a layout and some of its dimensions are set by
        // its ownerLayout, we cannot be the layoutRoot...
        if (!item.componentLayout.lastComponentSize && (width.calculated || height.calculated)) {
            return false;
        }

        // otherwise an ownerCt whose size is not effected by its content is a root
        return !width.shrinkWrap && !height.shrinkWrap;
    },

    isItemShrinkWrap: function (item) {
        return item.shrinkWrap;
    },

    isRunning: function () {
        return !!this.ownerContext;
    },

    //-----------------------------------------------------
    /*
     * Clears any styles which must be cleared before layout can take place.
     * Only DOM WRITES must be performed at this stage.
     *
     * An entry for the owner's element ID must be created in the layoutContext containing
     * a reference to the target which must be sized/positioned/styled by the layout at
     * the flush stage:
     *
     *     {
     *         target: me.owner
     *     }
     *
     * Component layouts should iterate through managed Elements,
     * pushing an entry for each element:
     *
     *     {
     *         target: childElement
     *     }
     */
    //-----------------------------------------------------

    getItemsRenderTree: function (items, renderCfgs) {
        var length = items.length,
            i, item, itemConfig, result;

        if (length) {
            result = [];
            for (i = 0; i < length; ++i) {
                item = items[i];

                // If we are being asked to move an already rendered Component, we must not recalculate its renderTree
                // and rerun its render process. The Layout's isValidParent check will ensure that the DOM is moved into place.
                if (!item.rendered) {

                    // If we've already calculated the item's element config, don't calculate it again.
                    // This may happen if the rendering process mutates the owning Container's items
                    // collection, and Ext.layout.Container#getRenderTree runs through the collection again.
                    // Note that the config may be null if a beforerender listener vetoed the operation, so
                    // we must compare to undefined.
                    if (renderCfgs && (renderCfgs[item.id] !== undefined)) {
                        itemConfig = renderCfgs[item.id];
                    } else {
                        // Perform layout preprocessing in the bulk render path
                        this.configureItem(item);
                        itemConfig = item.getRenderTree();
                        if (renderCfgs) {
                            renderCfgs[item.id] = itemConfig;
                        }
                    }

                    // itemConfig mey be null if a beforerender listener vetoed the operation.
                    if (itemConfig) {
                        result.push(itemConfig);
                    }
                }
            }
        }

        return result;
    },

    finishRender: Ext.emptyFn,

    finishRenderItems: function (target, items) {
        var length = items.length,
            i, item;

        for (i = 0; i < length; i++) {
            item = items[i];

            // Only postprocess items which are being rendered. deferredRender may mean that only one has been rendered.
            if (item.rendering) {

                // Tell the item at which index in the Container it is
                item.finishRender(i);

                this.afterRenderItem(item);
            }
        }
    },

    renderChildren: function () {
        var me = this,
            items = me.getLayoutItems(),
            target = me.getRenderTarget();

        me.renderItems(items, target);
    },

    /**
     * Iterates over all passed items, ensuring they are rendered.  If the items are already rendered,
     * also determines if the items are in the proper place in the dom.
     * @protected
     */
    renderItems : function(items, target) {
        var me = this,
            ln = items.length,
            i = 0,
            item;

        if (ln) {
            Ext.suspendLayouts();
            for (; i < ln; i++) {
                item = items[i];
                if (item && !item.rendered) {
                    me.renderItem(item, target, i);
                } else if (!me.isValidParent(item, target, i)) {
                    me.moveItem(item, target, i);
                } else {
                    // still need to configure the item, it may have moved in the container.
                    me.configureItem(item);
                }
            }
            Ext.resumeLayouts(true);
        }
    },

    /**
     * Validates item is in the proper place in the dom.
     * @protected
     */
    isValidParent : function(item, target, position) {
        var itemDom = item.el ? item.el.dom : Ext.getDom(item),
            targetDom = (target && target.dom) || target,
            parentNode = itemDom.parentNode,
            className;

        // If it's resizable+wrapped, the position element is the wrapper.
        if (parentNode) {
            className = parentNode.className;
            if (className && className.indexOf(Ext.baseCSSPrefix + 'resizable-wrap') !== -1) {
                itemDom = itemDom.parentNode;
            }
        }

        // Test DOM nodes for equality using "===" : http://jsperf.com/dom-equality-test
        if (itemDom && targetDom) {
            if (typeof position == 'number') {
                position = this.getPositionOffset(position);
                return itemDom === targetDom.childNodes[position];
            }
            return itemDom.parentNode === targetDom;
        }

        return false;
    },
    
    getPositionOffset: function(position){
        return position;
    },

    /**
     * Called before an item is rendered to allow the layout to configure the item.
     * @param {Ext.Component} item The item to be configured
     * @protected
     */
    configureItem: function(item) {
        item.ownerLayout = this;
    },

    /**
     * Renders the given Component into the target Element.
     * @param {Ext.Component} item The Component to render
     * @param {Ext.dom.Element} target The target Element
     * @param {Number} position The position within the target to render the item to
     * @private
     */
    renderItem : function(item, target, position) {
        var me = this;
        if (!item.rendered) {
            me.configureItem(item);
            item.render(target, position);
            me.afterRenderItem(item);
        }
    },

    /**
     * Moves Component to the provided target instead.
     * @private
     */
    moveItem : function(item, target, position) {
        target = target.dom || target;
        if (typeof position == 'number') {
            position = target.childNodes[position];
        }
        target.insertBefore(item.el.dom, position || null);
        item.container = Ext.get(target);
        this.configureItem(item);
    },

    /**
     * This method is called when a child item changes in some way. By default this calls
     * {@link Ext.AbstractComponent#updateLayout} on this layout's owner.
     * 
     * @param {Ext.Component} child The child item that has changed.
     * @return {Boolean} True if this layout has handled the content change.
     */
    onContentChange: function () {
        this.owner.updateLayout();
        return true;
    },

    /**
     * A one-time initialization method called just before rendering.
     * @protected
     */
    initLayout : function() {
        this.initialized = true;
    },

    // @private Sets the layout owner
    setOwner : function(owner) {
        this.owner = owner;
    },

    /**
     * Returns the set of items to layout (empty by default).
     * @protected
     */
    getLayoutItems : function() {
        return [];
    },

    onAdd: function (item) {
        item.ownerLayout = this;
    },
    afterRenderItem: Ext.emptyFn,
    onRemove : Ext.emptyFn,
    onDestroy : Ext.emptyFn,

    /**
     * Removes layout's itemCls and owning Container's itemCls.
     * Clears the managed dimensions flags
     * @protected
     */
    afterRemove : function(item) {
        var me = this,
            el = item.el,
            owner = me.owner,
            removeClasses;

        if (item.rendered) {
            removeClasses = [].concat(me.itemCls || []);
            if (owner.itemCls) {
                removeClasses = Ext.Array.push(removeClasses, owner.itemCls);
            }
            if (removeClasses.length) {
                el.removeCls(removeClasses);
            }
        }

        delete item.ownerLayout;
    },

    /**
     * Destroys this layout. This method removes a `targetCls` from the `target`
     * element and calls `onDestroy`.
     * 
     * A derived class can override either this method or `onDestroy` but in all
     * cases must call the base class versions of these methods to allow the base class to
     * perform its cleanup.
     * 
     * This method (or `onDestroy`) are overridden by subclasses most often to purge
     * event handlers or remove unmanged DOM nodes.
     *
     * @protected
     */
    destroy : function() {
        var me = this,
            target;

        if (me.targetCls) {
            target = me.getTarget();
            if (target) {
                target.removeCls(me.targetCls);
            }
        }

        me.onDestroy();
    },

    sortWeightedItems: function (items, reverseProp) {
        for (var i = 0, length = items.length; i < length; ++i) {
            items[i].$i = i;
        }

        Ext.Array.sort(items, function (item1, item2) {
            var ret = item2.weight - item1.weight;

            if (!ret) {
                ret = item1.$i - item2.$i;
                if (item1[reverseProp]) {
                    ret = -ret;
                }
            }

            return ret;
        });

        for (i = 0; i < length; ++i) {
            delete items[i].$i;
        }
    }
}, function () {
    var Layout = this;

    Layout.prototype.sizeModels = Layout.sizeModels = Ext.layout.SizeModel.sizeModels;
});
