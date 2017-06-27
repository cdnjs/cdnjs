/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
angular.module('gantt.bounds.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/bounds/taskBounds.tmpl.html',
        '<div ng-show="bounds && isTaskMouseOver && enabled" class="gantt-task-bounds" ng-style="getCss()" ng-class="getClass()"></div>\n' +
        '');
}]);

angular.module('gantt.drawtask.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.history.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.movable.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.progress.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/progress/taskProgress.tmpl.html',
        '<div ng-cloak ng-show=\'enabled\' class=\'gantt-task-progress\' ng-style="getCss()" ng-class="getClasses()"></div>\n' +
        '');
}]);

angular.module('gantt.sortable.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.tooltips.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/tooltips/tooltip.tmpl.html',
        '<div ng-show="showTooltips && visible" class="gantt-task-info" ng-cloak ng-style="css">\n' +
        '    <div class="gantt-task-info-content">\n' +
        '        {{ task.model.name }}</br>\n' +
        '        <small>\n' +
        '            {{\n' +
        '            task.isMilestone() === true && (getFromLabel()) || (getFromLabel() + \' - \' + getToLabel());\n' +
        '            }}\n' +
        '        </small>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

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

                                directiveScope.row.$element.scope().$digest();
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


(function(){
    'use strict';
    angular.module('gantt.movable', ['gantt']).directive('ganttMovable', ['ganttMouseButton', 'ganttMouseOffset', 'ganttSmartEvent', 'ganttMovableOptions', 'ganttUtils', '$window', '$document', '$timeout',
        function(mouseButton, mouseOffset, smartEvent, movableOptions, utils, $window, $document, $timeout) {
            // Provides moving and resizing of tasks
            return {
                restrict: 'E',
                require: '^gantt',
                scope: {
                    enabled: '=',
                    allowMoving: '=?',
                    allowResizing: '=?',
                    allowRowSwitching: '=?'
                },
                link: function(scope, element, attrs, ganttCtrl) {
                    var api = ganttCtrl.gantt.api;

                    // Load options from global options attribute.
                    if (scope.options && typeof(scope.options.movable) === 'object') {
                        for (var option in scope.options.movable) {
                            scope[option] = scope.options[option];
                        }
                    }

                    movableOptions.initialize(scope);

                    api.registerEvent('tasks', 'move');
                    api.registerEvent('tasks', 'moveBegin');
                    api.registerEvent('tasks', 'moveEnd');
                    api.registerEvent('tasks', 'resize');
                    api.registerEvent('tasks', 'resizeBegin');
                    api.registerEvent('tasks', 'resizeEnd');
                    api.registerEvent('tasks', 'change');

                    var _hasTouch = ('ontouchstart' in $window) || $window.DocumentTouch && $document[0] instanceof $window.DocumentTouch;
                    var _pressEvents = 'touchstart mousedown';
                    var _moveEvents = 'touchmove mousemove';
                    var _releaseEvents = 'touchend mouseup';

                    api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                        if (directiveName === 'ganttTask') {
                            var resizeAreaWidthBig = 5;
                            var resizeAreaWidthSmall = 3;
                            var scrollSpeed = 15;
                            var scrollTriggerDistance = 5;

                            var windowElement = angular.element($window);
                            var ganttBodyElement = taskScope.row.rowsManager.gantt.body.$element;
                            var ganttScrollElement = taskScope.row.rowsManager.gantt.scroll.$element;

                            var taskHasBeenChanged = false;
                            var mouseOffsetInEm;
                            var moveStartX;
                            var scrollInterval;

                            taskElement.on(_pressEvents, function(evt) {
                                evt.preventDefault();
                                if (_hasTouch) {
                                    evt = mouseOffset.getTouch(evt);
                                }
                                var enabled = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'enabled', scope.enabled);
                                if (enabled) {
                                    var taskOffsetX = mouseOffset.getOffset(evt).x;
                                    var mode = getMoveMode(taskOffsetX);
                                    if (mode !== '' && mouseButton.getButton(evt) === 1) {
                                        var bodyOffsetX = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt).x;
                                        enableMoveMode(mode, bodyOffsetX);
                                    }
                                    taskScope.$digest();
                                }
                            });

                            taskElement.on('mousemove', function(evt) {
                                var enabled = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'enabled', scope.enabled);
                                if (enabled) {
                                    var taskOffsetX = mouseOffset.getOffset(evt).x;
                                    var mode = getMoveMode(taskOffsetX);
                                    if (mode !== '' && (taskScope.task.isMoving || mode !== 'M')) {
                                        taskElement.css('cursor', getCursor(mode));
                                    } else {
                                        taskElement.css('cursor', '');
                                    }
                                }
                            });

                            var handleMove = function(mode, evt) {
                                moveTask(mode, evt);
                                scrollScreen(mode, evt);
                            };

                            var moveTask = function(mode, evt) {

                                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                                var x = mousePos.x;
                                taskScope.task.mouseOffsetX = x;

                                if (mode === 'M') {
                                    var allowRowSwitching = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowRowSwitching', scope.allowRowSwitching);
                                    if (allowRowSwitching) {
                                        var scrollRect = ganttScrollElement[0].getBoundingClientRect();

                                        var targetScope = utils.scopeFromPoint(scrollRect.left, evt.clientY);
                                        var targetRow = targetScope.row;
                                        var sourceRow = taskScope.task.row;

                                        if (targetRow !== undefined && sourceRow !== targetRow) {
                                            targetRow.moveTaskToRow(taskScope.task, true);
                                            sourceRow.$element.scope().$digest();
                                            targetRow.$element.scope().$digest();
                                        }
                                    }

                                    var allowMoving = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowMoving', scope.allowMoving);
                                    if (allowMoving) {
                                        x = x - mouseOffsetInEm;
                                        if (taskScope.taskOutOfRange !== 'truncate') {
                                            if (x < 0) {
                                                x = 0;
                                            } else if (x + taskScope.task.width >= taskScope.gantt.width) {
                                                x = taskScope.gantt.width - taskScope.task.width;
                                            }
                                        }
                                        taskScope.task.moveTo(x);
                                        taskScope.$digest();
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.move(taskScope.task);
                                    }
                                } else if (mode === 'E') {
                                    if (taskScope.taskOutOfRange !== 'truncate') {
                                        if (x < taskScope.task.left) {
                                            x = taskScope.task.left;
                                        } else if (x > taskScope.gantt.width) {
                                            x = taskScope.gantt.width;
                                        }
                                    }
                                    taskScope.task.setTo(x);
                                    taskScope.$digest();
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                } else {
                                    if (taskScope.taskOutOfRange !== 'truncate') {
                                        if (x > taskScope.task.left + taskScope.task.width) {
                                            x = taskScope.task.left + taskScope.task.width;
                                        } else if (x < 0) {
                                            x = 0;
                                        }
                                    }
                                    taskScope.task.setFrom(x);
                                    taskScope.$digest();
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                }

                                taskHasBeenChanged = true;
                            };

                            var scrollScreen = function(mode, evt) {
                                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                                var leftScreenBorder = ganttScrollElement[0].scrollLeft;
                                var screenWidth = ganttScrollElement[0].offsetWidth;
                                var scrollWidth = ganttScrollElement[0].scrollWidth;
                                var rightScreenBorder = leftScreenBorder + screenWidth;
                                var keepOnScrolling = false;

                                if (mousePos.x < moveStartX) {
                                    // Scroll to the left
                                    if (leftScreenBorder > 0 && mousePos.x <= leftScreenBorder + scrollTriggerDistance) {
                                        mousePos.x -= scrollSpeed;
                                        keepOnScrolling = true;
                                        taskScope.row.rowsManager.gantt.api.scroll.left(scrollSpeed);
                                    }
                                } else {
                                    // Scroll to the right
                                    if (rightScreenBorder < scrollWidth && mousePos.x >= rightScreenBorder - scrollTriggerDistance) {
                                        mousePos.x += scrollSpeed;
                                        keepOnScrolling = true;
                                        taskScope.row.rowsManager.gantt.api.scroll.right(scrollSpeed);
                                    }
                                }

                                if (keepOnScrolling) {
                                    scrollInterval = $timeout(function() {
                                        handleMove(mode, evt);
                                    }, 100, true);
                                }
                            };

                            var clearScrollInterval = function() {
                                if (scrollInterval !== undefined) {
                                    $timeout.cancel(scrollInterval);
                                    scrollInterval = undefined;
                                }
                            };

                            var getMoveMode = function(x) {
                                var distance = 0;

                                var allowResizing = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowResizing', scope.allowResizing);
                                var allowRowSwitching = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowRowSwitching', scope.allowRowSwitching);
                                var allowMoving = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowMoving', scope.allowMoving);

                                // Define resize&move area. Make sure the move area does not get too small.
                                if (allowResizing) {
                                    distance = taskElement[0].offsetWidth < 10 ? resizeAreaWidthSmall : resizeAreaWidthBig;
                                }

                                if (allowResizing && x > taskElement[0].offsetWidth - distance) {
                                    return 'E';
                                } else if (allowResizing && x < distance) {
                                    return 'W';
                                } else if ((allowMoving || allowRowSwitching) && x >= distance && x <= taskElement[0].offsetWidth - distance) {
                                    return 'M';
                                } else {
                                    return '';
                                }
                            };

                            var getCursor = function(mode) {
                                switch (mode) {
                                    case 'E':
                                        return 'e-resize';
                                    case 'W':
                                        return 'w-resize';
                                    case 'M':
                                        return 'move';
                                }
                            };

                            var enableMoveMode = function(mode, x) {
                                // Clone taskModel
                                if (taskScope.task.originalModel === undefined) {
                                    taskScope.task.originalRow = taskScope.task.row;
                                    taskScope.task.originalModel = taskScope.task.model;
                                    taskScope.task.model = angular.copy(taskScope.task.originalModel);
                                }

                                if (mode === 'M') {
                                    taskElement.addClass('gantt-task-moving');
                                    if (!taskScope.task.isMoving) {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.moveBegin(taskScope.task);
                                    }
                                } else {
                                    taskElement.addClass('gantt-task-resizing');
                                    if (!taskScope.task.isMoving) {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resizeBegin(taskScope.task);
                                    }
                                }

                                // Init task move
                                taskHasBeenChanged = false;
                                taskScope.task.moveMode = mode;
                                taskScope.task.isMoving = true;
                                taskScope.task.active = true;
                                moveStartX = x;
                                mouseOffsetInEm = x - taskScope.task.modelLeft;

                                // Add move event handlers
                                var taskMoveHandler = function(evt) {
                                    evt.stopImmediatePropagation();
                                    if (_hasTouch) {
                                        evt = mouseOffset.getTouch(evt);
                                    }
                                    if (taskScope.task.isMoving) {
                                        // As this function is defered, disableMoveMode may have been called before.
                                        // Without this check, task.changed event is not fired for faster moves.
                                        // See github issue #190
                                        clearScrollInterval();
                                        handleMove(mode, evt);
                                    }
                                };
                                var moveSmartEvent = smartEvent(taskScope, windowElement, _moveEvents, taskMoveHandler);
                                moveSmartEvent.bind();

                                smartEvent(taskScope, windowElement, _releaseEvents, function(evt) {
                                    if (_hasTouch) {
                                        evt = mouseOffset.getTouch(evt);
                                    }
                                    moveSmartEvent.unbind();
                                    disableMoveMode(evt);
                                    taskScope.$digest();
                                }).bindOnce();

                                // Show mouse move/resize cursor
                                taskElement.css('cursor', getCursor(mode));
                                angular.element($document[0].body).css({
                                    '-moz-user-select': '-moz-none',
                                    '-webkit-user-select': 'none',
                                    '-ms-user-select': 'none',
                                    'user-select': 'none',
                                    'cursor': getCursor(mode)
                                });
                            };

                            var disableMoveMode = function() {
                                taskElement.removeClass('gantt-task-moving');
                                taskElement.removeClass('gantt-task-resizing');

                                if (taskScope.task.originalModel !== undefined) {
                                    angular.extend(taskScope.task.originalModel, taskScope.task.model);
                                    taskScope.task.model = taskScope.task.originalModel;
                                    if (taskScope.task.row.model.id !== taskScope.task.originalRow.model.id) {
                                        var targetRow = taskScope.task.row;
                                        targetRow.removeTask(taskScope.task.model.id);
                                        taskScope.task.row = taskScope.task.originalRow;
                                        targetRow.moveTaskToRow(taskScope.task, false);
                                    }
                                    delete taskScope.task.originalModel;
                                    delete taskScope.task.originalRow;

                                    taskScope.$apply();
                                }

                                taskScope.task.isMoving = false;
                                taskScope.task.active = false;

                                // Stop any active auto scroll
                                clearScrollInterval();

                                // Set mouse cursor back to default
                                taskElement.css('cursor', '');
                                angular.element($document[0].body).css({
                                    '-moz-user-select': '',
                                    '-webkit-user-select': '',
                                    '-ms-user-select': '',
                                    'user-select': '',
                                    'cursor': ''
                                });

                                // Raise move end event
                                if (taskScope.task.moveMode === 'M') {
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.moveEnd(taskScope.task);
                                } else {
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resizeEnd(taskScope.task);
                                }

                                taskScope.task.moveMode = undefined;

                                // Raise task changed event
                                if (taskHasBeenChanged === true) {
                                    taskHasBeenChanged = false;
                                    taskScope.task.row.sortTasks(); // Sort tasks so they have the right z-order
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.change(taskScope.task);
                                }
                            };

                            if (taskScope.task.isResizing) {
                                delete taskScope.task.isResizing;
                                enableMoveMode('E', taskScope.task.mouseOffsetX);
                            } else if (taskScope.task.isMoving) {
                                // In case the task has been moved to another row a new controller is is created by angular.
                                // Enable the move mode again if this was the case.
                                enableMoveMode('M', taskScope.task.mouseOffsetX);
                            }

                        }
                    });

                }
            };
        }]);
}());


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
    angular.module('gantt.sortable', ['gantt', 'ang-drag-drop']).directive('ganttSortable', ['ganttUtils', '$compile', function(utils, $compile) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.sortable) === 'object') {
                    for (var option in scope.options.sortable) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                api.directives.on.new(scope, function(directiveName, rowScope, rowElement) {
                    if (directiveName === 'ganttRowLabel') {
                        rowScope.checkDraggable = function() {
                            return utils.firstProperty([rowScope.row.model.sortable], 'enabled', scope.enabled);
                        };

                        rowScope.onDropSuccess = function() {
                            rowScope.$evalAsync();
                        };

                        rowScope.onDrop = function(evt, data) {
                            var row = rowScope.row.rowsManager.rowsMap[data.id];
                            if (row !== rowScope) {
                                rowScope.row.rowsManager.moveRow(row, rowScope.row);
                                rowScope.$evalAsync();
                            }
                        };

                        rowElement.attr('ui-draggable', '{{checkDraggable()}}');
                        rowElement.attr('drag-channel', '\'sortable\'');
                        rowElement.attr('ui-on-drop', 'onDrop($event, $data)');
                        rowElement.attr('on-drop-success', 'onDropSuccess()');

                        rowElement.attr('drop-channel', '\'sortable\'');
                        rowElement.attr('drag', 'row.model');

                        $compile(rowElement)(rowScope);
                    }
                });

            }
        };
    }]);
}());


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


(function(){
    'use strict';
    angular.module('gantt.movable').factory('ganttMovableOptions', [function() {
        return {
            initialize: function(options) {

                options.enabled = options.enabled !== undefined ? !!options.enabled : true;
                options.allowMoving = options.allowMoving !== undefined ? !!options.allowMoving : true;
                options.allowResizing = options.allowResizing !== undefined ? !!options.allowResizing : true;
                options.allowRowSwitching = options.allowRowSwitching !== undefined ? !!options.allowRowSwitching : true;

                return options;
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


//# sourceMappingURL=angular-gantt-plugins.js.map