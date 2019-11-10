/* http://keith-wood.name/countdown.html
 * Gujarati initialization for the jQuery countdown extension
 * Written by Sahil Jariwala jariwala.sahil@gmail.com (2012) */
(function($) {
	'use strict';
	$.countdown.regionalOptions.gu = {
		labels: ['વર્ષ','મહિનો','અઠવાડિયા','દિવસ','કલાક','મિનિટ','સેકન્ડ'],
		labels1: ['વર્ષ','મહિનો','અઠવાડિયા','દિવસ','કલાક','મિનિટ','સેકન્ડ'],
		compactLabels: ['વ','મ','અ','દિ'],
		whichLabels: null,
		digits: ['0','1','2','3','4','5','6','7','8','9'],
		timeSeparator: ':',
		isRTL: false
	};
	$.countdown.setDefaults($.countdown.regionalOptions.gu);
})(jQuery);
