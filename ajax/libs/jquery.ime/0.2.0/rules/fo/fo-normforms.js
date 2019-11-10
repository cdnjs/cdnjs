( function ( $ ) {
	'use strict';

	var defs = {
		id: 'fo-normforms',
		name: 'Føroyskt',
		description: 'Faroese input method with most common form transliterated',
		date: '2012-12-04',
		URL: 'http://www.evertype.com/alphabets/faroese.pdf',
		author: 'John Erling Blad',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 3,
		patterns: [
			// Uses "'" as an accent
			[ '\'a', 'á' ],
			[ '\'A', 'Á' ],
			[ '\'i', 'í' ],
			[ '\'I', 'Í' ],
			[ '\'o', 'ó' ],
			[ '\'O', 'Ó' ],
			[ '\'u', 'ú' ],
			[ '\'U', 'Ú' ],
			[ '\'y', 'ý' ],
			[ '\'Y', 'Ý' ],
			// Uses "~" as "approximatly similar to"
			[ '~d', 'ð' ],
			[ '~D', 'Ð' ],
			[ '~o', 'ö' ],
			[ '~O', 'Ö' ],
			// The most common transliterations (also the Danish letters)
			[ 'aa', 'å' ],
			[ 'AA', 'Å' ],
			[ 'Aa', 'Å' ],
			[ 'ae', 'æ' ],
			[ 'AE', 'Æ' ],
			[ 'Ae', 'Æ' ],
			[ 'oe', 'ø' ],
			[ 'OE', 'Ø' ],
			[ 'Oe', 'Ø' ],
			// The previous as negated transliterations, mostly for names
			[ 'åa', 'a', 'aa' ],
			[ 'ÅA', 'A', 'AA' ],
			[ 'Åa', 'A', 'Aa' ],
			[ 'åA', 'a', 'aA' ],
			[ 'æe', 'e', 'ae' ],
			[ 'ÆE', 'E', 'AE' ],
			[ 'Æe', 'E', 'Ae' ],
			[ 'æE', 'e', 'aE' ],
			[ 'øe', 'e', 'oe' ],
			[ 'ØE', 'E', 'OE' ],
			[ 'Øe', 'E', 'Oe' ], // this fails for some names like "Øen"
			[ 'øE', 'e', 'oE' ]
			// historically similar forms
			// "Å" is sometimes written as "Aa", and "å" as "aa", but in names
			// it is not generally acceptable to use this transliteration. To
			// handle those situations we need some oposite forms.
			// There is a similar character "Å" for the length unit Angstrom,
			// but this is not the upper case letter Å.
		]
	};

	$.ime.register( defs );
}( jQuery ) );
