( function ( $ ) {
	'use strict';

	var defs = {
		id: 'is-normforms',
		name: 'Íslenska',
		description: 'Islandic input method with most common form transliterated',
		date: '2012-12-04',
		URL: 'http://www.evertype.com/alphabets/icelandic.pdf',
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
			[ '\'e', 'é' ],
			[ '\'E', 'É' ],
			[ '\'o', 'ó' ],
			[ '\'O', 'Ó' ],
			[ '\'u', 'ú' ],
			[ '\'U', 'Ú' ],
			[ '\'y', 'ý' ],
			[ '\'Y', 'Ý' ],
			// Uses "~" as "approximatly similar to"
			[ '~a', 'ä' ],
			[ '~A', 'Ä' ],
			[ '~e', 'ë' ],
			[ '~E', 'Ë' ],
			[ '~d', 'ð' ],
			[ '~D', 'Ð' ],
			[ '~o', 'ø' ],
			[ '~O', 'Ø' ],
			// The most common transliterations (also the Danish letters)
			[ 'th', 'þ' ],
			[ 'TH', 'Þ' ],
			[ 'Th', 'Þ' ],
			[ 'aa', 'å' ],
			[ 'AA', 'Å' ],
			[ 'Aa', 'Å' ],
			[ 'ae', 'æ' ],
			[ 'AE', 'Æ' ],
			[ 'Ae', 'Æ' ],
			[ 'oe', 'ö' ],
			[ 'OE', 'Ö' ],
			[ 'Oe', 'Ö' ],
			// The previous as negated transliterations, mostly for names
			[ 'þh', 'h', 'th' ],
			[ 'ÞA', 'H', 'TH' ],
			[ 'Þh', 'H', 'Th' ],
			[ 'þA', 'h', 'tH' ],
			[ 'åa', 'a', 'aa' ],
			[ 'ÅA', 'A', 'AA' ],
			[ 'Åa', 'A', 'Aa' ],
			[ 'åA', 'a', 'aA' ],
			[ 'æe', 'e', 'ae' ],
			[ 'ÆE', 'E', 'AE' ],
			[ 'Æe', 'E', 'Ae' ],
			[ 'æE', 'e', 'aE' ],
			[ 'öe', 'e', 'oe' ],
			[ 'ÖE', 'E', 'OE' ],
			[ 'Öe', 'E', 'Oe' ],
			[ 'öE', 'e', 'oE' ]
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
