/* http://keith-wood.name/datepick.html
   Slovenian localisation for jQuery Datepicker.
   Written by Jaka Jancar (jaka@kubje.org). */
/* c = &#x10D;, s = &#x161; z = &#x17E; C = &#x10C; S = &#x160; Z = &#x17D; */
(function($) {
	$.datepick.regionalOptions['sl'] = {
		monthNames: ['Januar','Februar','Marec','April','Maj','Junij',
		'Julij','Avgust','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljek','Torek','Sreda','&#x10C;etrtek','Petek','Sobota'],
		dayNamesShort: ['Ned','Pon','Tor','Sre','&#x10C;et','Pet','Sob'],
		dayNamesMin: ['Ne','Po','To','Sr','&#x10C;e','Pe','So'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&lt;Prej&#x161;nji', prevStatus: 'Prika&#x17E;i prej&#x161;nji mesec',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Naslednji&gt;', nextStatus: 'Prika&#x17E;i naslednji mesec',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Trenutni', currentStatus: 'Prika&#x17E;i trenutni mesec',
		todayText: 'Trenutni', todayStatus: 'Prika&#x17E;i trenutni mesec',
		clearText: 'Izbri&#x161;i', clearStatus: 'Izbri&#x161;i trenutni datum',
		closeText: 'Zapri', closeStatus: 'Zapri brez spreminjanja',
		yearStatus: 'Prika&#x17E;i drugo leto', monthStatus: 'Prika&#x17E;i drug mesec',
		weekText: 'Teden', weekStatus: 'Teden v letu',
		dayStatus: 'Izberi DD, d MM yy', defaultStatus: 'Izbira datuma',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['sl']);
})(jQuery);
