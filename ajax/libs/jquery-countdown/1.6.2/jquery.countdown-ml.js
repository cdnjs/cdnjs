/* http://keith-wood.name/countdown.html
 * Malayalam/(Indian>>Kerala) initialisation for the jQuery countdown extension
 * Written by Harilal.B (harilal1234@gmail.com) Feb 2013. */
(function($) {
    $.countdown.regional['ml'] = {
        labels: ['വര്‍ഷങ്ങള്‍', 'മാസങ്ങള്‍', 'ആഴ്ചകള്‍', 'ദിവസങ്ങള്‍', 'മണിക്കൂറുകള്‍', 'മിനിറ്റുകള്‍', 'സെക്കന്റുകള്‍'],
        labels1: ['വര്‍ഷം', 'മാസം', 'ആഴ്ച', 'ദിവസം', 'മണിക്കൂര്‍', 'മിനിറ്റ്', 'സെക്കന്റ്'],
        compactLabels: ['വ', 'മ', 'ആ', 'ദി'],
        whichLabels: null,
		digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
//		digits: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
        timeSeparator: ':', isRTL: false};
    $.countdown.setDefaults($.countdown.regional['ml']);
})(jQuery);