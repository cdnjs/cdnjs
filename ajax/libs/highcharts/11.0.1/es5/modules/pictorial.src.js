/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
 *
 * Pictorial graph series type for Highcharts
 *
 * (c) 2010-2022 Torstein Honsi, Magdalena Gut
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/pictorial', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'Extensions/PatternFill.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Defaults.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (A, Chart, H, D, Point, Series, SVGRenderer, U) {
        /* *
         *
         *  Module for using patterns or images as point fills.
         *
         *  (c) 2010-2021 Highsoft AS
         *  Author: Torstein Hønsi, Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var animObject = A.animObject;
        var getOptions = D.getOptions;
        var addEvent = U.addEvent,
            defined = U.defined,
            erase = U.erase,
            merge = U.merge,
            pick = U.pick,
            removeEvent = U.removeEvent,
            wrap = U.wrap;
        // Add the predefined patterns
        var patterns = H.patterns = (function () {
                var patterns = [],
            colors = getOptions().colors;
            // Start with subtle patterns
            [
                'M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5',
                'M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5',
                'M 2 0 L 2 5 M 4 0 L 4 5',
                'M 0 2 L 5 2 M 0 4 L 5 4',
                'M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5'
            ].forEach(function (pattern, i) {
                patterns.push({
                    path: pattern,
                    color: colors[i],
                    width: 5,
                    height: 5,
                    patternTransform: 'scale(1.4 1.4)'
                });
            });
            // Then add the more drastic ones
            [
                'M 0 0 L 5 10 L 10 0',
                'M 3 3 L 8 3 L 8 8 L 3 8 Z',
                'M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0',
                'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
                'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9'
            ].forEach(function (pattern, i) {
                patterns.push({
                    path: pattern,
                    color: colors[i + 5],
                    width: 10,
                    height: 10
                });
            });
            return patterns;
        })();
        /**
         * Utility function to compute a hash value from an object. Modified Java
         * String.hashCode implementation in JS. Use the preSeed parameter to add an
         * additional seeding step.
         *
         * @private
         * @function hashFromObject
         *
         * @param {Object} obj
         *        The javascript object to compute the hash from.
         *
         * @param {boolean} [preSeed=false]
         *        Add an optional preSeed stage.
         *
         * @return {string}
         *         The computed hash.
         */
        function hashFromObject(obj, preSeed) {
            var str = JSON.stringify(obj),
                strLen = str.length || 0;
            var hash = 0,
                i = 0,
                char,
                seedStep;
            if (preSeed) {
                seedStep = Math.max(Math.floor(strLen / 500), 1);
                for (var a = 0; a < strLen; a += seedStep) {
                    hash += str.charCodeAt(a);
                }
                hash = hash & hash;
            }
            for (; i < strLen; ++i) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString(16).replace('-', '1');
        }
        /**
         * Set dimensions on pattern from point. This function will set internal
         * pattern._width/_height properties if width and height are not both already
         * set. We only do this on image patterns. The _width/_height properties are set
         * to the size of the bounding box of the point, optionally taking aspect ratio
         * into account. If only one of width or height are supplied as options, the
         * undefined option is calculated as above.
         *
         * @private
         * @function Highcharts.Point#calculatePatternDimensions
         *
         * @param {Highcharts.PatternOptionsObject} pattern
         *        The pattern to set dimensions on.
         *
         * @return {void}
         *
         * @requires modules/pattern-fill
         */
        Point.prototype.calculatePatternDimensions = function (pattern) {
            if (pattern.width && pattern.height) {
                return;
            }
            var bBox = this.graphic && (this.graphic.getBBox &&
                    this.graphic.getBBox(true) ||
                    this.graphic.element &&
                        this.graphic.element.getBBox()) || {},
                shapeArgs = this.shapeArgs;
            // Prefer using shapeArgs, as it is animation agnostic
            if (shapeArgs) {
                bBox.width = shapeArgs.width || bBox.width;
                bBox.height = shapeArgs.height || bBox.height;
                bBox.x = shapeArgs.x || bBox.x;
                bBox.y = shapeArgs.y || bBox.y;
            }
            // For images we stretch to bounding box
            if (pattern.image) {
                // If we do not have a bounding box at this point, simply add a defer
                // key and pick this up in the fillSetter handler, where the bounding
                // box should exist.
                if (!bBox.width || !bBox.height) {
                    pattern._width = 'defer';
                    pattern._height = 'defer';
                    // Mark the pattern to be flipped later if upside down (#16810)
                    var scaleY = this.series.chart.mapView &&
                            this.series.chart.mapView.getSVGTransform().scaleY;
                    if (defined(scaleY) && scaleY < 0) {
                        pattern._inverted = true;
                    }
                    return;
                }
                // Handle aspect ratio filling
                if (pattern.aspectRatio) {
                    bBox.aspectRatio = bBox.width / bBox.height;
                    if (pattern.aspectRatio > bBox.aspectRatio) {
                        // Height of bBox will determine width
                        bBox.aspectWidth = bBox.height * pattern.aspectRatio;
                    }
                    else {
                        // Width of bBox will determine height
                        bBox.aspectHeight = bBox.width / pattern.aspectRatio;
                    }
                }
                // We set the width/height on internal properties to differentiate
                // between the options set by a user and by this function.
                pattern._width = pattern.width ||
                    Math.ceil(bBox.aspectWidth || bBox.width);
                pattern._height = pattern.height ||
                    Math.ceil(bBox.aspectHeight || bBox.height);
            }
            // Set x/y accordingly, centering if using aspect ratio, otherwise adjusting
            // so bounding box corner is 0,0 of pattern.
            if (!pattern.width) {
                pattern._x = pattern.x || 0;
                pattern._x += bBox.x - Math.round(bBox.aspectWidth ?
                    Math.abs(bBox.aspectWidth - bBox.width) / 2 :
                    0);
            }
            if (!pattern.height) {
                pattern._y = pattern.y || 0;
                pattern._y += bBox.y - Math.round(bBox.aspectHeight ?
                    Math.abs(bBox.aspectHeight - bBox.height) / 2 :
                    0);
            }
        };
        /* eslint-disable no-invalid-this */
        /**
         * Add a pattern to the renderer.
         *
         * @private
         * @function Highcharts.SVGRenderer#addPattern
         *
         * @param {Highcharts.PatternObject} options
         * The pattern options.
         *
         * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation]
         * The animation options.
         *
         * @return {Highcharts.SVGElement|undefined}
         * The added pattern. Undefined if the pattern already exists.
         *
         * @requires modules/pattern-fill
         */
        SVGRenderer.prototype.addPattern = function (options, animation) {
            var pattern,
                animate = pick(animation,
                true),
                animationOptions = animObject(animate),
                path,
                defaultSize = 32,
                width = options.width || options._width || defaultSize,
                height = (options.height || options._height || defaultSize),
                color = options.color || '#343434',
                id = options.id,
                ren = this,
                rect = function (fill) {
                    ren.rect(0, 0,
                width,
                height)
                        .attr({ fill: fill })
                        .add(pattern);
            }, attribs;
            if (!id) {
                this.idCounter = this.idCounter || 0;
                id = ('highcharts-pattern-' +
                    this.idCounter +
                    '-' +
                    (this.chartIndex || 0));
                ++this.idCounter;
            }
            if (this.forExport) {
                id += '-export';
            }
            // Do nothing if ID already exists
            this.defIds = this.defIds || [];
            if (this.defIds.indexOf(id) > -1) {
                return;
            }
            // Store ID in list to avoid duplicates
            this.defIds.push(id);
            // Calculate pattern element attributes
            var attrs = {
                    id: id,
                    patternUnits: 'userSpaceOnUse',
                    patternContentUnits: options.patternContentUnits || 'userSpaceOnUse',
                    width: width,
                    height: height,
                    x: options._x || options.x || 0,
                    y: options._y || options.y || 0
                };
            if (options._inverted) {
                attrs.patternTransform = 'scale(1, -1)'; // (#16810)
                if (options.patternTransform) {
                    options.patternTransform += ' scale(1, -1)';
                }
            }
            if (options.patternTransform) {
                attrs.patternTransform = options.patternTransform;
            }
            pattern = this.createElement('pattern').attr(attrs).add(this.defs);
            // Set id on the SVGRenderer object
            pattern.id = id;
            // Use an SVG path for the pattern
            if (options.path) {
                path = U.isObject(options.path) ?
                    options.path :
                    { d: options.path };
                // The background
                if (options.backgroundColor) {
                    rect(options.backgroundColor);
                }
                // The pattern
                attribs = {
                    'd': path.d
                };
                if (!this.styledMode) {
                    attribs.stroke = path.stroke || color;
                    attribs['stroke-width'] = pick(path.strokeWidth, 2);
                    attribs.fill = path.fill || 'none';
                }
                if (path.transform) {
                    attribs.transform = path.transform;
                }
                this.createElement('path').attr(attribs).add(pattern);
                pattern.color = color;
                // Image pattern
            }
            else if (options.image) {
                if (animate) {
                    this.image(options.image, 0, 0, width, height, function () {
                        // Onload
                        this.animate({
                            opacity: pick(options.opacity, 1)
                        }, animationOptions);
                        removeEvent(this.element, 'load');
                    }).attr({ opacity: 0 }).add(pattern);
                }
                else {
                    this.image(options.image, 0, 0, width, height).add(pattern);
                }
            }
            // For non-animated patterns, set opacity now
            if (!(options.image && animate) && typeof options.opacity !== 'undefined') {
                [].forEach.call(pattern.element.childNodes, function (child) {
                    child.setAttribute('opacity', options.opacity);
                });
            }
            // Store for future reference
            this.patternElements = this.patternElements || {};
            this.patternElements[id] = pattern;
            return pattern;
        };
        // Make sure we have a series color
        wrap(Series.prototype, 'getColor', function (proceed) {
            var oldColor = this.options.color;
            // Temporarely remove color options to get defaults
            if (oldColor &&
                oldColor.pattern &&
                !oldColor.pattern.color) {
                delete this.options.color;
                // Get default
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
                // Replace with old, but add default color
                oldColor.pattern.color =
                    this.color;
                this.color = this.options.color = oldColor;
            }
            else {
                // We have a color, no need to do anything special
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        });
        // Calculate pattern dimensions on points that have their own pattern.
        addEvent(Series, 'render', function () {
            var isResizing = this.chart.isResizing;
            if (this.isDirtyData || isResizing || !this.chart.hasRendered) {
                (this.points || []).forEach(function (point) {
                    var colorOptions = point.options && point.options.color;
                    if (colorOptions &&
                        colorOptions.pattern) {
                        // For most points we want to recalculate the dimensions on
                        // render, where we have the shape args and bbox. But if we
                        // are resizing and don't have the shape args, defer it, since
                        // the bounding box is still not resized.
                        if (isResizing &&
                            !(point.shapeArgs &&
                                point.shapeArgs.width &&
                                point.shapeArgs.height)) {
                            colorOptions
                                .pattern._width = 'defer';
                            colorOptions
                                .pattern._height = 'defer';
                        }
                        else {
                            point.calculatePatternDimensions(colorOptions.pattern);
                        }
                    }
                });
            }
        });
        // Merge series color options to points
        addEvent(Point, 'afterInit', function () {
            var point = this,
                colorOptions = point.options.color;
            // Only do this if we have defined a specific color on this point. Otherwise
            // we will end up trying to re-add the series color for each point.
            if (colorOptions && colorOptions.pattern) {
                // Move path definition to object, allows for merge with series path
                // definition
                if (typeof colorOptions.pattern.path === 'string') {
                    colorOptions.pattern.path = {
                        d: colorOptions.pattern.path
                    };
                }
                // Merge with series options
                point.color = point.options.color = merge(point.series.options.color, colorOptions);
            }
        });
        // Add functionality to SVG renderer to handle patterns as complex colors
        addEvent(SVGRenderer, 'complexColor', function (args) {
            var color = args.args[0],
                prop = args.args[1],
                element = args.args[2],
                chartIndex = (this.chartIndex || 0);
            var pattern = color.pattern,
                value = '#343434';
            // Handle patternIndex
            if (typeof color.patternIndex !== 'undefined' && patterns) {
                pattern = patterns[color.patternIndex];
            }
            // Skip and call default if there is no pattern
            if (!pattern) {
                return true;
            }
            // We have a pattern.
            if (pattern.image ||
                typeof pattern.path === 'string' ||
                pattern.path && pattern.path.d) {
                // Real pattern. Add it and set the color value to be a reference.
                // Force Hash-based IDs for legend items, as they are drawn before
                // point render, meaning they are drawn before autocalculated image
                // width/heights. We don't want them to highjack the width/height for
                // this ID if it is defined by users.
                var forceHashId = element.parentNode &&
                        element.parentNode.getAttribute('class');
                forceHashId = forceHashId &&
                    forceHashId.indexOf('highcharts-legend') > -1;
                // If we don't have a width/height yet, handle it. Try faking a point
                // and running the algorithm again.
                if (pattern._width === 'defer' || pattern._height === 'defer') {
                    Point.prototype.calculatePatternDimensions.call({ graphic: { element: element } }, pattern);
                }
                // If we don't have an explicit ID, compute a hash from the
                // definition and use that as the ID. This ensures that points with
                // the same pattern definition reuse existing pattern elements by
                // default. We combine two hashes, the second with an additional
                // preSeed algorithm, to minimize collision probability.
                if (forceHashId || !pattern.id) {
                    // Make a copy so we don't accidentally edit options when setting ID
                    pattern = merge({}, pattern);
                    pattern.id = 'highcharts-pattern-' + chartIndex + '-' +
                        hashFromObject(pattern) + hashFromObject(pattern, true);
                }
                // Add it. This function does nothing if an element with this ID
                // already exists.
                this.addPattern(pattern, !this.forExport && pick(pattern.animation, this.globalAnimation, { duration: 100 }));
                value = "url(".concat(this.url, "#").concat(pattern.id + (this.forExport ? '-export' : ''), ")");
            }
            else {
                // Not a full pattern definition, just add color
                value = pattern.color || value;
            }
            // Set the fill/stroke prop on the element
            element.setAttribute(prop, value);
            // Allow the color to be concatenated into tooltips formatters etc.
            color.toString = function () {
                return value;
            };
            // Skip default handler
            return false;
        });
        // When animation is used, we have to recalculate pattern dimensions after
        // resize, as the bounding boxes are not available until then.
        addEvent(Chart, 'endResize', function () {
            if ((this.renderer && this.renderer.defIds || []).filter(function (id) {
                return (id &&
                    id.indexOf &&
                    id.indexOf('highcharts-pattern-') === 0);
            }).length) {
                // We have non-default patterns to fix. Find them by looping through
                // all points.
                this.series.forEach(function (series) {
                    if (series.visible) {
                        series.points.forEach(function (point) {
                            var colorOptions = point.options && point.options.color;
                            if (colorOptions &&
                                colorOptions.pattern) {
                                colorOptions.pattern
                                    ._width = 'defer';
                                colorOptions.pattern
                                    ._height = 'defer';
                            }
                        });
                    }
                });
                // Redraw without animation
                this.redraw(false);
            }
        });
        // Add a garbage collector to delete old patterns with autogenerated hashes that
        // are no longer being referenced.
        addEvent(Chart, 'redraw', function () {
            var usedIds = {},
                renderer = this.renderer, 
                // Get the autocomputed patterns - these are the ones we might delete
                patterns = (renderer.defIds || []).filter(function (pattern) {
                    return (pattern.indexOf &&
                        pattern.indexOf('highcharts-pattern-') === 0);
            });
            if (patterns.length) {
                // Look through the DOM for usage of the patterns. This can be points,
                // series, tooltips etc.
                [].forEach.call(this.renderTo.querySelectorAll('[color^="url("], [fill^="url("], [stroke^="url("]'), function (node) {
                    var id = node.getAttribute('fill') ||
                            node.getAttribute('color') ||
                            node.getAttribute('stroke');
                    if (id) {
                        var sanitizedId = id
                                .replace(renderer.url, '')
                                .replace('url(#', '')
                                .replace(')', '');
                        usedIds[sanitizedId] = true;
                    }
                });
                // Loop through the patterns that exist and see if they are used
                patterns.forEach(function (id) {
                    if (!usedIds[id]) {
                        // Remove id from used id list
                        erase(renderer.defIds, id);
                        // Remove pattern element
                        if (renderer.patternElements[id]) {
                            renderer.patternElements[id].destroy();
                            delete renderer.patternElements[id];
                        }
                    }
                });
            }
        });
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Pattern options
         *
         * @interface Highcharts.PatternOptionsObject
         */ /**
        * Background color for the pattern if a `path` is set (not images).
        * @name Highcharts.PatternOptionsObject#backgroundColor
        * @type {Highcharts.ColorString|undefined}
        */ /**
        * URL to an image to use as the pattern.
        * @name Highcharts.PatternOptionsObject#image
        * @type {string|undefined}
        */ /**
        * Width of the pattern. For images this is automatically set to the width of
        * the element bounding box if not supplied. For non-image patterns the default
        * is 32px. Note that automatic resizing of image patterns to fill a bounding
        * box dynamically is only supported for patterns with an automatically
        * calculated ID.
        * @name Highcharts.PatternOptionsObject#width
        * @type {number|undefined}
        */ /**
        * Analogous to pattern.width.
        * @name Highcharts.PatternOptionsObject#height
        * @type {number|undefined}
        */ /**
        * For automatically calculated width and height on images, it is possible to
        * set an aspect ratio. The image will be zoomed to fill the bounding box,
        * maintaining the aspect ratio defined.
        * @name Highcharts.PatternOptionsObject#aspectRatio
        * @type {number|undefined}
        */ /**
        * Horizontal offset of the pattern. Defaults to 0.
        * @name Highcharts.PatternOptionsObject#x
        * @type {number|undefined}
        */ /**
        * Vertical offset of the pattern. Defaults to 0.
        * @name Highcharts.PatternOptionsObject#y
        * @type {number|undefined}
        */ /**
        * Either an SVG path as string, or an object. As an object, supply the path
        * string in the `path.d` property. Other supported properties are standard SVG
        * attributes like `path.stroke` and `path.fill`. If a path is supplied for the
        * pattern, the `image` property is ignored.
        * @name Highcharts.PatternOptionsObject#path
        * @type {string|Highcharts.SVGAttributes|undefined}
        */ /**
        * SVG `patternTransform` to apply to the entire pattern.
        * @name Highcharts.PatternOptionsObject#patternTransform
        * @type {string|undefined}
        * @see [patternTransform demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/series/pattern-fill-transform)
        */ /**
        * Pattern color, used as default path stroke.
        * @name Highcharts.PatternOptionsObject#color
        * @type {Highcharts.ColorString|undefined}
        */ /**
        * Opacity of the pattern as a float value from 0 to 1.
        * @name Highcharts.PatternOptionsObject#opacity
        * @type {number|undefined}
        */ /**
        * ID to assign to the pattern. This is automatically computed if not added, and
        * identical patterns are reused. To refer to an existing pattern for a
        * Highcharts color, use `color: "url(#pattern-id)"`.
        * @name Highcharts.PatternOptionsObject#id
        * @type {string|undefined}
        */
        /**
         * Holds a pattern definition.
         *
         * @sample highcharts/series/pattern-fill-area/
         *         Define a custom path pattern
         * @sample highcharts/series/pattern-fill-pie/
         *         Default patterns and a custom image pattern
         * @sample maps/demo/pattern-fill-map/
         *         Custom images on map
         *
         * @example
         * // Pattern used as a color option
         * color: {
         *     pattern: {
         *            path: {
         *                 d: 'M 3 3 L 8 3 L 8 8 Z',
         *                fill: '#102045'
         *            },
         *            width: 12,
         *            height: 12,
         *            color: '#907000',
         *            opacity: 0.5
         *     }
         * }
         *
         * @interface Highcharts.PatternObject
         */ /**
        * Pattern options
        * @name Highcharts.PatternObject#pattern
        * @type {Highcharts.PatternOptionsObject}
        */ /**
        * Animation options for the image pattern loading.
        * @name Highcharts.PatternObject#animation
        * @type {boolean|Partial<Highcharts.AnimationOptionsObject>|undefined}
        */ /**
        * Optionally an index referencing which pattern to use. Highcharts adds
        * 10 default patterns to the `Highcharts.patterns` array. Additional
        * pattern definitions can be pushed to this array if desired. This option
        * is an index into this array.
        * @name Highcharts.PatternObject#patternIndex
        * @type {number|undefined}
        */
        ''; // keeps doclets above in transpiled file

    });
    _registerModule(_modules, 'Series/Pictorial/PictorialUtilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2022 Torstein Honsi, Magdalena Gut
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined;
        function rescalePatternFill(element, stackHeight, width, height, borderWidth) {
            if (borderWidth === void 0) { borderWidth = 1; }
            var fill = element && element.attr('fill'),
                match = fill && fill.match(/url\(([^)]+)\)/);
            if (match) {
                var patternPath = document.querySelector("" + match[1] + " path");
                if (patternPath) {
                    var bBox = patternPath.getBBox();
                    // Firefox (v108/Mac) is unable to detect the bounding box within
                    // defs. Without this block, the pictorial is not rendered.
                    if (bBox.width === 0) {
                        var parent_1 = patternPath.parentElement;
                        // Temporarily append it to the root
                        element.renderer.box.appendChild(patternPath);
                        bBox = patternPath.getBBox();
                        parent_1.appendChild(patternPath);
                    }
                    var scaleX = 1 / (bBox.width + borderWidth);
                    var scaleY = stackHeight / height / bBox.height,
                        aspectRatio = bBox.width / bBox.height,
                        pointAspectRatio = width / stackHeight,
                        x = -bBox.width / 2;
                    if (aspectRatio < pointAspectRatio) {
                        scaleX = scaleX * aspectRatio / pointAspectRatio;
                    }
                    patternPath.setAttribute('stroke-width', borderWidth / (width * scaleX));
                    patternPath.setAttribute('transform', 'translate(0.5, 0)' +
                        "scale(".concat(scaleX, " ").concat(scaleY, ") ") +
                        "translate(".concat(x + borderWidth * scaleX / 2, ", ").concat(-bBox.y, ")"));
                }
            }
        }
        function getStackMetrics(yAxis, shape) {
            var height = yAxis.len,
                y = 0;
            if (shape && defined(shape.max)) {
                y = yAxis.toPixels(shape.max, true);
                height = yAxis.len - y;
            }
            return {
                height: height,
                y: y
            };
        }
        function invertShadowGroup(shadowGroup, yAxis) {
            var inverted = yAxis.chart.inverted;
            if (inverted) {
                shadowGroup.attr({
                    rotation: inverted ? 90 : 0,
                    scaleX: inverted ? -1 : 1
                });
            }
        }

        return { rescalePatternFill: rescalePatternFill, invertShadowGroup: invertShadowGroup, getStackMetrics: getStackMetrics };
    });
    _registerModule(_modules, 'Series/Pictorial/PictorialPoint.js', [_modules['Core/Series/SeriesRegistry.js'], _modules['Series/Pictorial/PictorialUtilities.js']], function (SeriesRegistry, PictorialUtilities) {
        /* *
         *
         *  (c) 2010-2022 Torstein Honsi, Magdalena Gut
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
        var ColumnPoint = SeriesRegistry.seriesTypes.column.prototype.pointClass;
        var rescalePatternFill = PictorialUtilities.rescalePatternFill,
            getStackMetrics = PictorialUtilities.getStackMetrics;
        /* *
         *
         *  Class
         *
         * */
        var PictorialPoint = /** @class */ (function (_super) {
                __extends(PictorialPoint, _super);
            function PictorialPoint() {
                /* *
                 *
                 * Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                _this.options = void 0;
                _this.series = void 0;
                _this.pathDef = void 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            PictorialPoint.prototype.setState = function () {
                var point = this;
                _super.prototype.setState.apply(point, arguments);
                var series = point.series,
                    paths = series.options.paths;
                if (point.graphic && point.shapeArgs && paths) {
                    var shape = paths[point.index %
                            paths.length];
                    rescalePatternFill(point.graphic, getStackMetrics(series.yAxis, shape).height, point.shapeArgs.width || 0, point.shapeArgs.height || Infinity, point.series.options.borderWidth || 0);
                }
            };
            return PictorialPoint;
        }(ColumnPoint));
        /* *
         *
         *  Export Default
         *
         * */

        return PictorialPoint;
    });
    _registerModule(_modules, 'Series/Pictorial/PictorialSeries.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Chart/Chart.js'], _modules['Series/Pictorial/PictorialPoint.js'], _modules['Series/Pictorial/PictorialUtilities.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Axis/Stacking/StackItem.js'], _modules['Core/Utilities.js']], function (A, Chart, PictorialPoint, PictorialUtilities, SeriesRegistry, StackItem, U) {
        /* *
         *
         *  (c) 2010-2022 Torstein Honsi, Magdalena Gut
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
        /* *
         *
         *  Imports
         *
         * */
        var ColumnSeries = SeriesRegistry.seriesTypes.column;
        var animObject = A.animObject;
        var getStackMetrics = PictorialUtilities.getStackMetrics,
            invertShadowGroup = PictorialUtilities.invertShadowGroup,
            rescalePatternFill = PictorialUtilities.rescalePatternFill;
        var addEvent = U.addEvent,
            defined = U.defined,
            merge = U.merge,
            objectEach = U.objectEach,
            pick = U.pick;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The pictorial series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.pictorial
         *
         * @augments Highcharts.Series
         */
        var PictorialSeries = /** @class */ (function (_super) {
                __extends(PictorialSeries, _super);
            function PictorialSeries() {
                /* *
                 *
                 *  Static Properties
                 *
                 * */
                var _this = _super !== null && _super.apply(this,
                    arguments) || this;
                /* *
                 *
                 * Properties
                 *
                 * */
                _this.paths = void 0;
                _this.data = void 0;
                _this.options = void 0;
                _this.points = void 0;
                return _this;
                /* eslint-enable valid-jsdoc */
            }
            /* *
             *
             * Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Animate in the series. Called internally twice. First with the `init`
             * parameter set to true, which sets up the initial state of the
             * animation. Then when ready, it is called with the `init` parameter
             * undefined, in order to perform the actual animation.
             *
             * @function Highcharts.Series#animate
             *
             * @param {boolean} [init]
             * Initialize the animation.
             */
            PictorialSeries.prototype.animate = function (init) {
                var _a = this, chart = _a.chart, group = _a.group, animation = animObject(this.options.animation), 
                    // The key for temporary animation clips
                    animationClipKey = [
                        this.getSharedClipKey(),
                        animation.duration,
                        animation.easing,
                        animation.defer
                    ].join(',');
                var animationClipRect = chart.sharedClips[animationClipKey];
                // Initialize the animation. Set up the clipping rectangle.
                if (init && group) {
                    var clipBox = this.getClipBox();
                    // Create temporary animation clips
                    if (!animationClipRect) {
                        clipBox.y = clipBox.height;
                        clipBox.height = 0;
                        animationClipRect = chart.renderer.clipRect(clipBox);
                        chart.sharedClips[animationClipKey] = animationClipRect;
                    }
                    group.clip(animationClipRect);
                    // Run the animation
                }
                else if (animationClipRect &&
                    // Only first series in this pane
                    !animationClipRect.hasClass('highcharts-animating')) {
                    var finalBox = this.getClipBox();
                    animationClipRect
                        .addClass('highcharts-animating')
                        .animate(finalBox, animation);
                }
            };
            PictorialSeries.prototype.animateDrilldown = function () { };
            PictorialSeries.prototype.animateDrillupFrom = function () { };
            PictorialSeries.prototype.pointAttribs = function (point) {
                var pointAttribs = _super.prototype.pointAttribs.apply(this,
                    arguments),
                    seriesOptions = this.options,
                    series = this,
                    paths = seriesOptions.paths;
                if (point && point.shapeArgs && paths) {
                    var shape = paths[point.index % paths.length],
                        _a = getStackMetrics(series.yAxis,
                        shape),
                        y = _a.y,
                        height = _a.height,
                        pathDef = shape.definition;
                    // New pattern, replace
                    if (pathDef !== point.pathDef) {
                        point.pathDef = pathDef;
                        pointAttribs.fill = {
                            pattern: {
                                path: {
                                    d: pathDef,
                                    fill: pointAttribs.fill,
                                    strokeWidth: pointAttribs['stroke-width'],
                                    stroke: pointAttribs.stroke
                                },
                                x: point.shapeArgs.x,
                                y: y,
                                width: point.shapeArgs.width || 0,
                                height: height,
                                patternContentUnits: 'objectBoundingBox',
                                backgroundColor: 'none',
                                color: '#ff0000'
                            }
                        };
                    }
                    else if (point.pathDef && point.graphic) {
                        delete pointAttribs.fill;
                    }
                }
                delete pointAttribs.stroke;
                delete pointAttribs.strokeWidth;
                return pointAttribs;
            };
            /**
             * Make sure that path.max is also considered when calculating dataMax.
             */
            PictorialSeries.prototype.getExtremes = function () {
                var extremes = _super.prototype.getExtremes.apply(this,
                    arguments),
                    series = this,
                    paths = series.options.paths;
                if (paths) {
                    paths.forEach(function (path) {
                        if (defined(path.max) &&
                            defined(extremes.dataMax) &&
                            path.max > extremes.dataMax) {
                            extremes.dataMax = path.max;
                        }
                    });
                }
                return extremes;
            };
            /**
             * A pictorial chart uses vector images to represents the data.
             * The shape of the data point is taken from the path parameter.
             *
             * @sample       {highcharts} highcharts/demo/pictorial/
             *               Pictorial chart
             *
             * @extends      plotOptions.column
             * @since 11.0.0
             * @product      highcharts
             * @excluding    allAreas, borderRadius,
             *               centerInCategory, colorAxis, colorKey, connectEnds,
             *               connectNulls, crisp, compare, compareBase, dataSorting,
             *               dashStyle, dataAsColumns, linecap, lineWidth, shadow,
             *               onPoint
             * @requires     modules/pictorial
             * @optionparent plotOptions.pictorial
             */
            PictorialSeries.defaultOptions = merge(ColumnSeries.defaultOptions, {
                borderWidth: 0
            });
            return PictorialSeries;
        }(ColumnSeries));
        /* *
         *
         *  Events
         *
         * */
        addEvent(PictorialSeries, 'afterRender', function () {
            var series = this,
                paths = series.options.paths,
                fillUrlMatcher = /url\(([^)]+)\)/;
            series.points.forEach(function (point) {
                if (point.graphic && point.shapeArgs && paths) {
                    var shape = paths[point.index % paths.length],
                        fill = point.graphic.attr('fill'),
                        match = fill && fill.match(fillUrlMatcher),
                        _a = getStackMetrics(series.yAxis,
                        shape),
                        y = _a.y,
                        height = _a.height;
                    if (match && series.chart.renderer.patternElements) {
                        var currentPattern = series.chart.renderer.patternElements[match[1].slice(1)];
                        if (currentPattern) {
                            currentPattern.animate({
                                x: point.shapeArgs.x,
                                y: y,
                                width: point.shapeArgs.width || 0,
                                height: height
                            });
                        }
                    }
                    rescalePatternFill(point.graphic, getStackMetrics(series.yAxis, shape).height, point.shapeArgs.width || 0, point.shapeArgs.height || Infinity, series.options.borderWidth || 0);
                }
            });
        });
        function renderStackShadow(stack) {
            // Get first pictorial series
            var stackKeys = Object
                    .keys(stack.points)
                    .filter(function (p) { return p.split(',').length > 1; }), allSeries = stack.axis.chart.series, seriesIndexes = stackKeys.map(function (key) {
                    return parseFloat(key.split(',')[0]);
            });
            var seriesIndex = -1;
            seriesIndexes.forEach(function (index) {
                if (allSeries[index] && allSeries[index].visible) {
                    seriesIndex = index;
                }
            });
            var series = stack.axis.chart.series[seriesIndex];
            if (series &&
                series.is('pictorial') &&
                stack.axis.hasData() &&
                series.xAxis.hasData()) {
                var xAxis = series.xAxis,
                    options = stack.axis.options,
                    chart = stack.axis.chart,
                    stackShadow = stack.shadow,
                    xCenter = xAxis.toPixels(stack.x,
                    true),
                    x = chart.inverted ? xAxis.len - xCenter : xCenter,
                    paths = series.options.paths || [],
                    index = stack.x % paths.length,
                    shape = paths[index],
                    width = series.getColumnMetrics &&
                        series.getColumnMetrics().width,
                    _a = getStackMetrics(series.yAxis,
                    shape),
                    height = _a.height,
                    y = _a.y,
                    shadowOptions = options.stackShadow,
                    strokeWidth = pick(shadowOptions && shadowOptions.borderWidth,
                    series.options.borderWidth, 1);
                if (!stackShadow &&
                    shadowOptions &&
                    shadowOptions.enabled &&
                    shape) {
                    if (!stack.shadowGroup) {
                        stack.shadowGroup = chart.renderer.g('shadow-group')
                            .add();
                    }
                    stack.shadowGroup.attr({
                        translateX: chart.inverted ?
                            stack.axis.pos : xAxis.pos,
                        translateY: chart.inverted ?
                            xAxis.pos : stack.axis.pos
                    });
                    stack.shadow = chart.renderer.rect(x, y, width, height)
                        .attr({
                        fill: {
                            pattern: {
                                path: {
                                    d: shape.definition,
                                    fill: shadowOptions.color ||
                                        '#dedede',
                                    strokeWidth: strokeWidth,
                                    stroke: shadowOptions.borderColor ||
                                        'transparent'
                                },
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                                patternContentUnits: 'objectBoundingBox',
                                backgroundColor: 'none',
                                color: '#dedede'
                            }
                        }
                    })
                        .add(stack.shadowGroup);
                    invertShadowGroup(stack.shadowGroup, stack.axis);
                    rescalePatternFill(stack.shadow, height, width, height, strokeWidth);
                    stack.setOffset(series.pointXOffset || 0, series.barW || 0);
                }
                else if (stackShadow && stack.shadowGroup) {
                    stackShadow.animate({
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    });
                    var fillUrlMatcher = /url\(([^)]+)\)/,
                        fill = stackShadow.attr('fill'),
                        match = fill && fill.match(fillUrlMatcher);
                    if (match && chart.renderer.patternElements) {
                        chart.renderer.patternElements[match[1].slice(1)]
                            .animate({
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        });
                    }
                    stack.shadowGroup.animate({
                        translateX: chart.inverted ?
                            stack.axis.pos : xAxis.pos,
                        translateY: chart.inverted ?
                            xAxis.pos : stack.axis.pos
                    });
                    invertShadowGroup(stack.shadowGroup, stack.axis);
                    rescalePatternFill(stackShadow, height, width, height, strokeWidth);
                    stack.setOffset(series.pointXOffset || 0, series.barW || 0);
                }
            }
            else if (stack.shadow && stack.shadowGroup) {
                stack.shadow.destroy();
                stack.shadow = void 0;
                stack.shadowGroup.destroy();
                stack.shadowGroup = void 0;
            }
        }
        function forEachStack(chart, callback) {
            if (chart.axes) {
                chart.axes.forEach(function (axis) {
                    if (!axis.stacking) {
                        return;
                    }
                    var stacks = axis.stacking.stacks;
                    // Render each stack total
                    objectEach(stacks, function (type) {
                        objectEach(type, function (stack) {
                            callback(stack);
                        });
                    });
                });
            }
        }
        addEvent(Chart, 'render', function () {
            forEachStack(this, renderStackShadow);
        });
        addEvent(StackItem, 'afterSetOffset', function (e) {
            if (this.shadow) {
                var _a = this.axis,
                    chart = _a.chart,
                    len = _a.len,
                    xOffset = e.xOffset,
                    width = e.width,
                    translateX = chart.inverted ? xOffset - chart.xAxis[0].len : xOffset,
                    translateY = chart.inverted ? -len : 0;
                this.shadow.attr({
                    translateX: translateX,
                    translateY: translateY
                });
                this.shadow.animate({ width: width });
            }
        });
        function destroyAllStackShadows(chart) {
            forEachStack(chart, function (stack) {
                if (stack.shadow && stack.shadowGroup) {
                    stack.shadow.destroy();
                    stack.shadowGroup.destroy();
                    delete stack.shadow;
                    delete stack.shadowGroup;
                }
            });
        }
        // This is a workaround due to no implementation of the animation drilldown.
        addEvent(Chart, 'afterDrilldown', function (e) {
            destroyAllStackShadows(this);
        });
        addEvent(Chart, 'afterDrillUp', function (e) {
            destroyAllStackShadows(this);
        });
        PictorialSeries.prototype.pointClass = PictorialPoint;
        SeriesRegistry.registerSeriesType('pictorial', PictorialSeries);
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         * API Options
         *
         * */
        /**
         * A `pictorial` series. If the [type](#series.pictorial.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.pictorial
         * @since 11.0.0
         * @product   highcharts
         * @excluding dataParser, borderRadius, boostBlending, boostThreshold,
         *            borderColor, borderWidth, centerInCategory, connectEnds,
         *            connectNulls, crisp, colorKey, dataURL, dataAsColumns, depth,
         *            dragDrop, edgeColor, edgeWidth, linecap, lineWidth,  marker,
         *            dataSorting, dashStyle, onPoint, relativeXValue, shadow, zoneAxis,
         *            zones
         * @requires  modules/pictorial
         * @apioption series.pictorial
         */
        /**
         * An array of data points for the series. For the `pictorial` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 2 values. In this case, the values correspond
         *    to `x,y`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 40],
         *        [1, 50],
         *        [2, 60]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.pictorial.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 0,
         *        y: 40,
         *        name: "Point1",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 60,
         *        name: "Point2",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.column.data
         *
         * @sample {highcharts} highcharts/demo/pictorial/
         *         Pictorial chart
         * @sample {highcharts} highcharts/demo/pictorial-stackshadow/
         *         Pictorial stackShadow option
         * @sample {highcharts} highcharts/series-pictorial/paths-max/
         *         Pictorial max option
         *
         * @excluding borderColor, borderWidth, dashStyle, dragDrop
         * @since 11.0.0
         * @product   highcharts
         * @apioption series.pictorial.data
         */
        /**
         * The paths include options describing the point image.
         *
         * @declare   Highcharts.SeriesPictorialPathsOptionsObject
         * @type      {Array<*>}
         *
         * @sample    {highcharts} highcharts/demo/pictorial/
         *            Pictorial chart
         *
         * @since 11.0.0
         * @product   highcharts
         * @apioption series.pictorial.paths
         */
        /**
         * The definition defines a path to be drawn. It corresponds `d` SVG attribute.
         *
         * @type      {string}
         *
         * @sample    {highcharts} highcharts/demo/pictorial/
         *            Pictorial chart
         *
         * @product   highcharts
         * @apioption series.pictorial.paths.definition
         */
        /**
         * The max option determines height of the image. It is the ratio of
         * `yAxis.max` to the `paths.max`.
         *
         * @sample {highcharts} highcharts/series-pictorial/paths-max
         *         Pictorial max option
         *
         * @type      {number}
         * @default   yAxis.max
         * @product   highcharts
         * @apioption series.pictorial.paths.max
         */
        /**
         * Relevant only for pictorial series. The `stackShadow` forms the background of
         * stacked points. Requires `series.stacking` to be defined.
         *
         * @sample {highcharts} highcharts/demo/pictorial-stackshadow/ Pictorial
         *         stackShadow option
         *
         * @declare   Highcharts.YAxisOptions
         * @type      {*}
         * @since 11.0.0
         * @product   highcharts
         * @requires  modules/pictorial
         * @apioption yAxis.stackShadow
         */
        /**
         * The color of the `stackShadow` border.
         *
         * @declare   Highcharts.YAxisOptions
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   transparent
         * @product   highcharts
         * @requires  modules/pictorial
         * @apioption yAxis.stackShadow.borderColor
         */
        /**
         * The width of the `stackShadow` border.
         *
         * @declare   Highcharts.YAxisOptions
         * @type      {number}
         * @default   0
         * @product   highcharts
         * @requires  modules/pictorial
         * @apioption yAxis.stackShadow.borderWidth
         */
        /**
         * The color of the `stackShadow`.
         *
         * @declare   Highcharts.YAxisOptions
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   #dedede
         * @product   highcharts
         * @requires  modules/pictorial
         * @apioption yAxis.stackShadow.color
         */
        /**
         * Enable or disable `stackShadow`.
         *
         * @declare   Highcharts.YAxisOptions
         * @type      {boolean}
         * @default   undefined
         * @product   highcharts
         * @requires  modules/pictorial
         * @apioption yAxis.stackShadow.enabled
         */
        ''; // adds doclets above to transpiled file

        return PictorialSeries;
    });
    _registerModule(_modules, 'masters/modules/pictorial.src.js', [], function () {


    });
}));