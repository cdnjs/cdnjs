/*
 Project: angular-gant for AngularJS
 Author: Marco Schweighauser (2014)
 License: MIT License. See README.md
 */

var gantt = angular.module('gantt', []);

gantt.directive('gantt', ['Gantt', 'dateFunctions', 'mouseOffset', 'debounce', 'keepScrollPos', function (Gantt, df, mouseOffset, debounce, keepScrollPos) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "template/gantt.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },
        scope: {
            sortMode: "=?", // Possible modes: 'name', 'date', 'custom'
            viewScale: "=?", // Possible scales: 'hour', 'day', 'week', 'month'
            width: "=?", // Defines the preferred width of gantt. If defined, columns will be resized accordingly.
            columnWidth: "=?", // Defines the size of a column, 1 being 1em per unit (hour or day, .. depending on scale),
            columnSubScale: "=?", // Defines how precise tasks should be positioned inside columns. 4 = in quarter steps, 2 = in half steps, ... Use values higher than 24 or 60 (hour view) to display them very accurate. Default (4)
            allowTaskMoving: "=?", // Set to true if tasks should be moveable by the user.
            allowTaskResizing: "=?", // Set to true if tasks should be resizable by the user.
            allowTaskRowSwitching: "=?", // If false then tasks can be moved inside their current row only. The user can not move it to another row.
            allowRowSorting: "=?", // Set to true if the user should be able to re-order rows.
            allowLabelsResizing: "=?", // Set to true if the user should be able to resize the label section.
            fromDate: "=?", // If not specified will use the earliest task date (note: as of now this can only expand not shrink)
            toDate: "=?", // If not specified will use the latest task date (note: as of now this can only expand not shrink)
            currentDateValue: "=?", // If specified, the current date will be displayed
            currentDate: "=?", // The display of currentDate ('none', 'line' or 'column').
            firstDayOfWeek: "=?", // 0=Sunday, 1=Monday, ... Default (1)
            weekendDays: "=?", // Array of days: 0=Sunday, 1=Monday, ... Default ([0,6])
            showWeekends: "=?", // True if the weekends shall be displayed Default (true)
            workHours: "=?", // Array of valid work hours. Default ([8,9,..,16] equals a 8am - 17pm workday)
            showNonWorkHours: "=?", // True if the non work hours shall be displayed Default (true)
            autoExpand: "=?", // Set this both, left or right if the date range shall expand if the user scroll to the left or right end. Otherwise set to false or none.
            taskOutOfRange: "=?", // Set this to auto-expand or truncate to define the behavior of tasks going out of visible range.
            maxHeight: "=?", // Define the maximum height of the Gantt in PX. > 0 to activate max height behaviour.
            labelsWidth: "=?", // Define the width of the labels section. Changes when the user is resizing the labels width
            showTooltips: "=?", // True when tooltips shall be enabled. Default (true)
            timespans: "=?",
            data: "=?",
            loadTimespans: "&",
            loadData: "&",
            removeData: "&",
            clearData: "&",
            centerDate: "&",
            onColumnDateClicked: "&",
            onColumnDateDblClicked: "&",
            onColumnDataContextClicked: "&",
            onLabelsResized: "&",
            onLabelClicked: "&",
            onLabelDblClicked: "&",
            onLabelContextClicked: "&",
            onLabelHeaderClicked: "&",
            onLabelHeaderDblClicked: "&",
            onLabelHeaderContextClicked: "&",
            onGanttReady: "&",
            onTimespanAdded: "&",
            onTimespanUpdated: "&",
            onRowAdded: "&",
            onRowClicked: "&",
            onRowDblClicked: "&",
            onRowContextClicked: "&",
            onRowUpdated: "&",
            onRowMouseDown: "&",
            onScroll: "&",
            onTaskClicked: "&",
            onTaskDblClicked: "&",
            onTaskContextClicked: "&",
            onTaskUpdated: "&",
            onTaskMoveBegin: "&",
            onTaskMoveEnd: "&",
            onTaskResizeBegin: "&",
            onTaskResizeEnd: "&"
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            // Initialize defaults
            if ($scope.sortMode === undefined) $scope.sortMode = "name";
            if ($scope.viewScale === undefined) $scope.viewScale = "day";
            if ($scope.width === undefined) $scope.width = 0;
            if ($scope.columnWidth === undefined) $scope.columnWidth = 2;
            if ($scope.columnSubScale === undefined) $scope.columnSubScale = 4;
            if ($scope.allowTaskMoving === undefined) $scope.allowTaskMoving = true;
            if ($scope.allowTaskResizing === undefined) $scope.allowTaskResizing = true;
            if ($scope.allowTaskRowSwitching === undefined) $scope.allowTaskRowSwitching = true;
            if ($scope.allowRowSorting === undefined) $scope.allowRowSorting = true;
            if ($scope.allowLabelsResizing === undefined) $scope.allowLabelsResizing = true;
            if ($scope.currentDateValue === undefined) $scope.currentDateValue = new Date();
            if ($scope.currentDate === undefined) $scope.currentDate = "line";
            if ($scope.firstDayOfWeek === undefined) $scope.firstDayOfWeek = 1;
            if ($scope.weekendDays === undefined) $scope.weekendDays = [0,6];
            if ($scope.showWeekends === undefined) $scope.showWeekends = true;
            if ($scope.workHours === undefined) $scope.workHours = [8,9,10,11,12,13,14,15,16];
            if ($scope.showNonWorkHours === undefined) $scope.showNonWorkHours = true;
            if ($scope.maxHeight === undefined) $scope.maxHeight = 0;
            if ($scope.autoExpand === undefined) $scope.autoExpand = "none";
            if ($scope.taskOutOfRange === undefined) $scope.taskOutOfRange = "expand";
            if ($scope.labelsWidth === undefined) $scope.labelsWidth = 0;
            if ($scope.showTooltips === undefined) $scope.showTooltips = true;

            // Gantt logic
            $scope.gantt = new Gantt($scope.viewScale, $scope.autoExpand, $scope.taskOutOfRange, $scope.width, $scope.columnWidth, $scope.columnSubScale, $scope.firstDayOfWeek, $scope.weekendDays, $scope.showWeekends, $scope.workHours, $scope.showNonWorkHours);
            $scope.gantt.setDefaultDateRange($scope.fromDate, $scope.toDate);
            $scope.gantt.setCurrentDate($scope.currentDateValue);

            $scope.$watch("sortMode", function (newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.sortRows();
                }
            });

            $scope.$watch("timespans", function (newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.removeAllTimespans();
                    $scope.setTimespans(newValue);
                }
            });

            $scope.$watch("data", function (newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.removeAllData();
                    $scope.setData(newValue);
                }
            });

            // Add a watcher if a view related setting changed from outside of the Gantt. Update the gantt accordingly if so.
            // All those changes need a recalculation of the header columns
            $scope.$watch('viewScale+autoExpand+taskOutOfRange+width+labelsWidth+columnWidth+columnSubScale+firstDayOfWeek+weekendDays+showWeekends+workHours+showNonWorkHours', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.gantt.setViewScale($scope.viewScale, $scope.autoExpand, $scope.taskOutOfRange, $scope.width - $scope.labelsWidth / $scope.getPxToEmFactor(), $scope.columnWidth, $scope.columnSubScale, $scope.firstDayOfWeek, $scope.weekendDays, $scope.showWeekends, $scope.workHours, $scope.showNonWorkHours);
                    if (!$scope.gantt.reGenerateColumns()) {
                        // Re-generate failed, e.g. because there was no previous date-range. Try to apply the default range.
                        $scope.gantt.setDefaultDateRange($scope.fromDate, $scope.toDate);
                    }
                }
            });

            $scope.$watch('fromDate+toDate', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.gantt.setDefaultDateRange($scope.fromDate, $scope.toDate);
                }
            });

            $scope.$watch('currentDate+currentDateValue', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.gantt.setCurrentDate($scope.currentDateValue);
                }
            });

            $scope.getPxToEmFactor = function() {
                return $scope.ganttScroll.children()[0].offsetWidth / $scope.gantt.width;
            };

            // Swaps two rows and changes the sort order to custom to display the swapped rows
            $scope.swapRows = function (a, b) {
                $scope.gantt.swapRows(a, b);

                // Raise change events
                $scope.raiseRowUpdatedEvent(a, true);
                $scope.raiseRowUpdatedEvent(b, true);

                // Switch to custom sort mode and trigger sort
                if ($scope.sortMode !== "custom") {
                    $scope.sortMode = "custom"; // Sort will be triggered by the watcher
                } else {
                    $scope.sortRows();
                }
            };

            // Sort rows by the current sort mode
            $scope.sortRows = function () {
                $scope.gantt.sortRows($scope.sortMode);
            };

            // Scroll to the specified x
            $scope.scrollTo = function(x) {
                $scope.ganttScroll[0].scrollLeft = x;
                $scope.ganttScroll.triggerHandler('scroll');
            };

            // Scroll to the left side by specified x
            $scope.scrollLeft = function(x) {
                $scope.ganttScroll[0].scrollLeft -= x;
                $scope.ganttScroll.triggerHandler('scroll');
            };

            // Scroll to the right side by specified x
            $scope.scrollRight = function(x) {
                $scope.ganttScroll[0].scrollLeft += x;
                $scope.ganttScroll.triggerHandler('scroll');
            };

            // Tries to center the specified date
            $scope.scrollToDate = function(date) {
                var column = $scope.gantt.getColumnByDate(date);
                if (column !== undefined) {
                    var x = (column.left + column.width / 2) * $scope.getPxToEmFactor();
                    $scope.ganttScroll[0].scrollLeft = x - $scope.ganttScroll[0].offsetWidth/2;
                }
            };

            $scope.autoExpandColumns = keepScrollPos($scope, function(el, date, direction) {
                if ( $scope.autoExpand !== "both" && $scope.autoExpand !== true && $scope.autoExpand !== direction ){
                    return;
                }

                var from, to;
                var expandHour = 1, expandDay = 31;

                if (direction === "left") {
                    from = $scope.viewScale === "hour" ? df.addDays(date, -expandHour, true) : df.addDays(date, -expandDay, true);
                    to = date;
                } else {
                    from = date;
                    to =  $scope.viewScale === "hour" ? df.addDays(date, expandHour, true) : df.addDays(date, expandDay, true);
                }

                $scope.gantt.expandDefaultDateRange(from, to);
            });

            $scope.raiseColumnDateClickedEvent = function(evt, column) {
                $scope.onColumnDateClicked({ event: { evt: evt, column: column} });
            };

            $scope.raiseColumnDateDblClickedEvent = function(evt, column) {
                $scope.onColumnDateDblClicked({ event: { evt: evt, column: column} });
            };

            $scope.raiseColumnDateContextMenuEvent = function(evt, column) {
                $scope.onColumnDataContextClicked({ event: { evt: evt, column: column} });
            };

            $scope.raiseLabelsResized = function(width) {
                $scope.onLabelsResized({ event: { width: width } });
            };

            $scope.raiseLabelClickedEvent = function(evt, row) {
                $scope.onLabelClicked({ event: { evt: evt, row: row, userTriggered: true } });
            };

            $scope.raiseLabelDblClickedEvent = function(evt, row) {
                $scope.onLabelDblClicked({ event: { evt: evt, row: row, userTriggered: true } });
            };

            $scope.raiseLabelContextMenuEvent = function(evt, row) {
                $scope.onLabelContextClicked({ event: { evt: evt, row: row, userTriggered: true } });
            };

            $scope.raiseLabelHeaderClickedEvent = function(evt) {
                $scope.onLabelHeaderClicked({ event: { evt: evt, userTriggered: true } });
            };

            $scope.raiseLabelHeaderDblClickedEvent = function(evt) {
                $scope.onLabelHeaderDblClicked({ event: { evt: evt, userTriggered: true } });
            };

            $scope.raiseLabelHeaderContextMenuEvent = function(evt) {
                $scope.onLabelHeaderContextClicked({ event: { evt: evt, userTriggered: true } });
            };

            $scope.raiseRowAddedEvent = function(row, userTriggered) {
                $scope.onRowAdded({ event: { row: row, userTriggered: userTriggered } });
            };

            $scope.raiseDOMRowClickedEvent = function(e, row) {
                var x = mouseOffset.getOffset(e).x;
                var xInEm = x / $scope.getPxToEmFactor();
                var clickedColumn = $scope.gantt.getColumnByPosition(xInEm);
                var date = $scope.gantt.getDateByPosition(xInEm);

                $scope.raiseRowClickedEvent(e, row, clickedColumn, date);
            };

            $scope.raiseRowClickedEvent = function(evt, row, column, date) {
                $scope.onRowClicked({ event: { evt: evt, row: row, column: column.clone(), date: date, userTriggered: true } });
            };

            $scope.raiseDOMRowDblClickedEvent = function(e, row) {
                var x = mouseOffset.getOffset(e).x;
                var xInEm = x / $scope.getPxToEmFactor();
                var clickedColumn = $scope.gantt.getColumnByPosition(xInEm);
                var date = $scope.gantt.getDateByPosition(xInEm);

                $scope.raiseRowDblClickedEvent(e, row, clickedColumn, date);
            };

            $scope.raiseRowDblClickedEvent = function(evt, row, column, date) {
                $scope.onRowDblClicked({ event: { evt: evt, row: row, column: column.clone(), date: date, userTriggered: true } });
            };

            $scope.raiseDOMRowMouseDownEvent = function(e, row) {
                var x = mouseOffset.getOffset(e).x;
                var xInEm = x / $scope.getPxToEmFactor();
                var clickedColumn = $scope.gantt.getColumnByPosition(xInEm);
                var date = $scope.gantt.getDateByPosition(xInEm);
                
                $scope.raiseRowMouseDownEvent(e, row, clickedColumn, date);
            };

            $scope.raiseRowMouseDownEvent = function(evt, row, column, date) {
                $scope.onRowMouseDown({ event: { evt: evt, row: row, column: column.clone(), date: date, userTriggered: true } });
            };

            $scope.raiseDOMRowClickedEvent = function(e, row) {
                var x = mouseOffset.getOffset(e).x;
                var xInEm = x / $scope.getPxToEmFactor();
                var clickedColumn = $scope.gantt.getColumnByPosition(xInEm);
                var date = $scope.gantt.getDateByPosition(xInEm);

                $scope.raiseRowClickedEvent(e, row, clickedColumn, date);
            };

            $scope.raiseDOMRowContextMenuEvent = function(e, row) {
                var x = mouseOffset.getOffset(e).x;
                var xInEm = x / $scope.getPxToEmFactor();
                var clickedColumn = $scope.gantt.getColumnByPosition(xInEm);
                var date = $scope.gantt.getDateByPosition(xInEm);

                $scope.raiseRowContextMenuEvent(e, row, clickedColumn, date);
            };

            $scope.raiseRowContextMenuEvent = function(evt, row, column, date) {
                $scope.onRowContextClicked({ event: { evt: evt, row: row, column: column.clone(), date: date, userTriggered: true } });
            };

            $scope.raiseRowUpdatedEvent = function(row, userTriggered) {
                $scope.onRowUpdated({ event: { row: row, userTriggered: userTriggered } });
            };

            $scope.raiseScrollEvent = debounce(function() {
                if ($scope.gantt.getDateRange() === undefined) {
                    return;
                }

                var el = $scope.ganttScroll[0];
                var direction;
                var date;

                if (el.scrollLeft === 0) {
                    direction = 'left';
                    date = $scope.gantt.getDateRange().from;
                } else if (el.offsetWidth + el.scrollLeft >= el.scrollWidth) {
                    direction = 'right';
                    date = $scope.gantt.getDateRange().to;
                }

                if (date !== undefined) {
                    $scope.autoExpandColumns(el, date, direction);
                    $scope.onScroll({ event: { date: date, direction: direction, userTriggered: true }});
                }
            }, 5);

            $scope.raiseTaskUpdatedEvent = function(task, userTriggered) {
                $scope.onTaskUpdated({ event: { task: task, userTriggered: userTriggered } });
            };

            $scope.raiseTaskMoveStartEvent = function(task) {
                $scope.onTaskMoveBegin({ event: { task: task, userTriggered: true } });
            };

            $scope.raiseTaskMoveEndEvent = function(task) {
                $scope.onTaskMoveEnd({ event: { task: task, userTriggered: true } });
            };

            $scope.raiseTaskResizeStartEvent = function(task) {
                $scope.onTaskResizeBegin({ event: { task: task, userTriggered: true } });
            };

            $scope.raiseTaskResizeEndEvent = function(task) {
                $scope.onTaskResizeEnd({ event: { task: task, userTriggered: true } });
            };

            $scope.raiseTaskClickedEvent = function(evt, task) {
                var x = mouseOffset.getOffset(evt).x,
                    xInEm = x / $scope.getPxToEmFactor(),
                    clickedColumn = $scope.gantt.getColumnByPosition(xInEm + task.left),
                    date = $scope.gantt.getDateByPosition(xInEm + task.left);
                $scope.onTaskClicked({ event: {
                    evt: evt,
                    task: task,
                    column: clickedColumn,
                    date: date,
                    userTriggered: true
                } });
            };

            $scope.raiseTaskDblClickedEvent = function(evt, task) {
                $scope.onTaskDblClicked({ event: { evt: evt, task: task, userTriggered: true } });
            };

            $scope.raiseTaskContextMenuEvent = function(evt, task) {
                $scope.onTaskContextClicked({ event: { evt: evt, task: task, userTriggered: true } });
            };

            // Add or update rows and tasks
            $scope.setData = keepScrollPos($scope, function (data) {
                $scope.gantt.addData(data,
                function(row) {
                    $scope.raiseRowAddedEvent(row, false);
                }, function(row) {
                    $scope.raiseRowUpdatedEvent(row, false);
                });

                $scope.sortRows();
            });

            // Remove specified rows and tasks.
            $scope.removeData({ fn: function(data) {
                $scope.gantt.removeData(data, function(row) {
                    $scope.raiseRowUpdatedEvent(row, false);
                });

                $scope.sortRows();
            }});

            // Clear all existing rows and tasks
            $scope.removeAllData = function() {
                // Clears rows, task and columns
                $scope.gantt.removeAllRows();
                // Restore default columns
                $scope.gantt.setDefaultDateRange($scope.fromDate, $scope.toDate);
            };

            // Clear all existing timespans
            $scope.removeAllTimespans = function() {
                // Clears rows, task and columns
                $scope.gantt.removeAllTimespans();
                // Restore default columns
                $scope.gantt.expandDefaultDateRange($scope.fromDate, $scope.toDate);
            };

            // Add or update timespans
            $scope.setTimespans = keepScrollPos($scope, function (timespans) {
                $scope.gantt.addTimespans(timespans,
                function(timespan) {
                    $scope.raiseTimespanAddedEvent(timespan, false);
                }, function(timespan) {
                    $scope.raiseTimespanUpdatedEvent(timespan, false);
                });

                $scope.sortRows();
            });

            $scope.raiseTimespanAddedEvent = function(timespan, userTriggered) {
                $scope.onTimespanAdded({ event: { timespan: timespan, userTriggered: userTriggered } });
            };

            $scope.raiseTimespanUpdatedEvent = function(timespan, userTriggered) {
                $scope.onTimespanUpdated({ event: { timespan: timespan, userTriggered: userTriggered } });
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
            $scope.onGanttReady();
        }
    ]};
}]);
;gantt.factory('Column', [ 'dateFunctions', function (df) {
    // Used to display the Gantt grid and header.
    // The columns are generated by the column generator.

    var calcDbyP = function(column, maxDateValue, currentPosition) {
        return Math.round(maxDateValue/column.width * currentPosition / (maxDateValue / column.subScale)) * (maxDateValue / column.subScale);
    };

    var calcPbyD = function(column, date, maxDateValue, currentDateValue, a, b) {
        var factor;

        if (date - column.date > 0 && a !== b) {
            factor = 1;
        } else {
            factor = Math.round(currentDateValue/maxDateValue * column.subScale) / column.subScale;
        }

        return Math.round( (column.left + column.width * factor) * 10) / 10;
    };

    var Column = function(date, left, width, subScale) {
        var self = this;
        self.date = date;
        self.left = left;
        self.width = width;
        self.subScale = subScale;

        self.getEndDate = function() {
            return self.getDateByPosition(self.width);
        };

        self.clone = function() {
            return new Column(self.date, self.left, self.width, self.subScale);
        };

        self.equals = function(other) {
            return self.date === other.date;
        };

    };

    var MonthColumn = function(date, left, width, subScale) {
        var column = new Column(date, left, width, subScale);
        column.daysInMonth = df.getDaysInMonth(column.date);

        column.clone = function() {
            return new Column(column.date, column.left, column.width, column.subScale);
        };

        column.getDateByPosition = function(position) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            res.setDate(1 + calcDbyP(column, column.daysInMonth, position));
            return res;
        };

        column.getPositionByDate = function(date) {
            return calcPbyD(column, date, column.daysInMonth, date.getDate(), date.getMonth(), column.date.getMonth());
        };

        return column;
    };

    var WeekColumn = function(date, left, width, subScale, firstDayOfWeek) {
        var column = new Column(date, left, width, subScale);
        column.week = df.getWeek(date);
        column.firstDayOfWeek = firstDayOfWeek;
        column.daysInWeek = 7;

        column.clone = function() {
            var copy = new Column(column.date, column.left, column.width, column.subScale);
            copy.week = column.week;
            return copy;
        };

        // Adjusts the day so that the specified first day of week is index = 0
        var firstDayIs0 = function(day) {
            return ((column.daysInWeek - column.firstDayOfWeek) + day) % column.daysInWeek;
        };

        // Adjusts the day so that Sunday= 0, Monday = 1, ...
        var firstDayIsSunday = function(day) {
            return (column.firstDayOfWeek + day) % column.daysInWeek;
        };

        var getWeek = function(date) {
            if (column.firstDayOfWeek !== 1) {
                // Adjust date so that firstDayOfWeek is always Monday because df.getWeek returns a ISO week number which starts on Monday.
                // Otherwise if for e.g. firstDayOfWeek is 0 the Sunday would be in week number X while Monday would be in week number Y.
                df.getWeek(df.addDays(date, 1 - column.firstDayOfWeek, true));
            } else {
                return df.getWeek(date);
            }
        };

        column.getDateByPosition = function(position) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            var day = Math.round(calcDbyP(column, column.daysInWeek, position));

            // If day === 7, then jump forward to next week
            var direction = day !== 7 && day < 0 ? -1: 1; // -1: <<<<< | 1: >>>>>

            df.setToDayOfWeek(res, day !== 7 ? firstDayIsSunday(day): firstDayIsSunday(day) + 7, false, direction);
            return res;
        };

        column.getPositionByDate = function(date) {
            return calcPbyD(column, date, column.daysInWeek, firstDayIs0(date.getDay()), getWeek(date), getWeek(column.date));
        };

        return column;
    };

    var DayColumn = function(date, left, width, subScale, isWeekend, daysToNextWorkingDay, daysToPrevWorkingDay, workHours, showNonWorkHours) {
        var column = new Column(date, left, width, subScale);
        column.isWeekend = isWeekend;
        column.showNonWorkHours = showNonWorkHours;
        
        var startHour = 0;
        var endHour = 24;

        if(arguments.length == 9 && !showNonWorkHours && workHours.length > 1){
            startHour = workHours[0];
            endHour = workHours[workHours.length-1] + 1;
        }

        column.clone = function() {
            var copy = new Column(column.date, column.left, column.width, column.subScale);
            copy.isWeekend = column.isWeekend;
            return copy;
        };

        column.getDateByPosition = function(position, snapForward) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            var hours = startHour + calcDbyP(column, (endHour-startHour), position);

            // Snap is done because a DAY can hide the non-work hours. If this is the case the start or end date of a task shall be the last work hour of the current day and not the next day.
            if(arguments.length == 2){
                if (hours === endHour && snapForward){
                    //We have snapped to the end of one day but this is a start of a task so it should snap to the start of the next displayed day
                    res = df.addDays(res, daysToNextWorkingDay);
                    hours = startHour;
                }
                else if (hours === startHour && !snapForward){
                    //We have snapped to the start of one day but this is the end of a task so it should snap to the end of the previous displayed day
                    res = df.addDays(res, -daysToPrevWorkingDay);
                    hours = endHour;
                }
            }

            res.setHours(hours);
            return res;
        };

        column.getPositionByDate = function(date) {
            //first check that the date actually corresponds to this column
            //(it is possible that it might not if weekends are hidden, in which case this will be the nearest previous column)
            if (df.setTimeZero(date,true) > df.setTimeZero(column.date, true)) return column.left + column.width;
            if (df.setTimeZero(date,true) < df.setTimeZero(column.date, true)) return column.left;

            var maxDateValue = endHour-startHour;
            var currentDateValue = date.getHours()-startHour;
            if (currentDateValue < 0) return column.left;
            else if (currentDateValue > maxDateValue) return column.left + column.width;
            else return calcPbyD(column, date, maxDateValue, currentDateValue, date.getDate(), column.date.getDate());
        };

        return column;
    };

    var HourColumn = function(date, left, width, subScale, isWeekend, isWorkHour, hoursToNextWorkingDay, hoursToPrevWorkingDay) {
        var column = new Column(date, left, width, subScale);
        column.isWeekend = isWeekend;
        column.isWorkHour = isWorkHour;

        column.clone = function() {
            var copy = new Column(column.date, column.left, column.width, column.subScale);
            copy.isWeekend = column.isWeekend;
            copy.isWorkHour = column.isWorkHour;
            return copy;
        };

        column.getDateByPosition = function(position, snapForward) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            var minutes = calcDbyP(column, 60, position);

            // Snap is done because a HOUR can hide the non-work hours. If this is the case the start or end date of a task shall be the last work hour of the current day and not the next day.
            if(arguments.length == 2){
                if (minutes === 60 && snapForward){
                    //We have snapped to the end of one day but this is a start of a task so it should snap to the start of the next displayed day
                    res = df.addHours(res, hoursToNextWorkingDay);
                    minutes = 0;
                }
                else if (minutes === 0 && !snapForward){
                    //We have snapped to the start of one day but this is the end of a task so it should snap to the end of the previous displayed day
                    res = df.addHours(res, -hoursToPrevWorkingDay);
                    minutes = 60;
                }
            }

            res.setMinutes(minutes);
            return res;
        };

        column.getPositionByDate = function(date) {
            if (df.setTimeZero(date,true) > df.setTimeZero(column.date, true)) return column.left + column.width;

            return calcPbyD(column, date, 60, date.getMinutes(), date.getHours(), column.date.getHours());
        };

        return column;
    };

    return {
        Hour: HourColumn,
        Day: DayColumn,
        Week: WeekColumn,
        Month: MonthColumn
    };
}]);;gantt.factory('ColumnGenerator', [ 'Column', 'dateFunctions', function (Column, df) {

    // Returns a map to lookup if the current day is a weekend day
    var getWeekendDaysMap = function(weekendDays) {
        var weekendDaysMap = {};

        for (var i = 0, l = weekendDays.length; i < l; i++) {
            weekendDaysMap[weekendDays[i]] = true;
        }

        return weekendDaysMap;
    };

    // Returns true if the given day is a weekend day
    var checkIsWeekend = function(weekendDaysMap, day) {
        return weekendDaysMap[day] === true;
    };

    // Returns a map to lookup if the current hour is a work hour
    var getWorkHoursMap = function(workHours) {
        var workHoursMap = {};

        for (var i = 0, l = workHours.length; i < l; i++) {
            workHoursMap[workHours[i]] = true;
        }

        return workHoursMap;
    };

    // Returns true if the given hour is a work hour
    var checkIsWorkHour = function(workHoursMap, hour) {
        return workHoursMap[hour] === true;
    };

    var setWidth = function(width, originalWidth, columns) {
        if (width && originalWidth && columns) {

            var widthFactor = Math.abs(width / originalWidth);

            angular.forEach(columns, function(column) {
                column.left = widthFactor * column.left;
                column.width = widthFactor * column.width;
            });
        }
    };


    var HourColumnGenerator = function(width, columnWidth, columnSubScale, weekendDays, showWeekends, workHours, showNonWorkHours) {
        // Generates 24 columns for each day between the given from and to date. The task will later be places between the matching columns.
        this.generate = function(from, to, maximumWidth, leftOffset, reverse) {
            if (!to && !maximumWidth) {
                throw 'to or maximumWidth must be defined';
            }

            var excludeTo = false;
            from = df.setTimeZero(from, true);
            if (to) {
                excludeTo = isToDateToExclude(to);
                to = df.setTimeZero(to, true);
            }

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;
            var workHoursMap = getWorkHoursMap(workHours);
            var weekendDaysMap = getWeekendDaysMap(weekendDays);

            while(true) {
                if ((maximumWidth && Math.abs(left) > maximumWidth + columnWidth * 24)) {
                    break;
                }

                if (reverse) {
                    left -= columnWidth * 24;
                }

                var isWeekend = checkIsWeekend(weekendDaysMap, date.getDay());

                for (var i = 0; i<24; i++) {
                    var cDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0);
                    var isWorkHour = checkIsWorkHour(workHoursMap, i);

                    if ((isWeekend && showWeekends || !isWeekend) && (!isWorkHour && showNonWorkHours || isWorkHour)) {
                        var hoursToNextWorkingDay = 1;
                        var hoursToPrevWorkingDay = 1;
                        if(!showNonWorkHours) { //hours to next/prev working day is only relevant if non-work hours are hidden
                            hoursToNextWorkingDay = getHoursToNextWorkingDay(workHoursMap, cDate.getHours());
                            hoursToPrevWorkingDay = getHoursToPreviousWorkingDay(workHoursMap, cDate.getHours());
                        }

                        generatedCols.push(new Column.Hour(cDate, leftOffset ? left + leftOffset : left, columnWidth, columnSubScale, isWeekend, isWorkHour, hoursToNextWorkingDay, hoursToPrevWorkingDay));
                        left += columnWidth;
                    }

                }

                if (reverse) {
                    left -= columnWidth * 24;
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

                date = df.addDays(date, reverse ? -1 : 1);
            }

            setWidth(width, left, generatedCols);

            return generatedCols;
        };

        this.columnExpandNecessary = function(firstColDate, lastColDate, newFromDate, newToDate) {
            // If the To date was excluded from generating then go back one hour.
            if (isToDateToExclude(newToDate)) {
                newToDate = df.addHours(newToDate, -1, true);
            }

            // Set time of newToDate to zero before comparing as the hour columns are generated for the whole day
            // and the newToDate could be e.g. 23:35 while the last column for this date has time 23:00.
            // If we wouldn`t set the time to zero the comparison would trigger an expand in that case.
            return firstColDate > newFromDate || lastColDate < df.setTimeZero(newToDate, true);
        };

        // Columns are generated including or excluding the to date.
        // If the To date time is 00:00 then no new columns are generated for this day.
        var isToDateToExclude = function(to) {
            return df.isTimeZero(to);
        };

        // Returns the count of hours until the next working day
        // For example with working hours from 8-16, Wed 9am would return 1, Thu 16pm would return 16
        // Should also be able to handle gaps like 8-12, 13-17
        var getHoursToNextWorkingDay = function(workHoursMap, hour){
            for(var i = 1; i < 25; i++) {
                var nextHour = (hour+i)%24;
                if(checkIsWorkHour(workHoursMap, nextHour)){
                    return i;
                }
            }
            return 1; //default to 1, should only get here if the whole day is a work day
        };

        var getHoursToPreviousWorkingDay = function(workHours, hour){
            for(var i = 1; i < 25; i++) {
                var prevHour = (((hour-i)%24)+24)%24;
                if(checkIsWorkHour(workHours, prevHour)){
                    return i;
                }
            }
            return 1; //default to 1, should only get here if the whole day is a work day
        };
    };

    var DayColumnGenerator = function(width, columnWidth, columnSubScale, weekendDays, showWeekends, workHours, showNonWorkHours) {
        // Generates one column for each day between the given from and to date.
        this.generate = function(from, to, maximumWidth, leftOffset, reverse) {
            if (!to && !maximumWidth) {
                throw 'to or maximumWidth must be defined';
            }

            var excludeTo = false;
            from = df.setTimeZero(from, true);
            if (to) {
                excludeTo = isToDateToExclude(to);
                to = df.setTimeZero(to, true);
            }

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;
            var weekendDaysMap = getWeekendDaysMap(weekendDays);

            while(true) {
                if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                    break;
                }

                var isWeekend = checkIsWeekend(weekendDaysMap, date.getDay());
                if (isWeekend && showWeekends || !isWeekend) {
                    var daysToNextWorkingDay = 1;
                    var daysToPreviousWorkingDay = 1;
                    if(!showWeekends){ //days to next/prev working day is only relevant if weekends are hidden
                        daysToNextWorkingDay = getDaysToNextWorkingDay(weekendDaysMap, date.getDay());
                        daysToPreviousWorkingDay = getDaysToPrevWorkingDay(weekendDaysMap, date.getDay());
                    }

                    generatedCols.push(new Column.Day(df.clone(date), leftOffset ? left + leftOffset : left, columnWidth, columnSubScale, isWeekend, daysToNextWorkingDay, daysToPreviousWorkingDay, workHours, showNonWorkHours));
                    if (reverse) {
                        left -= columnWidth;
                    } else {
                        left += columnWidth;
                    }

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

                date = df.addDays(date, reverse ? -1: 1);
            }

            if (reverse) {
                if (isToDateToExclude(from)) {
                    generatedCols.shift();
                }
                generatedCols.reverse();
            }

            setWidth(width, left, generatedCols);

            return generatedCols;
        };

        this.columnExpandNecessary = function(firstColDate, lastColDate, newFromDate, newToDate) {
            // If the To date was excluded from generating then go back one day.
            if (isToDateToExclude(newToDate)) {
                newToDate = df.addDays(newToDate, -1, true);
            }

            // Set time of newToDate to zero before comparing as the day columns generated have time 00:00
            // and the newToDate could be e.g. 16:23.
            // If we wouldn`t set the time to zero the comparison would trigger an expand in that case.
            return firstColDate > newFromDate || lastColDate < df.setTimeZero(newToDate, true);
        };

        // Columns are generated including or excluding the to date.
        // If the To date time is 00:00 then no new column is generated for this day.
        var isToDateToExclude = function(to) {
            return df.isTimeZero(to);
        };

        // Returns the count of days until the next working day
        // For example with a Mon-Fri working week, Wed would return 1, Fri would return 3, Sat would return 2
        var getDaysToNextWorkingDay = function(weekendDays, day){
            for(var i = 1; i < 8; i++) {
                var nextDay = (day+i)%7;
                if(!checkIsWeekend(weekendDays, nextDay)){
                    return i;
                }
            }
            return 1; //default to 1, should only get here if the whole week is the weekend
        };

        // Returns the count of days from the previous working day
        // For example with a Mon-Fri working week, Wed would return 1, Mon would return 3.
        var getDaysToPrevWorkingDay = function(weekendDays, day){
            for(var i = 1; i < 8; i++) {
                var prevDay = (((day-i)%7)+7)%7;
                if(!checkIsWeekend(weekendDays, prevDay)){
                    return i;
                }
            }
            return 1; //default to 1, should only get here if the whole week is the weekend
        };
    };

    var WeekColumnGenerator = function(width, columnWidth, columnSubScale, firstDayOfWeek) {
        // Generates one column for each week between the given from and to date.
        this.generate = function(from, to, maximumWidth, leftOffset, reverse) {
            if (!to && !maximumWidth) {
                throw 'to or maximumWidth must be defined';
            }

            var excludeTo = false;
            from = df.setToDayOfWeek(df.setTimeZero(from, true), firstDayOfWeek, false);
            if (to) {
                excludeTo = isToDateToExclude(to);
                to = df.setToDayOfWeek(df.setTimeZero(to, true), firstDayOfWeek, false);
            }

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;

            while(true) {
                if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                    break;
                }

                generatedCols.push(new Column.Week(df.clone(date), leftOffset ? left + leftOffset : left, columnWidth, columnSubScale, firstDayOfWeek));
                if (reverse) {
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

                date = df.addWeeks(date, reverse ? -1 : 1);
            }

            if (reverse) {
                if (isToDateToExclude(from)) {
                    generatedCols.shift();
                }
                generatedCols.reverse();
            }

            setWidth(width, left, generatedCols);

            return generatedCols;
        };

        this.columnExpandNecessary = function(firstColDate, lastColDate, newFromDate, newToDate) {
            // If the To date was excluded from generating then go back one week.
            if (isToDateToExclude(newToDate)) {
                newToDate = df.addWeeks(newToDate, -1, true);
            }

            // Set time of newToDate to zero before comparing as the week columns generated have day = firstDayOfWeek and time = 00:00
            // and the newToDate could be e.g. day 3 and time 16:23.
            // If we wouldn`t set the day to firstDayOfWeek and time to zero the comparison would trigger an expand in that case.
            return firstColDate > newFromDate || lastColDate < df.setToDayOfWeek(df.setTimeZero(newToDate, true), firstDayOfWeek);
        };

        // Columns are generated including or excluding the to date.
        // If the To date is the first day of week and the time is 00:00 then no new column is generated for this week.
        var isToDateToExclude = function(to) {
            return to.getDay() === firstDayOfWeek && df.isTimeZero(to);
        };
    };

    var MonthColumnGenerator = function(width, columnWidth, columnSubScale) {
        // Generates one column for each month between the given from and to date.
        this.generate = function(from, to, maximumWidth, leftOffset, reverse) {
            if (!to && !maximumWidth) {
                throw 'to or maximumWidth must be defined';
            }

            var excludeTo = false;
            from = df.setToFirstDayOfMonth(df.setTimeZero(from, true), false);
            if (to) {
                excludeTo = isToDateToExclude(to);
                to = df.setToFirstDayOfMonth(df.setTimeZero(to, true), false);
            }

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;

            while(true) {
                if (maximumWidth && Math.abs(left) > maximumWidth + columnWidth) {
                    break;
                }

                generatedCols.push(new Column.Month(df.clone(date), leftOffset ? left + leftOffset : left, columnWidth, columnSubScale));
                if (reverse) {
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

                date = df.addMonths(date, reverse ? -1 : 1);
            }

            if (reverse) {
                if (isToDateToExclude(from)) {
                    generatedCols.shift();
                }
                generatedCols.reverse();
            }

            setWidth(width, left, generatedCols);

            return generatedCols;
        };

        this.columnExpandNecessary = function(firstColDate, lastColDate, newFromDate, newToDate) {
            // If the To date was excluded from generating then go back one month.
            if (isToDateToExclude(newToDate)) {
                newToDate = df.addMonths(newToDate, -1, true);
            }

            // Set time of newToDate to zero before comparing as the month columns generated have day = 1 and time = 00:00
            // and the newToDate could be e.g. day 7 and time 16:23.
            // If we wouldn`t set the day to 1 and time to zero the comparison would trigger an expand in that case.
            return firstColDate > newFromDate || lastColDate < df.setToFirstDayOfMonth(df.setTimeZero(newToDate, true));
        };

        // Columns are generated including or excluding the to date.
        // If the To date is the first day of month and the time is 00:00 then no new column is generated for this month.
        var isToDateToExclude = function(to) {
            return to.getDate() === 1 && df.isTimeZero(to);
        };
    };

    return {
        HourGenerator: HourColumnGenerator,
        DayGenerator: DayColumnGenerator,
        WeekGenerator: WeekColumnGenerator,
        MonthGenerator: MonthColumnGenerator
    };
}]);;gantt.factory('Gantt', ['Row', 'Timespan', 'ColumnGenerator', 'HeaderGenerator', 'dateFunctions', 'binarySearch', function (Row, Timespan, ColumnGenerator, HeaderGenerator, df, bs) {

    // Gantt logic. Manages the columns, rows and sorting functionality.
    var Gantt = function(viewScale, autoExpand, taskOutOfRange, width, columnWidth, columnSubScale, firstDayOfWeek, weekendDays, showWeekends, workHours, showNonWorkHours) {
        var self = this;

        self.rowsMap = {};
        self.rows = [];
        self.timespansMap = {};
        self.timespans = [];
        self.columns = [];
        self.headers = {};
        self.previousColumns = [];
        self.nextColumns = [];
        self.width = 0;
        self.autoExpand = autoExpand;
        self.taskOutOfRange = taskOutOfRange;
        var dateRange;

        // Sets the Gantt view scale. Call reGenerateColumns to make changes visible after changing the view scale.
        // The headers are shown depending on the defined view scale.
        self.setViewScale = function(viewScale, autoExpand, taskOutOfRange, width, columnWidth, columnSubScale, firstDayOfWeek, weekendDays, showWeekends, workHours, showNonWorkHours) {
            self.autoExpand = autoExpand;
            self.taskOutOfRange = taskOutOfRange;

            switch(viewScale) {
                case 'hour': self.columnGenerator = new ColumnGenerator.HourGenerator(width, columnWidth, columnSubScale, weekendDays, showWeekends, workHours, showNonWorkHours); break;
                case 'day': self.columnGenerator = new ColumnGenerator.DayGenerator(width, columnWidth, columnSubScale, weekendDays, showWeekends, workHours, showNonWorkHours); break;
                case 'week': self.columnGenerator = new ColumnGenerator.WeekGenerator(width, columnWidth, columnSubScale, firstDayOfWeek); break;
                case 'month': self.columnGenerator = new ColumnGenerator.MonthGenerator(width, columnWidth, columnSubScale); break;
                default:
                    throw "Unsupported view scale: " + viewScale;
            }

            self.headerGenerator = new HeaderGenerator.instance(viewScale);
        };

        self.setViewScale(viewScale, self.autoExpand, self.taskOutOfRange, width, columnWidth, columnSubScale, firstDayOfWeek, weekendDays, showWeekends, workHours, showNonWorkHours);

        self.setDefaultDateRange = function(from, to) {
            if (from !== undefined && to !== undefined) {
              setDateRange(from, to);
              expandColumnsNoCheck(dateRange.from, dateRange.to);
            }
        };

        var setDateRange = function(from, to) {
            from = df.clone(from);
            to = df.clone(to);

            if (dateRange === undefined) {
                dateRange = {};
                dateRange.from = from;
                dateRange.to = to;
            } else {
                dateRange.from = from;
                dateRange.to = to;
            }
        };

        // Expands the default date range. Even if there tasks are smaller the specified date range is shown.
        self.expandDefaultDateRange = function(from, to) {
            if (from !== undefined && to !== undefined) {
                expandDateRange(from, to);
                expandColumns();
            }
        };

        var expandDateRange = function(from, to) {
            from = from ? df.clone(from) : from;
            to = to ? df.clone(to) : to;

            if (dateRange === undefined && from && to) {
                dateRange = {};
                dateRange.from = from;
                dateRange.to = to;
            } else if (dateRange !== undefined) {
                if (from && from < dateRange.from) {
                    dateRange.from = from;
                }

                if (to && to > dateRange.to) {
                    dateRange.to = to;
                }
            }
        };

        // Generates the Gantt columns according to the current dateRange. The columns are generated if necessary only.
        var expandColumns = function() {
            if (dateRange === undefined) {
                throw "From and to date range cannot be undefined";
            }

            // Only expand if expand is necessary
            if (self.columns.length === 0) {
                expandColumnsNoCheck(dateRange.from, dateRange.to);
            } else if (self.columnGenerator.columnExpandNecessary(self.getFirstColumn().date, self.getLastColumn().date, dateRange.from, dateRange.to)) {
                var minFrom = self.getFirstColumn().date > dateRange.from ? dateRange.from: self.getFirstColumn().date;
                var maxTo = self.getLastColumn().date < dateRange.to ? dateRange.to: self.getLastColumn().date;

                expandColumnsNoCheck(minFrom, maxTo);
            }
        };

        self.setCurrentDate = function(currentDate) {
            self._currentDate = currentDate;
            angular.forEach(self.columns, function(column) {
                if (currentDate >= column.date && currentDate < column.getEndDate()) {
                    column.currentDate = currentDate;
                } else {
                    delete column.currentDate;
                }
            });
        };

        // Generates the Gantt columns according to the specified from - to date range. Uses the currently assigned column generator.
        var expandColumnsNoCheck = function(from ,to) {
            self.columns = self.columnGenerator.generate(from, to);
            self.headers = self.headerGenerator.generate(self.columns);
            if (self._currentDate) {
                self.setCurrentDate(self._currentDate);
            }
            self.previousColumns = [];
            self.nextColumns = [];

            var lastColumn = self.getLastColumn();
            self.width = lastColumn !== undefined ? lastColumn.left + lastColumn.width: 0;

            self.updateTasksPosAndSize();
            self.updateTimespansPosAndSize();
        };

        var expandExtendedColumnsForPosition = function(x) {
            if (x < 0) {
                var firstColumn = self.getFirstColumn();
                var from = firstColumn.date;
                var firstExtendedColumn = self.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.left > x) {
                    self.previousColumns = self.columnGenerator.generate(from, null, -x, 0, true);
                }
                return true;
            } else if (x > self.width) {
                var lastColumn = self.getLastColumn();
                var endDate = lastColumn.getDateByPosition(lastColumn.width);
                var lastExtendedColumn = self.getLastColumn(true);
                if (!lastExtendedColumn || lastExtendedColumn.left + lastExtendedColumn.width < x) {
                    self.nextColumns = self.columnGenerator.generate(endDate, null, x-self.width, self.width, false);
                }
                return true;
            }
            return false;
        };

        var expandExtendedColumnsForDate = function(date) {
            var firstColumn = self.getFirstColumn();
            var from = null;
            if (firstColumn) {
                from = firstColumn.date;
            }

            var lastColumn = self.getLastColumn();
            var endDate = null;
            if (lastColumn) {
                endDate = lastColumn.getDateByPosition(lastColumn.width);
            }

            if (from && date < from) {
                var firstExtendedColumn = self.getFirstColumn(true);
                if (!firstExtendedColumn || firstExtendedColumn.date > date) {
                    self.previousColumns = self.columnGenerator.generate(from, date, null, 0, true);
                }
                return true;
            } else if (endDate && date > endDate) {
                var lastExtendedColumn = self.getLastColumn(true);
                if (!lastExtendedColumn || endDate < lastExtendedColumn) {
                    self.nextColumns = self.columnGenerator.generate(endDate, date, null, self.width, false);
                }
                return true;
            }
            return false;
        };

        // Removes all existing columns and re-generates them. E.g. after e.g. the view scale changed.
        // Rows can be re-generated only if there is a data-range specified. If the re-generation failed the function returns false.
        self.reGenerateColumns = function() {
            self.columns = [];
            self.previousColumns = [];
            self.nextColumns = [];

            if (dateRange !== undefined) {
                expandColumns();
                return true;
            } else {
                return false;
            }
        };

        // Update the position/size of all tasks in the Gantt
        self.updateTasksPosAndSize = function() {
            for (var i = 0, l = self.rows.length; i < l; i++) {
                for (var j = 0, k = self.rows[i].tasks.length; j < k; j++) {
                    self.rows[i].tasks[j].updatePosAndSize();
                }
            }
        };

        // Update the position/size of all timespans in the Gantt
        self.updateTimespansPosAndSize = function() {
            for (var i = 0, l = self.timespans.length; i < l; i++) {
                self.timespans[i].updatePosAndSize();
            }
        };

        // Returns the first Gantt column or undefined
        self.getLastColumn = function(extended) {
            var columns = self.columns;
            if (extended) {
                columns = self.nextColumns;
            }
            if (columns && columns.length > 0) {
                return columns[columns.length-1];
            } else {
                return undefined;
            }
        };

        // Returns the last Gantt column or undefined
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
            var columns = bs.get(extendedColumns, date, function(c) { return c.date; });
            return columns[0] !== undefined? columns[0]: columns[1];
        };

        // Returns the column at the given position x (in em)
        self.getColumnByPosition = function(x) {
            expandExtendedColumnsForPosition(x);
            var extendedColumns = self.previousColumns.concat(self.columns, self.nextColumns);
            return bs.get(extendedColumns, x, function(c) { return c.left; })[0];
        };

        // Returns the exact column date at the given position x (in em)
        self.getDateByPosition = function(x, snapForward) {
            var column = self.getColumnByPosition(x);
            if (column !== undefined) {
                if(snapForward !== undefined) return column.getDateByPosition(x - column.left, snapForward);
                else return column.getDateByPosition(x - column.left);
            } else {
                return undefined;
            }
        };

        // Returns the position inside the Gantt calculated by the given date
        self.getPositionByDate = function(date) {
            if (!date) return undefined;
            var column = self.getColumnByDate(date);
            if (column !== undefined) {
                return column.getPositionByDate(date);
            } else {
                return undefined;
            }
        };

        // Returns the current Gantt date range or undefined if it has not been defined
        self.getDateRange = function() {
            if (dateRange === undefined) {
                return undefined;
            } else {
                return {
                    from: df.clone(dateRange.from),
                    to: df.clone(dateRange.to)
                };
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

                    if (minDate === undefined || row.minFromDate < minDate) {
                        minDate = row.minFromDate;
                    }

                    if (maxDate === undefined || row.maxToDate > maxDate) {
                        maxDate = row.maxToDate;
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
                if (self.headers.hasOwnProperty(key)) size++;
            }
            return size;
        };

        // Adds or update rows and tasks.
        self.addData = function(data, addEventFn, updateEventFN) {
            for (var i = 0, l = data.length; i < l; i++) {
                var rowData = data[i];
                var isUpdate = addRow(rowData);
                var row = self.rowsMap[rowData.id];

                if (isUpdate === true && updateEventFN !== undefined) {
                    updateEventFN(row);
                } else if (addEventFn !== undefined) {
                    addEventFn(row);
                }
            }

            if (dateRange !== undefined) {
                expandColumns();
            }
        };

        // Adds a row or merges the row and its tasks if there is already one with the same id
        var addRow = function(rowData) {
            // Copy to new row (add) or merge with existing (update)
            var row, isUpdate = false;

            if (rowData.id in self.rowsMap) {
                row = self.rowsMap[rowData.id];
                row.copy(rowData);
                isUpdate = true;
            } else {
                var order = rowData.order;

                // Check if the row has a order predefined. If not assign one
                if (order === undefined) {
                    order = self.highestRowOrder;
                }

                if (order >= self.highestRowOrder) {
                    self.highestRowOrder = order + 1;
                }

                row = new Row(rowData.id, self, rowData.description, order, rowData.data);
                self.rowsMap[rowData.id] = row;
                self.rows.push(row);
            }

            if (rowData.tasks !== undefined && rowData.tasks.length > 0) {
                for (var i = 0, l = rowData.tasks.length; i < l; i++) {
                    var task = row.addTask(rowData.tasks[i]);

                    if (self.taskOutOfRange === 'expand') {
                        expandDateRange(task.from, task.to);
                    }

                    task.updatePosAndSize();
                }
            }

            return isUpdate;
        };

        // Removes specified rows or tasks.
        // If a row has no tasks inside the complete row will be deleted.
        self.removeData = function(data, updateEventFn) {
            for (var i = 0, l = data.length; i < l; i++) {
                var rowData = data[i];

                if (rowData.tasks !== undefined && rowData.tasks.length > 0) {
                    // Only delete the specified tasks but not the row and the other tasks

                    if (rowData.id in self.rowsMap) {
                        var row = self.rowsMap[rowData.id];

                        for (var j = 0, k = rowData.tasks.length; j < k; j++) {
                            row.removeTask(rowData.tasks[j].id);
                        }

                        if (updateEventFn !== undefined) {
                            updateEventFn(row);
                        }
                    }
                } else {
                    // Delete the complete row
                    removeRow(rowData.id);
                }
            }
        };

        // Removes the complete row including all tasks
        var removeRow = function(rowId) {
            if (rowId in self.rowsMap) {
                delete self.rowsMap[rowId]; // Remove from map

                for (var i = 0, l = self.rows.length; i < l; i++) {
                    var row = self.rows[i];
                    if (row.id === rowId) {
                        self.rows.splice(i, 1); // Remove from array
                        return row;
                    }
                }
            }

            return undefined;
        };

        // Removes all rows and tasks
        self.removeAllRows = function() {
            self.rowsMap = {};
            self.rows = [];
            self.highestRowOrder = 0;
            self.columns = [];
            dateRange = undefined;
        };

        // Removes all timespans
        self.removeAllTimespans = function() {
            self.timespansMap = {};
            self.timespans = [];
        };

        // Swaps two rows and changes the sort order to custom to display the swapped rows
        self.swapRows = function (a, b) {
            // Swap the two rows
            var order = a.order;
            a.order = b.order;
            b.order = order;
        };

        // Sort helper to sort by the date of the task with the earliest from date.
        // Rows with no min date will be sorted by name
        var sortByDate = function (a, b) {
            if (a.minFromDate === undefined && b.minFromDate === undefined) {
                return sortByName(a, b);
            } else if (a.minFromDate === undefined) {
                return 1;
            } else if (b.minFromDate === undefined) {
                return -1;
            } else {
                return a.minFromDate - b.minFromDate;
            }
        };

        // Sort helper to sort by description name (switch to localeCompare() in the future?)
        var sortByName = function (a, b) {
            if (a.description.toLowerCase() === b.description.toLowerCase()) {
                return 0;
            } else {
                return (a.description.toLowerCase() < b.description.toLowerCase()) ? -1 : 1;
            }
        };

        // Sort helper to sort by order.
        // If a row has no order move it at the end. If both rows have no order they will be sorted by name.
        var sortByCustom = function (a, b) {
            if (a.order === undefined && b.order === undefined) {
                return sortByName(a, b);
            } else if (a.order === undefined) {
                return 1;
            } else if (b.order === undefined) {
                return -1;
            } else {
                return a.order - b.order;
            }
        };

        // Sort rows by the specified sort mode (name, order, custom)
        // and by Ascending or Descending
        self.sortRows = function (mode) {
            switch (mode) {
                case "name":
                    self.rows.sort(sortByName);
                    break;
                case "-name":
                    self.rows.reverse(sortByName);
                    break;
                case "date":
                    self.rows.sort(sortByDate);
                    break;
                case "-date":
                    self.rows.reverse(sortByDate);
                    break;
                case "custom":
                    self.rows.sort(sortByCustom);
                    break;
                case "-custom":
                    self.rows.reverse(sortByCustom);
                    break;
                default:
                    self.rows.sort(sortByDate);
                    break;
            }
        };

        // Adds or updates timespans
        self.addTimespans = function(timespans, addEventFn, updateEventFN) {
            for (var i = 0, l = timespans.length; i < l; i++) {
                var timespanData = timespans[i];
                var isUpdate = addTimespan(timespanData);
                var timespan = self.timespansMap[timespanData.id];

                if (isUpdate === true && updateEventFN !== undefined) {
                    updateEventFN(timespan);
                } else if (addEventFn !== undefined) {
                    addEventFn(timespan);
                }

                expandDateRange(timespan.from, timespan.to);
                timespan.updatePosAndSize();
            }

            if (dateRange !== undefined) {
                expandColumns();
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
                timespan = new Timespan(timespanData.id, self, timespanData.subject, timespanData.color,
                    timespanData.classes, timespanData.priority, timespanData.from, timespanData.to, timespanData.data);
                self.timespansMap[timespanData.id] = timespan;
                self.timespans.push(timespan);
            }

            return isUpdate;
        };
    };

    return Gantt;
}]);;gantt.factory('HeaderGenerator', [ 'Column', 'dateFunctions', function (Column, df) {

    var generateHourHeader = function(columns) {
        var generatedHeaders = [];

        var header;
        for (var i = 0, l = columns.length; i < l; i++) {
            var col = columns[i];
            if (i === 0 || columns[i-1].date.getHours() !== col.date.getHours()) {
                header = new Column.Hour(df.clone(col.date), col.left, col.width, col.isWeekend, col.isWorkHour);
                generatedHeaders.push(header);
            } else {
                header.width += col.width;
            }
        }

        return generatedHeaders;
    };

    var generateDayHeader = function(columns) {
        var generatedHeaders = [];

        var header;
        for (var i = 0, l = columns.length; i < l; i++) {
            var col = columns[i];
            if (i === 0 || columns[i-1].date.getDay() !== col.date.getDay()) {
                header = new Column.Day(df.clone(col.date), col.left, col.width, col.isWeekend, col.daysToNextWorkingDay, col.daysToPrevWorkingDay);
                generatedHeaders.push(header);
            } else {
                header.width += col.width;
            }
        }

        return generatedHeaders;
    };

    var generateWeekHeader = function(columns) {
        var generatedHeaders = [];

        var header;
        for (var i = 0, l = columns.length; i < l; i++) {
            var col = columns[i];
            if (i === 0 || df.getWeek(columns[i-1].date) !== df.getWeek(col.date)) {
                header = new Column.Week(df.clone(col.date), col.left, col.width, df.getWeek(col.date));
                generatedHeaders.push(header);
            } else {
                header.width += col.width;
            }
        }

        return generatedHeaders;
    };

    var generateMonthHeader = function(columns) {
        var generatedHeaders = [];

        var header;
        for (var i = 0, l = columns.length; i < l; i++) {
            var col = columns[i];
            if (i === 0 || columns[i-1].date.getMonth() !== col.date.getMonth()) {
                header = new Column.Month(df.clone(col.date), col.left, col.width);
                generatedHeaders.push(header);
            } else {
                header.width += col.width;
            }
        }

        return generatedHeaders;
    };

    return {
        instance: function(viewScale) {
            this.generate = function(columns) {
                var headers = {};

                switch(viewScale) {
                    case 'hour':
                        headers.hour = generateHourHeader(columns);
                        headers.day = generateDayHeader(columns);

                        break;
                    case 'day':
                        headers.day = generateDayHeader(columns);
                        headers.week = generateWeekHeader(columns);
                        headers.month = generateMonthHeader(columns);

                        break;
                    case 'week':
                        headers.week = generateWeekHeader(columns);
                        headers.month = generateMonthHeader(columns);

                        break;
                    case 'month':
                        headers.month = generateMonthHeader(columns);

                        break;
                    default:
                        throw "Unsupported view scale: " + viewScale;
                }

                return headers;
            };
        }
    };
}]);;gantt.factory('Row', ['Task', 'dateFunctions', function (Task, df) {
    var Row = function(id, gantt, description, order, data) {
        var self = this;

        self.id = id;
        self.gantt = gantt;
        self.description = description;
        self.order= order;
        self.tasksMap = {};
        self.tasks = [];
        self.data = data;

        // Adds a task to a specific row. Merges the task if there is already one with the same id
        self.addTask = function(taskData) {
            // Copy to new task (add) or merge with existing (update)
            var task;

            if (taskData.id in self.tasksMap) {
                task = self.tasksMap[taskData.id];
                task.copy(taskData);
            } else {
                task = new Task(taskData.id, self, taskData.subject, taskData.color, taskData.classes, taskData.priority, taskData.from, taskData.to, taskData.data, taskData.est, taskData.lct);
                self.tasksMap[taskData.id] = task;
                self.tasks.push(task);
            }

            self.sortTasks();
            self.setMinMaxDateByTask(task);
            return task;
        };

        // Removes the task from the existing row and adds it to he current one
        self.moveTaskToRow = function(task) {
            task.row.removeTask(task.id);
            self.tasksMap[task.id] = task;
            self.tasks.push(task);
            self.setTasksMinMaxDate();
            task.row = self;
            task.updatePosAndSize();
        };

        // Remove the specified task from the row
        self.removeTask = function(taskId) {
            if (taskId in self.tasksMap) {
                delete self.tasksMap[taskId]; // Remove from map

                for (var i = 0, l = self.tasks.length; i < l; i++) {
                    var task = self.tasks[i];
                    if (task.id === taskId) {
                        self.tasks.splice(i, 1); // Remove from array

                        // Update earliest or latest date info as this may change
                        if (self.minFromDate - task.from === 0 || self.maxToDate - task.to === 0) {
                            self.setTasksMinMaxDate();
                        }

                        return task;
                    }
                }
            }
        };

        // Calculate the earliest from and latest to date of all tasks in a row
        self.setTasksMinMaxDate = function() {
            self.minFromDate = undefined;
            self.maxToDate = undefined;
            for (var j = 0, k = self.tasks.length; j < k; j++) {
                self.setMinMaxDateByTask(self.tasks[j]);
            }
        };

        self.setMinMaxDateByTask = function (task) {
            if (self.minFromDate === undefined) {
                self.minFromDate = df.clone(task.from);
            } else if (task.from < self.minFromDate) {
                self.minFromDate = df.clone(task.from);
            }

            if (self.maxToDate === undefined) {
                self.maxToDate = df.clone(task.to);
            } else if (task.to > self.maxToDate) {
                self.maxToDate = df.clone(task.to);
            }
        };

        self.sortTasks = function() {
            self.tasks.sort(function(t1, t2) { return t1.left - t2.left; });
        };

        self.copy = function(row) {
            self.description = row.description;
            self.data = row.data;

            if (row.order !== undefined) {
                self.order = row.order;
            }
        };

        self.clone = function() {
            var clone = new Row(self.id, self.gantt, self.description, self.order, self.data);
            for (var i = 0, l = self.tasks.length; i < l; i++) {
                clone.addTask(self.tasks[i].clone());
            }

            return clone;
        };
    };

    return Row;
}]);;gantt.factory('Task', ['dateFunctions', function (df) {
    var Task = function(id, row, subject, color, classes, priority, from, to, data, est, lct) {
        var self = this;

        self.id = id;
        self.gantt = row.gantt;
        self.row = row;
        self.subject = subject;
        self.color = color;
        self.classes = classes;
        self.priority = priority;
        self.from = df.clone(from);
        self.to = df.clone(to);
        self.truncatedLeft = false;
        self.truncatedRight = false;
        self.data = data;

        if(est !== undefined && lct !== undefined){
            self.est = df.clone(est);  //Earliest Start Time
            self.lct = df.clone(lct);  //Latest Completion Time
        }

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
                } else {
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
            if (self.gantt.taskOutOfRange !== 'truncate') {
                if (x > self.left + self.width) {
                    x = self.left + self.width;
                } else if (x < 0) {
                    x = 0;
                }
            }

            self.from = self.gantt.getDateByPosition(x, true);
            self.row.setMinMaxDateByTask(self);
            self.updatePosAndSize();
            self.checkIfMilestone();
        };

        // Expands the end of the task to the specified position (in em)
        self.setTo = function(x) {
            if (self.gantt.taskOutOfRange !== 'truncate') {
                if (x < self.left) {
                    x = self.left;
                } else if (x > self.gantt.width) {
                    x = self.gantt.width;
                }
            }

            self.to = self.gantt.getDateByPosition(x, false);
            self.row.setMinMaxDateByTask(self);
            self.updatePosAndSize();
            self.checkIfMilestone();
        };

        // Moves the task to the specified position (in em)
        self.moveTo = function(x) {
            if (self.gantt.taskOutOfRange !== 'truncate') {
                if (x < 0) {
                    x = 0;
                } else if (x + self.width >= self.gantt.width) {
                    x = self.gantt.width - self.width;
                }
            }

            self.from = self.gantt.getDateByPosition(x, true);
            self.to = self.gantt.getDateByPosition(x + self.modelWidth, false);
            self.row.setMinMaxDateByTask(self);
            self.updatePosAndSize();
        };

        self.copy = function(task) {
            self.subject = task.subject;
            self.color = task.color;
            self.classes = task.classes;
            self.priority = task.priority;
            self.from = df.clone(task.from);
            self.to = df.clone(task.to);
            self.est = task.est !== undefined ? df.clone(task.est): undefined;
            self.lct = task.lct !== undefined ? df.clone(task.lct): undefined;
            self.data = task.data;
            self.isMilestone = task.isMilestone;
        };

        self.clone = function() {
            return new Task(self.id, self.row, self.subject, self.color, self.classes, self.priority, self.from, self.to, self.data, self.est, self.lct);
        };
    };

    return Task;
}]);;gantt.factory('Timespan', ['dateFunctions', function (df) {
    var Timespan = function(id, gantt, subject, color, classes, priority, from, to, data, est, lct) {
        var self = this;

        self.id = id;
        self.gantt = gantt;
        self.subject = subject;
        self.color = color;
        self.classes = classes;
        self.priority = priority;
        self.from = df.clone(from);
        self.to = df.clone(to);
        self.data = data;

        if(est !== undefined && lct !== undefined){
            self.est = df.clone(est);  //Earliest Start Time
            self.lct = df.clone(lct);  //Latest Completion Time
        }

        self.hasBounds = function() {
            return self.bounds !== undefined;
        };

        // Updates the pos and size of the timespan according to the from - to date
        self.updatePosAndSize = function() {
            self.left = self.gantt.getPositionByDate(self.from);
            self.width = Math.round( (self.gantt.getPositionByDate(self.to) - self.left) * 10) / 10;

            if (self.est !== undefined && self.lct !== undefined) {
                self.bounds = {};
                self.bounds.left = self.gantt.getPositionByDate(self.est);
                self.bounds.width = Math.round( (self.gantt.getPositionByDate(self.lct) - self.bounds.left) * 10) / 10;
            }
        };

        // Expands the start of the timespan to the specified position (in em)
        self.setFrom = function(x) {
            if (x > self.left + self.width) {
                x = self.left + self.width;
            } else if (x < 0) {
                x = 0;
            }

            self.from = self.gantt.getDateByPosition(x, true);
            self.updatePosAndSize();
        };

        // Expands the end of the timespan to the specified position (in em)
        self.setTo = function(x) {
            if (x < self.left) {
                x = self.left;
            } else if (x > self.gantt.width) {
                x = self.gantt.width;
            }

            self.to = self.gantt.getDateByPosition(x, false);
            self.updatePosAndSize();
        };

        // Moves the timespan to the specified position (in em)
        self.moveTo = function(x) {
            if (x < 0) {
                x = 0;
            } else if (x + self.width >= self.gantt.width) {
                x = self.gantt.width - self.width;
            }

            self.from = self.gantt.getDateByPosition(x, true);
            self.left = self.gantt.getPositionByDate(self.from);

            self.to = self.gantt.getDateByPosition(self.left + self.width, false);
            self.width = Math.round( (self.gantt.getPositionByDate(self.to) - self.left) * 10) / 10;
        };

        self.copy = function(timespan) {
            self.subject = timespan.subject;
            self.color = timespan.color;
            self.classes = timespan.classes;
            self.priority = timespan.priority;
            self.from = df.clone(timespan.from);
            self.to = df.clone(timespan.to);
            self.est = timespan.est !== undefined ? df.clone(timespan.est): undefined;
            self.lct = timespan.lct !== undefined ? df.clone(timespan.lct): undefined;
            self.data = timespan.data;
        };

        self.clone = function() {
            return new Timespan(self.id, self.gantt, self.subject, self.color, self.classes, self.priority, self.from, self.to, self.data, self.est, self.lct);
        };
    };

    return Timespan;
}]);;gantt.service('binarySearch', [ function () {
    // Returns the object on the left and right in an array using the given cmp function.
    // The compare function defined which property of the value to compare (e.g.: c => c.left)

    return {
        getIndicesOnly: function(input, value, comparer) {
            var lo = -1, hi = input.length;
            while (hi - lo > 1) {
                var mid = Math.floor((lo + hi)/2);
                if (comparer(input[mid]) <= value) {
                    lo = mid;
                } else {
                    hi = mid;
                }
            }
            if (input[lo] !== undefined && comparer(input[lo]) === value) hi = lo;
            return [lo, hi];
        },
        get: function(input, value, comparer) {
            var res = this.getIndicesOnly(input, value, comparer);
            return [input[res[0]], input[res[1]]];
        }
    };
}]);;gantt.service('dateFunctions', [ function () {
    // Date calculations from: http://www.datejs.com/ | MIT License
    return {
        isNumber: function(n) { return !isNaN(parseFloat(n)) && isFinite(n); },
        isString: function(o) { return typeof o == "string" || (typeof o == "object" && o.constructor === String);},
        clone: function(date) {
            if (this.isString(date)) {
                return new Date(Date.parse(date));
            } else if (this.isNumber(date)) {
                return new Date(date);
            } else {
                return new Date(date.getTime());
            }
        },
        setTimeZero: function(date, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setHours(0);
            res.setMinutes(0);
            res.setMilliseconds(0);
            return res;
        },
        setTimeComponent: function(date, milliseconds) {
            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0,
                0,
                0,
                milliseconds);
        },
        setToFirstDayOfMonth: function(date, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setDate(1);
            return res;
        },
        setToDayOfWeek: function(date, dayOfWeek, clone, orient) {
            var res = clone === true ? this.clone(date) : date;
            if (res.getDay() === dayOfWeek) {
                return res;
            } else {
                orient = orient || -1;
                var diff = (dayOfWeek - res.getDay() + 7 * (orient || +1)) % 7;
                return this.addDays(res, (diff === 0) ? diff += 7 * (orient || +1) : diff);
            }
        },
        addMonths: function(date, val, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setDate(1);
            res.setMonth(res.getMonth() + val);
            return res;
        },
        addWeeks: function(date, val, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setDate(res.getDate() + val * 7);
            return res;
        },
        addDays: function(date, val, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setDate(res.getDate() + val);
            return res;
        },
        addHours: function(date, val, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setHours(res.getHours() + val);
            return res;
        },
        addMinutes: function(date, val, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setMinutes(res.getMinutes() + val);
            return res;
        },
        addMilliseconds: function(date, val, clone) {
            var res = clone === true ? this.clone(date) : date;
            res.setMilliseconds(res.getMilliseconds() + val);
            return res;
        },
        isTimeZero: function(date) {
            return date.getHours() === 0 && date.getMinutes() === 0 && date.getMinutes() === 0 && date.getMilliseconds() === 0;
        },
        getDaysInMonth: function(date) {
            return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
        },
        getWeek: function(date) {
            /* Returns the number of the week. The number is calculated according to ISO 8106 */
            var $y, $m, $d;
            var a, b, c, d, e, f, g, n, s, w;

            $y = date.getFullYear();
            $m = date.getMonth() + 1;
            $d = date.getDate();

            if ($m <= 2) {
                a = $y - 1;
                b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                s = b - c;
                e = 0;
                f = $d - 1 + (31 * ($m - 1));
            } else {
                a = $y;
                b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                s = b - c;
                e = s + 1;
                f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
            }

            g = (a + b) % 7;
            d = (f + g - e) % 7;
            n = (f + 3 - d) | 0;

            if (n < 0) {
                w = 53 - ((g - s) / 5 | 0);
            } else if (n > 364 + s) {
                w = 1;
            } else {
                w = (n / 7 | 0) + 1;
            }

            $y = $m = $d = null;

            return w;
        }
    };
}]);;gantt.filter('ganttColumnLimit', [ 'binarySearch', function (bs) {
    // Returns only the columns which are visible on the screen

    return function(input, scroll_left, scroll_width) {
        var cmp =  function(c) { return c.left; };
        var start = bs.getIndicesOnly(input, scroll_left, cmp)[0];
        var end = bs.getIndicesOnly(input, scroll_left + scroll_width, cmp)[1];
        return input.slice(start, end);
    };
}]);;gantt.directive('ganttLimitUpdater', ['$timeout', function ($timeout) {
    // Updates the limit filters if the user scrolls the gantt chart

    return {
        restrict: "A",
        controller: ['$scope', '$element', function ($scope, $element) {
            var el = $element[0];
            var update = function() {
                $scope.scroll_start = el.scrollLeft / $scope.getPxToEmFactor();
                $scope.scroll_width = el.offsetWidth / $scope.getPxToEmFactor();
            };

            $element.bind('scroll', function() { $scope.$apply(function() { update(); }); });

            $scope.$watch('gantt.width', function(newValue, oldValue) {
                $timeout(function() {
                    update();
                }, 20, true);
            });
        }]
    };
}]);;gantt.filter('ganttTaskLimit', [function () {
    // Returns only the tasks which are visible on the screen
    // Use the task width and position to decide if a task is still visible

    return function(input, scroll_left, scroll_width) {
        var res = [];
        for(var i = 0, l = input.length; i<l; i++) {
            var task = input[i];
            // If task has a visible part on the screen or if the task is currently being moved/resized by the user
            if (task.left >= scroll_left && task.left <= scroll_left + scroll_width ||
                task.left + task.width >= scroll_left && task.left + task.width <= scroll_left + scroll_width ||
                task.left < scroll_left && task.left + task.width > scroll_left + scroll_width ||
                task.isMoving === true) {
                    res.push(task);
            }
        }

        return res;
    };
}]);;gantt.directive('ganttLabelsResize', ['$document', 'debounce', 'mouseOffset', function ($document, debounce, mouseOffset) {

    return {
        restrict: "A",
        scope: { enabled: "=ganttLabelsResize",
                 width: "=ganttLabelsResizeWidth",
                 minWidth: "=ganttLabelsResizeMinWidth",
                 onResized: "&onLabelsResized" },
        controller: ['$scope', '$element', function ($scope, $element) {
            var resizeAreaWidth = 5;
            var cursor = 'ew-resize';
            var originalPos;

            $element.bind("mousedown", function (e) {
                if ($scope.enabled && isInResizeArea(e)) {
                    enableResizeMode(e);
                    e.preventDefault();
                }
            });

            $element.bind("mousemove", function (e) {
                if ($scope.enabled) {
                    if (isInResizeArea(e)) {
                        $element.css("cursor", cursor);
                    } else {
                        $element.css("cursor", '');
                    }
                }
            });

            var resize = function(x) {
                $scope.$apply(function() {
                    if ($scope.width === 0) {
                        $scope.width = $element[0].offsetWidth;
                    }

                    $scope.width += x - originalPos;
                    if ($scope.width < $scope.minWidth) {
                        $scope.width  = $scope.minWidth;
                    }
                });
                originalPos = x;
            };

            var isInResizeArea = function (e) {
                var x = mouseOffset.getOffset(e).x;

                return x > $element[0].offsetWidth - resizeAreaWidth;
            };

            var enableResizeMode = function (e) {
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

                angular.element($document[0].body).bind("mousemove", moveHandler);

                angular.element($document[0].body).one("mouseup", function() {
                    angular.element($document[0].body).unbind('mousemove', moveHandler);
                    disableResizeMode();
                });
            };

            var disableResizeMode = function () {
                $element.css("cursor", '');

                angular.element($document[0].body).css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': '',
                    'cursor': ''
                });

                $scope.onResized({ width: $scope.width });
            };
        }]
    };
}]);;gantt.directive('ganttRightClick', ['$parse', function ($parse) {

    return {
        restrict: "A",
        compile: function($element, attr) {
            var fn = $parse(attr.ganttRightClick);

            return function(scope, element) {
                element.on('contextmenu', function(event) {
                    scope.$apply(function() {
                        fn(scope, {$event:event});
                    });
                });
            };
        }
    };
}]);;gantt.directive('ganttHorizontalScrollReceiver', function () {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: "A",
        require: "^scrollManager",
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.scrollManager.horizontal.push($element[0]);
        }]
    };
});;gantt.directive('gantScrollManager', function () {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: "A",
        require: "^gantt",
        controller: ['$scope', function($scope){
            $scope.scrollManager = {
                horizontal: [],
                vertical: []
            };
        }]
    };
});;gantt.directive('ganttScrollSender', ['$timeout', function ($timeout) {
    // Updates the element which are registered for the horizontal or vertical scroll event

    return {
        restrict: "A",
        require: "^scrollManager",
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.ganttScroll = $element;
            // Bind scroll event
            $scope.ganttScroll.bind('scroll', $scope.raiseScrollEvent);

            var el = $element[0];
            var updateListeners = function() {
                var i, l;

                for (i = 0, l = $scope.scrollManager.vertical.length; i < l; i++) {
                    var vElement = $scope.scrollManager.vertical[i];
                    if (vElement.style.top !== -el.scrollTop)
                        vElement.style.top = -el.scrollTop + 'px';
                }

                for (i = 0, l = $scope.scrollManager.horizontal.length; i < l; i++) {
                    var hElement = $scope.scrollManager.horizontal[i];
                    if (hElement.style.left !== -el.scrollLeft)
                        hElement.style.left = -el.scrollLeft + 'px';
                }
            };

            $element.bind('scroll', updateListeners);

            $scope.$watch('gantt.width', function(newValue, oldValue) {
                if (newValue === 0) {
                    $timeout(function() {
                        updateListeners();
                    }, 0, true);
                }
            });
        }]
    };
}]);;gantt.directive('ganttVerticalScrollReceiver', function () {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: "A",
        require: "^scrollManager",
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.scrollManager.vertical.push($element[0]);
        }]
    };
});;gantt.service('sortManager', [ function () {
    // Contains the row which the user wants to sort (the one he started to drag)

    return { startRow: undefined };
}]);;gantt.directive('ganttSortable', ['$document', 'sortManager', function ($document, sortManager) {
    // Provides the row sort functionality to any Gantt row
    // Uses the sortableState to share the current row

    return {
        restrict: "E",
        template: "<div ng-transclude></div>",
        replace: true,
        transclude: true,
        scope: { row: "=ngModel", swap: "&", active: "=?" },
        controller: ['$scope', '$element', function ($scope, $element) {
            $element.bind("mousedown", function () {
                if ($scope.active !== true) {
                    return;
                }

                enableDragMode();

                var disableHandler = function () {
                    $scope.$apply(function() {
                        angular.element($document[0].body).unbind('mouseup', disableHandler);
                        disableDragMode();
                    });
                };
                angular.element($document[0].body).bind("mouseup", disableHandler);
            });

            $element.bind("mousemove", function (e) {
                if (isInDragMode()) {
                    var elementBelowMouse = angular.element($document[0].elementFromPoint(e.clientX, e.clientY));
                    var targetRow = elementBelowMouse.controller("ngModel").$modelValue;

                    $scope.$apply(function() {
                        $scope.swap({a: targetRow, b: sortManager.startRow});
                    });
                }
            });

            var isInDragMode = function () {
                return sortManager.startRow !== undefined && !angular.equals($scope.row, sortManager.startRow);
            };

            var enableDragMode = function () {
                sortManager.startRow = $scope.row;
                $element.css("cursor", "move");
                angular.element($document[0].body).css({
                    '-moz-user-select': '-moz-none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'cursor': 'no-drop'
                });
            };

            var disableDragMode = function () {
                sortManager.startRow = undefined;
                $element.css("cursor", "pointer");
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
}]);;gantt.directive('ganttBounds', [function () {
    // Displays a box representing the earliest allowable start time and latest completion time for a job

    return {
        restrict: "E",
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "default.bounds.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        scope: { task: "=ngModel" },
        controller: ['$scope', '$element', function ($scope, $element) {
            var css = {};

            if(!$scope.task.hasBounds()) {
               $scope.visible = false;
            }

            $scope.getCss = function() {
                if($scope.task.hasBounds()){
                    css.width = $scope.task.bounds.width + 'em';

                    if($scope.task.isMilestone === true || $scope.task.width === 0)
                        css.left = ($scope.task.bounds.left-($scope.task.left-0.3)) + 'em';
                    else
                        css.left = ($scope.task.bounds.left - $scope.task.left) + 'em';
                }

                return css;
            };

            $scope.getClass = function() {
                if($scope.task.est === undefined || $scope.task.lct === undefined)
                    return 'gantt-task-bounds-in';
                else if($scope.task.est > $scope.task.from)
                    return 'gantt-task-bounds-out';
                else if($scope.task.lct < $scope.task.to)
                    return 'gantt-task-bounds-out';
                else
                    return 'gantt-task-bounds-in';
            };

            $scope.$watch("task.isMouseOver", function () {
                if ($scope.task.hasBounds() && !$scope.task.isMoving) {
                    $scope.visible = !($scope.task.isMouseOver === undefined || $scope.task.isMouseOver === false);
                }
            });

            $scope.$watch("task.isMoving", function(newValue, oldValue) {
                if ($scope.task.hasBounds()) {
                    $scope.visible = newValue === true;
                }
            });
        }]
    };
}]);;gantt.directive('ganttTask', ['$window', '$document', '$timeout', 'smartEvent', 'debounce', 'dateFunctions', 'mouseOffset', 'mouseButton', function ($window, $document, $timeout, smartEvent, debounce, df, mouseOffset, mouseButton) {

    return {
        restrict: "E",
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "default.task.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        controller: ['$scope', '$element', function ($scope, $element) {
            var resizeAreaWidthBig = 5;
            var resizeAreaWidthSmall = 3;
            var scrollSpeed = 15;
            var scrollTriggerDistance = 5;

            var windowElement = angular.element($window);
            var ganttBodyElement = $element.parent().parent();
            var ganttScrollElement = ganttBodyElement.parent().parent();
            var taskHasBeenChanged = false;
            var mouseOffsetInEm;
            var moveStartX;
            var scrollInterval;

            $element.bind('mousedown', function (e) {
                $scope.$apply(function() {
                    var mode = getMoveMode(e);
                    if (mode !== "" && mouseButton.getButton(e) === 1) {
                        var offsetX = mouseOffset.getOffsetForElement(ganttBodyElement[0], e).x;
                        enableMoveMode(mode, offsetX);
                    }
                });
            });

            $element.bind('click', function (e) {
                $scope.$apply(function() {
                    // Only raise click event if there was no task update event
                    if (!taskHasBeenChanged) {
                        $scope.raiseTaskClickedEvent(e, $scope.task);
                    }

                    e.stopPropagation();
                });
            });

            $element.bind('dblclick', function (e) {
                $scope.$apply(function() {
                    // Only raise dbl click event if there was no task update event
                    if (!taskHasBeenChanged) {
                        $scope.raiseTaskDblClickedEvent(e, $scope.task);
                    }

                    e.stopPropagation();
                });
            });

            $element.bind('contextmenu', function (e) {
                $scope.$apply(function() {
                    // Only raise click event if there was no task update event
                    if (!taskHasBeenChanged) {
                        $scope.raiseTaskContextMenuEvent(e, $scope.task);
                    }

                    e.stopPropagation();
                });
            });

            $element.bind("mousemove", debounce(function (e) {
                var mode = getMoveMode(e);
                if (mode !== "" && mode !== "M") {
                    $element.css("cursor", getCursor(mode));
                } else {
                    $element.css("cursor", '');
                }

                $scope.task.mouseX = e.clientX;
            }, 5));

            $element.bind('mouseenter', function (e) {
                $scope.$apply(function() {
                    $scope.task.mouseX = e.clientX;
                    $scope.task.isMouseOver = true;
                });
            });

            $element.bind('mouseleave', function () {
                $scope.$apply(function() {
                    $scope.task.isMouseOver = false;
                });
            });

            var handleMove = function(mode, mousePos) {
                if ($scope.task.isMoving === false) {
                    return;
                }

                moveTask(mode, mousePos);
                scrollScreen(mode, mousePos);
            };

            var moveTask = function(mode, mousePos) {
                $scope.task.mouseOffsetX = mousePos.x;
                var xInEm = mousePos.x / $scope.getPxToEmFactor();
                if (mode === "M") {
                    if ($scope.allowTaskRowSwitching) {
                        var targetRow = getRowByY(mousePos.y);
                        if (targetRow !== undefined && $scope.task.row.id !== targetRow.id) {
                            targetRow.moveTaskToRow($scope.task);
                        }
                    }

                    if ($scope.allowTaskMoving) {
                        $scope.task.moveTo(xInEm - mouseOffsetInEm);
                    }
                } else if (mode === "E") {
                    $scope.task.setTo(xInEm);
                } else {
                    $scope.task.setFrom(xInEm);
                }

                taskHasBeenChanged = true;
            };

            var scrollScreen = function(mode, mousePos) {
                var leftScreenBorder = ganttScrollElement[0].scrollLeft;
                var keepOnScrolling = false;

                if (mousePos.x < moveStartX) {
                    // Scroll to the left
                    if (mousePos.x <= leftScreenBorder + scrollTriggerDistance) {
                        mousePos.x -= scrollSpeed;
                        keepOnScrolling = true;
                        $scope.scrollLeft(scrollSpeed);
                    }
                } else {
                    // Scroll to the right
                    var screenWidth = ganttScrollElement[0].offsetWidth;
                    var rightScreenBorder = leftScreenBorder + screenWidth;

                    if (mousePos.x >= rightScreenBorder - scrollTriggerDistance) {
                        mousePos.x += scrollSpeed;
                        keepOnScrolling = true;
                        $scope.scrollRight(scrollSpeed);
                    }
                }

                if (keepOnScrolling) {
                    scrollInterval = $timeout(function() { handleMove(mode, mousePos); }, 100, true);
                }
            };

            var clearScrollInterval = function() {
                if (scrollInterval !== undefined) {
                    $timeout.cancel(scrollInterval);
                    scrollInterval = undefined;
                }
            };

            var getRowByY = function(y) {
                var rowHeight = ganttBodyElement[0].offsetHeight / $scope.task.row.gantt.rows.length;
                var pos = Math.floor(y / rowHeight);
                return $scope.task.row.gantt.rows[pos];
            };

            var getMoveMode = function (e) {
                var x = mouseOffset.getOffset(e).x;

                var distance = 0;

                // Define resize&move area. Make sure the move area does not get too small.
                if ($scope.allowTaskResizing) {
                    distance = $element[0].offsetWidth < 10 ? resizeAreaWidthSmall: resizeAreaWidthBig;
                }

                if ($scope.allowTaskResizing && x > $element[0].offsetWidth - distance) {
                    return "E";
                } else if ($scope.allowTaskResizing && x < distance) {
                    return "W";
                } else if (($scope.allowTaskMoving || $scope.allowTaskRowSwitching) && x >= distance && x <= $element[0].offsetWidth - distance) {
                    return "M";
                } else {
                    return "";
                }
            };

            var getCursor = function(mode) {
                switch(mode) {
                    case "E": return 'e-resize';
                    case "W": return 'w-resize';
                    case "M": return 'move';
                }
            };

            var enableMoveMode = function (mode, x) {
                // Raise task move start event
                if(!$scope.task.isMoving) {
                    if (mode === "M")
                        $scope.raiseTaskMoveStartEvent($scope.task);
                    else
                        $scope.raiseTaskResizeStartEvent($scope.task);
                }

                // Init task move
                taskHasBeenChanged = false;
                $scope.task.moveMode = mode;
                $scope.task.isMoving = true;
                moveStartX = x;
                var xInEm = moveStartX / $scope.getPxToEmFactor();
                mouseOffsetInEm = xInEm - $scope.task.modelLeft;

                // Add move event handlers
                var taskMoveHandler = debounce(function(e) {
                  $timeout(function() {
                    var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], e);
                    clearScrollInterval();
                    handleMove(mode, mousePos);
                  });
                }, 5);
                smartEvent($scope, windowElement, 'mousemove', taskMoveHandler).bind();

                smartEvent($scope, windowElement, 'mouseup', function() {
                    $scope.$apply(function() {
                        windowElement.unbind('mousemove', taskMoveHandler);
                        disableMoveMode();
                    });
                }).bindOnce();

                // Show mouse move/resize cursor
                angular.element($document[0].body).css({
                    '-moz-user-select': '-moz-none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'cursor': getCursor(mode)
                });
            };

            var disableMoveMode = function () {
                $scope.task.isMoving = false;

                // Stop any active auto scroll
                clearScrollInterval();

                // Set mouse cursor back to default
                $element.css("cursor", '');
                angular.element($document[0].body).css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': '',
                    'cursor': ''
                });

                // Raise move end event
                if($scope.task.moveMode==="M")
                    $scope.raiseTaskMoveEndEvent($scope.task);
                else
                    $scope.raiseTaskResizeEndEvent($scope.task);

                $scope.task.modeMode = null;

                // Raise task changed event
                if (taskHasBeenChanged === true) {
                    $scope.task.row.sortTasks(); // Sort tasks so they have the right z-order
                    $scope.raiseTaskUpdatedEvent($scope.task, true);
                }
            };

            if ($scope.task.isCreating) {
                delete $scope.task.isCreating;
                enableMoveMode("E", $scope.task.mouseOffsetX);
            } else if ($scope.task.isMoving) {
                // In case the task has been moved to another row a new controller is is created by angular.
                // Enable the move mode again if this was the case.
                enableMoveMode("M", $scope.task.mouseOffsetX);
            }



        }]
    };
}]);
;gantt.directive('ganttTooltip', ['$timeout', '$document', 'debounce', 'smartEvent', function ($timeout, $document, debounce, smartEvent) {
    // This tooltip displays more information about a task

    return {
        restrict: "E",
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "default.tooltip.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },
        replace: true,
        scope: { task: "=ngModel" },
        controller: ['$scope', '$element', function ($scope, $element) {
            var bodyElement = angular.element($document[0].body);
            var parentElement = $element.parent();
            $scope.visible = false;
            $scope.css = {};

            $scope.$watch("task.isMouseOver", function(newValue, oldValue) {
                if (newValue === true) {
                    showTooltip($scope.task.mouseX);
                } else if (newValue === false && $scope.task.isMoving === false) {
                    hideTooltip();
                }
            });

            var mouseMoveHandler = smartEvent($scope, bodyElement, 'mousemove', debounce(function (e) {
                if ($scope.visible === true) {
                    updateTooltip(e.clientX);
                } else {
                    showTooltip(e.clientX);
                }
            }, 1));

            $scope.$watch("task.isMoving", function(newValue, oldValue) {
                if (newValue === true) {
                    mouseMoveHandler.bind();
                } else if (newValue === false ) {
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

                $timeout(function () {
                    updateTooltip(x);

                    $scope.css.top = parentElement[0].getBoundingClientRect().top + "px";
                    $scope.css.marginTop = -$element[0].offsetHeight - 8 + "px";
                    $scope.css.opacity = 1;
                }, 1, true);
            };

            var updateTooltip = function(x) {
                $element.removeClass('gantt-task-infoArrow');
                $element.removeClass('gantt-task-infoArrowR');

                // Check if info is overlapping with view port
                if (x + $element[0].offsetWidth > getViewPortWidth()) {
                    $scope.css.left = (x + 20 - $element[0].offsetWidth) + "px";
                    $element.addClass('gantt-task-infoArrowR'); // Right aligned info
                } else {
                    $scope.css.left = (x - 20) + "px";
                    $element.addClass('gantt-task-infoArrow');
                }
            };

            var hideTooltip = function() {
                $scope.css.opacity = 0;
                $scope.visible = false;
            };
        }]
    };
}]);;gantt.factory('debounce',['$timeout', function ($timeout) {
    function debounce(fn, timeout) {
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
            return $timeout(later, timeout, true);
        };
    }

    return debounce;
}]);;gantt.factory('keepScrollPos',['$timeout', function ($timeout) {
    // Make sure the scroll position will be at the same place after the tasks or columns changed

    function keepScrollPos($scope, fn) {
        return function() {
            if ($scope.ganttScroll) {
                var el = $scope.ganttScroll[0];

                // Save scroll position
                var oldScrollLeft = el.scrollLeft;
                var left = $scope.gantt.getFirstColumn();
                var pxToEmFactor = $scope.getPxToEmFactor();

                // Execute Gantt changes
                fn.apply(this, arguments);

                // Re-apply scroll position
                left = left === undefined ? 0: $scope.gantt.getColumnByDate(left.date).left * pxToEmFactor;
                el.scrollLeft = left + oldScrollLeft;

                // Workaround: Set scrollLeft again after the DOM has changed as the assignment of scrollLeft before may not have worked when the scroll area was too tiny.
                if (el.scrollLeft != left + oldScrollLeft) {
                    $timeout(function() {
                        el.scrollLeft = left + oldScrollLeft;
                    }, 0, false);
                }
            } else {
                // Execute Gantt changes
                fn.apply(this, arguments);
            }
        };
    }

    return keepScrollPos;
}]);;gantt.service('mouseButton', [ function () {
    // Mouse button cross browser normalization

    return {
        getButton: function(e) {
            e = e || window.event;

            if (!e.which) {
                return e.button < 2 ? 1: e.button == 4 ? 2: 3;
            } else {
                return e.which;
            }
        }
    };
}]);;gantt.service('mouseOffset', [ function () {
    // Mouse offset support for lesser browsers (read IE 8)

    return {
        getOffset: function(evt) {
            if (evt.offsetX && evt.offsetY) {
                return { x: evt.offsetX, y: evt.offsetY };
            } if (evt.layerX && evt.layerY) {
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
}]);;gantt.factory('smartEvent',[function () {
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
//# sourceMappingURL=angular-gantt.js.map