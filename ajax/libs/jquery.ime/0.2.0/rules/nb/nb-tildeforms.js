( function ( $ ) {
	'use strict';

	var defs = {
		id: 'nb-tildeforms',
		name: 'Norsk tildemerket transliterasjon',
		description: 'Norwegian input method with initial tilde triggering transliteration',
		date: '2012-12-04',
		URL: 'http://www.evertype.com/alphabets/bokmaal-norwegian.pdf',
		// URL: 'http://www.evertype.com/alphabets/nynorsk-norwegian.pdf',
		author: 'John Erling Blad',
		license: 'GPLv3',
		version: '1.0',
		// contextLength: 1,
		maxKeyLength: 3,
		patterns: [
			// Uses "~" as "approximatly similar to"
			[ '°a', 'å' ], // The simple ~a does not work as there is a "ã"
			[ '°A', 'Å' ], // The simple ~A does not work as there is a "Ã"
			[ '~ae', 'æ' ], // The simple ~a does not work as there is a "ã"
			[ '~AE', 'Æ' ], // The simple ~A does not work as there is a "Ã"
			[ '~oe', 'ø' ], // The simple ~o does not work as there is a "õ"
			[ '~OE', 'Ø' ], // The simple ~O does not work as there is a "Õ"
			[ '~aa', 'å' ], // The simple ~a does not work as there is a "ã"
			[ '~AA', 'Å' ] // The simple ~A does not work as there is a "Ã"
			// historically similar forms
			// "Å" is sometimes written as "Aa", and "å" as "aa", but in names
			// it is not generally acceptable to use this transliteration.
			// There is a similar character "Å" for the length unit Angstrom,
			// but this is not the upper case letter Å.
		]
	};

	$.ime.register( defs );
}( jQuery ) );
