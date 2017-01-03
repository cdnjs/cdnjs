/**
 * This class is intended to be extended or created via the {@link Ext.Component#componentLayout layout}
 * configuration property.  See {@link Ext.Component#componentLayout} for additional details.
 * @private
 */
Ext.define('Ext.layout.component.Component', {
    extend: 'Ext.layout.Layout',

    type: 'component',

    isComponentLayout: true,

    nullBox: {},

    usesContentHeight: true,
    usesContentWidth: true,
    usesHeight: true,
    usesWidth: true,

    widthCache: {},
    heightCache: {},

    beginLayoutCycle: function (ownerContext, firstCycle) {
        var me = this,
            owner = me.owner,
            ownerCtContext = ownerContext.ownerCtContext,
            heightModel = ownerContext.heightModel,
            widthModel = ownerContext.widthModel,
            body = owner.el.dom === document.body,
            lastBox = owner.lastBox || me.nullBox,
            lastSize = owner.el.lastBox || me.nullBox,
            dirty = !body,
            ownerLayout, v, widthName, heightName;

        me.callParent(arguments);

        if (firstCycle) {
            if (me.usesContentWidth) {
                ++ownerContext.consumersContentWidth;
            }
            if (me.usesContentHeight) {
                ++ownerContext.consumersContentHeight;
            }
            if (me.usesWidth) {
                ++ownerContext.consumersWidth;
            }
            if (me.usesHeight) {
                ++ownerContext.consumersHeight;
            }

            if (ownerCtContext && !ownerCtContext.hasRawContent) {
                ownerLayout = owner.ownerLayout;

                if (ownerLayout) {
                    if (ownerLayout.usesWidth) {
                        ++ownerContext.consumersWidth;
                    }
                    if (ownerLayout.usesHeight) {
                        ++ownerContext.consumersHeight;
                    }
                }
            }
        }

        // we want to publish configured dimensions as early as possible and since this is
        // a write phase...

        if (widthModel.configured) {
            // If the owner.el is the body, owner.width is not dirty (we don't want to write
            // it to the body el). For other el's, the width may already be correct in the
            // DOM (e.g., it is rendered in the markup initially). If the width is not
            // correct in the DOM, this is only going to be the case on the first cycle.
            widthName = widthModel.names.width;

            if (!body) {
                dirty = me.setWidthInDom ||
                        (firstCycle ? owner[widthName] !== lastSize.width : widthModel.constrained);
            }

            ownerContext.setWidth(owner[widthName], dirty);
        } else if (ownerContext.isTopLevel) {
            if (widthModel.calculated) {
                v = lastBox.width;
                ownerContext.setWidth(v, /*dirty=*/v != lastSize.width);
            }

            v = lastBox.x;
            ownerContext.setProp('x', v, /*dirty=*/v != lastSize.x);
        }

        if (heightModel.configured) {
            heightName = heightModel.names.height;

            if (!body) {
                dirty = firstCycle ? owner[heightName] !== lastSize.height
                                   : heightModel.constrained;
            }

            ownerContext.setHeight(owner[heightName], dirty);
        } else if (ownerContext.isTopLevel) {
            if (heightModel.calculated) {
                v = lastBox.height;
                ownerContext.setHeight(v, v != lastSize.height);
            }

            v = lastBox.y;
            ownerContext.setProp('y', v, /*dirty=*/v != lastSize.y);
        }
    },

    finishedLayout: function(ownerContext) {
        var me = this,
            elementChildren = ownerContext.children,
            owner = me.owner,
            len, i, elContext, lastBox, props;

        // NOTE: In the code below we cannot use getProp because that will generate a layout dependency

        // Set lastBox on managed child Elements.
        // So that ContextItem.constructor can snag the lastBox for use by its undo method.
        if (elementChildren) {
            len = elementChildren.length;
            for (i = 0; i < len; i++) {
                elContext = elementChildren[i];
                elContext.el.lastBox = elContext.props;
            }
        }

        // Cache the size from which we are changing so that notifyOwner can notify the owningComponent with all essential information
        ownerContext.previousSize = me.lastComponentSize;

        // Cache the currently layed out size
        me.lastComponentSize = owner.el.lastBox = props = ownerContext.props;
        
        // lastBox is a copy of the defined props to allow save/restore of these (panel
        // collapse needs this)
        lastBox = owner.lastBox || (owner.lastBox = {});
        lastBox.x = props.x;
        lastBox.y = props.y;
        lastBox.width = props.width;
        lastBox.height = props.height;
        lastBox.invalid = false;
        
        me.callParent(arguments);
    },
    
    notifyOwner: function(ownerContext) {
        var me = this,
            currentSize = me.lastComponentSize,
            prevSize = ownerContext.previousSize,
            args = [currentSize.width, currentSize.height];

        if (prevSize) {
            args.push(prevSize.width, prevSize.height);
        }

        // Call afterComponentLayout passing new size, and only passing old size if there *was* an old size.
        me.owner.afterComponentLayout.apply(me.owner, args);
    },

    /**
     * Returns the owner component's resize element.
     * @return {Ext.dom.Element}
     */
    getTarget : function() {
        return this.owner.el;
    },

    /**
     * Returns the element into which rendering must take place. Defaults to the owner Component's encapsulating element.
     *
     * May be overridden in Component layout managers which implement an inner element.
     * @return {Ext.dom.Element}
     */
    getRenderTarget : function() {
        return this.owner.el;
    },

    cacheTargetInfo: function(ownerContext) {
        var me = this,
            targetInfo = me.targetInfo,
            target;

        if (!targetInfo) {
            target = ownerContext.getEl('getTarget', me);

            me.targetInfo = targetInfo = {
                padding: target.getPaddingInfo(),
                border: target.getBorderInfo()
            };
        }

        return targetInfo;
    },

    measureAutoDimensions: function (ownerContext, dimensions) {
        // Subtle But Important:
        // 
        // We don't want to call getProp/hasProp et.al. unless we in fact need that value
        // for our results! If we call it and don't need it, the layout manager will think
        // we depend on it and will schedule us again should it change.

        var me = this,
            owner = me.owner,
            containerLayout = owner.layout,
            heightModel = ownerContext.heightModel,
            widthModel = ownerContext.widthModel,
            boxParent = ownerContext.boxParent,
            isBoxParent = ownerContext.isBoxParent,
            target = ownerContext.target,
            props = ownerContext.props,
            isContainer,
            ret = {
                gotWidth: false,
                gotHeight: false,
                isContainer: (isContainer = !ownerContext.hasRawContent)
            },
            hv = dimensions || 3,
            zeroWidth, zeroHeight,
            needed = 0,
            got = 0,
            ready, size, temp, key, cache;

        // Note: this method is called *a lot*, so we have to be careful not to waste any
        // time or make useless calls or, especially, read the DOM when we can avoid it.

        //---------------------------------------------------------------------
        // Width

        if (widthModel.shrinkWrap && ownerContext.consumersContentWidth) {
            ++needed;
            zeroWidth = !(hv & 1);

            if (isContainer) {
                // as a componentLayout for a container, we rely on the container layout to
                // produce contentWidth...
                if (zeroWidth) {
                    ret.contentWidth = 0;
                    ret.gotWidth = true;
                    ++got;
                } else if ((ret.contentWidth = ownerContext.getProp('contentWidth')) !== undefined) {
                    ret.gotWidth = true;
                    ++got;
                }
            } else {
                size = props.contentWidth;

                if (typeof size == 'number') { // if (already determined)
                    ret.contentWidth = size;
                    ret.gotWidth = true;
                    ++got;
                } else {
                    if (zeroWidth) {
                        ready = true;
                    } else if (!ownerContext.hasDomProp('containerChildrenSizeDone')) {
                        ready = false;
                    } else if (isBoxParent || !boxParent || boxParent.widthModel.shrinkWrap) {
                        // if we have no boxParent, we are ready, but a shrinkWrap boxParent
                        // artificially provides width early in the measurement process so
                        // we are ready to go in that case as well...
                        ready = true;
                    } else {
                        // lastly, we have a boxParent that will be given a width, so we
                        // can wait for that width to be set in order to properly measure
                        // whatever is inside...
                        ready = boxParent.hasDomProp('width');
                    }

                    if (ready) {
                        if (zeroWidth) {
                            temp = 0;
                        } else if (containerLayout && containerLayout.measureContentWidth) {
                            // Allow the container layout to do the measurement since it
                            // may have a better idea of how to do it even with no items:
                            temp = containerLayout.measureContentWidth(ownerContext);
                        } else {
                            if (target.cacheWidth) {
                                // if all instances of a given xtype/UI are the same size, only read the DOM once
                                // to measure the first instance.  Thereafter, retrieve the width from the cache.
                                key = target.xtype + '-' + target.ui;
                                cache = me.widthCache;
                                temp = cache[key] || (cache[key] = me.measureContentWidth(ownerContext));
                            } else {
                                temp = me.measureContentWidth(ownerContext);
                            }
                        }

                        if (!isNaN(ret.contentWidth = temp)) {
                            ownerContext.setContentWidth(temp, true);
                            ret.gotWidth = true;
                            ++got;
                        }
                    }
                }
            }
        } else if (widthModel.natural && ownerContext.consumersWidth) {
            ++needed;
            size = props.width;
            // zeroWidth does not apply

            if (typeof size == 'number') { // if (already determined)
                ret.width = size;
                ret.gotWidth = true;
                ++got;
            } else {
                if (isBoxParent || !boxParent) {
                    ready = true;
                } else {
                    // lastly, we have a boxParent that will be given a width, so we
                    // can wait for that width to be set in order to properly measure
                    // whatever is inside...
                    ready = boxParent.hasDomProp('width');
                }

                if (ready) {
                    if (!isNaN(ret.width = me.measureOwnerWidth(ownerContext))) {
                        ownerContext.setWidth(ret.width, false);
                        ret.gotWidth = true;
                        ++got;
                    }
                }
            }
        }

        //---------------------------------------------------------------------
        // Height

        if (heightModel.shrinkWrap && ownerContext.consumersContentHeight) {
            ++needed;
            zeroHeight = !(hv & 2);

            if (isContainer) {
                // don't ask unless we need to know...
                if (zeroHeight) {
                    ret.contentHeight = 0;
                    ret.gotHeight = true;
                    ++got;
                } else if ((ret.contentHeight = ownerContext.getProp('contentHeight')) !== undefined) {
                    ret.gotHeight = true;
                    ++got;
                }
            } else {
                size = props.contentHeight;

                if (typeof size == 'number') { // if (already determined)
                    ret.contentHeight = size;
                    ret.gotHeight = true;
                    ++got;
                } else {
                    if (zeroHeight) {
                        ready = true;
                    } else if (!ownerContext.hasDomProp('containerChildrenSizeDone')) {
                        ready = false;
                    } else if (owner.noWrap) {
                        ready = true;
                    } else if (!widthModel.shrinkWrap) {
                        // fixed width, so we need the width to determine the height...
                        ready = (ownerContext.bodyContext || ownerContext).hasDomProp('width');// && (!ownerContext.bodyContext || ownerContext.bodyContext.hasDomProp('width'));
                    } else if (isBoxParent || !boxParent || boxParent.widthModel.shrinkWrap) {
                        // if we have no boxParent, we are ready, but an autoWidth boxParent
                        // artificially provides width early in the measurement process so
                        // we are ready to go in that case as well...
                        ready = true;
                    } else {
                        // lastly, we have a boxParent that will be given a width, so we
                        // can wait for that width to be set in order to properly measure
                        // whatever is inside...
                        ready = boxParent.hasDomProp('width');
                    }

                    if (ready) {
                        if (zeroHeight) {
                            temp = 0;
                        } else if (containerLayout && containerLayout.measureContentHeight) {
                            // Allow the container layout to do the measurement since it
                            // may have a better idea of how to do it even with no items:
                            temp = containerLayout.measureContentHeight(ownerContext);
                        } else {
                           if (target.cacheHeight) {
                                // if all instances of a given xtype/UI are the same size, only read the DOM once
                                // to measure the first instance.  Thereafter, retrieve the height from the cache.
                                key = target.xtype + '-' + target.ui;
                                cache = me.heightCache;
                                temp = cache[key] || (cache[key] = me.measureContentHeight(ownerContext));
                            } else {
                                temp = me.measureContentHeight(ownerContext);
                            }
                        }

                        if (!isNaN(ret.contentHeight = temp)) {
                            ownerContext.setContentHeight(temp, true);
                            ret.gotHeight = true;
                            ++got;
                        }
                    }
                }
            }
        } else if (heightModel.natural && ownerContext.consumersHeight) {
            ++needed;
            size = props.height;
            // zeroHeight does not apply

            if (typeof size == 'number') { // if (already determined)
                ret.height = size;
                ret.gotHeight = true;
                ++got;
            } else {
                if (isBoxParent || !boxParent) {
                    ready = true;
                } else {
                    // lastly, we have a boxParent that will be given a width, so we
                    // can wait for that width to be set in order to properly measure
                    // whatever is inside...
                    ready = boxParent.hasDomProp('width');
                }

                if (ready) {
                    if (!isNaN(ret.height = me.measureOwnerHeight(ownerContext))) {
                        ownerContext.setHeight(ret.height, false);
                        ret.gotHeight = true;
                        ++got;
                    }
                }
            }
        }

        if (boxParent) {
            ownerContext.onBoxMeasured();
        }

        ret.gotAll = got == needed;
        // see if we can avoid calling this method by storing something on ownerContext.
        return ret;
    },

    measureContentWidth: function (ownerContext) {
        // contentWidth includes padding, but not border, framing or margins
        return ownerContext.el.getWidth() - ownerContext.getFrameInfo().width;
    },

    measureContentHeight: function (ownerContext) {
        // contentHeight includes padding, but not border, framing or margins
        return ownerContext.el.getHeight() - ownerContext.getFrameInfo().height;
    },

    measureOwnerHeight: function (ownerContext) {
        return ownerContext.el.getHeight();
    },

    measureOwnerWidth: function (ownerContext) {
        return ownerContext.el.getWidth();
    }
});
