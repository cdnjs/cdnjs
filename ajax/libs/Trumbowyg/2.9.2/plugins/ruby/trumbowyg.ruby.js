/* ===========================================================
 * trumbowyg.ruby.js v1.0
 * Ruby text plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author	: Fathi Anshory (0x00000F5C)
 * Twitter	: @fscchannl
 * Comment	: Since I use trumbowyg in my project and required it to insert ruby text, so I thought I can contribute a little. :D
 */

(function($) {
	'use strict';

	$.extend(true, $.trumbowyg, {
		langs: {
			en: {
				ruby: 'Add ruby text',
				rubyModal: 'Ruby modal',
				rubyText: 'Ruby text'
			},
			id: {
				ruby: 'Sisipkan teks ruby',
				rubyModal: 'Modal teks ruby',
				rubyText: 'Teks ruby'
			}
		},
		plugins: {
			ruby: {
				init: function(trumbowyg) {
					var btnDef = {
						fn: function() {
							trumbowyg.saveRange();
							trumbowyg.openModalInsert(
								trumbowyg.lang.ruby,
								{
									rubyText: {
										label: trumbowyg.lang.rubyText,
										required: false,
									},
									modal: {
										label: trumbowyg.lang.rubyModal,
										value: trumbowyg.getRangeText(),
										required: true
									}
								}, 
								function(v) {
									var node = $('<ruby title="' + v.rubyText + '">' + v.modal + '<rp> (</rp><rt>' + v.rubyText + '</rt><rp>)</rp></ruby>')[0];
									trumbowyg.range.deleteContents();
									trumbowyg.range.insertNode(node);
                                    trumbowyg.syncCode();
                                    trumbowyg.$c.trigger('tbwchange');
									return true;
								}
							);
						}
					};
					trumbowyg.addBtnDef('ruby', btnDef);
				}
			}
		}
	});
})(jQuery);
