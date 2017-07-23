/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('autoheight', function(K) {
	var self = this;

	if (!self.autoHeightMode) {
		return;
	}

	var edit = self.edit;
	var body = edit.doc.body;
	var minHeight = K.removeUnit(self.height);

	edit.iframe[0].scroll = 'no';
	body.style.overflowY = 'hidden';

	function resetHeight() {
		edit.iframe.height(minHeight);
		self.resize(null, Math.max((K.IE ? body.scrollHeight : body.offsetHeight) + 76, minHeight));
	}

	/*
	* 如何实现真正的自动高度？
	* 修改编辑器高度之后，再次获取body内容高度时，最小值只会是当前iframe的设置高度，这样就导致高度只增不减。
	* 所以每次获取body内容高度之前，先将iframe的高度重置为最小高度，这样就能获取body的实际高度。
	* 由此就实现了真正的自动高度
	* 测试：chrome、firefox、IE9、IE8
	* */

	edit.afterChange(resetHeight);

	if (self.isCreated) {
		resetHeight();
	} else {
		self.afterCreate(resetHeight);
	}
});
