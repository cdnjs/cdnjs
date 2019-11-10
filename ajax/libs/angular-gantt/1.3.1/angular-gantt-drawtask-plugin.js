/*
Project: angular-gantt v1.3.1 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.drawtask', ['gantt']).directive('ganttDrawTask', ['$document', 'ganttMouseOffset', 'ganttUtils', 'moment', function(document, mouseOffset, utils, moment) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                moveThreshold: '=?',
                taskFactory: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.drawtask) === 'object') {
                    for (var option in scope.options.drawtask) {
                        scope[option] = scope.options.drawtask[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.moveThreshold === undefined) {
                    scope.moveThreshold = 0;
                }

                if (scope.taskFactory === undefined) {
                    scope.taskFactory = function() {
                        return {}; // New empty task.
                    };
                }

                api.registerEvent('tasks', 'draw');
                api.registerEvent('tasks', 'drawBegin');
                api.registerEvent('tasks', 'drawEnd');

                var newTaskModel = function(row) {
                    if (row.model.drawTask && angular.isFunction(row.model.drawTask.taskFactory)) {
                        return row.model.drawTask.taskFactory();
                    } else {
                        return scope.taskFactory();
                    }
                };

                api.directives.on.new(scope, function(directiveName, directiveScope, element) {
                    if (directiveName === 'ganttRow') {
                        var addNewTask = function(x) {
                            var startDate = api.core.getDateByPosition(x, true);
                            var endDate = moment(startDate);

                            var taskModel = newTaskModel(directiveScope.row);
                            taskModel.from = startDate;
                            taskModel.to = endDate;

                            var task = directiveScope.row.addTask(taskModel);
                            task.isResizing = true;
                            task.updatePosAndSize();
                            directiveScope.row.updateVisibleTasks();

                            directiveScope.row.$scope.$digest();

                            return task;
                        };

                        var addEventListeners = function(task) {
                            var raiseDrawEvent = function() {
                                directiveScope.row.rowsManager.gantt.api.tasks.raise.draw(task);
                            };

                            directiveScope.row.rowsManager.gantt.api.tasks.raise.drawBegin(task);

                            document.on('mousemove', raiseDrawEvent);

                            document.one('mouseup', function() {
                                directiveScope.row.rowsManager.gantt.api.tasks.raise.drawEnd(task);
                                document.off('mousemove', raiseDrawEvent);
                            });
                        };

                        var deferDrawing = function(startX) {
                            var moveTrigger = function(evt) {
                                var currentX = mouseOffset.getOffset(evt).x;

                                if (Math.abs(startX - currentX) >= scope.moveThreshold) {
                                    element.off('mousemove', moveTrigger);
                                    var task = addNewTask(startX);
                                    addEventListeners(task);
                                }
                            };

                            element.on('mousemove', moveTrigger);
                            document.one('mouseup', function() {
                                element.off('mousemove', moveTrigger);
                            });
                        };

                        var drawHandler = function(evt) {
                            var evtTarget = (evt.target ? evt.target : evt.srcElement);

                            var rowDrawTask = directiveScope.row.model.drawTask;

                            if (typeof(rowDrawTask) === 'boolean' || angular.isFunction(rowDrawTask)) {
                                rowDrawTask = {enabled: rowDrawTask};
                            }

                            var enabledValue = utils.firstProperty([rowDrawTask], 'enabled', scope.enabled);
                            var enabled = angular.isFunction(enabledValue) ? enabledValue(evt, directiveScope.row) : enabledValue;
                            if (enabled && evtTarget.className.indexOf('gantt-row') > -1) {
                                var x = mouseOffset.getOffset(evt).x;

                                if (scope.moveThreshold === 0) {
                                    var task = addNewTask(x);
                                    addEventListeners(task);
                                } else {
                                    deferDrawing(x);
                                }
                            }
                        };

                        element.on('mousedown', drawHandler);
                        directiveScope.drawTaskHandler = drawHandler;
                    }
                });

                api.directives.on.destroy(scope, function(directiveName, directiveScope, element) {
                    if (directiveName === 'ganttRow') {
                        element.off('mousedown', directiveScope.drawTaskHandler);
                        delete directiveScope.drawTaskHandler;
                    }
                });
            }
        };
    }]);
}());


angular.module('gantt.drawtask.templates', []).run(['$templateCache', function ($templateCache) {

}]);

//# sourceMappingURL=angular-gantt-drawtask-plugin.js.map