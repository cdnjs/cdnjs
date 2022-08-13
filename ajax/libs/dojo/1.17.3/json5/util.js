define([
	'./unicode'
], function (unicode) {
	return {
		isSpaceSeparator: function (c) {
			return typeof c === 'string' && unicode.Space_Separator.test(c);
		},
		isIdStartChar: function (c) {
			return typeof c === 'string' && ((c >= 'a' && c <= 'z') ||
				(c >= 'A' && c <= 'Z') ||
				(c === '$') || (c === '_') ||
				unicode.ID_Start.test(c));
		},
		isIdContinueChar: function (c) {
			return typeof c === 'string' && ((c >= 'a' && c <= 'z') ||
				(c >= 'A' && c <= 'Z') ||
				(c >= '0' && c <= '9') ||
				(c === '$') || (c === '_') ||
				(c === '\u200C') || (c === '\u200D') ||
				unicode.ID_Continue.test(c));
		},
		isDigit: function (c) {
			return typeof c === 'string' && /[0-9]/.test(c);
		},
		isHexDigit: function (c) {
			return typeof c === 'string' && /[0-9A-Fa-f]/.test(c);
		},
	};
});
