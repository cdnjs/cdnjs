( function ( $ ) {
	'use strict';

	var vec = {
		id: 'vec-GVU',
		name: 'Vèneto GVU',
		description: 'Venetian input method.',
		date: '2020-03-23',
		URL: 'http://github.com/wikimedia/jquery.ime',
		author: 'Vajotwo and GatoSelvadego (Wikipedia users)',
		license: 'GPLv3',
		version: '1.0',
		patterns: [
			[ 'ce', 'ç' ],
			[ 'ci', 'ç' ],
			[ 'Ce', 'Ç' ],
			[ 'Ci', 'Ç' ],
			[ 'dh', 'đ' ],
			[ 'lh', 'ł' ],
			[ 'òò', 'ó' ],
			[ 'zh', 'ẑ' ],
			[ 'đh', 'dh' ],
			[ 'łh', 'lh' ],
			[ 'ẑh', 'zh' ],
			[ 'Dh', 'Đ' ],
			[ 'Lh', 'Ł' ],
			[ 'Òò', 'Ó' ],
			[ 'Zh', 'Ẑ' ],
			[ 'Đh', 'Dh' ],
			[ 'Łh', 'Lh' ],
			[ 'Ẑh', 'Zh' ]
		]
	};

	$.ime.register( vec );
}( jQuery ) );
