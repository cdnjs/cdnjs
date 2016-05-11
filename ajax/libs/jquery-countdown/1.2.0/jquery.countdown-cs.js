/* http://keith-wood.name/countdown.html
 * Czech initialisation for the jQuery countdown extension
 * Written by Miroslav Koula mkoula@gmail.com (2008) */
$(document).ready(function() {
	$.countdown.regional['cs'] = {
		labels: ['Roky', 'Měsíce', 'Týdny', 'Dny', 'Hodiny', 'Minuty', 'Sekundy'],
		compactLabels: ['r', 'm', 't', 'd'], timeSeparator: ':'};
	$.countdown.setDefaults($.countdown.regional['cs']);
});
