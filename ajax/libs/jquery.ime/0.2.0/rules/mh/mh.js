/**
 * Businesses and government offices in the Republic of the Marshall Islands typically use
 * a font to replace eight letters that are typically unused in the Marshallese language
 * with Marshallese letters.
 * Sample English translations: http://mapmeld.github.com/olpc-rmi/laptops.html
 * Pronunciation: http://www.rmiembassyus.org/Marshallese%20Phrasebook.htm
 */

( function ( $ ) {
	'use strict';

	var mh = {
		id: 'mh',
		name: 'Kajin M̧ajeļ',
		description: 'Marshallese Language',
		date: '2013-03-29',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Nick Doiron, <ndoiron@mapmeld.com>',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'Y', 'Ū' ],
			[ 'S', 'Ā' ],
			[ 'F', 'Ņ' ],
			[ 'G', 'N̄' ],
			[ 'H', 'M̧' ],
			[ 'X', 'O̧' ],
			[ 'C', 'Ō' ],
			[ 'V', 'Ļ' ],

			[ 'y', 'ū' ],
			[ 's', 'ā' ],
			[ 'f', 'ņ' ],
			[ 'g', 'n̄' ],
			[ 'h', 'm̧' ],
			[ 'x', 'o̧' ],
			[ 'c', 'ō' ],
			[ 'v', 'ļ' ]
		]
	};

	$.ime.register( mh );
}( jQuery ) );
