/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimić. */
(function($){
	$.datepick.regional['sr-SR'] = {
		clearText: 'Obriši', clearStatus: 'Obriši trenutni datum',
		closeText: 'Zatvori', closeStatus: 'Zatvori kalendar',
		prevText: '&#x3c;', prevStatus: 'Prikaži predhodni mesec',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Prikaži predhodnu godinu',
		nextText: '&#x3e;', nextStatus: 'Prikaži sledeći mesec',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Prikaži sledeću godinu',
		currentText: 'Danas', currentStatus: 'Tekući mesec',
		monthNames: ['Januar','Februar','Mart','April','Maj','Jun',
		'Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Avg','Sep','Okt','Nov','Dec'],
		monthStatus: 'Prikaži mesece', yearStatus: 'Prikaži godine',
		weekHeader: 'Sed', weekStatus: 'Sedmica',
		dayNames: ['Nedelja','Ponedeljak','Utorak','Sreda','Četvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sre','Čet','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','Če','Pe','Su'],
		dayStatus: 'Odaberi DD za prvi dan sedmice', dateStatus: '\'Datum\' D, M d',
		dateFormat: 'dd/mm/yy', firstDay: 1,
		initStatus: 'Odaberi datum', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['sr-SR']);
})(jQuery);
