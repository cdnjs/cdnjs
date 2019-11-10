/*
Project: angular-gantt v1.3.2 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    /* global ResizeSensor: false */
    /* global ElementQueries: false */
    'use strict';
    angular.module('gantt.resizeSensor', ['gantt']).directive('ganttResizeSensor', [function() {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.resizeSensor) === 'object') {
                    for (var option in scope.options.resizeSensor) {
                        scope[option] = scope.options.resizeSensor[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                function buildSensors() {
                    var ganttElement = ganttCtrl.gantt.$element[0];
                    var ganttSensor = new ResizeSensor(ganttElement, function() {
                        // See issue #664
                        var changed = false;
                        if (Math.abs(ganttElement.clientWidth - ganttCtrl.gantt.$scope.ganttElementWidth) > 1) {
                            ganttCtrl.gantt.$scope.ganttElementWidth = ganttElement.clientWidth;
                            changed = true;
                        }
                        if (Math.abs(ganttElement.clientHeight - ganttCtrl.gantt.$scope.ganttElementHeight) > 1) {
                            ganttCtrl.gantt.$scope.ganttElementHeight = ganttElement.clientHeight;
                            changed = true;
                        }
                        if (changed) {
                            ganttCtrl.gantt.$scope.$apply();
                        }
                    });
                    var containerSensor = new ResizeSensor(ganttElement.parentElement, function() {
                        var el = ganttElement.parentElement;
                        var height = el.offsetHeight;

                        var style = getComputedStyle(el);
                        height = height - parseInt(style.marginTop) - parseInt(style.marginBottom);

                        ganttCtrl.gantt.$scope.ganttContainerHeight = height;

                        var width = el.offsetWidth;

                        style = getComputedStyle(el);
                        width = width - parseInt(style.marginLeft) - parseInt(style.marginRight);

                        ganttCtrl.gantt.$scope.ganttContainerWidth = width;

                        ganttCtrl.gantt.$scope.$apply();
                    });
                    return [ganttSensor, containerSensor];
                }

                var rendered = false;
                var sensors = [];

                function detach(sensors) {
                    for (var i=0; i<sensors; i++) {
                        sensors[i].detach();
                    }
                }

                api.core.on.rendered(scope, function() {
                    rendered = true;
                    detach(sensors);
                    if (scope.enabled) {
                        ElementQueries.update();
                        sensors = buildSensors();
                    }
                });

                scope.$watch('enabled', function(newValue) {
                    if (rendered) {
                        if (newValue) {
                            ElementQueries.update();
                            sensors = buildSensors();
                        } else if (!newValue) {
                            detach(sensors);
                            sensors = [];
                        }
                    }
                });
            }
        };
    }]);
}());


angular.module('gantt.resizeSensor.templates', []).run(['$templateCache', function ($templateCache) {

}]);

//# sourceMappingURL=angular-gantt-resizeSensor-plugin.js.map