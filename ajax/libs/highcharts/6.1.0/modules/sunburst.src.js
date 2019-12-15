/**
 * @license Highcharts JS v6.1.0 (2018-04-13)
 *
 * (c) 2016 Highsoft AS
 * Authors: Jon Arild Nygard
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {
	var draw = (function () {
		var isFn = function (x) {
		    return typeof x === 'function';
		};

		/**
		 * draw - Handles the drawing of a point.
		 * TODO: add type checking.
		 *
		 * @param  {object} params Parameters.
		 * @return {undefined} Returns undefined.
		 */
		var draw = function draw(params) {
		    var point = this,
		        graphic = point.graphic,
		        animate = params.animate,
		        attr = params.attr,
		        onComplete = params.onComplete,
		        css = params.css,
		        group = params.group,
		        renderer = params.renderer,
		        shape = params.shapeArgs,
		        type = params.shapeType;

		    if (point.shouldDraw()) {
		        if (!graphic) {
		            point.graphic = graphic = renderer[type](shape).add(group);
		        }
		        graphic.css(css).attr(attr).animate(animate, undefined, onComplete);
		    } else if (graphic) {
		        graphic.animate(animate, undefined, function () {
		            point.graphic = graphic = graphic.destroy();
		            if (isFn(onComplete)) {
		                onComplete();
		            }
		        });
		    }
		    if (graphic) {
		        graphic.addClass(point.getClassName(), true);
		    }
		};


		return draw;
	}());
	var result = (function (H) {
		var each = H.each,
		    extend = H.extend,
		    isArray = H.isArray,
		    isBoolean = function (x) {
		        return typeof x === 'boolean';
		    },
		    isFn = function (x) {
		        return typeof x === 'function';
		    },
		    isObject = H.isObject,
		    isNumber = H.isNumber,
		    merge = H.merge,
		    pick = H.pick,
		    reduce = H.reduce;
		// TODO Combine buildTree and buildNode with setTreeValues
		// TODO Remove logic from Treemap and make it utilize this mixin.
		var setTreeValues = function setTreeValues(tree, options) {
		    var before = options.before,
		        idRoot = options.idRoot,
		        mapIdToNode = options.mapIdToNode,
		        nodeRoot = mapIdToNode[idRoot],
		        levelIsConstant = (
		            isBoolean(options.levelIsConstant) ?
		            options.levelIsConstant :
		            true
		        ),
		        points = options.points,
		        point = points[tree.i],
		        optionsPoint = point && point.options || {},
		        childrenTotal = 0,
		        children = [],
		        value;
		    extend(tree, {
		        levelDynamic: tree.level - (levelIsConstant ? 0 : nodeRoot.level),
		        name: pick(point && point.name, ''),
		        visible: (
		            idRoot === tree.id ||
		            (isBoolean(options.visible) ? options.visible : false)
		        )
		    });
		    if (isFn(before)) {
		        tree = before(tree, options);
		    }
		    // First give the children some values
		    each(tree.children, function (child, i) {
		        var newOptions = extend({}, options);
		        extend(newOptions, {
		            index: i,
		            siblings: tree.children.length,
		            visible: tree.visible
		        });
		        child = setTreeValues(child, newOptions);
		        children.push(child);
		        if (child.visible) {
		            childrenTotal += child.val;
		        }
		    });
		    tree.visible = childrenTotal > 0 || tree.visible;
		    // Set the values
		    value = pick(optionsPoint.value, childrenTotal);
		    extend(tree, {
		        children: children,
		        childrenTotal: childrenTotal,
		        isLeaf: tree.visible && !childrenTotal,
		        val: value
		    });
		    return tree;
		};

		var getColor = function getColor(node, options) {
		    var index = options.index,
		        mapOptionsToLevel = options.mapOptionsToLevel,
		        parentColor = options.parentColor,
		        parentColorIndex = options.parentColorIndex,
		        series = options.series,
		        colors = options.colors,
		        siblings = options.siblings,
		        points = series.points,
		        getColorByPoint,
		        point,
		        level,
		        colorByPoint,
		        colorIndexByPoint,
		        color,
		        colorIndex;
		    function variation(color) {
		        var colorVariation = level && level.colorVariation;
		        if (colorVariation) {
		            if (colorVariation.key === 'brightness') {
		                return H.color(color).brighten(
		                    colorVariation.to * (index / siblings)
		                ).get();
		            }
		        }

		        return color;
		    }

		    if (node) {
		        point = points[node.i];
		        level = mapOptionsToLevel[node.level] || {};
		        getColorByPoint = point && level.colorByPoint;

		        if (getColorByPoint) {
		            colorIndexByPoint = point.index % (colors ?
		                colors.length :
		                series.chart.options.chart.colorCount
		            );
		            colorByPoint = colors && colors[colorIndexByPoint];
		        }

        
		        // Select either point color, level color or inherited color.
		        color = pick(
		            point && point.options.color,
		            level && level.color,
		            colorByPoint,
		            parentColor && variation(parentColor),
		            series.color
		        );
        
		        colorIndex = pick(
		            point && point.options.colorIndex,
		            level && level.colorIndex,
		            colorIndexByPoint,
		            parentColorIndex,
		            options.colorIndex
		        );
		    }
		    return {
		        color: color,
		        colorIndex: colorIndex
		    };
		};

		/**
		 * getLevelOptions - Creates a map from level number to its given options.
		 * @param {Object} params Object containing parameters.
		 * @param {Object} params.defaults Object containing default options. The
		 * default options are merged with the userOptions to get the final options for
		 * a specific level.
		 * @param {Number} params.from The lowest level number.
		 * @param {Array} params.levels User options from series.levels.
		 * @param {Number} params.to The highest level number.
		 * @return {null|Object} Returns a map from level number to its given options.
		 * Returns null if invalid input parameters.
		 */
		var getLevelOptions = function getLevelOptions(params) {
		    var result = null,
		        defaults,
		        converted,
		        i,
		        from,
		        to,
		        levels;
		    if (isObject(params)) {
		        result = {};
		        from = isNumber(params.from) ? params.from : 1;
		        levels = params.levels;
		        converted = {};
		        defaults = isObject(params.defaults) ? params.defaults : {};
		        if (isArray(levels)) {
		            converted = reduce(levels, function (obj, item) {
		                var level,
		                    levelIsConstant,
		                    options;
		                if (isObject(item) && isNumber(item.level)) {
		                    options = merge({}, item);
		                    levelIsConstant = (
		                        isBoolean(options.levelIsConstant) ?
		                        options.levelIsConstant :
		                        defaults.levelIsConstant
		                    );
		                    // Delete redundant properties.
		                    delete options.levelIsConstant;
		                    delete options.level;
		                    // Calculate which level these options apply to.
		                    level = item.level + (levelIsConstant ? 0 : from - 1);
		                    if (isObject(obj[level])) {
		                        extend(obj[level], options);
		                    } else {
		                        obj[level] = options;
		                    }
		                }
		                return obj;
		            }, {});
		        }
		        to = isNumber(params.to) ? params.to : 1;
		        for (i = 0; i <= to; i++) {
		            result[i] = merge(
		                {},
		                defaults,
		                isObject(converted[i]) ? converted[i] : {}
		            );
		        }
		    }
		    return result;
		};

		/**
		 * Update the rootId property on the series. Also makes sure that it is
		 * accessible to exporting.
		 * @param {object} series The series to operate on.
		 * @returns Returns the resulting rootId after update.
		 */
		var updateRootId = function (series) {
		    var rootId,
		        options;
		    if (isObject(series)) {
		        // Get the series options.
		        options = isObject(series.options) ? series.options : {};

		        // Calculate the rootId.
		        rootId = pick(series.rootNode, options.rootId, '');

		        // Set rootId on series.userOptions to pick it up in exporting.
		        if (isObject(series.userOptions)) {
		            series.userOptions.rootId = rootId;
		        }
		        // Set rootId on series to pick it up on next update.
		        series.rootNode = rootId;
		    }
		    return rootId;
		};

		var result = {
		    getColor: getColor,
		    getLevelOptions: getLevelOptions,
		    setTreeValues: setTreeValues,
		    updateRootId: updateRootId
		};

		return result;
	}(Highcharts));
	(function (H, mixinTreeSeries) {
		/**
		 * (c) 2014 Highsoft AS
		 * Authors: Jon Arild Nygard / Oystein Moseng
		 *
		 * License: www.highcharts.com/license
		 */

		var seriesType = H.seriesType,
		    seriesTypes = H.seriesTypes,
		    map = H.map,
		    merge = H.merge,
		    extend = H.extend,
		    noop = H.noop,
		    each = H.each,
		    getColor = mixinTreeSeries.getColor,
		    getLevelOptions = mixinTreeSeries.getLevelOptions,
		    grep = H.grep,
		    isBoolean = function (x) {
		        return typeof x === 'boolean';
		    },
		    isNumber = H.isNumber,
		    isObject = H.isObject,
		    isString = H.isString,
		    pick = H.pick,
		    Series = H.Series,
		    stableSort = H.stableSort,
		    color = H.Color,
		    eachObject = function (list, func, context) {
		        context = context || this;
		        H.objectEach(list, function (val, key) {
		            func.call(context, val, key, list);
		        });
		    },
		    reduce = H.reduce,
		    // @todo find correct name for this function.
		    // @todo Similar to reduce, this function is likely redundant
		    recursive = function (item, func, context) {
		        var next;
		        context = context || this;
		        next = func.call(context, item);
		        if (next !== false) {
		            recursive(next, func, context);
		        }
		    },
		    updateRootId = mixinTreeSeries.updateRootId;

		/**
		 * A treemap displays hierarchical data using nested rectangles. The data can be
		 * laid out in varying ways depending on options.
		 *
		 * @sample highcharts/demo/treemap-large-dataset/ Treemap
		 *
		 * @extends {plotOptions.scatter}
		 * @excluding marker
		 * @product highcharts
		 * @optionparent plotOptions.treemap
		 */
		seriesType('treemap', 'scatter', {

		    /**
		     * When enabled the user can click on a point which is a parent and
		     * zoom in on its children.
		     *
		     * @type {Boolean}
		     * @sample {highcharts} highcharts/plotoptions/treemap-allowdrilltonode/ Enabled
		     * @default false
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.allowDrillToNode
		     */

		    /**
		     * When the series contains less points than the crop threshold, all
		     * points are drawn, event if the points fall outside the visible plot
		     * area at the current zoom. The advantage of drawing all points (including
		     * markers and columns), is that animation is performed on updates.
		     * On the other hand, when the series contains more points than the
		     * crop threshold, the series data is cropped to only contain points
		     * that fall within the plot area. The advantage of cropping away invisible
		     * points is to increase performance on large series.
		     *
		     * @type {Number}
		     * @default 300
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.cropThreshold
		     */

		    /**
		     * This option decides if the user can interact with the parent nodes
		     * or just the leaf nodes. When this option is undefined, it will be
		     * true by default. However when allowDrillToNode is true, then it will
		     * be false by default.
		     *
		     * @type {Boolean}
		     * @sample {highcharts} highcharts/plotoptions/treemap-interactbyleaf-false/ False
		     * @sample {highcharts} highcharts/plotoptions/treemap-interactbyleaf-true-and-allowdrilltonode/ InteractByLeaf and allowDrillToNode is true
		     * @since 4.1.2
		     * @product highcharts
		     * @apioption plotOptions.treemap.interactByLeaf
		     */

		    /**
		     * The sort index of the point inside the treemap level.
		     *
		     * @type {Number}
		     * @sample {highcharts} highcharts/plotoptions/treemap-sortindex/ Sort by years
		     * @since 4.1.10
		     * @product highcharts
		     * @apioption plotOptions.treemap.sortIndex
		     */

		    /**
		     * When using automatic point colors pulled from the `options.colors`
		     * collection, this option determines whether the chart should receive
		     * one color per series or one color per point.
		     *
		     * @type {Boolean}
		     * @see [series colors](#plotOptions.treemap.colors)
		     * @default false
		     * @since 2.0
		     * @apioption plotOptions.treemap.colorByPoint
		     */

		    /**
		     * A series specific or series type specific color set to apply instead
		     * of the global [colors](#colors) when [colorByPoint](
		     * #plotOptions.treemap.colorByPoint) is true.
		     *
		     * @type {Array<Color>}
		     * @since 3.0
		     * @apioption plotOptions.treemap.colors
		     */

		    /**
		     * Whether to display this series type or specific series item in the
		     * legend.
		     *
		     * @type {Boolean}
		     * @default false
		     * @product highcharts
		     */
		    showInLegend: false,

		    /**
		     * @ignore
		     */
		    marker: false,
		    colorByPoint: false,
		    /**
		     * @extends plotOptions.heatmap.dataLabels
		     * @since 4.1.0
		     * @product highcharts
		     */
		    dataLabels: {
		        enabled: true,
		        defer: false,
		        verticalAlign: 'middle',
		        formatter: function () { // #2945
		            return this.point.name || this.point.id;
		        },
		        inside: true
		    },

		    tooltip: {
		        headerFormat: '',
		        pointFormat: '<b>{point.name}</b>: {point.value}<br/>'
		    },

		    /**
		     * Whether to ignore hidden points when the layout algorithm runs.
		     * If `false`, hidden points will leave open spaces.
		     *
		     * @type {Boolean}
		     * @default true
		     * @since 5.0.8
		     * @product highcharts
		     */
		    ignoreHiddenPoint: true,

		    /**
		     * This option decides which algorithm is used for setting position
		     * and dimensions of the points. Can be one of `sliceAndDice`, `stripes`,
		     *  `squarified` or `strip`.
		     *
		     * @validvalue ["sliceAndDice", "stripes", "squarified", "strip"]
		     * @type {String}
		     * @see [How to write your own algorithm](http://www.highcharts.com/docs/chart-
		     * and-series-types/treemap)
		     * @sample {highcharts} highcharts/plotoptions/treemap-layoutalgorithm-sliceanddice/ SliceAndDice by default
		     * @sample {highcharts} highcharts/plotoptions/treemap-layoutalgorithm-stripes/ Stripes
		     * @sample {highcharts} highcharts/plotoptions/treemap-layoutalgorithm-squarified/ Squarified
		     * @sample {highcharts} highcharts/plotoptions/treemap-layoutalgorithm-strip/ Strip
		     * @default sliceAndDice
		     * @since 4.1.0
		     * @product highcharts
		     */
		    layoutAlgorithm: 'sliceAndDice',

		    /**
		     * Defines which direction the layout algorithm will start drawing.
		     *  Possible values are "vertical" and "horizontal".
		     *
		     * @validvalue ["vertical", "horizontal"]
		     * @type {String}
		     * @default vertical
		     * @since 4.1.0
		     * @product highcharts
		     */
		    layoutStartingDirection: 'vertical',

		    /**
		     * Enabling this option will make the treemap alternate the drawing
		     * direction between vertical and horizontal. The next levels starting
		     * direction will always be the opposite of the previous.
		     *
		     * @type {Boolean}
		     * @sample {highcharts} highcharts/plotoptions/treemap-alternatestartingdirection-true/ Enabled
		     * @default false
		     * @since 4.1.0
		     * @product highcharts
		     */
		    alternateStartingDirection: false,

		    /**
		     * Used together with the levels and allowDrillToNode options. When
		     * set to false the first level visible when drilling is considered
		     * to be level one. Otherwise the level will be the same as the tree
		     * structure.
		     *
		     * @type {Boolean}
		     * @default true
		     * @since 4.1.0
		     * @product highcharts
		     */
		    levelIsConstant: true,

		    /**
		     * Options for the button appearing when drilling down in a treemap.
		     */
		    drillUpButton: {

		        /**
		         * The position of the button.
		         */
		        position: {

		            /**
		             * Vertical alignment of the button.
		             *
		             * @default top
		             * @validvalue ["top", "middle", "bottom"]
		             * @apioption plotOptions.treemap.drillUpButton.position.verticalAlign
		             */

		            /**
		             * Horizontal alignment of the button.
		             * @validvalue ["left", "center", "right"]
		             */
		            align: 'right',

		            /**
		             * Horizontal offset of the button.
		             * @default -10
		             * @type {Number}
		             */
		            x: -10,

		            /**
		             * Vertical offset of the button.
		             */
		            y: 10
		        }
		    },


		    /**
		     * Set options on specific levels. Takes precedence over series options,
		     * but not point options.
		     *
		     * @type {Array<Object>}
		     * @sample {highcharts} highcharts/plotoptions/treemap-levels/
		     *         Styling dataLabels and borders
		     * @sample {highcharts} highcharts/demo/treemap-with-levels/
		     *         Different layoutAlgorithm
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels
		     */

		    /**
		     * Can set a `borderColor` on all points which lies on the same level.
		     *
		     * @type {Color}
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.borderColor
		     */

		    /**
		     * Set the dash style of the border of all the point which lies on the
		     * level. See <a href"#plotoptions.scatter.dashstyle">
		     * plotOptions.scatter.dashStyle</a> for possible options.
		     *
		     * @type {String}
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.borderDashStyle
		     */

		    /**
		     * Can set the borderWidth on all points which lies on the same level.
		     *
		     * @type {Number}
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.borderWidth
		     */

		    /**
		     * Can set a color on all points which lies on the same level.
		     *
		     * @type {Color}
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.color
		     */

		    /**
		     * A configuration object to define how the color of a child varies from the
		     * parent's color. The variation is distributed among the children of node.
		     * For example when setting brightness, the brightness change will range
		     * from the parent's original brightness on the first child, to the amount
		     * set in the `to` setting on the last node. This allows a gradient-like
		     * color scheme that sets children out from each other while highlighting
		     * the grouping on treemaps and sectors on sunburst charts.
		     *
		     * @type {Object}
		     * @sample highcharts/demo/sunburst/ Sunburst with color variation
		     * @since 6.0.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.colorVariation
		     */

		    /**
		     * The key of a color variation. Currently supports `brightness` only.
		     *
		     * @type {String}
		     * @validvalue ["brightness"]
		     * @since 6.0.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.colorVariation.key
		     */

		    /**
		     * The ending value of a color variation. The last sibling will receive this
		     * value.
		     *
		     * @type {Number}
		     * @since 6.0.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.colorVariation.to
		     */

		    /**
		     * Can set the options of dataLabels on each point which lies on the
		     * level. [plotOptions.treemap.dataLabels](#plotOptions.treemap.dataLabels)
		     * for possible values.
		     *
		     * @type {Object}
		     * @default undefined
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.dataLabels
		     */

		    /**
		     * Can set the layoutAlgorithm option on a specific level.
		     *
		     * @validvalue ["sliceAndDice", "stripes", "squarified", "strip"]
		     * @type {String}
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.layoutAlgorithm
		     */

		    /**
		     * Can set the layoutStartingDirection option on a specific level.
		     *
		     * @validvalue ["vertical", "horizontal"]
		     * @type {String}
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.layoutStartingDirection
		     */

		    /**
		     * Decides which level takes effect from the options set in the levels
		     * object.
		     *
		     * @type {Number}
		     * @sample {highcharts} highcharts/plotoptions/treemap-levels/
		     *         Styling of both levels
		     * @since 4.1.0
		     * @product highcharts
		     * @apioption plotOptions.treemap.levels.level
		     */


    
		    // Presentational options

		    /**
		     * The color of the border surrounding each tree map item.
		     *
		     * @type {Color}
		     * @default #e6e6e6
		     * @product highcharts
		     */
		    borderColor: '#e6e6e6',

		    /**
		     * The width of the border surrounding each tree map item.
		     */
		    borderWidth: 1,

		    /**
		     * The opacity of a point in treemap. When a point has children, the
		     * visibility of the children is determined by the opacity.
		     *
		     * @type {Number}
		     * @default 0.15
		     * @since 4.2.4
		     * @product highcharts
		     */
		    opacity: 0.15,

		    /**
		     * A wrapper object for all the series options in specific states.
		     *
		     * @extends plotOptions.heatmap.states
		     * @product highcharts
		     */
		    states: {

		        /**
		         * Options for the hovered series
		         *
		         * @extends plotOptions.heatmap.states.hover
		         * @excluding halo
		         * @product highcharts
		         */
		        hover: {

		            /**
		             * The border color for the hovered state.
		             */
		            borderColor: '#999999',

		            /**
		             * Brightness for the hovered point. Defaults to 0 if the heatmap
		             * series is loaded, otherwise 0.1.
		             *
		             * @default null
		             * @type {Number}
		             */
		            brightness: seriesTypes.heatmap ? 0 : 0.1,
		            /**
		            * @extends plotOptions.heatmap.states.hover.halo
		            */
		            halo: false,
		            /**
		             * The opacity of a point in treemap. When a point has children,
		             * the visibility of the children is determined by the opacity.
		             *
		             * @type {Number}
		             * @default 0.75
		             * @since 4.2.4
		             * @product highcharts
		             */
		            opacity: 0.75,

		            /**
		             * The shadow option for hovered state.
		             */
		            shadow: false
		        }
		    }
    



		// Prototype members
		}, {
		    pointArrayMap: ['value'],
		    axisTypes: seriesTypes.heatmap ?
		        ['xAxis', 'yAxis', 'colorAxis'] :
		        ['xAxis', 'yAxis'],
		    directTouch: true,
		    optionalAxis: 'colorAxis',
		    getSymbol: noop,
		    parallelArrays: ['x', 'y', 'value', 'colorValue'],
		    colorKey: 'colorValue', // Point color option key
		    translateColors: (
		        seriesTypes.heatmap &&
		        seriesTypes.heatmap.prototype.translateColors
		    ),
		    colorAttribs: (
		        seriesTypes.heatmap &&
		        seriesTypes.heatmap.prototype.colorAttribs
		    ),
		    trackerGroups: ['group', 'dataLabelsGroup'],
		    /**
		     * Creates an object map from parent id to childrens index.
		     * @param {Array} data List of points set in options.
		     * @param {string} data[].parent Parent id of point.
		     * @param {Array} ids List of all point ids.
		     * @return {Object} Map from parent id to children index in data.
		     */
		    getListOfParents: function (data, ids) {
		        var listOfParents = reduce(data || [], function (prev, curr, i) {
		            var parent = pick(curr.parent, '');
		            if (prev[parent] === undefined) {
		                prev[parent] = [];
		            }
		            prev[parent].push(i);
		            return prev;
		        }, {});

		        // If parent does not exist, hoist parent to root of tree.
		        eachObject(listOfParents, function (children, parent, list) {
		            if ((parent !== '') && (H.inArray(parent, ids) === -1)) {
		                each(children, function (child) {
		                    list[''].push(child);
		                });
		                delete list[parent];
		            }
		        });
		        return listOfParents;
		    },
		    /**
		    * Creates a tree structured object from the series points
		    */
		    getTree: function () {
		        var series = this,
		            allIds = map(this.data, function (d) {
		                return d.id;
		            }),
		            parentList = series.getListOfParents(this.data, allIds);

		        series.nodeMap = [];
		        return series.buildNode('', -1, 0, parentList, null);
		    },
		    init: function (chart, options) {
		        var series = this;
		        Series.prototype.init.call(series, chart, options);
		        if (series.options.allowDrillToNode) {
		            H.addEvent(series, 'click', series.onClickDrillToNode);
		        }
		    },
		    buildNode: function (id, i, level, list, parent) {
		        var series = this,
		            children = [],
		            point = series.points[i],
		            height = 0,
		            node,
		            child;

		        // Actions
		        each((list[id] || []), function (i) {
		            child = series.buildNode(
		                series.points[i].id,
		                i,
		                (level + 1),
		                list,
		                id
		            );
		            height = Math.max(child.height + 1, height);
		            children.push(child);
		        });
		        node = {
		            id: id,
		            i: i,
		            children: children,
		            height: height,
		            level: level,
		            parent: parent,
		            visible: false // @todo move this to better location
		        };
		        series.nodeMap[node.id] = node;
		        if (point) {
		            point.node = node;
		        }
		        return node;
		    },
		    setTreeValues: function (tree) {
		        var series = this,
		            options = series.options,
		            idRoot = series.rootNode,
		            mapIdToNode = series.nodeMap,
		            nodeRoot = mapIdToNode[idRoot],
		            levelIsConstant = (
		                isBoolean(options.levelIsConstant) ?
		                options.levelIsConstant :
		                true
		            ),
		            childrenTotal = 0,
		            children = [],
		            val,
		            point = series.points[tree.i];

		        // First give the children some values
		        each(tree.children, function (child) {
		            child = series.setTreeValues(child);
		            children.push(child);
		            if (!child.ignore) {
		                childrenTotal += child.val;
		            }
		        });
		        // Sort the children
		        stableSort(children, function (a, b) {
		            return a.sortIndex - b.sortIndex;
		        });
		        // Set the values
		        val = pick(point && point.options.value, childrenTotal);
		        if (point) {
		            point.value = val;
		        }
		        extend(tree, {
		            children: children,
		            childrenTotal: childrenTotal,
		            // Ignore this node if point is not visible
		            ignore: !(pick(point && point.visible, true) && (val > 0)),
		            isLeaf: tree.visible && !childrenTotal,
		            levelDynamic: tree.level - (levelIsConstant ? 0 : nodeRoot.level),
		            name: pick(point && point.name, ''),
		            sortIndex: pick(point && point.sortIndex, -val),
		            val: val
		        });
		        return tree;
		    },
		    /**
		     * Recursive function which calculates the area for all children of a node.
		     * @param {Object} node The node which is parent to the children.
		     * @param {Object} area The rectangular area of the parent.
		     */
		    calculateChildrenAreas: function (parent, area) {
		        var series = this,
		            options = series.options,
		            mapOptionsToLevel = series.mapOptionsToLevel,
		            level = mapOptionsToLevel[parent.level + 1],
		            algorithm = pick(
		                (
		                    series[level &&
		                    level.layoutAlgorithm] &&
		                    level.layoutAlgorithm
		                ),
		                options.layoutAlgorithm
		            ),
		            alternate = options.alternateStartingDirection,
		            childrenValues = [],
		            children;

		        // Collect all children which should be included
		        children = grep(parent.children, function (n) {
		            return !n.ignore;
		        });

		        if (level && level.layoutStartingDirection) {
		            area.direction = level.layoutStartingDirection === 'vertical' ?
		                0 :
		                1;
		        }
		        childrenValues = series[algorithm](area, children);
		        each(children, function (child, index) {
		            var values = childrenValues[index];
		            child.values = merge(values, {
		                val: child.childrenTotal,
		                direction: (alternate ? 1 - area.direction : area.direction)
		            });
		            child.pointValues = merge(values, {
		                x: (values.x / series.axisRatio),
		                width: (values.width / series.axisRatio)
		            });
		            // If node has children, then call method recursively
		            if (child.children.length) {
		                series.calculateChildrenAreas(child, child.values);
		            }
		        });
		    },
		    setPointValues: function () {
		        var series = this,
		            xAxis = series.xAxis,
		            yAxis = series.yAxis;
		        each(series.points, function (point) {
		            var node = point.node,
		                values = node.pointValues,
		                x1,
		                x2,
		                y1,
		                y2,
		                crispCorr = 0;

            
		            // Get the crisp correction in classic mode. For this to work in
		            // styled mode, we would need to first add the shape (without x, y,
		            // width and height), then read the rendered stroke width using
		            // point.graphic.strokeWidth(), then modify and apply the shapeArgs.
		            // This applies also to column series, but the downside is
		            // performance and code complexity.
		            crispCorr = (
		                (series.pointAttribs(point)['stroke-width'] || 0) % 2
		            ) / 2;
            

		            // Points which is ignored, have no values.
		            if (values && node.visible) {
		                x1 = Math.round(
		                    xAxis.translate(values.x, 0, 0, 0, 1)
		                ) - crispCorr;
		                x2 = Math.round(
		                    xAxis.translate(values.x + values.width, 0, 0, 0, 1)
		                ) - crispCorr;
		                y1 = Math.round(
		                    yAxis.translate(values.y, 0, 0, 0, 1)
		                ) - crispCorr;
		                y2 = Math.round(
		                    yAxis.translate(values.y + values.height, 0, 0, 0, 1)
		                ) - crispCorr;
		                // Set point values
		                point.shapeType = 'rect';
		                point.shapeArgs = {
		                    x: Math.min(x1, x2),
		                    y: Math.min(y1, y2),
		                    width: Math.abs(x2 - x1),
		                    height: Math.abs(y2 - y1)
		                };
		                point.plotX = point.shapeArgs.x + (point.shapeArgs.width / 2);
		                point.plotY = point.shapeArgs.y + (point.shapeArgs.height / 2);
		            } else {
		                // Reset visibility
		                delete point.plotX;
		                delete point.plotY;
		            }
		        });
		    },

		    /**
		     * Set the node's color recursively, from the parent down.
		     */
		    setColorRecursive: function (
		        node,
		        parentColor,
		        colorIndex,
		        index,
		        siblings
		    ) {
		        var series = this,
		            chart = series && series.chart,
		            colors = chart && chart.options && chart.options.colors,
		            colorInfo,
		            point;

		        if (node) {
		            colorInfo = getColor(node, {
		                colors: colors,
		                index: index,
		                mapOptionsToLevel: series.mapOptionsToLevel,
		                parentColor: parentColor,
		                parentColorIndex: colorIndex,
		                series: series,
		                siblings: siblings
		            });

		            point = series.points[node.i];
		            if (point) {
		                point.color = colorInfo.color;
		                point.colorIndex = colorInfo.colorIndex;
		            }

		            // Do it all again with the children
		            each(node.children || [], function (child, i) {
		                series.setColorRecursive(
		                    child,
		                    colorInfo.color,
		                    colorInfo.colorIndex,
		                    i,
		                    node.children.length
		                );
		            });
		        }
		    },
		    algorithmGroup: function (h, w, d, p) {
		        this.height = h;
		        this.width = w;
		        this.plot = p;
		        this.direction = d;
		        this.startDirection = d;
		        this.total = 0;
		        this.nW = 0;
		        this.lW = 0;
		        this.nH = 0;
		        this.lH = 0;
		        this.elArr = [];
		        this.lP = {
		            total: 0,
		            lH: 0,
		            nH: 0,
		            lW: 0,
		            nW: 0,
		            nR: 0,
		            lR: 0,
		            aspectRatio: function (w, h) {
		                return Math.max((w / h), (h / w));
		            }
		        };
		        this.addElement = function (el) {
		            this.lP.total = this.elArr[this.elArr.length - 1];
		            this.total = this.total + el;
		            if (this.direction === 0) {
		                // Calculate last point old aspect ratio
		                this.lW = this.nW;
		                this.lP.lH = this.lP.total / this.lW;
		                this.lP.lR = this.lP.aspectRatio(this.lW, this.lP.lH);
		                // Calculate last point new aspect ratio
		                this.nW = this.total / this.height;
		                this.lP.nH = this.lP.total / this.nW;
		                this.lP.nR = this.lP.aspectRatio(this.nW, this.lP.nH);
		            } else {
		                // Calculate last point old aspect ratio
		                this.lH = this.nH;
		                this.lP.lW = this.lP.total / this.lH;
		                this.lP.lR = this.lP.aspectRatio(this.lP.lW, this.lH);
		                // Calculate last point new aspect ratio
		                this.nH = this.total / this.width;
		                this.lP.nW = this.lP.total / this.nH;
		                this.lP.nR = this.lP.aspectRatio(this.lP.nW, this.nH);
		            }
		            this.elArr.push(el);
		        };
		        this.reset = function () {
		            this.nW = 0;
		            this.lW = 0;
		            this.elArr = [];
		            this.total = 0;
		        };
		    },
		    algorithmCalcPoints: function (directionChange, last, group, childrenArea) {
		        var pX,
		            pY,
		            pW,
		            pH,
		            gW = group.lW,
		            gH = group.lH,
		            plot = group.plot,
		            keep,
		            i = 0,
		            end = group.elArr.length - 1;
		        if (last) {
		            gW = group.nW;
		            gH = group.nH;
		        } else {
		            keep = group.elArr[group.elArr.length - 1];
		        }
		        each(group.elArr, function (p) {
		            if (last || (i < end)) {
		                if (group.direction === 0) {
		                    pX = plot.x;
		                    pY = plot.y;
		                    pW = gW;
		                    pH = p / pW;
		                } else {
		                    pX = plot.x;
		                    pY = plot.y;
		                    pH = gH;
		                    pW = p / pH;
		                }
		                childrenArea.push({
		                    x: pX,
		                    y: pY,
		                    width: pW,
		                    height: pH
		                });
		                if (group.direction === 0) {
		                    plot.y = plot.y + pH;
		                } else {
		                    plot.x = plot.x + pW;
		                }
		            }
		            i = i + 1;
		        });
		        // Reset variables
		        group.reset();
		        if (group.direction === 0) {
		            group.width = group.width - gW;
		        } else {
		            group.height = group.height - gH;
		        }
		        plot.y = plot.parent.y + (plot.parent.height - group.height);
		        plot.x = plot.parent.x + (plot.parent.width - group.width);
		        if (directionChange) {
		            group.direction = 1 - group.direction;
		        }
		        // If not last, then add uncalculated element
		        if (!last) {
		            group.addElement(keep);
		        }
		    },
		    algorithmLowAspectRatio: function (directionChange, parent, children) {
		        var childrenArea = [],
		            series = this,
		            pTot,
		            plot = {
		                x: parent.x,
		                y: parent.y,
		                parent: parent
		            },
		            direction = parent.direction,
		            i = 0,
		            end = children.length - 1,
		            group = new this.algorithmGroup( // eslint-disable-line new-cap
		                parent.height,
		                parent.width,
		                direction,
		                plot
		            );
		        // Loop through and calculate all areas
		        each(children, function (child) {
		            pTot = (parent.width * parent.height) * (child.val / parent.val);
		            group.addElement(pTot);
		            if (group.lP.nR > group.lP.lR) {
		                series.algorithmCalcPoints(
		                    directionChange,
		                    false,
		                    group,
		                    childrenArea,
		                    plot
		                );
		            }
		            // If last child, then calculate all remaining areas
		            if (i === end) {
		                series.algorithmCalcPoints(
		                    directionChange,
		                    true,
		                    group,
		                    childrenArea,
		                    plot
		                );
		            }
		            i = i + 1;
		        });
		        return childrenArea;
		    },
		    algorithmFill: function (directionChange, parent, children) {
		        var childrenArea = [],
		            pTot,
		            direction = parent.direction,
		            x = parent.x,
		            y = parent.y,
		            width = parent.width,
		            height = parent.height,
		            pX,
		            pY,
		            pW,
		            pH;
		        each(children, function (child) {
		            pTot = (parent.width * parent.height) * (child.val / parent.val);
		            pX = x;
		            pY = y;
		            if (direction === 0) {
		                pH = height;
		                pW = pTot / pH;
		                width = width - pW;
		                x = x + pW;
		            } else {
		                pW = width;
		                pH = pTot / pW;
		                height = height - pH;
		                y = y + pH;
		            }
		            childrenArea.push({
		                x: pX,
		                y: pY,
		                width: pW,
		                height: pH
		            });
		            if (directionChange) {
		                direction = 1 - direction;
		            }
		        });
		        return childrenArea;
		    },
		    strip: function (parent, children) {
		        return this.algorithmLowAspectRatio(false, parent, children);
		    },
		    squarified: function (parent, children) {
		        return this.algorithmLowAspectRatio(true, parent, children);
		    },
		    sliceAndDice: function (parent, children) {
		        return this.algorithmFill(true, parent, children);
		    },
		    stripes: function (parent, children) {
		        return this.algorithmFill(false, parent, children);
		    },
		    translate: function () {
		        var series = this,
		            options = series.options,
		            // NOTE: updateRootId modifies series.
		            rootId = updateRootId(series),
		            rootNode,
		            pointValues,
		            seriesArea,
		            tree,
		            val;

		        // Call prototype function
		        Series.prototype.translate.call(series);

		        // @todo Only if series.isDirtyData is true
		        tree = series.tree = series.getTree();
		        rootNode = series.nodeMap[rootId];
		        series.mapOptionsToLevel = getLevelOptions({
		            from: rootNode.level + 1,
		            levels: options.levels,
		            to: tree.height,
		            defaults: {
		                levelIsConstant: series.options.levelIsConstant,
		                colorByPoint: options.colorByPoint
		            }
		        });
		        if (
		            rootId !== '' &&
		            (!rootNode || !rootNode.children.length)
		        ) {
		            series.drillToNode('', false);
		            rootId = series.rootNode;
		            rootNode = series.nodeMap[rootId];
		        }
		        // Parents of the root node is by default visible
		        recursive(series.nodeMap[series.rootNode], function (node) {
		            var next = false,
		                p = node.parent;
		            node.visible = true;
		            if (p || p === '') {
		                next = series.nodeMap[p];
		            }
		            return next;
		        });
		        // Children of the root node is by default visible
		        recursive(
		            series.nodeMap[series.rootNode].children,
		            function (children) {
		                var next = false;
		                each(children, function (child) {
		                    child.visible = true;
		                    if (child.children.length) {
		                        next = (next || []).concat(child.children);
		                    }
		                });
		                return next;
		            }
		        );
		        series.setTreeValues(tree);

		        // Calculate plotting values.
		        series.axisRatio = (series.xAxis.len / series.yAxis.len);
		        series.nodeMap[''].pointValues = pointValues =
		            { x: 0, y: 0, width: 100, height: 100 };
		        series.nodeMap[''].values = seriesArea = merge(pointValues, {
		            width: (pointValues.width * series.axisRatio),
		            direction: (options.layoutStartingDirection === 'vertical' ? 0 : 1),
		            val: tree.val
		        });
		        series.calculateChildrenAreas(tree, seriesArea);

		        // Logic for point colors
		        if (series.colorAxis) {
		            series.translateColors();
		        } else if (!options.colorByPoint) {
		            series.setColorRecursive(series.tree);
		        }

		        // Update axis extremes according to the root node.
		        if (options.allowDrillToNode) {
		            val = rootNode.pointValues;
		            series.xAxis.setExtremes(val.x, val.x + val.width, false);
		            series.yAxis.setExtremes(val.y, val.y + val.height, false);
		            series.xAxis.setScale();
		            series.yAxis.setScale();
		        }

		        // Assign values to points.
		        series.setPointValues();
		    },
		    /**
		     * Extend drawDataLabels with logic to handle custom options related to the
		     * treemap series:
		     * - Points which is not a leaf node, has dataLabels disabled by default.
		     * - Options set on series.levels is merged in.
		     * - Width of the dataLabel is set to match the width of the point shape.
		     */
		    drawDataLabels: function () {
		        var series = this,
		            mapOptionsToLevel = series.mapOptionsToLevel,
		            points = grep(series.points, function (n) {
		                return n.node.visible;
		            }),
		            options,
		            level;
		        each(points, function (point) {
		            level = mapOptionsToLevel[point.node.level];
		            // Set options to new object to avoid problems with scope
		            options = { style: {} };

		            // If not a leaf, then label should be disabled as default
		            if (!point.node.isLeaf) {
		                options.enabled = false;
		            }

		            // If options for level exists, include them as well
		            if (level && level.dataLabels) {
		                options = merge(options, level.dataLabels);
		                series._hasPointLabels = true;
		            }

		            // Set dataLabel width to the width of the point shape.
		            if (point.shapeArgs) {
		                options.style.width = point.shapeArgs.width;
		                if (point.dataLabel) {
		                    point.dataLabel.css({
		                        width: point.shapeArgs.width + 'px'
		                    });
		                }
		            }

		            // Merge custom options with point options
		            point.dlOptions = merge(options, point.options.dataLabels);
		        });
		        Series.prototype.drawDataLabels.call(this);
		    },

		    /**
		     * Over the alignment method by setting z index
		     */
		    alignDataLabel: function (point) {
		        seriesTypes.column.prototype.alignDataLabel.apply(this, arguments);
		        if (point.dataLabel) {
		            // point.node.zIndex could be undefined (#6956)
		            point.dataLabel.attr({ zIndex: (point.node.zIndex || 0) + 1 });
		        }
		    },

    
		    /**
		     * Get presentational attributes
		     */
		    pointAttribs: function (point, state) {
		        var series = this,
		            mapOptionsToLevel = (
		                isObject(series.mapOptionsToLevel) ?
		                series.mapOptionsToLevel :
		                {}
		            ),
		            level = point && mapOptionsToLevel[point.node.level] || {},
		            options = this.options,
		            attr,
		            stateOptions = (state && options.states[state]) || {},
		            className = (point && point.getClassName()) || '',
		            opacity;

		        // Set attributes by precedence. Point trumps level trumps series.
		        // Stroke width uses pick because it can be 0.
		        attr = {
		            'stroke':
		                (point && point.borderColor) ||
		                level.borderColor ||
		                stateOptions.borderColor ||
		                options.borderColor,
		            'stroke-width': pick(
		                point && point.borderWidth,
		                level.borderWidth,
		                stateOptions.borderWidth,
		                options.borderWidth
		            ),
		            'dashstyle':
		                (point && point.borderDashStyle) ||
		                level.borderDashStyle ||
		                stateOptions.borderDashStyle ||
		                options.borderDashStyle,
		            'fill': (point && point.color) || this.color
		        };

		        // Hide levels above the current view
		        if (className.indexOf('highcharts-above-level') !== -1) {
		            attr.fill = 'none';
		            attr['stroke-width'] = 0;

		        // Nodes with children that accept interaction
		        } else if (
		            className.indexOf('highcharts-internal-node-interactive') !== -1
		        ) {
		            opacity = pick(stateOptions.opacity, options.opacity);
		            attr.fill = color(attr.fill).setOpacity(opacity).get();
		            attr.cursor = 'pointer';
		        // Hide nodes that have children
		        } else if (className.indexOf('highcharts-internal-node') !== -1) {
		            attr.fill = 'none';

		        } else if (state) {
		            // Brighten and hoist the hover nodes
		            attr.fill = color(attr.fill)
		                .brighten(stateOptions.brightness)
		                .get();
		        }
		        return attr;
		    },
    

		    /**
		    * Extending ColumnSeries drawPoints
		    */
		    drawPoints: function () {
		        var series = this,
		            points = grep(series.points, function (n) {
		                return n.node.visible;
		            });

		        each(points, function (point) {
		            var groupKey = 'level-group-' + point.node.levelDynamic;
		            if (!series[groupKey]) {
		                series[groupKey] = series.chart.renderer.g(groupKey)
		                    .attr({
		                        // @todo Set the zIndex based upon the number of levels,
		                        // instead of using 1000
		                        zIndex: 1000 - point.node.levelDynamic
		                    })
		                    .add(series.group);
		            }
		            point.group = series[groupKey];

		        });
		        // Call standard drawPoints
		        seriesTypes.column.prototype.drawPoints.call(this);

        

		        // If drillToNode is allowed, set a point cursor on clickables & add
		        // drillId to point
		        if (series.options.allowDrillToNode) {
		            each(points, function (point) {
		                if (point.graphic) {
		                    point.drillId = series.options.interactByLeaf ?
		                        series.drillToByLeaf(point) :
		                        series.drillToByGroup(point);
		                }
		            });
		        }
		    },
		    /**
		    * Add drilling on the suitable points
		    */
		    onClickDrillToNode: function (event) {
		        var series = this,
		            point = event.point,
		            drillId = point && point.drillId;
		        // If a drill id is returned, add click event and cursor.
		        if (isString(drillId)) {
		            point.setState(''); // Remove hover
		            series.drillToNode(drillId);
		        }
		    },
		    /**
		    * Finds the drill id for a parent node.
		    * Returns false if point should not have a click event
		    * @param {Object} point
		    * @return {String|Boolean} Drill to id or false when point should not have a
		    *         click event
		    */
		    drillToByGroup: function (point) {
		        var series = this,
		            drillId = false;
		        if (
		            (point.node.level - series.nodeMap[series.rootNode].level) === 1 &&
		            !point.node.isLeaf
		        ) {
		            drillId = point.id;
		        }
		        return drillId;
		    },
		    /**
		    * Finds the drill id for a leaf node.
		    * Returns false if point should not have a click event
		    * @param {Object} point
		    * @return {String|Boolean} Drill to id or false when point should not have a
		    *         click event
		    */
		    drillToByLeaf: function (point) {
		        var series = this,
		            drillId = false,
		            nodeParent;
		        if ((point.node.parent !== series.rootNode) && (point.node.isLeaf)) {
		            nodeParent = point.node;
		            while (!drillId) {
		                nodeParent = series.nodeMap[nodeParent.parent];
		                if (nodeParent.parent === series.rootNode) {
		                    drillId = nodeParent.id;
		                }
		            }
		        }
		        return drillId;
		    },
		    drillUp: function () {
		        var series = this,
		            node = series.nodeMap[series.rootNode];
		        if (node && isString(node.parent)) {
		            series.drillToNode(node.parent);
		        }
		    },
		    drillToNode: function (id, redraw) {
		        var series = this,
		            nodeMap = series.nodeMap,
		            node = nodeMap[id];
		        series.idPreviousRoot = series.rootNode;
		        series.rootNode = id;
		        if (id === '') {
		            series.drillUpButton = series.drillUpButton.destroy();
		        } else {
		            series.showDrillUpButton((node && node.name || id));
		        }
		        this.isDirty = true; // Force redraw
		        if (pick(redraw, true)) {
		            this.chart.redraw();
		        }
		    },
		    showDrillUpButton: function (name) {
		        var series = this,
		            backText = (name || '< Back'),
		            buttonOptions = series.options.drillUpButton,
		            attr,
		            states;

		        if (buttonOptions.text) {
		            backText = buttonOptions.text;
		        }
		        if (!this.drillUpButton) {
		            attr = buttonOptions.theme;
		            states = attr && attr.states;

		            this.drillUpButton = this.chart.renderer.button(
		                backText,
		                null,
		                null,
		                function () {
		                    series.drillUp();
		                },
		                attr,
		                states && states.hover,
		                states && states.select
		            )
		            .addClass('highcharts-drillup-button')
		            .attr({
		                align: buttonOptions.position.align,
		                zIndex: 7
		            })
		            .add()
		            .align(
		                buttonOptions.position,
		                false,
		                buttonOptions.relativeTo || 'plotBox'
		            );
		        } else {
		            this.drillUpButton.placed = false;
		            this.drillUpButton.attr({
		                text: backText
		            })
		            .align();
		        }
		    },
		    buildKDTree: noop,
		    drawLegendSymbol: H.LegendSymbolMixin.drawRectangle,
		    getExtremes: function () {
		        // Get the extremes from the value data
		        Series.prototype.getExtremes.call(this, this.colorValueData);
		        this.valueMin = this.dataMin;
		        this.valueMax = this.dataMax;

		        // Get the extremes from the y data
		        Series.prototype.getExtremes.call(this);
		    },
		    getExtremesFromAll: true,
		    bindAxes: function () {
		        var treeAxis = {
		            endOnTick: false,
		            gridLineWidth: 0,
		            lineWidth: 0,
		            min: 0,
		            dataMin: 0,
		            minPadding: 0,
		            max: 100,
		            dataMax: 100,
		            maxPadding: 0,
		            startOnTick: false,
		            title: null,
		            tickPositions: []
		        };
		        Series.prototype.bindAxes.call(this);
		        H.extend(this.yAxis.options, treeAxis);
		        H.extend(this.xAxis.options, treeAxis);
		    },
		    utils: {
		        recursive: recursive,
		        reduce: reduce
		    }

		// Point class
		}, {
		    getClassName: function () {
		        var className = H.Point.prototype.getClassName.call(this),
		            series = this.series,
		            options = series.options;

		        // Above the current level
		        if (this.node.level <= series.nodeMap[series.rootNode].level) {
		            className += ' highcharts-above-level';

		        } else if (
		            !this.node.isLeaf &&
		            !pick(options.interactByLeaf, !options.allowDrillToNode)
		        ) {
		            className += ' highcharts-internal-node-interactive';

		        } else if (!this.node.isLeaf) {
		            className += ' highcharts-internal-node';
		        }
		        return className;
		    },

		    /**
		     * A tree point is valid if it has han id too, assume it may be a parent
		     * item.
		     */
		    isValid: function () {
		        return this.id || isNumber(this.value);
		    },
		    setState: function (state) {
		        H.Point.prototype.setState.call(this, state);

		        // Graphic does not exist when point is not visible.
		        if (this.graphic) {
		            this.graphic.attr({
		                zIndex: state === 'hover' ? 1 : 0
		            });
		        }
		    },
		    setVisible: seriesTypes.pie.prototype.pointClass.prototype.setVisible
		});


		/**
		 * A `treemap` series. If the [type](#series.treemap.type) option is
		 * not specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @type {Object}
		 * @extends series,plotOptions.treemap
		 * @excluding dataParser,dataURL,stack
		 * @product highcharts
		 * @apioption series.treemap
		 */

		/**
		 * An array of data points for the series. For the `treemap` series
		 * type, points can be given in the following ways:
		 *
		 * 1.  An array of numerical values. In this case, the numerical values
		 * will be interpreted as `value` options. Example:
		 *
		 *  ```js
		 *  data: [0, 5, 3, 5]
		 *  ```
		 *
		 * 2.  An array of objects with named values. The objects are point
		 * configuration objects as seen below. If the total number of data
		 * points exceeds the series' [turboThreshold](#series.treemap.turboThreshold),
		 * this option is not available.
		 *
		 *  ```js
		 *     data: [{
		 *         value: 9,
		 *         name: "Point2",
		 *         color: "#00FF00"
		 *     }, {
		 *         value: 6,
		 *         name: "Point1",
		 *         color: "#FF00FF"
		 *     }]
		 *  ```
		 *
		 * @type {Array<Object|Number>}
		 * @extends series.heatmap.data
		 * @excluding x,y
		 * @sample {highcharts} highcharts/chart/reflow-true/
		 *         Numerical values
		 * @sample {highcharts} highcharts/series/data-array-of-arrays/
		 *         Arrays of numeric x and y
		 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
		 *         Arrays of datetime x and y
		 * @sample {highcharts} highcharts/series/data-array-of-name-value/
		 *         Arrays of point.name and y
		 * @sample {highcharts} highcharts/series/data-array-of-objects/
		 *         Config objects
		 * @product highcharts
		 * @apioption series.treemap.data
		 */

		/**
		 * The value of the point, resulting in a relative area of the point
		 * in the treemap.
		 *
		 * @type {Number}
		 * @product highcharts
		 * @apioption series.treemap.data.value
		 */

		/**
		 * Serves a purpose only if a `colorAxis` object is defined in the chart
		 * options. This value will decide which color the point gets from the
		 * scale of the colorAxis.
		 *
		 * @type {Number}
		 * @default undefined
		 * @since 4.1.0
		 * @product highcharts
		 * @apioption series.treemap.data.colorValue
		 */

		/**
		 * Only for treemap. Use this option to build a tree structure. The
		 * value should be the id of the point which is the parent. If no points
		 * has a matching id, or this option is undefined, then the parent will
		 * be set to the root.
		 *
		 * @type {String}
		 * @sample {highcharts} highcharts/point/parent/ Point parent
		 * @sample {highcharts} highcharts/demo/treemap-with-levels/ Example where parent id is not matching
		 * @default undefined
		 * @since 4.1.0
		 * @product highcharts
		 * @apioption series.treemap.data.parent
		 */

	}(Highcharts, result));
	(function (H, drawPoint, mixinTreeSeries) {
		/**
		 * (c) 2016 Highsoft AS
		 * Authors: Jon Arild Nygard
		 *
		 * License: www.highcharts.com/license
		 *
		 * This module implements sunburst charts in Highcharts.
		 */
		var CenteredSeriesMixin = H.CenteredSeriesMixin,
		    Series = H.Series,
		    each = H.each,
		    extend = H.extend,
		    getCenter = CenteredSeriesMixin.getCenter,
		    getColor = mixinTreeSeries.getColor,
		    getLevelOptions = mixinTreeSeries.getLevelOptions,
		    getStartAndEndRadians = CenteredSeriesMixin.getStartAndEndRadians,
		    grep = H.grep,
		    inArray = H.inArray,
		    isBoolean = function (x) {
		        return typeof x === 'boolean';
		    },
		    isNumber = H.isNumber,
		    isObject = H.isObject,
		    isString = H.isString,
		    keys = H.keys,
		    merge = H.merge,
		    noop = H.noop,
		    rad2deg = 180 / Math.PI,
		    seriesType = H.seriesType,
		    seriesTypes = H.seriesTypes,
		    setTreeValues = mixinTreeSeries.setTreeValues,
		    reduce = H.reduce,
		    updateRootId = mixinTreeSeries.updateRootId;

		// TODO introduce step, which should default to 1.
		var range = function range(from, to) {
		    var result = [],
		        i;
		    if (isNumber(from) && isNumber(to) && from <= to) {
		        for (i = from; i <= to; i++) {
		            result.push(i);
		        }
		    }
		    return result;
		};

		/**
		 * @param {Object} levelOptions Map of level to its options.
		 * @param {Object} params Object containing parameters.
		 * @param {Number} params.innerRadius
		 * @param {Number} params.outerRadius
		 * @
		 */
		var calculateLevelSizes = function calculateLevelSizes(levelOptions, params) {
		    var result,
		        p = isObject(params) ? params : {},
		        totalWeight = 0,
		        diffRadius,
		        levels,
		        levelsNotIncluded,
		        remainingSize,
		        from,
		        to;

		    if (isObject(levelOptions)) {
		        result = merge({}, levelOptions); // Copy levelOptions
		        from = isNumber(p.from) ? p.from : 0;
		        to = isNumber(p.to) ? p.to : 0;
		        levels = range(from, to);
		        levelsNotIncluded = grep(keys(result), function (k) {
		            return inArray(+k, levels) === -1;
		        });
		        diffRadius = remainingSize = isNumber(p.diffRadius) ? p.diffRadius : 0;
		        /**
		         * Convert percentage to pixels.
		         * Calculate the remaining size to divide between "weight" levels.
		         * Calculate total weight to use in convertion from weight to pixels.
		         */
		        each(levels, function (level) {
		            var options = result[level],
		                unit = options.levelSize.unit,
		                value = options.levelSize.value;
		            if (unit === 'weight') {
		                totalWeight += value;
		            } else if (unit === 'percentage') {
		                options.levelSize = {
		                    unit: 'pixels',
		                    value: (value / 100) * diffRadius
		                };
		                remainingSize -= options.levelSize.value;
		            } else if (unit === 'pixels') {
		                remainingSize -= value;
		            }
		        });

		        // Convert weight to pixels.
		        each(levels, function (level) {
		            var options = result[level],
		                weight;
		            if (options.levelSize.unit === 'weight') {
		                weight = options.levelSize.value;
		                result[level].levelSize = {
		                    unit: 'pixels',
		                    value: (weight / totalWeight) * remainingSize
		                };
		            }
		        });
		        // Set all levels not included in interval [from,to] to have 0 pixels.
		        each(levelsNotIncluded, function (level) {
		            result[level].levelSize = {
		                value: 0,
		                unit: 'pixels'
		            };
		        });
		    }
		    return result;
		};

		/**
		 * getEndPoint - Find a set of coordinates given a start coordinates, an angle,
		 *     and a distance.
		 *
		 * @param  {number} x Start coordinate x
		 * @param  {number} y Start coordinate y
		 * @param  {number} angle Angle in radians
		 * @param  {number} distance Distance from start to end coordinates
		 * @return {object} Returns the end coordinates, x and y.
		 */
		var getEndPoint = function getEndPoint(x, y, angle, distance) {
		    return {
		        x: x + (Math.cos(angle) * distance),
		        y: y + (Math.sin(angle) * distance)
		    };
		};

		var layoutAlgorithm = function layoutAlgorithm(parent, children, options) {
		    var startAngle = parent.start,
		        range = parent.end - startAngle,
		        total = parent.val,
		        x = parent.x,
		        y = parent.y,
		        radius = (
		            isObject(options.levelSize) && isNumber(options.levelSize.value) ?
		            options.levelSize.value :
		            0
		        ),
		        innerRadius = parent.r,
		        outerRadius = innerRadius + radius,
		        slicedOffset = isNumber(options.slicedOffset) ?
		            options.slicedOffset :
		            0;

		    return reduce(children || [], function (arr, child) {
		        var percentage = (1 / total) * child.val,
		            radians = percentage * range,
		            radiansCenter = startAngle + (radians / 2),
		            offsetPosition = getEndPoint(x, y, radiansCenter, slicedOffset),
		            values = {
		                x: child.sliced ? offsetPosition.x : x,
		                y: child.sliced ? offsetPosition.y : y,
		                innerR: innerRadius,
		                r: outerRadius,
		                radius: radius,
		                start: startAngle,
		                end: startAngle + radians
		            };
		        arr.push(values);
		        startAngle = values.end;
		        return arr;
		    }, []);
		};

		var getDlOptions = function getDlOptions(params) {
		    // Set options to new object to avoid problems with scope
		    var shape = isObject(params.shapeArgs) ? params.shapeArgs : {},
		        optionsPoint = (
		            isObject(params.optionsPoint) ?
		            params.optionsPoint.dataLabels :
		            {}
		        ),
		        optionsLevel = (
		            isObject(params.level) ?
		            params.level.dataLabels :
		            {}
		        ),
		        options = merge({
		            rotationMode: 'perpendicular',
		            style: {
		                width: shape.radius
		            }
		        }, optionsLevel, optionsPoint),
		        rotationRad,
		        rotation;
		    if (!isNumber(options.rotation)) {
		        rotationRad = (shape.end - (shape.end - shape.start) / 2);
		        rotation = (rotationRad * rad2deg) % 180;
		        if (options.rotationMode === 'parallel') {
		            rotation -= 90;
		        }
		        // Data labels should not rotate beyond 90 degrees, for readability.
		        if (rotation > 90) {
		            rotation -= 180;
		        }
		        options.rotation = rotation;
		    }
		    // NOTE: alignDataLabel positions the data label differntly when rotation is
		    // 0. Avoiding this by setting rotation to a small number.
		    if (options.rotation === 0) {
		        options.rotation =  0.001;
		    }
		    return options;
		};

		var getAnimation = function getAnimation(shape, params) {
		    var point = params.point,
		        radians = params.radians,
		        innerR = params.innerR,
		        idRoot = params.idRoot,
		        idPreviousRoot = params.idPreviousRoot,
		        shapeExisting = params.shapeExisting,
		        shapeRoot = params.shapeRoot,
		        shapePreviousRoot = params.shapePreviousRoot,
		        visible = params.visible,
		        from = {},
		        to = {
		            end: shape.end,
		            start: shape.start,
		            innerR: shape.innerR,
		            r: shape.r,
		            x: shape.x,
		            y: shape.y
		        };
		    if (visible) {
		        // Animate points in
		        if (!point.graphic && shapePreviousRoot) {
		            if (idRoot === point.id) {
		                from = {
		                    start: radians.start,
		                    end: radians.end
		                };
		            } else {
		                from = (shapePreviousRoot.end <= shape.start) ? {
		                    start: radians.end,
		                    end: radians.end
		                } : {
		                    start: radians.start,
		                    end: radians.start
		                };
		            }
		            // Animate from center and outwards.
		            from.innerR = from.r = innerR;
		        }
		    } else {
		        // Animate points out
		        if (point.graphic) {
		            if (idPreviousRoot === point.id) {
		                to = {
		                    innerR: innerR,
		                    r: innerR
		                };
		            } else if (shapeRoot) {
		                to = (shapeRoot.end <= shapeExisting.start) ?
		                {
		                    innerR: innerR,
		                    r: innerR,
		                    start: radians.end,
		                    end: radians.end
		                } : {
		                    innerR: innerR,
		                    r: innerR,
		                    start: radians.start,
		                    end: radians.start
		                };
		            }
		        }
		    }
		    return {
		        from: from,
		        to: to
		    };
		};

		var getDrillId = function getDrillId(point, idRoot, mapIdToNode) {
		    var drillId,
		        node = point.node,
		        nodeRoot;
		    if (!node.isLeaf) {
		        // When it is the root node, the drillId should be set to parent.
		        if (idRoot === point.id) {
		            nodeRoot = mapIdToNode[idRoot];
		            drillId = nodeRoot.parent;
		        } else {
		            drillId = point.id;
		        }
		    }
		    return drillId;
		};

		var cbSetTreeValuesBefore = function before(node, options) {
		    var mapIdToNode = options.mapIdToNode,
		        nodeParent = mapIdToNode[node.parent],
		        series = options.series,
		        chart = series.chart,
		        points = series.points,
		        point = points[node.i],
		        colorInfo = getColor(node, {
		            colors: chart && chart.options && chart.options.colors,
		            colorIndex: series.colorIndex,
		            index: options.index,
		            mapOptionsToLevel: options.mapOptionsToLevel,
		            parentColor: nodeParent && nodeParent.color,
		            parentColorIndex: nodeParent && nodeParent.colorIndex,
		            series: options.series,
		            siblings: options.siblings
		        });
		    node.color = colorInfo.color;
		    node.colorIndex = colorInfo.colorIndex;
		    if (point) {
		        point.color = node.color;
		        point.colorIndex = node.colorIndex;
		        // Set slicing on node, but avoid slicing the top node.
		        node.sliced = (node.id !== options.idRoot) ? point.sliced : false;
		    }
		    return node;
		};

		/**
		 * A Sunburst displays hierarchical data, where a level in the hierarchy is
		 * represented by a circle. The center represents the root node of the tree.
		 * The visualization bears a resemblance to both treemap and pie charts.
		 *
		 * @extends {plotOptions.pie}
		 * @sample highcharts/demo/sunburst Sunburst chart
		 * @excluding allAreas, clip, colorAxis, compare, compareBase,
		 *            dataGrouping, depth, endAngle, gapSize, gapUnit,
		 *            ignoreHiddenPoint, innerSize, joinBy, legendType, linecap,
		 *            minSize, navigatorOptions, pointRange
		 * @product highcharts
		 * @optionparent plotOptions.sunburst
		 */
		var sunburstOptions = {

		    /**
		     * Set options on specific levels. Takes precedence over series options,
		     * but not point options.
		     *
		     * @type {Array<Object>}
		     * @sample highcharts/demo/sunburst Sunburst chart
		     * @apioption plotOptions.sunburst.levels
		     */

		    /**
		     * Can set a `borderColor` on all points which lies on the same level.
		     *
		     * @type {Color}
		     * @apioption plotOptions.sunburst.levels.borderColor
		     */

		    /**
		     * Can set a `borderWidth` on all points which lies on the same level.
		     *
		     * @type {Number}
		     * @apioption plotOptions.sunburst.levels.borderWidth
		     */

		    /**
		     * Can set a `borderDashStyle` on all points which lies on the same level.
		     *
		     * @type {String}
		     * @apioption plotOptions.sunburst.levels.borderDashStyle
		     */

		    /**
		     * Can set a `color` on all points which lies on the same level.
		     *
		     * @type {Color}
		     * @apioption plotOptions.sunburst.levels.color
		     */

		    /**
		     * Can set a `colorVariation` on all points which lies on the same level.
		     *
		     * @type {Object}
		     * @apioption plotOptions.sunburst.levels.colorVariation
		     */

		    /**
		     * The key of a color variation. Currently supports `brightness` only.
		     *
		     * @type {String}
		     * @apioption plotOptions.sunburst.levels.colorVariation.key
		     */

		    /**
		     * The ending value of a color variation. The last sibling will receive this
		     * value.
		     *
		     * @type {Number}
		     * @apioption plotOptions.sunburst.levels.colorVariation.to
		     */

		    /**
		     * Can set a `dataLabels` on all points which lies on the same level.
		     *
		     * @type {Object}
		     * @apioption plotOptions.sunburst.levels.dataLabels
		     */

		    /**
		     * Can set a `levelSize` on all points which lies on the same level.
		     *
		     * @type {Object}
		     * @apioption plotOptions.sunburst.levels.levelSize
		     */

		    /**
		     * Can set a `rotation` on all points which lies on the same level.
		     *
		     * @type {Number}
		     * @apioption plotOptions.sunburst.levels.rotation
		     */

		    /**
		     * Can set a `rotationMode` on all points which lies on the same level.
		     *
		     * @type {String}
		     * @apioption plotOptions.sunburst.levels.rotationMode
		     */

		    /**
		     * When enabled the user can click on a point which is a parent and
		     * zoom in on its children.
		     *
		     * @sample highcharts/demo/sunburst
		     *         Allow drill to node
		     * @type {Boolean}
		     * @default false
		     * @apioption plotOptions.sunburst.allowDrillToNode
		     */

		    /**
		     * The center of the sunburst chart relative to the plot area. Can be
		     * percentages or pixel values.
		     *
		     * @type    {Array<String|Number>}
		     * @sample  {highcharts} highcharts/plotoptions/pie-center/
		     *          Centered at 100, 100
		     * @product highcharts
		     */
		    center: ['50%', '50%'],
		    colorByPoint: false,
		    /**
		     * @extends plotOptions.series.dataLabels
		     * @excluding align,allowOverlap,staggerLines,step
		     */
		    dataLabels: {
		        defer: true,
		        style: {
		            textOverflow: 'ellipsis'
		        },
		        /**
		         * Decides how the data label will be rotated according to the perimeter
		         * of the sunburst. It can either be parallel or perpendicular to the
		         * perimeter.
		         * `series.rotation` takes precedence over `rotationMode`.
		         * @since 6.0.0
		         * @validvalue ["perpendicular", "parallel"]
		         */
		        rotationMode: 'perpendicular'
		    },
		    /**
		     * Which point to use as a root in the visualization.
		     *
		     * @type {String|undefined}
		     * @default undefined
		     */
		    rootId: undefined,

		    /**
		     * Used together with the levels and `allowDrillToNode` options. When
		     * set to false the first level visible when drilling is considered
		     * to be level one. Otherwise the level will be the same as the tree
		     * structure.
		     */
		    levelIsConstant: true,
		    /**
		     * Determines the width of the ring per level.
		     * @since 6.0.5
		     * @sample {highcharts} highcharts/plotoptions/sunburst-levelsize/
		     *         Sunburst with various sizes per level
		     */
		    levelSize: {
		        /**
		         * The value used for calculating the width of the ring. Its' affect is
		         * determined by `levelSize.unit`.
		         * @sample {highcharts} highcharts/plotoptions/sunburst-levelsize/
		         *         Sunburst with various sizes per level
		         */
		        value: 1,
		        /**
		         * How to interpret `levelSize.value`.
		         * `percentage` gives a width relative to result of outer radius minus
		         * inner radius.
		         * `pixels` gives the ring a fixed width in pixels.
		         * `weight` takes the remaining width after percentage and pixels, and
		         * distributes it accross all "weighted" levels. The value relative to
		         * the sum of all weights determines the width.
		         * @validvalue ["percentage", "pixels", "weight"]
		         * @sample {highcharts} highcharts/plotoptions/sunburst-levelsize/
		         *         Sunburst with various sizes per level
		         */
		        unit: 'weight'
		    },
		    /**
		     * If a point is sliced, moved out from the center, how many pixels
		     * should it be moved?.
		     *
		     * @since 6.0.4
		     * @sample highcharts/plotoptions/sunburst-sliced Sliced sunburst
		     */
		    slicedOffset: 10
		};

		/**
		 * Properties of the Sunburst series.
		 */
		var sunburstSeries = {
		    drawDataLabels: noop, // drawDataLabels is called in drawPoints
		    drawPoints: function drawPoints() {
		        var series = this,
		            mapOptionsToLevel = series.mapOptionsToLevel,
		            shapeRoot = series.shapeRoot,
		            group = series.group,
		            hasRendered = series.hasRendered,
		            idRoot = series.rootId,
		            idPreviousRoot = series.idPreviousRoot,
		            nodeMap = series.nodeMap,
		            nodePreviousRoot = nodeMap[idPreviousRoot],
		            shapePreviousRoot = nodePreviousRoot && nodePreviousRoot.shapeArgs,
		            points = series.points,
		            radians = series.startAndEndRadians,
		            chart = series.chart,
		            optionsChart = chart && chart.options && chart.options.chart || {},
		            animation = (
		                isBoolean(optionsChart.animation) ?
		                optionsChart.animation :
		                true
		            ),
		            positions = series.center,
		            center = {
		                x: positions[0],
		                y: positions[1]
		            },
		            innerR = positions[3] / 2,
		            renderer = series.chart.renderer,
		            animateLabels,
		            animateLabelsCalled = false,
		            addedHack = false,
		            hackDataLabelAnimation = !!(
		                animation &&
		                hasRendered &&
		                idRoot !== idPreviousRoot &&
		                series.dataLabelsGroup
		            );

		        if (hackDataLabelAnimation) {
		            series.dataLabelsGroup.attr({ opacity: 0 });
		            animateLabels = function () {
		                var s = series;
		                animateLabelsCalled = true;
		                if (s.dataLabelsGroup) {
		                    s.dataLabelsGroup.animate({
		                        opacity: 1,
		                        visibility: 'visible'
		                    });
		                }
		            };
		        }
		        each(points, function (point) {
		            var node = point.node,
		                level = mapOptionsToLevel[node.level],
		                shapeExisting = point.shapeExisting || {},
		                shape = node.shapeArgs || {},
		                animationInfo,
		                onComplete,
		                visible = !!(node.visible && node.shapeArgs);
		            if (hasRendered && animation) {
		                animationInfo = getAnimation(shape, {
		                    center: center,
		                    point: point,
		                    radians: radians,
		                    innerR: innerR,
		                    idRoot: idRoot,
		                    idPreviousRoot: idPreviousRoot,
		                    shapeExisting: shapeExisting,
		                    shapeRoot: shapeRoot,
		                    shapePreviousRoot: shapePreviousRoot,
		                    visible: visible
		                });
		            } else {
		                // When animation is disabled, attr is called from animation.
		                animationInfo = {
		                    to: shape,
		                    from: {}
		                };
		            }
		            extend(point, {
		                shapeExisting: shape, // Store for use in animation
		                tooltipPos: [shape.plotX, shape.plotY],
		                drillId: getDrillId(point, idRoot, nodeMap),
		                name: '' + (point.name || point.id || point.index),
		                plotX: shape.plotX, // used for data label position
		                plotY: shape.plotY, // used for data label position
		                value: node.val,
		                isNull: !visible // used for dataLabels & point.draw
		            });
		            point.dlOptions = getDlOptions({
		                level: level,
		                optionsPoint: point.options,
		                shapeArgs: shape
		            });
		            if (!addedHack && visible) {
		                addedHack = true;
		                onComplete = animateLabels;
		            }
		            point.draw({
		                animate: animationInfo.to,
		                attr: extend(
		                    animationInfo.from,
		                    series.pointAttribs && series.pointAttribs(
		                        point,
		                        point.selected && 'select'
		                    )
		                ),
		                onComplete: onComplete,
		                group: group,
		                renderer: renderer,
		                shapeType: 'arc',
		                shapeArgs: shape
		            });
		        });
		        // Draw data labels after points
		        // TODO draw labels one by one to avoid addtional looping
		        if (hackDataLabelAnimation && addedHack) {
		            series.hasRendered = false;
		            series.options.dataLabels.defer = true;
		            Series.prototype.drawDataLabels.call(series);
		            series.hasRendered = true;
		            // If animateLabels is called before labels were hidden, then call
		            // it again.
		            if (animateLabelsCalled) {
		                animateLabels();
		            }
		        } else {
		            Series.prototype.drawDataLabels.call(series);
		        }
		    },
    
		    pointAttribs: seriesTypes.column.prototype.pointAttribs,
    

		    /*
		     * The layout algorithm for the levels
		     */
		    layoutAlgorithm: layoutAlgorithm,
		    /*
		     * Set the shape arguments on the nodes. Recursive from root down.
		     */
		    setShapeArgs: function (parent, parentValues, mapOptionsToLevel) {
		        var childrenValues = [],
		            level = parent.level + 1,
		            options = mapOptionsToLevel[level],
		            // Collect all children which should be included
		            children = grep(parent.children, function (n) {
		                return n.visible;
		            }),
		            twoPi = 6.28; // Two times Pi.
		        childrenValues = this.layoutAlgorithm(parentValues, children, options);
		        each(children, function (child, index) {
		            var values = childrenValues[index],
		                angle = values.start + ((values.end - values.start) / 2),
		                radius = values.innerR + ((values.r - values.innerR) / 2),
		                radians = (values.end - values.start),
		                isCircle = (values.innerR === 0 && radians > twoPi),
		                center = (
		                    isCircle ?
		                    { x: values.x, y: values.y } :
		                    getEndPoint(values.x, values.y, angle, radius)
		                ),
		                val = (
		                    child.val ?
		                    (
		                        child.childrenTotal > child.val ?
		                        child.childrenTotal :
		                        child.val
		                    ) :
		                    child.childrenTotal
		                );
		            // The inner arc length is a convenience for data label filters.
		            if (this.points[child.i]) {
		                this.points[child.i].innerArcLength = radians * values.innerR;
		                this.points[child.i].outerArcLength = radians * values.r;
		            }

		            child.shapeArgs = merge(values, {
		                plotX: center.x,
		                plotY: center.y
		            });
		            child.values = merge(values, {
		                val: val
		            });
		            // If node has children, then call method recursively
		            if (child.children.length) {
		                this.setShapeArgs(child, child.values, mapOptionsToLevel);
		            }
		        }, this);
		    },


		    translate: function translate() {
		        var series = this,
		            options = series.options,
		            positions = series.center = getCenter.call(series),
		            radians = series.startAndEndRadians = getStartAndEndRadians(
		                options.startAngle,
		                options.endAngle
		            ),
		            innerRadius = positions[3] / 2,
		            outerRadius = positions[2] / 2,
		            diffRadius = outerRadius - innerRadius,
		            // NOTE: updateRootId modifies series.
		            rootId = updateRootId(series),
		            mapIdToNode = series.nodeMap,
		            mapOptionsToLevel,
		            idTop,
		            nodeRoot = mapIdToNode && mapIdToNode[rootId],
		            nodeTop,
		            tree,
		            values;
		        series.shapeRoot = nodeRoot && nodeRoot.shapeArgs;
		        // Call prototype function
		        Series.prototype.translate.call(series);
		        // @todo Only if series.isDirtyData is true
		        tree = series.tree = series.getTree();
		        mapIdToNode = series.nodeMap;
		        nodeRoot = mapIdToNode[rootId];
		        idTop = isString(nodeRoot.parent) ? nodeRoot.parent : '';
		        nodeTop = mapIdToNode[idTop];
		        mapOptionsToLevel = getLevelOptions({
		            from: nodeRoot.level > 0 ? nodeRoot.level : 1,
		            levels: series.options.levels,
		            to: tree.height,
		            defaults: {
		                colorByPoint: options.colorByPoint,
		                dataLabels: options.dataLabels,
		                levelIsConstant: options.levelIsConstant,
		                levelSize: options.levelSize,
		                slicedOffset: options.slicedOffset
		            }
		        });
		        // NOTE consider doing calculateLevelSizes in a callback to
		        // getLevelOptions
		        mapOptionsToLevel = calculateLevelSizes(mapOptionsToLevel, {
		            diffRadius: diffRadius,
		            from: nodeRoot.level > 0 ? nodeRoot.level : 1,
		            to: tree.height
		        });
		        // TODO Try to combine setTreeValues & setColorRecursive to avoid
		        //  unnecessary looping.
		        setTreeValues(tree, {
		            before: cbSetTreeValuesBefore,
		            idRoot: rootId,
		            levelIsConstant: options.levelIsConstant,
		            mapOptionsToLevel: mapOptionsToLevel,
		            mapIdToNode: mapIdToNode,
		            points: series.points,
		            series: series
		        });
		        values = mapIdToNode[''].shapeArgs = {
		            end: radians.end,
		            r: innerRadius,
		            start: radians.start,
		            val: nodeRoot.val,
		            x: positions[0],
		            y: positions[1]
		        };
		        this.setShapeArgs(nodeTop, values, mapOptionsToLevel);
		        // Set mapOptionsToLevel on series for use in drawPoints.
		        series.mapOptionsToLevel = mapOptionsToLevel;
		    },

		    /**
		     * Animate the slices in. Similar to the animation of polar charts.
		     */
		    animate: function (init) {
		        var chart = this.chart,
		            center = [
		                chart.plotWidth / 2,
		                chart.plotHeight / 2
		            ],
		            plotLeft = chart.plotLeft,
		            plotTop = chart.plotTop,
		            attribs,
		            group = this.group;

		        // Initialize the animation
		        if (init) {

		            // Scale down the group and place it in the center
		            attribs = {
		                translateX: center[0] + plotLeft,
		                translateY: center[1] + plotTop,
		                scaleX: 0.001, // #1499
		                scaleY: 0.001,
		                rotation: 10,
		                opacity: 0.01
		            };

		            group.attr(attribs);

		        // Run the animation
		        } else {
		            attribs = {
		                translateX: plotLeft,
		                translateY: plotTop,
		                scaleX: 1,
		                scaleY: 1,
		                rotation: 0,
		                opacity: 1
		            };
		            group.animate(attribs, this.options.animation);

		            // Delete this function to allow it only once
		            this.animate = null;
		        }
		    },
		    utils: {
		        calculateLevelSizes: calculateLevelSizes,
		        range: range
		    }
		};

		/**
		 * Properties of the Sunburst series.
		 */
		var sunburstPoint = {
		    draw: drawPoint,
		    shouldDraw: function shouldDraw() {
		        var point = this;
		        return !point.isNull;
		    }
		};

		/**
		 * A `sunburst` series. If the [type](#series.sunburst.type) option is
		 * not specified, it is inherited from [chart.type](#chart.type).
		 *
		 * @type {Object}
		 * @extends series,plotOptions.sunburst
		 * @excluding dataParser,dataURL,stack
		 * @product highcharts
		 * @apioption series.sunburst
		 */

		/**
		 * @type {Array<Object|Number>}
		 * @extends series.treemap.data
		 * @excluding x,y
		 * @product highcharts
		 * @apioption series.sunburst.data
		 */

		/**
		* The value of the point, resulting in a relative area of the point
		* in the sunburst.
		*
		* @type {Number}
		* @default undefined
		* @since 6.0.0
		* @product highcharts
		* @apioption series.sunburst.data.value
		*/

		/**
		 * Use this option to build a tree structure. The value should be the id of the
		 * point which is the parent. If no points has a matching id, or this option is
		 * undefined, then the parent will be set to the root.
		 *
		 * @type {String|undefined}
		 * @default undefined
		 * @since 6.0.0
		 * @product highcharts
		 * @apioption series.treemap.data.parent
		 */

		 /**
		  * Whether to display a slice offset from the center. When a sunburst point is
		  * sliced, its children are also offset.
		  *
		  * @type {Boolean}
		  * @default false
		  * @since 6.0.4
		  * @sample highcharts/plotoptions/sunburst-sliced Sliced sunburst
		  * @product highcharts
		  * @apioption series.sunburst.data.sliced
		  */
		seriesType(
		    'sunburst',
		    'treemap',
		    sunburstOptions,
		    sunburstSeries,
		    sunburstPoint
		);

	}(Highcharts, draw, result));
}));
