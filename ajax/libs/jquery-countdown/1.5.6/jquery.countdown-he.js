/* http://keith-wood.name/countdown.html
 * Hebrew initialisation for the jQuery countdown extension
 * Translated by Nir Livne, Dec 2008 */
(function($) {
	$.countdown.regional['he'] = {
		labels: ['שנים', 'חודשים', 'שבועות', 'ימים', 'שעות', 'דקות', 'שניות'],
		labels1: ['שנה', 'חודש', 'שבוע', 'יום', 'שעה', 'דקה', 'שנייה'],
		compactLabels: ['שנ', 'ח', 'שב', 'י'],
		timeSeparator: ':', isRTL: true};
	$.countdown.setDefaults($.countdown.regional['he']);
})(jQuery);
