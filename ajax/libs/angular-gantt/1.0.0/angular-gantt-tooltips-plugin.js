/*
Project: angular-gantt v1.0.0 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.tooltips', ['gantt', 'gantt.tooltips.templates']).directive('ganttTooltips', ['$compile', '$document', function($compile, $document) {
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

                scope.api = api;

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var tooltipScope = taskScope.$new();

                        tooltipScope.pluginScope = scope;
                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');

                        var tooltipElement = $document[0].createElement('gantt-tooltip');
                        if (attrs.templateUrl !== undefined) {
                            angular.element(tooltipElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(tooltipElement).attr('data-template', attrs.template);
                        }

                        angular.element(ifElement).append(tooltipElement);
                        taskElement.append($compile(ifElement)(tooltipScope));
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tooltips').directive('ganttTooltip', ['$timeout', '$compile', '$document', '$templateCache', 'ganttDebounce', 'ganttSmartEvent', function($timeout, $compile, $document, $templateCache, debounce, smartEvent) {
        // This tooltip displays more information about a task

        return {
            restrict: 'E',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/tooltips/tooltip.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template !== undefined) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            scope: true,
            replace: true,
            controller: ['$scope', '$element', 'ganttUtils', function($scope, $element, utils) {
                var bodyElement = angular.element($document[0].body);
                var parentElement = $scope.task.$element;
                var showTooltipPromise;
                var visible = false;
                var mouseEnterX;

                $element.toggleClass('ng-hide', true);

                $scope.getFromLabel = function() {
                    var dateFormat = utils.firstProperty([$scope.task.model.tooltips, $scope.task.row.model.tooltips], 'dateFormat', $scope.pluginScope.dateFormat);
                    return $scope.task.model.from.format(dateFormat);
                };

                $scope.getToLabel = function() {
                    var dateFormat = utils.firstProperty([$scope.task.model.tooltips, $scope.task.row.model.tooltips], 'dateFormat', $scope.pluginScope.dateFormat);
                    return $scope.task.model.to.format(dateFormat);
                };

                var mouseMoveHandler = smartEvent($scope, bodyElement, 'mousemove', debounce(function(e) {
                    if (!visible) {
                        mouseEnterX = e.clientX;
                        displayTooltip(true, false);
                    } else {
                        updateTooltip(e.clientX);
                    }
                }, 5, false));

                $scope.task.$element.bind('mousemove', function(evt) {
                    mouseEnterX = evt.clientX;
                });

                $scope.task.$element.bind('mouseenter', function(evt) {
                    mouseEnterX = evt.clientX;
                    displayTooltip(true, true);
                });

                $scope.task.$element.bind('mouseleave', function() {
                    displayTooltip(false);
                });

                if ($scope.pluginScope.api.tasks.on.moveBegin) {
                    $scope.pluginScope.api.tasks.on.moveBegin($scope, function(task) {
                        if (task === $scope.task) {
                            mouseMoveHandler.bind();
                        }
                    });

                    $scope.pluginScope.api.tasks.on.moveEnd($scope, function(task) {
                        if (task === $scope.task) {
                            mouseMoveHandler.unbind();
                            displayTooltip(false);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.resizeBegin($scope, function(task) {
                        if (task === $scope.task) {
                            mouseMoveHandler.bind();
                        }
                    });

                    $scope.pluginScope.api.tasks.on.resizeEnd($scope, function(task) {
                        if (task === $scope.task) {
                            mouseMoveHandler.unbind();
                            displayTooltip(false);
                        }
                    });
                }

                var displayTooltip = function(newValue, showDelayed) {
                    if (showTooltipPromise) {
                        $timeout.cancel(showTooltipPromise);
                    }
                    var enabled = utils.firstProperty([$scope.task.model.tooltips, $scope.task.row.model.tooltips], 'enabled', $scope.pluginScope.enabled);
                    if (enabled && !visible && newValue) {
                        if (showDelayed) {
                            showTooltipPromise = $timeout(function() {
                                showTooltip(mouseEnterX);
                            }, 500, false);
                        } else {
                            showTooltip(mouseEnterX);
                        }
                    } else if (!newValue) {
                        if (!$scope.task.active) {
                            hideTooltip();
                        }
                    }
                };

                var showTooltip = function(x) {
                    visible = true;
                    $element.toggleClass('ng-hide', false);

                    $timeout(function() {
                        updateTooltip(x);
                        $element.css('top', parentElement[0].getBoundingClientRect().top + 'px');
                        $element.css('marginTop', -$element[0].offsetHeight - 8 + 'px');
                        $element.css('opacity', 1);
                    }, 0, true);
                };

                var getViewPortWidth = function() {
                    var d = $document[0];
                    return d.documentElement.clientWidth || d.documentElement.getElementById('body')[0].clientWidth;
                };

                var updateTooltip = function(x) {
                    // Check if info is overlapping with view port
                    if (x + $element[0].offsetWidth > getViewPortWidth()) {
                        $element.css('left', (x + 20 - $element[0].offsetWidth) + 'px');
                        $element.addClass('gantt-task-infoArrowR'); // Right aligned info
                        $element.removeClass('gantt-task-infoArrow');
                    } else {
                        $element.css('left', (x - 20) + 'px');
                        $element.addClass('gantt-task-infoArrow');
                        $element.removeClass('gantt-task-infoArrowR');
                    }
                };

                var hideTooltip = function() {
                    visible = false;
                    $element.css('opacity', 0);
                    $element.toggleClass('ng-hide', true);
                };

                if ($scope.task.isMoving) {
                    // Restore tooltip because task has been moved to a new row
                    mouseMoveHandler.bind();
                }

                $scope.gantt.api.directives.raise.new('ganttTooltip', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.gantt.api.directives.raise.destroy('ganttTooltip', $scope, $element);
                });
            }]
        };
    }]);
}());


//# sourceMappingURL=angular-gantt-tooltips-plugin.js.map