if(!window.calendar_languages) {
	window.calendar_languages = {};
}
window.calendar_languages['nl-NL'] = {
	error_noview:     'Kalender: View {0} niet gevonden',
	error_dateformat: 'Kalender: Verkeerde datum formaat {0}. Dit formaat moet "now" zijn of "yyyy-mm-dd"',
	error_loadurl:    'Kalender: Agenda laad URL is niet gezet (loadUrl)',
	error_where:      'Kalender: Verkeerde navigatie richting {0}. Kan alleen "next", "prev" of "today" zijn',
	error_timedevide: 'Kalender: De tijd split parameter moet 60 kunnen verdelen naar een geheel getal (zonder decimalen). Bijvoorbeeld 10, 15, 30',

	no_events_in_day: 'Geen evenementen gevonden op deze dag.',

	title_year:  '{0}',
	title_month: '{0} {1}',
	title_week:  'week {0} van {1}',
	title_day:   '{0} {1} {2}, {3}',

	week:        'Week {0}',
	all_day:     'De hele dag door',
	time:        'Tijd',
	events:      'Agenda-item',
	before_time: 'Eindigd voor tijdlijn',
	after_time:  'Start na tijdlijn',

	m0:  'Januari',
	m1:  'Februari',
	m2:  'Maart',
	m3:  'April',
	m4:  'Mei',
	m5:  'Juni',
	m6:  'Juli',
	m7:  'Augustus',
	m8:  'September',
	m9:  'Oktober',
	m10: 'November',
	m11: 'December',

	ms0:  'Jan',
	ms1:  'Feb',
	ms2:  'Mrt',
	ms3:  'Apr',
	ms4:  'Mei',
	ms5:  'Jun',
	ms6:  'Jul',
	ms7:  'Aug',
	ms8:  'Sep',
	ms9:  'Okt',
	ms10: 'Nov',
	ms11: 'Dec',

	d0: 'Zondag',
	d1: 'Maandag',
	d2: 'Dinsdag',
	d3: 'Woensdag',
	d4: 'Donderdag',
	d5: 'Vrijdag',
	d6: 'Zaterdag',

	first_day: 1,
	week_numbers_iso_8601: true,

	holidays: {
		'01-01':     'Nieuwjaarsdag',
		'06-01':     'Drie koningen',
		'easter-2':  'Goede vrijdag',
		'easter':    '1e paasdag',
		'easter+1':  '2e paasdag',
		'26-04':     'Koningsdag',
		'05-05':     'Bevrijdingsdag',
		'easter+39': 'Hemelvaartsdag',
		'easter+49': '1e pinksterdag',
		'easter+50': '2e pinksterdag',
		'25-12':     '1e kerstdag',
		'26-12':     '2e kerstdag'
	}
};
