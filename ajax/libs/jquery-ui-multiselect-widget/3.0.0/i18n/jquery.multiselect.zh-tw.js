/* Simplified Chinese initialisation for the jQuery UI multiselect plugin. */
/* Written by Ben (ben@zfben.com). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: '全選', title: '全選'}, 
		uncheckAll: {text: '清空', title: '清空'}
	},
	noneSelectedText: '請選擇',
	selectedText: '# 已選擇'
});

})( jQuery );
