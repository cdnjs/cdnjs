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

    /**
     * A Frequency used for spacing tick marks on a Date-Time axis.
     * @constructor
     * @param {Number} year The number of years to represent
     * @param {Number} [months] The number of months to represent
     * @param {Number} [days] The number of days to represent
     * @param {Number} [hours] The number of hours to represent
     * @param {Number} [minutes] The number of minutes to represent
     * @param {Number} [seconds] The number of seconds to represent
     */
    insight.DateFrequency = function DateFrequency(years, months, days, hours, minutes, seconds) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Days are not zero based
        var adjustedDay = days + 1;

        var referenceDate = new Date(
            years,
            months || 0,
            adjustedDay || 1,
            hours || 0,
            minutes || 0,
            seconds || 0);

        // Private functions -------------------------------------------------------------------------------------

        function totalDaysSinceEpoch(date) {
            var totalMillisecondsInADay = 8.64e7;
            var result = Math.floor(date / totalMillisecondsInADay);
            return result;
        }

        function roundUpToNearestMultiple(number, multiple) {
            return Math.ceil(number / multiple) * multiple;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.toSeconds = function() {

            var totalSeconds = referenceDate.getSeconds();
            totalSeconds += referenceDate.getMinutes() * 60;
            totalSeconds += referenceDate.getHours() * 60 * 60;
            totalSeconds += (referenceDate.getDate() - 1) * 60 * 60 * 24;
            totalSeconds += referenceDate.getMonth() * 60 * 60 * 24 * 29.5;
            totalSeconds += (referenceDate.getFullYear() - 1900) * 60 * 60 * 24 * 365.25;

            return totalSeconds;
        };

        self.toValue = function() {
            return referenceDate;
        };

        self.getYears = function() {
            return referenceDate.getFullYear() - 1900;
        };

        self.getMonths = function() {
            return referenceDate.getMonth();
        };

        self.getDays = function() {
            return referenceDate.getDate() - 1;
        };

        self.getHours = function() {
            return referenceDate.getHours();
        };

        self.getMinutes = function() {
            return referenceDate.getMinutes();
        };

        self.getSeconds = function() {
            return referenceDate.getSeconds();
        };

        self.roundDate = function(date) {
            var years = date.getFullYear(),
                months = date.getMonth(),
                days = date.getDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();

            if (self.getYears() !== 0) {
                var nearestYear = roundUpToNearestMultiple(years, self.getYears());

                return new Date(Date.UTC(nearestYear, 0));
            }
            if (self.getMonths() !== 0) {
                var nearestMonth = roundUpToNearestMultiple(months, self.getMonths());

                return new Date(Date.UTC(years, nearestMonth));
            }
            if (self.getDays() !== 0 && self.getDays() % 7 === 0) {
                var startOfWeek = (7 - date.getDay()) % 7;
                var nearestWeek = days + startOfWeek;

                return new Date(Date.UTC(years, months, nearestWeek));
            }
            if (self.getDays() !== 0) {
                var multipleOfDays = self.getDays();
                var daysFromMultiple = totalDaysSinceEpoch(date) % multipleOfDays;
                var nearestDay = days + daysFromMultiple;

                return new Date(Date.UTC(years, months, nearestDay));
            }
            if (self.getHours() !== 0) {
                var nearestHour = roundUpToNearestMultiple(hours, self.getHours());

                return new Date(Date.UTC(years, months, days, nearestHour));
            }
            if (self.getMinutes() !== 0) {
                var nearestMinute = roundUpToNearestMultiple(minutes, self.getMinutes());

                return new Date(Date.UTC(years, months, days, hours, nearestMinute));
            }
            var nearestSecond = roundUpToNearestMultiple(seconds, self.getSeconds());

            return new Date(Date.UTC(years, months, days, hours, minutes, nearestSecond));
        };
    };

    // Public functions --------------------------------------------------------------------------------------

    /**
     * A DateFrequency representing a number of years
     * @param {Number} numberOfYears The number of years to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of years.
     */
    insight.DateFrequency.dateFrequencyForYears = function(numberOfYears) {
        return new insight.DateFrequency(numberOfYears);
    };

    /**
     * A DateFrequency representing a number of months
     * @param {Number} numberOfMonths The number of months to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of months.
     */
    insight.DateFrequency.dateFrequencyForMonths = function(numberOfMonths) {
        return new insight.DateFrequency(0, numberOfMonths);
    };

    /**
     * A DateFrequency representing a number of days
     * @param {Number} numberOfDays The number of days to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of days.
     */
    insight.DateFrequency.dateFrequencyForDays = function(numberOfDays) {
        return new insight.DateFrequency(0, 0, numberOfDays);
    };

    /**
     * A DateFrequency representing a number of weeks
     * @param {Number} numberOfWeeks The number of weeks to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of weeks.
     */
    insight.DateFrequency.dateFrequencyForWeeks = function(numberOfWeeks) {
        return new insight.DateFrequency(0, 0, numberOfWeeks * 7);
    };

    /**
     * A DateFrequency representing a number of hours
     * @param {Number} numberOfHours The number of hours to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of hours.
     */
    insight.DateFrequency.dateFrequencyForHours = function(numberOfHours) {
        return new insight.DateFrequency(0, 0, 0, numberOfHours);
    };

    /**
     * A DateFrequency representing a number of minutes
     * @param {Number} numberOfMinutes The number of minutes to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of minutes.
     */
    insight.DateFrequency.dateFrequencyForMinutes = function(numberOfMinutes) {
        return new insight.DateFrequency(0, 0, 0, 0, numberOfMinutes);
    };

    /**
     * A DateFrequency representing a number of seconds
     * @param {Number} numberOfSeconds The number of seconds to represent
     * @returns {insight.DateFrequency} - A new DateFrequency representing this number of seconds.
     */
    insight.DateFrequency.dateFrequencyForSeconds = function(numberOfSeconds) {
        return new insight.DateFrequency(0, 0, 0, 0, 0, numberOfSeconds);
    };
})(insight);
;(function(insight) {

    /*
     * Measures the width and height of text using a given font.
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

            var measurer = insight.utils.getDrawingContext(measureCanvas, font);
            var actualTextWidth = measurer.measureText(text).width;
            var roughTextHeight = measurer.measureText('aa').width;

            var angleRadians = insight.utils.degreesToRadians(angleDegrees);

            var height = actualTextWidth * Math.abs(Math.sin(angleRadians)) + roughTextHeight * Math.abs(Math.cos(angleRadians));
            var width = actualTextWidth * Math.abs(Math.cos(angleRadians)) + roughTextHeight * Math.abs(Math.sin(angleRadians));

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
;insight.constants = (function() {
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
    exports.RowClass = 'row';
    exports.ColClass = 'col';
    exports.LineClass = 'in-line';
    exports.LinePoint = 'target-point';
    exports.ContainerClass = 'incontainer';
    exports.ChartSVG = 'chartSVG';
    exports.PlotArea = 'plotArea';
    exports.Legend = 'legend';
    exports.LegendView = 'legend-view';
    exports.Bubble = 'bubble';
    exports.Scatter = 'scatter';
    exports.Point = 'point';
    exports.TableClass = 'in-table';
    exports.TableRowClass = 'in-datarow';

    return exports;
}());
;/**
 * Conversion functions with a focus on JSON format
 * @namespace insight.conversion
 */
insight.conversion = (function() {

    function getValue(type, value) {
        var returnValue = value;
        if (type.toUpperCase() === 'NUMERIC' || type.toUpperCase() === 'INTEGER') {
            returnValue = parseInt(value, 10);
        }
        if (type.toUpperCase() === 'REAL') {
            returnValue = parseFloat(value);
        }
        if (type.toUpperCase() === 'STRING') {
            returnValue = value;
        }
        return returnValue;
    }

    return {

        /** Convert arff data into JSON data
         * @memberof! insight.conversion
         * @param {Object} data The data to be converted.
         * @param {Function} callback with signature function(errorArray, json). json is the data and errorArray contains an array of Error
         */
        arffToJson: function(data, callback) {

            var jdata = [];
            var lines = data.replace(/\t/g, ' ').replace(/\'/g, '').split(/\r?\n|\r/g).filter(function(line) {
                return line.length >= 1 && line[0] !== "";
            });

            var attributes = [];

            var currentState;

            var errorArray = [];

            var states = {
                relation: function(string) {
                    if (string.match(/\@relation/i)) {
                        currentState = states.attribute;
                    }
                },
                attribute: function(string) {
                    if (string.match(/\@attribute/i)) {
                        var elements = string.split(/ +/);
                        attributes.push({
                            name: elements[1],
                            type: elements[2]
                        });
                    }
                    if (string.match(/\@data/i)) {
                        currentState = states.data;
                    }
                },
                data: function(string) {
                    var values = string.split(',');
                    if (values.length !== attributes.length) {
                        throw new Error('data missing, not enough values to fill expected attributes');
                    }
                    var item = {};
                    attributes.forEach(function(attr, index) {
                        item[attr.name] = getValue(attr.type, values[index]);
                    });
                    jdata.push(item);
                }
            };

            currentState = states.relation;

            lines.forEach(function(line) {
                try {
                    currentState(line);
                } catch (err) {
                    errorArray.push(err);
                }
            });

            callback(errorArray, jdata);
        }

    };

}());
;/**
 * Convenience formatters for formatting string values.
 * @namespace insight.formatters
 */
insight.formatters = (function(d3) {


    return {

        /** Format the number with $, thousand-groupings, and 2 decimal places.
         * @example 2345.2 becomes '$2,345.20'.
         * @memberof! insight.formatters
         * @param {Number} value The value to be formatted.
         * @returns {String} - The formatted value.
         */
        currencyFormatter: function(value) {
            var format = d3.format(",.02f");
            return '$' + format(value);
        },

        /** Format the number with thousand-groupings.
         * @example 2345.2234 becomes '2,345.2234'.
         * @memberof! insight.formatters
         * @param {Number} value The value to be formatted.
         * @returns {String} - The formatted value.
         */
        numberFormatter: function(value) {
            var format = d3.format(",.f");
            return format(value);
        },

        /** Format the date as a month and year.
         * @example new Date(2014,0,1) becomes 'Jan 2014'.
         * @memberof! insight.formatters
         * @param {Date} date The date to be formatted.
         * @returns {String} - The date formatted as a string.
         */
        dateFormatter: function(date) {
            var format = d3.time.format("%b %Y");
            return format(date);
        },

        /** Format the number as a percentage.
         * @example 0.15 becomes '15%'.
         * @memberof! insight.formatters
         * @param {Number} value The number to be formatted.
         * @returns {String} - The formatted value.
         */
        percentageFormatter: function(value) {
            var format = d3.format("%");
            return format(value);
        },

        /** A wrapper for d3.format().
         * See <a href="https://github.com/mbostock/d3/wiki/Formatting#d3_format">D3 API reference</a> for more information.
         * @memberof! insight.formatters
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
insight.utils = (function() {

    var exports = {};

    // Private functions -----------------------------------------------------------------------------------------

    /*
     * This recursive function takes two values a and b, a list of sort objects [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}] and an index of the current function being used to sort.
     * It returns a ordering value for a and b, as per the normal Javascript sorting rules https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @memberof! insight.utils
     * @returns {Integer} sortResult - if a > b then the result = 1, -1 if a < b and 0 if a == b.
     * @param {Object} a - Description
     * @param {Object} b - Description
     * @param {Object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
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
     * @returns {Boolean} return - is the object an array
     * @param {Object} input - The object to check
     */
    exports.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /*
     * Checks if an object is an function or not
     * @returns {Boolean} return - is the object a function
     * @param {Object} input - The object to check
     */
    exports.isFunction = function(obj) {
        return obj instanceof Function;
    };

    /*
     * Builds the CSS selector used to return chart items that are not selected (and not axes)
     * @returns {String} cssSelector - CSS selector for unselected chart items
     */
    exports.highlightSelector = function() {

        var notSelected = ':not(.selected)';
        var selector = '.' + insight.constants.BarClass + notSelected +
            ',.' + insight.constants.Bubble + notSelected;

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
     * @memberof! insight.utils
     * @param {Object[]} array - The array to check
     * @param {Object} value - The value to check for
     * @returns {Boolean} - True if the provided array contains the provided value
     */
    exports.arrayContains = function(array, value) {
        return array.indexOf(value) !== -1;
    };

    /*
     * Checks if the two arrays are identical
     * @memberof! insight.utils
     * @param {Object[]} baseArray The first array to compare for equality
     * @param {Object} compareArray The second array to compare for equality
     * @returns {Boolean} - True if the arrays contain the same objects.
     */
    exports.arrayEquals = function(baseArray, compareArray) {
        if (baseArray.length !== compareArray.length) {
            return false;
        }

        for (var i = 0; i < baseArray.length; i++) {
            if (baseArray[i].valueOf() !== compareArray[i].valueOf()) {
                return false;
            }
        }

        return true;
    };

    /*
     * Adds a value to an array, only if it doesn't already belong to the array.
     * @memberof! insight.utils
     * @param {Object[]} array - The array to insert into
     * @param {Object} value - The value to insert
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
     * @returns {String} return - A class name to identify this point and any other points taking the same value in other charts.
     * @param {Object} d - The input point
     */
    exports.keySelector = function(d) {

        var result = '';

        if (d) {
            var str = d.toString();
            result = 'in_' + exports.alphaNumericString(str);
        }

        return result;
    };

    /**
     * Takes a string, and replaces all non-alphanumeric characters with underscores.
     * @memberof! insight.utils
     * @param {String} string The string to strip non-alphanumeric characters from.
     * @returns {String} - The stripped version of the input string.
     */
    exports.alphaNumericString = function(string) {
        return string.replace(/[^A-Z0-9]/ig, '_');
    };

    /**
     * Returns the elements in the provided array where the given parameter matches a specific value
     * @param {Object[]} array - The input array to check
     * @param {String} propertyName - The name of the property to match
     * @param {String} value - The value to match
     * @returns {Object[]} - The matching elements
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
     * @param {Object[]} array - The input array to check
     * @param {String} propertyName - The name of the property to match
     * @param {String} value - The value to match
     * @returns {Object[]} - The matching elements
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

        if (!insight.utils.isArray(array) || array.length === 0) {
            return undefined;
        }

        return array.slice(array.length - 1)[0];
    };

    /**
     * Takes two objects and returns the union, with priority given to the first parameter in the event of clashes.
     * This bias is used for scenarios where user defined CSS properties must not override default values.
     * @returns {Object} union - a shallow copy representing the union between the provided objects
     * @param {Object} base - The base object to have priority in the union operation.
     * @param {Object} extend - The object to extend from, adding any additional properties and values defined in this parameter.
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
     * @returns {Object[]} sortedArray - The sorted array
     * @param {Object[]} data - The array to sort.  It will be sorted in place (as per Javascript sort standard behaviour) and returned at the end.
     * @param {Object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
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
     * @returns {Object} return - A bounding box object {nw: ..., n: ..., ne: ..., e: ..., se: ..., s: ..., sw: ..., w: ...}
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
     * @constructor
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

        invalidDataProviderOrArrayParameterException: 'Expects insight.DataProvider or an object array parameter.',

        invalidFunctionParameterException: 'Expects function parameter.',

        nonNumericalPairsException: 'Expect all values used to be numeric. At least one invalid pair of values was found, see the data for the details of all invalid pairs.',

        unequalLengthArraysException: 'Expects both arrays to have equal length.',

        nonPositiveTickFrequencyException: 'Tick frequency must be a positive non-zero value'
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
         * Eg. 'value.Revenue.sum', which cannot be indexed directly in Javascript.
         * @returns {Function} - True if the provided array contains the provided value
         * @example // Creates a forenameAccessor function
         * var anObject = {
         *     name: {
         *         forename: 'Bob'
         *     }
         * };

         * var forenameAccessor = insight.utils.createPropertyAccessor('name.forename');

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
;(function(insight) {

    /**
     * Module for calculating correlation coefficients on pairs of values.
     * @namespace insight.correlation
     */
    insight.correlation = function() {};

    /**
     * Calculates the pearson correlation coefficient for two arrays of numbers.
     * The two arrays must be equal in length and must only contain numbers.
     * @param {Array<Number>} x The x values
     * @param {Array<Number>} y The y values
     * @param {Object} [errorContainer] An object that will contain
     * information about any errors that were encountered with the operation.
     * @returns {Number} - The pearson correlation coefficient for two arrays of numbers
     */
    insight.correlation.fromValues = function(x, y, errorContainer) {

        if (!(errorContainer instanceof insight.ErrorContainer)) {
            errorContainer = new insight.ErrorContainer();
        }

        if (!insight.utils.isArray(x) || !insight.utils.isArray(y)) {

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
     * @param {insight.DataProvider|Object[]} dataset The insight.DataProvider or array to calculate correlation coefficients for.
     * @param {Function} xFunction A function that will return a value from one element in the dataset.
     * The value that the function returns will be used in the correlation calculation.
     * @param {Function} yFunction A function that will return a value from one element in the dataset.
     * The value that the function returns will be used in the correlation calculation.
     * @param {Object} [errorContainer] An object that will contain
     * information about any errors that were encountered with the operation.
     * @returns {Number} - The pearson correlation coefficient for the given property pair in the dataset.
     */
    insight.correlation.fromDataProvider = function(dataset, xFunction, yFunction, errorContainer) {
        if (!(errorContainer instanceof insight.ErrorContainer)) {
            errorContainer = new insight.ErrorContainer();
        }

        var dataArray = getArray(dataset);

        if (!insight.utils.isArray(dataArray)) {

            errorContainer.setError(insight.ErrorMessages.invalidDataProviderOrArrayParameterException);

            return undefined;

        }

        if (!insight.utils.isFunction(xFunction) || !insight.utils.isFunction(yFunction)) {

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
     * If the object is an insight.DataProvider then its data is returned, otherwise the array id returned directly.
     */
    function getArray(obj) {

        if (obj instanceof insight.DataProvider) {
            return obj.extractData();
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
        var result = insight.utils.isNumber(element.x) && insight.utils.isNumber(element.y);

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

})(insight);
;(function(insight) {
    /**
     * DataProvider is the base container for data to be used within InsightJS. It provides a consistent approach to
     * sorting and filtering object arrays.
     * @constructor
     * @param {Object[]} collection - The data to be processed and represented by this DataProvider.
     */
    insight.DataProvider = function DataProvider(collection) {

        // Private variables
        var self = this,
            orderFunction = null,
            filterFunction = null;

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Returns an object array used as the starting point before sorting and filtering is applied.
         * @virtual
         * @memberof! insight.DataProvider
         * @instance
         * @returns {Object[]}
         * */
        self.rawData = function() {
            return collection.slice(0);
        };

        /**
         * @memberof! insight.DataProvider
         * @instance
         * @param {Function} [orderFunc] If provided then the data will be ordered using this function.
         * @param {Integer} [top] If provided then the number of objects returned will be limited to the top N.
         * @returns {Object[]} - An object array containing the data for this DataProvider.
         */
        self.extractData = function(orderFunc, top) {

            // Javascript less-than-or-equal does Number type coercion so treats null as 0
            if (top != null && top <= 0) {
                return [];
            }

            var dataArray = self.rawData();

            orderFunc = orderFunc || self.orderingFunction();

            if (self.filterFunction()) {
                dataArray = dataArray.filter(self.filterFunction());
            }

            if (orderFunc) {
                dataArray = dataArray.sort(orderFunc);
            }

            if (top) {
                dataArray = dataArray.slice(0, top);
            }

            return dataArray;
        };

        /**
         * Gets the function used to order the data source values
         * @memberof! insight.DataProvider
         * @instance
         * @returns {Function} - The current ordering function
         *
         * @also
         *
         * Sets the function used to order the data source values
         * @memberof! insight.DataProvider
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

        /**
         * The function to use to filter an object from the data source.
         * The function should return a boolean where false means the object is not included in the data source.
         * @memberof! insight.DataProvider
         * @instance
         * @returns {Function} - The function to use to filter an object from the data source.
         *
         * @also
         *
         * Sets the function to use to filter an object from the data source.
         * The function should return a boolean where false means the object is not included in the data source.
         * @memberof! insight.DataProvider
         * @instance
         * @param {Function} filterFunc The new function to use to filter an object from the data source.
         * @returns {this}
         */
        self.filterFunction = function(filterFunc) {

            if (!arguments.length) {
                return filterFunction;
            }

            filterFunction = filterFunc;

            return self;
        };

    };

})(insight);
;(function(insight) {
    /**
     * DataSet allows [insight.Groupings]{@link insight.Grouping} to be easily created from an object array.
     * @constructor
     * @extends insight.DataProvider
     * @param {Object[]} collection - The data to be processed and represented by this DataSet.
     */
    insight.DataSet = function DataSet(data) {

        insight.DataProvider.call(this, data);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        /**
         * Creates an {@link insight.Grouping} for this data set.
         * @memberof! insight.DataSet
         * @instance
         * @param {String} name The name to give to the grouping.
         * @param {Function} groupFunction A function that returns a property value to use for grouping data.
         * @param {Boolean} oneToMany A one-to-many grouping should be used if the groupFunction returns an
         * array property.
         * @returns {insight.Grouping} - A grouping which allows aggregation of a data set into groups for analysis.
         * @example var dataSet = new insight.DataSet([
         *    { forename : 'Alan', height : 133, gender : 'Male' },
         *    { forename : 'Bob', height : 169, gender : 'Male' },
         *    { forename : 'Mary', height : 151, gender : 'Female' },
         *    { forename : 'Sam', height : 160, gender : 'Female' },
         *    { forename : 'Steve', height : 172, gender : 'Male' },
         *    { forename : 'Harold', height : 160, gender : 'Male' }
         *  ]);
         *
         *  // Group on a the gender property and take the mean height.
         *  var genderGrouping = dataSet.group('gender', function(d) { return d.gender; })
         *                              .mean(['height']);
         *
         *  // The mean height by gender can now be included in a chart using the following value function
         *  var averageHeightValue = function(d) {
         *      return d.value.height.mean;
         *  };
         *
         * @example var dataSet = new insight.DataSet([
         *    { Forename : 'Alan', Interests : [ 'Triathlon', 'Music', 'Mountain Biking' ] },
         *    { Forename : 'Bob', Interests : [ 'Ballet', 'Music', 'Climbing' ] },
         *    { Forename : 'Mary', Interests : [ 'Triathlon', 'Music', 'Kayaking' ] }
         *  ]);
         *
         *  // Group on an array / one-to-many value, to aggregate the count of interests.
         *  var interestsGrouping = dataSet.group('Interests', function(d) { return d.Interests; }, true)
         *    .count(['Interests']);
         */
        self.group = function(name, groupFunction, oneToMany) {

            var arrayData = self.extractData();

            self.crossfilterData = self.crossfilterData || crossfilter(arrayData);

            var dim = new insight.Dimension(name, self.crossfilterData, groupFunction, oneToMany);

            var group = new insight.Grouping(dim);

            return group;
        };

    };

    insight.DataSet.prototype = Object.create(insight.DataProvider.prototype);
    insight.DataSet.prototype.constructor = insight.DataSet;

})(insight);
;(function(insight) {
    /**
     * A Dimension organizes a dataset along a particular property, or variation of a property.
     * Defining a dimension with the following sliceFunction:<pre><code>function(d){ return d.Surname; }</code></pre>
     * will slice a dataset by the distinct values of the Surname property.
     * @constructor
     * @param {String} name - The short name used to identify this dimension, and any linked dimensions
     * sharing the same name
     * @param {Object} crossfilterData - The [crossfilter]{@link https://github.com/square/crossfilter/wiki/API-Reference#crossfilter}
     * object to create the Dimension on.
     * @param {Function} sliceFunction - The function used to categorize points within the dimension.
     * @param {Boolean} oneToMany - Whether or not this dimension represents a collection of possible values in each item.
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
                return insight.utils.arrayContains(d, filterValue);
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
         * @param {Object} filteredValue - The value to create a crossfilter filter function for.
         * @returns {Function} - A function that a crossfilterdimension.filter() operation can use to map-reduce crossfilter aggregations.
         */
        self.createFilterFunction = function(filteredValue) {

            // create the appropriate type of filter function for this Dimension
            var filterFunc = self.oneToMany ? oneToManyFilterFunction(filteredValue) : filterFunction(filteredValue);

            return {
                name: filteredValue,
                filterFunction: filterFunc
            };
        };

        self.applyFilter = function(filterFunc) {

            var nameProperty = 'name';

            var filterExists = insight.utils.takeWhere(self.filters, nameProperty, filterFunc.name).length;

            //if the dimension is already filtered by this value, toggle (remove) the filter
            if (filterExists) {
                insight.utils.removeWhere(self.filters, nameProperty, filterFunc.name);

            } else {
                // add the provided filter to the list for this dimension

                self.filters.push(filterFunc);
            }

            // reset this dimension if no filters exist, else apply the filter to the dataset.
            if (self.filters.length === 0) {
                self.crossfilterDimension.filterAll();

            } else {
                self.crossfilterDimension.filter(function(d) {

                    // apply all of the filters on this dimension to the current value, returning an array of
                    // true/false values (which filters does it satisfy)
                    var vals = self.filters
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

        };

        self.clearFilters = function() {

            self.filters = [];
            self.crossfilterDimension.filterAll();

        };

    };

})(insight);
;(function(insight) {
    /**
     * A Grouping is used to reduce the items in a data set into groups so aggregate values can be calculated for each
     * group.  The recommended way to create a grouping is to use the
     * [insight.DataSet.group]{@link insight.DataSet#self.group} function.
     * Calling functions such as [sum]{@link insight.Grouping#self.sum} and [mean]{@link insight.Grouping#self.mean} on
     * a Grouping will allow aggregate values to be extracted for each group in a data set.
     * Calling [rawData]{@link insight.Grouping#self.rawData} on a Grouping will result in an object array which
     * can be used for analysis or as the data provider for a [Series]{@link insight.Series} or
     * [Table]{@link insight.Table}.
     * @constructor
     * @extends insight.DataProvider
     * @param {insight.Dimension} dimension - The dimension to group
     */
    insight.Grouping = function Grouping(dimension) {

        insight.DataProvider.call(this);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            sumProperties = [],
            countProperties = [],
            cumulativeProperties = [],
            meanProperties = [],
            correlationPairProperties = [],
            allCorrelationProperties = [],
            ordered = false;

        // Internal variables -----------------------------------------------------------------------------------------

        self.dimension = dimension;

        // Private functions ------------------------------------------------------------------------------------------

        // The default post aggregation step is blank, and can be overriden by users if they want to calculate
        // additional values with this Grouping
        function postAggregation(grouping) {

        }

        /*
         * Takes an object and a property name in the form of a string, traversing the object until it finds a property
         * with that name and returning a wrapped object with the immediate parent of the found property and the
         * property's value.
         * @param {Object} - The object to search
         * @param {String} propertyName - A string of the property to search, can include sub-properties using a dot
         * notation. Eg. 'value.Revenue.sum', which cannot be indexed directly in Javascript.
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
         * @param {Object} group - A dimensional slice of a Grouping {key: 'X', value : {}}
         */
        function calculateMeans(group) {


            for (var i = 0, len = meanProperties.length; i < len; i++) {

                var propertyName = meanProperties[i];
                var propertyValue = group.value[propertyName];
                var mean = propertyValue.sum / propertyValue.count;

                mean = insight.utils.isNumber(mean) && isFinite(mean) ? mean : undefined;

                group.value[propertyName].mean = mean;
            }
        }

        /*
         * Calculates running cumulative values for any properties defined in the cumulative() list.
         * @param {Object} group - The data group being added to the cumulative running totals list
         * @param {Object} totals - The map object of running totals for the defined properties
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
                            var groupData = insight.utils.takeWhere(globalData, 'key', self.dimension.aggregationFunction(addingData))[0].value;

                            // get the group mean from global data for this grouping
                            var groupMean = groupData[propertyName].mean;

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
                            xDeviation = insight.utils.lastElement(workings[xName].deviation),
                            yDeviation = insight.utils.lastElement(workings[yName].deviation),
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

            var data = self.extractData();

            data.forEach(function(d) {

                calculateMeans(d);

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
         * @returns {Object} group - The group entry for this slice of the aggregated dataset, modified by the addition of the data object
         * @param {Object} group - The group entry for this slice of the aggregated dataset, prior to adding the input data object
         * @param {Object} data - The object being added from the aggregated group.
         */
        function reduceAddToGroup(group, data) {

            group.count++;

            var propertyName,
                i,
                len;

            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    group[propertyName].sum += data[propertyName];
                    group[propertyName].count++;
                }
            }

            // Increment the counts of the different occurences of any properties defined.
            // E.g: if a property 'Country' can take multiple string values, this counts the occurences of each
            // distinct value the property takes
            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];

                var groupProperty = group[propertyName];

                if (data.hasOwnProperty(propertyName)) {

                    var propertyValue = data[propertyName];

                    // If this property holds multiple values, increment the counts for each one.
                    if (insight.utils.isArray(propertyValue)) {

                        for (var subIndex in propertyValue) {
                            var subVal = propertyValue[subIndex];
                            //Initialize or increment the count for this occurence of the property value
                            group[propertyName][subVal] = groupProperty.hasOwnProperty(subVal) ? groupProperty[subVal] + 1 : 1;
                            group[propertyName].totalCount++;
                        }
                    } else {
                        group[propertyName][propertyValue] = groupProperty.hasOwnProperty(propertyValue) ? groupProperty[propertyValue] + 1 : 1;
                        group[propertyName].totalCount++;
                    }
                }
            }

            return group;
        }

        /*
         * Called by the map reduce process on a DataSet when an input object is being filtered out of the group
         * @returns {Object} group - The group entry for this slice of the aggregated dataset, modified by the removal of the data object
         * @param {Object} group - The group entry for this slice of the aggregated dataset, prior to removing the input data object
         * @param {Object} data - The object being removed from the aggregated group.
         */
        function reduceRemoveFromGroup(group, data) {

            group.count--;

            var propertyName,
                i,
                len;

            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    group[propertyName].sum -= data[propertyName];
                    group[propertyName].count--;
                }
            }

            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];

                if (data.hasOwnProperty(propertyName)) {

                    var propertyValue = data[propertyName];

                    if (insight.utils.isArray(propertyValue)) {

                        for (var subIndex in propertyValue) {
                            var subVal = propertyValue[subIndex];
                            group[propertyName][subVal] = group[propertyName].hasOwnProperty(subVal) ? group[propertyName][subVal] - 1 : 0;
                            group[propertyName].totalCount--;
                        }

                    } else {
                        group[propertyName][propertyValue] = group[propertyName].hasOwnProperty(propertyValue) ? group[propertyName][propertyValue] - 1 : 0;
                        group[propertyName].totalCount--;
                    }
                }
            }

            return group;
        }

        /*
         * Called when a slice of an aggrgated DataSet is being initialized, creating initial values for certain properties
         * @returns {Object} return - The initialized slice of this aggreagted DataSet.  The returned object will be of the form {key: '
         Distinct Key ', value: {}}
         */
        function reduceInitializeGroup() {
            var group = {
                    count: 0
                },
                propertyName,
                i,
                len;


            for (i = 0, len = sumProperties.length; i < len; i++) {
                propertyName = sumProperties[i];

                group[propertyName] = group[propertyName] ? group[propertyName] : {};
                group[propertyName].sum = 0;
                group[propertyName].count = 0;
            }

            for (i = 0, len = countProperties.length; i < len; i++) {
                propertyName = countProperties[i];
                group[propertyName] = group[propertyName] ? group[propertyName] : {};
                group[propertyName].totalCount = 0;
            }

            return group;
        }

        /*
         * This aggregation method is tailored to dimensions that can hold multiple values (in an array), therefore they are counted differently.
         * For example: a property called supportedDevices : ['iPhone5 ', 'iPhone4 '] where the values inside the array are treated as dimensional slices
         * @returns {Object[]} return - the array of dimensional groupings resulting from this dimensional aggregation
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

            self.orderingFunction(function(a, b) {
                return b.value - a.value;
            });

            return data;
        }

        // Internal functions -----------------------------------------------------------------------------------------

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
         * @todo This should probably be run during the constructor? If not, lazily evaluated by extractData() if it hasn't been run already.
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
         * @returns {String[]} - The list of property names that will be summed
         *
         * @also
         *
         * Sets the list of property names that will be summed in this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {String[]} properties - An array of property names to be summed for slices in this Grouping.
         * @example var dataSet = new insight.DataSet([
         *   { forename: 'Alan', height: 160, gender: 'Male' },
         *   { forename: 'Bob', height: 169, gender: 'Male' },
         *   { forename: 'Mary', height: 151, gender: 'Female' },
         *   { forename: 'Sam', height: 160, gender: 'Female' },
         *   { forename: 'Steve', height: 172, gender: 'Male' },
         *   { forename: 'Harold', height: 160, gender: 'Male' }
         * ]);
         *
         * var totalHeightByGender = dataSet.group('gender', function (d) { return d.gender; })
         *                                  .sum(['height']);
         *
         * var groups = totalHeightByGender.rawData();
         *
         * // groups[1] now looks like this:
         * {
         *   "key": "Male",
         *   "value": {
         *     "count": 4,
         *     "height": {
         *       "sum": 661,
         *       "count": 4
         *     }
         *   }
         * }
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
                insight.utils.addToSet(allCorrelationProperties, properties[i][0]);
                insight.utils.addToSet(allCorrelationProperties, properties[i][1]);
            }

            // need mean for correlation
            meanProperties = insight.utils.arrayUnique(meanProperties.concat(allCorrelationProperties));

            // need sum for mean so set that too
            sumProperties = insight.utils.arrayUnique(sumProperties.concat(allCorrelationProperties));

            return self;
        };

        /**
         * Returns the list of properties that will be cumulatively summed over this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {String[]} - The list of property names that will be cumulatively summed
         *
         * @also
         *
         * Sets the list of properties that will be cumulatively summed over this Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {String[]} properties - An array of property names to be cumulatively summed over slices in this Grouping.
         * @example var dataSet = new insight.DataSet([
         *   { forename: 'Alan', height: 160, gender: 'Male' },
         *   { forename: 'Bob', height: 169, gender: 'Male' },
         *   { forename: 'Mary', height: 151, gender: 'Female' },
         *   { forename: 'Sam', height: 160, gender: 'Female' },
         *   { forename: 'Steve', height: 172, gender: 'Male' },
         *   { forename: 'Harold', height: 160, gender: 'Male' }
         * ]);
         *
         * var cumulativeHeightByGender = dataSet.group('gender', function (d) { return d.gender; })
         *                                       .sum(['height'])
         *                                       .cumulative(['height.sum']);
         *
         * var groups = cumulativeHeightByGender.rawData();
         *
         * // groups now looks like this:
         * [
         *   {
         *     "key": "Female",
         *     "value": {
         *       "count": 2,
         *       "height": {
         *         "sum": 311,
         *         "count": 2,
         *         "sumCumulative": 311
         *       }
         *     }
         *   },
         *   {
         *     "key": "Male",
         *     "value": {
         *       "count": 4,
         *       "height": {
         *         "sum": 661,
         *         "count": 4,
         *         "sumCumulative": 972
         *       }
         *     }
         *   }
         * ]
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
         * @returns {String[]} - The list of property names whose values will be counted
         *
         * @also
         *
         * Sets the array of properties whose distinct value occurences will be counted during the reduction of this
         * Grouping
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {String[]} properties - An array of properties whose distinct value occurences will be counted during
         * the reduction of this Grouping
         * @example var dataSet = new insight.DataSet([
         *   { forename: 'Alan', height: 160, gender: 'Male' },
         *   { forename: 'Bob', height: 169, gender: 'Male' },
         *   { forename: 'Mary', height: 151, gender: 'Female' },
         *   { forename: 'Sam', height: 160, gender: 'Female' },
         *   { forename: 'Steve', height: 172, gender: 'Male' },
         *   { forename: 'Harold', height: 160, gender: 'Male' }
         * ]);
         *
         * var countHeightsByGender = dataSet.group('gender', function (d) { return d.gender; })
         *                                   .count(['height']);
         *
         * var groups = countHeightsByGender.rawData();
         *
         * // groups[1] now looks like this:
         * {
         *   "key": "Male",
         *     "value": {
         *       "count": 4,
         *       "height": {
         *         "160": 2,
         *         "169": 1,
         *         "172": 1,
         *         "totalCount": 4
         *       }
         *     }
         *  }
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
         * @returns {String[]} - The list of property names whose mean will be calculated after the map reduce
         * of this Grouping.
         *
         * @also
         *
         * Sets the array of properties whose mean will be calculated after the map reduce of this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {String[]} properties - An array of properties whose mean will be calculated after the map reduce
         * of this Grouping.
         * @example var dataSet = new insight.DataSet([
         *   { forename: 'Alan', height: 160, gender: 'Male' },
         *   { forename: 'Bob', height: 169, gender: 'Male' },
         *   { forename: 'Mary', height: 151, gender: 'Female' },
         *   { forename: 'Sam', height: 160, gender: 'Female' },
         *   { forename: 'Steve', height: 172, gender: 'Male' },
         *   { forename: 'Harold', height: 160, gender: 'Male' }
         * ]);
         *
         * var meanHeightByGender = dataSet.group('gender', function (d) { return d.gender; })
         *                                 .mean(['height']);
         *
         * var groups = meanHeightByGender.rawData();
         *
         * // groups[1] now looks like this:
         * {
         *   "key": "Male",
         *   "value": {
         *     "count": 4,
         *     "height": {
         *       "sum": 661,
         *       "count": 4,
         *       "mean": 165.25
         *     }
         *   }
         * }
         */
        self.mean = function(properties) {
            if (!arguments.length) {
                return meanProperties;
            }
            meanProperties = properties;

            sumProperties = insight.utils.arrayUnique(sumProperties.concat(meanProperties));

            return self;
        };

        /**
         * Overrides {@link insight.DataProvider.rawData} by using
         * [crossfilter]{@link http://square.github.io/crossfilter/} to create an object array containing one object
         * per group in a data set.
         * @virtual
         * @memberof! insight.Grouping
         * @instance
         * @returns {Object[]} - An object array containing one object per group in the data set.
         * @example var dataSet = new insight.DataSet([
         *   { forename: 'Alan', height: 133, gender: 'Male' },
         *   { forename: 'Bob', height: 169, gender: 'Male' },
         *   { forename: 'Mary', height: 151, gender: 'Female' },
         *   { forename: 'Sam', height: 160, gender: 'Female' },
         *   { forename: 'Steve', height: 172, gender: 'Male' },
         *   { forename: 'Harold', height: 160, gender: 'Male' }
         * ]);
         *
         * // Group on gender and calculate mean height for each gender
         * var genderGrouping = dataSet.group('gender', function (d) { return d.gender; })
         *                             .mean(['height']);
         *
         * var groups = genderGrouping.rawData();
         *
         * // groups[0] now looks like this:
         * // {
         * //   "key": "Female",
         * //   "value": {
         * //     "count": 2,
         * //     "height": {
         * //       "sum": 311,
         * //       "count": 2,
         * //       "mean": 155.5
         * //     }
         * //   }
         *  }
         * @example var dataSet = new insight.DataSet([
         *   { Forename : 'Gary', Interests : [ 'Triathlon', 'Music', 'Mountain Biking' ] },
         *   { Forename : 'Paul', Interests : [ 'Ballet', 'Music', 'Climbing' ] },
         *   { Forename : 'George', Interests : [ 'Triathlon', 'Music', 'Kayaking' ] }
         * ]);
         *
         * // Group on an array / one-to-many value, to aggregate the count of interests.
         * var interestsGrouping = dataSet.group('Interests', function(d) { return d.Interests; }, true)
         *                                .count(['Interests']);
         *
         * var groups = interestsGrouping.extractData();
         *
         * // groups[0] now looks like this:
         * // {
         * //   "key": "Triathlon",
         * //   "value": 2
         * // }
         * */
        self.rawData = function() {

            var data;

            if (!self.data) {
                self.initialize();
            }

            if (self.dimension.oneToMany) {
                data = self.data.value().values;
            } else {
                data = self.data.all();
            }

            return data.slice(0);

        };

        /**
         * Gets the function that will run after any aggregation has been performed on this Grouping.
         * This is an empty function by default, and can be overriden.
         * @instance
         * @memberof! insight.Grouping
         * @returns {Function} - The function that will run after aggregation of this Grouping.
         * @also
         * Sets the function that will run after any aggregation has been performed on this Grouping.
         * @instance
         * @memberof! insight.Grouping
         * @returns {this}
         * @param {Function} postAggregationFunc - A user defined function of the form function(grouping), that the Grouping will run post aggregation.
         */
        self.postAggregation = function(postAggregationFunc) {
            if (!arguments.length) {
                return postAggregation;
            }
            postAggregation = postAggregationFunc;
            return self;
        };

    };

    insight.Grouping.prototype = Object.create(insight.DataProvider.prototype);
    insight.Grouping.prototype.constructor = insight.Grouping;

})(insight);
;(function(insight) {

    /**
     * The Theme base class provides the basic structure of a theme, to allow the Chart, Series or Axis to extract values
     * from it to style themselves.
     *
     * All values are `undefined`, being properly set in the subclasses of Theme.
     * @constructor
     */
    insight.Theme = function Theme() {

        var self = this;

        /**
         * The styles to apply to an axis.
         * @memberof! insight.Theme
         * @instance
         * @type {Object}
         *
         * @property {Integer}  gridlineWidth   The width of an axis grid line, in pixels.
         * @property {Color}    gridlineColor   The color of an axis grid line.
         * @property {Boolean}  shouldShowGridlines   Whether axis grid lines should be displayed or not.
         *
         * @property {Integer}  tickSize        The length of axis ticks, in pixels.
         * @property {Integer}  tickPadding     The distance between the end of axis tick marks and tick labels, in pixels.
         *
         * @property {Integer}  tickLineWidth   The width of the tick marks, in pixels.
         * @property {Color}  tickLineColor   The color of the tick marks.
         *
         * @property {Integer}  axisLineWidth   The width of the axis line, in pixels.
         * @property {Color}  axisLineColor   The color of an axis line.
         *
         * @property {Font}     tickLabelFont   The font to use for axis tick labels.
         * @property {Color}    tickLabelColor  The color to use for axis tick labels.
         *
         * @property {Font}     axisTitleFont   The font to use for an axis title.
         * @property {Color}    axisTitleColor  The color to use for an axis title.
         */
        self.axisStyle = {

            gridlineWidth: undefined,
            gridlineColor: undefined,
            shouldShowGridlines: undefined,

            tickSize: undefined,
            tickPadding: undefined,

            tickLineWidth: undefined,
            tickLineColor: undefined,

            axisLineWidth: undefined,
            axisLineColor: undefined,

            tickLabelFont: undefined,
            tickLabelColor: undefined,

            axisTitleFont: undefined,
            axisTitleColor: undefined
        };

        /**
         * The styles to apply to a chart.
         * @memberof! insight.Theme
         * @instance
         * @type {Object}
         *
         * @property {Array<Color>} seriesPalette   The ordered array of colors to use for each successive series within a chart.
         * @property {Color}        fillColor       The color to use for the chart's background.
         * @property {Font}         titleFont       The font to use for the chart's title.
         * @property {Color}        titleColor      The color to use for the chart's title.
         */
        self.chartStyle = {
            seriesPalette: undefined,
            fillColor: undefined
        };

        /**
         * The styles to apply to a series
         * @memberof! insight.Theme
         * @instance
         * @type {Object}
         *
         * @property {Boolean} shouldShowPoints Whether points should be shown on a series, if applicable to the series.
         * @property {LineStyle} lineStyle The style of line to use for a series, if applicable to the series.
         */
        self.seriesStyle = {
            shouldShowPoints: undefined,
            lineStyle: undefined
        };

        /**
         * The styles to apply to a table
         * @memberof! insight.Theme
         * @instance
         * @type {Object}
         *
         * @property {Font}     headerFont                  The font to use for a table column header.
         * @property {Color}    headerTextColor             The text color to use for a table column header.
         *
         * @property {Font}     rowHeaderFont               The font to use for a table row header.
         * @property {Color}    rowHeaderTextColor          The text color to use for a table row header.
         *
         * @property {Font}     cellFont                    The font to use for a table cell.
         * @property {Color}    cellTextColor               The text color to use for a table cell.
         *
         * @property {Border}   headerDivider               The CSS border style to use for the divider between the table headers and body.
         *
         * @property {Color}    headerBackgroundColor       The background color for the header row on the table.
         * @property {Color}    rowBackgroundColor          The background color for rows on the table.
         * @property {Color}    rowAlternateBackgroundColor The background color for every other row on the table.
         */
        self.tableStyle = {
            headerFont: undefined,
            headerTextColor: undefined,
            rowHeaderFont: undefined,
            rowHeaderTextColor: undefined,
            cellFont: undefined,
            cellTextColor: undefined,
            headerDivider: undefined,
            headerBackgroundColor: undefined,
            rowBackgroundColor: undefined,
            rowAlternateBackgroundColor: undefined
        };
    };

})(insight);
;(function(insight) {

    /**
     * A Theme for drawing on a lightly coloured background. Sets a number of the properties defined in the Theme base
     * class.
     * @constructor
     */
    insight.LightTheme = function LightTheme() {

        var self = this;

        insight.Theme.apply(self);

        //Configure for axis
        self.axisStyle.gridlineWidth = 1;
        self.axisStyle.gridlineColor = '#888';
        self.axisStyle.shouldShowGridlines = false;

        self.axisStyle.tickSize = 3;
        self.axisStyle.tickPadding = 10;

        self.axisStyle.axisLineWidth = 1;
        self.axisStyle.axisLineColor = '#777';
        self.axisStyle.tickLineWidth = 1;
        self.axisStyle.tickLineColor = '#777';
        self.axisStyle.tickLabelFont = '11pt Helvetica Neue';
        self.axisStyle.tickLabelColor = '#777';
        self.axisStyle.axisTitleFont = '12pt Helvetica Neue';
        self.axisStyle.axisTitleColor = '#777';

        //Configure for chart
        self.chartStyle.seriesPalette = ['#3182bd', '#c6dbed', '#6baed6', '#08519c', '#9ecae1'];
        self.chartStyle.fillColor = '#fff';

        //Configure series
        self.seriesStyle.shouldShowPoints = false;
        self.seriesStyle.lineStyle = 'linear';
        self.seriesStyle.pointRadius = 3;

        //Configure table
        self.tableStyle.headerFont = 'bold 14pt Helvetica Neue';
        self.tableStyle.headerTextColor = '#084594';
        self.tableStyle.rowHeaderFont = 'bold 12pt Helvetica Neue';
        self.tableStyle.rowHeaderTextColor = '#2171b5';
        self.tableStyle.cellFont = '12pt Helvetica Neue';
        self.tableStyle.cellTextColor = '#888';

        self.tableStyle.headerDivider = '1px solid #084594';

        self.tableStyle.headerBackgroundColor = 'white';
        self.tableStyle.rowBackgroundColor = '#c6dbef';
        self.tableStyle.rowAlternateBackgroundColor = 'white';
    };

    insight.LightTheme.prototype = Object.create(insight.Theme.prototype);
    insight.LightTheme.prototype.constructor = insight.LightTheme;

    //Set LightTheme as the default theme
    insight.defaultTheme = new insight.LightTheme();

})(insight);
;(function(insight) {

    /**
     * A Theme for drawing on a white background, uses warm colors with white as a base.
     * Sets a number of the properties defined in the Theme base class.
     * @constructor
     */
    insight.WarmTheme = function WarmTheme() {

        var self = this;

        insight.Theme.apply(self);

        //Configure for axis
        self.axisStyle.gridlineWidth = 2;
        self.axisStyle.gridlineColor = '#081717';
        self.axisStyle.shouldShowGridlines = false;

        self.axisStyle.tickSize = 2;
        self.axisStyle.tickPadding = 10;

        self.axisStyle.axisLineWidth = 2;
        self.axisStyle.axisLineColor = '#081717';
        self.axisStyle.tickLineWidth = 2;
        self.axisStyle.tickLineColor = '#081717';
        self.axisStyle.tickLabelFont = '11pt Helvetica';
        self.axisStyle.tickLabelColor = '#081717';
        self.axisStyle.axisTitleFont = '12pt Helvetica';
        self.axisStyle.axisTitleColor = '#081717';

        //Configure for chart
        self.chartStyle.seriesPalette = ['#A60303', '#FFAD00', '#FF2F00', '#BD7217', '#873300'];
        self.chartStyle.fillColor = '#fff';

        //Configure series
        self.seriesStyle.shouldShowPoints = true;
        self.seriesStyle.lineStyle = 'linear';
        self.seriesStyle.pointRadius = 3;

        //Configure table
        self.tableStyle.headerFont = 'bold 12pt Helvetica';
        self.tableStyle.headerTextColor = '#081717';
        self.tableStyle.rowHeaderFont = 'bold 11pt Helvetica';
        self.tableStyle.rowHeaderTextColor = '#081717';
        self.tableStyle.cellFont = '11pt Helvetica';
        self.tableStyle.cellTextColor = '#081717';

        self.tableStyle.headerDivider = '2px solid #A60303';

        self.tableStyle.headerBackgroundColor = 'white';
        self.tableStyle.rowBackgroundColor = '#FF811E';
        self.tableStyle.rowAlternateBackgroundColor = '#FFE525';
    };

    insight.WarmTheme.prototype = Object.create(insight.Theme.prototype);
    insight.WarmTheme.prototype.constructor = insight.WarmTheme;

})(insight);
;(function(insight) {

    /**
     * The ChartGroup class is a container for Charts and Tables, linking them together
     * and coordinating cross chart filtering and styling.
     * @constructor
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
                    item.toggleHighlight(dimensionSelector);
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

                    series.clickEvent = self.filterByGrouping;

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
                insight.utils.addToSet(self.groupings, dataset);
                insight.utils.addToSet(self.dimensions, dataset.dimension);
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
            table.clickEvent = self.filterByGrouping;

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

                    var alreadyListening = insight.utils.arrayContains(listeningObjects, widget);

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
         * @param {Object} widget An insight.Table or insight.Chart
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

        /**
         * Filters the grouping with the ChartGroup so the given value will be highlighted by any chart or table that
         * uses the grouping, and any charts or tables that use different groupings will be crossfiltered to only
         * include data that matches the given group value.
         * @memberof! insight.ChartGroup
         * @instance
         * @param {insight.Grouping} grouping - The grouping being filtered.
         * @param {String} value - The value that the grouping is being filtered by.
         */
        self.filterByGrouping = function(grouping, value) {

            var dimensionSelector = insight.utils.keySelector(value);
            var groupDimension = grouping.dimension;

            // send events to any charts or tables also using this dimension, as they will need to update their
            // styles to reflect the selection
            notifyListeners(groupDimension.name, dimensionSelector);

            var filterFunc = groupDimension.createFilterFunction(value);
            var nameProperty = 'name';

            // get the list of any dimensions matching the one that is being filtered
            var dims = insight.utils.takeWhere(self.dimensions, nameProperty, groupDimension.name);

            // get the list of matching dimensions that are already filtered
            var activeDim = insight.utils.takeWhere(self.filteredDimensions, nameProperty, groupDimension.name);

            // add the new filter to the list of active filters if it's not already active
            if (!activeDim.length) {
                self.filteredDimensions.push(groupDimension);
            }

            // loop through the matching dimensions to filter them all
            dims.forEach(function(dim) {
                dim.applyFilter(filterFunc);

                if (dim.filters.length === 0) {
                    insight.utils.removeItemFromArray(self.filteredDimensions, dim);
                }
            });

            // the above filtering will have triggered a re-aggregation of the groupings.  We must manually
            // initiate the recalculation of the groupings for any post aggregation calculations
            self.groupings.forEach(function(group) {
                group.recalculate();
            });

            self.draw();

            self.filterChanged();

        };

        /**
         * Removes all filtering from the ChartGroup so charts and tables will display all data and all highlighting
         * will be reset.
         * @memberof! insight.ChartGroup
         * @instance
         */
        self.clearFilters = function() {

            self.filteredDimensions = [];

            self.dimensions.forEach(function(dim) {
                dim.clearFilters();
            });

            // the above filtering will have triggered a re-aggregation of the groupings.  We must manually
            // initiate the recalculation of the groupings for any post aggregation calculations
            self.groupings.forEach(function(group) {
                group.recalculate();
            });

            self.charts.concat(self.tables).forEach(function(item) {
                item.clearHighlight();
            });

            self.draw();

            self.filterChanged();

        };

        /**
         * This function is called when the chart's groupings are filtered or unfiltered.
         * It can be overridden by clients that wish to be notified when the chart's filtering has changed.
         * @memberof! insight.ChartGroup
         * @instance
         */
        self.filterChanged = function() {};

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
     * @constructor insight.Chart
     * @param {String} name - A uniquely identifying name for this chart
     * @param {String} element - The css selector identifying the div container that the chart will be drawn in.
     * @example var myChart = new insight.Chart('My Chart', '#chart-div');
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
            shouldAutoMargin = true,
            legend = null,
            zoomInitialized = false,
            initialized = false,
            zoomAxis = null,
            highlightSelector = insight.utils.highlightSelector(),
            seriesPalette = [];

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
                .attr('class', insight.constants.ContainerClass)
                .style('position', 'relative')
                .style('display', 'inline-block');

            self.chartSVG = self.container
                .append('svg')
                .attr('class', insight.constants.ChartSVG);

            self.plotArea = self.chartSVG.append('g')
                .attr('class', insight.constants.PlotArea);

            // create the empty text element used by the text measuring process
            self.axisMeasurer = self.plotArea
                .append('text')
                .attr('class', insight.constants.AxisTextClass);

            self.labelMeasurer = self.container
                .append('text')
                .attr('class', insight.constants.AxisLabelClass);

            self.addClipPath();

            self.initializeTooltip(self.container.node());
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
         * @returns {Number[]} - An array with two items, for the width and height of the axis, respectively.
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

            return insight.utils.safeString(self.name) + 'clip';
        };

        /*
         * Takes a CSS selector and applies classes to chart elements to show them as selected or not.
         * in response to a filtering event.
         * and something else is.
         * @memberof! insight.Chart
         * @param {String} selector - a CSS selector matching a slice of a dimension. eg. an entry in a grouping by Country
         would be 'in_England', which would match that dimensional value in any charts.
         */
        self.toggleHighlight = function(selector) {
            var clicked = self.plotArea.selectAll('.' + selector);
            var alreadySelected = insight.utils.arrayContains(self.selectedItems, selector);

            if (alreadySelected) {
                clicked.classed('selected', false);
                insight.utils.removeItemFromArray(self.selectedItems, selector);
            } else {
                clicked.classed('selected', true)
                    .classed('notselected', false);
                self.selectedItems.push(selector);
            }
        };

        self.clearHighlight = function() {

            self.selectedItems = [];

            // if the chart has not yet been drawn then there will be no plotArea so nothing to do here
            if (!self.plotArea) {
                return;
            }

            self.plotArea.selectAll('.selected')
                .classed('selected', false);

            self.plotArea.selectAll('.notselected')
                .classed('notselected', false);

        };

        /*
         * Creates the tooltip for this chart, checking if it exists already first.
         * @memberof! insight.Chart
         * @param {DOMElement} container - The DOM Element that the tooltip should be drawn inside.
         */
        self.initializeTooltip = function(container) {
            if (!self.tooltip) {
                self.tooltip = new insight.Tooltip()
                    .container(container);
            }
        };

        self.draw = function(isDragging) {

            if (!initialized) {
                init();
            }

            self.resizeChart();

            var axes = xAxes.concat(yAxes);

            axes.forEach(function(axis) {
                axis.draw(self.calculatePlotAreaSize(), self.plotArea, self.container, isDragging);
            });

            self.series()
                .forEach(function(series, index) {
                    series.color = d3.functor(seriesPalette[index % seriesPalette.length]);
                    series.draw(self, isDragging);
                });

            if (legend !== null) {
                legend.draw(self, self.series());
            }

            if (zoomable && !zoomInitialized) {
                initZoom();
            }
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Empty event handler that is overridden by any listeners who want to know when this Chart's series change
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Series[]} series - An array of insight.Series belonging to this Chart
         */
        self.seriesChanged = function(series) {

        };

        /**
         * Enable zooming and panning for an axis on this chart
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Axis} axis The axis to enable zooming and panning for
         * @returns {this}
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
         * @returns {Object} - The current margins of the chart.
         * @example {top: 10, bottom: 20, left: 30, right: 40}
         *
         * @also
         *
         * Sets the margins to use around the chart (top, bottom, left, right), each measured in pixels.
         * @memberof! insight.Chart
         * @instance
         * @param {Object} margins The new margins to use around the chart.
         * @example self.margin({top: 10, bottom: 20, left: 30, right: 40})
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
         * @returns {insight.Series[]} - The current series drawn on the chart.
         *
         * @also
         *
         * Sets the series to draw on this chart.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Series[]} newSeries The new series to draw on the chart.
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
         * @returns {insight.Legend} - The current legend drawn on the chart.
         *
         * @also
         *
         * Sets the legend to draw on this chart.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Legend} newLegend The new legend to draw on the chart.
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
         * @param {insight.Axis} axis The x-axis to add.
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
         * @returns {insight.Axis[]} - The current x-axes of the chart.
         *
         * @also
         *
         * Sets the x-axes on the chart.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Axis[]} newXAxes The new x-axes to draw on the chart.
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
         * @returns {insight.Axis} - The current primary x-axis of the chart.
         *
         * @also
         *
         * Sets the primary x-axis on the chart.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Axis} xAxis The new primary x-axis of the chart.
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
         * @param {insight.Axis} axis The y-axis to add.
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
         * @returns {insight.Axis[]} - The current y-axes of the chart.
         *
         * @also
         *
         * Sets the y-axes on the chart.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Axis[]} newYAxes The new y-axes to draw on the chart.
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
         * @returns {insight.Axis} - The current primary y-axis of the chart.
         *
         * @also
         *
         * Sets the primary y-axis on the chart.
         * @memberof! insight.Chart
         * @instance
         * @param {insight.Axis} yAxis The new primary y-axis of the chart.
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

        /**
         * The color of each series in the chart.
         * @memberof! insight.Chart
         * @instance
         * @returns {Array<Color>} - The color of each series in the chart.
         *
         * @also
         *
         * Sets the color of each series in the chart.
         * @memberof! insight.Chart
         * @instance
         * @param {Array<Color>} newSeriesPalette The new color of each series the chart.
         * @returns {this}
         */
        self.seriesPalette = function(newSeriesPalette) {
            if (!arguments.length) {
                return seriesPalette;
            }
            seriesPalette = newSeriesPalette;
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
     * @param {Object} axisStyles - An associative map between css properties and values for the axis values
     * @param {Object} labelStyles - An associative map between css properties and values for the axis labels
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

        axes.forEach(function(axis) {
            axis.applyTheme(theme);
        });

        this.seriesPalette(theme.chartStyle.seriesPalette);

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
     * @constructor
     * @param {String} name - A uniquely identifying name for this table
     * @param {String} element - The css selector identifying the div container that the table will be drawn in.
     * @param {insight.Grouping} grouping - The Grouping to render this Table from
     * @example var myTable = new insight.Table('My Table', '#table-div', data);
     */
    insight.Table = function Table(name, element, grouping) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            columnProperties = [],
            tableInitialized = false,
            header,
            sortFunctions = [],
            topValues = null,
            headerTextColor = d3.functor('red'),
            headerFont = 'bold 16pt Helvetica Neue',
            rowHeaderTextColor = d3.functor('blue'),
            rowHeaderFont = 'bold 14pt Helvetica Neue',
            cellTextColor = d3.functor('green'),
            cellFont = '12pt Helvetica Neue',
            headerDivider = '0px solid white',
            headerBackgroundColor = d3.functor('white'),
            rowBackgroundColor = d3.functor('white'),
            rowAlternateBackgroundColor = d3.functor(undefined); //Left as undefined, to default to rowBackgroundColor

        // Internal variables -----------------------------------------------------------------------------------------

        self.name = name;
        self.element = element;
        self.data = grouping;
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
                .attr('class', insight.constants.TableClass);

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
            return insight.constants.TableRowClass + ' ' + insight.utils.keySelector(keyFunction(dataPoint));
        }

        function click(dataItem) {

            self.clickEvent(self.data, keyFunction(dataItem));
        }

        // Adds sorters to this Table's list of sorting methods and orders.
        // @param {String} order - 'ASC' or 'DESC'
        function addSortOrder(func, order) {
            var sort = {
                sortParameter: func,
                order: order
            };

            sortFunctions.push(sort);
        }

        function rowColor(d, index) {
            var mainBackgroundColor = self.rowBackgroundColor();
            var alternateBackgroundColor = self.rowAlternateBackgroundColor();

            //Default to main row colour if alternate colour is undefined
            if (!alternateBackgroundColor()) {
                alternateBackgroundColor = mainBackgroundColor;
            }

            //Alternate the colours for rows
            return (index % 2 === 0) ? mainBackgroundColor() : alternateBackgroundColor();
        }

        // Internal functions -----------------------------------------------------------------------------------------

        // Toggle highlighting on items in this table.
        // The provided cssSelector is used to activate or deactivate highlighting on one or more selected rows.
        self.toggleHighlight = function(selector) {

            var clicked = self.tableBody.selectAll('.' + selector);
            var alreadySelected = clicked.classed('selected');

            if (alreadySelected) {
                clicked.classed('selected', false);
                insight.utils.removeItemFromArray(self.selectedItems, selector);
            } else {
                clicked.classed('selected', true)
                    .classed('notselected', false);
                self.selectedItems.push(selector);
            }

            var selected = self.tableBody.selectAll('.selected');
            var notselected = self.tableBody.selectAll('tr:not(.selected)');

            notselected.classed('notselected', selected[0].length > 0);
        };

        self.clearHighlight = function() {

            self.selectedItems = [];

            // if the table has not yet been drawn then there will be no tableBody so nothing to do here
            if (!self.tableBody) {
                return;
            }

            self.tableBody.selectAll('.selected')
                .classed('selected', false);

            self.tableBody.selectAll('.notselected')
                .classed('notselected', false);

        };

        // The public drawing method for the Table. It will also initialize the <table> element if required.
        self.draw = function() {

            var data = self.dataset();
            var columns = self.columns();

            if (!tableInitialized) {
                initializeTable();
            }

            header
                .style('border-bottom', self.headerDivider())
                .style('background-color', self.headerBackgroundColor());

            // draw column headers for properties
            header.selectAll('th.column')
                .data(columns)
                .enter()
                .append('th')
                .attr('class', 'column')
                .style('color', self.headerTextColor())
                .style('font', self.headerFont())
                .html(labelFunction);

            header.selectAll('th.column')
                .style('color', self.headerTextColor())
                .style('font', self.headerFont());

            var rows = self.tableBody.selectAll('tr.' + insight.constants.TableRowClass)
                .data(data, keyFunction);

            rows.enter()
                .append('tr')
                .attr('class', rowClass)
                .on('click', click)
                .style('background-color', rowColor)
                .append('th')
                .style('color', self.rowHeaderTextColor())
                .style('font', self.rowHeaderFont())
                .html(keyFunction);

            rows
                .style('background-color', rowColor)
                .style('color', self.rowHeaderTextColor())
                .style('font', self.rowHeaderFont());

            rows.selectAll('th')
                .style('color', self.rowHeaderTextColor())
                .style('font', self.rowHeaderFont());

            var cells = rows.selectAll('td')
                .data(columnBuilder);

            cells.enter().append('td');

            cells.html(valueFunction)
                .style('color', self.cellTextColor())
                .style('font', self.cellFont());

            // remove any DOM elements no longer in the data set
            cells.exit().remove();
            rows.exit().remove();
        };

        // Public functions -------------------------------------------------------------------------------------------


        /**
         * The properties of the DataSet to use as columns.
         * @memberof! insight.Table
         * @instance
         * @returns {Array<Column>} - The current properties used as columns.
         *
         * @also
         *
         * Sets the properties of the DataSet to use as columns.
         * @memberof! insight.Table
         * @instance
         * @param {Array<Column>} columnProperties - The new properties to use as columns.
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
         * @returns {Function} - The function to use as the key accessor for this Table
         *
         * @also
         *
         * Sets the properties of the DataSet to use as columns.
         * @memberof! insight.Table
         * @instance
         * @param {Function} keyFunc - The function to use as the key accessor for this Table
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
         * @param {Function} sortFunction A function extracting the property to sort on from a data object.
         * @returns {this}.
         */
        self.ascending = function(sortFunction) {

            addSortOrder(sortFunction, 'ASC');

            return self;
        };

        /**
         * Adds a descending sort to this Table's rows using the provided function as a comparison
         * @memberof! insight.Table
         * @instance
         * @param {Function} sortFunction A function extracting the property to sort on from a data object.
         * @returns {this}.
         */
        self.descending = function(sortFunction) {

            addSortOrder(sortFunction, 'DESC');

            return self;
        };

        /**
         * The number of rows to display. Used in combination with [ascending]{@link insight.Table#self.ascending} or [descending]{@link insight.Table#self.descending} to display top or bottom data.
         * @memberof! insight.Table
         * @instance
         * @returns {Number} - The maximum number of top values being displayed.
         *
         * @also
         *
         * Sets the number of rows to display. Used in combination with [ascending]{@link insight.Table#self.ascending} or [descending]{@link insight.Table#self.descending}.
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
         * @memberof! insight.Table
         * @instance
         * @returns {Object[]} - The data set to be used by the table.
         */
        self.dataset = function() {

            var sorters = sortFunctions;

            var data = self.data.extractData();

            data = insight.utils.multiSort(data, sorters);

            if (self.top()) {
                data = data.slice(0, self.top());
            }

            return data;
        };

        /**
         * The text color to use for the table headings.
         * @memberof! insight.Table
         * @instance
         * @returns {Function} - A function that returns the color of the table headings.
         *
         * @also
         *
         * Sets the color to use for the table headings.
         * @memberof! insight.Table
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.headerTextColor = function(color) {
            if (!arguments.length) {
                return headerTextColor;
            }
            headerTextColor = d3.functor(color);
            return self;
        };

        /**
         * The font to use for the table headings.
         * @memberof! insight.Table
         * @instance
         * @returns {Font} - The font to use for the table headings.
         *
         * @also
         *
         * Sets the font to use for the table headings.
         * @memberof! insight.Table
         * @instance
         * @param {Font} font The font to use for the table headings.
         * @returns {this}
         */
        self.headerFont = function(font) {
            if (!arguments.length) {
                return headerFont;
            }
            headerFont = font;
            return self;
        };

        /**
         * The text color to use for the row headings.
         * @memberof! insight.Table
         * @instance
         * @returns {Function} - A function that returns the color of the row headings.
         *
         * @also
         *
         * Sets the color to use for the row headings.
         * @memberof! insight.Table
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.rowHeaderTextColor = function(color) {
            if (!arguments.length) {
                return rowHeaderTextColor;
            }
            rowHeaderTextColor = d3.functor(color);
            return self;
        };

        /**
         * The font to use for the row headings.
         * @memberof! insight.Table
         * @instance
         * @returns {Font} - The font to use for the row headings.
         *
         * @also
         *
         * Sets the font to use for the row headings.
         * @memberof! insight.Table
         * @instance
         * @param {Font} font The font to use for the row headings.
         * @returns {this}
         */
        self.rowHeaderFont = function(font) {
            if (!arguments.length) {
                return rowHeaderFont;
            }
            rowHeaderFont = font;
            return self;
        };

        /**
         * The text color to use for the cells.
         * @memberof! insight.Table
         * @instance
         * @returns {Function} - A function that returns the color of the cells.
         *
         * @also
         *
         * Sets the color to use for the cells.
         * @memberof! insight.Table
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.cellTextColor = function(color) {
            if (!arguments.length) {
                return cellTextColor;
            }
            cellTextColor = d3.functor(color);
            return self;
        };

        /**
         * The font to use for the cells.
         * @memberof! insight.Table
         * @instance
         * @returns {Font} - The font to use for the cells.
         *
         * @also
         *
         * Sets the font to use for the cells.
         * @memberof! insight.Table
         * @instance
         * @param {Font} font The font to use for the cells.
         * @returns {this}
         */
        self.cellFont = function(font) {
            if (!arguments.length) {
                return cellFont;
            }
            cellFont = font;
            return self;
        };

        /**
         * The style of the divider between the headers and table body
         * @memberof! insight.Table
         * @instance
         * @returns {Border} - The style of the divider between the headers and table body.
         *
         * @also
         *
         * Sets the style of the divider between the headers and table body.
         * @memberof! insight.Table
         * @instance
         * @param {Border} dividerStyle The style of the divider between the headers and table body.
         * @returns {this}
         */
        self.headerDivider = function(dividerStyle) {
            if (!arguments.length) {
                return headerDivider;
            }
            headerDivider = dividerStyle;
            return self;
        };

        /**
         * The background color to use for the table headings.
         * @memberof! insight.Table
         * @instance
         * @returns {Function} - A function that returns the background color of the table headings.
         *
         * @also
         *
         * Sets the background color to use for the table headings.
         * @memberof! insight.Table
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.headerBackgroundColor = function(color) {
            if (!arguments.length) {
                return headerBackgroundColor;
            }
            headerBackgroundColor = d3.functor(color);
            return self;
        };

        /**
         * The background color to use for the rows.
         * @memberof! insight.Table
         * @instance
         * @returns {Function} - A function that returns the background color of the rows.
         *
         * @also
         *
         * Sets the background color to use for the rows.
         * @memberof! insight.Table
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.rowBackgroundColor = function(color) {
            if (!arguments.length) {
                return rowBackgroundColor;
            }
            rowBackgroundColor = d3.functor(color);
            return self;
        };

        /**
         * The alternate background color to use for the rows, to appear on every other row.
         * If undefined, then the alternate row background color defaults to using the [rowBackgroundColor]{@link insight.Table#self.rowBackgroundColor}.
         * @memberof! insight.Table
         * @instance
         * @returns {Function} - A function that returns the alternate background color of the rows.
         *
         * @also
         *
         * Sets the alternate background color to use for the rows.
         * If undefined, then the alternate row background color defaults to using the [rowBackgroundColor]{@link insight.Table#self.rowBackgroundColor}.
         * @memberof! insight.Table
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.rowAlternateBackgroundColor = function(color) {
            if (!arguments.length) {
                return rowAlternateBackgroundColor;
            }
            rowAlternateBackgroundColor = d3.functor(color);
            return self;
        };

        self.applyTheme(insight.defaultTheme);

    };

    /* Skeleton event overriden by any listening objects to subscribe to the click event of the table rows
     * @param {Object} series - The row being clicked
     * @param {Object[]} filter - The value of the point selected, used for filtering/highlighting
     */
    insight.Table.prototype.clickEvent = function(series, filter) {

    };

    /**
     * Applies all properties from a theme to the table.
     * @memberof! insight.Table
     * @instance
     * @param {insight.Theme} theme The theme to apply to the table.
     * @returns {this}
     */
    insight.Table.prototype.applyTheme = function(theme) {

        this.headerFont(theme.tableStyle.headerFont);
        this.headerTextColor(theme.tableStyle.headerTextColor);

        this.rowHeaderFont(theme.tableStyle.rowHeaderFont);
        this.rowHeaderTextColor(theme.tableStyle.rowHeaderTextColor);

        this.cellFont(theme.tableStyle.cellFont);
        this.cellTextColor(theme.tableStyle.cellTextColor);

        this.headerDivider(theme.tableStyle.headerDivider);

        this.headerBackgroundColor(theme.tableStyle.headerBackgroundColor);
        this.rowBackgroundColor(theme.tableStyle.rowBackgroundColor);
        this.rowAlternateBackgroundColor(theme.tableStyle.rowAlternateBackgroundColor);

        return this;
    };

})(insight);
;(function(insight) {

    /**
     * A tooltip, displaying values for a series or point when hovered over.
     * @constructor
     */
    insight.Tooltip = function Tooltip() {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            className = insight.constants.Tooltip,
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

        // Private functions ------------------------------------------------------------------------------------------

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

            var boundingBox = insight.utils.getSVGBoundingBox(target);

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
         * @param {Object} point - an {x,y} coordinate, from the top left of the tooltip's container SVG.
         */
        function drawTooltip(position) {

            d3.select(self.element)
                .style({
                    'opacity': '1',
                    'top': position.y + "px",
                    'left': position.x + "px"
                });
        }

        // Public functions ------------------------------------------------------------------------------------------

        /**
         * The distance to which move the tooltip for this series relative to its default point.
         * @memberof! insight.Tooltip
         * @instance
         * @returns {Object} - The {x,y} offset to place the tooltip from the point.
         *
         * @also
         *
         * Sets the distance to which move the tooltip for this series relative to its default point.
         * @memberof! insight.Tooltip
         * @instance
         * @param {Object} offset The new distance to which move the tooltip for this series relative to its default point.
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
         * @returns {Object} - The style of the tooltip, in standard {'name': 'value', ...} format of CSS values.
         * @example {'text-align': 'left', ...}
         *
         * @also
         *
         * Sets the current style for the tooltip.
         * @memberof! insight.Tooltip
         * @instance
         * @param {Object} style The new style of the tooltip, in standard {'name': 'value', ...} format of CSS values.
         * @example self.styles({'text-align': 'left', ...})
         * @returns {this}
         */
        self.styles = function(value) {
            if (!arguments.length) {
                return insight.utils.objectUnion(baseStyles, styles);
            }
            styles = value;
            return self;
        };

        // Internal functions ------------------------------------------------------------------------------------------

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
         * @param {DOMElement} element The element to attach to.
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
     * @constructor
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
            return item.title();
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
                .attr("class", insight.constants.LegendView)
                .attr("transform", "translate(" + (chart.width() - 80) + ",30)");

            chart.legendBox = chart.legendView.append("rect")
                .style("stroke", 'black')
                .style("stroke-width", 1)
                .style("fill", 'white');

            chart.legendItems = chart.legendView.append("g")
                .attr("class", insight.constants.Legend);
        };

        self.draw = function(chart) {
            if (!initialised) {
                self.init(chart);
            }

            var series = chart.series();
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

            chart.legendItems.selectAll('rect')
                .data(series)
                .transition()
                .style('fill', blobFillColor);

            chart.legendItems.selectAll('text')
                .data(series)
                .enter()
                .append("text")
                .attr("x", 20)
                .attr("y", textPositionY)
                .attr("width", function(item) {
                    return ctx.measureText(item.title()).width;
                })
                .attr("height", 20)
                .text(textContent)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black");

            var legendHeight = 0;
            var legendWidth = 0;

            for (var index = 0; index < series.length; index++) {
                var seriesTextWidth = ctx.measureText(series[index].title())
                    .width;
                legendWidth = Math.max(legendWidth, seriesTextWidth + 25);
            }
            legendHeight = series.length * 20;

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
     * @constructor
     * @param {String} axisTitle - A title that will be displayed alongside the axis.
     * @param {insight.scales.Scale} scale - One of the scales defined by {@link insight.scales}.
     */
    insight.Axis = function Axis(axisTitle, scale) {

        // Private variables --------------------------------------------------------------------------------------

        var self = this,
            title = axisTitle,
            shouldBeOrdered = d3.functor(false),
            orderingFunction = null,
            tickSize = d3.functor(0),
            tickPadding = d3.functor(0),
            lineWidth = 1,
            tickWidth = 1,
            labelRotation = 0,
            tickLabelFont = '11pt Helvetica Neue',
            tickLabelColor = d3.functor('Black'),
            axisLabelFont = '12pt Helvetica Neue',
            axisLabelColor = d3.functor('Black'),
            tickLabelOrientation = d3.functor('lr'),
            shouldShowGridlines = false,
            colorFunction = d3.functor('#000'),
            tickColorFunction = d3.functor('#000'),
            shouldDisplay = true,
            barPadding = d3.functor(0.1),
            initialisedAxisView = false,
            shouldReversePosition = false,
            zoomable = false,
            axisStrategy = scale.strategy,
            tickFrequency;

        // Internal variables ---------------------------------------------------------------------------------------

        self.rangeMinimum = function() {
            return axisStrategy.findMin(self);
        };

        self.rangeMaximum = function() {
            return axisStrategy.findMax(self);
        };

        self.measureCanvas = document.createElement('canvas');
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

            var angleRadians = insight.utils.degreesToRadians(self.tickLabelRotation());
            var trigFunc = (self.isHorizontal()) ? Math.sin : Math.cos;
            var trigResult = parseFloat(trigFunc(angleRadians).toFixed(10));

            if (trigResult === 0) {
                return 'middle';
            }

            switch (self.orientation()) {

                case 'left':
                case 'top':
                    return (trigResult > 0) ? 'end' : 'start';

                case 'right':
                case 'bottom':
                    return (trigResult > 0) ? 'start' : 'end';
            }

        }

        /*
         * The default axis tick format, just returns the input
         * @returns {Object} tickPoint - The axis data for a particular tick
         * @param {Object} ticklabel - The output string to be displayed
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

        self.tickValues = function() {
            return axisStrategy.tickValues(self);
        };

        self.measureTickValues = function(tickValues) {
            var textMeasurer = new insight.TextMeasurer(self.measureCanvas);

            var formattedValues = tickValues.map(function(tickValue) {
                return self.tickLabelFormat()(tickValue);
            });

            return formattedValues.map(function(formattedTickValue) {
                return textMeasurer.measureText(
                    formattedTickValue,
                    self.tickLabelFont(),
                    self.tickLabelRotation());
            });
        };

        self.calculateLabelDimensions = function() {

            if (!self.shouldDisplay()) {
                return {
                    width: 0,
                    height: 0
                };
            }

            var textMeasurer = new insight.TextMeasurer(self.measureCanvas);

            var axisTitleHeight = textMeasurer.measureText(self.title(), self.axisTitleFont()).height;

            var tickLabelSizes = self.measureTickValues(self.tickValues());

            var maxTickLabelWidth = tickLabelSizes.length === 0 ? 0 :
                d3.max(tickLabelSizes, function(d) {
                    return Math.abs(d.width);
                });

            var maxTickLabelHeight = tickLabelSizes.length === 0 ? 0 :
                d3.max(tickLabelSizes, function(d) {
                    return Math.abs(d.height);
                });

            var axisTitleWidth = Math.ceil(textMeasurer.measureText(self.title(), self.axisTitleFont()).width);

            if (maxTickLabelWidth === 0) {
                maxTickLabelHeight = 0;
            }

            if (axisTitleWidth === 0) {
                axisTitleHeight = 0;
            }

            var totalWidth =
                self.tickPadding() * 2 +
                self.tickSize() +
                maxTickLabelWidth +
                axisTitleWidth;

            var labelHeight = (self.isHorizontal()) ? maxTickLabelHeight + axisTitleHeight : Math.max(maxTickLabelHeight, axisTitleHeight);

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

            var domain = self.domain();
            if (domain.length === 0) {
                return overhangs;
            }

            var textMeasurer = new insight.TextMeasurer(self.measureCanvas);

            var firstTick = self.tickLabelFormat()(domain[0]);
            var lastTick = self.tickLabelFormat()(domain[domain.length - 1]);

            var firstTickSize = textMeasurer.measureText(firstTick, self.tickLabelFont(), self.tickLabelRotation());
            var lastTickSize = textMeasurer.measureText(lastTick, self.tickLabelFont(), self.tickLabelRotation());

            var angleRadians = insight.utils.degreesToRadians(self.tickLabelRotation());

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
         * @returns {Object[]} bounds - An array with two items, for the lower and upper range of this axis
         */
        self.domain = function() {
            return self.axisRange();
        };

        self.tickLabelRotationTransform = function() {

            var offset = self.tickPadding() + self.tickSize();

            var measurer = new insight.TextMeasurer(self.measureCanvas);
            var labelSize = measurer.measureText('aa', self.tickLabelFont());
            var textHeight = Math.ceil(labelSize.height);

            offset = (self.orientation() === 'left' || self.orientation() === 'top') ? -offset : offset;

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

        self.setupAxisView = function(plotArea, container) {

            if (initialisedAxisView) {
                return;
            }

            initialisedAxisView = true;

            self.initializeScale();

            self.axis = d3.svg.axis();

            self.axisElement = plotArea
                .append('g');

            self.axisElement
                .attr('class', insight.constants.AxisClass)
                .call(self.axis)
                .selectAll('text')
                .attr('class', insight.constants.AxisTextClass);

            self.labelElement = container
                .append('div')
                .attr('class', insight.constants.AxisLabelClass)
                .style('position', 'absolute');
        };

        self.draw = function(bounds, plotArea, container, isDragging) {

            // Scale range and bounds need to be initialized regardless of whether the axis will be displayed

            self.bounds = bounds;

            if (!self.isZoomable()) {
                self.initializeScale();
            }

            if (!self.shouldDisplay()) {
                return;
            }

            self.setupAxisView(plotArea, container);

            var animationDuration = isDragging ? 0 : 200;

            var adjustedTickSize = self.tickSize();
            // All ticks draw from top-left position of axis. Top and Left ticks drawn up/left, but Bottom and Right
            // draw down/right, overlapping the axis line.
            if (self.orientation() === 'bottom' || self.orientation() === 'right') {
                adjustedTickSize += self.lineWidth();
            }

            var tickValues = self.tickValues();

            self.axis = d3.svg.axis()
                .scale(self.scale)
                .orient(self.orientation())
                .tickSize(adjustedTickSize)
                .tickPadding(self.tickPadding())
                .tickFormat(self.tickLabelFormat())
                .tickValues(tickValues);

            self.axisElement
                .attr('transform', self.axisPosition())
                .style('stroke', self.tickColor())
                .style('stroke-width', self.tickWidth())
                .style('fill', 'none')
                .transition()
                .duration(animationDuration)
                .call(self.axis);

            self.axisElement
                .selectAll('path.domain')
                .style('stroke', self.lineColor())
                .style('stroke-width', self.lineWidth())
                .style('fill', 'none');

            self.axisElement
                .selectAll('text')
                .attr('transform', self.tickLabelRotationTransform)
                .style('text-anchor', self.textAnchor());

            //NB: SVG text uses "fill", not "color" for the text colour
            self.axisElement.selectAll(".tick > text")
                .style('font', self.tickLabelFont())
                .style('fill', self.tickLabelColor());

            self.labelElement
                .style('font', self.axisTitleFont())
                .style('color', self.axisTitleColor())
                .text(self.title());

            self.positionLabel();

            if (self.shouldShowGridlines()) {
                self.gridlines.drawGridLines(plotArea, tickValues);
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
         * The font to use for the axis title.
         * @memberof! insight.Axis
         * @instance
         * @returns {String} - The font to use for the axis title.
         *
         * @also
         *
         * Sets the font to use for the axis title.
         * @memberof! insight.Axis
         * @instance
         * @param {String} font The font to use for the axis title.
         * @returns {this}
         */
        self.axisTitleFont = function(font) {
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
         * The color to use for the axis title.
         * @memberof! insight.Axis
         * @instance
         * @returns {Function} - A function that returns the color of an axis title.
         *
         * @also
         *
         * Sets the color to use for the axis title.
         * @memberof! insight.Axis
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.axisTitleColor = function(color) {
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
         * @returns {Boolean} - Whether the axis is horizontal.
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
         * @returns {Boolean} - Whether the axis is currently being drawn on the chart.
         *
         * @also
         *
         * Sets whether the axis is drawn on the chart.
         * @memberof! insight.Axis
         * @instance
         * @param {Boolean} displayed Whether or not the axis will be drawn.
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
         * @returns {Boolean} - Whether the axis is drawn at the bottom/left (false) or top/right (true).
         *
         * @also
         *
         * Sets whether the axis is drawn in a reversed position.
         * @memberof! insight.Axis
         * @instance
         * @param {Boolean} isReversed Whether the axis is drawn at the bottom/left (false) or top/right (true).
         * @returns {this}
         */
        self.hasReversedPosition = function(isReversed) {
            if (!arguments.length) {
                return shouldReversePosition;
            }
            shouldReversePosition = isReversed;
            return self;
        };

        // title and axis tick methods

        /**
         * Gets the axis title
         * @memberof! insight.Axis
         * @instance
         * @returns {String} - The axis title
         *
         * @also
         *
         * Sets the axis title
         * @memberof! insight.Axis
         * @instance
         * @param {String} axisTitle The axis title
         * @returns {this}
         */
        self.title = function(axisTitle) {
            if (!arguments.length) {
                return title;
            }
            title = axisTitle;
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
         * See {@link insight.formatters} for pre-built examples.
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


        /**
         * Gets the width of the tick marks, measured in pixels.
         * @memberof! insight.Axis
         * @instance
         * @returns {Number} - The width of the tick marks, measured in pixels.
         *
         * @also
         *
         * Sets the width of the tick marks, measured in pixels.
         * @memberof! insight.Axis
         * @instance
         * @param {Number} width The new width of the tick marks, measured in pixels.
         * @returns {this}
         */
        self.tickWidth = function(width) {
            if (!arguments.length) {
                return tickWidth;
            }
            tickWidth = width;
            return self;
        };

        /**
         * Gets the color of the tick marks.
         * @memberof! insight.Axis
         * @instance
         * @returns {Function} - The function of the color of the tick marks.
         *
         * @also
         *
         * Sets the color of the tick marks.
         * @memberof! insight.Axis
         * @instance
         * @param {Function|Color} color Either a function that returns a color, or a color.
         * @returns {this}
         */
        self.tickColor = function(color) {
            if (!arguments.length) {
                return tickColorFunction;
            }
            tickColorFunction = d3.functor(color);
            return self;
        };

        /*
         * Gets the axis orientation: h = horizontal, v = vertical
         * @memberof! insight.Axis
         * @instance
         * @returns {String} - h = horizontal, v = vertical
         *
         * @also
         *
         * Sets the axis orientation: h = horizontal, v = vertical
         * @memberof! insight.Axis
         * @instance
         * @param {String} value The the axis orientation: h = horizontal, v = vertical
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
         * @returns {Number} - The clockwise angle (degrees), that the each tick label will be rotated from horizontal.
         *
         * @also
         *
         * Sets the clockwise angle (degrees), that the each tick label will be rotated from horizontal.
         * @memberof! insight.Axis
         * @instance
         * @param {Number} value The clockwise angle (degrees), that the each tick label will be rotated from horizontal.
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
         * @returns {Number} - The size of each axis tick, in pixels.
         *
         * @also
         *
         * Sets the size of each axis tick in, pixels.
         * @memberof! insight.Axis
         * @instance
         * @param {Number} value The size of each axis tick, in pixels.
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
         * @returns {Number} - The padding between the end of a tick and its label, in pixels.
         *
         * @also
         *
         * Sets the padding between the end of a tick and its label, in pixels.
         * @memberof! insight.Axis
         * @instance
         * @param {Number} value The padding between the end of a tick and its label, in pixels.
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
         * @returns {String} - The the current text-anchor attribute value.
         *
         * @also
         *
         * Sets the text-anchor attribute that will be set on each tick Label.
         * @memberof! insight.Axis
         * @instance
         * @param {String} value The text-anchor attribute that will be set on each tick Label.
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
         * @returns {String} - 'tb' = top to bottom, 'lr' = left to right.
         *
         * @also
         *
         * Sets the orientation of the tick labels: 'tb' = top to bottom, 'lr' = left to right.
         * This is a helper function that sets the ticklabelRotation to either 0 or 90.
         * @memberof! insight.Axis
         * @instance
         * @param {String} value 'tb' = top to bottom, 'lr' = left to right.
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
         * @returns {Boolean} - Whether the axis has gridlines drawn from its major ticks.
         *
         * @also
         *
         * Sets whether the axis has gridlines drawn from its major ticks.
         * @memberof! insight.Axis
         * @instance
         * @param {Boolean} showGridlines Whether the axis has gridlines drawn from its major ticks.
         * @returns {this}
         */
        self.shouldShowGridlines = function(showLines) {
            if (!arguments.length) {
                return shouldShowGridlines;
            }
            shouldShowGridlines = showLines;

            return self;
        };

        /**
         * The desired gap between tick values on the axis.
         * This can either be expressed as a number for linear axes, or as an {@link insight.DateFrequency} for time axes.
         * The value has no effect on an ordinal axis.
         * @memberof! insight.Axis
         * @instance
         * @returns {Number|insight.DateFrequency} - The desired gap between tick values on the axis.
         *
         * @also
         *
         * Sets the desired gap between tick values on the axis.
         * This can either be expressed as a number for linear axes, or as an {@link insight.DateFrequency} for time axes.
         * The value has no effect on an ordinal axis.
         * @memberof! insight.Axis
         * @instance
         * @param {Number|insight.DateFrequency} - The desired gap between tick values on the axis.
         * @returns {this}
         */
        self.tickFrequency = function(tickFreq) {
            if (!arguments.length) {
                return tickFrequency != null ? tickFrequency : axisStrategy.tickFrequency(self);
            }
            if (tickFreq <= 0) {
                throw new Error(insight.ErrorMessages.nonPositiveTickFrequencyException);
            }
            tickFrequency = tickFreq;

            return self;
        };

        /**
         * Gets the start and end of the axis scale range.
         * @memberof! insight.Axis
         * @instance
         * @returns {Object[]} - An array of 2 values: the lower and upper limits of the axis range.
         *
         * @also
         *
         * Sets the start and end of axis scale range. The specific type of rangeMin and rangeMax will
         * depend on which of the [insight scales]{@link insight.scales} the axis is using.
         * @memberof! insight.Axis
         * @instance
         * @param {Object} rangeMin The lower limit of the axis range
         * @param {Object} rangeMax The upper limit of the axis range
         * @returns {this}
         */
        self.axisRange = function(rangeMin, rangeMax) {
            if (!arguments.length) {
                return axisStrategy.domain(self);
            }

            var minVal = d3.functor(rangeMin);
            var maxVal = d3.functor(rangeMax);

            //If max < min, we will need to swap the values to make the axisRange still be in ascending order.
            var shouldReverseValues = (maxVal() < minVal());

            self.rangeMinimum = (!shouldReverseValues) ? minVal : maxVal;
            self.rangeMaximum = (!shouldReverseValues) ? maxVal : minVal;

            self.scale.domain(axisStrategy.axisRange(self, self.rangeMinimum(), self.rangeMaximum()));

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
        this.tickColor(theme.axisStyle.tickLineColor);
        this.tickWidth(theme.axisStyle.tickLineWidth);

        this.tickLabelFont(theme.axisStyle.tickLabelFont);
        this.tickLabelColor(theme.axisStyle.tickLabelColor);
        this.axisTitleFont(theme.axisStyle.axisTitleFont);
        this.axisTitleColor(theme.axisStyle.axisTitleColor);

        this.shouldShowGridlines(theme.axisStyle.shouldShowGridlines);

        this.gridlines.applyTheme(theme);

        return this;
    };

})(insight);
;(function(insight) {

    /*
     * The AxisStrategy base class provides some functions that are used by any specific types of axis.
     */
    insight.AxisStrategy = function AxisStrategy() {

        // Private variables ------------------------------------------------------------------------------------------
        var self = this;

        // Private functions ------------------------------------------------------------------------------------------

        function calculateMaxWidth(axis, tickFrequency) {
            var tickValues = self.calculateTickValues(axis, tickFrequency);
            var tickLabelSizes = axis.measureTickValues(tickValues);

            var maxValue;
            if (axis.isHorizontal()) {
                maxValue = d3.max(tickLabelSizes, function(d) {
                    return d.width;
                });
            } else {
                maxValue = d3.max(tickLabelSizes, function(d) {
                    return d.height;
                });
            }
            return maxValue * tickValues.length;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.domain = function(axis) {
            var rangeMin = axis.rangeMinimum();
            var rangeMax = axis.rangeMaximum();

            if (rangeMin.valueOf() === rangeMax.valueOf()) {
                return axis.scale.domain();
            }

            if (axis.isZoomable() && !self.domainIsDefault(axis.scale.domain())) {
                return axis.scale.domain();
            }

            return [rangeMin, rangeMax];
        };

        self.axisRange = function(axis, minimum, maximum) {
            return [minimum, maximum];
        };

        self.domainIsDefault = function(domain) {
            return insight.utils.arrayEquals(self.defaultDomain(), domain);
        };

        //Default time/linear axis domain is [0,1]
        self.defaultDomain = d3.functor([0, 1]);

        self.initialTickValue = function(axis, tickFrequency) {
            return 0;
        };

        self.calculateTickValues = function(axis, frequency) {
            var domain = axis.domain();

            var tickValue = self.initialTickValue(axis, frequency);

            var results = [];

            while (tickValue <= domain[1] && self.frequencyValue(frequency) > 0) {
                results.push(tickValue);
                tickValue = self.nextTickValue(axis, tickValue, frequency);
            }

            //Filter out any tickmarks outside the domain range
            results = results.filter(function(d) {
                return (d <= domain[1]) && (d >= domain[0]);
            });

            return results;
        };

        self.tickValues = function(axis) {
            return self.calculateTickValues(axis, axis.tickFrequency());
        };

        self.tickFrequencyForDomain = function(axis, domain) {
            var tickFrequency = self.initialTickFrequency(axis, domain);

            // valueOf used to get correct domain range for dates
            var domainRange = domain[1].valueOf() - domain[0].valueOf();

            var step = 0;
            //Iterate until we have a reasonably small number of ticks
            while (Math.floor(domainRange / self.frequencyValue(tickFrequency)) > 10) {
                tickFrequency = self.increaseTickFrequency(axis, tickFrequency, step);
                step++;
            }

            var axisSize = axis.isHorizontal() ? axis.bounds[0] : axis.bounds[1];

            if (axisSize === 0) {
                return tickFrequency;
            }

            //Iterate until we have a ticks non longer overlap
            while (calculateMaxWidth(axis, tickFrequency) > axisSize) {
                tickFrequency = self.increaseTickFrequency(axis, tickFrequency, step);
                step++;
            }

            return tickFrequency;
        };

        self.frequencyValue = function(frequency) {
            return frequency;
        };

        self.initialTickFrequency = function(axis, domain) {
            return 1;
        };

        self.increaseTickFrequency = function(axis, tickFrequency, step) {
            return tickFrequency + 1;
        };

        self.decreaseTickFrequency = function(axis, tickFrequency, step) {
            return tickFrequency - 1;
        };

        self.tickFrequency = function(axis) {
            return self.tickFrequencyForDomain(axis, axis.domain());
        };

        /*
         * Calculates the minimum value to be used in this axis.
         * @returns {Object} - The smallest value in the datasets that use this axis
         */
        self.findMin = function(axis) {
            var min = d3.min(axis.series, function(series) {
                return series.findMin(axis);
            });

            return min || 0;
        };

        /*
         * Calculates the maximum value to be used in this axis.
         * @returns {Object} - The largest value in the datasets that use this axis
         */
        self.findMax = function(axis) {
            var max = d3.max(axis.series, function(series) {
                return series.findMax(axis);
            });

            return max || 0;
        };

        self.nextTickValue = function(axis, currentTickValue, tickFrequency) {
            return currentTickValue;
        };

        self.previousTickValue = function(axis, currentTickValue, tickFrequency) {
            return currentTickValue;
        };
    };

})(insight);
;(function(insight) {

    /*
     * An axis strategy representing time and date scales.
     */
    insight.DateAxisStrategy = function DateAxisStrategy() {

        insight.AxisStrategy.call(this);

        // Private variables ------------------------------------------------------------------------------------------
        var self = this;

        var possibleAutoFrequencies = [
            insight.DateFrequency.dateFrequencyForSeconds(1),
            insight.DateFrequency.dateFrequencyForSeconds(5),
            insight.DateFrequency.dateFrequencyForSeconds(15),
            insight.DateFrequency.dateFrequencyForSeconds(30),
            insight.DateFrequency.dateFrequencyForMinutes(1),
            insight.DateFrequency.dateFrequencyForMinutes(5),
            insight.DateFrequency.dateFrequencyForMinutes(15),
            insight.DateFrequency.dateFrequencyForMinutes(30),
            insight.DateFrequency.dateFrequencyForHours(1),
            insight.DateFrequency.dateFrequencyForHours(6),
            insight.DateFrequency.dateFrequencyForHours(12),
            insight.DateFrequency.dateFrequencyForDays(1),
            insight.DateFrequency.dateFrequencyForDays(2),
            insight.DateFrequency.dateFrequencyForWeeks(1),
            insight.DateFrequency.dateFrequencyForMonths(1),
            insight.DateFrequency.dateFrequencyForMonths(3),
            insight.DateFrequency.dateFrequencyForMonths(6),
            insight.DateFrequency.dateFrequencyForYears(1),
            insight.DateFrequency.dateFrequencyForYears(5),
            insight.DateFrequency.dateFrequencyForYears(10),
            insight.DateFrequency.dateFrequencyForYears(100)
        ];

        // Internal functions -----------------------------------------------------------------------------------------

        self.tickFrequency = function(axis) {
            var domain = axis.domain();

            var startDate = domain[0];
            var endDate = domain[1];

            var startDateInSeconds = startDate.valueOf() / 1000;
            var endDateInSeconds = endDate.valueOf() / 1000;

            var tickFrequency = self.tickFrequencyForDomain(axis, [startDateInSeconds, endDateInSeconds]);

            return tickFrequency;
        };

        self.nextTickValue = function(axis, currentTickValue, dateFrequency) {
            var newDate = new Date(currentTickValue);

            newDate.setYear(newDate.getFullYear() + dateFrequency.getYears());
            newDate.setMonth(newDate.getMonth() + dateFrequency.getMonths());
            newDate.setDate(newDate.getDate() + dateFrequency.getDays());
            newDate.setHours(newDate.getHours() + dateFrequency.getHours());
            newDate.setMinutes(newDate.getMinutes() + dateFrequency.getMinutes());
            newDate.setSeconds(newDate.getSeconds() + dateFrequency.getSeconds());

            //Deal with changes due to British Summer Time
            var timeZoneOffset = currentTickValue.getTimezoneOffset() - newDate.getTimezoneOffset();
            if (timeZoneOffset !== 0) {
                newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
            }

            return newDate;
        };

        self.previousTickValue = function(axis, currentTickValue, dateFrequency) {
            var newDate = new Date(currentTickValue);

            newDate.setYear(newDate.getFullYear() - dateFrequency.getYears());
            newDate.setMonth(newDate.getMonth() - dateFrequency.getMonths());
            newDate.setDate(newDate.getDate() - dateFrequency.getDays());
            newDate.setHours(newDate.getHours() - dateFrequency.getHours());
            newDate.setMinutes(newDate.getMinutes() - dateFrequency.getMinutes());
            newDate.setSeconds(newDate.getSeconds() - dateFrequency.getSeconds());

            //Deal with changes due to British Summer Time
            var timeZoneOffset = currentTickValue.getTimezoneOffset() - newDate.getTimezoneOffset();
            if (timeZoneOffset !== 0) {
                newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
            }

            return newDate;
        };

        self.initialTickValue = function(axis, tickFrequency) {
            var firstValue = axis.domain()[0];
            return tickFrequency.roundDate(firstValue);
        };

        self.frequencyValue = function(frequency) {
            return frequency.toSeconds();
        };

        self.initialTickFrequency = function(axis, domain) {
            return insight.DateFrequency.dateFrequencyForSeconds(1);
        };

        self.increaseTickFrequency = function(axis, currentFrequency, step) {
            return possibleAutoFrequencies[step];
        };

        self.decreaseTickFrequency = function(axis, currentFrequency, step) {
            return possibleAutoFrequencies[step - 1];
        };

    };

    insight.DateAxisStrategy.prototype = Object.create(insight.AxisStrategy.prototype);
    insight.DateAxisStrategy.prototype.constructor = insight.DateAxisStrategy;

})(insight);
;(function(insight) {

    /*
     * An axis strategy representing linear scales.
     */
    insight.LinearAxisStrategy = function LinearAxisStrategy() {

        insight.AxisStrategy.call(this);

        // Private variables ------------------------------------------------------------------------------------------
        var self = this;

        // Internal functions -----------------------------------------------------------------------------------------

        self.initialTickValue = function(axis, tickFrequency) {
            var domain = axis.domain();

            var initialValue = domain[0];
            return Math.ceil(initialValue / tickFrequency) * tickFrequency;
        };

        self.nextTickValue = function(axis, currentTickValue, tickFrequency) {
            var result = currentTickValue + tickFrequency;

            // Round number to a precision of 10 decimal places i.e. 0.300000000004 to 0.3
            return parseFloat(result.toPrecision(10));
        };

        self.previousTickValue = function(axis, currentTickValue, tickFrequency) {
            var result = currentTickValue - tickFrequency;

            // Round number to a precision of 10 decimal places i.e. 0.300000000004 to 0.3
            return parseFloat(result.toPrecision(10));
        };

        self.initialTickFrequency = function(axis, domain) {
            var domainRange = domain[1] - domain[0];

            if (domainRange === 0) {
                return 1;
            }

            return Math.pow(10, Math.floor(Math.log(domainRange) / Math.LN10) - 1);
        };

        self.increaseTickFrequency = function(axis, tickFrequency, step) {
            // Multiply by: 2x, 2.5x (5x cumulative), 2x (10x cumulative), and loop.
            if (step % 3 === 1) {
                return tickFrequency * 2.5;
            }

            return tickFrequency * 2;
        };

        self.decreaseTickFrequency = function(axis, tickFrequency, step) {
            // Divide by: 2x, 2.5x (5x cumulative), 2x (10x cumulative), and loop.
            if (step % 3 === 1) {
                return tickFrequency / 2.5;
            }

            return tickFrequency / 2;
        };

        /*
         * Calculates the minimum value to be used in this axis.
         * @returns {Object} - The smallest value in the datasets that use this axis
         */
        self.findMin = function(axis) {
            return 0;
        };
    };

    insight.LinearAxisStrategy.prototype = Object.create(insight.AxisStrategy.prototype);
    insight.LinearAxisStrategy.prototype.constructor = insight.LinearAxisStrategy;

})(insight);
;(function(insight) {

    /*
     * An axis strategy representing category scales.
     */
    insight.OrdinalAxisStrategy = function OrdinalAxisStrategy() {

        insight.AxisStrategy.call(this);

        // Private variables ------------------------------------------------------------------------------------------
        var self = this;

        // Private functions -----------------------------------------------------------------------------------------

        /*
         * Queries all series that use this axis to get the list of available values
         * @returns {Object[]} values - the values for this ordinal axis
         */
        function findOrdinalValues(axis) {
            var vals = [];

            // Build a list of values used by this axis by checking all Series using this axis
            // Optionally provide an ordering function to sort the results by.  If the axis is ordered but no custom ordering is defined,
            // then the series value function will be used by default.
            axis.series.forEach(function(series) {
                vals = vals.concat(series.keys(axis.orderingFunction()));
            });

            vals = insight.utils.arrayUnique(vals);

            return vals;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.domain = function(axis) {
            return self.axisRange(axis, axis.rangeMinimum(), axis.rangeMaximum());
        };

        self.axisRange = function(axis, minimum, maximum) {
            var domain = findOrdinalValues(axis);
            var minIndex = domain.indexOf(minimum);
            var maxIndex = domain.indexOf(maximum);

            if (minIndex === -1 || maxIndex === -1) {
                return domain;
            }

            //Swap the indices to ensure minIndex < maxIndex
            if (minIndex > maxIndex) {
                var temp = minIndex;
                minIndex = maxIndex;
                maxIndex = temp;
            }

            var rangeValues = domain.slice(minIndex, 1 + maxIndex);

            return rangeValues;
        };

        //Default ordinal domain is []
        self.defaultDomain = d3.functor([]);

        self.tickValues = function(axis) {
            return axis.domain();
        };

        self.initialTickValue = function(axis, tickFrequency) {
            return axis.domain()[0];
        };

        self.nextTickValue = function(axis, currentTickValue, tickFrequency) {
            var categories = axis.domain();
            var tickIndex = categories.indexOf(currentTickValue);

            if (tickIndex === -1 || tickIndex === categories.length - 1) {
                return null;
            }

            return categories[tickIndex + 1];
        };

        self.previousTickValue = function(axis, currentTickValue, tickFrequency) {
            var categories = axis.domain();
            var tickIndex = categories.indexOf(currentTickValue);

            if (tickIndex === -1 || tickIndex === 0) {
                return null;
            }

            return categories[tickIndex - 1];
        };


        /*
         * Calculates the minimum value to be used in this axis.
         * @returns {Object} - The smallest value in the datasets that use this axis
         */
        self.findMin = function(axis) {
            var values = findOrdinalValues(axis);
            return (values.length > 0) ? values[0] : undefined;
        };

        /*
         * Calculates the maximum value to be used in this axis.
         * @returns {Object} - The largest value in the datasets that use this axis
         */
        self.findMax = function(axis) {
            var values = findOrdinalValues(axis);
            return (values.length > 0) ? values[values.length - 1] : undefined;
        };
    };

    insight.OrdinalAxisStrategy.prototype = Object.create(insight.AxisStrategy.prototype);
    insight.OrdinalAxisStrategy.prototype.constructor = insight.OrdinalAxisStrategy;

})(insight);
;(function(insight, d3) {

    /**
     * Defines all scales that are supported by the library.
     * @namespace insight.scales
     */
    insight.scales = {};

    /**
     * A named scale which is used by an {@link insight.Axis}. It is recommended to use the {@link insight.scales}
     * 'enum' to create a scale rather than create one directly.
     * @constructor
     * @param {String} name The name of the scale.
     * properties, such as {@link insight.scales.linear}.
     * @param {Object} scale A [D3 scale]{@link https://github.com/mbostock/d3/wiki/Scales}.
     */
    insight.scales.Scale = function Scale(strategy, scale) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Public variables -------------------------------------------------------------------------------------------

        /**
         * The strategy of the scale.
         * @memberof! insight.scales.Scale
         * @instance
         * @type {Object}
         */
        self.strategy = strategy;

        /**
         * A [D3 scale]{@link https://github.com/mbostock/d3/wiki/Scales}.
         * @memberof! insight.scales.Scale
         * @instance
         * @type {Object}
         */
        self.scale = scale;
    };

    /**
     * An ordinal scale, which uses a set of distinct values, such as genders or countries.
     * @type {insight.scales.Scale}
     */
    insight.scales.ordinal = new insight.scales.Scale(new insight.OrdinalAxisStrategy(), d3.scale.ordinal);

    /**
     * A linear scale, which has a continuous domain where any value from an input range can be mapped to an
     * output domain.
     * @type {insight.scales.Scale}
     */
    insight.scales.linear = new insight.scales.Scale(new insight.LinearAxisStrategy(), d3.scale.linear);

    /**
     * A time scale, which is similar to a linear scale, but the values are represented as
     * [javascript Dates]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date}
     * rather than numbers.
     * @type {insight.scales.Scale}
     */
    insight.scales.time = new insight.scales.Scale(new insight.DateAxisStrategy(), d3.time.scale);

}(insight, d3));
;(function(insight) {

    /**
     * The Axis gridlines represent and draw the gridlines for a given axis.
     * @constructor
     * @param {insight.Axis} axis - The axis to draw gridlines from.
     */
    insight.AxisGridlines = function AxisGridlines(axis) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            lineColor = '#000',
            lineWidth = 0;

        // Internal variables -------------------------------------------------------------------------------------------

        self.parentAxis = axis;

        // Internal functions ----------------------------------------------------------------------------------------

        self.drawGridLines = function(plotArea, ticks) {

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
            var gridLines = self.allGridlines(plotArea).data(ticks);

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
         * @param {insight.Chart} chart The chart to grab the gridlines from.
         * @returns {Object[]} - All of the gridlines currently added to this chart.
         */
        self.allGridlines = function(plotArea) {
            var gridLineIdentifier = 'line.' + gridlineClass();
            return plotArea.selectAll(gridLineIdentifier);
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
     * @constructor
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Array} data - The object containing this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.Series = function Series(name, data, x, y) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            filter = null,
            title = name;

        var tooltipOffset = {
            x: 0,
            y: -10
        };

        // Internal variables -----------------------------------------------------------------------------------------

        self.data = (insight.utils.isArray(data)) ? new insight.DataProvider(data) : data;
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
         * @returns {String} selectionClass - A string that is used by CSS highlighting to style the chart item.
         * @param {String[]}selectedItems - A list of CSS selectors for currently selected items
         * @param {String} selector - The selector for the item being drawn
         */
        function selectedClassName(selectedItems, selector) {
            var selected = '';

            if (selectedItems.length) {
                selected = insight.utils.arrayContains(selectedItems, selector) ? ' selected' : ' notselected';
            }

            return selected;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Generates the short class name to be used for items in this series.
         * @memberof insight.Series
         * @returns {String} shortClassName - A short value for the class attribute used for items in this Series.
         */
        self.shortClassName = function() {
            var shortName = self.name + 'class';
            var spacelessName = insight.utils.alphaNumericString(shortName);

            return spacelessName;
        };

        /*
         * Generates the base class name to be used for items in this series.It can be extended upon by individual items
         * to mark them out in other ways.
         * @memberof insight.Series
         * @returns {String} baseClassName - A root value for the class attribute used for items in this Series.
         */
        self.seriesClassName = function() {

            var seriesName = [self.shortClassName()]
                .concat(self.classValues)
                .join(' ');

            return seriesName;
        };

        /*
         * Constructs the text for the class attribute for a specific data point, using the base value for this Series and any additional values.
         * @memberof insight.Series
         * @param {Object} dataItem - The data item being drawn
         * @param {String[]} additionalClasses - Any additional values this Series needs appending to the class value.Used by stacked Series to differentiate between Series.
         * @returns {String} classValue - A class value for a particular data item being bound in this Series.
         */
        self.itemClassName = function(dataItem, additionalClasses) {

            var keySelector = insight.utils.keySelector(groupKeyFunction(dataItem));
            var selected = selectedClassName(self.selectedItems, keySelector);
            var value = self.seriesClassName() + ' ' + keySelector + selected;

            return value;
        };

        self.keys = function(orderFunction) {
            return self.dataset(orderFunction)
                .map(self.keyFunction());
        };

        /*
         * This event handler is triggered when a series element (rectangle, circle or line) triggers a mouse over.
         * Tooltips are shown and CSS updated.
         * The *this* context will reference the DOMElement raising the event.
         * @memberof! insight.Series
         * @param {Object} item - The data point for the hovered item.
         * @param {Integer} i - The index of the hovered item in the data set.
         */
        self.mouseOver = function(item, i) {

            var textFunction = self.tooltipFunction();
            var tooltipText = tooltipFormat(textFunction(item));

            self.tooltip.offset(self.tooltipOffset());

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



        self.click = function(group) {
            var groupKey = groupKeyFunction(group);

            self.clickEvent(self.data, groupKey);
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
         * @returns {Function} The current function used to extract the x-value.
         *
         * @also
         *
         * Sets the function used to retrieve the x-value from the data object to plot on a chart.
         * @memberof! insight.Series
         * @instance
         * @param {Function} keyFunc The new key function to use to extract the x-value from a data object.
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
         * @returns {Function} The current function used to extract the grouping key.
         *
         * @also
         *
         * Sets the function used to retrieve the grouping key from the data object to plot on a chart.
         * @memberof! insight.Series
         * @instance
         * @param {Function} keyFunc The new function to use to extract the grouping key from a data object.
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
         * @returns {Function} The current function used to extract the y-value.
         *
         * @also
         *
         * Sets the function used to retrieve the y-value from the data object to plot on a chart.
         * @memberof! insight.Series
         * @instance
         * @param {Function} valueFunc The new key function to use to extract the y-value from a data object.
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
         * @returns {Object[]} - The data set to be used by the series
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

            var data = self.data.extractData(orderFunction, self.topValues);

            if (filter) {
                data = data.filter(filter);
            }

            return data;
        };

        /**
         * The distance to which move the tooltip for this series relative to its default point.
         * @memberof! insight.Series
         * @instance
         * @returns {Object} - The {x,y} offset to place the tooltip from the point.
         *
         * @also
         *
         * Sets the distance to which move the tooltip for this series relative to its default point.
         * @memberof! insight.Series
         * @instance
         * @param {Object} offset The new distance to which move the tooltip for this series relative to its default point.
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
         * @see {@link insight.formatters} for pre-built examples.
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

        /**
         * Gets the title of the series.
         * @memberof! insight.Series
         * @instance
         * @returns {String} - The series' title.
         *
         * @also
         *
         * Sets the title of the series.
         * @memberof! insight.Series
         * @instance
         * @param {String} seriesTitle The new title of the series.
         * @returns {this}
         */
        self.title = function(seriesTitle) {
            if (!arguments.length) {
                return title;
            }

            title = seriesTitle;
            return self;
        };

    };

    /* Skeleton event overriden by a Dashboard to subscribe to this series' clicks.
     * @param {Object} series - The series being clicked
     * @param {Object[]} filter - The value of the point selected, used for filtering/highlighting
     * @param {Object[]} selection - The css selection name also used to maintain a list of filtered dimensions (TODO - is this needed anymore?)
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
     * The PointSeries is an abstract base class for all Cartesian classes representing points (E.g. Scatter, Bubbles
     * and Lines).
     * @constructor
     * @extends insight.Series
     * @param {String} name - A uniquely identifying name for this chart
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.PointSeries = function PointSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables -----------------------------------------------------------------------------------------

        var radiusFunction = d3.functor(3),
            self = this;

        var opacityFunction = function() {
            // If we are using selected/notSelected, then make selected more opaque than notSelected
            if (d3.select(this).classed('selected')) {
                return 0.8;
            }

            if (d3.select(this).classed('notselected')) {
                return 0.2;
            }

            //If not using selected/notSelected, make everything semi-transparent
            return 0.5;
        };

        // Internal variables -----------------------------------------------------------------------------------------

        self.cssClassName = d3.functor(insight.constants.Point);

        self.classValues = [self.cssClassName()];

        // Internal functions -------------------------------------------------------------------------------------------


        self.yPosition = function(d) {
            var yValue = self.y.scale(self.valueFunction()(d));
            return yValue || 0;
        };

        self.xPosition = function(d, i) {
            var xValue = self.x.scale(self.keyFunction()(d));
            return xValue || 0;
        };

        self.selector = function() {
            return self.name + self.cssClassName();
        };

        self.draw = function(chart, isDragging) {

            self.tooltip = chart.tooltip;
            self.selectedItems = chart.selectedItems;

            var duration = isDragging ? 0 : function(d, i) {
                return 200 + (i * 20);
            };

            var data = self.pointData(self.dataset());

            var points = chart.plotArea.selectAll('circle.' + self.shortClassName())
                .data(data, self.keyFunction());

            function rad(d) {
                return d.radius || 0;
            }

            points.enter()
                .append('circle')
                .on('mouseover', self.mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', self.click);

            points.attr('class', self.itemClassName);

            points.transition()
                .duration(duration)
                .attr('r', rad)
                .attr('cx', self.xPosition)
                .attr('cy', self.yPosition)
                .attr('opacity', self.pointOpacity())
                .style('fill', self.color);

            //Remove any data which is no longer displayed
            points.exit().remove();
        };


        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Gets the function to extract the radius of each bubble from the data objects.
         * @memberof! insight.PointSeries
         * @instance
         * @returns {Function} - The current function used to determine the radius of data objects.
         *
         * @also
         *
         * Sets the function to extract the radius of each bubble from the data objects.
         * @memberof! insight.PointSeries
         * @instance
         * @param {Function|Number} radiusFunc The new radius of each bubble, extracted from the data objects.
         * @returns {this}
         */
        self.radiusFunction = function(radiusFunc) {
            if (!arguments.length) {
                return radiusFunction;
            }
            radiusFunction = d3.functor(radiusFunc);

            return self;
        };

        /**
         * Gets the function to compute the opacity of each point. A number between 0.0 and 1.0 where
         * 0.0 is completely transparent and 1.0 is opaque.
         * @memberof! insight.PointSeries
         * @instance
         * @returns {Number} - The current opacity of each point (0.0 - 1.0).
         *
         * @also
         *
         * Sets the opacity of each point. A number between 0.0 and 1.0 where
         * 0.0 is completely transparent and 1.0 is completely opaque.
         * @memberof! insight.PointSeries
         * @instance
         * @param {Number} opacity The new opacity of each point.
         * @returns {this}
         */
        self.pointOpacity = function(opacity) {
            if (!arguments.length) {
                return opacityFunction;
            }
            opacityFunction = d3.functor(opacity);

            return self;
        };
    };

    insight.PointSeries.prototype = Object.create(insight.Series.prototype);
    insight.PointSeries.prototype.constructor = insight.PointSeries;

})(insight);
;(function(insight) {

    /**
     * The BarSeries is an abstract base class for columns and rows.
     * @constructor
     * @extends insight.Series
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.BarSeries = function BarSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -------------------------------------------------------------------------------------------

        self.valueAxis = undefined;
        self.keyAxis = undefined;
        self.classValues = [insight.constants.BarGroupClass];

        // Private functions ------------------------------------------------------------------------------------------

        function tooltipFunction(d) {
            return self.tooltipFormat()(self.valueFunction()(d));
        }

        function duration(d, i) {
            return 200 + (i * 20);
        }

        function opacity() {
            // If we are using selected/notSelected, then make selected more opaque than notSelected
            if (d3.select(this).classed('notselected')) {
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

        self.isHorizontal = function() {
            return undefined;
        };

        self.barLength = function(d, plotHeight) {
            return undefined;
        };

        self.valuePosition = function(d) {
            return undefined;
        };

        self.draw = function(chart) {

            self.tooltip = chart.tooltip;
            self.selectedItems = chart.selectedItems;

            var groupSelector = 'g.' + self.name + '.' + insight.constants.BarGroupClass,
                barSelector = 'rect.' + self.shortClassName();

            var data = self.dataset();
            var visibleBars = self.keyAxis.domain();

            data = data.filter(function(d) {
                var key = self.keyFunction()(d);
                return insight.utils.arrayContains(visibleBars, key);
            });

            var groups = chart.plotArea
                .selectAll(groupSelector)
                .data(data, self.keyFunction());

            var newGroups = groups.enter()
                .append('g')
                .classed(self.name, true)
                .classed(insight.constants.BarGroupClass, true);

            var newBars = newGroups.selectAll(barSelector);

            newGroups.append('rect')
                .attr('class', self.itemClassName)
                .attr('in_series', self.name)
                .attr('fill', self.color)
                .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                .on('mouseover', self.mouseOver)
                .on('mouseout', self.mouseOut)
                .on('click', self.click);

            var seriesTypeCount = chart.countSeriesOfType(self);
            var seriesIndex = chart.seriesIndexByType(self);
            var groupIndex = 0;

            var height = (self.isHorizontal()) ? barBreadth : barLength;
            var width = (self.isHorizontal()) ? barLength : barBreadth;
            var xPosition = (self.isHorizontal()) ? self.valuePosition : keyPosition;
            var yPosition = (self.isHorizontal()) ? keyPosition : self.valuePosition;


            // Select and update all bars
            var allBars = groups.selectAll(barSelector);

            allBars.attr('class', self.itemClassName);

            allBars.transition()
                .duration(duration)
                .attr('x', xPosition)
                .attr('y', yPosition)
                .attr('height', height)
                .attr('width', width)
                .style('opacity', opacity)
                .style('fill', self.color);

            groups.exit().remove();

            // draw helper functions ------------------------------------

            function groupHeight(d) {
                return self.keyAxis.scale.rangeBand(d);
            }

            function barBreadth(d) {

                var heightOfGroup = groupHeight(d);
                var breadth = heightOfGroup / seriesTypeCount;
                return breadth;

            }

            function barLength(d) {
                var plotHeight = (chart.height() - chart.margin().top - chart.margin().bottom);
                return self.barLength(d, plotHeight);
            }

            function keyPosition(d) {

                var groupPositions = self.keyAxis.scale.range();
                var groupPos = groupPositions[groupIndex];

                var barWidth = width(d);
                var position = groupPos + (barWidth * (seriesTypeCount - seriesIndex - 1));

                groupIndex++;

                return position;

            }
        };
    };

    insight.BarSeries.prototype = Object.create(insight.Series.prototype);
    insight.BarSeries.prototype.constructor = insight.BarSeries;
})(insight);
;(function(insight) {

    /**
     * The MarkerSeries class extends the Series class and draws markers/targets on a chart
     * @constructor
     * @extends insight.Series
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
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

            self.tooltip = chart.tooltip;
            self.selectedItems = chart.selectedItems;

            function reset(d) {
                d.yPos = 0;
                d.xPos = 0;
            }

            var d = self.dataset().forEach(reset);

            var groups = chart.plotArea
                .selectAll('g.' + insight.constants.BarGroupClass + "." + self.name)
                .data(self.dataset(), self.keyAccessor);

            var newGroups = groups.enter()
                .append('g')
                .attr('class', insight.constants.BarGroupClass + " " + self.name);

            var newBars = newGroups.selectAll('rect.bar');

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
                .on('click', self.click);

            var bars = groups.selectAll('.' + self.name + 'class');

            bars
                .transition()
                .duration(duration)
                .attr('y', self.yPosition)
                .attr('x', self.xPosition)
                .attr('width', self.markerWidth)
                .attr('height', self.markerHeight)
                .style('fill', self.color);

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
     * The BubbleSeries class extends the PointSeries class to display datapoints as differently sized circles,
     * where radius represents a measured value.
     * @constructor
     * @extends insight.PointSeries
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.BubbleSeries = function BubbleSeries(name, data, x, y) {

        insight.PointSeries.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -----------------------------------------------------------------------------------------

        self.cssClassName = d3.functor(insight.constants.Bubble);

        self.classValues = [self.cssClassName()];

        // Internal functions -----------------------------------------------------------------------------------------

        self.pointData = function(data) {
            var max = d3.max(data, self.radiusFunction());

            //Minimum of pixels-per-axis-unit
            var xValues = data.map(self.keyFunction());
            var yValues = data.map(self.valueFunction());
            var xBounds = self.x.bounds[1];
            var yBounds = self.y.bounds[0];
            var maxRad = Math.min(xBounds / 10, yBounds / 10);

            // create radius for each item
            data.forEach(function(d) {
                var radiusInput = self.radiusFunction()(d);

                if (radiusInput <= 0) {
                    d.radius = 0;
                } else {
                    d.radius = (radiusInput * maxRad) / max;
                }
            });

            function rad(d) {
                return d.radius;
            }

            //this sort ensures that smaller bubbles are on top of larger ones, so that they are always selectable.  Without changing original array (hence concat which creates a copy)
            data = data.concat()
                .sort(function(a, b) {
                    return d3.descending(rad(a), rad(b));
                });

            return data;
        };
    };

    insight.BubbleSeries.prototype = Object.create(insight.PointSeries.prototype);
    insight.BubbleSeries.prototype.constructor = insight.BubbleSeries;

})(insight);
;(function(insight) {

    /**
     * The ScatterSeries class extends the PointSeries class to display datapoints as small circles.
     * @constructor
     * @extends insight.PointSeries
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.ScatterSeries = function ScatterSeries(name, data, x, y) {

        insight.PointSeries.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -----------------------------------------------------------------------------------------

        self.cssClassName = d3.functor(insight.constants.Scatter);

        self.classValues = [self.cssClassName()];

        // Internal functions -----------------------------------------------------------------------------------------

        self.pointData = function(data) {
            // create radius for each item
            data.forEach(function(d) {
                d.radius = Math.max(self.radiusFunction()(d), 0);
            });

            return data;
        };

        // Override default opacity to be opaque
        self.pointOpacity(1.0);
    };

    insight.ScatterSeries.prototype = Object.create(insight.PointSeries.prototype);
    insight.ScatterSeries.prototype.constructor = insight.ScatterSeries;

})(insight);
;(function(insight) {

    /**
     * The RowSeries class extends the [BarSeries]{@link insight.BarSeries} class and draws horizontal bars on a [Chart]{@link insight.Chart}
     * @constructor
     * @extends insight.BarSeries
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.RowSeries = function RowSeries(name, data, x, y) {

        insight.BarSeries.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        // Internal variables -------------------------------------------------------------------------------------------

        self.valueAxis = x;
        self.keyAxis = y;
        self.classValues = [insight.constants.RowClass];

        // Internal functions -----------------------------------------------------------------------------------------

        self.isHorizontal = d3.functor(true);

        self.barLength = function(d, plotHeight) {
            var barValue = self.valueFunction()(d);
            return self.valueAxis.scale(barValue);
        };

        self.valuePosition = d3.functor(0);
    };

    insight.RowSeries.prototype = Object.create(insight.BarSeries.prototype);
    insight.RowSeries.prototype.constructor = insight.RowSeries;

})(insight);
;(function(insight) {

    /**
     * The LineSeries class extends the Series class and draws horizontal bars on a Chart
     * @constructor
     * @extends insight.Series
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.LineSeries = function LineSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            lineType = 'linear',
            displayPoints = true,
            pointRadius = 3;

        // Internal variables -----------------------------------------------------------------------------------------

        self.classValues = [insight.constants.LineClass];

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

            self.tooltip = chart.tooltip;

            var transform = d3.svg.line()
                .x(self.rangeX)
                .y(self.rangeY)
                .interpolate(lineType);

            var data = self.dataset();

            var classValue = self.name + 'line ' + insight.constants.LineClass;
            var classSelector = '.' + self.name + 'line.' + insight.constants.LineClass;

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

            rangeElement.style("stroke", self.color);

            var duration = isDragging ? 0 : 300;

            chart.plotArea.selectAll(rangeIdentifier)
                .datum(self.dataset())
                .transition()
                .duration(duration)
                .attr("d", transform);

            var pointClassName = self.name + 'line' + insight.constants.LinePoint;
            pointClassName = insight.utils.alphaNumericString(pointClassName);

            if (displayPoints) {
                var circles = chart.plotArea.selectAll("circle." + pointClassName)
                    .data(self.dataset());

                circles.enter()
                    .append('circle')
                    .attr('class', pointClassName)
                    .attr("clip-path", "url(#" + chart.clipPath() + ")")
                    .attr("cx", self.rangeX)
                    .attr("cy", chart.height() - chart.margin().bottom - chart.margin().top)
                    .on('mouseover', self.mouseOver)
                    .on('mouseout', self.mouseOut);

            }

            var colorFunc = (displayPoints) ? self.color : d3.functor(undefined);
            var allCircles = chart.plotArea.selectAll("circle." + pointClassName);

            allCircles
                .transition()
                .duration(duration)
                .attr("cx", self.rangeX)
                .attr("cy", self.rangeY)
                .attr("r", pointRadius)
                .style("fill", colorFunc)
                .style("stroke-width", 0);
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Whether or not to show circular points on top of the line for each datapoint.
         * @memberof! insight.LineSeries
         * @instance
         * @returns {Boolean} - Whether or not to show circular points on top of the line for each datapoint.
         *
         * @also
         *
         * Sets whether or not to show circular points on top of the line for each datapoint.
         * @memberof! insight.LineSeries
         * @instance
         * @param {Boolean} showPoints Whether or not to show circular points on top of the line for each datapoint.
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
         * Returns the radius of points
         * @memberof! insight.LineSeries
         * @instance
         * @returns {Number} the radius of each point in pixels
         *
         * @also
         *
         * Sets the radius of points
         * @memberof! insight.LineSeries
         * @instance
         * @param {Number} the radius of each point in pixels
         * @returns {this}
         */
        self.pointRadius = function(radius) {
            if (!arguments.length) {
                return pointRadius;
            }
            pointRadius = radius;
            return self;
        };

        /**
         * The line type that this lineSeries will draw. Defaults to 'linear'.
         * @see [d3's shapes]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate} for all options.
         * @memberof! insight.LineSeries
         * @instance
         * @returns {String} - The line type that this lineSeries will draw.
         *
         * @also
         *
         * Sets the line type that this lineSeries will draw..
         * @see [d3's shapes]{@link https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate} for all options.
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
        this.shouldShowPoints(theme.seriesStyle.shouldShowPoints);
        this.pointRadius(theme.seriesStyle.pointRadius);
        return this;
    };

})(insight);
;(function(insight) {

    /**
     * The ColumnSeries class extends the [BarSeries]{@link insight.BarSeries} class and draws vertical bars on a [Chart]{@link insight.Chart}
     * @constructor
     * @extends insight.BarSeries
     * @param {String} name - A uniquely identifying name for this series
     * @param {insight.DataProvider | Object[]} data - An object which contains this series' data
     * @param {insight.Axis} x - The x axis
     * @param {insight.Axis} y - The y axis
     */
    insight.ColumnSeries = function ColumnSeries(name, data, x, y) {

        insight.BarSeries.call(this, name, data, x, y);

        // Private variables -----------------------------------------------------------------------------------------

        var self = this;

        // Internal variables ------------------------------------------------------------------------------------------

        self.valueAxis = y;
        self.keyAxis = x;
        self.classValues = [insight.constants.ColClass];

        // Internal functions ----------------------------------------------------------------------------------------

        self.isHorizontal = d3.functor(false);

        self.orderFunction = function(a, b) {
            // Sort descending for categorical data
            return self.valueFunction()(b) - self.valueFunction()(a);
        };

        self.barLength = function(d, plotHeight) {
            return plotHeight - self.valuePosition(d);
        };

        self.valuePosition = function(d) {
            var barValue = self.valueFunction()(d);
            return self.valueAxis.scale(barValue);
        };

    };

    insight.ColumnSeries.prototype = Object.create(insight.BarSeries.prototype);
    insight.ColumnSeries.prototype.constructor = insight.ColumnSeries;

})(insight);
;if (typeof define === 'function' && define.amd) {

    define('insight', [], function() {
        return insight;
    });

}
