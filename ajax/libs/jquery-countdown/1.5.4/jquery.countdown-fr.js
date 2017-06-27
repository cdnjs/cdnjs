/* http://keith-wood.name/countdown.html
   French initialisation for the jQuery countdown extension
   Written by Keith Wood (kbwood{at}iinet.com.au) Jan 2008. */
(function($) {
	$.countdown.regional['fr'] = {
		labels: ['Années', 'Mois', 'Semaines', 'Jours', 'Heures', 'Minutes', 'Secondes'],
		labels1: ['Année', 'Mois', 'Semaine', 'Jour', 'Heure', 'Minute', 'Seconde'],
		compactLabels: ['a', 'm', 's', 'j'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['fr']);
})(jQuery);
