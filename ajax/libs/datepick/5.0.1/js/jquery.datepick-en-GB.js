/* http://keith-wood.name/datepick.html
   English UK localisation for jQuery Datepicker.
   Written by Stuart. */
(function($) {
	$.datepick.regionalOptions['en-GB'] = {
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'Prev', prevStatus: 'Show the previous month',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Show the previous year',
		nextText: 'Next', nextStatus: 'Show the next month',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Show the next year',
		currentText: 'Current', currentStatus: 'Show the current month',
		todayText: 'Today', todayStatus: 'Show today\'s month',
		clearText: 'Clear', clearStatus: 'Erase the current date',
		closeText: 'Done', closeStatus: 'Close without change',
		yearStatus: 'Show a different year', monthStatus: 'Show a different month',
		weekText: 'Wk', weekStatus: 'Week of the year',
		dayStatus: 'Select DD, M d', defaultStatus: 'Select a date',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['en-GB']);
})(jQuery);
