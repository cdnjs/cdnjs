/* http://keith-wood.name/datepick.html
   Brazilian Portuguese localisation for jQuery Datepicker.
   Written by Leonildo Costa Silva (leocsilva@gmail.com). */
(function($) {
	$.datepick.regional['pt-BR'] = {
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
		dayNamesMin: ['D','S','T','Q','Q','S','S'],
		dateFormat: 'dd/mm/yyyy', firstDay: 0, 
		renderer: $.datepick.defaultRenderer,
		prevText: '&lt;Anterior', prevStatus: 'Mostra o mês anterior', 
		prevJumpText: '&lt;&lt;', prevJumpStatus: 'Mostra o ano anterior', 
		nextText: 'Próximo&gt;', nextStatus: 'Mostra o próximo mês', 
		nextJumpText: '&gt;&gt;', nextJumpStatus: 'Mostra o próximo ano',
		currentText: 'Atual', currentStatus: 'Mostra o mês atual',
		todayText: 'Hoje', todayStatus: 'Vai para hoje', 
		clearText: 'Limpar', clearStatus: 'Limpar data',
		closeText: 'Fechar', closeStatus: 'Fechar o calendário',
		yearStatus: 'Selecionar ano', monthStatus: 'Selecionar mês',
		weekText: 's', weekStatus: 'Semana do ano', 
		dayStatus: 'DD, d \'de\' M \'de\' yyyy', defaultStatus: 'Selecione um dia',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['pt-BR']);
})(jQuery);
