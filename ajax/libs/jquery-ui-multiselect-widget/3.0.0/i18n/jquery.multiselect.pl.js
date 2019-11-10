/* Polish initialisation for the jQuery UI multiselect plugin. */
/* Written by Tomasz Mazur (contact@tomaszmazur.eu). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Zaznacz wszystkie', title: 'Zaznacz wszystkie'}, 
		uncheckAll: {text: 'Odznacz wszystkie', title: 'Odznacz wszystkie'}
	},
	noneSelectedText: 'Wybierz opcje',
	selectedText: 'Zaznaczono #'
});
	
})( jQuery );
