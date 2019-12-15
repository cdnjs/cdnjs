/**
 * Hungarian language functions
 *
 * @author Santhosh Thottingal
 */

(function($) {
	"use strict";
	var hu = $.extend({}, $.i18n.languages['default'], {
		convertGrammar : function(word, form) {
			switch (form) {
			case 'rol':
				word += 'ról';
				break;
			case 'ba':
				word += 'ba';
				break;
			case 'k':
				word += 'k';
				break;
			}
			return word;
		}
	});
	$.extend($.i18n.languages, {
		'hu' : hu
	});
}(jQuery));
