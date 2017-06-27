/* http://keith-wood.name/countdown.html
   Korean initialisation for the jQuery countdown extension
   Written by Ryan Yu (ryanyu79@gmail.com). */
(function($) {
	$.countdown.regional['ko'] = {
		labels: ['년', '월', '주', '일', '시', '분', '초'],
		labels1: ['년', '월', '주', '일', '시', '분', '초'],
		compactLabels: ['년', '월', '주', '일'],
		compactLabels1: ['년', '월', '주', '일'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['ko']);
})(jQuery);
