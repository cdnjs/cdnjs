/**
 * @license Highcharts JS v9.1.0 (2021-05-04)
 *
 * Old IE (v6, v7, v8) module for Highcharts v6+.
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/oldie', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Extensions/Math3D.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var pick = U.pick;
        // Mathematical Functionility
        var deg2rad = H.deg2rad;
        /* eslint-disable max-len */
        /**
         * Apply 3-D rotation
         * Euler Angles (XYZ):
         *     cosA = cos(Alfa|Roll)
         *     cosB = cos(Beta|Pitch)
         *     cosG = cos(Gamma|Yaw)
         *
         * Composite rotation:
         * |          cosB * cosG             |           cosB * sinG            |    -sinB    |
         * | sinA * sinB * cosG - cosA * sinG | sinA * sinB * sinG + cosA * cosG | sinA * cosB |
         * | cosA * sinB * cosG + sinA * sinG | cosA * sinB * sinG - sinA * cosG | cosA * cosB |
         *
         * Now, Gamma/Yaw is not used (angle=0), so we assume cosG = 1 and sinG = 0, so
         * we get:
         * |     cosB    |   0    |   - sinB    |
         * | sinA * sinB |  cosA  | sinA * cosB |
         * | cosA * sinB | - sinA | cosA * cosB |
         *
         * But in browsers, y is reversed, so we get sinA => -sinA. The general result
         * is:
         * |      cosB     |   0    |    - sinB     |     | x |     | px |
         * | - sinA * sinB |  cosA  | - sinA * cosB |  x  | y |  =  | py |
         * |  cosA * sinB  |  sinA  |  cosA * cosB  |     | z |     | pz |
         *
         * @private
         * @function rotate3D
         */
        /* eslint-enable max-len */
        /**
         * @private
         * @param {number} x
         *        X coordinate
         * @param {number} y
         *        Y coordinate
         * @param {number} z
         *        Z coordinate
         * @param {Highcharts.Rotation3dObject} angles
         *        Rotation angles
         * @return {Highcharts.Rotation3dObject}
         *         Rotated position
         */
        function rotate3D(x, y, z, angles) {
            return {
                x: angles.cosB * x - angles.sinB * z,
                y: -angles.sinA * angles.sinB * x + angles.cosA * y -
                    angles.cosB * angles.sinA * z,
                z: angles.cosA * angles.sinB * x + angles.sinA * y +
                    angles.cosA * angles.cosB * z
            };
        }
        /**
         * Perspective3D function is available in global Highcharts scope because is
         * needed also outside of perspective() function (#8042).
         * @private
         * @function Highcharts.perspective3D
         *
         * @param {Highcharts.Position3DObject} coordinate
         * 3D position
         *
         * @param {Highcharts.Position3DObject} origin
         * 3D root position
         *
         * @param {number} distance
         * Perspective distance
         *
         * @return {Highcharts.PositionObject}
         * Perspective 3D Position
         *
         * @requires highcharts-3d
         */
        function perspective3D(coordinate, origin, distance) {
            var projection = ((distance > 0) && (distance < Number.POSITIVE_INFINITY)) ?
                    distance / (coordinate.z + origin.z + distance) :
                    1;
            return {
                x: coordinate.x * projection,
                y: coordinate.y * projection
            };
        }
        H.perspective3D = perspective3D;
        /**
         * Transforms a given array of points according to the angles in chart.options.
         *
         * @private
         * @function Highcharts.perspective
         *
         * @param {Array<Highcharts.Position3DObject>} points
         * The array of points
         *
         * @param {Highcharts.Chart} chart
         * The chart
         *
         * @param {boolean} [insidePlotArea]
         * Whether to verify that the points are inside the plotArea
         *
         * @param {boolean} [useInvertedPersp]
         * Whether to use inverted perspective in calculations
         *
         * @return {Array<Highcharts.Position3DObject>}
         * An array of transformed points
         *
         * @requires highcharts-3d
         */
        function perspective(points, chart, insidePlotArea, useInvertedPersp) {
            var options3d = chart.options.chart.options3d, 
                /* The useInvertedPersp argument is used for
                 * inverted charts with already inverted elements,
                 * such as dataLabels or tooltip positions.
                 */
                inverted = pick(useInvertedPersp,
                insidePlotArea ? chart.inverted : false),
                origin = {
                    x: chart.plotWidth / 2,
                    y: chart.plotHeight / 2,
                    z: options3d.depth / 2,
                    vd: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0)
                },
                scale = chart.scale3d || 1,
                beta = deg2rad * options3d.beta * (inverted ? -1 : 1),
                alpha = deg2rad * options3d.alpha * (inverted ? -1 : 1),
                angles = {
                    cosA: Math.cos(alpha),
                    cosB: Math.cos(-beta),
                    sinA: Math.sin(alpha),
                    sinB: Math.sin(-beta)
                };
            if (!insidePlotArea) {
                origin.x += chart.plotLeft;
                origin.y += chart.plotTop;
            }
            // Transform each point
            return points.map(function (point) {
                var rotated = rotate3D((inverted ? point.y : point.x) - origin.x, (inverted ? point.x : point.y) - origin.y, (point.z || 0) - origin.z,
                    angles), 
                    // Apply perspective
                    coordinate = perspective3D(rotated,
                    origin,
                    origin.vd);
                // Apply translation
                coordinate.x = coordinate.x * scale + origin.x;
                coordinate.y = coordinate.y * scale + origin.y;
                coordinate.z = rotated.z * scale + origin.z;
                return {
                    x: (inverted ? coordinate.y : coordinate.x),
                    y: (inverted ? coordinate.x : coordinate.y),
                    z: coordinate.z
                };
            });
        }
        H.perspective = perspective;
        /**
         * Calculate a distance from camera to points - made for calculating zIndex of
         * scatter points.
         *
         * @private
         * @function Highcharts.pointCameraDistance
         *
         * @param {Highcharts.Dictionary<number>} coordinates
         * Coordinates of the specific point
         *
         * @param {Highcharts.Chart} chart
         * Related chart
         *
         * @return {number}
         * Distance from camera to point
         *
         * @requires highcharts-3d
         */
        function pointCameraDistance(coordinates, chart) {
            var options3d = chart.options.chart.options3d,
                cameraPosition = {
                    x: chart.plotWidth / 2,
                    y: chart.plotHeight / 2,
                    z: pick(options3d.depth, 1) * pick(options3d.viewDistance, 0) +
                        options3d.depth
                }, 
                // Added support for objects with plotX or x coordinates.
                distance = Math.sqrt(Math.pow(cameraPosition.x - pick(coordinates.plotX,
                coordinates.x), 2) +
                    Math.pow(cameraPosition.y - pick(coordinates.plotY,
                coordinates.y), 2) +
                    Math.pow(cameraPosition.z - pick(coordinates.plotZ,
                coordinates.z), 2));
            return distance;
        }
        H.pointCameraDistance = pointCameraDistance;
        /**
         * Calculate area of a 2D polygon using Shoelace algorithm
         * https://en.wikipedia.org/wiki/Shoelace_formula
         *
         * @private
         * @function Highcharts.shapeArea
         *
         * @param {Array<Highcharts.PositionObject>} vertexes
         * 2D Polygon
         *
         * @return {number}
         * Calculated area
         *
         * @requires highcharts-3d
         */
        function shapeArea(vertexes) {
            var area = 0,
                i,
                j;
            for (i = 0; i < vertexes.length; i++) {
                j = (i + 1) % vertexes.length;
                area += vertexes[i].x * vertexes[j].y - vertexes[j].x * vertexes[i].y;
            }
            return area / 2;
        }
        H.shapeArea = shapeArea;
        /**
         * Calculate area of a 3D polygon after perspective projection
         *
         * @private
         * @function Highcharts.shapeArea3d
         *
         * @param {Array<Highcharts.Position3DObject>} vertexes
         * 3D Polygon
         *
         * @param {Highcharts.Chart} chart
         * Related chart
         *
         * @param {boolean} [insidePlotArea]
         * Whether to verify that the points are inside the plotArea
         *
         * @return {number}
         * Calculated area
         *
         * @requires highcharts-3d
         */
        function shapeArea3D(vertexes, chart, insidePlotArea) {
            return shapeArea(perspective(vertexes, chart, insidePlotArea));
        }
        H.shapeArea3d = shapeArea3D;
        var mathModule = {
                perspective: perspective,
                perspective3D: perspective3D,
                pointCameraDistance: pointCameraDistance,
                shapeArea: shapeArea,
                shapeArea3D: shapeArea3D
            };

        return mathModule;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGElement3D.js', [_modules['Core/Color/Color.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (Color, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  Extensions to the SVGRenderer class to enable 3D shapes
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var defined = U.defined,
            merge = U.merge,
            objectEach = U.objectEach,
            pick = U.pick;
        /* *
         *
         *  Namespace
         *
         * */
        var SVGElement3D;
        (function (SVGElement3D) {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            SVGElement3D.base = {
                /**
                 * The init is used by base - renderer.Element
                 * @private
                 */
                initArgs: function (args) {
                    var elem3d = this,
                        renderer = elem3d.renderer,
                        paths = renderer[elem3d.pathType + 'Path'](args),
                        zIndexes = paths.zIndexes;
                    // build parts
                    elem3d.parts.forEach(function (part) {
                        elem3d[part] = renderer.path(paths[part]).attr({
                            'class': 'highcharts-3d-' + part,
                            zIndex: zIndexes[part] || 0
                        }).add(elem3d);
                    });
                    elem3d.attr({
                        'stroke-linejoin': 'round',
                        zIndex: zIndexes.group
                    });
                    // store original destroy
                    elem3d.originalDestroy = elem3d.destroy;
                    elem3d.destroy = elem3d.destroyParts;
                    // Store information if any side of element was rendered by force.
                    elem3d.forcedSides = paths.forcedSides;
                },
                /**
                 * Single property setter that applies options to each part
                 * @private
                 */
                singleSetterForParts: function (prop, val, values, verb, duration, complete) {
                    var elem3d = this,
                        newAttr = {},
                        optionsToApply = [null,
                        null, (verb || 'attr'),
                        duration,
                        complete],
                        hasZIndexes = values && values.zIndexes;
                    if (!values) {
                        newAttr[prop] = val;
                        optionsToApply[0] = newAttr;
                    }
                    else {
                        // It is needed to deal with the whole group zIndexing
                        // in case of graph rotation
                        if (hasZIndexes && hasZIndexes.group) {
                            this.attr({
                                zIndex: hasZIndexes.group
                            });
                        }
                        objectEach(values, function (partVal, part) {
                            newAttr[part] = {};
                            newAttr[part][prop] = partVal;
                            // include zIndexes if provided
                            if (hasZIndexes) {
                                newAttr[part].zIndex = values.zIndexes[part] || 0;
                            }
                        });
                        optionsToApply[1] = newAttr;
                    }
                    return elem3d.processParts.apply(elem3d, optionsToApply);
                },
                /**
                 * Calls function for each part. Used for attr, animate and destroy.
                 * @private
                 */
                processParts: function (props, partsProps, verb, duration, complete) {
                    var elem3d = this;
                    elem3d.parts.forEach(function (part) {
                        // if different props for different parts
                        if (partsProps) {
                            props = pick(partsProps[part], false);
                        }
                        // only if something to set, but allow undefined
                        if (props !== false) {
                            elem3d[part][verb](props, duration, complete);
                        }
                    });
                    return elem3d;
                },
                /**
                 * Destroy all parts
                 * @private
                 */
                destroyParts: function () {
                    this.processParts(null, null, 'destroy');
                    return this.originalDestroy();
                }
            };
            SVGElement3D.cuboid = merge(SVGElement3D.base, {
                parts: ['front', 'top', 'side'],
                pathType: 'cuboid',
                attr: function (args, val, complete, continueAnimation) {
                    // Resolve setting attributes by string name
                    if (typeof args === 'string' && typeof val !== 'undefined') {
                        var key = args;
                        args = {};
                        args[key] = val;
                    }
                    if (args.shapeArgs || defined(args.x)) {
                        return this.singleSetterForParts('d', null, this.renderer[this.pathType + 'Path'](args.shapeArgs || args));
                    }
                    return SVGElement.prototype.attr.call(this, args, void 0, complete, continueAnimation);
                },
                animate: function (args, duration, complete) {
                    if (defined(args.x) && defined(args.y)) {
                        var paths = this.renderer[this.pathType + 'Path'](args),
                            forcedSides = paths.forcedSides;
                        this.singleSetterForParts('d', null, paths, 'animate', duration, complete);
                        this.attr({
                            zIndex: paths.zIndexes.group
                        });
                        // If sides that are forced to render changed, recalculate
                        // colors.
                        if (forcedSides !== this.forcedSides) {
                            this.forcedSides = forcedSides;
                            SVGElement3D.cuboid.fillSetter.call(this, this.fill);
                        }
                    }
                    else {
                        SVGElement.prototype.animate.call(this, args, duration, complete);
                    }
                    return this;
                },
                fillSetter: function (fill) {
                    var elem3d = this;
                    elem3d.forcedSides = elem3d.forcedSides || [];
                    elem3d.singleSetterForParts('fill', null, {
                        front: fill,
                        // Do not change color if side was forced to render.
                        top: color(fill).brighten(elem3d.forcedSides.indexOf('top') >= 0 ? 0 : 0.1).get(),
                        side: color(fill).brighten(elem3d.forcedSides.indexOf('side') >= 0 ? 0 : -0.1).get()
                    });
                    // fill for animation getter (#6776)
                    elem3d.color = elem3d.fill = fill;
                    return elem3d;
                }
            });
            /* eslint-enable valid-jsdoc */
        })(SVGElement3D || (SVGElement3D = {}));

        return SVGElement3D;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGRenderer3D.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Extensions/Math3D.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Renderer/SVG/SVGElement3D.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (A, Color, H, Math3D, SVGElement, SVGElement3D, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  Extensions to the SVGRenderer class to enable 3D shapes
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var animObject = A.animObject;
        var color = Color.parse;
        var charts = H.charts,
            deg2rad = H.deg2rad;
        var perspective = Math3D.perspective,
            shapeArea = Math3D.shapeArea;
        var defined = U.defined,
            extend = U.extend,
            merge = U.merge,
            pick = U.pick;
        /* *
         *
         *  Constants
         *
         * */
        var cos = Math.cos,
            sin = Math.sin,
            PI = Math.PI,
            dFactor = (4 * (Math.sqrt(2) - 1) / 3) / (PI / 2);
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * Method to construct a curved path. Can 'wrap' around more then 180 degrees.
         * @private
         */
        function curveTo(cx, cy, rx, ry, start, end, dx, dy) {
            var result = [],
                arcAngle = end - start;
            if ((end > start) && (end - start > Math.PI / 2 + 0.0001)) {
                result = result.concat(curveTo(cx, cy, rx, ry, start, start + (Math.PI / 2), dx, dy));
                result = result.concat(curveTo(cx, cy, rx, ry, start + (Math.PI / 2), end, dx, dy));
                return result;
            }
            if ((end < start) && (start - end > Math.PI / 2 + 0.0001)) {
                result = result.concat(curveTo(cx, cy, rx, ry, start, start - (Math.PI / 2), dx, dy));
                result = result.concat(curveTo(cx, cy, rx, ry, start - (Math.PI / 2), end, dx, dy));
                return result;
            }
            return [[
                    'C',
                    cx + (rx * Math.cos(start)) -
                        ((rx * dFactor * arcAngle) * Math.sin(start)) + dx,
                    cy + (ry * Math.sin(start)) +
                        ((ry * dFactor * arcAngle) * Math.cos(start)) + dy,
                    cx + (rx * Math.cos(end)) +
                        ((rx * dFactor * arcAngle) * Math.sin(end)) + dx,
                    cy + (ry * Math.sin(end)) -
                        ((ry * dFactor * arcAngle) * Math.cos(end)) + dy,
                    cx + (rx * Math.cos(end)) + dx,
                    cy + (ry * Math.sin(end)) + dy
                ]];
        }
        /* *
         *
         *  Composition
         *
         * */
        SVGRenderer.prototype.elements3d = SVGElement3D;
        SVGRenderer.prototype.toLinePath = function (points, closed) {
            var result = [];
            // Put "L x y" for each point
            points.forEach(function (point) {
                result.push(['L', point.x, point.y]);
            });
            if (points.length) {
                // Set the first element to M
                result[0][0] = 'M';
                // If it is a closed line, add Z
                if (closed) {
                    result.push(['Z']);
                }
            }
            return result;
        };
        SVGRenderer.prototype.toLineSegments = function (points) {
            var result = [],
                m = true;
            points.forEach(function (point) {
                result.push(m ? ['M', point.x, point.y] : ['L', point.x, point.y]);
                m = !m;
            });
            return result;
        };
        // A 3-D Face is defined by it's 3D vertexes, and is only visible if it's
        // vertexes are counter-clockwise (Back-face culling). It is used as a
        // polyhedron Element
        SVGRenderer.prototype.face3d = function (args) {
            var renderer = this,
                ret = this.createElement('path');
            ret.vertexes = [];
            ret.insidePlotArea = false;
            ret.enabled = true;
            /* eslint-disable no-invalid-this */
            ret.attr = function (hash) {
                if (typeof hash === 'object' &&
                    (defined(hash.enabled) ||
                        defined(hash.vertexes) ||
                        defined(hash.insidePlotArea))) {
                    this.enabled = pick(hash.enabled, this.enabled);
                    this.vertexes = pick(hash.vertexes, this.vertexes);
                    this.insidePlotArea = pick(hash.insidePlotArea, this.insidePlotArea);
                    delete hash.enabled;
                    delete hash.vertexes;
                    delete hash.insidePlotArea;
                    var chart = charts[renderer.chartIndex],
                        vertexes2d = perspective(this.vertexes,
                        chart,
                        this.insidePlotArea),
                        path = renderer.toLinePath(vertexes2d,
                        true),
                        area = shapeArea(vertexes2d);
                    hash.d = path;
                    hash.visibility = (this.enabled && area > 0) ? 'visible' : 'hidden';
                }
                return SVGElement.prototype.attr.apply(this, arguments);
            };
            ret.animate = function (params) {
                if (typeof params === 'object' &&
                    (defined(params.enabled) ||
                        defined(params.vertexes) ||
                        defined(params.insidePlotArea))) {
                    this.enabled = pick(params.enabled, this.enabled);
                    this.vertexes = pick(params.vertexes, this.vertexes);
                    this.insidePlotArea = pick(params.insidePlotArea, this.insidePlotArea);
                    delete params.enabled;
                    delete params.vertexes;
                    delete params.insidePlotArea;
                    var chart = charts[renderer.chartIndex],
                        vertexes2d = perspective(this.vertexes,
                        chart,
                        this.insidePlotArea),
                        path = renderer.toLinePath(vertexes2d,
                        true),
                        area = shapeArea(vertexes2d),
                        visibility = (this.enabled && area > 0) ? 'visible' : 'hidden';
                    params.d = path;
                    this.attr('visibility', visibility);
                }
                return SVGElement.prototype.animate.apply(this, arguments);
            };
            /* eslint-enable no-invalid-this */
            return ret.attr(args);
        };
        // A Polyhedron is a handy way of defining a group of 3-D faces. It's only
        // attribute is `faces`, an array of attributes of each one of it's Face3D
        // instances.
        SVGRenderer.prototype.polyhedron = function (args) {
            var renderer = this,
                result = this.g(),
                destroy = result.destroy;
            if (!this.styledMode) {
                result.attr({
                    'stroke-linejoin': 'round'
                });
            }
            result.faces = [];
            /* eslint-disable no-invalid-this */
            // destroy all children
            result.destroy = function () {
                for (var i = 0; i < result.faces.length; i++) {
                    result.faces[i].destroy();
                }
                return destroy.call(this);
            };
            result.attr = function (hash, val, complete, continueAnimation) {
                if (typeof hash === 'object' && defined(hash.faces)) {
                    while (result.faces.length > hash.faces.length) {
                        result.faces.pop().destroy();
                    }
                    while (result.faces.length < hash.faces.length) {
                        result.faces.push(renderer.face3d().add(result));
                    }
                    for (var i = 0; i < hash.faces.length; i++) {
                        if (renderer.styledMode) {
                            delete hash.faces[i].fill;
                        }
                        result.faces[i].attr(hash.faces[i], null, complete, continueAnimation);
                    }
                    delete hash.faces;
                }
                return SVGElement.prototype.attr.apply(this, arguments);
            };
            result.animate = function (params, duration, complete) {
                if (params && params.faces) {
                    while (result.faces.length > params.faces.length) {
                        result.faces.pop().destroy();
                    }
                    while (result.faces.length < params.faces.length) {
                        result.faces.push(renderer.face3d().add(result));
                    }
                    for (var i = 0; i < params.faces.length; i++) {
                        result.faces[i].animate(params.faces[i], duration, complete);
                    }
                    delete params.faces;
                }
                return SVGElement.prototype.animate.apply(this, arguments);
            };
            /* eslint-enable no-invalid-this */
            return result.attr(args);
        };
        /**
         * return result, generalization
         * @private
         * @requires highcharts-3d
         */
        SVGRenderer.prototype.element3d = function (type, shapeArgs) {
            // base
            var ret = this.g();
            // extend
            extend(ret, this.elements3d[type]);
            // init
            ret.initArgs(shapeArgs);
            // return
            return ret;
        };
        // generelized, so now use simply
        SVGRenderer.prototype.cuboid = function (shapeArgs) {
            return this.element3d('cuboid', shapeArgs);
        };
        // Generates a cuboid path and zIndexes
        SVGRenderer.prototype.cuboidPath = function (shapeArgs) {
            var x = shapeArgs.x || 0,
                y = shapeArgs.y || 0,
                z = shapeArgs.z || 0, 
                // For side calculation (right/left)
                // there is a need for height (and other shapeArgs arguments)
                // to be at least 1px
                h = shapeArgs.height || 0,
                w = shapeArgs.width || 0,
                d = shapeArgs.depth || 0,
                chart = charts[this.chartIndex],
                front,
                back,
                top,
                bottom,
                left,
                right,
                shape,
                path1,
                path2,
                path3,
                isFront,
                isTop,
                isRight,
                options3d = chart.options.chart.options3d,
                alpha = options3d.alpha, 
                // Priority for x axis is the biggest,
                // because of x direction has biggest influence on zIndex
                incrementX = 1000000, 
                // y axis has the smallest priority in case of our charts
                // (needs to be set because of stacking)
                incrementY = 10,
                incrementZ = 100,
                zIndex = 0, 
                // The 8 corners of the cube
                pArr = [{
                        x: x,
                        y: y,
                        z: z
                    }, {
                        x: x + w,
                        y: y,
                        z: z
                    }, {
                        x: x + w,
                        y: y + h,
                        z: z
                    }, {
                        x: x,
                        y: y + h,
                        z: z
                    }, {
                        x: x,
                        y: y + h,
                        z: z + d
                    }, {
                        x: x + w,
                        y: y + h,
                        z: z + d
                    }, {
                        x: x + w,
                        y: y,
                        z: z + d
                    }, {
                        x: x,
                        y: y,
                        z: z + d
                    }],
                forcedSides = [],
                pickShape;
            // apply perspective
            pArr = perspective(pArr, chart, shapeArgs.insidePlotArea);
            /**
             * helper method to decide which side is visible
             * @private
             */
            function mapSidePath(i) {
                // Added support for 0 value in columns, where height is 0
                // but the shape is rendered.
                // Height is used from 1st to 6th element of pArr
                if (h === 0 && i > 1 && i < 6) { // [2, 3, 4, 5]
                    return {
                        x: pArr[i].x,
                        // when height is 0 instead of cuboid we render plane
                        // so it is needed to add fake 10 height to imitate cuboid
                        // for side calculation
                        y: pArr[i].y + 10,
                        z: pArr[i].z
                    };
                }
                // It is needed to calculate dummy sides (front/back) for breaking
                // points in case of x and depth values. If column has side,
                // it means that x values of front and back side are different.
                if (pArr[0].x === pArr[7].x && i >= 4) { // [4, 5, 6, 7]
                    return {
                        x: pArr[i].x + 10,
                        // when height is 0 instead of cuboid we render plane
                        // so it is needed to add fake 10 height to imitate cuboid
                        // for side calculation
                        y: pArr[i].y,
                        z: pArr[i].z
                    };
                }
                // Added dummy depth
                if (d === 0 && i < 2 || i > 5) { // [0, 1, 6, 7]
                    return {
                        x: pArr[i].x,
                        // when height is 0 instead of cuboid we render plane
                        // so it is needed to add fake 10 height to imitate cuboid
                        // for side calculation
                        y: pArr[i].y,
                        z: pArr[i].z + 10
                    };
                }
                return pArr[i];
            }
            /**
             * method creating the final side
             * @private
             */
            function mapPath(i) {
                return pArr[i];
            }
            /**
             * First value - path with specific face
             * Second  value - added information about side for later calculations.
             * Possible second values are 0 for path1, 1 for path2 and -1 for no path
             * chosen.
             * Third value - string containing information about current side
             * of cuboid for forcing side rendering.
             * @private
             */
            pickShape = function (verticesIndex1, verticesIndex2, side) {
                var ret = [[], -1], 
                    // An array of vertices for cuboid face
                    face1 = verticesIndex1.map(mapPath),
                    face2 = verticesIndex2.map(mapPath), 
                    // dummy face is calculated the same way as standard face,
                    // but if cuboid height is 0 additional height is added so it is
                    // possible to use this vertices array for visible face calculation
                    dummyFace1 = verticesIndex1.map(mapSidePath),
                    dummyFace2 = verticesIndex2.map(mapSidePath);
                if (shapeArea(face1) < 0) {
                    ret = [face1, 0];
                }
                else if (shapeArea(face2) < 0) {
                    ret = [face2, 1];
                }
                else if (side) {
                    forcedSides.push(side);
                    if (shapeArea(dummyFace1) < 0) {
                        ret = [face1, 0];
                    }
                    else if (shapeArea(dummyFace2) < 0) {
                        ret = [face2, 1];
                    }
                    else {
                        ret = [face1, 0]; // force side calculation.
                    }
                }
                return ret;
            };
            // front or back
            front = [3, 2, 1, 0];
            back = [7, 6, 5, 4];
            shape = pickShape(front, back, 'front');
            path1 = shape[0];
            isFront = shape[1];
            // top or bottom
            top = [1, 6, 7, 0];
            bottom = [4, 5, 2, 3];
            shape = pickShape(top, bottom, 'top');
            path2 = shape[0];
            isTop = shape[1];
            // side
            right = [1, 2, 5, 6];
            left = [0, 7, 4, 3];
            shape = pickShape(right, left, 'side');
            path3 = shape[0];
            isRight = shape[1];
            /* New block used for calculating zIndex. It is basing on X, Y and Z
               position of specific columns. All zIndexes (for X, Y and Z values) are
               added to the final zIndex, where every value has different priority. The
               biggest priority is in X and Z directions, the lowest index is for
               stacked columns (Y direction and the same X and Z positions). Big
               differences between priorities is made because we need to ensure that
               even for big changes in Y and Z parameters all columns will be drawn
               correctly. */
            if (isRight === 1) {
                // It is needed to connect value with current chart width
                // for big chart size.
                zIndex += incrementX * (chart.plotWidth - x);
            }
            else if (!isRight) {
                zIndex += incrementX * x;
            }
            zIndex += incrementY * (!isTop ||
                // Numbers checked empirically
                (alpha >= 0 && alpha <= 180 || alpha < 360 && alpha > 357.5) ?
                chart.plotHeight - y : 10 + y);
            if (isFront === 1) {
                zIndex += incrementZ * (z);
            }
            else if (!isFront) {
                zIndex += incrementZ * (1000 - z);
            }
            return {
                front: this.toLinePath(path1, true),
                top: this.toLinePath(path2, true),
                side: this.toLinePath(path3, true),
                zIndexes: {
                    group: Math.round(zIndex)
                },
                forcedSides: forcedSides,
                // additional info about zIndexes
                isFront: isFront,
                isTop: isTop
            }; // #4774
        };
        // SECTORS //
        SVGRenderer.prototype.arc3d = function (attribs) {
            var wrapper = this.g(), renderer = wrapper.renderer, customAttribs = ['x', 'y', 'r', 'innerR', 'start', 'end', 'depth'];
            /**
             * Get custom attributes. Don't mutate the original object and return an
             * object with only custom attr.
             * @private
             */
            function suckOutCustom(params) {
                var hasCA = false,
                    ca = {},
                    key;
                params = merge(params); // Don't mutate the original object
                for (key in params) {
                    if (customAttribs.indexOf(key) !== -1) {
                        ca[key] = params[key];
                        delete params[key];
                        hasCA = true;
                    }
                }
                return hasCA ? [ca, params] : false;
            }
            attribs = merge(attribs);
            attribs.alpha = (attribs.alpha || 0) * deg2rad;
            attribs.beta = (attribs.beta || 0) * deg2rad;
            // Create the different sub sections of the shape
            wrapper.top = renderer.path();
            wrapper.side1 = renderer.path();
            wrapper.side2 = renderer.path();
            wrapper.inn = renderer.path();
            wrapper.out = renderer.path();
            /* eslint-disable no-invalid-this */
            // Add all faces
            wrapper.onAdd = function () {
                var parent = wrapper.parentGroup,
                    className = wrapper.attr('class');
                wrapper.top.add(wrapper);
                // These faces are added outside the wrapper group because the z index
                // relates to neighbour elements as well
                ['out', 'inn', 'side1', 'side2'].forEach(function (face) {
                    wrapper[face]
                        .attr({
                        'class': className + ' highcharts-3d-side'
                    })
                        .add(parent);
                });
            };
            // Cascade to faces
            ['addClass', 'removeClass'].forEach(function (fn) {
                wrapper[fn] = function () {
                    var args = arguments;
                    ['top', 'out', 'inn', 'side1', 'side2'].forEach(function (face) {
                        wrapper[face][fn].apply(wrapper[face], args);
                    });
                };
            });
            /**
             * Compute the transformed paths and set them to the composite shapes
             * @private
             */
            wrapper.setPaths = function (attribs) {
                var paths = wrapper.renderer.arc3dPath(attribs),
                    zIndex = paths.zTop * 100;
                wrapper.attribs = attribs;
                wrapper.top.attr({ d: paths.top, zIndex: paths.zTop });
                wrapper.inn.attr({ d: paths.inn, zIndex: paths.zInn });
                wrapper.out.attr({ d: paths.out, zIndex: paths.zOut });
                wrapper.side1.attr({ d: paths.side1, zIndex: paths.zSide1 });
                wrapper.side2.attr({ d: paths.side2, zIndex: paths.zSide2 });
                // show all children
                wrapper.zIndex = zIndex;
                wrapper.attr({ zIndex: zIndex });
                // Set the radial gradient center the first time
                if (attribs.center) {
                    wrapper.top.setRadialReference(attribs.center);
                    delete attribs.center;
                }
            };
            wrapper.setPaths(attribs);
            /**
             * Apply the fill to the top and a darker shade to the sides
             * @private
             */
            wrapper.fillSetter = function (value) {
                var darker = color(value).brighten(-0.1).get();
                this.fill = value;
                this.side1.attr({ fill: darker });
                this.side2.attr({ fill: darker });
                this.inn.attr({ fill: darker });
                this.out.attr({ fill: darker });
                this.top.attr({ fill: value });
                return this;
            };
            // Apply the same value to all. These properties cascade down to the
            // children when set to the composite arc3d.
            ['opacity', 'translateX', 'translateY', 'visibility'].forEach(function (setter) {
                wrapper[setter + 'Setter'] = function (value, key) {
                    wrapper[key] = value;
                    ['out', 'inn', 'side1', 'side2', 'top'].forEach(function (el) {
                        wrapper[el].attr(key, value);
                    });
                };
            });
            // Override attr to remove shape attributes and use those to set child paths
            wrapper.attr = function (params) {
                var ca,
                    paramArr;
                if (typeof params === 'object') {
                    paramArr = suckOutCustom(params);
                    if (paramArr) {
                        ca = paramArr[0];
                        arguments[0] = paramArr[1];
                        extend(wrapper.attribs, ca);
                        wrapper.setPaths(wrapper.attribs);
                    }
                }
                return SVGElement.prototype.attr.apply(wrapper, arguments);
            };
            // Override the animate function by sucking out custom parameters related to
            // the shapes directly, and update the shapes from the animation step.
            wrapper.animate = function (params, animation, complete) {
                var paramArr,
                    from = this.attribs,
                    to,
                    anim,
                    randomProp = 'data-' + Math.random().toString(26).substring(2, 9);
                // Attribute-line properties connected to 3D. These shouldn't have been
                // in the attribs collection in the first place.
                delete params.center;
                delete params.z;
                delete params.alpha;
                delete params.beta;
                anim = animObject(pick(animation, this.renderer.globalAnimation));
                if (anim.duration) {
                    paramArr = suckOutCustom(params);
                    // Params need to have a property in order for the step to run
                    // (#5765, #7097, #7437)
                    wrapper[randomProp] = 0;
                    params[randomProp] = 1;
                    wrapper[randomProp + 'Setter'] = H.noop;
                    if (paramArr) {
                        to = paramArr[0]; // custom attr
                        anim.step = function (a, fx) {
                            /**
                             * @private
                             */
                            function interpolate(key) {
                                return from[key] + (pick(to[key], from[key]) -
                                    from[key]) * fx.pos;
                            }
                            if (fx.prop === randomProp) {
                                fx.elem.setPaths(merge(from, {
                                    x: interpolate('x'),
                                    y: interpolate('y'),
                                    r: interpolate('r'),
                                    innerR: interpolate('innerR'),
                                    start: interpolate('start'),
                                    end: interpolate('end'),
                                    depth: interpolate('depth')
                                }));
                            }
                        };
                    }
                    animation = anim; // Only when duration (#5572)
                }
                return SVGElement.prototype.animate.call(this, params, animation, complete);
            };
            // destroy all children
            wrapper.destroy = function () {
                this.top.destroy();
                this.out.destroy();
                this.inn.destroy();
                this.side1.destroy();
                this.side2.destroy();
                return SVGElement.prototype.destroy.call(this);
            };
            // hide all children
            wrapper.hide = function () {
                this.top.hide();
                this.out.hide();
                this.inn.hide();
                this.side1.hide();
                this.side2.hide();
            };
            wrapper.show = function (inherit) {
                this.top.show(inherit);
                this.out.show(inherit);
                this.inn.show(inherit);
                this.side1.show(inherit);
                this.side2.show(inherit);
            };
            /* eslint-enable no-invalid-this */
            return wrapper;
        };
        // Generate the paths required to draw a 3D arc
        SVGRenderer.prototype.arc3dPath = function (shapeArgs) {
            var cx = shapeArgs.x || 0, // x coordinate of the center
                cy = shapeArgs.y || 0, // y coordinate of the center
                start = shapeArgs.start || 0, // start angle
                end = (shapeArgs.end || 0) - 0.00001, // end angle
                r = shapeArgs.r || 0, // radius
                ir = shapeArgs.innerR || 0, // inner radius
                d = shapeArgs.depth || 0, // depth
                alpha = shapeArgs.alpha || 0, // alpha rotation of the chart
                beta = shapeArgs.beta || 0; // beta rotation of the chart
                // Derived Variables
                var cs = Math.cos(start), // cosinus of the start angle
                ss = Math.sin(start), // sinus of the start angle
                ce = Math.cos(end), // cosinus of the end angle
                se = Math.sin(end), // sinus of the end angle
                rx = r * Math.cos(beta), // x-radius
                ry = r * Math.cos(alpha), // y-radius
                irx = ir * Math.cos(beta), // x-radius (inner)
                iry = ir * Math.cos(alpha), // y-radius (inner)
                dx = d * Math.sin(beta), // distance between top and bottom in x
                dy = d * Math.sin(alpha); // distance between top and bottom in y
                // TOP
                var top = [
                    ['M',
                cx + (rx * cs),
                cy + (ry * ss)]
                ];
            top = top.concat(curveTo(cx, cy, rx, ry, start, end, 0, 0));
            top.push([
                'L', cx + (irx * ce), cy + (iry * se)
            ]);
            top = top.concat(curveTo(cx, cy, irx, iry, end, start, 0, 0));
            top.push(['Z']);
            // OUTSIDE
            var b = (beta > 0 ? Math.PI / 2 : 0),
                a = (alpha > 0 ? 0 : Math.PI / 2);
            var start2 = start > -b ? start : (end > -b ? -b : start),
                end2 = end < PI - a ? end : (start < PI - a ? PI - a : end),
                midEnd = 2 * PI - a;
            // When slice goes over bottom middle, need to add both, left and right
            // outer side. Additionally, when we cross right hand edge, create sharp
            // edge. Outer shape/wall:
            //
            //            -------
            //          /    ^    \
            //    4)   /   /   \   \  1)
            //        /   /     \   \
            //       /   /       \   \
            // (c)=> ====         ==== <=(d)
            //       \   \       /   /
            //        \   \<=(a)/   /
            //         \   \   /   / <=(b)
            //    3)    \    v    /  2)
            //            -------
            //
            // (a) - inner side
            // (b) - outer side
            // (c) - left edge (sharp)
            // (d) - right edge (sharp)
            // 1..n - rendering order for startAngle = 0, when set to e.g 90, order
            // changes clockwise (1->2, 2->3, n->1) and counterclockwise for negative
            // startAngle
            var out = [
                    ['M',
                cx + (rx * cos(start2)),
                cy + (ry * sin(start2))]
                ];
            out = out.concat(curveTo(cx, cy, rx, ry, start2, end2, 0, 0));
            // When shape is wide, it can cross both, (c) and (d) edges, when using
            // startAngle
            if (end > midEnd && start < midEnd) {
                // Go to outer side
                out.push([
                    'L', cx + (rx * cos(end2)) + dx, cy + (ry * sin(end2)) + dy
                ]);
                // Curve to the right edge of the slice (d)
                out = out.concat(curveTo(cx, cy, rx, ry, end2, midEnd, dx, dy));
                // Go to the inner side
                out.push([
                    'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
                ]);
                // Curve to the true end of the slice
                out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end, 0, 0));
                // Go to the outer side
                out.push([
                    'L', cx + (rx * cos(end)) + dx, cy + (ry * sin(end)) + dy
                ]);
                // Go back to middle (d)
                out = out.concat(curveTo(cx, cy, rx, ry, end, midEnd, dx, dy));
                out.push([
                    'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
                ]);
                // Go back to the left edge
                out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end2, 0, 0));
                // But shape can cross also only (c) edge:
            }
            else if (end > PI - a && start < PI - a) {
                // Go to outer side
                out.push([
                    'L',
                    cx + (rx * Math.cos(end2)) + dx,
                    cy + (ry * Math.sin(end2)) + dy
                ]);
                // Curve to the true end of the slice
                out = out.concat(curveTo(cx, cy, rx, ry, end2, end, dx, dy));
                // Go to the inner side
                out.push([
                    'L', cx + (rx * Math.cos(end)), cy + (ry * Math.sin(end))
                ]);
                // Go back to the artifical end2
                out = out.concat(curveTo(cx, cy, rx, ry, end, end2, 0, 0));
            }
            out.push([
                'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
            ]);
            out = out.concat(curveTo(cx, cy, rx, ry, end2, start2, dx, dy));
            out.push(['Z']);
            // INSIDE
            var inn = [
                    ['M',
                cx + (irx * cs),
                cy + (iry * ss)]
                ];
            inn = inn.concat(curveTo(cx, cy, irx, iry, start, end, 0, 0));
            inn.push([
                'L', cx + (irx * Math.cos(end)) + dx, cy + (iry * Math.sin(end)) + dy
            ]);
            inn = inn.concat(curveTo(cx, cy, irx, iry, end, start, dx, dy));
            inn.push(['Z']);
            // SIDES
            var side1 = [
                    ['M',
                cx + (rx * cs),
                cy + (ry * ss)],
                    ['L',
                cx + (rx * cs) + dx,
                cy + (ry * ss) + dy],
                    ['L',
                cx + (irx * cs) + dx,
                cy + (iry * ss) + dy],
                    ['L',
                cx + (irx * cs),
                cy + (iry * ss)],
                    ['Z']
                ];
            var side2 = [
                    ['M',
                cx + (rx * ce),
                cy + (ry * se)],
                    ['L',
                cx + (rx * ce) + dx,
                cy + (ry * se) + dy],
                    ['L',
                cx + (irx * ce) + dx,
                cy + (iry * se) + dy],
                    ['L',
                cx + (irx * ce),
                cy + (iry * se)],
                    ['Z']
                ];
            // correction for changed position of vanishing point caused by alpha and
            // beta rotations
            var angleCorr = Math.atan2(dy, -dx),
                angleEnd = Math.abs(end + angleCorr),
                angleStart = Math.abs(start + angleCorr),
                angleMid = Math.abs((start + end) / 2 + angleCorr);
            /**
             * set to 0-PI range
             * @private
             */
            function toZeroPIRange(angle) {
                angle = angle % (2 * Math.PI);
                if (angle > Math.PI) {
                    angle = 2 * Math.PI - angle;
                }
                return angle;
            }
            angleEnd = toZeroPIRange(angleEnd);
            angleStart = toZeroPIRange(angleStart);
            angleMid = toZeroPIRange(angleMid);
            // *1e5 is to compensate pInt in zIndexSetter
            var incPrecision = 1e5,
                a1 = angleMid * incPrecision,
                a2 = angleStart * incPrecision,
                a3 = angleEnd * incPrecision;
            return {
                top: top,
                // max angle is PI, so this is always higher
                zTop: Math.PI * incPrecision + 1,
                out: out,
                zOut: Math.max(a1, a2, a3),
                inn: inn,
                zInn: Math.max(a1, a2, a3),
                side1: side1,
                zSide1: a3 * 0.99,
                side2: side2,
                zSide2: a2 * 0.99
            };
        };
        /* *
         *
         *  Default Export
         *
         * */

        return SVGRenderer;
    });
    _registerModule(_modules, 'Extensions/Oldie/VMLAxis3D.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  Extension to the VML Renderer
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent;
        /* eslint-disable valid-jsdoc */
        var VMLAxis3DAdditions = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function VMLAxis3DAdditions(axis) {
                    this.axis = axis;
            }
            return VMLAxis3DAdditions;
        }());
        var VMLAxis3D = /** @class */ (function () {
                function VMLAxis3D() {
                }
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                VMLAxis3D.compose = function (AxisClass) {
                    AxisClass.keepProps.push('vml');
                addEvent(AxisClass, 'init', VMLAxis3D.onInit);
                addEvent(AxisClass, 'render', VMLAxis3D.onRender);
            };
            /**
             * @private
             */
            VMLAxis3D.onInit = function () {
                var axis = this;
                if (!axis.vml) {
                    axis.vml = new VMLAxis3DAdditions(axis);
                }
            };
            /**
             * @private
             */
            VMLAxis3D.onRender = function () {
                var axis = this;
                var vml = axis.vml;
                // VML doesn't support a negative z-index
                if (vml.sideFrame) {
                    vml.sideFrame.css({ zIndex: 0 });
                    vml.sideFrame.front.attr({
                        fill: vml.sideFrame.color
                    });
                }
                if (vml.bottomFrame) {
                    vml.bottomFrame.css({ zIndex: 1 });
                    vml.bottomFrame.front.attr({
                        fill: vml.bottomFrame.color
                    });
                }
                if (vml.backFrame) {
                    vml.backFrame.css({ zIndex: 0 });
                    vml.backFrame.front.attr({
                        fill: vml.backFrame.color
                    });
                }
            };
            return VMLAxis3D;
        }());

        return VMLAxis3D;
    });
    _registerModule(_modules, 'Extensions/Oldie/VMLRenderer3D.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Options.js'], _modules['Extensions/Oldie/VMLAxis3D.js']], function (Axis, O, VMLAxis3D) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  Extension to the VML Renderer
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setOptions = O.setOptions;
        var VMLRenderer3D = /** @class */ (function () {
                function VMLRenderer3D() {
                }
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                VMLRenderer3D.compose = function (vmlClass, svgClass) {
                    var svgProto = svgClass.prototype;
                var vmlProto = vmlClass.prototype;
                setOptions({ animate: false });
                vmlProto.face3d = svgProto.face3d;
                vmlProto.polyhedron = svgProto.polyhedron;
                vmlProto.elements3d = svgProto.elements3d;
                vmlProto.element3d = svgProto.element3d;
                vmlProto.cuboid = svgProto.cuboid;
                vmlProto.cuboidPath = svgProto.cuboidPath;
                vmlProto.toLinePath = svgProto.toLinePath;
                vmlProto.toLineSegments = svgProto.toLineSegments;
                vmlProto.arc3d = function (shapeArgs) {
                    var result = svgProto.arc3d.call(this,
                        shapeArgs);
                    result.css({ zIndex: result.zIndex });
                    return result;
                };
                vmlProto.arc3dPath = svgProto.arc3dPath;
                VMLAxis3D.compose(Axis);
            };
            return VMLRenderer3D;
        }());

        return VMLRenderer3D;
    });
    _registerModule(_modules, 'Extensions/Oldie/Oldie.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Options.js'], _modules['Core/Color/Palette.js'], _modules['Core/Pointer.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Renderer/SVG/SVGRenderer3D.js'], _modules['Core/Utilities.js'], _modules['Extensions/Oldie/VMLRenderer3D.js']], function (Chart, Color, H, O, palette, Pointer, SVGElement, SVGRenderer, U, VMLRenderer3D) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  Support for old IE browsers (6, 7 and 8) in Highcharts v6+.
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var deg2rad = H.deg2rad,
            doc = H.doc,
            noop = H.noop,
            svg = H.svg,
            win = H.win;
        var getOptions = O.getOptions;
        var addEvent = U.addEvent,
            createElement = U.createElement,
            css = U.css,
            defined = U.defined,
            discardElement = U.discardElement,
            erase = U.erase,
            extend = U.extend,
            extendClass = U.extendClass,
            isArray = U.isArray,
            isNumber = U.isNumber,
            isObject = U.isObject,
            pick = U.pick,
            pInt = U.pInt,
            uniqueKey = U.uniqueKey;
        var VMLRenderer,
            VMLElement;
        /**
         * Path to the pattern image required by VML browsers in order to
         * draw radial gradients.
         *
         * @type      {string}
         * @default   http://code.highcharts.com/{version}/gfx/vml-radial-gradient.png
         * @since     2.3.0
         * @requires  modules/oldie
         * @apioption global.VMLRadialGradientURL
         */
        getOptions().global.VMLRadialGradientURL =
            'http://code.highcharts.com/9.1.0/gfx/vml-radial-gradient.png';
        // Utilites
        if (doc && !doc.defaultView) {
            H.getStyle = U.getStyle = function getStyle(el, prop) {
                var val,
                    alias = {
                        width: 'clientWidth',
                        height: 'clientHeight'
                    }[prop];
                if (el.style[prop]) {
                    return pInt(el.style[prop]);
                }
                if (prop === 'opacity') {
                    prop = 'filter';
                }
                // Getting the rendered width and height
                if (alias) {
                    el.style.zoom = 1;
                    return Math.max(el[alias] - 2 * getStyle(el, 'padding'), 0);
                }
                val = el.currentStyle[prop.replace(/\-(\w)/g, function (a, b) {
                    return b.toUpperCase();
                })];
                if (prop === 'filter') {
                    val = val.replace(/alpha\(opacity=([0-9]+)\)/, function (a, b) {
                        return (b / 100);
                    });
                }
                return val === '' ? 1 : pInt(val);
            };
        }
        /* eslint-disable no-invalid-this, valid-jsdoc */
        if (!svg) {
            // Prevent wrapping from creating false offsetWidths in export in legacy IE.
            // This applies only to charts for export, where IE runs the SVGRenderer
            // instead of the VMLRenderer
            // (#1079, #1063)
            addEvent(SVGElement, 'afterInit', function () {
                if (this.element.nodeName === 'text') {
                    this.css({
                        position: 'absolute'
                    });
                }
            });
            /**
             * Old IE override for pointer normalize, adds chartX and chartY to event
             * arguments.
             *
             * @ignore
             * @function Highcharts.Pointer#normalize
             * @param {global.PointerEvent} e
             * @param {boolean} [chartPosition=false]
             * @return {Highcharts.PointerEventObject}
             */
            Pointer.prototype.normalize = function (e, chartPosition) {
                e = e || win.event;
                if (!e.target) {
                    e.target = e.srcElement;
                }
                // Get mouse position
                if (!chartPosition) {
                    this.chartPosition = chartPosition = this.getChartPosition();
                }
                return extend(e, {
                    // #2005, #2129: the second case is for IE10 quirks mode within
                    // framesets
                    chartX: Math.round(Math.max(e.x, e.clientX - chartPosition.left)),
                    chartY: Math.round(e.y)
                });
            };
            /**
             * Further sanitize the mock-SVG that is generated when exporting charts in
             * oldIE.
             *
             * @private
             * @function Highcharts.Chart#ieSanitizeSVG
             */
            Chart.prototype.ieSanitizeSVG = function (svg) {
                svg = svg
                    .replace(/<IMG /g, '<image ')
                    .replace(/<(\/?)TITLE>/g, '<$1title>')
                    .replace(/height=([^" ]+)/g, 'height="$1"')
                    .replace(/width=([^" ]+)/g, 'width="$1"')
                    .replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>')
                    .replace(/ id=([^" >]+)/g, ' id="$1"') // #4003
                    .replace(/class=([^" >]+)/g, 'class="$1"')
                    .replace(/ transform /g, ' ')
                    .replace(/:(path|rect)/g, '$1')
                    .replace(/style="([^"]+)"/g, function (s) {
                    return s.toLowerCase();
                });
                return svg;
            };
            /**
             * VML namespaces can't be added until after complete. Listening
             * for Perini's doScroll hack is not enough.
             *
             * @private
             * @function Highcharts.Chart#isReadyToRender
             */
            Chart.prototype.isReadyToRender = function () {
                var chart = this;
                // Note: win == win.top is required
                if (!svg &&
                    (win == win.top && // eslint-disable-line eqeqeq
                        doc.readyState !== 'complete')) {
                    doc.attachEvent('onreadystatechange', function () {
                        doc.detachEvent('onreadystatechange', chart.firstRender);
                        if (doc.readyState === 'complete') {
                            chart.firstRender();
                        }
                    });
                    return false;
                }
                return true;
            };
            // IE compatibility hack for generating SVG content that it doesn't really
            // understand. Used by the exporting module.
            if (!doc.createElementNS) {
                doc.createElementNS = function (ns, tagName) {
                    return doc.createElement(tagName);
                };
            }
            /**
             * Old IE polyfill for addEventListener, called from inside the addEvent
             * function.
             *
             * @private
             * @function Highcharts.addEventListenerPolyfill<T>
             * @param {string} type
             * @param {Highcharts.EventCallbackFunction<T>} fn
             * @return {void}
             */
            H.addEventListenerPolyfill = function (type, fn) {
                var el = this;
                /**
                 * @private
                 */
                function wrappedFn(e) {
                    e.target = e.srcElement || win; // #2820
                    fn.call(el, e);
                }
                if (el.attachEvent) {
                    if (!el.hcEventsIE) {
                        el.hcEventsIE = {};
                    }
                    // unique function string (#6746)
                    if (!fn.hcKey) {
                        fn.hcKey = uniqueKey();
                    }
                    // Link wrapped fn with original fn, so we can get this in
                    // removeEvent
                    el.hcEventsIE[fn.hcKey] = wrappedFn;
                    el.attachEvent('on' + type, wrappedFn);
                }
            };
            /**
             * @private
             * @function Highcharts.removeEventListenerPolyfill<T>
             * @param {string} type
             * @param {Highcharts.EventCallbackFunction<T>} fn
             * @return {void}
             */
            H.removeEventListenerPolyfill = function (type, fn) {
                if (this.detachEvent) {
                    fn = this.hcEventsIE[fn.hcKey];
                    this.detachEvent('on' + type, fn);
                }
            };
            /**
             * The VML element wrapper.
             *
             * @private
             * @class
             * @name Highcharts.VMLElement
             *
             * @augments Highcharts.SVGElement
             */
            VMLElement = {
                docMode8: doc && doc.documentMode === 8,
                /**
                 * Initialize a new VML element wrapper. It builds the markup as a
                 * string to minimize DOM traffic.
                 *
                 * @function Highcharts.VMLElement#init
                 * @param {Highcharts.VMLRenderer} renderer
                 * @param {string} nodeName
                 */
                init: function (renderer, nodeName) {
                    var wrapper = this, markup = ['<', nodeName, ' filled="f" stroked="f"'], style = ['position: ', 'absolute', ';'], isDiv = nodeName === 'div';
                    // divs and shapes need size
                    if (nodeName === 'shape' || isDiv) {
                        style.push('left:0;top:0;width:1px;height:1px;');
                    }
                    style.push('visibility: ', isDiv ? 'hidden' : 'visible');
                    markup.push(' style="', style.join(''), '"/>');
                    // create element with default attributes and style
                    if (nodeName) {
                        markup = isDiv || nodeName === 'span' || nodeName === 'img' ?
                            markup.join('') :
                            renderer.prepVML(markup);
                        wrapper.element = createElement(markup);
                    }
                    wrapper.renderer = renderer;
                },
                /**
                 * Add the node to the given parent
                 *
                 * @function Highcharts.VMLElement
                 * @param {Highcharts.VMLElement} parent
                 * @return {Highcharts.VMLElement}
                 */
                add: function (parent) {
                    var wrapper = this,
                        renderer = wrapper.renderer,
                        element = wrapper.element,
                        box = renderer.box,
                        inverted = parent && parent.inverted, 
                        // get the parent node
                        parentNode = parent ?
                            parent.element || parent :
                            box;
                    if (parent) {
                        this.parentGroup = parent;
                    }
                    // if the parent group is inverted, apply inversion on all children
                    if (inverted) { // only on groups
                        renderer.invertChild(element, parentNode);
                    }
                    // append it
                    parentNode.appendChild(element);
                    // align text after adding to be able to read offset
                    wrapper.added = true;
                    if (wrapper.alignOnAdd && !wrapper.deferUpdateTransform) {
                        wrapper.updateTransform();
                    }
                    // fire an event for internal hooks
                    if (wrapper.onAdd) {
                        wrapper.onAdd();
                    }
                    // IE8 Standards can't set the class name before the element is
                    // appended
                    if (this.className) {
                        this.attr('class', this.className);
                    }
                    return wrapper;
                },
                /**
                 * VML always uses htmlUpdateTransform
                 *
                 * @function Highcharts.VMLElement#updateTransform
                 */
                updateTransform: SVGElement.prototype.htmlUpdateTransform,
                /**
                 * Set the rotation of a span with oldIE's filter
                 *
                 * @function Highcharts.VMLElement#setSpanRotation
                 * @return {void}
                 */
                setSpanRotation: function () {
                    // Adjust for alignment and rotation. Rotation of useHTML content is
                    // not yet implemented but it can probably be implemented for
                    // Firefox 3.5+ on user request. FF3.5+ has support for CSS3
                    // transform. The getBBox method also needs to be updated to
                    // compensate for the rotation, like it currently does for SVG.
                    // Test case: https://jsfiddle.net/highcharts/Ybt44/
                    var rotation = this.rotation,
                        costheta = Math.cos(rotation * deg2rad),
                        sintheta = Math.sin(rotation * deg2rad);
                    css(this.element, {
                        filter: rotation ? [
                            'progid:DXImageTransform.Microsoft.Matrix(M11=', costheta,
                            ', M12=', -sintheta, ', M21=', sintheta, ', M22=', costheta,
                            ', sizingMethod=\'auto expand\')'
                        ].join('') : 'none'
                    });
                },
                /**
                 * Get the positioning correction for the span after rotating.
                 *
                 * @function Highcharts.VMLElement#getSpanCorrection
                 */
                getSpanCorrection: function (width, baseline, alignCorrection, rotation, align) {
                    var costheta = rotation ? Math.cos(rotation * deg2rad) : 1,
                        sintheta = rotation ? Math.sin(rotation * deg2rad) : 0,
                        height = pick(this.elemHeight,
                        this.element.offsetHeight),
                        quad,
                        nonLeft = align && align !== 'left';
                    // correct x and y
                    this.xCorr = (costheta < 0 && -width);
                    this.yCorr = (sintheta < 0 && -height);
                    // correct for baseline and corners spilling out after rotation
                    quad = costheta * sintheta < 0;
                    this.xCorr += (sintheta *
                        baseline *
                        (quad ? 1 - alignCorrection : alignCorrection));
                    this.yCorr -= (costheta *
                        baseline *
                        (rotation ? (quad ? alignCorrection : 1 - alignCorrection) : 1));
                    // correct for the length/height of the text
                    if (nonLeft) {
                        this.xCorr -=
                            width * alignCorrection * (costheta < 0 ? -1 : 1);
                        if (rotation) {
                            this.yCorr -= (height *
                                alignCorrection *
                                (sintheta < 0 ? -1 : 1));
                        }
                        css(this.element, {
                            textAlign: align
                        });
                    }
                },
                /**
                 * Converts a subset of an SVG path definition to its VML counterpart.
                 * Takes an array as the parameter and returns a string.
                 *
                 * @function Highcharts.VMLElement#pathToVML
                 */
                pathToVML: function (value) {
                    // convert paths
                    var i = value.length,
                        path = [];
                    while (i--) {
                        // Multiply by 10 to allow subpixel precision.
                        // Substracting half a pixel seems to make the coordinates
                        // align with SVG, but this hasn't been tested thoroughly
                        if (isNumber(value[i])) {
                            path[i] = Math.round(value[i] * 10) - 5;
                        }
                        else if (value[i] === 'Z') { // close the path
                            path[i] = 'x';
                        }
                        else {
                            path[i] = value[i];
                            // When the start X and end X coordinates of an arc are too
                            // close, they are rounded to the same value above. In this
                            // case, substract or add 1 from the end X and Y positions.
                            // #186, #760, #1371, #1410.
                            if (value.isArc &&
                                (value[i] === 'wa' || value[i] === 'at')) {
                                // Start and end X
                                if (path[i + 5] === path[i + 7]) {
                                    path[i + 7] +=
                                        value[i + 7] > value[i + 5] ? 1 : -1;
                                }
                                // Start and end Y
                                if (path[i + 6] === path[i + 8]) {
                                    path[i + 8] +=
                                        value[i + 8] > value[i + 6] ? 1 : -1;
                                }
                            }
                        }
                    }
                    return path.join(' ') || 'x';
                },
                /**
                 * Set the element's clipping to a predefined rectangle
                 *
                 * @function Highcharts.VMLElement#clip
                 * @param {Highcharts.VMLClipRectObject} clipRect
                 * @return {Highcharts.VMLElement}
                 */
                clip: function (clipRect) {
                    var wrapper = this,
                        clipMembers,
                        cssRet;
                    if (clipRect) {
                        clipMembers = clipRect.members;
                        // Ensure unique list of elements (#1258)
                        erase(clipMembers, wrapper);
                        clipMembers.push(wrapper);
                        wrapper.destroyClip = function () {
                            erase(clipMembers, wrapper);
                        };
                        cssRet = clipRect.getCSS(wrapper);
                    }
                    else {
                        if (wrapper.destroyClip) {
                            wrapper.destroyClip();
                        }
                        cssRet = {
                            clip: wrapper.docMode8 ? 'inherit' : 'rect(auto)'
                        }; // #1214
                    }
                    return wrapper.css(cssRet);
                },
                /**
                 * Set styles for the element
                 *
                 * @function Highcharts.VMLElement#css
                 * @param {Highcharts.CSSObject} styles
                 * @return {Highcharts.VMLElement}
                 */
                css: SVGElement.prototype.htmlCss,
                /**
                 * Removes a child either by removeChild or move to garbageBin.
                 * Issue 490; in VML removeChild results in Orphaned nodes according to
                 * sIEve, discardElement does not.
                 *
                 * @function Highcharts.VMLElement#safeRemoveChild
                 * @param {Highcharts.HTMLDOMElement} element
                 * @return {void}
                 */
                safeRemoveChild: function (element) {
                    // discardElement will detach the node from its parent before
                    // attaching it to the garbage bin. Therefore it is important that
                    // the node is attached and have parent.
                    if (element.parentNode) {
                        discardElement(element);
                    }
                },
                /**
                 * Extend element.destroy by removing it from the clip members array
                 *
                 * @function Highcharts.VMLElement#destroy
                 */
                destroy: function () {
                    if (this.destroyClip) {
                        this.destroyClip();
                    }
                    return SVGElement.prototype.destroy.apply(this);
                },
                /**
                 * Add an event listener. VML override for normalizing event parameters.
                 *
                 * @function Highcharts.VMLElement#on
                 * @param {string} eventType
                 * @param {Function} handler
                 * @return {Highcharts.VMLElement}
                 */
                on: function (eventType, handler) {
                    // simplest possible event model for internal use
                    this.element['on' + eventType] = function () {
                        var e = win.event;
                        e.target = e.srcElement;
                        handler(e);
                    };
                    return this;
                },
                /**
                 * In stacked columns, cut off the shadows so that they don't overlap
                 *
                 * @function Highcharts.VMLElement#cutOffPath
                 * @param {string} path
                 * @param {number} length
                 * @return {string}
                 */
                cutOffPath: function (path, length) {
                    var len;
                    // The extra comma tricks the trailing comma remover in
                    // "gulp scripts" task
                    path = path.split(/[ ,]/);
                    len = path.length;
                    if (len === 9 || len === 11) {
                        path[len - 4] = path[len - 2] =
                            pInt(path[len - 2]) - 10 * length;
                    }
                    return path.join(' ');
                },
                /**
                 * Apply a drop shadow by copying elements and giving them different
                 * strokes.
                 *
                 * @function Highcharts.VMLElement#shadow
                 * @param {Highcharts.ShadowOptionsObject} shadowOptions
                 * @param {Highcharts.VMLElement} group
                 * @param {boolean} cutOff
                 * @return {Highcharts.VMLElement}
                 */
                shadow: function (shadowOptions, group, cutOff) {
                    var shadows = [],
                        i,
                        element = this.element,
                        renderer = this.renderer,
                        shadow,
                        elemStyle = element.style,
                        markup,
                        path = element.path,
                        strokeWidth,
                        modifiedPath,
                        shadowWidth,
                        shadowElementOpacity;
                    // some times empty paths are not strings
                    if (path && typeof path.value !== 'string') {
                        path = 'x';
                    }
                    modifiedPath = path;
                    if (shadowOptions) {
                        shadowWidth = pick(shadowOptions.width, 3);
                        shadowElementOpacity =
                            (shadowOptions.opacity || 0.15) / shadowWidth;
                        for (i = 1; i <= 3; i++) {
                            strokeWidth = (shadowWidth * 2) + 1 - (2 * i);
                            // Cut off shadows for stacked column items
                            if (cutOff) {
                                modifiedPath = this.cutOffPath(path.value, strokeWidth + 0.5);
                            }
                            markup = [
                                '<shape isShadow="true" strokeweight="', strokeWidth,
                                '" filled="false" path="', modifiedPath,
                                '" coordsize="10 10" style="', element.style.cssText,
                                '" />'
                            ];
                            shadow = createElement(renderer.prepVML(markup), null, {
                                left: (pInt(elemStyle.left) +
                                    pick(shadowOptions.offsetX, 1)) + 'px',
                                top: (pInt(elemStyle.top) +
                                    pick(shadowOptions.offsetY, 1)) + 'px'
                            });
                            if (cutOff) {
                                shadow.cutOff = strokeWidth + 1;
                            }
                            // apply the opacity
                            markup = [
                                '<stroke color="',
                                shadowOptions.color || palette.neutralColor100,
                                '" opacity="', shadowElementOpacity * i, '"/>'
                            ];
                            createElement(renderer.prepVML(markup), null, null, shadow);
                            // insert it
                            if (group) {
                                group.element.appendChild(shadow);
                            }
                            else {
                                element.parentNode
                                    .insertBefore(shadow, element);
                            }
                            // record it
                            shadows.push(shadow);
                        }
                        this.shadows = shadows;
                    }
                    return this;
                },
                updateShadows: noop,
                setAttr: function (key, value) {
                    if (this.docMode8) { // IE8 setAttribute bug
                        this.element[key] = value;
                    }
                    else {
                        this.element.setAttribute(key, value);
                    }
                },
                getAttr: function (key) {
                    if (this.docMode8) { // IE8 setAttribute bug
                        return this.element[key];
                    }
                    return this.element.getAttribute(key);
                },
                classSetter: function (value) {
                    // IE8 Standards mode has problems retrieving the className unless
                    // set like this. IE8 Standards can't set the class name before the
                    // element is appended.
                    (this.added ? this.element : this).className = value;
                },
                dashstyleSetter: function (value, key, element) {
                    var strokeElem = element.getElementsByTagName('stroke')[0] ||
                            createElement(this.renderer.prepVML(['<stroke/>']),
                        null,
                        null,
                        element);
                    strokeElem[key] = value || 'solid';
                    // Because changing stroke-width will change the dash length and
                    // cause an epileptic effect
                    this[key] = value;
                },
                dSetter: function (value, key, element) {
                    var i,
                        shadows = this.shadows;
                    value = value || [];
                    // Used in getter for animation
                    this.d = value.join && value.join(' ');
                    element.path = value = this.pathToVML(value);
                    // update shadows
                    if (shadows) {
                        i = shadows.length;
                        while (i--) {
                            shadows[i].path = shadows[i].cutOff ?
                                this.cutOffPath(value, shadows[i].cutOff) :
                                value;
                        }
                    }
                    this.setAttr(key, value);
                },
                fillSetter: function (value, key, element) {
                    var nodeName = element.nodeName;
                    if (nodeName === 'SPAN') { // text color
                        element.style.color = value;
                    }
                    else if (nodeName !== 'IMG') { // #1336
                        element.filled = value !== 'none';
                        this.setAttr('fillcolor', this.renderer.color(value, element, key, this));
                    }
                },
                'fill-opacitySetter': function (value, key, element) {
                    createElement(this.renderer.prepVML(['<', key.split('-')[0], ' opacity="', value, '"/>']), null, null, element);
                },
                // Don't bother - animation is too slow and filters introduce artifacts
                opacitySetter: noop,
                rotationSetter: function (value, key, element) {
                    var style = element.style;
                    // style is for #1873:
                    this[key] = style[key] = value;
                    // Correction for the 1x1 size of the shape container. Used in gauge
                    // needles.
                    style.left =
                        -Math.round(Math.sin(value * deg2rad) + 1) + 'px';
                    style.top =
                        Math.round(Math.cos(value * deg2rad)) + 'px';
                },
                strokeSetter: function (value, key, element) {
                    this.setAttr('strokecolor', this.renderer.color(value, element, key, this));
                },
                'stroke-widthSetter': function (value, key, element) {
                    element.stroked = !!value; // VML "stroked" attribute
                    this[key] = value; // used in getter, issue #113
                    if (isNumber(value)) {
                        value += 'px';
                    }
                    this.setAttr('strokeweight', value);
                },
                titleSetter: function (value, key) {
                    this.setAttr(key, value);
                },
                visibilitySetter: function (value, key, element) {
                    // Handle inherited visibility
                    if (value === 'inherit') {
                        value = 'visible';
                    }
                    // Let the shadow follow the main element
                    if (this.shadows) {
                        this.shadows.forEach(function (shadow) {
                            shadow.style[key] = value;
                        });
                    }
                    // Instead of toggling the visibility CSS property, move the div out
                    // of the viewport. This works around #61 and #586
                    if (element.nodeName === 'DIV') {
                        value = value === 'hidden' ? '-999em' : 0;
                        // In order to redraw, IE7 needs the div to be visible when
                        // tucked away outside the viewport. So the visibility is
                        // actually opposite of the expected value. This applies to the
                        // tooltip only.
                        if (!this.docMode8) {
                            element.style[key] = value ? 'visible' : 'hidden';
                        }
                        key = 'top';
                    }
                    element.style[key] = value;
                },
                xSetter: function (value, key, element) {
                    this[key] = value; // used in getter
                    if (key === 'x') {
                        key = 'left';
                    }
                    else if (key === 'y') {
                        key = 'top';
                    }
                    // clipping rectangle special
                    if (this.updateClipping) {
                        // the key is now 'left' or 'top' for 'x' and 'y'
                        this[key] = value;
                        this.updateClipping();
                    }
                    else {
                        // normal
                        element.style[key] = value;
                    }
                },
                zIndexSetter: function (value, key, element) {
                    element.style[key] = value;
                },
                fillGetter: function () {
                    return this.getAttr('fillcolor') || '';
                },
                strokeGetter: function () {
                    return this.getAttr('strokecolor') || '';
                },
                // #7850
                classGetter: function () {
                    return this.getAttr('className') || '';
                }
            };
            VMLElement['stroke-opacitySetter'] =
                VMLElement['fill-opacitySetter'];
            H.VMLElement = VMLElement = extendClass(SVGElement, VMLElement);
            // Some shared setters
            VMLElement.prototype.ySetter =
                VMLElement.prototype.widthSetter =
                    VMLElement.prototype.heightSetter =
                        VMLElement.prototype.xSetter;
            /**
             * The VML renderer
             *
             * @private
             * @class
             * @name Highcharts.VMLRenderer
             *
             * @augments Highcharts.SVGRenderer
             */
            var VMLRendererExtension = {
                    Element: VMLElement,
                    isIE8: win.navigator.userAgent.indexOf('MSIE 8.0') > -1,
                    /**
                     * Initialize the VMLRenderer.
                     *
                     * @function Highcharts.VMLRenderer#init
                     * @param {Highcharts.HTMLDOMElement} container
                     * @param {number} width
                     * @param {number} height
                     * @return {void}
                     */
                    init: function (container,
                width,
                height) {
                        var renderer = this,
                boxWrapper,
                box,
                css;
                    // Extended SVGRenderer member
                    this.crispPolyLine = SVGRenderer.prototype.crispPolyLine;
                    renderer.alignedObjects = [];
                    boxWrapper = renderer.createElement('div')
                        .css({ position: 'relative' });
                    box = boxWrapper.element;
                    container.appendChild(boxWrapper.element);
                    // generate the containing box
                    renderer.isVML = true;
                    renderer.box = box;
                    renderer.boxWrapper = boxWrapper;
                    renderer.gradients = {};
                    renderer.cache = {}; // Cache for numerical bounding boxes
                    renderer.cacheKeys = [];
                    renderer.imgCount = 0;
                    renderer.setSize(width, height, false);
                    // The only way to make IE6 and IE7 print is to use a global
                    // namespace. However, with IE8 the only way to make the dynamic
                    // shapes visible in screen and print mode seems to be to add the
                    // xmlns attribute and the behaviour style inline.
                    if (!doc.namespaces.hcv) {
                        doc.namespaces.add('hcv', 'urn:schemas-microsoft-com:vml');
                        // Setup default CSS (#2153, #2368, #2384)
                        css = 'hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke' +
                            '{ behavior:url(#default#VML); display: inline-block; } ';
                        try {
                            doc.createStyleSheet().cssText = css;
                        }
                        catch (e) {
                            doc.styleSheets[0].cssText += css;
                        }
                    }
                },
                /**
                 * Detect whether the renderer is hidden. This happens when one of the
                 * parent elements has display: none
                 *
                 * @function Highcharts.VMLRenderer#isHidden
                 */
                isHidden: function () {
                    return !this.box.offsetWidth;
                },
                /**
                 * Define a clipping rectangle. In VML it is accomplished by storing the
                 * values for setting the CSS style to all associated members.
                 *
                 * @function Highcharts.VMLRenderer#clipRect
                 * @param {number|Highcharts.SizeObject} x
                 * @param {number} y
                 * @param {number} width
                 * @param {number} height
                 * @return {Highcharts.VMLElement}
                 */
                clipRect: function (x, y, width, height) {
                    // create a dummy element
                    var clipRect = this.createElement(),
                        isObj = isObject(x);
                    // mimic a rectangle with its style object for automatic updating in
                    // attr
                    return extend(clipRect, {
                        members: [],
                        count: 0,
                        left: (isObj ? x.x : x) + 1,
                        top: (isObj ? x.y : y) + 1,
                        width: (isObj ? x.width : width) - 1,
                        height: (isObj ? x.height : height) - 1,
                        getCSS: function (wrapper) {
                            var element = wrapper.element, nodeName = element.nodeName, isShape = nodeName === 'shape', inverted = wrapper.inverted, rect = this, top = rect.top - (isShape ? element.offsetTop : 0), left = rect.left, right = left + rect.width, bottom = top + rect.height, ret = {
                                    clip: 'rect(' +
                                        Math.round(inverted ? left : top) + 'px,' +
                                        Math.round(inverted ? bottom : right) + 'px,' +
                                        Math.round(inverted ? right : bottom) + 'px,' +
                                        Math.round(inverted ? top : left) + 'px)'
                                };
                            // issue 74 workaround
                            if (!inverted && wrapper.docMode8 && nodeName === 'DIV') {
                                extend(ret, {
                                    width: right + 'px',
                                    height: bottom + 'px'
                                });
                            }
                            return ret;
                        },
                        // used in attr and animation to update the clipping of all
                        // members
                        updateClipping: function () {
                            clipRect.members.forEach(function (member) {
                                // Member.element is falsy on deleted series, like in
                                // stock/members/series-remove demo. Should be removed
                                // from members, but this will do.
                                if (member.element) {
                                    member.css(clipRect.getCSS(member));
                                }
                            });
                        }
                    });
                },
                /**
                 * Take a color and return it if it's a string, make it a gradient if
                 * it's a gradient configuration object, and apply opacity.
                 *
                 * @function Highcharts.VMLRenderer#color<T>
                 *
                 * @param {T} color
                 *        The color or config object
                 *
                 * @return {T}
                 */
                color: function (colorOption, elem, prop, wrapper) {
                    var renderer = this,
                        colorObject,
                        regexRgba = /^rgba/,
                        markup,
                        fillType,
                        ret = 'none';
                    // Check for linear or radial gradient
                    if (colorOption &&
                        colorOption.linearGradient) {
                        fillType = 'gradient';
                    }
                    else if (colorOption &&
                        colorOption.radialGradient) {
                        fillType = 'pattern';
                    }
                    if (fillType) {
                        var stopColor_1, stopOpacity_1, gradient = (colorOption.linearGradient ||
                                colorOption.radialGradient), x1 = void 0, y1 = void 0, x2 = void 0, y2 = void 0, opacity1_1, opacity2_1, color1_1, color2_1, fillAttr_1 = '', stops = colorOption.stops, firstStop = void 0, lastStop = void 0, colors_1 = [], addFillNode_1 = function () {
                                // Add the fill subnode. When colors attribute is used,
                                // the meanings of opacity and o:opacity2 are reversed.
                                markup = ['<fill colors="' + colors_1.join(',') +
                                        '" opacity="', opacity2_1, '" o:opacity2="',
                                    opacity1_1, '" type="', fillType, '" ', fillAttr_1,
                                    'focus="100%" method="any" />'];
                            createElement(renderer.prepVML(markup), null, null, elem);
                        };
                        // Extend from 0 to 1
                        firstStop = stops[0];
                        lastStop = stops[stops.length - 1];
                        if (firstStop[0] > 0) {
                            stops.unshift([
                                0,
                                firstStop[1]
                            ]);
                        }
                        if (lastStop[0] < 1) {
                            stops.push([
                                1,
                                lastStop[1]
                            ]);
                        }
                        // Compute the stops
                        stops.forEach(function (stop, i) {
                            if (regexRgba.test(stop[1])) {
                                colorObject = color(stop[1]);
                                stopColor_1 = colorObject.get('rgb');
                                stopOpacity_1 = colorObject.get('a');
                            }
                            else {
                                stopColor_1 = stop[1];
                                stopOpacity_1 = 1;
                            }
                            // Build the color attribute
                            colors_1.push((stop[0] * 100) + '% ' + stopColor_1);
                            // Only start and end opacities are allowed, so we use the
                            // first and the last
                            if (!i) {
                                opacity1_1 = stopOpacity_1;
                                color2_1 = stopColor_1;
                            }
                            else {
                                opacity2_1 = stopOpacity_1;
                                color1_1 = stopColor_1;
                            }
                        });
                        // Apply the gradient to fills only.
                        if (prop === 'fill') {
                            // Handle linear gradient angle
                            if (fillType === 'gradient') {
                                x1 = gradient.x1 || gradient[0] || 0;
                                y1 = gradient.y1 || gradient[1] || 0;
                                x2 = gradient.x2 || gradient[2] || 0;
                                y2 = gradient.y2 || gradient[3] || 0;
                                fillAttr_1 = 'angle="' + (90 - Math.atan((y2 - y1) / // y vector
                                    (x2 - x1) // x vector
                                ) * 180 / Math.PI) + '"';
                                addFillNode_1();
                                // Radial (circular) gradient
                            }
                            else {
                                var r = gradient.r,
                                    sizex_1 = r * 2,
                                    sizey_1 = r * 2,
                                    cx_1 = gradient.cx,
                                    cy_1 = gradient.cy,
                                    radialReference_1 = elem.radialReference,
                                    bBox_1,
                                    applyRadialGradient = function () {
                                        if (radialReference_1) {
                                            bBox_1 = wrapper.getBBox();
                                        cx_1 += (radialReference_1[0] - bBox_1.x) /
                                            bBox_1.width - 0.5;
                                        cy_1 += (radialReference_1[1] - bBox_1.y) /
                                            bBox_1.height - 0.5;
                                        sizex_1 *= radialReference_1[2] / bBox_1.width;
                                        sizey_1 *= radialReference_1[2] / bBox_1.height;
                                    }
                                    fillAttr_1 =
                                        'src="' + getOptions().global.VMLRadialGradientURL +
                                            '" ' +
                                            'size="' + sizex_1 + ',' + sizey_1 + '" ' +
                                            'origin="0.5,0.5" ' +
                                            'position="' + cx_1 + ',' + cy_1 + '" ' +
                                            'color2="' + color2_1 + '" ';
                                    addFillNode_1();
                                };
                                // Apply radial gradient
                                if (wrapper.added) {
                                    applyRadialGradient();
                                }
                                else {
                                    // We need to know the bounding box to get the size
                                    // and position right
                                    wrapper.onAdd = applyRadialGradient;
                                }
                                // The fill element's color attribute is broken in IE8
                                // standards mode, so we need to set the parent shape's
                                // fillcolor attribute instead.
                                ret = color1_1;
                            }
                            // Gradients are not supported for VML stroke, return the first
                            // color. #722.
                        }
                        else {
                            ret = stopColor_1;
                        }
                        // If the color is an rgba color, split it and add a fill node
                        // to hold the opacity component
                    }
                    else if (regexRgba.test(colorOption) && elem.tagName !== 'IMG') {
                        colorObject = color(colorOption);
                        wrapper[prop + '-opacitySetter'](colorObject.get('a'), prop, elem);
                        ret = colorObject.get('rgb');
                    }
                    else {
                        // 'stroke' or 'fill' node
                        var propNodes = elem.getElementsByTagName(prop);
                        if (propNodes.length) {
                            propNodes[0].opacity = 1;
                            propNodes[0].type = 'solid';
                        }
                        ret = colorOption;
                    }
                    return ret;
                },
                /**
                 * Take a VML string and prepare it for either IE8 or IE6/IE7.
                 *
                 * @function Highcharts.VMLRenderer#prepVML
                 *
                 * @param {Array<(number|string)>} markup
                 *        A string array of the VML markup to prepare
                 *
                 * @return {string}
                 */
                prepVML: function (markup) {
                    var vmlStyle = 'display:inline-block;behavior:url(#default#VML);',
                        isIE8 = this.isIE8;
                    markup = markup.join('');
                    if (isIE8) { // add xmlns and style inline
                        markup = markup.replace('/>', ' xmlns="urn:schemas-microsoft-com:vml" />');
                        if (markup.indexOf('style="') === -1) {
                            markup = markup.replace('/>', ' style="' + vmlStyle + '" />');
                        }
                        else {
                            markup = markup.replace('style="', 'style="' + vmlStyle);
                        }
                    }
                    else { // add namespace
                        markup = markup.replace('<', '<hcv:');
                    }
                    return markup;
                },
                /**
                 * Create rotated and aligned text
                 *
                 * @function Highcharts.VMLRenderer#text
                 *
                 * @param {string} str
                 *
                 * @param {number} x
                 *
                 * @param {number} y
                 */
                text: SVGRenderer.prototype.html,
                /**
                 * Create and return a path element
                 *
                 * @function Highcharts.VMLRenderer#path
                 *
                 * @param {Highcharts.VMLAttributes|Highcharts.VMLPathArray} [path]
                 */
                path: function (path) {
                    var attr = {
                            // subpixel precision down to 0.1 (width and height = 1px)
                            coordsize: '10 10'
                        };
                    if (isArray(path)) {
                        attr.d = path;
                    }
                    else if (isObject(path)) { // attributes
                        extend(attr, path);
                    }
                    // create the shape
                    return this.createElement('shape').attr(attr);
                },
                /**
                 * Create and return a circle element. In VML circles are implemented as
                 * shapes, which is faster than v:oval
                 *
                 * @function Highcharts.VMLRenderer#circle
                 * @param {number|Highcharts.Dictionary<number>} x
                 * @param {number} [y]
                 * @param {number} [r]
                 * @return {Highcharts.VMLElement}
                 */
                circle: function (x, y, r) {
                    var circle = this.symbol('circle');
                    if (isObject(x)) {
                        r = x.r;
                        y = x.y;
                        x = x.x;
                    }
                    circle.isCircle = true; // Causes x and y to mean center (#1682)
                    circle.r = r;
                    return circle.attr({ x: x, y: y });
                },
                /**
                 * Create a group using an outer div and an inner v:group to allow
                 * rotating and flipping. A simple v:group would have problems with
                 * positioning child HTML elements and CSS clip.
                 *
                 * @function Highcharts.VMLRenderer#g
                 *
                 * @param {string} name
                 *        The name of the group
                 *
                 * @return {Highcharts.VMLElement}
                 */
                g: function (name) {
                    var wrapper,
                        attribs;
                    // set the class name
                    if (name) {
                        attribs = {
                            'className': 'highcharts-' + name,
                            'class': 'highcharts-' + name
                        };
                    }
                    // the div to hold HTML and clipping
                    wrapper = this.createElement('div').attr(attribs);
                    return wrapper;
                },
                /**
                 * VML override to create a regular HTML image.
                 *
                 * @function Highcharts.VMLRenderer#image
                 *
                 * @param {string} src
                 *
                 * @param {number} x
                 *
                 * @param {number} y
                 *
                 * @param {number} width
                 *
                 * @param {number} height
                 * @return {Highcharts.VMLElement}
                 */
                image: function (src, x, y, width, height) {
                    var obj = this.createElement('img').attr({ src: src });
                    if (arguments.length > 1) {
                        obj.attr({
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        });
                    }
                    return obj;
                },
                /**
                 * For rectangles, VML uses a shape for rect to overcome bugs and
                 * rotation problems
                 *
                 * @function Highcharts.VMLRenderer#createElement
                 * @param {string} nodeName
                 * @return {Highcharts.VMLElement}
                 */
                createElement: function (nodeName) {
                    return nodeName === 'rect' ?
                        this.symbol(nodeName) :
                        SVGRenderer.prototype.createElement.call(this, nodeName);
                },
                /**
                 * In the VML renderer, each child of an inverted div (group) is
                 * inverted
                 *
                 * @function Highcharts.VMLRenderer#invertChild
                 *
                 * @param {Highcharts.HTMLDOMElement} element
                 *
                 * @param {Highcharts.HTMLDOMElement} parentNode
                 */
                invertChild: function (element, parentNode) {
                    var ren = this,
                        parentStyle = parentNode.style,
                        imgStyle = element.tagName === 'IMG' && element.style; // #1111
                        css(element, {
                            flip: 'x',
                            left: (pInt(parentStyle.width) -
                                (imgStyle ? pInt(imgStyle.top) : 1)) + 'px',
                            top: (pInt(parentStyle.height) -
                                (imgStyle ? pInt(imgStyle.left) : 1)) + 'px',
                            rotation: -90
                        });
                    // Recursively invert child elements, needed for nested composite
                    // shapes like box plots and error bars. #1680, #1806.
                    [].forEach.call(element.childNodes, function (child) {
                        ren.invertChild(child, element);
                    });
                },
                /**
                 * Symbol definitions that override the parent SVG renderer's symbols
                 *
                 * @name Highcharts.VMLRenderer#symbols
                 * @type {Highcharts.Dictionary<Function>}
                 */
                symbols: {
                    // VML specific arc function
                    arc: function (x, y, w, h, options) {
                        var start = options.start,
                            end = options.end,
                            radius = options.r || w || h,
                            innerRadius = options.innerR,
                            cosStart = Math.cos(start),
                            sinStart = Math.sin(start),
                            cosEnd = Math.cos(end),
                            sinEnd = Math.sin(end),
                            ret;
                        if (end - start === 0) { // no angle, don't show it.
                            return ['x'];
                        }
                        ret = [
                            'wa',
                            x - radius,
                            y - radius,
                            x + radius,
                            y + radius,
                            x + radius * cosStart,
                            y + radius * sinStart,
                            x + radius * cosEnd,
                            y + radius * sinEnd // end y
                        ];
                        if (options.open && !innerRadius) {
                            ret.push('e', 'M', x, // - innerRadius,
                            y // - innerRadius
                            );
                        }
                        ret.push('at', // anti clockwise arc to
                        x - innerRadius, // left
                        y - innerRadius, // top
                        x + innerRadius, // right
                        y + innerRadius, // bottom
                        x + innerRadius * cosEnd, // start x
                        y + innerRadius * sinEnd, // start y
                        x + innerRadius * cosStart, // end x
                        y + innerRadius * sinStart, // end y
                        'x', // finish path
                        'e' // close
                        );
                        ret.isArc = true;
                        return ret;
                    },
                    // Add circle symbol path. This performs significantly faster than
                    // v:oval.
                    circle: function (x, y, w, h, wrapper) {
                        if (wrapper && defined(wrapper.r)) {
                            w = h = 2 * wrapper.r;
                        }
                        // Center correction, #1682
                        if (wrapper && wrapper.isCircle) {
                            x -= w / 2;
                            y -= h / 2;
                        }
                        // Return the path
                        return [
                            'wa',
                            x,
                            y,
                            x + w,
                            y + h,
                            x + w,
                            y + h / 2,
                            x + w,
                            y + h / 2,
                            'e' // close
                        ];
                    },
                    /**
                     * Add rectangle symbol path which eases rotation and omits arcsize
                     * problems compared to the built-in VML roundrect shape. When
                     * borders are not rounded, use the simpler square path, else use
                     * the callout path without the arrow.
                     */
                    rect: function (x, y, w, h, options) {
                        return SVGRenderer.prototype.symbols[!defined(options) || !options.r ? 'square' : 'callout'].call(0, x, y, w, h, options);
                    }
                }
            };
            H.VMLRenderer = VMLRenderer = function () {
                this.init.apply(this, arguments);
            };
            extend(VMLRenderer.prototype, SVGRenderer.prototype);
            extend(VMLRenderer.prototype, VMLRendererExtension);
            // general renderer
            H.Renderer = VMLRenderer;
            // 3D additions
            VMLRenderer3D.compose(VMLRenderer, SVGRenderer);
        }
        SVGRenderer.prototype.getSpanWidth = function (wrapper, tspan) {
            var renderer = this,
                bBox = wrapper.getBBox(true),
                actualWidth = bBox.width;
            // Old IE cannot measure the actualWidth for SVG elements (#2314)
            if (!svg && renderer.forExport) {
                actualWidth = renderer.measureSpanWidth(tspan.firstChild.data, wrapper.styles);
            }
            return actualWidth;
        };
        // This method is used with exporting in old IE, when emulating SVG (see #2314)
        SVGRenderer.prototype.measureSpanWidth = function (text, styles) {
            var measuringSpan = doc.createElement('span'),
                offsetWidth,
                textNode = doc.createTextNode(text);
            measuringSpan.appendChild(textNode);
            css(measuringSpan, styles);
            this.box.appendChild(measuringSpan);
            offsetWidth = measuringSpan.offsetWidth;
            discardElement(measuringSpan); // #2463
            return offsetWidth;
        };

    });
    _registerModule(_modules, 'masters/modules/oldie.src.js', [], function () {


    });
}));