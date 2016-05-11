/* http://keith-wood.name/countdown.html
   Thai initialisation for the jQuery countdown extension
   Written by Pornchai Sakulsrimontri (li_sin_th@yahoo.com). */
(function($) {
	$.countdown.regional['th'] = {
		labels: ['ปี', 'เดือน', 'สัปดาห์', 'วัน', 'ชั่วโมง', 'นาที', 'วินาที'],
		labels1: ['ปี', 'เดือน', 'สัปดาห์', 'วัน', 'ชั่วโมง', 'นาที', 'วินาที'],
		compactLabels: ['ปี', 'เดือน', 'สัปดาห์', 'วัน'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['th']);
})(jQuery);
