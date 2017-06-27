/* http://keith-wood.name/datepick.html
   Hungarian localisation for jQuery Datepicker.
   Written by Istvan Karaszi (jquery@spam.raszi.hu). */
(function($) {
	$.datepick.regional['hu'] = {
		monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
		'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún',
		'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vasárnap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
		dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		dateFormat: 'yyyy-mm-dd', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&laquo;&nbsp;vissza', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'előre&nbsp;&raquo;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'ma', currentStatus: '',
		todayText: 'ma', todayStatus: '',
		clearText: 'törlés', clearStatus: '',
		closeText: 'bezárás', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Hé', weekStatus: '',
		dayStatus: 'D, M d', defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['hu']);
})(jQuery);
