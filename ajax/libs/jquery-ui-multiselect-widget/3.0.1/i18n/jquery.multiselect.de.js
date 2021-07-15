/* German initialisation for the jQuery UI multiselect plugin. */
/* Written by Sven Tatter (sven.tatter@gmail.com). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Alle auswählen', title: 'Alle auswählen'}, 
		uncheckAll: {text: 'Alle abwählen', title: 'Alle abwählen'}
	},
	noneSelectedText: 'Nichts ausgewählt',
	selectedText: '# ausgewählt'
});

})( jQuery );
