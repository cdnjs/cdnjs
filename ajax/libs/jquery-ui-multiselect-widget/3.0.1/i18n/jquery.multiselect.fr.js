/* French initialisation for the jQuery UI multiselect plugin. */
/* Written by Charles SANQUER (charles.sanquer@spyrit.net). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Tout cocher', title: 'Tout cocher'}, 
		uncheckAll: {text: 'Tout décocher', title: 'Tout décocher'}
	},
	noneSelectedText: 'Sélectionner les options',
	selectedText: '# sélectionnés'
});

})( jQuery );
