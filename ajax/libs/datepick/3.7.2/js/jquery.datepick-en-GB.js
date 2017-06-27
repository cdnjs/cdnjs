/* English UK initialisation for the jQuery UI date picker plugin. */
/* Written by Stuart. */
(function($) {
	$.datepick.regional['en-GB'] = {
		clearText: 'Clear', clearStatus: 'Erase the current date',
		closeText: 'Done', closeStatus: 'Close without change',
		prevText: 'Prev', prevStatus: 'Show the previous month',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Show the previous year',
		nextText: 'Next', nextStatus: 'Show the next month',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Show the next year',
		currentText: 'Today', currentStatus: 'Show the current month',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		monthStatus: 'Show a different month', yearStatus: 'Show a different year',
		weekHeader: 'Wk', weekStatus: 'Week of the year',
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		dayStatus: 'Set DD as first week day', dateStatus: 'Select DD, M d',
		dateFormat: 'dd/mm/yy', firstDay: 1,
		initStatus: 'Select a date', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['en-GB']);
})(jQuery);
