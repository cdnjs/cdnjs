/* Greek (el) initialisation for the jQuery UI date picker plugin. */
/* Written by Alex Cicovic (http://www.alexcicovic.com) */
(function($) {
	$.datepick.regional['el'] = {
		clearText: 'Σβήσιμο', clearStatus: 'Σβήσιμο της επιλεγμένης ημερομηνίας',
		closeText: 'Κλείσιμο', closeStatus: 'Κλείσιμο χωρίς αλλαγή',
		prevText: 'Προηγούμενος', prevStatus: 'Επισκόπηση προηγούμενου μήνα',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: '',
		nextText: 'Επόμενος', nextStatus: 'Επισκόπηση επόμενου μήνα',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: '',
		currentText: 'Τρέχων Μήνας', currentStatus: 'Επισκόπηση τρέχοντος μήνα',
		monthNames: ['Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος',
		'Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'],
		monthNamesShort: ['Ιαν','Φεβ','Μαρ','Απρ','Μαι','Ιουν',
		'Ιουλ','Αυγ','Σεπ','Οκτ','Νοε','Δεκ'],
		monthStatus: 'Επισκόπηση άλλου μήνα', yearStatus: 'Επισκόπηση άλλου έτους',
		weekHeader: 'Εβδ', weekStatus: '',
		dayNames: ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο'],
		dayNamesShort: ['Κυρ','Δευ','Τρι','Τετ','Πεμ','Παρ','Σαβ'],
		dayNamesMin: ['Κυ','Δε','Τρ','Τε','Πε','Πα','Σα'],
		dayStatus: 'Ανάθεση ως πρώτη μέρα της εβδομάδος: DD', dateStatus: 'Επιλογή DD d MM',
		dateFormat: 'dd/mm/yy', firstDay: 1,
		initStatus: 'Επιλέξτε μια ημερομηνία', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['el']);
})(jQuery);
