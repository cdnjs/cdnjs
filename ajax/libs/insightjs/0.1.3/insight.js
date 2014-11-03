(function() {

    var isMissing = function(that, name) {
        return that[name] === undefined;
    };

    var isDefined = function(that, name) {
        return !isMissing(that, name);
    };

    var undefinedMessages = [];



    if (isMissing(window, 'crossfilter')) {

        if (isDefined(window, 'console') && isDefined(console, 'warn')) {

            console.warn('Crossfilter is not available so you will only have basic charting functionality. See https://github.com/ScottLogic/insight for how to get started.');

        }

    }

    if (isMissing(window, 'd3')) {

        var message = 'Insight depends on d3. You must include d3 in a script tag. See https://github.com/ScottLogic/insight for how to get started.';

        throw new Error(message);

    }

})();
;/**
 * This is the global namespace.
 * @namespace insight
 */
var insight = (function() {

    return {

    };

})();
;(function(insight) {

    /**
     * Calculates margins for Charts, given axes and series with datasets.
     * @class insight.MarginMeasurer
     */
    insight.MarginMeasurer = (function(insight) {

        function MarginMeasurer() {

            // private variables

            var self = this;
            var labelPadding = 10;

            // public methods

            /**
             * Calculates the dimensions required for a single series' margin entries
             * @memberof! insight.MarginMeasurer
             * @instance
             * @param {insight.Series} series - A Series to measure
             * @param {Number} lineHeight - The CSS line-height to use when defining dimensions
             * @param {object} axisContext - A 2d canvas drawing context to measure axis value text with
             * @param {object} labelContext - A 2d canvas drawing context to measure label text with
             * @param {object} labelStyles - An associative map {cssName: value} of styles to apply when measuring axis labels(font-size, font-family etc.)
             * @returns {object} - margin object {top: Number,left: Number,bottom:Number,right:Number}
             */
            self.seriesLabelDimensions = function(series, lineHeight, axisContext, labelContext) {

                var maxValueWidth = 0,
                    maxKeyWidth = 0,
                    maxFontHeight = 0,
                    keyLabelHeight = 0,
                    valueLabelHeight = 0,
                    keyAxis = series.keyAxis,
                    valueAxis = series.valueAxis,
                    data = series.dataset(),
                    keys = series.keys(),
                    x = series.x,
                    y = series.y,
                    displayKey = keyAxis.display(),
                    displayValue = valueAxis.display(),
                    formatFunction,
                    valueString,
                    keyDimensions,
                    valueDimensions,
                    value;

                // loop through keys and values to measure lengths
                keys.forEach(function(key) {
                    if (displayKey) {
                        formatFunction = x === keyAxis ? x.labelFormat() : y.labelFormat();
                        valueString = formatFunction(key);
                        keyDimensions = axisContext.measureText(valueString);
                        maxKeyWidth = Math.max(keyDimensions.width, maxKeyWidth);
                    }
                    if (displayValue) {

                        value = insight.Utils.valueForKey(data, key, series.keyFunction(), series.valueFunction());
                        formatFunction = y === valueAxis ? y.labelFormat() : x.labelFormat();
                        valueString = formatFunction(value);
                        valueDimensions = axisContext.measureText(valueString);
                        maxValueWidth = Math.max(valueDimensions.width, maxValueWidth);
                    }
                });

                // If there was some data, append Axis labels and padding to the max values
                if (keys.length) {

                    if (displayKey) {
                        var keyAxisPadding = keyAxis.tickPadding() + keyAxis.tickSize();
                        var keyAxisLabelWidth = labelContext.measureText(keyAxis.label())
                            .width;
                        var axisLabelAdditions = keyAxisPadding + keyAxisLabelWidth + labelPadding;

                        maxKeyWidth = maxKeyWidth + axisLabelAdditions;
                        keyLabelHeight = lineHeight;
                    }
                    if (displayValue) {
                        var valueAxisPadding = valueAxis.tickPadding() + valueAxis.tickSize();
                        var valueAxisLabelWidth = labelContext.measureText(valueAxis.label())
                            .width;
                        var valueLabelAdditions = valueAxisPadding + valueAxisLabelWidth + labelPadding;

                        maxValueWidth = valueAxis.display() ? maxValueWidth + valueLabelAdditions : maxValueWidth;
                        valueLabelHeight = lineHeight;
                    }
                }

                var maxDimensions = {
                    "maxKeyWidth": maxKeyWidth,
                    "maxKeyHeight": keyLabelHeight,
                    "maxValueWidth": maxValueWidth,
                    "maxValueHeight": valueLabelHeight
                };

                //Handle tick rotation
                if (keyAxis.tickRotation() !== '0') {
                    //Convert Degrees -> Radians
                    var xSin = Math.sin(keyAxis.tickRotation() * Math.PI / 180);
                    var xCos = Math.cos(keyAxis.tickRotation() * Math.PI / 180);

                    maxDimensions.maxKeyWidth = Math.ceil(Math.max(lineHeight * xSin, maxKeyWidth * xCos));
                    maxDimensions.maxKeyHeight = Math.ceil(Math.max(lineHeight * xCos, maxKeyWidth * xSin));
                }

                if (valueAxis.tickRotation() !== '0') {
                    //Convert Degrees -> Radians
                    var ySin = Math.sin(valueAxis.tickRotation() * Math.PI / 180);
                    var yCos = Math.cos(valueAxis.tickRotation() * Math.PI / 180);

                    maxDimensions.maxValueWidth = Math.ceil(Math.max(lineHeight * ySin, maxValueWidth * yCos));
                    maxDimensions.maxValueHeight = Math.ceil(Math.max(lineHeight * yCos, maxValueWidth * ySin));
                }

                return maxDimensions;
            };


            /**
             * Calculates a margin object {top,left,bottom,right} for a chart given a list of series and associated CSS styles
             * @memberof! insight.MarginMeasurer
             * @instance
             * @param {insight.Series[]} seriesArray - An array of Series to calculate dimensions from
             * @param {DOMElement} measuringCanvas - A canvas element to measure text with
             * @param {object} axisStyles - An associative map {cssName: value} of styles to apply when measuring axis values (font-size, font-family etc.)
             * @param {object} labelStyles - An associative map {cssName: value} of styles to apply when measuring axis labels(font-size, font-family etc.)
             * @returns {object} - margin object {top: Number,left: Number,bottom:Number,right:Number}
             */
            self.calculateChartMargins = function(seriesArray, measuringCanvas, axisStyles, labelStyles) {

                labelStyles = labelStyles ? labelStyles : axisStyles;

                var margin = {
                    "top": 0,
                    "left": 0,
                    "bottom": 0,
                    "right": 0
                };

                var axisMeasuringContext = insight.Utils.getDrawingContext(measuringCanvas, axisStyles);
                var labelMeasuringContext = insight.Utils.getDrawingContext(measuringCanvas, labelStyles);

                var lineHeightString = axisStyles['line-height'];

                // remove 'px' from end
                var lineHeight = insight.Utils.tryParseInt(lineHeightString.slice(0, lineHeightString.length - 2), 16);

                seriesArray.forEach(function(series) {
                    var keyAxis = series.keyAxis;
                    var valueAxis = series.valueAxis;

                    var labelDimensions = self.seriesLabelDimensions(series, lineHeight, axisMeasuringContext, labelMeasuringContext);

                    var keyProperty = keyAxis.horizontal() ? 'maxKeyHeight' : 'maxKeyWidth';
                    var valueProperty = valueAxis.horizontal() ? 'maxValueHeight' : 'maxValueWidth';

                    margin[keyAxis.orientation()] = Math.max(labelDimensions[keyProperty], margin[keyAxis.orientation()]);
                    margin[valueAxis.orientation()] = Math.max(labelDimensions[valueProperty], margin[valueAxis.orientation()]);
                });

                return margin;
            };
        }


        return MarginMeasurer;

    })(insight);
})(insight);
;insight.Constants = (function() {
    var exports = {};

    exports.Behind = 'behind';
    exports.Front = 'front';
    exports.AxisTextClass = 'axis-text';
    exports.AxisLabelClass = 'axis-label';
    exports.YAxisClass = 'y-axis';
    exports.AxisClass = 'in-axis';
    exports.XAxisClass = 'x-axis';
    exports.XAxisRotation = 'rotate(90)';
    exports.Tooltip = 'd3-tip';
    exports.ToolTipTextClass = 'tooltip';
    exports.BarGroupClass = 'bargroup';
    exports.BarClass = 'bar';
    exports.LineClass = 'in-line';
    exports.ContainerClass = 'incontainer';
    exports.ChartSVG = 'chartSVG';
    exports.PlotArea = 'plotArea';
    exports.Legend = 'legend';
    exports.LegendView = 'legend-view';
    exports.Bubble = 'bubble';
    exports.Scatter = 'scatter';
    exports.TableClass = 'in-table';
    exports.TableRowClass = 'in-datarow';

    return exports;
}());


insight.Scales = (function() {
    var exports = {};

    exports.Ordinal = {
        name: 'ordinal',
        scale: d3.scale.ordinal
    };
    exports.Linear = {
        name: 'linear',
        scale: d3.scale.linear
    };
    exports.Time = {
        name: 'time',
        scale: d3.time.scale
    };
    return exports;
}());
;insight.Formatters = (function(d3) {
    var exports = {};

    exports.moduleProperty = 1;

    exports.currencyFormatter = function(value) {
        var format = d3.format("0,000");
        return '£' + format(value);
    };

    exports.decimalCurrencyFormatter = function(value) {
        var format = d3.format("0.2f");
        return '£' + format(value);
    };

    exports.numberFormatter = function(value) {
        var format = d3.format("0,000.0f");
        return format(value);
    };

    exports.dateFormatter = function(value) {
        var format = d3.time.format("%b %Y");
        return format(value);
    };

    exports.percentageFormatter = function(value) {
        var format = d3.format("%");
        return format(value);
    };

    exports.format = function(format, value) {
        var formatter = d3.format(format);
        return formatter(value);
    };

    return exports;
}(d3));
;/**
 * This module contains some helper functions used throughout the library
 * @namespace insight.Utils
 */
insight.Utils = (function() {

    var exports = {};

    // Internal Functions

    /**
     * This recursive function takes two values a and b, a list of sort objects [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}] and an index of the current function being used to sort.
     * It returns a ordering value for a and b, as per the normal Javascript sorting rules https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @memberof! insight.Utils
     * @returns {int} sortResult - if a > b then the result = 1, -1 if a < b and 0 if a == b.
     * @param {object} a - Description
     * @param {object} b - Description
     * @param {object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
     */
    var recursiveSort = function(a, b, sorters) {
        if (sorters.length === 0)
            return 0;

        var current = sorters[0];
        var sortParameter = current.sortParameter;
        var sortOrder = current.order;

        var aResult = sortParameter(a),
            bResult = sortParameter(b);

        if (aResult === bResult) {
            return recursiveSort(a, b, sorters.slice(1));
        }

        var sortResult = (aResult > bResult) ? 1 : -1;
        return (sortOrder === 'ASC') ? sortResult : -sortResult;
    };


    // Public Functions

    /**
     * Checks if an object is an array or not
     * @returns {boolean} return - is the object an array
     * @param {object} input - The object to check
     */
    exports.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Builds the CSS selector used to return chart items that are not selected (and not axes)
     * @returns {string} cssSelector - CSS selector for unselected chart items
     */
    exports.highlightSelector = function() {

        var notSelected = ':not(.selected)';
        var selector = '.' + insight.Constants.BarClass + notSelected +
            ',.' + insight.Constants.Bubble + notSelected;

        return selector;
    };

    exports.isDate = function(obj) {
        return obj instanceof Date;
    };

    exports.isNumber = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    /**
     * Returns true/false if an object is inside an array.
     * @memberof! insight.Utils
     * @param {object[]} array - The array to check
     * @param {object} value - The value to check for
     * @returns {boolean} - True if the provided array contains the provided value
     */
    exports.arrayContains = function(array, value) {
        return array.indexOf(value) !== -1;
    };

    /**
     * Adds a value to an array, only if it doesn't already belong to the array.
     * @memberof! insight.Utils
     * @param {object[]} array - The array to insert into
     * @param {object} value - The value to insert
     */
    exports.addToSet = function(array, value) {
        if (!exports.arrayContains(array, value)) {
            array.push(value);
        }
    };

    /**
     * Takes a data point, and creates a class name for insight to identify this particular key
     * If the parameter is not an object (just a value in an array) then there is no need for this particular
     * class so an empty string is returned.
     * @returns {string} return - A class name to identify this point and any other points taking the same value in other charts.
     * @param {object} d - The input point
     * @param {function} keyFunction - An optional keyFunction if the
     */
    exports.keySelector = function(d) {

        var result = '';

        if (d) {
            var str = d.toString();
            result = 'in_' + str.replace(/[^A-Z0-9]/ig, '_');
        }

        return result;
    };

    /**
     * Returns the elements in the provided array where the given parameter matches a specific value
     * @param {object[]} array - The input array to check
     * @param {string} propertyName - The name of the property to match
     * @param {string} value - The value to match
     * @returns {object[]} - The matching elements
     */
    exports.takeWhere = function(array, propertyName, value) {
        var matches = array.filter(function(item) {
            if (item.hasOwnProperty(propertyName)) {
                return item[propertyName] === value;
            } else {
                return false;
            }
        });

        return matches;
    };

    /**
     * Removes the elements in the provided array where the given parameter matches a specific value
     * @param {object[]} array - The input array to check
     * @param {string} propertyName - The name of the property to match
     * @param {string} value - The value to match
     * @returns {object[]} - The matching elements
     */
    exports.removeWhere = function(array, propertyName, value) {

        var self = this;
        var matches = exports.takeWhere(array, propertyName, value);

        matches.forEach(function(match) {
            self.removeItemFromArray(array, match);
        });
    };



    exports.removeItemFromArray = function(array, item) {
        var index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
    };


    exports.arrayUnique = function(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };

    /**
     * Takes two objects and returns the union, with priority given to the first parameter in the event of clashes.
     * This bias is used for scenarios where user defined CSS properties must not override default values.
     * @returns {object} union - a shallow copy representing the union between the provided objects
     * @param {object} base - The base object to have priority in the union operation.
     * @param {object} extend - The object to extend from, adding any additional properties and values defined in this parameter.
     */
    exports.objectUnion = function(base, extend) {
        var merged = {},
            key = null;

        for (key in extend) {
            merged[key] = extend[key];
        }
        for (key in base) {
            merged[key] = base[key];
        }
        return merged;
    };


    /**
     * Takes an array and a list of sort objects, sorting the array (in place) using the provided priorities and returning that array at the end.
     * @returns {object[]} sortedArray - The sorted array
     * @param {object[]} data - The array to sort.  It will be sorted in place (as per Javascript sort standard behaviour) and returned at the end.
     * @param {object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
     */
    exports.multiSort = function(array, sorters) {
        if (!sorters.length)
            return array;

        // create a comparison function that takes two values, and tries to sort them according to the provided sorting functions and orders.
        // the sorting functions will be recursively tested if the values a and b are equal until an ordering is established or all or the sorter list is exhausted.
        var sortFunction = function(a, b) {
            var result = recursiveSort(a, b, sorters, 0);
            return result;
        };

        return array.sort(sortFunction);
    };

    /**
     * Takes a SVG element and returns a bounding box of coordinates at each of its compass points
     * @returns {object} return - A bounding box object {nw: ..., n: ..., ne: ..., e: ..., se: ..., s: ..., sw: ..., w: ...}
     * @param {DOMElement} element - The element to measure
     */
    exports.getSVGBoundingBox = function(element) {

        var point = element.ownerSVGElement.createSVGPoint();

        var bbox = {},
            matrix = element.getCTM(),
            tbbox = element.getBBox(),
            width = tbbox.width,
            height = tbbox.height,
            x = tbbox.x,
            y = tbbox.y;

        point.x = x;
        point.y = y;
        bbox.nw = point.matrixTransform(matrix);
        point.x += width;
        bbox.ne = point.matrixTransform(matrix);
        point.y += height;
        bbox.se = point.matrixTransform(matrix);
        point.x -= width;
        bbox.sw = point.matrixTransform(matrix);
        point.y -= height / 2;
        bbox.w = point.matrixTransform(matrix);
        point.x += width;
        bbox.e = point.matrixTransform(matrix);
        point.x -= width / 2;
        point.y -= height / 2;
        bbox.n = point.matrixTransform(matrix);
        point.y += height;
        bbox.s = point.matrixTransform(matrix);

        return bbox;
    };


    exports.valueForKey = function(dictionary, key, keyFunction, valueFunction) {
        var values = dictionary.filter(function(item) {
            return keyFunction(item) === key;
        });
        return valueFunction(values[0]);
    };

    exports.safeString = function(input) {
        return input.split(' ')
            .join('_');
    };

    exports.tryParseInt = function(str, defaultValue) {
        var retValue = defaultValue;
        if (str != null) {
            if ((str.length > 0) && !isNaN(str)) {

                retValue = parseInt(str);
            }
        }
        return retValue;
    };

    // Helper functions for text measurement.  Mock out in tests to remove dependency on window and DOM functions

    exports.getElementStyles = function(textElement, styleProperties) {

        var style = window.getComputedStyle(textElement);
        var properties = {};

        styleProperties.forEach(function(propertyName) {
            try {
                properties[propertyName] = style.getPropertyValue(propertyName);
            } catch (err) {
                // handle this formally when we have a logging framework
                console.log(err);
            }
        });

        return properties;
    };

    exports.getDrawingContext = function(canvas, styles) {

        var ctx = canvas.getContext('2d');
        ctx.font = styles['font-size'] + ' ' + styles['font-family'];

        return ctx;
    };


    return exports;
}());
;insight.DataSet = (function(insight) {
    /**
     * A DataSet is wrapper around a simple object array, but providing some functions that are required by charts to load and filter data.
     * A DataSet should be used with an array of data that is to be charted without being used in a crossfilter or dimensional dataset.
     * @constructor
     * @param {object[]} data - The short name used to identify this dimension, and any linked dimensions sharing the same name
     */
    function DataSet(data) {

        this.data = data;

        this.crossfilterData = null;

        this._orderFunction = function(a, b) {
            return b.value - a.value;
        };

        this._filterFunction = null;
    }

    DataSet.prototype.initialize = function() {

    };

    DataSet.prototype.filterFunction = function(f) {
        if (!arguments.length) {
            return this._filterFunction;
        }
        this._filterFunction = f;
        return this;
    };

    DataSet.prototype.getData = function() {
        var data;
        if (this.data.all) {
            data = this.data.all();
        } else {
            //not a crossfilter set
            data = this.data;
        }

        if (this._filterFunction) {
            data = data.filter(this._filterFunction);
        }

        return data;
    };

    DataSet.prototype.orderFunction = function(o) {
        if (!arguments.length) {
            return this._orderFunction;
        }
        this._orderFunction = o;
        return this;
    };

    DataSet.prototype.filterFunction = function(f) {
        if (!arguments.length) {
            return this._filterFunction;
        }
        this._filterFunction = f;
        return this;
    };

    DataSet.prototype.getOrderedData = function() {
        var data;

        data = this.data.sort(this._orderFunction);

        if (this._filterFunction) {
            data = data.filter(this._filterFunction);
        }

        return data;
    };


    DataSet.prototype.group = function(name, groupFunction, oneToMany) {

        this.crossfilterData = this.crossfilterData ? this.crossfilterData : crossfilter(this.data);

        var dim = new insight.Dimension(name, this.crossfilterData, groupFunction, oneToMany);

        var group = new insight.Grouping(dim);

        return group;
    };

    return DataSet;

})(insight);
;insight.Dimension = (function(insight) {
    /**
     * A Dimension organizes a dataset along a particular property, or variation of a property.
     * Defining a dimension with a function of:<pre><code>function(d){ return d.Surname; }</code></pre> will slice a dataset by the distinct values of the Surname property.
     * @constructor
     * @todo reimplement how Dimensions are created.  Too much is inside ChartGroup at the moment, and ChartGroup is becoming redundant and too mixed
     * @todo display function should be provided by a setter.
     * @param {String} name - The short name used to identify this dimension, and any linked dimensions sharing the same name
     * @param {crossfilter} crossfilter - The crossfilter object to create the Dimension on.
     * @param {function} sliceFunction - The function used to categorize points within the dimension.
     * @param {boolean} oneToMany - Whether or not this dimension represents a collection of possible values in each item.
     * @class
     */
    var Dimension = function Dimension(name, crossfilter, sliceFunction, oneToMany) {

        this.crossfilterDimension = crossfilter.dimension(sliceFunction);
        this.name = name;
        this.filters = [];
        this.oneToMany = oneToMany;

        var self = this;

        var oneToManyFilterFunction = function(filterValue) {
            return function(d) {
                return insight.Utils.arrayContains(d, filterValue);
            };
        };

        var filterFunction = function(filterValue) {
            return function(d) {
                return String(d) === String(filterValue);
            };
        };

        /**
         * Local helper function that creates a filter object given an element that has been clicked on a Chart or Table.
         * The filter object creates the function used by crossfilter to remove or add objects to an aggregation after a filter event.
         * It also includes a simple name variable to use for lookups.
         * @memberof! insight.Dimension
         * @param {object} filteredValue - The value to create a crossfilter filter function for.
         * @returns {function} - A function that a crossfilterdimension.filter() operation can use to map-reduce crossfilter aggregations.
         */
        this.createFilterFunction = function(filteredValue) {

            // create the appropriate type of filter function for this Dimension
            var filterFunc = self.oneToMany ? oneToManyFilterFunction(filteredValue) : filterFunction(filteredValue);

            return {
                name: filteredValue,
                filterFunction: filterFunc
            };
        };

    };

    return Dimension;

})(insight);
;/**
 * A Grouping is generated on a dimension, to reduce the items in the data set into groups along the provided dimension
 * @class insight.Grouping
 * @constructor
 * @param {dimension} dimension - The dimension to group
 */
insight.Grouping = (function(insight) {

    function Grouping(dimension) {

        //private variables

        var sumProperties = [],
            countProperties = [],
            cumulativeProperties = [],
            averageProperties = [],
            ordered = false,
            self = this,
            filterFunction = null,
            orderFunction;


        //public variables

        this.dimension = dimension;

        // Private methods

        // The default post aggregation step is blank, and can be overriden by users if they want to calculate additional values with this Grouping
        var postAggregation = function(grouping) {

        };


        /*
         * This function takes an object and a property name in the form of a string, traversing the object until it finds a property with that name and returning
         * a wrapped object with the immediate parent of the found property and the property's value.
         * @param {object} - The object to search
         * @param {string} propertyName - A string of the property to search, can include sub-properties using a dot notation. Eg. 'value.Revenue.Sum', which cannot be indexed directly in Javascript.
         */
        var getDescendant = function(obj, propertyName) {
            var arr = propertyName.split(".");
            var name = propertyName;
            var container = null;

            while (arr.length) {
                name = arr.shift();
                container = obj;
                obj = obj[name];
            }
            return {
                container: container,
                value: obj,
                propertyName: name
            };
        };

        /*
         * This function takes a group object and calculates the mean for any properties configured.
         * @param {object} group - A dimensional slice of a Grouping {key: 'X', value : {}}
         */
        var calculateAverages = function(group) {


            for (var i = 0, len = averageProperties.length; i < len; i++) {

                var propertyName = averageProperties[i];
                var propertyValue = group.value[propertyName];
                var mean = propertyValue.Sum / group.value.Count;

                mean = insight.Utils.isNumber(mean) && isFinite(mean) ? mean : 0;

                group.value[propertyName].Average = mean;
            }
        };

        /*
         * This method calculates running cumulative values for any properties defined in the cumulative() list.
         * @param {object} group - The data group being added to the cumulative running totals list
         * @param {object} totals - The map object of running totals for the defined properties
         */
        var calculateCumulativeValues = function(group, totals) {

            var propertyName,
                descendant;

            for (var i = 0, len = cumulativeProperties.length; i < len; i++) {

                propertyName = cumulativeProperties[i];
                descendant = getDescendant(group.value, propertyName);

                var totalName = descendant.propertyName + 'Cumulative';

                totals[totalName] = totals[totalName] ? totals[totalName] + descendant.value : descendant.value;

                descendant.container[totalName] = totals[totalName];

            }

            return totals;
        };

        /*
         * This method is used to calculate any values that need to run after the data set has been aggregated into groups and basic values
         */
        var postAggregationCalculations = function() {

            var totals = {};

            var data = self.ordered() ? self.getData(self.orderFunction()) : self.getData();

            data.forEach(function(d) {

                calculateAverages(d);

                calculateCumulativeValues(d, totals);

            });

            // Run any user injected functions post aggregation
            postAggregation(self);
        };

        /*
         * This function is called by the map reduce process on a DataSet when an input object is being added to the aggregated group
         * @returns {object} group - The group entry for this slice of the aggregated dataset, modified by the addition of the data object
         * @param {object} group - The group entry for this slice of the aggregated dataset, prior to adding the input data object
         * @param {object} data - The object being added from the aggregated group.
         */
        var reduceAddToGroup = function(group, data) {

            group.Count++;

            var propertyName,
                i,
                len;

            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    group[propertyName].Sum += data[propertyName];
                }
            }

            // Increment the counts of the different occurences of any properties defined. E.g: if a property 'Country' can take multiple string values, 
            // this counts the occurences of each distinct value the property takes
            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];

                var groupProperty = group[propertyName];

                if (data.hasOwnProperty(propertyName)) {

                    var propertyValue = data[propertyName];

                    // If this property holds multiple values, increment the counts for each one.
                    if (insight.Utils.isArray(propertyValue)) {

                        for (var subIndex in propertyValue) {
                            var subVal = propertyValue[subIndex];
                            //Initialize or increment the count for this occurence of the property value
                            group[propertyName][subVal] = groupProperty.hasOwnProperty(subVal) ? groupProperty[subVal] + 1 : 1;
                            group[propertyName].Total++;
                        }
                    } else {
                        group[propertyName][propertyValue] = groupProperty.hasOwnProperty(propertyValue) ? groupProperty[propertyValue] + 1 : 1;
                        group[propertyName].Total++;
                    }
                }
            }


            return group;
        };

        /*
         * This function is called by the map reduce process on a DataSet when an input object is being filtered out of the group
         * @returns {object} group - The group entry for this slice of the aggregated dataset, modified by the removal of the data object
         * @param {object} group - The group entry for this slice of the aggregated dataset, prior to removing the input data object
         * @param {object} data - The object being removed from the aggregated group.
         */
        var reduceRemoveFromGroup = function(group, data) {

            group.Count--;

            var propertyName,
                i,
                len;

            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    group[propertyName].Sum -= data[propertyName];
                }
            }

            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];

                if (data.hasOwnProperty(propertyName)) {

                    var propertyValue = data[propertyName];

                    if (insight.Utils.isArray(propertyValue)) {

                        for (var subIndex in propertyValue) {
                            var subVal = propertyValue[subIndex];
                            group[propertyName][subVal] = group[propertyName].hasOwnProperty(subVal) ? group[propertyName][subVal] - 1 : 0;
                            group[propertyName].Total--;
                        }

                    } else {
                        group[propertyName][propertyValue] = group[propertyName].hasOwnProperty(propertyValue) ? group[propertyName][propertyValue] - 1 : 0;
                        group[propertyName].Total--;
                    }
                }
            }

            return group;
        };

        /*
         * This method is called when a slice of an aggrgated DataSet is being initialized, creating initial values for certain properties
         * @returns {object} return - The initialized slice of this aggreagted DataSet.  The returned object will be of the form {key: 'Distinct Key', value: {}}
         */
        var reduceInitializeGroup = function() {
            var group = {
                    Count: 0
                },
                propertyName,
                i,
                len;


            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                group[propertyName] = group[propertyName] ? group[propertyName] : {};
                group[propertyName].Sum = 0;
            }

            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];
                group[propertyName] = group[propertyName] ? group[propertyName] : {};
                group[propertyName].Total = 0;
            }

            return group;
        };




        /*
         * This aggregation method is tailored to dimensions that can hold multiple values (in an array), therefore they are counted differently.
         * For example: a property called supportedDevices : ['iPhone5', 'iPhone4'] where the values inside the array are treated as dimensional slices
         * @returns {object[]} return - the array of dimensional groupings resulting from this dimensional aggregation
         */
        var reduceMultidimension = function() {

            var propertiesToCount = self.count();

            var propertyName,
                i,
                index = 0,
                len,
                gIndices = {};

            function reduceAdd(p, v) {

                for (i = 0, len = propertiesToCount.length; i < len; i++) {

                    propertyName = propertiesToCount[i];

                    if (v.hasOwnProperty(propertyName)) {
                        for (var val in v[propertyName]) {
                            if (typeof(gIndices[v[propertyName][val]]) !== "undefined") {
                                var gIndex = gIndices[v[propertyName][val]];

                                p.values[gIndex].value++;
                            } else {
                                gIndices[v[propertyName][val]] = index;

                                p.values[index] = {
                                    key: v[propertyName][val],
                                    value: 1
                                };

                                index++;
                            }
                        }
                    }
                }
                return p;
            }

            function reduceRemove(p, v) {
                for (i = 0, len = propertiesToCount.length; i < len; i++) {

                    propertyName = propertiesToCount[i];

                    if (v.hasOwnProperty(propertyName)) {
                        for (var val in v[propertyName]) {
                            var property = v[propertyName][val];

                            var gIndex = gIndices[property];

                            p.values[gIndex].value--;
                        }
                    }
                }
                return p;
            }

            function reduceInitial() {

                return {
                    values: []
                };
            }

            data = self.dimension.crossfilterDimension.groupAll()
                .reduce(reduceAdd, reduceRemove, reduceInitial);

            self.orderFunction(function(a, b) {
                return b.value - a.value;
            });

            return data;
        };


        // Public methods


        /**
         * Gets the function that will run after the map reduce stage of this Grouping's aggregation. This is an empty function by default, and can be overriden by the setter.
         * @instance
         * @memberof! insight.Grouping
         * @returns {function} - The function that will run after aggregation of this Grouping.
         * @also
         * Sets the function that will run after any aggregation has been performed on this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} postAggregationFunc - A user defined function of the form function(grouping), that the Grouping will run post aggregation.
         */
        this.postAggregation = function(postAggregationFunc) {
            if (!arguments.length) {
                return postAggregation;
            }
            postAggregation = postAggregationFunc;
            return this;
        };

        /**
         * Returns the list of properties to be summed on this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names that will be summed
         * @also
         * Sets the list of property names that will be summed in this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of property names to be summed for slices in this Grouping.
         */
        this.sum = function(properties) {
            if (!arguments.length) {
                return sumProperties;
            }
            sumProperties = properties;
            return this;
        };

        /**
         * Returns the list of properties that will be cumulatively summed over this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names that will be cumulatively summed
         * @also
         * Sets the list of properties that will be cumulatively summed over this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of property names to be cumulatively summed over slices in this Grouping.
         */
        this.cumulative = function(properties) {
            if (!arguments.length) {
                return cumulativeProperties;
            }
            cumulativeProperties = properties;
            return this;
        };

        /**
         * Returns the array of properties whose distinct value occurences will be counted during the reduction of this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names whose values will be counted
         * @also
         * Sets the array of properties whose distinct value occurences will be counted during the reduction of this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of properties whose distinct value occurences will be counted during the reduction of this Grouping
         */
        this.count = function(properties) {
            if (!arguments.length) {
                return countProperties;
            }
            countProperties = properties;
            return this;
        };

        /**
         * Returns the array of properties whose mean will be calculated after the map reduce of this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names that will averaged
         * @also
         * Sets the array of properties whose mean will be calculated after the map reduce of this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of properties that will be averaged after the map reduce of this Grouping.
         */
        this.mean = function(properties) {
            if (!arguments.length) {
                return averageProperties;
            }
            averageProperties = properties;

            sumProperties = insight.Utils.arrayUnique(sumProperties.concat(averageProperties));

            return this;
        };

        /**
         * Gets or sets the function used to compare the elements in this grouping if sorting is requested.
         * @instance
         * @memberof! insight.Grouping
         * @returns {function} orderingFunction - The function used to compare two values when sort() is called on an array
         * @also
         * Sets the function used to compare the elements in this grouping if sorting is requested.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {function} function - The comparison function to be used to sort the elements in this group.  The function should take the form of a standard {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/GlobalvalueObjects/Array/sort|Javascript comparison function}.
         */
        this.orderFunction = function(orderingFunction) {
            if (!arguments.length) {
                return orderFunction;
            }
            orderFunction = orderingFunction;
            return this;
        };


        /**
         * Gets or sets whether the group's data is ordered.
         * @instance
         * @memberof! insight.Grouping
         * @returns {boolean}
         * @also
         * Sets if this Grouping will be ordered or not
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {boolean} ordered - Whether to order this Grouping or not
         */
        this.ordered = function(value) {
            if (!arguments.length) {
                return ordered;
            }
            ordered = value;

            return this;
        };

        /**
         * The filter method gets or sets the function used to filter the results returned by this grouping.
         * @param {function} filterFunction - A function taking a parameter representing an object in the list.  The function must return true or false as per <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/GlobalvalueObjects/Array/filter">Array Filter</a>.
         */
        this.filter = function(f) {
            if (!arguments.length) {
                return filterFunction;
            }
            filterFunction = f;
            return this;
        };




        /**
         * This method is called when any post aggregation calculations need to be recalculated.
         * For example, calculating group percentages after totals have been created during map-reduce.
         * @memberof! insight.Grouping
         * @instance
         */
        this.recalculate = function() {

            postAggregationCalculations();
        };

        /**
         * This method performs the aggregation of the underlying crossfilter dimension, calculating any additional properties during the map-reduce phase.
         * It must be run prior to a group being used
         * @todo This should probably be run during the constructor? If not, lazily evaluated by getData() if it hasn't been run already.
         */
        this.initialize = function() {

            var data;

            if (self.dimension.oneToMany) {
                // Dimensions that are one to many {supportedLanguages: ['EN', 'DE']} as opposed to {supportedLanguage: 'EN'} need to be aggregated differently
                data = reduceMultidimension();
            } else {
                // this is crossfilter code.  It calls the crossfilter.group().reduce() functions on the crossfilter dimension wrapped inside our insight.Dimension
                // more info at https://github.com/square/crossfilter/wiki/API-Reference
                // the add, remove and initialie functions are called when crossfilter is aggregating the groups, and is amending the membership of the different 
                // dimensional slices (groups) 
                data = self.dimension.crossfilterDimension.group()
                    .reduce(
                        reduceAddToGroup,
                        reduceRemoveFromGroup,
                        reduceInitializeGroup
                );
            }

            self.data = data;

            postAggregationCalculations(self);

            return this;
        };


        /**
         * This method is used to return the group's data, without ordering.  It checks if there is any filtering requested and applies the filter to the return array.
         * @memberof! insight.Grouping
         * @instance
         * @returns {object[]} return - The grouping's data in an object array, with an object per slice of the dimension.
         */
        this.getData = function(orderFunction, top) {
            var data;

            // Set the provided order function if it has been given, otherwise use the inherent grouping order if one has been defined.
            var orderFunc = orderFunction ? orderFunction : self.orderFunction();

            if (!self.data) {
                self.initialize();
            }

            if (this.dimension.oneToMany) {
                data = self.data.value()
                    .values;
            } else {
                data = self.data.all();
            }

            // take a copy of the array to not alter the original dataset
            data = data.slice(0);

            if (orderFunc) {
                data = data.sort(orderFunc);
            }
            if (top) {
                data = data.slice(0, top);
            }

            if (filterFunction) {
                data = data.filter(filterFunction);
            }

            return data;
        };

    }

    return Grouping;

})(insight);
;(function(insight) {

    /**
     * The ChartGroup class is a container for Charts and Tables, linking them together
     * and coordinating cross chart filtering and styling.
     * @class insight.ChartGroup
     */

    insight.ChartGroup = (function(insight) {

        function ChartGroup() {

            this.charts = [];
            this.tables = [];
            this.groupings = [];
            this.dimensions = [];
            this.filteredDimensions = [];
            this.dimensionListenerMap = {};

            // private variables
            var self = this;

            // private methods

            /*
             * This internal function responds to click events on Series and Tables,
             * alerting any other elements using the same Dimension that they need to
             * update to highlight the selected slices of the Dimension
             */
            var notifyListeners = function(dimensionName, dimensionSelector) {
                var listeningObjects = self.dimensionListenerMap[dimensionName];

                listeningObjects.forEach(function(item) {
                    item.highlight(dimensionSelector);
                });
            };

            /*
             * This function takes a list of series and binds the click events of each one to the ChartGroup
             * filtering handler. It also adds the series' dataset to the internal list.
             */
            var addSeries = function(chart) {
                chart.series()
                    .forEach(function(series) {

                        addDimensionListener(series.data, chart);

                        series.clickEvent = self.chartFilterHandler;

                        addDataSet(series.data);
                    });
            };

            /* 
             * This function is called when a Chart belonging to this ChartGroup updates its list of Series.
             * The ChartGroup needs to register the click events and any crossfilter dimensions belonging to
             * the Series.
             */
            var newSeries = function(chart, series) {

                addSeries(chart, series);
            };


            /* 
             * This function checks if the provided DataSet is crossfilter enabled,
             * and if so, adds its components to internal lists of Groupings and Dimensions.
             */
            var addDataSet = function(dataset) {

                // If this is a crossfilter enabled DataSet (aggregated and filter enabled)
                var crossfilterEnabled = dataset.dimension;

                if (crossfilterEnabled) {

                    // Add Grouping and Dimension to internal lists if they are not already there             
                    insight.Utils.addToSet(self.groupings, dataset);
                    insight.Utils.addToSet(self.dimensions, dataset.dimension);
                }
            };

            /*
             * Adds a Table to this ChartGroup, wiring up the Table's events to any
             * related Charts or Tables in the ChartGroup.
             * @memberof! insight.ChartGroup
             * @instance
             */
            var addTable = function(table) {

                // wire up the click event of the table to the filter handler of the DataSet
                table.clickEvent = self.chartFilterHandler.bind(self);

                addDimensionListener(table.data, table);

                self.tables.push(table);

                return table;
            };


            /*
             * Adds a Chart to this ChartGroup, wiring up the click events of each Series to the filter handler
             * @memberof! insight.ChartGroup
             * @instance
             */
            var addChart = function(chart) {

                chart.seriesChanged = newSeries;

                addSeries(chart);

                self.charts.push(chart);

                return chart;
            };


            /*
             * Given a DataSet and a widget (Table or Chart), this function adds the widget
             * to the map of items subscribed to events on that Dimension,
             * only if the provided DataSet is a crossfilter enabled one that exposes a dimension property.
             */
            var addDimensionListener = function(dataset, widget) {
                var dimension = dataset ? dataset.dimension : null;

                if (dimension) {
                    var listeningObjects = self.dimensionListenerMap[dimension.name];

                    if (listeningObjects) {

                        var alreadyListening = insight.Utils.arrayContains(listeningObjects, widget);

                        if (!alreadyListening) {
                            self.dimensionListenerMap[dimension.name].push(widget);
                        }
                    } else {
                        self.dimensionListenerMap[dimension.name] = [widget];
                    }
                }
            };

            // public methods


            /**
             * Adds an item to this ChartGroup, calling the appropriate internal addChart or addTable function
             * depending on the type.
             * @memberof! insight.ChartGroup
             * @instance
             * @param {object} widget - An insight.Table or insight.Chart
             * @returns {this}
             */
            this.add = function(widget) {
                if (widget instanceof insight.Chart) {
                    addChart(widget);
                } else if (widget instanceof insight.Table) {
                    addTable(widget);
                }
                return self;
            };

            /**
             * Draws all Charts and Tables in this ChartGroup
             * @memberof! insight.ChartGroup
             * @instance
             */
            this.draw = function() {

                self.charts.forEach(function(chart) {
                    chart.draw();
                });

                self.tables.forEach(function(table) {
                    table.draw();
                });
            };

            /**
             * Method handler that is bound by the ChartGroup to the click events of any chart series or table rows,
             * if the DataSets used by those entities are crossfilter enabled.
             * It notifies any other listening charts of the dimensional selection event, which they can respond to
             * by applying CSS highlighting etc.
             * @memberof! insight.ChartGroup
             * @instance
             * @param {object} dataset - The insight.DataSet or insight.Grouping being filtered
             * @param {string} value - The value that the dimension is being sliced/filtered by.
             */
            this.chartFilterHandler = function(dataset, value) {

                var dimensionSelector = insight.Utils.keySelector(value);

                // send events to any charts or tables also using this dimension, as they will need to update their
                // styles to reflect the selection
                notifyListeners(dataset.dimension.name, dimensionSelector);

                var dimension = dataset.dimension;

                var filterFunc = dimension.createFilterFunction(value);
                var nameProperty = 'name';

                // get the list of any dimensions matching the one that is being filtered
                var dims = insight.Utils.takeWhere(self.dimensions, nameProperty, dimension.name);

                // get the list of matching dimensions that are already filtered
                var activeDim = insight.Utils.takeWhere(self.filteredDimensions, nameProperty, dimension.name);

                // add the new filter to the list of active filters if it's not already active
                if (!activeDim.length) {
                    self.filteredDimensions.push(dimension);
                }

                // loop through the matching dimensions to filter them all
                dims.map(function(dim) {

                    var filterExists = insight.Utils.takeWhere(dim.filters, nameProperty, filterFunc.name)
                        .length;

                    //if the dimension is already filtered by this value, toggle (remove) the filter
                    if (filterExists) {
                        insight.Utils.removeWhere(dim.filters, nameProperty, filterFunc.name);

                    } else {
                        // add the provided filter to the list for this dimension

                        dim.filters.push(filterFunc);
                    }

                    // reset this dimension if no filters exist, else apply the filter to the dataset.
                    if (dim.filters.length === 0) {

                        insight.Utils.removeItemFromArray(self.filteredDimensions, dim);
                        dim.crossfilterDimension.filterAll();

                    } else {
                        dim.crossfilterDimension.filter(function(d) {

                            // apply all of the filters on this dimension to the current value, returning an array of 
                            // true/false values (which filters does it satisfy)
                            var vals = dim.filters
                                .map(function(func) {
                                    return func.filterFunction(d);
                                });

                            // if this value satisfies any of the filters, it should be kept
                            var matchesAnyFilter = vals.filter(function(result) {
                                    return result;
                                })
                                .length > 0;

                            return matchesAnyFilter;
                        });
                    }
                });

                // the above filtering will have triggered a re-aggregation of the groupings.  We must manually
                // initiate the recalculation of the groupings for any post aggregation calculations
                self.groupings.forEach(function(group) {
                    group.recalculate();

                });

                self.draw();

            };
        }

        return ChartGroup;

    })(insight);
})(insight);
;(function(insight) {

    /**
     * The Chart class is the element in which series and axes are drawn
     * @class insight.Chart
     * @param {string} name - A uniquely identifying name for this chart
     * @param {string} element - The css selector identifying the div container that the chart will be drawn in. '#columnChart' for example.
     */
    insight.Chart = (function(insight) {

        function Chart(name, element) {

            this.name = name;
            this.element = element;
            this.selectedItems = [];
            this.container = null;
            this.chart = null;
            this.measureCanvas = document.createElement('canvas');
            this.marginMeasurer = new insight.MarginMeasurer();


            var margin = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };

            this.legendView = null;

            var height = d3.functor(300),
                width = d3.functor(300),
                maxWidth = d3.functor(300),
                minWidth = d3.functor(300),
                zoomable = false,
                series = [],
                xAxes = [],
                yAxes = [],
                self = this,
                title = '',
                autoMargin = true,
                legend = null,
                zoomInitialized = false,
                initialized = false,
                zoomAxis = null,
                highlightSelector = insight.Utils.highlightSelector();

            // private functions

            var onWindowResize = function() {

                var scrollBarWidth = 50;
                var left = self.container[0][0].offsetLeft;

                var widthWithoutScrollBar =
                    window.innerWidth -
                    left -
                    scrollBarWidth;

                self.resizeWidth(widthWithoutScrollBar);

            };

            var init = function(create, container) {

                window.addEventListener('resize', onWindowResize);

                self.container = create ? d3.select(container)
                    .append('div') : d3.select(self.element)
                    .append('div');

                self.container
                    .attr('class', insight.Constants.ContainerClass)
                    .style('position', 'relative')
                    .style('display', 'inline-block');

                self.chartSVG = self.container
                    .append('svg')
                    .attr('class', insight.Constants.ChartSVG);

                self.plotArea = self.chartSVG.append('g')
                    .attr('class', insight.Constants.PlotArea);

                // create the empty text element used by the text measuring process
                self.axisMeasurer = self.plotArea
                    .append('text')
                    .attr('class', insight.Constants.AxisTextClass);

                self.labelMeasurer = self.container
                    .append('text')
                    .attr('class', insight.Constants.AxisLabelClass);

                self.addClipPath();

                initialized = true;
            };


            var initZoom = function() {

                self.zoom = d3.behavior.zoom()
                    .on('zoom', self.dragging.bind(self));

                self.zoom.x(zoomAxis.scale);

                if (!self.zoomExists()) {
                    //Draw ourselves as the first element in the plot area
                    self.plotArea.insert('rect', ':first-child')
                        .attr('class', 'zoompane')
                        .attr('width', self.width())
                        .attr('height', self.height() - self.margin()
                            .top - self.margin()
                            .bottom)
                        .style('fill', 'none')
                        .style('pointer-events', 'all');
                }

                self.plotArea.select('.zoompane')
                    .call(self.zoom);

                zoomInitialized = true;
            };

            // public methods

            /** 
             * Empty event handler that is overridden by any listeners who want to know when this Chart's series change
             * @memberof! insight.Chart
             * @param {insight.Series[]} series - An array of insight.Series belonging to this Chart
             */
            this.seriesChanged = function(series) {

            };



            this.draw = function(dragging) {

                if (!initialized) {
                    init();
                }

                this.resizeChart();

                var axes = xAxes.concat(yAxes);

                axes.map(function(axis) {
                    axis.draw(self, dragging);
                });

                this.series()
                    .map(function(series) {
                        series.draw(self, dragging);
                    });

                if (legend !== null) {
                    legend.draw(self, self.series());
                }

                if (zoomable && !zoomInitialized) {
                    initZoom();
                }
            };

            this.addClipPath = function() {
                this.plotArea.append('clipPath')
                    .attr('id', this.clipPath())
                    .append('rect')
                    .attr('x', 1)
                    .attr('y', 0)
                    .attr('width', this.width() - this.margin()
                        .left - this.margin()
                        .right)
                    .attr('height', this.height() - this.margin()
                        .top - this.margin()
                        .bottom);
            };

            /**
             * Resizes the chart width according to the given window width within the chart's own minimum and maximum width
             * @memberof! insight.Chart
             * @instance
             * @param {Number} windowWidth The current window width to resize against
             */
            this.resizeWidth = function(windowWidth) {

                var self = this;


                if (this.width() > windowWidth && this.width() !== this.minWidth()) {

                    doResize(Math.max(this.minWidth(), windowWidth));

                } else if (this.width() < windowWidth && this.width() !== this.maxWidth()) {

                    doResize(Math.min(this.maxWidth(), windowWidth));

                }


                function doResize(newWidth) {

                    self.width(newWidth, true);
                    self.draw();
                }

            };

            this.resizeChart = function() {

                if (autoMargin) {

                    var axisStyles = insight.Utils.getElementStyles(self.axisMeasurer.node(), ['font-size', 'line-height', 'font-family']);
                    var labelStyles = insight.Utils.getElementStyles(self.labelMeasurer.node(), ['font-size', 'line-height', 'font-family']);

                    self.calculateLabelMargin(self.marginMeasurer, axisStyles, labelStyles);
                }

                var chartMargin = self.margin();

                var context = self.measureCanvas.getContext('2d');

                self.container.style('width', self.width() + 'px');

                self.chartSVG
                    .attr('width', self.width())
                    .attr('height', self.height());

                self.plotArea = this.plotArea
                    .attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');

                self.plotArea.select('#' + self.clipPath())
                    .append('rect')
                    .attr('x', 1)
                    .attr('y', 0)
                    .attr('width', self.width() - chartMargin.left - chartMargin.right)
                    .attr('height', self.height() - chartMargin.top - chartMargin.bottom);
            };


            /**
             * Enable zooming for an axis on this chart
             * @memberof! insight.Chart
             * @instance
             * @param axis The axis to enable zooming for
             * @returns {Chart} Returns this.
             */
            this.zoomable = function(axis) {
                zoomable = true;
                zoomAxis = axis;
                axis.zoomable(true);
                return this;
            };



            this.zoomExists = function() {
                var z = this.plotArea.selectAll('.zoompane');
                return z[0].length;
            };

            this.dragging = function() {
                self.draw(true);
            };

            /**
             * The margins to use around the chart (top, bottom, left, right), each measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @returns {object} - The current margins of the chart.
             *
             * @also
             *
             * Sets the margins to use around the chart (top, bottom, left, right), each measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @param {object} margins The new margins to use around the chart.
             * @returns {this}
             */
            this.margin = function(newMargins) {
                if (!arguments.length) {
                    return margin;
                }

                autoMargin = false;
                margin = newMargins;

                return this;
            };

            this.clipPath = function() {

                return insight.Utils.safeString(this.name) + 'clip';
            };


            this.title = function(_) {
                if (!arguments.length) {
                    return title;
                }

                title = _;
                return this;
            };

            /**
             * The width of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @returns {Number} - The current width of the chart.
             *
             * @also
             *
             * Sets the width of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @param {Number} newWidth The new width of the chart.
             * @param {Boolean} dontSetMax If falsey then the maxWidth of the chart will also be set to newWidth.
             * @returns {this}
             */
            this.width = function(newWidth, dontSetMax) {
                if (!arguments.length) {
                    return width();
                }

                if (!dontSetMax) {

                    this.maxWidth(newWidth);

                }

                width = d3.functor(newWidth);
                return this;
            };

            /**
             * The height of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @returns {Number} - The current height of the chart.
             *
             * @also
             *
             * Sets the height of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @param {Number} newHeight The new height of the chart, measured in pixels.
             * @returns {this}
             */
            this.height = function(newHeight) {
                if (!arguments.length) {
                    return height();
                }
                height = d3.functor(newHeight);
                return this;
            };

            /**
             * The maximum width of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @returns {Number} - The maximum width of the chart.
             *
             * @also
             *
             * Sets the maximum width of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @param {Number} newMaxWidth The new maximum width of the chart, measured in pixels.
             * @returns {this}
             */
            this.maxWidth = function(newMaxWidth) {
                if (!arguments.length) {
                    return maxWidth();
                }

                maxWidth = d3.functor(newMaxWidth);
                return this;
            };

            /**
             * The minimum width of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @returns {Number} - The minimum width of the chart.
             *
             * @also
             *
             * Sets the minimum width of the chart element, measured in pixels.
             * @memberof! insight.Chart
             * @instance
             * @param {Number} newMinWidth The new minimum width of the chart, measured in pixels.
             * @returns {this}
             */
            this.minWidth = function(newMinWidth) {
                if (!arguments.length) {
                    return minWidth();
                }

                minWidth = d3.functor(newMinWidth);
                return this;
            };

            /**
             * The series to draw on this chart.
             * @memberof! insight.Chart
             * @instance
             * @returns {Series[]} - The current series drawn on the chart.
             *
             * @also
             *
             * Sets the series to draw on this chart.
             * @memberof! insight.Chart
             * @instance
             * @param {Series[]} newSeries The new series to draw on the chart.
             * @returns {this}
             */
            this.series = function(newSeries) {
                if (!arguments.length) {
                    return series;
                }
                series = newSeries;

                self.seriesChanged(self, newSeries);

                return this;
            };

            /**
             * The legend to draw on this chart.
             * @memberof! insight.Chart
             * @instance
             * @returns {Legend} - The current legend drawn on the chart.
             *
             * @also
             *
             * Sets the legend to draw on this chart.
             * @memberof! insight.Chart
             * @instance
             * @param {Legend} newLegend The new legend to draw on the chart.
             * @returns {this}
             */
            this.legend = function(newLegend) {
                if (!arguments.length) {
                    return legend;
                }

                legend = newLegend;

                return this;
            };

            /**
             * Add a new x-axis to the chart.
             *
             * @memberof! insight.Chart
             * @instance
             * @param {Axis} [axis] The x-axis to add.
             * @returns {this}
             */
            this.addXAxis = function(axis) {
                axis.direction = 'h';
                xAxes.push(axis);
                return this;
            };

            /**
             * All of the x-axes on the chart.
             * @memberof! insight.Chart
             * @instance
             * @returns {Axis[]} - The current x-axes of the chart.
             *
             * @also
             *
             * Sets the x-axes on the chart.
             * @memberof! insight.Chart
             * @instance
             * @param {Axis[]} newXAxes The new x-axes to draw on the chart.
             * @returns {this}
             */
            this.xAxes = function(newXAxes) {
                if (!arguments.length) {
                    return xAxes;
                }

                //Wipe out all existing axes
                xAxes = [];

                for (var index = 0; index < newXAxes.length; index++) {
                    self.addXAxis(newXAxes[index]);
                }

                return this;
            };

            /**
             * The primary x-axis on the chart.
             * @memberof! insight.Chart
             * @instance
             * @returns {Axis} - The current primary x-axis of the chart.
             *
             * @also
             *
             * Sets the primary x-axis on the chart.
             * @memberof! insight.Chart
             * @instance
             * @param {Axis} xAxis The new primary x-axis of the chart.
             * @returns {this}
             */
            this.xAxis = function(xAxis) {
                if (!arguments.length) {
                    return xAxes[0];
                }

                var newXAxes = xAxes.slice(0);
                newXAxes[0] = xAxis;
                return this.xAxes(newXAxes);
            };

            /**
             * Add a new y-axis to the chart.
             *
             * @memberof! insight.Chart
             * @instance
             * @param {Axis} [axis] The y-axis to add.
             * @returns {this}
             */
            this.addYAxis = function(axis) {
                axis.direction = 'v';
                yAxes.push(axis);
                return this;
            };

            /**
             * All of the y-axes on the chart.
             * @memberof! insight.Chart
             * @instance
             * @returns {Axis[]} - The current y-axes of the chart.
             *
             * @also
             *
             * Sets the y-axes on the chart.
             * @memberof! insight.Chart
             * @instance
             * @param {Axis[]} newYAxes The new y-axes to draw on the chart.
             * @returns {this}
             */
            this.yAxes = function(newYAxes) {
                if (!arguments.length) {
                    return yAxes;
                }

                //Wipe out all existing axes
                yAxes = [];

                for (var index = 0; index < newYAxes.length; index++) {
                    self.addYAxis(newYAxes[index]);
                }

                return this;
            };

            /**
             * The primary y-axis on the chart.
             * @memberof! insight.Chart
             * @instance
             * @returns {Axis} - The current primary y-axis of the chart.
             *
             * @also
             *
             * Sets the primary y-axis on the chart.
             * @memberof! insight.Chart
             * @instance
             * @param {Axis} yAxis The new primary y-axis of the chart.
             * @returns {this}
             */
            this.yAxis = function(yAxis) {
                if (!arguments.length) {
                    return yAxes[0];
                }

                var newYAxes = yAxes.slice(0);
                newYAxes[0] = yAxis;
                return this.yAxes(newYAxes);
            };


            this.autoMargin = function(_) {
                if (!arguments.length) {
                    return autoMargin;
                }
                autoMargin = _;
                return this;
            };

            /**
             * Takes a CSS selector and applies classes to chart elements to show them as selected or not.
             * in response to a filtering event.
             * and something else is.
             * @memberof! insight.Chart
             * @param {string} selector - a CSS selector matching a slice of a dimension. eg. an entry in a grouping by Country 
                                          would be 'in_England', which would match that dimensional value in any charts.
             */
            this.highlight = function(selector) {
                var clicked = self.plotArea.selectAll('.' + selector);
                var alreadySelected = insight.Utils.arrayContains(self.selectedItems, selector);

                if (alreadySelected) {
                    clicked.classed('selected', false);
                    insight.Utils.removeItemFromArray(self.selectedItems, selector);
                } else {
                    clicked.classed('selected', true)
                        .classed('notselected', false);
                    self.selectedItems.push(selector);
                }


                // depending on if anything is selected, we have to update the rest as notselected so that they are coloured differently
                var selected = self.plotArea.selectAll('.selected');
                var notselected = self.plotArea.selectAll(highlightSelector);

                // if nothing is selected anymore, clear the .notselected class from any elements (stop showing them as gray)
                notselected.classed('notselected', selected[0].length > 0);
            };

        }

        /**
         * Sets the margin for the Chart by using a MarginMEasurer to measure the required label and axis widths for
         * the contents of this Chart
         * @memberof! insight.Chart
         * @instance
         * @param {DOMElement} measurer - A canvas HTML element to use by the measurer.  Specific to each chart as
         *                                each chart may have specific css rules
         * @param {object} axisStyles - An associative map between css properties and values for the axis values
         * @param {object} labelStyles - An associative map between css properties and values for the axis labels
         */
        Chart.prototype.calculateLabelMargin = function(measurer, axisStyles, labelStyles) {

            // labelStyles can be optional.  If so, use the same as the axisStyles
            labelStyles = labelStyles ? labelStyles : axisStyles;

            var margin = measurer.calculateChartMargins(this.series(), this.measureCanvas, axisStyles, labelStyles);

            this.margin(margin);
        };

        return Chart;

    })(insight);
})(insight);
;(function(insight) {

    insight.Table = (function() {

        /**
         * The Table class draws HTML tables from DataSets
         * @class insight.Table
         * @param {string} name - A uniquely identifying name for this table
         * @param {string} element - The css selector identifying the div container that the table will be drawn in. '#dataTable' for example.
         * @param {DataSet} dataset - The DataSet to render this Table from
         */
        function Table(name, element, dataset) {

            // Publicly accessible properties

            this.name = name;
            this.element = element;
            this.data = dataset;
            this.selectedItems = [];

            // private variables

            var self = this,
                columnProperties = [],
                tableInitialized = false,
                header,
                sortFunctions = [],
                topValues = null;


            // private methods

            var labelFunction = function(d) {
                return d.label;
            };
            var keyFunction = function(d) {
                return d.key;
            };
            var valueFunction = function(d) {
                return d.value;
            };

            var columnBuilder = function(row) {

                return self.columns()
                    .map(function(column) {
                        return {
                            column: column,
                            value: column.value(row)
                        };
                    });
            };


            // Creates the main <table>, <thead> and <tbody> sections of this Table
            var initializeTable = function() {
                self.tableElement = d3.select(self.element)
                    .append('table')
                    .attr('class', insight.Constants.TableClass);

                header = self.tableElement.append('thead')
                    .append('tr');

                header.append('th')
                    .attr('class', 'blank')
                    .html('');

                self.tableBody = self.tableElement.append('tbody');

                tableInitialized = true;
            };


            var rowClass = function(dataPoint) {
                return insight.Constants.TableRowClass + ' ' + insight.Utils.keySelector(dataPoint, keyFunction);
            };


            var click = function(dataItem) {

                var selector = insight.Utils.keySelector(dataItem, keyFunction);

                self.clickEvent(self, dataItem, selector);
            };

            // Adds sorters to this Table's list of sorting methods and orders.
            // @param {string} order - 'ASC' or 'DESC'
            var addSortOrder = function(func, order) {
                var sort = {
                    sortParameter: func,
                    order: order
                };

                sortFunctions.push(sort);
            };

            // Public methods

            /**
             * The properties of the DataSet to use as columns.
             * @memberof! insight.Table
             * @instance
             * @returns {object[]} - The current properties used as columns, of the form {'label':... , 'value':... }.
             *
             * @also
             *
             * Sets the properties of the DataSet to use as columns.
             * @memberof! insight.Table
             * @instance
             * @param {object[]} columnProperties - The new properties to use as columns, of the form {'label':... , 'value':... }.
             * @returns {this}
             */
            this.columns = function(value) {
                if (!arguments.length) {
                    return columnProperties;
                }
                columnProperties = value;
                return this;
            };


            /**
             * The key function to use for this Table.
             * @memberof! insight.Table
             * @instance
             * @returns {function} - The function to use as the key accessor for this Table
             *
             * @also
             *
             * Sets the properties of the DataSet to use as columns.
             * @memberof! insight.Table
             * @instance
             * @param {function} keyFunc - The function to use as the key accessor for this Table
             * @returns {this}
             */
            this.keyFunction = function(keyFunc) {
                if (!arguments.length) {
                    return keyFunction;
                }
                keyFunction = keyFunc;
                return this;
            };

            /**
             * This method adds an ascending sort to this Table's rows using the provided function as a comparison
             * @memberof! insight.Table
             * @instance
             * @param {function} sortFunction A function extracting the property to sort on from a data object.
             * @returns {object} this Returns the Table object
             */
            this.ascending = function(sortFunction) {

                addSortOrder(sortFunction, 'ASC');

                return this;
            };


            /**
             * Adds a descending sort to this Table's rows using the provided function as a comparison
             * @memberof! insight.Table
             * @instance
             * @param {function} sortFunction A function extracting the property to sort on from a data object.
             * @returns {object} this Returns the Table object.
             */
            this.descending = function(sortFunction) {

                addSortOrder(sortFunction, 'DESC');

                return this;
            };

            /**
             * The number of rows to display. Used in combination with ascending() or descending() to display top or bottom data.
             * @memberof! insight.Table
             * @instance
             * @returns {Number} - The maximum number of top values being displayed.
             *
             * @also
             *
             * Sets the number of rows to display. Used in combination with ascending() or descending() to display top or bottom data.
             * @memberof! insight.Table
             * @instance
             * @param {Number} topValueCount How many values to display in the Table.
             * @returns {this}
             */
            this.top = function(top) {
                if (!arguments.length) {
                    return topValues;
                }
                topValues = top;

                return this;
            };

            this.dataset = function() {

                var sorters = sortFunctions;

                var data = self.data.getData();

                data = insight.Utils.multiSort(data, sorters);

                if (this.top()) {
                    data = data.slice(0, this.top());
                }

                return data;
            };

            // toggle highlighting on items in this table. The provided cssSelector is used to activate or deactivate highlighting on one or more selected rows.
            this.highlight = function(selector) {

                var clicked = self.tableBody.selectAll('.' + selector);
                var alreadySelected = clicked.classed('selected');

                if (alreadySelected) {
                    clicked.classed('selected', false);
                    insight.Utils.removeItemFromArray(self.selectedItems, selector);
                } else {
                    clicked.classed('selected', true)
                        .classed('notselected', false);
                    self.selectedItems.push(selector);
                }

                var selected = this.tableBody.selectAll('.selected');
                var notselected = this.tableBody.selectAll('tr:not(.selected)');

                notselected.classed('notselected', selected[0].length > 0);
            };


            // The public drawing method for the Table. It will also initialize the <table> element if required.
            this.draw = function() {

                var data = this.dataset();
                var columns = this.columns();

                if (!tableInitialized)
                    initializeTable();

                // draw column headers for properties
                header.selectAll('th.column')
                    .data(columns)
                    .enter()
                    .append('th')
                    .attr('class', 'column')
                    .html(labelFunction);

                var rows = this.tableBody.selectAll('tr.' + insight.Constants.TableRowClass)
                    .data(data, keyFunction);

                rows.enter()
                    .append('tr')
                    .attr('class', rowClass)
                    .on('click', click)
                    .append('th')
                    .html(keyFunction);

                var cells = rows.selectAll('td')
                    .data(columnBuilder);

                cells.enter()
                    .append('td')
                    .html(valueFunction);

                // remove any DOM elements no longer in the data set
                cells.exit()
                    .remove();

                rows.exit()
                    .remove();
            };

            return this;
        }

        /* Skeleton event overriden by any listening objects to subscribe to the click event of the table rows
         * @param {object} series - The row being clicked
         * @param {object[]} filter - The value of the point selected, used for filtering/highlighting
         */
        Table.prototype.clickEvent = function(series, filter) {

        };

        return Table;
    })();
})(insight);
;/**
 * A tooltip, displaying values for a series or point when hovered over.
 * @class insight.Tooltip
 */
insight.Tooltip = (function() {

    function Tooltip() {

        // Private variables
        var className = insight.Constants.Tooltip,
            self = this,
            chartContainer = null,
            styles = {},
            offset = {
                x: 0,
                y: 0
            },
            baseStyles = {
                'position': 'absolute',
                'opacity': '0',
                'top': '0',
                'pointer-events': 'none',
                'box-sizing': 'border-box'
            };



        // Private methods


        // Creates the tooltip element inside the defined container element.  It sets this.element.
        function createElement() {

            var element = d3.select(self.container())
                .append('div');

            element.attr('class', className)
                .style(self.styles());

            self.element = element.node();
        }

        // Updates the content of the tooltip.
        function setTooltipContent(content) {
            d3.select(self.element)
                .html(content);
        }


        // Calculates the position that the tooltip should be drawn at, relative to the provided HTML element.
        // It currently just returns the position centrally above the provided DOM element, however the coordinate system is in place to allow customization around the element.
        function getTooltipPosition(target) {

            var boundingBox = insight.Utils.getSVGBoundingBox(target);

            var offset = self.offset();

            var y = boundingBox.n.y - self.element.offsetHeight;
            var x = boundingBox.n.x - self.element.offsetWidth / 2;

            y = y + offset.y;
            x = x + offset.x;

            return {
                x: x,
                y: y
            };
        }

        /*
         * Given a coordinate {x,y} position, this method updates the position and visibility of the tooltip to display it.
         * @param {object} point - an {x,y} coordinate, from the top left of the tooltip's container SVG.
         */
        function drawTooltip(position) {

            d3.select(self.element)
                .style({
                    'opacity': '1',
                    'top': position.y + "px",
                    'left': position.x + "px"
                });
        }

        // Public Methods

        /**
         * The distance to which move the tooltip for this series relative to its default point.
         * @memberof! insight.Tooltip
         * @instance
         * @returns {object} - The {x,y} offset to place the tooltip from the point.
         *
         * @also
         *
         * Sets the distance to which move the tooltip for this series relative to its default point.
         * @memberof! insight.Tooltip
         * @instance
         * @param {object} offset The new distance to which move the tooltip for this series relative to its default point.
         * @returns {this}
         */
        this.offset = function(value) {
            if (!arguments.length) {
                return offset;
            }

            offset = value;
            return this;
        };

        /**
         * The current style for the tooltip.
         * @memberof! insight.Tooltip
         * @instance
         * @returns {object} - The style of the tooltip, in standard {'name': 'value', ...} format of CSS values.
         *
         * @also
         *
         * Sets the current style for the tooltip.
         * @memberof! insight.Tooltip
         * @instance
         * @param {object} style The new style of the tooltip, in standard {'name': 'value', ...} format of CSS values.
         * @returns {this}
         */
        this.styles = function(value) {
            if (!arguments.length) {
                return insight.Utils.objectUnion(baseStyles, styles);
            }
            styles = value;
            return this;
        };

        // Gets or sets the DOM element that this tooltip will be created inside, usually a div.
        this.container = function(container) {
            if (!arguments.length) {
                return chartContainer;
            }

            chartContainer = container;
            return this;
        };


        /**
         * Display the tooltip, using the provided element and tooltipText parameters to control the context and position.
         * @memberof! insight.Tooltip
         * @instance
         * @param {element} element The element to attach to.
         * @param {String} tooltipText The text to display on the tooltip.
         */
        this.show = function(element, tooltipText) {

            if (!this.element) {
                createElement();
            }

            setTooltipContent(tooltipText);

            var position = getTooltipPosition(element);

            drawTooltip(position);
        };


        /**
         * Hide the tooltip
         * @memberof! insight.Tooltip
         * @instance
         */
        this.hide = function() {
            d3.select(self.element)
                .style('opacity', '0');
        };

    }


    return Tooltip;

})(insight);
;/**
 * A Legend listing out the series on a chart
 * @class insight.Legend
 */
insight.Legend = function Legend() {

    var initialised = false;

    var blobPositionY = function(item, index) {
        return index * 20 + 5;
    };

    var blobFillColor = function(item) {
        return item.color();
    };

    var textPositionY = function(item, index) {
        return index * 20 + 14;
    };

    var textContent = function(item) {
        return item.name;
    };


    this.init = function(chart) {
        initialised = true;

        //Get rid of any previous legend objects
        if (chart.legendView !== null) {
            chart.legendView.removeChild(chart.legendBox);
            chart.legendView.removeChild(chart.legendItems);
            chart.chartSVG.removeChild(chart.legendView);
        }

        chart.legendView = chart.chartSVG.append("g")
            .attr("class", insight.Constants.LegendView)
            .attr("transform", "translate(" + (chart.width() - 80) + ",30)");

        chart.legendBox = chart.legendView.append("rect")
            .style("stroke", 'black')
            .style("stroke-width", 1)
            .style("fill", 'white');

        chart.legendItems = chart.legendView.append("g")
            .attr("class", insight.Constants.Legend);
    };

    this.draw = function(chart) {
        if (!initialised) {
            this.init(chart);
        }

        var series = chart.series();

        var legendHeight = 0;
        var legendWidth = 0;

        var ctx = chart.measureCanvas.getContext('2d');
        ctx.font = "12px sans-serif";

        chart.legendItems.selectAll('rect')
            .data(series)
            .enter()
            .append("rect")
            .attr("x", 5)
            .attr("y", blobPositionY)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", blobFillColor);

        chart.legendItems.selectAll('text')
            .data(series)
            .enter()
            .append("text")
            .attr("x", 20)
            .attr("y", textPositionY)
            .attr("width", function(item) {
                return ctx.measureText(item.name)
                    .width;
            })
            .attr("height", 20)
            .text(textContent)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "black");

        for (var index = 0; index < series.length; index++) {
            var seriesTextWidth = ctx.measureText(series[index].name)
                .width;
            legendHeight = index * 20 + 20;
            legendWidth = Math.max(legendWidth, seriesTextWidth + 25);
        }

        //Adjust legend to tightly wrap items
        chart.legendBox
            .attr("width", legendWidth)
            .attr("height", legendHeight);

        chart.legendItems
            .attr("width", legendWidth)
            .attr("height", legendHeight);
    };
};
;/**
 * The Axis class coordinates the domain of the series data and draws axes.
 * @class insight.Axis
 * @param {string} name - A uniquely identifying name for this chart
 * @param {insight.Scales.Scale} scale - insight.Scale.Linear for example
 */
insight.Axis = function Axis(name, scale) {

    this.scaleType = scale.name;
    this.scale = scale.scale();
    this.rangeType = this.scale.rangeRoundBands ? this.scale.rangeRoundBands : this.scale.rangeRound;
    this.bounds = [0, 0];
    this.series = [];
    this.direction = '';
    this.gridlines = new insight.AxisGridlines(this);

    var self = this,
        label = name,
        ordered = d3.functor(false),
        orderingFunction = null,
        tickSize = d3.functor(1),
        tickPadding = d3.functor(10),
        labelRotation = '0',
        tickOrientation = d3.functor('lr'),
        showGridLines = false,
        colorFunction = d3.functor('#777'),
        display = true,
        barPadding = d3.functor(0.1),
        initialisedAxisView = false,
        reversedPosition = false,
        zoomable = false;

    var orientation = function() {
        if (self.horizontal()) {
            return (reversedPosition) ? 'top' : 'bottom';
        } else {
            return (reversedPosition) ? 'right' : 'left';
        }
    };

    var textAnchor = function() {
        var orientation = self.orientation();
        if (orientation === 'left' || orientation === 'top') {
            return 'end';
        } else {
            return 'start';
        }
    };

    // private functions

    /*
     * The default axis tick format, just returns the input
     * @returns {object} tickPoint - The axis data for a particular tick
     * @param {object} ticklabel - The output string to be displayed
     */
    var format = function(d) {
        return d;
    };

    /*
     * This method calculates the scale ranges for this axis, given a range type function and using the calculated output bounds for this axis.
     * @param {rangeType} rangeType - a d3 range function, which can either be in bands (for columns) or a continuous range
     */
    var applyScaleRange = function(rangeType) {

        // x-axis goes from 0 (left) to max (right)
        // y-axis goes from max (top) to 0 (bottom)
        var rangeBounds = (self.horizontal()) ? [0, self.bounds[0]] : [self.bounds[1], 0];

        rangeType.apply(this, [
            rangeBounds, self.barPadding()
        ]);
    };

    this.barPadding = function(_) {
        if (!arguments.length) {
            return barPadding();
        }
        barPadding = d3.functor(_);
        return this;
    };

    /*
     * For an ordinal/categorical axis, this method queries all series that use this axis to get the list of available values
     * @returns {object[]} values - the values for this ordinal axis
     */
    var findOrdinalValues = function() {
        var vals = [];

        // Build a list of values used by this axis by checking all Series using this axis
        // Optionally provide an ordering function to sort the results by.  If the axis is ordered but no custom ordering is defined,
        // then the series value function will be used by default.
        self.series.map(function(series) {
            vals = vals.concat(series.keys(self.orderingFunction()));
        });

        vals = insight.Utils.arrayUnique(vals);

        return vals;
    };

    /**
     * Calculates the minimum value to be used in this axis.
     * @returns {object} - The smallest value in the datasets that use this axis
     */
    var findMin = function() {
        var min = Number.MAX_VALUE;

        self.series.map(function(series) {
            var m = series.findMin(self);

            min = m < min ? m : min;
        });

        return min;
    };

    /**
     * Calculates the maximum value to be used in this axis.
     * @returns {object} - The largest value in the datasets that use this axis
     */
    var findMax = function() {
        var max = 0;

        self.series.map(function(series) {
            var m = series.findMax(self);

            max = m > max ? m : max;
        });

        return max;
    };

    // public functions

    /**
     * Whether or not the axis is displayed horizontally (true) or vertically (false).
     * @memberof! insight.Axis
     * @returns {boolean} - Whether the axis is horizontal.
     */
    this.horizontal = function() {
        return this.direction === 'h';
    };

    /**
     * Whether the axis values are displayed in order or not.
     * @memberof! insight.Axis
     * @instance
     * @returns {boolean} - Whether the axis is currently ordered.
     *
     * @also
     *
     * Sets whether the axis values are displayed in order or not.
     * @memberof! insight.Axis
     * @instance
     * @param {boolean} value Whether or not the axis will be ordered.
     * @returns {this}
     */
    this.ordered = function(value) {
        if (!arguments.length) {
            return ordered();
        }
        ordered = d3.functor(value);
        return this;
    };

    this.orderingFunction = function(value) {
        if (!arguments.length) {
            return orderingFunction;
        }
        orderingFunction = value;
        return this;
    };

    this.addSeries = function(series) {
        this.series.push(series);
    };


    // scale domain and output range methods


    /**
     * This method calculates the domain of values that this axis has, from a minimum to a maximum.
     * @memberof! insight.Axis
     * @instance
     * @returns {object[]} bounds - An array with two items, for the lower and upper range of this axis
     */
    this.domain = function() {
        var domain = [];

        if (this.scaleType === insight.Scales.Linear.name) {
            domain = [0, findMax()];
        } else if (this.scaleType === insight.Scales.Ordinal.name) {
            domain = findOrdinalValues();
        } else if (this.scaleType === insight.Scales.Time.name) {
            domain = [new Date(findMin()), new Date(findMax())];
        }

        return domain;
    };


    /**
     * This method calculates the output range bound of this axis, taking into account the size and margins of the chart.
     * @memberof! insight.Axis
     * @instance
     * @returns {int[]} - An array with two items, for the width and height of the axis, respectively.
     */
    this.calculateAxisBounds = function(chart) {
        var bounds = [];
        var margin = chart.margin();

        bounds[0] = chart.width() - margin.right - margin.left;
        bounds[1] = chart.height() - margin.top - margin.bottom;

        self.bounds = bounds;

        return self.bounds;
    };


    /**
     * Returns a boolean value representing if this Axis is zoomable.
     * @instance
     * @memberof! insight.Axis
     * @returns {boolean}
     *
     * @also
     *
     * Sets the zoomable status of this Axis.  A zoomable Axis allows drag and zoom operations, and is not redrawn automatically on the draw() event of a chart.
     * @instance
     * @memberof! insight.Axis
     * @param {boolean} value - A true/false value to set this Axis as zoomable or not.
     * @returns {this}
     */
    this.zoomable = function(value) {
        if (!arguments.length) {
            return zoomable;
        }
        zoomable = value;

        return this;
    };

    /**
     * Whether the axis is drawn on the chart.
     * @memberof! insight.Axis
     * @instance
     * @returns {boolean} - Whether the axis is currently being drawn on the chart.
     *
     * @also
     *
     * Sets whether the axis is drawn on the chart.
     * @memberof! insight.Axis
     * @instance
     * @param {boolean} displayed Whether or not the axis will be drawn.
     * @returns {this}
     */
    this.display = function(value) {
        if (!arguments.length) {
            return display;
        }
        display = value;
        return this;
    };


    /**
     * Whether the axis is drawn in a reversed position.
     * @memberof! insight.Axis
     * @instance
     * @returns {boolean} - Whether the axis is drawn at the bottom/left (false) or top/right (true).
     *
     * @also
     *
     * Sets whether the axis is drawn in a reversed position.
     * @memberof! insight.Axis
     * @instance
     * @param {boolean} reversed Whether the axis is drawn at the bottom/left (false) or top/right (true).
     * @returns {this}
     */
    this.reversed = function(value) {
        if (!arguments.length) {
            return reversedPosition;
        }
        reversedPosition = value;
        return this;
    };

    // label and axis tick methods

    this.label = function(value) {
        if (!arguments.length) {
            return label;
        }
        label = value;
        return this;
    };


    this.labelFormat = function(value) {
        if (!arguments.length) {
            return format;
        }
        format = value;
        return this;
    };


    /**
     * The color of the axis labels and lines.
     * @memberof! insight.Axis
     * @instance
     * @returns {Color} - The color of the axis labels and lines.
     *
     * @also
     *
     * Sets the color of the axis labels and lines.
     * @memberof! insight.Axis
     * @instance
     * @param {Color} color The new color of the axis labels and lines.
     * @returns {this}
     */
    this.color = function(color) {
        if (!arguments.length) {
            return colorFunction;
        }
        colorFunction = d3.functor(color);
        return this;
    };


    this.orientation = function(value) {
        if (!arguments.length) {
            return orientation();
        }
        orientation = d3.functor(value);
        return this;
    };


    this.tickRotation = function(value) {
        if (!arguments.length) {
            return labelRotation;
        }
        labelRotation = value;
        return this;
    };



    this.tickSize = function(value) {
        if (!arguments.length) {
            return tickSize();
        }
        tickSize = d3.functor(value);
        return this;
    };


    this.tickPadding = function(value) {
        if (!arguments.length) {
            return tickPadding();
        }
        tickPadding = d3.functor(value);
        return this;
    };


    this.textAnchor = function(value) {
        if (!arguments.length) {
            return textAnchor();
        }
        textAnchor = d3.functor(value);
        return this;
    };



    this.tickOrientation = function(value) {
        if (!arguments.length) {
            return tickOrientation();
        }

        if (value === 'tb') {
            labelRotation = '90';
        } else if (value === 'lr') {
            labelRotation = '0';
        }

        tickOrientation = d3.functor(value);

        return this;
    };

    this.tickRotationTransform = function() {
        var offset = self.tickPadding() + (self.tickSize() * 2);
        offset = (reversedPosition && !self.horizontal()) ? 0 - offset : offset;

        var rotation = ' rotate(' + self.tickRotation() + ',0,' + offset + ')';

        return rotation;
    };


    this.axisPosition = function() {
        var transform = 'translate(';

        if (self.horizontal()) {
            var transX = 0;
            var transY = self.orientation() === 'top' ? 0 : self.bounds[1];

            transform += transX + ',' + transY + ')';

        } else {
            var xShift = self.orientation() === 'left' ? 0 : self.bounds[0];
            transform += xShift + ',0)';
        }

        return transform;
    };

    this.pixelValueForValue = function(d) {
        return self.scale(d);
    };

    this.positionLabel = function() {

        if (self.horizontal()) {
            this.labelElement.style('left', 0)
                .style(self.orientation(), 0)
                .style('width', '100%')
                .style('text-align', 'center');
        } else {
            this.labelElement.style(self.orientation(), '0')
                .style('top', '35%');
        }
    };

    /**
     * Whether the axis has gridlines drawn from its major ticks.
     * @memberof! insight.Axis
     * @instance
     * @returns {boolean} - Whether the axis has gridlines drawn from its major ticks.
     *
     * @also
     *
     * Sets whether the axis has gridlines drawn from its major ticks.
     * @memberof! insight.Axis
     * @instance
     * @param {boolean} reversed Whether the axis has gridlines drawn from its major ticks.
     * @returns {this}
     */
    this.showGridlines = function(showLines) {
        if (!arguments.length) {
            return showGridLines;
        }
        showGridLines = showLines;

        return this;
    };

    this.initializeScale = function() {
        applyScaleRange.call(this.scale.domain(this.domain()), this.rangeType);

    };


    this.setupAxisView = function(chart) {

        if (initialisedAxisView)
            return;

        initialisedAxisView = true;

        this.initializeScale();

        this.axis = d3.svg.axis()
            .scale(this.scale)
            .orient(self.orientation())
            .tickSize(self.tickSize())
            .tickPadding(self.tickPadding())
            .tickFormat(self.labelFormat());

        this.axisElement = chart.plotArea.append('g');

        this.axisElement
            .attr('class', insight.Constants.AxisClass)
            .attr('transform', self.axisPosition())
            .call(this.axis)
            .selectAll('text')
            .attr('class', insight.Constants.AxisTextClass)
            .style('text-anchor', self.textAnchor())
            .style('transform', self.tickRotationTransform());

        this.labelElement = chart.container
            .append('div')
            .attr('class', insight.Constants.AxisLabelClass)
            .style('position', 'absolute')
            .text(this.label());
    };

    this.draw = function(chart, dragging) {

        // Scale range and bounds need to be initialized regardless of whether the axis will be displayed

        this.calculateAxisBounds(chart);

        if (!this.zoomable()) {
            this.initializeScale();
        }

        if (!this.display()) {
            return;
        }

        this.setupAxisView(chart);

        var animationDuration = dragging ? 0 : 200;

        this.axis = d3.svg.axis()
            .scale(this.scale)
            .orient(self.orientation())
            .tickSize(self.tickSize())
            .tickPadding(self.tickPadding())
            .tickFormat(self.labelFormat());

        this.axisElement
            .attr('transform', self.axisPosition())
            .style('stroke', self.color())
            .transition()
            .duration(animationDuration)
            .call(this.axis);

        this.axisElement
            .selectAll('text')
            .attr('transform', self.tickRotationTransform())
            .style('text-anchor', self.textAnchor());

        this.labelElement
            .text(this.label());

        this.positionLabel();


        if (showGridLines) {
            this.gridlines.drawGridLines(chart, this.scale.ticks());
        }
    };
};
;/**
 * The Axis gridlines represent and draw the gridlines for a given axis.
 * @class insight.AxisGridlines
 * @param {Axis} axis - The axis to draw gridlines from.
 */
insight.AxisGridlines = function AxisGridlines(axis) {

    this.parentAxis = axis;
    var lineColor = '#777';
    var lineWidth = 1;

    /** Returns the array of all gridlines for this axis.
     *
     * @memberof! insight.AxisGridlines
     * @instance
     * @param {Chart} chart The chart to grab the gridlines from.
     * @return {object[]} - All of the gridlines currently added to this chart.
     */
    this.allGridlines = function(chart) {
        var gridLineIdentifier = 'line.' + this.parentAxis.label();
        return chart.plotArea.selectAll(gridLineIdentifier);
    };

    /** The color of the gridlines.
     * @memberof! insight.AxisGridlines
     * @instance
     * @returns {Color} - The current line color of the gridlines.
     *
     * @also
     *
     * Sets the color of the gridlines
     * @memberof! insight.AxisGridlines
     * @instance
     * @param {Color} value The new gridline color.
     * @returns {this}
     */
    this.lineColor = function(value) {
        if (!arguments.length) {
            return lineColor;
        }
        lineColor = value;
        return this;
    };

    /** The width of the gridlines.
     * @memberof! insight.AxisGridlines
     * @instance
     * @returns {Number} - The current line width of the gridlines.
     *
     * @also
     *
     * Sets the width of the gridlines
     * @memberof! insight.AxisGridlines
     * @instance
     * @param {Number} value The new gridline width.
     * @returns {this}
     */
    this.lineWidth = function(value) {
        if (!arguments.length) {
            return lineWidth;
        }
        lineWidth = value;
        return this;
    };

    this.drawGridLines = function(chart, ticks) {
        var attributes = {
            'class': this.parentAxis.label(),
            'fill': 'none',
            'shape-rendering': 'crispEdges',
            'stroke': lineColor,
            'stroke-width': lineWidth
        };

        var axis = this.parentAxis;

        if (this.parentAxis.horizontal()) {
            attributes.x1 = this.parentAxis.pixelValueForValue;
            attributes.x2 = this.parentAxis.pixelValueForValue;
            attributes.y1 = 0;
            attributes.y2 = this.parentAxis.bounds[1];
        } else {
            attributes.x1 = 0;
            attributes.x2 = this.parentAxis.bounds[0];
            attributes.y1 = this.parentAxis.pixelValueForValue;
            attributes.y2 = this.parentAxis.pixelValueForValue;
        }

        //Get all lines, and add new datapoints.
        var gridLines = this.allGridlines(chart)
            .data(ticks);

        //Add lines for all new datapoints
        gridLines
            .enter()
            .append('line');

        //Update position of all lines
        gridLines.attr(attributes);

        //Remove any lines which are no longer in the data
        gridLines.exit()
            .remove();

    };
};
;/**
 * The Series base class provides some base functions that are used by any specific types of series that derive from this class
 * @class insight.Series
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.Series = function Series(name, data, x, y, color) {

    this.data = data;
    this.usesCrossfilter = (data instanceof insight.DataSet) || (data instanceof insight.Grouping);
    this.x = x;
    this.y = y;
    this.name = name;
    this.color = d3.functor(color);
    this.animationDuration = 300;
    this.topValues = null;
    this.classValues = [];
    this.valueAxis = y;
    this.keyAxis = x;
    this.selectedItems = [];

    x.addSeries(this);
    y.addSeries(this);

    var self = this,
        filter = null,
        tooltipOffset = {
            x: 0,
            y: -10
        };

    // private functions used internally, set by functions below that are exposed on the object

    var keyFunction = function(d) {
        return d.key;
    };

    var valueFunction = function(d) {
        return d.value;
    };

    // default x and y to vertical.  Series can override this if needed in their constructors.
    var xFunction = function(d) {
        return d.x;
    };

    var yFunction = function(d) {
        return d.y;
    };

    var tooltipFormat = function(d) {
        return d;
    };

    var tooltipAccessor = function(d) {
        return valueFunction(d);
    };

    var tooltipFunction = function(d) {
        return tooltipFormat(tooltipAccessor(d));
    };

    /*
     * Checks whether individual chart items should be marked as selected or not.
     * @memberof insight.Series
     * @returns {string} selectionClass - A string that is used by CSS highlighting to style the chart item.
     * @param {string[]}selectedItems - A list of CSS selectors for currently selected items
     * @param {string} selector - The selector for the item being drawn
     */
    var selectedClassName = function(selectedItems, selector) {
        var selected = '';

        if (selectedItems.length) {
            selected = insight.Utils.arrayContains(selectedItems, selector) ? ' selected' : ' notselected';
        }

        return selected;
    };


    /*
     * Generates the base class name to be used for items in this series.It can be extended upon by individual items to show
     * if they are selected or to mark them out in other ways.
     * @memberof insight.Series
     * @returns {string} baseClassName - A root valuefor the class attribute used for items in this Series.
     */
    this.seriesClassName = function() {

        var seriesName = [self.name + 'class'].concat(self.classValues)
            .join(' ');

        return seriesName;
    };


    var arrayDataSet = function(orderFunction, topValues) {

        // Take a shallow copy of the data array
        var data = self.data.slice(0);

        if (orderFunction) {
            data = data.sort(orderFunc);
        }
        if (topValues) {
            data = data.slice(0, top);
        }

        return data;
    };


    // Public methods

    /*
     * Constructs the text for the class attribute for a specific data point, using the base value for this Series and any additional values.
     * @memberof insight.Series
     * @param {object} dataItem - The data item being drawn
     * @param {string[]} additionalClasses - Any additional values this Series needs appending to the class value.Used by stacked Series to differentiate between Series.
     * @returns {string} classValue - A class value for a particular data item being bound in this Series.
     */
    this.itemClassName = function(dataItem, additionalClasses) {

        var keySelector = insight.Utils.keySelector(keyFunction(dataItem));
        var selected = selectedClassName(self.selectedItems, keySelector);
        var value = self.rootClassName + ' ' + keySelector + selected;

        return value;
    };

    /**
     * Gets the function used to retrieve the x-value from the data object to plot on a chart.
     * @memberof! insight.Series
     * @instance
     * @returns {function} The current function used to extract the x-value.
     *
     * @also
     *
     * Sets the function used to retrieve the x-value from the data object to plot on a chart.
     * @memberof! insight.Series
     * @instance
     * @param {function} keyFunc The new key function to use to extract the x-value from a data object.
     * @returns {this}
     */
    this.keyFunction = function(keyFunc) {
        if (!arguments.length) {
            return keyFunction;
        }
        keyFunction = keyFunc;

        return this;
    };

    /**
     * Gets the y-value from the data object to plot on a chart.
     * @memberof! insight.Series
     * @instance
     * @returns {function} The current function used to extract the y-value.
     *
     * @also
     *
     * Sets the function used to retrieve the y-value from the data object to plot on a chart.
     * @memberof! insight.Series
     * @instance
     * @param {function} valueFunc The new key function to use to extract the y-value from a data object.
     * @returns {this}
     */
    this.valueFunction = function(valueFunc) {
        if (!arguments.length) {
            return valueFunction;
        }
        valueFunction = valueFunc;

        return this;
    };

    /**
     * Returns the array of data objects used to plot this Series.
     * @memberof! insight.Series
     * @instance
     * @returns {object[]} - The data set to be used by the series
     */
    this.dataset = function(orderFunction) {

        // If the keyAxis is ordered but no function has been provided, create one based on the Series' valueFunction
        if (self.keyAxis.ordered() && !orderFunction) {

            orderFunction = function(a, b) {
                return self.valueFunction()(b) - self.valueFunction()(a);
            };
        }

        var data = this.usesCrossfilter ? self.data.getData(orderFunction, self.topValues) : arrayDataSet(orderFunction, self.topValues);

        if (filter) {
            data = data.filter(filter);
        }

        return data;
    };

    this.keys = function(orderFunction) {
        return this.dataset(orderFunction)
            .map(self.keyFunction());
    };

    this.xFunction = function(_) {
        if (!arguments.length) {
            return xFunction;
        }
        xFunction = _;

        return this;
    };

    this.yFunction = function(_) {
        if (!arguments.length) {
            return yFunction;
        }
        yFunction = _;

        return this;

    };

    /**
     * The distance to which move the tooltip for this series relative to its default point.
     * @memberof! insight.Series
     * @instance
     * @returns {object} - The {x,y} offset to place the tooltip from the point.
     *
     * @also
     *
     * Sets the distance to which move the tooltip for this series relative to its default point.
     * @memberof! insight.Series
     * @instance
     * @param {object} offset The new distance to which move the tooltip for this series relative to its default point.
     * @returns {this}
     */
    this.tooltipOffset = function(value) {
        if (!arguments.length) {
            return tooltipOffset;
        }
        tooltipOffset = value;

        return this;
    };

    /*
     * Creates the tooltip for this Series, checking if it exists already first.
     * @memberof! insight.Series
     * @param {DOMElement} container - The DOM Element that the tooltip should be drawn inside.
     */
    this.initializeTooltip = function(container) {
        if (!this.tooltip) {
            this.tooltip = new insight.Tooltip()
                .container(container)
                .offset(self.tooltipOffset());
        }
    };

    /*
     * This event handler is triggered when a series element (rectangle, circle or line) triggers a mouse over. Tooltips are shown and CSS updated.
     * The *this* context will reference the DOMElement raising the event.
     * @memberof! insight.Series
     * @param {object} item - The data point for the hovered item.
     * @param {int} index - The index of the hovered item in the data set.  This is required at the moment as we need to provide the valueFunction until stacked series are refactored.
     * @param {function} valueFunction - If provided, this function will be used to generate the tooltip text, otherwise the series default valueFunction will be used.
     *                                   This is only for stacked charts that currently have multiple valueFunctions.
     */
    this.mouseOver = function(item, i, valueFunction) {

        var textFunction = valueFunction ? valueFunction : self.tooltipFunction();
        var tooltipText = textFunction(item);

        self.tooltip.show(this, tooltipText);

        d3.select(this)
            .classed('active', true);
    };

    /*
     * This event handler is triggered when a series element (rectangle, circle or line) triggers a mouseout event. Tooltips are hidden and CSS updated.
     * The *this* context will reference the DOMElement raising the event.
     * @memberof! insight.Series
     */
    this.mouseOut = function() {

        self.tooltip.hide();

        d3.select(this)
            .classed('active', false);
    };



    this.click = function(element, filterBy) {
        var filterValue = keyFunction(filterBy);

        self.clickEvent(self.data, filterValue);
    };

    this.filterFunction = function(_) {
        if (!arguments.length) {
            return filter;
        }
        filter = _;

        return this;
    };

    this.tooltipFormat = function(_) {
        if (!arguments.length) {
            return tooltipFormat;
        }
        tooltipFormat = _;

        return this;
    };

    this.tooltipFunction = function(_) {
        if (!arguments.length) {
            return tooltipFunction;
        }
        tooltipFunction = _;

        return this;
    };

    this.top = function(_) {
        if (!arguments.length) {
            return this.topValues;
        }
        this.topValues = _;

        return this;
    };



    /**
     * Extracts the minimum value on an axis for this series.
     * @memberof! insight.Series
     * @instance
     * @param scale The corresponding x or y axis
     * @returns {Number} - The minimum value within the range of the values for this series on the given axis.
     */
    this.findMin = function(scale) {
        var self = this;

        var data = this.dataset();

        var func = scale === self.x ? self.keyFunction() : self.valueFunction();

        return d3.min(data, func);
    };

    /**
     * Extracts the maximum value on an axis for this series.
     * @memberof! insight.Series
     * @instance
     * @param scale The corresponding x or y axis
     * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
     */
    this.findMax = function(scale) {
        var self = this;

        var data = this.dataset();

        var func = scale === self.x ? self.keyFunction() : self.valueFunction();

        return d3.max(data, func);
    };

    this.draw = function(chart, drag) {};

    return this;
};

/* Skeleton event overriden by a Dashboard to subscribe to this series' clicks.
 * @param {object} series - The series being clicked
 * @param {object[]} filter - The value of the point selected, used for filtering/highlighting
 * @param {object[]} selection - The css selection name also used to maintain a list of filtered dimensions (TODO - is this needed anymore?)
 */
insight.Series.prototype.clickEvent = function(series, filter, selection) {

};
;/**
 * The MarkerSeries class extends the Series class and draws markers/targets on a chart
 * @class insight.MarkerSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.MarkerSeries = function MarkerSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    var self = this,
        thickness = 5,
        widthFactor = 1,
        offset = 0,
        horizontal = false,
        vertical = true;

    this.xPosition = function(d) {
        var pos = 0;

        if (vertical) {
            pos = self.x.scale(self.keyFunction()(d));

            offset = self.calculateOffset(d);

            pos = widthFactor !== 1 ? pos + offset : pos;
        } else {
            pos = self.x.scale(self.valueFunction()(d));

        }

        return pos;
    };


    this.keys = function() {

        var f = self.keyFunction();

        return self.dataset()
            .map(f);
    };

    this.calculateOffset = function(d) {

        var thickness = horizontal ? self.markerHeight(d) : self.markerWidth(d);
        var scalePos = horizontal ? self.y.scale.rangeBand(d) : self.x.scale.rangeBand(d);

        return (scalePos - thickness) * 0.5;
    };

    this.yPosition = function(d) {

        var position = 0;

        if (horizontal) {
            position = self.y.scale(self.keyFunction()(d));

            offset = self.calculateOffset(d);

            position = widthFactor !== 1 ? position + offset : position;

        } else {
            position = self.y.scale(self.valueFunction()(d));
        }

        return position;
    };

    this.horizontal = function() {
        horizontal = true;
        vertical = false;

        return this;
    };

    this.vertical = function() {
        vertical = true;
        horizontal = false;
        return this;
    };

    /**
     * The width of the marker, as a proportion of the column width.
     * @memberof! insight.MarkerSeries
     * @instance
     * @returns {Number} - The current width proportion.
     *
     * @also
     *
     * Sets the width of the marker, as a proportion of the column width.
     * @memberof! insight.MarkerSeries
     * @instance
     * @param {Number} widthProportion The new width proportion.
     * @returns {this}
     */
    this.widthFactor = function(_) {

        if (!arguments.length) {
            return widthFactor;
        }
        widthFactor = _;
        return this;
    };

    this.thickness = function(_) {
        if (!arguments.length) {
            return thickness;
        }
        thickness = _;
        return this;
    };

    this.markerWidth = function(d) {
        var w = 0;

        if (horizontal) {
            w = self.thickness();
        } else {
            w = self.x.scale.rangeBand(d) * widthFactor;
        }

        return w;
    };

    this.markerHeight = function(d) {
        var h = 0;

        if (horizontal) {
            h = self.y.scale.rangeBand(d) * widthFactor;
        } else {
            h = self.thickness();
        }

        return h;
    };



    this.draw = function(chart, drag) {

        self.initializeTooltip(chart.container.node());
        self.selectedItems = chart.selectedItems;
        self.rootClassName = self.seriesClassName();

        var reset = function(d) {
            d.yPos = 0;
            d.xPos = 0;
        };

        var d = this.dataset()
            .forEach(reset);

        var groups = chart.plotArea
            .selectAll('g.' + insight.Constants.BarGroupClass + "." + this.name)
            .data(this.dataset(), this.keyAccessor);

        var newGroups = groups.enter()
            .append('g')
            .attr('class', insight.Constants.BarGroupClass + " " + this.name);

        var newBars = newGroups.selectAll('rect.bar');

        var click = function(filter) {
            return self.click(this, filter);
        };

        var duration = function(d, i) {
            return 200 + (i * 20);
        };

        newBars = newGroups.append('rect')
            .attr('class', self.itemClassName)
            .attr('y', this.y.bounds[0])
            .attr('height', 0)
            .attr('fill', this.color)
            .attr('clip-path', 'url(#' + chart.clipPath() + ')')
            .on('mouseover', this.mouseOver)
            .on('mouseout', this.mouseOut)
            .on('click', click);

        var bars = groups.selectAll('.' + this.name + 'class');

        bars
            .transition()
            .duration(duration)
            .attr('y', this.yPosition)
            .attr('x', this.xPosition)
            .attr('width', this.markerWidth)
            .attr('height', this.markerHeight);

        groups.exit()
            .remove();
    };

    return this;
};

insight.MarkerSeries.prototype = Object.create(insight.Series.prototype);
insight.MarkerSeries.prototype.constructor = insight.MarkerSeries;
;/**
 * The BubbleSeries class extends the Series class
 * @class insight.BubbleSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.BubbleSeries = function BubbleSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    // private variables

    var self = this,
        selector = this.name + insight.Constants.Bubble,
        radiusFunction = d3.functor(10);


    // public variables

    this.classValues = [insight.Constants.Bubble];


    this.rangeY = function(d) {
        return self.y.scale(self.yFunction()(d));
    };

    this.rangeX = function(d, i) {
        return self.x.scale(self.xFunction()(d));
    };

    /**
     * The function to extract the radius of each bubble from the data objects.
     * @memberof! insight.BubbleSeries
     * @instance
     * @returns {function} - The current function used to determine the radius of data objects.
     *
     * @also
     *
     * Sets the function to extract the radius of each bubble from the data objects.
     * @memberof! insight.BubbleSeries
     * @instance
     * @param {boolean} reversed The new function to extract the radius of each bubble from the data objects.
     * @returns {this}
     */
    this.radiusFunction = function(radiusFunc) {
        if (!arguments.length) {
            return radiusFunction;
        }
        radiusFunction = radiusFunc;

        return this;
    };

    /**
     * This method is called when any post aggregation calculations, provided by the computeFunction() setter, need to be recalculated.
     * @memberof insight.BubbleSeries
     * @instance
     * @param {insight.Scale} scale - a scale parameter to check if the values should be taken from x or y functions.
     * @returns {object} - the maximum value for the series on the provided axis
     */
    this.findMax = function(scale) {
        var self = this;

        var data = this.dataset();

        var func = scale === self.x ? self.xFunction() : self.yFunction();

        return d3.max(data, func);
    };


    this.bubbleData = function(data) {
        var max = d3.max(data, radiusFunction);

        var rad = function(d) {
            return d.radius;
        };

        //Minimum of pixels-per-axis-unit
        var xValues = data.map(self.xFunction());
        var yValues = data.map(self.yFunction());
        var xBounds = this.x.bounds[1];
        var yBounds = this.y.bounds[0];
        var maxRad = Math.min(xBounds / 10, yBounds / 10);

        // create radius for each item
        data.forEach(function(d) {
            var radiusInput = radiusFunction(d);

            if (radiusInput === 0)
                d.radius = 0;
            else
                d.radius = (radiusInput * maxRad) / max;
        });

        //this sort ensures that smaller bubbles are on top of larger ones, so that they are always selectable.  Without changing original array (hence concat which creates a copy)
        data = data.concat()
            .sort(function(a, b) {
                return d3.descending(rad(a), rad(b));
            });

        return data;
    };

    this.draw = function(chart, drag) {

        this.initializeTooltip(chart.container.node());
        this.selectedItems = chart.selectedItems;
        this.rootClassName = self.seriesClassName();

        var duration = drag ? 0 : function(d, i) {
            return 200 + (i * 20);
        };

        var click = function(filter) {
            return self.click(this, filter);
        };

        var bubbleData = this.bubbleData(this.dataset());

        var bubbles = chart.plotArea.selectAll('circle.' + insight.Constants.Bubble)
            .data(bubbleData, self.keyFunction());

        bubbles.enter()
            .append('circle')
            .attr('class', self.itemClassName)
            .on('mouseover', self.mouseOver)
            .on('mouseout', self.mouseOut)
            .on('click', click);


        var rad = function(d) {
            return d.radius;
        };

        bubbles.transition()
            .duration(duration)
            .attr('r', rad)
            .attr('cx', self.rangeX)
            .attr('cy', self.rangeY)
            .attr('opacity', 0.5)
            .attr('fill', this.color);
    };
};

insight.BubbleSeries.prototype = Object.create(insight.Series.prototype);
insight.BubbleSeries.prototype.constructor = insight.BubbleSeries;
;/**
 * The ScatterSeries class extends the Series class
 * @class insight.ScatterSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.ScatterSeries = function ScatterSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    var radiusFunction = d3.functor(3),
        opacityFunction = d3.functor(1),
        self = this,
        selector = this.name + insight.Constants.Scatter;


    this.findMax = function(scale) {
        var self = this;

        var max = 0;
        var data = this.data.getData();

        var func = scale === self.x ? self.xFunction() : self.yFunction();

        var m = d3.max(data, func);

        max = m > max ? m : max;

        return max;
    };


    this.rangeY = function(d) {
        return self.y.scale(self.yFunction()(d));
    };

    this.rangeX = function(d, i) {
        return self.x.scale(self.xFunction()(d));
    };

    this.radiusFunction = function(_) {
        if (!arguments.length) {
            return radiusFunction;
        }
        radiusFunction = _;

        return this;
    };

    this.pointRadius = function(_) {
        if (!arguments.length) {
            return radiusFunction();
        }
        radiusFunction = d3.functor(_);

        return this;
    };

    this.pointOpacity = function(_) {
        if (!arguments.length) {
            return opacityFunction();
        }
        opacityFunction = d3.functor(_);

        return this;
    };

    var className = function(d) {

        return selector + " " + insight.Constants.Scatter + " " + self.dimensionName;
    };

    this.fillFunction = function(_) {
        if (!arguments.length) {
            return fillFunction;
        }
        fillFunction = _;

        return this;
    };

    this.scatterData = function(data) {
        var max = d3.max(data, radiusFunction);

        //Minimum of pixels-per-axis-unit
        var xValues = data.map(self.xFunction());
        var yValues = data.map(self.yFunction());
        var xBounds = this.x.bounds[1];
        var yBounds = this.y.bounds[0];

        // create radius for each item
        data.forEach(function(d) {
            d.radius = radiusFunction(d);
        });

        return data;
    };

    this.draw = function(chart, drag) {

        self.initializeTooltip(chart.container.node());
        self.selectedItems = chart.selectedItems;

        var duration = drag ? 0 : function(d, i) {
            return 200 + (i * 20);
        };

        var click = function(filter) {
            return self.click(this, filter);
        };

        var scatterData = this.scatterData(this.dataset());

        var points = chart.plotArea.selectAll('circle.' + selector)
            .data(scatterData, self.keyFunction());

        points.enter()
            .append('circle')
            .attr('class', className)
            .on('mouseover', this.mouseOver)
            .on('mouseout', this.mouseOut)
            .on('click', click);

        points
            .attr('r', radiusFunction)
            .attr('cx', self.rangeX)
            .attr('cy', self.rangeY)
            .attr('opacity', opacityFunction)
            .attr('fill', this.color);
    };
};

insight.ScatterSeries.prototype = Object.create(insight.Series.prototype);
insight.ScatterSeries.prototype.constructor = insight.ScatterSeries;
;/**
 * The RowSeries class extends the Series class and draws horizontal bars on a Chart
 * @class insight.RowSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.RowSeries = function RowSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    var self = this,
        stacked = d3.functor(false),
        seriesName = '',
        seriesFunctions = {};

    this.valueAxis = x;
    this.keyAxis = y;
    this.classValues = [insight.Constants.BarClass];

    this.series = [{
        name: 'default',
        valueFunction: function(d) {
            return self.valueFunction()(d);
        },
        tooltipValue: function(d) {
            return self.tooltipFunction()(d);
        },
        color: d3.functor(color),
        label: 'Value'
    }];


    /**
     * Given an object representing a data item, this method returns the largest value across all of the series in the ColumnSeries.
     * This function is mapped across the entire data array by the findMax method.
     * @memberof! insight.RowSeries
     * @instance
     * @param {object} data - An item in the object array to query
     * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
     */
    this.seriesMax = function(d) {
        var max = 0;
        var seriesMax = 0;

        var stacked = self.stacked();

        for (var series in self.series) {
            var s = self.series[series];

            var seriesValue = s.valueFunction(d);

            seriesMax = stacked ? seriesMax + seriesValue : seriesValue;

            max = seriesMax > max ? seriesMax : max;
        }

        return max;
    };


    /**
     * Extracts the maximum value on an axis for this series.
     * @memberof! insight.RowSeries
     * @instance
     * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
     */
    this.findMax = function() {
        var max = d3.max(self.dataset(), self.seriesMax);

        return max;
    };

    /**
     * Determines whether the series should stack rows, or line them up side-by-side.
     * @memberof! insight.RowSeries
     * @instance
     * @returns {boolean} - To stack or not to stack.
     *
     * @also
     *
     * Sets whether the series should stack rows, or line them up side-by-side.
     * @memberof! insight.RowSeries
     * @instance
     * @param {boolean} stacked Whether the row series should be stacked.
     * @returns {this}
     */
    this.stacked = function(_) {
        if (!arguments.length) {
            return stacked();
        }
        stacked = d3.functor(_);
        return this;
    };

    this.calculateXPos = function(func, d) {
        if (!d.xPos) {
            d.xPos = 0;
        }
        var myPosition = d.xPos;

        d.xPos += func(d);

        return myPosition;
    };

    this.yPosition = function(d) {
        return self.y.scale(self.keyFunction()(d));
    };

    this.calculateYPos = function(thickness, d) {
        if (!d.yPos) {
            d.yPos = self.yPosition(d);
        } else {
            d.yPos += thickness;
        }
        return d.yPos;
    };

    this.xPosition = function(d) {

        var func = self.currentSeries.valueFunction;

        var position = self.stacked() ? self.x.scale(self.calculateXPos(func, d)) : 0;

        return position;
    };

    this.barThickness = function(d) {
        return self.y.scale.rangeBand(d);
    };

    this.groupedbarThickness = function(d) {

        var groupThickness = self.barThickness(d);

        var width = self.stacked() || (self.series.length === 1) ? groupThickness : groupThickness / self.series.length;

        return width;
    };

    this.offsetYPosition = function(d) {
        var thickness = self.groupedbarThickness(d);
        var position = self.stacked() ? self.yPosition(d) : self.calculateYPos(thickness, d);

        return position;
    };

    this.barWidth = function(d) {
        var func = self.currentSeries.valueFunction;

        return self.x.scale(func(d));
    };


    var mouseOver = function(data, i) {

        var seriesName = this.getAttribute('in_series');
        var seriesFunction = seriesFunctions[seriesName];

        self.mouseOver.call(this, data, i, seriesFunction);
    };


    this.seriesSpecificClassName = function(d) {

        var additionalClass = ' ' + self.currentSeries.name + 'class';
        var baseClassName = self.itemClassName(d);
        var itemClassName = baseClassName + additionalClass;

        return itemClassName;
    };

    this.draw = function(chart, drag) {

        self.initializeTooltip(chart.container.node());
        self.selectedItems = chart.selectedItems;
        self.rootClassName = self.seriesClassName();

        var reset = function(d) {
            d.yPos = 0;
            d.xPos = 0;
        };

        var data = this.dataset(),
            groupSelector = 'g.' + insight.Constants.BarGroupClass + '.' + this.name,
            groupClassName = insight.Constants.BarGroupClass + ' ' + this.name,
            barSelector = 'rect.' + insight.Constants.BarGroupClass;


        data.forEach(reset);


        var groups = chart.plotArea
            .selectAll(groupSelector)
            .data(data, this.keyvalueFunction);


        var newGroups = groups.enter()
            .append('g')
            .attr('class', groupClassName);

        var newBars = newGroups.selectAll(barSelector);

        var click = function(filter) {
            return self.click(this, filter);
        };

        var duration = function(d, i) {
            return 200 + (i * 20);
        };

        for (var seriesIndex in this.series) {

            this.currentSeries = this.series[seriesIndex];

            seriesName = this.currentSeries.name;
            seriesFunctions[seriesName] = this.currentSeries.valueFunction;

            var seriesSelector = '.' + seriesName + 'class.' + insight.Constants.BarClass;

            newBars = newGroups.append('rect')
                .attr('class', self.seriesSpecificClassName)
                .attr('height', 0)
                .attr('fill', this.currentSeries.color)
                .attr('in_series', seriesName)
                .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                .on('mouseover', mouseOver)
                .on('mouseout', this.mouseOut)
                .on('click', click);

            var bars = groups.selectAll(seriesSelector)
                .transition()
                .duration(duration)
                .attr('y', this.offsetYPosition)
                .attr('x', this.xPosition)
                .attr('height', this.groupedbarThickness)
                .attr('width', this.barWidth);
        }

        groups.exit()
            .remove();
    };

    return this;
};


insight.RowSeries.prototype = Object.create(insight.Series.prototype);
insight.RowSeries.prototype.constructor = insight.RowSeries;
;/**
 * The LineSeries class extends the Series class and draws horizontal bars on a Chart
 * @class insight.LineSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.LineSeries = function LineSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    var self = this,
        lineType = 'linear',
        displayPoints = true;


    this.classValues = [insight.Constants.LineClass];

    var lineOver = function(d, item) {

    };

    var lineOut = function(d, item) {

    };

    var lineClick = function(d, item) {

    };

    /**
     * Whether or not to show circular points on top of the line for each datapoint.
     * @memberof! insight.LineSeries
     * @instance
     * @returns {boolean} - To stack or not to stack.
     *
     * @also
     *
     * Sets whether or not to show circular points on top of the line for each datapoint.
     * @memberof! insight.LineSeries
     * @instance
     * @param {boolean} showPoints Whether or not to show circular points on top of the line for each datapoint.
     * @returns {this}
     */
    this.showPoints = function(value) {
        if (!arguments.length) {
            return displayPoints;
        }
        displayPoints = value;
        return this;
    };

    this.rangeY = function(d) {
        return self.y.scale(self.valueFunction()(d));
    };

    this.rangeX = function(d, i) {
        var val = 0;

        if (self.x.scale.rangeBand) {
            val = self.x.scale(self.keyFunction()(d)) + (self.x.scale.rangeBand() / 2);
        } else {

            val = self.x.scale(self.keyFunction()(d));
        }

        return val;
    };

    this.lineType = function(_) {
        if (!arguments.length) {
            return lineType;
        }
        lineType = _;
        return this;
    };

    this.draw = function(chart, dragging) {

        this.initializeTooltip(chart.container.node());

        var transform = d3.svg.line()
            .x(self.rangeX)
            .y(self.rangeY)
            .interpolate(lineType);

        var data = this.dataset();

        var classValue = this.name + 'line ' + insight.Constants.LineClass;
        var classSelector = '.' + this.name + 'line.' + insight.Constants.LineClass;

        var rangeIdentifier = "path" + classSelector;

        var rangeElement = chart.plotArea.selectAll(rangeIdentifier);

        if (!this.rangeExists(rangeElement)) {
            chart.plotArea.append("path")
                .attr("class", classValue)
                .attr("stroke", this.color)
                .attr("fill", "none")
                .attr("clip-path", "url(#" + chart.clipPath() + ")")
                .on('mouseover', lineOver)
                .on('mouseout', lineOut)
                .on('click', lineClick);
        }

        var duration = dragging ? 0 : 300;

        chart.plotArea.selectAll(rangeIdentifier)
            .datum(this.dataset(), this.matcher)
            .transition()
            .duration(duration)
            .attr("d", transform);

        if (displayPoints) {
            var circles = chart.plotArea.selectAll("circle")
                .data(this.dataset());

            circles.enter()
                .append('circle')
                .attr('class', 'target-point')
                .attr("clip-path", "url(#" + chart.clipPath() + ")")
                .attr("cx", self.rangeX)
                .attr("cy", chart.height() - chart.margin()
                    .bottom - chart.margin()
                    .top)
                .on('mouseover', self.mouseOver)
                .on('mouseout', self.mouseOut);


            circles
                .transition()
                .duration(duration)
                .attr("cx", self.rangeX)
                .attr("cy", self.rangeY)
                .attr("r", 3)
                .attr("fill", this.color);
        }
    };

    this.rangeExists = function(rangeSelector) {

        return rangeSelector[0].length;
    };
};

insight.LineSeries.prototype = Object.create(insight.Series.prototype);
insight.LineSeries.prototype.constructor = insight.LineSeries;
;/**
 * The ColumnSeries class extends the Series class and draws vertical bars on a Chart
 * @class insight.ColumnSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.ColumnSeries = function ColumnSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    var self = this,
        stacked = d3.functor(false),
        seriesName = '',
        seriesFunctions = {},
        barWidthFunction = this.x.rangeType;

    this.classValues = [insight.Constants.BarClass];

    this.series = [{
        name: 'default',
        valueFunction: function(d) {
            return self.valueFunction()(d);
        },
        tooltipValue: function(d) {
            return self.tooltipFunction()(d);
        },
        color: d3.functor(color),
        label: 'Value'
    }];


    var tooltipFunction = function(d) {
        var func = self.currentSeries.valueFunction;
        return self.tooltipFormat()(func(d));
    };

    /*
     * Given an object representing a data item, this method returns the largest value across all of the series in the ColumnSeries.
     * This function is mapped across the entire data array by the findMax method.
     * @memberof insight.ColumnSeries
     * @param {object} data An item in the object array to query
     * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
     */
    this.seriesMax = function(d) {
        var max = 0;
        var seriesMax = 0;

        var stacked = self.stacked();

        for (var series in self.series) {
            var s = self.series[series];

            var seriesValue = s.valueFunction(d);

            seriesMax = stacked ? seriesMax + seriesValue : seriesValue;

            max = seriesMax > max ? seriesMax : max;
        }

        return max;
    };


    /**
     * Extracts the maximum value on an axis for this series.
     * @memberof! insight.ColumnSeries
     * @instance
     * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
     */
    this.findMax = function() {
        var max = d3.max(self.dataset(), self.seriesMax);

        return max;
    };


    /**
     * Determines whether the series should stack columns, or line them up side-by-side.
     * @memberof! insight.ColumnSeries
     * @instance
     * @returns {boolean} - To stack or not to stack.
     *
     * @also
     *
     * Sets whether the series should stack columns, or line them up side-by-side.
     * @memberof! insight.ColumnSeries
     * @instance
     * @param {boolean} stacked Whether the column series should be stacked.
     * @returns {this}
     */
    this.stacked = function(stack) {
        if (!arguments.length) {
            return stacked();
        }
        stacked = d3.functor(stack);
        return this;
    };

    this.calculateYPos = function(func, d) {
        if (!d.yPos) {
            d.yPos = 0;
        }

        d.yPos += func(d);

        return d.yPos;
    };

    this.xPosition = function(d) {
        return self.x.scale(self.keyFunction()(d));
    };

    this.calculateXPos = function(width, d) {
        if (!d.xPos) {
            d.xPos = self.xPosition(d);
        } else {
            d.xPos += width;
        }
        return d.xPos;
    };

    this.yPosition = function(d) {

        var func = self.currentSeries.valueFunction;

        var position = self.stackedBars() ? self.y.scale(self.calculateYPos(func, d)) : self.y.scale(func(d));

        return position;
    };



    this.barWidth = function(d) {
        // comment for tom, this is the bit that is currently breaking the linear x axis, because d3 linear scales don't support the rangeBand() function, whereas ordinal ones do.
        // in js, you can separate the scale and range function using rangeBandFunction.call(self.x.scale, d), where rangeBandFunction can point to the appropriate function for the type of scale being used.
        return self.x.scale.rangeBand(d);
    };

    this.groupedBarWidth = function(d) {

        var groupWidth = self.barWidth(d);

        var width = self.stackedBars() || (self.series.length === 1) ? groupWidth : groupWidth / self.series.length;

        return width;
    };

    this.offsetXPosition = function(d) {
        var width = self.groupedBarWidth(d);
        var position = self.stackedBars() ? self.xPosition(d) : self.calculateXPos(width, d);

        return position;
    };

    this.stackedBars = function() {
        return self.stacked();
    };

    var click = function(filter) {
        return self.click(this, filter);
    };

    var duration = function(d, i) {
        return 200 + (i * 20);
    };

    var mouseOver = function(data, i) {
        var seriesName = this.getAttribute('in_series');
        var seriesFunction = seriesFunctions[seriesName];

        self.mouseOver.call(this, data, i, seriesFunction);
    };


    this.seriesSpecificClassName = function(d) {

        var additionalClass = ' ' + self.currentSeries.name + 'class';
        var baseClassName = self.itemClassName(d);
        var itemClassName = baseClassName + additionalClass;

        return itemClassName;
    };

    this.draw = function(chart, drag) {

        self.initializeTooltip(chart.container.node());
        self.selectedItems = chart.selectedItems;
        self.rootClassName = self.seriesClassName();

        var groupSelector = 'g.' + insight.Constants.BarGroupClass,
            barSelector = 'rect.' + insight.Constants.BarGroupClass;

        var reset = function(d) {
            d.yPos = 0;
            d.xPos = 0;
        };

        var data = self.dataset();

        data.forEach(reset);

        var groups = chart.plotArea
            .selectAll(groupSelector)
            .data(data, self.keyFunction());

        var newGroups = groups.enter()
            .append('g')
            .attr('class', insight.Constants.BarGroupClass);

        var newBars = newGroups.selectAll(barSelector);

        var barHeight = function(d) {
            var func = self.currentSeries.valueFunction;

            return (chart.height() - chart.margin()
                .top - chart.margin()
                .bottom) - self.y.scale(func(d));
        };

        for (var seriesIndex in self.series) {

            self.currentSeries = self.series[seriesIndex];

            seriesName = self.currentSeries.name;
            seriesFunctions[seriesName] = self.currentSeries.valueFunction;

            var seriesSelector = '.' + seriesName + 'class.' + insight.Constants.BarClass;

            // Add any new bars

            newBars = newGroups.append('rect')
                .attr('class', self.seriesSpecificClassName)
                .attr('y', self.y.bounds[0])
                .attr('height', 0)
                .attr('in_series', seriesName)
                .attr('fill', self.currentSeries.color)
                .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                .on('mouseover', mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', click);

            // Select and update all bars
            var bars = groups.selectAll(seriesSelector);

            bars
                .transition()
                .duration(duration)
                .attr('y', self.yPosition)
                .attr('x', self.offsetXPosition)
                .attr('width', self.groupedBarWidth)
                .attr('height', barHeight);
        }

        // Remove groups no longer in the data set
        groups.exit()
            .remove();
    };

    return this;
};

insight.ColumnSeries.prototype = Object.create(insight.Series.prototype);
insight.ColumnSeries.prototype.constructor = insight.ColumnSeries;
;if (typeof define === 'function' && define.amd) {

    define('insight', [], function() {
        return insight;
    });

}
