/* http://keith-wood.name/datepick.html
   Basque localisation for jQuery Datepicker.
   Karrikas-ek itzulia (karrikas@karrikas.com) */
(function($){
	$.datepick.regionalOptions['eu'] = {
		monthNames: ['Urtarrila','Otsaila','Martxoa','Apirila','Maiatza','Ekaina',
		'Uztaila','Abuztua','Iraila','Urria','Azaroa','Abendua'],
		monthNamesShort: ['Urt','Ots','Mar','Api','Mai','Eka',
		'Uzt','Abu','Ira','Urr','Aza','Abe'],
		dayNames: ['Igandea','Astelehena','Asteartea','Asteazkena','Osteguna','Ostirala','Larunbata'],
		dayNamesShort: ['Iga','Ast','Ast','Ast','Ost','Ost','Lar'],
		dayNamesMin: ['Ig','As','As','As','Os','Os','La'],
		dateFormat: 'yyyy/mm/dd', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Aur', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Hur&#x3e;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Gaur', currentStatus: '',
		todayText: 'Gaur', todayStatus: '',
		clearText: 'X', clearStatus: '',
		closeText: 'Egina', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD d MM', defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['eu']);
})(jQuery);
