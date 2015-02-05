(function() {

    function isMissing(that, name) {
        return that[name] === undefined;
    }

    function isDefined(that, name) {
        return !isMissing(that, name);
    }

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

        helpers: {},
        defaultTheme: {}

    };

})();
;(function(insight) {

    /*
     * Measures the width and height of text using a given font.
     * @class insight.MarginMeasurer
     */
    insight.TextMeasurer = function TextMeasurer(canvas) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            measureCanvas = canvas;

        // Internal functions -------------------------------------------------------------------------------------------

        self.measureText = function(text, font, angleDegrees) {

            if (!angleDegrees) {
                angleDegrees = 0;
            }

            var measurer = insight.Utils.getDrawingContext(measureCanvas, font);
            var actualTextWidth = measurer.measureText(text).width;
            var roughTextHeight = measurer.measureText('aa').width;

            var angleRadians = insight.Utils.degreesToRadians(angleDegrees);

            var height = actualTextWidth * Math.sin(angleRadians) + roughTextHeight * Math.cos(angleRadians);
            var width = actualTextWidth * Math.cos(angleRadians) + roughTextHeight * Math.sin(angleRadians);

            // avoid rounding errors
            height = height.toFixed(10);
            width = width.toFixed(10);

            return {
                width: Math.ceil(width),
                height: Math.ceil(height)
            };

        };

    };

})(insight);
;insight.Constants = (function() {
    var exports = {};

    exports.Behind = 'behind';
    exports.Front = 'front';
    exports.ChartTitleClass = 'chart-title';
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
;/**
 * Convenience formatters for formatting string values.
 * @namespace insight.formatters
 */
insight.Formatters = (function(d3) {


    return {

        /** Format the number with £, thousand-groupings, and 2 decimal places.
         * @example 2345.2 becomes '£2,345.20'.
         * @memberof! insight.Formatters
         * @param {Number} value The value to be formatted.
         * @returns {String} - The formatted value.
         */
        currencyFormatter: function(value) {
            var format = d3.format(",.02f");
            return '£' + format(value);
        },

        /** Format the number with thousand-groupings.
         * @example 2345.2234 becomes '2,345.2234'.
         * @memberof! insight.Formatters
         * @param {Number} value The value to be formatted.
         * @returns {String} - The formatted value.
         */
        numberFormatter: function(value) {
            var format = d3.format(",.f");
            return format(value);
        },

        /** Format the date as a month and year.
         * @example new Date(2014,0,1) becomes 'Jan 2014'.
         * @memberof! insight.Formatters
         * @param {Date} date The date to be formatted.
         * @returns {String} - The date formatted as a string.
         */
        dateFormatter: function(date) {
            var format = d3.time.format("%b %Y");
            return format(date);
        },

        /** Format the number as a percentage.
         * @example 0.15 becomes '15%'.
         * @memberof! insight.Formatters
         * @param {Number} value The number to be formatted.
         * @returns {String} - The formatted value.
         */
        percentageFormatter: function(value) {
            var format = d3.format("%");
            return format(value);
        },

        /** A wrapper for d3.format().
         * See <a href="https://github.com/mbostock/d3/wiki/Formatting#d3_format">D3 API reference</a> for more information.
         * @memberof! insight.Formatters
         * @param {String} format The format to apply.
         * @param {Object} value The value to be formatted.
         * @returns {String} - The formatted value.
         */
        format: function(format, value) {
            var formatter = d3.format(format);
            return formatter(value);
        }

    };

}(d3));
;/*
 * An internal module containing helper functions used throughout the library
 */
insight.Utils = (function() {

    var exports = {};

    // Private functions -----------------------------------------------------------------------------------------

    /*
     * This recursive function takes two values a and b, a list of sort objects [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}] and an index of the current function being used to sort.
     * It returns a ordering value for a and b, as per the normal Javascript sorting rules https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @memberof! insight.Utils
     * @returns {int} sortResult - if a > b then the result = 1, -1 if a < b and 0 if a == b.
     * @param {object} a - Description
     * @param {object} b - Description
     * @param {object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
     */
    function recursiveSort(a, b, sorters) {
        if (sorters.length === 0) {
            return 0;
        }

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
    }

    // Internal functions -------------------------------------------------------------------------------------------

    /*
     * Checks if an object is an array or not
     * @returns {boolean} return - is the object an array
     * @param {object} input - The object to check
     */
    exports.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /*
     * Checks if an object is an function or not
     * @returns {boolean} return - is the object a function
     * @param {object} input - The object to check
     */
    exports.isFunction = function(obj) {
        return obj instanceof Function;
    };

    /*
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

    /*
     * Returns true/false if an object is inside an array.
     * @memberof! insight.Utils
     * @param {object[]} array - The array to check
     * @param {object} value - The value to check for
     * @returns {boolean} - True if the provided array contains the provided value
     */
    exports.arrayContains = function(array, value) {
        return array.indexOf(value) !== -1;
    };

    /*
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
                if (a[i] === a[j]) {
                    a.splice(j--, 1);
                }
            }
        }

        return a;
    };

    /*
     * Returns the last element in an array
     * @param {Array} Any array
     * @returns The last element in the array or undefined if the array is empty or the parameter is not an array
     */
    exports.lastElement = function(array) {

        if (!insight.Utils.isArray(array) || array.length === 0) {
            return undefined;
        }

        return array.slice(array.length - 1)[0];
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
        if (!sorters.length) {
            return array;
        }

        // create a comparison function that takes two values, and tries to sort them according to the provided sorting functions and orders.
        // the sorting functions will be recursively tested if the values a and b are equal until an ordering is established or all or the sorter list is exhausted.
        function sortFunction(a, b) {
            var result = recursiveSort(a, b, sorters, 0);
            return result;
        }

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
        return input.split(' ').join('_');
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

    exports.getNativeComputedStyle = function(element) {
        return window.getComputedStyle(element);
    };

    // Helper functions for text measurement.
    // Mock out in tests to remove dependency on window and DOM functions

    exports.getElementStyles = function(textElement, styleProperties) {

        var style = exports.getNativeComputedStyle(textElement);
        var properties = {};

        styleProperties.forEach(function(propertyName) {
            properties[propertyName] = style.getPropertyValue(propertyName);
        });

        return properties;
    };

    exports.getDrawingContext = function(canvas, font) {

        var ctx = canvas.getContext('2d');
        ctx.font = font;

        return ctx;
    };

    exports.fontSizeFromFont = function(font) {

        var defaultSize = 12;
        if (!font) {
            return defaultSize;
        }

        var fontComponents = font.split(' ');

        for (var i = 0; i < fontComponents.length; i++) {
            var parsed = parseInt(fontComponents[i]);

            if (!isNaN(parsed)) {
                return parsed;
            }
        }

        return defaultSize;

    };

    exports.degreesToRadians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    return exports;

}());
;(function(insight) {

    /**
     * The ErrorContainer class is used to capture errors in operations within InsightJs.
     * An instance of the ErrorContainer class must only be passed to one function.
     * @class insight.ErrorContainer
     */
    insight.ErrorContainer = function ErrorContainer() {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            data = null,
            message = null,
            state = insight.ErrorContainer.State.success;

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Records an error message with optional data.
         * @memberof! insight.ErrorContainer
         * @instance
         * @param {String} errorMessage
         * @param {Object} [errorData]
         */
        self.setError = function(errorMessage, errorData) {

            message = errorMessage;
            data = errorData === undefined ? null : errorData;
            state = insight.ErrorContainer.State.error;

        };

        /*
         * Records a warning message with optional data.
         * @memberof! insight.ErrorContainer
         * @instance
         * @param {String} errorMessage
         * @param {Object} [errorData]
         */
        self.setWarning = function(warningMessage, warningData) {

            if (state === insight.ErrorContainer.State.error) {
                return;
            }

            message = warningMessage;
            data = warningData === undefined ? null : warningData;
            state = insight.ErrorContainer.State.warning;

        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * The data associated with the error or warning.
         * @memberof! insight.ErrorContainer
         * @instance
         * @returns {Object} - The data associated with the error or warning.
         */
        self.data = function() {
            return data;
        };

        /**
         * The descriptive message associated with the error or warning.
         * @memberof! insight.ErrorContainer
         * @instance
         * @returns {String} - The descriptive message associated with the error or warning.
         */
        self.message = function() {
            return message;
        };

        /**
         * The state of the ErrorContainer.
         * @memberof! insight.ErrorContainer
         * @instance
         * @returns {String} - The state of the ErrorContainer.
         * This will be one of the values of <code>insight.ErrorContainer.State</code>.
         */
        self.state = function() {
            return state;
        };

    };

    /**
     * The ErrorContainer State object (enum) is used describe the state of an error container.
     * @enum {String}
     */
    insight.ErrorContainer.State = {
        /** Indicates an error has taken place, any subsequent warnings are ignored by the ErrorContainer */
        error: 'error',
        /** The initial state of an ErrorContainer.  Used to indicate that an operation was successful - no warnings or errors set */
        success: 'success',
        /** Indicates an warning has taken place, any subsequent errors will over-write the warning in the ErrorContainer */
        warning: 'warning'

    };

})(insight);
;(function(insight) {
    /**
     * Error messages used throughout the library
     * @enum {String}
     */
    insight.ErrorMessages = {

        invalidArrayParameterException: 'Expects array parameter.',

        invalidDataSetOrArrayParameterException: 'Expects insight.DataSet or an object Array parameter.',

        invalidFunctionParameterException: 'Expects function parameter.',

        nonNumericalPairsException: 'Expect all values used to be numeric.' +
            'At least one invalid pair of values was found, see the data for the details of all invalid pairs.',

        unequalLengthArraysException: 'Expects both arrays to have equal length.'
    };


})(insight);
;/**
 * Helper functions used throughout the library
 * @namespace insight.helpers.functions
 */
insight.helpers.functions = (function() {

    return {

        /**
         * Returns a property accessor function associated with a particular property name - in the form of a string.
         * The returned property accessor function takes an object and traverses the object until it finds
         * a property with that name.
         * @memberof! insight.helpers.functions
         * @param {String} propertyName - A string of the property to search, can include sub-properties using a dot notation.
         * Eg. 'value.Revenue.Sum', which cannot be indexed directly in Javascript.
         * @returns {Function} - True if the provided array contains the provided value
         * @example // Creates a forenameAccessor function
         * var anObject = {
         *     name: {
         *         forename: 'Bob'
         *     }
         * };

         * var forenameAccessor = insight.Utils.createPropertyAccessor('name.forename');

         * var result = forenameAccessor(anObject); // 'Bob'
         */
        createPropertyAccessor: function(propertyName) {

            var arr = propertyName.split('.');

            return function(obj) {

                var name;
                var result = obj;

                for (var i = 0; i < arr.length; i++) {

                    if (result == null) {
                        return undefined;
                    }

                    name = arr[i];
                    result = result[name];
                }

                return result;

            };

        }
    };

}());
;/**
 * Module for calculating correlation coefficients on pairs of values.
 * @namespace insight.correlation
 */
insight.correlation = (function(insight) {

    var correlation = {};

    /**
     * Calculates the pearson correlation coefficient for two arrays of numbers.
     * The two arrays must be equal in length and must only contain numbers.
     * @memberof! insight.correlation
     * @param {Array<Number>} x The x values
     * @param {Array<Number>} y The y values
     * @param {Object} [errorContainer] An object that will contain
     * information about any errors that were encountered with the operation.
     * @returns {Number} - The pearson correlation coefficient for two arrays of numbers
     */
    correlation.fromValues = function(x, y, errorContainer) {

        if (!(errorContainer instanceof insight.ErrorContainer)) {
            errorContainer = new insight.ErrorContainer();
        }

        if (!insight.Utils.isArray(x) || !insight.Utils.isArray(y)) {

            errorContainer.setError(insight.ErrorMessages.invalidArrayParameterException);

            return undefined;

        }

        if (x.length !== y.length) {

            var inputLengths = {
                xLength: x.length,
                yLength: y.length
            };

            errorContainer.setError(insight.ErrorMessages.unequalLengthArraysException, inputLengths);

            return undefined;

        }

        var xyPairs = zipTwoArrays(x, y);
        var invalidPairs = xyPairs.filter(isNotPairOfNumbers);
        var validPairs = xyPairs.filter(isPairOfNumbers);
        var validX = validPairs.map(function(element) {
            return element.x;
        });
        var validY = validPairs.map(function(element) {
            return element.y;
        });

        if (invalidPairs.length > 0) {
            errorContainer.setWarning(insight.ErrorMessages.nonNumericalPairsException, invalidPairs);
        }

        if (validX.length < 2) {
            return validX.length;
        }

        var meanX = mean(validX);
        var meanY = mean(validY);
        var xDeviation = subtract(validX, meanX);
        var yDeviation = subtract(validY, meanY);
        var xDeviationSquared = multiply(xDeviation, xDeviation);
        var yDeviationSquared = multiply(yDeviation, yDeviation);

        var deviationProduct = multiply(xDeviation, yDeviation);
        var r = sum(deviationProduct) / Math.sqrt(sum(xDeviationSquared) * sum(yDeviationSquared));

        return r;

    };

    /**
     * Calculates the pearson correlation coefficients for a given property pair in the dataset.
     * @memberof! insight.correlation
     * @param {insight.DatSet|Object[]} dataset The insight.DataSet or array to calculate correlation coefficients for.
     * @param {Function} xFunction A function that will return a value from one element in the dataset.
     * The value that the function returns will be used in the correlation calculation.
     * @param {Function} yFunction A function that will return a value from one element in the dataset.
     * The value that the function returns will be used in the correlation calculation.
     * @param {Object} [errorContainer] An object that will contain
     * information about any errors that were encountered with the operation.
     * @returns {Number} - The pearson correlation coefficient for the given property pair in the dataset.
     */
    correlation.fromDataSet = function(dataset, xFunction, yFunction, errorContainer) {
        if (!(errorContainer instanceof insight.ErrorContainer)) {
            errorContainer = new insight.ErrorContainer();
        }

        var dataArray = getArray(dataset);

        if (!insight.Utils.isArray(dataArray)) {

            errorContainer.setError(insight.ErrorMessages.invalidDataSetOrArrayParameterException);

            return undefined;

        }

        if (!insight.Utils.isFunction(xFunction) || !insight.Utils.isFunction(yFunction)) {

            errorContainer.setError(insight.ErrorMessages.invalidFunctionParameterException);

            return undefined;
        }

        var x = dataArray.map(xFunction);
        var y = dataArray.map(yFunction);

        var r = insight.correlation.fromValues(x, y, errorContainer);

        return r;
    };

    /*
     * Returns an array based on the given object.
     * If the object is an insight.DataSet or an insight.Grouping then its data is returned, otherwise the array id returned directly.
     */
    function getArray(obj) {

        if (obj instanceof insight.DataSet || obj instanceof insight.Grouping) {
            return obj.getData();
        }

        return obj;

    }

    /*
     * Takes two input sequences and produces an output sequence where elements with the same index are stored in a single object.
     * Assumes that both arrays have the same length.
     */
    function zipTwoArrays(x, y) {
        var results = x.map(function(xValue, index) {
            var yValue = y[index];
            return {
                x: xValue,
                y: yValue,
                index: index
            };
        });

        return results;
    }

    function isPairOfNumbers(element) {
        var result = insight.Utils.isNumber(element.x) && insight.Utils.isNumber(element.y);

        return result;
    }

    function isNotPairOfNumbers(element) {
        return !isPairOfNumbers(element);
    }

    /*
     * Sums the elements of an array;
     */
    function sum(array) {

        return array.reduce(function(previous, current) {
            return previous + current;

        });

    }

    /*
     * Calculates the mean of all elements in an array
     */
    function mean(array) {

        return sum(array) / array.length;

    }

    /*
     * Multiplies each element in an array with the corresponding element
     * in another array and returns a new array with the results.
     */
    function multiply(array1, array2) {

        var multiplied = [];

        for (var i = 0; i < array1.length; i++) {

            multiplied.push(array1[i] * array2[i]);

        }

        return multiplied;

    }

    /*
     * Subtracts a constant from each element in an array and returns a new array with the results.
     */
    function subtract(array, constant) {

        return array.map(function(d) {

            return d - constant;

        });

    }

    return correlation;

})(insight);
;(function(insight) {
    /**
     * A DataSet is wrapper around a simple object array, but providing some functions that are required by charts to load and filter data.
     * A DataSet should be used with an array of data that is to be charted without being used in a crossfilter or dimensional dataset.
     * @class insight.DataSet
     * @constructor
     * @param {object[]} data - The short name used to identify this dimension, and any linked dimensions sharing the same name
     */
    insight.DataSet = function DataSet(data) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -----------------------------------------------------------------------------------------

        self.data = data;
        self.crossfilterData = null;

        // Private functions ------------------------------------------------------------------------------------------

        function orderFunction(a, b) {
            return b.value - a.value;
        }

        function filterFunction(d) {
            return true;
        }

        // Public functions -------------------------------------------------------------------------------------------

        self.initialize = function() {

        };

        /**
         * The function to use to filter an object from the dataset.
         * The function should return a boolean where false means the object is not included in the dataset.
         * @memberof! insight.DataSet
         * @instance
         * @returns {Function} - The function to use to filter an object from the dataset.
         *
         * @also
         *
         * Sets the function to use to filter an object from the dataset.
         * The function should return a boolean where false means the object is not included in the dataset.
         * @memberof! insight.DataSet
         * @instance
         * @param {Function} filterFunc The new function to use to filter an object from the dataset.
         * @returns {this}
         */
        self.filterFunction = function(filterFunc) {

            if (!arguments.length) {
                return filterFunction;
            }

            filterFunction = filterFunc;

            return self;
        };

        /** Fetch all the data currently held in this dataset, filtered by the `filterFunction`.
         * @memberof! insight.DataSet
         * @instance
         * @param {Function} [orderFunc] If provided then the data will be returned ordered using this function.
         * @returns {object[]} data All data currently held by the dataset.
         */
        self.getData = function(orderFunc) {

            var data;

            if (self.data.all) {
                data = self.data.all();
            } else {
                //not a crossfilter set
                data = self.data;
            }

            if (orderFunc) {
                data = data.sort(orderFunc);
            }

            data = data.filter(filterFunction);

            return data;
        };

        /**
         * Gets the function used to order the dataset values
         * @memberof! insight.DataSet
         * @instance
         * @returns {Function} - The current ordering function
         *
         * @also
         *
         * Sets the function used to order the dataset values
         * @memberof! insight.DataSet
         * @instance
         * @param {Function} orderFunc The ordering function
         * @returns {this}
         */
        self.orderingFunction = function(orderFunc) {

            if (!arguments.length) {
                return orderFunction;
            }

            orderFunction = orderFunc;

            return self;
        };

        self.getOrderedData = function() {
            var data;

            data = self.data
                .filter(filterFunction)
                .sort(orderFunction);

            return data;
        };

        self.group = function(name, groupFunction, oneToMany) {

            self.crossfilterData = self.crossfilterData || crossfilter(self.data);

            var dim = new insight.Dimension(name, self.crossfilterData, groupFunction, oneToMany);

            var group = new insight.Grouping(dim);

            return group;
        };

    };

})(insight);
;(function(insight) {
    /**
     * A Dimension organizes a dataset along a particular property, or variation of a property.
     * Defining a dimension with a function of:<pre><code>function(d){ return d.Surname; }</code></pre> will slice a dataset by the distinct values of the Surname property.
     * @constructor
     * @todo reimplement how Dimensions are created.  Too much is inside ChartGroup at the moment, and ChartGroup is becoming redundant and too mixed
     * @todo display function should be provided by a setter.
     * @param {String} name - The short name used to identify this dimension, and any linked dimensions sharing the same name
     * @param {crossfilter} crossfilterData - The crossfilter object to create the Dimension on.
     * @param {function} sliceFunction - The function used to categorize points within the dimension.
     * @param {boolean} oneToMany - Whether or not this dimension represents a collection of possible values in each item.
     * @class
     */
    insight.Dimension = function Dimension(name, crossfilterData, sliceFunction, oneToMany) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -----------------------------------------------------------------------------------------

        self.crossfilterDimension = crossfilterData.dimension(sliceFunction);
        self.name = name;
        self.filters = [];
        self.oneToMany = oneToMany;
        self.aggregationFunction = sliceFunction;

        // Private functions ------------------------------------------------------------------------------------------

        function oneToManyFilterFunction(filterValue) {
            return function(d) {
                return insight.Utils.arrayContains(d, filterValue);
            };
        }

        function filterFunction(filterValue) {
            return function(d) {
                return String(d) === String(filterValue);
            };
        }

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Local helper function that creates a filter object given an element that has been clicked on a Chart or Table.
         * The filter object creates the function used by crossfilter to remove or add objects to an aggregation after a filter event.
         * It also includes a simple name variable to use for lookups.
         * @memberof! insight.Dimension
         * @param {object} filteredValue - The value to create a crossfilter filter function for.
         * @returns {function} - A function that a crossfilterdimension.filter() operation can use to map-reduce crossfilter aggregations.
         */
        self.createFilterFunction = function(filteredValue) {

            // create the appropriate type of filter function for this Dimension
            var filterFunc = self.oneToMany ? oneToManyFilterFunction(filteredValue) : filterFunction(filteredValue);

            return {
                name: filteredValue,
                filterFunction: filterFunc
            };
        };

    };

})(insight);
;/**
 * A Grouping is generated on a dimension, to reduce the items in the data set into groups along the provided dimension
 * @class insight.Grouping
 * @constructor
 * @param {dimension} dimension - The dimension to group
 */
(function(insight) {

    insight.Grouping = function Grouping(dimension) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            sumProperties = [],
            countProperties = [],
            cumulativeProperties = [],
            averageProperties = [],
            correlationPairProperties = [],
            allCorrelationProperties = [],
            ordered = false,
            filterFunction = null,
            orderFunction;

        // Internal variables -----------------------------------------------------------------------------------------

        self.dimension = dimension;

        // Private functions ------------------------------------------------------------------------------------------

        // The default post aggregation step is blank, and can be overriden by users if they want to calculate additional values with this Grouping
        function postAggregation(grouping) {

        }

        /*
         * Takes an object and a property name in the form of a string, traversing the object until it finds a property with that name and returning
         * a wrapped object with the immediate parent of the found property and the property's value.
         * @param {object} - The object to search
         * @param {string} propertyName - A string of the property to search, can include sub-properties using a dot notation. Eg. 'value.Revenue.Sum', which cannot be indexed directly in Javascript.
         */
        function getDescendant(obj, propertyName) {
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
        }

        /*
         * Takes a group object and calculates the mean for any properties configured.
         * @param {object} group - A dimensional slice of a Grouping {key: 'X', value : {}}
         */
        function calculateAverages(group) {


            for (var i = 0, len = averageProperties.length; i < len; i++) {

                var propertyName = averageProperties[i];
                var propertyValue = group.value[propertyName];
                var mean = propertyValue.Sum / propertyValue.Count;

                mean = insight.Utils.isNumber(mean) && isFinite(mean) ? mean : undefined;

                group.value[propertyName].Average = mean;
            }
        }

        /*
         * Calculates running cumulative values for any properties defined in the cumulative() list.
         * @param {object} group - The data group being added to the cumulative running totals list
         * @param {object} totals - The map object of running totals for the defined properties
         */
        function calculateCumulativeValues(group, totals) {

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
        }

        /*
         * Calculates correlation coefficient values for all configured property pairs on the grouping.
         * So after this function has run there will be a number of properties on the grouping value called
         * 'X_Cor_Y' where X and Y are the configured property names.
         */
        function calculateCorrelations() {

            /*
             * Returns a property name for the deviation product array used in the correlation workings
             */
            function deviationProductNameFunction(xName, yName) {

                return xName + '_' + yName + '_DeviationProduct';

            }

            /*
             * Returns an empty object that will contain the correlation working data
             */
            function correlationReduceInitialize() {

                return {};

            }

            /*
             * Returns the function to use for creating a reduciton of all groups in order to calculate correlation
             * between properties in a group.
             */
            function correlationReduceAdd(aggregatedData) {

                var globalData = aggregatedData;

                /*
                 * This is the function that does the reduction to produce working data for correlation calculations.
                 */
                return function(workings, addingData) {

                    allCorrelationProperties.forEach(function(propertyName) {

                        if (addingData.hasOwnProperty(propertyName)) {

                            // get this grouping from the global data
                            var groupData = insight.Utils.takeWhere(globalData, 'key', self.dimension.aggregationFunction(addingData))[0].value;

                            // get the group mean from global data for this grouping
                            var groupMean = groupData[propertyName].Average;

                            var value = addingData[propertyName];
                            var deviation = value - groupMean;
                            var deviationSquared = deviation * deviation;

                            // we need to track each deviation and its square so add them to workings
                            if (!workings[propertyName]) {
                                workings[propertyName] = {
                                    deviation: [],
                                    deviationSquared: []
                                };
                            }

                            workings[propertyName].deviation.push(deviation);
                            workings[propertyName].deviationSquared.push(deviationSquared);

                        }

                    });

                    // having added to the deviation and deviationSquared we can now add
                    // the product of each pair's deviations to the workings object
                    correlationPairProperties.forEach(function(pair) {

                        var xName = pair[0],
                            yName = pair[1],
                            xDeviation = insight.Utils.lastElement(workings[xName].deviation),
                            yDeviation = insight.Utils.lastElement(workings[yName].deviation),
                            correlationName = deviationProductNameFunction(xName, yName);

                        if (!workings[correlationName]) {
                            workings[correlationName] = [];
                        }

                        workings[correlationName].push(xDeviation * yDeviation);

                    });

                    return workings;

                };

            }

            function correlationReduceRemove(aggregatedData) {

                return function() {

                };

            }

            var completeData = self.data.all();

            // the correlationData reduction calculates the deviation squared for
            // all properties in allCorrelationProperties (a private variable on Grouping)
            var correlationWorkingData = self.dimension.crossfilterDimension.group()
                .reduce(
                    correlationReduceAdd(completeData),
                    correlationReduceRemove(completeData),
                    correlationReduceInitialize)
                .all();

            correlationWorkingData.forEach(function(d) {

                function sum(array) {
                    return array.reduce(function(previous, current) {
                        return previous + current;
                    });
                }

                correlationPairProperties.forEach(function(pair) {

                    var xName = pair[0];
                    var yName = pair[1];
                    var deviationProductName = deviationProductNameFunction(xName, yName);
                    var sumDeviationProduct = sum(d.value[deviationProductName]);
                    var sumXDeviationSquared = sum(d.value[xName].deviationSquared);
                    var sumYDeviationSquared = sum(d.value[yName].deviationSquared);

                    var correlationCoefficient = sumDeviationProduct / Math.sqrt(sumXDeviationSquared * sumYDeviationSquared);

                    var thisGroup = completeData.filter(function(item) {
                        return item.key === d.key;
                    })[0];

                    var correlationName = xName + '_Cor_' + yName;
                    thisGroup.value[correlationName] = correlationCoefficient;

                });

            });

        }

        /*
         * Used to calculate any values that need to run after the data set has been aggregated into groups and basic values
         */
        function postAggregationCalculations() {

            var totals = {};

            var data = self.isOrdered() ? self.getData(self.orderFunction()) : self.getData();

            data.forEach(function(d) {

                calculateAverages(d);

                calculateCumulativeValues(d, totals);

            });

            if (correlationPairProperties.length > 0) {

                calculateCorrelations();

            }

            // Run any user injected functions post aggregation
            postAggregation(self);
        }

        /*
         * Called by the map reduce process on a DataSet when an input object is being added to the aggregated group
         * @returns {object} group - The group entry for this slice of the aggregated dataset, modified by the addition of the data object
         * @param {object} group - The group entry for this slice of the aggregated dataset, prior to adding the input data object
         * @param {object} data - The object being added from the aggregated group.
         */
        function reduceAddToGroup(group, data) {

            group.Count++;

            var propertyName,
                i,
                len;

            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    group[propertyName].Sum += data[propertyName];
                    group[propertyName].Count++;
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
        }

        /*
         * Called by the map reduce process on a DataSet when an input object is being filtered out of the group
         * @returns {object} group - The group entry for this slice of the aggregated dataset, modified by the removal of the data object
         * @param {object} group - The group entry for this slice of the aggregated dataset, prior to removing the input data object
         * @param {object} data - The object being removed from the aggregated group.
         */
        function reduceRemoveFromGroup(group, data) {

            group.Count--;

            var propertyName,
                i,
                len;

            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    group[propertyName].Sum -= data[propertyName];
                    group[propertyName].Count--;
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
        }

        /*
         * Called when a slice of an aggrgated DataSet is being initialized, creating initial values for certain properties
         * @returns {object} return - The initialized slice of this aggreagted DataSet.  The returned object will be of the form {key: '
         Distinct Key ', value: {}}
         */
        function reduceInitializeGroup() {
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
                group[propertyName].Count = 0;
            }

            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];
                group[propertyName] = group[propertyName] ? group[propertyName] : {};
                group[propertyName].Total = 0;
            }

            return group;
        }

        /*
         * This aggregation method is tailored to dimensions that can hold multiple values (in an array), therefore they are counted differently.
         * For example: a property called supportedDevices : ['iPhone5 ', 'iPhone4 '] where the values inside the array are treated as dimensional slices
         * @returns {object[]} return - the array of dimensional groupings resulting from this dimensional aggregation
         */
        function reduceMultidimension() {

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

            var data = self.dimension.crossfilterDimension.groupAll()
                .reduce(reduceAdd, reduceRemove, reduceInitial);

            self.orderFunction(function(a, b) {
                return b.value - a.value;
            });

            return data;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Gets the function that will run after the map reduce stage of this Grouping's aggregation.This is an empty
         * function by default, and can be overriden by the setter.
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
        self.postAggregation = function(postAggregationFunc) {
            if (!arguments.length) {
                return postAggregation;
            }
            postAggregation = postAggregationFunc;
            return self;
        };

        /*
         * Called when any post aggregation calculations need to be recalculated.
         * For example, calculating group percentages after totals have been created during map-reduce.
         * @memberof! insight.Grouping
         * @instance
         */
        self.recalculate = function() {

            postAggregationCalculations();
        };

        /*
         * Performs the aggregation of the underlying crossfilter dimension, calculating any additional properties during the map-reduce phase.
         * It must be run prior to a group being used
         * @todo This should probably be run during the constructor? If not, lazily evaluated by getData() if it hasn't been run already.
         */
        self.initialize = function() {

            var basicGroupData;

            if (self.dimension.oneToMany) {
                // Dimensions that are one to many {supportedLanguages: ['EN', 'DE']} as opposed to {supportedLanguage: 'EN'} need to be aggregated differently
                basicGroupData = reduceMultidimension();
            } else {
                // this is crossfilter code.  It calls the crossfilter.group().reduce() functions on the crossfilter dimension wrapped inside our insight.Dimension
                // more info at https://github.com/square/crossfilter/wiki/API-Reference
                // the add, remove and initialie functions are called when crossfilter is aggregating the groups, and is amending the membership of the different
                // dimensional slices (groups)
                basicGroupData = self.dimension.crossfilterDimension.group()
                    .reduce(
                        reduceAddToGroup,
                        reduceRemoveFromGroup,
                        reduceInitializeGroup
                );


            }

            self.data = basicGroupData;

            postAggregationCalculations(self);

            return self;
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Returns the list of properties to be summed on this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names that will be summed
         *
         * @also
         *
         * Sets the list of property names that will be summed in this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of property names to be summed for slices in this Grouping.
         */
        self.sum = function(properties) {
            if (!arguments.length) {
                return sumProperties;
            }
            sumProperties = properties;
            return self;
        };

        /*
         * Returns the list of property pairs whose correlation coefficient should be caclulated in this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {Array<String[]>} - The list of property pairs that will be summed.Each pair is an array of two strings
         * @also
         * Sets the list of property pairs whose correlation coefficient should be caclulated in this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {Array<String[]>} properties - An array of property pairs whose correlation coefficient should
         * be caclulated in this Grouping
         */
        self.correlationPairs = function(properties) {
            if (!arguments.length) {
                return correlationPairProperties;
            }

            correlationPairProperties = properties;

            for (var i = 0, len = properties.length; i < len; i++) {
                insight.Utils.addToSet(allCorrelationProperties, properties[i][0]);
                insight.Utils.addToSet(allCorrelationProperties, properties[i][1]);
            }

            // need mean for correlation
            averageProperties = insight.Utils.arrayUnique(averageProperties.concat(allCorrelationProperties));

            // need sum for mean so set that too
            sumProperties = insight.Utils.arrayUnique(sumProperties.concat(allCorrelationProperties));

            return self;
        };

        /**
         * Returns the list of properties that will be cumulatively summed over this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names that will be cumulatively summed
         *
         * @also
         *
         * Sets the list of properties that will be cumulatively summed over this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of property names to be cumulatively summed over slices in this Grouping.
         */
        self.cumulative = function(properties) {
            if (!arguments.length) {
                return cumulativeProperties;
            }
            cumulativeProperties = properties;
            return self;
        };

        /**
         * Returns the list of properties whose distinct value occurences will be counted during the reduction of this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names whose values will be counted
         *
         * @also
         *
         * Sets the array of properties whose distinct value occurences will be counted during the reduction of this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of properties whose distinct value occurences will be counted during the reduction of this Grouping
         */
        self.count = function(properties) {
            if (!arguments.length) {
                return countProperties;
            }
            countProperties = properties;
            return self;
        };

        /**
         * Returns the list of properties whose mean will be calculated after the map reduce of this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {string[]} - The list of property names that will averaged
         *
         * @also
         *
         * Sets the array of properties whose mean will be calculated after the map reduce of this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {string[]} properties - An array of properties that will be averaged after the map reduce of this Grouping.
         */
        self.mean = function(properties) {
            if (!arguments.length) {
                return averageProperties;
            }
            averageProperties = properties;

            sumProperties = insight.Utils.arrayUnique(sumProperties.concat(averageProperties));

            return self;
        };

        /**
         * The function used to compare the elements in this grouping if sorting is requested.
         * @instance
         * @memberof! insight.Grouping
         * @returns {Function} orderingFunction - The function used to compare two values when sort() is called on an array
         *
         * @also
         *
         * Sets the function used to compare the elements in this grouping if sorting is requested.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {Function} orderingFunction - The comparison function to be used to sort the elements in this group.
         * The function should take the form of a standard
         * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/GlobalvalueObjects/Array/sort|Javascript comparison function}.
         */
        self.orderFunction = function(orderingFunction) {
            if (!arguments.length) {
                return orderFunction;
            }
            orderFunction = orderingFunction;
            return self;
        };

        /**
         * Whether the group's data is ordered.
         * @instance
         * @memberof! insight.Grouping
         * @returns {boolean} - Whether the group's data is ordered.
         *
         * @also
         *
         * Sets if this Grouping will be ordered or not
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {boolean} ordered - Whether to order this Grouping or not
         */
        self.isOrdered = function(value) {
            if (!arguments.length) {
                return ordered;
            }
            ordered = value;

            return self;
        };

        /**
         * The function used to filter the results returned by this grouping.
         * The function returns true to keep the value, or false to remove it from the final result.
         * @instance
         * @memberof! insight.Grouping
         * @returns {Function} - The function used to filter the results returned by this grouping.
         *
         * @also
         *
         * Sets the function used to filter the results returned by this grouping.
         * The function returns true to keep the value, or false to remove it from the final result.
         * @instance
         * @memberof! insight.Grouping
         * @param {Function} filterFunc - The function used to filter the results returned by this grouping.
         * @returns {this}
         */
        self.filterFunction = function(filterFunc) {
            if (!arguments.length) {
                return filterFunction;
            }
            filterFunction = filterFunc;
            return self;
        };

        /**
         * Used to return the group's data, without ordering.  It checks if there is any filtering requested and applies the filter to the return array.
         * @memberof! insight.Grouping
         * @instance
         * @returns {object[]} return - The grouping's data in an object array, with an object per slice of the dimension.
         */
        self.getData = function(orderFunction, top) {
            var data;

            // Set the provided order function if it has been given, otherwise use the inherent grouping order if one has been defined.
            var orderFunc = orderFunction ? orderFunction : self.orderFunction();

            if (!self.data) {
                self.initialize();
            }

            if (self.dimension.oneToMany) {
                data = self.data.value().values;
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

    };

})(insight);
;(function(insight) {

    /**
     * The Theme base class provides the basic structure of a theme, to allow the Chart, Series or Axis to extract values
     * from it to style themselves.
     *
     * All values are `undefined`, being properly set in the subclasses of Theme.
     * @class insight.Theme
     */
    insight.Theme = function Theme() {

        //Do nothing, just be a base class

        var self = this;

        self.axisStyle = {
            gridlineWidth: undefined,
            gridlineColor: undefined,
            showGridlines: undefined,

            tickSize: undefined,
            tickPadding: undefined,

            axisLineWidth: undefined,
            axisLineColor: undefined,

            tickLabelFont: undefined,
            tickLabelColor: undefined,

            axisLabelFont: undefined,
            axisLabelColor: undefined
        };

        self.chartStyle = {
            seriesPalette: undefined,
            fillColor: undefined,
            titleFont: undefined,
            titleColor: undefined
        };

        self.seriesStyle = {
            showPoints: undefined,
            lineStyle: undefined
        };

        self.tableStyle = {

        };
    };

})(insight);
;(function(insight) {

    /**
     * A Theme for drawing on a lightly coloured background. Sets a number of the properties defined in the Theme base
     * class.
     * @class insight.LightTheme
     */
    insight.LightTheme = function LightTheme() {

        var self = this;

        insight.Theme.apply(self);

        //Configure for axis
        self.axisStyle.gridlineWidth = 1;
        self.axisStyle.gridlineColor = '#888';
        self.axisStyle.showGridlines = false;

        self.axisStyle.tickSize = 1;
        self.axisStyle.tickPadding = 10;

        self.axisStyle.axislineWidth = 1;
        self.axisStyle.axisLineColor = '#777';
        self.axisStyle.tickLabelFont = '11pt Helvetica Neue';
        self.axisStyle.tickLabelColor = '#777';
        self.axisStyle.axisLabelFont = '12pt Helvetica Neue';
        self.axisStyle.axisLabelColor = '#777';

        //Configure for chart
        self.chartStyle.seriesPalette = ['#3182bd', '#c6dbed', '#6baed6', '#08519c', '#9ecae1'];
        self.chartStyle.fillColor = '#fff';
        self.chartStyle.titleFont = '16pt Helvetica Neue';
        self.chartStyle.titleColor = '#000';

        //Configure series
        self.seriesStyle.showPoints = false;
        self.seriesStyle.lineStyle = 'linear';
    };

    insight.LightTheme.prototype = Object.create(insight.Theme.prototype);
    insight.LightTheme.prototype.constructor = insight.LightTheme;

    //Set LightTheme as the default theme
    insight.defaultTheme = new insight.LightTheme();

})(insight);
;(function(insight) {

    /**
     * The ChartGroup class is a container for Charts and Tables, linking them together
     * and coordinating cross chart filtering and styling.
     * @class insight.ChartGroup
     */
    insight.ChartGroup = function ChartGroup() {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -----------------------------------------------------------------------------------------

        self.charts = [];
        self.tables = [];
        self.groupings = [];
        self.dimensions = [];
        self.filteredDimensions = [];
        self.dimensionListenerMap = {};

        // Private functions ------------------------------------------------------------------------------------------

        /*
         * This internal function responds to click events on Series and Tables,
         * alerting any other elements using the same Dimension that they need to
         * update to highlight the selected slices of the Dimension
         */
        function notifyListeners(dimensionName, dimensionSelector) {
            var listeningObjects = self.dimensionListenerMap[dimensionName];

            if (listeningObjects != null) {

                listeningObjects.forEach(function(item) {
                    item.highlight(dimensionSelector);
                });

            }
        }

        /*
         * This function takes a list of series and binds the click events of each one to the ChartGroup
         * filtering handler. It also adds the series' dataset to the internal list.
         */
        function addSeries(chart) {
            chart.series()
                .forEach(function(series) {

                    addDimensionListener(series.data, chart);

                    series.clickEvent = self.chartFilterHandler;

                    addDataSet(series.data);
                });
        }

        /*
         * This function is called when a Chart belonging to this ChartGroup updates its list of Series.
         * The ChartGroup needs to register the click events and any crossfilter dimensions belonging to
         * the Series.
         */
        function newSeries(chart, series) {

            addSeries(chart, series);
        }

        /*
         * This function checks if the provided DataSet is crossfilter enabled,
         * and if so, adds its components to internal lists of Groupings and Dimensions.
         */
        function addDataSet(dataset) {

            // If this is a crossfilter enabled DataSet (aggregated and filter enabled)
            var crossfilterEnabled = dataset.dimension;

            if (crossfilterEnabled) {

                // Add Grouping and Dimension to internal lists if they are not already there
                insight.Utils.addToSet(self.groupings, dataset);
                insight.Utils.addToSet(self.dimensions, dataset.dimension);
            }
        }

        /*
         * Adds a Table to this ChartGroup, wiring up the Table's events to any
         * related Charts or Tables in the ChartGroup.
         * @memberof! insight.ChartGroup
         * @instance
         */
        function addTable(table) {

            // wire up the click event of the table to the filter handler of the DataSet
            table.clickEvent = self.chartFilterHandler;

            addDimensionListener(table.data, table);

            self.tables.push(table);

            return table;
        }

        /*
         * Adds a Chart to this ChartGroup, wiring up the click events of each Series to the filter handler
         * @memberof! insight.ChartGroup
         * @instance
         */
        function addChart(chart) {

            chart.seriesChanged = newSeries;

            addSeries(chart);

            self.charts.push(chart);

            return chart;
        }

        /*
         * Given a DataSet and a widget (Table or Chart), this function adds the widget
         * to the map of items subscribed to events on that Dimension,
         * only if the provided DataSet is a crossfilter enabled one that exposes a dimension property.
         */
        function addDimensionListener(dataset, widget) {
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
        }

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Method handler that is bound by the ChartGroup to the click events of any chart series or table rows,
         * if the DataSets used by those entities are crossfilter enabled.
         * It notifies any other listening charts of the dimensional selection event, which they can respond to
         * by applying CSS highlighting etc.
         * @memberof! insight.ChartGroup
         * @instance
         * @param {object} dataset - The insight.DataSet or insight.Grouping being filtered
         * @param {string} value - The value that the dimension is being sliced/filtered by.
         */
        self.chartFilterHandler = function(dataset, value) {

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
            dims.forEach(function(dim) {

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

        /*
         * Draws all Charts and Tables in this ChartGroup
         * @memberof! insight.ChartGroup
         * @instance
         */
        self.draw = function() {

            self.charts.forEach(function(chart) {
                chart.draw();
            });

            self.tables.forEach(function(table) {
                table.draw();
            });
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Adds an item to this ChartGroup, calling the appropriate internal addChart or addTable function
         * depending on the type.
         * @memberof! insight.ChartGroup
         * @instance
         * @param {object} widget An insight.Table or insight.Chart
         * @returns {this}
         */
        self.add = function(widget) {
            if (widget instanceof insight.Chart) {
                addChart(widget);
            } else if (widget instanceof insight.Table) {
                addTable(widget);
            }
            return self;
        };

        //Apply the default look-and-feel
        self.applyTheme(insight.defaultTheme);
    };

    /**
     * Applies all properties from a theme to all charts and tables contained within the ChartGroup.
     * @memberof! insight.ChartGroup
     * @instance
     * @param {insight.Theme} theme The theme to apply to all charts and tables within the group.
     * @returns {this}
     */
    insight.ChartGroup.prototype.applyTheme = function(theme) {
        this.charts.forEach(function(chart) {
            chart.applyTheme(theme);
        });

        this.tables.forEach(function(table) {
            table.applyTheme(theme);
        });

        return this;
    };

})(insight);
;(function(insight) {

    /**
     * The Chart class is the element in which series and axes are drawn
     * @class insight.Chart
     * @param {string} name - A uniquely identifying name for this chart
     * @param {string} element - The css selector identifying the div container that the chart will be drawn in. '#columnChart' for example.
     */
    insight.Chart = function Chart(name, element) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            height = d3.functor(300),
            width = d3.functor(300),
            maxWidth = d3.functor(300),
            minWidth = d3.functor(300),
            zoomable = false,
            series = [],
            xAxes = [],
            yAxes = [],
            title = '',
            titleColor = d3.functor('#000'),
            titleFont = '16pt Helvetica Neue',
            shouldAutoMargin = true,
            legend = null,
            zoomInitialized = false,
            initialized = false,
            zoomAxis = null,
            highlightSelector = insight.Utils.highlightSelector();

        var margin = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        // Internal variables -----------------------------------------------------------------------------------------

        self.name = name;
        self.element = element;
        self.selectedItems = [];
        self.container = null;
        self.chart = null;
        self.measureCanvas = document.createElement('canvas');
        self.seriesPalette = [];
        self.legendView = null;

        // Private functions ------------------------------------------------------------------------------------------

        function onWindowResize() {

            var scrollBarWidth = 50;
            var left = self.container[0][0].offsetLeft;

            var widthWithoutScrollBar =
                window.innerWidth -
                left -
                scrollBarWidth;

            self.resizeWidth(widthWithoutScrollBar);

        }

        function init() {
            initialized = true;

            window.addEventListener('resize', onWindowResize);

            self.container = d3.select(self.element).append('div');

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

            self.titleContainer = self.container
                .append('text')
                .attr('class', insight.Constants.ChartTitleClass);

            self.addClipPath();
        }

        function initZoom() {

            self.zoom = d3.behavior.zoom()
                .on('zoom', self.dragging.bind(self));

            self.zoom.x(zoomAxis.scale);

            if (!self.zoomExists()) {
                //Draw ourselves as the first element in the plot area
                self.plotArea.insert('rect', ':first-child')
                    .attr('class', 'zoompane')
                    .attr('width', self.width())
                    .attr('height', self.height() - self.margin().top - self.margin().bottom)
                    .style('fill', 'none')
                    .style('pointer-events', 'all');
            }

            self.plotArea.select('.zoompane')
                .call(self.zoom);

            zoomInitialized = true;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.filterSeriesByType = function(targetSeries) {

            var seriesOfType = self.series().filter(function(s) {
                return s.constructor === targetSeries.constructor;
            });

            return seriesOfType;

        };

        /*
         * Calculates the plot area of this chart, taking into account the size and margins of the chart.
         * @memberof! insight.Axis
         * @instance
         * @returns {int[]} - An array with two items, for the width and height of the axis, respectively.
         */
        self.calculatePlotAreaSize = function() {
            var bounds = [];
            var margin = self.margin();

            bounds[0] = self.width() - margin.right - margin.left;
            bounds[1] = self.height() - margin.top - margin.bottom;

            return bounds;

        };

        /*
         * Gets the position of the given series in this chart compared to other series in the chart that have the
         * same type as the given series.
         *
         * For example:
         *  chart.series([lineSeries, bubbleSeries0, rowSeries, bubbleSeries1]);
         *  index = chart.seriesIndexByType(bubbleSeries0); // index === 0
         *  index = chart.seriesIndexByType(bubbleSeries1); // index === 1
         *
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Series} targetSeries The series to find the index of.
         * @returns {Number} - The position of the given series in this chart compared to other series in the chart
         * that have the same type as the given series.
         */
        self.seriesIndexByType = function(targetSeries) {

            var seriesOfType = self.filterSeriesByType(targetSeries);
            return seriesOfType.indexOf(targetSeries);

        };

        /*
         * Gets the number of series in the chart which are the same type as the target series.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Series} targetSeries The series type to check for.
         * @returns {Number} - The number of series in the chart which are the same type as the target series.
         */
        self.countSeriesOfType = function(targetSeries) {

            var seriesOfType = self.filterSeriesByType(targetSeries);
            return seriesOfType.length;

        };

        /**
         * Empty event handler that is overridden by any listeners who want to know when this Chart's series change
         * @memberof! insight.Chart
         * @param {insight.Series[]} series - An array of insight.Series belonging to this Chart
         */
        self.seriesChanged = function(series) {

        };

        self.drawTitle = function() {
            self.titleContainer
                .style('position', 'absolute')
                .style('top', '-20px')
                .style('left', self.margin.left + 'px')
                .style('width', self.width() - self.margin().left - self.margin().right + 'px')
                .style('text-align', 'center')
                .style("font", self.titleFont)
                .style("color", self.titleColor)
                .text(title);
        };

        self.addClipPath = function() {

            self.plotArea.append('clipPath')
                .attr('id', self.clipPath())
                .append('rect')
                .attr('x', 1)
                .attr('y', 0)
                .attr('width', self.width() - self.margin().left - self.margin().right)
                .attr('height', self.height() - self.margin().top - self.margin().bottom);
        };

        /*
         * Resizes the chart width according to the given window width within the chart's own minimum and maximum width
         * @memberof! insight.Chart
         * @instance
         * @param {Number} windowWidth The current window width to resize against
         */
        self.resizeWidth = function(windowWidth) {

            if (self.width() > windowWidth && self.width() !== self.minWidth()) {

                doResize(Math.max(self.minWidth(), windowWidth));

            } else if (self.width() < windowWidth && self.width() !== self.maxWidth()) {

                doResize(Math.min(self.maxWidth(), windowWidth));

            }


            function doResize(newWidth) {

                self.width(newWidth, true);
                self.draw();
            }

        };

        self.resizeChart = function() {

            if (shouldAutoMargin) {
                self.calculateChartMargin();
            }

            var chartMargin = self.margin();

            self.container.style('width', self.width() + 'px');

            self.chartSVG
                .attr('width', self.width())
                .attr('height', self.height());

            self.plotArea = self.plotArea
                .attr('transform', 'translate(' + chartMargin.left + ',' + chartMargin.top + ')');

            self.plotArea.select('#' + self.clipPath())
                .append('rect')
                .attr('x', 1)
                .attr('y', 0)
                .attr('width', self.width() - chartMargin.left - chartMargin.right)
                .attr('height', self.height() - chartMargin.top - chartMargin.bottom);
        };

        self.zoomExists = function() {
            var z = self.plotArea.selectAll('.zoompane');
            return z[0].length;
        };

        self.dragging = function() {
            self.draw(true);
        };

        self.clipPath = function() {

            return insight.Utils.safeString(self.name) + 'clip';
        };

        /*
         * Takes a CSS selector and applies classes to chart elements to show them as selected or not.
         * in response to a filtering event.
         * and something else is.
         * @memberof! insight.Chart
         * @param {string} selector - a CSS selector matching a slice of a dimension. eg. an entry in a grouping by Country
         would be 'in_England', which would match that dimensional value in any charts.
         */
        self.highlight = function(selector) {
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

        self.draw = function(isDragging) {

            if (!initialized) {
                init();
            }

            self.resizeChart();

            var axes = xAxes.concat(yAxes);

            axes.forEach(function(axis) {
                axis.draw(self, isDragging);
            });

            self.series()
                .forEach(function(series, index) {
                    series.color = d3.functor(self.seriesPalette[index % self.seriesPalette.length]);
                    series.draw(self, isDragging);
                });

            if (legend !== null) {
                legend.draw(self, self.series());
            }

            self.drawTitle();

            if (zoomable && !zoomInitialized) {
                initZoom();
            }
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Empty event handler that is overridden by any listeners who want to know when this Chart's series change
         * @memberof! insight.Chart
         * @param {insight.Series[]} series - An array of insight.Series belonging to this Chart
         */
        self.seriesChanged = function(series) {

        };

        /**
         * Enable zooming and panning for an axis on this chart
         * @memberof! insight.Chart
         * @instance
         * @param axis The axis to enable zooming and panning for
         * @returns {Chart} Returns this.
         */
        self.setInteractiveAxis = function(axis) {
            zoomable = true;
            zoomAxis = axis;
            axis.isZoomable(true);
            return self;
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
        self.margin = function(newMargins) {
            if (!arguments.length) {
                return margin;
            }

            shouldAutoMargin = false;
            margin = newMargins;

            return self;
        };

        /**
         * The title of the chart.
         * @memberof! insight.Chart
         * @instance
         * @returns {String} - The title of the chart.
         *
         * @also
         *
         * Sets the title of the chart.
         * @memberof! insight.Chart
         * @instance
         * @param {String} chartTitle The new title of the chart.
         * @returns {this}
         */
        self.title = function(chartTitle) {
            if (!arguments.length) {
                return title;
            }

            title = chartTitle;
            return self;
        };

        /**
         * The font of the chart title.
         * @memberof! insight.Chart
         * @instance
         * @returns {String} - The font of the chart title.
         *
         * @also
         *
         * Sets the font of the chart title.
         * @memberof! insight.Chart
         * @instance
         * @param {String} chartTitleFont The new font of the chart title.
         * @returns {this}
         */
        self.titleFont = function(chartTitleFont) {
            if (!arguments.length) {
                return titleFont;
            }

            titleFont = chartTitleFont;
            return self;
        };

        /**
         * The text color of the chart title.
         * @memberof! insight.Chart
         * @instance
         * @returns {Function} - The text color of the chart title.
         *
         * @also
         *
         * Sets the text color of the chart title.
         * @memberof! insight.Chart
         * @instance
         * @param {Function} chartTitleColor The new text color of the chart title.
         * @returns {this}
         */
        self.titleColor = function(chartTitleColor) {
            if (!arguments.length) {
                return titleColor;
            }

            titleColor = d3.functor(chartTitleColor);
            return self;
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
        self.width = function(newWidth, dontSetMax) {
            if (!arguments.length) {
                return width();
            }

            if (!dontSetMax) {

                self.maxWidth(newWidth);

            }

            width = d3.functor(newWidth);
            return self;
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
        self.height = function(newHeight) {
            if (!arguments.length) {
                return height();
            }
            height = d3.functor(newHeight);
            return self;
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
        self.maxWidth = function(newMaxWidth) {
            if (!arguments.length) {
                return maxWidth();
            }

            maxWidth = d3.functor(newMaxWidth);
            return self;
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
        self.minWidth = function(newMinWidth) {
            if (!arguments.length) {
                return minWidth();
            }

            minWidth = d3.functor(newMinWidth);
            return self;
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
        self.series = function(newSeries) {
            if (!arguments.length) {
                return series;
            }
            series = newSeries;

            self.seriesChanged(self, newSeries);

            return self;
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
        self.legend = function(newLegend) {
            if (!arguments.length) {
                return legend;
            }

            legend = newLegend;

            return self;
        };

        /**
         * Add a new x-axis to the chart.
         *
         * @memberof! insight.Chart
         * @instance
         * @param {Axis} [axis] The x-axis to add.
         * @returns {this}
         */
        self.addXAxis = function(axis) {
            axis.direction = 'h';
            xAxes.push(axis);
            return self;
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
        self.xAxes = function(newXAxes) {
            if (!arguments.length) {
                return xAxes;
            }

            //Wipe out all existing axes
            xAxes = [];

            for (var index = 0; index < newXAxes.length; index++) {
                self.addXAxis(newXAxes[index]);
            }

            return self;
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
        self.xAxis = function(xAxis) {
            if (!arguments.length) {
                return xAxes[0];
            }

            var newXAxes = xAxes.slice(0);
            newXAxes[0] = xAxis;
            return self.xAxes(newXAxes);
        };

        /**
         * Add a new y-axis to the chart.
         *
         * @memberof! insight.Chart
         * @instance
         * @param {Axis} [axis] The y-axis to add.
         * @returns {this}
         */
        self.addYAxis = function(axis) {
            axis.direction = 'v';
            yAxes.push(axis);
            return self;
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
        self.yAxes = function(newYAxes) {
            if (!arguments.length) {
                return yAxes;
            }

            //Wipe out all existing axes
            yAxes = [];

            for (var index = 0; index < newYAxes.length; index++) {
                self.addYAxis(newYAxes[index]);
            }

            return self;
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
        self.yAxis = function(yAxis) {
            if (!arguments.length) {
                return yAxes[0];
            }

            var newYAxes = yAxes.slice(0);
            newYAxes[0] = yAxis;
            return self.yAxes(newYAxes);
        };

        /**
         * Whether chart margins will be calculated automatically.
         * @memberof! insight.Chart
         * @instance
         * @returns {Boolean} - Whether chart margins will currently be calculated automatically.
         *
         * @also
         *
         * Sets whether chart margins will be calculated automatically.
         * @memberof! insight.Chart
         * @instance
         * @param {Boolean} auto The new value indicating whether chart margins will be calculated automatically.
         * @returns {this}
         */
        self.autoMargin = function(auto) {
            if (!arguments.length) {
                return shouldAutoMargin;
            }
            shouldAutoMargin = auto;
            return self;
        };

        //Apply the default look-and-feel
        self.applyTheme(insight.defaultTheme);
    };

    /*
     * Sets the margin for the Chart by using a MarginMEasurer to measure the required label and axis widths for
     * the contents of this Chart
     * @memberof! insight.Chart
     * @instance
     * @param {DOMElement} measurer - A canvas HTML element to use by the measurer.  Specific to each chart as
     *                                each chart may have specific css rules
     * @param {object} axisStyles - An associative map between css properties and values for the axis values
     * @param {object} labelStyles - An associative map between css properties and values for the axis labels
     */
    insight.Chart.prototype.calculateChartMargin = function() {

        var allAxes = this.xAxes().concat(this.yAxes());

        var margin = {
            'top': 10,
            'left': 10,
            'bottom': 10,
            'right': 10
        };

        allAxes.forEach(function(axis) {

            var labelDimensions = axis.calculateLabelDimensions();
            var axisMargin = (axis.isHorizontal()) ? labelDimensions.height : labelDimensions.width;

            margin[axis.orientation()] = Math.max(axisMargin, margin[axis.orientation()]);

            var labelOverhang = axis.calculateLabelOverhang();
            margin.top = Math.max(margin.top, labelOverhang.top);
            margin.bottom = Math.max(margin.bottom, labelOverhang.bottom);
            margin.left = Math.max(margin.left, labelOverhang.left);
            margin.right = Math.max(margin.right, labelOverhang.right);

        });

        this.margin(margin);

    };

    /**
     * Applies all properties from a theme to the chart, and all axes and series of the chart.
     * @memberof! insight.Chart
     * @instance
     * @param {insight.Theme} theme The theme to apply to all properties of the chart, and all axes and series of the chart.
     * @returns {this}
     */
    insight.Chart.prototype.applyTheme = function(theme) {
        var axes = this.xAxes()
            .concat(this.yAxes());

        this.titleFont(theme.chartStyle.titleFont);
        this.titleColor(theme.chartStyle.titleColor);

        axes.forEach(function(axis) {
            axis.applyTheme(theme);
        });

        this.seriesPalette = theme.chartStyle.seriesPalette;

        this.series()
            .forEach(function(series) {
                series.applyTheme(theme);
            });

        return this;
    };

})(insight);
;(function(insight) {

    /**
     * The Table class draws HTML tables from DataSets
     * @class insight.Table
     * @param {string} name - A uniquely identifying name for this table
     * @param {string} element - The css selector identifying the div container that the table will be drawn in. '#dataTable' for example.
     * @param {DataSet} dataset - The DataSet to render this Table from
     */
    insight.Table = function Table(name, element, dataset) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            columnProperties = [],
            tableInitialized = false,
            header,
            sortFunctions = [],
            topValues = null;

        // Internal variables -----------------------------------------------------------------------------------------

        self.name = name;
        self.element = element;
        self.data = dataset;
        self.selectedItems = [];

        // Private functions ------------------------------------------------------------------------------------------

        function labelFunction(d) {
            return d.label;
        }

        function keyFunction(d) {
            return d.key;
        }

        function valueFunction(d) {
            return d.value;
        }

        function columnBuilder(row) {

            return self.columns()
                .map(function(column) {
                    return {
                        column: column,
                        value: column.value(row)
                    };
                });
        }

        // Creates the main <table>, <thead> and <tbody> sections of this Table
        function initializeTable() {
            self.tableElement = d3.select(self.element)
                .append('table')
                .attr('class', insight.Constants.TableClass);

            header = self.tableElement
                .append('thead')
                .append('tr');

            header.append('th')
                .attr('class', 'blank')
                .html('');

            self.tableBody = self.tableElement.append('tbody');

            tableInitialized = true;
        }

        function rowClass(dataPoint) {
            return insight.Constants.TableRowClass + ' ' + insight.Utils.keySelector(keyFunction(dataPoint));
        }

        function click(dataItem) {

            self.clickEvent(self.data, keyFunction(dataItem));
        }

        // Adds sorters to this Table's list of sorting methods and orders.
        // @param {string} order - 'ASC' or 'DESC'
        function addSortOrder(func, order) {
            var sort = {
                sortParameter: func,
                order: order
            };

            sortFunctions.push(sort);
        }

        // Internal functions -----------------------------------------------------------------------------------------

        // Toggle highlighting on items in this table.
        // The provided cssSelector is used to activate or deactivate highlighting on one or more selected rows.
        self.highlight = function(selector) {

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

            var selected = self.tableBody.selectAll('.selected');
            var notselected = self.tableBody.selectAll('tr:not(.selected)');

            notselected.classed('notselected', selected[0].length > 0);
        };

        // The public drawing method for the Table. It will also initialize the <table> element if required.
        self.draw = function() {

            var data = self.dataset();
            var columns = self.columns();

            if (!tableInitialized) {
                initializeTable();
            }

            // draw column headers for properties
            header.selectAll('th.column')
                .data(columns)
                .enter()
                .append('th')
                .attr('class', 'column')
                .html(labelFunction);

            var rows = self.tableBody.selectAll('tr.' + insight.Constants.TableRowClass)
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
                .append('td');

            cells.html(valueFunction);

            // remove any DOM elements no longer in the data set
            cells.exit()
                .remove();

            rows.exit()
                .remove();
        };

        // Public functions -------------------------------------------------------------------------------------------


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
        self.columns = function(value) {
            if (!arguments.length) {
                return columnProperties;
            }
            columnProperties = value;
            return self;
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
        self.keyFunction = function(keyFunc) {
            if (!arguments.length) {
                return keyFunction;
            }
            keyFunction = keyFunc;
            return self;
        };

        /**
         * This method adds an ascending sort to this Table's rows using the provided function as a comparison
         * @memberof! insight.Table
         * @instance
         * @param {function} sortFunction A function extracting the property to sort on from a data object.
         * @returns {object} this Returns the Table object
         */
        self.ascending = function(sortFunction) {

            addSortOrder(sortFunction, 'ASC');

            return self;
        };

        /**
         * Adds a descending sort to this Table's rows using the provided function as a comparison
         * @memberof! insight.Table
         * @instance
         * @param {function} sortFunction A function extracting the property to sort on from a data object.
         * @returns {object} this Returns the Table object.
         */
        self.descending = function(sortFunction) {

            addSortOrder(sortFunction, 'DESC');

            return self;
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
        self.top = function(top) {
            if (!arguments.length) {
                return topValues;
            }
            topValues = top;

            return self;
        };

        /**
         * Returns the array of data objects used to draw this table.
         * @memberof! insight.Series
         * @instance
         * @returns {object[]} - The data set to be used by the table.
         */
        self.dataset = function() {

            var sorters = sortFunctions;

            var data = self.data.getData();

            data = insight.Utils.multiSort(data, sorters);

            if (self.top()) {
                data = data.slice(0, self.top());
            }

            return data;
        };

        self.applyTheme(insight.defaultTheme);

    };

    /* Skeleton event overriden by any listening objects to subscribe to the click event of the table rows
     * @param {object} series - The row being clicked
     * @param {object[]} filter - The value of the point selected, used for filtering/highlighting
     */
    insight.Table.prototype.clickEvent = function(series, filter) {

    };

    /**
     * Applies all properties from a theme to the table.
     * @memberof! insight.Table
     * @instance
     * @todo Extract relevant properties and save them to the table.
     * @param {insight.Theme} theme The theme to apply to the table.
     * @returns {this}
     */
    insight.Table.prototype.applyTheme = function(theme) {
        return this;
    };

})(insight);
;(function(insight) {

    /**
     * A tooltip, displaying values for a series or point when hovered over.
     * @class insight.Tooltip
     */
    insight.Tooltip = function Tooltip() {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            className = insight.Constants.Tooltip,
            chartContainer = null,
            styles = {};

        var offset = {
            x: 0,
            y: 0
        };

        var baseStyles = {
            'position': 'absolute',
            'opacity': '0',
            'top': '0',
            'pointer-events': 'none',
            'box-sizing': 'border-box'
        };

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
        self.offset = function(value) {
            if (!arguments.length) {
                return offset;
            }

            offset = value;
            return self;
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
        self.styles = function(value) {
            if (!arguments.length) {
                return insight.Utils.objectUnion(baseStyles, styles);
            }
            styles = value;
            return self;
        };

        // Gets or sets the DOM element that this tooltip will be created inside, usually a div.
        self.container = function(container) {
            if (!arguments.length) {
                return chartContainer;
            }

            chartContainer = container;
            return self;
        };

        /*
         * Display the tooltip, using the provided element and tooltipText parameters to control the context and position.
         * @memberof! insight.Tooltip
         * @instance
         * @param {element} element The element to attach to.
         * @param {String} tooltipText The text to display on the tooltip.
         */
        self.show = function(element, tooltipText) {

            if (!self.element) {
                createElement();
            }

            setTooltipContent(tooltipText);

            var position = getTooltipPosition(element);

            drawTooltip(position);
        };


        /*
         * Hide the tooltip
         * @memberof! insight.Tooltip
         * @instance
         */
        self.hide = function() {
            d3.select(self.element).style('opacity', '0');
        };

    };

})(insight);
;(function(insight) {

    /**
     * A Legend listing out the series on a chart
     * @class insight.Legend
     */
    insight.Legend = function Legend() {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            initialised = false;

        // Private functions ------------------------------------------------------------------------------------------

        function blobPositionY(item, index) {
            return index * 20 + 5;
        }

        function blobFillColor(item) {
            return item.color();
        }

        function textPositionY(item, index) {
            return index * 20 + 14;
        }

        function textContent(item) {
            return item.name;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.init = function(chart) {
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

        self.draw = function(chart) {
            if (!initialised) {
                self.init(chart);
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
                    return ctx.measureText(item.name).width;
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

            // Adjust legend to tightly wrap items
            chart.legendBox
                .attr("width", legendWidth)
                .attr("height", legendHeight);

            chart.legendItems
                .attr("width", legendWidth)
                .attr("height", legendHeight);
        };

    };

})(insight);
;(function(insight) {

    /**
     * The Axis class coordinates the domain of the series data and draws axes.
     * @class insight.Axis
     * @param {string} name - A uniquely identifying name for this chart
     * @param {insight.Scales.Scale} scale - insight.Scale.Linear for example
     */
    insight.Axis = function Axis(name, scale) {

        // Private variables --------------------------------------------------------------------------------------

        var self = this,
            label = name,
            shouldBeOrdered = d3.functor(false),
            orderingFunction = null,
            tickSize = d3.functor(0),
            tickPadding = d3.functor(0),
            lineWidth = 1,
            labelRotation = 0,
            tickLabelFont = '11pt Helvetica Neue',
            tickLabelColor = d3.functor('Black'),
            axisLabelFont = '12pt Helvetica Neue',
            axisLabelColor = d3.functor('Black'),
            tickLabelOrientation = d3.functor('lr'),
            shouldShowGridlines = false,
            colorFunction = d3.functor('#000'),
            shouldDisplay = true,
            barPadding = d3.functor(0.1),
            initialisedAxisView = false,
            shouldReversePosition = false,
            zoomable = false;

        // Internal variables ---------------------------------------------------------------------------------------

        self.measureCanvas = document.createElement('canvas');
        self.scaleType = scale.name;
        self.scale = scale.scale();
        self.bounds = [0, 0];
        self.series = [];
        self.direction = '';
        self.gridlines = new insight.AxisGridlines(self);

        // Private functions -------------------------------------------------------------------------------------

        function orientation() {
            if (self.isHorizontal()) {
                return (shouldReversePosition) ? 'top' : 'bottom';
            } else {
                return (shouldReversePosition) ? 'right' : 'left';
            }
        }

        function textAnchor() {
            var orientation = self.orientation();
            if (orientation === 'left' || orientation === 'top') {
                return 'end';
            } else {
                return 'start';
            }
        }

        /*
         * The default axis tick format, just returns the input
         * @returns {object} tickPoint - The axis data for a particular tick
         * @param {object} ticklabel - The output string to be displayed
         */
        function format(d) {
            return d;
        }

        /*
         * This method calculates the scale ranges for this axis using the calculated output bounds for this axis.
         */
        function applyScaleRange() {

            // x-axis goes from 0 (left) to max (right)
            // y-axis goes from max (top) to 0 (bottom)
            var rangeBounds = (self.isHorizontal()) ? [0, self.bounds[0]] : [self.bounds[1], 0];

            if (self.scale.rangeRoundBands) {

                // ordinal, so use rangeRoundBands, passing the axis bounds and bar padding
                self.scale.rangeRoundBands(rangeBounds, self.barPadding());

            } else {

                // linear/date so use rangeBands, passing the axis bounds only
                self.scale.rangeRound(rangeBounds);

            }

        }

        /*
         * For an ordinal/categorical axis, this method queries all series that use this axis to get the list of available values
         * @returns {object[]} values - the values for this ordinal axis
         */
        function findOrdinalValues() {
            var vals = [];

            // Build a list of values used by this axis by checking all Series using this axis
            // Optionally provide an ordering function to sort the results by.  If the axis is ordered but no custom ordering is defined,
            // then the series value function will be used by default.
            self.series.forEach(function(series) {
                vals = vals.concat(series.keys(self.orderingFunction()));
            });

            vals = insight.Utils.arrayUnique(vals);

            return vals;
        }

        /*
         * Calculates the minimum value to be used in this axis.
         * @returns {object} - The smallest value in the datasets that use this axis
         */
        function findMin() {
            var min = Number.MAX_VALUE;

            self.series.forEach(function(series) {
                var m = series.findMin(self);

                min = m < min ? m : min;
            });

            return min;
        }

        /*
         * Calculates the maximum value to be used in this axis.
         * @returns {object} - The largest value in the datasets that use this axis
         */
        function findMax() {
            var max = 0;

            self.series.forEach(function(series) {
                var m = series.findMax(self);

                max = m > max ? m : max;
            });

            return max;
        }

        // Internal functions -------------------------------------------------------------------------------------

        /*
         * Returns a boolean value representing if this Axis is zoomable.
         * @instance
         * @memberof! insight.Axis
         * @returns {Boolean} - A value indicating whether the axis is zoomable or not
         *
         * @also
         *
         * Sets the zoomable status of this Axis.  A zoomable Axis allows drag and zoom operations, and is not redrawn automatically on the draw() event of a chart.
         * @instance
         * @memberof! insight.Axis
         * @param {Boolean} shouldBeZoomable - A boolean value to set this Axis as zoomable or not.
         * @returns {this}
         */
        self.isZoomable = function(shouldBeZoomable) {
            if (!arguments.length) {
                return zoomable;
            }
            zoomable = shouldBeZoomable;

            return self;
        };

        self.calculateLabelDimensions = function() {

            if (!self.shouldDisplay()) {
                return {
                    width: 0,
                    height: 0
                };
            }

            var textMeasurer = new insight.TextMeasurer(self.measureCanvas);

            var axisLabelHeight = textMeasurer.measureText(self.label(), self.axisLabelFont()).height;

            var formattedTickValues = self.domain().map(function(tickValue) {
                return self.tickLabelFormat()(tickValue);
            });

            var tickLabelSizes = formattedTickValues.map(function(formattedTickValue) {
                return textMeasurer.measureText(
                    formattedTickValue,
                    self.tickLabelFont(),
                    self.tickLabelRotation());
            });

            var maxTickLabelWidth = d3.max(tickLabelSizes, function(d) {
                return Math.max(0, d.width);
            });

            var maxTickLabelHeight = d3.max(tickLabelSizes, function(d) {
                return Math.max(0, d.height);
            });

            var axisLabelWidth = Math.ceil(textMeasurer.measureText(self.label(), self.axisLabelFont()).width);

            if (maxTickLabelWidth === 0) {
                maxTickLabelHeight = 0;
            }

            if (axisLabelWidth === 0) {
                axisLabelHeight = 0;
            }

            var totalWidth =
                self.tickPadding() * 2 +
                self.tickSize() +
                maxTickLabelWidth +
                axisLabelWidth;

            var labelHeight = (self.isHorizontal()) ? maxTickLabelHeight + axisLabelHeight : Math.max(maxTickLabelHeight, axisLabelHeight);

            var totalHeight = labelHeight + self.tickPadding() * 2 + self.tickSize();

            return {
                height: totalHeight,
                width: totalWidth
            };
        };

        self.calculateLabelOverhang = function() {

            var overhangs = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };

            if (!self.shouldDisplay() ||
                (self.isHorizontal() && (self.tickLabelRotation() % 180 === 90)) ||
                (!self.isHorizontal() && (self.tickLabelRotation() % 180 === 0))) {
                return overhangs;
            }

            var textMeasurer = new insight.TextMeasurer(self.measureCanvas);

            var domain = self.domain();

            var firstTick = self.tickLabelFormat()(domain[0]);
            var lastTick = self.tickLabelFormat()(domain[domain.length - 1]);

            var firstTickSize = textMeasurer.measureText(firstTick, self.tickLabelFont(), self.tickLabelRotation());
            var lastTickSize = textMeasurer.measureText(lastTick, self.tickLabelFont(), self.tickLabelRotation());

            var angleRadians = insight.Utils.degreesToRadians(self.tickLabelRotation());

            switch (self.textAnchor()) {
                case 'start':
                case 'end':
                    firstTickSize.width = Math.abs(firstTickSize.width);
                    firstTickSize.height = Math.abs(firstTickSize.height);
                    lastTickSize.width = Math.abs(lastTickSize.width);
                    lastTickSize.height = Math.abs(lastTickSize.height);
                    break;

                case 'middle':
                    firstTickSize.width = Math.ceil(Math.abs(firstTickSize.width * 0.5));
                    firstTickSize.height = Math.ceil(Math.abs(firstTickSize.height * 0.5));
                    lastTickSize.width = Math.ceil(Math.abs(lastTickSize.width * 0.5));
                    lastTickSize.height = Math.ceil(Math.abs(lastTickSize.height * 0.5));
                    break;
            }

            var overhangLast;

            if (self.isHorizontal()) {

                overhangLast = ((self.textAnchor() === 'start') === (Math.cos(angleRadians) > 0));

                overhangs.left = !overhangLast || self.textAnchor() === 'middle' ? firstTickSize.width : 0;
                overhangs.right = overhangLast || self.textAnchor() === 'middle' ? lastTickSize.width : 0;

            } else {

                overhangLast = ((self.textAnchor() === 'start') === (Math.sin(angleRadians) < 0));

                overhangs.top = overhangLast || self.textAnchor() === 'middle' ? lastTickSize.height : 0;
                overhangs.bottom = !overhangLast || self.textAnchor() === 'middle' ? firstTickSize.height : 0;

            }

            return overhangs;

        };

        /*
         * Adds to the list of series that this axis is associated with
         * @memberof! insight.Axis
         * @instance
         * @param {insight.Series} series The series to add
         */
        self.addSeries = function(series) {
            self.series.push(series);
        };

        /*
         * Calculates the domain of values that this axis has, from a minimum to a maximum.
         * @memberof! insight.Axis
         * @instance
         * @returns {object[]} bounds - An array with two items, for the lower and upper range of this axis
         */
        self.domain = function() {
            var domain = [];

            if (self.scaleType === insight.Scales.Linear.name) {
                domain = [0, findMax()];
            } else if (self.scaleType === insight.Scales.Ordinal.name) {
                domain = findOrdinalValues();
            } else if (self.scaleType === insight.Scales.Time.name) {
                domain = [new Date(findMin()), new Date(findMax())];
            }

            return domain;
        };

        self.tickLabelRotationTransform = function() {

            var offset = self.tickPadding() + (self.tickSize() * 2);
            var measurer = new insight.TextMeasurer(self.measureCanvas);
            var textHeight = Math.ceil(measurer.measureText("aa").width);

            offset = (shouldReversePosition ^ !self.isHorizontal()) ? -offset : offset;

            if (self.isHorizontal()) {
                return ' rotate(' + self.tickLabelRotation() + ',' + (textHeight / 2) + ',' + offset + ')';
            } else {
                return ' rotate(' + self.tickLabelRotation() + ',' + offset + ',' + (textHeight / 2) + ')';
            }
        };

        self.axisPosition = function() {
            var transform = 'translate(';

            if (self.isHorizontal()) {
                var transX = 0;
                var transY = self.orientation() === 'top' ? 0 : self.bounds[1];

                transform += transX + ',' + transY + ')';

            } else {
                var xShift = self.orientation() === 'left' ? 0 : self.bounds[0];
                transform += xShift + ',0)';
            }

            return transform;
        };

        self.pixelValueForValue = function(d) {
            return self.scale(d);
        };

        self.positionLabel = function() {

            if (self.isHorizontal()) {
                self.labelElement.style('left', 0)
                    .style(self.orientation(), 0)
                    .style('width', '100%')
                    .style('text-align', 'center');
            } else {
                self.labelElement.style(self.orientation(), '0').style('top', '35%');
            }
        };

        self.barPadding = function(_) {
            if (!arguments.length) {
                return barPadding();
            }
            barPadding = d3.functor(_);
            return self;
        };

        self.initializeScale = function() {

            self.scale.domain(self.domain());
            applyScaleRange();

        };

        self.setupAxisView = function(chart) {

            if (initialisedAxisView) {
                return;
            }

            initialisedAxisView = true;

            self.initializeScale();

            self.axis = d3.svg.axis();

            self.axisElement = chart.plotArea.append('g');

            self.axisElement
                .attr('class', insight.Constants.AxisClass)
                .call(self.axis)
                .selectAll('text')
                .attr('class', insight.Constants.AxisTextClass);

            self.labelElement = chart.container
                .append('div')
                .attr('class', insight.Constants.AxisLabelClass)
                .style('position', 'absolute');
        };

        self.updateAxisBounds = function(chart) {
            self.bounds = chart.calculatePlotAreaSize();
        };

        self.draw = function(chart, isDragging) {

            // Scale range and bounds need to be initialized regardless of whether the axis will be displayed

            self.updateAxisBounds(chart);

            if (!self.isZoomable()) {
                self.initializeScale();
            }

            if (!self.shouldDisplay()) {
                return;
            }

            self.setupAxisView(chart);

            var animationDuration = isDragging ? 0 : 200;

            self.axis = d3.svg.axis()
                .scale(self.scale)
                .orient(self.orientation())
                .tickSize(self.tickSize())
                .tickPadding(self.tickPadding())
                .tickFormat(self.tickLabelFormat());

            self.axisElement
                .attr('transform', self.axisPosition())
                .style('stroke', self.lineColor())
                .style('stroke-width', self.lineWidth())
                .style('fill', 'none')
                .transition()
                .duration(animationDuration)
                .call(self.axis);

            self.axisElement
                .selectAll('text')
                .attr('transform', self.tickLabelRotationTransform())
                .style('text-anchor', self.textAnchor());

            d3.selectAll(".tick > text")
                .style('font', self.tickLabelFont());

            self.labelElement
                .style('font', self.axisLabelFont())
                .style('color', self.axisLabelColor())
                .text(self.label());

            self.positionLabel();


            if (self.shouldShowGridlines()) {
                self.gridlines.drawGridLines(chart, self.scale.ticks());
            }
        };

        // Public functions --------------------------------------------------------------------------------------

        /**
         * The font to use for the axis tick labels.
         * @memberof! insight.Axis
         * @instance
         * @returns {String} - The font to use for the axis tick labels.
         *
         * @also
         *
         * Sets the font to use for the axis tick labels.
         * @memberof! insight.Axis
         * @instance
         * @param {String} font The font to use for the axis tick labels.
         * @returns {this}
         */
        self.tickLabelFont = function(font) {
            if (!arguments.length) {
                return tickLabelFont;
            }
            tickLabelFont = font;
            return self;
        };

        /**
         * The font to use for the axis label.
         * @memberof! insight.Axis
         * @instance
         * @returns {String} - The font to use for the axis label.
         *
         * @also
         *
         * Sets the font to use for the axis label.
         * @memberof! insight.Axis
         * @instance
         * @param {String} font The font to use for the axis label.
         * @returns {this}
         */
        self.axisLabelFont = function(font) {
            if (!arguments.length) {
                return axisLabelFont;
            }
            axisLabelFont = font;
            return self;
        };

        /**
         * The color to use for the axis tick label.
         * @memberof! insight.Axis
         * @instance
         * @returns {Function} - A function that returns the color of an axis tick label.
         *
         * @also
         *
         * Sets the color to use for the axis tick label.
         * @memberof! insight.Axis
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.tickLabelColor = function(color) {
            if (!arguments.length) {
                return tickLabelColor;
            }
            tickLabelColor = d3.functor(color);
            return self;
        };

        /**
         * The color to use for the axis label.
         * @memberof! insight.Axis
         * @instance
         * @returns {Function} - A function that returns the color of an axis label.
         *
         * @also
         *
         * Sets the color to use for the axis label.
         * @memberof! insight.Axis
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.axisLabelColor = function(color) {
            if (!arguments.length) {
                return axisLabelColor;
            }
            axisLabelColor = d3.functor(color);
            return self;
        };

        /**
         * Whether or not the axis is displayed horizontally (true) or vertically (false).
         * @memberof! insight.Axis
         * @instance
         * @returns {boolean} - Whether the axis is horizontal.
         */
        self.isHorizontal = function() {
            return self.direction === 'h';
        };

        /**
         * Whether the axis values are displayed in order or not.
         * @memberof! insight.Axis
         * @instance
         * @returns {Boolean} - Whether the axis is currently ordered.
         *
         * @also
         *
         * Sets whether the axis values are displayed in order or not.
         * @memberof! insight.Axis
         * @instance
         * @param {Function|Boolean} shouldOrderAxis Either a function that returns a boolean, or a boolean.
         * @returns {this}
         */
        self.isOrdered = function(shouldOrderAxis) {
            if (!arguments.length) {
                return shouldBeOrdered();
            }
            shouldBeOrdered = d3.functor(shouldOrderAxis);
            return self;
        };

        /**
         * Gets the function used to order the axis values
         * @memberof! insight.Axis
         * @instance
         * @returns {Function} - The current ordering function
         *
         * @also
         *
         * Sets the function used to order the axis values
         * @memberof! insight.Axis
         * @instance
         * @param {Function} orderFunc The ordering function
         * @returns {this}
         */
        self.orderingFunction = function(orderFunc) {
            if (!arguments.length) {
                return orderingFunction;
            }
            orderingFunction = orderFunc;
            return self;
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
        self.shouldDisplay = function(shouldBeDisplayed) {
            if (!arguments.length) {
                return shouldDisplay;
            }
            shouldDisplay = shouldBeDisplayed;
            return self;
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
         * @param {boolean} isReversed Whether the axis is drawn at the bottom/left (false) or top/right (true).
         * @returns {this}
         */
        self.hasReversedPosition = function(isReversed) {
            if (!arguments.length) {
                return shouldReversePosition;
            }
            shouldReversePosition = isReversed;
            return self;
        };

        // label and axis tick methods

        /**
         * Gets the axis label
         * @memberof! insight.Axis
         * @instance
         * @returns {String} - The axis label
         *
         * @also
         *
         * Sets the axis label
         * @memberof! insight.Axis
         * @instance
         * @param {String} axisLabel The axis label
         * @returns {this}
         */
        self.label = function(axisLabel) {
            if (!arguments.length) {
                return label;
            }
            label = axisLabel;
            return self;
        };

        /**
         * Gets the function that will be used to format the axis tick labels.
         * @memberof! insight.Axis
         * @instance
         * @returns {Function} - A function that accepts the axis tick string and returns the formatted label
         *
         * @also
         *
         * Sets the function that will be used to format the axis tick labels
         * See `insight.Formatters` for pre-built examples.
         * @memberof! insight.Axis
         * @instance
         * @param {Function} value A function that accepts the axis tick label and returns the formatted label
         * @returns {this}
         */
        self.tickLabelFormat = function(formatFunc) {
            if (!arguments.length) {
                return format;
            }
            format = formatFunc;
            return self;
        };

        /**
         * Gets the width of the axis line.
         * @memberof! insight.Axis
         * @instance
         * @returns {Number} - The width of the axis line.
         *
         * @also
         *
         * Sets the width of the axis line.
         * @memberof! insight.Axis
         * @instance
         * @param {Number} width The new width of the axis line.
         * @returns {this}
         */
        self.lineWidth = function(width) {
            if (!arguments.length) {
                return lineWidth;
            }
            lineWidth = width;
            return self;
        };

        /**
         * Gets the color of the axis lines.
         * @memberof! insight.Axis
         * @instance
         * @returns {Color} - The color of the axis lines.
         *
         * @also
         *
         * Sets the color of the axis lines.
         * @memberof! insight.Axis
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.lineColor = function(color) {
            if (!arguments.length) {
                return colorFunction;
            }
            colorFunction = d3.functor(color);
            return self;
        };

        /*
         * Gets the axis orientation: h = horizontal, v = vertical
         * @memberof! insight.Axis
         * @instance
         * @returns {string} - h = horizontal, v = vertical
         *
         * @also
         *
         * Sets the axis orientation: h = horizontal, v = vertical
         * @memberof! insight.Axis
         * @instance
         * @param {string} value The the axis orientation: h = horizontal, v = vertical
         * @returns {this}
         */
        self.orientation = function(value) {
            if (!arguments.length) {
                return orientation();
            }
            orientation = d3.functor(value);
            return self;
        };

        /**
         * Gets the clockwise angle (degrees), that the each tick label will be rotated from horizontal.
         * @memberof! insight.Axis
         * @instance
         * @returns {number} - The clockwise angle (degrees), that the each tick label will be rotated from horizontal.
         *
         * @also
         *
         * Sets the clockwise angle (degrees), that the each tick label will be rotated from horizontal.
         * @memberof! insight.Axis
         * @instance
         * @param {number} value The clockwise angle (degrees), that the each tick label will be rotated from horizontal.
         * @returns {this}
         */
        self.tickLabelRotation = function(value) {
            if (!arguments.length) {
                return labelRotation;
            }
            labelRotation = value;
            return self;
        };

        /**
         * Gets the size of each axis tick in pixels.
         * @memberof! insight.Axis
         * @instance
         * @returns {number} - The size of each axis tick, in pixels.
         *
         * @also
         *
         * Sets the size of each axis tick in, pixels.
         * @memberof! insight.Axis
         * @instance
         * @param {number} value The size of each axis tick, in pixels.
         * @returns {this}
         */
        self.tickSize = function(value) {
            if (!arguments.length) {
                return tickSize();
            }
            tickSize = d3.functor(value);
            return self;
        };

        /**
         * Gets the padding between the end of a tick and its label, in pixels.
         * @memberof! insight.Axis
         * @instance
         * @returns {number} - The padding between the end of a tick and its label, in pixels.
         *
         * @also
         *
         * Sets the padding between the end of a tick and its label, in pixels.
         * @memberof! insight.Axis
         * @instance
         * @param {number} value The padding between the end of a tick and its label, in pixels.
         * @returns {this}
         */
        self.tickPadding = function(value) {
            if (!arguments.length) {
                return tickPadding();
            }
            tickPadding = d3.functor(value);
            return self;
        };

        /**
         * Gets the text-anchor attribute that will be set on each tick Label.
         * One of: start/middle/end.
         * @memberof! insight.Axis
         * @instance
         * @returns {string} - The the current text-anchor attribute value.
         *
         * @also
         *
         * Sets the text-anchor attribute that will be set on each tick Label.
         * @memberof! insight.Axis
         * @instance
         * @param {string} value The text-anchor attribute that will be set on each tick Label.
         * @returns {this}
         */
        self.textAnchor = function(value) {
            if (!arguments.length) {
                return textAnchor();
            }
            textAnchor = d3.functor(value);
            return self;
        };

        /**
         * Gets the orientation of the tick labels: 'tb' = top to bottom, 'lr' = left to right.
         * @memberof! insight.Axis
         * @instance
         * @returns {string} - 'tb' = top to bottom, 'lr' = left to right.
         *
         * @also
         *
         * Sets the orientation of the tick labels: 'tb' = top to bottom, 'lr' = left to right.
         * This is a helper function that sets the ticklabelRotation to either 0 or 90.
         * @memberof! insight.Axis
         * @instance
         * @param {string} value 'tb' = top to bottom, 'lr' = left to right.
         * @returns {this}
         */
        self.tickLabelOrientation = function(value) {
            if (!arguments.length) {
                return tickLabelOrientation();
            }

            if (value === 'tb') {
                labelRotation = '90';
            } else if (value === 'lr') {
                labelRotation = '0';
            }

            tickLabelOrientation = d3.functor(value);

            return self;
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
         * @param {boolean} showGridlines Whether the axis has gridlines drawn from its major ticks.
         * @returns {this}
         */
        self.shouldShowGridlines = function(showLines) {
            if (!arguments.length) {
                return shouldShowGridlines;
            }
            shouldShowGridlines = showLines;

            return self;
        };

        self.applyTheme(insight.defaultTheme);
    };

    /**
     * Applies all properties from a theme to the axis.
     * @memberof! insight.Axis
     * @instance
     * @param {insight.Theme} theme The theme to apply to the axis.
     * @returns {this}
     */
    insight.Axis.prototype.applyTheme = function(theme) {
        this.tickSize(theme.axisStyle.tickSize);
        this.tickPadding(theme.axisStyle.tickPadding);
        this.lineColor(theme.axisStyle.axisLineColor);
        this.lineWidth(theme.axisStyle.axisLineWidth);

        this.tickLabelFont(theme.axisStyle.tickLabelFont);
        this.tickLabelColor(theme.axisStyle.tickLabelColor);
        this.axisLabelFont(theme.axisStyle.axisLabelFont);
        this.axisLabelColor(theme.axisStyle.axisLabelColor);

        this.shouldShowGridlines(theme.axisStyle.showGridlines);

        this.gridlines.applyTheme(theme);

        return this;
    };

})(insight);
;(function(insight) {

    /**
     * The Axis gridlines represent and draw the gridlines for a given axis.
     * @class insight.AxisGridlines
     * @param {Axis} axis - The axis to draw gridlines from.
     */
    insight.AxisGridlines = function AxisGridlines(axis) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            lineColor = '#000',
            lineWidth = 0;

        // Internal variables -------------------------------------------------------------------------------------------

        self.parentAxis = axis;

        // Internal functions ----------------------------------------------------------------------------------------

        self.drawGridLines = function(chart, ticks) {
            var attributes = {
                'class': gridlineClass(),
                'fill': 'none',
                'shape-rendering': 'crispEdges',
                'stroke': lineColor,
                'stroke-width': lineWidth
            };

            var axis = self.parentAxis;

            if (self.parentAxis.isHorizontal()) {
                attributes.x1 = self.parentAxis.pixelValueForValue;
                attributes.x2 = self.parentAxis.pixelValueForValue;
                attributes.y1 = 0;
                attributes.y2 = self.parentAxis.bounds[1];
            } else {
                attributes.x1 = 0;
                attributes.x2 = self.parentAxis.bounds[0];
                attributes.y1 = self.parentAxis.pixelValueForValue;
                attributes.y2 = self.parentAxis.pixelValueForValue;
            }

            //Get all lines, and add new datapoints.
            var gridLines = self.allGridlines(chart).data(ticks);

            //Add lines for all new datapoints
            gridLines
                .enter()
                .append('line');

            //Update position of all lines
            gridLines.attr(attributes);

            //Remove any lines which are no longer in the data
            gridLines.exit().remove();

        };

        function gridlineClass() {

            return self.parentAxis.orientation();
        }

        // Public functions -------------------------------------------------------------------------------------------

        /** Returns the array of all gridlines for this axis.
         *
         * @memberof! insight.AxisGridlines
         * @instance
         * @param {Chart} chart The chart to grab the gridlines from.
         * @returns {object[]} - All of the gridlines currently added to this chart.
         */
        self.allGridlines = function(chart) {
            var gridLineIdentifier = 'line.' + gridlineClass();
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
         * @param {Color} gridlineColor The new gridline color.
         * @returns {this}
         */
        self.lineColor = function(gridlineColor) {
            if (!arguments.length) {
                return lineColor;
            }
            lineColor = gridlineColor;
            return self;
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
         * @param {Number} gridlineWidth The new gridline width.
         * @returns {this}
         */
        self.lineWidth = function(gridlineWidth) {
            if (!arguments.length) {
                return lineWidth;
            }
            lineWidth = gridlineWidth;
            return self;
        };

        self.applyTheme(insight.defaultTheme);
    };

    insight.AxisGridlines.prototype.applyTheme = function(theme) {
        this.lineWidth(theme.axisStyle.gridlineWidth);
        this.lineColor(theme.axisStyle.gridlineColor);

        return this;
    };

})(insight);
;(function(insight) {

    /**
     * The Series base class provides some base functions that are used by any specific types of series that derive from this class
     * @class insight.Series
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     */
    insight.Series = function Series(name, data, x, y) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            filter = null;

        var tooltipOffset = {
            x: 0,
            y: -10
        };

        // Internal variables -----------------------------------------------------------------------------------------

        self.data = data;
        self.usesCrossfilter = (data instanceof insight.DataSet) || (data instanceof insight.Grouping);
        self.x = x;
        self.y = y;
        self.name = name;
        self.color = d3.functor('lightblue'); // Redefined by the theme in applyTheme()
        self.animationDuration = 300;
        self.topValues = null;
        self.classValues = [];
        self.valueAxis = y;
        self.keyAxis = x;
        self.selectedItems = [];

        x.addSeries(self);
        y.addSeries(self);

        // Private functions ------------------------------------------------------------------------------------------

        function keyFunction(d) {
            return d.key;
        }

        function groupKeyFunction(d) {
            return d.key;
        }

        function valueFunction(d) {
            return d.value;
        }

        function tooltipFormat(d) {
            return d;
        }

        function tooltipFunction(d) {
            return valueFunction(d);
        }

        /*
         * Checks whether individual chart items should be marked as selected or not.
         * @memberof insight.Series
         * @returns {string} selectionClass - A string that is used by CSS highlighting to style the chart item.
         * @param {string[]}selectedItems - A list of CSS selectors for currently selected items
         * @param {string} selector - The selector for the item being drawn
         */
        function selectedClassName(selectedItems, selector) {
            var selected = '';

            if (selectedItems.length) {
                selected = insight.Utils.arrayContains(selectedItems, selector) ? ' selected' : ' notselected';
            }

            return selected;
        }

        function arrayDataSet(orderFunction, topValues) {

            // Take a shallow copy of the data array
            var data = self.data.slice(0);

            if (orderFunction) {
                data = data.sort(orderFunction);
            }
            if (topValues) {
                data = data.slice(0, top);
            }

            return data;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Generates the base class name to be used for items in this series.It can be extended upon by individual items to show
         * if they are selected or to mark them out in other ways.
         * @memberof insight.Series
         * @returns {string} baseClassName - A root valuefor the class attribute used for items in this Series.
         */
        self.seriesClassName = function() {

            var seriesName = [self.name + 'class']
                .concat(self.classValues)
                .join(' ');

            return seriesName;
        };

        /*
         * Constructs the text for the class attribute for a specific data point, using the base value for this Series and any additional values.
         * @memberof insight.Series
         * @param {object} dataItem - The data item being drawn
         * @param {string[]} additionalClasses - Any additional values this Series needs appending to the class value.Used by stacked Series to differentiate between Series.
         * @returns {string} classValue - A class value for a particular data item being bound in this Series.
         */
        self.itemClassName = function(dataItem, additionalClasses) {

            var keySelector = insight.Utils.keySelector(groupKeyFunction(dataItem));
            var selected = selectedClassName(self.selectedItems, keySelector);
            var value = self.seriesClassName() + ' ' + keySelector + selected;

            return value;
        };

        self.keys = function(orderFunction) {
            return self.dataset(orderFunction)
                .map(self.keyFunction());
        };

        /*
         * Creates the tooltip for this Series, checking if it exists already first.
         * @memberof! insight.Series
         * @param {DOMElement} container - The DOM Element that the tooltip should be drawn inside.
         */
        self.initializeTooltip = function(container) {
            if (!self.tooltip) {
                self.tooltip = new insight.Tooltip()
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
        self.mouseOver = function(item, i, valueFunction) {

            var textFunction = valueFunction || self.tooltipFunction();
            var tooltipText = tooltipFormat(textFunction(item));

            self.tooltip.show(this, tooltipText);

            d3.select(this).classed('active', true);
        };

        /*
         * This event handler is triggered when a series element (rectangle, circle or line) triggers a mouseout event. Tooltips are hidden and CSS updated.
         * The *this* context will reference the DOMElement raising the event.
         * @memberof! insight.Series
         */
        self.mouseOut = function() {

            self.tooltip.hide();

            d3.select(this).classed('active', false);
        };



        self.click = function(element, filterFunc) {
            var filterValue = groupKeyFunction(filterFunc);

            self.clickEvent(self.data, filterValue);
        };

        self.tooltipFunction = function(tooltipFunc) {
            if (!arguments.length) {
                return tooltipFunction;
            }
            tooltipFunction = tooltipFunc;

            return self;
        };

        /*
         * Extracts the minimum value on an axis for this series.
         * @memberof! insight.Series
         * @instance
         * @param scale The corresponding x or y axis
         * @returns {Number} - The minimum value within the range of the values for this series on the given axis.
         */
        self.findMin = function(scale) {

            var data = self.dataset();

            var func = scale === self.x ? self.keyFunction() : self.valueFunction();

            return d3.min(data, func);
        };

        /*
         * Extracts the maximum value on an axis for this series.
         * @memberof! insight.Series
         * @instance
         * @param {insight.Axis} axis The corresponding x or y axis
         * @returns {Object} - The maximum value within the range of the values for this series on the given axis.
         */
        self.findMax = function(axis) {

            var func = axis === self.keyAxis ? self.keyFunction() : self.valueFunction();
            var max = d3.max(self.dataset(), func);
            return max;

        };

        self.orderFunction = function(a, b) {
            // Sort ascending
            return self.valueFunction()(a) - self.valueFunction()(b);
        };

        self.draw = function(chart, drag) {};

        // Public functions -------------------------------------------------------------------------------------------

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
        self.keyFunction = function(keyFunc) {
            if (!arguments.length) {
                return keyFunction;
            }
            keyFunction = keyFunc;

            return self;
        };

        /**
         * Gets the function used to retrieve the grouping key from the data object to plot on a chart, used for cross filtering.
         * @memberof! insight.Series
         * @instance
         * @returns {function} The current function used to extract the grouping key.
         *
         * @also
         *
         * Sets the function used to retrieve the grouping key from the data object to plot on a chart.
         * @memberof! insight.Series
         * @instance
         * @param {function} keyFunc The new function to use to extract the grouping key from a data object.
         * @returns {this}
         */
        self.groupKeyFunction = function(keyFunc) {
            if (!arguments.length) {
                return groupKeyFunction;
            }
            groupKeyFunction = keyFunc;

            return self;
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
        self.valueFunction = function(valueFunc) {
            if (!arguments.length) {
                return valueFunction;
            }
            valueFunction = valueFunc;

            return self;
        };

        /**
         * Returns the array of data objects used to plot this Series.
         * @memberof! insight.Series
         * @instance
         * @param {Function} orderFunction The function used to compare objects in the dataset for ordering.
         * @returns {object[]} - The data set to be used by the series
         */
        self.dataset = function(orderFunction) {

            if (self.keyAxis.isOrdered()) {

                orderFunction =
                    orderFunction ||
                    self.keyAxis.orderingFunction() ||
                    self.orderFunction;

            } else {

                orderFunction = null;

            }

            var data = self.usesCrossfilter ? self.data.getData(orderFunction, self.topValues) : arrayDataSet(orderFunction, self.topValues);

            if (filter) {
                data = data.filter(filter);
            }

            return data;
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
        self.tooltipOffset = function(value) {
            if (!arguments.length) {
                return tooltipOffset;
            }
            tooltipOffset = value;

            return self;
        };

        /**
         * The function to use to filter an object from the series.
         * The function should return a boolean where false means the object is not included in the series.
         * @memberof! insight.Series
         * @instance
         * @returns {Function} - The function to use to filter an object from the series.
         *
         * @also
         *
         * Sets the function to use to filter an object from the series.
         * The function should return a boolean where false means the object is not included in the series.
         * @memberof! insight.Series
         * @instance
         * @param {Function} filterFunc The new function to use to filter an object from the series.
         * @returns {this}
         */
        self.filterFunction = function(filterFunc) {
            if (!arguments.length) {
                return filter;
            }
            filter = filterFunc;

            return self;
        };

        /**
         * Gets the function that will be used to format the tooltip for this series' values.
         * @memberof! insight.Series
         * @instance
         * @returns {Function} - A function that accepts the value string and returns the formatted tooltip label.
         *
         * @also
         *
         * Sets the function that will be used to format the tooltip for this series' values.
         * See `insight.Formatters` for pre-built examples.
         * @memberof! insight.Series
         * @instance
         * @param {Function} formatFunc A function that accepts the value string and returns the formatted tooltip label.
         * @returns {this}
         */
        self.tooltipFormat = function(formatFunc) {
            if (!arguments.length) {
                return tooltipFormat;
            }
            tooltipFormat = formatFunc;

            return self;
        };

        /**
         * The number of results to include. Used in conjunction with ordering of an Axis.
         * @memberof! insight.Series
         * @instance
         * @returns {Number} - The number of results to include. Used in conjunction with ordering of an Axis.
         *
         * @also
         *
         * Sets the number of results to include. Used in conjunction with ordering of an Axis.
         * @memberof! insight.Series
         * @instance
         * @param {Number} topValues The number of results to include. Used in conjunction with ordering of an Axis.
         * @returns {this}
         */
        self.top = function(topValues) {
            if (!arguments.length) {
                return self.topValues;
            }
            self.topValues = topValues;

            return self;
        };

    };

    /* Skeleton event overriden by a Dashboard to subscribe to this series' clicks.
     * @param {object} series - The series being clicked
     * @param {object[]} filter - The value of the point selected, used for filtering/highlighting
     * @param {object[]} selection - The css selection name also used to maintain a list of filtered dimensions (TODO - is this needed anymore?)
     */
    insight.Series.prototype.clickEvent = function(series, filter, selection) {

    };

    /*
     * Applies all properties from a theme to the series.
     * @memberof! insight.Series
     * @instance
     * @param {insight.Theme} theme The theme to apply to this series.
     * @returns {this}
     */
    insight.Series.prototype.applyTheme = function(theme) {
        return this;
    };


})(insight);
;(function(insight) {

    /**
     * The MarkerSeries class extends the Series class and draws markers/targets on a chart
     * @class insight.MarkerSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     */
    insight.MarkerSeries = function MarkerSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            thickness = 5,
            widthFactor = 1,
            offset = 0,
            isHorizontal = false;

        // Internal functions -----------------------------------------------------------------------------------------

        self.xPosition = function(d) {
            var pos = 0;

            if (self.isHorizontal()) {
                pos = self.x.scale(self.valueFunction()(d));

            } else {
                pos = self.x.scale(self.keyFunction()(d));

                offset = self.calculateOffset(d);

                pos = widthFactor !== 1 ? pos + offset : pos;
            }

            return pos;
        };


        self.keys = function() {

            var f = self.keyFunction();

            return self.dataset().map(f);
        };

        self.calculateOffset = function(d) {

            var thickness = self.isHorizontal() ? self.markerHeight(d) : self.markerWidth(d);
            var scalePos = self.isHorizontal() ? self.y.scale.rangeBand(d) : self.x.scale.rangeBand(d);

            return (scalePos - thickness) * 0.5;
        };

        self.yPosition = function(d) {

            var position = 0;

            if (self.isHorizontal()) {
                position = self.y.scale(self.keyFunction()(d));

                offset = self.calculateOffset(d);

                position = widthFactor !== 1 ? position + offset : position;

            } else {
                position = self.y.scale(self.valueFunction()(d));
            }

            return position;
        };

        self.isHorizontal = function(shouldBeHorizontal) {
            if (!arguments.length) {
                return isHorizontal;
            }
            isHorizontal = shouldBeHorizontal;
            return self;
        };

        self.markerWidth = function(d) {
            var w = 0;

            if (self.isHorizontal()) {
                w = self.thickness();
            } else {
                w = self.x.scale.rangeBand(d) * widthFactor;
            }

            return w;
        };

        self.markerHeight = function(d) {
            var h = 0;

            if (self.isHorizontal()) {
                h = self.y.scale.rangeBand(d) * widthFactor;
            } else {
                h = self.thickness();
            }

            return h;
        };

        self.draw = function(chart, isDragging) {

            self.initializeTooltip(chart.container.node());
            self.selectedItems = chart.selectedItems;

            function reset(d) {
                d.yPos = 0;
                d.xPos = 0;
            }

            var d = self.dataset().forEach(reset);

            var groups = chart.plotArea
                .selectAll('g.' + insight.Constants.BarGroupClass + "." + self.name)
                .data(self.dataset(), self.keyAccessor);

            var newGroups = groups.enter()
                .append('g')
                .attr('class', insight.Constants.BarGroupClass + " " + self.name);

            var newBars = newGroups.selectAll('rect.bar');

            function click(filter) {
                return self.click(self, filter);
            }

            function duration(d, i) {
                return 200 + (i * 20);
            }

            newBars = newGroups.append('rect')
                .attr('class', self.itemClassName)
                .attr('y', self.y.bounds[0])
                .attr('height', 0)
                .attr('fill', self.color)
                .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                .on('mouseover', self.mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', click);

            var bars = groups.selectAll('.' + self.name + 'class');

            bars
                .transition()
                .duration(duration)
                .attr('y', self.yPosition)
                .attr('x', self.xPosition)
                .attr('width', self.markerWidth)
                .attr('height', self.markerHeight);

            groups.exit().remove();
        };

        // Public functions -------------------------------------------------------------------------------------------

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
        self.widthFactor = function(widthProportion) {

            if (!arguments.length) {
                return widthFactor;
            }
            widthFactor = widthProportion;
            return self;
        };

        /**
         * The thickeness of the marker, in pixels.
         * @memberof! insight.MarkerSeries
         * @instance
         * @returns {Number} - The current marker thickness.
         *
         * @also
         *
         * Sets the thickeness of the marker, in pixels.
         * @memberof! insight.MarkerSeries
         * @instance
         * @param {Number} markerThickness The new thickeness, in pixels.
         * @returns {this}
         */
        self.thickness = function(markerThickness) {
            if (!arguments.length) {
                return thickness;
            }
            thickness = markerThickness;
            return self;
        };

    };

    insight.MarkerSeries.prototype = Object.create(insight.Series.prototype);
    insight.MarkerSeries.prototype.constructor = insight.MarkerSeries;

})(insight);
;(function(insight) {

    /**
     * The BubbleSeries class extends the Series class
     * @class insight.BubbleSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     */
    insight.BubbleSeries = function BubbleSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            selector = self.name + insight.Constants.Bubble,
            radiusFunction = d3.functor(10);

        // Internal variables -------------------------------------------------------------------------------------------

        self.classValues = [insight.Constants.Bubble];

        // Internal functions -----------------------------------------------------------------------------------------

        self.rangeY = function(d) {
            return self.y.scale(self.valueFunction()(d));
        };

        self.rangeX = function(d, i) {
            return self.x.scale(self.keyFunction()(d));
        };

        self.bubbleData = function(data) {
            var max = d3.max(data, radiusFunction);

            function rad(d) {
                return d.radius;
            }

            //Minimum of pixels-per-axis-unit
            var xValues = data.map(self.keyFunction());
            var yValues = data.map(self.valueFunction());
            var xBounds = self.x.bounds[1];
            var yBounds = self.y.bounds[0];
            var maxRad = Math.min(xBounds / 10, yBounds / 10);

            // create radius for each item
            data.forEach(function(d) {
                var radiusInput = radiusFunction(d);

                if (radiusInput === 0) {
                    d.radius = 0;
                } else {
                    d.radius = (radiusInput * maxRad) / max;
                }
            });

            //this sort ensures that smaller bubbles are on top of larger ones, so that they are always selectable.  Without changing original array (hence concat which creates a copy)
            data = data.concat()
                .sort(function(a, b) {
                    return d3.descending(rad(a), rad(b));
                });

            return data;
        };

        self.draw = function(chart, isDragging) {

            self.initializeTooltip(chart.container.node());
            self.selectedItems = chart.selectedItems;

            var duration = isDragging ? 0 : function(d, i) {
                return 200 + (i * 20);
            };

            function click(filter) {
                return self.click(self, filter);
            }

            var bubbleData = self.bubbleData(self.dataset());

            var bubbles = chart.plotArea.selectAll('circle.' + insight.Constants.Bubble)
                .data(bubbleData, self.keyFunction());

            bubbles.enter()
                .append('circle')
                .attr('class', self.itemClassName)
                .on('mouseover', self.mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', click);


            function rad(d) {
                return d.radius;
            }

            function opacity() {
                // If we are using selected/notSelected, then make selected more opaque than notSelected
                if (this.classList && this.classList.contains("selected")) {
                    return 0.8;
                }

                if (this.classList && this.classList.contains("notselected")) {
                    return 0.3;
                }

                //If not using selected/notSelected, make everything semi-transparent
                return 0.5;
            }

            bubbles.transition()
                .duration(duration)
                .attr('r', rad)
                .attr('cx', self.rangeX)
                .attr('cy', self.rangeY)
                .attr('opacity', opacity)
                .style('fill', this.color);
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * The function to extract the radius of each bubble from the data objects.
         * @memberof! insight.BubbleSeries
         * @instance
         * @returns {Function} - The current function used to determine the radius of data objects.
         *
         * @also
         *
         * Sets the function to extract the radius of each bubble from the data objects.
         * @memberof! insight.BubbleSeries
         * @instance
         * @param {Function} radiusFunc The new function to extract the radius of each bubble from the data objects.
         * @returns {this}
         */
        self.radiusFunction = function(radiusFunc) {
            if (!arguments.length) {
                return radiusFunction;
            }
            radiusFunction = radiusFunc;

            return self;
        };

    };

    insight.BubbleSeries.prototype = Object.create(insight.Series.prototype);
    insight.BubbleSeries.prototype.constructor = insight.BubbleSeries;

})(insight);
;(function(insight) {

    /**
     * The ScatterSeries class extends the Series class
     * @class insight.ScatterSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     */
    insight.ScatterSeries = function ScatterSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var radiusFunction = d3.functor(3),
            opacityFunction = d3.functor(1),
            self = this,
            selector = self.name + insight.Constants.Scatter;

        // Private functions ------------------------------------------------------------------------------------------

        function className(d) {

            return selector + " " + insight.Constants.Scatter + " " + self.dimensionName;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.rangeY = function(d) {
            return self.y.scale(self.valueFunction()(d));
        };

        self.rangeX = function(d, i) {
            return self.x.scale(self.keyFunction()(d));
        };

        self.radiusFunction = function(_) {
            if (!arguments.length) {
                return radiusFunction;
            }
            radiusFunction = _;

            return self;
        };

        self.scatterData = function(data) {
            var max = d3.max(data, radiusFunction);

            //Minimum of pixels-per-axis-unit
            var xValues = data.map(self.keyFunction());
            var yValues = data.map(self.valueFunction());
            var xBounds = self.x.bounds[1];
            var yBounds = self.y.bounds[0];

            // create radius for each item
            data.forEach(function(d) {
                d.radius = radiusFunction(d);
            });

            return data;
        };

        self.draw = function(chart, isDragging) {

            self.initializeTooltip(chart.container.node());
            self.selectedItems = chart.selectedItems;

            var duration = isDragging ? 0 : function(d, i) {
                return 200 + (i * 20);
            };

            function click(filter) {
                return self.click(self, filter);
            }

            var scatterData = self.scatterData(self.dataset());

            var points = chart.plotArea.selectAll('circle.' + selector)
                .data(scatterData, self.keyFunction());

            points.enter()
                .append('circle')
                .attr('class', className)
                .on('mouseover', self.mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', click);

            points
                .attr('r', radiusFunction)
                .attr('cx', self.rangeX)
                .attr('cy', self.rangeY)
                .attr('opacity', opacityFunction)
                .style('fill', self.color);
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * The radius of each point, in pixels.
         * @memberof! insight.ScatterSeries
         * @instance
         * @returns {Number} - The current radius of each point, in pixels.
         *
         * @also
         *
         * Sets the radius of each point, in pixels.
         * @memberof! insight.ScatterSeries
         * @instance
         * @param {Number} radius The new radius of each point, in pixels.
         * @returns {this}
         */
        self.pointRadius = function(radius) {
            if (!arguments.length) {
                return radiusFunction();
            }
            radiusFunction = d3.functor(radius);

            return self;
        };

        /**
         * The opacity of each point. A number between 0.0 and 1.0 where
         * 0.0 is completely transparent and 1.0 is completely opaque.
         * @memberof! insight.ScatterSeries
         * @instance
         * @returns {Number} - The current opacity of each point (0.0 - 1.0).
         *
         * @also
         *
         * Sets the opacity of each point. A number between 0.0 and 1.0 where
         * 0.0 is completely transparent and 1.0 is completely opaque.
         * @memberof! insight.ScatterSeries
         * @instance
         * @param {Number} opacity The new opacity of each point.
         * @returns {this}
         */
        self.pointOpacity = function(opacity) {
            if (!arguments.length) {
                return opacityFunction();
            }
            opacityFunction = d3.functor(opacity);

            return self;
        };

    };

    insight.ScatterSeries.prototype = Object.create(insight.Series.prototype);
    insight.ScatterSeries.prototype.constructor = insight.ScatterSeries;

})(insight);
;(function(insight) {

    /**
     * The RowSeries class extends the Series class and draws horizontal bars on a Chart
     * @class insight.RowSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     * @param {object} color - a string or function that defines the color to be used for the items in this series
     */
    insight.RowSeries = function RowSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            barThicknessFunction = self.y.scale.rangeBand;

        // Internal variables -------------------------------------------------------------------------------------------

        self.valueAxis = x;
        self.keyAxis = y;
        self.classValues = [insight.Constants.BarClass];

        // Private functions ------------------------------------------------------------------------------------------

        function mouseOver(data, i) {
            var seriesName = this.getAttribute('in_series');
            self.mouseOver.call(this, data, i, self.valueFunction());
        }

        function click(filter) {
            return self.click(self, filter);
        }

        function duration(d, i) {
            return 200 + (i * 20);
        }

        function opacity() {
            // If we are using selected/notSelected, then make selected more opaque than notSelected
            if (this.classList && this.classList.contains("notselected")) {
                return 0.5;
            }

            //If not using selected/notSelected, make everything opaque
            return 1;
        }

        function seriesSpecificClassName(d) {

            var additionalClass = ' ' + self.name + 'class';
            var baseClassName = self.itemClassName(d);
            var itemClassName = baseClassName + additionalClass;

            return itemClassName;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.draw = function(chart) {

            self.initializeTooltip(chart.container.node());
            self.selectedItems = chart.selectedItems;

            var groupSelector = 'g.' + self.name + '.' + insight.Constants.BarGroupClass,
                barSelector = 'rect.' + self.name + '.' + insight.Constants.BarGroupClass;

            var data = self.dataset();

            var groups = chart.plotArea
                .selectAll(groupSelector)
                .data(data, self.keyFunction());

            var newGroups = groups.enter()
                .append('g')
                .classed(self.name, true)
                .classed(insight.Constants.BarGroupClass, true);

            var newBars = newGroups.selectAll(barSelector);

            newBars = newGroups.append('rect')
                .attr('class', self.itemClassName)
                .attr('in_series', self.name)
                .attr('fill', self.color)
                .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                .on('mouseover', mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', click);

            var seriesTypeCount = chart.countSeriesOfType(self);
            var seriesIndex = chart.seriesIndexByType(self);
            var groupIndex = 0;

            // Select and update all bars
            var seriesSelector = '.' + self.name + 'class.' + insight.Constants.BarClass;
            var bars = groups.selectAll(seriesSelector)
                .transition()
                .duration(duration)
                .attr('y', yPosition)
                .attr('x', 0)
                .attr('height', barHeight)
                .attr('width', barWidth)
                .style('opacity', opacity);

            groups.exit().remove();

            // draw helper functions ------------------------------------

            function groupHeight(d) {
                var w = self.keyAxis.scale.rangeBand(d);
                return w;
            }

            function barHeight(d) {

                var widthOfGroup = groupHeight(d);
                var width = widthOfGroup / seriesTypeCount;
                return width;

            }

            function barWidth(d) {

                var barValue = self.valueFunction()(d);
                var height = self.valueAxis.scale(barValue);


                return height;
            }

            function yPosition(d) {

                var groupPositions = self.keyAxis.scale.range();
                var groupY = groupPositions[groupIndex];

                var heightOfBar = barHeight(d);
                var position = groupY + (heightOfBar * (seriesTypeCount - seriesIndex - 1));

                groupIndex++;

                return position;

            }

        };

    };

    insight.RowSeries.prototype = Object.create(insight.Series.prototype);
    insight.RowSeries.prototype.constructor = insight.RowSeries;

})(insight);
;(function(insight) {

    /**
     * The LineSeries class extends the Series class and draws horizontal bars on a Chart
     * @class insight.LineSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     */
    insight.LineSeries = function LineSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            lineType = 'linear',
            displayPoints = true;

        // Internal variables -----------------------------------------------------------------------------------------

        self.classValues = [insight.Constants.LineClass];

        // Private functions ------------------------------------------------------------------------------------------

        function lineOver(d, item) {

        }

        function lineOut(d, item) {

        }

        function lineClick(d, item) {

        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.rangeY = function(d) {
            return self.y.scale(self.valueFunction()(d));
        };

        self.rangeX = function(d) {
            var val = 0;

            if (self.x.scale.rangeBand) {
                val = self.x.scale(self.keyFunction()(d)) + (self.x.scale.rangeBand() / 2);
            } else {

                val = self.x.scale(self.keyFunction()(d));
            }

            return val;
        };

        self.rangeExists = function(rangeSelector) {

            if (rangeSelector.length === 0) {
                return 0;
            }


            return rangeSelector[0].length;
        };

        self.draw = function(chart, isDragging) {

            self.initializeTooltip(chart.container.node());

            var transform = d3.svg.line()
                .x(self.rangeX)
                .y(self.rangeY)
                .interpolate(lineType);

            var data = self.dataset();

            var classValue = self.name + 'line ' + insight.Constants.LineClass;
            var classSelector = '.' + self.name + 'line.' + insight.Constants.LineClass;

            var rangeIdentifier = "path" + classSelector;

            var rangeElement = chart.plotArea.selectAll(rangeIdentifier);

            if (!self.rangeExists(rangeElement)) {
                chart.plotArea.append("path")
                    .attr("class", classValue)
                    .style("stroke", self.color)
                    .attr("fill", "none")
                    .attr("clip-path", "url(#" + chart.clipPath() + ")")
                    .on('mouseover', lineOver)
                    .on('mouseout', lineOut)
                    .on('click', lineClick);
            }

            var duration = isDragging ? 0 : 300;

            chart.plotArea.selectAll(rangeIdentifier)
                .datum(self.dataset())
                .transition()
                .duration(duration)
                .attr("d", transform);

            if (displayPoints) {
                var circles = chart.plotArea.selectAll("circle")
                    .data(self.dataset());

                circles.enter()
                    .append('circle')
                    .attr('class', 'target-point')
                    .attr("clip-path", "url(#" + chart.clipPath() + ")")
                    .attr("cx", self.rangeX)
                    .attr("cy", chart.height() - chart.margin().bottom - chart.margin().top)
                    .on('mouseover', self.mouseOver)
                    .on('mouseout', self.mouseOut);

            }

            var colorFunc = (displayPoints) ? self.color : d3.functor(undefined);
            var allCircles = chart.plotArea.selectAll("circle");

            allCircles
                .transition()
                .duration(duration)
                .attr("cx", self.rangeX)
                .attr("cy", self.rangeY)
                .attr("r", 5)
                .style("fill", colorFunc)
                .style("stroke-width", 0);
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Whether or not to show circular points on top of the line for each datapoint.
         * @memberof! insight.LineSeries
         * @instance
         * @returns {boolean} - Whether or not to show circular points on top of the line for each datapoint.
         *
         * @also
         *
         * Sets whether or not to show circular points on top of the line for each datapoint.
         * @memberof! insight.LineSeries
         * @instance
         * @param {boolean} showPoints Whether or not to show circular points on top of the line for each datapoint.
         * @returns {this}
         */
        self.shouldShowPoints = function(showPoints) {
            if (!arguments.length) {
                return displayPoints;
            }
            displayPoints = showPoints;
            return self;
        };

        /**
         * The line type that this lineSeries will draw. Defaults to 'linear'.
         * See https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate for all options.
         * @memberof! insight.LineSeries
         * @instance
         * @returns {String} - The line type that this lineSeries will draw.
         *
         * @also
         *
         * Sets the line type that this lineSeries will draw..
         * @memberof! insight.LineSeries
         * @instance
         * @param {String} newLineType The line type that this lineSeries will draw.
         * @returns {this}
         */
        self.lineType = function(newLineType) {
            if (!arguments.length) {
                return lineType;
            }

            lineType = newLineType;

            return self;
        };

        self.applyTheme(insight.defaultTheme);
    };

    insight.LineSeries.prototype = Object.create(insight.Series.prototype);
    insight.LineSeries.prototype.constructor = insight.LineSeries;

    insight.LineSeries.prototype.applyTheme = function(theme) {
        this.lineType(theme.seriesStyle.lineStyle);
        this.shouldShowPoints(theme.seriesStyle.showPoints);

        return this;
    };

})(insight);
;(function(insight) {

    /**
     * The ColumnSeries class extends the Series class and draws vertical bars on a Chart
     * @class insight.ColumnSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     */
    insight.ColumnSeries = function ColumnSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables -----------------------------------------------------------------------------------------

        var self = this;

        // Internal variables ------------------------------------------------------------------------------------------

        self.classValues = [insight.Constants.BarClass];

        // Private functions -----------------------------------------------------------------------------------------

        function tooltipFunction(d) {
            return self.tooltipFormat()(self.valueFunction()(d));
        }

        function click(filter) {
            return self.click(self, filter);
        }

        function duration(d, i) {
            return 200 + (i * 20);
        }

        function mouseOver(data, i) {
            var seriesName = this.getAttribute('in_series');

            self.mouseOver.call(this, data, i, self.valueFunction());
        }

        function opacity() {
            // If we are using selected/notSelected, then make selected more opaque than notSelected
            if (this.classList && this.classList.contains("notselected")) {
                return 0.5;
            }

            //If not using selected/notSelected, make everything opaque
            return 1;
        }

        // Internal functions ----------------------------------------------------------------------------------------

        self.orderFunction = function(a, b) {
            // Sort descending for categorical data
            return self.valueFunction()(b) - self.valueFunction()(a);
        };

        self.draw = function(chart, isDragging) {

            self.initializeTooltip(chart.container.node());
            self.selectedItems = chart.selectedItems;

            var groupSelector = 'g.' + self.name + '.' + insight.Constants.BarGroupClass,
                barSelector = 'rect.' + self.name + '.' + insight.Constants.BarGroupClass;

            var data = self.dataset();

            var groups = chart.plotArea
                .selectAll(groupSelector)
                .data(data, self.keyFunction());

            var newGroups = groups.enter()
                .append('g')
                .classed(self.name, true)
                .classed(insight.Constants.BarGroupClass, true);

            var newBars = newGroups.selectAll(barSelector);

            newBars = newGroups.append('rect')
                .attr('class', self.itemClassName)
                .attr('in_series', self.name)
                .attr('fill', self.color)
                .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                .on('mouseover', mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', click);

            var seriesTypeCount = chart.countSeriesOfType(self);
            var seriesIndex = chart.seriesIndexByType(self);
            var groupIndex = 0;

            // Select and update all bars
            var seriesSelector = '.' + self.name + 'class.' + insight.Constants.BarClass;
            var bars = groups.selectAll(seriesSelector);

            bars
                .transition()
                .duration(duration)
                .attr('y', yPosition)
                .attr('x', xPosition)
                .attr('width', barWidth)
                .attr('height', barHeight)
                .style('opacity', opacity);

            // Remove groups no longer in the data set
            groups.exit().remove();

            // draw helper functions ----------------------------------

            function barHeight(d) {

                var barValue = self.valueFunction()(d);
                var height = (chart.height() - chart.margin().top - chart.margin().bottom) - self.y.scale(barValue);

                return height;
            }

            function groupWidth(d) {
                var w = self.x.scale.rangeBand(d);
                return w;
            }

            function barWidth(d) {

                var widthOfGroup = groupWidth(d);
                var width = widthOfGroup / seriesTypeCount;
                return width;

            }

            function xPosition(d) {

                var groupPositions = self.keyAxis.scale.range();
                var groupX = groupPositions[groupIndex];

                var widthOfBar = barWidth(d);
                var position = groupX + (widthOfBar * seriesIndex);

                groupIndex++;

                return position;

            }

            function yPosition(d) {
                var position = self.y.scale(self.valueFunction()(d));
                return position;
            }

        };

    };

    insight.ColumnSeries.prototype = Object.create(insight.Series.prototype);
    insight.ColumnSeries.prototype.constructor = insight.ColumnSeries;

})(insight);
;if (typeof define === 'function' && define.amd) {

    define('insight', [], function() {
        return insight;
    });

}
