/* http://keith-wood.name/countdown.html
   French initialisation for the jQuery countdown extension
   Written by Keith Wood (kbwood@virginbroadband.com.au) Jan 2008. */
$(document).ready(function() {
	$.countdown.regional['fr'] = {
		labels: ['Années', 'Mois', 'Semaines', 'Jours', 'Heures', 'Minutes', 'Secondes'],
		labelsSingle: ['Année', 'Mois', 'Semaine', 'Jour', 'Heure', 'Minute', 'Seconde'],
		compactLabels: ['a', 'm', 's', 'j'], compactLabelsSingle: ['a', 'm', 's', 'j'],
		timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['fr']);
});