/* Hungarian initialisation for the jQuery UI multiselect plugin. */
/* Written by Adam Fónagy (adam.fonagy@greenformatics.hu). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Mind kijelöl', title: 'Mind kijelöl'}, 
		uncheckAll: {text: 'Mind eltávolít', title: 'Mind eltávolít'}
	},
	noneSelectedText: 'Nincs kijelölés',
	selectedText: '# kijelölve'
});

})( jQuery );
