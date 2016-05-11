/* http://keith-wood.name/countdown.html
 * Vietnamese initialisation for the jQuery countdown extension
 * Written by Pham Tien Hung phamtienhung@gmail.com (2010) */
(function($) {
	$.countdown.regional['vi'] = {
		labels: ['Năm', 'Tháng', 'Tuần', 'Ngày', 'Giờ', 'Phút', 'Giây'],
		labels1: ['Năm', 'Tháng', 'Tuần', 'Ngày', 'Giờ', 'Phút', 'Giây'],
		compactLabels: ['năm', 'th', 'tu', 'ng'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['vi']);
})(jQuery);