/* http://keith-wood.name/countdown.html
   Catalan initialisation for the jQuery countdown extension
   Written by Amanida Media www.amanidamedia.com (2010) */
(function($) {
	$.countdown.regional['ca'] = {
		labels: ['Anys', 'Mesos', 'Setmanes', 'Dies', 'Hores', 'Minuts', 'Segons'],
		labels1: ['Anys', 'Mesos', 'Setmanes', 'Dies', 'Hores', 'Minuts', 'Segons'],
		compactLabels: ['a', 'm', 's', 'g'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['ca']);
})(jQuery);
