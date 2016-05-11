/* http://keith-wood.name/countdown.html
   Catalan initialisation for the jQuery countdown extension
   Written by Amanida Media www.amanidamedia.com (2010) */
(function($) {
	$.countdown.regional['ca'] = {
		labels: ['Anys', 'Mesos', 'Setmanes', 'Dies', 'Hores', 'Minuts', 'Segons'],
		labels1: ['Anys', 'Mesos', 'Setmanes', 'Dies', 'Hores', 'Minuts', 'Segons'],
		compactLabels: ['a', 'm', 's', 'g'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['ca']);
})(jQuery);
