/* http://keith-wood.name/countdown.html
   Dutch initialisation for the jQuery countdown extension
   Written by Mathias Bynens <http://mathiasbynens.be/> Mar 2008. */
$(document).ready(function() {
	$.countdown.regional['nl'] = {
		labels: ['Jaren', 'Maanden', 'Weken', 'Dagen', 'Uren', 'Minuten', 'Seconden'],
		compactLabels: ['j', 'm', 'w', 'd'], timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['nl']);
});
