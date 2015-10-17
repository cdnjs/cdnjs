/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
(function(){
    'use strict';
    angular.module('gantt.progress', ['gantt', 'gantt.progress.templates']).directive('ganttProgress', ['moment', '$compile', function(moment, $compile) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.progress) === 'object') {
                    for (var option in scope.options.progress) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                var progressScopes = [];
                scope.$watch('enabled', function(enabled) {
                    angular.forEach(progressScopes, function(progressScope) {
                        progressScope.enabled = enabled;
                    });
                });

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var progressScope = taskScope.$new();
                        progressScopes.push(progressScope);
                        progressScope.enabled = scope.enabled;

                        taskElement.append($compile('<gantt-task-progress ng-if="task.model.progress !== undefined"></gantt-task-progress>')(progressScope));

                        progressScope.$on('$destroy', function() {
                            var scopeIndex = progressScopes.indexOf(progressScope);
                            if (scopeIndex > -1) {
                                progressScopes.splice(scopeIndex, 1);
                            }
                        });
                    }
                });

                api.tasks.on.clean(scope, function(model) {
                    if (model.est !== undefined && !moment.isMoment(model.est)) {
                        model.est = moment(model.est); //Earliest Start Time
                    }

                    if (model.lct !== undefined && !moment.isMoment(model.lct)) {
                        model.lct = moment(model.lct); //Latest Completion Time
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.progress').directive('ganttTaskProgress', [function() {
        return {
            restrict: 'E',
            requires: '^ganttTask',
            templateUrl: function(tElement, tAttrs) {
                if (tAttrs.templateUrl === undefined) {
                    return 'plugins/progress/taskProgress.tmpl.html';
                } else {
                    return tAttrs.templateUrl;
                }
            },
            replace: true,
            scope: true,
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.getClasses = function() {
                    var classes = [];

                    if ($scope.task.model.progress !== undefined && (typeof($scope.task.model.progress) !== 'object')) {
                        classes = $scope.task.model.classes;
                    }

                    return classes;
                };

                $scope.getCss = function() {
                    var css = {};

                    var progress;
                    if ($scope.task.model.progress !== undefined) {
                        if (typeof($scope.task.model.progress) === 'object') {
                            progress = $scope.task.model.progress;
                        } else {
                            progress = {percent: $scope.task.model.progress};
                        }
                    }

                    if (progress) {
                        if (progress.color) {
                            css['background-color'] = progress.color;
                        } else {
                            css['background-color'] = '#6BC443';
                        }

                        css.width = progress.percent + '%';
                    }

                    return css;
                };

                $scope.task.rowsManager.gantt.api.directives.raise.new('ganttTaskProgress', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.task.rowsManager.gantt.api.directives.raise.destroy('ganttTaskProgress', $scope, $element);
                });
            }]
        };
    }]);
}());


//# sourceMappingURL=angular-gantt-progress-plugin.js.map