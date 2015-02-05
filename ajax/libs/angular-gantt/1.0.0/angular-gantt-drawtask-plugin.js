/*
Project: angular-gantt v1.0.0 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.drawtask', ['gantt']).directive('ganttDrawTask', ['ganttMouseOffset', 'moment', function(mouseOffset, moment) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                taskModelFactory: '=taskFactory'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                api.directives.on.new(scope, function(directiveName, directiveScope, element) {
                    if (directiveName === 'ganttRow') {
                        var drawHandler = function(evt) {
                            var evtTarget = (evt.target ? evt.target : evt.srcElement);
                            if (scope.enabled && evtTarget.className.indexOf('gantt-row') > -1) {
                                var startDate = api.core.getDateByPosition(mouseOffset.getOffset(evt).x);
                                var endDate = moment(startDate);

                                var taskModel = scope.taskModelFactory();
                                taskModel.from = startDate;
                                taskModel.to = endDate;

                                var task = directiveScope.row.addTask(taskModel);
                                task.isResizing = true;
                                task.updatePosAndSize();
                                directiveScope.row.updateVisibleTasks();

                                directiveScope.row.$scope.$digest();
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


//# sourceMappingURL=angular-gantt-drawtask-plugin.js.map