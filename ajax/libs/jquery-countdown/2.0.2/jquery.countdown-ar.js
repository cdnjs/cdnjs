/* http://keith-wood.name/countdown.html
   Arabic (عربي) initialisation for the jQuery countdown extension
   Translated by Talal Al Asmari (talal@psdgroups.com), April 2009. */
(function($) {
	$.countdown.regionalOptions['ar'] = {
		labels: ['سنوات','أشهر','أسابيع','أيام','ساعات','دقائق','ثواني'],
		labels1: ['سنة','شهر','أسبوع','يوم','ساعة','دقيقة','ثانية'],
		compactLabels: ['س', 'ش', 'أ', 'ي'],
		whichLabels: null,
		digits: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
		timeSeparator: ':', isRTL: true};
	$.countdown.setDefaults($.countdown.regionalOptions['ar']);
})(jQuery);
