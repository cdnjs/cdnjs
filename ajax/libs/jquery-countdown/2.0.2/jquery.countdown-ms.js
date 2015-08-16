/* http://keith-wood.name/countdown.html
   Malay initialisation for the jQuery countdown extension
   Written by Jason Ong (jason{at}portalgroove.com) May 2010. */
(function($) {
	$.countdown.regionalOptions['ms'] = {
		labels: ['Tahun', 'Bulan', 'Minggu', 'Hari', 'Jam', 'Minit', 'Saat'],
		labels1: ['Tahun', 'Bulan', 'Minggu', 'Hari', 'Jam', 'Minit', 'Saat'],
		compactLabels: ['t', 'b', 'm', 'h'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['ms']);
})(jQuery);
