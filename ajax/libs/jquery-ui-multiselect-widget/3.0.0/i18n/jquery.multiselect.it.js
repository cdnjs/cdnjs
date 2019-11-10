/* Italian initialization for the jQuery UI multiselect plugin. */
/* Written by Vincenzo Farruggia(mastropinguino@networky.net). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Seleziona tutto', title: 'Seleziona tutto'}, 
		uncheckAll: {text: 'Deseleziona tutto', title: 'Deseleziona tutto'}
	},
	noneSelectedText: 'Seleziona le opzioni',
	selectedText: '# selezionati'
});
	
})( jQuery );
