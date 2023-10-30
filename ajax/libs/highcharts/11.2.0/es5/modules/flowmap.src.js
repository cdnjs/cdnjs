/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
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
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Series/FlowMap/FlowMapPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (SeriesRegistry, U) {
        /* *
         *
         *  (c) 2010-2023 Askel Eirik Johansson, Piotr Madej
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
    _registerModule(_modules, 'Series/FlowMap/FlowMapSeries.js', [_modules['Series/FlowMap/FlowMapPoint.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Utilities.js']], function (FlowMapPoint, SeriesRegistry, U) {
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
            MapSeries = _a.map,
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
                    var xTop = topCorner[0], yTop = topCorner[1], xMid = (xRight - xLeft) / 2 + xLeft, yMid = (yRight - yLeft) / 2 + yLeft, 
                        // Control point for curve.
                        xControl = (xTop - xMid) * 2 + xMid, yControl = (yTop - yMid) * 2 + yMid;
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