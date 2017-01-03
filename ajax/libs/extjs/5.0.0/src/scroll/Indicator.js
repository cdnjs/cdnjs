/**
 * Provides a visual indicator of scroll position while scrolling using a touch scroller
 *
 * @private
 */
Ext.define('Ext.scroll.Indicator', {

    config: {
        /**
         * @cfg {String} axis ('x' or 'y')
         */
        axis: null,

        /**
         * @cfg {Ext.dom.Element} containerEl The element in which to render the indicator
         */
        containerEl: null,

        /**
         * @cfg {Ext.scroll.Scroller} scroller The scroller instance
         */
        scroller: null,

        /**
         * @cfg {Number} minLength The minimum length for the indicator. Defaults to the
         * indicator's "size" (the width of vertical or height of horizontal indicators)
         */
        minLength: null,

        /**
         * @cfg {Number} scrollSize The scroller's size on the configured {@link #axis}
         */
        scrollSize: null,

        /**
         * @cfg {Number} maxScrollPosition The scroller's maximum scroll position on the
         * configured {@link #axis}
         */
        maxScrollPosition: null,

        /**
         * @cfg {Boolean} hasOpposite `true` if this indicator must leave room for a
         * second indicator on the opposite axis
         */
        hasOpposite: null
    },

    hideAnimConfig: {
        to: {
            opacity: 0
        },
        duration: 300
    },

    names: {
        x: {
            side: 'l',
            getSize: 'getHeight',
            clientSize: 'clientWidth',
            setLength: 'setWidth',
            setPosition: 'setLocalX'
        },
        y: {
            side: 't',
            getSize: 'getWidth',
            clientSize: 'clientHeight',
            setLength: 'setHeight',
            setPosition: 'setLocalY'
        }
    },

    cls: Ext.baseCSSPrefix + 'scroll-indicator',

    constructor: function(config) {
        var me = this,
            minLength, size, axis;

        me.initConfig(config);

        axis = me.getAxis();

        me.names = me.names[axis];

        me.el = me.getContainerEl().createChild({
            cls: me.cls + ' ' + me.cls + '-' + axis
        });

        if (!me.size) {
            me.cacheStyles();
        }

        minLength = me.getMinLength();
        size = me.size;

        if (!minLength || minLength < size) {
            me.setMinLength(size);
        }
    },

    cacheStyles: function() {
        var me = this,
            proto = me.self.prototype,
            el = me.el,
            axis = me.getAxis(),
            names = me.names;

        /**
         * @property {Number} size
         * The indicator's size (width if vertical, height if horizontal)
         */
        proto.size = el[names.getSize]();

        /**
         * @property {Number} margin
         * The indicator's margin (the space between the indicator and the container's edge)
         */
        proto.margin = el.getMargin(names.side);
    },

    hide: function() {
        this.el.animate(this.hideAnimConfig);
    },

    refreshLength: function() {
        var me = this,
            names = me.names,
            scrollSize = me.getScrollSize(),
            containerSize = me.getContainerEl().dom[names.clientSize],
            ratio = containerSize / scrollSize,
            hasOpposite = me.getHasOpposite(),
            baseSizeAdjust = me.margin * 2,
            sizeAdjust = hasOpposite ? (baseSizeAdjust + me.size) : baseSizeAdjust,
            length = Math.max(Math.round((containerSize - sizeAdjust) * ratio), me.getMinLength());

        me.sizeAdjust = sizeAdjust;

        /**
         * @property {Number} length
         * The indicator's "length" (height for vertical indicators, or width for
         * horizontal indicators)
         */
        me.length = length;
        me.el[names.setLength](length);
    },

    /**
     * Sets the value of this scroll indicator.
     * @param {Number} value The scroll position on the configured {@link #axis}
     */
    setValue: function(value) {
        var me = this,
            el = me.el,
            names = me.names,
            maxScrollPosition = me.getMaxScrollPosition(),
            containerSize = me.getContainerEl().dom[names.clientSize],
            baseLength = me.length,
            minLength = me.getMinLength(),
            length = baseLength,
            maxPosition = containerSize - baseLength - me.sizeAdjust,
            round = Math.round,
            max = Math.max,
            position;

        if (value < 0) {
            length = round(max(
                baseLength + (baseLength * value / containerSize),
                minLength
            ));
            position = 0;
        } else if (value > maxScrollPosition) {
            length = round(max(
                baseLength - (baseLength *
                    (value - maxScrollPosition) / containerSize),
                minLength
            ));
            position = maxPosition + baseLength - length;
        } else {
            position = round(value / maxScrollPosition * maxPosition);
        }

        el[names.setPosition](position);
        el[names.setLength](length);
    },

    show: function() {
        var me = this,
            el = me.el,
            anim = el.getActiveAnimation();

        if (anim) {
            anim.end();
        }

        me.refreshLength();
        el.setStyle('opacity', '');
    },

    destroy: function() {
        this.el.destroy();
    }

});
