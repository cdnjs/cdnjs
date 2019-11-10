( function ( $ ) {
	'use strict';

	var defs = {
		id: 'sv-normforms',
		name: 'Svenska',
		description: 'Swedish input method with most common form transliterated',
		date: '2012-12-04',
		URL: 'http://www.evertype.com/alphabets/swedish.pdf',
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
			[ 'ae', 'ä' ],
			[ 'AE', 'Ä' ],
			[ 'Ae', 'Ä' ],
			[ 'oe', 'ö' ],
			[ 'OE', 'Ö' ],
			[ 'Oe', 'Ö' ],
			// The previous as negated transliterations, mostly for names
			[ 'åa', 'a', 'aa' ],
			[ 'ÅA', 'A', 'AA' ],
			[ 'Åa', 'A', 'Aa' ],
			[ 'åA', 'a', 'aA' ],
			[ 'äe', 'e', 'ae' ],
			[ 'ÄE', 'E', 'AE' ],
			[ 'Äe', 'E', 'Ae' ],
			[ 'äE', 'e', 'aE' ],
			[ 'öe', 'e', 'oe' ],
			[ 'ÖE', 'E', 'OE' ],
			[ 'Öe', 'E', 'Oe' ], // this fails for some names like "Øen"
			[ 'öE', 'e', 'oE' ]
			// historically similar forms
			// "Å" is sometimes written as "Aa", and "å" as "aa", but in names
			// it is not generally acceptable to use this transliteration. The
			// same is the case for "Ô" vs "Oe". To
			// handle those situations we need some oposite forms.
			// There is a similar character "Å" for the length unit Angstrom,
			// but this is not the upper case letter Å.
		]
	};

	$.ime.register( defs );
}( jQuery ) );
