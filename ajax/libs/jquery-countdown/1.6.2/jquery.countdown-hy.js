/* http://keith-wood.name/countdown.html
 * Armenian initialisation for the jQuery countdown extension
 * Written by Artur Martirosyan. (artur{at}zoom.am) October 2011. */
(function($) {
	$.countdown.regional['hy'] = {
		labels: ['Տարի', 'Ամիս', 'Շաբաթ', 'Օր', 'Ժամ', 'Րոպե', 'Վարկյան'],
		labels1: ['Տարի', 'Ամիս', 'Շաբաթ', 'Օր', 'Ժամ', 'Րոպե', 'Վարկյան'],
		compactLabels: ['տ', 'ա', 'շ', 'օ'], 
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['hy']);
})(jQuery);
