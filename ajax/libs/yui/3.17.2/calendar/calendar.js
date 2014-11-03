/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('calendar', function (Y, NAME) {

/**
 * The Calendar component is a UI widget that allows users
 * to view dates in a two-dimensional month grid, as well as
 * to select one or more dates, or ranges of dates. Calendar
 * is generated dynamically and relies on the developer to
 * provide for a progressive enhancement alternative.
 *
 *
 * @module calendar
 */

var getCN             = Y.ClassNameManager.getClassName,
    CALENDAR          = 'calendar',
    KEY_DOWN          = 40,
    KEY_UP            = 38,
    KEY_LEFT          = 37,
    KEY_RIGHT         = 39,
    KEY_ENTER         = 13,
    KEY_SPACE         = 32,
    CAL_DAY_SELECTED  = getCN(CALENDAR, 'day-selected'),
    CAL_DAY_HILITED   = getCN(CALENDAR, 'day-highlighted'),
    CAL_DAY           = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY = getCN(CALENDAR, 'nextmonth-day'),
    CAL_GRID          = getCN(CALENDAR, 'grid'),
    ydate             = Y.DataType.Date,
    CAL_PANE          = getCN(CALENDAR, 'pane'),
    os                = Y.UA.os;

/** Create a calendar view to represent a single or multiple
    * month range of dates, rendered as a grid with date and
    * weekday labels.
    *
    * @class Calendar
    * @extends CalendarBase
    * @param config {Object} Configuration object (see Configuration attributes)
    * @constructor
    */
function Calendar() {
    Calendar.superclass.constructor.apply ( this, arguments );
}

Y.Calendar = Y.extend(Calendar, Y.CalendarBase, {

    _keyEvents: [],

    _highlightedDateNode: null,

    /**
     * A property tracking the last selected date on the calendar, for the
     * purposes of multiple selection.
     *
     * @property _lastSelectedDate
     * @type Date
     * @default null
     * @private
     */
    _lastSelectedDate: null,

    /**
     * Designated initializer. Activates the navigation plugin for the calendar.
     *
     * @method initializer
     */
    initializer : function () {
        this.plug(Y.Plugin.CalendarNavigator);

        this._keyEvents = [];
        this._highlightedDateNode = null;
        this._lastSelectedDate = null;
    },

    /**
     * Overrides the _bindCalendarEvents placeholder in CalendarBase
     * and binds calendar events during bindUI stage.
     * @method _bindCalendarEvents
     * @protected
     */
    _bindCalendarEvents : function () {
        var contentBox = this.get('contentBox'),
            pane       = contentBox.one("." + CAL_PANE);

        pane.on("selectstart", this._preventSelectionStart);
        pane.delegate("click", this._clickCalendar, "." + CAL_DAY + ", ." + CAL_PREVMONTH_DAY + ", ." + CAL_NEXTMONTH_DAY, this);
        pane.delegate("keydown", this._keydownCalendar, "." + CAL_GRID, this);
        pane.delegate("focus", this._focusCalendarGrid, "." + CAL_GRID, this);
        pane.delegate("focus", this._focusCalendarCell, "." + CAL_DAY, this);
        pane.delegate("blur", this._blurCalendarGrid, "." + CAL_GRID + ",." + CAL_DAY, this);


        this.after(['minimumDateChange', 'maximumDateChange'], this._afterCustomRendererChange);
    },

    /**
     * Prevents text selection if it is started within the calendar pane
     * @method _preventSelectionStart
     * @param event {Event} The selectstart event
     * @protected
     */
    _preventSelectionStart : function (event) {
        event.preventDefault();
    },

    /**
     * Highlights a specific date node with keyboard highlight class
     * @method _highlightDateNode
     * @param oDate {Date} Date corresponding the node to be highlighted
     * @protected
     */
    _highlightDateNode : function (oDate) {
        this._unhighlightCurrentDateNode();
        var newNode = this._dateToNode(oDate);
        newNode.focus();
        newNode.addClass(CAL_DAY_HILITED);
    },

    /**
     * Unhighlights a specific date node currently highlighted with keyboard highlight class
     * @method _unhighlightCurrentDateNode
     * @protected
     */
    _unhighlightCurrentDateNode : function () {
        var allHilitedNodes = this.get("contentBox").all("." + CAL_DAY_HILITED);
        if (allHilitedNodes) {
            allHilitedNodes.removeClass(CAL_DAY_HILITED);
        }
    },

    /**
     * Returns the grid number for a specific calendar grid (for multi-grid templates)
     * @method _getGridNumber
     * @param gridNode {Node} Node corresponding to a specific grid
     * @protected
     */
    _getGridNumber : function (gridNode) {
        var idParts = gridNode.get("id").split("_").reverse();

        return parseInt(idParts[0], 10);
    },

    /**
     * Handler for loss of focus of calendar grid
     * @method _blurCalendarGrid
     * @protected
     */
    _blurCalendarGrid : function () {
        this._unhighlightCurrentDateNode();
    },


    /**
     * Handler for gain of focus of calendar cell
     * @method _focusCalendarCell
     * @protected
     */
    _focusCalendarCell : function (ev) {
        this._highlightedDateNode = ev.target;
        ev.stopPropagation();
    },

    /**
     * Handler for gain of focus of calendar grid
     * @method _focusCalendarGrid
     * @protected
     */
    _focusCalendarGrid : function () {
        this._unhighlightCurrentDateNode();
        this._highlightedDateNode = null;
    },

    /**
     * Handler for keyboard press on a calendar grid
     * @method _keydownCalendar
     * @protected
     */
    _keydownCalendar : function (ev) {
        var gridNum = this._getGridNumber(ev.target),
            curDate = !this._highlightedDateNode ? null : this._nodeToDate(this._highlightedDateNode),
            keyCode = ev.keyCode,
            dayNum = 0,
            dir = '',
            selMode,
            newDate,
            startDate,
            endDate,
            lastPaneDate;

        switch(keyCode) {
            case KEY_DOWN:
                dayNum = 7;
                dir = 's';
                break;
            case KEY_UP:
                dayNum = -7;
                dir = 'n';
                break;
            case KEY_LEFT:
                dayNum = -1;
                dir = 'w';
                break;
            case KEY_RIGHT:
                dayNum = 1;
                dir = 'e';
                break;
            case KEY_SPACE: case KEY_ENTER:
                ev.preventDefault();
                if (this._highlightedDateNode) {
                    selMode = this.get("selectionMode");
                    if (selMode === "single" && !this._highlightedDateNode.hasClass(CAL_DAY_SELECTED)) {
                            this._clearSelection(true);
                            this._addDateToSelection(curDate);
                    } else if (selMode === "multiple" || selMode === "multiple-sticky") {
                        if (this._highlightedDateNode.hasClass(CAL_DAY_SELECTED)) {
                            this._removeDateFromSelection(curDate);
                        } else {
                            this._addDateToSelection(curDate);
                        }
                    }
                }
                break;
        }


        if (keyCode === KEY_DOWN || keyCode === KEY_UP || keyCode === KEY_LEFT || keyCode === KEY_RIGHT) {

            if (!curDate) {
                curDate = ydate.addMonths(this.get("date"), gridNum);
                dayNum = 0;
            }

            ev.preventDefault();

            newDate = ydate.addDays(curDate, dayNum);
            startDate = this.get("date");
            endDate = ydate.addMonths(this.get("date"), this._paneNumber - 1);
            lastPaneDate = new Date(endDate);
            endDate.setDate(ydate.daysInMonth(endDate));

            if (ydate.isInRange(newDate, startDate, endDate)) {
/*
                var paneShift = (newDate.getMonth() - curDate.getMonth()) % 10;

                if (paneShift != 0) {
                    var newGridNum = gridNum + paneShift,
                            contentBox = this.get('contentBox'),
                            newPane = contentBox.one("#" + this._calendarId + "_pane_" + newGridNum);
                            newPane.focus();
                }
*/
                this._highlightDateNode(newDate);
            } else if (ydate.isGreater(startDate, newDate)) {
                if (!ydate.isGreaterOrEqual(this.get("minimumDate"), startDate)) {
                    this.set("date", ydate.addMonths(startDate, -1));
                    this._highlightDateNode(newDate);
                }
            } else if (ydate.isGreater(newDate, endDate)) {
                if (!ydate.isGreaterOrEqual(lastPaneDate, this.get("maximumDate"))) {
                    this.set("date", ydate.addMonths(startDate, 1));
                    this._highlightDateNode(newDate);
                }
            }
        }
    },

    /**
     * Handles the calendar clicks based on selection mode.
     * @method _clickCalendar
     * @param {Event} ev A click event
     * @private
     */
    _clickCalendar : function (ev) {
        var clickedCell = ev.currentTarget,
            clickedCellIsDay = clickedCell.hasClass(CAL_DAY) &&
                                !clickedCell.hasClass(CAL_PREVMONTH_DAY) &&
                                !clickedCell.hasClass(CAL_NEXTMONTH_DAY),

        clickedCellIsSelected = clickedCell.hasClass(CAL_DAY_SELECTED),
        selectedDate;

        switch (this.get("selectionMode")) {
            case("single"):
                if (clickedCellIsDay) {
                    if (!clickedCellIsSelected) {
                        this._clearSelection(true);
                        this._addDateToSelection(this._nodeToDate(clickedCell));
                    }
                }
                break;
            case("multiple-sticky"):
                if (clickedCellIsDay) {
                    if (clickedCellIsSelected) {
                        this._removeDateFromSelection(this._nodeToDate(clickedCell));
                    } else {
                        this._addDateToSelection(this._nodeToDate(clickedCell));
                    }
                }
                break;
            case("multiple"):
                if (clickedCellIsDay) {
                    if (!ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
                        this._clearSelection(true);
                        this._lastSelectedDate = this._nodeToDate(clickedCell);
                        this._addDateToSelection(this._lastSelectedDate);
                    } else if (((os === 'macintosh' && ev.metaKey) || (os !== 'macintosh' && ev.ctrlKey)) && !ev.shiftKey) {
                        if (clickedCellIsSelected) {
                            this._removeDateFromSelection(this._nodeToDate(clickedCell));
                            this._lastSelectedDate = null;
                        } else {
                            this._lastSelectedDate = this._nodeToDate(clickedCell);
                            this._addDateToSelection(this._lastSelectedDate);
                        }
                    } else if (((os === 'macintosh' && ev.metaKey) || (os !== 'macintosh' && ev.ctrlKey)) && ev.shiftKey) {
                        if (this._lastSelectedDate) {
                            selectedDate = this._nodeToDate(clickedCell);
                            this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);
                            this._lastSelectedDate = selectedDate;
                        } else {
                            this._lastSelectedDate = this._nodeToDate(clickedCell);
                            this._addDateToSelection(this._lastSelectedDate);
                        }
                    } else if (ev.shiftKey) {
                        if (this._lastSelectedDate) {
                            selectedDate = this._nodeToDate(clickedCell);
                            this._clearSelection(true);
                            this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);
                            this._lastSelectedDate = selectedDate;
                        } else {
                            this._clearSelection(true);
                            this._lastSelectedDate = this._nodeToDate(clickedCell);
                            this._addDateToSelection(this._lastSelectedDate);
                        }
                    }
                }
                break;
        }

        if (clickedCellIsDay) {
            /**
            * Fired when a specific date cell in the calendar is clicked. The event carries a
            * payload which includes a `cell` property corresponding to the node of the actual
            * date cell, and a `date` property, with the `Date` that was clicked.
            *
            * @event dateClick
            */
            this.fire("dateClick", {cell: clickedCell, date: this._nodeToDate(clickedCell)});
        } else if (clickedCell.hasClass(CAL_PREVMONTH_DAY)) {
            /**
            * Fired when any of the previous month's days displayed before the calendar grid
            * are clicked.
            *
            * @event prevMonthClick
            */
            this.fire("prevMonthClick");
        } else if (clickedCell.hasClass(CAL_NEXTMONTH_DAY)) {
            /**
            * Fired when any of the next month's days displayed after the calendar grid
            * are clicked.
            *
            * @event nextMonthClick
            */
            this.fire("nextMonthClick");
        }
    },

    /**
     * Overrides CalendarBase.prototype._canBeSelected to disable
     * nodes earlier than minimumDate and later than maximumDate
     * @method _canBeSelected
     * @private
     */
    _canBeSelected : function (date) {
        var minDate = this.get('minimumDate'),
            maxDate = this.get('maximumDate');

        if ((minDate && !ydate.isGreaterOrEqual(date, minDate)) ||
            (maxDate &&  ydate.isGreater(date, maxDate))) {
            return false;
        }

        return Calendar.superclass._canBeSelected.call(this, date);
    },

    /**
     * Overrides CalendarBase.prototype._renderCustomRules to disable
     * nodes earlier than minimumDate and later than maximumDate
     * @method _renderCustomRules
     * @private
     */
    _renderCustomRules: function () {
        Calendar.superclass._renderCustomRules.call(this);

        var minDate = this.get('minimumDate'),
            maxDate = this.get('maximumDate'),
            dates = [],
            i, l,
            paneDate,
            paneNum;

        if (!minDate && !maxDate) {
            return;
        }

        for (paneNum = 0; paneNum < this._paneNumber; paneNum++) {
            paneDate = ydate.addMonths(this.get("date"), paneNum);
            dates = dates.concat(ydate.listOfDatesInMonth(paneDate));
        }

        if (minDate) {
            for (i = 0, l = dates.length; i < l; i++) {
                if (!ydate.isGreaterOrEqual(dates[i], minDate)) {
                    this._disableDate(dates[i]);
                } else {
                    break;
                }
            }
        }

        if (maxDate) {
            for (i = dates.length - 1; i >= 0; i--) {
                if (ydate.isGreater(dates[i], maxDate)) {
                    this._disableDate(dates[i]);
                } else {
                    break;
                }
            }
        }
    },

    /**
     * Subtracts one month from the current calendar view.
     * @method subtractMonth
     * @return {Calendar} A reference to this object
     * @chainable
     */
    subtractMonth : function (e) {
        this.set("date", ydate.addMonths(this.get("date"), -1));
        if (e) {
            e.halt();
        }
        return this;
    },

    /**
     * Subtracts one year from the current calendar view.
     * @method subtractYear
     * @return {Calendar} A reference to this object
     * @chainable
     */
    subtractYear : function (e) {
        this.set("date", ydate.addYears(this.get("date"), -1));
        if (e) {
            e.halt();
        }
        return this;
    },

    /**
     * Adds one month to the current calendar view.
     * @method addMonth
     * @return {Calendar} A reference to this object
     * @chainable
     */
    addMonth : function (e) {
        this.set("date", ydate.addMonths(this.get("date"), 1));
        if (e) {
            e.halt();
        }
        return this;
    },

    /**
     * Adds one year to the current calendar view.
     * @method addYear
     * @return {Calendar} A reference to this object
     * @chainable
     */
    addYear : function (e) {
        this.set("date", ydate.addYears(this.get("date"), 1));
        if (e) {
            e.halt();
        }
        return this;
    }
}, {
    /**
    * The identity of the widget.
    *
    * @property NAME
    * @type String
    * @default 'calendar'
    * @readOnly
    * @protected
    * @static
    */
    NAME: "calendar",

    /**
    * Static property used to define the default attribute configuration of
    * the Widget.
    *
    * @property ATTRS
    * @type {Object}
    * @protected
    * @static
    */
    ATTRS: {

        /**
         * A setting specifying the type of selection the calendar allows.
         * Possible values include:
         * <ul>
         *   <li>`single` - One date at a time</li>
         *   <li>`multiple-sticky` - Multiple dates, selected one at a time (the dates "stick"). This option
         *   is appropriate for mobile devices, where function keys from the keyboard are not available.</li>
         *   <li>`multiple` - Multiple dates, selected with Ctrl/Meta keys for additional single
         *   dates, and Shift key for date ranges.</li>
         *
         * @attribute selectionMode
         * @type String
         * @default single
         */
        selectionMode: {
            value: "single"
        },

        /**
         * The date corresponding to the current calendar view. Always
         * normalized to the first of the month that contains the date
         * at assignment time. Used as the first date visible in the
         * calendar.
         *
         * @attribute date
         * @type Date
         * @default Today's date as set on the user's computer.
         */
        date: {
            value: new Date(),
            lazyAdd: false,
            setter: function (val) {

                var newDate    = this._normalizeDate(val),
                    newEndDate = ydate.addMonths(newDate, this._paneNumber - 1),
                    minDate    = this.get("minimumDate"),
                    maxDate    = this.get("maximumDate");

                if ((!minDate || ydate.isGreaterOrEqual(newDate, minDate)) &&
                    (!maxDate || ydate.isGreaterOrEqual(maxDate, newEndDate))
                ) {
                    return newDate;
                } else if (minDate && ydate.isGreater(minDate, newDate)) {
                    return this._normalizeDate(minDate);
                } else if (maxDate && ydate.isGreater(newEndDate, maxDate)) {
                    return ydate.addMonths(this._normalizeDate(maxDate), 1 - this._paneNumber);
                }
            }
        },

        /**
         * Unless minimumDate is null, it will not be possible to display and select dates earlier than this one.
         *
         * @attribute minimumDate
         * @type Date
         * @default null
         */
        minimumDate: {
            value: null,
            setter: function (val) {
                if (Y.Lang.isDate(val)) {
                    var curDate = this.get('date'),
                        newMin  = this._normalizeTime(val);
                    if (curDate && !ydate.isGreaterOrEqual(curDate, newMin)) {
                        this.set('date', val);
                    }
                    return newMin;
                } else {
                    return null;
                }
            }
        },

        /**
         * Unless maximumDate is null, it will not be possible to display and select dates later than this one.
         *
         * @attribute maximumDate
         * @type Date
         * @default null
         */
        maximumDate: {
            value: null,
            setter: function (val) {
                if (Y.Lang.isDate(val)) {
                    var curDate = this.get('date');

                    if (curDate && !ydate.isGreaterOrEqual(val, ydate.addMonths(curDate, this._paneNumber - 1))) {
                        this.set('date', ydate.addMonths(this._normalizeDate(val), 1 - this._paneNumber));
                    }

                    return this._normalizeTime(val);
                } else {
                    return null;
                }
            }
        }
    }
});


}, '3.17.2', {"requires": ["calendar-base", "calendarnavigator"], "skinnable": true});
