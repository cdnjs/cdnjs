/* Estonian initialisation for the jQuery UI date picker plugin. */ 
/* Written by Mart Sõmermaa (mrts.pydev at gmail com). */ 
(function($) {
	$.datepick.regional['et'] = {
		clearText: '', clearStatus: '',
		closeText: 'Sulge', closeStatus: '',
		prevText: 'Eelnev', prevStatus: '',
		prevBigText: '&#x3c;&#x3c;', prevBigStatus: '',
		nextText: 'Järgnev', nextStatus: '',
		nextBigText: '&#x3e;&#x3e;', nextBigStatus: '',
		currentText: 'Täna', currentStatus: '',
		monthNames: ['Jaanuar','Veebruar','Märts','Aprill','Mai','Juuni', 
			'Juuli','August','September','Oktoober','November','Detsember'],
		monthNamesShort: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni',
			'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
		monthStatus: '', yearStatus: '',
		weekHeader: 'Sm', weekStatus: '',
		dayNames: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
		dayNamesShort: ['Pühap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
		dayNamesMin: ['P','E','T','K','N','R','L'],
		dayStatus: '', dateStatus: '',
		dateFormat: 'dd.mm.yy', firstDay: 1,
		initStatus: '', isRTL: false,
		showMonthAfterYear: false, yearSuffix: ''};
	$.datepick.setDefaults($.datepick.regional['et']);
})(jQuery);
