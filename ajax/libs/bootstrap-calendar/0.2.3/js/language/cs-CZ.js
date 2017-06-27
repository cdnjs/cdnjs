// If you want to suggest a new language you can use this file as a template.
// To reduce the file size you should remove the comment lines (the ones that start with // )
if(!window.calendar_languages) {
	window.calendar_languages = {};
}
// Here you define the language and Country code. Replace en-US with your own.
// First letters: the language code (lower case). See http://www.loc.gov/standards/iso639-2/php/code_list.php
// Last letters: the Country code (upper case). See http://www.iso.org/iso/home/standards/country_codes/country_names_and_code_elements.htm
window.calendar_languages['cs-CZ'] = {
	error_noview: 'Kalendář: Pohled {0} nebyl nalezen',
	error_dateformat: 'Kalendář: Chybný formát data {0}. Zvolte "now" nebo "yyyy-mm-dd"',
	error_loadurl: 'Kalendář: Není vyplněno URL události',
	error_where: 'Kalendář: Chyba navigace {0}. Can be only "next" or "prev" or "today"',
	error_timedevide: 'Kalendář: Rozdělení času musí být dělitelem 60 beze zbytku. Například 10, 15, 30',

	no_events_in_day: 'Dnes žádné události.',

	// {0} will be replaced with the year (example: 2013)
	title_year: '{0}',
	// {0} will be replaced with the month name (example: September)
	// {1} will be replaced with the year (example: 2013)
	title_month: '{0} {1}',
	// {0} will be replaced with the week number (example: 37)
	// {1} will be replaced with the year (example: 2013)
	title_week: 'týden {0} of {1}',
	// {0} will be replaced with the weekday name (example: Thursday)
	// {1} will be replaced with the day of the month (example: 12)
	// {2} will be replaced with the month name (example: September)
	// {3} will be replaced with the year (example: 2013)
	title_day: '{0} {1} {2}, {3}',

	week:        'Týden {0}',
	all_day:     'Celý den',
	time:        'Čas',
	events:      'Události',
	before_time: 'Ends before timeline',
	after_time:  'Starts after timeline',

	m0: 'Leden',
	m1: 'Únor',
	m2: 'Březen',
	m3: 'Duben',
	m4: 'Květen',
	m5: 'Červen',
	m6: 'Červenec',
	m7: 'Srpen',
	m8: 'Září',
	m9: 'Říjen',
	m10: 'Listopad',
	m11: 'Prosinec',

	ms0: 'Led',
	ms1: 'Úno',
	ms2: 'Bře',
	ms3: 'Dub',
	ms4: 'Kvě',
	ms5: 'Čer',
	ms6: 'Črv',
	ms7: 'Srp',
	ms8: 'Zář',
	ms9: 'Říj',
	ms10: 'Lis',
	ms11: 'Pro',

	d0: 'Neděle',
	d1: 'Pondělí',
	d2: 'Úterý',
	d3: 'Středa',
	d4: 'Čtvrtek',
	d5: 'Pátek',
	d6: 'Sobota',

	// Which is the first day of the week (2 for sunday, 1 for monday)
	first_day: 1,

	// The list of the holidays.
	// Each holiday has a date definition and a name (in your language)
	// For instance:
	// holidays: {
	// 	'date': 'name',
	// 	'date': 'name',
	// 	...
	//   'date': 'name' //No ending comma for the last holiday
	// }
	// The format of the date may be one of the following:
	// # For a holiday recurring every year in the same day: 'dd-mm' (dd is the day of the month, mm is the month). For example: '25-12'.
	// # For a holiday that exists only in one specific year: 'dd-mm-yyyy' (dd is the day of the month, mm is the month, yyyy is the year). For example: '31-01-2013'
	// # For Easter: use simply 'easter'
	// # For holidays that are based on the Easter date: 'easter+offset in days'.
	//   Some examples:
	//   - 'easter-2' is Good Friday (2 days before Easter)
	//   - 'easter+1' is Easter Monday (1 day after Easter)
	//   - 'easter+39' is the Ascension Day
	//   - 'easter+49' is Pentecost
	// # For holidays that are on a specific weekday after the beginning of a month: 'mm+n*w', where 'mm' is the month, 'n' is the ordinal position, 'w' is the weekday being 0: Sunday, 1: Monday, ..., 6: Saturnday
	//   For example:
	//   - Second (2) Monday (1) in October (10): '10+2*1'
	// # For holidays that are on a specific weekday before the ending of a month: 'mm-n*w', where 'mm' is the month, 'n' is the ordinal position, 'w' is the weekday being 0: Sunday, 1: Monday, ..., 6: Saturnday
	//   For example:
	//   - Last (1) Saturnday (6) in Match (03): '03-1*6'
	//   - Last (1) Monday (1) in May (05): '05-1*1'
	// # You can also specify a holiday that lasts more than one day. To do that use the format 'start>end' where 'start' and 'end' are specified as above.
	//   For example:
	//   - From 1 January to 6 January: '01-01>06-01'
	//   - Easter and the day after Easter: 'easter>easter+1'
	//   Limitations: currently the multi-day holydays can't cross an year. So, for example, you can't specify a range as '30-12>01-01'; as a workaround you can specify two distinct holidays (for instance '30-12>31-12' and '01-01').
	holidays: {
	}
};
