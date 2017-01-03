/**
 * Simple class that can provide a shadow effect for any element.  Note that the element
 * MUST be absolutely positioned, and the shadow does not provide any shimming.  This
 * should be used only in simple cases - for more advanced functionality that can also
 * provide the same shadow effect, see the {@link Ext.Layer} class.
 */
Ext.define('Ext.Shadow', {
    requires: ['Ext.ShadowPool'],

    localXYNames: {
        get: 'getLocalXY',
        set: 'setLocalXY'
    },

    /**
     * Creates new Shadow.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        var me = this,
            adjusts,
            offset,
            rad;
        
        Ext.apply(me, config);
        if (!Ext.isString(me.mode)) {
            me.mode = me.defaultMode;
        }
        offset = me.offset;
        rad = Math.floor(offset / 2);
        me.opacity = 50;
        switch (me.mode.toLowerCase()) {
            // all this hideous nonsense calculates the various offsets for shadows
            case "drop":
                if (Ext.supports.CSS3BoxShadow) {
                    adjusts = {
                        t: offset,
                        l: offset,
                        h: -offset,
                        w: -offset
                    };
                }
                else {
                    adjusts = {
                        t: -rad,
                        l: -rad,
                        h: -rad,
                        w: -rad
                    };
                }
                break;
            case "sides":
                if (Ext.supports.CSS3BoxShadow) {
                    adjusts = {
                        t: offset,
                        l: 0,
                        h: -offset,
                        w: 0
                    };
                }
                else {
                    adjusts = {
                        t: - (1 + rad),
                        l: 1 + rad - 2 * offset,
                        h: -1,
                        w: rad - 1
                    };
                }
                break;
            case "frame":
                if (Ext.supports.CSS3BoxShadow) {
                    adjusts = {
                        t: 0,
                        l: 0,
                        h: 0,
                        w: 0
                    };
                }
                else {
                    adjusts = {
                        t: 1 + rad - 2 * offset,
                        l: 1 + rad - 2 * offset,
                        h: offset - rad - 1,
                        w: offset - rad - 1
                    };
                }
                break;
            case "bottom":
                if (Ext.supports.CSS3BoxShadow) {
                    adjusts = {
                        t: offset,
                        l: 0,
                        h: -offset,
                        w: 0
                    };
                }
                else {
                    adjusts = {
                        t: offset,
                        l: 0,
                        h: 0,
                        w: 0
                    };
                }
                break;
        }
        me.adjusts = adjusts;
    },

    /**
     * @private
     * Returns the shadow size on each side of the element in standard CSS order: top, right, bottom, left;
     * @return {Number[]} Top, right, bottom and left shadow size.
     */
    getShadowSize: function() {
        var me = this,
            offset = me.el ? me.offset : 0,
            result = [offset, offset, offset, offset],
            mode = me.mode.toLowerCase();

        // There are only offsets if the shadow element is present.
        if (me.el && mode !== 'frame') {
            result[0] = 0;
            if (mode == 'drop') {
                result[3] = 0;
            }
        }
        return result;
    },

    /**
     * @cfg {String} mode
     * The shadow display mode.  Supports the following options:
     *
     * - sides : Shadow displays on both sides and bottom only
     * - frame : Shadow displays equally on all four sides
     * - drop : Traditional bottom-right drop shadow
     */

    /**
     * @cfg {Number} offset
     * The number of pixels to offset the shadow from the element
     */
    offset: 4,

    // private
    defaultMode: "drop",

    // private - CSS property to use to set the box shadow
    boxShadowProperty: (function() {
        var property = 'boxShadow',
            style = document.documentElement.style;

        if (!('boxShadow' in style)) {
            if ('WebkitBoxShadow' in style) {
                // Safari prior to version 5.1 and Chrome prior to version 10
                property = 'WebkitBoxShadow';
            }
            else if ('MozBoxShadow' in style) {
                // FF 3.5 & 3.6
                property = 'MozBoxShadow';
            }
        }

        return property;
    }()),

    /**
     * Displays the shadow under the target element
     * @param {String/HTMLElement/Ext.dom.Element} targetEl The id or element under which the shadow should display
     */
    show: function(target) {
        var me = this,
            index, xy;

        target = Ext.get(target);
        
        // DOM reads first...
        index = (parseInt(target.getStyle("z-index"), 10) - 1) || 0;
        xy = target[me.localXYNames.get]();

        // DOM writes...
        if (!me.el) {
            me.el = Ext.ShadowPool.pull();
            // Shadow elements are shared, so fix position to match current owner
            if (me.fixed) {
                me.el.dom.style.position = 'fixed';
            } else {
                me.el.dom.style.position = '';
            }
            if (me.el.dom.nextSibling != target.dom) {
                me.el.insertBefore(target);
            }
        }
        me.el.setStyle("z-index", me.zIndex || index);
        if (Ext.isIE && !Ext.supports.CSS3BoxShadow) {
            me.el.dom.style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=" + me.opacity + ") progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (me.offset) + ")";
        }
        me.realign(
            xy[0],
            xy[1],
            target.dom.offsetWidth,
            target.dom.offsetHeight
        );
        me.el.dom.style.display = "block";
    },

    /**
     * Returns true if the shadow is visible, else false
     */
    isVisible: function() {
        return this.el ? true: false;
    },

    /**
     * Direct alignment when values are already available. Show must be called at least once before
     * calling this method to ensure it is initialized.
     * @param {Number} left The target element left position
     * @param {Number} top The target element top position
     * @param {Number} width The target element width
     * @param {Number} height The target element height
     */
    realign: function(l, t, targetWidth, targetHeight) {
        if (!this.el) {
            return;
        }
        var adjusts = this.adjusts,
            el = this.el,
            targetStyle = el.dom.style,
            shadowWidth,
            shadowHeight,
            sws,
            shs;

        el[this.localXYNames.set](l + adjusts.l, t + adjusts.t);
        shadowWidth = Math.max(targetWidth + adjusts.w, 0);
        shadowHeight = Math.max(targetHeight + adjusts.h, 0);
        sws = shadowWidth + "px";
        shs = shadowHeight + "px";
        if (targetStyle.width != sws || targetStyle.height != shs) {
            targetStyle.width = sws;
            targetStyle.height = shs;

            if (Ext.supports.CSS3BoxShadow) {
                targetStyle[this.boxShadowProperty] = '0 0 ' + (this.offset + 2) + 'px #888';
            }
        }
    },

    /**
     * Hides this shadow
     */
    hide: function() {
        var me = this;
        
        if (me.el) {
            me.el.dom.style.display = "none";
            Ext.ShadowPool.push(me.el);
            delete me.el;
        }
    },

    /**
     * Adjust the z-index of this shadow
     * @param {Number} zindex The new z-index
     */
    setZIndex: function(z) {
        this.zIndex = z;
        if (this.el) {
            this.el.setStyle("z-index", z);
        }
    },
    
    /**
     * Sets the opacity of the shadow
     * @param {Number} opacity The opacity
     */
    setOpacity: function(opacity){
        if (this.el) {
            if (Ext.isIE && !Ext.supports.CSS3BoxShadow) {
                opacity = Math.floor(opacity * 100 / 2) / 100;
            }
            this.opacity = opacity;
            this.el.setOpacity(opacity);
        }
    }
});