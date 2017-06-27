YUI.add('calendar', function(Y) {

/**
 * The Calendar component is a UI widget that allows users
 * to view dates in a two-dimensional month grid, as well as
 * to select one or more dates, or ranges of dates. Calendar
 * is generated dynamically.
 *
 * @module calendar
 * @submodule calendar-base
 */

/** Create a calendar view to represent a single or multiple
  * month range of dates, rendered as a grid with date and
  * weekday labels.
  * 
  * @class Calendar
  * @extends CalendarBase
  * @param config {Object} Configuration object (see Configuration attributes)
  * @constructor
  */

var getCN            = Y.ClassNameManager.getClassName,
    CALENDAR         = 'calendar',
    CAL_HD           = getCN(CALENDAR, 'header'),
    CAL_DAY_SELECTED = getCN(CALENDAR, 'day-selected'),
    CAL_DAY           = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY = getCN(CALENDAR, 'nextmonth-day'),
    ydate            = Y.DataType.Date;

function Calendar(config) {
	Calendar.superclass.constructor.apply ( this, arguments );
}

Y.Calendar = Y.extend(Calendar, Y.CalendarBase, {
	
	renderUI : function () {
	    var contentBox = this.get('contentBox');
	
	    contentBox.appendChild(this._initCalendarHTML(this.get('date')));
	    contentBox.one("." + CAL_HD).prepend("<input type='button' id='" + this._calendarId + "minusyear' value='&laquo;'><input type='button' id='" + this._calendarId + "minusmonth' value='&lsaquo;'>");
	    contentBox.one("." + CAL_HD).append("<input type='button' id='" + this._calendarId + "plusmonth' value='&rsaquo;'><input type='button' id='" + this._calendarId + "plusyear' value='&raquo;'>");
	},
	
	_bindCalendarEvents : function () {
		var contentBox = this.get('contentBox');
	    contentBox.one("#" + this._calendarId + "minusmonth").on("click", this._subtractMonth, this);
	    contentBox.one("#" + this._calendarId + "minusyear").on("click", this._subtractYear, this);
	    contentBox.one("#" + this._calendarId + "plusmonth").on("click", this._addMonth, this);
	    contentBox.one("#" + this._calendarId + "plusyear").on("click", this._addYear, this);
        contentBox.one("#" + this._calendarId).on("click", this._clickCalendar, this);
	},

    _clickCalendar : function (e) {
    	var clickedCell = e.target;
    	console.log(CAL_DAY + ": " + clickedCell.test(CAL_DAY));
    	console.log(CAL_NEXTMONTH_DAY + ": " + clickedCell.test(CAL_NEXTMONTH_DAY));
    	console.log(CAL_PREVMONTH_DAY + ": " + clickedCell.test(CAL_PREVMONTH_DAY));

    	if (clickedCell.test("." + CAL_DAY) && !clickedCell.test("." + CAL_PREVMONTH_DAY) && !clickedCell.test("." + CAL_NEXTMONTH_DAY)) {
    	   this.select(e.target);
        }
    },

	_subtractMonth : function (e) {
		this.set("date", ydate.addMonths(this.get("date"), -1));
		e.halt();
	},

	_subtractYear : function (e) {
		this.set("date", ydate.addYears(this.get("date"), -1));
		e.halt();
	},
	
	_addMonth : function (e) {		
		this.set("date", ydate.addMonths(this.get("date"), 1));
		e.halt();
	},

	_addYear : function (e) {
		this.set("date", ydate.addYears(this.get("date"), 1));
		e.halt();
	},	
},

{
NAME: "Calendar"
});


}, '@VERSION@' ,{lang:['en', 'ru'], requires:['calendar-base']});
