/**
 * This override provides extra, border layout specific methods for `Ext.Component`. The
 * `Ext.layout.container.Border` class requires this override so that the added functions
 * are only included in a build when `border` layout is used.
 */
Ext.define('Ext.layout.container.border.Region', {
    override: 'Ext.Component',

    /**
     * This method is called by the `Ext.layout.container.Border` class when instances are
     * added as regions to the layout. Since it is valid to add any component to a border
     * layout as a region, this method must be added to `Ext.Component` but is only ever
     * called when that component is owned by a `border` layout.
     * @private
     */
    initBorderRegion: function () {
        var me = this;

        if (!me._borderRegionInited) {
            me._borderRegionInited = true;

            // Now that border regions can have dynamic region/weight, these need to be
            // saved to state as they change:
            me.addStateEvents(['changeregion', 'changeweight']);

            // We override getState on the instance for a couple reasons. Firstly, since
            // there are very few border regions in an application, the overhead here is
            // not a concern. Secondly, if this method were on the prototype it would
            // impact all components.
            Ext.override(me, {
                getState: function () {
                    var state = me.callParent();

                    // Now that border regions can have dynamic region/weight, these need to be saved
                    // to state:
                    state = me.addPropertyToState(state, 'region');
                    state = me.addPropertyToState(state, 'weight');

                    return state;
                }
            });
        }
    },

    /**
     * Returns the owning container if that container uses `border` layout. Otherwise
     * this method returns `null`.
     * @return {Ext.container.Container} The owning border container or `null`.
     * @private
     */
    getOwningBorderContainer: function () {
        var layout = this.getOwningBorderLayout();
        return layout && layout.owner;
    },

    /**
     * Returns the owning `border` (`Ext.layout.container.Border`) instance if there is
     * one. Otherwise this method returns `null`.
     * @return {Ext.layout.container.Border} The owning border layout or `null`.
     * @private
     */
    getOwningBorderLayout: function () {
        // the ownerLayot (if set) may or may not be a border layout
        var layout = this.ownerLayout;
        return (layout && layout.isBorderLayout) ? layout : null;
    },

    /**
     * This method changes the `region` config property for this border region. This is
     * only valid if this component is in a `border` layout (`Ext.layout.container.Border`).
     * @param {String} region The new `region` value (`"north"`, `"south"`, `"east"` or
     * `"west"`).
     * @return {String} The previous value of the `region` property.
     */
    setRegion: function (region) {
        var me = this,
            borderLayout,
            old = me.region;

        //<debug>
        if (typeof region !== 'string') {
            // This method used to be basically the same as setBox, so check for an
            // accidental use of the old signature.
            Ext.Error.raise('Use setBox to set the size or position of a component.');
        }
        //</debug>

        if (region !== old) {
            borderLayout = me.getOwningBorderLayout();
            if (borderLayout) {
                var regionFlags = borderLayout.regionFlags[region],
                    placeholder = me.placeholder,
                    splitter = me.splitter,
                    owner = borderLayout.owner,
                    regionMeta = borderLayout.regionMeta,
                    collapsed = me.collapsed || me.floated,
                    delta, items, index;

                if (me.fireEventArgs('beforechangeregion', [me, region]) === false) {
                    return old;
                }
                Ext.suspendLayouts();

                me.region = region;
                Ext.apply(me, regionFlags);

                if (me.updateCollapseTool) {
                    me.updateCollapseTool();
                }

                if (splitter) {
                    // splitter.region = region; -- we don't set "region" on splitters!
                    Ext.apply(splitter, regionFlags);
                    splitter.updateOrientation();

                    items = owner.items;
                    index = items.indexOf(me);
                    if (index >= 0) {
                        delta = regionMeta[region].splitterDelta;
                        if (items.getAt(index + delta) !== splitter) {
                            // splitter is not where we expect it, so move it there
                            items.remove(splitter);
                            index = items.indexOf(me);  // could have changed
                            if (delta > 0) {
                                ++index;
                            }
                            // else, insert at index and splitter will be before the item
                            items.insert(index, splitter);

                            // Now that the splitter is in the right place in me.items,
                            // the layout will fix up the DOM childNode to be at the same
                            // index as well.
                        }
                    }
                }
                if (placeholder) {
                    // The collapsed item is potentially remembering wrong things (for
                    // example, if it was collapsed as a West region and changed to be
                    // North). The only simple answer here is to expand/collapse the
                    // item (w/o animation).
                    if (collapsed) {
                        me.expand(false);
                    }

                    owner.remove(placeholder);
                    me.placeholder = null; // force creation of a new placeholder

                    if (collapsed) {
                        me.collapse(null, false);
                    }
                }

                owner.updateLayout();
                Ext.resumeLayouts(true);

                me.fireEventArgs('changeregion', [me, old]);
            } else {
                me.region = region; // maybe not added yet
            }
        }

        return old;
    },

    /**
     * Sets the `weight` config property for this component. This is only valid if this
     * component is in a `border` layout (`Ext.layout.container.Border`).
     * @param {Number} weight The new `weight` value.
     * @return {Number} The previous value of the `weight` property.
     */
    setWeight: function (weight) {
        var me = this,
            ownerCt = me.getOwningBorderContainer(),
            placeholder = me.placeholder,
            old = me.weight;

        if (weight !== old) {
            if (me.fireEventArgs('beforechangeweight', [me, weight]) !== false) {
                me.weight = weight;
                if (placeholder) {
                    placeholder.weight = weight;
                }
                if (ownerCt) {
                    ownerCt.updateLayout();
                }
                me.fireEventArgs('changeweight', [me, old]);
            }
        }

        return old;
    }
},
function (Component) {
    var proto = Component.prototype;

    // Aliases for v4 compat
    proto.setBorderRegion = proto.setRegion;
    proto.setRegionWeight = proto.setWeight;
});
