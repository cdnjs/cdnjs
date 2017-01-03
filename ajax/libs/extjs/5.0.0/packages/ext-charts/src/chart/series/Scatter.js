/**
 * @class Ext.chart.series.Scatter
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Scatter Chart. The scatter plot is useful when trying to display more than two variables in the same visualization.
 * These variables can be mapped into x, y coordinates and also to an element's radius/size, color, etc.
 * As with all other series, the Scatter Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information on creating charts. A typical configuration object for the scatter could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             { 'name': 'metric one',   'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8,  'data5': 13 },
 *             { 'name': 'metric two',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
 *             { 'name': 'metric three', 'data1': 5,  'data2': 2,  'data3': 14, 'data4': 12, 'data5': 7  },
 *             { 'name': 'metric four',  'data1': 2,  'data2': 14, 'data3': 6,  'data4': 1,  'data5': 23 },
 *             { 'name': 'metric five',  'data1': 27, 'data2': 38, 'data3': 36, 'data4': 13, 'data5': 33 }
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
 *             type: 'Numeric',
 *             position: 'left',
 *             fields: ['data2', 'data3'],
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'scatter',
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data2'
 *         }, {
 *             type: 'scatter',
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data3'
 *         }]
 *     });
 *
 * In this configuration we add three different categories of scatter series. Each of them is bound to a different field of the same data store,
 * `data1`, `data2` and `data3` respectively. All x-fields for the series must be the same field, in this case `name`.
 * Each scatter series has a different styling configuration for markers, specified by the `markerConfig` object. Finally we set the left axis as
 * axis to show the current values of the elements.
 */
Ext.define('Ext.chart.series.Scatter', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Cartesian',

    requires: ['Ext.chart.axis.Axis', 'Ext.chart.Shape', 'Ext.fx.Anim'],

    /* End Definitions */

    type: 'scatter',
    alias: 'series.scatter',

    /**
     * @cfg {Object} markerConfig
     * The display style for the scatter series markers.
     */

    /**
     * @cfg {Object} style
     * Append styling properties to this object for it to override theme properties.
     */

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            shadow = me.chart.shadow,
            surface = me.chart.surface, i, l;
        Ext.apply(me, config, {
            style: {},
            markerConfig: {},
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(0, 0, 0)'
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(0, 0, 0)'
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(0, 0, 0)'
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            chartAxes = chart.axes,
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            bbox, xScale, yScale, ln, minX, minY, maxX, maxY, i, axis, ends;

        me.setBBox();
        bbox = me.bbox;

        if (axis = chartAxes.get(boundXAxis)) {
            ends = axis.applyData();
            minX = ends.from;
            maxX = ends.to;
        }

        if (axis = chartAxes.get(boundYAxis)) {
            ends = axis.applyData();
            minY = ends.from;
            maxY = ends.to;
        }

        // If a field was specified without a corresponding axis, create one to get bounds
        if (me.xField && !Ext.isNumber(minX)) {
            axis = me.getMinMaxXValues();
            minX = axis[0];
            maxX = axis[1];
        }

        if (me.yField && !Ext.isNumber(minY)) {
            axis = me.getMinMaxYValues();
            minY = axis[0];
            maxY = axis[1];
        }

        if (isNaN(minX)) {
            minX = 0;
            maxX = store.getCount() - 1;
            xScale = bbox.width / (store.getCount() - 1);
        }
        else {
            xScale = bbox.width / (maxX - minX);
        }

        if (isNaN(minY)) {
            minY = 0;
            maxY = store.getCount() - 1;
            yScale = bbox.height / (store.getCount() - 1);
        }
        else {
            yScale = bbox.height / (maxY - minY);
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xScale: xScale,
            yScale: yScale
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            enableShadows = chart.shadow,
            store = chart.getChartStore(),
            data = store.data.items,
            i, ln, record,
            group = me.group,
            bounds = me.bounds = me.getBounds(),
            bbox = me.bbox,
            xScale = bounds.xScale,
            yScale = bounds.yScale,
            minX = bounds.minX,
            minY = bounds.minY,
            boxX = bbox.x,
            boxY = bbox.y,
            boxHeight = bbox.height,
            items = me.items = [],
            attrs = [],
            reverse = me.reverse,
            x, y, xValue, yValue, sprite;

        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            xValue = record.get(me.xField);
            yValue = record.get(me.yField);
            
            //skip undefined or null values
            if (typeof yValue == 'undefined' || (typeof yValue == 'string' && !yValue)
                || xValue == null || yValue == null) {
                //<debug warn>
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn("[Ext.chart.series.Scatter]  Skipping a store element with a value which is either undefined or null  at ", record, xValue, yValue);
                }
                //</debug>
                continue;
            }
            // Ensure a value
            if (typeof xValue == 'string' || typeof xValue == 'object' && !Ext.isDate(xValue)) {
                xValue = i;
            }
            if (typeof yValue == 'string' || typeof yValue == 'object' && !Ext.isDate(yValue)) {
                yValue = i;
            }
            if (reverse) {
                x = boxX + bbox.width - ((xValue - minX) * xScale);
            } else {
                x = boxX + (xValue - minX) * xScale;
            }
            
            y = boxY + boxHeight - (yValue - minY) * yScale;
            
            attrs.push({
                x: x,
                y: y
            });

            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                storeItem: record
            });

            // When resizing, reset before animating
            if (chart.animate && chart.resizing) {
                sprite = group.getAt(i);
                if (sprite) {
                    me.resetPoint(sprite);
                    if (enableShadows) {
                        me.resetShadow(sprite);
                    }
                }
            }
        }
        return attrs;
    },

    // @private translate point to the center
    resetPoint: function(sprite) {
        var bbox = this.bbox;
        sprite.setAttributes({
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, true);
    },

    // @private translate shadows of a sprite to the center
    resetShadow: function(sprite) {
        var me = this,
            shadows = sprite.shadows,
            shadowAttributes = me.shadowAttributes,
            ln = me.shadowGroups.length,
            bbox = me.bbox,
            i, attr;
        for (i = 0; i < ln; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            // TODO: fix this with setAttributes
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                attr.translate = {
                    x: (bbox.x + bbox.width) / 2,
                    y: (bbox.y + bbox.height) / 2
                };
            }
            shadows[i].setAttributes(attr, true);
        }
    },

    // @private create a new point
    createPoint: function(attr, type) {
        var me = this,
            chart = me.chart,
            group = me.group,
            bbox = me.bbox;

        return Ext.chart.Shape[type](chart.surface, Ext.apply({}, {
            x: 0,
            y: 0,
            group: group,
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, attr));
    },

    // @private create a new set of shadows for a sprite
    createShadow: function(sprite, endMarkerStyle, type) {
        var me = this,
            chart = me.chart,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            bbox = me.bbox,
            i, shadow, shadows, attr;

        sprite.shadows = shadows = [];

        for (i = 0; i < lnsh; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                Ext.apply(attr, {
                    translate: {
                        x: (bbox.x + bbox.width) / 2,
                        y: (bbox.y + bbox.height) / 2
                    }
                });
            }
            Ext.apply(attr, endMarkerStyle);
            shadow = Ext.chart.Shape[type](chart.surface, Ext.apply({}, {
                x: 0,
                y: 0,
                group: shadowGroups[i]
            }, attr));
            shadows.push(shadow);
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            group = me.group,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            sprite, attrs, attr, ln, i, endMarkerStyle, shindex, type, shadows,
            rendererAttributes, shadowAttribute;
        
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        endMarkerStyle = Ext.apply({}, me.markerStyle, me.markerConfig);
        type = endMarkerStyle.type || 'circle';
        delete endMarkerStyle.type;

        //if the store is empty then there's nothing to be rendered
        if (!store || !store.getCount()) {
            me.hide();
            me.items = [];
            return;
        }


        me.unHighlightItem();
        me.cleanHighlights();

        attrs = me.getPaths();
        ln = attrs.length;
        for (i = 0; i < ln; i++) {
            attr = attrs[i];
            sprite = group.getAt(i);
            Ext.apply(attr, endMarkerStyle);

            // Create a new sprite if needed (no height)
            if (!sprite) {
                sprite = me.createPoint(attr, type);
                if (enableShadows) {
                    me.createShadow(sprite, endMarkerStyle, type);
                }
            }

            shadows = sprite.shadows;
            if (chart.animate) {
                rendererAttributes = me.renderer(sprite, store.getAt(i), { translate: attr }, i, store);
                sprite._to = rendererAttributes;
                me.onAnimate(sprite, {
                    to: rendererAttributes
                });
                //animate shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.renderer(shadows[shindex], store.getAt(i), Ext.apply({}, { 
                        hidden: false,
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        }
                    }, shadowAttribute), i, store);
                    me.onAnimate(shadows[shindex], { to: rendererAttributes });
                }
            }
            else {
                rendererAttributes = me.renderer(sprite, store.getAt(i), { translate: attr }, i, store);
                sprite._to = rendererAttributes;
                sprite.setAttributes(rendererAttributes, true);
                //animate shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.renderer(shadows[shindex], store.getAt(i), Ext.apply({}, { 
                        hidden: false,
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        } 
                    }, shadowAttribute), i, store);
                    shadows[shindex].setAttributes(rendererAttributes, true);
                }
            }
            me.items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (i = attrs.length; i < ln; i++) {
            group.getAt(i).hide(true);
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle),
            bbox = me.bbox;

        return me.chart.surface.add(Ext.apply({
            type: 'text',
            'text-anchor': 'middle',
            group: group,
            x: Number(item.point[0]),
            y: bbox.y + bbox.height / 2
        }, endLabelStyle));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = Number(item.point[0]),
            y = Number(item.point[1]),
            radius = item.sprite.attr.radius,
            labelBox, markerBox, width, height, xOffset, yOffset,
            anim;

        label.setAttributes({
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index),
            hidden: true
        }, true);


        //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
        markerBox = item.sprite.getBBox();
        markerBox.width = markerBox.width || (radius * 2);
        markerBox.height = markerBox.height || (radius * 2);

        labelBox = label.getBBox();
        width = labelBox.width/2;
        height = labelBox.height/2;

        if (display == 'rotate') {
            //correct label position to fit into the box
            xOffset = markerBox.width/2 + width + height/2;
            if (x + xOffset + width > bbox.x + bbox.width) {
                x -= xOffset;
            } else {
                x += xOffset;
            }
            label.setAttributes({
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
        } else if (display == 'under' || display == 'over') {
            label.setAttributes({
                'rotation': {
                    degrees: 0
                }
            }, true);

            //correct label position to fit into the box
            if (x < bbox.x + width) {
                x = bbox.x + width;
            } else if (x + width > bbox.x + bbox.width) {
                x = bbox.x + bbox.width - width;
            }

            yOffset = markerBox.height/2 + height;
            y = y + (display == 'over' ? -yOffset : yOffset);
            if (y < bbox.y + height) {
                y += 2 * yOffset;
            } else if (y + height > bbox.y + bbox.height) {
                y -= 2 * yOffset;
            }
        }

        if (!chart.animate) {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            label.show(true);
        }
        else {
            if (resizing) {
                anim = item.sprite.getActiveAnimation();
                if (anim) {
                    anim.on('afteranimate', function() {
                        label.setAttributes({
                            x: x,
                            y: y
                        }, true);
                        label.show(true);
                    });
                }
                else {
                    label.show(true);
                }
            }
            else {
                me.onAnimate(label, {
                    to: {
                        x: x,
                        y: y
                    }
                });
            }
        }
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            cur = item.point,
            normal,
            bbox = callout.label.getBBox(),
            offsetFromViz = 30,
            offsetToSide = 10,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.bbox,
            x, y;

        //position
        normal = [Math.cos(Math.PI /4), -Math.sin(Math.PI /4)];
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            }, true);
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: boxx,
                    y: boxy,
                    width: boxw,
                    height: boxh
                }
            }, true);
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                    y: y
                }
            }, true);
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set box position
            callout.box.setAttributes({
                x: boxx,
                y: boxy,
                width: boxw,
                height: boxh
            }, true);
            //set text position
            callout.label.setAttributes({
                x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                y: y
            }, true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        return this.callParent(arguments);
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10,
            abs = Math.abs;

        function dist(point) {
            var dx = abs(point[0] - x),
                dy = abs(point[1] - y);
            return Math.sqrt(dx * dx + dy * dy);
        }
        point = item.point;
        return (point[0] - tolerance <= x && point[0] + tolerance >= x &&
            point[1] - tolerance <= y && point[1] + tolerance >= y);
    }
});

