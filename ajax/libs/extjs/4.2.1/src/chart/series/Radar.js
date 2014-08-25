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
 * @class Ext.chart.series.Radar
 *
 * Creates a Radar Chart. A Radar Chart is a useful visualization technique for comparing different quantitative values for
 * a constrained number of categories.
 *
 * As with all other series, the Radar series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the radar series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3'],
 *         data: [
 *             { 'name': 'metric one',   'data1': 14, 'data2': 12, 'data3': 13 },
 *             { 'name': 'metric two',   'data1': 16, 'data2':  8, 'data3':  3 },
 *             { 'name': 'metric three', 'data1': 14, 'data2':  2, 'data3':  7 },
 *             { 'name': 'metric four',  'data1':  6, 'data2': 14, 'data3': 23 },
 *             { 'name': 'metric five',  'data1': 36, 'data2': 38, 'data3': 33 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         theme:'Category2',
 *         store: store,
 *         axes: [{
 *             type: 'Radial',
 *             position: 'radial',
 *             label: {
 *                 display: true
 *             }
 *         }],
 *         series: [{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data1',
 *             showInLegend: true,
 *             showMarkers: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         },{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data2',
 *             showMarkers: true,
 *             showInLegend: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         },{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data3',
 *             showMarkers: true,
 *             showInLegend: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         }]
 *     });
 *
 * In this configuration we add three series to the chart. Each of these series is bound to the same
 * categories field, `name` but bound to different properties for each category, `data1`, `data2` and
 * `data3` respectively. All series display markers by having `showMarkers` enabled. The configuration
 * for the markers of each series can be set by adding properties onto the markerConfig object.
 * Finally we override some theme styling properties by adding properties to the `style` object.
 */
Ext.define('Ext.chart.series.Radar', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Series',

    requires: ['Ext.chart.Shape', 'Ext.fx.Anim'],

    /* End Definitions */

    type: "radar",
    alias: 'series.radar',


    rad: Math.PI / 180,

    showInLegend: false,

    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},

    /**
     * @cfg {String} xField
     * The name of the data Model field corresponding to the x-axis (angle) value.
     */

    /**
     * @cfg {String} yField
     * The name of the data Model field corresponding to the y-axis (radius) value.
     */

    /**
     * @cfg {Boolean} showMarkers
     * Whether markers should be displayed at the data points of the series. If true,
     * then the {@link #markerConfig} config item will determine the markers' styling.
     */

    /**
     * @cfg {Object} markerConfig
     * The display style for the markers. Only used if {@link #showMarkers} is true.
     * The markerConfig is a configuration object containing the same set of properties defined in
     * the Sprite class. For example, if we were to set red circles as markers to the series we could
     * pass the object:
     *
     *     @example
     *     markerConfig: {
     *         type: 'circle',
     *         radius: 4,
     *         'fill': '#f00'
     *     }
     */

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.chart.surface;
        me.group = surface.getGroup(me.seriesId);
        if (me.showMarkers) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            d, record,
            group = me.group,
            chart = me.chart,
            seriesItems = chart.series.items,
            s, sLen, series,
            field = me.field || me.yField,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            colorArrayStyle = me.colorArrayStyle,
            centerX, centerY,
            items,
            radius,
            maxValue = 0,
            fields = [],
            max = Math.max,
            cos = Math.cos,
            sin = Math.sin,
            pi2 = Math.PI * 2,
            l = store.getCount(),
            startPath, path, x, y, rho,
            i, nfields,
            seriesStyle = me.seriesStyle,
            axis = chart.axes && chart.axes.get(0),
            aggregate = !(axis && axis.maximum);

        me.setBBox();
        
        maxValue = aggregate? 0 : (axis.maximum || 0);
        
        Ext.apply(seriesStyle, me.style || {});

        //if the store is empty then there's nothing to draw
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            if (me.radar) {
                me.radar.hide(true);
            }
            me.radar = null;
            return;
        }
        
        if(!seriesStyle['stroke']){
            seriesStyle['stroke'] = colorArrayStyle[me.themeIdx % colorArrayStyle.length];
        }

        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = radius = Math.min(chartBBox.width, chartBBox.height) /2;
        me.items = items = [];

        if (aggregate) {
            //get all renderer fields
            for (s = 0, sLen = seriesItems.length; s < sLen; s++) {
                series = seriesItems[s];
                fields.push(series.yField);
            }
            //get maxValue to interpolate
            for (d = 0; d < l; d++) {
                record = data[d];
                for (i = 0, nfields = fields.length; i < nfields; i++) {
                    maxValue = max(+record.get(fields[i]), maxValue);
                }
            }
        }
        //ensure non-zero value.
        maxValue = maxValue || 1;
        //create path and items
        startPath = []; path = [];
        for (i = 0; i < l; i++) {
            record = data[i];
            rho = radius * record.get(field) / maxValue;
            x = rho * cos(i / l * pi2);
            y = rho * sin(i / l * pi2);
            if (i == 0) {
                path.push('M', x + centerX, y + centerY);
                startPath.push('M', 0.01 * x + centerX, 0.01 * y + centerY);
            } else {
                path.push('L', x + centerX, y + centerY);
                startPath.push('L', 0.01 * x + centerX, 0.01 * y + centerY);
            }
            items.push({
                sprite: false, //TODO(nico): add markers
                point: [centerX + x, centerY + y],
                storeItem: record,
                series: me
            });
        }
        path.push('Z');
        //create path sprite
        if (!me.radar) {
            me.radar = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: startPath
            }, seriesStyle || {}));
        }
        //reset on resizing
        if (chart.resizing) {
            me.radar.setAttributes({
                path: startPath
            }, true);
        }
        //render/animate
        if (chart.animate) {
            me.onAnimate(me.radar, {
                to: Ext.apply({
                    path: path
                }, seriesStyle || {})
            });
        } else {
            me.radar.setAttributes(Ext.apply({
                path: path
            }, seriesStyle || {}), true);
        }
        //render markers, labels and callouts
        if (me.showMarkers) {
            me.drawMarkers();
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private draws the markers for the lines (if any).
    drawMarkers: function() {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            store = chart.getChartStore(),
            markerStyle = Ext.apply({}, me.markerStyle || {}),
            endMarkerStyle = Ext.apply(markerStyle, me.markerConfig, {
                fill: me.colorArrayStyle[me.themeIdx % me.colorArrayStyle.length]
            }),
            items = me.items,
            type = endMarkerStyle.type,
            markerGroup = me.markerGroup,
            centerX = me.centerX,
            centerY = me.centerY,
            item, i, l, marker, rendererAttributes;

        delete endMarkerStyle.type;

        for (i = 0, l = items.length; i < l; i++) {
            item = items[i];
            marker = markerGroup.getAt(i);
            if (!marker) {
                marker = Ext.chart.Shape[type](surface, Ext.apply({
                    group: markerGroup,
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, endMarkerStyle));
            }
            else {
                marker.show();
            }

            item.sprite = marker;

            if (chart.resizing) {
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, true);
            }
            marker._to = {
                translate: {
                    x: item.point[0],
                    y: item.point[1]
                }
            };
            //render/animate
            rendererAttributes = me.renderer(marker, store.getAt(i), marker._to, i, store);
            rendererAttributes = Ext.applyIf(rendererAttributes || {}, endMarkerStyle || {});
            if (chart.animate) {
                me.onAnimate(marker, {
                    to: rendererAttributes
                });
            }
            else {
                marker.setAttributes(rendererAttributes, true);
            }
        }
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10,
            abs = Math.abs;
        point = item.point;
        return (abs(point[0] - x) <= tolerance &&
                abs(point[1] - y) <= tolerance);
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {});

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': centerX,
            'y': centerY
        }, endLabelStyle || {}));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            centerX = me.centerX,
            centerY = me.centerY,
            opt = {
                x: Number(item.point[0]),
                y: Number(item.point[1])
            },
            x = opt.x - centerX,
            y = opt.y - centerY,
            theta = Math.atan2(y, x || 1),
            deg = theta * 180 / Math.PI,
            labelBox, direction;

            function fixAngle(a) {
                if (a < 0) {
                    a += 360;
                }
                return a % 360;
            }

        label.setAttributes({
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index),
            hidden: true
        },
        true);

        // Move the label by half its height or width depending on 
        // the angle so the label doesn't overlap the graph.
        labelBox = label.getBBox();
        deg = fixAngle(deg);
        if ((deg > 45 && deg < 135) || (deg > 225 && deg < 315)) {
            direction = (deg > 45 && deg < 135 ? 1 : -1);
            opt.y += direction * labelBox.height/2;
        } else {
            direction = (deg >= 135 && deg <= 225 ? -1 : 1);
            opt.x += direction * labelBox.width/2;
        }

        if (resizing) {
            label.setAttributes({
                x: centerX,
                y: centerY
            }, true);
        }

        if (animate) {
            label.show(true);
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
            label.show(true);
        }
    },

    // @private for toggling (show/hide) series.
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            Ext.chart.series.Radar.superclass.hideAll.call(me);
        }
        else {
            Ext.chart.series.Radar.superclass.showAll.call(me);
        }
        if (me.radar) {
            me.radar.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.radar.shadows) {
                for (i = 0, shadows = me.radar.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
    },

    // @private hide all elements in the series.
    hideAll: function() {
        this.toggleAll(false);
        this.hideMarkers(0);
    },

    // @private show all elements in the series.
    showAll: function() {
        this.toggleAll(true);
    },

    // @private hide all markers that belong to `markerGroup`
    hideMarkers: function(index) {
        var me = this,
            count = me.markerGroup && me.markerGroup.getCount() || 0,
            i = index || 0;
        for (; i < count; i++) {
            me.markerGroup.getAt(i).hide(true);
        }
    },

    // @private return the radial axis as yAxis (there is no xAxis).
    // Required by the base class 'Ext.chart.axis.Axis'.
    getAxesForXAndYFields: function() {
        var me = this,
            chart = me.chart,
            axes = chart.axes,
            axis = [].concat(axes && axes.get(0));

        return {
            yAxis: axis
        };
    }
});

