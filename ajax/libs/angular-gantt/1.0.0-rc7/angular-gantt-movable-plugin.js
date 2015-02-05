/*
Project: angular-gantt v1.0.0-rc7 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.movable', ['gantt']).directive('ganttMovable', ['ganttMouseButton', 'ganttMouseOffset', 'ganttSmartEvent', 'ganttMovableOptions', 'ganttUtils', '$window', '$document', '$timeout',
        function(mouseButton, mouseOffset, smartEvent, movableOptions, utils, $window, $document, $timeout) {
            // Provides moving and resizing of tasks
            return {
                restrict: 'E',
                require: '^gantt',
                scope: {
                    enabled: '=?',
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

                    var taskWithSmallWidth = 15;
                    var resizeAreaWidthBig = 5;
                    var resizeAreaWidthSmall = 3;
                    var scrollSpeed = 15;
                    var scrollTriggerDistance = 5;
                    var mouseStartOffsetX;
                    var moveStartX;

                    api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                        if (directiveName === 'ganttTask') {
                            var windowElement = angular.element($window);
                            var ganttBodyElement = taskScope.row.rowsManager.gantt.body.$element;
                            var ganttScrollElement = taskScope.row.rowsManager.gantt.scroll.$element;

                            var taskHasBeenChanged = false;
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
                                if (enabled && !taskScope.task.isMoving) {
                                    var taskOffsetX = mouseOffset.getOffset(evt).x;
                                    var mode = getMoveMode(taskOffsetX);
                                    if (mode !== '' && mode !== 'M') {
                                        taskElement.css('cursor', getCursor(mode));
                                    } else {
                                        taskElement.css('cursor', '');
                                    }
                                }
                            });

                            var handleMove = function(evt) {
                                moveTask(evt);
                                scrollScreen(evt);
                            };

                            var moveTask = function(evt) {
                                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                                var x = mousePos.x;
                                taskScope.task.mouseOffsetX = x;

                                if (taskScope.task.moveMode === 'M') {
                                    var allowRowSwitching = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowRowSwitching', scope.allowRowSwitching);
                                    if (allowRowSwitching) {
                                        var scrollRect = ganttScrollElement[0].getBoundingClientRect();
                                        var rowCenterLeft = scrollRect.left + scrollRect.width / 2;

                                        var targetRowElement = utils.findElementFromPoint(rowCenterLeft, evt.clientY, function(element) {
                                            return angular.element(element).hasClass('gantt-row');
                                        });
                                        var rows = ganttCtrl.gantt.rowsManager.rows;
                                        var targetRow;
                                        for (var i= 0, l=rows.length; i<l; i++) {
                                            if (targetRowElement === rows[i].$element[0]) {
                                                targetRow = rows[i];
                                                break;
                                            }
                                        }

                                        var sourceRow = taskScope.task.row;

                                        if (targetRow !== undefined && sourceRow !== targetRow) {
                                            targetRow.moveTaskToRow(taskScope.task, true);
                                            sourceRow.$scope.$digest();
                                            targetRow.$scope.$digest();
                                        }
                                    }

                                    var allowMoving = utils.firstProperty([taskScope.task.model.movable, taskScope.task.row.model.movable], 'allowMoving', scope.allowMoving);
                                    if (allowMoving) {
                                        x = x - mouseStartOffsetX;

                                        if (taskScope.taskOutOfRange !== 'truncate') {
                                            if (x < 0) {
                                                x = 0;
                                            } else if (x + taskScope.task.width >= taskScope.gantt.width) {
                                                x = taskScope.gantt.width - taskScope.task.width;
                                            }
                                        }

                                        taskScope.task.moveTo(x, true);
                                        taskScope.$digest();
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.move(taskScope.task);
                                    }
                                } else if (taskScope.task.moveMode === 'E') {
                                    if (x <= taskScope.task.left) {
                                        x = taskScope.task.left;
                                        taskScope.task.moveMode = 'W';
                                        setGlobalCursor(getCursor(taskScope.task.moveMode ));
                                    }

                                    if (taskScope.taskOutOfRange !== 'truncate' && x >= taskScope.gantt.width) {
                                        x = taskScope.gantt.width;
                                    }

                                    taskScope.task.setTo(x, true);
                                    taskScope.$digest();
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                } else {
                                    if (x > taskScope.task.left + taskScope.task.width) {
                                        x = taskScope.task.left + taskScope.task.width;
                                        taskScope.task.moveMode = 'E';
                                        setGlobalCursor(getCursor(taskScope.task.moveMode ));
                                    }

                                    if (taskScope.taskOutOfRange !== 'truncate' && x < 0) {
                                        x = 0;
                                    }

                                    taskScope.task.setFrom(x, true);
                                    taskScope.$digest();
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                }

                                taskHasBeenChanged = true;
                            };

                            var scrollScreen = function(evt) {
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
                                        handleMove(evt);
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
                                    distance = taskElement[0].offsetWidth < taskWithSmallWidth ? resizeAreaWidthSmall : resizeAreaWidthBig;
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

                            var setGlobalCursor = function(cursor) {
                                taskElement.css('cursor', cursor);
                                angular.element($document[0].body).css({
                                 '-moz-user-select': cursor === '' ? '': '-moz-none',
                                 '-webkit-user-select': cursor === '' ? '': 'none',
                                 '-ms-user-select': cursor === '' ? '': 'none',
                                 'user-select': cursor === '' ? '': 'none',
                                 'cursor': cursor
                                 });
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

                                // Init mouse start variables (if tasks was not move from another row)
                                if (!taskScope.task.isMoving && !taskScope.task.isResizing) {
                                    moveStartX = x;
                                    mouseStartOffsetX = x - taskScope.task.modelLeft;
                                }

                                // Init task move
                                taskHasBeenChanged = false;
                                taskScope.task.moveMode = mode;
                                taskScope.task.isMoving = true;
                                taskScope.task.active = true;

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
                                        handleMove(evt);
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

                                setGlobalCursor(getCursor(mode));
                            };

                            var disableMoveMode = function() {
                                taskElement.removeClass('gantt-task-moving');
                                taskElement.removeClass('gantt-task-resizing');

                                if (taskScope.task.originalModel !== undefined) {
                                    angular.extend(taskScope.task.originalModel, taskScope.task.model);
                                    taskScope.task.model = taskScope.task.originalModel;
                                    if (taskScope.task.row.model.id !== taskScope.task.originalRow.model.id) {
                                        var targetRow = taskScope.task.row;
                                        targetRow.removeTask(taskScope.task.model.id, false, true);
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
                                setGlobalCursor('');

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
                                enableMoveMode('E', taskScope.task.mouseOffsetX);
                                delete taskScope.task.isResizing;
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


//# sourceMappingURL=angular-gantt-movable-plugin.js.map