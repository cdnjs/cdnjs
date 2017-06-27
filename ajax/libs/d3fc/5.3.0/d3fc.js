(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('css-layout'), require('d3'), require('svg-innerhtml')) :
    typeof define === 'function' && define.amd ? define(['css-layout', 'd3', 'svg-innerhtml'], factory) :
    global.fc = factory(global.computeLayout,global.d3,global.svg_innerhtml);
}(this, function (computeLayout,d3,svg_innerhtml) { 'use strict';

    computeLayout = 'default' in computeLayout ? computeLayout['default'] : computeLayout;
    d3 = 'default' in d3 ? d3['default'] : d3;

    var _array = {
        get randomItem () { return randomItem; },
        get randomIndex () { return randomIndex; },
        get cloneAndReplace () { return cloneAndReplace; }
    };

    var _scale = {
        get isOrdinal () { return isOrdinal; },
        get range () { return range; },
        get setRange () { return setRange; }
    };

    var _fn = {
        get context () { return context; },
        get identity () { return identity; },
        get index () { return _index; },
        get noop () { return noop; },
        get defined () { return defined; }
    };

    // returns the width and height of the given element minus the padding.
    function innerDimensions(element) {
        var style = element.ownerDocument.defaultView.getComputedStyle(element);
        return {
            width: parseFloat(style.width) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
            height: parseFloat(style.height) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
        };
    }

    function ownerSVGElement(node) {
        while (node.ownerSVGElement) {
            node = node.ownerSVGElement;
        }
        return node;
    }

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
                    if (child.getAttribute('layout-style')) {
                        children.push(createNodes(child));
                    }
                }
            }
            return children;
        }
        return {
            style: parseStyle(el.getAttribute('layout-style')),
            children: getChildNodes(el),
            element: el
        };
    }

    // takes the result of layout and applied it to the SVG elements
    function applyLayout(node, subtree) {
        // don't set layout-width/height on layout root node
        if (subtree) {
            node.element.setAttribute('layout-width', node.layout.width);
            node.element.setAttribute('layout-height', node.layout.height);
        }

        node.element.setAttribute('layout-x', node.layout.left);
        node.element.setAttribute('layout-y', node.layout.top);

        var rectOrSvg = node.element.nodeName.match(/(?:svg|rect)/i);

        //for svg / rect set the dimensions via width/height properties
        if (rectOrSvg) {
            node.element.setAttribute('width', node.layout.width);
            node.element.setAttribute('height', node.layout.height);
        }

        //for non-root svg / rect set the offset via x/y properties
        if (rectOrSvg && subtree) {
            node.element.setAttribute('x', node.layout.left);
            node.element.setAttribute('y', node.layout.top);
        }

        // for all other non-root elements apply a transform
        if (!rectOrSvg && subtree) {
            node.element.setAttribute('transform',
                'translate(' + node.layout.left + ', ' + node.layout.top + ')');
        }

        node.children.forEach(function(childNode) {
            applyLayout(childNode, true);
        });
    }

    function computeDimensions(node) {
        if (node.hasAttribute('layout-width') && node.hasAttribute('layout-height')) {
            return {
                width: Number(node.getAttribute('layout-width')),
                height: Number(node.getAttribute('layout-height'))
            };
        } else {
            return innerDimensions(node);
        }
    }

    function computePosition(node) {
        if (node.hasAttribute('layout-x') && node.hasAttribute('layout-y')) {
            return {
                x: Number(node.getAttribute('layout-x')),
                y: Number(node.getAttribute('layout-y'))
            };
        } else {
            return { x: 0, y: 0 };
        }
    }

    function layout(node) {
        if (ownerSVGElement(node).__layout__ === 'suspended') {
            return;
        }

        var dimensions = computeDimensions(node);

        var position = computePosition(node);

        // create the layout nodes
        var layoutNodes = createNodes(node);

        // set the dimensions / position of the root
        layoutNodes.style.width = dimensions.width;
        layoutNodes.style.height = dimensions.height;
        layoutNodes.style.left = position.x;
        layoutNodes.style.top = position.y;

        // use the Facebook CSS goodness
        computeLayout(layoutNodes);

        // apply the resultant layout
        applyLayout(layoutNodes);
    }

    function layoutSuspended(x) {
        if (!arguments.length) {
            return Boolean(ownerSVGElement(this.node()).__layout__);
        }
        return this.each(function() {
            ownerSVGElement(this).__layout__ = x ? 'suspended' : '';
        });
    }

    d3.selection.prototype.layoutSuspended = layoutSuspended;
    d3.transition.prototype.layoutSuspended = layoutSuspended;

    function layoutSelection(name, value) {
        var argsLength = arguments.length;

        // For layout(string), return the lyout value for the first node
        if (argsLength === 1 && typeof name === 'string') {
            var node = this.node();
            return Number(node.getAttribute('layout-' + name));
        }

        // for all other invocations, iterate over each item in the selection
        return this.each(function() {
            if (argsLength === 2) {
                if (typeof name !== 'string') {
                    // layout(number, number) - sets the width and height and performs layout
                    this.setAttribute('layout-width', name);
                    this.setAttribute('layout-height', value);
                    layout(this);
                } else {
                    // layout(name, value) - sets a layout- attribute
                    this.setAttribute('layout-style', name + ':' + value);
                }
            } else if (argsLength === 1) {
                if (typeof name !== 'string') {
                    // layout(object) - sets the layout-style property to the given object
                    var currentStyle = parseStyle(this.getAttribute('layout-style'));
                    var styleDiff = name;
                    Object.keys(styleDiff)
                        .forEach(function(property) {
                            currentStyle[property] = styleDiff[property];
                        });
                    var layoutCss = Object.keys(currentStyle)
                        .map(function(property) {
                            return property + ':' + currentStyle[property];
                        })
                        .join(';');
                    this.setAttribute('layout-style', layoutCss);
                }
            } else if (argsLength === 0) {
                // layout() - executes layout
                layout(this);
            }
        });
    }

    d3.selection.prototype.layout = layoutSelection;
    d3.transition.prototype.layout = layoutSelection;

    function isIntersecting(a, b) {
        return !(a.x >= (b.x + b.width) ||
           (a.x + a.width) <= b.x ||
           a.y >= (b.y + b.height) ||
           (a.y + a.height) <= b.y);
    }

    function areaOfIntersection(a, b) {
        var left = Math.max(a.x, b.x);
        var right = Math.min(a.x + a.width, b.x + b.width);
        var top = Math.max(a.y, b.y);
        var bottom = Math.min(a.y + a.height, b.y + b.height);
        return (right - left) * (bottom - top);
    }

    function collidingWith(rectangles, index) {
        var rectangle = rectangles[index];

        // Filter all rectangles that aren't the selected rectangle
        // and the filter if they intersect.
        return rectangles.filter(function(_, i) {
            return index !== i;
        }).filter(function(d) {
            return isIntersecting(d, rectangle);
        });
    }

    function collisionArea(rectangles, index) {
        var rectangle = rectangles[index];
        var collisions = collidingWith(rectangles, index);

        return d3.sum(collisions.map(function(d) {
            return areaOfIntersection(rectangle, d);
        }));
    }

    function totalCollisionArea(rectangles) {
        return d3.sum(rectangles.map(function(_, i) {
            return collisionArea(rectangles, i);
        }));
    }

    function randomItem(array) {
        return array[randomIndex(array)];
    }

    function randomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    function cloneAndReplace(array, index, replacement) {
        var clone = array.slice();
        clone[index] = replacement;
        return clone;
    }

    function getAllPlacements(label) {
        var x = label.x;
        var y = label.y;
        var width = label.width;
        var height = label.height;
        return [
            getPlacement(x, y, width, height), // Same location
            getPlacement(x - width, y, width, height), // Left
            getPlacement(x - width, y - height, width, height), // Up, left
            getPlacement(x, y - height, width, height), // Up
            getPlacement(x, y - height / 2, width, height), // Half up
            getPlacement(x - width / 2, y, width, height), // Half left
            getPlacement(x - width, y - height / 2, width, height), // Full left, half up
            getPlacement(x - width / 2, y - height, width, height) // Full up, half left
        ];
    }

    function getPlacement(x, y, width, height) {
        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    }

    function containerUtils() {
        var containerWidth = null,
            containerHeight = null;

        var container = function(point) {
            // If the bounds haven't been defined, then don't enforce
            return (containerWidth == null && containerHeight == null) ||
                (!(point.x < 0 || point.y < 0 ||
                point.x > containerWidth || point.y > containerHeight ||
                (point.x + point.width) > containerWidth ||
                (point.y + point.height) > containerHeight));
        };

        container.containerWidth = function(value) {
            if (!arguments.length) {
                return containerWidth;
            }
            containerWidth = value;
            return container;
        };

        container.containerHeight = function(value) {
            if (!arguments.length) {
                return containerHeight;
            }
            containerHeight = value;
            return container;
        };

        return container;
    }

    function annealing() {

        var container = containerUtils();
        var temperature = 1000;
        var cooling = 1;

        var strategy = function(data) {

            var originalData = data;
            var iteratedData = data;

            var lastScore = Infinity;
            var currentTemperature = temperature;
            while (currentTemperature > 0) {

                var potentialReplacement = getPotentialState(originalData, iteratedData);

                var potentialScore = scorer(potentialReplacement);

                // Accept the state if it's a better state
                // or at random based off of the difference between scores.
                // This random % helps the algorithm break out of local minima
                var probablityOfChoosing = Math.exp((lastScore - potentialScore) / currentTemperature);
                if (potentialScore < lastScore || probablityOfChoosing > Math.random()) {
                    iteratedData = potentialReplacement;
                    lastScore = potentialScore;
                }

                currentTemperature -= cooling;
            }
            return iteratedData;
        };

        strategy.temperature = function(i) {
            if (!arguments.length) {
                return temperature;
            }

            temperature = i;
            return strategy;
        };

        strategy.cooling = function(i) {
            if (!arguments.length) {
                return cooling;
            }

            cooling = i;
            return strategy;
        };

        function getPotentialState(originalData, iteratedData) {
            // For one point choose a random other placement.

            var victimLabelIndex = randomIndex(originalData);
            var label = originalData[victimLabelIndex];

            var replacements = getAllPlacements(label);
            var replacement = randomItem(replacements);

            return cloneAndReplace(iteratedData, victimLabelIndex, replacement);
        }

        d3.rebind(strategy, container, 'containerWidth');
        d3.rebind(strategy, container, 'containerHeight');

        function scorer(placement) {
            var collisionArea = totalCollisionArea(placement);
            var pointsOnScreen = 1;
            for (var i = 0; i < placement.length; i++) {
                var point = placement[i];
                pointsOnScreen += container(point) ? 0 : 100;
            }
            return collisionArea * pointsOnScreen;
        }

        return strategy;
    }

    function minimum(data, accessor) {
        return data.map(function(dataPoint) {
            return [accessor(dataPoint), dataPoint];
        }).reduce(function(accumulator, dataPoint) {
            return accumulator[0] > dataPoint[0] ? dataPoint : accumulator;
        }, [Number.MAX_VALUE, null])[1];
    }

    function local() {

        var container = containerUtils();
        var iterations = 1;

        var strategy = function(data) {

            var originalData = data;
            var iteratedData = data;

            var thisIterationScore = Number.MAX_VALUE;
            var lastIterationScore = Infinity;
            var iteration = 0;

            // Keep going until there's no more iterations to do or
            // the solution is a local minimum
            while (iteration < iterations && thisIterationScore < lastIterationScore) {
                lastIterationScore = thisIterationScore;

                iteratedData = iterate(originalData, iteratedData);

                thisIterationScore = totalCollisionArea(iteratedData);
                iteration++;
            }
            return iteratedData;
        };

        strategy.iterations = function(i) {
            if (!arguments.length) {
                return iterations;
            }

            iterations = i;
            return strategy;
        };

        function iterate(originalData, iteratedData) {

            // Find rectangles with collisions or are outside of the bounds of the container
            iteratedData.map(function(d, i) {
                return [d, i];
            }).filter(function(d, i) {
                return collidingWith(iteratedData, d[1]).length || !container(d[0]);
            }).forEach(function(d) {

                // Use original data to stop wandering rectangles with each iteration
                var placements = getAllPlacements(originalData[d[1]]);

                // Create different states the algorithm could transition to
                var candidateReplacements = placements.map(function(placement) {
                    return cloneAndReplace(iteratedData, d[1], placement);
                });

                // Choose the best state.
                var bestPlacement = minimum(candidateReplacements, function(placement) {
                    var areaOfCollisions = collisionArea(placement, d[1]);
                    var isOnScreen = container(placement[d[1]]);
                    return areaOfCollisions + (isOnScreen ? 0 : Number.MAX_VALUE);
                });

                iteratedData = bestPlacement;
            });
            return iteratedData;
        }

        d3.rebind(strategy, container, 'containerWidth');
        d3.rebind(strategy, container, 'containerHeight');

        return strategy;
    }

    function greedy() {

        var container = containerUtils();

        var strategy = function(data) {
            var builtPoints = [];

            data.forEach(function(point) {
                var allPointPlacements = getAllPlacements(point);
                var candidateReplacements = allPointPlacements.map(function(placement) {
                    return getCandidateReplacement(builtPoints, placement);
                });

                builtPoints = minimum(candidateReplacements, scorer);
            });

            return builtPoints;
        };

        d3.rebind(strategy, container, 'containerWidth');
        d3.rebind(strategy, container, 'containerHeight');

        function getCandidateReplacement(allPoints, point) {
            var allPointsCopy = allPoints.slice();
            allPointsCopy.push(point);

            return allPointsCopy;
        }

        function scorer(placement) {
            var areaOfCollisions = totalCollisionArea(placement);
            var isOnScreen = true;
            for (var i = 0; i < placement.length && isOnScreen; i++) {
                var point = placement[i];
                isOnScreen = container(point);
            }
            return areaOfCollisions + (isOnScreen ? 0 : Infinity);
        }

        return strategy;
    }

    function boundingBox() {

        var containerWidth = 1,
            containerHeight = 1;

        var strategy = function(data) {
            return data.map(function(d, i) {

                var tx = d.x, ty = d.y;
                if (tx + d.width > containerWidth) {
                    tx -= d.width;
                }

                if (ty + d.height > containerHeight) {
                    ty -= d.height;
                }
                return {x: tx, y: ty};
            });
        };

        strategy.containerWidth = function(value) {
            if (!arguments.length) {
                return containerWidth;
            }
            containerWidth = value;
            return strategy;
        };

        strategy.containerHeight = function(value) {
            if (!arguments.length) {
                return containerHeight;
            }
            containerHeight = value;
            return strategy;
        };

        return strategy;
    }

    var strategy = {
        boundingBox: boundingBox,
        greedy: greedy,
        local: local,
        annealing: annealing
    };

    // applies the d3.functor to each element of an array, allowing a mixed
    // of functions and constants, e.g.
    // [0, function(d) { return d.foo; }]
    function functoredArray(x) {
        var functoredItems = x.map(function(item) {
            return d3.functor(item);
        });
        return function(d, i) {
            return functoredItems.map(function(j) {
                return j(d, i);
            });
        };
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
        prefix = typeof prefix !== 'undefined' ? prefix : '';

        // if exclusions isn't an array, construct it
        if (!(arguments.length === 4 && Array.isArray(exclusions))) {
            exclusions = Array.prototype.slice.call(arguments, 3);
        }

        exclusions = exclusions.map(function(exclusion) {
            if (typeof(exclusion) === 'string') {
                if (!source.hasOwnProperty(exclusion)) {
                    throw new Error('The method ' + exclusion + ' does not exist on the source object');
                }
                exclusion = new RegExp('^' + exclusion + '$');
            }
            return exclusion;
        });

        function exclude(testedProperty) {
            return exclusions.some(function(exclusion) {
                return testedProperty.match(exclusion);
            });
        }

        function reboundPropertyName(inputProperty) {
            return prefix !== '' ? prefix + capitalizeFirstLetter(inputProperty) : inputProperty;
        }

        var bindings = {};
        for (var property in source) {
            if (source.hasOwnProperty(property) && !exclude(property)) {
                bindings[reboundPropertyName(property)] = property;
            }
        }

        rebind(target, source, bindings);
    }

    function isOrdinal(scale) {
        return scale.rangeExtent;
    }

    // ordinal axes have a rangeExtent function, this adds any padding that
    // was applied to the range. This functions returns the rangeExtent
    // if present, or range otherwise
    ///
    // NOTE: d3 uses very similar logic here:
    // https://github.com/mbostock/d3/blob/5b981a18db32938206b3579248c47205ecc94123/src/scale/scale.js#L8
    function range(scale) {
        // for non ordinal, simply return the range
        if (!isOrdinal(scale)) {
            return scale.range();
        }

        // For ordinal, use the rangeExtent. However, rangeExtent always provides
        // a non inverted range (i.e. extent[0] < extent[1]) regardless of the
        // range set on the scale. The logic below detects the inverted case.
        //
        // The d3 code that tackles the same issue doesn't have to deal with the inverted case.
        var scaleRange = scale.range();
        var extent = scale.rangeExtent();
        if (scaleRange.length <= 1) {
            // we cannot detect the inverted case if the range (and domain) has
            // a single item in it.
            return extent;
        }

        var inverted = scaleRange[0] > scaleRange[1];
        return inverted ? [extent[1], extent[0]] : extent;
    }

    // Ordinal and quantitative scales have different methods for setting the range. This
    // function detects the scale type and sets the range accordingly.
    function setRange(scale, scaleRange) {
        if (isOrdinal(scale)) {
            scale.rangePoints(scaleRange, 1);
        } else {
            scale.range(scaleRange);
        }
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

    // Checks that passes properties are 'defined', meaning that calling them with (d, i) returns non null values
    function defined() {
        var outerArguments = arguments;
        return function(d, i) {
            for (var c = 0, j = outerArguments.length; c < j; c++) {
                if (outerArguments[c](d, i) == null) {
                    return false;
                }
            }
            return true;
        };
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

    function dataJoinUtil() {
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
                var dataKey = arguments[0];
                var value = arguments[1];

                attr[dataKey] = value;
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

    function _rectangles(layoutStrategy) {

        var size = d3.functor([0, 0]),
            position = function(d, i) { return [d.x, d.y]; };

        var xScale = d3.scale.identity(),
            yScale = d3.scale.identity(),
            anchor = noop,
            strategy = layoutStrategy || identity,
            component = noop;

        var dataJoin = dataJoinUtil()
            .selector('g.rectangle')
            .element('g')
            .attr('class', 'rectangle');

        var rectangles = function(selection) {

            var xRange = range(xScale),
                yRange = range(yScale);

            if (strategy.containerWidth) {
                strategy.containerWidth(Math.max(xRange[0], xRange[1]));
            }
            if (strategy.containerHeight) {
                strategy.containerHeight(Math.max(yRange[0], yRange[1]));
            }

            selection.each(function(data, index) {
                var g = dataJoin(this, data);

                // obtain the rectangular bounding boxes for each child
                var childRects = data.map(function(d, i) {
                    var childPos = position(d, i);
                    var childSize = size(d, i);
                    return {
                        x: childPos[0],
                        y: childPos[1],
                        width: childSize[0],
                        height: childSize[1]
                    };
                });

                // apply the strategy to derive the layout
                var layout = strategy(childRects);

                // offset each rectangle accordingly
                g.attr('transform', function(d, i) {
                    var offset = layout[i];
                    return 'translate(' + offset.x + ', ' + offset.y + ')';
                });

                // set the anchor-point for each rectangle
                data.forEach(function(d, i) {
                    var pos = position(d, i);
                    var relativeAnchorPosition = [pos[0] - layout[i].x, pos[1] - layout[i].y];
                    anchor(d, i, relativeAnchorPosition);
                });

                // set the layout width / height so that children can use SVG layout if required
                g.attr({
                    'layout-width': function(d, i) { return childRects[i].width; },
                    'layout-height': function(d, i) { return childRects[i].height; }
                });

                g.call(component);
            });
        };

        rebindAll(rectangles, strategy);

        rectangles.size = function(x) {
            if (!arguments.length) {
                return size;
            }
            size = functoredArray(x);
            return rectangles;
        };

        rectangles.position = function(x) {
            if (!arguments.length) {
                return position;
            }
            position = functoredArray(x);
            return rectangles;
        };

        rectangles.anchor = function(x) {
            if (!arguments.length) {
                return anchor;
            }
            anchor = x;
            return rectangles;
        };

        rectangles.xScale = function(value) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = value;
            return rectangles;
        };

        rectangles.yScale = function(value) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = value;
            return rectangles;
        };

        rectangles.component = function(value) {
            if (!arguments.length) {
                return component;
            }
            component = value;
            return rectangles;
        };

        return rectangles;
    }

    var _layout = {
        rectangles: _rectangles,
        strategy: strategy
    };

    /* global requestAnimationFrame:false */

    // Debounce render to only occur once per frame
    function render(renderInternal) {
        var rafId = null;
        return function() {
            if (rafId == null) {
                rafId = requestAnimationFrame(function() {
                    rafId = null;
                    renderInternal();
                });
            }
        };
    }

    function noSnap(xScale, yScale) {
        return function(xPixel, yPixel) {
            return {
                x: xPixel,
                y: yPixel
            };
        };
    }

    function pointSnap(xScale, yScale, xValue, yValue, data, objectiveFunction) {
        // a default function that computes the distance between two points
        objectiveFunction = objectiveFunction || function(x, y, cx, cy) {
            var dx = x - cx,
                dy = y - cy;
            return dx * dx + dy * dy;
        };

        return function(xPixel, yPixel) {
            var nearest = data.map(function(d) {
                var diff = objectiveFunction(xPixel, yPixel, xScale(xValue(d)), yScale(yValue(d)));
                return [diff, d];
            })
            .reduce(function(accumulator, value) {
                return accumulator[0] > value[0] ? value : accumulator;
            }, [Number.MAX_VALUE, null])[1];

            return {
                datum: nearest,
                x: nearest ? xScale(xValue(nearest)) : xPixel,
                y: nearest ? yScale(yValue(nearest)) : yPixel
            };
        };
    }

    function seriesPointSnap(series, data, objectiveFunction) {
        return function(xPixel, yPixel) {
            var xScale = series.xScale(),
                yScale = series.yScale(),
                xValue = series.xValue(),
                yValue = (series.yValue || series.yCloseValue).call(series);
            return pointSnap(xScale, yScale, xValue, yValue, data, objectiveFunction)(xPixel, yPixel);
        };
    }

    function seriesPointSnapXOnly(series, data) {
        function objectiveFunction(x, y, cx, cy) {
            var dx = x - cx;
            return Math.abs(dx);
        }
        return seriesPointSnap(series, data, objectiveFunction);
    }

    function seriesPointSnapYOnly(series, data) {
        function objectiveFunction(x, y, cx, cy) {
            var dy = y - cy;
            return Math.abs(dy);
        }
        return seriesPointSnap(series, data, objectiveFunction);
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

    /**
     * The extent function enhances the functionality of the equivalent D3 extent function, allowing
     * you to pass an array of fields, or accessors, which will be used to derive the extent of the supplied array. For
     * example, if you have an array of items with properties of 'high' and 'low', you
     * can use <code>fc.util.extent().fields(['high', 'low'])(data)</code> to compute the extent of your data.
     *
     * @memberof fc.util
     */
    function extent() {

        var fields = [],
            extraPoint = null,
            padUnit = 'percent',
            pad = 0,
            symmetricalAbout = null;

        /**
        * @param {array} data an array of data points, or an array of arrays of data points
        */
        var extents = function(data) {

            // we need an array of arrays if we don't have one already
            if (!Array.isArray(data[0])) {
                data = [data];
            }

            // the fields can be a mixed array of property names or accessor functions
            fields = fields.map(function(field) {
                if (typeof field !== 'string') {
                    return field;
                }
                return function(d) {
                    return d[field];
                };
            });

            var dataMin = d3.min(data, function(d0) {
                return d3.min(d0, function(d1) {
                    return d3.min(fields.map(function(f) {
                        return f(d1);
                    }));
                });
            });

            var dataMax = d3.max(data, function(d0) {
                return d3.max(d0, function(d1) {
                    return d3.max(fields.map(function(f) {
                        return f(d1);
                    }));
                });
            });

            var dateExtent = Object.prototype.toString.call(dataMin) === '[object Date]';

            var min = dateExtent ? dataMin.getTime() : dataMin;
            var max = dateExtent ? dataMax.getTime() : dataMax;

            // apply symmetry rules
            if (symmetricalAbout != null) {
                var symmetrical = dateExtent ? symmetricalAbout.getTime() : symmetricalAbout;
                var distanceFromMax = Math.abs(max - symmetrical),
                    distanceFromMin = Math.abs(min - symmetrical),
                    halfRange = Math.max(distanceFromMax, distanceFromMin);

                min = symmetrical - halfRange;
                max = symmetrical + halfRange;
            }

            if (padUnit === 'domain') {
                // pad absolutely
                if (Array.isArray(pad)) {
                    min -= pad[0];
                    max += pad[1];
                } else {
                    min -= pad;
                    max += pad;
                }
            } else if (padUnit === 'percent') {
                // pad percentagely
                if (Array.isArray(pad)) {
                    var deltaArray = [pad[0] * (max - min), pad[1] * (max - min)];
                    min -= deltaArray[0];
                    max += deltaArray[1];
                } else {
                    var delta = pad * (max - min) / 2;
                    min -= delta;
                    max += delta;
                }
            }

            // Include the specified point in the range
            if (extraPoint !== null) {
                if (extraPoint < min) {
                    min = extraPoint;
                } else if (extraPoint > max) {
                    max = extraPoint;
                }
            }

            if (dateExtent) {
                min = new Date(min);
                max = new Date(max);
            }

            // Return the smallest and largest
            return [min, max];
        };

        /*
        * @param {array} fields the names of object properties that represent field values, or accessor functions.
        */
        extents.fields = function(x) {
            if (!arguments.length) {
                return fields;
            }

            // the fields parameter must be an array of field names,
            // but we can pass non-array types in
            if (!Array.isArray(x)) {
                x = [x];
            }

            fields = x;
            return extents;
        };

        extents.include = function(x) {
            if (!arguments.length) {
                return extraPoint;
            }
            extraPoint = x;
            return extents;
        };

        extents.padUnit = function(x) {
            if (!arguments.length) {
                return padUnit;
            }
            padUnit = x;
            return extents;
        };

        extents.pad = function(x) {
            if (!arguments.length) {
                return pad;
            }
            pad = x;
            return extents;
        };

        extents.symmetricalAbout = function(x) {
            if (!arguments.length) {
                return symmetricalAbout;
            }
            symmetricalAbout = x;
            return extents;
        };

        return extents;
    }

    // A rectangle is an object with top, left, bottom and right properties. Component
    // margin or padding properties can accept an integer, which is converted to a rectangle where each
    // property equals the given value. Also, a margin / padding may have properties missing, in
    // which case they default to zero.
    // This function expand an integer to a rectangle and fills missing properties.
    function expandRect(margin) {
        var expandedRect = margin;
        if (typeof(expandedRect) === 'number') {
            expandedRect = {
                top: margin,
                bottom: margin,
                left: margin,
                right: margin
            };
        }
        ['top', 'bottom', 'left', 'right'].forEach(function(direction) {
            if (!expandedRect[direction]) {
                expandedRect[direction] = 0;
            }
        });
        return expandedRect;
    }

    var util = {
        dataJoin: dataJoinUtil,
        expandRect: expandRect,
        extent: extent,
        fn: _fn,
        minimum: minimum,
        fractionalBarWidth: fractionalBarWidth,
        innerDimensions: innerDimensions,
        rebind: rebind,
        rebindAll: rebindAll,
        scale: _scale,
        noSnap: noSnap,
        pointSnap: pointSnap,
        seriesPointSnap: seriesPointSnap,
        seriesPointSnapXOnly: seriesPointSnapXOnly,
        seriesPointSnapYOnly: seriesPointSnapYOnly,
        render: render,
        arrayFunctor: functoredArray,
        array: _array
    };

    function measure() {

        var event = d3.dispatch('measuresource', 'measuretarget', 'measureclear'),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            snap = function(_x, _y) {
                return noSnap(xScale, yScale)(_x, _y);
            },
            decorate = noop,
            xLabel = d3.functor(''),
            yLabel = d3.functor(''),
            padding = d3.functor(2);

        var x = function(d) { return d.x; },
            y = function(d) { return d.y; };

        var dataJoin = dataJoinUtil()
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

                var g = dataJoin(container, data);

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

        measure.xScale = function(_x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = _x;
            return measure;
        };
        measure.yScale = function(_x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = _x;
            return measure;
        };
        measure.snap = function(_x) {
            if (!arguments.length) {
                return snap;
            }
            snap = _x;
            return measure;
        };
        measure.decorate = function(_x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = _x;
            return measure;
        };
        measure.xLabel = function(_x) {
            if (!arguments.length) {
                return xLabel;
            }
            xLabel = d3.functor(_x);
            return measure;
        };
        measure.yLabel = function(_x) {
            if (!arguments.length) {
                return yLabel;
            }
            yLabel = d3.functor(_x);
            return measure;
        };
        measure.padding = function(_x) {
            if (!arguments.length) {
                return padding;
            }
            padding = d3.functor(_x);
            return measure;
        };

        d3.rebind(measure, event, 'on');

        return measure;
    }

    function _container() {

        var padding = 0,
            component = noop,
            decorate = noop;

        var dataJoin = dataJoinUtil()
            .selector('g.container')
            .element('g')
            .attr({
                'class': 'container',
                'layout-style': 'flex: 1'
            });

        var container = function(selection) {
            selection.each(function(data, index) {
                var expandedPadding = expandRect(padding);

                var g = dataJoin(this, [data]);

                g.enter()
                    .append('rect')
                    .layout('flex', 1);

                g.enter()
                    .append('g')
                    .layout({
                        position: 'absolute',
                        top: expandedPadding.top,
                        left: expandedPadding.left,
                        bottom: expandedPadding.bottom,
                        right: expandedPadding.right
                    });

                d3.select(this).layout();

                g.select('g').call(component);

                decorate(g, data, index);
            });
        };

        container.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return container;
        };

        container.padding = function(x) {
            if (!arguments.length) {
                return padding;
            }
            padding = x;
            return container;
        };

        container.component = function(x) {
            if (!arguments.length) {
                return component;
            }
            component = x;
            return container;
        };

        return container;
    }

    function fibonacciFan() {

        var event = d3.dispatch('fansource', 'fantarget', 'fanclear'),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            snap = function(_x, _y) {
                return noSnap(xScale, yScale)(_x, _y);
            },
            decorate = noop;

        var x = function(d) { return d.x; },
            y = function(d) { return d.y; };

        var dataJoin = dataJoinUtil()
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

                var g = dataJoin(container, data);

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

        fan.xScale = function(_x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = _x;
            return fan;
        };
        fan.yScale = function(_x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = _x;
            return fan;
        };
        fan.snap = function(_x) {
            if (!arguments.length) {
                return snap;
            }
            snap = _x;
            return fan;
        };
        fan.decorate = function(_x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = _x;
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

        var dataJoin = dataJoinUtil()
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
                var dataSeries = this.__series__ || d;
                return key.call(this, dataSeries, i);
            });

        var multi = function(selection) {

            selection.each(function(data) {

                var g = dataJoin(this, series);

                g.each(function(dataSeries, i) {
                    // We must always assign the series to the node, as the order
                    // may have changed. N.B. in such a case the output is most
                    // likely garbage (containers should not be re-used) but by
                    // doing this we at least make it debuggable garbage :)
                    this.__series__ = dataSeries;

                    (dataSeries.xScale || dataSeries.x).call(dataSeries, xScale);
                    (dataSeries.yScale || dataSeries.y).call(dataSeries, yScale);

                    d3.select(this)
                        .datum(mapping.call(data, dataSeries, i))
                        .call(dataSeries);
                });

                // order is not available on a transition selection
                d3.selection.prototype.order.call(g);

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

        var dataJoin = dataJoinUtil()
            .selector('g.annotation')
            .element('g');

        var line = function(selection) {
            selection.each(function(data, selectionIndex) {

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
                dataJoin.attr('class', 'annotation ' + orient);
                var g = dataJoin(container, data);

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

                decorate(g, data, selectionIndex);
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

    function xyBase() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            y0Value = d3.functor(0),
            x0Value = d3.functor(0),
            xValue = function(d, i) { return d.date; },
            yValue = function(d, i) { return d.close; };

        function base() { }

        base.x0 = function(d, i) {
            return xScale(x0Value(d, i));
        };
        base.y0 = function(d, i) {
            return yScale(y0Value(d, i));
        };
        base.x = base.x1 = function(d, i) {
            return xScale(xValue(d, i));
        };
        base.y = base.y1 = function(d, i) {
            return yScale(yValue(d, i));
        };

        base.defined = function(d, i) {
            return defined(x0Value, y0Value, xValue, yValue)(d, i);
        };

        base.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return base;
        };
        base.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return base;
        };
        base.x0Value = function(x) {
            if (!arguments.length) {
                return x0Value;
            }
            x0Value = d3.functor(x);
            return base;
        };
        base.y0Value = function(x) {
            if (!arguments.length) {
                return y0Value;
            }
            y0Value = d3.functor(x);
            return base;
        };
        base.xValue = base.x1Value = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = d3.functor(x);
            return base;
        };
        base.yValue = base.y1Value = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = d3.functor(x);
            return base;
        };

        return base;
    }

    function _point() {

        var decorate = noop,
            symbol = d3.svg.symbol();

        var base = xyBase();

        var dataJoin = dataJoinUtil()
            .selector('g.point')
            .element('g')
            .attr('class', 'point');

        var containerTransform = function(d, i) {
            return 'translate(' + base.x(d, i) + ', ' + base.y(d, i) + ')';
        };

        var point = function(selection) {

            selection.each(function(data, index) {

                var filteredData = data.filter(base.defined);

                var g = dataJoin(this, filteredData);
                g.enter()
                    .attr('transform', containerTransform)
                    .append('path');

                g.attr('transform', containerTransform)
                    .select('path')
                    .attr('d', symbol);

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

        d3.rebind(point, base, 'xScale', 'xValue', 'yScale', 'yValue');
        d3.rebind(point, dataJoin, 'key');
        d3.rebind(point, symbol, 'size', 'type');

        return point;
    }

    function crosshair() {

        var event = d3.dispatch('trackingstart', 'trackingmove', 'trackingend'),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            snap = function(_x, _y) {
                return noSnap(xScale, yScale)(_x, _y);
            },
            decorate = noop;

        var x = function(d) { return d.x; },
            y = function(d) { return d.y; };

        var dataJoin = dataJoinUtil()
            .children(true)
            .selector('g.crosshair')
            .element('g')
            .attr('class', 'crosshair');

        var pointSeries = _point()
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
                    .on('wheel.crosshair', mousemove)
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

                var crosshairElement = dataJoin(container, data);

                crosshairElement.enter()
                    .style('pointer-events', 'none');

                var multi = _multi()
                    .series([horizontalLine, verticalLine, pointSeries])
                    .xScale(identityScale(xScale))
                    .yScale(identityScale(yScale))
                    .mapping(function() {
                        return [this];
                    });

                crosshairElement.call(multi);

                decorate(crosshairElement, data, index);
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

        crosshair.xScale = function(_x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = _x;
            return crosshair;
        };
        crosshair.yScale = function(_x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = _x;
            return crosshair;
        };
        crosshair.snap = function(_x) {
            if (!arguments.length) {
                return snap;
            }
            snap = _x;
            return crosshair;
        };
        crosshair.decorate = function(_x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = _x;
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
        container: _container,
        measure: measure
    };

    // Renders a box plot series as an SVG path based on the given array of datapoints.
    function boxPlot() {

        var value = function(d, i) { return d.value; },
            median = function(d, i) { return d.median; },
            upperQuartile = function(d, i) { return d.upperQuartile; },
            lowerQuartile = function(d, i) { return d.lowerQuartile; },
            high = function(d, i) { return d.high; },
            low = function(d, i) { return d.low; },
            orient = 'vertical',
            width = d3.functor(5),
            cap = d3.functor(0.5);

        var boxPlot = function(data) {

            return data.map(function(d, i) {
                // naming convention is for vertical orientation
                var _value = value(d, i),
                    _width = width(d, i),
                    halfWidth = _width / 2,
                    capWidth = _width * cap(d, i),
                    halfCapWidth = capWidth / 2,
                    _high = high(d, i),
                    _upperQuartile = upperQuartile(d, i),
                    _median = median(d, i),
                    _lowerQuartile = lowerQuartile(d, i),
                    _low = low(d, i),
                    highToUpperQuartile = _upperQuartile - _high,
                    upperQuartileToMedian = _median - _upperQuartile,
                    upperQuartileToLowerQuartile = _lowerQuartile - _upperQuartile,
                    medianToLowerQuartile = _lowerQuartile - _median,
                    lowerQuartileToLow = _low - _lowerQuartile;

                if (orient === 'vertical') {
                    // start top center
                    return 'M' + _value + ',' + _high +
                        'h' + (-halfCapWidth) +
                        'h' + capWidth +
                        'h' + (-halfCapWidth) +
                        'v' + highToUpperQuartile +
                        'h' + (-halfWidth) +
                        'v' + upperQuartileToLowerQuartile +
                        'h' + _width +
                        'v' + (-upperQuartileToLowerQuartile) +
                        'h' + (-halfWidth) +
                        'm' + (-halfWidth) + ',' + upperQuartileToMedian +
                        'h' + _width +
                        'm' + (-halfWidth) + ',' + medianToLowerQuartile +
                        'v' + lowerQuartileToLow +
                        'h' + (-halfCapWidth) +
                        'h' + capWidth +
                        'h' + (-halfCapWidth);
                } else {
                    // start middle left
                    return 'M' + _low + ',' + _value +
                        'v' + (-halfCapWidth) +
                        'v' + capWidth +
                        'v' + (-halfCapWidth) +
                        'h' + (-lowerQuartileToLow) +
                        'v' + (-halfWidth) +
                        'h' + (-upperQuartileToLowerQuartile) +
                        'v' + _width +
                        'h' + upperQuartileToLowerQuartile +
                        'v' + (-halfWidth) +
                        'm' + (-medianToLowerQuartile) + ',' + (-halfWidth) +
                        'v' + _width +
                        'm' + (-upperQuartileToMedian) + ',' + (-halfWidth) +
                        'h' + (-highToUpperQuartile) +
                        'v' + (-halfCapWidth) +
                        'v' + capWidth +
                        'v' + (-halfCapWidth);
                }
            })
            .join('');
        };

        boxPlot.value = function(_x) {
            if (!arguments.length) {
                return value;
            }
            value = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.median = function(_x) {
            if (!arguments.length) {
                return median;
            }
            median = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.upperQuartile = function(_x) {
            if (!arguments.length) {
                return upperQuartile;
            }
            upperQuartile = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.lowerQuartile = function(_x) {
            if (!arguments.length) {
                return lowerQuartile;
            }
            lowerQuartile = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.high = function(_x) {
            if (!arguments.length) {
                return high;
            }
            high = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.low = function(_x) {
            if (!arguments.length) {
                return low;
            }
            low = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(_x);
            return boxPlot;
        };
        boxPlot.orient = function(_x) {
            if (!arguments.length) {
                return orient;
            }
            orient = _x;
            return boxPlot;
        };
        boxPlot.cap = function(_x) {
            if (!arguments.length) {
                return cap;
            }
            cap = d3.functor(_x);
            return boxPlot;
        };

        return boxPlot;

    }

    // Renders an error bar series as an SVG path based on the given array of datapoints.
    function errorBar() {

        var value = function(d, i) { return d.x; },
            high = function(d, i) { return d.high; },
            low = function(d, i) { return d.low; },
            orient = 'vertical',
            width = d3.functor(5);

        var errorBar = function(data) {

            return data.map(function(d, i) {
                // naming convention is for vertical orientation
                var _value = value(d, i),
                    _width = width(d, i),
                    halfWidth = _width / 2,
                    _high = high(d, i),
                    _low = low(d, i),
                    height = _high - _low;

                if (orient === 'vertical') {
                    // start top center
                    return 'M' + _value + ',' + _high +
                        'h' + (-halfWidth) +
                        'h' + _width +
                        'h' + (-halfWidth) +
                        'v' + (-height) +
                        'h' + (-halfWidth) +
                        'h' + _width +
                        'h' + (-halfWidth);
                } else {
                    // start middle left
                    return 'M' + _low + ',' + _value +
                        'v' + (-halfWidth) +
                        'v' + _width +
                        'v' + (-halfWidth) +
                        'h' + height +
                        'v' + (-halfWidth) +
                        'v' + _width +
                        'v' + (-halfWidth);
                }
            })
            .join('');
        };

        errorBar.value = function(_x) {
            if (!arguments.length) {
                return value;
            }
            value = d3.functor(_x);
            return errorBar;
        };
        errorBar.high = function(_x) {
            if (!arguments.length) {
                return high;
            }
            high = d3.functor(_x);
            return errorBar;
        };
        errorBar.low = function(_x) {
            if (!arguments.length) {
                return low;
            }
            low = d3.functor(_x);
            return errorBar;
        };
        errorBar.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(_x);
            return errorBar;
        };
        errorBar.orient = function(_x) {
            if (!arguments.length) {
                return orient;
            }
            orient = _x;
            return errorBar;
        };

        return errorBar;

    }

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
            x = d3.functor(_x);
            return ohlc;
        };
        ohlc.open = function(_x) {
            if (!arguments.length) {
                return open;
            }
            open = d3.functor(_x);
            return ohlc;
        };
        ohlc.high = function(_x) {
            if (!arguments.length) {
                return high;
            }
            high = d3.functor(_x);
            return ohlc;
        };
        ohlc.low = function(_x) {
            if (!arguments.length) {
                return low;
            }
            low = d3.functor(_x);
            return ohlc;
        };
        ohlc.close = function(_x) {
            if (!arguments.length) {
                return close;
            }
            close = d3.functor(_x);
            return ohlc;
        };
        ohlc.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(_x);
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
            x = d3.functor(_x);
            return candlestick;
        };
        candlestick.open = function(_x) {
            if (!arguments.length) {
                return open;
            }
            open = d3.functor(_x);
            return candlestick;
        };
        candlestick.high = function(_x) {
            if (!arguments.length) {
                return high;
            }
            high = d3.functor(_x);
            return candlestick;
        };
        candlestick.low = function(_x) {
            if (!arguments.length) {
                return low;
            }
            low = d3.functor(_x);
            return candlestick;
        };
        candlestick.close = function(_x) {
            if (!arguments.length) {
                return close;
            }
            close = d3.functor(_x);
            return candlestick;
        };
        candlestick.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(_x);
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
            horizontalAlign = 'center',
            verticalAlign = 'center',
            height = function(d, i) { return d.height; },
            width = d3.functor(3);

        var bar = function(data, index) {

            return data.map(function(d, i) {
                var xValue = x.call(this, d, index || i),
                    yValue = y.call(this, d, index || i),
                    barHeight = height.call(this, d, index || i),
                    barWidth = width.call(this, d, index || i);

                var horizontalOffset;
                switch (horizontalAlign) {
                case 'left':
                    horizontalOffset = barWidth;
                    break;
                case 'right':
                    horizontalOffset = 0;
                    break;
                case 'center':
                    horizontalOffset = barWidth / 2;
                    break;
                default:
                    throw new Error('Invalid horizontal alignment ' + horizontalAlign);
                }

                var verticalOffset;
                switch (verticalAlign) {
                case 'bottom':
                    verticalOffset = -barHeight;
                    break;
                case 'top':
                    verticalOffset = 0;
                    break;
                case 'center':
                    verticalOffset = barHeight / 2;
                    break;
                default:
                    throw new Error('Invalid vertical alignment ' + verticalAlign);
                }

                // Move to the start location
                var body = 'M' + (xValue - horizontalOffset) + ',' + (yValue - verticalOffset) +
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
        bar.y = function(_x) {
            if (!arguments.length) {
                return y;
            }
            y = d3.functor(_x);
            return bar;
        };
        bar.width = function(_x) {
            if (!arguments.length) {
                return width;
            }
            width = d3.functor(_x);
            return bar;
        };
        bar.horizontalAlign = function(_x) {
            if (!arguments.length) {
                return horizontalAlign;
            }
            horizontalAlign = _x;
            return bar;
        };
        bar.height = function(_x) {
            if (!arguments.length) {
                return height;
            }
            height = d3.functor(_x);
            return bar;
        };
        bar.verticalAlign = function(_x) {
            if (!arguments.length) {
                return verticalAlign;
            }
            verticalAlign = _x;
            return bar;
        };
        return bar;

    }

    function _ticks() {

        var scale = d3.scale.identity(),
            tickArguments = [10],
            tickValues = null;

        function tryApply(fn, defaultVal) {
            return scale[fn] ? scale[fn].apply(scale, tickArguments) : defaultVal;
        }

        var ticks = function() {
            return tickValues == null ? tryApply('ticks', scale.domain()) : tickValues;
        };

        ticks.scale = function(x) {
            if (!arguments.length) {
                return scale;
            }
            scale = x;
            return ticks;
        };

        ticks.ticks = function(x) {
            if (!arguments.length) {
                return tickArguments;
            }
            tickArguments = arguments;
            return ticks;
        };

        ticks.tickValues = function(x) {
            if (!arguments.length) {
                return tickValues;
            }
            tickValues = x;
            return ticks;
        };

        return ticks;
    }

    // A drop-in replacement for the D3 axis, supporting the decorate pattern.
    function axis() {

        var decorate = noop,
            orient = 'bottom',
            tickFormat = null,
            outerTickSize = 6,
            innerTickSize = 6,
            tickPadding = 3,
            svgDomainLine = d3.svg.line(),
            ticks = _ticks();

        var dataJoin = dataJoinUtil()
            .selector('g.tick')
            .element('g')
            .key(identity)
            .attr('class', 'tick');

        var domainPathDataJoin = dataJoinUtil()
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
            var scale = ticks.scale();
            return scale[fn] ? scale[fn].apply(scale, ticks.ticks()) : defaultVal;
        }

        var axis = function(selection) {

            selection.each(function(data, index) {

                var scale = ticks.scale();

                // Stash a snapshot of the new scale, and retrieve the old snapshot.
                var scaleOld = this.__chart__ || scale;
                this.__chart__ = scale.copy();

                var ticksArray = ticks();
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
                dataJoin.attr({
                    // set the initial tick position based on the previous scale
                    // in order to get the correct enter transition - however, for ordinal
                    // scales the tick will not exist on the old scale, so use the current position
                    'transform': containerTranslate(isOrdinal(scale) ? scale : scaleOld, translate)
                });

                var g = dataJoin(container, ticksArray);

                // enter
                g.enter().append('path');

                var labelOffset = sign * (innerTickSize + tickPadding);
                g.enter()
                    .append('text')
                    .attr('transform', translate(0, labelOffset));

                // update
                g.attr('class', 'tick orient-' + orient);

                g.attr('transform', containerTranslate(scale, translate));

                g.select('path')
                    .attr('d', function(d) {
                        return svgDomainLine(pathTranspose([
                            [0, 0], [0, sign * innerTickSize]
                        ]));
                    });

                g.select('text')
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

        rebindAll(axis, ticks);

        return axis;
    }

    var svg = {
        axis: axis,
        bar: bar,
        candlestick: candlestick,
        ohlc: ohlc,
        errorBar: errorBar,
        boxPlot: boxPlot
    };

    function waterfall() {

        var xValueKey = '',
            yValue = function(d) { return d.y; },
            startsWithTotal = false,
            totals = function(d, i, data) {
                if (i === data.length - 1) {
                    return 'Final';
                }
            },
            directions = {
                up: 'up',
                down: 'down',
                unchanged: 'unchanged'
            };

        var waterfall = function(data) {
            var length = data.length,
                i = 0,
                previousEnd = 0,
                start,
                end,
                total,
                result = [],
                finalIndex = length - 1;

            if (startsWithTotal) {
                // First value is a total
                previousEnd = yValue(data[0]);
                result.push({
                    x: data[0][xValueKey],
                    y0: 0,
                    y1: previousEnd,
                    direction: directions.unchanged
                });
                i = 1;
            }

            for (i; i < length; i += 1) {
                start = previousEnd;
                end = yValue(data[i]) + previousEnd;

                result.push({
                    x: data[i][xValueKey],
                    y0: start,
                    y1: end,
                    direction: end - start > 0 ? directions.up : directions.down
                });

                total = totals(data[i], i, data);
                if (total) {
                    // Insert a total value here
                    result.push({
                        x: total,
                        y0: 0,
                        y1: end,
                        direction: directions.unchanged
                    });
                }

                previousEnd = end;
            }

            return result;
        };

        waterfall.xValueKey = function(x) {
            if (!arguments.length) {
                return xValueKey;
            }
            xValueKey = x;
            return waterfall;
        };

        waterfall.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return waterfall;
        };

        waterfall.total = function(x) {
            if (!arguments.length) {
                return totals;
            }
            totals = x;
            return waterfall;
        };

        waterfall.startsWithTotal = function(x) {
            if (!arguments.length) {
                return startsWithTotal;
            }
            startsWithTotal = x;
            return waterfall;
        };

        return waterfall;
    }

    var algorithm = {
        waterfall: waterfall
    };

    // The bar series renders a vertical (column) or horizontal (bar) series. In order
    // to provide a common implementation there are a number of functions that specialise
    // the rendering logic based on the 'orient' property.
    function barUtil() {

        var decorate = noop,
            barWidth = fractionalBarWidth(0.75),
            orient = 'vertical',
            pathGenerator = bar();

        var base = xyBase()
          .xValue(function(d, i) { return orient === 'vertical' ? d.date : d.close; })
          .yValue(function(d, i) { return orient === 'vertical' ? d.close : d.date; });

        var dataJoin = dataJoinUtil()
            .selector('g.bar')
            .element('g');

        function containerTranslation(d, i) {
            if (orient === 'vertical') {
                return 'translate(' + base.x1(d, i) + ', ' + base.y0(d, i) + ')';
            } else {
                return 'translate(' + base.x0(d, i) + ', ' + base.y1(d, i) + ')';
            }
        }

        function barHeight(d, i) {
            if (orient === 'vertical') {
                return base.y1(d, i) - base.y0(d, i);
            } else {
                return base.x1(d, i) - base.x0(d, i);
            }
        }

        function valueAxisDimension(generator) {
            if (orient === 'vertical') {
                return generator.height;
            } else {
                return generator.width;
            }
        }

        function crossAxisDimension(generator) {
            if (orient === 'vertical') {
                return generator.width;
            } else {
                return generator.height;
            }
        }

        function crossAxisValueFunction() {
            return orient === 'vertical' ? base.x : base.y;
        }

        var bar$$ = function(selection) {
            selection.each(function(data, index) {

                if (orient !== 'vertical' && orient !== 'horizontal') {
                    throw new Error('The bar series does not support an orientation of ' + orient);
                }

                dataJoin.attr('class', 'bar ' + orient);

                var filteredData = data.filter(base.defined);

                pathGenerator.x(0)
                    .y(0)
                    .width(0)
                    .height(0);

                if (orient === 'vertical') {
                    pathGenerator.verticalAlign('top');
                } else {
                    pathGenerator.horizontalAlign('right');
                }

                // set the width of the bars
                var width = barWidth(filteredData.map(crossAxisValueFunction()));
                crossAxisDimension(pathGenerator)(width);

                var g = dataJoin(this, filteredData);

                // within the enter selection the pathGenerator creates a zero
                // height bar. As a result, when used with a transition the bar grows
                // from y0 to y1 (y)
                g.enter()
                    .attr('transform', containerTranslation)
                    .append('path')
                    .attr('d', function(d) { return pathGenerator([d]); });

                // set the bar to its correct height
                valueAxisDimension(pathGenerator)(barHeight);

                g.attr('transform', containerTranslation)
                    .select('path')
                    .attr('d', function(d) { return pathGenerator([d]); });

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
        bar$$.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return bar$$;
        };
        bar$$.orient = function(x) {
            if (!arguments.length) {
                return orient;
            }
            orient = x;
            return bar$$;
        };

        d3.rebind(bar$$, base, 'xScale', 'xValue', 'x1Value', 'x0Value', 'yScale', 'yValue', 'y1Value', 'y0Value');
        d3.rebind(bar$$, dataJoin, 'key');

        return bar$$;
    }

    function _waterfall() {

        function isVertical() {
            return bar.orient() === 'vertical';
        }

        var bar = barUtil();

        var waterfall = function(selection) {
            bar
                .xValue(function(d, i) { return isVertical() ? d.x : d.y1; })
                .yValue(function(d, i) { return isVertical() ? d.y1 : d.x; })
                .x0Value(function(d, i) { return isVertical() ? 0 : d.y0; })
                .y0Value(function(d, i) { return isVertical() ? d.y0 : 0; })
                .decorate(function(g, d1, i) {
                    g.enter()
                        .attr('class', 'waterfall ' + bar.orient())
                        .classed('up', function(d) { return d.direction === 'up'; })
                        .classed('down', function(d) { return d.direction === 'down'; });
                });

            bar(selection);
        };

        rebindAll(waterfall, bar);

        return waterfall;
    }

    function _boxPlot() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            upperQuartile = function(d, i) { return (d.close + d.high) / 2; },
            lowerQuartile = function(d, i) { return (d.close + d.low) / 2; },
            high = function(d, i) { return d.high; },
            low = function(d, i) { return d.low; },
            value = function(d, i) { return d.date; },
            median = function(d, i) { return d.close; },
            orient = 'vertical',
            barWidth = fractionalBarWidth(0.5),
            decorate = noop;

        var dataJoin = dataJoinUtil()
            .selector('g.box-plot')
            .element('g')
            .attr('class', 'box-plot');

        var pathGenerator = boxPlot()
            .value(0);

        var boxPlot$$ = function(selection) {
            selection.each(function(data, index) {

                var filteredData = data.filter(defined(low, high, lowerQuartile, upperQuartile, value, median));

                var g = dataJoin(this, filteredData);

                g.enter()
                    .append('path');

                var scale = (orient === 'vertical') ? xScale : yScale;
                var width = barWidth(filteredData.map(function(d, i) {
                    return scale(value(d, i));
                }));

                pathGenerator.orient(orient)
                    .width(width);

                g.each(function(d, i) {
                    var origin, _median, _upperQuartile, _lowerQuartile, _high, _low;

                    if (orient === 'vertical') {
                        var y = yScale(high(d, i));
                        origin = xScale(value(d, i)) + ',' + y;
                        _high = 0;
                        _upperQuartile = yScale(upperQuartile(d, i)) - y;
                        _median = yScale(median(d, i)) - y;
                        _lowerQuartile = yScale(lowerQuartile(d, i)) - y;
                        _low = yScale(low(d, i)) - y;
                    } else {
                        var x = xScale(low(d, i));
                        origin = x + ',' + yScale(value(d, i));
                        _high = xScale(high(d, i)) - x;
                        _upperQuartile = xScale(upperQuartile(d, i)) - x;
                        _median = xScale(median(d, i)) - x;
                        _lowerQuartile = xScale(lowerQuartile(d, i)) - x;
                        _low = 0;
                    }

                    pathGenerator.median(_median)
                        .upperQuartile(_upperQuartile)
                        .lowerQuartile(_lowerQuartile)
                        .high(_high)
                        .low(_low);

                    d3.select(this)
                        .attr('transform', 'translate(' + origin + ')')
                        .select('path')
                        .attr('d', pathGenerator([d]));
                });

                decorate(g, data, index);
            });
        };

        boxPlot$$.orient = function(x) {
            if (!arguments.length) {
                return orient;
            }
            orient = x;
            return boxPlot$$;
        };
        boxPlot$$.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return boxPlot$$;
        };
        boxPlot$$.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return boxPlot$$;
        };
        boxPlot$$.lowerQuartile = function(x) {
            if (!arguments.length) {
                return lowerQuartile;
            }
            lowerQuartile = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.upperQuartile = function(x) {
            if (!arguments.length) {
                return upperQuartile;
            }
            upperQuartile = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.low = function(x) {
            if (!arguments.length) {
                return low;
            }
            low = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.high = function(x) {
            if (!arguments.length) {
                return high;
            }
            high = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.median = function(x) {
            if (!arguments.length) {
                return median;
            }
            median = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return boxPlot$$;
        };
        boxPlot$$.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return boxPlot$$;
        };

        d3.rebind(boxPlot$$, dataJoin, 'key');
        d3.rebind(boxPlot$$, pathGenerator, 'cap');

        return boxPlot$$;
    }

    function _errorBar() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            high = function(d, i) { return d.high; },
            low = function(d, i) { return d.low; },
            value = function(d, i) { return d.date; },
            orient = 'vertical',
            barWidth = fractionalBarWidth(0.5),
            decorate = noop;

        var dataJoin = dataJoinUtil()
            .selector('g.errorBar')
            .element('g')
            .attr('class', 'errorBar');

        var pathGenerator = errorBar()
            .value(0);

        var errorBar$$ = function(selection) {
            selection.each(function(data, index) {

                var filteredData = data.filter(defined(low, high, value, value));

                var g = dataJoin(this, filteredData);

                g.enter()
                    .append('path');

                var scale = (orient === 'vertical') ? xScale : yScale;
                var width = barWidth(filteredData.map(function(d, i) {
                    return scale(value(d, i));
                }));

                pathGenerator.orient(orient)
                    .width(width);

                g.each(function(d, i) {
                    var origin, _high, _low;
                    if (orient === 'vertical') {
                        var y = yScale(high(d, i));
                        origin = xScale(value(d, i)) + ',' + y;
                        _high = 0;
                        _low = yScale(low(d, i)) - y;
                    } else {
                        var x = xScale(low(d, i));
                        origin = x + ',' + yScale(value(d, i));
                        _high = xScale(high(d, i)) - x;
                        _low = 0;
                    }

                    pathGenerator.high(_high)
                        .low(_low);

                    d3.select(this)
                        .attr('transform', 'translate(' + origin + ')')
                        .select('path')
                        .attr('d', pathGenerator([d]));
                });

                decorate(g, data, index);
            });
        };

        errorBar$$.orient = function(x) {
            if (!arguments.length) {
                return orient;
            }
            orient = x;
            return errorBar$$;
        };
        errorBar$$.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return errorBar$$;
        };
        errorBar$$.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return errorBar$$;
        };
        errorBar$$.low = function(x) {
            if (!arguments.length) {
                return low;
            }
            low = d3.functor(x);
            return errorBar$$;
        };
        errorBar$$.high = function(x) {
            if (!arguments.length) {
                return high;
            }
            high = d3.functor(x);
            return errorBar$$;
        };
        errorBar$$.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = d3.functor(x);
            return errorBar$$;
        };
        errorBar$$.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return errorBar$$;
        };
        errorBar$$.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return errorBar$$;
        };

        d3.rebind(errorBar$$, dataJoin, 'key');

        return errorBar$$;
    }

    function ohlcBase() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            xValue = function(d, i) { return d.date; },
            yOpenValue = function(d, i) { return d.open; },
            yHighValue = function(d, i) { return d.high; },
            yLowValue = function(d, i) { return d.low; },
            yCloseValue = function(d, i) { return d.close; },
            barWidth = fractionalBarWidth(0.75),
            xValueScaled = function(d, i) {
                return xScale(xValue(d, i));
            };

        function base() { }

        base.width = function(data) {
            return barWidth(data.map(xValueScaled));
        };

        base.defined = function(d, i) {
            return defined(xValue, yOpenValue, yLowValue, yHighValue, yCloseValue)(d, i);
        };

        base.values = function(d, i) {
            var yCloseRaw = yCloseValue(d, i),
                yOpenRaw = yOpenValue(d, i);

            var direction = '';
            if (yCloseRaw > yOpenRaw) {
                direction = 'up';
            } else if (yCloseRaw < yOpenRaw) {
                direction = 'down';
            }

            return {
                x: xValueScaled(d, i),
                yOpen: yScale(yOpenRaw),
                yHigh: yScale(yHighValue(d, i)),
                yLow: yScale(yLowValue(d, i)),
                yClose: yScale(yCloseRaw),
                direction: direction
            };
        };

        base.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return base;
        };
        base.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return base;
        };
        base.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return base;
        };
        base.yOpenValue = function(x) {
            if (!arguments.length) {
                return yOpenValue;
            }
            yOpenValue = x;
            return base;
        };
        base.yHighValue = function(x) {
            if (!arguments.length) {
                return yHighValue;
            }
            yHighValue = x;
            return base;
        };
        base.yLowValue = function(x) {
            if (!arguments.length) {
                return yLowValue;
            }
            yLowValue = x;
            return base;
        };
        base.yValue = base.yCloseValue = function(x) {
            if (!arguments.length) {
                return yCloseValue;
            }
            yCloseValue = x;
            return base;
        };
        base.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = d3.functor(x);
            return base;
        };

        return base;
    }

    function groupedBar() {

        var bar = barUtil(),
            barWidth = fractionalBarWidth(0.75),
            decorate = noop,
            xScale = d3.scale.linear(),
            offsetScale = d3.scale.linear(),
            values = function(d) { return d.values; };

        var dataJoin = dataJoinUtil()
            .selector('g.stacked')
            .element('g')
            .attr('class', 'stacked');

        var x = function(d, i) { return xScale(bar.xValue()(d, i)); };

        var groupedBar = function(selection) {
            selection.each(function(data) {

                var width = barWidth(values(data[0]).map(x));
                var subBarWidth = width / (data.length - 1);
                bar.barWidth(subBarWidth);

                var halfWidth = width / 2;
                offsetScale.domain([0, data.length - 1])
                    .range([-halfWidth, halfWidth]);

                var g = dataJoin(this, data);

                g.enter().append('g');

                g.select('g')
                    .datum(values)
                    .each(function(series, index) {
                        var container = d3.select(this);

                        // create a composite scale that applies the required offset
                        var compositeScale = function(_x) {
                            return xScale(_x) + offsetScale(index);
                        };
                        bar.xScale(compositeScale);

                        // adapt the decorate function to give each series the correct index
                        bar.decorate(function(s, d) {
                            decorate(s, d, index);
                        });

                        container.call(bar);
                    });
            });
        };

        groupedBar.decorate = function(_x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = _x;
            return groupedBar;
        };
        groupedBar.xScale = function(_x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = _x;
            return groupedBar;
        };
        groupedBar.values = function(_x) {
            if (!arguments.length) {
                return values;
            }
            values = _x;
            return groupedBar;
        };

        d3.rebind(groupedBar, bar, 'yValue', 'xValue', 'yScale');

        return groupedBar;
    }

    function _stack() {

        var series = noop,
            values = function(d) { return d.values; };

        var stack = function(selection) {

            selection.each(function(data) {

                var container = d3.select(this);

                var dataJoin = dataJoinUtil()
                    .selector('g.stacked')
                    .element('g')
                    .attr('class', 'stacked');

                var g = dataJoin(container, data);

                g.enter().append('g');
                g.select('g')
                    .datum(values)
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
        stack.values = function(x) {
            if (!arguments.length) {
                return values;
            }
            values = x;
            return stack;
        };

        return stack;
    }

    function _line() {

        var decorate = noop;

        var base = xyBase();

        var lineData = d3.svg.line()
            .defined(base.defined)
            .x(base.x)
            .y(base.y);

        var dataJoin = dataJoinUtil()
            .selector('path.line')
            .element('path')
            .attr('class', 'line');

        var line = function(selection) {

            selection.each(function(data, index) {

                var path = dataJoin(this, [data]);
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

        d3.rebind(line, base, 'xScale', 'xValue', 'yScale', 'yValue');
        d3.rebind(line, dataJoin, 'key');
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

        rebindAll(stackedLine, line);

        return stackedLine;
    }

    function _bar() {

        var bar = barUtil()
            .yValue(function(d) { return d.y0 + d.y; })
            .y0Value(function(d) { return d.y0; });

        var stack = _stack()
            .series(bar);

        var stackedBar = function(selection) {
            selection.call(stack);
        };

        rebindAll(stackedBar, bar);

        return stackedBar;
    }

    function _area() {

        var decorate = noop;

        var base = xyBase();

        var areaData = d3.svg.area()
            .defined(base.defined)
            .x(base.x)
            .y0(base.y0)
            .y1(base.y1);

        var dataJoin = dataJoinUtil()
            .selector('path.area')
            .element('path')
            .attr('class', 'area');

        var area = function(selection) {

            selection.each(function(data, index) {

                var path = dataJoin(this, [data]);
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

        d3.rebind(area, base, 'xScale', 'xValue', 'yScale', 'yValue', 'y1Value', 'y0Value');
        d3.rebind(area, dataJoin, 'key');
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

        rebindAll(stackedArea, area);

        return stackedArea;
    }

    var stacked = {
        area: area,
        bar: _bar,
        stack: _stack,
        line: __line
    };

    function _ohlc(drawMethod) {

        var decorate = noop,
            base = ohlcBase();

        var dataJoin = dataJoinUtil()
            .selector('g.ohlc')
            .element('g')
            .attr('class', 'ohlc');

        function containerTranslation(values) {
            return 'translate(' + values.x + ', ' + values.yHigh + ')';
        }

        var ohlc$$ = function(selection) {
            selection.each(function(data, index) {

                var filteredData = data.filter(base.defined);

                var g = dataJoin(this, filteredData);

                g.enter()
                    .attr('transform', function(d, i) {
                        return containerTranslation(base.values(d, i)) + ' scale(1e-6, 1)';
                    })
                    .append('path');

                var pathGenerator = ohlc()
                        .width(base.width(filteredData));

                g.each(function(d, i) {
                    var values = base.values(d, i);

                    var graph = d3.transition(d3.select(this))
                        .attr({
                            'class': 'ohlc ' + values.direction,
                            'transform': function() { return containerTranslation(values) + ' scale(1)'; }
                        });

                    pathGenerator.x(d3.functor(0))
                        .open(function() { return values.yOpen - values.yHigh; })
                        .high(function() { return values.yHigh - values.yHigh; })
                        .low(function() { return values.yLow - values.yHigh; })
                        .close(function() { return values.yClose - values.yHigh; });

                    graph.select('path')
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

        d3.rebind(ohlc$$, dataJoin, 'key');
        rebindAll(ohlc$$, base);

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

        var dataJoin = dataJoinUtil()
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

                var g = dataJoin(this, xValues);

                g.each(function(d, i) {

                    var graph = d3.select(this);

                    graph.attr('transform', 'translate(' + xScale(d) + ', 0)');

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

        d3.rebind(cycle, dataJoin, 'key');

        return cycle;

    }

    function _candlestick() {

        var decorate = noop,
            base = ohlcBase();

        var dataJoin = dataJoinUtil()
            .selector('g.candlestick')
            .element('g')
            .attr('class', 'candlestick');

        function containerTranslation(values) {
            return 'translate(' + values.x + ', ' + values.yHigh + ')';
        }

        var candlestick$$ = function(selection) {

            selection.each(function(data, index) {

                var filteredData = data.filter(base.defined);

                var g = dataJoin(this, filteredData);

                g.enter()
                    .attr('transform', function(d, i) {
                        return containerTranslation(base.values(d, i)) + ' scale(1e-6, 1)';
                    })
                    .append('path');

                var pathGenerator = candlestick()
                        .width(base.width(filteredData));

                g.each(function(d, i) {

                    var values = base.values(d, i);

                    var graph = d3.transition(d3.select(this))
                        .attr({
                            'class': 'candlestick ' + values.direction,
                            'transform': function() { return containerTranslation(values) + ' scale(1)'; }
                        });

                    pathGenerator.x(d3.functor(0))
                        .open(function() { return values.yOpen - values.yHigh; })
                        .high(function() { return values.yHigh - values.yHigh; })
                        .low(function() { return values.yLow - values.yHigh; })
                        .close(function() { return values.yClose - values.yHigh; });

                    graph.select('path')
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

        d3.rebind(candlestick$$, dataJoin, 'key');
        rebindAll(candlestick$$, base);

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

        var dataJoin = dataJoinUtil()
            .selector('g.axis-adapter')
            .element('g')
            .attr({'class': 'axis axis-adapter'});

        var axisAdapter = function(selection) {

            selection.each(function(data, index) {

                var g = dataJoin(this, [data]);

                var translation;
                switch (axisAdapter.orient()) {
                case 'top':
                case 'bottom':
                    translation = 'translate(0,' + yScale(baseline(data)) + ')';
                    axis$$.scale(xScale);
                    break;

                case 'left':
                case 'right':
                    translation = 'translate(' + xScale(baseline(data)) + ',0)';
                    axis$$.scale(yScale);
                    break;

                default:
                    throw new Error('Invalid orientation');
                }

                g.enter().attr('transform', translation);
                g.attr('transform', translation);

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
        bar: barUtil,
        candlestick: _candlestick,
        cycle: cycle,
        line: _line,
        multi: _multi,
        ohlc: _ohlc,
        point: _point,
        stacked: stacked,
        groupedBar: groupedBar,
        xyBase: xyBase,
        ohlcBase: ohlcBase,
        errorBar: _errorBar,
        boxPlot: _boxPlot,
        waterfall: _waterfall,
        algorithm: algorithm
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

    function _skipWeekends() {
        var millisPerDay = 24 * 3600 * 1000;
        var millisPerWorkWeek = millisPerDay * 5;
        var millisPerWeek = millisPerDay * 7;

        var skipWeekends = {};

        function isWeekend(date) {
            return date.getDay() === 0 || date.getDay() === 6;
        }

        skipWeekends.clampDown = function(date) {
            if (date && isWeekend(date)) {
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
            if (date && isWeekend(date)) {
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
            skipWeekends: _skipWeekends
        },
        dateTime: exportedScale
    };

    function elderRay() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            xValue = function(d) { return d.date; },
            root = function(d) { return d.elderRay; },
            bullBar = barUtil(),
            bearBar = barUtil(),
            bullBarTop = barUtil(),
            bearBarTop = barUtil(),
            multi = _multi(),
            decorate = noop;

        var elderRay = function(selection) {

            function isTop(input, comparison) {
                // The values share parity and the input is smaller than the comparison
                return (input * comparison > 0 && Math.abs(input) < Math.abs(comparison));
            }

            bullBar
                .xValue(xValue)
                .yValue(function(d, i) {
                    return isTop(root(d).bullPower, root(d).bearPower) ? undefined : root(d).bullPower;
                });

            bearBar
                .xValue(xValue)
                .yValue(function(d, i) {
                    return isTop(root(d).bearPower, root(d).bullPower) ? undefined : root(d).bearPower;
                });

            bullBarTop
                .xValue(xValue)
                .yValue(function(d, i) {
                    return isTop(root(d).bullPower, root(d).bearPower) ? root(d).bullPower : undefined;
                });

            bearBarTop
                .xValue(xValue)
                .yValue(function(d, i) {
                    return isTop(root(d).bearPower, root(d).bullPower) ? root(d).bearPower : undefined;
                });

            multi
                .xScale(xScale)
                .yScale(yScale)
                .series([bullBar, bearBar, bullBarTop, bearBarTop])
                .decorate(function(g, data, index) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi ' + ['bull', 'bear', 'bull top', 'bear top'][i];
                        });
                    decorate(g, data, index);
                });

            selection.call(multi);
        };

        elderRay.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return elderRay;
        };
        elderRay.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return elderRay;
        };
        elderRay.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return elderRay;
        };
        elderRay.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return elderRay;
        };

        return elderRay;
    }

    function envelope() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            yValue = function(d, i) { return d.close; },
            xValue = function(d, i) { return d.date; },
            root = function(d) { return d.envelope; },
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

        var lowerLine = _line()
            .yValue(function(d, i) {
                return root(d).lower;
            });

        var envelope = function(selection) {

            var multi = _multi()
                .xScale(xScale)
                .yScale(yScale)
                .series([area, upperLine, lowerLine])
                .decorate(function(g, data, index) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi envelope ' + ['area', 'upper', 'lower'][i];
                        });
                    decorate(g, data, index);
                });

            area.xValue(xValue);
            upperLine.xValue(xValue);
            lowerLine.xValue(xValue);

            selection.call(multi);
        };

        envelope.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return envelope;
        };
        envelope.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return envelope;
        };
        envelope.xValue = function(x) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = x;
            return envelope;
        };
        envelope.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return envelope;
        };
        envelope.root = function(x) {
            if (!arguments.length) {
                return root;
            }
            root = x;
            return envelope;
        };
        envelope.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return envelope;
        };

        return envelope;
    }

    function forceIndex() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            multiSeries = _multi(),
            decorate = noop;

        var annotations = line();

        var forceLine = _line()
            .yValue(function(d, i) {
                return d.force;
            });

        var force = function(selection) {

            multiSeries.xScale(xScale)
                .yScale(yScale)
                .series([annotations, forceLine])
                .mapping(function(series) {
                    if (series === annotations) {
                        return [
                            0
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

        force.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            annotations.xScale(x);
            return force;
        };
        force.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            annotations.yScale(x);
            return force;
        };
        force.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return force;
        };

        d3.rebind(force, forceLine, 'yValue', 'xValue');

        return force;
    }

    function stochasticOscillator() {

        var xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            upperValue = 80,
            lowerValue = 20,
            multi = _multi(),
            decorate = noop;

        var annotations = line();
        var dLine = _line()
            .yValue(function(d, i) {
                return d.stochastic.d;
            });

        var kLine = _line()
            .yValue(function(d, i) {
                return d.stochastic.k;
            });

        var stochastic = function(selection) {

            multi.xScale(xScale)
                .yScale(yScale)
                .series([annotations, dLine, kLine])
                .mapping(function(series) {
                    if (series === annotations) {
                        return [
                            upperValue,
                            lowerValue
                        ];
                    }
                    return this;
                })
                .decorate(function(g, data, index) {
                    g.enter()
                        .attr('class', function(d, i) {
                            return 'multi stochastic ' + ['annotations', 'stochastic-d', 'stochastic-k'][i];
                        });
                    decorate(g, data, index);
                });

            selection.call(multi);
        };

        stochastic.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return stochastic;
        };
        stochastic.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return stochastic;
        };
        stochastic.upperValue = function(x) {
            if (!arguments.length) {
                return upperValue;
            }
            upperValue = x;
            return stochastic;
        };
        stochastic.lowerValue = function(x) {
            if (!arguments.length) {
                return lowerValue;
            }
            lowerValue = x;
            return stochastic;
        };
        stochastic.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return stochastic;
        };

        d3.rebind(stochastic, dLine, 'yDValue', 'xDValue');

        d3.rebind(stochastic, kLine, 'yKValue', 'xKValue');

        return stochastic;
    }

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
                            return 'multi rsi ' + ['annotations', 'indicator'][i];
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
            divergenceBar = barUtil(),
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
                            return 'multi ' + ['macd-divergence', 'macd', 'macd-signal'][i];
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
                            return 'multi bollinger ' + ['area', 'upper', 'lower', 'average'][i];
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
        relativeStrengthIndex: relativeStrengthIndex,
        stochasticOscillator: stochasticOscillator,
        forceIndex: forceIndex,
        envelope: envelope,
        elderRay: elderRay
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

    function _calculator() {

        var value = identity;

        var highValue = function(d, i) { return d.high; },
            lowValue = function(d, i) { return d.low; };

        var emaComputer = exponentialMovingAverage()
            .windowSize(13);

        var elderRay = function(data) {

            emaComputer.value(value);
            var ema = emaComputer(data);

            var indicator = d3.zip(data, ema)
                .map(function(d) {
                    return {
                        bullPower: d[1] ? highValue(d[0]) - d[1] : undefined,
                        bearPower: d[1] ? lowValue(d[0]) - d[1] : undefined
                    };
                });

            return indicator;
        };

        elderRay.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = x;
            return elderRay;
        };

        elderRay.highValue = function(x) {
            if (!arguments.length) {
                return highValue;
            }
            highValue = x;
            return elderRay;
        };
        elderRay.lowValue = function(x) {
            if (!arguments.length) {
                return highValue;
            }
            lowValue = x;
            return elderRay;
        };

        rebind(elderRay, emaComputer, {
            period: 'windowSize'
        });

        return elderRay;
    }

    function _elderRay() {

        var elderRayAlgorithm = _calculator()
            .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(elderRayAlgorithm)
                .merge(function(datum, indicator) { datum.elderRay = indicator; });

        var elderRay = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(elderRay, mergedAlgorithm, 'merge');
        d3.rebind(elderRay, elderRayAlgorithm, 'highValue', 'lowValue', 'period', 'value');

        return elderRay;
    }

    // Indicator algorithms are not designed to accomodate leading 'undefined' value.
    // This adapter adds that functionality by adding a corresponding number
    // of 'undefined' values to the output.
    function undefinedInputAdapter() {

        var algorithm = calculator()
            .accumulator(d3.mean);
        var undefinedValue = d3.functor(undefined),
            defined = function(value) {
                return algorithm.value()(value) == null;
            };

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

    function envelopeCalculator() {

        var factor = 0.1,
            value = identity;

        var envelope = function(data) {
            return data.map(function(s) {
                return {
                    lower: value(s) * (1.0 - factor),
                    upper: value(s) * (1.0 + factor)
                };
            });
        };

        envelope.factor = function(x) {
            if (!arguments.length) {
                return factor;
            }
            factor = x;
            return envelope;
        };

        envelope.value = function(x) {
            if (!arguments.length) {
                return value;
            }
            value = d3.functor(x);
            return envelope;
        };

        return envelope;
    }

    function _envelope() {

        var envelopeAlgorithm = envelopeCalculator();

        var adaptedEnvelope = undefinedInputAdapter()
            .undefinedValue({
                lower: undefined,
                upper: undefined
            })
            .algorithm(envelopeAlgorithm);

        var mergedAlgorithm = merge()
                .algorithm(adaptedEnvelope)
                .merge(function(datum, env) { datum.envelope = env; });

        var envelope = function(data) {
            return mergedAlgorithm(data);
        };

        envelope.root = function(d) {
            return d.envelope;
        };

        d3.rebind(envelope, mergedAlgorithm, 'merge');
        d3.rebind(envelope, envelopeAlgorithm, 'value', 'factor');

        return envelope;
    }

    function __calculator() {

        var volumeValue = function(d, i) { return d.volume; },
            closeValue = function(d, i) { return d.close; };

        var slidingWindow = calculator()
            .windowSize(2)
            .accumulator(function(values) {
                return (closeValue(values[1]) - closeValue(values[0])) * volumeValue(values[1]);
            });

        var force = function(data) {
            return slidingWindow(data);
        };

        force.volumeValue = function(x) {
            if (!arguments.length) {
                return volumeValue;
            }
            volumeValue = x;
            return force;
        };
        force.closeValue = function(x) {
            if (!arguments.length) {
                return closeValue;
            }
            closeValue = x;
            return force;
        };

        d3.rebind(force, slidingWindow, 'windowSize');

        return force;
    }

    function _forceIndex() {

        var force = __calculator();

        var mergedAlgorithm = merge()
            .algorithm(force)
            .merge(function(datum, indicator) {
                datum.force = indicator;
            });

        var forceIndex = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(forceIndex, mergedAlgorithm, 'merge');
        d3.rebind(forceIndex, force, 'windowSize', 'volumeValue', 'closeValue');

        return forceIndex;
    }

    function ___calculator() {

        var closeValue = function(d, i) { return d.close; },
            highValue = function(d, i) { return d.high; },
            lowValue = function(d, i) { return d.low; };

        var kWindow = calculator()
            .windowSize(5)
            .accumulator(function(values) {
                var maxHigh = d3.max(values, highValue);
                var minLow = d3.min(values, lowValue);
                return 100 * (closeValue(values[values.length - 1]) - minLow) / (maxHigh - minLow);
            });

        var dWindow = calculator()
            .windowSize(3)
            .accumulator(function(values) {
                if (values[0] === undefined) {
                    return undefined;
                }
                return d3.mean(values);
            });

        var stochastic = function(data) {
            var kValues = kWindow(data);
            var dValues = dWindow(kValues);
            return kValues.map(function(k, i) {
                var d = dValues[i];
                return { k: k, d: d };
            });
        };

        stochastic.closeValue = function(x) {
            if (!arguments.length) {
                return closeValue;
            }
            closeValue = x;
            return stochastic;
        };
        stochastic.highValue = function(x) {
            if (!arguments.length) {
                return highValue;
            }
            highValue = x;
            return stochastic;
        };
        stochastic.lowValue = function(x) {
            if (!arguments.length) {
                return highValue;
            }
            lowValue = x;
            return stochastic;
        };

        rebind(stochastic, kWindow, {
            kWindowSize: 'windowSize'
        });

        rebind(stochastic, dWindow, {
            dWindowSize: 'windowSize'
        });

        return stochastic;
    }

    function _stochasticOscillator() {

        var stoc = ___calculator();

        var mergedAlgorithm = merge()
                .algorithm(stoc)
                .merge(function(datum, indicator) { datum.stochastic = indicator; });

        var stochasticOscillator = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(stochasticOscillator, mergedAlgorithm, 'merge');
        d3.rebind(stochasticOscillator, stoc, 'kWindowSize', 'dWindowSize', 'lowValue', 'closeValue', 'highValue');

        return stochasticOscillator;
    }

    function ____calculator() {

        var closeValue = function(d, i) { return d.close; },
            wildersSmoothing = function(values, prevAvg) {
                var result = prevAvg + ((values[values.length - 1] - prevAvg) / values.length);
                return result;
            },
            sum = function(a, b) { return a + b; },
            prevClose,
            prevDownChangesAvg,
            prevUpChangesAvg;

        var slidingWindow = calculator()
            .windowSize(14)
            .accumulator(function(values) {
                var closes = values.map(closeValue);

                if (!prevClose) {
                    prevClose = closes[0];
                    return undefined;
                }

                var downChanges = [];
                var upChanges = [];

                closes.forEach(function(close) {
                    var downChange = prevClose > close ? prevClose - close : 0;
                    var upChange = prevClose < close ? close - prevClose : 0;

                    downChanges.push(downChange);
                    upChanges.push(upChange);

                    prevClose = close;
                });

                var downChangesAvg = prevDownChangesAvg ? wildersSmoothing(downChanges, prevDownChangesAvg) :
                    downChanges.reduce(sum) / closes.length;

                var upChangesAvg = prevUpChangesAvg ? wildersSmoothing(upChanges, prevUpChangesAvg) :
                    upChanges.reduce(sum) / closes.length;

                prevDownChangesAvg = downChangesAvg;
                prevUpChangesAvg = upChangesAvg;

                var rs = upChangesAvg / downChangesAvg;
                return 100 - (100 / (1 + rs));
            });

        var rsi = function(data) {
            return slidingWindow(data);
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

        var rsi = ____calculator();

        var mergedAlgorithm = merge()
                .algorithm(rsi)
                .merge(function(datum, indicator) { datum.rsi = indicator; });

        var relativeStrengthIndex = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(relativeStrengthIndex, mergedAlgorithm, 'merge');
        d3.rebind(relativeStrengthIndex, rsi, 'windowSize', 'closeValue');

        return relativeStrengthIndex;
    }

    function movingAverage() {

        var ma = calculator()
                .accumulator(d3.mean)
                .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(ma)
                .merge(function(datum, indicator) { datum.movingAverage = indicator; });

        var movingAverage = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(movingAverage, mergedAlgorithm, 'merge');
        d3.rebind(movingAverage, ma, 'windowSize', 'undefinedValue', 'value');

        return movingAverage;
    }

    function _____calculator() {

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

            return d3.zip(diff, averageDiff)
                .map(function(d) {
                    return {
                        macd: d[0],
                        signal: d[1],
                        divergence: d[0] !== undefined && d[1] !== undefined ? d[0] - d[1] : undefined
                    };
                });
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

        var macdAlgorithm = _____calculator()
            .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(macdAlgorithm)
                .merge(function(datum, indicator) { datum.macd = indicator; });

        var macd = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(macd, mergedAlgorithm, 'merge');
        d3.rebind(macd, macdAlgorithm, 'fastPeriod', 'slowPeriod', 'signalPeriod', 'value');

        return macd;
    }

    function _exponentialMovingAverage() {

        var ema = exponentialMovingAverage()
                .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(ema)
                .merge(function(datum, indicator) { datum.exponentialMovingAverage = indicator; });

        var exponentialMovingAverage$$ = function(data) {
            return mergedAlgorithm(data);
        };

        d3.rebind(exponentialMovingAverage$$, mergedAlgorithm, 'merge');
        d3.rebind(exponentialMovingAverage$$, ema, 'windowSize', 'value');

        return exponentialMovingAverage$$;
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

    var ______calculator = {
        bollingerBands: _bollingerBands,
        exponentialMovingAverage: exponentialMovingAverage,
        macd: _____calculator,
        percentageChange: percentageChange,
        relativeStrengthIndex: ____calculator,
        stochasticOscillator: ___calculator,
        slidingWindow: calculator,
        undefinedInputAdapter: undefinedInputAdapter,
        forceIndex: __calculator,
        envelope: envelopeCalculator,
        elderRay: _calculator
    };

    function __bollingerBands() {

        var bollingerAlgorithm = _bollingerBands()
            .value(function(d) { return d.close; });

        var mergedAlgorithm = merge()
                .algorithm(bollingerAlgorithm)
                .merge(function(datum, indicator) { datum.bollingerBands = indicator; });

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

    var _algorithm = {
        bollingerBands: __bollingerBands,
        calculator: ______calculator,
        exponentialMovingAverage: _exponentialMovingAverage,
        macd: _macd,
        merge: merge,
        movingAverage: movingAverage,
        relativeStrengthIndex: _relativeStrengthIndex,
        stochasticOscillator: _stochasticOscillator,
        forceIndex: _forceIndex,
        envelope: _envelope,
        elderRay: _elderRay
    };

    var _indicator = {
        algorithm: _algorithm,
        renderer: renderer
    };

    function bucket() {

        var bucketSize = 10;

        var bucket = function(data) {
            var numberOfBuckets = Math.ceil(data.length / bucketSize);

            var buckets = [];
            for (var i = 0; i < numberOfBuckets; i++) {
                buckets.push(data.slice(i * bucketSize, (i + 1) * bucketSize));
            }
            return buckets;
        };

        bucket.bucketSize = function(x) {
            if (!arguments.length) {
                return bucketSize;
            }

            bucketSize = x;
            return bucket;
        };

        return bucket;
    }

    function largestTriangleOneBucket() {

        var dataBucketer = bucket(),
            x = identity,
            y = identity;

        var largestTriangleOneBucket = function(data) {

            if (dataBucketer.bucketSize() >= data.length) {
                return data;
            }

            var pointAreas = calculateAreaOfPoints(data);
            var pointAreaBuckets = dataBucketer(pointAreas);

            var buckets = dataBucketer(data.slice(1, data.length - 1));

            var subsampledData = buckets.map(function(thisBucket, i) {

                var pointAreaBucket = pointAreaBuckets[i];
                var maxArea = d3.max(pointAreaBucket);
                var currentMaxIndex = pointAreaBucket.indexOf(maxArea);

                return thisBucket[currentMaxIndex];
            });

            // First and last data points are their own buckets.
            return [].concat(data[0], subsampledData, data[data.length - 1]);
        };

        function calculateAreaOfPoints(data) {

            var xyData = data.map(function(point) {
                return [x(point), y(point)];
            });

            var pointAreas = [];

            for (var i = 1; i < xyData.length - 1; i++) {
                var lastPoint = xyData[i - 1];
                var thisPoint = xyData[i];
                var nextPoint = xyData[i + 1];

                var base = (lastPoint[0] - nextPoint[0]) * (thisPoint[1] - lastPoint[1]);
                var height = (lastPoint[0] - thisPoint[0]) * (nextPoint[1] - lastPoint[1]);

                var area = Math.abs(0.5 * base * height);

                pointAreas.push(area);
            }

            return pointAreas;
        }

        d3.rebind(largestTriangleOneBucket, dataBucketer, 'bucketSize');

        largestTriangleOneBucket.x = function(d) {
            if (!arguments.length) {
                return x;
            }

            x = d;

            return largestTriangleOneBucket;
        };

        largestTriangleOneBucket.y = function(d) {
            if (!arguments.length) {
                return y;
            }

            y = d;

            return largestTriangleOneBucket;
        };

        return largestTriangleOneBucket;
    }

    function largestTriangleThreeBucket() {

        var x = identity,
            y = identity,
            dataBucketer = bucket();

        var largestTriangleThreeBucket = function(data) {

            if (dataBucketer.bucketSize() >= data.length) {
                return data;
            }

            var buckets = dataBucketer(data.slice(1, data.length - 1));
            var firstBucket = data[0];
            var lastBucket = data[data.length - 1];

            // Keep track of the last selected bucket info and all buckets
            // (for the next bucket average)
            var allBuckets = [].concat(firstBucket, buckets, lastBucket);

            var lastSelectedX = x(firstBucket),
                lastSelectedY = y(firstBucket);

            var subsampledData = buckets.map(function(thisBucket, i) {

                var highestArea = -Infinity;
                var highestItem;
                var nextAvgX = d3.mean(allBuckets[i + 1], x);
                var nextAvgY = d3.mean(allBuckets[i + 1], y);

                for (var j = 0; j < thisBucket.length; j++) {
                    var thisX = x(thisBucket[j]),
                        thisY = y(thisBucket[j]);

                    var base = (lastSelectedX - nextAvgX) * (thisY - lastSelectedY);
                    var height = (lastSelectedX - thisX) * (nextAvgY - lastSelectedY);

                    var area = Math.abs(0.5 * base * height);

                    if (area > highestArea) {
                        highestArea = area;
                        highestItem = thisBucket[j];
                    }
                }

                lastSelectedX = x(highestItem);
                lastSelectedY = y(highestItem);

                return highestItem;
            });

            // First and last data points are their own buckets.
            return [].concat(data[0], subsampledData, data[data.length - 1]);
        };

        d3.rebind(largestTriangleThreeBucket, dataBucketer, 'bucketSize');

        largestTriangleThreeBucket.x = function(d) {
            if (!arguments.length) {
                return x;
            }

            x = d;

            return largestTriangleThreeBucket;
        };

        largestTriangleThreeBucket.y = function(d) {
            if (!arguments.length) {
                return y;
            }

            y = d;

            return largestTriangleThreeBucket;
        };

        return largestTriangleThreeBucket;
    }

    function modeMedian() {

        var dataBucketer = bucket(),
            value = identity;

        var modeMedian = function(data) {

            if (dataBucketer.bucketSize() > data.length) {
                return data;
            }

            var minMax = d3.extent(data);
            var buckets = dataBucketer(data.slice(1, data.length - 1));

            var subsampledData = buckets.map(function(thisBucket, i) {

                var frequencies = {};
                var mostFrequent;
                var mostFrequentIndex;
                var singleMostFrequent = true;

                for (var j = 0; j < thisBucket.length; j++) {
                    var item = value(thisBucket[j]);
                    if (item === minMax[0] || item === minMax[1]) {
                        return thisBucket[j];
                    }

                    if (frequencies[item] === undefined) {
                        frequencies[item] = 0;
                    }
                    frequencies[item]++;

                    if (frequencies[item] > frequencies[mostFrequent] || mostFrequent === undefined) {
                        mostFrequent = item;
                        mostFrequentIndex = j;
                        singleMostFrequent = true;
                    } else if (frequencies[item] === frequencies[mostFrequent]) {
                        singleMostFrequent = false;
                    }
                }

                if (singleMostFrequent) {
                    return thisBucket[mostFrequentIndex];
                } else {
                    return thisBucket[Math.floor(thisBucket.length / 2)];
                }
            });

            // First and last data points are their own buckets.
            return [].concat(data[0], subsampledData, data[data.length - 1]);
        };

        modeMedian.bucketSize = function() {
            dataBucketer.bucketSize.apply(this, arguments);
            return modeMedian;
        };

        modeMedian.value = function(x) {
            if (!arguments.length) {
                return value;
            }

            value = x;

            return modeMedian;
        };

        return modeMedian;
    }

    var sampler = {
        modeMedian: modeMedian,
        largestTriangleThreeBucket: largestTriangleThreeBucket,
        largestTriangleOneBucket: largestTriangleOneBucket,
        bucket: bucket
    };

    // the D3 CSV loader / parser converts each row into an object with property names
    // derived from the headings in the CSV. The spread component converts this into an
    // array of series; one per column (vertical spread), or one per row (horizontal spread).
    function spread() {

        var xValueKey = '',
            orient = 'vertical',
            yValue = function(row, key) {
                // D3 CSV returns all values as strings, this converts them to numbers
                // by default.
                return Number(row[key]);
            };

        function verticalSpread(data) {
            var series = Object.keys(data[0])
                .filter(function(key) {
                    return key !== xValueKey;
                })
                .map(function(key) {
                    var values = data.filter(function(row) {
                        return row[key];
                    }).map(function(row) {
                        return {
                            x: row[xValueKey],
                            y: yValue(row, key)
                        };
                    });
                    return {
                        key: key,
                        values: values
                    };
                });

            return series;
        }

        function horizontalSpread(data) {

            var series = data.map(function(row) {
                var keys = Object.keys(row).filter(function(d) {
                    return d !== xValueKey;
                });

                return {
                    key: row[xValueKey],
                    values: keys.map(function(key) {
                        return {
                            x: key,
                            y: yValue(row, key)
                        };
                    })
                };
            });

            return series;
        }

        var spread = function(data) {
            return orient === 'vertical' ? verticalSpread(data) : horizontalSpread(data);
        };

        spread.xValueKey = function(x) {
            if (!arguments.length) {
                return xValueKey;
            }
            xValueKey = x;
            return spread;
        };

        spread.yValue = function(x) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = x;
            return spread;
        };

        spread.orient = function(x) {
            if (!arguments.length) {
                return orient;
            }
            orient = x;
            return spread;
        };

        return spread;
    }

    function walk() {
        var period = 1,
            steps = 20,
            mu = 0.1,
            sigma = 0.1;

        var walk = function(value) {
            var randomNormal = d3.random.normal(),
                timeStep = period / steps,
                walkData = [];

            for (var i = 0; i < steps + 1; i++) {
                walkData.push(value);
                var increment = (randomNormal() * Math.sqrt(timeStep) * sigma) +
                     ((mu - sigma * sigma / 2) * timeStep);
                value = value * Math.exp(increment);
            }

            return walkData;
        };

        walk.period = function(x) {
            if (!arguments.length) {
                return period;
            }
            period = x;
            return walk;
        };

        walk.steps = function(x) {
            if (!arguments.length) {
                return steps;
            }
            steps = x;
            return walk;
        };

        walk.mu = function(x) {
            if (!arguments.length) {
                return mu;
            }
            mu = x;
            return walk;
        };

        walk.sigma = function(x) {
            if (!arguments.length) {
                return sigma;
            }
            sigma = x;
            return walk;
        };

        return walk;
    }

    function financial() {

        var mu = 0.1,
            sigma = 0.1,
            startPrice = 100,
            startVolume = 100000,
            startDate = new Date(),
            stepsPerDay = 50,
            volumeNoiseFactor = 0.3,
            filter = function(d) { return true; };

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

        function calculateInterval(start, days) {
            var millisecondsPerYear = 3.15569e10;

            var toDate = new Date(start.getTime());
            toDate.setUTCDate(start.getUTCDate() + days);

            return {
                toDate: toDate,
                years: (toDate.getTime() - start.getTime()) / millisecondsPerYear
            };
        }

        function dataGenerator(days, years) {

            var prices = walk()
                .period(years)
                .steps(days * stepsPerDay)
                .mu(mu)
                .sigma(sigma)(startPrice);

            var volumes = walk()
                .period(years)
                .steps(days)
                .mu(0)
                .sigma(sigma)(startVolume);

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
                return filter(d.date);
            });
        }

        var gen = function(days) {
            var date = startDate,
                remainingDays = days,
                result = [],
                interval;

            do {
                interval = calculateInterval(date, remainingDays);
                result = result.concat(dataGenerator(remainingDays, interval.years));
                date = interval.toDate;
                remainingDays = days - result.length;
            }
            while (result.length < days);

            return result;
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

    function skipWeekends() {
        return function(date) {
            var day = date.getDay();
            return !(day === 0 || day === 6);
        };
    }

    var random = {
        filter: {
            skipWeekends: skipWeekends
        },
        financial: financial,
        walk: walk
    };

    //  https://www.quandl.com/docs/api#datasets
    function quandl() {

        function defaultColumnNameMap(colName) {
            return colName[0].toLowerCase() + colName.substr(1);
        }

        var database = 'YAHOO',
            dataset = 'GOOG',
            apiKey = null,
            start = null,
            end = null,
            rows = null,
            descending = false,
            collapse = null,
            columnNameMap = defaultColumnNameMap;

        var quandl = function(cb) {
            var params = [];
            if (apiKey != null) {
                params.push('api_key=' + apiKey);
            }
            if (start != null) {
                params.push('start_date=' + start.toISOString().substring(0, 10));
            }
            if (end != null) {
                params.push('end_date=' + end.toISOString().substring(0, 10));
            }
            if (rows != null) {
                params.push('rows=' + rows);
            }
            if (!descending) {
                params.push('order=asc');
            }
            if (collapse != null) {
                params.push('collapse=' + collapse);
            }

            var url = 'https://www.quandl.com/api/v3/datasets/' + database + '/' + dataset + '/data.json?' + params.join('&');

            d3.json(url, function(error, data) {
                if (error) {
                    cb(error);
                    return;
                }

                var datasetData = data.dataset_data;

                var nameMapping = columnNameMap || function(n) { return n; };
                var colNames = datasetData.column_names
                    .map(function(n, i) { return [i, nameMapping(n)]; })
                    .filter(function(v) { return v[1]; });

                var mappedData = datasetData.data.map(function(d) {
                    var output = {};
                    colNames.forEach(function(v) {
                        output[v[1]] = v[0] === 0 ? new Date(d[v[0]]) : d[v[0]];
                    });
                    return output;
                });

                cb(error, mappedData);
            });
        };

        // Unique Database Code (e.g. WIKI)
        quandl.database = function(x) {
            if (!arguments.length) {
                return database;
            }
            database = x;
            return quandl;
        };
        // Unique Dataset Code (e.g. AAPL)
        quandl.dataset = function(x) {
            if (!arguments.length) {
                return dataset;
            }
            dataset = x;
            return quandl;
        };
        // Set To Use API Key In Request (needed for premium set or high frequency requests)
        quandl.apiKey = function(x) {
            if (!arguments.length) {
                return apiKey;
            }
            apiKey = x;
            return quandl;
        };
        // Start Date of Data Series
        quandl.start = function(x) {
            if (!arguments.length) {
                return start;
            }
            start = x;
            return quandl;
        };
        // End Date of Data Series
        quandl.end = function(x) {
            if (!arguments.length) {
                return end;
            }
            end = x;
            return quandl;
        };
        // Limit Number of Rows
        quandl.rows = function(x) {
            if (!arguments.length) {
                return rows;
            }
            rows = x;
            return quandl;
        };
        // Return Results In Descending Order (true) or Ascending (false)
        quandl.descending = function(x) {
            if (!arguments.length) {
                return descending;
            }
            descending = x;
            return quandl;
        };
        // Periodicity of Data (daily | weekly | monthly | quarterly | annual)
        quandl.collapse = function(x) {
            if (!arguments.length) {
                return collapse;
            }
            collapse = x;
            return quandl;
        };
        // Function Used to Normalise the Quandl Column Name To Field Name, Return Null To Skip Field
        quandl.columnNameMap = function(x) {
            if (!arguments.length) {
                return columnNameMap;
            }
            columnNameMap = x;
            return quandl;
        };
        // Expose default column name map
        quandl.defaultColumnNameMap = defaultColumnNameMap;

        return quandl;
    }

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
        coinbase: coinbase,
        quandl: quandl
    };

    var _data = {
        feed: feed,
        random: random,
        spread: spread,
        sampler: sampler
    };

    function smallMultiples(xScale, yScale) {

        xScale = xScale || d3.scale.linear();
        yScale = yScale || d3.scale.linear();

        var padding = 10,
            columns = 9,
            decorate = noop,
            plotArea = _line(),
            margin = {
                bottom: 30,
                right: 30
            },
            values = function(d) { return d.values; },
            key = function(d) { return d.key; };

        var xAxis = axis()
            .ticks(2);
        var yAxis = axis()
            .orient('right')
            .ticks(3);

        function classedDataJoin(clazz) {
            return dataJoinUtil()
                .selector('g.' + clazz)
                .element('g')
                .attr('class', clazz);
        }

        var dataJoin = classedDataJoin('multiple'),
            xAxisDataJoin = classedDataJoin('x-axis'),
            yAxisDataJoin = classedDataJoin('y-axis');

        var multiples = function(selection) {
            selection.each(function(data, index) {

                var container = d3.select(this);

                var expandedMargin = expandRect(margin);
                expandedMargin.position = 'absolute';

                var svg = container.selectAll('svg')
                    .data([data]);
                svg.enter()
                    .append('svg')
                    .layout('flex', 1)
                    .append('g')
                    .attr('class', 'multiples-chart');

                var plotAreaContainer = svg.select('g')
                    .layout(expandedMargin);

                container.layout();

                var rows = Math.ceil(data.length / columns);
                var multipleWidth = plotAreaContainer.layout('width') / columns - padding;
                var multipleHeight = plotAreaContainer.layout('height') / rows - padding;

                function translationForMultiple(row, column) {
                    return {
                        xOffset: (multipleWidth + padding) * row,
                        yOffset: (multipleHeight + padding) * column
                    };
                }

                setRange(xScale, [0, multipleWidth]);
                setRange(yScale, [multipleHeight, 0]);

                plotArea.xScale(xScale)
                    .yScale(yScale);

                // create a container for each multiple chart
                var multipleContainer = dataJoin(plotAreaContainer, data);
                multipleContainer.attr('transform', function(d, i) {
                    var translation = translationForMultiple(i % columns, Math.floor(i / columns));
                    return 'translate(' + translation.xOffset + ',' + translation.yOffset + ')';
                });

                // within each, add an inner 'g' and background rect
                var inner = multipleContainer.enter()
                    .append('g');
                inner.append('rect')
                    .attr('class', 'background');
                inner.append('g')
                    .attr('transform', 'translate(' + (multipleWidth / 2) + ', 0)')
                    .append('text')
                    .attr('class', 'label')
                    .text(key);

                // on update, call the plotArea and size the rect element
                multipleContainer.select('g')
                    .datum(values)
                    .call(plotArea);
                multipleContainer.select('rect')
                    .attr({width: multipleWidth, height: multipleHeight});

                decorate(multipleContainer, data, index);

                var xAxisContainer = xAxisDataJoin(plotAreaContainer, d3.range(columns));
                xAxisContainer.attr('transform', function(d, i) {
                    var row = xAxis.orient() === 'bottom' ? rows : 0;
                    var offset = xAxis.orient() === 'bottom' ? 0 : -padding;
                    var translation = translationForMultiple(i, row);
                    return 'translate(' + translation.xOffset + ',' + (translation.yOffset + offset) + ')';
                });
                xAxis.scale(xScale);
                xAxisContainer.call(xAxis);

                var yAxisContainer = yAxisDataJoin(plotAreaContainer, d3.range(rows));
                yAxisContainer.attr('transform', function(d, i) {
                    var column = yAxis.orient() === 'left' ? 0 : columns;
                    var offset = yAxis.orient() === 'left' ? -padding : 0;
                    var translation = translationForMultiple(column, i);
                    return 'translate(' + (translation.xOffset + offset) + ',' + translation.yOffset + ')';
                });
                yAxis.scale(yScale);
                yAxisContainer.call(yAxis);
            });
        };

        var scaleExclusions = [
            /range\w*/,   // the scale range is set via the component layout
            /tickFormat/  // use axis.tickFormat instead (only present on linear scales)
        ];
        rebindAll(multiples, xScale, 'x', scaleExclusions);
        rebindAll(multiples, yScale, 'y', scaleExclusions);

        rebindAll(multiples, xAxis, 'x');
        rebindAll(multiples, yAxis, 'y');

        multiples.columns = function(x) {
            if (!arguments.length) {
                return columns;
            }
            columns = x;
            return multiples;
        };

        multiples.margin = function(x) {
            if (!arguments.length) {
                return margin;
            }
            margin = x;
            return multiples;
        };

        multiples.padding = function(x) {
            if (!arguments.length) {
                return padding;
            }
            padding = x;
            return multiples;
        };

        multiples.plotArea = function(x) {
            if (!arguments.length) {
                return plotArea;
            }
            plotArea = x;
            return multiples;
        };

        multiples.values = function(x) {
            if (!arguments.length) {
                return values;
            }
            values = x;
            return multiples;
        };

        multiples.key = function(x) {
            if (!arguments.length) {
                return key;
            }
            key = x;
            return multiples;
        };

        multiples.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return multiples;
        };

        return multiples;
    }

    function tooltip() {

        var split = 50,
            decorate = noop;

        var items = [
            ['datum:', function(d) { return d.datum; }]
        ];

        var dataJoin = dataJoinUtil()
            .selector('g.cell')
            .element('g')
            .attr('class', 'cell tooltip');

        var tooltip = function(selection) {
            selection.each(function(data, index) {
                var container = d3.select(this);

                var legendData = items.map(function(item, i) {
                    return {
                        datum: data,
                        label: d3.functor(item[0]),
                        value: d3.functor(item[1])
                    };
                });

                var g = dataJoin(container, legendData);

                g.enter()
                    .layout({
                        'flex': 1,
                        'flexDirection': 'row'
                    });

                g.enter().append('text')
                    .attr('class', 'label')
                    .layout('flex', split);
                g.enter().append('text')
                    .attr('class', 'value')
                    .layout('flex', 100 - split);

                g.select('.label')
                    .text(function(d, i) {
                        return d.label.call(this, d.datum, i);
                    });

                g.select('.value')
                    .text(function(d, i) {
                        return d.value.call(this, d.datum, i);
                    });

                decorate(g, data, index);

                container.layout();
            });
        };

        tooltip.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return tooltip;
        };

        tooltip.split = function(x) {
            if (!arguments.length) {
                return split;
            }
            split = x;
            return tooltip;
        };

        tooltip.items = function(x) {
            if (!arguments.length) {
                return items;
            }
            items = x;
            return tooltip;
        };

        return tooltip;
    }

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
        var point = _point()
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
            .series([line, point])
            .mapping(function(series) {
                switch (series) {
                case point:
                    return highLowOpenClose(this);
                default:
                    return this;
                }
            });

        var sparkline = function(selection) {

            point.size(radius * radius * Math.PI);

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

    function cartesian(xScale, yScale) {

        xScale = xScale || d3.scale.linear();
        yScale = yScale || d3.scale.linear();

        var margin = {
                bottom: 30,
                right: 30
            },
            yLabel = '',
            xLabel = '',
            xBaseline = null,
            yBaseline = null,
            chartLabel = '',
            plotArea = _line(),
            decorate = noop;

        // Each axis-series has a cross-scale which is defined as an identity
        // scale. If no baseline function is supplied, the axis is positioned
        // using the cross-scale range extents. If a baseline function is supplied
        // it is transformed via the respective scale.
        var xAxis = _axis()
            .orient('bottom')
            .baseline(function() {
                if (xBaseline !== null) {
                    return yScale(xBaseline.apply(this, arguments));
                } else {
                    var r = range(yScale);
                    return xAxis.orient() === 'bottom' ? r[0] : r[1];
                }
            });

        var yAxis = _axis()
            .orient('right')
            .baseline(function() {
                if (yBaseline !== null) {
                    return xScale(yBaseline.apply(this, arguments));
                } else {
                    var r = range(xScale);
                    return yAxis.orient() === 'left' ? r[0] : r[1];
                }
            });

        var containerDataJoin = dataJoinUtil()
            .selector('svg.cartesian-chart')
            .element('svg')
            .attr({'class': 'cartesian-chart', 'layout-style': 'flex: 1'});


        var cartesian = function(selection) {

            selection.each(function(data, index) {

                var container = d3.select(this);

                var svg = containerDataJoin(container, [data]);
                svg.enter().html(
                    '<g class="plot-area-container"> \
                        <rect class="background" \
                            layout-style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"/> \
                        <g class="axes-container" \
                            layout-style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"> \
                            <g class="x-axis" layout-style="height: 0; width: 0"/> \
                            <g class="y-axis" layout-style="height: 0; width: 0"/> \
                        </g> \
                        <svg class="plot-area" \
                            layout-style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"/> \
                    </g> \
                    <g class="x-axis label-container"> \
                        <g layout-style="height: 0; width: 0"> \
                            <text class="label"/> \
                        </g> \
                    </g> \
                    <g class="y-axis label-container"> \
                        <g layout-style="height: 0; width: 0"> \
                            <text class="label"/> \
                        </g> \
                    </g> \
                    <g class="title label-container"> \
                        <g layout-style="height: 0; width: 0"> \
                            <text class="label"/> \
                        </g> \
                    </g>');

                var expandedMargin = expandRect(margin);

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
                svg.select('.y-axis.label-container')
                    .attr('class', 'y-axis label-container ' + yAxis.orient())
                    .layout(yAxisLayout);

                var xAxisLayout = {
                    position: 'absolute',
                    left: expandedMargin.left,
                    right: expandedMargin.right,
                    alignItems: 'center'
                };
                xAxisLayout[xAxis.orient()] = 0;
                svg.select('.x-axis.label-container')
                    .attr('class', 'x-axis label-container ' + xAxis.orient())
                    .layout(xAxisLayout);

                // perform the flexbox / css layout
                container.layout();

                // update the label text
                svg.select('.title .label')
                    .text(chartLabel);

                svg.select('.y-axis.label-container .label')
                    .text(yLabel)
                    .attr('transform', yAxis.orient() === 'right' ? 'rotate(90)' : 'rotate(-90)');

                svg.select('.x-axis.label-container .label')
                    .text(xLabel);

                // set the axis ranges
                var plotAreaContainer = svg.select('.plot-area');
                setRange(xScale, [0, plotAreaContainer.layout('width')]);
                setRange(yScale, [plotAreaContainer.layout('height'), 0]);

                // render the axes
                xAxis.xScale(xScale)
                    .yScale(d3.scale.identity());

                yAxis.yScale(yScale)
                    .xScale(d3.scale.identity());

                svg.select('.axes-container .x-axis')
                    .call(xAxis);

                svg.select('.axes-container .y-axis')
                    .call(yAxis);

                // render the plot area
                plotArea.xScale(xScale)
                    .yScale(yScale);
                plotAreaContainer.call(plotArea);

                decorate(svg, data, index);
            });
        };

        function rebindScale(scale, prefix) {
            var scaleExclusions = [
                /range\w*/,   // the scale range is set via the component layout
                /tickFormat/  // use axis.tickFormat instead (only present on linear scales)
            ];

            // The scale ticks method is a stateless method that returns (roughly) the number of ticks
            // requested. This is subtley different from teh axis ticks methods that simple stores the given arguments
            // for invocation of the scale method at some point in the future.
            // Here we expose the underling scale ticks method in case the user want to generate their own ticks.
            if (!isOrdinal(scale)) {
                scaleExclusions.push('ticks');
                var mappings = {};
                mappings[prefix + 'ScaleTicks'] = 'ticks';
                rebind(cartesian, scale, mappings);
            }

            rebindAll(cartesian, scale, prefix, scaleExclusions);
        }

        rebindScale(xScale, 'x');
        rebindScale(yScale, 'y');


        var axisExclusions = [
            'baseline',         // the axis baseline is adapted so is not exposed directly
            'xScale', 'yScale'  // these are set by this components
        ];
        rebindAll(cartesian, xAxis, 'x', axisExclusions);
        rebindAll(cartesian, yAxis, 'y', axisExclusions);

        cartesian.xBaseline = function(x) {
            if (!arguments.length) {
                return xBaseline;
            }
            xBaseline = d3.functor(x);
            return cartesian;
        };
        cartesian.yBaseline = function(x) {
            if (!arguments.length) {
                return yBaseline;
            }
            yBaseline = d3.functor(x);
            return cartesian;
        };
        cartesian.chartLabel = function(x) {
            if (!arguments.length) {
                return chartLabel;
            }
            chartLabel = x;
            return cartesian;
        };
        cartesian.plotArea = function(x) {
            if (!arguments.length) {
                return plotArea;
            }
            plotArea = x;
            return cartesian;
        };
        cartesian.xLabel = function(x) {
            if (!arguments.length) {
                return xLabel;
            }
            xLabel = x;
            return cartesian;
        };
        cartesian.margin = function(x) {
            if (!arguments.length) {
                return margin;
            }
            margin = x;
            return cartesian;
        };
        cartesian.yLabel = function(x) {
            if (!arguments.length) {
                return yLabel;
            }
            yLabel = x;
            return cartesian;
        };
        cartesian.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return cartesian;
        };

        return cartesian;
    }

    var chart = {
        cartesian: cartesian,
        sparkline: sparkline,
        tooltip: tooltip,
        smallMultiples: smallMultiples
    };

    function gridline() {

        var xTicks = _ticks(),
            yTicks = _ticks();

        var xDecorate = noop,
            yDecorate = noop;

        var xLineDataJoin = dataJoinUtil()
            .selector('line.x')
            .element('line')
            .attr('class', 'x gridline');

        var yLineDataJoin = dataJoinUtil()
            .selector('line.y')
            .element('line')
            .attr('class', 'y gridline');

        var gridlines = function(selection) {

            selection.each(function(data, index) {

                var xScale = xTicks.scale(),
                    yScale = yTicks.scale();

                var xData = xTicks();
                var xLines = xLineDataJoin(this, xData);

                xLines.attr({
                    'x1': xScale,
                    'x2': xScale,
                    'y1': range(yScale)[0],
                    'y2': range(yScale)[1]
                });

                xDecorate(xLines, xData, index);

                var yData = yTicks();
                var yLines = yLineDataJoin(this, yData);

                yLines.attr({
                    'x1': range(xScale)[0],
                    'x2': range(xScale)[1],
                    'y1': yScale,
                    'y2': yScale
                });

                yDecorate(yLines, yData, index);

            });
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

        rebind(gridlines, xLineDataJoin, {'xKey': 'key'});
        rebind(gridlines, yLineDataJoin, {'yKey': 'key'});

        rebindAll(gridlines, xTicks, 'x');
        rebindAll(gridlines, yTicks, 'y');

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

        var dataJoin = dataJoinUtil()
            .selector('g.annotation')
            .element('g')
            .attr('class', 'annotation');

        var band = function(selection) {
            selection.each(function(data, index) {

                var container = d3.select(this);

                var g = dataJoin(container, data);

                g.enter()
                    .append('path')
                    .classed('band', true);

                var pathGenerator = bar()
                    .horizontalAlign('right')
                    .verticalAlign('top')
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
    var version = '5.3.0';

    var fc = {
        annotation: annotation,
        chart: chart,
        data: _data,
        indicator: _indicator,
        scale: __scale,
        series: _series,
        svg: svg,
        tool: tool,
        util: util,
        version: version,
        layout: _layout
    };

    return fc;

}));