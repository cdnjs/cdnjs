/*! c3-angular - v1.0.1 - 2016-01-04
* https://github.com/jettro/c3-angular-sample
* Copyright (c) 2016 ; Licensed  */
angular.module('gridshore.c3js.chart', []);
angular.module('gridshore.c3js.chart')
    .directive('chartAxes', ChartAxes);
/**
 * @ngdoc directive
 * @name chartAxes
 * @description
 *  `chart-axes` is used to customize the axes properties. Using this directive you can select the propertie(s) to use for the different categories or for the time field. You can also configure for the different columns to use y or y2.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} valuesX Specify the key in the data object to use for the x value
 *   
 *   {@link http://c3js.org/reference.html#data-x}
 * @param {String} valuesXs Specify the different keys for different data columns in format
 *   columnId:key,columnId:key
 *
 *   {@link http://c3js.org/reference.html#data-xs}
 * @param {String} y Set the id(s) of columns to use the first y value (y). Format is comma separated.
 * 
 *   {@link http://c3js.org/reference.html#data-axes}
 * @param {String} y2 Set the id(s) of columns to use the second y value (y2) Format is comma separated.
 *
 *   {@link http://c3js.org/reference.html#data-axes}
 *
 * @example
 * Usage:
 *   <chart-axes values-x="..." values-Xs="..." y="..." y2="..."/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 */
function ChartAxes () {
    var axesLinker = function (scope, element, attrs, chartCtrl) {
        var x = attrs.valuesX;
        if (x) {
            chartCtrl.addXAxisValues(x);
        }

        var xs = attrs.valuesXs;
        var xsValues = {};
        if (xs) {
            xsItems = xs.split(",");
            for (var xsI in xsItems) {
                xsItem = xsItems[xsI].split(":");
                xsValues[xsItem[0]] = xsItem[1];
            }
            chartCtrl.addXSValues(xsValues);
        }

        var y = attrs.y;
        var y2 = attrs.y2;
        var yAxis = {};
        if (y2) {
            var items = y2.split(",");
            for (var item in items) {
                yAxis[items[item]] = "y2";
            }
            if (y) {
                var yItems = y.split(",");
                for (var yItem in yItems) {
                    yAxis[yItems[yItem]] = "y";
                }
            }
            chartCtrl.addYAxis(yAxis);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": axesLinker
    };
};

angular.module('gridshore.c3js.chart')
    .directive('chartAxis', ChartAxis);

/**
 * @ngdoc directive
 * @name chartAxis
 * @description
 *  `chart-axis` is used to customize the axis properties. Can be used to change the orientation of the axis.
 *
 * Restrict To:
 *   Element
 * 
 * Parent element:
 *   c3chart
 *
 * @param {Boolean} axisRotate Configure to rotate the axis, javascript true means we rotate the axis.
 *   
 *   {@link http://c3js.org/reference.html#axis-rotated}
 *
 * @example
 * Usage:
 *   <chart-axis axis-rotate="true"/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 */

function ChartAxis () {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var rotate = attrs.axisRotate;
        if (rotate) {
            chartCtrl.rotateAxis();
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "transclude": true,
        "template": "<div ng-transclude></div>",
        "replace": true,
        "link": axisLinker
    };
};

angular.module('gridshore.c3js.chart')
    .directive('chartAxisX', ChartAxisX);

/**
 * @ngdoc directive
 * @name chartAxisX
 * @description
 *  `chart-axis-x` is used to customize the x axis properties. Using this directive you can padding, size, visibility of the axis.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis
 *
 * @param {String} axis-position Location of the label. Can have following values:
 *
 *   - Horizontal: inner-right (default), inner-center, inner-left, outer-right, outer-center, outer-left 
 *   - Vertical: inner-top (default), inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
 *   
 *   {@link http://c3js.org/reference.html#data-x| c3js doc}
 * @param {String} axis-label Set the text for the label of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-label| c3js doc}
 * @param {Number} padding-left Set padding on the left side of the x axis.
 * 
 *   {@link http://c3js.org/reference.html#axis-x-padding| c3js doc}
 * @param {Number} padding-right Set padding on the right side of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-padding| c3js doc}
 * @param {Number} axis-height Set the overall height of the x axis, unit in pixels.
 *
 *   {@link http://c3js.org/reference.html#axis-x-height| c3js doc}
 * @param {Boolean} show Show or hide the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-show| c3js doc}
 * @param {String} axis-localtime Default is to use localtime, but can be set to false to use UTC.
 *
 *   {@link http://c3js.org/reference.html#axis-x-localtime| c3js doc}
 * @param {String} axis-min Min value of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-min| c3js doc}
 *
 * @param {String} axis-max Max value of the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-x-max | c3js doc}
 *
 * @param {String} axis-type The type of the x-axis can be one of the following three: timeseries, category or indexed (default).
 *
 *   {@link http://c3js.org/reference.html#axis-x-type | c3js doc}
 *
 * @param {String} axis-x-format Specify format of x axis data, usefull when using timeseries.
 *
 *   {@link http://c3js.org/reference.html#data-xFormat | c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-x axis-position="..." axis-label="..." padding-left="..." padding-right="..." .../>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 *   <chart-axis axis-rotate="true">
 *     <chart-axis-x axis-position="outer-center"
 *                   axis-label="The periods"
 *                   axis-type="category"/>
 *   </chart-axis>
 */

function ChartAxisX () {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var position = attrs.axisPosition;
        var label = attrs.axisLabel;

        var axis = {"label": {"text": label, "position": position}};

        var paddingLeft = attrs.paddingLeft;
        var paddingRight = attrs.paddingRight;
        if (paddingLeft || paddingRight) {
            paddingLeft = (paddingLeft) ? paddingLeft : 0;
            paddingRight = (paddingRight) ? paddingRight : 0;
            axis.padding = {"left": parseInt(paddingLeft), "right": parseInt(paddingRight)};
        }
        var height=attrs.axisHeight;
        if (height) {
            axis.height = parseInt(height);
        }
        
        if (attrs.show === 'false') {
            axis.show = false;
        }
        if (attrs.axisLocaltime === 'true') {
            axis.localtime=true;
        }
        var max=attrs.axisMax;
        if (max) {
            axis.max=max;
        }
        var min=attrs.axisMin;
        if (min) {
            axis.min=min;
        }
        var type=attrs.axisType;
        if (type) {
            axis.type=type;   
        }
        chartCtrl.addAxisProperties('x', axis);

        var xFormat = attrs.axisXFormat;
        if (xFormat) {
            chartCtrl.setXFormat(xFormat);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "transclude": true,
        "template": "<div ng-transclude></div>",
        "replace": true,
        "link": axisLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartAxisXTick', ChartAxisXTick);

/**
 * @ngdoc directive
 * @name chartAxisXTick
 * @description
 *  `chart-axis-x-tick` is used to customize the x axis tick properties. You can change the amount of ticks, the format of the tick, culling, rotating.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis-x
 *
 * @param {Number} tick-count Specify the number of ticks on the x axis.
 *   
 *   {@link http://c3js.org/reference.html#axis-x-tick-count| c3js doc}
 * @param {Boolean} tick-culling Culling means not all ticks will be shown, for category data this is by default false, for other data true.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-culling| c3js doc}
 * @param {Number} tick-culling-max Set the maximum number of ticks, if specified culling is by default true.
 * 
 *   {@link http://c3js.org/reference.html#axis-x-tick-culling-max| c3js doc}
 * @param {Boolean} tick-multiline Not sure what this does, not documented.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-multiline| c3js doc}
 * @param {Boolean} tick-centered Centers the tick on the x axis
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-centered| c3js doc}
 * @param {Number} tick-rotate Number of degrees to rotate the tick, can also be a negative number.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-rotate| c3js doc}
 * @param {Boolean} tick-fit Default is to make the tick fit the chart, if false it will be at the exact position of the x value.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-fit| c3js doc}
 *
 * @param {Boolean} tick-outer Default is not to show the outer tick, setting this to true will show the outer tick.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-outer| c3js doc}
 *
 * @param {Array} tick-values An array containing the exact values to present a tick for.
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-values| c3js doc}
 *
 * @param {String} tick-format Provide a d3 based format for the tick value.
 *   format: '$,'
 *
 * @param {String} tick-format-time Provide a d3 based format for the tick value in case of timeseries data.
 *   format: '%Y-%m-%d %H:%M:%S'
 *
 *   {@link http://c3js.org/reference.html#data-xFormat| c3js doc}
 *
 * @param {Function} tick-format-function Provide a function to format the tick value.
 *   format: function (d) { return '$' + d; }
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-format| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-x-tick tick-rotate="..." tick-count="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 *   <chart-axis>
 *     <chart-axis-x axis-position="outer-center" axis-label="Number by 10"
 *                   axis-type="category">
 *       <chart-axis-x-tick tick-rotate="50"/>
 *     </chart-axis-x>
 *   </chart-axis>
 */
function ChartAxisXTick() {
    var tickLinker = function (scope, element, attrs, chartCtrl) {
        var tick = {};

        var count = attrs.tickCount;
        if (count) {
            tick.count = count;
        }

        var culling = attrs.tickCulling;
        if (culling) {
            culling = angular.lowercase(culling);
            if (culling === 'true') {
                tick.culling = true;
            }
            else if (culling === 'false') {
                tick.culling = false;
            }
        }

        var cullingMax = attrs.tickCullingMax;
        if (cullingMax) {
            tick.culling = { max: parseInt(cullingMax) }
        }

        var multiline = attrs.tickMultiline;
        if (multiline) {
            multiline = angular.lowercase(multiline);
            if (multiline === 'true') {
                tick.multiline = true;
            }
            else if (multiline === 'false') {
                tick.multiline = false;
            }
        }

        var centered = attrs.tickCentered;
        if (centered) {
            centered = angular.lowercase(centered);
            if (centered === 'true') {
                tick.centered = true;
            }
            else if (centered === 'false') {
                tick.centered = false;
            }
        }

        var rotate = attrs.tickRotate;
        if (rotate) {
            tick.rotate = rotate;
        }

        var fit = attrs.tickFit;
        if (fit) {
            fit = angular.lowercase(fit);
            if (fit === 'true') {
                tick.fit = true;
            }
            else if (fit === 'false') {
                tick.fit = false;
            }
        }

        var tickValues = attrs.tickValues;
        if (tickValues) {
            if (tickValues) {
                if (tickValues.indexOf(',') > -1) {
                    tick.values = tickValues.split(',');
                } else {
                    tick.values = tickValues;
                }
            }
        }

        var outer = attrs.tickOuter;
        if (outer) {
            outer = angular.lowercase(outer);
            if (outer === 'true') {
                tick.outer = true;
            }
            else if (outer === 'false') {
                tick.outer = false;
            }
        }

        var format = attrs.format;
        if (format) {
            tick.format = d3.format(format);
        }

        var formatTime = attrs.formatTime;
        if (formatTime) {
            tick.format = d3.time.format(format);
        }

        chartCtrl.addXTick(tick);

        if (attrs.tickFormatFunction) {
            chartCtrl.addXTickFormatFunction(scope.tickFormatFunction());
        }

    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "tickFormatFunction": "&"
        },
        "replace": true,
        "link": tickLinker
    };
};

angular.module('gridshore.c3js.chart')
    .directive('chartAxisY', ChartAxisY);

/**
 * @ngdoc directive
 * @name chartAxisY
 * @description
 *  `chart-axis-y` is used to customize the y and y2 axis properties. Using this directive you can padding, size, visibility of the axis.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis
 *
 * @param {String} axis-id Default value is 'y' but you can also provide 'y2'
 *
 * @param {String} axis-position Location of the label. Can have following values:
 *
 *   - Horizontal: inner-right (default), inner-center, inner-left, outer-right, outer-center, outer-left 
 *   - Vertical: inner-top (default), inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
 *   
 *   {@link http://c3js.org/reference.html#data-y| c3js doc}
 * @param {String} axis-label Set the text for the label of the y or y2 axis.
 *
 *   {@link http://c3js.org/reference.html#axis-y-label| c3js doc}
 * @param {Number} padding-top Set padding on the top side of the y or y2 axis.
 * 
 *   {@link http://c3js.org/reference.html#axis-y-padding| c3js doc}
 * @param {Number} padding-bottom Set padding on the bottom side of the y or y2 axis.
 *
 *   {@link http://c3js.org/reference.html#axis-y-padding| c3js doc}
 * @param {Boolean} show Configure if the y or y2 axis should be shown.
 *
 *   {@link http://c3js.org/reference.html#axis-y-show| c3js doc}
 * @param {Number} axis-min Min value of the y our y2 axis in pixels.
 *
 *   {@link http://c3js.org/reference.html#axis-y-min| c3js doc}
 *
 * @param {Number} axis-max Max value of the y or y2 axis in pixels.
 *
 *   {@link http://c3js.org/reference.html#axis-y-max| c3js doc}
 *
 * @param {Boolean} axis-inner Position the y or y2 axis within the chart.
 *
 *   {@link http://c3js.org/reference.html#axis-y-inner| c3js doc}
 *
 * @param {Boolean} axis-inverted Invert the y or y2 axis, the default is true, from top to bottom.
 *
 *   {@link http://c3js.org/reference.html#axis-y-inverted| c3js doc}
 *
 * @param {Number} axis-center Set the center of the y or y2 axis, is a numeric value.
 *
 *   {@link http://c3js.org/reference.html#axis-y-center| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-y axis-position="..." axis-label="..." padding-top="..." padding-bottom="..." .../>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 *   <chart-axis>
 *     <chart-axis-y axis-id="y"
 *                 axis-position="outer-right"
 *                 axis-label="Higher numbers"
 *                 padding-top="100"
 *                 padding-bottom="0"
 *                 range-min="0"/>
 *     <chart-axis-y axis-id="y2"
 *                 axis-position="outer-right"
 *                 axis-label="Lower numbers"
 *                 padding-top="10"
 *                 padding-bottom="0"
 *                 range-max="100"
 *                 range-min="0"/>
 *  </chart-axis>
 */

function ChartAxisY() {
    var axisLinker = function (scope, element, attrs, chartCtrl) {
        var id = attrs.axisId;
        var position = attrs.axisPosition;
        var label = attrs.axisLabel;

        id = ( id == undefined ? 'y' : id );

        var axis = {"label": {"text": label, "position": position}};
        if (attrs.show === 'false') {
            axis.show = false;
        } else if (id === 'y2') {
            axis.show = true;
        }
        var paddingTop = attrs.paddingTop;
        var paddingBottom = attrs.paddingBottom;
        if (paddingTop || paddingBottom) {
            paddingTop = (paddingTop) ? paddingTop : 0;
            paddingBottom = (paddingBottom) ? paddingBottom : 0;
            axis.padding = {"top": parseInt(paddingTop), "bottom": parseInt(paddingBottom)};
        }
        var axisMax = attrs.axisMax;
        var axisMin = attrs.axisMin;
        if (axisMax) {
            axis.max = parseInt(axisMax);
        }
        if (axisMin) {
            axis.min = parseInt(axisMin);
        }
        if (attrs.axisInverted === 'true') {
            axis.inverted=true;
        }
        if (attrs.axisInner === 'true') {
            axis.inner=true;
        }
        var axisCenter = attrs.axisCenter;
        if (axisCenter) {
            axis.center = parseInt(axisCenter);
        }

        chartCtrl.addAxisProperties(id, axis);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": axisLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartAxisYTick', ChartAxisYTick);

/**
 * @ngdoc directive
 * @name chartAxisYTick
 * @description
 *  `chart-axis-y-tick` is used to customize the y or y2 axis tick properties. You can change the amount of ticks, the format of the tick, culling, rotating.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   chart-axis-y
 *
 * @param {Number} tick-count Specify the number of ticks on the x axis.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-count| c3js doc}
 *
 * @param {Boolean} tick-outer Default is not to show the outer tick, setting this to true will show the outer tick.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-outer| c3js doc}
 *
 * @param {Array} tick-values An array containing the exact values to present a tick for.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-values| c3js doc}
 *
 * @param {Function} tick-format Provide a d3 based format for the tick value.
 *   format: '$,'
 *
 *   {@link http://c3js.org/reference.html#axis-x-tick-format| c3js doc}
 *
 * @param {Function} tick-format-function Provide a function to format the tick value.
 *
 *   {@link http://c3js.org/reference.html#axis-y-tick-format| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-axis-y-tick tick-outer="..." tick-count="..."/>
 *
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 */
function ChartAxisYTick() {
    var tickLinker = function (scope, element, attrs, chartCtrl) {
        var tick = {};

        var count = attrs.tickCount;
        if (count) {
            tick.count = count;
        }

        var outer = attrs.tickOuter;
        if (outer) {
            outer = angular.lowercase(outer);
            if (outer === 'true') {
                tick.outer = true;
            }
            else if (outer === 'false') {
                tick.outer = false;
            }
        }

        var tickValues = attrs.tickValues;
        if (tickValues) {
            if (tickValues.indexOf(',') > -1) {
                tick.values = tickValues.split(',');
            } else {
                tick.values = tickValues;
            }
        }

        var format = attrs.tickFormat;
        if (format) {
            tick.format = d3.format(format);
        }

        chartCtrl.addYTick(tick);

        if (attrs.tickFormatFunction) {
            chartCtrl.addYTickFormatFunction(scope.tickFormatFunction());
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "tickFormatFunction": "&"
        },
        "replace": true,
        "link": tickLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartBar', ChartBar);
/**
 * @ngdoc directive
 * @name chartBar
 * @description
 *  `chart-bar` is used to customize the axes properties. Using this directive you can select the propertie(s) to use for the different categories or for the time field. You can also configure for the different columns to use y or y2.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Number} width Fixed with of the bars in pixels
 *   
 *   {@link http://c3js.org/reference.html#bar-width| c3js doc}
 * 
 * @param {Number} ratio Change the width of the bar by ratio
 *
 *   {@link http://c3js.org/reference.html#bar-width-ratio| c3js doc}
 * @param {Boolean} zerobased Set if we start from zero, default is true.
 * 
 *   {@link http://c3js.org/reference.html#bar-zerobased| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-bar width="..." ratio="..." zerobased="..."/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 */

function ChartBar() {
    var barLinker = function (scope, element, attrs, chartCtrl) {
        var bar = {};
        if (attrs.width) {
            bar.width = parseInt(attrs.width);
        }
        if (attrs.ratio) {
            if (!bar.width) {
                bar.width = {};
            }
            bar.width.ratio = parseFloat(attrs.ratio);
        }
        if (attrs.zerobased) {
            bar.zerobased = (attrs.zerobased === 'true');
        }
        chartCtrl.addBar(bar);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: barLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('c3chart', ['$timeout', function(timeout) {
        return C3Chart(timeout);
    }]);

/**
 * @ngdoc directive
 * @name C3Chart
 * @description
 *   `c3chart` is the main directive to create the chart. Use it to set the padding properties and include the other directives. You can also register the callback in this directive that receives the initialised chart object.
 *
 *   When using multiple charts in the same page you need to provide unique bind-id parameters.
 * 
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   -
 *
 * @param {Number} padding-top Set the top padding of the chart.
 *   
 *   {@link http://c3js.org/reference.html#padding-top| c3js doc}
 * 
 * @param {Number} padding-bottom Set the bottom padding of the chart.
 *
 *   {@link http://c3js.org/reference.html#padding-bottom| c3js doc}
 * @param {Number} padding-right Set the right padding of the chart.
 * 
 *   {@link http://c3js.org/reference.html#padding-right| c3js doc}
 *
 * @param {Number} padding-left Set the left padding of the chart.
 * 
 *   {@link http://c3js.org/reference.html#padding-left| c3js doc}
 *
 * @param {String} bind-id Id of the chart, needs to be unique when using multiple charts on one page.
 * 
 *   {@link http://c3js.org/reference.html#bindto| c3js doc}
 *
 * @param {String} sort-data You can enter three different versions: asc, desc, null. Using this sorting you can change the order of stacking and the order of the pieces of a pie or donut.
 * 
 *   {@link http://c3js.org/reference.html#data-order| c3js doc}
 *
 * @param {Boolean} show-labels Configure to show the labels 'true' or not, default is false.
 * 
 *   {@link http://c3js.org/reference.html#data-labels| c3js doc}
 *
 * @param {Function} labels-format-function Provide a function to format the labels.
 * 
 *   {@link http://c3js.org/reference.html#data-labels-format| c3js doc}
 *
 * @param {Boolean} show-subchart Configure to show the subchart or not (default).
 * 
 *   {@link http://c3js.org/reference.html#subchart-show| c3js doc}
 *
 * @param {Boolean} enable-zoom Configure to enable zoom in the chart or not (defaut).
 * 
 *   {@link http://c3js.org/reference.html#subchart-show| c3js doc}
 *
 * @param {Boolean} enable-zoom Configure to enable zoom in the chart or not (defaut).
 * 
 *   {@link http://c3js.org/reference.html#subchart-show| c3js doc}
 *
 * @param {Array} chart-data Provide a reference to a collection that can contain dynamic data. When providing this attrbiute you also need to provide the chart-columns attribute.
 * 
 *   Array consisting of objects with values for the different columns: [{"data1":10,"data2":20},{"data1":50,"data2":60}]
 *
 * @param {Array} chart-columns Provide a reference to a collection that contains the columns. When providing this attrbiute you also need to provide the chart-data attribute.
 * 
 *   Array consisting of objects with some properties for the different columns: [{"id": "data1", "type": "line"}, {"id": "data2", "type": "bar"}]
 *
 * @param {Object} chart-x Provide information about the x column. Used when adding dynamic data to specify the field that contains the x data value.
 * 
 *   Object containing reference to the id of the x data field: {"id": "x", "name": "My Data points"}
 *
 * @param {Function} callback-function Use this if you want to interact with the chart object using the api
 * 
 *   {@link http://c3js.org/reference.html#api-focus| c3js doc}
 *
 * @param {Number} transition-duration Duration of transition (in milliseconds) for chart animation. If you specify 0, transitions will be disabled which is good for large datasets.
 *
 *   {@link http://c3js.org/reference.html#transition-duration| c3js doc}
 *
 * @param {Object} initial-config Provide the initial config object to start the graph with.
 *
 * @example
 * Usage:
 *   <c3chart >
 *      <!-- sub elements -->
 *   </c3chart>
 * 
 * Example:
 *
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * Shows how to use dynamic data points.
 * 
 * <c3chart bindto-id="dynamicpie" chart-data="piePoints" chart-columns="pieColumns"/>
 * 
 *     $scope.piePoints = [{"data1": 70, "data2": 30, "data3": "100"}];
 *     $scope.pieColumns = [{"id": "data1", "type": "pie"}, {"id": "data2", "type": "pie"}, {
 *       "id": "data3",
 *       "type": "pie"
 *
 * Show how to register a callback function and use it. The screen contains a button to toggle the legend visibility.
 *
 * <c3chart bindto-id="dynamicpie" chart-data="piePoints" chart-columns="pieColumns"
 *        callback-function="handleCallback"/>
 *
 *     $scope.handleCallback = function (chartObj) {
 *       $scope.theChart = chartObj;
 *   };
 *
 *   $scope.legendIsShown = true;
 *   $scope.toggleLegend = function() {
 *       if ($scope.legendIsShown) {
 *           $scope.theChart.legend.hide();
 *       } else {
 *           $scope.theChart.legend.show();
 *       }
 *       $scope.legendIsShown= !$scope.legendIsShown;
 *       $scope.theChart.flush();
 *   };
 */
function C3Chart ($timeout) {
    var chartLinker = function (scope, element, attrs, chartCtrl) {
        var paddingTop = attrs.paddingTop;
        var paddingRight = attrs.paddingRight;
        var paddingBottom = attrs.paddingBottom;
        var paddingLeft = attrs.paddingLeft;
        var sortData = attrs.sortData;
        var transitionDuration = attrs.transitionDuration;
        var initialConfig = attrs.initialConfig;

        if (paddingTop) {
            chartCtrl.addPadding('top', paddingTop);
        }
        if (paddingRight) {
            chartCtrl.addPadding('right', paddingRight);
        }
        if (paddingBottom) {
            chartCtrl.addPadding('bottom', paddingBottom);
        }
        if (paddingLeft) {
            chartCtrl.addPadding('left', paddingLeft);
        }
        if (sortData) {
            chartCtrl.addSorting(sortData);
        }
        if (attrs.labelsFormatFunction) {
            chartCtrl.addDataLabelsFormatFunction(scope.labelsFormatFunction());
        }
        if (attrs.callbackFunction) {
            chartCtrl.addChartCallbackFunction(scope.callbackFunction());
        }
        if (transitionDuration) {
            chartCtrl.addTransitionDuration(transitionDuration);
        }
        if (initialConfig) {
            chartCtrl.addInitialConfig(initialConfig);
        }
        // Trick to wait for all rendering of the DOM to be finished.
        $timeout(function () {
            chartCtrl.showGraph();
        });
    };

    return {
        "restrict": "E",
        "controller": "ChartController",
        "scope": {
            "bindto": "@bindtoId",
            "showLabels": "@showLabels",
            "labelsFormatFunction": "&",
            "showSubchart": "@showSubchart",
            "enableZoom": "@enableZoom",
            "chartData": "=chartData",
            "chartColumns": "=chartColumns",
            "chartX": "=chartX",
            "callbackFunction": "&"
        },
        "template": "<div><div id='{{bindto}}'></div><div ng-transclude></div></div>",
        "replace": true,
        "transclude": true,
        "link": chartLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartColors', ChartColors);

/**
 * @ngdoc directive
 * @name chartColors
 * @description
 *  `chart-colors` is used to specify the colors to use in the chart. You can provide the colors or a function to determine the colors.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} color-pattern A string containing comma separated hex colors
 * @param {String} thresholds A string containing comma separated numeric values
 *   
 * {@link http://c3js.org/reference.html#color-pattern| c3js docs}
 * @param {Function} color-function Provide a function that receives the value to determine a color for that value.
 *
 * {@link http://c3js.org/reference.html#data-color| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-color color-pattern="..." color-function="..." thresholds="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 *   
 */
function ChartColors () {
    var colorsLinker = function (scope, element, attrs, chartCtrl) {
        var pattern = attrs.colorPattern;
        if (pattern) {
            chartCtrl.addColors(pattern.split(","));
        }

        var thresholds = attrs.thresholds;
        if(thresholds){
            chartCtrl.addColorThresholds(thresholds.split(","));
        }
        
        if (attrs.colorFunction) {
            chartCtrl.addColorFunction(scope.colorFunction());
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "colorFunction": "&"
        },
        "replace": true,
        "link": colorsLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartColumn', ChartColumn);

/**
 * @ngdoc directive
 * @name chartColumn
 * @description
 *  `chart-column` Used to provide data values for the chart as well as the name and some other config options.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} column-id The id used to uniquely identify the column
 *   
 * @param {String} column-values The values for this column to plot.
 *
 * @param {String} column-type The type of the column to show: line, spline, bar, step, area, area-spline, area-step, scatter, pie, donut, gauge
 *
 *   {@link http://c3js.org/reference.html#data-type| c3js docs}
 *
 * @param {String} column-name The name of the column as used to print in the label.
 *
 *   {@link http://c3js.org/reference.html#data-names| c3js docs}
 *
 * @param {String} column-color The color to use for this column.
 *
 *   {@link http://c3js.org/reference.html#data-names| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-column column-values="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-column column-id="data 1"
 *               column-name="Data 1"
 *               column-color="red"
 *               column-values="30,200,100,400,150,250"
 *               column-type="spline"/>  
 * 
 */
function ChartColumn () {
    var columnLinker = function (scope, element, attrs, chartCtrl) {
        var column = attrs.columnValues.split(",");
        column.unshift(attrs.columnId);
        chartCtrl.addColumn(column, attrs.columnType, attrs.columnName, attrs.columnColor);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": columnLinker
    };
}

angular.module('gridshore.c3js.chart')
    /**
     * @controller
     */
    .controller('ChartController', ChartController);

ChartController.$inject = ['$scope', '$timeout'];
function ChartController($scope, $timeout) {
    this.showGraph = showGraph;

    this.addColumn = addColumn;
    this.addAxisProperties = addAxisProperties;
    this.rotateAxis = rotateAxis;
    this.addPadding = addPadding;
    this.addSorting = addSorting;
    this.addSize = addSize;

    this.addColors = addColors;
    this.addColorThresholds = addColorThresholds;
    this.addColorFunction = addColorFunction;

    this.addGrid = addGrid;
    this.addGridLine = addGridLine;
    this.hideGridFocus = hideGridFocus;

    this.addLegend = addLegend;

    this.addTooltip = addTooltip;
    this.addTooltipTitleFormatFunction = addTooltipTitleFormatFunction;
    this.addTooltipNameFormatFunction = addTooltipNameFormatFunction;
    this.addTooltipValueFormatFunction = addTooltipValueFormatFunction;

    this.addYAxis = addYAxis;
    this.addYTick = addYTick;
    this.addYTickFormatFunction = addYTickFormatFunction;

    this.addXAxisValues = addXAxisValues;
    this.addXTick = addXTick;
    this.addXTickFormatFunction = addXTickFormatFunction;
    this.addXType = addXType;
    this.addXSValues = addXSValues;

    this.addChartCallbackFunction = addChartCallbackFunction;
    this.addInitialConfig = addInitialConfig;

    this.addDataLabelsFormatFunction = addDataLabelsFormatFunction;
    this.addTransitionDuration = addTransitionDuration;

    this.addGauge = addGauge;
    this.addGaugeLabelFormatFunction = addGaugeLabelFormatFunction;

    this.addBar = addBar;

    this.addLine = addLine;

    this.addPie = addPie;
    this.addPieLabelFormatFunction = addPieLabelFormatFunction;

    this.addDonut = addDonut;
    this.addDonutLabelFormatFunction = addDonutLabelFormatFunction;

    this.addGroup = addGroup;

    this.addPoint = addPoint;

    this.addOnInitFunction = addOnInitFunction;
    this.addOnMouseoverFunction = addOnMouseoverFunction;
    this.addOnMouseoutFunction = addOnMouseoutFunction;
    this.addOnRenderedFunction = addOnRenderedFunction;
    this.addOnResizeFunction = addOnResizeFunction;
    this.addOnResizedFunction = addOnResizedFunction;
    this.addDataOnClickFunction = addDataOnClickFunction;
    this.addDataOnMouseoverFunction = addDataOnMouseoverFunction;
    this.addDataOnMouseoutFunction = addDataOnMouseoutFunction;

    this.setXFormat = setXFormat;

    resetVars();

    function resetVars() {
        $scope.chart = null;
        $scope.columns = [];
        $scope.types = {};
        $scope.axis = {};
        $scope.axes = {};
        $scope.padding = null;
        $scope.xValues = null;
        $scope.xFormat = null;
        $scope.xsValues = null;
        $scope.xTick = null;
        $scope.yTick = null;
        $scope.names = null;
        $scope.grid = null;
        $scope.legend = null;
        $scope.tooltip = null;
        $scope.chartSize = null;
        $scope.colors = null;
        $scope.colorThresholds = null;
        $scope.gauge = null;
        $scope.jsonKeys = null;
        $scope.groups = null;
        $scope.sorting = null;
        $scope.transitionDuration = null;
        $scope.initialConfig = null;
    }

    function showGraph() {
        var config = {};
        if ($scope.initialConfig) {
            config = $scope.initialConfig;
        }
        config.bindto = "#" + $scope.bindto;
        config.data = config.data || {};

        if ($scope.xValues) {
            config.data.x = $scope.xValues;
        }
        if ($scope.xsValues) {
            config.data.xs = $scope.xsValues;
        }
        if ($scope.columns) {
            config.data.columns = $scope.columns;
        }
        if ($scope.xFormat) {
            config.data.xFormat = $scope.xFormat;
        }
        config.data.types = config.data.types || $scope.types;
        config.data.axes = config.data.axes || $scope.axes;
        if ($scope.names) {
            config.data.names = $scope.names;
        }
        if ($scope.padding != null) {
            config.padding = $scope.padding;
        }
        if ($scope.sorting != null) {
            if ($scope.sorting == "null") {
                config.data.order = null;
            } else {
                config.data.order = $scope.sorting;
            }
        }
        if ($scope.transitionDuration != null) {
            config.transition = config.transition || {};
            config.transition.duration = $scope.transitionDuration;
        }
        if ($scope.colors) {
            config.data.colors = $scope.colors;
        }
        if ($scope.colorFunction) {
            config.data.color = $scope.colorFunction;
        }
        if ($scope.showLabels && $scope.showLabels === "true") {
            config.data.labels = true;
        }
        if ($scope.dataLabelsFormatFunction) {
            config.data.labels = config.data.labels || {};
            config.data.labels.format = $scope.dataLabelsFormatFunction;
        }
        if ($scope.groups != null) {
            config.data.groups = $scope.groups;
        }
        if ($scope.showSubchart && $scope.showSubchart === "true") {
            config.subchart = {"show": true};
        }
        if ($scope.enableZoom && $scope.enableZoom === "true") {
            config.zoom = {"enabled": true};
        }
        config.axis = config.axis || $scope.axis;
        if ($scope.xTick) {
            config.axis.x.tick = $scope.xTick;
        }
        if ($scope.xTickFormatFunction) {
            config.axis.x.tick = config.axis.x.tick || {};
            config.axis.x.tick.format = $scope.xTickFormatFunction;
        }

        if ($scope.xType) {
            config.axis.x.type = $scope.xType;
        }
        if ($scope.yTick) {
            config.axis.y.tick = $scope.yTick;
        }
        if ($scope.yTickFormatFunction) {
            config.axis.y.tick = config.axis.y.tick || {};
            config.axis.y.tick.format = $scope.yTickFormatFunction;
        }

        if ($scope.grid != null) {
            config.grid = $scope.grid;
        }
        if ($scope.legend != null) {
            config.legend = $scope.legend;
        }
        if ($scope.tooltip != null) {
            config.tooltip = $scope.tooltip;
        } else {
            config.tooltip = {}
        }
        if ($scope.tooltipTitleFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.title = $scope.tooltipTitleFormatFunction;
        }
        if ($scope.tooltipNameFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.name = $scope.tooltipNameFormatFunction;
        }
        if ($scope.tooltipValueFormatFunction) {
            config.tooltip.format = config.tooltip.format || {};
            config.tooltip.format.value = $scope.tooltipValueFormatFunction;
        }

        if ($scope.chartSize != null) {
            config.size = $scope.chartSize;
        }
        if ($scope.colors != null) {
            config.color = {"pattern": $scope.colors};
            config.color = {
                "pattern": $scope.colors,
                "threshold": {
                    "values": $scope.colorThresholds
                }
            };
        }
        if ($scope.gauge != null) {
            config.gauge = $scope.gauge;
        } else {
            config.gauge = {}
        }
        if ($scope.gaugeLabelFormatFunction) {
            config.gauge.label = config.gauge.label || {};
            config.gauge.label.format = $scope.gaugeLabelFormatFunction;
        }
        if ($scope.point != null) {
            config.point = $scope.point;
        }
        if ($scope.bar != null) {
            config.bar = $scope.bar;
        }
        if ($scope.line != null) {
            config.line = $scope.line;
        }
        if ($scope.pie != null) {
            config.pie = $scope.pie;
        }
        if ($scope.pieLabelFormatFunction) {
            config.pie.label = config.pie.label || {};
            config.pie.label.format = $scope.pieLabelFormatFunction;
        }
        if ($scope.donut != null) {
            config.donut = $scope.donut;
        } else {
            config.donut = {}
        }
        if ($scope.donutLabelFormatFunction) {
            config.donut.label = config.donut.label || {};
            config.donut.label.format = $scope.donutLabelFormatFunction;
        }
        if ($scope.onInit != null) {
            config.oninit = $scope.onInit;
        }
        if ($scope.onMouseover != null) {
            config.onmouseover = $scope.onMouseover;
        }
        if ($scope.onMouseout != null) {
            config.onmouseout = $scope.onMouseout;
        }
        if ($scope.onRendered != null) {
            config.onrendered = $scope.onRendered;
        }
        if ($scope.onResize != null) {
            config.onresize = $scope.onResize;
        }
        if ($scope.onResized != null) {
            config.onresized = $scope.onResized;
        }
        if ($scope.dataOnClick != null) {
            config.data.onclick = function (data, element) {
                $scope.$apply(function () {
                    $scope.dataOnClick({"data": data});
                });
            };
        }
        if ($scope.dataOnMouseover != null) {
            config.data.onmouseover = function (data) {
                $scope.$apply(function () {
                    $scope.dataOnMouseover({"data": data});
                });
            };
        }
        if ($scope.dataOnMouseout != null) {
            config.data.onmouseout = function (data) {
                $scope.$apply(function () {
                    $scope.dataOnMouseout({"data": data});
                });
            };
        }

        $scope.config = config;

        if ($scope.chartData && $scope.chartColumns) {
            $scope.$watch('chartData', function () {
                loadChartData();
            }, true);
        } else {
            $scope.chart = c3.generate($scope.config);
            if ($scope.chartCallbackFunction) {
                $scope.chartCallbackFunction($scope.chart);
            }
        }

        $scope.$on('$destroy', function () {
            $timeout(function () {
                if (angular.isDefined($scope.chart)) {
                    $scope.chart = $scope.chart.destroy();
                    resetVars();
                }
            }, 10000)
        });
    }

    function addColumn(column, columnType, columnName, columnColor) {
        $scope.columns.push(column);
        addColumnProperties(column[0], columnType, columnName, columnColor);
    }

    function addYAxis(yAxis) {
        $scope.axes = yAxis;
        if (!$scope.axis.y2) {
            $scope.axis.y2 = {"show": true};
        }
    }

    function addDataLabelsFormatFunction(dataLabelsFormatFunction) {
        $scope.dataLabelsFormatFunction = dataLabelsFormatFunction;
    }

    function addChartCallbackFunction(chartCallbackFunction) {
        $scope.chartCallbackFunction = chartCallbackFunction;
    }

    function addTransitionDuration(transitionDuration) {
        $scope.transitionDuration = transitionDuration;
    }

    function addXAxisValues(xValues) {
        $scope.xValues = xValues;
    }

    function addXSValues(xsValues) {
        $scope.xsValues = xsValues;
    }

    function addAxisProperties(id, axis) {
        $scope.axis[id] = axis;
    }

    function addXTick(tick) {
        $scope.xTick = tick;
    }

    function addXTickFormatFunction(xTickFormatFunction) {
        $scope.xTickFormatFunction = xTickFormatFunction;
    }

    function addXType(type) {
        $scope.xType = type;
    }

    function addYTick(tick) {
        $scope.yTick = tick;
    }

    function addYTickFormatFunction(yTickFormatFunction) {
        $scope.yTickFormatFunction = yTickFormatFunction;
    }

    function rotateAxis() {
        $scope.axis.rotated = true;
    }

    function addPadding(side, amount) {
        if ($scope.padding == null) {
            $scope.padding = {};
        }
        $scope.padding[side] = parseInt(amount);
    }

    function addSorting(sorting) {
        $scope.sorting = sorting;
    }

    function addGrid(axis) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if ($scope.grid[axis] == null) {
            $scope.grid[axis] = {};
        }
        $scope.grid[axis].show = true;
    }

    function addGridLine(axis, value, text) {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        if (axis === "x") {
            if ($scope.grid.x === undefined) {
                $scope.grid.x = {};
            }
            if ($scope.grid.x.lines === undefined) {
                $scope.grid.x.lines = [];
            }
        } else {
            if ($scope.grid.y === undefined) {
                $scope.grid.y = {};
            }
            if ($scope.grid.y.lines === undefined) {
                $scope.grid.y.lines = [];
            }

        }
        if (axis === "y2") {
            $scope.grid.y.lines.push({"value": value, "text": text, "axis": "y2"});
        } else {
            $scope.grid[axis].lines.push({"value": value, "text": text});
        }
    }

    function addLegend(legend) {
        $scope.legend = legend;
    }

    function addTooltip(tooltip) {
        $scope.tooltip = tooltip;
    }

    function addTooltipTitleFormatFunction(tooltipTitleFormatFunction) {
        $scope.tooltipTitleFormatFunction = tooltipTitleFormatFunction;
    }

    function addTooltipNameFormatFunction(tooltipNameFormatFunction) {
        $scope.tooltipNameFormatFunction = tooltipNameFormatFunction;
    }

    function addTooltipValueFormatFunction(tooltipValueFormatFunction) {
        $scope.tooltipValueFormatFunction = tooltipValueFormatFunction;
    }

    function addSize(chartSize) {
        $scope.chartSize = chartSize;
    }

    function addColors(colors) {
        $scope.colors = colors;
    }

    function addColorThresholds(thresholds) {
        $scope.colorThresholds = thresholds;
        if ($scope.colors) {
            $scope.colors.threshold = {
                "values": $scope.colorThresholds
            }
        }
    }

    function addColorFunction(colorFunction) {
        $scope.colorFunction = colorFunction;
    }

    function addOnInitFunction(onInitFunction) {
        $scope.onInit = onInitFunction;
    }

    function addOnMouseoverFunction(onMouseoverFunction) {
        $scope.onMouseover = onMouseoverFunction;
    }

    function addOnMouseoutFunction(onMouseoutFunction) {
        $scope.onMouseout = onMouseoutFunction;
    }

    function addOnRenderedFunction(onRederedFunction) {
        $scope.onRendered = onRederedFunction;
    }

    function addOnResizeFunction(onResizeFunction) {
        $scope.onResize = onResizeFunction;
    }

    function addOnResizedFunction(onResizedFuncton) {
        $scope.onResized = onResizedFuncton;
    }

    function addDataOnClickFunction(theFunction) {
        $scope.dataOnClick = theFunction;
    }

    function addDataOnMouseoverFunction(theFunction) {
        $scope.dataOnMouseover = theFunction;
    }

    function addDataOnMouseoutFunction(theFunction) {
        $scope.dataOnMouseout = theFunction;
    }

    function addGauge(gauge) {
        $scope.gauge = gauge;
    }

    function addGaugeLabelFormatFunction(gaugeLabelFormatFunction) {
        $scope.gaugeLabelFormatFunction = gaugeLabelFormatFunction;
    }

    function addBar(bar) {
        $scope.bar = bar;
    }

    function addLine(line) {
        $scope.line = line;
    }

    function addPie(pie) {
        $scope.pie = pie;
    }

    function addPieLabelFormatFunction(pieLabelFormatFunction) {
        $scope.pieLabelFormatFunction = pieLabelFormatFunction;
    }

    function addDonut(donut) {
        $scope.donut = donut;
    }

    function addDonutLabelFormatFunction(donutLabelFormatFunction) {
        $scope.donutLabelFormatFunction = donutLabelFormatFunction;
    }

    function addGroup(group) {
        if ($scope.groups == null) {
            $scope.groups = [];
        }
        $scope.groups.push(group);
    }

    function addPoint(point) {
        $scope.point = point;
    }

    function hideGridFocus() {
        if ($scope.grid == null) {
            $scope.grid = {};
        }
        $scope.grid["focus"] = {"show": false};
    }

    function setXFormat(xFormat) {
        $scope.xFormat = xFormat;
    }

    function addInitialConfig(initialConfig) {
        $scope.initialConfig = initialConfig;
    }

    function addColumnProperties(id, columnType, columnName, columnColor) {
        if (columnType !== undefined) {
            $scope.types[id] = columnType;
        }
        if (columnName !== undefined) {
            if ($scope.names === null) {
                $scope.names = {};
            }
            $scope.names[id] = columnName;
        }
        if (columnColor !== undefined) {
            if ($scope.colors === null) {
                $scope.colors = {};
            }
            $scope.colors[id] = columnColor;
        }
    }

    function loadChartData() {
        $scope.jsonKeys = {};
        $scope.jsonKeys.value = [];
        angular.forEach($scope.chartColumns, function (column) {
            $scope.jsonKeys.value.push(column.id);
            addColumnProperties(column.id, column.type, column.name, column.color);
        });
        if ($scope.chartX) {
            $scope.jsonKeys.x = $scope.chartX.id;
        }
        if ($scope.names) {
            $scope.config.data.names = $scope.names;
        }
        if ($scope.colors) {
            $scope.config.data.colors = $scope.colors;
        }
        if ($scope.groups) {
            $scope.config.data.groups = $scope.groups;
        }

        $scope.config.data.keys = $scope.jsonKeys;
        $scope.config.data.json = $scope.chartData;

        if (!$scope.chartIsGenerated) {
            $scope.chart = c3.generate($scope.config);
            $scope.chartIsGenerated = true;

            // Use the API as documented here to interact with the chart object
            // http://c3js.org/reference.html#api
            if ($scope.chartCallbackFunction) {
                $scope.chartCallbackFunction($scope.chart);
            }
        } else {
            $scope.config.data.unload = true;
            $scope.chart.load($scope.config.data);
        }
    }
}
angular.module('gridshore.c3js.chart')
    .directive('chartDonut', ChartDonut);
/**
 * @ngdoc directive
 * @name chartDonut
 * @description
 *  `chart-donut` SPecific configuration options for creating a donut chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} show-label Show labels in the Donut.
 *
 *   {@link http://c3js.org/reference.html#donut-label-show| c3js docs}
 *   
 * @param {Number} threshold-label Set the threshold to show or hide labels.
 *
 *   {@link http://c3js.org/reference.html#donut-label-threshold| c3js docs}
 * 
 * @param {Boolean} expand Enable or disable whether to expand a pie part. True is the default.
 *
 *   {@link http://c3js.org/reference.html#donut-expand| c3js docs}
 *
 * @param {Number} width The width of the donut.
 *
 *   {@link http://c3js.org/reference.html#donut-width| c3js docs}
 *
 * @param {String} title The title for the donut chart.
 *
 *   {@link http://c3js.org/reference.html#donut-title| c3js docs}
 *
 * @param {Function} label-format-function Function to format the labels.
 *
 *   {@link http://c3js.org/reference.html#donut-label-format| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-donut show-label="..." threshold-label="..." expand="..." width="..." title="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <c3chart bindto-id="donut-plot1-chart">
 *   <chart-column column-id="Data 1"
 *                 column-values="70"
 *                 column-type="donut"/>
 *   <chart-column column-id="Data 2"
 *                 column-values="35"
 *                 column-type="donut"/>
 *   <chart-column column-id="Data 3"
 *                 column-values="60"
 *                 column-type="donut"/>
 *   <chart-donut title="Donut" width="60"/>
 * </c3chart>
 */    
function ChartDonut() {
    var donutLinker = function (scope, element, attrs, chartCtrl) {
        var donut = {};
        if (attrs.showLabel) {
            donut.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.thresholdLabel) {
            if (!donut.label) {
                donut.label = {};
            }
            donut.label.threshold = parseFloat(attrs.thresholdLabel);
        }
        if (attrs.expand) {
            donut.expand = (attrs.expand === 'true');
        }
        if (attrs.width) {
            donut.width = parseInt(attrs.width);
        }
        if (attrs.title) {
            donut.title = attrs.title;
        }
        chartCtrl.addDonut(donut);
        if (attrs.labelFormatFunction) {
            chartCtrl.addDonutLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            "labelFormatFunction": "&"
        },
        replace: true,
        link: donutLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartEvents', ChartEvents);

/**
 * @ngdoc directive
 * @name chartEvents
 * @description
 *  `chart-events` Used to provide callback functions to respond to events of the charts.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Function} on-init The on init callback function.
 *   
 *   {@link http://c3js.org/reference.html#oninit| c3js docs}
 *
 * @param {Function} on-rendered Provide the callback to respond to on-rendered. Basically, this callback will be called in each time when the chart is redrawed.
 *
 *   {@link http://c3js.org/reference.html#onrendered| c3js docs}
 *
 * @param {Function} on-mouseover Provide callback to be called when you hoover the chart.
 *
 *   {@link http://c3js.org/reference.html#onmouseover| c3js docs}
 *
 * @param {Function} on-mouseout Provide callback to be called when you hoover out of the chart.
 *
 *   {@link http://c3js.org/reference.html#onmouseout| c3js docs}
 *
 * @param {Function} on-resize Provide callback to be called when the chart is resizing.
 *
 *   {@link http://c3js.org/reference.html#onresize| c3js docs}
 *
 * @param {Function} on-resized Provide callback to be called when the chart is resized.
 *
 *   {@link http://c3js.org/reference.html#onresized| c3js docs}
 *
 * @param {Function} on-click-data Provide callback to be called one of the data points, lines, bars, etc. is clicked.
 *
 *   {@link http://c3js.org/reference.html#onclickdata| c3js docs}
 *
 * @param {Function} on-mouseover-data Provide callback to be called one of the data points, lines, bars, etc. is hoovered.
 *
 *   {@link http://c3js.org/reference.html#onclickdata| c3js docs}
 *
 * @param {Function} on-mouseout-data Provide callback to be called one of the data points, lines, bars, etc. is hoovered out.
 *
 *   {@link http://c3js.org/reference.html#onclickdata| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-events on-init="..." on-rendered="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 *   <c3chart bindto-id="donut-plot1-chart">
 *     <chart-column column-id="Data 1"
 *                   column-values="70"
 *                   column-type="donut"/>
 *     <chart-column column-id="Data 2"
 *                   column-values="35"
 *                   column-type="donut"/>
 *     <chart-column column-id="Data 3"
 *                   column-values="60"
 *                   column-type="donut"/>
 *     <chart-donut title="Donut" width="60"/>
 *     <chart-events on-click-data="showClick(data)"/>
 *   </c3chart>
 *
 *   graphApp.controller('GraphCtrl', function ($scope) {
 *     $scope.clicked = {};
 *     $scope.showClick = function(data) {
 *     $scope.clicked = data;
 *   }
 */
function ChartEvents() {
    var eventsLinker = function (scope, element, attrs, chartCtrl) {
        if (attrs.onInit) {
            chartCtrl.addOnInitFunction(scope.onInit);
        }
        if (attrs.onMouseover) {
            chartCtrl.addOnMouseoverFunction(scope.onMouseover);
        }
        if (attrs.onMouseout) {
            chartCtrl.addOnMouseoutFunction(scope.onMouseout);
        }
        if (attrs.onResize) {
            chartCtrl.addOnResizeFunction(scope.onResize);
        }
        if (attrs.onResized) {
            chartCtrl.addOnResizedFunction(scope.onResized);
        }
        if (attrs.onRendered) {
            chartCtrl.addOnRenderedFunction(scope.onRendered);
        }
        if (attrs.onClickData) {
            chartCtrl.addDataOnClickFunction(scope.onClickData);
        }
        if (attrs.onMouseoverData) {
            chartCtrl.addDataOnMouseoverFunction(scope.onMouseoverData);
        }
        if (attrs.onMouseoutData) {
            chartCtrl.addDataOnMouseoutFunction(scope.onMouseoutData);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "onInit": "&",
            "onMouseover": "&",
            "onMouseout": "&",
            "onResize": "&",
            "onResized": "&",
            "onRendered": "&",
            "onClickData": "&",
            "onMouseoverData": "&",
            "onMouseoutData": "&"
        },
        "replace": true,
        "link": eventsLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartGauge', ChartGauge);
/**
 * @ngdoc directive
 * @name chartGauge
 * @description
 *  `chart-gauge` is used to specify specific properties when creating a guage chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Number} min The minimum value used in the Gauge.
 *   
 *   {@link http://c3js.org/reference.html#gauge-min| c3js docs}
 *
 * @param {Number} max The maximum value used in the Guage.
 *
 *   {@link http://c3js.org/reference.html#gauge-max| c3js docs}
 *
 * @param {Number} width The width of the Guage.
 *
 *   {@link http://c3js.org/reference.html#gauge-width| c3js docs}
 *
 * @param {String} units Set the units of the gauge, ' %' for instance.
 *
 *   {@link http://c3js.org/reference.html#gauge-units| c3js docs}
 *
 * @param {Boolean} show-label Set to false to hide the labels, default is true.
 *
 *   {@link http://c3js.org/reference.html#gauge-label-show| c3js docs}
 *
 * @param {Boolean} expand Set to false to prevent expanding the gauge, default is true.
 *
 *   {@link http://c3js.org/reference.html#gauge-expand| c3js docs}
 *
 * @param {Function} label-format-function Function to format the labels.
 *
 *   {@link http://c3js.org/reference.html#gauge-label-format| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-gauge min="..." max="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 *   
 */
function ChartGauge () {
    var gaugeLinker = function (scope, element, attrs, chartCtrl) {
        var gauge = {};
        if (attrs.min) {
            gauge.min = parseInt(attrs.min);
        }
        if (attrs.max) {
            gauge.max = parseInt(attrs.max);
        }
        if (attrs.width) {
            gauge.width = parseInt(attrs.width);
        }
        if (attrs.units) {
            gauge.units = attrs.units
        }
        if (attrs.showLabel) {
            gauge.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.expand) {
            gauge.expand = (attrs.expand === 'true');
        }
        chartCtrl.addGauge(gauge);
        if (attrs.labelFormatFunction) {
            chartCtrl.addGaugeLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            'labelFormatFunction': "&"
        },
        replace: true,
        link: gaugeLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartGrid', ChartGrid);

/**
 * @ngdoc directive
 * @name chartGrid
 * @description
 *  `chart-grid` is used to specify properties to show a grid.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showX Whether to show the x axis grid.
 *   
 *   {@link http://c3js.org/reference.html#grid-x-show| c3js docs}
 *
 * @param {Boolean} showY Whether to show the y axis grid.
 *
 *   {@link http://c3js.org/reference.html#grid-y-show| c3js docs}
 *
 * @param {Boolean} showY2 Whether to show the y2 axis grid.
 *
 *   {@link http://c3js.org/reference.html#grid-y-show| c3js docs}
 *
 * @param {Boolean} showFocus Whether to enable the focus grid.
 *
 *   {@link http://c3js.org/reference.html#grid-focus-show| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-grid showX="..." showY="..." showY2="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-grid show-x="false" show-y="true">
 *   <chart-grid-optional axis-id="x" grid-value="1" grid-text="Start"/>
 *   <chart-grid-optional axis-id="y" grid-value="20" grid-text="Minimum"/>
 *   <chart-grid-optional axis-id="y" grid-value="200" grid-text="Maximum"/>
 * </chart-grid>  
 */
function ChartGrid () {
    var gridLinker = function (scope, element, attrs, chartCtrl) {
        var showX = attrs.showX;
        if (showX && showX === "true") {
            chartCtrl.addGrid("x");
        }
        var showY = attrs.showY;
        if (showY && showY === "true") {
            chartCtrl.addGrid("y");
        }
        var showY2 = attrs.showY2;
        if (showY2 && showY2 === "true") {
            chartCtrl.addGrid("y2");
        }
        var showFocus = attrs.showFocus;
        if (showFocus && showFocus === "false") {
            chartCtrl.hideGridFocus();
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": gridLinker,
        "transclude": true,
        "template": "<div ng-transclude></div>"
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartGridOptional', ChartGridOptional);
/**
 * @ngdoc directive
 * @name chartGridOptional
 * @description
 *  `chart-grid-optional` is used to add optional grid lines to the chart. All attributes are mandatory
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   gridDirective
 *
 * @param {String} axisId x, y or y2.
 *   
 *   {@link http://c3js.org/reference.html#grid-x-lines| c3js docs}
 *
 * @param {Number} value Value where to print the additional grid line.
 *
 *   {@link http://c3js.org/reference.html#grid-x-lines| c3js docs}
 *
 * @param {String} text Label to print at the grid line.
 *
 *   {@link http://c3js.org/reference.html#grid-x-lines| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-grid-optional axis-id="..." value="..." text="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-grid show-x="false" show-y="true">
 *   <chart-grid-optional axis-id="x" grid-value="1" grid-text="Start"/>
 *   <chart-grid-optional axis-id="y" grid-value="20" grid-text="Minimum"/>
 *   <chart-grid-optional axis-id="y" grid-value="200" grid-text="Maximum"/>
 * </chart-grid>  
 */
function ChartGridOptional() {
    var gridLinker = function (scope, element, attrs, chartCtrl) {
        var axisId = attrs.axisId;
        var value = attrs.gridValue;
        var text = attrs.gridText;

        chartCtrl.addGridLine(axisId, value, text);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": gridLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartGroup', ChartGroup);

/**
 * @ngdoc directive
 * @name chartGroup
 * @description
 *  `chart-group` is used to group columns, for instance to add them to the 
 * same column for the same x value. Input is a comma separated string with the
 * id's of the columns to group.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} groupValues Comma separated column ids.
 *   
 *   {@link http://c3js.org/reference.html#data-groups| c3js docs}
 *
 *
 * @example
 * Usage:
 *   <chart-group group-values="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <c3chart bindto-id="stacked-bar-plot1-chart">
 *   <chart-column column-id="data 1"
 *             column-name="Data 1"
 *             column-color="red"
 *             column-values="30,200,100,400,150,250"
 *             column-type="bar"/>
 *   <chart-column column-id="data 2"
 *             column-name="Data 2"
 *             column-color="green"
 *             column-values="50,20,10,40,15,25"
 *             column-type="bar"/>
 *   <chart-group group-values="data 1,data 2"/>
 * </c3chart>  
 */
function ChartGroup () {
    var groupLinker = function (scope, element, attrs, chartCtrl) {
        var group = attrs.groupValues.split(",");
        chartCtrl.addGroup(group);
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": groupLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartLegend', ChartLegend);

/**
 * @ngdoc directive
 * @name chartLegend
 * @description
 *  `chart-legend` is used configure the legend to add to the chart. You can also add function to handle events related
 *  to the legend: onClick, onMouseOver and onMouseOut.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showLegend Whether to show the legend or not, default is show.
 *
 *   {@link http://c3js.org/reference.html#legend-show| c3js docs}
 *
 * @param {String} legendPosition One of the following values: bottom, right, inset.
 *
 *   {@link http://c3js.org/reference.html#legend-position| c3js docs}
 *
 * @param {Function} onMouseover Provide callback to be called when you hoover the legend.
 *
 *   {@link http://c3js.org/reference.html#legend-item-onmouseover| c3js docs}
 *
 * @param {Function} onMouseout Provide callback to be called when you hoover out of the legend.
 *
 *   {@link http://c3js.org/reference.html#legend-item-onmouseout| c3js docs}
 *
 * @param {Function} onClick Provide callback to be called when you click the legend.
 *
 *   {@link http://c3js.org/reference.html#legend-item-onmouseout| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-legend show-legend="..." legend-position="..." on-click="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-legend show-legend="true" legend-position="right"/>
 */
function ChartLegend () {
    var legendLinker = function (scope, element, attrs, chartCtrl) {
        var legend = null;
        var show = attrs.showLegend;
        if (show && show === "false") {
            legend = {"show": false};
        } else {
            var position = attrs.legendPosition;
            if (position) {
                legend = {"position": position};
            }
            var inset = attrs.legendInset;
            if (inset) {
                legend = {"position":"inset","inset":{"anchor":inset}};
            }
        }

        if (attrs.onMouseover) {
            legend = legend || {};
            legend.item = legend.item || {};
            legend.item.onmouseover = function (data) {
                scope.$apply(function () {
                    scope.onMouseover({"data": data});
                });
            };
        }
        if (attrs.onMouseout) {
            legend = legend || {};
            legend.item = legend.item || {};
            legend.item.onmouseout = function (data) {
                scope.$apply(function () {
                    scope.onMouseout({"data": data});
                });
            };
        }
        if (attrs.onClick) {
            legend = legend || {};
            legend.item = legend.item || {};

            legend.item.onclick = function (data) {
                scope.$apply(function () {
                    scope.onClick({"data": data});
                });
            };
        }

        if (legend != null) {
            chartCtrl.addLegend(legend);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "onMouseover": "&",
            "onMouseout": "&",
            "onClick": "&"
        },
        "replace": true,
        "link": legendLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartLine', ChartLine);
/**
 * @ngdoc directive
 * @name chartLine
 * @description
 *  `chart-line` is used to customize the line chart properties..
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {String} stepType Step types for step chart: step, step-before and step-after.
 *
 *   {@link http://c3js.org/reference.html#line-step_type| c3js doc}
 *
 * @param {Boolean} connectNull Should null data point be connected or not.
 *
 *   {@link http://c3js.org/reference.html#bar-width-ratio| c3js doc}
 *
 * @example
 * Usage:
 *   <chart-line step-type="..." connect-null="..."/>
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 *
 */

function ChartLine() {
    var lineLinker = function (scope, element, attrs, chartCtrl) {
        var line = {};
        if (attrs.stepType) {
            line.step = line.step || {};
            line.step.type = attrs.stepType;
        }
        if (attrs.connectNull) {
            line.connectNull = (attrs.connectNull === 'true');
        }
        chartCtrl.addLine(line);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: lineLinker
    };
}


angular.module('gridshore.c3js.chart')
    .directive('chartPie', ChartPie);

/**
 * @ngdoc directive
 * @name chartPie
 * @description
 *  `chart-pie` is used configure additional properties for a pie chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showLabel Whether to show a label for each pie part.
 *   
 *   {@link http://c3js.org/reference.html#pie-label-show| c3js docs}
 *
 * @param {Boolean} expand Whether to expand on mouse over.
 *   
 *   {@link http://c3js.org/reference.html#pie-expand| c3js docs}
 *
 * @param {Number} thresholdLabel Show label if value is higher than the provided value.
 *
 *   {@link http://c3js.org/reference.html#pie-label-threshold| c3js docs}
 *
 * @param {Function} labelFormatFunction Present a function to format the label.
 *
 *   {@link http://c3js.org/reference.html#pie-label-format| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-pie show-label="..." expand="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <c3chart bindto-id="pie-plot1-chart">
 *   <chart-column column-id="Data 1" column-values="70" column-type="pie"/>
 *   <chart-column column-id="Data 2" column-values="35" column-type="pie"/>
 *   <chart-column column-id="Data 3" column-values="60" column-type="pie"/>
 *   <chart-pie expand="true"/>
 * </c3chart>
 */
function ChartPie () {
    var pieLinker = function (scope, element, attrs, chartCtrl) {
        var pie = {};
        if (attrs.showLabel) {
            pie.label = {"show": (attrs.showLabel === 'true')};
        }
        if (attrs.thresholdLabel) {
            if (!pie.label) {
                pie.label = {};
            }
            pie.label.threshold = parseFloat(attrs.thresholdLabel);
        }
        if (attrs.expand) {
            pie.expand = (attrs.expand === 'true');
        }
        chartCtrl.addPie(pie);
        if (attrs.labelFormatFunction) {
            chartCtrl.addPieLabelFormatFunction(scope.labelFormatFunction());
        }
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {
            "labelFormatFunction": "&"
        },
        replace: true,
        link: pieLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartPoints', ChartPoints);

/**
 * @ngdoc directive
 * @name chartPoints
 * @description
 *  `chart-points` is used configure the points in for example a line chart. You can
 * configure the radius of the point in normal as well as expand state.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showPoint Whether to show points in the chart.
 *   
 *   {@link http://c3js.org/reference.html#point-show| c3js docs}
 *
 * @param {Boolean} pointExpandEnabled Whether to expand on mouse over.
 *   
 *   {@link http://c3js.org/reference.html#point-focus-expand-enabled| c3js docs}
 *
 * @param {Number} pointExpandRadius Radius of the point when expanded. Default is 1.75 times the 
 * normal radius.
 *
 *   {@link http://c3js.org/reference.html#point-focus-expand-r| c3js docs}
 *
 * @param {Number} pointRadius Radius of the point in normal mode. Default radius is 2.5
 *
 *   {@link http://c3js.org/reference.html#point-r| c3js docs}
 *
 * @param {Number} pointSelectRadius Radius of the point when selected, default is 4 times the normal radius.
 *
 *   {@link http://c3js.org/reference.html#point-select-r| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-points show-point="..." point-expand-enabled="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 */
function ChartPoints () {
    var pointLinker = function (scope, element, attrs, chartCtrl) {
        var point = {};
        if (attrs.showPoint) {
            point.show =  (attrs.showPoint === 'true');
        }
        if (attrs.pointExpandEnabled) {
            if (!point.focus) {
                point.focus = {"expand":{}};
            }
            point.focus.expand.enabled = (attrs.pointsFocusEnabled !== 'false');
        }
        if (attrs.pointExpandRadius) {
            if (!point.focus) {
                pie.focus = {"expand":{}};
            }
            point.focus.expand.r = parseInt(attrs.pointFocusRadius);
        }
        if (attrs.pointRadius) {
            point.r = parseInt(attrs.pointRadius);
        }
        if (attrs.pointSelectRadius) {
            point.select = {"r":parseInt(attrs.pointSelectRadius)};
        }
        chartCtrl.addPoint(point);
    };

    return {
        require: '^c3chart',
        restrict: 'E',
        scope: {},
        replace: true,
        link: pointLinker
    };
}
angular.module('gridshore.c3js.chart')
    .directive('chartSize', ChartSize);

/**
 * @ngdoc directive
 * @name chartSize
 * @description
 *  `chart-size` is used to configure size properties of the chart.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Number} chartWidth Width of the chart element, by default it will be 
 * calculated from the parent container.
 *   
 *   {@link http://c3js.org/reference.html#size-width| c3js docs}
 *
 * @param {Number} chartHeight Height of the chart element, by default it will be 
 * calculated from the parent container.
 *   
 *   {@link http://c3js.org/reference.html#size-height| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-size chart-height="..." chart-width="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 * <chart-size chart-height="600" chart-width="600"/>
 */
function ChartSize() {
    var sizeLinker = function (scope, element, attrs, chartCtrl) {
        var chartSize = null;
        var width = attrs.chartWidth;
        var height = attrs.chartHeight;
        if (width || height) {
            chartSize = {};
            if (width) {
                chartSize.width = parseInt(width);
            }
            if (height) {
                chartSize.height = parseInt(height);
            }
            chartCtrl.addSize(chartSize);
        }
    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {},
        "replace": true,
        "link": sizeLinker
    };
}

angular.module('gridshore.c3js.chart')
    .directive('chartTooltip', ChartTooltip);

/**
 * @ngdoc directive
 * @name chartTooltip
 * @description
 *  `chart-tooltip` is used to configure the look and feel of the tooltip. You can
 * configure to show the tooltip or not and the formatting of labels, values, etc.
 *
 * Restrict To:
 *   Element
 *
 * Parent Element:
 *   c3chart
 *
 * @param {Boolean} showTooltip Whether to show the tooltip or not.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-show| c3js docs}
 *
 * @param {Boolean} hideTooltipTitle Whether to show the tooltip title or not.
 *   
 * @param {Boolean} groupTooltip Whether to group all tooltips of the different 
 * columns in the chart.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-grouped| c3js docs}
 *
 * @param {Function} titleFormatFunction Function to format the title of the tooltip.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-format-title| c3js docs}
 *
 * @param {Function} nameFormatFunction Function to format the name of the tooltip.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-format-name| c3js docs}
 *
 * @param {Function} valueFormatFunction Function to format the value of the tooltip.
 *   
 *   {@link http://c3js.org/reference.html#tooltip-format-value| c3js docs}
 *
 * @example
 * Usage:
 *   <chart-size chart-height="..." chart-width="..."/>
 * 
 * Example:
 *   {@link http://jettro.github.io/c3-angular-directive/#examples}
 * 
 */
function ChartTooltip () {
    var tooltipLinker = function (scope, element, attrs, chartCtrl) {
        var tooltip = null;
        var show      = attrs.showTooltip;
        var hideTitle = attrs.hideTooltipTitle;
        var joined    = attrs.joinedTooltip;

        if (show && show === "false") {
            tooltip = {"show": false};
        } else {
            var grouped = attrs.groupTooltip;
            if (grouped && grouped === "false") {
                tooltip = {"grouped": false};
            }
        }

        if (joined && joined === "true") {
            tooltip = tooltip || {};
            tooltip.contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
                var $$ = this, config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat  = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor, CLASS;
                CLASS = {
                    tooltipContainer: 'c3-tooltip-container',
                    tooltip         : 'c3-tooltip',
                    tooltipName     : 'c3-tooltip-name'
                };
                for (i = d[0].x; i < (d[0].x + 1); i++) {
                    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    if (! text) {
                        title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                        text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                    }

                    value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    if (value !== undefined) {
                        name = nameFormat(d[i].name, d[i].ratio, d[i].id, d[i].index);
                        bgcolor = $$.levelColor ? $$.levelColor(d[i].value) : color(d[i].id);

                        text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                        text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                        text += "<td class='value'>" + value + "</td>";
                        text += "</tr>";
                    }
                }
                return text + "</table>";
            }
        }

        if (tooltip != null) {
            chartCtrl.addTooltip(tooltip);
        }
        if (attrs.titleFormatFunction) {
            chartCtrl.addTooltipTitleFormatFunction(scope.titleFormatFunction());
        }
        if (attrs.nameFormatFunction) {
            chartCtrl.addTooltipNameFormatFunction(scope.nameFormatFunction());
        }
        if (attrs.valueFormatFunction) {
            chartCtrl.addTooltipValueFormatFunction(scope.valueFormatFunction());
        }

    };

    return {
        "require": "^c3chart",
        "restrict": "E",
        "scope": {
            "valueFormatFunction": '&',
            "nameFormatFunction" : "&",
            "titleFormatFunction": "&"
        },
        "replace": true,
        "link": tooltipLinker
    };
}