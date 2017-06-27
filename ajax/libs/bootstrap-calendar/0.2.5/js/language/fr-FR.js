if(!window.calendar_languages) {
	window.calendar_languages = {};
}
window.calendar_languages['fr-FR'] = {
	error_noview:     'Calendrier: Vue {0} introuvable',
	error_dateformat: 'Calendrier: Format de date incorrect {0}. Formats acceptés : "now" ou "yyyy-mm-dd"',
	error_loadurl:    'Calendrier: L\'adresse de chargement des évènements n\'est pas définie',
	error_where:      'Calendrier: Mauvaise commande de navigation {0}. Commandes acceptées : "suivant", "précédent" or "aujourd\'hui"',
	error_timedevide: 'Calendrier: La valeur des espaces-temps doit diviser 60 avec une valeur exacte. Par exemple 10, 15, 30',

	title_year:  'Année {0}',
	title_month: '{0} {1}',
	title_week:  'Semaine {0}',
	title_day:   '{0} {1} {2} {3}',

	week:        'Semaine {0}',
	all_day:     'Toute la journée',
	time:        'Heure',
	events:      'Evènements',
	before_time: 'Se terminant avant le début de plage horaire',
	after_time:  'Se terminant après la fin de la plage horaire',

	m0:  'Janvier',
	m1:  'Février',
	m2:  'Mars',
	m3:  'Avril',
	m4:  'Mai',
	m5:  'Juin',
	m6:  'Juillet',
	m7:  'Août',
	m8:  'Septembre',
	m9:  'Octobre',
	m10: 'Novembre',
	m11: 'Décembre',

	ms0:  'Jan',
	ms1:  'Fév',
	ms2:  'Mar',
	ms3:  'Avr',
	ms4:  'Mai',
	ms5:  'Jun',
	ms6:  'Jul',
	ms7:  'Aoû',
	ms8:  'Sep',
	ms9:  'Oct',
	ms10: 'Nov',
	ms11: 'Déc',

	d0: 'Dimanche',
	d1: 'Lundi',
	d2: 'Mardi',
	d3: 'Mercredi',
	d4: 'Jeudi',
	d5: 'Vendredi',
	d6: 'Samedi',

	first_day: 1,
	week_numbers_iso_8601: true,

	holidays: {
		'01-01':     "Premier de l'an",
		'easter':    "Pâques",
		'easter+1':  "Lundi de Pâques",
		'01-05':     "Fête du Travail",
		'08-05':     "Fête de la Victoire 1945",
		'easter+39': "Ascension",
		'easter+49': "Pentecôte",
		'easter+50': "Lundi de Pentecôte",
		'14-07':     "Fête Nationale",
		'15-08':     "Assomption",
		'01-11':     "Toussaint",
		'11-11':     "Armistice 1918",
		'25-12':     "Noël"
	}
};
