/* http://keith-wood.name/countdown.html
   Indonesian initialisation for the jQuery countdown extension
   Written by Erwin Yonathan Jan 2009. */
(function($) {
	$.countdown.regional['id'] = {
		labels: ['tahun', 'bulan', 'minggu', 'hari', 'jam', 'menit', 'detik'],
		labels1: ['tahun', 'bulan', 'minggu', 'hari', 'jam', 'menit', 'detik'],
		compactLabels: ['t', 'b', 'm', 'h'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['id']);
})(jQuery);
