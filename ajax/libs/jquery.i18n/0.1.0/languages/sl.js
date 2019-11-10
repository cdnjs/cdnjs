/**
 * Slovenian (Slovenščina) language functions
 */

(function($) {
	"use strict";
	var sl = $.extend({}, $.i18n.languages['default'], {
		convertGrammar : function(word, form) {
			switch (form) {
			case 'mestnik': // locative
				word = 'o ' + word;
				break;
			case 'orodnik': // instrumental
				word = 'z ' + word;
				break;
			}
			return word;
		}

	});
	$.extend($.i18n.languages, {
		'sl' : sl
	});
}(jQuery));