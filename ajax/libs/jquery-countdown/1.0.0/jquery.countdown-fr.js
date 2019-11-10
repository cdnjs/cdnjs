/* http://keith-wood.name/countdown.html
   French initialisation for the jQuery countdown extension
   Written by Keith Wood (kbwood@virginbroadband.com.au) Jan 2008. */
$(document).ready(function() {
	$.countdown.regional['fr'] = {
		labels: ['Jours', 'Heures', 'Minutes', 'Secondes'],
		compactDays: 'j', timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['fr']);
});