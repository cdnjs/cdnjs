// If you want to suggest a new language you can use this file as a template.
// To reduce the file size you should remove the comment lines (the ones that start with // )
if(!window.calendar_languages) {
	window.calendar_languages = {};
}
// Here you define the language and Country code. Replace en-US with your own.
// First letters: the language code (lower case). See http://www.loc.gov/standards/iso639-2/php/code_list.php
// Last letters: the Country code (upper case). See http://www.iso.org/iso/home/standards/country_codes/country_names_and_code_elements.htm
window.calendar_languages['en-US'] = {
	error_noview: 'Calendar: View {0} not found',
	error_dateformat: 'Calendar: Wrong date format {0}. Should be either "now" or "yyyy-mm-dd"',
	error_loadurl: 'Calendar: Event URL is not set',
	error_where: 'Calendar: Wrong navigation direction {0}. Can be only "next" or "prev" or "today"',

	// {0} will be replaced with the year (example: 2013)
	title_year: '{0}',
	// {0} will be replaced with the month name (example: September)
	// {1} will be replaced with the year (example: 2013)
	title_month: '{0} {1}',
	// {0} will be replaced with the week number (example: 37)
	// {1} will be replaced with the year (example: 2013)
	title_week: 'week {0} of {1}',
	// {0} will be replaced with the weekday name (example: Thursday)
	// {1} will be replaced with the day of the month (example: 12)
	// {2} will be replaced with the month name (example: September)
	// {3} will be replaced with the year (example: 2013)
	title_day: '{0} {1} {2}, {3}',

	week:'Week',

	m0: 'January',
	m1: 'February',
	m2: 'March',
	m3: 'April',
	m4: 'May',
	m5: 'June',
	m6: 'July',
	m7: 'August',
	m8: 'September',
	m9: 'October',
	m10: 'November',
	m11: 'December',

	ms0: 'Jan',
	ms1: 'Feb',
	ms2: 'Mar',
	ms3: 'Apr',
	ms4: 'May',
	ms5: 'Jun',
	ms6: 'Jul',
	ms7: 'Aug',
	ms8: 'Sep',
	ms9: 'Oct',
	ms10: 'Nov',
	ms11: 'Dec',

	d0: 'Sunday',
	d1: 'Monday',
	d2: 'Tuesday',
	d3: 'Wednesday',
	d4: 'Thursday',
	d5: 'Friday',
	d6: 'Saturday',

	easter: 'Easter',
	easterMonday: 'Easter Monday',

	// Set to true if you want to enable Easter and Easter Monday as holidays
	enable_easter_holidays: true,
	// Which is the first day of the week (2 for sunday, 1 for monday)
	first_day: 2
};