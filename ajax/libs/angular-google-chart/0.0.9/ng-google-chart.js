/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.0.9
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @author GitHub contributors
 * @license MIT
 * @year 2013
 */
(function (document, window) {
    'use strict';

    angular.module('googlechart', [])

        .constant('googleChartApiConfig', {
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
                    chart: '=chart',
                    onReady: '&',
                    select: '&'
                },
                link: function ($scope, $elm, $attr) {
                    // Watches, to refresh the chart when its data, title or dimensions change
                    $scope.$watch('chart', function () {
                        drawAsync();
                    }, true); // true is for deep object equality checking

                    // Redraw the chart if the window is resized
                    $rootScope.$on('resizeMsg', function (e) {
                        $timeout(function () {
                            // Not always defined yet in IE so check
                            if($scope.chartWrapper) {
                                drawAsync();
                            }
                        });
                    });

                    function applyFormat(formatType, formatClass, dataTable) {

                        if (typeof($scope.chart.formatters[formatType]) != 'undefined') {
                            if ($scope.formatters[formatType] == null) {
                                $scope.formatters[formatType] = new Array();

                                if (formatType === 'color') {
                                    for (var cIdx = 0; cIdx < $scope.chart.formatters[formatType].length; cIdx++) {
                                        var colorFormat = new formatClass();

                                        for (var i = 0; i < $scope.chart.formatters[formatType][cIdx].formats.length; i++) {
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
                            for (var i = 0; i < $scope.formatters[formatType].length; i++) {
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
                                draw.triggered = false;

                                if (typeof($scope.formatters) === 'undefined')
                                    $scope.formatters = {};

                                var dataTable;
                                if ($scope.chart.data instanceof google.visualization.DataTable)
                                    dataTable = $scope.chart.data;
                                else if (Array.isArray($scope.chart.data))
                                    dataTable = google.visualization.arrayToDataTable($scope.chart.data);
                                else
                                    dataTable = new google.visualization.DataTable($scope.chart.data, 0.5);

                                if (typeof($scope.chart.formatters) != 'undefined') {
                                    applyFormat("number", google.visualization.NumberFormat, dataTable);
                                    applyFormat("arrow", google.visualization.ArrowFormat, dataTable);
                                    applyFormat("date", google.visualization.DateFormat, dataTable);
                                    applyFormat("bar", google.visualization.BarFormat, dataTable);
                                    applyFormat("color", google.visualization.ColorFormat, dataTable);
                                }

                                var customFormatters = $scope.chart.customFormatters;
                                if (typeof(customFormatters) != 'undefined') {
                                    for (name in customFormatters) {
                                        applyFormat(name, customFormatters[name], dataTable);
                                    }
                                }

                                var chartWrapperArgs = {
                                    chartType: $scope.chart.type,
                                    dataTable: dataTable,
                                    view: $scope.chart.view,
                                    options: $scope.chart.options,
                                    containerId: $elm[0]
                                };

                                $scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                                google.visualization.events.addListener($scope.chartWrapper, 'ready', function () {
                                    $scope.chart.displayed = true;
                                    $scope.$apply(function (scope) {
                                        scope.onReady({chartWrapper: scope.chartWrapper});
                                    });
                                });
                                google.visualization.events.addListener($scope.chartWrapper, 'error', function (err) {
                                    console.log("Chart not displayed due to error: " + err.message + ". Full error object follows.");
                                    console.log(err);
                                });
                                google.visualization.events.addListener($scope.chartWrapper, 'select', function () {
                                    var selectedItem = $scope.chartWrapper.getChart().getSelection()[0];
                                    if (selectedItem) {
                                        $scope.$apply(function () {
                                            $scope.select({selectedItem: selectedItem});
                                        });
                                    }
                                });


                                $timeout(function () {
                                    $elm.empty();
                                    $scope.chartWrapper.draw();
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

})(document, window);
