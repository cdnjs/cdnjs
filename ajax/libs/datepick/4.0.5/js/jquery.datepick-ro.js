/* http://keith-wood.name/datepick.html
   Romanian localisation for jQuery Datepicker.
   Written by Edmond L. (ll_edmond@walla.com) and Ionut G. Stan (ionut.g.stan@gmail.com). */
(function($) {
	$.datepick.regional['ro'] = {
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
		dayNames: ['Duminică', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
		dayNamesMin: ['Du','Lu','Ma','Mi','Jo','Vi','Sâ'],
		dateFormat: 'dd.mm.yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&laquo;Precedenta', prevStatus: 'Arata luna precedenta',
		prevJumpText: '&laquo;&laquo;', prevJumpStatus: '',
		nextText: 'Urmatoare&raquo;', nextStatus: 'Arata luna urmatoare',
		nextJumpText: '&raquo;&raquo;', nextJumpStatus: '',
		currentText: 'Azi', currentStatus: 'Arata luna curenta',
		todayText: 'Azi', todayStatus: 'Arata luna curenta',
		clearText: 'Curat', clearStatus: 'Sterge data curenta',
		closeText: 'Închide', closeStatus: 'Închide fara schimbare',
		yearStatus: 'Arat un an diferit', monthStatus: 'Arata o luna diferita',
		weekText: 'Săpt', weekStatus: 'Săptamana anului',
		dayStatus: 'Selecteaza D, M d', defaultStatus: 'Selecteaza o data',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['ro']);
})(jQuery);
