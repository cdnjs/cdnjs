var insight = (function() {

    return {
        Charts: [],
        Groups: [],
        Dimensions: [],
        FilteredDimensions: [],
        DimensionChartMap: {},
        init: function() {
            this.Charts = [];
            this.Groups = [];
            this.FilteredDimensions = [];
            this.DimensionChartMap = {};
        },
        redrawCharts: function() {
            for (var i = 0; i < this.Charts
                .length; i++) {
                this.Charts[i].draw();
            }
        },
        addChart: function(chart) {

            var self = this;

            chart.triggerRedraw = this.redrawCharts.bind(this);

            this.Charts.push(chart);

            return chart;
        },
        filterFunction: function(filter, element) {
            var value = filter.key ? filter.key : filter;

            return {
                name: value,
                filterFunction: function(d) {
                    if (Array.isArray(d)) {
                        return d.indexOf(value) != -1;
                    } else {
                        return String(d) == String(value);
                    }
                }
            };
        },
        compareFilters: function(filterFunction) {
            return function(d) {
                return String(d.name) == String(filterFunction.name);
            };
        },
        applyCSSClasses: function(chart, value, dimensionSelector) {
            var listeningSeries = this.DimensionChartMap[chart.data.dimension.Name];

            listeningSeries.forEach(function(chart) {

                chart.highlight(dimensionSelector, value);


            });
        },
        drawCharts: function() {

            var self = this;

            this.Charts
                .forEach(
                    function(chart) {

                        chart.series()
                            .forEach(function(s) {
                                if (s.data.dimension) {
                                    if (self.DimensionChartMap[s.data.dimension.Name]) {
                                        if (self.DimensionChartMap[s.data.dimension.Name].indexOf(chart) == -1) {
                                            self.DimensionChartMap[s.data.dimension.Name].push(chart);
                                        }
                                    } else {
                                        self.DimensionChartMap[s.data.dimension.Name] = [chart];
                                    }
                                }
                            });

                        chart.init();
                    });

            for (var i = 0; i < this.Charts
                .length; i++) {
                this.Charts[i].draw();
            }

        },
        chartFilterHandler: function(chart, value, dimensionSelector) {
            var self = this;

            this.applyCSSClasses(chart, value, dimensionSelector);

            var dimension = chart.data.dimension;

            var filterFunction = this.filterFunction(value);

            if (filterFunction) {
                var dims = this.Dimensions
                    .filter(dimension.comparer);

                var activeDim = this.FilteredDimensions
                    .filter(dimension.comparer);

                if (!activeDim.length) {
                    this.FilteredDimensions.push(dimension);
                }

                var comparerFunction = this.compareFilters(filterFunction);

                dims.map(function(dim) {

                    var filterExists = dim.Filters
                        .filter(comparerFunction)
                        .length;

                    //if the dimension is already filtered by this value, toggle (remove) the filter
                    if (filterExists) {
                        InsightUtils.removeMatchesFromArray(dim.Filters, comparerFunction);

                    } else {
                        // add the provided filter to the list for this dimension

                        dim.Filters.push(filterFunction);
                    }

                    // reset this dimension if no filters exist, else apply the filter to the dataset.
                    if (dim.Filters.length === 0) {

                        InsightUtils.removeItemFromArray(self.FilteredDimensions, dim);
                        dim.Dimension.filterAll();

                    } else {
                        dim.Dimension.filter(function(d) {
                            var vals = dim.Filters
                                .map(function(func) {
                                    return func.filterFunction(d);
                                });

                            return vals.filter(function(result) {
                                    return result;
                                })
                                .length > 0;
                        });
                    }
                });

                this.Groups.forEach(function(group) {
                    group.recalculate();

                });

                this.redrawCharts();
            }
        }
    };

})();
;insight.Constants = (function() {
    var exports = {};

    exports.Behind = 'behind';
    exports.Front = 'front';
    exports.AxisTextClass = 'axis-text';
    exports.AxisLabelClass = 'axis-label';
    exports.YAxisClass = 'y-axis';
    exports.AxisClass = 'in-axis';
    exports.XAxisClass = 'x-axis';
    exports.XAxisRotation = "rotate(90)";
    exports.ToolTipTextClass = "tooltip";
    exports.BarGroupClass = "bargroup";
    exports.ContainerClass = "incontainer";
    exports.ChartSVG = "chartSVG";
    exports.Bubble = "bubble";

    return exports;
}());


insight.Scales = (function() {
    var exports = {};

    exports.Ordinal = {
        name: "ordinal",
        scale: d3.scale.ordinal
    };
    exports.Linear = {
        name: "linear",
        scale: d3.scale.linear
    };
    exports.Time = {
        name: "time",
        scale: d3.time.scale
    };
    return exports;
}());
;var InsightFormatters = (function(d3) {
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
        var format = d3.format("0,000");
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

    return exports;
}(d3));
;/**
 * This modules contains some helper functions used throughout the library
 * @module InsightUtils
 */
var InsightUtils = (function() {

    var exports = {};

    /**
     * This is a utility method used to check if an object is an array or not
     * @returns {boolean} return - is the object an array
     * @param {object} input - The object to check
     */
    exports.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };


    exports.isDate = function(obj) {
        return obj instanceof Date;
    };

    exports.isNumber = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    exports.removeMatchesFromArray = function(array, comparer) {
        var self = this;
        var matches = array.filter(comparer);
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

        this._data = data;

        this.Dimensions = [];
        this.Groups = [];

        this.ndx = null;

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
        if (this._data.all) {
            data = this._data.all();
        } else {
            //not a crossfilter set
            data = this._data;
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

        data = this._data.sort(this._orderFunction);

        if (this._filterFunction) {
            data = data.filter(this._filterFunction);
        }

        return data;
    };


    DataSet.prototype.group = function(name, groupFunction, multi) {

        this.ndx = !this.ndx ? crossfilter(this._data) : this.ndx;

        var dim = new insight.Dimension(name, groupFunction, this.ndx.dimension(groupFunction), groupFunction, multi);

        var group = new insight.Grouping(dim);

        insight.Dimensions.push(dim);
        insight.Groups.push(group);

        group.preFilter = insight.chartFilterHandler.bind(insight);

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
     * @param {function} dimension - The function used to categorize points within the dimension.
     * @param {dimension} dimension - The crossfilter dimension representing this dimension (TODO: create this inside the constructor - should be invisible)
     * @param {function} dimension - The function used to generate a displayable string for this dimension, to be used as a label or otherwise (TODO: is this the business of this constructor or even object?)
     * @param {boolean} multi - Whether or not this dimension represents a collection of possible values in each item.
     * @class
     */
    var Dimension = function Dimension(name, func, dimension, displayFunction, multi) {
        this.Dimension = dimension;
        this.Name = name;
        this.Filters = [];
        this.Function = func;
        this.multiple = multi;

        this.displayFunction = displayFunction ? displayFunction : function(d) {
            return d;
        };

        this.comparer = function(d) {
            return d.Name == this.Name;
        }.bind(this);


    };

    return Dimension;

})(insight);
;insight.Grouping = (function(insight) {

    /**
     * A Grouping is generated on a dimension, to reduce the items in the data set into groups along the provided dimension
     * @constructor
     * @param {Dimension} dimension - The dimension to group
     * @class
     */
    function Grouping(dimension) {

        this.dimension = dimension;

        var sumProperties = [];
        var countProperties = [];
        var cumulativeProperties = [];
        var averageProperties = [];

        var linkedSeries = [];

        this._compute = null;
        this.gIndices = {};

        this._valueAccessor = function(d) {
            return d;
        };

        this._orderFunction = function(a, b) {
            return b.value.Count - a.value.Count;
        };

        this.registerSeries = function(series) {
            linkedSeries.push(series);
            series.clickEvent = this.preFilter;
        };

        this.preFilter = function(series, filter, dimensionSelector) {

        };

        this._ordered = false;

        /**
         * The sum function gets or sets the properties that this group will sum across.
         * @returns {String[]}
         */
        /**
         * @param {String[]} properties - An array of property names in the dataset that will be summed along this grouping's dimension
         * @returns {this}
         */
        this.sum = function(_) {
            if (!arguments.length) {
                return sumProperties;
            }
            sumProperties = _;
            return this;
        };

        /**
         * The cumulative function gets or sets the properties whose value occurences will be accumulated across this dimension.
         * @returns {String[]}
         */
        /**
         * @param {String[]} properties - An array of property names that will have their occuring values accumulated after aggregation
         * @returns {this}
         */
        this.cumulative = function(_) {
            if (!arguments.length) {
                return cumulativeProperties;
            }
            cumulativeProperties = _;
            return this;
        };

        /**
         * The count function gets or sets the properties whose value occurences will be counted across this dimension.
         * If the provided property contains an array of values, each distinct value in that array will be counted.
         * @returns {String[]}
         */
        /**
         * @param {String[]} properties - An array of property names that will have their occuring values counted during aggregation
         * @returns {this}
         */
        this.count = function(_) {
            if (!arguments.length) {
                return countProperties;
            }
            countProperties = _;
            return this;
        };

        /**
         * The average function gets or sets the properties whose values will be averaged for across this grouped dimension
         * @returns {String[]}
         */
        /**
         * @param {String[]} properties - An array of property names that will have be averaged during aggregation
         * @returns {this}
         */
        this.mean = function(_) {
            if (!arguments.length) {
                return averageProperties;
            }
            averageProperties = _;

            sumProperties = this.unique(sumProperties.concat(averageProperties));

            return this;
        };

        return this;
    }


    /**
     * Gets or sets whether the group's data is ordered.
     * @returns {String[]}
     */
    /**
     * @param {boolean} order - a boolean for whether to order the group's values
     * @returns {this}
     */
    Grouping.prototype.ordered = function(_) {
        if (!arguments.length) {
            return this._ordered;
        }
        this._ordered = _;

        return this;
    };

    /**
     * The filter method gets or sets the function used to filter the results returned by this grouping.
     * @param {function} filterFunction - A function taking a parameter representing an object in the list.  The function must return true or false as per <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">Array Filter</a>.
     */
    Grouping.prototype.filter = function(f) {
        if (!arguments.length) {
            return this._filterFunction;
        }
        this._filterFunction = f;
        return this;
    };


    /**
     * A Helper function to to return the distinct elements in an array.  Used when properties to be averaged are defined, as they must also be added to the sum properties list without duplicating them.
     * @returns {array} - The input array filtered to only contain unique items
     * @param {object[]} data - An array from which to remove duplicate values
     */
    Grouping.prototype.unique = function(array) {
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
     * This aggregation method is tailored to dimensions that can hold multiple values (in an array), therefore they are counted differently.
     * For example: a property called supportedDevices : ['iPhone5', 'iPhone4'] where the values inside the array are treated as dimensional slices
     * @returns {object[]} return - the array of dimensional groupings resulting from this dimensional aggregation
     */
    Grouping.prototype.reduceMultiDimension = function() {

        var propertiesToSum = this.sum();
        var propertiesToCount = this.count();
        var propertiesToAverage = this.mean();

        var index = 0;
        var gIndices = {};

        function reduceAdd(p, v) {
            for (var prop in propertiesToCount) {
                var propertyName = propertiesToCount[prop];

                if (v.hasOwnProperty(propertyName)) {
                    for (var val in v[propertyName]) {
                        if (typeof(gIndices[v[propertyName][val]]) != "undefined") {
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
            for (var prop in propertiesToCount) {
                var propertyName = propertiesToCount[prop];

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

        data = this.dimension.Dimension.groupAll()
            .reduce(reduceAdd, reduceRemove, reduceInitial);

        this.orderFunction(function(a, b) {
            return b.value - a.value;
        });

        return data;
    };


    /**
     * This method performs the aggregation of the underlying crossfilter dimension, calculating any additional properties during the map-reduce phase.
     * It must be run prior to a group being used
     * @todo This should probably be run during the constructor? If not, lazily evaluated by getData() if it hasn't been run already.
     */
    Grouping.prototype.initialize = function() {
        var propertiesToSum = this.sum();
        var propertiesToCount = this.count();
        var propertiesToAverage = this.mean();

        var data = [];

        if (this.dimension.multiple) {
            data = this.reduceMultiDimension();
        } else {
            data = this.dimension.Dimension.group()
                .reduce(
                    function(p, v) {
                        p.Count++;

                        for (var property in propertiesToSum) {
                            if (v.hasOwnProperty(propertiesToSum[property])) {
                                p[propertiesToSum[property]].Sum += v[propertiesToSum[property]];
                            }
                        }

                        for (var avProperty in propertiesToAverage) {
                            if (v.hasOwnProperty(propertiesToAverage[avProperty])) {
                                p[propertiesToAverage[avProperty]].Average = p[propertiesToAverage[avProperty]].Average + ((v[propertiesToAverage[avProperty]] - p[propertiesToAverage[avProperty]].Average) / p.Count);
                            }
                        }

                        for (var countProp in propertiesToCount) {
                            if (v.hasOwnProperty(propertiesToCount[countProp])) {
                                var propertyName = propertiesToCount[countProp];
                                var propertyValue = v[propertiesToCount[countProp]];

                                if (InsightUtils.isArray(propertyValue)) {

                                    for (var subIndex in propertyValue) {
                                        var subVal = propertyValue[subIndex];
                                        p[propertyName][subVal] = p[propertyName].hasOwnProperty(subVal) ? p[propertyName][subVal] + 1 : 1;
                                        p[propertyName].Total++;
                                    }

                                } else {
                                    p[propertyName][propertyValue] = p[propertyName].hasOwnProperty(propertyValue) ? p[propertyName][propertyValue] + 1 : 1;
                                    p[propertyName].Total++;
                                }
                            }
                        }

                        return p;
                    },
                    function(p, v) {
                        p.Count--;

                        for (var property in propertiesToSum) {
                            if (v.hasOwnProperty(propertiesToSum[property])) {
                                p[propertiesToSum[property]].Sum -= v[propertiesToSum[property]];
                            }
                        }


                        for (var countProp in propertiesToCount) {
                            if (v.hasOwnProperty(propertiesToCount[countProp])) {
                                var propertyName = propertiesToCount[countProp];
                                var propertyValue = v[propertiesToCount[countProp]];

                                if (InsightUtils.isArray(propertyValue)) {

                                    for (var subIndex in propertyValue) {
                                        var subVal = propertyValue[subIndex];
                                        p[propertyName][subVal] = p[propertyName].hasOwnProperty(subVal) ? p[propertyName][subVal] - 1 : 1;
                                        p[propertyName].Total--;
                                    }

                                } else {
                                    p[propertyName][propertyValue] = p[propertyName].hasOwnProperty(propertyValue) ? p[propertyName][propertyValue] - 1 : 1;
                                    p[propertyName].Total--;
                                }

                            }
                        }

                        for (var avProperty in propertiesToAverage) {
                            if (v.hasOwnProperty(propertiesToAverage[avProperty])) {
                                var valRemoved = v[propertiesToAverage[avProperty]];
                                var sum = p[propertiesToAverage[avProperty]].Sum;
                                p[propertiesToAverage[avProperty]].Average = sum / p.Count;

                                var result = p[propertiesToAverage[avProperty]].Average;

                                if (!isFinite(result)) {
                                    p[propertiesToAverage[avProperty]].Average = 0;
                                }
                            }
                        }

                        return p;
                    },
                    function() {
                        var p = {
                            Count: 0
                        };

                        for (var property in propertiesToSum) {
                            p[propertiesToSum[property]] = p[propertiesToSum[property]] ? p[propertiesToSum[property]] : {};
                            p[propertiesToSum[property]].Sum = 0;
                        }
                        for (var avProperty in propertiesToAverage) {
                            p[propertiesToAverage[avProperty]] = p[propertiesToAverage[avProperty]] ? p[propertiesToAverage[avProperty]] : {};
                            p[propertiesToAverage[avProperty]].Average = 0;
                        }
                        for (var countProp in propertiesToCount) {
                            p[propertiesToCount[countProp]] = p[propertiesToCount[countProp]] ? p[propertiesToCount[countProp]] : {};
                            p[propertiesToCount[countProp]].Total = 0;
                        }
                        return p;
                    }
            );
        }
        this._data = data;

        if (this.cumulative()
            .length) {
            this.calculateTotals();
        }

        return this;
    };




    /**
     * This method is called when any post aggregation calculations, provided by the computeFunction() setter, need to be recalculated.
     * For example, calculating group percentages after totals have been created during map-reduce.
     * @param {object[]} data - The short name used to identify this dimension, and any linked dimensions sharing the same name
     */
    Grouping.prototype.recalculate = function() {
        if (this.cumulative()
            .length) {
            this.calculateTotals();
        }
        if (this._compute) {
            this._compute();
        }
    };


    /**
     * This method is used to return the group's data, without ordering.  It checks if there is any filtering requested and applies the filter to the return array.
     * @returns {object[]} return - The grouping's data in an object array, with an object per slice of the dimension.
     */
    Grouping.prototype.getData = function() {
        var data;

        if (!this._data) {
            this.initialize();
        }

        if (this.dimension.multiple) {
            data = this._data.value()
                .values;
        } else {
            data = this._data.all()
                .slice(0);
        }

        if (this._filterFunction) {
            data = data.filter(this._filterFunction);
        }

        return data;
    };


    /**
     * This method is used to return the group's data, with ordering applied.  It checks if there is any filtering requested and applies the filter to the return array.
     * @returns {object[]} return - The grouping's data in an object array, with an object per slice of the dimension.
     */
    Grouping.prototype.getOrderedData = function(topValues) {

        var data = [];

        if (!this._data) {
            this.initialize();
        }

        if (!this.dimension.multiple) {
            data = this._data.all()
                .slice(0)
                .sort(this.orderFunction());

            if (topValues) {
                data = data.slice(0, topValues);
            }
        } else {

            // take shallow copy of array prior to ordering so that ordering is not done in place, which would break ordering of index map. Must be better way to do this.
            data = this._data.value()
                .values
                .slice(0);

            data = data.sort(this.orderFunction());
            if (topValues) {
                data = data.slice(0, topValues);
            }
        }

        if (this._filterFunction) {
            data = data.filter(this._filterFunction);
        }

        return data;
    };


    /**
     * This getter/setter defines the post aggregation function that will be run once dimension map-reduce has been performed.  Used for any calculations that require the outputs of the map-reduce stage.
     * @returns {function}
     */
    /**
     * @param {function} compareFunction - A function taking two parameters, that compares them and returns a value greater than 0 then the second parameter will be lower in the ordering than the first.
     * @returns {this}
     */
    Grouping.prototype.computeFunction = function(c) {
        this._ordered = true;
        if (!arguments.length) {
            return this._compute;
        }
        this._compute = c.bind(this);
        return this;
    };


    /**
     * This method gets or sets the function used to compare the elements in this grouping if sorting is requested.  See <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">MDN</a> for examples of comparison functions.
     * @returns {this}
     * @param {function} function - The function to be run once once map-reduce has been performed.
     * @todo Auto-bind to this inside the setter?
     */
    Grouping.prototype.orderFunction = function(o) {
        if (!arguments.length) {
            return this._orderFunction;
        }
        this._orderFunction = o;
        return this;
    };

    Grouping.prototype.compute = function() {
        this._compute();
    };

    Grouping.prototype.valueAccessor = function(v) {
        if (!arguments.length) {
            return this._valueAccessor;
        }
        this._valueAccessor = v;
        return this;
    };


    Grouping.prototype.getDescendant = function(obj, desc) {
        var arr = desc.split(".");
        var name = desc;
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

    Grouping.prototype.calculateTotals = function() {

        var self = this;

        var cumulativeProperties = this.cumulative();

        if (cumulativeProperties.length) {
            var totals = {};

            var data = this._ordered ? this.getOrderedData() : this.getData();

            data
                .forEach(function(d, i) {

                    cumulativeProperties.map(function(propertyName) {

                        var desc = self.getDescendant(d.value, propertyName);

                        var totalName = desc.propertyName + 'Cumulative';

                        totals[totalName] = totals[totalName] ? totals[totalName] + desc.value : desc.value;

                        desc.container[totalName] = totals[totalName];

                    });

                });
        }
        return this;
    };

    return Grouping;

})(insight);
;insight.Dashboard = (function(insight) {

    /**
     * This method is called when any post aggregation calculations, provided by the computeFunction() setter, need to be recalculated.
     * @constructor
     * @returns {this} this - Description
     * @param {object} name - Description
     */
    var Dashboard = function Dashboard(name) {
        this.Name = name;
        this.Charts = [];
        this.Dimensions = [];
        this.FilteredDimensions = [];
        this.Groups = [];
        this.ComputedGroups = [];
        this.DimensionChartMap = {};

        //initialize the crossfilter to be null, populate as load() is called
        this.DataSets = [];
        this.ndx = null;

        return this;
    };


    /**
     * This method loads a JSON data set into the Dashboard, creating a new crossfiltered set and returning that to the user to reference when creating charts/groupings.
     * @returns {object} return - A crossfilter dataset
     * @param {object} data - an array of objects to add to the dashboard
     * @param {string} name - an optional name for the dataset if multiple sets are being loaded into the dashboard.
     */
    Dashboard.prototype.addData = function(data) {
        //type detection and preprocessing steps here

        var ndx = crossfilter(data);

        this.DataSets.push(ndx);

        return ndx;
    };

    Dashboard.prototype.addChart = function(chart) {

        var self = this;

        chart.triggerRedraw = this.redrawCharts.bind(this);

        this.Charts.push(chart);
        chart.series()
            .forEach(function(s) {
                if (s.data.dimension) {
                    if (self.DimensionChartMap[s.data.dimension.Name]) {
                        if (self.DimensionChartMap[s.data.dimension.Name].indexOf(chart) == -1) {
                            self.DimensionChartMap[s.data.dimension.Name].push(chart);
                        }
                    } else {
                        self.DimensionChartMap[s.data.dimension.Name] = [chart];
                    }
                }
            });

        return chart;
    };


    /**
     * This method takes a dataset, name and grouping function, returning a Grouping with a Dimension created as part of that process.
     * @returns {object} Grouping - An aggregated Grouping that can be manipulated and have calculations applied to it
     * @param {object} dataset - A crossfilter, for example, returned by the addData() method
     * @param {string} name - A uniquely identifying name for the dimension along which this grouping is created. Used to identify identical dimensions in other datasets.
     * @param {function} groupFunction - The function used to group the dimension along.  Select the property of the underlying data that the dimension is to be defined on. Rounding or data manipulation can alter the granularity of the dimension
     */
    Dashboard.prototype.group = function(dataset, name, groupFunction, multi) {

        var dim = new insight.Dimension(name, groupFunction, dataset.dimension(groupFunction), groupFunction, multi);

        this.Dimensions.push(dim);

        var group = new insight.Grouping(dim);

        group.preFilter = this.chartFilterHandler.bind(this);

        this.Groups.push(group);

        return group;
    };

    Dashboard.prototype.filterFunction = function(filter, element) {
        var value = filter.key ? filter.key : filter;

        return {
            name: value,
            filterFunction: function(d) {
                if (Array.isArray(d)) {
                    return d.indexOf(value) != -1;
                } else {
                    return String(d) == String(value);
                }
            }
        };
    };


    Dashboard.prototype.compareFilters = function(filterFunction) {
        return function(d) {
            return String(d.name) == String(filterFunction.name);
        };
    };

    Dashboard.prototype.applyCSSClasses = function(chart, value, dimensionSelector) {
        var listeningSeries = this.DimensionChartMap[chart.data.dimension.Name];

        listeningSeries.forEach(function(chart) {

            chart.highlight(dimensionSelector, value);


        });
    };

    Dashboard.prototype.chartFilterHandler = function(chart, value, dimensionSelector) {
        var self = this;

        this.applyCSSClasses(chart, value, dimensionSelector);

        var dimension = chart.data.dimension;

        var filterFunction = this.filterFunction(value);

        if (filterFunction) {
            var dims = this.Dimensions
                .filter(dimension.comparer);

            var activeDim = this.FilteredDimensions
                .filter(dimension.comparer);

            if (!activeDim.length) {
                this.FilteredDimensions.push(dimension);
            }

            var comparerFunction = this.compareFilters(filterFunction);

            dims.map(function(dim) {

                var filterExists = dim.Filters
                    .filter(comparerFunction)
                    .length;

                //if the dimension is already filtered by this value, toggle (remove) the filter
                if (filterExists) {
                    InsightUtils.removeMatchesFromArray(dim.Filters, comparerFunction);

                } else {
                    // add the provided filter to the list for this dimension

                    dim.Filters.push(filterFunction);
                }

                // reset this dimension if no filters exist, else apply the filter to the dataset.
                if (dim.Filters.length === 0) {

                    InsightUtils.removeItemFromArray(self.FilteredDimensions, dim);
                    dim.Dimension.filterAll();

                } else {
                    dim.Dimension.filter(function(d) {
                        var vals = dim.Filters
                            .map(function(func) {
                                return func.filterFunction(d);
                            });

                        return vals.filter(function(result) {
                                return result;
                            })
                            .length > 0;
                    });
                }
            });

            this.Groups.forEach(function(group) {
                group.recalculate();

            });

            this.ComputedGroups
                .forEach(
                    function(group) {
                        group.compute();
                    }
            );

            this.redrawCharts();
        }
    };

    Dashboard.prototype.initCharts = function() {
        this.Charts
            .forEach(
                function(chart) {
                    chart.init();
                });
    };


    Dashboard.prototype.redrawCharts = function() {
        for (var i = 0; i < this.Charts
            .length; i++) {
            this.Charts[i].draw();
        }
    };

    return Dashboard;
})(insight);
;insight.Series = function Series(name, chart, data, x, y, color) {

    this.chart = chart;
    this.data = data;
    this.x = x;
    this.y = y;
    this.name = name;
    this.color = d3.functor(color);
    this.animationDuration = 300;
    this.topValues = null;
    this.dimensionName = data.dimension ? data.dimension.Name + "Dim" : "";
    x.addSeries(this);
    y.addSeries(this);

    if (data.registerSeries) {
        data.registerSeries(this);
    }

    var self = this;
    var cssClass = "";

    var filter = null;

    // private functions used internally, set by functions below that are exposed on the object

    var keyFunction = function(d) {
        return d.key;
    };

    var valueFunction = function(d) {
        return d.value;
    };

    var xFunction = function(d) {
        return d.key;
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

    this.keyFunction = function(_) {
        if (!arguments.length) {
            return keyFunction;
        }
        keyFunction = _;

        return this;
    };

    this.valueFunction = function(_) {
        if (!arguments.length) {
            return valueFunction;
        }
        valueFunction = _;

        return this;
    };

    this.dataset = function() {
        //won't always be x that determines this (rowcharts, bullets etc.), need concept of ordering by data scale?

        var data = this.x.ordered() ? this.data.getOrderedData(this.topValues) : this.data.getData();

        if (filter) {
            data = data.filter(filter);
        }

        return data;
    };

    this.keys = function() {
        return this.dataset()
            .map(self.xFunction());
    };

    this.cssClass = function(_) {
        if (!arguments.length) {
            return cssClass;
        }
        cssClass = _;
        return this;
    };

    this.keyAccessor = function(d) {
        return d.key;
    };

    this.xFunction = function(_) {
        if (!arguments.length) {
            return xFunction;
        }
        xFunction = _;

        return this;
    };


    this.mouseOver = function(d, item) {
        self.chart.mouseOver(self, this, d);
    };

    this.mouseOut = function(d, item) {
        self.chart.mouseOut(self, this, d);
    };

    /**
     * This function takes a data point, and creates a class name for insight to identify this particular key
     * If the parameter is not an object (just a value in an array) then there is no need for this particular class so blank is returned.
     * @returns {string} return - A class name to identify this point and any other points taking the same value in other charts.
     * @param {object} data - The input point
     */
    this.sliceSelector = function(d) {

        var str = d.key.toString();

        var result = "in_" + str.replace(/[^A-Z0-9]/ig, "_");

        return result;
    };


    this.selectedClassName = function(name) {
        var selected = "";

        if (self.chart.selectedItems.length) {
            selected = self.chart.selectedItems.indexOf(name) > -1 ? "selected" : "notselected";
        }

        return selected;
    };


    this.click = function(element, filter) {

        var selector = self.sliceSelector(filter);

        this.clickEvent(this, filter, selector);
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

    this.maxLabelDimensions = function(measureCanvas) {

        var sampleText = document.createElement('div');
        sampleText.setAttribute('class', insight.Constants.AxisTextClass);
        var style = window.getComputedStyle(sampleText);
        var ctx = measureCanvas.getContext('2d');
        ctx.font = style['font-size'] + ' ' + style['font-family'];

        var max = 0;

        this.keys()
            .forEach(function(key) {

                var width = ctx.measureText(key)
                    .width;

                max = width > max ? width : max;
            });

        return max;
    };


    this.findMax = function(scale) {
        var self = this;

        var max = 0;
        var data = this.data.getData();

        var func = scale == self.x ? self.keyFunction() : self.valueFunction();

        var m = d3.max(data, func);

        max = m > max ? m : max;

        return max;
    };

    this.draw = function() {};

    return this;
};

/* Skeleton event overriden by a Dashboard to subscribe to this series' clicks.
 * @param {object} series - The series being clicked
 * @param {object[]} filter - The value of the point selected, used for filtering/highlighting
 * @param {object[]} selection - The css selection name also used to maintain a list of filtered dimensions (TODO - is this needed anymore?)
 */
insight.Series.prototype.clickEvent = function(series, filter, selection) {

};
;(function(insight) {

    insight.Chart = (function(insight) {

        function Chart(name, element, dimension) {

            this.name = name;
            this.element = element;
            this.dimension = dimension;
            this.selectedItems = [];

            var height = d3.functor(300);
            var width = d3.functor(300);
            var zoomable = false;
            var zoomScale = null;
            this.container = null;

            this.chart = null;

            this.measureCanvas = document.createElement("canvas");

            this._margin = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };

            var series = [];
            var scales = [];
            var axes = [];
            var self = this;
            var barPadding = d3.functor(0.1);
            var title = "";
            var autoMargin = false;


            this.addAxis = function(axis) {
                axes.push(axis);
            };

            this.axes = function() {
                return axes;
            };

            this.addClipPath = function() {
                this.chart.append("clipPath")
                    .attr("id", this.clipPath())
                    .append("rect")
                    .attr("x", 1)
                    .attr("y", 0)
                    .attr("width", this.width() - this.margin()
                        .left - this.margin()
                        .right)
                    .attr("height", this.height() - this.margin()
                        .top - this.margin()
                        .bottom);
            };

            this.init = function(create, container) {

                if (autoMargin) {
                    this.calculateLabelMargin();
                }

                this.container = create ? d3.select(container)
                    .append('div') : d3.select(this.element)
                    .append('div');

                this.container
                    .attr('class', insight.Constants.ContainerClass)
                    .style('width', this.width() + 'px')
                    .style('position', 'relative')
                    .style('display', 'inline-block');

                this.chartSVG = this.container
                    .append("svg")
                    .attr("class", insight.Constants.ChartSVG)
                    .attr("width", this.width())
                    .attr("height", this.height());

                this.chart = this.chartSVG.append("g")
                    .attr('class', insight.Constants.Chart)
                    .attr("transform", "translate(" + this.margin()
                        .left + "," + this.margin()
                        .top + ")");

                this.addClipPath();

                scales.map(function(scale) {
                    scale.initialize();
                });

                axes.map(function(axis) {
                    axis.initialize();
                    var a = axis.scale.domain();
                });

                if (zoomable) {
                    this.initZoom();
                }

                this.tooltip();

                this.draw(false);
            };

            this.resizeChart = function() {
                this.container.style('width', this.width() + "px");

                this.chartSVG
                    .attr("width", this.width())
                    .attr("height", this.height());

                this.chart = this.chart
                    .attr("transform", "translate(" + this.margin()
                        .left + "," + this.margin()
                        .top + ")");

                this.chart.select("#" + this.clipPath())
                    .append("rect")
                    .attr("x", 1)
                    .attr("y", 0)
                    .attr("width", this.width() - this.margin()
                        .left - this.margin()
                        .right)
                    .attr("height", this.height() - this.margin()
                        .top - this.margin()
                        .bottom);
            };

            this.draw = function(dragging) {
                this.resizeChart();

                this.recalculateScales();

                axes.map(function(axis) {
                    axis.draw(dragging);
                });

                this.series()
                    .map(function(series) {
                        series.draw(dragging);
                    });
            };

            this.recalculateScales = function() {
                scales.map(function(scale) {
                    var zx = zoomScale != scale;
                    if (zx) {
                        scale.initialize();
                    }
                });
            };

            this.zoomable = function(scale) {
                zoomable = true;
                zoomScale = scale;
                return this;
            };

            this.initZoom = function() {
                this.zoom = d3.behavior.zoom()
                    .on("zoom", self.dragging.bind(self));

                this.zoom.x(zoomScale.scale);

                if (!this.zoomExists()) {
                    this.chart.append("rect")
                        .attr("class", "zoompane")
                        .attr("width", this.width())
                        .attr("height", this.height() - this.margin()
                            .top - this.margin()
                            .bottom)
                        .style("fill", "none")
                        .style("pointer-events", "all");
                }

                this.chart.select('.zoompane')
                    .call(this.zoom);
            };

            this.zoomExists = function() {
                var z = this.chart.selectAll('.zoompane');
                return z[0].length;
            };

            this.dragging = function() {
                self.draw(true);
            };

            this.barPadding = function(_) {
                if (!arguments.length) {
                    return barPadding();
                }
                barPadding = d3.functor(_);
                return this;
            };

            this.margin = function(_) {
                if (!arguments.length) {
                    return this._margin;
                }
                this._margin = _;
                return this;
            };

            this.clipPath = function() {

                return this.name.split(' ')
                    .join('_') + "clip";
            };




            this.tooltip = function() {

                this.tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d) {
                        return "<span class='tipvalue'>" + d + "</span>";
                    });

                this.chart.call(this.tip);

                return this;
            };

            this.mouseOver = function(chart, item, d) {

                var tooltip = $(item)
                    .find('.tooltip')
                    .first()
                    .text();

                this.tip.show(tooltip);

                d3.select(item)
                    .classed("active", true);
            };

            this.mouseOut = function(chart, item, d) {
                this.tip.hide(d);

                d3.select(item)
                    .classed("active", false);
            };

            this.title = function(_) {
                if (!arguments.length) {
                    return title;
                }

                title = _;
                return this;
            };

            this.width = function(_) {
                if (!arguments.length) {
                    return width();
                }

                width = d3.functor(_);
                return this;
            };

            this.height = function(_) {
                if (!arguments.length) {
                    return height();
                }
                height = d3.functor(_);
                return this;
            };

            this.series = function(_) {
                if (!arguments.length) {
                    return series;
                }
                series = _;
            };


            this.scales = function(_) {
                if (!arguments.length) {
                    return scales;
                }
                scales = _;
            };


            this.addHorizontalScale = function(type, typeString, direction) {
                var scale = new Scale(this, type, direction, typeString);
            };


            this.addHorizontalAxis = function(scale) {
                var axis = new Axis(this, scale, 'h', 'left');
            };


            this.autoMargin = function(_) {
                if (!arguments.length) {
                    return autoMargin;
                }
                autoMargin = _;
                return this;
            };


            this.highlight = function(selector, value) {


                var clicked = this.chart.selectAll("." + selector);
                var alreadySelected = clicked.classed('selected');

                if (alreadySelected) {
                    clicked.classed('selected', false);
                    InsightUtils.removeItemFromArray(self.selectedItems, selector);
                } else {
                    clicked.classed('selected', true)
                        .classed('notselected', false);
                    self.selectedItems.push(selector);
                }

                var selected = this.chart.selectAll('.selected');
                var notselected = this.chart.selectAll('.bar:not(.selected),.bubble:not(.selected)');

                notselected.classed('notselected', selected[0].length > 0);
            };


            insight.addChart(this);
        }



        Chart.prototype.calculateLabelMargin = function() {

            var canvas = this.measureCanvas;
            var max = 0;

            this.series()
                .forEach(function(series) {
                    var m = series.maxLabelDimensions(canvas);
                    max = m > max ? m : max;
                });

            this.margin()
                .bottom = max;
        };


        // Helper functions for adding series without having to create the scales & axes yourself (move to builder class?)

        Chart.prototype.addColumnSeries = function(series) {

            var x = new insight.Scale(this, "", 'h', insight.Scales.Ordinal);
            var y = new insight.Scale(this, "", 'v', insight.Scales.Linear);

            var stacked = series.stacked ? true : false;

            var s = new insight.ColumnSeries(series.name, this, series.data, x, y, series.color)
                .stacked(stacked);

            s.series = [series];

            this.series()
                .push(s);

            return s;
        };


        Chart.prototype.addLineSeries = function(series) {

            var x = new insight.Scale(this, "", 'h', insight.Scales.Ordinal);
            var y = new insight.Scale(this, "", 'v', insight.Scales.Linear);

            var s = new insight.LineSeries(series.name, this, series.data, x, y, series.color)
                .valueFunction(series.accessor);

            this.series()
                .push(s);

            return s;
        };


        Chart.prototype.addBulletChart = function(options) {

            var x = new insight.Scale(this, options.name + "x", 'h', insight.Scales.Linear);
            var y = new insight.Scale(this, options.name + "y", 'v', insight.Scales.Ordinal);

            // Create the areas as stacked bars
            var s = new insight.RowSeries(options.name, this, options.ranges[0].data, x, y, 'blue')
                .stacked(true);

            // empty the hover function
            s.mouseOver = function(d) {};

            s.series = options.ranges;

            this.series()
                .push(s);

            // Create the main bar

            var row = new insight.RowSeries(options.value.name, this, options.value.data, x, y, options.value.color);

            row.barThickness = function(d) {
                return this.y.scale.rangeBand(d) * (1 / 3);
            }.bind(row);

            row.yPosition = function(d) {
                return this.y.scale(this.keyFunction()(d)) + (this.y.scale.rangeBand(d) / 3);
            }.bind(row);

            row.series = [options.value];

            this.series()
                .push(row);


            var target = new insight.MarkerSeries(options.target.name, this, options.target.data, x, y, options.target.color)
                .valueFunction(options.target.accessor)
                .widthFactor(0.3)
                .horizontal();

            this.series()
                .push(target);

            return s;
        };


        return Chart;

    })(insight);
})(insight);
;insight.MarkerSeries = function MarkerSeries(name, chart, data, x, y, color) {

    insight.Series.call(this, name, chart, data, x, y, color);

    var self = this;
    var thickness = 5;

    var widthFactor = 1;
    var offset = 0;

    var horizontal = false;
    var vertical = true;

    this.xPosition = function(d) {
        var pos = 0;

        if (vertical) {
            pos = self.x.scale(self.keyFunction()(d));

            if (!offset) {
                offset = self.calculateOffset(d);
            }

            pos = widthFactor != 1 ? pos + offset : pos;
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

            if (!offset) {
                offset = self.calculateOffset(d);
            }

            position = widthFactor != 1 ? position + offset : position;

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



    this.className = function(d) {
        var dimension = self.sliceSelector(d);

        var selected = self.selectedClassName(dimension);

        return self.name + 'class bar ' + dimension + " " + selected + " " + self.dimensionName;
    };



    this.draw = function(drag) {

        var reset = function(d) {
            d.yPos = 0;
            d.xPos = 0;
        };

        var d = this.dataset()
            .forEach(reset);

        var groups = this.chart.chart
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
            .attr('class', self.className)
            .attr('y', this.y.bounds[0])
            .attr('height', 0)
            .attr('fill', this.color)
            .attr('clip-path', 'url(#' + this.chart.clipPath() + ')')
            .on('mouseover', this.mouseOver)
            .on('mouseout', this.mouseOut)
            .on('click', click);

        newBars.append('svg:text')
            .attr('class', insight.Constants.ToolTipTextClass);

        var bars = groups.selectAll('.' + this.name + 'class.bar');

        bars
            .transition()
            .duration(duration)
            .attr('y', this.yPosition)
            .attr('x', this.xPosition)
            .attr('width', this.markerWidth)
            .attr('height', this.markerHeight);

        bars.selectAll('.' + insight.Constants.ToolTipTextClass)
            .text(this.tooltipFunction());

        groups.exit()
            .remove();
    };

    return this;
};

insight.MarkerSeries.prototype = Object.create(insight.Series.prototype);
insight.MarkerSeries.prototype.constructor = insight.MarkerSeries;
;insight.BubbleSeries = function BubbleSeries(name, chart, data, x, y, color) {

    insight.Series.call(this, name, chart, data, x, y, color);

    var radiusFunction = d3.functor(10);
    var fillFunction = d3.functor(color);
    var maxRad = d3.functor(50);
    var minRad = d3.functor(7);
    var tooltipExists = false;
    var self = this;

    var xFunction = function(d) {};
    var yFunction = function(d) {};


    var mouseOver = function(d, item) {
        self.chart.mouseOver(self, this, d);

        d3.select(this)
            .classed("hover", true);
    };

    var mouseOut = function(d, item) {
        self.chart.mouseOut(self, this, d);
    };


    this.findMax = function(scale) {
        var self = this;

        var max = 0;
        var data = this.data.getData();

        var func = scale == self.x ? self.xFunction() : self.yFunction();

        var m = d3.max(data, func);

        max = m > max ? m : max;

        return max;
    };

    this.yFunction = function(_) {
        if (!arguments.length) {
            return yFunction;
        }
        yFunction = _;

        return this;

    };


    this.xFunction = function(_) {
        if (!arguments.length) {
            return xFunction;
        }
        xFunction = _;

        return this;

    };

    this.rangeY = function(d) {
        var f = self.yFunction();

        return self.y.scale(self.yFunction()(d));
    };

    this.rangeX = function(d, i) {
        var f = self.xFunction();
        return self.x.scale(self.xFunction()(d));
    };

    this.radiusFunction = function(_) {
        if (!arguments.length) {
            return radiusFunction;
        }
        radiusFunction = _;

        return this;
    };


    this.fillFunction = function(_) {
        if (!arguments.length) {
            return fillFunction;
        }
        fillFunction = _;

        return this;
    };

    this.selector = this.name + insight.Constants.Bubble;

    this.className = function(d) {

        return self.selector + " " + insight.Constants.Bubble + " " + self.sliceSelector(d) + " " + self.dimensionName;
    };

    this.draw = function(drag) {
        var duration = drag ? 0 : function(d, i) {
            return 200 + (i * 20);
        };

        var data = this.dataset();

        var min = d3.min(data, radiusFunction);
        var max = d3.max(data, radiusFunction);

        var rad = function(d) {
            return d.radius;
        };

        var click = function(filter) {
            return self.click(this, filter);
        };


        data.forEach(function(d) {
            var radiusInput = radiusFunction(d);

            d.radius = minRad() + (((radiusInput - min) * (maxRad() - minRad())) / (max - min));
        });

        //this sort ensures that smaller bubbles are on top of larger ones, so that they are always selectable.  Without changing original array
        data = data.concat()
            .sort(function(a, b) {
                return d3.descending(rad(a), rad(b));
            });

        var bubbles = this.chart.chart.selectAll('circle.' + self.selector)
            .data(data, self.keyAccessor);

        bubbles.enter()
            .append('circle')
            .attr('class', self.className)
            .on('mouseover', mouseOver)
            .on('mouseout', mouseOut)
            .on('click', click);

        bubbles.transition()
            .duration(duration)
            .attr('r', rad)
            .attr('cx', self.rangeX)
            .attr('cy', self.rangeY)
            .attr('fill', fillFunction);

        if (!tooltipExists) {
            bubbles.append('svg:text')
                .attr('class', insight.Constants.ToolTipTextClass);
            tooltipExists = true;
        }

        bubbles.selectAll("." + insight.Constants.ToolTipTextClass)
            .text(this.tooltipFunction());
    };
};

insight.BubbleSeries.prototype = Object.create(insight.Series.prototype);
insight.BubbleSeries.prototype.constructor = insight.BubbleSeries;
;insight.RowSeries = function RowSeries(name, chart, data, x, y, color) {

    insight.Series.call(this, name, chart, data, x, y, color);

    var self = this;
    var stacked = d3.functor(false);
    var seriesName = "";
    var tooltipExists = false;

    var tooltipFunction = function(d) {
        var func = self.series[self.currentSeries].accessor;
        return self.tooltipFormat()(func(d));
    };


    this.series = [{
        name: 'default',
        accessor: function(d) {
            return self.valueFunction()(d);
        },
        tooltipValue: function(d) {
            return self.tooltipFunction()(d);
        },
        color: d3.functor('silver'),
        label: 'Value'
    }];


    /**
     * RowSeries overrides the standard key function used by most, vertical charts.
     * @returns {object[]} return - The keys along the domain axis for this row series
     */
    this.keys = function() {
        return self.dataset()
            .map(self.keyFunction());
    };


    /**
     * Given an object representing a data item, this method returns the largest value across all of the series in the ColumnSeries.
     * This function is mapped across the entire data array by the findMax method.
     * @returns {Number} return - Description
     * @param {object} data - An item in the object array to query
     */
    this.seriesMax = function(d) {
        var max = 0;
        var seriesMax = 0;

        var stacked = self.stacked();

        for (var series in self.series) {
            var s = self.series[series];

            var seriesValue = s.accessor(d);

            seriesMax = stacked ? seriesMax + seriesValue : seriesValue;

            max = seriesMax > max ? seriesMax : max;
        }

        return max;
    };


    /**
     * This method returns the largest value on the value axis of this ColumnSeries, checking all series functions in the series on all points.
     * This function is mapped across the entire data array by the findMax method.
     * @constructor
     * @returns {Number} return - The largest value on the value scale of this ColumnSeries
     */
    this.findMax = function() {
        var max = d3.max(this.data.getData(), this.seriesMax);

        return max;
    };


    /**
     * This method gets or sets whether or not the series in this ColumnSeries are to be stacked or not.  This is false by default.
     * @returns {boolean} - Whether or not the columns are stacked (they are grouped if this returns false)
     */
    /**
     * @returns {object} return - Description
     * @param {boolean} stack - To stack or not to stack
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

        var func = self.series[self.currentSeries].accessor;

        var position = self.stackedBars() ? self.x.scale(self.calculateXPos(func, d)) : 0;

        return position;
    };

    this.barThickness = function(d) {
        return self.y.scale.rangeBand(d);
    };

    this.groupedbarThickness = function(d) {

        var groupThickness = self.barThickness(d);

        var width = self.stackedBars() || (self.series.length == 1) ? groupThickness : groupThickness / self.series.length;

        return width;
    };

    this.offsetYPosition = function(d) {
        var thickness = self.groupedbarThickness(d);
        var position = self.stackedBars() ? self.yPosition(d) : self.calculateYPos(thickness, d);

        return position;
    };

    this.barWidth = function(d) {
        var func = self.series[self.currentSeries].accessor;

        return self.x.scale(func(d));
    };

    this.stackedBars = function() {
        return self.stacked();
    };

    this.className = function(d) {
        return seriesName + 'class bar ' + self.sliceSelector(d);
    };

    this.draw = function(drag) {
        var reset = function(d) {
            d.yPos = 0;
            d.xPos = 0;
        };

        var groups = this.chart.chart
            .selectAll('g.' + insight.Constants.BarGroupClass + "." + this.name)
            .data(this.dataset(), this.keyAccessor)
            .each(reset);

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

        for (var ser in this.series) {

            this.currentSeries = ser;

            var s = this.series[ser];

            seriesName = s.name;

            newBars = newGroups.append('rect')
                .attr('class', self.className)
                .attr('height', 0)
                .attr('fill', s.color)
                .attr("clip-path", "url(#" + this.chart.clipPath() + ")")
                .on('mouseover', this.mouseOver)
                .on('mouseout', this.mouseOut)
                .on('click', click);


            newBars.append('svg:text')
                .attr('class', insight.Constants.ToolTipTextClass);

            var bars = groups.selectAll('.' + seriesName + 'class.bar')
                .transition()
                .duration(duration)
                .attr('y', this.offsetYPosition)
                .attr('x', this.xPosition)
                .attr('height', this.groupedbarThickness)
                .attr('width', this.barWidth);

            bars.selectAll("." + insight.Constants.ToolTipTextClass)
                .text(tooltipFunction);
        }
    };

    return this;
};


insight.RowSeries.prototype = Object.create(insight.Series.prototype);
insight.RowSeries.prototype.constructor = insight.RowSeries;
;insight.Scale = function Scale(chart, title, direction, type) {
    var ordered = d3.functor(false);
    var self = this;

    this.scale = type.scale();

    this.rangeType = this.scale.rangeRoundBands ? this.scale.rangeRoundBands : this.scale.rangeRound;

    this.series = [];
    this.title = title;
    this.chart = chart;
    this.type = type;
    this.direction = direction;
    this.bounds = [];

    chart.scales()
        .push(this);

    this.domain = function() {
        if (type.name == insight.Scales.Linear.name) {
            return [0, this.findMax()];
        } else if (type.name == insight.Scales.Ordinal.name) {
            return this.findOrdinalValues();
        } else if (type.name == insight.Scales.Time.name) {
            return [this.minTime(), this.maxTime()];
        }
    };

    this.calculateBounds = function() {
        var bounds = [];

        if (self.horizontal()) {
            bounds[0] = 0;
            bounds[1] = self.chart.width() - self.chart.margin()
                .right - self.chart.margin()
                .left;
        } else if (self.vertical()) {
            bounds[0] = self.chart.height() - self.chart.margin()
                .top - self.chart.margin()
                .bottom;
            bounds[1] = 0;

        }
        return bounds;
    };

    this.minTime = function() {
        var minTime = new Date(8640000000000000);

        this.series.map(function(series) {
            var cMin = d3.min(series.keys());
            minTime = cMin < minTime ? cMin : minTime;
        });
        return minTime;
    };


    this.maxTime = function() {
        var maxTime = new Date(-8640000000000000);

        this.series.map(function(series) {
            var cMax = d3.max(series.keys());
            maxTime = cMax > maxTime ? cMax : maxTime;
        });

        return maxTime;
    };

    this.findOrdinalValues = function() {
        var vals = [];

        this.series.map(function(series) {
            vals = series.keys();
        });

        return vals;
    };

    this.horizontal = function() {
        return this.direction == 'h';
    };

    this.vertical = function() {
        return this.direction == 'v';
    };

    this.findMax = function() {
        var max = 0;

        this.series.map(function(series) {
            var m = series.findMax(self);

            max = m > max ? m : max;
        });

        return max;
    };

    this.addSeries = function(series) {
        this.series.push(series);
    };


    this.initialize = function() {
        this.applyScaleRange.call(this.scale.domain(this.domain()), this.rangeType);
    };

    this.calculateRange = function() {
        this.scale.domain(this.domain());
    };

    this.applyScaleRange = function(rangeType) {
        var bounds = self.calculateBounds();

        self.bounds = bounds;

        rangeType.apply(this, [
            bounds, self.chart.barPadding()
        ]);
    };

    this.ordered = function(_) {
        if (!arguments.length) {
            return ordered();
        }
        ordered = d3.functor(_);
        return this;
    };
};
;insight.Axis = function Axis(chart, name, scale, anchor) {
    this.chart = chart;
    this.scale = scale;
    this.anchor = anchor ? anchor : 'left';
    this.name = name;

    var label = scale.title;
    var self = this;

    var tickSize = d3.functor(0);
    var tickPadding = d3.functor(10);
    var labelRotation = "90";
    var labelOrientation = d3.functor("lr");
    var orientation = scale.horizontal() ? d3.functor(this.anchor) : d3.functor(this.anchor);
    var textAnchor;
    var showGridLines = false;
    var gridlines = [];

    if (scale.vertical()) {
        textAnchor = this.anchor == 'left' ? 'end' : 'start';
    }
    if (scale.horizontal()) {
        textAnchor = 'start';
    }

    var format = function(d) {
        return d;
    };

    this.chart.addAxis(this);

    this.label = function(_) {
        if (!arguments.length) {
            return label;
        }
        label = _;
        return this;
    };

    this.labelFormat = function(_) {
        if (!arguments.length) {
            return format;
        }
        format = _;
        return this;
    };

    this.orientation = function(_) {
        if (!arguments.length) {
            return orientation();
        }
        orientation = d3.functor(_);
        return this;
    };

    this.labelRotation = function(_) {
        if (!arguments.length) {
            return labelRotation;
        }
        labelRotation = _;
        return this;
    };

    this.tickSize = function(_) {
        if (!arguments.length) {
            return tickSize();
        }
        tickSize = d3.functor(_);
        return this;
    };

    this.tickPadding = function(_) {
        if (!arguments.length) {
            return tickPadding();
        }
        tickPadding = d3.functor(_);
        return this;
    };

    this.textAnchor = function(_) {
        if (!arguments.length) {
            return textAnchor;
        }
        textAnchor = _;
        return this;
    };

    this.labelOrientation = function(_) {
        if (!arguments.length) {
            return labelOrientation();
        }

        labelOrientation = d3.functor(_);

        return this;
    };

    /**
     * This method gets/sets the rotation angle used for horizontal axis labels.  Defaults to 90 degrees
     * @constructor
     * @returns {object} return - Description
     * @param {object[]} data - Description
     */
    this.tickRotation = function() {
        var offset = self.tickPadding() + (self.tickSize() * 2);
        offset = self.anchor == 'top' ? 0 - offset : offset;

        var rotation = this.labelOrientation() == 'tb' ? ' rotate(' + self.labelRotation() + ',0,' + offset + ')' : '';

        return rotation;
    };

    this.transform = function() {
        var transform = "translate(";

        if (self.scale.horizontal()) {
            var transX = 0;
            var transY = self.anchor == 'top' ? 0 : (self.chart.height() - self.chart.margin()
                .bottom - self.chart.margin()
                .top);

            transform += transX + ',' + transY + ')';

        } else if (self.scale.vertical()) {
            var xShift = self.anchor == 'left' ? 0 : self.chart.width() - self.chart.margin()
                .right - self.chart.margin()
                .left;
            transform += xShift + ",0)";
        }

        return transform;
    };

    this.labelHorizontalPosition = function() {
        var pos = "";

        if (self.scale.horizontal()) {

        } else if (self.scale.vertical()) {

        }

        return pos;
    };

    this.labelVerticalPosition = function() {
        var pos = "";

        if (self.scale.horizontal()) {

        } else if (self.scale.vertical()) {

        }

        return pos;
    };

    this.positionLabels = function(labels) {

        if (self.scale.horizontal()) {

            labels.style('left', 0)
                .style(self.anchor, 0)
                .style('width', '100%')
                .style('text-align', 'center');
        } else if (self.scale.vertical()) {
            labels.style(self.anchor, '0')
                .style('top', '35%');
        }
    };

    this.gridlines = function(_) {
        if (!arguments.length) {
            return gridlines();
        }
        showGridLines = true;
        gridlines = _;

        return this;
    };


    this.drawGridLines = function() {

        var ticks = this.scale.scale.ticks(5);

        this.chart.chart.selectAll("line.horizontalGrid")
            .data(ticks)
            .enter()
            .append("line")
            .attr({
                "class": "horizontalGrid",
                "x1": 0,
                "x2": chart.width(),
                "y1": function(d) {
                    return self.scale(d);
                },
                "y2": function(d) {
                    return self.scale(d);
                },
                "fill": "none",
                "shape-rendering": "crispEdges",
                "stroke": "silver",
                "stroke-width": "1px"
            });

    };

    this.initialize = function() {
        this.axis = d3.svg.axis()
            .scale(this.scale.scale)
            .orient(self.orientation())
            .tickSize(self.tickSize())
            .tickPadding(self.tickPadding())
            .tickFormat(self.labelFormat());

        this.chart.chart.append('g')
            .attr('class', self.name + ' ' + insight.Constants.AxisClass)
            .attr('transform', self.transform())
            .call(this.axis)
            .selectAll('text')
            .attr('class', self.name + ' ' + insight.Constants.AxisTextClass)
            .style('text-anchor', self.textAnchor())
            .style('transform', self.tickRotation());



        var labels = this.chart.container
            .append('div')
            .attr('class', self.name + insight.Constants.AxisLabelClass)
            .style('position', 'absolute')
            .text(this.label());

        this.positionLabels(labels);
    };



    this.draw = function(dragging) {
        this.axis = d3.svg.axis()
            .scale(this.scale.scale)
            .orient(self.orientation())
            .tickSize(self.tickSize())
            .tickPadding(self.tickPadding())
            .tickFormat(self.labelFormat());

        var axis = this.chart.chart.selectAll('g.' + self.name + '.' + insight.Constants.AxisClass)
            .transition()
            .duration(500)
            .attr('transform', self.transform())
            .call(this.axis);

        axis
            .selectAll("text")
            .attr('transform', self.tickRotation())
            .style('text-anchor', self.textAnchor());

        d3.select(this.chart.element)
            .select('div.' + self.name + insight.Constants.AxisLabelClass)
            .text(this.label());

        if (showGridLines) {
            //this.drawGridLines();
        }
    };
};
;insight.LineSeries = function LineSeries(name, chart, data, x, y, color) {

    insight.Series.call(this, name, chart, data, x, y, color);

    var self = this;

    var lineType = 'linear';
    var tooltipExists = false;

    var mouseOver = function(d, item) {
        self.chart.mouseOver(self, this, d);

        d3.select(this)
            .classed("hover", true);
    };

    var mouseOut = function(d, item) {
        self.chart.mouseOut(self, this, d);
    };

    var lineOver = function(d, item) {

    };

    var lineOut = function(d, item) {

    };

    var lineClick = function(d, item) {

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

    this.draw = function(dragging) {
        var transform = d3.svg.line()
            .x(self.rangeX)
            .y(self.rangeY)
            .interpolate(lineType);

        var data = this.dataset();

        var rangeIdentifier = "path." + this.name + ".in-line";

        var rangeElement = this.chart.chart.selectAll(rangeIdentifier);

        if (!this.rangeExists(rangeElement)) {
            this.chart.chart.append("path")
                .attr("class", this.name + " in-line")
                .attr("stroke", this.color)
                .attr("fill", "none")
                .attr("clip-path", "url(#" + this.chart.clipPath() + ")")
                .on('mouseover', lineOver)
                .on('mouseout', lineOut)
                .on('click', lineClick);
        }

        var duration = dragging ? 0 : function(d, i) {
            return 300 + i * 20;
        };

        this.chart.chart.selectAll(rangeIdentifier)
            .datum(this.dataset(), this.matcher)
            .transition()
            .duration(duration)
            .attr("d", transform);

        var circles = this.chart.chart.selectAll("circle")
            .data(this.dataset());

        circles.enter()
            .append('circle')
            .attr('class', 'target-point')
            .attr("clip-path", "url(#" + this.chart.clipPath() + ")")
            .attr("cx", self.rangeX)
            .attr("cy", self.chart.height() - self.chart.margin()
                .bottom - self.chart.margin()
                .top)
            .on('mouseover', mouseOver)
            .on('mouseout', mouseOut);


        circles
            .transition()
            .duration(duration)
            .attr("cx", self.rangeX)
            .attr("cy", self.rangeY)
            .attr("r", 2.5);


        if (!tooltipExists) {
            circles.append('svg:text')
                .attr('class', insight.Constants.ToolTipTextClass);
            tooltipExists = true;
        }

        circles.selectAll("." + insight.Constants.ToolTipTextClass)
            .text(this.tooltipFunction());
    };

    this.rangeExists = function(rangeSelector) {

        return rangeSelector[0].length;
    };
};

insight.LineSeries.prototype = Object.create(insight.Series.prototype);
insight.LineSeries.prototype.constructor = insight.LineSeries;
;insight.ColumnSeries = function ColumnSeries(name, chart, data, x, y, color) {

    insight.Series.call(this, name, chart, data, x, y, color);

    var self = this;
    var stacked = d3.functor(false);
    var seriesName = "";
    var barWidthFunction = this.x.rangeType;


    var tooltipFunction = function(d) {
        var func = self.series[self.currentSeries].accessor;
        return self.tooltipFormat()(func(d));
    };


    this.series = [{
        name: 'default',
        accessor: function(d) {
            return self.valueFunction()(d);
        },
        tooltipValue: function(d) {
            return self.tooltipFunction()(d);
        },
        color: d3.functor('silver'),
        label: 'Value'
    }];


    /**
     * Given an object representing a data item, this method returns the largest value across all of the series in the ColumnSeries.
     * This function is mapped across the entire data array by the findMax method.
     * @returns {Number} return - Description
     * @param {object} data - An item in the object array to query
     */
    this.seriesMax = function(d) {
        var max = 0;
        var seriesMax = 0;

        var stacked = self.stacked();

        for (var series in self.series) {
            var s = self.series[series];

            var seriesValue = s.accessor(d);

            seriesMax = stacked ? seriesMax + seriesValue : seriesValue;

            max = seriesMax > max ? seriesMax : max;
        }

        return max;
    };


    /**
     * This method returns the largest value on the value axis of this ColumnSeries, checking all series functions in the series on all points.
     * This function is mapped across the entire data array by the findMax method.
     * @constructor
     * @returns {Number} return - The largest value on the value scale of this ColumnSeries
     */
    this.findMax = function() {
        var max = d3.max(this.data.getData(), this.seriesMax);

        return max;
    };


    /**
     * This method gets or sets whether or not the series in this ColumnSeries are to be stacked or not.  This is false by default.
     * @returns {boolean} - Whether or not the columns are stacked (they are grouped if this returns false)
     */
    /**
     * @returns {object} return - Description
     * @param {boolean} stack - To stack or not to stack
     */
    this.stacked = function(_) {
        if (!arguments.length) {
            return stacked();
        }
        stacked = d3.functor(_);
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

        var func = self.series[self.currentSeries].accessor;

        var position = self.stackedBars() ? self.y.scale(self.calculateYPos(func, d)) : self.y.scale(func(d));

        return position;
    };



    this.barWidth = function(d) {
        return self.x.scale.rangeBand(d);
    };

    this.groupedBarWidth = function(d) {

        var groupWidth = self.barWidth(d);

        var width = self.stackedBars() || (self.series.length == 1) ? groupWidth : groupWidth / self.series.length;

        return width;
    };

    this.offsetXPosition = function(d) {
        var width = self.groupedBarWidth(d);
        var position = self.stackedBars() ? self.xPosition(d) : self.calculateXPos(width, d);

        return position;
    };

    this.barHeight = function(d) {
        var func = self.series[self.currentSeries].accessor;

        return (self.chart.height() - self.chart.margin()
            .top - self.chart.margin()
            .bottom) - self.y.scale(func(d));
    };

    this.stackedBars = function() {
        return self.stacked();
    };



    this.className = function(d) {
        var dimension = self.sliceSelector(d);

        var selected = self.selectedClassName(dimension);

        return seriesName + 'class bar ' + dimension + " " + selected + " " + self.dimensionName;
    };

    this.draw = function(drag) {

        var reset = function(d) {
            d.yPos = 0;
            d.xPos = 0;
        };

        var d = this.dataset()
            .forEach(reset);

        var groups = this.chart.chart
            .selectAll('g.' + insight.Constants.BarGroupClass)
            .data(this.dataset(), this.keyAccessor);

        var newGroups = groups.enter()
            .append('g')
            .attr('class', insight.Constants.BarGroupClass);

        var newBars = newGroups.selectAll('rect.bar');

        var click = function(filter) {
            return self.click(this, filter);
        };

        var duration = function(d, i) {
            return 200 + (i * 20);
        };

        for (var ser in this.series) {

            this.currentSeries = ser;

            var s = this.series[ser];

            seriesName = s.name;

            newBars = newGroups.append('rect')
                .attr('class', self.className)
                .attr('y', this.y.bounds[0])
                .attr('height', 0)
                .attr('fill', s.color)
                .attr('clip-path', 'url(#' + this.chart.clipPath() + ')')
                .on('mouseover', this.mouseOver)
                .on('mouseout', this.mouseOut)
                .on('click', click);

            newBars.append('svg:text')
                .attr('class', insight.Constants.ToolTipTextClass);

            var bars = groups.selectAll('.' + seriesName + 'class.bar');

            bars
                .transition()
                .duration(duration)
                .attr('y', this.yPosition)
                .attr('x', this.offsetXPosition)
                .attr('width', this.groupedBarWidth)
                .attr('height', this.barHeight);

            bars.selectAll('.' + insight.Constants.ToolTipTextClass)
                .text(tooltipFunction);

        }

        groups.exit()
            .remove();
    };

    return this;
};

insight.ColumnSeries.prototype = Object.create(insight.Series.prototype);
insight.ColumnSeries.prototype.constructor = insight.ColumnSeries;
