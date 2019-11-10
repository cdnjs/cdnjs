/* http://keith-wood.name/datepick.html
   Greek localisation for jQuery Datepicker.
   Written by Alex Cicovic (http://www.alexcicovic.com) */
(function($) {
	$.datepick.regionalOptions['el'] = {
		monthNames: ['Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος',
		'Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'],
		monthNamesShort: ['Ιαν','Φεβ','Μαρ','Απρ','Μαι','Ιουν',
		'Ιουλ','Αυγ','Σεπ','Οκτ','Νοε','Δεκ'],
		dayNames: ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο'],
		dayNamesShort: ['Κυρ','Δευ','Τρι','Τετ','Πεμ','Παρ','Σαβ'],
		dayNamesMin: ['Κυ','Δε','Τρ','Τε','Πε','Πα','Σα'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'Προηγούμενος', prevStatus: 'Επισκόπηση προηγούμενου μήνα',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Επόμενος', nextStatus: 'Επισκόπηση επόμενου μήνα',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Τρέχων Μήνας', currentStatus: 'Επισκόπηση τρέχοντος μήνα',
		todayText: 'Τρέχων Μήνας', todayStatus: 'Επισκόπηση τρέχοντος μήνα',
		clearText: 'Σβήσιμο', clearStatus: 'Σβήσιμο της επιλεγμένης ημερομηνίας',
		closeText: 'Κλείσιμο', closeStatus: 'Κλείσιμο χωρίς αλλαγή',
		yearStatus: 'Επισκόπηση άλλου έτους', monthStatus: 'Επισκόπηση άλλου μήνα',
		weekText: 'Εβδ', weekStatus: '',
		dayStatus: 'Επιλογή DD d MM', defaultStatus: 'Επιλέξτε μια ημερομηνία',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['el']);
})(jQuery);
