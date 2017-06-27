if(!window.calendar_languages) {
	window.calendar_languages = {};
}

window.calendar_languages['bs-BA'] = {
	error_noview:     'Kalendar: View {0} nije pronađen',
	error_dateformat: 'Kalendar: Pogrešan format datuma {0}. Trebao bi biti ili "now" ili "yyyy-mm-dd"',
	error_loadurl:    'Kalendar: URL za događaje nije definisan',
	error_where:      'Kalendar: Pogrešna naredba za navigaciju {0}. Dozvoljene navigacije su "next", "prev" ili "today"',
	error_timedevide: 'Kalendar: Parametar za dijeljenje vremena mora broj 60 dijeliti bez ostatka. Dozvoljeni parametri su npr. 10, 15, 30',

	no_events_in_day: 'Na ovaj dan nema događaja.',

	title_year:  '{0}. godina',
	title_month: '{0} {1}',
	title_week:  '{0}. sedmica u {1}. godini',
	title_day:   '{0}, {1}. {2} {3}.',

	week:        'Sedmica {0}',
	all_day:     'Cijeli dan',
	time:        'Vrijeme',
	events:      'Događaj',
	before_time: 'Završava prije',
	after_time:  'Započinje nakon',

	m0:  'Januar',
	m1:  'Februar',
	m2:  'Mart',
	m3:  'April',
	m4:  'Maj',
	m5:  'Juni',
	m6:  'Juli',
	m7:  'August',
	m8:  'Septembar',
	m9:  'Oktobar',
	m10: 'Novembar',
	m11: 'Decembar',

	ms0:  'Jan',
	ms1:  'Feb',
	ms2:  'Mar',
	ms3:  'Apr',
	ms4:  'Maj',
	ms5:  'Jun',
	ms6:  'Jul',
	ms7:  'Aug',
	ms8:  'Sep',
	ms9:  'Okt',
	ms10: 'Nov',
	ms11: 'Dec',

	d0: 'Nedelja',
	d1: 'Ponedeljak',
	d2: 'Utorak',
	d3: 'Srijeda',
	d4: 'Četvrtak',
	d5: 'Petak',
	d6: 'Subota',

	first_day: 1,
	week_numbers_iso_8601: true,

	holidays: {
		"01-01>02-01": "Nova godina",
		"01-03":       "Dan nezavisnosti Bosne i Hercegovine",
		"01-05>02-05": "Praznik rada",
		"25-11":       "Dan državnosti Bosne i Hercegovine"
	}
};
