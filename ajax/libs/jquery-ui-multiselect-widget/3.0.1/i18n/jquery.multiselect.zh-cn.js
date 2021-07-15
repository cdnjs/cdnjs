/* Simplified Chinese initialisation for the jQuery UI multiselect plugin. */
/* Written by Ben (ben@zfben.com). */

(function ( $ ) {

$.extend($.ech.multiselect.prototype.options, {
	linkInfo: {
		checkAll: {text: '全选', title: '全选'}, 
		uncheckAll: {text: '清空', title: '清空'}
	},
	noneSelectedText: '请选择',
	selectedText: '# 已选择'
});

})( jQuery );
