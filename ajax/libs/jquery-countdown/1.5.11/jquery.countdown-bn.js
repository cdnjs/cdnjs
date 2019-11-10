/* http://keith-wood.name/countdown.html
 * Bengali/Bangla initialisation for the jQuery countdown extension
 * Written by Mohammed Tajuddin (tajuddin@chittagong-it.com) Jan 2011. */
(function($) {
    $.countdown.regional['bn'] = {
        labels: ['বছর', 'মাস', 'সপ্তাহ', 'দিন', 'ঘন্টা', 'মিনিট', 'সেকেন্ড'],
        labels1: ['বছর', 'মাস', 'সপ্তাহ', 'দিন', 'ঘন্টা', 'মিনিট', 'সেকেন্ড'],
        compactLabels: ['ব', 'মা', 'স', 'দি'],
        whichLabels: null,
        timeSeparator: ':', isRTL: false
    };
    $.countdown.setDefaults($.countdown.regional['bn']);
})(jQuery);
