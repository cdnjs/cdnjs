/**
 * Charts provide a flexible way to achieve a wide range of data visualization capablitities.
 * Each Chart gets its data directly from a {@link Ext.data.Store Store}, and automatically
 * updates its display whenever data in the Store changes. In addition, the look and feel
 * of a Chart can be customized using {@link Ext.chart.theme.Theme Theme}s.
 * 
 * ## Creating a Simple Chart
 * 
 * Every Chart has three key parts - a {@link Ext.data.Store Store} that contains the data,
 * an array of {@link Ext.chart.axis.Axis Axes} which define the boundaries of the Chart,
 * and one or more {@link Ext.chart.series.Series Series} to handle the visual rendering of the data points.
 * 
 * ### 1. Creating a Store
 * 
 * The first step is to create a {@link Ext.data.Model Model} that represents the type of
 * data that will be displayed in the Chart. For example the data for a chart that displays
 * a weather forecast could be represented as a series of "WeatherPoint" data points with
 * two fields - "temperature", and "date":
 * 
 *     Ext.define('WeatherPoint', {
 *         extend: 'Ext.data.Model',
 *         fields: ['temperature', 'date']
 *     });
 * 
 * Next a {@link Ext.data.Store Store} must be created.  The store contains a collection of "WeatherPoint" Model instances.
 * The data could be loaded dynamically, but for sake of ease this example uses inline data:
 * 
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'WeatherPoint',
 *         data: [
 *             { temperature: 58, date: new Date(2011, 1, 1, 8) },
 *             { temperature: 63, date: new Date(2011, 1, 1, 9) },
 *             { temperature: 73, date: new Date(2011, 1, 1, 10) },
 *             { temperature: 78, date: new Date(2011, 1, 1, 11) },
 *             { temperature: 81, date: new Date(2011, 1, 1, 12) }
 *         ]
 *     });
 *    
 * For additional information on Models and Stores please refer to the [Data Guide](#/guide/data).
 * 
 * ### 2. Creating the Chart object
 * 
 * Now that a Store has been created it can be used in a Chart:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *        renderTo: Ext.getBody(),
 *        width: 400,
 *        height: 300,
 *        store: store
 *     });
 *    
 * That's all it takes to create a Chart instance that is backed by a Store.
 * However, if the above code is run in a browser, a blank screen will be displayed.
 * This is because the two pieces that are responsible for the visual display,
 * the Chart's {@link #cfg-axes axes} and {@link #cfg-series series}, have not yet been defined.
 * 
 * ### 3. Configuring the Axes
 * 
 * {@link Ext.chart.axis.Axis Axes} are the lines that define the boundaries of the data points that a Chart can display.
 * This example uses one of the most common Axes configurations - a horizontal "x" axis, and a vertical "y" axis:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *         ...
 *         axes: [
 *             {
 *                 title: 'Temperature',
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['temperature'],
 *                 minimum: 0,
 *                 maximum: 100
 *             },
 *             {
 *                 title: 'Time',
 *                 type: 'Time',
 *                 position: 'bottom',
 *                 fields: ['date'],
 *                 dateFormat: 'ga'
 *             }
 *         ]
 *     });
 *    
 * The "Temperature" axis is a vertical {@link Ext.chart.axis.Numeric Numeric Axis} and is positioned on the left edge of the Chart.
 * It represents the bounds of the data contained in the "WeatherPoint" Model's "temperature" field that was
 * defined above. The minimum value for this axis is "0", and the maximum is "100".
 * 
 * The horizontal axis is a {@link Ext.chart.axis.Time Time Axis} and is positioned on the bottom edge of the Chart.
 * It represents the bounds of the data contained in the "WeatherPoint" Model's "date" field.
 * The {@link Ext.chart.axis.Time#cfg-dateFormat dateFormat}
 * configuration tells the Time Axis how to format it's labels.
 * 
 * Here's what the Chart looks like now that it has its Axes configured:
 * 
 * {@img Ext.chart.Chart/Ext.chart.Chart1.png Chart Axes}
 * 
 * ### 4. Configuring the Series
 * 
 * The final step in creating a simple Chart is to configure one or more {@link Ext.chart.series.Series Series}.
 * Series are responsible for the visual representation of the data points contained in the Store.
 * This example only has one Series:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *         ...
 *         axes: [
 *             ...
 *         ],
 *         series: [
 *             {
 *                 type: 'line',
 *                 xField: 'date',
 *                 yField: 'temperature'
 *             }
 *         ]
 *     });
 *     
 * This Series is a {@link Ext.chart.series.Line Line Series}, and it uses the "date" and "temperature" fields
 * from the "WeatherPoint" Models in the Store to plot its data points:
 * 
 * {@img Ext.chart.Chart/Ext.chart.Chart2.png Line Series}
 * 
 * See the [Line Charts Example](#!/example/charts/Charts.html) for a live demo.
 * 
 * ## Themes
 * 
 * The color scheme for a Chart can be easily changed using the {@link #cfg-theme theme} configuration option:
 * 
 *     Ext.create('Ext.chart.Chart', {
 *         ...
 *         theme: 'Green',
 *         ...
 *     });
 * 
 * {@img Ext.chart.Chart/Ext.chart.Chart3.png Green Theme}
 * 
 * For more information on Charts please refer to the [Charting Guide](#/guide/charting).
 */
Ext.define('Ext.chart.Chart', {
    extend: 'Ext.draw.Component',

    alias: 'widget.chart',
    
    mixins: [
        'Ext.chart.theme.Theme',
        'Ext.chart.Mask',
        'Ext.chart.Navigation',
        'Ext.util.StoreHolder',
        'Ext.util.Observable'
    ],

    uses: [
        'Ext.chart.series.Series'
    ],
    
    requires: [
        'Ext.util.MixedCollection',
        'Ext.data.StoreManager',
        'Ext.chart.Legend',
        'Ext.chart.theme.Base',
        'Ext.chart.theme.Theme',
        'Ext.util.DelayedTask'
    ],

    /* End Definitions */

    // @private
    viewBox: false,

    /**
     * @cfg {String} theme
     * The name of the theme to be used. A theme defines the colors and other visual displays of tick marks
     * on axis, text, title text, line colors, marker colors and styles, etc. Possible theme values are 'Base', 'Green',
     * 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' and also six category themes 'Category1' to 'Category6'. Default value
     * is 'Base'.
     */

    /**
     * @cfg {Boolean/Object} animate
     * True for the default animation (easing: 'ease' and duration: 500) or a standard animation config
     * object to be used for default chart animations. Defaults to false.
     */
    animate: false,

    /**
     * @cfg {Boolean/Object} legend
     * True for the default legend display or a {@link Ext.chart.Legend} config object.
     */
    legend: false,

    /**
     * @cfg {Number} insetPadding
     * The amount of inset padding in pixels for the chart. Defaults to 10.
     */
    insetPadding: 10,

    /**
     * @cfg {Object/Boolean} background
     * The chart background. This can be a gradient object, image, or color. Defaults to false for no
     * background. For example, if `background` were to be a color we could set the object as
     *
     *     background: {
     *         //color string
     *         fill: '#ccc'
     *     }
     *
     * You can specify an image by using:
     *
     *     background: {
     *         image: 'http://path.to.image/'
     *     }
     *
     * Also you can specify a gradient by using the gradient object syntax:
     *
     *     background: {
     *         gradient: {
     *             id: 'gradientId',
     *             angle: 45,
     *             stops: {
     *                 0: {
     *                     color: '#555'
     *                 }
     *                 100: {
     *                     color: '#ddd'
     *                 }
     *             }
     *         }
     *     }
     */
    background: false,

    /**
     * @cfg {Object[]} gradients
     * Define a set of gradients that can be used as `fill` property in sprites. The gradients array is an
     * array of objects with the following properties:
     *
     * - **id** - string - The unique name of the gradient.
     * - **angle** - number, optional - The angle of the gradient in degrees.
     * - **stops** - object - An object with numbers as keys (from 0 to 100) and style objects as values
     *
     * For example:
     *
     *     gradients: [{
     *         id: 'gradientId',
     *         angle: 45,
     *         stops: {
     *             0: {
     *                 color: '#555'
     *             },
     *             100: {
     *                 color: '#ddd'
     *             }
     *         }
     *     }, {
     *         id: 'gradientId2',
     *         angle: 0,
     *         stops: {
     *             0: {
     *                 color: '#590'
     *             },
     *             20: {
     *                 color: '#599'
     *             },
     *             100: {
     *                 color: '#ddd'
     *             }
     *         }
     *     }]
     *
     * Then the sprites can use `gradientId` and `gradientId2` by setting the fill attributes to those ids, for example:
     *
     *     sprite.setAttributes({
     *         fill: 'url(#gradientId)'
     *     }, true);
     */

    /**
     * @cfg {Ext.data.Store} store
     * The store that supplies data to this chart.
     */

    /**
     * @cfg {Ext.chart.series.Series[]} series
     * Array of {@link Ext.chart.series.Series Series} instances or config objects.  For example:
     * 
     *     series: [{
     *         type: 'column',
     *         axis: 'left',
     *         listeners: {
     *             'afterrender': function() {
     *                 console('afterrender');
     *             }
     *         },
     *         xField: 'category',
     *         yField: 'data1'
     *     }]
     */

    /**
     * @cfg {Ext.chart.axis.Axis[]} axes
     * Array of {@link Ext.chart.axis.Axis Axis} instances or config objects.  For example:
     * 
     *     axes: [{
     *         type: 'Numeric',
     *         position: 'left',
     *         fields: ['data1'],
     *         title: 'Number of Hits',
     *         minimum: 0,
     *         //one minor tick between two major ticks
     *         minorTickSteps: 1
     *     }, {
     *         type: 'Category',
     *         position: 'bottom',
     *         fields: ['name'],
     *         title: 'Month of the Year'
     *     }]
     */
    
    refreshBuffer: 1,

    /**
     * @event beforerefresh
     * Fires before a refresh to the chart data is called. If the beforerefresh handler returns false the
     * {@link #event-refresh} action will be cancelled.
     * @param {Ext.chart.Chart} this
     */

    /**
     * @event refresh
     * Fires after the chart data has been refreshed.
     * @param {Ext.chart.Chart} this
     */

    constructor: function(config) {
        var me = this,
            defaultAnim;

        config = Ext.apply({}, config);
        me.initTheme(config.theme || me.theme);
        if (me.gradients) {
            Ext.apply(config, { gradients: me.gradients });
        }
        if (me.background) {
            Ext.apply(config, { background: me.background });
        }
        if (config.animate) {
            defaultAnim = {
                easing: 'ease',
                duration: 500
            };
            if (Ext.isObject(config.animate)) {
                config.animate = Ext.applyIf(config.animate, defaultAnim);
            }
            else {
                config.animate = defaultAnim;
            }
        }

        me.mixins.observable.constructor.call(me, config);
        
        if (config.mask) {
            config = Ext.apply({ enableMask: true }, config);
        }
        
        if (config.enableMask) {
            me.mixins.mask.constructor.call(me, config);
        }
        me.mixins.navigation.constructor.call(me);
        me.callParent([config]);
    },
    
    getChartStore: function(){
        return this.substore || this.store;
    },

    initComponent: function() {
        var me = this,
            axes,
            series;
        me.callParent();

        Ext.applyIf(me, {
            zoom: {
                width: 1,
                height: 1,
                x: 0,
                y: 0
            }
        });
        me.maxGutters = { left: 0, right: 0, bottom: 0, top: 0 };
        me.store = Ext.data.StoreManager.lookup(me.store);
        axes = me.axes;
        me.axes = new Ext.util.MixedCollection(false, function(a) { return a.position; });
        if (axes) {
            me.axes.addAll(axes);
        }
        series = me.series;
        me.series = new Ext.util.MixedCollection(false, function(a) { return a.seriesId || (a.seriesId = Ext.id(null, 'ext-chart-series-')); });
        if (series) {
            me.series.addAll(series);
        }
        if (me.legend !== false) {
            me.legend = new Ext.chart.Legend(Ext.applyIf({
                chart: me
            }, me.legend));
        }

        me.on({
            mousemove: me.onMouseMove,
            mouseleave: me.onMouseLeave,
            mousedown: me.onMouseDown,
            mouseup: me.onMouseUp,
            click: me.onClick,
            dblclick: me.onDblClick,
            scope: me
        });
    },

    // @private overrides the component method to set the correct dimensions to the chart.
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;
        if (Ext.isNumber(width) && Ext.isNumber(height)) {
            if (width !== oldWidth || height !== oldHeight) {
                me.curWidth = width;
                me.curHeight = height;
                me.redraw(true);
                me.needsRedraw = false;
            } else if (me.needsRedraw) {
                me.redraw();
                me.needsRedraw = false;
            }
        }
        this.callParent(arguments);
    },

    /**
     * Redraws the chart. If animations are set this will animate the chart too. 
     * @param {Boolean} resize (optional) flag which changes the default origin points of the chart for animations.
     */
    redraw: function(resize) {
        var me = this,
            seriesItems = me.series.items,
            seriesLen = seriesItems.length,
            axesItems = me.axes.items,
            axesLen = axesItems.length,
            themeIndex = 0,
            i, item,
            chartBBox = me.chartBBox = {
                x: 0,
                y: 0,
                height: me.curHeight,
                width: me.curWidth
            },
            legend = me.legend, 
            series;
            
        me.surface.setSize(chartBBox.width, chartBBox.height);
        // Instantiate Series and Axes
        for (i = 0; i < seriesLen; i++) {
            item = seriesItems[i];
            if (!item.initialized) {
                series = me.initializeSeries(item, i, themeIndex);
            } else {
                series = item;
            }
            // Allow the series to react to a redraw, for example, a pie series
            // backed by a remote data set needs to build legend labels correctly
            series.onRedraw();
            // For things like stacked bar charts, a single series can consume
            // multiple colors from the index, so we compensate for it here
            if (Ext.isArray(item.yField)) {
                themeIndex += item.yField.length;
            } else {
                ++themeIndex;
            }
        }
        for (i = 0; i < axesLen; i++) {
            item = axesItems[i];
            if (!item.initialized) {
                me.initializeAxis(item);
            }
        }
        //process all views (aggregated data etc) on stores
        //before rendering.
        for (i = 0; i < axesLen; i++) {
            axesItems[i].processView();
        }
        for (i = 0; i < axesLen; i++) {
            axesItems[i].drawAxis(true);
        }

        // Create legend if not already created
        if (legend !== false && legend.visible) {
            if (legend.update || !legend.created) {
                legend.create();
            }
        }

        // Place axes properly, including influence from each other
        me.alignAxes();

        // Reposition legend based on new axis alignment
        if (legend !== false && legend.visible) {
            legend.updatePosition();
        }

        // Find the max gutters
        me.getMaxGutters();

        // Draw axes and series
        me.resizing = !!resize;

        for (i = 0; i < axesLen; i++) {
            axesItems[i].drawAxis();
        }
        for (i = 0; i < seriesLen; i++) {
            me.drawCharts(seriesItems[i]);
        }
        me.resizing = false;
    },

    // @private set the store after rendering the chart.
    afterRender: function() {
        var me = this,
            legend = me.legend;
        
        me.callParent(arguments);

        if (me.categoryNames) {
            me.setCategoryNames(me.categoryNames);
        }
        
        if (legend) {
            legend.init();
        }

        me.bindStore(me.store, true);
        me.refresh();

        if (me.surface.engine === 'Vml') {
            me.on('added', me.onAddedVml, me);
            me.mon(Ext.GlobalEvents, 'added', me.onContainerAddedVml, me);
        }
    },

    // When using a vml surface we need to redraw when this chart or one of its ancestors
    // is moved to a new container after render, because moving the vml chart causes the
    // vml elements to go haywire, some displaing incorrectly or not displaying at all.
    // This appears to be caused by the component being moved to the detached body element
    // before being added to the new container.
    onAddedVml: function() {
        this.needsRedraw = true; // redraw after component layout
    },

    onContainerAddedVml: function(container) {
        if (this.isDescendantOf(container)) {
            this.needsRedraw = true; // redraw after component layout
        }
    },

    // @private get x and y position of the mouse cursor.
    getEventXY: function(e) {
        var box = this.surface.getRegion(),
            pageXY = e.getXY(),
            x = pageXY[0] - box.left,
            y = pageXY[1] - box.top;
            
        return [x, y];
    },
    
    onClick: function(e) {
        this.handleClick('itemclick', e);
    },
    
    onDblClick: function(e) {
        this.handleClick('itemdblclick', e);
    },

    // @private wrap the mouse down position to delegate the event to the series.
    handleClick: function(name, e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item;

        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemclick event.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        series.fireEvent(name, item);
                    }
                }
            }
        }
    },

    // @private wrap the mouse down position to delegate the event to the series.
    onMouseDown: function(e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item;

        if (me.enableMask) {
            me.mixins.mask.onMouseDown.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmousedown event.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        series.fireEvent('itemmousedown', item);
                    }
                }
            }
        }
    },

    // @private wrap the mouse up event to delegate it to the series.
    onMouseUp: function(e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item;

        if (me.enableMask) {
            me.mixins.mask.onMouseUp.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmouseup event.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    if (item) {
                        series.fireEvent('itemmouseup', item);
                    }
                }
            }
        }
    },

    // @private wrap the mouse move event so it can be delegated to the series.
    onMouseMove: function(e) {
        var me = this,
            position = me.getEventXY(e),
            seriesItems = me.series.items,
            i, ln, series,
            item, last, storeItem, storeField;

        
        if (me.enableMask) {
            me.mixins.mask.onMouseMove.call(me, e);
        }
        // Ask each series if it has an item corresponding to (not necessarily exactly
        // on top of) the current mouse coords. Fire itemmouseover/out events.
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            if (Ext.draw.Draw.withinBox(position[0], position[1], series.bbox)) {
                if (series.getItemForPoint) {
                    item = series.getItemForPoint(position[0], position[1]);
                    last = series._lastItemForPoint;
                    storeItem = series._lastStoreItem;
                    storeField = series._lastStoreField;


                    if (item !== last || item && (item.storeItem != storeItem || item.storeField != storeField)) {
                        if (last) {
                            series.fireEvent('itemmouseout', last);
                            delete series._lastItemForPoint;
                            delete series._lastStoreField;
                            delete series._lastStoreItem;
                        }
                        if (item) {
                            series.fireEvent('itemmouseover', item);
                            series._lastItemForPoint = item;
                            series._lastStoreItem = item.storeItem;
                            series._lastStoreField = item.storeField;
                        }
                    }
                }
            } else {
                last = series._lastItemForPoint;
                if (last) {
                    series.fireEvent('itemmouseout', last);
                    delete series._lastItemForPoint;
                    delete series._lastStoreField;
                    delete series._lastStoreItem;
                }
            }
        }
    },

    // @private handle mouse leave event.
    onMouseLeave: function(e) {
        var me = this,
            seriesItems = me.series.items,
            i, ln, series;

        if (me.enableMask) {
            me.mixins.mask.onMouseLeave.call(me, e);
        }
        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            series = seriesItems[i];
            delete series._lastItemForPoint;
        }
    },

    // @private buffered refresh for when we update the store
    delayRefresh: function() {
        var me = this;
        if (!me.refreshTask) {
            me.refreshTask = new Ext.util.DelayedTask(me.refresh, me);
        }
        me.refreshTask.delay(me.refreshBuffer);
    },

    // @private
    refresh: function() {
        var me = this;
            
        if (me.rendered && me.curWidth !== undefined && me.curHeight !== undefined) {
            if (!me.isVisible(true)) {
                if (!me.refreshPending) {
                    me.setShowListeners('mon');
                    me.refreshPending = true;
                }
                return;
            }
            if (me.fireEvent('beforerefresh', me) !== false) {
                me.redraw();
                me.fireEvent('refresh', me);
            }
        }
    },
    
    onShow: function(){
        var me = this;
        me.callParent(arguments);
        if (me.refreshPending) {
            me.delayRefresh();
            me.setShowListeners('mun');
        }
        delete me.refreshPending;
    },
    
    setShowListeners: function(method){
        var me = this;
        me[method](Ext.GlobalEvents, {
            scope: me,
            single: true,
            show: me.forceRefresh,
            expand: me.forceRefresh
        });
    },
    
    doRefresh: function(){
        // Data in the main store has changed, clear the sub store
        this.setSubStore(null);
        this.refresh();    
    },
    
    forceRefresh: function(container) {
        var me = this;
        if (me.isDescendantOf(container) && me.refreshPending) {
            // Add unbind here, because either expand/show could be fired,
            // so be sure to unbind the listener that didn't
            me.setShowListeners('mun');
            me.delayRefresh();
        }    
        delete me.refreshPending;
    },

    bindStore: function(store, initial) {
        var me = this;
        me.mixins.storeholder.bindStore.apply(me, arguments);
        if (me.store && !initial) {
            me.refresh();
        }
    },
    
    getStoreListeners: function() {
        var refresh = this.doRefresh,
            delayRefresh = this.delayRefresh;
            
        return {
            refresh: refresh,
            add: delayRefresh,
            remove: delayRefresh,
            update: delayRefresh,
            clear: refresh
        };
    },
    
    setSubStore: function(subStore){
        this.substore = subStore;    
    },

    // @private Create Axis
    initializeAxis: function(axis) {
        var me = this,
            chartBBox = me.chartBBox,
            w = chartBBox.width,
            h = chartBBox.height,
            x = chartBBox.x,
            y = chartBBox.y,
            themeAttrs = me.themeAttrs,
            axes = me.axes,
            config = {
                chart: me
            };
            
        if (themeAttrs) {
            config.axisStyle = Ext.apply({}, themeAttrs.axis);
            config.axisLabelLeftStyle = Ext.apply({}, themeAttrs.axisLabelLeft);
            config.axisLabelRightStyle = Ext.apply({}, themeAttrs.axisLabelRight);
            config.axisLabelTopStyle = Ext.apply({}, themeAttrs.axisLabelTop);
            config.axisLabelBottomStyle = Ext.apply({}, themeAttrs.axisLabelBottom);
            config.axisTitleLeftStyle = Ext.apply({}, themeAttrs.axisTitleLeft);
            config.axisTitleRightStyle = Ext.apply({}, themeAttrs.axisTitleRight);
            config.axisTitleTopStyle = Ext.apply({}, themeAttrs.axisTitleTop);
            config.axisTitleBottomStyle = Ext.apply({}, themeAttrs.axisTitleBottom);
            me.configureAxisStyles(config);
        }
        
        switch (axis.position) {
            case 'top':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    x: x,
                    y: y
                });
            break;
            case 'bottom':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    x: x,
                    y: h
                });
            break;
            case 'left':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    x: x,
                    y: h
                });
            break;
            case 'right':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    x: w,
                    y: h
                });
            break;
        }
        
        if (!axis.chart) {
            Ext.apply(config, axis);
            axis = Ext.createByAlias('axis.' + axis.type.toLowerCase(), config);
            axes.replace(axis);
        } else {
            Ext.apply(axis, config);
        }
        axis.initialized = true;
    },
    
    configureAxisStyles: Ext.emptyFn,

    /**
     * @private Get initial insets; override to provide different defaults.
     */
    getInsets: function() {
        var me = this,
            insetPadding = me.insetPadding;

        return {
            top: insetPadding,
            right: insetPadding,
            bottom: insetPadding,
            left: insetPadding
        };
    },

    /**
     * @private Calculate insets for the Chart.
     */
    calculateInsets: function() {
        var me = this,
            legend = me.legend,
            axes = me.axes,
            edges = ['top', 'right', 'bottom', 'left'],
            insets, i, l, edge, isVertical, axis, bbox;

        function getAxis(edge) {
            var i = axes.findIndex('position', edge);
            return (i < 0) ? null : axes.getAt(i);
        }
        
        insets = me.getInsets();

        // Find the space needed by axes and legend as a positive inset from each edge
        for (i = 0, l = edges.length; i < l; i++) {
            edge = edges[i];
            
            isVertical = (edge === 'left' || edge === 'right');
            axis = getAxis(edge);

            // Add legend size if it's on this edge
            if (legend !== false) {
                if (legend.position === edge) {
                    bbox = legend.getBBox();
                    insets[edge] += (isVertical ? bbox.width : bbox.height) + me.insetPadding;
                }
            }

            // Add axis size if there's one on this edge only if it has been
            //drawn before.
            if (axis && axis.bbox) {
                bbox = axis.bbox;
                insets[edge] += (isVertical ? bbox.width : bbox.height);
            }
        }
        
        return insets;
    },

    /**
     * @private Adjust the dimensions and positions of each axis and the chart body area after accounting
     * for the space taken up on each side by the axes and legend.
     * This code is taken from Ext.chart.Chart and refactored to provide better flexibility.
     */
    alignAxes: function() {
        var me = this,
            axesItems = me.axes.items,
            insets, chartBBox, i, l, axis, pos, isVertical;
        
        insets = me.calculateInsets();

        // Build the chart bbox based on the collected inset values
        chartBBox = {
            x: insets.left,
            y: insets.top,
            width: me.curWidth - insets.left - insets.right,
            height: me.curHeight - insets.top - insets.bottom
        };
        me.chartBBox = chartBBox;

        // Go back through each axis and set its length and position based on the
        // corresponding edge of the chartBBox
        for (i = 0, l = axesItems.length; i < l; i++) {
            axis = axesItems[i];
            pos = axis.position;
            isVertical = pos === 'left' || pos === 'right';

            axis.x = (pos === 'right' ? chartBBox.x + chartBBox.width : chartBBox.x);
            axis.y = (pos === 'top' ? chartBBox.y : chartBBox.y + chartBBox.height);
            axis.width = (isVertical ? chartBBox.width : chartBBox.height);
            axis.length = (isVertical ? chartBBox.height : chartBBox.width);
        }
    },

    // @private initialize the series.
    initializeSeries: function(series, idx, themeIndex) {
        var me = this,
            themeAttrs = me.themeAttrs,
            seriesObj, markerObj, seriesThemes, st,
            markerThemes, colorArrayStyle = [],
            isInstance = (series instanceof Ext.chart.series.Series).
            i = 0, l, config;

        if (!series.initialized) {
            config = {
                chart: me,
                seriesId: series.seriesId
            };
            if (themeAttrs) {
                seriesThemes = themeAttrs.seriesThemes;
                markerThemes = themeAttrs.markerThemes;
                seriesObj = Ext.apply({}, themeAttrs.series);
                markerObj = Ext.apply({}, themeAttrs.marker);
                config.seriesStyle = Ext.apply(seriesObj, seriesThemes[themeIndex % seriesThemes.length]);
                config.seriesLabelStyle = Ext.apply({}, themeAttrs.seriesLabel);
                config.markerStyle = Ext.apply(markerObj, markerThemes[themeIndex % markerThemes.length]);
                if (themeAttrs.colors) {
                    config.colorArrayStyle = themeAttrs.colors;
                } else {
                    colorArrayStyle = [];
                    for (l = seriesThemes.length; i < l; i++) {
                        st = seriesThemes[i];
                        if (st.fill || st.stroke) {
                            colorArrayStyle.push(st.fill || st.stroke);
                        }
                    }
                    if (colorArrayStyle.length) {
                        config.colorArrayStyle = colorArrayStyle;
                    }
                }
                config.seriesIdx = idx;
                config.themeIdx = themeIndex;
            }
            
            if (isInstance) {
                Ext.applyIf(series, config);
            }
            else {
                Ext.applyIf(config, series);
                series = me.series.replace(Ext.createByAlias('series.' + series.type.toLowerCase(), config));
            }
        }

        series.initialize();
        series.initialized = true;
        return series;
    },

    // @private
    getMaxGutters: function() {
        var me = this,
            seriesItems = me.series.items,
            i, ln, series, gutters,
            lowerH = 0, upperH = 0, lowerV = 0, upperV = 0;

        for (i = 0, ln = seriesItems.length; i < ln; i++) {
            gutters = seriesItems[i].getGutters();
            if (gutters) {
                if (gutters.verticalAxis) {
                    lowerV = Math.max(lowerV, gutters.lower);
                    upperV = Math.max(upperV, gutters.upper);
                }
                else {
                    lowerH = Math.max(lowerH, gutters.lower);
                    upperH = Math.max(upperH, gutters.upper);
                }
            }
        }
        me.maxGutters = {
            left: lowerH,
            right: upperH,
            bottom: lowerV,
            top: upperV
        };
    },

    // @private draw axis.
    drawAxis: function(axis) {
        axis.drawAxis();
    },

    // @private draw series.
    drawCharts: function(series) {
        series.triggerafterrender = false;
        series.drawSeries();
        if (!this.animate) {
            series.fireEvent('afterrender', series);
        }
    },
    /**
     * Saves the chart by either triggering a download or returning a string containing the chart data
     * as SVG.  The action depends on the export type specified in the passed configuration. The chart
     * will be exported using either the {@link Ext.draw.engine.SvgExporter} or the {@link Ext.draw.engine.ImageExporter}
     * classes.
     *
     * Possible export types:
     *
     * - 'image/png'
     * - 'image/jpeg',
     * - 'image/svg+xml'
     *
     * If 'image/svg+xml' is specified, the SvgExporter will be used. 
     * If 'image/png' or 'image/jpeg' are specified, the ImageExporter will be used. This exporter
     * must post the SVG data to a remote server to have the data processed, see the {@link Ext.draw.engine.ImageExporter}
     * for more details.
     *
     * Example usage:
     *
     *     chart.save({
     *          type: 'image/png'
     *     });
     *
     * **Important**: By default, chart data is sent to a server operated
     * by Sencha to do data processing. You may change this default by
     * setting the {@link Ext.draw.engine.ImageExporter#defaultUrl defaultUrl} of the {@link Ext.draw.engine.ImageExporter} class.
     * In addition, please note that this service only creates PNG images.
     *
     * @param {Object} [config] The configuration to be passed to the exporter.
     * See the export method for the appropriate exporter for the relevant
     * configuration options
     * @return {Object} See the return types for the appropriate exporter
     */
    save: function(config){
        return Ext.draw.Surface.save(this.surface, config);
    },
    // @private remove gently.
    destroy: function() {
        var me = this,
            task = me.refreshTask;
        
        if (task) {
            task.cancel();
            me.refreshTask = null;
        }
        
        Ext.destroy(me.surface);
        me.bindStore(null);
        me.callParent(arguments);
    }
});
