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
 * This class is intended to be extended or created via the {@link Ext.container.Container#layout layout}
 * configuration property.  See {@link Ext.container.Container#layout} for additional details.
 */
Ext.define('Ext.layout.container.Container', {

    /* Begin Definitions */

    alias: ['layout.container'],

    extend: 'Ext.layout.Layout',

    alternateClassName: 'Ext.layout.ContainerLayout',

    mixins: {
        elementCt: 'Ext.util.ElementContainer'
    },

    requires: [
        'Ext.XTemplate'
    ],

    type: 'container',

    /* End Definitions */

    /**
     * @cfg {String} itemCls
     * An optional extra CSS class that will be added to the container. This can be useful for
     * adding customized styles to the container or any of its children using standard CSS
     * rules. See {@link Ext.Component}.{@link Ext.Component#componentCls componentCls} also.
     */

    /**
     * @private
     * Called by an owning Panel before the Panel begins its collapse process.
     * Most layouts will not need to override the default Ext.emptyFn implementation.
     */
    beginCollapse: Ext.emptyFn,

    /**
     * @private
     * Called by an owning Panel before the Panel begins its expand process.
     * Most layouts will not need to override the default Ext.emptyFn implementation.
     */
    beginExpand: Ext.emptyFn,

    /**
     * An object which contains boolean properties specifying which properties are to be 
     * animated upon flush of child Component ContextItems. For example, Accordion would
     * have:
     *
     *      {
     *          y: true,
     *          height: true
     *      }
     *
     * @private
     */
    animatePolicy: null,

    childEls: [
        /**
         * @property {Ext.Element} overflowPadderEl
         * The element used to correct body padding during overflow.
         */
        'overflowPadderEl'
    ],

    renderTpl: [
        '{%this.renderBody(out,values)%}'
    ],

    usesContainerHeight: true,
    usesContainerWidth: true,
    usesHeight: true,
    usesWidth: true,

    constructor: function () {
        this.callParent(arguments);
        this.mixins.elementCt.constructor.call(this);
    },

    destroy : function() {
        this.callParent();
        this.mixins.elementCt.destroy.call(this);
    },

    /**
     * In addition to work done by our base classes, containers benefit from some extra
     * cached data. The following properties are added to the ownerContext:
     * 
     *  - visibleItems: the result of {@link #getVisibleItems}
     *  - childItems: the ContextItem[] for each visible item
     *  - targetContext: the ContextItem for the {@link #getTarget} element
     */
    beginLayout: function (ownerContext) {
        this.callParent(arguments);

        ownerContext.targetContext = ownerContext.paddingContext = ownerContext.getEl('getTarget', this);

        this.cacheChildItems(ownerContext);
    },

    beginLayoutCycle: function (ownerContext, firstCycle) {
        var me = this;

        me.callParent(arguments);

        if (firstCycle) {
            if (me.usesContainerHeight) {
                ++ownerContext.consumersContainerHeight;
            }
            if (me.usesContainerWidth) {
                ++ownerContext.consumersContainerWidth;
            }
        }
    },

    cacheChildItems: function (ownerContext) {
        var context = ownerContext.context,
            childItems = [],
            items = this.getVisibleItems(),
            length = items.length,
            i;

        ownerContext.childItems = childItems;
        ownerContext.visibleItems = items;

        for (i = 0; i < length; ++i) {
            childItems.push(context.getCmp(items[i]));
        }
    },

    cacheElements: function () {
        var owner = this.owner;

        this.applyChildEls(owner.el, owner.id); // from ElementContainer mixin
    },

    /**
     * Adds layout's itemCls and owning Container's itemCls
     * @protected
     */
    configureItem: function(item) {
        var me = this,
            itemCls = me.itemCls,
            ownerItemCls = me.owner.itemCls,
            addClasses;

        // Effectively callParent but without the function overhead
        item.ownerLayout = me;

        if (itemCls) {
            // itemCls can be a single clas or an array
            addClasses = typeof itemCls === 'string' ? [itemCls] : itemCls;
        }
        if (ownerItemCls) {
            addClasses = Ext.Array.push(addClasses||[], ownerItemCls);
        }
        if (addClasses) {
            item.addCls(addClasses);
        }
    },

    doRenderBody: function (out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        this.renderItems(out, renderData);
        this.renderContent(out, renderData);
    },

    doRenderContainer: function (out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        var me = renderData.$comp.layout,
            tpl = me.getRenderTpl(),
            data = me.getRenderData();

        tpl.applyOut(data, out);
    },

    doRenderItems: function (out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        var me = renderData.$layout,
            tree = me.getRenderTree();

        if (tree) {
            Ext.DomHelper.generateMarkup(tree, out);
        }
    },

    finishRender: function () {
        var me = this,
            target, items;

        me.callParent();

        me.cacheElements();

        target = me.getRenderTarget();
        items = me.getLayoutItems();

        //<debug>
        if (me.targetCls && !me.getTarget().hasCls(me.targetCls)) {
            Ext.log.warn('targetCls is missing. This may mean that getTargetEl() is being overridden but not applyTargetCls(). ' + me.owner.id);
        }
        //</debug>

        me.finishRenderItems(target, items);
    },

    /**
     * @private
     * Called for every layout in the layout context after all the layouts have been finally flushed
     */
    notifyOwner: function() {
        this.owner.afterLayout(this);
    },

    /**
     * Returns the container size (that of the target). Only the fixed-sized dimensions can
     * be returned because the shrinkWrap dimensions are based on the contentWidth/Height
     * as determined by the container layout.
     *
     * @param {Ext.layout.ContextItem} ownerContext The owner's context item.
     * @param {Boolean} [inDom=false] True if the container size must be in the DOM.
     * @return {Object} The size
     * @return {Number} return.width The width
     * @return {Number} return.height The height
     * @protected
     */
    getContainerSize : function(ownerContext, inDom) {
        // Subtle But Important:
        // 
        // We don't want to call getProp/hasProp et.al. unless we in fact need that value
        // for our results! If we call it and don't need it, the layout manager will think
        // we depend on it and will schedule us again should it change.

        var targetContext = ownerContext.targetContext,
            frameInfo = targetContext.getFrameInfo(),
            padding = ownerContext.paddingContext.getPaddingInfo(),
            got = 0,
            needed = 0,
            gotWidth, gotHeight, width, height;

        // In an shrinkWrap width/height case, we must not ask for any of these dimensions
        // because they will be determined by contentWidth/Height which is calculated by
        // this layout...

        // Fit/Card layouts are able to set just the width of children, allowing child's
        // resulting height to autosize the Container.
        // See examples/tabs/tabs.html for an example of this.

        if (!ownerContext.widthModel.shrinkWrap) {
            ++needed;
            width = inDom ? targetContext.getDomProp('width') : targetContext.getProp('width');
            gotWidth = (typeof width == 'number');
            if (gotWidth) {
                ++got;
                width -= frameInfo.width + padding.width;
                if (width < 0) {
                    width = 0;
                }
            }
        }

        if (!ownerContext.heightModel.shrinkWrap) {
            ++needed;
            height = inDom ? targetContext.getDomProp('height') : targetContext.getProp('height');
            gotHeight = (typeof height == 'number');
            if (gotHeight) {
                ++got;
                height -= frameInfo.height + padding.height;
                if (height < 0) {
                    height = 0;
                }
            }
        }

        return {
            width: width,
            height: height,
            needed: needed,
            got: got,
            gotAll: got == needed,
            gotWidth: gotWidth,
            gotHeight: gotHeight
        };
    },
    
    // This method is used to offset the DOM position when checking
    // whether the element is a certain child of the target. This is
    // required in cases where the extra elements prepended to the target
    // before any of the items. An example of this is when using labelAlign: 'top'
    // on a field. The label appears first in the DOM before any child items are
    // created, so when we check the position we need to add an extra offset.
    // Containers that create an innerCt are exempt because this new element
    // preserves the order
    getPositionOffset: function(position) {
        if (!this.createsInnerCt) {
            var offset = this.owner.itemNodeOffset;
            if (offset) {
                position += offset;
            }
        }
        return position;
    },

    /**
     * Returns an array of child components either for a render phase (Performed in the beforeLayout
     * method of the layout's base class), or the layout phase (onLayout).
     * @return {Ext.Component[]} of child components
     */
    getLayoutItems: function() {
        var owner = this.owner,
            items = owner && owner.items;

        return (items && items.items) || [];
    },

    getRenderData: function () {
        var comp = this.owner;

        return {
            $comp: comp,
            $layout: this,
            ownerId: comp.id
        };
    },

    /**
     * @protected
     * Returns all items that are rendered
     * @return {Array} All matching items
     */
    getRenderedItems: function() {
        var me = this,
            target = me.getRenderTarget(),
            items = me.getLayoutItems(),
            ln = items.length,
            renderedItems = [],
            i, item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.rendered && me.isValidParent(item, target, i)) {
                renderedItems.push(item);
            }
        }

        return renderedItems;
    },

    /**
     * Returns the element into which rendering must take place. Defaults to the owner Container's
     * target element.
     *
     * May be overridden in layout managers which implement an inner element.
     *
     * @return {Ext.Element}
     */
    getRenderTarget: function() {
        return this.owner.getTargetEl();
    },

    /**
     * Returns the element into which extra functional DOM elements can be inserted. Defaults to the owner Component's encapsulating element.
     *
     * May be overridden in Component layout managers which implement a {@link #getRenderTarget component render target} which must only
     * contain child components.
     * @return {Ext.Element}
     */
    getElementTarget: function() {
        return this.getRenderTarget();
    },

    getRenderTpl: function () {
        var me = this,
            renderTpl = Ext.XTemplate.getTpl(this, 'renderTpl');

        // Make sure all standard callout methods for the owner component are placed on the
        // XTemplate instance (but only once please):
        if (!renderTpl.renderContent) {
            me.owner.setupRenderTpl(renderTpl);
        }

        return renderTpl;
    },

    getRenderTree: function () {
        var result,
            items = this.owner.items,
            itemsGen,
            renderCfgs = {};
        
        do {
            itemsGen = items.generation;
            result = this.getItemsRenderTree(this.getLayoutItems(), renderCfgs);
        } while (items.generation !== itemsGen);
        return result;
    },
    
    renderChildren: function () {
        var me = this,
            ownerItems = me.owner.items,
            target = me.getRenderTarget(),
            itemsGen, items;
            
        // During the render phase, new items may be added. Specifically, a panel will
        // create a placeholder component during render if required, so we need to catch
        // it here so we can render it.
        do {
            itemsGen = ownerItems.generation;
            items = me.getLayoutItems();
            me.renderItems(items, target);
        } while (ownerItems.generation !== itemsGen);
    },

    getScrollbarsNeeded: function (width, height, contentWidth, contentHeight) {
        var scrollbarSize = Ext.getScrollbarSize(),
            hasWidth = typeof width == 'number',
            hasHeight = typeof height == 'number',
            needHorz = 0,
            needVert = 0;

        // No space-consuming scrollbars.
        if (!scrollbarSize.width) {
            return 0;
        }
        if (hasHeight && height < contentHeight) {
            needVert = 2;
            width -= scrollbarSize.width;
        }

        if (hasWidth && width < contentWidth) {
            needHorz = 1;
            if (!needVert && hasHeight) {
                height -= scrollbarSize.height;
                if (height < contentHeight) {
                    needVert = 2;
                }
            }
        }

        return needVert + needHorz;
    },

    /**
     * Returns the owner component's resize element.
     * @return {Ext.Element}
     */
    getTarget: function() {
        return this.owner.getTargetEl();
    },

    /**
     * @protected
     * Returns all items that are both rendered and visible
     * @return {Array} All matching items
     */
    getVisibleItems: function() {
        var target   = this.getRenderTarget(),
            items = this.getLayoutItems(),
            ln = items.length,
            visibleItems = [],
            i, item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.rendered && this.isValidParent(item, target, i) && item.hidden !== true) {
                visibleItems.push(item);
            }
        }

        return visibleItems;
    },

    setupRenderTpl: function (renderTpl) {
        var me = this;

        renderTpl.renderBody = me.doRenderBody;
        renderTpl.renderContainer = me.doRenderContainer;
        renderTpl.renderItems = me.doRenderItems;
    },
    
    getContentTarget: function(){
        return this.owner.getDefaultContentTarget();
    }

});
