/**
 * angular morris chart provides morris.js wrappers directives for angular
 * based in ngmorris from Connor James Leech
 * 
 * check out documentation in http://angular-morris-chart.stpa.co
 *
 * Copyright © 2014 Stewan Pacheco <talk@stpa.co>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
"use strict";
(function() {

    var module = angular.module("stpa.morris", []);
    module.directive('barChart', barChart);
    module.directive('donutChart', donutChart);
    module.directive('lineChart', lineChart);
    module.directive('areaChart', areaChart);

    function donutChart() {
        return {
            restrict: 'A',
            scope: {
                donutData: '='
            },
            link: function(scope, elem, attrs) {
                scope.$watch('donutData', function() {
                    if (scope.donutData) {
                        if (!scope.donutInstance) {
                            scope.donutInstance = new Morris.Donut({
                                element: elem,
                                data: scope.donutData
                            });
                        } else {
                            scope.donutInstance.setData(scope.donutData);
                        }
                    }
                })
            }
        }
    }

    function barChart() {
        return {
            restrict: 'A',
            scope: {
                barX: '@',
                barY: '@',
                barLabels: '@',
                barData: '='
            },
            link: function(scope, elem, attrs) {
                scope.$watch('barData', function() {
                    if (scope.barData) {
                        if (!scope.barInstance) {
                            scope.barInstance = new Morris.Bar({
                                element: elem,
                                data: scope.barData,
                                xkey: scope.barX,
                                ykeys: JSON.parse(scope.barY),
                                labels: JSON.parse(scope.barLabels),
                                xLabelMargin: 2
                            });
                        } else {
                            scope.barInstance.setData(scope.barData);
                        }
                    }
                })
            }
        }
    }

    function lineChart() {
        return {
            restrict: 'A',
            scope: {
                lineData: '=',
                lineXkey: '@',
                lineYkeys: '@',
                lineLabels: '@',
                lineColors: '@'
            },
            link: function(scope, elem, attrs) {
                var colors;
                if (scope.lineColors === void 0 || scope.lineColors === '') {
                    colors = null;
                } else {
                    colors = JSON.parse(scope.lineColors);
                }
                scope.$watch('lineData', function() {
                    if (scope.lineData) {
                        if (!scope.lineInstance) {
                            scope.lineInstance = new Morris.Line({
                                element: elem,
                                data: scope.lineData,
                                xkey: scope.lineXkey,
                                ykeys: JSON.parse(scope.lineYkeys),
                                labels: JSON.parse(scope.lineLabels),
                                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
                            });
                        } else {
                            scope.lineInstance.setData(scope.lineData);
                        }
                    }
                });
            }
        }
    }

    function areaChart() {
        return {
            restrict: 'A',
            scope: {
                areaData: '=',
                areaXkey: '@',
                areaYkeys: '@',
                areaLabels: '@'
            },
            link: function(scope, elem, attrs) {
                scope.$watch('areaData', function() {
                    if (scope.areaData) {
                        if (!scope.areaInstance) {
                            scope.areaInstance = new Morris.Area({
                                element: elem,
                                data: scope.areaData,
                                xkey: scope.areaXkey,
                                ykeys: JSON.parse(scope.areaYkeys),
                                labels: JSON.parse(scope.areaLabels)                            });
                        } else {
                            scope.areaInstance.setData(scope.areaData);
                        }
                    }
                });
            }
        }
    }
})();