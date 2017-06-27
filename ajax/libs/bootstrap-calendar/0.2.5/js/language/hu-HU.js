// If you want to suggest a new language you can use this file as a template.
// To reduce the file size you should remove the comment lines (the ones that start with // )
if(!window.calendar_languages) {
	window.calendar_languages = {};
}
// Here you define the language and Country code. Replace en-US with your own.
// First letters: the language code (lower case). See http://www.loc.gov/standards/iso639-2/php/code_list.php
// Last letters: the Country code (upper case). See http://www.iso.org/iso/home/standards/country_codes/country_names_and_code_elements.htm
window.calendar_languages['hu-HU'] = {
	error_noview: 'Naptár: {0} nézet nem található',
	error_dateformat: 'Naptár: Hibás dátum formátum {0}.  "now" vagy "éééé-hh-nn" lehet',
	error_loadurl: 'Naptár: Esemény URL nincs beállítva',
	error_where: 'Naptár: Rossz navigálási irány {0}. Csak "next", "prev" vagy "today" lehet',
	error_timedevide: 'Naptár: Az idő elválasztó 60 maradék nélküli osztója kell legyen. Például: 10, 15, 30',
	no_events_in_day: 'Nincs esemény.',

	title_year: '{0}',
	title_month: '{1} {0}' ,
	title_week: '{1} {0}. hét',
	title_day: '{3}. {2} {1}., {0}',

	week:'{0}. hét',
	all_day:     'Egész napos',
	time:        'Idő',
	events:      'Események',
	before_time: 'Az idővonal előtt végződik',
	after_time:  'Az idővonal után kezdődik',

	m0: 'Január',
	m1: 'Február',
	m2: 'Március',
	m3: 'Április',
	m4: 'Május',
	m5: 'Június',
	m6: 'Július',
	m7: 'Augusztus',
	m8: 'Szeptember',
	m9: 'Október',
	m10: 'November',
	m11: 'December',

	ms0: 'Jan',
	ms1: 'Feb',
	ms2: 'Már',
	ms3: 'Ápr',
	ms4: 'Máj',
	ms5: 'Jún',
	ms6: 'Júl',
	ms7: 'Aug',
	ms8: 'Szep',
	ms9: 'Okt',
	ms10: 'Nov',
	ms11: 'Dec',

	d0: 'Vasárnap',
	d1: 'Hétfő',
	d2: 'Kedd',
	d3: 'Szerda',
	d4: 'Csütörtök',
	d5: 'Péntek',
	d6: 'Szombat',

	// Which is the first day of the week (2 for sunday, 1 for monday)
	first_day: 1,
	week_numbers_iso_8601: true,
    holidays: {
		'01-01':     'Újév',
		'easter+1':  'Húsvéthétfő',
		'01-05':     'Május elseje',
		'15-13':     '1848–49-es forradalom és szabadságharc',
		'easter+49': 'Pünkösdvasárnap',
		'easter+50': 'Pünkösdhétfő',
		'08-20':     'Államalapítás ünnepe',
		'10-23':     '1956-os forradalom és szabadságharc',
		'25-12':     'Karácsony',
		'26-12':     'Karácsony'
	}

};
