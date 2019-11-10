/* http://keith-wood.name/datepick.html
   Swedish localisation for jQuery Datepicker.
   Written by Anders Ekdahl ( anders@nomadiz.se). */
(function($) {
	'use strict';
    $.datepick.regionalOptions.sv = {
        monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
        'Juli','Augusti','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
		dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
		dayNamesMin: ['Sö','Må','Ti','On','To','Fr','Lö'],
        dateFormat: 'yyyy-mm-dd',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
        prevText: '&laquo;Förra',
		prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Nästa&raquo;',
		nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'Idag',
		currentStatus: '',
		todayText: 'Idag',
		todayStatus: '',
		clearText: 'Rensa',
		clearStatus: '',
		closeText: 'Stäng',
		closeStatus: '',
		yearStatus: '',
		monthStatus: '',
		weekText: 'Ve',
		weekStatus: '',
		dayStatus: 'D, M d',
		defaultStatus: '',
		isRTL: false
	};
    $.datepick.setDefaults($.datepick.regionalOptions.sv);
})(jQuery);
