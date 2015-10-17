/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.0.11
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @author GitHub contributors
 * @license MIT
 * @year 2013
 */
(function (document, window, angular) {
    'use strict';

    angular.module('googlechart', [])

        .value('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        })

        .provider('googleJsapiUrl', function () {
            var protocol = 'https:';
            var url = '//www.google.com/jsapi';

            this.setProtocol = function(newProtocol) {
                protocol = newProtocol;
            };

            this.setUrl = function(newUrl) {
                url = newUrl;
            };

            this.$get = function() {
                return (protocol ? protocol : '') + url;
            };
        })
        .factory('googleChartApiPromise', ['$rootScope', '$q', 'googleChartApiConfig', 'googleJsapiUrl', function ($rootScope, $q, apiConfig, googleJsapiUrl) {
            var apiReady = $q.defer();
            var onLoad = function () {
                // override callback function
                var settings = {
                    callback: function () {
                        var oldCb = apiConfig.optionalSettings.callback;
                        $rootScope.$apply(function () {
                            apiReady.resolve();
                        });

                        if (angular.isFunction(oldCb)) {
                            oldCb.call(this);
                        }
                    }
                };

                settings = angular.extend({}, apiConfig.optionalSettings, settings);

                window.google.load('visualization', apiConfig.version, settings);
            };
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');

            script.setAttribute('type', 'text/javascript');
            script.src = googleJsapiUrl;

            if (script.addEventListener) { // Standard browsers (including IE9+)
                script.addEventListener('load', onLoad, false);
            } else { // IE8 and below
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        onLoad();
                    }
                };
            }

            head.appendChild(script);

            return apiReady.promise;
        }])
        .directive('googleChart', ['$timeout', '$window', '$rootScope', 'googleChartApiPromise', function ($timeout, $window, $rootScope, googleChartApiPromise) {
            return {
                restrict: 'A',
                scope: {
                    beforeDraw: '&',
                    chart: '=chart',
                    onReady: '&',
                    onSelect: '&',
                    select: '&'
                },
                link: function ($scope, $elm, $attrs) {
                    /* Watches, to refresh the chart when its data, formatters, options, view,
                        or type change. All other values intentionally disregarded to avoid double
                        calls to the draw function. Please avoid making changes to these objects
                        directly from this directive.*/
                    $scope.$watch(function () {
                        if ($scope.chart) {
                            return {
                                customFormatters: $scope.chart.customFormatters,
                                data: $scope.chart.data,
                                formatters: $scope.chart.formatters,
                                options: $scope.chart.options,
                                type: $scope.chart.type,
                                view: $scope.chart.view
                            };
                        }
                        return $scope.chart;
                    }, function () {
                        drawAsync();
                    }, true); // true is for deep object equality checking

                    // Redraw the chart if the window is resized
                    var resizeHandler = $rootScope.$on('resizeMsg', function () {
                        $timeout(function () {
                            // Not always defined yet in IE so check
                            if($scope.chartWrapper) {
                                drawAsync();
                            }
                        });
                    });

                    //Cleanup resize handler.
                    $scope.$on('$destroy', function () {
                        resizeHandler();
                    });

                    // Keeps old formatter configuration to compare against
                    $scope.oldChartFormatters = {};

                    function applyFormat(formatType, formatClass, dataTable) {

                        if (typeof($scope.chart.formatters[formatType]) != 'undefined') {
                            if (!angular.equals($scope.chart.formatters[formatType], $scope.oldChartFormatters[formatType])) {
                                $scope.oldChartFormatters[formatType] = $scope.chart.formatters[formatType];
                                $scope.formatters[formatType] = [];

                                if (formatType === 'color') {
                                    for (var cIdx = 0; cIdx < $scope.chart.formatters[formatType].length; cIdx++) {
                                        var colorFormat = new formatClass();

                                        for (i = 0; i < $scope.chart.formatters[formatType][cIdx].formats.length; i++) {
                                            var data = $scope.chart.formatters[formatType][cIdx].formats[i];

                                            if (typeof(data.fromBgColor) != 'undefined' && typeof(data.toBgColor) != 'undefined')
                                                colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor);
                                            else
                                                colorFormat.addRange(data.from, data.to, data.color, data.bgcolor);
                                        }

                                        $scope.formatters[formatType].push(colorFormat)
                                    }
                                } else {

                                    for (var i = 0; i < $scope.chart.formatters[formatType].length; i++) {
                                        $scope.formatters[formatType].push(new formatClass(
                                            $scope.chart.formatters[formatType][i])
                                        );
                                    }
                                }
                            }


                            //apply formats to dataTable
                            for (i = 0; i < $scope.formatters[formatType].length; i++) {
                                if ($scope.chart.formatters[formatType][i].columnNum < dataTable.getNumberOfColumns())
                                    $scope.formatters[formatType][i].format(dataTable, $scope.chart.formatters[formatType][i].columnNum);
                            }


                            //Many formatters require HTML tags to display special formatting
                            if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color')
                                $scope.chart.options.allowHtml = true;
                        }
                    }

                    function draw() {
                        if (!draw.triggered && ($scope.chart != undefined)) {
                            draw.triggered = true;
                            $timeout(function () {

                                if (typeof ($scope.chartWrapper) == 'undefined') {
                                    var chartWrapperArgs = {
                                        chartType: $scope.chart.type,
                                        dataTable: $scope.chart.data,
                                        view: $scope.chart.view,
                                        options: $scope.chart.options,
                                        containerId: $elm[0]
                                    };

                                    $scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                                    google.visualization.events.addListener($scope.chartWrapper, 'ready', function () {
                                        $scope.chart.displayed = true;
                                        $scope.$apply(function (scope) {
                                            scope.onReady({ chartWrapper: scope.chartWrapper });
                                        });
                                    });
                                    google.visualization.events.addListener($scope.chartWrapper, 'error', function (err) {
                                        console.log("Chart not displayed due to error: " + err.message + ". Full error object follows.");
                                        console.log(err);
                                    });
                                    google.visualization.events.addListener($scope.chartWrapper, 'select', function () {
                                        var selectedItem = $scope.chartWrapper.getChart().getSelection()[0];
                                        $scope.$apply(function () {
                                            if ($attrs.select) {
                                                console.log('Angular-Google-Chart: The \'select\' attribute is deprecated and will be removed in a future release.  Please use \'onSelect\'.');
                                                $scope.select({ selectedItem: selectedItem });
                                            }
                                            else {
                                                $scope.onSelect({ selectedItem: selectedItem });
                                            }
                                        });
                                    });
                                }
                                else {
                                    $scope.chartWrapper.setChartType($scope.chart.type);
                                    $scope.chartWrapper.setDataTable($scope.chart.data);
                                    $scope.chartWrapper.setView($scope.chart.view);
                                    $scope.chartWrapper.setOptions($scope.chart.options);
                                }

                                if (typeof($scope.formatters) === 'undefined')
                                    $scope.formatters = {};

                                if (typeof($scope.chart.formatters) != 'undefined') {
                                    applyFormat("number", google.visualization.NumberFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("arrow", google.visualization.ArrowFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("date", google.visualization.DateFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("bar", google.visualization.BarFormat, $scope.chartWrapper.getDataTable());
                                    applyFormat("color", google.visualization.ColorFormat, $scope.chartWrapper.getDataTable());
                                }

                                var customFormatters = $scope.chart.customFormatters;
                                if (typeof(customFormatters) != 'undefined') {
                                    for (var name in customFormatters) {
                                        applyFormat(name, customFormatters[name], $scope.chartWrapper.getDataTable());
                                    }
                                }

                                $timeout(function () {
                                    $scope.beforeDraw({ chartWrapper: $scope.chartWrapper });
                                    $scope.chartWrapper.draw();
                                    draw.triggered = false;
                                });
                            }, 0, true);
                        }
                    }

                    function drawAsync() {
                        googleChartApiPromise.then(function () {
                            draw();
                        })
                    }
                }
            };
        }])

        .run(['$rootScope', '$window', function ($rootScope, $window) {
            angular.element($window).bind('resize', function () {
                $rootScope.$emit('resizeMsg');
            });
        }]);

})(document, window, window.angular);
