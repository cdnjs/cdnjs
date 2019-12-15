/* Brazilian initialisation for the jQuery UI multiselect plugin. */
/* Written by Vinícius Fontoura Corrêa (vinusfc@gmail.com). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Marcar todos', title: 'Marcar todos'}, 
		uncheckAll: {text: 'Desmarcar todos', title: 'Desmarcar todos'}
	},
	noneSelectedText: 'Selecione as opções',
	selectedText: '# selecionado'
});
	
})( jQuery );
