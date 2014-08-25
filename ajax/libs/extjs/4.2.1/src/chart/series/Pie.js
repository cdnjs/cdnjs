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
 * @class Ext.chart.series.Pie
 *
 * Creates a Pie Chart. A Pie Chart is a useful visualization technique to display quantitative information for different
 * categories that also have a meaning as a whole.
 * As with all other series, the Pie Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the pie series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data'],
 *         data: [
 *             { 'name': 'metric one',   'data': 10 },
 *             { 'name': 'metric two',   'data':  7 },
 *             { 'name': 'metric three', 'data':  5 },
 *             { 'name': 'metric four',  'data':  2 },
 *             { 'name': 'metric five',  'data': 27 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 350,
 *         animate: true,
 *         store: store,
 *         theme: 'Base:gradients',
 *         series: [{
 *             type: 'pie',
 *             angleField: 'data',
 *             showInLegend: true,
 *             tips: {
 *                 trackMouse: true,
 *                 width: 140,
 *                 height: 28,
 *                 renderer: function(storeItem, item) {
 *                     // calculate and display percentage on hover
 *                     var total = 0;
 *                     store.each(function(rec) {
 *                         total += rec.get('data');
 *                     });
 *                     this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
 *                 }
 *             },
 *             highlight: {
 *                 segment: {
 *                     margin: 20
 *                 }
 *             },
 *             label: {
 *                 field: 'name',
 *                 display: 'rotate',
 *                 contrast: true,
 *                 font: '18px Arial'
 *             }
 *         }]
 *     });
 *
 * In this configuration we set `pie` as the type for the series, set an object with specific style properties for highlighting options
 * (triggered when hovering elements). We also set true to `showInLegend` so all the pie slices can be represented by a legend item.
 *
 * We set `data` as the value of the field to determine the angle span for each pie slice. We also set a label configuration object
 * where we set the field name of the store field to be renderer as text for the label. The labels will also be displayed rotated.
 *
 * We set `contrast` to `true` to flip the color of the label if it is to similar to the background color. Finally, we set the font family
 * and size through the `font` parameter.
 */
Ext.define('Ext.chart.series.Pie', {

    /* Begin Definitions */

    alternateClassName: ['Ext.chart.PieSeries', 'Ext.chart.PieChart'],

    extend: 'Ext.chart.series.Series',

    /* End Definitions */

    type: "pie",

    alias: 'series.pie',

    accuracy: 100000,

    rad: Math.PI * 2 / 100000,

    /**
     * @cfg {Number} highlightDuration
     * The duration for the pie slice highlight effect.
     */
    highlightDuration: 150,

    /**
     * @cfg {String} angleField (required)
     * The store record field name to be used for the pie angles.
     * The values bound to this field name must be positive real numbers.
     */
    angleField: false,

    /**
     * @cfg {String} field
     * Alias for {@link #angleField}.
     */

    /**
     * @cfg {String} xField
     * Alias for {@link #angleField}.
     */

    /**
     * @cfg {String} lengthField
     * The store record field name to be used for the pie slice lengths.
     * The values bound to this field name must be positive real numbers.
     */
    lengthField: false,

    /**
     * @cfg {Boolean/Number} donut
     * Whether to set the pie chart as donut chart.
     * Default's false. Can be set to a particular percentage to set the radius
     * of the donut chart.
     */
    donut: false,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to add the pie chart elements as legend items. Default's false.
     */
    showInLegend: false,

    /**
     * @cfg {Array} colorSet
     * An array of color values which will be used, in order, as the pie slice fill colors.
     */

    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */
    style: {},

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            store = chart.store,
            shadow = chart.shadow, i, l, cfg;
        config.highlightCfg = Ext.merge({
            segment: {
                margin: 20
            }
        }, config.highlightCfg);
        Ext.apply(me, config, {
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 1,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 2
                }
            },
            {
                "stroke-width": 4,
                "stroke-opacity": 1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 1.5
                }
            },
            {
                "stroke-width": 2,
                "stroke-opacity": 1,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 1
                }
            }]
        });
        me.group = surface.getGroup(me.seriesId);
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
        surface.customAttributes.segment = function(opt) {
            //Browsers will complain if we create a path
            //element that has no path commands. So ensure a dummy 
            //path command for an empty path.
            var ans = me.getSegment(opt);
            if (!ans.path || ans.path.length === 0) {
                ans.path = ['M', 0, 0];
            }
            return ans;
        };
        me.__excludes = me.__excludes || [];
    },
    
    onRedraw: function(){
        this.initialize();    
    },

    // @private updates some onbefore render parameters.
    initialize: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            i, ln, rec;
        //Add yFields to be used in Legend.js
        me.yField = [];
        if (me.label.field) {
            for (i = 0, ln = data.length; i < ln; i++) {
                rec = data[i];
                me.yField.push(rec.get(me.label.field));
            }
        }
    },

    // @private returns an object with properties for a PieSlice.
    getSegment: function(opt) {
        var me = this,
            rad = me.rad,
            cos = Math.cos,
            sin = Math.sin,
            x = me.centerX,
            y = me.centerY,
            x1 = 0, x2 = 0, x3 = 0, x4 = 0,
            y1 = 0, y2 = 0, y3 = 0, y4 = 0,
            x5 = 0, y5 = 0, x6 = 0, y6 = 0,
            delta = 1e-2,
            startAngle = opt.startAngle,
            endAngle = opt.endAngle,
            midAngle = (startAngle + endAngle) / 2 * rad,
            margin = opt.margin || 0,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            c1 = cos(a1), s1 = sin(a1),
            c2 = cos(a2), s2 = sin(a2),
            cm = cos(midAngle), sm = sin(midAngle),
            flag = 0, hsqr2 = 0.7071067811865476; // sqrt(0.5)

        if (a2 - a1 < delta) {
            return {path: ""};
        }

        if (margin !== 0) {
            x += margin * cm;
            y += margin * sm;
        }

        x2 = x + opt.endRho * c1;
        y2 = y + opt.endRho * s1;

        x4 = x + opt.endRho * c2;
        y4 = y + opt.endRho * s2;

        x6 = x + opt.endRho * cm;
        y6 = y + opt.endRho * sm;

        if (opt.startRho !== 0) {
            x1 = x + opt.startRho * c1;
            y1 = y + opt.startRho * s1;
    
            x3 = x + opt.startRho * c2;
            y3 = y + opt.startRho * s2;
    
            x5 = x + opt.startRho * cm;
            y5 = y + opt.startRho * sm;

            return {
                path: [
                    ["M", x2, y2],
                    ["A", opt.endRho, opt.endRho, 0, 0, 1, x6, y6], ["L", x6, y6],
                    ["A", opt.endRho, opt.endRho, 0, flag, 1, x4, y4], ["L", x4, y4],
                    ["L", x3, y3],
                    ["A", opt.startRho, opt.startRho, 0, flag, 0, x5, y5], ["L", x5, y5],
                    ["A", opt.startRho, opt.startRho, 0, 0, 0, x1, y1], ["L", x1, y1],
                    ["Z"]
                ]
            };
        } else {
            return {
                path: [
                    ["M", x, y],
                    ["L", x2, y2],
                    ["A", opt.endRho, opt.endRho, 0, 0, 1, x6, y6], ["L", x6, y6],
                    ["A", opt.endRho, opt.endRho, 0, flag, 1, x4, y4], ["L", x4, y4],
                    ["L", x, y],
                    ["Z"]
                ]
            };
        }
    },

    // @private utility function to calculate the middle point of a pie slice.
    calcMiddle: function(item) {
        var me = this,
            rad = me.rad,
            slice = item.slice,
            x = me.centerX,
            y = me.centerY,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            donut = +me.donut,
            midAngle = -(startAngle + endAngle) * rad / 2,
            r = (item.endRho + item.startRho) / 2,
            xm = x + r * Math.cos(midAngle),
            ym = y - r * Math.sin(midAngle);

        item.middle = {
            x: xm,
            y: ym
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.chart.getChartStore(),
            data = store.data.items,
            record,
            group = me.group,
            animate = me.chart.animate,
            field = me.angleField || me.field || me.xField,
            lenField = [].concat(me.lengthField),
            totalLenField = 0,
            chart = me.chart,
            surface = chart.surface,
            chartBBox = chart.chartBBox,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            lnsh = shadowGroups.length,
            layers = lenField.length,
            rhoAcum = 0,
            donut = +me.donut,
            layerTotals = [],
            items = [],
            totalField = 0,
            maxLenField = 0,
            angle = 0,
            seriesStyle = me.seriesStyle,
            colorArrayStyle = me.colorArrayStyle,
            colorArrayLength = colorArrayStyle && colorArrayStyle.length || 0,
            rendererAttributes,
            shadowAttr,
            shadows,
            shadow,
            shindex,
            centerX,
            centerY,
            deltaRho,
            first = 0,
            slice,
            slices,
            sprite,
            value,
            item,
            lenValue,
            ln,
            i,
            j,
            endAngle,
            path,
            p,
            spriteOptions, bbox;

        Ext.apply(seriesStyle, me.style || {});

        me.setBBox();
        bbox = me.bbox;

        //override theme colors
        if (me.colorSet) {
            colorArrayStyle = me.colorSet;
            colorArrayLength = colorArrayStyle.length;
        }

        //if not store or store is empty then there's nothing to draw
        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = Math.min(centerX - chartBBox.x, centerY - chartBBox.y);
        me.slices = slices = [];
        me.items = items = [];

        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            if (this.__excludes && this.__excludes[i]) {
                //hidden series
                continue;
            }
            totalField += +record.get(field);
            if (lenField[0]) {
                for (j = 0, totalLenField = 0; j < layers; j++) {
                    totalLenField += +record.get(lenField[j]);
                }
                layerTotals[i] = totalLenField;
                maxLenField = Math.max(maxLenField, totalLenField);
            }
        }

        totalField = totalField || 1;
        for (i = 0, ln = data.length; i < ln; i++) {
            record = data[i];
            if (this.__excludes && this.__excludes[i]) {
                value = 0;
            } else {
                value = record.get(field);
                if (first == 0) {
                    first = 1;
                }
            }

            // First slice
            if (first == 1) {
                first = 2;
                me.firstAngle = angle = me.accuracy * value / totalField / 2;
                for (j = 0; j < i; j++) {
                    slices[j].startAngle = slices[j].endAngle = me.firstAngle;
                }
            }

            endAngle = angle - me.accuracy * value / totalField;
            slice = {
                series: me,
                value: value,
                startAngle: angle,
                endAngle: endAngle,
                storeItem: record
            };
            if (lenField[0]) {
                lenValue = +layerTotals[i];
                //removing the floor will break Opera 11.6*
                slice.rho = Math.floor(me.radius / maxLenField * lenValue);
            } else {
                slice.rho = me.radius;
            }
            slices[i] = slice;
            // Do not remove this closure for the sake of https://sencha.jira.com/browse/EXTJSIV-5836
            (function () {
                angle = endAngle;
            })();
        }

        //do all shadows first.
        if (enableShadows) {
            for (i = 0, ln = slices.length; i < ln; i++) {
                slice = slices[i];
                slice.shadowAttrs = [];
                for (j = 0, rhoAcum = 0, shadows = []; j < layers; j++) {
                    sprite = group.getAt(i * layers + j);
                    deltaRho = lenField[j] ? store.getAt(i).get(lenField[j]) / layerTotals[i] * slice.rho: slice.rho;
                    //set pie slice properties
                    rendererAttributes = {
                        segment: {
                            startAngle: slice.startAngle,
                            endAngle: slice.endAngle,
                            margin: 0,
                            rho: slice.rho,
                            startRho: rhoAcum + (deltaRho * donut / 100),
                            endRho: rhoAcum + deltaRho
                        },
                        hidden: !slice.value && (slice.startAngle % me.accuracy) == (slice.endAngle % me.accuracy)
                    };
                    //create shadows
                    for (shindex = 0, shadows = []; shindex < lnsh; shindex++) {
                        shadowAttr = shadowAttributes[shindex];
                        shadow = shadowGroups[shindex].getAt(i);
                        if (!shadow) {
                            shadow = chart.surface.add(Ext.apply({}, {
                                type: 'path',
                                group: shadowGroups[shindex],
                                strokeLinejoin: "round"
                            }, rendererAttributes, shadowAttr));
                        }
                        shadowAttr = me.renderer(shadow, store.getAt(i), Ext.apply({}, rendererAttributes, shadowAttr), i, store);
                        if (animate) {
                            me.onAnimate(shadow, {
                                to: shadowAttr
                            });
                        } else {
                            shadow.setAttributes(shadowAttr, true);
                        }
                        shadows.push(shadow);
                    }
                    slice.shadowAttrs[j] = shadows;
                }
            }
        }
        //do pie slices after.
        for (i = 0, ln = slices.length; i < ln; i++) {
            slice = slices[i];
            for (j = 0, rhoAcum = 0; j < layers; j++) {
                sprite = group.getAt(i * layers + j);
                deltaRho = lenField[j] ? store.getAt(i).get(lenField[j]) / layerTotals[i] * slice.rho: slice.rho;
                //set pie slice properties
                rendererAttributes = Ext.apply({
                    segment: {
                        startAngle: slice.startAngle,
                        endAngle: slice.endAngle,
                        margin: 0,
                        rho: slice.rho,
                        startRho: rhoAcum + (deltaRho * donut / 100),
                        endRho: rhoAcum + deltaRho
                    },
                    hidden: (!slice.value && (slice.startAngle % me.accuracy) == (slice.endAngle % me.accuracy))
                }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[(layers > 1? j : i) % colorArrayLength] } || {}));
                item = Ext.apply({},
                rendererAttributes.segment, {
                    slice: slice,
                    series: me,
                    storeItem: slice.storeItem,
                    index: i
                });
                me.calcMiddle(item);
                if (enableShadows) {
                    item.shadows = slice.shadowAttrs[j];
                }
                items[i] = item;
                // Create a new sprite if needed (no height)
                if (!sprite) {
                    spriteOptions = Ext.apply({
                        type: "path",
                        group: group,
                        middle: item.middle
                    }, Ext.apply(seriesStyle, colorArrayStyle && { fill: colorArrayStyle[(layers > 1? j : i) % colorArrayLength] } || {}));
                    sprite = surface.add(Ext.apply(spriteOptions, rendererAttributes));
                }
                slice.sprite = slice.sprite || [];
                item.sprite = sprite;
                slice.sprite.push(sprite);
                slice.point = [item.middle.x, item.middle.y];
                if (animate) {
                    rendererAttributes = me.renderer(sprite, store.getAt(i), rendererAttributes, i, store);
                    sprite._to = rendererAttributes;
                    sprite._animating = true;
                    me.onAnimate(sprite, {
                        to: rendererAttributes,
                        listeners: {
                            afteranimate: {
                                fn: function() {
                                    this._animating = false;
                                },
                                scope: sprite
                            }
                        }
                    });
                } else {
                    rendererAttributes = me.renderer(sprite, store.getAt(i), Ext.apply(rendererAttributes, {
                        hidden: false
                    }), i, store);
                    sprite.setAttributes(rendererAttributes, true);
                }
                rhoAcum += deltaRho;
            }
        }

        // Hide unused bars
        ln = group.getCount();
        for (i = 0; i < ln; i++) {
            if (!slices[(i / layers) >> 0] && group.getAt(i)) {
                group.getAt(i).hide(true);
            }
        }
        if (enableShadows) {
            lnsh = shadowGroups.length;
            for (shindex = 0; shindex < ln; shindex++) {
                if (!slices[(shindex / layers) >> 0]) {
                    for (j = 0; j < lnsh; j++) {
                        if (shadowGroups[j].getAt(shindex)) {
                            shadowGroups[j].getAt(shindex).hide(true);
                        }
                    }
                }
            }
        }
        me.renderLabels();
        me.renderCallouts();
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            endLabelStyle = Ext.apply(me.seriesLabelStyle || {}, config || {});

        return me.chart.surface.add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': middle.x,
            'y': middle.y
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
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            from = {},
            rho = 1,
            theta = Math.atan2(y, x || 1),
            dg = theta * 180 / Math.PI,
            prevDg, labelBox, width, height;

        opt.hidden = false;

        if (this.__excludes && this.__excludes[i]) {
            opt.hidden = true;
        }

        function fixAngle(a) {
            if (a < 0) {
                a += 360;
            }
            return a % 360;
        }

        label.setAttributes({
            text: format(storeItem.get(field), label, storeItem, item, i, display, animate, index)
        }, true);

        switch (display) {
        case 'outside':
            // calculate the distance to the pie's edge
            rho = Math.sqrt(x * x + y * y) * 2;

            // add the distance from the label's center to its edge
            label.setAttributes({rotation:{degrees: 0}}, true);
            labelBox = label.getBBox();
            width = labelBox.width/2 * Math.cos(theta) + 4;
            height = labelBox.height/2 * Math.sin(theta) + 4;

            rho += Math.sqrt(width*width + height*height);

            //update positions
            opt.x = rho * Math.cos(theta) + centerX;
            opt.y = rho * Math.sin(theta) + centerY;
            break;

        case 'rotate':
            dg = fixAngle(dg);
            dg = (dg > 90 && dg < 270) ? dg + 180: dg;

            prevDg = label.attr.rotation.degrees;
            if (prevDg != null && Math.abs(prevDg - dg) > 180 * 0.5) {
                if (dg > prevDg) {
                    dg -= 360;
                } else {
                    dg += 360;
                }
                dg = dg % 360;
            } else {
                dg = fixAngle(dg);
            }
            //update rotation angle
            opt.rotate = {
                degrees: dg,
                x: opt.x,
                y: opt.y
            };
            break;

        default:
            break;
        }
        //ensure the object has zero translation
        opt.translate = {
            x: 0, y: 0
        };
        if (animate && !resizing && (display != 'rotate' || prevDg != null)) {
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
        }
        label._from = from;
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.chart,
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            rho = 1,
            rhoCenter,
            theta = Math.atan2(y, x || 1),
            bbox = (callout && callout.label ? callout.label.getBBox() : {width:0,height:0}),
            offsetFromViz = 20,
            offsetToSide = 10,
            offsetBox = 10,
            p;

        if (!bbox.width || !bbox.height) {
            return;
        }

        //should be able to config this.
        rho = item.endRho + offsetFromViz;
        rhoCenter = (item.endRho + item.startRho) / 2 + (item.endRho - item.startRho) / 3;
        //update positions
        opt.x = rho * Math.cos(theta) + centerX;
        opt.y = rho * Math.sin(theta) + centerY;

        x = rhoCenter * Math.cos(theta);
        y = rhoCenter * Math.sin(theta);

        if (chart.animate) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
                }
            });
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                    y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                    width: bbox.width + 2 * offsetBox,
                    height: bbox.height + 2 * offsetBox
                }
            });
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                    y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
                }
            });
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
            },
            true);
            //set box position
            callout.box.setAttributes({
                x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                width: bbox.width + 2 * offsetBox,
                height: bbox.height + 2 * offsetBox
            },
            true);
            //set text position
            callout.label.setAttributes({
                x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
            },
            true);
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

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            cx = me.centerX,
            cy = me.centerY,
            abs = Math.abs,
            dx = abs(x - cx),
            dy = abs(y - cy),
            startAngle = item.startAngle,
            endAngle = item.endAngle,
            rho = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(y - cy, x - cx) / me.rad;

        // normalize to the same range of angles created by drawSeries
        if (angle > me.firstAngle) {
            angle -= me.accuracy;
        }
        return (angle <= startAngle && angle > endAngle
                && rho >= item.startRho && rho <= item.endRho);
    },

    // @private hides all elements in the series.
    hideAll: function(index) {
        var i, l, shadow, shadows, sh, lsh, sprite;
        index = (isNaN(this._index) ? index : this._index) || 0;
        this.__excludes = this.__excludes || [];
        this.__excludes[index] = true;
        sprite = this.slices[index].sprite;
        for (sh = 0, lsh = sprite.length; sh < lsh; sh++) {
            sprite[sh].setAttributes({
                hidden: true
            }, true);
        }
        if (this.slices[index].shadowAttrs) {
            for (i = 0, shadows = this.slices[index].shadowAttrs, l = shadows.length; i < l; i++) {
                shadow = shadows[i];
                for (sh = 0, lsh = shadow.length; sh < lsh; sh++) {
                    shadow[sh].setAttributes({
                        hidden: true
                    }, true);
                }
            }
        }
        this.drawSeries();
    },

    // @private shows all elements in the series.
    showAll: function(index) {
        index = (isNaN(this._index) ? index : this._index) || 0;
        this.__excludes[index] = false;
        this.drawSeries();
    },

    /**
     * Highlight the specified item. If no item is provided the whole series will be highlighted.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    highlightItem: function(item) {
        var me = this,
            rad = me.rad,
            highlightSegment,
            animate,
            attrs,
            i,
            shadows,
            shadow,
            ln,
            to,
            itemHighlightSegment,
            prop,
            group,
            display,
            label,
            middle,
            r,
            x,
            y;
        item = item || this.items[this._index];

        //TODO(nico): sometimes in IE itemmouseover is triggered
        //twice without triggering itemmouseout in between. This
        //fixes the highlighting bug. Eventually, events should be
        //changed to trigger one itemmouseout between two itemmouseovers.
        this.unHighlightItem();

        if (!item || me.animating || (item.sprite && item.sprite._animating)) {
            return;
        }
        me.callParent([item]);
        if (!me.highlight) {
            return;
        }
        if ('segment' in me.highlightCfg) {
            highlightSegment = me.highlightCfg.segment;
            animate = me.chart.animate;
            //animate labels
            if (me.labelsGroup) {
                group = me.labelsGroup;
                display = me.label.display;
                label = group.getAt(item.index);
                middle = (item.startAngle + item.endAngle) / 2 * rad;
                r = highlightSegment.margin || 0;
                x = r * Math.cos(middle);
                y = r * Math.sin(middle);

                //TODO(nico): rounding to 1e-10
                //gives the right translation. Translation
                //was buggy for very small numbers. In this
                //case we're not looking to translate to very small
                //numbers but not to translate at all.
                if (Math.abs(x) < 1e-10) {
                    x = 0;
                }
                if (Math.abs(y) < 1e-10) {
                    y = 0;
                }

                if (animate) {
                    label.stopAnimation();
                    label.animate({
                        to: {
                            translate: {
                                x: x,
                                y: y
                            }
                        },
                        duration: me.highlightDuration
                    });
                }
                else {
                    label.setAttributes({
                        translate: {
                            x: x,
                            y: y
                        }
                    }, true);
                }
            }
            //animate shadows
            if (me.chart.shadow && item.shadows) {
                i = 0;
                shadows = item.shadows;
                ln = shadows.length;
                for (; i < ln; i++) {
                    shadow = shadows[i];
                    to = {};
                    itemHighlightSegment = item.sprite._from.segment;
                    for (prop in itemHighlightSegment) {
                        if (! (prop in highlightSegment)) {
                            to[prop] = itemHighlightSegment[prop];
                        }
                    }
                    attrs = {
                        segment: Ext.applyIf(to, me.highlightCfg.segment)
                    };
                    if (animate) {
                        shadow.stopAnimation();
                        shadow.animate({
                            to: attrs,
                            duration: me.highlightDuration
                        });
                    }
                    else {
                        shadow.setAttributes(attrs, true);
                    }
                }
            }
        }
    },

    /**
     * Un-highlights the specified item. If no item is provided it will un-highlight the entire series.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    unHighlightItem: function() {
        var me = this,
            items,
            animate,
            shadowsEnabled,
            group,
            len,
            i,
            j,
            display,
            shadowLen,
            p,
            to,
            ihs,
            hs,
            sprite,
            shadows,
            shadow,
            item,
            label,
            attrs;
        if (!me.highlight) {
            return;
        }

        if (('segment' in me.highlightCfg) && me.items) {
            items = me.items;
            animate = me.chart.animate;
            shadowsEnabled = !!me.chart.shadow;
            group = me.labelsGroup;
            len = items.length;
            i = 0;
            j = 0;
            display = me.label.display;

            for (; i < len; i++) {
                item = items[i];
                if (!item) {
                    continue;
                }
                sprite = item.sprite;
                if (sprite && sprite._highlighted) {
                    //animate labels
                    if (group) {
                        label = group.getAt(item.index);
                        attrs = Ext.apply({
                            translate: {
                                x: 0,
                                y: 0
                            }
                        },
                        display == 'rotate' ? {
                            rotate: {
                                x: label.attr.x,
                                y: label.attr.y,
                                degrees: label.attr.rotation.degrees
                            }
                        }: {});
                        if (animate) {
                            label.stopAnimation();
                            label.animate({
                                to: attrs,
                                duration: me.highlightDuration
                            });
                        }
                        else {
                            label.setAttributes(attrs, true);
                        }
                    }
                    if (shadowsEnabled) {
                        shadows = item.shadows;
                        shadowLen = shadows.length;
                        for (; j < shadowLen; j++) {
                            to = {};
                            ihs = item.sprite._to.segment;
                            hs = item.sprite._from.segment;
                            Ext.apply(to, hs);
                            for (p in ihs) {
                                if (! (p in hs)) {
                                    to[p] = ihs[p];
                                }
                            }
                            shadow = shadows[j];
                            if (animate) {
                                shadow.stopAnimation();
                                shadow.animate({
                                    to: {
                                        segment: to
                                    },
                                    duration: me.highlightDuration
                                });
                            }
                            else {
                                shadow.setAttributes({ segment: to }, true);
                            }
                        }
                    }
                }
            }
        }
        me.callParent(arguments);
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this;
        return (me.colorSet && me.colorSet[index % me.colorSet.length]) || me.colorArrayStyle[index % me.colorArrayStyle.length];
    }
});

