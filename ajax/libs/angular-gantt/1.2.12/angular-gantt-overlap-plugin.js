/*
Project: angular-gantt v1.2.12 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.overlap', ['gantt', 'gantt.overlap.templates']).directive('ganttOverlap', ['moment',function(moment) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                if (scope.enabled === undefined) {
                    scope.enabled = true;
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
                    for(var i=0, l=allTasks.length; i<l; i++) {
                        var task = allTasks[i];
                        if (!(task.model.id in overlapsList)) {
                            task.$element.removeClass('gantt-task-overlaps');
                        }
                    }
                }

                function handleOverlaps(row) {
                    // Tasks are sorted by start date when added to row
                    var allTasks = row.tasks;
                    var newOverlapsTasks = {};

                    if (allTasks.length > 1) {
                        var previousTask = allTasks[0];
                        var previousRange = getRange(previousTask);

                        for (var i = 1, l = allTasks.length; i < l; i++) {
                            var task = allTasks[i];
                            var range = getRange(task);

                            if (range.overlaps(previousRange)) {
                                handleTaskOverlap(newOverlapsTasks, task);
                                handleTaskOverlap(newOverlapsTasks, previousTask);
                            }

                            if (previousTask.left+previousTask.width < task.left+task.width) {
                                previousTask = task;
                                previousRange = range;
                            }
                        }
                    }

                    handleTaskNonOverlaps(newOverlapsTasks, allTasks);
                }

                if (scope.enabled){
                    api.tasks.on.change(scope, function(task) {
                        handleOverlaps(task.row);
                    });

                    api.tasks.on.rowChange(scope, function(task, oldRow) {
                        handleOverlaps(oldRow);
                    });
                }

            }
        };
    }]);
}());


angular.module('gantt.overlap.templates', []).run(['$templateCache', function($templateCache) {

}]);

//# sourceMappingURL=angular-gantt-overlap-plugin.js.map