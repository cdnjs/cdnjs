/* http://keith-wood.name/datepick.html
   Finnish localisation for jQuery Datepicker.
   Written by Harri Kilpiö (harrikilpio@gmail.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.fi = {
		monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kes&auml;kuu',
		'Hein&auml;kuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
		monthNamesShort: ['Tammi','Helmi','Maalis','Huhti','Touko','Kes&auml;',
		'Hein&auml;','Elo','Syys','Loka','Marras','Joulu'],
		dayNamesShort: ['Su','Ma','Ti','Ke','To','Pe','Su'],
		dayNames: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
		dayNamesMin: ['Su','Ma','Ti','Ke','To','Pe','La'],
		dateFormat: 'dd.mm.yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&laquo;Edellinen',
		prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'Seuraava&raquo;',
		nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'T&auml;n&auml;&auml;n',
		currentStatus: '',
		todayText: 'T&auml;n&auml;&auml;n',
		todayStatus: '',
		clearText: 'Tyhjenn&auml;',
		clearStatus: '',
		closeText: 'Sulje',
		closeStatus: '',
		yearStatus: '',
		monthStatus: '',
		weekText: 'Vk',
		weekStatus: '',
		dayStatus: 'D, M d',
		defaultStatus: '',
		isRTL: false
	};
    $.datepick.setDefaults($.datepick.regionalOptions.fi);
})(jQuery);
