YUI.add('calendar', function(Y) {

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

var getCN            = Y.ClassNameManager.getClassName,
    CALENDAR         = 'calendar',
    CAL_HD           = getCN(CALENDAR, 'header'),
    CAL_DAY_SELECTED = getCN(CALENDAR, 'day-selected'),
    CAL_DAY           = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY = getCN(CALENDAR, 'nextmonth-day'),
    ydate            = Y.DataType.Date,
    delegate         = Y.delegate,
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
function Calendar(config) {
  Calendar.superclass.constructor.apply ( this, arguments );
}

Y.Calendar = Y.extend(Calendar, Y.CalendarBase, {

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
  },

  /**
    * syncUI implementation
    *
    * Update the scroll position, based on the current value of scrollY
    * @method syncUI
    */  
  syncUI : function () {

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
    pane.on("selectstart", function (ev) { ev.preventDefault();});
    pane.delegate("click", this._clickCalendar, "." + CAL_DAY, this);
  },

  /**
   * Handles the calendar clicks based on selection mode.
   * @method _clickCalendar
   * @param {Event} ev A click event
   * @private
   */   
    _clickCalendar : function (ev) {
        var clickedCell = ev.target,
            clickedCellIsDay = clickedCell.hasClass(CAL_DAY) && 
                               !clickedCell.hasClass(CAL_PREVMONTH_DAY) && 
                               !clickedCell.hasClass(CAL_NEXTMONTH_DAY),
            clickedCellIsSelected = clickedCell.hasClass(CAL_DAY_SELECTED);
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
                 }
                 else {
                  this._addDateToSelection(this._nodeToDate(clickedCell));
                 }
               }
               break;
            case("multiple"):
               if (!ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
                    this._clearSelection(true);
                    this._lastSelectedDate = this._nodeToDate(clickedCell);
                    this._addDateToSelection(this._lastSelectedDate);
               }
               else if (((os == 'macintosh' && ev.metaKey) || (os != 'macintosh' && ev.ctrlKey)) && !ev.shiftKey) {
                  if (clickedCellIsSelected) {
                    this._removeDateFromSelection(this._nodeToDate(clickedCell));
                    this._lastSelectedDate = null;
                  }
                  else {
                    this._lastSelectedDate = this._nodeToDate(clickedCell);
                    this._addDateToSelection(this._lastSelectedDate);
                  }
               }
               else if (((os == 'macintosh' && ev.metaKey) || (os != 'macintosh' && ev.ctrlKey)) && ev.shiftKey) {
                  if (this._lastSelectedDate != null) {
                    var selectedDate = this._nodeToDate(clickedCell);
                    this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);
                    this._lastSelectedDate = selectedDate;
                  }
                  else {
                    this._lastSelectedDate = this._nodeToDate(clickedCell);
                    this._addDateToSelection(this._lastSelectedDate);
                  }

               }
               else if (ev.shiftKey) {
                    if (this._lastSelectedDate != null) {
                      var selectedDate = this._nodeToDate(clickedCell);
                      this._clearSelection(true);
                      this._addDateRangeToSelection(selectedDate, this._lastSelectedDate);
                      this._lastSelectedDate = selectedDate;
                    }
                    else {
                      this._clearSelection(true);
                      this._lastSelectedDate = this._nodeToDate(clickedCell);
                        this._addDateToSelection(this._lastSelectedDate);
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
      }
      else if (clickedCell.hasClass(CAL_PREVMONTH_DAY)) {
   /**
     * Fired when any of the previous month's days displayed before the calendar grid
     * are clicked.
     *
     * @event prevMonthClick
     */
        this.fire("prevMonthClick");
      }
      else if (clickedCell.hasClass(CAL_NEXTMONTH_DAY)) {
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
   * Subtracts one month from the current calendar view.
   * @method subtractMonth
   */   
  subtractMonth : function (e) {
    this.set("date", ydate.addMonths(this.get("date"), -1));
    e.halt();
  },

  /**
   * Subtracts one year from the current calendar view.
   * @method subtractYear
   */ 
  subtractYear : function (e) {
    this.set("date", ydate.addYears(this.get("date"), -1));
    e.halt();
  },

  /**
   * Adds one month to the current calendar view.
   * @method addMonth
   */   
  addMonth : function (e) {    
    this.set("date", ydate.addMonths(this.get("date"), 1));
    e.halt();
  },

  /**
   * Adds one year to the current calendar view.
   * @method addYear
   */   
  addYear : function (e) {
    this.set("date", ydate.addYears(this.get("date"), 1));
    e.halt();
  }
},

{
   /**
    * The identity of the widget.
    *
    * @property NAME
    * @type String
    * @default 'Calendar'
    * @readOnly
    * @protected
    * @static
    */  
  NAME: "Calendar",

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
     *   <li>`single`</li> - One date at a time
     *   <li>`multiple-sticky</li> - Multiple dates, selected one at a time (the dates "stick")
     *   <li>`multiple`</li> - Multiple dates, selected with Ctrl/Meta keys for additional single
     *   dates, and Shift key for date ranges.
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
      setter: function (val) {

        var newDate = this._normalizeDate(val),
            newTopDate = ydate.addMonths(newDate, this._paneNumber - 1),
            minDate = this.get("minimumDate"),
            maxDate = this.get("maximumDate");

            if ((minDate == null || ydate.isGreaterOrEqual(newDate, minDate)) && 
                (maxDate == null || ydate.isGreaterOrEqual(maxDate, newTopDate))) {
                return newDate;
            }

            else if (minDate != null && ydate.isGreater(minDate, newDate)) {
                   return minDate;
            }

            else if (maxDate != null && ydate.isGreater(newTopDate, maxDate)) {
                var actualMaxDate = ydate.addMonths(maxDate, -1*(this._paneNumber - 1));
                  return actualMaxDate;
            }
     }
    },

    /**
     * The minimum date that can be displayed by the calendar. The calendar will not
     * allow dates earlier than this one to be set, and will reset any earlier date to
     * this date. Should be `null` if no minimum date is needed.
     *
     * @attribute minimumDate
     * @type Date
     * @default null
     */
    minimumDate: {
      value: null,
      setter: function (val) {
        if (val != null) {
          var curDate = this.get('date'),
              newMinDate = this._normalizeDate(val);
          if (curDate!= null && !ydate.isGreaterOrEqual(curDate, newMinDate)) {
              this.set('date', newMinDate);
          }
          return newMinDate;
        }
        else {
          return val;
        }
      }
    },

    /**
     * The maximum date that can be displayed by the calendar. The calendar will not
     * allow dates later than this one to be set, and will reset any later date to
     * this date. Should be `null` if no maximum date is needed.
     *
     * @attribute maximumDate
     * @type Date
     * @default null
     */
    maximumDate: {
      value: null,
      setter: function (val) {
        if (val != null) {
          var curDate = this.get('date'),
              newMaxDate = this._normalizeDate(val);
          if (curDate!= null && !ydate.isGreaterOrEqual(val, ydate.addMonths(curDate, this._paneNumber - 1))) {
              this.set('date', ydate.addMonths(newMaxDate, -1*(this._paneNumber -1)));
          }
          return newMaxDate;
        }
        else {
          return val;
        }
      }
    }
  }
});


}, '@VERSION@' ,{lang:['en', 'ja', 'ru'], requires:['calendar-base', 'calendarnavigator']});
