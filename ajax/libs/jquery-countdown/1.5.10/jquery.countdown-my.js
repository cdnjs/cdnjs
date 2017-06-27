/* http://keith-wood.name/countdown.html
   Burmese initialisation for the jQuery countdown extension
   Written by Win Lwin Moe (winnlwinmoe@gmail.com) Dec 2009. */
(function($) {
	$.countdown.regional['my'] = {
		labels: ['နွစ္', 'လ', 'ရက္သတဿတပတ္', 'ရက္', 'နာရီ', 'မိနစ္', 'စကဿကန့္'],
		labels1: ['နွစ္', 'လ', 'ရက္သတဿတပတ္', 'ရက္', 'နာရီ', 'မိနစ္', 'စကဿကန့္'],
		compactLabels: ['နွစ္', 'လ', 'ရက္သတဿတပတ္', 'ရက္'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['my']);
})(jQuery);