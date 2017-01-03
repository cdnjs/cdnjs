/**
 * The Ext.chart package provides the capability to visualize data.
 * Each chart binds directly to a {@link Ext.data.Store store} enabling automatic updates of the chart.
 * A chart configuration object has some overall styling options as well as an array of axes
 * and series. A chart instance example could look like this:
 *
 *     new Ext.chart.CartesianChart({
 *         width: 800,
 *         height: 600,
 *         animation: true,
 *         store: store1,
 *         legend: {
 *             position: 'right'
 *         },
 *         axes: [
 *             // ...some axes options...
 *         ],
 *         series: [
 *             // ...some series options...
 *         ]
 *     });
 *
 * In this example we set the `width` and `height` of a chart; We decide whether our series are
 * animated or not and we select a store to be bound to the chart; We also set the legend to the right part of the
 * chart.
 *
 * You can register certain interactions such as {@link Ext.chart.interactions.PanZoom} on the chart by specify an
 * array of names or more specific config objects. All the events will be wired automatically.
 *
 * You can also listen to `itemXXX` events directly on charts. That case all the contained series will relay this event to the
 * chart.
 *
 * For more information about the axes and series configurations please check the documentation of
 * each series (Line, Bar, Pie, etc).
 *
 */

Ext.define('Ext.chart.AbstractChart', {

    extend: 'Ext.draw.Container',

    requires: [
        'Ext.chart.theme.Base',
        'Ext.chart.theme.Theme',
        'Ext.chart.series.Series',
        'Ext.chart.interactions.Abstract',
        'Ext.chart.axis.Axis',
        'Ext.data.StoreManager',
        'Ext.chart.Legend',
        'Ext.data.Store',
        'Ext.chart.overrides.AbstractChart'
    ],
    
    mixins: {
        themeManager: 'Ext.chart.theme.Theme'
    },

    defaultBindProperty: 'store',

    /**
     * @event beforerefresh
     * Fires before a refresh to the chart data is called.  If the `beforerefresh` handler returns
     * `false` the {@link #refresh} action will be canceled.
     * @param {Ext.chart.AbstractChart} this
     */

    /**
     * @event refresh
     * Fires after the chart data has been refreshed.
     * @param {Ext.chart.AbstractChart} this
     */

    /**
     * @event redraw
     * Fires after the chart is redrawn.
     * @param {Ext.chart.AbstractChart} this
     */

    /**
     * @event itemmousemove
     * Fires when the mouse is moved on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmouseup
     * Fires when a mouseup event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmousedown
     * Fires when a mousedown event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmouseover
     * Fires when the mouse enters a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmouseout
     * Fires when the mouse exits a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemclick
     * Fires when a click event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdoubleclick
     * Fires when a doubleclick event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtap
     * Fires when a tap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtapstart
     * Fires when a tapstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtapend
     * Fires when a tapend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtapcancel
     * Fires when a tapcancel event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtaphold
     * Fires when a taphold event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdoubletap
     * Fires when a doubletap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemsingletap
     * Fires when a singletap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtouchstart
     * Fires when a touchstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtouchmove
     * Fires when a touchmove event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtouchend
     * Fires when a touchend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdragstart
     * Fires when a dragstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdrag
     * Fires when a drag event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdragend
     * Fires when a dragend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itempinchstart
     * Fires when a pinchstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itempinch
     * Fires when a pinch event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itempinchend
     * Fires when a pinchend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemswipe
     * Fires when a swipe event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */

    /**
     * @property version Current Version of Touch Charts
     * @type {String}
     */
    version: '2.5.0',

    /**
     * @property {Object} themeAttrs The visual attributes of the current theme, e.g. axisLabelTop, seriesThemes...
     * @type {Object}
     */
    themeAttrs: null,

    delegationRegex: /^item([a-z]+)$/i,

    domEvents: new RegExp("click|focus|blur|paste|input|mousemove|mousedown|mouseup|mouseover|mouseout|keyup|keydown|keypress|submit|"+
                          "pinch|pinchstart|pinchend|touchmove|touchstart|touchend|rotate|rotatestart|rotateend|drag|dragstart|dragend|tap|doubletap|singletap"),

    config: {

        /**
         * @cfg {Ext.data.Store} store
         * The store that supplies data to this chart.
         */
        store: 'ext-empty-store',

        /**
         * @cfg {String} theme
         * The name of the theme to be used. A theme defines the colors and other visual displays of tick marks
         * on axis, text, title text, line colors, marker colors and styles, etc... Possible theme values are 'Base', 'Green',
         * 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' and also six category themes 'Category1' to 'Category6'. The default theme
         * is 'Base'.
         */
        theme: 'Base',

        /**
         * @cfg {Object} style
         * The style for the chart component.
         */
        style: null,

        /**
         * @cfg {Boolean/Object} shadow (optional) `true` for the default shadow configuration 
         * `{shadowOffsetX: 2, shadowOffsetY: 2, shadowBlur: 3, shadowColor: '#444'}`
         * or a standard shadow config object to be used for default chart shadows.
         */
        shadow: false,

        /**
         * @cfg {Boolean/Object} animation (optional) `true` for the default animation (easing: 'ease' and duration: 500)
         * or a standard animation config object to be used for default chart animations.
         */
        animation: !Ext.isIE8,

        /**
         * @cfg {Ext.chart.series.Series/Array} series
         * Array of {@link Ext.chart.series.Series Series} instances or config objects. For example:
         *
         *     series: [{
         *         type: 'column',
         *         axis: 'left',
         *         listeners: {
         *             'afterrender': function() {
         *                 console.log('afterrender');
         *             }
         *         },
         *         xField: 'category',
         *         yField: 'data1'
         *     }]
         */
        series: [],

        /**
         * @cfg {Ext.chart.axis.Axis/Array/Object} axes
         * Array of {@link Ext.chart.axis.Axis Axis} instances or config objects. For example:
         *
         *     axes: [{
         *         type: 'numeric',
         *         position: 'left',
         *         title: 'Number of Hits',
         *         minimum: 0
         *     }, {
         *         type: 'category',
         *         position: 'bottom',
         *         title: 'Month of the Year'
         *     }]
         */
        axes: [],

        /**
         * @cfg {Ext.chart.Legend/Object} legend
         */
        legend: null,

        /**
         * @cfg {Array} colors Array of colors/gradients to override the color of items and legends.
         */
        colors: null,

        /**
         * @cfg {Object|Number|String} insetPadding The amount of inset padding in pixels for the chart.
         * Inset padding is the padding from the boundary of the chart to any of its contents.
         */
        insetPadding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },

        /**
         * @cfg {Object} background Set the chart background. This can be a gradient object, image, or color.
         *
         * For example, if `background` were to be a color we could set the object as
         *
         *     background: '#ccc'
         *
         * You can specify an image by using:
         *
         *     background: {
         *         type: 'image',
         *         src: 'http://path.to.image/'
         *     }
         *
         * Also you can specify a gradient by using the gradient object syntax:
         *
         *     background: {
         *         type: 'linear',
         *         degrees: 0,
         *         stops: [
         *             {
         *                 offset: 0,
         *                 color: 'white'
         *             },
         *             {
         *                 offset: 1,
         *                 color: 'blue'
         *             }
         *         ]
         *     }
         */
        background: 'white',

        /**
         * @cfg {Array} interactions
         * Interactions are optional modules that can be plugged in to a chart to allow the user to interact
         * with the chart and its data in special ways. The `interactions` config takes an Array of Object
         * configurations, each one corresponding to a particular interaction class identified by a `type` property:
         *
         *     new Ext.chart.AbstractChart({
         *         renderTo: Ext.getBody(),
         *         width: 800,
         *         height: 600,
         *         store: store1,
         *         axes: [
         *             // ...some axes options...
         *         ],
         *         series: [
         *             // ...some series options...
         *         ],
         *         interactions: [{
         *             type: 'interactiontype'
         *             // ...additional configs for the interaction...
         *         }]
         *     });
         *
         * When adding an interaction which uses only its default configuration (no extra properties other than `type`),
         * you can alternately specify only the type as a String rather than the full Object:
         *
         *     interactions: ['reset', 'rotate']
         *
         * The current supported interaction types include:
         *
         * - {@link Ext.chart.interactions.PanZoom panzoom} - allows pan and zoom of axes
         * - {@link Ext.chart.interactions.ItemHighlight itemhighlight} - allows highlighting of series data points
         * - {@link Ext.chart.interactions.ItemInfo iteminfo} - allows displaying details of a data point in a popup panel
         * - {@link Ext.chart.interactions.Rotate rotate} - allows rotation of pie and radar series
         *
         * See the documentation for each of those interaction classes to see how they can be configured.
         *
         * Additional custom interactions can be registered using `'interactions.'` alias prefix.
         */
        interactions: [],

        /**
         * @private
         * The main area of the chart where grid and series are drawn.
         */
        mainRect: null,

        /**
         * @private
         * Override value.
         */
        resizeHandler: null,

        /**
         * @readonly
         * @cfg {Object} highlightItem
         * The current highlight item in the chart.
         * The object must be the one that you get from item events.
         *
         * Note that series can also own highlight items.
         * This notion is separate from this one and should not be used at the same time.
         */
        highlightItem: null
    },

    /**
     * @private
     */
    resizing: 0,

    /**
     * Toggle for chart interactions that require animation to be suspended.
     * @private
     */
    animationSuspended: 0,

    /**
     * @private The z-indexes to use for the various surfaces
     */
    surfaceZIndexes: {
        background: 0,
        main: 1,
        grid: 2,
        series: 3,
        axis: 4,
        chart: 5,
        overlay: 6,
        events: 7
    },

    animating: 0,

    layoutSuspended: 0,

    applyAnimation: function (newAnimation, oldAnimation) {
        if (!newAnimation) {
            newAnimation = {
                duration: 0
            };
        } else if (newAnimation === true) {
            newAnimation = {
                easing: 'easeInOut',
                duration: 500
            };
        }
        return oldAnimation ? Ext.apply({}, newAnimation, oldAnimation) : newAnimation;
    },

    applyInsetPadding: function (padding, oldPadding) {
        if (!Ext.isObject(padding)) {
            return Ext.util.Format.parseBox(padding);
        } else if (!oldPadding) {
            return padding;
        } else {
            return Ext.apply(oldPadding, padding);
        }
    },

    suspendAnimation: function () {
        this.animationSuspended++;
        if (this.animationSuspended === 1) {
            var series = this.getSeries(), i = -1, n = series.length;
            while (++i < n) {
                //update animation config to not animate
                series[i].setAnimation(this.getAnimation());
            }
        }
    },

    resumeAnimation: function () {
        this.animationSuspended--;
        if (this.animationSuspended === 0) {
            var series = this.getSeries(), i = -1, n = series.length;
            while (++i < n) {
                //update animation config to animate
                series[i].setAnimation(this.getAnimation());
            }
        }
    },

    suspendLayout: function () {
        this.layoutSuspended++;
        if (this.layoutSuspended === 1) {
            if (this.scheduledLayoutId) {
                this.layoutInSuspension = true;
                this.cancelLayout();
            } else {
                this.layoutInSuspension = false;
            }
        }
    },

    resumeLayout: function () {
        this.layoutSuspended--;
        if (this.layoutSuspended === 0) {
            if (this.layoutInSuspension) {
                this.scheduleLayout();
            }
        }
    },

    /**
     * Cancel a scheduled layout.
     */
    cancelLayout: function () {
        if (this.scheduledLayoutId) {
            Ext.draw.Animator.cancel(this.scheduledLayoutId);
            this.scheduledLayoutId = null;
        }
    },

    /**
     * Schedule a layout at next frame.
     */
    scheduleLayout: function () {
        var me = this;

        if (me.rendered && !me.scheduledLayoutId) {
            me.scheduledLayoutId = Ext.draw.Animator.schedule('doScheduleLayout', me);
        }
    },

    doScheduleLayout: function () {
        if (this.layoutSuspended) {
            this.layoutInSuspension = true;
        } else {
            this.performLayout();
        }
    },

    getAnimation: function () {
        if (this.resizing || this.animationSuspended) {
            return {
                duration: 0
            };
        } else {
            return this.callParent();
        }
    },

    constructor: function (config) {
        var me = this,
            chartSurface;

        me.itemListeners = {};
        me.surfaceMap = {};

        me.isInitializing = true;
        me.callParent(arguments);
        delete me.isInitializing;

        me.suspendLayout();
        me.getSurface('main');
        me.getSurface('chart').setFlipRtlText(me.getInherited().rtl);
        me.getSurface('overlay').waitFor(me.getSurface('series'));
        me.resumeLayout();
    },

    applySprites: function (sprites) {
        var surface = this.getSurface('chart');

        sprites = Ext.Array.from(sprites);
        surface.removeAll(true);
        surface.add(sprites);
    },

    initItems: function () {
        var items = this.items,
            i, ln, item;
        if (items && !items.isMixedCollection) {
            this.items = [];
            items = Ext.Array.from(items);
            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (item.type) {
                    Ext.Error.raise("To add custom sprites to the chart use the 'sprites' config.");
                } else {
                    this.items.push(item);
                }
            }
        }
        this.callParent();
    },

    applyBackground: function (newBackground, oldBackground) {
        var surface = this.getSurface('background');
        if (newBackground) {
            surface.remove(oldBackground, true);
            if (newBackground.type === 'image' && Ext.isString(newBackground.src)) {
                oldBackground = surface.add(newBackground);
            } else {
                oldBackground = surface.add({
                    type: 'rect',
                    fillStyle: newBackground
                });
            }
        }
        return oldBackground;
    },

    /**
     * Return the legend store that contains all the legend information.
     * This information is collected from all the series.
     * @return {Ext.data.Store}
     */
    getLegendStore: function () {
        return this.legendStore;
    },

    refreshLegendStore: function () {
        if (this.getLegendStore()) {
            var i, ln,
                series = this.getSeries(), seriesItem,
                legendData = [];
            if (series) {
                for (i = 0, ln = series.length; i < ln; i++) {
                    seriesItem = series[i];
                    if (seriesItem.getShowInLegend()) {
                        seriesItem.provideLegendInfo(legendData);
                    }
                }
            }
            this.getLegendStore().setData(legendData);
        }
    },

    resetLegendStore: function () {
        if (this.getLegendStore()) {
            var data = this.getLegendStore().getData().items,
                i, ln = data.length,
                record;
            for (i = 0; i < ln; i++) {
                record = data[i];
                record.beginEdit();
                record.set('disabled', false);
                record.commit();
            }
        }
    },

    onUpdateLegendStore: function (store, record) {
        var series = this.getSeries(), seriesItem;
        if (record && series) {
            seriesItem = series.map[record.get('series')];
            if (seriesItem) {
                seriesItem.setHiddenByIndex(record.get('index'), record.get('disabled'));
                this.redraw();
            }
        }
    },

    resizeHandler: function (size) {
        var me = this;
        me.scheduleLayout();
        return false;
    },

    applyMainRect: function (newRect, rect) {
        if (!rect) {
            return newRect;
        }
        this.getSeries();
        this.getAxes();
        if (newRect[0] === rect[0] &&
            newRect[1] === rect[1] &&
            newRect[2] === rect[2] &&
            newRect[3] === rect[3]) {
            return rect;
        } else {
            return newRect;
        }
    },

    getAxis: function (axis) {
        if (axis instanceof Ext.chart.axis.Axis) {
            return axis;
        } else if (Ext.isNumber(axis)) {
            return this.getAxes()[axis];
        } else if (Ext.isString(axis)) {
            return Ext.ComponentMgr.get(axis);
        } else {
            return null;
        }
    },

    getSurface: function (name, type) {
        name = name || 'main';
        type = type || name;
        var me = this,
            surface = this.callParent([name]),
            zIndexes = me.surfaceZIndexes;
        if (type in zIndexes) {
            surface.element.setStyle('zIndex', zIndexes[type]);
        }
        if (!me.surfaceMap[type]) {
            me.surfaceMap[type] = [];
        }
        if (Ext.Array.indexOf(me.surfaceMap[type], (surface)) < 0) {
            surface.type = type;
            me.surfaceMap[type].push(surface);
        }
        return surface;
    },

    applyAxes: function (newAxes, oldAxes) {
        this.resizing++;
        try {
            this.getStore();
            if (!oldAxes) {
                oldAxes = [];
                oldAxes.map = {};
            }
            var result = [], i, ln, axis, oldAxis, oldMap = oldAxes.map;
            result.map = {};
            newAxes = Ext.Array.from(newAxes, true);
            for (i = 0, ln = newAxes.length; i < ln; i++) {
                axis = Ext.Object.chain(newAxes[i]);
                if (!axis) {
                    continue;
                }
                if (axis.linkedTo) {
                    Ext.Array.each(newAxes, function (item) {
                        if (item.id === axis.linkedTo) {
                            axis = Ext.merge({}, item, axis);
                            if (axis.id === item.id) {
                                delete axis.id;
                            }
                            return false;
                        }
                    });
                }
                if (this.getInherited().rtl) {
                    axis.position = {left: 'right', right: 'left'}[axis.position] || axis.position;
                }
                axis = Ext.factory(axis, null, oldAxis = oldMap[axis.getId && axis.getId() || axis.id], 'axis');
                if (axis) {
                    axis.setChart(this);
                    result.push(axis);
                    result.map[axis.getId()] = axis;
                    if (!oldAxis) {
                        axis.on('animationstart', 'onAnimationStart', this);
                        axis.on('animationend', 'onAnimationEnd', this);
                    }
                }
            }

            for (i in oldMap) {
                if (!result.map[i]) {
                    oldMap[i].destroy();
                }
            }
            return result;
        } catch (e) { // catch is required in IE8 (try/finally not supported)
            //<debug>
            Ext.log.error(this.$className + ': Unhandled Exception: ', e.description || e.message);
            //</debug>
            throw e;
        }
        finally {
            this.resizing--;
        }
    },

    updateAxes: function (newAxes) {
        this.scheduleLayout();
    },

    circularCopyArray: function(inArray, startIndex, count) {
        var outArray = [],
            i, len = inArray && inArray.length;
        if (len) {
            for (i = 0; i < count; i++) {
                outArray.push(inArray[(startIndex + i) % len]);
            }
        }
        return outArray;
    },

    circularCopyObject: function(inObject, startIndex, count) {
        var me = this,
            name, value, outObject = {};
        if (count) {
            for (name in inObject) {
                if (inObject.hasOwnProperty(name)) {
                    value = inObject[name];
                    if (Ext.isArray(value)) {
                        outObject[name] = me.circularCopyArray(value, startIndex, count);
                    } else {
                        outObject[name] = value;
                    }
                }
            }
        }
        return outObject;
    },

    getColors: function () {
        var me = this,
            configColors = me.config.colors;
        if (Ext.isArray(configColors) && configColors.length > 0) {
            configColors = me.applyColors(configColors);
        }
        return configColors || (me.themeAttrs && me.themeAttrs.colors);
    },

    applyColors: function (newColors) {
        newColors = Ext.Array.map(newColors, function(color) {
            if (Ext.isString(color)) {
                return color;
            } else {
                return color.toString();
            }
        });
        return newColors;
    },

    updateColors: function (newColors) {
        var me = this,
            colors = newColors || (me.themeAttrs && me.themeAttrs.colors),
            colorIndex = 0, colorCount = colors.length, i,
            series = me.getSeries(),
            seriesCount = series && series.length,
            seriesItem, seriesColors, seriesColorCount;

        if (colorCount) {
            for (i = 0; i < seriesCount; i++) {
                seriesItem = series[i];
                seriesColorCount = seriesItem.themeColorCount();
                seriesColors = me.circularCopyArray(colors, colorIndex, seriesColorCount);
                colorIndex += seriesColorCount;
                seriesItem.updateChartColors(seriesColors);
            }
        }
        me.refreshLegendStore();
    },

    updateTheme: function (newTheme, oldTheme) {
        var me = this,
            series = me.getSeries(),
            seriesCount = series.length, i, len,
            seriesItem, seriesTheme, theme, background, style, colors, colorCount,
            styleConfig = me.config.style,
            styleObject = {},
            colorIndex = 0,
            markerIndex = 0,
            markerCount;

        theme = me.themeAttrs = me.initTheme(newTheme || this.defaultTheme);
        if (Ext.isEmpty(theme) || Ext.Object.isEmpty(theme)) {
            return;
        }

        // chart theme
        background = me.config.background || theme.background;
        me.setBackground(background);

        if (typeof styleConfig == 'string') {
            styleConfig = Ext.util.Format.trim(styleConfig).split(/\s*(?::|;)\s*/);
            for (i = 0, len = styleConfig.length; i < len;) {
                styleObject[Ext.Element.normalize(styleConfig[i++])] = styleConfig[i++];
            }
            styleConfig = styleObject;
        }

        style = Ext.applyIf(Ext.Object.chain(styleConfig || {}), theme.chartTitle);
        me.setStyle(style);

        colors = me.getColors();
        me.updateColors(colors);

        // series theme
        for (i = 0; i < seriesCount; i++) {
            seriesItem = series[i];
            seriesTheme = {};

            seriesTheme.style = Ext.apply({}, theme.series);
            seriesTheme.label = Ext.apply({}, theme.label);
            seriesTheme.marker = Ext.apply({}, theme.marker);

            if (theme.seriesThemes) {
                colorCount = seriesItem.themeColorCount();
                seriesTheme.subStyle = me.circularCopyObject(theme.seriesThemes, colorIndex, colorCount);
                colorIndex += colorCount;
            } else {
                seriesTheme.subStyle = {};
            }

            if (theme.markerThemes) {
                markerCount = seriesItem.themeMarkerCount();
                seriesTheme.markerSubStyle = me.circularCopyObject(theme.markerThemes, markerIndex, markerCount);
                markerIndex += markerCount;
            } else {
                seriesTheme.markerSubStyle = {};
            }
        }
        me.refreshLegendStore();
    },

    applySeries: function (newSeries, oldSeries) {
        this.resizing++;
        try {
            this.getAxes();
            if (!oldSeries) {
                oldSeries = [];
                oldSeries.map = {};
            }
            var me = this,
                result = [],
                i, ln, series, oldMap = oldSeries.map, oldSeriesItem;
            result.map = {};
            newSeries = Ext.Array.from(newSeries, true);
            for (i = 0, ln = newSeries.length; i < ln; i++) {
                series = newSeries[i];
                if (!series) {
                    continue;
                }
                oldSeriesItem = oldSeries.map[series.getId && series.getId() || series.id];
                if (series instanceof Ext.chart.series.Series) {
                    if (oldSeriesItem !== series) {
                        // Replacing
                        if (oldSeriesItem) {
                            oldSeriesItem.destroy();
                        }
                        me.addItemListenersToSeries(series);
                    }
                    series.setChart(this);
                } else if (Ext.isObject(series)) {
                    if (oldSeriesItem) {
                        // Update
                        oldSeriesItem.setConfig(series);
                        series = oldSeriesItem;
                    } else {
                        // Create a series.
                        if (Ext.isString(series)) {
                            series = Ext.create(series.xclass || ('series.' + series), {chart: this});
                        } else {
                            series.chart = this;
                            series = Ext.create(series.xclass || ('series.' + series.type), series);
                        }
                        series.on('animationstart', 'onAnimationStart', this);
                        series.on('animationend', 'onAnimationEnd', this);
                        me.addItemListenersToSeries(series);
                    }
                }

                result.push(series);
                result.map[series.getId()] = series;
            }

            for (i in oldMap) {
                if (!result.map[oldMap[i].getId()]) {
                    oldMap[i].destroy();
                }
            }
            return result;
        }
        catch (e) { // catch is required in IE8 (try/finally not supported)
            //<debug>
            Ext.log.error(this.$className + ': Unhandled Exception: ', e.description || e.message);
            //</debug>
            throw e;
        }
        finally {
            this.resizing--;
        }
    },

    applyLegend: function (newLegend, oldLegend) {
        return Ext.factory(newLegend, Ext.chart.Legend, oldLegend);
    },

    updateLegend: function (legend, oldLegend) {
        if (oldLegend) {
            oldLegend.destroy();
        }
        if (legend) {
            this.getItems();
            this.legendStore = new Ext.data.Store({
                autoDestroy: true,
                fields: [
                    'id', 'name', 'mark', 'disabled', 'series', 'index'
                ]
            });
            legend.setStore(this.legendStore);
            this.refreshLegendStore();
            this.legendStore.on('update', 'onUpdateLegendStore', this);
        }
    },

    setParent: function (parent) {
        this.callParent(arguments);
        if (parent && this.getLegend()) {
            parent.add(this.getLegend());
        }
    },

    updateSeries: function (newSeries, oldSeries) {
        this.resizing++;
        try {
            // this.updateTheme(this.getTheme());
            this.fireEvent('serieschange', this, newSeries, oldSeries);
            this.refreshLegendStore();
            this.scheduleLayout();
        }
        catch (e) { // catch is required in IE8 (try/finally not supported)
            //<debug>
            Ext.log.error(this.$className + ': Unhandled Exception: ', e.description || e.message);
            //</debug>
            throw e;
        }
        finally {
            this.resizing--;
        }
    },

    applyInteractions: function (interactions, oldInteractions) {
        if (!oldInteractions) {
            oldInteractions = [];
            oldInteractions.map = {};
        }
        var me = this,
            result = [], oldMap = oldInteractions.map,
            i, ln, interaction;
        result.map = {};
        interactions = Ext.Array.from(interactions, true);
        for (i = 0, ln = interactions.length; i < ln; i++) {
            interaction = interactions[i];
            if (!interaction) {
                continue;
            }
            interaction = Ext.factory(interaction, null, oldMap[interaction.getId && interaction.getId() || interaction.id], 'interaction');
            if (interaction) {
                interaction.setChart(me);
                result.push(interaction);
                result.map[interaction.getId()] = interaction;
            }
        }

        for (i in oldMap) {
            if (!result.map[oldMap[i]]) {
                oldMap[i].destroy();
            }
        }
        return result;
    },

    applyStore: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },

    updateStore: function (newStore, oldStore) {
        var me = this;
        if (oldStore) {
            oldStore.un('refresh', 'onRefresh', me, null, 'after');
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.onAfter({
                refresh: 'onRefresh',
                update: 'onRefresh',
                scope: me
            });
        }

        me.fireEvent('storechange', newStore, oldStore);
        me.onRefresh();
    },

    /**
     * Redraw the chart. If animations are set this will animate the chart too.
     */
    redraw: function () {
        this.fireEvent('redraw', this);
    },

    performLayout: function () {
        var me = this,
            size = me.innerElement.getSize(),
            chartRect = [0, 0, size.width, size.height],
            background = me.getBackground();

        me.hasFirstLayout = true;
        me.cancelLayout();
        me.getSurface('background').setRect(chartRect);
        me.getSurface('chart').setRect(chartRect);
        background.setAttributes({
            width: size.width,
            height: size.height
        });
    },

    // Converts page coordinates into chart's 'main' surface coordinates.
    getEventXY: function (e) {
        return this.getSurface().getEventXY(e);
    },

    /**
     * Given an x/y point relative to the chart, find and return the first series item that
     * matches that point.
     * @param {Number} x
     * @param {Number} y
     * @return {Object} An object with `series` and `item` properties, or `false` if no item found.
     */
    getItemForPoint: function (x, y) {
        var me = this,
            i = 0,
            items = me.getSeries(),
            l = items.length,
            series, item;

        // If we haven't drawn yet, don't attempt to find any items
        if (me.hasFirstLayout) {
            for (; i < l; i++) {
                series = items[i];
                item = series.getItemForPoint(x, y);
                if (item) {
                    return item;
                }
            }
        }

        return null;
    },

    /**
     * Given an x/y point relative to the chart, find and return all series items that match that point.
     * @param {Number} x
     * @param {Number} y
     * @return {Array} An array of objects with `series` and `item` properties.
     */
    getItemsForPoint: function (x, y) {
        var me = this,
            series = me.getSeries(),
            seriesItem,
            items = [];

        for (var i = 0; i < series.length; i++) {
            seriesItem = series[i];
            var item = seriesItem.getItemForPoint(x, y);
            if (item) {
                items.push(item);
            }
        }

        return items;
    },

    /**
     * @private
     */
    delayThicknessChanged: 0,

    /**
     * @private
     */
    thicknessChanged: false,

    /**
     * Suspend the layout initialized by thickness change
     */
    suspendThicknessChanged: function () {
        this.delayThicknessChanged++;
    },

    /**
     * Resume the layout initialized by thickness change
     */
    resumeThicknessChanged: function () {
        if (this.delayThicknessChanged > 0) {
            this.delayThicknessChanged--;
            if (this.delayThicknessChanged === 0 && this.thicknessChanged) {
                this.onThicknessChanged();
            }
        }
    },

    onAnimationStart: function () {
        this.fireEvent('animationstart', this);
    },

    onAnimationEnd: function () {
        this.fireEvent('animationend', this);
    },

    onThicknessChanged: function () {
        if (this.delayThicknessChanged === 0) {
            this.thicknessChanged = false;
            this.performLayout();
        } else {
            this.thicknessChanged = true;
        }
    },

    /**
     * @private
     */
    onRefresh: function () {
        if (this.isInitializing) {
            return;
        }
        var rect = this.getMainRect(),
            store = this.getStore(),
            series = this.getSeries(),
            axes = this.getAxes(),
            i, ln;

        if (!store || !axes || !series || !rect) {
            return;
        }
        for (i = 0, ln = series.length; i < ln; i++) {
            series[i].processData();
        }
        this.redraw();
    },

    /**
     * Changes the data store bound to this chart and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this chart.
     */
    bindStore: function (store) {
        this.setStore(store);
    },

    applyHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (newHighlightItem === oldHighlightItem) {
            return;
        }
        if (Ext.isObject(newHighlightItem) && Ext.isObject(oldHighlightItem)) {
            if (newHighlightItem.sprite === oldHighlightItem.sprite &&
                newHighlightItem.index === oldHighlightItem.index
                ) {
                return;
            }
        }
        return newHighlightItem;
    },

    updateHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (oldHighlightItem) {
            oldHighlightItem.series.setAttributesForItem(oldHighlightItem, {highlighted: false});
        }
        if (newHighlightItem) {
            newHighlightItem.series.setAttributesForItem(newHighlightItem, {highlighted: true});
        }
    },

    addItemListenersToSeries: function (series) {
        for (var name in this.itemListeners) {
            var listenerMap = this.itemListeners[name], i, ln;
            for (i = 0, ln = listenerMap.length; i < ln; i++) {
                series.addListener.apply(series, listenerMap[i]);
            }
        }
    },

    addItemListener: function (name, fn, scope, options, order) {
        var listenerMap = this.itemListeners[name] || (this.itemListeners[name] = []),
            series = this.getSeries(), seriesItem,
            i, ln;
        listenerMap.push([name, fn, scope, options, order]);
        if (series) {
            for (i = 0, ln = series.length; i < ln; i++) {
                seriesItem = series[i];
                seriesItem.addListener(name, fn, scope, options, order);
            }
        }
    },

    remoteItemListener: function (name, fn, scope, options, order) {
        var listenerMap = this.itemListeners[name],
            series = this.getSeries(), seriesItem,
            i, ln;
        if (listenerMap) {
            for (i = 0, ln = listenerMap.length; i < ln; i++) {
                if (listenerMap[i].fn === fn) {
                    listenerMap.splice(i, 1);
                    if (series) {
                        for (i = 0, ln = series.length; i < ln; i++) {
                            seriesItem = series[i];
                            seriesItem.removeListener(name, fn, scope, options, order);
                        }
                    }
                    break;
                }
            }
        }
    },

    doAddListener: function (name, fn, scope, options, order) {
        if (name.match(this.delegationRegex)) {
            return this.addItemListener(name, fn, scope || this, options, order);
        } else if (name.match(this.domEvents)) {
            return this.element.doAddListener.apply(this.element, arguments);
        } else {
            return this.callParent(arguments);
        }
    },

    doRemoveListener: function (name, fn, scope, options, order) {
        if (name.match(this.delegationRegex)) {
            return this.remoteItemListener(name, fn, scope || this, options, order);
        } else if (name.match(this.domEvents)) {
            return this.element.doRemoveListener.apply(this.element, arguments);
        } else {
            return this.callParent(arguments);
        }
    },

    onItemRemove: function (item) {
        this.callParent(arguments);
        if (this.surfaceMap) {
            Ext.Array.remove(this.surfaceMap[item.type], item);
            if (this.surfaceMap[item.type].length === 0) {
                delete this.surfaceMap[item.type];
            }
        }
    },

    // @private remove gently.
    destroy: function () {
        var me = this,
            emptyArray = [],
            legend = me.getLegend();
        me.surfaceMap = null;
        me.setHighlightItem(null);
        me.setSeries(emptyArray);
        me.setAxes(emptyArray);
        me.setInteractions(emptyArray);
        if (legend) {
            legend.destroy();
            me.setLegend(null);
        }
        me.legendStore = null;
        me.setStore(null);
        me.cancelLayout();
        this.callParent(arguments);
    },

    /* ---------------------------------
     Methods needed for ComponentQuery
     ----------------------------------*/

    /**
     * @private
     * @param {Boolean} deep
     * @return {Array}
     */
    getRefItems: function (deep) {
        var me = this,
            series = me.getSeries(),
            axes = me.getAxes(),
            interaction = me.getInteractions(),
            ans = [], i, ln;

        for (i = 0, ln = series.length; i < ln; i++) {
            ans.push(series[i]);
            if (series[i].getRefItems) {
                ans.push.apply(ans, series[i].getRefItems(deep));
            }
        }

        for (i = 0, ln = axes.length; i < ln; i++) {
            ans.push(axes[i]);
            if (axes[i].getRefItems) {
                ans.push.apply(ans, axes[i].getRefItems(deep));
            }
        }

        for (i = 0, ln = interaction.length; i < ln; i++) {
            ans.push(interaction[i]);
            if (interaction[i].getRefItems) {
                ans.push.apply(ans, interaction[i].getRefItems(deep));
            }
        }

        return ans;
    }

});
