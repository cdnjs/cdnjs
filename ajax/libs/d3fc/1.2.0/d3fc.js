(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('css-layout'), require('d3')) :
    typeof define === 'function' && define.amd ? define(['css-layout', 'd3'], factory) :
    global.fc = factory(global.computeLayout,global.d3);
}(this, function (computeLayout,d3) { 'use strict';

    computeLayout = 'default' in computeLayout ? computeLayout['default'] : computeLayout;
    d3 = 'default' in d3 ? d3['default'] : d3;

    var _scale = {
        get isOrdinal () { return isOrdinal; },
        get range () { return range; }
    };

    var _fn = {
        get context () { return context; },
        get identity () { return identity; },
        get index () { return _index; },
        get noop () { return noop; }
    };

    // returns the width and height of the given element minus the padding.
    function innerDimensions(element) {
        var style = element.ownerDocument.defaultView.getComputedStyle(element);
        return {
            width: parseFloat(style.width) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
            height: parseFloat(style.height) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
        };
    }

    function _layout() {

        var width = -1,
            height = -1;

        // parses the style attribute, converting it into a JavaScript object
        function parseStyle(style) {
            if (!style) {
                return {};
            }
            var properties = style.split(';');
            var json = {};
            properties.forEach(function(property) {
                var components = property.split(':');
                if (components.length === 2) {
                    var name = components[0].trim();
                    var value = components[1].trim();
                    json[name] = isNaN(value) ? value : Number(value);
                }
            });
            return json;
        }

        // creates the structure required by the layout engine
        function createNodes(el) {
            function getChildNodes() {
                var children = [];
                for (var i = 0; i < el.childNodes.length; i++) {
                    var child = el.childNodes[i];
                    if (child.nodeType === 1) {
                        if (child.getAttribute('layout-css')) {
                            children.push(createNodes(child));
                        }
                    }
                }
                return children;
            }
            return {
                style: parseStyle(el.getAttribute('layout-css')),
                children: getChildNodes(el),
                element: el
            };
        }

        // takes the result of layout and applied it to the SVG elements
        function applyLayout(node) {
            node.element.setAttribute('layout-width', node.layout.width);
            node.element.setAttribute('layout-height', node.layout.height);
            if (node.element.nodeName.match(/(?:svg|rect)/i)) {
                node.element.setAttribute('width', node.layout.width);
                node.element.setAttribute('height', node.layout.height);
                node.element.setAttribute('x', node.layout.left);
                node.element.setAttribute('y', node.layout.top);
            } else {
                node.element.setAttribute('transform',
                    'translate(' + node.layout.left + ', ' + node.layout.top + ')');
            }
            node.children.forEach(applyLayout);
        }

        var layout = function(selection) {
            selection.each(function(data) {
                var dimensions = innerDimensions(this);

                // create the layout nodes
                var layoutNodes = createNodes(this);

                // set the width / height of the root
                layoutNodes.style.width = width !== -1 ? width : dimensions.width;
                layoutNodes.style.height = height !== -1 ? height : dimensions.height;

                // use the Facebook CSS goodness
                computeLayout(layoutNodes);

                // apply the resultant layout
                applyLayout(layoutNodes);
            });
        };

        layout.width = function(x) {
            if (!arguments.length) {
                return width;
            }
            width = x;
            return layout;
        };
        layout.height = function(x) {
            if (!arguments.length) {
                return height;
            }
            height = x;
            return layout;
        };

        return layout;
    }

    d3.selection.prototype.layout = function(name, value) {
        var layout = _layout();
        var n = arguments.length;
        if (n === 2) {
            if (typeof name !== 'string') {
                // layout(number, number) - sets the width and height and performs layout
                layout.width(name).height(value);
                this.call(layout);
            } else {
                // layout(name, value) - sets a layout- attribute
                this.attr('layout-css', name + ':' + value);
            }
        } else if (n === 1) {
            if (typeof name !== 'string') {
                // layout(object) - sets the layout-css property to the given object
                var styleObject = name;
                var layoutCss = Object.keys(styleObject)
                    .map(function(property) {
                        return property + ':' + styleObject[property];
                    })
                    .join(';');
                this.attr('layout-css', layoutCss);
            } else {
                // layout(name) - returns the value of the layout-name attribute
                return Number(this.attr('layout-' + name));
            }
        } else if (n === 0) {
            // layout() - executes layout
            this.call(layout);
        }
        return this;
    };

    function noSnap(xScale, yScale) {
        return function(xPixel, yPixel) {
            // ordinal axes don't invert pixel values (interpolation doesn't
            // always make sense) so we support two modes. One we're we record
            // the pixel value and another where we record the data value and
            // scale it before using it
            var result = {
                xInDomainUnits: false,
                x: xPixel,
                yInDomainUnits: false,
                y: yPixel
            };
            if (xScale.invert) {
                result.xInDomainUnits = true;
                result.x = xScale.invert(xPixel);
            }
            if (yScale.invert) {
                result.yInDomainUnits = true;
                result.y = yScale.invert(yPixel);
            }
            return result;
        };
    }

    function pointSnap(xScale, yScale, xValue, yValue, data, pointDistance) {
        // a default function that computes the distance between two points
        pointDistance = pointDistance || function(x, y, cx, cy) {
            var dx = x - cx,
                dy = y - cy;
            return Math.sqrt(dx * dx + dy * dy);
        };

        return function(xPixel, yPixel) {
            var nearest = data.map(function(d) {
                    var diff = pointDistance(xPixel, yPixel, xScale(xValue(d)), yScale(yValue(d)));
                    return [diff, d];
                })
                .reduce(function(accumulator, value) {
                    return accumulator[0] > value[0] ? value : accumulator;
                }, [Number.MAX_VALUE, null])[1];

            return {
                datum: nearest,
                x: nearest ? xValue(nearest) : xPixel,
                xInDomainUnits: Boolean(nearest),
                y: nearest ? yValue(nearest) : yPixel,
                yInDomainUnits: Boolean(nearest)
            };
        };
    }

    function seriesPointSnap(series, data, pointDistance) {
        return function(xPixel, yPixel) {
            var xScale = series.xScale(),
                yScale = series.yScale(),
                xValue = series.xValue(),
                yValue = (series.yValue || series.yCloseValue).call(series);
            return pointSnap(xScale, yScale, xValue, yValue, data, pointDistance)(xPixel, yPixel);
        };
    }

    function seriesPointSnapXOnly(series, data) {
        function pointDistance(x, y, cx, cy) {
            var dx = x - cx;
            return Math.abs(dx);
        }
        return seriesPointSnap(series, data, pointDistance);
    }

    function seriesPointSnapYOnly(series, data) {
        function pointDistance(x, y, cx, cy) {
            var dy = y - cy;
            return Math.abs(dy);
        }
        return seriesPointSnap(series, data, pointDistance);
    }

    function isOrdinal(scale) {
        return scale.rangeExtent;
    }

    // ordinal axes have a rangeExtent function, this adds any padding that
    // was applied to the range. This functions returns the rangeExtent
    // if present, or range otherwise
    function range(scale) {
        return isOrdinal(scale) ? scale.rangeExtent() : scale.range();
    }

    /**
     * An overload of the d3.rebind method which allows the source methods
     * to be rebound to the target with a different name. In the mappings object
     * keys represent the target method names and values represent the source
     * object names.
     */
    function rebind(target, source, mappings) {
        if (typeof(mappings) !== 'object') {
            return d3.rebind.apply(d3, arguments);
        }
        Object.keys(mappings)
            .forEach(function(targetName) {
                var method = source[mappings[targetName]];
                if (typeof method !== 'function') {
                    throw new Error('The method ' + mappings[targetName] + ' does not exist on the source object');
                }
                target[targetName] = function() {
                    var value = method.apply(source, arguments);
                    return value === source ? target : value;
                };
            });
        return target;
    }

    function capitalizeFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    /**
     * Rebinds all the methods from the source component, adding the given prefix. An
     * optional exclusions parameter can be used to specify methods which should not
     * be rebound.
     */
    function rebindAll(target, source, prefix, exclusions) {
        if (arguments.length === 3) {
            // if only three args are supplied, there are no exclusions
            exclusions = [];
        } else if (arguments.length === 4) {
            // if four args are supplied, check exclusions is an array, if not
            // assume it is a single string and construct an array
            if (!Array.isArray(exclusions)) {
                exclusions = [exclusions];
            }
        } else {
            // for > 4 args, construct the exclusions
            var args = Array.prototype.slice.call(arguments);
            exclusions = args.slice(3);
        }

        exclusions.forEach(function(property) {
            if (!source.hasOwnProperty(property)) {
                throw new Error('The method ' + property + ' does not exist on the source object');
            }
        });

        var bindings = {};
        for (var property in source) {
            if (source.hasOwnProperty(property) && exclusions.indexOf(property) === -1) {
                bindings[prefix + capitalizeFirstLetter(property)] = property;
            }
        }
        rebind(target, source, bindings);
    }

    // the barWidth property of the various series takes a function which, when given an
    // array of x values, returns a suitable width. This function creates a width which is
    // equal to the smallest distance between neighbouring datapoints multiplied
    // by the given factor
    function fractionalBarWidth(fraction) {

        return function(pixelValues) {
            // return some default value if there are not enough datapoints to compute the width
            if (pixelValues.length <= 1) {
                return 10;
            }

            pixelValues.sort();

            // compute the distance between neighbouring items
            var neighbourDistances = d3.pairs(pixelValues)
                .map(function(tuple) {
                    return Math.abs(tuple[0] - tuple[1]);
                });

            var minDistance = d3.min(neighbourDistances);
            return fraction * minDistance;
        };
    }

    function context() {
        return this;
    }

    function identity(d) {
        return d;
    }

    function _index(d, i) {
        return i;
    }

    function noop(d) {}

    /**
     * The extent function enhances the functionality of the equivalent D3 extent function, allowing
     * you to pass an array of fields, or accessors, which will be used to derive the extent of the supplied array. For
     * example, if you have an array of items with properties of 'high' and 'low', you
     * can use <code>fc.util.extent(data, ['high', 'low'])</code> to compute the extent of your data.
     *
     * @memberof fc.util
     * @param {array} data an array of data points, or an array of arrays of data points
     * @param {array} fields the names of object properties that represent field values, or accessor functions.
     */
    function extent(data, fields) {

        // we need an array of arrays if we don't have one already
        if (!Array.isArray(data[0])) {
            data = [data];
        }
        // the fields parameter must be an array of field names, but we can pass non-array types in
        if (!Array.isArray(fields)) {
            fields = [fields];
        }
        // the fields can be an array of property names or accessor functions
        if (typeof(fields[0]) !== 'function') {
            fields = fields.map(function(f) { return function(d) { return d[f]; }; });
        }

        // Return the smallest and largest
        return [
            d3.min(data, function(d0) {
                return d3.min(d0, function(d1) {
                    return d3.min(fields.map(function(f) {
                        return f(d1);
                    }));
                });
            }),
            d3.max(data, function(d0) {
                return d3.max(d0, function(d1) {
                    return d3.max(fields.map(function(f) {
                        return f(d1);
                    }));
                });
            })
        ];
    }

    // A margin is an object with top, left, bottom and right properties. Component
    // margin properties can accept an integer, which is converted to a margin where each
    // property equals the given value. Also, a margin may have properties missing, in
    // which case they default to zero.
    // This function expand an integer to a margin and fills missing properties.
    function expandMargin(margin) {
        var expandedMargin = margin;
        if (typeof(expandedMargin) === 'number') {
            expandedMargin = {
                top: margin,
                bottom: margin,
                left: margin,
                right: margin
            };
        }
        ['top', 'bottom', 'left', 'right'].forEach(function(direction) {
            if (!expandedMargin[direction]) {
                expandedMargin[direction] = 0;
            }
        });
        return expandedMargin;
    }

    // "Caution: avoid interpolating to or from the number zero when the interpolator is used to generate
    // a string (such as with attr).
    // Very small values, when stringified, may be converted to scientific notation and
    // cause a temporarily invalid attribute or style property value.
    // For example, the number 0.0000001 is converted to the string "1e-7".
    // This is particularly noticeable when interpolating opacity values.
    // To avoid scientific notation, start or end the transition at 1e-6,
    // which is the smallest value that is not stringified in exponential notation."
    // - https://github.com/mbostock/d3/wiki/Transitions#d3_interpolateNumber
    var effectivelyZero = 1e-6;

    // Wrapper around d3's selectAll/data data-join, which allows decoration of the result.
    // This is achieved by appending the element to the enter selection before exposing it.
    // A default transition of fade in/out is also implicitly added but can be modified.

    function dataJoin() {
        var selector = 'g',
            children = false,
            element = 'g',
            attr = {},
            key = _index;

        var dataJoin = function(container, data) {

            var joinedData = data || identity;

            // Can't use instanceof d3.selection (see #458)
            if (!(container.selectAll && container.node)) {
                container = d3.select(container);
            }

            // update
            var selection = container.selectAll(selector);
            if (children) {
                // in order to support nested selections, they can be filtered
                // to only return immediate children of the container
                selection = selection.filter(function() {
                    return this.parentNode === container.node();
                });
            }
            var updateSelection = selection.data(joinedData, key);

            // enter
            // when container is a transition, entering elements fade in (from transparent to opaque)
            // N.B. insert() is used to create new elements, rather than append(). insert() behaves in a special manner
            // on enter selections - entering elements will be inserted immediately before the next following sibling
            // in the update selection, if any.
            // This helps order the elements in an order consistent with the data, but doesn't guarantee the ordering;
            // if the updating elements change order then selection.order() would be required to update the order.
            // (#528)
            var enterSelection = updateSelection.enter()
                .insert(element) // <<<--- this is the secret sauce of this whole file
                .attr(attr)
                .style('opacity', effectivelyZero);

            // exit
            // when container is a transition, exiting elements fade out (from opaque to transparent)
            var exitSelection = d3.transition(updateSelection.exit())
                .style('opacity', effectivelyZero)
                .remove();

            // when container is a transition, all properties of the transition (which can be interpolated)
            // will transition
            updateSelection = d3.transition(updateSelection)
                .style('opacity', 1);

            updateSelection.enter = d3.functor(enterSelection);
            updateSelection.exit = d3.functor(exitSelection);
            return updateSelection;
        };

        dataJoin.selector = function(x) {
            if (!arguments.length) {
                return selector;
            }
            selector = x;
            return dataJoin;
        };
        dataJoin.children = function(x) {
            if (!arguments.length) {
                return children;
            }
            children = x;
            return dataJoin;
        };
        dataJoin.element = function(x) {
            if (!arguments.length) {
                return element;
            }
            element = x;
            return dataJoin;
        };
        dataJoin.attr = function(x) {
            if (!arguments.length) {
                return attr;
            }

            if (arguments.length === 1) {
                attr = arguments[0];
            } else if (arguments.length === 2) {
                var key = arguments[0];
                var value = arguments[1];

                attr[key] = value;
            }

            return dataJoin;
        };
        dataJoin.key = function(x) {
            if (!arguments.length) {
                return key;
            }
            key = x;
            return dataJoin;
        };

        return dataJoin;
    }

    var util = {
        dataJoin: dataJoin,
        expandMargin: expandMargin,
        extent: extent,
        fn: _fn,
        fractionalBarWidth: fractionalBarWidth,
        innerDimensions: innerDimensions,
        rebind: rebind,
        rebindAll: rebindAll,
        scale: _scale,
        noSnap: noSnap,
        pointSnap: pointSnap,
        seriesPointSnap: seriesPointSnap,
        seriesPointSnapXOnly: seriesPointSnapXOnly,
        seriesPointSnapYOnly: seriesPointSnapYOnly
    };

    function measure() {

        var event = d3.dispatch('measuresource', 'measuretarget', 'measureclear'),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            snap = function(x, y) {
                return noSnap(xScale, yScale)(x, y);
            },
            decorate = noop,
            xLabel = d3.functor(''),
            yLabel = d3.functor(''),
            padding = d3.functor(2);

        var x = function(d) { return d.xInDomainUnits ? xScale(d.x) : d.x; },
            y = function(d) { return d.yInDomainUnits ? yScale(d.y) : d.y; };

        var dataJoin$$ = dataJoin()
            .selector('g.measure')
            .element('g')
            .attr('class', 'measure');

        var measure = function(selection) {

            selection.each(function(data, index) {

                var container = d3.select(this)
                    .style('pointer-events', 'all')
                    .on('mouseenter.measure', mouseenter);

                var overlay = container.selectAll('rect')
                    .data([data]);

                overlay.enter()
                    .append('rect')
                    .style('visibility', 'hidden');

                container.select('rect')
                    .attr('x', xScale.range()[0])
                    .attr('y', yScale.range()[1])
                    .attr('width', xScale.range()[1])
                    .attr('height', yScale.range()[0]);

                var g = dataJoin$$(container, data);

                var enter = g.enter();
                enter.append('line')
                    .attr('class', 'tangent');
                enter.append('line')
                    .attr('class', 'horizontal');
                enter.append('line')
                    .attr('class', 'vertical');
                enter.append('text')
                    .attr('class', 'horizontal');
                enter.append('text')
                    .attr('class', 'vertical');

                g.select('line.tangent')
                    .attr('x1', function(d) { return x(d.source); })
                    .attr('y1', function(d) { return y(d.source); })
                    .attr('x2', function(d) { return x(d.target); })
                    .attr('y2', function(d) { return y(d.target); });

                g.select('line.horizontal')
                    .attr('x1', function(d) { return x(d.source); })
                    .attr('y1', function(d) { return y(d.source); })
                    .attr('x2', function(d) { return x(d.target); })
                    .attr('y2', function(d) { return y(d.source); })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; });

                g.select('line.vertical')
                    .attr('x1', function(d) { return x(d.target); })
                    .attr('y1', function(d) { return y(d.target); })
                    .attr('x2', function(d) { return x(d.target); })
                    .attr('y2', function(d) { return y(d.source); })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; });

                var paddingValue = padding.apply(this, arguments);

                g.select('text.horizontal')
                    .attr('x', function(d) { return x(d.source) + (x(d.target) - x(d.source)) / 2; })
                    .attr('y', function(d) { return y(d.source) - paddingValue; })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; })
                    .text(xLabel);

                g.select('text.vertical')
                    .attr('x', function(d) { return x(d.target) + paddingValue; })
                    .attr('y', function(d) { return y(d.source) + (y(d.target) - y(d.source)) / 2; })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; })
                    .text(yLabel);

                decorate(g, data, index);
            });
        };

        function updatePositions() {
            var container = d3.select(this);
            var datum = container.datum()[0];
            if (datum.state !== 'DONE') {
                var mouse = d3.mouse(this);
                var snapped = snap.apply(this, mouse);
                if (datum.state === 'SELECT_SOURCE') {
                    datum.source = datum.target = snapped;
                } else if (datum.state === 'SELECT_TARGET') {
                    datum.target = snapped;
                } else {
                    throw new Error('Unknown state ' + datum.state);
                }
            }
        }

        function mouseenter() {
            var container = d3.select(this)
                .on('click.measure', mouseclick)
                .on('mousemove.measure', mousemove)
                .on('mouseleave.measure', mouseleave);
            var data = container.datum();
            if (data[0] == null) {
                data.push({
                    state: 'SELECT_SOURCE'
                });
            }
            updatePositions.call(this);
            container.call(measure);
        }

        function mousemove() {
            var container = d3.select(this);
            updatePositions.call(this);
            container.call(measure);
        }

        function mouseleave() {
            var container = d3.select(this);
            var data = container.datum();
            if (data[0] != null && data[0].state === 'SELECT_SOURCE') {
                data.pop();
            }
            container.on('click.measure', null)
                .on('mousemove.measure', null)
                .on('mouseleave.measure', null);
        }

        function mouseclick() {
            var container = d3.select(this);
            var datum = container.datum()[0];
            switch (datum.state) {
                case 'SELECT_SOURCE':
                    updatePositions.call(this);
                    event.measuresource.apply(this, arguments);
                    datum.state = 'SELECT_TARGET';
                    break;
                case 'SELECT_TARGET':
                    updatePositions.call(this);
                    event.measuretarget.apply(this, arguments);
                    datum.state = 'DONE';
                    break;
                case 'DONE':
                    event.measureclear.apply(this, arguments);
                    datum.state = 'SELECT_SOURCE';
                    updatePositions.call(this);
                    break;
                default:
                    throw new Error('Unknown state ' + datum.state);
            }
            container.call(measure);
        }

        measure.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return measure;
        };
        measure.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return measure;
        };
        measure.snap = function(x) {
            if (!arguments.length) {
                return snap;
            }
            snap = x;
            return measure;
        };
        measure.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return measure;
        };
        measure.xLabel = function(x) {
            if (!arguments.length) {
                return xLabel;
            }
            xLabel = d3.functor(x);
            return measure;
        };
        measure.yLabel = function(x) {
            if (!arguments.length) {
                return yLabel;
            }
            yLabel = d3.functor(x);
            return measure;
        };
        measure.padding = function(x) {
            if (!arguments.length) {
                return padding;
            }
            padding = d3.functor(x);
            return measure;
        };

        d3.rebind(measure, event, 'on');

        return measure;
    }

    function fibonacciFan() {

        var event = d3.dispatch('fansource', 'fantarget', 'fanclear'),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            snap = function(x, y) {
                return noSnap(xScale, yScale)(x, y);
            },
            decorate = noop;

        var x = function(d) { return d.xInDomainUnits ? xScale(d.x) : d.x; },
            y = function(d) { return d.yInDomainUnits ? yScale(d.y) : d.y; };

        var dataJoin$$ = dataJoin()
            .selector('g.fan')
            .element('g')
            .attr('class', 'fan');

        var fan = function(selection) {

            selection.each(function(data, index) {

                var container = d3.select(this)
                    .style('pointer-events', 'all')
                    .on('mouseenter.fan', mouseenter);

                var overlay = container.selectAll('rect')
                    .data([data]);

                overlay.enter()
                    .append('rect')
                    .style('visibility', 'hidden');

                container.select('rect')
                    .attr('x', xScale.range()[0])
                    .attr('y', yScale.range()[1])
                    .attr('width', xScale.range()[1])
                    .attr('height', yScale.range()[0]);

                var g = dataJoin$$(container, data);

                g.each(function(d) {
                    d.x = xScale.range()[1];
                    d.ay = d.by = d.cy = y(d.target);

                    if (x(d.source) !== x(d.target)) {

                        if (d.state === 'DONE' && x(d.source) > x(d.target)) {
                            var temp = d.source;
                            d.source = d.target;
                            d.target = temp;
                        }

                        var gradient = (y(d.target) - y(d.source)) /
                            (x(d.target) - x(d.source));
                        var deltaX = d.x - x(d.source);
                        var deltaY = gradient * deltaX;
                        d.ay = 0.618 * deltaY + y(d.source);
                        d.by = 0.500 * deltaY + y(d.source);
                        d.cy = 0.382 * deltaY + y(d.source);
                    }
                });

                var enter = g.enter();
                enter.append('line')
                    .attr('class', 'trend');
                enter.append('line')
                    .attr('class', 'a');
                enter.append('line')
                    .attr('class', 'b');
                enter.append('line')
                    .attr('class', 'c');
                enter.append('polygon')
                    .attr('class', 'area');

                g.select('line.trend')
                    .attr('x1', function(d) { return x(d.source); })
                    .attr('y1', function(d) { return y(d.source); })
                    .attr('x2', function(d) { return x(d.target); })
                    .attr('y2', function(d) { return y(d.target); });

                g.select('line.a')
                    .attr('x1', function(d) { return x(d.source); })
                    .attr('y1', function(d) { return y(d.source); })
                    .attr('x2', function(d) { return d.x; })
                    .attr('y2', function(d) { return d.ay; })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; });

                g.select('line.b')
                    .attr('x1', function(d) { return x(d.source); })
                    .attr('y1', function(d) { return y(d.source); })
                    .attr('x2', function(d) { return d.x; })
                    .attr('y2', function(d) { return d.by; })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; });

                g.select('line.c')
                    .attr('x1', function(d) { return x(d.source); })
                    .attr('y1', function(d) { return y(d.source); })
                    .attr('x2', function(d) { return d.x; })
                    .attr('y2', function(d) { return d.cy; })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; });

                g.select('polygon.area')
                    .attr('points', function(d) {
                        return x(d.source) + ',' + y(d.source) + ' ' +
                            d.x + ',' + d.ay + ' ' +
                            d.x + ',' + d.cy;
                    })
                    .style('visibility', function(d) { return d.state !== 'DONE' ? 'hidden' : 'visible'; });

                decorate(g, data, index);
            });
        };

        function updatePositions() {
            var container = d3.select(this);
            var datum = container.datum()[0];
            if (datum.state !== 'DONE') {
                var mouse = d3.mouse(this);
                var snapped = snap.apply(this, mouse);
                if (datum.state === 'SELECT_SOURCE') {
                    datum.source = datum.target = snapped;
                } else if (datum.state === 'SELECT_TARGET') {
                    datum.target = snapped;
                } else {
                    throw new Error('Unknown state ' + datum.state);
                }
            }
        }

        function mouseenter() {
            var container = d3.select(this)
                .on('click.fan', mouseclick)
                .on('mousemove.fan', mousemove)
                .on('mouseleave.fan', mouseleave);
            var data = container.datum();
            if (data[0] == null) {
                data.push({
                    state: 'SELECT_SOURCE'
                });
            }
            updatePositions.call(this);
            container.call(fan);
        }

        function mousemove() {
            var container = d3.select(this);
            updatePositions.call(this);
            container.call(fan);
        }

        function mouseleave() {
            var container = d3.select(this);
            var data = container.datum();
            if (data[0] != null && data[0].state === 'SELECT_SOURCE') {
                data.pop();
            }
            container.on('click.fan', null)
                .on('mousemove.fan', null)
                .on('mouseleave.fan', null);
        }

        function mouseclick() {
            var container = d3.select(this);
            var datum = container.datum()[0];
            switch (datum.state) {
                case 'SELECT_SOURCE':
                    updatePositions.call(this);
                    event.fansource.apply(this, arguments);
                    datum.state = 'SELECT_TARGET';
                    break;
                case 'SELECT_TARGET':
                    updatePositions.call(this);
                    event.fantarget.apply(this, arguments);
                    datum.state = 'DONE';
                    break;
                case 'DONE':
                    event.fanclear.apply(this, arguments);
                    datum.state = 'SELECT_SOURCE';
                    updatePositions.call(this);
                    break;
                default:
                    throw new Error('Unknown state ' + datum.state);
            }
            container.call(fan);
        }

        fan.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return fan;
        };
        fan.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return fan;
        };
        fan.snap = function(x) {
            if (!arguments.length) {
                return snap;
            }
            snap = x;
            return fan;
        };
        fan.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return fan;
        };

        d3.rebind(fan, event, 'on');

        return fan;
    }

    // The multi series does some data-join gymnastics to ensure we don't -
    // * Create unnecessary intermediate DOM nodes
    // * Manipulate the data specified by the user
    // This is achieved by data joining the series array to the container but
    // overriding where the series value is stored on the node (__series__) and
    // forcing the node datum (__data__) to be the user supplied data (via mapping).

    function _multi() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            series = [],
            mapping = context,
            key = _index,
            decorate = noop;

        var dataJoin$$ = dataJoin()
            .selector('g.multi')
            .children(true)
            .attr('class', 'multi')
            .element('g')
            .key(function(d, i) {
                // This function is invoked twice, the first pass is to pull the key
                // value from the DOM nodes and the second pass is to pull the key
                // value from the data values.
                // As we store the series as an additional property on the node, we
                // look for that first and if we find it assume we're being called
                // during the first pass. Otherwise we assume it's the second pass
                // and pull the series from the data value.
                var series = this.__series__ || d;
                return key.call(this, series, i);
            });

        var multi = function(selection) {

            selection.each(function(data) {

                var g = dataJoin$$(this, series);

                g.each(function(series, i) {
                    // We must always assign the series to the node, as the order
                    // may have changed. N.B. in such a case the output is most
                    // likely garbage (containers should not be re-used) but by
                    // doing this we at least make it debuggable garbage :)
                    this.__series__ = series;

                    (series.xScale || series.x).call(series, xScale);
                    (series.yScale || series.y).call(series, yScale);

                    d3.select(this)
                        .datum(mapping.call(data, series, i))
                        .call(series);
                });

                decorate(g);
            });
        };

        multi.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return multi;
        };
        multi.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return multi;
        };
        multi.series = function(x) {
            if (!arguments.length) {
                return series;
            }
            series = x;
            return multi;
        };
        multi.mapping = function(x) {
            if (!arguments.length) {
                return mapping;
            }
            mapping = x;
            return multi;
        };
        multi.key = function(x) {
            if (!arguments.length) {
                return key;
            }
            key = x;
            return multi;
        };
        multi.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return multi;
        };

        return multi;
    }

    function line() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            value = identity,
            keyValue = _index,
            label = value,
            decorate = noop,
            orient = 'horizontal';

        var dataJoin$$ = dataJoin()
            .selector('g.annotation')
            .element('g')
            .attr('class', 'annotation');

        var line = function(selection) {
            selection.each(function(data, index) {

                // the value scale which the annotation 'value' relates to, the crossScale
                // is the other. Which is which depends on the orienation!
                var valueScale, crossScale, translation, lineProperty,
                    handleOne, handleTwo,
                    textAttributes = {x: -5, y: -5};
                switch (orient) {
                    case 'horizontal':
                        translation = function(a, b) { return 'translate(' + a + ', ' + b + ')'; };
                        lineProperty = 'x2';
                        crossScale = xScale;
                        valueScale = yScale;
                        handleOne = 'left-handle';
                        handleTwo = 'right-handle';
                        break;

                    case 'vertical':
                        translation = function(a, b) { return 'translate(' + b + ', ' + a + ')'; };
                        lineProperty = 'y2';
                        crossScale = yScale;
                        valueScale = xScale;
                        textAttributes.transform = 'rotate(-90)';
                        handleOne = 'bottom-handle';
                        handleTwo = 'top-handle';
                        break;

                    default:
                        throw new Error('Invalid orientation');
                }

                var scaleRange = range(crossScale),
                    // the transform that sets the 'origin' of the annotation
                    containerTransform = function(d) {
                        var transform = valueScale(value(d));
                        return translation(scaleRange[0], transform);
                    },
                    scaleWidth = scaleRange[1] - scaleRange[0];

                var container = d3.select(this);

                // Create a group for each line
                var g = dataJoin$$(container, data);

                // create the outer container and line
                var enter = g.enter()
                    .attr('transform', containerTransform);
                enter.append('line')
                    .attr(lineProperty, scaleWidth);

                // create containers at each end of the annotation
                enter.append('g')
                    .classed(handleOne, true);

                enter.append('g')
                    .classed(handleTwo, true)
                    .attr('transform', translation(scaleWidth, 0))
                    .append('text')
                    .attr(textAttributes);

                // Update

                // translate the parent container to the left hand edge of the annotation
                g.attr('transform', containerTransform);

                // update the elements that depend on scale width
                g.select('line')
                    .attr(lineProperty, scaleWidth);
                g.select('g.' + handleTwo)
                    .attr('transform', translation(scaleWidth, 0));

                // Update the text label
                g.select('text')
                    .text(label);

                decorate(g, data, index);
            });
        };

        line.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return line;
        };
        line.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return line;
        };
        line.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = d3.functor(x);
            return line;
        };
        line.keyValue = function(x) {
            if (!arguments.length) {
                return keyValue;
            }
            keyValue = d3.functor(x);
            return line;
        };
        line.label = function(x) {
            if (!arguments.length) {
                return label;
            }
            label = d3.functor(x);
            return line;
        };
        line.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return line;
        };
        line.orient = function(x) {
            if (!arguments.length) {
                return orient;
            }
            orient = x;
            return line;
        };
        return line;
    }

    function point() {

        var decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            yValue = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; },
            radius = d3.functor(5);

        var dataJoin$$ = dataJoin()
            .selector('g.point')
            .element('g')
            .attr('class', 'point');

        var containerTransform = function(d, i) {
            var x = xScale(xValue(d, i)),
                y = yScale(yValue(d, i));
            return 'translate(' + x + ', ' + y + ')';
        };

        var point = function(selection) {

            selection.each(function(data, index) {

                var g = dataJoin$$(this, data);

                g.enter()
                    .attr('transform', containerTransform)
                    .append('circle');

                g.attr('transform', containerTransform);

                g.select('circle')
                    .attr('r', radius);

                decorate(g, data, index);
            });
        };

        point.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return point;
        };
        point.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return point;
        };
        point.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return point;
        };
        point.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return point;
        };
        point.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return point;
        };

        point.radius = function(x) {
            if (!arguments.length) {
                return radius;
            }
            radius = x;
            return point;
        };

        d3.rebind(point, dataJoin$$, 'key');

        return point;
    }

    function crosshair() {

        var event = d3.dispatch('trackingstart', 'trackingmove', 'trackingend'),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            snap = function(x, y) {
                return noSnap(xScale, yScale)(x, y);
            },
            decorate = noop;

        var x = function(d) { return d.xInDomainUnits ? xScale(d.x) : d.x; },
            y = function(d) { return d.yInDomainUnits ? yScale(d.y) : d.y; };

        var dataJoin$$ = dataJoin()
            .children(true)
            .selector('g.crosshair')
            .element('g')
            .attr('class', 'crosshair');

        var pointSeries = point()
            .xValue(x)
            .yValue(y);

        var horizontalLine = line()
            .value(y)
            .label(function(d) { return d.y; });

        var verticalLine = line()
            .orient('vertical')
            .value(x)
            .label(function(d) { return d.x; });

        // the line annotations used to render the crosshair are positioned using
        // screen coordinates. This function constructs a suitable scale for rendering
        // these annotations.
        function identityScale(scale) {
            return d3.scale.identity()
                .range(range(scale));
        }

        var crosshair = function(selection) {

            selection.each(function(data, index) {

                var container = d3.select(this)
                    .style('pointer-events', 'all')
                    .on('mouseenter.crosshair', mouseenter)
                    .on('mousemove.crosshair', mousemove)
                    .on('mouseleave.crosshair', mouseleave);

                var overlay = container.selectAll('rect')
                    .data([data]);

                overlay.enter()
                    .append('rect')
                    .style('visibility', 'hidden');

                container.select('rect')
                    .attr('x', range(xScale)[0])
                    .attr('y', range(yScale)[1])
                    .attr('width', range(xScale)[1])
                    .attr('height', range(yScale)[0]);

                var crosshair = dataJoin$$(container, data);

                crosshair.enter()
                    .style('pointer-events', 'none');

                var multi = _multi()
                    .series([horizontalLine, verticalLine, pointSeries])
                    .xScale(identityScale(xScale))
                    .yScale(identityScale(yScale))
                    .mapping(function() {
                        return [this];
                    });

                crosshair.call(multi);

                decorate(crosshair, data, index);
            });
        };

        function mouseenter() {
            var mouse = d3.mouse(this);
            var container = d3.select(this);
            var snapped = snap.apply(this, mouse);
            var data = container.datum();
            data.push(snapped);
            container.call(crosshair);
            event.trackingstart.apply(this, arguments);
        }

        function mousemove() {
            var mouse = d3.mouse(this);
            var container = d3.select(this);
            var snapped = snap.apply(this, mouse);
            var data = container.datum();
            data[data.length - 1] = snapped;
            container.call(crosshair);
            event.trackingmove.apply(this, arguments);
        }

        function mouseleave() {
            var container = d3.select(this);
            var data = container.datum();
            data.pop();
            container.call(crosshair);
            event.trackingend.apply(this, arguments);
        }

        crosshair.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return crosshair;
        };
        crosshair.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return crosshair;
        };
        crosshair.snap = function(x) {
            if (!arguments.length) {
                return snap;
            }
            snap = x;
            return crosshair;
        };
        crosshair.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return crosshair;
        };

        d3.rebind(crosshair, event, 'on');

        rebind(crosshair, horizontalLine, {
            yLabel: 'label'
        });

        rebind(crosshair, verticalLine, {
            xLabel: 'label'
        });

        return crosshair;
    }

    var tool = {
        crosshair: crosshair,
        fibonacciFan: fibonacciFan,
        measure: measure
    };

    // Renders an OHLC as an SVG path based on the given array of datapoints. Each
    // OHLC has a fixed width, whilst the x, open, high, low and close positions are
    // obtained from each point via the supplied accessor functions.
    function ohlc() {

        var x = function(d, i) { return d.date; },
            open = function(d, i) { return d.open; },
            high = function(d, i) { return d.high; },
            low = function(d, i) { return d.low; },
            close = function(d, i) { return d.close; },
            width = d3.functor(3);

        var ohlc = function(data) {

            return data.map(function(d, i) {
                var xValue = x(d, i),
                    yOpen = open(d, i),
                    yHigh = high(d, i),
                    yLow = low(d, i),
                    yClose = close(d, i),
                    halfWidth = width(d, i) / 2;

                var moveToLow = 'M' + xValue + ',' + yLow,
                    verticalToHigh = 'V' + yHigh,
                    openTick = 'M' + xValue + ',' + yOpen + 'h' + (-halfWidth),
                    closeTick = 'M' + xValue + ',' + yClose + 'h' + halfWidth;
                return moveToLow + verticalToHigh + openTick + closeTick;
            })
            .join('');
        };

        ohlc.x = function(_x) {
            if (!arguments.length) {
                return x;
            }
            x = _x;
            return ohlc;
        };
        ohlc.open = function(x) {
            if (!arguments.length) {
                return open;
            }
            open = x;
            return ohlc;
        };
        ohlc.high = function(x) {
            if (!arguments.length) {
                return high;
            }
            high = x;
            return ohlc;
        };
        ohlc.low = function(x) {
            if (!arguments.length) {
                return low;
            }
            low = x;
            return ohlc;
        };
        ohlc.close = function(x) {
            if (!arguments.length) {
                return close;
            }
            close = x;
            return ohlc;
        };
        ohlc.width = function(x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(x);
            return ohlc;
        };

        return ohlc;

    }

    // Renders a candlestick as an SVG path based on the given array of datapoints. Each
    // candlestick has a fixed width, whilst the x, open, high, low and close positions are
    // obtained from each point via the supplied accessor functions.
    function candlestick() {

        var x = function(d, i) { return d.date; },
            open = function(d, i) { return d.open; },
            high = function(d, i) { return d.high; },
            low = function(d, i) { return d.low; },
            close = function(d, i) { return d.close; },
            width = d3.functor(3);

        var candlestick = function(data) {

            return data.map(function(d, i) {
                var xValue = x(d, i),
                    yOpen = open(d, i),
                    yHigh = high(d, i),
                    yLow = low(d, i),
                    yClose = close(d, i),
                    barWidth = width(d, i);

                // Move to the opening price
                var body = 'M' + (xValue - barWidth / 2) + ',' + yOpen +
                    // Draw the width
                    'h' + barWidth +
                    // Draw to the closing price (vertically)
                    'V' + yClose +
                    // Draw the width
                    'h' + -barWidth +
                    // Move back to the opening price
                    'V' + yOpen +
                    // Close the path
                    'z';

                // Move to the max price of close or open; draw the high wick
                // N.B. Math.min() is used as we're dealing with pixel values,
                // the lower the pixel value, the higher the price!
                var highWick = 'M' + xValue + ',' + Math.min(yClose, yOpen) +
                    'V' + yHigh;

                // Move to the min price of close or open; draw the low wick
                // N.B. Math.max() is used as we're dealing with pixel values,
                // the higher the pixel value, the lower the price!
                var lowWick = 'M' + xValue + ',' + Math.max(yClose, yOpen) +
                    'V' + yLow;

                return body + highWick + lowWick;
            })
            .join('');
        };

        candlestick.x = function(_x) {
            if (!arguments.length) {
                return x;
            }
            x = _x;
            return candlestick;
        };
        candlestick.open = function(x) {
            if (!arguments.length) {
                return open;
            }
            open = x;
            return candlestick;
        };
        candlestick.high = function(x) {
            if (!arguments.length) {
                return high;
            }
            high = x;
            return candlestick;
        };
        candlestick.low = function(x) {
            if (!arguments.length) {
                return low;
            }
            low = x;
            return candlestick;
        };
        candlestick.close = function(x) {
            if (!arguments.length) {
                return close;
            }
            close = x;
            return candlestick;
        };
        candlestick.width = function(x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(x);
            return candlestick;
        };

        return candlestick;

    }

    // Renders a bar series as an SVG path based on the given array of datapoints. Each
    // bar has a fixed width, whilst the x, y and height are obtained from each data
    // point via the supplied accessor functions.
    function bar() {

        var x = function(d, i) { return d.x; },
            y = function(d, i) { return d.y; },
            align = 'center',
            height = function(d, i) { return d.height; },
            width = d3.functor(3);

        var bar = function(data, index) {

            return data.map(function(d, i) {
                var xValue = x.call(this, d, index || i),
                    yValue = y.call(this, d, index || i),
                    barHeight = height.call(this, d, index || i),
                    barWidth = width.call(this, d, index || i);

                var offset;

                switch (align) {
                    case 'left':
                        offset = barWidth;
                        break;
                    case 'right':
                        offset = 0;
                        break;
                    case 'center':
                        offset = barWidth / 2;
                        break;
                    default:
                        throw new Error('Invalid alignment');
                }

                // Move to the start location
                var body = 'M' + (xValue - offset) + ',' + yValue +
                    // Draw the width
                    'h' + barWidth +
                    // Draw to the top
                    'v' + barHeight +
                    // Draw the width
                    'h' + -barWidth +
                    // Close the path
                    'z';
                return body;
            }, this)
            .join('');
        };

        bar.x = function(_x) {
            if (!arguments.length) {
                return x;
            }
            x = d3.functor(_x);
            return bar;
        };
        bar.y = function(x) {
            if (!arguments.length) {
                return y;
            }
            y = d3.functor(x);
            return bar;
        };
        bar.width = function(x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(x);
            return bar;
        };
        bar.align = function(x) {
            if (!arguments.length) {
                return align;
            }
            align = x;
            return bar;
        };
        bar.height = function(x) {
            if (!arguments.length) {
                return height;
            }
            height = d3.functor(x);
            return bar;
        };
        return bar;

    }

    // A drop-in replacement for the D3 axis, supporting the decorate pattern.
    function axis() {

        var scale = d3.scale.identity(),
              decorate = noop,
              orient = 'bottom',
              tickArguments = [10],
              tickValues = null,
              tickFormat = null,
              outerTickSize = 6,
              innerTickSize = 6,
              tickPadding = 3,
              svgDomainLine = d3.svg.line();

        var dataJoin$$ = dataJoin()
            .selector('g.tick')
            .element('g')
            .key(identity)
            .attr('class', 'tick');

        var domainPathDataJoin = dataJoin()
            .selector('path.domain')
            .element('path')
            .attr('class', 'domain');

        // returns a function that creates a translation based on
        // the bound data
        function containerTranslate(s, trans) {
            return function(d) {
                return trans(s(d), 0);
            };
        }

        function translate(x, y) {
            if (isVertical()) {
                return 'translate(' + y + ', ' + x + ')';
            } else {
                return 'translate(' + x + ', ' + y + ')';
            }
        }

        function pathTranspose(arr) {
            if (isVertical()) {
                return arr.map(function(d) {
                    return [d[1], d[0]];
                });
            } else {
                return arr;
            }
        }

        function isVertical() {
            return orient === 'left' || orient === 'right';
        }

        function tryApply(fn, defaultVal) {
            return scale[fn] ? scale[fn].apply(scale, tickArguments) : defaultVal;
        }

        var axis = function(selection) {

            selection.each(function(data, index) {

                // Stash a snapshot of the new scale, and retrieve the old snapshot.
                var scaleOld = this.__chart__ || scale;
                this.__chart__ = scale.copy();

                var ticksArray = tickValues == null ? tryApply('ticks', scale.domain()) : tickValues;
                var tickFormatter = tickFormat == null ? tryApply('tickFormat', identity) : tickFormat;
                var sign = orient === 'bottom' || orient === 'right' ? 1 : -1;
                var container = d3.select(this);

                // add the domain line
                var range$$ = range(scale);
                var domainPathData = pathTranspose([
                      [range$$[0], sign * outerTickSize],
                      [range$$[0], 0],
                      [range$$[1], 0],
                      [range$$[1], sign * outerTickSize]
                    ]);

                var domainLine = domainPathDataJoin(container, [data]);
                domainLine
                    .attr('d', svgDomainLine(domainPathData));

                // datajoin and construct the ticks / label
                dataJoin$$.attr({
                    // set the initial tick position based on the previous scale
                    // in order to get the correct enter transition - however, for ordinal
                    // scales the tick will not exist on the old scale, so use the current position
                    'transform': containerTranslate(isOrdinal(scale) ? scale : scaleOld, translate)
                });

                var g = dataJoin$$(container, ticksArray);

                // enter
                g.enter().append('path');

                var labelOffset = sign * (innerTickSize + tickPadding);
                g.enter()
                    .append('text')
                    .attr('transform', translate(0, labelOffset));

                // update
                g.attr('class', 'tick orient-' + orient);

                g.attr('transform', containerTranslate(scale, translate));

                g.selectAll('path')
                    .attr('d', function(d) {
                        return svgDomainLine(pathTranspose([
                            [0, 0], [0, sign * innerTickSize]
                        ]));
                    });

                g.selectAll('text')
                   .attr('transform', translate(0, labelOffset))
                   .text(tickFormatter);

                // exit - for non ordinal scales, exit by animating the tick to its new location
                if (!isOrdinal(scale)) {
                    g.exit()
                        .attr('transform', containerTranslate(scale, translate));
                }

                decorate(g, data, index);
            });
        };

        axis.scale = function(x) {
            if (!arguments.length) {
                return scale;
            }
            scale = x;
            return axis;
        };

        axis.ticks = function(x) {
            if (!arguments.length) {
                return tickArguments;
            }
            tickArguments = arguments;
            return axis;
        };

        axis.tickValues = function(x) {
            if (!arguments.length) {
                return tickValues;
            }
            tickValues = x;
            return axis;
        };

        axis.tickFormat = function(x) {
            if (!arguments.length) {
                return tickFormat;
            }
            tickFormat = x;
            return axis;
        };

        axis.tickSize = function(x) {
            var n = arguments.length;
            if (!n) {
                return innerTickSize;
            }
            innerTickSize = Number(x);
            outerTickSize = Number(arguments[n - 1]);
            return axis;
        };

        axis.innerTickSize = function(x) {
            if (!arguments.length) {
                return innerTickSize;
            }
            innerTickSize = Number(x);
            return axis;
        };

        axis.outerTickSize = function(x) {
            if (!arguments.length) {
                return outerTickSize;
            }
            outerTickSize = Number(x);
            return axis;
        };

        axis.tickPadding = function(x) {
            if (!arguments.length) {
                return tickPadding;
            }
            tickPadding = x;
            return axis;
        };

        axis.orient = function(x) {
            if (!arguments.length) {
                return orient;
            }
            orient = x;
            return axis;
        };

        axis.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return axis;
        };

        return axis;
    }

    var svg = {
        axis: axis,
        bar: bar,
        candlestick: candlestick,
        ohlc: ohlc
    };

    function _stack() {

        var series = noop;

        var stack = function(selection) {

            selection.each(function(data) {

                var container = d3.select(this);

                var dataJoin$$ = dataJoin()
                    .selector('g.stacked')
                    .element('g')
                    .attr('class', 'stacked');

                dataJoin$$(container, data)
                    .call(series);
            });
        };

        stack.series = function(x) {
            if (!arguments.length) {
                return series;
            }
            series = x;
            return stack;
        };

        return stack;
    }

    function _line() {

        var decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            yValue = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; };

        // convenience functions that return the x & y screen coords for a given point
        var x = function(d, i) { return xScale(xValue(d, i)); };
        var y = function(d, i) { return yScale(yValue(d, i)); };

        var lineData = d3.svg.line()
            .defined(function(d, i) {
                return !isNaN(y(d, i));
            })
            .x(x)
            .y(y);

        var dataJoin$$ = dataJoin()
            .selector('path.line')
            .element('path')
            .attr('class', 'line');

        var line = function(selection) {

            selection.each(function(data, index) {

                var path = dataJoin$$(this, [data]);
                path.attr('d', lineData);

                decorate(path, data, index);
            });
        };

        line.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return line;
        };
        line.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return line;
        };
        line.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return line;
        };
        line.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return line;
        };
        line.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return line;
        };

        d3.rebind(line, dataJoin$$, 'key');
        d3.rebind(line, lineData, 'interpolate', 'tension');

        return line;
    }

    function __line() {

        var line = _line()
            .yValue(function(d) { return d.y0 + d.y; });

        var stack = _stack()
            .series(line);

        var stackedLine = function(selection) {
            selection.call(stack);
        };

        return rebind(stackedLine, line, {
            decorate: 'decorate',
            xScale: 'xScale',
            yScale: 'yScale',
            xValue: 'xValue',
            yValue: 'yValue'
        });
    }

    function _bar() {

        var decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            y1Value = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; },
            y0Value = d3.functor(0),
            barWidth = fractionalBarWidth(0.75);

        var dataJoin$$ = dataJoin()
            .selector('g.bar')
            .element('g')
            .attr('class', 'bar');

        var xValueScaled = function(d, i) { return xScale(xValue(d, i)); };

        var bar$$ = function(selection) {
            selection.each(function(data, index) {

                var filteredData = data.filter(function(d, i) {
                    return y0Value(d, i) !== undefined &&
                        y1Value(d, i) !== undefined &&
                        xValue(d, i) !== undefined;
                });

                var g = dataJoin$$(this, filteredData);

                var width = barWidth(filteredData.map(xValueScaled));

                var pathGenerator = bar()
                    .x(0)
                    .y(0)
                    .width(width)
                    .height(0);

                var x = function(d, i) { return xValueScaled(d, i); },
                    y1 = function(d, i) { return yScale(y1Value(d, i)); },
                    y0 = function(d, i) { return yScale(y0Value(d, i)); };

                g.enter()
                    .attr('transform', function(d, i) {
                        return 'translate(' + x(d, i) + ', ' + y0(d, i) + ')';
                    })
                    .append('path')
                    .attr('d', function(d) { return pathGenerator([d]); });

                g.each(function(d, i) {
                    pathGenerator.height(y0(d, i) - y1(d, i));

                    var barGroup = d3.select(this);
                    d3.transition(barGroup)
                        .attr('transform', 'translate(' + x(d, i) + ', ' + y1(d, i) + ')')
                        .select('path')
                        .attr('d', pathGenerator([d]));
                });

                decorate(g, filteredData, index);
            });
        };

        bar$$.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return bar$$;
        };
        bar$$.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return bar$$;
        };
        bar$$.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return bar$$;
        };
        bar$$.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return bar$$;
        };
        bar$$.y0Value = function(x) {
            if (!arguments.length) {
                return y0Value;
            }
            y0Value = d3.functor(x);
            return bar$$;
        };
        bar$$.yValue = bar$$.y1Value = function(x) {
            if (!arguments.length) {
                return y1Value;
            }
            y1Value = x;
            return bar$$;
        };
        bar$$.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return bar$$;
        };

        d3.rebind(bar$$, dataJoin$$, 'key');

        return bar$$;
    }

    function __bar() {

        var bar = _bar()
            .yValue(function(d) { return d.y0 + d.y; })
            .y0Value(function(d) { return d.y0; });

        var stack = _stack()
            .series(bar);

        var stackedBar = function(selection) {
            selection.call(stack);
        };

        return rebind(stackedBar, bar, {
            decorate: 'decorate',
            xScale: 'xScale',
            yScale: 'yScale',
            xValue: 'xValue',
            y0Value: 'y0Value',
            y1Value: 'y1Value',
            yValue: 'yValue',
            barWidth: 'barWidth'
        });
    }

    function _area() {

        var decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            y0Value = d3.functor(0),
            y1Value = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; };

        // convenience functions that return the x & y screen coords for a given point
        var x = function(d, i) { return xScale(xValue(d, i)); };
        var y0 = function(d, i) { return yScale(y0Value(d, i)); };
        var y1 = function(d, i) { return yScale(y1Value(d, i)); };

        var areaData = d3.svg.area()
            .defined(function(d, i) {
                return !isNaN(y0(d, i)) && !isNaN(y1(d, i));
            })
            .x(x)
            .y0(y0)
            .y1(y1);

        var dataJoin$$ = dataJoin()
            .selector('path.area')
            .element('path')
            .attr('class', 'area');

        var area = function(selection) {

            selection.each(function(data, index) {

                var path = dataJoin$$(this, [data]);
                path.attr('d', areaData);

                decorate(path, data, index);
            });
        };

        area.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return area;
        };
        area.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return area;
        };
        area.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return area;
        };
        area.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return area;
        };
        area.y0Value = function(x) {
            if (!arguments.length) {
                return y0Value;
            }
            y0Value = d3.functor(x);
            return area;
        };
        area.yValue = area.y1Value = function(x) {
            if (!arguments.length) {
                return y1Value;
            }
            y1Value = x;
            return area;
        };

        d3.rebind(area, dataJoin$$, 'key');
        d3.rebind(area, areaData, 'interpolate', 'tension');

        return area;
    }

    function area() {

        var area = _area()
            .yValue(function(d) { return d.y0 + d.y; })
            .y0Value(function(d) { return d.y0; });

        var stack = _stack()
            .series(area);

        var stackedArea = function(selection) {
            selection.call(stack);
        };

        return rebind(stackedArea, area, {
            decorate: 'decorate',
            xScale: 'xScale',
            yScale: 'yScale',
            xValue: 'xValue',
            y0Value: 'y0Value',
            y1Value: 'y1Value',
            yValue: 'yValue'
        });
    }

    var stacked = {
        area: area,
        bar: __bar,
        stack: _stack,
        line: __line
    };

    function _ohlc(drawMethod) {

        var decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            xValue = function(d, i) { return d.date; },
            yOpenValue = function(d, i) { return d.open; },
            yHighValue = function(d, i) { return d.high; },
            yLowValue = function(d, i) { return d.low; },
            yCloseValue = function(d, i) { return d.close; },
            barWidth = fractionalBarWidth(0.75);

        var xValueScaled = function(d, i) { return xScale(xValue(d, i)); };

        var dataJoin$$ = dataJoin()
            .selector('g.ohlc')
            .element('g')
            .attr('class', 'ohlc');

        var ohlc$$ = function(selection) {
            selection.each(function(data, index) {

                var g = dataJoin$$(this, data);

                g.enter()
                    .append('path');

                var pathGenerator = ohlc()
                        .width(barWidth(data.map(xValueScaled)));

                g.each(function(d, i) {
                    var yCloseRaw = yCloseValue(d, i),
                        yOpenRaw = yOpenValue(d, i),
                        x = xValueScaled(d, i),
                        yOpen = yScale(yOpenRaw),
                        yHigh = yScale(yHighValue(d, i)),
                        yLow = yScale(yLowValue(d, i)),
                        yClose = yScale(yCloseRaw);

                    var g = d3.select(this)
                        .classed({
                            'up': yCloseRaw > yOpenRaw,
                            'down': yCloseRaw < yOpenRaw
                        })
                        .attr('transform', 'translate(' + x + ', ' + yHigh + ')');

                    pathGenerator.x(d3.functor(0))
                        .open(function() { return yOpen - yHigh; })
                        .high(function() { return yHigh - yHigh; })
                        .low(function() { return yLow - yHigh; })
                        .close(function() { return yClose - yHigh; });

                    g.select('path')
                        .attr('d', pathGenerator([d]));
                });

                decorate(g, data, index);
            });
        };

        ohlc$$.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return ohlc$$;
        };
        ohlc$$.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return ohlc$$;
        };
        ohlc$$.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return ohlc$$;
        };
        ohlc$$.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return ohlc$$;
        };
        ohlc$$.yOpenValue = function(x) {
            if (!arguments.length) {
                return yOpenValue;
            }
            yOpenValue = x;
            return ohlc$$;
        };
        ohlc$$.yHighValue = function(x) {
            if (!arguments.length) {
                return yHighValue;
            }
            yHighValue = x;
            return ohlc$$;
        };
        ohlc$$.yLowValue = function(x) {
            if (!arguments.length) {
                return yLowValue;
            }
            yLowValue = x;
            return ohlc$$;
        };
        ohlc$$.yValue = ohlc$$.yCloseValue = function(x) {
            if (!arguments.length) {
                return yCloseValue;
            }
            yCloseValue = x;
            return ohlc$$;
        };
        ohlc$$.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return ohlc$$;
        };

        d3.rebind(ohlc$$, dataJoin$$, 'key');

        return ohlc$$;
    }

    function cycle() {

        var decorate = noop,
            xScale = d3.scale.linear(),
            yScale = d3.scale.linear(),
            xValue = function(d, i) { return d.date.getDay(); },
            subScale = d3.scale.linear(),
            subSeries = _line(),
            barWidth = fractionalBarWidth(0.75);

        var dataJoin$$ = dataJoin()
            .selector('g.cycle')
            .element('g')
            .attr('class', 'cycle');

        var cycle = function(selection) {

            selection.each(function(data, index) {

                var dataByX = d3.nest()
                    .key(xValue)
                    .map(data);

                var xValues = Object.keys(dataByX);

                var width = barWidth(xValues.map(xScale)),
                    halfWidth = width / 2;

                var g = dataJoin$$(this, xValues);

                g.each(function(d, i) {

                    var g = d3.select(this);

                    g.attr('transform', 'translate(' + xScale(d) + ', 0)');

                    (subScale.rangeBands || subScale.range)([-halfWidth, halfWidth]);

                    subSeries.xScale(subScale)
                        .yScale(yScale);

                    d3.select(this)
                        .datum(dataByX[d])
                        .call(subSeries);

                });

                decorate(g, xValues, index);
            });
        };

        cycle.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return cycle;
        };
        cycle.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return cycle;
        };
        cycle.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return cycle;
        };
        cycle.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return cycle;
        };
        cycle.subScale = function(x) {
            if (!arguments.length) {
                return subScale;
            }
            subScale = x;
            return cycle;
        };
        cycle.subSeries = function(x) {
            if (!arguments.length) {
                return subSeries;
            }
            subSeries = x;
            return cycle;
        };
        cycle.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return cycle;
        };

        d3.rebind(cycle, dataJoin$$, 'key');

        return cycle;

    }

    function _candlestick() {

        var decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            xValue = function(d, i) { return d.date; },
            yOpenValue = function(d, i) { return d.open; },
            yHighValue = function(d, i) { return d.high; },
            yLowValue = function(d, i) { return d.low; },
            yCloseValue = function(d, i) { return d.close; },
            barWidth = fractionalBarWidth(0.75);

        var dataJoin$$ = dataJoin()
            .selector('g.candlestick')
            .element('g')
            .attr('class', 'candlestick');

        var xValueScaled = function(d, i) { return xScale(xValue(d, i)); };

        var candlestick$$ = function(selection) {

            selection.each(function(data, index) {

                var g = dataJoin$$(this, data);

                g.enter()
                    .append('path');

                var pathGenerator = candlestick()
                        .width(barWidth(data.map(xValueScaled)));

                g.each(function(d, i) {

                    var yCloseRaw = yCloseValue(d, i),
                        yOpenRaw = yOpenValue(d, i),
                        x = xValueScaled(d, i),
                        yOpen = yScale(yOpenRaw),
                        yHigh = yScale(yHighValue(d, i)),
                        yLow = yScale(yLowValue(d, i)),
                        yClose = yScale(yCloseRaw);

                    var g = d3.select(this)
                        .classed({
                            'up': yCloseRaw > yOpenRaw,
                            'down': yCloseRaw < yOpenRaw
                        })
                        .attr('transform', 'translate(' + x + ', ' + yHigh + ')');

                    pathGenerator.x(d3.functor(0))
                        .open(function() { return yOpen - yHigh; })
                        .high(function() { return yHigh - yHigh; })
                        .low(function() { return yLow - yHigh; })
                        .close(function() { return yClose - yHigh; });

                    g.select('path')
                        .attr('d', pathGenerator([d]));
                });

                decorate(g, data, index);
            });
        };

        candlestick$$.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return candlestick$$;
        };
        candlestick$$.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return candlestick$$;
        };
        candlestick$$.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return candlestick$$;
        };
        candlestick$$.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return candlestick$$;
        };
        candlestick$$.yOpenValue = function(x) {
            if (!arguments.length) {
                return yOpenValue;
            }
            yOpenValue = x;
            return candlestick$$;
        };
        candlestick$$.yHighValue = function(x) {
            if (!arguments.length) {
                return yHighValue;
            }
            yHighValue = x;
            return candlestick$$;
        };
        candlestick$$.yLowValue = function(x) {
            if (!arguments.length) {
                return yLowValue;
            }
            yLowValue = x;
            return candlestick$$;
        };
        candlestick$$.yValue = candlestick$$.yCloseValue = function(x) {
            if (!arguments.length) {
                return yCloseValue;
            }
            yCloseValue = x;
            return candlestick$$;
        };
        candlestick$$.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return candlestick$$;
        };

        d3.rebind(candlestick$$, dataJoin$$, 'key');

        return candlestick$$;

    }

    // Adapts a fc.svg.axis for use as a series (i.e. accepts xScale/yScale). Only required when
    // you want an axis to appear in the middle of a chart e.g. as part of a cycle plot. Otherwise
    // prefer using the fc.svg.axis directly.
    function _axis() {

        var axis$$ = axis(),
            baseline = d3.functor(0),
            decorate = noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear();

        var dataJoin$$ = dataJoin()
            .selector('g.axis-adapter')
            .element('g')
            .attr({'class': 'axis axis-adapter'});

        var axisAdapter = function(selection) {

            selection.each(function(data, index) {

                var g = dataJoin$$(this, [data]);

                switch (axisAdapter.orient()) {
                    case 'top':
                    case 'bottom':
                        g.attr('transform', 'translate(0,' + yScale(baseline(data)) + ')');
                        axis$$.scale(xScale);
                        break;

                    case 'left':
                    case 'right':
                        g.attr('transform', 'translate(' + xScale(baseline(data)) + ',0)');
                        axis$$.scale(yScale);
                        break;

                    default:
                        throw new Error('Invalid orientation');
                }

                g.call(axis$$);

                decorate(g, data, index);
            });
        };

        axisAdapter.baseline = function(x) {
            if (!arguments.length) {
                return baseline;
            }
            baseline = d3.functor(x);
            return axisAdapter;
        };
        axisAdapter.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return axisAdapter;
        };
        axisAdapter.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return axisAdapter;
        };
        axisAdapter.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return axisAdapter;
        };

        return d3.rebind(axisAdapter, axis$$, 'orient', 'ticks', 'tickValues', 'tickSize',
            'innerTickSize', 'outerTickSize', 'tickPadding', 'tickFormat');
    }

    var _series = {
        area: _area,
        axis: _axis,
        bar: _bar,
        candlestick: _candlestick,
        cycle: cycle,
        line: _line,
        multi: _multi,
        ohlc: _ohlc,
        point: point,
        stacked: stacked
    };

    function _identity() {

        var identity$$ = {};

        identity$$.distance = function(startDate, endDate) {
            return endDate.getTime() - startDate.getTime();
        };

        identity$$.offset = function(startDate, ms) {
            return new Date(startDate.getTime() + ms);
        };

        identity$$.clampUp = identity;

        identity$$.clampDown = identity;

        identity$$.copy = function() { return identity$$; };

        return identity$$;
    }

    // obtains the ticks from the given scale, transforming the result to ensure
    // it does not include any discontinuities
    function tickTransformer(ticks, discontinuityProvider, domain) {
        var clampedTicks = ticks.map(function(tick, index) {
            if (index < ticks.length - 1) {
                return discontinuityProvider.clampUp(tick);
            } else {
                var clampedTick = discontinuityProvider.clampUp(tick);
                return clampedTick < domain[1] ?
                    clampedTick : discontinuityProvider.clampDown(tick);
            }
        });
        var uniqueTicks = clampedTicks.reduce(function(arr, tick) {
            if (arr.filter(function(f) { return f.getTime() === tick.getTime(); }).length === 0) {
                arr.push(tick);
            }
            return arr;
        }, []);
        return uniqueTicks;
    }

    /**
    * The `fc.scale.dateTime` scale renders a discontinuous date time scale, i.e. a time scale that incorporates gaps.
    * As an example, you can use this scale to render a chart where the weekends are skipped.
    *
    * @type {object}
    * @memberof fc.scale
    * @class fc.scale.dateTime
    */
    function dateTimeScale(adaptedScale, discontinuityProvider) {

        if (!arguments.length) {
            adaptedScale = d3.time.scale();
            discontinuityProvider = _identity();
        }

        function scale(date) {
            var domain = adaptedScale.domain();
            var range = adaptedScale.range();

            // The discontinuityProvider is responsible for determine the distance between two points
            // along a scale that has discontinuities (i.e. sections that have been removed).
            // the scale for the given point 'x' is calculated as the ratio of the discontinuous distance
            // over the domain of this axis, versus the discontinuous distance to 'x'
            var totalDomainDistance = discontinuityProvider.distance(domain[0], domain[1]);
            var distanceToX = discontinuityProvider.distance(domain[0], date);
            var ratioToX = distanceToX / totalDomainDistance;
            var scaledByRange = ratioToX * (range[1] - range[0]) + range[0];
            return scaledByRange;
        }

        scale.invert = function(x) {
            var domain = adaptedScale.domain();
            var range = adaptedScale.range();

            var ratioToX = (x - range[0]) / (range[1] - range[0]);
            var totalDomainDistance = discontinuityProvider.distance(domain[0], domain[1]);
            var distanceToX = ratioToX * totalDomainDistance;
            return discontinuityProvider.offset(domain[0], distanceToX);
        };

        scale.domain = function(x) {
            if (!arguments.length) {
                return adaptedScale.domain();
            }
            // clamp the upper and lower domain values to ensure they
            // do not fall within a discontinuity
            var domainLower = discontinuityProvider.clampUp(x[0]);
            var domainUpper = discontinuityProvider.clampDown(x[1]);
            adaptedScale.domain([domainLower, domainUpper]);
            return scale;
        };

        scale.nice = function() {
            adaptedScale.nice();
            var domain = adaptedScale.domain();
            var domainLower = discontinuityProvider.clampUp(domain[0]);
            var domainUpper = discontinuityProvider.clampDown(domain[1]);
            adaptedScale.domain([domainLower, domainUpper]);
            return scale;
        };

        scale.ticks = function() {
            var ticks = adaptedScale.ticks.apply(this, arguments);
            return tickTransformer(ticks, discontinuityProvider, scale.domain());
        };

        scale.copy = function() {
            return dateTimeScale(adaptedScale.copy(), discontinuityProvider.copy());
        };

        scale.discontinuityProvider = function(x) {
            if (!arguments.length) {
                return discontinuityProvider;
            }
            discontinuityProvider = x;
            return scale;
        };

        return d3.rebind(scale, adaptedScale, 'range', 'rangeRound', 'interpolate', 'clamp',
            'tickFormat');
    }

    function exportedScale() {
        return dateTimeScale();
    }
    exportedScale.tickTransformer = tickTransformer;

    function skipWeekends() {
        var millisPerDay = 24 * 3600 * 1000;
        var millisPerWorkWeek = millisPerDay * 5;
        var millisPerWeek = millisPerDay * 7;

        var skipWeekends = {};

        function isWeekend(date) {
            return date.getDay() === 0 || date.getDay() === 6;
        }

        skipWeekends.clampDown = function(date) {
            if (isWeekend(date)) {
                var daysToSubtract = date.getDay() === 0 ? 2 : 1;
                // round the date up to midnight
                var newDate = d3.time.day.ceil(date);
                // then subtract the required number of days
                return d3.time.day.offset(newDate, -daysToSubtract);
            } else {
                return date;
            }
        };

        skipWeekends.clampUp = function(date) {
            if (isWeekend(date)) {
                var daysToAdd = date.getDay() === 0 ? 1 : 2;
                // round the date down to midnight
                var newDate = d3.time.day.floor(date);
                // then add the required number of days
                return d3.time.day.offset(newDate, daysToAdd);
            } else {
                return date;
            }
        };

        // returns the number of included milliseconds (i.e. those which do not fall)
        // within discontinuities, along this scale
        skipWeekends.distance = function(startDate, endDate) {
            startDate = skipWeekends.clampUp(startDate);
            endDate = skipWeekends.clampDown(endDate);

            // move the start date to the end of week boundary
            var offsetStart = d3.time.saturday.ceil(startDate);
            if (endDate < offsetStart) {
                return endDate.getTime() - startDate.getTime();
            }

            var msAdded = offsetStart.getTime() - startDate.getTime();

            // move the end date to the end of week boundary
            var offsetEnd = d3.time.saturday.ceil(endDate);
            var msRemoved = offsetEnd.getTime() - endDate.getTime();

            // determine how many weeks there are between these two dates
            var weeks = (offsetEnd.getTime() - offsetStart.getTime()) / millisPerWeek;

            return weeks * millisPerWorkWeek + msAdded - msRemoved;
        };

        skipWeekends.offset = function(startDate, ms) {
            var date = isWeekend(startDate) ? skipWeekends.clampUp(startDate) : startDate;
            var remainingms = ms;

            // move to the end of week boundary
            var endOfWeek = d3.time.saturday.ceil(date);
            remainingms -= (endOfWeek.getTime() - date.getTime());

            // if the distance to the boundary is greater than the number of ms
            // simply add the ms to the current date
            if (remainingms < 0) {
                return new Date(date.getTime() + ms);
            }

            // skip the weekend
            date = d3.time.day.offset(endOfWeek, 2);

            // add all of the complete weeks to the date
            var completeWeeks = Math.floor(remainingms / millisPerWorkWeek);
            date = d3.time.day.offset(date, completeWeeks * 7);
            remainingms -= completeWeeks * millisPerWorkWeek;

            // add the remaining time
            date = new Date(date.getTime() + remainingms);
            return date;
        };

        skipWeekends.copy = function() { return skipWeekends; };

        return skipWeekends;
    }

    var __scale = {
        discontinuity: {
            identity: _identity,
            skipWeekends: skipWeekends
        },
        dateTime: exportedScale
    };

    function relativeStrengthIndex() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            upperValue = 70,
            lowerValue = 30,
            multiSeries = _multi(),
            decorate = noop;

        var annotations = line();
        var rsiLine = _line()
            .yValue(function(d, i) { return d.rsi; });

        var rsi = function(selection) {

            multiSeries.xScale(xScale)
                .yScale(yScale)
                .series([annotations, rsiLine])
                .mapping(function(series) {
                    if (series === annotations) {
                        return [
                            upperValue,
                            50,
                            lowerValue
                        ];
                    }
                    return this;
                })
                .decorate(function(g, data, index) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi ' + ['annotations', 'indicator'][i];
                        });
                    decorate(g, data, index);
                });

            selection.call(multiSeries);
        };

        rsi.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return rsi;
        };
        rsi.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return rsi;
        };
        rsi.upperValue = function(x) {
            if (!arguments.length) {
                return upperValue;
            }
            upperValue = x;
            return rsi;
        };
        rsi.lowerValue = function(x) {
            if (!arguments.length) {
                return lowerValue;
            }
            lowerValue = x;
            return rsi;
        };
        rsi.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return rsi;
        };

        d3.rebind(rsi, rsiLine, 'yValue', 'xValue');

        return rsi;
    }

    function macd() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            xValue = function(d) { return d.date; },
            root = function(d) { return d.macd; },
            macdLine = _line(),
            signalLine = _line(),
            divergenceBar = _bar(),
            multiSeries = _multi(),
            decorate = noop;

        var macd = function(selection) {

            macdLine.xValue(xValue)
                .yValue(function(d, i) { return root(d).macd; });

            signalLine.xValue(xValue)
                .yValue(function(d, i) { return root(d).signal; });

            divergenceBar.xValue(xValue)
                .yValue(function(d, i) { return root(d).divergence; });

            multiSeries.xScale(xScale)
                .yScale(yScale)
                .series([divergenceBar, macdLine, signalLine])
                .decorate(function(g, data, index) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi ' + ['divergence', 'macd', 'signal'][i];
                        });
                    decorate(g, data, index);
                });

            selection.call(multiSeries);
        };

        macd.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return macd;
        };
        macd.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return macd;
        };
        macd.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return macd;
        };
        macd.root = function(x) {
            if (!arguments.length) {
                return root;
            }
            root = x;
            return macd;
        };
        macd.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return macd;
        };

        return macd;
    }

    function bollingerBands() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            yValue = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; },
            root = function(d) { return d.bollingerBands; },
            decorate = noop;

        var area = _area()
            .y0Value(function(d, i) {
                return root(d).upper;
            })
            .y1Value(function(d, i) {
                return root(d).lower;
            });

        var upperLine = _line()
            .yValue(function(d, i) {
                return root(d).upper;
            });

        var averageLine = _line()
            .yValue(function(d, i) {
                return root(d).average;
            });

        var lowerLine = _line()
            .yValue(function(d, i) {
                return root(d).lower;
            });

        var bollingerBands = function(selection) {

            var multi = _multi()
                .xScale(xScale)
                .yScale(yScale)
                .series([area, upperLine, lowerLine, averageLine])
                .decorate(function(g, data, index) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi ' + ['area', 'upper', 'lower', 'average'][i];
                        });
                    decorate(g, data, index);
                });

            area.xValue(xValue);
            upperLine.xValue(xValue);
            averageLine.xValue(xValue);
            lowerLine.xValue(xValue);

            selection.call(multi);
        };

        bollingerBands.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return bollingerBands;
        };
        bollingerBands.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return bollingerBands;
        };
        bollingerBands.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return bollingerBands;
        };
        bollingerBands.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return bollingerBands;
        };
        bollingerBands.root = function(x) {
            if (!arguments.length) {
                return root;
            }
            root = x;
            return bollingerBands;
        };
        bollingerBands.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return bollingerBands;
        };

        return bollingerBands;
    }

    var renderer = {
        bollingerBands: bollingerBands,
        macd: macd,
        relativeStrengthIndex: relativeStrengthIndex
    };

    function calculator() {

        var undefinedValue = d3.functor(undefined),
            windowSize = d3.functor(10),
            accumulator = noop,
            value = identity;

        var slidingWindow = function(data) {
            var size = windowSize.apply(this, arguments);
            var windowData = data.slice(0, size).map(value);
            return data.map(function(d, i) {
                    if (i < size - 1) {
                        return undefinedValue(d, i);
                    }
                    if (i >= size) {
                        // Treat windowData as FIFO rolling buffer
                        windowData.shift();
                        windowData.push(value(d, i));
                    }
                    return accumulator(windowData);
                });
        };

        slidingWindow.undefinedValue = function(x) {
            if (!arguments.length) {
                return undefinedValue;
            }
            undefinedValue = d3.functor(x);
            return slidingWindow;
        };
        slidingWindow.windowSize = function(x) {
            if (!arguments.length) {
                return windowSize;
            }
            windowSize = d3.functor(x);
            return slidingWindow;
        };
        slidingWindow.accumulator = function(x) {
            if (!arguments.length) {
                return accumulator;
            }
            accumulator = x;
            return slidingWindow;
        };
        slidingWindow.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = x;
            return slidingWindow;
        };

        return slidingWindow;
    }

    // applies an algorithm to an array, merging the result back into
    // the source array using the given merge function.
    function merge() {

        var merge = noop,
            algorithm = calculator();

        var mergeCompute = function(data) {
            return d3.zip(data, algorithm(data))
                .forEach(function(tuple) {
                    merge(tuple[0], tuple[1]);
                });
        };

        mergeCompute.algorithm = function(x) {
            if (!arguments.length) {
                return algorithm;
            }
            algorithm = x;
            return mergeCompute;
        };

        mergeCompute.merge = function(x) {
            if (!arguments.length) {
                return merge;
            }
            merge = x;
            return mergeCompute;
        };

        return mergeCompute;
    }

    function _calculator() {

        var openValue = function(d, i) { return d.open; },
            closeValue = function(d, i) { return d.close; },
            averageAccumulator = function(values) {
                var alpha = 1 / values.length;
                var result = values[0];
                for (var i = 1, l = values.length; i < l; i++) {
                    result = alpha * values[i] + (1 - alpha) * result;
                }
                return result;
            };

        var slidingWindow = calculator()
            .windowSize(14)
            .accumulator(function(values) {
                var downCloses = [];
                var upCloses = [];

                for (var i = 0, l = values.length; i < l; i++) {
                    var value = values[i];

                    var open = openValue(value);
                    var close = closeValue(value);

                    downCloses.push(open > close ? open - close : 0);
                    upCloses.push(open < close ? close - open : 0);
                }

                var downClosesAvg = averageAccumulator(downCloses);
                if (downClosesAvg === 0) {
                    return 100;
                }

                var rs = averageAccumulator(upCloses) / downClosesAvg;
                return 100 - (100 / (1 + rs));
            });

        var rsi = function(data) {
            return slidingWindow(data);
        };

        rsi.openValue = function(x) {
            if (!arguments.length) {
                return openValue;
            }
            openValue = x;
            return rsi;
        };
        rsi.closeValue = function(x) {
            if (!arguments.length) {
                return closeValue;
            }
            closeValue = x;
            return rsi;
        };

        d3.rebind(rsi, slidingWindow, 'windowSize');

        return rsi;
    }

    function _relativeStrengthIndex() {

        var rsi = _calculator();

        var mergedAlgorithm = merge()
                .algorithm(rsi)
                .merge(function(datum, rsi) { datum.rsi = rsi; });

        var relativeStrengthIndex = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(relativeStrengthIndex, mergedAlgorithm, 'merge');
        d3.rebind(relativeStrengthIndex, rsi, 'windowSize', 'openValue', 'closeValue');

        return relativeStrengthIndex;
    }

    function movingAverage() {

        var ma = calculator()
                .accumulator(d3.mean)
                .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(ma)
                .merge(function(datum, ma) { datum.movingAverage = ma; });

        var movingAverage = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(movingAverage, mergedAlgorithm, 'merge');
        d3.rebind(movingAverage, ma, 'windowSize', 'undefinedValue', 'value');

        return movingAverage;
    }

    // Indicator algorithms are not designed to accomodate leading 'undefined' value.
    // This adapter adds that functionality by adding a corresponding number
    // of 'undefined' values to the output.
    function undefinedInputAdapter() {

        var algorithm = calculator()
            .accumulator(d3.mean);
        var undefinedValue = d3.functor(undefined),
            defined = function(value) { return value === undefined; };

        function undefinedArrayOfLength(length) {
            return Array.apply(null, new Array(length)).map(undefinedValue);
        }

        var undefinedInputAdapter = function(data) {
            var undefinedCount = 0;
            while (defined(data[undefinedCount]) && undefinedCount < data.length) {
                undefinedCount ++;
            }

            var nonUndefinedData = data.slice(undefinedCount);

            return undefinedArrayOfLength(undefinedCount).concat(algorithm(nonUndefinedData));
        };

        undefinedInputAdapter.algorithm = function(x) {
            if (!arguments.length) {
                return algorithm;
            }
            algorithm = x;
            return undefinedInputAdapter;
        };
        undefinedInputAdapter.undefinedValue = function(x) {
            if (!arguments.length) {
                return undefinedValue;
            }
            undefinedValue = d3.functor(x);
            return undefinedInputAdapter;
        };
        undefinedInputAdapter.defined = function(x) {
            if (!arguments.length) {
                return defined;
            }
            defined = x;
            return undefinedInputAdapter;
        };

        return undefinedInputAdapter;
    }

    function exponentialMovingAverage() {

        var windowSize = 9,
            value = identity;

        var exponentialMovingAverage = function(data) {

            var alpha = 2 / (windowSize + 1);
            var previous;
            var initialAccumulator = 0;

            return data.map(function(d, i) {
                    if (i < windowSize - 1) {
                        initialAccumulator += value(d, i);
                        return undefined;
                    } else if (i === windowSize - 1) {
                        initialAccumulator += value(d, i);
                        var initialValue = initialAccumulator / windowSize;
                        previous = initialValue;
                        return initialValue;
                    } else {
                        var nextValue = value(d, i) * alpha + (1 - alpha) * previous;
                        previous = nextValue;
                        return nextValue;
                    }
                });
        };

        exponentialMovingAverage.windowSize = function(x) {
            if (!arguments.length) {
                return windowSize;
            }
            windowSize = x;
            return exponentialMovingAverage;
        };

        exponentialMovingAverage.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = x;
            return exponentialMovingAverage;
        };

        return exponentialMovingAverage;
    }

    function __calculator() {

        var value = identity;

        var fastEMA = exponentialMovingAverage()
            .windowSize(12);
        var slowEMA = exponentialMovingAverage()
            .windowSize(29);
        var signalEMA = exponentialMovingAverage()
            .windowSize(9);
        var adaptedSignalEMA = undefinedInputAdapter()
            .algorithm(signalEMA);

        var macd = function(data) {

            fastEMA.value(value);
            slowEMA.value(value);

            var diff = d3.zip(fastEMA(data), slowEMA(data))
                .map(function(d) {
                    if (d[0] !== undefined && d[1] !== undefined) {
                        return d[0] - d[1];
                    } else {
                        return undefined;
                    }
                });

            var averageDiff = adaptedSignalEMA(diff);

            var macd = d3.zip(diff, averageDiff)
                .map(function(d) {
                    return {
                        macd: d[0],
                        signal: d[1],
                        divergence: d[0] !== undefined && d[1] !== undefined ? d[0] - d[1] : undefined
                    };
                });

            return macd;
        };

        macd.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = x;
            return macd;
        };

        rebind(macd, fastEMA, {
            fastPeriod: 'windowSize'
        });

        rebind(macd, slowEMA, {
            slowPeriod: 'windowSize'
        });

        rebind(macd, signalEMA, {
            signalPeriod: 'windowSize'
        });

        return macd;
    }

    function _macd() {

        var macdAlgorithm = __calculator()
            .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(macdAlgorithm)
                .merge(function(datum, macd) { datum.macd = macd; });

        var macd = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(macd, mergedAlgorithm, 'merge');
        d3.rebind(macd, macdAlgorithm, 'fastPeriod', 'slowPeriod', 'signalPeriod', 'value');

        return macd;
    }

    function _exponentialMovingAverage() {

        var ema = calculator()
                .accumulator(d3.mean)
                .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(ema)
                .merge(function(datum, ma) { datum.exponentialMovingAverage = ma; });

        var exponentialMovingAverage = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(exponentialMovingAverage, mergedAlgorithm, 'merge');
        d3.rebind(exponentialMovingAverage, ema, 'windowSize', 'value');

        return exponentialMovingAverage;
    }

    function percentageChange() {

        var baseIndex = d3.functor(0),
            value = identity;

        var percentageChange = function(data) {

            if (data.length === 0) {
                return [];
            }

            var baseValue = value(data[baseIndex(data)]);

            return data.map(function(d, i) {
                    return (value(d, i) - baseValue) / baseValue;
                });
        };

        percentageChange.baseIndex = function(x) {
            if (!arguments.length) {
                return baseIndex;
            }
            baseIndex = d3.functor(x);
            return percentageChange;
        };
        percentageChange.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = x;
            return percentageChange;
        };

        return percentageChange;
    }

    function _bollingerBands() {

        var multiplier = 2;

        var slidingWindow = calculator()
            .undefinedValue({
                upper: undefined,
                average: undefined,
                lower: undefined
            })
            .accumulator(function(values) {
                var avg = d3.mean(values);
                var stdDev = d3.deviation(values);
                return {
                    upper: avg + multiplier * stdDev,
                    average: avg,
                    lower: avg - multiplier * stdDev
                };
            });

        var bollingerBands = function(data) {
            return slidingWindow(data);
        };

        bollingerBands.multiplier = function(x) {
            if (!arguments.length) {
                return multiplier;
            }
            multiplier = x;
            return bollingerBands;
        };

        d3.rebind(bollingerBands, slidingWindow, 'windowSize', 'value');

        return bollingerBands;
    }

    var ___calculator = {
        bollingerBands: _bollingerBands,
        exponentialMovingAverage: exponentialMovingAverage,
        macd: __calculator,
        percentageChange: percentageChange,
        relativeStrengthIndex: _calculator,
        slidingWindow: calculator,
        undefinedInputAdapter: undefinedInputAdapter
    };

    function __bollingerBands() {

        var bollingerAlgorithm = _bollingerBands()
            .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(bollingerAlgorithm)
                .merge(function(datum, boll) { datum.bollingerBands = boll; });

        var bollingerBands = function(data) {
            return mergedAlgorithm(data);
        };

        bollingerBands.root = function(d) {
            return d.bollingerBands;
        };

        d3.rebind(bollingerBands, mergedAlgorithm, 'merge');
        d3.rebind(bollingerBands, bollingerAlgorithm, 'windowSize', 'value', 'multiplier');

        return bollingerBands;
    }

    var algorithm = {
        bollingerBands: __bollingerBands,
        calculator: ___calculator,
        exponentialMovingAverage: _exponentialMovingAverage,
        macd: _macd,
        merge: merge,
        movingAverage: movingAverage,
        relativeStrengthIndex: _relativeStrengthIndex
    };

    var indicator = {
        algorithm: algorithm,
        renderer: renderer
    };

    function walk(period, steps, mu, sigma, initial) {
        var randomNormal = d3.random.normal(),
            timeStep = period / steps,
            increments = new Array(steps + 1),
            increment,
            step;

        // Compute step increments for the discretized GBM model.
        for (step = 1; step < increments.length; step += 1) {
            increment = randomNormal();
            increment *= Math.sqrt(timeStep);
            increment *= sigma;
            increment += (mu - ((sigma * sigma) / 2)) * timeStep;
            increments[step] = Math.exp(increment);
        }
        // Return the cumulative product of increments from initial value.
        increments[0] = initial;
        for (step = 1; step < increments.length; step += 1) {
            increments[step] = increments[step - 1] * increments[step];
        }
        return increments;
    }

    function financial() {

        var mu = 0.1,
            sigma = 0.1,
            startPrice = 100,
            startVolume = 100000,
            startDate = new Date(),
            stepsPerDay = 50,
            volumeNoiseFactor = 0.3,
            filter = function(date) {
                return !(date.getDay() === 0 || date.getDay() === 6);
            };

        var calculateOHLC = function(days, prices, volumes) {

            var ohlcv = [],
                daySteps,
                currentStep = 0,
                currentIntraStep = 0;

            while (ohlcv.length < days) {
                daySteps = prices.slice(currentIntraStep, currentIntraStep + stepsPerDay);
                ohlcv.push({
                    date: new Date(startDate.getTime()),
                    open: daySteps[0],
                    high: Math.max.apply({}, daySteps),
                    low: Math.min.apply({}, daySteps),
                    close: daySteps[stepsPerDay - 1],
                    volume: volumes[currentStep]
                });
                currentIntraStep += stepsPerDay;
                currentStep += 1;
                startDate.setUTCDate(startDate.getUTCDate() + 1);
            }
            return ohlcv;
        };

        var gen = function(days) {
            var toDate = new Date(startDate.getTime());
            toDate.setUTCDate(startDate.getUTCDate() + days);

            var millisecondsPerYear = 3.15569e10,
                years = (toDate.getTime() - startDate.getTime()) / millisecondsPerYear;

            var prices = walk(
                years,
                days * stepsPerDay,
                mu,
                sigma,
                startPrice
            );
            var volumes = walk(
                years,
                days,
                0,
                sigma,
                startVolume
            );

            // Add random noise
            volumes = volumes.map(function(vol) {
                var boundedNoiseFactor = Math.min(0, Math.max(volumeNoiseFactor, 1));
                var multiplier = 1 + (boundedNoiseFactor * (1 - 2 * Math.random()));
                return Math.floor(vol * multiplier);
            });

            // Save the new start values
            startPrice = prices[prices.length - 1];
            startVolume = volumes[volumes.length - 1];

            return calculateOHLC(days, prices, volumes).filter(function(d) {
                return !filter || filter(d.date);
            });
        };

        gen.mu = function(x) {
            if (!arguments.length) {
                return mu;
            }
            mu = x;
            return gen;
        };
        gen.sigma = function(x) {
            if (!arguments.length) {
                return sigma;
            }
            sigma = x;
            return gen;
        };
        gen.startPrice = function(x) {
            if (!arguments.length) {
                return startPrice;
            }
            startPrice = x;
            return gen;
        };
        gen.startVolume = function(x) {
            if (!arguments.length) {
                return startVolume;
            }
            startVolume = x;
            return gen;
        };
        gen.startDate = function(x) {
            if (!arguments.length) {
                return startDate;
            }
            startDate = x;
            return gen;
        };
        gen.stepsPerDay = function(x) {
            if (!arguments.length) {
                return stepsPerDay;
            }
            stepsPerDay = x;
            return gen;
        };
        gen.volumeNoiseFactor = function(x) {
            if (!arguments.length) {
                return volumeNoiseFactor;
            }
            volumeNoiseFactor = x;
            return gen;
        };
        gen.filter = function(x) {
            if (!arguments.length) {
                return filter;
            }
            filter = x;
            return gen;
        };

        return gen;
    }

    var random = {
        financial: financial,
        walk: walk
    };

    // https://docs.exchange.coinbase.com/#market-data
    function coinbase() {

        var product = 'BTC-USD',
            start = null,
            end = null,
            granularity = null;

        var coinbase = function(cb) {
            var params = [];
            if (start != null) {
                params.push('start=' + start.toISOString());
            }
            if (end != null) {
                params.push('end=' + end.toISOString());
            }
            if (granularity != null) {
                params.push('granularity=' + granularity);
            }
            var url = 'https://api.exchange.coinbase.com/products/' + product + '/candles?' + params.join('&');
            d3.json(url, function(error, data) {
                if (error) {
                    cb(error);
                    return;
                }
                data = data.map(function(d) {
                    return {
                        date: new Date(d[0] * 1000),
                        open: d[3],
                        high: d[2],
                        low: d[1],
                        close: d[4],
                        volume: d[5]
                    };
                });
                cb(error, data);
            });
        };

        coinbase.product = function(x) {
            if (!arguments.length) {
                return product;
            }
            product = x;
            return coinbase;
        };
        coinbase.start = function(x) {
            if (!arguments.length) {
                return start;
            }
            start = x;
            return coinbase;
        };
        coinbase.end = function(x) {
            if (!arguments.length) {
                return end;
            }
            end = x;
            return coinbase;
        };
        coinbase.granularity = function(x) {
            if (!arguments.length) {
                return granularity;
            }
            granularity = x;
            return coinbase;
        };

        return coinbase;
    }

    var feed = {
        coinbase: coinbase
    };

    var _data = {
        feed: feed,
        random: random
    };

    function sparkline() {

        // creates an array with four elements, representing the high, low, open and close
        // values of the given array
        function highLowOpenClose(data) {
            var xValueAccessor = sparkline.xValue(),
                yValueAccessor = sparkline.yValue();

            var high = d3.max(data, yValueAccessor);
            var low = d3.min(data, yValueAccessor);

            function elementWithYValue(value) {
                return data.filter(function(d) {
                    return yValueAccessor(d) === value;
                })[0];
            }

            return [{
                    x: xValueAccessor(data[0]),
                    y: yValueAccessor(data[0])
                }, {
                    x: xValueAccessor(elementWithYValue(high)),
                    y: high
                }, {
                    x: xValueAccessor(elementWithYValue(low)),
                    y: low
                }, {
                    x: xValueAccessor(data[data.length - 1]),
                    y: yValueAccessor(data[data.length - 1])
                }];
        }

        var xScale = exportedScale();
        var yScale = d3.scale.linear();
        var radius = 2;
        var line = _line();

        // configure the point series to render the data from the
        // highLowOpenClose function
        var point$$ = point()
            .xValue(function(d) { return d.x; })
            .yValue(function(d) { return d.y; })
            .decorate(function(sel) {
                sel.attr('class', function(d, i) {
                    switch (i) {
                        case 0: return 'open';
                        case 1: return 'high';
                        case 2: return 'low';
                        case 3: return 'close';
                    }
                });
            });

        var multi = _multi()
            .series([line, point$$])
            .mapping(function(series) {
                switch (series) {
                    case point$$:
                        return highLowOpenClose(this);
                    default:
                        return this;
                }
            });

        var sparkline = function(selection) {

            point$$.radius(radius);

            selection.each(function(data) {

                var container = d3.select(this);
                var dimensions = innerDimensions(this);
                var margin = radius;

                xScale.range([margin, dimensions.width - margin]);
                yScale.range([dimensions.height - margin, margin]);

                multi.xScale(xScale)
                    .yScale(yScale);

                container.call(multi);

            });
        };

        rebind(sparkline, xScale, {
            xDiscontinuityProvider: 'discontinuityProvider',
            xDomain: 'domain'
        });

        rebind(sparkline, yScale, {
            yDomain: 'domain'
        });

        rebind(sparkline, line, 'xValue', 'yValue');

        sparkline.xScale = function() { return xScale; };
        sparkline.yScale = function() { return yScale; };
        sparkline.radius = function(x) {
            if (!arguments.length) {
                return radius;
            }
            radius = x;
            return sparkline;
        };

        return sparkline;
    }

    function linearTimeSeries() {

        var xAxisHeight = 20;
        var yAxisWidth = 0;
        var plotArea = _line();
        var xScale = exportedScale();
        var yScale = d3.scale.linear();
        var xAxis = axis()
            .scale(xScale)
            .orient('bottom');
        var yAxis = axis()
            .scale(yScale)
            .orient('left');

        var linearTimeSeries = function(selection) {

            selection.each(function(data) {

                var container = d3.select(this);

                var plotAreaLayout = {
                    position: 'absolute',
                    top: 0,
                    right: yAxisWidth,
                    bottom: xAxisHeight,
                    left: 0
                };

                var background = container.selectAll('rect.background')
                    .data([data]);
                background.enter()
                    .append('rect')
                    .attr('class', 'background')
                    .layout(plotAreaLayout);

                var plotAreaContainer = container.selectAll('svg.plot-area')
                    .data([data]);
                plotAreaContainer.enter()
                    .append('svg')
                    .attr({
                        'class': 'plot-area'
                    })
                    .layout(plotAreaLayout);

                var xAxisContainer = container.selectAll('g.x-axis')
                    .data([data]);
                xAxisContainer.enter()
                    .append('g')
                    .attr('class', 'axis x-axis')
                    .layout({
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        right: yAxisWidth,
                        height: xAxisHeight
                    });

                var yAxisContainer = container.selectAll('g.y-axis')
                    .data([data]);
                yAxisContainer.enter()
                    .append('g')
                    .attr('class', 'axis y-axis')
                    .layout({
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: xAxisHeight,
                        width: yAxisWidth
                    });

                container.layout();

                xScale.range([0, xAxisContainer.layout('width')]);

                yScale.range([yAxisContainer.layout('height'), 0]);

                xAxisContainer.call(xAxis);

                yAxisContainer.call(yAxis);

                plotArea.xScale(xScale)
                    .yScale(yScale);
                plotAreaContainer.call(plotArea);

            });
        };

        rebind(linearTimeSeries, xScale, {
            xDiscontinuityProvider: 'discontinuityProvider',
            xDomain: 'domain',
            xNice: 'nice'
        });

        rebind(linearTimeSeries, yScale, {
            yDomain: 'domain',
            yNice: 'nice'
        });

        // Exclude scale when rebinding the axis properties because this component
        // is responsible for providing the required scale.
        rebindAll(linearTimeSeries, xAxis, 'x', 'scale');
        rebindAll(linearTimeSeries, yAxis, 'y', 'scale');

        linearTimeSeries.xScale = function() { return xScale; };
        linearTimeSeries.yScale = function() { return yScale; };
        linearTimeSeries.plotArea = function(x) {
            if (!arguments.length) {
                return plotArea;
            }
            plotArea = x;
            return linearTimeSeries;
        };
        linearTimeSeries.xAxisHeight = function(x) {
            if (!arguments.length) {
                return xAxisHeight;
            }
            xAxisHeight = x;
            return linearTimeSeries;
        };
        linearTimeSeries.yAxisWidth = function(x) {
            if (!arguments.length) {
                return yAxisWidth;
            }
            yAxisWidth = x;
            return linearTimeSeries;
        };

        return linearTimeSeries;
    }

    function legend() {
        var tableDecorate = noop,
            rowDecorate = noop;

        var items = [
                ['datum', function(d) { return d.datum; }]
            ];

        var tableDataJoin = dataJoin()
            .selector('table.legend')
            .element('table')
            .attr('class', 'legend');

        var rowDataJoin = dataJoin()
            .selector('tr.row')
            .element('tr')
            .attr('class', 'row');

        var legend = function(selection) {
            selection.each(function(data, index) {
                var container = d3.select(this);

                var legendData = items.map(function(item, i) {
                    return {
                        datum: data,
                        header: d3.functor(item[0]),
                        value: d3.functor(item[1])
                    };
                });

                var table = tableDataJoin(container, [legendData]);

                var trUpdate = rowDataJoin(table);

                var trEnter = trUpdate.enter();
                trEnter.append('th');
                trEnter.append('td');

                trUpdate.select('th')
                    .html(function(d, i) {
                        return d.header.call(this, d.datum, i);
                    });

                trUpdate.select('td')
                    .html(function(d, i) {
                        return d.value.call(this, d.datum, i);
                    });

                tableDecorate(table, data, index);
                rowDecorate(trUpdate, data, index);
            });
        };

        legend.items = function(x) {
            if (!arguments.length) {
                return items;
            }
            items = x;
            return legend;
        };

        legend.rowDecorate = function(x) {
            if (!arguments.length) {
                return rowDecorate;
            }
            rowDecorate = x;
            return legend;
        };

        legend.tableDecorate = function(x) {
            if (!arguments.length) {
                return tableDecorate;
            }
            tableDecorate = x;
            return legend;
        };

        return legend;
    }

    function cartesianChart(xScale, yScale) {

        xScale = xScale || d3.scale.linear();
        yScale = yScale || d3.scale.linear();

        var margin = {
                bottom: 30,
                right: 30
            },
            yLabel = '',
            xLabel = '',
            chartLabel = '',
            plotArea = _line(),
            decorate = noop;

        var xAxis = _axis()
            .orient('bottom')
            .baseline(function() {
                var domain = yScale.domain();
                return xAxis.orient() === 'bottom' ? domain[0] : domain[1];
            });

        var yAxis = _axis()
            .orient('right')
            .baseline(function() {
                var domain = xScale.domain();
                return yAxis.orient() === 'right' ? domain[1] : domain[0];
            });

        var axesSeries = _multi()
            .series([xAxis, yAxis]);

        var containerDataJoin = dataJoin()
            .selector('svg.cartesian-chart')
            .element('svg')
            .attr({'class': 'cartesian-chart', 'layout-css': 'flex: 1'});

        var cartesianChart = function(selection) {

            selection.each(function(data, index) {

                var container = d3.select(this);

                var svg = containerDataJoin(container, [data]);
                svg.enter().html(
                    '<g class="title"> \
                        <g layout-css="height: 0; width: 0"> \
                            <text class="label"/> \
                        </g> \
                    </g> \
                    <g class="y-axis"> \
                        <g layout-css="height: 0; width: 0"> \
                            <text class="label"/> \
                        </g> \
                    </g> \
                    <g class="x-axis"> \
                        <g layout-css="height: 0; width: 0"> \
                            <text class="label"/> \
                        </g> \
                    </g> \
                    <g class="plot-area-container"> \
                        <rect class="background" \
                            layout-css="position: absolute; top: 0; bottom: 0; left: 0; right: 0"/> \
                        <svg class="axes-container" \
                            layout-css="position: absolute; top: 0; bottom: 0; left: 0; right: 0"/> \
                        <svg class="plot-area" \
                            layout-css="position: absolute; top: 0; bottom: 0; left: 0; right: 0"/> \
                    </g>');

                var expandedMargin = expandMargin(margin);

                svg.select('.plot-area-container')
                    .layout({
                        position: 'absolute',
                        top: expandedMargin.top,
                        left: expandedMargin.left,
                        bottom: expandedMargin.bottom,
                        right: expandedMargin.right
                    });

                svg.select('.title')
                    .layout({
                        position: 'absolute',
                        top: 0,
                        alignItems: 'center',
                        left: expandedMargin.left,
                        right: expandedMargin.right
                    });

                var yAxisLayout = {
                    position: 'absolute',
                    top: expandedMargin.top,
                    bottom: expandedMargin.bottom,
                    alignItems: 'center',
                    flexDirection: 'row'
                };
                yAxisLayout[yAxis.orient()] = 0;
                svg.select('.y-axis')
                    .attr('class', 'y-axis ' + yAxis.orient())
                    .layout(yAxisLayout);

                var xAxisLayout = {
                    position: 'absolute',
                    left: expandedMargin.left,
                    right: expandedMargin.right,
                    alignItems: 'center'
                };
                xAxisLayout[xAxis.orient()] = 0;
                svg.select('.x-axis')
                    .attr('class', 'x-axis ' + xAxis.orient())
                    .layout(xAxisLayout);

                // perform the flexbox / css layout
                container.layout();

                // update the label text
                svg.select('.title .label')
                    .text(chartLabel);

                svg.select('.y-axis .label')
                    .text(yLabel)
                    .attr('transform', yAxis.orient() === 'right' ? 'rotate(90)' : 'rotate(-90)');

                svg.select('.x-axis .label')
                    .text(xLabel);

                // set the axis ranges
                var plotAreaContainer = svg.select('.plot-area');
                xScale.range([0, plotAreaContainer.layout('width')]);
                yScale.range([plotAreaContainer.layout('height'), 0]);

                // render the axes
                var axesContainer = svg.select('.axes-container');
                axesSeries.xScale(xScale)
                    .yScale(yScale);
                axesContainer.call(axesSeries);

                // render the plot area
                plotArea.xScale(xScale)
                    .yScale(yScale);
                plotAreaContainer.call(plotArea);

                decorate(svg, data, index);
            });
        };

        var scaleExclusions = [
            'range', 'rangeRound', // the scale range is set via the component layout
            'tickFormat'           // use axis.tickFormat instead
        ];
        rebindAll(cartesianChart, xScale, 'x', scaleExclusions);
        rebindAll(cartesianChart, yScale, 'y', scaleExclusions);

        rebindAll(cartesianChart, xAxis, 'x');
        rebindAll(cartesianChart, yAxis, 'y');

        cartesianChart.chartLabel = function(x) {
            if (!arguments.length) {
                return chartLabel;
            }
            chartLabel = x;
            return cartesianChart;
        };
        cartesianChart.plotArea = function(x) {
            if (!arguments.length) {
                return plotArea;
            }
            plotArea = x;
            return cartesianChart;
        };
        cartesianChart.xLabel = function(x) {
            if (!arguments.length) {
                return xLabel;
            }
            xLabel = x;
            return cartesianChart;
        };
        cartesianChart.margin = function(x) {
            if (!arguments.length) {
                return margin;
            }
            margin = x;
            return cartesianChart;
        };
        cartesianChart.yLabel = function(x) {
            if (!arguments.length) {
                return yLabel;
            }
            yLabel = x;
            return cartesianChart;
        };
        cartesianChart.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return cartesianChart;
        };

        return cartesianChart;
    }

    var chart = {
        cartesianChart: cartesianChart,
        legend: legend,
        linearTimeSeries: linearTimeSeries,
        sparkline: sparkline
    };

    function gridline() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            xTicks = 10,
            yTicks = 10;

        var xDecorate = noop,
            yDecorate = noop;

        var xLineDataJoin = dataJoin()
            .selector('line.x')
            .element('line')
            .attr('class', 'x gridline');

        var yLineDataJoin = dataJoin()
            .selector('line.y')
            .element('line')
            .attr('class', 'y gridline');

        var gridlines = function(selection) {

            selection.each(function(data, index) {

                var xData = xScale.ticks(xTicks);
                var xLines = xLineDataJoin(this, xData);

                xLines.attr({
                        'x1': xScale,
                        'x2': xScale,
                        'y1': yScale.range()[0],
                        'y2': yScale.range()[1]
                    });

                xDecorate(xLines, xData, index);

                var yData = yScale.ticks(yTicks);
                var yLines = yLineDataJoin(this, yData);

                yLines.attr({
                        'x1': xScale.range()[0],
                        'x2': xScale.range()[1],
                        'y1': yScale,
                        'y2': yScale
                    });

                yDecorate(yLines, yData, index);

            });
        };

        gridlines.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return gridlines;
        };
        gridlines.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return gridlines;
        };
        gridlines.xTicks = function(x) {
            if (!arguments.length) {
                return xTicks;
            }
            xTicks = x;
            return gridlines;
        };
        gridlines.yTicks = function(x) {
            if (!arguments.length) {
                return yTicks;
            }
            yTicks = x;
            return gridlines;
        };
        gridlines.yDecorate = function(x) {
            if (!arguments.length) {
                return yDecorate;
            }
            yDecorate = x;
            return gridlines;
        };
        gridlines.xDecorate = function(x) {
            if (!arguments.length) {
                return xDecorate;
            }
            xDecorate = x;
            return gridlines;
        };


        return gridlines;
    }

    function band() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            x0, x1, y0, y1,
            x0Scaled = function() {
                return range(xScale)[0];
            },
            x1Scaled = function() {
                return range(xScale)[1];
            },
            y0Scaled = function() {
                return range(yScale)[0];
            },
            y1Scaled = function() {
                return range(yScale)[1];
            },
            decorate = noop;

        var dataJoin$$ = dataJoin()
            .selector('g.annotation')
            .element('g')
            .attr('class', 'annotation');

        var band = function(selection) {
            selection.each(function(data, index) {

                var container = d3.select(this);

                var g = dataJoin$$(container, data);

                g.enter()
                    .append('path')
                    .classed('band', true);

                var pathGenerator = bar()
                    .align('right')
                    .x(x0Scaled)
                    .y(y0Scaled)
                    .height(function() {
                        return y1Scaled.apply(this, arguments) - y0Scaled.apply(this, arguments);
                    })
                    .width(function() {
                        return x1Scaled.apply(this, arguments) - x0Scaled.apply(this, arguments);
                    });

                g.select('path')
                    .attr('d', function(d, i) {
                        // the path generator is being used to render a single path, hence
                        // an explicit index is provided
                        return pathGenerator.call(this, [d], i);
                    });

                decorate(g, data, index);
            });
        };

        band.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return band;
        };
        band.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return band;
        };
        band.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return band;
        };
        band.x0 = function(x) {
            if (!arguments.length) {
                return x0;
            }
            x0 = d3.functor(x);
            x0Scaled = function() {
                return xScale(x0.apply(this, arguments));
            };
            return band;
        };
        band.x1 = function(x) {
            if (!arguments.length) {
                return x1;
            }
            x1 = d3.functor(x);
            x1Scaled = function() {
                return xScale(x1.apply(this, arguments));
            };
            return band;
        };
        band.y0 = function(x) {
            if (!arguments.length) {
                return y0;
            }
            y0 = d3.functor(x);
            y0Scaled = function() {
                return yScale(y0.apply(this, arguments));
            };
            return band;
        };
        band.y1 = function(x) {
            if (!arguments.length) {
                return y1;
            }
            y1 = d3.functor(x);
            y1Scaled = function() {
                return yScale(y1.apply(this, arguments));
            };
            return band;
        };
        return band;
    }

    var annotation = {
        band: band,
        gridline: gridline,
        line: line
    };

    // Needs to be defined like this so that the grunt task can update it
    var version = '1.2.0';

    var fc = {
        annotation: annotation,
        chart: chart,
        data: _data,
        indicator: indicator,
        layout: _layout,
        scale: __scale,
        series: _series,
        svg: svg,
        tool: tool,
        util: util,
        version: version
    };

    return fc;

}));