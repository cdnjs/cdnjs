/**
 * @class Ext.chart.Highlight
 * A mixin providing highlight functionality for Ext.chart.series.Series.
 */
Ext.define('Ext.chart.Highlight', {

    /* Begin Definitions */

    requires: ['Ext.fx.Anim'],

    /* End Definitions */

    /**
     * @cfg {Boolean/Object} [highlight=false] Set to `true` to enable highlighting using the {@link #highlightCfg default highlight attributes}.
     * 
     * Can also be an object with style properties (i.e fill, stroke, stroke-width, radius) which are may override the {@link #highlightCfg default highlight attributes}.
     */
    highlight: false,

    /**
     * @property {Object} highlightCfg The default properties to apply as a highight. Value is
     *
     *    {
     *        fill: '#fdd',
     *        "stroke-width": 5,
     *        stroke: "#f55'
     *    }
     */
    highlightCfg : {
        fill: '#fdd',
        "stroke-width": 5,
        stroke: '#f55'
    },

    constructor: function(config) {
        // If configured with a highlight object, apply to to *a local copy of* this class's highlightCfg. Do not mutate the prototype's copy.
        if (config.highlight && (typeof config.highlight !== 'boolean')) { //is an object
            this.highlightCfg = Ext.merge({}, this.highlightCfg, config.highlight);
        }
    },

    /**
     * Highlight the given series item.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightItem: function(item) {
        if (!item) {
            return;
        }
        
        var me = this,
            sprite = item.sprite,
            opts = Ext.merge({}, me.highlightCfg, me.highlight),
            surface = me.chart.surface,
            animate = me.chart.animate,
            p, from, to, pi;

        if (!me.highlight || !sprite || sprite._highlighted) {
            return;
        }
        if (sprite._anim) {
            sprite._anim.paused = true;
        }
        sprite._highlighted = true;
        if (!sprite._defaults) {
            sprite._defaults = Ext.apply({}, sprite.attr);
            from = {};
            to = {};
            // TODO: Clean up code below.
            for (p in opts) {
                if (! (p in sprite._defaults)) {
                    sprite._defaults[p] = surface.availableAttrs[p];
                }
                from[p] = sprite._defaults[p];
                to[p] = opts[p];
                if (Ext.isObject(opts[p])) {
                    from[p] = {};
                    to[p] = {};
                    Ext.apply(sprite._defaults[p], sprite.attr[p]);
                    Ext.apply(from[p], sprite._defaults[p]);
                    for (pi in sprite._defaults[p]) {
                        if (! (pi in opts[p])) {
                            to[p][pi] = from[p][pi];
                        } else {
                            to[p][pi] = opts[p][pi];
                        }
                    }
                    for (pi in opts[p]) {
                        if (! (pi in to[p])) {
                            to[p][pi] = opts[p][pi];
                        }
                    }
                }
            }
            sprite._from = from;
            sprite._to = to;
            sprite._endStyle = to;
        }
        if (animate) {
            sprite._anim = new Ext.fx.Anim({
                target: sprite,
                from: sprite._from,
                to: sprite._to,
                duration: 150
            });
        } else {
            sprite.setAttributes(sprite._to, true);
        }
    },

    /**
     * Un-highlight any existing highlights
     */
    unHighlightItem: function() {
        if (!this.highlight || !this.items) {
            return;
        }

        var me = this,
            items = me.items,
            len = items.length,
            opts = Ext.merge({}, me.highlightCfg, me.highlight),
            animate = me.chart.animate,
            i = 0,
            obj, p, sprite;
        for (; i < len; i++) {
            if (!items[i]) {
                continue;
            }
            sprite = items[i].sprite;
            if (sprite && sprite._highlighted) {
                if (sprite._anim) {
                    sprite._anim.paused = true;
                }
                obj = {};
                for (p in opts) {
                    if (Ext.isObject(sprite._defaults[p])) {
                        obj[p] = Ext.apply({}, sprite._defaults[p]);
                    }
                    else {
                        obj[p] = sprite._defaults[p];
                    }
                }
                if (animate) {
                    //sprite._to = obj;
                    sprite._endStyle = obj;
                    sprite._anim = new Ext.fx.Anim({
                        target: sprite,
                        to: obj,
                        duration: 150
                    });
                }
                else {
                    sprite.setAttributes(obj, true);
                }
                delete sprite._highlighted;
                //delete sprite._defaults;
            }
        }
    },

    cleanHighlights: function() {
        if (!this.highlight) {
            return;
        }

        var group = this.group,
            markerGroup = this.markerGroup,
            i = 0,
            l;
        for (l = group.getCount(); i < l; i++) {
            delete group.getAt(i)._defaults;
        }
        if (markerGroup) {
            for (l = markerGroup.getCount(); i < l; i++) {
                delete markerGroup.getAt(i)._defaults;
            }
        }
    }
});