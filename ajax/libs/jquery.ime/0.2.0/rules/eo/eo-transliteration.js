( function ( $ ) {
	'use strict';

	function prepareRules() {
		var rules = [],
			chars;

		chars = {
			C: 'Ĉ',
			G: 'Ĝ',
			H: 'Ĥ',
			J: 'Ĵ',
			S: 'Ŝ',
			U: 'Ŭ',
			c: 'ĉ',
			g: 'ĝ',
			h: 'ĥ',
			j: 'ĵ',
			s: 'ŝ',
			u: 'ŭ'
		};

		$.each( chars, function ( ascii, accented ) {
			rules.push( [ ascii + '[Xx]', ascii, accented ] );
			rules.push( [ accented + '([Xx])', '[Xx]', ascii + '$1' ] );
		} );

		return rules;
	}

	var eoTransliteration = {
		id: 'eo-transliteration',
		name: 'Esperanto Transliteration',
		description: 'Esperanto x-code transliteration',
		date: '2012-10-10',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Brion Vibber',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns: prepareRules()
	};

	$.ime.register( eoTransliteration );
}( jQuery ) );
