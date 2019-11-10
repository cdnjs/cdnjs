/* http://keith-wood.name/countdown.html
 * Lithuanian localisation for the jQuery countdown extension
 * Written by Moacir P. de Sá Pereira (moacir{at}gmail.com) (2009) */
(function($) {
	$.countdown.regional['lt'] = {
		labels: ['Metų', 'Mėnesių', 'Savaičių', 'Dienų', 'Valandų', 'Minučių', 'Sekundžių'],
		labels1: ['Metai', 'Mėnuo', 'Savaitė', 'Diena', 'Valanda', 'Minutė', 'Sekundė'],
		compactLabels: ['m', 'm', 's', 'd'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['lt']);
})(jQuery);
