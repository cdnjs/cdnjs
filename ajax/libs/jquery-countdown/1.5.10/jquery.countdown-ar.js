/* http://keith-wood.name/countdown.html
   Arabic (عربي) initialisation for the jQuery countdown extension
   Translated by Talal Al Asmari (talal@psdgroups.com), April 2009. */
(function($) {
	$.countdown.regional['ar'] = {
		labels: ['سنوات','أشهر','أسابيع','أيام','ساعات','دقائق','ثواني'],
		labels1: ['سنة','شهر','أسبوع','يوم','ساعة','دقيقة','ثانية'],
		compactLabels: ['س', 'ش', 'أ', 'ي'],
		whichLabels: null,
		timeSeparator: ':', isRTL: true};
	$.countdown.setDefaults($.countdown.regional['ar']);
})(jQuery);
