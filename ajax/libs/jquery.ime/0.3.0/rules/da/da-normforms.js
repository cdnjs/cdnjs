( function ( $ ) {
	'use strict';

	var defs = {
		id: 'da-normforms',
		name: 'Dansk',
		description: 'Danish input method with most common form transliterated',
		date: '2012-12-04',
		URL: 'http://www.evertype.com/alphabets/danish.pdf',
		author: 'John Erling Blad',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 3,
		patterns: [
			// The most common transliterations
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
