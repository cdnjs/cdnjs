/**
 * Creates a Bar Chart. A Bar Chart is a useful visualization technique to display quantitative information for
 * different categories that can show some progression (or regression) in the dataset. As with all other series, the Bar
 * Series must be appended in the *series* Chart array configuration. See the Chart documentation for more information.
 * A typical configuration object for the bar series could be:
 *
 *     @example
 *     var store = Ext.create('Ext.data.JsonStore', {
 *         fields: ['name', 'data'],
 *         data: [
 *             { 'name': 'metric one',   'data':10 },
 *             { 'name': 'metric two',   'data': 7 },
 *             { 'name': 'metric three', 'data': 5 },
 *             { 'name': 'metric four',  'data': 2 },
 *             { 'name': 'metric five',  'data':27 }
 *         ]
 *     });
 *
 *     Ext.create('Ext.chart.Chart', {
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'bottom',
 *             fields: ['data'],
 *             label: {
 *                 renderer: Ext.util.Format.numberRenderer('0,0')
 *             },
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'left',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'bar',
 *             axis: 'bottom',
 *             highlight: true,
 *             tips: {
 *               trackMouse: true,
 *               width: 140,
 *               height: 28,
 *               renderer: function(storeItem, item) {
 *                 this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' views');
 *               }
 *             },
 *             label: {
 *               display: 'insideEnd',
 *                 field: 'data',
 *                 renderer: Ext.util.Format.numberRenderer('0'),
 *                 orientation: 'horizontal',
 *                 color: '#333',
 *                 'text-anchor': 'middle'
 *             },
 *             xField: 'name',
 *             yField: 'data'
 *         }]
 *     });
 *
 * In this configuration we set `bar` as the series type, bind the values of the bar to the bottom axis and set the
 * xField or category field to the `name` parameter of the store. We also set `highlight` to true which enables smooth
 * animations when bars are hovered. We also set some configuration for the bar labels to be displayed inside the bar,
 * to display the information found in the `data1` property of each element store, to render a formated text with the
 * `Ext.util.Format` we pass in, to have an `horizontal` orientation (as opposed to a vertical one) and we also set
 * other styles like `color`, `text-anchor`, etc.
 */
Ext.define('Ext.chart.series.Bar', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Cartesian',

    alternateClassName: ['Ext.chart.BarSeries', 'Ext.chart.BarChart', 'Ext.chart.StackedBarChart'],

    requires: ['Ext.chart.axis.Axis', 'Ext.fx.Anim'],

    /* End Definitions */

    type: 'bar',

    alias: 'series.bar',
    /**
     * @cfg {Boolean} column Whether to set the visualization as column chart or horizontal bar chart.
     */
    column: false,

    /**
     * @cfg style Style properties that will override the theming series styles.
     */
    style: {},

    /**
     * @cfg {Number} gutter The gutter space between single bars, as a percentage of the bar width
     */
    gutter: 38.2,

    /**
     * @cfg {Number} groupGutter The gutter space between groups of bars, as a percentage of the bar width
     */
    groupGutter: 38.2,

    /**
     * @cfg {Number/Object} xPadding Padding between the left/right axes and the bars.
     * The possible values are a number (the number of pixels for both left and right padding)
     * or an object with `{ left, right }` properties.
     */
    xPadding: 0,

    /**
     * @cfg {Number/Object} yPadding Padding between the top/bottom axes and the bars.
     * The possible values are a number (the number of pixels for both top and bottom padding)
     * or an object with `{ top, bottom }` properties.
     */
    yPadding: 10,

    /**
     * @cfg {Boolean} stacked
     * If set to `true` then bars for multiple `yField` values will be rendered stacked on top of one another.
     * Otherwise, they will be rendered side-by-side. Defaults to `false`.
     */
    
    defaultRotate: {
        x: 0,
        y: 0,
        degrees: 0
    },

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.chart.surface,
            shadow = me.chart.shadow,
            i, l;
        config.highlightCfg = Ext.Object.merge({
            lineWidth: 3,
            stroke: '#55c',
            opacity: 0.8,
            color: '#f00'
        }, config.highlightCfg);
        Ext.apply(me, config, {
            shadowAttributes: [{
                "stroke-width": 6,
                "stroke-opacity": 0.05,
                stroke: 'rgb(200, 200, 200)',
                translate: {
                    x: 1.2,
                    y: 1.2
                }
            }, {
                "stroke-width": 4,
                "stroke-opacity": 0.1,
                stroke: 'rgb(150, 150, 150)',
                translate: {
                    x: 0.9,
                    y: 0.9
                }
            }, {
                "stroke-width": 2,
                "stroke-opacity": 0.15,
                stroke: 'rgb(100, 100, 100)',
                translate: {
                    x: 0.6,
                    y: 0.6
                }
            }]
        });

        me.group = surface.getGroup(me.seriesId + '-bars');
        if (shadow) {
            for (i = 0, l = me.shadowAttributes.length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    // @private returns the padding.
    getPadding: function() {
        var me = this,
            xPadding = me.xPadding,
            yPadding = me.yPadding,
            padding = { };

        if (Ext.isNumber(xPadding)) {
            padding.left = xPadding;
            padding.right = xPadding;
        } else if (Ext.isObject(xPadding)) {
            padding.left = xPadding.left;
            padding.right = xPadding.right;
        } else {
            padding.left = 0;
            padding.right = 0;
        }
        padding.width = padding.left + padding.right;

        if (Ext.isNumber(yPadding)) {
            padding.bottom = yPadding;
            padding.top = yPadding;
        } else if (Ext.isObject(yPadding)) {
            padding.bottom = yPadding.bottom;
            padding.top = yPadding.top;
        } else {
            padding.bottom = 0;
            padding.top = 0;
        }
        padding.height = padding.bottom + padding.top;

        return padding;
    },

    // @private returns the bar girth.
    getBarGirth: function() {
        var me = this,
            store = me.chart.getChartStore(),
            column = me.column,
            ln = store.getCount(),
            gutter = me.gutter / 100,
            padding,
            property;

        property = (column ? 'width' : 'height');
        
        if (me.style && me.style[property]) {
            me.configuredColumnGirth = true;
            return +me.style[property];
        }
        
        padding = me.getPadding();
        
        return (me.chart.chartBBox[property] - padding[property]) / (ln * (gutter + 1) - gutter);
    },

    // @private returns the gutters.
    getGutters: function() {
        var me = this,
            column = me.column,
            padding = me.getPadding(),
            halfBarGirth = me.getBarGirth() / 2,
            lowerGutter = Math.ceil((column ? padding.left : padding.bottom) + halfBarGirth),
            upperGutter = Math.ceil((column ? padding.right : padding.top) + halfBarGirth);

        return {
            lower: lowerGutter,
            upper: upperGutter,
            verticalAxis: !column
        };
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            i, ln, record,
            bars = [].concat(me.yField),
            barsLoc = [],
            barsLen = bars.length,
            groupBarsLen = barsLen,
            groupGutter = me.groupGutter / 100,
            column = me.column,
            padding = me.getPadding(),
            stacked = me.stacked,
            barWidth = me.getBarGirth(),
            barWidthProperty = column ? 'width' : 'height',
            math = Math,
            mmin = math.min,
            mmax = math.max,
            mabs = math.abs,
            boundAxes = me.getAxesForXAndYFields(),
            boundYAxis = boundAxes.yAxis,
            minX, maxX, colsScale, colsZero, gutters,
            ends, shrunkBarWidth, groupBarWidth, bbox, minY, maxY, axis, out,
            scale, zero, total, rec, j, plus, minus, inflections, tick, loc;

        me.setBBox(true);
        bbox = me.bbox;

        //Skip excluded series
        if (me.__excludes) {
            for (j = 0, total = me.__excludes.length; j < total; j++) {
                if (me.__excludes[j]) {
                    groupBarsLen--;
                }
            }
        }
        axis = chart.axes.get(boundYAxis);
        if (axis) {
            ends = axis.applyData();
            minY = ends.from;
            maxY = ends.to;
        }

        if (me.yField && !Ext.isNumber(minY)) {
            out = me.getMinMaxYValues();
            minY = out[0];
            maxY = out[1];
        }

        if (!Ext.isNumber(minY)) {
            minY = 0;
        }
        if (!Ext.isNumber(maxY)) {
            maxY = 0;
        }
        scale = (column ? bbox.height - padding.height : bbox.width - padding.width) / (maxY - minY);
        shrunkBarWidth = barWidth;
        groupBarWidth = (barWidth / ((stacked ? 1 : groupBarsLen) * (groupGutter + 1) - groupGutter));
        
        if (barWidthProperty in me.style) {
            groupBarWidth = mmin(groupBarWidth, me.style[barWidthProperty]);
            shrunkBarWidth = groupBarWidth * ((stacked ? 1 : groupBarsLen) * (groupGutter + 1) - groupGutter);
        }
        zero = (column) ? bbox.y + bbox.height - padding.bottom : bbox.x + padding.left;

        if (stacked) {
            total = [[], []];
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                total[0][i] = total[0][i] || 0;
                total[1][i] = total[1][i] || 0;
                for (j = 0; j < barsLen; j++) {
                    if (me.__excludes && me.__excludes[j]) {
                        continue;
                    }
                    rec = record.get(bars[j]);
                    total[+(rec > 0)][i] += mabs(rec);
                }
            }
            total[+(maxY > 0)].push(mabs(maxY));
            total[+(minY > 0)].push(mabs(minY));
            minus = mmax.apply(math, total[0]);
            plus = mmax.apply(math, total[1]);
            scale = (column ? bbox.height - padding.height : bbox.width - padding.width) / (plus + minus);
            zero = zero + minus * scale * (column ? -1 : 1);
        }
        else if (minY / maxY < 0) {
            zero = zero - minY * scale * (column ? -1 : 1);
        }

        // If the columns are bound to the x-axis, calculate their positions
        if (me.boundColumn) {
            axis = chart.axes.get(boundAxes.xAxis);
            if (axis) {
                ends = axis.applyData();
                minX = ends.from;
                maxX = ends.to;
            }
            if (me.xField && !Ext.isNumber(minX)) {
                out = me.getMinMaxYValues();
                minX = out[0];
                maxX = out[1];
            }
            if (!Ext.isNumber(minX)) {
                minX = 0;
            }
            if (!Ext.isNumber(maxX)) {
                maxX = 0;
            }
            gutters = me.getGutters();
            colsScale = (bbox.width - (gutters.lower + gutters.upper)) / ((maxX - minX) || 1);

            colsZero = bbox.x + gutters.lower;
        
            barsLoc = [];
            for (i = 0, ln = data.length; i < ln; i++) {
                record = data[i];
                rec = record.get(me.xField);
                barsLoc[i] = colsZero + (rec - minX) * colsScale - (groupBarWidth / 2);
            }
        }
        
        // Or, if column width is configured, place columns over inflections
        else if (me.configuredColumnGirth) {
            axis = chart.axes.get(boundAxes.xAxis);
            if (axis) {
                inflections = axis.inflections;
                if (axis.isCategoryAxis || inflections.length == data.length) {
                    barsLoc = [];
                    for (i = 0, ln = data.length; i < ln; i++) {
                        tick = inflections[i];
                        loc = column ? tick[0] : tick[1];
                        barsLoc[i] = loc - (shrunkBarWidth / 2);
                    }                
                }                
            }
        }

        return {
            bars: bars,
            barsLoc: barsLoc,
            bbox: bbox,
            shrunkBarWidth: shrunkBarWidth,
            barsLen: barsLen,
            groupBarsLen: groupBarsLen,
            barWidth: barWidth,
            groupBarWidth: groupBarWidth,
            scale: scale,
            zero: zero,
            padding: padding,
            signed: minY / maxY < 0,
            minY: minY,
            maxY: maxY
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            data = store.data.items,
            i, total, record,
            bounds = me.bounds = me.getBounds(),
            items = me.items = [],
            yFields = Ext.isArray(me.yField) ? me.yField : [me.yField],
            gutter = me.gutter / 100,
            groupGutter = me.groupGutter / 100,
            animate = chart.animate,
            column = me.column,
            group = me.group,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            shadowGroupsLn = shadowGroups.length,
            bbox = bounds.bbox,
            barWidth = bounds.barWidth,
            shrunkBarWidth = bounds.shrunkBarWidth,
            padding = me.getPadding(),
            stacked = me.stacked,
            barsLen = bounds.barsLen,
            colors = me.colorArrayStyle,
            colorLength = colors && colors.length || 0,
            themeIndex = me.themeIdx,
            reverse = me.reverse,
            math = Math,
            mmax = math.max,
            mmin = math.min,
            mabs = math.abs,
            j, yValue, height, totalDim, totalNegDim, bottom, top, hasShadow, barAttr, attrs, counter,
            totalPositiveValues, totalNegativeValues,
            shadowIndex, shadow, sprite, offset, floorY, idx, itemIdx, xPos, yPos, width, usedWidth, barIdx;

        for (i = 0, total = data.length; i < total; i++) {
            record = data[i];
            bottom = bounds.zero;
            top = bounds.zero;
            totalDim = 0;
            totalNegDim = 0;
            totalPositiveValues = totalNegativeValues = 0;
            hasShadow = false;
            usedWidth = 0;
            
            for (j = 0, counter = 0; j < barsLen; j++) {
                // Excluded series
                if (me.__excludes && me.__excludes[j]) {
                    continue;
                }
                yValue = record.get(bounds.bars[j]);
                if (yValue >= 0) {
                    totalPositiveValues += yValue;
                } else {
                    totalNegativeValues += yValue;
                }
                height = Math.round((yValue - mmax(bounds.minY, 0)) * bounds.scale);
                idx = themeIndex + (barsLen > 1 ? j : 0);
                barAttr = {
                    fill: colors[idx % colorLength]
                };
                
                if (column) {
                    idx = reverse ? (total - i - 1) : i;
                    barIdx = reverse ? (barsLen - counter - 1)  : counter;

                    if (me.boundColumn) {
                        xPos = bounds.barsLoc[idx];
                    }
                    else if (me.configuredColumnGirth && bounds.barsLoc.length) {
                        xPos = bounds.barsLoc[idx] + 
                               barIdx * bounds.groupBarWidth *
                               (1 + groupGutter) * !stacked;
                             
                    }
                    else {
                        xPos = bbox.x + padding.left +
                              (barWidth - shrunkBarWidth) * 0.5 +
                              idx * barWidth * (1 + gutter) +
                              barIdx * bounds.groupBarWidth *
                              (1 + groupGutter) * !stacked;
                    }
                    
                    Ext.apply(barAttr, {
                        height: height,
                        width: mmax(bounds.groupBarWidth, 0),
                        x: xPos,
                        y: bottom - height
                    });
                }
                else {
                    // draw in reverse order
                    offset = (total - 1) - i;
                    width = height + (bottom == bounds.zero);
                    xPos = bottom + (bottom != bounds.zero);

                    if (reverse) {
                        // Subtract 1 for the first item
                        xPos = bounds.zero + bbox.width - width - (usedWidth === 0 ? 1 : 0);
                        if (stacked) {
                            xPos -= usedWidth;
                            usedWidth += width;
                        }
                    }

                    if (me.configuredColumnGirth && bounds.barsLoc.length) {
                        yPos = bounds.barsLoc[i] +
                               counter * bounds.groupBarWidth * (1 + groupGutter) * !stacked;
                    }
                    else {
                        yPos = bbox.y + padding.top +
                               (barWidth - shrunkBarWidth) * 0.5 +
                               offset * barWidth * (1 + gutter) +
                               counter * bounds.groupBarWidth *
                               (1 + groupGutter) * !stacked + 1;
                    }
                    
                    Ext.apply(barAttr, {
                        height: mmax(bounds.groupBarWidth, 0),
                        width: width,
                        x: xPos,
                        y: yPos
                    });
                }
                if (height < 0) {
                    if (column) {
                        barAttr.y = top;
                        barAttr.height = mabs(height);
                    } else {
                        barAttr.x = top + height;
                        barAttr.width = mabs(height);
                    }
                }
                if (stacked) {
                    if (height < 0) {
                        top += height * (column ? -1 : 1);
                    } else {
                        bottom += height * (column ? -1 : 1);
                    }
                    totalDim += mabs(height);
                    if (height < 0) {
                        totalNegDim += mabs(height);
                    }
                }
                barAttr.x = Math.floor(barAttr.x) + 1;
                floorY = Math.floor(barAttr.y);
                if (Ext.isIE8 && barAttr.y > floorY) {
                    floorY--;
                }
                barAttr.y = floorY;
                barAttr.width = Math.floor(barAttr.width);
                barAttr.height = Math.floor(barAttr.height);
                items.push({
                    series: me,
                    yField: yFields[j],
                    storeItem: record,
                    value: [record.get(me.xField), yValue],
                    attr: barAttr,
                    point: column ? [barAttr.x + barAttr.width / 2, yValue >= 0 ? barAttr.y : barAttr.y + barAttr.height] :
                                    [yValue >= 0 ? barAttr.x + barAttr.width : barAttr.x, barAttr.y + barAttr.height / 2]
                });
                // When resizing, reset before animating
                if (animate && chart.resizing) {
                    attrs = column ? {
                        x: barAttr.x,
                        y: bounds.zero,
                        width: barAttr.width,
                        height: 0
                    } : {
                        x: bounds.zero,
                        y: barAttr.y,
                        width: 0,
                        height: barAttr.height
                    };
                    if (enableShadows && (stacked && !hasShadow || !stacked)) {
                        hasShadow = true;
                        //update shadows
                        for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                            shadow = shadowGroups[shadowIndex].getAt(stacked ? i : (i * barsLen + j));
                            if (shadow) {
                                shadow.setAttributes(attrs, true);
                            }
                        }
                    }
                    //update sprite position and width/height
                    sprite = group.getAt(i * barsLen + j);
                    if (sprite) {
                        sprite.setAttributes(attrs, true);
                    }
                }
                counter++;
            }
            if (stacked && items.length) {
                items[i * counter].totalDim = totalDim;
                items[i * counter].totalNegDim = totalNegDim;
                items[i * counter].totalPositiveValues = totalPositiveValues;
                items[i * counter].totalNegativeValues = totalNegativeValues;
            }
        }
        if (stacked && counter == 0) {
            // Remove ghost shadow ref: EXTJSIV-5982
            for (i = 0, total = data.length; i < total; i++) {
                for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                    shadow = shadowGroups[shadowIndex].getAt(i);
                    if (shadow) {
                        shadow.hide(true);
                    }
                }
            }
        }
    },

    // @private render/setAttributes on the shadows
    renderShadows: function(i, barAttr, baseAttrs, bounds) {
        var me = this,
            chart = me.chart,
            surface = chart.surface,
            animate = chart.animate,
            stacked = me.stacked,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.shadowAttributes,
            shadowGroupsLn = shadowGroups.length,
            store = chart.getChartStore(),
            column = me.column,
            items = me.items,
            shadows = [],
            reverse = me.reverse,
            zero = bounds.zero,
            shadowIndex, shadowBarAttr, shadow, totalDim, totalNegDim, j, rendererAttributes;

        if ((stacked && (i % bounds.groupBarsLen === 0)) || !stacked) {
            j = i / bounds.groupBarsLen;
            //create shadows
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowBarAttr = Ext.apply({}, shadowAttributes[shadowIndex]);
                shadow = shadowGroups[shadowIndex].getAt(stacked ? j : i);
                Ext.copyTo(shadowBarAttr, barAttr, 'x,y,width,height');
                if (!shadow) {
                    shadow = surface.add(Ext.apply({
                        type: 'rect',
                        isShadow: true,
                        group: shadowGroups[shadowIndex]
                    }, Ext.apply({}, baseAttrs, shadowBarAttr)));
                }
                if (stacked) {
                    totalDim = items[i].totalDim;
                    totalNegDim = items[i].totalNegDim;
                    if (column) {
                        shadowBarAttr.y = zero + totalNegDim - totalDim - 1;
                        shadowBarAttr.height = totalDim;
                    } else {
                        if (reverse) {
                            shadowBarAttr.x = zero + bounds.bbox.width - totalDim;
                        } else {
                            shadowBarAttr.x = zero - totalNegDim;
                        }
                        shadowBarAttr.width = totalDim;
                    }
                }
                
                rendererAttributes = me.renderer(shadow, store.getAt(j), shadowBarAttr, i, store);
                rendererAttributes.hidden = !!barAttr.hidden;
                if (animate) {
                    me.onAnimate(shadow, {
                        zero: bounds.zero + (reverse ? bounds.bbox.width : 0), 
                        to: rendererAttributes 
                    });
                }
                else {
                    shadow.setAttributes(rendererAttributes, true);
                }
                shadows.push(shadow);
            }
        }
        return shadows;
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.chart,
            store = chart.getChartStore(),
            surface = chart.surface,
            animate = chart.animate,
            stacked = me.stacked,
            column = me.column,
            chartAxes = chart.axes,
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            enableShadows = chart.shadow,
            shadowGroups = me.shadowGroups,
            shadowGroupsLn = shadowGroups.length,
            group = me.group,
            seriesStyle = me.seriesStyle,
            items, ln, i, j, baseAttrs, sprite, rendererAttributes, shadowIndex, shadowGroup,
            bounds, endSeriesStyle, barAttr, attrs, anim;

        if (!store || !store.getCount() || me.seriesIsHidden) {
            me.hide();
            me.items = [];
            return;
        }

        //fill colors are taken from the colors array.
        endSeriesStyle = Ext.apply({}, this.style, seriesStyle);
        delete endSeriesStyle.fill;
        delete endSeriesStyle.x;
        delete endSeriesStyle.y;
        delete endSeriesStyle.width;
        delete endSeriesStyle.height;
        
        me.unHighlightItem();
        me.cleanHighlights();
        
        me.boundColumn = (boundXAxis && Ext.Array.contains(me.axis,boundXAxis) 
                            && chartAxes.get(boundXAxis) 
                            && chartAxes.get(boundXAxis).isNumericAxis);

        me.getPaths();
        bounds = me.bounds;
        items = me.items;

        baseAttrs = column ? {
            y: bounds.zero,
            height: 0
        } : {
            x: bounds.zero,
            width: 0
        };
        ln = items.length;

        // Create new or reuse sprites and animate/display
        for (i = 0; i < ln; i++) {
            sprite = group.getAt(i);
            barAttr = items[i].attr;

            if (enableShadows) {
                items[i].shadows = me.renderShadows(i, barAttr, baseAttrs, bounds);
            }

            // Create a new sprite if needed (no height)
            if (!sprite) {
                attrs = Ext.apply({}, baseAttrs, barAttr);
                attrs = Ext.apply(attrs, endSeriesStyle || {});
                sprite = surface.add(Ext.apply({}, {
                    type: 'rect',
                    group: group
                }, attrs));
            }
            if (animate) {
                rendererAttributes = me.renderer(sprite, store.getAt(i), barAttr, i, store);
                sprite._to = rendererAttributes;
                anim = me.onAnimate(sprite, {
                    zero: bounds.zero + (me.reverse ? bounds.bbox.width : 0),
                    to: Ext.apply(rendererAttributes, endSeriesStyle) 
                });
                if (enableShadows && stacked && (i % bounds.barsLen === 0)) {
                    j = i / bounds.barsLen;
                    for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                        anim.on('afteranimate', function() {
                            this.show(true);
                        }, shadowGroups[shadowIndex].getAt(j));
                    }
                }
            }
            else {
                rendererAttributes = me.renderer(sprite, store.getAt(i), Ext.apply(barAttr, { hidden: false }), i, store);
                sprite.setAttributes(Ext.apply(rendererAttributes, endSeriesStyle), true);
            }
            items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (j = i; j < ln; j++) {
            group.getAt(j).hide(true);
        }
        
        if (me.stacked) {
            // If stacked, we have only store.getCount() shadows.
            i = store.getCount();    
        }
        
        // Hide unused shadows
        if (enableShadows) {
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowGroup = shadowGroups[shadowIndex];
                ln = shadowGroup.getCount();
                for (j = i; j < ln; j++) {
                    shadowGroup.getAt(j).hide(true);
                }
            }
        }
        me.renderLabels();
    },

    // @private called when a label is to be created.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            surface = me.chart.surface,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.seriesLabelStyle || {}),
            sprite;

        return surface.add(Ext.apply({
            type: 'text',
            group: group
        }, endLabelStyle || {}));
    },

    // @private called when a label is to be positioned.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        // Determine the label's final position. Starts with the configured preferred value but
        // may get flipped from inside to outside or vice-versa depending on space.
        var me = this,
            opt = me.bounds,
            groupBarWidth = opt.groupBarWidth,
            column = me.column,
            chart = me.chart,
            chartBBox = chart.chartBBox,
            resizing = chart.resizing,
            xValue = item.value[0],
            yValue = item.value[1],
            attr = item.attr,
            config = me.label,
            stacked = me.stacked,
            stackedDisplay = config.stackedDisplay,
            rotate = (config.orientation == 'vertical'),
            field = [].concat(config.field),
            format = config.renderer,
            text, size, width, height,
            zero = opt.zero,
            insideStart = 'insideStart',
            insideEnd = 'insideEnd',
            outside = 'outside',
            over = 'over',
            under = 'under',
            labelMarginX = 4,   // leave space around the labels (important when saving chart as image)
            labelMarginY = 2,
            signed = opt.signed,
            reverse = me.reverse,
            x, y, finalAttr;

        if (display == insideStart || display == insideEnd || display == outside) {
            if (stacked && (display == outside)) {
                // It doesn't make sense to use 'outside' on a stacked chart
                // unless we only want to display the 'stackedDisplay' labels.
                label.hide(true);
                return;
            }
            label.setAttributes({
                // Reset the style in case the label is being reused (for instance, if a series is excluded)
                // and do it before calling the renderer function.
                style: undefined
            });
            text = (Ext.isNumber(index) ? format(storeItem.get(field[index]), label, storeItem, item, i, display, animate, index) : '');
            label.setAttributes({
                // Set the text onto the label.
                text: text
            });
            size = me.getLabelSize(text, label.attr.style);
            width = size.width;
            height = size.height;
            if (column) {
                //-----------------------------------------
                // Position the label within a column chart
            
                // If there is no label to display, or if the corresponding box in a stacked column 
                // isn't tall enough to display the label, then leave.
                if (!width || !height || (stacked && (attr.height < height))) {
                    label.hide(true);
                    return;
                }
                
                // Align horizontally the label in the middle of the column
                x = attr.x + (rotate ? groupBarWidth/2 : (groupBarWidth - width)/2);
                
                // If the label is to be displayed outside, make sure there is room for it, otherwise display it inside.
                if (display == outside) {
                    var free = (yValue >= 0 ? (attr.y - chartBBox.y) : (chartBBox.y + chartBBox.height - attr.y - attr.height));
                    if (free < height + labelMarginY) {
                        display = insideEnd;
                    }
                }
    
                // If the label is to be displayed inside a non-stacked chart, make sure it is 
                // not taller than the box, otherwise move it outside.
                if (!stacked && (display != outside)) {
                    if (height + labelMarginY > attr.height) {
                        display = outside;
                    }
                }
    
                // Place the label vertically depending on its config and on whether the value
                // it represents is positive (above the X-axis) or negative (below the X-axis)
                if (!y) {
                    y = attr.y;
                    if (yValue >= 0) {
                        switch (display) {
                            case insideStart: y += attr.height + (rotate ? -labelMarginY : -height/2);  break;
                            case insideEnd:   y += (rotate ? height + labelMarginX : height/2);         break;
                            case outside:     y += (rotate ? -labelMarginY : -height/2);                break;
                        }
                    } else {
                        switch (display) {
                            case insideStart: y += (rotate ? height + labelMarginY : height/2);                             break;
                            case insideEnd:   y += (rotate ? attr.height - labelMarginY : attr.height - height/2);          break;
                            case outside:     y += (rotate ? attr.height + height + labelMarginY : attr.height + height/2); break;
                        }
                    }
                }
            }
            else {
                //-----------------------------------------
                // Position the label within a bar chart
    
                // If there is no label to display, or if the corresponding box has no width, then leave.
                if (!width || !height || (stacked && !attr.width)) {
                    label.hide(true);
                    return;
                }
    
                // Align vertically the label in the middle of the bar
                y = attr.y + (rotate ? (groupBarWidth + height)/2 : groupBarWidth/2);
    
                // If the label is to be displayed outside, make sure there is room for it otherwise display it inside.
                if (display == outside) {
                    var free = (yValue >= 0 ? (chartBBox.x + chartBBox.width - attr.x - attr.width) :  (attr.x - chartBBox.x));
                    if (free < width + labelMarginX) {
                        display = insideEnd;
                    }
                }
    
                // If the label is to be displayed inside (and it is not rotated yet), make sure it is
                // not wider than the box it represents otherwise (for a stacked chart) rotate it vertically
                // and center it, or (for a non-stacked chart) move it outside.
                if ((display != outside) && !rotate) {
                    // Add a slight fudge factor here to make sure we're not flush against the edge
                    if (width + labelMarginX * 2 >= attr.width) {
                        if (stacked) {
                            if (height > attr.width) {
                                label.hide(true);
                                return; // Even rotated, there isn't enough room.
                            }
                            x = attr.x + attr.width/2;
                            rotate = true;
                        } else {
                            display = outside;
                        }
                    }
                }
    
                // Place the label horizontally depending on its config and on whether the value
                // it represents is positive (above the X-axis) or negative (below the X-axis)
                if (!x) {
                    x = attr.x;
                    if (yValue >= 0) {
                        switch (display) {
                            case insideStart:
                                if (reverse) {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                } else { 
                                    x += (rotate ? width/2 : labelMarginX);
                                }
                                break;
                            case insideEnd:   
                                if (reverse) {
                                    x -= rotate ? -width/2 : -width - labelMarginX;
                                } else {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                }    
                                break;
                            case outside:     
                                if (reverse) {
                                    x -= width + (rotate ? width/2 : labelMarginX);
                                } else {
                                    x += attr.width + (rotate ? width/2 : labelMarginX);
                                }         
                                break;
                        }
                    } else {
                        switch (display) {
                            case insideStart: 
                                if (reverse) {
                                    x -= rotate ? -width/2 : -width - labelMarginX;
                                } else {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                }    
                                break;
                            case insideEnd:
                                if (reverse) {
                                    x += attr.width + (rotate ? -width/2 : -width - labelMarginX);
                                } else {   
                                    x += (rotate ? width/2 : labelMarginX);
                                }                          
                                break;
                            case outside:
                                if (reverse) {
                                    x -= width + (rotate ? width/2 : labelMarginX);
                                } else {     
                                    x += (rotate ? -width/2 : -width - labelMarginX);
                                }                 
                                break;
                        }
                    }
                }
            }
        } else if (display == over || display == under) {
            if (stacked && stackedDisplay) {
                //-----------------------------------------
                // Position the label on top or at the bottom of a stacked bar/column
    
                text = label.attr.text;
                label.setAttributes({
                    // The text is already set onto the label: we just need to set the style
                    // (but don't overwrite any custom style that might have been set by an app override).
                    style: Ext.applyIf((label.attr && label.attr.style) || {},
                        {
                            'font-weight':'bold',
                            'font-size':'14px'
                        }
                    )
                });

                size = me.getLabelSize(text, label.attr.style);
                width = size.width;
                height = size.height;
    
                switch (display) {
                    case over:
                        if (column) {
                            x = attr.x + (rotate ? groupBarWidth/2 : (groupBarWidth - width)/2);
                            y = zero - (item.totalDim - item.totalNegDim) - height/2 - labelMarginY;
                        } else {
                            x = zero + (item.totalDim - item.totalNegDim) + labelMarginX;
                            y = attr.y + (rotate ? (groupBarWidth + height)/2 : groupBarWidth/2);
                        }
                        break;
                    case under:
                        if (column) {
                            x = attr.x + (rotate ? groupBarWidth/2 : (groupBarWidth - width)/2);
                            y = zero + item.totalNegDim + height/2;
                        } else {
                            x = zero - item.totalNegDim - width - labelMarginX;
                            y = attr.y + (rotate ? (groupBarWidth + height)/2 : groupBarWidth/2);
                        }
                        break;
                }
            }
        }
        
        if (x == undefined || y == undefined) {
            // bad configuration: x/y are not set
            label.hide(true);
            return;
        }

        label.isOutside = (display == outside);
        label.setAttributes({
            text: text
        });

        //set position
        finalAttr = {
            x: x,
            y: y
        };
        
        // Rotate if we need to, but if not clear any previous rotation because we
        // are reusing the label
        finalAttr.rotate = rotate ? {
            x: x,
            y: y,
            degrees: 270
        } : me.defaultRotate;
        
        //check for resizing
        if (animate && resizing) {
            if (column) {
                x = attr.x + attr.width / 2;
                y = zero;
            } else {
                x = zero;
                y = attr.y + attr.height / 2;
            }
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (rotate) {
                label.setAttributes({
                    rotate: {
                        x: x,
                        y: y,
                        degrees: 270
                    }
                }, true);
            }
        }
        
        //handle animation
        if (animate) {
            me.onAnimate(label, {
                zero: item.point[0], 
                to: finalAttr 
            });
        }
        else {
            label.setAttributes(Ext.apply(finalAttr, {
                hidden: false
            }), true);
        }
    },

    /* @private
     * Gets the dimensions of a given bar label. Uses a single hidden sprite to avoid
     * changing visible sprites.
     * @param value
     */
    getLabelSize: function(value, labelStyle) {
        var tester = this.testerLabel,
            config = this.label,
            endLabelStyle = Ext.apply({}, config, labelStyle, this.seriesLabelStyle || {}),
            rotated = config.orientation === 'vertical',
            bbox, w, h,
            undef;
        if (!tester) {
            tester = this.testerLabel = this.chart.surface.add(Ext.apply({
                type: 'text',
                opacity: 0
            }, endLabelStyle));
        }
        tester.setAttributes({
            style: labelStyle,
            text: value
        }, true);

        // Flip the width/height if rotated, as getBBox returns the pre-rotated dimensions
        bbox = tester.getBBox();
        w = bbox.width;
        h = bbox.height;
        return {
            width: rotated ? h : w,
            height: rotated ? w : h
        };
    },

    // @private used to animate label, markers and other sprites.
    onAnimate: function(sprite, attr) {
        var me = this,
            to = attr.to,
            stacked = me.stacked,
            reverse = me.reverse,
            width = 0,
            isText, bbox, x, from;
            
        sprite.show();
        
        if (!me.column) {
            if (reverse) {
                bbox = sprite.getBBox();
                isText = sprite.type == 'text';
                // If we're highlighting, we don't want to reset the position
                // so just grab the current position
                if (!me.inHighlight) {
                    if (!stacked) {
                        if (isText) {
                            // Fudge factor, if the text has yet to be positioned it will be < 5
                            x = bbox.x >= 5 ? x : attr.zero;
                        } else {
                            if (bbox.width) {
                                width = bbox.width;
                            }
                            x = bbox.width ? bbox.x : to.x + to.width;
                        }
                    } else {
                        x = attr.zero;
                    }
                }
                attr.from = {
                    x: x,
                    width: width
                };
            }
            
            if (stacked) {
                from = attr.from;
                if (!from) {
                    from = attr.from = {};
                }
                from.y = to.y;
                if (!reverse) {
                    from.x = attr.zero;
                    if (sprite.isShadow) {
                        from.width = 0;
                    }
                }
            }
        }
        
        return this.callParent(arguments);
    },

    isItemInPoint: function(x, y, item) {
        var bbox = item.sprite.getBBox();
        return bbox.x <= x && bbox.y <= y
            && (bbox.x + bbox.width) >= x
            && (bbox.y + bbox.height) >= y;
    },

    // @private hide all markers
    hideAll: function(index) {
        var axes      = this.chart.axes,
            axesItems = axes.items,
            ln        = axesItems.length,
            i         = 0;

        index = (isNaN(this._index) ? index : this._index) || 0;

        if (!this.__excludes) {
            this.__excludes = [];
        }

        this.__excludes[index] = true;
        this.drawSeries();

        for (i; i < ln; i++) {
            axesItems[i].drawAxis();
        }    
    },

    // @private show all markers
    showAll: function(index) {
        var axes = this.chart.axes,
            axesItems = axes.items,
            ln        = axesItems.length,
            i         = 0;

        index = (isNaN(this._index) ? index : this._index) || 0;

        if (!this.__excludes) {
            this.__excludes = [];
        }

        this.__excludes[index] = false;
        this.drawSeries();

        for (i; i < ln; i++) {
            axesItems[i].drawAxis();
        }    
    },

    /**
     * Returns a string with the color to be used for the series legend item.
     * @param index
     */
    getLegendColor: function(index) {
        var me = this,
            colors = me.colorArrayStyle,
            colorLength = colors && colors.length;

        if (me.style && me.style.fill) {
            return me.style.fill;
        } else {
            return (colors ? colors[(me.themeIdx + index) % colorLength] : '#000');
        }
    },

    highlightItem: function(item) {
        this.callParent(arguments);
        this.inHighlight = true;
        this.renderLabels();
        delete this.inHighlight;
    },

    unHighlightItem: function() {
        this.callParent(arguments);
        this.inHighlight = true;
        this.renderLabels();
        delete this.inHighlight;
    },

    cleanHighlights: function() {
        this.callParent(arguments);
        this.inHighlight = true;
        this.renderLabels();
        delete this.inHighlight;
    }
});
