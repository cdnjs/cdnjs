/* http://keith-wood.name/countdown.html
   Greek initialisation for the jQuery countdown extension
   Written by Philip. */
(function($) {
	$.countdown.regional['el'] = {
		labels: ['Χρόνια', 'Μήνες', 'Εβδομάδες', 'Μέρες', 'Ώρες', 'Λεπτά', 'Δευτερόλεπτα'],
		labels1: ['Χρόνος', 'Μήνας', 'Εβδομάδα', 'Ημέρα', 'Ώρα', 'Λεπτό', 'Δευτερόλεπτο'],
		compactLabels: ['Χρ.', 'Μην.', 'Εβδ.', 'Ημ.'],
		whichLabels: null,
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['el']);
})(jQuery);