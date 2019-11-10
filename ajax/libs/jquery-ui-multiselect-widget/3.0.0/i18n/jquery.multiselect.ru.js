/* Russian initialisation for the jQuery UI multiselect plugin. */
/* Written by Artem Packhomov (gorblnu4@gmail.com). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: 'Отметить все', title: 'Отметить все'}, 
		uncheckAll: {text: 'Снять отметку со всех', title: 'Снять отметку со всех'}
	},
	noneSelectedText: 'Выберите из списка',
	selectedText: 'Выбрано #'
});
	
})( jQuery );
