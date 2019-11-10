( function ( $ ) {
	'use strict';

	var eoX = {
		id: 'eo-x',
		name: 'Esperanto x',
		description: 'writing Esperanto-letters adding x\'s (the X-system).',
		date: '2013-02-12',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Parag Nemade',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'ĉx', 'cx' ],
			[ 'ĝx', 'gx' ],
			[ 'ĥx', 'hx' ],
			[ 'ĵx', 'jx' ],
			[ 'ŝx', 'sx' ],
			[ 'ŭx', 'ux' ],
			[ 'Ĉx', 'Cx' ],
			[ 'Ĝx', 'Gx' ],
			[ 'Ĥx', 'Hx' ],
			[ 'Ĵx', 'Jx' ],
			[ 'Ŝx', 'Sx' ],
			[ 'Ŭx', 'Ux' ],
			[ 'ĈX', 'CX' ],
			[ 'ĜX', 'GX' ],
			[ 'ĤX', 'HX' ],
			[ 'ĴX', 'JX' ],
			[ 'ŜX', 'SX' ],
			[ 'ŬX', 'UX' ],
			[ 'cx', 'ĉ' ],
			[ 'gx', 'ĝ' ],
			[ 'hx', 'ĥ' ],
			[ 'jx', 'ĵ' ],
			[ 'sx', 'ŝ' ],
			[ 'ux', 'ŭ' ],
			[ 'Cx', 'Ĉ' ],
			[ 'Gx', 'Ĝ' ],
			[ 'Hx', 'Ĥ' ],
			[ 'Jx', 'Ĵ' ],
			[ 'Sx', 'Ŝ' ],
			[ 'Ux', 'Ŭ' ],
			[ 'CX', 'Ĉ' ],
			[ 'GX', 'Ĝ' ],
			[ 'HX', 'Ĥ' ],
			[ 'JX', 'Ĵ' ],
			[ 'SX', 'Ŝ' ],
			[ 'UX', 'Ŭ' ] ]
	};

	$.ime.register( eoX );
}( jQuery ) );
