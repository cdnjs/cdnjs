/**
 * Bosnian (bosanski) language functions
 */
(function($) {
	"use strict";
	var bosanski = $.extend({}, $.i18n.languages['default'], {
		convertGrammar : function(word, form) {
			switch (form) {
			case 'instrumental': // instrumental
				word = 's ' + word;
				break;
			case 'lokativ': // locative
				word = 'o ' + word;
				break;
			}
			return word;
		}
	});
	$.extend($.i18n.languages, {
		'bs' : bosanski
	});
}(jQuery));
