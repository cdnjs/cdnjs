YUI.add('calendar-base', function(Y) {

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
  * @class CalendarBase
  * @extends Widget
  * @param config {Object} Configuration object (see Configuration attributes)
  * @constructor
  */

    
var getCN             = Y.ClassNameManager.getClassName,
    CALENDAR          = 'calendar',
    CAL_GRID          = getCN(CALENDAR, 'grid'),
    CAL_BODY          = getCN(CALENDAR, 'body'),
    CAL_HD            = getCN(CALENDAR, 'header'),
    CAL_HD_WRAP       = getCN(CALENDAR, 'header-wrap'),
    CAL_WDAYROW       = getCN(CALENDAR, 'weekdayrow'),
    CAL_WDAY          = getCN(CALENDAR, 'weekday'),
    CAL_COL_HIDDEN    = getCN(CALENDAR, 'column-hidden'),
    CAL_DAY_SELECTED  = getCN(CALENDAR, 'day-selected'),
    CAL_ROW           = getCN(CALENDAR, 'row'),
    CAL_DAY           = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY = getCN(CALENDAR, 'nextmonth-day'),
    CAL_ANCHOR        = getCN(CALENDAR, 'anchor'),

    L           = Y.Lang,
    node        = Y.Node,
    create      = node.create,
    substitute  = Y.substitute,
    each        = Y.each,
    ydate       = Y.DataType.Date;


function CalendarBase(config) {
	CalendarBase.superclass.constructor.apply ( this, arguments );
    
    if (config.hasOwnProperty("date")) {
	  this.set("date", config.date);
    };
}

Y.CalendarBase = Y.extend( CalendarBase, Y.Widget, {
	
	_cutoffColumn : 0,
	
    _daysInMonth : 31,

    _daysInPrevMonth : 0,

    _calendarId : "calendar_" + Y.guid(),

    _selectedDate : null,
	
	initializer : function () {
	},
	
	renderUI : function () {
	    var contentBox = this.get('contentBox');
	    contentBox.appendChild(this._initCalendarHTML(this.get('date')));
	    this._renderSelectedDates();
	},
	
	bindUI : function () {
		this.after('dateChange', this._afterDateChange);
		this.after('showPrevMonthChange', this._afterShowPrevMonthChange);
		this.after('showNextMonthChange', this._afterShowNextMonthChange);
		this._bindCalendarEvents();
	},
	
	syncUI : function () {
	   	if (this.get('showPrevMonth')) {
	    	   this._afterShowPrevMonthChange();

	    }

	    if (this.get('showNextMonth')) {
	    	   this._afterShowNextMonthChange();
	    }
	},

	isSelected : function (oDate) {
		if (oDate instanceof Date) {
			return (oDate == this._selectedDate);
		}
		else if (oDate instanceof Y.Node) {
			return (this._nodeToDate(oDate) == this._selectedDate);
		}
		else {
			return false;
		}
	},

	
	select: function (oDate) {
		var curDate, curNode;
        if (oDate instanceof Date) {
		    curDate = oDate;
		}
		else if (oDate instanceof Y.Node) {
			curDate = this._nodeToDate(oDate);

			if (curDate == null) {
				return;
			}
		}

		this._selectedDate = curDate;
		this._renderSelectedDates();
	},

	deselect: function (oDate) {
		var curDate, curNode;
        if (oDate instanceof Date) {
		    curDate = oDate;
		    curNode = this._dateToNode(curDate);	
		}
		else if (oDate instanceof Y.Node) {
			curDate = this._nodeToDate(oDate);

			if (curDate == null) {
				return;
			}
		}

		this._selectedDate = null;
		this._renderSelectedDates();		
	},

	_renderSelectedDates : function () {
		this.get("contentBox").all("." + CAL_DAY_SELECTED).removeClass(CAL_DAY_SELECTED);
		
		// Refactor as "DateMath.datesInRange"
		if (this._selectedDate != null && this.get("date").getFullYear() == this._selectedDate.getFullYear() && this.get("date").getMonth() == this._selectedDate.getMonth()) {
		   this._dateToNode(this._selectedDate).addClass(CAL_DAY_SELECTED);
		}
	},



	_dateToNode : function (oDate) {
		var day = oDate.getDate();
		var col = 0;
        
        var daymod = day%7;

        switch (daymod) {
        	case (0):
        	   if (this._cutoffColumn >= 6) {
        	   	 col = 12;
        	   }
        	   else {
        	   	 col = 5;
        	   }
        	   break;
        	case (1):
        	   	 col = 6;
        	   break;
        	case (2):
        	   if (this._cutoffColumn > 0) {
        	   	 col = 7;
        	   }
        	   else {
        	   	 col = 0;
        	   }
        	   break;
        	case (3):
        	   if (this._cutoffColumn > 1) {
        	   	 col = 8;
        	   }
        	   else {
        	   	 col = 1;
        	   }
        	   break;
        	case (4):
        	   if (this._cutoffColumn > 2) {
        	   	 col = 9;
        	   }
        	   else {
        	   	 col = 2;
        	   }
        	   break;
        	case (5):
        	   if (this._cutoffColumn > 3) {
        	   	 col = 10;
        	   }
        	   else {
        	   	 col = 3;
        	   }
        	   break;
        	case (6):
        	   if (this._cutoffColumn > 4) {
        	   	 col = 11;
        	   }
        	   else {
        	   	 col = 4;
        	   }
        	   break;
        }
        
        return(this.get("contentBox").one("#calendar_" + col + "_" + day));	

	},

	_nodeToDate : function (oNode) {
		
		var year = this.get("date").getFullYear();
		var month = this.get("date").getMonth();

		var day = parseInt(oNode.get("id").split("_")[2]);

        console.log("Got node " + oNode.get("id") + ", which resulted in " + year + "/" + month + "/" + day);
		return new Date(year, month, day);
	},

	_bindCalendarEvents : function () {
		
	},

    _getCutoffColumn : function (date, firstday) {

	 var normalizedDate = new Date(date.getFullYear(), date.getMonth(), 1);
	 var distance = normalizedDate.getDay() - firstday;
	 var cutOffColumn = 6 - (distance + 7)%7;
	 return cutOffColumn;

    },

    _afterShowNextMonthChange : function () {
    	
    	var contentBox = this.get('contentBox');
  
        contentBox.one("#calendar_6_29").removeClass(CAL_NEXTMONTH_DAY);
        contentBox.one("#calendar_7_30").removeClass(CAL_NEXTMONTH_DAY);
        contentBox.one("#calendar_8_31").removeClass(CAL_NEXTMONTH_DAY);
        contentBox.one("#calendar_0_30").removeClass(CAL_NEXTMONTH_DAY);
        contentBox.one("#calendar_1_31").removeClass(CAL_NEXTMONTH_DAY);

    	if (this.get('showNextMonth')) {
    	    
            var dayCounter = 1;

    		for (var cell = this._daysInMonth - 22; cell < this._cutoffColumn + 7; cell++) 
    		   {
    		   	contentBox.one("#calendar_" + cell + "_" + (cell+23)).setContent(dayCounter++).addClass(CAL_NEXTMONTH_DAY);
    		   }

    		var startingCell = this._cutoffColumn;
    		if (this._daysInMonth == 31 && (this._cutoffColumn <= 1)) {
    			startingCell = 2;
    		}
    		else if (this._daysInMonth == 30 && this._cutoffColumn == 0) {
    			startingCell = 1;
    		}
  
    		for (var cell = startingCell ; cell < this._cutoffColumn + 7; cell++) {
    		   	contentBox.one("#calendar_" + cell + "_" + (cell+30)).setContent(dayCounter++).addClass(CAL_NEXTMONTH_DAY);    
    		}
        }

        else {
    	    
    		for (var cell = this._daysInMonth - 22; cell <= 12; cell++) 
    		   {
    		   	contentBox.one("#calendar_" + cell + "_" + (cell+23)).setContent("").addClass(CAL_NEXTMONTH_DAY);
    		   }

    		var startingCell = 0;
    		if (this._daysInMonth == 31 && (this._cutoffColumn <= 1)) {
    			startingCell = 2;
    		}
    		else if (this._daysInMonth == 30 && this._cutoffColumn == 0) {
    			startingCell = 1;
    		}
  
    		for (var cell = startingCell ; cell <= 12; cell++) {
    		   	contentBox.one("#calendar_" + cell + "_" + (cell+30)).setContent("").addClass(CAL_NEXTMONTH_DAY);   
    		}        	

        }

    },

    _afterShowPrevMonthChange : function () {
    	var contentBox = this.get('contentBox');
    	if (this.get('showPrevMonth')) {
    		var daysInPrevMonth = ydate.daysInMonth(ydate.addMonths(this.get('date'), -1));

    		if (daysInPrevMonth != this._daysInPrevMonth) {
    		
    		this._daysInPrevMonth = daysInPrevMonth;
    		for (var cell = 5; cell >= 0; cell--) 
    		   {
    		   	contentBox.one("#calendar_" + cell + "_" + (cell-5)).setContent(daysInPrevMonth--);
    		   }

    		}

    	}

    	else {

    		this._daysInPrevMonth = 0;
    		for (var cell = 5; cell >= 0; cell--) 
    		   {
    		   	contentBox.one("#calendar_" + cell + "_" + (cell-5)).setContent("");
    		   }   		
    	}
    	
    },
	
	_afterDateChange : function () {
	   var newDate = this.get('date'),
	       firstday = this.get('strings.first_weekday') || 0,
	       cutoffCol = this._getCutoffColumn(newDate, firstday),
	       daysInMonth = ydate.daysInMonth(newDate),
	       contentBox = this.get('contentBox'),
	       headerCell = contentBox.one("." + CAL_HD_WRAP);
	
	this._cutoffColumn = cutoffCol;
	this._daysInMonth = daysInMonth;

	contentBox.setStyle("visibility", "hidden");
	
	       headerCell.setContent((newDate.getMonth()+1) + "/" + newDate.getFullYear());
	
	       for (var column = 0; column <= 12; column++) {
			  var currentColumn = contentBox.all("." + "calendar_col" + column);
			  currentColumn.removeClass(CAL_COL_HIDDEN);
			
			  if (column < cutoffCol || column >= (cutoffCol + 7)) {
		  		  currentColumn.addClass(CAL_COL_HIDDEN);
			  }
			  else {
			    switch(column)
			    {
				 case 0:
				  contentBox.one("#calendar_0_30").setContent((daysInMonth >= 30) ? "30" : "");
				 case 1:
				  contentBox.one("#calendar_1_31").setContent((daysInMonth >= 31) ? "31" : "");
				 case 6:
				  contentBox.one("#calendar_6_29").setContent((daysInMonth >= 29) ? "29" : "");
				 case 7:
				  contentBox.one("#calendar_7_30").setContent((daysInMonth >= 30) ? "30" : "");
				 case 8:
				  contentBox.one("#calendar_8_31").setContent((daysInMonth >= 31) ? "31" : "");
			    }	
			  }
		    }

	if (this.get('showPrevMonth')) {
 	   this._afterShowPrevMonthChange();
	}

	if (this.get('showNextMonth')) {
		this._afterShowNextMonthChange();
	}

	this._renderSelectedDates();
			
	contentBox.setStyle("visibility", "visible");
	},
	       
	_initCalendarHTML : function (baseDate) {

		var startDate = ydate.isValidDate(baseDate) ? baseDate : new Date(),

		    headerData = {calheader: (startDate.getMonth()+1) + "/" + 
		                             startDate.getFullYear()},
		    calString = '',
		    weekdays = this.get('strings.very_short_weekdays') || ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		    firstday = this.get('strings.first_weekday') || 0,
		    cutoffCol = this._getCutoffColumn(startDate, firstday),
		    daysInMonth = ydate.daysInMonth(startDate);
		    
	    this._cutoffColumn = cutoffCol;
	    this._daysInMonth = daysInMonth;

		var partials = {};
		    
		
		    partials["header_template"] =  substitute(CalendarBase.HEADER_TEMPLATE, 
					                                  headerData);
			
			partials["weekday_row"] = '';
			
			for (var day = firstday; day <= firstday + 6; day++) {
               partials["weekday_row"] += 
                  substitute(CalendarBase.WEEKDAY_TEMPLATE,
			                 {weekdayname: weekdays[day%7]});
			     }
		
			partials["weekday_row_template"] = substitute(CalendarBase.WEEKDAY_ROW_TEMPLATE, partials);
			
			var row_array = ['','','','','',''];

	        for (var row = 0; row <= 5; row++) {
					
            	for (var column = 0; column <= 12; column++) {	
		         
		         var date = 7*row - 5 + column;
		         var id_date = date;

		         if (date < 1 || date > daysInMonth) {
			         date = "";
		         }
		         
		         var column_visibility = (column >= cutoffCol && column < (cutoffCol + 7)) ? '' : CAL_COL_HIDDEN;
		         var calendar_day_class = CAL_DAY;

		         if (id_date < 1) {
		         	calendar_day_class = CAL_PREVMONTH_DAY;
		         }
                 else if (id_date > daysInMonth) {
                 	calendar_day_class = CAL_NEXTMONTH_DAY;
                 }

		         row_array[row] += substitute (CalendarBase.CALDAY_TEMPLATE, 
			                                   {day_content: date,
				                                calendar_col_class: "calendar_col" + column,
				                                calendar_col_visibility_class: column_visibility,
				                                calendar_day_class: calendar_day_class,
				                                calendar_day_id: "calendar_" + column + "_" + id_date});
	           }
            }
			
			partials["body_template"] = '';
			
			each (row_array, function (v) {
				 partials["body_template"] += substitute(CalendarBase.CALDAY_ROW_TEMPLATE, 
	                                                     {calday_row: v});
			});

			partials["calendar_id"] = this._calendarId;
	    var output = substitute(substitute (CalendarBase.CONTENT_TEMPLATE, partials),
			                    CalendarBase.CALENDAR_STRINGS);
		return output;
	}
}, {
	
	// Y.CalendarBase static properties
	
	CALENDAR_STRINGS: {
		calendar_grid_class   :  CAL_GRID,
		calendar_body_class   :  CAL_BODY,
		calendar_hd_class     :  CAL_HD,
		calendar_hd_wrapper_class: CAL_HD_WRAP,
		calendar_weekdayrow_class: CAL_WDAYROW,
		calendar_weekday_class:  CAL_WDAY,
		calendar_row_class:      CAL_ROW,
		calendar_day_class:      CAL_DAY,
		calendar_dayanchor_class: CAL_ANCHOR
	},
	
	CONTENT_TEMPLATE: '<table class="{calendar_grid_class}" id="{calendar_id}">' +	
	                      '<thead>' +
	                        '{header_template}' +
			                '{weekday_row_template}' +
	                      '</thead>' +
	                      '<tbody>' + 
	                        '{body_template}' +
	                      '</tbody>' +
	                  '</table>',

	HEADER_TEMPLATE: '<tr>' +
	                     '<th colspan="7" class="{calendar_hd_class}">' + 
	                       '<span id="calheader" class="{calendar_hd_wrapper_class}">' +
	                         '{calheader}' +
	                       '</span>' + 
	                     '</th>' +
	                  '</tr>',

	WEEKDAY_ROW_TEMPLATE: '<tr class="{calendar_weekdayrow_class}">' + 
	                         '{weekday_row}' +
						  '</tr>',

	CALDAY_ROW_TEMPLATE: '<tr class="{calendar_row_class}">' + 
						     '{calday_row}' + 
						  '</tr>',

	WEEKDAY_TEMPLATE: '<th class="{calendar_weekday_class}">{weekdayname}</th>',

	CALDAY_TEMPLATE: '<td class="{calendar_col_class} {calendar_day_class} {calendar_col_visibility_class}" id="{calendar_day_id}">' +
	                     '{day_content}' + 
	                 '</td>',
	
	NAME: 'calendarBase',
	
	ATTRS: {
		date: {
			value: new Date(),
			setter: function (val) {
				return new Date(val.getFullYear(), val.getMonth(), 1);
			}
	    },
		month: Number,
		year: Number,
		showPrevMonth: {
			value: false
		},
		showNextMonth: {
			value: false
		},
		strings : {
            valueFn: function() { return Y.Intl.get("calendar-base"); }
        },
        headerRenderer: String
	}
	
});


}, '@VERSION@' ,{lang:['en', 'ru'], requires:['widget', 'substitute', 'datatype-date', 'datatype-date-math']});
