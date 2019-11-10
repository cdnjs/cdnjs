// This Chuvash keyboard is a stripped version of latin Mercen
// https://sites.google.com/site/mercen77/
// http://cvlat.blogspot.com
// only Chuvash diacritics are used, no additional letters for Turkish or dead keys implemented (for now?)

( function ( $ ) {
	'use strict';

	var cv = {
		id: 'cv-lat-altgr',
		name: 'Căvašla - Mercen',
		description: 'CVLat usă kurakan Mercen',
		date: '2013-03-21',
		URL: 'https://sites.google.com/site/mercen77/',
		author: 'Anatoly Mironov, @mirontoli',
		license: 'MIT',
		version: '1.0',
		patterns_x: [
			[ 'a', 'ă' ],
			[ 'A', 'Ă' ],
			[ 'e', 'ĕ' ],
			[ 'E', 'Ĕ' ],
			[ 's', 'ş' ],
			[ 'S', 'Ş' ],
			[ 'd|h', 'š' ],
			[ 'D|H', 'Š' ],
			[ 'w|u', 'ü' ],
			[ 'W|U', 'Ü' ]
		]
	};

	$.ime.register( cv );
}( jQuery ) );
