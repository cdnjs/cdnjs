( function ( $ ) {
	'use strict';

	var pms = {
		id: 'pms',
		name: 'Piemontèis',
		description: 'Piedmontese input method.',
		date: '2014-02-27',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'pms.wiki community',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 1,
		maxKeyLength: 1,
		patterns: [
			[ ':e', 'ë' ],
			[ ',o', 'ó' ],
			[ '\\\\A', 'À' ],
			[ '\\\\E', 'È' ],
			[ '\\\\I', 'Ì' ],
			[ '\\\\O', 'Ò' ],
			[ '\\\\U', 'Ù' ],
			[ ',E', 'É' ],
			[ ':E', 'Ë' ],
			[ ',O', 'Ó' ],
			[ '\\^g', 'ĝ' ],
			[ '\\^l', 'l̂' ],
			[ '\\^r', 'r̂' ],
			[ ':a', 'ä' ],
			[ '\\^G', 'Ĝ' ],
			[ '\\^L', 'L̂' ],
			[ '\\^R', 'R̂' ],
			[ ':A', 'Ä' ]
		]
	};

	$.ime.register( pms );
}( jQuery ) );
