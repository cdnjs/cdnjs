/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
(function(){
    'use strict';
    angular.module('gantt.bounds', ['gantt', 'gantt.bounds.templates']).directive('ganttBounds', ['moment', '$compile', function(moment, $compile) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.bounds) === 'object') {
                    for (var option in scope.options.bounds) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                var boundsScopes = [];
                scope.$watch('enabled', function(enabled) {
                    angular.forEach(boundsScopes, function(boundsScope) {
                        boundsScope.enabled = enabled;
                    });
                });

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var boundsScope = taskScope.$new();
                        boundsScopes.push(boundsScopes);
                        boundsScope.enabled = scope.enabled;

                        taskElement.append($compile('<gantt-task-bounds></gantt-bounds>')(boundsScope));

                        boundsScope.$on('$destroy', function() {
                            var scopeIndex = boundsScopes.indexOf(boundsScope);
                            if (scopeIndex > -1) {
                                boundsScopes.splice(scopeIndex, 1);
                            }
                        });
                    }
                });

                api.tasks.on.clean(scope, function(model) {
                    if (model.est !== undefined && !moment.isMoment(model.est)) {
                        model.est = moment(model.est);  //Earliest Start Time
                    }
                    if (model.lct !== undefined && !moment.isMoment(model.lct)) {
                        model.lct = moment(model.lct);  //Latest Completion Time
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.bounds').directive('ganttTaskBounds', [function() {
        // Displays a box representing the earliest allowable start time and latest completion time for a job

        return {
            restrict: 'E',
            templateUrl: function(tElement, tAttrs) {
                if (tAttrs.templateUrl === undefined) {
                    return 'plugins/bounds/taskBounds.tmpl.html';
                } else {
                    return tAttrs.templateUrl;
                }
            },
            replace: true,
            scope: true,
            controller: ['$scope', '$element', function($scope, $element) {
                var css = {};

                $scope.$watchGroup(['task.model.est', 'task.model.lct', 'task.left', 'task.width'], function() {
                    if ($scope.task.model.est !== undefined && $scope.task.model.lct !== undefined) {
                        $scope.bounds = {};
                        $scope.bounds.left = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.est);
                        $scope.bounds.width = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.lct) - $scope.bounds.left;
                    } else {
                        $scope.bounds = undefined;
                    }
                });

                $scope.task.$element.bind('mouseenter', function() {
                    $scope.isTaskMouseOver = true;
                    $scope.$digest();
                });

                $scope.task.$element.bind('mouseleave', function() {
                    $scope.isTaskMouseOver = false;
                    $scope.$digest();
                });

                $scope.getCss = function() {
                    if ($scope.bounds !== undefined) {
                        css.width = $scope.bounds.width + 'px';

                        if ($scope.task.isMilestone() === true || $scope.task.width === 0) {
                            css.left = ($scope.bounds.left - ($scope.task.left - 0.3)) + 'px';
                        } else {
                            css.left = ($scope.bounds.left - $scope.task.left) + 'px';
                        }
                    }

                    return css;
                };

                $scope.getClass = function() {
                    if ($scope.task.model.est === undefined || $scope.task.model.lct === undefined) {
                        return 'gantt-task-bounds-in';
                    } else if ($scope.task.model.est > $scope.task.model.from) {
                        return 'gantt-task-bounds-out';
                    }
                    else if ($scope.task.model.lct < $scope.task.model.to) {
                        return 'gantt-task-bounds-out';
                    }
                    else {
                        return 'gantt-task-bounds-in';
                    }
                };

                $scope.task.rowsManager.gantt.api.directives.raise.new('ganttBounds', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.task.rowsManager.gantt.api.directives.raise.destroy('ganttBounds', $scope, $element);
                });
            }]
        };
    }]);
}());


//# sourceMappingURL=angular-gantt-bounds-plugin.js.map