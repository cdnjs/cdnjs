/* http://keith-wood.name/countdown.html
   Simplified Chinese initialisation for the jQuery countdown extension
   Written by Cloudream (cloudream@gmail.com). */
(function($) {
	'use strict';
	$.countdown.regionalOptions['zh-CN'] = {
		labels: ['年','月','周','天','时','分','秒'],
		labels1: ['年','月','周','天','时','分','秒'],
		compactLabels: ['年','月','周','天'],
		compactLabels1: ['年','月','周','天'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions['zh-CN']);
})(jQuery);
