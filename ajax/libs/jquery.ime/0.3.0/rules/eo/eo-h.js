( function ( $ ) {
	'use strict';

	var eoH = {
		id: 'eo-h',
		name: 'Esperanto h',
		description: 'writing Esperanto-letters adding h\'s.',
		date: '2013-02-12',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Parag Nemade',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'ĉh', 'ch' ],
			[ 'ĝh', 'gh' ],
			[ 'ĥh', 'hh' ],
			[ 'ĵh', 'jh' ],
			[ 'ŝh', 'sh' ],
			[ 'ŭh', 'uh' ],
			[ 'Ĉh', 'Ch' ],
			[ 'Ĝh', 'Gh' ],
			[ 'Ĥh', 'Hh' ],
			[ 'Ĵh', 'Jh' ],
			[ 'Ŝh', 'Sh' ],
			[ 'Ŭh', 'Uh' ],
			[ 'ĈH', 'CH' ],
			[ 'ĜH', 'GH' ],
			[ 'ĤH', 'HH' ],
			[ 'ĴH', 'JH' ],
			[ 'ŜH', 'SH' ],
			[ 'ŬH', 'UH' ],

			[ 'ch', 'ĉ' ],
			[ 'gh', 'ĝ' ],
			[ 'hh', 'ĥ' ],
			[ 'jh', 'ĵ' ],
			[ 'sh', 'ŝ' ],
			[ 'uh', 'ŭ' ],
			[ 'Ch', 'Ĉ' ],
			[ 'Gh', 'Ĝ' ],
			[ 'Hh', 'Ĥ' ],
			[ 'Jh', 'Ĵ' ],
			[ 'Sh', 'Ŝ' ],
			[ 'Uh', 'Ŭ' ],
			[ 'CH', 'Ĉ' ],
			[ 'GH', 'Ĝ' ],
			[ 'HH', 'Ĥ' ],
			[ 'JH', 'Ĵ' ],
			[ 'SH', 'Ŝ' ],
			[ 'UH', 'Ŭ' ] ]
	};

	$.ime.register( eoH );
}( jQuery ) );
