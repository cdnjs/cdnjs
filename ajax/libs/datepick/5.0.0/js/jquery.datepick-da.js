/* http://keith-wood.name/datepick.html
   Danish localisation for jQuery Datepicker.
   Written by Jan Christensen ( deletestuff@gmail.com). */
(function($) {
    $.datepick.regionalOptions['da'] = {
        monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
        'Juli','August','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
		dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
		dayNamesMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
        dateFormat: 'dd-mm-yyyy', firstDay: 0,
		renderer: $.datepick.defaultRenderer,
        prevText: '&#x3c;Forrige', prevStatus: 'Vis forrige måned',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Næste&#x3e;', nextStatus: 'Vis næste måned',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Idag', currentStatus: 'Vis aktuel måned',
		todayText: 'Idag', todayStatus: 'Vis aktuel måned',
		clearText: 'Nulstil', clearStatus: 'Nulstil den aktuelle dato',
		closeText: 'Luk', closeStatus: 'Luk uden ændringer',
		yearStatus: 'Vis et andet år', monthStatus: 'Vis en anden måned',
		weekText: 'Uge', weekStatus: 'Årets uge',
		dayStatus: 'Vælg D, M d', defaultStatus: 'Vælg en dato',
		isRTL: false
	};
    $.datepick.setDefaults($.datepick.regionalOptions['da']);
})(jQuery);
