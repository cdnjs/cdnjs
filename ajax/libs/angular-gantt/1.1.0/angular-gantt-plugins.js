/*
Project: angular-gantt v1.1.0 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.bounds', ['gantt', 'gantt.bounds.templates']).directive('ganttBounds', ['moment', '$compile', '$document', function(moment, $compile, $document) {
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

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var boundsScope = taskScope.$new();
                        boundsScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'task.model.est && task.model.lct && pluginScope.enabled');
                        var boundsElement = $document[0].createElement('gantt-task-bounds');
                        if (attrs.templateUrl !== undefined) {
                            angular.element(boundsElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(boundsElement).attr('data-template', attrs.template);
                        }
                        angular.element(ifElement).append(boundsElement);
                        taskElement.append($compile(ifElement)(boundsScope));
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

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                api.directives.on.new(scope, function(directiveName, directiveScope, element) {
                    if (directiveName === 'ganttRow') {
                        var drawHandler = function(evt) {
                            var evtTarget = (evt.target ? evt.target : evt.srcElement);
                            var enabled = angular.isFunction(scope.enabled) ? scope.enabled(evt): scope.enabled;
                            if (enabled && evtTarget.className.indexOf('gantt-row') > -1) {
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


(function(){
    'use strict';
    angular.module('gantt.groups', ['gantt', 'gantt.groups.templates']).directive('ganttGroups', ['ganttUtils', 'GanttHierarchy', '$compile', '$document', function(utils, Hierarchy, $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                display: '=?'
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

                if (scope.display === undefined) {
                    scope.display = 'group';
                }

                scope.hierarchy = new Hierarchy();

                function refresh() {
                    scope.hierarchy.refresh(ganttCtrl.gantt.rowsManager.filteredRows);
                }

                ganttCtrl.gantt.api.registerMethod('groups', 'refresh', refresh, this);
                ganttCtrl.gantt.$scope.$watchCollection('gantt.rowsManager.filteredRows', function() {
                    refresh();
                });

                api.directives.on.new(scope, function(directiveName, rowScope, rowElement) {
                    if (directiveName === 'ganttRow') {
                        var taskGroupScope = rowScope.$new();
                        taskGroupScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');

                        var taskGroupElement = $document[0].createElement('gantt-task-group');
                        if (attrs.templateUrl !== undefined) {
                            angular.element(taskGroupElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(taskGroupElement).attr('data-template', attrs.template);
                        }

                        angular.element(ifElement).append(taskGroupElement);

                        rowElement.append($compile(ifElement)(taskGroupScope));
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.labels', ['gantt', 'gantt.labels.templates']).directive('ganttLabels', ['ganttUtils', '$compile', '$document', '$log', function(utils, $compile, $document, $log) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                header: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                $log.warn('Angular Gantt Labels plugin is deprecated. Please use Table plugin instead.');

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.sortable) === 'object') {
                    for (var option in scope.options.sortable) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.header === undefined) {
                    scope.header = 'Name';
                }

                api.directives.on.new(scope, function(directiveName, sideContentScope, sideContentElement) {
                    if (directiveName === 'ganttSideContent') {
                        var labelsScope = sideContentScope.$new();
                        labelsScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
                        angular.element(ifElement).addClass('side-element');

                        var labelsElement = $document[0].createElement('gantt-side-content-labels');
                        angular.element(ifElement).append(labelsElement);

                        sideContentElement.append($compile(ifElement)(labelsScope));
                    }
                });

                function fitSideWidthToLabels() {
                    var labels = ganttCtrl.gantt.side.$element[0].getElementsByClassName('gantt-row-label');
                    var newSideWidth = 0;

                    angular.forEach(labels, function (label) {
                        var width = label.children[0].offsetWidth;
                        newSideWidth = Math.max(newSideWidth, width);
                    });

                    if (newSideWidth >= 0) {
                        api.side.setWidth(newSideWidth);
                    }
                }

                api.registerMethod('labels', 'fitSideWidth', fitSideWidthToLabels, this);
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

                            var foregroundElement = taskScope.task.getForegroundElement();

                            foregroundElement.on(_pressEvents, function(evt) {
                                evt.preventDefault();
                                if (_hasTouch) {
                                    evt = mouseOffset.getTouch(evt);
                                }
                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean') {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean') {
                                    rowMovable = {enabled: rowMovable};
                                }

                                var enabledValue = utils.firstProperty([taskMovable, rowMovable], 'enabled', scope.enabled);
                                var enabled = angular.isFunction(enabledValue) ? enabledValue(evt): enabledValue;
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

                            foregroundElement.on('mousemove', function(evt) {
                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean') {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean') {
                                    rowMovable = {enabled: rowMovable};
                                }

                                var enabledValue = utils.firstProperty([taskMovable, rowMovable], 'enabled', scope.enabled);
                                var enabled = angular.isFunction(enabledValue) ? enabledValue(evt): enabledValue;
                                if (enabled && !taskScope.task.isMoving) {
                                    var taskOffsetX = mouseOffset.getOffset(evt).x;
                                    var mode = getMoveMode(taskOffsetX);
                                    if (mode !== '' && mode !== 'M') {
                                        foregroundElement.css('cursor', getCursor(mode));
                                    } else {
                                        foregroundElement.css('cursor', '');
                                    }
                                }
                            });

                            var handleMove = function(evt) {
                                if (taskScope.task.isMoving && !taskScope.destroyed) {
                                    clearScrollInterval();
                                    moveTask(evt);
                                    scrollScreen(evt);
                                }
                            };

                            var moveTask = function(evt) {
                                var oldTaskHasBeenChanged = taskHasBeenChanged;

                                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                                var x = mousePos.x;
                                taskScope.task.mouseOffsetX = x;
                                var taskOutOfRange = taskScope.task.row.rowsManager.gantt.options.value('taskOutOfRange');

                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean') {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean') {
                                    rowMovable = {enabled: rowMovable};
                                }

                                if (taskScope.task.moveMode === 'M') {
                                    var allowRowSwitching = utils.firstProperty([taskMovable, rowMovable], 'allowRowSwitching', scope.allowRowSwitching);
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
                                            taskHasBeenChanged = true;
                                        }
                                    }

                                    var allowMoving = utils.firstProperty([taskMovable, rowMovable], 'allowMoving', scope.allowMoving);
                                    if (allowMoving) {
                                        x = x - mouseStartOffsetX;

                                        if (taskOutOfRange !== 'truncate') {
                                            if (x < 0) {
                                                x = 0;
                                            } else if (x + taskScope.task.width >= taskScope.gantt.width) {
                                                x = taskScope.gantt.width - taskScope.task.width;
                                            }
                                        }

                                        taskScope.task.moveTo(x, true);
                                        taskScope.$digest();
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.move(taskScope.task);
                                        taskHasBeenChanged = true;
                                    }
                                } else if (taskScope.task.moveMode === 'E') {
                                    if (x <= taskScope.task.left) {
                                        x = taskScope.task.left;
                                        taskScope.task.moveMode = 'W';
                                        setGlobalCursor(getCursor(taskScope.task.moveMode ));
                                    }

                                    if (taskOutOfRange !== 'truncate' && x >= taskScope.gantt.width) {
                                        x = taskScope.gantt.width;
                                    }

                                    taskScope.task.setTo(x, true);
                                    taskScope.$digest();
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                    taskHasBeenChanged = true;
                                } else {
                                    if (x > taskScope.task.left + taskScope.task.width) {
                                        x = taskScope.task.left + taskScope.task.width;
                                        taskScope.task.moveMode = 'E';
                                        setGlobalCursor(getCursor(taskScope.task.moveMode ));
                                    }

                                    if (taskOutOfRange !== 'truncate' && x < 0) {
                                        x = 0;
                                    }

                                    taskScope.task.setFrom(x, true);
                                    taskScope.$digest();
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                    taskHasBeenChanged = true;
                                }

                                if (!oldTaskHasBeenChanged && taskHasBeenChanged) {
                                    var backgroundElement = taskScope.task.getBackgroundElement();
                                    if (taskScope.task.moveMode === 'M') {
                                        backgroundElement.addClass('gantt-task-moving');
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.moveBegin(taskScope.task);
                                    } else {
                                        backgroundElement.addClass('gantt-task-resizing');
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resizeBegin(taskScope.task);
                                    }
                                }
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


                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean') {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean') {
                                    rowMovable = {enabled: rowMovable};
                                }

                                var allowResizing = utils.firstProperty([taskMovable, rowMovable], 'allowResizing', scope.allowResizing);
                                var allowRowSwitching = utils.firstProperty([taskMovable, rowMovable], 'allowRowSwitching', scope.allowRowSwitching);
                                var allowMoving = utils.firstProperty([taskMovable, rowMovable], 'allowMoving', scope.allowMoving);

                                // Define resize&move area. Make sure the move area does not get too small.
                                if (allowResizing) {
                                    distance = foregroundElement[0].offsetWidth < taskWithSmallWidth ? resizeAreaWidthSmall : resizeAreaWidthBig;
                                }

                                if (allowResizing && x > foregroundElement[0].offsetWidth - distance) {
                                    return 'E';
                                } else if (allowResizing && x < distance) {
                                    return 'W';
                                } else if ((allowMoving || allowRowSwitching) && x >= distance && x <= foregroundElement[0].offsetWidth - distance) {
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

                                // Add move event handler
                                var taskMoveHandler = function(evt) {
                                    evt.stopImmediatePropagation();
                                    if (_hasTouch) {
                                        evt = mouseOffset.getTouch(evt);
                                    }

                                    handleMove(evt);
                                };
                                var moveSmartEvent = smartEvent(taskScope, windowElement, _moveEvents, taskMoveHandler);
                                moveSmartEvent.bind();

                                // Remove move event handler on mouse up / touch end
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
                                var getBackgroundElement = taskScope.task.getBackgroundElement();
                                getBackgroundElement.removeClass('gantt-task-moving');
                                getBackgroundElement.removeClass('gantt-task-resizing');

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

                                // Raise task changed event
                                if (taskHasBeenChanged === true) {
                                    // Raise move end event
                                    if (taskScope.task.moveMode === 'M') {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.moveEnd(taskScope.task);
                                    } else {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resizeEnd(taskScope.task);
                                    }

                                    taskHasBeenChanged = false;
                                    taskScope.task.row.sortTasks(); // Sort tasks so they have the right z-order
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.change(taskScope.task);
                                }

                                taskScope.task.moveMode = undefined;
                            };

                            // Stop scroll cycle (if running) when scope is destroyed.
                            // This is needed when the task is moved to a new row during scroll because
                            // the old scope will continue to scroll otherwise
                            taskScope.$on('$destroy', function() {
                                taskScope.destroyed = true;
                                clearScrollInterval();
                            });

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
    angular.module('gantt.progress', ['gantt', 'gantt.progress.templates']).directive('ganttProgress', ['moment', '$compile', '$document', function(moment, $compile, $document) {
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

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTaskBackground') {
                        var progressScope = taskScope.$new();
                        progressScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'task.model.progress !== undefined && pluginScope.enabled');

                        var progressElement = $document[0].createElement('gantt-task-progress');
                        if (attrs.templateUrl !== undefined) {
                            angular.element(progressElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(progressElement).attr('data-template', attrs.template);
                        }
                        angular.element(ifElement).append(progressElement);
                        taskElement.append($compile(ifElement)(progressScope));
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

    var moduleName = 'gantt.sortable';
    var directiveName = 'ganttSortable';
    var pluginDependencies = [
        'gantt',
        {module:'ang-drag-drop', url:'https://github.com/ganarajpr/angular-dragdrop.git#master'}
    ];

    var failedDependencies = [];
    var loadedDependencies = [];
    var failedDependency;

    for (var i = 0, l = pluginDependencies.length; i < l; i++) {
        var currentDependency = pluginDependencies[i];
        try {
            if (angular.isString(currentDependency)) {
                currentDependency = {module: currentDependency};
                pluginDependencies[i] = currentDependency;
            }
            angular.module(currentDependency.module);
            loadedDependencies.push(currentDependency.module);
        } catch (e) {
            currentDependency.exception = e;
            failedDependencies.push(currentDependency);
        }
    }

    if (failedDependencies.length > 0) {
        angular.module(moduleName, []).directive(directiveName, ['$log', function($log) {
            return {
                restrict: 'E',
                require: '^gantt',
                scope: {
                    enabled: '=?'
                },
                link: function() {
                    $log.warn(moduleName + ' module can\'t require some dependencies:');
                    for (var i= 0,l =failedDependencies.length; i<l; i++) {
                        failedDependency = failedDependencies[i];

                        var errorMessage = failedDependency.module;
                        if (failedDependency.url) {
                            errorMessage += ' (' + failedDependency.url + ')';
                        }
                        if (failedDependency.exception && failedDependency.exception.message) {
                            errorMessage += ': ' + failedDependency.exception.message;
                        }

                        $log.warn(errorMessage);
                    }
                    $log.warn(directiveName + ' plugin directive won\'t be available');
                }
            };
        }]);
    } else {
        angular.module(moduleName, loadedDependencies).directive(directiveName, ['ganttUtils', '$compile', function(utils, $compile) {
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
                        if (directiveName === 'ganttRowLabel' && rowElement.attr('drag') === undefined) {
                            rowScope.checkDraggable = function() {
                                var rowSortable = rowScope.row.model.sortable;

                                if (typeof(rowSortable) === 'boolean') {
                                    rowSortable = {enabled: rowSortable};
                                }

                                return utils.firstProperty([rowSortable], 'enabled', scope.enabled);
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
    }

}());


(function(){
    'use strict';
    angular.module('gantt.table', ['gantt', 'gantt.table.templates']).directive('ganttTable', ['ganttUtils', '$compile', '$document', function(utils, $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                columns: '=',
                headers: '=?',
                formatters: '=?',
                headerFormatter: '=?'
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

                if (scope.columns === undefined) {
                    scope.columns = ['model.name'];
                }

                if (scope.headers === undefined) {
                    scope.headers = {'model.name': 'Name'};
                }

                if (scope.formatters === undefined) {
                    scope.formatters = {};
                }

                api.directives.on.new(scope, function(directiveName, sideContentScope, sideContentElement) {
                    if (directiveName === 'ganttSideContent') {
                        var tableScope = sideContentScope.$new();
                        tableScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
                        angular.element(ifElement).addClass('side-element');

                        var tableElement = $document[0].createElement('gantt-side-content-table');
                        angular.element(ifElement).append(tableElement);

                        sideContentElement.append($compile(ifElement)(tableScope));
                    }
                });

            }
        };
    }]);
}());


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
    angular.module('gantt.tree', ['gantt', 'gantt.tree.templates', 'ui.tree']).directive('ganttTree', ['ganttUtils', '$compile', '$document', function(utils, $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                header: '=?'
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

                if (scope.header === undefined) {
                    scope.header = 'Name';
                }

                api.directives.on.new(scope, function(directiveName, sideContentScope, sideContentElement) {
                    if (directiveName === 'ganttSideContent') {
                        var labelsScope = sideContentScope.$new();
                        labelsScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
                        angular.element(ifElement).addClass('side-element');

                        var labelsElement = $document[0].createElement('gantt-side-content-tree');
                        angular.element(ifElement).append(labelsElement);

                        sideContentElement.append($compile(ifElement)(labelsScope));
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.bounds').directive('ganttTaskBounds', ['$templateCache', 'moment', function($templateCache, moment) {
        // Displays a box representing the earliest allowable start time and latest completion time for a job

        return {
            restrict: 'E',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/bounds/taskBounds.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            replace: true,
            scope: true,
            controller: ['$scope', '$element', function($scope, $element) {
                $element.toggleClass('ng-hide', true);

                $scope.simplifyMoment = function(d) {
                    return moment.isMoment(d) ? d.unix() : d;
                };

                $scope.$watchGroup(['simplifyMoment(task.model.est)', 'simplifyMoment(task.model.lct)', 'task.left', 'task.width'], function() {
                    var left = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.est);
                    var right = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.lct);

                    $element.css('left', left - $scope.task.left + 'px');
                    $element.css('width', right - left + 'px');

                    $element.toggleClass('gantt-task-bounds-in', false);
                    $element.toggleClass('gantt-task-bounds-out', false);
                    if ($scope.task.model.est === undefined || $scope.task.model.lct === undefined) {
                        $element.toggleClass('gantt-task-bounds-in', true);
                    } else if ($scope.task.model.est > $scope.task.model.from) {
                        $element.toggleClass('gantt-task-bounds-out', true);
                    }
                    else if ($scope.task.model.lct < $scope.task.model.to) {
                        $element.toggleClass('gantt-task-bounds-out', true);
                    } else {
                        $element.toggleClass('gantt-task-bounds-in', true);
                    }
                });

                $scope.task.$element.bind('mouseenter', function() {
                    $element.toggleClass('ng-hide', false);
                });

                $scope.task.$element.bind('mouseleave', function() {
                    $element.toggleClass('ng-hide', true);
                });

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
    angular.module('gantt.groups').controller('GanttGroupController', ['$scope', 'GanttTaskGroup', 'ganttUtils', function($scope, TaskGroup, utils) {
        var updateTaskGroup = function() {
            var rowGroups = $scope.row.model.groups;

            if (typeof(rowGroups) === 'boolean') {
                rowGroups = {enabled: rowGroups};
            }

            var enabledValue = utils.firstProperty([rowGroups], 'enabled', $scope.pluginScope.enabled);
            if (enabledValue) {
                $scope.display = utils.firstProperty([rowGroups], 'display', $scope.pluginScope.display);
                $scope.taskGroup = new TaskGroup($scope.row, $scope.pluginScope);

                $scope.row.setFromTo();
                $scope.row.setFromToByValues($scope.taskGroup.from, $scope.taskGroup.to);
            } else {
                $scope.taskGroup = undefined;
                $scope.display = undefined;
            }
        };

        $scope.gantt.api.tasks.on.change($scope, function(task) {
            if ($scope.taskGroup !== undefined) {
                if ($scope.taskGroup.tasks.indexOf(task) > -1) {
                    $scope.$apply(function() {
                        updateTaskGroup();
                    });
                } else {
                    var descendants = $scope.pluginScope.hierarchy.descendants($scope.row);
                    if (descendants.indexOf(task.row) > -1) {
                        $scope.$apply(function() {
                            updateTaskGroup();
                        });
                    }
                }
            }
        });

        $scope.pluginScope.$watch('display', function() {
            updateTaskGroup();
        });

        $scope.$watchCollection('gantt.rowsManager.filteredRows', function() {
            updateTaskGroup();
        });

        $scope.gantt.api.columns.on.refresh($scope, function() {
            updateTaskGroup();
        });
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.groups').directive('ganttTaskGroup', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTaskGroup', 'plugins/groups/taskGroup.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';

    angular.module('gantt').factory('GanttTaskGroup', ['ganttUtils', 'GanttTask', function(utils, Task) {
        var TaskGroup = function (row, pluginScope) {
            var self = this;

            self.row = row;
            self.pluginScope = pluginScope;

            self.descendants = self.pluginScope.hierarchy.descendants(self.row);

            self.tasks = [];
            self.overviewTasks = [];
            self.groupedTasks = [];

            var groupRowGroups = self.row.model.groups;
            if (typeof(groupRowGroups) === 'boolean') {
                groupRowGroups = {enabled: groupRowGroups};
            }

            var getTaskDisplay = function(task) {
                var taskGroups = task.model.groups;
                if (typeof(taskGroups) === 'boolean') {
                    taskGroups = {enabled: taskGroups};
                }

                var rowGroups = task.row.model.groups;
                if (typeof(rowGroups) === 'boolean') {
                    rowGroups = {enabled: rowGroups};
                }

                var enabledValue = utils.firstProperty([taskGroups, rowGroups, groupRowGroups], 'enabled', self.pluginScope.enabled);

                if (enabledValue) {
                    var display = utils.firstProperty([taskGroups, rowGroups, groupRowGroups], 'display', self.pluginScope.display);
                    return display;
                }
            };

            angular.forEach(self.descendants, function(descendant) {
                angular.forEach(descendant.tasks, function(task) {
                    if (getTaskDisplay(task) !== undefined) {
                        self.tasks.push(task);
                    }
                });
                angular.forEach(descendant.visibleTasks, function(visibleTask) {
                    var taskDisplay = getTaskDisplay(visibleTask);
                    if (taskDisplay !== undefined) {
                        var clone = new Task(self.row, visibleTask.model);

                        if (taskDisplay === 'overview') {
                            self.overviewTasks.push(clone);
                            clone.updatePosAndSize();
                        } else {
                            self.groupedTasks.push(clone);
                        }
                    }
                });
            });

            self.from = undefined;
            angular.forEach(self.tasks, function(task) {
                if (self.from === undefined || task.model.from < self.from) {
                    self.from =  task.model.from;
                }
            });

            self.to = undefined;
            angular.forEach(self.tasks, function(task) {
                if (self.to === undefined || task.model.to > self.to) {
                    self.to = task.model.to;
                }
            });

            self.left = row.rowsManager.gantt.getPositionByDate(self.from);
            self.width = row.rowsManager.gantt.getPositionByDate(self.to) - self.left;
        };
        return TaskGroup;
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt').directive('ganttTaskOverview', ['GanttDirectiveBuilder', 'moment', function(Builder, moment) {
        var builder = new Builder('ganttTaskOverview', 'plugins/groups/taskOverview.tmpl.html');
        builder.controller = function($scope, $element) {
            $scope.task.$element = $element;
            $scope.task.$scope = $scope;

            $scope.simplifyMoment = function(d) {
                return moment.isMoment(d) ? d.unix() : d;
            };

            $scope.$watchGroup(['simplifyMoment(task.model.from)', 'simplifyMoment(task.model.to)'], function() {
                $scope.task.updatePosAndSize();
            });
        };
        return builder.build();
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt.labels').directive('ganttLabelsBody', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttLabelsBody', 'plugins/labels/labelsBody.tmpl.html');
        builder.controller = function($scope) {
            var hScrollBarHeight = layout.getScrollBarHeight();

            $scope.getLabelsCss = function() {
                var css = {};

                if ($scope.maxHeight) {
                    var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
                    css['max-height'] = $scope.maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());



(function(){
    'use strict';
    angular.module('gantt.labels').directive('ganttLabelsHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttLabelsHeader', 'plugins/labels/labelsHeader.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.labels').directive('ganttSideContentLabels', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttSideContentLabels', 'plugins/labels/sideContentLabels.tmpl.html');
        return builder.build();
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
    angular.module('gantt.progress').directive('ganttTaskProgress', ['$templateCache', function($templateCache) {
        return {
            restrict: 'E',
            requires: '^ganttTask',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/progress/taskProgress.tmpl.html';
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
                $scope.getClasses = function() {
                    var classes = [];

                    if (typeof($scope.task.model.progress) === 'object') {
                        classes = $scope.task.model.progress.classes;
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
    angular.module('gantt.table').directive('ganttSideContentTable', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttSideContentTable', 'plugins/table/sideContentTable.tmpl.html');
        builder.controller = function($scope) {
            var hScrollBarHeight = layout.getScrollBarHeight();

            $scope.getMaxHeightCss = function() {
                var css = {};

                if ($scope.maxHeight) {
                    var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
                    css['max-height'] = $scope.maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt.table').controller('TableController', ['$scope', function($scope) {
        $scope.getValue = function(scope, column) {
            var value = scope.$eval('row.' + column);

            var formatter = $scope.pluginScope.formatters[column];
            if (formatter !== undefined) {
                value = formatter(value, column, scope.row);
            }

            return value;
        };

        $scope.getHeader = function(scope, column) {
            var header = $scope.pluginScope.headers[column];
            if (header !== undefined) {
                return header;
            }
            var headerFormatter;
            if ($scope.pluginScope.headerFormatter !== undefined) {
                header = headerFormatter(column);
            }
            if (header !== undefined) {
                return header;
            }
            return header;
        };
    }]);
}());


(function() {
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

                $scope.getFromLabel = function() {
                    var taskTooltips = $scope.task.model.tooltips;
                    var rowTooltips = $scope.task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var dateFormat = utils.firstProperty([taskTooltips, rowTooltips], 'dateFormat', $scope.pluginScope.dateFormat);
                    return $scope.task.model.from.format(dateFormat);
                };

                $scope.getToLabel = function() {
                    var taskTooltips = $scope.task.model.tooltips;
                    var rowTooltips = $scope.task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var dateFormat = utils.firstProperty([taskTooltips, rowTooltips], 'dateFormat', $scope.pluginScope.dateFormat);
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

                $scope.task.getForegroundElement().bind('mousemove', function(evt) {
                    mouseEnterX = evt.clientX;
                });

                $scope.task.getForegroundElement().bind('mouseenter', function(evt) {
                    mouseEnterX = evt.clientX;
                    displayTooltip(true, true);
                });

                $scope.task.getForegroundElement().bind('mouseleave', function() {
                    displayTooltip(false);
                });

                if ($scope.pluginScope.api.tasks.on.moveBegin) {
                    $scope.pluginScope.api.tasks.on.moveBegin($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(true);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.moveEnd($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(false);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.resizeBegin($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(true);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.resizeEnd($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(false);
                        }
                    });
                }

                var displayTooltip = function(newValue, showDelayed) {
                    if (showTooltipPromise) {
                        $timeout.cancel(showTooltipPromise);
                    }

                    var taskTooltips = $scope.task.model.tooltips;
                    var rowTooltips = $scope.task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var enabled = utils.firstProperty([taskTooltips, rowTooltips], 'enabled', $scope.pluginScope.enabled);
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
                    mouseMoveHandler.bind();

                    $scope.displayed = true;

                    $scope.$evalAsync(function() {
                        var restoreNgHide;
                        if ($element.hasClass('ng-hide')) {
                            $element.removeClass('ng-hide');
                            restoreNgHide = true;
                        }
                        $scope.elementHeight = $element[0].offsetHeight;
                        if (restoreNgHide) {
                            $element.addClass('ng-hide');
                        }
                        $scope.taskRect = parentElement[0].getBoundingClientRect();
                        updateTooltip(x);
                    });
                };

                var getViewPortWidth = function() {
                    var d = $document[0];
                    return d.documentElement.clientWidth || d.documentElement.getElementById('body')[0].clientWidth;
                };

                var updateTooltip = function(x) {
                    // Check if info is overlapping with view port
                    if (x + $element[0].offsetWidth > getViewPortWidth()) {
                        $element.css('left', (x + 20 - $element[0].offsetWidth) + 'px');
                        $scope.isRightAligned = true;
                    } else {
                        $element.css('left', (x - 20) + 'px');
                        $scope.isRightAligned = false;
                    }
                };

                var hideTooltip = function() {
                    visible = false;
                    mouseMoveHandler.unbind();
                    $scope.$evalAsync(function() {
                        $scope.displayed = false;
                    });
                };

                if ($scope.task.isMoving) {
                    // Display tooltip because task has been moved to a new row
                    displayTooltip(true, false);
                }

                $scope.gantt.api.directives.raise.new('ganttTooltip', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.gantt.api.directives.raise.destroy('ganttTooltip', $scope, $element);
                });
            }]
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttRowTreeLabel', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowTreeLabel');
        builder.restrict = 'A';
        builder.templateUrl = undefined;
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttSideContentTree', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttSideContentTree', 'plugins/tree/sideContentTree.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree').controller('GanttTreeController', ['$scope', 'GanttHierarchy', function($scope, Hierarchy) {
        $scope.rootRows = [];

        var hierarchy = new Hierarchy();

        var isVisible = function(row) {
            var parentRow = $scope.parent(row);
            while (parentRow !== undefined) {
                if (parentRow !== undefined && parentRow._collapsed) {
                    return false;
                }
                parentRow = $scope.parent(parentRow);
            }
            return true;
        };

        var filterRowsFunction = function(rows) {
            return rows.filter(function(row) {
                return isVisible(row);
            });
        };

        var sortRowsFunction = function(rows) {
            var sortedRows = [];
            var rootRows = [];

            var hasParent = false;

            angular.forEach(rows, function(row) {
                var rowParent = $scope.parent(row);
                if (rowParent === undefined) {
                    rootRows.push(row);
                } else {
                    hasParent = true;
                }
            });

            var handleChildren = function(row) {
                sortedRows.push(row);
                var children = $scope.children(row);



                if (children !== undefined && children.length > 0) {
                    var sortedChildren = children.sort(function(a, b) {
                        return rows.indexOf(a) - rows.indexOf(b);
                    });

                    angular.forEach(sortedChildren, function(child) {
                        handleChildren(child);
                    });
                }
            };

            angular.forEach(rootRows, function(row) {
                handleChildren(row);
            });

            return sortedRows;
        };

        $scope.gantt.api.rows.addRowSorter(sortRowsFunction);
        $scope.gantt.api.rows.addRowFilter(filterRowsFunction);

        $scope.$on('$destroy', function() {
            $scope.gantt.api.rows.removeRowSorter(sortRowsFunction);
            $scope.gantt.api.rows.removeRowFilter(filterRowsFunction);
        });

        var refresh = function() {
            $scope.rootRows = hierarchy.refresh($scope.gantt.rowsManager.filteredRows);

            if ($scope.gantt.rowsManager.filteredRows.length > 0) {
                $scope.gantt.api.rows.sort();
                $scope.gantt.api.rows.refresh();
            }
        };

        $scope.gantt.api.registerMethod('tree', 'refresh', refresh, this);

        $scope.$watchCollection('gantt.rowsManager.filteredRows', function() {
            refresh();
        });

        $scope.children = function(row) {
            if (row === undefined) {
                return $scope.rootRows;
            }
            return hierarchy.children(row);
        };

        $scope.parent = function(row) {
            return hierarchy.parent(row);
        };
    }]).controller('GanttTreeChildrenController', ['$scope', function($scope) {
        $scope.$watch('children(row)', function(newValue) {
            $scope.$parent.childrenRows = newValue;
        });

        $scope.$watch('collapsed', function(newValue) {
            $scope.row._collapsed = newValue;
            $scope.gantt.api.rows.refresh();
        });
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttTreeBody', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttTreeBody', 'plugins/tree/treeBody.tmpl.html');
        builder.controller = function($scope) {
            var hScrollBarHeight = layout.getScrollBarHeight();

            $scope.getLabelsCss = function() {
                var css = {};

                if ($scope.maxHeight) {
                    var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
                    css['max-height'] = $scope.maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());



(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttTreeHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTreeHeader', 'plugins/tree/treeHeader.tmpl.html');
        return builder.build();
    }]);
}());


angular.module('gantt.bounds.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/bounds/taskBounds.tmpl.html',
        '<div ng-cloak class="gantt-task-bounds" ng-style="getCss()" ng-class="getClass()"></div>\n' +
        '');
}]);

angular.module('gantt.drawtask.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.groups.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/groups/taskGroup.tmpl.html',
        '<div ng-controller="GanttGroupController">\n' +
        '    <div class="gantt-task-group-overview" ng-show="taskGroup.overviewTasks.length > 0">\n' +
        '        <gantt-task-overview ng-repeat="task in taskGroup.overviewTasks"></gantt-task-overview>\n' +
        '    </div>\n' +
        '    <div class="gantt-task-group"\n' +
        '         ng-show="taskGroup.groupedTasks.length > 0"\n' +
        '         ng-style="{\'left\': taskGroup.left + \'px\', \'width\': taskGroup.width + \'px\'}">\n' +
        '        <div class="gantt-task-group-left-main"></div>\n' +
        '        <div class="gantt-task-group-right-main"></div>\n' +
        '        <div class="gantt-task-group-left-symbol"></div>\n' +
        '        <div class="gantt-task-group-right-symbol"></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '\n' +
        '');
    $templateCache.put('plugins/groups/taskOverview.tmpl.html',
        '<div class="gantt-task gantt-task-overview" ng-class="task.model.classes">\n' +
        '    <gantt-task-background></gantt-task-background>\n' +
        '    <gantt-task-content></gantt-task-content>\n' +
        '    <gantt-task-foreground></gantt-task-foreground>\n' +
        '</div>\n' +
        '\n' +
        '');
}]);

angular.module('gantt.labels.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/labels/labelsBody.tmpl.html',
        '<div class="gantt-labels-body" ng-style="getLabelsCss()">\n' +
        '    <div gantt-vertical-scroll-receiver>\n' +
        '        <div ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '            <div gantt-row-label\n' +
        '                 class="gantt-row-label gantt-row-height"\n' +
        '                 ng-class="row.model.classes"\n' +
        '                 ng-style="{\'height\': row.model.height}">\n' +
        '                <span>{{row.model.name}}</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('plugins/labels/labelsHeader.tmpl.html',
        '<div class="gantt-labels-header">\n' +
        '    <div ng-show="gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0">\n' +
        '        <div ng-repeat="header in gantt.columnsManager.headers">\n' +
        '            <div class="gantt-row-height" ng-class="{\'gantt-labels-header-row\': $last, \'gantt-labels-header-row-last\': $last}"><span>{{$last ? pluginScope.header : ""}}</span></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('plugins/labels/sideContentLabels.tmpl.html',
        '<div class="gantt-side-content-labels">\n' +
        '    <gantt-labels-header>\n' +
        '    </gantt-labels-header>\n' +
        '    <gantt-labels-body>\n' +
        '    </gantt-labels-body>\n' +
        '</div>\n' +
        '');
}]);

angular.module('gantt.movable.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.progress.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/progress/taskProgress.tmpl.html',
        '<div ng-cloak class="gantt-task-progress" ng-style="getCss()" ng-class="getClasses()"></div>\n' +
        '');
}]);

angular.module('gantt.sortable.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.table.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/table/sideContentTable.tmpl.html',
        '<div class="gantt-side-content-table" ng-controller="TableController">\n' +
        '\n' +
        '    <div class="gantt-table-column" ng-repeat="column in pluginScope.columns">\n' +
        '\n' +
        '        <div class="gantt-table-header">\n' +
        '            <div class="gantt-table-row" ng-repeat="header in gantt.columnsManager.headers">\n' +
        '                <div class="gantt-row-height gantt-row-label gantt-table-header-row" ng-class="{\'gantt-table-header-row-last\': $last}">\n' +
        '                    <span>{{$last ? getHeader(this, column) : ""}}</span>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="gantt-table-content" ng-style="getMaxHeightCss()">\n' +
        '            <div gantt-vertical-scroll-receiver>\n' +
        '                <div class="gantt-table-row" ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                    <div gantt-row-label class="gantt-row-label gantt-row-height" ng-class="row.model.classes" ng-style="{\'height\': row.model.height}">\n' +
        '                        <div class="gantt-valign-container">\n' +
        '                            <div class="gantt-valign-content">\n' +
        '                                <span>{{getValue(this, column)}}</span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

angular.module('gantt.tooltips.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/tooltips/tooltip.tmpl.html',
        '<div ng-cloak\n' +
        '     class="gantt-task-info"\n' +
        '     ng-show="displayed"\n' +
        '     ng-class="isRightAligned ? \'gantt-task-infoArrowR\' : \'gantt-task-infoArrow\'"\n' +
        '     ng-style="{top: taskRect.top + \'px\', marginTop: -elementHeight - 8 + \'px\'}">\n' +
        '    <div class="gantt-task-info-content">\n' +
        '        {{task.model.name}}</br>\n' +
        '        <small>\n' +
        '            {{task.isMilestone() === true && (getFromLabel()) || (getFromLabel() + \' - \' + getToLabel())}}\n' +
        '        </small>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

angular.module('gantt.tree.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/tree/sideContentTree.tmpl.html',
        '<div class="gantt-side-content-tree">\n' +
        '    <gantt-tree-header>\n' +
        '    </gantt-tree-header>\n' +
        '    <gantt-tree-body>\n' +
        '    </gantt-tree-body>\n' +
        '</div>\n' +
        '');
    $templateCache.put('plugins/tree/treeBody.tmpl.html',
        '<div class="gantt-tree-body" ng-style="getLabelsCss()">\n' +
        '    <div gantt-vertical-scroll-receiver ng-controller="GanttTreeController">\n' +
        '        <div class="gantt-row-label-background">\n' +
        '            <div class="gantt-row-label gantt-row-height"\n' +
        '                 ng-class="row.model.classes"\n' +
        '                 ng-style="{\'height\': row.model.height}"\n' +
        '                 ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                &nbsp;\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div ui-tree data-drag-enabled="false" data-empty-place-holder-enabled="false">\n' +
        '            <ol class="gantt-tree-root" ui-tree-nodes ng-model="rootRows">\n' +
        '                <li ng-repeat="row in rootRows track by row.model.id" ui-tree-node\n' +
        '                    ng-include="\'plugins/tree/treeBodyChildren.tmpl.html\'">\n' +
        '                </li>\n' +
        '            </ol>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('plugins/tree/treeBodyChildren.tmpl.html',
        '<div ui-tree-handle\n' +
        '     ng-controller="GanttTreeChildrenController"\n' +
        '     class="gantt-row-label gantt-row-height" ,\n' +
        '     ng-class="row.model.classes"\n' +
        '     ng-style="{\'height\': row.model.height}">\n' +
        '    <div class="gantt-valign-container">\n' +
        '        <div class="gantt-valign-content">\n' +
        '            <a ng-disabled="!childrenRows || childrenRows.length === 0" data-nodrag\n' +
        '               class="gantt-tree-handle-button btn btn-xs"\n' +
        '               ng-class="{\'gantt-tree-collapsed\': collapsed, \'gantt-tree-expanded\': !collapsed}"\n' +
        '               ng-click="toggle(this)"><span\n' +
        '                class="gantt-tree-handle glyphicon glyphicon-chevron-down"\n' +
        '                ng-class="{\n' +
        '                \'glyphicon-chevron-right\': collapsed, \'glyphicon-chevron-down\': !collapsed,\n' +
        '                \'gantt-tree-collapsed\': collapsed, \'gantt-tree-expanded\': !collapsed}"></span>\n' +
        '            </a>\n' +
        '            <span class="gantt-tree-text">{{row.model.name}}</span>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<ol ui-tree-nodes ng-class="{hidden: collapsed}" ng-model="childrenRows">\n' +
        '    <li ng-repeat="row in childrenRows track by row.model.id" ui-tree-node\n' +
        '        ng-include="\'plugins/tree/treeBodyChildren.tmpl.html\'">\n' +
        '    </li>\n' +
        '</ol>\n' +
        '');
    $templateCache.put('plugins/tree/treeHeader.tmpl.html',
        '<div class="gantt-tree-header">\n' +
        '    <div ng-show="gantt.columnsManager.columns.length > 0 && gantt.columnsManager.headers.length > 0">\n' +
        '        <div ng-repeat="header in gantt.columnsManager.headers">\n' +
        '            <div class="gantt-row-height gantt-row-label gantt-tree-header-row" ng-class="{\'gantt-tree-header-row-last\': $last}"><span>{{$last ? pluginScope.header : ""}}</span></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt-plugins.js.map