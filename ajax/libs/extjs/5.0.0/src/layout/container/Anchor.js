/**
 * This is a layout that enables anchoring of contained elements relative to the container's dimensions.
 * If the container is resized, all anchored items are automatically rerendered according to their
 * `{@link #anchor}` rules.
 *
 * This class is intended to be extended or created via the {@link Ext.container.Container#layout layout}: 'anchor'
 * config, and should generally not need to be created directly via the new keyword.
 * 
 * AnchorLayout does not have any direct config options (other than inherited ones). By default,
 * AnchorLayout will calculate anchor measurements based on the size of the container itself. However, the
 * container using the AnchorLayout can supply an anchoring-specific config property of `anchorSize`.
 *
 * If anchorSize is specifed, the layout will use it as a virtual container for the purposes of calculating
 * anchor measurements based on it instead, allowing the container to be sized independently of the anchoring
 * logic if necessary.
 *
 *     @example
 *     Ext.create('Ext.Panel', {
 *         width: 500,
 *         height: 400,
 *         title: "AnchorLayout Panel",
 *         layout: 'anchor',
 *         renderTo: Ext.getBody(),
 *         items: [
 *             {
 *                 xtype: 'panel',
 *                 title: '75% Width and 20% Height',
 *                 anchor: '75% 20%'
 *             },
 *             {
 *                 xtype: 'panel',
 *                 title: 'Offset -300 Width & -200 Height',
 *                 anchor: '-300 -200'   
 *             },
 *             {
 *                 xtype: 'panel',
 *                 title: 'Mixed Offset and Percent',
 *                 anchor: '-250 20%'
 *             }
 *         ]
 *     });
 */
Ext.define('Ext.layout.container.Anchor', {

    /* Begin Definitions */

    alias: 'layout.anchor',
    extend: 'Ext.layout.container.Auto',
    alternateClassName: 'Ext.layout.AnchorLayout',

    /* End Definitions */

    type: 'anchor',

    /**
     * @cfg {String} anchor
     *
     * This configuation option is to be applied to **child `items`** of a container managed by
     * this layout (ie. configured with `layout:'anchor'`).
     *
     * This value is what tells the layout how an item should be anchored to the container. `items`
     * added to an AnchorLayout accept an anchoring-specific config property of **anchor** which is a string
     * containing two values: the horizontal anchor value and the vertical anchor value (for example, '100% 50%').
     * The following types of anchor values are supported:
     *
     * - **Percentage** : Any value between 1 and 100, expressed as a percentage.
     *
     *   The first anchor is the percentage width that the item should take up within the container, and the
     *   second is the percentage height.  For example:
     *
     *       // two values specified
     *       anchor: '100% 50%' // render item complete width of the container and
     *                          // 1/2 height of the container
     *       // one value specified
     *       anchor: '100%'     // the width value; the height will default to auto
     *
     * - **Offsets** : Any positive or negative integer value.
     *
     *   This is a raw adjustment where the first anchor is the offset from the right edge of the container,
     *   and the second is the offset from the bottom edge. For example:
     *
     *       // two values specified
     *       anchor: '-50 -100' // render item the complete width of the container
     *                          // minus 50 pixels and
     *                          // the complete height minus 100 pixels.
     *       // one value specified
     *       anchor: '-50'      // anchor value is assumed to be the right offset value
     *                          // bottom offset will default to 0
     *
     * - **Sides** : Valid values are `right` (or `r`) and `bottom` (or `b`).
     *
     *   Either the container must have a fixed size or an anchorSize config value defined at render time in
     *   order for these to have any effect.
     *   
     * - **Mixed** :
     *
     *   Anchor values can also be mixed as needed.  For example, to render the width offset from the container
     *   right edge by 50 pixels and 75% of the container's height use:
     *   
     *       anchor:   '-50 75%'
     */

    /**
     * @cfg {String} defaultAnchor
     * Default anchor for all child **container** items applied if no anchor or specific width is set on the child item.
     */
    defaultAnchor: '100%',

    parseAnchorRE: /^(r|right|b|bottom)$/i,

    manageOverflow: true,

    // Anchor layout does not read the size of individual items in the shrink-wrapping
    // dimension(s) because, as a subclass of autocontainer, it measures them as a whole
    // using an outer element.  However, anchor layout may set the size of its items in
    // non-shrink-wrapping dimension(s).
    setsItemSize: true,

    beginLayoutCycle: function (ownerContext) {
        var me = this,
            dimensions = 0,
            anchorSpec, childContext, childItems, i, length, target;

        me.callParent(arguments);

        childItems = ownerContext.childItems; // populated by callParent
        length = childItems.length;

        for (i = 0; i < length; ++i) {
            childContext = childItems[i];
            anchorSpec = childContext.target.anchorSpec;

            if (anchorSpec) {
                if (childContext.widthModel.calculated && anchorSpec.right) {
                    dimensions |= 1;
                }
                if (childContext.heightModel.calculated && anchorSpec.bottom) {
                    dimensions |= 2;
                }

                if (dimensions == 3) { // if (both dimensions in play)
                    break;
                }
            }
        }

        ownerContext.anchorDimensions = dimensions;

        //<debug>
        me.sanityCheck(ownerContext);
        //</debug>
    },

    calculateItems: function (ownerContext, containerSize) {
        var me = this,
            childItems = ownerContext.childItems,
            length = childItems.length,
            gotHeight = containerSize.gotHeight,
            gotWidth = containerSize.gotWidth,
            ownerHeight = containerSize.height,
            ownerWidth = containerSize.width,
            knownDimensions = (gotWidth ? 1 : 0) | (gotHeight ? 2 : 0),
            anchorDimensions = ownerContext.anchorDimensions,
            anchorSpec, childContext, childMargins, height, i, width;

        if (!anchorDimensions) {
            return true;
        }

        for (i = 0; i < length; i++) {
            childContext = childItems[i];
            childMargins = childContext.getMarginInfo();
            anchorSpec = childContext.target.anchorSpec;

            // Check widthModel in case "defaults" has applied an anchor to a component
            // that also has width (which must win). If we did not make this check in this
            // way, we would attempt to calculate a width where it had been configured.
            //
            if (gotWidth && childContext.widthModel.calculated) {
                width = anchorSpec.right(ownerWidth) - childMargins.width;
                width = me.adjustWidthAnchor(width, childContext);

                childContext.setWidth(width);
            }

            // Repeat for height
            if (gotHeight && childContext.heightModel.calculated) {
                height = anchorSpec.bottom(ownerHeight) - childMargins.height;
                height = me.adjustHeightAnchor(height, childContext);

                childContext.setHeight(height);
            }
        }

        // If all required dimensions are known, we're done
        return (knownDimensions & anchorDimensions) === anchorDimensions;
    },

    //<debug>
    sanityCheck: function (ownerContext) {
        var shrinkWrapWidth = ownerContext.widthModel.shrinkWrap,
            shrinkWrapHeight = ownerContext.heightModel.shrinkWrap,
            children = ownerContext.childItems,
            anchorSpec, comp, childContext,
            i, length;

        for (i = 0, length = children.length; i < length; ++i) {
            childContext = children[i];
            comp = childContext.target;
            anchorSpec = comp.anchorSpec;

            if (anchorSpec) {
                if (childContext.widthModel.calculated && anchorSpec.right) {
                    if (shrinkWrapWidth) {
                        Ext.log({
                            level: 'warn',
                            msg: 'Right anchor on '+comp.id+' in shrinkWrap width container'
                        });
                    }
                }

                if (childContext.heightModel.calculated && anchorSpec.bottom) {
                    if (shrinkWrapHeight) {
                        Ext.log({
                            level: 'warn',
                            msg: 'Bottom anchor on '+comp.id+' in shrinkWrap height container'
                        });
                    }
                }
            }
        }
    },
    //</debug>

    // private
    anchorFactory: {
        offset: function (delta) {
            return function(v) {
                return v + delta;
            };
        },
        ratio: function (ratio) {
            return function(v) {
                return Math.floor(v * ratio);
            };
        },
        standard: function (diff) {
            return function(v) {
                return v - diff;
            };
        }
    },

    parseAnchor: function(a, start, cstart) {
        if (a && a != 'none') {
            var factory = this.anchorFactory,
                delta;

            if (this.parseAnchorRE.test(a)) {
                return factory.standard(cstart - start);
            }    
            if (a.indexOf('%') != -1) {
                return factory.ratio(parseFloat(a.replace('%', '')) * 0.01);
            }    
            delta = parseInt(a, 10);
            if (!isNaN(delta)) {
                return factory.offset(delta);
            }
        }
        return null;
    },

    // private
    adjustWidthAnchor: function(value, childContext) {
        return value;
    },

    // private
    adjustHeightAnchor: function(value, childContext) {
        return value;
    },

    configureItem: function(item) {
        var me = this,
            owner = me.owner,
            anchor= item.anchor,
            anchorsArray,
            anchorWidth,
            anchorHeight;

        me.callParent(arguments);

        if (!item.anchor && item.items && !Ext.isNumber(item.width)) {
            item.anchor = anchor = me.defaultAnchor;
        }

        /**
         * @cfg {Number/Object} anchorSize
         * Defines the anchoring size of container.
         * Either a number to define the width of the container or an object with `width` and `height` fields.
         * @member Ext.container.Container
         */ 
        if (owner.anchorSize) {
            if (typeof owner.anchorSize == 'number') {
                anchorWidth = owner.anchorSize;
            } else {
                anchorWidth = owner.anchorSize.width;
                anchorHeight = owner.anchorSize.height;
            }
        } else {
            anchorWidth = owner.initialConfig.width;
            anchorHeight = owner.initialConfig.height;
        }

        if (anchor) {
            // cache all anchor values
            anchorsArray = anchor.split(' ');
            item.anchorSpec = {
                right: me.parseAnchor(anchorsArray[0], item.initialConfig.width, anchorWidth),
                bottom: me.parseAnchor(anchorsArray[1], item.initialConfig.height, anchorHeight)
            };
        }
    },

    sizePolicy: {
        $: {
            readsWidth: 1,
            readsHeight: 1,
            setsWidth: 0,
            setsHeight: 0
        },
        b: {
            readsWidth: 1,
            readsHeight: 0,
            setsWidth: 0,
            setsHeight: 1
        },
        r: {
            $: {
                readsWidth: 0,
                readsHeight: 1,
                setsWidth: 1,
                setsHeight: 0
            },
            b: {
                readsWidth: 0,
                readsHeight: 0,
                setsWidth: 1,
                setsHeight: 1
            }
        }
    },

    getItemSizePolicy: function (item) {
        var anchorSpec = item.anchorSpec,
            key = '$',
            policy = this.sizePolicy,
            sizeModel;

        if (anchorSpec) {
            sizeModel = this.owner.getSizeModel();
            if (anchorSpec.right && !sizeModel.width.shrinkWrap) {
                policy = policy.r;
            }
            if (anchorSpec.bottom && !sizeModel.height.shrinkWrap) {
                key = 'b';
            }
        }

        return policy[key];
    }
});
