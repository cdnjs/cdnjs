/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.1
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @license MIT
 * @year 2013
 */
(function (document, window) {
    'use strict';

    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        script.onerror = function () {
            throw Error('Error loading "' + url + '"');
        };

        document.getElementsByTagName('head')[0].appendChild(script);
    }


    angular.module('googlechart', [])

        .constant('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
            }
        })

        .factory('googleChartApiProxy', ['$rootScope', '$q', 'googleChartApiConfig', function ($rootScope, $q, apiConfig) {
            var apiReady = $q.defer(),
                onLoad = function () {
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
            
            loadScript('//www.google.com/jsapi', onLoad);

            return function (fn, context) {
                var args = Array.prototype.slice.call(arguments, 2);
                return function () {
                    apiReady.promise.then(function () {
                        fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
                    });
                };
            };
        }])

        .directive('googleChart', ['$timeout', '$window', 'googleChartApiProxy', function ($timeout, $window, apiProxy) {
            return {
                restrict: 'A',
                scope: {
                    chart: '=chart'
                },
                link: function ($scope, $elm, $attr) {
                    // Watches, to refresh the chart when its data, title or dimensions change
                    $scope.$watch('chart', function () {
                        draw();
                    }, true); // true is for deep object equality checking

                    // Redraw the chart if the window is resized 
                    angular.element($window).bind('resize', function () {
                        draw();
                    });

                    function draw() {
                        if (!draw.triggered && ($scope.chart != undefined)) {
                            draw.triggered = true;
                            $timeout(function () {
                                draw.triggered = false;
                                var dataTable = new google.visualization.DataTable($scope.chart.data, 0.5);

                                var chartWrapperArgs = {
                                    chartType: $scope.chart.type,
                                    dataTable: dataTable,
                                    view: $scope.chart.view,
                                    options: $scope.chart.options,
                                    containerId: $elm[0]
                                };

                                if($scope.chartWrapper==null) {
                                	$scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                                    google.visualization.events.addListener($scope.chartWrapper, 'ready', function () {
                                        $scope.chart.displayed = true;
                                    });
                                    google.visualization.events.addListener($scope.chartWrapper, 'error', function (err) {
                                        console.log("Chart not displayed due to error: " + err.message);
                                    });
                                }
                                else {
                                	$scope.chartWrapper.setChartType($scope.chart.type);
                                	$scope.chartWrapper.setDataTable(dataTable);
                                    $scope.chartWrapper.setView($scope.chart.view);
                                	$scope.chartWrapper.setOptions($scope.chart.options);
                                }
                                	
                                $timeout(function () {
                                	$scope.chartWrapper.draw();
                                });
                            }, 0, true);
                        }
                    }

                    draw = apiProxy(draw, this);
                }
            };
        }]);

})(document, window);
