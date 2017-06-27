/*
Project: angular-gantt v1.2.13 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function() {
    'use strict';
    angular.module('gantt.overlap', ['gantt', 'gantt.overlap.templates']).directive('ganttOverlap', ['moment', function(moment) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                global: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.global === undefined) {
                    scope.global = false;
                }

                function getStartEnd(task) {
                    var start, end;

                    if (task.model.from.isBefore(task.model.to)) {
                        start = task.model.from;
                        end = task.model.to;
                    } else {
                        start = task.model.to;
                        end = task.model.from;
                    }

                    return [start, end];
                }

                function getRange(task) {
                    var startEnd = getStartEnd(task);
                    return moment().range(startEnd[0], startEnd[1]);
                }

                function handleTaskOverlap(overlapsList, task) {
                    if (!(task.model.id in overlapsList)) {
                        task.$element.addClass('gantt-task-overlaps');
                        overlapsList[task.model.id] = task;
                    }
                }

                function handleTaskNonOverlaps(overlapsList, allTasks) {
                    for (var i = 0, l = allTasks.length; i < l; i++) {
                        var task = allTasks[i];
                        if (!(task.model.id in overlapsList)) {
                            task.$element.removeClass('gantt-task-overlaps');
                        }
                    }
                }

                function handleOverlaps(tasks) {
                    // Assume that tasks are ordered with from date.
                    var newOverlapsTasks = {};

                    if (tasks.length > 1) {
                        var previousTask = tasks[0];
                        var previousRange = getRange(previousTask);

                        for (var i = 1, l = tasks.length; i < l; i++) {
                            var task = tasks[i];
                            var range = getRange(task);

                            if (range.overlaps(previousRange)) {
                                handleTaskOverlap(newOverlapsTasks, task);
                                handleTaskOverlap(newOverlapsTasks, previousTask);
                            }

                            if (previousTask.left + previousTask.width < task.left + task.width) {
                                previousTask = task;
                                previousRange = range;
                            }
                        }
                    }

                    handleTaskNonOverlaps(newOverlapsTasks, tasks);
                }

                function sortOn(array, supplier) {
                    return array.sort(function(a, b) {
                        if (supplier(a) < supplier(b)) {
                            return -1;
                        } else if (supplier(a) > supplier(b)) {
                            return 1;
                        }
                        return 0;
                    });
                }

                if (scope.enabled) {
                    api.core.on.rendered(scope, function(api) {
                        var rows = ganttCtrl.gantt.rowsManager.rows;
                        var i;
                        if (scope.global) {
                            var globalTasks = [];
                            for (i = 0; i < rows.length; i++) {
                                globalTasks.push.apply(globalTasks, rows[i].tasks);
                            }
                            globalTasks = sortOn(globalTasks, function(task) {
                                return task.model.from;
                            });
                            handleOverlaps(globalTasks);
                        } else {
                            rows = api.gantt.rowsManager.rows;
                            for (i = 0; i < rows.length; i++) {
                                handleOverlaps(rows[i].tasks);
                            }
                        }
                    });

                    api.tasks.on.change(scope, function(task) {
                        if (scope.global) {
                            var rows = task.row.rowsManager.rows;
                            var globalTasks = [];
                            for (var i = 0; i < rows.length; i++) {
                                globalTasks.push.apply(globalTasks, rows[i].tasks);
                            }
                            globalTasks = sortOn(globalTasks, function(task) {
                                return task.model.from;
                            });
                            handleOverlaps(globalTasks);
                        } else {
                            handleOverlaps(task.row.tasks);
                        }
                    });

                    api.tasks.on.rowChange(scope, function(task, oldRow) {
                        if (scope.global) {
                            var rows = oldRow.rowsManager.rows;
                            var globalTasks = [];
                            for (var i = 0; i < rows.length; i++) {
                                globalTasks.push.apply(globalTasks, rows[i].tasks);
                            }
                            globalTasks = sortOn(globalTasks, function(task) {
                                return task.model.from;
                            });
                            handleOverlaps(globalTasks);
                        } else {
                            handleOverlaps(oldRow.tasks);
                        }
                    });
                }

            }
        };
    }]);
}());


angular.module('gantt.overlap.templates', []).run(['$templateCache', function($templateCache) {

}]);

//# sourceMappingURL=angular-gantt-overlap-plugin.js.map