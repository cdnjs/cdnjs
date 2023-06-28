/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
 *
 * (c) 2009-2022
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/flowmap', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Series/FlowMap/FlowMapPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2022 Askel Eirik Johansson, Piotr Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var MapLinePoint = SeriesRegistry.seriesTypes.mapline.prototype.pointClass;
        var pick = U.pick,
            isString = U.isString,
            isNumber = U.isNumber;
        /* *
         *
         *  Class
         *
         * */
        var FlowMapPoint = /** @class */ (function (_super) {
                __extends(FlowMapPoint, _super);
            function FlowMapPoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.options = void 0;
                _this.series = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            FlowMapPoint.prototype.isValid = function () {
                var valid = !!(this.options.to && this.options.from);
                [this.options.to, this.options.from]
                    .forEach(function (toOrFrom) {
                    valid = !!(valid && (toOrFrom && (isString(toOrFrom) || ( // point id or has lat/lon coords
                    isNumber(pick(toOrFrom[0], toOrFrom.lat)) &&
                        isNumber(pick(toOrFrom[1], toOrFrom.lon))))));
                });
                return valid;
            };
            return FlowMapPoint;
        }(MapLinePoint));
        /* *
         *
         *  Default Export
         *
         * */

        return FlowMapPoint;
    });
    _registerModule(_modules, 'Series/ColorMapComposition.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var columnProto = SeriesRegistry.seriesTypes.column.prototype;
        var addEvent = U.addEvent,
            defined = U.defined;
        /* *
         *
         *  Composition
         *
         * */
        var ColorMapComposition;
        (function (ColorMapComposition) {
            /* *
             *
             *  Constants
             *
             * */
            var composedMembers = [];
            ColorMapComposition.pointMembers = {
                dataLabelOnNull: true,
                moveToTopOnHover: true,
                isValid: pointIsValid
            };
            ColorMapComposition.seriesMembers = {
                colorKey: 'value',
                axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
                parallelArrays: ['x', 'y', 'value'],
                pointArrayMap: ['value'],
                trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
                colorAttribs: seriesColorAttribs,
                pointAttribs: columnProto.pointAttribs
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            function compose(SeriesClass) {
                var PointClass = SeriesClass.prototype.pointClass;
                if (U.pushUnique(composedMembers, PointClass)) {
                    addEvent(PointClass, 'afterSetState', onPointAfterSetState);
                }
                return SeriesClass;
            }
            ColorMapComposition.compose = compose;
            /**
             * Move points to the top of the z-index order when hovered.
             * @private
             */
            function onPointAfterSetState(e) {
                var point = this;
                if (point.moveToTopOnHover && point.graphic) {
                    point.graphic.attr({
                        zIndex: e && e.state === 'hover' ? 1 : 0
                    });
                }
            }
            /**
             * Color points have a value option that determines whether or not it is
             * a null point
             * @private
             */
            function pointIsValid() {
                return (this.value !== null &&
                    this.value !== Infinity &&
                    this.value !== -Infinity &&
                    // undefined is allowed, but NaN is not (#17279)
                    (this.value === void 0 || !isNaN(this.value)));
            }
            /**
             * Get the color attibutes to apply on the graphic
             * @private
             * @function Highcharts.colorMapSeriesMixin.colorAttribs
             * @param {Highcharts.Point} point
             * @return {Highcharts.SVGAttributes}
             *         The SVG attributes
             */
            function seriesColorAttribs(point) {
                var ret = {};
                if (defined(point.color) &&
                    (!point.state || point.state === 'normal') // #15746
                ) {
                    ret[this.colorProp || 'fill'] = point.color;
                }
                return ret;
            }
        })(ColorMapComposition || (ColorMapComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ColorMapComposition;
    });
    _registerModule(_modules, 'Maps/MapSymbols.js', [_modules['Core/Renderer/SVG/SVGRenderer.js']], function (SVGRenderer) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var symbols = SVGRenderer.prototype.symbols;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable require-jsdoc, valid-jsdoc */
        function bottomButton(x, y, w, h, options) {
            if (options) {
                var r = (options === null || options === void 0 ? void 0 : options.r) || 0;
                options.brBoxY = y - r;
                options.brBoxHeight = h + r;
            }
            return symbols.roundedRect(x, y, w, h, options);
        }
        function topButton(x, y, w, h, options) {
            if (options) {
                var r = (options === null || options === void 0 ? void 0 : options.r) || 0;
                options.brBoxHeight = h + r;
            }
            return symbols.roundedRect(x, y, w, h, options);
        }
        symbols.bottombutton = bottomButton;
        symbols.topbutton = topButton;
        /* *
         *
         *  Default Export
         *
         * */

        return symbols;
    });
    _registerModule(_modules, 'Core/Chart/MapChart.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Defaults.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (Chart, D, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var getOptions = D.getOptions;
        var merge = U.merge,
            pick = U.pick;
        /**
         * Map-optimized chart. Use {@link Highcharts.Chart|Chart} for common charts.
         *
         * @requires modules/map
         *
         * @class
         * @name Highcharts.MapChart
         * @extends Highcharts.Chart
         */
        var MapChart = /** @class */ (function (_super) {
                __extends(MapChart, _super);
            function MapChart() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /**
             * Initializes the chart. The constructor's arguments are passed on
             * directly.
             *
             * @function Highcharts.MapChart#init
             *
             * @param {Highcharts.Options} userOptions
             *        Custom options.
             *
             * @param {Function} [callback]
             *        Function to run when the chart has loaded and and all external
             *        images are loaded.
             *
             *
             * @emits Highcharts.MapChart#event:init
             * @emits Highcharts.MapChart#event:afterInit
             */
            MapChart.prototype.init = function (userOptions, callback) {
                var defaultCreditsOptions = getOptions().credits;
                var options = merge({
                        chart: {
                            panning: {
                                enabled: true,
                                type: 'xy'
                            },
                            type: 'map'
                        },
                        credits: {
                            mapText: pick(defaultCreditsOptions.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">' +
                                '{geojson.copyrightShort}</a>'),
                            mapTextFull: pick(defaultCreditsOptions.mapTextFull, '{geojson.copyright}')
                        },
                        mapView: {},
                        tooltip: {
                            followTouchMove: false
                        }
                    },
                    userOptions // user's options
                    );
                _super.prototype.init.call(this, options, callback);
            };
            return MapChart;
        }(Chart));
        /* eslint-disable valid-jsdoc */
        (function (MapChart) {
            /**
             * Contains all loaded map data for Highmaps.
             *
             * @requires modules/map
             *
             * @name Highcharts.maps
             * @type {Record<string,*>}
             */
            MapChart.maps = {};
            /**
             * The factory function for creating new map charts. Creates a new {@link
             * Highcharts.MapChart|MapChart} object with different default options than
             * the basic Chart.
             *
             * @requires modules/map
             *
             * @function Highcharts.mapChart
             *
             * @param {string|Highcharts.HTMLDOMElement} [renderTo]
             *        The DOM element to render to, or its id.
             *
             * @param {Highcharts.Options} options
             *        The chart options structure as described in the
             *        [options reference](https://api.highcharts.com/highstock).
             *
             * @param {Highcharts.ChartCallbackFunction} [callback]
             *        A function to execute when the chart object is finished
             *        rendering and all external image files (`chart.backgroundImage`,
             *        `chart.plotBackgroundImage` etc) are loaded.  Defining a
             *        [chart.events.load](https://api.highcharts.com/highstock/chart.events.load)
             *        handler is equivalent.
             *
             * @return {Highcharts.MapChart}
             * The chart object.
             */
            function mapChart(a, b, c) {
                return new MapChart(a, b, c);
            }
            MapChart.mapChart = mapChart;
            /**
             * Utility for reading SVG paths directly.
             *
             * @requires modules/map
             *
             * @function Highcharts.splitPath
             *
             * @param {string|Array<string|number>} path
             *
             * @return {Highcharts.SVGPathArray}
             * Splitted SVG path
             */
            function splitPath(path) {
                var arr;
                if (typeof path === 'string') {
                    path = path
                        // Move letters apart
                        .replace(/([A-Za-z])/g, ' $1 ')
                        // Trim
                        .replace(/^\s*/, '').replace(/\s*$/, '');
                    // Split on spaces and commas. The semicolon is bogus, designed to
                    // circumvent string replacement in the pre-v7 assembler that built
                    // specific styled mode files.
                    var split = path.split(/[ ,;]+/);
                    arr = split.map(function (item) {
                        if (!/[A-za-z]/.test(item)) {
                            return parseFloat(item);
                        }
                        return item;
                    });
                }
                else {
                    arr = path;
                }
                return SVGRenderer.prototype.pathToSegments(arr);
            }
            MapChart.splitPath = splitPath;
        })(MapChart || (MapChart = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return MapChart;
    });
    _registerModule(_modules, 'Maps/MapUtilities.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        // Compute bounds from a path element
        var boundsFromPath = function (path) {
                var x2 = -Number.MAX_VALUE,
            x1 = Number.MAX_VALUE,
            y2 = -Number.MAX_VALUE,
            y1 = Number.MAX_VALUE,
            validBounds;
            path.forEach(function (seg) {
                var x = seg[seg.length - 2],
                    y = seg[seg.length - 1];
                if (typeof x === 'number' &&
                    typeof y === 'number') {
                    x1 = Math.min(x1, x);
                    x2 = Math.max(x2, x);
                    y1 = Math.min(y1, y);
                    y2 = Math.max(y2, y);
                    validBounds = true;
                }
            });
            if (validBounds) {
                return { x1: x1, y1: y1, x2: x2, y2: y2 };
            }
        };
        /**
         * Test for point in polygon. Polygon defined as array of [x,y] points.
         * @private
         */
        var pointInPolygon = function (point,
            polygon) {
                var i,
            j,
            rel1,
            rel2,
            c = false,
            x = point.x,
            y = point.y;
            for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                rel1 = polygon[i][1] > y;
                rel2 = polygon[j][1] > y;
                if (rel1 !== rel2 &&
                    (x < (polygon[j][0] - polygon[i][0]) * (y - polygon[i][1]) /
                        (polygon[j][1] - polygon[i][1]) +
                        polygon[i][0])) {
                    c = !c;
                }
            }
            return c;
        };
        /* *
         *
         *  Default Export
         *
         * */
        var MapUtilities = {
                boundsFromPath: boundsFromPath,
                pointInPolygon: pointInPolygon
            };

        return MapUtilities;
    });
    _registerModule(_modules, 'Series/Map/MapPoint.js', [_modules['Series/ColorMapComposition.js'], _modules['Maps/MapUtilities.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (ColorMapComposition, MapUtilities, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var boundsFromPath = MapUtilities.boundsFromPath;
        var ScatterSeries = SeriesRegistry.seriesTypes.scatter;
        var extend = U.extend,
            isNumber = U.isNumber,
            pick = U.pick;
        /* *
         *
         *  Class
         *
         * */
        var MapPoint = /** @class */ (function (_super) {
                __extends(MapPoint, _super);
            function MapPoint() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.options = void 0;
                _this.path = void 0;
                _this.series = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            // Get the projected path based on the geometry. May also be called on
            // mapData options (not point instances), hence static.
            MapPoint.getProjectedPath = function (point, projection) {
                if (!point.projectedPath) {
                    if (projection && point.geometry) {
                        // Always true when given GeoJSON coordinates
                        projection.hasCoordinates = true;
                        point.projectedPath = projection.path(point.geometry);
                        // SVG path given directly in point options
                    }
                    else {
                        point.projectedPath = point.path;
                    }
                }
                return point.projectedPath || [];
            };
            /**
             * Extend the Point object to split paths.
             * @private
             */
            MapPoint.prototype.applyOptions = function (options, x) {
                var series = this.series,
                    point = _super.prototype.applyOptions.call(this,
                    options,
                    x),
                    joinBy = series.joinBy;
                if (series.mapData && series.mapMap) {
                    var joinKey = joinBy[1],
                        mapKey = _super.prototype.getNestedProperty.call(point,
                        joinKey),
                        mapPoint = typeof mapKey !== 'undefined' &&
                            series.mapMap[mapKey];
                    if (mapPoint) {
                        extend(point, mapPoint); // copy over properties
                    }
                    else if (series.pointArrayMap.indexOf('value') !== -1) {
                        point.value = point.value || null;
                    }
                }
                return point;
            };
            /*
             * Get the bounds in terms of projected units
             * @param projection
             * @return MapBounds|undefined The computed bounds
             */
            MapPoint.prototype.getProjectedBounds = function (projection) {
                var path = MapPoint.getProjectedPath(this,
                    projection),
                    bounds = boundsFromPath(path),
                    properties = this.properties,
                    mapView = this.series.chart.mapView;
                if (bounds) {
                    // Cache point bounding box for use to position data labels, bubbles
                    // etc
                    var propMiddleLon = properties && properties['hc-middle-lon'], propMiddleLat = properties && properties['hc-middle-lat'];
                    if (mapView && isNumber(propMiddleLon) && isNumber(propMiddleLat)) {
                        var projectedPoint = projection.forward([propMiddleLon,
                            propMiddleLat]);
                        bounds.midX = projectedPoint[0];
                        bounds.midY = projectedPoint[1];
                    }
                    else {
                        var propMiddleX = properties && properties['hc-middle-x'], propMiddleY = properties && properties['hc-middle-y'];
                        bounds.midX = (bounds.x1 + (bounds.x2 - bounds.x1) * pick(this.middleX, isNumber(propMiddleX) ? propMiddleX : 0.5));
                        var middleYFraction = pick(this.middleY,
                            isNumber(propMiddleY) ? propMiddleY : 0.5);
                        // No geographic geometry, only path given => flip
                        if (!this.geometry) {
                            middleYFraction = 1 - middleYFraction;
                        }
                        bounds.midY =
                            bounds.y2 - (bounds.y2 - bounds.y1) * middleYFraction;
                    }
                    return bounds;
                }
            };
            /**
             * Stop the fade-out
             * @private
             */
            MapPoint.prototype.onMouseOver = function (e) {
                U.clearTimeout(this.colorInterval);
                if (
                // Valid...
                (!this.isNull && this.visible) ||
                    // ... or interact anyway
                    this.series.options.nullInteraction) {
                    _super.prototype.onMouseOver.call(this, e);
                }
                else {
                    // #3401 Tooltip doesn't hide when hovering over null points
                    this.series.onMouseOut(e);
                }
            };
            MapPoint.prototype.setVisible = function (vis) {
                var method = vis ? 'show' : 'hide';
                this.visible = this.options.visible = !!vis;
                // Show and hide associated elements
                if (this.dataLabel) {
                    this.dataLabel[method]();
                }
                // For invisible map points, render them as null points rather than
                // fully removing them. Makes more sense for color axes with data
                // classes.
                if (this.graphic) {
                    this.graphic.attr(this.series.pointAttribs(this));
                }
            };
            /**
             * Highmaps only. Zoom in on the point using the global animation.
             *
             * @sample maps/members/point-zoomto/
             *         Zoom to points from buttons
             *
             * @requires modules/map
             *
             * @function Highcharts.Point#zoomTo
             */
            MapPoint.prototype.zoomTo = function (animOptions) {
                var point = this,
                    chart = point.series.chart,
                    mapView = chart.mapView;
                var bounds = point.bounds;
                if (mapView && bounds) {
                    var inset = isNumber(point.insetIndex) &&
                            mapView.insets[point.insetIndex];
                    if (inset) {
                        // If in an inset, translate the bounds to pixels ...
                        var px1 = inset.projectedUnitsToPixels({
                                x: bounds.x1,
                                y: bounds.y1
                            }),
                            px2 = inset.projectedUnitsToPixels({
                                x: bounds.x2,
                                y: bounds.y2
                            }), 
                            // ... then back to projected units in the main mapView
                            proj1 = mapView.pixelsToProjectedUnits({
                                x: px1.x,
                                y: px1.y
                            }),
                            proj2 = mapView.pixelsToProjectedUnits({
                                x: px2.x,
                                y: px2.y
                            });
                        bounds = {
                            x1: proj1.x,
                            y1: proj1.y,
                            x2: proj2.x,
                            y2: proj2.y
                        };
                    }
                    mapView.fitToBounds(bounds, void 0, false);
                    point.series.isDirty = true;
                    chart.redraw(animOptions);
                }
            };
            return MapPoint;
        }(ScatterSeries.prototype.pointClass));
        extend(MapPoint.prototype, {
            dataLabelOnNull: ColorMapComposition.pointMembers.dataLabelOnNull,
            moveToTopOnHover: ColorMapComposition.pointMembers.moveToTopOnHover,
            isValid: ColorMapComposition.pointMembers.isValid
        });
        /* *
         *
         *  Default Export
         *
         * */

        return MapPoint;
    });
    _registerModule(_modules, 'Maps/MapViewOptionsDefault.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * The `mapView` options control the initial view of the chart, and how
         * projection is set up for raw geoJSON maps (beta as of v9.3).
         *
         * To set the view dynamically after chart generation, see
         * [mapView.setView](/class-reference/Highcharts.MapView#setView).
         *
         * @since 9.3.0
         * @product      highmaps
         * @optionparent mapView
         */
        var defaultOptions = {
                /**
                 * The center of the map in terms of longitude and latitude. For
                 * preprojected maps (like the GeoJSON files in Map Collection v1.x),
            the
                 * units are projected x and y units.
                 *
                 * @default [0, 0]
                 * @type   {Highcharts.LonLatArray}
                 *
                 * @sample {highmaps} maps/mapview/center-zoom Custom view of a world map
                 * @sample {highmaps} maps/mapview/get-view Report the current view of a
                 *         preprojected map
                 */
                center: [0, 0],
                /**
                 * Fit the map to a geometry object consisting of individual points or
                 * polygons. This is practical for responsive maps where we want to focus on
                 * a specific area regardless of map size - unlike setting `center` and
                 * `zoom`,
            where the view doesn't scale with different map sizes.
                 *
                 * The geometry can be combined with the [padding](#mapView.padding) option
                 * to avoid touching the edges of the chart.
                 *
                 * @type {object}
                 * @since 10.3.3
                 *
                 * @sample maps/mapview/fittogeometry Fitting the view to geometries
                 */
                fitToGeometry: void 0,
                /**
                 * Prevents the end user from zooming too far in on the map. See
                 * [zoom](#mapView.zoom).
                 *
                 * @type   {number|undefined}
                 *
                 * @sample {highmaps} maps/mapview/maxzoom
                 *         Prevent zooming in too far
                 */
                maxZoom: void 0,
                /**
                 * The padding inside the plot area when auto fitting to the map bounds. A
                 * number signifies pixels,
            and a percentage is relative to the plot area
                 * size.
                 *
                 * An array sets individual padding for the sides in the order [top,
            right,
                 * bottom,
            left].
                 *
                 * @sample {highmaps} maps/chart/plotbackgroundcolor-color
                 *         Visible plot area and percentage padding
                 * @sample {highmaps} maps/demo/mappoint-mapmarker
                 *         Padding for individual sides
                 * @type  {number|string|Array<number|string>}
                 */
                padding: 0,
                /**
                 * The projection options allow applying client side projection to a map
                 * given in geographic coordinates,
            typically from TopoJSON or GeoJSON.
                 *
                 * @type   {Object}
                 *
                 * @sample maps/demo/projection-explorer
                 *         Projection explorer
                 * @sample maps/demo/topojson-projection
                 *         Orthographic projection
                 * @sample maps/mapview/projection-custom-proj4js
                 *         Custom UTM projection definition
                 * @sample maps/mapview/projection-custom-d3geo
                 *         Custom Robinson projection definition
                 */
                projection: {
                    /**
                     * Projection name. Built-in projections are `EqualEarth`,
                     * `LambertConformalConic`,
            `Miller`,
            `Orthographic` and `WebMercator`.
                     *
                     * @type   {string}
                     * @sample maps/demo/projection-explorer
                     *         Projection explorer
                     * @sample maps/mapview/projection-custom-proj4js
                     *         Custom UTM projection definition
                     * @sample maps/mapview/projection-custom-d3geo
                     *         Custom Robinson projection definition
                     * @sample maps/demo/topojson-projection
                     *         Orthographic projection
                     */
                    name: void 0,
                    /**
                     * The two standard parallels that define the map layout in conic
                     * projections,
            like the LambertConformalConic projection. If only one
                     * number is given,
            the second parallel will be the same as the first.
                     *
                     * @sample maps/mapview/projection-parallels
                     *         LCC projection with parallels
                     * @sample maps/demo/projection-explorer
                     *         Projection explorer
                     * @type {Array<number>}
                     */
                    parallels: void 0,
                    /**
                     * Rotation of the projection in terms of degrees `[lambda,
            phi,
                     * gamma]`. When given,
            a three-axis spherical rotation is be applied
                     * to the globe prior to the projection.
                     *
                     * * `lambda` shifts the longitudes by the given value.
                     * * `phi` shifts the latitudes by the given value. Can be omitted.
                     * * `gamma` applies a _roll_. Can be omitted.
                     *
                     * @sample maps/demo/projection-explorer
                     *         Projection explorer
                     * @sample maps/mapview/projection-america-centric
                     *         America-centric world map
                     */
                    rotation: void 0
                },
                /**
                 * The zoom level of a map. Higher zoom levels means more zoomed in. An
                 * increase of 1 zooms in to a quarter of the viewed area (half the width
                 * and height). Defaults to fitting to the map bounds.
                 *
                 * In a `WebMercator` projection,
            a zoom level of 0 represents
                 * the world in a 256x256 pixel square. This is a common concept for WMS
                 * tiling software.
                 *
                 * @type   {number|undefined}
                 * @sample {highmaps} maps/mapview/center-zoom
                 *         Custom view of a world map
                 * @sample {highmaps} maps/mapview/get-view
                 *         Report the current view of a preprojected map
                 */
                zoom: void 0
            };
        /* *
         *
         *  Default Export
         *
         * */

        return defaultOptions;
    });
    _registerModule(_modules, 'Maps/MapViewInsetsOptionsDefault.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * Generic options for the placement and appearance of map insets like
         * non-contiguous territories.
         *
         * @since 10.0.0
         * @product      highmaps
         * @optionparent mapView.insetOptions
         */
        var defaultOptions = {
                /**
                 * The border color of the insets.
                 *
                 * @sample maps/mapview/insetoptions-border
                 *         Inset border options
                 * @type {Highcharts.ColorType}
                 */
                borderColor: "#cccccc" /* Palette.neutralColor20 */,
                /**
                 * The pixel border width of the insets.
                 *
                 * @sample maps/mapview/insetoptions-border
                 *         Inset border options
                 */
                borderWidth: 1,
                /**
                 * @ignore-option
                 */
                center: [0, 0],
                /**
                 * The padding of the insets. Can be either a number of pixels, a percentage
                 * string, or an array of either. If an array is given, it sets the top,
                 * right, bottom, left paddings respectively.
                 *
                 * @type {number|string|Array<number|string>}
                 */
                padding: '10%',
                /**
                 * What coordinate system the `field` and `borderPath` should relate to. If
                 * `plotBox`, they will be fixed to the plot box and responsively move in
                 * relation to the main map. If `mapBoundingBox`, they will be fixed to the
                 * map bounding box, which is constant and centered in different chart sizes
                 * and ratios.
                 *
                 * @validvalue ["plotBox", "mapBoundingBox"]
                 */
                relativeTo: 'mapBoundingBox',
                /**
                 * What units to use for the `field` and `borderPath` geometries. If
                 * `percent` (default), they relate to the box given in `relativeTo`. If
                 * `pixels`, they are absolute values.
                 *
                 * @validvalue ["percent", "pixels"]
                 */
                units: 'percent'
            };
        /**
         * The individual MapView insets, typically used for non-contiguous areas of a
         * country. Each item inherits from the generic `insetOptions`.
         *
         * Some of the TopoJSON files of the [Highcharts Map
         * Collection](https://code.highcharts.com/mapdata/) include a property called
         * `hc-recommended-mapview`, and some of these include insets. In order to
         * override the recommended inset options, an inset option with a matching id
         * can be applied, and it will be merged into the embedded settings.
         *
         * @sample      maps/mapview/insets-extended
         *              Extending the embedded insets
         * @sample      maps/mapview/insets-complete
         *              Complete inset config from scratch
         *
         * @extends     mapView.insetOptions
         * @type        Array<Object>
         * @product     highmaps
         * @apioption   mapView.insets
         */
        /**
         * A geometry object of type `MultiLineString` defining the border path of the
         * inset in terms of `units`. If undefined, a border is rendered around the
         * `field` geometry. It is recommended that the `borderPath` partly follows the
         * outline of the `field` in order to make pointer positioning consistent.
         *
         * @sample    maps/mapview/insets-complete
         *            Complete inset config with `borderPath`
         *
         * @product   highmaps
         * @type      {Object|undefined}
         * @apioption mapView.insets.borderPath
         */
        /**
         * A geometry object of type `Polygon` defining where in the chart the inset
         * should be rendered, in terms of `units` and relative to the `relativeTo`
         * setting. If a `borderPath` is omitted, a border is rendered around the field.
         * If undefined, the inset is rendered in the full plot area.
         *
         * @sample    maps/mapview/insets-extended
         *            Border path emitted, field is rendered
         *
         * @product   highmaps
         * @type      {Object|undefined}
         * @apioption mapView.insets.field
         */
        /**
         * A geometry object of type `Polygon` encircling the shapes that should be
         * rendered in the inset, in terms of geographic coordinates. Geometries within
         * this geometry are removed from the default map view and rendered in the
         * inset.
         *
         * @sample    maps/mapview/insets-complete
         *            Complete inset config with `geoBounds`
         *
         * @product   highmaps
         * @type      {Object}
         * @apioption mapView.insets.geoBounds
         */
        /**
         * The id of the inset, used for internal reference.
         *
         * @sample    maps/mapview/insets-extended
         *            Extending recommended insets by id
         *
         * @product   highmaps
         * @type      {string}
         * @apioption mapView.insets.id
         */
        /**
         * The projection options for the inset.
         *
         * @product   highmaps
         * @type      {Object}
         * @extends   mapView.projection
         * @apioption mapView.insets.projection
         */
        /* *
         *
         *  Default Export
         *
         * */

        return defaultOptions;
    });
    _registerModule(_modules, 'Extensions/GeoJSON.js', [_modules['Core/Chart/Chart.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Chart, F, H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var format = F.format;
        var win = H.win;
        var error = U.error,
            extend = U.extend,
            merge = U.merge,
            wrap = U.wrap;
        /**
         * Represents the loose structure of a geographic JSON file.
         *
         * @interface Highcharts.GeoJSON
         */ /**
        * Full copyright note of the geographic data.
        * @name Highcharts.GeoJSON#copyright
        * @type {string|undefined}
        */ /**
        * Short copyright note of the geographic data suitable for watermarks.
        * @name Highcharts.GeoJSON#copyrightShort
        * @type {string|undefined}
        */ /**
        * Additional meta information based on the coordinate reference system.
        * @name Highcharts.GeoJSON#crs
        * @type {Highcharts.Dictionary<any>|undefined}
        */ /**
        * Data sets of geographic features.
        * @name Highcharts.GeoJSON#features
        * @type {Array<Highcharts.GeoJSONFeature>}
        */ /**
        * Map projections and transformations to be used when calculating between
        * lat/lon and chart values. Required for lat/lon support on maps. Allows
        * resizing, rotating, and moving portions of a map within its projected
        * coordinate system while still retaining lat/lon support. If using lat/lon
        * on a portion of the map that does not match a `hitZone`, the definition with
        * the key `default` is used.
        * @name Highcharts.GeoJSON#hc-transform
        * @type {Highcharts.Dictionary<Highcharts.GeoJSONTranslation>|undefined}
        */ /**
        * Title of the geographic data.
        * @name Highcharts.GeoJSON#title
        * @type {string|undefined}
        */ /**
        * Type of the geographic data. Type of an optimized map collection is
        * `FeatureCollection`.
        * @name Highcharts.GeoJSON#type
        * @type {string|undefined}
        */ /**
        * Version of the geographic data.
        * @name Highcharts.GeoJSON#version
        * @type {string|undefined}
        */
        /**
         * Data set of a geographic feature.
         * @interface Highcharts.GeoJSONFeature
         * @extends Highcharts.Dictionary<*>
         */ /**
        * Data type of the geographic feature.
        * @name Highcharts.GeoJSONFeature#type
        * @type {string}
        */
        /**
         * Describes the map projection and transformations applied to a portion of
         * a map.
         * @interface Highcharts.GeoJSONTranslation
         */ /**
        * The coordinate reference system used to generate this portion of the map.
        * @name Highcharts.GeoJSONTranslation#crs
        * @type {string}
        */ /**
        * Define the portion of the map that this defintion applies to. Defined as a
        * GeoJSON polygon feature object, with `type` and `coordinates` properties.
        * @name Highcharts.GeoJSONTranslation#hitZone
        * @type {Highcharts.Dictionary<*>|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#jsonmarginX
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#jsonmarginY
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#jsonres
        * @type {number|undefined}
        */ /**
        * Specifies clockwise rotation of the coordinates after the projection, but
        * before scaling and panning. Defined in radians, relative to the coordinate
        * system origin.
        * @name Highcharts.GeoJSONTranslation#rotation
        * @type {number|undefined}
        */ /**
        * The scaling factor applied to the projected coordinates.
        * @name Highcharts.GeoJSONTranslation#scale
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#xoffset
        * @type {number|undefined}
        */ /**
        * X offset of projected coordinates after scaling.
        * @name Highcharts.GeoJSONTranslation#xpan
        * @type {number|undefined}
        */ /**
        * Property for internal use for maps generated by Highsoft.
        * @name Highcharts.GeoJSONTranslation#yoffset
        * @type {number|undefined}
        */ /**
        * Y offset of projected coordinates after scaling.
        * @name Highcharts.GeoJSONTranslation#ypan
        * @type {number|undefined}
        */
        /**
         * Result object of a map transformation.
         *
         * @interface Highcharts.ProjectedXY
         */ /**
        * X coordinate in projected units.
        * @name Highcharts.ProjectedXY#x
        * @type {number}
        */ /**
        * Y coordinate in projected units
        * @name Highcharts.ProjectedXY#y
        * @type {number}
        */
        /**
         * A latitude/longitude object.
         *
         * @interface Highcharts.MapLonLatObject
         */ /**
        * The latitude.
        * @name Highcharts.MapLonLatObject#lat
        * @type {number}
        */ /**
        * The longitude.
        * @name Highcharts.MapLonLatObject#lon
        * @type {number}
        */
        /**
         * An array of longitude, latitude.
         *
         * @typedef {Array<number>} Highcharts.LonLatArray
         */
        /**
         * A TopoJSON object, see description on the
         * [project's GitHub page](https://github.com/topojson/topojson).
         *
         * @typedef {Object} Highcharts.TopoJSON
         */
        ''; // detach doclets above
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Highcharts Maps only. Get point from latitude and longitude using specified
         * transform definition.
         *
         * @requires modules/map
         *
         * @sample maps/series/latlon-transform/
         *         Use specific transformation for lat/lon
         *
         * @function Highcharts.Chart#transformFromLatLon
         *
         * @param {Highcharts.MapLonLatObject} latLon
         *        A latitude/longitude object.
         *
         * @param {*} transform
         *        The transform definition to use as explained in the
         *        {@link https://www.highcharts.com/docs/maps/latlon|documentation}.
         *
         * @return {ProjectedXY}
         *         An object with `x` and `y` properties.
         */
        Chart.prototype.transformFromLatLon = function (latLon, transform) {
            /**
             * Allows to manually load the proj4 library from Highcharts options
             * instead of the `window`.
             * In case of loading the library from a `script` tag,
             * this option is not needed, it will be loaded from there by default.
             *
             * @type      {Function}
             * @product   highmaps
             * @apioption chart.proj4
             */
            var proj4 = this.options.chart.proj4 || win.proj4;
            if (!proj4) {
                error(21, false, this);
                return;
            }
            var _a = transform.jsonmarginX,
                jsonmarginX = _a === void 0 ? 0 : _a,
                _b = transform.jsonmarginY,
                jsonmarginY = _b === void 0 ? 0 : _b,
                _c = transform.jsonres,
                jsonres = _c === void 0 ? 1 : _c,
                _d = transform.scale,
                scale = _d === void 0 ? 1 : _d,
                _e = transform.xoffset,
                xoffset = _e === void 0 ? 0 : _e,
                _f = transform.xpan,
                xpan = _f === void 0 ? 0 : _f,
                _g = transform.yoffset,
                yoffset = _g === void 0 ? 0 : _g,
                _h = transform.ypan,
                ypan = _h === void 0 ? 0 : _h;
            var projected = proj4(transform.crs,
                [latLon.lon,
                latLon.lat]),
                cosAngle = transform.cosAngle ||
                    (transform.rotation && Math.cos(transform.rotation)),
                sinAngle = transform.sinAngle ||
                    (transform.rotation && Math.sin(transform.rotation)),
                rotated = transform.rotation ? [
                    projected[0] * cosAngle + projected[1] * sinAngle,
                    -projected[0] * sinAngle + projected[1] * cosAngle
                ] : projected;
            return {
                x: ((rotated[0] - xoffset) * scale + xpan) * jsonres + jsonmarginX,
                y: -(((yoffset - rotated[1]) * scale + ypan) * jsonres - jsonmarginY)
            };
        };
        /**
         * Highcharts Maps only. Get latLon from point using specified transform
         * definition. The method returns an object with the numeric properties `lat`
         * and `lon`.
         *
         * @requires modules/map
         *
         * @sample maps/series/latlon-transform/ Use specific transformation for lat/lon
         *
         * @function Highcharts.Chart#transformToLatLon
         *
         * @param {Highcharts.Point|Highcharts.ProjectedXY} point A `Point` instance, or
         *        any object containing the properties `x` and `y` with numeric values.
         *
         * @param {*} transform The transform definition to use as explained in the
         *        {@link https://www.highcharts.com/docs/maps/latlon|documentation}.
         *
         * @return {Highcharts.MapLonLatObject|undefined} An object with `lat` and `lon`
         *         properties.
         */
        Chart.prototype.transformToLatLon = function (point, transform) {
            var proj4 = this.options.chart.proj4 || win.proj4;
            if (!proj4) {
                error(21, false, this);
                return;
            }
            if (point.y === null) {
                return;
            }
            var _a = transform.jsonmarginX,
                jsonmarginX = _a === void 0 ? 0 : _a,
                _b = transform.jsonmarginY,
                jsonmarginY = _b === void 0 ? 0 : _b,
                _c = transform.jsonres,
                jsonres = _c === void 0 ? 1 : _c,
                _d = transform.scale,
                scale = _d === void 0 ? 1 : _d,
                _e = transform.xoffset,
                xoffset = _e === void 0 ? 0 : _e,
                _f = transform.xpan,
                xpan = _f === void 0 ? 0 : _f,
                _g = transform.yoffset,
                yoffset = _g === void 0 ? 0 : _g,
                _h = transform.ypan,
                ypan = _h === void 0 ? 0 : _h;
            var normalized = {
                    x: ((point.x - jsonmarginX) / jsonres - xpan) / scale + xoffset,
                    y: ((point.y - jsonmarginY) / jsonres + ypan) / scale + yoffset
                },
                cosAngle = transform.cosAngle ||
                    (transform.rotation && Math.cos(transform.rotation)),
                sinAngle = transform.sinAngle ||
                    (transform.rotation && Math.sin(transform.rotation)), 
                // Note: Inverted sinAngle to reverse rotation direction
                projected = proj4(transform.crs, 'WGS84',
                transform.rotation ? {
                    x: normalized.x * cosAngle + normalized.y * -sinAngle,
                    y: normalized.x * sinAngle + normalized.y * cosAngle
                } : normalized);
            return { lat: projected.y, lon: projected.x };
        };
        /**
         * Deprecated. Use `MapView.projectedUnitsToLonLat` instead.
         *
         * @deprecated
         *
         * @requires modules/map
         *
         * @function Highcharts.Chart#fromPointToLatLon
         *
         * @param {Highcharts.Point|Highcharts.ProjectedXY} point A `Point`
         *        instance or anything containing `x` and `y` properties with numeric
         *        values.
         *
         * @return {Highcharts.MapLonLatObject|undefined} An object with `lat` and `lon`
         *         properties.
         */
        Chart.prototype.fromPointToLatLon = function (point) {
            return this.mapView && this.mapView.projectedUnitsToLonLat(point);
        };
        /**
         * Deprecated. Use `MapView.lonLatToProjectedUnits` instead.
         *
         * @deprecated
         *
         * @requires modules/map
         *
         * @function Highcharts.Chart#fromLatLonToPoint
         *
         * @param {Highcharts.MapLonLatObject} lonLat Coordinates.
         *
         * @return {Highcharts.ProjectedXY}
         *      X and Y coordinates in terms of projected values
         */
        Chart.prototype.fromLatLonToPoint = function (lonLat) {
            return this.mapView && this.mapView.lonLatToProjectedUnits(lonLat);
        };
        /*
         * Convert a TopoJSON topology to GeoJSON. By default the first object is
         * handled.
         * Based on https://github.com/topojson/topojson-specification
        */
        function topo2geo(topology, objectName) {
            // Decode first object/feature as default
            if (!objectName) {
                objectName = Object.keys(topology.objects)[0];
            }
            var object = topology.objects[objectName];
            // Already decoded => return cache
            if (object['hc-decoded-geojson']) {
                return object['hc-decoded-geojson'];
            }
            // Do the initial transform
            var arcsArray = topology.arcs;
            if (topology.transform) {
                var _a = topology.transform,
                    scale_1 = _a.scale,
                    translate_1 = _a.translate;
                arcsArray = topology.arcs.map(function (arc) {
                    var x = 0,
                        y = 0;
                    return arc.map(function (position) {
                        position = position.slice();
                        position[0] = (x += position[0]) * scale_1[0] + translate_1[0];
                        position[1] = (y += position[1]) * scale_1[1] + translate_1[1];
                        return position;
                    });
                });
            }
            // Recurse down any depth of multi-dimentional arrays of arcs and insert
            // the coordinates
            var arcsToCoordinates = function (arcs) {
                    if (typeof arcs[0] === 'number') {
                        return arcs.reduce(function (coordinates,
                arcNo,
                i) {
                            var arc = arcNo < 0 ? arcsArray[~arcNo] : arcsArray[arcNo];
                        // The first point of an arc is always identical to the last
                        // point of the previes arc, so slice it off to save further
                        // processing.
                        if (arcNo < 0) {
                            arc = arc.slice(0, i === 0 ? arc.length : arc.length - 1);
                            arc.reverse();
                        }
                        else if (i) {
                            arc = arc.slice(1);
                        }
                        return coordinates.concat(arc);
                    }, []);
                }
                return arcs.map(arcsToCoordinates);
            };
            var features = object.geometries
                    .map(function (geometry) { return ({
                    type: 'Feature',
                    properties: geometry.properties,
                    geometry: {
                        type: geometry.type,
                        coordinates: geometry.coordinates ||
                            arcsToCoordinates(geometry.arcs)
                    }
                }); });
            var geojson = {
                    type: 'FeatureCollection',
                    copyright: topology.copyright,
                    copyrightShort: topology.copyrightShort,
                    copyrightUrl: topology.copyrightUrl,
                    features: features,
                    'hc-recommended-mapview': object['hc-recommended-mapview'],
                    bbox: topology.bbox,
                    title: topology.title
                };
            object['hc-decoded-geojson'] = geojson;
            return geojson;
        }
        /**
         * Highcharts Maps only. Restructure a GeoJSON or TopoJSON object in preparation
         * to be read directly by the
         * {@link https://api.highcharts.com/highmaps/plotOptions.series.mapData|series.mapData}
         * option. The object will be broken down to fit a specific Highcharts type,
         * either `map`, `mapline` or `mappoint`. Meta data in GeoJSON's properties
         * object will be copied directly over to {@link Point.properties} in Highcharts
         * Maps.
         *
         * @requires modules/map
         *
         * @sample maps/demo/geojson/ Simple areas
         * @sample maps/demo/mapline-mappoint/ Multiple types
         * @sample maps/series/mapdata-multiple/ Multiple map sources
         *
         * @function Highcharts.geojson
         *
         * @param {Highcharts.GeoJSON|Highcharts.TopoJSON} json The GeoJSON or TopoJSON
         *        structure to parse, represented as a JavaScript object.
         *
         * @param {string} [hType=map] The Highcharts Maps series type to prepare for.
         *        Setting "map" will return GeoJSON polygons and multipolygons. Setting
         *        "mapline" will return GeoJSON linestrings and multilinestrings.
         *        Setting "mappoint" will return GeoJSON points and multipoints.
         *
         *
         * @return {Array<*>} An object ready for the `mapData` option.
         */
        function geojson(json, hType, series) {
            if (hType === void 0) { hType = 'map'; }
            var mapData = [];
            var geojson = json.type === 'Topology' ? topo2geo(json) : json;
            geojson.features.forEach(function (feature) {
                var geometry = feature.geometry || {},
                    type = geometry.type,
                    coordinates = geometry.coordinates,
                    properties = feature.properties;
                var pointOptions;
                if ((hType === 'map' || hType === 'mapbubble') &&
                    (type === 'Polygon' || type === 'MultiPolygon')) {
                    if (coordinates.length) {
                        pointOptions = { geometry: { coordinates: coordinates, type: type } };
                    }
                }
                else if (hType === 'mapline' &&
                    (type === 'LineString' ||
                        type === 'MultiLineString')) {
                    if (coordinates.length) {
                        pointOptions = { geometry: { coordinates: coordinates, type: type } };
                    }
                }
                else if (hType === 'mappoint' && type === 'Point') {
                    if (coordinates.length) {
                        pointOptions = { geometry: { coordinates: coordinates, type: type } };
                    }
                }
                if (pointOptions) {
                    var name_1 = properties && (properties.name || properties.NAME),
                        lon = properties && properties.lon,
                        lat = properties && properties.lat;
                    mapData.push(extend(pointOptions, {
                        lat: typeof lat === 'number' ? lat : void 0,
                        lon: typeof lon === 'number' ? lon : void 0,
                        name: typeof name_1 === 'string' ? name_1 : void 0,
                        /**
                         * In Highcharts Maps, when data is loaded from GeoJSON, the
                         * GeoJSON item's properies are copied over here.
                         *
                         * @requires modules/map
                         * @name Highcharts.Point#properties
                         * @type {*}
                         */
                        properties: properties
                    }));
                }
            });
            // Create a credits text that includes map source, to be picked up in
            // Chart.addCredits
            if (series && geojson.copyrightShort) {
                series.chart.mapCredits = format(series.chart.options.credits.mapText, { geojson: geojson });
                series.chart.mapCreditsFull = format(series.chart.options.credits.mapTextFull, { geojson: geojson });
            }
            return mapData;
        }
        // Override addCredits to include map source by default
        wrap(Chart.prototype, 'addCredits', function (proceed, credits) {
            credits = merge(true, this.options.credits, credits);
            // Disable credits link if map credits enabled. This to allow for in-text
            // anchors.
            if (this.mapCredits) {
                credits.href = null;
            }
            proceed.call(this, credits);
            // Add full map credits to hover
            if (this.credits && this.mapCreditsFull) {
                this.credits.attr({
                    title: this.mapCreditsFull
                });
            }
        });
        H.geojson = geojson;
        H.topo2geo = topo2geo;
        var GeoJSONModule = {
                geojson: geojson,
                topo2geo: topo2geo
            };

        return GeoJSONModule;
    });
    _registerModule(_modules, 'Core/Geometry/PolygonClip.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isInside = function (clipEdge1,
            clipEdge2,
            p) {
                return (clipEdge2[0] - clipEdge1[0]) * (p[1] - clipEdge1[1]) >
                    (clipEdge2[1] - clipEdge1[1]) * (p[0] - clipEdge1[0]);
        };
        var intersection = function (clipEdge1,
            clipEdge2,
            prevPoint,
            currentPoint) {
                var dc = [
                    clipEdge1[0] - clipEdge2[0],
                    clipEdge1[1] - clipEdge2[1]
                ],
            dp = [
                    prevPoint[0] - currentPoint[0],
                    prevPoint[1] - currentPoint[1]
                ],
            n1 = clipEdge1[0] * clipEdge2[1] - clipEdge1[1] * clipEdge2[0],
            n2 = prevPoint[0] * currentPoint[1] - prevPoint[1] * currentPoint[0],
            n3 = 1 / (dc[0] * dp[1] - dc[1] * dp[0]),
            intersection = [
                    (n1 * dp[0] - n2 * dc[0]) * n3,
                    (n1 * dp[1] - n2 * dc[1]) * n3
                ];
            intersection.isIntersection = true;
            return intersection;
        };
        var PolygonClip;
        (function (PolygonClip) {
            // Simple line string clipping. Clip to bounds and insert intersection
            // points.
            PolygonClip.clipLineString = function (line, boundsPolygon) {
                var ret = [],
                    l = PolygonClip.clipPolygon(line,
                    boundsPolygon,
                    false);
                for (var i = 1; i < l.length; i++) {
                    // Insert gap where two intersections follow each other
                    if (l[i].isIntersection && l[i - 1].isIntersection) {
                        ret.push(l.splice(0, i));
                        i = 0;
                    }
                    // Push the rest
                    if (i === l.length - 1) {
                        ret.push(l);
                    }
                }
                return ret;
            };
            // Clip a polygon to another polygon using the Sutherland/Hodgman algorithm.
            PolygonClip.clipPolygon = function (subjectPolygon, boundsPolygon, closed) {
                if (closed === void 0) { closed = true; }
                var clipEdge1 = boundsPolygon[boundsPolygon.length - 1],
                    clipEdge2,
                    prevPoint,
                    currentPoint,
                    outputList = subjectPolygon;
                for (var j = 0; j < boundsPolygon.length; j++) {
                    var inputList = outputList;
                    clipEdge2 = boundsPolygon[j];
                    outputList = [];
                    prevPoint = closed ?
                        // Polygon, wrap around
                        inputList[inputList.length - 1] :
                        // Open line string, don't wrap
                        inputList[0];
                    for (var i = 0; i < inputList.length; i++) {
                        currentPoint = inputList[i];
                        if (isInside(clipEdge1, clipEdge2, currentPoint)) {
                            if (!isInside(clipEdge1, clipEdge2, prevPoint)) {
                                outputList.push(intersection(clipEdge1, clipEdge2, prevPoint, currentPoint));
                            }
                            outputList.push(currentPoint);
                        }
                        else if (isInside(clipEdge1, clipEdge2, prevPoint)) {
                            outputList.push(intersection(clipEdge1, clipEdge2, prevPoint, currentPoint));
                        }
                        prevPoint = currentPoint;
                    }
                    clipEdge1 = clipEdge2;
                }
                return outputList;
            };
        })(PolygonClip || (PolygonClip = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return PolygonClip;
    });
    _registerModule(_modules, 'Maps/Projections/LambertConformalConic.js', [], function () {
        /* *
         * Lambert Conformal Conic projection
         * */
        var sign = Math.sign ||
                (function (n) { return (n === 0 ? 0 : n > 0 ? 1 : -1); }),
            scale = 63.78137,
            deg2rad = Math.PI / 180,
            halfPI = Math.PI / 2,
            eps10 = 1e-6,
            tany = function (y) { return Math.tan((halfPI + y) / 2); };
        var LambertConformalConic = /** @class */ (function () {
                function LambertConformalConic(options) {
                    var _a;
                var parallels = (options.parallels || [])
                        .map(function (n) { return n * deg2rad; }),
                    lat1 = parallels[0] || 0,
                    lat2 = (_a = parallels[1]) !== null && _a !== void 0 ? _a : lat1,
                    cosLat1 = Math.cos(lat1);
                if (typeof options.projectedBounds === 'object') {
                    this.projectedBounds = options.projectedBounds;
                }
                // Apply the global variables
                var n = lat1 === lat2 ?
                        Math.sin(lat1) :
                        Math.log(cosLat1 / Math.cos(lat2)) / Math.log(tany(lat2) / tany(lat1));
                if (Math.abs(n) < 1e-10) {
                    n = (sign(n) || 1) * 1e-10;
                }
                this.n = n;
                this.c = cosLat1 * Math.pow(tany(lat1), n) / n;
            }
            LambertConformalConic.prototype.forward = function (lonLat) {
                var lon = lonLat[0] * deg2rad,
                    _a = this,
                    c = _a.c,
                    n = _a.n,
                    projectedBounds = _a.projectedBounds;
                var lat = lonLat[1] * deg2rad;
                if (c > 0) {
                    if (lat < -halfPI + eps10) {
                        lat = -halfPI + eps10;
                    }
                }
                else {
                    if (lat > halfPI - eps10) {
                        lat = halfPI - eps10;
                    }
                }
                var r = c / Math.pow(tany(lat),
                    n),
                    x = r * Math.sin(n * lon) * scale,
                    y = (c - r * Math.cos(n * lon)) * scale,
                    xy = [x,
                    y];
                if (projectedBounds && (x < projectedBounds.x1 ||
                    x > projectedBounds.x2 ||
                    y < projectedBounds.y1 ||
                    y > projectedBounds.y2)) {
                    xy.outside = true;
                }
                return xy;
            };
            LambertConformalConic.prototype.inverse = function (xy) {
                var x = xy[0] / scale,
                    y = xy[1] / scale,
                    _a = this,
                    c = _a.c,
                    n = _a.n,
                    cy = c - y,
                    rho = sign(n) * Math.sqrt(x * x + cy * cy);
                var l = Math.atan2(x,
                    Math.abs(cy)) * sign(cy);
                if (cy * n < 0) {
                    l -= Math.PI * sign(x) * sign(cy);
                }
                return [
                    (l / n) / deg2rad,
                    (2 * Math.atan(Math.pow(c / rho, 1 / n)) - halfPI) / deg2rad
                ];
            };
            return LambertConformalConic;
        }());

        return LambertConformalConic;
    });
    _registerModule(_modules, 'Maps/Projections/EqualEarth.js', [], function () {
        /* *
         *
         * Equal Earth projection, an equal-area projection designed to minimize
         * distortion and remain pleasing to the eye.
         *
         * Invented by Bojan Šavrič, Bernhard Jenny, and Tom Patterson in 2018. It is
         * inspired by the widely used Robinson projection.
         *
         * */
        var A1 = 1.340264,
            A2 = -0.081106,
            A3 = 0.000893,
            A4 = 0.003796,
            M = Math.sqrt(3) / 2.0,
            scale = 74.03120656864502;
        var EqualEarth = /** @class */ (function () {
                function EqualEarth() {
                    this.bounds = {
                        x1: -200.37508342789243,
                        x2: 200.37508342789243,
                        y1: -97.52595454902263,
                        y2: 97.52595454902263
                    };
            }
            EqualEarth.prototype.forward = function (lonLat) {
                var d = Math.PI / 180,
                    paramLat = Math.asin(M * Math.sin(lonLat[1] * d)),
                    paramLatSq = paramLat * paramLat,
                    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
                var x = lonLat[0] * d * Math.cos(paramLat) * scale / (M *
                        (A1 +
                            3 * A2 * paramLatSq +
                            paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
                var y = paramLat * scale * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
                return [x, y];
            };
            EqualEarth.prototype.inverse = function (xy) {
                var x = xy[0] / scale,
                    y = xy[1] / scale,
                    d = 180 / Math.PI,
                    epsilon = 1e-9,
                    iterations = 12;
                var paramLat = y,
                    paramLatSq,
                    paramLatPow6,
                    fy,
                    fpy,
                    dlat,
                    i;
                for (i = 0; i < iterations; ++i) {
                    paramLatSq = paramLat * paramLat;
                    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
                    fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - y;
                    fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
                    paramLat -= dlat = fy / fpy;
                    if (Math.abs(dlat) < epsilon) {
                        break;
                    }
                }
                paramLatSq = paramLat * paramLat;
                paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
                var lon = d * M * x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
                var lat = d * Math.asin(Math.sin(paramLat) / M);
                return [lon, lat];
            };
            return EqualEarth;
        }());

        return EqualEarth;
    });
    _registerModule(_modules, 'Maps/Projections/Miller.js', [], function () {
        /* *
         * Miller projection
         * */
        var quarterPI = Math.PI / 4,
            deg2rad = Math.PI / 180,
            scale = 63.78137;
        var Miller = /** @class */ (function () {
                function Miller() {
                    this.bounds = {
                        x1: -200.37508342789243,
                        x2: 200.37508342789243,
                        y1: -146.91480769173063,
                        y2: 146.91480769173063
                    };
            }
            Miller.prototype.forward = function (lonLat) {
                return [
                    lonLat[0] * deg2rad * scale,
                    1.25 * scale * Math.log(Math.tan(quarterPI + 0.4 * lonLat[1] * deg2rad))
                ];
            };
            Miller.prototype.inverse = function (xy) {
                return [
                    (xy[0] / scale) / deg2rad,
                    2.5 * (Math.atan(Math.exp(0.8 * (xy[1] / scale))) - quarterPI) / deg2rad
                ];
            };
            return Miller;
        }());

        return Miller;
    });
    _registerModule(_modules, 'Maps/Projections/Orthographic.js', [], function () {
        /* *
         * Orthographic projection
         * */
        var deg2rad = Math.PI / 180,
            scale = 63.78460826781007;
        var Orthographic = /** @class */ (function () {
                function Orthographic() {
                    this.antimeridianCutting = false;
                this.bounds = {
                    x1: -scale,
                    x2: scale,
                    y1: -scale,
                    y2: scale
                };
            }
            Orthographic.prototype.forward = function (lonLat) {
                var lonDeg = lonLat[0],
                    latDeg = lonLat[1];
                var lat = latDeg * deg2rad;
                var xy = [
                        Math.cos(lat) * Math.sin(lonDeg * deg2rad) * scale,
                        Math.sin(lat) * scale
                    ];
                if (lonDeg < -90 || lonDeg > 90) {
                    xy.outside = true;
                }
                return xy;
            };
            Orthographic.prototype.inverse = function (xy) {
                var x = xy[0] / scale,
                    y = xy[1] / scale,
                    z = Math.sqrt(x * x + y * y),
                    c = Math.asin(z),
                    cSin = Math.sin(c),
                    cCos = Math.cos(c);
                return [
                    Math.atan2(x * cSin, z * cCos) / deg2rad,
                    Math.asin(z && y * cSin / z) / deg2rad
                ];
            };
            return Orthographic;
        }());

        return Orthographic;
    });
    _registerModule(_modules, 'Maps/Projections/WebMercator.js', [], function () {
        /* *
         * Web Mercator projection, used for most online map tile services
         * */
        var maxLatitude = 85.0511287798, // The latitude that defines a square
            r = 63.78137,
            deg2rad = Math.PI / 180;
        var WebMercator = /** @class */ (function () {
                function WebMercator() {
                    this.bounds = {
                        x1: -200.37508342789243,
                        x2: 200.37508342789243,
                        y1: -200.3750834278071,
                        y2: 200.3750834278071
                    };
                this.maxLatitude = maxLatitude;
            }
            WebMercator.prototype.forward = function (lonLat) {
                var sinLat = Math.sin(lonLat[1] * deg2rad);
                var xy = [
                        r * lonLat[0] * deg2rad,
                        r * Math.log((1 + sinLat) / (1 - sinLat)) / 2
                    ];
                if (Math.abs(lonLat[1]) > maxLatitude) {
                    xy.outside = true;
                }
                return xy;
            };
            WebMercator.prototype.inverse = function (xy) {
                return [
                    xy[0] / (r * deg2rad),
                    (2 * Math.atan(Math.exp(xy[1] / r)) - (Math.PI / 2)) / deg2rad
                ];
            };
            return WebMercator;
        }());

        return WebMercator;
    });
    _registerModule(_modules, 'Maps/Projections/ProjectionRegistry.js', [_modules['Maps/Projections/LambertConformalConic.js'], _modules['Maps/Projections/EqualEarth.js'], _modules['Maps/Projections/Miller.js'], _modules['Maps/Projections/Orthographic.js'], _modules['Maps/Projections/WebMercator.js']], function (LambertConformalConic, EqualEarth, Miller, Orthographic, WebMercator) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var registry = {
                EqualEarth: EqualEarth,
                LambertConformalConic: LambertConformalConic,
                Miller: Miller,
                Orthographic: Orthographic,
                WebMercator: WebMercator
            };

        return registry;
    });
    _registerModule(_modules, 'Maps/Projection.js', [_modules['Core/Geometry/PolygonClip.js'], _modules['Maps/Projections/ProjectionRegistry.js'], _modules['Core/Utilities.js']], function (PC, registry, U) {
        /* *
         *
         *  (c) 2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __spreadArray = (this && this.__spreadArray) || function (to,
            from,
            pack) {
                if (pack || arguments.length === 2) for (var i = 0,
            l = from.length,
            ar; i < l; i++) {
                    if (ar || !(i in from)) {
                        if (!ar) ar = Array.prototype.slice.call(from, 0,
            i);
                    ar[i] = from[i];
                }
            }
            return to.concat(ar || Array.prototype.slice.call(from));
        };
        var clipLineString = PC.clipLineString,
            clipPolygon = PC.clipPolygon;
        var clamp = U.clamp,
            erase = U.erase;
        var deg2rad = Math.PI * 2 / 360;
        // Safe padding on either side of the antimeridian to avoid points being
        // projected to the wrong side of the plane
        var floatCorrection = 0.000001;
        // Keep longitude within -180 and 180. This is faster than using the modulo
        // operator, and preserves the distinction between -180 and 180.
        var wrapLon = function (lon) {
                // Replacing the if's with while would increase the range, but make it prone
                // to crashes on bad data
                if (lon < -180) {
                    lon += 360;
            }
            if (lon > 180) {
                lon -= 360;
            }
            return lon;
        };
        var Projection = /** @class */ (function () {
                function Projection(options) {
                    if (options === void 0) { options = {}; }
                    // Whether the chart has points, lines or polygons given as coordinates
                    // with positive up, as opposed to paths in the SVG plane with positive
                    // down.
                    this.hasCoordinates = false;
                // Whether the chart has true projection as opposed to pre-projected geojson
                // as in the legacy map collection.
                this.hasGeoProjection = false;
                this.maxLatitude = 90;
                this.options = options;
                var name = options.name,
                    projectedBounds = options.projectedBounds,
                    rotation = options.rotation;
                this.rotator = rotation ? this.getRotator(rotation) : void 0;
                var ProjectionDefinition = name ? Projection.registry[name] : void 0;
                if (ProjectionDefinition) {
                    this.def = new ProjectionDefinition(options);
                }
                var _a = this,
                    def = _a.def,
                    rotator = _a.rotator;
                if (def) {
                    this.maxLatitude = def.maxLatitude || 90;
                    this.hasGeoProjection = true;
                }
                if (rotator && def) {
                    this.forward = function (lonLat) {
                        return def.forward(rotator.forward(lonLat));
                    };
                    this.inverse = function (xy) {
                        return rotator.inverse(def.inverse(xy));
                    };
                }
                else if (def) {
                    this.forward = function (lonLat) { return def.forward(lonLat); };
                    this.inverse = function (xy) { return def.inverse(xy); };
                }
                else if (rotator) {
                    this.forward = rotator.forward;
                    this.inverse = rotator.inverse;
                }
                // Projected bounds/clipping
                this.bounds = projectedBounds === 'world' ?
                    def && def.bounds :
                    projectedBounds;
            }
            // Add a projection definition to the registry, accessible by its `name`.
            Projection.add = function (name, definition) {
                Projection.registry[name] = definition;
            };
            // Calculate the great circle between two given coordinates
            Projection.greatCircle = function (point1, point2, inclusive) {
                var atan2 = Math.atan2,
                    cos = Math.cos,
                    sin = Math.sin,
                    sqrt = Math.sqrt;
                var lat1 = point1[1] * deg2rad;
                var lon1 = point1[0] * deg2rad;
                var lat2 = point2[1] * deg2rad;
                var lon2 = point2[0] * deg2rad;
                var deltaLat = lat2 - lat1;
                var deltaLng = lon2 - lon1;
                var calcA = sin(deltaLat / 2) * sin(deltaLat / 2) +
                        cos(lat1) * cos(lat2) * sin(deltaLng / 2) * sin(deltaLng / 2);
                var calcB = 2 * atan2(sqrt(calcA),
                    sqrt(1 - calcA));
                var distance = calcB * 6371e3; // in meters
                    var jumps = Math.round(distance / 500000); // 500 km each jump
                    var lineString = [];
                if (inclusive) {
                    lineString.push(point1);
                }
                if (jumps > 1) {
                    var step = 1 / jumps;
                    for (var fraction = step; fraction < 0.999; // Account for float errors
                     fraction += step) {
                        var A = sin((1 - fraction) * calcB) / sin(calcB);
                        var B = sin(fraction * calcB) / sin(calcB);
                        var x = A * cos(lat1) * cos(lon1) + B * cos(lat2) * cos(lon2);
                        var y = A * cos(lat1) * sin(lon1) + B * cos(lat2) * sin(lon2);
                        var z = A * sin(lat1) + B * sin(lat2);
                        var lat3 = atan2(z,
                            sqrt(x * x + y * y));
                        var lon3 = atan2(y,
                            x);
                        lineString.push([lon3 / deg2rad, lat3 / deg2rad]);
                    }
                }
                if (inclusive) {
                    lineString.push(point2);
                }
                return lineString;
            };
            Projection.insertGreatCircles = function (poly) {
                var i = poly.length - 1;
                while (i--) {
                    // Distance in degrees, either in lon or lat. Avoid heavy
                    // calculation of true distance.
                    var roughDistance = Math.max(Math.abs(poly[i][0] - poly[i + 1][0]),
                        Math.abs(poly[i][1] - poly[i + 1][1]));
                    if (roughDistance > 10) {
                        var greatCircle = Projection.greatCircle(poly[i],
                            poly[i + 1]);
                        if (greatCircle.length) {
                            poly.splice.apply(poly, __spreadArray([i + 1, 0], greatCircle, false));
                        }
                    }
                }
            };
            Projection.toString = function (options) {
                var _a = options || {},
                    name = _a.name,
                    rotation = _a.rotation;
                return [name, rotation && rotation.join(',')].join(';');
            };
            Projection.prototype.lineIntersectsBounds = function (line) {
                var _a = this.bounds || {},
                    x1 = _a.x1,
                    x2 = _a.x2,
                    y1 = _a.y1,
                    y2 = _a.y2;
                var getIntersect = function (line,
                    dim,
                    val) {
                        var p1 = line[0],
                    p2 = line[1],
                    otherDim = dim ? 0 : 1;
                    // Check if points are on either side of the line
                    if (typeof val === 'number' && p1[dim] >= val !== p2[dim] >= val) {
                        var fraction = ((val - p1[dim]) / (p2[dim] - p1[dim])),
                            crossingVal = p1[otherDim] +
                                fraction * (p2[otherDim] - p1[otherDim]);
                        return dim ? [crossingVal, val] : [val, crossingVal];
                    }
                };
                var intersection,
                    ret = line[0];
                if ((intersection = getIntersect(line, 0, x1))) {
                    ret = intersection;
                    // Assuming line[1] was originally outside, replace it with the
                    // intersection point so that the horizontal intersection will
                    // be correct.
                    line[1] = intersection;
                }
                else if ((intersection = getIntersect(line, 0, x2))) {
                    ret = intersection;
                    line[1] = intersection;
                }
                if ((intersection = getIntersect(line, 1, y1))) {
                    ret = intersection;
                }
                else if ((intersection = getIntersect(line, 1, y2))) {
                    ret = intersection;
                }
                return ret;
            };
            /*
             * Take the rotation options and return the appropriate projection functions
             */
            Projection.prototype.getRotator = function (rotation) {
                var deltaLambda = rotation[0] * deg2rad,
                    deltaPhi = (rotation[1] || 0) * deg2rad,
                    deltaGamma = (rotation[2] || 0) * deg2rad;
                var cosDeltaPhi = Math.cos(deltaPhi),
                    sinDeltaPhi = Math.sin(deltaPhi),
                    cosDeltaGamma = Math.cos(deltaGamma),
                    sinDeltaGamma = Math.sin(deltaGamma);
                if (deltaLambda === 0 && deltaPhi === 0 && deltaGamma === 0) {
                    // Don't waste processing time
                    return;
                }
                return {
                    forward: function (lonLat) {
                        // Lambda (lon) rotation
                        var lon = lonLat[0] * deg2rad + deltaLambda;
                        // Phi (lat) and gamma rotation
                        var lat = lonLat[1] * deg2rad,
                            cosLat = Math.cos(lat),
                            x = Math.cos(lon) * cosLat,
                            y = Math.sin(lon) * cosLat,
                            sinLat = Math.sin(lat),
                            k = sinLat * cosDeltaPhi + x * sinDeltaPhi;
                        return [
                            Math.atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - sinLat * sinDeltaPhi) / deg2rad,
                            Math.asin(k * cosDeltaGamma + y * sinDeltaGamma) / deg2rad
                        ];
                    },
                    inverse: function (rLonLat) {
                        // Lambda (lon) unrotation
                        var lon = rLonLat[0] * deg2rad;
                        // Phi (lat) and gamma unrotation
                        var lat = rLonLat[1] * deg2rad,
                            cosLat = Math.cos(lat),
                            x = Math.cos(lon) * cosLat,
                            y = Math.sin(lon) * cosLat,
                            sinLat = Math.sin(lat),
                            k = sinLat * cosDeltaGamma - y * sinDeltaGamma;
                        return [
                            (Math.atan2(y * cosDeltaGamma + sinLat * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi) - deltaLambda) / deg2rad,
                            Math.asin(k * cosDeltaPhi - x * sinDeltaPhi) / deg2rad
                        ];
                    }
                };
            };
            // Project a lonlat coordinate position to xy. Dynamically overridden when
            // projection is set.
            Projection.prototype.forward = function (lonLat) {
                return lonLat;
            };
            // Unproject an xy chart coordinate position to lonlat. Dynamically
            // overridden when projection is set.
            Projection.prototype.inverse = function (xy) {
                return xy;
            };
            Projection.prototype.cutOnAntimeridian = function (poly, isPolygon) {
                var antimeridian = 180;
                var intersections = [];
                var polygons = [poly];
                poly.forEach(function (lonLat, i) {
                    var previousLonLat = poly[i - 1];
                    if (!i) {
                        if (!isPolygon) {
                            return;
                        }
                        // Else, wrap to beginning
                        previousLonLat = poly[poly.length - 1];
                    }
                    var lon1 = previousLonLat[0],
                        lon2 = lonLat[0];
                    if (
                    // Both points, after rotating for antimeridian, are on the far
                    // side of the Earth
                    (lon1 < -90 || lon1 > 90) &&
                        (lon2 < -90 || lon2 > 90) &&
                        // ... and on either side of the plane
                        (lon1 > 0) !== (lon2 > 0)) {
                        // Interpolate to the intersection latitude
                        var fraction = clamp((antimeridian - (lon1 + 360) % 360) /
                                ((lon2 + 360) % 360 - (lon1 + 360) % 360), 0, 1),
                            lat = (previousLonLat[1] +
                                fraction * (lonLat[1] - previousLonLat[1]));
                        intersections.push({
                            i: i,
                            lat: lat,
                            direction: lon1 < 0 ? 1 : -1,
                            previousLonLat: previousLonLat,
                            lonLat: lonLat
                        });
                    }
                });
                var polarIntersection;
                if (intersections.length) {
                    if (isPolygon) {
                        // Simplified use of the even-odd rule, if there is an odd
                        // amount of intersections between the polygon and the
                        // antimeridian, the pole is inside the polygon. Applies
                        // primarily to Antarctica.
                        if (intersections.length % 2 === 1) {
                            polarIntersection = intersections.slice().sort(function (a, b) { return Math.abs(b.lat) - Math.abs(a.lat); })[0];
                            erase(intersections, polarIntersection);
                        }
                        // Pull out slices of the polygon that is on the opposite side
                        // of the antimeridian compared to the starting point
                        var i = intersections.length - 2;
                        while (i >= 0) {
                            var index = intersections[i].i;
                            var lonPlus = wrapLon(antimeridian +
                                    intersections[i].direction * floatCorrection);
                            var lonMinus = wrapLon(antimeridian -
                                    intersections[i].direction * floatCorrection);
                            var slice = poly.splice.apply(poly,
                                __spreadArray([index,
                                    intersections[i + 1].i - index],
                                Projection.greatCircle([lonPlus,
                                intersections[i].lat],
                                [lonPlus,
                                intersections[i + 1].lat],
                                true),
                                false));
                            // Add interpolated points close to the cut
                            slice.push.apply(slice, Projection.greatCircle([lonMinus, intersections[i + 1].lat], [lonMinus, intersections[i].lat], true));
                            polygons.push(slice);
                            i -= 2;
                        }
                        // Insert dummy points close to the pole
                        if (polarIntersection) {
                            for (var i_1 = 0; i_1 < polygons.length; i_1++) {
                                var direction = polarIntersection.direction,
                                    lat = polarIntersection.lat,
                                    poly_1 = polygons[i_1],
                                    indexOf = poly_1.indexOf(polarIntersection.lonLat);
                                if (indexOf > -1) {
                                    var polarLatitude = (lat < 0 ? -1 : 1) *
                                            this.maxLatitude;
                                    var lon1 = wrapLon(antimeridian +
                                            direction * floatCorrection);
                                    var lon2 = wrapLon(antimeridian -
                                            direction * floatCorrection);
                                    var polarSegment = Projection.greatCircle([lon1,
                                        lat],
                                        [lon1,
                                        polarLatitude],
                                        true);
                                    // Circle around the pole point in order to make
                                    // polygon clipping right. Without this, Antarctica
                                    // would wrap the wrong way in an LLC projection
                                    // with parallels [30, 40].
                                    for (var lon = lon1 + 120 * direction; lon > -180 && lon < 180; lon += 120 * direction) {
                                        polarSegment.push([lon, polarLatitude]);
                                    }
                                    polarSegment.push.apply(polarSegment, Projection.greatCircle([lon2, polarLatitude], [lon2, polarIntersection.lat], true));
                                    poly_1.splice.apply(poly_1, __spreadArray([indexOf,
                                        0], polarSegment, false));
                                    break;
                                }
                            }
                        }
                        // Map lines, not closed
                    }
                    else {
                        var i = intersections.length;
                        while (i--) {
                            var index = intersections[i].i;
                            var slice = poly.splice(index,
                                poly.length, 
                                // Add interpolated point close to the cut
                                [
                                    wrapLon(antimeridian +
                                        intersections[i].direction * floatCorrection),
                                    intersections[i].lat
                                ]);
                            // Add interpolated point close to the cut
                            slice.unshift([
                                wrapLon(antimeridian -
                                    intersections[i].direction * floatCorrection),
                                intersections[i].lat
                            ]);
                            polygons.push(slice);
                        }
                    }
                }
                return polygons;
            };
            // Take a GeoJSON geometry and return a translated SVGPath
            Projection.prototype.path = function (geometry) {
                var _this = this;
                var _a = this,
                    bounds = _a.bounds,
                    def = _a.def,
                    rotator = _a.rotator;
                var antimeridian = 180;
                var path = [];
                var isPolygon = geometry.type === 'Polygon' ||
                        geometry.type === 'MultiPolygon';
                // @todo: It doesn't really have to do with whether north is
                // positive. It depends on whether the coordinates are
                // pre-projected.
                var hasGeoProjection = this.hasGeoProjection;
                // Detect whether we need to do antimeridian cutting and clipping to
                // bounds. The alternative (currently for Orthographic) is to apply a
                // clip angle.
                var projectingToPlane = !def || def.antimeridianCutting !== false;
                // We need to rotate in a separate step before applying antimeridian
                // cutting
                var preclip = projectingToPlane ? rotator : void 0;
                var postclip = projectingToPlane ? (def || this) : this;
                var boundsPolygon;
                if (bounds) {
                    boundsPolygon = [
                        [bounds.x1, bounds.y1],
                        [bounds.x2, bounds.y1],
                        [bounds.x2, bounds.y2],
                        [bounds.x1, bounds.y2]
                    ];
                }
                var addToPath = function (polygon) {
                        // Create a copy of the original coordinates. The copy applies a
                        // correction of points close to the antimeridian in order to
                        // prevent the points to be projected to the wrong side of the
                        // plane. Float errors in topojson or in the projection may cause
                        // that.
                        var poly = polygon.map(function (lonLat) {
                            if (projectingToPlane) {
                                if (preclip) {
                                    lonLat = preclip.forward(lonLat);
                            }
                            var lon = lonLat[0];
                            if (Math.abs(lon - antimeridian) < floatCorrection) {
                                if (lon < antimeridian) {
                                    lon = antimeridian - floatCorrection;
                                }
                                else {
                                    lon = antimeridian + floatCorrection;
                                }
                            }
                            lonLat = [lon, lonLat[1]];
                        }
                        return lonLat;
                    });
                    var polygons = [poly];
                    if (hasGeoProjection) {
                        // Insert great circles into long straight lines
                        Projection.insertGreatCircles(poly);
                        if (projectingToPlane) {
                            polygons = _this.cutOnAntimeridian(poly, isPolygon);
                        }
                    }
                    polygons.forEach(function (poly) {
                        if (poly.length < 2) {
                            return;
                        }
                        var movedTo = false;
                        var firstValidLonLat;
                        var lastValidLonLat;
                        var gap = false;
                        var pushToPath = function (point) {
                                if (!movedTo) {
                                    path.push(['M',
                            point[0],
                            point[1]]);
                                movedTo = true;
                            }
                            else {
                                path.push(['L', point[0], point[1]]);
                            }
                        };
                        var someOutside = false,
                            someInside = false;
                        var points = poly.map(function (lonLat) {
                                var xy = postclip.forward(lonLat);
                            if (xy.outside) {
                                someOutside = true;
                            }
                            else {
                                someInside = true;
                            }
                            // Mercator projects pole points to Infinity, and
                            // clipPolygon is not able to handle it.
                            if (xy[1] === Infinity) {
                                xy[1] = 10e9;
                            }
                            else if (xy[1] === -Infinity) {
                                xy[1] = -10e9;
                            }
                            return xy;
                        });
                        if (projectingToPlane) {
                            // Wrap around in order for pointInPolygon to work
                            if (isPolygon) {
                                points.push(points[0]);
                            }
                            if (someOutside) {
                                // All points are outside
                                if (!someInside) {
                                    return;
                                }
                                // Some inside, some outside. Clip to the bounds.
                                if (boundsPolygon) {
                                    // Polygons
                                    if (isPolygon) {
                                        points = clipPolygon(points, boundsPolygon);
                                        // Linestrings
                                    }
                                    else if (bounds) {
                                        clipLineString(points, boundsPolygon)
                                            .forEach(function (points) {
                                            movedTo = false;
                                            points.forEach(pushToPath);
                                        });
                                        return;
                                    }
                                }
                            }
                            points.forEach(pushToPath);
                            // For orthographic projection, or when a clipAngle applies
                        }
                        else {
                            for (var i = 0; i < points.length; i++) {
                                var lonLat = poly[i],
                                    point = points[i];
                                if (!point.outside) {
                                    // In order to be able to interpolate if the first
                                    // or last point is invalid (on the far side of the
                                    // globe in an orthographic projection), we need to
                                    // push the first valid point to the end of the
                                    // polygon.
                                    if (isPolygon && !firstValidLonLat) {
                                        firstValidLonLat = lonLat;
                                        poly.push(lonLat);
                                        points.push(point);
                                    }
                                    // When entering the first valid point after a gap
                                    // of invalid points, typically on the far side of
                                    // the globe in an orthographic projection.
                                    if (gap && lastValidLonLat) {
                                        // For areas, in an orthographic projection, the
                                        // great circle between two visible points will
                                        // be close to the horizon. A possible exception
                                        // may be when the two points are on opposite
                                        // sides of the globe. It that poses a problem,
                                        // we may have to rewrite this to use the small
                                        // circle related to the current lon0 and lat0.
                                        if (isPolygon && hasGeoProjection) {
                                            var greatCircle = Projection.greatCircle(lastValidLonLat,
                                                lonLat);
                                            greatCircle.forEach(function (lonLat) {
                                                return pushToPath(postclip.forward(lonLat));
                                            });
                                            // For lines, just jump over the gap
                                        }
                                        else {
                                            movedTo = false;
                                        }
                                    }
                                    pushToPath(point);
                                    lastValidLonLat = lonLat;
                                    gap = false;
                                }
                                else {
                                    gap = true;
                                }
                            }
                        }
                    });
                };
                if (geometry.type === 'LineString') {
                    addToPath(geometry.coordinates);
                }
                else if (geometry.type === 'MultiLineString') {
                    geometry.coordinates.forEach(function (c) { return addToPath(c); });
                }
                else if (geometry.type === 'Polygon') {
                    geometry.coordinates.forEach(function (c) { return addToPath(c); });
                    if (path.length) {
                        path.push(['Z']);
                    }
                }
                else if (geometry.type === 'MultiPolygon') {
                    geometry.coordinates.forEach(function (polygons) {
                        polygons.forEach(function (c) { return addToPath(c); });
                    });
                    if (path.length) {
                        path.push(['Z']);
                    }
                }
                return path;
            };
            Projection.registry = registry;
            return Projection;
        }());

        return Projection;
    });
    _registerModule(_modules, 'Maps/MapView.js', [_modules['Maps/MapViewOptionsDefault.js'], _modules['Maps/MapViewInsetsOptionsDefault.js'], _modules['Extensions/GeoJSON.js'], _modules['Core/Chart/MapChart.js'], _modules['Maps/MapUtilities.js'], _modules['Maps/Projection.js'], _modules['Core/Utilities.js']], function (defaultOptions, defaultInsetsOptions, GeoJSONModule, MapChart, MU, Projection, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var __spreadArray = (this && this.__spreadArray) || function (to,
            from,
            pack) {
                if (pack || arguments.length === 2) for (var i = 0,
            l = from.length,
            ar; i < l; i++) {
                    if (ar || !(i in from)) {
                        if (!ar) ar = Array.prototype.slice.call(from, 0,
            i);
                    ar[i] = from[i];
                }
            }
            return to.concat(ar || Array.prototype.slice.call(from));
        };
        var topo2geo = GeoJSONModule.topo2geo;
        var maps = MapChart.maps;
        var boundsFromPath = MU.boundsFromPath,
            pointInPolygon = MU.pointInPolygon;
        var addEvent = U.addEvent,
            clamp = U.clamp,
            fireEvent = U.fireEvent,
            isArray = U.isArray,
            isNumber = U.isNumber,
            isObject = U.isObject,
            isString = U.isString,
            merge = U.merge,
            pick = U.pick,
            relativeLength = U.relativeLength;
        /**
         * The world size in terms of 10k meters in the Web Mercator projection, to
         * match a 256 square tile to zoom level 0.
         * @private
         */
        var worldSize = 400.979322;
        var tileSize = 256;
        // Compute the zoom from given bounds and the size of the playing field. Used in
        // two places, hence the local function.
        var zoomFromBounds = function (b,
            playingField) {
                var width = playingField.width,
            height = playingField.height,
            scaleToField = Math.max((b.x2 - b.x1) / (width / tileSize), (b.y2 - b.y1) / (height / tileSize));
            return Math.log(worldSize / scaleToField) / Math.log(2);
        };
        /*
        const mergeCollections = <
            T extends Array<AnyRecord|undefined>
        >(a: T, b: T): T => {
            b.forEach((newer, i): void => {
                // Only merge by id supported for now. We may consider later to support
                // more complex rules like those of `Chart.update` with `oneToOne`, but
                // it is probably not needed. Existing insets can be disabled by
                // overwriting the `geoBounds` with empty data.
                if (newer && isString(newer.id)) {
                    const older = U.find(
                        a,
                        (aItem): boolean => (aItem && aItem.id) === newer.id
                    );
                    if (older) {
                        const aIndex = a.indexOf(older);
                        a[aIndex] = merge(older, newer);
                    }
                }
            });
            return a;
        };
        */
        /**
         * The map view handles zooming and centering on the map, and various
         * client-side projection capabilities.
         *
         * On a chart instance of `MapChart`, the map view is available as `chart.mapView`.
         *
         * @class
         * @name Highcharts.MapView
         *
         * @param {Highcharts.MapChart} chart
         *        The MapChart instance
         * @param {Highcharts.MapViewOptions} options
         *        MapView options
         */
        var MapView = /** @class */ (function () {
                function MapView(chart, options) {
                    var _this = this;
                this.allowTransformAnimation = true;
                this.insets = [];
                this.padding = [0, 0, 0, 0];
                this.eventsToUnbind = [];
                var recommendedMapView;
                var recommendedProjection;
                if (!(this instanceof MapViewInset)) {
                    // Handle the global map and series-level mapData
                    var geoMaps = __spreadArray([
                            chart.options.chart.map
                        ], (chart.options.series || []).map(function (s) { return s.mapData; }),
                        true).map(function (mapData) { return _this.getGeoMap(mapData); });
                    var allGeoBounds_1 = [];
                    geoMaps.forEach(function (geoMap) {
                        if (geoMap) {
                            // Use the first geo map as main
                            if (!recommendedMapView) {
                                recommendedMapView = geoMap['hc-recommended-mapview'];
                            }
                            // Combine the bounding boxes of all loaded maps
                            if (geoMap.bbox) {
                                var _a = geoMap.bbox,
                                    x1 = _a[0],
                                    y1 = _a[1],
                                    x2 = _a[2],
                                    y2 = _a[3];
                                allGeoBounds_1.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
                            }
                        }
                    });
                    // Get the composite bounds
                    var geoBounds = (allGeoBounds_1.length &&
                            MapView.compositeBounds(allGeoBounds_1));
                    // Provide a best-guess recommended projection if not set in the map
                    // or in user options
                    if (geoBounds) {
                        var x1 = geoBounds.x1,
                            y1 = geoBounds.y1,
                            x2 = geoBounds.x2,
                            y2 = geoBounds.y2;
                        recommendedProjection = (x2 - x1 > 180 && y2 - y1 > 90) ?
                            // Wide angle, go for the world view
                            {
                                name: 'EqualEarth'
                            } :
                            // Narrower angle, use a projection better suited for local
                            // view
                            {
                                name: 'LambertConformalConic',
                                parallels: [y1, y2],
                                rotation: [-(x1 + x2) / 2]
                            };
                    }
                    // Register the main geo map (from options.chart.map) if set
                    this.geoMap = geoMaps[0];
                }
                this.userOptions = options || {};
                var o = merge(defaultOptions, { projection: recommendedProjection },
                    recommendedMapView,
                    options);
                // Merge the inset collections by id, or index if id missing
                var recInsets = recommendedMapView && recommendedMapView.insets,
                    optInsets = options && options.insets;
                if (recInsets && optInsets) {
                    o.insets = MapView.mergeInsets(recInsets, optInsets);
                }
                this.chart = chart;
                /**
                 * The current center of the view in terms of `[longitude, latitude]`.
                 * @name Highcharts.MapView#center
                 * @readonly
                 * @type {LonLatArray}
                 */
                this.center = o.center;
                this.options = o;
                this.projection = new Projection(o.projection);
                // Initialize with full plot box so we don't have to check for undefined
                // every time we use it
                this.playingField = chart.plotBox;
                /**
                 * The current zoom level of the view.
                 * @name Highcharts.MapView#zoom
                 * @readonly
                 * @type {number}
                 */
                this.zoom = o.zoom || 0;
                // Create the insets
                this.createInsets();
                // Initialize and respond to chart size changes
                this.eventsToUnbind.push(addEvent(chart, 'afterSetChartSize', function () {
                    _this.playingField = _this.getField();
                    if (_this.minZoom === void 0 || // When initializing the chart
                        _this.minZoom === _this.zoom // When resizing the chart
                    ) {
                        _this.fitToBounds(void 0, void 0, false);
                        if (
                        // Set zoom only when initializing the chart
                        // (do not overwrite when zooming in/out, #17082)
                        !_this.chart.hasRendered &&
                            isNumber(_this.userOptions.zoom)) {
                            _this.zoom = _this.userOptions.zoom;
                        }
                        if (_this.userOptions.center) {
                            merge(true, _this.center, _this.userOptions.center);
                        }
                    }
                }));
                this.setUpEvents();
            }
            // Merge two collections of insets by the id
            MapView.mergeInsets = function (a, b) {
                var toObject = function (insets) {
                        var ob = {};
                    insets.forEach(function (inset, i) {
                        ob[inset && inset.id || "i".concat(i)] = inset;
                    });
                    return ob;
                };
                var insetsObj = merge(toObject(a),
                    toObject(b)),
                    insets = Object
                        .keys(insetsObj)
                        .map(function (key) { return insetsObj[key]; });
                return insets;
            };
            // Create MapViewInset instances from insets options
            MapView.prototype.createInsets = function () {
                var _this = this;
                var options = this.options,
                    insets = options.insets;
                if (insets) {
                    insets.forEach(function (item) {
                        var inset = new MapViewInset(_this,
                            merge(options.insetOptions,
                            item));
                        _this.insets.push(inset);
                    });
                }
            };
            /**
             * Fit the view to given bounds
             *
             * @function Highcharts.MapView#fitToBounds
             * @param {Object} bounds
             *        Bounds in terms of projected units given as  `{ x1, y1, x2, y2 }`.
             *        If not set, fit to the bounds of the current data set
             * @param {number|string} [padding=0]
             *        Padding inside the bounds. A number signifies pixels, while a
             *        percentage string (like `5%`) can be used as a fraction of the
             *        plot area size.
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart immediately
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        What animation to use for redraw
             */
            MapView.prototype.fitToBounds = function (bounds, padding, redraw, animation) {
                if (redraw === void 0) { redraw = true; }
                var b = bounds || this.getProjectedBounds();
                if (b) {
                    var pad = pick(padding,
                        bounds ? 0 : this.options.padding),
                        fullField = this.getField(false),
                        padArr = isArray(pad) ? pad : [pad,
                        pad,
                        pad,
                        pad];
                    this.padding = [
                        relativeLength(padArr[0], fullField.height),
                        relativeLength(padArr[1], fullField.width),
                        relativeLength(padArr[2], fullField.height),
                        relativeLength(padArr[3], fullField.width)
                    ];
                    // Apply the playing field, corrected with padding
                    this.playingField = this.getField();
                    var zoom = zoomFromBounds(b,
                        this.playingField);
                    // Reset minZoom when fitting to natural bounds
                    if (!bounds) {
                        this.minZoom = zoom;
                    }
                    var center = this.projection.inverse([
                            (b.x2 + b.x1) / 2,
                            (b.y2 + b.y1) / 2
                        ]);
                    this.setView(center, zoom, redraw, animation);
                }
            };
            MapView.prototype.getField = function (padded) {
                if (padded === void 0) { padded = true; }
                var padding = padded ? this.padding : [0, 0, 0, 0];
                return {
                    x: padding[3],
                    y: padding[0],
                    width: this.chart.plotWidth - padding[1] - padding[3],
                    height: this.chart.plotHeight - padding[0] - padding[2]
                };
            };
            MapView.prototype.getGeoMap = function (map) {
                if (isString(map)) {
                    if (maps[map] && maps[map].type === 'Topology') {
                        return topo2geo(maps[map]);
                    }
                    return maps[map];
                }
                if (isObject(map, true)) {
                    if (map.type === 'FeatureCollection') {
                        return map;
                    }
                    if (map.type === 'Topology') {
                        return topo2geo(map);
                    }
                }
            };
            MapView.prototype.getMapBBox = function () {
                var bounds = this.getProjectedBounds(),
                    scale = this.getScale();
                if (bounds) {
                    var padding = this.padding,
                        p1 = this.projectedUnitsToPixels({
                            x: bounds.x1,
                            y: bounds.y2
                        }),
                        width = ((bounds.x2 - bounds.x1) * scale +
                            padding[1] + padding[3]),
                        height = ((bounds.y2 - bounds.y1) * scale +
                            padding[0] + padding[2]);
                    return {
                        width: width,
                        height: height,
                        x: p1.x - padding[3],
                        y: p1.y - padding[0]
                    };
                }
            };
            MapView.prototype.getProjectedBounds = function () {
                var projection = this.projection;
                var allBounds = this.chart.series.reduce(function (acc,
                    s) {
                        var bounds = s.getProjectedBounds && s.getProjectedBounds();
                    if (bounds &&
                        s.options.affectsMapView !== false) {
                        acc.push(bounds);
                    }
                    return acc;
                }, []);
                // The bounds option
                var fitToGeometry = this.options.fitToGeometry;
                if (fitToGeometry) {
                    if (!this.fitToGeometryCache) {
                        if (fitToGeometry.type === 'MultiPoint') {
                            var positions = fitToGeometry.coordinates
                                    .map(function (lonLat) {
                                    return projection.forward(lonLat);
                            }), xs = positions.map(function (pos) { return pos[0]; }), ys = positions.map(function (pos) { return pos[1]; });
                            this.fitToGeometryCache = {
                                x1: Math.min.apply(0, xs),
                                x2: Math.max.apply(0, xs),
                                y1: Math.min.apply(0, ys),
                                y2: Math.max.apply(0, ys)
                            };
                        }
                        else {
                            this.fitToGeometryCache = boundsFromPath(projection.path(fitToGeometry));
                        }
                    }
                    return this.fitToGeometryCache;
                }
                return this.projection.bounds || MapView.compositeBounds(allBounds);
            };
            MapView.prototype.getScale = function () {
                // A zoom of 0 means the world (360x360 degrees) fits in a 256x256 px
                // tile
                return (tileSize / worldSize) * Math.pow(2, this.zoom);
            };
            // Calculate the SVG transform to be applied to series groups
            MapView.prototype.getSVGTransform = function () {
                var _a = this.playingField,
                    x = _a.x,
                    y = _a.y,
                    width = _a.width,
                    height = _a.height,
                    projectedCenter = this.projection.forward(this.center),
                    flipFactor = this.projection.hasCoordinates ? -1 : 1,
                    scaleX = this.getScale(),
                    scaleY = scaleX * flipFactor,
                    translateX = x + width / 2 - projectedCenter[0] * scaleX,
                    translateY = y + height / 2 - projectedCenter[1] * scaleY;
                return { scaleX: scaleX, scaleY: scaleY, translateX: translateX, translateY: translateY };
            };
            /**
             * Convert map coordinates in longitude/latitude to pixels
             *
             * @function Highcharts.MapView#lonLatToPixels
             * @since 10.0.0
             * @param  {Highcharts.MapLonLatObject} lonLat
             *         The map coordinates
             * @return {Highcharts.PositionObject|undefined}
             *         The pixel position
             */
            MapView.prototype.lonLatToPixels = function (lonLat) {
                var pos = this.lonLatToProjectedUnits(lonLat);
                if (pos) {
                    return this.projectedUnitsToPixels(pos);
                }
            };
            /**
             * Get projected units from longitude/latitude. Insets are accounted for.
             * Returns an object with x and y values corresponding to positions on the
             * projected plane.
             *
             * @requires modules/map
             *
             * @function Highcharts.MapView#lonLatToProjectedUnits
             *
             * @since 10.0.0
             * @sample maps/series/latlon-to-point/ Find a point from lon/lat
             *
             * @param {Highcharts.MapLonLatObject} lonLat Coordinates.
             *
             * @return {Highcharts.ProjectedXY} X and Y coordinates in terms of
             *      projected values
             */
            MapView.prototype.lonLatToProjectedUnits = function (lonLat) {
                var chart = this.chart,
                    mapTransforms = chart.mapTransforms;
                // Legacy, built-in transforms
                if (mapTransforms) {
                    for (var transform in mapTransforms) {
                        if (Object.hasOwnProperty.call(mapTransforms, transform) &&
                            mapTransforms[transform].hitZone) {
                            var coords = chart.transformFromLatLon(lonLat,
                                mapTransforms[transform]);
                            if (coords && pointInPolygon(coords, mapTransforms[transform].hitZone.coordinates[0])) {
                                return coords;
                            }
                        }
                    }
                    return chart.transformFromLatLon(lonLat, mapTransforms['default'] // eslint-disable-line dot-notation
                    );
                }
                // Handle insets
                for (var _i = 0, _a = this.insets; _i < _a.length; _i++) {
                    var inset = _a[_i];
                    if (inset.options.geoBounds &&
                        pointInPolygon({ x: lonLat.lon, y: lonLat.lat }, inset.options.geoBounds.coordinates[0])) {
                        var insetProjectedPoint = inset.projection.forward([lonLat.lon,
                            lonLat.lat]),
                            pxPoint = inset.projectedUnitsToPixels({ x: insetProjectedPoint[0],
                            y: insetProjectedPoint[1] });
                        return this.pixelsToProjectedUnits(pxPoint);
                    }
                }
                var point = this.projection.forward([lonLat.lon,
                    lonLat.lat]);
                if (!point.outside) {
                    return { x: point[0], y: point[1] };
                }
            };
            /**
             * Calculate longitude/latitude values for a point or position. Returns an
             * object with the numeric properties `lon` and `lat`.
             *
             * @requires modules/map
             *
             * @function Highcharts.MapView#projectedUnitsToLonLat
             *
             * @since 10.0.0
             *
             * @sample maps/demo/latlon-advanced/ Advanced lat/lon demo
             *
             * @param {Highcharts.Point|Highcharts.ProjectedXY} point
             *        A `Point` instance or anything containing `x` and `y` properties
             *        with numeric values.
             *
             * @return {Highcharts.MapLonLatObject|undefined} An object with `lat` and
             *         `lon` properties.
             */
            MapView.prototype.projectedUnitsToLonLat = function (point) {
                var chart = this.chart,
                    mapTransforms = chart.mapTransforms;
                // Legacy, built-in transforms
                if (mapTransforms) {
                    for (var transform in mapTransforms) {
                        if (Object.hasOwnProperty.call(mapTransforms, transform) &&
                            mapTransforms[transform].hitZone &&
                            pointInPolygon(point, mapTransforms[transform].hitZone.coordinates[0])) {
                            return chart.transformToLatLon(point, mapTransforms[transform]);
                        }
                    }
                    return chart.transformToLatLon(point, mapTransforms['default'] // eslint-disable-line dot-notation
                    );
                }
                var pxPoint = this.projectedUnitsToPixels(point);
                for (var _i = 0, _a = this.insets; _i < _a.length; _i++) {
                    var inset = _a[_i];
                    if (inset.hitZone &&
                        pointInPolygon(pxPoint, inset.hitZone.coordinates[0])) {
                        var insetProjectedPoint = inset
                                .pixelsToProjectedUnits(pxPoint),
                            coordinates_1 = inset.projection.inverse([insetProjectedPoint.x,
                            insetProjectedPoint.y]);
                        return { lon: coordinates_1[0], lat: coordinates_1[1] };
                    }
                }
                var coordinates = this.projection.inverse([point.x,
                    point.y]);
                return { lon: coordinates[0], lat: coordinates[1] };
            };
            MapView.prototype.redraw = function (animation) {
                this.chart.series.forEach(function (s) {
                    if (s.useMapGeometry) {
                        s.isDirty = true;
                    }
                });
                this.chart.redraw(animation);
            };
            /**
             * Set the view to given center and zoom values.
             * @function Highcharts.MapView#setView
             * @param {Highcharts.LonLatArray|undefined} center
             *        The center point
             * @param {number} zoom
             *        The zoom level
             * @param {boolean} [redraw=true]
             *        Whether to redraw immediately
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        Animation options for the redraw
             *
             * @sample maps/mapview/setview
             *        Set the view programmatically
             */
            MapView.prototype.setView = function (center, zoom, redraw, animation) {
                if (redraw === void 0) { redraw = true; }
                if (center) {
                    this.center = center;
                }
                if (typeof zoom === 'number') {
                    if (typeof this.minZoom === 'number') {
                        zoom = Math.max(zoom, this.minZoom);
                    }
                    if (typeof this.options.maxZoom === 'number') {
                        zoom = Math.min(zoom, this.options.maxZoom);
                    }
                    // Use isNumber to prevent Infinity (#17205)
                    if (isNumber(zoom)) {
                        this.zoom = zoom;
                    }
                }
                var bounds = this.getProjectedBounds();
                if (bounds) {
                    var projectedCenter = this.projection.forward(this.center),
                        _a = this.playingField,
                        x = _a.x,
                        y = _a.y,
                        width = _a.width,
                        height = _a.height,
                        scale = this.getScale(),
                        bottomLeft = this.projectedUnitsToPixels({
                            x: bounds.x1,
                            y: bounds.y1
                        }),
                        topRight = this.projectedUnitsToPixels({
                            x: bounds.x2,
                            y: bounds.y2
                        }),
                        boundsCenterProjected = [
                            (bounds.x1 + bounds.x2) / 2,
                            (bounds.y1 + bounds.y2) / 2
                        ],
                        isDrilling = this.chart.series.some(function (series) {
                            return series.isDrilling;
                    });
                    if (!isDrilling) {
                        // Constrain to data bounds
                        // Pixel coordinate system is reversed vs projected
                        var x1 = bottomLeft.x,
                            y1 = topRight.y,
                            x2 = topRight.x,
                            y2 = bottomLeft.y;
                        // Map smaller than plot area, center it
                        if (x2 - x1 < width) {
                            projectedCenter[0] = boundsCenterProjected[0];
                            // Off west
                        }
                        else if (x1 < x && x2 < x + width) {
                            // Adjust eastwards
                            projectedCenter[0] +=
                                Math.max(x1 - x, x2 - width - x) / scale;
                            // Off east
                        }
                        else if (x2 > x + width && x1 > x) {
                            // Adjust westwards
                            projectedCenter[0] +=
                                Math.min(x2 - width - x, x1 - x) / scale;
                        }
                        // Map smaller than plot area, center it
                        if (y2 - y1 < height) {
                            projectedCenter[1] = boundsCenterProjected[1];
                            // Off north
                        }
                        else if (y1 < y && y2 < y + height) {
                            // Adjust southwards
                            projectedCenter[1] -=
                                Math.max(y1 - y, y2 - height - y) / scale;
                            // Off south
                        }
                        else if (y2 > y + height && y1 > y) {
                            // Adjust northwards
                            projectedCenter[1] -=
                                Math.min(y2 - height - y, y1 - y) / scale;
                        }
                        this.center = this.projection.inverse(projectedCenter);
                    }
                    this.insets.forEach(function (inset) {
                        if (inset.options.field) {
                            inset.hitZone = inset.getHitZone();
                            inset.playingField = inset.getField();
                        }
                    });
                    this.render();
                }
                fireEvent(this, 'afterSetView');
                if (redraw) {
                    this.redraw(animation);
                }
            };
            /**
             * Convert projected units to pixel position
             *
             * @function Highcharts.MapView#projectedUnitsToPixels
             * @param {Highcharts.PositionObject} pos
             *        The position in projected units
             * @return {Highcharts.PositionObject} The position in pixels
             */
            MapView.prototype.projectedUnitsToPixels = function (pos) {
                var scale = this.getScale(),
                    projectedCenter = this.projection.forward(this.center),
                    field = this.playingField,
                    centerPxX = field.x + field.width / 2,
                    centerPxY = field.y + field.height / 2;
                var x = centerPxX - scale * (projectedCenter[0] - pos.x);
                var y = centerPxY + scale * (projectedCenter[1] - pos.y);
                return { x: x, y: y };
            };
            /**
             * Convert pixel position to longitude and latitude.
             *
             * @function Highcharts.MapView#pixelsToLonLat
             * @since 10.0.0
             * @param  {Highcharts.PositionObject} pos
             *         The position in pixels
             * @return {Highcharts.MapLonLatObject|undefined}
             *         The map coordinates
             */
            MapView.prototype.pixelsToLonLat = function (pos) {
                return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(pos));
            };
            /**
             * Convert pixel position to projected units
             *
             * @function Highcharts.MapView#pixelsToProjectedUnits
             * @param {Highcharts.PositionObject} pos
             *        The position in pixels
             * @return {Highcharts.PositionObject} The position in projected units
             */
            MapView.prototype.pixelsToProjectedUnits = function (pos) {
                var x = pos.x,
                    y = pos.y,
                    scale = this.getScale(),
                    projectedCenter = this.projection.forward(this.center),
                    field = this.playingField,
                    centerPxX = field.x + field.width / 2,
                    centerPxY = field.y + field.height / 2;
                var projectedX = projectedCenter[0] + (x - centerPxX) / scale;
                var projectedY = projectedCenter[1] - (y - centerPxY) / scale;
                return { x: projectedX, y: projectedY };
            };
            MapView.prototype.setUpEvents = function () {
                var _this = this;
                var chart = this.chart;
                // Set up panning for maps. In orthographic projections the globe will
                // rotate, otherwise adjust the map center.
                var mouseDownCenterProjected;
                var mouseDownKey;
                var mouseDownRotation;
                var onPan = function (e) {
                        var pinchDown = chart.pointer.pinchDown,
                    projection = _this.projection;
                    var mouseDownX = chart.mouseDownX,
                        mouseDownY = chart.mouseDownY;
                    if (pinchDown.length === 1) {
                        mouseDownX = pinchDown[0].chartX;
                        mouseDownY = pinchDown[0].chartY;
                    }
                    if (typeof mouseDownX === 'number' &&
                        typeof mouseDownY === 'number') {
                        var key = "" + mouseDownX + ",".concat(mouseDownY), _a = e.originalEvent, chartX = _a.chartX, chartY = _a.chartY;
                        // Reset starting position
                        if (key !== mouseDownKey) {
                            mouseDownKey = key;
                            mouseDownCenterProjected = _this.projection
                                .forward(_this.center);
                            mouseDownRotation = (_this.projection.options.rotation || [0, 0]).slice();
                        }
                        // Get the natural zoom level of the projection itself when
                        // zoomed to view the full world
                        var worldBounds = projection.def && projection.def.bounds,
                            worldZoom = (worldBounds &&
                                zoomFromBounds(worldBounds,
                            _this.playingField)) || -Infinity;
                        // Panning rotates the globe
                        if (projection.options.name === 'Orthographic' &&
                            // ... but don't rotate if we're loading only a part of the
                            // world
                            (_this.minZoom || Infinity) < worldZoom * 1.3) {
                            // Empirical ratio where the globe rotates roughly the same
                            // speed as moving the pointer across the center of the
                            // projection
                            var ratio = 440 / (_this.getScale() * Math.min(chart.plotWidth,
                                chart.plotHeight));
                            if (mouseDownRotation) {
                                var lon = (mouseDownX - chartX) * ratio -
                                        mouseDownRotation[0],
                                    lat = clamp(-mouseDownRotation[1] -
                                        (mouseDownY - chartY) * ratio, -80, 80),
                                    zoom = _this.zoom;
                                _this.update({
                                    projection: {
                                        rotation: [-lon, -lat]
                                    }
                                }, false);
                                _this.fitToBounds(void 0, void 0, false);
                                _this.zoom = zoom;
                                chart.redraw(false);
                            }
                            // #17925 Skip NaN values
                        }
                        else if (isNumber(chartX) && isNumber(chartY)) {
                            // #17238
                            var scale = _this.getScale(),
                                flipFactor = _this.projection.hasCoordinates ? 1 : -1;
                            var newCenter = _this.projection.inverse([
                                    mouseDownCenterProjected[0] +
                                        (mouseDownX - chartX) / scale,
                                    mouseDownCenterProjected[1] -
                                        (mouseDownY - chartY) / scale * flipFactor
                                ]);
                            _this.setView(newCenter, void 0, true, false);
                        }
                        e.preventDefault();
                    }
                };
                addEvent(chart, 'pan', onPan);
                addEvent(chart, 'touchpan', onPan);
                // Perform the map zoom by selection
                addEvent(chart, 'selection', function (evt) {
                    // Zoom in
                    if (!evt.resetSelection) {
                        var x = evt.x - chart.plotLeft;
                        var y = evt.y - chart.plotTop;
                        var _a = _this.pixelsToProjectedUnits({ x: x,
                            y: y }),
                            y1 = _a.y,
                            x1 = _a.x;
                        var _b = _this.pixelsToProjectedUnits({ x: x + evt.width,
                            y: y + evt.height }),
                            y2 = _b.y,
                            x2 = _b.x;
                        _this.fitToBounds({ x1: x1, y1: y1, x2: x2, y2: y2 }, void 0, true, evt.originalEvent.touches ?
                            // On touch zoom, don't animate, since we're already in
                            // transformed zoom preview
                            false :
                            // On mouse zoom, obey the chart-level animation
                            void 0);
                        // Only for mouse. Touch users can pinch out.
                        if (!/^touch/.test((evt.originalEvent.type))) {
                            chart.showResetZoom();
                        }
                        evt.preventDefault();
                        // Reset zoom
                    }
                    else {
                        _this.zoomBy();
                    }
                });
            };
            MapView.prototype.render = function () {
                // We need a group for the insets
                if (!this.group) {
                    this.group = this.chart.renderer.g('map-view')
                        .attr({ zIndex: 4 })
                        .add();
                }
            };
            /**
             * Update the view with given options
             *
             * @function Highcharts.MapView#update
             *
             * @param {Partial<Highcharts.MapViewOptions>} options
             *        The new map view options to apply
             * @param {boolean} [redraw=true]
             *        Whether to redraw immediately
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        The animation to apply to a the redraw
             */
            MapView.prototype.update = function (options, redraw, animation) {
                if (redraw === void 0) { redraw = true; }
                var newProjection = options.projection;
                var isDirtyProjection = newProjection && ((Projection.toString(newProjection) !==
                        Projection.toString(this.options.projection))),
                    isDirtyInsets = false;
                merge(true, this.userOptions, options);
                merge(true, this.options, options);
                // If anything changed with the insets, destroy them all and create
                // again below
                if ('insets' in options) {
                    this.insets.forEach(function (inset) { return inset.destroy(); });
                    this.insets.length = 0;
                    isDirtyInsets = true;
                }
                if (isDirtyProjection || 'fitToGeometry' in options) {
                    delete this.fitToGeometryCache;
                }
                if (isDirtyProjection || isDirtyInsets) {
                    this.chart.series.forEach(function (series) {
                        var groups = series.transformGroups;
                        if (series.clearBounds) {
                            series.clearBounds();
                        }
                        series.isDirty = true;
                        series.isDirtyData = true;
                        // Destroy inset transform groups
                        if (isDirtyInsets && groups) {
                            while (groups.length > 1) {
                                var group = groups.pop();
                                if (group) {
                                    group.destroy();
                                }
                            }
                        }
                    });
                    if (isDirtyProjection) {
                        this.projection = new Projection(this.options.projection);
                    }
                    // Create new insets
                    if (isDirtyInsets) {
                        this.createInsets();
                    }
                    // Fit to natural bounds if center/zoom are not explicitly given
                    if (!options.center &&
                        // do not fire fitToBounds if user don't want to set zoom
                        Object.hasOwnProperty.call(options, 'zoom') &&
                        !isNumber(options.zoom)) {
                        this.fitToBounds(void 0, void 0, false);
                    }
                }
                if (options.center || isNumber(options.zoom)) {
                    this.setView(this.options.center, options.zoom, false);
                }
                else if ('fitToGeometry' in options) {
                    this.fitToBounds(void 0, void 0, false);
                }
                if (redraw) {
                    this.chart.redraw(animation);
                }
            };
            /**
             * Zoom the map view by a given number
             *
             * @function Highcharts.MapView#zoomBy
             *
             * @param {number|undefined} [howMuch]
             *        The amount of zoom to apply. 1 zooms in on half the current view,
             *        -1 zooms out. Pass `undefined` to zoom to the full bounds of the
             *        map.
             * @param {Highcharts.LonLatArray} [coords]
             *        Optional map coordinates to keep fixed
             * @param {Array<number>} [chartCoords]
             *        Optional chart coordinates to keep fixed, in pixels
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
             *        The animation to apply to a the redraw
             */
            MapView.prototype.zoomBy = function (howMuch, coords, chartCoords, animation) {
                var chart = this.chart;
                var projectedCenter = this.projection.forward(this.center);
                // let { x, y } = coords || {};
                var _a = coords ? this.projection.forward(coords) : [],
                    x = _a[0],
                    y = _a[1];
                if (typeof howMuch === 'number') {
                    var zoom = this.zoom + howMuch;
                    var center = void 0;
                    // Keep chartX and chartY stationary - convert to lat and lng
                    if (chartCoords) {
                        var chartX = chartCoords[0],
                            chartY = chartCoords[1];
                        var scale = this.getScale();
                        var offsetX = chartX - chart.plotLeft - chart.plotWidth / 2;
                        var offsetY = chartY - chart.plotTop - chart.plotHeight / 2;
                        x = projectedCenter[0] + offsetX / scale;
                        y = projectedCenter[1] + offsetY / scale;
                    }
                    // Keep lon and lat stationary by adjusting the center
                    if (typeof x === 'number' && typeof y === 'number') {
                        var scale = 1 - Math.pow(2,
                            this.zoom) / Math.pow(2,
                            zoom);
                        // const projectedCenter = this.projection.forward(this.center);
                        var offsetX = projectedCenter[0] - x;
                        var offsetY = projectedCenter[1] - y;
                        projectedCenter[0] -= offsetX * scale;
                        projectedCenter[1] += offsetY * scale;
                        center = this.projection.inverse(projectedCenter);
                    }
                    this.setView(center, zoom, void 0, animation);
                    // Undefined howMuch => reset zoom
                }
                else {
                    this.fitToBounds(void 0, void 0, void 0, animation);
                }
            };
            /* *
             * Return the composite bounding box of a collection of bounding boxes
             */
            MapView.compositeBounds = function (arrayOfBounds) {
                if (arrayOfBounds.length) {
                    return arrayOfBounds
                        .slice(1)
                        .reduce(function (acc, cur) {
                        acc.x1 = Math.min(acc.x1, cur.x1);
                        acc.y1 = Math.min(acc.y1, cur.y1);
                        acc.x2 = Math.max(acc.x2, cur.x2);
                        acc.y2 = Math.max(acc.y2, cur.y2);
                        return acc;
                    }, merge(arrayOfBounds[0]));
                }
                return;
            };
            return MapView;
        }());
        // Putting this in the same file due to circular dependency with MapView
        var MapViewInset = /** @class */ (function (_super) {
                __extends(MapViewInset, _super);
            function MapViewInset(mapView, options) {
                var _this = _super.call(this,
                    mapView.chart,
                    options) || this;
                _this.id = options.id;
                _this.mapView = mapView;
                _this.options = merge(defaultInsetsOptions, options);
                _this.allBounds = [];
                if (_this.options.geoBounds) {
                    // The path in projected units in the map view's main projection.
                    // This is used for hit testing where the points should render.
                    var path = mapView.projection.path(_this.options.geoBounds);
                    _this.geoBoundsProjectedBox = boundsFromPath(path);
                    _this.geoBoundsProjectedPolygon = path.map(function (segment) { return [
                        segment[1] || 0,
                        segment[2] || 0
                    ]; });
                }
                return _this;
            }
            // Get the playing field in pixels
            MapViewInset.prototype.getField = function (padded) {
                if (padded === void 0) { padded = true; }
                var hitZone = this.hitZone;
                if (hitZone) {
                    var padding = padded ? this.padding : [0, 0, 0, 0],
                        polygon = hitZone.coordinates[0],
                        xs = polygon.map(function (xy) { return xy[0]; }),
                        ys = polygon.map(function (xy) { return xy[1]; }),
                        x = Math.min.apply(0,
                        xs) + padding[3],
                        x2 = Math.max.apply(0,
                        xs) - padding[1],
                        y = Math.min.apply(0,
                        ys) + padding[0],
                        y2 = Math.max.apply(0,
                        ys) - padding[2];
                    if (isNumber(x) && isNumber(y)) {
                        return {
                            x: x,
                            y: y,
                            width: x2 - x,
                            height: y2 - y
                        };
                    }
                }
                // Fall back to plot area
                return _super.prototype.getField.call(this, padded);
            };
            // Get the hit zone in pixels
            MapViewInset.prototype.getHitZone = function () {
                var _a = this,
                    chart = _a.chart,
                    mapView = _a.mapView,
                    options = _a.options,
                    coordinates = (options.field || {}).coordinates;
                if (coordinates) {
                    var polygon = coordinates[0];
                    if (options.units === 'percent') {
                        var relativeTo_1 = options.relativeTo === 'mapBoundingBox' &&
                                mapView.getMapBBox() ||
                                merge(chart.plotBox, { x: 0,
                            y: 0 });
                        polygon = polygon.map(function (xy) { return [
                            relativeLength("" + xy[0] + "%", relativeTo_1.width, relativeTo_1.x),
                            relativeLength("" + xy[1] + "%", relativeTo_1.height, relativeTo_1.y)
                        ]; });
                    }
                    return {
                        type: 'Polygon',
                        coordinates: [polygon]
                    };
                }
            };
            MapViewInset.prototype.getProjectedBounds = function () {
                return MapView.compositeBounds(this.allBounds);
            };
            // Determine whether a point on the main projected plane is inside the
            // geoBounds of the inset.
            MapViewInset.prototype.isInside = function (point) {
                var _a = this,
                    geoBoundsProjectedBox = _a.geoBoundsProjectedBox,
                    geoBoundsProjectedPolygon = _a.geoBoundsProjectedPolygon;
                return Boolean(
                // First we do a pre-pass to check whether the test point is inside
                // the rectangular bounding box of the polygon. This is less
                // expensive and will rule out most cases.
                geoBoundsProjectedBox &&
                    point.x >= geoBoundsProjectedBox.x1 &&
                    point.x <= geoBoundsProjectedBox.x2 &&
                    point.y >= geoBoundsProjectedBox.y1 &&
                    point.y <= geoBoundsProjectedBox.y2 &&
                    // Next, do the more expensive check whether the point is inside the
                    // polygon itself.
                    geoBoundsProjectedPolygon &&
                    pointInPolygon(point, geoBoundsProjectedPolygon));
            };
            // Render the map view inset with the border path
            MapViewInset.prototype.render = function () {
                var _a = this,
                    chart = _a.chart,
                    mapView = _a.mapView,
                    options = _a.options,
                    borderPath = options.borderPath || options.field;
                if (borderPath && mapView.group) {
                    var animate = true;
                    if (!this.border) {
                        this.border = chart.renderer
                            .path()
                            .addClass('highcharts-mapview-inset-border')
                            .add(mapView.group);
                        animate = false;
                    }
                    if (!chart.styledMode) {
                        this.border.attr({
                            stroke: options.borderColor,
                            'stroke-width': options.borderWidth
                        });
                    }
                    var crisp_1 = Math.round(this.border.strokeWidth()) % 2 / 2,
                        field_1 = (options.relativeTo === 'mapBoundingBox' &&
                            mapView.getMapBBox()) || mapView.playingField;
                    var d = (borderPath.coordinates || []).reduce(function (d,
                        lineString) {
                            return lineString.reduce(function (d,
                        point,
                        i) {
                                var x = point[0],
                        y = point[1];
                            if (options.units === 'percent') {
                                x = chart.plotLeft + relativeLength("" + x + "%", field_1.width, field_1.x);
                                y = chart.plotTop + relativeLength("" + y + "%", field_1.height, field_1.y);
                            }
                            x = Math.floor(x) + crisp_1;
                            y = Math.floor(y) + crisp_1;
                            d.push(i === 0 ? ['M', x, y] : ['L', x, y]);
                            return d;
                        }, d);
                    }, []);
                    // Apply the border path
                    this.border[animate ? 'animate' : 'attr']({ d: d });
                }
            };
            MapViewInset.prototype.destroy = function () {
                if (this.border) {
                    this.border = this.border.destroy();
                }
                this.eventsToUnbind.forEach(function (f) { return f(); });
            };
            // No chart-level events for insets
            MapViewInset.prototype.setUpEvents = function () { };
            return MapViewInset;
        }(MapView));
        // Initialize the MapView after initialization, but before firstRender
        addEvent(MapChart, 'afterInit', function () {
            /**
             * The map view handles zooming and centering on the map, and various
             * client-side projection capabilities.
             *
             * @name Highcharts.MapChart#mapView
             * @type {Highcharts.MapView|undefined}
             */
            this.mapView = new MapView(this, this.options.mapView);
        });

        return MapView;
    });
    _registerModule(_modules, 'Series/Map/MapSeries.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Series/ColorMapComposition.js'], _modules['Series/CenteredUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Chart/MapChart.js'], _modules['Series/Map/MapPoint.js'], _modules['Maps/MapView.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (A, ColorMapComposition, CU, H, MapChart, MapPoint, MapView, Series, SeriesRegistry, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var animObject = A.animObject;
        var noop = H.noop;
        var splitPath = MapChart.splitPath;
        var 
            // indirect dependency to keep product size low
            _a = SeriesRegistry.seriesTypes,
            ColumnSeries = _a.column,
            ScatterSeries = _a.scatter;
        var extend = U.extend,
            find = U.find,
            fireEvent = U.fireEvent,
            getNestedProperty = U.getNestedProperty,
            isArray = U.isArray,
            defined = U.defined,
            isNumber = U.isNumber,
            isObject = U.isObject,
            merge = U.merge,
            objectEach = U.objectEach,
            pick = U.pick,
            splat = U.splat;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.map
         *
         * @augments Highcharts.Series
         */
        var MapSeries = /** @class */ (function (_super) {
                __extends(MapSeries, _super);
            function MapSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.chart = void 0;
                _this.data = void 0;
                _this.group = void 0;
                _this.joinBy = void 0;
                _this.options = void 0;
                _this.points = void 0;
                _this.processedData = [];
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * The initial animation for the map series. By default, animation is
             * disabled.
             * @private
             */
            MapSeries.prototype.animate = function (init) {
                var _a = this,
                    chart = _a.chart,
                    group = _a.group,
                    animation = animObject(this.options.animation);
                // Initialize the animation
                if (init) {
                    // Scale down the group and place it in the center
                    group.attr({
                        translateX: chart.plotLeft + chart.plotWidth / 2,
                        translateY: chart.plotTop + chart.plotHeight / 2,
                        scaleX: 0.001,
                        scaleY: 0.001
                    });
                    // Run the animation
                }
                else {
                    group.animate({
                        translateX: chart.plotLeft,
                        translateY: chart.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }, animation);
                }
            };
            MapSeries.prototype.clearBounds = function () {
                this.points.forEach(function (point) {
                    delete point.bounds;
                    delete point.insetIndex;
                    delete point.projectedPath;
                });
                delete this.bounds;
            };
            /**
             * Allow a quick redraw by just translating the area group. Used for zooming
             * and panning in capable browsers.
             * @private
             */
            MapSeries.prototype.doFullTranslate = function () {
                return Boolean(this.isDirtyData ||
                    this.chart.isResizing ||
                    !this.hasRendered);
            };
            /**
             * Draw the data labels. Special for maps is the time that the data labels
             * are drawn (after points), and the clipping of the dataLabelsGroup.
             * @private
             */
            MapSeries.prototype.drawMapDataLabels = function () {
                Series.prototype.drawDataLabels.call(this);
                if (this.dataLabelsGroup) {
                    this.dataLabelsGroup.clip(this.chart.clipRect);
                }
            };
            /**
             * Use the drawPoints method of column, that is able to handle simple
             * shapeArgs. Extend it by assigning the tooltip position.
             * @private
             */
            MapSeries.prototype.drawPoints = function () {
                var _this = this;
                var series = this,
                    _a = this,
                    chart = _a.chart,
                    group = _a.group,
                    _b = _a.transformGroups,
                    transformGroups = _b === void 0 ? [] : _b,
                    mapView = chart.mapView,
                    renderer = chart.renderer;
                if (!mapView) {
                    return;
                }
                // Set groups that handle transform during zooming and panning in order
                // to preserve clipping on series.group
                this.transformGroups = transformGroups;
                if (!transformGroups[0]) {
                    transformGroups[0] = renderer.g().add(group);
                }
                mapView.insets.forEach(function (inset, i) {
                    if (!transformGroups[i + 1]) {
                        transformGroups.push(renderer.g().add(group));
                    }
                });
                // Draw the shapes again
                if (this.doFullTranslate()) {
                    // Individual point actions.
                    this.points.forEach(function (point) {
                        var graphic = point.graphic,
                            shapeArgs = point.shapeArgs;
                        // Points should be added in the corresponding transform group
                        point.group = transformGroups[typeof point.insetIndex === 'number' ?
                            point.insetIndex + 1 :
                            0];
                        // When the point has been moved between insets after
                        // MapView.update
                        if (graphic && graphic.parentGroup !== point.group) {
                            graphic.add(point.group);
                        }
                        // Restore state color on update/redraw (#3529)
                        if (shapeArgs && chart.hasRendered && !chart.styledMode) {
                            shapeArgs.fill = _this.pointAttribs(point, point.state).fill;
                        }
                    });
                    // Draw the points
                    ColumnSeries.prototype.drawPoints.apply(this);
                    // Add class names
                    this.points.forEach(function (point) {
                        var graphic = point.graphic;
                        if (graphic) {
                            var animate_1 = graphic.animate;
                            var className = '';
                            if (point.name) {
                                className +=
                                    'highcharts-name-' +
                                        point.name.replace(/ /g, '-').toLowerCase();
                            }
                            if (point.properties && point.properties['hc-key']) {
                                className +=
                                    ' highcharts-key-' +
                                        point.properties['hc-key'].toString().toLowerCase();
                            }
                            if (className) {
                                graphic.addClass(className);
                            }
                            // In styled mode, apply point colors by CSS
                            if (chart.styledMode) {
                                graphic.css(_this.pointAttribs(point, point.selected && 'select' || void 0));
                            }
                            graphic.animate = function (params, options, complete) {
                                var animateIn = (isNumber(params['stroke-width']) &&
                                        !isNumber(graphic['stroke-width'])), animateOut = (isNumber(graphic['stroke-width']) &&
                                        !isNumber(params['stroke-width']));
                                // When strokeWidth is animating
                                if (animateIn || animateOut) {
                                    var strokeWidth = pick(series.getStrokeWidth(series.options), 1 // Styled mode
                                        ),
                                        inheritedStrokeWidth = (strokeWidth /
                                            (chart.mapView &&
                                                chart.mapView.getScale() ||
                                                1));
                                    // For animating from undefined, .attr() reads the
                                    // property as the starting point
                                    if (animateIn) {
                                        graphic['stroke-width'] = inheritedStrokeWidth;
                                    }
                                    // For animating to undefined
                                    if (animateOut) {
                                        params['stroke-width'] = inheritedStrokeWidth;
                                    }
                                }
                                var ret = animate_1.call(graphic,
                                    params,
                                    options,
                                    animateOut ? function () {
                                        // Remove the attribute after finished animation
                                        graphic.element.removeAttribute('stroke-width');
                                    delete graphic['stroke-width'];
                                    // Proceed
                                    if (complete) {
                                        complete.apply(this, arguments);
                                    }
                                } : complete);
                                return ret;
                            };
                        }
                    });
                }
                // Apply the SVG transform
                transformGroups.forEach(function (transformGroup, i) {
                    var view = i === 0 ? mapView : mapView.insets[i - 1],
                        svgTransform = view.getSVGTransform(),
                        strokeWidth = pick(_this.getStrokeWidth(_this.options), 1 // Styled mode
                        );
                    /*
                    Animate or move to the new zoom level. In order to prevent
                    flickering as the different transform components are set out of sync
                    (#5991), we run a fake animator attribute and set scale and
                    translation synchronously in the same step.

                    A possible improvement to the API would be to handle this in the
                    renderer or animation engine itself, to ensure that when we are
                    animating multiple properties, we make sure that each step for each
                    property is performed in the same step. Also, for symbols and for
                    transform properties, it should induce a single updateTransform and
                    symbolAttr call.
                    */
                    var scale = svgTransform.scaleX,
                        flipFactor = svgTransform.scaleY > 0 ? 1 : -1;
                    var animatePoints = function (scale) {
                            (series.points || []).forEach(function (point) {
                                var graphic = point.graphic;
                            var strokeWidth;
                            if (graphic &&
                                graphic['stroke-width'] &&
                                (strokeWidth = _this.getStrokeWidth(point.options))) {
                                graphic.attr({
                                    'stroke-width': strokeWidth / scale
                                });
                            }
                        });
                    };
                    if (renderer.globalAnimation &&
                        chart.hasRendered &&
                        mapView.allowTransformAnimation) {
                        var startTranslateX_1 = Number(transformGroup.attr('translateX'));
                        var startTranslateY_1 = Number(transformGroup.attr('translateY'));
                        var startScale_1 = Number(transformGroup.attr('scaleX'));
                        var step_1 = function (now,
                            fx) {
                                var scaleStep = startScale_1 +
                                    (scale - startScale_1) * fx.pos;
                            transformGroup.attr({
                                translateX: (startTranslateX_1 + (svgTransform.translateX - startTranslateX_1) * fx.pos),
                                translateY: (startTranslateY_1 + (svgTransform.translateY - startTranslateY_1) * fx.pos),
                                scaleX: scaleStep,
                                scaleY: scaleStep * flipFactor,
                                'stroke-width': strokeWidth / scaleStep
                            });
                            animatePoints(scaleStep); // #18166
                        };
                        var animOptions = {};
                        if (chart.options.chart) {
                            animOptions = merge({}, chart.options.chart.animation);
                        }
                        if (typeof animOptions !== 'boolean') {
                            var userStep_1 = animOptions.step;
                            animOptions.step =
                                function (obj) {
                                    if (userStep_1) {
                                        userStep_1.apply(this, arguments);
                                    }
                                    step_1.apply(this, arguments);
                                };
                        }
                        transformGroup
                            .attr({ animator: 0 })
                            .animate({ animator: 1 }, animOptions, function () {
                            if (typeof renderer.globalAnimation !== 'boolean' &&
                                renderer.globalAnimation.complete) {
                                // fire complete only from this place
                                renderer.globalAnimation.complete({
                                    applyDrilldown: true
                                });
                            }
                        });
                        // When dragging or first rendering, animation is off
                    }
                    else {
                        transformGroup.attr(merge(svgTransform, { 'stroke-width': strokeWidth / scale }));
                        animatePoints(scale); // #18166
                    }
                });
                if (!this.isDrilling) {
                    this.drawMapDataLabels();
                }
            };
            /**
             * Get the bounding box of all paths in the map combined.
             *
             */
            MapSeries.prototype.getProjectedBounds = function () {
                if (!this.bounds && this.chart.mapView) {
                    var _a = this.chart.mapView,
                        insets_1 = _a.insets,
                        projection_1 = _a.projection,
                        allBounds_1 = [];
                    // Find the bounding box of each point
                    (this.points || []).forEach(function (point) {
                        if (point.path || point.geometry) {
                            // @todo Try to puth these two conversions in
                            // MapPoint.applyOptions
                            if (typeof point.path === 'string') {
                                point.path = splitPath(point.path);
                                // Legacy one-dimensional array
                            }
                            else if (isArray(point.path) &&
                                point.path[0] === 'M') {
                                point.path = SVGRenderer.prototype.pathToSegments(point.path);
                            }
                            // The first time a map point is used, analyze its box
                            if (!point.bounds) {
                                var bounds = point.getProjectedBounds(projection_1);
                                if (bounds) {
                                    point.labelrank = pick(point.labelrank, 
                                    // Bigger shape, higher rank
                                    ((bounds.x2 - bounds.x1) *
                                        (bounds.y2 - bounds.y1)));
                                    var midX_1 = bounds.midX,
                                        midY_1 = bounds.midY;
                                    if (insets_1 && isNumber(midX_1) && isNumber(midY_1)) {
                                        var inset = find(insets_1,
                                            function (inset) { return inset.isInside({
                                                x: midX_1,
                                            y: midY_1
                                            }); });
                                        if (inset) {
                                            // Project again, but with the inset
                                            // projection
                                            delete point.projectedPath;
                                            bounds = point.getProjectedBounds(inset.projection);
                                            if (bounds) {
                                                inset.allBounds.push(bounds);
                                            }
                                            point.insetIndex = insets_1.indexOf(inset);
                                        }
                                    }
                                    point.bounds = bounds;
                                }
                            }
                            if (point.bounds && point.insetIndex === void 0) {
                                allBounds_1.push(point.bounds);
                            }
                        }
                    });
                    this.bounds = MapView.compositeBounds(allBounds_1);
                }
                return this.bounds;
            };
            /**
             * Return the stroke-width either from a series options or point options
             * object. This function is used by both the map series where the
             * `borderWidth` sets the stroke-width, and the mapline series where the
             * `lineWidth` sets the stroke-width.
             * @private
             */
            MapSeries.prototype.getStrokeWidth = function (options) {
                var pointAttrToOptions = this.pointAttrToOptions;
                return options[pointAttrToOptions &&
                    pointAttrToOptions['stroke-width'] || 'borderWidth'];
            };
            /**
             * Define hasData function for non-cartesian series. Returns true if the
             * series has points at all.
             * @private
             */
            MapSeries.prototype.hasData = function () {
                return !!this.processedXData.length; // != 0
            };
            /**
             * Get presentational attributes. In the maps series this runs in both
             * styled and non-styled mode, because colors hold data when a colorAxis is
             * used.
             * @private
             */
            MapSeries.prototype.pointAttribs = function (point, state) {
                var _a;
                var _b = point.series.chart,
                    mapView = _b.mapView,
                    styledMode = _b.styledMode;
                var attr = styledMode ?
                        this.colorAttribs(point) :
                        ColumnSeries.prototype.pointAttribs.call(this,
                    point,
                    state);
                // Individual stroke width
                var pointStrokeWidth = this.getStrokeWidth(point.options);
                // Handle state specific border or line width
                if (state) {
                    var stateOptions = merge(this.options.states[state],
                        point.options.states &&
                            point.options.states[state] ||
                            {}),
                        stateStrokeWidth = this.getStrokeWidth(stateOptions);
                    if (defined(stateStrokeWidth)) {
                        pointStrokeWidth = stateStrokeWidth;
                    }
                    attr.stroke = (_a = stateOptions.borderColor) !== null && _a !== void 0 ? _a : point.color;
                }
                if (pointStrokeWidth && mapView) {
                    pointStrokeWidth /= mapView.getScale();
                }
                // In order for dash style to avoid being scaled, set the transformed
                // stroke width on the item
                var seriesStrokeWidth = this.getStrokeWidth(this.options);
                if (attr.dashstyle &&
                    mapView &&
                    isNumber(seriesStrokeWidth)) {
                    pointStrokeWidth = seriesStrokeWidth / mapView.getScale();
                }
                // Invisible map points means that the data value is removed from the
                // map, but not the map area shape itself. Instead it is rendered like a
                // null point. To fully remove a map area, it should be removed from the
                // mapData.
                if (!point.visible) {
                    attr.fill = this.options.nullColor;
                }
                if (defined(pointStrokeWidth)) {
                    attr['stroke-width'] = pointStrokeWidth;
                }
                else {
                    delete attr['stroke-width'];
                }
                attr['stroke-linecap'] = attr['stroke-linejoin'] = this.options.linecap;
                return attr;
            };
            /**
             * @private
             */
            MapSeries.prototype.updateData = function () {
                // #16782
                if (this.processedData) {
                    return false;
                }
                return _super.prototype.updateData.apply(this, arguments);
            };
            /**
             * Extend setData to call processData and generatePoints immediately.
             * @private
             */
            MapSeries.prototype.setData = function (data, redraw, animation, updatePoints) {
                if (redraw === void 0) { redraw = true; }
                delete this.bounds;
                _super.prototype.setData.call(this, data, false, void 0, updatePoints);
                this.processData();
                this.generatePoints();
                if (redraw) {
                    this.chart.redraw(animation);
                }
            };
            /**
             * Extend processData to join in mapData. If the allAreas option is true,
             * all areas from the mapData are used, and those that don't correspond to a
             * data value are given null values. The results are stored in
             * `processedData` in order to avoid mutating `data`.
             * @private
             */
            MapSeries.prototype.processData = function () {
                var options = this.options,
                    data = options.data,
                    chartOptions = this.chart.options.chart,
                    joinBy = this.joinBy,
                    pointArrayMap = options.keys || this.pointArrayMap,
                    dataUsed = [],
                    mapMap = {};
                var mapView = this.chart.mapView,
                    mapDataObject = mapView && (
                    // Get map either from series or global
                    isObject(options.mapData,
                    true) ?
                        mapView.getGeoMap(options.mapData) : mapView.geoMap),
                    mapTransforms = this.chart.mapTransforms,
                    mapPoint,
                    props,
                    i;
                // Pick up transform definitions for chart
                this.chart.mapTransforms = mapTransforms =
                    chartOptions.mapTransforms ||
                        mapDataObject && mapDataObject['hc-transform'] ||
                        mapTransforms;
                // Cache cos/sin of transform rotation angle
                if (mapTransforms) {
                    objectEach(mapTransforms, function (transform) {
                        if (transform.rotation) {
                            transform.cosAngle = Math.cos(transform.rotation);
                            transform.sinAngle = Math.sin(transform.rotation);
                        }
                    });
                }
                var mapData;
                if (isArray(options.mapData)) {
                    mapData = options.mapData;
                }
                else if (mapDataObject && mapDataObject.type === 'FeatureCollection') {
                    this.mapTitle = mapDataObject.title;
                    mapData = H.geojson(mapDataObject, this.type, this);
                }
                // Reset processedData
                this.processedData = [];
                var processedData = this.processedData;
                // Pick up numeric values, add index. Convert Array point definitions to
                // objects using pointArrayMap.
                if (data) {
                    data.forEach(function (val, i) {
                        var ix = 0;
                        if (isNumber(val)) {
                            processedData[i] = {
                                value: val
                            };
                        }
                        else if (isArray(val)) {
                            processedData[i] = {};
                            // Automatically copy first item to hc-key if there is
                            // an extra leading string
                            if (!options.keys &&
                                val.length > pointArrayMap.length &&
                                typeof val[0] === 'string') {
                                processedData[i]['hc-key'] = val[0];
                                ++ix;
                            }
                            // Run through pointArrayMap and what's left of the
                            // point data array in parallel, copying over the values
                            for (var j = 0; j < pointArrayMap.length; ++j, ++ix) {
                                if (pointArrayMap[j] &&
                                    typeof val[ix] !== 'undefined') {
                                    if (pointArrayMap[j].indexOf('.') > 0) {
                                        MapPoint.prototype.setNestedProperty(processedData[i], val[ix], pointArrayMap[j]);
                                    }
                                    else {
                                        processedData[i][pointArrayMap[j]] =
                                            val[ix];
                                    }
                                }
                            }
                        }
                        else {
                            processedData[i] = data[i];
                        }
                        if (joinBy && joinBy[0] === '_i') {
                            processedData[i]._i = i;
                        }
                    });
                }
                if (mapData) {
                    this.mapData = mapData;
                    this.mapMap = {};
                    for (i = 0; i < mapData.length; i++) {
                        mapPoint = mapData[i];
                        props = mapPoint.properties;
                        mapPoint._i = i;
                        // Copy the property over to root for faster access
                        if (joinBy[0] && props && props[joinBy[0]]) {
                            mapPoint[joinBy[0]] = props[joinBy[0]];
                        }
                        mapMap[mapPoint[joinBy[0]]] = mapPoint;
                    }
                    this.mapMap = mapMap;
                    // Registered the point codes that actually hold data
                    if (joinBy[1]) {
                        var joinKey_1 = joinBy[1];
                        processedData.forEach(function (pointOptions) {
                            var mapKey = getNestedProperty(joinKey_1,
                                pointOptions);
                            if (mapMap[mapKey]) {
                                dataUsed.push(mapMap[mapKey]);
                            }
                        });
                    }
                    if (options.allAreas) {
                        // Register the point codes that actually hold data
                        if (joinBy[1]) {
                            var joinKey_2 = joinBy[1];
                            processedData.forEach(function (pointOptions) {
                                dataUsed.push(getNestedProperty(joinKey_2, pointOptions));
                            });
                        }
                        // Add those map points that don't correspond to data, which
                        // will be drawn as null points. Searching a string is faster
                        // than Array.indexOf
                        var dataUsedString_1 = ('|' +
                                dataUsed
                                    .map(function (point) {
                                    return point && point[joinBy[0]];
                            })
                                .join('|') +
                            '|');
                        mapData.forEach(function (mapPoint) {
                            if (!joinBy[0] ||
                                dataUsedString_1.indexOf('|' + mapPoint[joinBy[0]] + '|') === -1) {
                                processedData.push(merge(mapPoint, { value: null }));
                            }
                        });
                    }
                }
                // The processedXData array is used by general chart logic for checking
                // data length in various scanarios
                this.processedXData = new Array(processedData.length);
                return void 0;
            };
            /**
             * Extend setOptions by picking up the joinBy option and applying it to a
             * series property.
             * @private
             */
            MapSeries.prototype.setOptions = function (itemOptions) {
                var options = Series.prototype.setOptions.call(this,
                    itemOptions),
                    joinBy = options.joinBy,
                    joinByNull = joinBy === null;
                if (joinByNull) {
                    joinBy = '_i';
                }
                joinBy = this.joinBy = splat(joinBy);
                if (!joinBy[1]) {
                    joinBy[1] = joinBy[0];
                }
                return options;
            };
            /**
             * Add the path option for data points. Find the max value for color
             * calculation.
             * @private
             */
            MapSeries.prototype.translate = function () {
                var series = this,
                    doFullTranslate = series.doFullTranslate(),
                    mapView = this.chart.mapView,
                    projection = mapView && mapView.projection;
                // Recalculate box on updated data
                if (this.chart.hasRendered && (this.isDirtyData || !this.hasRendered)) {
                    this.processData();
                    this.generatePoints();
                    delete this.bounds;
                    if (mapView &&
                        !mapView.userOptions.center &&
                        !isNumber(mapView.userOptions.zoom) &&
                        mapView.zoom === mapView.minZoom // #18542 don't zoom out if
                    // map is zoomed
                    ) {
                        // Not only recalculate bounds but also fit view
                        mapView.fitToBounds(void 0, void 0, false); // #17012
                    }
                    else {
                        // If center and zoom is defined in user options, get bounds but
                        // don't change view
                        this.getProjectedBounds();
                    }
                }
                if (mapView) {
                    var mainSvgTransform_1 = mapView.getSVGTransform();
                    series.points.forEach(function (point) {
                        var svgTransform = (isNumber(point.insetIndex) &&
                                mapView.insets[point.insetIndex].getSVGTransform()) || mainSvgTransform_1;
                        // Record the middle point (loosely based on centroid),
                        // determined by the middleX and middleY options.
                        if (svgTransform &&
                            point.bounds &&
                            isNumber(point.bounds.midX) &&
                            isNumber(point.bounds.midY)) {
                            point.plotX = point.bounds.midX * svgTransform.scaleX +
                                svgTransform.translateX;
                            point.plotY = point.bounds.midY * svgTransform.scaleY +
                                svgTransform.translateY;
                        }
                        if (doFullTranslate) {
                            point.shapeType = 'path';
                            point.shapeArgs = {
                                d: MapPoint.getProjectedPath(point, projection)
                            };
                        }
                        if (point.projectedPath && !point.projectedPath.length) {
                            point.setVisible(false);
                        }
                        else {
                            point.setVisible(true);
                        }
                    });
                }
                fireEvent(series, 'afterTranslate');
            };
            /**
             * The map series is used for basic choropleth maps, where each map area has
             * a color based on its value.
             *
             * @sample maps/demo/all-maps/
             *         Choropleth map
             *
             * @extends      plotOptions.scatter
             * @excluding    boostBlending, boostThreshold, dragDrop, cluster, marker
             * @product      highmaps
             * @optionparent plotOptions.map
             *
             * @private
             */
            MapSeries.defaultOptions = merge(ScatterSeries.defaultOptions, {
                /**
                 * Whether the MapView takes this series into account when computing the
                 * default zoom and center of the map.
                 *
                 * @sample maps/series/affectsmapview/
                 *         US map with world map backdrop
                 *
                 * @since 10.0.0
                 *
                 * @private
                 */
                affectsMapView: true,
                animation: false,
                dataLabels: {
                    crop: false,
                    formatter: function () {
                        var numberFormatter = this.series.chart.numberFormatter;
                        var value = this.point.value;
                        return isNumber(value) ? numberFormatter(value, -1) : '';
                    },
                    inside: true,
                    overflow: false,
                    padding: 0,
                    verticalAlign: 'middle'
                },
                /**
                 * The SVG value used for the `stroke-linecap` and `stroke-linejoin` of
                 * the map borders. Round means that borders are rounded in the ends and
                 * bends.
                 *
                 * @sample maps/demo/mappoint-mapmarker/
                 *         Backdrop coastline with round linecap
                 *
                 * @type   {Highcharts.SeriesLinecapValue}
                 * @since  10.3.3
                 */
                linecap: 'round',
                /**
                 * @ignore-option
                 *
                 * @private
                 */
                marker: null,
                /**
                 * The color to apply to null points.
                 *
                 * In styled mode, the null point fill is set in the
                 * `.highcharts-null-point` class.
                 *
                 * @sample maps/demo/all-areas-as-null/
                 *         Null color
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 *
                 * @private
                 */
                nullColor: "#f7f7f7" /* Palette.neutralColor3 */,
                /**
                 * Whether to allow pointer interaction like tooltips and mouse events
                 * on null points.
                 *
                 * @type      {boolean}
                 * @since     4.2.7
                 * @apioption plotOptions.map.nullInteraction
                 *
                 * @private
                 */
                stickyTracking: false,
                tooltip: {
                    followPointer: true,
                    pointFormat: '{point.name}: {point.value}<br/>'
                },
                /**
                 * @ignore-option
                 *
                 * @private
                 */
                turboThreshold: 0,
                /**
                 * Whether all areas of the map defined in `mapData` should be rendered.
                 * If `true`, areas which don't correspond to a data point, are rendered
                 * as `null` points. If `false`, those areas are skipped.
                 *
                 * @sample maps/plotoptions/series-allareas-false/
                 *         All areas set to false
                 *
                 * @type      {boolean}
                 * @default   true
                 * @product   highmaps
                 * @apioption plotOptions.series.allAreas
                 *
                 * @private
                 */
                allAreas: true,
                /**
                 * The border color of the map areas.
                 *
                 * In styled mode, the border stroke is given in the `.highcharts-point`
                 * class.
                 *
                 * @sample {highmaps} maps/plotoptions/series-border/
                 *         Borders demo
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default   #cccccc
                 * @product   highmaps
                 * @apioption plotOptions.series.borderColor
                 *
                 * @private
                 */
                borderColor: "#e6e6e6" /* Palette.neutralColor10 */,
                /**
                 * The border width of each map area.
                 *
                 * In styled mode, the border stroke width is given in the
                 * `.highcharts-point` class.
                 *
                 * @sample maps/plotoptions/series-border/
                 *         Borders demo
                 *
                 * @type      {number}
                 * @default   1
                 * @product   highmaps
                 * @apioption plotOptions.series.borderWidth
                 *
                 * @private
                 */
                borderWidth: 1,
                /**
                 * @type      {string}
                 * @default   value
                 * @apioption plotOptions.map.colorKey
                 */
                /**
                 * What property to join the `mapData` to the value data. For example,
                 * if joinBy is "code", the mapData items with a specific code is merged
                 * into the data with the same code. For maps loaded from GeoJSON, the
                 * keys may be held in each point's `properties` object.
                 *
                 * The joinBy option can also be an array of two values, where the first
                 * points to a key in the `mapData`, and the second points to another
                 * key in the `data`.
                 *
                 * When joinBy is `null`, the map items are joined by their position in
                 * the array, which performs much better in maps with many data points.
                 * This is the recommended option if you are printing more than a
                 * thousand data points and have a backend that can preprocess the data
                 * into a parallel array of the mapData.
                 *
                 * @sample maps/plotoptions/series-border/
                 *         Joined by "code"
                 * @sample maps/demo/geojson/
                 *         GeoJSON joined by an array
                 * @sample maps/series/joinby-null/
                 *         Simple data joined by null
                 *
                 * @type      {string|Array<string>}
                 * @default   hc-key
                 * @product   highmaps
                 * @apioption plotOptions.series.joinBy
                 *
                 * @private
                 */
                joinBy: 'hc-key',
                /**
                 * Define the z index of the series.
                 *
                 * @type      {number}
                 * @product   highmaps
                 * @apioption plotOptions.series.zIndex
                 */
                /**
                 * @apioption plotOptions.series.states
                 *
                 * @private
                 */
                states: {
                    /**
                     * @apioption plotOptions.series.states.hover
                     */
                    hover: {
                        /** @ignore-option */
                        halo: void 0,
                        /**
                         * The color of the shape in this state.
                         *
                         * @sample maps/plotoptions/series-states-hover/
                         *         Hover options
                         *
                         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @product   highmaps
                         * @apioption plotOptions.series.states.hover.color
                         */
                        /**
                         * The border color of the point in this state.
                         *
                         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @product   highmaps
                         * @apioption plotOptions.series.states.hover.borderColor
                         */
                        borderColor: "#666666" /* Palette.neutralColor60 */,
                        /**
                         * The border width of the point in this state
                         *
                         * @type      {number}
                         * @product   highmaps
                         * @apioption plotOptions.series.states.hover.borderWidth
                         */
                        borderWidth: 2
                        /**
                         * The relative brightness of the point when hovered, relative
                         * to the normal point color.
                         *
                         * @type      {number}
                         * @product   highmaps
                         * @default   0
                         * @apioption plotOptions.series.states.hover.brightness
                         */
                    },
                    /**
                     * @apioption plotOptions.series.states.normal
                     */
                    normal: {
                        /**
                         * @productdesc {highmaps}
                         * The animation adds some latency in order to reduce the effect
                         * of flickering when hovering in and out of for example an
                         * uneven coastline.
                         *
                         * @sample {highmaps} maps/plotoptions/series-states-animation-false/
                         *         No animation of fill color
                         *
                         * @apioption plotOptions.series.states.normal.animation
                         */
                        animation: true
                    },
                    /**
                     * @apioption plotOptions.series.states.select
                     */
                    select: {
                        /**
                         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @default   #cccccc
                         * @product   highmaps
                         * @apioption plotOptions.series.states.select.color
                         */
                        color: "#cccccc" /* Palette.neutralColor20 */
                    }
                },
                legendSymbol: 'rectangle'
            });
            return MapSeries;
        }(ScatterSeries));
        extend(MapSeries.prototype, {
            type: 'map',
            axisTypes: ColorMapComposition.seriesMembers.axisTypes,
            colorAttribs: ColorMapComposition.seriesMembers.colorAttribs,
            colorKey: ColorMapComposition.seriesMembers.colorKey,
            // When tooltip is not shared, this series (and derivatives) requires
            // direct touch/hover. KD-tree does not apply.
            directTouch: true,
            // We need the points' bounding boxes in order to draw the data labels,
            // so we skip it now and call it from drawPoints instead.
            drawDataLabels: noop,
            // No graph for the map series
            drawGraph: noop,
            forceDL: true,
            getCenter: CU.getCenter,
            getExtremesFromAll: true,
            getSymbol: noop,
            isCartesian: false,
            parallelArrays: ColorMapComposition.seriesMembers.parallelArrays,
            pointArrayMap: ColorMapComposition.seriesMembers.pointArrayMap,
            pointClass: MapPoint,
            // X axis and Y axis must have same translation slope
            preserveAspectRatio: true,
            searchPoint: noop,
            trackerGroups: ColorMapComposition.seriesMembers.trackerGroups,
            // Get axis extremes from paths, not values
            useMapGeometry: true
        });
        ColorMapComposition.compose(MapSeries);
        SeriesRegistry.registerSeriesType('map', MapSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * An array of objects containing a `geometry` or `path` definition and
         * optionally additional properties to join in the `data` as per the `joinBy`
         * option. GeoJSON and TopoJSON structures can also be passed directly into
         * `mapData`.
         *
         * @sample maps/demo/category-map/
         *         Map data and joinBy
         * @sample maps/series/mapdata-multiple/
         *         Multiple map sources
         *
         * @type      {Array<Highcharts.SeriesMapDataOptions>|Highcharts.GeoJSON|Highcharts.TopoJSON}
         * @product   highmaps
         * @apioption series.mapData
         */
        /**
         * A `map` series. If the [type](#series.map.type) option is not specified, it
         * is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.map
         * @excluding dataParser, dataURL, dragDrop, marker
         * @product   highmaps
         * @apioption series.map
         */
        /**
         * An array of data points for the series. For the `map` series type, points can
         * be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `value` options. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `[hc-key, value]`. Example:
         *    ```js
         *        data: [
         *            ['us-ny', 0],
         *            ['us-mi', 5],
         *            ['us-tx', 3],
         *            ['us-ak', 5]
         *        ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.map.turboThreshold),
         *    this option is not available.
         *    ```js
         *        data: [{
         *            value: 6,
         *            name: "Point2",
         *            color: "#00FF00"
         *        }, {
         *            value: 6,
         *            name: "Point1",
         *            color: "#FF00FF"
         *        }]
         *    ```
         *
         * @type      {Array<number|Array<string,(number|null)>|null|*>}
         * @product   highmaps
         * @apioption series.map.data
         */
        /**
         * When using automatic point colors pulled from the global
         * [colors](colors) or series-specific
         * [plotOptions.map.colors](series.colors) collections, this option
         * determines whether the chart should receive one color per series or
         * one color per point.
         *
         * In styled mode, the `colors` or `series.colors` arrays are not
         * supported, and instead this option gives the points individual color
         * class names on the form `highcharts-color-{n}`.
         *
         * @see [series colors](#plotOptions.map.colors)
         *
         * @sample {highmaps} maps/plotoptions/mapline-colorbypoint-false/
         *         Mapline colorByPoint set to false by default
         * @sample {highmaps} maps/plotoptions/mapline-colorbypoint-true/
         *         Mapline colorByPoint set to true
         *
         * @type      {boolean}
         * @default   false
         * @since     2.0
         * @product   highmaps
         * @apioption plotOptions.map.colorByPoint
         */
        /**
         * A series specific or series type specific color set to apply instead
         * of the global [colors](#colors) when [colorByPoint](
         * #plotOptions.map.colorByPoint) is true.
         *
         * @type      {Array<Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject>}
         * @since     3.0
         * @product   highmaps
         * @apioption plotOptions.map.colors
         */
        /**
         * Individual color for the point. By default the color is either used
         * to denote the value, or pulled from the global `colors` array.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highmaps
         * @apioption series.map.data.color
         */
        /**
         * Individual data label for each point. The options are the same as
         * the ones for [plotOptions.series.dataLabels](
         * #plotOptions.series.dataLabels).
         *
         * @sample maps/series/data-datalabels/
         *         Disable data labels for individual areas
         *
         * @type      {Highcharts.DataLabelsOptions}
         * @product   highmaps
         * @apioption series.map.data.dataLabels
         */
        /**
         * The `id` of a series in the [drilldown.series](#drilldown.series)
         * array to use for a drilldown for this point.
         *
         * @sample maps/demo/map-drilldown/
         *         Basic drilldown
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.drilldown
         */
        /**
         * For map and mapline series types, the geometry of a point.
         *
         * To achieve a better separation between the structure and the data,
         * it is recommended to use `mapData` to define the geometry instead
         * of defining it on the data points themselves.
         *
         * The geometry object is compatible to that of a `feature` in GeoJSON, so
         * features of GeoJSON can be passed directly into the `data`, optionally
         * after first filtering and processing it.
         *
         * For pre-projected maps (like GeoJSON maps from our
         * [map collection](https://code.highcharts.com/mapdata/)), user has to specify
         * coordinates in `projectedUnits` for geometry type other than `Point`,
         * instead of `[longitude, latitude]`.
         *
         * @sample maps/series/mappoint-line-geometry/
         *         Map point and line geometry
         * @sample maps/series/geometry-types/
         *         Geometry types
         *
         * @type      {Object}
         * @since 9.3.0
         * @product   highmaps
         * @apioption series.map.data.geometry
         */
        /**
         * The geometry type. Can be one of `LineString`, `Polygon`, `MultiLineString`
         * or `MultiPolygon`.
         *
         * @sample maps/series/geometry-types/
         *         Geometry types
         *
         * @declare   Highcharts.MapGeometryTypeValue
         * @type      {string}
         * @since     9.3.0
         * @product   highmaps
         * @validvalue ["LineString", "Polygon", "MultiLineString", "MultiPolygon"]
         * @apioption series.map.data.geometry.type
         */
        /**
         * The geometry coordinates in terms of arrays of `[longitude, latitude]`, or
         * a two dimensional array of the same. The dimensionality must comply with the
         * `type`.
         *
         * @type      {Array<LonLatArray>|Array<Array<LonLatArray>>}
         * @since 9.3.0
         * @product   highmaps
         * @apioption series.map.data.geometry.coordinates
         */
        /**
         * An id for the point. This can be used after render time to get a
         * pointer to the point object through `chart.get()`.
         *
         * @sample maps/series/data-id/
         *         Highlight a point by id
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.id
         */
        /**
         * When data labels are laid out on a map, Highmaps runs a simplified
         * algorithm to detect collision. When two labels collide, the one with
         * the lowest rank is hidden. By default the rank is computed from the
         * area.
         *
         * @type      {number}
         * @product   highmaps
         * @apioption series.map.data.labelrank
         */
        /**
         * The relative mid point of an area, used to place the data label.
         * Ranges from 0 to 1\. When `mapData` is used, middleX can be defined
         * there.
         *
         * @type      {number}
         * @default   0.5
         * @product   highmaps
         * @apioption series.map.data.middleX
         */
        /**
         * The relative mid point of an area, used to place the data label.
         * Ranges from 0 to 1\. When `mapData` is used, middleY can be defined
         * there.
         *
         * @type      {number}
         * @default   0.5
         * @product   highmaps
         * @apioption series.map.data.middleY
         */
        /**
         * The name of the point as shown in the legend, tooltip, dataLabel
         * etc.
         *
         * @sample maps/series/data-datalabels/
         *         Point names
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.name
         */
        /**
         * For map and mapline series types, the SVG path for the shape. For
         * compatibily with old IE, not all SVG path definitions are supported,
         * but M, L and C operators are safe.
         *
         * To achieve a better separation between the structure and the data,
         * it is recommended to use `mapData` to define that paths instead
         * of defining them on the data points themselves.
         *
         * For providing true geographical shapes based on longitude and latitude, use
         * the `geometry` option instead.
         *
         * @sample maps/series/data-path/
         *         Paths defined in data
         *
         * @type      {string}
         * @product   highmaps
         * @apioption series.map.data.path
         */
        /**
         * The numeric value of the data point.
         *
         * @type      {number|null}
         * @product   highmaps
         * @apioption series.map.data.value
         */
        /**
         * Individual point events
         *
         * @extends   plotOptions.series.point.events
         * @product   highmaps
         * @apioption series.map.data.events
         */
        ''; // adds doclets above to the transpiled file

        return MapSeries;
    });
    _registerModule(_modules, 'Series/FlowMap/FlowMapSeries.js', [_modules['Series/FlowMap/FlowMapPoint.js'], _modules['Series/Map/MapSeries.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (FlowMapPoint, MapSeries, SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2022 Askel Eirik Johansson, Piotr Madej
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var __spreadArray = (this && this.__spreadArray) || function (to,
            from,
            pack) {
                if (pack || arguments.length === 2) for (var i = 0,
            l = from.length,
            ar; i < l; i++) {
                    if (ar || !(i in from)) {
                        if (!ar) ar = Array.prototype.slice.call(from, 0,
            i);
                    ar[i] = from[i];
                }
            }
            return to.concat(ar || Array.prototype.slice.call(from));
        };
        var Point = SeriesRegistry.series.prototype.pointClass,
            _a = SeriesRegistry.seriesTypes,
            ColumnSeries = _a.column,
            MapLineSeries = _a.mapline;
        var addEvent = U.addEvent,
            arrayMax = U.arrayMax,
            arrayMin = U.arrayMin,
            defined = U.defined,
            extend = U.extend,
            isArray = U.isArray,
            merge = U.merge,
            pick = U.pick,
            relativeLength = U.relativeLength;
        /**
         * The flowmap series type
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.flowmap
         *
         * @augments Highcharts.Series
         */
        var FlowMapSeries = /** @class */ (function (_super) {
                __extends(FlowMapSeries, _super);
            function FlowMapSeries() {
                /* *
                 *
                 *  Static properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 * Properties
                 *
                 * */
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                _this.smallestWeight = void 0;
                _this.greatestWeight = void 0;
                _this.centerOfPoints = void 0;
                return _this;
            }
            /* *
             *
             *  Static Function
             *
             * */
            /**
             * Get vector length.
             * @private
             */
            FlowMapSeries.getLength = function (x, y) {
                return Math.sqrt(x * x + y * y);
            };
            /**
             * Return a normalized vector.
             * @private
             */
            FlowMapSeries.normalize = function (x, y) {
                var length = this.getLength(x,
                    y);
                return [x / length, y / length];
            };
            /**
             * Return an SVGPath for markerEnd.
             * @private
             */
            FlowMapSeries.markerEndPath = function (lCorner, rCorner, topCorner, options) {
                var width = relativeLength(options.width || 0,
                    this.getLength(rCorner[0] - lCorner[0],
                    rCorner[1] - lCorner[1]));
                var type = options.markerType || 'arrow',
                    _a = this.normalize(rCorner[0] - lCorner[0],
                    rCorner[1] - lCorner[1]),
                    edgeX = _a[0],
                    edgeY = _a[1];
                var path = [];
                // For arrow head calculation.
                if (type === 'arrow') {
                    // Left side of arrow head.
                    var x = lCorner[0],
                        y = lCorner[1];
                    x -= edgeX * width;
                    y -= edgeY * width;
                    path.push(['L', x, y]);
                    // Tip of arrow head.
                    path.push(['L', topCorner[0], topCorner[1]]);
                    // Right side of arrow head.
                    x = rCorner[0], y = rCorner[1];
                    x += edgeX * width;
                    y += edgeY * width;
                    path.push(['L', x, y]);
                }
                // For mushroom head calculation.
                if (type === 'mushroom') {
                    var xLeft = lCorner[0],
                        yLeft = lCorner[1],
                        xRight = rCorner[0],
                        yRight = rCorner[1];
                    var xTop = topCorner[0],
                        yTop = topCorner[1],
                        xMid = (xRight - xLeft) / 2 + xLeft,
                        yMid = (yRight - yLeft) / 2 + yLeft, 
                        // Control point for curve.
                        xControl = (xTop - xMid) * 2 + xMid,
                        yControl = (yTop - yMid) * 2 + yMid;
                    // Left side of arrow head.
                    xLeft -= edgeX * width;
                    yLeft -= edgeY * width;
                    path.push(['L', xLeft, yLeft]);
                    // Right side of arrow head.
                    xRight += edgeX * width;
                    yRight += edgeY * width;
                    // Curve from left to right.
                    path.push(['Q', xControl, yControl, xRight, yRight]);
                }
                return path;
            };
            /**
             *
             *  Functions
             *
             */
            /**
             * Animate the flowmap point one by one from 'fromPoint'.
             *
             * @private
             * @function Highcharts.seriesTypes.flowmap#animate
             *
             * @param {boolean} init
             *        Whether to initialize the animation or run it
             */
            FlowMapSeries.prototype.animate = function (init) {
                var series = this,
                    points = series.points;
                if (!init) { // run the animation
                    points.forEach(function (point) {
                        if (point.shapeArgs &&
                            isArray(point.shapeArgs.d) &&
                            point.shapeArgs.d.length) {
                            var path = point.shapeArgs.d,
                                x = path[0][1],
                                y = path[0][2];
                            // to animate SVG path the initial path array needs to be
                            // same as target, but element should be visible, so we
                            // insert array elements with start (M) values
                            if (x && y) {
                                var start = [];
                                for (var i = 0; i < path.length; i++) {
                                    // Added any when merging master into another branch
                                    // :((. The spread looks correct, but TS complains
                                    // about possible number in the first position,
                                    // which is the segment type.
                                    start.push(__spreadArray([], path[i], true));
                                    for (var j = 1; j < path[i].length; j++) {
                                        start[i][j] = j % 2 ? x : y;
                                    }
                                }
                                if (point.graphic) {
                                    point.graphic.attr({ d: start });
                                    point.graphic.animate({ d: path });
                                }
                            }
                        }
                    });
                }
            };
            /**
             * Get the actual width of a link either as a mapped weight between
             * `minWidth` and `maxWidth` or a specified width.
             * @private
             */
            FlowMapSeries.prototype.getLinkWidth = function (point) {
                var width = this.options.width,
                    weight = point.options.weight || this.options.weight;
                point.options.weight = weight;
                if (width && !weight) {
                    return width;
                }
                var smallestWeight = this.smallestWeight,
                    greatestWeight = this.greatestWeight;
                if (!defined(weight) || !smallestWeight || !greatestWeight) {
                    return 0;
                }
                var minWidthLimit = this.options.minWidth,
                    maxWidthLimit = this.options.maxWidth;
                return (weight - smallestWeight) * (maxWidthLimit - minWidthLimit) /
                    ((greatestWeight - smallestWeight) || 1) + minWidthLimit;
            };
            /**
             * Automatically calculate the optimal curve based on a reference point.
             * @private
             */
            FlowMapSeries.prototype.autoCurve = function (fromX, fromY, toX, toY, centerX, centerY) {
                var linkV = {
                        x: (toX - fromX),
                        y: (toY - fromY)
                    },
                    half = {
                        x: (toX - fromX) / 2 + fromX,
                        y: (toY - fromY) / 2 + fromY
                    },
                    centerV = {
                        x: half.x - centerX,
                        y: half.y - centerY
                    };
                // Dot product and determinant
                var dot = linkV.x * centerV.x + linkV.y * centerV.y,
                    det = linkV.x * centerV.y - linkV.y * centerV.x;
                // Calculate the angle and base the curveFactor on it.
                var angle = Math.atan2(det,
                    dot),
                    angleDeg = angle * 180 / Math.PI;
                if (angleDeg < 0) {
                    angleDeg = 360 + angleDeg;
                }
                angle = angleDeg * Math.PI / 180;
                // A more subtle result.
                return -Math.sin(angle) * 0.7;
            };
            /**
             * Get point attributes.
             * @private
             */
            FlowMapSeries.prototype.pointAttribs = function (point, state) {
                var attrs = MapSeries.prototype.pointAttribs.call(this,
                    point,
                    state);
                attrs.fill = pick(point.options.fillColor, point.options.color, this.options.fillColor === 'none' ? null : this.options.fillColor, this.color);
                attrs['fill-opacity'] = pick(point.options.fillOpacity, this.options.fillOpacity);
                attrs['stroke-width'] = pick(point.options.lineWidth, this.options.lineWidth, 1);
                if (point.options.opacity) {
                    attrs.opacity = point.options.opacity;
                }
                return attrs;
            };
            /**
             * Draw shapeArgs based on from/to options. Run translation operations. We
             * need two loops: first loop to calculate data, like smallest/greatest
             * weights and centerOfPoints, which needs the calculated positions, second
             * loop for calculating shapes of points based on previous calculations.
             * @private
             */
            FlowMapSeries.prototype.translate = function () {
                var _this = this;
                if (this.chart.hasRendered && (this.isDirtyData || !this.hasRendered)) {
                    this.processData();
                    this.generatePoints();
                }
                var weights = [];
                var averageX = 0,
                    averageY = 0;
                this.points.forEach(function (point) {
                    var chart = _this.chart,
                        mapView = chart.mapView,
                        options = point.options,
                        dirtySeries = function () {
                            point.series.isDirty = true;
                    }, getPointXY = function (pointId) {
                        var foundPoint = chart.get(pointId);
                        // Connect to the linked parent point (in mappoint) to
                        // trigger series redraw for the linked point (in flow).
                        if ((foundPoint instanceof Point) &&
                            foundPoint.plotX &&
                            foundPoint.plotY) {
                            // after linked point update flowmap point should
                            // be also updated
                            addEvent(foundPoint, 'update', dirtySeries);
                            return {
                                x: foundPoint.plotX,
                                y: foundPoint.plotY
                            };
                        }
                    }, getLonLatXY = function (lonLat) {
                        if (isArray(lonLat)) {
                            return {
                                lon: lonLat[0],
                                lat: lonLat[1]
                            };
                        }
                        return lonLat;
                    };
                    var fromPos,
                        toPos;
                    if (typeof options.from === 'string') {
                        fromPos = getPointXY(options.from);
                    }
                    else if (typeof options.from === 'object' && mapView) {
                        fromPos = mapView.lonLatToPixels(getLonLatXY(options.from));
                    }
                    if (typeof options.to === 'string') {
                        toPos = getPointXY(options.to);
                    }
                    else if (typeof options.to === 'object' && mapView) {
                        toPos = mapView.lonLatToPixels(getLonLatXY(options.to));
                    }
                    // Save original point location.
                    point.fromPos = fromPos;
                    point.toPos = toPos;
                    if (fromPos && toPos) {
                        averageX += (fromPos.x + toPos.x) / 2;
                        averageY += (fromPos.y + toPos.y) / 2;
                    }
                    if (pick(point.options.weight, _this.options.weight)) {
                        weights.push(pick(point.options.weight, _this.options.weight));
                    }
                });
                this.smallestWeight = arrayMin(weights);
                this.greatestWeight = arrayMax(weights);
                this.centerOfPoints = {
                    x: averageX / this.points.length,
                    y: averageY / this.points.length
                };
                this.points.forEach(function (point) {
                    // Don't draw point if weight is not valid.
                    if (!_this.getLinkWidth(point)) {
                        point.shapeArgs = {
                            d: []
                        };
                        return;
                    }
                    if (point.fromPos) {
                        point.plotX = point.fromPos.x;
                        point.plotY = point.fromPos.y;
                    }
                    // Calculate point shape
                    point.shapeType = 'path';
                    point.shapeArgs = _this.getPointShapeArgs(point);
                    // When updating point from null to normal value, set a real color
                    // (don't keep nullColor).
                    point.color = pick(point.options.color, point.series.color);
                });
            };
            FlowMapSeries.prototype.getPointShapeArgs = function (point) {
                var _a;
                var fromPos = point.fromPos,
                    toPos = point.toPos;
                if (!fromPos || !toPos) {
                    return {};
                }
                var finalWidth = this.getLinkWidth(point) / 2,
                    pointOptions = point.options,
                    markerEndOptions = merge(this.options.markerEnd,
                    pointOptions.markerEnd),
                    growTowards = pick(pointOptions.growTowards,
                    this.options.growTowards),
                    fromX = fromPos.x || 0,
                    fromY = fromPos.y || 0;
                var toX = toPos.x || 0,
                    toY = toPos.y || 0,
                    curveFactor = pick(pointOptions.curveFactor,
                    this.options.curveFactor),
                    offset = markerEndOptions && markerEndOptions.enabled &&
                        markerEndOptions.height || 0;
                if (!defined(curveFactor)) { // Automate the curveFactor value.
                    curveFactor = this.autoCurve(fromX, fromY, toX, toY, this.centerOfPoints.x, this.centerOfPoints.y);
                }
                // An offset makes room for arrows if they are specified.
                if (offset) {
                    // Prepare offset if it's a percentage by converting to number.
                    offset = relativeLength(offset, finalWidth * 4);
                    // Vector between the points.
                    var dX_1 = toX - fromX,
                        dY_1 = toY - fromY;
                    // Vector is halved.
                    dX_1 *= 0.5;
                    dY_1 *= 0.5;
                    // Vector points exactly between the points.
                    var mX_1 = fromX + dX_1,
                        mY_1 = fromY + dY_1;
                    // Rotating the halfway distance by 90 anti-clockwise.
                    // We can then use this to create an arc.
                    var tmp_1 = dX_1;
                    dX_1 = dY_1;
                    dY_1 = -tmp_1;
                    // Calculate the arc strength.
                    var arcPointX_1 = (mX_1 + dX_1 * curveFactor),
                        arcPointY_1 = (mY_1 + dY_1 * curveFactor);
                    var _b = FlowMapSeries.normalize(arcPointX_1 - toX,
                        arcPointY_1 - toY),
                        offsetX = _b[0],
                        offsetY = _b[1];
                    offsetX *= offset;
                    offsetY *= offset;
                    toX += offsetX;
                    toY += offsetY;
                }
                // Vector between the points.
                var dX = toX - fromX,
                    dY = toY - fromY;
                // Vector is halved.
                dX *= 0.5;
                dY *= 0.5;
                // Vector points exactly between the points.
                var mX = fromX + dX,
                    mY = fromY + dY;
                // Rotating the halfway distance by 90 anti-clockwise.
                // We can then use this to create an arc.
                var tmp = dX;
                dX = dY;
                dY = -tmp;
                // Weight vector calculation for the middle of the curve.
                var _c = FlowMapSeries.normalize(dX,
                    dY),
                    wX = _c[0],
                    wY = _c[1];
                // The `fineTune` prevents an obvious mismatch along the curve.
                var fineTune = 1 + Math.sqrt(curveFactor * curveFactor) * 0.25;
                wX *= finalWidth * fineTune;
                wY *= finalWidth * fineTune;
                // Calculate the arc strength.
                var arcPointX = (mX + dX * curveFactor),
                    arcPointY = (mY + dY * curveFactor);
                // Calculate edge vectors in the from-point.
                var _d = FlowMapSeries.normalize(arcPointX - fromX,
                    arcPointY - fromY),
                    fromXToArc = _d[0],
                    fromYToArc = _d[1];
                tmp = fromXToArc;
                fromXToArc = fromYToArc;
                fromYToArc = -tmp;
                fromXToArc *= finalWidth;
                fromYToArc *= finalWidth;
                // Calculate edge vectors in the to-point.
                var _e = FlowMapSeries.normalize(arcPointX - toX,
                    arcPointY - toY),
                    toXToArc = _e[0],
                    toYToArc = _e[1];
                tmp = toXToArc;
                toXToArc = -toYToArc;
                toYToArc = tmp;
                toXToArc *= finalWidth;
                toYToArc *= finalWidth;
                // Shrink the starting edge and middle thickness to make it grow
                // towards the end.
                if (growTowards) {
                    fromXToArc /= finalWidth;
                    fromYToArc /= finalWidth;
                    wX /= 4;
                    wY /= 4;
                }
                var shapeArgs = {
                        d: [[
                                'M',
                                fromX - fromXToArc,
                                fromY - fromYToArc
                            ],
                    [
                                'Q',
                                arcPointX - wX,
                                arcPointY - wY,
                                toX - toXToArc,
                                toY - toYToArc
                            ],
                    [
                                'L',
                                toX + toXToArc,
                                toY + toYToArc
                            ],
                    [
                                'Q',
                                arcPointX + wX,
                                arcPointY + wY,
                                fromX + fromXToArc,
                                fromY + fromYToArc
                            ],
                    [
                                'Z'
                            ]]
                    };
                if (markerEndOptions && markerEndOptions.enabled && shapeArgs.d) {
                    var marker = FlowMapSeries.markerEndPath([toX - toXToArc,
                        toY - toYToArc],
                        [toX + toXToArc,
                        toY + toYToArc],
                        [toPos.x,
                        toPos.y],
                        markerEndOptions);
                    (_a = shapeArgs.d).splice.apply(_a, __spreadArray([2, 0], marker, false));
                }
                // Objects converted to string to be used in tooltip.
                var fromPoint = point.options.from,
                    toPoint = point.options.to,
                    fromLat = fromPoint.lat,
                    fromLon = fromPoint.lon,
                    toLat = toPoint.lat,
                    toLon = toPoint.lon;
                if (fromLat && fromLon) {
                    point.options.from = "" + (+fromLat) + ", ".concat(+fromLon);
                }
                if (toLat && toLon) {
                    point.options.to = "" + (+toLat) + ", ".concat(+toLon);
                }
                return shapeArgs;
            };
            /**
             * A flowmap series is a series laid out on top of a map series allowing to
             * display route paths (e.g. flight or ship routes) or flows on a map. It
             * creates a link between two points on a map chart.
             *
             * @since 11.0.0
             * @extends      plotOptions.mapline
             * @excluding    affectsMapView, allAreas, allowPointSelect, boostBlending,
             * boostThreshold, borderColor, borderWidth, dashStyle, dataLabels,
             * dragDrop, joinBy, mapData, negativeColor, onPoint, shadow, showCheckbox
             * @product      highmaps
             * @requires     modules/flowmap
             * @optionparent plotOptions.flowmap
             */
            FlowMapSeries.defaultOptions = merge(MapLineSeries.defaultOptions, {
                animation: true,
                /**
                 * The `curveFactor` option for all links. Value higher than 0 will
                 * curve the link clockwise. A negative value will curve it counter
                 * clockwise. If the value is 0 the link will be a straight line. By
                 * default undefined curveFactor get an automatic curve.
                 *
                 * @sample {highmaps} maps/series-flowmap/curve-factor Setting different
                 *         values for curveFactor
                 *
                 * @type      {number}
                 * @default   undefined
                 * @apioption plotOptions.flowmap.curveFactor
                 */
                dataLabels: {
                    enabled: false
                },
                /**
                 * The fill color of all the links. If not set, the series color will be
                 * used with the opacity set in
                 * [fillOpacity](#plotOptions.flowmap.fillOpacity).
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption plotOptions.flowmap.fillColor
                 */
                /**
                 * The opacity of the color fill for all links.
                 *
                 * @type   {number}
                 * @sample {highmaps} maps/series-flowmap/fill-opacity
                 *         Setting different values for fillOpacity
                 */
                fillOpacity: 0.5,
                /**
                 * The [id](#series.id) of another series to link to. Additionally, the
                 * value can be ":previous" to link to the previous series. When two
                 * series are linked, only the first one appears in the legend. Toggling
                 * the visibility of this also toggles the linked series, which is
                 * necessary for operations such as zoom or updates on the flowmap
                 * series.
                 *
                 * @type      {string}
                 * @apioption plotOptions.flowmap.linkedTo
                 */
                /**
                 * A `markerEnd` creates an arrow symbol indicating the direction of
                 * flow at the destination. Specifying a `markerEnd` here will create
                 * one for each link.
                 *
                 * @declare Highcharts.SeriesFlowMapSeriesOptionsObject
                 */
                markerEnd: {
                    /**
                     * Enable or disable the `markerEnd`.
                     *
                     * @type   {boolean}
                     * @sample {highmaps} maps/series-flowmap/marker-end
                     *         Setting different markerType for markerEnd
                     */
                    enabled: true,
                    /**
                     * Height of the `markerEnd`. Can be a number in pixels or a
                     * percentage based on the weight of the link.
                     *
                     * @type  {number|string}
                     */
                    height: '40%',
                    /**
                     * Width of the `markerEnd`. Can be a number in pixels or a
                     * percentage based on the weight of the link.
                     *
                     * @type  {number|string}
                     */
                    width: '40%',
                    /**
                     * Change the shape of the `markerEnd`.
                     * Can be `arrow` or `mushroom`.
                     *
                     * @type {string}
                     */
                    markerType: 'arrow'
                },
                /**
                 * If no weight has previously been specified, this will set the width
                 * of all the links without being compared to and scaled according to
                 * other weights.
                 *
                 * @type  {number}
                 */
                width: 1,
                /**
                 * Maximum width of a link expressed in pixels. The weight of a link is
                 * mapped between `maxWidth` and `minWidth`.
                 *
                 * @type  {number}
                 */
                maxWidth: 25,
                /**
                 * Minimum width of a link expressed in pixels. The weight of a link is
                 * mapped between `maxWidth` and `minWidth`.
                 *
                 * @type  {number}
                 */
                minWidth: 5,
                /**
                 * Specify the `lineWidth` of the links if they are not specified.
                 *
                 * @type  {number}
                 */
                lineWidth: void 0,
                /**
                 * The opacity of all the links. Affects the opacity for the entire
                 * link, including stroke. See also
                 * [fillOpacity](#plotOptions.flowmap.fillOpacity), that affects the
                 * opacity of only the fill color.
                 *
                 * @apioption plotOptions.flowmap.opacity
                 */
                /**
                 * The weight for all links with unspecified weights. The weight of a
                 * link determines its thickness compared to other links.
                 *
                 * @sample {highmaps} maps/series-flowmap/ship-route/ Example ship route
                 *
                 * @type      {number}
                 * @product   highmaps
                 * @apioption plotOptions.flowmap.weight
                 */
                tooltip: {
                    /**
                     * The HTML for the flowmaps' route description in the tooltip. It
                     * consists of the `headerFormat` and `pointFormat`, which can be
                     * edited. Variables are enclosed by curly brackets. Available
                     * variables are `series.name`, `point.options.from`,
                     * `point.options.to`, `point.options.weight` and other properties in the
                     * same form.
                     *
                     * @product   highmaps
                     */
                    headerFormat: '<span style="font-size: 0.8em">{series.name}</span><br/>',
                    pointFormat: '{point.options.from} \u2192 {point.options.to}: <b>{point.options.weight}</b>'
                }
            });
            return FlowMapSeries;
        }(MapLineSeries));
        extend(FlowMapSeries.prototype, {
            pointClass: FlowMapPoint,
            pointArrayMap: ['from', 'to', 'weight'],
            drawPoints: ColumnSeries.prototype.drawPoints,
            // Make it work on zoom or pan.
            useMapGeometry: true
        });
        SeriesRegistry.registerSeriesType('flowmap', FlowMapSeries);
        /* *
         *
         *  Default export
         *
         * */
        /* *
         *
         *  API options
         *
         * */
        /**
         * A `flowmap` series. If the [type](#series.flowmap.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.flowmap
         * @excluding affectsMapView, allAreas, allowPointSelect, boostBlending,
         * boostThreshold, borderColor, borderWidth, dashStyle, dataLabels, dragDrop,
         * joinBy, mapData, negativeColor, onPoint, shadow, showCheckbox
         * @product   highmaps
         * @apioption series.flowmap
         */
        /**
         * An array of data points for the series. For the `flowmap` series
         * type, points can be given in the following ways:
         *
         * 1.  An array of arrays with options as values. In this case,
         *     the values correspond to `from, to, weight`. Example:
         *     ```js
         *     data: [
         *         ['Point 1', 'Point 2', 4]
         *     ]
         *     ```
         *
         * 2.  An array of objects with named values. The following snippet shows only a
         *     few settings, see the complete options set below.
         *
         *     ```js
         *     data: [{
         *         from: 'Point 1',
         *         to: 'Point 2',
         *         curveFactor: 0.4,
         *         weight: 5,
         *         growTowards: true,
         *         markerEnd: {
         *             enabled: true,
         *             height: 15,
         *             width: 8
         *         }
         *     }]
         *     ```
         *
         * 3.   For objects with named values, instead of using the `mappoint` `id`,
         *      you can use `[longitude, latitude]` arrays.
         *
         *      ```js
         *      data: [{
         *          from: [longitude, latitude],
         *          to: [longitude, latitude]
         *      }]
         *      ```
         *
         * @type      {Array<number|null|*>}
         * @apioption series.flowmap.data
         */
        /**
         * A `curveFactor` with a higher value than 0 will curve the link clockwise.
         * A negative value will curve the link counter clockwise.
         * If the value is 0 the link will be straight.
         *
         * @sample {highmaps} maps/series-flowmap/ship-route/
         *         Example ship route
         *
         * @type      {number}
         * @apioption series.flowmap.data.curveFactor
         */
        /**
         * The fill color of an individual link.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @apioption series.flowmap.data.fillColor
         */
        /**
         * ID referencing a map point holding coordinates of the link origin or
         * coordinates in terms of array of `[longitude, latitude]` or object with `lon`
         * and `lat` properties.
         *
         * @sample {highmaps} maps/series-flowmap/from-to-lon-lat
         *         Flowmap point using lonlat coordinates
         * @sample {highmaps} maps/series-flowmap/flight-routes
         *         Highmaps basic flight routes demo
         *
         * @type      {string|Highcharts.LonLatArray|Highcharts.MapLonLatObject}
         * @apioption series.flowmap.data.from
         */
        /**
         * ID referencing a map point holding coordinates of the link origin or
         * coordinates in terms of array of `[longitude, latitude]` or object with `lon`
         * and `lat` properties.
         *
         * @sample {highmaps} maps/series-flowmap/from-to-lon-lat
         *         Flowmap point using lonlat coordinates
         * @sample {highmaps} maps/series-flowmap/flight-routes
         *         Highmaps basic flight routes demo
         *
         * @type      {string|Highcharts.LonLatArray|Highcharts.MapLonLatObject}
         * @apioption series.flowmap.data.to
         */
        /**
         * The opacity of the link color fill.
         *
         * @type      {number}
         * @apioption series.flowmap.data.fillOpacity
         */
        /**
         * If set to `true`, the line will grow towards its end.
         *
         * @sample {highmaps} maps/series-flowmap/ship-route/
         *         Example ship route
         *
         * @type      {boolean}
         * @apioption series.flowmap.data.growTowards
         */
        /**
         * Specifying a `markerEnd` here will create an arrow symbol
         * indicating the direction of flow at the destination of one individual link.
         * If one has been previously specified at the higher level option it will be
         * overridden for the current link.
         *
         * @sample {highmaps} maps/series-flowmap/ship-route/
         *         Example ship route
         *
         * @type      {*|null}
         * @apioption series.flowmap.data.markerEnd
         */
        /**
         * Enable or disable the `markerEnd`.
         *
         * @type      {boolean}
         * @apioption series.flowmap.data.markerEnd.enabled
         */
        /**
         * Height of the `markerEnd`. Can be a number in pixels
         * or a percentage based on the weight of the link.
         *
         * @type      {number|string}
         * @apioption series.flowmap.data.markerEnd.height
         */
        /**
         * Width of the `markerEnd`. Can be a number in pixels
         * or a percentage based on the weight of the link.
         *
         * @type      {number|string}
         * @apioption series.flowmap.data.markerEnd.width
         */
        /**
         * Change the shape of the `markerEnd`. Can be `arrow` or `mushroom`.
         *
         * @type      {string}
         * @apioption series.flowmap.data.markerEnd.markerType
         */
        /**
         * The opacity of an individual link.
         *
         * @type      {number}
         * @apioption series.flowmap.data.opacity
         */
        /**
         * The weight of a link determines its thickness compared to
         * other links.
         *
         * @sample {highmaps} maps/series-flowmap/ship-route/
         *         Example ship route
         *
         * @type      {number}
         * @apioption series.flowmap.data.weight
         */
        /**
         * Specify the `lineWidth` of the link.
         *
         * @type  {number}
         * @apioption series.flowmap.data.lineWidth
         */
        ''; // adds doclets above to transpiled file

        return FlowMapSeries;
    });
    _registerModule(_modules, 'masters/modules/flowmap.src.js', [], function () {


    });
}));