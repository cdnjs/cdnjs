/**
 * @class Ext.layout.container.Auto
 *
 * The AutoLayout is the default layout manager delegated by {@link Ext.container.Container} to
 * render any child Components when no `{@link Ext.container.Container#layout layout}` is configured into
 * a `{@link Ext.container.Container Container}.` AutoLayout provides only a passthrough of any layout calls
 * to any child containers.
 *
 *     @example
 *     Ext.create('Ext.Panel', {
 *         width: 500,
 *         height: 280,
 *         title: "AutoLayout Panel",
 *         layout: 'auto',
 *         renderTo: document.body,
 *         items: [{
 *             xtype: 'panel',
 *             title: 'Top Inner Panel',
 *             width: '75%',
 *             height: 90
 *         },
 *         {
 *             xtype: 'panel',
 *             title: 'Bottom Inner Panel',
 *             width: '75%',
 *             height: 90
 *         }]
 *     });
 */
Ext.define('Ext.layout.container.Auto', {

    /* Begin Definitions */

    alias: ['layout.auto', 'layout.autocontainer'],

    extend: 'Ext.layout.container.Container',

    /* End Definitions */

    type: 'autocontainer',

    childEls: [
        'outerCt',
        'innerCt'
    ],

    /**
     * @cfg {Boolean} [reserveScrollbar=false]
     * Set to `true` to leave space for a vertical scrollbar (if the OS shows space-consuming scrollbars) regardless
     * of whether a scrollbar is needed.
     *
     * This is useful if content height changes during application usage, but you do not want the calculated width
     * of child items to change when a scrollbar appears or disappears. The scrollbar will appear in the reserved space,
     * and the calculated width of child Components will not change.
     *
     *     @example
     *     Ext.define('Employee', {
     *         extend: 'Ext.data.Model',
     *         fields: [
     *            {name: 'rating', type: 'int'},
     *            {name: 'salary', type: 'float'},
     *            {name: 'name'}
     *         ]
     *     });
     *
     *     function createFakeData(count) {
     *         var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Jamie', 'Adam', 'Dave', 'David', 'Jay', 'Nicolas', 'Nige'],
     *             lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Avins', 'Mishcon', 'Kaneda', 'Davis', 'Robinson', 'Ferrero', 'White'],
     *             ratings      = [1, 2, 3, 4, 5],
     *             salaries     = [100, 400, 900, 1500, 1000000];
     *
     *         var data = [];
     *         for (var i = 0; i < (count || 25); i++) {
     *             var ratingId    = Math.floor(Math.random() * ratings.length),
     *                 salaryId    = Math.floor(Math.random() * salaries.length),
     *                 firstNameId = Math.floor(Math.random() * firstNames.length),
     *                 lastNameId  = Math.floor(Math.random() * lastNames.length),
     *
     *                 rating      = ratings[ratingId],
     *                 salary      = salaries[salaryId],
     *                 name        = Ext.String.format("{0} {1}", firstNames[firstNameId], lastNames[lastNameId]);
     *
     *             data.push({
     *                 rating: rating,
     *                 salary: salary,
     *                 name: name
     *             });
     *         }
     *         store.loadData(data);
     *     }
     *
     *     // create the Data Store
     *     var store = Ext.create('Ext.data.Store', {
     *         id: 'store',
     *         model: 'Employee',
     *         proxy: {
     *             type: 'memory'
     *         }
     *     });
     *     createFakeData(10);
     *
     *     var grid = Ext.create('Ext.grid.Panel', {
     *         title: 'Grid loaded with varying number of records',
     *         anchor: '100%',
     *         store: store,
     *         columns: [{
     *             xtype: 'rownumberer',
     *             width: 40,
     *             sortable: false
     *         },{
     *             text: 'Name',
     *             flex: 1,
     *             sortable: true,
     *             dataIndex: 'name'
     *         },{
     *             text: 'Rating',
     *             width: 125,
     *             sortable: true,
     *             dataIndex: 'rating'
     *         },{
     *             text: 'Salary',
     *             width: 125,
     *             sortable: true,
     *             dataIndex: 'salary',
     *             align: 'right',
     *             renderer: Ext.util.Format.usMoney
     *         }]
     *     });
     *
     *     Ext.create('Ext.panel.Panel', {
     *         renderTo: document.body,
     *         width: 800,
     *         height: 600,
     *         layout: {
     *             type: 'anchor',
     *             reserveScrollbar: true // There will be a gap even when there's no scrollbar
     *         },
     *         autoScroll: true,
     *         items: grid,
     *         tbar: {
     *             defaults: {
     *                 handler: function(b) {
     *                     createFakeData(b.count);
     *                 }
     *             },
     *             items: [{
     *                  text: '10 Items',
     *                  count: 10
     *             },{
     *                  text: '100 Items',
     *                  count: 100
     *             },{
     *                  text: '300 Items',
     *                  count: 300
     *             },{
     *                  text: '1000 Items',
     *                  count: 1000
     *             },{
     *                  text: '5000 Items',
     *                  count: 5000
     *             }]
     *         }
     *     });
     *
     */
    reserveScrollbar: false,

    /**
     * @property {Boolean} [managePadding=true]
     * indicates that this layout will correct cross browser padding differences when the
     * container has overflow.
     * 
     * In some browsers the right and/or bottom padding of a container is lost when
     * the container has overflow.  If managePadding is true the layout will apply the
     * padding to an inner wrapping element instead of the container element that has the
     * overflow so that paddding will be included in the scrollable area.
     * Note: padding will not be managed if it is configured on the container using
     * a style config or css class.  In order to be managed, padding must be added to the
     * container using the appropriate {@link Ext.Component#contentPaddingProperty
     * contentPaddingProperty}.  For {@link Ext.panel.Panel Panels} use 
     * {@link Ext.panel.Panel#bodyPadding}, and for
     * {@link Ext.container.Container Containers}, use
     * {@link Ext.Component#padding padding}
     */
    managePadding: true,

    /**
     * @property {Boolean} [manageOverflow=false]
     * true to rerun the layout if scrollbars are needed.
     */
    manageOverflow: false,

    // auto layout does not care about the dimensions of individual child items since
    // it does not size them, and it measures them as a whole when in shrinkWrap mode.
    needsItemSize: false,
    setsItemSize: false,

    // Begin with no previous adjustments
    lastOverflowAdjust: {
        width: 0,
        height: 0
    },

    outerCtCls: Ext.baseCSSPrefix + 'autocontainer-outerCt',
    innerCtCls: Ext.baseCSSPrefix + 'autocontainer-innerCt',

    // Auto layout's renderTpl wraps the content in an outerCt which is used to accomplish
    // the following 3 goals:
    // 
    // 1. When the container has a shrink wrapped width and/or height, the outerCt is used
    // to measure the size of the content.
    // 2. When the container has overflow some browsers lose the container's right and/or
    // bottom padding.  To fix this, the padding is rendered to the outerCt instead of
    // the container target element.  This ensures that the padding is included in the 
    // container's scrollWidth/scrollHeight. In Old IE when a table is used, the padding
    // is rendered to the innerCt td element.
    // 3. The outerCt contains the margins of its children, that is to say, it prevents
    // them from collapsing.
    renderTpl: [
        // An outerCt with display:table shrink-wraps contents, and contains child
        // margins. The table-cell innerCt is required in order to support percentage
        // heights on child elements.
        '<div id="{ownerId}-outerCt" data-ref="outerCt" class="{outerCtCls}" role="presentation">',
            '<div id="{ownerId}-innerCt" data-ref="innerCt" style="{%this.renderPadding(out, values)%}" ',
                'class="{innerCtCls}" role="presentation">',
                '{%this.renderBody(out,values)%}',
            '</div>',
        '</div>'
    ],

    beginLayout: function(ownerContext) {
        this.callParent(arguments);
        this.initContextItems(ownerContext);
    },
    
    beforeLayoutCycle: function(ownerContext){
        var comp = this.owner,
            inheritedState = comp.inheritedState,
            inheritedStateInner = comp.inheritedStateInner;

        if (!inheritedState || inheritedState.invalid) {
            inheritedState = comp.getInherited(); // fixes both
            inheritedStateInner = comp.inheritedStateInner;
        }
        if (ownerContext.widthModel.shrinkWrap) {
            inheritedStateInner.inShrinkWrapTable = true;
        } else {
            delete inheritedStateInner.inShrinkWrapTable;
        }
    },

    beginLayoutCycle: function(ownerContext) {
        var me = this,
            outerCt = me.outerCt,
            lastOuterCtWidth = me.lastOuterCtWidth || '',
            lastOuterCtHeight = me.lastOuterCtHeight || '',
            lastOuterCtTableLayout = me.lastOuterCtTableLayout || '',
            state = ownerContext.state,
            overflowXStyle, outerCtWidth, outerCtHeight, outerCtTableLayout,
            inheritedStateInner;

        me.callParent(arguments);

        // Default to "shrink wrap styles".
        outerCtWidth = outerCtHeight = outerCtTableLayout = '';

        if (!ownerContext.widthModel.shrinkWrap) {
            // if we're not shrink wrapping width, we need to get the innerCt out of the
            // way to avoid any shrink wrapping effect on child items

            // fill the available width within the container
            outerCtWidth = '100%';
            inheritedStateInner = me.owner.inheritedStateInner;
            // expand no further than the available width, even if contents are wider
            // unless there is a potential for horizontal overflow, then allow
            // the outerCt to expand to the width of the contents
            overflowXStyle = me.getOverflowXStyle(ownerContext);
            outerCtTableLayout = (inheritedStateInner.inShrinkWrapTable ||
                                  overflowXStyle === 'auto' || 
                                  overflowXStyle === 'scroll') ? '' : 'fixed';
        }

        if (!ownerContext.heightModel.shrinkWrap && 
            !Ext.supports.PercentageHeightOverflowBug) {
            // if we're not shrink wrapping height, we need to get the outerCt out of the
            // way so that percentage height children will be sized correctly.  We do this
            // by giving the outerCt a height of '100%' unless the browser is affected by
            // the "percentage height overflow bug", in which case the outerCt will get a
            // pixel height set during the calculate phase after we know the targetEl size.
            outerCtHeight = '100%';
        }

        // if the outerCt width changed since last time (becuase of a widthModel change)
        // or if we set a pixel width on the outerCt last time to work around a browser-
        // specific bug, we need to set the width of the outerCt
        if ((outerCtWidth !== lastOuterCtWidth) || me.hasOuterCtPxWidth) {
            outerCt.setStyle('width', outerCtWidth);
            me.lastOuterCtWidth = outerCtWidth;
            me.hasOuterCtPxWidth = false;
        }

        // Set the outerCt table-layout property if different from last time.
        if (outerCtTableLayout !== lastOuterCtTableLayout) {
            outerCt.setStyle('table-layout', outerCtTableLayout);
            me.lastOuterCtTableLayout = outerCtTableLayout;
        }

        // if the outerCt height changed since last time (becuase of a heightModel change)
        // or if we set a pixel height on the outerCt last time to work around a browser-
        // specific bug, we need to set the height of the outerCt
        if ((outerCtHeight !== lastOuterCtHeight) || me.hasOuterCtPxHeight) {
            outerCt.setStyle('height', outerCtHeight);
            me.lastOuterCtHeight = outerCtHeight;
            me.hasOuterCtPxHeight = false;
        }

        if (me.hasInnerCtPxHeight) {
            me.innerCt.setStyle('height', '');
            me.hasInnerCtPxHeight = false;
        }

        // Begin with the scrollbar adjustment that we used last time - this is more likely
        // to be correct than beginning with no adjustment at all, but only if it is not
        // already defined - it may have already been set by invalidate()
        state.overflowAdjust = state.overflowAdjust || me.lastOverflowAdjust;
    },

    calculate: function(ownerContext) {
        var me = this,
            state = ownerContext.state,
            containerSize = me.getContainerSize(ownerContext, true),
            // If subclass has a calculateItems method, call it and cache the result
            calculatedItems = state.calculatedItems ||
                (state.calculatedItems = me.calculateItems ?
                me.calculateItems(ownerContext, containerSize) : true);

        me.setCtSizeIfNeeded(ownerContext, containerSize);

        if (calculatedItems && ownerContext.hasDomProp('containerChildrenSizeDone')) {

            me.calculateContentSize(ownerContext);

            if (containerSize.gotAll) {
                if (me.manageOverflow && !ownerContext.state.secondPass && !me.reserveScrollbar) {
                    me.calculateOverflow(ownerContext, containerSize);
                }
                return;
            }
        }
        
        me.done = false;
    },

    calculateContentSize: function (ownerContext) {
        var me = this,
            containerDimensions = ((ownerContext.widthModel.shrinkWrap ? 1 : 0) |
                                   (ownerContext.heightModel.shrinkWrap ? 2 : 0)),
            calcWidth = (containerDimensions & 1) || undefined,
            calcHeight = (containerDimensions & 2) || undefined,
            needed = 0,
            props = ownerContext.props;

        if (calcWidth) {
            if (isNaN(props.contentWidth)) {
                ++needed;
            } else {
                calcWidth = undefined;
            }
        }
        if (calcHeight) {
            if (isNaN(props.contentHeight)) {
                ++needed;
            } else {
                calcHeight = undefined;
            }
        }

        if (needed) {
            if (calcWidth && !ownerContext.setContentWidth(me.measureContentWidth(ownerContext))) {
                me.done = false;
            }
            if (calcHeight && !ownerContext.setContentHeight(me.measureContentHeight(ownerContext))) {
                me.done = false;
            }

            //if (me.done) {
            //    var el = ownerContext.targetContext.el.dom;
            //    Ext.log(this.owner.id, '.contentSize: ', contentWidth, 'x', contentHeight,
            //        ' => scrollSize: ', el.scrollWidth, 'x', el.scrollHeight);
            //}
        }
    },

    /**
     * Handles overflow processing for a container.  In addition to the ownerContext
     * passed to the {@link #calculate} method, this method also needs the containerSize
     * (the object returned by {@link #getContainerSize}).
     * @protected
     * 
     * @param {Ext.layout.ContextItem} ownerContext
     */
    calculateOverflow: function (ownerContext) {
        var me = this,
            width, height, scrollbarSize, scrollbars, xauto, yauto, targetEl;

        // Determine the dimensions that have overflow:auto applied. If these come by
        // way of component config, this does not require a DOM read:
        xauto = (me.getOverflowXStyle(ownerContext) === 'auto');
        yauto = (me.getOverflowYStyle(ownerContext) === 'auto');

        if (xauto || yauto) {
            scrollbarSize = Ext.getScrollbarSize();
            targetEl = ownerContext.overflowContext.el.dom;
            scrollbars = 0;

            if (targetEl.scrollWidth > targetEl.clientWidth) {
                // has horizontal scrollbar
                scrollbars |= 1;
            }

            if (targetEl.scrollHeight > targetEl.clientHeight) {
                // has vertical scrollbar
                scrollbars |= 2;
            }

            width = (yauto && (scrollbars & 2)) ? scrollbarSize.width : 0;
            height = (xauto && (scrollbars & 1)) ? scrollbarSize.height : 0;

            if (width !== me.lastOverflowAdjust.width || height !== me.lastOverflowAdjust.height) {
                me.done = false;

                // we pass overflowAdjust and overflowState in as state for the next
                // cycle (these are discarded if one of our ownerCt's invalidates):
                ownerContext.invalidate({
                    state: {
                        overflowAdjust: {
                            width: width,
                            height: height
                        },
                        overflowState: scrollbars,
                        secondPass: true
                    }
                });
            }
        }
    },

    completeLayout: function(ownerContext) {
       this.lastOverflowAdjust = ownerContext.state.overflowAdjust;
    },

    doRenderBody: function (out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!
        var me = renderData.$layout,
            XTemplate = Ext.XTemplate,
            beforeBodyTpl = me.beforeBodyTpl,
            afterBodyTpl = me.afterBodyTpl;

        if (beforeBodyTpl) {
            XTemplate.getTpl(me, 'beforeBodyTpl').applyOut(renderData, out);
        }
        this.renderItems(out, renderData);
        this.renderContent(out, renderData);
        if (afterBodyTpl) {
            XTemplate.getTpl(me, 'afterBodyTpl').applyOut(renderData, out);
        }
    },

    doRenderPadding: function(out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        var me = renderData.$layout,
            owner = renderData.$layout.owner,
            padding = owner[owner.contentPaddingProperty];

        if (me.managePadding && padding) {
            out.push('padding:', owner.unitizeBox(padding));
        }
    },

    finishedLayout: function (ownerContext) {
        var innerCt = this.innerCt;

        this.callParent(arguments);

        if (Ext.isIE8)  {
            // IE8 needs a repaint to render percentage sized child items.
            innerCt.repaint();
        }

        if (Ext.isOpera) {
            // Opera also needs a repaint to render percentage sized child items. but 
            // the normal repaint() method doesn't seem to do the trick, but tweaking
            // the position property in combination with reading scrollWidth does.
            innerCt.setStyle('position', 'relative');
            innerCt.dom.scrollWidth;
            innerCt.setStyle('position', '');
        }
    },

    /**
     * Returns the container size (that of the target). Only the fixed-sized dimensions can
     * be returned because the shrinkWrap dimensions are based on the contentWidth/Height
     * as determined by the container layout.
     *
     * If the {@link #calculateOverflow} method is used and if {@link #manageOverflow} is
     * true, this will adjust the width/height by the size of scrollbars.
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
        
        var size = this.callParent(arguments),
            overflowAdjust = ownerContext.state.overflowAdjust;

        if (overflowAdjust) {
            size.width -= overflowAdjust.width;
            size.height -= overflowAdjust.height;
        }

        return size;
    },

    getRenderData: function () {
        var me = this,
            data = me.callParent();

        data.innerCtCls = me.innerCtCls;
        data.outerCtCls = me.outerCtCls;

        return data;
    },

    // Overridden method from Ext.layout.container.Container.
    // Used in the beforeLayout method to render all items into.
    getRenderTarget: function() {
        return this.innerCt;
    },

    // Overridden method from Ext.layout.container.Container.
    // Used by Container classes to insert special DOM elements which must exist in addition to the child components
    getElementTarget: function() {
        return this.innerCt;
    },

    /**
     * Returns the overflow-x style of the render target.
     * Note: If overflow is configured on a container using style or css class this method
     * will read the dom the first time it is called. It is therefore preferable for
     * performance reasons to use the autoScroll or overflowX config when horizontal
     * overflow is desired.
     * @protected
     * @param {Ext.layout.ContextItem} ownerContext
     * @return {String}
     */
    getOverflowXStyle: function(ownerContext) {
        return ownerContext.overflowXStyle ||
            (ownerContext.overflowXStyle = this.owner.scrollFlags.overflowX || ownerContext.overflowContext.getStyle('overflow-x'));
    },

    /**
     * Returns the overflow-y style of the render target.
     * Note: If overflow is configured on a container using style or css class this method
     * will read the dom the first time it is called. It is therefore preferable for
     * performance reasons to use the autoScroll or overflowY config when vertical
     * overflow is desired.
     * @protected
     * @param {Ext.layout.ContextItem} ownerContext
     * @return {String}
     */
    getOverflowYStyle: function(ownerContext) {
        return ownerContext.overflowYStyle || 
            (ownerContext.overflowYStyle = this.owner.scrollFlags.overflowY || ownerContext.overflowContext.getStyle('overflow-y'));
    },

    initContextItems: function(ownerContext) {
        var me = this,
            target = ownerContext.target,
            customOverflowEl = me.owner.customOverflowEl;

        ownerContext.outerCtContext = ownerContext.getEl('outerCt', me);
        ownerContext.innerCtContext = ownerContext.getEl('innerCt', me);
        
        if (customOverflowEl) {
            ownerContext.overflowContext = ownerContext.getEl(customOverflowEl);    
        } else {
            ownerContext.overflowContext = ownerContext.targetContext;
        }
        
        if (target[target.contentPaddingProperty] !== undefined) {
            // If padding was defined using the contentPaddingProperty, we render the
            // the padding to the innerCt or outerCt (depending on the template that is
            // being used), so we need to set the paddingContext accordingly.
            // Otherwise we leave paddingContext as set by Container layout (defaults to
            // the targetContext)
            ownerContext.paddingContext = ownerContext.innerCtContext;
        }
    },

    initLayout: function() {
        var me = this,
            scrollbarWidth = Ext.getScrollbarSize().width,
            owner = me.owner;

        me.callParent();

        // Create a default lastOverflowAdjust based upon scrolling configuration.
        // If the Container is to overflow, or we *always* reserve space for a scrollbar
        // then reserve space for a vertical scrollbar
        if (scrollbarWidth && me.manageOverflow && !me.hasOwnProperty('lastOverflowAdjust')) {
            if (owner.autoScroll || me.reserveScrollbar) {
                me.lastOverflowAdjust = {
                    width: scrollbarWidth,
                    height: 0
                };
            }
        }
    },

    measureContentHeight: function (ownerContext) {
        // contentHeight includes padding, but not border, framing or margins
        var contentHeight = this.outerCt.getHeight(),
            target = ownerContext.target;

        if (this.managePadding && (target[target.contentPaddingProperty] === undefined)) {
            // if padding was not configured using the appropriate contentPaddingProperty
            // then the padding will not be on the paddingContext, and therfore not included
            // in the outerCt measurement, so we need to read the padding from the
            // targetContext
            contentHeight += ownerContext.targetContext.getPaddingInfo().height;
        }
        return contentHeight;
    },

    measureContentWidth: function (ownerContext) {
        var dom, style, old, contentWidth, target;
            
        // In the newer Chrome versions, it won't measure the
        // width correctly without repainting the inner
        // cell in some circumstances.
        if (this.chromeCellMeasureBug) {
            dom = this.innerCt.dom;
            style = dom.style;
            old = style.display;
            
            if (old == 'table-cell') {
                style.display = '';
                dom.offsetWidth;
                style.display = old;
            }    
        }
        
        // contentWidth includes padding, but not border, framing or margins
        contentWidth = this.outerCt.getWidth();
        target = ownerContext.target;

        if (this.managePadding && (target[target.contentPaddingProperty] === undefined)) {
            // if padding was not configured using the appropriate contentPaddingProperty
            // then the padding will not be on the paddingContext, and therfore not included
            // in the outerCt measurement, so we need to read the padding from the
            // targetContext
            contentWidth += ownerContext.targetContext.getPaddingInfo().width;
        }
        return contentWidth;
    },

    /**
     * This method sets the height and/or width of the outerCt/innerCt to adjust for the
     * following browser-specific issues:
     * 
     * 1. In some browsers a percentage-height element ignores the horizontal scrollbar
     * of its parent (see Ext.supports.PercentageHeightOverflowBug).  If the browser is
     * affected by this bug the outerCt needs a pixel height in order to support
     * percentage-height children when not shrink-wrapping height. If the browser is not
     * affected by this bug, a height of 100% is assigned to the outerCt (see
     * beginLayoutCycle).
     * 
     * 2. IE8 mode has a bug with percentage height children.  if the innerCt has
     * a height of 100%, has padding, and has a child item with a percentage height, that
     * child item will be sized as a percentage of the parent's height plus padding height.
     * In other words, a child with height:50% would have its height caclulated thusly:
     * (parentHeight + parentPaddingHeight) * 0.5
     * To fix this, we have to give the innerCt a pixel height.
     * 
     * @protected
     * @param {Ext.layout.ContextItem} ownerContext
     * @param {Object} containerSize
     */
    setCtSizeIfNeeded: function(ownerContext, containerSize) {
        var me = this,
            height = containerSize.height,
            padding = ownerContext.paddingContext.getPaddingInfo(),
            targetEl = me.getTarget(),
            overflowXStyle = me.getOverflowXStyle(ownerContext),
            canOverflowX = (overflowXStyle === 'auto' || overflowXStyle === 'scroll'),
            scrollbarSize = Ext.getScrollbarSize(),
            needsOuterHeight, needsInnerHeight;

        if (height && !ownerContext.heightModel.shrinkWrap) {
            if (Ext.supports.PercentageHeightOverflowBug) {
                // set a pixel height on the outerCt if the browser ignores horizontal
                // scrollbar when rendering percentage-height elements
                needsOuterHeight = true;
            }
            if (Ext.isIE8) {
                // When not shrink wrapping, we set a pixel height on the innerCt to
                // support percentage height children in IE8.
                needsInnerHeight = true;
            }

            if ((needsOuterHeight || needsInnerHeight) && canOverflowX && 
                (targetEl.dom.scrollWidth > targetEl.dom.clientWidth)) {
                // adjust the height for scrollbar size since it's not accounted for
                // in the containerSize.
                // IE8 does not tolerate negative sizes
                height = Math.max(height - scrollbarSize.height, 0);
            }

            if (needsOuterHeight) {
                ownerContext.outerCtContext.setProp('height', height + padding.height);
                me.hasOuterCtPxHeight = true;
            }
            
            if (needsInnerHeight) {
                ownerContext.innerCtContext.setProp('height', height);
                me.hasInnerCtPxHeight = true;
            }
        }
    },

    setupRenderTpl: function (renderTpl) {
        this.callParent(arguments);

        renderTpl.renderPadding = this.doRenderPadding;
    },

    getContentTarget: function(){
        return this.innerCt;
    },

    getScrollerEl: function() {
        return this.outerCt;
    }

}, function(){
    this.prototype.chromeCellMeasureBug = Ext.isChrome && Ext.chromeVersion >= 26;
});
