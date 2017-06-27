/*
 Project: Gantt chart for Angular.js
 Author: Marco Schweighauser (2013)
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
            columnWidth: "=?", // Defines the size of a column, 1 being 1em per unit (hour or day, .. depending on scale),
            columnSubScale: "=?", // Defines how precise tasks should be positioned inside columns. 4 = in quarter steps, 2 = in half steps, ... Use values higher than 24 or 60 (hour view) to display them very accurate. Default (4)
            allowTaskMoving: "=?", // Set to true if tasks should be moveable by the user.
            allowTaskResizing: "=?", // Set to true if tasks should be resizable by the user.
            allowRowSorting: "=?", // Set to true if the user should be able to re-order rows.
            fromDate: "=?", // If not specified will use the earliest task date (note: as of now this can only expand not shrink)
            toDate: "=?", // If not specified will use the latest task date (note: as of now this can only expand not shrink)
            firstDayOfWeek: "=?", // 0=Sunday, 1=Monday, ... Default (1)
            weekendDays: "=?", // Array of days: 0=Sunday, 1=Monday, ... Default ([0,6])
            showWeekends: "=?", // True if the weekends shall be displayed Default (true)
            workHours: "=?", // Array of valid work hours. Default ([8,9,..,16] equals a 8am - 17pm workday)
            showNonWorkHours: "=?", // True if the non work hours shall be displayed Default (true)
            autoExpand: "=?", // Set this true if the date range shall expand if the user scroll to the left or right end.
            maxHeight: "=?", // Define the maximum height of the Gantt in PX. > 0 to activate max height behaviour.
            labelsWidth: "=?", // Define the width of the labels section. Changes when the user resizes the labels width
            data: "=?",
            loadData: "&",
            removeData: "&",
            clearData: "&",
            centerDate: "&",
            onGanttReady: "&",
            onRowAdded: "&",
            onRowClicked: "&",
            onRowUpdated: "&",
            onScroll: "&",
            onTaskClicked: "&",
            onTaskUpdated: "&"
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            // Initialize defaults
            if ($scope.sortMode === undefined) $scope.sortMode = "name";
            if ($scope.viewScale === undefined) $scope.viewScale = "day";
            if ($scope.columnWidth === undefined) $scope.columnWidth = 2;
            if ($scope.columnSubScale === undefined) $scope.columnSubScale = 4;
            if ($scope.allowTaskMoving === undefined) $scope.allowTaskMoving = true;
            if ($scope.allowTaskResizing === undefined) $scope.allowTaskResizing = true;
            if ($scope.allowRowSorting === undefined) $scope.allowRowSorting = true;
            if ($scope.firstDayOfWeek === undefined) $scope.firstDayOfWeek = 1;
            if ($scope.weekendDays === undefined) $scope.weekendDays = [0,6];
            if ($scope.showWeekends === undefined) $scope.showWeekends = true;
            if ($scope.workHours === undefined) $scope.workHours = [8,9,10,11,12,13,14,15,16];
            if ($scope.showNonWorkHours === undefined) $scope.showNonWorkHours = true;
            if ($scope.maxHeight === undefined) $scope.maxHeight = 0;
            if ($scope.autoExpand === undefined) $scope.autoExpand = false;
            if ($scope.labelsWidth === undefined) $scope.labelsWidth = 0;

            // Gantt logic
            $scope.gantt = new Gantt($scope.viewScale, $scope.columnWidth, $scope.columnSubScale, $scope.firstDayOfWeek, $scope.weekendDays, $scope.showWeekends, $scope.workHours, $scope.showNonWorkHours);
            $scope.gantt.expandDefaultDateRange($scope.fromDate, $scope.toDate);
            $scope.ganttScroll = angular.element($element.children()[2]);

            $scope.$watch("sortMode", function (newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.sortRows();
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
            $scope.$watch('viewScale+columnWidth+columnSubScale+fromDate+toDate+firstDayOfWeek+weekendDays+showWeekends+workHours+showNonWorkHours', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.gantt.setViewScale($scope.viewScale, $scope.columnWidth, $scope.columnSubScale, $scope.firstDayOfWeek, $scope.weekendDays, $scope.showWeekends, $scope.workHours, $scope.showNonWorkHours);
                    $scope.gantt.reGenerateColumns();
                }
            });

            $scope.$watch('fromDate+toDate', function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                    $scope.gantt.expandDefaultDateRange($scope.fromDate, $scope.toDate);
                }
            });

            $scope.getPxToEmFactor = function() {
                return $scope.ganttScroll.children()[0].offsetWidth / $scope.gantt.width;
            };

            // Swaps two rows and changes the sort order to custom to display the swapped rows
            $scope.swapRows = function (a, b) {
                $scope.gantt.swapRows(a, b);

                // Raise change events
                $scope.raiseRowUpdatedEvent(a);
                $scope.raiseRowUpdatedEvent(b);

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
                if ($scope.autoExpand !== true) {
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

            $scope.raiseRowAddedEvent = function(row) {
                $scope.onRowAdded({ event: { row: row } });
            };

            $scope.raiseDOMRowClickedEvent = function(e, row) {
                var x = mouseOffset.getOffset(e).x;
                var xInEm = x / $scope.getPxToEmFactor();
                var clickedColumn = $scope.gantt.getColumnByPosition(xInEm);
                var date = $scope.gantt.getDateByPosition(xInEm);

                $scope.raiseRowClickedEvent(row, clickedColumn, date);

                e.stopPropagation();
                e.preventDefault();
            };

            $scope.raiseRowClickedEvent = function(row, column, date) {
                $scope.onRowClicked({ event: { row: row, column: column.clone(), date: date } });
            };

            $scope.raiseRowUpdatedEvent = function(row) {
                $scope.onRowUpdated({ event: { row: row } });
            };

            $scope.raiseScrollEvent = debounce(function() {
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
                    $scope.onScroll({ event: { date: date, direction: direction }});
                }
            }, 5);

            $scope.raiseDOMTaskClickedEvent = function(e, task) {
                $scope.raiseTaskClickedEvent(task);

                e.stopPropagation();
                e.preventDefault();
            };

            $scope.raiseTaskClickedEvent = function(task) {
                $scope.onTaskClicked({ event: { task: task } });
            };

            $scope.raiseTaskUpdatedEvent = function(task) {
                $scope.onTaskUpdated({ event: { task: task } });
            };

            $scope.setData = keepScrollPos($scope, function (data) {
                for (var i = 0, l = data.length; i < l; i++) {
                    var rowData = data[i];
                    var isUpdate = $scope.gantt.addRow(rowData);
                    var row = $scope.gantt.rowsMap[rowData.id];

                    if (isUpdate === true) {
                        $scope.raiseRowUpdatedEvent(row);
                    } else {
                        $scope.raiseRowAddedEvent(row);
                    }
                }

                $scope.sortRows();
            });

            // Remove data handler.
            // If a row has no tasks inside the complete row will be deleted.
            $scope.removeData({ fn: function(data) {
                for (var i = 0, l = data.length; i < l; i++) {
                    var rowData = data[i];

                    if (rowData.tasks !== undefined && rowData.tasks.length > 0) {
                        // Only delete the specified tasks but not the row and the other tasks

                        if (rowData.id in $scope.gantt.rowsMap) {
                            var row = $scope.gantt.rowsMap[rowData.id];

                            for (var j = 0, k = rowData.tasks.length; j < k; j++) {
                                row.removeTask(rowData.tasks[j].id);
                            }

                            $scope.raiseRowUpdatedEvent(row);
                        }
                    } else {
                        // Delete the complete row
                        $scope.gantt.removeRow(rowData.id);
                    }
                }

                $scope.sortRows();
            }});

            // Clear all existing rows and tasks
            $scope.removeAllData = function() {
                $scope.gantt.removeRows();
            };

            // Bind scroll event
            $scope.ganttScroll.bind('scroll', $scope.raiseScrollEvent);

            // Load data handler.
            // The Gantt chart will keep the current view position if this function is called during scrolling.
            $scope.loadData({ fn: $scope.setData});

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

        column.getDateByPosition = function(position) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            var day = Math.round(calcDbyP(column, column.daysInWeek, position));

            // If day === 7, then jump forward to next week
            var direction = day !== 7 && day < column.firstDayOfWeek ? -1: 1; // -1: <<<<< | 1: >>>>>

            df.setToDayOfWeek(res, day !== 7 ? firstDayIsSunday(day): firstDayIsSunday(day) + 7, false, direction);
            return res;
        };

        column.getPositionByDate = function(date) {
            return calcPbyD(column, date, column.daysInWeek, firstDayIs0(date.getDay()), df.getWeek(date), df.getWeek(column.date));
        };

        return column;
    };

    var DayColumn = function(date, left, width, subScale, isWeekend) {
        var column = new Column(date, left, width, subScale);
        column.isWeekend = isWeekend;

        column.clone = function() {
            var copy = new Column(column.date, column.left, column.width, column.subScale);
            copy.isWeekend = column.isWeekend;
            return copy;
        };

        column.getDateByPosition = function(position) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            res.setHours(calcDbyP(column, 24, position));
            return res;
        };

        column.getPositionByDate = function(date) {
            return calcPbyD(column, date, 24, date.getHours(), date.getDate(), column.date.getDate());
        };

        return column;
    };

    var HourColumn = function(date, left, width, subScale, isWeekend, isWorkHour) {
        var column = new Column(date, left, width, subScale);
        column.isWeekend = isWeekend;
        column.isWorkHour = isWorkHour;

        column.clone = function() {
            var copy = new Column(column.date, column.left, column.width, column.subScale);
            copy.isWeekend = column.isWeekend;
            copy.isWorkHour = column.isWorkHour;
            return copy;
        };

        column.getDateByPosition = function(position) {
            if (position < 0) position = 0;
            if (position > column.width) position = column.width;

            var res = df.clone(column.date);
            res.setMinutes(calcDbyP(column, 60, position));
            return res;
        };

        column.getPositionByDate = function(date) {
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

    // Returns true if the given day is a weekend day
    var checkIsWeekend = function(weekendDays, day) {
        for (var i = 0, l = weekendDays.length; i < l; i++) {
            if (weekendDays[i] === day) {
                return true;
            }
        }

        return false;
    };

    // Returns true if the given hour is a work hour
    var checkIsWorkHour = function(workHours, hour) {
        for (var i = 0, l = workHours.length; i < l; i++) {
            if (workHours[i] === hour) {
                return true;
            }
        }

        return false;
    };


    var HourColumnGenerator = function(columnWidth, columnSubScale, weekendDays, showWeekends, workHours, showNonWorkHours) {
        // Generates the columns between from and to date. The task will later be places between the matching columns.
        this.generate = function(from, to) {
            var excludeTo = df.isTimeZero(to);
            from = df.setTimeZero(from, true);
            to = df.setTimeZero(to, true);

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;

            while(excludeTo && to - date > 0 || !excludeTo && to - date >= 0) {
                var isWeekend = checkIsWeekend(weekendDays, date.getDay());

                for (var i = 0; i<24; i++) {
                    var cDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0);
                    var isWorkHour = checkIsWorkHour(workHours, i);

                    if ((isWeekend && showWeekends || !isWeekend) && (!isWorkHour && showNonWorkHours || isWorkHour)) {
                        generatedCols.push(new Column.Hour(cDate, left, columnWidth, columnSubScale, isWeekend, isWorkHour));
                        left += columnWidth;
                    }
                }

                date = df.addDays(date, 1);
            }

            return generatedCols;
        };
    };

    var DayColumnGenerator = function(columnWidth, columnSubScale, weekendDays, showWeekends) {
        this.generate = function(from, to) {
            var excludeTo = df.isTimeZero(to);
            from = df.setTimeZero(from, true);
            to = df.setTimeZero(to, true);

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;

            while(excludeTo && to - date > 0 || !excludeTo && to - date >= 0) {
                var isWeekend = checkIsWeekend(weekendDays, date.getDay());

                if (isWeekend && showWeekends || !isWeekend) {
                    generatedCols.push(new Column.Day(df.clone(date), left, columnWidth, columnSubScale, isWeekend));
                    left += columnWidth;
                }

                date = df.addDays(date, 1);
            }

            return generatedCols;
        };
    };

    var WeekColumnGenerator = function(columnWidth, columnSubScale, firstDayOfWeek) {
        this.generate = function(from, to) {
            var excludeTo = to.getDay() === firstDayOfWeek && df.isTimeZero(to);
            from = df.setToDayOfWeek(df.setTimeZero(from, true), firstDayOfWeek, false);
            to = df.setToDayOfWeek(df.setTimeZero(to, true), firstDayOfWeek, false);

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;

            while(excludeTo && to - date > 0 || !excludeTo && to - date >= 0) {
                generatedCols.push(new Column.Week(df.clone(date), left, columnWidth, columnSubScale, firstDayOfWeek));
                left += columnWidth;

                date = df.addWeeks(date, 1);
            }

            return generatedCols;
        };
    };

    var MonthColumnGenerator = function(columnWidth, columnSubScale) {
        this.generate = function(from, to) {
            var excludeTo = to.getDate() === 1 && df.isTimeZero(to);
            from = df.setToFirstDayOfMonth(df.setTimeZero(from, true), false);
            to = df.setToFirstDayOfMonth(df.setTimeZero(to, true), false);

            var date = df.clone(from);
            var generatedCols = [];
            var left = 0;

            while(excludeTo && to - date > 0 || !excludeTo && to - date >= 0) {
                generatedCols.push(new Column.Month(df.clone(date), left, columnWidth, columnSubScale));
                left += columnWidth;

                date = df.addMonths(date, 1);
            }

            return generatedCols;
        };
    };

    return {
        HourGenerator: HourColumnGenerator,
        DayGenerator: DayColumnGenerator,
        WeekGenerator: WeekColumnGenerator,
        MonthGenerator: MonthColumnGenerator
    };
}]);;gantt.factory('Gantt', ['Row', 'ColumnGenerator', 'HeaderGenerator', 'dateFunctions', 'binarySearch', function (Row, ColumnGenerator, HeaderGenerator, df, bs) {

    // Gantt logic. Manages the columns, rows and sorting functionality.
    var Gantt = function(viewScale, columnWidth, columnSubScale, firstDayOfWeek, weekendDays, showWeekends, workHours, showNonWorkHours) {
        var self = this;

        self.rowsMap = {};
        self.rows = [];
        self.columns = [];
        self.headers = {};
        self.width = 0;
        var dateRange;

        // Sets the Gantt view scale. Call reGenerateColumns to make changes visible after changing the view scale.
        // The headers are shown depending on the defined view scale.
        self.setViewScale = function(viewScale, columnWidth, columnSubScale, firstDayOfWeek, weekendDays, showWeekends, workHours, showNonWorkHours) {
            switch(viewScale) {
                case 'hour': self.columnGenerator = new ColumnGenerator.HourGenerator(columnWidth, columnSubScale, weekendDays, showWeekends, workHours, showNonWorkHours); break;
                case 'day': self.columnGenerator = new ColumnGenerator.DayGenerator(columnWidth, columnSubScale, weekendDays, showWeekends); break;
                case 'week': self.columnGenerator = new ColumnGenerator.WeekGenerator(columnWidth, columnSubScale, firstDayOfWeek); break;
                case 'month': self.columnGenerator = new ColumnGenerator.MonthGenerator(columnWidth, columnSubScale); break;
                default:
                    throw "Unsupported view scale: " + viewScale;
            }

            self.headerGenerator = new HeaderGenerator.instance(viewScale);
        };

        self.setViewScale(viewScale, columnWidth, columnSubScale, firstDayOfWeek, weekendDays, showWeekends, workHours, showNonWorkHours);

        // Expands the default date range. Even if there tasks are smaller the specified date range is shown.
        self.expandDefaultDateRange = function(from, to) {
            if (from !== undefined && to !== undefined) {
                expandDateRange(from, to);
                expandColumns();
            }
        };

        var expandDateRange = function(from, to) {
            from = df.clone(from);
            to = df.clone(to);

            if (dateRange === undefined) {
                dateRange = {};
                dateRange.from = from;
                dateRange.to = to;
            } else {
                if (from < dateRange.from) {
                    dateRange.from = from;
                }

                if (to > dateRange.to) {
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
            } else if (self.getFirstColumn().date > dateRange.from || self.getLastColumn().date < dateRange.to) {
                var minFrom = self.getFirstColumn().date > dateRange.from ? dateRange.from: self.getFirstColumn().date;
                var maxTo = self.getLastColumn().date < dateRange.to ? dateRange.to: self.getLastColumn().date;

                expandColumnsNoCheck(minFrom, maxTo);
            }
        };

        // Generates the Gantt columns according to the specified from - to date range. Uses the currently assigned column generator.
        var expandColumnsNoCheck = function(from ,to) {
            self.columns = self.columnGenerator.generate(from, to);
            self.headers = self.headerGenerator.generate(self.columns);
            self.updateTasksPosAndSize();

            var lastColumn = self.getLastColumn();
            self.width = lastColumn !== undefined ? lastColumn.left + lastColumn.width: 0;
        };

        // Removes all existing columns and re-generates them. E.g. after e.g. the view scale changed.
        self.reGenerateColumns = function() {
            self.columns = [];
            expandColumns();
        };

        // Update the position/size of all tasks in the Gantt
        self.updateTasksPosAndSize = function() {
            for (var i = 0, l = self.rows.length; i < l; i++) {
                for (var j = 0, k = self.rows[i].tasks.length; j < k; j++) {
                    self.rows[i].tasks[j].updatePosAndSize();
                }
            }
        };

        // Returns the first Gantt column or undefined
        self.getLastColumn = function() {
            if (self.columns.length > 0) {
                return self.columns[self.columns.length-1];
            } else {
                return undefined;
            }
        };

        // Returns the last Gantt column or undefined
        self.getFirstColumn = function() {
            if (self.columns.length > 0) {
                return self.columns[0];
            } else {
                return undefined;
            }
        };

        // Returns the column at the given date
        self.getColumnByDate = function(date) {
            return bs.get(self.columns, date, function(c) { return c.date; })[0];
        };

        // Returns the column at the given position x (in em)
        self.getColumnByPosition = function(x) {
            return bs.get(self.columns, x, function(c) { return c.left; })[0];
        };

        // Returns the exact column date at the given position x (in em)
        self.getDateByPosition = function(x) {
            var column = self.getColumnByPosition(x);
            if (column !== undefined) {
                return column.getDateByPosition(x - column.left);
            } else {
                return undefined;
            }
        };

        // Returns the position inside the Gantt calculated by the given date
        self.getPositionByDate = function(date) {
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

        // Adds a row to the list of rows. Merges the row and it tasks if there is already one with the same id
        self.addRow = function(rowData) {
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

            if (rowData.tasks !== undefined) {
                for (var i = 0, l = rowData.tasks.length; i < l; i++) {
                    var task = row.addTask(rowData.tasks[i]);
                    expandDateRange(task.from, task.to);
                    task.updatePosAndSize();
                }

                expandColumns();
            }

            return isUpdate;
        };

        // Removes the complete row including all tasks
        self.removeRow = function(rowId) {
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
        self.removeRows = function() {
            self.rowsMap = {};
            self.rows = [];
            self.highestRowOrder = 0;
            self.columns = [];
            dateRange = undefined;
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

        // Sort helper to sort by description name
        var sortByName = function (a, b) {
            if (a.description === b.description) {
                return 0;
            } else {
                return (a.description < b.description) ? -1 : 1;
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
        self.sortRows = function (mode) {
            switch (mode) {
                case "name":
                    self.rows.sort(sortByName);
                    break;
                case "custom":
                    self.rows.sort(sortByCustom);
                    break;
                default:
                    self.rows.sort(sortByDate);
                    break;
            }
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
                header = new Column.Day(df.clone(col.date), col.left, col.width, col.isWeekend);
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
                task = new Task(taskData.id, self, taskData.subject, taskData.color, taskData.from, taskData.to, taskData.data);
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
    var Task = function(id, row, subject, color, from, to, data) {
        var self = this;

        self.id = id;
        self.gantt = row.gantt;
        self.row = row;
        self.subject = subject;
        self.color = color;
        self.from = df.clone(from);
        self.to = df.clone(to);
        self.data = data;

        self.checkIfMilestone = function() {
            self.isMilestone = self.from - self.to === 0;
        };

        self.checkIfMilestone();

        // Updates the pos and size of the task according to the from - to date
        self.updatePosAndSize = function() {
            self.left = self.gantt.getPositionByDate(self.from);
            self.width = Math.round( (self.gantt.getPositionByDate(self.to) - self.left) * 10) / 10;
        };

        // Expands the start of the task to the specified position (in em)
        self.setFrom = function(x) {
            if (x > self.left + self.width) {
                x = self.left + self.width;
            } else if (x < 0) {
                x = 0;
            }

            self.from = self.gantt.getDateByPosition(x);
            self.row.setMinMaxDateByTask(self);
            self.updatePosAndSize();
            self.checkIfMilestone();
        };

        // Expands the end of the task to the specified position (in em)
        self.setTo = function(x) {
            if (x < self.left) {
                x = self.left;
            } else if (x > self.gantt.width) {
                x = self.gantt.width;
            }

            self.to = self.gantt.getDateByPosition(x);
            self.row.setMinMaxDateByTask(self);
            self.updatePosAndSize();
            self.checkIfMilestone();
        };

        // Moves the task to the specified position (in em)
        self.moveTo = function(x) {
            if (x < 0) {
                x = 0;
            } else if (x + self.width >= self.gantt.width) {
                x = self.gantt.width - self.width;
            }

            self.from = self.gantt.getDateByPosition(x);
            self.left = self.gantt.getPositionByDate(self.from);

            self.to = self.gantt.getDateByPosition(self.left + self.width);
            self.width = Math.round( (self.gantt.getPositionByDate(self.to) - self.left) * 10) / 10;

            self.row.setMinMaxDateByTask(self);
        };

        self.copy = function(task) {
            self.subject = task.subject;
            self.color = task.color;
            self.from = df.clone(task.from);
            self.to = df.clone(task.to);
            self.data = task.data;
            self.isMilestone = task.isMilestone;
        };

        self.clone = function() {
            return new Task(self.id, self.row, self.subject, self.color, self.from, self.to, self.data);
        };
    };

    return Task;
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
            // If task has a visible part on the screen
            if (task.left >= scroll_left && task.left <= scroll_left + scroll_width ||
                task.left + task.width >= scroll_left && task.left + task.width <= scroll_left + scroll_width ||
                task.left < scroll_left && task.left + task.width > scroll_left + scroll_width) {
                    res.push(task);
            }
        }

        return res;
    };
}]);;gantt.directive('ganttLabelResizable', ['$document', 'debounce', 'mouseOffset', function ($document, debounce, mouseOffset) {

    return {
        restrict: "A",
        scope: { width: "=ganttLabelResizable",
                 minWidth: "=resizeMin" },
        controller: ['$scope', '$element', function ($scope, $element) {
            var resizeAreaWidth = 5;
            var cursor = 'ew-resize';
            var originalPos;

            $element.bind("mousedown", function (e) {
                if (isInResizeArea(e)) {
                    enableResizeMode(e);
                    e.preventDefault();
                }
            });

            $element.bind("mousemove", function (e) {
                if (isInResizeArea(e)) {
                    $element.css("cursor", cursor);
                } else {
                    $element.css("cursor", '');
                }
            });

            var resize = function(x) {
                if ($scope.width === 0) {
                    $scope.width = $element[0].offsetWidth;
                }

                $scope.width += x - originalPos;
                if ($scope.width < $scope.minWidth) {
                    $scope.width  = $scope.minWidth;
                }

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
            };
        }]
    };
}]);;gantt.directive('ganttTaskMoveable', ['$document', '$timeout', 'debounce', 'dateFunctions', 'mouseOffset', function ($document, $timeout, debounce, df, mouseOffset) {

    return {
        restrict: "A",
        controller: ['$scope', '$element', function ($scope, $element) {
            var resizeAreaWidthBig = 5;
            var resizeAreaWidthSmall = 3;
            var scrollSpeed = 15;
            var scrollTriggerDistance = 1;

            var bodyElement = angular.element($document[0].body);
            var ganttBodyElement = $element.parent().parent();
            var ganttScrollElement = ganttBodyElement.parent().parent();
            var taskHasBeenMoved = false;
            var mouseOffsetInEm;
            var moveStartX;
            var scrollInterval;

           $element.bind('mousedown', function (e) {
                var mode = getMode(e);
                if (mode !== "") {
                    enableMoveMode(mode, e);
                    e.preventDefault();
                }
            });

            $element.bind("mousemove", function (e) {
                var mode = getMode(e);
                if (mode !== "" && mode !== "M") {
                    $element.css("cursor", getCursor(mode));
                } else {
                    $element.css("cursor", '');
                }
            });

            var handleMove = function(mode, mousePos) {
                if ($scope.task.isMoving === false) {
                    return;
                }

                moveTask(mode, mousePos);
                scrollScreen(mode, mousePos);
            };

            var moveTask = function(mode, mousePos) {
                var xInEm = mousePos.x / $scope.getPxToEmFactor();
                if (mode === "M") {
                    var targetRow = getRow(mousePos.y);
                    if (targetRow !== undefined && $scope.task.row.id !== targetRow.id) {
                        targetRow.moveTaskToRow($scope.task);
                    }

                    $scope.task.moveTo(xInEm - mouseOffsetInEm);
                } else if (mode === "E") {
                    $scope.task.setTo(xInEm);
                } else {
                    $scope.task.setFrom(xInEm);
                }

                taskHasBeenMoved = true;
            };

            var scrollScreen = function(mode, mousePos) {
                var leftScreenBorder = ganttScrollElement[0].scrollLeft;

                if (mousePos.x < moveStartX) {
                    // Scroll to the left
                    if (mousePos.x <= leftScreenBorder + scrollTriggerDistance) {
                        mousePos.x -= scrollSpeed;
                        $scope.scrollLeft(scrollSpeed);
                        scrollInterval = $timeout(function() { handleMove(mode, mousePos); }, 100, true); // Keep on scrolling
                    }
                } else {
                    // Scroll to the right
                    var screenWidth = ganttScrollElement[0].offsetWidth;
                    var rightScreenBorder = leftScreenBorder + screenWidth;

                    if (mousePos.x >= rightScreenBorder - scrollTriggerDistance) {
                        mousePos.x += scrollSpeed;
                        $scope.scrollRight(scrollSpeed);
                        scrollInterval = $timeout(function() { handleMove(mode, mousePos); }, 100, true); // Keep on scrolling
                    }
                }
            };

            var clearScrollInterval = function() {
                if (scrollInterval !== undefined) {
                    $timeout.cancel(scrollInterval);
                    scrollInterval = undefined;
                }
            };

            var getRow = function(y) {
                var rowHeight = ganttBodyElement[0].offsetHeight / $scope.task.row.gantt.rows.length;
                var pos = Math.floor(y / rowHeight);
                return $scope.task.row.gantt.rows[pos];
            };

            var getMode = function (e) {
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
                } else if ($scope.allowTaskMoving && x >= distance && x <= $element[0].offsetWidth - distance) {
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

            var enableMoveMode = function (mode, e) {
                $scope.task.isMoving = true;

                moveStartX = mouseOffset.getOffsetForElement(ganttBodyElement[0], e).x;
                var xInEm = moveStartX / $scope.getPxToEmFactor();
                mouseOffsetInEm = xInEm - $scope.task.left;

                angular.element($document[0].body).css({
                    '-moz-user-select': '-moz-none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'cursor': getCursor(mode)
                });

                var taskMoveHandler = debounce(function(e) {
                    var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], e);
                    clearScrollInterval();
                    handleMove(mode, mousePos);
                }, 5);
                bodyElement.bind('mousemove', taskMoveHandler);

                bodyElement.one('mouseup', function() {
                    bodyElement.unbind('mousemove', taskMoveHandler);
                    disableMoveMode();
                });
            };

            var disableMoveMode = function () {
                $scope.task.isMoving = false;
                clearScrollInterval();

                if (taskHasBeenMoved === true) {
                    $scope.task.row.sortTasks(); // Sort tasks so they have the right z-order
                    $scope.raiseTaskUpdatedEvent($scope.task);
                    taskHasBeenMoved = false;
                }

                $element.css("cursor", '');

                angular.element($document[0].body).css({
                    '-moz-user-select': '',
                    '-webkit-user-select': '',
                    '-ms-user-select': '',
                    'user-select': '',
                    'cursor': ''
                });
            };
        }]
    };
}]);;gantt.directive('ganttHorizontalScrollReceiver', ['scrollManager', function (scrollManager) {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: "A",
        controller: ['$scope', '$element', function ($scope, $element) {
            scrollManager.horizontal.push($element[0]);
        }]
    };
}]);;gantt.service('scrollManager', [ function () {
    return { vertical: [], horizontal: [] };
}]);;gantt.directive('ganttScrollSender', ['scrollManager', '$timeout', function (scrollManager, $timeout) {
    // Updates the element which are registered for the horizontal or vertical scroll event

    return {
        restrict: "A",
        controller: ['$scope', '$element', function ($scope, $element) {
            var el = $element[0];
            var updateListeners = function() {
                var i, l;

                for (i = 0, l = scrollManager.vertical.length; i < l; i++) {
                    var vElement = scrollManager.vertical[i];
                    if (vElement.style.top !== -el.scrollTop)
                        vElement.style.top = -el.scrollTop + 'px';
                }

                for (i = 0, l = scrollManager.horizontal.length; i < l; i++) {
                    var hElement = scrollManager.horizontal[i];
                    if (hElement.style.left !== -el.scrollLeft)
                        hElement.style.left = -el.scrollLeft + 'px';
                }
            };

            $element.bind('scroll', updateListeners);

            $scope.$watch('gantt.width', function(newValue, oldValue) {
                if (newValue === 0) {
                    $timeout(function() {
                        updateListeners();
                    }, 20, true);
                }
            });
        }]
    };
}]);;gantt.directive('ganttVerticalScrollReceiver', ['scrollManager', function (scrollManager) {
    // The element with this attribute will scroll at the same time as the scrollSender element

    return {
        restrict: "A",
        controller: ['$scope', '$element', function ($scope, $element) {
            scrollManager.vertical.push($element[0]);
        }]
    };
}]);;gantt.service('sortManager', [ function () {
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
}]);;gantt.directive('ganttTooltip', ['$timeout', '$document', 'debounce', 'smartEvent', function ($timeout, $document, debounce, smartEvent) {
    // This tooltip displays more information about a task

    return {
        restrict: "E",
        template: "<div ng-mouseenter='mouseEnter($event)' ng-mouseleave='mouseLeave($event)'>" +
            "<div ng-if='visible' class='gantt-task-info' ng-style='css'>" +
            "<div class='gantt-task-info-content'>" +
            "{{ task.subject }}</br>" +
            "<small>" +
            "{{ task.isMilestone === true &&" +
            " (task.from | date:'MMM d, HH:mm') ||" +
            " (task.from | date:'MMM d, HH:mm') + ' - ' + (task.to | date:'MMM d, HH:mm') }}" +
            "</small>" +
            "</div>" +
            "</div>" +
            "<div ng-transclude></div>" +
            "</div>",
        replace: true,
        transclude: true,
        scope: { task: "=ngModel" },
        controller: ['$scope', '$element', function ($scope, $element) {
            var bodyElement = angular.element($document[0].body);
            $scope.visible = false;
            $scope.css = {};

            $scope.mouseEnter = function (e) {
                if (!$scope.task.isMoving) {
                    showTooltip(e.clientX);
                }
            };

            $scope.mouseLeave = function (e) {
                if (!$scope.task.isMoving) {
                    hideTooltip();
                }
            };

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

                $timeout(function() {
                    var elTip = angular.element($element.children()[0]);

                    updateTooltip(x);

                    $scope.css.top = $element[0].getBoundingClientRect().top + "px";
                    $scope.css.marginTop = -elTip[0].offsetHeight - 8 + "px";
                    $scope.css.opacity = 1;
                }, 1, true);
            };

            var updateTooltip = function(x) {
                var elTip = angular.element($element.children()[0]);

                elTip.removeClass('gantt-task-infoArrow');
                elTip.removeClass('gantt-task-infoArrowR');

                // Check if info is overlapping with view port
                if (x + elTip[0].offsetWidth > getViewPortWidth()) {
                    $scope.css.left = (x + 20 - elTip[0].offsetWidth) + "px";
                    elTip.addClass('gantt-task-infoArrowR'); // Right aligned info
                } else {
                    $scope.css.left = (x - 20) + "px";
                    elTip.addClass('gantt-task-infoArrow');
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
        };
    }

    return keepScrollPos;
}]);;gantt.service('mouseOffset', [ function () {
    // Mouse offset support for lesser browsers (read IE 8)

    return {
        getOffset: function(evt) {
            if (evt.layerX && evt.layerY) {
                return { x: evt.layerX, y: evt.layerY };
            } else if (evt.offsetX && evt.offsetY) {
                return { x: evt.offsetX, y: evt.offsetY };
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