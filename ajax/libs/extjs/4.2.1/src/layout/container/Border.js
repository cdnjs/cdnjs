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
 * This is a multi-pane, application-oriented UI layout style that supports multiple nested panels, automatic bars
 * between regions and built-in {@link Ext.panel.Panel#collapsible expanding and collapsing} of regions.
 *
 * This class is intended to be extended or created via the `layout:'border'` {@link Ext.container.Container#layout}
 * config, and should generally not need to be created directly via the new keyword.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         width: 500,
 *         height: 300,
 *         title: 'Border Layout',
 *         layout: 'border',
 *         items: [{
 *             title: 'South Region is resizable',
 *             region: 'south',     // position for region
 *             xtype: 'panel',
 *             height: 100,
 *             split: true,         // enable resizing
 *             margins: '0 5 5 5'
 *         },{
 *             // xtype: 'panel' implied by default
 *             title: 'West Region is collapsible',
 *             region:'west',
 *             xtype: 'panel',
 *             margins: '5 0 0 5',
 *             width: 200,
 *             collapsible: true,   // make collapsible
 *             id: 'west-region-container',
 *             layout: 'fit'
 *         },{
 *             title: 'Center Region',
 *             region: 'center',     // center region is required, no width/height specified
 *             xtype: 'panel',
 *             layout: 'fit',
 *             margins: '5 5 0 0'
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *
 * # Notes
 * 
 *   - When using the split option, the layout will automatically insert a {@link Ext.resizer.Splitter}
 *     into the appropriate place. This will modify the underlying
 *     {@link Ext.container.Container#property-items items} collection in the container.
 *
 *   - Any Container using the Border layout **must** have a child item with `region:'center'`.
 *     The child item in the center region will always be resized to fill the remaining space
 *     not used by the other regions in the layout.
 *
 *   - Any child items with a region of `west` or `east` may be configured with either an initial
 *     `width`, or a {@link Ext.layout.container.Box#flex} value, or an initial percentage width
 *     **string** (Which is simply divided by 100 and used as a flex value).
 *     The 'center' region has a flex value of `1`.
 *
 *   - Any child items with a region of `north` or `south` may be configured with either an initial
 *     `height`, or a {@link Ext.layout.container.Box#flex} value, or an initial percentage height
 *     **string** (Which is simply divided by 100 and used as a flex value).
 *     The 'center' region has a flex value of `1`.
 *
 *   - **There is no BorderLayout.Region class in ExtJS 4.0+**
 */
Ext.define('Ext.layout.container.Border', {

    extend: 'Ext.layout.container.Container',
    alias: 'layout.border',
    alternateClassName: 'Ext.layout.BorderLayout',

    requires: [
        'Ext.resizer.BorderSplitter',
        'Ext.fx.Anim',

        // Overrides for Panel that provide border layout features
        'Ext.layout.container.border.Region'
    ],


    targetCls: Ext.baseCSSPrefix + 'border-layout-ct',

    itemCls: [Ext.baseCSSPrefix + 'border-item', Ext.baseCSSPrefix + 'box-item'],

    type: 'border',

    isBorderLayout: true,

    /**
     * @cfg {Boolean} split
     * This configuration option is to be applied to the **child `items`** managed by this layout.
     * Each region with `split:true` will get a {@link Ext.resizer.BorderSplitter Splitter} that
     * allows for manual resizing of the container. Except for the `center` region.
     */
    
    /**
     * @cfg {Boolean} [splitterResize=true]
     * This configuration option is to be applied to the **child `items`** managed by this layout and
     * is used in conjunction with {@link #split}. By default, when specifying {@link #split}, the region
     * can be dragged to be resized. Set this option to false to show the split bar but prevent resizing.
     */

    /**
     * @cfg {Number/String/Object} padding
     * Sets the padding to be applied to all child items managed by this layout.
     * 
     * This property can be specified as a string containing space-separated, numeric
     * padding values. The order of the sides associated with each value matches the way
     * CSS processes padding values:
     *
     *  - If there is only one value, it applies to all sides.
     *  - If there are two values, the top and bottom borders are set to the first value
     *    and the right and left are set to the second.
     *  - If there are three values, the top is set to the first value, the left and right
     *    are set to the second, and the bottom is set to the third.
     *  - If there are four values, they apply to the top, right, bottom, and left,
     *    respectively.
     *
     */
    padding: undefined,

    percentageRe: /(\d+)%/,
    
    horzMarginProp: 'left',
    padOnContainerProp: 'left',
    padNotOnContainerProp: 'right',

    /**
     * Reused meta-data objects that describe axis properties.
     * @private
     */
    axisProps: {
        horz: {
            borderBegin: 'west',
            borderEnd: 'east',
            horizontal: true,
            posProp: 'x',
            sizeProp: 'width',
            sizePropCap: 'Width'
        },
        vert: {
            borderBegin: 'north',
            borderEnd: 'south',
            horizontal: false,
            posProp: 'y',
            sizeProp: 'height',
            sizePropCap: 'Height'
        }
    },

    // @private
    centerRegion: null,

    manageMargins: true,

    panelCollapseAnimate: true,

    panelCollapseMode: 'placeholder',

    /**
     * @cfg {Object} regionWeights
     * The default weights to assign to regions in the border layout. These values are
     * used when a region does not contain a `weight` property. This object must have
     * properties for all regions ("north", "south", "east" and "west").
     * 
     * **IMPORTANT:** Since this is an object, changing its properties will impact ALL
     * instances of Border layout. If this is not desired, provide a replacement object as
     * a config option instead:
     * 
     *      layout: {
     *          type: 'border',
     *          regionWeights: {
     *              west: 20,
     *              north: 10,
     *              south: -10,
     *              east: -20
     *          }
     *      }
     *
     * The region with the highest weight is assigned space from the border before other
     * regions. Regions of equal weight are assigned space based on their position in the
     * owner's items list (first come, first served).
     */
    regionWeights: {
        north: 20,
        south: 10,
        center: 0,
        west: -10,
        east: -20
    },

    //----------------------------------
    // Layout processing

    /**
     * Creates the axis objects for the layout. These are only missing size information
     * which is added during {@link #calculate}.
     * @private
     */
    beginAxis: function (ownerContext, regions, name) {
        var me = this,
            props = me.axisProps[name],
            isVert = !props.horizontal,
            sizeProp = props.sizeProp,
            totalFlex = 0,
            childItems = ownerContext.childItems,
            length = childItems.length,
            center, i, childContext, centerFlex, comp, region, match, size, type, target, placeholder;

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            comp = childContext.target;

            childContext.layoutPos = {};

            if (comp.region) {
                childContext.region = region = comp.region;

                childContext.isCenter = comp.isCenter;
                childContext.isHorz = comp.isHorz;
                childContext.isVert = comp.isVert;

                childContext.weight = comp.weight || me.regionWeights[region] || 0;
                regions[comp.id] = childContext;

                if (comp.isCenter) {
                    center = childContext;
                    centerFlex = comp.flex;
                    ownerContext.centerRegion = center;

                    continue;
                }

                if (isVert !== childContext.isVert) {
                    continue;
                }

                // process regions "isVert ? north||south : east||center||west"

                childContext.reverseWeighting = (region == props.borderEnd);

                size = comp[sizeProp];
                type = typeof size;

                if (!comp.collapsed) {
                    if (type == 'string' && (match = me.percentageRe.exec(size))) {
                        childContext.percentage = parseInt(match[1], 10);
                    } else if (comp.flex) {
                        totalFlex += childContext.flex = comp.flex;
                    }
                }
            }
        }

        // Special cases for a collapsed center region
        if (center) {
            target = center.target;

            if ((placeholder = target.placeholderFor)) {
                if (!centerFlex && isVert === placeholder.collapsedVertical()) {
                    // The center region is a placeholder, collapsed in this axis
                    centerFlex = 0;
                    center.collapseAxis = name;
                }
            } else if (target.collapsed && (isVert === target.collapsedVertical())) {
                // The center region is a collapsed header, collapsed in this axis
                centerFlex = 0;
                center.collapseAxis = name;
            }
        }

        if (centerFlex == null) {
            // If we still don't have a center flex, default to 1
            centerFlex = 1;
        }

        totalFlex += centerFlex;

        return Ext.apply({
            before         : isVert ? 'top' : 'left',
            totalFlex      : totalFlex
        }, props);
    },

    beginLayout: function (ownerContext) {
        var me = this,
            items = me.getLayoutItems(),
            pad = me.padding,
            type = typeof pad,
            padOnContainer = false,
            childContext, item, length, i, regions, collapseTarget,
            doShow, hidden, region;

        // We sync the visibility state of splitters with their region:
        if (pad) {
            if (type == 'string' || type == 'number') {
                pad = Ext.util.Format.parseBox(pad);
            }
        } else {
            pad = ownerContext.getEl('getTargetEl').getPaddingInfo();
            padOnContainer = true;
        }
        ownerContext.outerPad = pad;
        ownerContext.padOnContainer = padOnContainer;

        for (i = 0, length = items.length; i < length; ++i) {
            item = items[i];
            collapseTarget = me.getSplitterTarget(item);
            if (collapseTarget) {  // if (splitter)
                doShow = undefined;
                hidden = !!item.hidden;
                if (!collapseTarget.split) {
                    if (collapseTarget.isCollapsingOrExpanding) {
                        doShow = !!collapseTarget.collapsed;
                    }
                } else if (hidden !== collapseTarget.hidden) {
                    doShow = !collapseTarget.hidden;
                }

                if (doShow) {
                    item.show();
                } else if (doShow === false) {
                    item.hide();
                }
            }
        }

        // The above synchronized visibility of splitters with their regions, so we need
        // to make this call after that so that childItems and visibleItems are correct:
        //
        me.callParent(arguments);

        items = ownerContext.childItems;
        length = items.length;
        regions = {};

        ownerContext.borderAxisHorz = me.beginAxis(ownerContext, regions, 'horz');
        ownerContext.borderAxisVert = me.beginAxis(ownerContext, regions, 'vert');

        // Now that weights are assigned to the region's contextItems, we assign those
        // same weights to the contextItem for the splitters. We also cross link the
        // contextItems for the collapseTarget and its splitter.
        for (i = 0; i < length; ++i) {
            childContext = items[i];
            collapseTarget = me.getSplitterTarget(childContext.target);

            if (collapseTarget) { // if (splitter)
                region = regions[collapseTarget.id]
                if (!region) {
                        // if the region was hidden it will not be part of childItems, and
                        // so beginAxis() won't add it to the regions object, so we have
                        // to create the context item here.
                        region = ownerContext.getEl(collapseTarget.el, me);
                        region.region = collapseTarget.region;
                }
                childContext.collapseTarget = collapseTarget = region;
                childContext.weight = collapseTarget.weight;
                childContext.reverseWeighting = collapseTarget.reverseWeighting;
                collapseTarget.splitter = childContext;
                childContext.isHorz = collapseTarget.isHorz;
                childContext.isVert = collapseTarget.isVert;
            }
        }

        // Now we want to sort the childItems by their weight.
        me.sortWeightedItems(items, 'reverseWeighting');
        me.setupSplitterNeighbors(items);
    },

    calculate: function (ownerContext) {
        var me = this,
            containerSize = me.getContainerSize(ownerContext),
            childItems = ownerContext.childItems,
            length = childItems.length,
            horz = ownerContext.borderAxisHorz,
            vert = ownerContext.borderAxisVert,
            pad = ownerContext.outerPad,
            padOnContainer = ownerContext.padOnContainer,
            i, childContext, childMargins, size, horzPercentTotal, vertPercentTotal;

        horz.begin = pad[me.padOnContainerProp];
        vert.begin = pad.top;
        // If the padding is already on the container we need to add it to the space
        // If not on the container, it's "virtual" padding.
        
        horzPercentTotal = horz.end = horz.flexSpace = containerSize.width + (padOnContainer ? pad[me.padOnContainerProp] : -pad[me.padNotOnContainerProp]);
        vertPercentTotal = vert.end = vert.flexSpace = containerSize.height + (padOnContainer ? pad.top : -pad.bottom);

        // Reduce flexSpace on each axis by the fixed/auto sized dimensions of items that
        // aren't flexed along that axis.
        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            childMargins = childContext.getMarginInfo();

            // Margins are always fixed size and must be removed from the space used for percentages and flexes
            if (childContext.isHorz || childContext.isCenter) {
                horz.addUnflexed(childMargins.width);
                horzPercentTotal -= childMargins.width;
            }

            if (childContext.isVert || childContext.isCenter) {
                vert.addUnflexed(childMargins.height);
                vertPercentTotal -= childMargins.height;
            }

            // Fixed size components must have their sizes removed from the space used for flex
            if (!childContext.flex && !childContext.percentage) {
                if (childContext.isHorz || (childContext.isCenter && childContext.collapseAxis === 'horz')) {
                    size = childContext.getProp('width');

                    horz.addUnflexed(size);

                    // splitters should not count towards percentages
                    if (childContext.collapseTarget) {
                        horzPercentTotal -= size;
                    }
                } else if (childContext.isVert || (childContext.isCenter && childContext.collapseAxis === 'vert')) {
                    size = childContext.getProp('height');

                    vert.addUnflexed(size);

                    // splitters should not count towards percentages
                    if (childContext.collapseTarget) {
                        vertPercentTotal -= size;
                    }
                }
                // else ignore center since it is fully flexed
            }
        }

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            childMargins = childContext.getMarginInfo();

            // Calculate the percentage sizes. After this calculation percentages are very similar to fixed sizes
            if (childContext.percentage) {
                if (childContext.isHorz) {
                    size = Math.ceil(horzPercentTotal * childContext.percentage / 100);
                    size = childContext.setWidth(size);
                    horz.addUnflexed(size);
                } else if (childContext.isVert) {
                    size = Math.ceil(vertPercentTotal * childContext.percentage / 100);
                    size = childContext.setHeight(size);
                    vert.addUnflexed(size);
                }
                // center shouldn't have a percentage but if it does it should be ignored
            }
        }


        // If we haven't gotten sizes for all unflexed dimensions on an axis, the flexSpace
        // will be NaN so we won't be calculating flexed dimensions until that is resolved.

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];

            if (!childContext.isCenter) {
                me.calculateChildAxis(childContext, horz);
                me.calculateChildAxis(childContext, vert);
            }
        }

        // Once all items are placed, the final size of the center can be determined. If we
        // can determine both width and height, we are done. We use '+' instead of '&&' to
        // avoid short-circuiting (we want to call both):
        if (me.finishAxis(ownerContext, vert) + me.finishAxis(ownerContext, horz) < 2) {
            me.done = false;
        } else {
            // Size information is published as we place regions but position is hard to do
            // that way (while avoiding published multiple times) so we publish all the
            // positions at the end.
            me.finishPositions(childItems);
        }
    },

    /**
     * Performs the calculations for a region on a specified axis.
     * @private
     */
    calculateChildAxis: function (childContext, axis) {
        var collapseTarget = childContext.collapseTarget,
            setSizeMethod = 'set' + axis.sizePropCap,
            sizeProp = axis.sizeProp,
            childMarginSize = childContext.getMarginInfo()[sizeProp],
            region, isBegin, flex, pos, size;

        if (collapseTarget) { // if (splitter)
            region = collapseTarget.region;
        } else {
            region = childContext.region;
            flex = childContext.flex;
        }

        isBegin = region == axis.borderBegin;

        if (!isBegin && region != axis.borderEnd) {
            // a north/south region on the horizontal axis or an east/west region on the
            // vertical axis: stretch to fill remaining space:
            childContext[setSizeMethod](axis.end - axis.begin - childMarginSize);
            pos = axis.begin;
        } else {
            if (flex) {
                size = Math.ceil(axis.flexSpace * (flex / axis.totalFlex));
                size = childContext[setSizeMethod](size);
            } else if (childContext.percentage) {
                // Like getProp but without registering a dependency - we calculated the size, we don't depend on it
                size = childContext.peek(sizeProp);
            } else {
                size = childContext.getProp(sizeProp);
            }

            size += childMarginSize;

            if (isBegin) {
                pos = axis.begin;
                axis.begin += size;
            } else {
                axis.end = pos = axis.end - size;
            }
        }

        childContext.layoutPos[axis.posProp] = pos;
    },

    /**
     * Finishes the calculations on an axis. This basically just assigns the remaining
     * space to the center region.
     * @private
     */
    finishAxis: function (ownerContext, axis) {
        var size = axis.end - axis.begin,
            center = ownerContext.centerRegion;

        if (center) {
            center['set' + axis.sizePropCap](size - center.getMarginInfo()[axis.sizeProp]);
            center.layoutPos[axis.posProp] = axis.begin;
        }

        return Ext.isNumber(size) ? 1 : 0;
    },

    /**
     * Finishes by setting the positions on the child items.
     * @private
     */
    finishPositions: function (childItems) {
        var length = childItems.length,
            index, childContext,
            marginProp = this.horzMarginProp;

        for (index = 0; index < length; ++index) {
            childContext = childItems[index];

            childContext.setProp('x', childContext.layoutPos.x + childContext.marginInfo[marginProp]);
            childContext.setProp('y', childContext.layoutPos.y + childContext.marginInfo.top);
        }
    },

    getLayoutItems: function() {
        var owner = this.owner,
            ownerItems = (owner && owner.items && owner.items.items) || [],
            length = ownerItems.length,
            items = [],
            i = 0,
            ownerItem, placeholderFor;

        for (; i < length; i++) {
            ownerItem = ownerItems[i];
            placeholderFor = ownerItem.placeholderFor;
            // There are a couple of scenarios where we do NOT want an item to
            // be included in the layout items:
            //
            // 1. If the item is floated. This can happen when a region's header
            // is clicked to "float" the item, then another region's header or
            // is clicked quickly before the first floated region has had a
            // chance to slide out. When this happens, the second click triggers
            // a layout, the purpose of which is to determine what the size of the 
            // second region will be after it is floated, so it can be animated
            // to that size. In this case the existing floated item should not be
            // included in the layout items because it will not be visible once
            // it's slideout animation has completed.
            //
            // 2. If the item is a placeholder for a panel that is currently
            // being expanded. Similar to scenario 1, a second layout can be
            // triggered by another panel being expanded/collapsed/floated before
            // the first panel has finished it's expand animation. If this is the
            // case we do not want the placeholder to be included in the layout
            // items because it will not be once the panel has finished expanding.
            //
            // If the component is hidden, we need none of these shenanigans
            if (ownerItem.hidden || ((!ownerItem.floated || ownerItem.isCollapsingOrExpanding === 2) &&
                !(placeholderFor && placeholderFor.isCollapsingOrExpanding === 2))) {
                items.push(ownerItem);
            } 
        }

        return items;
    },

    getPlaceholder: function (comp) {
        return comp.getPlaceholder && comp.getPlaceholder();
    },

    getSplitterTarget: function (splitter) {
        var collapseTarget = splitter.collapseTarget;

        if (collapseTarget && collapseTarget.collapsed) {
            return collapseTarget.placeholder || collapseTarget;
        }

        return collapseTarget;
    },

    isItemBoxParent: function (itemContext) {
        return true;
    },

    isItemShrinkWrap: function (item) {
        return true;
    },

    //----------------------------------
    // Event handlers

    /**
     * Inserts the splitter for a given region. A reference to the splitter is also stored
     * on the component as "splitter".
     * @private
     */
    insertSplitter: function (item, index, hidden, splitterCfg) {
        var region = item.region,
            splitter = Ext.apply({
                xtype: 'bordersplitter',
                collapseTarget: item,
                id: item.id + '-splitter',
                hidden: hidden,
                canResize: item.splitterResize !== false,
                splitterFor: item
            }, splitterCfg),
            at = index + ((region === 'south' || region === 'east') ? 0 : 1);

        if (item.collapseMode === 'mini') {
            splitter.collapsedCls = item.collapsedCls;
        }

        item.splitter = this.owner.add(at, splitter);
    },

    /**
     * Called when a region (actually when any component) is added to the container. The
     * region is decorated with some helpful properties (isCenter, isHorz, isVert) and its
     * splitter is added if its "split" property is true.
     * @private
     */
    onAdd: function (item, index) {
        var me = this,
            placeholderFor = item.placeholderFor,
            region = item.region,
            split,
            hidden,
            cfg;

        me.callParent(arguments);

        if (region) {
            Ext.apply(item, me.regionFlags[region]);

            if (item.initBorderRegion) {
                // This method should always be present but perhaps the override is being
                // excluded.
                item.initBorderRegion();
            }

            if (region === 'center') {
                //<debug>
                if (me.centerRegion) {
                    Ext.Error.raise("Cannot have multiple center regions in a BorderLayout.");
                }
                //</debug>
                me.centerRegion = item;
            } else {
                split = item.split;
                hidden = !!item.hidden;
                
                if (typeof split === 'object') {
                    cfg = split;
                    split = true;
                }
                
                if ((item.isHorz || item.isVert) && (split || item.collapseMode == 'mini')) {
                    me.insertSplitter(item, index, hidden || !split, cfg);
                }
            }

            if (!item.hasOwnProperty('collapseMode')) {
                item.collapseMode = me.panelCollapseMode;
            }

            if (!item.hasOwnProperty('animCollapse')) {
                if (item.collapseMode !== 'placeholder') {
                    // other collapse modes do not animate nicely in a border layout, so
                    // default them to off:
                    item.animCollapse = false;
                } else {
                    item.animCollapse = me.panelCollapseAnimate;
                }
            }
        } else if (placeholderFor) {
            Ext.apply(item, me.regionFlags[placeholderFor.region]);
            item.region = placeholderFor.region;
            item.weight = placeholderFor.weight;
        }
    },

    onDestroy: function() {
        this.centerRegion = null;
        this.callParent();
    },

    onRemove: function (item) {
        var me = this,
            region = item.region,
            splitter = item.splitter;

        if (region) {
            if (item.isCenter) {
                me.centerRegion = null;
            }

            delete item.isCenter;
            delete item.isHorz;
            delete item.isVert;

            if (splitter) {
                me.owner.doRemove(splitter, true); // avoid another layout
                delete item.splitter;
            }
        }

        me.callParent(arguments);
    },

    //----------------------------------
    // Misc

    regionMeta: {
        center: { splitterDelta: 0 },

        north: { splitterDelta:  1 },
        south: { splitterDelta: -1 },

        west:  { splitterDelta:  1 },
        east:  { splitterDelta: -1 }
    },

    /**
     * Flags and configs that get set of regions based on their `region` property.
     * @private
     */
    regionFlags: {
        center: { isCenter: true, isHorz: false, isVert: false },

        north: { isCenter: false, isHorz: false, isVert: true, collapseDirection: 'top' },
        south: { isCenter: false, isHorz: false, isVert: true, collapseDirection: 'bottom' },

        west: { isCenter: false, isHorz: true, isVert: false, collapseDirection: 'left' },
        east: { isCenter: false, isHorz: true, isVert: false, collapseDirection: 'right' }
    },

    setupSplitterNeighbors: function (items) {
        var edgeRegions = {
                //north: null,
                //south: null,
                //east: null,
                //west: null
            },
            length = items.length,
            touchedRegions = this.touchedRegions,
            i, j, center, count, edge, comp, region, splitter, touched;

        for (i = 0; i < length; ++i) {
            comp = items[i].target;
            region = comp.region;

            if (comp.isCenter) {
                center = comp;
            } else if (region) {
                touched = touchedRegions[region];

                for (j = 0, count = touched.length; j < count; ++j) {
                    edge = edgeRegions[touched[j]];
                    if (edge) {
                        edge.neighbors.push(comp);
                    }
                }
                
                if (comp.placeholderFor) {
                    // placeholder, so grab the splitter for the actual panel
                    splitter = comp.placeholderFor.splitter;
                } else {
                    splitter = comp.splitter;
                }
                if (splitter) {
                    splitter.neighbors = [];
                }

                edgeRegions[region] = splitter;
            }
        }

        if (center) {
            touched = touchedRegions.center;

            for (j = 0, count = touched.length; j < count; ++j) {
                edge = edgeRegions[touched[j]];
                if (edge) {
                    edge.neighbors.push(center);
                }
            }
        }
    },

    /**
     * Lists the regions that would consider an interior region a neighbor. For example,
     * a north region would consider an east or west region its neighbords (as well as
     * an inner north region).
     * @private
     */
    touchedRegions: {
        center: [ 'north', 'south', 'east',  'west' ],

        north:  [ 'north', 'east',  'west'  ],
        south:  [ 'south', 'east',  'west'  ],
        east:   [ 'east',  'north', 'south' ],
        west:   [ 'west',  'north', 'south' ]
    },

    sizePolicies: {
        vert: {
            readsWidth: 0,
            readsHeight: 1,
            setsWidth: 1,
            setsHeight: 0
        },
        horz: {
            readsWidth: 1,
            readsHeight: 0,
            setsWidth: 0,
            setsHeight: 1
        },
        flexAll: {
            readsWidth: 0,
            readsHeight: 0,
            setsWidth: 1,
            setsHeight: 1
        }
    },

    getItemSizePolicy: function (item) {
        var me = this,
            policies = this.sizePolicies,
            collapseTarget, size, policy, placeholderFor;

        if (item.isCenter) {
            placeholderFor = item.placeholderFor;

            if (placeholderFor) {
                if (placeholderFor.collapsedVertical()) {
                    return policies.vert;
                }
                return policies.horz;
            }
            if (item.collapsed) {
                if (item.collapsedVertical()) {
                    return policies.vert;
                }
                return policies.horz;
            }
            return policies.flexAll;
        }

        collapseTarget = item.collapseTarget;

        if (collapseTarget) {
            return collapseTarget.isVert ? policies.vert : policies.horz;
        }

        if (item.region) {
            if (item.isVert) {
                size = item.height;
                policy = policies.vert;
            } else {
                size = item.width;
                policy = policies.horz;
            }

            if (item.flex || (typeof size == 'string' && me.percentageRe.test(size))) {
                return policies.flexAll;
            }

            return policy;
        }

        return me.autoSizePolicy;
    }
}, function () {
    var methods = {
        addUnflexed: function (px) {
            this.flexSpace = Math.max(this.flexSpace - px, 0);
        }
    },
    props = this.prototype.axisProps;

    Ext.apply(props.horz, methods);
    Ext.apply(props.vert, methods);
});
