/* http://keith-wood.name/datepick.html
   Czech localisation for jQuery Datepicker.
   Written by Tomas Muller (tomas@tomas-muller.net). */
(function($) {
	$.datepick.regional['cs'] = {
		monthNames: ['leden','únor','březen','duben','květen','červen',
		'červenec','srpen','září','říjen','listopad','prosinec'],
		monthNamesShort: ['led','úno','bře','dub','kvě','čer',
		'čvc','srp','zář','říj','lis','pro'],
		dayNames: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
		dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
		dayNamesMin: ['ne','po','út','st','čt','pá','so'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;Dříve', prevStatus: 'Přejít na předchozí měsí',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Později&#x3e;', nextStatus: 'Přejít na další měsíc',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Nyní', currentStatus: 'Přejde na aktuální měsíc',
		todayText: 'Nyní', todayStatus: 'Přejde na aktuální měsíc',
		clearText: 'Vymazat', clearStatus: 'Vymaže zadané datum',
		closeText: 'Zavřít',  closeStatus: 'Zavře kalendář beze změny',
		yearStatus: 'Přejít na jiný rok', monthStatus: 'Přejít na jiný měsíc',
		weekText: 'Týd', weekStatus: 'Týden v roce',
		dayStatus: '\'Vyber\' DD, M d', defaultStatus: 'Vyberte datum',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['cs']);
})(jQuery);
