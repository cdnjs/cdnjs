/* http://keith-wood.name/countdown.html
 * Kannada initialization for the jQuery countdown extension
 * Written by Guru Chaturvedi guru@gangarasa.com (2011) */
(function($) {
	$.countdown.regionalOptions['kn'] = {
		labels: ['ವರ್ಷಗಳು', 'ತಿಂಗಳು', 'ವಾರಗಳು', 'ದಿನಗಳು', 'ಘಂಟೆಗಳು', 'ನಿಮಿಷಗಳು', 'ಕ್ಷಣಗಳು'],
		labels1: ['ವರ್ಷ', 'ತಿಂಗಳು', 'ವಾರ', 'ದಿನ', 'ಘಂಟೆ', 'ನಿಮಿಷ', 'ಕ್ಷಣ'],
		compactLabels: ['ವ', 'ತಿ', 'ವಾ', 'ದಿ'],
		whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regionalOptions['kn']);
})(jQuery);
