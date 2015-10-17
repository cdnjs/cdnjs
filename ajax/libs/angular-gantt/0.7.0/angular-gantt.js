/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
'use strict';


var gantt = angular.module('gantt', ['ganttTemplates', 'angularMoment']);
gantt.constant('GANTT_EVENTS',
    {
        'READY': 'event:gantt-ready',
        'SCROLL': 'event:gantt-scroll',

        'TASK_ADDED': 'event:gantt-task-added',
        'TASK_CHANGED': 'event:gantt-task-changed',
        'TASK_REMOVED': 'event:gantt-task-removed',
        'TASK_MOVED': 'event:gantt-task-moved',
        'TASK_MOVE_BEGIN': 'event:gantt-task-move-begin',
        'TASK_MOVE': 'event:gantt-task-move',
        'TASK_MOVE_END': 'event:gantt-task-move-end',
        'TASK_RESIZE_BEGIN': 'event:gantt-task-resize-begin',
        'TASK_RESIZE': 'event:gantt-task-resize',
        'TASK_RESIZE_END': 'event:gantt-task-resize-end',
        'TASK_CLICKED': 'event:gantt-task-clicked',
        'TASK_DBL_CLICKED': 'event:gantt-task-dblclicked',
        'TASK_CONTEXTMENU': 'event:gantt-task-contextmenu',

        'COLUMN_CLICKED': 'event:gantt-column-clicked',
        'COLUMN_DBL_CLICKED': 'event:gantt-column-dblclicked',
        'COLUMN_CONTEXTMENU': 'event:gantt-column-contextmenu',

        'ROW_MOUSEDOWN': 'event:gantt-row-mousedown',
        'ROW_MOUSEUP': 'event:gantt-row-mouseup',
        'ROW_CLICKED': 'event:gantt-row-clicked',
        'ROW_DBL_CLICKED': 'event:gantt-row-dblclicked',
        'ROW_CONTEXTMENU': 'event:gantt-row-contextmenu',
        'ROW_CHANGED': 'event:gantt-row-changed',
        'ROW_ADDED': 'event:gantt-row-added',
        'ROW_REMOVED': 'event:gantt-row-removed',
        'ROW_ORDER_CHANGED': 'event:gantt-row-order-changed',

        'ROW_LABEL_MOUSEDOWN': 'event:gantt-row-label-mousedown',
        'ROW_LABEL_MOUSEUP': 'event:gantt-row-label-mouseup',
        'ROW_LABEL_CLICKED': 'event:gantt-row-label-clicked',
        'ROW_LABEL_DBL_CLICKED': 'event:gantt-row-label-dblclicked',
        'ROW_LABEL_CONTEXTMENU': 'event:gantt-row-label-contextmenu',

        'ROW_HEADER_MOUSEDOWN': 'event:gantt-row-header-mousedown',
        'ROW_HEADER_MOUSEUP': 'event:gantt-row-header-mouseup',
        'ROW_HEADER_CLICKED': 'event:gantt-row-header-clicked',
        'ROW_HEADER_DBL_CLICKED': 'event:gantt-row-header-dblclicked',
        'ROW_HEADER_CONTEXTMENU': 'event:gantt-row-header-contextmenu',

        'ROW_LABELS_RESIZED': 'event:gantt-row-labels-resized',

        'TIMESPAN_ADDED': 'event:gantt-timespan-added',
        'TIMESPAN_CHANGED': 'event:gantt-timespan-changed',

        'TASKS_FILTERED': 'event:gantt-tasks-filtered',
        'ROWS_FILTERED': 'event:gantt-rows-filtered'
    });

gantt.directive('gantt', ['Gantt', 'GanttCalendar', 'moment', 'ganttMouseOffset', 'ganttDebounce', 'GanttEvents', 'ganttEnableNgAnimate', 'GANTT_EVENTS', function(Gantt, Calendar, moment, mouseOffset, debounce, Events, enableNgAnimate, GANTT_EVENTS) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.gantt.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        scope: {
            sortMode: '=?', // Possible modes: 'name', 'date', 'custom'
            filterTask: '=?', // Task filter as a angularJS expression
            filterTaskComparator: '=?', // Comparator to use for the task filter
            filterRow: '=?', // Row filter as a angularJS expression
            filterRowComparator: '=?', // Comparator to use for the row filter
            viewScale: '=?', // Possible scales: 'hour', 'day', 'week', 'month'
            columnWidth: '=?', // Defines the size of a column, 1 being 1em per unit (hour or day, .. depending on scale),
            allowTaskMoving: '=?', // Set to true if tasks should be moveable by the user.
            allowTaskResizing: '=?', // Set to true if tasks should be resizable by the user.
            allowTaskRowSwitching: '=?', // If false then tasks can be moved inside their current row only. The user can not move it to another row.
            allowRowSorting: '=?', // Set to true if the user should be able to re-order rows.
            allowLabelsResizing: '=?', // Set to true if the user should be able to resize the label section.
            fromDate: '=?', // If not specified will use the earliest task date (note: as of now this can only expand not shrink)
            toDate: '=?', // If not specified will use the latest task date (note: as of now this can only expand not shrink)
            currentDateValue: '=?', // If specified, the current date will be displayed
            currentDate: '=?', // The display of currentDate ('none', 'line' or 'column').
            autoExpand: '=?', // Set this both, left or right if the date range shall expand if the user scroll to the left or right end. Otherwise set to false or none.
            taskOutOfRange: '=?', // Set this to expand or truncate to define the behavior of tasks going out of visible range.
            maxHeight: '=?', // Define the maximum height of the Gantt in PX. > 0 to activate max height behaviour.
            labelsWidth: '=?', // Define the width of the labels section. Changes when the user is resizing the labels width
            showLabelsColumn: '=?', // Whether to show column with labels or not. Default (true)
            showTooltips: '=?', // True when tooltips shall be enabled. Default (true)
            headers: '=?', // An array of units for headers.
            headersFormats: '=?', // An array of corresponding formats for headers.
            timeFrames: '=?',
            dateFrames: '=?',
            timeFramesWorkingMode: '=?',
            timeFramesNonWorkingMode: '=?',
            tooltipDateFormat: '=?',
            timespans: '=?',
            columnMagnet: '=?',
            data: '=?',
            loadTimespans: '&',
            loadData: '&',
            removeData: '&',
            clearData: '&',
            centerDate: '&'
        },
        controller: ['$scope', '$element', function($scope, $element) {
            // Initialize defaults
            if ($scope.sortMode === undefined) {
                $scope.sortMode = 'name';
            }
            if ($scope.viewScale === undefined) {
                $scope.viewScale = 'day';
            }
            if ($scope.columnMagnet === undefined) {
                $scope.columnMagnet = '15 minutes';
            }
            if ($scope.allowTaskMoving === undefined) {
                $scope.allowTaskMoving = true;
            }
            if ($scope.allowTaskResizing === undefined) {
                $scope.allowTaskResizing = true;
            }
            if ($scope.allowTaskRowSwitching === undefined) {
                $scope.allowTaskRowSwitching = true;
            }
            if ($scope.allowRowSorting === undefined) {
                $scope.allowRowSorting = true;
            }
            if ($scope.allowLabelsResizing === undefined) {
                $scope.allowLabelsResizing = true;
            }
            if ($scope.currentDateValue === undefined) {
                $scope.currentDateValue = moment();
            }
            if ($scope.currentDate === undefined) {
                $scope.currentDate = 'line';
            }
            if ($scope.maxHeight === undefined) {
                $scope.maxHeight = 0;
            }
            if ($scope.autoExpand === undefined) {
                $scope.autoExpand = 'none';
            }
            if ($scope.taskOutOfRange === undefined) {
                $scope.taskOutOfRange = 'truncate';
            }
            if ($scope.labelsWidth === undefined) {
                $scope.labelsWidth = 0;
            }
            if ($scope.showLabelsColumn === undefined) {
                $scope.showLabelsColumn = true;
            }
            if ($scope.showTooltips === undefined) {
                $scope.showTooltips = true;
            }
            if ($scope.timeFramesWorkingMode === undefined) {
                $scope.timeFramesWorkingMode = 'hidden';
            }
            if ($scope.timeFramesNonWorkingMode === undefined) {
                $scope.timeFramesNonWorkingMode = 'visible';
            }
            if ($scope.columnMagnet === undefined) {
                $scope.columnMagnet = '15 minutes';
            }
            if ($scope.tooltipDateFormat === undefined) {
                $scope.tooltipDateFormat = 'MMM DD, HH:mm';
            }

            var defaultHeadersFormats = {'year': 'YYYY', 'quarter': '[Q]Q YYYY', month: 'MMMM YYYY', week: 'w', day: 'D', hour: 'H', minute:'HH:mm'};
            var defaultDayHeadersFormats = {day: 'LL', hour: 'H', minute:'HH:mm'};
            var defaultYearHeadersFormats = {'year': 'YYYY', 'quarter': '[Q]Q', month: 'MMMM'};

            $scope.getHeaderFormat = function(unit) {
                var format;
                if ($scope.headersFormats !== undefined) {
                    format = $scope.headersFormats[unit];
                }
                if (format === undefined) {
                    if (['millisecond', 'second', 'minute', 'hour'].indexOf($scope.viewScale) > -1) {
                        format = defaultDayHeadersFormats[unit];
                    } else if (['month', 'quarter', 'year'].indexOf($scope.viewScale) > -1) {
                        format = defaultYearHeadersFormats[unit];
                    }
                    if (format === undefined) {
                        format = defaultHeadersFormats[unit];
                    }
                }
                return format;
            };

            // Disable animation if ngAnimate is present, as it drops down performance.
            enableNgAnimate(false, $element);

            $scope.calendar = new Calendar();
            $scope.calendar.registerTimeFrames($scope.timeFrames);
            $scope.calendar.registerDateFrames($scope.dateFrames);

            $scope.$watch('timeFrames', function() {
                $scope.calendar.clearTimeFrames();
                $scope.calendar.registerTimeFrames($scope.timeFrames);
            });

            $scope.$watch('dateFrames', function() {
                $scope.calendar.clearDateFrames();
                $scope.calendar.registerDateFrames($scope.dateFrames);
            });

            // Gantt logic
            $scope.template = {};
            $scope.gantt = new Gantt($scope, $element);

            $scope.$watch('sortMode', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.sortRows();
                }
            });

            $scope.$watch('timespans', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.removeAllTimespans();
                    $scope.setTimespans(newValue);
                }
            });

            $scope.$watch('data', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.removeAllData();
                    $scope.setData(newValue);
                }
            });

            // Swaps two rows and changes the sort order to custom to display the swapped rows
            $scope.swapRows = function(a, b) {
                $scope.gantt.swapRows(a, b);

                // Raise change events
                $scope.$emit(GANTT_EVENTS.ROW_CHANGED, {'row': a});
                $scope.$emit(GANTT_EVENTS.ROW_ORDER_CHANGED, {'row': a});
                $scope.$emit(GANTT_EVENTS.ROW_CHANGED, {'row': b});
                $scope.$emit(GANTT_EVENTS.ROW_ORDER_CHANGED, {'row': b});

                // Switch to custom sort mode and trigger sort
                if ($scope.sortMode !== 'custom') {
                    $scope.sortMode = 'custom'; // Sort will be triggered by the watcher
                } else {
                    $scope.sortRows();
                }
            };

            // Sort rows by the current sort mode
            $scope.sortRows = function() {
                $scope.gantt.sortRows($scope.sortMode);
            };

            // Scroll to the specified x
            $scope.scrollTo = function(x) {
                $scope.template.scrollable.$element[0].scrollLeft = x;
                $scope.template.scrollable.$element.triggerHandler('scroll');
            };

            // Scroll to the left side by specified x
            $scope.scrollToLeft = function(x) {
                $scope.template.scrollable.$element[0].scrollLeft -= x;
                $scope.template.scrollable.$element.triggerHandler('scroll');
            };

            // Scroll to the right side by specified x
            $scope.scrollToRight = function(x) {
                $scope.template.scrollable.$element[0].scrollLeft += x;
                $scope.template.scrollable.$element.triggerHandler('scroll');
            };

            // Tries to center the specified date
            $scope.scrollToDate = function(date) {
                var position = $scope.gantt.getPositionByDate(date);

                if (position !== undefined) {
                    $scope.template.scrollable.$element[0].scrollLeft = position - $scope.template.scrollable.$element[0].offsetWidth / 2;
                }
            };

            var lastAutoExpand;
            var autoExpandCoolDownPeriod = 500;
            $scope.autoExpandColumns = function(el, date, direction) {
                if ($scope.autoExpand !== 'both' && $scope.autoExpand !== true && $scope.autoExpand !== direction) {
                    return;
                }

                if (Date.now() - lastAutoExpand < autoExpandCoolDownPeriod) {
                    return;
                }

                var from, to;
                var expandHour = 1, expandDay = 31;

                if (direction === 'left') {
                    from = $scope.viewScale === 'hour' ? moment(date).add(-expandHour, 'day') : moment(date).add(-expandDay, 'day');
                    to = date;
                } else {
                    from = date;
                    to = $scope.viewScale === 'hour' ? moment(date).add(expandHour, 'day') : moment(date).add(expandDay, 'day');
                }

                $scope.fromDate = from;
                $scope.toDate = to;
                lastAutoExpand = Date.now();
            };

            // Add or update rows and tasks
            $scope.setData = function(data) {
                $scope.gantt.addData(data);
                $scope.sortRows();
            };

            // Remove specified rows and tasks.
            $scope.removeData({ fn: function(data) {
                $scope.gantt.removeData(data);
                $scope.sortRows();
            }});

            // Clear all existing rows and tasks
            $scope.removeAllData = function() {
                // Clears rows, task and columns
                $scope.gantt.removeAllRows();
                // Restore default columns
                $scope.gantt.updateColumns();
            };

            // Clear all existing timespans
            $scope.removeAllTimespans = function() {
                // Clears rows, task and columns
                $scope.gantt.removeAllTimespans();
                // Restore default columns
                $scope.gantt.updateColumns();
            };

            // Add or update timespans
            $scope.setTimespans = function(timespans) {
                $scope.gantt.addTimespans(timespans);
            };

            // Load data handler.
            // The Gantt chart will keep the current view position if this function is called during scrolling.
            $scope.loadData({ fn: $scope.setData});
            $scope.loadTimespans({ fn: $scope.setTimespans});

            // Clear data handler.
            $scope.clearData({ fn: $scope.removeAllData});

            // Scroll to specified date handler.
            $scope.centerDate({ fn: $scope.scrollToDate});

            // Gantt is initialized. Signal that the Gantt is ready.
            $scope.$emit(GANTT_EVENTS.READY);
        }
        ]};
}]);


/**
 * Calendar factory is used to define working periods, non working periods, and other specific period of time,
 * and retrieve effective timeFrames for each day of the gantt.
 */
gantt.factory('GanttCalendar', ['$filter', function($filter) {
    /**
     * TimeFrame represents time frame in any day. parameters are given using options object.
     *
     * @param {moment|string} start start of timeFrame. If a string is given, it will be parsed as a moment.
     * @param {moment|string} end end of timeFrame. If a string is given, it will be parsed as a moment.
     * @param {boolean} working is this timeFrame flagged as working.
     * @param {boolean} default is this timeFrame will be used as default.
     * @param {string} cssClass css class attached to this timeFrame.
     *
     * @constructor
     */
    var TimeFrame = function(options) {
        var self = this;

        if (options === undefined) {
            options = {};
        }

        self.start = options.start;
        self.end = options.end;
        self.working = options.working;
        self.default = options.default;
        self.cssClass = options.cssClass;

        self.getDuration = function() {
            return self.end.diff(self.start, 'milliseconds');
        };

        self.clone = function() {
            return new TimeFrame(self);
        };
    };
    /**
     * TimeFrameMapping defines how timeFrames will be placed for each days. parameters are given using options object.
     *
     * @param {function} func a function with date parameter, that will be evaluated for each distinct day of the gantt.
     *                        this function must return an array of timeFrame names to apply.
     * @constructor
     */
    var TimeFrameMapping = function(func) {
        var self = this;
        self.func = func;

        self.getTimeFrames = function(date) {
            var ret = self.func(date);
            if (!(ret instanceof Array)) {
                ret = [ret];
            }
            return ret;
        };

        self.clone = function() {
            return new TimeFrameMapping(self.func);
        };
    };
    /**
     * A DateFrame is date range that will use a specific TimeFrameMapping, configured using a function (evaluator),
     * a date (date) or a date range (start, end). parameters are given using options object.
     *
     * @param {function} evaluator a function with date parameter, that will be evaluated for each distinct day of the gantt.
     *                   this function must return a boolean representing matching of this dateFrame or not.
     * @param {moment} date date of dateFrame.
     * @param {moment} start start of date frame.
     * @param {moment} end end of date frame.
     * @param {array} targets array of TimeFrameMappings/TimeFrames names to use for this date frame.
     * @param {boolean} default is this dateFrame will be used as default.
     * @constructor
     */
    var DateFrame = function(options) {
        var self = this;

        self.evaluator = options.evaluator;
        if (options.date) {
            self.start = moment(options.date).startOf('day');
            self.end = moment(options.date).endOf('day');
        } else {
            self.start = options.start;
            self.end = options.end;
        }
        if (options.targets instanceof Array) {
            self.targets = options.targets;
        } else {
            self.targets = [options.targets];
        }
        self.default = options.default;

        self.dateMatch = function(date) {
            if (self.evaluator) {
                return self.evaluator(date);
            } else if (self.start && self.end) {
                return date >= self.start && date <= self.end;
            } else {
                return false;
            }
        };


        self.clone = function() {
            return new DateFrame(self);
        };
    };


    /**
     * Register TimeFrame, TimeFrameMapping and DateMapping objects into Calendar object,
     * and use Calendar#getTimeFrames(date) function to retrieve effective timeFrames for a specific day.
     *
     * @constructor
     */
    var Calendar = function() {
        var self = this;

        self.timeFrames = {};
        self.timeFrameMappings = {};
        self.dateFrames = {};

        /**
         * Remove all objects.
         */
        self.clear = function() {
            self.timeFrames = {};
            self.timeFrameMappings = {};
            self.dateFrames = {};
        };

        /**
         * Register TimeFrame objects.
         *
         * @param {object} timeFrames with names of timeFrames for keys and TimeFrame objects for values.
         */
        self.registerTimeFrames = function(timeFrames) {
            angular.forEach(timeFrames, function(timeFrame, name) {
                self.timeFrames[name] = new TimeFrame(timeFrame);
            });
        };

        /**
         * Removes TimeFrame objects.
         *
         * @param {array} timeFrames names of timeFrames to remove.
         */
        self.removeTimeFrames = function(timeFrames) {
            angular.forEach(timeFrames, function(name) {
                delete self.timeFrames[name];
            });
        };

        /**
         * Remove all TimeFrame objects.
         */
        self.clearTimeFrames = function() {
            self.timeFrames = {};
        };

        /**
         * Register TimeFrameMapping objects.
         *
         * @param {object} mappings object with names of timeFrames mappings for keys and TimeFrameMapping objects for values.
         */
        self.registerTimeFrameMappings = function(mappings) {
            angular.forEach(mappings, function(timeFrameMapping, name) {
                self.timeFrameMappings[name] = new TimeFrameMapping(timeFrameMapping);
            });
        };

        /**
         * Removes TimeFrameMapping objects.
         *
         * @param {array} mappings names of timeFrame mappings to remove.
         */
        self.removeTimeFrameMappings = function(mappings) {
            angular.forEach(mappings, function(name) {
                delete self.timeFrameMappings[name];
            });
        };

        /**
         * Removes all TimeFrameMapping objects.
         */
        self.clearTimeFrameMappings = function() {
            self.timeFrameMappings = {};
        };

        /**
         * Register DateFrame objects.
         *
         * @param {object} dateFrames object with names of dateFrames for keys and DateFrame objects for values.
         */
        self.registerDateFrames = function(dateFrames) {
            angular.forEach(dateFrames, function(dateFrame, name) {
                self.dateFrames[name] = new DateFrame(dateFrame);
            });
        };

        /**
         * Remove DateFrame objects.
         *
         * @param {array} mappings names of date frames to remove.
         */
        self.removeDateFrames = function(dateFrames) {
            angular.forEach(dateFrames, function(name) {
                delete self.dateFrames[name];
            });
        };

        /**
         * Removes all DateFrame objects.
         */
        self.clearDateFrames = function() {
            self.dateFrames = {};
        };

        var getDateFrames = function(date) {
            var dateFrames = [];
            angular.forEach(self.dateFrames, function(dateFrame) {
                if (dateFrame.dateMatch(date)) {
                    dateFrames.push(dateFrame);
                }
            });
            if (dateFrames.length === 0) {
                angular.forEach(self.dateFrames, function(dateFrame) {
                    if (dateFrame.default) {
                        dateFrames.push(dateFrame);
                    }
                });
            }
            return dateFrames;
        };

        /**
         * Retrieves TimeFrame objects for a given date, using whole configuration for this Calendar object.
         *
         * @param {moment} date
         *
         * @return {array} an array of TimeFrame objects.
         */
        self.getTimeFrames = function(date) {
            var timeFrames = [];
            var dateFrames = getDateFrames(date);

            angular.forEach(dateFrames, function(dateFrame) {
                if (dateFrame !== undefined) {
                    angular.forEach(dateFrame.targets, function(timeFrameMappingName) {
                        var timeFrameMapping = self.timeFrameMappings[timeFrameMappingName];
                        if (timeFrameMapping !== undefined) {
                            // If a timeFrame mapping is found
                            timeFrames.push(timeFrameMapping.getTimeFrames());
                        } else {
                            // If no timeFrame mapping is found, try using direct timeFrame
                            var timeFrame = self.timeFrames[timeFrameMappingName];
                            if (timeFrame !== undefined) {
                                timeFrames.push(timeFrame);
                            }
                        }
                    });
                }
            });

            var dateYear = date.year();
            var dateMonth = date.month();
            var dateDate = date.date();

            var validatedTimeFrames = [];
            if (timeFrames.length === 0) {
                angular.forEach(self.timeFrames, function(timeFrame) {
                    if (timeFrame.default) {
                        timeFrames.push(timeFrame);
                    }
                });
            }

            angular.forEach(timeFrames, function(timeFrame) {
                timeFrame = timeFrame.clone();

                if (timeFrame.start !== undefined) {
                    timeFrame.start.year(dateYear);
                    timeFrame.start.month(dateMonth);
                    timeFrame.start.date(dateDate);
                }

                if (timeFrame.end !== undefined) {
                    timeFrame.end.year(dateYear);
                    timeFrame.end.month(dateMonth);
                    timeFrame.end.date(dateDate);

                    if (moment(timeFrame.end).startOf('day') === timeFrame.end) {
                        timeFrame.end.add(1, 'day');
                    }
                }

                validatedTimeFrames.push(timeFrame);
            });

            return validatedTimeFrames;
        };

        /**
         * Solve timeFrames using two rules.
         *
         * 1) If at least one working timeFrame is defined, everything outside
         * defined timeFrames is considered as non-working. Else it's considered
         * as working.
         *
         * 2) Smaller timeFrames have priority over larger one.
         *
         * @param {array} timeFrames Array of timeFrames to solve
         * @param {moment} startDate
         * @param {moment} endDate
         */
        self.solve = function(timeFrames, startDate, endDate) {
            var defaultWorking = timeFrames.length === 0;
            var minDate;
            var maxDate;

            angular.forEach(timeFrames, function(timeFrame) {
                if (minDate === undefined || minDate > timeFrame.start) {
                    minDate = timeFrame.start;
                }
                if (maxDate === undefined || maxDate < timeFrame.end) {
                    maxDate = timeFrame.end;
                }
            });

            if (startDate === undefined) {
                startDate = minDate;
            }

            if (endDate === undefined) {
                endDate = maxDate;
            }

            var solvedTimeFrames = [new TimeFrame({start: startDate, end: endDate, working: defaultWorking})];

            var orderedTimeFrames = $filter('orderBy')(timeFrames, function(timeFrame) {
                return -timeFrame.getDuration();
            });

            angular.forEach(orderedTimeFrames, function(timeFrame) {
                var tmpSolvedTimeFrames = solvedTimeFrames.slice();

                var i=0;
                var dispatched = false;
                var treated = false;
                angular.forEach(solvedTimeFrames, function(solvedTimeFrame) {
                    if (!treated) {
                        if (timeFrame.end > solvedTimeFrame.start && timeFrame.start < solvedTimeFrame.end) {
                            // timeFrame is included in this solvedTimeFrame.
                            // solvedTimeFrame:|ssssssssssssssssssssssssssssssssss|
                            //       timeFrame:          |tttttt|
                            //          result:|sssssssss|tttttt|sssssssssssssssss|

                            timeFrame = timeFrame.clone();
                            var newSolvedTimeFrame = solvedTimeFrame.clone();

                            solvedTimeFrame.end = moment(timeFrame.start);
                            newSolvedTimeFrame.start = moment(timeFrame.end);

                            tmpSolvedTimeFrames.splice(i + 1, 0, timeFrame.clone(), newSolvedTimeFrame);
                            treated = true;
                        } else if (!dispatched && timeFrame.start < solvedTimeFrame.end) {
                            // timeFrame is dispatched on two solvedTimeFrame.
                            // First part
                            // solvedTimeFrame:|sssssssssssssssssssssssssssssssssss|s+1;s+1;s+1;s+1;s+1;s+1|
                            //       timeFrame:                                |tttttt|
                            //          result:|sssssssssssssssssssssssssssssss|tttttt|;s+1;s+1;s+1;s+1;s+1|

                            timeFrame = timeFrame.clone();

                            solvedTimeFrame.end = moment(timeFrame.start);
                            tmpSolvedTimeFrames.splice(i + 1, 0, timeFrame);

                            dispatched = true;
                        } else if (dispatched && timeFrame.end > solvedTimeFrame.start) {
                            // timeFrame is dispatched on two solvedTimeFrame.
                            // Second part

                            solvedTimeFrame.start = moment(timeFrame.end);
                            dispatched = false;
                            treated = true;
                        }
                        i++;
                    }
                });

                solvedTimeFrames = tmpSolvedTimeFrames;
            });

            solvedTimeFrames = $filter('filter')(solvedTimeFrames, function(timeFrame) {
                return (timeFrame.start === undefined || timeFrame.start < endDate) && (timeFrame.end === undefined || timeFrame.end > startDate);
            });

            return solvedTimeFrames;

        };
    };
    return Calendar;
}]);


gantt.factory('GanttColumn', [ 'moment', function(moment) {
    // Used to display the Gantt grid and header.
    // The columns are generated by the column generator.
    var Column = function(date, endDate, left, width, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode, columnMagnetValue, columnMagnetUnit) {
        var self = this;

        self.date = date;
        self.endDate = endDate;
        self.left = left;
        self.width = width;
        self.calendar = calendar;
        self.duration = self.endDate.diff(self.date, 'milliseconds');
        self.timeFramesWorkingMode = timeFramesWorkingMode;
        self.timeFramesNonWorkingMode = timeFramesNonWorkingMode;
        self.timeFrames = [];
        self.visibleTimeFrames = [];
        self.daysTimeFrames = {};
        self.cropped = false;
        self.columnMagnetValue = columnMagnetValue;
        self.columnMagnetUnit = columnMagnetUnit;
        self.originalSize = {left: self.left, width: self.width};

        var getDateKey = function(date) {
            return date.year() + '-' + date.month() + '-' + date.date();
        };

        if (self.calendar !== undefined && (self.timeFramesNonWorkingMode !== 'hidden' || self.timeFramesWorkingMode !== 'hidden')) {
            var buildPushTimeFrames = function(timeFrames, startDate, endDate) {
                return function(timeFrame) {
                    var start = timeFrame.start;
                    if (start === undefined) {
                        start = startDate;
                    }

                    var end = timeFrame.end;
                    if (end === undefined) {
                        end = endDate;
                    }

                    if (start < self.date) {
                        start = self.date;
                    }

                    if (end > self.endDate) {
                        end = self.endDate;
                    }

                    timeFrame = timeFrame.clone();

                    timeFrame.start = moment(start);
                    timeFrame.end = moment(end);

                    timeFrames.push(timeFrame);
                };
            };

            var cDate = self.date;
            var cDateStartOfDay = moment(cDate).startOf('day');
            var cDateNextDay = cDateStartOfDay.add(1, 'day');
            while (cDate < self.endDate) {
                var timeFrames = self.calendar.getTimeFrames(cDate);
                var nextCDate = moment.min(cDateNextDay, self.endDate);
                timeFrames = self.calendar.solve(timeFrames, cDate, nextCDate);
                var cTimeFrames = [];
                angular.forEach(timeFrames, buildPushTimeFrames(cTimeFrames, cDate, nextCDate));
                self.timeFrames = self.timeFrames.concat(cTimeFrames);

                var cDateKey = getDateKey(cDate);
                self.daysTimeFrames[cDateKey] = cTimeFrames;

                cDate = nextCDate;
                cDateStartOfDay = moment(cDate).startOf('day');
                cDateNextDay = cDateStartOfDay.add(1, 'day');
            }

            angular.forEach(self.timeFrames, function(timeFrame) {
                var positionDuration = timeFrame.start.diff(self.date, 'milliseconds');
                var position = positionDuration / self.duration * self.width;

                var timeFrameDuration = timeFrame.end.diff(timeFrame.start, 'milliseconds');
                var timeFramePosition = timeFrameDuration / self.duration * self.width;

                var hidden = false;
                if (timeFrame.working && self.timeFramesWorkingMode !== 'visible') {
                    hidden = true;
                } else if (!timeFrame.working && self.timeFramesNonWorkingMode !== 'visible') {
                    hidden = true;
                }

                if (!hidden) {
                    self.visibleTimeFrames.push(timeFrame);
                }

                timeFrame.hidden = hidden;
                timeFrame.left = position;
                timeFrame.width = timeFramePosition;
                timeFrame.originalSize = {left: timeFrame.left, width: timeFrame.width};
            });

            if (self.timeFramesNonWorkingMode === 'cropped' || self.timeFramesWorkingMode === 'cropped') {
                var timeFramesWidth = 0;
                angular.forEach(self.timeFrames, function(timeFrame) {
                    if (!timeFrame.working && self.timeFramesNonWorkingMode !== 'cropped' ||
                        timeFrame.working && self.timeFramesWorkingMode !== 'cropped') {
                        timeFramesWidth += timeFrame.width;
                    }
                });

                if (timeFramesWidth !== self.width) {
                    var croppedRatio = self.width / timeFramesWidth;
                    var croppedWidth = 0;
                    var originalCroppedWidth = 0;

                    var allCropped = true;

                    angular.forEach(self.timeFrames, function(timeFrame) {
                        if (!timeFrame.working && self.timeFramesNonWorkingMode !== 'cropped' ||
                            timeFrame.working && self.timeFramesWorkingMode !== 'cropped') {
                            timeFrame.left = (timeFrame.left - croppedWidth) * croppedRatio;
                            timeFrame.width = timeFrame.width * croppedRatio;
                            timeFrame.originalSize.left = (timeFrame.originalSize.left - originalCroppedWidth) * croppedRatio;
                            timeFrame.originalSize.width = timeFrame.originalSize.width * croppedRatio;
                            timeFrame.cropped = false;
                            allCropped = false;
                        } else {
                            croppedWidth += timeFrame.width;
                            originalCroppedWidth += timeFrame.originalSize.width;
                            timeFrame.left = undefined;
                            timeFrame.width = 0;
                            timeFrame.originalSize = {left: undefined, width: 0};
                            timeFrame.cropped = true;
                        }
                    });

                    self.cropped = allCropped;
                } else {
                    self.cropped = false;
                }
            }
        }

        self.clone = function() {
            return new Column(moment(self.date), moment(self.endDate), self.left, self.width, self.calendar);
        };

        self.containsDate = function(date) {
            return date > self.date && date <= self.endDate;
        };

        self.equals = function(other) {
            return self.date === other.date;
        };

        self.getMagnetDate = function(date) {
            if (self.columnMagnetValue > 0 && self.columnMagnetUnit !== undefined) {
                date = moment(date);
                var value = date.get(self.columnMagnetUnit);
                var magnetValue = Math.round(value/self.columnMagnetValue) * self.columnMagnetValue;
                date.startOf(self.columnMagnetUnit);
                date.set(self.columnMagnetUnit, magnetValue);
                return date;
            }
            return date;
        };

        var getDateByPositionUsingTimeFrames = function(timeFrames, position) {
            for (var i=0; i < timeFrames.length; i++) {
                // TODO: performance optimization could be done.
                var timeFrame = timeFrames[i];
                if (!timeFrame.cropped && position >= timeFrame.left && position <= timeFrame.left + timeFrame.width) {
                    var positionDuration = timeFrame.getDuration() / timeFrame.width * (position - timeFrame.left);
                    var date = moment(timeFrame.start).add(positionDuration, 'milliseconds');
                    return date;
                }
            }
        };

        self.getDateByPosition = function(position, magnet) {
            var positionDuration;
            var date;

            if (position < 0) {
                position = 0;
            }
            if (position > self.width) {
                position = self.width;
            }

            if (self.timeFramesNonWorkingMode === 'cropped' || self.timeFramesWorkingMode === 'cropped') {
                date = getDateByPositionUsingTimeFrames(self.timeFrames, position);
            }

            if (date === undefined) {
                positionDuration = self.duration / self.width * position;
                date = moment(self.date).add(positionDuration, 'milliseconds');
            }

            if (magnet) {
                return self.getMagnetDate(date);
            }

            return date;
        };

        var getDayTimeFrame = function(date) {
            var dtf = self.daysTimeFrames[getDateKey(date)];
            if (dtf === undefined) {
                return [];
            }
            return dtf;
        };

        self.getPositionByDate = function(date) {
            var positionDuration;
            var position;

            if (self.timeFramesNonWorkingMode === 'cropped' || self.timeFramesWorkingMode === 'cropped') {
                var croppedDate = date;
                var timeFrames = getDayTimeFrame(croppedDate);
                for (var i=0; i < timeFrames.length; i++) {
                    var timeFrame = timeFrames[i];
                    if (croppedDate >= timeFrame.start && croppedDate <= timeFrame.end) {
                        if (timeFrame.cropped) {
                            if (timeFrames.length > i+1) {
                                croppedDate = timeFrames[i+1].start;
                            } else {
                                croppedDate = timeFrame.end;
                            }
                        } else {
                            positionDuration = croppedDate.diff(timeFrame.start, 'milliseconds');
                            position = positionDuration / timeFrame.getDuration() * timeFrame.width;
                            return self.left + timeFrame.left + position;
                        }
                    }
                }
            }

            positionDuration = date.diff(self.date, 'milliseconds');
            position = positionDuration / self.duration * self.width;

            if (position < 0) {
                position = 0;
            }

            if (position > self.width) {
                position = self.width;
            }

            return self.left + position;
        };
    };
    return Column;
}]);


gantt.factory('GanttColumnGenerator', [ 'GanttColumn', 'moment', function(Column, moment) {
    var ColumnGenerator = function($scope) {
        var self = this;

        var columnWidth = $scope.columnWidth;
        if (columnWidth === undefined) {
            columnWidth = 20;
        }
        var unit = $scope.viewScale;
        var calendar = $scope.calendar;
        var timeFramesWorkingMode = $scope.timeFramesWorkingMode;
        var timeFramesNonWorkingMode = $scope.timeFramesNonWorkingMode;

        var columnMagnetValue;
        var columnMagnetUnit;

        if ($scope.columnMagnet) {
            var splittedColumnMagnet = $scope.columnMagnet.trim().split(' ');
            if (splittedColumnMagnet.length > 1) {
                columnMagnetValue = parseInt(splittedColumnMagnet[0]);
                columnMagnetUnit = splittedColumnMagnet[splittedColumnMagnet.length-1];
            }
        }

        // Generates one column for each time unit between the given from and to date.
        self.generate = function(from, to, maximumWidth, leftOffset, reverse) {
            if (!to && !maximumWidth) {
                throw 'to or maximumWidth must be defined';
            }

            var excludeTo = false;
            from = moment(from).startOf(unit);
            if (to) {
                excludeTo = isToDateToExclude(to);
                to = moment(to).startOf(unit);
            }

            var date = moment(from).startOf(unit);
            var generatedCols = [];
            var left = 0;

            while (true) {
                if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                    break;
                }

                var startDate = moment(date);
                var endDate = moment(startDate).add(1, unit);

                var column = new Column(startDate, endDate, leftOffset ? left + leftOffset : left, columnWidth, calendar, timeFramesWorkingMode, timeFramesNonWorkingMode, columnMagnetValue, columnMagnetUnit);
                if (!column.cropped) {
                    generatedCols.push(column);
                    if (reverse) {
                        left -= columnWidth;
                    } else {
                        left += columnWidth;
                    }

                    if (to) {
                        if (reverse) {
                            if (excludeTo && date < to || !excludeTo && date <= to) {
                                break;
                            }
                        } else {
                            if (excludeTo && date > to || !excludeTo && date >= to) {
                                break;
                            }
                        }
                    }
                }
                date.add(reverse ? -1 : 1, unit);
            }

            if (reverse) {
                if (isToDateToExclude(from)) {
                    generatedCols.shift();
                }
                generatedCols.reverse();
            }

            return generatedCols;
        };

        // Columns are generated including or excluding the to date.
        // If the To date is the first day of month and the time is 00:00 then no new column is generated for this month.

        var isToDateToExclude = function(to) {
            return moment(to).add(1, unit).startOf(unit) === to;
        };
    };
    return ColumnGenerator;
}]);


gantt.factory('GanttColumnHeader', [ 'moment', 'GanttColumn', function(moment, Column) {
    // Used to display the Gantt grid and header.
    // The columns are generated by the column generator.

    var ColumnHeader = function(date, unit, left, width, label) {
        var startDate = moment(date);
        var endDate = moment(startDate).add(1, unit);

        var column = new Column(startDate, endDate, left, width);
        column.unit = unit;
        column.label = label;

        return column;
    };
    return ColumnHeader;
}]);


gantt.service('GanttEvents', ['ganttMouseOffset', function(mouseOffset) {
    return {
        buildTaskEventData: function(evt, element, task, gantt) {
            var data = {evt:evt, element:element, task:task};
            if (gantt !== undefined && evt !== undefined) {
                var x = mouseOffset.getOffset(evt).x;
                data.column = gantt.getColumnByPosition(x + task.left);
                data.date = gantt.getDateByPosition(x + task.left);
            }
            return data;
        },

        buildRowEventData: function(evt, element, row, gantt) {
            var data = {evt:evt, element:element, row:row};
            if (gantt !== undefined && evt !== undefined) {
                var x = mouseOffset.getOffset(evt).x;
                data.column = gantt.getColumnByPosition(x);
                data.date = gantt.getDateByPosition(x);
            }
            return data;
        },

        buildColumnEventData: function(evt, element, column) {
            var data = {evt:evt, element:element, column:column};
            return data;
        }
    };


}]);


gantt.factory('Gantt', [
    '$filter', 'GanttRow', 'GanttTimespan', 'GanttColumnGenerator', 'GanttHeaderGenerator', 'moment', 'ganttBinarySearch', 'ganttLayout', 'GANTT_EVENTS',
    function($filter, Row, Timespan, ColumnGenerator, HeaderGenerator, moment, bs, layout, GANTT_EVENTS) {

    // Gantt logic. Manages the columns, rows and sorting functionality.
    var Gantt = function($scope, $element) {
        var self = this;
        self.$scope = $scope;
        self.$element = $element;

        self.rowsMap = {};
        self.rows = [];
        self.filteredRows = [];
        self.visibleRows = [];

        self.timespansMap = {};
        self.timespans = [];

        self.columns = [];
        self.visibleColumns = [];

        self.headers = {};
        self.visibleHeaders = {};

        self.previousColumns = [];
        self.nextColumns = [];

        self.width = 0;

        self.from = undefined;
        self.to = undefined;

        self.scrollAnchor = undefined;

        // Add a watcher if a view related setting changed from outside of the Gantt. Update the gantt accordingly if so.
        // All those changes need a recalculation of the header columns
        $scope.$watch('viewScale+width+labelsWidth+columnWidth+timeFramesWorkingMode+timeFramesNonWorkingMode+columnMagnet', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                self.buildGenerators();
                self.clearColumns();
                self.updateColumns();
            }
        });

        $scope.$watch('fromDate+toDate+autoExpand+taskOutOfRange', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                self.updateColumns();
            }
        });

        $scope.$watch('currentDate+currentDateValue', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                self.setCurrentDate($scope.currentDateValue);
            }
        });

        $scope.$watch('ganttElementWidth+labelsWidth+showLabelsColumn+maxHeight', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                updateColumnsMeta();
            }
        });

        var updateVisibleColumns = function() {
            self.visibleColumns = $filter('ganttColumnLimit')(self.columns, $scope.scrollLeft, $scope.scrollWidth);

            angular.forEach(self.headers, function(headers, key) {
                if (self.headers.hasOwnProperty(key)) {
                    self.visibleHeaders[key] = $filter('ganttColumnLimit')(headers, $scope.scrollLeft, $scope.scrollWidth);
                }
            });
        };

        var updateVisibleRows = function() {
            var oldFilteredRows = self.filteredRows;
            if ($scope.filterRow) {
                self.filteredRows = $filter('filter')(self.rows, $scope.filterRow, $scope.filterRowComparator);
            } else {
                self.filteredRows = self.rows;
            }

            var filterEventData;
            if (!angular.equals(oldFilteredRows, self.filteredRows)) {
                filterEventData = {rows: self.rows, filteredRows: self.filteredRows};
            }

            // TODO: Implement rowLimit like columnLimit to enhance performance for gantt with many rows
            self.visibleRows = self.filteredRows;
            if (filterEventData !== undefined) {
                $scope.$emit(GANTT_EVENTS.ROWS_FILTERED, filterEventData);
            }
        };

        var updateVisibleTasks = function() {
            var oldFilteredTasks = [];
            var filteredTasks = [];
            var tasks = [];

            angular.forEach(self.filteredRows, function(row) {
                oldFilteredTasks = oldFilteredTasks.concat(row.filteredTasks);
                row.updateVisibleTasks();
                filteredTasks = filteredTasks.concat(row.filteredTasks);
                tasks = tasks.concat(row.tasks);
            });

            var filterEventData;
            if (!angular.equals(oldFilteredTasks, filteredTasks)) {
                filterEventData = {tasks: tasks, filteredTasks: filteredTasks};
            }

            if (filterEventData !== undefined) {
                $scope.$emit(GANTT_EVENTS.TASKS_FILTERED, filterEventData);
            }
        };

        var updateVisibleObjects = function() {
            updateVisibleRows();
            updateVisibleTasks();
        };

        updateVisibleColumns();
        updateVisibleObjects();

        $scope.$watch('scrollLeft+scrollWidth', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                updateVisibleColumns();
                updateVisibleTasks();
            }
        });

        $scope.$watch('filterTask+filterTaskComparator', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                updateVisibleTasks();
            }
        });

        $scope.$watch('filterRow+filterRowComparator', function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                updateVisibleRows();
            }
        });

        var setScrollAnchor = function() {
            if ($scope.template.scrollable && $scope.template.scrollable.$element && self.columns.length > 0) {
                var el = $scope.template.scrollable.$element[0];
                var center = el.scrollLeft + el.offsetWidth / 2;

                self.scrollAnchor = self.getDateByPosition(center);
            }
        };

        var getExpandedFrom = function(from) {
            from = from ? moment(from) : from;

            var minRowFrom = from;
            angular.forEach(self.rows, function(row) {
                if (minRowFrom === undefined || minRowFrom > row.from) {
                    minRowFrom = row.from;
                }
            });
            if (minRowFrom && (!from || minRowFrom < from)) {
                return minRowFrom;
            }
            return from;
        };

        var getExpandedTo = function(to) {
            to = to ? moment(to) : to;

            var maxRowTo = to;
            angular.forEach(self.rows, function(row) {
                if (maxRowTo === undefined || maxRowTo < row.to) {
                    maxRowTo = row.to;
                }
            });
            if (maxRowTo && (!$scope.toDate || maxRowTo > $scope.toDate)) {
                return maxRowTo;
            }
            return to;
        };

        // Generates the Gantt columns according to the specified from - to date range. Uses the currently assigned column generator.
        var generateColumns = function(from, to) {
            if (!from) {
                from = getDefaultFrom();
                if (!from) {
                    return false;
                }
            }

            if (!to) {
                to = getDefaultTo();
                if (!to) {
                    return false;
                }
            }

            if (self.from === from && self.to === to) {
                return false;
            }

            setScrollAnchor();

            self.from = from;
            self.to = to;

            self.columns = self.columnGenerator.generate(from, to);
            self.headers = self.headerGenerator.generate(self.columns);
            self.previousColumns = [];
            self.nextColumns = [];

            updateColumnsMeta();

            return true;
        };

        var setColumnsWidth = function(width, originalWidth, columns) {
            if (width && originalWidth && columns) {

                var widthFactor = Math.abs(width / originalWidth);

                angular.forEach(columns, function(column) {
                    column.left = widthFactor * column.originalSize.left;
                    column.width = widthFactor * column.originalSize.width;

                    angular.forEach(column.timeFrames, function(timeFrame) {
                        timeFrame.left = widthFactor * timeFrame.originalSize.left;
                        timeFrame.width = widthFactor * timeFrame.originalSize.width;
                    });
                });
            }
        };

        var updateColumnsMeta = function() {
            var lastColumn = self.getLastColumn();
            self.originalWidth = lastColumn !== undefined ? lastColumn.originalSize.left + lastColumn.originalSize.width : 0;

            if ($scope.columnWidth === undefined) {
                var newWidth = $scope.ganttElementWidth - ($scope.showLabelsColumn ? $scope.labelsWidth : 0);

                if ($scope.maxHeight > 0) {
                    newWidth = newWidth - layout.getScrollBarWidth();
                }

                setColumnsWidth(newWidth, self.originalWidth, self.previousColumns);
                setColumnsWidth(newWidth, self.originalWidth, self.columns);
                setColumnsWidth(newWidth, self.originalWidth, self.nextColumns);

                angular.forEach(self.headers, function(header) {
                    setColumnsWidth(newWidth, self.originalWidth, header);
                });
            }

            self.width = lastColumn !== undefined ? lastColumn.left + lastColumn.width : 0;

            if (self._currentDate !== undefined) {
                self.setCurrentDate(self._currentDate);
            }
            $scope.currentDatePosition = self.getPositionByDate($scope.currentDateValue);

            self.updateTasksPosAndSize();
            self.updateTimespansPosAndSize();

            updateVisibleColumns();
            updateVisibleObjects();
        };

        var expandExtendedColumnsForPosition = function(x) {
            if (x < 0) {
                var firstColumn = self.getFirstColumn();
                var from = firstColumn.date;
                var firstExtendedColumn = self.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.left > x) {
                    self.previousColumns = self.columnGenerator.generate(from, undefined, -x, 0, true);
                }
                return true;
            } else if (x > self.width) {
                var lastColumn = self.getLastColumn();
                var endDate = lastColumn.getDateByPosition(lastColumn.width);
                var lastExtendedColumn = self.getLastColumn(true);
                if (!lastExtendedColumn || lastExtendedColumn.left + lastExtendedColumn.width < x) {
                    self.nextColumns = self.columnGenerator.generate(endDate, undefined, x - self.width, self.width, false);
                }
                return true;
            }
            return false;
        };

        var expandExtendedColumnsForDate = function(date) {
            var firstColumn = self.getFirstColumn();
            var from;
            if (firstColumn) {
                from = firstColumn.date;
            }

            var lastColumn = self.getLastColumn();
            var endDate;
            if (lastColumn) {
                endDate = lastColumn.getDateByPosition(lastColumn.width);
            }

            if (from && date < from) {
                var firstExtendedColumn = self.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.date > date) {
                    self.previousColumns = self.columnGenerator.generate(from, date, undefined, 0, true);
                }
                return true;
            } else if (endDate && date > endDate) {
                var lastExtendedColumn = self.getLastColumn(true);
                if (!lastExtendedColumn || endDate < lastExtendedColumn) {
                    self.nextColumns = self.columnGenerator.generate(endDate, date, undefined, self.width, false);
                }
                return true;
            }
            return false;
        };

        // Sets the Gantt view scale. Call reGenerateColumns to make changes visible after changing the view scale.
        // The headers are shown depending on the defined view scale.
        self.buildGenerators = function() {
            self.columnGenerator = new ColumnGenerator($scope);
            self.headerGenerator = new HeaderGenerator($scope);
        };

        var getDefaultFrom = function() {
            var defaultFrom;
            angular.forEach(self.timespans, function(timespan) {
                if (defaultFrom === undefined || timespan.from < defaultFrom) {
                    defaultFrom = timespan.from;
                }
            });

            angular.forEach(self.rows, function(row) {
                if (defaultFrom === undefined || row.from < defaultFrom) {
                    defaultFrom = row.from;
                }
            });
            return defaultFrom;
        };

        var getDefaultTo = function() {
            var defaultTo;
            angular.forEach(self.timespans, function(timespan) {
                if (defaultTo === undefined || timespan.to > defaultTo) {
                    defaultTo = timespan.to;
                }
            });

            angular.forEach(self.rows, function(row) {
                if (defaultTo === undefined || row.to > defaultTo) {
                    defaultTo = row.to;
                }
            });
            return defaultTo;
        };

        self.updateColumns = function() {
            var from = $scope.fromDate;
            var to = $scope.toDate;
            if ($scope.taskOutOfRange === 'expand') {
                from = getExpandedFrom(from);
                to = getExpandedTo(to);
            }
            generateColumns(from, to);
        };

        // Removes all existing columns and re-generates them. E.g. after e.g. the view scale changed.
        // Rows can be re-generated only if there is a data-range specified. If the re-generation failed the function returns false.
        self.clearColumns = function() {
            setScrollAnchor();

            self.from = undefined;
            self.to = undefined;
            self.columns = [];
            self.visibleColumns = [];
            self.previousColumns = [];
            self.nextColumns = [];
            self.visibleHeaders = {};
            self.visibleRows = [];
        };

        // Update the position/size of all tasks in the Gantt
        self.updateTasksPosAndSize = function() {
            for (var i = 0, l = self.rows.length; i < l; i++) {
                self.rows[i].updateTasksPosAndSize();
            }
        };

        // Update the position/size of all timespans in the Gantt
        self.updateTimespansPosAndSize = function() {
            for (var i = 0, l = self.timespans.length; i < l; i++) {
                self.timespans[i].updatePosAndSize();
            }
        };

        // Returns the last Gantt column or undefined
        self.getLastColumn = function(extended) {
            var columns = self.columns;
            if (extended) {
                columns = self.nextColumns;
            }
            if (columns && columns.length > 0) {
                return columns[columns.length - 1];
            } else {
                return undefined;
            }
        };

        // Returns the first Gantt column or undefined
        self.getFirstColumn = function(extended) {
            var columns = self.columns;
            if (extended) {
                columns = self.previousColumns;
            }

            if (columns && columns.length > 0) {
                return columns[0];
            } else {
                return undefined;
            }
        };

        // Returns the column at the given or next possible date
        self.getColumnByDate = function(date) {
            expandExtendedColumnsForDate(date);
            var extendedColumns = self.previousColumns.concat(self.columns, self.nextColumns);
            var columns = bs.get(extendedColumns, date, function(c) {
                return c.date;
            });
            return columns[0] !== undefined ? columns[0] : columns[1];
        };

        // Returns the column at the given position x (in em)
        self.getColumnByPosition = function(x) {
            expandExtendedColumnsForPosition(x);
            var extendedColumns = self.previousColumns.concat(self.columns, self.nextColumns);
            return bs.get(extendedColumns, x, function(c) {
                return c.left;
            })[0];
        };

        // Returns the exact column date at the given position x (in em)
        self.getDateByPosition = function(x, magnet) {
            var column = self.getColumnByPosition(x);
            if (column !== undefined) {
                return column.getDateByPosition(x - column.left, magnet);
            } else {
                return undefined;
            }
        };

        // Returns the position inside the Gantt calculated by the given date
        self.getPositionByDate = function(date) {
            if (date === undefined) {
                return undefined;
            }

            if (!moment.isMoment(moment)) {
                date = moment(date);
            }

            var column = self.getColumnByDate(date);
            if (column !== undefined) {
                return column.getPositionByDate(date);
            } else {
                return undefined;
            }
        };

        // Returns the min and max date of all loaded tasks or undefined if there are no tasks loaded
        self.getTasksDateRange = function() {
            if (self.rows.length === 0) {
                return undefined;
            } else {
                var minDate, maxDate;

                for (var i = 0, l = self.rows.length; i < l; i++) {
                    var row = self.rows[i];

                    if (minDate === undefined || row.from < minDate) {
                        minDate = row.from;
                    }

                    if (maxDate === undefined || row.to > maxDate) {
                        maxDate = row.to;
                    }
                }

                return {
                    from: minDate,
                    to: maxDate
                };
            }
        };

        // Returns the number of active headers
        self.getActiveHeadersCount = function() {
            var size = 0, key;
            for (key in self.headers) {
                if (self.headers.hasOwnProperty(key)) {
                    size++;
                }
            }
            return size;
        };

        // Adds or update rows and tasks.
        self.addData = function(data) {
            for (var i = 0, l = data.length; i < l; i++) {
                var rowData = data[i];
                addRow(rowData);
            }

            self.updateColumns();
            self.updateTasksPosAndSize();
            updateVisibleObjects();
        };

        // Adds a row or merges the row and its tasks if there is already one with the same id
        var addRow = function(rowData) {
            // Copy to new row (add) or merge with existing (update)
            var row, isUpdate = false;

            if (rowData.id in self.rowsMap) {
                row = self.rowsMap[rowData.id];
                row.copy(rowData);
                isUpdate = true;
                $scope.$emit(GANTT_EVENTS.ROW_CHANGED, {'row': row});
            } else {
                var order = rowData.order;

                // Check if the row has a order predefined. If not assign one
                if (order === undefined) {
                    order = self.highestRowOrder;
                }

                if (order >= self.highestRowOrder) {
                    self.highestRowOrder = order + 1;
                }

                row = new Row(rowData.id, self, rowData.name, order, rowData.data);
                self.rowsMap[rowData.id] = row;
                self.rows.push(row);
                self.filteredRows.push(row);
                self.visibleRows.push(row);
                $scope.$emit(GANTT_EVENTS.ROW_ADDED, {'row': row});
            }

            if (rowData.tasks !== undefined && rowData.tasks.length > 0) {
                for (var i = 0, l = rowData.tasks.length; i < l; i++) {
                    row.addTask(rowData.tasks[i]);
                }
            }
            return isUpdate;
        };

        // Removes specified rows or tasks.
        // If a row has no tasks inside the complete row will be deleted.
        self.removeData = function(data) {
            for (var i = 0, l = data.length; i < l; i++) {
                var rowData = data[i];
                var row;

                if (rowData.tasks !== undefined && rowData.tasks.length > 0) {
                    // Only delete the specified tasks but not the row and the other tasks

                    if (rowData.id in self.rowsMap) {
                        row = self.rowsMap[rowData.id];

                        for (var j = 0, k = rowData.tasks.length; j < k; j++) {
                            row.removeTask(rowData.tasks[j].id);
                        }

                        $scope.$emit(GANTT_EVENTS.ROW_CHANGED, {'row': row});
                    }
                } else {
                    // Delete the complete row
                    row = removeRow(rowData.id);
                }
            }

            self.updateColumns();
            updateVisibleObjects();
        };

        // Removes the complete row including all tasks
        var removeRow = function(rowId) {
            if (rowId in self.rowsMap) {
                delete self.rowsMap[rowId]; // Remove from map

                var removedRow;
                var row;
                for (var i = self.rows.length -1; i >=0 ; i--) {
                    row = self.rows[i];
                    if (row.id === rowId) {
                        removedRow = row;
                        self.rows.splice(i, 1); // Remove from array
                    }
                }

                for (i = self.filteredRows.length -1; i >=0 ; i--) {
                    row = self.filteredRows[i];
                    if (row.id === rowId) {
                        self.filteredRows.splice(i, 1); // Remove from filtered array
                    }
                }

                for (i = self.visibleRows.length -1; i >=0 ; i--) {
                    row = self.visibleRows[i];
                    if (row.id === rowId) {
                        self.visibleRows.splice(i, 1); // Remove from visible array
                    }
                }

                $scope.$emit(GANTT_EVENTS.ROW_REMOVED, {'row': removedRow});
                return row;
            }

            return undefined;
        };

        // Removes all rows and tasks
        self.removeAllRows = function() {
            self.rowsMap = {};
            self.rows = [];
            self.filteredRows = [];
            self.visibleRows = [];
            self.highestRowOrder = 0;
            self.clearColumns();
            self.scrollAnchor = undefined;
        };

        // Removes all timespans
        self.removeAllTimespans = function() {
            self.timespansMap = {};
            self.timespans = [];
        };

        // Swaps two rows and changes the sort order to custom to display the swapped rows
        self.swapRows = function(a, b) {
            // Swap the two rows
            var order = a.order;
            a.order = b.order;
            b.order = order;
        };

        // Sort rows by the specified sort mode (name, order, custom)
        // and by Ascending or Descending
        self.sortRows = function(expression) {
            var reverse = false;
            expression = expression;
            if (expression.charAt(0) === '-') {
                reverse = true;
                expression = expression.substr(1);
            }

            var angularOrderBy = $filter('orderBy');
            if (expression === 'custom') {
                self.rows = angularOrderBy(self.rows, 'order', reverse);
            } else {
                self.rows = angularOrderBy(self.rows, expression, reverse);
            }

            updateVisibleRows();
        };

        // Adds or updates timespans
        self.addTimespans = function(timespans) {
            for (var i = 0, l = timespans.length; i < l; i++) {
                var timespanData = timespans[i];
                addTimespan(timespanData);
                var timespan = self.timespansMap[timespanData.id];
                timespan.updatePosAndSize();
            }
        };

        // Adds a timespan or merges the timespan if there is already one with the same id
        var addTimespan = function(timespanData) {
            // Copy to new timespan (add) or merge with existing (update)
            var timespan, isUpdate = false;

            if (timespanData.id in self.timespansMap) {
                timespan = self.timespansMap[timespanData.id];
                timespan.copy(timespanData);
                isUpdate = true;
            } else {
                timespan = new Timespan(timespanData.id, self, timespanData.name, timespanData.color,
                    timespanData.classes, timespanData.priority, timespanData.from, timespanData.to, timespanData.data);
                self.timespansMap[timespanData.id] = timespan;
                self.timespans.push(timespan);
                $scope.$emit(GANTT_EVENTS.TIMESPAN_ADDED, {timespan: timespan});
            }

            return isUpdate;
        };

        self.setCurrentDate = function(currentDate) {
            self._currentDate = currentDate;
            if (self._currentDateColumn !== undefined) {
                delete self._currentDateColumn;
            }

            if (self._currentDate !== undefined) {
                var column = self.getColumnByDate(self._currentDate);
                if (column !== undefined) {
                    column.currentDate = self._currentDate;
                    self._currentDateColumn = column;
                }
            }

            $scope.currentDatePosition = self.getPositionByDate($scope.currentDateValue);
        };
        self.buildGenerators();
        self.clearColumns();
        self.updateColumns();
        self.setCurrentDate($scope.currentDateValue);
    };

    return Gantt;
}]);


gantt.factory('GanttHeaderGenerator', ['GanttColumnHeader', function(ColumnHeader) {
    var generateHeader = function(headerFormatFunction, columns, unit) {
        var generatedHeaders = [];
        var header;
        for (var i = 0, l = columns.length; i < l; i++) {
            var col = columns[i];
            if (i === 0 || columns[i - 1].date.get(unit) !== col.date.get(unit)) {
                var label = col.date.format(headerFormatFunction(unit));
                header = new ColumnHeader(col.date, unit, col.originalSize.left, col.originalSize.width, label);
                header.left = col.left;
                header.width = col.width;
                generatedHeaders.push(header);
            } else {
                header.originalSize.width += col.originalSize.width;
                header.width += col.width;
            }
        }
        return generatedHeaders;
    };

    return function($scope) {
        this.generate = function(columns) {
            var units = [];
            if ($scope.headers === undefined) {
                units = [];
                if (['year', 'quarter', 'month'].indexOf($scope.viewScale) > -1) {
                    units.push('year');
                }
                if (['quarter'].indexOf($scope.viewScale) > -1) {
                    units.push('quarter');
                }
                if (['day', 'week', 'month'].indexOf($scope.viewScale) > -1) {
                    units.push('month');
                }
                if (['day', 'week'].indexOf($scope.viewScale) > -1) {
                    units.push('week');
                }
                if (['hour', 'day'].indexOf($scope.viewScale) > -1) {
                    units.push('day');
                }
                if (['hour', 'minute', 'second'].indexOf($scope.viewScale) > -1) {
                    units.push('hour');
                }
                if (['minute', 'second'].indexOf($scope.viewScale) > -1) {
                    units.push('minute');
                }
                if (['second'].indexOf($scope.viewScale) > -1) {
                    units.push('second');
                }
                if (units.length === 0) {
                    units.push($scope.viewScale);
                }
            } else {
                units = $scope.headers;
            }

            var headers = [];
            angular.forEach(units, function(unit) {
                headers.push(generateHeader($scope.getHeaderFormat, columns, unit));
            });

            return headers;
        };
    };
}]);


gantt.factory('GanttRow', ['GanttTask', 'moment', '$filter', 'GANTT_EVENTS', function(Task, moment, $filter, GANTT_EVENTS) {
    var Row = function(id, gantt, name, order, data) {
        var self = this;

        self.id = id;
        self.gantt = gantt;
        self.name = name;
        self.order = order;
        self.from = undefined;
        self.to = undefined;
        self.tasksMap = {};
        self.tasks = [];
        self.filteredTasks = [];
        self.visibleTasks = [];
        self.data = data;

        // Adds a task to a specific row. Merges the task if there is already one with the same id
        self.addTask = function(taskData) {
            // Copy to new task (add) or merge with existing (update)
            var task;

            if (taskData.id in self.tasksMap) {
                task = self.tasksMap[taskData.id];
                task.copy(taskData);
            } else {
                task = new Task(taskData.id, self, taskData.name, taskData.color, taskData.classes, taskData.priority, taskData.from, taskData.to, taskData.data, taskData.est, taskData.lct, taskData.progress);
                self.tasksMap[taskData.id] = task;
                self.tasks.push(task);
                self.filteredTasks.push(task);
                self.visibleTasks.push(task);
            }

            self.sortTasks();
            self.setFromToByTask(task);
            self.gantt.$scope.$emit(GANTT_EVENTS.TASK_ADDED, {'task': task});
            return task;
        };

        // Removes the task from the existing row and adds it to he current one
        self.moveTaskToRow = function(task) {
            var oldRow = task.row;
            oldRow.removeTask(task.id, true);
            oldRow.updateVisibleTasks();

            self.tasksMap[task.id] = task;
            self.tasks.push(task);
            self.filteredTasks.push(task);
            self.visibleTasks.push(task);
            task.row = self;

            self.sortTasks();
            self.setFromToByTask(task);

            task.updatePosAndSize();
            self.updateVisibleTasks();

            self.gantt.$scope.$emit(GANTT_EVENTS.TASK_MOVED, {'oldRow': oldRow, 'task': task});

        };

        self.updateVisibleTasks = function() {
            if (gantt.$scope.filterTask) {
                self.filteredTasks = $filter('filter')(self.tasks, gantt.$scope.filterTask, gantt.$scope.filterTaskComparator);
            } else {
                self.filteredTasks = self.tasks;
            }
            self.visibleTasks = $filter('ganttTaskLimit')(self.filteredTasks, self.gantt);
        };

        self.updateTasksPosAndSize = function() {
            for (var j = 0, k = self.tasks.length; j < k; j++) {
                self.tasks[j].updatePosAndSize();
            }
        };

        // Remove the specified task from the row
        self.removeTask = function(taskId, disableEmit) {
            if (taskId in self.tasksMap) {
                delete self.tasksMap[taskId]; // Remove from map

                var task;
                var removedTask;
                for (var i = self.tasks.length - 1; i >= 0; i--) {
                    task = self.tasks[i];
                    if (task.id === taskId) {
                        removedTask = task;
                        self.tasks.splice(i, 1); // Remove from array

                        // Update earliest or latest date info as this may change
                        if (self.from - task.from === 0 || self.to - task.to === 0) {
                            self.setFromTo();
                        }
                    }
                }

                for (i = self.filteredTasks.length - 1; i >= 0; i--) {
                    task = self.filteredTasks[i];
                    if (task.id === taskId) {
                        self.filteredTasks.splice(i, 1); // Remove from filtered array
                    }
                }

                for (i = self.visibleTasks.length - 1; i >= 0; i--) {
                    task = self.visibleTasks[i];
                    if (task.id === taskId) {
                        self.visibleTasks.splice(i, 1); // Remove from visible array
                    }
                }

                if (!disableEmit) {
                    self.gantt.$scope.$emit(GANTT_EVENTS.TASK_REMOVED, {'task': removedTask});
                }

                return removedTask;
            }
        };

        // Calculate the earliest from and latest to date of all tasks in a row
        self.setFromTo = function() {
            self.from = undefined;
            self.to = undefined;
            for (var j = 0, k = self.tasks.length; j < k; j++) {
                self.setFromToByTask(self.tasks[j]);
            }
        };

        self.setFromToByTask = function(task) {
            if (self.from === undefined) {
                self.from = moment(task.from);
            } else if (task.from < self.from) {
                self.from = moment(task.from);
            }

            if (self.to === undefined) {
                self.to = moment(task.to);
            } else if (task.to > self.to) {
                self.to = moment(task.to);
            }
        };

        self.sortTasks = function() {
            self.tasks.sort(function(t1, t2) {
                return t1.left - t2.left;
            });
        };

        self.copy = function(row) {
            self.name = row.name;
            self.data = row.data;

            if (row.order !== undefined) {
                self.order = row.order;
            }
        };

        self.clone = function() {
            var clone = new Row(self.id, self.gantt, self.name, self.order, self.data);
            for (var i = 0, l = self.tasks.length; i < l; i++) {
                clone.addTask(self.tasks[i].clone());
            }
            return clone;
        };
    };

    return Row;
}]);


gantt.factory('GanttScrollable', [function() {
    var Scrollable = function($element) {
        this.$element = $element;
    };
    return Scrollable;
}]);


gantt.factory('GanttTask', ['moment', 'GanttTaskProgress', function(moment, TaskProgress) {
    var Task = function(id, row, name, color, classes, priority, from, to, data, est, lct, progress) {
        var self = this;

        self.id = id;
        self.gantt = row.gantt;
        self.row = row;
        self.name = name;
        self.color = color;
        self.classes = classes;
        self.priority = priority;
        self.from = moment(from);
        self.to = moment(to);
        self.truncatedLeft = false;
        self.truncatedRight = false;
        self.data = data;
        if (progress !== undefined) {
            if (typeof progress === 'object') {
                self.progress = new TaskProgress(self, progress.percent, progress.color, progress.classes);
            } else {
                self.progress = new TaskProgress(self, progress);
            }
        }

        if (est !== undefined && lct !== undefined) {
            self.est = moment(est);  //Earliest Start Time
            self.lct = moment(lct);  //Latest Completion Time
        }

        self._fromLabel = undefined;
        self.getFromLabel = function() {
            if (self._fromLabel === undefined) {
                self._fromLabel = self.from.format(self.gantt.$scope.tooltipDateFormat);
            }
            return self._fromLabel;
        };

        self._toLabel = undefined;
        self.getToLabel = function() {
            if (self._toLabel === undefined) {
                self._toLabel = self.to.format(self.gantt.$scope.tooltipDateFormat);
            }
            return self._toLabel;
        };

        self.checkIfMilestone = function() {
            self.isMilestone = self.from - self.to === 0;
        };

        self.checkIfMilestone();

        self.hasBounds = function() {
            return self.bounds !== undefined;
        };

        // Updates the pos and size of the task according to the from - to date
        self.updatePosAndSize = function() {
            self.modelLeft = self.gantt.getPositionByDate(self.from);
            self.modelWidth = self.gantt.getPositionByDate(self.to) - self.modelLeft;

            self.outOfRange = self.modelLeft + self.modelWidth < 0 || self.modelLeft > self.gantt.width;

            self.left = Math.min(Math.max(self.modelLeft, 0), self.gantt.width);
            if (self.modelLeft < 0) {
                self.truncatedLeft = true;
                if (self.modelWidth + self.modelLeft > self.gantt.width) {
                    self.truncatedRight = true;
                    self.width = self.gantt.width;
                } else {
                    self.truncatedRight = false;
                    self.width = self.modelWidth + self.modelLeft;
                }
            } else if (self.modelWidth + self.modelLeft > self.gantt.width) {
                self.truncatedRight = true;
                self.truncatedLeft = false;
                self.width = self.gantt.width - self.modelLeft;
            } else {
                self.truncatedLeft = false;
                self.truncatedRight = false;
                self.width = self.modelWidth;
            }

            if (self.est !== undefined && self.lct !== undefined) {
                self.bounds = {};
                self.bounds.left = self.gantt.getPositionByDate(self.est);
                self.bounds.width = self.gantt.getPositionByDate(self.lct) - self.bounds.left;
            }
        };

        // Expands the start of the task to the specified position (in em)
        self.setFrom = function(x) {
            self.from = self.gantt.getDateByPosition(x, true);
            self._fromLabel = undefined;
            self.row.setFromToByTask(self);
            self.updatePosAndSize();
            self.checkIfMilestone();
        };

        // Expands the end of the task to the specified position (in em)
        self.setTo = function(x) {
            self.to = self.gantt.getDateByPosition(x, true);
            self._toLabel = undefined;
            self.row.setFromToByTask(self);
            self.updatePosAndSize();
            self.checkIfMilestone();
        };

        // Moves the task to the specified position (in em)
        self.moveTo = function(x) {
            self.from = self.gantt.getDateByPosition(x, true);
            self._fromLabel = undefined;
            var newTaskLeft = self.gantt.getPositionByDate(self.from);
            self.to = self.gantt.getDateByPosition(newTaskLeft + self.modelWidth, true);
            self._toLabel = undefined;
            self.row.setFromToByTask(self);
            self.updatePosAndSize();
        };

        self.copy = function(task) {
            self.name = task.name;
            self.color = task.color;
            self.classes = task.classes;
            self.priority = task.priority;
            self.from = moment(task.from);
            self.to = moment(task.to);
            self.est = task.est !== undefined ? moment(task.est) : undefined;
            self.lct = task.lct !== undefined ? moment(task.lct) : undefined;
            self.data = task.data;
            self.isMilestone = task.isMilestone;
        };

        self.clone = function() {
            return new Task(self.id, self.row, self.name, self.color, self.classes, self.priority, self.from, self.to, self.data, self.est, self.lct, self.progress);
        };
    };

    return Task;
}]);


gantt.factory('GanttTaskProgress', [function() {
    var TaskProgress = function(task, percent, color, classes) {
        var self = this;

        self.task = task;
        self.percent = percent;
        self.color = color;
        self.classes = classes;

        self.clone = function() {
            return new TaskProgress(self.task, self.percent, self.color, self.classes);
        };
    };
    return TaskProgress;
}]);


gantt.factory('GanttBody', [function() {
    var Body= function($element) {
        this.$element = $element;

        this.getWidth = function() {
            return this.$element.width();
        };
    };
    return Body;
}]);


gantt.factory('GanttBodyColumns', [function() {
    var BodyColumns = function($element) {
        this.$element = $element;

        this.getWidth = function() {
            return this.$element.width();
        };
    };
    return BodyColumns;
}]);


gantt.factory('GanttBodyRows', [function() {
    var BodyRows = function($element) {
        this.$element = $element;

        this.getWidth = function() {
            return this.$element.width();
        };
    };
    return BodyRows;
}]);


gantt.factory('GanttHeader', [function() {
    var Header= function($element) {
        this.$element = $element;

        this.getWidth = function() {
            return this.$element.width();
        };

        this.getHeight = function() {
            return this.$element[0].offsetHeight;
        };
    };
    return Header;
}]);


gantt.factory('GanttHeaderColumns', [function() {
    var HeaderColumns = function($element) {
        this.$element = $element;

        this.getWidth = function() {
            return this.$element.width();
        };
    };
    return HeaderColumns;
}]);


gantt.factory('GanttLabels', [function() {
    var Labels= function($element) {
        this.$element = $element;

        this.getWidth = function() {
            return this.$element.width();
        };
    };
    return Labels;
}]);


gantt.factory('GanttTimespan', ['moment', function(moment) {
    var Timespan = function(id, gantt, name, color, classes, priority, from, to, data, est, lct) {
        var self = this;

        self.id = id;
        self.gantt = gantt;
        self.name = name;
        self.color = color;
        self.classes = classes;
        self.priority = priority;
        self.from = moment(from);
        self.to = moment(to);
        self.data = data;

        if (est !== undefined && lct !== undefined) {
            self.est = moment(est);  //Earliest Start Time
            self.lct = moment(lct);  //Latest Completion Time
        }

        self.hasBounds = function() {
            return self.bounds !== undefined;
        };

        // Updates the pos and size of the timespan according to the from - to date
        self.updatePosAndSize = function() {
            self.left = self.gantt.getPositionByDate(self.from);
            self.width = self.gantt.getPositionByDate(self.to) - self.left;

            if (self.est !== undefined && self.lct !== undefined) {
                self.bounds = {};
                self.bounds.left = self.gantt.getPositionByDate(self.est);
                self.bounds.width = self.gantt.getPositionByDate(self.lct) - self.bounds.left;
            }
        };

        // Expands the start of the timespan to the specified position (in em)
        self.setFrom = function(x) {
            self.from = self.gantt.getDateByPosition(x);
            self.updatePosAndSize();
        };

        // Expands the end of the timespan to the specified position (in em)
        self.setTo = function(x) {
            self.to = self.gantt.getDateByPosition(x);
            self.updatePosAndSize();
        };

        // Moves the timespan to the specified position (in em)
        self.moveTo = function(x) {
            self.from = self.gantt.getDateByPosition(x);
            self.to = self.gantt.getDateByPosition(x + self.width);
            self.updatePosAndSize();
        };

        self.copy = function(timespan) {
            self.name = timespan.name;
            self.color = timespan.color;
            self.classes = timespan.classes;
            self.priority = timespan.priority;
            self.from = moment(timespan.from);
            self.to = moment(timespan.to);
            self.est = timespan.est !== undefined ? moment(timespan.est) : undefined;
            self.lct = timespan.lct !== undefined ? moment(timespan.lct) : undefined;
            self.data = timespan.data;
        };

        self.clone = function() {
            return new Timespan(self.id, self.gantt, self.name, self.color, self.classes, self.priority, self.from, self.to, self.data, self.est, self.lct);
        };
    };

    return Timespan;
}]);


gantt.service('ganttBinarySearch', [ function() {
    // Returns the object on the left and right in an array using the given cmp function.
    // The compare function defined which property of the value to compare (e.g.: c => c.left)

    return {
        getIndicesOnly: function(input, value, comparer) {
            var lo = -1, hi = input.length;
            while (hi - lo > 1) {
                var mid = Math.floor((lo + hi) / 2);
                if (comparer(input[mid]) <= value) {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }
            if (input[lo] !== undefined && comparer(input[lo]) === value) {
                hi = lo;
            }
            return [lo, hi];
        },
        get: function(input, value, comparer) {
            var res = this.getIndicesOnly(input, value, comparer);
            return [input[res[0]], input[res[1]]];
        }
    };
}]);

gantt.filter('ganttColumnLimit', [ 'ganttBinarySearch', function(bs) {
    // Returns only the columns which are visible on the screen

    return function(input, scrollLeft, scrollWidth) {
        var cmp = function(c) {
            return c.left;
        };
        var start = bs.getIndicesOnly(input, scrollLeft, cmp)[0];
        var end = bs.getIndicesOnly(input, scrollLeft + scrollWidth, cmp)[1];
        return input.slice(start, end);
    };
}]);


gantt.directive('ganttLimitUpdater', ['$timeout', 'ganttDebounce', function($timeout, debounce) {
    // Updates the limit filters if the user scrolls the gantt chart

    return {
        restrict: 'A',
        controller: ['$scope', '$element', function($scope, $element) {
            var el = $element[0];
            var scrollUpdate = function() {
                $scope.scrollLeft = el.scrollLeft;
                $scope.scrollWidth = el.offsetWidth;
            };

            $element.bind('scroll', debounce(function() {
                scrollUpdate();
            }, 5));

            $scope.$watch('gantt.width', debounce(function() {
                scrollUpdate();
            }, 20));
        }]
    };
}]);


gantt.filter('ganttTaskLimit', [function() {
    // Returns only the tasks which are visible on the screen
    // Use the task width and position to decide if a task is still visible

    return function(input, gantt) {
        var res = [];
        for (var i = 0, l = input.length; i < l; i++) {
            var task = input[i];

            if (task.isMoving) {
                // If the task is moving, be sure to keep it existing.
                res.push(task);
            } else {
                // If the task can be drawn with gantt columns only.
                if (task.to > gantt.getFirstColumn().date && task.from < gantt.getLastColumn().endDate) {

                    var scrollLeft = gantt.$scope.scrollLeft;
                    var scrollWidth = gantt.$scope.scrollWidth;

                    // If task has a visible part on the screen
                    if (task.left >= scrollLeft && task.left <= scrollLeft + scrollWidth ||
                        task.left + task.width >= scrollLeft && task.left + task.width <= scrollLeft + scrollWidth ||
                        task.left < scrollLeft && task.left + task.width > scrollLeft + scrollWidth) {

                        res.push(task);
                    }
                }
            }

        }

        return res;
    };
}]);


gantt.directive('ganttLabelsResize', ['$document', 'ganttDebounce', 'ganttMouseOffset', 'GANTT_EVENTS', function($document, debounce, mouseOffset, GANTT_EVENTS) {

    return {
        restrict: 'A',
        scope: { enabled: '=ganttLabelsResize',
            width: '=ganttLabelsResizeWidth',
            minWidth: '=ganttLabelsResizeMinWidth'},
        controller: ['$scope', '$element', function($scope, $element) {
            var resizeAreaWidth = 5;
            var cursor = 'ew-resize';
            var originalPos;

            $element.bind('mousedown', function(e) {
                if ($scope.enabled && isInResizeArea(e)) {
                    enableResizeMode(e);
                    e.preventDefault();
                }
            });

            $element.bind('mousemove', function(e) {
                if ($scope.enabled) {
                    if (isInResizeArea(e)) {
                        $element.css('cursor', cursor);
                    } else {
                        $element.css('cursor', '');
                    }
                }
            });

            var resize = function(x) {
                if ($scope.width === 0) {
                    $scope.width = $element[0].offsetWidth;
                }

                $scope.width += x - originalPos;
                if ($scope.width < $scope.minWidth) {
                    $scope.width = $scope.minWidth;
                }

                originalPos = x;
            };

            var isInResizeArea = function(e) {
                var x = mouseOffset.getOffset(e).x;

                return x > $element[0].offsetWidth - resizeAreaWidth;
            };

            var enableResizeMode = function(e) {
                originalPos = e.screenX;

                angular.element($document[0].body).css({
                    '-moz-user-select': '-moz-none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'cursor': cursor
                });

                var moveHandler = debounce(function(e) {
                    resize(e.screenX);
                }, 5);

                angular.element($document[0].body).bind('mousemove', moveHandler);

                angular.element($document[0].body).one('mouseup', function() {
                    angular.element($document[0].body).unbind('mousemove', moveHandler);
                    disableResizeMode();
                });
            };

            var disableResizeMode = function() {
                $element.css('cursor', '');

                angular.element($document[0].body).css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': '',
                    'cursor': ''
                });

                $scope.$emit(GANTT_EVENTS.ROW_LABELS_RESIZED, { width: $scope.width });
            };
        }]
    };
}]);


gantt.directive('ganttRightClick', ['$parse', function($parse) {

    return {
        restrict: 'A',
        compile: function($element, attr) {
            var fn = $parse(attr.ganttRightClick);

            return function(scope, element) {
                element.on('contextmenu', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event: event});
                    });
                });
            };
        }
    };
}]);

gantt.directive('ganttRow', ['GanttEvents', 'GANTT_EVENTS', function(Events, GANTT_EVENTS) {
    return {
        restrict: 'E',
        require: '^ganttBody',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.row.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.row.$element = $element;

            $element.bind('mousedown', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_MOUSEDOWN, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('mouseup', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_MOUSEUP, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('click', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_CLICKED, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('dblclick', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_DBL_CLICKED, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('contextmenu', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_CONTEXTMENU, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });


        }]
    };
}]);


gantt.directive('ganttRowHeader', ['GanttEvents', 'GANTT_EVENTS', function(Events, GANTT_EVENTS) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.rowHeader.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $element.bind('mousedown', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_HEADER_MOUSEDOWN, {evt: evt});
            });

            $element.bind('mouseup', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_HEADER_MOUSEUP, {evt: evt});
            });

            $element.bind('click', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_HEADER_CLICKED, {evt: evt});
            });

            $element.bind('dblclick', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_HEADER_DBL_CLICKED, {evt: evt});
            });

            $element.bind('contextmenu', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_HEADER_CONTEXTMENU, {evt: evt});
            });


        }]
    };
}]);


gantt.directive('ganttRowLabel', ['GanttEvents', 'GANTT_EVENTS', function(Events, GANTT_EVENTS) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.rowLabel.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $element.bind('mousedown', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_LABEL_MOUSEDOWN, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('mouseup', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_LABEL_MOUSEUP, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('click', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_LABEL_CLICKED, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('dblclick', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_LABEL_DBL_CLICKED, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });

            $element.bind('contextmenu', function(evt) {
                $scope.$emit(GANTT_EVENTS.ROW_LABEL_CONTEXTMENU, Events.buildRowEventData(evt, $element, $scope.row, $scope.gantt));
            });


        }]
    };
}]);


gantt.directive('ganttHorizontalScrollReceiver', function() {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: 'A',
        require: '^ganttScrollManager',
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.scrollManager.horizontal.push($element[0]);
        }]
    };
});

gantt.directive('ganttScrollManager', function() {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: 'A',
        require: '^gantt',
        controller: ['$scope', function($scope) {
            $scope.scrollManager = {
                horizontal: [],
                vertical: []
            };
        }]
    };
});


gantt.directive('ganttScrollSender', ['$timeout', 'ganttDebounce', 'GANTT_EVENTS', function($timeout, debounce, GANTT_EVENTS) {
    // Updates the element which are registered for the horizontal or vertical scroll event

    return {
        restrict: 'A',
        require: '^ganttScrollManager',
        controller: ['$scope', '$element', function($scope, $element) {
            var el = $element[0];
            var updateListeners = function() {
                var i, l;

                for (i = 0, l = $scope.scrollManager.vertical.length; i < l; i++) {
                    var vElement = $scope.scrollManager.vertical[i];
                    if (vElement.style.top !== -el.scrollTop) {
                        vElement.style.top = -el.scrollTop + 'px';
                        vElement.style.height = el.scrollHeight + 'px';
                    }
                }

                for (i = 0, l = $scope.scrollManager.horizontal.length; i < l; i++) {
                    var hElement = $scope.scrollManager.horizontal[i];
                    if (hElement.style.left !== -el.scrollLeft) {
                        hElement.style.left = -el.scrollLeft + 'px';
                        hElement.style.width = el.scrollWidth + 'px';
                    }
                }
            };

            $element.bind('scroll', updateListeners);

            $scope.$on(GANTT_EVENTS.ROW_ADDED, debounce(function() {
                updateListeners();
            }, 5));

            $scope.$watch('gantt.width', function(newValue) {
                if (newValue === 0) {
                    $timeout(function() {
                        updateListeners();
                    }, 0, true);
                }
            });
        }]
    };
}]);


gantt.directive('ganttScrollable', ['GanttScrollable', 'ganttDebounce', 'ganttLayout', 'GANTT_EVENTS', function(Scrollable, debounce, layout, GANTT_EVENTS) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.scrollable.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.template.scrollable = new Scrollable($element);

            var scrollBarWidth = layout.getScrollBarWidth();
            var lastScrollLeft;

            $element.bind('scroll', debounce(function() {
                var el = $element[0];
                var direction;
                var date;

                if (el.scrollLeft < lastScrollLeft && el.scrollLeft === 0) {
                    direction = 'left';
                    date = $scope.gantt.from;
                } else if (el.scrollLeft > lastScrollLeft && el.offsetWidth + el.scrollLeft >= el.scrollWidth - 1) {
                    direction = 'right';
                    date = $scope.gantt.to;
                }

                lastScrollLeft = el.scrollLeft;

                if (date !== undefined) {
                    $scope.autoExpandColumns(el, date, direction);
                    $scope.$emit(GANTT_EVENTS.SCROLL, {left: el.scrollLeft, date: date, direction: direction});
                } else {
                    $scope.$emit(GANTT_EVENTS.SCROLL, {left: el.scrollLeft});
                }
            }, 5));

            $scope.$watch('gantt.columns.length', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue) && newValue > 0 && $scope.gantt.scrollAnchor !== undefined) {
                    // Ugly but prevents screen flickering (unlike $timeout)
                    $scope.$$postDigest(function() {
                        $scope.scrollToDate($scope.gantt.scrollAnchor);
                    });
                }
            });



            $scope.getScrollableCss = function() {
                var css = {};

                if ($scope.ganttElementWidth - ($scope.showLabelsColumn ? $scope.labelsWidth : 0) > $scope.gantt.width + scrollBarWidth) {
                    css.width = $scope.gantt.width + scrollBarWidth + 'px';
                }

                if ($scope.maxHeight > 0) {
                    css['max-height'] = $scope.maxHeight - $scope.template.header.getHeight() + 'px';
                    css['overflow-y'] = 'auto';
                } else {
                    css['overflow-y'] = 'hidden';
                }

                return css;
            };


        }]
    };
}]);


gantt.directive('ganttVerticalScrollReceiver', function() {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: 'A',
        require: '^ganttScrollManager',
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.scrollManager.vertical.push($element[0]);
        }]
    };
});

gantt.directive('ganttElementWidthListener', [function() {
    // Updates the limit filters if the user scrolls the gantt chart

    return {
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
            var scopeVariable = $attrs.ganttElementWidthListener;
            if (scopeVariable === '') {
                scopeVariable = 'ganttElementWidth';
            }

            var effectiveScope = $scope;

            while(scopeVariable.indexOf('$parent.') === 0) {
                scopeVariable = scopeVariable.substring('$parent.'.length);
                effectiveScope = $scope.$parent;
            }

            effectiveScope.$watch(function() {
                effectiveScope[scopeVariable] = $element[0].offsetWidth;
            });
        }]
    };
}]);


gantt.service('ganttSortManager', [ function() {
    // Contains the row which the user wants to sort (the one he started to drag)

    return { startRow: undefined };
}]);

gantt.directive('ganttSortable', ['$document', 'ganttSortManager', function($document, sortManager) {
    // Provides the row sort functionality to any Gantt row
    // Uses the sortableState to share the current row

    return {
        restrict: 'E',
        template: '<div ng-transclude></div>',
        replace: true,
        transclude: true,
        scope: { row: '=ngModel', swap: '&', active: '=?' },
        controller: ['$scope', '$element', function($scope, $element) {
            $element.bind('mousedown', function() {
                if ($scope.active !== true) {
                    return;
                }

                enableDragMode();

                var disableHandler = function() {
                    $scope.$apply(function() {
                        angular.element($document[0].body).unbind('mouseup', disableHandler);
                        disableDragMode();
                    });
                };
                angular.element($document[0].body).bind('mouseup', disableHandler);
            });

            $element.bind('mousemove', function(e) {
                if (isInDragMode()) {
                    var elementBelowMouse = angular.element($document[0].elementFromPoint(e.clientX, e.clientY));
                    var targetRow = elementBelowMouse.controller('ngModel').$modelValue;

                    if (targetRow.id !== sortManager.startRow.id) {
                        $scope.$apply(function () {
                            $scope.swap({a: targetRow, b: sortManager.startRow});
                        });
                    }
                }
            });

            var isInDragMode = function() {
                return sortManager.startRow !== undefined && !angular.equals($scope.row, sortManager.startRow);
            };

            var enableDragMode = function() {
                sortManager.startRow = $scope.row;
                $element.css('cursor', 'move');
                angular.element($document[0].body).css({
                    '-moz-user-select': '-moz-none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'cursor': 'no-drop'
                });
            };

            var disableDragMode = function() {
                sortManager.startRow = undefined;
                $element.css('cursor', 'pointer');
                angular.element($document[0].body).css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': '',
                    'cursor': 'auto'
                });
            };
        }]
    };
}]);

gantt.directive('ganttBounds', [function() {
    // Displays a box representing the earliest allowable start time and latest completion time for a job

    return {
        restrict: 'E',
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.bounds.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        scope: { task: '=ngModel' },
        controller: ['$scope', function($scope) {
            var css = {};

            if (!$scope.task.hasBounds()) {
                $scope.visible = false;
            }

            $scope.getCss = function() {
                if ($scope.task.hasBounds()) {
                    css.width = $scope.task.bounds.width + 'px';

                    if ($scope.task.isMilestone === true || $scope.task.width === 0) {
                        css.left = ($scope.task.bounds.left - ($scope.task.left - 0.3)) + 'px';
                    } else {
                        css.left = ($scope.task.bounds.left - $scope.task.left) + 'px';
                    }
                }

                return css;
            };

            $scope.getClass = function() {
                if ($scope.task.est === undefined || $scope.task.lct === undefined) {
                    return 'gantt-task-bounds-in';
                } else if ($scope.task.est > $scope.task.from) {
                    return 'gantt-task-bounds-out';
                }
                else if ($scope.task.lct < $scope.task.to) {
                    return 'gantt-task-bounds-out';
                }
                else {
                    return 'gantt-task-bounds-in';
                }
            };

            $scope.$watch('task.isMouseOver', function() {
                if ($scope.task.hasBounds() && !$scope.task.isMoving) {
                    $scope.visible = !($scope.task.isMouseOver === undefined || $scope.task.isMouseOver === false);
                }
            });

            $scope.$watch('task.isMoving', function(newValue) {
                if ($scope.task.hasBounds()) {
                    $scope.visible = newValue === true;
                }
            });
        }]
    };
}]);


gantt.directive('ganttTaskProgress', [function() {
    return {
        restrict: 'E',
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.taskProgress.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        scope: { progress: '=' },
        controller: ['$scope', function($scope) {
            $scope.getCss = function() {
                var css = {};

                if ($scope.progress.color) {
                    css['background-color'] = $scope.progress.color;
                } else {
                    css['background-color'] = '#6BC443';
                }

                css.width = $scope.progress.percent + '%';

                return css;
            };
        }]
    };
}]);


gantt.directive('ganttTask', ['$window', '$document', '$timeout', '$filter', 'ganttSmartEvent', 'ganttDebounce', 'ganttMouseOffset', 'ganttMouseButton', 'GanttEvents', 'GANTT_EVENTS', function($window, $document, $timeout, $filter, smartEvent, debounce, mouseOffset, mouseButton, Events, GANTT_EVENTS) {

    return {
        restrict: 'E',
        require: '^ganttRow',
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.task.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {
            var resizeAreaWidthBig = 5;
            var resizeAreaWidthSmall = 3;
            var scrollSpeed = 15;
            var scrollTriggerDistance = 5;

            var windowElement = angular.element($window);
            var ganttRowElement = $scope.row.$element;
            var ganttBodyElement = $scope.template.body.$element;
            var ganttScrollElement = $scope.template.scrollable.$element;

            var taskHasBeenChanged = false;
            var mouseOffsetInEm;
            var moveStartX;
            var scrollInterval;

            $element.bind('mousedown', function(evt) {
                $scope.$apply(function() {
                    var mode = getMoveMode(evt);
                    if (mode !== '' && mouseButton.getButton(evt) === 1) {
                        var offsetX = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt).x;
                        enableMoveMode(mode, offsetX, evt);
                    }
                });
            });

            $element.bind('click', function(evt) {
                $scope.$apply(function() {
                    // Only raise click event if there was no task update event
                    if (!taskHasBeenChanged) {
                        $scope.$emit(GANTT_EVENTS.TASK_CLICKED, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                    }

                    evt.stopPropagation();
                });
            });

            $element.bind('dblclick', function(evt) {
                $scope.$apply(function() {
                    // Only raise dbl click event if there was no task update event
                    if (!taskHasBeenChanged) {
                        $scope.$emit(GANTT_EVENTS.TASK_DBL_CLICKED, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                    }

                    evt.stopPropagation();
                });
            });

            $element.bind('contextmenu', function(evt) {
                $scope.$apply(function() {
                    // Only raise click event if there was no task update event
                    if (!taskHasBeenChanged) {
                        $scope.$emit(GANTT_EVENTS.TASK_CONTEXTMENU, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                    }

                    evt.stopPropagation();
                });
            });

            $element.bind('mousemove', debounce(function(e) {
                var mode = getMoveMode(e);
                if (mode !== '' && ($scope.task.isMoving || mode !== 'M')) {
                    $element.css('cursor', getCursor(mode));
                } else {
                    $element.css('cursor', '');
                }

                $scope.task.mouseX = e.clientX;
            }, 5));

            $element.bind('mouseenter', function(e) {
                $scope.$apply(function() {
                    $scope.task.mouseX = e.clientX;
                    $scope.task.isMouseOver = true;
                });
            });

            $element.bind('mouseleave', function() {
                $scope.$apply(function() {
                    $scope.task.isMouseOver = false;
                });
            });

            var handleMove = function(mode, evt) {
                if ($scope.task.isMoving === false) {
                    return;
                }

                moveTask(mode, evt);
                scrollScreen(mode, evt);
            };

            var moveTask = function(mode, evt) {
                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                $scope.task.mouseOffsetX = mousePos.x;
                var x = mousePos.x;
                if (mode === 'M') {
                    if ($scope.allowTaskRowSwitching) {
                        var targetRow = getRowByY(mousePos.y);
                        if (targetRow !== undefined && $scope.task.row.id !== targetRow.id) {
                            targetRow.moveTaskToRow($scope.task);
                        }
                    }

                    if ($scope.allowTaskMoving) {
                        x = x - mouseOffsetInEm;
                        if ($scope.taskOutOfRange !== 'truncate') {
                            if (x < 0) {
                                x = 0;
                            } else if (x + $scope.task.width >= $scope.gantt.width) {
                                x = $scope.gantt.width - $scope.task.width;
                            }
                        }
                        $scope.task.moveTo(x);
                        $scope.$emit(GANTT_EVENTS.TASK_MOVE, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                    }
                } else if (mode === 'E') {
                    if ($scope.taskOutOfRange !== 'truncate') {
                        if (x < $scope.task.left) {
                            x = $scope.task.left;
                        } else if (x > $scope.gantt.width) {
                            x = $scope.gantt.width;
                        }
                    }
                    $scope.task.setTo(x);
                    $scope.$emit(GANTT_EVENTS.TASK_RESIZE, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                } else {
                    if ($scope.taskOutOfRange !== 'truncate') {
                        if (x > $scope.task.left + $scope.task.width) {
                            x = $scope.task.left + $scope.task.width;
                        } else if (x < 0) {
                            x = 0;
                        }
                    }
                    $scope.task.setFrom(x);
                    $scope.$emit(GANTT_EVENTS.TASK_RESIZE, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                }

                taskHasBeenChanged = true;
            };

            var scrollScreen = function(mode, evt) {
                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                var leftScreenBorder = ganttScrollElement[0].scrollLeft;
                var keepOnScrolling = false;

                if (mousePos.x < moveStartX) {
                    // Scroll to the left
                    if (mousePos.x <= leftScreenBorder + scrollTriggerDistance) {
                        mousePos.x -= scrollSpeed;
                        keepOnScrolling = true;
                        $scope.scrollToLeft(scrollSpeed);
                    }
                } else {
                    // Scroll to the right
                    var screenWidth = ganttScrollElement[0].offsetWidth;
                    var rightScreenBorder = leftScreenBorder + screenWidth;

                    if (mousePos.x >= rightScreenBorder - scrollTriggerDistance) {
                        mousePos.x += scrollSpeed;
                        keepOnScrolling = true;
                        $scope.scrollToRight(scrollSpeed);
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

            var getRowByY = function(y) {
                if (y >= ganttRowElement[0].offsetTop && y <= ganttRowElement[0].offsetTop + ganttRowElement[0].offsetHeight) {
                    return $scope.task.row;
                } else {
                    var visibleRows = [];
                    angular.forEach($scope.task.row.gantt.rows, function(row) {
                        if (!row.hidden) {
                            visibleRows.push(row);
                        }
                    });
                    var rowHeight = ganttBodyElement[0].offsetHeight / visibleRows.length;
                    var pos = Math.floor(y / rowHeight);
                    return visibleRows[pos];
                }
            };

            var getMoveMode = function(e) {
                var x = mouseOffset.getOffset(e).x;

                var distance = 0;

                // Define resize&move area. Make sure the move area does not get too small.
                if ($scope.allowTaskResizing) {
                    distance = $element[0].offsetWidth < 10 ? resizeAreaWidthSmall : resizeAreaWidthBig;
                }

                if ($scope.allowTaskResizing && x > $element[0].offsetWidth - distance) {
                    return 'E';
                } else if ($scope.allowTaskResizing && x < distance) {
                    return 'W';
                } else if (($scope.allowTaskMoving || $scope.allowTaskRowSwitching) && x >= distance && x <= $element[0].offsetWidth - distance) {
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

            var enableMoveMode = function(mode, x, evt) {
                // Raise task move start event
                if (!$scope.task.isMoving) {
                    if (mode === 'M') {
                        $scope.$emit(GANTT_EVENTS.TASK_MOVE_BEGIN, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                    } else {
                        $scope.$emit(GANTT_EVENTS.TASK_RESIZE_BEGIN, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                    }
                }

                // Init task move
                taskHasBeenChanged = false;
                $scope.task.moveMode = mode;
                $scope.task.isMoving = true;
                moveStartX = x;
                mouseOffsetInEm = x - $scope.task.modelLeft;

                // Add move event handlers
                var taskMoveHandler = debounce(function(evt) {
                    if ($scope.task.isMoving) {
                        // As this function is defered, disableMoveMode may have been called before.
                        // Without this check, TASK_CHANGED event is not fired for faster moves.
                        // See github issue #190
                        clearScrollInterval();
                        handleMove(mode, evt);
                    }
                }, 5);
                smartEvent($scope, windowElement, 'mousemove', taskMoveHandler).bind();

                smartEvent($scope, windowElement, 'mouseup', function(evt) {
                    $scope.$apply(function() {
                        windowElement.unbind('mousemove', taskMoveHandler);
                        disableMoveMode(evt);
                    });
                }).bindOnce();

                // Show mouse move/resize cursor
                $element.css('cursor', getCursor(mode));
                angular.element($document[0].body).css({
                    '-moz-user-select': '-moz-none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'cursor': getCursor(mode)
                });
            };

            var disableMoveMode = function(evt) {
                $scope.task.isMoving = false;

                // Stop any active auto scroll
                clearScrollInterval();

                // Set mouse cursor back to default
                $element.css('cursor', '');
                angular.element($document[0].body).css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': '',
                    'cursor': ''
                });

                // Raise move end event
                if ($scope.task.moveMode === 'M') {
                    $scope.$emit(GANTT_EVENTS.TASK_MOVE_END, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                } else {
                    $scope.$emit(GANTT_EVENTS.TASK_RESIZE_END, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                }

                $scope.task.moveMode = undefined;

                // Raise task changed event
                if (taskHasBeenChanged === true) {
                    taskHasBeenChanged = false;
                    $scope.task.row.sortTasks(); // Sort tasks so they have the right z-order
                    $scope.$emit(GANTT_EVENTS.TASK_CHANGED, Events.buildTaskEventData(evt, $element, $scope.task, $scope.gantt));
                }
            };

            if ($scope.task.isCreating) {
                delete $scope.task.isCreating;
                enableMoveMode('E', $scope.task.mouseOffsetX);
            } else if ($scope.task.isMoving) {
                // In case the task has been moved to another row a new controller is is created by angular.
                // Enable the move mode again if this was the case.
                enableMoveMode('M', $scope.task.mouseOffsetX);
            }
        }]
    };
}]);


gantt.directive('ganttTooltip', ['$timeout', '$document', 'ganttDebounce', 'ganttSmartEvent', function($timeout, $document, debounce, smartEvent) {
    // This tooltip displays more information about a task

    return {
        restrict: 'E',
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.tooltip.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        controller: ['$scope', '$element', function($scope, $element) {
            var bodyElement = angular.element($document[0].body);
            var parentElement = $element.parent();
            $scope.visible = false;
            $scope.css = {};

            $scope.$watch('task.isMouseOver', function(newValue) {
                if (newValue === true) {
                    showTooltip($scope.task.mouseX);
                } else if (newValue === false && $scope.task.isMoving === false) {
                    hideTooltip();
                }
            });

            var mouseMoveHandler = smartEvent($scope, bodyElement, 'mousemove', debounce(function(e) {
                if ($scope.visible === true) {
                    updateTooltip(e.clientX);
                } else {
                    showTooltip(e.clientX);
                }
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
                $element.removeClass('gantt-task-infoArrow');
                $element.removeClass('gantt-task-infoArrowR');

                // Check if info is overlapping with view port
                if (x + $element[0].offsetWidth > getViewPortWidth()) {
                    $scope.css.left = (x + 20 - $element[0].offsetWidth) + 'px';
                    $element.addClass('gantt-task-infoArrowR'); // Right aligned info
                } else {
                    $scope.css.left = (x - 20) + 'px';
                    $element.addClass('gantt-task-infoArrow');
                }
            };

            var hideTooltip = function() {
                $scope.css.opacity = 0;
                $scope.visible = false;
            };
        }]
    };
}]);


gantt.directive('ganttBody', [function() {
    return {
        restrict: 'E',
        require: '^gantt',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.body.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', 'GanttBody', function($scope, $element, Body) {
            $scope.template.body = new Body($element);
        }]
    };
}]);


gantt.directive('ganttBodyColumns', [function() {
    return {
        restrict: 'E',
        require: '^ganttBody',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.bodyColumns.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', 'GanttBodyColumns', function($scope, $element, BodyColumns) {
            $scope.template.body.columns = new BodyColumns($element);
        }]
    };
}]);


gantt.directive('ganttBodyRows', [function() {
    return {
        restrict: 'E',
        require: '^ganttBody',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.bodyRows.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', 'GanttBodyRows', function($scope, $element, BodyRows) {
            $scope.template.body.rows = new BodyRows($element);
        }]
    };
}]);


gantt.directive('ganttColumn', [function() {
    return {
        restrict: 'E',
        require: '^ganttBodyColumns',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.column.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.column.$element = $element;
        }]
    };
}]);


gantt.directive('ganttColumnHeader', ['GanttEvents', 'GANTT_EVENTS', function(Events, GANTT_EVENTS) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.columnHeader.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $element.bind('click', function(evt) {
                $scope.$emit(GANTT_EVENTS.COLUMN_CLICKED, Events.buildColumnEventData(evt, $element, $scope.column));
            });

            $element.bind('dblclick', function(evt) {
                $scope.$emit(GANTT_EVENTS.COLUMN_DBL_CLICKED, Events.buildColumnEventData(evt, $element, $scope.column));
            });

            $element.bind('contextmenu', function(evt) {
                $scope.$emit(GANTT_EVENTS.COLUMN_CONTEXTMENU, Events.buildColumnEventData(evt, $element, $scope.column));
            });
        }]
    };
}]);


gantt.directive('ganttHeader', [function() {
    return {
        restrict: 'E',
        require: '^gantt',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.header.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', 'GanttHeader', function($scope, $element, Header) {
            $scope.template.header = new Header($element);

            $scope.getHeaderCss = function() {
                var css = {};

                if ($scope.ganttElementWidth - ($scope.showLabelsColumn ? $scope.labelsWidth : 0) > $scope.gantt.width) {
                    css.width = $scope.gantt.width + 'px';
                }

                return css;
            };
        }]
    };
}]);


gantt.directive('ganttHeaderColumns', [function() {
    return {
        restrict: 'E',
        require: '^ganttHeader',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.headerColumns.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', 'GanttHeaderColumns', function($scope, $element, HeaderColumns) {
            $scope.template.header.columns = new HeaderColumns($element);
        }]
    };
}]);


gantt.directive('ganttLabels', [function() {
    return {
        restrict: 'E',
        require: '^gantt',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.labels.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', 'GanttLabels', function($scope, $element, Labels) {
            $scope.template.labels = new Labels($element);
        }]
    };
}]);


gantt.directive('ganttTimeFrame', [function() {
    return {
        restrict: 'E',
        require: '^ganttColumn',
        transclude: true,
        replace: true,
        templateUrl: function(tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return 'template/default.timeFrame.tmpl.html';
            } else {
                return tAttrs.templateUrl;
            }
        },
        controller: ['$scope', '$element', function($scope, $element) {
            $scope.timeFrame.$element = $element;
        }]
    };
}]);


gantt.factory('ganttDebounce', ['$timeout', function($timeout) {
    function debounce(fn, timeout, invokeApply) {
        var nthCall = 0;
        return function() {
            var self = this;
            var argz = arguments;
            nthCall++;
            var later = (function(version) {
                return function() {
                    if (version === nthCall) {
                        return fn.apply(self, argz);
                    }
                };
            })(nthCall);
            return $timeout(later, timeout, invokeApply === undefined ? true: invokeApply);
        };
    }

    return debounce;
}]);

gantt.service('ganttEnableNgAnimate', ['$injector', function($injector) {
    var ngAnimate;
    try {
        ngAnimate = $injector.get('$animate');
    } catch (e) {
    }

    if (ngAnimate !== undefined) {
        return function(enabled, element) {
            ngAnimate.enabled(false, element);
        };
    } else {
        return function() {};
    }


}]);


gantt.service('ganttLayout', ['$document', function($document) {
    return {
        /**
         * Compute the width of scrollbar.
         *
         * @returns {number} width of the scrollbar, in px.
         */
        getScrollBarWidth: function() {
            var inner = $document[0].createElement('p');
            inner.style.width = '100%';
            inner.style.height = '200px';

            var outer = $document[0].createElement('div');
            outer.style.position = 'absolute';
            outer.style.top = '0px';
            outer.style.left = '0px';
            outer.style.visibility = 'hidden';
            outer.style.width = '200px';
            outer.style.height = '150px';
            outer.style.overflow = 'hidden';
            outer.appendChild (inner);

            $document[0].body.appendChild (outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 === w2) {
                w2 = outer.clientWidth;
            }
            $document[0].body.removeChild (outer);

            return (w1 - w2);
        }
    };
}]);


gantt.service('ganttMouseButton', [ function() {
    // Mouse button cross browser normalization

    return {
        getButton: function(e) {
            e = e || window.event;

            if (!e.which) {
                return e.button < 2 ? 1 : e.button === 4 ? 2 : 3;
            } else {
                return e.which;
            }
        }
    };
}]);

gantt.service('ganttMouseOffset', [ function() {
    // Mouse offset support for lesser browsers (read IE 8)

    return {
        getOffset: function(evt) {
            if (evt.offsetX && evt.offsetY) {
                return { x: evt.offsetX, y: evt.offsetY };
            }
            if (evt.layerX && evt.layerY) {
                return { x: evt.layerX, y: evt.layerY };
            } else {
                return this.getOffsetForElement(evt.target, evt);
            }
        },
        getOffsetForElement: function(el, evt) {
            var bb = el.getBoundingClientRect();
            return { x: evt.clientX - bb.left, y: evt.clientY - bb.top };
        }
    };
}]);

gantt.factory('ganttSmartEvent', [function() {
    // Auto released the binding when the scope is destroyed. Use if an event is registered on another element than the scope.

    function smartEvent($scope, $element, event, fn) {
        $scope.$on('$destroy', function() {
            $element.unbind(event, fn);
        });

        return {
            bindOnce: function() {
                $element.one(event, fn);
            },
            bind: function() {
                $element.bind(event, fn);
            },
            unbind: function() {
                $element.unbind(event, fn);
            }
        };
    }

    return smartEvent;
}]);
angular.module('ganttTemplates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('template/default.gantt.tmpl.html',
        '<div class="gantt unselectable" gantt-scroll-manager gantt-element-width-listener>\n' +
        '    <gantt-labels>\n' +
        '        <div class="gantt-labels-header">\n' +
        '            <gantt-row-header></gantt-row-header>\n' +
        '        </div>\n' +
        '        <div class="gantt-labels-body"\n' +
        '             ng-style="(maxHeight > 0 && {\'max-height\': (maxHeight-template.header.getHeight())+\'px\'} || {})"\n' +
        '             ng-show="gantt.columns.length > 0">\n' +
        '            <div gantt-vertical-scroll-receiver style="position: relative">\n' +
        '                <gantt-row-label ng-repeat="row in gantt.visibleRows track by $index">\n' +
        '                    <gantt-sortable swap="swapRows(a,b)" active="allowRowSorting" ng-model="row">\n' +
        '                        <span>{{ row.name }}</span>\n' +
        '                    </gantt-sortable>\n' +
        '                </gantt-row-label>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </gantt-labels>\n' +
        '    <gantt-header>\n' +
        '        <gantt-header-columns>\n' +
        '            <div ng-repeat="header in gantt.visibleHeaders">\n' +
        '                <div class="gantt-header-row gantt-header-row-bottom">\n' +
        '                    <gantt-column-header ng-repeat="column in header track by $index">\n' +
        '                        {{ column.label }}\n' +
        '                    </gantt-column-header>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </gantt-header-columns>\n' +
        '    </gantt-header>\n' +
        '    <gantt-scrollable>\n' +
        '        <gantt-body>\n' +
        '            <div class="gantt-body-background">\n' +
        '                <div class="gantt-row-height"\n' +
        '                     ng-class-odd="\'gantt-background-row\'"\n' +
        '                     ng-class-even="\'gantt-background-row-alt\'"\n' +
        '                     ng-repeat="row in gantt.visibleRows track by $index">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="gantt-body-foreground">\n' +
        '                <div class="gantt-current-date-line" ng-if="currentDate === \'line\' && currentDatePosition >= 0 && currentDatePosition <= gantt.width" ng-style="{\'left\': currentDatePosition + \'px\' }"></div>\n' +
        '            </div>\n' +
        '            <gantt-body-columns class="gantt-body-columns">\n' +
        '                <gantt-column ng-repeat="column in gantt.visibleColumns track by $index">\n' +
        '                    <gantt-time-frame ng-repeat="timeFrame in column.visibleTimeFrames"></gantt-time-frame>\n' +
        '                </gantt-column>\n' +
        '            </gantt-body-columns>\n' +
        '            <gantt-body-rows>\n' +
        '                <div class="gantt-timespan"\n' +
        '                     ng-style="{\'left\': ((timespan.left-0.3) || timespan.left)+\'px\', \'width\': timespan.width +\'px\', \'z-index\': (timespan.priority || 0)}"\n' +
        '                     ng-class="timespan.classes"\n' +
        '                     ng-repeat="timespan in gantt.timespans">\n' +
        '                    <gantt-tooltip ng-model="timespan" date-format="\'MMM d\'">\n' +
        '                        <div class="gantt-task-content"><span>{{ timespan.name }}</span></div>\n' +
        '                    </gantt-tooltip>\n' +
        '                </div>\n' +
        '                <gantt-row ng-repeat="row in gantt.visibleRows track by row.id">\n' +
        '                    <gantt-task ng-repeat="task in row.visibleTasks track by task.id"></gantt-task>\n' +
        '                </gantt-row>\n' +
        '            </gantt-body-rows>\n' +
        '        </gantt-body>\n' +
        '    </gantt-scrollable>\n' +
        '\n' +
        '\n' +
        '    <!--\n' +
        '    ******* Inline templates *******\n' +
        '    You can specify your own templates by either changing the default ones below or by\n' +
        '    adding an attribute template-url="<url to your template>" on the specific element.\n' +
        '    -->\n' +
        '\n' +
        '    <!-- Body template -->\n' +
        '    <script type="text/ng-template" id="template/default.body.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body"\n' +
        '             ng-style="{\'width\': gantt.width +\'px\'}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Header template -->\n' +
        '    <script type="text/ng-template" id="template/default.header.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-header"\n' +
        '             ng-show="gantt.columns.length > 0 && gantt.getActiveHeadersCount() > 0"\n' +
        '             ng-style="getHeaderCss()"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row label template -->\n' +
        '    <script type="text/ng-template" id="template/default.rowLabel.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-labels-row gantt-row-height"\n' +
        '             ng-class-odd="\'gantt-background-row\'"\n' +
        '             ng-class-even="\'gantt-background-row-alt\'">\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row header template -->\n' +
        '    <script type="text/ng-template" id="template/default.rowHeader.tmpl.html">\n' +
        '        <div class="gantt-labels-header-row"\n' +
        '             ng-show="gantt.columns.length > 0 && gantt.getActiveHeadersCount() > 0"\n' +
        '             ng-style="{\'margin-top\': ((gantt.getActiveHeadersCount()-1)*2)+\'em\'}">\n' +
        '            <span>Name</span>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Labels template -->\n' +
        '    <script type="text/ng-template" id="template/default.labels.tmpl.html">\n' +
        '        <div ng-transclude ng-if="showLabelsColumn" class="gantt-labels"\n' +
        '             ng-style="(labelsWidth > 0 && {\'width\': labelsWidth+\'px\'} || {})"\n' +
        '             gantt-labels-resize="$parent.allowLabelsResizing"\n' +
        '             gantt-labels-resize-width="$parent.labelsWidth"\n' +
        '             gantt-labels-resize-min-width="50"\n' +
        '             gantt-element-width-listener="$parent.labelsWidth"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Header columns template -->\n' +
        '    <script type="text/ng-template" id="template/default.headerColumns.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-header-columns"\n' +
        '              gantt-horizontal-scroll-receiver></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/default.columnHeader.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-column-header"\n' +
        '              ng-style="{\'left\': column.left+\'px\', \'width\': column.width+\'px\'}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Body columns template -->\n' +
        '    <script type="text/ng-template" id="template/default.bodyColumns.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-columns"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/default.column.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-column"\n' +
        '             ng-class="(column.currentDate && currentDate === \'column\') && \'gantt-foreground-col-current-date\' || \'gantt-foreground-col\'"\n' +
        '             ng-style="{\'left\': column.left+\'px\', \'width\': column.width+\'px\'}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <script type="text/ng-template" id="template/default.timeFrame.tmpl.html">\n' +
        '        <div class="gantt-timeframe"\n' +
        '             ng-class="timeFrame.working && \'gantt-timeframe-working\' || \'gantt-timeframe-non-working\'"\n' +
        '             ng-style="{\'left\': timeFrame.left + \'px\', \'width\': timeFrame.width + \'px\'}"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Scrollable template -->\n' +
        '    <script type="text/ng-template" id="template/default.scrollable.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-scrollable" gantt-scroll-sender gantt-limit-updater\n' +
        '             ng-style="getScrollableCss()"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Rows template -->\n' +
        '    <script type="text/ng-template" id="template/default.bodyRows.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-body-rows"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task template -->\n' +
        '    <script type="text/ng-template" id="template/default.task.tmpl.html">\n' +
        '        <div ng-class="(task.isMilestone === true && [\'gantt-task-milestone\'] || [\'gantt-task\']).concat(task.classes)"\n' +
        '             ng-style="{\'left\': ((task.isMilestone === true || task.width === 0) && (task.left-0.3) || task.left)+\'px\', \'width\': task.width +\'px\', \'z-index\': (task.isMoving === true && 1  || task.priority || \'\'), \'background-color\': task.color}">\n' +
        '            <gantt-bounds ng-if="task.bounds !== undefined" ng-model="task"></gantt-bounds>\n' +
        '            <gantt-tooltip ng-if="showTooltips && (task.isMouseOver || task.isMoving)" ng-model="task"></gantt-tooltip>\n' +
        '            <div ng-if="task.truncatedLeft" class="gantt-task-truncated-left"><span>&lt;</span></div>\n' +
        '            <div class="gantt-task-content"><span>{{ (task.isMilestone === true && \'&nbsp;\' || task.name) }}</span></div>\n' +
        '            <div ng-if="task.truncatedRight" class="gantt-task-truncated-right"><span>&gt;</span></div>\n' +
        '            <gantt-task-progress ng-if="task.progress !== undefined" progress="task.progress"></gantt-task-progress>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Tooltip template -->\n' +
        '    <script type="text/ng-template" id="template/default.tooltip.tmpl.html">\n' +
        '        <div class="gantt-task-info" ng-style="css">\n' +
        '            <div class="gantt-task-info-content">\n' +
        '                {{ task.name }}</br>\n' +
        '                <small>\n' +
        '                    {{\n' +
        '                    task.isMilestone === true && (task.getFromLabel()) || (task.getFromLabel() + \' - \' + task.getToLabel());\n' +
        '                    }}\n' +
        '                </small>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task bounds template -->\n' +
        '    <script type="text/ng-template" id="template/default.bounds.tmpl.html">\n' +
        '        <div ng-show=\'visible\' class=\'gantt-task-bounds\'\n' +
        '             ng-style=\'getCss()\' ng-class=\'getClass()\'></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Task progress template -->\n' +
        '    <script type="text/ng-template" id="template/default.taskProgress.tmpl.html">\n' +
        '        <div class=\'gantt-task-progress\' ng-style="getCss()" ng-class="progress.classes"></div>\n' +
        '    </script>\n' +
        '\n' +
        '    <!-- Row template -->\n' +
        '    <script type="text/ng-template" id="template/default.row.tmpl.html">\n' +
        '        <div ng-transclude class="gantt-row gantt-row-height"></div>\n' +
        '    </script>\n' +
        '\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt.js.map