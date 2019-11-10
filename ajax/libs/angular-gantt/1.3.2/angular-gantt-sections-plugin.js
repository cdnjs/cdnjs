/*
Project: angular-gantt v1.3.2 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.sections', ['gantt', 'gantt.sections.templates']).directive('ganttSections', ['moment', '$compile', '$document', function(moment, $compile, $document) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                keepProportions: '=?',
                disableMagnet: '=?',
                disableDaily: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.sections) === 'object') {
                    for (var option in scope.options.sections) {
                        scope[option] = scope.options.sections[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.keepProportions === undefined) {
                    scope.keepProportions = true;
                }

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTaskForeground') {
                        var sectionsScope = taskScope.$new();
                        sectionsScope.pluginScope = scope;
                        sectionsScope.task = taskScope.task;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'task.model.sections !== undefined && pluginScope.enabled');
                        angular.element(ifElement).attr('class', 'gantt-task-foreground-sections');

                        var sectionsElement = $document[0].createElement('gantt-task-sections');

                        if (attrs.templateUrl !== undefined) {
                            angular.element(sectionsElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(sectionsElement).attr('data-template', attrs.template);
                        }
                        angular.element(ifElement).append(sectionsElement);
                        taskElement.append($compile(ifElement)(sectionsScope));
                    }
                });
            }
        };
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt.sections').directive('ganttTaskSection', ['$templateCache', function($templateCache) {
        return {
            restrict: 'E',
            requires: '^ganttTaskSections',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/sections/taskSection.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template !== undefined) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            replace: true,
            scope: {
                section: '=',
                task: '=',
                index: '=',
                options: '=?'
            },
            controller: ['$scope', '$element', 'ganttUtils', 'moment', function($scope, $element, utils, moment) {
                var fromTask = moment($scope.section.from).isSame(moment($scope.task.model.from));
                var toTask = moment($scope.section.to).isSame(moment($scope.task.model.to));

                var loadPreviousScope = function() {
                    if ($scope.task._movingTaskSections) {
                        // We are coming from a task row change
                        var sectionScopes = $scope.task._movingTaskSections;
                        var sectionScope = sectionScopes['$$index_' + $scope.index];
                        $scope.section = sectionScope.section;
                        $scope.sectionCss = sectionScope.sectionCss;
                        fromTask = sectionScope.fromTask;
                        toTask = sectionScope.toTask;
                        delete sectionScopes['$$index_' + $scope.index];
                    }

                    var sectionScopesEmpty = true;
                    for (var property in $scope.task._movingTaskSections) {
                        if ($scope.task._movingTaskSections.hasOwnProperty(property)) {
                            sectionScopesEmpty = false;
                            break;
                        }
                    }

                    if (sectionScopesEmpty) {
                        delete $scope.task._movingTaskSections;
                    }
                };
                loadPreviousScope();



                var getLeft = function() {
                    if (fromTask) {
                        return 0;
                    }

                    var gantt = $scope.task.rowsManager.gantt;
                    var taskLeft = $scope.task.left;

                    var from;

                    var disableMagnet = utils.firstProperty([$scope.section, $scope.options], 'disableMagnet', $scope.$parent.pluginScope.disableMagnet);

                    from = disableMagnet ? $scope.section.from : gantt.getMagnetDate($scope.section.from);

                    var disableDaily = utils.firstProperty([$scope.section, $scope.options], 'disableDaily', $scope.$parent.pluginScope.disableDaily);
                    if (!disableDaily && gantt.options.value('daily')) {
                        from = moment(from).startOf('day');
                    }

                    var sectionLeft = gantt.getPositionByDate(from);

                    return sectionLeft - taskLeft;
                };

                var getRight = function() {
                    var keepProportions = utils.firstProperty([$scope.section, $scope.options], 'keepProportions', $scope.$parent.pluginScope.keepProportions);
                    if (toTask && keepProportions) {
                        return $scope.task.width;
                    }

                    var gantt = $scope.task.rowsManager.gantt;
                    var taskLeft = $scope.task.left;

                    var disableMagnet = utils.firstProperty([$scope.section, $scope.options], 'disableMagnet', $scope.$parent.pluginScope.disableMagnet);
                    var to = disableMagnet ? $scope.section.to : gantt.getMagnetDate($scope.section.to);

                    var disableDaily = utils.firstProperty([$scope.section, $scope.options], 'disableDaily', $scope.$parent.pluginScope.disableDaily);
                    if (!disableDaily && gantt.options.value('daily')) {
                        to = moment(to).startOf('day');
                    }

                    var sectionRight = gantt.getPositionByDate(to);

                    return sectionRight - taskLeft;
                };

                var getRelative = function(position) {
                    return position / $scope.task.width * 100;
                };

                var updatePosition = function() {
                    var sectionLeft = getLeft();
                    var sectionWidth = getRight() - sectionLeft;

                    var keepProportions = utils.firstProperty([$scope.section, $scope.options], 'keepProportions', $scope.$parent.pluginScope.keepProportions);
                    if (keepProportions) {
                        // Setting left and width as to keep proportions when changing task size.
                        // This may somewhat break the magnet feature, but it seems acceptable
                        $scope.sectionCss.left = getRelative(sectionLeft) + '%';
                        $scope.sectionCss.width = getRelative(sectionWidth) + '%';
                    } else {
                        $scope.sectionCss.left = sectionLeft + 'px';
                        $scope.sectionCss.width = sectionWidth + 'px';
                    }
                };

                var updateCss = function() {
                    if ($scope.section.color) {
                        $scope.sectionCss['background-color'] = $scope.section.color;
                    } else {
                        $scope.sectionCss['background-color'] = undefined;
                    }
                };

                if ($scope.sectionCss === undefined) {
                    $scope.sectionCss = {};
                    updatePosition();
                    updateCss();
                }

                var taskChangeHandler = function(task) {
                    if (task === $scope.task) {
                        // Update from/to section model value based on position.
                        var gantt = $scope.task.rowsManager.gantt;

                        var sectionLeft = $element[0].offsetLeft;

                        var disableMagnet = utils.firstProperty([$scope.section, $scope.options], 'disableMagnet', $scope.$parent.pluginScope.disableMagnet);

                        var from;
                        if (fromTask) {
                            from = $scope.task.model.from;
                        } else {
                            from = gantt.getDateByPosition($scope.task.modelLeft + sectionLeft, !disableMagnet);
                        }

                        var to;
                        if (toTask) {
                            to = $scope.task.model.to;
                        } else {
                            var sectionRight = sectionLeft + $element[0].offsetWidth;
                            to = gantt.getDateByPosition($scope.task.modelLeft + sectionRight, !disableMagnet);
                        }

                        $scope.section.from = from;
                        $scope.section.to = to;

                        updatePosition();
                    }
                };

                var taskCleanHandler = function(taskModel) {
                    if (taskModel.id === $scope.task.model.id) {
                        var model = $scope.section;
                        if (model.from !== undefined && !moment.isMoment(model.from)) {
                            model.from = moment(model.from);
                        }

                        if (model.to !== undefined && !moment.isMoment(model.to)) {
                            model.to = moment(model.to);
                        }
                    }
                };
                taskCleanHandler($scope.task.model);

                $scope.task.rowsManager.gantt.api.tasks.on.clean($scope, taskCleanHandler);
                $scope.task.rowsManager.gantt.api.tasks.on.change($scope, taskChangeHandler);

                var beforeViewRowChangeHandler = function(task) {
                    var sectionScopes = task._movingTaskSections;
                    if (!sectionScopes) {
                        sectionScopes = {};
                        task._movingTaskSections = sectionScopes;
                    }

                    sectionScopes['$$index_' + $scope.index] = {
                        'section' : $scope.section,
                        'sectionCss': $scope.sectionCss,
                        'fromTask': fromTask,
                        'toTask': toTask
                    };
                };
                $scope.task.rowsManager.gantt.api.tasks.on.beforeViewRowChange($scope, beforeViewRowChangeHandler);

                $scope.task.rowsManager.gantt.api.directives.raise.new('ganttTaskSection', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.task.rowsManager.gantt.api.directives.raise.destroy('ganttTaskSection', $scope, $element);
                });
            }]
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.sections').directive('ganttTaskSections', ['$templateCache', function($templateCache) {
        return {
            restrict: 'E',
            requires: '^ganttTask',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/sections/taskSections.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template !== undefined) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            replace: true,
            scope: true,
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.task.rowsManager.gantt.api.directives.raise.new('ganttTaskSections', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.task.rowsManager.gantt.api.directives.raise.destroy('ganttTaskSections', $scope, $element);
                });
            }]
        };
    }]);
}());


angular.module('gantt.sections.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('plugins/sections/taskSection.tmpl.html',
        '<div ng-style="sectionCss"\n' +
        '     ng-class="section.classes"\n' +
        '     class="gantt-task-section"></div>\n' +
        '');
    $templateCache.put('plugins/sections/taskSections.tmpl.html',
        '<div ng-cloak class="gantt-task-sections">\n' +
        '    <gantt-task-section section="section"\n' +
        '                        task="task"\n' +
        '                        options="task.model.sections"\n' +
        '                        index="$index"\n' +
        '                        ng-repeat="section in task.model.sections.items track by $index">\n' +
        '    </gantt-task-section>\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt-sections-plugin.js.map