/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.1
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @license MIT
 * @year 2013
 */
(function () {
    'use strict';

    angular.module('googlechart.directives', []).directive('googleChart', ['$timeout', '$window', function ($timeout, $window) {
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

            }
        };
    }]);
})();
