/* http://keith-wood.name/datepick.html
   Portuguese Portuguese localisation for jQuery Datepicker.
   Written by Telmo Martinho (telmomartinho@gmail.com). */
(function($) {
	'use strict';
	$.datepick.regionalOptions.pt = {
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
		dayNamesMin: ['D','S','T','Q','Q','S','S'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0, 
		renderer: $.datepick.defaultRenderer,
		prevText: '&lt;Anterior',
		prevStatus: 'Mês anterior',
		prevJumpText: '&lt;&lt;',
		prevJumpStatus: 'Ano anterior',
		nextText: 'Próximo&gt;',
		nextStatus: 'Próximo mês',
		nextJumpText: '&gt;&gt;',
		nextJumpStatus: 'Próximo ano',
		currentText: 'Atual',
		currentStatus: 'Mês atual',
		todayText: 'Hoje',
		todayStatus: 'Hoje',
		clearText: 'Limpar',
		clearStatus: 'Limpar data',
		closeText: 'Fechar',
		closeStatus: 'Fechar o calendário',
		yearStatus: 'Selecionar ano',
		monthStatus: 'Selecionar mês',
		weekText: 's',
		weekStatus: 'Semana do ano',
		dayStatus: 'DD, d \'de\' M \'de\' yyyy',
		defaultStatus: 'Selecione um dia',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.pt);
})(jQuery);