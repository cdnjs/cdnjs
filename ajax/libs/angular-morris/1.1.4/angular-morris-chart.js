/**
 * angular morris chart provides morris.js wrappers directives for angular
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
    angular.module('angular.morris-chart', []);
})();
/**
 * angular morris chart provides morris.js wrappers directives for angular
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
/* global Morris */
(function() {
    angular.module("angular.morris-chart").directive('areaChart',
        function() {
            return {
                restrict: 'A',
                scope: {
                    areaData: '=',
                    areaXkey: '@',
                    areaYkeys: '=',
                    areaLabels: '=',
                    lineColors: '='
                },
                link: function(scope, elem) {
                    scope.$watch('areaData', function() {
                        if (scope.areaData) {
                            if (typeof scope.areaData === 'string')
                                scope.areaData = JSON.parse(scope.areaData);
                            if (typeof scope.areaYkeys === 'string')
                                scope.areaYkeys = JSON.parse(scope.areaYkeys);
                            if (typeof scope.areaLabels === 'string')
                                scope.areaLabels = JSON.parse(scope.areaLabels);
                            if (typeof scope.lineColors === 'string')
                                scope.lineColors = JSON.parse(scope.lineColors);

                            if (!scope.areaInstance) {
                                scope.areaInstance = new Morris.Area({
                                    element: elem,
                                    data: scope.areaData,
                                    xkey: scope.areaXkey,
                                    ykeys: scope.areaYkeys,
                                    labels: scope.areaLabels,
                                    lineColors: scope.lineColors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
                                });
                            } else {
                                scope.areaInstance.setData(scope.areaData);
                            }
                        }
                    });
                }
            }
        });
})();
/**
 * angular morris chart provides morris.js wrappers directives for angular
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
/* global Morris */
(function() {
    angular.module("angular.morris-chart").directive('barChart', function() {
        return {
            restrict: 'A',
            scope: {
                barX: '@',
                barY: '=',
                barLabels: '=',
                barData: '=',
                barColors: '=',
                barStacked: '=',
                barResize: '='
            },
            link: function(scope, elem) {
                scope.$watch('barData', function() {
                    if (scope.barData) {
                        if (typeof scope.barY === 'string')
                            scope.barY = JSON.parse(scope.barY);
                        if (typeof scope.barLabels === 'string')
                            scope.barLabels = JSON.parse(scope.barLabels);
                        if (typeof scope.barData === 'string')
                            scope.barData = JSON.parse(scope.barData);
                        if (typeof scope.barColors === 'string')
                            scope.barColors = JSON.parse(scope.barColors);
                        if (typeof scope.barStacked === 'string')
                            scope.barStacked = JSON.parse(scope.barStacked);
                        if (typeof scope.barResize === 'string')
                            scope.barResize = JSON.parse(scope.barResize);
                        if (!scope.barInstance) {
                            scope.barInstance = new Morris.Bar({
                                element: elem,
                                data: scope.barData,
                                xkey: scope.barX,
                                ykeys: scope.barY,
                                labels: scope.barLabels,
                                barColors: scope.barColors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                                stacked: scope.barStacked || false,
                                resize: scope.barResize || false,
                                xLabelMargin: 2
                            });
                        } else {
                            scope.barInstance.setData(scope.barData);
                        }
                    }
                })
            }
        }
    })
})();
/**
 * angular morris chart provides morris.js wrappers directives for angular
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
/* global Morris */
(function() {
    angular.module("angular.morris-chart").directive('donutChart', /*@ngInject*/function($injector) {
        return {
            restrict: 'A',
            scope: {
                donutData: '=',
                donutColors: '=',
                donutFormatter: '='
            },
            link: function(scope, elem) {
                scope.$watch('donutData', function() {
                    if (scope.donutData) {
                        if (typeof scope.donutData === 'string')
                            scope.donutData = JSON.parse(scope.donutData);

                        if (typeof scope.donutColors === 'string')
                            scope.donutColors = JSON.parse(scope.donutColors);

                        if (!scope.donutInstance) {
                            var options = {
                                element: elem,
                                data: scope.donutData,
                                colors: scope.donutColors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
                            };
                            // Check if a formatter function has been set
                            if (typeof scope.donutFormatter === 'function') {
                                options.formatter = scope.donutFormatter;
                            } else if (typeof scope.donutFormatter === 'string' && $injector.has(scope.donutFormatter + 'Filter')) {
                                // If the formatter is a string, check for a matching filter
                                var filter = $injector.get(scope.donutFormatter + 'Filter');
                                options.formatter = function (input) {
                                    return filter.call(this, input);
                                };
                            }
                            scope.donutInstance = new Morris.Donut(options);
                        } else {
                            scope.donutInstance.setData(scope.donutData);
                        }
                    }
                })
            }
        }
    })
})();
/**
 * angular morris chart provides morris.js wrappers directives for angular
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
/* global Morris */
(function() {
    angular.module("angular.morris-chart").directive('lineChart',
        function() {
            return {
                restrict: 'A',
                scope: {
                    lineData: '=',
                    lineXkey: '@',
                    lineYkeys: '=',
                    lineLabels: '=',
                    lineColors: '='
                },
                link: function(scope, elem) {
                    scope.$watch('lineData', function() {
                        if (scope.lineData) {
                            if (typeof scope.lineData === 'string')
                                scope.lineData = JSON.parse(scope.lineData);
                            if (typeof scope.lineYkeys === 'string')
                                scope.lineYkeys = JSON.parse(scope.lineYkeys);
                            if (typeof scope.lineYkeys === 'string')
                                scope.lineYkeys = JSON.parse(scope.lineYkeys);
                            if (typeof scope.lineLabels === 'string')
                                scope.lineLabels = JSON.parse(scope.lineLabels);
                            if (typeof scope.lineColors === 'string')
                                scope.lineColors = JSON.parse(scope.lineColors);
                            if (!scope.lineInstance) {
                                scope.lineInstance = new Morris.Line({
                                    element: elem,
                                    data: scope.lineData,
                                    xkey: scope.lineXkey,
                                    ykeys: scope.lineYkeys,
                                    labels: scope.lineLabels,
                                    lineColors: scope.lineColors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
                                });
                            } else {
                                scope.lineInstance.setData(scope.lineData);
                            }
                        }
                    });
                }
            }
        }
    )
})();