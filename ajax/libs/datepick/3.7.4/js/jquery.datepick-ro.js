/* Romanian initialisation for the jQuery UI date picker plugin. */
/* Written by Edmond L. (ll_edmond@walla.com) and Ionut G. Stan (ionut.g.stan@gmail.com). */
(function($) {
	$.datepick.regional['ro'] = {
		clearText: 'Curat', clearStatus: 'Sterge data curenta',
		closeText: 'Închide', closeStatus: 'Închide fara schimbare',
		prevText: '&laquo;Precedenta', prevStatus: 'Arata luna precedenta',
		prevBigText: '&laquo;&laquo;', prevBigStatus: '',
		nextText: 'Urmatoare&raquo;', nextStatus: 'Arata luna urmatoare',
		nextBigText: '&raquo;&raquo;', nextBigStatus: '',
		currentText: 'Azi', currentStatus: 'Arata luna curenta',
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
		monthStatus: 'Arata o luna diferita', yearStatus: 'Arat un an diferit',
		weekHeader: 'Sapt', weekStatus: 'Saptamana anului',
		dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sâmbata'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
		dayNamesMin: ['Du','Lu','Ma','Mi','Jo','Vi','Sâ'],
		dayStatus: 'Seteaza DD ca prima saptamana zi', dateStatus: 'Selecteaza D, M d',
		dateFormat: 'dd MM yy', firstDay: 1,
		initStatus: 'Selecteaza o data', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['ro']);
})(jQuery);
