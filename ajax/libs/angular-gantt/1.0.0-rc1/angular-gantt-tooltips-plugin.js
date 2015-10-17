/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
(function(){
    'use strict';
    angular.module('gantt.tooltips', ['gantt', 'gantt.tooltips.templates']).directive('ganttTooltips', ['$compile', function($compile) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                dateFormat: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.tooltips) === 'object') {
                    for (var option in scope.options.tooltips) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }
                if (scope.dateFormat === undefined) {
                    scope.dateFormat = 'MMM DD, HH:mm';
                }

                var tooltipScopes = [];
                scope.$watch('dateFormat', function(dateFormat) {
                    angular.forEach(tooltipScopes, function(tooltipScope) {
                        tooltipScope.dateFormat = dateFormat;
                    });
                });

                scope.$watch('enabled', function(enabled) {
                    angular.forEach(tooltipScopes, function(tooltipScope) {
                        tooltipScope.enabled = enabled;
                    });
                });

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var tooltipScope = taskScope.$new();
                        tooltipScopes.push(tooltipScope);
                        tooltipScope.dateFormat = scope.dateFormat;
                        tooltipScope.enabled = scope.enabled;
                        taskElement.append($compile('<gantt-tooltip ng-model="task"></gantt-tooltip>')(tooltipScope));

                        tooltipScope.$on('$destroy', function() {
                            var scopeIndex = tooltipScopes.indexOf(tooltipScope);
                            if (scopeIndex > -1) {
                                tooltipScopes.splice(scopeIndex, 1);
                            }
                        });
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tooltips').directive('ganttTooltip', ['$timeout', '$document', 'ganttDebounce', 'ganttSmartEvent', function($timeout, $document, debounce, smartEvent) {
        // This tooltip displays more information about a task

        return {
            restrict: 'E',
            templateUrl: function(tElement, tAttrs) {
                if (tAttrs.templateUrl === undefined) {
                    return 'plugins/tooltips/tooltip.tmpl.html';
                } else {
                    return tAttrs.templateUrl;
                }
            },
            scope: true,
            replace: true,
            controller: ['$scope', '$element', 'ganttUtils', function($scope, $element, utils) {
                var bodyElement = angular.element($document[0].body);
                var parentElement = $element.parent();
                var showTooltipPromise;
                var mousePositionX;

                $scope.css = {};
                $scope.visible = false;

                $scope.getFromLabel = function() {
                    var dateFormat = utils.firstProperty([$scope.task.model.tooltips, $scope.task.row.model.tooltips], 'dateFormat', $scope.dateFormat);
                    return $scope.task.model.from.format(dateFormat);
                };

                $scope.getToLabel = function() {
                    var dateFormat = utils.firstProperty([$scope.task.model.tooltips, $scope.task.row.model.tooltips], 'dateFormat', $scope.dateFormat);
                    return $scope.task.model.to.format(dateFormat);
                };

                $scope.$watch('isTaskMouseOver', function(newValue) {
                    if (showTooltipPromise) {
                        $timeout.cancel(showTooltipPromise);
                    }
                    var enabled = utils.firstProperty([$scope.task.model.tooltips, $scope.task.row.model.tooltips], 'enabled', $scope.enabled);
                    if (enabled && newValue === true) {
                        showTooltipPromise = $timeout(function() {
                            showTooltip(mousePositionX);
                        }, 500, true);
                    } else {
                        if (!$scope.task.active) {
                            hideTooltip();
                        }
                    }
                });

                $scope.task.$element.bind('mousemove', function(evt) {
                    mousePositionX = evt.clientX;
                });

                $scope.task.$element.bind('mouseenter', function(evt) {
                    $scope.mouseEnterX = evt.clientX;
                    $scope.isTaskMouseOver = true;
                    $scope.$digest();
                });

                $scope.task.$element.bind('mouseleave', function() {
                    $scope.mouseEnterX = undefined;
                    $scope.isTaskMouseOver = false;
                    $scope.$digest();
                });

                var mouseMoveHandler = smartEvent($scope, bodyElement, 'mousemove', debounce(function(e) {
                    updateTooltip(e.clientX);
                }, 5, false));

                $scope.$watch('task.isMoving', function(newValue) {
                    if (newValue === true) {
                        mouseMoveHandler.bind();
                    } else if (newValue === false) {
                        mouseMoveHandler.unbind();
                        hideTooltip();
                    }
                });

                var getViewPortWidth = function() {
                    var d = $document[0];
                    return d.documentElement.clientWidth || d.documentElement.getElementById('body')[0].clientWidth;
                };

                var showTooltip = function(x) {
                    $scope.visible = true;

                    $timeout(function() {
                        updateTooltip(x);

                        $scope.css.top = parentElement[0].getBoundingClientRect().top + 'px';
                        $scope.css.marginTop = -$element[0].offsetHeight - 8 + 'px';
                        $scope.css.opacity = 1;
                    }, 0, true);
                };

                var updateTooltip = function(x) {
                    // Check if info is overlapping with view port
                    if (x + $element[0].offsetWidth > getViewPortWidth()) {
                        $scope.css.left = (x + 20 - $element[0].offsetWidth) + 'px';
                        $element.addClass('gantt-task-infoArrowR'); // Right aligned info
                        $element.removeClass('gantt-task-infoArrow');
                    } else {
                        $scope.css.left = (x - 20) + 'px';
                        $element.addClass('gantt-task-infoArrow');
                        $element.removeClass('gantt-task-infoArrowR');
                    }
                };

                var hideTooltip = function() {
                    $scope.css.opacity = 0;
                    $scope.visible = false;
                };

                $scope.gantt.api.directives.raise.new('ganttTooltip', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.gantt.api.directives.raise.destroy('ganttTooltip', $scope, $element);
                });
            }]
        };
    }]);
}());


//# sourceMappingURL=angular-gantt-tooltips-plugin.js.map