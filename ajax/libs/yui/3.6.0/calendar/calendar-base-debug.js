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

    
var getCN       = Y.ClassNameManager.getClassName,
    CALENDAR    = 'calendar',
    CAL_GRID    = getCN(CALENDAR, 'grid'),
    CAL_BODY    = getCN(CALENDAR, 'body'),
    CAL_HD      = getCN(CALENDAR, 'header'),
    CAL_HD_WRAP = getCN(CALENDAR, 'header-wrap'),
    CAL_WDAYROW = getCN(CALENDAR, 'weekdayrow'),
    CAL_WDAY    = getCN(CALENDAR, 'weekday'),
    CAL_ROW     = getCN(CALENDAR, 'row'),
    CAL_DAY     = getCN(CALENDAR, 'day'),
    CAL_ANCHOR  = getCN(CALENDAR, 'anchor'),

    L           = Y.Lang,
    create      = Y.Node.create,
    substitute  = Y.substitute,
    each        = Y.each;


function CalendarBase() {
	CalendarBase.superclass.constructor.apply ( this, arguments );
}

Y.CalendarBase = Y.extend( CalendarBase, Y.Widget, {
	
	initializer : function () {
	},
	
	renderUI : function () {
	    var contentBox = this.get('contentBox');
	    contentBox.appendChild(this._initCalendarHTML(new Date("5/21/1947")));
	    Y.log("Rendered Calendar UI");
	},
	
	bindUI : function () {
		
	},
	
    _getCutoffColumn : function (date) {

	 var normalizedDate = new Date(date.getFullYear(), date.getMonth(), 1);
	 return (1-normalizedDate.getDay());

    },
	
	_initCalendarHTML : function (baseDate) {

		var startDate = baseDate || new Date(),
		    cutoffCol = this._getCutoffColumn(startDate),
		    headerData = {calheader: (startDate.getMonth()+1) + "/" + 
		                             startDate.getFullYear()},
		    calString = '',
		    weekdays = {wday1: 'Su',
		                wday2: 'Mo',
		                wday3: 'Tu',
		                wday4: 'We',
		                wday5: 'Th',
		                wday6: 'Fr',
		                wday7: 'Sa'};

		var partials = {};
		    partials["header_template"] =  substitute(CalendarBase.HEADER_TEMPLATE, 
					                                  headerData);
			
			partials["weekday_row"] = '';
			
			each (weekdays, function (v) {
				                              partials["weekday_row"] += 
				                               substitute(CalendarBase.WEEKDAY_TEMPLATE,
					                                      {weekdayname: v});
			                             }
			     );

			partials["wdayrow_template"] = substitute(CalendarBase.WEEKDAY_ROW_TEMPLATE, partials);


			
			var row_array = [];

			for (var i = 0; i <= 5; i++) {
				var calday_row = '';
				for (var j = -5; j <=7; j++) {
				   calday_row += substitute (CalendarBase.CALDAY_TEMPLATE, {day_content: '' + (j+7*i),
				                                                            day_display_status: (j >= cutoffCol && j <= (cutoffCol + 6)) ? '' : 'style="display:none;"'});
				}
				row_array.push(substitute(CalendarBase.CALDAY_ROW_TEMPLATE, {calday_row: calday_row} ));
			}
			
			partials["body_template"] = row_array.join('\n');

	    var header = substitute(substitute (CalendarBase.CONTENT_TEMPLATE, partials),
			                    CalendarBase.CALENDAR_CLASSES);

		
		return header;
	}
}, {
	// Y.CalendarBase static properties
	
	CALENDAR_CLASSES : {
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
	
	CONTENT_TEMPLATE: '<table class="{calendar_grid_class}">' +
	                    '<thead>' +
	                       '{header_template}' +
	                       '{wdayrow_template}' +
	                    '</thead>' +
	                    '<tbody class="{calendar_body_class}">' +
	                      '{body_template}' +
	                    '</tbody>' +
	                  '</table>',

	HEADER_TEMPLATE: '<tr>' +
	                     '<th colspan="7" class="{calendar_hd_class}">' + 
	                       '<div id="calheader" class="{calendar_hd_wrapper_class}">' +
	                         '{calheader}' +
	                       '</div>' + 
	                     '</th>' +
	                  '</tr>',
	
	WEEKDAY_ROW_TEMPLATE: '<tr class="{calendar_weekdayrow_class}">' + 
	                         '{weekday_row}' +
						  '</tr>',

	CALDAY_ROW_TEMPLATE: '<tr class="{calendar_row_class}">' + 
						     '{calday_row}' + 
						  '</tr>',

	WEEKDAY_TEMPLATE: '<th class="{calendar_weekday_class}">{weekdayname}</th>',

	CALDAY_TEMPLATE: '<td class="{calendar_day_class}" {day_display_status}>' +
	                     '<a href="#" class="{calendar_dayanchor_class}">' +
	                         '{day_content}' +
	                     '</a>' + 
	                 '</td>',
	
	NAME: 'calendarBase',
	
	ATTRS: {
		
	}
	
});


}, '@VERSION@' ,{requires:['widget', 'datatype-date']});
